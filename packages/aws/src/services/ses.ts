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
const ns = /*@__PURE__*/ T.XmlNamespace("http://ses.amazonaws.com/doc/2010-12-01/");
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "SES", serviceShapeName: "SimpleEmailService" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "ses" });
const ver = /*@__PURE__*/ T.ServiceVersion("2010-12-01");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsQuery();
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
              `https://email-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://email-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(`https://email.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`);
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://email.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://email.{R}.{D}","properties":{},"headers":{}}');

export class AccountSendingPausedException
  extends /*@__PURE__*/ S.TaggedError<AccountSendingPausedException>()(
    "AccountSendingPausedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "AccountSendingPausedException",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class AlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<AlreadyExistsException>()(
    "AlreadyExistsException",
    {
      Name: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "AlreadyExists", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class CannotDeleteException
  extends /*@__PURE__*/ S.TaggedError<CannotDeleteException>()(
    "CannotDeleteException",
    {
      Name: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "CannotDelete", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ConfigurationSetAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<ConfigurationSetAlreadyExistsException>()(
    "ConfigurationSetAlreadyExistsException",
    {
      ConfigurationSetName: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "ConfigurationSetAlreadyExists",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class ConfigurationSetDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<ConfigurationSetDoesNotExistException>()(
    "ConfigurationSetDoesNotExistException",
    {
      ConfigurationSetName: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "ConfigurationSetDoesNotExist",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ConfigurationSetSendingPausedException
  extends /*@__PURE__*/ S.TaggedError<ConfigurationSetSendingPausedException>()(
    "ConfigurationSetSendingPausedException",
    {
      ConfigurationSetName: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "ConfigurationSetSendingPausedException",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class CustomVerificationEmailInvalidContentException
  extends /*@__PURE__*/ S.TaggedError<CustomVerificationEmailInvalidContentException>()(
    "CustomVerificationEmailInvalidContentException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "CustomVerificationEmailInvalidContent",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class CustomVerificationEmailTemplateAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<CustomVerificationEmailTemplateAlreadyExistsException>()(
    "CustomVerificationEmailTemplateAlreadyExistsException",
    {
      CustomVerificationEmailTemplateName: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "CustomVerificationEmailTemplateAlreadyExists",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class CustomVerificationEmailTemplateDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<CustomVerificationEmailTemplateDoesNotExistException>()(
    "CustomVerificationEmailTemplateDoesNotExistException",
    {
      CustomVerificationEmailTemplateName: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "CustomVerificationEmailTemplateDoesNotExist",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class EventDestinationAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<EventDestinationAlreadyExistsException>()(
    "EventDestinationAlreadyExistsException",
    {
      ConfigurationSetName: /*@__PURE__*/ S.optional(S.String),
      EventDestinationName: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "EventDestinationAlreadyExists",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class EventDestinationDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<EventDestinationDoesNotExistException>()(
    "EventDestinationDoesNotExistException",
    {
      ConfigurationSetName: /*@__PURE__*/ S.optional(S.String),
      EventDestinationName: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "EventDestinationDoesNotExist",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class FromEmailAddressNotVerifiedException
  extends /*@__PURE__*/ S.TaggedError<FromEmailAddressNotVerifiedException>()(
    "FromEmailAddressNotVerifiedException",
    {
      FromEmailAddress: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "FromEmailAddressNotVerified", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class IdentityNotVerified
  extends /*@__PURE__*/ S.TaggedError<IdentityNotVerified>()(
    "IdentityNotVerified",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.SyntheticError({
      from: "InvalidParameterValue",
      message: { includes: "Identity is not verified" },
    }),
  ) {}
export class InvalidCloudWatchDestinationException
  extends /*@__PURE__*/ S.TaggedError<InvalidCloudWatchDestinationException>()(
    "InvalidCloudWatchDestinationException",
    {
      ConfigurationSetName: /*@__PURE__*/ S.optional(S.String),
      EventDestinationName: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "InvalidCloudWatchDestination",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidConfigurationSetException
  extends /*@__PURE__*/ S.TaggedError<InvalidConfigurationSetException>()(
    "InvalidConfigurationSetException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidConfigurationSet", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidDeliveryOptionsException
  extends /*@__PURE__*/ S.TaggedError<InvalidDeliveryOptionsException>()(
    "InvalidDeliveryOptionsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidDeliveryOptions", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidFirehoseDestinationException
  extends /*@__PURE__*/ S.TaggedError<InvalidFirehoseDestinationException>()(
    "InvalidFirehoseDestinationException",
    {
      ConfigurationSetName: /*@__PURE__*/ S.optional(S.String),
      EventDestinationName: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidFirehoseDestination", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidLambdaFunctionException
  extends /*@__PURE__*/ S.TaggedError<InvalidLambdaFunctionException>()(
    "InvalidLambdaFunctionException",
    {
      FunctionArn: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidLambdaFunction", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterValue
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterValue>()("InvalidParameterValue", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidPolicyException
  extends /*@__PURE__*/ S.TaggedError<InvalidPolicyException>()(
    "InvalidPolicyException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidPolicy", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidRenderingParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidRenderingParameterException>()(
    "InvalidRenderingParameterException",
    {
      TemplateName: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidRenderingParameter", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidS3ConfigurationException
  extends /*@__PURE__*/ S.TaggedError<InvalidS3ConfigurationException>()(
    "InvalidS3ConfigurationException",
    {
      Bucket: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidS3Configuration", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidSNSDestinationException
  extends /*@__PURE__*/ S.TaggedError<InvalidSNSDestinationException>()(
    "InvalidSNSDestinationException",
    {
      ConfigurationSetName: /*@__PURE__*/ S.optional(S.String),
      EventDestinationName: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidSNSDestination", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidSnsTopicException
  extends /*@__PURE__*/ S.TaggedError<InvalidSnsTopicException>()(
    "InvalidSnsTopicException",
    {
      Topic: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidSnsTopic", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidTemplateException
  extends /*@__PURE__*/ S.TaggedError<InvalidTemplateException>()(
    "InvalidTemplateException",
    {
      TemplateName: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidTemplate", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidTrackingOptionsException
  extends /*@__PURE__*/ S.TaggedError<InvalidTrackingOptionsException>()(
    "InvalidTrackingOptionsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidTrackingOptions", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "LimitExceeded", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class MailFromDomainNotVerifiedException
  extends /*@__PURE__*/ S.TaggedError<MailFromDomainNotVerifiedException>()(
    "MailFromDomainNotVerifiedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "MailFromDomainNotVerifiedException",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class MessageRejected
  extends /*@__PURE__*/ S.TaggedError<MessageRejected>()(
    "MessageRejected",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "MessageRejected", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class MissingRenderingAttributeException
  extends /*@__PURE__*/ S.TaggedError<MissingRenderingAttributeException>()(
    "MissingRenderingAttributeException",
    {
      TemplateName: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "MissingRenderingAttribute", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ProductionAccessNotGrantedException
  extends /*@__PURE__*/ S.TaggedError<ProductionAccessNotGrantedException>()(
    "ProductionAccessNotGrantedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ProductionAccessNotGranted", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ReceiptRuleRoleNotAssumable
  extends /*@__PURE__*/ S.TaggedError<ReceiptRuleRoleNotAssumable>()(
    "ReceiptRuleRoleNotAssumable",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.SyntheticError({
      from: "InvalidParameterValue",
      message: { includes: "Could not assume the provided IAM Role" },
    }),
  ) {}
export class RuleDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<RuleDoesNotExistException>()(
    "RuleDoesNotExistException",
    {
      Name: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "RuleDoesNotExist", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class RuleSetDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<RuleSetDoesNotExistException>()(
    "RuleSetDoesNotExistException",
    {
      Name: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "RuleSetDoesNotExist", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class TemplateDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<TemplateDoesNotExistException>()(
    "TemplateDoesNotExistException",
    {
      TemplateName: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "TemplateDoesNotExist", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class TrackingOptionsAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<TrackingOptionsAlreadyExistsException>()(
    "TrackingOptionsAlreadyExistsException",
    {
      ConfigurationSetName: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "TrackingOptionsAlreadyExistsException",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class TrackingOptionsDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<TrackingOptionsDoesNotExistException>()(
    "TrackingOptionsDoesNotExistException",
    {
      ConfigurationSetName: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "TrackingOptionsDoesNotExistException",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export type ReceiptRuleSetName = string;
export interface CloneReceiptRuleSetRequest {
  RuleSetName: string;
  OriginalRuleSetName: string;
}
export interface CloneReceiptRuleSetResponse {}
export type ConfigurationSetName = string;
export interface ConfigurationSet {
  Name: string;
}
export interface CreateConfigurationSetRequest {
  ConfigurationSet: ConfigurationSet;
}
export interface CreateConfigurationSetResponse {}
export type EventDestinationName = string;
export type Enabled = boolean;
export type EventType =
  | "send"
  | "reject"
  | "bounce"
  | "complaint"
  | "delivery"
  | "open"
  | "click"
  | "renderingFailure"
  | (string & {});
export type EventTypes = EventType[];
export type AmazonResourceName = string;
export interface KinesisFirehoseDestination {
  IAMRoleARN: string;
  DeliveryStreamARN: string;
}
export type DimensionName = string;
export type DimensionValueSource = "messageTag" | "emailHeader" | "linkTag" | (string & {});
export type DefaultDimensionValue = string;
export interface CloudWatchDimensionConfiguration {
  DimensionName: string;
  DimensionValueSource: DimensionValueSource;
  DefaultDimensionValue: string;
}
export type CloudWatchDimensionConfigurations = CloudWatchDimensionConfiguration[];
export interface CloudWatchDestination {
  DimensionConfigurations: CloudWatchDimensionConfiguration[];
}
export interface SNSDestination {
  TopicARN: string;
}
export interface EventDestination {
  Name: string;
  Enabled?: boolean;
  MatchingEventTypes: EventType[];
  KinesisFirehoseDestination?: KinesisFirehoseDestination;
  CloudWatchDestination?: CloudWatchDestination;
  SNSDestination?: SNSDestination;
}
export interface CreateConfigurationSetEventDestinationRequest {
  ConfigurationSetName: string;
  EventDestination: EventDestination;
}
export interface CreateConfigurationSetEventDestinationResponse {}
export type CustomRedirectDomain = string;
export interface TrackingOptions {
  CustomRedirectDomain?: string;
}
export interface CreateConfigurationSetTrackingOptionsRequest {
  ConfigurationSetName: string;
  TrackingOptions: TrackingOptions;
}
export interface CreateConfigurationSetTrackingOptionsResponse {}
export type TemplateName = string;
export type FromAddress = string;
export type Subject = string;
export type TemplateContent = string;
export type SuccessRedirectionURL = string;
export type FailureRedirectionURL = string;
export interface CreateCustomVerificationEmailTemplateRequest {
  TemplateName: string;
  FromEmailAddress: string;
  TemplateSubject: string;
  TemplateContent: string;
  SuccessRedirectionURL: string;
  FailureRedirectionURL: string;
}
export interface CreateCustomVerificationEmailTemplateResponse {}
export type ReceiptFilterName = string;
export type ReceiptFilterPolicy = "Block" | "Allow" | (string & {});
export type Cidr = string;
export interface ReceiptIpFilter {
  Policy: ReceiptFilterPolicy;
  Cidr: string;
}
export interface ReceiptFilter {
  Name: string;
  IpFilter: ReceiptIpFilter;
}
export interface CreateReceiptFilterRequest {
  Filter: ReceiptFilter;
}
export interface CreateReceiptFilterResponse {}
export type ReceiptRuleName = string;
export type TlsPolicy = "Require" | "Optional" | (string & {});
export type Recipient = string;
export type RecipientsList = string[];
export type S3BucketName = string;
export type S3KeyPrefix = string;
export type IAMRoleARN = string;
export interface S3Action {
  TopicArn?: string;
  BucketName: string;
  ObjectKeyPrefix?: string;
  KmsKeyArn?: string;
  IamRoleArn?: string;
}
export type BounceSmtpReplyCode = string;
export type BounceStatusCode = string;
export type BounceMessage = string;
export type Address = string;
export interface BounceAction {
  TopicArn?: string;
  SmtpReplyCode: string;
  StatusCode?: string;
  Message: string;
  Sender: string;
}
export interface WorkmailAction {
  TopicArn?: string;
  OrganizationArn: string;
}
export type InvocationType = "Event" | "RequestResponse" | (string & {});
export interface LambdaAction {
  TopicArn?: string;
  FunctionArn: string;
  InvocationType?: InvocationType;
}
export type StopScope = "RuleSet" | (string & {});
export interface StopAction {
  Scope: StopScope;
  TopicArn?: string;
}
export type HeaderName = string;
export type HeaderValue = string;
export interface AddHeaderAction {
  HeaderName: string;
  HeaderValue: string;
}
export type SNSActionEncoding = "UTF-8" | "Base64" | (string & {});
export interface SNSAction {
  TopicArn: string;
  Encoding?: SNSActionEncoding;
}
export type ConnectInstanceArn = string;
export interface ConnectAction {
  InstanceARN: string;
  IAMRoleARN: string;
}
export interface ReceiptAction {
  S3Action?: S3Action;
  BounceAction?: BounceAction;
  WorkmailAction?: WorkmailAction;
  LambdaAction?: LambdaAction;
  StopAction?: StopAction;
  AddHeaderAction?: AddHeaderAction;
  SNSAction?: SNSAction;
  ConnectAction?: ConnectAction;
}
export type ReceiptActionsList = ReceiptAction[];
export interface ReceiptRule {
  Name: string;
  Enabled?: boolean;
  TlsPolicy?: TlsPolicy;
  Recipients?: string[];
  Actions?: ReceiptAction[];
  ScanEnabled?: boolean;
}
export interface CreateReceiptRuleRequest {
  RuleSetName: string;
  After?: string;
  Rule: ReceiptRule;
}
export interface CreateReceiptRuleResponse {}
export interface CreateReceiptRuleSetRequest {
  RuleSetName: string;
}
export interface CreateReceiptRuleSetResponse {}
export type SubjectPart = string;
export type TextPart = string;
export type HtmlPart = string;
export interface Template {
  TemplateName: string;
  SubjectPart?: string;
  TextPart?: string;
  HtmlPart?: string;
}
export interface CreateTemplateRequest {
  Template: Template;
}
export interface CreateTemplateResponse {}
export interface DeleteConfigurationSetRequest {
  ConfigurationSetName: string;
}
export interface DeleteConfigurationSetResponse {}
export interface DeleteConfigurationSetEventDestinationRequest {
  ConfigurationSetName: string;
  EventDestinationName: string;
}
export interface DeleteConfigurationSetEventDestinationResponse {}
export interface DeleteConfigurationSetTrackingOptionsRequest {
  ConfigurationSetName: string;
}
export interface DeleteConfigurationSetTrackingOptionsResponse {}
export interface DeleteCustomVerificationEmailTemplateRequest {
  TemplateName: string;
}
export interface DeleteCustomVerificationEmailTemplateResponse {}
export type Identity = string;
export interface DeleteIdentityRequest {
  Identity: string;
}
export interface DeleteIdentityResponse {}
export type PolicyName = string;
export interface DeleteIdentityPolicyRequest {
  Identity: string;
  PolicyName: string;
}
export interface DeleteIdentityPolicyResponse {}
export interface DeleteReceiptFilterRequest {
  FilterName: string;
}
export interface DeleteReceiptFilterResponse {}
export interface DeleteReceiptRuleRequest {
  RuleSetName: string;
  RuleName: string;
}
export interface DeleteReceiptRuleResponse {}
export interface DeleteReceiptRuleSetRequest {
  RuleSetName: string;
}
export interface DeleteReceiptRuleSetResponse {}
export interface DeleteTemplateRequest {
  TemplateName: string;
}
export interface DeleteTemplateResponse {}
export interface DeleteVerifiedEmailAddressRequest {
  EmailAddress: string;
}
export interface DeleteVerifiedEmailAddressResponse {}
export interface DescribeActiveReceiptRuleSetRequest {}
export interface ReceiptRuleSetMetadata {
  Name?: string;
  CreatedTimestamp?: Date;
}
export type ReceiptRulesList = ReceiptRule[];
export interface DescribeActiveReceiptRuleSetResponse {
  Metadata?: ReceiptRuleSetMetadata;
  Rules?: ReceiptRule[];
}
export type ConfigurationSetAttribute =
  | "eventDestinations"
  | "trackingOptions"
  | "deliveryOptions"
  | "reputationOptions"
  | (string & {});
export type ConfigurationSetAttributeList = ConfigurationSetAttribute[];
export interface DescribeConfigurationSetRequest {
  ConfigurationSetName: string;
  ConfigurationSetAttributeNames?: ConfigurationSetAttribute[];
}
export type EventDestinations = EventDestination[];
export interface DeliveryOptions {
  TlsPolicy?: TlsPolicy;
}
export type LastFreshStart = Date;
export interface ReputationOptions {
  SendingEnabled?: boolean;
  ReputationMetricsEnabled?: boolean;
  LastFreshStart?: Date;
}
export interface DescribeConfigurationSetResponse {
  ConfigurationSet?: ConfigurationSet;
  EventDestinations?: EventDestination[];
  TrackingOptions?: TrackingOptions;
  DeliveryOptions?: DeliveryOptions;
  ReputationOptions?: ReputationOptions;
}
export interface DescribeReceiptRuleRequest {
  RuleSetName: string;
  RuleName: string;
}
export interface DescribeReceiptRuleResponse {
  Rule?: ReceiptRule;
}
export interface DescribeReceiptRuleSetRequest {
  RuleSetName: string;
}
export interface DescribeReceiptRuleSetResponse {
  Metadata?: ReceiptRuleSetMetadata;
  Rules?: ReceiptRule[];
}
export interface GetAccountSendingEnabledRequest {}
export interface GetAccountSendingEnabledResponse {
  Enabled?: boolean;
}
export interface GetCustomVerificationEmailTemplateRequest {
  TemplateName: string;
}
export interface GetCustomVerificationEmailTemplateResponse {
  TemplateName?: string;
  FromEmailAddress?: string;
  TemplateSubject?: string;
  TemplateContent?: string;
  SuccessRedirectionURL?: string;
  FailureRedirectionURL?: string;
}
export type IdentityList = string[];
export interface GetIdentityDkimAttributesRequest {
  Identities: string[];
}
export type VerificationStatus =
  | "Pending"
  | "Success"
  | "Failed"
  | "TemporaryFailure"
  | "NotStarted"
  | (string & {});
export type VerificationToken = string;
export type VerificationTokenList = string[];
export interface IdentityDkimAttributes {
  DkimEnabled: boolean;
  DkimVerificationStatus: VerificationStatus;
  DkimTokens?: string[];
}
export type DkimAttributes = { [key: string]: IdentityDkimAttributes | undefined };
export interface GetIdentityDkimAttributesResponse {
  DkimAttributes: { [key: string]: IdentityDkimAttributes | undefined };
}
export interface GetIdentityMailFromDomainAttributesRequest {
  Identities: string[];
}
export type MailFromDomainName = string;
export type CustomMailFromStatus =
  | "Pending"
  | "Success"
  | "Failed"
  | "TemporaryFailure"
  | (string & {});
export type BehaviorOnMXFailure = "UseDefaultValue" | "RejectMessage" | (string & {});
export interface IdentityMailFromDomainAttributes {
  MailFromDomain: string;
  MailFromDomainStatus: CustomMailFromStatus;
  BehaviorOnMXFailure: BehaviorOnMXFailure;
}
export type MailFromDomainAttributes = {
  [key: string]: IdentityMailFromDomainAttributes | undefined;
};
export interface GetIdentityMailFromDomainAttributesResponse {
  MailFromDomainAttributes: { [key: string]: IdentityMailFromDomainAttributes | undefined };
}
export interface GetIdentityNotificationAttributesRequest {
  Identities: string[];
}
export type NotificationTopic = string;
export interface IdentityNotificationAttributes {
  BounceTopic: string;
  ComplaintTopic: string;
  DeliveryTopic: string;
  ForwardingEnabled: boolean;
  HeadersInBounceNotificationsEnabled?: boolean;
  HeadersInComplaintNotificationsEnabled?: boolean;
  HeadersInDeliveryNotificationsEnabled?: boolean;
}
export type NotificationAttributes = { [key: string]: IdentityNotificationAttributes | undefined };
export interface GetIdentityNotificationAttributesResponse {
  NotificationAttributes: { [key: string]: IdentityNotificationAttributes | undefined };
}
export type PolicyNameList = string[];
export interface GetIdentityPoliciesRequest {
  Identity: string;
  PolicyNames: string[];
}
export type Policy = string;
export type PolicyMap = { [key: string]: string | undefined };
export interface GetIdentityPoliciesResponse {
  Policies: { [key: string]: string | undefined };
}
export interface GetIdentityVerificationAttributesRequest {
  Identities: string[];
}
export interface IdentityVerificationAttributes {
  VerificationStatus: VerificationStatus;
  VerificationToken?: string;
}
export type VerificationAttributes = { [key: string]: IdentityVerificationAttributes | undefined };
export interface GetIdentityVerificationAttributesResponse {
  VerificationAttributes: { [key: string]: IdentityVerificationAttributes | undefined };
}
export interface GetSendQuotaRequest {}
export type Max24HourSend = number;
export type MaxSendRate = number;
export type SentLast24Hours = number;
export interface GetSendQuotaResponse {
  Max24HourSend?: number;
  MaxSendRate?: number;
  SentLast24Hours?: number;
}
export interface GetSendStatisticsRequest {}
export type Counter = number;
export interface SendDataPoint {
  Timestamp?: Date;
  DeliveryAttempts?: number;
  Bounces?: number;
  Complaints?: number;
  Rejects?: number;
}
export type SendDataPointList = SendDataPoint[];
export interface GetSendStatisticsResponse {
  SendDataPoints?: SendDataPoint[];
}
export interface GetTemplateRequest {
  TemplateName: string;
}
export interface GetTemplateResponse {
  Template?: Template;
}
export type NextToken = string;
export type MaxItems = number;
export interface ListConfigurationSetsRequest {
  NextToken?: string;
  MaxItems?: number;
}
export type ConfigurationSets = ConfigurationSet[];
export interface ListConfigurationSetsResponse {
  ConfigurationSets?: ConfigurationSet[];
  NextToken?: string;
}
export type MaxResults = number;
export interface ListCustomVerificationEmailTemplatesRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface CustomVerificationEmailTemplate {
  TemplateName?: string;
  FromEmailAddress?: string;
  TemplateSubject?: string;
  SuccessRedirectionURL?: string;
  FailureRedirectionURL?: string;
}
export type CustomVerificationEmailTemplates = CustomVerificationEmailTemplate[];
export interface ListCustomVerificationEmailTemplatesResponse {
  CustomVerificationEmailTemplates?: CustomVerificationEmailTemplate[];
  NextToken?: string;
}
export type IdentityType = "EmailAddress" | "Domain" | (string & {});
export interface ListIdentitiesRequest {
  IdentityType?: IdentityType;
  NextToken?: string;
  MaxItems?: number;
}
export interface ListIdentitiesResponse {
  Identities: string[];
  NextToken?: string;
}
export interface ListIdentityPoliciesRequest {
  Identity: string;
}
export interface ListIdentityPoliciesResponse {
  PolicyNames: string[];
}
export interface ListReceiptFiltersRequest {}
export type ReceiptFilterList = ReceiptFilter[];
export interface ListReceiptFiltersResponse {
  Filters?: ReceiptFilter[];
}
export interface ListReceiptRuleSetsRequest {
  NextToken?: string;
}
export type ReceiptRuleSetsLists = ReceiptRuleSetMetadata[];
export interface ListReceiptRuleSetsResponse {
  RuleSets?: ReceiptRuleSetMetadata[];
  NextToken?: string;
}
export interface ListTemplatesRequest {
  NextToken?: string;
  MaxItems?: number;
}
export interface TemplateMetadata {
  Name?: string;
  CreatedTimestamp?: Date;
}
export type TemplateMetadataList = TemplateMetadata[];
export interface ListTemplatesResponse {
  TemplatesMetadata?: TemplateMetadata[];
  NextToken?: string;
}
export interface ListVerifiedEmailAddressesRequest {}
export type AddressList = string[];
export interface ListVerifiedEmailAddressesResponse {
  VerifiedEmailAddresses?: string[];
}
export interface PutConfigurationSetDeliveryOptionsRequest {
  ConfigurationSetName: string;
  DeliveryOptions?: DeliveryOptions;
}
export interface PutConfigurationSetDeliveryOptionsResponse {}
export interface PutIdentityPolicyRequest {
  Identity: string;
  PolicyName: string;
  Policy: string;
}
export interface PutIdentityPolicyResponse {}
export type ReceiptRuleNamesList = string[];
export interface ReorderReceiptRuleSetRequest {
  RuleSetName: string;
  RuleNames: string[];
}
export interface ReorderReceiptRuleSetResponse {}
export type MessageId = string;
export type Explanation = string;
export type ReportingMta = string;
export type ArrivalDate = Date;
export type ExtensionFieldName = string;
export type ExtensionFieldValue = string;
export interface ExtensionField {
  Name: string;
  Value: string;
}
export type ExtensionFieldList = ExtensionField[];
export interface MessageDsn {
  ReportingMta: string;
  ArrivalDate?: Date;
  ExtensionFields?: ExtensionField[];
}
export type BounceType =
  | "DoesNotExist"
  | "MessageTooLarge"
  | "ExceededQuota"
  | "ContentRejected"
  | "Undefined"
  | "TemporaryFailure"
  | (string & {});
export type DsnAction = "failed" | "delayed" | "delivered" | "relayed" | "expanded" | (string & {});
export type RemoteMta = string;
export type DsnStatus = string;
export type DiagnosticCode = string;
export type LastAttemptDate = Date;
export interface RecipientDsnFields {
  FinalRecipient?: string;
  Action: DsnAction;
  RemoteMta?: string;
  Status: string;
  DiagnosticCode?: string;
  LastAttemptDate?: Date;
  ExtensionFields?: ExtensionField[];
}
export interface BouncedRecipientInfo {
  Recipient: string;
  RecipientArn?: string;
  BounceType?: BounceType;
  RecipientDsnFields?: RecipientDsnFields;
}
export type BouncedRecipientInfoList = BouncedRecipientInfo[];
export interface SendBounceRequest {
  OriginalMessageId: string;
  BounceSender: string;
  Explanation?: string;
  MessageDsn?: MessageDsn;
  BouncedRecipientInfoList: BouncedRecipientInfo[];
  BounceSenderArn?: string;
}
export interface SendBounceResponse {
  MessageId?: string;
}
export type MessageTagName = string;
export type MessageTagValue = string;
export interface MessageTag {
  Name: string;
  Value: string;
}
export type MessageTagList = MessageTag[];
export type TemplateData = string;
export interface Destination {
  ToAddresses?: string[];
  CcAddresses?: string[];
  BccAddresses?: string[];
}
export interface BulkEmailDestination {
  Destination: Destination;
  ReplacementTags?: MessageTag[];
  ReplacementTemplateData?: string;
}
export type BulkEmailDestinationList = BulkEmailDestination[];
export interface SendBulkTemplatedEmailRequest {
  Source: string;
  SourceArn?: string;
  ReplyToAddresses?: string[];
  ReturnPath?: string;
  ReturnPathArn?: string;
  ConfigurationSetName?: string;
  DefaultTags?: MessageTag[];
  Template: string;
  TemplateArn?: string;
  DefaultTemplateData: string;
  Destinations: BulkEmailDestination[];
}
export type BulkEmailStatus =
  | "Success"
  | "MessageRejected"
  | "MailFromDomainNotVerified"
  | "ConfigurationSetDoesNotExist"
  | "TemplateDoesNotExist"
  | "AccountSuspended"
  | "AccountThrottled"
  | "AccountDailyQuotaExceeded"
  | "InvalidSendingPoolName"
  | "AccountSendingPaused"
  | "ConfigurationSetSendingPaused"
  | "InvalidParameterValue"
  | "TransientFailure"
  | "Failed"
  | (string & {});
export interface BulkEmailDestinationStatus {
  Status?: BulkEmailStatus;
  Error?: string;
  MessageId?: string;
}
export type BulkEmailDestinationStatusList = BulkEmailDestinationStatus[];
export interface SendBulkTemplatedEmailResponse {
  Status: BulkEmailDestinationStatus[];
}
export interface SendCustomVerificationEmailRequest {
  EmailAddress: string;
  TemplateName: string;
  ConfigurationSetName?: string;
}
export interface SendCustomVerificationEmailResponse {
  MessageId?: string;
}
export type MessageData = string;
export type Charset = string;
export interface Content {
  Data: string;
  Charset?: string;
}
export interface Body {
  Text?: Content;
  Html?: Content;
}
export interface Message {
  Subject: Content;
  Body: Body;
}
export interface SendEmailRequest {
  Source: string;
  Destination: Destination;
  Message: Message;
  ReplyToAddresses?: string[];
  ReturnPath?: string;
  SourceArn?: string;
  ReturnPathArn?: string;
  Tags?: MessageTag[];
  ConfigurationSetName?: string;
}
export interface SendEmailResponse {
  MessageId: string;
}
export type RawMessageData = Uint8Array;
export interface RawMessage {
  Data: Uint8Array;
}
export interface SendRawEmailRequest {
  Source?: string;
  Destinations?: string[];
  RawMessage: RawMessage;
  FromArn?: string;
  SourceArn?: string;
  ReturnPathArn?: string;
  Tags?: MessageTag[];
  ConfigurationSetName?: string;
}
export interface SendRawEmailResponse {
  MessageId: string;
}
export interface SendTemplatedEmailRequest {
  Source: string;
  Destination: Destination;
  ReplyToAddresses?: string[];
  ReturnPath?: string;
  SourceArn?: string;
  ReturnPathArn?: string;
  Tags?: MessageTag[];
  ConfigurationSetName?: string;
  Template: string;
  TemplateArn?: string;
  TemplateData: string;
}
export interface SendTemplatedEmailResponse {
  MessageId: string;
}
export interface SetActiveReceiptRuleSetRequest {
  RuleSetName?: string;
}
export interface SetActiveReceiptRuleSetResponse {}
export interface SetIdentityDkimEnabledRequest {
  Identity: string;
  DkimEnabled: boolean;
}
export interface SetIdentityDkimEnabledResponse {}
export interface SetIdentityFeedbackForwardingEnabledRequest {
  Identity: string;
  ForwardingEnabled: boolean;
}
export interface SetIdentityFeedbackForwardingEnabledResponse {}
export type NotificationType = "Bounce" | "Complaint" | "Delivery" | (string & {});
export interface SetIdentityHeadersInNotificationsEnabledRequest {
  Identity: string;
  NotificationType: NotificationType;
  Enabled: boolean;
}
export interface SetIdentityHeadersInNotificationsEnabledResponse {}
export interface SetIdentityMailFromDomainRequest {
  Identity: string;
  MailFromDomain?: string;
  BehaviorOnMXFailure?: BehaviorOnMXFailure;
}
export interface SetIdentityMailFromDomainResponse {}
export interface SetIdentityNotificationTopicRequest {
  Identity: string;
  NotificationType: NotificationType;
  SnsTopic?: string;
}
export interface SetIdentityNotificationTopicResponse {}
export interface SetReceiptRulePositionRequest {
  RuleSetName: string;
  RuleName: string;
  After?: string;
}
export interface SetReceiptRulePositionResponse {}
export interface TestRenderTemplateRequest {
  TemplateName: string;
  TemplateData: string;
}
export type RenderedTemplate = string;
export interface TestRenderTemplateResponse {
  RenderedTemplate?: string;
}
export interface UpdateAccountSendingEnabledRequest {
  Enabled?: boolean;
}
export interface UpdateAccountSendingEnabledResponse {}
export interface UpdateConfigurationSetEventDestinationRequest {
  ConfigurationSetName: string;
  EventDestination: EventDestination;
}
export interface UpdateConfigurationSetEventDestinationResponse {}
export interface UpdateConfigurationSetReputationMetricsEnabledRequest {
  ConfigurationSetName: string;
  Enabled: boolean;
}
export interface UpdateConfigurationSetReputationMetricsEnabledResponse {}
export interface UpdateConfigurationSetSendingEnabledRequest {
  ConfigurationSetName: string;
  Enabled: boolean;
}
export interface UpdateConfigurationSetSendingEnabledResponse {}
export interface UpdateConfigurationSetTrackingOptionsRequest {
  ConfigurationSetName: string;
  TrackingOptions: TrackingOptions;
}
export interface UpdateConfigurationSetTrackingOptionsResponse {}
export interface UpdateCustomVerificationEmailTemplateRequest {
  TemplateName: string;
  FromEmailAddress?: string;
  TemplateSubject?: string;
  TemplateContent?: string;
  SuccessRedirectionURL?: string;
  FailureRedirectionURL?: string;
}
export interface UpdateCustomVerificationEmailTemplateResponse {}
export interface UpdateReceiptRuleRequest {
  RuleSetName: string;
  Rule: ReceiptRule;
}
export interface UpdateReceiptRuleResponse {}
export interface UpdateTemplateRequest {
  Template: Template;
}
export interface UpdateTemplateResponse {}
export type Domain = string;
export interface VerifyDomainDkimRequest {
  Domain: string;
}
export interface VerifyDomainDkimResponse {
  DkimTokens: string[];
}
export interface VerifyDomainIdentityRequest {
  Domain: string;
}
export interface VerifyDomainIdentityResponse {
  VerificationToken: string;
}
export interface VerifyEmailAddressRequest {
  EmailAddress: string;
}
export interface VerifyEmailAddressResponse {}
export interface VerifyEmailIdentityRequest {
  EmailAddress: string;
}
export interface VerifyEmailIdentityResponse {}
export type RuleOrRuleSetName = string;
export type ErrorMessage = string;
export type CloneReceiptRuleSetError =
  | AlreadyExistsException
  | LimitExceededException
  | RuleSetDoesNotExistException
  | CommonErrors;
/**
 * Creates a receipt rule set by cloning an existing one. All receipt rules and
 * configurations are copied to the new receipt rule set and are completely independent of
 * the source rule set.
 *
 * For information about setting up rule sets, see the Amazon SES Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const cloneReceiptRuleSet: API.OperationMethod<
  CloneReceiptRuleSetRequest,
  CloneReceiptRuleSetResponse,
  CloneReceiptRuleSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c8, 0) as any as S.Schema<CloneReceiptRuleSetRequest>,
  output: __S(129, __c8, 1) as any as S.Schema<CloneReceiptRuleSetResponse>,
  errors: [AlreadyExistsException, LimitExceededException, RuleSetDoesNotExistException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CloneReceiptRuleSet",
}));

export type CreateConfigurationSetError =
  | ConfigurationSetAlreadyExistsException
  | InvalidConfigurationSetException
  | LimitExceededException
  | CommonErrors;
/**
 * Creates a configuration set.
 *
 * Configuration sets enable you to publish email sending events. For information about
 * using configuration sets, see the Amazon SES Developer
 * Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const createConfigurationSet: API.OperationMethod<
  CreateConfigurationSetRequest,
  CreateConfigurationSetResponse,
  CreateConfigurationSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c9, 0) as any as S.Schema<CreateConfigurationSetRequest>,
  output: __S(145, __c9, 1) as any as S.Schema<CreateConfigurationSetResponse>,
  errors: [
    ConfigurationSetAlreadyExistsException,
    InvalidConfigurationSetException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConfigurationSet",
}));

export type CreateConfigurationSetEventDestinationError =
  | ConfigurationSetDoesNotExistException
  | EventDestinationAlreadyExistsException
  | InvalidCloudWatchDestinationException
  | InvalidFirehoseDestinationException
  | InvalidSNSDestinationException
  | LimitExceededException
  | CommonErrors;
/**
 * Creates a configuration set event destination.
 *
 * When you create or update an event destination, you must provide one, and only
 * one, destination. The destination can be CloudWatch, Amazon Kinesis Firehose, or Amazon Simple Notification Service (Amazon SNS).
 *
 * An event destination is the Amazon Web Services service to which Amazon SES publishes the email sending
 * events associated with a configuration set. For information about using configuration
 * sets, see the Amazon SES Developer
 * Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const createConfigurationSetEventDestination: API.OperationMethod<
  CreateConfigurationSetEventDestinationRequest,
  CreateConfigurationSetEventDestinationResponse,
  CreateConfigurationSetEventDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c11, 0) as any as S.Schema<CreateConfigurationSetEventDestinationRequest>,
  output: __S(177, __c11, 1) as any as S.Schema<CreateConfigurationSetEventDestinationResponse>,
  errors: [
    ConfigurationSetDoesNotExistException,
    EventDestinationAlreadyExistsException,
    InvalidCloudWatchDestinationException,
    InvalidFirehoseDestinationException,
    InvalidSNSDestinationException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConfigurationSetEventDestination",
}));

export type CreateConfigurationSetTrackingOptionsError =
  | ConfigurationSetDoesNotExistException
  | InvalidTrackingOptionsException
  | TrackingOptionsAlreadyExistsException
  | CommonErrors;
/**
 * Creates an association between a configuration set and a custom domain for open and
 * click event tracking.
 *
 * By default, images and links used for tracking open and click events are hosted on
 * domains operated by Amazon SES. You can configure a subdomain of your own to handle these
 * events. For information about using custom domains, see the Amazon SES Developer Guide.
 */
export const createConfigurationSetTrackingOptions: API.OperationMethod<
  CreateConfigurationSetTrackingOptionsRequest,
  CreateConfigurationSetTrackingOptionsResponse,
  CreateConfigurationSetTrackingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c13, 0) as any as S.Schema<CreateConfigurationSetTrackingOptionsRequest>,
  output: __S(209, __c13, 1) as any as S.Schema<CreateConfigurationSetTrackingOptionsResponse>,
  errors: [
    ConfigurationSetDoesNotExistException,
    InvalidTrackingOptionsException,
    TrackingOptionsAlreadyExistsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConfigurationSetTrackingOptions",
}));

export type CreateCustomVerificationEmailTemplateError =
  | CustomVerificationEmailInvalidContentException
  | CustomVerificationEmailTemplateAlreadyExistsException
  | FromEmailAddressNotVerifiedException
  | LimitExceededException
  | CommonErrors;
/**
 * Creates a new custom verification email template.
 *
 * For more information about custom verification email templates, see Using
 * Custom Verification Email Templates in the Amazon SES Developer
 * Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const createCustomVerificationEmailTemplate: API.OperationMethod<
  CreateCustomVerificationEmailTemplateRequest,
  CreateCustomVerificationEmailTemplateResponse,
  CreateCustomVerificationEmailTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c15, 0) as any as S.Schema<CreateCustomVerificationEmailTemplateRequest>,
  output: __S(241, __c15, 1) as any as S.Schema<CreateCustomVerificationEmailTemplateResponse>,
  errors: [
    CustomVerificationEmailInvalidContentException,
    CustomVerificationEmailTemplateAlreadyExistsException,
    FromEmailAddressNotVerifiedException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCustomVerificationEmailTemplate",
}));

export type CreateReceiptFilterError =
  | AlreadyExistsException
  | LimitExceededException
  | CommonErrors;
/**
 * Creates a new IP address filter.
 *
 * For information about setting up IP address filters, see the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const createReceiptFilter: API.OperationMethod<
  CreateReceiptFilterRequest,
  CreateReceiptFilterResponse,
  CreateReceiptFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c16, 0) as any as S.Schema<CreateReceiptFilterRequest>,
  output: __S(257, __c16, 1) as any as S.Schema<CreateReceiptFilterResponse>,
  errors: [AlreadyExistsException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateReceiptFilter",
}));

export type CreateReceiptRuleError =
  | AlreadyExistsException
  | InvalidLambdaFunctionException
  | InvalidS3ConfigurationException
  | InvalidSnsTopicException
  | LimitExceededException
  | RuleDoesNotExistException
  | RuleSetDoesNotExistException
  | InvalidParameterValue
  | IdentityNotVerified
  | ReceiptRuleRoleNotAssumable
  | CommonErrors;
/**
 * Creates a receipt rule.
 *
 * For information about setting up receipt rules, see the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const createReceiptRule: API.OperationMethod<
  CreateReceiptRuleRequest,
  CreateReceiptRuleResponse,
  CreateReceiptRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c18, 0) as any as S.Schema<CreateReceiptRuleRequest>,
  output: __S(289, __c18, 1) as any as S.Schema<CreateReceiptRuleResponse>,
  errors: [
    AlreadyExistsException,
    InvalidLambdaFunctionException,
    InvalidS3ConfigurationException,
    InvalidSnsTopicException,
    LimitExceededException,
    RuleDoesNotExistException,
    RuleSetDoesNotExistException,
    InvalidParameterValue,
    IdentityNotVerified,
    ReceiptRuleRoleNotAssumable,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateReceiptRule",
}));

export type CreateReceiptRuleSetError =
  | AlreadyExistsException
  | LimitExceededException
  | CommonErrors;
/**
 * Creates an empty receipt rule set.
 *
 * For information about setting up receipt rule sets, see the Amazon SES Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const createReceiptRuleSet: API.OperationMethod<
  CreateReceiptRuleSetRequest,
  CreateReceiptRuleSetResponse,
  CreateReceiptRuleSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c20, 0) as any as S.Schema<CreateReceiptRuleSetRequest>,
  output: __S(321, __c20, 1) as any as S.Schema<CreateReceiptRuleSetResponse>,
  errors: [AlreadyExistsException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateReceiptRuleSet",
}));

export type CreateTemplateError =
  | AlreadyExistsException
  | InvalidTemplateException
  | LimitExceededException
  | CommonErrors;
/**
 * Creates an email template. Email templates enable you to send personalized email to
 * one or more destinations in a single operation. For more information, see the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const createTemplate: API.OperationMethod<
  CreateTemplateRequest,
  CreateTemplateResponse,
  CreateTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(336, __c21, 0) as any as S.Schema<CreateTemplateRequest>,
  output: __S(337, __c21, 1) as any as S.Schema<CreateTemplateResponse>,
  errors: [AlreadyExistsException, InvalidTemplateException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTemplate",
}));

export type DeleteConfigurationSetError = ConfigurationSetDoesNotExistException | CommonErrors;
/**
 * Deletes a configuration set. Configuration sets enable you to publish email sending
 * events. For information about using configuration sets, see the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const deleteConfigurationSet: API.OperationMethod<
  DeleteConfigurationSetRequest,
  DeleteConfigurationSetResponse,
  DeleteConfigurationSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(368, __c23, 0) as any as S.Schema<DeleteConfigurationSetRequest>,
  output: __S(369, __c23, 1) as any as S.Schema<DeleteConfigurationSetResponse>,
  errors: [ConfigurationSetDoesNotExistException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfigurationSet",
}));

export type DeleteConfigurationSetEventDestinationError =
  | ConfigurationSetDoesNotExistException
  | EventDestinationDoesNotExistException
  | CommonErrors;
/**
 * Deletes a configuration set event destination. Configuration set event destinations
 * are associated with configuration sets, which enable you to publish email sending
 * events. For information about using configuration sets, see the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const deleteConfigurationSetEventDestination: API.OperationMethod<
  DeleteConfigurationSetEventDestinationRequest,
  DeleteConfigurationSetEventDestinationResponse,
  DeleteConfigurationSetEventDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c24, 0) as any as S.Schema<DeleteConfigurationSetEventDestinationRequest>,
  output: __S(385, __c24, 1) as any as S.Schema<DeleteConfigurationSetEventDestinationResponse>,
  errors: [ConfigurationSetDoesNotExistException, EventDestinationDoesNotExistException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfigurationSetEventDestination",
}));

export type DeleteConfigurationSetTrackingOptionsError =
  | ConfigurationSetDoesNotExistException
  | TrackingOptionsDoesNotExistException
  | CommonErrors;
/**
 * Deletes an association between a configuration set and a custom domain for open and
 * click event tracking.
 *
 * By default, images and links used for tracking open and click events are hosted on
 * domains operated by Amazon SES. You can configure a subdomain of your own to handle these
 * events. For information about using custom domains, see the Amazon SES Developer Guide.
 *
 * Deleting this kind of association results in emails sent using the specified
 * configuration set to capture open and click events using the standard,
 * Amazon SES-operated domains.
 */
export const deleteConfigurationSetTrackingOptions: API.OperationMethod<
  DeleteConfigurationSetTrackingOptionsRequest,
  DeleteConfigurationSetTrackingOptionsResponse,
  DeleteConfigurationSetTrackingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(400, __c25, 0) as any as S.Schema<DeleteConfigurationSetTrackingOptionsRequest>,
  output: __S(401, __c25, 1) as any as S.Schema<DeleteConfigurationSetTrackingOptionsResponse>,
  errors: [ConfigurationSetDoesNotExistException, TrackingOptionsDoesNotExistException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfigurationSetTrackingOptions",
}));

export type DeleteCustomVerificationEmailTemplateError = CommonErrors;
/**
 * Deletes an existing custom verification email template.
 *
 * For more information about custom verification email templates, see Using
 * Custom Verification Email Templates in the Amazon SES Developer
 * Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const deleteCustomVerificationEmailTemplate: API.OperationMethod<
  DeleteCustomVerificationEmailTemplateRequest,
  DeleteCustomVerificationEmailTemplateResponse,
  DeleteCustomVerificationEmailTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c26, 0) as any as S.Schema<DeleteCustomVerificationEmailTemplateRequest>,
  output: __S(417, __c26, 1) as any as S.Schema<DeleteCustomVerificationEmailTemplateResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCustomVerificationEmailTemplate",
}));

export type DeleteIdentityError = CommonErrors;
/**
 * Deletes the specified identity (an email address or a domain) from the list of
 * verified identities.
 *
 * You can execute this operation no more than once per second.
 */
export const deleteIdentity: API.OperationMethod<
  DeleteIdentityRequest,
  DeleteIdentityResponse,
  DeleteIdentityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(432, __c27, 0) as any as S.Schema<DeleteIdentityRequest>,
  output: __S(433, __c27, 1) as any as S.Schema<DeleteIdentityResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIdentity",
}));

export type DeleteIdentityPolicyError = CommonErrors;
/**
 * Deletes the specified sending authorization policy for the given identity (an email
 * address or a domain). This operation returns successfully even if a policy with the
 * specified name does not exist.
 *
 * This operation is for the identity owner only. If you have not verified the
 * identity, it returns an error.
 *
 * Sending authorization is a feature that enables an identity owner to authorize other
 * senders to use its identities. For information about using sending authorization, see
 * the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const deleteIdentityPolicy: API.OperationMethod<
  DeleteIdentityPolicyRequest,
  DeleteIdentityPolicyResponse,
  DeleteIdentityPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c28, 0) as any as S.Schema<DeleteIdentityPolicyRequest>,
  output: __S(449, __c28, 1) as any as S.Schema<DeleteIdentityPolicyResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIdentityPolicy",
}));

export type DeleteReceiptFilterError = CommonErrors;
/**
 * Deletes the specified IP address filter.
 *
 * For information about managing IP address filters, see the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const deleteReceiptFilter: API.OperationMethod<
  DeleteReceiptFilterRequest,
  DeleteReceiptFilterResponse,
  DeleteReceiptFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(464, __c29, 0) as any as S.Schema<DeleteReceiptFilterRequest>,
  output: __S(465, __c29, 1) as any as S.Schema<DeleteReceiptFilterResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteReceiptFilter",
}));

export type DeleteReceiptRuleError = RuleSetDoesNotExistException | CommonErrors;
/**
 * Deletes the specified receipt rule.
 *
 * For information about managing receipt rules, see the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const deleteReceiptRule: API.OperationMethod<
  DeleteReceiptRuleRequest,
  DeleteReceiptRuleResponse,
  DeleteReceiptRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c30, 0) as any as S.Schema<DeleteReceiptRuleRequest>,
  output: __S(481, __c30, 1) as any as S.Schema<DeleteReceiptRuleResponse>,
  errors: [RuleSetDoesNotExistException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteReceiptRule",
}));

export type DeleteReceiptRuleSetError = CannotDeleteException | CommonErrors;
/**
 * Deletes the specified receipt rule set and all of the receipt rules it
 * contains.
 *
 * The currently active rule set cannot be deleted.
 *
 * For information about managing receipt rule sets, see the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const deleteReceiptRuleSet: API.OperationMethod<
  DeleteReceiptRuleSetRequest,
  DeleteReceiptRuleSetResponse,
  DeleteReceiptRuleSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(496, __c31, 0) as any as S.Schema<DeleteReceiptRuleSetRequest>,
  output: __S(497, __c31, 1) as any as S.Schema<DeleteReceiptRuleSetResponse>,
  errors: [CannotDeleteException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteReceiptRuleSet",
}));

export type DeleteTemplateError = CommonErrors;
/**
 * Deletes an email template.
 *
 * You can execute this operation no more than once per second.
 */
export const deleteTemplate: API.OperationMethod<
  DeleteTemplateRequest,
  DeleteTemplateResponse,
  DeleteTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(512, __c32, 0) as any as S.Schema<DeleteTemplateRequest>,
  output: __S(513, __c32, 1) as any as S.Schema<DeleteTemplateResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTemplate",
}));

export type DeleteVerifiedEmailAddressError = CommonErrors;
/**
 * Deprecated. Use the `DeleteIdentity` operation to delete email addresses
 * and domains.
 */
export const deleteVerifiedEmailAddress: API.OperationMethod<
  DeleteVerifiedEmailAddressRequest,
  DeleteVerifiedEmailAddressResponse,
  DeleteVerifiedEmailAddressError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(528, __c33, 0) as any as S.Schema<DeleteVerifiedEmailAddressRequest>,
  output: __S(529, __c33, 1) as any as S.Schema<DeleteVerifiedEmailAddressResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVerifiedEmailAddress",
}));

export type DescribeActiveReceiptRuleSetError = CommonErrors;
/**
 * Returns the metadata and receipt rules for the receipt rule set that is currently
 * active.
 *
 * For information about setting up receipt rule sets, see the Amazon SES Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const describeActiveReceiptRuleSet: API.OperationMethod<
  DescribeActiveReceiptRuleSetRequest,
  DescribeActiveReceiptRuleSetResponse,
  DescribeActiveReceiptRuleSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(544, __c34, 0) as any as S.Schema<DescribeActiveReceiptRuleSetRequest>,
  output: __S(545, __c34, 1) as any as S.Schema<DescribeActiveReceiptRuleSetResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeActiveReceiptRuleSet",
}));

export type DescribeConfigurationSetError = ConfigurationSetDoesNotExistException | CommonErrors;
/**
 * Returns the details of the specified configuration set. For information about using
 * configuration sets, see the Amazon SES Developer
 * Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const describeConfigurationSet: API.OperationMethod<
  DescribeConfigurationSetRequest,
  DescribeConfigurationSetResponse,
  DescribeConfigurationSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(593, __c37, 1) as any as S.Schema<DescribeConfigurationSetRequest>,
  output: __S(596, __c37, 4) as any as S.Schema<DescribeConfigurationSetResponse>,
  errors: [ConfigurationSetDoesNotExistException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConfigurationSet",
}));

export type DescribeReceiptRuleError =
  | RuleDoesNotExistException
  | RuleSetDoesNotExistException
  | CommonErrors;
/**
 * Returns the details of the specified receipt rule.
 *
 * For information about setting up receipt rules, see the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const describeReceiptRule: API.OperationMethod<
  DescribeReceiptRuleRequest,
  DescribeReceiptRuleResponse,
  DescribeReceiptRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(624, __c39, 0) as any as S.Schema<DescribeReceiptRuleRequest>,
  output: __S(625, __c39, 1) as any as S.Schema<DescribeReceiptRuleResponse>,
  errors: [RuleDoesNotExistException, RuleSetDoesNotExistException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReceiptRule",
}));

export type DescribeReceiptRuleSetError = RuleSetDoesNotExistException | CommonErrors;
/**
 * Returns the details of the specified receipt rule set.
 *
 * For information about managing receipt rule sets, see the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const describeReceiptRuleSet: API.OperationMethod<
  DescribeReceiptRuleSetRequest,
  DescribeReceiptRuleSetResponse,
  DescribeReceiptRuleSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(640, __c40, 0) as any as S.Schema<DescribeReceiptRuleSetRequest>,
  output: __S(641, __c40, 1) as any as S.Schema<DescribeReceiptRuleSetResponse>,
  errors: [RuleSetDoesNotExistException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReceiptRuleSet",
}));

export type GetAccountSendingEnabledError = CommonErrors;
/**
 * Returns the email sending status of the Amazon SES account for the current Region.
 *
 * You can execute this operation no more than once per second.
 */
export const getAccountSendingEnabled: API.OperationMethod<
  GetAccountSendingEnabledRequest,
  GetAccountSendingEnabledResponse,
  GetAccountSendingEnabledError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(656, __c41, 0) as any as S.Schema<GetAccountSendingEnabledRequest>,
  output: __S(657, __c41, 1) as any as S.Schema<GetAccountSendingEnabledResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountSendingEnabled",
}));

export type GetCustomVerificationEmailTemplateError =
  | CustomVerificationEmailTemplateDoesNotExistException
  | CommonErrors;
/**
 * Returns the custom email verification template for the template name you
 * specify.
 *
 * For more information about custom verification email templates, see Using
 * Custom Verification Email Templates in the Amazon SES Developer
 * Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const getCustomVerificationEmailTemplate: API.OperationMethod<
  GetCustomVerificationEmailTemplateRequest,
  GetCustomVerificationEmailTemplateResponse,
  GetCustomVerificationEmailTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(672, __c42, 0) as any as S.Schema<GetCustomVerificationEmailTemplateRequest>,
  output: __S(673, __c42, 1) as any as S.Schema<GetCustomVerificationEmailTemplateResponse>,
  errors: [CustomVerificationEmailTemplateDoesNotExistException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCustomVerificationEmailTemplate",
}));

export type GetIdentityDkimAttributesError = CommonErrors;
/**
 * Returns the current status of Easy DKIM signing for an entity. For domain name
 * identities, this operation also returns the DKIM tokens that are required for Easy DKIM
 * signing, and whether Amazon SES has successfully verified that these tokens have been
 * published.
 *
 * This operation takes a list of identities as input and returns the following
 * information for each:
 *
 * - Whether Easy DKIM signing is enabled or disabled.
 *
 * - A set of DKIM tokens that represent the identity. If the identity is an email
 * address, the tokens represent the domain of that address.
 *
 * - Whether Amazon SES has successfully verified the DKIM tokens published in the
 * domain's DNS. This information is only returned for domain name identities, not
 * for email addresses.
 *
 * This operation is throttled at one request per second and can only get DKIM attributes
 * for up to 100 identities at a time.
 *
 * For more information about creating DNS records using DKIM tokens, go to the Amazon SES
 * Developer Guide.
 */
export const getIdentityDkimAttributes: API.OperationMethod<
  GetIdentityDkimAttributesRequest,
  GetIdentityDkimAttributesResponse,
  GetIdentityDkimAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(688, __c43, 0) as any as S.Schema<GetIdentityDkimAttributesRequest>,
  output: __S(691, __c43, 3) as any as S.Schema<GetIdentityDkimAttributesResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIdentityDkimAttributes",
}));

export type GetIdentityMailFromDomainAttributesError = CommonErrors;
/**
 * Returns the custom MAIL FROM attributes for a list of identities (email addresses :
 * domains).
 *
 * This operation is throttled at one request per second and can only get custom MAIL
 * FROM attributes for up to 100 identities at a time.
 */
export const getIdentityMailFromDomainAttributes: API.OperationMethod<
  GetIdentityMailFromDomainAttributesRequest,
  GetIdentityMailFromDomainAttributesResponse,
  GetIdentityMailFromDomainAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(736, __c46, 0) as any as S.Schema<GetIdentityMailFromDomainAttributesRequest>,
  output: __S(739, __c46, 3) as any as S.Schema<GetIdentityMailFromDomainAttributesResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIdentityMailFromDomainAttributes",
}));

export type GetIdentityNotificationAttributesError = CommonErrors;
/**
 * Given a list of verified identities (email addresses and/or domains), returns a
 * structure describing identity notification attributes.
 *
 * This operation is throttled at one request per second and can only get notification
 * attributes for up to 100 identities at a time.
 *
 * For more information about using notifications with Amazon SES, see the Amazon SES
 * Developer Guide.
 */
export const getIdentityNotificationAttributes: API.OperationMethod<
  GetIdentityNotificationAttributesRequest,
  GetIdentityNotificationAttributesResponse,
  GetIdentityNotificationAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(752, __c47, 0) as any as S.Schema<GetIdentityNotificationAttributesRequest>,
  output: __S(755, __c47, 3) as any as S.Schema<GetIdentityNotificationAttributesResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIdentityNotificationAttributes",
}));

export type GetIdentityPoliciesError = CommonErrors;
/**
 * Returns the requested sending authorization policies for the given identity (an email
 * address or a domain). The policies are returned as a map of policy names to policy
 * contents. You can retrieve a maximum of 20 policies at a time.
 *
 * This operation is for the identity owner only. If you have not verified the
 * identity, it returns an error.
 *
 * Sending authorization is a feature that enables an identity owner to authorize other
 * senders to use its identities. For information about using sending authorization, see
 * the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const getIdentityPolicies: API.OperationMethod<
  GetIdentityPoliciesRequest,
  GetIdentityPoliciesResponse,
  GetIdentityPoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(768, __c48, 0) as any as S.Schema<GetIdentityPoliciesRequest>,
  output: __S(770, __c48, 2) as any as S.Schema<GetIdentityPoliciesResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIdentityPolicies",
}));

export type GetIdentityVerificationAttributesError = CommonErrors;
/**
 * Given a list of identities (email addresses and/or domains), returns the verification
 * status and (for domain identities) the verification token for each identity.
 *
 * The verification status of an email address is "Pending" until the email address owner
 * clicks the link within the verification email that Amazon SES sent to that address. If the
 * email address owner clicks the link within 24 hours, the verification status of the
 * email address changes to "Success". If the link is not clicked within 24 hours, the
 * verification status changes to "Failed." In that case, to verify the email address, you
 * must restart the verification process from the beginning.
 *
 * For domain identities, the domain's verification status is "Pending" as Amazon SES searches
 * for the required TXT record in the DNS settings of the domain. When Amazon SES detects the
 * record, the domain's verification status changes to "Success". If Amazon SES is unable to
 * detect the record within 72 hours, the domain's verification status changes to "Failed."
 * In that case, to verify the domain, you must restart the verification process from the
 * beginning.
 *
 * This operation is throttled at one request per second and can only get verification
 * attributes for up to 100 identities at a time.
 */
export const getIdentityVerificationAttributes: API.OperationMethod<
  GetIdentityVerificationAttributesRequest,
  GetIdentityVerificationAttributesResponse,
  GetIdentityVerificationAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(800, __c50, 0) as any as S.Schema<GetIdentityVerificationAttributesRequest>,
  output: __S(803, __c50, 3) as any as S.Schema<GetIdentityVerificationAttributesResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIdentityVerificationAttributes",
}));

export type GetSendQuotaError = CommonErrors;
/**
 * Provides the sending limits for the Amazon SES account.
 *
 * You can execute this operation no more than once per second.
 */
export const getSendQuota: API.OperationMethod<
  GetSendQuotaRequest,
  GetSendQuotaResponse,
  GetSendQuotaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(816, __c51, 0) as any as S.Schema<GetSendQuotaRequest>,
  output: __S(817, __c51, 1) as any as S.Schema<GetSendQuotaResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSendQuota",
}));

export type GetSendStatisticsError = CommonErrors;
/**
 * Provides sending statistics for the current Amazon Web Services Region. The result is a list of data
 * points, representing the last two weeks of sending activity. Each data point in the list
 * contains statistics for a 15-minute period of time.
 *
 * You can execute this operation no more than once per second.
 */
export const getSendStatistics: API.OperationMethod<
  GetSendStatisticsRequest,
  GetSendStatisticsResponse,
  GetSendStatisticsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(832, __c52, 0) as any as S.Schema<GetSendStatisticsRequest>,
  output: __S(835, __c52, 3) as any as S.Schema<GetSendStatisticsResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSendStatistics",
}));

export type GetTemplateError = TemplateDoesNotExistException | CommonErrors;
/**
 * Displays the template object (which includes the Subject line, HTML part and text
 * part) for the template you specify.
 *
 * You can execute this operation no more than once per second.
 */
export const getTemplate: API.OperationMethod<
  GetTemplateRequest,
  GetTemplateResponse,
  GetTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(848, __c53, 0) as any as S.Schema<GetTemplateRequest>,
  output: __S(849, __c53, 1) as any as S.Schema<GetTemplateResponse>,
  errors: [TemplateDoesNotExistException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTemplate",
}));

export type ListConfigurationSetsError = CommonErrors;
/**
 * Provides a list of the configuration sets associated with your Amazon SES account in the
 * current Amazon Web Services Region. For information about using configuration sets, see Monitoring
 * Your Amazon SES Sending Activity in the Amazon SES Developer
 * Guide.
 *
 * You can execute this operation no more than once per second. This operation returns up
 * to 1,000 configuration sets each time it is run. If your Amazon SES account has more than
 * 1,000 configuration sets, this operation also returns `NextToken`. You can
 * then execute the `ListConfigurationSets` operation again, passing the
 * `NextToken` parameter and the value of the NextToken element to retrieve
 * additional results.
 */
export const listConfigurationSets: API.OperationMethod<
  ListConfigurationSetsRequest,
  ListConfigurationSetsResponse,
  ListConfigurationSetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(864, __c54, 0) as any as S.Schema<ListConfigurationSetsRequest>,
  output: __S(866, __c54, 2) as any as S.Schema<ListConfigurationSetsResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConfigurationSets",
}));

export type ListCustomVerificationEmailTemplatesError = CommonErrors;
/**
 * Lists the existing custom verification email templates for your account in the current
 * Amazon Web Services Region.
 *
 * For more information about custom verification email templates, see Using
 * Custom Verification Email Templates in the Amazon SES Developer
 * Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const listCustomVerificationEmailTemplates: API.PaginatedOperationMethod<
  ListCustomVerificationEmailTemplatesRequest,
  ListCustomVerificationEmailTemplatesResponse,
  ListCustomVerificationEmailTemplatesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(880, __c55, 0) as any as S.Schema<ListCustomVerificationEmailTemplatesRequest>,
  output: __S(883, __c55, 3) as any as S.Schema<ListCustomVerificationEmailTemplatesResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCustomVerificationEmailTemplates",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListIdentitiesError = CommonErrors;
/**
 * Returns a list containing all of the identities (email addresses and domains) for your
 * Amazon Web Services account in the current Amazon Web Services Region, regardless of verification status.
 *
 * You can execute this operation no more than once per second.
 *
 * It's recommended that for successive pagination calls of this API, you continue to
 * the use the same parameter/value pairs as used in the original call, e.g., if you
 * used `IdentityType=Domain` in the the original call and received a
 * `NextToken` in the response, you should continue providing the
 * `IdentityType=Domain` parameter for further `NextToken`
 * calls; however, if you didn't provide the `IdentityType` parameter in the
 * original call, then continue to not provide it for successive pagination calls.
 * Using this protocol will ensure consistent results.
 */
export const listIdentities: API.PaginatedOperationMethod<
  ListIdentitiesRequest,
  ListIdentitiesResponse,
  ListIdentitiesError,
  Credentials | HttpClient.HttpClient,
  Identity
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(896, __c56, 0) as any as S.Schema<ListIdentitiesRequest>,
  output: __S(897, __c56, 1) as any as S.Schema<ListIdentitiesResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIdentities",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Identities",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListIdentityPoliciesError = CommonErrors;
/**
 * Returns a list of sending authorization policies that are attached to the given
 * identity (an email address or a domain). This operation returns only a list. To get the
 * actual policy content, use `GetIdentityPolicies`.
 *
 * This operation is for the identity owner only. If you have not verified the
 * identity, it returns an error.
 *
 * Sending authorization is a feature that enables an identity owner to authorize other
 * senders to use its identities. For information about using sending authorization, see
 * the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const listIdentityPolicies: API.OperationMethod<
  ListIdentityPoliciesRequest,
  ListIdentityPoliciesResponse,
  ListIdentityPoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(912, __c57, 0) as any as S.Schema<ListIdentityPoliciesRequest>,
  output: __S(913, __c57, 1) as any as S.Schema<ListIdentityPoliciesResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIdentityPolicies",
}));

export type ListReceiptFiltersError = CommonErrors;
/**
 * Lists the IP address filters associated with your Amazon Web Services account in the current
 * Amazon Web Services Region.
 *
 * For information about managing IP address filters, see the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const listReceiptFilters: API.OperationMethod<
  ListReceiptFiltersRequest,
  ListReceiptFiltersResponse,
  ListReceiptFiltersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(928, __c58, 0) as any as S.Schema<ListReceiptFiltersRequest>,
  output: __S(930, __c58, 2) as any as S.Schema<ListReceiptFiltersResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReceiptFilters",
}));

export type ListReceiptRuleSetsError = CommonErrors;
/**
 * Lists the receipt rule sets that exist under your Amazon Web Services account in the current
 * Amazon Web Services Region. If there are additional receipt rule sets to be retrieved, you receive a
 * `NextToken` that you can provide to the next call to
 * `ListReceiptRuleSets` to retrieve the additional entries.
 *
 * For information about managing receipt rule sets, see the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const listReceiptRuleSets: API.OperationMethod<
  ListReceiptRuleSetsRequest,
  ListReceiptRuleSetsResponse,
  ListReceiptRuleSetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(944, __c59, 0) as any as S.Schema<ListReceiptRuleSetsRequest>,
  output: __S(946, __c59, 2) as any as S.Schema<ListReceiptRuleSetsResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReceiptRuleSets",
}));

export type ListTemplatesError = CommonErrors;
/**
 * Lists the email templates present in your Amazon SES account in the current
 * Amazon Web Services Region.
 *
 * You can execute this operation no more than once per second.
 */
export const listTemplates: API.OperationMethod<
  ListTemplatesRequest,
  ListTemplatesResponse,
  ListTemplatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(960, __c60, 0) as any as S.Schema<ListTemplatesRequest>,
  output: __S(963, __c60, 3) as any as S.Schema<ListTemplatesResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTemplates",
}));

export type ListVerifiedEmailAddressesError = CommonErrors;
/**
 * Deprecated. Use the `ListIdentities` operation to list the email addresses
 * and domains associated with your account.
 */
export const listVerifiedEmailAddresses: API.OperationMethod<
  ListVerifiedEmailAddressesRequest,
  ListVerifiedEmailAddressesResponse,
  ListVerifiedEmailAddressesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(976, __c61, 0) as any as S.Schema<ListVerifiedEmailAddressesRequest>,
  output: __S(977, __c61, 1) as any as S.Schema<ListVerifiedEmailAddressesResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVerifiedEmailAddresses",
}));

export type PutConfigurationSetDeliveryOptionsError =
  | ConfigurationSetDoesNotExistException
  | InvalidDeliveryOptionsException
  | CommonErrors;
/**
 * Adds or updates the delivery options for a configuration set.
 */
export const putConfigurationSetDeliveryOptions: API.OperationMethod<
  PutConfigurationSetDeliveryOptionsRequest,
  PutConfigurationSetDeliveryOptionsResponse,
  PutConfigurationSetDeliveryOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1008, __c63, 0) as any as S.Schema<PutConfigurationSetDeliveryOptionsRequest>,
  output: __S(1009, __c63, 1) as any as S.Schema<PutConfigurationSetDeliveryOptionsResponse>,
  errors: [ConfigurationSetDoesNotExistException, InvalidDeliveryOptionsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutConfigurationSetDeliveryOptions",
}));

export type PutIdentityPolicyError = InvalidPolicyException | CommonErrors;
/**
 * Adds or updates a sending authorization policy for the specified identity (an email
 * address or a domain).
 *
 * This operation is for the identity owner only. If you have not verified the
 * identity, it returns an error.
 *
 * Sending authorization is a feature that enables an identity owner to authorize other
 * senders to use its identities. For information about using sending authorization, see
 * the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const putIdentityPolicy: API.OperationMethod<
  PutIdentityPolicyRequest,
  PutIdentityPolicyResponse,
  PutIdentityPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1024, __c64, 0) as any as S.Schema<PutIdentityPolicyRequest>,
  output: __S(1025, __c64, 1) as any as S.Schema<PutIdentityPolicyResponse>,
  errors: [InvalidPolicyException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutIdentityPolicy",
}));

export type ReorderReceiptRuleSetError =
  | RuleDoesNotExistException
  | RuleSetDoesNotExistException
  | CommonErrors;
/**
 * Reorders the receipt rules within a receipt rule set.
 *
 * All of the rules in the rule set must be represented in this request. That is, it
 * is error if the reorder request doesn't explicitly position all of the rules.
 *
 * For information about managing receipt rule sets, see the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const reorderReceiptRuleSet: API.OperationMethod<
  ReorderReceiptRuleSetRequest,
  ReorderReceiptRuleSetResponse,
  ReorderReceiptRuleSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1041, __c65, 1) as any as S.Schema<ReorderReceiptRuleSetRequest>,
  output: __S(1042, __c65, 2) as any as S.Schema<ReorderReceiptRuleSetResponse>,
  errors: [RuleDoesNotExistException, RuleSetDoesNotExistException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ReorderReceiptRuleSet",
}));

export type SendBounceError = MessageRejected | CommonErrors;
/**
 * Generates and sends a bounce message to the sender of an email you received through
 * Amazon SES. You can only use this operation on an email up to 24 hours after you receive
 * it.
 *
 * You cannot use this operation to send generic bounces for mail that was not
 * received by Amazon SES.
 *
 * For information about receiving email through Amazon SES, see the Amazon SES Developer
 * Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const sendBounce: API.OperationMethod<
  SendBounceRequest,
  SendBounceResponse,
  SendBounceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1062, __c66, 6) as any as S.Schema<SendBounceRequest>,
  output: __S(1063, __c66, 7) as any as S.Schema<SendBounceResponse>,
  errors: [MessageRejected],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendBounce",
}));

export type SendBulkTemplatedEmailError =
  | AccountSendingPausedException
  | ConfigurationSetDoesNotExistException
  | ConfigurationSetSendingPausedException
  | MailFromDomainNotVerifiedException
  | MessageRejected
  | TemplateDoesNotExistException
  | CommonErrors;
/**
 * Composes an email message to multiple destinations. The message body is created using
 * an email template.
 *
 * To send email using this operation, your call must meet the following
 * requirements:
 *
 * - The call must refer to an existing email template. You can create email
 * templates using CreateTemplate.
 *
 * - The message must be sent from a verified email address or domain.
 *
 * - If your account is still in the Amazon SES sandbox, you may send only to verified
 * addresses or domains, or to email addresses associated with the Amazon SES Mailbox
 * Simulator. For more information, see Verifying Email
 * Addresses and Domains in the Amazon SES Developer
 * Guide.
 *
 * - The maximum message size is 10 MB.
 *
 * - Each `Destination` parameter must include at least one recipient
 * email address. The recipient address can be a To: address, a CC: address, or a
 * BCC: address. If a recipient email address is invalid (that is, it is not in the
 * format *UserName@[SubDomain.]Domain.TopLevelDomain*), the
 * entire message is rejected, even if the message contains other recipients that
 * are valid.
 *
 * - The message may not include more than 50 recipients, across the To:, CC: and
 * BCC: fields. If you need to send an email message to a larger audience, you can
 * divide your recipient list into groups of 50 or fewer, and then call the
 * `SendBulkTemplatedEmail` operation several times to send the
 * message to each group.
 *
 * - The number of destinations you can contact in a single call can be limited by
 * your account's maximum sending rate.
 */
export const sendBulkTemplatedEmail: API.OperationMethod<
  SendBulkTemplatedEmailRequest,
  SendBulkTemplatedEmailResponse,
  SendBulkTemplatedEmailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1074, __c67, 2) as any as S.Schema<SendBulkTemplatedEmailRequest>,
  output: __S(1077, __c67, 5) as any as S.Schema<SendBulkTemplatedEmailResponse>,
  errors: [
    AccountSendingPausedException,
    ConfigurationSetDoesNotExistException,
    ConfigurationSetSendingPausedException,
    MailFromDomainNotVerifiedException,
    MessageRejected,
    TemplateDoesNotExistException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendBulkTemplatedEmail",
}));

export type SendCustomVerificationEmailError =
  | ConfigurationSetDoesNotExistException
  | CustomVerificationEmailTemplateDoesNotExistException
  | FromEmailAddressNotVerifiedException
  | MessageRejected
  | ProductionAccessNotGrantedException
  | CommonErrors;
/**
 * Adds an email address to the list of identities for your Amazon SES account in the current
 * Amazon Web Services Region and attempts to verify it. As a result of executing this operation, a
 * customized verification email is sent to the specified address.
 *
 * To use this operation, you must first create a custom verification email template. For
 * more information about creating and using custom verification email templates, see
 * Using
 * Custom Verification Email Templates in the Amazon SES Developer
 * Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const sendCustomVerificationEmail: API.OperationMethod<
  SendCustomVerificationEmailRequest,
  SendCustomVerificationEmailResponse,
  SendCustomVerificationEmailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1120, __c70, 0) as any as S.Schema<SendCustomVerificationEmailRequest>,
  output: __S(1121, __c70, 1) as any as S.Schema<SendCustomVerificationEmailResponse>,
  errors: [
    ConfigurationSetDoesNotExistException,
    CustomVerificationEmailTemplateDoesNotExistException,
    FromEmailAddressNotVerifiedException,
    MessageRejected,
    ProductionAccessNotGrantedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendCustomVerificationEmail",
}));

export type SendEmailError =
  | AccountSendingPausedException
  | ConfigurationSetDoesNotExistException
  | ConfigurationSetSendingPausedException
  | MailFromDomainNotVerifiedException
  | MessageRejected
  | CommonErrors;
/**
 * Composes an email message and immediately queues it for sending. To send email using
 * this operation, your message must meet the following requirements:
 *
 * - The message must be sent from a verified email address or domain. If you
 * attempt to send email using a non-verified address or domain, the operation
 * results in an "Email address not verified" error.
 *
 * - If your account is still in the Amazon SES sandbox, you may only send to verified
 * addresses or domains, or to email addresses associated with the Amazon SES Mailbox
 * Simulator. For more information, see Verifying Email
 * Addresses and Domains in the Amazon SES Developer
 * Guide.
 *
 * - The maximum message size is 10 MB.
 *
 * - The message must include at least one recipient email address. The recipient
 * address can be a To: address, a CC: address, or a BCC: address. If a recipient
 * email address is invalid (that is, it is not in the format
 * *UserName@[SubDomain.]Domain.TopLevelDomain*), the entire
 * message is rejected, even if the message contains other recipients that are
 * valid.
 *
 * - The message may not include more than 50 recipients, across the To:, CC: and
 * BCC: fields. If you need to send an email message to a larger audience, you can
 * divide your recipient list into groups of 50 or fewer, and then call the
 * `SendEmail` operation several times to send the message to each
 * group.
 *
 * For every message that you send, the total number of recipients (including each
 * recipient in the To:, CC: and BCC: fields) is counted against the maximum number of
 * emails you can send in a 24-hour period (your *sending quota*).
 * For more information about sending quotas in Amazon SES, see Managing Your Amazon SES Sending
 * Limits in the *Amazon SES Developer Guide.*
 */
export const sendEmail: API.OperationMethod<
  SendEmailRequest,
  SendEmailResponse,
  SendEmailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1139, __c71, 3) as any as S.Schema<SendEmailRequest>,
  output: __S(1140, __c71, 4) as any as S.Schema<SendEmailResponse>,
  errors: [
    AccountSendingPausedException,
    ConfigurationSetDoesNotExistException,
    ConfigurationSetSendingPausedException,
    MailFromDomainNotVerifiedException,
    MessageRejected,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendEmail",
}));

export type SendRawEmailError =
  | AccountSendingPausedException
  | ConfigurationSetDoesNotExistException
  | ConfigurationSetSendingPausedException
  | MailFromDomainNotVerifiedException
  | MessageRejected
  | CommonErrors;
/**
 * Composes an email message and immediately queues it for sending.
 *
 * This operation is more flexible than the `SendEmail` operation. When you
 * use the `SendRawEmail` operation, you can specify the headers of the message
 * as well as its content. This flexibility is useful, for example, when you need to send a
 * multipart MIME email (such a message that contains both a text and an HTML version). You
 * can also use this operation to send messages that include attachments.
 *
 * The `SendRawEmail` operation has the following requirements:
 *
 * - You can only send email from verified email addresses or domains. If you try to send email from
 * an address that isn't verified, the operation results in an "Email address not
 * verified" error.
 *
 * - If your account is still in the Amazon SES sandbox, you can only send email to other verified addresses
 * in your account, or to addresses that are associated with the Amazon SES mailbox simulator.
 *
 * - The maximum message size, including attachments, is 10 MB.
 *
 * - Each message has to include at least one recipient address. A recipient
 * address includes any address on the To:, CC:, or BCC: lines.
 *
 * - If you send a single message to more than one recipient address, and one of
 * the recipient addresses isn't in a valid format (that is, it's not in the format
 * *UserName@[SubDomain.]Domain.TopLevelDomain*), Amazon SES
 * rejects the entire message, even if the other addresses are valid.
 *
 * - Each message can include up to 50 recipient addresses across the To:, CC:, or
 * BCC: lines. If you need to send a single message to more than 50 recipients, you
 * have to split the list of recipient addresses into groups of less than 50
 * recipients, and send separate messages to each group.
 *
 * - Amazon SES allows you to specify 8-bit Content-Transfer-Encoding for MIME message
 * parts. However, if Amazon SES has to modify the contents of your message (for
 * example, if you use open and click tracking), 8-bit content isn't preserved. For
 * this reason, we highly recommend that you encode all content that isn't 7-bit
 * ASCII. For more information, see MIME Encoding in the Amazon SES Developer
 * Guide.
 *
 * Additionally, keep the following considerations in mind when using the
 * `SendRawEmail` operation:
 *
 * - Although you can customize the message headers when using the
 * `SendRawEmail` operation, Amazon SES automatically applies its own
 * `Message-ID` and `Date` headers; if you passed these
 * headers when creating the message, they are overwritten by the values that Amazon SES
 * provides.
 *
 * - If you are using sending authorization to send on behalf of another user,
 * `SendRawEmail` enables you to specify the cross-account identity
 * for the email's Source, From, and Return-Path parameters in one of two ways: you
 * can pass optional parameters `SourceArn`, `FromArn`,
 * and/or `ReturnPathArn`, or you can include the following X-headers in
 * the header of your raw email:
 *
 * - `X-SES-SOURCE-ARN`
 *
 * - `X-SES-FROM-ARN`
 *
 * - `X-SES-RETURN-PATH-ARN`
 *
 * Don't include these X-headers in the DKIM signature. Amazon SES removes these
 * before it sends the email.
 *
 * If you only specify the `SourceIdentityArn` parameter, Amazon SES sets
 * the From and Return-Path addresses to the same identity that you
 * specified.
 *
 * For more information about sending authorization, see the Using
 * Sending Authorization with Amazon SES in the Amazon SES Developer
 * Guide.
 *
 * - For every message that you send, the total number of recipients (including
 * each recipient in the To:, CC: and BCC: fields) is counted against the maximum
 * number of emails you can send in a 24-hour period (your sending
 * quota). For more information about sending quotas in Amazon SES, see
 * Managing Your Amazon SES Sending Limits in the Amazon SES Developer
 * Guide.
 */
export const sendRawEmail: API.OperationMethod<
  SendRawEmailRequest,
  SendRawEmailResponse,
  SendRawEmailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1153, __c72, 1) as any as S.Schema<SendRawEmailRequest>,
  output: __S(1154, __c72, 2) as any as S.Schema<SendRawEmailResponse>,
  errors: [
    AccountSendingPausedException,
    ConfigurationSetDoesNotExistException,
    ConfigurationSetSendingPausedException,
    MailFromDomainNotVerifiedException,
    MessageRejected,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendRawEmail",
}));

