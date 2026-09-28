import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import type * as stream from "effect/Stream";
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
  sdkId: "Lex Runtime V2",
  target: "AWSDeepSenseRunTimeServiceApi2_0",
  version: "2020-08-07",
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
                `https://runtime-v2-lex-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://runtime-v2-lex-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://runtime-v2-lex.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://runtime-v2-lex.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"], {
    status: 403,
  })<{ readonly message: string }> {}
export class BadGatewayException
  extends /*@__PURE__*/ TE.TaggedError("BadGatewayException", ["ServerError"], {
    status: 502,
  })<{ readonly message: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message: string }> {}
export class DependencyFailedException
  extends /*@__PURE__*/ TE.TaggedError("DependencyFailedException", [], {
    status: 424,
  })<{ readonly message: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export type BotIdentifier = string;
export type BotAliasIdentifier = string;
export type LocaleId = string;
export type SessionId = string;
export interface DeleteSessionRequest {
  botId: string;
  botAliasId: string;
  localeId: string;
  sessionId: string;
}
export interface DeleteSessionResponse {
  botId?: string;
  botAliasId?: string;
  localeId?: string;
  sessionId?: string;
}
export interface GetSessionRequest {
  botId: string;
  botAliasId: string;
  localeId: string;
  sessionId: string;
}
export type NonEmptyString = string;
export type Text = string | redacted.Redacted<string>;
export type MessageContentType =
  | "CustomPayload"
  | "ImageResponseCard"
  | "PlainText"
  | "SSML"
  | (string & {});
export type AttachmentTitle = string;
export type AttachmentUrl = string;
export type ButtonText = string;
export type ButtonValue = string;
export interface Button {
  text: string;
  value: string;
}
export type ButtonsList = Button[];
export interface ImageResponseCard {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  buttons?: Button[];
}
export interface Message {
  content?: string | redacted.Redacted<string>;
  contentType: MessageContentType;
  imageResponseCard?: ImageResponseCard;
}
export type Messages = Message[];
export interface ConfidenceScore {
  score?: number;
}
export type SentimentType =
  | "MIXED"
  | "NEGATIVE"
  | "NEUTRAL"
  | "POSITIVE"
  | (string & {});
export interface SentimentScore {
  positive?: number;
  negative?: number;
  neutral?: number;
  mixed?: number;
}
export interface SentimentResponse {
  sentiment?: SentimentType;
  sentimentScore?: SentimentScore;
}
export type StringList = string[];
export interface Value {
  originalValue?: string;
  interpretedValue: string;
  resolvedValues?: string[];
}
export type Shape = "Scalar" | "List" | "Composite" | (string & {});
export type Values = Slot[];
export interface Slot {
  value?: Value;
  shape?: Shape;
  values?: Slot[];
  subSlots?: { [key: string]: Slot | undefined };
}
export type Slots = { [key: string]: Slot | undefined };
export type IntentState =
  | "Failed"
  | "Fulfilled"
  | "InProgress"
  | "ReadyForFulfillment"
  | "Waiting"
  | "FulfillmentInProgress"
  | (string & {});
export type ConfirmationState = "Confirmed" | "Denied" | "None" | (string & {});
export interface Intent {
  name: string;
  slots?: { [key: string]: Slot | undefined };
  state?: IntentState;
  confirmationState?: ConfirmationState;
}
export type InterpretationSource = "Bedrock" | "Lex" | (string & {});
export interface Interpretation {
  nluConfidence?: ConfidenceScore;
  sentimentResponse?: SentimentResponse;
  intent?: Intent;
  interpretationSource?: InterpretationSource;
}
export type Interpretations = Interpretation[];
export type DialogActionType =
  | "Close"
  | "ConfirmIntent"
  | "Delegate"
  | "ElicitIntent"
  | "ElicitSlot"
  | "None"
  | (string & {});
export type StyleType =
  | "Default"
  | "SpellByLetter"
  | "SpellByWord"
  | (string & {});
export interface ElicitSubSlot {
  name: string;
  subSlotToElicit?: ElicitSubSlot;
}
export interface DialogAction {
  type: DialogActionType;
  slotToElicit?: string;
  slotElicitationStyle?: StyleType;
  subSlotToElicit?: ElicitSubSlot;
}
export type ActiveContextName = string;
export type ActiveContextTimeToLiveInSeconds = number;
export type ActiveContextTurnsToLive = number;
export interface ActiveContextTimeToLive {
  timeToLiveInSeconds: number;
  turnsToLive: number;
}
export type ParameterName = string;
export type ActiveContextParametersMap = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export interface ActiveContext {
  name: string;
  timeToLive: ActiveContextTimeToLive;
  contextAttributes: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
}
export type ActiveContextsList = ActiveContext[];
export type StringMap = { [key: string]: string | undefined };
export type Name = string;
export type RuntimeHintPhrase = string;
export interface RuntimeHintValue {
  phrase: string;
}
export type RuntimeHintValuesList = RuntimeHintValue[];
export interface RuntimeHintDetails {
  runtimeHintValues?: RuntimeHintValue[];
  subSlotHints?: { [key: string]: RuntimeHintDetails | undefined };
}
export type SlotHintsSlotMap = {
  [key: string]: RuntimeHintDetails | undefined;
};
export type SlotHintsIntentMap = {
  [key: string]: { [key: string]: RuntimeHintDetails | undefined } | undefined;
};
export interface RuntimeHints {
  slotHints?: {
    [key: string]:
      | { [key: string]: RuntimeHintDetails | undefined }
      | undefined;
  };
}
export interface SessionState {
  dialogAction?: DialogAction;
  intent?: Intent;
  activeContexts?: ActiveContext[];
  sessionAttributes?: { [key: string]: string | undefined };
  originatingRequestId?: string;
  runtimeHints?: RuntimeHints;
}
export interface GetSessionResponse {
  sessionId?: string;
  messages?: Message[];
  interpretations?: Interpretation[];
  sessionState?: SessionState;
}
export interface PutSessionRequest {
  botId: string;
  botAliasId: string;
  localeId: string;
  sessionId: string;
  messages?: Message[];
  sessionState: SessionState;
  requestAttributes?: { [key: string]: string | undefined };
  responseContentType?: string;
}
export interface PutSessionResponse {
  contentType?: string;
  messages?: string;
  sessionState?: string;
  requestAttributes?: string;
  sessionId?: string;
  audioStream?: T.StreamingOutputBody;
}
export interface RecognizeTextRequest {
  botId: string;
  botAliasId: string;
  localeId: string;
  sessionId: string;
  text: string | redacted.Redacted<string>;
  sessionState?: SessionState;
  requestAttributes?: { [key: string]: string | undefined };
}
export interface RecognizedBotMember {
  botId: string;
  botName?: string;
}
export interface RecognizeTextResponse {
  messages?: Message[];
  sessionState?: SessionState;
  interpretations?: Interpretation[];
  requestAttributes?: { [key: string]: string | undefined };
  sessionId?: string;
  recognizedBotMember?: RecognizedBotMember;
}
export type SensitiveNonEmptyString = string | redacted.Redacted<string>;
export interface RecognizeUtteranceRequest {
  botId: string;
  botAliasId: string;
  localeId: string;
  sessionId: string;
  sessionState?: string | redacted.Redacted<string>;
  requestAttributes?: string | redacted.Redacted<string>;
  requestContentType: string;
  responseContentType?: string;
  inputStream?: T.StreamingInputBody;
}
export interface RecognizeUtteranceResponse {
  inputMode?: string;
  contentType?: string;
  messages?: string;
  interpretations?: string;
  sessionState?: string;
  requestAttributes?: string;
  sessionId?: string;
  inputTranscript?: string;
  audioStream?: T.StreamingOutputBody;
  recognizedBotMember?: string;
}
export type ConversationMode = "AUDIO" | "TEXT" | (string & {});
export type EventId = string;
export type EpochMillis = number;
export interface ConfigurationEvent {
  requestAttributes?: { [key: string]: string | undefined };
  responseContentType: string;
  sessionState?: SessionState;
  welcomeMessages?: Message[];
  disablePlayback?: boolean;
  eventId?: string;
  clientTimestampMillis?: number;
}
export type AudioChunk = Uint8Array;
export interface AudioInputEvent {
  audioChunk?: Uint8Array;
  contentType: string;
  eventId?: string;
  clientTimestampMillis?: number;
}
export type DTMFRegex = string | redacted.Redacted<string>;
export interface DTMFInputEvent {
  inputCharacter: string | redacted.Redacted<string>;
  eventId?: string;
  clientTimestampMillis?: number;
}
export interface TextInputEvent {
  text: string | redacted.Redacted<string>;
  eventId?: string;
  clientTimestampMillis?: number;
}
export interface PlaybackCompletionEvent {
  eventId?: string;
  clientTimestampMillis?: number;
}
export interface DisconnectionEvent {
  eventId?: string;
  clientTimestampMillis?: number;
}
export type StartConversationRequestEventStream =
  | {
      ConfigurationEvent: ConfigurationEvent;
      AudioInputEvent?: never;
      DTMFInputEvent?: never;
      TextInputEvent?: never;
      PlaybackCompletionEvent?: never;
      DisconnectionEvent?: never;
    }
  | {
      ConfigurationEvent?: never;
      AudioInputEvent: AudioInputEvent;
      DTMFInputEvent?: never;
      TextInputEvent?: never;
      PlaybackCompletionEvent?: never;
      DisconnectionEvent?: never;
    }
  | {
      ConfigurationEvent?: never;
      AudioInputEvent?: never;
      DTMFInputEvent: DTMFInputEvent;
      TextInputEvent?: never;
      PlaybackCompletionEvent?: never;
      DisconnectionEvent?: never;
    }
  | {
      ConfigurationEvent?: never;
      AudioInputEvent?: never;
      DTMFInputEvent?: never;
      TextInputEvent: TextInputEvent;
      PlaybackCompletionEvent?: never;
      DisconnectionEvent?: never;
    }
  | {
      ConfigurationEvent?: never;
      AudioInputEvent?: never;
      DTMFInputEvent?: never;
      TextInputEvent?: never;
      PlaybackCompletionEvent: PlaybackCompletionEvent;
      DisconnectionEvent?: never;
    }
  | {
      ConfigurationEvent?: never;
      AudioInputEvent?: never;
      DTMFInputEvent?: never;
      TextInputEvent?: never;
      PlaybackCompletionEvent?: never;
      DisconnectionEvent: DisconnectionEvent;
    };
export interface StartConversationRequest {
  botId: string;
  botAliasId: string;
  localeId: string;
  sessionId: string;
  conversationMode?: ConversationMode;
  requestEventStream: stream.Stream<
    StartConversationRequestEventStream,
    Error,
    never
  >;
}
export type PlaybackInterruptionReason =
  | "DTMF_START_DETECTED"
  | "TEXT_DETECTED"
  | "VOICE_START_DETECTED"
  | (string & {});
export interface PlaybackInterruptionEvent {
  eventReason?: PlaybackInterruptionReason;
  causedByEventId?: string;
  eventId?: string;
}
export interface TranscriptEvent {
  transcript?: string;
  eventId?: string;
}
export type InputMode = "Text" | "Speech" | "DTMF" | (string & {});
export interface IntentResultEvent {
  inputMode?: InputMode;
  interpretations?: Interpretation[];
  sessionState?: SessionState;
  requestAttributes?: { [key: string]: string | undefined };
  sessionId?: string;
  eventId?: string;
  recognizedBotMember?: RecognizedBotMember;
}
export interface TextResponseEvent {
  messages?: Message[];
  eventId?: string;
}
export interface AudioResponseEvent {
  audioChunk?: Uint8Array;
  contentType?: string;
  eventId?: string;
}
export interface HeartbeatEvent {
  eventId?: string;
}
export type StartConversationResponseEventStream =
  | {
      PlaybackInterruptionEvent: PlaybackInterruptionEvent;
      TranscriptEvent?: never;
      IntentResultEvent?: never;
      TextResponseEvent?: never;
      AudioResponseEvent?: never;
      HeartbeatEvent?: never;
      AccessDeniedException?: never;
      ResourceNotFoundException?: never;
      ValidationException?: never;
      ThrottlingException?: never;
      InternalServerException?: never;
      ConflictException?: never;
      DependencyFailedException?: never;
      BadGatewayException?: never;
    }
  | {
      PlaybackInterruptionEvent?: never;
      TranscriptEvent: TranscriptEvent;
      IntentResultEvent?: never;
      TextResponseEvent?: never;
      AudioResponseEvent?: never;
      HeartbeatEvent?: never;
      AccessDeniedException?: never;
      ResourceNotFoundException?: never;
      ValidationException?: never;
      ThrottlingException?: never;
      InternalServerException?: never;
      ConflictException?: never;
      DependencyFailedException?: never;
      BadGatewayException?: never;
    }
  | {
      PlaybackInterruptionEvent?: never;
      TranscriptEvent?: never;
      IntentResultEvent: IntentResultEvent;
      TextResponseEvent?: never;
      AudioResponseEvent?: never;
      HeartbeatEvent?: never;
      AccessDeniedException?: never;
      ResourceNotFoundException?: never;
      ValidationException?: never;
      ThrottlingException?: never;
      InternalServerException?: never;
      ConflictException?: never;
      DependencyFailedException?: never;
      BadGatewayException?: never;
    }
  | {
      PlaybackInterruptionEvent?: never;
      TranscriptEvent?: never;
      IntentResultEvent?: never;
      TextResponseEvent: TextResponseEvent;
      AudioResponseEvent?: never;
      HeartbeatEvent?: never;
      AccessDeniedException?: never;
      ResourceNotFoundException?: never;
      ValidationException?: never;
      ThrottlingException?: never;
      InternalServerException?: never;
      ConflictException?: never;
      DependencyFailedException?: never;
      BadGatewayException?: never;
    }
  | {
      PlaybackInterruptionEvent?: never;
      TranscriptEvent?: never;
      IntentResultEvent?: never;
      TextResponseEvent?: never;
      AudioResponseEvent: AudioResponseEvent;
      HeartbeatEvent?: never;
      AccessDeniedException?: never;
      ResourceNotFoundException?: never;
      ValidationException?: never;
      ThrottlingException?: never;
      InternalServerException?: never;
      ConflictException?: never;
      DependencyFailedException?: never;
      BadGatewayException?: never;
    }
  | {
      PlaybackInterruptionEvent?: never;
      TranscriptEvent?: never;
      IntentResultEvent?: never;
      TextResponseEvent?: never;
      AudioResponseEvent?: never;
      HeartbeatEvent: HeartbeatEvent;
      AccessDeniedException?: never;
      ResourceNotFoundException?: never;
      ValidationException?: never;
      ThrottlingException?: never;
      InternalServerException?: never;
      ConflictException?: never;
      DependencyFailedException?: never;
      BadGatewayException?: never;
    }
  | {
      PlaybackInterruptionEvent?: never;
      TranscriptEvent?: never;
      IntentResultEvent?: never;
      TextResponseEvent?: never;
      AudioResponseEvent?: never;
      HeartbeatEvent?: never;
      AccessDeniedException: AccessDeniedException;
      ResourceNotFoundException?: never;
      ValidationException?: never;
      ThrottlingException?: never;
      InternalServerException?: never;
      ConflictException?: never;
      DependencyFailedException?: never;
      BadGatewayException?: never;
    }
  | {
      PlaybackInterruptionEvent?: never;
      TranscriptEvent?: never;
      IntentResultEvent?: never;
      TextResponseEvent?: never;
      AudioResponseEvent?: never;
      HeartbeatEvent?: never;
      AccessDeniedException?: never;
      ResourceNotFoundException: ResourceNotFoundException;
      ValidationException?: never;
      ThrottlingException?: never;
      InternalServerException?: never;
      ConflictException?: never;
      DependencyFailedException?: never;
      BadGatewayException?: never;
    }
  | {
      PlaybackInterruptionEvent?: never;
      TranscriptEvent?: never;
      IntentResultEvent?: never;
      TextResponseEvent?: never;
      AudioResponseEvent?: never;
      HeartbeatEvent?: never;
      AccessDeniedException?: never;
      ResourceNotFoundException?: never;
      ValidationException: ValidationException;
      ThrottlingException?: never;
      InternalServerException?: never;
      ConflictException?: never;
      DependencyFailedException?: never;
      BadGatewayException?: never;
    }
  | {
      PlaybackInterruptionEvent?: never;
      TranscriptEvent?: never;
      IntentResultEvent?: never;
      TextResponseEvent?: never;
      AudioResponseEvent?: never;
      HeartbeatEvent?: never;
      AccessDeniedException?: never;
      ResourceNotFoundException?: never;
      ValidationException?: never;
      ThrottlingException: ThrottlingException;
      InternalServerException?: never;
      ConflictException?: never;
      DependencyFailedException?: never;
      BadGatewayException?: never;
    }
  | {
      PlaybackInterruptionEvent?: never;
      TranscriptEvent?: never;
      IntentResultEvent?: never;
      TextResponseEvent?: never;
      AudioResponseEvent?: never;
      HeartbeatEvent?: never;
      AccessDeniedException?: never;
      ResourceNotFoundException?: never;
      ValidationException?: never;
      ThrottlingException?: never;
      InternalServerException: InternalServerException;
      ConflictException?: never;
      DependencyFailedException?: never;
      BadGatewayException?: never;
    }
  | {
      PlaybackInterruptionEvent?: never;
      TranscriptEvent?: never;
      IntentResultEvent?: never;
      TextResponseEvent?: never;
      AudioResponseEvent?: never;
      HeartbeatEvent?: never;
      AccessDeniedException?: never;
      ResourceNotFoundException?: never;
      ValidationException?: never;
      ThrottlingException?: never;
      InternalServerException?: never;
      ConflictException: ConflictException;
      DependencyFailedException?: never;
      BadGatewayException?: never;
    }
  | {
      PlaybackInterruptionEvent?: never;
      TranscriptEvent?: never;
      IntentResultEvent?: never;
      TextResponseEvent?: never;
      AudioResponseEvent?: never;
      HeartbeatEvent?: never;
      AccessDeniedException?: never;
      ResourceNotFoundException?: never;
      ValidationException?: never;
      ThrottlingException?: never;
      InternalServerException?: never;
      ConflictException?: never;
      DependencyFailedException: DependencyFailedException;
      BadGatewayException?: never;
    }
  | {
      PlaybackInterruptionEvent?: never;
      TranscriptEvent?: never;
      IntentResultEvent?: never;
      TextResponseEvent?: never;
      AudioResponseEvent?: never;
      HeartbeatEvent?: never;
      AccessDeniedException?: never;
      ResourceNotFoundException?: never;
      ValidationException?: never;
      ThrottlingException?: never;
      InternalServerException?: never;
      ConflictException?: never;
      DependencyFailedException?: never;
      BadGatewayException: BadGatewayException;
    };
export interface StartConversationResponse {
  responseEventStream?: stream.Stream<
    StartConversationResponseEventStream,
    Error,
    never
  >;
}
export type DeleteSessionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes session information for a specified bot, alias, and user ID.
 *
 * You can use this operation to restart a conversation with a bot.
 * When you remove a session, the entire history of the session is removed
 * so that you can start again.
 *
 * You don't need to delete a session. Sessions have a time limit and
 * will expire. Set the session time limit when you create the bot. The
 * default is 5 minutes, but you can specify anything between 1 minute and
 * 24 hours.
 *
 * If you specify a bot or alias ID that doesn't exist, you receive a
 * `BadRequestException.`
 *
 * If the locale doesn't exist in the bot, or if the locale hasn't been
 * enables for the alias, you receive a
 * `BadRequestException`.
 */
export const deleteSession: API.OperationMethod<
  DeleteSessionRequest,
  DeleteSessionResponse,
  DeleteSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /bots/{botId}/botAliases/{botAliasId}/botLocales/{localeId}/sessions/{sessionId}",
    input: { botId: 0, botAliasId: 0, localeId: 0, sessionId: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSession",
})) as any;

export type GetSessionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns session information for a specified bot, alias, and
 * user.
 *
 * For example, you can use this operation to retrieve session
 * information for a user that has left a long-running session in
 * use.
 *
 * If the bot, alias, or session identifier doesn't exist, Amazon Lex V2
 * returns a `BadRequestException`. If the locale doesn't exist
 * or is not enabled for the alias, you receive a
 * `BadRequestException`.
 */
export const getSession: API.OperationMethod<
  GetSessionRequest,
  GetSessionResponse,
  GetSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /bots/{botId}/botAliases/{botAliasId}/botLocales/{localeId}/sessions/{sessionId}",
    input: { botId: 0, botAliasId: 0, localeId: 0, sessionId: 0 },
    output: { messages: D.list(o_Message), sessionState: o_SessionState },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSession",
})) as any;

export type PutSessionError =
  | AccessDeniedException
  | BadGatewayException
  | ConflictException
  | DependencyFailedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new session or modifies an existing session with an Amazon Lex V2
 * bot. Use this operation to enable your application to set the state of
 * the bot.
 */
export const putSession: API.OperationMethod<
  PutSessionRequest,
  PutSessionResponse,
  PutSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /bots/{botId}/botAliases/{botAliasId}/botLocales/{localeId}/sessions/{sessionId}",
    input: {
      botId: 0,
      botAliasId: 0,
      localeId: 0,
      sessionId: 0,
      messages: D.list(i_Message),
      sessionState: i_SessionState,
      requestAttributes: 0,
      responseContentType: D.m({ header: "ResponseContentType" }),
    },
    output: {
      contentType: D.m({ header: "Content-Type" }),
      messages: D.m({ header: "x-amz-lex-messages" }),
      sessionState: D.m({ header: "x-amz-lex-session-state" }),
      requestAttributes: D.m({ header: "x-amz-lex-request-attributes" }),
      sessionId: D.m({ header: "x-amz-lex-session-id" }),
      audioStream: D.m({ payload: true, shape: D.stream }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadGatewayException,
    ConflictException,
    DependencyFailedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutSession",
})) as any;

export type RecognizeTextError =
  | AccessDeniedException
  | BadGatewayException
  | ConflictException
  | DependencyFailedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sends user input to Amazon Lex V2. Client applications use this API to send
 * requests to Amazon Lex V2 at runtime. Amazon Lex V2 then interprets the user input
 * using the machine learning model that it build for the bot.
 *
 * In response, Amazon Lex V2 returns the next message to convey to the user
 * and an optional response card to display.
 *
 * If the optional post-fulfillment response is specified, the messages
 * are returned as follows. For more information, see PostFulfillmentStatusSpecification.
 *
 * - **Success message** - Returned if
 * the Lambda function completes successfully and the intent state is
 * fulfilled or ready fulfillment if the message is present.
 *
 * - **Failed message** - The failed
 * message is returned if the Lambda function throws an exception or
 * if the Lambda function returns a failed intent state without a
 * message.
 *
 * - **Timeout message** - If you
 * don't configure a timeout message and a timeout, and the Lambda
 * function doesn't return within 30 seconds, the timeout message is
 * returned. If you configure a timeout, the timeout message is
 * returned when the period times out.
 *
 * For more information, see Completion message.
 */
export const recognizeText: API.OperationMethod<
  RecognizeTextRequest,
  RecognizeTextResponse,
  RecognizeTextError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /bots/{botId}/botAliases/{botAliasId}/botLocales/{localeId}/sessions/{sessionId}/text",
    input: {
      botId: 0,
      botAliasId: 0,
      localeId: 0,
      sessionId: 0,
      text: 0,
      sessionState: i_SessionState,
      requestAttributes: 0,
    },
    output: { messages: D.list(o_Message), sessionState: o_SessionState },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadGatewayException,
    ConflictException,
    DependencyFailedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RecognizeText",
})) as any;

export type RecognizeUtteranceError =
  | AccessDeniedException
  | BadGatewayException
  | ConflictException
  | DependencyFailedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sends user input to Amazon Lex V2. You can send text or speech. Clients use
 * this API to send text and audio requests to Amazon Lex V2 at runtime. Amazon Lex V2
 * interprets the user input using the machine learning model built for
 * the bot.
 *
 * The following request fields must be compressed with gzip and then
 * base64 encoded before you send them to Amazon Lex V2.
 *
 * - requestAttributes
 *
 * - sessionState
 *
 * The following response fields are compressed using gzip and then
 * base64 encoded by Amazon Lex V2. Before you can use these fields, you must
 * decode and decompress them.
 *
 * - inputTranscript
 *
 * - interpretations
 *
 * - messages
 *
 * - requestAttributes
 *
 * - sessionState
 *
 * The example contains a Java application that compresses and encodes
 * a Java object to send to Amazon Lex V2, and a second that decodes and
 * decompresses a response from Amazon Lex V2.
 *
 * If the optional post-fulfillment response is specified, the messages
 * are returned as follows. For more information, see PostFulfillmentStatusSpecification.
 *
 * - **Success message** - Returned if
 * the Lambda function completes successfully and the intent state is
 * fulfilled or ready fulfillment if the message is present.
 *
 * - **Failed message** - The failed
 * message is returned if the Lambda function throws an exception or
 * if the Lambda function returns a failed intent state without a
 * message.
 *
 * - **Timeout message** - If you
 * don't configure a timeout message and a timeout, and the Lambda
 * function doesn't return within 30 seconds, the timeout message is
 * returned. If you configure a timeout, the timeout message is
 * returned when the period times out.
 *
 * For more information, see Completion message.
 */
export const recognizeUtterance: API.OperationMethod<
  RecognizeUtteranceRequest,
  RecognizeUtteranceResponse,
  RecognizeUtteranceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /bots/{botId}/botAliases/{botAliasId}/botLocales/{localeId}/sessions/{sessionId}/utterance",
    input: {
      botId: 0,
      botAliasId: 0,
      localeId: 0,
      sessionId: 0,
      sessionState: D.m({ header: "x-amz-lex-session-state" }),
      requestAttributes: D.m({ header: "x-amz-lex-request-attributes" }),
      requestContentType: D.m({ header: "Content-Type" }),
      responseContentType: D.m({ header: "Response-Content-Type" }),
      inputStream: D.m({ payload: true, shape: D.stream }),
    },
    output: {
      inputMode: D.m({ header: "x-amz-lex-input-mode" }),
      contentType: D.m({ header: "Content-Type" }),
      messages: D.m({ header: "x-amz-lex-messages" }),
      interpretations: D.m({ header: "x-amz-lex-interpretations" }),
      sessionState: D.m({ header: "x-amz-lex-session-state" }),
      requestAttributes: D.m({ header: "x-amz-lex-request-attributes" }),
      sessionId: D.m({ header: "x-amz-lex-session-id" }),
      inputTranscript: D.m({ header: "x-amz-lex-input-transcript" }),
      audioStream: D.m({ payload: true, shape: D.stream }),
      recognizedBotMember: D.m({ header: "x-amz-lex-recognized-bot-member" }),
    },
  },
  errors: [
    AccessDeniedException,
    BadGatewayException,
    ConflictException,
    DependencyFailedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RecognizeUtterance",
})) as any;

export type StartConversationError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts an HTTP/2 bidirectional event stream that enables you to send
 * audio, text, or DTMF input in real time. After your application starts
 * a conversation, users send input to Amazon Lex V2 as a stream of events. Amazon Lex V2
 * processes the incoming events and responds with streaming text or audio
 * events.
 *
 * Audio input must be in the following format: audio/lpcm
 * sample-rate=8000 sample-size-bits=16 channel-count=1;
 * is-big-endian=false.
 *
 * If the optional post-fulfillment response is specified, the messages
 * are returned as follows. For more information, see PostFulfillmentStatusSpecification.
 *
 * - **Success message** - Returned if
 * the Lambda function completes successfully and the intent state is
 * fulfilled or ready fulfillment if the message is present.
 *
 * - **Failed message** - The failed
 * message is returned if the Lambda function throws an exception or
 * if the Lambda function returns a failed intent state without a
 * message.
 *
 * - **Timeout message** - If you
 * don't configure a timeout message and a timeout, and the Lambda
 * function doesn't return within 30 seconds, the timeout message is
 * returned. If you configure a timeout, the timeout message is
 * returned when the period times out.
 *
 * For more information, see Completion message.
 *
 * If the optional update message is configured, it is played at the
 * specified frequency while the Lambda function is running and the update
 * message state is active. If the fulfillment update message is not
 * active, the Lambda function runs with a 30 second timeout.
 *
 * For more information, see Update message
 *
 * The `StartConversation` operation is supported only in
 * the following SDKs:
 *
 * - AWS SDK for C++
 *
 * - AWS SDK for Java V2
 *
 * - AWS SDK for Ruby V3
 */
export const startConversation: API.OperationMethod<
  StartConversationRequest,
  StartConversationResponse,
  StartConversationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /bots/{botId}/botAliases/{botAliasId}/botLocales/{localeId}/sessions/{sessionId}/conversation",
    input: {
      botId: 0,
      botAliasId: 0,
      localeId: 0,
      sessionId: 0,
      conversationMode: D.m({ header: "x-amz-lex-conversation-mode" }),
      requestEventStream: D.m({
        payload: true,
        shape: D.events({
          ConfigurationEvent: {
            requestAttributes: 0,
            responseContentType: 0,
            sessionState: i_SessionState,
            welcomeMessages: D.list(i_Message),
            disablePlayback: 0,
            eventId: 0,
            clientTimestampMillis: 0,
          },
          AudioInputEvent: {
            audioChunk: 0,
            contentType: 0,
            eventId: 0,
            clientTimestampMillis: 0,
          },
          DTMFInputEvent: {
            inputCharacter: 0,
            eventId: 0,
            clientTimestampMillis: 0,
          },
          TextInputEvent: { text: 0, eventId: 0, clientTimestampMillis: 0 },
          PlaybackCompletionEvent: { eventId: 0, clientTimestampMillis: 0 },
          DisconnectionEvent: { eventId: 0, clientTimestampMillis: 0 },
        }),
      }),
    },
    output: {
      responseEventStream: D.m({
        payload: true,
        shape: D.events({
          PlaybackInterruptionEvent: 0,
          TranscriptEvent: 0,
          IntentResultEvent: { sessionState: o_SessionState },
          TextResponseEvent: { messages: D.list(o_Message) },
          AudioResponseEvent: { audioChunk: D.blob },
          HeartbeatEvent: 0,
          AccessDeniedException: 0,
          ResourceNotFoundException: 0,
          ValidationException: 0,
          ThrottlingException: 0,
          InternalServerException: 0,
          ConflictException: 0,
          DependencyFailedException: 0,
          BadGatewayException: 0,
        }),
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartConversation",
})) as any;

const i_Message: D.LazyStruct = () => ({
  content: 0,
  contentType: 0,
  imageResponseCard: {
    title: 0,
    subtitle: 0,
    imageUrl: 0,
    buttons: D.list({ text: 0, value: 0 }),
  },
});
const i_SessionState: D.LazyStruct = () => ({
  dialogAction: {
    type: 0,
    slotToElicit: 0,
    slotElicitationStyle: 0,
    subSlotToElicit: i_ElicitSubSlot,
  },
  intent: { name: 0, slots: D.map(i_Slot), state: 0, confirmationState: 0 },
  activeContexts: D.list({
    name: 0,
    timeToLive: { timeToLiveInSeconds: 0, turnsToLive: 0 },
    contextAttributes: 0,
  }),
  sessionAttributes: 0,
  originatingRequestId: 0,
  runtimeHints: { slotHints: D.map(D.map(i_RuntimeHintDetails)) },
});
const o_Message: D.LazyStruct = () => ({ content: D.secret });
const o_SessionState: D.LazyStruct = () => ({
  activeContexts: D.list({ contextAttributes: D.map(D.secret) }),
});
const i_ElicitSubSlot: D.LazyStruct = () => ({
  name: 0,
  subSlotToElicit: i_ElicitSubSlot,
});
const i_RuntimeHintDetails: D.LazyStruct = () => ({
  runtimeHintValues: D.list({ phrase: 0 }),
  subSlotHints: D.map(i_RuntimeHintDetails),
});
const i_Slot: D.LazyStruct = () => ({
  value: { originalValue: 0, interpretedValue: 0, resolvedValues: 0 },
  shape: 0,
  values: D.list(i_Slot),
  subSlots: D.map(i_Slot),
});
