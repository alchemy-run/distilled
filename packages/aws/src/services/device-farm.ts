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
const ns = /*@__PURE__*/ T.XmlNamespace("http://devicefarm.amazonaws.com/doc/2015-06-23/");
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Device Farm",
  serviceShapeName: "DeviceFarm_20150623",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "devicefarm" });
const ver = /*@__PURE__*/ T.ServiceVersion("2015-06-23");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_1();
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://devicefarm.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://devicefarm.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://devicefarm.{R}.{D}","properties":{},"headers":{}}');

export class ArgumentException
  extends /*@__PURE__*/ S.TaggedError<ArgumentException>()("ArgumentException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class CannotDeleteException
  extends /*@__PURE__*/ S.TaggedError<CannotDeleteException>()(
    "CannotDeleteException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class IdempotencyException
  extends /*@__PURE__*/ S.TaggedError<IdempotencyException>()("IdempotencyException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InternalServiceException
  extends /*@__PURE__*/ S.TaggedError<InternalServiceException>()(
    "InternalServiceException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidOperationException
  extends /*@__PURE__*/ S.TaggedError<InvalidOperationException>()("InvalidOperationException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()("LimitExceededException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class NotEligibleException
  extends /*@__PURE__*/ S.TaggedError<NotEligibleException>()("NotEligibleException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()("NotFoundException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ServiceAccountException
  extends /*@__PURE__*/ S.TaggedError<ServiceAccountException>()("ServiceAccountException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class TagOperationException
  extends /*@__PURE__*/ S.TaggedError<TagOperationException>()(
    "TagOperationException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceName: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TagPolicyException
  extends /*@__PURE__*/ S.TaggedError<TagPolicyException>()(
    "TagPolicyException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceName: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceName: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type InteractionMode = "INTERACTIVE" | "NO_VIDEO" | "VIDEO_ONLY" | (string & {});
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
export type InstanceStatus = "IN_USE" | "PREPARING" | "AVAILABLE" | "NOT_AVAILABLE" | (string & {});
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
export type UploadStatus = "INITIALIZED" | "PROCESSING" | "SUCCEEDED" | "FAILED" | (string & {});
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
export type OfferingTransactionType = "PURCHASE" | "RENEW" | "SYSTEM" | (string & {});
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
export type ExecutionResultCode = "PARSING_FAILED" | "VPC_ENDPOINT_SETUP_FAILED" | (string & {});
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
export type TestGridSessionStatus = "ACTIVE" | "CLOSED" | "ERRORED" | (string & {});
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
export type TestGridSessionArtifactType = "UNKNOWN" | "VIDEO" | "SELENIUM_LOG" | (string & {});
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
export type UniqueProblemsByExecutionResultMap = { [key in ExecutionResult]?: UniqueProblem[] };
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
  input: __S(0, __c0, 0) as any as S.Schema<CreateDevicePoolRequest>,
  output: __S(16, __c2, 0) as any as S.Schema<CreateDevicePoolResult>,
  errors: [ArgumentException, LimitExceededException, NotFoundException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDevicePool",
}));

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
  input: __S(24, __c3, 0) as any as S.Schema<CreateInstanceProfileRequest>,
  output: __S(48, __c6, 0) as any as S.Schema<CreateInstanceProfileResult>,
  errors: [ArgumentException, LimitExceededException, NotFoundException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateInstanceProfile",
}));

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
  input: __S(56, __c7, 0) as any as S.Schema<CreateNetworkProfileRequest>,
  output: __S(72, __c9, 0) as any as S.Schema<CreateNetworkProfileResult>,
  errors: [ArgumentException, LimitExceededException, NotFoundException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateNetworkProfile",
}));

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
  input: __S(80, __c10, 0) as any as S.Schema<CreateProjectRequest>,
  output: __S(112, __c14, 0) as any as S.Schema<CreateProjectResult>,
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
}));

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
  input: __S(121, __c15, 1) as any as S.Schema<CreateRemoteAccessSessionRequest>,
  output: __S(184, __c23, 0) as any as S.Schema<CreateRemoteAccessSessionResult>,
  errors: [ArgumentException, LimitExceededException, NotFoundException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRemoteAccessSession",
}));

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
  input: __S(192, __c24, 0) as any as S.Schema<CreateTestGridProjectRequest>,
  output: __S(208, __c26, 0) as any as S.Schema<CreateTestGridProjectResult>,
  errors: [ArgumentException, InternalServiceException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTestGridProject",
}));

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
  input: __S(216, __c27, 0) as any as S.Schema<CreateTestGridUrlRequest>,
  output: __S(217, __c27, 1) as any as S.Schema<CreateTestGridUrlResult>,
  errors: [ArgumentException, InternalServiceException, NotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTestGridUrl",
}));

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
  input: __S(224, __c28, 0) as any as S.Schema<CreateUploadRequest>,
  output: __S(240, __c30, 0) as any as S.Schema<CreateUploadResult>,
  errors: [ArgumentException, LimitExceededException, NotFoundException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUpload",
}));

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
  input: __S(248, __c31, 0) as any as S.Schema<CreateVPCEConfigurationRequest>,
  output: __S(264, __c33, 0) as any as S.Schema<CreateVPCEConfigurationResult>,
  errors: [ArgumentException, LimitExceededException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVPCEConfiguration",
}));

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
  input: __S(272, __c34, 0) as any as S.Schema<DeleteDevicePoolRequest>,
  output: __S(280, __c35, 0) as any as S.Schema<DeleteDevicePoolResult>,
  errors: [ArgumentException, LimitExceededException, NotFoundException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDevicePool",
}));

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
  input: __S(288, __c36, 0) as any as S.Schema<DeleteInstanceProfileRequest>,
  output: __S(280, __c35, 0) as any as S.Schema<DeleteInstanceProfileResult>,
  errors: [ArgumentException, LimitExceededException, NotFoundException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInstanceProfile",
}));

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
  input: __S(296, __c37, 0) as any as S.Schema<DeleteNetworkProfileRequest>,
  output: __S(280, __c35, 0) as any as S.Schema<DeleteNetworkProfileResult>,
  errors: [ArgumentException, LimitExceededException, NotFoundException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNetworkProfile",
}));

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
  input: __S(304, __c38, 0) as any as S.Schema<DeleteProjectRequest>,
  output: __S(280, __c35, 0) as any as S.Schema<DeleteProjectResult>,
  errors: [ArgumentException, LimitExceededException, NotFoundException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProject",
}));

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
  input: __S(312, __c39, 0) as any as S.Schema<DeleteRemoteAccessSessionRequest>,
  output: __S(280, __c35, 0) as any as S.Schema<DeleteRemoteAccessSessionResult>,
  errors: [ArgumentException, LimitExceededException, NotFoundException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRemoteAccessSession",
}));

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
  input: __S(320, __c40, 0) as any as S.Schema<DeleteRunRequest>,
  output: __S(280, __c35, 0) as any as S.Schema<DeleteRunResult>,
  errors: [ArgumentException, LimitExceededException, NotFoundException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRun",
}));

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
  input: __S(328, __c41, 0) as any as S.Schema<DeleteTestGridProjectRequest>,
  output: __S(280, __c35, 0) as any as S.Schema<DeleteTestGridProjectResult>,
  errors: [ArgumentException, CannotDeleteException, InternalServiceException, NotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTestGridProject",
}));

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
  input: __S(336, __c42, 0) as any as S.Schema<DeleteUploadRequest>,
  output: __S(280, __c35, 0) as any as S.Schema<DeleteUploadResult>,
  errors: [ArgumentException, LimitExceededException, NotFoundException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUpload",
}));

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
  input: __S(344, __c43, 0) as any as S.Schema<DeleteVPCEConfigurationRequest>,
  output: __S(280, __c35, 0) as any as S.Schema<DeleteVPCEConfigurationResult>,
  errors: [
    ArgumentException,
    InvalidOperationException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVPCEConfiguration",
}));

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
  input: __S(352, __c44, 0) as any as S.Schema<GetAccountSettingsRequest>,
  output: __S(357, __c44, 5) as any as S.Schema<GetAccountSettingsResult>,
  errors: [ArgumentException, LimitExceededException, NotFoundException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountSettings",
}));

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
  input: __S(360, __c45, 0) as any as S.Schema<GetDeviceRequest>,
  output: __S(361, __c45, 1) as any as S.Schema<GetDeviceResult>,
  errors: [ArgumentException, LimitExceededException, NotFoundException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDevice",
}));

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
  input: __S(368, __c46, 0) as any as S.Schema<GetDeviceInstanceRequest>,
  output: __S(376, __c47, 0) as any as S.Schema<GetDeviceInstanceResult>,
  errors: [ArgumentException, LimitExceededException, NotFoundException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeviceInstance",
}));

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
  input: __S(384, __c48, 0) as any as S.Schema<GetDevicePoolRequest>,
  output: __S(16, __c2, 0) as any as S.Schema<GetDevicePoolResult>,
  errors: [ArgumentException, LimitExceededException, NotFoundException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDevicePool",
}));

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
  input: __S(392, __c49, 0) as any as S.Schema<GetDevicePoolCompatibilityRequest>,
  output: __S(397, __c49, 5) as any as S.Schema<GetDevicePoolCompatibilityResult>,
  errors: [ArgumentException, LimitExceededException, NotFoundException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDevicePoolCompatibility",
}));

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
  input: __S(416, __c52, 0) as any as S.Schema<GetInstanceProfileRequest>,
  output: __S(48, __c6, 0) as any as S.Schema<GetInstanceProfileResult>,
  errors: [ArgumentException, LimitExceededException, NotFoundException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInstanceProfile",
}));

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
  input: __S(424, __c53, 0) as any as S.Schema<GetJobRequest>,
  output: __S(448, __c56, 0) as any as S.Schema<GetJobResult>,
  errors: [ArgumentException, LimitExceededException, NotFoundException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJob",
}));

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
  input: __S(456, __c57, 0) as any as S.Schema<GetNetworkProfileRequest>,
  output: __S(72, __c9, 0) as any as S.Schema<GetNetworkProfileResult>,
  errors: [ArgumentException, LimitExceededException, NotFoundException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNetworkProfile",
}));

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
  input: __S(464, __c58, 0) as any as S.Schema<GetOfferingStatusRequest>,
  output: __S(466, __c58, 2) as any as S.Schema<GetOfferingStatusResult>,
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
  input: __S(488, __c61, 0) as any as S.Schema<GetProjectRequest>,
  output: __S(112, __c14, 0) as any as S.Schema<GetProjectResult>,
  errors: [ArgumentException, LimitExceededException, NotFoundException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProject",
}));

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
  input: __S(496, __c62, 0) as any as S.Schema<GetRemoteAccessSessionRequest>,
  output: __S(184, __c23, 0) as any as S.Schema<GetRemoteAccessSessionResult>,
  errors: [ArgumentException, LimitExceededException, NotFoundException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRemoteAccessSession",
}));

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
  input: __S(504, __c63, 0) as any as S.Schema<GetRunRequest>,
  output: __S(528, __c66, 0) as any as S.Schema<GetRunResult>,
  errors: [ArgumentException, LimitExceededException, NotFoundException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRun",
}));

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
  input: __S(536, __c67, 0) as any as S.Schema<GetSuiteRequest>,
  output: __S(537, __c67, 1) as any as S.Schema<GetSuiteResult>,
  errors: [ArgumentException, LimitExceededException, NotFoundException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSuite",
}));

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
  input: __S(552, __c69, 0) as any as S.Schema<GetTestRequest>,
  output: __S(553, __c69, 1) as any as S.Schema<GetTestResult>,
  errors: [ArgumentException, LimitExceededException, NotFoundException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTest",
}));

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
  input: __S(560, __c70, 0) as any as S.Schema<GetTestGridProjectRequest>,
  output: __S(208, __c26, 0) as any as S.Schema<GetTestGridProjectResult>,
  errors: [ArgumentException, InternalServiceException, NotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTestGridProject",
}));

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
  input: __S(568, __c71, 0) as any as S.Schema<GetTestGridSessionRequest>,
  output: __S(569, __c71, 1) as any as S.Schema<GetTestGridSessionResult>,
  errors: [ArgumentException, InternalServiceException, NotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTestGridSession",
}));

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
  input: __S(584, __c73, 0) as any as S.Schema<GetUploadRequest>,
  output: __S(240, __c30, 0) as any as S.Schema<GetUploadResult>,
  errors: [ArgumentException, LimitExceededException, NotFoundException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUpload",
}));

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
  input: __S(592, __c74, 0) as any as S.Schema<GetVPCEConfigurationRequest>,
  output: __S(264, __c33, 0) as any as S.Schema<GetVPCEConfigurationResult>,
  errors: [ArgumentException, NotFoundException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVPCEConfiguration",
}));

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
  input: __S(600, __c75, 0) as any as S.Schema<InstallToRemoteAccessSessionRequest>,
  output: __S(601, __c75, 1) as any as S.Schema<InstallToRemoteAccessSessionResult>,
  errors: [ArgumentException, LimitExceededException, NotFoundException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InstallToRemoteAccessSession",
}));

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
  input: __S(608, __c76, 0) as any as S.Schema<ListArtifactsRequest>,
  output: __S(611, __c76, 3) as any as S.Schema<ListArtifactsResult>,
  errors: [ArgumentException, LimitExceededException, NotFoundException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListArtifacts",
  pagination: { inputToken: "nextToken", outputToken: "nextToken", items: "artifacts" } as const,
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
  input: __S(616, __c77, 0) as any as S.Schema<ListDeviceInstancesRequest>,
  output: __S(617, __c77, 1) as any as S.Schema<ListDeviceInstancesResult>,
  errors: [ArgumentException, LimitExceededException, NotFoundException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeviceInstances",
}));

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
  input: __S(624, __c78, 0) as any as S.Schema<ListDevicePoolsRequest>,
  output: __S(626, __c78, 2) as any as S.Schema<ListDevicePoolsResult>,
  errors: [ArgumentException, LimitExceededException, NotFoundException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDevicePools",
  pagination: { inputToken: "nextToken", outputToken: "nextToken", items: "devicePools" } as const,
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
  input: __S(632, __c79, 0) as any as S.Schema<ListDevicesRequest>,
  output: __S(634, __c79, 2) as any as S.Schema<ListDevicesResult>,
  errors: [ArgumentException, LimitExceededException, NotFoundException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDevices",
  pagination: { inputToken: "nextToken", outputToken: "nextToken", items: "devices" } as const,
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
  input: __S(640, __c80, 0) as any as S.Schema<ListInstanceProfilesRequest>,
  output: __S(642, __c80, 2) as any as S.Schema<ListInstanceProfilesResult>,
  errors: [ArgumentException, LimitExceededException, NotFoundException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInstanceProfiles",
}));

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
  input: __S(648, __c81, 0) as any as S.Schema<ListJobsRequest>,
  output: __S(650, __c81, 2) as any as S.Schema<ListJobsResult>,
  errors: [ArgumentException, LimitExceededException, NotFoundException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListJobs",
  pagination: { inputToken: "nextToken", outputToken: "nextToken", items: "jobs" } as const,
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
  input: __S(656, __c82, 0) as any as S.Schema<ListNetworkProfilesRequest>,
  output: __S(658, __c82, 2) as any as S.Schema<ListNetworkProfilesResult>,
  errors: [ArgumentException, LimitExceededException, NotFoundException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNetworkProfiles",
}));

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
  input: __S(664, __c83, 0) as any as S.Schema<ListOfferingPromotionsRequest>,
  output: __S(667, __c83, 3) as any as S.Schema<ListOfferingPromotionsResult>,
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
}));

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
  input: __S(672, __c84, 0) as any as S.Schema<ListOfferingsRequest>,
  output: __S(674, __c84, 2) as any as S.Schema<ListOfferingsResult>,
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
  pagination: { inputToken: "nextToken", outputToken: "nextToken", items: "offerings" } as const,
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
  input: __S(680, __c85, 0) as any as S.Schema<ListOfferingTransactionsRequest>,
  output: __S(682, __c85, 2) as any as S.Schema<ListOfferingTransactionsResult>,
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
  input: __S(696, __c87, 0) as any as S.Schema<ListProjectsRequest>,
  output: __S(698, __c87, 2) as any as S.Schema<ListProjectsResult>,
  errors: [ArgumentException, LimitExceededException, NotFoundException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProjects",
  pagination: { inputToken: "nextToken", outputToken: "nextToken", items: "projects" } as const,
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
  input: __S(704, __c88, 0) as any as S.Schema<ListRemoteAccessSessionsRequest>,
  output: __S(706, __c88, 2) as any as S.Schema<ListRemoteAccessSessionsResult>,
  errors: [ArgumentException, LimitExceededException, NotFoundException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRemoteAccessSessions",
}));

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
  input: __S(712, __c89, 0) as any as S.Schema<ListRunsRequest>,
  output: __S(714, __c89, 2) as any as S.Schema<ListRunsResult>,
  errors: [ArgumentException, LimitExceededException, NotFoundException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRuns",
  pagination: { inputToken: "nextToken", outputToken: "nextToken", items: "runs" } as const,
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
  input: __S(720, __c90, 0) as any as S.Schema<ListSamplesRequest>,
  output: __S(723, __c90, 3) as any as S.Schema<ListSamplesResult>,
  errors: [ArgumentException, LimitExceededException, NotFoundException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSamples",
  pagination: { inputToken: "nextToken", outputToken: "nextToken", items: "samples" } as const,
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
  input: __S(728, __c91, 0) as any as S.Schema<ListSuitesRequest>,
  output: __S(729, __c91, 1) as any as S.Schema<ListSuitesResult>,
  errors: [ArgumentException, LimitExceededException, NotFoundException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSuites",
  pagination: { inputToken: "nextToken", outputToken: "nextToken", items: "suites" } as const,
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
  input: __S(744, __c93, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(745, __c93, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [ArgumentException, NotFoundException, TagOperationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListTestGridProjectsError = ArgumentException | InternalServiceException | CommonErrors;
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
  input: __S(760, __c95, 0) as any as S.Schema<ListTestGridProjectsRequest>,
  output: __S(762, __c95, 2) as any as S.Schema<ListTestGridProjectsResult>,
  errors: [ArgumentException, InternalServiceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTestGridProjects",
  pagination: { inputToken: "nextToken", outputToken: "nextToken", pageSize: "maxResult" } as const,
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
  input: __S(768, __c96, 0) as any as S.Schema<ListTestGridSessionActionsRequest>,
  output: __S(771, __c96, 3) as any as S.Schema<ListTestGridSessionActionsResult>,
  errors: [ArgumentException, InternalServiceException, NotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTestGridSessionActions",
  pagination: { inputToken: "nextToken", outputToken: "nextToken", pageSize: "maxResult" } as const,
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
  input: __S(776, __c97, 0) as any as S.Schema<ListTestGridSessionArtifactsRequest>,
  output: __S(779, __c97, 3) as any as S.Schema<ListTestGridSessionArtifactsResult>,
  errors: [ArgumentException, InternalServiceException, NotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTestGridSessionArtifacts",
  pagination: { inputToken: "nextToken", outputToken: "nextToken", pageSize: "maxResult" } as const,
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
  input: __S(784, __c98, 0) as any as S.Schema<ListTestGridSessionsRequest>,
  output: __S(786, __c98, 2) as any as S.Schema<ListTestGridSessionsResult>,
  errors: [ArgumentException, InternalServiceException, NotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTestGridSessions",
  pagination: { inputToken: "nextToken", outputToken: "nextToken", pageSize: "maxResult" } as const,
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
  input: __S(792, __c99, 0) as any as S.Schema<ListTestsRequest>,
  output: __S(793, __c99, 1) as any as S.Schema<ListTestsResult>,
  errors: [ArgumentException, LimitExceededException, NotFoundException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTests",
  pagination: { inputToken: "nextToken", outputToken: "nextToken", items: "tests" } as const,
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
  input: __S(800, __c100, 0) as any as S.Schema<ListUniqueProblemsRequest>,
  output: __S(807, __c100, 7) as any as S.Schema<ListUniqueProblemsResult>,
  errors: [ArgumentException, LimitExceededException, NotFoundException, ServiceAccountException],
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
  input: __S(808, __c101, 0) as any as S.Schema<ListUploadsRequest>,
  output: __S(810, __c101, 2) as any as S.Schema<ListUploadsResult>,
  errors: [ArgumentException, LimitExceededException, NotFoundException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUploads",
  pagination: { inputToken: "nextToken", outputToken: "nextToken", items: "uploads" } as const,
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
  input: __S(816, __c102, 0) as any as S.Schema<ListVPCEConfigurationsRequest>,
  output: __S(818, __c102, 2) as any as S.Schema<ListVPCEConfigurationsResult>,
  errors: [ArgumentException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVPCEConfigurations",
}));

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
  input: __S(824, __c103, 0) as any as S.Schema<PurchaseOfferingRequest>,
  output: __S(832, __c104, 0) as any as S.Schema<PurchaseOfferingResult>,
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
}));

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
  input: __S(840, __c105, 0) as any as S.Schema<RenewOfferingRequest>,
  output: __S(832, __c104, 0) as any as S.Schema<RenewOfferingResult>,
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
}));

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
  input: __S(850, __c106, 2) as any as S.Schema<ScheduleRunRequest>,
  output: __S(528, __c66, 0) as any as S.Schema<ScheduleRunResult>,
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
}));

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
  input: __S(856, __c107, 0) as any as S.Schema<StopJobRequest>,
  output: __S(448, __c56, 0) as any as S.Schema<StopJobResult>,
  errors: [ArgumentException, LimitExceededException, NotFoundException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopJob",
}));

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
  input: __S(864, __c108, 0) as any as S.Schema<StopRemoteAccessSessionRequest>,
  output: __S(184, __c23, 0) as any as S.Schema<StopRemoteAccessSessionResult>,
  errors: [ArgumentException, LimitExceededException, NotFoundException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopRemoteAccessSession",
}));

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
  input: __S(872, __c109, 0) as any as S.Schema<StopRunRequest>,
  output: __S(528, __c66, 0) as any as S.Schema<StopRunResult>,
  errors: [ArgumentException, LimitExceededException, NotFoundException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopRun",
}));

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
  input: __S(880, __c110, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(280, __c35, 0) as any as S.Schema<TagResourceResponse>,
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
}));

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
  input: __S(888, __c111, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(280, __c35, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [ArgumentException, NotFoundException, TagOperationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

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
  input: __S(896, __c112, 0) as any as S.Schema<UpdateDeviceInstanceRequest>,
  output: __S(376, __c47, 0) as any as S.Schema<UpdateDeviceInstanceResult>,
  errors: [ArgumentException, LimitExceededException, NotFoundException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDeviceInstance",
}));

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
  input: __S(904, __c113, 0) as any as S.Schema<UpdateDevicePoolRequest>,
  output: __S(16, __c2, 0) as any as S.Schema<UpdateDevicePoolResult>,
  errors: [ArgumentException, LimitExceededException, NotFoundException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDevicePool",
}));

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
  input: __S(912, __c114, 0) as any as S.Schema<UpdateInstanceProfileRequest>,
  output: __S(48, __c6, 0) as any as S.Schema<UpdateInstanceProfileResult>,
  errors: [ArgumentException, LimitExceededException, NotFoundException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateInstanceProfile",
}));

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
  input: __S(920, __c115, 0) as any as S.Schema<UpdateNetworkProfileRequest>,
  output: __S(72, __c9, 0) as any as S.Schema<UpdateNetworkProfileResult>,
  errors: [ArgumentException, LimitExceededException, NotFoundException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNetworkProfile",
}));

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
  input: __S(928, __c116, 0) as any as S.Schema<UpdateProjectRequest>,
  output: __S(112, __c14, 0) as any as S.Schema<UpdateProjectResult>,
  errors: [ArgumentException, LimitExceededException, NotFoundException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProject",
}));

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
  input: __S(936, __c117, 0) as any as S.Schema<UpdateTestGridProjectRequest>,
  output: __S(208, __c26, 0) as any as S.Schema<UpdateTestGridProjectResult>,
  errors: [ArgumentException, InternalServiceException, LimitExceededException, NotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTestGridProject",
}));

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
  input: __S(944, __c118, 0) as any as S.Schema<UpdateUploadRequest>,
  output: __S(240, __c30, 0) as any as S.Schema<UpdateUploadResult>,
  errors: [ArgumentException, LimitExceededException, NotFoundException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUpload",
}));

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
  input: __S(952, __c119, 0) as any as S.Schema<UpdateVPCEConfigurationRequest>,
  output: __S(264, __c33, 0) as any as S.Schema<UpdateVPCEConfigurationResult>,
  errors: [
    ArgumentException,
    InvalidOperationException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateVPCEConfiguration",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          projectArn: S.String,
          name: S.String,
          description: S.optional(S.String),
          rules: __S(9, __c1, 1),
          maxDevices: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDevicePoolRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          attribute: S.optional(S.String),
          operator: S.optional(S.String),
          value: S.optional(S.String),
        }),
      ).annotate({ identifier: "Rule" });
    case 1:
      return S.Array(__S(8, __c1, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
          type: S.optional(S.String),
          rules: S.optional(__S(9, __c1, 1)),
          maxDevices: S.optional(S.Number),
        }),
      ).annotate({ identifier: "DevicePool" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ devicePool: S.optional(__S(10, __c1, 2)) }).pipe(ns),
      ).annotate({ identifier: "CreateDevicePoolResult" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          packageCleanup: S.optional(S.Boolean),
          excludeAppPackagesFromCleanup: S.optional(__S(32, __c4, 0)),
          rebootAfterUse: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateInstanceProfileRequest" });
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
          arn: S.optional(S.String),
          packageCleanup: S.optional(S.Boolean),
          excludeAppPackagesFromCleanup: S.optional(__S(32, __c4, 0)),
          rebootAfterUse: S.optional(S.Boolean),
          name: S.optional(S.String),
          description: S.optional(S.String),
        }),
      ).annotate({ identifier: "InstanceProfile" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ instanceProfile: S.optional(__S(40, __c5, 0)) }).pipe(ns),
      ).annotate({ identifier: "CreateInstanceProfileResult" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          projectArn: S.String,
          name: S.String,
          description: S.optional(S.String),
          type: S.optional(S.String),
          uplinkBandwidthBits: S.optional(S.Number),
          downlinkBandwidthBits: S.optional(S.Number),
          uplinkDelayMs: S.optional(S.Number),
          downlinkDelayMs: S.optional(S.Number),
          uplinkJitterMs: S.optional(S.Number),
          downlinkJitterMs: S.optional(S.Number),
          uplinkLossPercent: S.optional(S.Number),
          downlinkLossPercent: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateNetworkProfileRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
          type: S.optional(S.String),
          uplinkBandwidthBits: S.optional(S.Number),
          downlinkBandwidthBits: S.optional(S.Number),
          uplinkDelayMs: S.optional(S.Number),
          downlinkDelayMs: S.optional(S.Number),
          uplinkJitterMs: S.optional(S.Number),
          downlinkJitterMs: S.optional(S.Number),
          uplinkLossPercent: S.optional(S.Number),
          downlinkLossPercent: S.optional(S.Number),
        }),
      ).annotate({ identifier: "NetworkProfile" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ networkProfile: S.optional(__S(64, __c8, 0)) }).pipe(ns),
      ).annotate({ identifier: "CreateNetworkProfileResult" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          defaultJobTimeoutMinutes: S.optional(S.Number),
          vpcConfig: S.optional(__S(88, __c11, 0)),
          environmentVariables: S.optional(__S(97, __c12, 1)),
          executionRoleArn: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateProjectRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          securityGroupIds: __S(32, __c4, 0),
          subnetIds: __S(32, __c4, 0),
          vpcId: S.String,
        }),
      ).annotate({ identifier: "VpcConfig" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, value: S.String })).annotate({
        identifier: "EnvironmentVariable",
      });
    case 1:
      return S.Array(__S(96, __c12, 0));
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          name: S.optional(S.String),
          defaultJobTimeoutMinutes: S.optional(S.Number),
          created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          vpcConfig: S.optional(__S(88, __c11, 0)),
          environmentVariables: S.optional(__S(97, __c12, 1)),
          executionRoleArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "Project" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ project: S.optional(__S(104, __c13, 0)) }).pipe(ns),
      ).annotate({ identifier: "CreateProjectResult" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          auxiliaryApps: S.optional(__S(32, __c4, 0)),
          billingMethod: S.optional(S.String),
          vpceConfigurationArns: S.optional(__S(32, __c4, 0)),
          deviceProxy: S.optional(__S(152, __c19, 0)),
          parameters: S.optional(__S(160, __c20, 0)),
        }),
      ).annotate({ identifier: "CreateRemoteAccessSessionConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          projectArn: S.String,
          deviceArn: S.String,
          appArn: S.optional(S.String),
          instanceArn: S.optional(S.String),
          name: S.optional(S.String),
          configuration: S.optional(__S(120, __c15, 0)),
          interactionMode: S.optional(S.String),
          skipAppResign: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateRemoteAccessSessionRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          deviceArn: S.optional(S.String),
          labels: S.optional(__S(32, __c4, 0)),
          status: S.optional(S.String),
          udid: S.optional(S.String),
          instanceProfile: S.optional(__S(40, __c5, 0)),
        }),
      ).annotate({ identifier: "DeviceInstance" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(128, __c16, 0));
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          frequency: S.optional(S.String),
          architecture: S.optional(S.String),
          clock: S.optional(S.Number),
        }),
      ).annotate({ identifier: "CPU" });
    case 1:
      return S.suspend(() =>
        S.Struct({ width: S.optional(S.Number), height: S.optional(S.Number) }),
      ).annotate({ identifier: "Resolution" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          name: S.optional(S.String),
          manufacturer: S.optional(S.String),
          model: S.optional(S.String),
          modelId: S.optional(S.String),
          formFactor: S.optional(S.String),
          platform: S.optional(S.String),
          os: S.optional(S.String),
          cpu: S.optional(__S(144, __c18, 0)),
          resolution: S.optional(__S(145, __c18, 1)),
          heapSize: S.optional(S.Number),
          memory: S.optional(S.Number),
          image: S.optional(S.String),
          carrier: S.optional(S.String),
          radio: S.optional(S.String),
          remoteAccessEnabled: S.optional(S.Boolean),
          remoteDebugEnabled: S.optional(S.Boolean),
          fleetType: S.optional(S.String),
          fleetName: S.optional(S.String),
          instances: S.optional(__S(136, __c17, 0)),
          availability: S.optional(S.String),
        }),
      ).annotate({ identifier: "Device" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ host: S.String, port: S.Number })).annotate({
        identifier: "DeviceProxy",
      });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          total: S.optional(S.Number),
          metered: S.optional(S.Number),
          unmetered: S.optional(S.Number),
        }),
      ).annotate({ identifier: "DeviceMinutes" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          remoteDriverEndpoint: S.optional(SensitiveString),
          interactiveEndpoint: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "RemoteAccessEndpoints" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          name: S.optional(S.String),
          created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          status: S.optional(S.String),
          result: S.optional(S.String),
          message: S.optional(S.String),
          started: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          stopped: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          device: S.optional(__S(146, __c18, 2)),
          instanceArn: S.optional(S.String),
          billingMethod: S.optional(S.String),
          deviceMinutes: S.optional(__S(168, __c21, 0)),
          endpoint: S.optional(S.String),
          deviceUdid: S.optional(S.String),
          interactionMode: S.optional(S.String),
          skipAppResign: S.optional(S.Boolean),
          vpcConfig: S.optional(__S(88, __c11, 0)),
          deviceProxy: S.optional(__S(152, __c19, 0)),
          appUpload: S.optional(S.String),
          endpoints: S.optional(__S(176, __c22, 0)),
        }),
      ).annotate({ identifier: "RemoteAccessSession" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ remoteAccessSession: S.optional(__S(177, __c22, 1)) }).pipe(ns),
      ).annotate({ identifier: "CreateRemoteAccessSessionResult" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          vpcConfig: S.optional(__S(88, __c11, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateTestGridProjectRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
          vpcConfig: S.optional(__S(88, __c11, 0)),
          created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "TestGridProject" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ testGridProject: S.optional(__S(200, __c25, 0)) }).pipe(ns),
      ).annotate({ identifier: "CreateTestGridProjectResult" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ projectArn: S.String, expiresInSeconds: S.Number }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateTestGridUrlRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          url: S.optional(SensitiveString),
          expires: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(ns),
      ).annotate({ identifier: "CreateTestGridUrlResult" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          projectArn: S.String,
          name: S.String,
          type: S.String,
          contentType: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateUploadRequest" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          name: S.optional(S.String),
          created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          type: S.optional(S.String),
          status: S.optional(S.String),
          url: S.optional(SensitiveString),
          metadata: S.optional(S.String),
          contentType: S.optional(S.String),
          message: S.optional(S.String),
          category: S.optional(S.String),
        }),
      ).annotate({ identifier: "Upload" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ upload: S.optional(__S(232, __c29, 0)) }).pipe(ns),
      ).annotate({ identifier: "CreateUploadResult" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          vpceConfigurationName: S.String,
          vpceServiceName: S.String,
          serviceDnsName: S.String,
          vpceConfigurationDescription: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateVPCEConfigurationRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          vpceConfigurationName: S.optional(S.String),
          vpceServiceName: S.optional(S.String),
          serviceDnsName: S.optional(S.String),
          vpceConfigurationDescription: S.optional(S.String),
        }),
      ).annotate({ identifier: "VPCEConfiguration" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ vpceConfiguration: S.optional(__S(256, __c32, 0)) }).pipe(ns),
      ).annotate({ identifier: "CreateVPCEConfigurationResult" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDevicePoolRequest" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteDevicePoolResult",
      });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteInstanceProfileRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteNetworkProfileRequest" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteProjectRequest" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteRemoteAccessSessionRequest" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteRunRequest" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ projectArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteTestGridProjectRequest" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteUploadRequest" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteVPCEConfigurationRequest" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetAccountSettingsRequest" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ S.Number.pipe(S.optional));
    case 2:
      return S.suspend(() =>
        S.Struct({ total: S.optional(S.Number), remaining: S.optional(S.Number) }),
      ).annotate({ identifier: "TrialMinutes" });
    case 3:
      return S.Record(S.String, /*@__PURE__*/ S.Number.pipe(S.optional));
    case 4:
      return S.suspend(() =>
        S.Struct({
          awsAccountNumber: S.optional(S.String),
          unmeteredDevices: S.optional(__S(353, __c44, 1)),
          unmeteredRemoteAccessDevices: S.optional(__S(353, __c44, 1)),
          maxJobTimeoutMinutes: S.optional(S.Number),
          trialMinutes: S.optional(__S(354, __c44, 2)),
          maxSlots: S.optional(__S(355, __c44, 3)),
          defaultJobTimeoutMinutes: S.optional(S.Number),
          skipAppResign: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "AccountSettings" });
    case 5:
      return S.suspend(() =>
        S.Struct({ accountSettings: S.optional(__S(356, __c44, 4)) }).pipe(ns),
      ).annotate({ identifier: "GetAccountSettingsResult" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetDeviceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ device: S.optional(__S(146, __c18, 2)) }).pipe(ns),
      ).annotate({ identifier: "GetDeviceResult" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetDeviceInstanceRequest" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ deviceInstance: S.optional(__S(128, __c16, 0)) }).pipe(ns),
      ).annotate({ identifier: "GetDeviceInstanceResult" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetDevicePoolRequest" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          devicePoolArn: S.String,
          appArn: S.optional(S.String),
          testType: S.optional(S.String),
          test: S.optional(__S(408, __c51, 0)),
          configuration: S.optional(__S(409, __c51, 1)),
          projectArn: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetDevicePoolCompatibilityRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ message: S.optional(S.String), type: S.optional(S.String) }),
      ).annotate({ identifier: "IncompatibilityMessage" });
    case 2:
      return S.Array(__S(393, __c49, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          device: S.optional(__S(146, __c18, 2)),
          compatible: S.optional(S.Boolean),
          incompatibilityMessages: S.optional(__S(394, __c49, 2)),
        }),
      ).annotate({ identifier: "DevicePoolCompatibilityResult" });
    case 4:
      return S.Array(__S(395, __c49, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          compatibleDevices: S.optional(__S(396, __c49, 4)),
          incompatibleDevices: S.optional(__S(396, __c49, 4)),
        }).pipe(ns),
      ).annotate({ identifier: "GetDevicePoolCompatibilityResult" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ latitude: S.Number, longitude: S.Number })).annotate({
        identifier: "Location",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          iosPaths: S.optional(__S(32, __c4, 0)),
          androidPaths: S.optional(__S(32, __c4, 0)),
          deviceHostPaths: S.optional(__S(32, __c4, 0)),
        }),
      ).annotate({ identifier: "CustomerArtifactPaths" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          wifi: S.optional(S.Boolean),
          bluetooth: S.optional(S.Boolean),
          nfc: S.optional(S.Boolean),
          gps: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "Radios" });
    case 3:
      return S.Array(S.String);
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          testPackageArn: S.optional(S.String),
          testSpecArn: S.optional(S.String),
          filter: S.optional(S.String),
          parameters: S.optional(__S(160, __c20, 0)),
        }),
      ).annotate({ identifier: "ScheduleRunTest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          extraDataPackageArn: S.optional(S.String),
          networkProfileArn: S.optional(S.String),
          locale: S.optional(S.String),
          location: S.optional(__S(400, __c50, 0)),
          vpceConfigurationArns: S.optional(__S(32, __c4, 0)),
          deviceProxy: S.optional(__S(152, __c19, 0)),
          customerArtifactPaths: S.optional(__S(401, __c50, 1)),
          radios: S.optional(__S(402, __c50, 2)),
          auxiliaryApps: S.optional(__S(32, __c4, 0)),
          billingMethod: S.optional(S.String),
          environmentVariables: S.optional(__S(97, __c12, 1)),
          executionRoleArn: S.optional(S.String),
          insightsTypes: S.optional(__S(403, __c50, 3)),
        }),
      ).annotate({ identifier: "ScheduleRunConfiguration" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetInstanceProfileRequest" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetJobRequest" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          total: S.optional(S.Number),
          passed: S.optional(S.Number),
          failed: S.optional(S.Number),
          warned: S.optional(S.Number),
          errored: S.optional(S.Number),
          stopped: S.optional(S.Number),
          skipped: S.optional(S.Number),
        }),
      ).annotate({ identifier: "Counters" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          testsTotal: S.optional(S.Number),
          testsPassed: S.optional(S.Number),
          testsFailed: S.optional(S.Number),
          testsSkipped: S.optional(S.Number),
          testsErrored: S.optional(S.Number),
          testsOther: S.optional(S.Number),
          testsPassedPercentage: S.optional(S.Number),
          totalTestExecutionDurationSeconds: S.optional(S.Number),
          medianTestExecutionDurationSeconds: S.optional(S.Number),
        }),
      ).annotate({ identifier: "TestReportMetrics" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          message: S.optional(S.String),
          metrics: S.optional(__S(440, __c55, 0)),
          testDetailsUrl: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "TestReport" });
    case 2:
      return S.suspend(() =>
        S.Struct({ status: S.optional(S.String), testReport: S.optional(__S(441, __c55, 1)) }),
      ).annotate({ identifier: "JobInsights" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          name: S.optional(S.String),
          type: S.optional(S.String),
          created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          status: S.optional(S.String),
          result: S.optional(S.String),
          started: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          stopped: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          counters: S.optional(__S(432, __c54, 0)),
          message: S.optional(S.String),
          device: S.optional(__S(146, __c18, 2)),
          instanceArn: S.optional(S.String),
          deviceMinutes: S.optional(__S(168, __c21, 0)),
          videoEndpoint: S.optional(S.String),
          videoCapture: S.optional(S.Boolean),
          insights: S.optional(__S(442, __c55, 2)),
        }),
      ).annotate({ identifier: "Job" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ job: S.optional(__S(443, __c55, 3)) }).pipe(ns)).annotate({
        identifier: "GetJobResult",
      });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetNetworkProfileRequest" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetOfferingStatusRequest" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(480, __c60, 0).pipe(S.optional));
    case 2:
      return S.suspend(() =>
        S.Struct({
          current: S.optional(__S(465, __c58, 1)),
          nextPeriod: S.optional(__S(465, __c58, 1)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetOfferingStatusResult" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ amount: S.optional(S.Number), currencyCode: S.optional(S.String) }),
      ).annotate({ identifier: "MonetaryAmount" });
    case 1:
      return S.suspend(() =>
        S.Struct({ cost: S.optional(__S(472, __c59, 0)), frequency: S.optional(S.String) }),
      ).annotate({ identifier: "RecurringCharge" });
    case 2:
      return S.Array(__S(473, __c59, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          description: S.optional(S.String),
          type: S.optional(S.String),
          platform: S.optional(S.String),
          recurringCharges: S.optional(__S(474, __c59, 2)),
        }),
      ).annotate({ identifier: "Offering" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          offering: S.optional(__S(475, __c59, 3)),
          quantity: S.optional(S.Number),
          effectiveOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "OfferingStatus" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetProjectRequest" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetRemoteAccessSessionRequest" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetRunRequest" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ attribute: S.String, operator: S.String, values: __S(32, __c4, 0) }),
      ).annotate({ identifier: "DeviceFilter" });
    case 1:
      return S.Array(__S(512, __c64, 0));
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          filters: S.optional(__S(513, __c64, 1)),
          matchedDevicesCount: S.optional(S.Number),
          maxDevices: S.optional(S.Number),
        }),
      ).annotate({ identifier: "DeviceSelectionResult" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          jobsTotal: S.optional(S.Number),
          jobsPassed: S.optional(S.Number),
          jobsFailed: S.optional(S.Number),
          jobsSkipped: S.optional(S.Number),
          jobsErrored: S.optional(S.Number),
          jobsStopped: S.optional(S.Number),
          jobsPassedPercentage: S.optional(S.Number),
          totalJobExecutionDurationSeconds: S.optional(S.Number),
          averageJobExecutionDurationSeconds: S.optional(S.Number),
          medianJobExecutionDurationSeconds: S.optional(S.Number),
        }),
      ).annotate({ identifier: "JobReportMetrics" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          message: S.optional(S.String),
          metrics: S.optional(__S(521, __c65, 1)),
          jobDetailsUrl: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "JobReport" });
    case 3:
      return S.suspend(() =>
        S.Struct({ status: S.optional(S.String), jobReport: S.optional(__S(522, __c65, 2)) }),
      ).annotate({ identifier: "RunInsights" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          name: S.optional(S.String),
          type: S.optional(S.String),
          platform: S.optional(S.String),
          created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          status: S.optional(S.String),
          result: S.optional(S.String),
          started: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          stopped: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          counters: S.optional(__S(432, __c54, 0)),
          message: S.optional(S.String),
          totalJobs: S.optional(S.Number),
          completedJobs: S.optional(S.Number),
          billingMethod: S.optional(S.String),
          deviceMinutes: S.optional(__S(168, __c21, 0)),
          networkProfile: S.optional(__S(64, __c8, 0)),
          deviceProxy: S.optional(__S(152, __c19, 0)),
          parsingResultUrl: S.optional(S.String),
          resultCode: S.optional(S.String),
          seed: S.optional(S.Number),
          appUpload: S.optional(S.String),
          eventCount: S.optional(S.Number),
          jobTimeoutMinutes: S.optional(S.Number),
          devicePoolArn: S.optional(S.String),
          locale: S.optional(S.String),
          radios: S.optional(__S(402, __c50, 2)),
          location: S.optional(__S(400, __c50, 0)),
          customerArtifactPaths: S.optional(__S(401, __c50, 1)),
          webUrl: S.optional(S.String),
          skipAppResign: S.optional(S.Boolean),
          testSpecArn: S.optional(S.String),
          deviceSelectionResult: S.optional(__S(520, __c65, 0)),
          vpcConfig: S.optional(__S(88, __c11, 0)),
          executionRoleArn: S.optional(S.String),
          environmentVariables: S.optional(__S(97, __c12, 1)),
          insightsTypes: S.optional(__S(403, __c50, 3)),
          insights: S.optional(__S(523, __c65, 3)),
        }),
      ).annotate({ identifier: "Run" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ run: S.optional(__S(524, __c65, 4)) }).pipe(ns)).annotate({
        identifier: "GetRunResult",
      });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetSuiteRequest" });
    case 1:
      return S.suspend(() => S.Struct({ suite: S.optional(__S(544, __c68, 0)) }).pipe(ns)).annotate(
        { identifier: "GetSuiteResult" },
      );
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          name: S.optional(S.String),
          type: S.optional(S.String),
          created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          status: S.optional(S.String),
          result: S.optional(S.String),
          started: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          stopped: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          counters: S.optional(__S(432, __c54, 0)),
          message: S.optional(S.String),
          deviceMinutes: S.optional(__S(168, __c21, 0)),
        }),
      ).annotate({ identifier: "Suite" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetTestRequest" });
    case 1:
      return S.suspend(() => S.Struct({ test: S.optional(__S(544, __c68, 0)) }).pipe(ns)).annotate({
        identifier: "GetTestResult",
      });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ projectArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetTestGridProjectRequest" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          projectArn: S.optional(S.String),
          sessionId: S.optional(S.String),
          sessionArn: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetTestGridSessionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ testGridSession: S.optional(__S(576, __c72, 0)) }).pipe(ns),
      ).annotate({ identifier: "GetTestGridSessionResult" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          status: S.optional(S.String),
          created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ended: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          billingMinutes: S.optional(S.Number),
          seleniumProperties: S.optional(S.String),
        }),
      ).annotate({ identifier: "TestGridSession" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetUploadRequest" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetVPCEConfigurationRequest" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ remoteAccessSessionArn: S.String, appArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "InstallToRemoteAccessSessionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ appUpload: S.optional(__S(232, __c29, 0)) }).pipe(ns),
      ).annotate({ identifier: "InstallToRemoteAccessSessionResult" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String, type: S.String, nextToken: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListArtifactsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          name: S.optional(S.String),
          type: S.optional(S.String),
          extension: S.optional(S.String),
          url: S.optional(S.String),
        }),
      ).annotate({ identifier: "Artifact" });
    case 2:
      return S.Array(__S(609, __c76, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          artifacts: S.optional(__S(610, __c76, 2)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListArtifactsResult" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ maxResults: S.optional(S.Number), nextToken: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListDeviceInstancesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          deviceInstances: S.optional(__S(136, __c17, 0)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListDeviceInstancesResult" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          type: S.optional(S.String),
          nextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDevicePoolsRequest" });
    case 1:
      return S.Array(__S(10, __c1, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({
          devicePools: S.optional(__S(625, __c78, 1)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListDevicePoolsResult" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          nextToken: S.optional(S.String),
          filters: S.optional(__S(513, __c64, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDevicesRequest" });
    case 1:
      return S.Array(__S(146, __c18, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({ devices: S.optional(__S(633, __c79, 1)), nextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "ListDevicesResult" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ maxResults: S.optional(S.Number), nextToken: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListInstanceProfilesRequest" });
    case 1:
      return S.Array(__S(40, __c5, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          instanceProfiles: S.optional(__S(641, __c80, 1)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListInstanceProfilesResult" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String, nextToken: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListJobsRequest" });
    case 1:
      return S.Array(__S(443, __c55, 3));
    case 2:
      return S.suspend(() =>
        S.Struct({ jobs: S.optional(__S(649, __c81, 1)), nextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "ListJobsResult" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          type: S.optional(S.String),
          nextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListNetworkProfilesRequest" });
    case 1:
      return S.Array(__S(64, __c8, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          networkProfiles: S.optional(__S(657, __c82, 1)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListNetworkProfilesResult" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListOfferingPromotionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ id: S.optional(S.String), description: S.optional(S.String) }),
      ).annotate({ identifier: "OfferingPromotion" });
    case 2:
      return S.Array(__S(665, __c83, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          offeringPromotions: S.optional(__S(666, __c83, 2)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListOfferingPromotionsResult" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListOfferingsRequest" });
    case 1:
      return S.Array(__S(475, __c59, 3));
    case 2:
      return S.suspend(() =>
        S.Struct({
          offerings: S.optional(__S(673, __c84, 1)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListOfferingsResult" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListOfferingTransactionsRequest" });
    case 1:
      return S.Array(__S(688, __c86, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          offeringTransactions: S.optional(__S(681, __c85, 1)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListOfferingTransactionsResult" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          offeringStatus: S.optional(__S(480, __c60, 0)),
          transactionId: S.optional(S.String),
          offeringPromotionId: S.optional(S.String),
          createdOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          cost: S.optional(__S(472, __c59, 0)),
        }),
      ).annotate({ identifier: "OfferingTransaction" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.optional(S.String), nextToken: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListProjectsRequest" });
    case 1:
      return S.Array(__S(104, __c13, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          projects: S.optional(__S(697, __c87, 1)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListProjectsResult" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String, nextToken: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListRemoteAccessSessionsRequest" });
    case 1:
      return S.Array(__S(177, __c22, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({
          remoteAccessSessions: S.optional(__S(705, __c88, 1)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListRemoteAccessSessionsResult" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String, nextToken: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListRunsRequest" });
    case 1:
      return S.Array(__S(524, __c65, 4));
    case 2:
      return S.suspend(() =>
        S.Struct({ runs: S.optional(__S(713, __c89, 1)), nextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "ListRunsResult" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String, nextToken: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListSamplesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          type: S.optional(S.String),
          url: S.optional(S.String),
        }),
      ).annotate({ identifier: "Sample" });
    case 2:
      return S.Array(__S(721, __c90, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ samples: S.optional(__S(722, __c90, 2)), nextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "ListSamplesResult" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String, nextToken: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListSuitesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ suites: S.optional(__S(736, __c92, 0)), nextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "ListSuitesResult" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(544, __c68, 0));
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(753, __c94, 1)) }).pipe(ns)).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(752, __c94, 0));
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ maxResult: S.optional(S.Number), nextToken: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTestGridProjectsRequest" });
    case 1:
      return S.Array(__S(200, __c25, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          testGridProjects: S.optional(__S(761, __c95, 1)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListTestGridProjectsResult" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          sessionArn: S.String,
          maxResult: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListTestGridSessionActionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          action: S.optional(S.String),
          started: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          duration: S.optional(S.Number),
          statusCode: S.optional(S.String),
          requestMethod: S.optional(S.String),
        }),
      ).annotate({ identifier: "TestGridSessionAction" });
    case 2:
      return S.Array(__S(769, __c96, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ actions: S.optional(__S(770, __c96, 2)), nextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "ListTestGridSessionActionsResult" });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          sessionArn: S.String,
          type: S.optional(S.String),
          maxResult: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListTestGridSessionArtifactsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          filename: S.optional(S.String),
          type: S.optional(S.String),
          url: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "TestGridSessionArtifact" });
    case 2:
      return S.Array(__S(777, __c97, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          artifacts: S.optional(__S(778, __c97, 2)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListTestGridSessionArtifactsResult" });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          projectArn: S.String,
          status: S.optional(S.String),
          creationTimeAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          creationTimeBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTimeAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTimeBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          maxResult: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListTestGridSessionsRequest" });
    case 1:
      return S.Array(__S(576, __c72, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          testGridSessions: S.optional(__S(785, __c98, 1)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListTestGridSessionsResult" });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String, nextToken: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTestsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ tests: S.optional(__S(736, __c92, 0)), nextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "ListTestsResult" });
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String, nextToken: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListUniqueProblemsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ arn: S.optional(S.String), name: S.optional(S.String) }),
      ).annotate({ identifier: "ProblemDetail" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          run: S.optional(__S(801, __c100, 1)),
          job: S.optional(__S(801, __c100, 1)),
          suite: S.optional(__S(801, __c100, 1)),
          test: S.optional(__S(801, __c100, 1)),
          device: S.optional(__S(146, __c18, 2)),
          result: S.optional(S.String),
          message: S.optional(S.String),
        }),
      ).annotate({ identifier: "Problem" });
    case 3:
      return S.Array(__S(802, __c100, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ message: S.optional(S.String), problems: S.optional(__S(803, __c100, 3)) }),
      ).annotate({ identifier: "UniqueProblem" });
    case 5:
      return S.Array(__S(804, __c100, 4));
    case 6:
      return S.Record(S.String, /*@__PURE__*/ __S(805, __c100, 5).pipe(S.optional));
    case 7:
      return S.suspend(() =>
        S.Struct({
          uniqueProblems: S.optional(__S(806, __c100, 6)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListUniqueProblemsResult" });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          type: S.optional(S.String),
          nextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListUploadsRequest" });
    case 1:
      return S.Array(__S(232, __c29, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          uploads: S.optional(__S(809, __c101, 1)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListUploadsResult" });
  }
}
function __c102(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ maxResults: S.optional(S.Number), nextToken: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListVPCEConfigurationsRequest" });
    case 1:
      return S.Array(__S(256, __c32, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          vpceConfigurations: S.optional(__S(817, __c102, 1)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListVPCEConfigurationsResult" });
  }
}
function __c103(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          offeringId: S.String,
          quantity: S.Number,
          offeringPromotionId: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PurchaseOfferingRequest" });
  }
}
function __c104(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ offeringTransaction: S.optional(__S(688, __c86, 0)) }).pipe(ns),
      ).annotate({ identifier: "PurchaseOfferingResult" });
  }
}
function __c105(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ offeringId: S.String, quantity: S.Number }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RenewOfferingRequest" });
  }
}
function __c106(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ filters: __S(513, __c64, 1), maxDevices: S.Number }),
      ).annotate({ identifier: "DeviceSelectionConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          jobTimeoutMinutes: S.optional(S.Number),
          accountsCleanup: S.optional(S.Boolean),
          appPackagesCleanup: S.optional(S.Boolean),
          videoCapture: S.optional(S.Boolean),
          skipAppResign: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ExecutionConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          projectArn: S.String,
          appArn: S.optional(S.String),
          devicePoolArn: S.optional(S.String),
          deviceSelectionConfiguration: S.optional(__S(848, __c106, 0)),
          name: S.optional(S.String),
          test: __S(408, __c51, 0),
          configuration: S.optional(__S(409, __c51, 1)),
          executionConfiguration: S.optional(__S(849, __c106, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ScheduleRunRequest" });
  }
}
function __c107(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopJobRequest" });
  }
}
function __c108(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopRemoteAccessSessionRequest" });
  }
}
function __c109(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopRunRequest" });
  }
}
function __c110(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, Tags: __S(753, __c94, 1) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c111(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, TagKeys: __S(32, __c4, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c112(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          profileArn: S.optional(S.String),
          labels: S.optional(__S(32, __c4, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateDeviceInstanceRequest" });
  }
}
function __c113(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          name: S.optional(S.String),
          description: S.optional(S.String),
          rules: S.optional(__S(9, __c1, 1)),
          maxDevices: S.optional(S.Number),
          clearMaxDevices: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateDevicePoolRequest" });
  }
}
function __c114(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          name: S.optional(S.String),
          description: S.optional(S.String),
          packageCleanup: S.optional(S.Boolean),
          excludeAppPackagesFromCleanup: S.optional(__S(32, __c4, 0)),
          rebootAfterUse: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateInstanceProfileRequest" });
  }
}
function __c115(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          name: S.optional(S.String),
          description: S.optional(S.String),
          type: S.optional(S.String),
          uplinkBandwidthBits: S.optional(S.Number),
          downlinkBandwidthBits: S.optional(S.Number),
          uplinkDelayMs: S.optional(S.Number),
          downlinkDelayMs: S.optional(S.Number),
          uplinkJitterMs: S.optional(S.Number),
          downlinkJitterMs: S.optional(S.Number),
          uplinkLossPercent: S.optional(S.Number),
          downlinkLossPercent: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateNetworkProfileRequest" });
  }
}
function __c116(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          name: S.optional(S.String),
          defaultJobTimeoutMinutes: S.optional(S.Number),
          vpcConfig: S.optional(__S(88, __c11, 0)),
          environmentVariables: S.optional(__S(97, __c12, 1)),
          executionRoleArn: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateProjectRequest" });
  }
}
function __c117(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          projectArn: S.String,
          name: S.optional(S.String),
          description: S.optional(S.String),
          vpcConfig: S.optional(__S(88, __c11, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateTestGridProjectRequest" });
  }
}
function __c118(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          name: S.optional(S.String),
          contentType: S.optional(S.String),
          editContent: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateUploadRequest" });
  }
}
function __c119(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          vpceConfigurationName: S.optional(S.String),
          vpceServiceName: S.optional(S.String),
          serviceDnsName: S.optional(S.String),
          vpceConfigurationDescription: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateVPCEConfigurationRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
