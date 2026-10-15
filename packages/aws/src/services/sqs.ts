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
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "SQS", serviceShapeName: "AmazonSQS" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "sqs" });
const ver = /*@__PURE__*/ T.ServiceVersion("2012-11-05");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_0();
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
              `https://sqs-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
              return e(`https://sqs.${Region}.amazonaws.com`);
            }
            return e(`https://sqs-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(`https://sqs.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`);
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://sqs.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://sqs.{R}.{D}","properties":{},"headers":{}}');

export class BatchEntryIdsNotDistinct
  extends /*@__PURE__*/ S.TaggedError<BatchEntryIdsNotDistinct>()(
    "BatchEntryIdsNotDistinct",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "AWS.SimpleQueueService.BatchEntryIdsNotDistinct",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class BatchRequestTooLong
  extends /*@__PURE__*/ S.TaggedError<BatchRequestTooLong>()(
    "BatchRequestTooLong",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "AWS.SimpleQueueService.BatchRequestTooLong",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class CommonServiceException
  extends /*@__PURE__*/ S.TaggedError<CommonServiceException>()("CommonServiceException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withServerError) {}
export class EmptyBatchRequest
  extends /*@__PURE__*/ S.TaggedError<EmptyBatchRequest>()(
    "EmptyBatchRequest",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "AWS.SimpleQueueService.EmptyBatchRequest",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidAddress
  extends /*@__PURE__*/ S.TaggedError<InvalidAddress>()(
    "InvalidAddress",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidAddress", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidAttributeName
  extends /*@__PURE__*/ S.TaggedError<InvalidAttributeName>()("InvalidAttributeName", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withBadRequestError) {}
export class InvalidAttributeValue
  extends /*@__PURE__*/ S.TaggedError<InvalidAttributeValue>()("InvalidAttributeValue", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withBadRequestError) {}
export class InvalidBatchEntryId
  extends /*@__PURE__*/ S.TaggedError<InvalidBatchEntryId>()(
    "InvalidBatchEntryId",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "AWS.SimpleQueueService.InvalidBatchEntryId",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidIdFormat
  extends /*@__PURE__*/ S.TaggedError<InvalidIdFormat>()("InvalidIdFormat", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withBadRequestError) {}
export class InvalidMessageContents
  extends /*@__PURE__*/ S.TaggedError<InvalidMessageContents>()("InvalidMessageContents", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withBadRequestError) {}
export class InvalidParameterValueException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterValueException>()(
    "InvalidParameterValueException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ).pipe(C.withBadRequestError) {}
export class InvalidSecurity
  extends /*@__PURE__*/ S.TaggedError<InvalidSecurity>()(
    "InvalidSecurity",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidSecurity", httpResponseCode: 403 }),
      /*@__PURE__*/ T.HttpError(403),
    ),
  ).pipe(C.withAuthError) {}
export class KmsAccessDenied
  extends /*@__PURE__*/ S.TaggedError<KmsAccessDenied>()(
    "KmsAccessDenied",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "KMS.AccessDeniedException", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAuthError) {}
export class KmsDisabled
  extends /*@__PURE__*/ S.TaggedError<KmsDisabled>()(
    "KmsDisabled",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "KMS.DisabledException", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class KmsInvalidKeyUsage
  extends /*@__PURE__*/ S.TaggedError<KmsInvalidKeyUsage>()(
    "KmsInvalidKeyUsage",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "KMS.InvalidKeyUsageException",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class KmsInvalidState
  extends /*@__PURE__*/ S.TaggedError<KmsInvalidState>()(
    "KmsInvalidState",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "KMS.InvalidStateException", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class KmsNotFound
  extends /*@__PURE__*/ S.TaggedError<KmsNotFound>()(
    "KmsNotFound",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "KMS.NotFoundException", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class KmsOptInRequired
  extends /*@__PURE__*/ S.TaggedError<KmsOptInRequired>()(
    "KmsOptInRequired",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "KMS.OptInRequired", httpResponseCode: 403 }),
      /*@__PURE__*/ T.HttpError(403),
    ),
  ).pipe(C.withAuthError) {}
export class KmsThrottled
  extends /*@__PURE__*/ S.TaggedError<KmsThrottled>()(
    "KmsThrottled",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "KMS.ThrottlingException", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withThrottlingError, C.withRetryableError) {}
export class MessageNotInflight
  extends /*@__PURE__*/ S.TaggedError<MessageNotInflight>()(
    "MessageNotInflight",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "AWS.SimpleQueueService.MessageNotInflight",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class MissingRequiredParameterException
  extends /*@__PURE__*/ S.TaggedError<MissingRequiredParameterException>()(
    "MissingRequiredParameterException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ).pipe(C.withBadRequestError) {}
export class OverLimit
  extends /*@__PURE__*/ S.TaggedError<OverLimit>()(
    "OverLimit",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "OverLimit", httpResponseCode: 403 }),
      /*@__PURE__*/ T.HttpError(403),
    ),
  ).pipe(C.withAuthError, C.withQuotaError) {}
export class ParseError
  extends /*@__PURE__*/ S.TaggedError<ParseError>()("ParseError", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class PurgeQueueInProgress
  extends /*@__PURE__*/ S.TaggedError<PurgeQueueInProgress>()(
    "PurgeQueueInProgress",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "AWS.SimpleQueueService.PurgeQueueInProgress",
        httpResponseCode: 403,
      }),
      /*@__PURE__*/ T.HttpError(403),
    ),
  ).pipe(C.withAuthError, C.withConflictError, C.withRetryableError) {}
export class QueueDeletedRecently
  extends /*@__PURE__*/ S.TaggedError<QueueDeletedRecently>()(
    "QueueDeletedRecently",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "AWS.SimpleQueueService.QueueDeletedRecently",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class QueueDoesNotExist
  extends /*@__PURE__*/ S.TaggedError<QueueDoesNotExist>()(
    "QueueDoesNotExist",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "AWS.SimpleQueueService.NonExistentQueue",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class QueueNameExists
  extends /*@__PURE__*/ S.TaggedError<QueueNameExists>()(
    "QueueNameExists",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "QueueAlreadyExists", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ReceiptHandleIsInvalid
  extends /*@__PURE__*/ S.TaggedError<ReceiptHandleIsInvalid>()(
    "ReceiptHandleIsInvalid",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ReceiptHandleIsInvalid", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class RequestLimitExceeded
  extends /*@__PURE__*/ S.TaggedError<RequestLimitExceeded>()("RequestLimitExceeded", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withThrottlingError) {}
export class RequestThrottled
  extends /*@__PURE__*/ S.TaggedError<RequestThrottled>()(
    "RequestThrottled",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "RequestThrottled", httpResponseCode: 403 }),
      /*@__PURE__*/ T.HttpError(403),
    ),
  ).pipe(C.withAuthError, C.withThrottlingError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ResourceNotFoundException", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class TooManyEntriesInBatchRequest
  extends /*@__PURE__*/ S.TaggedError<TooManyEntriesInBatchRequest>()(
    "TooManyEntriesInBatchRequest",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "AWS.SimpleQueueService.TooManyEntriesInBatchRequest",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class UnsupportedOperation
  extends /*@__PURE__*/ S.TaggedError<UnsupportedOperation>()(
    "UnsupportedOperation",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "AWS.SimpleQueueService.UnsupportedOperation",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export type AWSAccountIdList = string[];
export type ActionNameList = string[];
export interface AddPermissionRequest {
  QueueUrl: string;
  Label: string;
  AWSAccountIds: string[];
  Actions: string[];
}
export interface AddPermissionResponse {}
export interface CancelMessageMoveTaskRequest {
  TaskHandle: string;
}
export interface CancelMessageMoveTaskResult {
  ApproximateNumberOfMessagesMoved?: number;
}
export interface ChangeMessageVisibilityRequest {
  QueueUrl: string;
  ReceiptHandle: string;
  VisibilityTimeout: number;
}
export interface ChangeMessageVisibilityResponse {}
export interface ChangeMessageVisibilityBatchRequestEntry {
  Id: string;
  ReceiptHandle: string;
  VisibilityTimeout?: number;
}
export type ChangeMessageVisibilityBatchRequestEntryList =
  ChangeMessageVisibilityBatchRequestEntry[];
export interface ChangeMessageVisibilityBatchRequest {
  QueueUrl: string;
  Entries: ChangeMessageVisibilityBatchRequestEntry[];
}
export interface ChangeMessageVisibilityBatchResultEntry {
  Id: string;
}
export type ChangeMessageVisibilityBatchResultEntryList = ChangeMessageVisibilityBatchResultEntry[];
export interface BatchResultErrorEntry {
  Id: string;
  SenderFault: boolean;
  Code: string;
  Message?: string;
}
export type BatchResultErrorEntryList = BatchResultErrorEntry[];
export interface ChangeMessageVisibilityBatchResult {
  Successful?: ChangeMessageVisibilityBatchResultEntry[];
  Failed?: BatchResultErrorEntry[];
}
export type QueueAttributeName =
  | "All"
  | "Policy"
  | "VisibilityTimeout"
  | "MaximumMessageSize"
  | "MessageRetentionPeriod"
  | "ApproximateNumberOfMessages"
  | "ApproximateNumberOfMessagesNotVisible"
  | "CreatedTimestamp"
  | "LastModifiedTimestamp"
  | "QueueArn"
  | "ApproximateNumberOfMessagesDelayed"
  | "DelaySeconds"
  | "ReceiveMessageWaitTimeSeconds"
  | "RedrivePolicy"
  | "FifoQueue"
  | "ContentBasedDeduplication"
  | "KmsMasterKeyId"
  | "KmsDataKeyReusePeriodSeconds"
  | "DeduplicationScope"
  | "FifoThroughputLimit"
  | "RedriveAllowPolicy"
  | "SqsManagedSseEnabled"
  | (string & {});
export type QueueAttributeMap = { [key in QueueAttributeName]?: string };
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export interface CreateQueueRequest {
  QueueName: string;
  Attributes?: { [key: string]: string | undefined };
  tags?: { [key: string]: string | undefined };
}
export interface CreateQueueResult {
  QueueUrl?: string;
}
export interface DeleteMessageRequest {
  QueueUrl: string;
  ReceiptHandle: string;
}
export interface DeleteMessageResponse {}
export interface DeleteMessageBatchRequestEntry {
  Id: string;
  ReceiptHandle: string;
}
export type DeleteMessageBatchRequestEntryList = DeleteMessageBatchRequestEntry[];
export interface DeleteMessageBatchRequest {
  QueueUrl: string;
  Entries: DeleteMessageBatchRequestEntry[];
}
export interface DeleteMessageBatchResultEntry {
  Id: string;
}
export type DeleteMessageBatchResultEntryList = DeleteMessageBatchResultEntry[];
export interface DeleteMessageBatchResult {
  Successful?: DeleteMessageBatchResultEntry[];
  Failed?: BatchResultErrorEntry[];
}
export interface DeleteQueueRequest {
  QueueUrl: string;
}
export interface DeleteQueueResponse {}
export type AttributeNameList = QueueAttributeName[];
export interface GetQueueAttributesRequest {
  QueueUrl: string;
  AttributeNames?: QueueAttributeName[];
}
export interface GetQueueAttributesResult {
  Attributes?: { [key: string]: string | undefined };
}
export interface GetQueueUrlRequest {
  QueueName: string;
  QueueOwnerAWSAccountId?: string;
}
export interface GetQueueUrlResult {
  QueueUrl?: string;
}
export type Token = string;
export type BoxedInteger = number;
export interface ListDeadLetterSourceQueuesRequest {
  QueueUrl: string;
  NextToken?: string;
  MaxResults?: number;
}
export type QueueUrlList = string[];
export interface ListDeadLetterSourceQueuesResult {
  queueUrls: string[];
  NextToken?: string;
}
export interface ListMessageMoveTasksRequest {
  SourceArn: string;
  MaxResults?: number;
}
export interface ListMessageMoveTasksResultEntry {
  TaskHandle?: string;
  Status?: string;
  SourceArn?: string;
  DestinationArn?: string;
  MaxNumberOfMessagesPerSecond?: number;
  ApproximateNumberOfMessagesMoved?: number;
  ApproximateNumberOfMessagesToMove?: number;
  FailureReason?: string;
  StartedTimestamp?: number;
}
export type ListMessageMoveTasksResultEntryList = ListMessageMoveTasksResultEntry[];
export interface ListMessageMoveTasksResult {
  Results?: ListMessageMoveTasksResultEntry[];
}
export interface ListQueuesRequest {
  QueueNamePrefix?: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface ListQueuesResult {
  QueueUrls?: string[];
  NextToken?: string;
}
export interface ListQueueTagsRequest {
  QueueUrl: string;
}
export interface ListQueueTagsResult {
  Tags?: { [key: string]: string | undefined };
}
export interface PurgeQueueRequest {
  QueueUrl: string;
}
export interface PurgeQueueResponse {}
export type MessageSystemAttributeName =
  | "All"
  | "SenderId"
  | "SentTimestamp"
  | "ApproximateReceiveCount"
  | "ApproximateFirstReceiveTimestamp"
  | "SequenceNumber"
  | "MessageDeduplicationId"
  | "MessageGroupId"
  | "AWSTraceHeader"
  | "DeadLetterQueueSourceArn"
  | (string & {});
export type MessageSystemAttributeList = MessageSystemAttributeName[];
export type MessageAttributeName = string;
export type MessageAttributeNameList = string[];
export interface ReceiveMessageRequest {
  QueueUrl: string;
  AttributeNames?: QueueAttributeName[];
  MessageSystemAttributeNames?: MessageSystemAttributeName[];
  MessageAttributeNames?: string[];
  MaxNumberOfMessages?: number;
  VisibilityTimeout?: number;
  WaitTimeSeconds?: number;
  ReceiveRequestAttemptId?: string;
}
export type MessageSystemAttributeMap = { [key in MessageSystemAttributeName]?: string };
export type Binary = Uint8Array;
export type StringList = string[];
export type BinaryList = Uint8Array[];
export interface MessageAttributeValue {
  StringValue?: string;
  BinaryValue?: Uint8Array;
  StringListValues?: string[];
  BinaryListValues?: Uint8Array[];
  DataType: string;
}
export type MessageBodyAttributeMap = { [key: string]: MessageAttributeValue | undefined };
export interface Message {
  MessageId?: string;
  ReceiptHandle?: string;
  MD5OfBody?: string;
  Body?: string;
  Attributes?: { [key: string]: string | undefined };
  MD5OfMessageAttributes?: string;
  MessageAttributes?: { [key: string]: MessageAttributeValue | undefined };
}
export type MessageList = Message[];
export interface ReceiveMessageResult {
  Messages?: Message[];
}
export interface RemovePermissionRequest {
  QueueUrl: string;
  Label: string;
}
export interface RemovePermissionResponse {}
export type MessageSystemAttributeNameForSends = "AWSTraceHeader" | (string & {});
export interface MessageSystemAttributeValue {
  StringValue?: string;
  BinaryValue?: Uint8Array;
  StringListValues?: string[];
  BinaryListValues?: Uint8Array[];
  DataType: string;
}
export type MessageBodySystemAttributeMap = {
  [key in MessageSystemAttributeNameForSends]?: MessageSystemAttributeValue;
};
export interface SendMessageRequest {
  QueueUrl: string;
  MessageBody: string;
  DelaySeconds?: number;
  MessageAttributes?: { [key: string]: MessageAttributeValue | undefined };
  MessageSystemAttributes?: { [key: string]: MessageSystemAttributeValue | undefined };
  MessageDeduplicationId?: string;
  MessageGroupId?: string;
}
export interface SendMessageResult {
  MD5OfMessageBody?: string;
  MD5OfMessageAttributes?: string;
  MD5OfMessageSystemAttributes?: string;
  MessageId?: string;
  SequenceNumber?: string;
}
export interface SendMessageBatchRequestEntry {
  Id: string;
  MessageBody: string;
  DelaySeconds?: number;
  MessageAttributes?: { [key: string]: MessageAttributeValue | undefined };
  MessageSystemAttributes?: { [key: string]: MessageSystemAttributeValue | undefined };
  MessageDeduplicationId?: string;
  MessageGroupId?: string;
}
export type SendMessageBatchRequestEntryList = SendMessageBatchRequestEntry[];
export interface SendMessageBatchRequest {
  QueueUrl: string;
  Entries: SendMessageBatchRequestEntry[];
}
export interface SendMessageBatchResultEntry {
  Id: string;
  MessageId: string;
  MD5OfMessageBody: string;
  MD5OfMessageAttributes?: string;
  MD5OfMessageSystemAttributes?: string;
  SequenceNumber?: string;
}
export type SendMessageBatchResultEntryList = SendMessageBatchResultEntry[];
export interface SendMessageBatchResult {
  Successful?: SendMessageBatchResultEntry[];
  Failed?: BatchResultErrorEntry[];
}
export interface SetQueueAttributesRequest {
  QueueUrl: string;
  Attributes: { [key: string]: string | undefined };
}
export interface SetQueueAttributesResponse {}
export interface StartMessageMoveTaskRequest {
  SourceArn: string;
  DestinationArn?: string;
  MaxNumberOfMessagesPerSecond?: number;
}
export interface StartMessageMoveTaskResult {
  TaskHandle?: string;
}
export interface TagQueueRequest {
  QueueUrl: string;
  Tags: { [key: string]: string | undefined };
}
export interface TagQueueResponse {}
export type TagKeyList = string[];
export interface UntagQueueRequest {
  QueueUrl: string;
  TagKeys: string[];
}
export interface UntagQueueResponse {}
export type ExceptionMessage = string;
export type AddPermissionError =
  | InvalidAddress
  | InvalidSecurity
  | OverLimit
  | QueueDoesNotExist
  | RequestThrottled
  | UnsupportedOperation
  | CommonErrors;
/**
 * Adds a permission to a queue for a specific principal. This allows sharing
 * access to the queue.
 *
 * When you create a queue, you have full control access rights for the queue. Only you,
 * the owner of the queue, can grant or deny permissions to the queue. For more information
 * about these permissions, see Allow Developers to Write Messages to a Shared Queue in the Amazon SQS
 * Developer Guide.
 *
 * - `AddPermission` generates a policy for you. You can use
 *
 * SetQueueAttributes
 * to upload your
 * policy. For more information, see Using Custom Policies with the Amazon SQS Access Policy Language in
 * the *Amazon SQS Developer Guide*.
 *
 * - An Amazon SQS policy can have a maximum of seven actions per statement.
 *
 * - To remove the ability to change queue permissions, you must deny permission to the `AddPermission`, `RemovePermission`, and `SetQueueAttributes` actions in your IAM policy.
 *
 * - Amazon SQS `AddPermission` does not support adding a non-account
 * principal.
 *
 * Cross-account permissions don't apply to this action. For more information,
 * see Grant
 * cross-account permissions to a role and a username in the *Amazon SQS Developer Guide*.
 */
export const addPermission: API.OperationMethod<
  AddPermissionRequest,
  AddPermissionResponse,
  AddPermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<AddPermissionRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<AddPermissionResponse>,
  errors: [
    InvalidAddress,
    InvalidSecurity,
    OverLimit,
    QueueDoesNotExist,
    RequestThrottled,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddPermission",
}));

export type CancelMessageMoveTaskError =
  | InvalidAddress
  | InvalidSecurity
  | RequestThrottled
  | ResourceNotFoundException
  | UnsupportedOperation
  | RequestLimitExceeded
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Cancels a specified message movement task. A message movement can only be cancelled
 * when the current status is RUNNING. Cancelling a message movement task does not revert
 * the messages that have already been moved. It can only stop the messages that have not
 * been moved yet.
 *
 * - This action is currently limited to supporting message redrive from dead-letter queues (DLQs) only. In this context, the source
 * queue is the dead-letter queue (DLQ), while the destination queue can be the
 * original source queue (from which the messages were driven to the
 * dead-letter-queue), or a custom destination queue.
 *
 * - Only one active message movement task is supported per queue at any given
 * time.
 */
export const cancelMessageMoveTask: API.OperationMethod<
  CancelMessageMoveTaskRequest,
  CancelMessageMoveTaskResult,
  CancelMessageMoveTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(24, __c3, 0) as any as S.Schema<CancelMessageMoveTaskRequest>,
  output: __S(25, __c3, 1) as any as S.Schema<CancelMessageMoveTaskResult>,
  errors: [
    InvalidAddress,
    InvalidSecurity,
    RequestThrottled,
    ResourceNotFoundException,
    UnsupportedOperation,
    RequestLimitExceeded,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelMessageMoveTask",
}));

export type ChangeMessageVisibilityError =
  | InvalidAddress
  | InvalidSecurity
  | MessageNotInflight
  | QueueDoesNotExist
  | ReceiptHandleIsInvalid
  | RequestThrottled
  | UnsupportedOperation
  | CommonErrors;
/**
 * Changes the visibility timeout of a specified message in a queue to a new value. The
 * default visibility timeout for a message is 30 seconds. The minimum is 0 seconds. The
 * maximum is 12 hours. For more information, see Visibility Timeout in the Amazon SQS Developer
 * Guide.
 *
 * For example, if the default timeout for a queue is 60 seconds, 15 seconds have elapsed
 * since you received the message, and you send a ChangeMessageVisibility call with
 * `VisibilityTimeout` set to 10 seconds, the 10 seconds begin to count from
 * the time that you make the `ChangeMessageVisibility` call. Thus, any attempt
 * to change the visibility timeout or to delete that message 10 seconds after you
 * initially change the visibility timeout (a total of 25 seconds) might result in an
 * error.
 *
 * An Amazon SQS message has three basic states:
 *
 * - Sent to a queue by a producer.
 *
 * - Received from the queue by a consumer.
 *
 * - Deleted from the queue.
 *
 * A message is considered to be *stored* after it is sent to a queue by a producer, but not yet received from the queue by a consumer (that is, between states 1 and 2). There is no limit to the number of stored messages.
 * A message is considered to be *in flight* after it is received from a queue by a consumer, but not yet deleted from the queue (that is, between states 2 and 3). There is a limit to the number of in flight messages.
 *
 * Limits that apply to in flight messages are unrelated to the *unlimited* number of stored messages.
 *
 * For most standard queues (depending on queue traffic and message backlog), there can be a maximum of approximately 120,000 in flight messages (received from a queue by a consumer, but not yet deleted from the queue).
 * If you reach this limit, Amazon SQS returns the `OverLimit` error message.
 * To avoid reaching the limit, you should delete messages from the queue after they're processed. You can also increase the number of queues you use to process your messages.
 * To request a limit increase, file a support request.
 *
 * For FIFO queues, there can be a maximum of 120,000 in flight messages (received from a queue by a consumer, but not yet deleted from the queue). If you reach this limit, Amazon SQS returns no error messages.
 *
 * If you attempt to set the `VisibilityTimeout` to a value greater than
 * the maximum time left, Amazon SQS returns an error. Amazon SQS doesn't automatically
 * recalculate and increase the timeout to the maximum remaining time.
 *
 * Unlike with a queue, when you change the visibility timeout for a specific message
 * the timeout value is applied immediately but isn't saved in memory for that message.
 * If you don't delete a message after it is received, the visibility timeout for the
 * message reverts to the original timeout value (not to the value you set using the
 * `ChangeMessageVisibility` action) the next time the message is
 * received.
 */
export const changeMessageVisibility: API.OperationMethod<
  ChangeMessageVisibilityRequest,
  ChangeMessageVisibilityResponse,
  ChangeMessageVisibilityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c4, 0) as any as S.Schema<ChangeMessageVisibilityRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<ChangeMessageVisibilityResponse>,
  errors: [
    InvalidAddress,
    InvalidSecurity,
    MessageNotInflight,
    QueueDoesNotExist,
    ReceiptHandleIsInvalid,
    RequestThrottled,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ChangeMessageVisibility",
}));

export type ChangeMessageVisibilityBatchError =
  | BatchEntryIdsNotDistinct
  | EmptyBatchRequest
  | InvalidAddress
  | InvalidBatchEntryId
  | InvalidSecurity
  | QueueDoesNotExist
  | RequestThrottled
  | TooManyEntriesInBatchRequest
  | UnsupportedOperation
  | CommonErrors;
/**
 * Changes the visibility timeout of multiple messages. This is a batch version of
 *
 * ChangeMessageVisibility. The result of the action
 * on each message is reported individually in the response. You can send up to 10
 *
 * ChangeMessageVisibility
 * requests with each
 * `ChangeMessageVisibilityBatch` action.
 *
 * Because the batch request can result in a combination of successful and unsuccessful actions, you should check for batch errors even when the call returns an HTTP status code of `200`.
 */
export const changeMessageVisibilityBatch: API.OperationMethod<
  ChangeMessageVisibilityBatchRequest,
  ChangeMessageVisibilityBatchResult,
  ChangeMessageVisibilityBatchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(42, __c5, 2) as any as S.Schema<ChangeMessageVisibilityBatchRequest>,
  output: __S(43, __c5, 3) as any as S.Schema<ChangeMessageVisibilityBatchResult>,
  errors: [
    BatchEntryIdsNotDistinct,
    EmptyBatchRequest,
    InvalidAddress,
    InvalidBatchEntryId,
    InvalidSecurity,
    QueueDoesNotExist,
    RequestThrottled,
    TooManyEntriesInBatchRequest,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ChangeMessageVisibilityBatch",
}));

export type CreateQueueError =
  | InvalidAddress
  | InvalidAttributeName
  | InvalidAttributeValue
  | InvalidSecurity
  | QueueDeletedRecently
  | QueueNameExists
  | RequestThrottled
  | UnsupportedOperation
  | RequestLimitExceeded
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Creates a new standard or FIFO queue. You can pass one or more attributes in
 * the request. Keep the following in mind:
 *
 * - If you don't specify the `FifoQueue` attribute, Amazon SQS creates a standard queue.
 *
 * You can't change the queue type after you create it and you can't convert
 * an existing standard queue into a FIFO queue. You must either create a new
 * FIFO queue for your application or delete your existing standard queue and
 * recreate it as a FIFO queue. For more information, see Moving From a standard queue to a FIFO queue in the
 * *Amazon SQS Developer Guide*.
 *
 * - If you don't provide a value for an attribute, the queue is created with the
 * default value for the attribute.
 *
 * - If you delete a queue, you must wait at least 60 seconds before creating a
 * queue with the same name.
 *
 * To successfully create a new queue, you must provide a queue name that adheres to the
 * limits
 * related to queues and is unique within the scope of your queues.
 *
 * After you create a queue, you must wait at least one second after the queue is
 * created to be able to use the queue.
 *
 * To retrieve the URL of a queue, use the
 * `GetQueueUrl`
 * action. This action only requires the
 * `QueueName`
 * parameter.
 *
 * When creating queues, keep the following points in mind:
 *
 * - If you specify the name of an existing queue and provide the exact same names
 * and values for all its attributes, the
 * `CreateQueue`
 * action will return the URL of the
 * existing queue instead of creating a new one.
 *
 * - If you attempt to create a queue with a name that already exists but with
 * different attribute names or values, the `CreateQueue` action will
 * return an error. This ensures that existing queues are not inadvertently
 * altered.
 *
 * Cross-account permissions don't apply to this action. For more information,
 * see Grant
 * cross-account permissions to a role and a username in the *Amazon SQS Developer Guide*.
 */
export const createQueue: API.OperationMethod<
  CreateQueueRequest,
  CreateQueueResult,
  CreateQueueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c8, 0) as any as S.Schema<CreateQueueRequest>,
  output: __S(80, __c10, 0) as any as S.Schema<CreateQueueResult>,
  errors: [
    InvalidAddress,
    InvalidAttributeName,
    InvalidAttributeValue,
    InvalidSecurity,
    QueueDeletedRecently,
    QueueNameExists,
    RequestThrottled,
    UnsupportedOperation,
    RequestLimitExceeded,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateQueue",
}));

