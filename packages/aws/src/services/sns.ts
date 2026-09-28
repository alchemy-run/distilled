import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
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
  sdkId: "SNS",
  target: "AmazonSimpleNotificationService",
  version: "2010-03-31",
  sigv4: "sns",
  protocol: awsQueryProtocol,
  xmlns: "http://sns.amazonaws.com/doc/2010-03-31/",
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
                `https://sns-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              if (Region === "us-gov-east-1") {
                return e("https://sns.us-gov-east-1.amazonaws.com");
              }
              if (Region === "us-gov-west-1") {
                return e("https://sns.us-gov-west-1.amazonaws.com");
              }
              return e(
                `https://sns-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://sns.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://sns.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AuthorizationErrorException
  extends /*@__PURE__*/ TE.TaggedError(
    "AuthorizationErrorException",
    ["AuthError"],
    { code: "AuthorizationError", status: 403 },
  )<{ readonly message?: string }> {}
export class BatchEntryIdsNotDistinctException
  extends /*@__PURE__*/ TE.TaggedError(
    "BatchEntryIdsNotDistinctException",
    ["BadRequestError"],
    { code: "BatchEntryIdsNotDistinct", status: 400 },
  )<{ readonly message?: string }> {}
export class BatchRequestTooLongException
  extends /*@__PURE__*/ TE.TaggedError(
    "BatchRequestTooLongException",
    ["BadRequestError"],
    { code: "BatchRequestTooLong", status: 400 },
  )<{ readonly message?: string }> {}
export class ConcurrentAccessException
  extends /*@__PURE__*/ TE.TaggedError(
    "ConcurrentAccessException",
    ["BadRequestError"],
    { code: "ConcurrentAccess", status: 400 },
  )<{ readonly message?: string }> {}
export class EmptyBatchRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "EmptyBatchRequestException",
    ["BadRequestError"],
    { code: "EmptyBatchRequest", status: 400 },
  )<{ readonly message?: string }> {}
export class EndpointDisabledException
  extends /*@__PURE__*/ TE.TaggedError(
    "EndpointDisabledException",
    ["BadRequestError"],
    { code: "EndpointDisabled", status: 400 },
  )<{ readonly message?: string }> {}
export class FilterPolicyLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "FilterPolicyLimitExceededException",
    ["AuthError"],
    { code: "FilterPolicyLimitExceeded", status: 403 },
  )<{ readonly message?: string }> {}
export class InternalErrorException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalErrorException",
    ["ServerError"],
    { code: "InternalError", status: 500 },
  )<{ readonly message?: string }> {}
export class InvalidBatchEntryIdException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidBatchEntryIdException",
    ["BadRequestError"],
    { code: "InvalidBatchEntryId", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidClientTokenId
  extends /*@__PURE__*/ TE.TaggedError("InvalidClientTokenId", ["AuthError"])<{
    readonly message?: string;
  }> {}
export class InvalidParameterException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidParameterException",
    ["BadRequestError"],
    { code: "InvalidParameter", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidParameterValueException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidParameterValueException",
    ["BadRequestError"],
    { code: "ParameterValueInvalid", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidSecurityException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidSecurityException",
    ["AuthError"],
    { code: "InvalidSecurity", status: 403 },
  )<{ readonly message?: string }> {}
export class InvalidStateException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidStateException",
    ["BadRequestError"],
    { code: "InvalidState", status: 400 },
  )<{ readonly message?: string }> {}
export class KMSAccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError(
    "KMSAccessDeniedException",
    ["BadRequestError", "AuthError"],
    { code: "KMSAccessDenied", status: 400 },
  )<{ readonly message?: string }> {}
export class KMSDisabledException
  extends /*@__PURE__*/ TE.TaggedError(
    "KMSDisabledException",
    ["BadRequestError"],
    { code: "KMSDisabled", status: 400 },
  )<{ readonly message?: string }> {}
export class KMSInvalidStateException
  extends /*@__PURE__*/ TE.TaggedError(
    "KMSInvalidStateException",
    ["BadRequestError"],
    { code: "KMSInvalidState", status: 400 },
  )<{ readonly message?: string }> {}
export class KMSNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "KMSNotFoundException",
    ["BadRequestError"],
    { code: "KMSNotFound", status: 400 },
  )<{ readonly message?: string }> {}
export class KMSOptInRequired
  extends /*@__PURE__*/ TE.TaggedError("KMSOptInRequired", ["AuthError"], {
    status: 403,
  })<{ readonly message?: string }> {}
export class KMSThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "KMSThrottlingException",
    ["BadRequestError"],
    { code: "KMSThrottling", status: 400 },
  )<{ readonly message?: string }> {}
export class NotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotFoundException",
    ["BadRequestError"],
    { code: "NotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class OptedOutException
  extends /*@__PURE__*/ TE.TaggedError(
    "OptedOutException",
    ["BadRequestError"],
    { code: "OptedOut", status: 400 },
  )<{ readonly message?: string }> {}
export class PlatformApplicationDisabledException
  extends /*@__PURE__*/ TE.TaggedError(
    "PlatformApplicationDisabledException",
    ["BadRequestError"],
    { code: "PlatformApplicationDisabled", status: 400 },
  )<{ readonly message?: string }> {}
export class ReplayLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ReplayLimitExceededException",
    ["AuthError"],
    { code: "ReplayLimitExceeded", status: 403 },
  )<{ readonly message?: string }> {}
export class RequestLimitExceeded
  extends /*@__PURE__*/ TE.TaggedError("RequestLimitExceeded", [
    "ThrottlingError",
  ])<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { code: "ResourceNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class StaleTagException
  extends /*@__PURE__*/ TE.TaggedError(
    "StaleTagException",
    ["BadRequestError"],
    { code: "StaleTag", status: 400 },
  )<{ readonly message?: string }> {}
export class SubscriptionLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "SubscriptionLimitExceededException",
    ["AuthError"],
    { code: "SubscriptionLimitExceeded", status: 403 },
  )<{ readonly message?: string }> {}
export class TagLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "TagLimitExceededException",
    ["BadRequestError"],
    { code: "TagLimitExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class TagPolicyException
  extends /*@__PURE__*/ TE.TaggedError(
    "TagPolicyException",
    ["BadRequestError"],
    { code: "TagPolicy", status: 400 },
  )<{ readonly message?: string }> {}
export class ThrottledException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottledException",
    ["ThrottlingError"],
    { code: "Throttled", status: 429 },
  )<{ readonly message?: string }> {}
export class TooManyEntriesInBatchRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyEntriesInBatchRequestException",
    ["BadRequestError"],
    { code: "TooManyEntriesInBatchRequest", status: 400 },
  )<{ readonly message?: string }> {}
export class TopicLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "TopicLimitExceededException",
    ["AuthError"],
    { code: "TopicLimitExceeded", status: 403 },
  )<{ readonly message?: string }> {}
