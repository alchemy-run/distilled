import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { restJson1Protocol } from "../protocols/rest-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "Lex Runtime Service",
  target: "AWSDeepSenseRunTimeService",
  version: "2016-11-28",
  sigv4: "lex",
  protocol: restJson1Protocol,
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://runtime.lex.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          if ("aws" === _.getAttr(PartitionResult, "name")) {
            return e(`https://runtime.lex.${Region}.amazonaws.com`);
          }
          if ("aws-us-gov" === _.getAttr(PartitionResult, "name")) {
            return e(`https://runtime.lex.${Region}.amazonaws.com`);
          }
          return e(
            `https://runtime.lex.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class BadGatewayException
  extends /*@__PURE__*/ TE.TaggedError("BadGatewayException", ["ServerError"], {
    status: 502,
  })<{ readonly message?: string }> {}
export class BadRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "BadRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string }> {}
export class DependencyFailedException
  extends /*@__PURE__*/ TE.TaggedError("DependencyFailedException", [], {
    status: 424,
  })<{ readonly message?: string }> {}
export class InternalFailureException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalFailureException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "LimitExceededException",
    ["ThrottlingError"],
    { status: 429, headers: { retryAfterSeconds: "Retry-After" } },
  )<{ readonly retryAfterSeconds?: string; readonly message?: string }> {}
export class LoopDetectedException
  extends /*@__PURE__*/ TE.TaggedError(
    "LoopDetectedException",
    ["ServerError"],
    { status: 508 },
  )<{ readonly message?: string }> {}
export class NotAcceptableException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotAcceptableException",
    ["BadRequestError"],
    { status: 406 },
  )<{ readonly message?: string }> {}
export class NotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class RequestTimeoutException
  extends /*@__PURE__*/ TE.TaggedError(
    "RequestTimeoutException",
    ["TimeoutError"],
    { status: 408 },
  )<{ readonly message?: string }> {}
export class UnsupportedMediaTypeException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnsupportedMediaTypeException",
    ["BadRequestError"],
    { status: 415 },
  )<{ readonly message?: string }> {}
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
export type ConfirmationStatus =
  | "None"
  | "Confirmed"
  | "Denied"
  | (string & {});
export type DialogActionType =
  | "ElicitIntent"
  | "ConfirmIntent"
  | "ElicitSlot"
  | "Close"
  | "Delegate"
  | (string & {});
export type FulfillmentState =
  | "Fulfilled"
  | "Failed"
  | "ReadyForFulfillment"
  | (string & {});
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
export type SynthesizedJsonAttributesString =
  | string
  | redacted.Redacted<string>;
export type HttpContentType = string;
export type Accept = string;
export type SynthesizedJsonActiveContextsString =
  | string
  | redacted.Redacted<string>;
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
export type ContentType =
  | "application/vnd.amazonaws.card.generic"
  | (string & {});
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
  descriptor: {
    service: svc,
    http: "DELETE /bot/{botName}/alias/{botAlias}/user/{userId}/session",
    input: { botName: 0, botAlias: 0, userId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /bot/{botName}/alias/{botAlias}/user/{userId}/session",
    input: {
      botName: 0,
      botAlias: 0,
      userId: 0,
      checkpointLabelFilter: D.m({ query: "checkpointLabelFilter" }),
    },
    output: {
      dialogAction: { message: D.secret },
      activeContexts: D.list(o_ActiveContext),
    },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSession",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /bot/{botName}/alias/{botAlias}/user/{userId}/content",
    input: {
      botName: 0,
      botAlias: 0,
      userId: 0,
      sessionAttributes: D.m({ header: "x-amz-lex-session-attributes" }),
      requestAttributes: D.m({ header: "x-amz-lex-request-attributes" }),
      contentType: D.m({ header: "Content-Type" }),
      accept: D.m({ header: "Accept" }),
      inputStream: D.m({ payload: true, shape: D.stream }),
      activeContexts: D.m({ header: "x-amz-lex-active-contexts" }),
    },
    output: {
      contentType: D.m({ header: "Content-Type" }),
      intentName: D.m({ header: "x-amz-lex-intent-name" }),
      nluIntentConfidence: D.m({ header: "x-amz-lex-nlu-intent-confidence" }),
      alternativeIntents: D.m({ header: "x-amz-lex-alternative-intents" }),
      slots: D.m({ header: "x-amz-lex-slots" }),
      sessionAttributes: D.m({ header: "x-amz-lex-session-attributes" }),
      sentimentResponse: D.m({ header: "x-amz-lex-sentiment" }),
      message: D.m({ header: "x-amz-lex-message", shape: D.secret }),
      encodedMessage: D.m({
        header: "x-amz-lex-encoded-message",
        shape: D.secret,
      }),
      messageFormat: D.m({ header: "x-amz-lex-message-format" }),
      dialogState: D.m({ header: "x-amz-lex-dialog-state" }),
      slotToElicit: D.m({ header: "x-amz-lex-slot-to-elicit" }),
      inputTranscript: D.m({ header: "x-amz-lex-input-transcript" }),
      encodedInputTranscript: D.m({
        header: "x-amz-lex-encoded-input-transcript",
        shape: D.secret,
      }),
      audioStream: D.m({ payload: true, shape: D.stream }),
      botVersion: D.m({ header: "x-amz-lex-bot-version" }),
      sessionId: D.m({ header: "x-amz-lex-session-id" }),
      activeContexts: D.m({
        header: "x-amz-lex-active-contexts",
        shape: D.secret,
      }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /bot/{botName}/alias/{botAlias}/user/{userId}/text",
    input: {
      botName: 0,
      botAlias: 0,
      userId: 0,
      sessionAttributes: 0,
      requestAttributes: 0,
      inputText: 0,
      activeContexts: D.list(i_ActiveContext),
    },
    output: { message: D.secret, activeContexts: D.list(o_ActiveContext) },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /bot/{botName}/alias/{botAlias}/user/{userId}/session",
    input: {
      botName: 0,
      botAlias: 0,
      userId: 0,
      sessionAttributes: 0,
      dialogAction: {
        type: 0,
        intentName: 0,
        slots: 0,
        slotToElicit: 0,
        fulfillmentState: 0,
        message: 0,
        messageFormat: 0,
      },
      recentIntentSummaryView: D.list({
        intentName: 0,
        checkpointLabel: 0,
        slots: 0,
        confirmationStatus: 0,
        dialogActionType: 0,
        fulfillmentState: 0,
        slotToElicit: 0,
      }),
      accept: D.m({ header: "Accept" }),
      activeContexts: D.list(i_ActiveContext),
    },
    output: {
      contentType: D.m({ header: "Content-Type" }),
      intentName: D.m({ header: "x-amz-lex-intent-name" }),
      slots: D.m({ header: "x-amz-lex-slots" }),
      sessionAttributes: D.m({ header: "x-amz-lex-session-attributes" }),
      message: D.m({ header: "x-amz-lex-message", shape: D.secret }),
      encodedMessage: D.m({
        header: "x-amz-lex-encoded-message",
        shape: D.secret,
      }),
      messageFormat: D.m({ header: "x-amz-lex-message-format" }),
      dialogState: D.m({ header: "x-amz-lex-dialog-state" }),
      slotToElicit: D.m({ header: "x-amz-lex-slot-to-elicit" }),
      audioStream: D.m({ payload: true, shape: D.stream }),
      sessionId: D.m({ header: "x-amz-lex-session-id" }),
      activeContexts: D.m({
        header: "x-amz-lex-active-contexts",
        shape: D.secret,
      }),
    },
    body: true,
  },
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
})) as any;

const i_ActiveContext: D.LazyStruct = () => ({
  name: 0,
  timeToLive: { timeToLiveInSeconds: 0, turnsToLive: 0 },
  parameters: 0,
});
const o_ActiveContext: D.LazyStruct = () => ({ parameters: D.map(D.secret) });