export type DeleteMessageError =
  | InvalidAddress
  | InvalidIdFormat
  | InvalidSecurity
  | QueueDoesNotExist
  | ReceiptHandleIsInvalid
  | RequestThrottled
  | UnsupportedOperation
  | CommonErrors;
/**
 * Deletes the specified message from the specified queue. To select the message to
 * delete, use the `ReceiptHandle` of the message (*not* the
 * `MessageId` which you receive when you send the message). Amazon SQS can
 * delete a message from a queue even if a visibility timeout setting causes the message to
 * be locked by another consumer. Amazon SQS automatically deletes messages left in a queue
 * longer than the retention period configured for the queue.
 *
 * Each time you receive a message, meaning when a consumer retrieves a message from
 * the queue, it comes with a unique `ReceiptHandle`. If you receive the
 * same message more than once, you will get a different `ReceiptHandle`
 * each time. When you want to delete a message using the `DeleteMessage`
 * action, you must use the `ReceiptHandle` from the most recent time you
 * received the message. If you use an old `ReceiptHandle`, the request will
 * succeed, but the message might not be deleted.
 *
 * For standard queues, it is possible to receive a message even after you
 * delete it. This might happen on rare occasions if one of the servers which stores a
 * copy of the message is unavailable when you send the request to delete the message.
 * The copy remains on the server and might be returned to you during a subsequent
 * receive request. You should ensure that your application is idempotent, so that
 * receiving a message more than once does not cause issues.
 */
