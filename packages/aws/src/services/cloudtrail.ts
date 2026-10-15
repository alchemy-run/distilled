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
const ns = /*@__PURE__*/ T.XmlNamespace("http://cloudtrail.amazonaws.com/doc/2013-11-01/");
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "CloudTrail",
  serviceShapeName: "CloudTrail_20131101",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "cloudtrail" });
const ver = /*@__PURE__*/ T.ServiceVersion("2013-11-01");
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://cloudtrail.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://cloudtrail.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://cloudtrail.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ResourceAccessDenied", httpResponseCode: 403 }),
      /*@__PURE__*/ T.HttpError(403),
    ),
  ).pipe(C.withAuthError) {}
export class AccountHasOngoingImportException
  extends /*@__PURE__*/ S.TaggedError<AccountHasOngoingImportException>()(
    "AccountHasOngoingImportException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "AccountHasOngoingImport", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class AccountNotFoundException
  extends /*@__PURE__*/ S.TaggedError<AccountNotFoundException>()(
    "AccountNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "AccountNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class AccountNotRegisteredException
  extends /*@__PURE__*/ S.TaggedError<AccountNotRegisteredException>()(
    "AccountNotRegisteredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "AccountNotRegistered", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class AccountRegisteredException
  extends /*@__PURE__*/ S.TaggedError<AccountRegisteredException>()(
    "AccountRegisteredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "AccountRegistered", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class CannotDelegateManagementAccountException
  extends /*@__PURE__*/ S.TaggedError<CannotDelegateManagementAccountException>()(
    "CannotDelegateManagementAccountException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "CannotDelegateManagementAccount",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ChannelAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<ChannelAlreadyExistsException>()(
    "ChannelAlreadyExistsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ChannelAlreadyExists", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class ChannelARNInvalidException
  extends /*@__PURE__*/ S.TaggedError<ChannelARNInvalidException>()(
    "ChannelARNInvalidException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ChannelARNInvalid", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ChannelExistsForEDSException
  extends /*@__PURE__*/ S.TaggedError<ChannelExistsForEDSException>()(
    "ChannelExistsForEDSException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ChannelExistsForEDS", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ChannelMaxLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ChannelMaxLimitExceededException>()(
    "ChannelMaxLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ChannelMaxLimitExceeded", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ChannelNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ChannelNotFoundException>()(
    "ChannelNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ChannelNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class CloudTrailAccessNotEnabledException
  extends /*@__PURE__*/ S.TaggedError<CloudTrailAccessNotEnabledException>()(
    "CloudTrailAccessNotEnabledException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "CloudTrailAccessNotEnabled", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class CloudTrailARNInvalidException
  extends /*@__PURE__*/ S.TaggedError<CloudTrailARNInvalidException>()(
    "CloudTrailARNInvalidException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "CloudTrailARNInvalid", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class CloudTrailInvalidClientTokenIdException
  extends /*@__PURE__*/ S.TaggedError<CloudTrailInvalidClientTokenIdException>()(
    "CloudTrailInvalidClientTokenIdException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "CloudTrailInvalidClientTokenId",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class CloudTrailLakeOnboardingClosed
  extends /*@__PURE__*/ S.TaggedError<CloudTrailLakeOnboardingClosed>()(
    "CloudTrailLakeOnboardingClosed",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.SyntheticError({
      from: "InvalidParameterException",
      message: { includes: "no longer accepting new customers" },
    }),
  ).pipe(C.withBadRequestError) {}
export class CloudWatchLogsDeliveryUnavailableException
  extends /*@__PURE__*/ S.TaggedError<CloudWatchLogsDeliveryUnavailableException>()(
    "CloudWatchLogsDeliveryUnavailableException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "CloudWatchLogsDeliveryUnavailable",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ConcurrentModificationException
  extends /*@__PURE__*/ S.TaggedError<ConcurrentModificationException>()(
    "ConcurrentModificationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ConcurrentModification", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ConflictException", httpResponseCode: 409 }),
      /*@__PURE__*/ T.HttpError(409),
    ),
  ).pipe(C.withConflictError) {}
export class DelegatedAdminAccountLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<DelegatedAdminAccountLimitExceededException>()(
    "DelegatedAdminAccountLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "DelegatedAdminAccountLimitExceeded",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class EventDataStoreAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<EventDataStoreAlreadyExistsException>()(
    "EventDataStoreAlreadyExistsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "EventDataStoreAlreadyExists", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class EventDataStoreARNInvalidException
  extends /*@__PURE__*/ S.TaggedError<EventDataStoreARNInvalidException>()(
    "EventDataStoreARNInvalidException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "EventDataStoreARNInvalid", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class EventDataStoreFederationEnabledException
  extends /*@__PURE__*/ S.TaggedError<EventDataStoreFederationEnabledException>()(
    "EventDataStoreFederationEnabledException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "EventDataStoreFederationEnabled",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class EventDataStoreHasOngoingImportException
  extends /*@__PURE__*/ S.TaggedError<EventDataStoreHasOngoingImportException>()(
    "EventDataStoreHasOngoingImportException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "EventDataStoreHasOngoingImport",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class EventDataStoreMaxLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<EventDataStoreMaxLimitExceededException>()(
    "EventDataStoreMaxLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "EventDataStoreMaxLimitExceeded",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class EventDataStoreNotFoundException
  extends /*@__PURE__*/ S.TaggedError<EventDataStoreNotFoundException>()(
    "EventDataStoreNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "EventDataStoreNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class EventDataStoreTerminationProtectedException
  extends /*@__PURE__*/ S.TaggedError<EventDataStoreTerminationProtectedException>()(
    "EventDataStoreTerminationProtectedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "EventDataStoreTerminationProtectedException",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class GenerateResponseException
  extends /*@__PURE__*/ S.TaggedError<GenerateResponseException>()(
    "GenerateResponseException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "GenerateResponse", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ImportNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ImportNotFoundException>()(
    "ImportNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ImportNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class InactiveEventDataStoreException
  extends /*@__PURE__*/ S.TaggedError<InactiveEventDataStoreException>()(
    "InactiveEventDataStoreException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InactiveEventDataStore", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InactiveQueryException
  extends /*@__PURE__*/ S.TaggedError<InactiveQueryException>()(
    "InactiveQueryException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InactiveQuery", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InsightNotEnabledException
  extends /*@__PURE__*/ S.TaggedError<InsightNotEnabledException>()(
    "InsightNotEnabledException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InsightNotEnabled", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InsufficientDependencyServiceAccessPermissionException
  extends /*@__PURE__*/ S.TaggedError<InsufficientDependencyServiceAccessPermissionException>()(
    "InsufficientDependencyServiceAccessPermissionException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "InsufficientDependencyServiceAccessPermission",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InsufficientEncryptionPolicyException
  extends /*@__PURE__*/ S.TaggedError<InsufficientEncryptionPolicyException>()(
    "InsufficientEncryptionPolicyException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "InsufficientEncryptionPolicy",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InsufficientIAMAccessPermissionException
  extends /*@__PURE__*/ S.TaggedError<InsufficientIAMAccessPermissionException>()(
    "InsufficientIAMAccessPermissionException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "InsufficientIAMAccessPermission",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InsufficientS3BucketPolicyException
  extends /*@__PURE__*/ S.TaggedError<InsufficientS3BucketPolicyException>()(
    "InsufficientS3BucketPolicyException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InsufficientS3BucketPolicy", httpResponseCode: 403 }),
      /*@__PURE__*/ T.HttpError(403),
    ),
  ).pipe(C.withAuthError) {}
export class InsufficientSnsTopicPolicyException
  extends /*@__PURE__*/ S.TaggedError<InsufficientSnsTopicPolicyException>()(
    "InsufficientSnsTopicPolicyException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InsufficientSnsTopicPolicy", httpResponseCode: 403 }),
      /*@__PURE__*/ T.HttpError(403),
    ),
  ).pipe(C.withAuthError) {}
export class InvalidCloudWatchLogsLogGroupArnException
  extends /*@__PURE__*/ S.TaggedError<InvalidCloudWatchLogsLogGroupArnException>()(
    "InvalidCloudWatchLogsLogGroupArnException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "InvalidCloudWatchLogsLogGroupArn",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidCloudWatchLogsRoleArnException
  extends /*@__PURE__*/ S.TaggedError<InvalidCloudWatchLogsRoleArnException>()(
    "InvalidCloudWatchLogsRoleArnException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "InvalidCloudWatchLogsRoleArn",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidDateRangeException
  extends /*@__PURE__*/ S.TaggedError<InvalidDateRangeException>()(
    "InvalidDateRangeException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidDateRange", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidEventCategoryException
  extends /*@__PURE__*/ S.TaggedError<InvalidEventCategoryException>()(
    "InvalidEventCategoryException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidEventCategory", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidEventDataStoreCategoryException
  extends /*@__PURE__*/ S.TaggedError<InvalidEventDataStoreCategoryException>()(
    "InvalidEventDataStoreCategoryException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "InvalidEventDataStoreCategory",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidEventDataStoreStatusException
  extends /*@__PURE__*/ S.TaggedError<InvalidEventDataStoreStatusException>()(
    "InvalidEventDataStoreStatusException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidEventDataStoreStatus", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidEventSelectorsException
  extends /*@__PURE__*/ S.TaggedError<InvalidEventSelectorsException>()(
    "InvalidEventSelectorsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidEventSelectors", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidHomeRegionException
  extends /*@__PURE__*/ S.TaggedError<InvalidHomeRegionException>()(
    "InvalidHomeRegionException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidHomeRegion", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidImportSourceException
  extends /*@__PURE__*/ S.TaggedError<InvalidImportSourceException>()(
    "InvalidImportSourceException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidImportSource", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidInsightSelectorsException
  extends /*@__PURE__*/ S.TaggedError<InvalidInsightSelectorsException>()(
    "InvalidInsightSelectorsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidInsightSelectors", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidKmsKeyIdException
  extends /*@__PURE__*/ S.TaggedError<InvalidKmsKeyIdException>()(
    "InvalidKmsKeyIdException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidKmsKeyId", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidLookupAttributesException
  extends /*@__PURE__*/ S.TaggedError<InvalidLookupAttributesException>()(
    "InvalidLookupAttributesException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidLookupAttributes", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidMaxResultsException
  extends /*@__PURE__*/ S.TaggedError<InvalidMaxResultsException>()(
    "InvalidMaxResultsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidMaxResults", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidNextTokenException>()(
    "InvalidNextTokenException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidNextToken", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterCombinationException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterCombinationException>()(
    "InvalidParameterCombinationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "InvalidParameterCombinationError",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterException>()(
    "InvalidParameterException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidParameter", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidQueryStatementException
  extends /*@__PURE__*/ S.TaggedError<InvalidQueryStatementException>()(
    "InvalidQueryStatementException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidQueryStatement", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidQueryStatusException
  extends /*@__PURE__*/ S.TaggedError<InvalidQueryStatusException>()(
    "InvalidQueryStatusException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidQueryStatus", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidS3BucketNameException
  extends /*@__PURE__*/ S.TaggedError<InvalidS3BucketNameException>()(
    "InvalidS3BucketNameException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidS3BucketName", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidS3PrefixException
  extends /*@__PURE__*/ S.TaggedError<InvalidS3PrefixException>()(
    "InvalidS3PrefixException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidS3Prefix", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidSnsTopicNameException
  extends /*@__PURE__*/ S.TaggedError<InvalidSnsTopicNameException>()(
    "InvalidSnsTopicNameException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidSnsTopicName", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidSourceException
  extends /*@__PURE__*/ S.TaggedError<InvalidSourceException>()(
    "InvalidSourceException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidSource", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidTagParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidTagParameterException>()(
    "InvalidTagParameterException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidTagParameter", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidTimeRangeException
  extends /*@__PURE__*/ S.TaggedError<InvalidTimeRangeException>()(
    "InvalidTimeRangeException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidTimeRange", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidTokenException>()(
    "InvalidTokenException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidToken", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidTrailNameException
  extends /*@__PURE__*/ S.TaggedError<InvalidTrailNameException>()(
    "InvalidTrailNameException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidTrailName", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class KmsException
  extends /*@__PURE__*/ S.TaggedError<KmsException>()(
    "KmsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "KmsException", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class KmsKeyDisabledException
  extends /*@__PURE__*/ S.TaggedError<KmsKeyDisabledException>()(
    "KmsKeyDisabledException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "KmsKeyDisabled", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class KmsKeyNotFoundException
  extends /*@__PURE__*/ S.TaggedError<KmsKeyNotFoundException>()(
    "KmsKeyNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "KmsKeyNotFound", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class MaxConcurrentQueriesException
  extends /*@__PURE__*/ S.TaggedError<MaxConcurrentQueriesException>()(
    "MaxConcurrentQueriesException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "MaxConcurrentQueries", httpResponseCode: 429 }),
      /*@__PURE__*/ T.HttpError(429),
    ),
  ).pipe(C.withThrottlingError) {}
export class MaximumNumberOfTrailsExceededException
  extends /*@__PURE__*/ S.TaggedError<MaximumNumberOfTrailsExceededException>()(
    "MaximumNumberOfTrailsExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "MaximumNumberOfTrailsExceeded",
        httpResponseCode: 403,
      }),
      /*@__PURE__*/ T.HttpError(403),
    ),
  ).pipe(C.withAuthError) {}
export class NoManagementAccountSLRExistsException
  extends /*@__PURE__*/ S.TaggedError<NoManagementAccountSLRExistsException>()(
    "NoManagementAccountSLRExistsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "NoManagementAccountSLRExists",
        httpResponseCode: 403,
      }),
      /*@__PURE__*/ T.HttpError(403),
    ),
  ).pipe(C.withAuthError) {}
export class NotOrganizationManagementAccountException
  extends /*@__PURE__*/ S.TaggedError<NotOrganizationManagementAccountException>()(
    "NotOrganizationManagementAccountException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "NotOrganizationManagementAccount",
        httpResponseCode: 403,
      }),
      /*@__PURE__*/ T.HttpError(403),
    ),
  ).pipe(C.withAuthError) {}
export class NotOrganizationMasterAccountException
  extends /*@__PURE__*/ S.TaggedError<NotOrganizationMasterAccountException>()(
    "NotOrganizationMasterAccountException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "NotOrganizationMasterAccount",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class OperationNotPermittedException
  extends /*@__PURE__*/ S.TaggedError<OperationNotPermittedException>()(
    "OperationNotPermittedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "OperationNotPermitted", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class OrganizationNotInAllFeaturesModeException
  extends /*@__PURE__*/ S.TaggedError<OrganizationNotInAllFeaturesModeException>()(
    "OrganizationNotInAllFeaturesModeException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "OrganizationNotInAllFeaturesMode",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class OrganizationsNotInUseException
  extends /*@__PURE__*/ S.TaggedError<OrganizationsNotInUseException>()(
    "OrganizationsNotInUseException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "OrganizationsNotInUse", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class QueryIdNotFoundException
  extends /*@__PURE__*/ S.TaggedError<QueryIdNotFoundException>()(
    "QueryIdNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "QueryIdNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ResourceARNNotValidException
  extends /*@__PURE__*/ S.TaggedError<ResourceARNNotValidException>()(
    "ResourceARNNotValidException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ResourceARNNotValid", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ResourceNotFound", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ResourcePolicyNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourcePolicyNotFoundException>()(
    "ResourcePolicyNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ResourcePolicyNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ResourcePolicyNotValidException
  extends /*@__PURE__*/ S.TaggedError<ResourcePolicyNotValidException>()(
    "ResourcePolicyNotValidException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ResourcePolicyNotValid", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ResourceTypeNotSupportedException
  extends /*@__PURE__*/ S.TaggedError<ResourceTypeNotSupportedException>()(
    "ResourceTypeNotSupportedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ResourceTypeNotSupported", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class S3BucketDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<S3BucketDoesNotExistException>()(
    "S3BucketDoesNotExistException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "S3BucketDoesNotExist", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ServiceQuotaExceeded", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class TagsLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<TagsLimitExceededException>()(
    "TagsLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "TagsLimitExceeded", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ThrottlingException", httpResponseCode: 429 }),
      /*@__PURE__*/ T.HttpError(429),
    ),
  ).pipe(C.withThrottlingError) {}
export class TrailAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<TrailAlreadyExistsException>()(
    "TrailAlreadyExistsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "TrailAlreadyExists", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class TrailNotFoundException
  extends /*@__PURE__*/ S.TaggedError<TrailNotFoundException>()(
    "TrailNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "TrailNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class TrailNotProvidedException
  extends /*@__PURE__*/ S.TaggedError<TrailNotProvidedException>()(
    "TrailNotProvidedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "TrailNotProvided", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class UnsupportedOperationException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedOperationException>()(
    "UnsupportedOperationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "UnsupportedOperation", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
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
export type DestinationType = "EVENT_DATA_STORE" | "AWS_SERVICE" | (string & {});
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
  RecursiveLogging?: boolean;
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
  RecursiveLogging?: boolean;
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
  RecursiveLogging?: boolean;
}
export type TrailList = Trail[];
export interface DescribeTrailsResponse {
  trailList?: Trail[];
}
export interface DisableFederationRequest {
  EventDataStore: string;
}
export type FederationStatus = "ENABLING" | "ENABLED" | "DISABLING" | "DISABLED" | (string & {});
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
export type Template = "API_ACTIVITY" | "RESOURCE_ACCESS" | "USER_ACTIONS" | (string & {});
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
export type InsightType = "ApiCallRateInsight" | "ApiErrorRateInsight" | (string & {});
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
export type ImportFailureStatus = "FAILED" | "RETRY" | "SUCCEEDED" | (string & {});
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
export type ListInsightsDataDimensionKey = "EventId" | "EventName" | "EventSource" | (string & {});
export type ListInsightsDataDimensionValue = string;
export type ListInsightsDataDimensions = { [key in ListInsightsDataDimensionKey]?: string };
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
export type InsightsMetricDataType = "FillWithZeros" | "NonZeroData" | (string & {});
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
export type SearchSampleQueriesSearchResults = SearchSampleQueriesSearchResult[];
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
  RecursiveLogging?: boolean;
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
  RecursiveLogging?: boolean;
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
  input: __S(448, __c56, 0) as any as S.Schema<AddTagsRequest>,
  output: __S(464, __c58, 0) as any as S.Schema<AddTagsResponse>,
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
}));

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
 * CloudTrail Lake will no longer be open to new customers starting May 31, 2026. If you would like to use CloudTrail Lake, sign up prior to that date. Existing customers can continue to use the service as normal. For more information, see CloudTrail Lake availability change.
 *
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
  input: __S(472, __c59, 0) as any as S.Schema<CancelQueryRequest>,
  output: __S(473, __c59, 1) as any as S.Schema<CancelQueryResponse>,
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
}));

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
 * CloudTrail Lake will no longer be open to new customers starting May 31, 2026. If you would like to use CloudTrail Lake, sign up prior to that date. Existing customers can continue to use the service as normal. For more information, see CloudTrail Lake availability change.
 *
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
  input: __S(480, __c60, 0) as any as S.Schema<CreateChannelRequest>,
  output: __S(481, __c60, 1) as any as S.Schema<CreateChannelResponse>,
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
}));

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
 * CloudTrail Lake will no longer be open to new customers starting May 31, 2026. If you would like to use CloudTrail Lake, sign up prior to that date. Existing customers can continue to use the service as normal. For more information, see CloudTrail Lake availability change.
 *
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
  input: __S(496, __c62, 0) as any as S.Schema<CreateDashboardRequest>,
  output: __S(497, __c62, 1) as any as S.Schema<CreateDashboardResponse>,
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
}));

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
 * CloudTrail Lake will no longer be open to new customers starting May 31, 2026. If you would like to use CloudTrail Lake, sign up prior to that date. Existing customers can continue to use the service as normal. For more information, see CloudTrail Lake availability change.
 *
 * Creates a new event data store.
 */
export const createEventDataStore: API.OperationMethod<
  CreateEventDataStoreRequest,
  CreateEventDataStoreResponse,
  CreateEventDataStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(536, __c67, 0) as any as S.Schema<CreateEventDataStoreRequest>,
  output: __S(537, __c67, 1) as any as S.Schema<CreateEventDataStoreResponse>,
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
}));

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
  input: __S(552, __c69, 0) as any as S.Schema<CreateTrailRequest>,
  output: __S(560, __c70, 0) as any as S.Schema<CreateTrailResponse>,
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
}));

export type DeleteChannelError =
  | ChannelARNInvalidException
  | ChannelNotFoundException
  | OperationNotPermittedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * CloudTrail Lake will no longer be open to new customers starting May 31, 2026. If you would like to use CloudTrail Lake, sign up prior to that date. Existing customers can continue to use the service as normal. For more information, see CloudTrail Lake availability change.
 *
 * Deletes a channel.
 */
export const deleteChannel: API.OperationMethod<
  DeleteChannelRequest,
  DeleteChannelResponse,
  DeleteChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(568, __c71, 0) as any as S.Schema<DeleteChannelRequest>,
  output: __S(464, __c58, 0) as any as S.Schema<DeleteChannelResponse>,
  errors: [
    ChannelARNInvalidException,
    ChannelNotFoundException,
    OperationNotPermittedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteChannel",
}));

export type DeleteDashboardError =
  | ConflictException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * CloudTrail Lake will no longer be open to new customers starting May 31, 2026. If you would like to use CloudTrail Lake, sign up prior to that date. Existing customers can continue to use the service as normal. For more information, see CloudTrail Lake availability change.
 *
 * Deletes the specified dashboard. You cannot delete a dashboard that has termination protection enabled.
 */
export const deleteDashboard: API.OperationMethod<
  DeleteDashboardRequest,
  DeleteDashboardResponse,
  DeleteDashboardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c72, 0) as any as S.Schema<DeleteDashboardRequest>,
  output: __S(464, __c58, 0) as any as S.Schema<DeleteDashboardResponse>,
  errors: [ConflictException, ResourceNotFoundException, UnsupportedOperationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDashboard",
}));

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
 * CloudTrail Lake will no longer be open to new customers starting May 31, 2026. If you would like to use CloudTrail Lake, sign up prior to that date. Existing customers can continue to use the service as normal. For more information, see CloudTrail Lake availability change.
 *
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
  input: __S(584, __c73, 0) as any as S.Schema<DeleteEventDataStoreRequest>,
  output: __S(464, __c58, 0) as any as S.Schema<DeleteEventDataStoreResponse>,
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
}));

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
  input: __S(592, __c74, 0) as any as S.Schema<DeleteResourcePolicyRequest>,
  output: __S(464, __c58, 0) as any as S.Schema<DeleteResourcePolicyResponse>,
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
}));

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
  input: __S(600, __c75, 0) as any as S.Schema<DeleteTrailRequest>,
  output: __S(464, __c58, 0) as any as S.Schema<DeleteTrailResponse>,
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
}));

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
  input: __S(608, __c76, 0) as any as S.Schema<DeregisterOrganizationDelegatedAdminRequest>,
  output: __S(464, __c58, 0) as any as S.Schema<DeregisterOrganizationDelegatedAdminResponse>,
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
}));

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
 * CloudTrail Lake will no longer be open to new customers starting May 31, 2026. If you would like to use CloudTrail Lake, sign up prior to that date. Existing customers can continue to use the service as normal. For more information, see CloudTrail Lake availability change.
 *
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
  input: __S(616, __c77, 0) as any as S.Schema<DescribeQueryRequest>,
  output: __S(618, __c77, 2) as any as S.Schema<DescribeQueryResponse>,
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
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<DescribeTrailsRequest>,
  output: __S(2, __c0, 2) as any as S.Schema<DescribeTrailsResponse>,
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
}));

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
 * CloudTrail Lake will no longer be open to new customers starting May 31, 2026. If you would like to use CloudTrail Lake, sign up prior to that date. Existing customers can continue to use the service as normal. For more information, see CloudTrail Lake availability change.
 *
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
  input: __S(16, __c2, 0) as any as S.Schema<DisableFederationRequest>,
  output: __S(17, __c2, 1) as any as S.Schema<DisableFederationResponse>,
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
}));

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
 * CloudTrail Lake will no longer be open to new customers starting May 31, 2026. If you would like to use CloudTrail Lake, sign up prior to that date. Existing customers can continue to use the service as normal. For more information, see CloudTrail Lake availability change.
 *
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
  input: __S(24, __c3, 0) as any as S.Schema<EnableFederationRequest>,
  output: __S(25, __c3, 1) as any as S.Schema<EnableFederationResponse>,
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
}));

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
 * CloudTrail Lake will no longer be open to new customers starting May 31, 2026. If you would like to use CloudTrail Lake, sign up prior to that date. Existing customers can continue to use the service as normal. For more information, see CloudTrail Lake availability change.
 *
 * Generates a query from a natural language prompt. This operation uses generative artificial intelligence
 * (generative AI) to produce a ready-to-use SQL query from the prompt.
 *
 * The prompt can be a question or a statement about the event data
 * in your event data store. For example, you can enter prompts like "What are my
 * top errors in the past month?" and "Give me a list of users that used SNS."
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
  input: __S(32, __c4, 0) as any as S.Schema<GenerateQueryRequest>,
  output: __S(33, __c4, 1) as any as S.Schema<GenerateQueryResponse>,
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
}));

