/**
 * Cloudflare WAITING-ROOMS API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service waiting-rooms
 */

import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import type { ApiToken } from "../auth.ts";
import {
  type CommonErrors,
  UnknownCloudflareError,
  CloudflareNetworkError,
  CloudflareHttpError,
} from "../errors.ts";

// =============================================================================
// Event
// =============================================================================

export interface GetEventRequest {
  waitingRoomId: string;
  eventId: string;
  /** Identifier. */
  zoneId: string;
}

export const GetEventRequest = Schema.Struct({
  waitingRoomId: Schema.String.pipe(T.HttpPath("waitingRoomId")),
  eventId: Schema.String.pipe(T.HttpPath("eventId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/waiting_rooms/{waitingRoomId}/events/{eventId}",
  }),
) as unknown as Schema.Schema<GetEventRequest>;

export interface GetEventResponse {
  id?: string;
  createdOn?: string;
  /** If set, the event will override the waiting room's `custom_page_html` property while it is active. If null, the event will inherit it. */
  customPageHtml?: string | null;
  /** A note that you can use to add more details about the event. */
  description?: string;
  /** If set, the event will override the waiting room's `disable_session_renewal` property while it is active. If null, the event will inherit it. */
  disableSessionRenewal?: boolean | null;
  /** An ISO 8601 timestamp that marks the end of the event. */
  eventEndTime?: string;
  /** An ISO 8601 timestamp that marks the start of the event. At this time, queued users will be processed with the event's configuration. The start time must be at least one minute before `event_end_time` */
  eventStartTime?: string;
  modifiedOn?: string;
  /** A unique name to identify the event. Only alphanumeric characters, hyphens and underscores are allowed. */
  name?: string;
  /** If set, the event will override the waiting room's `new_users_per_minute` property while it is active. If null, the event will inherit it. This can only be set if the event's `total_active_users` prop */
  newUsersPerMinute?: number | null;
  /** An ISO 8601 timestamp that marks when to begin queueing all users before the event starts. The prequeue must start at least five minutes before `event_start_time`. */
  prequeueStartTime?: string | null;
  /** If set, the event will override the waiting room's `queueing_method` property while it is active. If null, the event will inherit it. */
  queueingMethod?: string | null;
  /** If set, the event will override the waiting room's `session_duration` property while it is active. If null, the event will inherit it. */
  sessionDuration?: number | null;
  /** If enabled, users in the prequeue will be shuffled randomly at the `event_start_time`. Requires that `prequeue_start_time` is not null. This is useful for situations when many users will join the even */
  shuffleAtEventStart?: boolean;
  /** Suspends or allows an event. If set to `true`, the event is ignored and traffic will be handled based on the waiting room configuration. */
  suspended?: boolean;
  /** If set, the event will override the waiting room's `total_active_users` property while it is active. If null, the event will inherit it. This can only be set if the event's `new_users_per_minute` prop */
  totalActiveUsers?: number | null;
  /** If set, the event will override the waiting room's `turnstile_action` property while it is active. If null, the event will inherit it. */
  turnstileAction?: "log" | "infinite_queue" | null;
  /** If set, the event will override the waiting room's `turnstile_mode` property while it is active. If null, the event will inherit it. */
  turnstileMode?:
    | "off"
    | "invisible"
    | "visible_non_interactive"
    | "visible_managed"
    | null;
}

export const GetEventResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  createdOn: Schema.optional(Schema.String),
  customPageHtml: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  description: Schema.optional(Schema.String),
  disableSessionRenewal: Schema.optional(
    Schema.Union([Schema.Boolean, Schema.Null]),
  ),
  eventEndTime: Schema.optional(Schema.String),
  eventStartTime: Schema.optional(Schema.String),
  modifiedOn: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  newUsersPerMinute: Schema.optional(
    Schema.Union([Schema.Number, Schema.Null]),
  ),
  prequeueStartTime: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  queueingMethod: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  sessionDuration: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  shuffleAtEventStart: Schema.optional(Schema.Boolean),
  suspended: Schema.optional(Schema.Boolean),
  totalActiveUsers: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  turnstileAction: Schema.optional(
    Schema.Union([
      Schema.Literal("log"),
      Schema.Literal("infinite_queue"),
      Schema.Null,
    ]),
  ),
  turnstileMode: Schema.optional(
    Schema.Union([
      Schema.Literal("off"),
      Schema.Literal("invisible"),
      Schema.Literal("visible_non_interactive"),
      Schema.Literal("visible_managed"),
      Schema.Null,
    ]),
  ),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    createdOn: "created_on",
    customPageHtml: "custom_page_html",
    description: "description",
    disableSessionRenewal: "disable_session_renewal",
    eventEndTime: "event_end_time",
    eventStartTime: "event_start_time",
    modifiedOn: "modified_on",
    name: "name",
    newUsersPerMinute: "new_users_per_minute",
    prequeueStartTime: "prequeue_start_time",
    queueingMethod: "queueing_method",
    sessionDuration: "session_duration",
    shuffleAtEventStart: "shuffle_at_event_start",
    suspended: "suspended",
    totalActiveUsers: "total_active_users",
    turnstileAction: "turnstile_action",
    turnstileMode: "turnstile_mode",
  }),
) as unknown as Schema.Schema<GetEventResponse>;

export type GetEventError = CommonErrors;

export const getEvent: API.OperationMethod<
  GetEventRequest,
  GetEventResponse,
  GetEventError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetEventRequest,
  output: GetEventResponse,
  errors: [],
}));

export interface ListEventsRequest {
  waitingRoomId: string;
  /** Path param: Identifier. */
  zoneId: string;
}

export const ListEventsRequest = Schema.Struct({
  waitingRoomId: Schema.String.pipe(T.HttpPath("waitingRoomId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/waiting_rooms/{waitingRoomId}/events",
  }),
) as unknown as Schema.Schema<ListEventsRequest>;

export type ListEventsResponse = {
  id?: string;
  createdOn?: string;
  customPageHtml?: string | null;
  description?: string;
  disableSessionRenewal?: boolean | null;
  eventEndTime?: string;
  eventStartTime?: string;
  modifiedOn?: string;
  name?: string;
  newUsersPerMinute?: number | null;
  prequeueStartTime?: string | null;
  queueingMethod?: string | null;
  sessionDuration?: number | null;
  shuffleAtEventStart?: boolean;
  suspended?: boolean;
  totalActiveUsers?: number | null;
  turnstileAction?: "log" | "infinite_queue" | null;
  turnstileMode?:
    | "off"
    | "invisible"
    | "visible_non_interactive"
    | "visible_managed"
    | null;
}[];

export const ListEventsResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
    createdOn: Schema.optional(Schema.String),
    customPageHtml: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    description: Schema.optional(Schema.String),
    disableSessionRenewal: Schema.optional(
      Schema.Union([Schema.Boolean, Schema.Null]),
    ),
    eventEndTime: Schema.optional(Schema.String),
    eventStartTime: Schema.optional(Schema.String),
    modifiedOn: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    newUsersPerMinute: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    prequeueStartTime: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    queueingMethod: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    sessionDuration: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    shuffleAtEventStart: Schema.optional(Schema.Boolean),
    suspended: Schema.optional(Schema.Boolean),
    totalActiveUsers: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    turnstileAction: Schema.optional(
      Schema.Union([
        Schema.Literal("log"),
        Schema.Literal("infinite_queue"),
        Schema.Null,
      ]),
    ),
    turnstileMode: Schema.optional(
      Schema.Union([
        Schema.Literal("off"),
        Schema.Literal("invisible"),
        Schema.Literal("visible_non_interactive"),
        Schema.Literal("visible_managed"),
        Schema.Null,
      ]),
    ),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      createdOn: "created_on",
      customPageHtml: "custom_page_html",
      description: "description",
      disableSessionRenewal: "disable_session_renewal",
      eventEndTime: "event_end_time",
      eventStartTime: "event_start_time",
      modifiedOn: "modified_on",
      name: "name",
      newUsersPerMinute: "new_users_per_minute",
      prequeueStartTime: "prequeue_start_time",
      queueingMethod: "queueing_method",
      sessionDuration: "session_duration",
      shuffleAtEventStart: "shuffle_at_event_start",
      suspended: "suspended",
      totalActiveUsers: "total_active_users",
      turnstileAction: "turnstile_action",
      turnstileMode: "turnstile_mode",
    }),
  ),
) as unknown as Schema.Schema<ListEventsResponse>;

export type ListEventsError = CommonErrors;

export const listEvents: API.OperationMethod<
  ListEventsRequest,
  ListEventsResponse,
  ListEventsError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListEventsRequest,
  output: ListEventsResponse,
  errors: [],
}));

export interface CreateEventRequest {
  waitingRoomId: string;
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: An ISO 8601 timestamp that marks the end of the event. */
  eventEndTime: string;
  /** Body param: An ISO 8601 timestamp that marks the start of the event. At this time, queued users will be processed with the event's configuration. The start time must be at least one minute before `eve */
  eventStartTime: string;
  /** Body param: A unique name to identify the event. Only alphanumeric characters, hyphens and underscores are allowed. */
  name: string;
  /** Body param: If set, the event will override the waiting room's `custom_page_html` property while it is active. If null, the event will inherit it. */
  customPageHtml?: string | null;
  /** Body param: A note that you can use to add more details about the event. */
  description?: string;
  /** Body param: If set, the event will override the waiting room's `disable_session_renewal` property while it is active. If null, the event will inherit it. */
  disableSessionRenewal?: boolean | null;
  /** Body param: If set, the event will override the waiting room's `new_users_per_minute` property while it is active. If null, the event will inherit it. This can only be set if the event's `total_active */
  newUsersPerMinute?: number | null;
  /** Body param: An ISO 8601 timestamp that marks when to begin queueing all users before the event starts. The prequeue must start at least five minutes before `event_start_time`. */
  prequeueStartTime?: string | null;
  /** Body param: If set, the event will override the waiting room's `queueing_method` property while it is active. If null, the event will inherit it. */
  queueingMethod?: string | null;
  /** Body param: If set, the event will override the waiting room's `session_duration` property while it is active. If null, the event will inherit it. */
  sessionDuration?: number | null;
  /** Body param: If enabled, users in the prequeue will be shuffled randomly at the `event_start_time`. Requires that `prequeue_start_time` is not null. This is useful for situations when many users will j */
  shuffleAtEventStart?: boolean;
  /** Body param: Suspends or allows an event. If set to `true`, the event is ignored and traffic will be handled based on the waiting room configuration. */
  suspended?: boolean;
  /** Body param: If set, the event will override the waiting room's `total_active_users` property while it is active. If null, the event will inherit it. This can only be set if the event's `new_users_per_ */
  totalActiveUsers?: number | null;
  /** Body param: If set, the event will override the waiting room's `turnstile_action` property while it is active. If null, the event will inherit it. */
  turnstileAction?: "log" | "infinite_queue" | null;
  /** Body param: If set, the event will override the waiting room's `turnstile_mode` property while it is active. If null, the event will inherit it. */
  turnstileMode?:
    | "off"
    | "invisible"
    | "visible_non_interactive"
    | "visible_managed"
    | null;
}

export const CreateEventRequest = Schema.Struct({
  waitingRoomId: Schema.String.pipe(T.HttpPath("waitingRoomId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  eventEndTime: Schema.String,
  eventStartTime: Schema.String,
  name: Schema.String,
  customPageHtml: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  description: Schema.optional(Schema.String),
  disableSessionRenewal: Schema.optional(
    Schema.Union([Schema.Boolean, Schema.Null]),
  ),
  newUsersPerMinute: Schema.optional(
    Schema.Union([Schema.Number, Schema.Null]),
  ),
  prequeueStartTime: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  queueingMethod: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  sessionDuration: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  shuffleAtEventStart: Schema.optional(Schema.Boolean),
  suspended: Schema.optional(Schema.Boolean),
  totalActiveUsers: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  turnstileAction: Schema.optional(
    Schema.Union([
      Schema.Literal("log"),
      Schema.Literal("infinite_queue"),
      Schema.Null,
    ]),
  ),
  turnstileMode: Schema.optional(
    Schema.Union([
      Schema.Literal("off"),
      Schema.Literal("invisible"),
      Schema.Literal("visible_non_interactive"),
      Schema.Literal("visible_managed"),
      Schema.Null,
    ]),
  ),
}).pipe(
  Schema.encodeKeys({
    eventEndTime: "event_end_time",
    eventStartTime: "event_start_time",
    name: "name",
    customPageHtml: "custom_page_html",
    description: "description",
    disableSessionRenewal: "disable_session_renewal",
    newUsersPerMinute: "new_users_per_minute",
    prequeueStartTime: "prequeue_start_time",
    queueingMethod: "queueing_method",
    sessionDuration: "session_duration",
    shuffleAtEventStart: "shuffle_at_event_start",
    suspended: "suspended",
    totalActiveUsers: "total_active_users",
    turnstileAction: "turnstile_action",
    turnstileMode: "turnstile_mode",
  }),
  T.Http({
    method: "POST",
    path: "/zones/{zone_id}/waiting_rooms/{waitingRoomId}/events",
  }),
) as unknown as Schema.Schema<CreateEventRequest>;

export interface CreateEventResponse {
  id?: string;
  createdOn?: string;
  /** If set, the event will override the waiting room's `custom_page_html` property while it is active. If null, the event will inherit it. */
  customPageHtml?: string | null;
  /** A note that you can use to add more details about the event. */
  description?: string;
  /** If set, the event will override the waiting room's `disable_session_renewal` property while it is active. If null, the event will inherit it. */
  disableSessionRenewal?: boolean | null;
  /** An ISO 8601 timestamp that marks the end of the event. */
  eventEndTime?: string;
  /** An ISO 8601 timestamp that marks the start of the event. At this time, queued users will be processed with the event's configuration. The start time must be at least one minute before `event_end_time` */
  eventStartTime?: string;
  modifiedOn?: string;
  /** A unique name to identify the event. Only alphanumeric characters, hyphens and underscores are allowed. */
  name?: string;
  /** If set, the event will override the waiting room's `new_users_per_minute` property while it is active. If null, the event will inherit it. This can only be set if the event's `total_active_users` prop */
  newUsersPerMinute?: number | null;
  /** An ISO 8601 timestamp that marks when to begin queueing all users before the event starts. The prequeue must start at least five minutes before `event_start_time`. */
  prequeueStartTime?: string | null;
  /** If set, the event will override the waiting room's `queueing_method` property while it is active. If null, the event will inherit it. */
  queueingMethod?: string | null;
  /** If set, the event will override the waiting room's `session_duration` property while it is active. If null, the event will inherit it. */
  sessionDuration?: number | null;
  /** If enabled, users in the prequeue will be shuffled randomly at the `event_start_time`. Requires that `prequeue_start_time` is not null. This is useful for situations when many users will join the even */
  shuffleAtEventStart?: boolean;
  /** Suspends or allows an event. If set to `true`, the event is ignored and traffic will be handled based on the waiting room configuration. */
  suspended?: boolean;
  /** If set, the event will override the waiting room's `total_active_users` property while it is active. If null, the event will inherit it. This can only be set if the event's `new_users_per_minute` prop */
  totalActiveUsers?: number | null;
  /** If set, the event will override the waiting room's `turnstile_action` property while it is active. If null, the event will inherit it. */
  turnstileAction?: "log" | "infinite_queue" | null;
  /** If set, the event will override the waiting room's `turnstile_mode` property while it is active. If null, the event will inherit it. */
  turnstileMode?:
    | "off"
    | "invisible"
    | "visible_non_interactive"
    | "visible_managed"
    | null;
}

export const CreateEventResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  createdOn: Schema.optional(Schema.String),
  customPageHtml: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  description: Schema.optional(Schema.String),
  disableSessionRenewal: Schema.optional(
    Schema.Union([Schema.Boolean, Schema.Null]),
  ),
  eventEndTime: Schema.optional(Schema.String),
  eventStartTime: Schema.optional(Schema.String),
  modifiedOn: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  newUsersPerMinute: Schema.optional(
    Schema.Union([Schema.Number, Schema.Null]),
  ),
  prequeueStartTime: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  queueingMethod: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  sessionDuration: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  shuffleAtEventStart: Schema.optional(Schema.Boolean),
  suspended: Schema.optional(Schema.Boolean),
  totalActiveUsers: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  turnstileAction: Schema.optional(
    Schema.Union([
      Schema.Literal("log"),
      Schema.Literal("infinite_queue"),
      Schema.Null,
    ]),
  ),
  turnstileMode: Schema.optional(
    Schema.Union([
      Schema.Literal("off"),
      Schema.Literal("invisible"),
      Schema.Literal("visible_non_interactive"),
      Schema.Literal("visible_managed"),
      Schema.Null,
    ]),
  ),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    createdOn: "created_on",
    customPageHtml: "custom_page_html",
    description: "description",
    disableSessionRenewal: "disable_session_renewal",
    eventEndTime: "event_end_time",
    eventStartTime: "event_start_time",
    modifiedOn: "modified_on",
    name: "name",
    newUsersPerMinute: "new_users_per_minute",
    prequeueStartTime: "prequeue_start_time",
    queueingMethod: "queueing_method",
    sessionDuration: "session_duration",
    shuffleAtEventStart: "shuffle_at_event_start",
    suspended: "suspended",
    totalActiveUsers: "total_active_users",
    turnstileAction: "turnstile_action",
    turnstileMode: "turnstile_mode",
  }),
) as unknown as Schema.Schema<CreateEventResponse>;