export class UserErrorException
  extends /*@__PURE__*/ TE.TaggedError(
    "UserErrorException",
    ["BadRequestError"],
    { code: "UserError", status: 400 },
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export class VerificationException
  extends /*@__PURE__*/ TE.TaggedError("VerificationException")<{
    readonly message: string;
    readonly Status: string;
  }> {}
export type TopicARN = string;
export type Label = string;
export type Delegate = string;
export type DelegatesList = string[];
export type Action = string;
export type ActionsList = string[];
export interface AddPermissionInput {
  TopicArn: string;
  Label: string;
  AWSAccountId: string[];
  ActionName: string[];
}
export interface AddPermissionResponse {}
export type PhoneNumber = string | redacted.Redacted<string>;
export interface CheckIfPhoneNumberIsOptedOutInput {
  phoneNumber: string | redacted.Redacted<string>;
}
export interface CheckIfPhoneNumberIsOptedOutResponse {
  isOptedOut?: boolean;
}
export type Token = string;
export type AuthenticateOnUnsubscribe = string;
export interface ConfirmSubscriptionInput {
  TopicArn: string;
  Token: string;
  AuthenticateOnUnsubscribe?: string;
}
export type SubscriptionARN = string;
export interface ConfirmSubscriptionResponse {
  SubscriptionArn?: string;
}
export type MapStringToString = { [key: string]: string | undefined };
export interface CreatePlatformApplicationInput {
  Name: string;
  Platform: string;
  Attributes: { [key: string]: string | undefined };
}
export interface CreatePlatformApplicationResponse {
  PlatformApplicationArn?: string;
}
export interface CreatePlatformEndpointInput {
  PlatformApplicationArn: string;
  Token: string;
  CustomUserData?: string;
  Attributes?: { [key: string]: string | undefined };
}
export interface CreateEndpointResponse {
  EndpointArn?: string;
}
export type PhoneNumberString = string | redacted.Redacted<string>;
export type LanguageCodeString =
  | "en-US"
  | "en-GB"
  | "es-419"
  | "es-ES"
  | "de-DE"
  | "fr-CA"
  | "fr-FR"
  | "it-IT"
  | "ja-JP"
  | "pt-BR"
  | "kr-KR"
  | "zh-CN"
  | "zh-TW"
  | (string & {});
export interface CreateSMSSandboxPhoneNumberInput {
  PhoneNumber: string | redacted.Redacted<string>;
  LanguageCode?: LanguageCodeString;
}
export interface CreateSMSSandboxPhoneNumberResult {}
export type TopicName = string;
export type AttributeName = string;
export type AttributeValue = string;
export type TopicAttributesMap = { [key: string]: string | undefined };
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export interface CreateTopicInput {
  Name: string;
  Attributes?: { [key: string]: string | undefined };
  Tags?: Tag[];
  DataProtectionPolicy?: string;
}
export interface CreateTopicResponse {
  TopicArn?: string;
}
export interface DeleteEndpointInput {
  EndpointArn: string;
}
export interface DeleteEndpointResponse {}
export interface DeletePlatformApplicationInput {
  PlatformApplicationArn: string;
}
export interface DeletePlatformApplicationResponse {}
export interface DeleteSMSSandboxPhoneNumberInput {
  PhoneNumber: string | redacted.Redacted<string>;
}
export interface DeleteSMSSandboxPhoneNumberResult {}
export interface DeleteTopicInput {
  TopicArn: string;
}
export interface DeleteTopicResponse {}
export interface GetDataProtectionPolicyInput {
  ResourceArn: string;
}
export interface GetDataProtectionPolicyResponse {
  DataProtectionPolicy?: string;
}
export interface GetEndpointAttributesInput {
  EndpointArn: string;
}
export interface GetEndpointAttributesResponse {
  Attributes?: { [key: string]: string | undefined };
}
export interface GetPlatformApplicationAttributesInput {
  PlatformApplicationArn: string;
}
export interface GetPlatformApplicationAttributesResponse {
  Attributes?: { [key: string]: string | undefined };
}
export type ListString = string[];
export interface GetSMSAttributesInput {
  attributes?: string[];
}
export interface GetSMSAttributesResponse {
  attributes?: { [key: string]: string | undefined };
}
export interface GetSMSSandboxAccountStatusInput {}
export interface GetSMSSandboxAccountStatusResult {
  IsInSandbox: boolean;
}
export interface GetSubscriptionAttributesInput {
  SubscriptionArn: string;
}
export type SubscriptionAttributesMap = { [key: string]: string | undefined };
export interface GetSubscriptionAttributesResponse {
  Attributes?: { [key: string]: string | undefined };
}
export interface GetTopicAttributesInput {
  TopicArn: string;
}
export interface GetTopicAttributesResponse {
  Attributes?: { [key: string]: string | undefined };
}
export interface ListEndpointsByPlatformApplicationInput {
  PlatformApplicationArn: string;
  NextToken?: string;
}
export interface Endpoint {
  EndpointArn?: string;
  Attributes?: { [key: string]: string | undefined };
}
export type ListOfEndpoints = Endpoint[];
export interface ListEndpointsByPlatformApplicationResponse {
  Endpoints?: Endpoint[];
  NextToken?: string;
}
export type NextToken = string;
export type MaxItemsListOriginationNumbers = number;
export interface ListOriginationNumbersRequest {
  NextToken?: string;
  MaxResults?: number;
}
export type Iso2CountryCode = string;
export type RouteType =
  | "Transactional"
  | "Promotional"
  | "Premium"
  | (string & {});
export type NumberCapability = "SMS" | "MMS" | "VOICE" | (string & {});
export type NumberCapabilityList = NumberCapability[];
export interface PhoneNumberInformation {
  CreatedAt?: Date;
  PhoneNumber?: string | redacted.Redacted<string>;
  Status?: string;
  Iso2CountryCode?: string;
  RouteType?: RouteType;
  NumberCapabilities?: NumberCapability[];
}
export type PhoneNumberInformationList = PhoneNumberInformation[];
export interface ListOriginationNumbersResult {
  NextToken?: string;
  PhoneNumbers?: PhoneNumberInformation[];
}
export interface ListPhoneNumbersOptedOutInput {
  nextToken?: string;
}
export type PhoneNumberList = (string | redacted.Redacted<string>)[];
export interface ListPhoneNumbersOptedOutResponse {
  phoneNumbers?: (string | redacted.Redacted<string>)[];
  nextToken?: string;
}
export interface ListPlatformApplicationsInput {
  NextToken?: string;
}
export interface PlatformApplication {
  PlatformApplicationArn?: string;
  Attributes?: { [key: string]: string | undefined };
}
export type ListOfPlatformApplications = PlatformApplication[];
export interface ListPlatformApplicationsResponse {
  PlatformApplications?: PlatformApplication[];
  NextToken?: string;
}
export type MaxItems = number;
export interface ListSMSSandboxPhoneNumbersInput {
  NextToken?: string;
  MaxResults?: number;
}
export type SMSSandboxPhoneNumberVerificationStatus =
  | "Pending"
  | "Verified"
  | (string & {});
export interface SMSSandboxPhoneNumber {
  PhoneNumber?: string | redacted.Redacted<string>;
  Status?: SMSSandboxPhoneNumberVerificationStatus;
}
export type SMSSandboxPhoneNumberList = SMSSandboxPhoneNumber[];
export interface ListSMSSandboxPhoneNumbersResult {
  PhoneNumbers: SMSSandboxPhoneNumber[];
  NextToken?: string;
}
export interface ListSubscriptionsInput {
  NextToken?: string;
}
export type Account = string;
export type Protocol = string;
export type Endpoint2 = string;
export interface Subscription {
  SubscriptionArn?: string;
  Owner?: string;
  Protocol?: string;
  Endpoint?: string;
  TopicArn?: string;
}
export type SubscriptionsList = Subscription[];
export interface ListSubscriptionsResponse {
  Subscriptions?: Subscription[];
  NextToken?: string;
}
export interface ListSubscriptionsByTopicInput {
  TopicArn: string;
  NextToken?: string;
}
export interface ListSubscriptionsByTopicResponse {
  Subscriptions?: Subscription[];
  NextToken?: string;
}
export type AmazonResourceName = string;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export interface ListTopicsInput {
  NextToken?: string;
}
export interface Topic {
  TopicArn?: string;
}
export type TopicsList = Topic[];
export interface ListTopicsResponse {
  Topics?: Topic[];
  NextToken?: string;
}
export interface OptInPhoneNumberInput {
  phoneNumber: string | redacted.Redacted<string>;
}
export interface OptInPhoneNumberResponse {}
export type Message = string;
export type Subject = string;
export type MessageStructure = string;
export type Binary = Uint8Array;
export interface MessageAttributeValue {
  DataType: string;
  StringValue?: string;
  BinaryValue?: Uint8Array;
}
export type MessageAttributeMap = {
  [key: string]: MessageAttributeValue | undefined;
};
export interface PublishInput {
  TopicArn?: string;
  TargetArn?: string;
  PhoneNumber?: string | redacted.Redacted<string>;
  Message: string;
  Subject?: string;
  MessageStructure?: string;
  MessageAttributes?: { [key: string]: MessageAttributeValue | undefined };
  MessageDeduplicationId?: string;
  MessageGroupId?: string;
}
export type MessageId = string;
export interface PublishResponse {
  MessageId?: string;
  SequenceNumber?: string;
}
export interface PublishBatchRequestEntry {
  Id: string;
  Message: string;
  Subject?: string;
  MessageStructure?: string;
  MessageAttributes?: { [key: string]: MessageAttributeValue | undefined };
  MessageDeduplicationId?: string;
  MessageGroupId?: string;
}
export type PublishBatchRequestEntryList = PublishBatchRequestEntry[];
export interface PublishBatchInput {
  TopicArn: string;
  PublishBatchRequestEntries: PublishBatchRequestEntry[];
}
export interface PublishBatchResultEntry {
  Id?: string;
  MessageId?: string;
  SequenceNumber?: string;
}
export type PublishBatchResultEntryList = PublishBatchResultEntry[];
export interface BatchResultErrorEntry {
  Id: string;
  Code: string;
  Message?: string;
  SenderFault: boolean;
}
export type BatchResultErrorEntryList = BatchResultErrorEntry[];
export interface PublishBatchResponse {
  Successful?: PublishBatchResultEntry[];
  Failed?: BatchResultErrorEntry[];
}
export interface PutDataProtectionPolicyInput {
  ResourceArn: string;
  DataProtectionPolicy: string;
}
export interface PutDataProtectionPolicyResponse {}
export interface RemovePermissionInput {
  TopicArn: string;
  Label: string;
}
export interface RemovePermissionResponse {}
export interface SetEndpointAttributesInput {
  EndpointArn: string;
  Attributes: { [key: string]: string | undefined };
}
export interface SetEndpointAttributesResponse {}
export interface SetPlatformApplicationAttributesInput {
  PlatformApplicationArn: string;
  Attributes: { [key: string]: string | undefined };
}
export interface SetPlatformApplicationAttributesResponse {}
export interface SetSMSAttributesInput {
  attributes: { [key: string]: string | undefined };
}
export interface SetSMSAttributesResponse {}
export interface SetSubscriptionAttributesInput {
  SubscriptionArn: string;
  AttributeName: string;
  AttributeValue?: string;
}
export interface SetSubscriptionAttributesResponse {}
export interface SetTopicAttributesInput {
  TopicArn: string;
  AttributeName: string;
  AttributeValue?: string;
}
export interface SetTopicAttributesResponse {}
export interface SubscribeInput {
  TopicArn: string;
  Protocol: string;
  Endpoint?: string;
  Attributes?: { [key: string]: string | undefined };
  ReturnSubscriptionArn?: boolean;
}
export interface SubscribeResponse {
  SubscriptionArn?: string;
}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: Tag[];
}
export interface TagResourceResponse {}
export interface UnsubscribeInput {
  SubscriptionArn: string;
}
export interface UnsubscribeResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export type OTPCode = string;
export interface VerifySMSSandboxPhoneNumberInput {
  PhoneNumber: string | redacted.Redacted<string>;
  OneTimePassword: string;
}
export interface VerifySMSSandboxPhoneNumberResult {}
export type AddPermissionError =
  | AuthorizationErrorException
  | InternalErrorException
  | InvalidParameterException
  | NotFoundException
  | RequestLimitExceeded
  | InvalidClientTokenId
  | CommonErrors;