export type GetChannelError =
  | ChannelARNInvalidException
  | ChannelNotFoundException
  | OperationNotPermittedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * CloudTrail Lake will no longer be open to new customers starting May 31, 2026. If you would like to use CloudTrail Lake, sign up prior to that date. Existing customers can continue to use the service as normal. For more information, see CloudTrail Lake availability change.
 *
 * Returns information about a specific channel.
 */
export const getChannel: API.OperationMethod<
  GetChannelRequest,
  GetChannelResponse,
  GetChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(40, __c5, 0) as any as S.Schema<GetChannelRequest>,
  output: __S(43, __c5, 3) as any as S.Schema<GetChannelResponse>,
  errors: [
    ChannelARNInvalidException,
    ChannelNotFoundException,
    OperationNotPermittedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetChannel",
}));

export type GetDashboardError =
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * CloudTrail Lake will no longer be open to new customers starting May 31, 2026. If you would like to use CloudTrail Lake, sign up prior to that date. Existing customers can continue to use the service as normal. For more information, see CloudTrail Lake availability change.
 *
 * Returns the specified dashboard.
 */
export const getDashboard: API.OperationMethod<
  GetDashboardRequest,
  GetDashboardResponse,
  GetDashboardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c6, 0) as any as S.Schema<GetDashboardRequest>,
  output: __S(49, __c6, 1) as any as S.Schema<GetDashboardResponse>,
  errors: [ResourceNotFoundException, UnsupportedOperationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDashboard",
}));

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
  input: __S(56, __c7, 0) as any as S.Schema<GetEventConfigurationRequest>,
  output: __S(76, __c9, 4) as any as S.Schema<GetEventConfigurationResponse>,
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
}));

