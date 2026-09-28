import type * as HttpClient from "effect/unstable/http/HttpClient";
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
  sdkId: "Pinpoint SMS Voice",
  target: "PinpointSMSVoice",
  version: "2018-09-05",
  sigv4: "sms-voice",
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
                `https://sms-voice.pinpoint-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://sms-voice.pinpoint-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://sms-voice.pinpoint.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://sms-voice.pinpoint.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "AlreadyExistsException",
    ["ConflictError", "AlreadyExistsError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class BadRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "BadRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InternalServiceErrorException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServiceErrorException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("LimitExceededException", [], {
    status: 412,
  })<{ readonly message?: string }> {}
export class NotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class TooManyRequestsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyRequestsException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export type WordCharactersWithDelimiters = string;
export interface CreateConfigurationSetRequest {
  ConfigurationSetName?: string;
}
export interface CreateConfigurationSetResponse {}
export interface CloudWatchLogsDestination {
  IamRoleArn?: string;
  LogGroupArn?: string;
}
export interface KinesisFirehoseDestination {
  DeliveryStreamArn?: string;
  IamRoleArn?: string;
}
export type EventType =
  | "INITIATED_CALL"
  | "RINGING"
  | "ANSWERED"
  | "COMPLETED_CALL"
  | "BUSY"
  | "FAILED"
  | "NO_ANSWER"
  | (string & {});
export type EventTypes = EventType[];
export interface SnsDestination {
  TopicArn?: string;
}
export interface EventDestinationDefinition {
  CloudWatchLogsDestination?: CloudWatchLogsDestination;
  Enabled?: boolean;
  KinesisFirehoseDestination?: KinesisFirehoseDestination;
  MatchingEventTypes?: EventType[];
  SnsDestination?: SnsDestination;
}
export type NonEmptyString = string;
export interface CreateConfigurationSetEventDestinationRequest {
  ConfigurationSetName: string;
  EventDestination?: EventDestinationDefinition;
  EventDestinationName?: string;
}
export interface CreateConfigurationSetEventDestinationResponse {}
export interface DeleteConfigurationSetRequest {
  ConfigurationSetName: string;
}
export interface DeleteConfigurationSetResponse {}
export interface DeleteConfigurationSetEventDestinationRequest {
  ConfigurationSetName: string;
  EventDestinationName: string;
}
export interface DeleteConfigurationSetEventDestinationResponse {}
export interface GetConfigurationSetEventDestinationsRequest {
  ConfigurationSetName: string;
}
export interface EventDestination {
  CloudWatchLogsDestination?: CloudWatchLogsDestination;
  Enabled?: boolean;
  KinesisFirehoseDestination?: KinesisFirehoseDestination;
  MatchingEventTypes?: EventType[];
  Name?: string;
  SnsDestination?: SnsDestination;
}
export type EventDestinations = EventDestination[];
export interface GetConfigurationSetEventDestinationsResponse {
  EventDestinations?: EventDestination[];
}
export interface ListConfigurationSetsRequest {
  NextToken?: string;
  PageSize?: string;
}
export type ConfigurationSets = string[];
export type NextTokenString = string;
export interface ListConfigurationSetsResponse {
  ConfigurationSets?: string[];
  NextToken?: string;
}
export interface CallInstructionsMessageType {
  Text?: string;
}
export interface PlainTextMessageType {
  LanguageCode?: string;
  Text?: string;
  VoiceId?: string;
}
export interface SSMLMessageType {
  LanguageCode?: string;
  Text?: string;
  VoiceId?: string;
}
export interface VoiceMessageContent {
  CallInstructionsMessage?: CallInstructionsMessageType;
  PlainTextMessage?: PlainTextMessageType;
  SSMLMessage?: SSMLMessageType;
}
export interface SendVoiceMessageRequest {
  CallerId?: string;
  ConfigurationSetName?: string;
  Content?: VoiceMessageContent;
  DestinationPhoneNumber?: string;
  OriginationPhoneNumber?: string;
}
export interface SendVoiceMessageResponse {
  MessageId?: string;
}
export interface UpdateConfigurationSetEventDestinationRequest {
  ConfigurationSetName: string;
  EventDestination?: EventDestinationDefinition;
  EventDestinationName: string;
}
export interface UpdateConfigurationSetEventDestinationResponse {}
export type CreateConfigurationSetError =
  | AlreadyExistsException
  | BadRequestException
  | InternalServiceErrorException
  | LimitExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Create a new configuration set. After you create the configuration set, you can add one or more event destinations to it.
 */
export const createConfigurationSet: API.OperationMethod<
  CreateConfigurationSetRequest,
  CreateConfigurationSetResponse,
  CreateConfigurationSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/sms-voice/configuration-sets",
    input: { ConfigurationSetName: 0 },
    body: true,
  },
  errors: [
    AlreadyExistsException,
    BadRequestException,
    InternalServiceErrorException,
    LimitExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConfigurationSet",
})) as any;

export type CreateConfigurationSetEventDestinationError =
  | AlreadyExistsException
  | BadRequestException
  | InternalServiceErrorException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Create a new event destination in a configuration set.
 */
export const createConfigurationSetEventDestination: API.OperationMethod<
  CreateConfigurationSetEventDestinationRequest,
  CreateConfigurationSetEventDestinationResponse,
  CreateConfigurationSetEventDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/sms-voice/configuration-sets/{ConfigurationSetName}/event-destinations",
    input: {
      ConfigurationSetName: 0,
      EventDestination: i_EventDestinationDefinition,
      EventDestinationName: 0,
    },
    body: true,
  },
  errors: [
    AlreadyExistsException,
    BadRequestException,
    InternalServiceErrorException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConfigurationSetEventDestination",
})) as any;

export type DeleteConfigurationSetError =
  | BadRequestException
  | InternalServiceErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an existing configuration set.
 */
export const deleteConfigurationSet: API.OperationMethod<
  DeleteConfigurationSetRequest,
  DeleteConfigurationSetResponse,
  DeleteConfigurationSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/sms-voice/configuration-sets/{ConfigurationSetName}",
    input: { ConfigurationSetName: 0 },
  },
  errors: [
    BadRequestException,
    InternalServiceErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfigurationSet",
})) as any;

export type DeleteConfigurationSetEventDestinationError =
  | BadRequestException
  | InternalServiceErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an event destination in a configuration set.
 */
export const deleteConfigurationSetEventDestination: API.OperationMethod<
  DeleteConfigurationSetEventDestinationRequest,
  DeleteConfigurationSetEventDestinationResponse,
  DeleteConfigurationSetEventDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/sms-voice/configuration-sets/{ConfigurationSetName}/event-destinations/{EventDestinationName}",
    input: { ConfigurationSetName: 0, EventDestinationName: 0 },
  },
  errors: [
    BadRequestException,
    InternalServiceErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfigurationSetEventDestination",
})) as any;

export type GetConfigurationSetEventDestinationsError =
  | BadRequestException
  | InternalServiceErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Obtain information about an event destination, including the types of events it reports, the Amazon Resource Name (ARN) of the destination, and the name of the event destination.
 */
export const getConfigurationSetEventDestinations: API.OperationMethod<
  GetConfigurationSetEventDestinationsRequest,
  GetConfigurationSetEventDestinationsResponse,
  GetConfigurationSetEventDestinationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/sms-voice/configuration-sets/{ConfigurationSetName}/event-destinations",
    input: { ConfigurationSetName: 0 },
  },
  errors: [
    BadRequestException,
    InternalServiceErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfigurationSetEventDestinations",
})) as any;

export type ListConfigurationSetsError =
  | BadRequestException
  | InternalServiceErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * List all of the configuration sets associated with your Amazon Pinpoint account in the current region.
 */
export const listConfigurationSets: API.OperationMethod<
  ListConfigurationSetsRequest,
  ListConfigurationSetsResponse,
  ListConfigurationSetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/sms-voice/configuration-sets",
    input: {
      NextToken: D.m({ query: "NextToken" }),
      PageSize: D.m({ query: "PageSize" }),
    },
  },
  errors: [
    BadRequestException,
    InternalServiceErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConfigurationSets",
})) as any;

export type SendVoiceMessageError =
  | BadRequestException
  | InternalServiceErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Create a new voice message and send it to a recipient's phone number.
 */
export const sendVoiceMessage: API.OperationMethod<
  SendVoiceMessageRequest,
  SendVoiceMessageResponse,
  SendVoiceMessageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/sms-voice/voice/message",
    input: {
      CallerId: 0,
      ConfigurationSetName: 0,
      Content: {
        CallInstructionsMessage: { Text: 0 },
        PlainTextMessage: { LanguageCode: 0, Text: 0, VoiceId: 0 },
        SSMLMessage: { LanguageCode: 0, Text: 0, VoiceId: 0 },
      },
      DestinationPhoneNumber: 0,
      OriginationPhoneNumber: 0,
    },
    body: true,
  },
  errors: [
    BadRequestException,
    InternalServiceErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendVoiceMessage",
})) as any;

export type UpdateConfigurationSetEventDestinationError =
  | BadRequestException
  | InternalServiceErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Update an event destination in a configuration set. An event destination is a location that you publish information about your voice calls to. For example, you can log an event to an Amazon CloudWatch destination when a call fails.
 */
export const updateConfigurationSetEventDestination: API.OperationMethod<
  UpdateConfigurationSetEventDestinationRequest,
  UpdateConfigurationSetEventDestinationResponse,
  UpdateConfigurationSetEventDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/sms-voice/configuration-sets/{ConfigurationSetName}/event-destinations/{EventDestinationName}",
    input: {
      ConfigurationSetName: 0,
      EventDestination: i_EventDestinationDefinition,
      EventDestinationName: 0,
    },
    body: true,
  },
  errors: [
    BadRequestException,
    InternalServiceErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConfigurationSetEventDestination",
})) as any;

const i_EventDestinationDefinition: D.LazyStruct = () => ({
  CloudWatchLogsDestination: { IamRoleArn: 0, LogGroupArn: 0 },
  Enabled: 0,
  KinesisFirehoseDestination: { DeliveryStreamArn: 0, IamRoleArn: 0 },
  MatchingEventTypes: 0,
  SnsDestination: { TopicArn: 0 },
});