export type SendTemplatedEmailError =
  | AccountSendingPausedException
  | ConfigurationSetDoesNotExistException
  | ConfigurationSetSendingPausedException
  | MailFromDomainNotVerifiedException
  | MessageRejected
  | TemplateDoesNotExistException
  | CommonErrors;
/**
 * Composes an email message using an email template and immediately queues it for
 * sending.
 *
 * To send email using this operation, your call must meet the following
 * requirements:
 *
 * - The call must refer to an existing email template. You can create email
 * templates using the CreateTemplate operation.
 *
 * - The message must be sent from a verified email address or domain.
 *
 * - If your account is still in the Amazon SES sandbox, you may only send to verified
 * addresses or domains, or to email addresses associated with the Amazon SES Mailbox
 * Simulator. For more information, see Verifying Email
 * Addresses and Domains in the Amazon SES Developer
 * Guide.
 *
 * - The maximum message size is 10 MB.
 *
 * - Calls to the `SendTemplatedEmail` operation may only include one
 * `Destination` parameter. A destination is a set of recipients
 * that receives the same version of the email. The `Destination`
 * parameter can include up to 50 recipients, across the To:, CC: and BCC:
 * fields.
 *
 * - The `Destination` parameter must include at least one recipient
 * email address. The recipient address can be a To: address, a CC: address, or a
 * BCC: address. If a recipient email address is invalid (that is, it is not in the
 * format *UserName@[SubDomain.]Domain.TopLevelDomain*), the
 * entire message is rejected, even if the message contains other recipients that
 * are valid.
 *
 * If your call to the `SendTemplatedEmail` operation includes all of the
 * required parameters, Amazon SES accepts it and returns a Message ID. However, if Amazon SES
 * can't render the email because the template contains errors, it doesn't send the
 * email. Additionally, because it already accepted the message, Amazon SES doesn't return a
 * message stating that it was unable to send the email.
 *
 * For these reasons, we highly recommend that you set up Amazon SES to send you
 * notifications when Rendering Failure events occur. For more information, see Sending Personalized Email Using the Amazon SES API in the
 * *Amazon Simple Email Service Developer Guide*.
 */