export type GetEventDataStoreError =
  | EventDataStoreARNInvalidException
  | EventDataStoreNotFoundException
  | InvalidParameterException
  | NoManagementAccountSLRExistsException
  | OperationNotPermittedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * CloudTrail Lake will no longer be open to new customers starting May 31, 2026. If you would like to use CloudTrail Lake, sign up prior to that date. Existing customers can continue to use the service as normal. For more information, see CloudTrail Lake availability change.
 *
 * Returns information about an event data store specified as either an ARN or the ID
 * portion of the ARN.
 */
export const getEventDataStore: API.OperationMethod<
  GetEventDataStoreRequest,
  GetEventDataStoreResponse,
  GetEventDataStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c10, 0) as any as S.Schema<GetEventDataStoreRequest>,
  output: __S(83, __c10, 3) as any as S.Schema<GetEventDataStoreResponse>,
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
}));

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
  input: __S(88, __c11, 0) as any as S.Schema<GetEventSelectorsRequest>,
  output: __S(100, __c12, 4) as any as S.Schema<GetEventSelectorsResponse>,
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
}));

export type GetImportError =
  | ImportNotFoundException
  | InvalidParameterException
  | OperationNotPermittedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * CloudTrail Lake will no longer be open to new customers starting May 31, 2026. If you would like to use CloudTrail Lake, sign up prior to that date. Existing customers can continue to use the service as normal. For more information, see CloudTrail Lake availability change.
 *
 * Returns information about a specific import.
 */
