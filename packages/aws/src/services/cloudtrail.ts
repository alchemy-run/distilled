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
  sdkId: "CloudTrail",
  target: "CloudTrail_20131101",
  version: "2013-11-01",
  sigv4: "cloudtrail",
  protocol: awsJson1_1Protocol,
  xmlns: "http://cloudtrail.amazonaws.com/doc/2013-11-01/",
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
                `https://cloudtrail-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              if (Region === "us-gov-east-1") {
                return e("https://cloudtrail.us-gov-east-1.amazonaws.com");
              }
              if (Region === "us-gov-west-1") {
                return e("https://cloudtrail.us-gov-west-1.amazonaws.com");
              }
              return e(
                `https://cloudtrail-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://cloudtrail.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://cloudtrail.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"], {
    code: "ResourceAccessDenied",
    status: 403,
  })<{ readonly message?: string }> {}
export class AccountHasOngoingImportException
  extends /*@__PURE__*/ TE.TaggedError(
    "AccountHasOngoingImportException",
    ["BadRequestError"],
    { code: "AccountHasOngoingImport", status: 400 },
  )<{ readonly message?: string }> {}
export class AccountNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "AccountNotFoundException",
    ["BadRequestError"],
    { code: "AccountNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class AccountNotRegisteredException
  extends /*@__PURE__*/ TE.TaggedError(
    "AccountNotRegisteredException",
    ["BadRequestError"],
    { code: "AccountNotRegistered", status: 400 },
  )<{ readonly message?: string }> {}
export class AccountRegisteredException
  extends /*@__PURE__*/ TE.TaggedError(
    "AccountRegisteredException",
    ["BadRequestError"],
    { code: "AccountRegistered", status: 400 },
  )<{ readonly message?: string }> {}
export class CannotDelegateManagementAccountException
  extends /*@__PURE__*/ TE.TaggedError(
    "CannotDelegateManagementAccountException",
    ["BadRequestError"],
    { code: "CannotDelegateManagementAccount", status: 400 },
  )<{ readonly message?: string }> {}
export class ChannelAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "ChannelAlreadyExistsException",
    ["BadRequestError", "AlreadyExistsError"],
    { code: "ChannelAlreadyExists", status: 400 },
  )<{ readonly message?: string }> {}
export class ChannelARNInvalidException
  extends /*@__PURE__*/ TE.TaggedError(
    "ChannelARNInvalidException",
    ["BadRequestError"],
    { code: "ChannelARNInvalid", status: 400 },
  )<{ readonly message?: string }> {}
export class ChannelExistsForEDSException
  extends /*@__PURE__*/ TE.TaggedError(
    "ChannelExistsForEDSException",
    ["BadRequestError"],
    { code: "ChannelExistsForEDS", status: 400 },
  )<{ readonly message?: string }> {}
export class ChannelMaxLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ChannelMaxLimitExceededException",
    ["BadRequestError"],
    { code: "ChannelMaxLimitExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class ChannelNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ChannelNotFoundException",
    ["BadRequestError"],
    { code: "ChannelNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class CloudTrailAccessNotEnabledException
  extends /*@__PURE__*/ TE.TaggedError(
    "CloudTrailAccessNotEnabledException",
    ["BadRequestError"],
    { code: "CloudTrailAccessNotEnabled", status: 400 },
  )<{ readonly message?: string }> {}
export class CloudTrailARNInvalidException
  extends /*@__PURE__*/ TE.TaggedError(
    "CloudTrailARNInvalidException",
    ["BadRequestError"],
    { code: "CloudTrailARNInvalid", status: 400 },
  )<{ readonly message?: string }> {}
export class CloudTrailInvalidClientTokenIdException
  extends /*@__PURE__*/ TE.TaggedError(
    "CloudTrailInvalidClientTokenIdException",
    ["BadRequestError"],
    { code: "CloudTrailInvalidClientTokenId", status: 400 },
  )<{ readonly message?: string }> {}
export class CloudTrailLakeOnboardingClosed
  extends /*@__PURE__*/ TE.TaggedError(
    "CloudTrailLakeOnboardingClosed",
    ["BadRequestError"],
    {
      synthetic: {
        from: "InvalidParameterException",
        message: { includes: "no longer accepting new customers" },
      },
    },
  )<{ readonly message?: string }> {}
export class CloudWatchLogsDeliveryUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "CloudWatchLogsDeliveryUnavailableException",
    ["BadRequestError"],
    { code: "CloudWatchLogsDeliveryUnavailable", status: 400 },
  )<{ readonly message?: string }> {}
export class ConcurrentModificationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ConcurrentModificationException",
    ["BadRequestError"],
    { code: "ConcurrentModification", status: 400 },
  )<{ readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string }> {}
export class DelegatedAdminAccountLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "DelegatedAdminAccountLimitExceededException",
    ["BadRequestError"],
    { code: "DelegatedAdminAccountLimitExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class EventDataStoreAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "EventDataStoreAlreadyExistsException",
    ["BadRequestError", "AlreadyExistsError"],
    { code: "EventDataStoreAlreadyExists", status: 400 },
  )<{ readonly message?: string }> {}
export class EventDataStoreARNInvalidException
  extends /*@__PURE__*/ TE.TaggedError(
    "EventDataStoreARNInvalidException",
    ["BadRequestError"],
    { code: "EventDataStoreARNInvalid", status: 400 },
  )<{ readonly message?: string }> {}
export class EventDataStoreFederationEnabledException
  extends /*@__PURE__*/ TE.TaggedError(
    "EventDataStoreFederationEnabledException",
    ["BadRequestError"],
    { code: "EventDataStoreFederationEnabled", status: 400 },
  )<{ readonly message?: string }> {}
export class EventDataStoreHasOngoingImportException
  extends /*@__PURE__*/ TE.TaggedError(
    "EventDataStoreHasOngoingImportException",
    ["BadRequestError"],
    { code: "EventDataStoreHasOngoingImport", status: 400 },
  )<{ readonly message?: string }> {}