export type CreateEventError = CommonErrors;

export const createEvent: API.OperationMethod<
  CreateEventRequest,
  CreateEventResponse,
  CreateEventError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateEventRequest,
  output: CreateEventResponse,
  errors: [],
}));

export interface UpdateEventRequest {
  waitingRoomId: string;
  eventId: string;
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: An ISO 8601 timestamp that marks the end of the event. */
  eventEndTime: string;
  /** Body param: An ISO 8601 timestamp that marks the start of the event. At this time, queued users will be processed with the event's configuration. The start time must be at least one minute before `eve */
  eventStartTime: string;
  /** Body param: A unique name to identify the event. Only alphanumeric characters, hyphens and underscores are allowed. */
  name: string;
  /** Body param: If set, the event will override the waiting room's `custom_page_html` property while it is active. If null, the event will inherit it. */
  customPageHtml?: string | null;
  /** Body param: A note that you can use to add more details about the event. */
  description?: string;
  /** Body param: If set, the event will override the waiting room's `disable_session_renewal` property while it is active. If null, the event will inherit it. */
  disableSessionRenewal?: boolean | null;
  /** Body param: If set, the event will override the waiting room's `new_users_per_minute` property while it is active. If null, the event will inherit it. This can only be set if the event's `total_active */
  newUsersPerMinute?: number | null;
  /** Body param: An ISO 8601 timestamp that marks when to begin queueing all users before the event starts. The prequeue must start at least five minutes before `event_start_time`. */
  prequeueStartTime?: string | null;
  /** Body param: If set, the event will override the waiting room's `queueing_method` property while it is active. If null, the event will inherit it. */
  queueingMethod?: string | null;
  /** Body param: If set, the event will override the waiting room's `session_duration` property while it is active. If null, the event will inherit it. */
  sessionDuration?: number | null;
  /** Body param: If enabled, users in the prequeue will be shuffled randomly at the `event_start_time`. Requires that `prequeue_start_time` is not null. This is useful for situations when many users will j */
  shuffleAtEventStart?: boolean;
  /** Body param: Suspends or allows an event. If set to `true`, the event is ignored and traffic will be handled based on the waiting room configuration. */
  suspended?: boolean;
  /** Body param: If set, the event will override the waiting room's `total_active_users` property while it is active. If null, the event will inherit it. This can only be set if the event's `new_users_per_ */
  totalActiveUsers?: number | null;
  /** Body param: If set, the event will override the waiting room's `turnstile_action` property while it is active. If null, the event will inherit it. */
  turnstileAction?: "log" | "infinite_queue" | null;
  /** Body param: If set, the event will override the waiting room's `turnstile_mode` property while it is active. If null, the event will inherit it. */
  turnstileMode?:
    | "off"
    | "invisible"
    | "visible_non_interactive"
    | "visible_managed"
    | null;
}

export const UpdateEventRequest = Schema.Struct({
  waitingRoomId: Schema.String.pipe(T.HttpPath("waitingRoomId")),
  eventId: Schema.String.pipe(T.HttpPath("eventId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  eventEndTime: Schema.String,
  eventStartTime: Schema.String,
  name: Schema.String,
  customPageHtml: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  description: Schema.optional(Schema.String),
  disableSessionRenewal: Schema.optional(
    Schema.Union([Schema.Boolean, Schema.Null]),
  ),
  newUsersPerMinute: Schema.optional(
    Schema.Union([Schema.Number, Schema.Null]),
  ),
  prequeueStartTime: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  queueingMethod: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  sessionDuration: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  shuffleAtEventStart: Schema.optional(Schema.Boolean),
  suspended: Schema.optional(Schema.Boolean),
  totalActiveUsers: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  turnstileAction: Schema.optional(
    Schema.Union([
      Schema.Literal("log"),
      Schema.Literal("infinite_queue"),
      Schema.Null,
    ]),
  ),
  turnstileMode: Schema.optional(
    Schema.Union([
      Schema.Literal("off"),
      Schema.Literal("invisible"),
      Schema.Literal("visible_non_interactive"),
      Schema.Literal("visible_managed"),
      Schema.Null,
    ]),
  ),
}).pipe(
  Schema.encodeKeys({
    eventEndTime: "event_end_time",
    eventStartTime: "event_start_time",
    name: "name",
    customPageHtml: "custom_page_html",
    description: "description",
    disableSessionRenewal: "disable_session_renewal",
    newUsersPerMinute: "new_users_per_minute",
    prequeueStartTime: "prequeue_start_time",
    queueingMethod: "queueing_method",
    sessionDuration: "session_duration",
    shuffleAtEventStart: "shuffle_at_event_start",
    suspended: "suspended",
    totalActiveUsers: "total_active_users",
    turnstileAction: "turnstile_action",
    turnstileMode: "turnstile_mode",
  }),
  T.Http({
    method: "PUT",
    path: "/zones/{zone_id}/waiting_rooms/{waitingRoomId}/events/{eventId}",
  }),
) as unknown as Schema.Schema<UpdateEventRequest>;

export interface UpdateEventResponse {
  id?: string;
  createdOn?: string;
  /** If set, the event will override the waiting room's `custom_page_html` property while it is active. If null, the event will inherit it. */
  customPageHtml?: string | null;
  /** A note that you can use to add more details about the event. */
  description?: string;
  /** If set, the event will override the waiting room's `disable_session_renewal` property while it is active. If null, the event will inherit it. */
  disableSessionRenewal?: boolean | null;
  /** An ISO 8601 timestamp that marks the end of the event. */
  eventEndTime?: string;
  /** An ISO 8601 timestamp that marks the start of the event. At this time, queued users will be processed with the event's configuration. The start time must be at least one minute before `event_end_time` */
  eventStartTime?: string;
  modifiedOn?: string;
  /** A unique name to identify the event. Only alphanumeric characters, hyphens and underscores are allowed. */
  name?: string;
  /** If set, the event will override the waiting room's `new_users_per_minute` property while it is active. If null, the event will inherit it. This can only be set if the event's `total_active_users` prop */
  newUsersPerMinute?: number | null;
  /** An ISO 8601 timestamp that marks when to begin queueing all users before the event starts. The prequeue must start at least five minutes before `event_start_time`. */
  prequeueStartTime?: string | null;
  /** If set, the event will override the waiting room's `queueing_method` property while it is active. If null, the event will inherit it. */
  queueingMethod?: string | null;
  /** If set, the event will override the waiting room's `session_duration` property while it is active. If null, the event will inherit it. */
  sessionDuration?: number | null;
  /** If enabled, users in the prequeue will be shuffled randomly at the `event_start_time`. Requires that `prequeue_start_time` is not null. This is useful for situations when many users will join the even */
  shuffleAtEventStart?: boolean;
  /** Suspends or allows an event. If set to `true`, the event is ignored and traffic will be handled based on the waiting room configuration. */
  suspended?: boolean;
  /** If set, the event will override the waiting room's `total_active_users` property while it is active. If null, the event will inherit it. This can only be set if the event's `new_users_per_minute` prop */
  totalActiveUsers?: number | null;
  /** If set, the event will override the waiting room's `turnstile_action` property while it is active. If null, the event will inherit it. */
  turnstileAction?: "log" | "infinite_queue" | null;
  /** If set, the event will override the waiting room's `turnstile_mode` property while it is active. If null, the event will inherit it. */
  turnstileMode?:
    | "off"
    | "invisible"
    | "visible_non_interactive"
    | "visible_managed"
    | null;
}

export const UpdateEventResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  createdOn: Schema.optional(Schema.String),
  customPageHtml: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  description: Schema.optional(Schema.String),
  disableSessionRenewal: Schema.optional(
    Schema.Union([Schema.Boolean, Schema.Null]),
  ),
  eventEndTime: Schema.optional(Schema.String),
  eventStartTime: Schema.optional(Schema.String),
  modifiedOn: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  newUsersPerMinute: Schema.optional(
    Schema.Union([Schema.Number, Schema.Null]),
  ),
  prequeueStartTime: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  queueingMethod: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  sessionDuration: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  shuffleAtEventStart: Schema.optional(Schema.Boolean),
  suspended: Schema.optional(Schema.Boolean),
  totalActiveUsers: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  turnstileAction: Schema.optional(
    Schema.Union([
      Schema.Literal("log"),
      Schema.Literal("infinite_queue"),
      Schema.Null,
    ]),
  ),
  turnstileMode: Schema.optional(
    Schema.Union([
      Schema.Literal("off"),
      Schema.Literal("invisible"),
      Schema.Literal("visible_non_interactive"),
      Schema.Literal("visible_managed"),
      Schema.Null,
    ]),
  ),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    createdOn: "created_on",
    customPageHtml: "custom_page_html",
    description: "description",
    disableSessionRenewal: "disable_session_renewal",
    eventEndTime: "event_end_time",
    eventStartTime: "event_start_time",
    modifiedOn: "modified_on",
    name: "name",
    newUsersPerMinute: "new_users_per_minute",
    prequeueStartTime: "prequeue_start_time",
    queueingMethod: "queueing_method",
    sessionDuration: "session_duration",
    shuffleAtEventStart: "shuffle_at_event_start",
    suspended: "suspended",
    totalActiveUsers: "total_active_users",
    turnstileAction: "turnstile_action",
    turnstileMode: "turnstile_mode",
  }),
) as unknown as Schema.Schema<UpdateEventResponse>;

export type UpdateEventError = CommonErrors;

export const updateEvent: API.OperationMethod<
  UpdateEventRequest,
  UpdateEventResponse,
  UpdateEventError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateEventRequest,
  output: UpdateEventResponse,
  errors: [],
}));

export interface PatchEventRequest {
  waitingRoomId: string;
  eventId: string;
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: An ISO 8601 timestamp that marks the end of the event. */
  eventEndTime: string;
  /** Body param: An ISO 8601 timestamp that marks the start of the event. At this time, queued users will be processed with the event's configuration. The start time must be at least one minute before `eve */
  eventStartTime: string;
  /** Body param: A unique name to identify the event. Only alphanumeric characters, hyphens and underscores are allowed. */
  name: string;
  /** Body param: If set, the event will override the waiting room's `custom_page_html` property while it is active. If null, the event will inherit it. */
  customPageHtml?: string | null;
  /** Body param: A note that you can use to add more details about the event. */
  description?: string;
  /** Body param: If set, the event will override the waiting room's `disable_session_renewal` property while it is active. If null, the event will inherit it. */
  disableSessionRenewal?: boolean | null;
  /** Body param: If set, the event will override the waiting room's `new_users_per_minute` property while it is active. If null, the event will inherit it. This can only be set if the event's `total_active */
  newUsersPerMinute?: number | null;
  /** Body param: An ISO 8601 timestamp that marks when to begin queueing all users before the event starts. The prequeue must start at least five minutes before `event_start_time`. */
  prequeueStartTime?: string | null;
  /** Body param: If set, the event will override the waiting room's `queueing_method` property while it is active. If null, the event will inherit it. */
  queueingMethod?: string | null;
  /** Body param: If set, the event will override the waiting room's `session_duration` property while it is active. If null, the event will inherit it. */
  sessionDuration?: number | null;
  /** Body param: If enabled, users in the prequeue will be shuffled randomly at the `event_start_time`. Requires that `prequeue_start_time` is not null. This is useful for situations when many users will j */
  shuffleAtEventStart?: boolean;
  /** Body param: Suspends or allows an event. If set to `true`, the event is ignored and traffic will be handled based on the waiting room configuration. */
  suspended?: boolean;
  /** Body param: If set, the event will override the waiting room's `total_active_users` property while it is active. If null, the event will inherit it. This can only be set if the event's `new_users_per_ */
  totalActiveUsers?: number | null;
  /** Body param: If set, the event will override the waiting room's `turnstile_action` property while it is active. If null, the event will inherit it. */
  turnstileAction?: "log" | "infinite_queue" | null;
  /** Body param: If set, the event will override the waiting room's `turnstile_mode` property while it is active. If null, the event will inherit it. */
  turnstileMode?:
    | "off"
    | "invisible"
    | "visible_non_interactive"
    | "visible_managed"
    | null;
}