export const sendTemplatedEmail: API.OperationMethod<
  SendTemplatedEmailRequest,
  SendTemplatedEmailResponse,
  SendTemplatedEmailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1168, __c73, 0) as any as S.Schema<SendTemplatedEmailRequest>,
  output: __S(1169, __c73, 1) as any as S.Schema<SendTemplatedEmailResponse>,
  errors: [
    AccountSendingPausedException,
    ConfigurationSetDoesNotExistException,
    ConfigurationSetSendingPausedException,
    MailFromDomainNotVerifiedException,
    MessageRejected,
    TemplateDoesNotExistException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendTemplatedEmail",
}));

export type SetActiveReceiptRuleSetError = RuleSetDoesNotExistException | CommonErrors;
/**
 * Sets the specified receipt rule set as the active receipt rule set.
 *
 * To disable your email-receiving through Amazon SES completely, you can call this
 * operation with `RuleSetName` set to null.
 *
 * For information about managing receipt rule sets, see the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const setActiveReceiptRuleSet: API.OperationMethod<
  SetActiveReceiptRuleSetRequest,
  SetActiveReceiptRuleSetResponse,
  SetActiveReceiptRuleSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1184, __c74, 0) as any as S.Schema<SetActiveReceiptRuleSetRequest>,
  output: __S(1185, __c74, 1) as any as S.Schema<SetActiveReceiptRuleSetResponse>,
  errors: [RuleSetDoesNotExistException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetActiveReceiptRuleSet",
}));

export type SetIdentityDkimEnabledError = CommonErrors;
/**
 * Enables or disables Easy DKIM signing of email sent from an identity. If Easy DKIM
 * signing is enabled for a domain, then Amazon SES uses DKIM to sign all email that it sends
 * from addresses on that domain. If Easy DKIM signing is enabled for an email address,
 * then Amazon SES uses DKIM to sign all email it sends from that address.
 *
 * For email addresses (for example, `user@example.com`), you can only
 * enable DKIM signing if the corresponding domain (in this case,
 * `example.com`) has been set up to use Easy DKIM.
 *
 * You can enable DKIM signing for an identity at any time after you start the
 * verification process for the identity, even if the verification process isn't complete.
 *
 * You can execute this operation no more than once per second.
 *
 * For more information about Easy DKIM signing, go to the Amazon SES Developer
 * Guide.
 */