export const deleteMessage: API.OperationMethod<
  DeleteMessageRequest,
  DeleteMessageResponse,
  DeleteMessageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c12, 0) as any as S.Schema<DeleteMessageRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<DeleteMessageResponse>,
  errors: [
    InvalidAddress,
    InvalidIdFormat,
    InvalidSecurity,
    QueueDoesNotExist,
    ReceiptHandleIsInvalid,
    RequestThrottled,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMessage",
}));

export type DeleteMessageBatchError =
  | BatchEntryIdsNotDistinct
  | EmptyBatchRequest
  | InvalidAddress
  | InvalidBatchEntryId
  | InvalidSecurity
  | QueueDoesNotExist
  | RequestThrottled
  | TooManyEntriesInBatchRequest
  | UnsupportedOperation
  | CommonErrors;
/**
 * Deletes up to ten messages from the specified queue. This is a batch version of
 *
 * DeleteMessage. The result of the action on each
 * message is reported individually in the response.
 *
 * Because the batch request can result in a combination of successful and unsuccessful actions, you should check for batch errors even when the call returns an HTTP status code of `200`.
 */
export const deleteMessageBatch: API.OperationMethod<
  DeleteMessageBatchRequest,
  DeleteMessageBatchResult,
  DeleteMessageBatchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(106, __c13, 2) as any as S.Schema<DeleteMessageBatchRequest>,
  output: __S(107, __c13, 3) as any as S.Schema<DeleteMessageBatchResult>,
  errors: [
    BatchEntryIdsNotDistinct,
    EmptyBatchRequest,
    InvalidAddress,
    InvalidBatchEntryId,
    InvalidSecurity,
    QueueDoesNotExist,
    RequestThrottled,
    TooManyEntriesInBatchRequest,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMessageBatch",
}));