export const PatchEventRequest = Schema.Struct({
  waitingRoomId: Schema.String.pipe(T.HttpPath("waitingRoomId")),
  eventId: Schema.String.pipe(T.HttpPath("eventId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  eventEndTime: Schema.String,
  eventStartTime: Schema.String,
  name: Schema.String,
  customPageHtml: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  description: Schema.optional(Schema.String),
  disableSessionRenewal: Schema.optional(
    Schema.Union([Schema.Boolean, Schema.Null]),
  ),
  newUsersPerMinute: Schema.optional(
    Schema.Union([Schema.Number, Schema.Null]),
  ),
  prequeueStartTime: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  queueingMethod: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  sessionDuration: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  shuffleAtEventStart: Schema.optional(Schema.Boolean),
  suspended: Schema.optional(Schema.Boolean),
  totalActiveUsers: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  turnstileAction: Schema.optional(
    Schema.Union([
      Schema.Literal("log"),
      Schema.Literal("infinite_queue"),
      Schema.Null,
    ]),
  ),
  turnstileMode: Schema.optional(
    Schema.Union([
      Schema.Literal("off"),
      Schema.Literal("invisible"),
      Schema.Literal("visible_non_interactive"),
      Schema.Literal("visible_managed"),
      Schema.Null,
    ]),
  ),
}).pipe(
  Schema.encodeKeys({
    eventEndTime: "event_end_time",
    eventStartTime: "event_start_time",
    name: "name",
    customPageHtml: "custom_page_html",
    description: "description",
    disableSessionRenewal: "disable_session_renewal",
    newUsersPerMinute: "new_users_per_minute",
    prequeueStartTime: "prequeue_start_time",
    queueingMethod: "queueing_method",
    sessionDuration: "session_duration",
    shuffleAtEventStart: "shuffle_at_event_start",
    suspended: "suspended",
    totalActiveUsers: "total_active_users",
    turnstileAction: "turnstile_action",
    turnstileMode: "turnstile_mode",
  }),
  T.Http({
    method: "PATCH",
    path: "/zones/{zone_id}/waiting_rooms/{waitingRoomId}/events/{eventId}",
  }),
) as unknown as Schema.Schema<PatchEventRequest>;

export interface PatchEventResponse {
  id?: string;
  createdOn?: string;
  /** If set, the event will override the waiting room's `custom_page_html` property while it is active. If null, the event will inherit it. */
  customPageHtml?: string | null;
  /** A note that you can use to add more details about the event. */
  description?: string;
  /** If set, the event will override the waiting room's `disable_session_renewal` property while it is active. If null, the event will inherit it. */
  disableSessionRenewal?: boolean | null;
  /** An ISO 8601 timestamp that marks the end of the event. */
  eventEndTime?: string;
  /** An ISO 8601 timestamp that marks the start of the event. At this time, queued users will be processed with the event's configuration. The start time must be at least one minute before `event_end_time` */
  eventStartTime?: string;
  modifiedOn?: string;
  /** A unique name to identify the event. Only alphanumeric characters, hyphens and underscores are allowed. */
  name?: string;
  /** If set, the event will override the waiting room's `new_users_per_minute` property while it is active. If null, the event will inherit it. This can only be set if the event's `total_active_users` prop */
  newUsersPerMinute?: number | null;
  /** An ISO 8601 timestamp that marks when to begin queueing all users before the event starts. The prequeue must start at least five minutes before `event_start_time`. */
  prequeueStartTime?: string | null;
  /** If set, the event will override the waiting room's `queueing_method` property while it is active. If null, the event will inherit it. */
  queueingMethod?: string | null;
  /** If set, the event will override the waiting room's `session_duration` property while it is active. If null, the event will inherit it. */
  sessionDuration?: number | null;
  /** If enabled, users in the prequeue will be shuffled randomly at the `event_start_time`. Requires that `prequeue_start_time` is not null. This is useful for situations when many users will join the even */
  shuffleAtEventStart?: boolean;
  /** Suspends or allows an event. If set to `true`, the event is ignored and traffic will be handled based on the waiting room configuration. */
  suspended?: boolean;
  /** If set, the event will override the waiting room's `total_active_users` property while it is active. If null, the event will inherit it. This can only be set if the event's `new_users_per_minute` prop */
  totalActiveUsers?: number | null;
  /** If set, the event will override the waiting room's `turnstile_action` property while it is active. If null, the event will inherit it. */
  turnstileAction?: "log" | "infinite_queue" | null;
  /** If set, the event will override the waiting room's `turnstile_mode` property while it is active. If null, the event will inherit it. */
  turnstileMode?:
    | "off"
    | "invisible"
    | "visible_non_interactive"
    | "visible_managed"
    | null;
}

export const PatchEventResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  createdOn: Schema.optional(Schema.String),
  customPageHtml: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  description: Schema.optional(Schema.String),
  disableSessionRenewal: Schema.optional(
    Schema.Union([Schema.Boolean, Schema.Null]),
  ),
  eventEndTime: Schema.optional(Schema.String),
  eventStartTime: Schema.optional(Schema.String),
  modifiedOn: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  newUsersPerMinute: Schema.optional(
    Schema.Union([Schema.Number, Schema.Null]),
  ),
  prequeueStartTime: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  queueingMethod: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  sessionDuration: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  shuffleAtEventStart: Schema.optional(Schema.Boolean),
  suspended: Schema.optional(Schema.Boolean),
  totalActiveUsers: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  turnstileAction: Schema.optional(
    Schema.Union([
      Schema.Literal("log"),
      Schema.Literal("infinite_queue"),
      Schema.Null,
    ]),
  ),
  turnstileMode: Schema.optional(
    Schema.Union([
      Schema.Literal("off"),
      Schema.Literal("invisible"),
      Schema.Literal("visible_non_interactive"),
      Schema.Literal("visible_managed"),
      Schema.Null,
    ]),
  ),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    createdOn: "created_on",
    customPageHtml: "custom_page_html",
    description: "description",
    disableSessionRenewal: "disable_session_renewal",
    eventEndTime: "event_end_time",
    eventStartTime: "event_start_time",
    modifiedOn: "modified_on",
    name: "name",
    newUsersPerMinute: "new_users_per_minute",
    prequeueStartTime: "prequeue_start_time",
    queueingMethod: "queueing_method",
    sessionDuration: "session_duration",
    shuffleAtEventStart: "shuffle_at_event_start",
    suspended: "suspended",
    totalActiveUsers: "total_active_users",
    turnstileAction: "turnstile_action",
    turnstileMode: "turnstile_mode",
  }),
) as unknown as Schema.Schema<PatchEventResponse>;

export type PatchEventError = CommonErrors;

export const patchEvent: API.OperationMethod<
  PatchEventRequest,
  PatchEventResponse,
  PatchEventError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchEventRequest,
  output: PatchEventResponse,
  errors: [],
}));

export interface DeleteEventRequest {
  waitingRoomId: string;
  eventId: string;
  /** Identifier. */
  zoneId: string;
}

export const DeleteEventRequest = Schema.Struct({
  waitingRoomId: Schema.String.pipe(T.HttpPath("waitingRoomId")),
  eventId: Schema.String.pipe(T.HttpPath("eventId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/zones/{zone_id}/waiting_rooms/{waitingRoomId}/events/{eventId}",
  }),
) as unknown as Schema.Schema<DeleteEventRequest>;

export interface DeleteEventResponse {
  id?: string;
}

export const DeleteEventResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
}) as unknown as Schema.Schema<DeleteEventResponse>;

export type DeleteEventError = CommonErrors;

export const deleteEvent: API.OperationMethod<
  DeleteEventRequest,
  DeleteEventResponse,
  DeleteEventError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteEventRequest,
  output: DeleteEventResponse,
  errors: [],
}));

// =============================================================================
// EventDetail
// =============================================================================

export interface GetEventDetailRequest {
  waitingRoomId: string;
  eventId: string;
  /** Identifier. */
  zoneId: string;
}

export const GetEventDetailRequest = Schema.Struct({
  waitingRoomId: Schema.String.pipe(T.HttpPath("waitingRoomId")),
  eventId: Schema.String.pipe(T.HttpPath("eventId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/waiting_rooms/{waitingRoomId}/events/{eventId}/details",
  }),
) as unknown as Schema.Schema<GetEventDetailRequest>;

export interface GetEventDetailResponse {
  id?: string;
  createdOn?: string;
  customPageHtml?: string;
  /** A note that you can use to add more details about the event. */
  description?: string;
  disableSessionRenewal?: boolean;
  /** An ISO 8601 timestamp that marks the end of the event. */
  eventEndTime?: string;
  /** An ISO 8601 timestamp that marks the start of the event. At this time, queued users will be processed with the event's configuration. The start time must be at least one minute before `event_end_time` */
  eventStartTime?: string;
  modifiedOn?: string;
  /** A unique name to identify the event. Only alphanumeric characters, hyphens and underscores are allowed. */
  name?: string;
  newUsersPerMinute?: number;
  /** An ISO 8601 timestamp that marks when to begin queueing all users before the event starts. The prequeue must start at least five minutes before `event_start_time`. */
  prequeueStartTime?: string | null;
  queueingMethod?: string;
  sessionDuration?: number;
  /** If enabled, users in the prequeue will be shuffled randomly at the `event_start_time`. Requires that `prequeue_start_time` is not null. This is useful for situations when many users will join the even */
  shuffleAtEventStart?: boolean;
  /** Suspends or allows an event. If set to `true`, the event is ignored and traffic will be handled based on the waiting room configuration. */
  suspended?: boolean;
  totalActiveUsers?: number;
}

export const GetEventDetailResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  createdOn: Schema.optional(Schema.String),
  customPageHtml: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  disableSessionRenewal: Schema.optional(Schema.Boolean),
  eventEndTime: Schema.optional(Schema.String),
  eventStartTime: Schema.optional(Schema.String),
  modifiedOn: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  newUsersPerMinute: Schema.optional(Schema.Number),
  prequeueStartTime: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  queueingMethod: Schema.optional(Schema.String),
  sessionDuration: Schema.optional(Schema.Number),
  shuffleAtEventStart: Schema.optional(Schema.Boolean),
  suspended: Schema.optional(Schema.Boolean),
  totalActiveUsers: Schema.optional(Schema.Number),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    createdOn: "created_on",
    customPageHtml: "custom_page_html",
    description: "description",
    disableSessionRenewal: "disable_session_renewal",
    eventEndTime: "event_end_time",
    eventStartTime: "event_start_time",
    modifiedOn: "modified_on",
    name: "name",
    newUsersPerMinute: "new_users_per_minute",
    prequeueStartTime: "prequeue_start_time",
    queueingMethod: "queueing_method",
    sessionDuration: "session_duration",
    shuffleAtEventStart: "shuffle_at_event_start",
    suspended: "suspended",
    totalActiveUsers: "total_active_users",
  }),
) as unknown as Schema.Schema<GetEventDetailResponse>;

export type GetEventDetailError = CommonErrors;

export const getEventDetail: API.OperationMethod<
  GetEventDetailRequest,
  GetEventDetailResponse,
  GetEventDetailError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetEventDetailRequest,
  output: GetEventDetailResponse,
  errors: [],
}));

// =============================================================================
// Page
// =============================================================================

export interface PreviewPageRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: Only available for the Waiting Room Advanced subscription. This is a template html file that will be rendered at the edge. If no custom_page_html is provided, the default waiting room will */
  customHtml: string;
}

export const PreviewPageRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  customHtml: Schema.String,
}).pipe(
  Schema.encodeKeys({ customHtml: "custom_html" }),
  T.Http({ method: "POST", path: "/zones/{zone_id}/waiting_rooms/preview" }),
) as unknown as Schema.Schema<PreviewPageRequest>;

export interface PreviewPageResponse {
  /** URL where the custom waiting room page can temporarily be previewed. */
  previewUrl?: string;
}

export const PreviewPageResponse = Schema.Struct({
  previewUrl: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({ previewUrl: "preview_url" }),
) as unknown as Schema.Schema<PreviewPageResponse>;

export type PreviewPageError = CommonErrors;

export const previewPage: API.OperationMethod<
  PreviewPageRequest,
  PreviewPageResponse,
  PreviewPageError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PreviewPageRequest,
  output: PreviewPageResponse,
  errors: [],
}));

// =============================================================================
// Rule
// =============================================================================

export interface GetRuleRequest {
  waitingRoomId: string;
  /** Identifier. */
  zoneId: string;
}

export const GetRuleRequest = Schema.Struct({
  waitingRoomId: Schema.String.pipe(T.HttpPath("waitingRoomId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/waiting_rooms/{waitingRoomId}/rules",
  }),
) as unknown as Schema.Schema<GetRuleRequest>;

export type GetRuleResponse = {
  id?: string;
  action?: "bypass_waiting_room";
  description?: string;
  enabled?: boolean;
  expression?: string;
  lastUpdated?: string;
  version?: string;
}[];

export const GetRuleResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
    action: Schema.optional(Schema.Literal("bypass_waiting_room")),
    description: Schema.optional(Schema.String),
    enabled: Schema.optional(Schema.Boolean),
    expression: Schema.optional(Schema.String),
    lastUpdated: Schema.optional(Schema.String),
    version: Schema.optional(Schema.String),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      action: "action",
      description: "description",
      enabled: "enabled",
      expression: "expression",
      lastUpdated: "last_updated",
      version: "version",
    }),
  ),
) as unknown as Schema.Schema<GetRuleResponse>;

export type GetRuleError = CommonErrors;

export const getRule: API.OperationMethod<
  GetRuleRequest,
  GetRuleResponse,
  GetRuleError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetRuleRequest,
  output: GetRuleResponse,
  errors: [],
}));

export interface CreateRuleRequest {
  waitingRoomId: string;
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: */
  rules: {
    action: "bypass_waiting_room";
    expression: string;
    description?: string;
    enabled?: boolean;
  };
}

export const CreateRuleRequest = Schema.Struct({
  waitingRoomId: Schema.String.pipe(T.HttpPath("waitingRoomId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  rules: Schema.Struct({
    action: Schema.Literal("bypass_waiting_room"),
    expression: Schema.String,
    description: Schema.optional(Schema.String),
    enabled: Schema.optional(Schema.Boolean),
  }),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/waiting_rooms/{waitingRoomId}/rules",
  }),
) as unknown as Schema.Schema<CreateRuleRequest>;

export type CreateRuleResponse = {
  id?: string;
  action?: "bypass_waiting_room";
  description?: string;
  enabled?: boolean;
  expression?: string;
  lastUpdated?: string;
  version?: string;
}[];

export const CreateRuleResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
    action: Schema.optional(Schema.Literal("bypass_waiting_room")),
    description: Schema.optional(Schema.String),
    enabled: Schema.optional(Schema.Boolean),
    expression: Schema.optional(Schema.String),
    lastUpdated: Schema.optional(Schema.String),
    version: Schema.optional(Schema.String),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      action: "action",
      description: "description",
      enabled: "enabled",
      expression: "expression",
      lastUpdated: "last_updated",
      version: "version",
    }),
  ),
) as unknown as Schema.Schema<CreateRuleResponse>;

export type CreateRuleError = CommonErrors;

export const createRule: API.OperationMethod<
  CreateRuleRequest,
  CreateRuleResponse,
  CreateRuleError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateRuleRequest,
  output: CreateRuleResponse,
  errors: [],
}));

export interface UpdateRuleRequest {
  waitingRoomId: string;
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: */
  rules: {
    action: "bypass_waiting_room";
    expression: string;
    description?: string;
    enabled?: boolean;
  }[];
}

export const UpdateRuleRequest = Schema.Struct({
  waitingRoomId: Schema.String.pipe(T.HttpPath("waitingRoomId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  rules: Schema.Array(
    Schema.Struct({
      action: Schema.Literal("bypass_waiting_room"),
      expression: Schema.String,
      description: Schema.optional(Schema.String),
      enabled: Schema.optional(Schema.Boolean),
    }),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/waiting_rooms/{waitingRoomId}/rules",
  }),
) as unknown as Schema.Schema<UpdateRuleRequest>;

export type UpdateRuleResponse = {
  id?: string;
  action?: "bypass_waiting_room";
  description?: string;
  enabled?: boolean;
  expression?: string;
  lastUpdated?: string;
  version?: string;
}[];

export const UpdateRuleResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
    action: Schema.optional(Schema.Literal("bypass_waiting_room")),
    description: Schema.optional(Schema.String),
    enabled: Schema.optional(Schema.Boolean),
    expression: Schema.optional(Schema.String),
    lastUpdated: Schema.optional(Schema.String),
    version: Schema.optional(Schema.String),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      action: "action",
      description: "description",
      enabled: "enabled",
      expression: "expression",
      lastUpdated: "last_updated",
      version: "version",
    }),
  ),
) as unknown as Schema.Schema<UpdateRuleResponse>;

export type UpdateRuleError = CommonErrors;

export const updateRule: API.OperationMethod<
  UpdateRuleRequest,
  UpdateRuleResponse,
  UpdateRuleError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateRuleRequest,
  output: UpdateRuleResponse,
  errors: [],
}));

export interface DeleteRuleRequest {
  waitingRoomId: string;
  ruleId: string;
  /** Identifier. */
  zoneId: string;
}

export const DeleteRuleRequest = Schema.Struct({
  waitingRoomId: Schema.String.pipe(T.HttpPath("waitingRoomId")),
  ruleId: Schema.String.pipe(T.HttpPath("ruleId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/waiting_rooms/{waitingRoomId}/rules/{ruleId}",
  }),
) as unknown as Schema.Schema<DeleteRuleRequest>;

export type DeleteRuleResponse = {
  id?: string;
  action?: "bypass_waiting_room";
  description?: string;
  enabled?: boolean;
  expression?: string;
  lastUpdated?: string;
  version?: string;
}[];

export const DeleteRuleResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
    action: Schema.optional(Schema.Literal("bypass_waiting_room")),
    description: Schema.optional(Schema.String),
    enabled: Schema.optional(Schema.Boolean),
    expression: Schema.optional(Schema.String),
    lastUpdated: Schema.optional(Schema.String),
    version: Schema.optional(Schema.String),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      action: "action",
      description: "description",
      enabled: "enabled",
      expression: "expression",
      lastUpdated: "last_updated",
      version: "version",
    }),
  ),
) as unknown as Schema.Schema<DeleteRuleResponse>;

