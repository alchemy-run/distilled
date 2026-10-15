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
  sdkId: "Personalize Events",
  serviceShapeName: "AmazonPersonalizeEvents",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "personalize" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-03-22");
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://personalize-events.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://personalize-events.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://personalize-events.{R}.{D}","properties":{},"headers":{}}');

export class InvalidInputException
  extends /*@__PURE__*/ S.TaggedError<InvalidInputException>()(
    "InvalidInputException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceInUseException
  extends /*@__PURE__*/ S.TaggedError<ResourceInUseException>()(
    "ResourceInUseException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export type StringType = string;
export type ActionId = string | redacted.Redacted<string>;
export type UserId = string | redacted.Redacted<string>;
export type RecommendationId = string;
export type ActionImpression = (string | redacted.Redacted<string>)[];
export type SynthesizedJsonActionInteractionProperties = string | redacted.Redacted<string>;
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
export type SynthesizedJsonActionProperties = string | redacted.Redacted<string>;
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
export type SynthesizedJsonEventPropertiesJSON = string | redacted.Redacted<string>;
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
  input: __S(2, __c0, 2) as any as S.Schema<PutActionInteractionsRequest>,
  output: __S(4, __c1, 0) as any as S.Schema<PutActionInteractionsResponse>,
  errors: [InvalidInputException, ResourceInUseException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutActionInteractions",
}));

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
  input: __S(14, __c3, 2) as any as S.Schema<PutActionsRequest>,
  output: __S(4, __c1, 0) as any as S.Schema<PutActionsResponse>,
  errors: [InvalidInputException, ResourceInUseException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutActions",
}));

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
  input: __S(19, __c4, 3) as any as S.Schema<PutEventsRequest>,
  output: __S(4, __c1, 0) as any as S.Schema<PutEventsResponse>,
  errors: [InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutEvents",
}));

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
  input: __S(22, __c5, 2) as any as S.Schema<PutItemsRequest>,
  output: __S(4, __c1, 0) as any as S.Schema<PutItemsResponse>,
  errors: [InvalidInputException, ResourceInUseException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutItems",
}));

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
  input: __S(26, __c6, 2) as any as S.Schema<PutUsersRequest>,
  output: __S(4, __c1, 0) as any as S.Schema<PutUsersResponse>,
  errors: [InvalidInputException, ResourceInUseException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutUsers",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          actionId: SensitiveString,
          userId: S.optional(SensitiveString),
          sessionId: S.String,
          timestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          eventType: S.String,
          eventId: S.optional(S.String),
          recommendationId: S.optional(S.String),
          impression: S.optional(__S(8, __c2, 0)),
          properties: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "ActionInteraction" });
    case 1:
      return S.Array(__S(0, __c0, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ trackingId: S.String, actionInteractions: __S(1, __c0, 1) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/action-interactions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutActionInteractionsRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "PutActionInteractionsResponse",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.Array(SensitiveString);
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ actionId: S.String, properties: S.optional(SensitiveString) }),
      ).annotate({ identifier: "Action" });
    case 1:
      return S.Array(__S(12, __c3, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ datasetArn: S.String, actions: __S(13, __c3, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/actions" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutActionsRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ eventAttributionSource: S.String })).annotate({
        identifier: "MetricAttribution",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          eventId: S.optional(S.String),
          eventType: S.String,
          eventValue: S.optional(S.Number),
          itemId: S.optional(SensitiveString),
          properties: S.optional(SensitiveString),
          sentAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          recommendationId: S.optional(S.String),
          impression: S.optional(__S(8, __c2, 0)),
          metricAttribution: S.optional(__S(16, __c4, 0)),
        }),
      ).annotate({ identifier: "Event" });
    case 2:
      return S.Array(__S(17, __c4, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          trackingId: S.String,
          userId: S.optional(SensitiveString),
          sessionId: S.String,
          eventList: __S(18, __c4, 2),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/events" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutEventsRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ itemId: S.String, properties: S.optional(SensitiveString) }),
      ).annotate({ identifier: "Item" });
    case 1:
      return S.Array(__S(20, __c5, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ datasetArn: S.String, items: __S(21, __c5, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/items" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutItemsRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ userId: S.String, properties: S.optional(SensitiveString) }),
      ).annotate({ identifier: "User" });
    case 1:
      return S.Array(__S(24, __c6, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ datasetArn: S.String, users: __S(25, __c6, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/users" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutUsersRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