export type DeleteQueueError =
  | InvalidAddress
  | InvalidSecurity
  | QueueDoesNotExist
  | RequestThrottled
  | UnsupportedOperation
  | CommonErrors;
/**
 * Deletes the queue specified by the `QueueUrl`, regardless of the queue's
 * contents.
 *
 * Be careful with the `DeleteQueue` action: When you delete a queue, any
 * messages in the queue are no longer available.
 *
 * When you delete a queue, the deletion process takes up to 60 seconds. Requests you
 * send involving that queue during the 60 seconds might succeed. For example, a
 *
 * SendMessage
 * request might succeed, but after 60
 * seconds the queue and the message you sent no longer exist.
 *
 * When you delete a queue, you must wait at least 60 seconds before creating a queue
 * with the same name.
 *
 * Cross-account permissions don't apply to this action. For more information,
 * see Grant
 * cross-account permissions to a role and a username in the *Amazon SQS Developer Guide*.
 *
 * The delete operation uses the HTTP `GET` verb.
 */
export const deleteQueue: API.OperationMethod<
  DeleteQueueRequest,
  DeleteQueueResponse,
  DeleteQueueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c14, 0) as any as S.Schema<DeleteQueueRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<DeleteQueueResponse>,
  errors: [
    InvalidAddress,
    InvalidSecurity,
    QueueDoesNotExist,
    RequestThrottled,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteQueue",
}));

export type GetQueueAttributesError =
  | InvalidAddress
  | InvalidAttributeName
  | InvalidSecurity
  | QueueDoesNotExist
  | RequestThrottled
  | UnsupportedOperation
  | CommonErrors;
/**
 * Gets attributes for the specified queue.
 *
 * To determine whether a queue is FIFO, you can check whether `QueueName` ends with the `.fifo` suffix.
 */
export const getQueueAttributes: API.OperationMethod<
  GetQueueAttributesRequest,
  GetQueueAttributesResult,
  GetQueueAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(120, __c15, 0) as any as S.Schema<GetQueueAttributesRequest>,
  output: __S(121, __c15, 1) as any as S.Schema<GetQueueAttributesResult>,
  errors: [
    InvalidAddress,
    InvalidAttributeName,
    InvalidSecurity,
    QueueDoesNotExist,
    RequestThrottled,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQueueAttributes",
}));