/**
 * Adds a statement to a topic's access control policy, granting access for the specified
 * Amazon Web Services accounts to the specified actions.
 *
 * To remove the ability to change topic permissions, you must deny permissions to
 * the `AddPermission`, `RemovePermission`, and
 * `SetTopicAttributes` actions in your IAM policy.
 */
export const addPermission: API.OperationMethod<
  AddPermissionInput,
  AddPermissionResponse,
  AddPermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { TopicArn: 0, Label: 0, AWSAccountId: 0, ActionName: 0 },
  },
  errors: [
    AuthorizationErrorException,
    InternalErrorException,
    InvalidParameterException,
    NotFoundException,
    RequestLimitExceeded,
    InvalidClientTokenId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddPermission",
})) as any;

export type CheckIfPhoneNumberIsOptedOutError =
  | AuthorizationErrorException
  | InternalErrorException
  | InvalidParameterException
  | ThrottledException
  | CommonErrors;
/**
 * Accepts a phone number and indicates whether the phone holder has opted out of
 * receiving SMS messages from your Amazon Web Services account. You cannot send SMS messages to a number
 * that is opted out.
 *
 * To resume sending messages, you can opt in the number by using the
 * `OptInPhoneNumber` action.
 */
export const checkIfPhoneNumberIsOptedOut: API.OperationMethod<
  CheckIfPhoneNumberIsOptedOutInput,
  CheckIfPhoneNumberIsOptedOutResponse,
  CheckIfPhoneNumberIsOptedOutError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { phoneNumber: 0 },
    output: { isOptedOut: D.bool },
  },
  errors: [
    AuthorizationErrorException,
    InternalErrorException,
    InvalidParameterException,
    ThrottledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CheckIfPhoneNumberIsOptedOut",
})) as any;

export type ConfirmSubscriptionError =
  | AuthorizationErrorException
  | FilterPolicyLimitExceededException
  | InternalErrorException
  | InvalidParameterException
  | NotFoundException
  | ReplayLimitExceededException
  | SubscriptionLimitExceededException
  | CommonErrors;
/**
 * Verifies an endpoint owner's intent to receive messages by validating the token sent
 * to the endpoint by an earlier `Subscribe` action. If the token is valid, the
 * action creates a new subscription and returns its Amazon Resource Name (ARN). This call
 * requires an AWS signature only when the `AuthenticateOnUnsubscribe` flag is
 * set to "true".
 */
export const confirmSubscription: API.OperationMethod<
  ConfirmSubscriptionInput,
  ConfirmSubscriptionResponse,
  ConfirmSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { TopicArn: 0, Token: 0, AuthenticateOnUnsubscribe: 0 },
  },
  errors: [
    AuthorizationErrorException,
    FilterPolicyLimitExceededException,
    InternalErrorException,
    InvalidParameterException,
    NotFoundException,
    ReplayLimitExceededException,
    SubscriptionLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ConfirmSubscription",
})) as any;

export type CreatePlatformApplicationError =
  | AuthorizationErrorException
  | InternalErrorException
  | InvalidParameterException
  | CommonErrors;
/**
 * Creates a platform application object for one of the supported push notification
 * services, such as APNS and GCM (Firebase Cloud Messaging), to which devices and mobile
 * apps may register. You must specify `PlatformPrincipal` and
 * `PlatformCredential` attributes when using the
 * `CreatePlatformApplication` action.
 *
 * `PlatformPrincipal` and `PlatformCredential` are received from
 * the notification service.
 *
 * - For ADM, `PlatformPrincipal` is `client id` and
 * `PlatformCredential` is `client secret`.
 *
 * - For APNS and `APNS_SANDBOX` using certificate credentials,
 * `PlatformPrincipal` is `SSL certificate` and
 * `PlatformCredential` is `private key`.
 *
 * - For APNS and `APNS_SANDBOX` using token credentials,
 * `PlatformPrincipal` is `signing key ID` and
 * `PlatformCredential` is `signing key`.
 *
 * - For Baidu, `PlatformPrincipal` is `API key` and
 * `PlatformCredential` is `secret key`.
 *
 * - For GCM (Firebase Cloud Messaging) using key credentials, there is no
 * `PlatformPrincipal`. The `PlatformCredential` is
 * `API key`.
 *
 * - For GCM (Firebase Cloud Messaging) using token credentials, there is no
 * `PlatformPrincipal`. The `PlatformCredential` is a
 * JSON formatted private key file. When using the Amazon Web Services CLI or Amazon Web Services SDKs, the
 * file must be in string format and special characters must be ignored. To format
 * the file correctly, Amazon SNS recommends using the following command:
 * `SERVICE_JSON=$(jq @json Package Security
 * Identifier and `PlatformCredential` is secret
 * key.
 *
 * You can use the returned `PlatformApplicationArn` as an attribute for the
 * `CreatePlatformEndpoint` action.
 */
export const createPlatformApplication: API.OperationMethod<
  CreatePlatformApplicationInput,
  CreatePlatformApplicationResponse,
  CreatePlatformApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0, Platform: 0, Attributes: D.map() },
  },
  errors: [
    AuthorizationErrorException,
    InternalErrorException,
    InvalidParameterException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePlatformApplication",
})) as any;

export type CreatePlatformEndpointError =
  | AuthorizationErrorException
  | InternalErrorException
  | InvalidParameterException
  | NotFoundException
  | RequestLimitExceeded
  | InvalidClientTokenId
  | CommonErrors;
/**
 * Creates an endpoint for a device and mobile app on one of the supported push
 * notification services, such as GCM (Firebase Cloud Messaging) and APNS.
 * `CreatePlatformEndpoint` requires the `PlatformApplicationArn`
 * that is returned from `CreatePlatformApplication`. You can use the returned
 * `EndpointArn` to send a message to a mobile app or by the
 * `Subscribe` action for subscription to a topic. The
 * `CreatePlatformEndpoint` action is idempotent, so if the requester
 * already owns an endpoint with the same device token and attributes, that endpoint's ARN
 * is returned without creating a new endpoint. For more information, see Using Amazon SNS Mobile Push
 * Notifications.
 *
 * When using `CreatePlatformEndpoint` with Baidu, two attributes must be
 * provided: ChannelId and UserId. The token field must also contain the ChannelId. For
 * more information, see Creating an Amazon SNS Endpoint for
 * Baidu.
 */