export const setIdentityDkimEnabled: API.OperationMethod<
  SetIdentityDkimEnabledRequest,
  SetIdentityDkimEnabledResponse,
  SetIdentityDkimEnabledError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1200, __c75, 0) as any as S.Schema<SetIdentityDkimEnabledRequest>,
  output: __S(1201, __c75, 1) as any as S.Schema<SetIdentityDkimEnabledResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetIdentityDkimEnabled",
}));

export type SetIdentityFeedbackForwardingEnabledError = CommonErrors;
/**
 * Given an identity (an email address or a domain), enables or disables whether Amazon SES
 * forwards bounce and complaint notifications as email. Feedback forwarding can only be
 * disabled when Amazon Simple Notification Service (Amazon SNS) topics are specified for both bounces and
 * complaints.
 *
 * Feedback forwarding does not apply to delivery notifications. Delivery
 * notifications are only available through Amazon SNS.
 *
 * You can execute this operation no more than once per second.
 *
 * For more information about using notifications with Amazon SES, see the Amazon SES
 * Developer Guide.
 */
export const setIdentityFeedbackForwardingEnabled: API.OperationMethod<
  SetIdentityFeedbackForwardingEnabledRequest,
  SetIdentityFeedbackForwardingEnabledResponse,
  SetIdentityFeedbackForwardingEnabledError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1216, __c76, 0) as any as S.Schema<SetIdentityFeedbackForwardingEnabledRequest>,
  output: __S(1217, __c76, 1) as any as S.Schema<SetIdentityFeedbackForwardingEnabledResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetIdentityFeedbackForwardingEnabled",
}));