export type GetQueueUrlError =
  | InvalidAddress
  | InvalidSecurity
  | QueueDoesNotExist
  | RequestThrottled
  | UnsupportedOperation
  | CommonErrors;
/**
 * The `GetQueueUrl` API returns the URL of an existing Amazon SQS queue. This is
 * useful when you know the queue's name but need to retrieve its URL for further
 * operations.
 *
 * To access a queue owned by another Amazon Web Services account, use the
 * `QueueOwnerAWSAccountId` parameter to specify the account ID of the
 * queue's owner. Note that the queue owner must grant you the necessary permissions to
 * access the queue. For more information about accessing shared queues, see the
 *
 * AddPermission
 * API or Allow developers to write messages to a shared queue in the Amazon SQS
 * Developer Guide.
 */
export const getQueueUrl: API.OperationMethod<
  GetQueueUrlRequest,
  GetQueueUrlResult,
  GetQueueUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(136, __c17, 0) as any as S.Schema<GetQueueUrlRequest>,
  output: __S(80, __c10, 0) as any as S.Schema<GetQueueUrlResult>,
  errors: [
    InvalidAddress,
    InvalidSecurity,
    QueueDoesNotExist,
    RequestThrottled,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQueueUrl",
}));

export type ListDeadLetterSourceQueuesError =
  | InvalidAddress
  | InvalidSecurity
  | QueueDoesNotExist
  | RequestThrottled
  | UnsupportedOperation
  | CommonErrors;
/**
 * Returns a list of your queues that have the `RedrivePolicy` queue attribute
 * configured with a dead-letter queue.
 *
 * The `ListDeadLetterSourceQueues` methods supports pagination. Set
 * parameter `MaxResults` in the request to specify the maximum number of
 * results to be returned in the response. If you do not set `MaxResults`, the
 * response includes a maximum of 1,000 results. If you set `MaxResults` and
 * there are additional results to display, the response includes a value for
 * `NextToken`. Use `NextToken` as a parameter in your next
 * request to `ListDeadLetterSourceQueues` to receive the next page of results.
 *
 * For more information about using dead-letter queues, see Using Amazon SQS Dead-Letter Queues in the Amazon SQS Developer
 * Guide.
 */
export const listDeadLetterSourceQueues: API.PaginatedOperationMethod<
  ListDeadLetterSourceQueuesRequest,
  ListDeadLetterSourceQueuesResult,
  ListDeadLetterSourceQueuesError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(144, __c18, 0) as any as S.Schema<ListDeadLetterSourceQueuesRequest>,
  output: __S(145, __c18, 1) as any as S.Schema<ListDeadLetterSourceQueuesResult>,
  errors: [
    InvalidAddress,
    InvalidSecurity,
    QueueDoesNotExist,
    RequestThrottled,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeadLetterSourceQueues",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "queueUrls",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMessageMoveTasksError =
  | InvalidAddress
  | InvalidSecurity
  | RequestThrottled
  | ResourceNotFoundException
  | UnsupportedOperation
  | RequestLimitExceeded
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Gets the most recent message movement tasks (up to 10) under a specific source
 * queue.
 *
 * - This action is currently limited to supporting message redrive from dead-letter queues (DLQs) only. In this context, the source
 * queue is the dead-letter queue (DLQ), while the destination queue can be the
 * original source queue (from which the messages were driven to the
 * dead-letter-queue), or a custom destination queue.
 *
 * - Only one active message movement task is supported per queue at any given
 * time.
 */
export const listMessageMoveTasks: API.OperationMethod<
  ListMessageMoveTasksRequest,
  ListMessageMoveTasksResult,
  ListMessageMoveTasksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(152, __c19, 0) as any as S.Schema<ListMessageMoveTasksRequest>,
  output: __S(155, __c19, 3) as any as S.Schema<ListMessageMoveTasksResult>,
  errors: [
    InvalidAddress,
    InvalidSecurity,
    RequestThrottled,
    ResourceNotFoundException,
    UnsupportedOperation,
    RequestLimitExceeded,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMessageMoveTasks",
}));

export type ListQueuesError =
  | InvalidAddress
  | InvalidSecurity
  | RequestThrottled
  | UnsupportedOperation
  | CommonErrors;
/**
 * Returns a list of your queues in the current region. The response includes a maximum
 * of 1,000 results. If you specify a value for the optional `QueueNamePrefix`
 * parameter, only queues with a name that begins with the specified value are
 * returned.
 *
 * The `listQueues` methods supports pagination. Set parameter
 * `MaxResults` in the request to specify the maximum number of results to
 * be returned in the response. If you do not set `MaxResults`, the response
 * includes a maximum of 1,000 results. If you set `MaxResults` and there are
 * additional results to display, the response includes a value for `NextToken`.
 * Use `NextToken` as a parameter in your next request to
 * `listQueues` to receive the next page of results.
 *
 * Cross-account permissions don't apply to this action. For more information,
 * see Grant
 * cross-account permissions to a role and a username in the *Amazon SQS Developer Guide*.
 */
export const listQueues: API.PaginatedOperationMethod<
  ListQueuesRequest,
  ListQueuesResult,
  ListQueuesError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(160, __c20, 0) as any as S.Schema<ListQueuesRequest>,
  output: __S(161, __c20, 1) as any as S.Schema<ListQueuesResult>,
  errors: [InvalidAddress, InvalidSecurity, RequestThrottled, UnsupportedOperation],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListQueues",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "QueueUrls",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListQueueTagsError =
  | InvalidAddress
  | InvalidSecurity
  | QueueDoesNotExist
  | RequestThrottled
  | UnsupportedOperation
  | CommonErrors;
/**
 * List all cost allocation tags added to the specified Amazon SQS queue.
 * For an overview, see Tagging
 * Your Amazon SQS Queues in the *Amazon SQS Developer Guide*.
 *
 * Cross-account permissions don't apply to this action. For more information,
 * see Grant
 * cross-account permissions to a role and a username in the *Amazon SQS Developer Guide*.
 */
export const listQueueTags: API.OperationMethod<
  ListQueueTagsRequest,
  ListQueueTagsResult,
  ListQueueTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(168, __c21, 0) as any as S.Schema<ListQueueTagsRequest>,
  output: __S(169, __c21, 1) as any as S.Schema<ListQueueTagsResult>,
  errors: [
    InvalidAddress,
    InvalidSecurity,
    QueueDoesNotExist,
    RequestThrottled,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListQueueTags",
}));

export type PurgeQueueError =
  | InvalidAddress
  | InvalidSecurity
  | PurgeQueueInProgress
  | QueueDoesNotExist
  | RequestThrottled
  | UnsupportedOperation
  | CommonErrors;
/**
 * Deletes available messages in a queue (including in-flight messages) specified by the
 * `QueueURL` parameter.
 *
 * When you use the `PurgeQueue` action, you can't retrieve any messages
 * deleted from a queue.
 *
 * The message deletion process takes up to 60 seconds. We recommend waiting for 60
 * seconds regardless of your queue's size.
 *
 * Messages sent to the queue *before* you call
 * `PurgeQueue` might be received but are deleted within the next
 * minute.
 *
 * Messages sent to the queue *after* you call `PurgeQueue`
 * might be deleted while the queue is being purged.
 */
export const purgeQueue: API.OperationMethod<
  PurgeQueueRequest,
  PurgeQueueResponse,
  PurgeQueueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c22, 0) as any as S.Schema<PurgeQueueRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<PurgeQueueResponse>,
  errors: [
    InvalidAddress,
    InvalidSecurity,
    PurgeQueueInProgress,
    QueueDoesNotExist,
    RequestThrottled,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PurgeQueue",
}));