export type DeleteRuleError = CommonErrors;

export const deleteRule: API.OperationMethod<
  DeleteRuleRequest,
  DeleteRuleResponse,
  DeleteRuleError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteRuleRequest,
  output: DeleteRuleResponse,
  errors: [],
}));

export interface EditRuleRequest {
  waitingRoomId: string;
  ruleId: string;
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: The action to take when the expression matches. */
  action: "bypass_waiting_room";
  /** Body param: Criteria defining when there is a match for the current rule. */
  expression: string;
  /** Body param: The description of the rule. */
  description?: string;
  /** Body param: When set to true, the rule is enabled. */
  enabled?: boolean;
  /** Body param: Reorder the position of a rule */
  position?: { index?: number } | { before?: string } | { after?: string };
}

export const EditRuleRequest = Schema.Struct({
  waitingRoomId: Schema.String.pipe(T.HttpPath("waitingRoomId")),
  ruleId: Schema.String.pipe(T.HttpPath("ruleId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  action: Schema.Literal("bypass_waiting_room"),
  expression: Schema.String,
  description: Schema.optional(Schema.String),
  enabled: Schema.optional(Schema.Boolean),
  position: Schema.optional(
    Schema.Union([
      Schema.Struct({
        index: Schema.optional(Schema.Number),
      }),
      Schema.Struct({
        before: Schema.optional(Schema.String),
      }),
      Schema.Struct({
        after: Schema.optional(Schema.String),
      }),
    ]),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/waiting_rooms/{waitingRoomId}/rules/{ruleId}",
  }),
) as unknown as Schema.Schema<EditRuleRequest>;

export type EditRuleResponse = {
  id?: string;
  action?: "bypass_waiting_room";
  description?: string;
  enabled?: boolean;
  expression?: string;
  lastUpdated?: string;
  version?: string;
}[];

export const EditRuleResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
    action: Schema.optional(Schema.Literal("bypass_waiting_room")),
    description: Schema.optional(Schema.String),
    enabled: Schema.optional(Schema.Boolean),
    expression: Schema.optional(Schema.String),
    lastUpdated: Schema.optional(Schema.String),
    version: Schema.optional(Schema.String),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      action: "action",
      description: "description",
      enabled: "enabled",
      expression: "expression",
      lastUpdated: "last_updated",
      version: "version",
    }),
  ),
) as unknown as Schema.Schema<EditRuleResponse>;

export type EditRuleError = CommonErrors;

export const editRule: API.OperationMethod<
  EditRuleRequest,
  EditRuleResponse,
  EditRuleError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: EditRuleRequest,
  output: EditRuleResponse,
  errors: [],
}));

// =============================================================================
// Setting
// =============================================================================

export interface GetSettingRequest {
  /** Identifier. */
  zoneId: string;
}

export const GetSettingRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/waiting_rooms/settings" }),
) as unknown as Schema.Schema<GetSettingRequest>;

export interface GetSettingResponse {
  /** Whether to allow verified search engine crawlers to bypass all waiting rooms on this zone. Verified search engine crawlers will not be tracked or counted by the waiting room system, and will not appea */
  searchEngineCrawlerBypass: boolean;
}

export const GetSettingResponse = Schema.Struct({
  searchEngineCrawlerBypass: Schema.Boolean,
}).pipe(
  Schema.encodeKeys({
    searchEngineCrawlerBypass: "search_engine_crawler_bypass",
  }),
) as unknown as Schema.Schema<GetSettingResponse>;

export type GetSettingError = CommonErrors;

export const getSetting: API.OperationMethod<
  GetSettingRequest,
  GetSettingResponse,
  GetSettingError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetSettingRequest,
  output: GetSettingResponse,
  errors: [],
}));

export interface PutSettingRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: Whether to allow verified search engine crawlers to bypass all waiting rooms on this zone. Verified search engine crawlers will not be tracked or counted by the waiting room system, and wi */
  searchEngineCrawlerBypass?: boolean;
}

export const PutSettingRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  searchEngineCrawlerBypass: Schema.optional(Schema.Boolean),
}).pipe(
  Schema.encodeKeys({
    searchEngineCrawlerBypass: "search_engine_crawler_bypass",
  }),
  T.Http({ method: "PUT", path: "/zones/{zone_id}/waiting_rooms/settings" }),
) as unknown as Schema.Schema<PutSettingRequest>;

export interface PutSettingResponse {
  /** Whether to allow verified search engine crawlers to bypass all waiting rooms on this zone. Verified search engine crawlers will not be tracked or counted by the waiting room system, and will not appea */
  searchEngineCrawlerBypass: boolean;
}

export const PutSettingResponse = Schema.Struct({
  searchEngineCrawlerBypass: Schema.Boolean,
}).pipe(
  Schema.encodeKeys({
    searchEngineCrawlerBypass: "search_engine_crawler_bypass",
  }),
) as unknown as Schema.Schema<PutSettingResponse>;

export type PutSettingError = CommonErrors;

export const putSetting: API.OperationMethod<
  PutSettingRequest,
  PutSettingResponse,
  PutSettingError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PutSettingRequest,
  output: PutSettingResponse,
  errors: [],
}));

export interface PatchSettingRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: Whether to allow verified search engine crawlers to bypass all waiting rooms on this zone. Verified search engine crawlers will not be tracked or counted by the waiting room system, and wi */
  searchEngineCrawlerBypass?: boolean;
}

export const PatchSettingRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  searchEngineCrawlerBypass: Schema.optional(Schema.Boolean),
}).pipe(
  Schema.encodeKeys({
    searchEngineCrawlerBypass: "search_engine_crawler_bypass",
  }),
  T.Http({ method: "PATCH", path: "/zones/{zone_id}/waiting_rooms/settings" }),
) as unknown as Schema.Schema<PatchSettingRequest>;

export interface PatchSettingResponse {
  /** Whether to allow verified search engine crawlers to bypass all waiting rooms on this zone. Verified search engine crawlers will not be tracked or counted by the waiting room system, and will not appea */
  searchEngineCrawlerBypass: boolean;
}

export const PatchSettingResponse = Schema.Struct({
  searchEngineCrawlerBypass: Schema.Boolean,
}).pipe(
  Schema.encodeKeys({
    searchEngineCrawlerBypass: "search_engine_crawler_bypass",
  }),
) as unknown as Schema.Schema<PatchSettingResponse>;

export type PatchSettingError = CommonErrors;

export const patchSetting: API.OperationMethod<
  PatchSettingRequest,
  PatchSettingResponse,
  PatchSettingError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchSettingRequest,
  output: PatchSettingResponse,
  errors: [],
}));

// =============================================================================
// Status
// =============================================================================

export interface GetStatusRequest {
  waitingRoomId: string;
  /** Identifier. */
  zoneId: string;
}

export const GetStatusRequest = Schema.Struct({
  waitingRoomId: Schema.String.pipe(T.HttpPath("waitingRoomId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/waiting_rooms/{waitingRoomId}/status",
  }),
) as unknown as Schema.Schema<GetStatusRequest>;

export interface GetStatusResponse {
  estimatedQueuedUsers?: number;
  estimatedTotalActiveUsers?: number;
  eventId?: string;
  maxEstimatedTimeMinutes?: number;
  status?: "event_prequeueing" | "not_queueing" | "queueing" | "suspended";
}

export const GetStatusResponse = Schema.Struct({
  estimatedQueuedUsers: Schema.optional(Schema.Number),
  estimatedTotalActiveUsers: Schema.optional(Schema.Number),
  eventId: Schema.optional(Schema.String),
  maxEstimatedTimeMinutes: Schema.optional(Schema.Number),
  status: Schema.optional(
    Schema.Literals([
      "event_prequeueing",
      "not_queueing",
      "queueing",
      "suspended",
    ]),
  ),
}).pipe(
  Schema.encodeKeys({
    estimatedQueuedUsers: "estimated_queued_users",
    estimatedTotalActiveUsers: "estimated_total_active_users",
    eventId: "event_id",
    maxEstimatedTimeMinutes: "max_estimated_time_minutes",
    status: "status",
  }),
) as unknown as Schema.Schema<GetStatusResponse>;

export type GetStatusError = CommonErrors;

export const getStatus: API.OperationMethod<
  GetStatusRequest,
  GetStatusResponse,
  GetStatusError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetStatusRequest,
  output: GetStatusResponse,
  errors: [],
}));

// =============================================================================
// WaitingRoom
// =============================================================================

export interface GetWaitingRoomRequest {
  waitingRoomId: string;
  /** Identifier. */
  zoneId: string;
}

export const GetWaitingRoomRequest = Schema.Struct({
  waitingRoomId: Schema.String.pipe(T.HttpPath("waitingRoomId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/waiting_rooms/{waitingRoomId}",
  }),
) as unknown as Schema.Schema<GetWaitingRoomRequest>;

export interface GetWaitingRoomResponse {
  id?: string;
  /** Only available for the Waiting Room Advanced subscription. Additional hostname and path combinations to which this waiting room will be applied. There is an implied wildcard at the end of the path. Th */
  additionalRoutes?: { host?: string; path?: string }[];
  /** Configures cookie attributes for the waiting room cookie. This encrypted cookie stores a user's status in the waiting room, such as queue position. */
  cookieAttributes?: {
    samesite?: "auto" | "lax" | "none" | "strict";
    secure?: "auto" | "always" | "never";
  };
  /** Appends a '\_' + a custom suffix to the end of Cloudflare Waiting Room's cookie name(  cf_waitingroom). If `cookie_suffix` is "abcd", the cookie name will be `  cf_waitingroom_abcd`. This field is req */
  cookieSuffix?: string;
  createdOn?: string;
  /** Only available for the Waiting Room Advanced subscription. This is a template html file that will be rendered at the edge. If no custom_page_html is provided, the default waiting room will be used. Th */
  customPageHtml?: string;
  /** The language of the default page template. If no default_template_language is provided, then `en-US` (English) will be used. */
  defaultTemplateLanguage?:
    | "en-US"
    | "es-ES"
    | "de-DE"
    | "fr-FR"
    | "it-IT"
    | "ja-JP"
    | "ko-KR"
    | "pt-BR"
    | "zh-CN"
    | "zh-TW"
    | "nl-NL"
    | "pl-PL"
    | "id-ID"
    | "tr-TR"
    | "ar-EG"
    | "ru-RU"
    | "fa-IR"
    | "bg-BG"
    | "hr-HR"
    | "cs-CZ"
    | "da-DK"
    | "fi-FI"
    | "lt-LT"
    | "ms-MY"
    | "nb-NO"
    | "ro-RO"
    | "el-GR"
    | "he-IL"
    | "hi-IN"
    | "hu-HU"
    | "sr-BA"
    | "sk-SK"
    | "sl-SI"
    | "sv-SE"
    | "tl-PH"
    | "th-TH"
    | "uk-UA"
    | "vi-VN";
  /** A note that you can use to add more details about the waiting room. */
  description?: string;
  /** Only available for the Waiting Room Advanced subscription. Disables automatic renewal of session cookies. If `true`, an accepted user will have session_duration minutes to browse the site. After that, */
  disableSessionRenewal?: boolean;
  /** A list of enabled origin commands. */
  enabledOriginCommands?: "revoke"[];
  /** The host name to which the waiting room will be applied (no wildcards). Please do not include the scheme (http:// or https://). The host and path combination must be unique. */
  host?: string;
  /** Only available for the Waiting Room Advanced subscription. If `true`, requests to the waiting room with the header `Accept: application/json` will receive a JSON response object with information on th */
  jsonResponseEnabled?: boolean;
  modifiedOn?: string;
  /** A unique name to identify the waiting room. Only alphanumeric characters, hyphens and underscores are allowed. */
  name?: string;
  /** Sets the number of new users that will be let into the route every minute. This value is used as baseline for the number of users that are let in per minute. So it is possible that there is a little m */
  newUsersPerMinute?: number;
  /** An ISO 8601 timestamp that marks when the next event will begin queueing. */
  nextEventPrequeueStartTime?: string | null;
  /** An ISO 8601 timestamp that marks when the next event will start. */
  nextEventStartTime?: string | null;
  /** Sets the path within the host to enable the waiting room on. The waiting room will be enabled for all subpaths as well. If there are two waiting rooms on the same subpath, the waiting room for the mos */
  path?: string;
  /** If queue_all is `true`, all the traffic that is coming to a route will be sent to the waiting room. No new traffic can get to the route once this field is set and estimated time will become unavailabl */
  queueAll?: boolean;
  /** Sets the queueing method used by the waiting room. Changing this parameter from the  default  queueing method is only available for the Waiting Room Advanced subscription. Regardless of the queueing m */
  queueingMethod?: "fifo" | "random" | "passthrough" | "reject";
  /** HTTP status code returned to a user while in the queue. */
  queueingStatusCode?: "200" | "202" | "429";
  /** Lifetime of a cookie (in minutes) set by Cloudflare for users who get access to the route. If a user is not seen by Cloudflare again in that time period, they will be treated as a new user that visits */
  sessionDuration?: number;
  /** Suspends or allows traffic going to the waiting room. If set to `true`, the traffic will not go to the waiting room. */
  suspended?: boolean;
  /** Sets the total number of active user sessions on the route at a point in time. A route is a combination of host and path on which a waiting room is available. This value is used as a baseline for the  */
  totalActiveUsers?: number;
  /** Which action to take when a bot is detected using Turnstile. `log` will have no impact on queueing behavior, simply keeping track of how many bots are detected in Waiting Room Analytics. `infinite_que */
  turnstileAction?: "log" | "infinite_queue";
  /** Which Turnstile widget type to use for detecting bot traffic. See [the Turnstile documentation](https://developers.cloudflare.com/turnstile/concepts/widget/#widget-types) for the definitions of these  */
  turnstileMode?:
    | "off"
    | "invisible"
    | "visible_non_interactive"
    | "visible_managed";
}

export const GetWaitingRoomResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  additionalRoutes: Schema.optional(
    Schema.Array(
      Schema.Struct({
        host: Schema.optional(Schema.String),
        path: Schema.optional(Schema.String),
      }),
    ),
  ),
  cookieAttributes: Schema.optional(
    Schema.Struct({
      samesite: Schema.optional(
        Schema.Literals(["auto", "lax", "none", "strict"]),
      ),
      secure: Schema.optional(Schema.Literals(["auto", "always", "never"])),
    }),
  ),
  cookieSuffix: Schema.optional(Schema.String),
  createdOn: Schema.optional(Schema.String),
  customPageHtml: Schema.optional(Schema.String),
  defaultTemplateLanguage: Schema.optional(
    Schema.Literals([
      "en-US",
      "es-ES",
      "de-DE",
      "fr-FR",
      "it-IT",
      "ja-JP",
      "ko-KR",
      "pt-BR",
      "zh-CN",
      "zh-TW",
      "nl-NL",
      "pl-PL",
      "id-ID",
      "tr-TR",
      "ar-EG",
      "ru-RU",
      "fa-IR",
      "bg-BG",
      "hr-HR",
      "cs-CZ",
      "da-DK",
      "fi-FI",
      "lt-LT",
      "ms-MY",
      "nb-NO",
      "ro-RO",
      "el-GR",
      "he-IL",
      "hi-IN",
      "hu-HU",
      "sr-BA",
      "sk-SK",
      "sl-SI",
      "sv-SE",
      "tl-PH",
      "th-TH",
      "uk-UA",
      "vi-VN",
    ]),
  ),
  description: Schema.optional(Schema.String),
  disableSessionRenewal: Schema.optional(Schema.Boolean),
  enabledOriginCommands: Schema.optional(
    Schema.Array(Schema.Literal("revoke")),
  ),
  host: Schema.optional(Schema.String),
  jsonResponseEnabled: Schema.optional(Schema.Boolean),
  modifiedOn: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  newUsersPerMinute: Schema.optional(Schema.Number),
  nextEventPrequeueStartTime: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  nextEventStartTime: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  path: Schema.optional(Schema.String),
  queueAll: Schema.optional(Schema.Boolean),
  queueingMethod: Schema.optional(
    Schema.Literals(["fifo", "random", "passthrough", "reject"]),
  ),
  queueingStatusCode: Schema.optional(Schema.Literals(["200", "202", "429"])),
  sessionDuration: Schema.optional(Schema.Number),
  suspended: Schema.optional(Schema.Boolean),
  totalActiveUsers: Schema.optional(Schema.Number),
  turnstileAction: Schema.optional(Schema.Literals(["log", "infinite_queue"])),
  turnstileMode: Schema.optional(
    Schema.Literals([
      "off",
      "invisible",
      "visible_non_interactive",
      "visible_managed",
    ]),
  ),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    additionalRoutes: "additional_routes",
    cookieAttributes: "cookie_attributes",
    cookieSuffix: "cookie_suffix",
    createdOn: "created_on",
    customPageHtml: "custom_page_html",
    defaultTemplateLanguage: "default_template_language",
    description: "description",
    disableSessionRenewal: "disable_session_renewal",
    enabledOriginCommands: "enabled_origin_commands",
    host: "host",
    jsonResponseEnabled: "json_response_enabled",
    modifiedOn: "modified_on",
    name: "name",
    newUsersPerMinute: "new_users_per_minute",
    nextEventPrequeueStartTime: "next_event_prequeue_start_time",
    nextEventStartTime: "next_event_start_time",
    path: "path",
    queueAll: "queue_all",
    queueingMethod: "queueing_method",
    queueingStatusCode: "queueing_status_code",
    sessionDuration: "session_duration",
    suspended: "suspended",
    totalActiveUsers: "total_active_users",
    turnstileAction: "turnstile_action",
    turnstileMode: "turnstile_mode",
  }),
) as unknown as Schema.Schema<GetWaitingRoomResponse>;

