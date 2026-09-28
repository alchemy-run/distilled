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
  sdkId: "IoT Data Plane",
  target: "IotMoonrakerService",
  version: "2015-05-28",
  sigv4: "iotdata",
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
                `https://data-ats.iot-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              if (Region === "ca-central-1") {
                return e("https://data.iot-fips.ca-central-1.amazonaws.com");
              }
              if (Region === "us-east-1") {
                return e("https://data.iot-fips.us-east-1.amazonaws.com");
              }
              if (Region === "us-east-2") {
                return e("https://data.iot-fips.us-east-2.amazonaws.com");
              }
              if (Region === "us-west-1") {
                return e("https://data.iot-fips.us-west-1.amazonaws.com");
              }
              if (Region === "us-west-2") {
                return e("https://data.iot-fips.us-west-2.amazonaws.com");
              }
              if (Region === "us-gov-east-1") {
                return e("https://data.iot-fips.us-gov-east-1.amazonaws.com");
              }
              if (Region === "us-gov-west-1") {
                return e("https://data.iot-fips.us-gov-west-1.amazonaws.com");
              }
              return e(
                `https://data-ats.iot-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://data-ats.iot.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          if (Region === "cn-north-1") {
            return e("https://data.ats.iot.cn-north-1.amazonaws.com.cn");
          }
          if ("aws" === _.getAttr(PartitionResult, "name")) {
            return e(`https://data-ats.iot.${Region}.amazonaws.com`);
          }
          if ("aws-cn" === _.getAttr(PartitionResult, "name")) {
            return e(`https://data-ats.iot.${Region}.amazonaws.com.cn`);
          }
          if ("aws-us-gov" === _.getAttr(PartitionResult, "name")) {
            return e(`https://data-ats.iot.${Region}.amazonaws.com`);
          }
          return e(
            `https://data-ats.iot.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string }> {}
export class ForbiddenException
  extends /*@__PURE__*/ TE.TaggedError("ForbiddenException", ["AuthError"], {
    status: 403,
  })<{ readonly message?: string }> {}
export class GatewayTimeoutException
  extends /*@__PURE__*/ TE.TaggedError(
    "GatewayTimeoutException",
    ["TimeoutError"],
    { status: 504 },
  )<{ readonly message?: string }> {}
export class InternalFailureException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalFailureException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class InvalidRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class MethodNotAllowedException
  extends /*@__PURE__*/ TE.TaggedError(
    "MethodNotAllowedException",
    ["BadRequestError"],
    { status: 405 },
  )<{ readonly message?: string }> {}
export class RequestEntityTooLargeException
  extends /*@__PURE__*/ TE.TaggedError(
    "RequestEntityTooLargeException",
    ["BadRequestError"],
    { status: 413 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceUnavailableException",
    ["ServerError"],
    { status: 503 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class UnauthorizedException
  extends /*@__PURE__*/ TE.TaggedError("UnauthorizedException", ["AuthError"], {
    status: 401,
  })<{ readonly message?: string }> {}
export class UnsupportedDocumentEncodingException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnsupportedDocumentEncodingException",
    ["BadRequestError"],
    { status: 415 },
  )<{ readonly message?: string }> {}
export type ClientId = string;
export type CleanSession = boolean;
export type PreventWillMessage = boolean;
export interface DeleteConnectionRequest {
  clientId: string;
  cleanSession?: boolean;
  preventWillMessage?: boolean;
}
export interface DeleteConnectionResponse {}
export type ThingName = string;
export type ShadowName = string;
export interface DeleteThingShadowRequest {
  thingName: string;
  shadowName?: string;
}
export interface DeleteThingShadowResponse {
  payload: T.StreamingOutputBody;
}
export type IncludeSocketInformation = boolean;
export interface GetConnectionRequest {
  clientId: string;
  includeSocketInformation?: boolean;
}
export type Connected = boolean;
export type SourceIp = string;
export type SourcePort = number;
export type TargetIp = string;
export type TargetPort = number;
export type KeepAliveDuration = number;
export type DisconnectReason = string;
export type SessionExpiry = number;
export type VpcEndpointId = string;
export interface GetConnectionResponse {
  connected?: boolean;
  thingName?: string;
  cleanSession?: boolean;
  sourceIp?: string;
  sourcePort?: number;
  targetIp?: string;
  targetPort?: number;
  keepAliveDuration?: number;
  connectedSince?: number;
  disconnectedSince?: number;
  disconnectReason?: string;
  sessionExpiry?: number;
  clientId?: string;
  vpcEndpointId?: string;
}
export type Topic = string;
export interface GetRetainedMessageRequest {
  topic: string;
}
export type Payload = Uint8Array;
export type Qos = number;
export type UserPropertiesBlob = Uint8Array;
export interface GetRetainedMessageResponse {
  topic?: string;
  payload?: Uint8Array;
  qos?: number;
  lastModifiedTime?: number;
  userProperties?: Uint8Array;
}
export interface GetThingShadowRequest {
  thingName: string;
  shadowName?: string;
}
export interface GetThingShadowResponse {
  payload?: T.StreamingOutputBody;
}
export type NextToken = string;
export type PageSize = number;
export interface ListNamedShadowsForThingRequest {
  thingName: string;
  nextToken?: string;
  pageSize?: number;
}
export type NamedShadowList = string[];
export interface ListNamedShadowsForThingResponse {
  results?: string[];
  nextToken?: string;
  timestamp?: number;
}
export type MaxResults = number;
export interface ListRetainedMessagesRequest {
  nextToken?: string;
  maxResults?: number;
}
export type PayloadSize = number;
export interface RetainedMessageSummary {
  topic?: string;
  payloadSize?: number;
  qos?: number;
  lastModifiedTime?: number;
}
export type RetainedMessageList = RetainedMessageSummary[];
export interface ListRetainedMessagesResponse {
  retainedTopics?: RetainedMessageSummary[];
  nextToken?: string;
}
export interface ListSubscriptionsRequest {
  clientId: string;
  nextToken?: string;
  maxResults?: number;
}
export type TopicFilter = string;
export interface SubscriptionSummary {
  topicFilter: string;
  qos: number;
}
export type SubscriptionList = SubscriptionSummary[];
export interface ListSubscriptionsResponse {
  subscriptions?: SubscriptionSummary[];
  nextToken?: string;
}
export type Retain = boolean;
export type SynthesizedJsonUserProperties = string;
export type PayloadFormatIndicator =
  | "UNSPECIFIED_BYTES"
  | "UTF8_DATA"
  | (string & {});
export type ContentType = string;
export type ResponseTopic = string;
export type CorrelationData = string;
export type MessageExpiry = number;
export interface PublishRequest {
  topic: string;
  qos?: number;
  retain?: boolean;
  payload?: T.StreamingInputBody;
  userProperties?: string;
  payloadFormatIndicator?: PayloadFormatIndicator;
  contentType?: string;
  responseTopic?: string;
  correlationData?: string;
  messageExpiry?: number;
}
export interface PublishResponse {}
export type Confirmation = boolean;
export type TimeoutInSeconds = number;
export interface SendDirectMessageRequest {
  clientId: string;
  topic: string;
  contentType?: string;
  responseTopic?: string;
  confirmation?: boolean;
  timeout?: number;
  payload?: T.StreamingInputBody;
  userProperties?: string;
  payloadFormatIndicator?: PayloadFormatIndicator;
  correlationData?: string;
}
export type ResponseMessage = string;
export type TraceId = string;
export interface SendDirectMessageResponse {
  message?: string;
  traceId?: string;
}
export interface UpdateThingShadowRequest {
  thingName: string;
  shadowName?: string;
  payload: T.StreamingInputBody;
}
export interface UpdateThingShadowResponse {
  payload?: T.StreamingOutputBody;
}
export type ErrorMessage = string;
export type DeleteConnectionError =
  | ForbiddenException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Disconnects a connected MQTT client from Amazon Web Services IoT Core. When you disconnect a client, Amazon Web Services IoT Core closes the client's network connection and optionally cleans the session state.
 *
 * Requires permission to access the DeleteConnection action.
 */
export const deleteConnection: API.OperationMethod<
  DeleteConnectionRequest,
  DeleteConnectionResponse,
  DeleteConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /connections/{clientId}",
    input: {
      clientId: 0,
      cleanSession: D.m({ query: "cleanSession" }),
      preventWillMessage: D.m({ query: "preventWillMessage" }),
    },
  },
  errors: [
    ForbiddenException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnection",
})) as any;

export type DeleteThingShadowError =
  | InternalFailureException
  | InvalidRequestException
  | MethodNotAllowedException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | UnsupportedDocumentEncodingException
  | ForbiddenException
  | CommonErrors;
/**
 * Deletes the shadow for the specified thing.
 *
 * Requires permission to access the DeleteThingShadow action.
 *
 * For more information, see DeleteThingShadow in the IoT Developer Guide.
 */
export const deleteThingShadow: API.OperationMethod<
  DeleteThingShadowRequest,
  DeleteThingShadowResponse,
  DeleteThingShadowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /things/{thingName}/shadow",
    input: { thingName: 0, shadowName: D.m({ query: "name" }) },
    output: { payload: D.m({ payload: true, shape: D.stream }) },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    MethodNotAllowedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    UnsupportedDocumentEncodingException,
    ForbiddenException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteThingShadow",
})) as any;

export type GetConnectionError =
  | ForbiddenException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves connection information for the specified MQTT client.
 *
 * Requires permission to access the GetConnection action.
 */
export const getConnection: API.OperationMethod<
  GetConnectionRequest,
  GetConnectionResponse,
  GetConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /connections/{clientId}",
    input: {
      clientId: 0,
      includeSocketInformation: D.m({ query: "includeSocketInformation" }),
    },
  },
  errors: [
    ForbiddenException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnection",
})) as any;

export type GetRetainedMessageError =
  | InternalFailureException
  | InvalidRequestException
  | MethodNotAllowedException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ForbiddenException
  | CommonErrors;
/**
 * Gets the details of a single retained message for the specified topic.
 *
 * This action returns the message payload of the retained message, which can
 * incur messaging costs. To list only the topic names of the retained messages, call
 * ListRetainedMessages.
 *
 * Requires permission to access the GetRetainedMessage action.
 *
 * For more information about messaging costs, see Amazon Web Services IoT Core
 * pricing - Messaging.
 */
export const getRetainedMessage: API.OperationMethod<
  GetRetainedMessageRequest,
  GetRetainedMessageResponse,
  GetRetainedMessageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /retainedMessage/{topic}",
    input: { topic: 0 },
    output: { payload: D.blob, userProperties: D.blob },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    MethodNotAllowedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ForbiddenException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRetainedMessage",
})) as any;

export type GetThingShadowError =
  | InternalFailureException
  | InvalidRequestException
  | MethodNotAllowedException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | UnsupportedDocumentEncodingException
  | ForbiddenException
  | CommonErrors;
/**
 * Gets the shadow for the specified thing.
 *
 * Requires permission to access the GetThingShadow action.
 *
 * For more information, see GetThingShadow in the
 * IoT Developer Guide.
 */
export const getThingShadow: API.OperationMethod<
  GetThingShadowRequest,
  GetThingShadowResponse,
  GetThingShadowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /things/{thingName}/shadow",
    input: { thingName: 0, shadowName: D.m({ query: "name" }) },
    output: { payload: D.m({ payload: true, shape: D.stream }) },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    MethodNotAllowedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    UnsupportedDocumentEncodingException,
    ForbiddenException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetThingShadow",
})) as any;

export type ListNamedShadowsForThingError =
  | InternalFailureException
  | InvalidRequestException
  | MethodNotAllowedException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ForbiddenException
  | CommonErrors;
/**
 * Lists the shadows for the specified thing.
 *
 * Requires permission to access the ListNamedShadowsForThing action.
 */
export const listNamedShadowsForThing: API.OperationMethod<
  ListNamedShadowsForThingRequest,
  ListNamedShadowsForThingResponse,
  ListNamedShadowsForThingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /api/things/shadow/ListNamedShadowsForThing/{thingName}",
    input: {
      thingName: 0,
      nextToken: D.m({ query: "nextToken" }),
      pageSize: D.m({ query: "pageSize" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    MethodNotAllowedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ForbiddenException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNamedShadowsForThing",
})) as any;

export type ListRetainedMessagesError =
  | InternalFailureException
  | InvalidRequestException
  | MethodNotAllowedException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ForbiddenException
  | CommonErrors;
/**
 * Lists summary information about the retained messages stored for the account.
 *
 * This action returns only the topic names of the retained messages. It doesn't
 * return any message payloads. Although this action doesn't return a message payload,
 * it can still incur messaging costs.
 *
 * To get the message payload of a retained message, call
 * GetRetainedMessage
 * with the topic name of the retained message.
 *
 * Requires permission to access the ListRetainedMessages action.
 *
 * For more information about messaging costs, see Amazon Web Services IoT Core
 * pricing - Messaging.
 */
export const listRetainedMessages: API.PaginatedOperationMethod<
  ListRetainedMessagesRequest,
  ListRetainedMessagesResponse,
  ListRetainedMessagesError,
  Credentials | HttpClient.HttpClient,
  RetainedMessageSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /retainedMessage",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    MethodNotAllowedException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ForbiddenException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRetainedMessages",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "retainedTopics",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSubscriptionsError =
  | ForbiddenException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a list of all subscriptions for MQTT clients with active sessions, including offline clients with persistent sessions.
 *
 * Requires permission to access the ListSubscriptions action.
 */
export const listSubscriptions: API.PaginatedOperationMethod<
  ListSubscriptionsRequest,
  ListSubscriptionsResponse,
  ListSubscriptionsError,
  Credentials | HttpClient.HttpClient,
  SubscriptionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /connections/{clientId}/subscriptions",
    input: {
      clientId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    ForbiddenException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSubscriptions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "subscriptions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PublishError =
  | InternalFailureException
  | InvalidRequestException
  | MethodNotAllowedException
  | ThrottlingException
  | UnauthorizedException
  | ForbiddenException
  | CommonErrors;
/**
 * Publishes an MQTT message.
 *
 * Requires permission to access the Publish action.
 *
 * For more information about MQTT messages, see
 * MQTT Protocol in the
 * IoT Developer Guide.
 *
 * For more information about messaging costs, see Amazon Web Services IoT Core
 * pricing - Messaging.
 */
export const publish: API.OperationMethod<
  PublishRequest,
  PublishResponse,
  PublishError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /topics/{topic}",
    input: {
      topic: 0,
      qos: D.m({ query: "qos" }),
      retain: D.m({ query: "retain" }),
      payload: D.m({ payload: true, shape: D.stream }),
      userProperties: D.m({ header: "x-amz-mqtt5-user-properties" }),
      payloadFormatIndicator: D.m({
        header: "x-amz-mqtt5-payload-format-indicator",
      }),
      contentType: D.m({ query: "contentType" }),
      responseTopic: D.m({ query: "responseTopic" }),
      correlationData: D.m({ header: "x-amz-mqtt5-correlation-data" }),
      messageExpiry: D.m({ query: "messageExpiry" }),
    },
  },
  errors: [
    InternalFailureException,
    InvalidRequestException,
    MethodNotAllowedException,
    ThrottlingException,
    UnauthorizedException,
    ForbiddenException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Publish",
})) as any;

export type SendDirectMessageError =
  | ForbiddenException
  | GatewayTimeoutException
  | InternalFailureException
  | InvalidRequestException
  | RequestEntityTooLargeException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Sends an MQTT message directly to a specific client identified by its client ID.
 *
 * `SendDirectMessage` targets a single client ID. The receiving client does not
 * need to subscribe to the topic, but the receiver's policy must allow `iot:Receive` on the specified topic.
 *
 * Requires permission to access the SendDirectMessage action.
 *
 * For more information about messaging costs, see Amazon Web Services IoT Core
 * pricing.
 */
export const sendDirectMessage: API.OperationMethod<
  SendDirectMessageRequest,
  SendDirectMessageResponse,
  SendDirectMessageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /connections/{clientId}/messages",
    input: {
      clientId: 0,
      topic: D.m({ query: "topic" }),
      contentType: D.m({ query: "contentType" }),
      responseTopic: D.m({ query: "responseTopic" }),
      confirmation: D.m({ query: "confirmation" }),
      timeout: D.m({ query: "timeout" }),
      payload: D.m({ payload: true, shape: D.stream }),
      userProperties: D.m({ header: "x-amz-mqtt5-user-properties" }),
      payloadFormatIndicator: D.m({
        header: "x-amz-mqtt5-payload-format-indicator",
      }),
      correlationData: D.m({ header: "x-amz-mqtt5-correlation-data" }),
    },
  },
  errors: [
    ForbiddenException,
    GatewayTimeoutException,
    InternalFailureException,
    InvalidRequestException,
    RequestEntityTooLargeException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendDirectMessage",
})) as any;

export type UpdateThingShadowError =
  | ConflictException
  | InternalFailureException
  | InvalidRequestException
  | MethodNotAllowedException
  | RequestEntityTooLargeException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | UnsupportedDocumentEncodingException
  | ForbiddenException
  | CommonErrors;
/**
 * Updates the shadow for the specified thing.
 *
 * Requires permission to access the UpdateThingShadow action.
 *
 * For more information, see UpdateThingShadow in the
 * IoT Developer Guide.
 */
export const updateThingShadow: API.OperationMethod<
  UpdateThingShadowRequest,
  UpdateThingShadowResponse,
  UpdateThingShadowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /things/{thingName}/shadow",
    input: {
      thingName: 0,
      shadowName: D.m({ query: "name" }),
      payload: D.m({ payload: true, shape: D.stream }),
    },
    output: { payload: D.m({ payload: true, shape: D.stream }) },
  },
  errors: [
    ConflictException,
    InternalFailureException,
    InvalidRequestException,
    MethodNotAllowedException,
    RequestEntityTooLargeException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    UnsupportedDocumentEncodingException,
    ForbiddenException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateThingShadow",
})) as any;