export const createPlatformEndpoint: API.OperationMethod<
  CreatePlatformEndpointInput,
  CreateEndpointResponse,
  CreatePlatformEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      PlatformApplicationArn: 0,
      Token: 0,
      CustomUserData: 0,
      Attributes: D.map(),
    },
  },
  errors: [
    AuthorizationErrorException,
    InternalErrorException,
    InvalidParameterException,
    NotFoundException,
    RequestLimitExceeded,
    InvalidClientTokenId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePlatformEndpoint",
})) as any;

export type CreateSMSSandboxPhoneNumberError =
  | AuthorizationErrorException
  | InternalErrorException
  | InvalidParameterException
  | OptedOutException
  | ThrottledException
  | UserErrorException
  | CommonErrors;
/**
 * Adds a destination phone number to an Amazon Web Services account in the SMS sandbox and sends a
 * one-time password (OTP) to that phone number.
 *
 * When you start using Amazon SNS to send SMS messages, your Amazon Web Services account is in the
 * *SMS sandbox*. The SMS sandbox provides a safe environment for
 * you to try Amazon SNS features without risking your reputation as an SMS sender. While your
 * Amazon Web Services account is in the SMS sandbox, you can use all of the features of Amazon SNS. However, you can send
 * SMS messages only to verified destination phone numbers. For more information, including how to
 * move out of the sandbox to send messages without restrictions,
 * see SMS sandbox in
 * the *Amazon SNS Developer Guide*.
 */
export const createSMSSandboxPhoneNumber: API.OperationMethod<
  CreateSMSSandboxPhoneNumberInput,
  CreateSMSSandboxPhoneNumberResult,
  CreateSMSSandboxPhoneNumberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { PhoneNumber: 0, LanguageCode: 0 } },
  errors: [
    AuthorizationErrorException,
    InternalErrorException,
    InvalidParameterException,
    OptedOutException,
    ThrottledException,
    UserErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSMSSandboxPhoneNumber",
})) as any;

export type CreateTopicError =
  | AuthorizationErrorException
  | ConcurrentAccessException
  | InternalErrorException
  | InvalidParameterException
  | InvalidSecurityException
  | StaleTagException
  | TagLimitExceededException
  | TagPolicyException
  | TopicLimitExceededException
  | CommonErrors;
/**
 * Creates a topic to which notifications can be published. Users can create at most
 * 100,000 standard topics (at most 1,000 FIFO topics). For more information, see Creating an Amazon SNS
 * topic in the *Amazon SNS Developer Guide*. This action is
 * idempotent, so if the requester already owns a topic with the specified name, that
 * topic's ARN is returned without creating a new topic.
 */
export const createTopic: API.OperationMethod<
  CreateTopicInput,
  CreateTopicResponse,
  CreateTopicError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Attributes: D.map(),
      Tags: D.list(i_Tag),
      DataProtectionPolicy: 0,
    },
  },
  errors: [
    AuthorizationErrorException,
    ConcurrentAccessException,
    InternalErrorException,
    InvalidParameterException,
    InvalidSecurityException,
    StaleTagException,
    TagLimitExceededException,
    TagPolicyException,
    TopicLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTopic",
})) as any;

export type DeleteEndpointError =
  | AuthorizationErrorException
  | InternalErrorException
  | InvalidParameterException
  | RequestLimitExceeded
  | InvalidClientTokenId
  | CommonErrors;
/**
 * Deletes the endpoint for a device and mobile app from Amazon SNS. This action is
 * idempotent. For more information, see Using Amazon SNS Mobile Push
 * Notifications.
 *
 * When you delete an endpoint that is also subscribed to a topic, then you must also
 * unsubscribe the endpoint from the topic.
 */
export const deleteEndpoint: API.OperationMethod<
  DeleteEndpointInput,
  DeleteEndpointResponse,
  DeleteEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { EndpointArn: 0 } },
  errors: [
    AuthorizationErrorException,
    InternalErrorException,
    InvalidParameterException,
    RequestLimitExceeded,
    InvalidClientTokenId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEndpoint",
})) as any;

export type DeletePlatformApplicationError =
  | AuthorizationErrorException
  | InternalErrorException
  | InvalidParameterException
  | RequestLimitExceeded
  | InvalidClientTokenId
  | CommonErrors;
/**
 * Deletes a platform application object for one of the supported push notification
 * services, such as APNS and GCM (Firebase Cloud Messaging). For more information, see
 * Using Amazon SNS
 * Mobile Push Notifications.
 */
export const deletePlatformApplication: API.OperationMethod<
  DeletePlatformApplicationInput,
  DeletePlatformApplicationResponse,
  DeletePlatformApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { PlatformApplicationArn: 0 } },
  errors: [
    AuthorizationErrorException,
    InternalErrorException,
    InvalidParameterException,
    RequestLimitExceeded,
    InvalidClientTokenId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePlatformApplication",
})) as any;

export type DeleteSMSSandboxPhoneNumberError =
  | AuthorizationErrorException
  | InternalErrorException
  | InvalidParameterException
  | ResourceNotFoundException
  | ThrottledException
  | UserErrorException
  | CommonErrors;
/**
 * Deletes an Amazon Web Services account's verified or pending phone number from the SMS
 * sandbox.
 *
 * When you start using Amazon SNS to send SMS messages, your Amazon Web Services account is in the
 * *SMS sandbox*. The SMS sandbox provides a safe environment for
 * you to try Amazon SNS features without risking your reputation as an SMS sender. While your
 * Amazon Web Services account is in the SMS sandbox, you can use all of the features of Amazon SNS. However, you can send
 * SMS messages only to verified destination phone numbers. For more information, including how to
 * move out of the sandbox to send messages without restrictions,
 * see SMS sandbox in
 * the *Amazon SNS Developer Guide*.
 */
export const deleteSMSSandboxPhoneNumber: API.OperationMethod<
  DeleteSMSSandboxPhoneNumberInput,
  DeleteSMSSandboxPhoneNumberResult,
  DeleteSMSSandboxPhoneNumberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { PhoneNumber: 0 } },
  errors: [
    AuthorizationErrorException,
    InternalErrorException,
    InvalidParameterException,
    ResourceNotFoundException,
    ThrottledException,
    UserErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSMSSandboxPhoneNumber",
})) as any;

export type DeleteTopicError =
  | AuthorizationErrorException
  | ConcurrentAccessException
  | InternalErrorException
  | InvalidParameterException
  | InvalidStateException
  | NotFoundException
  | StaleTagException
  | TagPolicyException
  | RequestLimitExceeded
  | InvalidClientTokenId
  | CommonErrors;
/**
 * Deletes a topic and all its subscriptions. Deleting a topic might prevent some
 * messages previously sent to the topic from being delivered to subscribers. This action
 * is idempotent, so deleting a topic that does not exist does not result in an
 * error.
 */
export const deleteTopic: API.OperationMethod<
  DeleteTopicInput,
  DeleteTopicResponse,
  DeleteTopicError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TopicArn: 0 } },
  errors: [
    AuthorizationErrorException,
    ConcurrentAccessException,
    InternalErrorException,
    InvalidParameterException,
    InvalidStateException,
    NotFoundException,
    StaleTagException,
    TagPolicyException,
    RequestLimitExceeded,
    InvalidClientTokenId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTopic",
})) as any;

export type GetDataProtectionPolicyError =
  | AuthorizationErrorException
  | InternalErrorException
  | InvalidParameterException
  | InvalidSecurityException
  | NotFoundException
  | RequestLimitExceeded
  | InvalidClientTokenId
  | CommonErrors;
/**
 * Retrieves the specified inline `DataProtectionPolicy` document that is
 * stored in the specified Amazon SNS topic.
 */
export const getDataProtectionPolicy: API.OperationMethod<
  GetDataProtectionPolicyInput,
  GetDataProtectionPolicyResponse,
  GetDataProtectionPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0 } },
  errors: [
    AuthorizationErrorException,
    InternalErrorException,
    InvalidParameterException,
    InvalidSecurityException,
    NotFoundException,
    RequestLimitExceeded,
    InvalidClientTokenId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataProtectionPolicy",
})) as any;

export type GetEndpointAttributesError =
  | AuthorizationErrorException
  | InternalErrorException
  | InvalidParameterException
  | NotFoundException
  | RequestLimitExceeded
  | InvalidClientTokenId
  | CommonErrors;
/**
 * Retrieves the endpoint attributes for a device on one of the supported push
 * notification services, such as GCM (Firebase Cloud Messaging) and APNS. For more
 * information, see Using Amazon SNS Mobile Push Notifications.
 */