export type SetIdentityHeadersInNotificationsEnabledError = CommonErrors;
/**
 * Given an identity (an email address or a domain), sets whether Amazon SES includes the
 * original email headers in the Amazon Simple Notification Service (Amazon SNS) notifications of a specified
 * type.
 *
 * You can execute this operation no more than once per second.
 *
 * For more information about using notifications with Amazon SES, see the Amazon SES
 * Developer Guide.
 */
export const setIdentityHeadersInNotificationsEnabled: API.OperationMethod<
  SetIdentityHeadersInNotificationsEnabledRequest,
  SetIdentityHeadersInNotificationsEnabledResponse,
  SetIdentityHeadersInNotificationsEnabledError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1232, __c77, 0) as any as S.Schema<SetIdentityHeadersInNotificationsEnabledRequest>,
  output: __S(1233, __c77, 1) as any as S.Schema<SetIdentityHeadersInNotificationsEnabledResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetIdentityHeadersInNotificationsEnabled",
}));

export type SetIdentityMailFromDomainError = CommonErrors;
/**
 * Enables or disables the custom MAIL FROM domain setup for a verified identity (an
 * email address or a domain).
 *
 * To send emails using the specified MAIL FROM domain, you must add an MX record to
 * your MAIL FROM domain's DNS settings. To ensure that your emails pass Sender Policy
 * Framework (SPF) checks, you must also add or update an SPF record. For more
 * information, see the Amazon SES Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const setIdentityMailFromDomain: API.OperationMethod<
  SetIdentityMailFromDomainRequest,
  SetIdentityMailFromDomainResponse,
  SetIdentityMailFromDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1248, __c78, 0) as any as S.Schema<SetIdentityMailFromDomainRequest>,
  output: __S(1249, __c78, 1) as any as S.Schema<SetIdentityMailFromDomainResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetIdentityMailFromDomain",
}));

export type SetIdentityNotificationTopicError = CommonErrors;
/**
 * Sets an Amazon Simple Notification Service (Amazon SNS) topic to use when delivering notifications. When you use
 * this operation, you specify a verified identity, such as an email address or domain.
 * When you send an email that uses the chosen identity in the Source field, Amazon SES sends
 * notifications to the topic you specified. You can send bounce, complaint, or delivery
 * notifications (or any combination of the three) to the Amazon SNS topic that you
 * specify.
 *
 * You can execute this operation no more than once per second.
 *
 * For more information about feedback notification, see the Amazon SES
 * Developer Guide.
 */