export type ReceiveMessageError =
  | InvalidAddress
  | InvalidSecurity
  | KmsAccessDenied
  | KmsDisabled
  | KmsInvalidKeyUsage
  | KmsInvalidState
  | KmsNotFound
  | KmsOptInRequired
  | KmsThrottled
  | OverLimit
  | QueueDoesNotExist
  | RequestThrottled
  | UnsupportedOperation
  | RequestLimitExceeded
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Retrieves one or more messages (up to 10), from the specified queue. Using the
 * `WaitTimeSeconds` parameter enables long-poll support. For more
 * information, see Amazon SQS
 * Long Polling in the *Amazon SQS Developer Guide*.
 *
 * Short poll is the default behavior where a weighted random set of machines is sampled
 * on a `ReceiveMessage` call. Therefore, only the messages on the sampled
 * machines are returned. If the number of messages in the queue is small (fewer than
 * 1,000), you most likely get fewer messages than you requested per
 * `ReceiveMessage` call. If the number of messages in the queue is
 * extremely small, you might not receive any messages in a particular
 * `ReceiveMessage` response. If this happens, repeat the request.
 *
 * For each message returned, the response includes the following:
 *
 * - The message body.
 *
 * - An MD5 digest of the message body. For information about MD5, see RFC1321.
 *
 * - The `MessageId` you received when you sent the message to the
 * queue.
 *
 * - The receipt handle.
 *
 * - The message attributes.
 *
 * - An MD5 digest of the message attributes.
 *
 * The receipt handle is the identifier you must provide when deleting the message. For
 * more information, see Queue and Message Identifiers in the Amazon SQS Developer
 * Guide.
 *
 * You can provide the `VisibilityTimeout` parameter in your request. The
 * parameter is applied to the messages that Amazon SQS returns in the response. If you don't
 * include the parameter, the overall visibility timeout for the queue is used for the
 * returned messages. The default visibility timeout for a queue is 30 seconds.
 *
 * In the future, new attributes might be added. If you write code that calls this action, we recommend that you structure your code so that it can handle new attributes gracefully.
 */
export const receiveMessage: API.OperationMethod<
  ReceiveMessageRequest,
  ReceiveMessageResult,
  ReceiveMessageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(184, __c23, 0) as any as S.Schema<ReceiveMessageRequest>,
  output: __S(187, __c23, 3) as any as S.Schema<ReceiveMessageResult>,
  errors: [
    InvalidAddress,
    InvalidSecurity,
    KmsAccessDenied,
    KmsDisabled,
    KmsInvalidKeyUsage,
    KmsInvalidState,
    KmsNotFound,
    KmsOptInRequired,
    KmsThrottled,
    OverLimit,
    QueueDoesNotExist,
    RequestThrottled,
    UnsupportedOperation,
    RequestLimitExceeded,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ReceiveMessage",
}));

export type RemovePermissionError =
  | InvalidAddress
  | InvalidSecurity
  | QueueDoesNotExist
  | RequestThrottled
  | UnsupportedOperation
  | CommonErrors;
/**
 * Revokes any permissions in the queue policy that matches the specified
 * `Label` parameter.
 *
 * - Only the owner of a queue can remove permissions from it.
 *
 * - Cross-account permissions don't apply to this action. For more information,
 * see Grant
 * cross-account permissions to a role and a username in the *Amazon SQS Developer Guide*.
 *
 * - To remove the ability to change queue permissions, you must deny permission to the `AddPermission`, `RemovePermission`, and `SetQueueAttributes` actions in your IAM policy.
 */
export const removePermission: API.OperationMethod<
  RemovePermissionRequest,
  RemovePermissionResponse,
  RemovePermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(200, __c25, 0) as any as S.Schema<RemovePermissionRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<RemovePermissionResponse>,
  errors: [
    InvalidAddress,
    InvalidSecurity,
    QueueDoesNotExist,
    RequestThrottled,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemovePermission",
}));

export type SendMessageError =
  | InvalidAddress
  | InvalidMessageContents
  | InvalidSecurity
  | KmsAccessDenied
  | KmsDisabled
  | KmsInvalidKeyUsage
  | KmsInvalidState
  | KmsNotFound
  | KmsOptInRequired
  | KmsThrottled
  | QueueDoesNotExist
  | RequestThrottled
  | UnsupportedOperation
  | RequestLimitExceeded
  | InvalidParameterValueException
  | MissingRequiredParameterException
  | CommonErrors;
/**
 * Delivers a message to the specified queue.
 *
 * A message can include only XML, JSON, and unformatted text. The following Unicode characters are allowed. For more information, see the W3C specification for characters.
 *
 * `#x9` | `#xA` | `#xD` | `#x20` to `#xD7FF` | `#xE000` to `#xFFFD` | `#x10000` to `#x10FFFF`
 *
 * If a message contains characters outside the allowed set, Amazon SQS rejects the message and returns an InvalidMessageContents error. Ensure that your message body includes only valid characters to avoid this exception.
 */
export const sendMessage: API.OperationMethod<
  SendMessageRequest,
  SendMessageResult,
  SendMessageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c26, 0) as any as S.Schema<SendMessageRequest>,
  output: __S(209, __c26, 1) as any as S.Schema<SendMessageResult>,
  errors: [
    InvalidAddress,
    InvalidMessageContents,
    InvalidSecurity,
    KmsAccessDenied,
    KmsDisabled,
    KmsInvalidKeyUsage,
    KmsInvalidState,
    KmsNotFound,
    KmsOptInRequired,
    KmsThrottled,
    QueueDoesNotExist,
    RequestThrottled,
    UnsupportedOperation,
    RequestLimitExceeded,
    InvalidParameterValueException,
    MissingRequiredParameterException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendMessage",
}));

export type SendMessageBatchError =
  | BatchEntryIdsNotDistinct
  | BatchRequestTooLong
  | EmptyBatchRequest
  | InvalidAddress
  | InvalidBatchEntryId
  | InvalidSecurity
  | KmsAccessDenied
  | KmsDisabled
  | KmsInvalidKeyUsage
  | KmsInvalidState
  | KmsNotFound
  | KmsOptInRequired
  | KmsThrottled
  | QueueDoesNotExist
  | RequestThrottled
  | TooManyEntriesInBatchRequest
  | UnsupportedOperation
  | RequestLimitExceeded
  | InvalidParameterValueException
  | ParseError
  | CommonErrors;
/**
 * You can use `SendMessageBatch` to send up to 10 messages to the specified
 * queue by assigning either identical or different values to each message (or by not
 * assigning values at all). This is a batch version of
 * SendMessage. For a FIFO queue, multiple messages within a single batch are enqueued
 * in the order they are sent.
 *
 * The result of sending each message is reported individually in the response.
 * Because the batch request can result in a combination of successful and unsuccessful actions, you should check for batch errors even when the call returns an HTTP status code of `200`.
 *
 * The maximum allowed individual message size and the maximum total payload size (the
 * sum of the individual lengths of all of the batched messages) are both 1 MiB
 * 1,048,576 bytes.
 *
 * A message can include only XML, JSON, and unformatted text. The following Unicode characters are allowed. For more information, see the W3C specification for characters.
 *
 * `#x9` | `#xA` | `#xD` | `#x20` to `#xD7FF` | `#xE000` to `#xFFFD` | `#x10000` to `#x10FFFF`
 *
 * If a message contains characters outside the allowed set, Amazon SQS rejects the message and returns an InvalidMessageContents error. Ensure that your message body includes only valid characters to avoid this exception.
 *
 * If you don't specify the `DelaySeconds` parameter for an entry, Amazon SQS uses
 * the default value for the queue.
 */
export const sendMessageBatch: API.OperationMethod<
  SendMessageBatchRequest,
  SendMessageBatchResult,
  SendMessageBatchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(226, __c28, 2) as any as S.Schema<SendMessageBatchRequest>,
  output: __S(229, __c28, 5) as any as S.Schema<SendMessageBatchResult>,
  errors: [
    BatchEntryIdsNotDistinct,
    BatchRequestTooLong,
    EmptyBatchRequest,
    InvalidAddress,
    InvalidBatchEntryId,
    InvalidSecurity,
    KmsAccessDenied,
    KmsDisabled,
    KmsInvalidKeyUsage,
    KmsInvalidState,
    KmsNotFound,
    KmsOptInRequired,
    KmsThrottled,
    QueueDoesNotExist,
    RequestThrottled,
    TooManyEntriesInBatchRequest,
    UnsupportedOperation,
    RequestLimitExceeded,
    InvalidParameterValueException,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendMessageBatch",
}));

export type SetQueueAttributesError =
  | InvalidAddress
  | InvalidAttributeName
  | InvalidAttributeValue
  | InvalidSecurity
  | OverLimit
  | QueueDoesNotExist
  | RequestThrottled
  | UnsupportedOperation
  | InvalidParameterValueException
  | RequestLimitExceeded
  | CommonServiceException
  | MissingRequiredParameterException
  | CommonErrors;
