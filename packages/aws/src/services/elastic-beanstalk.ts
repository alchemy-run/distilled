import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsQueryProtocol } from "../protocols/aws-query.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "Elastic Beanstalk",
  target: "AWSElasticBeanstalkService",
  version: "2010-12-01",
  sigv4: "elasticbeanstalk",
  protocol: awsQueryProtocol,
  xmlns: "http://elasticbeanstalk.amazonaws.com/docs/2010-12-01/",
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
                `https://elasticbeanstalk-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
                return e(`https://elasticbeanstalk.${Region}.amazonaws.com`);
              }
              return e(
                `https://elasticbeanstalk-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://elasticbeanstalk.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://elasticbeanstalk.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class CodeBuildNotInServiceRegionException
  extends /*@__PURE__*/ TE.TaggedError(
    "CodeBuildNotInServiceRegionException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ElasticBeanstalkServiceException
  extends /*@__PURE__*/ TE.TaggedError("ElasticBeanstalkServiceException")<{
    readonly message?: string;
  }> {}
export class InsufficientPrivilegesException
  extends /*@__PURE__*/ TE.TaggedError(
    "InsufficientPrivilegesException",
    ["AuthError"],
    { status: 403 },
  )<{ readonly message?: string }> {}
export class InvalidRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ManagedActionInvalidStateException
  extends /*@__PURE__*/ TE.TaggedError(
    "ManagedActionInvalidStateException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class OperationInProgressException
  extends /*@__PURE__*/ TE.TaggedError(
    "OperationInProgressException",
    ["BadRequestError"],
    { code: "OperationInProgressFailure", status: 400 },
  )<{ readonly message?: string }> {}
export class PlatformVersionStillReferencedException
  extends /*@__PURE__*/ TE.TaggedError(
    "PlatformVersionStillReferencedException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceTypeNotSupportedException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceTypeNotSupportedException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class S3LocationNotInServiceRegionException
  extends /*@__PURE__*/ TE.TaggedError(
    "S3LocationNotInServiceRegionException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class S3SubscriptionRequiredException
  extends /*@__PURE__*/ TE.TaggedError(
    "S3SubscriptionRequiredException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class SourceBundleDeletionException
  extends /*@__PURE__*/ TE.TaggedError(
    "SourceBundleDeletionException",
    ["BadRequestError"],
    { code: "SourceBundleDeletionFailure", status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyApplicationsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyApplicationsException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyApplicationVersionsException
  extends /*@__PURE__*/ TE.TaggedError("TooManyApplicationVersionsException")<{
    readonly message?: string;
  }> {}
export class TooManyBucketsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyBucketsException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyConfigurationTemplatesException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyConfigurationTemplatesException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyEnvironmentsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyEnvironmentsException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyPlatformsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyPlatformsException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyTagsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyTagsException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export type EnvironmentId = string;
export type EnvironmentName = string;
export interface AbortEnvironmentUpdateMessage {
  EnvironmentId?: string;
  EnvironmentName?: string;
}
export interface AbortEnvironmentUpdateResponse {}
export interface ApplyEnvironmentManagedActionRequest {
  EnvironmentName?: string;
  EnvironmentId?: string;
  ActionId: string;
}
export type ActionType =
  | "InstanceRefresh"
  | "PlatformUpdate"
  | "Unknown"
  | (string & {});
export interface ApplyEnvironmentManagedActionResult {
  ActionId?: string;
  ActionDescription?: string;
  ActionType?: ActionType;
  Status?: string;
}
export type OperationsRole = string;
export interface AssociateEnvironmentOperationsRoleMessage {
  EnvironmentName: string;
  OperationsRole: string;
}
export interface AssociateEnvironmentOperationsRoleResponse {}
export type DNSCnamePrefix = string;
export interface CheckDNSAvailabilityMessage {
  CNAMEPrefix: string;
}
export type CnameAvailability = boolean;
export type DNSCname = string;
export interface CheckDNSAvailabilityResultMessage {
  Available?: boolean;
  FullyQualifiedCNAME?: string;
}
export type ApplicationName = string;
export type GroupName = string;
export type VersionLabel = string;
export type VersionLabels = string[];
export interface ComposeEnvironmentsMessage {
  ApplicationName?: string;
  GroupName?: string;
  VersionLabels?: string[];
}
export type SolutionStackName = string;
export type PlatformArn = string;
export type ConfigurationTemplateName = string;
export type Description = string;
export type EndpointURL = string;
export type CreationDate = Date;
export type UpdateDate = Date;
export type EnvironmentStatus =
  | "Aborting"
  | "Launching"
  | "Updating"
  | "LinkingFrom"
  | "LinkingTo"
  | "Ready"
  | "Terminating"
  | "Terminated"
  | (string & {});
export type AbortableOperationInProgress = boolean;
export type EnvironmentHealth =
  | "Green"
  | "Yellow"
  | "Red"
  | "Grey"
  | (string & {});
export type EnvironmentHealthStatus =
  | "NoData"
  | "Unknown"
  | "Pending"
  | "Ok"
  | "Info"
  | "Warning"
  | "Degraded"
  | "Severe"
  | "Suspended"
  | (string & {});
export interface Listener {
  Protocol?: string;
  Port?: number;
}
export type LoadBalancerListenersDescription = Listener[];
export interface LoadBalancerDescription {
  LoadBalancerName?: string;
  Domain?: string;
  Listeners?: Listener[];
}
export interface EnvironmentResourcesDescription {
  LoadBalancer?: LoadBalancerDescription;
}
export interface EnvironmentTier {
  Name?: string;
  Type?: string;
  Version?: string;
}
export interface EnvironmentLink {
  LinkName?: string;
  EnvironmentName?: string;
}
export type EnvironmentLinks = EnvironmentLink[];
export type EnvironmentArn = string;
export interface EnvironmentDescription {
  EnvironmentName?: string;
  EnvironmentId?: string;
  ApplicationName?: string;
  VersionLabel?: string;
  SolutionStackName?: string;
  PlatformArn?: string;
  TemplateName?: string;
  Description?: string;
  EndpointURL?: string;
  CNAME?: string;
  DateCreated?: Date;
  DateUpdated?: Date;
  Status?: EnvironmentStatus;
  AbortableOperationInProgress?: boolean;
  Health?: EnvironmentHealth;
  HealthStatus?: EnvironmentHealthStatus;
  Resources?: EnvironmentResourcesDescription;
  Tier?: EnvironmentTier;
  EnvironmentLinks?: EnvironmentLink[];
  EnvironmentArn?: string;
  OperationsRole?: string;
}
export type EnvironmentDescriptionsList = EnvironmentDescription[];
export type Token = string;
export interface EnvironmentDescriptionsMessage {
  Environments?: EnvironmentDescription[];
  NextToken?: string;
}
export type BoxedBoolean = boolean;
export type BoxedInt = number;
export interface MaxCountRule {
  Enabled: boolean;
  MaxCount?: number;
  DeleteSourceFromS3?: boolean;
}
export interface MaxAgeRule {
  Enabled: boolean;
  MaxAgeInDays?: number;
  DeleteSourceFromS3?: boolean;
}
export interface ApplicationVersionLifecycleConfig {
  MaxCountRule?: MaxCountRule;
  MaxAgeRule?: MaxAgeRule;
}
export interface ApplicationResourceLifecycleConfig {
  ServiceRole?: string;
  VersionLifecycleConfig?: ApplicationVersionLifecycleConfig;
}
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key?: string;
  Value?: string;
}
export type Tags = Tag[];
export interface CreateApplicationMessage {
  ApplicationName: string;
  Description?: string;
  ResourceLifecycleConfig?: ApplicationResourceLifecycleConfig;
  Tags?: Tag[];
}
export type ApplicationArn = string;
export type VersionLabelsList = string[];
export type ConfigurationTemplateNamesList = string[];
export interface ApplicationDescription {
  ApplicationArn?: string;
  ApplicationName?: string;
  Description?: string;
  DateCreated?: Date;
  DateUpdated?: Date;
  Versions?: string[];
  ConfigurationTemplates?: string[];
  ResourceLifecycleConfig?: ApplicationResourceLifecycleConfig;
}
export interface ApplicationDescriptionMessage {
  Application?: ApplicationDescription;
}
export type SourceType = "Git" | "Zip" | (string & {});
export type SourceRepository = "CodeCommit" | "S3" | (string & {});
export type SourceLocation = string;
export interface SourceBuildInformation {
  SourceType: SourceType;
  SourceRepository: SourceRepository;
  SourceLocation: string;
}
export type S3Bucket = string;
export type S3Key = string;
export interface S3Location {
  S3Bucket?: string;
  S3Key?: string;
}
export type NonEmptyString = string;
export type ComputeType =
  | "BUILD_GENERAL1_SMALL"
  | "BUILD_GENERAL1_MEDIUM"
  | "BUILD_GENERAL1_LARGE"
  | (string & {});
export interface BuildConfiguration {
  ArtifactName?: string;
  CodeBuildServiceRole: string;
  ComputeType?: ComputeType;
  Image: string;
  TimeoutInMinutes?: number;
}
export type AutoCreateApplication = boolean;
export type ApplicationVersionProccess = boolean;
export interface CreateApplicationVersionMessage {
  ApplicationName: string;
  VersionLabel: string;
  Description?: string;
  SourceBuildInformation?: SourceBuildInformation;
  SourceBundle?: S3Location;
  BuildConfiguration?: BuildConfiguration;
  AutoCreateApplication?: boolean;
  Process?: boolean;
  Tags?: Tag[];
}
export type ApplicationVersionArn = string;
export type ApplicationVersionStatus =
  | "Processed"
  | "Unprocessed"
  | "Failed"
  | "Processing"
  | "Building"
  | (string & {});
export interface ApplicationVersionDescription {
  ApplicationVersionArn?: string;
  ApplicationName?: string;
  Description?: string;
  VersionLabel?: string;
  SourceBuildInformation?: SourceBuildInformation;
  BuildArn?: string;
  SourceBundle?: S3Location;
  DateCreated?: Date;
  DateUpdated?: Date;
  Status?: ApplicationVersionStatus;
}
export interface ApplicationVersionDescriptionMessage {
  ApplicationVersion?: ApplicationVersionDescription;
}
export interface SourceConfiguration {
  ApplicationName?: string;
  TemplateName?: string;
}
export type ResourceName = string;
export type OptionNamespace = string;
export type ConfigurationOptionName = string;
export type ConfigurationOptionValue = string;
export interface ConfigurationOptionSetting {
  ResourceName?: string;
  Namespace?: string;
  OptionName?: string;
  Value?: string;
}
export type ConfigurationOptionSettingsList = ConfigurationOptionSetting[];
export interface CreateConfigurationTemplateMessage {
  ApplicationName: string;
  TemplateName: string;
  SolutionStackName?: string;
  PlatformArn?: string;
  SourceConfiguration?: SourceConfiguration;
  EnvironmentId?: string;
  Description?: string;
  OptionSettings?: ConfigurationOptionSetting[];
  Tags?: Tag[];
}
export type ConfigurationDeploymentStatus =
  | "deployed"
  | "pending"
  | "failed"
  | (string & {});
export interface ConfigurationSettingsDescription {
  SolutionStackName?: string;
  PlatformArn?: string;
  ApplicationName?: string;
  TemplateName?: string;
  Description?: string;
  EnvironmentName?: string;
  DeploymentStatus?: ConfigurationDeploymentStatus;
  DateCreated?: Date;
  DateUpdated?: Date;
  OptionSettings?: ConfigurationOptionSetting[];
}
export interface OptionSpecification {
  ResourceName?: string;
  Namespace?: string;
  OptionName?: string;
}
export type OptionsSpecifierList = OptionSpecification[];
export interface CreateEnvironmentMessage {
  ApplicationName: string;
  EnvironmentName?: string;
  GroupName?: string;
  Description?: string;
  CNAMEPrefix?: string;
  Tier?: EnvironmentTier;
  Tags?: Tag[];
  VersionLabel?: string;
  TemplateName?: string;
  SolutionStackName?: string;
  PlatformArn?: string;
  OptionSettings?: ConfigurationOptionSetting[];
  OptionsToRemove?: OptionSpecification[];
  OperationsRole?: string;
}
export type PlatformName = string;
export type PlatformVersion = string;
export interface CreatePlatformVersionRequest {
  PlatformName: string;
  PlatformVersion: string;
  PlatformDefinitionBundle: S3Location;
  EnvironmentName?: string;
  OptionSettings?: ConfigurationOptionSetting[];
  Tags?: Tag[];
}
export type PlatformOwner = string;
export type PlatformStatus =
  | "Creating"
  | "Failed"
  | "Ready"
  | "Deleting"
  | "Deleted"
  | (string & {});
export type PlatformCategory = string;
export type OperatingSystemName = string;
export type OperatingSystemVersion = string;
export type SupportedTier = string;
export type SupportedTierList = string[];
export type SupportedAddon = string;
export type SupportedAddonList = string[];
export type PlatformLifecycleState = string;
export type BranchName = string;
export type PlatformBranchLifecycleState = string;
export interface PlatformSummary {
  PlatformArn?: string;
  PlatformOwner?: string;
  PlatformStatus?: PlatformStatus;
  PlatformCategory?: string;
  OperatingSystemName?: string;
  OperatingSystemVersion?: string;
  SupportedTierList?: string[];
  SupportedAddonList?: string[];
  PlatformLifecycleState?: string;
  PlatformVersion?: string;
  PlatformBranchName?: string;
  PlatformBranchLifecycleState?: string;
}
export type ARN = string;
export interface Builder {
  ARN?: string;
}
export interface CreatePlatformVersionResult {
  PlatformSummary?: PlatformSummary;
  Builder?: Builder;
}
export interface CreateStorageLocationRequest {}
export interface CreateStorageLocationResultMessage {
  S3Bucket?: string;
}
export type TerminateEnvForce = boolean;
export interface DeleteApplicationMessage {
  ApplicationName: string;
  TerminateEnvByForce?: boolean;
}
export interface DeleteApplicationResponse {}
export type DeleteSourceBundle = boolean;
export interface DeleteApplicationVersionMessage {
  ApplicationName: string;
  VersionLabel: string;
  DeleteSourceBundle?: boolean;
}
export interface DeleteApplicationVersionResponse {}
export interface DeleteConfigurationTemplateMessage {
  ApplicationName: string;
  TemplateName: string;
}
export interface DeleteConfigurationTemplateResponse {}
export interface DeleteEnvironmentConfigurationMessage {
  ApplicationName: string;
  EnvironmentName: string;
}
export interface DeleteEnvironmentConfigurationResponse {}
export interface DeletePlatformVersionRequest {
  PlatformArn?: string;
}
export interface DeletePlatformVersionResult {
  PlatformSummary?: PlatformSummary;
}
export interface DescribeAccountAttributesRequest {}
export interface ResourceQuota {
  Maximum?: number;
}
export interface ResourceQuotas {
  ApplicationQuota?: ResourceQuota;
  ApplicationVersionQuota?: ResourceQuota;
  EnvironmentQuota?: ResourceQuota;
  ConfigurationTemplateQuota?: ResourceQuota;
  CustomPlatformQuota?: ResourceQuota;
}
export interface DescribeAccountAttributesResult {
  ResourceQuotas?: ResourceQuotas;
}
export type ApplicationNamesList = string[];
export interface DescribeApplicationsMessage {
  ApplicationNames?: string[];
}
export type ApplicationDescriptionList = ApplicationDescription[];
export interface ApplicationDescriptionsMessage {
  Applications?: ApplicationDescription[];
}
export type MaxRecords = number;
export interface DescribeApplicationVersionsMessage {
  ApplicationName?: string;
  VersionLabels?: string[];
  MaxRecords?: number;
  NextToken?: string;
}
export type ApplicationVersionDescriptionList = ApplicationVersionDescription[];
export interface ApplicationVersionDescriptionsMessage {
  ApplicationVersions?: ApplicationVersionDescription[];
  NextToken?: string;
}
export interface DescribeConfigurationOptionsMessage {
  ApplicationName?: string;
  TemplateName?: string;
  EnvironmentName?: string;
  SolutionStackName?: string;
  PlatformArn?: string;
  Options?: OptionSpecification[];
}
export type ConfigurationOptionDefaultValue = string;
export type ConfigurationOptionSeverity = string;
export type UserDefinedOption = boolean;
export type ConfigurationOptionValueType = "Scalar" | "List" | (string & {});
export type ConfigurationOptionPossibleValue = string;
export type ConfigurationOptionPossibleValues = string[];
export type OptionRestrictionMinValue = number;
export type OptionRestrictionMaxValue = number;
export type OptionRestrictionMaxLength = number;
export type RegexPattern = string;
export type RegexLabel = string;
export interface OptionRestrictionRegex {
  Pattern?: string;
  Label?: string;
}
export interface ConfigurationOptionDescription {
  Namespace?: string;
  Name?: string;
  DefaultValue?: string;
  ChangeSeverity?: string;
  UserDefined?: boolean;
  ValueType?: ConfigurationOptionValueType;
  ValueOptions?: string[];
  MinValue?: number;
  MaxValue?: number;
  MaxLength?: number;
  Regex?: OptionRestrictionRegex;
}
export type ConfigurationOptionDescriptionsList =
  ConfigurationOptionDescription[];
export interface ConfigurationOptionsDescription {
  SolutionStackName?: string;
  PlatformArn?: string;
  Options?: ConfigurationOptionDescription[];
}
export interface DescribeConfigurationSettingsMessage {
  ApplicationName: string;
  TemplateName?: string;
  EnvironmentName?: string;
}
export type ConfigurationSettingsDescriptionList =
  ConfigurationSettingsDescription[];
export interface ConfigurationSettingsDescriptions {
  ConfigurationSettings?: ConfigurationSettingsDescription[];
}
export type EnvironmentHealthAttribute =
  | "Status"
  | "Color"
  | "Causes"
  | "ApplicationMetrics"
  | "InstancesHealth"
  | "All"
  | "HealthStatus"
  | "RefreshedAt"
  | (string & {});
export type EnvironmentHealthAttributes = EnvironmentHealthAttribute[];
export interface DescribeEnvironmentHealthRequest {
  EnvironmentName?: string;
  EnvironmentId?: string;
  AttributeNames?: EnvironmentHealthAttribute[];
}
export type Cause = string;
export type Causes = string[];
export type RequestCount = number;
export interface StatusCodes {
  Status2xx?: number;
  Status3xx?: number;
  Status4xx?: number;
  Status5xx?: number;
}
export interface Latency {
  P999?: number;
  P99?: number;
  P95?: number;
  P90?: number;
  P85?: number;
  P75?: number;
  P50?: number;
  P10?: number;
}
export interface ApplicationMetrics {
  Duration?: number;
  RequestCount?: number;
  StatusCodes?: StatusCodes;
  Latency?: Latency;
}
export interface InstanceHealthSummary {
  NoData?: number;
  Unknown?: number;
  Pending?: number;
  Ok?: number;
  Info?: number;
  Warning?: number;
  Degraded?: number;
  Severe?: number;
}
export type RefreshedAt = Date;
export interface DescribeEnvironmentHealthResult {
  EnvironmentName?: string;
  HealthStatus?: string;
  Status?: EnvironmentHealth;
  Color?: string;
  Causes?: string[];
  ApplicationMetrics?: ApplicationMetrics;
  InstancesHealth?: InstanceHealthSummary;
  RefreshedAt?: Date;
}
export type ManagedActionHistoryMaxItems = number;
export interface DescribeEnvironmentManagedActionHistoryRequest {
  EnvironmentId?: string;
  EnvironmentName?: string;
  NextToken?: string;
  MaxItems?: number;
}
export type FailureType =
  | "UpdateCancelled"
  | "CancellationFailed"
  | "RollbackFailed"
  | "RollbackSuccessful"
  | "InternalFailure"
  | "InvalidEnvironmentState"
  | "PermissionsError"
  | (string & {});
export type ActionHistoryStatus =
  | "Completed"
  | "Failed"
  | "Unknown"
  | (string & {});
export interface ManagedActionHistoryItem {
  ActionId?: string;
  ActionType?: ActionType;
  ActionDescription?: string;
  FailureType?: FailureType;
  Status?: ActionHistoryStatus;
  FailureDescription?: string;
  ExecutedTime?: Date;
  FinishedTime?: Date;
}
export type ManagedActionHistoryItems = ManagedActionHistoryItem[];
export interface DescribeEnvironmentManagedActionHistoryResult {
  ManagedActionHistoryItems?: ManagedActionHistoryItem[];
  NextToken?: string;
}
export type ActionStatus =
  | "Scheduled"
  | "Pending"
  | "Running"
  | "Unknown"
  | (string & {});
export interface DescribeEnvironmentManagedActionsRequest {
  EnvironmentName?: string;
  EnvironmentId?: string;
  Status?: ActionStatus;
}
export interface ManagedAction {
  ActionId?: string;
  ActionDescription?: string;
  ActionType?: ActionType;
  Status?: ActionStatus;
  WindowStartTime?: Date;
}
export type ManagedActions = ManagedAction[];
export interface DescribeEnvironmentManagedActionsResult {
  ManagedActions?: ManagedAction[];
}
export interface DescribeEnvironmentResourcesMessage {
  EnvironmentId?: string;
  EnvironmentName?: string;
}
export type ResourceId = string;
export interface AutoScalingGroup {
  Name?: string;
}
export type AutoScalingGroupList = AutoScalingGroup[];
export interface Instance {
  Id?: string;
}
export type InstanceList = Instance[];
export interface LaunchConfiguration {
  Name?: string;
}
export type LaunchConfigurationList = LaunchConfiguration[];
export interface LaunchTemplate {
  Id?: string;
}
export type LaunchTemplateList = LaunchTemplate[];
export interface LoadBalancer {
  Name?: string;
}
export type LoadBalancerList = LoadBalancer[];
export interface Trigger {
  Name?: string;
}
export type TriggerList = Trigger[];
export interface Queue {
  Name?: string;
  URL?: string;
}
export type QueueList = Queue[];
export interface EnvironmentResourceDescription {
  EnvironmentName?: string;
  AutoScalingGroups?: AutoScalingGroup[];
  Instances?: Instance[];
  LaunchConfigurations?: LaunchConfiguration[];
  LaunchTemplates?: LaunchTemplate[];
  LoadBalancers?: LoadBalancer[];
  Triggers?: Trigger[];
  Queues?: Queue[];
}
export interface EnvironmentResourceDescriptionsMessage {
  EnvironmentResources?: EnvironmentResourceDescription;
}
export type EnvironmentIdList = string[];
export type EnvironmentNamesList = string[];
export type IncludeDeleted = boolean;
export type IncludeDeletedBackTo = Date;
export interface DescribeEnvironmentsMessage {
  ApplicationName?: string;
  VersionLabel?: string;
  EnvironmentIds?: string[];
  EnvironmentNames?: string[];
  IncludeDeleted?: boolean;
  IncludedDeletedBackTo?: Date;
  MaxRecords?: number;
  NextToken?: string;
}
export type RequestId = string;
export type EventSeverity =
  | "TRACE"
  | "DEBUG"
  | "INFO"
  | "WARN"
  | "ERROR"
  | "FATAL"
  | (string & {});
export type TimeFilterStart = Date;
export type TimeFilterEnd = Date;
export interface DescribeEventsMessage {
  ApplicationName?: string;
  VersionLabel?: string;
  TemplateName?: string;
  EnvironmentId?: string;
  EnvironmentName?: string;
  PlatformArn?: string;
  RequestId?: string;
  Severity?: EventSeverity;
  StartTime?: Date;
  EndTime?: Date;
  MaxRecords?: number;
  NextToken?: string;
}
export type EventDate = Date;
export type EventMessage = string;
export interface EventDescription {
  EventDate?: Date;
  Message?: string;
  ApplicationName?: string;
  VersionLabel?: string;
  TemplateName?: string;
  EnvironmentName?: string;
  PlatformArn?: string;
  RequestId?: string;
  Severity?: EventSeverity;
}
export type EventDescriptionList = EventDescription[];
export interface EventDescriptionsMessage {
  Events?: EventDescription[];
  NextToken?: string;
}
export type InstancesHealthAttribute =
  | "HealthStatus"
  | "Color"
  | "Causes"
  | "ApplicationMetrics"
  | "RefreshedAt"
  | "LaunchedAt"
  | "System"
  | "Deployment"
  | "AvailabilityZone"
  | "InstanceType"
  | "All"
  | (string & {});
export type InstancesHealthAttributes = InstancesHealthAttribute[];
export type NextToken = string;
export interface DescribeInstancesHealthRequest {
  EnvironmentName?: string;
  EnvironmentId?: string;
  AttributeNames?: InstancesHealthAttribute[];
  NextToken?: string;
}
export type InstanceId = string;
export type LaunchedAt = Date;
export interface CPUUtilization {
  User?: number;
  Nice?: number;
  System?: number;
  Idle?: number;
  IOWait?: number;
  IRQ?: number;
  SoftIRQ?: number;
  Privileged?: number;
}
export type LoadAverageValue = number;
export type LoadAverage = number[];
export interface SystemStatus {
  CPUUtilization?: CPUUtilization;
  LoadAverage?: number[];
}
export type DeploymentTimestamp = Date;
export interface Deployment {
  VersionLabel?: string;
  DeploymentId?: number;
  Status?: string;
  DeploymentTime?: Date;
}
export interface SingleInstanceHealth {
  InstanceId?: string;
  HealthStatus?: string;
  Color?: string;
  Causes?: string[];
  LaunchedAt?: Date;
  ApplicationMetrics?: ApplicationMetrics;
  System?: SystemStatus;
  Deployment?: Deployment;
  AvailabilityZone?: string;
  InstanceType?: string;
}
export type InstanceHealthList = SingleInstanceHealth[];
export interface DescribeInstancesHealthResult {
  InstanceHealthList?: SingleInstanceHealth[];
  RefreshedAt?: Date;
  NextToken?: string;
}
export interface DescribePlatformVersionRequest {
  PlatformArn?: string;
}
export type Maintainer = string;
export interface PlatformProgrammingLanguage {
  Name?: string;
  Version?: string;
}
export type PlatformProgrammingLanguages = PlatformProgrammingLanguage[];
export interface PlatformFramework {
  Name?: string;
  Version?: string;
}
export type PlatformFrameworks = PlatformFramework[];
export type VirtualizationType = string;
export type ImageId = string;
export interface CustomAmi {
  VirtualizationType?: string;
  ImageId?: string;
}
export type CustomAmiList = CustomAmi[];
export interface PlatformDescription {
  PlatformArn?: string;
  PlatformOwner?: string;
  PlatformName?: string;
  PlatformVersion?: string;
  SolutionStackName?: string;
  PlatformStatus?: PlatformStatus;
  DateCreated?: Date;
  DateUpdated?: Date;
  PlatformCategory?: string;
  Description?: string;
  Maintainer?: string;
  OperatingSystemName?: string;
  OperatingSystemVersion?: string;
  ProgrammingLanguages?: PlatformProgrammingLanguage[];
  Frameworks?: PlatformFramework[];
  CustomAmiList?: CustomAmi[];
  SupportedTierList?: string[];
  SupportedAddonList?: string[];
  PlatformLifecycleState?: string;
  PlatformBranchName?: string;
  PlatformBranchLifecycleState?: string;
}
export interface DescribePlatformVersionResult {
  PlatformDescription?: PlatformDescription;
}
export interface DisassociateEnvironmentOperationsRoleMessage {
  EnvironmentName: string;
}
export interface DisassociateEnvironmentOperationsRoleResponse {}
export interface ListAvailableSolutionStacksRequest {}
export type AvailableSolutionStackNamesList = string[];
export type FileTypeExtension = string;
export type SolutionStackFileTypeList = string[];
export interface SolutionStackDescription {
  SolutionStackName?: string;
  PermittedFileTypes?: string[];
}
export type AvailableSolutionStackDetailsList = SolutionStackDescription[];
export interface ListAvailableSolutionStacksResultMessage {
  SolutionStacks?: string[];
  SolutionStackDetails?: SolutionStackDescription[];
}
export type SearchFilterAttribute = string;
export type SearchFilterOperator = string;
export type SearchFilterValue = string;
export type SearchFilterValues = string[];
export interface SearchFilter {
  Attribute?: string;
  Operator?: string;
  Values?: string[];
}
export type SearchFilters = SearchFilter[];
export type PlatformBranchMaxRecords = number;
export interface ListPlatformBranchesRequest {
  Filters?: SearchFilter[];
  MaxRecords?: number;
  NextToken?: string;
}
export type BranchOrder = number;
export interface PlatformBranchSummary {
  PlatformName?: string;
  BranchName?: string;
  LifecycleState?: string;
  BranchOrder?: number;
  SupportedTierList?: string[];
}
export type PlatformBranchSummaryList = PlatformBranchSummary[];
export interface ListPlatformBranchesResult {
  PlatformBranchSummaryList?: PlatformBranchSummary[];
  NextToken?: string;
}
export type PlatformFilterType = string;
export type PlatformFilterOperator = string;
export type PlatformFilterValue = string;
export type PlatformFilterValueList = string[];
export interface PlatformFilter {
  Type?: string;
  Operator?: string;
  Values?: string[];
}
export type PlatformFilters = PlatformFilter[];
export type PlatformMaxRecords = number;
export interface ListPlatformVersionsRequest {
  Filters?: PlatformFilter[];
  MaxRecords?: number;
  NextToken?: string;
}
export type PlatformSummaryList = PlatformSummary[];
export interface ListPlatformVersionsResult {
  PlatformSummaryList?: PlatformSummary[];
  NextToken?: string;
}
export type ResourceArn = string;
export interface ListTagsForResourceMessage {
  ResourceArn: string;
}
export type TagList = Tag[];
export interface ResourceTagsDescriptionMessage {
  ResourceArn?: string;
  ResourceTags?: Tag[];
}
export interface RebuildEnvironmentMessage {
  EnvironmentId?: string;
  EnvironmentName?: string;
}
export interface RebuildEnvironmentResponse {}
export type EnvironmentInfoType = "tail" | "bundle" | "analyze" | (string & {});
export interface RequestEnvironmentInfoMessage {
  EnvironmentId?: string;
  EnvironmentName?: string;
  InfoType: EnvironmentInfoType;
}
export interface RequestEnvironmentInfoResponse {}
export interface RestartAppServerMessage {
  EnvironmentId?: string;
  EnvironmentName?: string;
}
export interface RestartAppServerResponse {}
export interface RetrieveEnvironmentInfoMessage {
  EnvironmentId?: string;
  EnvironmentName?: string;
  InfoType: EnvironmentInfoType;
}
export type Ec2InstanceId = string;
export type SampleTimestamp = Date;
export type Message = string;
export interface EnvironmentInfoDescription {
  InfoType?: EnvironmentInfoType;
  Ec2InstanceId?: string;
  SampleTimestamp?: Date;
  Message?: string;
}
export type EnvironmentInfoDescriptionList = EnvironmentInfoDescription[];
export interface RetrieveEnvironmentInfoResultMessage {
  EnvironmentInfo?: EnvironmentInfoDescription[];
}
export interface SwapEnvironmentCNAMEsMessage {
  SourceEnvironmentId?: string;
  SourceEnvironmentName?: string;
  DestinationEnvironmentId?: string;
  DestinationEnvironmentName?: string;
}
export interface SwapEnvironmentCNAMEsResponse {}
export type TerminateEnvironmentResources = boolean;
export type ForceTerminate = boolean;
export interface TerminateEnvironmentMessage {
  EnvironmentId?: string;
  EnvironmentName?: string;
  TerminateResources?: boolean;
  ForceTerminate?: boolean;
}
export interface UpdateApplicationMessage {
  ApplicationName: string;
  Description?: string;
}
export interface UpdateApplicationResourceLifecycleMessage {
  ApplicationName: string;
  ResourceLifecycleConfig: ApplicationResourceLifecycleConfig;
}
export interface ApplicationResourceLifecycleDescriptionMessage {
  ApplicationName?: string;
  ResourceLifecycleConfig?: ApplicationResourceLifecycleConfig;
}
export interface UpdateApplicationVersionMessage {
  ApplicationName: string;
  VersionLabel: string;
  Description?: string;
}
export interface UpdateConfigurationTemplateMessage {
  ApplicationName: string;
  TemplateName: string;
  Description?: string;
  OptionSettings?: ConfigurationOptionSetting[];
  OptionsToRemove?: OptionSpecification[];
}
export interface UpdateEnvironmentMessage {
  ApplicationName?: string;
  EnvironmentId?: string;
  EnvironmentName?: string;
  GroupName?: string;
  Description?: string;
  Tier?: EnvironmentTier;
  VersionLabel?: string;
  TemplateName?: string;
  SolutionStackName?: string;
  PlatformArn?: string;
  OptionSettings?: ConfigurationOptionSetting[];
  OptionsToRemove?: OptionSpecification[];
}
export type TagKeyList = string[];
export interface UpdateTagsForResourceMessage {
  ResourceArn: string;
  TagsToAdd?: Tag[];
  TagsToRemove?: string[];
}
export interface UpdateTagsForResourceResponse {}
export interface ValidateConfigurationSettingsMessage {
  ApplicationName: string;
  TemplateName?: string;
  EnvironmentName?: string;
  OptionSettings: ConfigurationOptionSetting[];
}
export type ValidationMessageString = string;
export type ValidationSeverity = "error" | "warning" | (string & {});
export interface ValidationMessage {
  Message?: string;
  Severity?: ValidationSeverity;
  Namespace?: string;
  OptionName?: string;
}
export type ValidationMessagesList = ValidationMessage[];
export interface ConfigurationSettingsValidationMessages {
  Messages?: ValidationMessage[];
}
export type ExceptionMessage = string;
export type AbortEnvironmentUpdateError =
  | InsufficientPrivilegesException
  | CommonErrors;
/**
 * Cancels in-progress environment configuration update or application version
 * deployment.
 */
export const abortEnvironmentUpdate: API.OperationMethod<
  AbortEnvironmentUpdateMessage,
  AbortEnvironmentUpdateResponse,
  AbortEnvironmentUpdateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { EnvironmentId: 0, EnvironmentName: 0 } },
  errors: [InsufficientPrivilegesException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AbortEnvironmentUpdate",
})) as any;

export type ApplyEnvironmentManagedActionError =
  | ElasticBeanstalkServiceException
  | ManagedActionInvalidStateException
  | CommonErrors;
/**
 * Applies a scheduled managed action immediately. A managed action can be applied only if
 * its status is `Scheduled`. Get the status and action ID of a managed action with
 * DescribeEnvironmentManagedActions.
 */
export const applyEnvironmentManagedAction: API.OperationMethod<
  ApplyEnvironmentManagedActionRequest,
  ApplyEnvironmentManagedActionResult,
  ApplyEnvironmentManagedActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { EnvironmentName: 0, EnvironmentId: 0, ActionId: 0 },
  },
  errors: [
    ElasticBeanstalkServiceException,
    ManagedActionInvalidStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ApplyEnvironmentManagedAction",
})) as any;

export type AssociateEnvironmentOperationsRoleError =
  | InsufficientPrivilegesException
  | CommonErrors;
/**
 * Add or change the operations role used by an environment. After this call is made, Elastic Beanstalk
 * uses the associated operations role for permissions to downstream services during subsequent
 * calls acting on this environment. For more information, see Operations roles in the
 * *AWS Elastic Beanstalk Developer Guide*.
 */
export const associateEnvironmentOperationsRole: API.OperationMethod<
  AssociateEnvironmentOperationsRoleMessage,
  AssociateEnvironmentOperationsRoleResponse,
  AssociateEnvironmentOperationsRoleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { EnvironmentName: 0, OperationsRole: 0 },
  },
  errors: [InsufficientPrivilegesException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateEnvironmentOperationsRole",
})) as any;

export type CheckDNSAvailabilityError = CommonErrors;
/**
 * Checks if the specified CNAME is available.
 */
export const checkDNSAvailability: API.OperationMethod<
  CheckDNSAvailabilityMessage,
  CheckDNSAvailabilityResultMessage,
  CheckDNSAvailabilityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CNAMEPrefix: 0 },
    output: { Available: D.bool },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CheckDNSAvailability",
})) as any;

export type ComposeEnvironmentsError =
  | InsufficientPrivilegesException
  | TooManyEnvironmentsException
  | CommonErrors;
/**
 * Create or update a group of environments that each run a separate component of a single
 * application. Takes a list of version labels that specify application source bundles for each
 * of the environments to create or update. The name of each environment and other required
 * information must be included in the source bundles in an environment manifest named
 * `env.yaml`. See Compose Environments
 * for details.
 */
export const composeEnvironments: API.OperationMethod<
  ComposeEnvironmentsMessage,
  EnvironmentDescriptionsMessage,
  ComposeEnvironmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ApplicationName: 0, GroupName: 0, VersionLabels: 0 },
    output: { Environments: D.list(o_EnvironmentDescription) },
  },
  errors: [InsufficientPrivilegesException, TooManyEnvironmentsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ComposeEnvironments",
})) as any;

export type CreateApplicationError =
  | TooManyApplicationsException
  | CommonErrors;
/**
 * Creates an application that has one configuration template named `default`
 * and no application versions.
 */
export const createApplication: API.OperationMethod<
  CreateApplicationMessage,
  ApplicationDescriptionMessage,
  CreateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ApplicationName: 0,
      Description: 0,
      ResourceLifecycleConfig: i_ApplicationResourceLifecycleConfig,
      Tags: D.list(i_Tag),
    },
    output: { Application: o_ApplicationDescription },
  },
  errors: [TooManyApplicationsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApplication",
})) as any;

export type CreateApplicationVersionError =
  | CodeBuildNotInServiceRegionException
  | InsufficientPrivilegesException
  | S3LocationNotInServiceRegionException
  | TooManyApplicationsException
  | TooManyApplicationVersionsException
  | CommonErrors;
/**
 * Creates an application version for the specified application. You can create an
 * application version from a source bundle in Amazon S3, a commit in AWS CodeCommit, or the
 * output of an AWS CodeBuild build as follows:
 *
 * Specify a commit in an AWS CodeCommit repository with
 * `SourceBuildInformation`.
 *
 * Specify a build in an AWS CodeBuild with `SourceBuildInformation` and
 * `BuildConfiguration`.
 *
 * Specify a source bundle in S3 with `SourceBundle`
 *
 * Omit both `SourceBuildInformation` and `SourceBundle` to use the
 * default sample application.
 *
 * After you create an application version with a specified Amazon S3 bucket and key
 * location, you can't change that Amazon S3 location. If you change the Amazon S3 location,
 * you receive an exception when you attempt to launch an environment from the application
 * version.
 */
export const createApplicationVersion: API.OperationMethod<
  CreateApplicationVersionMessage,
  ApplicationVersionDescriptionMessage,
  CreateApplicationVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ApplicationName: 0,
      VersionLabel: 0,
      Description: 0,
      SourceBuildInformation: {
        SourceType: 0,
        SourceRepository: 0,
        SourceLocation: 0,
      },
      SourceBundle: i_S3Location,
      BuildConfiguration: {
        ArtifactName: 0,
        CodeBuildServiceRole: 0,
        ComputeType: 0,
        Image: 0,
        TimeoutInMinutes: 0,
      },
      AutoCreateApplication: 0,
      Process: 0,
      Tags: D.list(i_Tag),
    },
    output: { ApplicationVersion: o_ApplicationVersionDescription },
  },
  errors: [
    CodeBuildNotInServiceRegionException,
    InsufficientPrivilegesException,
    S3LocationNotInServiceRegionException,
    TooManyApplicationsException,
    TooManyApplicationVersionsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApplicationVersion",
})) as any;

export type CreateConfigurationTemplateError =
  | InsufficientPrivilegesException
  | TooManyBucketsException
  | TooManyConfigurationTemplatesException
  | CommonErrors;
/**
 * Creates an AWS Elastic Beanstalk configuration template, associated with a specific Elastic Beanstalk
 * application. You define application configuration settings in a configuration template. You
 * can then use the configuration template to deploy different versions of the application with
 * the same configuration settings.
 *
 * Templates aren't associated with any environment. The `EnvironmentName`
 * response element is always `null`.
 *
 * Related Topics
 *
 * - DescribeConfigurationOptions
 *
 * - DescribeConfigurationSettings
 *
 * - ListAvailableSolutionStacks
 */
export const createConfigurationTemplate: API.OperationMethod<
  CreateConfigurationTemplateMessage,
  ConfigurationSettingsDescription,
  CreateConfigurationTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ApplicationName: 0,
      TemplateName: 0,
      SolutionStackName: 0,
      PlatformArn: 0,
      SourceConfiguration: { ApplicationName: 0, TemplateName: 0 },
      EnvironmentId: 0,
      Description: 0,
      OptionSettings: D.list(i_ConfigurationOptionSetting),
      Tags: D.list(i_Tag),
    },
    output: {
      DateCreated: D.ts,
      DateUpdated: D.ts,
      OptionSettings: D.list({}),
    },
  },
  errors: [
    InsufficientPrivilegesException,
    TooManyBucketsException,
    TooManyConfigurationTemplatesException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConfigurationTemplate",
})) as any;

export type CreateEnvironmentError =
  | InsufficientPrivilegesException
  | TooManyEnvironmentsException
  | CommonErrors;
/**
 * Launches an AWS Elastic Beanstalk environment for the specified application using the specified
 * configuration.
 */
export const createEnvironment: API.OperationMethod<
  CreateEnvironmentMessage,
  EnvironmentDescription,
  CreateEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ApplicationName: 0,
      EnvironmentName: 0,
      GroupName: 0,
      Description: 0,
      CNAMEPrefix: 0,
      Tier: i_EnvironmentTier,
      Tags: D.list(i_Tag),
      VersionLabel: 0,
      TemplateName: 0,
      SolutionStackName: 0,
      PlatformArn: 0,
      OptionSettings: D.list(i_ConfigurationOptionSetting),
      OptionsToRemove: D.list(i_OptionSpecification),
      OperationsRole: 0,
    },
    output: {
      DateCreated: D.ts,
      DateUpdated: D.ts,
      AbortableOperationInProgress: D.bool,
      Resources: o_EnvironmentResourcesDescription,
      Tier: {},
      EnvironmentLinks: D.list({}),
    },
  },
  errors: [InsufficientPrivilegesException, TooManyEnvironmentsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEnvironment",
})) as any;

export type CreatePlatformVersionError =
  | ElasticBeanstalkServiceException
  | InsufficientPrivilegesException
  | TooManyPlatformsException
  | CommonErrors;
/**
 * Create a new version of your custom platform.
 */
export const createPlatformVersion: API.OperationMethod<
  CreatePlatformVersionRequest,
  CreatePlatformVersionResult,
  CreatePlatformVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      PlatformName: 0,
      PlatformVersion: 0,
      PlatformDefinitionBundle: i_S3Location,
      EnvironmentName: 0,
      OptionSettings: D.list(i_ConfigurationOptionSetting),
      Tags: D.list(i_Tag),
    },
    output: { PlatformSummary: o_PlatformSummary, Builder: {} },
  },
  errors: [
    ElasticBeanstalkServiceException,
    InsufficientPrivilegesException,
    TooManyPlatformsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePlatformVersion",
})) as any;

export type CreateStorageLocationError =
  | InsufficientPrivilegesException
  | S3SubscriptionRequiredException
  | TooManyBucketsException
  | CommonErrors;
/**
 * Creates a bucket in Amazon S3 to store application versions, logs, and other files used
 * by Elastic Beanstalk environments. The Elastic Beanstalk console and EB CLI call this API the
 * first time you create an environment in a region. If the storage location already exists,
 * `CreateStorageLocation` still returns the bucket name but does not create a new
 * bucket.
 */
export const createStorageLocation: API.OperationMethod<
  CreateStorageLocationRequest,
  CreateStorageLocationResultMessage,
  CreateStorageLocationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc },
  errors: [
    InsufficientPrivilegesException,
    S3SubscriptionRequiredException,
    TooManyBucketsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStorageLocation",
})) as any;

export type DeleteApplicationError =
  | OperationInProgressException
  | CommonErrors;
/**
 * Deletes the specified application along with all associated versions and
 * configurations. The application versions will not be deleted from your Amazon S3
 * bucket.
 *
 * You cannot delete an application that has a running environment.
 */
export const deleteApplication: API.OperationMethod<
  DeleteApplicationMessage,
  DeleteApplicationResponse,
  DeleteApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ApplicationName: 0, TerminateEnvByForce: 0 },
  },
  errors: [OperationInProgressException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplication",
})) as any;

export type DeleteApplicationVersionError =
  | InsufficientPrivilegesException
  | OperationInProgressException
  | S3LocationNotInServiceRegionException
  | SourceBundleDeletionException
  | CommonErrors;
/**
 * Deletes the specified version from the specified application.
 *
 * You cannot delete an application version that is associated with a running
 * environment.
 */
export const deleteApplicationVersion: API.OperationMethod<
  DeleteApplicationVersionMessage,
  DeleteApplicationVersionResponse,
  DeleteApplicationVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ApplicationName: 0, VersionLabel: 0, DeleteSourceBundle: 0 },
  },
  errors: [
    InsufficientPrivilegesException,
    OperationInProgressException,
    S3LocationNotInServiceRegionException,
    SourceBundleDeletionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplicationVersion",
})) as any;

export type DeleteConfigurationTemplateError =
  | OperationInProgressException
  | CommonErrors;
/**
 * Deletes the specified configuration template.
 *
 * When you launch an environment using a configuration template, the environment gets a
 * copy of the template. You can delete or modify the environment's copy of the template
 * without affecting the running environment.
 */
export const deleteConfigurationTemplate: API.OperationMethod<
  DeleteConfigurationTemplateMessage,
  DeleteConfigurationTemplateResponse,
  DeleteConfigurationTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ApplicationName: 0, TemplateName: 0 } },
  errors: [OperationInProgressException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfigurationTemplate",
})) as any;

export type DeleteEnvironmentConfigurationError = CommonErrors;
/**
 * Deletes the draft configuration associated with the running environment.
 *
 * Updating a running environment with any configuration changes creates a draft
 * configuration set. You can get the draft configuration using DescribeConfigurationSettings while the update is in progress or if the update
 * fails. The `DeploymentStatus` for the draft configuration indicates whether the
 * deployment is in process or has failed. The draft configuration remains in existence until it
 * is deleted with this action.
 */
export const deleteEnvironmentConfiguration: API.OperationMethod<
  DeleteEnvironmentConfigurationMessage,
  DeleteEnvironmentConfigurationResponse,
  DeleteEnvironmentConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ApplicationName: 0, EnvironmentName: 0 },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEnvironmentConfiguration",
})) as any;

export type DeletePlatformVersionError =
  | ElasticBeanstalkServiceException
  | InsufficientPrivilegesException
  | OperationInProgressException
  | PlatformVersionStillReferencedException
  | CommonErrors;
/**
 * Deletes the specified version of a custom platform.
 */
export const deletePlatformVersion: API.OperationMethod<
  DeletePlatformVersionRequest,
  DeletePlatformVersionResult,
  DeletePlatformVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { PlatformArn: 0 },
    output: { PlatformSummary: o_PlatformSummary },
  },
  errors: [
    ElasticBeanstalkServiceException,
    InsufficientPrivilegesException,
    OperationInProgressException,
    PlatformVersionStillReferencedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePlatformVersion",
})) as any;

export type DescribeAccountAttributesError =
  | InsufficientPrivilegesException
  | CommonErrors;
/**
 * Returns attributes related to AWS Elastic Beanstalk that are associated with the calling AWS
 * account.
 *
 * The result currently has one set of attributes—resource quotas.
 */
export const describeAccountAttributes: API.OperationMethod<
  DescribeAccountAttributesRequest,
  DescribeAccountAttributesResult,
  DescribeAccountAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    output: {
      ResourceQuotas: {
        ApplicationQuota: o_ResourceQuota,
        ApplicationVersionQuota: o_ResourceQuota,
        EnvironmentQuota: o_ResourceQuota,
        ConfigurationTemplateQuota: o_ResourceQuota,
        CustomPlatformQuota: o_ResourceQuota,
      },
    },
  },
  errors: [InsufficientPrivilegesException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccountAttributes",
})) as any;

export type DescribeApplicationsError = CommonErrors;
/**
 * Returns the descriptions of existing applications.
 */
export const describeApplications: API.OperationMethod<
  DescribeApplicationsMessage,
  ApplicationDescriptionsMessage,
  DescribeApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ApplicationNames: 0 },
    output: { Applications: D.list(o_ApplicationDescription) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeApplications",
})) as any;

export type DescribeApplicationVersionsError = CommonErrors;
/**
 * Retrieve a list of application versions.
 */
export const describeApplicationVersions: API.OperationMethod<
  DescribeApplicationVersionsMessage,
  ApplicationVersionDescriptionsMessage,
  DescribeApplicationVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ApplicationName: 0,
      VersionLabels: 0,
      MaxRecords: 0,
      NextToken: 0,
    },
    output: { ApplicationVersions: D.list(o_ApplicationVersionDescription) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeApplicationVersions",
})) as any;

export type DescribeConfigurationOptionsError =
  | TooManyBucketsException
  | CommonErrors;
/**
 * Describes the configuration options that are used in a particular configuration
 * template or environment, or that a specified solution stack defines. The description includes
 * the values the options, their default values, and an indication of the required action on a
 * running environment if an option value is changed.
 */
export const describeConfigurationOptions: API.OperationMethod<
  DescribeConfigurationOptionsMessage,
  ConfigurationOptionsDescription,
  DescribeConfigurationOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ApplicationName: 0,
      TemplateName: 0,
      EnvironmentName: 0,
      SolutionStackName: 0,
      PlatformArn: 0,
      Options: D.list(i_OptionSpecification),
    },
    output: {
      Options: D.list({
        UserDefined: D.bool,
        ValueOptions: D.list(),
        MinValue: D.num,
        MaxValue: D.num,
        MaxLength: D.num,
        Regex: {},
      }),
    },
  },
  errors: [TooManyBucketsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConfigurationOptions",
})) as any;

export type DescribeConfigurationSettingsError =
  | TooManyBucketsException
  | CommonErrors;
/**
 * Returns a description of the settings for the specified configuration set, that is,
 * either a configuration template or the configuration set associated with a running
 * environment.
 *
 * When describing the settings for the configuration set associated with a running
 * environment, it is possible to receive two sets of setting descriptions. One is the deployed
 * configuration set, and the other is a draft configuration of an environment that is either in
 * the process of deployment or that failed to deploy.
 *
 * Related Topics
 *
 * - DeleteEnvironmentConfiguration
 */
export const describeConfigurationSettings: API.OperationMethod<
  DescribeConfigurationSettingsMessage,
  ConfigurationSettingsDescriptions,
  DescribeConfigurationSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ApplicationName: 0, TemplateName: 0, EnvironmentName: 0 },
    output: {
      ConfigurationSettings: D.list({
        DateCreated: D.ts,
        DateUpdated: D.ts,
        OptionSettings: D.list({}),
      }),
    },
  },
  errors: [TooManyBucketsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConfigurationSettings",
})) as any;

export type DescribeEnvironmentHealthError =
  | ElasticBeanstalkServiceException
  | InvalidRequestException
  | CommonErrors;
/**
 * Returns information about the overall health of the specified environment. The
 * **DescribeEnvironmentHealth** operation is only available with
 * AWS Elastic Beanstalk Enhanced Health.
 */
export const describeEnvironmentHealth: API.OperationMethod<
  DescribeEnvironmentHealthRequest,
  DescribeEnvironmentHealthResult,
  DescribeEnvironmentHealthError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { EnvironmentName: 0, EnvironmentId: 0, AttributeNames: 0 },
    output: {
      Causes: D.list(),
      ApplicationMetrics: o_ApplicationMetrics,
      InstancesHealth: {
        NoData: D.num,
        Unknown: D.num,
        Pending: D.num,
        Ok: D.num,
        Info: D.num,
        Warning: D.num,
        Degraded: D.num,
        Severe: D.num,
      },
      RefreshedAt: D.ts,
    },
  },
  errors: [ElasticBeanstalkServiceException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEnvironmentHealth",
})) as any;

export type DescribeEnvironmentManagedActionHistoryError =
  | ElasticBeanstalkServiceException
  | CommonErrors;
/**
 * Lists an environment's completed and failed managed actions.
 */
export const describeEnvironmentManagedActionHistory: API.PaginatedOperationMethod<
  DescribeEnvironmentManagedActionHistoryRequest,
  DescribeEnvironmentManagedActionHistoryResult,
  DescribeEnvironmentManagedActionHistoryError,
  Credentials | HttpClient.HttpClient,
  ManagedActionHistoryItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { EnvironmentId: 0, EnvironmentName: 0, NextToken: 0, MaxItems: 0 },
    output: {
      ManagedActionHistoryItems: D.list({
        ExecutedTime: D.ts,
        FinishedTime: D.ts,
      }),
    },
  },
  errors: [ElasticBeanstalkServiceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEnvironmentManagedActionHistory",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ManagedActionHistoryItems",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type DescribeEnvironmentManagedActionsError =
  | ElasticBeanstalkServiceException
  | CommonErrors;
/**
 * Lists an environment's upcoming and in-progress managed actions.
 */
export const describeEnvironmentManagedActions: API.OperationMethod<
  DescribeEnvironmentManagedActionsRequest,
  DescribeEnvironmentManagedActionsResult,
  DescribeEnvironmentManagedActionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { EnvironmentName: 0, EnvironmentId: 0, Status: 0 },
    output: { ManagedActions: D.list({ WindowStartTime: D.ts }) },
  },
  errors: [ElasticBeanstalkServiceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEnvironmentManagedActions",
})) as any;

export type DescribeEnvironmentResourcesError =
  | InsufficientPrivilegesException
  | CommonErrors;
/**
 * Returns AWS resources for this environment.
 */
export const describeEnvironmentResources: API.OperationMethod<
  DescribeEnvironmentResourcesMessage,
  EnvironmentResourceDescriptionsMessage,
  DescribeEnvironmentResourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { EnvironmentId: 0, EnvironmentName: 0 },
    output: {
      EnvironmentResources: {
        AutoScalingGroups: D.list({}),
        Instances: D.list({}),
        LaunchConfigurations: D.list({}),
        LaunchTemplates: D.list({}),
        LoadBalancers: D.list({}),
        Triggers: D.list({}),
        Queues: D.list({}),
      },
    },
  },
  errors: [InsufficientPrivilegesException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEnvironmentResources",
})) as any;

export type DescribeEnvironmentsError = CommonErrors;
/**
 * Returns descriptions for existing environments.
 */
export const describeEnvironments: API.OperationMethod<
  DescribeEnvironmentsMessage,
  EnvironmentDescriptionsMessage,
  DescribeEnvironmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ApplicationName: 0,
      VersionLabel: 0,
      EnvironmentIds: 0,
      EnvironmentNames: 0,
      IncludeDeleted: 0,
      IncludedDeletedBackTo: 0,
      MaxRecords: 0,
      NextToken: 0,
    },
    output: { Environments: D.list(o_EnvironmentDescription) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEnvironments",
})) as any;

export type DescribeEventsError = CommonErrors;
/**
 * Returns list of event descriptions matching criteria up to the last 6 weeks.
 *
 * This action returns the most recent 1,000 events from the specified
 * `NextToken`.
 */
export const describeEvents: API.PaginatedOperationMethod<
  DescribeEventsMessage,
  EventDescriptionsMessage,
  DescribeEventsError,
  Credentials | HttpClient.HttpClient,
  EventDescription
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ApplicationName: 0,
      VersionLabel: 0,
      TemplateName: 0,
      EnvironmentId: 0,
      EnvironmentName: 0,
      PlatformArn: 0,
      RequestId: 0,
      Severity: 0,
      StartTime: 0,
      EndTime: 0,
      MaxRecords: 0,
      NextToken: 0,
    },
    output: { Events: D.list({ EventDate: D.ts }) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEvents",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Events",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeInstancesHealthError =
  | ElasticBeanstalkServiceException
  | InvalidRequestException
  | CommonErrors;
/**
 * Retrieves detailed information about the health of instances in your AWS Elastic
 * Beanstalk. This operation requires enhanced health
 * reporting.
 */
export const describeInstancesHealth: API.OperationMethod<
  DescribeInstancesHealthRequest,
  DescribeInstancesHealthResult,
  DescribeInstancesHealthError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      EnvironmentName: 0,
      EnvironmentId: 0,
      AttributeNames: 0,
      NextToken: 0,
    },
    output: {
      InstanceHealthList: D.list({
        Causes: D.list(),
        LaunchedAt: D.ts,
        ApplicationMetrics: o_ApplicationMetrics,
        System: {
          CPUUtilization: {
            User: D.num,
            Nice: D.num,
            System: D.num,
            Idle: D.num,
            IOWait: D.num,
            IRQ: D.num,
            SoftIRQ: D.num,
            Privileged: D.num,
          },
          LoadAverage: D.list(D.num),
        },
        Deployment: { DeploymentId: D.num, DeploymentTime: D.ts },
      }),
      RefreshedAt: D.ts,
    },
  },
  errors: [ElasticBeanstalkServiceException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInstancesHealth",
})) as any;

export type DescribePlatformVersionError =
  | ElasticBeanstalkServiceException
  | InsufficientPrivilegesException
  | CommonErrors;
/**
 * Describes a platform version. Provides full details. Compare to ListPlatformVersions, which provides summary information about a list of
 * platform versions.
 *
 * For definitions of platform version and other platform-related terms, see AWS Elastic Beanstalk
 * Platforms Glossary.
 */
export const describePlatformVersion: API.OperationMethod<
  DescribePlatformVersionRequest,
  DescribePlatformVersionResult,
  DescribePlatformVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { PlatformArn: 0 },
    output: {
      PlatformDescription: {
        DateCreated: D.ts,
        DateUpdated: D.ts,
        ProgrammingLanguages: D.list({}),
        Frameworks: D.list({}),
        CustomAmiList: D.list({}),
        SupportedTierList: D.list(),
        SupportedAddonList: D.list(),
      },
    },
  },
  errors: [ElasticBeanstalkServiceException, InsufficientPrivilegesException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePlatformVersion",
})) as any;

export type DisassociateEnvironmentOperationsRoleError =
  | InsufficientPrivilegesException
  | CommonErrors;
/**
 * Disassociate the operations role from an environment. After this call is made, Elastic Beanstalk uses
 * the caller's permissions for permissions to downstream services during subsequent calls acting
 * on this environment. For more information, see Operations roles in the
 * *AWS Elastic Beanstalk Developer Guide*.
 */
export const disassociateEnvironmentOperationsRole: API.OperationMethod<
  DisassociateEnvironmentOperationsRoleMessage,
  DisassociateEnvironmentOperationsRoleResponse,
  DisassociateEnvironmentOperationsRoleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { EnvironmentName: 0 } },
  errors: [InsufficientPrivilegesException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateEnvironmentOperationsRole",
})) as any;

export type ListAvailableSolutionStacksError = CommonErrors;
/**
 * Returns a list of the available solution stack names, with the public version first and
 * then in reverse chronological order.
 */
export const listAvailableSolutionStacks: API.OperationMethod<
  ListAvailableSolutionStacksRequest,
  ListAvailableSolutionStacksResultMessage,
  ListAvailableSolutionStacksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    output: {
      SolutionStacks: D.list(),
      SolutionStackDetails: D.list({ PermittedFileTypes: D.list() }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAvailableSolutionStacks",
})) as any;

export type ListPlatformBranchesError = CommonErrors;
/**
 * Lists the platform branches available for your account in an AWS Region. Provides
 * summary information about each platform branch.
 *
 * For definitions of platform branch and other platform-related terms, see AWS Elastic Beanstalk
 * Platforms Glossary.
 */
export const listPlatformBranches: API.PaginatedOperationMethod<
  ListPlatformBranchesRequest,
  ListPlatformBranchesResult,
  ListPlatformBranchesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Filters: D.list({ Attribute: 0, Operator: 0, Values: 0 }),
      MaxRecords: 0,
      NextToken: 0,
    },
    output: {
      PlatformBranchSummaryList: D.list({
        BranchOrder: D.num,
        SupportedTierList: D.list(),
      }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPlatformBranches",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type ListPlatformVersionsError =
  | ElasticBeanstalkServiceException
  | InsufficientPrivilegesException
  | CommonErrors;
/**
 * Lists the platform versions available for your account in an AWS Region. Provides
 * summary information about each platform version. Compare to DescribePlatformVersion, which provides full details about a single platform
 * version.
 *
 * For definitions of platform version and other platform-related terms, see AWS Elastic Beanstalk
 * Platforms Glossary.
 */
export const listPlatformVersions: API.PaginatedOperationMethod<
  ListPlatformVersionsRequest,
  ListPlatformVersionsResult,
  ListPlatformVersionsError,
  Credentials | HttpClient.HttpClient,
  PlatformSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Filters: D.list({ Type: 0, Operator: 0, Values: 0 }),
      MaxRecords: 0,
      NextToken: 0,
    },
    output: { PlatformSummaryList: D.list(o_PlatformSummary) },
  },
  errors: [ElasticBeanstalkServiceException, InsufficientPrivilegesException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPlatformVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PlatformSummaryList",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InsufficientPrivilegesException
  | ResourceNotFoundException
  | ResourceTypeNotSupportedException
  | CommonErrors;
/**
 * Return the tags applied to an AWS Elastic Beanstalk resource. The response contains a list of tag key-value pairs.
 *
 * Elastic Beanstalk supports tagging of all of its resources. For details about resource tagging, see
 * Tagging Application
 * Resources.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceMessage,
  ResourceTagsDescriptionMessage,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResourceArn: 0 },
    output: { ResourceTags: D.list({}) },
  },
  errors: [
    InsufficientPrivilegesException,
    ResourceNotFoundException,
    ResourceTypeNotSupportedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type RebuildEnvironmentError =
  | InsufficientPrivilegesException
  | CommonErrors;
/**
 * Deletes and recreates all of the AWS resources (for example: the Auto Scaling group,
 * load balancer, etc.) for a specified environment and forces a restart.
 */
export const rebuildEnvironment: API.OperationMethod<
  RebuildEnvironmentMessage,
  RebuildEnvironmentResponse,
  RebuildEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { EnvironmentId: 0, EnvironmentName: 0 } },
  errors: [InsufficientPrivilegesException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RebuildEnvironment",
})) as any;

export type RequestEnvironmentInfoError = CommonErrors;
/**
 * Initiates a request to compile the specified type of information of the deployed
 * environment.
 *
 * Setting the `InfoType` to `tail` compiles the last lines from
 * the application server log files of every Amazon EC2 instance in your environment.
 *
 * Setting the `InfoType` to `bundle` compresses the application
 * server log files for every Amazon EC2 instance into a `.zip` file. Legacy and .NET
 * containers do not support bundle logs.
 *
 * Setting the `InfoType` to `analyze` collects recent events,
 * instance health, and logs from your environment and sends them to Amazon Bedrock in your
 * account to generate diagnostic insights and recommended next steps.
 *
 * Use RetrieveEnvironmentInfo to obtain the set of logs.
 *
 * Related Topics
 *
 * - RetrieveEnvironmentInfo
 */
export const requestEnvironmentInfo: API.OperationMethod<
  RequestEnvironmentInfoMessage,
  RequestEnvironmentInfoResponse,
  RequestEnvironmentInfoError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { EnvironmentId: 0, EnvironmentName: 0, InfoType: 0 },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RequestEnvironmentInfo",
})) as any;

export type RestartAppServerError = CommonErrors;
/**
 * Causes the environment to restart the application container server running on each
 * Amazon EC2 instance.
 */
export const restartAppServer: API.OperationMethod<
  RestartAppServerMessage,
  RestartAppServerResponse,
  RestartAppServerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { EnvironmentId: 0, EnvironmentName: 0 } },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestartAppServer",
})) as any;

export type RetrieveEnvironmentInfoError = CommonErrors;
/**
 * Retrieves the compiled information from a RequestEnvironmentInfo
 * request.
 *
 * Related Topics
 *
 * - RequestEnvironmentInfo
 */
export const retrieveEnvironmentInfo: API.OperationMethod<
  RetrieveEnvironmentInfoMessage,
  RetrieveEnvironmentInfoResultMessage,
  RetrieveEnvironmentInfoError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { EnvironmentId: 0, EnvironmentName: 0, InfoType: 0 },
    output: { EnvironmentInfo: D.list({ SampleTimestamp: D.ts }) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RetrieveEnvironmentInfo",
})) as any;

export type SwapEnvironmentCNAMEsError = CommonErrors;
/**
 * Swaps the CNAMEs of two environments.
 */
export const swapEnvironmentCNAMEs: API.OperationMethod<
  SwapEnvironmentCNAMEsMessage,
  SwapEnvironmentCNAMEsResponse,
  SwapEnvironmentCNAMEsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      SourceEnvironmentId: 0,
      SourceEnvironmentName: 0,
      DestinationEnvironmentId: 0,
      DestinationEnvironmentName: 0,
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SwapEnvironmentCNAMEs",
})) as any;

export type TerminateEnvironmentError =
  | InsufficientPrivilegesException
  | CommonErrors;
/**
 * Terminates the specified environment.
 */
export const terminateEnvironment: API.OperationMethod<
  TerminateEnvironmentMessage,
  EnvironmentDescription,
  TerminateEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      EnvironmentId: 0,
      EnvironmentName: 0,
      TerminateResources: 0,
      ForceTerminate: 0,
    },
    output: {
      DateCreated: D.ts,
      DateUpdated: D.ts,
      AbortableOperationInProgress: D.bool,
      Resources: o_EnvironmentResourcesDescription,
      Tier: {},
      EnvironmentLinks: D.list({}),
    },
  },
  errors: [InsufficientPrivilegesException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TerminateEnvironment",
})) as any;

export type UpdateApplicationError = CommonErrors;
/**
 * Updates the specified application to have the specified properties.
 *
 * If a property (for example, `description`) is not provided, the value
 * remains unchanged. To clear these properties, specify an empty string.
 */
export const updateApplication: API.OperationMethod<
  UpdateApplicationMessage,
  ApplicationDescriptionMessage,
  UpdateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ApplicationName: 0, Description: 0 },
    output: { Application: o_ApplicationDescription },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApplication",
})) as any;

export type UpdateApplicationResourceLifecycleError =
  | InsufficientPrivilegesException
  | CommonErrors;
/**
 * Modifies lifecycle settings for an application.
 */
export const updateApplicationResourceLifecycle: API.OperationMethod<
  UpdateApplicationResourceLifecycleMessage,
  ApplicationResourceLifecycleDescriptionMessage,
  UpdateApplicationResourceLifecycleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ApplicationName: 0,
      ResourceLifecycleConfig: i_ApplicationResourceLifecycleConfig,
    },
    output: { ResourceLifecycleConfig: o_ApplicationResourceLifecycleConfig },
  },
  errors: [InsufficientPrivilegesException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApplicationResourceLifecycle",
})) as any;

export type UpdateApplicationVersionError = CommonErrors;
/**
 * Updates the specified application version to have the specified properties.
 *
 * If a property (for example, `description`) is not provided, the value
 * remains unchanged. To clear properties, specify an empty string.
 */
export const updateApplicationVersion: API.OperationMethod<
  UpdateApplicationVersionMessage,
  ApplicationVersionDescriptionMessage,
  UpdateApplicationVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ApplicationName: 0, VersionLabel: 0, Description: 0 },
    output: { ApplicationVersion: o_ApplicationVersionDescription },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApplicationVersion",
})) as any;

export type UpdateConfigurationTemplateError =
  | InsufficientPrivilegesException
  | TooManyBucketsException
  | CommonErrors;
/**
 * Updates the specified configuration template to have the specified properties or
 * configuration option values.
 *
 * If a property (for example, `ApplicationName`) is not provided, its value
 * remains unchanged. To clear such properties, specify an empty string.
 *
 * Related Topics
 *
 * - DescribeConfigurationOptions
 */
export const updateConfigurationTemplate: API.OperationMethod<
  UpdateConfigurationTemplateMessage,
  ConfigurationSettingsDescription,
  UpdateConfigurationTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ApplicationName: 0,
      TemplateName: 0,
      Description: 0,
      OptionSettings: D.list(i_ConfigurationOptionSetting),
      OptionsToRemove: D.list(i_OptionSpecification),
    },
    output: {
      DateCreated: D.ts,
      DateUpdated: D.ts,
      OptionSettings: D.list({}),
    },
  },
  errors: [InsufficientPrivilegesException, TooManyBucketsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConfigurationTemplate",
})) as any;

export type UpdateEnvironmentError =
  | InsufficientPrivilegesException
  | TooManyBucketsException
  | CommonErrors;
/**
 * Updates the environment description, deploys a new application version, updates the
 * configuration settings to an entirely new configuration template, or updates select
 * configuration option values in the running environment.
 *
 * Attempting to update both the release and configuration is not allowed and AWS Elastic
 * Beanstalk returns an `InvalidParameterCombination` error.
 *
 * When updating the configuration settings to a new template or individual settings, a
 * draft configuration is created and DescribeConfigurationSettings for this
 * environment returns two setting descriptions with different `DeploymentStatus`
 * values.
 */
export const updateEnvironment: API.OperationMethod<
  UpdateEnvironmentMessage,
  EnvironmentDescription,
  UpdateEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ApplicationName: 0,
      EnvironmentId: 0,
      EnvironmentName: 0,
      GroupName: 0,
      Description: 0,
      Tier: i_EnvironmentTier,
      VersionLabel: 0,
      TemplateName: 0,
      SolutionStackName: 0,
      PlatformArn: 0,
      OptionSettings: D.list(i_ConfigurationOptionSetting),
      OptionsToRemove: D.list(i_OptionSpecification),
    },
    output: {
      DateCreated: D.ts,
      DateUpdated: D.ts,
      AbortableOperationInProgress: D.bool,
      Resources: o_EnvironmentResourcesDescription,
      Tier: {},
      EnvironmentLinks: D.list({}),
    },
  },
  errors: [InsufficientPrivilegesException, TooManyBucketsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEnvironment",
})) as any;

export type UpdateTagsForResourceError =
  | InsufficientPrivilegesException
  | OperationInProgressException
  | ResourceNotFoundException
  | ResourceTypeNotSupportedException
  | TooManyTagsException
  | CommonErrors;
/**
 * Update the list of tags applied to an AWS Elastic Beanstalk resource. Two lists can be passed: `TagsToAdd`
 * for tags to add or update, and `TagsToRemove`.
 *
 * Elastic Beanstalk supports tagging of all of its resources. For details about resource tagging, see
 * Tagging Application
 * Resources.
 *
 * If you create a custom IAM user policy to control permission to this operation, specify
 * one of the following two virtual actions (or both) instead of the API operation name:
 *
 * ### elasticbeanstalk:AddTags
 *
 * Controls permission to call `UpdateTagsForResource` and pass a list of tags to add in the `TagsToAdd`
 * parameter.
 *
 * ### elasticbeanstalk:RemoveTags
 *
 * Controls permission to call `UpdateTagsForResource` and pass a list of tag keys to remove in the `TagsToRemove`
 * parameter.
 *
 * For details about creating a custom user policy, see Creating a Custom User Policy.
 */
export const updateTagsForResource: API.OperationMethod<
  UpdateTagsForResourceMessage,
  UpdateTagsForResourceResponse,
  UpdateTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResourceArn: 0, TagsToAdd: D.list(i_Tag), TagsToRemove: 0 },
  },
  errors: [
    InsufficientPrivilegesException,
    OperationInProgressException,
    ResourceNotFoundException,
    ResourceTypeNotSupportedException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTagsForResource",
})) as any;

export type ValidateConfigurationSettingsError =
  | InsufficientPrivilegesException
  | TooManyBucketsException
  | CommonErrors;
/**
 * Takes a set of configuration settings and either a configuration template or
 * environment, and determines whether those values are valid.
 *
 * This action returns a list of messages indicating any errors or warnings associated
 * with the selection of option values.
 */
export const validateConfigurationSettings: API.OperationMethod<
  ValidateConfigurationSettingsMessage,
  ConfigurationSettingsValidationMessages,
  ValidateConfigurationSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ApplicationName: 0,
      TemplateName: 0,
      EnvironmentName: 0,
      OptionSettings: D.list(i_ConfigurationOptionSetting),
    },
    output: { Messages: D.list({}) },
  },
  errors: [InsufficientPrivilegesException, TooManyBucketsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ValidateConfigurationSettings",
})) as any;

const i_ApplicationResourceLifecycleConfig: D.LazyStruct = () => ({
  ServiceRole: 0,
  VersionLifecycleConfig: {
    MaxCountRule: { Enabled: 0, MaxCount: 0, DeleteSourceFromS3: 0 },
    MaxAgeRule: { Enabled: 0, MaxAgeInDays: 0, DeleteSourceFromS3: 0 },
  },
});
const i_ConfigurationOptionSetting: D.LazyStruct = () => ({
  ResourceName: 0,
  Namespace: 0,
  OptionName: 0,
  Value: 0,
});
const i_EnvironmentTier: D.LazyStruct = () => ({
  Name: 0,
  Type: 0,
  Version: 0,
});
const i_OptionSpecification: D.LazyStruct = () => ({
  ResourceName: 0,
  Namespace: 0,
  OptionName: 0,
});
const i_S3Location: D.LazyStruct = () => ({ S3Bucket: 0, S3Key: 0 });
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const o_ApplicationDescription: D.LazyStruct = () => ({
  DateCreated: D.ts,
  DateUpdated: D.ts,
  Versions: D.list(),
  ConfigurationTemplates: D.list(),
  ResourceLifecycleConfig: o_ApplicationResourceLifecycleConfig,
});
const o_ApplicationMetrics: D.LazyStruct = () => ({
  Duration: D.num,
  RequestCount: D.num,
  StatusCodes: {
    Status2xx: D.num,
    Status3xx: D.num,
    Status4xx: D.num,
    Status5xx: D.num,
  },
  Latency: {
    P999: D.num,
    P99: D.num,
    P95: D.num,
    P90: D.num,
    P85: D.num,
    P75: D.num,
    P50: D.num,
    P10: D.num,
  },
});
const o_ApplicationResourceLifecycleConfig: D.LazyStruct = () => ({
  VersionLifecycleConfig: {
    MaxCountRule: {
      Enabled: D.bool,
      MaxCount: D.num,
      DeleteSourceFromS3: D.bool,
    },
    MaxAgeRule: {
      Enabled: D.bool,
      MaxAgeInDays: D.num,
      DeleteSourceFromS3: D.bool,
    },
  },
});
const o_ApplicationVersionDescription: D.LazyStruct = () => ({
  SourceBuildInformation: {},
  SourceBundle: {},
  DateCreated: D.ts,
  DateUpdated: D.ts,
});
const o_EnvironmentDescription: D.LazyStruct = () => ({
  DateCreated: D.ts,
  DateUpdated: D.ts,
  AbortableOperationInProgress: D.bool,
  Resources: o_EnvironmentResourcesDescription,
  Tier: {},
  EnvironmentLinks: D.list({}),
});
const o_EnvironmentResourcesDescription: D.LazyStruct = () => ({
  LoadBalancer: { Listeners: D.list({ Port: D.num }) },
});
const o_PlatformSummary: D.LazyStruct = () => ({
  SupportedTierList: D.list(),
  SupportedAddonList: D.list(),
});
const o_ResourceQuota: D.LazyStruct = () => ({ Maximum: D.num });