export const getEndpointAttributes: API.OperationMethod<
  GetEndpointAttributesInput,
  GetEndpointAttributesResponse,
  GetEndpointAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { EndpointArn: 0 },
    output: { Attributes: D.map() },
  },
  errors: [
    AuthorizationErrorException,
    InternalErrorException,
    InvalidParameterException,
    NotFoundException,
    RequestLimitExceeded,
    InvalidClientTokenId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEndpointAttributes",
})) as any;

export type GetPlatformApplicationAttributesError =
  | AuthorizationErrorException
  | InternalErrorException
  | InvalidParameterException
  | NotFoundException
  | RequestLimitExceeded
  | InvalidClientTokenId
  | CommonErrors;
/**
 * Retrieves the attributes of the platform application object for the supported push
 * notification services, such as APNS and GCM (Firebase Cloud Messaging). For more
 * information, see Using Amazon SNS Mobile Push Notifications.
 */
export const getPlatformApplicationAttributes: API.OperationMethod<
  GetPlatformApplicationAttributesInput,
  GetPlatformApplicationAttributesResponse,
  GetPlatformApplicationAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { PlatformApplicationArn: 0 },
    output: { Attributes: D.map() },
  },
  errors: [
    AuthorizationErrorException,
    InternalErrorException,
    InvalidParameterException,
    NotFoundException,
    RequestLimitExceeded,
    InvalidClientTokenId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPlatformApplicationAttributes",
})) as any;

export type GetSMSAttributesError =
  | AuthorizationErrorException
  | InternalErrorException
  | InvalidParameterException
  | ThrottledException
  | CommonErrors;
/**
 * Returns the settings for sending SMS messages from your Amazon Web Services account.
 *
 * These settings are set with the `SetSMSAttributes` action.
 */
export const getSMSAttributes: API.OperationMethod<
  GetSMSAttributesInput,
  GetSMSAttributesResponse,
  GetSMSAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { attributes: 0 },
    output: { attributes: D.map() },
  },
  errors: [
    AuthorizationErrorException,
    InternalErrorException,
    InvalidParameterException,
    ThrottledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSMSAttributes",
})) as any;

export type GetSMSSandboxAccountStatusError =
  | AuthorizationErrorException
  | InternalErrorException
  | ThrottledException
  | CommonErrors;
/**
 * Retrieves the SMS sandbox status for the calling Amazon Web Services account in the target
 * Amazon Web Services Region.
 *
 * When you start using Amazon SNS to send SMS messages, your Amazon Web Services account is in the
 * *SMS sandbox*. The SMS sandbox provides a safe environment for
 * you to try Amazon SNS features without risking your reputation as an SMS sender. While your
 * Amazon Web Services account is in the SMS sandbox, you can use all of the features of Amazon SNS. However, you can send
 * SMS messages only to verified destination phone numbers. For more information, including how to
 * move out of the sandbox to send messages without restrictions,
 * see SMS sandbox in
 * the *Amazon SNS Developer Guide*.
 */
export const getSMSSandboxAccountStatus: API.OperationMethod<
  GetSMSSandboxAccountStatusInput,
  GetSMSSandboxAccountStatusResult,
  GetSMSSandboxAccountStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {}, output: { IsInSandbox: D.bool } },
  errors: [
    AuthorizationErrorException,
    InternalErrorException,
    ThrottledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSMSSandboxAccountStatus",
})) as any;

export type GetSubscriptionAttributesError =
  | AuthorizationErrorException
  | InternalErrorException
  | InvalidParameterException
  | NotFoundException
  | CommonErrors;
/**
 * Returns all of the properties of a subscription.
 */
export const getSubscriptionAttributes: API.OperationMethod<
  GetSubscriptionAttributesInput,
  GetSubscriptionAttributesResponse,
  GetSubscriptionAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { SubscriptionArn: 0 },
    output: { Attributes: D.map() },
  },
  errors: [
    AuthorizationErrorException,
    InternalErrorException,
    InvalidParameterException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSubscriptionAttributes",
})) as any;

export type GetTopicAttributesError =
  | AuthorizationErrorException
  | InternalErrorException
  | InvalidParameterException
  | InvalidSecurityException
  | NotFoundException
  | RequestLimitExceeded
  | InvalidClientTokenId
  | CommonErrors;
/**
 * Returns all of the properties of a topic. Topic properties returned might differ based
 * on the authorization of the user.
 */
export const getTopicAttributes: API.OperationMethod<
  GetTopicAttributesInput,
  GetTopicAttributesResponse,
  GetTopicAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { TopicArn: 0 },
    output: { Attributes: D.map() },
  },
  errors: [
    AuthorizationErrorException,
    InternalErrorException,
    InvalidParameterException,
    InvalidSecurityException,
    NotFoundException,
    RequestLimitExceeded,
    InvalidClientTokenId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTopicAttributes",
})) as any;

export type ListEndpointsByPlatformApplicationError =
  | AuthorizationErrorException
  | InternalErrorException
  | InvalidParameterException
  | NotFoundException
  | RequestLimitExceeded
  | InvalidClientTokenId
  | CommonErrors;
/**
 * Lists the endpoints and endpoint attributes for devices in a supported push
 * notification service, such as GCM (Firebase Cloud Messaging) and APNS. The results for
 * `ListEndpointsByPlatformApplication` are paginated and return a limited
 * list of endpoints, up to 100. If additional records are available after the first page
 * results, then a NextToken string will be returned. To receive the next page, you call
 * `ListEndpointsByPlatformApplication` again using the NextToken string
 * received from the previous call. When there are no more records to return, NextToken
 * will be null. For more information, see Using Amazon SNS Mobile Push
 * Notifications.
 *
 * This action is throttled at 30 transactions per second (TPS).
 */
export const listEndpointsByPlatformApplication: API.PaginatedOperationMethod<
  ListEndpointsByPlatformApplicationInput,
  ListEndpointsByPlatformApplicationResponse,
  ListEndpointsByPlatformApplicationError,
  Credentials | HttpClient.HttpClient,
  Endpoint
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { PlatformApplicationArn: 0, NextToken: 0 },
    output: { Endpoints: D.list({ Attributes: D.map() }) },
  },
  errors: [
    AuthorizationErrorException,
    InternalErrorException,
    InvalidParameterException,
    NotFoundException,
    RequestLimitExceeded,
    InvalidClientTokenId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEndpointsByPlatformApplication",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Endpoints",
  } as const,
})) as any;

export type ListOriginationNumbersError =
  | AuthorizationErrorException
  | InternalErrorException
  | InvalidParameterException
  | ThrottledException
  | ValidationException
  | CommonErrors;
/**
 * Lists the calling Amazon Web Services account's dedicated origination numbers and their metadata.
 * For more information about origination numbers, see Origination numbers in the Amazon SNS Developer
 * Guide.
 */
export const listOriginationNumbers: API.PaginatedOperationMethod<
  ListOriginationNumbersRequest,
  ListOriginationNumbersResult,
  ListOriginationNumbersError,
  Credentials | HttpClient.HttpClient,
  PhoneNumberInformation
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0 },
    output: {
      PhoneNumbers: D.list({
        CreatedAt: D.ts,
        PhoneNumber: D.secret,
        NumberCapabilities: D.list(),
      }),
    },
  },
  errors: [
    AuthorizationErrorException,
    InternalErrorException,
    InvalidParameterException,
    ThrottledException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOriginationNumbers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PhoneNumbers",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPhoneNumbersOptedOutError =
  | AuthorizationErrorException
  | InternalErrorException
  | InvalidParameterException
  | ThrottledException
  | CommonErrors;
/**
 * Returns a list of phone numbers that are opted out, meaning you cannot send SMS
 * messages to them.
 *
 * The results for `ListPhoneNumbersOptedOut` are paginated, and each page
 * returns up to 100 phone numbers. If additional phone numbers are available after the
 * first page of results, then a `NextToken` string will be returned. To receive
 * the next page, you call `ListPhoneNumbersOptedOut` again using the
 * `NextToken` string received from the previous call. When there are no
 * more records to return, `NextToken` will be null.
 */
export const listPhoneNumbersOptedOut: API.PaginatedOperationMethod<
  ListPhoneNumbersOptedOutInput,
  ListPhoneNumbersOptedOutResponse,
  ListPhoneNumbersOptedOutError,
  Credentials | HttpClient.HttpClient,
  PhoneNumber
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { nextToken: 0 },
    output: { phoneNumbers: D.list(D.secret) },
  },
  errors: [
    AuthorizationErrorException,
    InternalErrorException,
    InvalidParameterException,
    ThrottledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPhoneNumbersOptedOut",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "phoneNumbers",
  } as const,
})) as any;

export type ListPlatformApplicationsError =
  | AuthorizationErrorException
  | InternalErrorException
  | InvalidParameterException
  | CommonErrors;