export const getImport: API.OperationMethod<
  GetImportRequest,
  GetImportResponse,
  GetImportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(104, __c13, 0) as any as S.Schema<GetImportRequest>,
  output: __S(105, __c13, 1) as any as S.Schema<GetImportResponse>,
  errors: [
    ImportNotFoundException,
    InvalidParameterException,
    OperationNotPermittedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetImport",
}));

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
  input: __S(128, __c16, 0) as any as S.Schema<GetInsightSelectorsRequest>,
  output: __S(138, __c17, 2) as any as S.Schema<GetInsightSelectorsResponse>,
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
}));

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
 * CloudTrail Lake will no longer be open to new customers starting May 31, 2026. If you would like to use CloudTrail Lake, sign up prior to that date. Existing customers can continue to use the service as normal. For more information, see CloudTrail Lake availability change.
 *
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
  input: __S(144, __c18, 0) as any as S.Schema<GetQueryResultsRequest>,
  output: __S(148, __c18, 4) as any as S.Schema<GetQueryResultsResponse>,
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
  input: __S(152, __c19, 0) as any as S.Schema<GetResourcePolicyRequest>,
  output: __S(160, __c20, 0) as any as S.Schema<GetResourcePolicyResponse>,
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
}));

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
  input: __S(168, __c21, 0) as any as S.Schema<GetTrailRequest>,
  output: __S(169, __c21, 1) as any as S.Schema<GetTrailResponse>,
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
}));

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
  input: __S(176, __c22, 0) as any as S.Schema<GetTrailStatusRequest>,
  output: __S(177, __c22, 1) as any as S.Schema<GetTrailStatusResponse>,
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
}));

export type ListChannelsError =
  | InvalidNextTokenException
  | OperationNotPermittedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * CloudTrail Lake will no longer be open to new customers starting May 31, 2026. If you would like to use CloudTrail Lake, sign up prior to that date. Existing customers can continue to use the service as normal. For more information, see CloudTrail Lake availability change.
 *
 * Lists the channels in the current account, and their source names.
 */
export const listChannels: API.PaginatedOperationMethod<
  ListChannelsRequest,
  ListChannelsResponse,
  ListChannelsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(184, __c23, 0) as any as S.Schema<ListChannelsRequest>,
  output: __S(187, __c23, 3) as any as S.Schema<ListChannelsResponse>,
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
 * CloudTrail Lake will no longer be open to new customers starting May 31, 2026. If you would like to use CloudTrail Lake, sign up prior to that date. Existing customers can continue to use the service as normal. For more information, see CloudTrail Lake availability change.
 *
 * Returns information about all dashboards in the account, in the current Region.
 */
export const listDashboards: API.OperationMethod<
  ListDashboardsRequest,
  ListDashboardsResponse,
  ListDashboardsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c24, 0) as any as S.Schema<ListDashboardsRequest>,
  output: __S(195, __c24, 3) as any as S.Schema<ListDashboardsResponse>,
  errors: [UnsupportedOperationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDashboards",
}));

export type ListEventDataStoresError =
  | InvalidMaxResultsException
  | InvalidNextTokenException
  | NoManagementAccountSLRExistsException
  | OperationNotPermittedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * CloudTrail Lake will no longer be open to new customers starting May 31, 2026. If you would like to use CloudTrail Lake, sign up prior to that date. Existing customers can continue to use the service as normal. For more information, see CloudTrail Lake availability change.
 *
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
  input: __S(200, __c25, 0) as any as S.Schema<ListEventDataStoresRequest>,
  output: __S(203, __c25, 3) as any as S.Schema<ListEventDataStoresResponse>,
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
 * CloudTrail Lake will no longer be open to new customers starting May 31, 2026. If you would like to use CloudTrail Lake, sign up prior to that date. Existing customers can continue to use the service as normal. For more information, see CloudTrail Lake availability change.
 *
 * Returns a list of failures for the specified import.
 */
export const listImportFailures: API.PaginatedOperationMethod<
  ListImportFailuresRequest,
  ListImportFailuresResponse,
  ListImportFailuresError,
  Credentials | HttpClient.HttpClient,
  ImportFailureListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(208, __c26, 0) as any as S.Schema<ListImportFailuresRequest>,
  output: __S(211, __c26, 3) as any as S.Schema<ListImportFailuresResponse>,
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
 * CloudTrail Lake will no longer be open to new customers starting May 31, 2026. If you would like to use CloudTrail Lake, sign up prior to that date. Existing customers can continue to use the service as normal. For more information, see CloudTrail Lake availability change.
 *
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
  input: __S(216, __c27, 0) as any as S.Schema<ListImportsRequest>,
  output: __S(219, __c27, 3) as any as S.Schema<ListImportsResponse>,
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
 *
 * For data event Insights on organization trails, only the management account and delegated
 * administrator accounts can call `ListInsightsData`. For these callers, the API returns
 * Insights events only for the caller's own account. Member accounts cannot call this API on
 * organization trails.
 */
export const listInsightsData: API.PaginatedOperationMethod<
  ListInsightsDataRequest,
  ListInsightsDataResponse,
  ListInsightsDataError,
  Credentials | HttpClient.HttpClient,
  Event
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(225, __c28, 1) as any as S.Schema<ListInsightsDataRequest>,
  output: __S(236, __c29, 4) as any as S.Schema<ListInsightsDataResponse>,
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
 *
 * For data event Insights on organization trails, only the management account and delegated
 * administrator accounts can call `ListInsightsMetricData`. For these callers, the API returns
 * Insights metrics only for the caller's own account. Member accounts cannot call this API on
 * organization trails.
 */
export const listInsightsMetricData: API.PaginatedOperationMethod<
  ListInsightsMetricDataRequest,
  ListInsightsMetricDataResponse,
  ListInsightsMetricDataError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(240, __c30, 0) as any as S.Schema<ListInsightsMetricDataRequest>,
  output: __S(243, __c30, 3) as any as S.Schema<ListInsightsMetricDataResponse>,
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
  input: __S(248, __c31, 0) as any as S.Schema<ListPublicKeysRequest>,
  output: __S(251, __c31, 3) as any as S.Schema<ListPublicKeysResponse>,
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
 * CloudTrail Lake will no longer be open to new customers starting May 31, 2026. If you would like to use CloudTrail Lake, sign up prior to that date. Existing customers can continue to use the service as normal. For more information, see CloudTrail Lake availability change.
 *
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
  input: __S(256, __c32, 0) as any as S.Schema<ListQueriesRequest>,
  output: __S(259, __c32, 3) as any as S.Schema<ListQueriesResponse>,
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
  input: __S(264, __c33, 0) as any as S.Schema<ListTagsRequest>,
  output: __S(267, __c33, 3) as any as S.Schema<ListTagsResponse>,
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
  input: __S(272, __c34, 0) as any as S.Schema<ListTrailsRequest>,
  output: __S(275, __c34, 3) as any as S.Schema<ListTrailsResponse>,
  errors: [OperationNotPermittedException, UnsupportedOperationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTrails",
  pagination: { inputToken: "NextToken", outputToken: "NextToken", items: "Trails" } as const,
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
  input: __S(282, __c35, 2) as any as S.Schema<LookupEventsRequest>,
  output: __S(236, __c29, 4) as any as S.Schema<LookupEventsResponse>,
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
  input: __S(288, __c36, 0) as any as S.Schema<PutEventConfigurationRequest>,
  output: __S(76, __c9, 4) as any as S.Schema<PutEventConfigurationResponse>,
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
}));

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
  input: __S(296, __c37, 0) as any as S.Schema<PutEventSelectorsRequest>,
  output: __S(100, __c12, 4) as any as S.Schema<PutEventSelectorsResponse>,
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
}));