export class EventDataStoreMaxLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "EventDataStoreMaxLimitExceededException",
    ["BadRequestError"],
    { code: "EventDataStoreMaxLimitExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class EventDataStoreNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "EventDataStoreNotFoundException",
    ["BadRequestError"],
    { code: "EventDataStoreNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class EventDataStoreTerminationProtectedException
  extends /*@__PURE__*/ TE.TaggedError(
    "EventDataStoreTerminationProtectedException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class GenerateResponseException
  extends /*@__PURE__*/ TE.TaggedError(
    "GenerateResponseException",
    ["BadRequestError"],
    { code: "GenerateResponse", status: 400 },
  )<{ readonly message?: string }> {}
export class ImportNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ImportNotFoundException",
    ["BadRequestError"],
    { code: "ImportNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class InactiveEventDataStoreException
  extends /*@__PURE__*/ TE.TaggedError(
    "InactiveEventDataStoreException",
    ["BadRequestError"],
    { code: "InactiveEventDataStore", status: 400 },
  )<{ readonly message?: string }> {}
export class InactiveQueryException
  extends /*@__PURE__*/ TE.TaggedError(
    "InactiveQueryException",
    ["BadRequestError"],
    { code: "InactiveQuery", status: 400 },
  )<{ readonly message?: string }> {}
export class InsightNotEnabledException
  extends /*@__PURE__*/ TE.TaggedError(
    "InsightNotEnabledException",
    ["BadRequestError"],
    { code: "InsightNotEnabled", status: 400 },
  )<{ readonly message?: string }> {}
export class InsufficientDependencyServiceAccessPermissionException
  extends /*@__PURE__*/ TE.TaggedError(
    "InsufficientDependencyServiceAccessPermissionException",
    ["BadRequestError"],
    { code: "InsufficientDependencyServiceAccessPermission", status: 400 },
  )<{ readonly message?: string }> {}
export class InsufficientEncryptionPolicyException
  extends /*@__PURE__*/ TE.TaggedError(
    "InsufficientEncryptionPolicyException",
    ["BadRequestError"],
    { code: "InsufficientEncryptionPolicy", status: 400 },
  )<{ readonly message?: string }> {}
export class InsufficientIAMAccessPermissionException
  extends /*@__PURE__*/ TE.TaggedError(
    "InsufficientIAMAccessPermissionException",
    ["BadRequestError"],
    { code: "InsufficientIAMAccessPermission", status: 400 },
  )<{ readonly message?: string }> {}
export class InsufficientS3BucketPolicyException
  extends /*@__PURE__*/ TE.TaggedError(
    "InsufficientS3BucketPolicyException",
    ["AuthError"],
    { code: "InsufficientS3BucketPolicy", status: 403 },
  )<{ readonly message?: string }> {}
export class InsufficientSnsTopicPolicyException
  extends /*@__PURE__*/ TE.TaggedError(
    "InsufficientSnsTopicPolicyException",
    ["AuthError"],
    { code: "InsufficientSnsTopicPolicy", status: 403 },
  )<{ readonly message?: string }> {}
export class InvalidCloudWatchLogsLogGroupArnException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidCloudWatchLogsLogGroupArnException",
    ["BadRequestError"],
    { code: "InvalidCloudWatchLogsLogGroupArn", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidCloudWatchLogsRoleArnException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidCloudWatchLogsRoleArnException",
    ["BadRequestError"],
    { code: "InvalidCloudWatchLogsRoleArn", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidDateRangeException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidDateRangeException",
    ["BadRequestError"],
    { code: "InvalidDateRange", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidEventCategoryException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidEventCategoryException",
    ["BadRequestError"],
    { code: "InvalidEventCategory", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidEventDataStoreCategoryException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidEventDataStoreCategoryException",
    ["BadRequestError"],
    { code: "InvalidEventDataStoreCategory", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidEventDataStoreStatusException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidEventDataStoreStatusException",
    ["BadRequestError"],
    { code: "InvalidEventDataStoreStatus", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidEventSelectorsException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidEventSelectorsException",
    ["BadRequestError"],
    { code: "InvalidEventSelectors", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidHomeRegionException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidHomeRegionException",
    ["BadRequestError"],
    { code: "InvalidHomeRegion", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidImportSourceException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidImportSourceException",
    ["BadRequestError"],
    { code: "InvalidImportSource", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidInsightSelectorsException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidInsightSelectorsException",
    ["BadRequestError"],
    { code: "InvalidInsightSelectors", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidKmsKeyIdException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidKmsKeyIdException",
    ["BadRequestError"],
    { code: "InvalidKmsKeyId", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidLookupAttributesException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidLookupAttributesException",
    ["BadRequestError"],
    { code: "InvalidLookupAttributes", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidMaxResultsException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidMaxResultsException",
    ["BadRequestError"],
    { code: "InvalidMaxResults", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidNextTokenException",
    ["BadRequestError"],
    { code: "InvalidNextToken", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidParameterCombinationException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidParameterCombinationException",
    ["BadRequestError"],
    { code: "InvalidParameterCombinationError", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidParameterException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidParameterException",
    ["BadRequestError"],
    { code: "InvalidParameter", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidQueryStatementException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidQueryStatementException",
    ["BadRequestError"],
    { code: "InvalidQueryStatement", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidQueryStatusException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidQueryStatusException",
    ["BadRequestError"],
    { code: "InvalidQueryStatus", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidS3BucketNameException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidS3BucketNameException",
    ["BadRequestError"],
    { code: "InvalidS3BucketName", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidS3PrefixException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidS3PrefixException",
    ["BadRequestError"],
    { code: "InvalidS3Prefix", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidSnsTopicNameException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidSnsTopicNameException",
    ["BadRequestError"],
    { code: "InvalidSnsTopicName", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidSourceException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidSourceException",
    ["BadRequestError"],
    { code: "InvalidSource", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidTagParameterException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidTagParameterException",
    ["BadRequestError"],
    { code: "InvalidTagParameter", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidTimeRangeException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidTimeRangeException",
    ["BadRequestError"],
    { code: "InvalidTimeRange", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidTokenException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidTokenException",
    ["BadRequestError"],
    { code: "InvalidToken", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidTrailNameException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidTrailNameException",
    ["BadRequestError"],
    { code: "InvalidTrailName", status: 400 },
  )<{ readonly message?: string }> {}
export class KmsException
  extends /*@__PURE__*/ TE.TaggedError("KmsException", ["BadRequestError"], {
    status: 400,
  })<{ readonly message?: string }> {}
export class KmsKeyDisabledException
  extends /*@__PURE__*/ TE.TaggedError(
    "KmsKeyDisabledException",
    ["BadRequestError"],
    { code: "KmsKeyDisabled", status: 400 },
  )<{ readonly message?: string }> {}
export class KmsKeyNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "KmsKeyNotFoundException",
    ["BadRequestError"],
    { code: "KmsKeyNotFound", status: 400 },
  )<{ readonly message?: string }> {}
export class MaxConcurrentQueriesException
  extends /*@__PURE__*/ TE.TaggedError(
    "MaxConcurrentQueriesException",
    ["ThrottlingError"],
    { code: "MaxConcurrentQueries", status: 429 },
  )<{ readonly message?: string }> {}
export class MaximumNumberOfTrailsExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "MaximumNumberOfTrailsExceededException",
    ["AuthError"],
    { code: "MaximumNumberOfTrailsExceeded", status: 403 },
  )<{ readonly message?: string }> {}
export class NoManagementAccountSLRExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "NoManagementAccountSLRExistsException",
    ["AuthError"],
    { code: "NoManagementAccountSLRExists", status: 403 },
  )<{ readonly message?: string }> {}
export class NotOrganizationManagementAccountException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotOrganizationManagementAccountException",
    ["AuthError"],
    { code: "NotOrganizationManagementAccount", status: 403 },
  )<{ readonly message?: string }> {}
export class NotOrganizationMasterAccountException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotOrganizationMasterAccountException",
    ["BadRequestError"],
    { code: "NotOrganizationMasterAccount", status: 400 },
  )<{ readonly message?: string }> {}
export class OperationNotPermittedException
  extends /*@__PURE__*/ TE.TaggedError(
    "OperationNotPermittedException",
    ["BadRequestError"],
    { code: "OperationNotPermitted", status: 400 },
  )<{ readonly message?: string }> {}
export class OrganizationNotInAllFeaturesModeException
  extends /*@__PURE__*/ TE.TaggedError(
    "OrganizationNotInAllFeaturesModeException",
    ["BadRequestError"],
    { code: "OrganizationNotInAllFeaturesMode", status: 400 },
  )<{ readonly message?: string }> {}
export class OrganizationsNotInUseException
  extends /*@__PURE__*/ TE.TaggedError(
    "OrganizationsNotInUseException",
    ["BadRequestError"],
    { code: "OrganizationsNotInUse", status: 404 },
  )<{ readonly message?: string }> {}
export class QueryIdNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "QueryIdNotFoundException",
    ["BadRequestError"],
    { code: "QueryIdNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class ResourceARNNotValidException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceARNNotValidException",
    ["BadRequestError"],
    { code: "ResourceARNNotValid", status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { code: "ResourceNotFound", status: 400 },
  )<{ readonly message?: string }> {}
export class ResourcePolicyNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourcePolicyNotFoundException",
    ["BadRequestError"],
    { code: "ResourcePolicyNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class ResourcePolicyNotValidException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourcePolicyNotValidException",
    ["BadRequestError"],
    { code: "ResourcePolicyNotValid", status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceTypeNotSupportedException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceTypeNotSupportedException",
    ["BadRequestError"],
    { code: "ResourceTypeNotSupported", status: 400 },
  )<{ readonly message?: string }> {}
export class S3BucketDoesNotExistException
  extends /*@__PURE__*/ TE.TaggedError(
    "S3BucketDoesNotExistException",
    ["BadRequestError"],
    { code: "S3BucketDoesNotExist", status: 404 },
  )<{ readonly message?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["BadRequestError"],
    { code: "ServiceQuotaExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class TagsLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "TagsLimitExceededException",
    ["BadRequestError"],
    { code: "TagsLimitExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class TrailAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TrailAlreadyExistsException",
    ["BadRequestError", "AlreadyExistsError"],
    { code: "TrailAlreadyExists", status: 400 },
  )<{ readonly message?: string }> {}
export class TrailNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "TrailNotFoundException",
    ["BadRequestError"],
    { code: "TrailNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class TrailNotProvidedException
  extends /*@__PURE__*/ TE.TaggedError(
    "TrailNotProvidedException",
    ["BadRequestError"],
    { code: "TrailNotProvided", status: 404 },
  )<{ readonly message?: string }> {}
export class UnsupportedOperationException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnsupportedOperationException",
    ["BadRequestError"],
    { code: "UnsupportedOperation", status: 400 },
  )<{ readonly message?: string }> {}
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value?: string;
}
export type TagsList = Tag[];
export interface AddTagsRequest {
  ResourceId: string;
  TagsList: Tag[];
}
export interface AddTagsResponse {}
export type EventDataStoreArn = string;
export type UUID = string;
export type AccountId = string;
export interface CancelQueryRequest {
  EventDataStore?: string;
  QueryId: string;
  EventDataStoreOwnerAccountId?: string;
}
export type QueryStatus =
  | "QUEUED"
  | "RUNNING"
  | "FINISHED"
  | "FAILED"
  | "CANCELLED"
  | "TIMED_OUT"
  | (string & {});
export interface CancelQueryResponse {
  QueryId: string;
  QueryStatus: QueryStatus;
  EventDataStoreOwnerAccountId?: string;
}
export type ChannelName = string;
export type Source = string;
export type DestinationType =
  | "EVENT_DATA_STORE"
  | "AWS_SERVICE"
  | (string & {});
export type Location = string;
export interface Destination {
  Type: DestinationType;
  Location: string;
}
export type Destinations = Destination[];
export interface CreateChannelRequest {
  Name: string;
  Source: string;
  Destinations: Destination[];
  Tags?: Tag[];
}
export type ChannelArn = string;
export interface CreateChannelResponse {
  ChannelArn?: string;
  Name?: string;
  Source?: string;
  Destinations?: Destination[];
  Tags?: Tag[];
}
export type DashboardName = string;
export type RefreshScheduleFrequencyUnit = "HOURS" | "DAYS" | (string & {});
export type RefreshScheduleFrequencyValue = number;
export interface RefreshScheduleFrequency {
  Unit?: RefreshScheduleFrequencyUnit;
  Value?: number;
}
export type RefreshScheduleStatus = "ENABLED" | "DISABLED" | (string & {});
export type TimeOfDay = string;
export interface RefreshSchedule {
  Frequency?: RefreshScheduleFrequency;
  Status?: RefreshScheduleStatus;
  TimeOfDay?: string;
}
export type TerminationProtectionEnabled = boolean;
export type QueryStatement = string;
export type QueryParameter = string;
export type QueryParameters = string[];
export type ViewPropertiesKey = string;
export type ViewPropertiesValue = string;
export type ViewPropertiesMap = { [key: string]: string | undefined };
export interface RequestWidget {
  QueryStatement: string;
  QueryParameters?: string[];
  ViewProperties: { [key: string]: string | undefined };
}
export type RequestWidgetList = RequestWidget[];
export interface CreateDashboardRequest {
  Name: string;
  RefreshSchedule?: RefreshSchedule;
  TagsList?: Tag[];
  TerminationProtectionEnabled?: boolean;
  Widgets?: RequestWidget[];
}
export type DashboardArn = string;
export type DashboardType = "MANAGED" | "CUSTOM" | (string & {});
export type QueryAlias = string;
export interface Widget {
  QueryAlias?: string;
  QueryStatement?: string;
  QueryParameters?: string[];
  ViewProperties?: { [key: string]: string | undefined };
}
export type WidgetList = Widget[];
export interface CreateDashboardResponse {
  DashboardArn?: string;
  Name?: string;
  Type?: DashboardType;
  Widgets?: Widget[];
  TagsList?: Tag[];
  RefreshSchedule?: RefreshSchedule;
  TerminationProtectionEnabled?: boolean;
}
export type EventDataStoreName = string;
export type SelectorName = string;
export type SelectorField = string;
export type OperatorValue = string;
export type Operator = string[];
export interface AdvancedFieldSelector {
  Field: string;
  Equals?: string[];
  StartsWith?: string[];
  EndsWith?: string[];
  NotEquals?: string[];
  NotStartsWith?: string[];
  NotEndsWith?: string[];
}
export type AdvancedFieldSelectors = AdvancedFieldSelector[];
export interface AdvancedEventSelector {
  Name?: string;
  FieldSelectors: AdvancedFieldSelector[];
}
export type AdvancedEventSelectors = AdvancedEventSelector[];
export type RetentionPeriod = number;
export type EventDataStoreKmsKeyId = string;
export type BillingMode =
  | "EXTENDABLE_RETENTION_PRICING"
  | "FIXED_RETENTION_PRICING"
  | (string & {});
export interface CreateEventDataStoreRequest {
  Name: string;
  AdvancedEventSelectors?: AdvancedEventSelector[];
  MultiRegionEnabled?: boolean;
  OrganizationEnabled?: boolean;
  RetentionPeriod?: number;
  TerminationProtectionEnabled?: boolean;
  TagsList?: Tag[];
  KmsKeyId?: string;
  StartIngestion?: boolean;
  BillingMode?: BillingMode;
}
export type EventDataStoreStatus =
  | "CREATED"
  | "ENABLED"
  | "PENDING_DELETION"
  | "STARTING_INGESTION"
  | "STOPPING_INGESTION"
  | "STOPPED_INGESTION"
  | (string & {});
export interface CreateEventDataStoreResponse {
  EventDataStoreArn?: string;
  Name?: string;
  Status?: EventDataStoreStatus;
  AdvancedEventSelectors?: AdvancedEventSelector[];
  MultiRegionEnabled?: boolean;
  OrganizationEnabled?: boolean;
  RetentionPeriod?: number;
  TerminationProtectionEnabled?: boolean;
  TagsList?: Tag[];
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
  KmsKeyId?: string;
  BillingMode?: BillingMode;
}
export interface CreateTrailRequest {
  Name: string;
  S3BucketName: string;
  S3KeyPrefix?: string;
  SnsTopicName?: string;
  IncludeGlobalServiceEvents?: boolean;
  IsMultiRegionTrail?: boolean;
  EnableLogFileValidation?: boolean;
  CloudWatchLogsLogGroupArn?: string;
  CloudWatchLogsRoleArn?: string;
  KmsKeyId?: string;
  IsOrganizationTrail?: boolean;
  TagsList?: Tag[];
}
export interface CreateTrailResponse {
  Name?: string;
  S3BucketName?: string;
  S3KeyPrefix?: string;
  SnsTopicName?: string;
  SnsTopicARN?: string;
  IncludeGlobalServiceEvents?: boolean;
  IsMultiRegionTrail?: boolean;
  TrailARN?: string;
  LogFileValidationEnabled?: boolean;
  CloudWatchLogsLogGroupArn?: string;
  CloudWatchLogsRoleArn?: string;
  KmsKeyId?: string;
  IsOrganizationTrail?: boolean;
}
export interface DeleteChannelRequest {
  Channel: string;
}
export interface DeleteChannelResponse {}
export interface DeleteDashboardRequest {
  DashboardId: string;
}
export interface DeleteDashboardResponse {}
export interface DeleteEventDataStoreRequest {
  EventDataStore: string;
}
export interface DeleteEventDataStoreResponse {}
export type ResourceArn = string;
export interface DeleteResourcePolicyRequest {
  ResourceArn: string;
}
export interface DeleteResourcePolicyResponse {}
export interface DeleteTrailRequest {
  Name: string;
}
export interface DeleteTrailResponse {}
export interface DeregisterOrganizationDelegatedAdminRequest {
  DelegatedAdminAccountId: string;
}
export interface DeregisterOrganizationDelegatedAdminResponse {}
export type RefreshId = string;
export interface DescribeQueryRequest {
  EventDataStore?: string;
  QueryId?: string;
  QueryAlias?: string;
  RefreshId?: string;
  EventDataStoreOwnerAccountId?: string;
}
export interface QueryStatisticsForDescribeQuery {
  EventsMatched?: number;
  EventsScanned?: number;
  BytesScanned?: number;
  ExecutionTimeInMillis?: number;
  CreationTime?: Date;
}
export type ErrorMessage = string;
export type DeliveryS3Uri = string;
export type DeliveryStatus =
  | "SUCCESS"
  | "FAILED"
  | "FAILED_SIGNING_FILE"
  | "PENDING"
  | "RESOURCE_NOT_FOUND"
  | "ACCESS_DENIED"
  | "ACCESS_DENIED_SIGNING_FILE"
  | "CANCELLED"
  | "UNKNOWN"
  | (string & {});
export type Prompt = string;
export interface DescribeQueryResponse {
  QueryId?: string;
  QueryString?: string;
  QueryStatus?: QueryStatus;
  QueryStatistics?: QueryStatisticsForDescribeQuery;
  ErrorMessage?: string;
  DeliveryS3Uri?: string;
  DeliveryStatus?: DeliveryStatus;
  Prompt?: string;
  EventDataStoreOwnerAccountId?: string;
}
export type TrailNameList = string[];
export interface DescribeTrailsRequest {
  trailNameList?: string[];
  includeShadowTrails?: boolean;
}
export interface Trail {
  Name?: string;
  S3BucketName?: string;
  S3KeyPrefix?: string;
  SnsTopicName?: string;
  SnsTopicARN?: string;
  IncludeGlobalServiceEvents?: boolean;
  IsMultiRegionTrail?: boolean;
  HomeRegion?: string;
  TrailARN?: string;
  LogFileValidationEnabled?: boolean;
  CloudWatchLogsLogGroupArn?: string;
  CloudWatchLogsRoleArn?: string;
  KmsKeyId?: string;
  HasCustomEventSelectors?: boolean;
  HasInsightSelectors?: boolean;
  IsOrganizationTrail?: boolean;
}
export type TrailList = Trail[];
export interface DescribeTrailsResponse {
  trailList?: Trail[];
}
export interface DisableFederationRequest {
  EventDataStore: string;
}
export type FederationStatus =
  | "ENABLING"
  | "ENABLED"
  | "DISABLING"
  | "DISABLED"
  | (string & {});
export interface DisableFederationResponse {
  EventDataStoreArn?: string;
  FederationStatus?: FederationStatus;
}
export type FederationRoleArn = string;
export interface EnableFederationRequest {
  EventDataStore: string;
  FederationRoleArn: string;
}
export interface EnableFederationResponse {
  EventDataStoreArn?: string;
  FederationStatus?: FederationStatus;
  FederationRoleArn?: string;
}
export type EventDataStoreList = string[];
export interface GenerateQueryRequest {
  EventDataStores: string[];
  Prompt: string;
}
export interface GenerateQueryResponse {
  QueryStatement?: string;
  QueryAlias?: string;
  EventDataStoreOwnerAccountId?: string;
}
export interface GetChannelRequest {
  Channel: string;
}
export interface SourceConfig {
  ApplyToAllRegions?: boolean;
  AdvancedEventSelectors?: AdvancedEventSelector[];
}
export interface IngestionStatus {
  LatestIngestionSuccessTime?: Date;
  LatestIngestionSuccessEventID?: string;
  LatestIngestionErrorCode?: string;
  LatestIngestionAttemptTime?: Date;
  LatestIngestionAttemptEventID?: string;
}
export interface GetChannelResponse {
  ChannelArn?: string;
  Name?: string;
  Source?: string;
  SourceConfig?: SourceConfig;
  Destinations?: Destination[];
  IngestionStatus?: IngestionStatus;
}
export interface GetDashboardRequest {
  DashboardId: string;
}
export type DashboardStatus =
  | "CREATING"
  | "CREATED"
  | "UPDATING"
  | "UPDATED"
  | "DELETING"
  | (string & {});
export interface GetDashboardResponse {
  DashboardArn?: string;
  Type?: DashboardType;
  Status?: DashboardStatus;
  Widgets?: Widget[];
  RefreshSchedule?: RefreshSchedule;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
  LastRefreshId?: string;
  LastRefreshFailureReason?: string;
  TerminationProtectionEnabled?: boolean;
}
export interface GetEventConfigurationRequest {
  TrailName?: string;
  EventDataStore?: string;
}
export type MaxEventSize = "Standard" | "Large" | (string & {});
export type Type = "TagContext" | "RequestContext" | (string & {});
export type OperatorTargetListMember = string;
export type OperatorTargetList = string[];
export interface ContextKeySelector {
  Type: Type;
  Equals: string[];
}
export type ContextKeySelectors = ContextKeySelector[];
export type Template =
  | "API_ACTIVITY"
  | "RESOURCE_ACCESS"
  | "USER_ACTIONS"
  | (string & {});
export type Templates = Template[];
export type EventCategoryAggregation = "Data" | (string & {});
export interface AggregationConfiguration {
  Templates: Template[];
  EventCategory: EventCategoryAggregation;
}
export type AggregationConfigurations = AggregationConfiguration[];
export interface GetEventConfigurationResponse {
  TrailARN?: string;
  EventDataStoreArn?: string;
  MaxEventSize?: MaxEventSize;
  ContextKeySelectors?: ContextKeySelector[];
  AggregationConfigurations?: AggregationConfiguration[];
}
export interface GetEventDataStoreRequest {
  EventDataStore: string;
}
export type PartitionKeyName = string;
export type PartitionKeyType = string;
export interface PartitionKey {
  Name: string;
  Type: string;
}
export type PartitionKeyList = PartitionKey[];
export interface GetEventDataStoreResponse {
  EventDataStoreArn?: string;
  Name?: string;
  Status?: EventDataStoreStatus;
  AdvancedEventSelectors?: AdvancedEventSelector[];
  MultiRegionEnabled?: boolean;
  OrganizationEnabled?: boolean;
  RetentionPeriod?: number;
  TerminationProtectionEnabled?: boolean;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
  KmsKeyId?: string;
  BillingMode?: BillingMode;
  FederationStatus?: FederationStatus;
  FederationRoleArn?: string;
  PartitionKeys?: PartitionKey[];
}
export interface GetEventSelectorsRequest {
  TrailName: string;
}
export type ReadWriteType = "ReadOnly" | "WriteOnly" | "All" | (string & {});
export type DataResourceValues = string[];
export interface DataResource {
  Type?: string;
  Values?: string[];
}
export type DataResources = DataResource[];
export type ExcludeManagementEventSources = string[];
export interface EventSelector {
  ReadWriteType?: ReadWriteType;
  IncludeManagementEvents?: boolean;
  DataResources?: DataResource[];
  ExcludeManagementEventSources?: string[];
}
export type EventSelectors = EventSelector[];
export interface GetEventSelectorsResponse {
  TrailARN?: string;
  EventSelectors?: EventSelector[];
  AdvancedEventSelectors?: AdvancedEventSelector[];
}
export interface GetImportRequest {
  ImportId: string;
}
export type ImportDestinations = string[];
export interface S3ImportSource {
  S3LocationUri: string;
  S3BucketRegion: string;
  S3BucketAccessRoleArn: string;
}
export interface ImportSource {
  S3: S3ImportSource;
}
export type ImportStatus =
  | "INITIALIZING"
  | "IN_PROGRESS"
  | "FAILED"
  | "STOPPED"
  | "COMPLETED"
  | (string & {});
export interface ImportStatistics {
  PrefixesFound?: number;
  PrefixesCompleted?: number;
  FilesCompleted?: number;
  EventsCompleted?: number;
  FailedEntries?: number;
}
export interface GetImportResponse {
  ImportId?: string;
  Destinations?: string[];
  ImportSource?: ImportSource;
  StartEventTime?: Date;
  EndEventTime?: Date;
  ImportStatus?: ImportStatus;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
  ImportStatistics?: ImportStatistics;
}
export interface GetInsightSelectorsRequest {
  TrailName?: string;
  EventDataStore?: string;
}
export type InsightType =
  | "ApiCallRateInsight"
  | "ApiErrorRateInsight"
  | (string & {});
export type SourceEventCategory = "Management" | "Data" | (string & {});
export type SourceEventCategories = SourceEventCategory[];
export interface InsightSelector {
  InsightType?: InsightType;
  EventCategories?: SourceEventCategory[];
}
export type InsightSelectors = InsightSelector[];
export interface GetInsightSelectorsResponse {
  TrailARN?: string;
  InsightSelectors?: InsightSelector[];
  EventDataStoreArn?: string;
  InsightsDestination?: string;
}
export type PaginationToken = string;
export type MaxQueryResults = number;
export interface GetQueryResultsRequest {
  EventDataStore?: string;
  QueryId: string;
  NextToken?: string;
  MaxQueryResults?: number;
  EventDataStoreOwnerAccountId?: string;
}
export interface QueryStatistics {
  ResultsCount?: number;
  TotalResultsCount?: number;
  BytesScanned?: number;
}
export type QueryResultKey = string;
export type QueryResultValue = string;
export type QueryResultColumn = { [key: string]: string | undefined };
export type QueryResultRow = { [key: string]: string | undefined }[];
export type QueryResultRows = { [key: string]: string | undefined }[][];
export interface GetQueryResultsResponse {
  QueryStatus?: QueryStatus;
  QueryStatistics?: QueryStatistics;
  QueryResultRows?: { [key: string]: string | undefined }[][];
  NextToken?: string;
  ErrorMessage?: string;
}
export interface GetResourcePolicyRequest {
  ResourceArn: string;
}
export type ResourcePolicy = string;
export interface GetResourcePolicyResponse {
  ResourceArn?: string;
  ResourcePolicy?: string;
  DelegatedAdminResourcePolicy?: string;
}
export interface GetTrailRequest {
  Name: string;
}
export interface GetTrailResponse {
  Trail?: Trail;
}
export interface GetTrailStatusRequest {
  Name: string;
}
export interface GetTrailStatusResponse {
  IsLogging?: boolean;
  LatestDeliveryError?: string;
  LatestNotificationError?: string;
  LatestDeliveryTime?: Date;
  LatestNotificationTime?: Date;
  StartLoggingTime?: Date;
  StopLoggingTime?: Date;
  LatestCloudWatchLogsDeliveryError?: string;
  LatestCloudWatchLogsDeliveryTime?: Date;
  LatestDigestDeliveryTime?: Date;
  LatestDigestDeliveryError?: string;
  LatestDeliveryAttemptTime?: string;
  LatestNotificationAttemptTime?: string;
  LatestNotificationAttemptSucceeded?: string;
  LatestDeliveryAttemptSucceeded?: string;
  TimeLoggingStarted?: string;
  TimeLoggingStopped?: string;
}
export type ListChannelsMaxResultsCount = number;
export interface ListChannelsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface Channel {
  ChannelArn?: string;
  Name?: string;
}
export type Channels = Channel[];
export interface ListChannelsResponse {
  Channels?: Channel[];
  NextToken?: string;
}
export type ListDashboardsMaxResultsCount = number;
export interface ListDashboardsRequest {
  NamePrefix?: string;
  Type?: DashboardType;
  NextToken?: string;
  MaxResults?: number;
}
export interface DashboardDetail {
  DashboardArn?: string;
  Type?: DashboardType;
}
export type Dashboards = DashboardDetail[];
export interface ListDashboardsResponse {
  Dashboards?: DashboardDetail[];
  NextToken?: string;
}
export type ListEventDataStoresMaxResultsCount = number;
export interface ListEventDataStoresRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface EventDataStore {
  EventDataStoreArn?: string;
  Name?: string;
  TerminationProtectionEnabled?: boolean;
  Status?: EventDataStoreStatus;
  AdvancedEventSelectors?: AdvancedEventSelector[];
  MultiRegionEnabled?: boolean;
  OrganizationEnabled?: boolean;
  RetentionPeriod?: number;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
}
export type EventDataStores = EventDataStore[];
export interface ListEventDataStoresResponse {
  EventDataStores?: EventDataStore[];
  NextToken?: string;
}
export type ListImportFailuresMaxResultsCount = number;
export interface ListImportFailuresRequest {
  ImportId: string;
  MaxResults?: number;
  NextToken?: string;
}
export type ImportFailureStatus =
  | "FAILED"
  | "RETRY"
  | "SUCCEEDED"
  | (string & {});
export interface ImportFailureListItem {
  Location?: string;
  Status?: ImportFailureStatus;
  ErrorType?: string;
  ErrorMessage?: string;
  LastUpdatedTime?: Date;
}
export type ImportFailureList = ImportFailureListItem[];
export interface ListImportFailuresResponse {
  Failures?: ImportFailureListItem[];
  NextToken?: string;
}
export type ListImportsMaxResultsCount = number;
export interface ListImportsRequest {
  MaxResults?: number;
  Destination?: string;
  ImportStatus?: ImportStatus;
  NextToken?: string;
}
export interface ImportsListItem {
  ImportId?: string;
  ImportStatus?: ImportStatus;
  Destinations?: string[];
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
}
export type ImportsList = ImportsListItem[];
export interface ListImportsResponse {
  Imports?: ImportsListItem[];
  NextToken?: string;
}
export type ListInsightsDataType = "InsightsEvents" | (string & {});
export type ListInsightsDataDimensionKey =
  | "EventId"
  | "EventName"
  | "EventSource"
  | (string & {});
export type ListInsightsDataDimensionValue = string;
export type ListInsightsDataDimensions = {
  [key in ListInsightsDataDimensionKey]?: string;
};
export type ListInsightsDataMaxResultsCount = number;
export interface ListInsightsDataRequest {
  InsightSource: string;
  DataType: ListInsightsDataType;
  Dimensions?: { [key: string]: string | undefined };
  StartTime?: Date;
  EndTime?: Date;
  MaxResults?: number;
  NextToken?: string;
}
export interface Resource {
  ResourceType?: string;
  ResourceName?: string;
}
export type ResourceList = Resource[];
export interface Event {
  EventId?: string;
  EventName?: string;
  ReadOnly?: string;
  AccessKeyId?: string;
  EventTime?: Date;
  EventSource?: string;
  Username?: string;
  Resources?: Resource[];
  CloudTrailEvent?: string;
}
export type EventsList = Event[];
export interface ListInsightsDataResponse {
  Events?: Event[];
  NextToken?: string;
}
export type EventSource = string;
export type EventName = string;
export type ErrorCode = string;
export type InsightsMetricPeriod = number;
export type InsightsMetricDataType =
  | "FillWithZeros"
  | "NonZeroData"
  | (string & {});
export type InsightsMetricMaxResults = number;
export type InsightsMetricNextToken = string;
export interface ListInsightsMetricDataRequest {
  TrailName?: string;
  EventSource: string;
  EventName: string;
  InsightType: InsightType;
  ErrorCode?: string;
  StartTime?: Date;
  EndTime?: Date;
  Period?: number;
  DataType?: InsightsMetricDataType;
  MaxResults?: number;
  NextToken?: string;
}
export type Timestamps = Date[];
export type InsightsMetricValues = number[];
export interface ListInsightsMetricDataResponse {
  TrailARN?: string;
  EventSource?: string;
  EventName?: string;
  InsightType?: InsightType;
  ErrorCode?: string;
  Timestamps?: Date[];
  Values?: number[];
  NextToken?: string;
}
export interface ListPublicKeysRequest {
  StartTime?: Date;
  EndTime?: Date;
  NextToken?: string;
}
export type ByteBuffer = Uint8Array;
export interface PublicKey {
  Value?: Uint8Array;
  ValidityStartTime?: Date;
  ValidityEndTime?: Date;
  Fingerprint?: string;
}
export type PublicKeyList = PublicKey[];
export interface ListPublicKeysResponse {
  PublicKeyList?: PublicKey[];
  NextToken?: string;
}
export type ListQueriesMaxResultsCount = number;
export interface ListQueriesRequest {
  EventDataStore: string;
  NextToken?: string;
  MaxResults?: number;
  StartTime?: Date;
  EndTime?: Date;
  QueryStatus?: QueryStatus;
}
export interface Query {
  QueryId?: string;
  QueryStatus?: QueryStatus;
  CreationTime?: Date;
}
export type Queries = Query[];
export interface ListQueriesResponse {
  Queries?: Query[];
  NextToken?: string;
}
export type ResourceIdList = string[];
export interface ListTagsRequest {
  ResourceIdList: string[];
  NextToken?: string;
}
export interface ResourceTag {
  ResourceId?: string;
  TagsList?: Tag[];
}
export type ResourceTagList = ResourceTag[];
export interface ListTagsResponse {
  ResourceTagList?: ResourceTag[];
  NextToken?: string;
}
export interface ListTrailsRequest {
  NextToken?: string;
}
export interface TrailInfo {
  TrailARN?: string;
  Name?: string;
  HomeRegion?: string;
}
export type Trails = TrailInfo[];
export interface ListTrailsResponse {
  Trails?: TrailInfo[];
  NextToken?: string;
}
export type LookupAttributeKey =
  | "EventId"
  | "EventName"
  | "ReadOnly"
  | "Username"
  | "ResourceType"
  | "ResourceName"
  | "EventSource"
  | "AccessKeyId"
  | (string & {});
export type LookupAttributeValue = string;
export interface LookupAttribute {
  AttributeKey: LookupAttributeKey;
  AttributeValue: string;
}
export type LookupAttributesList = LookupAttribute[];
export type EventCategory = "insight" | (string & {});
export type MaxResults = number;
export type NextToken = string;
export interface LookupEventsRequest {
  LookupAttributes?: LookupAttribute[];
  StartTime?: Date;
  EndTime?: Date;
  EventCategory?: EventCategory;
  MaxResults?: number;
  NextToken?: string;
}
export interface LookupEventsResponse {
  Events?: Event[];
  NextToken?: string;
}
export interface PutEventConfigurationRequest {
  TrailName?: string;
  EventDataStore?: string;
  MaxEventSize?: MaxEventSize;
  ContextKeySelectors?: ContextKeySelector[];
  AggregationConfigurations?: AggregationConfiguration[];
}
export interface PutEventConfigurationResponse {
  TrailARN?: string;
  EventDataStoreArn?: string;
  MaxEventSize?: MaxEventSize;
  ContextKeySelectors?: ContextKeySelector[];
  AggregationConfigurations?: AggregationConfiguration[];
}
export interface PutEventSelectorsRequest {
  TrailName: string;
  EventSelectors?: EventSelector[];
  AdvancedEventSelectors?: AdvancedEventSelector[];
}
export interface PutEventSelectorsResponse {
  TrailARN?: string;
  EventSelectors?: EventSelector[];
  AdvancedEventSelectors?: AdvancedEventSelector[];
}
export interface PutInsightSelectorsRequest {
  TrailName?: string;
  InsightSelectors: InsightSelector[];
  EventDataStore?: string;
  InsightsDestination?: string;
}
export interface PutInsightSelectorsResponse {
  TrailARN?: string;
  InsightSelectors?: InsightSelector[];
  EventDataStoreArn?: string;
  InsightsDestination?: string;
}
export interface PutResourcePolicyRequest {
  ResourceArn: string;
  ResourcePolicy: string;
}
export interface PutResourcePolicyResponse {
  ResourceArn?: string;
  ResourcePolicy?: string;
  DelegatedAdminResourcePolicy?: string;
}
export interface RegisterOrganizationDelegatedAdminRequest {
  MemberAccountId: string;
}
export interface RegisterOrganizationDelegatedAdminResponse {}
export interface RemoveTagsRequest {
  ResourceId: string;
  TagsList: Tag[];
}
export interface RemoveTagsResponse {}
export interface RestoreEventDataStoreRequest {
  EventDataStore: string;
}
export interface RestoreEventDataStoreResponse {
  EventDataStoreArn?: string;
  Name?: string;
  Status?: EventDataStoreStatus;
  AdvancedEventSelectors?: AdvancedEventSelector[];
  MultiRegionEnabled?: boolean;
  OrganizationEnabled?: boolean;
  RetentionPeriod?: number;
  TerminationProtectionEnabled?: boolean;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
  KmsKeyId?: string;
  BillingMode?: BillingMode;
}
export type SearchSampleQueriesSearchPhrase = string;
export type SearchSampleQueriesMaxResults = number;
export interface SearchSampleQueriesRequest {
  SearchPhrase: string;
  MaxResults?: number;
  NextToken?: string;
}
export type SampleQueryName = string;
export type SampleQueryDescription = string;
export type SampleQuerySQL = string;
export type SampleQueryRelevance = number;
export interface SearchSampleQueriesSearchResult {
  Name?: string;
  Description?: string;
  SQL?: string;
  Relevance?: number;
}
export type SearchSampleQueriesSearchResults =
  SearchSampleQueriesSearchResult[];
export interface SearchSampleQueriesResponse {
  SearchResults?: SearchSampleQueriesSearchResult[];
  NextToken?: string;
}
export type QueryParameterKey = string;
export type QueryParameterValue = string;
export type QueryParameterValues = { [key: string]: string | undefined };
export interface StartDashboardRefreshRequest {
  DashboardId: string;
  QueryParameterValues?: { [key: string]: string | undefined };
}
export interface StartDashboardRefreshResponse {
  RefreshId?: string;
}
export interface StartEventDataStoreIngestionRequest {
  EventDataStore: string;
}
export interface StartEventDataStoreIngestionResponse {}
export interface StartImportRequest {
  Destinations?: string[];
  ImportSource?: ImportSource;
  StartEventTime?: Date;
  EndEventTime?: Date;
  ImportId?: string;
}
export interface StartImportResponse {
  ImportId?: string;
  Destinations?: string[];
  ImportSource?: ImportSource;
  StartEventTime?: Date;
  EndEventTime?: Date;
  ImportStatus?: ImportStatus;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
}
export interface StartLoggingRequest {
  Name: string;
}
export interface StartLoggingResponse {}
export interface StartQueryRequest {
  QueryStatement?: string;
  DeliveryS3Uri?: string;
  QueryAlias?: string;
  QueryParameters?: string[];
  EventDataStoreOwnerAccountId?: string;
}
export interface StartQueryResponse {
  QueryId?: string;
  EventDataStoreOwnerAccountId?: string;
}
export interface StopEventDataStoreIngestionRequest {
  EventDataStore: string;
}
export interface StopEventDataStoreIngestionResponse {}
export interface StopImportRequest {
  ImportId: string;
}
export interface StopImportResponse {
  ImportId?: string;
  ImportSource?: ImportSource;
  Destinations?: string[];
  ImportStatus?: ImportStatus;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
  StartEventTime?: Date;
  EndEventTime?: Date;
  ImportStatistics?: ImportStatistics;
}
export interface StopLoggingRequest {
  Name: string;
}
export interface StopLoggingResponse {}
export interface UpdateChannelRequest {
  Channel: string;
  Destinations?: Destination[];
  Name?: string;
}
export interface UpdateChannelResponse {
  ChannelArn?: string;
  Name?: string;
  Source?: string;
  Destinations?: Destination[];
}
export interface UpdateDashboardRequest {
  DashboardId: string;
  Widgets?: RequestWidget[];
  RefreshSchedule?: RefreshSchedule;
  TerminationProtectionEnabled?: boolean;
}
export interface UpdateDashboardResponse {
  DashboardArn?: string;
  Name?: string;
  Type?: DashboardType;
  Widgets?: Widget[];
  RefreshSchedule?: RefreshSchedule;
  TerminationProtectionEnabled?: boolean;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
}
export interface UpdateEventDataStoreRequest {
  EventDataStore: string;
  Name?: string;
  AdvancedEventSelectors?: AdvancedEventSelector[];
  MultiRegionEnabled?: boolean;
  OrganizationEnabled?: boolean;
  RetentionPeriod?: number;
  TerminationProtectionEnabled?: boolean;
  KmsKeyId?: string;
  BillingMode?: BillingMode;
}
export interface UpdateEventDataStoreResponse {
  EventDataStoreArn?: string;
  Name?: string;
  Status?: EventDataStoreStatus;
  AdvancedEventSelectors?: AdvancedEventSelector[];
  MultiRegionEnabled?: boolean;
  OrganizationEnabled?: boolean;
  RetentionPeriod?: number;
  TerminationProtectionEnabled?: boolean;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
  KmsKeyId?: string;
  BillingMode?: BillingMode;
  FederationStatus?: FederationStatus;
  FederationRoleArn?: string;
}
export interface UpdateTrailRequest {
  Name: string;
  S3BucketName?: string;
  S3KeyPrefix?: string;
  SnsTopicName?: string;
  IncludeGlobalServiceEvents?: boolean;
  IsMultiRegionTrail?: boolean;
  EnableLogFileValidation?: boolean;
  CloudWatchLogsLogGroupArn?: string;
  CloudWatchLogsRoleArn?: string;
  KmsKeyId?: string;
  IsOrganizationTrail?: boolean;
}
export interface UpdateTrailResponse {
  Name?: string;
  S3BucketName?: string;
  S3KeyPrefix?: string;
  SnsTopicName?: string;
  SnsTopicARN?: string;
  IncludeGlobalServiceEvents?: boolean;
  IsMultiRegionTrail?: boolean;
  TrailARN?: string;
  LogFileValidationEnabled?: boolean;
  CloudWatchLogsLogGroupArn?: string;
  CloudWatchLogsRoleArn?: string;
  KmsKeyId?: string;
  IsOrganizationTrail?: boolean;
}
export type AddTagsError =
  | ChannelARNInvalidException
  | ChannelNotFoundException
  | CloudTrailARNInvalidException
  | ConflictException
  | EventDataStoreARNInvalidException
  | EventDataStoreNotFoundException
  | InactiveEventDataStoreException
  | InvalidTagParameterException
  | InvalidTrailNameException
  | NoManagementAccountSLRExistsException
  | NotOrganizationMasterAccountException
  | OperationNotPermittedException
  | ResourceNotFoundException
  | ResourceTypeNotSupportedException
  | TagsLimitExceededException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Adds one or more tags to a trail, event data store, dashboard, or channel, up to a limit of 50. Overwrites an
 * existing tag's value when a new value is specified for an existing tag key. Tag key names
 * must be unique; you cannot have two keys with the same name but different
 * values. If you specify a key without a value, the tag will be created with the specified
 * key and a value of null. You can tag a trail or event data store that applies to all
 * Amazon Web Services Regions only from the Region in which the trail or event data store
 * was created (also known as its home Region).
 */
export const addTags: API.OperationMethod<
  AddTagsRequest,
  AddTagsResponse,
  AddTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResourceId: 0, TagsList: D.list(i_Tag) },
  },
  errors: [
    ChannelARNInvalidException,
    ChannelNotFoundException,
    CloudTrailARNInvalidException,
    ConflictException,
    EventDataStoreARNInvalidException,
    EventDataStoreNotFoundException,
    InactiveEventDataStoreException,
    InvalidTagParameterException,
    InvalidTrailNameException,
    NoManagementAccountSLRExistsException,
    NotOrganizationMasterAccountException,
    OperationNotPermittedException,
    ResourceNotFoundException,
    ResourceTypeNotSupportedException,
    TagsLimitExceededException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddTags",
})) as any;

export type CancelQueryError =
  | ConflictException
  | EventDataStoreARNInvalidException
  | EventDataStoreNotFoundException
  | InactiveEventDataStoreException
  | InactiveQueryException
  | InvalidParameterException
  | NoManagementAccountSLRExistsException
  | OperationNotPermittedException
  | QueryIdNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Cancels a query if the query is not in a terminated state, such as
 * `CANCELLED`, `FAILED`, `TIMED_OUT`, or
 * `FINISHED`. You must specify an ARN value for `EventDataStore`.
 * The ID of the query that you want to cancel is also required. When you run
 * `CancelQuery`, the query status might show as `CANCELLED` even if
 * the operation is not yet finished.
 */
export const cancelQuery: API.OperationMethod<
  CancelQueryRequest,
  CancelQueryResponse,
  CancelQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { EventDataStore: 0, QueryId: 0, EventDataStoreOwnerAccountId: 0 },
  },
  errors: [
    ConflictException,
    EventDataStoreARNInvalidException,
    EventDataStoreNotFoundException,
    InactiveEventDataStoreException,
    InactiveQueryException,
    InvalidParameterException,
    NoManagementAccountSLRExistsException,
    OperationNotPermittedException,
    QueryIdNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelQuery",
})) as any;

export type CreateChannelError =
  | ChannelAlreadyExistsException
  | ChannelMaxLimitExceededException
  | EventDataStoreARNInvalidException
  | EventDataStoreNotFoundException
  | InactiveEventDataStoreException
  | InvalidEventDataStoreCategoryException
  | InvalidParameterException
  | InvalidSourceException
  | InvalidTagParameterException
  | OperationNotPermittedException
  | TagsLimitExceededException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Creates a channel for CloudTrail to ingest events from a partner or external source.
 * After you create a channel, a CloudTrail Lake event data store can log events
 * from the partner or source that you specify.
 */
export const createChannel: API.OperationMethod<
  CreateChannelRequest,
  CreateChannelResponse,
  CreateChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Source: 0,
      Destinations: D.list(i_Destination),
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    ChannelAlreadyExistsException,
    ChannelMaxLimitExceededException,
    EventDataStoreARNInvalidException,
    EventDataStoreNotFoundException,
    InactiveEventDataStoreException,
    InvalidEventDataStoreCategoryException,
    InvalidParameterException,
    InvalidSourceException,
    InvalidTagParameterException,
    OperationNotPermittedException,
    TagsLimitExceededException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateChannel",
})) as any;

export type CreateDashboardError =
  | ConflictException
  | EventDataStoreNotFoundException
  | InactiveEventDataStoreException
  | InsufficientEncryptionPolicyException
  | InvalidQueryStatementException
  | InvalidTagParameterException
  | ServiceQuotaExceededException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Creates a custom dashboard or the Highlights dashboard.
 *
 * - **Custom dashboards** - Custom dashboards allow you to query
 * events in any event data store type. You can add up to 10 widgets to a custom dashboard. You can manually refresh a custom dashboard, or you can set a refresh schedule.
 *
 * - **Highlights dashboard** - You can create
 * the Highlights dashboard to see a summary of key user activities and API usage across all your event data stores.
 * CloudTrail Lake manages the Highlights dashboard and refreshes the dashboard every 6 hours. To create the Highlights dashboard, you must set and enable a refresh schedule.
 *
 * CloudTrail runs queries to populate the dashboard's widgets during a manual or scheduled refresh. CloudTrail must be granted permissions to run the `StartQuery` operation on your behalf. To provide permissions, run the `PutResourcePolicy` operation to attach a resource-based policy to each event data store. For more information,
 * see Example: Allow CloudTrail to run queries to populate a dashboard in the *CloudTrail User Guide*.
 *
 * To set a refresh schedule, CloudTrail must be granted permissions to run the `StartDashboardRefresh` operation to refresh the dashboard on your behalf. To provide permissions, run the `PutResourcePolicy` operation to attach a resource-based policy to the dashboard. For more information,
 * see
 * Resource-based policy example for a dashboard in the *CloudTrail User Guide*.
 *
 * For more information about dashboards, see CloudTrail Lake dashboards in the *CloudTrail User Guide*.
 */
export const createDashboard: API.OperationMethod<
  CreateDashboardRequest,
  CreateDashboardResponse,
  CreateDashboardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      RefreshSchedule: i_RefreshSchedule,
      TagsList: D.list(i_Tag),
      TerminationProtectionEnabled: 0,
      Widgets: D.list(i_RequestWidget),
    },
  },
  errors: [
    ConflictException,
    EventDataStoreNotFoundException,
    InactiveEventDataStoreException,
    InsufficientEncryptionPolicyException,
    InvalidQueryStatementException,
    InvalidTagParameterException,
    ServiceQuotaExceededException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDashboard",
})) as any;

export type CreateEventDataStoreError =
  | CloudTrailAccessNotEnabledException
  | ConflictException
  | EventDataStoreAlreadyExistsException
  | EventDataStoreMaxLimitExceededException
  | InsufficientDependencyServiceAccessPermissionException
  | InsufficientEncryptionPolicyException
  | InvalidEventSelectorsException
  | InvalidKmsKeyIdException
  | InvalidParameterException
  | InvalidTagParameterException
  | KmsException
  | KmsKeyNotFoundException
  | NoManagementAccountSLRExistsException
  | NotOrganizationMasterAccountException
  | OperationNotPermittedException
  | OrganizationNotInAllFeaturesModeException
  | OrganizationsNotInUseException
  | ThrottlingException
  | UnsupportedOperationException
  | CloudTrailLakeOnboardingClosed
  | CommonErrors;
/**
 * Creates a new event data store.
 */
export const createEventDataStore: API.OperationMethod<
  CreateEventDataStoreRequest,
  CreateEventDataStoreResponse,
  CreateEventDataStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      AdvancedEventSelectors: D.list(i_AdvancedEventSelector),
      MultiRegionEnabled: 0,
      OrganizationEnabled: 0,
      RetentionPeriod: 0,
      TerminationProtectionEnabled: 0,
      TagsList: D.list(i_Tag),
      KmsKeyId: 0,
      StartIngestion: 0,
      BillingMode: 0,
    },
    output: { CreatedTimestamp: D.ts, UpdatedTimestamp: D.ts },
  },
  errors: [
    CloudTrailAccessNotEnabledException,
    ConflictException,
    EventDataStoreAlreadyExistsException,
    EventDataStoreMaxLimitExceededException,
    InsufficientDependencyServiceAccessPermissionException,
    InsufficientEncryptionPolicyException,
    InvalidEventSelectorsException,
    InvalidKmsKeyIdException,
    InvalidParameterException,
    InvalidTagParameterException,
    KmsException,
    KmsKeyNotFoundException,
    NoManagementAccountSLRExistsException,
    NotOrganizationMasterAccountException,
    OperationNotPermittedException,
    OrganizationNotInAllFeaturesModeException,
    OrganizationsNotInUseException,
    ThrottlingException,
    UnsupportedOperationException,
    CloudTrailLakeOnboardingClosed,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEventDataStore",
})) as any;

export type CreateTrailError =
  | CloudTrailAccessNotEnabledException
  | CloudTrailInvalidClientTokenIdException
  | CloudWatchLogsDeliveryUnavailableException
  | ConflictException
  | InsufficientDependencyServiceAccessPermissionException
  | InsufficientEncryptionPolicyException
  | InsufficientS3BucketPolicyException
  | InsufficientSnsTopicPolicyException
  | InvalidCloudWatchLogsLogGroupArnException
  | InvalidCloudWatchLogsRoleArnException
  | InvalidKmsKeyIdException
  | InvalidParameterCombinationException
  | InvalidParameterException
  | InvalidS3BucketNameException
  | InvalidS3PrefixException
  | InvalidSnsTopicNameException
  | InvalidTagParameterException
  | InvalidTrailNameException
  | KmsException
  | KmsKeyDisabledException
  | KmsKeyNotFoundException
  | MaximumNumberOfTrailsExceededException
  | NoManagementAccountSLRExistsException
  | NotOrganizationMasterAccountException
  | OperationNotPermittedException
  | OrganizationNotInAllFeaturesModeException
  | OrganizationsNotInUseException
  | S3BucketDoesNotExistException
  | TagsLimitExceededException
  | ThrottlingException
  | TrailAlreadyExistsException
  | TrailNotProvidedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Creates a trail that specifies the settings for delivery of log data to an Amazon S3 bucket.
 */
export const createTrail: API.OperationMethod<
  CreateTrailRequest,
  CreateTrailResponse,
  CreateTrailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      S3BucketName: 0,
      S3KeyPrefix: 0,
      SnsTopicName: 0,
      IncludeGlobalServiceEvents: 0,
      IsMultiRegionTrail: 0,
      EnableLogFileValidation: 0,
      CloudWatchLogsLogGroupArn: 0,
      CloudWatchLogsRoleArn: 0,
      KmsKeyId: 0,
      IsOrganizationTrail: 0,
      TagsList: D.list(i_Tag),
    },
  },
  errors: [
    CloudTrailAccessNotEnabledException,
    CloudTrailInvalidClientTokenIdException,
    CloudWatchLogsDeliveryUnavailableException,
    ConflictException,
    InsufficientDependencyServiceAccessPermissionException,
    InsufficientEncryptionPolicyException,
    InsufficientS3BucketPolicyException,
    InsufficientSnsTopicPolicyException,
    InvalidCloudWatchLogsLogGroupArnException,
    InvalidCloudWatchLogsRoleArnException,
    InvalidKmsKeyIdException,
    InvalidParameterCombinationException,
    InvalidParameterException,
    InvalidS3BucketNameException,
    InvalidS3PrefixException,
    InvalidSnsTopicNameException,
    InvalidTagParameterException,
    InvalidTrailNameException,
    KmsException,
    KmsKeyDisabledException,
    KmsKeyNotFoundException,
    MaximumNumberOfTrailsExceededException,
    NoManagementAccountSLRExistsException,
    NotOrganizationMasterAccountException,
    OperationNotPermittedException,
    OrganizationNotInAllFeaturesModeException,
    OrganizationsNotInUseException,
    S3BucketDoesNotExistException,
    TagsLimitExceededException,
    ThrottlingException,
    TrailAlreadyExistsException,
    TrailNotProvidedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTrail",
})) as any;

export type DeleteChannelError =
  | ChannelARNInvalidException
  | ChannelNotFoundException
  | OperationNotPermittedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Deletes a channel.
 */
export const deleteChannel: API.OperationMethod<
  DeleteChannelRequest,
  DeleteChannelResponse,
  DeleteChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Channel: 0 } },
  errors: [
    ChannelARNInvalidException,
    ChannelNotFoundException,
    OperationNotPermittedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteChannel",
})) as any;