/**
 * Lists the platform application objects for the supported push notification services,
 * such as APNS and GCM (Firebase Cloud Messaging). The results for
 * `ListPlatformApplications` are paginated and return a limited list of
 * applications, up to 100. If additional records are available after the first page
 * results, then a NextToken string will be returned. To receive the next page, you call
 * `ListPlatformApplications` using the NextToken string received from the
 * previous call. When there are no more records to return, `NextToken` will be
 * null. For more information, see Using Amazon SNS Mobile Push
 * Notifications.
 *
 * This action is throttled at 15 transactions per second (TPS).
 */
export const listPlatformApplications: API.PaginatedOperationMethod<
  ListPlatformApplicationsInput,
  ListPlatformApplicationsResponse,
  ListPlatformApplicationsError,
  Credentials | HttpClient.HttpClient,
  PlatformApplication
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0 },
    output: { PlatformApplications: D.list({ Attributes: D.map() }) },
  },
  errors: [
    AuthorizationErrorException,
    InternalErrorException,
    InvalidParameterException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPlatformApplications",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PlatformApplications",
  } as const,
})) as any;

export type ListSMSSandboxPhoneNumbersError =
  | AuthorizationErrorException
  | InternalErrorException
  | InvalidParameterException
  | ResourceNotFoundException
  | ThrottledException
  | CommonErrors;
/**
 * Lists the calling Amazon Web Services account's current verified and pending destination phone
 * numbers in the SMS sandbox.
 *
 * When you start using Amazon SNS to send SMS messages, your Amazon Web Services account is in the
 * *SMS sandbox*. The SMS sandbox provides a safe environment for
 * you to try Amazon SNS features without risking your reputation as an SMS sender. While your
 * Amazon Web Services account is in the SMS sandbox, you can use all of the features of Amazon SNS. However, you can send
 * SMS messages only to verified destination phone numbers. For more information, including how to
 * move out of the sandbox to send messages without restrictions,
 * see SMS sandbox in
 * the *Amazon SNS Developer Guide*.
 */
export const listSMSSandboxPhoneNumbers: API.PaginatedOperationMethod<
  ListSMSSandboxPhoneNumbersInput,
  ListSMSSandboxPhoneNumbersResult,
  ListSMSSandboxPhoneNumbersError,
  Credentials | HttpClient.HttpClient,
  SMSSandboxPhoneNumber
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0 },
    output: { PhoneNumbers: D.list({ PhoneNumber: D.secret }) },
  },
  errors: [
    AuthorizationErrorException,
    InternalErrorException,
    InvalidParameterException,
    ResourceNotFoundException,
    ThrottledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSMSSandboxPhoneNumbers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PhoneNumbers",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSubscriptionsError =
  | AuthorizationErrorException
  | InternalErrorException
  | InvalidParameterException
  | CommonErrors;
/**
 * Returns a list of the requester's subscriptions. Each call returns a limited list of
 * subscriptions, up to 100. If there are more subscriptions, a `NextToken` is
 * also returned. Use the `NextToken` parameter in a new
 * `ListSubscriptions` call to get further results.
 *
 * This action is throttled at 30 transactions per second (TPS).
 */
export const listSubscriptions: API.PaginatedOperationMethod<
  ListSubscriptionsInput,
  ListSubscriptionsResponse,
  ListSubscriptionsError,
  Credentials | HttpClient.HttpClient,
  Subscription
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0 },
    output: { Subscriptions: D.list({}) },
  },
  errors: [
    AuthorizationErrorException,
    InternalErrorException,
    InvalidParameterException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSubscriptions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Subscriptions",
  } as const,
})) as any;

export type ListSubscriptionsByTopicError =
  | AuthorizationErrorException
  | InternalErrorException
  | InvalidParameterException
  | NotFoundException
  | RequestLimitExceeded
  | InvalidClientTokenId
  | CommonErrors;
/**
 * Returns a list of the subscriptions to a specific topic. Each call returns a limited
 * list of subscriptions, up to 100. If there are more subscriptions, a
 * `NextToken` is also returned. Use the `NextToken` parameter in
 * a new `ListSubscriptionsByTopic` call to get further results.
 *
 * This action is throttled at 30 transactions per second (TPS).
 */
export const listSubscriptionsByTopic: API.PaginatedOperationMethod<
  ListSubscriptionsByTopicInput,
  ListSubscriptionsByTopicResponse,
  ListSubscriptionsByTopicError,
  Credentials | HttpClient.HttpClient,
  Subscription
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { TopicArn: 0, NextToken: 0 },
    output: { Subscriptions: D.list({}) },
  },
  errors: [
    AuthorizationErrorException,
    InternalErrorException,
    InvalidParameterException,
    NotFoundException,
    RequestLimitExceeded,
    InvalidClientTokenId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSubscriptionsByTopic",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Subscriptions",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AuthorizationErrorException
  | ConcurrentAccessException
  | InvalidParameterException
  | ResourceNotFoundException
  | TagPolicyException
  | RequestLimitExceeded
  | InvalidClientTokenId
  | CommonErrors;
/**
 * List all tags added to the specified Amazon SNS topic. For an overview, see Amazon SNS Tags in the
 * *Amazon Simple Notification Service Developer Guide*.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResourceArn: 0 },
    output: { Tags: D.list({}) },
  },
  errors: [
    AuthorizationErrorException,
    ConcurrentAccessException,
    InvalidParameterException,
    ResourceNotFoundException,
    TagPolicyException,
    RequestLimitExceeded,
    InvalidClientTokenId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ListTopicsError =
  | AuthorizationErrorException
  | InternalErrorException
  | InvalidParameterException
  | CommonErrors;
/**
 * Returns a list of the requester's topics. Each call returns a limited list of topics,
 * up to 100. If there are more topics, a `NextToken` is also returned. Use the
 * `NextToken` parameter in a new `ListTopics` call to get
 * further results.
 *
 * This action is throttled at 30 transactions per second (TPS).
 */
export const listTopics: API.PaginatedOperationMethod<
  ListTopicsInput,
  ListTopicsResponse,
  ListTopicsError,
  Credentials | HttpClient.HttpClient,
  Topic
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0 },
    output: { Topics: D.list({}) },
  },
  errors: [
    AuthorizationErrorException,
    InternalErrorException,
    InvalidParameterException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTopics",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Topics",
  } as const,
})) as any;

export type OptInPhoneNumberError =
  | AuthorizationErrorException
  | InternalErrorException
  | InvalidParameterException
  | ThrottledException
  | CommonErrors;
/**
 * Use this request to opt in a phone number that is opted out, which enables you to
 * resume sending SMS messages to the number.
 *
 * You can opt in a phone number only once every 30 days.
 */
export const optInPhoneNumber: API.OperationMethod<
  OptInPhoneNumberInput,
  OptInPhoneNumberResponse,
  OptInPhoneNumberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { phoneNumber: 0 } },
  errors: [
    AuthorizationErrorException,
    InternalErrorException,
    InvalidParameterException,
    ThrottledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "OptInPhoneNumber",
})) as any;

export type PublishError =
  | AuthorizationErrorException
  | EndpointDisabledException
  | InternalErrorException
  | InvalidParameterException
  | InvalidParameterValueException
  | InvalidSecurityException
  | KMSAccessDeniedException
  | KMSDisabledException
  | KMSInvalidStateException
  | KMSNotFoundException
  | KMSOptInRequired
  | KMSThrottlingException
  | NotFoundException
  | PlatformApplicationDisabledException
  | ValidationException
  | RequestLimitExceeded
  | InvalidClientTokenId
  | CommonErrors;
/**
 * Sends a message to an Amazon SNS topic, a text message (SMS message) directly to a phone
 * number, or a message to a mobile platform endpoint (when you specify the
 * `TargetArn`).
 *
 * If you send a message to a topic, Amazon SNS delivers the message to each endpoint that is
 * subscribed to the topic. The format of the message depends on the notification protocol
 * for each subscribed endpoint.
 *
 * When a `messageId` is returned, the message is saved and Amazon SNS immediately
 * delivers it to subscribers.
 *
 * To use the `Publish` action for publishing a message to a mobile endpoint,
 * such as an app on a Kindle device or mobile phone, you must specify the EndpointArn for
 * the TargetArn parameter. The EndpointArn is returned when making a call with the
 * `CreatePlatformEndpoint` action.
 *
 * For more information about formatting messages, see Send Custom
 * Platform-Specific Payloads in Messages to Mobile Devices.
 *
 * You can publish messages only to topics and endpoints in the same
 * Amazon Web Services Region.
 */