export type PutInsightSelectorsError =
  | CloudTrailARNInvalidException
  | ConflictException
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
  input: __S(304, __c38, 0) as any as S.Schema<PutInsightSelectorsRequest>,
  output: __S(138, __c17, 2) as any as S.Schema<PutInsightSelectorsResponse>,
  errors: [
    CloudTrailARNInvalidException,
    ConflictException,
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
}));

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
  input: __S(312, __c39, 0) as any as S.Schema<PutResourcePolicyRequest>,
  output: __S(160, __c20, 0) as any as S.Schema<PutResourcePolicyResponse>,
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
}));

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
 * Registers an organization's member account as the CloudTrail delegated administrator.
 */
export const registerOrganizationDelegatedAdmin: API.OperationMethod<
  RegisterOrganizationDelegatedAdminRequest,
  RegisterOrganizationDelegatedAdminResponse,
  RegisterOrganizationDelegatedAdminError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c40, 0) as any as S.Schema<RegisterOrganizationDelegatedAdminRequest>,
  output: __S(464, __c58, 0) as any as S.Schema<RegisterOrganizationDelegatedAdminResponse>,
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
}));

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
  input: __S(328, __c41, 0) as any as S.Schema<RemoveTagsRequest>,
  output: __S(464, __c58, 0) as any as S.Schema<RemoveTagsResponse>,
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
}));

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
 * CloudTrail Lake will no longer be open to new customers starting May 31, 2026. If you would like to use CloudTrail Lake, sign up prior to that date. Existing customers can continue to use the service as normal. For more information, see CloudTrail Lake availability change.
 *
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
  input: __S(336, __c42, 0) as any as S.Schema<RestoreEventDataStoreRequest>,
  output: __S(337, __c42, 1) as any as S.Schema<RestoreEventDataStoreResponse>,
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
}));

export type SearchSampleQueriesError =
  | InvalidParameterException
  | OperationNotPermittedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * CloudTrail Lake will no longer be open to new customers starting May 31, 2026. If you would like to use CloudTrail Lake, sign up prior to that date. Existing customers can continue to use the service as normal. For more information, see CloudTrail Lake availability change.
 *
 * Searches sample queries and returns a list of sample queries that are sorted by relevance.
 * To search for sample queries, provide a natural language `SearchPhrase` in English.
 */
export const searchSampleQueries: API.OperationMethod<
  SearchSampleQueriesRequest,
  SearchSampleQueriesResponse,
  SearchSampleQueriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(344, __c43, 0) as any as S.Schema<SearchSampleQueriesRequest>,
  output: __S(347, __c43, 3) as any as S.Schema<SearchSampleQueriesResponse>,
  errors: [
    InvalidParameterException,
    OperationNotPermittedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchSampleQueries",
}));

export type StartDashboardRefreshError =
  | EventDataStoreNotFoundException
  | InactiveEventDataStoreException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * CloudTrail Lake will no longer be open to new customers starting May 31, 2026. If you would like to use CloudTrail Lake, sign up prior to that date. Existing customers can continue to use the service as normal. For more information, see CloudTrail Lake availability change.
 *
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
  input: __S(352, __c44, 0) as any as S.Schema<StartDashboardRefreshRequest>,
  output: __S(353, __c44, 1) as any as S.Schema<StartDashboardRefreshResponse>,
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
}));

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
 * CloudTrail Lake will no longer be open to new customers starting May 31, 2026. If you would like to use CloudTrail Lake, sign up prior to that date. Existing customers can continue to use the service as normal. For more information, see CloudTrail Lake availability change.
 *
 * Starts the ingestion of live events on an event data store specified as either an ARN or the ID portion of the ARN. To start ingestion, the event data store `Status` must be `STOPPED_INGESTION`
 * and the `eventCategory` must be `Management`, `Data`, `NetworkActivity`, or `ConfigurationItem`.
 */
export const startEventDataStoreIngestion: API.OperationMethod<
  StartEventDataStoreIngestionRequest,
  StartEventDataStoreIngestionResponse,
  StartEventDataStoreIngestionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(360, __c45, 0) as any as S.Schema<StartEventDataStoreIngestionRequest>,
  output: __S(464, __c58, 0) as any as S.Schema<StartEventDataStoreIngestionResponse>,
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
}));

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
 * CloudTrail Lake will no longer be open to new customers starting May 31, 2026. If you would like to use CloudTrail Lake, sign up prior to that date. Existing customers can continue to use the service as normal. For more information, see CloudTrail Lake availability change.
 *
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
  input: __S(368, __c46, 0) as any as S.Schema<StartImportRequest>,
  output: __S(369, __c46, 1) as any as S.Schema<StartImportResponse>,
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
}));

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
  input: __S(376, __c47, 0) as any as S.Schema<StartLoggingRequest>,
  output: __S(464, __c58, 0) as any as S.Schema<StartLoggingResponse>,
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
}));

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
 * CloudTrail Lake will no longer be open to new customers starting May 31, 2026. If you would like to use CloudTrail Lake, sign up prior to that date. Existing customers can continue to use the service as normal. For more information, see CloudTrail Lake availability change.
 *
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
  input: __S(384, __c48, 0) as any as S.Schema<StartQueryRequest>,
  output: __S(385, __c48, 1) as any as S.Schema<StartQueryResponse>,
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
}));

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
 * CloudTrail Lake will no longer be open to new customers starting May 31, 2026. If you would like to use CloudTrail Lake, sign up prior to that date. Existing customers can continue to use the service as normal. For more information, see CloudTrail Lake availability change.
 *
 * Stops the ingestion of live events on an event data store specified as either an ARN or the ID portion of the ARN. To stop ingestion, the event data store `Status` must be `ENABLED`
 * and the `eventCategory` must be `Management`, `Data`, `NetworkActivity`, or `ConfigurationItem`.
 */
export const stopEventDataStoreIngestion: API.OperationMethod<
  StopEventDataStoreIngestionRequest,
  StopEventDataStoreIngestionResponse,
  StopEventDataStoreIngestionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(392, __c49, 0) as any as S.Schema<StopEventDataStoreIngestionRequest>,
  output: __S(464, __c58, 0) as any as S.Schema<StopEventDataStoreIngestionResponse>,
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
}));

export type StopImportError =
  | ImportNotFoundException
  | InvalidParameterException
  | OperationNotPermittedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * CloudTrail Lake will no longer be open to new customers starting May 31, 2026. If you would like to use CloudTrail Lake, sign up prior to that date. Existing customers can continue to use the service as normal. For more information, see CloudTrail Lake availability change.
 *
 * Stops a specified import.
 */
export const stopImport: API.OperationMethod<
  StopImportRequest,
  StopImportResponse,
  StopImportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(400, __c50, 0) as any as S.Schema<StopImportRequest>,
  output: __S(401, __c50, 1) as any as S.Schema<StopImportResponse>,
  errors: [
    ImportNotFoundException,
    InvalidParameterException,
    OperationNotPermittedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopImport",
}));

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
  input: __S(408, __c51, 0) as any as S.Schema<StopLoggingRequest>,
  output: __S(464, __c58, 0) as any as S.Schema<StopLoggingResponse>,
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
}));

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
 * CloudTrail Lake will no longer be open to new customers starting May 31, 2026. If you would like to use CloudTrail Lake, sign up prior to that date. Existing customers can continue to use the service as normal. For more information, see CloudTrail Lake availability change.
 *
 * Updates a channel specified by a required channel ARN or UUID.
 */