export const setIdentityNotificationTopic: API.OperationMethod<
  SetIdentityNotificationTopicRequest,
  SetIdentityNotificationTopicResponse,
  SetIdentityNotificationTopicError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1264, __c79, 0) as any as S.Schema<SetIdentityNotificationTopicRequest>,
  output: __S(1265, __c79, 1) as any as S.Schema<SetIdentityNotificationTopicResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetIdentityNotificationTopic",
}));

export type SetReceiptRulePositionError =
  | RuleDoesNotExistException
  | RuleSetDoesNotExistException
  | CommonErrors;
/**
 * Sets the position of the specified receipt rule in the receipt rule set.
 *
 * For information about managing receipt rules, see the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const setReceiptRulePosition: API.OperationMethod<
  SetReceiptRulePositionRequest,
  SetReceiptRulePositionResponse,
  SetReceiptRulePositionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1280, __c80, 0) as any as S.Schema<SetReceiptRulePositionRequest>,
  output: __S(1281, __c80, 1) as any as S.Schema<SetReceiptRulePositionResponse>,
  errors: [RuleDoesNotExistException, RuleSetDoesNotExistException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetReceiptRulePosition",
}));

export type TestRenderTemplateError =
  | InvalidRenderingParameterException
  | MissingRenderingAttributeException
  | TemplateDoesNotExistException
  | CommonErrors;
/**
 * Creates a preview of the MIME content of an email when provided with a template and a
 * set of replacement data.
 *
 * You can execute this operation no more than once per second.
 */
export const testRenderTemplate: API.OperationMethod<
  TestRenderTemplateRequest,
  TestRenderTemplateResponse,
  TestRenderTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1296, __c81, 0) as any as S.Schema<TestRenderTemplateRequest>,
  output: __S(1297, __c81, 1) as any as S.Schema<TestRenderTemplateResponse>,
  errors: [
    InvalidRenderingParameterException,
    MissingRenderingAttributeException,
    TemplateDoesNotExistException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestRenderTemplate",
}));

export type UpdateAccountSendingEnabledError = CommonErrors;
/**
 * Enables or disables email sending across your entire Amazon SES account in the current
 * Amazon Web Services Region. You can use this operation in conjunction with Amazon CloudWatch alarms to
 * temporarily pause email sending across your Amazon SES account in a given Amazon Web Services Region when
 * reputation metrics (such as your bounce or complaint rates) reach certain
 * thresholds.
 *
 * You can execute this operation no more than once per second.
 */
export const updateAccountSendingEnabled: API.OperationMethod<
  UpdateAccountSendingEnabledRequest,
  UpdateAccountSendingEnabledResponse,
  UpdateAccountSendingEnabledError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1312, __c82, 0) as any as S.Schema<UpdateAccountSendingEnabledRequest>,
  output: __S(1313, __c82, 1) as any as S.Schema<UpdateAccountSendingEnabledResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccountSendingEnabled",
}));

export type UpdateConfigurationSetEventDestinationError =
  | ConfigurationSetDoesNotExistException
  | EventDestinationDoesNotExistException
  | InvalidCloudWatchDestinationException
  | InvalidFirehoseDestinationException
  | InvalidSNSDestinationException
  | CommonErrors;
/**
 * Updates the event destination of a configuration set. Event destinations are
 * associated with configuration sets, which enable you to publish email sending events to
 * Amazon CloudWatch, Amazon Kinesis Firehose, or Amazon Simple Notification Service (Amazon SNS). For information about using configuration sets,
 * see Monitoring Your Amazon SES Sending Activity in the Amazon SES Developer
 * Guide.
 *
 * When you create or update an event destination, you must provide one, and only
 * one, destination. The destination can be Amazon CloudWatch, Amazon Kinesis Firehose, or Amazon Simple Notification Service
 * (Amazon SNS).
 *
 * You can execute this operation no more than once per second.
 */
export const updateConfigurationSetEventDestination: API.OperationMethod<
  UpdateConfigurationSetEventDestinationRequest,
  UpdateConfigurationSetEventDestinationResponse,
  UpdateConfigurationSetEventDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1328, __c83, 0) as any as S.Schema<UpdateConfigurationSetEventDestinationRequest>,
  output: __S(1329, __c83, 1) as any as S.Schema<UpdateConfigurationSetEventDestinationResponse>,
  errors: [
    ConfigurationSetDoesNotExistException,
    EventDestinationDoesNotExistException,
    InvalidCloudWatchDestinationException,
    InvalidFirehoseDestinationException,
    InvalidSNSDestinationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConfigurationSetEventDestination",
}));

export type UpdateConfigurationSetReputationMetricsEnabledError =
  | ConfigurationSetDoesNotExistException
  | CommonErrors;
/**
 * Enables or disables the publishing of reputation metrics for emails sent using a
 * specific configuration set in a given Amazon Web Services Region. Reputation metrics include bounce
 * and complaint rates. These metrics are published to Amazon CloudWatch. By using CloudWatch, you can
 * create alarms when bounce or complaint rates exceed certain thresholds.
 *
 * You can execute this operation no more than once per second.
 */
export const updateConfigurationSetReputationMetricsEnabled: API.OperationMethod<
  UpdateConfigurationSetReputationMetricsEnabledRequest,
  UpdateConfigurationSetReputationMetricsEnabledResponse,
  UpdateConfigurationSetReputationMetricsEnabledError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(
    1344,
    __c84,
    0,
  ) as any as S.Schema<UpdateConfigurationSetReputationMetricsEnabledRequest>,
  output: __S(
    1345,
    __c84,
    1,
  ) as any as S.Schema<UpdateConfigurationSetReputationMetricsEnabledResponse>,
  errors: [ConfigurationSetDoesNotExistException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConfigurationSetReputationMetricsEnabled",
}));

export type UpdateConfigurationSetSendingEnabledError =
  | ConfigurationSetDoesNotExistException
  | CommonErrors;
/**
 * Enables or disables email sending for messages sent using a specific configuration set
 * in a given Amazon Web Services Region. You can use this operation in conjunction with Amazon CloudWatch alarms
 * to temporarily pause email sending for a configuration set when the reputation metrics
 * for that configuration set (such as your bounce on complaint rate) exceed certain
 * thresholds.
 *
 * You can execute this operation no more than once per second.
 */
export const updateConfigurationSetSendingEnabled: API.OperationMethod<
  UpdateConfigurationSetSendingEnabledRequest,
  UpdateConfigurationSetSendingEnabledResponse,
  UpdateConfigurationSetSendingEnabledError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1360, __c85, 0) as any as S.Schema<UpdateConfigurationSetSendingEnabledRequest>,
  output: __S(1361, __c85, 1) as any as S.Schema<UpdateConfigurationSetSendingEnabledResponse>,
  errors: [ConfigurationSetDoesNotExistException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConfigurationSetSendingEnabled",
}));