export type DeleteDashboardError =
  | ConflictException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Deletes the specified dashboard. You cannot delete a dashboard that has termination protection enabled.
 */
export const deleteDashboard: API.OperationMethod<
  DeleteDashboardRequest,
  DeleteDashboardResponse,
  DeleteDashboardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DashboardId: 0 } },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDashboard",
})) as any;

export type DeleteEventDataStoreError =
  | ChannelExistsForEDSException
  | ConflictException
  | EventDataStoreARNInvalidException
  | EventDataStoreFederationEnabledException
  | EventDataStoreHasOngoingImportException
  | EventDataStoreNotFoundException
  | EventDataStoreTerminationProtectedException
  | InactiveEventDataStoreException
  | InsufficientDependencyServiceAccessPermissionException
  | InvalidParameterException
  | NoManagementAccountSLRExistsException
  | NotOrganizationMasterAccountException
  | OperationNotPermittedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Disables the event data store specified by `EventDataStore`, which accepts an
 * event data store ARN. After you run `DeleteEventDataStore`, the event data store
 * enters a `PENDING_DELETION` state, and is automatically deleted after a wait
 * period of seven days. `TerminationProtectionEnabled` must be set to
 * `False` on the event data store and the `FederationStatus` must be `DISABLED`.
 * You cannot delete an event data store if `TerminationProtectionEnabled`
 * is `True` or the `FederationStatus` is `ENABLED`.
 *
 * After you run `DeleteEventDataStore` on an event data store, you cannot run
 * `ListQueries`, `DescribeQuery`, or `GetQueryResults` on
 * queries that are using an event data store in a `PENDING_DELETION` state. An
 * event data store in the `PENDING_DELETION` state does not incur costs.
 */