export const updateChannel: API.OperationMethod<
  UpdateChannelRequest,
  UpdateChannelResponse,
  UpdateChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c52, 0) as any as S.Schema<UpdateChannelRequest>,
  output: __S(417, __c52, 1) as any as S.Schema<UpdateChannelResponse>,
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
}));

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
 * CloudTrail Lake will no longer be open to new customers starting May 31, 2026. If you would like to use CloudTrail Lake, sign up prior to that date. Existing customers can continue to use the service as normal. For more information, see CloudTrail Lake availability change.
 *
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
  input: __S(424, __c53, 0) as any as S.Schema<UpdateDashboardRequest>,
  output: __S(425, __c53, 1) as any as S.Schema<UpdateDashboardResponse>,
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
}));

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
 * CloudTrail Lake will no longer be open to new customers starting May 31, 2026. If you would like to use CloudTrail Lake, sign up prior to that date. Existing customers can continue to use the service as normal. For more information, see CloudTrail Lake availability change.
 *
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
  input: __S(432, __c54, 0) as any as S.Schema<UpdateEventDataStoreRequest>,
  output: __S(433, __c54, 1) as any as S.Schema<UpdateEventDataStoreResponse>,
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
}));

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
  input: __S(440, __c55, 0) as any as S.Schema<UpdateTrailRequest>,
  output: __S(560, __c70, 0) as any as S.Schema<UpdateTrailResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          trailNameList: S.optional(__S(528, __c66, 0)),
          includeShadowTrails: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeTrailsRequest" });
    case 1:
      return S.Array(__S(8, __c1, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ trailList: S.optional(__S(1, __c0, 1)) }).pipe(ns),
      ).annotate({ identifier: "DescribeTrailsResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          S3BucketName: S.optional(S.String),
          S3KeyPrefix: S.optional(S.String),
          SnsTopicName: S.optional(S.String),
          SnsTopicARN: S.optional(S.String),
          IncludeGlobalServiceEvents: S.optional(S.Boolean),
          IsMultiRegionTrail: S.optional(S.Boolean),
          HomeRegion: S.optional(S.String),
          TrailARN: S.optional(S.String),
          LogFileValidationEnabled: S.optional(S.Boolean),
          CloudWatchLogsLogGroupArn: S.optional(S.String),
          CloudWatchLogsRoleArn: S.optional(S.String),
          KmsKeyId: S.optional(S.String),
          HasCustomEventSelectors: S.optional(S.Boolean),
          HasInsightSelectors: S.optional(S.Boolean),
          IsOrganizationTrail: S.optional(S.Boolean),
          RecursiveLogging: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "Trail" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EventDataStore: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisableFederationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          EventDataStoreArn: S.optional(S.String),
          FederationStatus: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DisableFederationResponse" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EventDataStore: S.String, FederationRoleArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "EnableFederationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          EventDataStoreArn: S.optional(S.String),
          FederationStatus: S.optional(S.String),
          FederationRoleArn: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "EnableFederationResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EventDataStores: __S(528, __c66, 0), Prompt: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GenerateQueryRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          QueryStatement: S.optional(S.String),
          QueryAlias: S.optional(S.String),
          EventDataStoreOwnerAccountId: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GenerateQueryResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Channel: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetChannelRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ApplyToAllRegions: S.optional(S.Boolean),
          AdvancedEventSelectors: S.optional(__S(547, __c68, 3)),
        }),
      ).annotate({ identifier: "SourceConfig" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          LatestIngestionSuccessTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LatestIngestionSuccessEventID: S.optional(S.String),
          LatestIngestionErrorCode: S.optional(S.String),
          LatestIngestionAttemptTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LatestIngestionAttemptEventID: S.optional(S.String),
        }),
      ).annotate({ identifier: "IngestionStatus" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          ChannelArn: S.optional(S.String),
          Name: S.optional(S.String),
          Source: S.optional(S.String),
          SourceConfig: S.optional(__S(41, __c5, 1)),
          Destinations: S.optional(__S(489, __c61, 1)),
          IngestionStatus: S.optional(__S(42, __c5, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "GetChannelResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DashboardId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetDashboardRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DashboardArn: S.optional(S.String),
          Type: S.optional(S.String),
          Status: S.optional(S.String),
          Widgets: S.optional(__S(515, __c64, 3)),
          RefreshSchedule: S.optional(__S(513, __c64, 1)),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastRefreshId: S.optional(S.String),
          LastRefreshFailureReason: S.optional(S.String),
          TerminationProtectionEnabled: S.optional(S.Boolean),
        }).pipe(ns),
      ).annotate({ identifier: "GetDashboardResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TrailName: S.optional(S.String), EventDataStore: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetEventConfigurationRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Type: S.String, Equals: __S(528, __c66, 0) })).annotate({
        identifier: "ContextKeySelector",
      });
    case 1:
      return S.Array(__S(72, __c9, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Templates: __S(64, __c8, 0), EventCategory: S.String }),
      ).annotate({ identifier: "AggregationConfiguration" });
    case 3:
      return S.Array(__S(74, __c9, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          TrailARN: S.optional(S.String),
          EventDataStoreArn: S.optional(S.String),
          MaxEventSize: S.optional(S.String),
          ContextKeySelectors: S.optional(__S(73, __c9, 1)),
          AggregationConfigurations: S.optional(__S(75, __c9, 3)),
        }).pipe(ns),
      ).annotate({ identifier: "GetEventConfigurationResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EventDataStore: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetEventDataStoreRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Name: S.String, Type: S.String })).annotate({
        identifier: "PartitionKey",
      });
    case 2:
      return S.Array(__S(81, __c10, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          EventDataStoreArn: S.optional(S.String),
          Name: S.optional(S.String),
          Status: S.optional(S.String),
          AdvancedEventSelectors: S.optional(__S(547, __c68, 3)),
          MultiRegionEnabled: S.optional(S.Boolean),
          OrganizationEnabled: S.optional(S.Boolean),
          RetentionPeriod: S.optional(S.Number),
          TerminationProtectionEnabled: S.optional(S.Boolean),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          KmsKeyId: S.optional(S.String),
          BillingMode: S.optional(S.String),
          FederationStatus: S.optional(S.String),
          FederationRoleArn: S.optional(S.String),
          PartitionKeys: S.optional(__S(82, __c10, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "GetEventDataStoreResponse" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TrailName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetEventSelectorsRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Type: S.optional(S.String), Values: S.optional(__S(528, __c66, 0)) }),
      ).annotate({ identifier: "DataResource" });
    case 1:
      return S.Array(__S(96, __c12, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ReadWriteType: S.optional(S.String),
          IncludeManagementEvents: S.optional(S.Boolean),
          DataResources: S.optional(__S(97, __c12, 1)),
          ExcludeManagementEventSources: S.optional(__S(528, __c66, 0)),
        }),
      ).annotate({ identifier: "EventSelector" });
    case 3:
      return S.Array(__S(98, __c12, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          TrailARN: S.optional(S.String),
          EventSelectors: S.optional(__S(99, __c12, 3)),
          AdvancedEventSelectors: S.optional(__S(547, __c68, 3)),
        }).pipe(ns),
      ).annotate({ identifier: "GetEventSelectorsResponse" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ImportId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetImportRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ImportId: S.optional(S.String),
          Destinations: S.optional(__S(528, __c66, 0)),
          ImportSource: S.optional(__S(113, __c14, 1)),
          StartEventTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndEventTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ImportStatus: S.optional(S.String),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ImportStatistics: S.optional(__S(120, __c15, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "GetImportResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          S3LocationUri: S.String,
          S3BucketRegion: S.String,
          S3BucketAccessRoleArn: S.String,
        }),
      ).annotate({ identifier: "S3ImportSource" });
    case 1:
      return S.suspend(() => S.Struct({ S3: __S(112, __c14, 0) })).annotate({
        identifier: "ImportSource",
      });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PrefixesFound: S.optional(S.Number),
          PrefixesCompleted: S.optional(S.Number),
          FilesCompleted: S.optional(S.Number),
          EventsCompleted: S.optional(S.Number),
          FailedEntries: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ImportStatistics" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TrailName: S.optional(S.String), EventDataStore: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetInsightSelectorsRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InsightType: S.optional(S.String),
          EventCategories: S.optional(__S(64, __c8, 0)),
        }),
      ).annotate({ identifier: "InsightSelector" });
    case 1:
      return S.Array(__S(136, __c17, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          TrailARN: S.optional(S.String),
          InsightSelectors: S.optional(__S(137, __c17, 1)),
          EventDataStoreArn: S.optional(S.String),
          InsightsDestination: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetInsightSelectorsResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EventDataStore: S.optional(S.String),
          QueryId: S.String,
          NextToken: S.optional(S.String),
          MaxQueryResults: S.optional(S.Number),
          EventDataStoreOwnerAccountId: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetQueryResultsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ResultsCount: S.optional(S.Number),
          TotalResultsCount: S.optional(S.Number),
          BytesScanned: S.optional(S.Number),
        }),
      ).annotate({ identifier: "QueryStatistics" });
    case 2:
      return S.Array(__S(504, __c63, 0));
    case 3:
      return S.Array(__S(146, __c18, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          QueryStatus: S.optional(S.String),
          QueryStatistics: S.optional(__S(145, __c18, 1)),
          QueryResultRows: S.optional(__S(147, __c18, 3)),
          NextToken: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetQueryResultsResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetResourcePolicyRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.optional(S.String),
          ResourcePolicy: S.optional(S.String),
          DelegatedAdminResourcePolicy: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetResourcePolicyResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetTrailRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Trail: S.optional(__S(8, __c1, 0)) }).pipe(ns)).annotate({
        identifier: "GetTrailResponse",
      });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetTrailStatusRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          IsLogging: S.optional(S.Boolean),
          LatestDeliveryError: S.optional(S.String),
          LatestNotificationError: S.optional(S.String),
          LatestDeliveryTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LatestNotificationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          StartLoggingTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          StopLoggingTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LatestCloudWatchLogsDeliveryError: S.optional(S.String),
          LatestCloudWatchLogsDeliveryTime: S.optional(
            S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ),
          LatestDigestDeliveryTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LatestDigestDeliveryError: S.optional(S.String),
          LatestDeliveryAttemptTime: S.optional(S.String),
          LatestNotificationAttemptTime: S.optional(S.String),
          LatestNotificationAttemptSucceeded: S.optional(S.String),
          LatestDeliveryAttemptSucceeded: S.optional(S.String),
          TimeLoggingStarted: S.optional(S.String),
          TimeLoggingStopped: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetTrailStatusResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListChannelsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ChannelArn: S.optional(S.String), Name: S.optional(S.String) }),
      ).annotate({ identifier: "Channel" });
    case 2:
      return S.Array(__S(185, __c23, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Channels: S.optional(__S(186, __c23, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListChannelsResponse" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NamePrefix: S.optional(S.String),
          Type: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDashboardsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DashboardArn: S.optional(S.String), Type: S.optional(S.String) }),
      ).annotate({ identifier: "DashboardDetail" });
    case 2:
      return S.Array(__S(193, __c24, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Dashboards: S.optional(__S(194, __c24, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListDashboardsResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), MaxResults: S.optional(S.Number) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListEventDataStoresRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          EventDataStoreArn: S.optional(S.String),
          Name: S.optional(S.String),
          TerminationProtectionEnabled: S.optional(S.Boolean),
          Status: S.optional(S.String),
          AdvancedEventSelectors: S.optional(__S(547, __c68, 3)),
          MultiRegionEnabled: S.optional(S.Boolean),
          OrganizationEnabled: S.optional(S.Boolean),
          RetentionPeriod: S.optional(S.Number),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "EventDataStore" });
    case 2:
      return S.Array(__S(201, __c25, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          EventDataStores: S.optional(__S(202, __c25, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListEventDataStoresResponse" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ImportId: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListImportFailuresRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Location: S.optional(S.String),
          Status: S.optional(S.String),
          ErrorType: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
          LastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ImportFailureListItem" });
    case 2:
      return S.Array(__S(209, __c26, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Failures: S.optional(__S(210, __c26, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListImportFailuresResponse" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number),
          Destination: S.optional(S.String),
          ImportStatus: S.optional(S.String),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListImportsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ImportId: S.optional(S.String),
          ImportStatus: S.optional(S.String),
          Destinations: S.optional(__S(528, __c66, 0)),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ImportsListItem" });
    case 2:
      return S.Array(__S(217, __c27, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Imports: S.optional(__S(218, __c27, 2)), NextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "ListImportsResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({
          InsightSource: S.String,
          DataType: S.String,
          Dimensions: S.optional(__S(224, __c28, 0)),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListInsightsDataRequest" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceType: S.optional(S.String), ResourceName: S.optional(S.String) }),
      ).annotate({ identifier: "Resource" });
    case 1:
      return S.Array(__S(232, __c29, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          EventId: S.optional(S.String),
          EventName: S.optional(S.String),
          ReadOnly: S.optional(S.String),
          AccessKeyId: S.optional(S.String),
          EventTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EventSource: S.optional(S.String),
          Username: S.optional(S.String),
          Resources: S.optional(__S(233, __c29, 1)),
          CloudTrailEvent: S.optional(S.String),
        }),
      ).annotate({ identifier: "Event" });
    case 3:
      return S.Array(__S(234, __c29, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ Events: S.optional(__S(235, __c29, 3)), NextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "ListInsightsDataResponse" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TrailName: S.optional(S.String),
          EventSource: S.String,
          EventName: S.String,
          InsightType: S.String,
          ErrorCode: S.optional(S.String),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Period: S.optional(S.Number),
          DataType: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListInsightsMetricDataRequest" });
    case 1:
      return S.Array(/*@__PURE__*/ S.Date.pipe(/*@__PURE__*/ T.TimestampFormat("epoch-seconds")));
    case 2:
      return S.Array(S.Number);
    case 3:
      return S.suspend(() =>
        S.Struct({
          TrailARN: S.optional(S.String),
          EventSource: S.optional(S.String),
          EventName: S.optional(S.String),
          InsightType: S.optional(S.String),
          ErrorCode: S.optional(S.String),
          Timestamps: S.optional(__S(241, __c30, 1)),
          Values: S.optional(__S(242, __c30, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListInsightsMetricDataResponse" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListPublicKeysRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Value: S.optional(T.Blob),
          ValidityStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ValidityEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Fingerprint: S.optional(S.String),
        }),
      ).annotate({ identifier: "PublicKey" });
    case 2:
      return S.Array(__S(249, __c31, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          PublicKeyList: S.optional(__S(250, __c31, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListPublicKeysResponse" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EventDataStore: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          QueryStatus: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListQueriesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          QueryId: S.optional(S.String),
          QueryStatus: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "Query" });
    case 2:
      return S.Array(__S(257, __c32, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Queries: S.optional(__S(258, __c32, 2)), NextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "ListQueriesResponse" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceIdList: __S(528, __c66, 0), NextToken: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ResourceId: S.optional(S.String), TagsList: S.optional(__S(457, __c57, 1)) }),
      ).annotate({ identifier: "ResourceTag" });
    case 2:
      return S.Array(__S(265, __c33, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ResourceTagList: S.optional(__S(266, __c33, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListTagsResponse" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTrailsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TrailARN: S.optional(S.String),
          Name: S.optional(S.String),
          HomeRegion: S.optional(S.String),
        }),
      ).annotate({ identifier: "TrailInfo" });
    case 2:
      return S.Array(__S(273, __c34, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Trails: S.optional(__S(274, __c34, 2)), NextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "ListTrailsResponse" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AttributeKey: S.String, AttributeValue: S.String }),
      ).annotate({ identifier: "LookupAttribute" });
    case 1:
      return S.Array(__S(280, __c35, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          LookupAttributes: S.optional(__S(281, __c35, 1)),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EventCategory: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "LookupEventsRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TrailName: S.optional(S.String),
          EventDataStore: S.optional(S.String),
          MaxEventSize: S.optional(S.String),
          ContextKeySelectors: S.optional(__S(73, __c9, 1)),
          AggregationConfigurations: S.optional(__S(75, __c9, 3)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutEventConfigurationRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TrailName: S.String,
          EventSelectors: S.optional(__S(99, __c12, 3)),
          AdvancedEventSelectors: S.optional(__S(547, __c68, 3)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutEventSelectorsRequest" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TrailName: S.optional(S.String),
          InsightSelectors: __S(137, __c17, 1),
          EventDataStore: S.optional(S.String),
          InsightsDestination: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutInsightSelectorsRequest" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, ResourcePolicy: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutResourcePolicyRequest" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MemberAccountId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RegisterOrganizationDelegatedAdminRequest" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceId: S.String, TagsList: __S(457, __c57, 1) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RemoveTagsRequest" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EventDataStore: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RestoreEventDataStoreRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          EventDataStoreArn: S.optional(S.String),
          Name: S.optional(S.String),
          Status: S.optional(S.String),
          AdvancedEventSelectors: S.optional(__S(547, __c68, 3)),
          MultiRegionEnabled: S.optional(S.Boolean),
          OrganizationEnabled: S.optional(S.Boolean),
          RetentionPeriod: S.optional(S.Number),
          TerminationProtectionEnabled: S.optional(S.Boolean),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          KmsKeyId: S.optional(S.String),
          BillingMode: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "RestoreEventDataStoreResponse" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SearchPhrase: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SearchSampleQueriesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          SQL: S.optional(S.String),
          Relevance: S.optional(S.Number),
        }),
      ).annotate({ identifier: "SearchSampleQueriesSearchResult" });
    case 2:
      return S.Array(__S(345, __c43, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          SearchResults: S.optional(__S(346, __c43, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "SearchSampleQueriesResponse" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DashboardId: S.String,
          QueryParameterValues: S.optional(__S(504, __c63, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartDashboardRefreshRequest" });
    case 1:
      return S.suspend(() => S.Struct({ RefreshId: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "StartDashboardRefreshResponse",
      });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EventDataStore: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartEventDataStoreIngestionRequest" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Destinations: S.optional(__S(528, __c66, 0)),
          ImportSource: S.optional(__S(113, __c14, 1)),
          StartEventTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndEventTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ImportId: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartImportRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ImportId: S.optional(S.String),
          Destinations: S.optional(__S(528, __c66, 0)),
          ImportSource: S.optional(__S(113, __c14, 1)),
          StartEventTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndEventTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ImportStatus: S.optional(S.String),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(ns),
      ).annotate({ identifier: "StartImportResponse" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartLoggingRequest" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          QueryStatement: S.optional(S.String),
          DeliveryS3Uri: S.optional(S.String),
          QueryAlias: S.optional(S.String),
          QueryParameters: S.optional(__S(528, __c66, 0)),
          EventDataStoreOwnerAccountId: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartQueryRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          QueryId: S.optional(S.String),
          EventDataStoreOwnerAccountId: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "StartQueryResponse" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EventDataStore: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopEventDataStoreIngestionRequest" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ImportId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopImportRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ImportId: S.optional(S.String),
          ImportSource: S.optional(__S(113, __c14, 1)),
          Destinations: S.optional(__S(528, __c66, 0)),
          ImportStatus: S.optional(S.String),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          StartEventTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndEventTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ImportStatistics: S.optional(__S(120, __c15, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "StopImportResponse" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopLoggingRequest" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Channel: S.String,
          Destinations: S.optional(__S(489, __c61, 1)),
          Name: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateChannelRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ChannelArn: S.optional(S.String),
          Name: S.optional(S.String),
          Source: S.optional(S.String),
          Destinations: S.optional(__S(489, __c61, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "UpdateChannelResponse" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DashboardId: S.String,
          Widgets: S.optional(__S(521, __c65, 1)),
          RefreshSchedule: S.optional(__S(513, __c64, 1)),
          TerminationProtectionEnabled: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateDashboardRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DashboardArn: S.optional(S.String),
          Name: S.optional(S.String),
          Type: S.optional(S.String),
          Widgets: S.optional(__S(515, __c64, 3)),
          RefreshSchedule: S.optional(__S(513, __c64, 1)),
          TerminationProtectionEnabled: S.optional(S.Boolean),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(ns),
      ).annotate({ identifier: "UpdateDashboardResponse" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EventDataStore: S.String,
          Name: S.optional(S.String),
          AdvancedEventSelectors: S.optional(__S(547, __c68, 3)),
          MultiRegionEnabled: S.optional(S.Boolean),
          OrganizationEnabled: S.optional(S.Boolean),
          RetentionPeriod: S.optional(S.Number),
          TerminationProtectionEnabled: S.optional(S.Boolean),
          KmsKeyId: S.optional(S.String),
          BillingMode: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateEventDataStoreRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          EventDataStoreArn: S.optional(S.String),
          Name: S.optional(S.String),
          Status: S.optional(S.String),
          AdvancedEventSelectors: S.optional(__S(547, __c68, 3)),
          MultiRegionEnabled: S.optional(S.Boolean),
          OrganizationEnabled: S.optional(S.Boolean),
          RetentionPeriod: S.optional(S.Number),
          TerminationProtectionEnabled: S.optional(S.Boolean),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          KmsKeyId: S.optional(S.String),
          BillingMode: S.optional(S.String),
          FederationStatus: S.optional(S.String),
          FederationRoleArn: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "UpdateEventDataStoreResponse" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          S3BucketName: S.optional(S.String),
          S3KeyPrefix: S.optional(S.String),
          SnsTopicName: S.optional(S.String),
          IncludeGlobalServiceEvents: S.optional(S.Boolean),
          IsMultiRegionTrail: S.optional(S.Boolean),
          EnableLogFileValidation: S.optional(S.Boolean),
          CloudWatchLogsLogGroupArn: S.optional(S.String),
          CloudWatchLogsRoleArn: S.optional(S.String),
          KmsKeyId: S.optional(S.String),
          IsOrganizationTrail: S.optional(S.Boolean),
          RecursiveLogging: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateTrailRequest" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceId: S.String, TagsList: __S(457, __c57, 1) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AddTagsRequest" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.optional(S.String) })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(456, __c57, 0));
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({ identifier: "AddTagsResponse" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EventDataStore: S.optional(S.String),
          QueryId: S.String,
          EventDataStoreOwnerAccountId: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CancelQueryRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          QueryId: S.String,
          QueryStatus: S.String,
          EventDataStoreOwnerAccountId: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "CancelQueryResponse" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Source: S.String,
          Destinations: __S(489, __c61, 1),
          Tags: S.optional(__S(457, __c57, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateChannelRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ChannelArn: S.optional(S.String),
          Name: S.optional(S.String),
          Source: S.optional(S.String),
          Destinations: S.optional(__S(489, __c61, 1)),
          Tags: S.optional(__S(457, __c57, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "CreateChannelResponse" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Type: S.String, Location: S.String })).annotate({
        identifier: "Destination",
      });
    case 1:
      return S.Array(__S(488, __c61, 0));
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          RefreshSchedule: S.optional(__S(513, __c64, 1)),
          TagsList: S.optional(__S(457, __c57, 1)),
          TerminationProtectionEnabled: S.optional(S.Boolean),
          Widgets: S.optional(__S(521, __c65, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDashboardRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DashboardArn: S.optional(S.String),
          Name: S.optional(S.String),
          Type: S.optional(S.String),
          Widgets: S.optional(__S(515, __c64, 3)),
          TagsList: S.optional(__S(457, __c57, 1)),
          RefreshSchedule: S.optional(__S(513, __c64, 1)),
          TerminationProtectionEnabled: S.optional(S.Boolean),
        }).pipe(ns),
      ).annotate({ identifier: "CreateDashboardResponse" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Unit: S.optional(S.String), Value: S.optional(S.Number) }),
      ).annotate({ identifier: "RefreshScheduleFrequency" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Frequency: S.optional(__S(512, __c64, 0)),
          Status: S.optional(S.String),
          TimeOfDay: S.optional(S.String),
        }),
      ).annotate({ identifier: "RefreshSchedule" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          QueryAlias: S.optional(S.String),
          QueryStatement: S.optional(S.String),
          QueryParameters: S.optional(__S(528, __c66, 0)),
          ViewProperties: S.optional(__S(504, __c63, 0)),
        }),
      ).annotate({ identifier: "Widget" });
    case 3:
      return S.Array(__S(514, __c64, 2));
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          QueryStatement: S.String,
          QueryParameters: S.optional(__S(528, __c66, 0)),
          ViewProperties: __S(504, __c63, 0),
        }),
      ).annotate({ identifier: "RequestWidget" });
    case 1:
      return S.Array(__S(520, __c65, 0));
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          AdvancedEventSelectors: S.optional(__S(547, __c68, 3)),
          MultiRegionEnabled: S.optional(S.Boolean),
          OrganizationEnabled: S.optional(S.Boolean),
          RetentionPeriod: S.optional(S.Number),
          TerminationProtectionEnabled: S.optional(S.Boolean),
          TagsList: S.optional(__S(457, __c57, 1)),
          KmsKeyId: S.optional(S.String),
          StartIngestion: S.optional(S.Boolean),
          BillingMode: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateEventDataStoreRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          EventDataStoreArn: S.optional(S.String),
          Name: S.optional(S.String),
          Status: S.optional(S.String),
          AdvancedEventSelectors: S.optional(__S(547, __c68, 3)),
          MultiRegionEnabled: S.optional(S.Boolean),
          OrganizationEnabled: S.optional(S.Boolean),
          RetentionPeriod: S.optional(S.Number),
          TerminationProtectionEnabled: S.optional(S.Boolean),
          TagsList: S.optional(__S(457, __c57, 1)),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          KmsKeyId: S.optional(S.String),
          BillingMode: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "CreateEventDataStoreResponse" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Field: S.String,
          Equals: S.optional(__S(528, __c66, 0)),
          StartsWith: S.optional(__S(528, __c66, 0)),
          EndsWith: S.optional(__S(528, __c66, 0)),
          NotEquals: S.optional(__S(528, __c66, 0)),
          NotStartsWith: S.optional(__S(528, __c66, 0)),
          NotEndsWith: S.optional(__S(528, __c66, 0)),
        }),
      ).annotate({ identifier: "AdvancedFieldSelector" });
    case 1:
      return S.Array(__S(544, __c68, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), FieldSelectors: __S(545, __c68, 1) }),
      ).annotate({ identifier: "AdvancedEventSelector" });
    case 3:
      return S.Array(__S(546, __c68, 2));
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          S3BucketName: S.String,
          S3KeyPrefix: S.optional(S.String),
          SnsTopicName: S.optional(S.String),
          IncludeGlobalServiceEvents: S.optional(S.Boolean),
          IsMultiRegionTrail: S.optional(S.Boolean),
          EnableLogFileValidation: S.optional(S.Boolean),
          CloudWatchLogsLogGroupArn: S.optional(S.String),
          CloudWatchLogsRoleArn: S.optional(S.String),
          KmsKeyId: S.optional(S.String),
          IsOrganizationTrail: S.optional(S.Boolean),
          TagsList: S.optional(__S(457, __c57, 1)),
          RecursiveLogging: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateTrailRequest" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          S3BucketName: S.optional(S.String),
          S3KeyPrefix: S.optional(S.String),
          SnsTopicName: S.optional(S.String),
          SnsTopicARN: S.optional(S.String),
          IncludeGlobalServiceEvents: S.optional(S.Boolean),
          IsMultiRegionTrail: S.optional(S.Boolean),
          TrailARN: S.optional(S.String),
          LogFileValidationEnabled: S.optional(S.Boolean),
          CloudWatchLogsLogGroupArn: S.optional(S.String),
          CloudWatchLogsRoleArn: S.optional(S.String),
          KmsKeyId: S.optional(S.String),
          IsOrganizationTrail: S.optional(S.Boolean),
          RecursiveLogging: S.optional(S.Boolean),
        }).pipe(ns),
      ).annotate({ identifier: "CreateTrailResponse" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Channel: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteChannelRequest" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DashboardId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDashboardRequest" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EventDataStore: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteEventDataStoreRequest" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteResourcePolicyRequest" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteTrailRequest" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DelegatedAdminAccountId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeregisterOrganizationDelegatedAdminRequest" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EventDataStore: S.optional(S.String),
          QueryId: S.optional(S.String),
          QueryAlias: S.optional(S.String),
          RefreshId: S.optional(S.String),
          EventDataStoreOwnerAccountId: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeQueryRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          EventsMatched: S.optional(S.Number),
          EventsScanned: S.optional(S.Number),
          BytesScanned: S.optional(S.Number),
          ExecutionTimeInMillis: S.optional(S.Number),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "QueryStatisticsForDescribeQuery" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          QueryId: S.optional(S.String),
          QueryString: S.optional(S.String),
          QueryStatus: S.optional(S.String),
          QueryStatistics: S.optional(__S(617, __c77, 1)),
          ErrorMessage: S.optional(S.String),
          DeliveryS3Uri: S.optional(S.String),
          DeliveryStatus: S.optional(S.String),
          Prompt: S.optional(S.String),
          EventDataStoreOwnerAccountId: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeQueryResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