export type UpdateConfigurationSetTrackingOptionsError =
  | ConfigurationSetDoesNotExistException
  | InvalidTrackingOptionsException
  | TrackingOptionsDoesNotExistException
  | CommonErrors;
/**
 * Modifies an association between a configuration set and a custom domain for open and
 * click event tracking.
 *
 * By default, images and links used for tracking open and click events are hosted on
 * domains operated by Amazon SES. You can configure a subdomain of your own to handle these
 * events. For information about using custom domains, see the Amazon SES Developer Guide.
 */
export const updateConfigurationSetTrackingOptions: API.OperationMethod<
  UpdateConfigurationSetTrackingOptionsRequest,
  UpdateConfigurationSetTrackingOptionsResponse,
  UpdateConfigurationSetTrackingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<UpdateConfigurationSetTrackingOptionsRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<UpdateConfigurationSetTrackingOptionsResponse>,
  errors: [
    ConfigurationSetDoesNotExistException,
    InvalidTrackingOptionsException,
    TrackingOptionsDoesNotExistException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConfigurationSetTrackingOptions",
}));

export type UpdateCustomVerificationEmailTemplateError =
  | CustomVerificationEmailInvalidContentException
  | CustomVerificationEmailTemplateDoesNotExistException
  | FromEmailAddressNotVerifiedException
  | CommonErrors;
/**
 * Updates an existing custom verification email template.
 *
 * For more information about custom verification email templates, see Using
 * Custom Verification Email Templates in the Amazon SES Developer
 * Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const updateCustomVerificationEmailTemplate: API.OperationMethod<
  UpdateCustomVerificationEmailTemplateRequest,
  UpdateCustomVerificationEmailTemplateResponse,
  UpdateCustomVerificationEmailTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(16, __c1, 0) as any as S.Schema<UpdateCustomVerificationEmailTemplateRequest>,
  output: __S(17, __c1, 1) as any as S.Schema<UpdateCustomVerificationEmailTemplateResponse>,
  errors: [
    CustomVerificationEmailInvalidContentException,
    CustomVerificationEmailTemplateDoesNotExistException,
    FromEmailAddressNotVerifiedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCustomVerificationEmailTemplate",
}));

export type UpdateReceiptRuleError =
  | InvalidLambdaFunctionException
  | InvalidS3ConfigurationException
  | InvalidSnsTopicException
  | LimitExceededException
  | RuleDoesNotExistException
  | RuleSetDoesNotExistException
  | InvalidParameterValue
  | IdentityNotVerified
  | ReceiptRuleRoleNotAssumable
  | CommonErrors;
/**
 * Updates a receipt rule.
 *
 * For information about managing receipt rules, see the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const updateReceiptRule: API.OperationMethod<
  UpdateReceiptRuleRequest,
  UpdateReceiptRuleResponse,
  UpdateReceiptRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c2, 0) as any as S.Schema<UpdateReceiptRuleRequest>,
  output: __S(33, __c2, 1) as any as S.Schema<UpdateReceiptRuleResponse>,
  errors: [
    InvalidLambdaFunctionException,
    InvalidS3ConfigurationException,
    InvalidSnsTopicException,
    LimitExceededException,
    RuleDoesNotExistException,
    RuleSetDoesNotExistException,
    InvalidParameterValue,
    IdentityNotVerified,
    ReceiptRuleRoleNotAssumable,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateReceiptRule",
}));

export type UpdateTemplateError =
  | InvalidTemplateException
  | TemplateDoesNotExistException
  | CommonErrors;
/**
 * Updates an email template. Email templates enable you to send personalized email to
 * one or more destinations in a single operation. For more information, see the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const updateTemplate: API.OperationMethod<
  UpdateTemplateRequest,
  UpdateTemplateResponse,
  UpdateTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c3, 0) as any as S.Schema<UpdateTemplateRequest>,
  output: __S(49, __c3, 1) as any as S.Schema<UpdateTemplateResponse>,
  errors: [InvalidTemplateException, TemplateDoesNotExistException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTemplate",
}));

export type VerifyDomainDkimError = CommonErrors;
/**
 * Returns a set of DKIM tokens for a domain identity.
 *
 * When you execute the `VerifyDomainDkim` operation, the domain that you
 * specify is added to the list of identities that are associated with your account.
 * This is true even if you haven't already associated the domain with your account by
 * using the `VerifyDomainIdentity` operation. However, you can't send email
 * from the domain until you either successfully verify
 * it or you successfully set up DKIM for
 * it.
 *
 * You use the tokens that are generated by this operation to create CNAME records. When
 * Amazon SES detects that you've added these records to the DNS configuration for a domain, you
 * can start sending email from that domain. You can start sending email even if you
 * haven't added the TXT record provided by the VerifyDomainIdentity operation to the DNS
 * configuration for your domain. All email that you send from the domain is authenticated
 * using DKIM.
 *
 * To create the CNAME records for DKIM authentication, use the following values:
 *
 * - **Name**:
 * *token*._domainkey.*example.com*
 *
 * - **Type**: CNAME
 *
 * - **Value**:
 * *token*.dkim.amazonses.com
 *
 * In the preceding example, replace *token* with one of the tokens
 * that are generated when you execute this operation. Replace
 * *example.com* with your domain. Repeat this process for each
 * token that's generated by this operation.
 *
 * You can execute this operation no more than once per second.
 */
export const verifyDomainDkim: API.OperationMethod<
  VerifyDomainDkimRequest,
  VerifyDomainDkimResponse,
  VerifyDomainDkimError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c4, 0) as any as S.Schema<VerifyDomainDkimRequest>,
  output: __S(65, __c4, 1) as any as S.Schema<VerifyDomainDkimResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "VerifyDomainDkim",
}));

export type VerifyDomainIdentityError = CommonErrors;
/**
 * Adds a domain to the list of identities for your Amazon SES account in the current
 * Amazon Web Services Region and attempts to verify it. For more information about verifying domains,
 * see Verifying Email Addresses and Domains in the Amazon SES Developer
 * Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const verifyDomainIdentity: API.OperationMethod<
  VerifyDomainIdentityRequest,
  VerifyDomainIdentityResponse,
  VerifyDomainIdentityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c5, 0) as any as S.Schema<VerifyDomainIdentityRequest>,
  output: __S(81, __c5, 1) as any as S.Schema<VerifyDomainIdentityResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "VerifyDomainIdentity",
}));

export type VerifyEmailAddressError = CommonErrors;
/**
 * Deprecated. Use the `VerifyEmailIdentity` operation to verify a new email
 * address.
 */
export const verifyEmailAddress: API.OperationMethod<
  VerifyEmailAddressRequest,
  VerifyEmailAddressResponse,
  VerifyEmailAddressError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c6, 0) as any as S.Schema<VerifyEmailAddressRequest>,
  output: __S(97, __c6, 1) as any as S.Schema<VerifyEmailAddressResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "VerifyEmailAddress",
}));

export type VerifyEmailIdentityError = CommonErrors;
/**
 * Adds an email address to the list of identities for your Amazon SES account in the current
 * Amazon Web Services Region and attempts to verify it. As a result of executing this operation, a
 * verification email is sent to the specified address.
 *
 * You can execute this operation no more than once per second.
 */