export const deleteEventDataStore: API.OperationMethod<
  DeleteEventDataStoreRequest,
  DeleteEventDataStoreResponse,
  DeleteEventDataStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { EventDataStore: 0 } },
  errors: [
    ChannelExistsForEDSException,
    ConflictException,
    EventDataStoreARNInvalidException,
    EventDataStoreFederationEnabledException,
    EventDataStoreHasOngoingImportException,
    EventDataStoreNotFoundException,
    EventDataStoreTerminationProtectedException,
    InactiveEventDataStoreException,
    InsufficientDependencyServiceAccessPermissionException,
    InvalidParameterException,
    NoManagementAccountSLRExistsException,
    NotOrganizationMasterAccountException,
    OperationNotPermittedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEventDataStore",
})) as any;

export type DeleteResourcePolicyError =
  | ConflictException
  | OperationNotPermittedException
  | ResourceARNNotValidException
  | ResourceNotFoundException
  | ResourcePolicyNotFoundException
  | ResourceTypeNotSupportedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Deletes the resource-based policy attached to the CloudTrail event data store, dashboard, or channel.
 */
export const deleteResourcePolicy: API.OperationMethod<
  DeleteResourcePolicyRequest,
  DeleteResourcePolicyResponse,
  DeleteResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0 } },
  errors: [
    ConflictException,
    OperationNotPermittedException,
    ResourceARNNotValidException,
    ResourceNotFoundException,
    ResourcePolicyNotFoundException,
    ResourceTypeNotSupportedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicy",
})) as any;

export type DeleteTrailError =
  | CloudTrailARNInvalidException
  | ConflictException
  | InsufficientDependencyServiceAccessPermissionException
  | InvalidHomeRegionException
  | InvalidTrailNameException
  | NoManagementAccountSLRExistsException
  | NotOrganizationMasterAccountException
  | OperationNotPermittedException
  | ThrottlingException
  | TrailNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Deletes a trail. This operation must be called from the Region in which the trail was
 * created. `DeleteTrail` cannot be called on the shadow trails (replicated trails
 * in other Regions) of a trail that is enabled in all Regions.
 *
 * While deleting a CloudTrail trail is an irreversible action, CloudTrail does not
 * delete log files in the Amazon S3 bucket for that trail, the Amazon S3 bucket itself, or the
 * CloudWatchlog group to which the trail delivers events. Deleting a multi-Region trail
 * will stop logging of events in all Amazon Web Services Regions enabled in your Amazon Web Services account. Deleting a
 * single-Region trail will stop logging of events in that Region only. It will not stop
 * logging of events in other Regions even if the trails in those other Regions have
 * identical names to the deleted trail.
 *
 * For information about account closure and deletion of CloudTrail trails, see https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-account-closure.html.
 */
export const deleteTrail: API.OperationMethod<
  DeleteTrailRequest,
  DeleteTrailResponse,
  DeleteTrailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0 } },
  errors: [
    CloudTrailARNInvalidException,
    ConflictException,
    InsufficientDependencyServiceAccessPermissionException,
    InvalidHomeRegionException,
    InvalidTrailNameException,
    NoManagementAccountSLRExistsException,
    NotOrganizationMasterAccountException,
    OperationNotPermittedException,
    ThrottlingException,
    TrailNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTrail",
})) as any;

