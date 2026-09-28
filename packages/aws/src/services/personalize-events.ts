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
  sdkId: "Personalize Events",
  target: "AmazonPersonalizeEvents",
  version: "2018-03-22",
  sigv4: "personalize",
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
                `https://personalize-events-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://personalize-events-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://personalize-events.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://personalize-events.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class InvalidInputException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidInputException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceInUseException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceInUseException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export type StringType = string;
export type ActionId = string | redacted.Redacted<string>;
export type UserId = string | redacted.Redacted<string>;
export type RecommendationId = string;
export type ActionImpression = (string | redacted.Redacted<string>)[];
export type SynthesizedJsonActionInteractionProperties =
  | string
  | redacted.Redacted<string>;
export interface ActionInteraction {
  actionId: string | redacted.Redacted<string>;
  userId?: string | redacted.Redacted<string>;
  sessionId: string;
  timestamp: Date;
  eventType: string;
  eventId?: string;
  recommendationId?: string;
  impression?: (string | redacted.Redacted<string>)[];
  properties?: string | redacted.Redacted<string>;
}
export type ActionInteractionsList = ActionInteraction[];
export interface PutActionInteractionsRequest {
  trackingId: string;
  actionInteractions: ActionInteraction[];
}
export interface PutActionInteractionsResponse {}
export type Arn = string;
export type SynthesizedJsonActionProperties =
  | string
  | redacted.Redacted<string>;
export interface Action {
  actionId: string;
  properties?: string | redacted.Redacted<string>;
}
export type ActionList = Action[];
export interface PutActionsRequest {
  datasetArn: string;
  actions: Action[];
}
export interface PutActionsResponse {}
export type FloatType = number;
export type ItemId = string | redacted.Redacted<string>;
export type SynthesizedJsonEventPropertiesJSON =
  | string
  | redacted.Redacted<string>;
export type Impression = (string | redacted.Redacted<string>)[];
export type EventAttributionSource = string;
export interface MetricAttribution {
  eventAttributionSource: string;
}
export interface Event {
  eventId?: string;
  eventType: string;
  eventValue?: number;
  itemId?: string | redacted.Redacted<string>;
  properties?: string | redacted.Redacted<string>;
  sentAt: Date;
  recommendationId?: string;
  impression?: (string | redacted.Redacted<string>)[];
  metricAttribution?: MetricAttribution;
}
export type EventList = Event[];
export interface PutEventsRequest {
  trackingId: string;
  userId?: string | redacted.Redacted<string>;
  sessionId: string;
  eventList: Event[];
}
export interface PutEventsResponse {}
export type SynthesizedJsonItemProperties = string | redacted.Redacted<string>;
export interface Item {
  itemId: string;
  properties?: string | redacted.Redacted<string>;
}
export type ItemList = Item[];
export interface PutItemsRequest {
  datasetArn: string;
  items: Item[];
}
export interface PutItemsResponse {}
export type SynthesizedJsonUserProperties = string | redacted.Redacted<string>;
export interface User {
  userId: string;
  properties?: string | redacted.Redacted<string>;
}
export type UserList = User[];
export interface PutUsersRequest {
  datasetArn: string;
  users: User[];
}
export interface PutUsersResponse {}
export type ErrorMessage = string;
export type PutActionInteractionsError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Records action interaction event data. An *action interaction* event is an interaction between a user and an *action*.
 * For example, a user taking an action, such a enrolling in a membership program or downloading your app.
 *
 * For more information about recording action interactions, see Recording action interaction events.
 * For more information about actions in an Actions dataset, see Actions dataset.
 */
export const putActionInteractions: API.OperationMethod<
  PutActionInteractionsRequest,
  PutActionInteractionsResponse,
  PutActionInteractionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /action-interactions",
    input: {
      trackingId: 0,
      actionInteractions: D.list({
        actionId: 0,
        userId: 0,
        sessionId: 0,
        timestamp: 0,
        eventType: 0,
        eventId: 0,
        recommendationId: 0,
        impression: 0,
        properties: 0,
      }),
    },
    body: true,
  },
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutActionInteractions",
})) as any;

export type PutActionsError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Adds one or more actions to an Actions dataset. For more information see
 * Importing actions individually.
 */
export const putActions: API.OperationMethod<
  PutActionsRequest,
  PutActionsResponse,
  PutActionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /actions",
    input: { datasetArn: 0, actions: D.list({ actionId: 0, properties: 0 }) },
    body: true,
  },
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutActions",
})) as any;

export type PutEventsError = InvalidInputException | CommonErrors;
/**
 * Records item interaction event data. For more information see
 * Recording item interaction events.
 */
export const putEvents: API.OperationMethod<
  PutEventsRequest,
  PutEventsResponse,
  PutEventsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /events",
    input: {
      trackingId: 0,
      userId: 0,
      sessionId: 0,
      eventList: D.list({
        eventId: 0,
        eventType: 0,
        eventValue: 0,
        itemId: 0,
        properties: 0,
        sentAt: 0,
        recommendationId: 0,
        impression: 0,
        metricAttribution: { eventAttributionSource: 0 },
      }),
    },
    body: true,
  },
  errors: [InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutEvents",
})) as any;

export type PutItemsError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Adds one or more items to an Items dataset. For more information see
 * Importing items individually.
 */
export const putItems: API.OperationMethod<
  PutItemsRequest,
  PutItemsResponse,
  PutItemsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /items",
    input: { datasetArn: 0, items: D.list({ itemId: 0, properties: 0 }) },
    body: true,
  },
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutItems",
})) as any;

export type PutUsersError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Adds one or more users to a Users dataset. For more information see
 * Importing users individually.
 */
export const putUsers: API.OperationMethod<
  PutUsersRequest,
  PutUsersResponse,
  PutUsersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /users",
    input: { datasetArn: 0, users: D.list({ userId: 0, properties: 0 }) },
    body: true,
  },
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutUsers",
})) as any;
