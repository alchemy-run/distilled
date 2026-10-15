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
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Pinpoint SMS Voice",
  serviceShapeName: "PinpointSMSVoice",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "sms-voice" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-09-05");
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://sms-voice.pinpoint.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://sms-voice.pinpoint.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://sms-voice.pinpoint.{R}.{D}","properties":{},"headers":{}}');

export class AlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<AlreadyExistsException>()(
    "AlreadyExistsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InternalServiceErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalServiceErrorException>()(
    "InternalServiceErrorException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(412),
  ) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
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
  input: __S(32, __c4, 0) as any as S.Schema<CreateConfigurationSetRequest>,
  output: __S(40, __c5, 0) as any as S.Schema<CreateConfigurationSetResponse>,
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
}));

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
  input: __S(48, __c6, 0) as any as S.Schema<CreateConfigurationSetEventDestinationRequest>,
  output: __S(40, __c5, 0) as any as S.Schema<CreateConfigurationSetEventDestinationResponse>,
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
}));

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
  input: __S(72, __c9, 0) as any as S.Schema<DeleteConfigurationSetRequest>,
  output: __S(40, __c5, 0) as any as S.Schema<DeleteConfigurationSetResponse>,
  errors: [
    BadRequestException,
    InternalServiceErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfigurationSet",
}));

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
  input: __S(80, __c10, 0) as any as S.Schema<DeleteConfigurationSetEventDestinationRequest>,
  output: __S(40, __c5, 0) as any as S.Schema<DeleteConfigurationSetEventDestinationResponse>,
  errors: [
    BadRequestException,
    InternalServiceErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfigurationSetEventDestination",
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<GetConfigurationSetEventDestinationsRequest>,
  output: __S(3, __c0, 3) as any as S.Schema<GetConfigurationSetEventDestinationsResponse>,
  errors: [
    BadRequestException,
    InternalServiceErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfigurationSetEventDestinations",
}));

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
  input: __S(8, __c1, 0) as any as S.Schema<ListConfigurationSetsRequest>,
  output: __S(10, __c1, 2) as any as S.Schema<ListConfigurationSetsResponse>,
  errors: [BadRequestException, InternalServiceErrorException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConfigurationSets",
}));

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
  input: __S(19, __c2, 3) as any as S.Schema<SendVoiceMessageRequest>,
  output: __S(20, __c2, 4) as any as S.Schema<SendVoiceMessageResponse>,
  errors: [BadRequestException, InternalServiceErrorException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendVoiceMessage",
}));

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
  input: __S(24, __c3, 0) as any as S.Schema<UpdateConfigurationSetEventDestinationRequest>,
  output: __S(40, __c5, 0) as any as S.Schema<UpdateConfigurationSetEventDestinationResponse>,
  errors: [
    BadRequestException,
    InternalServiceErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConfigurationSetEventDestination",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConfigurationSetName: S.String.pipe(T.HttpLabel("ConfigurationSetName")) }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v1/sms-voice/configuration-sets/{ConfigurationSetName}/event-destinations",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetConfigurationSetEventDestinationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CloudWatchLogsDestination: S.optional(__S(56, __c7, 0)),
          Enabled: S.optional(S.Boolean),
          KinesisFirehoseDestination: S.optional(__S(57, __c7, 1)),
          MatchingEventTypes: S.optional(__S(58, __c7, 2)),
          Name: S.optional(S.String),
          SnsDestination: S.optional(__S(59, __c7, 3)),
        }),
      ).annotate({ identifier: "EventDestination" });
    case 2:
      return S.Array(__S(1, __c0, 1));
    case 3:
      return S.suspend(() => S.Struct({ EventDestinations: S.optional(__S(2, __c0, 2)) })).annotate(
        { identifier: "GetConfigurationSetEventDestinationsResponse" },
      );
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          PageSize: S.optional(S.String).pipe(T.HttpQuery("PageSize")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/sms-voice/configuration-sets" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListConfigurationSetsRequest" });
    case 1:
      return S.Array(S.String);
    case 2:
      return S.suspend(() =>
        S.Struct({
          ConfigurationSets: S.optional(__S(9, __c1, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListConfigurationSetsResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Text: S.optional(S.String) })).annotate({
        identifier: "CallInstructionsMessageType",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          LanguageCode: S.optional(S.String),
          Text: S.optional(S.String),
          VoiceId: S.optional(S.String),
        }),
      ).annotate({ identifier: "PlainTextMessageType" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          CallInstructionsMessage: S.optional(__S(16, __c2, 0)),
          PlainTextMessage: S.optional(__S(17, __c2, 1)),
          SSMLMessage: S.optional(__S(17, __c2, 1)),
        }),
      ).annotate({ identifier: "VoiceMessageContent" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          CallerId: S.optional(S.String),
          ConfigurationSetName: S.optional(S.String),
          Content: S.optional(__S(18, __c2, 2)),
          DestinationPhoneNumber: S.optional(S.String),
          OriginationPhoneNumber: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/sms-voice/voice/message" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SendVoiceMessageRequest" });
    case 4:
      return S.suspend(() => S.Struct({ MessageId: S.optional(S.String) })).annotate({
        identifier: "SendVoiceMessageResponse",
      });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigurationSetName: S.String.pipe(T.HttpLabel("ConfigurationSetName")),
          EventDestination: S.optional(__S(64, __c8, 0)),
          EventDestinationName: S.String.pipe(T.HttpLabel("EventDestinationName")),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/v1/sms-voice/configuration-sets/{ConfigurationSetName}/event-destinations/{EventDestinationName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateConfigurationSetEventDestinationRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConfigurationSetName: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/sms-voice/configuration-sets" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateConfigurationSetRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "CreateConfigurationSetResponse",
      });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigurationSetName: S.String.pipe(T.HttpLabel("ConfigurationSetName")),
          EventDestination: S.optional(__S(64, __c8, 0)),
          EventDestinationName: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/v1/sms-voice/configuration-sets/{ConfigurationSetName}/event-destinations",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateConfigurationSetEventDestinationRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ IamRoleArn: S.optional(S.String), LogGroupArn: S.optional(S.String) }),
      ).annotate({ identifier: "CloudWatchLogsDestination" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DeliveryStreamArn: S.optional(S.String), IamRoleArn: S.optional(S.String) }),
      ).annotate({ identifier: "KinesisFirehoseDestination" });
    case 2:
      return S.Array(S.String);
    case 3:
      return S.suspend(() => S.Struct({ TopicArn: S.optional(S.String) })).annotate({
        identifier: "SnsDestination",
      });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CloudWatchLogsDestination: S.optional(__S(56, __c7, 0)),
          Enabled: S.optional(S.Boolean),
          KinesisFirehoseDestination: S.optional(__S(57, __c7, 1)),
          MatchingEventTypes: S.optional(__S(58, __c7, 2)),
          SnsDestination: S.optional(__S(59, __c7, 3)),
        }),
      ).annotate({ identifier: "EventDestinationDefinition" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConfigurationSetName: S.String.pipe(T.HttpLabel("ConfigurationSetName")) }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v1/sms-voice/configuration-sets/{ConfigurationSetName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteConfigurationSetRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigurationSetName: S.String.pipe(T.HttpLabel("ConfigurationSetName")),
          EventDestinationName: S.String.pipe(T.HttpLabel("EventDestinationName")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v1/sms-voice/configuration-sets/{ConfigurationSetName}/event-destinations/{EventDestinationName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteConfigurationSetEventDestinationRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