export const publish: API.OperationMethod<
  PublishInput,
  PublishResponse,
  PublishError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TopicArn: 0,
      TargetArn: 0,
      PhoneNumber: 0,
      Message: 0,
      Subject: 0,
      MessageStructure: 0,
      MessageAttributes: D.map(i_MessageAttributeValue, {
        key: "Name",
        value: "Value",
      }),
      MessageDeduplicationId: 0,
      MessageGroupId: 0,
    },
  },
  errors: [
    AuthorizationErrorException,
    EndpointDisabledException,
    InternalErrorException,
    InvalidParameterException,
    InvalidParameterValueException,
    InvalidSecurityException,
    KMSAccessDeniedException,
    KMSDisabledException,
    KMSInvalidStateException,
    KMSNotFoundException,
    KMSOptInRequired,
    KMSThrottlingException,
    NotFoundException,
    PlatformApplicationDisabledException,
    ValidationException,
    RequestLimitExceeded,
    InvalidClientTokenId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Publish",
})) as any;

export type PublishBatchError =
  | AuthorizationErrorException
  | BatchEntryIdsNotDistinctException
  | BatchRequestTooLongException
  | EmptyBatchRequestException
  | EndpointDisabledException
  | InternalErrorException
  | InvalidBatchEntryIdException
  | InvalidParameterException
  | InvalidParameterValueException
  | InvalidSecurityException
  | KMSAccessDeniedException
  | KMSDisabledException
  | KMSInvalidStateException
  | KMSNotFoundException
  | KMSOptInRequired
  | KMSThrottlingException
  | NotFoundException
  | PlatformApplicationDisabledException
  | TooManyEntriesInBatchRequestException
  | ValidationException
  | CommonErrors;
/**
 * Publishes up to 10 messages to the specified topic in a single batch. This is a batch
 * version of the `Publish` API. If you try to send more than 10 messages in a
 * single batch request, you will receive a `TooManyEntriesInBatchRequest`
 * exception.
 *
 * For FIFO topics, multiple messages within a single batch are published in the order
 * they are sent, and messages are deduplicated within the batch and across batches for
 * five minutes.
 *
 * The result of publishing each message is reported individually in the response.
 * Because the batch request can result in a combination of successful and unsuccessful
 * actions, you should check for batch errors even when the call returns an HTTP status
 * code of 200.
 *
 * The maximum allowed individual message size and the maximum total payload size (the sum
 * of the individual lengths of all of the batched messages) are both 256 KB (262,144
 * bytes).
 *
 * The `PublishBatch` API can send up to 10 messages at a time. If you
 * attempt to send more than 10 messages in one request, you will encounter a
 * `TooManyEntriesInBatchRequest` exception. In such cases, split your
 * messages into multiple requests, each containing no more than 10 messages.
 *
 * Some actions take lists of parameters. These lists are specified using the
 * `param.n` notation. Values of `n` are integers starting from
 * **1**. For example, a parameter list with two elements
 * looks like this:
 *
 * `&AttributeName.1=first`
 *
 * `&AttributeName.2=second`
 *
 * If you send a batch message to a topic, Amazon SNS publishes the batch message to each
 * endpoint that is subscribed to the topic. The format of the batch message depends on the
 * notification protocol for each subscribed endpoint.
 *
 * When a `messageId` is returned, the batch message is saved, and Amazon SNS
 * immediately delivers the message to subscribers.
 */
export const publishBatch: API.OperationMethod<
  PublishBatchInput,
  PublishBatchResponse,
  PublishBatchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TopicArn: 0,
      PublishBatchRequestEntries: D.list({
        Id: 0,
        Message: 0,
        Subject: 0,
        MessageStructure: 0,
        MessageAttributes: D.map(i_MessageAttributeValue, {
          key: "Name",
          value: "Value",
        }),
        MessageDeduplicationId: 0,
        MessageGroupId: 0,
      }),
    },
    output: { Successful: D.list({}), Failed: D.list({ SenderFault: D.bool }) },
  },
  errors: [
    AuthorizationErrorException,
    BatchEntryIdsNotDistinctException,
    BatchRequestTooLongException,
    EmptyBatchRequestException,
    EndpointDisabledException,
    InternalErrorException,
    InvalidBatchEntryIdException,
    InvalidParameterException,
    InvalidParameterValueException,
    InvalidSecurityException,
    KMSAccessDeniedException,
    KMSDisabledException,
    KMSInvalidStateException,
    KMSNotFoundException,
    KMSOptInRequired,
    KMSThrottlingException,
    NotFoundException,
    PlatformApplicationDisabledException,
    TooManyEntriesInBatchRequestException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PublishBatch",
})) as any;

export type PutDataProtectionPolicyError =
  | AuthorizationErrorException
  | InternalErrorException
  | InvalidParameterException
  | InvalidSecurityException
  | NotFoundException
  | RequestLimitExceeded
  | InvalidClientTokenId
  | CommonErrors;
/**
 * Adds or updates an inline policy document that is stored in the specified Amazon SNS
 * topic.
 */
export const putDataProtectionPolicy: API.OperationMethod<
  PutDataProtectionPolicyInput,
  PutDataProtectionPolicyResponse,
  PutDataProtectionPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResourceArn: 0, DataProtectionPolicy: 0 },
  },
  errors: [
    AuthorizationErrorException,
    InternalErrorException,
    InvalidParameterException,
    InvalidSecurityException,
    NotFoundException,
    RequestLimitExceeded,
    InvalidClientTokenId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutDataProtectionPolicy",
})) as any;

export type RemovePermissionError =
  | AuthorizationErrorException
  | InternalErrorException
  | InvalidParameterException
  | NotFoundException
  | RequestLimitExceeded
  | InvalidClientTokenId
  | CommonErrors;
/**
 * Removes a statement from a topic's access control policy.
 *
 * To remove the ability to change topic permissions, you must deny permissions to
 * the `AddPermission`, `RemovePermission`, and
 * `SetTopicAttributes` actions in your IAM policy.
 */
export const removePermission: API.OperationMethod<
  RemovePermissionInput,
  RemovePermissionResponse,
  RemovePermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TopicArn: 0, Label: 0 } },
  errors: [
    AuthorizationErrorException,
    InternalErrorException,
    InvalidParameterException,
    NotFoundException,
    RequestLimitExceeded,
    InvalidClientTokenId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemovePermission",
})) as any;

export type SetEndpointAttributesError =
  | AuthorizationErrorException
  | InternalErrorException
  | InvalidParameterException
  | NotFoundException
  | RequestLimitExceeded
  | InvalidClientTokenId
  | CommonErrors;
/**
 * Sets the attributes for an endpoint for a device on one of the supported push
 * notification services, such as GCM (Firebase Cloud Messaging) and APNS. For more
 * information, see Using Amazon SNS Mobile Push Notifications.
 */
export const setEndpointAttributes: API.OperationMethod<
  SetEndpointAttributesInput,
  SetEndpointAttributesResponse,
  SetEndpointAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { EndpointArn: 0, Attributes: D.map() } },
  errors: [
    AuthorizationErrorException,
    InternalErrorException,
    InvalidParameterException,
    NotFoundException,
    RequestLimitExceeded,
    InvalidClientTokenId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetEndpointAttributes",
})) as any;

export type SetPlatformApplicationAttributesError =
  | AuthorizationErrorException
  | InternalErrorException
  | InvalidParameterException
  | NotFoundException
  | RequestLimitExceeded
  | InvalidClientTokenId
  | CommonErrors;
/**
 * Sets the attributes of the platform application object for the supported push
 * notification services, such as APNS and GCM (Firebase Cloud Messaging). For more
 * information, see Using Amazon SNS Mobile Push Notifications. For information on configuring
 * attributes for message delivery status, see Using Amazon SNS Application Attributes for
 * Message Delivery Status.
 */
export const setPlatformApplicationAttributes: API.OperationMethod<
  SetPlatformApplicationAttributesInput,
  SetPlatformApplicationAttributesResponse,
  SetPlatformApplicationAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { PlatformApplicationArn: 0, Attributes: D.map() },
  },
  errors: [
    AuthorizationErrorException,
    InternalErrorException,
    InvalidParameterException,
    NotFoundException,
    RequestLimitExceeded,
    InvalidClientTokenId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetPlatformApplicationAttributes",
})) as any;

export type SetSMSAttributesError =
  | AuthorizationErrorException
  | InternalErrorException
  | InvalidParameterException
  | ThrottledException
  | CommonErrors;