export type GetWaitingRoomError = CommonErrors;

export const getWaitingRoom: API.OperationMethod<
  GetWaitingRoomRequest,
  GetWaitingRoomResponse,
  GetWaitingRoomError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetWaitingRoomRequest,
  output: GetWaitingRoomResponse,
  errors: [],
}));

export interface ListWaitingRoomsRequest {}

export const ListWaitingRoomsRequest = Schema.Struct({}).pipe(
  T.Http({
    method: "GET",
    path: "/{accountOrZone}/{accountOrZoneId}/waiting_rooms",
  }),
) as unknown as Schema.Schema<ListWaitingRoomsRequest>;

export type ListWaitingRoomsResponse = {
  id?: string;
  additionalRoutes?: { host?: string; path?: string }[];
  cookieAttributes?: {
    samesite?: "auto" | "lax" | "none" | "strict";
    secure?: "auto" | "always" | "never";
  };
  cookieSuffix?: string;
  createdOn?: string;
  customPageHtml?: string;
  defaultTemplateLanguage?:
    | "en-US"
    | "es-ES"
    | "de-DE"
    | "fr-FR"
    | "it-IT"
    | "ja-JP"
    | "ko-KR"
    | "pt-BR"
    | "zh-CN"
    | "zh-TW"
    | "nl-NL"
    | "pl-PL"
    | "id-ID"
    | "tr-TR"
    | "ar-EG"
    | "ru-RU"
    | "fa-IR"
    | "bg-BG"
    | "hr-HR"
    | "cs-CZ"
    | "da-DK"
    | "fi-FI"
    | "lt-LT"
    | "ms-MY"
    | "nb-NO"
    | "ro-RO"
    | "el-GR"
    | "he-IL"
    | "hi-IN"
    | "hu-HU"
    | "sr-BA"
    | "sk-SK"
    | "sl-SI"
    | "sv-SE"
    | "tl-PH"
    | "th-TH"
    | "uk-UA"
    | "vi-VN";
  description?: string;
  disableSessionRenewal?: boolean;
  enabledOriginCommands?: "revoke"[];
  host?: string;
  jsonResponseEnabled?: boolean;
  modifiedOn?: string;
  name?: string;
  newUsersPerMinute?: number;
  nextEventPrequeueStartTime?: string | null;
  nextEventStartTime?: string | null;
  path?: string;
  queueAll?: boolean;
  queueingMethod?: "fifo" | "random" | "passthrough" | "reject";
  queueingStatusCode?: "200" | "202" | "429";
  sessionDuration?: number;
  suspended?: boolean;
  totalActiveUsers?: number;
  turnstileAction?: "log" | "infinite_queue";
  turnstileMode?:
    | "off"
    | "invisible"
    | "visible_non_interactive"
    | "visible_managed";
}[];

export const ListWaitingRoomsResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
    additionalRoutes: Schema.optional(
      Schema.Array(
        Schema.Struct({
          host: Schema.optional(Schema.String),
          path: Schema.optional(Schema.String),
        }),
      ),
    ),
    cookieAttributes: Schema.optional(
      Schema.Struct({
        samesite: Schema.optional(
          Schema.Literals(["auto", "lax", "none", "strict"]),
        ),
        secure: Schema.optional(Schema.Literals(["auto", "always", "never"])),
      }),
    ),
    cookieSuffix: Schema.optional(Schema.String),
    createdOn: Schema.optional(Schema.String),
    customPageHtml: Schema.optional(Schema.String),
    defaultTemplateLanguage: Schema.optional(
      Schema.Literals([
        "en-US",
        "es-ES",
        "de-DE",
        "fr-FR",
        "it-IT",
        "ja-JP",
        "ko-KR",
        "pt-BR",
        "zh-CN",
        "zh-TW",
        "nl-NL",
        "pl-PL",
        "id-ID",
        "tr-TR",
        "ar-EG",
        "ru-RU",
        "fa-IR",
        "bg-BG",
        "hr-HR",
        "cs-CZ",
        "da-DK",
        "fi-FI",
        "lt-LT",
        "ms-MY",
        "nb-NO",
        "ro-RO",
        "el-GR",
        "he-IL",
        "hi-IN",
        "hu-HU",
        "sr-BA",
        "sk-SK",
        "sl-SI",
        "sv-SE",
        "tl-PH",
        "th-TH",
        "uk-UA",
        "vi-VN",
      ]),
    ),
    description: Schema.optional(Schema.String),
    disableSessionRenewal: Schema.optional(Schema.Boolean),
    enabledOriginCommands: Schema.optional(
      Schema.Array(Schema.Literal("revoke")),
    ),
    host: Schema.optional(Schema.String),
    jsonResponseEnabled: Schema.optional(Schema.Boolean),
    modifiedOn: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    newUsersPerMinute: Schema.optional(Schema.Number),
    nextEventPrequeueStartTime: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    nextEventStartTime: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    path: Schema.optional(Schema.String),
    queueAll: Schema.optional(Schema.Boolean),
    queueingMethod: Schema.optional(
      Schema.Literals(["fifo", "random", "passthrough", "reject"]),
    ),
    queueingStatusCode: Schema.optional(Schema.Literals(["200", "202", "429"])),
    sessionDuration: Schema.optional(Schema.Number),
    suspended: Schema.optional(Schema.Boolean),
    totalActiveUsers: Schema.optional(Schema.Number),
    turnstileAction: Schema.optional(
      Schema.Literals(["log", "infinite_queue"]),
    ),
    turnstileMode: Schema.optional(
      Schema.Literals([
        "off",
        "invisible",
        "visible_non_interactive",
        "visible_managed",
      ]),
    ),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      additionalRoutes: "additional_routes",
      cookieAttributes: "cookie_attributes",
      cookieSuffix: "cookie_suffix",
      createdOn: "created_on",
      customPageHtml: "custom_page_html",
      defaultTemplateLanguage: "default_template_language",
      description: "description",
      disableSessionRenewal: "disable_session_renewal",
      enabledOriginCommands: "enabled_origin_commands",
      host: "host",
      jsonResponseEnabled: "json_response_enabled",
      modifiedOn: "modified_on",
      name: "name",
      newUsersPerMinute: "new_users_per_minute",
      nextEventPrequeueStartTime: "next_event_prequeue_start_time",
      nextEventStartTime: "next_event_start_time",
      path: "path",
      queueAll: "queue_all",
      queueingMethod: "queueing_method",
      queueingStatusCode: "queueing_status_code",
      sessionDuration: "session_duration",
      suspended: "suspended",
      totalActiveUsers: "total_active_users",
      turnstileAction: "turnstile_action",
      turnstileMode: "turnstile_mode",
    }),
  ),
) as unknown as Schema.Schema<ListWaitingRoomsResponse>;

export type ListWaitingRoomsError = CommonErrors;

export const listWaitingRooms: API.OperationMethod<
  ListWaitingRoomsRequest,
  ListWaitingRoomsResponse,
  ListWaitingRoomsError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListWaitingRoomsRequest,
  output: ListWaitingRoomsResponse,
  errors: [],
}));

export interface CreateWaitingRoomRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: The host name to which the waiting room will be applied (no wildcards). Please do not include the scheme (http:// or https://). The host and path combination must be unique. */
  host: string;
  /** Body param: A unique name to identify the waiting room. Only alphanumeric characters, hyphens and underscores are allowed. */
  name: string;
  /** Body param: Sets the number of new users that will be let into the route every minute. This value is used as baseline for the number of users that are let in per minute. So it is possible that there i */
  newUsersPerMinute: number;
  /** Body param: Sets the total number of active user sessions on the route at a point in time. A route is a combination of host and path on which a waiting room is available. This value is used as a basel */
  totalActiveUsers: number;
  /** Body param: Only available for the Waiting Room Advanced subscription. Additional hostname and path combinations to which this waiting room will be applied. There is an implied wildcard at the end of  */
  additionalRoutes?: { host?: string; path?: string }[];
  /** Body param: Configures cookie attributes for the waiting room cookie. This encrypted cookie stores a user's status in the waiting room, such as queue position. */
  cookieAttributes?: {
    samesite?: "auto" | "lax" | "none" | "strict";
    secure?: "auto" | "always" | "never";
  };
  /** Body param: Appends a '\_' + a custom suffix to the end of Cloudflare Waiting Room's cookie name(  cf_waitingroom). If `cookie_suffix` is "abcd", the cookie name will be `  cf_waitingroom_abcd`. This  */
  cookieSuffix?: string;
  /** Body param: Only available for the Waiting Room Advanced subscription. This is a template html file that will be rendered at the edge. If no custom_page_html is provided, the default waiting room will */
  customPageHtml?: string;
  /** Body param: The language of the default page template. If no default_template_language is provided, then `en-US` (English) will be used. */
  defaultTemplateLanguage?:
    | "en-US"
    | "es-ES"
    | "de-DE"
    | "fr-FR"
    | "it-IT"
    | "ja-JP"
    | "ko-KR"
    | "pt-BR"
    | "zh-CN"
    | "zh-TW"
    | "nl-NL"
    | "pl-PL"
    | "id-ID"
    | "tr-TR"
    | "ar-EG"
    | "ru-RU"
    | "fa-IR"
    | "bg-BG"
    | "hr-HR"
    | "cs-CZ"
    | "da-DK"
    | "fi-FI"
    | "lt-LT"
    | "ms-MY"
    | "nb-NO"
    | "ro-RO"
    | "el-GR"
    | "he-IL"
    | "hi-IN"
    | "hu-HU"
    | "sr-BA"
    | "sk-SK"
    | "sl-SI"
    | "sv-SE"
    | "tl-PH"
    | "th-TH"
    | "uk-UA"
    | "vi-VN";
  /** Body param: A note that you can use to add more details about the waiting room. */
  description?: string;
  /** Body param: Only available for the Waiting Room Advanced subscription. Disables automatic renewal of session cookies. If `true`, an accepted user will have session_duration minutes to browse the site. */
  disableSessionRenewal?: boolean;
  /** Body param: A list of enabled origin commands. */
  enabledOriginCommands?: "revoke"[];
  /** Body param: Only available for the Waiting Room Advanced subscription. If `true`, requests to the waiting room with the header `Accept: application/json` will receive a JSON response object with infor */
  jsonResponseEnabled?: boolean;
  /** Body param: Sets the path within the host to enable the waiting room on. The waiting room will be enabled for all subpaths as well. If there are two waiting rooms on the same subpath, the waiting room */
  path?: string;
  /** Body param: If queue_all is `true`, all the traffic that is coming to a route will be sent to the waiting room. No new traffic can get to the route once this field is set and estimated time will becom */
  queueAll?: boolean;
  /** Body param: Sets the queueing method used by the waiting room. Changing this parameter from the  default  queueing method is only available for the Waiting Room Advanced subscription. Regardless of th */
  queueingMethod?: "fifo" | "random" | "passthrough" | "reject";
  /** Body param: HTTP status code returned to a user while in the queue. */
  queueingStatusCode?: "200" | "202" | "429";
  /** Body param: Lifetime of a cookie (in minutes) set by Cloudflare for users who get access to the route. If a user is not seen by Cloudflare again in that time period, they will be treated as a new user */
  sessionDuration?: number;
  /** Body param: Suspends or allows traffic going to the waiting room. If set to `true`, the traffic will not go to the waiting room. */
  suspended?: boolean;
  /** Body param: Which action to take when a bot is detected using Turnstile. `log` will have no impact on queueing behavior, simply keeping track of how many bots are detected in Waiting Room Analytics. ` */
  turnstileAction?: "log" | "infinite_queue";
  /** Body param: Which Turnstile widget type to use for detecting bot traffic. See [the Turnstile documentation](https://developers.cloudflare.com/turnstile/concepts/widget/#widget-types) for the definitio */
  turnstileMode?:
    | "off"
    | "invisible"
    | "visible_non_interactive"
    | "visible_managed";
}

export const CreateWaitingRoomRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  host: Schema.String,
  name: Schema.String,
  newUsersPerMinute: Schema.Number,
  totalActiveUsers: Schema.Number,
  additionalRoutes: Schema.optional(
    Schema.Array(
      Schema.Struct({
        host: Schema.optional(Schema.String),
        path: Schema.optional(Schema.String),
      }),
    ),
  ),
  cookieAttributes: Schema.optional(
    Schema.Struct({
      samesite: Schema.optional(
        Schema.Literals(["auto", "lax", "none", "strict"]),
      ),
      secure: Schema.optional(Schema.Literals(["auto", "always", "never"])),
    }),
  ),
  cookieSuffix: Schema.optional(Schema.String),
  customPageHtml: Schema.optional(Schema.String),
  defaultTemplateLanguage: Schema.optional(
    Schema.Literals([
      "en-US",
      "es-ES",
      "de-DE",
      "fr-FR",
      "it-IT",
      "ja-JP",
      "ko-KR",
      "pt-BR",
      "zh-CN",
      "zh-TW",
      "nl-NL",
      "pl-PL",
      "id-ID",
      "tr-TR",
      "ar-EG",
      "ru-RU",
      "fa-IR",
      "bg-BG",
      "hr-HR",
      "cs-CZ",
      "da-DK",
      "fi-FI",
      "lt-LT",
      "ms-MY",
      "nb-NO",
      "ro-RO",
      "el-GR",
      "he-IL",
      "hi-IN",
      "hu-HU",
      "sr-BA",
      "sk-SK",
      "sl-SI",
      "sv-SE",
      "tl-PH",
      "th-TH",
      "uk-UA",
      "vi-VN",
    ]),
  ),
  description: Schema.optional(Schema.String),
  disableSessionRenewal: Schema.optional(Schema.Boolean),
  enabledOriginCommands: Schema.optional(
    Schema.Array(Schema.Literal("revoke")),
  ),
  jsonResponseEnabled: Schema.optional(Schema.Boolean),
  path: Schema.optional(Schema.String),
  queueAll: Schema.optional(Schema.Boolean),
  queueingMethod: Schema.optional(
    Schema.Literals(["fifo", "random", "passthrough", "reject"]),
  ),
  queueingStatusCode: Schema.optional(Schema.Literals(["200", "202", "429"])),
  sessionDuration: Schema.optional(Schema.Number),
  suspended: Schema.optional(Schema.Boolean),
  turnstileAction: Schema.optional(Schema.Literals(["log", "infinite_queue"])),
  turnstileMode: Schema.optional(
    Schema.Literals([
      "off",
      "invisible",
      "visible_non_interactive",
      "visible_managed",
    ]),
  ),
}).pipe(
  Schema.encodeKeys({
    host: "host",
    name: "name",
    newUsersPerMinute: "new_users_per_minute",
    totalActiveUsers: "total_active_users",
    additionalRoutes: "additional_routes",
    cookieAttributes: "cookie_attributes",
    cookieSuffix: "cookie_suffix",
    customPageHtml: "custom_page_html",
    defaultTemplateLanguage: "default_template_language",
    description: "description",
    disableSessionRenewal: "disable_session_renewal",
    enabledOriginCommands: "enabled_origin_commands",
    jsonResponseEnabled: "json_response_enabled",
    path: "path",
    queueAll: "queue_all",
    queueingMethod: "queueing_method",
    queueingStatusCode: "queueing_status_code",
    sessionDuration: "session_duration",
    suspended: "suspended",
    turnstileAction: "turnstile_action",
    turnstileMode: "turnstile_mode",
  }),
  T.Http({ method: "POST", path: "/zones/{zone_id}/waiting_rooms" }),
) as unknown as Schema.Schema<CreateWaitingRoomRequest>;