export const verifyEmailIdentity: API.OperationMethod<
  VerifyEmailIdentityRequest,
  VerifyEmailIdentityResponse,
  VerifyEmailIdentityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c7, 0) as any as S.Schema<VerifyEmailIdentityRequest>,
  output: __S(113, __c7, 1) as any as S.Schema<VerifyEmailIdentityResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "VerifyEmailIdentity",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConfigurationSetName: S.String, TrackingOptions: __S(224, __c14, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateConfigurationSetTrackingOptionsRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "UpdateConfigurationSetTrackingOptionsResponse",
      });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TemplateName: S.String,
          FromEmailAddress: S.optional(S.String),
          TemplateSubject: S.optional(S.String),
          TemplateContent: S.optional(S.String),
          SuccessRedirectionURL: S.optional(S.String),
          FailureRedirectionURL: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateCustomVerificationEmailTemplateRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "UpdateCustomVerificationEmailTemplateResponse",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RuleSetName: S.String, Rule: __S(315, __c19, 11) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateReceiptRuleRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "UpdateReceiptRuleResponse",
      });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Template: __S(352, __c22, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateTemplateRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "UpdateTemplateResponse",
      });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Domain: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "VerifyDomainDkimRequest" });
    case 1:
      return S.suspend(() => S.Struct({ DkimTokens: __S(704, __c44, 0) }).pipe(ns)).annotate({
        identifier: "VerifyDomainDkimResponse",
      });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Domain: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "VerifyDomainIdentityRequest" });
    case 1:
      return S.suspend(() => S.Struct({ VerificationToken: S.String }).pipe(ns)).annotate({
        identifier: "VerifyDomainIdentityResponse",
      });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EmailAddress: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "VerifyEmailAddressRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "VerifyEmailAddressResponse",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EmailAddress: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "VerifyEmailIdentityRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "VerifyEmailIdentityResponse",
      });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RuleSetName: S.String, OriginalRuleSetName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CloneReceiptRuleSetRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "CloneReceiptRuleSetResponse",
      });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConfigurationSet: __S(160, __c10, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateConfigurationSetRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "CreateConfigurationSetResponse",
      });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Name: S.String })).annotate({
        identifier: "ConfigurationSet",
      });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConfigurationSetName: S.String, EventDestination: __S(198, __c12, 6) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateConfigurationSetEventDestinationRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "CreateConfigurationSetEventDestinationResponse",
      });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({ IAMRoleARN: S.String, DeliveryStreamARN: S.String }),
      ).annotate({ identifier: "KinesisFirehoseDestination" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          DimensionName: S.String,
          DimensionValueSource: S.String,
          DefaultDimensionValue: S.String,
        }),
      ).annotate({ identifier: "CloudWatchDimensionConfiguration" });
    case 3:
      return S.Array(__S(194, __c12, 2));
    case 4:
      return S.suspend(() => S.Struct({ DimensionConfigurations: __S(195, __c12, 3) })).annotate({
        identifier: "CloudWatchDestination",
      });
    case 5:
      return S.suspend(() => S.Struct({ TopicARN: S.String })).annotate({
        identifier: "SNSDestination",
      });
    case 6:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Enabled: S.optional(S.Boolean),
          MatchingEventTypes: __S(192, __c12, 0),
          KinesisFirehoseDestination: S.optional(__S(193, __c12, 1)),
          CloudWatchDestination: S.optional(__S(196, __c12, 4)),
          SNSDestination: S.optional(__S(197, __c12, 5)),
        }),
      ).annotate({ identifier: "EventDestination" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConfigurationSetName: S.String, TrackingOptions: __S(224, __c14, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateConfigurationSetTrackingOptionsRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "CreateConfigurationSetTrackingOptionsResponse",
      });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ CustomRedirectDomain: S.optional(S.String) })).annotate({
        identifier: "TrackingOptions",
      });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TemplateName: S.String,
          FromEmailAddress: S.String,
          TemplateSubject: S.String,
          TemplateContent: S.String,
          SuccessRedirectionURL: S.String,
          FailureRedirectionURL: S.String,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateCustomVerificationEmailTemplateRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "CreateCustomVerificationEmailTemplateResponse",
      });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Filter: __S(273, __c17, 1) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateReceiptFilterRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "CreateReceiptFilterResponse",
      });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Policy: S.String, Cidr: S.String })).annotate({
        identifier: "ReceiptIpFilter",
      });
    case 1:
      return S.suspend(() => S.Struct({ Name: S.String, IpFilter: __S(272, __c17, 0) })).annotate({
        identifier: "ReceiptFilter",
      });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuleSetName: S.String,
          After: S.optional(S.String),
          Rule: __S(315, __c19, 11),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateReceiptRuleRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "CreateReceiptRuleResponse",
      });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          TopicArn: S.optional(S.String),
          BucketName: S.String,
          ObjectKeyPrefix: S.optional(S.String),
          KmsKeyArn: S.optional(S.String),
          IamRoleArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "S3Action" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          TopicArn: S.optional(S.String),
          SmtpReplyCode: S.String,
          StatusCode: S.optional(S.String),
          Message: S.String,
          Sender: S.String,
        }),
      ).annotate({ identifier: "BounceAction" });
    case 3:
      return S.suspend(() =>
        S.Struct({ TopicArn: S.optional(S.String), OrganizationArn: S.String }),
      ).annotate({ identifier: "WorkmailAction" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          TopicArn: S.optional(S.String),
          FunctionArn: S.String,
          InvocationType: S.optional(S.String),
        }),
      ).annotate({ identifier: "LambdaAction" });
    case 5:
      return S.suspend(() =>
        S.Struct({ Scope: S.String, TopicArn: S.optional(S.String) }),
      ).annotate({ identifier: "StopAction" });
    case 6:
      return S.suspend(() => S.Struct({ HeaderName: S.String, HeaderValue: S.String })).annotate({
        identifier: "AddHeaderAction",
      });
    case 7:
      return S.suspend(() =>
        S.Struct({ TopicArn: S.String, Encoding: S.optional(S.String) }),
      ).annotate({ identifier: "SNSAction" });
    case 8:
      return S.suspend(() => S.Struct({ InstanceARN: S.String, IAMRoleARN: S.String })).annotate({
        identifier: "ConnectAction",
      });
    case 9:
      return S.suspend(() =>
        S.Struct({
          S3Action: S.optional(__S(305, __c19, 1)),
          BounceAction: S.optional(__S(306, __c19, 2)),
          WorkmailAction: S.optional(__S(307, __c19, 3)),
          LambdaAction: S.optional(__S(308, __c19, 4)),
          StopAction: S.optional(__S(309, __c19, 5)),
          AddHeaderAction: S.optional(__S(310, __c19, 6)),
          SNSAction: S.optional(__S(311, __c19, 7)),
          ConnectAction: S.optional(__S(312, __c19, 8)),
        }),
      ).annotate({ identifier: "ReceiptAction" });
    case 10:
      return S.Array(__S(313, __c19, 9));
    case 11:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Enabled: S.optional(S.Boolean),
          TlsPolicy: S.optional(S.String),
          Recipients: S.optional(__S(304, __c19, 0)),
          Actions: S.optional(__S(314, __c19, 10)),
          ScanEnabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ReceiptRule" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RuleSetName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateReceiptRuleSetRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "CreateReceiptRuleSetResponse",
      });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Template: __S(352, __c22, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateTemplateRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "CreateTemplateResponse",
      });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TemplateName: S.String,
          SubjectPart: S.optional(S.String),
          TextPart: S.optional(S.String),
          HtmlPart: S.optional(S.String),
        }),
      ).annotate({ identifier: "Template" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConfigurationSetName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteConfigurationSetRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteConfigurationSetResponse",
      });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConfigurationSetName: S.String, EventDestinationName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteConfigurationSetEventDestinationRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteConfigurationSetEventDestinationResponse",
      });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConfigurationSetName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteConfigurationSetTrackingOptionsRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteConfigurationSetTrackingOptionsResponse",
      });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TemplateName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteCustomVerificationEmailTemplateRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteCustomVerificationEmailTemplateResponse",
      });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identity: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteIdentityRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteIdentityResponse",
      });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identity: S.String, PolicyName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteIdentityPolicyRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteIdentityPolicyResponse",
      });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FilterName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteReceiptFilterRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteReceiptFilterResponse",
      });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RuleSetName: S.String, RuleName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteReceiptRuleRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteReceiptRuleResponse",
      });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RuleSetName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteReceiptRuleSetRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteReceiptRuleSetResponse",
      });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TemplateName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteTemplateRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteTemplateResponse",
      });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EmailAddress: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteVerifiedEmailAddressRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteVerifiedEmailAddressResponse",
      });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeActiveReceiptRuleSetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Metadata: S.optional(__S(576, __c36, 0)),
          Rules: S.optional(__S(560, __c35, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeActiveReceiptRuleSetResponse" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(315, __c19, 11));
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          CreatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "ReceiptRuleSetMetadata" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          ConfigurationSetName: S.String,
          ConfigurationSetAttributeNames: S.optional(__S(592, __c37, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeConfigurationSetRequest" });
    case 2:
      return S.Array(__S(198, __c12, 6));
    case 3:
      return S.suspend(() =>
        S.Struct({
          SendingEnabled: S.optional(S.Boolean),
          ReputationMetricsEnabled: S.optional(S.Boolean),
          LastFreshStart: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "ReputationOptions" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          ConfigurationSet: S.optional(__S(160, __c10, 0)),
          EventDestinations: S.optional(__S(594, __c37, 2)),
          TrackingOptions: S.optional(__S(224, __c14, 0)),
          DeliveryOptions: S.optional(__S(608, __c38, 0)),
          ReputationOptions: S.optional(__S(595, __c37, 3)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeConfigurationSetResponse" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ TlsPolicy: S.optional(S.String) })).annotate({
        identifier: "DeliveryOptions",
      });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RuleSetName: S.String, RuleName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeReceiptRuleRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Rule: S.optional(__S(315, __c19, 11)) }).pipe(ns)).annotate(
        { identifier: "DescribeReceiptRuleResponse" },
      );
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RuleSetName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeReceiptRuleSetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Metadata: S.optional(__S(576, __c36, 0)),
          Rules: S.optional(__S(560, __c35, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeReceiptRuleSetResponse" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetAccountSendingEnabledRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Enabled: S.optional(S.Boolean) }).pipe(ns)).annotate({
        identifier: "GetAccountSendingEnabledResponse",
      });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TemplateName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetCustomVerificationEmailTemplateRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TemplateName: S.optional(S.String),
          FromEmailAddress: S.optional(S.String),
          TemplateSubject: S.optional(S.String),
          TemplateContent: S.optional(S.String),
          SuccessRedirectionURL: S.optional(S.String),
          FailureRedirectionURL: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetCustomVerificationEmailTemplateResponse" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identities: __S(720, __c45, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetIdentityDkimAttributesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DkimEnabled: S.Boolean,
          DkimVerificationStatus: S.String,
          DkimTokens: S.optional(__S(704, __c44, 0)),
        }),
      ).annotate({ identifier: "IdentityDkimAttributes" });
    case 2:
      return S.Record(S.String, /*@__PURE__*/ __S(689, __c43, 1).pipe(S.optional));
    case 3:
      return S.suspend(() => S.Struct({ DkimAttributes: __S(690, __c43, 2) }).pipe(ns)).annotate({
        identifier: "GetIdentityDkimAttributesResponse",
      });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identities: __S(720, __c45, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetIdentityMailFromDomainAttributesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          MailFromDomain: S.String,
          MailFromDomainStatus: S.String,
          BehaviorOnMXFailure: S.String,
        }),
      ).annotate({ identifier: "IdentityMailFromDomainAttributes" });
    case 2:
      return S.Record(S.String, /*@__PURE__*/ __S(737, __c46, 1).pipe(S.optional));
    case 3:
      return S.suspend(() =>
        S.Struct({ MailFromDomainAttributes: __S(738, __c46, 2) }).pipe(ns),
      ).annotate({ identifier: "GetIdentityMailFromDomainAttributesResponse" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identities: __S(720, __c45, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetIdentityNotificationAttributesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BounceTopic: S.String,
          ComplaintTopic: S.String,
          DeliveryTopic: S.String,
          ForwardingEnabled: S.Boolean,
          HeadersInBounceNotificationsEnabled: S.optional(S.Boolean),
          HeadersInComplaintNotificationsEnabled: S.optional(S.Boolean),
          HeadersInDeliveryNotificationsEnabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "IdentityNotificationAttributes" });
    case 2:
      return S.Record(S.String, /*@__PURE__*/ __S(753, __c47, 1).pipe(S.optional));
    case 3:
      return S.suspend(() =>
        S.Struct({ NotificationAttributes: __S(754, __c47, 2) }).pipe(ns),
      ).annotate({ identifier: "GetIdentityNotificationAttributesResponse" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identity: S.String, PolicyNames: __S(784, __c49, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetIdentityPoliciesRequest" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 2:
      return S.suspend(() => S.Struct({ Policies: __S(769, __c48, 1) }).pipe(ns)).annotate({
        identifier: "GetIdentityPoliciesResponse",
      });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identities: __S(720, __c45, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetIdentityVerificationAttributesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ VerificationStatus: S.String, VerificationToken: S.optional(S.String) }),
      ).annotate({ identifier: "IdentityVerificationAttributes" });
    case 2:
      return S.Record(S.String, /*@__PURE__*/ __S(801, __c50, 1).pipe(S.optional));
    case 3:
      return S.suspend(() =>
        S.Struct({ VerificationAttributes: __S(802, __c50, 2) }).pipe(ns),
      ).annotate({ identifier: "GetIdentityVerificationAttributesResponse" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetSendQuotaRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Max24HourSend: S.optional(S.Number),
          MaxSendRate: S.optional(S.Number),
          SentLast24Hours: S.optional(S.Number),
        }).pipe(ns),
      ).annotate({ identifier: "GetSendQuotaResponse" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetSendStatisticsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Timestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          DeliveryAttempts: S.optional(S.Number),
          Bounces: S.optional(S.Number),
          Complaints: S.optional(S.Number),
          Rejects: S.optional(S.Number),
        }),
      ).annotate({ identifier: "SendDataPoint" });
    case 2:
      return S.Array(__S(833, __c52, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ SendDataPoints: S.optional(__S(834, __c52, 2)) }).pipe(ns),
      ).annotate({ identifier: "GetSendStatisticsResponse" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TemplateName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetTemplateRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Template: S.optional(__S(352, __c22, 0)) }).pipe(ns),
      ).annotate({ identifier: "GetTemplateResponse" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), MaxItems: S.optional(S.Number) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListConfigurationSetsRequest" });
    case 1:
      return S.Array(__S(160, __c10, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ConfigurationSets: S.optional(__S(865, __c54, 1)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListConfigurationSetsResponse" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), MaxResults: S.optional(S.Number) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListCustomVerificationEmailTemplatesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TemplateName: S.optional(S.String),
          FromEmailAddress: S.optional(S.String),
          TemplateSubject: S.optional(S.String),
          SuccessRedirectionURL: S.optional(S.String),
          FailureRedirectionURL: S.optional(S.String),
        }),
      ).annotate({ identifier: "CustomVerificationEmailTemplate" });
    case 2:
      return S.Array(__S(881, __c55, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          CustomVerificationEmailTemplates: S.optional(__S(882, __c55, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListCustomVerificationEmailTemplatesResponse" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IdentityType: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxItems: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListIdentitiesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Identities: __S(720, __c45, 0), NextToken: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "ListIdentitiesResponse" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identity: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListIdentityPoliciesRequest" });
    case 1:
      return S.suspend(() => S.Struct({ PolicyNames: __S(784, __c49, 0) }).pipe(ns)).annotate({
        identifier: "ListIdentityPoliciesResponse",
      });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListReceiptFiltersRequest" });
    case 1:
      return S.Array(__S(273, __c17, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({ Filters: S.optional(__S(929, __c58, 1)) }).pipe(ns),
      ).annotate({ identifier: "ListReceiptFiltersResponse" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListReceiptRuleSetsRequest" });
    case 1:
      return S.Array(__S(576, __c36, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          RuleSets: S.optional(__S(945, __c59, 1)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListReceiptRuleSetsResponse" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), MaxItems: S.optional(S.Number) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTemplatesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          CreatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "TemplateMetadata" });
    case 2:
      return S.Array(__S(961, __c60, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          TemplatesMetadata: S.optional(__S(962, __c60, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListTemplatesResponse" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListVerifiedEmailAddressesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ VerifiedEmailAddresses: S.optional(__S(992, __c62, 0)) }).pipe(ns),
      ).annotate({ identifier: "ListVerifiedEmailAddressesResponse" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigurationSetName: S.String,
          DeliveryOptions: S.optional(__S(608, __c38, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutConfigurationSetDeliveryOptionsRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "PutConfigurationSetDeliveryOptionsResponse",
      });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identity: S.String, PolicyName: S.String, Policy: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutIdentityPolicyRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "PutIdentityPolicyResponse",
      });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({ RuleSetName: S.String, RuleNames: __S(1040, __c65, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ReorderReceiptRuleSetRequest" });
    case 2:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "ReorderReceiptRuleSetResponse",
      });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Name: S.String, Value: S.String })).annotate({
        identifier: "ExtensionField",
      });
    case 1:
      return S.Array(__S(1056, __c66, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ReportingMta: S.String,
          ArrivalDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          ExtensionFields: S.optional(__S(1057, __c66, 1)),
        }),
      ).annotate({ identifier: "MessageDsn" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          FinalRecipient: S.optional(S.String),
          Action: S.String,
          RemoteMta: S.optional(S.String),
          Status: S.String,
          DiagnosticCode: S.optional(S.String),
          LastAttemptDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          ExtensionFields: S.optional(__S(1057, __c66, 1)),
        }),
      ).annotate({ identifier: "RecipientDsnFields" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Recipient: S.String,
          RecipientArn: S.optional(S.String),
          BounceType: S.optional(S.String),
          RecipientDsnFields: S.optional(__S(1059, __c66, 3)),
        }),
      ).annotate({ identifier: "BouncedRecipientInfo" });
    case 5:
      return S.Array(__S(1060, __c66, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          OriginalMessageId: S.String,
          BounceSender: S.String,
          Explanation: S.optional(S.String),
          MessageDsn: S.optional(__S(1058, __c66, 2)),
          BouncedRecipientInfoList: __S(1061, __c66, 5),
          BounceSenderArn: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SendBounceRequest" });
    case 7:
      return S.suspend(() => S.Struct({ MessageId: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "SendBounceResponse",
      });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Destination: __S(1104, __c69, 0),
          ReplacementTags: S.optional(__S(1089, __c68, 1)),
          ReplacementTemplateData: S.optional(S.String),
        }),
      ).annotate({ identifier: "BulkEmailDestination" });
    case 1:
      return S.Array(__S(1072, __c67, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Source: S.String,
          SourceArn: S.optional(S.String),
          ReplyToAddresses: S.optional(__S(992, __c62, 0)),
          ReturnPath: S.optional(S.String),
          ReturnPathArn: S.optional(S.String),
          ConfigurationSetName: S.optional(S.String),
          DefaultTags: S.optional(__S(1089, __c68, 1)),
          Template: S.String,
          TemplateArn: S.optional(S.String),
          DefaultTemplateData: S.String,
          Destinations: __S(1073, __c67, 1),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SendBulkTemplatedEmailRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String),
          Error: S.optional(S.String),
          MessageId: S.optional(S.String),
        }),
      ).annotate({ identifier: "BulkEmailDestinationStatus" });
    case 4:
      return S.Array(__S(1075, __c67, 3));
    case 5:
      return S.suspend(() => S.Struct({ Status: __S(1076, __c67, 4) }).pipe(ns)).annotate({
        identifier: "SendBulkTemplatedEmailResponse",
      });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Name: S.String, Value: S.String })).annotate({
        identifier: "MessageTag",
      });
    case 1:
      return S.Array(__S(1088, __c68, 0));
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ToAddresses: S.optional(__S(992, __c62, 0)),
          CcAddresses: S.optional(__S(992, __c62, 0)),
          BccAddresses: S.optional(__S(992, __c62, 0)),
        }),
      ).annotate({ identifier: "Destination" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EmailAddress: S.String,
          TemplateName: S.String,
          ConfigurationSetName: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SendCustomVerificationEmailRequest" });
    case 1:
      return S.suspend(() => S.Struct({ MessageId: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "SendCustomVerificationEmailResponse",
      });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Data: S.String, Charset: S.optional(S.String) })).annotate({
        identifier: "Content",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ Text: S.optional(__S(1136, __c71, 0)), Html: S.optional(__S(1136, __c71, 0)) }),
      ).annotate({ identifier: "Body" });
    case 2:
      return S.suspend(() =>
        S.Struct({ Subject: __S(1136, __c71, 0), Body: __S(1137, __c71, 1) }),
      ).annotate({ identifier: "Message" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Source: S.String,
          Destination: __S(1104, __c69, 0),
          Message: __S(1138, __c71, 2),
          ReplyToAddresses: S.optional(__S(992, __c62, 0)),
          ReturnPath: S.optional(S.String),
          SourceArn: S.optional(S.String),
          ReturnPathArn: S.optional(S.String),
          Tags: S.optional(__S(1089, __c68, 1)),
          ConfigurationSetName: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SendEmailRequest" });
    case 4:
      return S.suspend(() => S.Struct({ MessageId: S.String }).pipe(ns)).annotate({
        identifier: "SendEmailResponse",
      });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Data: T.Blob })).annotate({ identifier: "RawMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Source: S.optional(S.String),
          Destinations: S.optional(__S(992, __c62, 0)),
          RawMessage: __S(1152, __c72, 0),
          FromArn: S.optional(S.String),
          SourceArn: S.optional(S.String),
          ReturnPathArn: S.optional(S.String),
          Tags: S.optional(__S(1089, __c68, 1)),
          ConfigurationSetName: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SendRawEmailRequest" });
    case 2:
      return S.suspend(() => S.Struct({ MessageId: S.String }).pipe(ns)).annotate({
        identifier: "SendRawEmailResponse",
      });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Source: S.String,
          Destination: __S(1104, __c69, 0),
          ReplyToAddresses: S.optional(__S(992, __c62, 0)),
          ReturnPath: S.optional(S.String),
          SourceArn: S.optional(S.String),
          ReturnPathArn: S.optional(S.String),
          Tags: S.optional(__S(1089, __c68, 1)),
          ConfigurationSetName: S.optional(S.String),
          Template: S.String,
          TemplateArn: S.optional(S.String),
          TemplateData: S.String,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SendTemplatedEmailRequest" });
    case 1:
      return S.suspend(() => S.Struct({ MessageId: S.String }).pipe(ns)).annotate({
        identifier: "SendTemplatedEmailResponse",
      });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RuleSetName: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "SetActiveReceiptRuleSetRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "SetActiveReceiptRuleSetResponse",
      });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identity: S.String, DkimEnabled: S.Boolean }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "SetIdentityDkimEnabledRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "SetIdentityDkimEnabledResponse",
      });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identity: S.String, ForwardingEnabled: S.Boolean }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "SetIdentityFeedbackForwardingEnabledRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "SetIdentityFeedbackForwardingEnabledResponse",
      });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identity: S.String, NotificationType: S.String, Enabled: S.Boolean }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "SetIdentityHeadersInNotificationsEnabledRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "SetIdentityHeadersInNotificationsEnabledResponse",
      });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Identity: S.String,
          MailFromDomain: S.optional(S.String),
          BehaviorOnMXFailure: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SetIdentityMailFromDomainRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "SetIdentityMailFromDomainResponse",
      });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Identity: S.String,
          NotificationType: S.String,
          SnsTopic: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SetIdentityNotificationTopicRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "SetIdentityNotificationTopicResponse",
      });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RuleSetName: S.String, RuleName: S.String, After: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "SetReceiptRulePositionRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "SetReceiptRulePositionResponse",
      });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TemplateName: S.String, TemplateData: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TestRenderTemplateRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ RenderedTemplate: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "TestRenderTemplateResponse" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Enabled: S.optional(S.Boolean) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateAccountSendingEnabledRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "UpdateAccountSendingEnabledResponse",
      });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConfigurationSetName: S.String, EventDestination: __S(198, __c12, 6) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateConfigurationSetEventDestinationRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "UpdateConfigurationSetEventDestinationResponse",
      });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConfigurationSetName: S.String, Enabled: S.Boolean }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateConfigurationSetReputationMetricsEnabledRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "UpdateConfigurationSetReputationMetricsEnabledResponse",
      });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConfigurationSetName: S.String, Enabled: S.Boolean }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateConfigurationSetSendingEnabledRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "UpdateConfigurationSetSendingEnabledResponse",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