/**
 * Sets the value of one or more queue attributes, like a policy. When you change a
 * queue's attributes, the change can take up to 60 seconds for most of the attributes to
 * propagate throughout the Amazon SQS system. Changes made to the
 * `MessageRetentionPeriod` attribute can take up to 15 minutes and will
 * impact existing messages in the queue potentially causing them to be expired and deleted
 * if the `MessageRetentionPeriod` is reduced below the age of existing
 * messages.
 *
 * - In the future, new attributes might be added. If you write code that calls this action, we recommend that you structure your code so that it can handle new attributes gracefully.
 *
 * - Cross-account permissions don't apply to this action. For more information,
 * see Grant
 * cross-account permissions to a role and a username in the *Amazon SQS Developer Guide*.
 *
 * - To remove the ability to change queue permissions, you must deny permission to the `AddPermission`, `RemovePermission`, and `SetQueueAttributes` actions in your IAM policy.
 */
export const setQueueAttributes: API.OperationMethod<
  SetQueueAttributesRequest,
  SetQueueAttributesResponse,
  SetQueueAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(232, __c29, 0) as any as S.Schema<SetQueueAttributesRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<SetQueueAttributesResponse>,
  errors: [
    InvalidAddress,
    InvalidAttributeName,
    InvalidAttributeValue,
    InvalidSecurity,
    OverLimit,
    QueueDoesNotExist,
    RequestThrottled,
    UnsupportedOperation,
    InvalidParameterValueException,
    RequestLimitExceeded,
    CommonServiceException,
    MissingRequiredParameterException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetQueueAttributes",
}));

export type StartMessageMoveTaskError =
  | InvalidAddress
  | InvalidSecurity
  | RequestThrottled
  | ResourceNotFoundException
  | UnsupportedOperation
  | RequestLimitExceeded
  | CommonServiceException
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Starts an asynchronous task to move messages from a specified source queue to a
 * specified destination queue.
 *
 * - This action is currently limited to supporting message redrive from queues
 * that are configured as dead-letter queues (DLQs) of other Amazon SQS queues only. Non-SQS
 * queue sources of dead-letter queues, such as Lambda or Amazon SNS topics, are
 * currently not supported.
 *
 * - In dead-letter queues redrive context, the
 * `StartMessageMoveTask` the source queue is the DLQ, while the
 * destination queue can be the original source queue (from which the messages
 * were driven to the dead-letter-queue), or a custom destination queue.
 *
 * - Only one active message movement task is supported per queue at any given
 * time.
 */
export const startMessageMoveTask: API.OperationMethod<
  StartMessageMoveTaskRequest,
  StartMessageMoveTaskResult,
  StartMessageMoveTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c30, 0) as any as S.Schema<StartMessageMoveTaskRequest>,
  output: __S(241, __c30, 1) as any as S.Schema<StartMessageMoveTaskResult>,
  errors: [
    InvalidAddress,
    InvalidSecurity,
    RequestThrottled,
    ResourceNotFoundException,
    UnsupportedOperation,
    RequestLimitExceeded,
    CommonServiceException,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMessageMoveTask",
}));

export type TagQueueError =
  | InvalidAddress
  | InvalidSecurity
  | QueueDoesNotExist
  | RequestThrottled
  | UnsupportedOperation
  | CommonErrors;
/**
 * Add cost allocation tags to the specified Amazon SQS queue. For an overview, see Tagging
 * Your Amazon SQS Queues in the *Amazon SQS Developer Guide*.
 *
 * When you use queue tags, keep the following guidelines in mind:
 *
 * - Adding more than 50 tags to a queue isn't recommended.
 *
 * - Tags don't have any semantic meaning. Amazon SQS interprets tags as character strings.
 *
 * - Tags are case-sensitive.
 *
 * - A new tag with a key identical to that of an existing tag overwrites the existing tag.
 *
 * For a full list of tag restrictions, see
 * Quotas related to queues
 * in the *Amazon SQS Developer Guide*.
 *
 * Cross-account permissions don't apply to this action. For more information,
 * see Grant
 * cross-account permissions to a role and a username in the *Amazon SQS Developer Guide*.
 */
export const tagQueue: API.OperationMethod<
  TagQueueRequest,
  TagQueueResponse,
  TagQueueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(248, __c31, 0) as any as S.Schema<TagQueueRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<TagQueueResponse>,
  errors: [
    InvalidAddress,
    InvalidSecurity,
    QueueDoesNotExist,
    RequestThrottled,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagQueue",
}));

export type UntagQueueError =
  | InvalidAddress
  | InvalidSecurity
  | QueueDoesNotExist
  | RequestThrottled
  | UnsupportedOperation
  | CommonErrors;
/**
 * Remove cost allocation tags from the specified Amazon SQS queue. For an overview, see Tagging
 * Your Amazon SQS Queues in the *Amazon SQS Developer Guide*.
 *
 * Cross-account permissions don't apply to this action. For more information,
 * see Grant
 * cross-account permissions to a role and a username in the *Amazon SQS Developer Guide*.
 */