export interface CreateWaitingRoomResponse {
  id?: string;
  /** Only available for the Waiting Room Advanced subscription. Additional hostname and path combinations to which this waiting room will be applied. There is an implied wildcard at the end of the path. Th */
  additionalRoutes?: { host?: string; path?: string }[];
  /** Configures cookie attributes for the waiting room cookie. This encrypted cookie stores a user's status in the waiting room, such as queue position. */
  cookieAttributes?: {
    samesite?: "auto" | "lax" | "none" | "strict";
    secure?: "auto" | "always" | "never";
  };
  /** Appends a '\_' + a custom suffix to the end of Cloudflare Waiting Room's cookie name(  cf_waitingroom). If `cookie_suffix` is "abcd", the cookie name will be `  cf_waitingroom_abcd`. This field is req */
  cookieSuffix?: string;
  createdOn?: string;
  /** Only available for the Waiting Room Advanced subscription. This is a template html file that will be rendered at the edge. If no custom_page_html is provided, the default waiting room will be used. Th */
  customPageHtml?: string;
  /** The language of the default page template. If no default_template_language is provided, then `en-US` (English) will be used. */
  defaultTemplateLanguage?:
    | "en-US"
    | "es-ES"
    | "de-DE"
    | "fr-FR"
    | "it-IT"
    | "ja-JP"
    | "ko-KR"
    | "pt-BR"
    | "zh-CN"
    | "zh-TW"
    | "nl-NL"
    | "pl-PL"
    | "id-ID"
    | "tr-TR"
    | "ar-EG"
    | "ru-RU"
    | "fa-IR"
    | "bg-BG"
    | "hr-HR"
    | "cs-CZ"
    | "da-DK"
    | "fi-FI"
    | "lt-LT"
    | "ms-MY"
    | "nb-NO"
    | "ro-RO"
    | "el-GR"
    | "he-IL"
    | "hi-IN"
    | "hu-HU"
    | "sr-BA"
    | "sk-SK"
    | "sl-SI"
    | "sv-SE"
    | "tl-PH"
    | "th-TH"
    | "uk-UA"
    | "vi-VN";
  /** A note that you can use to add more details about the waiting room. */
  description?: string;
  /** Only available for the Waiting Room Advanced subscription. Disables automatic renewal of session cookies. If `true`, an accepted user will have session_duration minutes to browse the site. After that, */
  disableSessionRenewal?: boolean;
  /** A list of enabled origin commands. */
  enabledOriginCommands?: "revoke"[];
  /** The host name to which the waiting room will be applied (no wildcards). Please do not include the scheme (http:// or https://). The host and path combination must be unique. */
  host?: string;
  /** Only available for the Waiting Room Advanced subscription. If `true`, requests to the waiting room with the header `Accept: application/json` will receive a JSON response object with information on th */
  jsonResponseEnabled?: boolean;
  modifiedOn?: string;
  /** A unique name to identify the waiting room. Only alphanumeric characters, hyphens and underscores are allowed. */
  name?: string;
  /** Sets the number of new users that will be let into the route every minute. This value is used as baseline for the number of users that are let in per minute. So it is possible that there is a little m */
  newUsersPerMinute?: number;
  /** An ISO 8601 timestamp that marks when the next event will begin queueing. */
  nextEventPrequeueStartTime?: string | null;
  /** An ISO 8601 timestamp that marks when the next event will start. */
  nextEventStartTime?: string | null;
  /** Sets the path within the host to enable the waiting room on. The waiting room will be enabled for all subpaths as well. If there are two waiting rooms on the same subpath, the waiting room for the mos */
  path?: string;
  /** If queue_all is `true`, all the traffic that is coming to a route will be sent to the waiting room. No new traffic can get to the route once this field is set and estimated time will become unavailabl */
  queueAll?: boolean;
  /** Sets the queueing method used by the waiting room. Changing this parameter from the  default  queueing method is only available for the Waiting Room Advanced subscription. Regardless of the queueing m */
  queueingMethod?: "fifo" | "random" | "passthrough" | "reject";
  /** HTTP status code returned to a user while in the queue. */
  queueingStatusCode?: "200" | "202" | "429";
  /** Lifetime of a cookie (in minutes) set by Cloudflare for users who get access to the route. If a user is not seen by Cloudflare again in that time period, they will be treated as a new user that visits */
  sessionDuration?: number;
  /** Suspends or allows traffic going to the waiting room. If set to `true`, the traffic will not go to the waiting room. */
  suspended?: boolean;
  /** Sets the total number of active user sessions on the route at a point in time. A route is a combination of host and path on which a waiting room is available. This value is used as a baseline for the  */
  totalActiveUsers?: number;
  /** Which action to take when a bot is detected using Turnstile. `log` will have no impact on queueing behavior, simply keeping track of how many bots are detected in Waiting Room Analytics. `infinite_que */
  turnstileAction?: "log" | "infinite_queue";
  /** Which Turnstile widget type to use for detecting bot traffic. See [the Turnstile documentation](https://developers.cloudflare.com/turnstile/concepts/widget/#widget-types) for the definitions of these  */
  turnstileMode?:
    | "off"
    | "invisible"
    | "visible_non_interactive"
    | "visible_managed";
}

export const CreateWaitingRoomResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  additionalRoutes: Schema.optional(
    Schema.Array(
      Schema.Struct({
        host: Schema.optional(Schema.String),
        path: Schema.optional(Schema.String),
      }),
    ),
  ),
  cookieAttributes: Schema.optional(
    Schema.Struct({
      samesite: Schema.optional(
        Schema.Literals(["auto", "lax", "none", "strict"]),
      ),
      secure: Schema.optional(Schema.Literals(["auto", "always", "never"])),
    }),
  ),
  cookieSuffix: Schema.optional(Schema.String),
  createdOn: Schema.optional(Schema.String),
  customPageHtml: Schema.optional(Schema.String),
  defaultTemplateLanguage: Schema.optional(
    Schema.Literals([
      "en-US",
      "es-ES",
      "de-DE",
      "fr-FR",
      "it-IT",
      "ja-JP",
      "ko-KR",
      "pt-BR",
      "zh-CN",
      "zh-TW",
      "nl-NL",
      "pl-PL",
      "id-ID",
      "tr-TR",
      "ar-EG",
      "ru-RU",
      "fa-IR",
      "bg-BG",
      "hr-HR",
      "cs-CZ",
      "da-DK",
      "fi-FI",
      "lt-LT",
      "ms-MY",
      "nb-NO",
      "ro-RO",
      "el-GR",
      "he-IL",
      "hi-IN",
      "hu-HU",
      "sr-BA",
      "sk-SK",
      "sl-SI",
      "sv-SE",
      "tl-PH",
      "th-TH",
      "uk-UA",
      "vi-VN",
    ]),
  ),
  description: Schema.optional(Schema.String),
  disableSessionRenewal: Schema.optional(Schema.Boolean),
  enabledOriginCommands: Schema.optional(
    Schema.Array(Schema.Literal("revoke")),
  ),
  host: Schema.optional(Schema.String),
  jsonResponseEnabled: Schema.optional(Schema.Boolean),
  modifiedOn: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  newUsersPerMinute: Schema.optional(Schema.Number),
  nextEventPrequeueStartTime: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  nextEventStartTime: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  path: Schema.optional(Schema.String),
  queueAll: Schema.optional(Schema.Boolean),
  queueingMethod: Schema.optional(
    Schema.Literals(["fifo", "random", "passthrough", "reject"]),
  ),
  queueingStatusCode: Schema.optional(Schema.Literals(["200", "202", "429"])),
  sessionDuration: Schema.optional(Schema.Number),
  suspended: Schema.optional(Schema.Boolean),
  totalActiveUsers: Schema.optional(Schema.Number),
  turnstileAction: Schema.optional(Schema.Literals(["log", "infinite_queue"])),
  turnstileMode: Schema.optional(
    Schema.Literals([
      "off",
      "invisible",
      "visible_non_interactive",
      "visible_managed",
    ]),
  ),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    additionalRoutes: "additional_routes",
    cookieAttributes: "cookie_attributes",
    cookieSuffix: "cookie_suffix",
    createdOn: "created_on",
    customPageHtml: "custom_page_html",
    defaultTemplateLanguage: "default_template_language",
    description: "description",
    disableSessionRenewal: "disable_session_renewal",
    enabledOriginCommands: "enabled_origin_commands",
    host: "host",
    jsonResponseEnabled: "json_response_enabled",
    modifiedOn: "modified_on",
    name: "name",
    newUsersPerMinute: "new_users_per_minute",
    nextEventPrequeueStartTime: "next_event_prequeue_start_time",
    nextEventStartTime: "next_event_start_time",
    path: "path",
    queueAll: "queue_all",
    queueingMethod: "queueing_method",
    queueingStatusCode: "queueing_status_code",
    sessionDuration: "session_duration",
    suspended: "suspended",
    totalActiveUsers: "total_active_users",
    turnstileAction: "turnstile_action",
    turnstileMode: "turnstile_mode",
  }),
) as unknown as Schema.Schema<CreateWaitingRoomResponse>;

export type CreateWaitingRoomError = CommonErrors;

export const createWaitingRoom: API.OperationMethod<
  CreateWaitingRoomRequest,
  CreateWaitingRoomResponse,
  CreateWaitingRoomError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateWaitingRoomRequest,
  output: CreateWaitingRoomResponse,
  errors: [],
}));