export type DeregisterOrganizationDelegatedAdminError =
  | AccountNotFoundException
  | AccountNotRegisteredException
  | CloudTrailAccessNotEnabledException
  | ConflictException
  | InsufficientDependencyServiceAccessPermissionException
  | InvalidParameterException
  | NotOrganizationManagementAccountException
  | OperationNotPermittedException
  | OrganizationNotInAllFeaturesModeException
  | OrganizationsNotInUseException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Removes CloudTrail delegated administrator permissions from a member account in
 * an organization.
 */
export const deregisterOrganizationDelegatedAdmin: API.OperationMethod<
  DeregisterOrganizationDelegatedAdminRequest,
  DeregisterOrganizationDelegatedAdminResponse,
  DeregisterOrganizationDelegatedAdminError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DelegatedAdminAccountId: 0 } },
  errors: [
    AccountNotFoundException,
    AccountNotRegisteredException,
    CloudTrailAccessNotEnabledException,
    ConflictException,
    InsufficientDependencyServiceAccessPermissionException,
    InvalidParameterException,
    NotOrganizationManagementAccountException,
    OperationNotPermittedException,
    OrganizationNotInAllFeaturesModeException,
    OrganizationsNotInUseException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterOrganizationDelegatedAdmin",
})) as any;

export type DescribeQueryError =
  | EventDataStoreARNInvalidException
  | EventDataStoreNotFoundException
  | InactiveEventDataStoreException
  | InvalidParameterException
  | NoManagementAccountSLRExistsException
  | OperationNotPermittedException
  | QueryIdNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Returns metadata about a query, including query run time in milliseconds, number of
 * events scanned and matched, and query status. If the query results were delivered to an S3 bucket,
 * the response also provides the S3 URI and the delivery status.
 *
 * You must specify either `QueryId` or `QueryAlias`. Specifying the `QueryAlias` parameter
 * returns information about the last query run for the alias. You can provide
 * `RefreshId` along with `QueryAlias` to view the query results
 * of a dashboard query for the specified `RefreshId`.
 */
export const describeQuery: API.OperationMethod<
  DescribeQueryRequest,
  DescribeQueryResponse,
  DescribeQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      EventDataStore: 0,
      QueryId: 0,
      QueryAlias: 0,
      RefreshId: 0,
      EventDataStoreOwnerAccountId: 0,
    },
    output: { QueryStatistics: { CreationTime: D.ts } },
  },
  errors: [
    EventDataStoreARNInvalidException,
    EventDataStoreNotFoundException,
    InactiveEventDataStoreException,
    InvalidParameterException,
    NoManagementAccountSLRExistsException,
    OperationNotPermittedException,
    QueryIdNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeQuery",
})) as any;

export type DescribeTrailsError =
  | CloudTrailARNInvalidException
  | InvalidTrailNameException
  | NoManagementAccountSLRExistsException
  | OperationNotPermittedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Retrieves settings for one or more trails associated with the current Region for your
 * account.
 */
export const describeTrails: API.OperationMethod<
  DescribeTrailsRequest,
  DescribeTrailsResponse,
  DescribeTrailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { trailNameList: 0, includeShadowTrails: 0 },
  },
  errors: [
    CloudTrailARNInvalidException,
    InvalidTrailNameException,
    NoManagementAccountSLRExistsException,
    OperationNotPermittedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTrails",
})) as any;

export type DisableFederationError =
  | AccessDeniedException
  | CloudTrailAccessNotEnabledException
  | ConcurrentModificationException
  | EventDataStoreARNInvalidException
  | EventDataStoreNotFoundException
  | InactiveEventDataStoreException
  | InsufficientDependencyServiceAccessPermissionException
  | InvalidParameterException
  | NoManagementAccountSLRExistsException
  | NotOrganizationMasterAccountException
  | OperationNotPermittedException
  | OrganizationNotInAllFeaturesModeException
  | OrganizationsNotInUseException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Disables Lake query federation on the specified event data store. When you disable federation, CloudTrail disables
 * the integration with Glue, Lake Formation, and Amazon Athena.
 * After disabling Lake query federation, you can no longer query your event data in Amazon Athena.
 *
 * No CloudTrail Lake data is deleted when you disable federation and you can continue to run queries in CloudTrail Lake.
 */
export const disableFederation: API.OperationMethod<
  DisableFederationRequest,
  DisableFederationResponse,
  DisableFederationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { EventDataStore: 0 } },
  errors: [
    AccessDeniedException,
    CloudTrailAccessNotEnabledException,
    ConcurrentModificationException,
    EventDataStoreARNInvalidException,
    EventDataStoreNotFoundException,
    InactiveEventDataStoreException,
    InsufficientDependencyServiceAccessPermissionException,
    InvalidParameterException,
    NoManagementAccountSLRExistsException,
    NotOrganizationMasterAccountException,
    OperationNotPermittedException,
    OrganizationNotInAllFeaturesModeException,
    OrganizationsNotInUseException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableFederation",
})) as any;

export type EnableFederationError =
  | AccessDeniedException
  | CloudTrailAccessNotEnabledException
  | ConcurrentModificationException
  | EventDataStoreARNInvalidException
  | EventDataStoreFederationEnabledException
  | EventDataStoreNotFoundException
  | InactiveEventDataStoreException
  | InsufficientDependencyServiceAccessPermissionException
  | InvalidParameterException
  | NoManagementAccountSLRExistsException
  | NotOrganizationMasterAccountException
  | OperationNotPermittedException
  | OrganizationNotInAllFeaturesModeException
  | OrganizationsNotInUseException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Enables Lake query federation on the specified event data store. Federating an event data store lets you view the metadata associated with the event data store in the Glue
 * Data Catalog and run
 * SQL queries against your event data using Amazon Athena. The table metadata stored in the Glue Data Catalog
 * lets the Athena query engine know how to find, read, and process the data that you want to query.
 *
 * When you enable Lake query federation, CloudTrail
 * creates a managed database named `aws:cloudtrail` (if the database doesn't already exist) and a managed federated table in
 * the Glue Data Catalog. The event data store ID is used for the table name. CloudTrail registers the role ARN and event data store in
 * Lake Formation, the service responsible for allowing fine-grained access control
 * of the federated resources in the Glue Data Catalog.
 *
 * For more information about Lake query federation, see Federate an event data store.
 */
export const enableFederation: API.OperationMethod<
  EnableFederationRequest,
  EnableFederationResponse,
  EnableFederationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { EventDataStore: 0, FederationRoleArn: 0 },
  },
  errors: [
    AccessDeniedException,
    CloudTrailAccessNotEnabledException,
    ConcurrentModificationException,
    EventDataStoreARNInvalidException,
    EventDataStoreFederationEnabledException,
    EventDataStoreNotFoundException,
    InactiveEventDataStoreException,
    InsufficientDependencyServiceAccessPermissionException,
    InvalidParameterException,
    NoManagementAccountSLRExistsException,
    NotOrganizationMasterAccountException,
    OperationNotPermittedException,
    OrganizationNotInAllFeaturesModeException,
    OrganizationsNotInUseException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableFederation",
})) as any;

export type GenerateQueryError =
  | EventDataStoreARNInvalidException
  | EventDataStoreNotFoundException
  | GenerateResponseException
  | InactiveEventDataStoreException
  | InvalidParameterException
  | NoManagementAccountSLRExistsException
  | OperationNotPermittedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Generates a query from a natural language prompt. This operation uses generative artificial intelligence
 * (generative AI) to produce a ready-to-use SQL query from the prompt.
 *
 * The prompt can be a question or a statement about the event data
 * in your event data store. For example, you can enter prompts like "What are my
 * top errors in the past month?" and “Give me a list of users that used SNS.”
 *
 * The prompt must be in English. For information about limitations, permissions, and supported Regions, see
 * Create CloudTrail Lake queries from natural language prompts
 * in the *CloudTrail * user guide.
 *
 * Do not include any personally identifying, confidential, or sensitive information
 * in your prompts.
 *
 * This feature uses generative AI large language models (LLMs); we recommend double-checking the
 * LLM response.
 */
export const generateQuery: API.OperationMethod<
  GenerateQueryRequest,
  GenerateQueryResponse,
  GenerateQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { EventDataStores: 0, Prompt: 0 } },
  errors: [
    EventDataStoreARNInvalidException,
    EventDataStoreNotFoundException,
    GenerateResponseException,
    InactiveEventDataStoreException,
    InvalidParameterException,
    NoManagementAccountSLRExistsException,
    OperationNotPermittedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GenerateQuery",
})) as any;

export type GetChannelError =
  | ChannelARNInvalidException
  | ChannelNotFoundException
  | OperationNotPermittedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Returns information about a specific channel.
 */
export const getChannel: API.OperationMethod<
  GetChannelRequest,
  GetChannelResponse,
  GetChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Channel: 0 },
    output: {
      IngestionStatus: {
        LatestIngestionSuccessTime: D.ts,
        LatestIngestionAttemptTime: D.ts,
      },
    },
  },
  errors: [
    ChannelARNInvalidException,
    ChannelNotFoundException,
    OperationNotPermittedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetChannel",
})) as any;

export type GetDashboardError =
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Returns the specified dashboard.
 */
export const getDashboard: API.OperationMethod<
  GetDashboardRequest,
  GetDashboardResponse,
  GetDashboardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DashboardId: 0 },
    output: { CreatedTimestamp: D.ts, UpdatedTimestamp: D.ts },
  },
  errors: [ResourceNotFoundException, UnsupportedOperationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDashboard",
})) as any;

export type GetEventConfigurationError =
  | CloudTrailARNInvalidException
  | EventDataStoreARNInvalidException
  | EventDataStoreNotFoundException
  | InvalidEventDataStoreCategoryException
  | InvalidEventDataStoreStatusException
  | InvalidParameterCombinationException
  | InvalidParameterException
  | InvalidTrailNameException
  | NoManagementAccountSLRExistsException
  | OperationNotPermittedException
  | TrailNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Retrieves the current event configuration settings for the specified event data store or trail. The response includes maximum event size configuration, the context key selectors configured for the event data store, and any aggregation settings configured for the trail.
 */
export const getEventConfiguration: API.OperationMethod<
  GetEventConfigurationRequest,
  GetEventConfigurationResponse,
  GetEventConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TrailName: 0, EventDataStore: 0 } },
  errors: [
    CloudTrailARNInvalidException,
    EventDataStoreARNInvalidException,
    EventDataStoreNotFoundException,
    InvalidEventDataStoreCategoryException,
    InvalidEventDataStoreStatusException,
    InvalidParameterCombinationException,
    InvalidParameterException,
    InvalidTrailNameException,
    NoManagementAccountSLRExistsException,
    OperationNotPermittedException,
    TrailNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEventConfiguration",
})) as any;

export type GetEventDataStoreError =
  | EventDataStoreARNInvalidException
  | EventDataStoreNotFoundException
  | InvalidParameterException
  | NoManagementAccountSLRExistsException
  | OperationNotPermittedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Returns information about an event data store specified as either an ARN or the ID
 * portion of the ARN.
 */
export const getEventDataStore: API.OperationMethod<
  GetEventDataStoreRequest,
  GetEventDataStoreResponse,
  GetEventDataStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { EventDataStore: 0 },
    output: { CreatedTimestamp: D.ts, UpdatedTimestamp: D.ts },
  },
  errors: [
    EventDataStoreARNInvalidException,
    EventDataStoreNotFoundException,
    InvalidParameterException,
    NoManagementAccountSLRExistsException,
    OperationNotPermittedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEventDataStore",
})) as any;

export type GetEventSelectorsError =
  | CloudTrailARNInvalidException
  | InvalidTrailNameException
  | NoManagementAccountSLRExistsException
  | OperationNotPermittedException
  | TrailNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Describes the settings for the event selectors that you configured for your trail. The
 * information returned for your event selectors includes the following:
 *
 * - If your event selector includes read-only events, write-only events, or all
 * events. This applies to management events, data events, and network activity events.
 *
 * - If your event selector includes management events.
 *
 * - If your event selector includes network activity events, the event sources
 * for which you are logging network activity events.
 *
 * - If your event selector includes data events, the resources on which you are
 * logging data events.
 *
 * For more information about logging management, data, and network activity events, see the following topics
 * in the *CloudTrail User Guide*:
 *
 * - Logging management events
 *
 * - Logging data events
 *
 * - Logging network activity events
 */
export const getEventSelectors: API.OperationMethod<
  GetEventSelectorsRequest,
  GetEventSelectorsResponse,
  GetEventSelectorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TrailName: 0 } },
  errors: [
    CloudTrailARNInvalidException,
    InvalidTrailNameException,
    NoManagementAccountSLRExistsException,
    OperationNotPermittedException,
    TrailNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEventSelectors",
})) as any;

export type GetImportError =
  | ImportNotFoundException
  | InvalidParameterException
  | OperationNotPermittedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Returns information about a specific import.
 */
export const getImport: API.OperationMethod<
  GetImportRequest,
  GetImportResponse,
  GetImportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ImportId: 0 },
    output: {
      StartEventTime: D.ts,
      EndEventTime: D.ts,
      CreatedTimestamp: D.ts,
      UpdatedTimestamp: D.ts,
    },
  },
  errors: [
    ImportNotFoundException,
    InvalidParameterException,
    OperationNotPermittedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetImport",
})) as any;

export type GetInsightSelectorsError =
  | CloudTrailARNInvalidException
  | InsightNotEnabledException
  | InvalidParameterCombinationException
  | InvalidParameterException
  | InvalidTrailNameException
  | NoManagementAccountSLRExistsException
  | OperationNotPermittedException
  | ThrottlingException
  | TrailNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Describes the settings for the Insights event selectors that you configured for your
 * trail or event data store. `GetInsightSelectors` shows if CloudTrail Insights logging is enabled
 * and which Insights types are configured with corresponding event categories. If you run
 * `GetInsightSelectors` on a trail or event data store that does not have Insights events enabled,
 * the operation throws the exception `InsightNotEnabledException`
 *
 * Specify either the `EventDataStore` parameter to get Insights event selectors for an event data store,
 * or the `TrailName` parameter to the get Insights event selectors for a trail. You cannot specify these parameters together.
 *
 * For more information, see Working with CloudTrail Insights in the *CloudTrail User Guide*.
 */
export const getInsightSelectors: API.OperationMethod<
  GetInsightSelectorsRequest,
  GetInsightSelectorsResponse,
  GetInsightSelectorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TrailName: 0, EventDataStore: 0 } },
  errors: [
    CloudTrailARNInvalidException,
    InsightNotEnabledException,
    InvalidParameterCombinationException,
    InvalidParameterException,
    InvalidTrailNameException,
    NoManagementAccountSLRExistsException,
    OperationNotPermittedException,
    ThrottlingException,
    TrailNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInsightSelectors",
})) as any;

export type GetQueryResultsError =
  | EventDataStoreARNInvalidException
  | EventDataStoreNotFoundException
  | InactiveEventDataStoreException
  | InsufficientEncryptionPolicyException
  | InvalidMaxResultsException
  | InvalidNextTokenException
  | InvalidParameterException
  | NoManagementAccountSLRExistsException
  | OperationNotPermittedException
  | QueryIdNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Gets event data results of a query. You must specify the `QueryID` value
 * returned by the `StartQuery` operation.
 */
export const getQueryResults: API.PaginatedOperationMethod<
  GetQueryResultsRequest,
  GetQueryResultsResponse,
  GetQueryResultsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      EventDataStore: 0,
      QueryId: 0,
      NextToken: 0,
      MaxQueryResults: 0,
      EventDataStoreOwnerAccountId: 0,
    },
  },
  errors: [
    EventDataStoreARNInvalidException,
    EventDataStoreNotFoundException,
    InactiveEventDataStoreException,
    InsufficientEncryptionPolicyException,
    InvalidMaxResultsException,
    InvalidNextTokenException,
    InvalidParameterException,
    NoManagementAccountSLRExistsException,
    OperationNotPermittedException,
    QueryIdNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQueryResults",
  pagination: { inputToken: "NextToken", outputToken: "NextToken" } as const,
})) as any;

export type GetResourcePolicyError =
  | OperationNotPermittedException
  | ResourceARNNotValidException
  | ResourceNotFoundException
  | ResourcePolicyNotFoundException
  | ResourceTypeNotSupportedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Retrieves the JSON text of the resource-based policy document attached to the CloudTrail event data store, dashboard, or channel.
 */
export const getResourcePolicy: API.OperationMethod<
  GetResourcePolicyRequest,
  GetResourcePolicyResponse,
  GetResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0 } },
  errors: [
    OperationNotPermittedException,
    ResourceARNNotValidException,
    ResourceNotFoundException,
    ResourcePolicyNotFoundException,
    ResourceTypeNotSupportedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicy",
})) as any;