export const untagQueue: API.OperationMethod<
  UntagQueueRequest,
  UntagQueueResponse,
  UntagQueueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c32, 0) as any as S.Schema<UntagQueueRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<UntagQueueResponse>,
  errors: [
    InvalidAddress,
    InvalidSecurity,
    QueueDoesNotExist,
    RequestThrottled,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagQueue",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          QueueUrl: S.String,
          Label: S.String,
          AWSAccountIds: __S(16, __c2, 0).pipe(T.XmlName("AWSAccountId"), T.XmlFlattened()),
          Actions: __S(16, __c2, 0).pipe(T.XmlName("ActionName"), T.XmlFlattened()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AddPermissionRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "AddPermissionResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TaskHandle: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CancelMessageMoveTaskRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ApproximateNumberOfMessagesMoved: S.optional(S.Number) }),
      ).annotate({ identifier: "CancelMessageMoveTaskResult" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ QueueUrl: S.String, ReceiptHandle: S.String, VisibilityTimeout: S.Number }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ChangeMessageVisibilityRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          ReceiptHandle: S.String,
          VisibilityTimeout: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ChangeMessageVisibilityBatchRequestEntry" });
    case 1:
      return S.Array(__S(40, __c5, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          QueueUrl: S.String,
          Entries: __S(41, __c5, 1).pipe(
            T.XmlName("ChangeMessageVisibilityBatchRequestEntry"),
            T.XmlFlattened(),
          ),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ChangeMessageVisibilityBatchRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Successful: S.optional(__S(49, __c6, 1)).pipe(
            T.XmlName("ChangeMessageVisibilityBatchResultEntry"),
            T.XmlFlattened(),
          ),
          Failed: S.optional(__S(57, __c7, 1)).pipe(
            T.XmlName("BatchResultErrorEntry"),
            T.XmlFlattened(),
          ),
        }),
      ).annotate({ identifier: "ChangeMessageVisibilityBatchResult" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Id: S.String })).annotate({
        identifier: "ChangeMessageVisibilityBatchResultEntry",
      });
    case 1:
      return S.Array(__S(48, __c6, 0));
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          SenderFault: S.Boolean,
          Code: S.String,
          Message: S.optional(S.String),
        }),
      ).annotate({ identifier: "BatchResultErrorEntry" });
    case 1:
      return S.Array(__S(56, __c7, 0));
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          QueueName: S.String,
          Attributes: S.optional(__S(72, __c9, 0)).pipe(T.XmlName("Attribute"), T.XmlFlattened()),
          tags: S.optional(__S(88, __c11, 0)).pipe(T.XmlName("Tag"), T.XmlFlattened()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateQueueRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.Record(
        /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("Name")),
        /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("Value")).pipe(S.optional),
      );
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ QueueUrl: S.optional(S.String) })).annotate({
        identifier: "CreateQueueResult",
      });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.Record(
        /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("Key")),
        /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("Value")).pipe(S.optional),
      );
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ QueueUrl: S.String, ReceiptHandle: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteMessageRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Id: S.String, ReceiptHandle: S.String })).annotate({
        identifier: "DeleteMessageBatchRequestEntry",
      });
    case 1:
      return S.Array(__S(104, __c13, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          QueueUrl: S.String,
          Entries: __S(105, __c13, 1).pipe(
            T.XmlName("DeleteMessageBatchRequestEntry"),
            T.XmlFlattened(),
          ),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteMessageBatchRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Successful: S.optional(__S(49, __c6, 1)).pipe(
            T.XmlName("DeleteMessageBatchResultEntry"),
            T.XmlFlattened(),
          ),
          Failed: S.optional(__S(57, __c7, 1)).pipe(
            T.XmlName("BatchResultErrorEntry"),
            T.XmlFlattened(),
          ),
        }),
      ).annotate({ identifier: "DeleteMessageBatchResult" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ QueueUrl: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteQueueRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          QueueUrl: S.String,
          AttributeNames: S.optional(__S(128, __c16, 0)).pipe(
            T.XmlName("AttributeName"),
            T.XmlFlattened(),
          ),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetQueueAttributesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Attributes: S.optional(__S(72, __c9, 0)).pipe(T.XmlName("Attribute"), T.XmlFlattened()),
        }),
      ).annotate({ identifier: "GetQueueAttributesResult" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ QueueName: S.String, QueueOwnerAWSAccountId: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetQueueUrlRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          QueueUrl: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDeadLetterSourceQueuesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          queueUrls: __S(16, __c2, 0).pipe(T.XmlName("QueueUrl"), T.XmlFlattened()),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListDeadLetterSourceQueuesResult" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SourceArn: S.String, MaxResults: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListMessageMoveTasksRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TaskHandle: S.optional(S.String),
          Status: S.optional(S.String),
          SourceArn: S.optional(S.String),
          DestinationArn: S.optional(S.String),
          MaxNumberOfMessagesPerSecond: S.optional(S.Number),
          ApproximateNumberOfMessagesMoved: S.optional(S.Number),
          ApproximateNumberOfMessagesToMove: S.optional(S.Number),
          FailureReason: S.optional(S.String),
          StartedTimestamp: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ListMessageMoveTasksResultEntry" });
    case 2:
      return S.Array(__S(153, __c19, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Results: S.optional(__S(154, __c19, 2)).pipe(
            T.XmlName("ListMessageMoveTasksResultEntry"),
            T.XmlFlattened(),
          ),
        }).pipe(T.XmlName("ListMessageMoveTasksResult")),
      ).annotate({ identifier: "ListMessageMoveTasksResult" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          QueueNamePrefix: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListQueuesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          QueueUrls: S.optional(__S(16, __c2, 0)).pipe(T.XmlName("QueueUrl"), T.XmlFlattened()),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListQueuesResult" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ QueueUrl: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListQueueTagsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Tags: S.optional(__S(88, __c11, 0)).pipe(T.XmlName("Tag"), T.XmlFlattened()) }),
      ).annotate({ identifier: "ListQueueTagsResult" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ QueueUrl: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PurgeQueueRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          QueueUrl: S.String,
          AttributeNames: S.optional(__S(128, __c16, 0)).pipe(
            T.XmlName("AttributeName"),
            T.XmlFlattened(),
          ),
          MessageSystemAttributeNames: S.optional(__S(128, __c16, 0)).pipe(
            T.XmlName("AttributeName"),
            T.XmlFlattened(),
          ),
          MessageAttributeNames: S.optional(__S(16, __c2, 0)).pipe(
            T.XmlName("MessageAttributeName"),
            T.XmlFlattened(),
          ),
          MaxNumberOfMessages: S.optional(S.Number),
          VisibilityTimeout: S.optional(S.Number),
          WaitTimeSeconds: S.optional(S.Number),
          ReceiveRequestAttemptId: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ReceiveMessageRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          MessageId: S.optional(S.String),
          ReceiptHandle: S.optional(S.String),
          MD5OfBody: S.optional(S.String),
          Body: S.optional(S.String),
          Attributes: S.optional(__S(72, __c9, 0)).pipe(T.XmlName("Attribute"), T.XmlFlattened()),
          MD5OfMessageAttributes: S.optional(S.String),
          MessageAttributes: S.optional(__S(195, __c24, 3)).pipe(
            T.XmlName("MessageAttribute"),
            T.XmlFlattened(),
          ),
        }),
      ).annotate({ identifier: "Message" });
    case 2:
      return S.Array(__S(185, __c23, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Messages: S.optional(__S(186, __c23, 2)).pipe(T.XmlName("Message"), T.XmlFlattened()),
        }),
      ).annotate({ identifier: "ReceiveMessageResult" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("StringListValue")));
    case 1:
      return S.Array(/*@__PURE__*/ T.Blob.pipe(/*@__PURE__*/ T.XmlName("BinaryListValue")));
    case 2:
      return S.suspend(() =>
        S.Struct({
          StringValue: S.optional(S.String),
          BinaryValue: S.optional(T.Blob),
          StringListValues: S.optional(__S(192, __c24, 0)).pipe(
            T.XmlName("StringListValue"),
            T.XmlFlattened(),
          ),
          BinaryListValues: S.optional(__S(193, __c24, 1)).pipe(
            T.XmlName("BinaryListValue"),
            T.XmlFlattened(),
          ),
          DataType: S.String,
        }),
      ).annotate({ identifier: "MessageAttributeValue" });
    case 3:
      return S.Record(
        /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("Name")),
        /*@__PURE__*/ __S(194, __c24, 2)
          .pipe(/*@__PURE__*/ T.XmlName("Value"))
          .annotate({ identifier: "MessageAttributeValue" })
          .pipe(S.optional),
      );
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ QueueUrl: S.String, Label: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RemovePermissionRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          QueueUrl: S.String,
          MessageBody: S.String,
          DelaySeconds: S.optional(S.Number),
          MessageAttributes: S.optional(__S(195, __c24, 3)).pipe(
            T.XmlName("MessageAttribute"),
            T.XmlFlattened(),
          ),
          MessageSystemAttributes: S.optional(__S(216, __c27, 0)).pipe(
            T.XmlName("MessageSystemAttribute"),
            T.XmlFlattened(),
          ),
          MessageDeduplicationId: S.optional(S.String),
          MessageGroupId: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SendMessageRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          MD5OfMessageBody: S.optional(S.String),
          MD5OfMessageAttributes: S.optional(S.String),
          MD5OfMessageSystemAttributes: S.optional(S.String),
          MessageId: S.optional(S.String),
          SequenceNumber: S.optional(S.String),
        }),
      ).annotate({ identifier: "SendMessageResult" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.Record(
        /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("Name")),
        /*@__PURE__*/ __S(194, __c24, 2)
          .pipe(/*@__PURE__*/ T.XmlName("Value"))
          .annotate({ identifier: "MessageSystemAttributeValue" })
          .pipe(S.optional),
      );
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          MessageBody: S.String,
          DelaySeconds: S.optional(S.Number),
          MessageAttributes: S.optional(__S(195, __c24, 3)).pipe(
            T.XmlName("MessageAttribute"),
            T.XmlFlattened(),
          ),
          MessageSystemAttributes: S.optional(__S(216, __c27, 0)).pipe(
            T.XmlName("MessageSystemAttribute"),
            T.XmlFlattened(),
          ),
          MessageDeduplicationId: S.optional(S.String),
          MessageGroupId: S.optional(S.String),
        }),
      ).annotate({ identifier: "SendMessageBatchRequestEntry" });
    case 1:
      return S.Array(__S(224, __c28, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          QueueUrl: S.String,
          Entries: __S(225, __c28, 1).pipe(
            T.XmlName("SendMessageBatchRequestEntry"),
            T.XmlFlattened(),
          ),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SendMessageBatchRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          MessageId: S.String,
          MD5OfMessageBody: S.String,
          MD5OfMessageAttributes: S.optional(S.String),
          MD5OfMessageSystemAttributes: S.optional(S.String),
          SequenceNumber: S.optional(S.String),
        }),
      ).annotate({ identifier: "SendMessageBatchResultEntry" });
    case 4:
      return S.Array(__S(227, __c28, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          Successful: S.optional(__S(228, __c28, 4)).pipe(
            T.XmlName("SendMessageBatchResultEntry"),
            T.XmlFlattened(),
          ),
          Failed: S.optional(__S(57, __c7, 1)).pipe(
            T.XmlName("BatchResultErrorEntry"),
            T.XmlFlattened(),
          ),
        }),
      ).annotate({ identifier: "SendMessageBatchResult" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          QueueUrl: S.String,
          Attributes: __S(72, __c9, 0).pipe(T.XmlName("Attribute"), T.XmlFlattened()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SetQueueAttributesRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SourceArn: S.String,
          DestinationArn: S.optional(S.String),
          MaxNumberOfMessagesPerSecond: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartMessageMoveTaskRequest" });
    case 1:
      return S.suspend(() => S.Struct({ TaskHandle: S.optional(S.String) })).annotate({
        identifier: "StartMessageMoveTaskResult",
      });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          QueueUrl: S.String,
          Tags: __S(88, __c11, 0).pipe(T.XmlName("Tag"), T.XmlFlattened()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "TagQueueRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          QueueUrl: S.String,
          TagKeys: __S(16, __c2, 0).pipe(T.XmlName("TagKey"), T.XmlFlattened()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UntagQueueRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