export interface UpdateWaitingRoomRequest {
  waitingRoomId: string;
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: The host name to which the waiting room will be applied (no wildcards). Please do not include the scheme (http:// or https://). The host and path combination must be unique. */
  host: string;
  /** Body param: A unique name to identify the waiting room. Only alphanumeric characters, hyphens and underscores are allowed. */
  name: string;
  /** Body param: Sets the number of new users that will be let into the route every minute. This value is used as baseline for the number of users that are let in per minute. So it is possible that there i */
  newUsersPerMinute: number;
  /** Body param: Sets the total number of active user sessions on the route at a point in time. A route is a combination of host and path on which a waiting room is available. This value is used as a basel */
  totalActiveUsers: number;
  /** Body param: Only available for the Waiting Room Advanced subscription. Additional hostname and path combinations to which this waiting room will be applied. There is an implied wildcard at the end of  */
  additionalRoutes?: { host?: string; path?: string }[];
  /** Body param: Configures cookie attributes for the waiting room cookie. This encrypted cookie stores a user's status in the waiting room, such as queue position. */
  cookieAttributes?: {
    samesite?: "auto" | "lax" | "none" | "strict";
    secure?: "auto" | "always" | "never";
  };
  /** Body param: Appends a '\_' + a custom suffix to the end of Cloudflare Waiting Room's cookie name(  cf_waitingroom). If `cookie_suffix` is "abcd", the cookie name will be `  cf_waitingroom_abcd`. This  */
  cookieSuffix?: string;
  /** Body param: Only available for the Waiting Room Advanced subscription. This is a template html file that will be rendered at the edge. If no custom_page_html is provided, the default waiting room will */
  customPageHtml?: string;
  /** Body param: The language of the default page template. If no default_template_language is provided, then `en-US` (English) will be used. */
  defaultTemplateLanguage?:
    | "en-US"
    | "es-ES"
    | "de-DE"
    | "fr-FR"
    | "it-IT"
    | "ja-JP"
    | "ko-KR"
    | "pt-BR"
    | "zh-CN"
    | "zh-TW"
    | "nl-NL"
    | "pl-PL"
    | "id-ID"
    | "tr-TR"
    | "ar-EG"
    | "ru-RU"
    | "fa-IR"
    | "bg-BG"
    | "hr-HR"
    | "cs-CZ"
    | "da-DK"
    | "fi-FI"
    | "lt-LT"
    | "ms-MY"
    | "nb-NO"
    | "ro-RO"
    | "el-GR"
    | "he-IL"
    | "hi-IN"
    | "hu-HU"
    | "sr-BA"
    | "sk-SK"
    | "sl-SI"
    | "sv-SE"
    | "tl-PH"
    | "th-TH"
    | "uk-UA"
    | "vi-VN";
  /** Body param: A note that you can use to add more details about the waiting room. */
  description?: string;
  /** Body param: Only available for the Waiting Room Advanced subscription. Disables automatic renewal of session cookies. If `true`, an accepted user will have session_duration minutes to browse the site. */
  disableSessionRenewal?: boolean;
  /** Body param: A list of enabled origin commands. */
  enabledOriginCommands?: "revoke"[];
  /** Body param: Only available for the Waiting Room Advanced subscription. If `true`, requests to the waiting room with the header `Accept: application/json` will receive a JSON response object with infor */
  jsonResponseEnabled?: boolean;
  /** Body param: Sets the path within the host to enable the waiting room on. The waiting room will be enabled for all subpaths as well. If there are two waiting rooms on the same subpath, the waiting room */
  path?: string;
  /** Body param: If queue_all is `true`, all the traffic that is coming to a route will be sent to the waiting room. No new traffic can get to the route once this field is set and estimated time will becom */
  queueAll?: boolean;
  /** Body param: Sets the queueing method used by the waiting room. Changing this parameter from the  default  queueing method is only available for the Waiting Room Advanced subscription. Regardless of th */
  queueingMethod?: "fifo" | "random" | "passthrough" | "reject";
  /** Body param: HTTP status code returned to a user while in the queue. */
  queueingStatusCode?: "200" | "202" | "429";
  /** Body param: Lifetime of a cookie (in minutes) set by Cloudflare for users who get access to the route. If a user is not seen by Cloudflare again in that time period, they will be treated as a new user */
  sessionDuration?: number;
  /** Body param: Suspends or allows traffic going to the waiting room. If set to `true`, the traffic will not go to the waiting room. */
  suspended?: boolean;
  /** Body param: Which action to take when a bot is detected using Turnstile. `log` will have no impact on queueing behavior, simply keeping track of how many bots are detected in Waiting Room Analytics. ` */
  turnstileAction?: "log" | "infinite_queue";
  /** Body param: Which Turnstile widget type to use for detecting bot traffic. See [the Turnstile documentation](https://developers.cloudflare.com/turnstile/concepts/widget/#widget-types) for the definitio */
  turnstileMode?:
    | "off"
    | "invisible"
    | "visible_non_interactive"
    | "visible_managed";
}

export const UpdateWaitingRoomRequest = Schema.Struct({
  waitingRoomId: Schema.String.pipe(T.HttpPath("waitingRoomId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  host: Schema.String,
  name: Schema.String,
  newUsersPerMinute: Schema.Number,
  totalActiveUsers: Schema.Number,
  additionalRoutes: Schema.optional(
    Schema.Array(
      Schema.Struct({
        host: Schema.optional(Schema.String),
        path: Schema.optional(Schema.String),
      }),
    ),
  ),
  cookieAttributes: Schema.optional(
    Schema.Struct({
      samesite: Schema.optional(
        Schema.Literals(["auto", "lax", "none", "strict"]),
      ),
      secure: Schema.optional(Schema.Literals(["auto", "always", "never"])),
    }),
  ),
  cookieSuffix: Schema.optional(Schema.String),
  customPageHtml: Schema.optional(Schema.String),
  defaultTemplateLanguage: Schema.optional(
    Schema.Literals([
      "en-US",
      "es-ES",
      "de-DE",
      "fr-FR",
      "it-IT",
      "ja-JP",
      "ko-KR",
      "pt-BR",
      "zh-CN",
      "zh-TW",
      "nl-NL",
      "pl-PL",
      "id-ID",
      "tr-TR",
      "ar-EG",
      "ru-RU",
      "fa-IR",
      "bg-BG",
      "hr-HR",
      "cs-CZ",
      "da-DK",
      "fi-FI",
      "lt-LT",
      "ms-MY",
      "nb-NO",
      "ro-RO",
      "el-GR",
      "he-IL",
      "hi-IN",
      "hu-HU",
      "sr-BA",
      "sk-SK",
      "sl-SI",
      "sv-SE",
      "tl-PH",
      "th-TH",
      "uk-UA",
      "vi-VN",
    ]),
  ),
  description: Schema.optional(Schema.String),
  disableSessionRenewal: Schema.optional(Schema.Boolean),
  enabledOriginCommands: Schema.optional(
    Schema.Array(Schema.Literal("revoke")),
  ),
  jsonResponseEnabled: Schema.optional(Schema.Boolean),
  path: Schema.optional(Schema.String),
  queueAll: Schema.optional(Schema.Boolean),
  queueingMethod: Schema.optional(
    Schema.Literals(["fifo", "random", "passthrough", "reject"]),
  ),
  queueingStatusCode: Schema.optional(Schema.Literals(["200", "202", "429"])),
  sessionDuration: Schema.optional(Schema.Number),
  suspended: Schema.optional(Schema.Boolean),
  turnstileAction: Schema.optional(Schema.Literals(["log", "infinite_queue"])),
  turnstileMode: Schema.optional(
    Schema.Literals([
      "off",
      "invisible",
      "visible_non_interactive",
      "visible_managed",
    ]),
  ),
}).pipe(
  Schema.encodeKeys({
    host: "host",
    name: "name",
    newUsersPerMinute: "new_users_per_minute",
    totalActiveUsers: "total_active_users",
    additionalRoutes: "additional_routes",
    cookieAttributes: "cookie_attributes",
    cookieSuffix: "cookie_suffix",
    customPageHtml: "custom_page_html",
    defaultTemplateLanguage: "default_template_language",
    description: "description",
    disableSessionRenewal: "disable_session_renewal",
    enabledOriginCommands: "enabled_origin_commands",
    jsonResponseEnabled: "json_response_enabled",
    path: "path",
    queueAll: "queue_all",
    queueingMethod: "queueing_method",
    queueingStatusCode: "queueing_status_code",
    sessionDuration: "session_duration",
    suspended: "suspended",
    turnstileAction: "turnstile_action",
    turnstileMode: "turnstile_mode",
  }),
  T.Http({
    method: "PUT",
    path: "/zones/{zone_id}/waiting_rooms/{waitingRoomId}",
  }),
) as unknown as Schema.Schema<UpdateWaitingRoomRequest>;

export interface UpdateWaitingRoomResponse {
  id?: string;
  /** Only available for the Waiting Room Advanced subscription. Additional hostname and path combinations to which this waiting room will be applied. There is an implied wildcard at the end of the path. Th */
  additionalRoutes?: { host?: string; path?: string }[];
  /** Configures cookie attributes for the waiting room cookie. This encrypted cookie stores a user's status in the waiting room, such as queue position. */
  cookieAttributes?: {
    samesite?: "auto" | "lax" | "none" | "strict";
    secure?: "auto" | "always" | "never";
  };
  /** Appends a '\_' + a custom suffix to the end of Cloudflare Waiting Room's cookie name(  cf_waitingroom). If `cookie_suffix` is "abcd", the cookie name will be `  cf_waitingroom_abcd`. This field is req */
  cookieSuffix?: string;
  createdOn?: string;
  /** Only available for the Waiting Room Advanced subscription. This is a template html file that will be rendered at the edge. If no custom_page_html is provided, the default waiting room will be used. Th */
  customPageHtml?: string;
  /** The language of the default page template. If no default_template_language is provided, then `en-US` (English) will be used. */
  defaultTemplateLanguage?:
    | "en-US"
    | "es-ES"
    | "de-DE"
    | "fr-FR"
    | "it-IT"
    | "ja-JP"
    | "ko-KR"
    | "pt-BR"
    | "zh-CN"
    | "zh-TW"
    | "nl-NL"
    | "pl-PL"
    | "id-ID"
    | "tr-TR"
    | "ar-EG"
    | "ru-RU"
    | "fa-IR"
    | "bg-BG"
    | "hr-HR"
    | "cs-CZ"
    | "da-DK"
    | "fi-FI"
    | "lt-LT"
    | "ms-MY"
    | "nb-NO"
    | "ro-RO"
    | "el-GR"
    | "he-IL"
    | "hi-IN"
    | "hu-HU"
    | "sr-BA"
    | "sk-SK"
    | "sl-SI"
    | "sv-SE"
    | "tl-PH"
    | "th-TH"
    | "uk-UA"
    | "vi-VN";
  /** A note that you can use to add more details about the waiting room. */
  description?: string;
  /** Only available for the Waiting Room Advanced subscription. Disables automatic renewal of session cookies. If `true`, an accepted user will have session_duration minutes to browse the site. After that, */
  disableSessionRenewal?: boolean;
  /** A list of enabled origin commands. */
  enabledOriginCommands?: "revoke"[];
  /** The host name to which the waiting room will be applied (no wildcards). Please do not include the scheme (http:// or https://). The host and path combination must be unique. */
  host?: string;
  /** Only available for the Waiting Room Advanced subscription. If `true`, requests to the waiting room with the header `Accept: application/json` will receive a JSON response object with information on th */
  jsonResponseEnabled?: boolean;
  modifiedOn?: string;
  /** A unique name to identify the waiting room. Only alphanumeric characters, hyphens and underscores are allowed. */
  name?: string;
  /** Sets the number of new users that will be let into the route every minute. This value is used as baseline for the number of users that are let in per minute. So it is possible that there is a little m */
  newUsersPerMinute?: number;
  /** An ISO 8601 timestamp that marks when the next event will begin queueing. */
  nextEventPrequeueStartTime?: string | null;
  /** An ISO 8601 timestamp that marks when the next event will start. */
  nextEventStartTime?: string | null;
  /** Sets the path within the host to enable the waiting room on. The waiting room will be enabled for all subpaths as well. If there are two waiting rooms on the same subpath, the waiting room for the mos */
  path?: string;
  /** If queue_all is `true`, all the traffic that is coming to a route will be sent to the waiting room. No new traffic can get to the route once this field is set and estimated time will become unavailabl */
  queueAll?: boolean;
  /** Sets the queueing method used by the waiting room. Changing this parameter from the  default  queueing method is only available for the Waiting Room Advanced subscription. Regardless of the queueing m */
  queueingMethod?: "fifo" | "random" | "passthrough" | "reject";
  /** HTTP status code returned to a user while in the queue. */
  queueingStatusCode?: "200" | "202" | "429";
  /** Lifetime of a cookie (in minutes) set by Cloudflare for users who get access to the route. If a user is not seen by Cloudflare again in that time period, they will be treated as a new user that visits */
  sessionDuration?: number;
  /** Suspends or allows traffic going to the waiting room. If set to `true`, the traffic will not go to the waiting room. */
  suspended?: boolean;
  /** Sets the total number of active user sessions on the route at a point in time. A route is a combination of host and path on which a waiting room is available. This value is used as a baseline for the  */
  totalActiveUsers?: number;
  /** Which action to take when a bot is detected using Turnstile. `log` will have no impact on queueing behavior, simply keeping track of how many bots are detected in Waiting Room Analytics. `infinite_que */
  turnstileAction?: "log" | "infinite_queue";
  /** Which Turnstile widget type to use for detecting bot traffic. See [the Turnstile documentation](https://developers.cloudflare.com/turnstile/concepts/widget/#widget-types) for the definitions of these  */
  turnstileMode?:
    | "off"
    | "invisible"
    | "visible_non_interactive"
    | "visible_managed";
}

export const UpdateWaitingRoomResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  additionalRoutes: Schema.optional(
    Schema.Array(
      Schema.Struct({
        host: Schema.optional(Schema.String),
        path: Schema.optional(Schema.String),
      }),
    ),
  ),
  cookieAttributes: Schema.optional(
    Schema.Struct({
      samesite: Schema.optional(
        Schema.Literals(["auto", "lax", "none", "strict"]),
      ),
      secure: Schema.optional(Schema.Literals(["auto", "always", "never"])),
    }),
  ),
  cookieSuffix: Schema.optional(Schema.String),
  createdOn: Schema.optional(Schema.String),
  customPageHtml: Schema.optional(Schema.String),
  defaultTemplateLanguage: Schema.optional(
    Schema.Literals([
      "en-US",
      "es-ES",
      "de-DE",
      "fr-FR",
      "it-IT",
      "ja-JP",
      "ko-KR",
      "pt-BR",
      "zh-CN",
      "zh-TW",
      "nl-NL",
      "pl-PL",
      "id-ID",
      "tr-TR",
      "ar-EG",
      "ru-RU",
      "fa-IR",
      "bg-BG",
      "hr-HR",
      "cs-CZ",
      "da-DK",
      "fi-FI",
      "lt-LT",
      "ms-MY",
      "nb-NO",
      "ro-RO",
      "el-GR",
      "he-IL",
      "hi-IN",
      "hu-HU",
      "sr-BA",
      "sk-SK",
      "sl-SI",
      "sv-SE",
      "tl-PH",
      "th-TH",
      "uk-UA",
      "vi-VN",
    ]),
  ),
  description: Schema.optional(Schema.String),
  disableSessionRenewal: Schema.optional(Schema.Boolean),
  enabledOriginCommands: Schema.optional(
    Schema.Array(Schema.Literal("revoke")),
  ),
  host: Schema.optional(Schema.String),
  jsonResponseEnabled: Schema.optional(Schema.Boolean),
  modifiedOn: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  newUsersPerMinute: Schema.optional(Schema.Number),
  nextEventPrequeueStartTime: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  nextEventStartTime: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  path: Schema.optional(Schema.String),
  queueAll: Schema.optional(Schema.Boolean),
  queueingMethod: Schema.optional(
    Schema.Literals(["fifo", "random", "passthrough", "reject"]),
  ),
  queueingStatusCode: Schema.optional(Schema.Literals(["200", "202", "429"])),
  sessionDuration: Schema.optional(Schema.Number),
  suspended: Schema.optional(Schema.Boolean),
  totalActiveUsers: Schema.optional(Schema.Number),
  turnstileAction: Schema.optional(Schema.Literals(["log", "infinite_queue"])),
  turnstileMode: Schema.optional(
    Schema.Literals([
      "off",
      "invisible",
      "visible_non_interactive",
      "visible_managed",
    ]),
  ),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    additionalRoutes: "additional_routes",
    cookieAttributes: "cookie_attributes",
    cookieSuffix: "cookie_suffix",
    createdOn: "created_on",
    customPageHtml: "custom_page_html",
    defaultTemplateLanguage: "default_template_language",
    description: "description",
    disableSessionRenewal: "disable_session_renewal",
    enabledOriginCommands: "enabled_origin_commands",
    host: "host",
    jsonResponseEnabled: "json_response_enabled",
    modifiedOn: "modified_on",
    name: "name",
    newUsersPerMinute: "new_users_per_minute",
    nextEventPrequeueStartTime: "next_event_prequeue_start_time",
    nextEventStartTime: "next_event_start_time",
    path: "path",
    queueAll: "queue_all",
    queueingMethod: "queueing_method",
    queueingStatusCode: "queueing_status_code",
    sessionDuration: "session_duration",
    suspended: "suspended",
    totalActiveUsers: "total_active_users",
    turnstileAction: "turnstile_action",
    turnstileMode: "turnstile_mode",
  }),
) as unknown as Schema.Schema<UpdateWaitingRoomResponse>;

export type UpdateWaitingRoomError = CommonErrors;

export const updateWaitingRoom: API.OperationMethod<
  UpdateWaitingRoomRequest,
  UpdateWaitingRoomResponse,
  UpdateWaitingRoomError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateWaitingRoomRequest,
  output: UpdateWaitingRoomResponse,
  errors: [],
}));

