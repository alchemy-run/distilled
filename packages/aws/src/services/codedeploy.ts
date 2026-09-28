import type * as HttpClient from "effect/unstable/http/HttpClient";
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
  sdkId: "CodeDeploy",
  target: "CodeDeploy_20141006",
  version: "2014-10-06",
  sigv4: "codedeploy",
  protocol: awsJson1_1Protocol,
  xmlns: "http://codedeploy.amazonaws.com/doc/2014-10-06/",
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
                `https://codedeploy-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://codedeploy-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://codedeploy.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://codedeploy.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AlarmsLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("AlarmsLimitExceededException")<{
    readonly message?: string;
  }> {}
export class ApplicationAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError("ApplicationAlreadyExistsException", [
    "AlreadyExistsError",
  ])<{ readonly message?: string }> {}
export class ApplicationDoesNotExistException
  extends /*@__PURE__*/ TE.TaggedError("ApplicationDoesNotExistException")<{
    readonly message?: string;
  }> {}
export class ApplicationLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("ApplicationLimitExceededException")<{
    readonly message?: string;
  }> {}
export class ApplicationNameRequiredException
  extends /*@__PURE__*/ TE.TaggedError("ApplicationNameRequiredException")<{
    readonly message?: string;
  }> {}
export class ArnNotSupportedException
  extends /*@__PURE__*/ TE.TaggedError("ArnNotSupportedException")<{
    readonly message?: string;
  }> {}
export class BatchLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("BatchLimitExceededException")<{
    readonly message?: string;
  }> {}
export class BucketNameFilterRequiredException
  extends /*@__PURE__*/ TE.TaggedError("BucketNameFilterRequiredException")<{
    readonly message?: string;
  }> {}
export class DeploymentAlreadyCompletedException
  extends /*@__PURE__*/ TE.TaggedError("DeploymentAlreadyCompletedException")<{
    readonly message?: string;
  }> {}
export class DeploymentConfigAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "DeploymentConfigAlreadyExistsException",
    ["AlreadyExistsError"],
  )<{ readonly message?: string }> {}
export class DeploymentConfigDoesNotExistException
  extends /*@__PURE__*/ TE.TaggedError(
    "DeploymentConfigDoesNotExistException",
  )<{ readonly message?: string }> {}
export class DeploymentConfigInUseException
  extends /*@__PURE__*/ TE.TaggedError("DeploymentConfigInUseException")<{
    readonly message?: string;
  }> {}
export class DeploymentConfigLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "DeploymentConfigLimitExceededException",
  )<{ readonly message?: string }> {}
export class DeploymentConfigNameRequiredException
  extends /*@__PURE__*/ TE.TaggedError(
    "DeploymentConfigNameRequiredException",
  )<{ readonly message?: string }> {}
export class DeploymentDoesNotExistException
  extends /*@__PURE__*/ TE.TaggedError("DeploymentDoesNotExistException")<{
    readonly message?: string;
  }> {}
export class DeploymentGroupAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "DeploymentGroupAlreadyExistsException",
    ["AlreadyExistsError"],
  )<{ readonly message?: string }> {}
export class DeploymentGroupDoesNotExistException
  extends /*@__PURE__*/ TE.TaggedError("DeploymentGroupDoesNotExistException")<{
    readonly message?: string;
  }> {}
export class DeploymentGroupLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "DeploymentGroupLimitExceededException",
  )<{ readonly message?: string }> {}
export class DeploymentGroupNameRequiredException
  extends /*@__PURE__*/ TE.TaggedError("DeploymentGroupNameRequiredException")<{
    readonly message?: string;
  }> {}
export class DeploymentIdRequiredException
  extends /*@__PURE__*/ TE.TaggedError("DeploymentIdRequiredException")<{
    readonly message?: string;
  }> {}
export class DeploymentIsNotInReadyStateException
  extends /*@__PURE__*/ TE.TaggedError("DeploymentIsNotInReadyStateException")<{
    readonly message?: string;
  }> {}
export class DeploymentLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("DeploymentLimitExceededException")<{
    readonly message?: string;
  }> {}
export class DeploymentNotStartedException
  extends /*@__PURE__*/ TE.TaggedError("DeploymentNotStartedException")<{
    readonly message?: string;
  }> {}
export class DeploymentTargetDoesNotExistException
  extends /*@__PURE__*/ TE.TaggedError(
    "DeploymentTargetDoesNotExistException",
  )<{ readonly message?: string }> {}
export class DeploymentTargetIdRequiredException
  extends /*@__PURE__*/ TE.TaggedError("DeploymentTargetIdRequiredException")<{
    readonly message?: string;
  }> {}
export class DeploymentTargetListSizeExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "DeploymentTargetListSizeExceededException",
  )<{ readonly message?: string }> {}
export class DescriptionTooLongException
  extends /*@__PURE__*/ TE.TaggedError("DescriptionTooLongException")<{
    readonly message?: string;
  }> {}
export class ECSServiceMappingLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ECSServiceMappingLimitExceededException",
  )<{ readonly message?: string }> {}
export class GitHubAccountTokenDoesNotExistException
  extends /*@__PURE__*/ TE.TaggedError(
    "GitHubAccountTokenDoesNotExistException",
  )<{ readonly message?: string }> {}
export class GitHubAccountTokenNameRequiredException
  extends /*@__PURE__*/ TE.TaggedError(
    "GitHubAccountTokenNameRequiredException",
  )<{ readonly message?: string }> {}
export class IamArnRequiredException
  extends /*@__PURE__*/ TE.TaggedError("IamArnRequiredException")<{
    readonly message?: string;
  }> {}
export class IamSessionArnAlreadyRegisteredException
  extends /*@__PURE__*/ TE.TaggedError(
    "IamSessionArnAlreadyRegisteredException",
  )<{ readonly message?: string }> {}
export class IamUserArnAlreadyRegisteredException
  extends /*@__PURE__*/ TE.TaggedError("IamUserArnAlreadyRegisteredException")<{
    readonly message?: string;
  }> {}
export class IamUserArnRequiredException
  extends /*@__PURE__*/ TE.TaggedError("IamUserArnRequiredException")<{
    readonly message?: string;
  }> {}
export class InstanceDoesNotExistException
  extends /*@__PURE__*/ TE.TaggedError("InstanceDoesNotExistException")<{
    readonly message?: string;
  }> {}
export class InstanceIdRequiredException
  extends /*@__PURE__*/ TE.TaggedError("InstanceIdRequiredException")<{
    readonly message?: string;
  }> {}
export class InstanceLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("InstanceLimitExceededException")<{
    readonly message?: string;
  }> {}
export class InstanceNameAlreadyRegisteredException
  extends /*@__PURE__*/ TE.TaggedError(
    "InstanceNameAlreadyRegisteredException",
  )<{ readonly message?: string }> {}
export class InstanceNameRequiredException
  extends /*@__PURE__*/ TE.TaggedError("InstanceNameRequiredException")<{
    readonly message?: string;
  }> {}
export class InstanceNotRegisteredException
  extends /*@__PURE__*/ TE.TaggedError("InstanceNotRegisteredException")<{
    readonly message?: string;
  }> {}
export class InvalidAlarmConfigException
  extends /*@__PURE__*/ TE.TaggedError("InvalidAlarmConfigException")<{
    readonly message?: string;
  }> {}
export class InvalidApplicationNameException
  extends /*@__PURE__*/ TE.TaggedError("InvalidApplicationNameException")<{
    readonly message?: string;
  }> {}
export class InvalidArnException
  extends /*@__PURE__*/ TE.TaggedError("InvalidArnException")<{
    readonly message?: string;
  }> {}
export class InvalidAutoRollbackConfigException
  extends /*@__PURE__*/ TE.TaggedError("InvalidAutoRollbackConfigException")<{
    readonly message?: string;
  }> {}
export class InvalidAutoScalingGroupException
  extends /*@__PURE__*/ TE.TaggedError("InvalidAutoScalingGroupException")<{
    readonly message?: string;
  }> {}
export class InvalidBlueGreenDeploymentConfigurationException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidBlueGreenDeploymentConfigurationException",
  )<{ readonly message?: string }> {}
export class InvalidBucketNameFilterException
  extends /*@__PURE__*/ TE.TaggedError("InvalidBucketNameFilterException")<{
    readonly message?: string;
  }> {}
export class InvalidComputePlatformException
  extends /*@__PURE__*/ TE.TaggedError("InvalidComputePlatformException")<{
    readonly message?: string;
  }> {}
export class InvalidDeployedStateFilterException
  extends /*@__PURE__*/ TE.TaggedError("InvalidDeployedStateFilterException")<{
    readonly message?: string;
  }> {}
export class InvalidDeploymentConfigNameException
  extends /*@__PURE__*/ TE.TaggedError("InvalidDeploymentConfigNameException")<{
    readonly message?: string;
  }> {}
export class InvalidDeploymentGroupNameException
  extends /*@__PURE__*/ TE.TaggedError("InvalidDeploymentGroupNameException")<{
    readonly message?: string;
  }> {}
export class InvalidDeploymentIdException
  extends /*@__PURE__*/ TE.TaggedError("InvalidDeploymentIdException")<{
    readonly message?: string;
  }> {}
export class InvalidDeploymentInstanceTypeException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidDeploymentInstanceTypeException",
  )<{ readonly message?: string }> {}
export class InvalidDeploymentStatusException
  extends /*@__PURE__*/ TE.TaggedError("InvalidDeploymentStatusException")<{
    readonly message?: string;
  }> {}
export class InvalidDeploymentStyleException
  extends /*@__PURE__*/ TE.TaggedError("InvalidDeploymentStyleException")<{
    readonly message?: string;
  }> {}
export class InvalidDeploymentTargetIdException
  extends /*@__PURE__*/ TE.TaggedError("InvalidDeploymentTargetIdException")<{
    readonly message?: string;
  }> {}
export class InvalidDeploymentWaitTypeException
  extends /*@__PURE__*/ TE.TaggedError("InvalidDeploymentWaitTypeException")<{
    readonly message?: string;
  }> {}
export class InvalidEC2TagCombinationException
  extends /*@__PURE__*/ TE.TaggedError("InvalidEC2TagCombinationException")<{
    readonly message?: string;
  }> {}
export class InvalidEC2TagException
  extends /*@__PURE__*/ TE.TaggedError("InvalidEC2TagException")<{
    readonly message?: string;
  }> {}
export class InvalidECSServiceException
  extends /*@__PURE__*/ TE.TaggedError("InvalidECSServiceException")<{
    readonly message?: string;
  }> {}
export class InvalidExternalIdException
  extends /*@__PURE__*/ TE.TaggedError("InvalidExternalIdException")<{
    readonly message?: string;
  }> {}
export class InvalidFileExistsBehaviorException
  extends /*@__PURE__*/ TE.TaggedError("InvalidFileExistsBehaviorException")<{
    readonly message?: string;
  }> {}
export class InvalidGitHubAccountTokenException
  extends /*@__PURE__*/ TE.TaggedError("InvalidGitHubAccountTokenException")<{
    readonly message?: string;
  }> {}
export class InvalidGitHubAccountTokenNameException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidGitHubAccountTokenNameException",
  )<{ readonly message?: string }> {}
export class InvalidIamSessionArnException
  extends /*@__PURE__*/ TE.TaggedError("InvalidIamSessionArnException")<{
    readonly message?: string;
  }> {}
export class InvalidIamUserArnException
  extends /*@__PURE__*/ TE.TaggedError("InvalidIamUserArnException")<{
    readonly message?: string;
  }> {}
export class InvalidIgnoreApplicationStopFailuresValueException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidIgnoreApplicationStopFailuresValueException",
  )<{ readonly message?: string }> {}
export class InvalidInputException
  extends /*@__PURE__*/ TE.TaggedError("InvalidInputException")<{
    readonly message?: string;
  }> {}
export class InvalidInstanceNameException
  extends /*@__PURE__*/ TE.TaggedError("InvalidInstanceNameException")<{
    readonly message?: string;
  }> {}
export class InvalidInstanceStatusException
  extends /*@__PURE__*/ TE.TaggedError("InvalidInstanceStatusException")<{
    readonly message?: string;
  }> {}
export class InvalidInstanceTypeException
  extends /*@__PURE__*/ TE.TaggedError("InvalidInstanceTypeException")<{
    readonly message?: string;
  }> {}
export class InvalidKeyPrefixFilterException
  extends /*@__PURE__*/ TE.TaggedError("InvalidKeyPrefixFilterException")<{
    readonly message?: string;
  }> {}
export class InvalidLifecycleEventHookExecutionIdException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidLifecycleEventHookExecutionIdException",
  )<{ readonly message?: string }> {}
export class InvalidLifecycleEventHookExecutionStatusException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidLifecycleEventHookExecutionStatusException",
  )<{ readonly message?: string }> {}
export class InvalidLoadBalancerInfoException
  extends /*@__PURE__*/ TE.TaggedError("InvalidLoadBalancerInfoException")<{
    readonly message?: string;
  }> {}
export class InvalidMinimumHealthyHostValueException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidMinimumHealthyHostValueException",
  )<{ readonly message?: string }> {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ TE.TaggedError("InvalidNextTokenException")<{
    readonly message?: string;
  }> {}
export class InvalidOnPremisesTagCombinationException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidOnPremisesTagCombinationException",
  )<{ readonly message?: string }> {}
export class InvalidOperationException
  extends /*@__PURE__*/ TE.TaggedError("InvalidOperationException")<{
    readonly message?: string;
  }> {}
export class InvalidRegistrationStatusException
  extends /*@__PURE__*/ TE.TaggedError("InvalidRegistrationStatusException")<{
    readonly message?: string;
  }> {}
export class InvalidRevisionException
  extends /*@__PURE__*/ TE.TaggedError("InvalidRevisionException")<{
    readonly message?: string;
  }> {}
export class InvalidRoleException
  extends /*@__PURE__*/ TE.TaggedError("InvalidRoleException")<{
    readonly message?: string;
  }> {}
export class InvalidSortByException
  extends /*@__PURE__*/ TE.TaggedError("InvalidSortByException")<{
    readonly message?: string;
  }> {}
export class InvalidSortOrderException
  extends /*@__PURE__*/ TE.TaggedError("InvalidSortOrderException")<{
    readonly message?: string;
  }> {}
export class InvalidTagException
  extends /*@__PURE__*/ TE.TaggedError("InvalidTagException")<{
    readonly message?: string;
  }> {}
export class InvalidTagFilterException
  extends /*@__PURE__*/ TE.TaggedError("InvalidTagFilterException")<{
    readonly message?: string;
  }> {}
export class InvalidTagsToAddException
  extends /*@__PURE__*/ TE.TaggedError("InvalidTagsToAddException")<{
    readonly message?: string;
  }> {}
export class InvalidTargetFilterNameException
  extends /*@__PURE__*/ TE.TaggedError("InvalidTargetFilterNameException")<{
    readonly message?: string;
  }> {}
export class InvalidTargetGroupPairException
  extends /*@__PURE__*/ TE.TaggedError("InvalidTargetGroupPairException")<{
    readonly message?: string;
  }> {}
export class InvalidTargetInstancesException
  extends /*@__PURE__*/ TE.TaggedError("InvalidTargetInstancesException")<{
    readonly message?: string;
  }> {}
export class InvalidTimeRangeException
  extends /*@__PURE__*/ TE.TaggedError("InvalidTimeRangeException")<{
    readonly message?: string;
  }> {}
export class InvalidTrafficRoutingConfigurationException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidTrafficRoutingConfigurationException",
  )<{ readonly message?: string }> {}
export class InvalidTriggerConfigException
  extends /*@__PURE__*/ TE.TaggedError("InvalidTriggerConfigException")<{
    readonly message?: string;
  }> {}
export class InvalidUpdateOutdatedInstancesOnlyValueException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidUpdateOutdatedInstancesOnlyValueException",
  )<{ readonly message?: string }> {}
export class InvalidZonalDeploymentConfigurationException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidZonalDeploymentConfigurationException",
  )<{ readonly message?: string }> {}
export class LifecycleEventAlreadyCompletedException
  extends /*@__PURE__*/ TE.TaggedError(
    "LifecycleEventAlreadyCompletedException",
  )<{ readonly message?: string }> {}
export class LifecycleHookLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("LifecycleHookLimitExceededException")<{
    readonly message?: string;
  }> {}
export class MultipleIamArnsProvidedException
  extends /*@__PURE__*/ TE.TaggedError("MultipleIamArnsProvidedException")<{
    readonly message?: string;
  }> {}
export class OperationNotSupportedException
  extends /*@__PURE__*/ TE.TaggedError("OperationNotSupportedException")<{
    readonly message?: string;
  }> {}
export class ResourceArnRequiredException
  extends /*@__PURE__*/ TE.TaggedError("ResourceArnRequiredException")<{
    readonly message?: string;
  }> {}
export class ResourceValidationException
  extends /*@__PURE__*/ TE.TaggedError("ResourceValidationException")<{
    readonly message?: string;
  }> {}
export class RevisionDoesNotExistException
  extends /*@__PURE__*/ TE.TaggedError("RevisionDoesNotExistException")<{
    readonly message?: string;
  }> {}
export class RevisionRequiredException
  extends /*@__PURE__*/ TE.TaggedError("RevisionRequiredException")<{
    readonly message?: string;
  }> {}
export class RoleRequiredException
  extends /*@__PURE__*/ TE.TaggedError("RoleRequiredException")<{
    readonly message?: string;
  }> {}
export class TagLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("TagLimitExceededException")<{
    readonly message?: string;
  }> {}
export class TagRequiredException
  extends /*@__PURE__*/ TE.TaggedError("TagRequiredException")<{
    readonly message?: string;
  }> {}
export class TagSetListLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("TagSetListLimitExceededException")<{
    readonly message?: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError("ThrottlingException")<{
    readonly message?: string;
  }> {}
export class TriggerTargetsLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("TriggerTargetsLimitExceededException")<{
    readonly message?: string;
  }> {}
export class UnsupportedActionForDeploymentTypeException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnsupportedActionForDeploymentTypeException",
  )<{ readonly message?: string }> {}
export type Key = string;
export type Value = string;
export interface Tag {
  Key?: string;
  Value?: string;
}
export type TagList = Tag[];
export type InstanceName = string;
export type InstanceNameList = string[];
export interface AddTagsToOnPremisesInstancesInput {
  tags: Tag[];
  instanceNames: string[];
}
export interface AddTagsToOnPremisesInstancesResponse {}
export type ApplicationName = string;
export type RevisionLocationType =
  | "S3"
  | "GitHub"
  | "String"
  | "AppSpecContent"
  | (string & {});
export type S3Bucket = string;
export type S3Key = string;
export type BundleType =
  | "tar"
  | "tgz"
  | "zip"
  | "YAML"
  | "JSON"
  | (string & {});
export type VersionId = string;
export type ETag = string;
export interface S3Location {
  bucket?: string;
  key?: string;
  bundleType?: BundleType;
  version?: string;
  eTag?: string;
}
export type Repository = string;
export type CommitId = string;
export interface GitHubLocation {
  repository?: string;
  commitId?: string;
}
export type RawStringContent = string;
export type RawStringSha256 = string;
export interface RawString {
  content?: string;
  sha256?: string;
}
export interface AppSpecContent {
  content?: string;
  sha256?: string;
}
export interface RevisionLocation {
  revisionType?: RevisionLocationType;
  s3Location?: S3Location;
  gitHubLocation?: GitHubLocation;
  string?: RawString;
  appSpecContent?: AppSpecContent;
}
export type RevisionLocationList = RevisionLocation[];
export interface BatchGetApplicationRevisionsInput {
  applicationName: string;
  revisions: RevisionLocation[];
}
export type ErrorMessage = string;
export type Description = string;
export type DeploymentGroupName = string;
export type DeploymentGroupsList = string[];
export interface GenericRevisionInfo {
  description?: string;
  deploymentGroups?: string[];
  firstUsedTime?: Date;
  lastUsedTime?: Date;
  registerTime?: Date;
}
export interface RevisionInfo {
  revisionLocation?: RevisionLocation;
  genericRevisionInfo?: GenericRevisionInfo;
}
export type RevisionInfoList = RevisionInfo[];
export interface BatchGetApplicationRevisionsOutput {
  applicationName?: string;
  errorMessage?: string;
  revisions?: RevisionInfo[];
}
export type ApplicationsList = string[];
export interface BatchGetApplicationsInput {
  applicationNames: string[];
}
export type ApplicationId = string;
export type GitHubAccountTokenName = string;
export type ComputePlatform = "Server" | "Lambda" | "ECS" | (string & {});
export interface ApplicationInfo {
  applicationId?: string;
  applicationName?: string;
  createTime?: Date;
  linkedToGitHub?: boolean;
  gitHubAccountName?: string;
  computePlatform?: ComputePlatform;
}
export type ApplicationsInfoList = ApplicationInfo[];
export interface BatchGetApplicationsOutput {
  applicationsInfo?: ApplicationInfo[];
}
export interface BatchGetDeploymentGroupsInput {
  applicationName: string;
  deploymentGroupNames: string[];
}
export type DeploymentGroupId = string;
export type DeploymentConfigName = string;
export type EC2TagFilterType =
  | "KEY_ONLY"
  | "VALUE_ONLY"
  | "KEY_AND_VALUE"
  | (string & {});
export interface EC2TagFilter {
  Key?: string;
  Value?: string;
  Type?: EC2TagFilterType;
}
export type EC2TagFilterList = EC2TagFilter[];
export type TagFilterType =
  | "KEY_ONLY"
  | "VALUE_ONLY"
  | "KEY_AND_VALUE"
  | (string & {});
export interface TagFilter {
  Key?: string;
  Value?: string;
  Type?: TagFilterType;
}
export type TagFilterList = TagFilter[];
export type AutoScalingGroupName = string;
export type AutoScalingGroupHook = string;
export interface AutoScalingGroup {
  name?: string;
  hook?: string;
  terminationHook?: string;
}
export type AutoScalingGroupList = AutoScalingGroup[];
export type Role = string;
export type TriggerName = string;
export type TriggerTargetArn = string;
export type TriggerEventType =
  | "DeploymentStart"
  | "DeploymentSuccess"
  | "DeploymentFailure"
  | "DeploymentStop"
  | "DeploymentRollback"
  | "DeploymentReady"
  | "InstanceStart"
  | "InstanceSuccess"
  | "InstanceFailure"
  | "InstanceReady"
  | (string & {});
export type TriggerEventTypeList = TriggerEventType[];
export interface TriggerConfig {
  triggerName?: string;
  triggerTargetArn?: string;
  triggerEvents?: TriggerEventType[];
}
export type TriggerConfigList = TriggerConfig[];
export type AlarmName = string;
export interface Alarm {
  name?: string;
}
export type AlarmList = Alarm[];
export interface AlarmConfiguration {
  enabled?: boolean;
  ignorePollAlarmFailure?: boolean;
  alarms?: Alarm[];
}
export type AutoRollbackEvent =
  | "DEPLOYMENT_FAILURE"
  | "DEPLOYMENT_STOP_ON_ALARM"
  | "DEPLOYMENT_STOP_ON_REQUEST"
  | (string & {});
export type AutoRollbackEventsList = AutoRollbackEvent[];
export interface AutoRollbackConfiguration {
  enabled?: boolean;
  events?: AutoRollbackEvent[];
}
export type DeploymentType = "IN_PLACE" | "BLUE_GREEN" | (string & {});
export type DeploymentOption =
  | "WITH_TRAFFIC_CONTROL"
  | "WITHOUT_TRAFFIC_CONTROL"
  | (string & {});
export interface DeploymentStyle {
  deploymentType?: DeploymentType;
  deploymentOption?: DeploymentOption;
}
export type OutdatedInstancesStrategy = "UPDATE" | "IGNORE" | (string & {});
export type InstanceAction = "TERMINATE" | "KEEP_ALIVE" | (string & {});
export type Duration = number;
export interface BlueInstanceTerminationOption {
  action?: InstanceAction;
  terminationWaitTimeInMinutes?: number;
}
export type DeploymentReadyAction =
  | "CONTINUE_DEPLOYMENT"
  | "STOP_DEPLOYMENT"
  | (string & {});
export interface DeploymentReadyOption {
  actionOnTimeout?: DeploymentReadyAction;
  waitTimeInMinutes?: number;
}
export type GreenFleetProvisioningAction =
  | "DISCOVER_EXISTING"
  | "COPY_AUTO_SCALING_GROUP"
  | (string & {});
export interface GreenFleetProvisioningOption {
  action?: GreenFleetProvisioningAction;
}
export interface BlueGreenDeploymentConfiguration {
  terminateBlueInstancesOnDeploymentSuccess?: BlueInstanceTerminationOption;
  deploymentReadyOption?: DeploymentReadyOption;
  greenFleetProvisioningOption?: GreenFleetProvisioningOption;
}
export type ELBName = string;
export interface ELBInfo {
  name?: string;
}
export type ELBInfoList = ELBInfo[];
export type TargetGroupName = string;
export interface TargetGroupInfo {
  name?: string;
}
export type TargetGroupInfoList = TargetGroupInfo[];
export type ListenerArn = string;
export type ListenerArnList = string[];
export interface TrafficRoute {
  listenerArns?: string[];
}
export interface TargetGroupPairInfo {
  targetGroups?: TargetGroupInfo[];
  prodTrafficRoute?: TrafficRoute;
  testTrafficRoute?: TrafficRoute;
}
export type TargetGroupPairInfoList = TargetGroupPairInfo[];
export interface LoadBalancerInfo {
  elbInfoList?: ELBInfo[];
  targetGroupInfoList?: TargetGroupInfo[];
  targetGroupPairInfoList?: TargetGroupPairInfo[];
}
export type DeploymentId = string;
export type DeploymentStatus =
  | "Created"
  | "Queued"
  | "InProgress"
  | "Baking"
  | "Succeeded"
  | "Failed"
  | "Stopped"
  | "Ready"
  | (string & {});
export interface LastDeploymentInfo {
  deploymentId?: string;
  status?: DeploymentStatus;
  endTime?: Date;
  createTime?: Date;
}
export type EC2TagSetList = EC2TagFilter[][];
export interface EC2TagSet {
  ec2TagSetList?: EC2TagFilter[][];
}
export type OnPremisesTagSetList = TagFilter[][];
export interface OnPremisesTagSet {
  onPremisesTagSetList?: TagFilter[][];
}
export type ECSServiceName = string;
export type ECSClusterName = string;
export interface ECSService {
  serviceName?: string;
  clusterName?: string;
}
export type ECSServiceList = ECSService[];
export interface DeploymentGroupInfo {
  applicationName?: string;
  deploymentGroupId?: string;
  deploymentGroupName?: string;
  deploymentConfigName?: string;
  ec2TagFilters?: EC2TagFilter[];
  onPremisesInstanceTagFilters?: TagFilter[];
  autoScalingGroups?: AutoScalingGroup[];
  serviceRoleArn?: string;
  targetRevision?: RevisionLocation;
  triggerConfigurations?: TriggerConfig[];
  alarmConfiguration?: AlarmConfiguration;
  autoRollbackConfiguration?: AutoRollbackConfiguration;
  deploymentStyle?: DeploymentStyle;
  outdatedInstancesStrategy?: OutdatedInstancesStrategy;
  blueGreenDeploymentConfiguration?: BlueGreenDeploymentConfiguration;
  loadBalancerInfo?: LoadBalancerInfo;
  lastSuccessfulDeployment?: LastDeploymentInfo;
  lastAttemptedDeployment?: LastDeploymentInfo;
  ec2TagSet?: EC2TagSet;
  onPremisesTagSet?: OnPremisesTagSet;
  computePlatform?: ComputePlatform;
  ecsServices?: ECSService[];
  terminationHookEnabled?: boolean;
}
export type DeploymentGroupInfoList = DeploymentGroupInfo[];
export interface BatchGetDeploymentGroupsOutput {
  deploymentGroupsInfo?: DeploymentGroupInfo[];
  errorMessage?: string;
}
export type InstanceId = string;
export type InstancesList = string[];
export interface BatchGetDeploymentInstancesInput {
  deploymentId: string;
  instanceIds: string[];
}
export type InstanceStatus =
  | "Pending"
  | "InProgress"
  | "Succeeded"
  | "Failed"
  | "Skipped"
  | "Unknown"
  | "Ready"
  | (string & {});
export type LifecycleEventName = string;
export type LifecycleErrorCode =
  | "Success"
  | "ScriptMissing"
  | "ScriptNotExecutable"
  | "ScriptTimedOut"
  | "ScriptFailed"
  | "UnknownError"
  | (string & {});
export type ScriptName = string;
export type LifecycleMessage = string;
export type LogTail = string;
export interface Diagnostics {
  errorCode?: LifecycleErrorCode;
  scriptName?: string;
  message?: string;
  logTail?: string;
}
export type LifecycleEventStatus =
  | "Pending"
  | "InProgress"
  | "Succeeded"
  | "Failed"
  | "Skipped"
  | "Unknown"
  | (string & {});
export interface LifecycleEvent {
  lifecycleEventName?: string;
  diagnostics?: Diagnostics;
  startTime?: Date;
  endTime?: Date;
  status?: LifecycleEventStatus;
}
export type LifecycleEventList = LifecycleEvent[];
export type InstanceType = "Blue" | "Green" | (string & {});
export interface InstanceSummary {
  deploymentId?: string;
  instanceId?: string;
  status?: InstanceStatus;
  lastUpdatedAt?: Date;
  lifecycleEvents?: LifecycleEvent[];
  instanceType?: InstanceType;
}
export type InstanceSummaryList = InstanceSummary[];
export interface BatchGetDeploymentInstancesOutput {
  instancesSummary?: InstanceSummary[];
  errorMessage?: string;
}
export type DeploymentsList = string[];
export interface BatchGetDeploymentsInput {
  deploymentIds: string[];
}
export type ErrorCode =
  | "AGENT_ISSUE"
  | "ALARM_ACTIVE"
  | "APPLICATION_MISSING"
  | "AUTOSCALING_VALIDATION_ERROR"
  | "AUTO_SCALING_CONFIGURATION"
  | "AUTO_SCALING_IAM_ROLE_PERMISSIONS"
  | "CODEDEPLOY_RESOURCE_CANNOT_BE_FOUND"
  | "CUSTOMER_APPLICATION_UNHEALTHY"
  | "DEPLOYMENT_GROUP_MISSING"
  | "ECS_UPDATE_ERROR"
  | "ELASTIC_LOAD_BALANCING_INVALID"
  | "ELB_INVALID_INSTANCE"
  | "HEALTH_CONSTRAINTS"
  | "HEALTH_CONSTRAINTS_INVALID"
  | "HOOK_EXECUTION_FAILURE"
  | "IAM_ROLE_MISSING"
  | "IAM_ROLE_PERMISSIONS"
  | "INTERNAL_ERROR"
  | "INVALID_ECS_SERVICE"
  | "INVALID_LAMBDA_CONFIGURATION"
  | "INVALID_LAMBDA_FUNCTION"
  | "INVALID_REVISION"
  | "MANUAL_STOP"
  | "MISSING_BLUE_GREEN_DEPLOYMENT_CONFIGURATION"
  | "MISSING_ELB_INFORMATION"
  | "MISSING_GITHUB_TOKEN"
  | "NO_EC2_SUBSCRIPTION"
  | "NO_INSTANCES"
  | "OVER_MAX_INSTANCES"
  | "RESOURCE_LIMIT_EXCEEDED"
  | "REVISION_MISSING"
  | "THROTTLED"
  | "TIMEOUT"
  | "CLOUDFORMATION_STACK_FAILURE"
  | (string & {});
export interface ErrorInformation {
  code?: ErrorCode;
  message?: string;
}
export type InstanceCount = number;
export interface DeploymentOverview {
  Pending?: number;
  InProgress?: number;
  Succeeded?: number;
  Failed?: number;
  Skipped?: number;
  Ready?: number;
}
export type DeploymentCreator =
  | "user"
  | "autoscaling"
  | "codeDeployRollback"
  | "CodeDeploy"
  | "CodeDeployAutoUpdate"
  | "CloudFormation"
  | "CloudFormationRollback"
  | "autoscalingTermination"
  | (string & {});
export interface RollbackInfo {
  rollbackDeploymentId?: string;
  rollbackTriggeringDeploymentId?: string;
  rollbackMessage?: string;
}
export type AutoScalingGroupNameList = string[];
export interface TargetInstances {
  tagFilters?: EC2TagFilter[];
  autoScalingGroups?: string[];
  ec2TagSet?: EC2TagSet;
}
export type AdditionalDeploymentStatusInfo = string;
export type FileExistsBehavior =
  | "DISALLOW"
  | "OVERWRITE"
  | "RETAIN"
  | (string & {});
export type DeploymentStatusMessageList = string[];
export type ExternalId = string;
export interface RelatedDeployments {
  autoUpdateOutdatedInstancesRootDeploymentId?: string;
  autoUpdateOutdatedInstancesDeploymentIds?: string[];
}
export interface DeploymentInfo {
  applicationName?: string;
  deploymentGroupName?: string;
  deploymentConfigName?: string;
  deploymentId?: string;
  previousRevision?: RevisionLocation;
  revision?: RevisionLocation;
  status?: DeploymentStatus;
  errorInformation?: ErrorInformation;
  createTime?: Date;
  startTime?: Date;
  completeTime?: Date;
  deploymentOverview?: DeploymentOverview;
  description?: string;
  creator?: DeploymentCreator;
  ignoreApplicationStopFailures?: boolean;
  autoRollbackConfiguration?: AutoRollbackConfiguration;
  updateOutdatedInstancesOnly?: boolean;
  rollbackInfo?: RollbackInfo;
  deploymentStyle?: DeploymentStyle;
  targetInstances?: TargetInstances;
  instanceTerminationWaitTimeStarted?: boolean;
  blueGreenDeploymentConfiguration?: BlueGreenDeploymentConfiguration;
  loadBalancerInfo?: LoadBalancerInfo;
  additionalDeploymentStatusInfo?: string;
  fileExistsBehavior?: FileExistsBehavior;
  deploymentStatusMessages?: string[];
  computePlatform?: ComputePlatform;
  externalId?: string;
  relatedDeployments?: RelatedDeployments;
  overrideAlarmConfiguration?: AlarmConfiguration;
}
export type DeploymentsInfoList = DeploymentInfo[];
export interface BatchGetDeploymentsOutput {
  deploymentsInfo?: DeploymentInfo[];
}
export type TargetId = string;
export type TargetIdList = string[];
export interface BatchGetDeploymentTargetsInput {
  deploymentId: string;
  targetIds: string[];
}
export type DeploymentTargetType =
  | "InstanceTarget"
  | "LambdaTarget"
  | "ECSTarget"
  | "CloudFormationTarget"
  | (string & {});
export type TargetArn = string;
export type TargetStatus =
  | "Pending"
  | "InProgress"
  | "Succeeded"
  | "Failed"
  | "Skipped"
  | "Unknown"
  | "Ready"
  | (string & {});
export type TargetLabel = "Blue" | "Green" | (string & {});
export interface InstanceTarget {
  deploymentId?: string;
  targetId?: string;
  targetArn?: string;
  status?: TargetStatus;
  lastUpdatedAt?: Date;
  lifecycleEvents?: LifecycleEvent[];
  instanceLabel?: TargetLabel;
}
export type LambdaFunctionName = string;
export type LambdaFunctionAlias = string;
export type Version = string;
export type TrafficWeight = number;
export interface LambdaFunctionInfo {
  functionName?: string;
  functionAlias?: string;
  currentVersion?: string;
  targetVersion?: string;
  targetVersionWeight?: number;
}
export interface LambdaTarget {
  deploymentId?: string;
  targetId?: string;
  targetArn?: string;
  status?: TargetStatus;
  lastUpdatedAt?: Date;
  lifecycleEvents?: LifecycleEvent[];
  lambdaFunctionInfo?: LambdaFunctionInfo;
}
export type ECSTaskSetIdentifier = string;
export type ECSTaskSetCount = number;
export type ECSTaskSetStatus = string;
export interface ECSTaskSet {
  identifer?: string;
  desiredCount?: number;
  pendingCount?: number;
  runningCount?: number;
  status?: string;
  trafficWeight?: number;
  targetGroup?: TargetGroupInfo;
  taskSetLabel?: TargetLabel;
}
export type ECSTaskSetList = ECSTaskSet[];
export interface ECSTarget {
  deploymentId?: string;
  targetId?: string;
  targetArn?: string;
  lastUpdatedAt?: Date;
  lifecycleEvents?: LifecycleEvent[];
  status?: TargetStatus;
  taskSetsInfo?: ECSTaskSet[];
}
export type CloudFormationResourceType = string;
export interface CloudFormationTarget {
  deploymentId?: string;
  targetId?: string;
  lastUpdatedAt?: Date;
  lifecycleEvents?: LifecycleEvent[];
  status?: TargetStatus;
  resourceType?: string;
  targetVersionWeight?: number;
}
export interface DeploymentTarget {
  deploymentTargetType?: DeploymentTargetType;
  instanceTarget?: InstanceTarget;
  lambdaTarget?: LambdaTarget;
  ecsTarget?: ECSTarget;
  cloudFormationTarget?: CloudFormationTarget;
}
export type DeploymentTargetList = DeploymentTarget[];
export interface BatchGetDeploymentTargetsOutput {
  deploymentTargets?: DeploymentTarget[];
}
export interface BatchGetOnPremisesInstancesInput {
  instanceNames: string[];
}
export type IamSessionArn = string;
export type IamUserArn = string;
export type InstanceArn = string;
export interface InstanceInfo {
  instanceName?: string;
  iamSessionArn?: string;
  iamUserArn?: string;
  instanceArn?: string;
  registerTime?: Date;
  deregisterTime?: Date;
  tags?: Tag[];
}
export type InstanceInfoList = InstanceInfo[];
export interface BatchGetOnPremisesInstancesOutput {
  instanceInfos?: InstanceInfo[];
}
export type DeploymentWaitType =
  | "READY_WAIT"
  | "TERMINATION_WAIT"
  | (string & {});
export interface ContinueDeploymentInput {
  deploymentId?: string;
  deploymentWaitType?: DeploymentWaitType;
}
export interface ContinueDeploymentResponse {}
export interface CreateApplicationInput {
  applicationName: string;
  computePlatform?: ComputePlatform;
  tags?: Tag[];
}
export interface CreateApplicationOutput {
  applicationId?: string;
}
export type DeploymentMode = "STANDARD" | "RESTART" | (string & {});
export interface CreateDeploymentInput {
  applicationName: string;
  deploymentGroupName?: string;
  revision?: RevisionLocation;
  deploymentConfigName?: string;
  description?: string;
  ignoreApplicationStopFailures?: boolean;
  targetInstances?: TargetInstances;
  autoRollbackConfiguration?: AutoRollbackConfiguration;
  updateOutdatedInstancesOnly?: boolean;
  fileExistsBehavior?: FileExistsBehavior;
  deploymentMode?: DeploymentMode;
  overrideAlarmConfiguration?: AlarmConfiguration;
}
export interface CreateDeploymentOutput {
  deploymentId?: string;
}
export type MinimumHealthyHostsType =
  | "HOST_COUNT"
  | "FLEET_PERCENT"
  | (string & {});
export type MinimumHealthyHostsValue = number;
export interface MinimumHealthyHosts {
  type?: MinimumHealthyHostsType;
  value?: number;
}
export type TrafficRoutingType =
  | "TimeBasedCanary"
  | "TimeBasedLinear"
  | "AllAtOnce"
  | (string & {});
export type Percentage = number;
export type WaitTimeInMins = number;
export interface TimeBasedCanary {
  canaryPercentage?: number;
  canaryInterval?: number;
}
export interface TimeBasedLinear {
  linearPercentage?: number;
  linearInterval?: number;
}
export interface TrafficRoutingConfig {
  type?: TrafficRoutingType;
  timeBasedCanary?: TimeBasedCanary;
  timeBasedLinear?: TimeBasedLinear;
}
export type WaitTimeInSeconds = number;
export type MinimumHealthyHostsPerZoneType =
  | "HOST_COUNT"
  | "FLEET_PERCENT"
  | (string & {});
export type MinimumHealthyHostsPerZoneValue = number;
export interface MinimumHealthyHostsPerZone {
  type?: MinimumHealthyHostsPerZoneType;
  value?: number;
}
export interface ZonalConfig {
  firstZoneMonitorDurationInSeconds?: number;
  monitorDurationInSeconds?: number;
  minimumHealthyHostsPerZone?: MinimumHealthyHostsPerZone;
}
export interface CreateDeploymentConfigInput {
  deploymentConfigName: string;
  minimumHealthyHosts?: MinimumHealthyHosts;
  trafficRoutingConfig?: TrafficRoutingConfig;
  computePlatform?: ComputePlatform;
  zonalConfig?: ZonalConfig;
}
export type DeploymentConfigId = string;
export interface CreateDeploymentConfigOutput {
  deploymentConfigId?: string;
}
export interface CreateDeploymentGroupInput {
  applicationName: string;
  deploymentGroupName: string;
  deploymentConfigName?: string;
  ec2TagFilters?: EC2TagFilter[];
  onPremisesInstanceTagFilters?: TagFilter[];
  autoScalingGroups?: string[];
  serviceRoleArn: string;
  triggerConfigurations?: TriggerConfig[];
  alarmConfiguration?: AlarmConfiguration;
  autoRollbackConfiguration?: AutoRollbackConfiguration;
  outdatedInstancesStrategy?: OutdatedInstancesStrategy;
  deploymentStyle?: DeploymentStyle;
  blueGreenDeploymentConfiguration?: BlueGreenDeploymentConfiguration;
  loadBalancerInfo?: LoadBalancerInfo;
  ec2TagSet?: EC2TagSet;
  ecsServices?: ECSService[];
  onPremisesTagSet?: OnPremisesTagSet;
  tags?: Tag[];
  terminationHookEnabled?: boolean;
}
export interface CreateDeploymentGroupOutput {
  deploymentGroupId?: string;
}
export interface DeleteApplicationInput {
  applicationName: string;
}
export interface DeleteApplicationResponse {}
export interface DeleteDeploymentConfigInput {
  deploymentConfigName: string;
}
export interface DeleteDeploymentConfigResponse {}
export interface DeleteDeploymentGroupInput {
  applicationName: string;
  deploymentGroupName: string;
}
export interface DeleteDeploymentGroupOutput {
  hooksNotCleanedUp?: AutoScalingGroup[];
}
export interface DeleteGitHubAccountTokenInput {
  tokenName?: string;
}
export interface DeleteGitHubAccountTokenOutput {
  tokenName?: string;
}
export interface DeleteResourcesByExternalIdInput {
  externalId?: string;
}
export interface DeleteResourcesByExternalIdOutput {}
export interface DeregisterOnPremisesInstanceInput {
  instanceName: string;
}
export interface DeregisterOnPremisesInstanceResponse {}
export interface GetApplicationInput {
  applicationName: string;
}
export interface GetApplicationOutput {
  application?: ApplicationInfo;
}
export interface GetApplicationRevisionInput {
  applicationName: string;
  revision: RevisionLocation;
}
export interface GetApplicationRevisionOutput {
  applicationName?: string;
  revision?: RevisionLocation;
  revisionInfo?: GenericRevisionInfo;
}
export interface GetDeploymentInput {
  deploymentId: string;
}
export interface GetDeploymentOutput {
  deploymentInfo?: DeploymentInfo;
}
export interface GetDeploymentConfigInput {
  deploymentConfigName: string;
}
export interface DeploymentConfigInfo {
  deploymentConfigId?: string;
  deploymentConfigName?: string;
  minimumHealthyHosts?: MinimumHealthyHosts;
  createTime?: Date;
  computePlatform?: ComputePlatform;
  trafficRoutingConfig?: TrafficRoutingConfig;
  zonalConfig?: ZonalConfig;
}
export interface GetDeploymentConfigOutput {
  deploymentConfigInfo?: DeploymentConfigInfo;
}
export interface GetDeploymentGroupInput {
  applicationName: string;
  deploymentGroupName: string;
}
export interface GetDeploymentGroupOutput {
  deploymentGroupInfo?: DeploymentGroupInfo;
}
export interface GetDeploymentInstanceInput {
  deploymentId: string;
  instanceId: string;
}
export interface GetDeploymentInstanceOutput {
  instanceSummary?: InstanceSummary;
}
export interface GetDeploymentTargetInput {
  deploymentId: string;
  targetId: string;
}
export interface GetDeploymentTargetOutput {
  deploymentTarget?: DeploymentTarget;
}
export interface GetOnPremisesInstanceInput {
  instanceName: string;
}
export interface GetOnPremisesInstanceOutput {
  instanceInfo?: InstanceInfo;
}
export type ApplicationRevisionSortBy =
  | "registerTime"
  | "firstUsedTime"
  | "lastUsedTime"
  | (string & {});
export type SortOrder = "ascending" | "descending" | (string & {});
export type ListStateFilterAction =
  | "include"
  | "exclude"
  | "ignore"
  | (string & {});
export type NextToken = string;
export interface ListApplicationRevisionsInput {
  applicationName: string;
  sortBy?: ApplicationRevisionSortBy;
  sortOrder?: SortOrder;
  s3Bucket?: string;
  s3KeyPrefix?: string;
  deployed?: ListStateFilterAction;
  nextToken?: string;
}
export interface ListApplicationRevisionsOutput {
  revisions?: RevisionLocation[];
  nextToken?: string;
}
export interface ListApplicationsInput {
  nextToken?: string;
}
export interface ListApplicationsOutput {
  applications?: string[];
  nextToken?: string;
}
export interface ListDeploymentConfigsInput {
  nextToken?: string;
}
export type DeploymentConfigsList = string[];
export interface ListDeploymentConfigsOutput {
  deploymentConfigsList?: string[];
  nextToken?: string;
}
export interface ListDeploymentGroupsInput {
  applicationName: string;
  nextToken?: string;
}
export interface ListDeploymentGroupsOutput {
  applicationName?: string;
  deploymentGroups?: string[];
  nextToken?: string;
}
export type InstanceStatusList = InstanceStatus[];
export type InstanceTypeList = InstanceType[];
export interface ListDeploymentInstancesInput {
  deploymentId: string;
  nextToken?: string;
  instanceStatusFilter?: InstanceStatus[];
  instanceTypeFilter?: InstanceType[];
}
export interface ListDeploymentInstancesOutput {
  instancesList?: string[];
  nextToken?: string;
}
export type DeploymentStatusList = DeploymentStatus[];
export interface TimeRange {
  start?: Date;
  end?: Date;
}
export interface ListDeploymentsInput {
  applicationName?: string;
  deploymentGroupName?: string;
  externalId?: string;
  includeOnlyStatuses?: DeploymentStatus[];
  createTimeRange?: TimeRange;
  nextToken?: string;
}
export interface ListDeploymentsOutput {
  deployments?: string[];
  nextToken?: string;
}
export type TargetFilterName =
  | "TargetStatus"
  | "ServerInstanceLabel"
  | (string & {});
export type FilterValue = string;
export type FilterValueList = string[];
export type TargetFilters = { [key in TargetFilterName]?: string[] };
export interface ListDeploymentTargetsInput {
  deploymentId: string;
  nextToken?: string;
  targetFilters?: { [key: string]: string[] | undefined };
}
export interface ListDeploymentTargetsOutput {
  targetIds?: string[];
  nextToken?: string;
}
export interface ListGitHubAccountTokenNamesInput {
  nextToken?: string;
}
export type GitHubAccountTokenNameList = string[];
export interface ListGitHubAccountTokenNamesOutput {
  tokenNameList?: string[];
  nextToken?: string;
}
export type RegistrationStatus = "Registered" | "Deregistered" | (string & {});
export interface ListOnPremisesInstancesInput {
  registrationStatus?: RegistrationStatus;
  tagFilters?: TagFilter[];
  nextToken?: string;
}
export interface ListOnPremisesInstancesOutput {
  instanceNames?: string[];
  nextToken?: string;
}
export type Arn = string;
export interface ListTagsForResourceInput {
  ResourceArn: string;
  NextToken?: string;
}
export interface ListTagsForResourceOutput {
  Tags?: Tag[];
  NextToken?: string;
}
export type LifecycleEventHookExecutionId = string;
export interface PutLifecycleEventHookExecutionStatusInput {
  deploymentId?: string;
  lifecycleEventHookExecutionId?: string;
  status?: LifecycleEventStatus;
}
export interface PutLifecycleEventHookExecutionStatusOutput {
  lifecycleEventHookExecutionId?: string;
}
export interface RegisterApplicationRevisionInput {
  applicationName: string;
  description?: string;
  revision: RevisionLocation;
}
export interface RegisterApplicationRevisionResponse {}
export interface RegisterOnPremisesInstanceInput {
  instanceName: string;
  iamSessionArn?: string;
  iamUserArn?: string;
}
export interface RegisterOnPremisesInstanceResponse {}
export interface RemoveTagsFromOnPremisesInstancesInput {
  tags: Tag[];
  instanceNames: string[];
}
export interface RemoveTagsFromOnPremisesInstancesResponse {}
export interface SkipWaitTimeForInstanceTerminationInput {
  deploymentId?: string;
}
export interface SkipWaitTimeForInstanceTerminationResponse {}
export interface StopDeploymentInput {
  deploymentId: string;
  autoRollbackEnabled?: boolean;
}
export type StopStatus = "Pending" | "Succeeded" | (string & {});
export type Message = string;
export interface StopDeploymentOutput {
  status?: StopStatus;
  statusMessage?: string;
}
export interface TagResourceInput {
  ResourceArn: string;
  Tags: Tag[];
}
export interface TagResourceOutput {}
export type TagKeyList = string[];
export interface UntagResourceInput {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceOutput {}
export interface UpdateApplicationInput {
  applicationName?: string;
  newApplicationName?: string;
}
export interface UpdateApplicationResponse {}
export interface UpdateDeploymentGroupInput {
  applicationName: string;
  currentDeploymentGroupName: string;
  newDeploymentGroupName?: string;
  deploymentConfigName?: string;
  ec2TagFilters?: EC2TagFilter[];
  onPremisesInstanceTagFilters?: TagFilter[];
  autoScalingGroups?: string[];
  serviceRoleArn?: string;
  triggerConfigurations?: TriggerConfig[];
  alarmConfiguration?: AlarmConfiguration;
  autoRollbackConfiguration?: AutoRollbackConfiguration;
  outdatedInstancesStrategy?: OutdatedInstancesStrategy;
  deploymentStyle?: DeploymentStyle;
  blueGreenDeploymentConfiguration?: BlueGreenDeploymentConfiguration;
  loadBalancerInfo?: LoadBalancerInfo;
  ec2TagSet?: EC2TagSet;
  ecsServices?: ECSService[];
  onPremisesTagSet?: OnPremisesTagSet;
  terminationHookEnabled?: boolean;
}
export interface UpdateDeploymentGroupOutput {
  hooksNotCleanedUp?: AutoScalingGroup[];
}
export type AddTagsToOnPremisesInstancesError =
  | InstanceLimitExceededException
  | InstanceNameRequiredException
  | InstanceNotRegisteredException
  | InvalidInstanceNameException
  | InvalidTagException
  | TagLimitExceededException
  | TagRequiredException
  | CommonErrors;
/**
 * Adds tags to on-premises instances.
 */
export const addTagsToOnPremisesInstances: API.OperationMethod<
  AddTagsToOnPremisesInstancesInput,
  AddTagsToOnPremisesInstancesResponse,
  AddTagsToOnPremisesInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { tags: D.list(i_Tag), instanceNames: 0 },
  },
  errors: [
    InstanceLimitExceededException,
    InstanceNameRequiredException,
    InstanceNotRegisteredException,
    InvalidInstanceNameException,
    InvalidTagException,
    TagLimitExceededException,
    TagRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddTagsToOnPremisesInstances",
})) as any;

export type BatchGetApplicationRevisionsError =
  | ApplicationDoesNotExistException
  | ApplicationNameRequiredException
  | BatchLimitExceededException
  | InvalidApplicationNameException
  | InvalidRevisionException
  | RevisionRequiredException
  | CommonErrors;
/**
 * Gets information about one or more application revisions. The maximum number of
 * application revisions that can be returned is 25.
 */
export const batchGetApplicationRevisions: API.OperationMethod<
  BatchGetApplicationRevisionsInput,
  BatchGetApplicationRevisionsOutput,
  BatchGetApplicationRevisionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { applicationName: 0, revisions: D.list(i_RevisionLocation) },
    output: {
      revisions: D.list({ genericRevisionInfo: o_GenericRevisionInfo }),
    },
  },
  errors: [
    ApplicationDoesNotExistException,
    ApplicationNameRequiredException,
    BatchLimitExceededException,
    InvalidApplicationNameException,
    InvalidRevisionException,
    RevisionRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetApplicationRevisions",
})) as any;

export type BatchGetApplicationsError =
  | ApplicationDoesNotExistException
  | ApplicationNameRequiredException
  | BatchLimitExceededException
  | InvalidApplicationNameException
  | CommonErrors;
/**
 * Gets information about one or more applications. The maximum number of applications
 * that can be returned is 100.
 */
export const batchGetApplications: API.OperationMethod<
  BatchGetApplicationsInput,
  BatchGetApplicationsOutput,
  BatchGetApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { applicationNames: 0 },
    output: { applicationsInfo: D.list(o_ApplicationInfo) },
  },
  errors: [
    ApplicationDoesNotExistException,
    ApplicationNameRequiredException,
    BatchLimitExceededException,
    InvalidApplicationNameException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetApplications",
})) as any;

export type BatchGetDeploymentGroupsError =
  | ApplicationDoesNotExistException
  | ApplicationNameRequiredException
  | BatchLimitExceededException
  | DeploymentConfigDoesNotExistException
  | DeploymentGroupNameRequiredException
  | InvalidApplicationNameException
  | InvalidDeploymentGroupNameException
  | CommonErrors;
/**
 * Gets information about one or more deployment groups.
 */
export const batchGetDeploymentGroups: API.OperationMethod<
  BatchGetDeploymentGroupsInput,
  BatchGetDeploymentGroupsOutput,
  BatchGetDeploymentGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { applicationName: 0, deploymentGroupNames: 0 },
    output: { deploymentGroupsInfo: D.list(o_DeploymentGroupInfo) },
  },
  errors: [
    ApplicationDoesNotExistException,
    ApplicationNameRequiredException,
    BatchLimitExceededException,
    DeploymentConfigDoesNotExistException,
    DeploymentGroupNameRequiredException,
    InvalidApplicationNameException,
    InvalidDeploymentGroupNameException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetDeploymentGroups",
})) as any;

export type BatchGetDeploymentInstancesError =
  | BatchLimitExceededException
  | DeploymentDoesNotExistException
  | DeploymentIdRequiredException
  | InstanceIdRequiredException
  | InvalidComputePlatformException
  | InvalidDeploymentIdException
  | InvalidInstanceNameException
  | CommonErrors;
/**
 * This method works, but is deprecated. Use `BatchGetDeploymentTargets`
 * instead.
 *
 * Returns an array of one or more instances associated with a deployment. This method
 * works with EC2/On-premises and Lambda compute platforms. The newer
 * `BatchGetDeploymentTargets` works with all compute platforms. The maximum
 * number of instances that can be returned is 25.
 */
export const batchGetDeploymentInstances: API.OperationMethod<
  BatchGetDeploymentInstancesInput,
  BatchGetDeploymentInstancesOutput,
  BatchGetDeploymentInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { deploymentId: 0, instanceIds: 0 },
    output: { instancesSummary: D.list(o_InstanceSummary) },
  },
  errors: [
    BatchLimitExceededException,
    DeploymentDoesNotExistException,
    DeploymentIdRequiredException,
    InstanceIdRequiredException,
    InvalidComputePlatformException,
    InvalidDeploymentIdException,
    InvalidInstanceNameException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetDeploymentInstances",
})) as any;

export type BatchGetDeploymentsError =
  | BatchLimitExceededException
  | DeploymentIdRequiredException
  | InvalidDeploymentIdException
  | CommonErrors;
/**
 * Gets information about one or more deployments. The maximum number of deployments that
 * can be returned is 25.
 */
export const batchGetDeployments: API.OperationMethod<
  BatchGetDeploymentsInput,
  BatchGetDeploymentsOutput,
  BatchGetDeploymentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { deploymentIds: 0 },
    output: { deploymentsInfo: D.list(o_DeploymentInfo) },
  },
  errors: [
    BatchLimitExceededException,
    DeploymentIdRequiredException,
    InvalidDeploymentIdException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetDeployments",
})) as any;

export type BatchGetDeploymentTargetsError =
  | DeploymentDoesNotExistException
  | DeploymentIdRequiredException
  | DeploymentNotStartedException
  | DeploymentTargetDoesNotExistException
  | DeploymentTargetIdRequiredException
  | DeploymentTargetListSizeExceededException
  | InstanceDoesNotExistException
  | InvalidDeploymentIdException
  | InvalidDeploymentTargetIdException
  | CommonErrors;
/**
 * Returns an array of one or more targets associated with a deployment. This method
 * works with all compute types and should be used instead of the deprecated
 * `BatchGetDeploymentInstances`. The maximum number of targets that can be
 * returned is 25.
 *
 * The type of targets returned depends on the deployment's compute platform or
 * deployment method:
 *
 * - **EC2/On-premises**: Information about Amazon EC2 instance targets.
 *
 * - **Lambda**: Information about
 * Lambda functions targets.
 *
 * - **Amazon ECS**: Information about Amazon ECS service targets.
 *
 * - **CloudFormation**: Information about
 * targets of blue/green deployments initiated by a CloudFormation stack
 * update.
 */
export const batchGetDeploymentTargets: API.OperationMethod<
  BatchGetDeploymentTargetsInput,
  BatchGetDeploymentTargetsOutput,
  BatchGetDeploymentTargetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { deploymentId: 0, targetIds: 0 },
    output: { deploymentTargets: D.list(o_DeploymentTarget) },
  },
  errors: [
    DeploymentDoesNotExistException,
    DeploymentIdRequiredException,
    DeploymentNotStartedException,
    DeploymentTargetDoesNotExistException,
    DeploymentTargetIdRequiredException,
    DeploymentTargetListSizeExceededException,
    InstanceDoesNotExistException,
    InvalidDeploymentIdException,
    InvalidDeploymentTargetIdException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetDeploymentTargets",
})) as any;

export type BatchGetOnPremisesInstancesError =
  | BatchLimitExceededException
  | InstanceNameRequiredException
  | InvalidInstanceNameException
  | CommonErrors;
/**
 * Gets information about one or more on-premises instances. The maximum number of
 * on-premises instances that can be returned is 25.
 */
export const batchGetOnPremisesInstances: API.OperationMethod<
  BatchGetOnPremisesInstancesInput,
  BatchGetOnPremisesInstancesOutput,
  BatchGetOnPremisesInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { instanceNames: 0 },
    output: { instanceInfos: D.list(o_InstanceInfo) },
  },
  errors: [
    BatchLimitExceededException,
    InstanceNameRequiredException,
    InvalidInstanceNameException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetOnPremisesInstances",
})) as any;

export type ContinueDeploymentError =
  | DeploymentAlreadyCompletedException
  | DeploymentDoesNotExistException
  | DeploymentIdRequiredException
  | DeploymentIsNotInReadyStateException
  | InvalidDeploymentIdException
  | InvalidDeploymentStatusException
  | InvalidDeploymentWaitTypeException
  | UnsupportedActionForDeploymentTypeException
  | CommonErrors;
/**
 * For a blue/green deployment, starts the process of rerouting traffic from instances in
 * the original environment to instances in the replacement environment without waiting for
 * a specified wait time to elapse. (Traffic rerouting, which is achieved by registering
 * instances in the replacement environment with the load balancer, can start as soon as
 * all instances have a status of Ready.)
 */
export const continueDeployment: API.OperationMethod<
  ContinueDeploymentInput,
  ContinueDeploymentResponse,
  ContinueDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { deploymentId: 0, deploymentWaitType: 0 },
  },
  errors: [
    DeploymentAlreadyCompletedException,
    DeploymentDoesNotExistException,
    DeploymentIdRequiredException,
    DeploymentIsNotInReadyStateException,
    InvalidDeploymentIdException,
    InvalidDeploymentStatusException,
    InvalidDeploymentWaitTypeException,
    UnsupportedActionForDeploymentTypeException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ContinueDeployment",
})) as any;

export type CreateApplicationError =
  | ApplicationAlreadyExistsException
  | ApplicationLimitExceededException
  | ApplicationNameRequiredException
  | InvalidApplicationNameException
  | InvalidComputePlatformException
  | InvalidTagsToAddException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates an application.
 */
export const createApplication: API.OperationMethod<
  CreateApplicationInput,
  CreateApplicationOutput,
  CreateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { applicationName: 0, computePlatform: 0, tags: D.list(i_Tag) },
  },
  errors: [
    ApplicationAlreadyExistsException,
    ApplicationLimitExceededException,
    ApplicationNameRequiredException,
    InvalidApplicationNameException,
    InvalidComputePlatformException,
    InvalidTagsToAddException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApplication",
})) as any;

export type CreateDeploymentError =
  | AlarmsLimitExceededException
  | ApplicationDoesNotExistException
  | ApplicationNameRequiredException
  | DeploymentConfigDoesNotExistException
  | DeploymentGroupDoesNotExistException
  | DeploymentGroupNameRequiredException
  | DeploymentLimitExceededException
  | DescriptionTooLongException
  | InvalidAlarmConfigException
  | InvalidApplicationNameException
  | InvalidAutoRollbackConfigException
  | InvalidAutoScalingGroupException
  | InvalidComputePlatformException
  | InvalidDeploymentConfigNameException
  | InvalidDeploymentGroupNameException
  | InvalidECSServiceException
  | InvalidFileExistsBehaviorException
  | InvalidGitHubAccountTokenException
  | InvalidIgnoreApplicationStopFailuresValueException
  | InvalidInputException
  | InvalidLoadBalancerInfoException
  | InvalidRevisionException
  | InvalidRoleException
  | InvalidTargetInstancesException
  | InvalidTrafficRoutingConfigurationException
  | InvalidUpdateOutdatedInstancesOnlyValueException
  | RevisionDoesNotExistException
  | RevisionRequiredException
  | ThrottlingException
  | CommonErrors;
/**
 * Deploys an application revision through the specified deployment group.
 */
export const createDeployment: API.OperationMethod<
  CreateDeploymentInput,
  CreateDeploymentOutput,
  CreateDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      applicationName: 0,
      deploymentGroupName: 0,
      revision: i_RevisionLocation,
      deploymentConfigName: 0,
      description: 0,
      ignoreApplicationStopFailures: 0,
      targetInstances: {
        tagFilters: D.list(i_EC2TagFilter),
        autoScalingGroups: 0,
        ec2TagSet: i_EC2TagSet,
      },
      autoRollbackConfiguration: i_AutoRollbackConfiguration,
      updateOutdatedInstancesOnly: 0,
      fileExistsBehavior: 0,
      deploymentMode: 0,
      overrideAlarmConfiguration: i_AlarmConfiguration,
    },
  },
  errors: [
    AlarmsLimitExceededException,
    ApplicationDoesNotExistException,
    ApplicationNameRequiredException,
    DeploymentConfigDoesNotExistException,
    DeploymentGroupDoesNotExistException,
    DeploymentGroupNameRequiredException,
    DeploymentLimitExceededException,
    DescriptionTooLongException,
    InvalidAlarmConfigException,
    InvalidApplicationNameException,
    InvalidAutoRollbackConfigException,
    InvalidAutoScalingGroupException,
    InvalidComputePlatformException,
    InvalidDeploymentConfigNameException,
    InvalidDeploymentGroupNameException,
    InvalidECSServiceException,
    InvalidFileExistsBehaviorException,
    InvalidGitHubAccountTokenException,
    InvalidIgnoreApplicationStopFailuresValueException,
    InvalidInputException,
    InvalidLoadBalancerInfoException,
    InvalidRevisionException,
    InvalidRoleException,
    InvalidTargetInstancesException,
    InvalidTrafficRoutingConfigurationException,
    InvalidUpdateOutdatedInstancesOnlyValueException,
    RevisionDoesNotExistException,
    RevisionRequiredException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDeployment",
})) as any;

export type CreateDeploymentConfigError =
  | DeploymentConfigAlreadyExistsException
  | DeploymentConfigLimitExceededException
  | DeploymentConfigNameRequiredException
  | InvalidComputePlatformException
  | InvalidDeploymentConfigNameException
  | InvalidMinimumHealthyHostValueException
  | InvalidTrafficRoutingConfigurationException
  | InvalidZonalDeploymentConfigurationException
  | CommonErrors;
/**
 * Creates a deployment configuration.
 */
export const createDeploymentConfig: API.OperationMethod<
  CreateDeploymentConfigInput,
  CreateDeploymentConfigOutput,
  CreateDeploymentConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      deploymentConfigName: 0,
      minimumHealthyHosts: { type: 0, value: 0 },
      trafficRoutingConfig: {
        type: 0,
        timeBasedCanary: { canaryPercentage: 0, canaryInterval: 0 },
        timeBasedLinear: { linearPercentage: 0, linearInterval: 0 },
      },
      computePlatform: 0,
      zonalConfig: {
        firstZoneMonitorDurationInSeconds: 0,
        monitorDurationInSeconds: 0,
        minimumHealthyHostsPerZone: { type: 0, value: 0 },
      },
    },
  },
  errors: [
    DeploymentConfigAlreadyExistsException,
    DeploymentConfigLimitExceededException,
    DeploymentConfigNameRequiredException,
    InvalidComputePlatformException,
    InvalidDeploymentConfigNameException,
    InvalidMinimumHealthyHostValueException,
    InvalidTrafficRoutingConfigurationException,
    InvalidZonalDeploymentConfigurationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDeploymentConfig",
})) as any;

export type CreateDeploymentGroupError =
  | AlarmsLimitExceededException
  | ApplicationDoesNotExistException
  | ApplicationNameRequiredException
  | DeploymentConfigDoesNotExistException
  | DeploymentGroupAlreadyExistsException
  | DeploymentGroupLimitExceededException
  | DeploymentGroupNameRequiredException
  | ECSServiceMappingLimitExceededException
  | InvalidAlarmConfigException
  | InvalidApplicationNameException
  | InvalidAutoRollbackConfigException
  | InvalidAutoScalingGroupException
  | InvalidBlueGreenDeploymentConfigurationException
  | InvalidDeploymentConfigNameException
  | InvalidDeploymentGroupNameException
  | InvalidDeploymentStyleException
  | InvalidEC2TagCombinationException
  | InvalidEC2TagException
  | InvalidECSServiceException
  | InvalidInputException
  | InvalidLoadBalancerInfoException
  | InvalidOnPremisesTagCombinationException
  | InvalidRoleException
  | InvalidTagException
  | InvalidTagsToAddException
  | InvalidTargetGroupPairException
  | InvalidTrafficRoutingConfigurationException
  | InvalidTriggerConfigException
  | LifecycleHookLimitExceededException
  | RoleRequiredException
  | TagSetListLimitExceededException
  | ThrottlingException
  | TriggerTargetsLimitExceededException
  | CommonErrors;
/**
 * Creates a deployment group to which application revisions are deployed.
 */
export const createDeploymentGroup: API.OperationMethod<
  CreateDeploymentGroupInput,
  CreateDeploymentGroupOutput,
  CreateDeploymentGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      applicationName: 0,
      deploymentGroupName: 0,
      deploymentConfigName: 0,
      ec2TagFilters: D.list(i_EC2TagFilter),
      onPremisesInstanceTagFilters: D.list(i_TagFilter),
      autoScalingGroups: 0,
      serviceRoleArn: 0,
      triggerConfigurations: D.list(i_TriggerConfig),
      alarmConfiguration: i_AlarmConfiguration,
      autoRollbackConfiguration: i_AutoRollbackConfiguration,
      outdatedInstancesStrategy: 0,
      deploymentStyle: i_DeploymentStyle,
      blueGreenDeploymentConfiguration: i_BlueGreenDeploymentConfiguration,
      loadBalancerInfo: i_LoadBalancerInfo,
      ec2TagSet: i_EC2TagSet,
      ecsServices: D.list(i_ECSService),
      onPremisesTagSet: i_OnPremisesTagSet,
      tags: D.list(i_Tag),
      terminationHookEnabled: 0,
    },
  },
  errors: [
    AlarmsLimitExceededException,
    ApplicationDoesNotExistException,
    ApplicationNameRequiredException,
    DeploymentConfigDoesNotExistException,
    DeploymentGroupAlreadyExistsException,
    DeploymentGroupLimitExceededException,
    DeploymentGroupNameRequiredException,
    ECSServiceMappingLimitExceededException,
    InvalidAlarmConfigException,
    InvalidApplicationNameException,
    InvalidAutoRollbackConfigException,
    InvalidAutoScalingGroupException,
    InvalidBlueGreenDeploymentConfigurationException,
    InvalidDeploymentConfigNameException,
    InvalidDeploymentGroupNameException,
    InvalidDeploymentStyleException,
    InvalidEC2TagCombinationException,
    InvalidEC2TagException,
    InvalidECSServiceException,
    InvalidInputException,
    InvalidLoadBalancerInfoException,
    InvalidOnPremisesTagCombinationException,
    InvalidRoleException,
    InvalidTagException,
    InvalidTagsToAddException,
    InvalidTargetGroupPairException,
    InvalidTrafficRoutingConfigurationException,
    InvalidTriggerConfigException,
    LifecycleHookLimitExceededException,
    RoleRequiredException,
    TagSetListLimitExceededException,
    ThrottlingException,
    TriggerTargetsLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDeploymentGroup",
})) as any;

export type DeleteApplicationError =
  | ApplicationNameRequiredException
  | InvalidApplicationNameException
  | InvalidRoleException
  | CommonErrors;
/**
 * Deletes an application.
 */
export const deleteApplication: API.OperationMethod<
  DeleteApplicationInput,
  DeleteApplicationResponse,
  DeleteApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { applicationName: 0 } },
  errors: [
    ApplicationNameRequiredException,
    InvalidApplicationNameException,
    InvalidRoleException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplication",
})) as any;

export type DeleteDeploymentConfigError =
  | DeploymentConfigInUseException
  | DeploymentConfigNameRequiredException
  | InvalidDeploymentConfigNameException
  | InvalidOperationException
  | CommonErrors;
/**
 * Deletes a deployment configuration.
 *
 * A deployment configuration cannot be deleted if it is currently in use. Predefined
 * configurations cannot be deleted.
 */
export const deleteDeploymentConfig: API.OperationMethod<
  DeleteDeploymentConfigInput,
  DeleteDeploymentConfigResponse,
  DeleteDeploymentConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { deploymentConfigName: 0 } },
  errors: [
    DeploymentConfigInUseException,
    DeploymentConfigNameRequiredException,
    InvalidDeploymentConfigNameException,
    InvalidOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDeploymentConfig",
})) as any;

export type DeleteDeploymentGroupError =
  | ApplicationNameRequiredException
  | DeploymentGroupNameRequiredException
  | InvalidApplicationNameException
  | InvalidDeploymentGroupNameException
  | InvalidRoleException
  | CommonErrors;
/**
 * Deletes a deployment group.
 */
export const deleteDeploymentGroup: API.OperationMethod<
  DeleteDeploymentGroupInput,
  DeleteDeploymentGroupOutput,
  DeleteDeploymentGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { applicationName: 0, deploymentGroupName: 0 },
  },
  errors: [
    ApplicationNameRequiredException,
    DeploymentGroupNameRequiredException,
    InvalidApplicationNameException,
    InvalidDeploymentGroupNameException,
    InvalidRoleException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDeploymentGroup",
})) as any;

export type DeleteGitHubAccountTokenError =
  | GitHubAccountTokenDoesNotExistException
  | GitHubAccountTokenNameRequiredException
  | InvalidGitHubAccountTokenNameException
  | OperationNotSupportedException
  | ResourceValidationException
  | CommonErrors;
/**
 * Deletes a GitHub account connection.
 */
export const deleteGitHubAccountToken: API.OperationMethod<
  DeleteGitHubAccountTokenInput,
  DeleteGitHubAccountTokenOutput,
  DeleteGitHubAccountTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { tokenName: 0 } },
  errors: [
    GitHubAccountTokenDoesNotExistException,
    GitHubAccountTokenNameRequiredException,
    InvalidGitHubAccountTokenNameException,
    OperationNotSupportedException,
    ResourceValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGitHubAccountToken",
})) as any;

export type DeleteResourcesByExternalIdError = CommonErrors;
/**
 * Deletes resources linked to an external ID. This action only applies if you have
 * configured blue/green deployments through CloudFormation.
 *
 * It is not necessary to call this action directly. CloudFormation calls it
 * on your behalf when it needs to delete stack resources. This action is offered
 * publicly in case you need to delete resources to comply with General Data Protection
 * Regulation (GDPR) requirements.
 */
export const deleteResourcesByExternalId: API.OperationMethod<
  DeleteResourcesByExternalIdInput,
  DeleteResourcesByExternalIdOutput,
  DeleteResourcesByExternalIdError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { externalId: 0 } },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcesByExternalId",
})) as any;

export type DeregisterOnPremisesInstanceError =
  | InstanceNameRequiredException
  | InvalidInstanceNameException
  | CommonErrors;
/**
 * Deregisters an on-premises instance.
 */
export const deregisterOnPremisesInstance: API.OperationMethod<
  DeregisterOnPremisesInstanceInput,
  DeregisterOnPremisesInstanceResponse,
  DeregisterOnPremisesInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { instanceName: 0 } },
  errors: [InstanceNameRequiredException, InvalidInstanceNameException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterOnPremisesInstance",
})) as any;

export type GetApplicationError =
  | ApplicationDoesNotExistException
  | ApplicationNameRequiredException
  | InvalidApplicationNameException
  | CommonErrors;
/**
 * Gets information about an application.
 */
export const getApplication: API.OperationMethod<
  GetApplicationInput,
  GetApplicationOutput,
  GetApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { applicationName: 0 },
    output: { application: o_ApplicationInfo },
  },
  errors: [
    ApplicationDoesNotExistException,
    ApplicationNameRequiredException,
    InvalidApplicationNameException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApplication",
})) as any;

export type GetApplicationRevisionError =
  | ApplicationDoesNotExistException
  | ApplicationNameRequiredException
  | InvalidApplicationNameException
  | InvalidRevisionException
  | RevisionDoesNotExistException
  | RevisionRequiredException
  | CommonErrors;
/**
 * Gets information about an application revision.
 */
export const getApplicationRevision: API.OperationMethod<
  GetApplicationRevisionInput,
  GetApplicationRevisionOutput,
  GetApplicationRevisionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { applicationName: 0, revision: i_RevisionLocation },
    output: { revisionInfo: o_GenericRevisionInfo },
  },
  errors: [
    ApplicationDoesNotExistException,
    ApplicationNameRequiredException,
    InvalidApplicationNameException,
    InvalidRevisionException,
    RevisionDoesNotExistException,
    RevisionRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApplicationRevision",
})) as any;

export type GetDeploymentError =
  | DeploymentDoesNotExistException
  | DeploymentIdRequiredException
  | InvalidDeploymentIdException
  | CommonErrors;
/**
 * Gets information about a deployment.
 *
 * The `content` property of the `appSpecContent` object in
 * the returned revision is always null. Use `GetApplicationRevision` and
 * the `sha256` property of the returned `appSpecContent` object
 * to get the content of the deployment’s AppSpec file.
 */
export const getDeployment: API.OperationMethod<
  GetDeploymentInput,
  GetDeploymentOutput,
  GetDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { deploymentId: 0 },
    output: { deploymentInfo: o_DeploymentInfo },
  },
  errors: [
    DeploymentDoesNotExistException,
    DeploymentIdRequiredException,
    InvalidDeploymentIdException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeployment",
})) as any;

export type GetDeploymentConfigError =
  | DeploymentConfigDoesNotExistException
  | DeploymentConfigNameRequiredException
  | InvalidComputePlatformException
  | InvalidDeploymentConfigNameException
  | CommonErrors;
/**
 * Gets information about a deployment configuration.
 */
export const getDeploymentConfig: API.OperationMethod<
  GetDeploymentConfigInput,
  GetDeploymentConfigOutput,
  GetDeploymentConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { deploymentConfigName: 0 },
    output: { deploymentConfigInfo: { createTime: D.ts } },
  },
  errors: [
    DeploymentConfigDoesNotExistException,
    DeploymentConfigNameRequiredException,
    InvalidComputePlatformException,
    InvalidDeploymentConfigNameException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeploymentConfig",
})) as any;

export type GetDeploymentGroupError =
  | ApplicationDoesNotExistException
  | ApplicationNameRequiredException
  | DeploymentConfigDoesNotExistException
  | DeploymentGroupDoesNotExistException
  | DeploymentGroupNameRequiredException
  | InvalidApplicationNameException
  | InvalidDeploymentGroupNameException
  | CommonErrors;
/**
 * Gets information about a deployment group.
 */
export const getDeploymentGroup: API.OperationMethod<
  GetDeploymentGroupInput,
  GetDeploymentGroupOutput,
  GetDeploymentGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { applicationName: 0, deploymentGroupName: 0 },
    output: { deploymentGroupInfo: o_DeploymentGroupInfo },
  },
  errors: [
    ApplicationDoesNotExistException,
    ApplicationNameRequiredException,
    DeploymentConfigDoesNotExistException,
    DeploymentGroupDoesNotExistException,
    DeploymentGroupNameRequiredException,
    InvalidApplicationNameException,
    InvalidDeploymentGroupNameException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeploymentGroup",
})) as any;

export type GetDeploymentInstanceError =
  | DeploymentDoesNotExistException
  | DeploymentIdRequiredException
  | InstanceDoesNotExistException
  | InstanceIdRequiredException
  | InvalidComputePlatformException
  | InvalidDeploymentIdException
  | InvalidInstanceNameException
  | CommonErrors;
/**
 * Gets information about an instance as part of a deployment.
 */
export const getDeploymentInstance: API.OperationMethod<
  GetDeploymentInstanceInput,
  GetDeploymentInstanceOutput,
  GetDeploymentInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { deploymentId: 0, instanceId: 0 },
    output: { instanceSummary: o_InstanceSummary },
  },
  errors: [
    DeploymentDoesNotExistException,
    DeploymentIdRequiredException,
    InstanceDoesNotExistException,
    InstanceIdRequiredException,
    InvalidComputePlatformException,
    InvalidDeploymentIdException,
    InvalidInstanceNameException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeploymentInstance",
})) as any;

export type GetDeploymentTargetError =
  | DeploymentDoesNotExistException
  | DeploymentIdRequiredException
  | DeploymentNotStartedException
  | DeploymentTargetDoesNotExistException
  | DeploymentTargetIdRequiredException
  | InvalidDeploymentIdException
  | InvalidDeploymentTargetIdException
  | InvalidInstanceNameException
  | CommonErrors;
/**
 * Returns information about a deployment target.
 */
export const getDeploymentTarget: API.OperationMethod<
  GetDeploymentTargetInput,
  GetDeploymentTargetOutput,
  GetDeploymentTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { deploymentId: 0, targetId: 0 },
    output: { deploymentTarget: o_DeploymentTarget },
  },
  errors: [
    DeploymentDoesNotExistException,
    DeploymentIdRequiredException,
    DeploymentNotStartedException,
    DeploymentTargetDoesNotExistException,
    DeploymentTargetIdRequiredException,
    InvalidDeploymentIdException,
    InvalidDeploymentTargetIdException,
    InvalidInstanceNameException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeploymentTarget",
})) as any;

export type GetOnPremisesInstanceError =
  | InstanceNameRequiredException
  | InstanceNotRegisteredException
  | InvalidInstanceNameException
  | CommonErrors;
/**
 * Gets information about an on-premises instance.
 */
export const getOnPremisesInstance: API.OperationMethod<
  GetOnPremisesInstanceInput,
  GetOnPremisesInstanceOutput,
  GetOnPremisesInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { instanceName: 0 },
    output: { instanceInfo: o_InstanceInfo },
  },
  errors: [
    InstanceNameRequiredException,
    InstanceNotRegisteredException,
    InvalidInstanceNameException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOnPremisesInstance",
})) as any;

export type ListApplicationRevisionsError =
  | ApplicationDoesNotExistException
  | ApplicationNameRequiredException
  | BucketNameFilterRequiredException
  | InvalidApplicationNameException
  | InvalidBucketNameFilterException
  | InvalidDeployedStateFilterException
  | InvalidKeyPrefixFilterException
  | InvalidNextTokenException
  | InvalidSortByException
  | InvalidSortOrderException
  | CommonErrors;
/**
 * Lists information about revisions for an application.
 */
export const listApplicationRevisions: API.PaginatedOperationMethod<
  ListApplicationRevisionsInput,
  ListApplicationRevisionsOutput,
  ListApplicationRevisionsError,
  Credentials | HttpClient.HttpClient,
  RevisionLocation
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      applicationName: 0,
      sortBy: 0,
      sortOrder: 0,
      s3Bucket: 0,
      s3KeyPrefix: 0,
      deployed: 0,
      nextToken: 0,
    },
  },
  errors: [
    ApplicationDoesNotExistException,
    ApplicationNameRequiredException,
    BucketNameFilterRequiredException,
    InvalidApplicationNameException,
    InvalidBucketNameFilterException,
    InvalidDeployedStateFilterException,
    InvalidKeyPrefixFilterException,
    InvalidNextTokenException,
    InvalidSortByException,
    InvalidSortOrderException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplicationRevisions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "revisions",
  } as const,
})) as any;

export type ListApplicationsError = InvalidNextTokenException | CommonErrors;
/**
 * Lists the applications registered with the user or Amazon Web Services account.
 */
export const listApplications: API.PaginatedOperationMethod<
  ListApplicationsInput,
  ListApplicationsOutput,
  ListApplicationsError,
  Credentials | HttpClient.HttpClient,
  ApplicationName
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { nextToken: 0 } },
  errors: [InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplications",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "applications",
  } as const,
})) as any;

export type ListDeploymentConfigsError =
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Lists the deployment configurations with the user or Amazon Web Services account.
 */
export const listDeploymentConfigs: API.PaginatedOperationMethod<
  ListDeploymentConfigsInput,
  ListDeploymentConfigsOutput,
  ListDeploymentConfigsError,
  Credentials | HttpClient.HttpClient,
  DeploymentConfigName
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { nextToken: 0 } },
  errors: [InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeploymentConfigs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "deploymentConfigsList",
  } as const,
})) as any;

export type ListDeploymentGroupsError =
  | ApplicationDoesNotExistException
  | ApplicationNameRequiredException
  | InvalidApplicationNameException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Lists the deployment groups for an application registered with the Amazon Web Services
 * user or Amazon Web Services account.
 */
export const listDeploymentGroups: API.PaginatedOperationMethod<
  ListDeploymentGroupsInput,
  ListDeploymentGroupsOutput,
  ListDeploymentGroupsError,
  Credentials | HttpClient.HttpClient,
  DeploymentGroupName
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { applicationName: 0, nextToken: 0 } },
  errors: [
    ApplicationDoesNotExistException,
    ApplicationNameRequiredException,
    InvalidApplicationNameException,
    InvalidNextTokenException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeploymentGroups",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "deploymentGroups",
  } as const,
})) as any;

export type ListDeploymentInstancesError =
  | ApplicationDoesNotExistException
  | DeploymentDoesNotExistException
  | DeploymentGroupDoesNotExistException
  | DeploymentIdRequiredException
  | DeploymentNotStartedException
  | InvalidComputePlatformException
  | InvalidDeploymentIdException
  | InvalidDeploymentInstanceTypeException
  | InvalidInstanceStatusException
  | InvalidInstanceTypeException
  | InvalidNextTokenException
  | InvalidTargetFilterNameException
  | CommonErrors;
/**
 * The newer `BatchGetDeploymentTargets` should be used instead because
 * it works with all compute types. `ListDeploymentInstances` throws an
 * exception if it is used with a compute platform other than EC2/On-premises or
 * Lambda.
 *
 * Lists the instance for a deployment associated with the user or Amazon Web Services account.
 */
export const listDeploymentInstances: API.PaginatedOperationMethod<
  ListDeploymentInstancesInput,
  ListDeploymentInstancesOutput,
  ListDeploymentInstancesError,
  Credentials | HttpClient.HttpClient,
  InstanceId
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      deploymentId: 0,
      nextToken: 0,
      instanceStatusFilter: 0,
      instanceTypeFilter: 0,
    },
  },
  errors: [
    ApplicationDoesNotExistException,
    DeploymentDoesNotExistException,
    DeploymentGroupDoesNotExistException,
    DeploymentIdRequiredException,
    DeploymentNotStartedException,
    InvalidComputePlatformException,
    InvalidDeploymentIdException,
    InvalidDeploymentInstanceTypeException,
    InvalidInstanceStatusException,
    InvalidInstanceTypeException,
    InvalidNextTokenException,
    InvalidTargetFilterNameException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeploymentInstances",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "instancesList",
  } as const,
})) as any;

export type ListDeploymentsError =
  | ApplicationDoesNotExistException
  | ApplicationNameRequiredException
  | DeploymentGroupDoesNotExistException
  | DeploymentGroupNameRequiredException
  | InvalidApplicationNameException
  | InvalidDeploymentGroupNameException
  | InvalidDeploymentStatusException
  | InvalidExternalIdException
  | InvalidInputException
  | InvalidNextTokenException
  | InvalidTimeRangeException
  | CommonErrors;
/**
 * Lists the deployments in a deployment group for an application registered with the
 * user or Amazon Web Services account.
 */
export const listDeployments: API.PaginatedOperationMethod<
  ListDeploymentsInput,
  ListDeploymentsOutput,
  ListDeploymentsError,
  Credentials | HttpClient.HttpClient,
  DeploymentId
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      applicationName: 0,
      deploymentGroupName: 0,
      externalId: 0,
      includeOnlyStatuses: 0,
      createTimeRange: { start: 0, end: 0 },
      nextToken: 0,
    },
  },
  errors: [
    ApplicationDoesNotExistException,
    ApplicationNameRequiredException,
    DeploymentGroupDoesNotExistException,
    DeploymentGroupNameRequiredException,
    InvalidApplicationNameException,
    InvalidDeploymentGroupNameException,
    InvalidDeploymentStatusException,
    InvalidExternalIdException,
    InvalidInputException,
    InvalidNextTokenException,
    InvalidTimeRangeException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeployments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "deployments",
  } as const,
})) as any;

export type ListDeploymentTargetsError =
  | ApplicationDoesNotExistException
  | DeploymentDoesNotExistException
  | DeploymentGroupDoesNotExistException
  | DeploymentIdRequiredException
  | DeploymentNotStartedException
  | InvalidDeploymentIdException
  | InvalidDeploymentInstanceTypeException
  | InvalidInstanceStatusException
  | InvalidInstanceTypeException
  | InvalidNextTokenException
  | InvalidTargetFilterNameException
  | CommonErrors;
/**
 * Returns an array of target IDs that are associated a deployment.
 */
export const listDeploymentTargets: API.OperationMethod<
  ListDeploymentTargetsInput,
  ListDeploymentTargetsOutput,
  ListDeploymentTargetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { deploymentId: 0, nextToken: 0, targetFilters: 0 },
  },
  errors: [
    ApplicationDoesNotExistException,
    DeploymentDoesNotExistException,
    DeploymentGroupDoesNotExistException,
    DeploymentIdRequiredException,
    DeploymentNotStartedException,
    InvalidDeploymentIdException,
    InvalidDeploymentInstanceTypeException,
    InvalidInstanceStatusException,
    InvalidInstanceTypeException,
    InvalidNextTokenException,
    InvalidTargetFilterNameException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeploymentTargets",
})) as any;

export type ListGitHubAccountTokenNamesError =
  | InvalidNextTokenException
  | OperationNotSupportedException
  | ResourceValidationException
  | CommonErrors;
/**
 * Lists the names of stored connections to GitHub accounts.
 */
export const listGitHubAccountTokenNames: API.OperationMethod<
  ListGitHubAccountTokenNamesInput,
  ListGitHubAccountTokenNamesOutput,
  ListGitHubAccountTokenNamesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { nextToken: 0 } },
  errors: [
    InvalidNextTokenException,
    OperationNotSupportedException,
    ResourceValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGitHubAccountTokenNames",
})) as any;

export type ListOnPremisesInstancesError =
  | InvalidNextTokenException
  | InvalidRegistrationStatusException
  | InvalidTagFilterException
  | CommonErrors;
/**
 * Gets a list of names for one or more on-premises instances.
 *
 * Unless otherwise specified, both registered and deregistered on-premises instance
 * names are listed. To list only registered or deregistered on-premises instance names,
 * use the registration status parameter.
 */
export const listOnPremisesInstances: API.OperationMethod<
  ListOnPremisesInstancesInput,
  ListOnPremisesInstancesOutput,
  ListOnPremisesInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      registrationStatus: 0,
      tagFilters: D.list(i_TagFilter),
      nextToken: 0,
    },
  },
  errors: [
    InvalidNextTokenException,
    InvalidRegistrationStatusException,
    InvalidTagFilterException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOnPremisesInstances",
})) as any;

export type ListTagsForResourceError =
  | ArnNotSupportedException
  | InvalidArnException
  | ResourceArnRequiredException
  | CommonErrors;
/**
 * Returns a list of tags for the resource identified by a specified Amazon Resource
 * Name (ARN). Tags are used to organize and categorize your CodeDeploy resources.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0, NextToken: 0 } },
  errors: [
    ArnNotSupportedException,
    InvalidArnException,
    ResourceArnRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type PutLifecycleEventHookExecutionStatusError =
  | DeploymentDoesNotExistException
  | DeploymentIdRequiredException
  | InvalidDeploymentIdException
  | InvalidLifecycleEventHookExecutionIdException
  | InvalidLifecycleEventHookExecutionStatusException
  | LifecycleEventAlreadyCompletedException
  | UnsupportedActionForDeploymentTypeException
  | CommonErrors;
/**
 * Sets the result of a Lambda validation function. The function validates
 * lifecycle hooks during a deployment that uses the Lambda or Amazon ECS compute platform. For Lambda deployments, the available
 * lifecycle hooks are `BeforeAllowTraffic` and `AfterAllowTraffic`.
 * For Amazon ECS deployments, the available lifecycle hooks are
 * `BeforeInstall`, `AfterInstall`,
 * `AfterAllowTestTraffic`, `BeforeAllowTraffic`, and
 * `AfterAllowTraffic`. Lambda validation functions return
 * `Succeeded` or `Failed`. For more information, see AppSpec 'hooks' Section for an Lambda Deployment and
 * AppSpec 'hooks' Section for an Amazon ECS Deployment.
 */
export const putLifecycleEventHookExecutionStatus: API.OperationMethod<
  PutLifecycleEventHookExecutionStatusInput,
  PutLifecycleEventHookExecutionStatusOutput,
  PutLifecycleEventHookExecutionStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { deploymentId: 0, lifecycleEventHookExecutionId: 0, status: 0 },
  },
  errors: [
    DeploymentDoesNotExistException,
    DeploymentIdRequiredException,
    InvalidDeploymentIdException,
    InvalidLifecycleEventHookExecutionIdException,
    InvalidLifecycleEventHookExecutionStatusException,
    LifecycleEventAlreadyCompletedException,
    UnsupportedActionForDeploymentTypeException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutLifecycleEventHookExecutionStatus",
})) as any;

export type RegisterApplicationRevisionError =
  | ApplicationDoesNotExistException
  | ApplicationNameRequiredException
  | DescriptionTooLongException
  | InvalidApplicationNameException
  | InvalidRevisionException
  | RevisionRequiredException
  | CommonErrors;
/**
 * Registers with CodeDeploy a revision for the specified application.
 */
export const registerApplicationRevision: API.OperationMethod<
  RegisterApplicationRevisionInput,
  RegisterApplicationRevisionResponse,
  RegisterApplicationRevisionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { applicationName: 0, description: 0, revision: i_RevisionLocation },
  },
  errors: [
    ApplicationDoesNotExistException,
    ApplicationNameRequiredException,
    DescriptionTooLongException,
    InvalidApplicationNameException,
    InvalidRevisionException,
    RevisionRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterApplicationRevision",
})) as any;

export type RegisterOnPremisesInstanceError =
  | IamArnRequiredException
  | IamSessionArnAlreadyRegisteredException
  | IamUserArnAlreadyRegisteredException
  | IamUserArnRequiredException
  | InstanceNameAlreadyRegisteredException
  | InstanceNameRequiredException
  | InvalidIamSessionArnException
  | InvalidIamUserArnException
  | InvalidInstanceNameException
  | MultipleIamArnsProvidedException
  | CommonErrors;
/**
 * Registers an on-premises instance.
 *
 * Only one IAM ARN (an IAM session ARN or IAM user ARN) is supported in the request. You cannot use both.
 */
export const registerOnPremisesInstance: API.OperationMethod<
  RegisterOnPremisesInstanceInput,
  RegisterOnPremisesInstanceResponse,
  RegisterOnPremisesInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { instanceName: 0, iamSessionArn: 0, iamUserArn: 0 },
  },
  errors: [
    IamArnRequiredException,
    IamSessionArnAlreadyRegisteredException,
    IamUserArnAlreadyRegisteredException,
    IamUserArnRequiredException,
    InstanceNameAlreadyRegisteredException,
    InstanceNameRequiredException,
    InvalidIamSessionArnException,
    InvalidIamUserArnException,
    InvalidInstanceNameException,
    MultipleIamArnsProvidedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterOnPremisesInstance",
})) as any;

export type RemoveTagsFromOnPremisesInstancesError =
  | InstanceLimitExceededException
  | InstanceNameRequiredException
  | InstanceNotRegisteredException
  | InvalidInstanceNameException
  | InvalidTagException
  | TagLimitExceededException
  | TagRequiredException
  | CommonErrors;
/**
 * Removes one or more tags from one or more on-premises instances.
 */
export const removeTagsFromOnPremisesInstances: API.OperationMethod<
  RemoveTagsFromOnPremisesInstancesInput,
  RemoveTagsFromOnPremisesInstancesResponse,
  RemoveTagsFromOnPremisesInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { tags: D.list(i_Tag), instanceNames: 0 },
  },
  errors: [
    InstanceLimitExceededException,
    InstanceNameRequiredException,
    InstanceNotRegisteredException,
    InvalidInstanceNameException,
    InvalidTagException,
    TagLimitExceededException,
    TagRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveTagsFromOnPremisesInstances",
})) as any;

export type SkipWaitTimeForInstanceTerminationError =
  | DeploymentAlreadyCompletedException
  | DeploymentDoesNotExistException
  | DeploymentIdRequiredException
  | DeploymentNotStartedException
  | InvalidDeploymentIdException
  | UnsupportedActionForDeploymentTypeException
  | CommonErrors;
/**
 * In a blue/green deployment, overrides any specified wait time and starts terminating
 * instances immediately after the traffic routing is complete.
 */
export const skipWaitTimeForInstanceTermination: API.OperationMethod<
  SkipWaitTimeForInstanceTerminationInput,
  SkipWaitTimeForInstanceTerminationResponse,
  SkipWaitTimeForInstanceTerminationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { deploymentId: 0 } },
  errors: [
    DeploymentAlreadyCompletedException,
    DeploymentDoesNotExistException,
    DeploymentIdRequiredException,
    DeploymentNotStartedException,
    InvalidDeploymentIdException,
    UnsupportedActionForDeploymentTypeException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SkipWaitTimeForInstanceTermination",
})) as any;

export type StopDeploymentError =
  | DeploymentAlreadyCompletedException
  | DeploymentDoesNotExistException
  | DeploymentGroupDoesNotExistException
  | DeploymentIdRequiredException
  | InvalidDeploymentIdException
  | UnsupportedActionForDeploymentTypeException
  | CommonErrors;
/**
 * Attempts to stop an ongoing deployment.
 */
export const stopDeployment: API.OperationMethod<
  StopDeploymentInput,
  StopDeploymentOutput,
  StopDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { deploymentId: 0, autoRollbackEnabled: 0 },
  },
  errors: [
    DeploymentAlreadyCompletedException,
    DeploymentDoesNotExistException,
    DeploymentGroupDoesNotExistException,
    DeploymentIdRequiredException,
    InvalidDeploymentIdException,
    UnsupportedActionForDeploymentTypeException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopDeployment",
})) as any;

export type TagResourceError =
  | ApplicationDoesNotExistException
  | ArnNotSupportedException
  | DeploymentConfigDoesNotExistException
  | DeploymentGroupDoesNotExistException
  | InvalidArnException
  | InvalidTagsToAddException
  | ResourceArnRequiredException
  | TagRequiredException
  | CommonErrors;
/**
 * Associates the list of tags in the input `Tags` parameter with the
 * resource identified by the `ResourceArn` input parameter.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceOutput,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0, Tags: D.list(i_Tag) } },
  errors: [
    ApplicationDoesNotExistException,
    ArnNotSupportedException,
    DeploymentConfigDoesNotExistException,
    DeploymentGroupDoesNotExistException,
    InvalidArnException,
    InvalidTagsToAddException,
    ResourceArnRequiredException,
    TagRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | ApplicationDoesNotExistException
  | ArnNotSupportedException
  | DeploymentConfigDoesNotExistException
  | DeploymentGroupDoesNotExistException
  | InvalidArnException
  | InvalidTagsToAddException
  | ResourceArnRequiredException
  | TagRequiredException
  | CommonErrors;
/**
 * Disassociates a resource from a list of tags. The resource is identified by the
 * `ResourceArn` input parameter. The tags are identified by the list of
 * keys in the `TagKeys` input parameter.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0, TagKeys: 0 } },
  errors: [
    ApplicationDoesNotExistException,
    ArnNotSupportedException,
    DeploymentConfigDoesNotExistException,
    DeploymentGroupDoesNotExistException,
    InvalidArnException,
    InvalidTagsToAddException,
    ResourceArnRequiredException,
    TagRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateApplicationError =
  | ApplicationAlreadyExistsException
  | ApplicationDoesNotExistException
  | ApplicationNameRequiredException
  | InvalidApplicationNameException
  | CommonErrors;
/**
 * Changes the name of an application.
 */
export const updateApplication: API.OperationMethod<
  UpdateApplicationInput,
  UpdateApplicationResponse,
  UpdateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { applicationName: 0, newApplicationName: 0 },
  },
  errors: [
    ApplicationAlreadyExistsException,
    ApplicationDoesNotExistException,
    ApplicationNameRequiredException,
    InvalidApplicationNameException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApplication",
})) as any;

export type UpdateDeploymentGroupError =
  | AlarmsLimitExceededException
  | ApplicationDoesNotExistException
  | ApplicationNameRequiredException
  | DeploymentConfigDoesNotExistException
  | DeploymentGroupAlreadyExistsException
  | DeploymentGroupDoesNotExistException
  | DeploymentGroupNameRequiredException
  | ECSServiceMappingLimitExceededException
  | InvalidAlarmConfigException
  | InvalidApplicationNameException
  | InvalidAutoRollbackConfigException
  | InvalidAutoScalingGroupException
  | InvalidBlueGreenDeploymentConfigurationException
  | InvalidDeploymentConfigNameException
  | InvalidDeploymentGroupNameException
  | InvalidDeploymentStyleException
  | InvalidEC2TagCombinationException
  | InvalidEC2TagException
  | InvalidECSServiceException
  | InvalidInputException
  | InvalidLoadBalancerInfoException
  | InvalidOnPremisesTagCombinationException
  | InvalidRoleException
  | InvalidTagException
  | InvalidTargetGroupPairException
  | InvalidTrafficRoutingConfigurationException
  | InvalidTriggerConfigException
  | LifecycleHookLimitExceededException
  | TagSetListLimitExceededException
  | ThrottlingException
  | TriggerTargetsLimitExceededException
  | CommonErrors;
/**
 * Changes information about a deployment group.
 */
export const updateDeploymentGroup: API.OperationMethod<
  UpdateDeploymentGroupInput,
  UpdateDeploymentGroupOutput,
  UpdateDeploymentGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      applicationName: 0,
      currentDeploymentGroupName: 0,
      newDeploymentGroupName: 0,
      deploymentConfigName: 0,
      ec2TagFilters: D.list(i_EC2TagFilter),
      onPremisesInstanceTagFilters: D.list(i_TagFilter),
      autoScalingGroups: 0,
      serviceRoleArn: 0,
      triggerConfigurations: D.list(i_TriggerConfig),
      alarmConfiguration: i_AlarmConfiguration,
      autoRollbackConfiguration: i_AutoRollbackConfiguration,
      outdatedInstancesStrategy: 0,
      deploymentStyle: i_DeploymentStyle,
      blueGreenDeploymentConfiguration: i_BlueGreenDeploymentConfiguration,
      loadBalancerInfo: i_LoadBalancerInfo,
      ec2TagSet: i_EC2TagSet,
      ecsServices: D.list(i_ECSService),
      onPremisesTagSet: i_OnPremisesTagSet,
      terminationHookEnabled: 0,
    },
  },
  errors: [
    AlarmsLimitExceededException,
    ApplicationDoesNotExistException,
    ApplicationNameRequiredException,
    DeploymentConfigDoesNotExistException,
    DeploymentGroupAlreadyExistsException,
    DeploymentGroupDoesNotExistException,
    DeploymentGroupNameRequiredException,
    ECSServiceMappingLimitExceededException,
    InvalidAlarmConfigException,
    InvalidApplicationNameException,
    InvalidAutoRollbackConfigException,
    InvalidAutoScalingGroupException,
    InvalidBlueGreenDeploymentConfigurationException,
    InvalidDeploymentConfigNameException,
    InvalidDeploymentGroupNameException,
    InvalidDeploymentStyleException,
    InvalidEC2TagCombinationException,
    InvalidEC2TagException,
    InvalidECSServiceException,
    InvalidInputException,
    InvalidLoadBalancerInfoException,
    InvalidOnPremisesTagCombinationException,
    InvalidRoleException,
    InvalidTagException,
    InvalidTargetGroupPairException,
    InvalidTrafficRoutingConfigurationException,
    InvalidTriggerConfigException,
    LifecycleHookLimitExceededException,
    TagSetListLimitExceededException,
    ThrottlingException,
    TriggerTargetsLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDeploymentGroup",
})) as any;

const i_AlarmConfiguration: D.LazyStruct = () => ({
  enabled: 0,
  ignorePollAlarmFailure: 0,
  alarms: D.list({ name: 0 }),
});
const i_AutoRollbackConfiguration: D.LazyStruct = () => ({
  enabled: 0,
  events: 0,
});
const i_BlueGreenDeploymentConfiguration: D.LazyStruct = () => ({
  terminateBlueInstancesOnDeploymentSuccess: {
    action: 0,
    terminationWaitTimeInMinutes: 0,
  },
  deploymentReadyOption: { actionOnTimeout: 0, waitTimeInMinutes: 0 },
  greenFleetProvisioningOption: { action: 0 },
});
const i_DeploymentStyle: D.LazyStruct = () => ({
  deploymentType: 0,
  deploymentOption: 0,
});
const i_EC2TagFilter: D.LazyStruct = () => ({ Key: 0, Value: 0, Type: 0 });
const i_EC2TagSet: D.LazyStruct = () => ({
  ec2TagSetList: D.list(D.list(i_EC2TagFilter)),
});
const i_ECSService: D.LazyStruct = () => ({ serviceName: 0, clusterName: 0 });
const i_LoadBalancerInfo: D.LazyStruct = () => ({
  elbInfoList: D.list({ name: 0 }),
  targetGroupInfoList: D.list(i_TargetGroupInfo),
  targetGroupPairInfoList: D.list({
    targetGroups: D.list(i_TargetGroupInfo),
    prodTrafficRoute: i_TrafficRoute,
    testTrafficRoute: i_TrafficRoute,
  }),
});
const i_OnPremisesTagSet: D.LazyStruct = () => ({
  onPremisesTagSetList: D.list(D.list(i_TagFilter)),
});
const i_RevisionLocation: D.LazyStruct = () => ({
  revisionType: 0,
  s3Location: { bucket: 0, key: 0, bundleType: 0, version: 0, eTag: 0 },
  gitHubLocation: { repository: 0, commitId: 0 },
  string: { content: 0, sha256: 0 },
  appSpecContent: { content: 0, sha256: 0 },
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const i_TagFilter: D.LazyStruct = () => ({ Key: 0, Value: 0, Type: 0 });
const i_TriggerConfig: D.LazyStruct = () => ({
  triggerName: 0,
  triggerTargetArn: 0,
  triggerEvents: 0,
});
const o_ApplicationInfo: D.LazyStruct = () => ({ createTime: D.ts });
const o_DeploymentGroupInfo: D.LazyStruct = () => ({
  lastSuccessfulDeployment: o_LastDeploymentInfo,
  lastAttemptedDeployment: o_LastDeploymentInfo,
});
const o_DeploymentInfo: D.LazyStruct = () => ({
  createTime: D.ts,
  startTime: D.ts,
  completeTime: D.ts,
});
const o_DeploymentTarget: D.LazyStruct = () => ({
  instanceTarget: {
    lastUpdatedAt: D.ts,
    lifecycleEvents: D.list(o_LifecycleEvent),
  },
  lambdaTarget: {
    lastUpdatedAt: D.ts,
    lifecycleEvents: D.list(o_LifecycleEvent),
  },
  ecsTarget: { lastUpdatedAt: D.ts, lifecycleEvents: D.list(o_LifecycleEvent) },
  cloudFormationTarget: {
    lastUpdatedAt: D.ts,
    lifecycleEvents: D.list(o_LifecycleEvent),
  },
});
const o_GenericRevisionInfo: D.LazyStruct = () => ({
  firstUsedTime: D.ts,
  lastUsedTime: D.ts,
  registerTime: D.ts,
});
const o_InstanceInfo: D.LazyStruct = () => ({
  registerTime: D.ts,
  deregisterTime: D.ts,
});
const o_InstanceSummary: D.LazyStruct = () => ({
  lastUpdatedAt: D.ts,
  lifecycleEvents: D.list(o_LifecycleEvent),
});
const i_TargetGroupInfo: D.LazyStruct = () => ({ name: 0 });
const i_TrafficRoute: D.LazyStruct = () => ({ listenerArns: 0 });
const o_LastDeploymentInfo: D.LazyStruct = () => ({
  endTime: D.ts,
  createTime: D.ts,
});
const o_LifecycleEvent: D.LazyStruct = () => ({
  startTime: D.ts,
  endTime: D.ts,
});
