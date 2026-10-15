import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import type * as stream from "effect/Stream";
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
  sdkId: "Lex Runtime V2",
  serviceShapeName: "AWSDeepSenseRunTimeServiceApi2_0",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "lex" });
const ver = /*@__PURE__*/ T.ServiceVersion("2020-08-07");
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://runtime-v2-lex.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://runtime-v2-lex.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://runtime-v2-lex.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class BadGatewayException
  extends /*@__PURE__*/ S.TaggedError<BadGatewayException>()(
    "BadGatewayException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(502),
  ).pipe(C.withServerError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class DependencyFailedException
  extends /*@__PURE__*/ S.TaggedError<DependencyFailedException>()(
    "DependencyFailedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(424),
  ) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type SentimentType = "MIXED" | "NEGATIVE" | "NEUTRAL" | "POSITIVE" | (string & {});
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
export type StyleType = "Default" | "SpellByLetter" | "SpellByWord" | (string & {});
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
  contextAttributes: { [key: string]: string | redacted.Redacted<string> | undefined };
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
export type SlotHintsSlotMap = { [key: string]: RuntimeHintDetails | undefined };
export type SlotHintsIntentMap = {
  [key: string]: { [key: string]: RuntimeHintDetails | undefined } | undefined;
};
export interface RuntimeHints {
  slotHints?: { [key: string]: { [key: string]: RuntimeHintDetails | undefined } | undefined };
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
  requestEventStream: stream.Stream<StartConversationRequestEventStream, Error, never>;
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
  responseEventStream?: stream.Stream<StartConversationResponseEventStream, Error, never>;
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
  input: __S(160, __c5, 0) as any as S.Schema<DeleteSessionRequest>,
  output: __S(161, __c5, 1) as any as S.Schema<DeleteSessionResponse>,
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
}));

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
  input: __S(192, __c6, 0) as any as S.Schema<GetSessionRequest>,
  output: __S(193, __c6, 1) as any as S.Schema<GetSessionResponse>,
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
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<PutSessionRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<PutSessionResponse>,
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
}));

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
  input: __S(32, __c1, 0) as any as S.Schema<RecognizeTextRequest>,
  output: __S(33, __c1, 1) as any as S.Schema<RecognizeTextResponse>,
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
}));

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
  input: __S(96, __c3, 0) as any as S.Schema<RecognizeUtteranceRequest>,
  output: __S(97, __c3, 1) as any as S.Schema<RecognizeUtteranceResponse>,
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
}));

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
  input: __S(134, __c4, 6) as any as S.Schema<StartConversationRequest>,
  output: __S(142, __c4, 14) as any as S.Schema<StartConversationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartConversation",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          botId: S.String.pipe(T.HttpLabel("botId")),
          botAliasId: S.String.pipe(T.HttpLabel("botAliasId")),
          localeId: S.String.pipe(T.HttpLabel("localeId")),
          sessionId: S.String.pipe(T.HttpLabel("sessionId")),
          messages: S.optional(__S(228, __c7, 4)),
          sessionState: __S(248, __c7, 24),
          requestAttributes: S.optional(__S(241, __c7, 17)),
          responseContentType: S.optional(S.String).pipe(T.HttpHeader("ResponseContentType")),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/bots/{botId}/botAliases/{botAliasId}/botLocales/{localeId}/sessions/{sessionId}",
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
          messages: S.optional(S.String).pipe(T.HttpHeader("x-amz-lex-messages")),
          sessionState: S.optional(S.String).pipe(T.HttpHeader("x-amz-lex-session-state")),
          requestAttributes: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-lex-request-attributes"),
          ),
          sessionId: S.optional(S.String).pipe(T.HttpHeader("x-amz-lex-session-id")),
          audioStream: S.optional(T.StreamingOutput).pipe(T.HttpPayload()),
        }),
      ).annotate({ identifier: "PutSessionResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          botId: S.String.pipe(T.HttpLabel("botId")),
          botAliasId: S.String.pipe(T.HttpLabel("botAliasId")),
          localeId: S.String.pipe(T.HttpLabel("localeId")),
          sessionId: S.String.pipe(T.HttpLabel("sessionId")),
          text: SensitiveString,
          sessionState: S.optional(__S(248, __c7, 24)),
          requestAttributes: S.optional(__S(241, __c7, 17)),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/bots/{botId}/botAliases/{botAliasId}/botLocales/{localeId}/sessions/{sessionId}/text",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RecognizeTextRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          messages: S.optional(__S(228, __c7, 4)),
          sessionState: S.optional(__S(248, __c7, 24)),
          interpretations: S.optional(__S(260, __c8, 4)),
          requestAttributes: S.optional(__S(241, __c7, 17)),
          sessionId: S.optional(S.String),
          recognizedBotMember: S.optional(__S(64, __c2, 0)),
        }),
      ).annotate({ identifier: "RecognizeTextResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ botId: S.String, botName: S.optional(S.String) })).annotate(
        { identifier: "RecognizedBotMember" },
      );
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          botId: S.String.pipe(T.HttpLabel("botId")),
          botAliasId: S.String.pipe(T.HttpLabel("botAliasId")),
          localeId: S.String.pipe(T.HttpLabel("localeId")),
          sessionId: S.String.pipe(T.HttpLabel("sessionId")),
          sessionState: S.optional(SensitiveString).pipe(T.HttpHeader("x-amz-lex-session-state")),
          requestAttributes: S.optional(SensitiveString).pipe(
            T.HttpHeader("x-amz-lex-request-attributes"),
          ),
          requestContentType: S.String.pipe(T.HttpHeader("Content-Type")),
          responseContentType: S.optional(S.String).pipe(T.HttpHeader("Response-Content-Type")),
          inputStream: S.optional(T.StreamingInput).pipe(T.HttpPayload()),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/bots/{botId}/botAliases/{botAliasId}/botLocales/{localeId}/sessions/{sessionId}/utterance",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RecognizeUtteranceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          inputMode: S.optional(S.String).pipe(T.HttpHeader("x-amz-lex-input-mode")),
          contentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
          messages: S.optional(S.String).pipe(T.HttpHeader("x-amz-lex-messages")),
          interpretations: S.optional(S.String).pipe(T.HttpHeader("x-amz-lex-interpretations")),
          sessionState: S.optional(S.String).pipe(T.HttpHeader("x-amz-lex-session-state")),
          requestAttributes: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-lex-request-attributes"),
          ),
          sessionId: S.optional(S.String).pipe(T.HttpHeader("x-amz-lex-session-id")),
          inputTranscript: S.optional(S.String).pipe(T.HttpHeader("x-amz-lex-input-transcript")),
          audioStream: S.optional(T.StreamingOutput).pipe(T.HttpPayload()),
          recognizedBotMember: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-lex-recognized-bot-member"),
          ),
        }),
      ).annotate({ identifier: "RecognizeUtteranceResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          requestAttributes: S.optional(__S(241, __c7, 17)),
          responseContentType: S.String,
          sessionState: S.optional(__S(248, __c7, 24)),
          welcomeMessages: S.optional(__S(228, __c7, 4)),
          disablePlayback: S.optional(S.Boolean),
          eventId: S.optional(S.String),
          clientTimestampMillis: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ConfigurationEvent" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          audioChunk: S.optional(T.Blob),
          contentType: S.String,
          eventId: S.optional(S.String),
          clientTimestampMillis: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AudioInputEvent" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          inputCharacter: SensitiveString,
          eventId: S.optional(S.String),
          clientTimestampMillis: S.optional(S.Number),
        }),
      ).annotate({ identifier: "DTMFInputEvent" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          text: SensitiveString,
          eventId: S.optional(S.String),
          clientTimestampMillis: S.optional(S.Number),
        }),
      ).annotate({ identifier: "TextInputEvent" });
    case 4:
      return S.suspend(() =>
        S.Struct({ eventId: S.optional(S.String), clientTimestampMillis: S.optional(S.Number) }),
      ).annotate({ identifier: "PlaybackCompletionEvent" });
    case 5:
      return T.InputEventStream(
        /*@__PURE__*/ S.Union([
          /*@__PURE__*/ S.Struct({ ConfigurationEvent: __S(128, __c4, 0) }),
          /*@__PURE__*/ S.Struct({ AudioInputEvent: __S(129, __c4, 1) }),
          /*@__PURE__*/ S.Struct({ DTMFInputEvent: __S(130, __c4, 2) }),
          /*@__PURE__*/ S.Struct({ TextInputEvent: __S(131, __c4, 3) }),
          /*@__PURE__*/ S.Struct({ PlaybackCompletionEvent: __S(132, __c4, 4) }),
          /*@__PURE__*/ S.Struct({ DisconnectionEvent: __S(132, __c4, 4) }),
        ]),
      );
    case 6:
      return S.suspend(() =>
        S.Struct({
          botId: S.String.pipe(T.HttpLabel("botId")),
          botAliasId: S.String.pipe(T.HttpLabel("botAliasId")),
          localeId: S.String.pipe(T.HttpLabel("localeId")),
          sessionId: S.String.pipe(T.HttpLabel("sessionId")),
          conversationMode: S.optional(S.String).pipe(T.HttpHeader("x-amz-lex-conversation-mode")),
          requestEventStream: __S(133, __c4, 5).pipe(T.HttpPayload()),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/bots/{botId}/botAliases/{botAliasId}/botLocales/{localeId}/sessions/{sessionId}/conversation",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartConversationRequest" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          eventReason: S.optional(S.String),
          causedByEventId: S.optional(S.String),
          eventId: S.optional(S.String),
        }),
      ).annotate({ identifier: "PlaybackInterruptionEvent" });
    case 8:
      return S.suspend(() =>
        S.Struct({ transcript: S.optional(S.String), eventId: S.optional(S.String) }),
      ).annotate({ identifier: "TranscriptEvent" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          inputMode: S.optional(S.String),
          interpretations: S.optional(__S(260, __c8, 4)),
          sessionState: S.optional(__S(248, __c7, 24)),
          requestAttributes: S.optional(__S(241, __c7, 17)),
          sessionId: S.optional(S.String),
          eventId: S.optional(S.String),
          recognizedBotMember: S.optional(__S(64, __c2, 0)),
        }),
      ).annotate({ identifier: "IntentResultEvent" });
    case 10:
      return S.suspend(() =>
        S.Struct({ messages: S.optional(__S(228, __c7, 4)), eventId: S.optional(S.String) }),
      ).annotate({ identifier: "TextResponseEvent" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          audioChunk: S.optional(T.Blob),
          contentType: S.optional(S.String),
          eventId: S.optional(S.String),
        }),
      ).annotate({ identifier: "AudioResponseEvent" });
    case 12:
      return S.suspend(() => S.Struct({ eventId: S.optional(S.String) })).annotate({
        identifier: "HeartbeatEvent",
      });
    case 13:
      return T.EventStream(
        /*@__PURE__*/ S.Union([
          /*@__PURE__*/ S.Struct({ PlaybackInterruptionEvent: __S(135, __c4, 7) }),
          /*@__PURE__*/ S.Struct({ TranscriptEvent: __S(136, __c4, 8) }),
          /*@__PURE__*/ S.Struct({ IntentResultEvent: __S(137, __c4, 9) }),
          /*@__PURE__*/ S.Struct({ TextResponseEvent: __S(138, __c4, 10) }),
          /*@__PURE__*/ S.Struct({ AudioResponseEvent: __S(139, __c4, 11) }),
          /*@__PURE__*/ S.Struct({ HeartbeatEvent: __S(140, __c4, 12) }),
          /*@__PURE__*/ S.Struct({
            AccessDeniedException: /*@__PURE__*/ S.suspend(() => AccessDeniedException).annotate({
              identifier: "AccessDeniedException",
            }),
          }),
          /*@__PURE__*/ S.Struct({
            ResourceNotFoundException: /*@__PURE__*/ S.suspend(
              () => ResourceNotFoundException,
            ).annotate({ identifier: "ResourceNotFoundException" }),
          }),
          /*@__PURE__*/ S.Struct({
            ValidationException: /*@__PURE__*/ S.suspend(() => ValidationException).annotate({
              identifier: "ValidationException",
            }),
          }),
          /*@__PURE__*/ S.Struct({
            ThrottlingException: /*@__PURE__*/ S.suspend(() => ThrottlingException).annotate({
              identifier: "ThrottlingException",
            }),
          }),
          /*@__PURE__*/ S.Struct({
            InternalServerException: /*@__PURE__*/ S.suspend(
              () => InternalServerException,
            ).annotate({ identifier: "InternalServerException" }),
          }),
          /*@__PURE__*/ S.Struct({
            ConflictException: /*@__PURE__*/ S.suspend(() => ConflictException).annotate({
              identifier: "ConflictException",
            }),
          }),
          /*@__PURE__*/ S.Struct({
            DependencyFailedException: /*@__PURE__*/ S.suspend(
              () => DependencyFailedException,
            ).annotate({ identifier: "DependencyFailedException" }),
          }),
          /*@__PURE__*/ S.Struct({
            BadGatewayException: /*@__PURE__*/ S.suspend(() => BadGatewayException).annotate({
              identifier: "BadGatewayException",
            }),
          }),
        ]),
      );
    case 14:
      return S.suspend(() =>
        S.Struct({ responseEventStream: S.optional(__S(141, __c4, 13)).pipe(T.HttpPayload()) }),
      ).annotate({ identifier: "StartConversationResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          botId: S.String.pipe(T.HttpLabel("botId")),
          botAliasId: S.String.pipe(T.HttpLabel("botAliasId")),
          localeId: S.String.pipe(T.HttpLabel("localeId")),
          sessionId: S.String.pipe(T.HttpLabel("sessionId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/bots/{botId}/botAliases/{botAliasId}/botLocales/{localeId}/sessions/{sessionId}",
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
          botId: S.optional(S.String),
          botAliasId: S.optional(S.String),
          localeId: S.optional(S.String),
          sessionId: S.optional(S.String),
        }),
      ).annotate({ identifier: "DeleteSessionResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          botId: S.String.pipe(T.HttpLabel("botId")),
          botAliasId: S.String.pipe(T.HttpLabel("botAliasId")),
          localeId: S.String.pipe(T.HttpLabel("localeId")),
          sessionId: S.String.pipe(T.HttpLabel("sessionId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/bots/{botId}/botAliases/{botAliasId}/botLocales/{localeId}/sessions/{sessionId}",
            }),
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
          sessionId: S.optional(S.String),
          messages: S.optional(__S(228, __c7, 4)),
          interpretations: S.optional(__S(260, __c8, 4)),
          sessionState: S.optional(__S(248, __c7, 24)),
        }),
      ).annotate({ identifier: "GetSessionResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ text: S.String, value: S.String })).annotate({
        identifier: "Button",
      });
    case 1:
      return S.Array(__S(224, __c7, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          title: S.String,
          subtitle: S.optional(S.String),
          imageUrl: S.optional(S.String),
          buttons: S.optional(__S(225, __c7, 1)),
        }),
      ).annotate({ identifier: "ImageResponseCard" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          content: S.optional(SensitiveString),
          contentType: S.String,
          imageResponseCard: S.optional(__S(226, __c7, 2)),
        }),
      ).annotate({ identifier: "Message" });
    case 4:
      return S.Array(__S(227, __c7, 3));
    case 5:
      return S.Array(S.String);
    case 6:
      return S.suspend(() =>
        S.Struct({
          originalValue: S.optional(S.String),
          interpretedValue: S.String,
          resolvedValues: S.optional(__S(229, __c7, 5)),
        }),
      ).annotate({ identifier: "Value" });
    case 7:
      return S.Array(
        /*@__PURE__*/ S.suspend((): S.Schema<Slot> => __S(232, __c7, 8)).annotate({
          identifier: "Slot",
        }),
      );
    case 8:
      return S.suspend(() =>
        S.Struct({
          value: S.optional(__S(230, __c7, 6)),
          shape: S.optional(S.String),
          values: S.optional(S.suspend(() => __S(231, __c7, 7)).annotate({ identifier: "Values" })),
          subSlots: S.optional(
            S.suspend(() => __S(233, __c7, 9)).annotate({ identifier: "Slots" }),
          ),
        }),
      ).annotate({ identifier: "Slot" });
    case 9:
      return S.Record(
        S.String,
        /*@__PURE__*/ S.suspend((): S.Schema<Slot> => __S(232, __c7, 8))
          .annotate({ identifier: "Slot" })
          .pipe(S.optional),
      );
    case 10:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          slots: S.optional(__S(233, __c7, 9)),
          state: S.optional(S.String),
          confirmationState: S.optional(S.String),
        }),
      ).annotate({ identifier: "Intent" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          subSlotToElicit: S.optional(
            S.suspend((): S.Schema<ElicitSubSlot> => __S(235, __c7, 11)).annotate({
              identifier: "ElicitSubSlot",
            }),
          ),
        }),
      ).annotate({ identifier: "ElicitSubSlot" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          slotToElicit: S.optional(S.String),
          slotElicitationStyle: S.optional(S.String),
          subSlotToElicit: S.optional(__S(235, __c7, 11)),
        }),
      ).annotate({ identifier: "DialogAction" });
    case 13:
      return S.suspend(() =>
        S.Struct({ timeToLiveInSeconds: S.Number, turnsToLive: S.Number }),
      ).annotate({ identifier: "ActiveContextTimeToLive" });
    case 14:
      return S.Record(S.String, /*@__PURE__*/ SensitiveString.pipe(S.optional));
    case 15:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          timeToLive: __S(237, __c7, 13),
          contextAttributes: __S(238, __c7, 14),
        }),
      ).annotate({ identifier: "ActiveContext" });
    case 16:
      return S.Array(__S(239, __c7, 15));
    case 17:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 18:
      return S.suspend(() => S.Struct({ phrase: S.String })).annotate({
        identifier: "RuntimeHintValue",
      });
    case 19:
      return S.Array(__S(242, __c7, 18));
    case 20:
      return S.suspend(() =>
        S.Struct({
          runtimeHintValues: S.optional(__S(243, __c7, 19)),
          subSlotHints: S.optional(
            S.suspend(() => __S(245, __c7, 21)).annotate({ identifier: "SlotHintsSlotMap" }),
          ),
        }),
      ).annotate({ identifier: "RuntimeHintDetails" });
    case 21:
      return S.Record(
        S.String,
        /*@__PURE__*/ S.suspend((): S.Schema<RuntimeHintDetails> => __S(244, __c7, 20))
          .annotate({ identifier: "RuntimeHintDetails" })
          .pipe(S.optional),
      );
    case 22:
      return S.Record(
        S.String,
        /*@__PURE__*/ S.suspend(() => __S(245, __c7, 21))
          .annotate({ identifier: "SlotHintsSlotMap" })
          .pipe(S.optional),
      );
    case 23:
      return S.suspend(() => S.Struct({ slotHints: S.optional(__S(246, __c7, 22)) })).annotate({
        identifier: "RuntimeHints",
      });
    case 24:
      return S.suspend(() =>
        S.Struct({
          dialogAction: S.optional(__S(236, __c7, 12)),
          intent: S.optional(__S(234, __c7, 10)),
          activeContexts: S.optional(__S(240, __c7, 16)),
          sessionAttributes: S.optional(__S(241, __c7, 17)),
          originatingRequestId: S.optional(S.String),
          runtimeHints: S.optional(__S(247, __c7, 23)),
        }),
      ).annotate({ identifier: "SessionState" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ score: S.optional(S.Number) })).annotate({
        identifier: "ConfidenceScore",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          positive: S.optional(S.Number),
          negative: S.optional(S.Number),
          neutral: S.optional(S.Number),
          mixed: S.optional(S.Number),
        }),
      ).annotate({ identifier: "SentimentScore" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          sentiment: S.optional(S.String),
          sentimentScore: S.optional(__S(257, __c8, 1)),
        }),
      ).annotate({ identifier: "SentimentResponse" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          nluConfidence: S.optional(__S(256, __c8, 0)),
          sentimentResponse: S.optional(__S(258, __c8, 2)),
          intent: S.optional(__S(234, __c7, 10)),
          interpretationSource: S.optional(S.String),
        }),
      ).annotate({ identifier: "Interpretation" });
    case 4:
      return S.Array(__S(259, __c8, 3));
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