export interface PatchWaitingRoomRequest {
  waitingRoomId: string;
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: The host name to which the waiting room will be applied (no wildcards). Please do not include the scheme (http:// or https://). The host and path combination must be unique. */
  host: string;
  /** Body param: A unique name to identify the waiting room. Only alphanumeric characters, hyphens and underscores are allowed. */
  name: string;
  /** Body param: Sets the number of new users that will be let into the route every minute. This value is used as baseline for the number of users that are let in per minute. So it is possible that there i */
  newUsersPerMinute: number;
  /** Body param: Sets the total number of active user sessions on the route at a point in time. A route is a combination of host and path on which a waiting room is available. This value is used as a basel */
  totalActiveUsers: number;
  /** Body param: Only available for the Waiting Room Advanced subscription. Additional hostname and path combinations to which this waiting room will be applied. There is an implied wildcard at the end of  */
  additionalRoutes?: { host?: string; path?: string }[];
  /** Body param: Configures cookie attributes for the waiting room cookie. This encrypted cookie stores a user's status in the waiting room, such as queue position. */
  cookieAttributes?: {
    samesite?: "auto" | "lax" | "none" | "strict";
    secure?: "auto" | "always" | "never";
  };
  /** Body param: Appends a '\_' + a custom suffix to the end of Cloudflare Waiting Room's cookie name(  cf_waitingroom). If `cookie_suffix` is "abcd", the cookie name will be `  cf_waitingroom_abcd`. This  */
  cookieSuffix?: string;
  /** Body param: Only available for the Waiting Room Advanced subscription. This is a template html file that will be rendered at the edge. If no custom_page_html is provided, the default waiting room will */
  customPageHtml?: string;
  /** Body param: The language of the default page template. If no default_template_language is provided, then `en-US` (English) will be used. */
  defaultTemplateLanguage?:
    | "en-US"
    | "es-ES"
    | "de-DE"
    | "fr-FR"
    | "it-IT"
    | "ja-JP"
    | "ko-KR"
    | "pt-BR"
    | "zh-CN"
    | "zh-TW"
    | "nl-NL"
    | "pl-PL"
    | "id-ID"
    | "tr-TR"
    | "ar-EG"
    | "ru-RU"
    | "fa-IR"
    | "bg-BG"
    | "hr-HR"
    | "cs-CZ"
    | "da-DK"
    | "fi-FI"
    | "lt-LT"
    | "ms-MY"
    | "nb-NO"
    | "ro-RO"
    | "el-GR"
    | "he-IL"
    | "hi-IN"
    | "hu-HU"
    | "sr-BA"
    | "sk-SK"
    | "sl-SI"
    | "sv-SE"
    | "tl-PH"
    | "th-TH"
    | "uk-UA"
    | "vi-VN";
  /** Body param: A note that you can use to add more details about the waiting room. */
  description?: string;
  /** Body param: Only available for the Waiting Room Advanced subscription. Disables automatic renewal of session cookies. If `true`, an accepted user will have session_duration minutes to browse the site. */
  disableSessionRenewal?: boolean;
  /** Body param: A list of enabled origin commands. */
  enabledOriginCommands?: "revoke"[];
  /** Body param: Only available for the Waiting Room Advanced subscription. If `true`, requests to the waiting room with the header `Accept: application/json` will receive a JSON response object with infor */
  jsonResponseEnabled?: boolean;
  /** Body param: Sets the path within the host to enable the waiting room on. The waiting room will be enabled for all subpaths as well. If there are two waiting rooms on the same subpath, the waiting room */
  path?: string;
  /** Body param: If queue_all is `true`, all the traffic that is coming to a route will be sent to the waiting room. No new traffic can get to the route once this field is set and estimated time will becom */
  queueAll?: boolean;
  /** Body param: Sets the queueing method used by the waiting room. Changing this parameter from the  default  queueing method is only available for the Waiting Room Advanced subscription. Regardless of th */
  queueingMethod?: "fifo" | "random" | "passthrough" | "reject";
  /** Body param: HTTP status code returned to a user while in the queue. */
  queueingStatusCode?: "200" | "202" | "429";
  /** Body param: Lifetime of a cookie (in minutes) set by Cloudflare for users who get access to the route. If a user is not seen by Cloudflare again in that time period, they will be treated as a new user */
  sessionDuration?: number;
  /** Body param: Suspends or allows traffic going to the waiting room. If set to `true`, the traffic will not go to the waiting room. */
  suspended?: boolean;
  /** Body param: Which action to take when a bot is detected using Turnstile. `log` will have no impact on queueing behavior, simply keeping track of how many bots are detected in Waiting Room Analytics. ` */
  turnstileAction?: "log" | "infinite_queue";
  /** Body param: Which Turnstile widget type to use for detecting bot traffic. See [the Turnstile documentation](https://developers.cloudflare.com/turnstile/concepts/widget/#widget-types) for the definitio */
  turnstileMode?:
    | "off"
    | "invisible"
    | "visible_non_interactive"
    | "visible_managed";
}

export const PatchWaitingRoomRequest = Schema.Struct({
  waitingRoomId: Schema.String.pipe(T.HttpPath("waitingRoomId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  host: Schema.String,
  name: Schema.String,
  newUsersPerMinute: Schema.Number,
  totalActiveUsers: Schema.Number,
  additionalRoutes: Schema.optional(
    Schema.Array(
      Schema.Struct({
        host: Schema.optional(Schema.String),
        path: Schema.optional(Schema.String),
      }),
    ),
  ),
  cookieAttributes: Schema.optional(
    Schema.Struct({
      samesite: Schema.optional(
        Schema.Literals(["auto", "lax", "none", "strict"]),
      ),
      secure: Schema.optional(Schema.Literals(["auto", "always", "never"])),
    }),
  ),
  cookieSuffix: Schema.optional(Schema.String),
  customPageHtml: Schema.optional(Schema.String),
  defaultTemplateLanguage: Schema.optional(
    Schema.Literals([
      "en-US",
      "es-ES",
      "de-DE",
      "fr-FR",
      "it-IT",
      "ja-JP",
      "ko-KR",
      "pt-BR",
      "zh-CN",
      "zh-TW",
      "nl-NL",
      "pl-PL",
      "id-ID",
      "tr-TR",
      "ar-EG",
      "ru-RU",
      "fa-IR",
      "bg-BG",
      "hr-HR",
      "cs-CZ",
      "da-DK",
      "fi-FI",
      "lt-LT",
      "ms-MY",
      "nb-NO",
      "ro-RO",
      "el-GR",
      "he-IL",
      "hi-IN",
      "hu-HU",
      "sr-BA",
      "sk-SK",
      "sl-SI",
      "sv-SE",
      "tl-PH",
      "th-TH",
      "uk-UA",
      "vi-VN",
    ]),
  ),
  description: Schema.optional(Schema.String),
  disableSessionRenewal: Schema.optional(Schema.Boolean),
  enabledOriginCommands: Schema.optional(
    Schema.Array(Schema.Literal("revoke")),
  ),
  jsonResponseEnabled: Schema.optional(Schema.Boolean),
  path: Schema.optional(Schema.String),
  queueAll: Schema.optional(Schema.Boolean),
  queueingMethod: Schema.optional(
    Schema.Literals(["fifo", "random", "passthrough", "reject"]),
  ),
  queueingStatusCode: Schema.optional(Schema.Literals(["200", "202", "429"])),
  sessionDuration: Schema.optional(Schema.Number),
  suspended: Schema.optional(Schema.Boolean),
  turnstileAction: Schema.optional(Schema.Literals(["log", "infinite_queue"])),
  turnstileMode: Schema.optional(
    Schema.Literals([
      "off",
      "invisible",
      "visible_non_interactive",
      "visible_managed",
    ]),
  ),
}).pipe(
  Schema.encodeKeys({
    host: "host",
    name: "name",
    newUsersPerMinute: "new_users_per_minute",
    totalActiveUsers: "total_active_users",
    additionalRoutes: "additional_routes",
    cookieAttributes: "cookie_attributes",
    cookieSuffix: "cookie_suffix",
    customPageHtml: "custom_page_html",
    defaultTemplateLanguage: "default_template_language",
    description: "description",
    disableSessionRenewal: "disable_session_renewal",
    enabledOriginCommands: "enabled_origin_commands",
    jsonResponseEnabled: "json_response_enabled",
    path: "path",
    queueAll: "queue_all",
    queueingMethod: "queueing_method",
    queueingStatusCode: "queueing_status_code",
    sessionDuration: "session_duration",
    suspended: "suspended",
    turnstileAction: "turnstile_action",
    turnstileMode: "turnstile_mode",
  }),
  T.Http({
    method: "PATCH",
    path: "/zones/{zone_id}/waiting_rooms/{waitingRoomId}",
  }),
) as unknown as Schema.Schema<PatchWaitingRoomRequest>;

export interface PatchWaitingRoomResponse {
  id?: string;
  /** Only available for the Waiting Room Advanced subscription. Additional hostname and path combinations to which this waiting room will be applied. There is an implied wildcard at the end of the path. Th */
  additionalRoutes?: { host?: string; path?: string }[];
  /** Configures cookie attributes for the waiting room cookie. This encrypted cookie stores a user's status in the waiting room, such as queue position. */
  cookieAttributes?: {
    samesite?: "auto" | "lax" | "none" | "strict";
    secure?: "auto" | "always" | "never";
  };
  /** Appends a '\_' + a custom suffix to the end of Cloudflare Waiting Room's cookie name(  cf_waitingroom). If `cookie_suffix` is "abcd", the cookie name will be `  cf_waitingroom_abcd`. This field is req */
  cookieSuffix?: string;
  createdOn?: string;
  /** Only available for the Waiting Room Advanced subscription. This is a template html file that will be rendered at the edge. If no custom_page_html is provided, the default waiting room will be used. Th */
  customPageHtml?: string;
  /** The language of the default page template. If no default_template_language is provided, then `en-US` (English) will be used. */
  defaultTemplateLanguage?:
    | "en-US"
    | "es-ES"
    | "de-DE"
    | "fr-FR"
    | "it-IT"
    | "ja-JP"
    | "ko-KR"
    | "pt-BR"
    | "zh-CN"
    | "zh-TW"
    | "nl-NL"
    | "pl-PL"
    | "id-ID"
    | "tr-TR"
    | "ar-EG"
    | "ru-RU"
    | "fa-IR"
    | "bg-BG"
    | "hr-HR"
    | "cs-CZ"
    | "da-DK"
    | "fi-FI"
    | "lt-LT"
    | "ms-MY"
    | "nb-NO"
    | "ro-RO"
    | "el-GR"
    | "he-IL"
    | "hi-IN"
    | "hu-HU"
    | "sr-BA"
    | "sk-SK"
    | "sl-SI"
    | "sv-SE"
    | "tl-PH"
    | "th-TH"
    | "uk-UA"
    | "vi-VN";
  /** A note that you can use to add more details about the waiting room. */
  description?: string;
  /** Only available for the Waiting Room Advanced subscription. Disables automatic renewal of session cookies. If `true`, an accepted user will have session_duration minutes to browse the site. After that, */
  disableSessionRenewal?: boolean;
  /** A list of enabled origin commands. */
  enabledOriginCommands?: "revoke"[];
  /** The host name to which the waiting room will be applied (no wildcards). Please do not include the scheme (http:// or https://). The host and path combination must be unique. */
  host?: string;
  /** Only available for the Waiting Room Advanced subscription. If `true`, requests to the waiting room with the header `Accept: application/json` will receive a JSON response object with information on th */
  jsonResponseEnabled?: boolean;
  modifiedOn?: string;
  /** A unique name to identify the waiting room. Only alphanumeric characters, hyphens and underscores are allowed. */
  name?: string;
  /** Sets the number of new users that will be let into the route every minute. This value is used as baseline for the number of users that are let in per minute. So it is possible that there is a little m */
  newUsersPerMinute?: number;
  /** An ISO 8601 timestamp that marks when the next event will begin queueing. */
  nextEventPrequeueStartTime?: string | null;
  /** An ISO 8601 timestamp that marks when the next event will start. */
  nextEventStartTime?: string | null;
  /** Sets the path within the host to enable the waiting room on. The waiting room will be enabled for all subpaths as well. If there are two waiting rooms on the same subpath, the waiting room for the mos */
  path?: string;
  /** If queue_all is `true`, all the traffic that is coming to a route will be sent to the waiting room. No new traffic can get to the route once this field is set and estimated time will become unavailabl */
  queueAll?: boolean;
  /** Sets the queueing method used by the waiting room. Changing this parameter from the  default  queueing method is only available for the Waiting Room Advanced subscription. Regardless of the queueing m */
  queueingMethod?: "fifo" | "random" | "passthrough" | "reject";
  /** HTTP status code returned to a user while in the queue. */
  queueingStatusCode?: "200" | "202" | "429";
  /** Lifetime of a cookie (in minutes) set by Cloudflare for users who get access to the route. If a user is not seen by Cloudflare again in that time period, they will be treated as a new user that visits */
  sessionDuration?: number;
  /** Suspends or allows traffic going to the waiting room. If set to `true`, the traffic will not go to the waiting room. */
  suspended?: boolean;
  /** Sets the total number of active user sessions on the route at a point in time. A route is a combination of host and path on which a waiting room is available. This value is used as a baseline for the  */
  totalActiveUsers?: number;
  /** Which action to take when a bot is detected using Turnstile. `log` will have no impact on queueing behavior, simply keeping track of how many bots are detected in Waiting Room Analytics. `infinite_que */
  turnstileAction?: "log" | "infinite_queue";
  /** Which Turnstile widget type to use for detecting bot traffic. See [the Turnstile documentation](https://developers.cloudflare.com/turnstile/concepts/widget/#widget-types) for the definitions of these  */
  turnstileMode?:
    | "off"
    | "invisible"
    | "visible_non_interactive"
    | "visible_managed";
}

export const PatchWaitingRoomResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  additionalRoutes: Schema.optional(
    Schema.Array(
      Schema.Struct({
        host: Schema.optional(Schema.String),
        path: Schema.optional(Schema.String),
      }),
    ),
  ),
  cookieAttributes: Schema.optional(
    Schema.Struct({
      samesite: Schema.optional(
        Schema.Literals(["auto", "lax", "none", "strict"]),
      ),
      secure: Schema.optional(Schema.Literals(["auto", "always", "never"])),
    }),
  ),
  cookieSuffix: Schema.optional(Schema.String),
  createdOn: Schema.optional(Schema.String),
  customPageHtml: Schema.optional(Schema.String),
  defaultTemplateLanguage: Schema.optional(
    Schema.Literals([
      "en-US",
      "es-ES",
      "de-DE",
      "fr-FR",
      "it-IT",
      "ja-JP",
      "ko-KR",
      "pt-BR",
      "zh-CN",
      "zh-TW",
      "nl-NL",
      "pl-PL",
      "id-ID",
      "tr-TR",
      "ar-EG",
      "ru-RU",
      "fa-IR",
      "bg-BG",
      "hr-HR",
      "cs-CZ",
      "da-DK",
      "fi-FI",
      "lt-LT",
      "ms-MY",
      "nb-NO",
      "ro-RO",
      "el-GR",
      "he-IL",
      "hi-IN",
      "hu-HU",
      "sr-BA",
      "sk-SK",
      "sl-SI",
      "sv-SE",
      "tl-PH",
      "th-TH",
      "uk-UA",
      "vi-VN",
    ]),
  ),
  description: Schema.optional(Schema.String),
  disableSessionRenewal: Schema.optional(Schema.Boolean),
  enabledOriginCommands: Schema.optional(
    Schema.Array(Schema.Literal("revoke")),
  ),
  host: Schema.optional(Schema.String),
  jsonResponseEnabled: Schema.optional(Schema.Boolean),
  modifiedOn: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  newUsersPerMinute: Schema.optional(Schema.Number),
  nextEventPrequeueStartTime: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  nextEventStartTime: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  path: Schema.optional(Schema.String),
  queueAll: Schema.optional(Schema.Boolean),
  queueingMethod: Schema.optional(
    Schema.Literals(["fifo", "random", "passthrough", "reject"]),
  ),
  queueingStatusCode: Schema.optional(Schema.Literals(["200", "202", "429"])),
  sessionDuration: Schema.optional(Schema.Number),
  suspended: Schema.optional(Schema.Boolean),
  totalActiveUsers: Schema.optional(Schema.Number),
  turnstileAction: Schema.optional(Schema.Literals(["log", "infinite_queue"])),
  turnstileMode: Schema.optional(
    Schema.Literals([
      "off",
      "invisible",
      "visible_non_interactive",
      "visible_managed",
    ]),
  ),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    additionalRoutes: "additional_routes",
    cookieAttributes: "cookie_attributes",
    cookieSuffix: "cookie_suffix",
    createdOn: "created_on",
    customPageHtml: "custom_page_html",
    defaultTemplateLanguage: "default_template_language",
    description: "description",
    disableSessionRenewal: "disable_session_renewal",
    enabledOriginCommands: "enabled_origin_commands",
    host: "host",
    jsonResponseEnabled: "json_response_enabled",
    modifiedOn: "modified_on",
    name: "name",
    newUsersPerMinute: "new_users_per_minute",
    nextEventPrequeueStartTime: "next_event_prequeue_start_time",
    nextEventStartTime: "next_event_start_time",
    path: "path",
    queueAll: "queue_all",
    queueingMethod: "queueing_method",
    queueingStatusCode: "queueing_status_code",
    sessionDuration: "session_duration",
    suspended: "suspended",
    totalActiveUsers: "total_active_users",
    turnstileAction: "turnstile_action",
    turnstileMode: "turnstile_mode",
  }),
) as unknown as Schema.Schema<PatchWaitingRoomResponse>;

export type PatchWaitingRoomError = CommonErrors;

export const patchWaitingRoom: API.OperationMethod<
  PatchWaitingRoomRequest,
  PatchWaitingRoomResponse,
  PatchWaitingRoomError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchWaitingRoomRequest,
  output: PatchWaitingRoomResponse,
  errors: [],
}));

export interface DeleteWaitingRoomRequest {
  waitingRoomId: string;
  /** Identifier. */
  zoneId: string;
}

export const DeleteWaitingRoomRequest = Schema.Struct({
  waitingRoomId: Schema.String.pipe(T.HttpPath("waitingRoomId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/zones/{zone_id}/waiting_rooms/{waitingRoomId}",
  }),
) as unknown as Schema.Schema<DeleteWaitingRoomRequest>;

export interface DeleteWaitingRoomResponse {
  id?: string;
}

export const DeleteWaitingRoomResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
}) as unknown as Schema.Schema<DeleteWaitingRoomResponse>;

export type DeleteWaitingRoomError = CommonErrors;

export const deleteWaitingRoom: API.OperationMethod<
  DeleteWaitingRoomRequest,
  DeleteWaitingRoomResponse,
  DeleteWaitingRoomError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteWaitingRoomRequest,
  output: DeleteWaitingRoomResponse,
  errors: [],
}));
