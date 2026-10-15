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
const ns = /*@__PURE__*/ T.XmlNamespace("http://codedeploy.amazonaws.com/doc/2014-10-06/");
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "CodeDeploy",
  serviceShapeName: "CodeDeploy_20141006",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "codedeploy" });
const ver = /*@__PURE__*/ T.ServiceVersion("2014-10-06");
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://codedeploy.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://codedeploy.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://codedeploy.{R}.{D}","properties":{},"headers":{}}');

export class AlarmsLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<AlarmsLimitExceededException>()(
    "AlarmsLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ApplicationAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<ApplicationAlreadyExistsException>()(
    "ApplicationAlreadyExistsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ).pipe(C.withAlreadyExistsError) {}
export class ApplicationDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<ApplicationDoesNotExistException>()(
    "ApplicationDoesNotExistException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ApplicationLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ApplicationLimitExceededException>()(
    "ApplicationLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ApplicationNameRequiredException
  extends /*@__PURE__*/ S.TaggedError<ApplicationNameRequiredException>()(
    "ApplicationNameRequiredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ArnNotSupportedException
  extends /*@__PURE__*/ S.TaggedError<ArnNotSupportedException>()("ArnNotSupportedException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class BatchLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<BatchLimitExceededException>()(
    "BatchLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class BucketNameFilterRequiredException
  extends /*@__PURE__*/ S.TaggedError<BucketNameFilterRequiredException>()(
    "BucketNameFilterRequiredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class DeploymentAlreadyCompletedException
  extends /*@__PURE__*/ S.TaggedError<DeploymentAlreadyCompletedException>()(
    "DeploymentAlreadyCompletedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class DeploymentConfigAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<DeploymentConfigAlreadyExistsException>()(
    "DeploymentConfigAlreadyExistsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ).pipe(C.withAlreadyExistsError) {}
export class DeploymentConfigDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<DeploymentConfigDoesNotExistException>()(
    "DeploymentConfigDoesNotExistException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class DeploymentConfigInUseException
  extends /*@__PURE__*/ S.TaggedError<DeploymentConfigInUseException>()(
    "DeploymentConfigInUseException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class DeploymentConfigLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<DeploymentConfigLimitExceededException>()(
    "DeploymentConfigLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class DeploymentConfigNameRequiredException
  extends /*@__PURE__*/ S.TaggedError<DeploymentConfigNameRequiredException>()(
    "DeploymentConfigNameRequiredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class DeploymentDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<DeploymentDoesNotExistException>()(
    "DeploymentDoesNotExistException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class DeploymentGroupAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<DeploymentGroupAlreadyExistsException>()(
    "DeploymentGroupAlreadyExistsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ).pipe(C.withAlreadyExistsError) {}
export class DeploymentGroupDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<DeploymentGroupDoesNotExistException>()(
    "DeploymentGroupDoesNotExistException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class DeploymentGroupLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<DeploymentGroupLimitExceededException>()(
    "DeploymentGroupLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class DeploymentGroupNameRequiredException
  extends /*@__PURE__*/ S.TaggedError<DeploymentGroupNameRequiredException>()(
    "DeploymentGroupNameRequiredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class DeploymentIdRequiredException
  extends /*@__PURE__*/ S.TaggedError<DeploymentIdRequiredException>()(
    "DeploymentIdRequiredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class DeploymentIsNotInReadyStateException
  extends /*@__PURE__*/ S.TaggedError<DeploymentIsNotInReadyStateException>()(
    "DeploymentIsNotInReadyStateException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class DeploymentLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<DeploymentLimitExceededException>()(
    "DeploymentLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class DeploymentNotStartedException
  extends /*@__PURE__*/ S.TaggedError<DeploymentNotStartedException>()(
    "DeploymentNotStartedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class DeploymentTargetDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<DeploymentTargetDoesNotExistException>()(
    "DeploymentTargetDoesNotExistException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class DeploymentTargetIdRequiredException
  extends /*@__PURE__*/ S.TaggedError<DeploymentTargetIdRequiredException>()(
    "DeploymentTargetIdRequiredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class DeploymentTargetListSizeExceededException
  extends /*@__PURE__*/ S.TaggedError<DeploymentTargetListSizeExceededException>()(
    "DeploymentTargetListSizeExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class DescriptionTooLongException
  extends /*@__PURE__*/ S.TaggedError<DescriptionTooLongException>()(
    "DescriptionTooLongException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ECSServiceMappingLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ECSServiceMappingLimitExceededException>()(
    "ECSServiceMappingLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class GitHubAccountTokenDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<GitHubAccountTokenDoesNotExistException>()(
    "GitHubAccountTokenDoesNotExistException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class GitHubAccountTokenNameRequiredException
  extends /*@__PURE__*/ S.TaggedError<GitHubAccountTokenNameRequiredException>()(
    "GitHubAccountTokenNameRequiredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class IamArnRequiredException
  extends /*@__PURE__*/ S.TaggedError<IamArnRequiredException>()("IamArnRequiredException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class IamSessionArnAlreadyRegisteredException
  extends /*@__PURE__*/ S.TaggedError<IamSessionArnAlreadyRegisteredException>()(
    "IamSessionArnAlreadyRegisteredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class IamUserArnAlreadyRegisteredException
  extends /*@__PURE__*/ S.TaggedError<IamUserArnAlreadyRegisteredException>()(
    "IamUserArnAlreadyRegisteredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class IamUserArnRequiredException
  extends /*@__PURE__*/ S.TaggedError<IamUserArnRequiredException>()(
    "IamUserArnRequiredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InstanceDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<InstanceDoesNotExistException>()(
    "InstanceDoesNotExistException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InstanceIdRequiredException
  extends /*@__PURE__*/ S.TaggedError<InstanceIdRequiredException>()(
    "InstanceIdRequiredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InstanceLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<InstanceLimitExceededException>()(
    "InstanceLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InstanceNameAlreadyRegisteredException
  extends /*@__PURE__*/ S.TaggedError<InstanceNameAlreadyRegisteredException>()(
    "InstanceNameAlreadyRegisteredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InstanceNameRequiredException
  extends /*@__PURE__*/ S.TaggedError<InstanceNameRequiredException>()(
    "InstanceNameRequiredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InstanceNotRegisteredException
  extends /*@__PURE__*/ S.TaggedError<InstanceNotRegisteredException>()(
    "InstanceNotRegisteredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidAlarmConfigException
  extends /*@__PURE__*/ S.TaggedError<InvalidAlarmConfigException>()(
    "InvalidAlarmConfigException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidApplicationNameException
  extends /*@__PURE__*/ S.TaggedError<InvalidApplicationNameException>()(
    "InvalidApplicationNameException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidArnException
  extends /*@__PURE__*/ S.TaggedError<InvalidArnException>()("InvalidArnException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidAutoRollbackConfigException
  extends /*@__PURE__*/ S.TaggedError<InvalidAutoRollbackConfigException>()(
    "InvalidAutoRollbackConfigException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidAutoScalingGroupException
  extends /*@__PURE__*/ S.TaggedError<InvalidAutoScalingGroupException>()(
    "InvalidAutoScalingGroupException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidBlueGreenDeploymentConfigurationException
  extends /*@__PURE__*/ S.TaggedError<InvalidBlueGreenDeploymentConfigurationException>()(
    "InvalidBlueGreenDeploymentConfigurationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidBucketNameFilterException
  extends /*@__PURE__*/ S.TaggedError<InvalidBucketNameFilterException>()(
    "InvalidBucketNameFilterException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidComputePlatformException
  extends /*@__PURE__*/ S.TaggedError<InvalidComputePlatformException>()(
    "InvalidComputePlatformException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidDeployedStateFilterException
  extends /*@__PURE__*/ S.TaggedError<InvalidDeployedStateFilterException>()(
    "InvalidDeployedStateFilterException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidDeploymentConfigNameException
  extends /*@__PURE__*/ S.TaggedError<InvalidDeploymentConfigNameException>()(
    "InvalidDeploymentConfigNameException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidDeploymentGroupNameException
  extends /*@__PURE__*/ S.TaggedError<InvalidDeploymentGroupNameException>()(
    "InvalidDeploymentGroupNameException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidDeploymentIdException
  extends /*@__PURE__*/ S.TaggedError<InvalidDeploymentIdException>()(
    "InvalidDeploymentIdException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidDeploymentInstanceTypeException
  extends /*@__PURE__*/ S.TaggedError<InvalidDeploymentInstanceTypeException>()(
    "InvalidDeploymentInstanceTypeException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidDeploymentStatusException
  extends /*@__PURE__*/ S.TaggedError<InvalidDeploymentStatusException>()(
    "InvalidDeploymentStatusException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidDeploymentStyleException
  extends /*@__PURE__*/ S.TaggedError<InvalidDeploymentStyleException>()(
    "InvalidDeploymentStyleException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidDeploymentTargetIdException
  extends /*@__PURE__*/ S.TaggedError<InvalidDeploymentTargetIdException>()(
    "InvalidDeploymentTargetIdException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidDeploymentWaitTypeException
  extends /*@__PURE__*/ S.TaggedError<InvalidDeploymentWaitTypeException>()(
    "InvalidDeploymentWaitTypeException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidEC2TagCombinationException
  extends /*@__PURE__*/ S.TaggedError<InvalidEC2TagCombinationException>()(
    "InvalidEC2TagCombinationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidEC2TagException
  extends /*@__PURE__*/ S.TaggedError<InvalidEC2TagException>()("InvalidEC2TagException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidECSServiceException
  extends /*@__PURE__*/ S.TaggedError<InvalidECSServiceException>()("InvalidECSServiceException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidExternalIdException
  extends /*@__PURE__*/ S.TaggedError<InvalidExternalIdException>()("InvalidExternalIdException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidFileExistsBehaviorException
  extends /*@__PURE__*/ S.TaggedError<InvalidFileExistsBehaviorException>()(
    "InvalidFileExistsBehaviorException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidGitHubAccountTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidGitHubAccountTokenException>()(
    "InvalidGitHubAccountTokenException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidGitHubAccountTokenNameException
  extends /*@__PURE__*/ S.TaggedError<InvalidGitHubAccountTokenNameException>()(
    "InvalidGitHubAccountTokenNameException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidIamSessionArnException
  extends /*@__PURE__*/ S.TaggedError<InvalidIamSessionArnException>()(
    "InvalidIamSessionArnException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidIamUserArnException
  extends /*@__PURE__*/ S.TaggedError<InvalidIamUserArnException>()("InvalidIamUserArnException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidIgnoreApplicationStopFailuresValueException
  extends /*@__PURE__*/ S.TaggedError<InvalidIgnoreApplicationStopFailuresValueException>()(
    "InvalidIgnoreApplicationStopFailuresValueException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidInputException
  extends /*@__PURE__*/ S.TaggedError<InvalidInputException>()("InvalidInputException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidInstanceNameException
  extends /*@__PURE__*/ S.TaggedError<InvalidInstanceNameException>()(
    "InvalidInstanceNameException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidInstanceStatusException
  extends /*@__PURE__*/ S.TaggedError<InvalidInstanceStatusException>()(
    "InvalidInstanceStatusException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidInstanceTypeException
  extends /*@__PURE__*/ S.TaggedError<InvalidInstanceTypeException>()(
    "InvalidInstanceTypeException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidKeyPrefixFilterException
  extends /*@__PURE__*/ S.TaggedError<InvalidKeyPrefixFilterException>()(
    "InvalidKeyPrefixFilterException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidLifecycleEventHookExecutionIdException
  extends /*@__PURE__*/ S.TaggedError<InvalidLifecycleEventHookExecutionIdException>()(
    "InvalidLifecycleEventHookExecutionIdException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidLifecycleEventHookExecutionStatusException
  extends /*@__PURE__*/ S.TaggedError<InvalidLifecycleEventHookExecutionStatusException>()(
    "InvalidLifecycleEventHookExecutionStatusException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidLoadBalancerInfoException
  extends /*@__PURE__*/ S.TaggedError<InvalidLoadBalancerInfoException>()(
    "InvalidLoadBalancerInfoException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidMinimumHealthyHostValueException
  extends /*@__PURE__*/ S.TaggedError<InvalidMinimumHealthyHostValueException>()(
    "InvalidMinimumHealthyHostValueException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidNextTokenException>()("InvalidNextTokenException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidOnPremisesTagCombinationException
  extends /*@__PURE__*/ S.TaggedError<InvalidOnPremisesTagCombinationException>()(
    "InvalidOnPremisesTagCombinationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidOperationException
  extends /*@__PURE__*/ S.TaggedError<InvalidOperationException>()("InvalidOperationException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidRegistrationStatusException
  extends /*@__PURE__*/ S.TaggedError<InvalidRegistrationStatusException>()(
    "InvalidRegistrationStatusException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidRevisionException
  extends /*@__PURE__*/ S.TaggedError<InvalidRevisionException>()("InvalidRevisionException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidRoleException
  extends /*@__PURE__*/ S.TaggedError<InvalidRoleException>()("InvalidRoleException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidSortByException
  extends /*@__PURE__*/ S.TaggedError<InvalidSortByException>()("InvalidSortByException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidSortOrderException
  extends /*@__PURE__*/ S.TaggedError<InvalidSortOrderException>()("InvalidSortOrderException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidTagException
  extends /*@__PURE__*/ S.TaggedError<InvalidTagException>()("InvalidTagException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidTagFilterException
  extends /*@__PURE__*/ S.TaggedError<InvalidTagFilterException>()("InvalidTagFilterException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidTagsToAddException
  extends /*@__PURE__*/ S.TaggedError<InvalidTagsToAddException>()("InvalidTagsToAddException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidTargetFilterNameException
  extends /*@__PURE__*/ S.TaggedError<InvalidTargetFilterNameException>()(
    "InvalidTargetFilterNameException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidTargetGroupPairException
  extends /*@__PURE__*/ S.TaggedError<InvalidTargetGroupPairException>()(
    "InvalidTargetGroupPairException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidTargetInstancesException
  extends /*@__PURE__*/ S.TaggedError<InvalidTargetInstancesException>()(
    "InvalidTargetInstancesException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidTimeRangeException
  extends /*@__PURE__*/ S.TaggedError<InvalidTimeRangeException>()("InvalidTimeRangeException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidTrafficRoutingConfigurationException
  extends /*@__PURE__*/ S.TaggedError<InvalidTrafficRoutingConfigurationException>()(
    "InvalidTrafficRoutingConfigurationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidTriggerConfigException
  extends /*@__PURE__*/ S.TaggedError<InvalidTriggerConfigException>()(
    "InvalidTriggerConfigException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidUpdateOutdatedInstancesOnlyValueException
  extends /*@__PURE__*/ S.TaggedError<InvalidUpdateOutdatedInstancesOnlyValueException>()(
    "InvalidUpdateOutdatedInstancesOnlyValueException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidZonalDeploymentConfigurationException
  extends /*@__PURE__*/ S.TaggedError<InvalidZonalDeploymentConfigurationException>()(
    "InvalidZonalDeploymentConfigurationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class LifecycleEventAlreadyCompletedException
  extends /*@__PURE__*/ S.TaggedError<LifecycleEventAlreadyCompletedException>()(
    "LifecycleEventAlreadyCompletedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class LifecycleHookLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LifecycleHookLimitExceededException>()(
    "LifecycleHookLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class MultipleIamArnsProvidedException
  extends /*@__PURE__*/ S.TaggedError<MultipleIamArnsProvidedException>()(
    "MultipleIamArnsProvidedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class OperationNotSupportedException
  extends /*@__PURE__*/ S.TaggedError<OperationNotSupportedException>()(
    "OperationNotSupportedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ResourceArnRequiredException
  extends /*@__PURE__*/ S.TaggedError<ResourceArnRequiredException>()(
    "ResourceArnRequiredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ResourceValidationException
  extends /*@__PURE__*/ S.TaggedError<ResourceValidationException>()(
    "ResourceValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class RevisionDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<RevisionDoesNotExistException>()(
    "RevisionDoesNotExistException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class RevisionRequiredException
  extends /*@__PURE__*/ S.TaggedError<RevisionRequiredException>()("RevisionRequiredException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class RoleRequiredException
  extends /*@__PURE__*/ S.TaggedError<RoleRequiredException>()("RoleRequiredException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class TagLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<TagLimitExceededException>()("TagLimitExceededException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class TagRequiredException
  extends /*@__PURE__*/ S.TaggedError<TagRequiredException>()("TagRequiredException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class TagSetListLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<TagSetListLimitExceededException>()(
    "TagSetListLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()("ThrottlingException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class TriggerTargetsLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<TriggerTargetsLimitExceededException>()(
    "TriggerTargetsLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class UnsupportedActionForDeploymentTypeException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedActionForDeploymentTypeException>()(
    "UnsupportedActionForDeploymentTypeException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
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
export type RevisionLocationType = "S3" | "GitHub" | "String" | "AppSpecContent" | (string & {});
export type S3Bucket = string;
export type S3Key = string;
export type BundleType = "tar" | "tgz" | "zip" | "YAML" | "JSON" | (string & {});
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
export type EC2TagFilterType = "KEY_ONLY" | "VALUE_ONLY" | "KEY_AND_VALUE" | (string & {});
export interface EC2TagFilter {
  Key?: string;
  Value?: string;
  Type?: EC2TagFilterType;
}
export type EC2TagFilterList = EC2TagFilter[];
export type TagFilterType = "KEY_ONLY" | "VALUE_ONLY" | "KEY_AND_VALUE" | (string & {});
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
export type DeploymentOption = "WITH_TRAFFIC_CONTROL" | "WITHOUT_TRAFFIC_CONTROL" | (string & {});
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
export type DeploymentReadyAction = "CONTINUE_DEPLOYMENT" | "STOP_DEPLOYMENT" | (string & {});
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
export type FileExistsBehavior = "DISALLOW" | "OVERWRITE" | "RETAIN" | (string & {});
export type DeploymentMode = "STANDARD" | "RESTART" | (string & {});
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
  deploymentMode?: DeploymentMode;
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
export type DeploymentWaitType = "READY_WAIT" | "TERMINATION_WAIT" | (string & {});
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
export type MinimumHealthyHostsType = "HOST_COUNT" | "FLEET_PERCENT" | (string & {});
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
export type MinimumHealthyHostsPerZoneType = "HOST_COUNT" | "FLEET_PERCENT" | (string & {});
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
export type ListStateFilterAction = "include" | "exclude" | "ignore" | (string & {});
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
export type TargetFilterName = "TargetStatus" | "ServerInstanceLabel" | (string & {});
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
  input: __S(0, __c0, 0) as any as S.Schema<AddTagsToOnPremisesInstancesInput>,
  output: __S(48, __c3, 0) as any as S.Schema<AddTagsToOnPremisesInstancesResponse>,
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
}));

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
  input: __S(64, __c4, 0) as any as S.Schema<BatchGetApplicationRevisionsInput>,
  output: __S(67, __c4, 3) as any as S.Schema<BatchGetApplicationRevisionsOutput>,
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
}));

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
  input: __S(128, __c8, 0) as any as S.Schema<BatchGetApplicationsInput>,
  output: __S(130, __c8, 2) as any as S.Schema<BatchGetApplicationsOutput>,
  errors: [
    ApplicationDoesNotExistException,
    ApplicationNameRequiredException,
    BatchLimitExceededException,
    InvalidApplicationNameException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetApplications",
}));

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
  input: __S(160, __c10, 0) as any as S.Schema<BatchGetDeploymentGroupsInput>,
  output: __S(162, __c10, 2) as any as S.Schema<BatchGetDeploymentGroupsOutput>,
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
}));

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
  input: __S(304, __c19, 0) as any as S.Schema<BatchGetDeploymentInstancesInput>,
  output: __S(306, __c19, 2) as any as S.Schema<BatchGetDeploymentInstancesOutput>,
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
}));

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
  input: __S(352, __c22, 0) as any as S.Schema<BatchGetDeploymentsInput>,
  output: __S(354, __c22, 2) as any as S.Schema<BatchGetDeploymentsOutput>,
  errors: [
    BatchLimitExceededException,
    DeploymentIdRequiredException,
    InvalidDeploymentIdException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetDeployments",
}));

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
  input: __S(400, __c25, 0) as any as S.Schema<BatchGetDeploymentTargetsInput>,
  output: __S(402, __c25, 2) as any as S.Schema<BatchGetDeploymentTargetsOutput>,
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
}));

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
  input: __S(432, __c27, 0) as any as S.Schema<BatchGetOnPremisesInstancesInput>,
  output: __S(434, __c27, 2) as any as S.Schema<BatchGetOnPremisesInstancesOutput>,
  errors: [
    BatchLimitExceededException,
    InstanceNameRequiredException,
    InvalidInstanceNameException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetOnPremisesInstances",
}));

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
  input: __S(464, __c29, 0) as any as S.Schema<ContinueDeploymentInput>,
  output: __S(48, __c3, 0) as any as S.Schema<ContinueDeploymentResponse>,
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
}));

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
  input: __S(480, __c30, 0) as any as S.Schema<CreateApplicationInput>,
  output: __S(481, __c30, 1) as any as S.Schema<CreateApplicationOutput>,
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
}));

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
  input: __S(496, __c31, 0) as any as S.Schema<CreateDeploymentInput>,
  output: __S(497, __c31, 1) as any as S.Schema<CreateDeploymentOutput>,
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
}));

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
  input: __S(512, __c32, 0) as any as S.Schema<CreateDeploymentConfigInput>,
  output: __S(513, __c32, 1) as any as S.Schema<CreateDeploymentConfigOutput>,
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
}));

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
  input: __S(544, __c34, 0) as any as S.Schema<CreateDeploymentGroupInput>,
  output: __S(545, __c34, 1) as any as S.Schema<CreateDeploymentGroupOutput>,
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
}));

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
  input: __S(560, __c35, 0) as any as S.Schema<DeleteApplicationInput>,
  output: __S(48, __c3, 0) as any as S.Schema<DeleteApplicationResponse>,
  errors: [ApplicationNameRequiredException, InvalidApplicationNameException, InvalidRoleException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplication",
}));

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
  input: __S(576, __c36, 0) as any as S.Schema<DeleteDeploymentConfigInput>,
  output: __S(48, __c3, 0) as any as S.Schema<DeleteDeploymentConfigResponse>,
  errors: [
    DeploymentConfigInUseException,
    DeploymentConfigNameRequiredException,
    InvalidDeploymentConfigNameException,
    InvalidOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDeploymentConfig",
}));

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
  input: __S(592, __c37, 0) as any as S.Schema<DeleteDeploymentGroupInput>,
  output: __S(608, __c38, 0) as any as S.Schema<DeleteDeploymentGroupOutput>,
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
}));

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
  input: __S(624, __c39, 0) as any as S.Schema<DeleteGitHubAccountTokenInput>,
  output: __S(625, __c39, 1) as any as S.Schema<DeleteGitHubAccountTokenOutput>,
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
}));

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
  input: __S(640, __c40, 0) as any as S.Schema<DeleteResourcesByExternalIdInput>,
  output: __S(48, __c3, 0) as any as S.Schema<DeleteResourcesByExternalIdOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcesByExternalId",
}));

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
  input: __S(656, __c41, 0) as any as S.Schema<DeregisterOnPremisesInstanceInput>,
  output: __S(48, __c3, 0) as any as S.Schema<DeregisterOnPremisesInstanceResponse>,
  errors: [InstanceNameRequiredException, InvalidInstanceNameException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterOnPremisesInstance",
}));

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
  input: __S(672, __c42, 0) as any as S.Schema<GetApplicationInput>,
  output: __S(673, __c42, 1) as any as S.Schema<GetApplicationOutput>,
  errors: [
    ApplicationDoesNotExistException,
    ApplicationNameRequiredException,
    InvalidApplicationNameException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApplication",
}));

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
  input: __S(688, __c43, 0) as any as S.Schema<GetApplicationRevisionInput>,
  output: __S(689, __c43, 1) as any as S.Schema<GetApplicationRevisionOutput>,
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
}));

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
 * to get the content of the deployment's AppSpec file.
 */
export const getDeployment: API.OperationMethod<
  GetDeploymentInput,
  GetDeploymentOutput,
  GetDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(704, __c44, 0) as any as S.Schema<GetDeploymentInput>,
  output: __S(705, __c44, 1) as any as S.Schema<GetDeploymentOutput>,
  errors: [
    DeploymentDoesNotExistException,
    DeploymentIdRequiredException,
    InvalidDeploymentIdException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeployment",
}));

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
  input: __S(720, __c45, 0) as any as S.Schema<GetDeploymentConfigInput>,
  output: __S(722, __c45, 2) as any as S.Schema<GetDeploymentConfigOutput>,
  errors: [
    DeploymentConfigDoesNotExistException,
    DeploymentConfigNameRequiredException,
    InvalidComputePlatformException,
    InvalidDeploymentConfigNameException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeploymentConfig",
}));

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
  input: __S(736, __c46, 0) as any as S.Schema<GetDeploymentGroupInput>,
  output: __S(737, __c46, 1) as any as S.Schema<GetDeploymentGroupOutput>,
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
}));

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
  input: __S(752, __c47, 0) as any as S.Schema<GetDeploymentInstanceInput>,
  output: __S(753, __c47, 1) as any as S.Schema<GetDeploymentInstanceOutput>,
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
}));

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
  input: __S(768, __c48, 0) as any as S.Schema<GetDeploymentTargetInput>,
  output: __S(769, __c48, 1) as any as S.Schema<GetDeploymentTargetOutput>,
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
}));

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
  input: __S(784, __c49, 0) as any as S.Schema<GetOnPremisesInstanceInput>,
  output: __S(785, __c49, 1) as any as S.Schema<GetOnPremisesInstanceOutput>,
  errors: [
    InstanceNameRequiredException,
    InstanceNotRegisteredException,
    InvalidInstanceNameException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOnPremisesInstance",
}));

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
  input: __S(800, __c50, 0) as any as S.Schema<ListApplicationRevisionsInput>,
  output: __S(801, __c50, 1) as any as S.Schema<ListApplicationRevisionsOutput>,
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
  pagination: { inputToken: "nextToken", outputToken: "nextToken", items: "revisions" } as const,
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
  input: __S(816, __c51, 0) as any as S.Schema<ListApplicationsInput>,
  output: __S(817, __c51, 1) as any as S.Schema<ListApplicationsOutput>,
  errors: [InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplications",
  pagination: { inputToken: "nextToken", outputToken: "nextToken", items: "applications" } as const,
})) as any;

export type ListDeploymentConfigsError = InvalidNextTokenException | CommonErrors;
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
  input: __S(832, __c52, 0) as any as S.Schema<ListDeploymentConfigsInput>,
  output: __S(833, __c52, 1) as any as S.Schema<ListDeploymentConfigsOutput>,
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
  input: __S(848, __c53, 0) as any as S.Schema<ListDeploymentGroupsInput>,
  output: __S(849, __c53, 1) as any as S.Schema<ListDeploymentGroupsOutput>,
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
  input: __S(864, __c54, 0) as any as S.Schema<ListDeploymentInstancesInput>,
  output: __S(865, __c54, 1) as any as S.Schema<ListDeploymentInstancesOutput>,
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
  input: __S(881, __c55, 1) as any as S.Schema<ListDeploymentsInput>,
  output: __S(882, __c55, 2) as any as S.Schema<ListDeploymentsOutput>,
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
  pagination: { inputToken: "nextToken", outputToken: "nextToken", items: "deployments" } as const,
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
  input: __S(897, __c56, 1) as any as S.Schema<ListDeploymentTargetsInput>,
  output: __S(898, __c56, 2) as any as S.Schema<ListDeploymentTargetsOutput>,
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
}));

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
  input: __S(912, __c57, 0) as any as S.Schema<ListGitHubAccountTokenNamesInput>,
  output: __S(913, __c57, 1) as any as S.Schema<ListGitHubAccountTokenNamesOutput>,
  errors: [InvalidNextTokenException, OperationNotSupportedException, ResourceValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGitHubAccountTokenNames",
}));

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
  input: __S(928, __c58, 0) as any as S.Schema<ListOnPremisesInstancesInput>,
  output: __S(929, __c58, 1) as any as S.Schema<ListOnPremisesInstancesOutput>,
  errors: [
    InvalidNextTokenException,
    InvalidRegistrationStatusException,
    InvalidTagFilterException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOnPremisesInstances",
}));

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
  input: __S(944, __c59, 0) as any as S.Schema<ListTagsForResourceInput>,
  output: __S(945, __c59, 1) as any as S.Schema<ListTagsForResourceOutput>,
  errors: [ArnNotSupportedException, InvalidArnException, ResourceArnRequiredException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

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
  input: __S(960, __c60, 0) as any as S.Schema<PutLifecycleEventHookExecutionStatusInput>,
  output: __S(961, __c60, 1) as any as S.Schema<PutLifecycleEventHookExecutionStatusOutput>,
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
}));

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
  input: __S(976, __c61, 0) as any as S.Schema<RegisterApplicationRevisionInput>,
  output: __S(48, __c3, 0) as any as S.Schema<RegisterApplicationRevisionResponse>,
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
}));

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
  input: __S(992, __c62, 0) as any as S.Schema<RegisterOnPremisesInstanceInput>,
  output: __S(48, __c3, 0) as any as S.Schema<RegisterOnPremisesInstanceResponse>,
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
}));

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
  input: __S(1008, __c63, 0) as any as S.Schema<RemoveTagsFromOnPremisesInstancesInput>,
  output: __S(48, __c3, 0) as any as S.Schema<RemoveTagsFromOnPremisesInstancesResponse>,
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
}));

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
  input: __S(1024, __c64, 0) as any as S.Schema<SkipWaitTimeForInstanceTerminationInput>,
  output: __S(48, __c3, 0) as any as S.Schema<SkipWaitTimeForInstanceTerminationResponse>,
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
}));

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
  input: __S(1040, __c65, 0) as any as S.Schema<StopDeploymentInput>,
  output: __S(1041, __c65, 1) as any as S.Schema<StopDeploymentOutput>,
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
}));

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
  input: __S(1056, __c66, 0) as any as S.Schema<TagResourceInput>,
  output: __S(48, __c3, 0) as any as S.Schema<TagResourceOutput>,
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
}));

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
  input: __S(1072, __c67, 0) as any as S.Schema<UntagResourceInput>,
  output: __S(48, __c3, 0) as any as S.Schema<UntagResourceOutput>,
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
}));

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
  input: __S(1088, __c68, 0) as any as S.Schema<UpdateApplicationInput>,
  output: __S(48, __c3, 0) as any as S.Schema<UpdateApplicationResponse>,
  errors: [
    ApplicationAlreadyExistsException,
    ApplicationDoesNotExistException,
    ApplicationNameRequiredException,
    InvalidApplicationNameException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApplication",
}));

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
  input: __S(1104, __c69, 0) as any as S.Schema<UpdateDeploymentGroupInput>,
  output: __S(608, __c38, 0) as any as S.Schema<UpdateDeploymentGroupOutput>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ tags: __S(33, __c2, 1), instanceNames: __S(16, __c1, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AddTagsToOnPremisesInstancesInput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "Tag" });
    case 1:
      return S.Array(__S(32, __c2, 0));
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "AddTagsToOnPremisesInstancesResponse",
      });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ applicationName: S.String, revisions: __S(112, __c7, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchGetApplicationRevisionsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          revisionLocation: S.optional(__S(83, __c5, 3)),
          genericRevisionInfo: S.optional(__S(96, __c6, 0)),
        }),
      ).annotate({ identifier: "RevisionInfo" });
    case 2:
      return S.Array(__S(65, __c4, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          applicationName: S.optional(S.String),
          errorMessage: S.optional(S.String),
          revisions: S.optional(__S(66, __c4, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "BatchGetApplicationRevisionsOutput" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          bucket: S.optional(S.String),
          key: S.optional(S.String),
          bundleType: S.optional(S.String),
          version: S.optional(S.String),
          eTag: S.optional(S.String),
        }),
      ).annotate({ identifier: "S3Location" });
    case 1:
      return S.suspend(() =>
        S.Struct({ repository: S.optional(S.String), commitId: S.optional(S.String) }),
      ).annotate({ identifier: "GitHubLocation" });
    case 2:
      return S.suspend(() =>
        S.Struct({ content: S.optional(S.String), sha256: S.optional(S.String) }),
      ).annotate({ identifier: "RawString" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          revisionType: S.optional(S.String),
          s3Location: S.optional(__S(80, __c5, 0)),
          gitHubLocation: S.optional(__S(81, __c5, 1)),
          string: S.optional(__S(82, __c5, 2)),
          appSpecContent: S.optional(__S(82, __c5, 2)),
        }),
      ).annotate({ identifier: "RevisionLocation" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          description: S.optional(S.String),
          deploymentGroups: S.optional(__S(16, __c1, 0)),
          firstUsedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUsedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          registerTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "GenericRevisionInfo" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(83, __c5, 3));
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ applicationNames: __S(16, __c1, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchGetApplicationsInput" });
    case 1:
      return S.Array(__S(144, __c9, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ applicationsInfo: S.optional(__S(129, __c8, 1)) }).pipe(ns),
      ).annotate({ identifier: "BatchGetApplicationsOutput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.optional(S.String),
          applicationName: S.optional(S.String),
          createTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          linkedToGitHub: S.optional(S.Boolean),
          gitHubAccountName: S.optional(S.String),
          computePlatform: S.optional(S.String),
        }),
      ).annotate({ identifier: "ApplicationInfo" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ applicationName: S.String, deploymentGroupNames: __S(16, __c1, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchGetDeploymentGroupsInput" });
    case 1:
      return S.Array(__S(289, __c18, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({
          deploymentGroupsInfo: S.optional(__S(161, __c10, 1)),
          errorMessage: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "BatchGetDeploymentGroupsOutput" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.optional(S.String) })).annotate({
        identifier: "Alarm",
      });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Key: S.optional(S.String),
          Value: S.optional(S.String),
          Type: S.optional(S.String),
        }),
      ).annotate({ identifier: "EC2TagFilter" });
    case 1:
      return S.Array(__S(208, __c13, 0));
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(176, __c11, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({
          enabled: S.optional(S.Boolean),
          ignorePollAlarmFailure: S.optional(S.Boolean),
          alarms: S.optional(__S(224, __c14, 0)),
        }),
      ).annotate({ identifier: "AlarmConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({ enabled: S.optional(S.Boolean), events: S.optional(__S(192, __c12, 0)) }),
      ).annotate({ identifier: "AutoRollbackConfiguration" });
    case 3:
      return S.Array(__S(209, __c13, 1));
    case 4:
      return S.suspend(() => S.Struct({ ec2TagSetList: S.optional(__S(227, __c14, 3)) })).annotate({
        identifier: "EC2TagSet",
      });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ deploymentType: S.optional(S.String), deploymentOption: S.optional(S.String) }),
      ).annotate({ identifier: "DeploymentStyle" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          action: S.optional(S.String),
          terminationWaitTimeInMinutes: S.optional(S.Number),
        }),
      ).annotate({ identifier: "BlueInstanceTerminationOption" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          actionOnTimeout: S.optional(S.String),
          waitTimeInMinutes: S.optional(S.Number),
        }),
      ).annotate({ identifier: "DeploymentReadyOption" });
    case 3:
      return S.suspend(() => S.Struct({ action: S.optional(S.String) })).annotate({
        identifier: "GreenFleetProvisioningOption",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          terminateBlueInstancesOnDeploymentSuccess: S.optional(__S(241, __c15, 1)),
          deploymentReadyOption: S.optional(__S(242, __c15, 2)),
          greenFleetProvisioningOption: S.optional(__S(243, __c15, 3)),
        }),
      ).annotate({ identifier: "BlueGreenDeploymentConfiguration" });
    case 5:
      return S.suspend(() => S.Struct({ listenerArns: S.optional(__S(16, __c1, 0)) })).annotate({
        identifier: "TrafficRoute",
      });
    case 6:
      return S.suspend(() =>
        S.Struct({
          targetGroups: S.optional(__S(224, __c14, 0)),
          prodTrafficRoute: S.optional(__S(245, __c15, 5)),
          testTrafficRoute: S.optional(__S(245, __c15, 5)),
        }),
      ).annotate({ identifier: "TargetGroupPairInfo" });
    case 7:
      return S.Array(__S(246, __c15, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          elbInfoList: S.optional(__S(224, __c14, 0)),
          targetGroupInfoList: S.optional(__S(224, __c14, 0)),
          targetGroupPairInfoList: S.optional(__S(247, __c15, 7)),
        }),
      ).annotate({ identifier: "LoadBalancerInfo" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          triggerName: S.optional(S.String),
          triggerTargetArn: S.optional(S.String),
          triggerEvents: S.optional(__S(192, __c12, 0)),
        }),
      ).annotate({ identifier: "TriggerConfig" });
    case 1:
      return S.Array(__S(256, __c16, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ onPremisesTagSetList: S.optional(__S(227, __c14, 3)) }),
      ).annotate({ identifier: "OnPremisesTagSet" });
    case 3:
      return S.suspend(() =>
        S.Struct({ serviceName: S.optional(S.String), clusterName: S.optional(S.String) }),
      ).annotate({ identifier: "ECSService" });
    case 4:
      return S.Array(__S(259, __c16, 3));
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          hook: S.optional(S.String),
          terminationHook: S.optional(S.String),
        }),
      ).annotate({ identifier: "AutoScalingGroup" });
    case 1:
      return S.Array(__S(272, __c17, 0));
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          deploymentId: S.optional(S.String),
          status: S.optional(S.String),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "LastDeploymentInfo" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          applicationName: S.optional(S.String),
          deploymentGroupId: S.optional(S.String),
          deploymentGroupName: S.optional(S.String),
          deploymentConfigName: S.optional(S.String),
          ec2TagFilters: S.optional(__S(209, __c13, 1)),
          onPremisesInstanceTagFilters: S.optional(__S(209, __c13, 1)),
          autoScalingGroups: S.optional(__S(273, __c17, 1)),
          serviceRoleArn: S.optional(S.String),
          targetRevision: S.optional(__S(83, __c5, 3)),
          triggerConfigurations: S.optional(__S(257, __c16, 1)),
          alarmConfiguration: S.optional(__S(225, __c14, 1)),
          autoRollbackConfiguration: S.optional(__S(226, __c14, 2)),
          deploymentStyle: S.optional(__S(240, __c15, 0)),
          outdatedInstancesStrategy: S.optional(S.String),
          blueGreenDeploymentConfiguration: S.optional(__S(244, __c15, 4)),
          loadBalancerInfo: S.optional(__S(248, __c15, 8)),
          lastSuccessfulDeployment: S.optional(__S(288, __c18, 0)),
          lastAttemptedDeployment: S.optional(__S(288, __c18, 0)),
          ec2TagSet: S.optional(__S(228, __c14, 4)),
          onPremisesTagSet: S.optional(__S(258, __c16, 2)),
          computePlatform: S.optional(S.String),
          ecsServices: S.optional(__S(260, __c16, 4)),
          terminationHookEnabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "DeploymentGroupInfo" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ deploymentId: S.String, instanceIds: __S(16, __c1, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchGetDeploymentInstancesInput" });
    case 1:
      return S.Array(__S(336, __c21, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          instancesSummary: S.optional(__S(305, __c19, 1)),
          errorMessage: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "BatchGetDeploymentInstancesOutput" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          errorCode: S.optional(S.String),
          scriptName: S.optional(S.String),
          message: S.optional(S.String),
          logTail: S.optional(S.String),
        }),
      ).annotate({ identifier: "Diagnostics" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          lifecycleEventName: S.optional(S.String),
          diagnostics: S.optional(__S(320, __c20, 0)),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          status: S.optional(S.String),
        }),
      ).annotate({ identifier: "LifecycleEvent" });
    case 2:
      return S.Array(__S(321, __c20, 1));
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          deploymentId: S.optional(S.String),
          instanceId: S.optional(S.String),
          status: S.optional(S.String),
          lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lifecycleEvents: S.optional(__S(322, __c20, 2)),
          instanceType: S.optional(S.String),
        }),
      ).annotate({ identifier: "InstanceSummary" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ deploymentIds: __S(16, __c1, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchGetDeploymentsInput" });
    case 1:
      return S.Array(__S(388, __c24, 4));
    case 2:
      return S.suspend(() =>
        S.Struct({ deploymentsInfo: S.optional(__S(353, __c22, 1)) }).pipe(ns),
      ).annotate({ identifier: "BatchGetDeploymentsOutput" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          tagFilters: S.optional(__S(209, __c13, 1)),
          autoScalingGroups: S.optional(__S(16, __c1, 0)),
          ec2TagSet: S.optional(__S(228, __c14, 4)),
        }),
      ).annotate({ identifier: "TargetInstances" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ code: S.optional(S.String), message: S.optional(S.String) }),
      ).annotate({ identifier: "ErrorInformation" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Pending: S.optional(S.Number),
          InProgress: S.optional(S.Number),
          Succeeded: S.optional(S.Number),
          Failed: S.optional(S.Number),
          Skipped: S.optional(S.Number),
          Ready: S.optional(S.Number),
        }),
      ).annotate({ identifier: "DeploymentOverview" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          rollbackDeploymentId: S.optional(S.String),
          rollbackTriggeringDeploymentId: S.optional(S.String),
          rollbackMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "RollbackInfo" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          autoUpdateOutdatedInstancesRootDeploymentId: S.optional(S.String),
          autoUpdateOutdatedInstancesDeploymentIds: S.optional(__S(16, __c1, 0)),
        }),
      ).annotate({ identifier: "RelatedDeployments" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          applicationName: S.optional(S.String),
          deploymentGroupName: S.optional(S.String),
          deploymentConfigName: S.optional(S.String),
          deploymentId: S.optional(S.String),
          previousRevision: S.optional(__S(83, __c5, 3)),
          revision: S.optional(__S(83, __c5, 3)),
          status: S.optional(S.String),
          errorInformation: S.optional(__S(384, __c24, 0)),
          createTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          completeTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          deploymentOverview: S.optional(__S(385, __c24, 1)),
          description: S.optional(S.String),
          creator: S.optional(S.String),
          ignoreApplicationStopFailures: S.optional(S.Boolean),
          autoRollbackConfiguration: S.optional(__S(226, __c14, 2)),
          updateOutdatedInstancesOnly: S.optional(S.Boolean),
          rollbackInfo: S.optional(__S(386, __c24, 2)),
          deploymentStyle: S.optional(__S(240, __c15, 0)),
          targetInstances: S.optional(__S(368, __c23, 0)),
          instanceTerminationWaitTimeStarted: S.optional(S.Boolean),
          blueGreenDeploymentConfiguration: S.optional(__S(244, __c15, 4)),
          loadBalancerInfo: S.optional(__S(248, __c15, 8)),
          additionalDeploymentStatusInfo: S.optional(S.String),
          fileExistsBehavior: S.optional(S.String),
          deploymentMode: S.optional(S.String),
          deploymentStatusMessages: S.optional(__S(16, __c1, 0)),
          computePlatform: S.optional(S.String),
          externalId: S.optional(S.String),
          relatedDeployments: S.optional(__S(387, __c24, 3)),
          overrideAlarmConfiguration: S.optional(__S(225, __c14, 1)),
        }),
      ).annotate({ identifier: "DeploymentInfo" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ deploymentId: S.String, targetIds: __S(16, __c1, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchGetDeploymentTargetsInput" });
    case 1:
      return S.Array(__S(423, __c26, 7));
    case 2:
      return S.suspend(() =>
        S.Struct({ deploymentTargets: S.optional(__S(401, __c25, 1)) }).pipe(ns),
      ).annotate({ identifier: "BatchGetDeploymentTargetsOutput" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          deploymentId: S.optional(S.String),
          targetId: S.optional(S.String),
          targetArn: S.optional(S.String),
          status: S.optional(S.String),
          lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lifecycleEvents: S.optional(__S(322, __c20, 2)),
          instanceLabel: S.optional(S.String),
        }),
      ).annotate({ identifier: "InstanceTarget" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          functionName: S.optional(S.String),
          functionAlias: S.optional(S.String),
          currentVersion: S.optional(S.String),
          targetVersion: S.optional(S.String),
          targetVersionWeight: S.optional(S.Number),
        }),
      ).annotate({ identifier: "LambdaFunctionInfo" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          deploymentId: S.optional(S.String),
          targetId: S.optional(S.String),
          targetArn: S.optional(S.String),
          status: S.optional(S.String),
          lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lifecycleEvents: S.optional(__S(322, __c20, 2)),
          lambdaFunctionInfo: S.optional(__S(417, __c26, 1)),
        }),
      ).annotate({ identifier: "LambdaTarget" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          identifer: S.optional(S.String),
          desiredCount: S.optional(S.Number),
          pendingCount: S.optional(S.Number),
          runningCount: S.optional(S.Number),
          status: S.optional(S.String),
          trafficWeight: S.optional(S.Number),
          targetGroup: S.optional(__S(176, __c11, 0)),
          taskSetLabel: S.optional(S.String),
        }),
      ).annotate({ identifier: "ECSTaskSet" });
    case 4:
      return S.Array(__S(419, __c26, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          deploymentId: S.optional(S.String),
          targetId: S.optional(S.String),
          targetArn: S.optional(S.String),
          lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lifecycleEvents: S.optional(__S(322, __c20, 2)),
          status: S.optional(S.String),
          taskSetsInfo: S.optional(__S(420, __c26, 4)),
        }),
      ).annotate({ identifier: "ECSTarget" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          deploymentId: S.optional(S.String),
          targetId: S.optional(S.String),
          lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lifecycleEvents: S.optional(__S(322, __c20, 2)),
          status: S.optional(S.String),
          resourceType: S.optional(S.String),
          targetVersionWeight: S.optional(S.Number),
        }),
      ).annotate({ identifier: "CloudFormationTarget" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          deploymentTargetType: S.optional(S.String),
          instanceTarget: S.optional(__S(416, __c26, 0)),
          lambdaTarget: S.optional(__S(418, __c26, 2)),
          ecsTarget: S.optional(__S(421, __c26, 5)),
          cloudFormationTarget: S.optional(__S(422, __c26, 6)),
        }),
      ).annotate({ identifier: "DeploymentTarget" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ instanceNames: __S(16, __c1, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchGetOnPremisesInstancesInput" });
    case 1:
      return S.Array(__S(448, __c28, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ instanceInfos: S.optional(__S(433, __c27, 1)) }).pipe(ns),
      ).annotate({ identifier: "BatchGetOnPremisesInstancesOutput" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceName: S.optional(S.String),
          iamSessionArn: S.optional(S.String),
          iamUserArn: S.optional(S.String),
          instanceArn: S.optional(S.String),
          registerTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          deregisterTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          tags: S.optional(__S(33, __c2, 1)),
        }),
      ).annotate({ identifier: "InstanceInfo" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          deploymentId: S.optional(S.String),
          deploymentWaitType: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ContinueDeploymentInput" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationName: S.String,
          computePlatform: S.optional(S.String),
          tags: S.optional(__S(33, __c2, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateApplicationInput" });
    case 1:
      return S.suspend(() => S.Struct({ applicationId: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "CreateApplicationOutput",
      });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationName: S.String,
          deploymentGroupName: S.optional(S.String),
          revision: S.optional(__S(83, __c5, 3)),
          deploymentConfigName: S.optional(S.String),
          description: S.optional(S.String),
          ignoreApplicationStopFailures: S.optional(S.Boolean),
          targetInstances: S.optional(__S(368, __c23, 0)),
          autoRollbackConfiguration: S.optional(__S(226, __c14, 2)),
          updateOutdatedInstancesOnly: S.optional(S.Boolean),
          fileExistsBehavior: S.optional(S.String),
          deploymentMode: S.optional(S.String),
          overrideAlarmConfiguration: S.optional(__S(225, __c14, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDeploymentInput" });
    case 1:
      return S.suspend(() => S.Struct({ deploymentId: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "CreateDeploymentOutput",
      });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          deploymentConfigName: S.String,
          minimumHealthyHosts: S.optional(__S(528, __c33, 0)),
          trafficRoutingConfig: S.optional(__S(531, __c33, 3)),
          computePlatform: S.optional(S.String),
          zonalConfig: S.optional(__S(532, __c33, 4)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDeploymentConfigInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ deploymentConfigId: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "CreateDeploymentConfigOutput" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ type: S.optional(S.String), value: S.optional(S.Number) }),
      ).annotate({ identifier: "MinimumHealthyHosts" });
    case 1:
      return S.suspend(() =>
        S.Struct({ canaryPercentage: S.optional(S.Number), canaryInterval: S.optional(S.Number) }),
      ).annotate({ identifier: "TimeBasedCanary" });
    case 2:
      return S.suspend(() =>
        S.Struct({ linearPercentage: S.optional(S.Number), linearInterval: S.optional(S.Number) }),
      ).annotate({ identifier: "TimeBasedLinear" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          timeBasedCanary: S.optional(__S(529, __c33, 1)),
          timeBasedLinear: S.optional(__S(530, __c33, 2)),
        }),
      ).annotate({ identifier: "TrafficRoutingConfig" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          firstZoneMonitorDurationInSeconds: S.optional(S.Number),
          monitorDurationInSeconds: S.optional(S.Number),
          minimumHealthyHostsPerZone: S.optional(__S(528, __c33, 0)),
        }),
      ).annotate({ identifier: "ZonalConfig" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationName: S.String,
          deploymentGroupName: S.String,
          deploymentConfigName: S.optional(S.String),
          ec2TagFilters: S.optional(__S(209, __c13, 1)),
          onPremisesInstanceTagFilters: S.optional(__S(209, __c13, 1)),
          autoScalingGroups: S.optional(__S(16, __c1, 0)),
          serviceRoleArn: S.String,
          triggerConfigurations: S.optional(__S(257, __c16, 1)),
          alarmConfiguration: S.optional(__S(225, __c14, 1)),
          autoRollbackConfiguration: S.optional(__S(226, __c14, 2)),
          outdatedInstancesStrategy: S.optional(S.String),
          deploymentStyle: S.optional(__S(240, __c15, 0)),
          blueGreenDeploymentConfiguration: S.optional(__S(244, __c15, 4)),
          loadBalancerInfo: S.optional(__S(248, __c15, 8)),
          ec2TagSet: S.optional(__S(228, __c14, 4)),
          ecsServices: S.optional(__S(260, __c16, 4)),
          onPremisesTagSet: S.optional(__S(258, __c16, 2)),
          tags: S.optional(__S(33, __c2, 1)),
          terminationHookEnabled: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDeploymentGroupInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ deploymentGroupId: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "CreateDeploymentGroupOutput" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ applicationName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteApplicationInput" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ deploymentConfigName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDeploymentConfigInput" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ applicationName: S.String, deploymentGroupName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDeploymentGroupInput" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ hooksNotCleanedUp: S.optional(__S(273, __c17, 1)) }).pipe(ns),
      ).annotate({ identifier: "DeleteDeploymentGroupOutput" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ tokenName: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteGitHubAccountTokenInput" });
    case 1:
      return S.suspend(() => S.Struct({ tokenName: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "DeleteGitHubAccountTokenOutput",
      });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ externalId: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteResourcesByExternalIdInput" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ instanceName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeregisterOnPremisesInstanceInput" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ applicationName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetApplicationInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ application: S.optional(__S(144, __c9, 0)) }).pipe(ns),
      ).annotate({ identifier: "GetApplicationOutput" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ applicationName: S.String, revision: __S(83, __c5, 3) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetApplicationRevisionInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          applicationName: S.optional(S.String),
          revision: S.optional(__S(83, __c5, 3)),
          revisionInfo: S.optional(__S(96, __c6, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "GetApplicationRevisionOutput" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ deploymentId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetDeploymentInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ deploymentInfo: S.optional(__S(388, __c24, 4)) }).pipe(ns),
      ).annotate({ identifier: "GetDeploymentOutput" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ deploymentConfigName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetDeploymentConfigInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          deploymentConfigId: S.optional(S.String),
          deploymentConfigName: S.optional(S.String),
          minimumHealthyHosts: S.optional(__S(528, __c33, 0)),
          createTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          computePlatform: S.optional(S.String),
          trafficRoutingConfig: S.optional(__S(531, __c33, 3)),
          zonalConfig: S.optional(__S(532, __c33, 4)),
        }),
      ).annotate({ identifier: "DeploymentConfigInfo" });
    case 2:
      return S.suspend(() =>
        S.Struct({ deploymentConfigInfo: S.optional(__S(721, __c45, 1)) }).pipe(ns),
      ).annotate({ identifier: "GetDeploymentConfigOutput" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ applicationName: S.String, deploymentGroupName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetDeploymentGroupInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ deploymentGroupInfo: S.optional(__S(289, __c18, 1)) }).pipe(ns),
      ).annotate({ identifier: "GetDeploymentGroupOutput" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ deploymentId: S.String, instanceId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetDeploymentInstanceInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ instanceSummary: S.optional(__S(336, __c21, 0)) }).pipe(ns),
      ).annotate({ identifier: "GetDeploymentInstanceOutput" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ deploymentId: S.String, targetId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetDeploymentTargetInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ deploymentTarget: S.optional(__S(423, __c26, 7)) }).pipe(ns),
      ).annotate({ identifier: "GetDeploymentTargetOutput" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ instanceName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetOnPremisesInstanceInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ instanceInfo: S.optional(__S(448, __c28, 0)) }).pipe(ns),
      ).annotate({ identifier: "GetOnPremisesInstanceOutput" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationName: S.String,
          sortBy: S.optional(S.String),
          sortOrder: S.optional(S.String),
          s3Bucket: S.optional(S.String),
          s3KeyPrefix: S.optional(S.String),
          deployed: S.optional(S.String),
          nextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListApplicationRevisionsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          revisions: S.optional(__S(112, __c7, 0)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListApplicationRevisionsOutput" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListApplicationsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          applications: S.optional(__S(16, __c1, 0)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListApplicationsOutput" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListDeploymentConfigsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          deploymentConfigsList: S.optional(__S(16, __c1, 0)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListDeploymentConfigsOutput" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ applicationName: S.String, nextToken: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListDeploymentGroupsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          applicationName: S.optional(S.String),
          deploymentGroups: S.optional(__S(16, __c1, 0)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListDeploymentGroupsOutput" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          deploymentId: S.String,
          nextToken: S.optional(S.String),
          instanceStatusFilter: S.optional(__S(192, __c12, 0)),
          instanceTypeFilter: S.optional(__S(192, __c12, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDeploymentInstancesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          instancesList: S.optional(__S(16, __c1, 0)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListDeploymentInstancesOutput" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          start: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          end: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "TimeRange" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          applicationName: S.optional(S.String),
          deploymentGroupName: S.optional(S.String),
          externalId: S.optional(S.String),
          includeOnlyStatuses: S.optional(__S(192, __c12, 0)),
          createTimeRange: S.optional(__S(880, __c55, 0)),
          nextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDeploymentsInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          deployments: S.optional(__S(16, __c1, 0)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListDeploymentsOutput" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ __S(16, __c1, 0).pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({
          deploymentId: S.String,
          nextToken: S.optional(S.String),
          targetFilters: S.optional(__S(896, __c56, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDeploymentTargetsInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({ targetIds: S.optional(__S(16, __c1, 0)), nextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "ListDeploymentTargetsOutput" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListGitHubAccountTokenNamesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          tokenNameList: S.optional(__S(16, __c1, 0)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListGitHubAccountTokenNamesOutput" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          registrationStatus: S.optional(S.String),
          tagFilters: S.optional(__S(209, __c13, 1)),
          nextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListOnPremisesInstancesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          instanceNames: S.optional(__S(16, __c1, 0)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListOnPremisesInstancesOutput" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, NextToken: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Tags: S.optional(__S(33, __c2, 1)), NextToken: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "ListTagsForResourceOutput" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          deploymentId: S.optional(S.String),
          lifecycleEventHookExecutionId: S.optional(S.String),
          status: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutLifecycleEventHookExecutionStatusInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ lifecycleEventHookExecutionId: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "PutLifecycleEventHookExecutionStatusOutput" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationName: S.String,
          description: S.optional(S.String),
          revision: __S(83, __c5, 3),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RegisterApplicationRevisionInput" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceName: S.String,
          iamSessionArn: S.optional(S.String),
          iamUserArn: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RegisterOnPremisesInstanceInput" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ tags: __S(33, __c2, 1), instanceNames: __S(16, __c1, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RemoveTagsFromOnPremisesInstancesInput" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ deploymentId: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "SkipWaitTimeForInstanceTerminationInput" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ deploymentId: S.String, autoRollbackEnabled: S.optional(S.Boolean) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopDeploymentInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ status: S.optional(S.String), statusMessage: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "StopDeploymentOutput" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, Tags: __S(33, __c2, 1) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceInput" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, TagKeys: __S(16, __c1, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceInput" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationName: S.optional(S.String),
          newApplicationName: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateApplicationInput" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationName: S.String,
          currentDeploymentGroupName: S.String,
          newDeploymentGroupName: S.optional(S.String),
          deploymentConfigName: S.optional(S.String),
          ec2TagFilters: S.optional(__S(209, __c13, 1)),
          onPremisesInstanceTagFilters: S.optional(__S(209, __c13, 1)),
          autoScalingGroups: S.optional(__S(16, __c1, 0)),
          serviceRoleArn: S.optional(S.String),
          triggerConfigurations: S.optional(__S(257, __c16, 1)),
          alarmConfiguration: S.optional(__S(225, __c14, 1)),
          autoRollbackConfiguration: S.optional(__S(226, __c14, 2)),
          outdatedInstancesStrategy: S.optional(S.String),
          deploymentStyle: S.optional(__S(240, __c15, 0)),
          blueGreenDeploymentConfiguration: S.optional(__S(244, __c15, 4)),
          loadBalancerInfo: S.optional(__S(248, __c15, 8)),
          ec2TagSet: S.optional(__S(228, __c14, 4)),
          ecsServices: S.optional(__S(260, __c16, 4)),
          onPremisesTagSet: S.optional(__S(258, __c16, 2)),
          terminationHookEnabled: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateDeploymentGroupInput" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