/**
 * Use this request to set the default settings for sending SMS messages and receiving
 * daily SMS usage reports.
 *
 * You can override some of these settings for a single message when you use the
 * `Publish` action with the `MessageAttributes.entry.N`
 * parameter. For more information, see Publishing to a mobile phone
 * in the *Amazon SNS Developer Guide*.
 *
 * To use this operation, you must grant the Amazon SNS service principal
 * (`sns.amazonaws.com`) permission to perform the
 * `s3:ListBucket` action.
 */
export const setSMSAttributes: API.OperationMethod<
  SetSMSAttributesInput,
  SetSMSAttributesResponse,
  SetSMSAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { attributes: D.map() } },
  errors: [
    AuthorizationErrorException,
    InternalErrorException,
    InvalidParameterException,
    ThrottledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetSMSAttributes",
})) as any;

export type SetSubscriptionAttributesError =
  | AuthorizationErrorException
  | FilterPolicyLimitExceededException
  | InternalErrorException
  | InvalidParameterException
  | NotFoundException
  | ReplayLimitExceededException
  | CommonErrors;
/**
 * Allows a subscription owner to set an attribute of the subscription to a new
 * value.
 */
export const setSubscriptionAttributes: API.OperationMethod<
  SetSubscriptionAttributesInput,
  SetSubscriptionAttributesResponse,
  SetSubscriptionAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { SubscriptionArn: 0, AttributeName: 0, AttributeValue: 0 },
  },
  errors: [
    AuthorizationErrorException,
    FilterPolicyLimitExceededException,
    InternalErrorException,
    InvalidParameterException,
    NotFoundException,
    ReplayLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetSubscriptionAttributes",
})) as any;

export type SetTopicAttributesError =
  | AuthorizationErrorException
  | InternalErrorException
  | InvalidParameterException
  | InvalidSecurityException
  | NotFoundException
  | RequestLimitExceeded
  | InvalidClientTokenId
  | CommonErrors;
/**
 * Allows a topic owner to set an attribute of the topic to a new value.
 *
 * To remove the ability to change topic permissions, you must deny permissions to
 * the `AddPermission`, `RemovePermission`, and
 * `SetTopicAttributes` actions in your IAM policy.
 */
export const setTopicAttributes: API.OperationMethod<
  SetTopicAttributesInput,
  SetTopicAttributesResponse,
  SetTopicAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { TopicArn: 0, AttributeName: 0, AttributeValue: 0 },
  },
  errors: [
    AuthorizationErrorException,
    InternalErrorException,
    InvalidParameterException,
    InvalidSecurityException,
    NotFoundException,
    RequestLimitExceeded,
    InvalidClientTokenId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetTopicAttributes",
})) as any;

export type SubscribeError =
  | AuthorizationErrorException
  | FilterPolicyLimitExceededException
  | InternalErrorException
  | InvalidParameterException
  | InvalidSecurityException
  | NotFoundException
  | ReplayLimitExceededException
  | SubscriptionLimitExceededException
  | RequestLimitExceeded
  | InvalidClientTokenId
  | CommonErrors;
/**
 * Subscribes an endpoint to an Amazon SNS topic. If the endpoint type is HTTP/S or email, or
 * if the endpoint and the topic are not in the same Amazon Web Services account, the endpoint owner must
 * run the `ConfirmSubscription` action to confirm the subscription.
 *
 * You call the `ConfirmSubscription` action with the token from the
 * subscription response. Confirmation tokens are valid for two days.
 *
 * This action is throttled at 100 transactions per second (TPS).
 */
export const subscribe: API.OperationMethod<
  SubscribeInput,
  SubscribeResponse,
  SubscribeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TopicArn: 0,
      Protocol: 0,
      Endpoint: 0,
      Attributes: D.map(),
      ReturnSubscriptionArn: 0,
    },
  },
  errors: [
    AuthorizationErrorException,
    FilterPolicyLimitExceededException,
    InternalErrorException,
    InvalidParameterException,
    InvalidSecurityException,
    NotFoundException,
    ReplayLimitExceededException,
    SubscriptionLimitExceededException,
    RequestLimitExceeded,
    InvalidClientTokenId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Subscribe",
})) as any;

export type TagResourceError =
  | AuthorizationErrorException
  | ConcurrentAccessException
  | InvalidParameterException
  | ResourceNotFoundException
  | StaleTagException
  | TagLimitExceededException
  | TagPolicyException
  | RequestLimitExceeded
  | InvalidClientTokenId
  | CommonErrors;
/**
 * Add tags to the specified Amazon SNS topic. For an overview, see Amazon SNS Tags in the
 * *Amazon SNS Developer Guide*.
 *
 * When you use topic tags, keep the following guidelines in mind:
 *
 * - Adding more than 50 tags to a topic isn't recommended.
 *
 * - Tags don't have any semantic meaning. Amazon SNS interprets tags as character
 * strings.
 *
 * - Tags are case-sensitive.
 *
 * - A new tag with a key identical to that of an existing tag overwrites the
 * existing tag.
 *
 * - Tagging actions are limited to 10 TPS per Amazon Web Services account, per Amazon Web Services Region. If
 * your application requires a higher throughput, file a technical support request.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0, Tags: D.list(i_Tag) } },
  errors: [
    AuthorizationErrorException,
    ConcurrentAccessException,
    InvalidParameterException,
    ResourceNotFoundException,
    StaleTagException,
    TagLimitExceededException,
    TagPolicyException,
    RequestLimitExceeded,
    InvalidClientTokenId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UnsubscribeError =
  | AuthorizationErrorException
  | InternalErrorException
  | InvalidParameterException
  | InvalidSecurityException
  | NotFoundException
  | CommonErrors;
/**
 * Deletes a subscription. If the subscription requires authentication for deletion, only
 * the owner of the subscription or the topic's owner can unsubscribe, and an Amazon Web Services
 * signature is required. If the `Unsubscribe` call does not require
 * authentication and the requester is not the subscription owner, a final cancellation
 * message is delivered to the endpoint, so that the endpoint owner can easily resubscribe
 * to the topic if the `Unsubscribe` request was unintended.
 *
 * This action is throttled at 100 transactions per second (TPS).
 */
export const unsubscribe: API.OperationMethod<
  UnsubscribeInput,
  UnsubscribeResponse,
  UnsubscribeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { SubscriptionArn: 0 } },
  errors: [
    AuthorizationErrorException,
    InternalErrorException,
    InvalidParameterException,
    InvalidSecurityException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Unsubscribe",
})) as any;

export type UntagResourceError =
  | AuthorizationErrorException
  | ConcurrentAccessException
  | InvalidParameterException
  | ResourceNotFoundException
  | StaleTagException
  | TagLimitExceededException
  | TagPolicyException
  | RequestLimitExceeded
  | InvalidClientTokenId
  | CommonErrors;
/**
 * Remove tags from the specified Amazon SNS topic. For an overview, see Amazon SNS Tags in the
 * *Amazon SNS Developer Guide*.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0, TagKeys: 0 } },
  errors: [
    AuthorizationErrorException,
    ConcurrentAccessException,
    InvalidParameterException,
    ResourceNotFoundException,
    StaleTagException,
    TagLimitExceededException,
    TagPolicyException,
    RequestLimitExceeded,
    InvalidClientTokenId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type VerifySMSSandboxPhoneNumberError =
  | AuthorizationErrorException
  | InternalErrorException
  | InvalidParameterException
  | ResourceNotFoundException
  | ThrottledException
  | VerificationException
  | CommonErrors;
/**
 * Verifies a destination phone number with a one-time password (OTP) for the calling
 * Amazon Web Services account.
 *
 * When you start using Amazon SNS to send SMS messages, your Amazon Web Services account is in the
 * *SMS sandbox*. The SMS sandbox provides a safe environment for
 * you to try Amazon SNS features without risking your reputation as an SMS sender. While your
 * Amazon Web Services account is in the SMS sandbox, you can use all of the features of Amazon SNS. However, you can send
 * SMS messages only to verified destination phone numbers. For more information, including how to
 * move out of the sandbox to send messages without restrictions,
 * see SMS sandbox in
 * the *Amazon SNS Developer Guide*.
 */
export const verifySMSSandboxPhoneNumber: API.OperationMethod<
  VerifySMSSandboxPhoneNumberInput,
  VerifySMSSandboxPhoneNumberResult,
  VerifySMSSandboxPhoneNumberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { PhoneNumber: 0, OneTimePassword: 0 } },
  errors: [
    AuthorizationErrorException,
    InternalErrorException,
    InvalidParameterException,
    ResourceNotFoundException,
    ThrottledException,
    VerificationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "VerifySMSSandboxPhoneNumber",
})) as any;

const i_MessageAttributeValue: D.LazyStruct = () => ({
  DataType: 0,
  StringValue: 0,
  BinaryValue: 0,
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