export type GetTrailError =
  | CloudTrailARNInvalidException
  | InvalidTrailNameException
  | OperationNotPermittedException
  | TrailNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Returns settings information for a specified trail.
 */
export const getTrail: API.OperationMethod<
  GetTrailRequest,
  GetTrailResponse,
  GetTrailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0 } },
  errors: [
    CloudTrailARNInvalidException,
    InvalidTrailNameException,
    OperationNotPermittedException,
    TrailNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTrail",
})) as any;

export type GetTrailStatusError =
  | CloudTrailARNInvalidException
  | InvalidTrailNameException
  | OperationNotPermittedException
  | TrailNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Returns a JSON-formatted list of information about the specified trail. Fields include
 * information on delivery errors, Amazon SNS and Amazon S3 errors, and start
 * and stop logging times for each trail. This operation returns trail status from a single
 * Region. To return trail status from all Regions, you must call the operation on each
 * Region.
 */
export const getTrailStatus: API.OperationMethod<
  GetTrailStatusRequest,
  GetTrailStatusResponse,
  GetTrailStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0 },
    output: {
      LatestDeliveryTime: D.ts,
      LatestNotificationTime: D.ts,
      StartLoggingTime: D.ts,
      StopLoggingTime: D.ts,
      LatestCloudWatchLogsDeliveryTime: D.ts,
      LatestDigestDeliveryTime: D.ts,
    },
  },
  errors: [
    CloudTrailARNInvalidException,
    InvalidTrailNameException,
    OperationNotPermittedException,
    TrailNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTrailStatus",
})) as any;

export type ListChannelsError =
  | InvalidNextTokenException
  | OperationNotPermittedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Lists the channels in the current account, and their source names.
 */
export const listChannels: API.PaginatedOperationMethod<
  ListChannelsRequest,
  ListChannelsResponse,
  ListChannelsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { MaxResults: 0, NextToken: 0 } },
  errors: [
    InvalidNextTokenException,
    OperationNotPermittedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListChannels",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDashboardsError = UnsupportedOperationException | CommonErrors;
/**
 * Returns information about all dashboards in the account, in the current Region.
 */
export const listDashboards: API.OperationMethod<
  ListDashboardsRequest,
  ListDashboardsResponse,
  ListDashboardsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { NamePrefix: 0, Type: 0, NextToken: 0, MaxResults: 0 },
  },
  errors: [UnsupportedOperationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDashboards",
})) as any;

export type ListEventDataStoresError =
  | InvalidMaxResultsException
  | InvalidNextTokenException
  | NoManagementAccountSLRExistsException
  | OperationNotPermittedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Returns information about all event data stores in the account, in the current
 * Region.
 */
export const listEventDataStores: API.PaginatedOperationMethod<
  ListEventDataStoresRequest,
  ListEventDataStoresResponse,
  ListEventDataStoresError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0 },
    output: {
      EventDataStores: D.list({
        CreatedTimestamp: D.ts,
        UpdatedTimestamp: D.ts,
      }),
    },
  },
  errors: [
    InvalidMaxResultsException,
    InvalidNextTokenException,
    NoManagementAccountSLRExistsException,
    OperationNotPermittedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEventDataStores",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListImportFailuresError =
  | InvalidNextTokenException
  | InvalidParameterException
  | OperationNotPermittedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Returns a list of failures for the specified import.
 */
export const listImportFailures: API.PaginatedOperationMethod<
  ListImportFailuresRequest,
  ListImportFailuresResponse,
  ListImportFailuresError,
  Credentials | HttpClient.HttpClient,
  ImportFailureListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ImportId: 0, MaxResults: 0, NextToken: 0 },
    output: { Failures: D.list({ LastUpdatedTime: D.ts }) },
  },
  errors: [
    InvalidNextTokenException,
    InvalidParameterException,
    OperationNotPermittedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListImportFailures",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Failures",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListImportsError =
  | EventDataStoreARNInvalidException
  | InvalidNextTokenException
  | InvalidParameterException
  | OperationNotPermittedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Returns information on all imports, or a select set of imports by
 * `ImportStatus` or `Destination`.
 */
export const listImports: API.PaginatedOperationMethod<
  ListImportsRequest,
  ListImportsResponse,
  ListImportsError,
  Credentials | HttpClient.HttpClient,
  ImportsListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { MaxResults: 0, Destination: 0, ImportStatus: 0, NextToken: 0 },
    output: {
      Imports: D.list({ CreatedTimestamp: D.ts, UpdatedTimestamp: D.ts }),
    },
  },
  errors: [
    EventDataStoreARNInvalidException,
    InvalidNextTokenException,
    InvalidParameterException,
    OperationNotPermittedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListImports",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Imports",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListInsightsDataError =
  | InvalidParameterException
  | OperationNotPermittedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Returns Insights events generated on a trail that logs data events. You can list Insights events that occurred in a Region within the last 90 days.
 *
 * ListInsightsData supports the following Dimensions for Insights events:
 *
 * - Event ID
 *
 * - Event name
 *
 * - Event source
 *
 * All dimensions are optional. The default number of results returned is 50, with a
 * maximum of 50 possible. The response includes a token that you can use to get the next page
 * of results.
 *
 * The rate of ListInsightsData requests is limited to two per second, per account, per Region. If
 * this limit is exceeded, a throttling error occurs.
 */
export const listInsightsData: API.PaginatedOperationMethod<
  ListInsightsDataRequest,
  ListInsightsDataResponse,
  ListInsightsDataError,
  Credentials | HttpClient.HttpClient,
  Event
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      InsightSource: 0,
      DataType: 0,
      Dimensions: 0,
      StartTime: 0,
      EndTime: 0,
      MaxResults: 0,
      NextToken: 0,
    },
    output: { Events: D.list(o_Event) },
  },
  errors: [
    InvalidParameterException,
    OperationNotPermittedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInsightsData",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Events",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListInsightsMetricDataError =
  | InvalidParameterException
  | InvalidTrailNameException
  | OperationNotPermittedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Returns Insights metrics data for trails that have enabled Insights. The request must include the `EventSource`,
 * `EventName`, and `InsightType` parameters.
 *
 * If the `InsightType` is set to `ApiErrorRateInsight`, the request must also include the `ErrorCode` parameter.
 *
 * The following are the available time periods for `ListInsightsMetricData`. Each cutoff is inclusive.
 *
 * - Data points with a period of 60 seconds (1-minute) are available for 15 days.
 *
 * - Data points with a period of 300 seconds (5-minute) are available for 63 days.
 *
 * - Data points with a period of 3600 seconds (1 hour) are available for 90 days.
 *
 * To use `ListInsightsMetricData` operation, you must have the following permissions:
 *
 * - If `ListInsightsMetricData` is invoked with `TrailName` parameter, access to the `ListInsightsMetricData` API operation is linked to the `cloudtrail:LookupEvents` action and `cloudtrail:ListInsightsData`. To use this operation,
 * you must have permissions to perform the `cloudtrail:LookupEvents` and `cloudtrail:ListInsightsData` action on the specific trail.
 *
 * - If `ListInsightsMetricData` is invoked without `TrailName` parameter, access to the `ListInsightsMetricData` API operation is linked to the `cloudtrail:LookupEvents` action only. To use this operation,
 * you must have permissions to perform the `cloudtrail:LookupEvents` action.
 */
export const listInsightsMetricData: API.PaginatedOperationMethod<
  ListInsightsMetricDataRequest,
  ListInsightsMetricDataResponse,
  ListInsightsMetricDataError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      TrailName: 0,
      EventSource: 0,
      EventName: 0,
      InsightType: 0,
      ErrorCode: 0,
      StartTime: 0,
      EndTime: 0,
      Period: 0,
      DataType: 0,
      MaxResults: 0,
      NextToken: 0,
    },
    output: { Timestamps: D.list(D.ts) },
  },
  errors: [
    InvalidParameterException,
    InvalidTrailNameException,
    OperationNotPermittedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInsightsMetricData",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPublicKeysError =
  | InvalidTimeRangeException
  | InvalidTokenException
  | OperationNotPermittedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Returns all public keys whose private keys were used to sign the digest files within the
 * specified time range. The public key is needed to validate digest files that were signed
 * with its corresponding private key.
 *
 * CloudTrail uses different private and public key pairs per Region. Each digest
 * file is signed with a private key unique to its Region. When you validate a digest file
 * from a specific Region, you must look in the same Region for its corresponding public
 * key.
 */
export const listPublicKeys: API.PaginatedOperationMethod<
  ListPublicKeysRequest,
  ListPublicKeysResponse,
  ListPublicKeysError,
  Credentials | HttpClient.HttpClient,
  PublicKey
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { StartTime: 0, EndTime: 0, NextToken: 0 },
    output: {
      PublicKeyList: D.list({
        Value: D.blob,
        ValidityStartTime: D.ts,
        ValidityEndTime: D.ts,
      }),
    },
  },
  errors: [
    InvalidTimeRangeException,
    InvalidTokenException,
    OperationNotPermittedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPublicKeys",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PublicKeyList",
  } as const,
})) as any;

export type ListQueriesError =
  | EventDataStoreARNInvalidException
  | EventDataStoreNotFoundException
  | InactiveEventDataStoreException
  | InvalidDateRangeException
  | InvalidMaxResultsException
  | InvalidNextTokenException
  | InvalidParameterException
  | InvalidQueryStatusException
  | NoManagementAccountSLRExistsException
  | OperationNotPermittedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Returns a list of queries and query statuses for the past seven days. You must specify
 * an ARN value for `EventDataStore`. Optionally, to shorten the list of results,
 * you can specify a time range, formatted as timestamps, by adding `StartTime` and
 * `EndTime` parameters, and a `QueryStatus` value. Valid values for
 * `QueryStatus` include `QUEUED`, `RUNNING`,
 * `FINISHED`, `FAILED`, `TIMED_OUT`, or
 * `CANCELLED`.
 */
export const listQueries: API.PaginatedOperationMethod<
  ListQueriesRequest,
  ListQueriesResponse,
  ListQueriesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      EventDataStore: 0,
      NextToken: 0,
      MaxResults: 0,
      StartTime: 0,
      EndTime: 0,
      QueryStatus: 0,
    },
    output: { Queries: D.list({ CreationTime: D.ts }) },
  },
  errors: [
    EventDataStoreARNInvalidException,
    EventDataStoreNotFoundException,
    InactiveEventDataStoreException,
    InvalidDateRangeException,
    InvalidMaxResultsException,
    InvalidNextTokenException,
    InvalidParameterException,
    InvalidQueryStatusException,
    NoManagementAccountSLRExistsException,
    OperationNotPermittedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListQueries",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsError =
  | ChannelARNInvalidException
  | CloudTrailARNInvalidException
  | EventDataStoreARNInvalidException
  | EventDataStoreNotFoundException
  | InactiveEventDataStoreException
  | InvalidTokenException
  | InvalidTrailNameException
  | NoManagementAccountSLRExistsException
  | OperationNotPermittedException
  | ResourceNotFoundException
  | ResourceTypeNotSupportedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Lists the tags for the specified trails, event data stores, dashboards, or channels in the current Region.
 */
export const listTags: API.PaginatedOperationMethod<
  ListTagsRequest,
  ListTagsResponse,
  ListTagsError,
  Credentials | HttpClient.HttpClient,
  ResourceTag
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { ResourceIdList: 0, NextToken: 0 } },
  errors: [
    ChannelARNInvalidException,
    CloudTrailARNInvalidException,
    EventDataStoreARNInvalidException,
    EventDataStoreNotFoundException,
    InactiveEventDataStoreException,
    InvalidTokenException,
    InvalidTrailNameException,
    NoManagementAccountSLRExistsException,
    OperationNotPermittedException,
    ResourceNotFoundException,
    ResourceTypeNotSupportedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTags",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ResourceTagList",
  } as const,
})) as any;

export type ListTrailsError =
  | OperationNotPermittedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Lists trails that are in the current account.
 */
export const listTrails: API.PaginatedOperationMethod<
  ListTrailsRequest,
  ListTrailsResponse,
  ListTrailsError,
  Credentials | HttpClient.HttpClient,
  TrailInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { NextToken: 0 } },
  errors: [OperationNotPermittedException, UnsupportedOperationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTrails",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Trails",
  } as const,
})) as any;

export type LookupEventsError =
  | InvalidEventCategoryException
  | InvalidLookupAttributesException
  | InvalidMaxResultsException
  | InvalidNextTokenException
  | InvalidTimeRangeException
  | OperationNotPermittedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Looks up management events or CloudTrail Insights events that are captured by CloudTrail.
 * You can look up events that occurred in a Region within the last 90 days.
 *
 * `LookupEvents` returns recent Insights events for trails that enable Insights. To view Insights events for an event data store, you can run queries on your
 * Insights event data store, and you can also view the Lake dashboard for Insights.
 *
 * Lookup supports the following attributes for management events:
 *
 * - Amazon Web Services access key
 *
 * - Event ID
 *
 * - Event name
 *
 * - Event source
 *
 * - Read only
 *
 * - Resource name
 *
 * - Resource type
 *
 * - User name
 *
 * Lookup supports the following attributes for Insights events:
 *
 * - Event ID
 *
 * - Event name
 *
 * - Event source
 *
 * All attributes are optional. The default number of results returned is 50, with a
 * maximum of 50 possible. The response includes a token that you can use to get the next page
 * of results.
 *
 * The rate of lookup requests is limited to two per second, per account, per Region. If
 * this limit is exceeded, a throttling error occurs.
 */
export const lookupEvents: API.PaginatedOperationMethod<
  LookupEventsRequest,
  LookupEventsResponse,
  LookupEventsError,
  Credentials | HttpClient.HttpClient,
  Event
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      LookupAttributes: D.list({ AttributeKey: 0, AttributeValue: 0 }),
      StartTime: 0,
      EndTime: 0,
      EventCategory: 0,
      MaxResults: 0,
      NextToken: 0,
    },
    output: { Events: D.list(o_Event) },
  },
  errors: [
    InvalidEventCategoryException,
    InvalidLookupAttributesException,
    InvalidMaxResultsException,
    InvalidNextTokenException,
    InvalidTimeRangeException,
    OperationNotPermittedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "LookupEvents",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Events",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type PutEventConfigurationError =
  | CloudTrailARNInvalidException
  | ConflictException
  | EventDataStoreARNInvalidException
  | EventDataStoreNotFoundException
  | InactiveEventDataStoreException
  | InsufficientDependencyServiceAccessPermissionException
  | InsufficientIAMAccessPermissionException
  | InvalidEventDataStoreCategoryException
  | InvalidEventDataStoreStatusException
  | InvalidHomeRegionException
  | InvalidParameterCombinationException
  | InvalidParameterException
  | InvalidTrailNameException
  | NoManagementAccountSLRExistsException
  | NotOrganizationMasterAccountException
  | OperationNotPermittedException
  | ThrottlingException
  | TrailNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Updates the event configuration settings for the specified event data store or trail. This operation supports updating the maximum event size, adding or modifying context key selectors for event data store, and configuring aggregation settings for the trail.
 */
export const putEventConfiguration: API.OperationMethod<
  PutEventConfigurationRequest,
  PutEventConfigurationResponse,
  PutEventConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TrailName: 0,
      EventDataStore: 0,
      MaxEventSize: 0,
      ContextKeySelectors: D.list({ Type: 0, Equals: 0 }),
      AggregationConfigurations: D.list({ Templates: 0, EventCategory: 0 }),
    },
  },
  errors: [
    CloudTrailARNInvalidException,
    ConflictException,
    EventDataStoreARNInvalidException,
    EventDataStoreNotFoundException,
    InactiveEventDataStoreException,
    InsufficientDependencyServiceAccessPermissionException,
    InsufficientIAMAccessPermissionException,
    InvalidEventDataStoreCategoryException,
    InvalidEventDataStoreStatusException,
    InvalidHomeRegionException,
    InvalidParameterCombinationException,
    InvalidParameterException,
    InvalidTrailNameException,
    NoManagementAccountSLRExistsException,
    NotOrganizationMasterAccountException,
    OperationNotPermittedException,
    ThrottlingException,
    TrailNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutEventConfiguration",
})) as any;

