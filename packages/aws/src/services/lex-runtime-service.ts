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
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Lex Runtime Service",
  serviceShapeName: "AWSDeepSenseRunTimeService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "lex" });
const ver = /*@__PURE__*/ T.ServiceVersion("2016-11-28");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
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
              `https://runtime.lex-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (_.getAttr(PartitionResult, "name") === "aws") {
              return e(`https://runtime-fips.lex.${Region}.amazonaws.com`);
            }
            if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
              return e(`https://runtime-fips.lex.${Region}.amazonaws.com`);
            }
            return e(
              `https://runtime.lex-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://runtime.lex.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        if ("aws" === _.getAttr(PartitionResult, "name")) {
          return e(`https://runtime.lex.${Region}.amazonaws.com`);
        }
        if ("aws-us-gov" === _.getAttr(PartitionResult, "name")) {
          return e(`https://runtime.lex.${Region}.amazonaws.com`);
        }
        return e(`https://runtime.lex.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://runtime.lex.{R}.{D}","properties":{},"headers":{}}');

export class BadGatewayException
  extends /*@__PURE__*/ S.TaggedError<BadGatewayException>()(
    "BadGatewayException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(502),
  ).pipe(C.withServerError) {}
export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class DependencyFailedException
  extends /*@__PURE__*/ S.TaggedError<DependencyFailedException>()(
    "DependencyFailedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(424),
  ) {}
export class InternalFailureException
  extends /*@__PURE__*/ S.TaggedError<InternalFailureException>()(
    "InternalFailureException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    {
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.String).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class LoopDetectedException
  extends /*@__PURE__*/ S.TaggedError<LoopDetectedException>()(
    "LoopDetectedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(508),
  ).pipe(C.withServerError) {}
export class NotAcceptableException
  extends /*@__PURE__*/ S.TaggedError<NotAcceptableException>()(
    "NotAcceptableException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(406),
  ).pipe(C.withBadRequestError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class RequestTimeoutException
  extends /*@__PURE__*/ S.TaggedError<RequestTimeoutException>()(
    "RequestTimeoutException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(408),
  ).pipe(C.withTimeoutError) {}
export class UnsupportedMediaTypeException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedMediaTypeException>()(
    "UnsupportedMediaTypeException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(415),
  ).pipe(C.withBadRequestError) {}
export type BotName = string;
export type BotAlias = string;
export type UserId = string;
export interface DeleteSessionRequest {
  botName: string;
  botAlias: string;
  userId: string;
}
export interface DeleteSessionResponse {
  botName?: string;
  botAlias?: string;
  userId?: string;
  sessionId?: string;
}
export type IntentSummaryCheckpointLabel = string;
export interface GetSessionRequest {
  botName: string;
  botAlias: string;
  userId: string;
  checkpointLabelFilter?: string;
}
export type IntentName = string;
export type StringMap = { [key: string]: string | undefined };
export type ConfirmationStatus = "None" | "Confirmed" | "Denied" | (string & {});
export type DialogActionType =
  | "ElicitIntent"
  | "ConfirmIntent"
  | "ElicitSlot"
  | "Close"
  | "Delegate"
  | (string & {});
export type FulfillmentState = "Fulfilled" | "Failed" | "ReadyForFulfillment" | (string & {});
export interface IntentSummary {
  intentName?: string;
  checkpointLabel?: string;
  slots?: { [key: string]: string | undefined };
  confirmationStatus?: ConfirmationStatus;
  dialogActionType: DialogActionType;
  fulfillmentState?: FulfillmentState;
  slotToElicit?: string;
}
export type IntentSummaryList = IntentSummary[];
export type Text = string | redacted.Redacted<string>;
export type MessageFormatType =
  | "PlainText"
  | "CustomPayload"
  | "SSML"
  | "Composite"
  | (string & {});
export interface DialogAction {
  type: DialogActionType;
  intentName?: string;
  slots?: { [key: string]: string | undefined };
  slotToElicit?: string;
  fulfillmentState?: FulfillmentState;
  message?: string | redacted.Redacted<string>;
  messageFormat?: MessageFormatType;
}
export type ActiveContextName = string;
export type ActiveContextTimeToLiveInSeconds = number;
export type ActiveContextTurnsToLive = number;
export interface ActiveContextTimeToLive {
  timeToLiveInSeconds?: number;
  turnsToLive?: number;
}
export type ParameterName = string;
export type ActiveContextParametersMap = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export interface ActiveContext {
  name: string;
  timeToLive: ActiveContextTimeToLive;
  parameters: { [key: string]: string | redacted.Redacted<string> | undefined };
}
export type ActiveContextsList = ActiveContext[];
export interface GetSessionResponse {
  recentIntentSummaryView?: IntentSummary[];
  sessionAttributes?: { [key: string]: string | undefined };
  sessionId?: string;
  dialogAction?: DialogAction;
  activeContexts?: ActiveContext[];
}
export type SynthesizedJsonAttributesString = string | redacted.Redacted<string>;
export type HttpContentType = string;
export type Accept = string;
export type SynthesizedJsonActiveContextsString = string | redacted.Redacted<string>;
export interface PostContentRequest {
  botName: string;
  botAlias: string;
  userId: string;
  sessionAttributes?: string | redacted.Redacted<string>;
  requestAttributes?: string | redacted.Redacted<string>;
  contentType: string;
  accept?: string;
  inputStream: T.StreamingInputBody;
  activeContexts?: string | redacted.Redacted<string>;
}
export type SynthesizedJsonString = string;
export type SensitiveString = string | redacted.Redacted<string>;
export type DialogState =
  | "ElicitIntent"
  | "ConfirmIntent"
  | "ElicitSlot"
  | "Fulfilled"
  | "ReadyForFulfillment"
  | "Failed"
  | (string & {});
export type SensitiveStringUnbounded = string | redacted.Redacted<string>;
export type BotVersion = string;
export interface PostContentResponse {
  contentType?: string;
  intentName?: string;
  nluIntentConfidence?: string;
  alternativeIntents?: string;
  slots?: string;
  sessionAttributes?: string;
  sentimentResponse?: string;
  message?: string | redacted.Redacted<string>;
  encodedMessage?: string | redacted.Redacted<string>;
  messageFormat?: MessageFormatType;
  dialogState?: DialogState;
  slotToElicit?: string;
  inputTranscript?: string;
  encodedInputTranscript?: string | redacted.Redacted<string>;
  audioStream?: T.StreamingOutputBody;
  botVersion?: string;
  sessionId?: string;
  activeContexts?: string | redacted.Redacted<string>;
}
export interface PostTextRequest {
  botName: string;
  botAlias: string;
  userId: string;
  sessionAttributes?: { [key: string]: string | undefined };
  requestAttributes?: { [key: string]: string | undefined };
  inputText: string | redacted.Redacted<string>;
  activeContexts?: ActiveContext[];
}
export interface IntentConfidence {
  score?: number;
}
export interface PredictedIntent {
  intentName?: string;
  nluIntentConfidence?: IntentConfidence;
  slots?: { [key: string]: string | undefined };
}
export type IntentList = PredictedIntent[];
export type SentimentLabel = string;
export type SentimentScore = string;
export interface SentimentResponse {
  sentimentLabel?: string;
  sentimentScore?: string;
}
export type ContentType = "application/vnd.amazonaws.card.generic" | (string & {});
export type StringWithLength = string;
export type StringUrlWithLength = string;
export type ButtonTextStringWithLength = string;
export type ButtonValueStringWithLength = string;
export interface Button {
  text: string;
  value: string;
}
export type ListOfButtons = Button[];
export interface GenericAttachment {
  title?: string;
  subTitle?: string;
  attachmentLinkUrl?: string;
  imageUrl?: string;
  buttons?: Button[];
}
export type GenericAttachmentList = GenericAttachment[];
export interface ResponseCard {
  version?: string;
  contentType?: ContentType;
  genericAttachments?: GenericAttachment[];
}
export interface PostTextResponse {
  intentName?: string;
  nluIntentConfidence?: IntentConfidence;
  alternativeIntents?: PredictedIntent[];
  slots?: { [key: string]: string | undefined };
  sessionAttributes?: { [key: string]: string | undefined };
  message?: string | redacted.Redacted<string>;
  sentimentResponse?: SentimentResponse;
  messageFormat?: MessageFormatType;
  dialogState?: DialogState;
  slotToElicit?: string;
  responseCard?: ResponseCard;
  sessionId?: string;
  botVersion?: string;
  activeContexts?: ActiveContext[];
}
export interface PutSessionRequest {
  botName: string;
  botAlias: string;
  userId: string;
  sessionAttributes?: { [key: string]: string | undefined };
  dialogAction?: DialogAction;
  recentIntentSummaryView?: IntentSummary[];
  accept?: string;
  activeContexts?: ActiveContext[];
}
export interface PutSessionResponse {
  contentType?: string;
  intentName?: string;
  slots?: string;
  sessionAttributes?: string;
  message?: string | redacted.Redacted<string>;
  encodedMessage?: string | redacted.Redacted<string>;
  messageFormat?: MessageFormatType;
  dialogState?: DialogState;
  slotToElicit?: string;
  audioStream?: T.StreamingOutputBody;
  sessionId?: string;
  activeContexts?: string | redacted.Redacted<string>;
}
export type ErrorMessage = string;
export type DeleteSessionError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Removes session information for a specified bot, alias, and user ID.
 */
export const deleteSession: API.OperationMethod<
  DeleteSessionRequest,
  DeleteSessionResponse,
  DeleteSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<DeleteSessionRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<DeleteSessionResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSession",
}));

export type GetSessionError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Returns session information for a specified bot, alias, and user
 * ID.
 */
export const getSession: API.OperationMethod<
  GetSessionRequest,
  GetSessionResponse,
  GetSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(16, __c1, 0) as any as S.Schema<GetSessionRequest>,
  output: __S(17, __c1, 1) as any as S.Schema<GetSessionResponse>,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSession",
}));

export type PostContentError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | DependencyFailedException
  | InternalFailureException
  | LimitExceededException
  | LoopDetectedException
  | NotAcceptableException
  | NotFoundException
  | RequestTimeoutException
  | UnsupportedMediaTypeException
  | CommonErrors;
/**
 * Sends user input (text or speech) to Amazon Lex. Clients use this API to
 * send text and audio requests to Amazon Lex at runtime. Amazon Lex interprets the
 * user input using the machine learning model that it built for the bot.
 *
 * The `PostContent` operation supports audio input at 8kHz
 * and 16kHz. You can use 8kHz audio to achieve higher speech recognition
 * accuracy in telephone audio applications.
 *
 * In response, Amazon Lex returns the next message to convey to the user.
 * Consider the following example messages:
 *
 * - For a user input "I would like a pizza," Amazon Lex might return a
 * response with a message eliciting slot data (for example,
 * `PizzaSize`): "What size pizza would you like?".
 *
 * - After the user provides all of the pizza order information, Amazon Lex
 * might return a response with a message to get user confirmation:
 * "Order the pizza?".
 *
 * - After the user replies "Yes" to the confirmation prompt, Amazon Lex
 * might return a conclusion statement: "Thank you, your cheese pizza has
 * been ordered.".
 *
 * Not all Amazon Lex messages require a response from the user. For example,
 * conclusion statements do not require a response. Some messages require
 * only a yes or no response. In addition to the `message`, Amazon Lex
 * provides additional context about the message in the response that you can
 * use to enhance client behavior, such as displaying the appropriate client
 * user interface. Consider the following examples:
 *
 * - If the message is to elicit slot data, Amazon Lex returns the
 * following context information:
 *
 * - `x-amz-lex-dialog-state` header set to
 * `ElicitSlot`
 *
 * - `x-amz-lex-intent-name` header set to the intent name
 * in the current context
 *
 * - `x-amz-lex-slot-to-elicit` header set to the slot name
 * for which the `message` is eliciting information
 *
 * - `x-amz-lex-slots` header set to a map of slots
 * configured for the intent with their current values
 *
 * - If the message is a confirmation prompt, the
 * `x-amz-lex-dialog-state` header is set to
 * `Confirmation` and the
 * `x-amz-lex-slot-to-elicit` header is omitted.
 *
 * - If the message is a clarification prompt configured for the
 * intent, indicating that the user intent is not understood, the
 * `x-amz-dialog-state` header is set to
 * `ElicitIntent` and the `x-amz-slot-to-elicit`
 * header is omitted.
 *
 * In addition, Amazon Lex also returns your application-specific
 * `sessionAttributes`. For more information, see Managing
 * Conversation Context.
 */
export const postContent: API.OperationMethod<
  PostContentRequest,
  PostContentResponse,
  PostContentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c4, 0) as any as S.Schema<PostContentRequest>,
  output: __S(65, __c4, 1) as any as S.Schema<PostContentResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    DependencyFailedException,
    InternalFailureException,
    LimitExceededException,
    LoopDetectedException,
    NotAcceptableException,
    NotFoundException,
    RequestTimeoutException,
    UnsupportedMediaTypeException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PostContent",
}));

export type PostTextError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | DependencyFailedException
  | InternalFailureException
  | LimitExceededException
  | LoopDetectedException
  | NotFoundException
  | CommonErrors;
/**
 * Sends user input to Amazon Lex. Client applications can use this API to
 * send requests to Amazon Lex at runtime. Amazon Lex then interprets the user input
 * using the machine learning model it built for the bot.
 *
 * In response, Amazon Lex returns the next `message` to convey to
 * the user an optional `responseCard` to display. Consider the
 * following example messages:
 *
 * - For a user input "I would like a pizza", Amazon Lex might return a
 * response with a message eliciting slot data (for example, PizzaSize):
 * "What size pizza would you like?"
 *
 * - After the user provides all of the pizza order information,
 * Amazon Lex might return a response with a message to obtain user
 * confirmation "Proceed with the pizza order?".
 *
 * - After the user replies to a confirmation prompt with a "yes",
 * Amazon Lex might return a conclusion statement: "Thank you, your cheese
 * pizza has been ordered.".
 *
 * Not all Amazon Lex messages require a user response. For example, a
 * conclusion statement does not require a response. Some messages require
 * only a "yes" or "no" user response. In addition to the
 * `message`, Amazon Lex provides additional context about the
 * message in the response that you might use to enhance client behavior, for
 * example, to display the appropriate client user interface. These are the
 * `slotToElicit`, `dialogState`,
 * `intentName`, and `slots` fields in the response.
 * Consider the following examples:
 *
 * - If the message is to elicit slot data, Amazon Lex returns the
 * following context information:
 *
 * - `dialogState` set to ElicitSlot
 *
 * - `intentName` set to the intent name in the current
 * context
 *
 * - `slotToElicit` set to the slot name for which the
 * `message` is eliciting information
 *
 * - `slots` set to a map of slots, configured for the
 * intent, with currently known values
 *
 * - If the message is a confirmation prompt, the
 * `dialogState` is set to ConfirmIntent and
 * `SlotToElicit` is set to null.
 *
 * - If the message is a clarification prompt (configured for the
 * intent) that indicates that user intent is not understood, the
 * `dialogState` is set to ElicitIntent and
 * `slotToElicit` is set to null.
 *
 * In addition, Amazon Lex also returns your application-specific
 * `sessionAttributes`. For more information, see Managing
 * Conversation Context.
 */
export const postText: API.OperationMethod<
  PostTextRequest,
  PostTextResponse,
  PostTextError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c5, 0) as any as S.Schema<PostTextRequest>,
  output: __S(90, __c5, 10) as any as S.Schema<PostTextResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    DependencyFailedException,
    InternalFailureException,
    LimitExceededException,
    LoopDetectedException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PostText",
}));

export type PutSessionError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | DependencyFailedException
  | InternalFailureException
  | LimitExceededException
  | NotAcceptableException
  | NotFoundException
  | CommonErrors;
/**
 * Creates a new session or modifies an existing session with an Amazon Lex
 * bot. Use this operation to enable your application to set the state of the
 * bot.
 *
 * For more information, see Managing
 * Sessions.
 */
export const putSession: API.OperationMethod<
  PutSessionRequest,
  PutSessionResponse,
  PutSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c6, 0) as any as S.Schema<PutSessionRequest>,
  output: __S(97, __c6, 1) as any as S.Schema<PutSessionResponse>,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    DependencyFailedException,
    InternalFailureException,
    LimitExceededException,
    NotAcceptableException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutSession",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          botName: S.String.pipe(T.HttpLabel("botName")),
          botAlias: S.String.pipe(T.HttpLabel("botAlias")),
          userId: S.String.pipe(T.HttpLabel("userId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/bot/{botName}/alias/{botAlias}/user/{userId}/session",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteSessionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          botName: S.optional(S.String),
          botAlias: S.optional(S.String),
          userId: S.optional(S.String),
          sessionId: S.optional(S.String),
        }),
      ).annotate({ identifier: "DeleteSessionResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          botName: S.String.pipe(T.HttpLabel("botName")),
          botAlias: S.String.pipe(T.HttpLabel("botAlias")),
          userId: S.String.pipe(T.HttpLabel("userId")),
          checkpointLabelFilter: S.optional(S.String).pipe(T.HttpQuery("checkpointLabelFilter")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/bot/{botName}/alias/{botAlias}/user/{userId}/session" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSessionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          recentIntentSummaryView: S.optional(__S(49, __c3, 1)),
          sessionAttributes: S.optional(__S(32, __c2, 0)),
          sessionId: S.optional(S.String),
          dialogAction: S.optional(__S(50, __c3, 2)),
          activeContexts: S.optional(__S(36, __c2, 4)),
        }),
      ).annotate({ identifier: "GetSessionResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({ timeToLiveInSeconds: S.optional(S.Number), turnsToLive: S.optional(S.Number) }),
      ).annotate({ identifier: "ActiveContextTimeToLive" });
    case 2:
      return S.Record(S.String, /*@__PURE__*/ SensitiveString.pipe(S.optional));
    case 3:
      return S.suspend(() =>
        S.Struct({ name: S.String, timeToLive: __S(33, __c2, 1), parameters: __S(34, __c2, 2) }),
      ).annotate({ identifier: "ActiveContext" });
    case 4:
      return S.Array(__S(35, __c2, 3));
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          intentName: S.optional(S.String),
          checkpointLabel: S.optional(S.String),
          slots: S.optional(__S(32, __c2, 0)),
          confirmationStatus: S.optional(S.String),
          dialogActionType: S.String,
          fulfillmentState: S.optional(S.String),
          slotToElicit: S.optional(S.String),
        }),
      ).annotate({ identifier: "IntentSummary" });
    case 1:
      return S.Array(__S(48, __c3, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          intentName: S.optional(S.String),
          slots: S.optional(__S(32, __c2, 0)),
          slotToElicit: S.optional(S.String),
          fulfillmentState: S.optional(S.String),
          message: S.optional(SensitiveString),
          messageFormat: S.optional(S.String),
        }),
      ).annotate({ identifier: "DialogAction" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          botName: S.String.pipe(T.HttpLabel("botName")),
          botAlias: S.String.pipe(T.HttpLabel("botAlias")),
          userId: S.String.pipe(T.HttpLabel("userId")),
          sessionAttributes: S.optional(SensitiveString).pipe(
            T.HttpHeader("x-amz-lex-session-attributes"),
          ),
          requestAttributes: S.optional(SensitiveString).pipe(
            T.HttpHeader("x-amz-lex-request-attributes"),
          ),
          contentType: S.String.pipe(T.HttpHeader("Content-Type")),
          accept: S.optional(S.String).pipe(T.HttpHeader("Accept")),
          inputStream: T.StreamingInput.pipe(T.HttpPayload()),
          activeContexts: S.optional(SensitiveString).pipe(
            T.HttpHeader("x-amz-lex-active-contexts"),
          ),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/bot/{botName}/alias/{botAlias}/user/{userId}/content",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PostContentRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          contentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
          intentName: S.optional(S.String).pipe(T.HttpHeader("x-amz-lex-intent-name")),
          nluIntentConfidence: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-lex-nlu-intent-confidence"),
          ),
          alternativeIntents: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-lex-alternative-intents"),
          ),
          slots: S.optional(S.String).pipe(T.HttpHeader("x-amz-lex-slots")),
          sessionAttributes: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-lex-session-attributes"),
          ),
          sentimentResponse: S.optional(S.String).pipe(T.HttpHeader("x-amz-lex-sentiment")),
          message: S.optional(SensitiveString).pipe(T.HttpHeader("x-amz-lex-message")),
          encodedMessage: S.optional(SensitiveString).pipe(
            T.HttpHeader("x-amz-lex-encoded-message"),
          ),
          messageFormat: S.optional(S.String).pipe(T.HttpHeader("x-amz-lex-message-format")),
          dialogState: S.optional(S.String).pipe(T.HttpHeader("x-amz-lex-dialog-state")),
          slotToElicit: S.optional(S.String).pipe(T.HttpHeader("x-amz-lex-slot-to-elicit")),
          inputTranscript: S.optional(S.String).pipe(T.HttpHeader("x-amz-lex-input-transcript")),
          encodedInputTranscript: S.optional(SensitiveString).pipe(
            T.HttpHeader("x-amz-lex-encoded-input-transcript"),
          ),
          audioStream: S.optional(T.StreamingOutput).pipe(T.HttpPayload()),
          botVersion: S.optional(S.String).pipe(T.HttpHeader("x-amz-lex-bot-version")),
          sessionId: S.optional(S.String).pipe(T.HttpHeader("x-amz-lex-session-id")),
          activeContexts: S.optional(SensitiveString).pipe(
            T.HttpHeader("x-amz-lex-active-contexts"),
          ),
        }),
      ).annotate({ identifier: "PostContentResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          botName: S.String.pipe(T.HttpLabel("botName")),
          botAlias: S.String.pipe(T.HttpLabel("botAlias")),
          userId: S.String.pipe(T.HttpLabel("userId")),
          sessionAttributes: S.optional(__S(32, __c2, 0)),
          requestAttributes: S.optional(__S(32, __c2, 0)),
          inputText: SensitiveString,
          activeContexts: S.optional(__S(36, __c2, 4)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/bot/{botName}/alias/{botAlias}/user/{userId}/text" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PostTextRequest" });
    case 1:
      return S.suspend(() => S.Struct({ score: S.optional(S.Number) })).annotate({
        identifier: "IntentConfidence",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          intentName: S.optional(S.String),
          nluIntentConfidence: S.optional(__S(81, __c5, 1)),
          slots: S.optional(__S(32, __c2, 0)),
        }),
      ).annotate({ identifier: "PredictedIntent" });
    case 3:
      return S.Array(__S(82, __c5, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ sentimentLabel: S.optional(S.String), sentimentScore: S.optional(S.String) }),
      ).annotate({ identifier: "SentimentResponse" });
    case 5:
      return S.suspend(() => S.Struct({ text: S.String, value: S.String })).annotate({
        identifier: "Button",
      });
    case 6:
      return S.Array(__S(85, __c5, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          title: S.optional(S.String),
          subTitle: S.optional(S.String),
          attachmentLinkUrl: S.optional(S.String),
          imageUrl: S.optional(S.String),
          buttons: S.optional(__S(86, __c5, 6)),
        }),
      ).annotate({ identifier: "GenericAttachment" });
    case 8:
      return S.Array(__S(87, __c5, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          version: S.optional(S.String),
          contentType: S.optional(S.String),
          genericAttachments: S.optional(__S(88, __c5, 8)),
        }),
      ).annotate({ identifier: "ResponseCard" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          intentName: S.optional(S.String),
          nluIntentConfidence: S.optional(__S(81, __c5, 1)),
          alternativeIntents: S.optional(__S(83, __c5, 3)),
          slots: S.optional(__S(32, __c2, 0)),
          sessionAttributes: S.optional(__S(32, __c2, 0)),
          message: S.optional(SensitiveString),
          sentimentResponse: S.optional(__S(84, __c5, 4)),
          messageFormat: S.optional(S.String),
          dialogState: S.optional(S.String),
          slotToElicit: S.optional(S.String),
          responseCard: S.optional(__S(89, __c5, 9)),
          sessionId: S.optional(S.String),
          botVersion: S.optional(S.String),
          activeContexts: S.optional(__S(36, __c2, 4)),
        }),
      ).annotate({ identifier: "PostTextResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          botName: S.String.pipe(T.HttpLabel("botName")),
          botAlias: S.String.pipe(T.HttpLabel("botAlias")),
          userId: S.String.pipe(T.HttpLabel("userId")),
          sessionAttributes: S.optional(__S(32, __c2, 0)),
          dialogAction: S.optional(__S(50, __c3, 2)),
          recentIntentSummaryView: S.optional(__S(49, __c3, 1)),
          accept: S.optional(S.String).pipe(T.HttpHeader("Accept")),
          activeContexts: S.optional(__S(36, __c2, 4)),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/bot/{botName}/alias/{botAlias}/user/{userId}/session",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutSessionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          contentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
          intentName: S.optional(S.String).pipe(T.HttpHeader("x-amz-lex-intent-name")),
          slots: S.optional(S.String).pipe(T.HttpHeader("x-amz-lex-slots")),
          sessionAttributes: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-lex-session-attributes"),
          ),
          message: S.optional(SensitiveString).pipe(T.HttpHeader("x-amz-lex-message")),
          encodedMessage: S.optional(SensitiveString).pipe(
            T.HttpHeader("x-amz-lex-encoded-message"),
          ),
          messageFormat: S.optional(S.String).pipe(T.HttpHeader("x-amz-lex-message-format")),
          dialogState: S.optional(S.String).pipe(T.HttpHeader("x-amz-lex-dialog-state")),
          slotToElicit: S.optional(S.String).pipe(T.HttpHeader("x-amz-lex-slot-to-elicit")),
          audioStream: S.optional(T.StreamingOutput).pipe(T.HttpPayload()),
          sessionId: S.optional(S.String).pipe(T.HttpHeader("x-amz-lex-session-id")),
          activeContexts: S.optional(SensitiveString).pipe(
            T.HttpHeader("x-amz-lex-active-contexts"),
          ),
        }),
      ).annotate({ identifier: "PutSessionResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