export type PutEventSelectorsError =
  | CloudTrailARNInvalidException
  | ConflictException
  | InsufficientDependencyServiceAccessPermissionException
  | InvalidEventSelectorsException
  | InvalidHomeRegionException
  | InvalidTrailNameException
  | NoManagementAccountSLRExistsException
  | NotOrganizationMasterAccountException
  | OperationNotPermittedException
  | ThrottlingException
  | TrailNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Configures event selectors (also referred to as *basic event selectors*) or advanced event selectors for your trail. You can use
 * either `AdvancedEventSelectors` or `EventSelectors`, but not both. If
 * you apply `AdvancedEventSelectors` to a trail, any existing
 * `EventSelectors` are overwritten.
 *
 * You can use `AdvancedEventSelectors` to
 * log management events, data events for all resource types, and network activity events.
 *
 * You can use `EventSelectors` to log management events and data events for the following resource types:
 *
 * - `AWS::DynamoDB::Table`
 *
 * - `AWS::Lambda::Function`
 *
 * - `AWS::S3::Object`
 *
 * You can't use `EventSelectors` to log network activity events.
 *
 * If you want your trail to log Insights events, be sure the event selector or advanced event selector enables
 * logging of the Insights event types you want configured for your trail. For more information about logging Insights events, see Working with CloudTrail Insights in the *CloudTrail User Guide*.
 * By default, trails created without specific event selectors are configured to
 * log all read and write management events, and no data events or network activity events.
 *
 * When an event occurs in your account, CloudTrail evaluates the event selectors or
 * advanced event selectors in all trails. For each trail, if the event matches any event
 * selector, the trail processes and logs the event. If the event doesn't match any event
 * selector, the trail doesn't log the event.
 *
 * Example
 *
 * - You create an event selector for a trail and specify that you want to log write-only
 * events.
 *
 * - The EC2 `GetConsoleOutput` and `RunInstances` API operations
 * occur in your account.
 *
 * - CloudTrail evaluates whether the events match your event selectors.
 *
 * - The `RunInstances` is a write-only event and it matches your event
 * selector. The trail logs the event.
 *
 * - The `GetConsoleOutput` is a read-only event that doesn't match your
 * event selector. The trail doesn't log the event.
 *
 * The `PutEventSelectors` operation must be called from the Region in which the
 * trail was created; otherwise, an `InvalidHomeRegionException` exception is
 * thrown.
 *
 * You can configure up to five event selectors for each trail.
 *
 * You can add advanced event selectors, and conditions for your advanced event selectors,
 * up to a maximum of 500 values for all conditions and selectors on a trail. For more information, see
 * Logging management events, Logging
 * data events, Logging
 * network activity events, and Quotas in CloudTrail in the CloudTrail User
 * Guide.
 */
export const putEventSelectors: API.OperationMethod<
  PutEventSelectorsRequest,
  PutEventSelectorsResponse,
  PutEventSelectorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TrailName: 0,
      EventSelectors: D.list({
        ReadWriteType: 0,
        IncludeManagementEvents: 0,
        DataResources: D.list({ Type: 0, Values: 0 }),
        ExcludeManagementEventSources: 0,
      }),
      AdvancedEventSelectors: D.list(i_AdvancedEventSelector),
    },
  },
  errors: [
    CloudTrailARNInvalidException,
    ConflictException,
    InsufficientDependencyServiceAccessPermissionException,
    InvalidEventSelectorsException,
    InvalidHomeRegionException,
    InvalidTrailNameException,
    NoManagementAccountSLRExistsException,
    NotOrganizationMasterAccountException,
    OperationNotPermittedException,
    ThrottlingException,
    TrailNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutEventSelectors",
})) as any;

export type PutInsightSelectorsError =
  | CloudTrailARNInvalidException
  | InsufficientEncryptionPolicyException
  | InsufficientS3BucketPolicyException
  | InvalidHomeRegionException
  | InvalidInsightSelectorsException
  | InvalidParameterCombinationException
  | InvalidParameterException
  | InvalidTrailNameException
  | KmsException
  | NoManagementAccountSLRExistsException
  | NotOrganizationMasterAccountException
  | OperationNotPermittedException
  | S3BucketDoesNotExistException
  | ThrottlingException
  | TrailNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Lets you enable Insights event logging on specific event categories by specifying the Insights selectors that you
 * want to enable on an existing trail or event data store. You also use `PutInsightSelectors` to turn
 * off Insights event logging, by passing an empty list of Insights types. The valid Insights
 * event types are `ApiErrorRateInsight` and
 * `ApiCallRateInsight`, and valid EventCategories are `Management` and `Data`.
 *
 * Insights on data events are not supported on event data stores. For event data stores, you can only enable Insights on management events.
 *
 * To enable Insights on an event data store, you must specify the ARNs (or ID suffix of the ARNs) for the source event data store (`EventDataStore`) and the destination event data store (`InsightsDestination`). The source event data store logs management events and enables Insights.
 * The destination event data store logs Insights events based upon the management event activity of the source event data store. The source and destination event data stores must belong to the same Amazon Web Services account.
 *
 * To log Insights events for a trail, you must specify the name (`TrailName`) of the CloudTrail trail for which you want to change or add Insights
 * selectors.
 *
 * - For Management events Insights: To log CloudTrail Insights on the API call rate, the trail or event data store must log `write` management events.
 * To log CloudTrail Insights on the API error rate, the trail or event data store must log `read` or `write` management events.
 *
 * - For Data events Insights: To log CloudTrail Insights on the API call rate or API error rate, the trail must log `read` or `write` data events. Data events Insights are not supported on event data store.
 *
 * To log CloudTrail Insights events on API call volume, the trail or event data store
 * must log `write` management events. To log CloudTrail
 * Insights events on API error rate, the trail or event data store must log `read` or
 * `write` management events. You can call `GetEventSelectors` on a trail
 * to check whether the trail logs management events. You can call `GetEventDataStore` on an
 * event data store to check whether the event data store logs management events.
 *
 * For more information, see Working with CloudTrail Insights in the *CloudTrail User Guide*.
 */
export const putInsightSelectors: API.OperationMethod<
  PutInsightSelectorsRequest,
  PutInsightSelectorsResponse,
  PutInsightSelectorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TrailName: 0,
      InsightSelectors: D.list({ InsightType: 0, EventCategories: 0 }),
      EventDataStore: 0,
      InsightsDestination: 0,
    },
  },
  errors: [
    CloudTrailARNInvalidException,
    InsufficientEncryptionPolicyException,
    InsufficientS3BucketPolicyException,
    InvalidHomeRegionException,
    InvalidInsightSelectorsException,
    InvalidParameterCombinationException,
    InvalidParameterException,
    InvalidTrailNameException,
    KmsException,
    NoManagementAccountSLRExistsException,
    NotOrganizationMasterAccountException,
    OperationNotPermittedException,
    S3BucketDoesNotExistException,
    ThrottlingException,
    TrailNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutInsightSelectors",
})) as any;

export type PutResourcePolicyError =
  | ConflictException
  | OperationNotPermittedException
  | ResourceARNNotValidException
  | ResourceNotFoundException
  | ResourcePolicyNotValidException
  | ResourceTypeNotSupportedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Attaches a resource-based permission policy to a CloudTrail event data store, dashboard, or channel. For more information about resource-based policies, see
 * CloudTrail resource-based policy examples
 * in the *CloudTrail User Guide*.
 */
export const putResourcePolicy: API.OperationMethod<
  PutResourcePolicyRequest,
  PutResourcePolicyResponse,
  PutResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0, ResourcePolicy: 0 } },
  errors: [
    ConflictException,
    OperationNotPermittedException,
    ResourceARNNotValidException,
    ResourceNotFoundException,
    ResourcePolicyNotValidException,
    ResourceTypeNotSupportedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePolicy",
})) as any;

export type RegisterOrganizationDelegatedAdminError =
  | AccountNotFoundException
  | AccountRegisteredException
  | CannotDelegateManagementAccountException
  | CloudTrailAccessNotEnabledException
  | ConflictException
  | DelegatedAdminAccountLimitExceededException
  | InsufficientDependencyServiceAccessPermissionException
  | InsufficientIAMAccessPermissionException
  | InvalidParameterException
  | NotOrganizationManagementAccountException
  | OperationNotPermittedException
  | OrganizationNotInAllFeaturesModeException
  | OrganizationsNotInUseException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Registers an organization’s member account as the CloudTrail delegated administrator.
 */
export const registerOrganizationDelegatedAdmin: API.OperationMethod<
  RegisterOrganizationDelegatedAdminRequest,
  RegisterOrganizationDelegatedAdminResponse,
  RegisterOrganizationDelegatedAdminError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { MemberAccountId: 0 } },
  errors: [
    AccountNotFoundException,
    AccountRegisteredException,
    CannotDelegateManagementAccountException,
    CloudTrailAccessNotEnabledException,
    ConflictException,
    DelegatedAdminAccountLimitExceededException,
    InsufficientDependencyServiceAccessPermissionException,
    InsufficientIAMAccessPermissionException,
    InvalidParameterException,
    NotOrganizationManagementAccountException,
    OperationNotPermittedException,
    OrganizationNotInAllFeaturesModeException,
    OrganizationsNotInUseException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterOrganizationDelegatedAdmin",
})) as any;

export type RemoveTagsError =
  | ChannelARNInvalidException
  | ChannelNotFoundException
  | CloudTrailARNInvalidException
  | ConflictException
  | EventDataStoreARNInvalidException
  | EventDataStoreNotFoundException
  | InactiveEventDataStoreException
  | InvalidTagParameterException
  | InvalidTrailNameException
  | NoManagementAccountSLRExistsException
  | NotOrganizationMasterAccountException
  | OperationNotPermittedException
  | ResourceNotFoundException
  | ResourceTypeNotSupportedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Removes the specified tags from a trail, event data store, dashboard, or channel.
 */
export const removeTags: API.OperationMethod<
  RemoveTagsRequest,
  RemoveTagsResponse,
  RemoveTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResourceId: 0, TagsList: D.list(i_Tag) },
  },
  errors: [
    ChannelARNInvalidException,
    ChannelNotFoundException,
    CloudTrailARNInvalidException,
    ConflictException,
    EventDataStoreARNInvalidException,
    EventDataStoreNotFoundException,
    InactiveEventDataStoreException,
    InvalidTagParameterException,
    InvalidTrailNameException,
    NoManagementAccountSLRExistsException,
    NotOrganizationMasterAccountException,
    OperationNotPermittedException,
    ResourceNotFoundException,
    ResourceTypeNotSupportedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveTags",
})) as any;

export type RestoreEventDataStoreError =
  | CloudTrailAccessNotEnabledException
  | EventDataStoreARNInvalidException
  | EventDataStoreMaxLimitExceededException
  | EventDataStoreNotFoundException
  | InsufficientDependencyServiceAccessPermissionException
  | InvalidEventDataStoreStatusException
  | InvalidParameterException
  | NoManagementAccountSLRExistsException
  | NotOrganizationMasterAccountException
  | OperationNotPermittedException
  | OrganizationNotInAllFeaturesModeException
  | OrganizationsNotInUseException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Restores a deleted event data store specified by `EventDataStore`, which
 * accepts an event data store ARN. You can only restore a deleted event data store within the
 * seven-day wait period after deletion. Restoring an event data store can take several
 * minutes, depending on the size of the event data store.
 */
export const restoreEventDataStore: API.OperationMethod<
  RestoreEventDataStoreRequest,
  RestoreEventDataStoreResponse,
  RestoreEventDataStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { EventDataStore: 0 },
    output: { CreatedTimestamp: D.ts, UpdatedTimestamp: D.ts },
  },
  errors: [
    CloudTrailAccessNotEnabledException,
    EventDataStoreARNInvalidException,
    EventDataStoreMaxLimitExceededException,
    EventDataStoreNotFoundException,
    InsufficientDependencyServiceAccessPermissionException,
    InvalidEventDataStoreStatusException,
    InvalidParameterException,
    NoManagementAccountSLRExistsException,
    NotOrganizationMasterAccountException,
    OperationNotPermittedException,
    OrganizationNotInAllFeaturesModeException,
    OrganizationsNotInUseException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreEventDataStore",
})) as any;

export type SearchSampleQueriesError =
  | InvalidParameterException
  | OperationNotPermittedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Searches sample queries and returns a list of sample queries that are sorted by relevance.
 * To search for sample queries, provide a natural language `SearchPhrase` in English.
 */
export const searchSampleQueries: API.OperationMethod<
  SearchSampleQueriesRequest,
  SearchSampleQueriesResponse,
  SearchSampleQueriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { SearchPhrase: 0, MaxResults: 0, NextToken: 0 },
  },
  errors: [
    InvalidParameterException,
    OperationNotPermittedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchSampleQueries",
})) as any;

export type StartDashboardRefreshError =
  | EventDataStoreNotFoundException
  | InactiveEventDataStoreException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Starts a refresh of the specified dashboard.
 *
 * Each time a dashboard is refreshed, CloudTrail runs queries to populate the dashboard's widgets. CloudTrail must be granted permissions to run the `StartQuery` operation on your behalf. To provide permissions, run the `PutResourcePolicy` operation to attach a resource-based policy to each event data store. For more information,
 * see Example: Allow CloudTrail to run queries to populate a dashboard in the *CloudTrail User Guide*.
 */
export const startDashboardRefresh: API.OperationMethod<
  StartDashboardRefreshRequest,
  StartDashboardRefreshResponse,
  StartDashboardRefreshError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DashboardId: 0, QueryParameterValues: 0 },
  },
  errors: [
    EventDataStoreNotFoundException,
    InactiveEventDataStoreException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDashboardRefresh",
})) as any;

export type StartEventDataStoreIngestionError =
  | ConflictException
  | EventDataStoreARNInvalidException
  | EventDataStoreNotFoundException
  | InsufficientDependencyServiceAccessPermissionException
  | InvalidEventDataStoreCategoryException
  | InvalidEventDataStoreStatusException
  | InvalidParameterException
  | NoManagementAccountSLRExistsException
  | NotOrganizationMasterAccountException
  | OperationNotPermittedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Starts the ingestion of live events on an event data store specified as either an ARN or the ID portion of the ARN. To start ingestion, the event data store `Status` must be `STOPPED_INGESTION`
 * and the `eventCategory` must be `Management`, `Data`, `NetworkActivity`, or `ConfigurationItem`.
 */
export const startEventDataStoreIngestion: API.OperationMethod<
  StartEventDataStoreIngestionRequest,
  StartEventDataStoreIngestionResponse,
  StartEventDataStoreIngestionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { EventDataStore: 0 } },
  errors: [
    ConflictException,
    EventDataStoreARNInvalidException,
    EventDataStoreNotFoundException,
    InsufficientDependencyServiceAccessPermissionException,
    InvalidEventDataStoreCategoryException,
    InvalidEventDataStoreStatusException,
    InvalidParameterException,
    NoManagementAccountSLRExistsException,
    NotOrganizationMasterAccountException,
    OperationNotPermittedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartEventDataStoreIngestion",
})) as any;

export type StartImportError =
  | AccountHasOngoingImportException
  | EventDataStoreARNInvalidException
  | EventDataStoreNotFoundException
  | ImportNotFoundException
  | InactiveEventDataStoreException
  | InsufficientEncryptionPolicyException
  | InvalidEventDataStoreCategoryException
  | InvalidEventDataStoreStatusException
  | InvalidImportSourceException
  | InvalidParameterException
  | OperationNotPermittedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Starts an import of logged trail events from a source S3 bucket to a destination event
 * data store. By default, CloudTrail only imports events contained in the S3 bucket's
 * `CloudTrail` prefix and the prefixes inside the `CloudTrail` prefix, and does not check prefixes for other Amazon Web Services
 * services. If you want to import CloudTrail events contained in another prefix, you
 * must include the prefix in the `S3LocationUri`. For more considerations about
 * importing trail events, see Considerations for copying trail events in the *CloudTrail User Guide*.
 *
 * When you start a new import, the `Destinations` and
 * `ImportSource` parameters are required. Before starting a new import, disable
 * any access control lists (ACLs) attached to the source S3 bucket. For more information
 * about disabling ACLs, see Controlling ownership of
 * objects and disabling ACLs for your bucket.
 *
 * When you retry an import, the `ImportID` parameter is required.
 *
 * If the destination event data store is for an organization, you must use the
 * management account to import trail events. You cannot use the delegated administrator
 * account for the organization.
 */
export const startImport: API.OperationMethod<
  StartImportRequest,
  StartImportResponse,
  StartImportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Destinations: 0,
      ImportSource: {
        S3: { S3LocationUri: 0, S3BucketRegion: 0, S3BucketAccessRoleArn: 0 },
      },
      StartEventTime: 0,
      EndEventTime: 0,
      ImportId: 0,
    },
    output: {
      StartEventTime: D.ts,
      EndEventTime: D.ts,
      CreatedTimestamp: D.ts,
      UpdatedTimestamp: D.ts,
    },
  },
  errors: [
    AccountHasOngoingImportException,
    EventDataStoreARNInvalidException,
    EventDataStoreNotFoundException,
    ImportNotFoundException,
    InactiveEventDataStoreException,
    InsufficientEncryptionPolicyException,
    InvalidEventDataStoreCategoryException,
    InvalidEventDataStoreStatusException,
    InvalidImportSourceException,
    InvalidParameterException,
    OperationNotPermittedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartImport",
})) as any;

export type StartLoggingError =
  | CloudTrailARNInvalidException
  | ConflictException
  | InsufficientDependencyServiceAccessPermissionException
  | InvalidHomeRegionException
  | InvalidTrailNameException
  | NoManagementAccountSLRExistsException
  | NotOrganizationMasterAccountException
  | OperationNotPermittedException
  | ThrottlingException
  | TrailNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Starts the recording of Amazon Web Services API calls and log file delivery for a trail.
 * For a trail that is enabled in all Regions, this operation must be called from the Region
 * in which the trail was created. This operation cannot be called on the shadow trails
 * (replicated trails in other Regions) of a trail that is enabled in all Regions.
 */
export const startLogging: API.OperationMethod<
  StartLoggingRequest,
  StartLoggingResponse,
  StartLoggingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0 } },
  errors: [
    CloudTrailARNInvalidException,
    ConflictException,
    InsufficientDependencyServiceAccessPermissionException,
    InvalidHomeRegionException,
    InvalidTrailNameException,
    NoManagementAccountSLRExistsException,
    NotOrganizationMasterAccountException,
    OperationNotPermittedException,
    ThrottlingException,
    TrailNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartLogging",
})) as any;

export type StartQueryError =
  | EventDataStoreARNInvalidException
  | EventDataStoreNotFoundException
  | InactiveEventDataStoreException
  | InsufficientEncryptionPolicyException
  | InsufficientS3BucketPolicyException
  | InvalidParameterException
  | InvalidQueryStatementException
  | InvalidS3BucketNameException
  | InvalidS3PrefixException
  | MaxConcurrentQueriesException
  | NoManagementAccountSLRExistsException
  | OperationNotPermittedException
  | S3BucketDoesNotExistException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Starts a CloudTrail Lake query. Use the `QueryStatement`
 * parameter to provide your SQL query, enclosed in single quotation marks. Use the optional
 * `DeliveryS3Uri` parameter to deliver the query results to an S3
 * bucket.
 *
 * `StartQuery` requires you specify either the `QueryStatement` parameter, or a `QueryAlias` and any `QueryParameters`. In the current release,
 * the `QueryAlias` and `QueryParameters` parameters are used only for the queries that populate the CloudTrail Lake dashboards.
 */
export const startQuery: API.OperationMethod<
  StartQueryRequest,
  StartQueryResponse,
  StartQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      QueryStatement: 0,
      DeliveryS3Uri: 0,
      QueryAlias: 0,
      QueryParameters: 0,
      EventDataStoreOwnerAccountId: 0,
    },
  },
  errors: [
    EventDataStoreARNInvalidException,
    EventDataStoreNotFoundException,
    InactiveEventDataStoreException,
    InsufficientEncryptionPolicyException,
    InsufficientS3BucketPolicyException,
    InvalidParameterException,
    InvalidQueryStatementException,
    InvalidS3BucketNameException,
    InvalidS3PrefixException,
    MaxConcurrentQueriesException,
    NoManagementAccountSLRExistsException,
    OperationNotPermittedException,
    S3BucketDoesNotExistException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartQuery",
})) as any;

export type StopEventDataStoreIngestionError =
  | ConflictException
  | EventDataStoreARNInvalidException
  | EventDataStoreNotFoundException
  | InsufficientDependencyServiceAccessPermissionException
  | InvalidEventDataStoreCategoryException
  | InvalidEventDataStoreStatusException
  | InvalidParameterException
  | NoManagementAccountSLRExistsException
  | NotOrganizationMasterAccountException
  | OperationNotPermittedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Stops the ingestion of live events on an event data store specified as either an ARN or the ID portion of the ARN. To stop ingestion, the event data store `Status` must be `ENABLED`
 * and the `eventCategory` must be `Management`, `Data`, `NetworkActivity`, or `ConfigurationItem`.
 */
export const stopEventDataStoreIngestion: API.OperationMethod<
  StopEventDataStoreIngestionRequest,
  StopEventDataStoreIngestionResponse,
  StopEventDataStoreIngestionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { EventDataStore: 0 } },
  errors: [
    ConflictException,
    EventDataStoreARNInvalidException,
    EventDataStoreNotFoundException,
    InsufficientDependencyServiceAccessPermissionException,
    InvalidEventDataStoreCategoryException,
    InvalidEventDataStoreStatusException,
    InvalidParameterException,
    NoManagementAccountSLRExistsException,
    NotOrganizationMasterAccountException,
    OperationNotPermittedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopEventDataStoreIngestion",
})) as any;

export type StopImportError =
  | ImportNotFoundException
  | InvalidParameterException
  | OperationNotPermittedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Stops a specified import.
 */
export const stopImport: API.OperationMethod<
  StopImportRequest,
  StopImportResponse,
  StopImportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ImportId: 0 },
    output: {
      CreatedTimestamp: D.ts,
      UpdatedTimestamp: D.ts,
      StartEventTime: D.ts,
      EndEventTime: D.ts,
    },
  },
  errors: [
    ImportNotFoundException,
    InvalidParameterException,
    OperationNotPermittedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopImport",
})) as any;

export type StopLoggingError =
  | CloudTrailARNInvalidException
  | ConflictException
  | InsufficientDependencyServiceAccessPermissionException
  | InvalidHomeRegionException
  | InvalidTrailNameException
  | NoManagementAccountSLRExistsException
  | NotOrganizationMasterAccountException
  | OperationNotPermittedException
  | ThrottlingException
  | TrailNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Suspends the recording of Amazon Web Services API calls and log file delivery for the
 * specified trail. Under most circumstances, there is no need to use this action. You can
 * update a trail without stopping it first. This action is the only way to stop recording.
 * For a trail enabled in all Regions, this operation must be called from the Region in which
 * the trail was created, or an `InvalidHomeRegionException` will occur. This
 * operation cannot be called on the shadow trails (replicated trails in other Regions) of a
 * trail enabled in all Regions.
 */
export const stopLogging: API.OperationMethod<
  StopLoggingRequest,
  StopLoggingResponse,
  StopLoggingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0 } },
  errors: [
    CloudTrailARNInvalidException,
    ConflictException,
    InsufficientDependencyServiceAccessPermissionException,
    InvalidHomeRegionException,
    InvalidTrailNameException,
    NoManagementAccountSLRExistsException,
    NotOrganizationMasterAccountException,
    OperationNotPermittedException,
    ThrottlingException,
    TrailNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopLogging",
})) as any;

export type UpdateChannelError =
  | ChannelAlreadyExistsException
  | ChannelARNInvalidException
  | ChannelNotFoundException
  | EventDataStoreARNInvalidException
  | EventDataStoreNotFoundException
  | InactiveEventDataStoreException
  | InvalidEventDataStoreCategoryException
  | InvalidParameterException
  | OperationNotPermittedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Updates a channel specified by a required channel ARN or UUID.
 */
export const updateChannel: API.OperationMethod<
  UpdateChannelRequest,
  UpdateChannelResponse,
  UpdateChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Channel: 0, Destinations: D.list(i_Destination), Name: 0 },
  },
  errors: [
    ChannelAlreadyExistsException,
    ChannelARNInvalidException,
    ChannelNotFoundException,
    EventDataStoreARNInvalidException,
    EventDataStoreNotFoundException,
    InactiveEventDataStoreException,
    InvalidEventDataStoreCategoryException,
    InvalidParameterException,
    OperationNotPermittedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateChannel",
})) as any;

export type UpdateDashboardError =
  | ConflictException
  | EventDataStoreNotFoundException
  | InactiveEventDataStoreException
  | InsufficientEncryptionPolicyException
  | InvalidQueryStatementException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Updates the specified dashboard.
 *
 * To set a refresh schedule, CloudTrail must be granted permissions to run the `StartDashboardRefresh` operation to refresh the dashboard on your behalf. To provide permissions, run the `PutResourcePolicy` operation to attach a resource-based policy to the dashboard. For more information,
 * see
 * Resource-based policy example for a dashboard in the *CloudTrail User Guide*.
 *
 * CloudTrail runs queries to populate the dashboard's widgets during a manual or scheduled refresh. CloudTrail must be granted permissions to run the `StartQuery` operation on your behalf. To provide permissions, run the `PutResourcePolicy` operation to attach a resource-based policy to each event data store. For more information,
 * see Example: Allow CloudTrail to run queries to populate a dashboard in the *CloudTrail User Guide*.
 */
export const updateDashboard: API.OperationMethod<
  UpdateDashboardRequest,
  UpdateDashboardResponse,
  UpdateDashboardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DashboardId: 0,
      Widgets: D.list(i_RequestWidget),
      RefreshSchedule: i_RefreshSchedule,
      TerminationProtectionEnabled: 0,
    },
    output: { CreatedTimestamp: D.ts, UpdatedTimestamp: D.ts },
  },
  errors: [
    ConflictException,
    EventDataStoreNotFoundException,
    InactiveEventDataStoreException,
    InsufficientEncryptionPolicyException,
    InvalidQueryStatementException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDashboard",
})) as any;

export type UpdateEventDataStoreError =
  | CloudTrailAccessNotEnabledException
  | ConflictException
  | EventDataStoreAlreadyExistsException
  | EventDataStoreARNInvalidException
  | EventDataStoreHasOngoingImportException
  | EventDataStoreNotFoundException
  | InactiveEventDataStoreException
  | InsufficientDependencyServiceAccessPermissionException
  | InsufficientEncryptionPolicyException
  | InvalidEventSelectorsException
  | InvalidInsightSelectorsException
  | InvalidKmsKeyIdException
  | InvalidParameterException
  | KmsException
  | KmsKeyNotFoundException
  | NoManagementAccountSLRExistsException
  | NotOrganizationMasterAccountException
  | OperationNotPermittedException
  | OrganizationNotInAllFeaturesModeException
  | OrganizationsNotInUseException
  | ThrottlingException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Updates an event data store. The required `EventDataStore` value is an ARN or
 * the ID portion of the ARN. Other parameters are optional, but at least one optional
 * parameter must be specified, or CloudTrail throws an error.
 * `RetentionPeriod` is in days, and valid values are integers between 7 and
 * 3653 if the `BillingMode` is set to `EXTENDABLE_RETENTION_PRICING`, or between 7 and 2557 if `BillingMode` is set to `FIXED_RETENTION_PRICING`. By default, `TerminationProtection` is enabled.
 *
 * For event data stores for CloudTrail events, `AdvancedEventSelectors`
 * includes or excludes management, data, or network activity events in your event data store. For more
 * information about `AdvancedEventSelectors`, see AdvancedEventSelectors.
 *
 * For event data stores for CloudTrail Insights events, Config configuration items, Audit Manager evidence, or non-Amazon Web Services events,
 * `AdvancedEventSelectors` includes events of that type in your event data store.
 */
export const updateEventDataStore: API.OperationMethod<
  UpdateEventDataStoreRequest,
  UpdateEventDataStoreResponse,
  UpdateEventDataStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      EventDataStore: 0,
      Name: 0,
      AdvancedEventSelectors: D.list(i_AdvancedEventSelector),
      MultiRegionEnabled: 0,
      OrganizationEnabled: 0,
      RetentionPeriod: 0,
      TerminationProtectionEnabled: 0,
      KmsKeyId: 0,
      BillingMode: 0,
    },
    output: { CreatedTimestamp: D.ts, UpdatedTimestamp: D.ts },
  },
  errors: [
    CloudTrailAccessNotEnabledException,
    ConflictException,
    EventDataStoreAlreadyExistsException,
    EventDataStoreARNInvalidException,
    EventDataStoreHasOngoingImportException,
    EventDataStoreNotFoundException,
    InactiveEventDataStoreException,
    InsufficientDependencyServiceAccessPermissionException,
    InsufficientEncryptionPolicyException,
    InvalidEventSelectorsException,
    InvalidInsightSelectorsException,
    InvalidKmsKeyIdException,
    InvalidParameterException,
    KmsException,
    KmsKeyNotFoundException,
    NoManagementAccountSLRExistsException,
    NotOrganizationMasterAccountException,
    OperationNotPermittedException,
    OrganizationNotInAllFeaturesModeException,
    OrganizationsNotInUseException,
    ThrottlingException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEventDataStore",
})) as any;

export type UpdateTrailError =
  | CloudTrailAccessNotEnabledException
  | CloudTrailARNInvalidException
  | CloudTrailInvalidClientTokenIdException
  | CloudWatchLogsDeliveryUnavailableException
  | ConflictException
  | InsufficientDependencyServiceAccessPermissionException
  | InsufficientEncryptionPolicyException
  | InsufficientS3BucketPolicyException
  | InsufficientSnsTopicPolicyException
  | InvalidCloudWatchLogsLogGroupArnException
  | InvalidCloudWatchLogsRoleArnException
  | InvalidEventSelectorsException
  | InvalidHomeRegionException
  | InvalidKmsKeyIdException
  | InvalidParameterCombinationException
  | InvalidParameterException
  | InvalidS3BucketNameException
  | InvalidS3PrefixException
  | InvalidSnsTopicNameException
  | InvalidTrailNameException
  | KmsException
  | KmsKeyDisabledException
  | KmsKeyNotFoundException
  | NoManagementAccountSLRExistsException
  | NotOrganizationMasterAccountException
  | OperationNotPermittedException
  | OrganizationNotInAllFeaturesModeException
  | OrganizationsNotInUseException
  | S3BucketDoesNotExistException
  | ThrottlingException
  | TrailNotFoundException
  | TrailNotProvidedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Updates trail settings that control what events you are logging, and how to handle log
 * files. Changes to a trail do not require stopping the CloudTrail service. Use this
 * action to designate an existing bucket for log delivery. If the existing bucket has
 * previously been a target for CloudTrail log files, an IAM policy
 * exists for the bucket. `UpdateTrail` must be called from the Region in which the
 * trail was created; otherwise, an `InvalidHomeRegionException` is thrown.
 */
export const updateTrail: API.OperationMethod<
  UpdateTrailRequest,
  UpdateTrailResponse,
  UpdateTrailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      S3BucketName: 0,
      S3KeyPrefix: 0,
      SnsTopicName: 0,
      IncludeGlobalServiceEvents: 0,
      IsMultiRegionTrail: 0,
      EnableLogFileValidation: 0,
      CloudWatchLogsLogGroupArn: 0,
      CloudWatchLogsRoleArn: 0,
      KmsKeyId: 0,
      IsOrganizationTrail: 0,
    },
  },
  errors: [
    CloudTrailAccessNotEnabledException,
    CloudTrailARNInvalidException,
    CloudTrailInvalidClientTokenIdException,
    CloudWatchLogsDeliveryUnavailableException,
    ConflictException,
    InsufficientDependencyServiceAccessPermissionException,
    InsufficientEncryptionPolicyException,
    InsufficientS3BucketPolicyException,
    InsufficientSnsTopicPolicyException,
    InvalidCloudWatchLogsLogGroupArnException,
    InvalidCloudWatchLogsRoleArnException,
    InvalidEventSelectorsException,
    InvalidHomeRegionException,
    InvalidKmsKeyIdException,
    InvalidParameterCombinationException,
    InvalidParameterException,
    InvalidS3BucketNameException,
    InvalidS3PrefixException,
    InvalidSnsTopicNameException,
    InvalidTrailNameException,
    KmsException,
    KmsKeyDisabledException,
    KmsKeyNotFoundException,
    NoManagementAccountSLRExistsException,
    NotOrganizationMasterAccountException,
    OperationNotPermittedException,
    OrganizationNotInAllFeaturesModeException,
    OrganizationsNotInUseException,
    S3BucketDoesNotExistException,
    ThrottlingException,
    TrailNotFoundException,
    TrailNotProvidedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTrail",
})) as any;

const i_AdvancedEventSelector: D.LazyStruct = () => ({
  Name: 0,
  FieldSelectors: D.list({
    Field: 0,
    Equals: 0,
    StartsWith: 0,
    EndsWith: 0,
    NotEquals: 0,
    NotStartsWith: 0,
    NotEndsWith: 0,
  }),
});
const i_Destination: D.LazyStruct = () => ({ Type: 0, Location: 0 });
const i_RefreshSchedule: D.LazyStruct = () => ({
  Frequency: { Unit: 0, Value: 0 },
  Status: 0,
  TimeOfDay: 0,
});
const i_RequestWidget: D.LazyStruct = () => ({
  QueryStatement: 0,
  QueryParameters: 0,
  ViewProperties: 0,
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const o_Event: D.LazyStruct = () => ({ EventTime: D.ts });
