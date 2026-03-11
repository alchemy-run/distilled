/**
 * Cloudflare WAITING-ROOMS API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service waiting-rooms
 */

import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import type { Credentials } from "../credentials.ts";
import { type DefaultErrors } from "../errors.ts";

// =============================================================================
// Event
// =============================================================================

export interface GetEventRequest {
  waitingRoomId: string;
  eventId: string;
  /** Identifier. */
  zoneId: string;
}

export const GetEventRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  id?: string | null;
  createdOn?: string | null;
  /** If set, the event will override the waiting room's `custom_page_html` property while it is active. If null, the event will inherit it. */
  customPageHtml?: string | null;
  /** A note that you can use to add more details about the event. */
  description?: string | null;
  /** If set, the event will override the waiting room's `disable_session_renewal` property while it is active. If null, the event will inherit it. */
  disableSessionRenewal?: boolean | null;
  /** An ISO 8601 timestamp that marks the end of the event. */
  eventEndTime?: string | null;
  /** An ISO 8601 timestamp that marks the start of the event. At this time, queued users will be processed with the event's configuration. The start time must be at least one minute before `event_end_time` */
  eventStartTime?: string | null;
  modifiedOn?: string | null;
  /** A unique name to identify the event. Only alphanumeric characters, hyphens and underscores are allowed. */
  name?: string | null;
  /** If set, the event will override the waiting room's `new_users_per_minute` property while it is active. If null, the event will inherit it. This can only be set if the event's `total_active_users` prop */
  newUsersPerMinute?: number | null;
  /** An ISO 8601 timestamp that marks when to begin queueing all users before the event starts. The prequeue must start at least five minutes before `event_start_time`. */
  prequeueStartTime?: string | null;
  /** If set, the event will override the waiting room's `queueing_method` property while it is active. If null, the event will inherit it. */
  queueingMethod?: string | null;
  /** If set, the event will override the waiting room's `session_duration` property while it is active. If null, the event will inherit it. */
  sessionDuration?: number | null;
  /** If enabled, users in the prequeue will be shuffled randomly at the `event_start_time`. Requires that `prequeue_start_time` is not null. This is useful for situations when many users will join the even */
  shuffleAtEventStart?: boolean | null;
  /** Suspends or allows an event. If set to `true`, the event is ignored and traffic will be handled based on the waiting room configuration. */
  suspended?: boolean | null;
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

export const GetEventResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  customPageHtml: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  disableSessionRenewal: Schema.optional(
    Schema.Union([Schema.Boolean, Schema.Null]),
  ),
  eventEndTime: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  eventStartTime: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  newUsersPerMinute: Schema.optional(
    Schema.Union([Schema.Number, Schema.Null]),
  ),
  prequeueStartTime: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  queueingMethod: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  sessionDuration: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  shuffleAtEventStart: Schema.optional(
    Schema.Union([Schema.Boolean, Schema.Null]),
  ),
  suspended: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
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

export type GetEventError = DefaultErrors;

export const getEvent: API.OperationMethod<
  GetEventRequest,
  GetEventResponse,
  GetEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetEventRequest,
  output: GetEventResponse,
  errors: [],
}));

export interface ListEventsRequest {
  waitingRoomId: string;
  /** Path param: Identifier. */
  zoneId: string;
}

export const ListEventsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  waitingRoomId: Schema.String.pipe(T.HttpPath("waitingRoomId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/waiting_rooms/{waitingRoomId}/events",
  }),
) as unknown as Schema.Schema<ListEventsRequest>;

export type ListEventsResponse = {
  id?: string | null;
  createdOn?: string | null;
  customPageHtml?: string | null;
  description?: string | null;
  disableSessionRenewal?: boolean | null;
  eventEndTime?: string | null;
  eventStartTime?: string | null;
  modifiedOn?: string | null;
  name?: string | null;
  newUsersPerMinute?: number | null;
  prequeueStartTime?: string | null;
  queueingMethod?: string | null;
  sessionDuration?: number | null;
  shuffleAtEventStart?: boolean | null;
  suspended?: boolean | null;
  totalActiveUsers?: number | null;
  turnstileAction?: "log" | "infinite_queue" | null;
  turnstileMode?:
    | "off"
    | "invisible"
    | "visible_non_interactive"
    | "visible_managed"
    | null;
}[];

export const ListEventsResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    customPageHtml: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    disableSessionRenewal: Schema.optional(
      Schema.Union([Schema.Boolean, Schema.Null]),
    ),
    eventEndTime: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    eventStartTime: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
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
    shuffleAtEventStart: Schema.optional(
      Schema.Union([Schema.Boolean, Schema.Null]),
    ),
    suspended: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
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

export type ListEventsError = DefaultErrors;

export const listEvents: API.OperationMethod<
  ListEventsRequest,
  ListEventsResponse,
  ListEventsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const CreateEventRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  id?: string | null;
  createdOn?: string | null;
  /** If set, the event will override the waiting room's `custom_page_html` property while it is active. If null, the event will inherit it. */
  customPageHtml?: string | null;
  /** A note that you can use to add more details about the event. */
  description?: string | null;
  /** If set, the event will override the waiting room's `disable_session_renewal` property while it is active. If null, the event will inherit it. */
  disableSessionRenewal?: boolean | null;
  /** An ISO 8601 timestamp that marks the end of the event. */
  eventEndTime?: string | null;
  /** An ISO 8601 timestamp that marks the start of the event. At this time, queued users will be processed with the event's configuration. The start time must be at least one minute before `event_end_time` */
  eventStartTime?: string | null;
  modifiedOn?: string | null;
  /** A unique name to identify the event. Only alphanumeric characters, hyphens and underscores are allowed. */
  name?: string | null;
  /** If set, the event will override the waiting room's `new_users_per_minute` property while it is active. If null, the event will inherit it. This can only be set if the event's `total_active_users` prop */
  newUsersPerMinute?: number | null;
  /** An ISO 8601 timestamp that marks when to begin queueing all users before the event starts. The prequeue must start at least five minutes before `event_start_time`. */
  prequeueStartTime?: string | null;
  /** If set, the event will override the waiting room's `queueing_method` property while it is active. If null, the event will inherit it. */
  queueingMethod?: string | null;
  /** If set, the event will override the waiting room's `session_duration` property while it is active. If null, the event will inherit it. */
  sessionDuration?: number | null;
  /** If enabled, users in the prequeue will be shuffled randomly at the `event_start_time`. Requires that `prequeue_start_time` is not null. This is useful for situations when many users will join the even */
  shuffleAtEventStart?: boolean | null;
  /** Suspends or allows an event. If set to `true`, the event is ignored and traffic will be handled based on the waiting room configuration. */
  suspended?: boolean | null;
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

export const CreateEventResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  customPageHtml: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  disableSessionRenewal: Schema.optional(
    Schema.Union([Schema.Boolean, Schema.Null]),
  ),
  eventEndTime: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  eventStartTime: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  newUsersPerMinute: Schema.optional(
    Schema.Union([Schema.Number, Schema.Null]),
  ),
  prequeueStartTime: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  queueingMethod: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  sessionDuration: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  shuffleAtEventStart: Schema.optional(
    Schema.Union([Schema.Boolean, Schema.Null]),
  ),
  suspended: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
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

export type CreateEventError = DefaultErrors;

export const createEvent: API.OperationMethod<
  CreateEventRequest,
  CreateEventResponse,
  CreateEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const UpdateEventRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  id?: string | null;
  createdOn?: string | null;
  /** If set, the event will override the waiting room's `custom_page_html` property while it is active. If null, the event will inherit it. */
  customPageHtml?: string | null;
  /** A note that you can use to add more details about the event. */
  description?: string | null;
  /** If set, the event will override the waiting room's `disable_session_renewal` property while it is active. If null, the event will inherit it. */
  disableSessionRenewal?: boolean | null;
  /** An ISO 8601 timestamp that marks the end of the event. */
  eventEndTime?: string | null;
  /** An ISO 8601 timestamp that marks the start of the event. At this time, queued users will be processed with the event's configuration. The start time must be at least one minute before `event_end_time` */
  eventStartTime?: string | null;
  modifiedOn?: string | null;
  /** A unique name to identify the event. Only alphanumeric characters, hyphens and underscores are allowed. */
  name?: string | null;
  /** If set, the event will override the waiting room's `new_users_per_minute` property while it is active. If null, the event will inherit it. This can only be set if the event's `total_active_users` prop */
  newUsersPerMinute?: number | null;
  /** An ISO 8601 timestamp that marks when to begin queueing all users before the event starts. The prequeue must start at least five minutes before `event_start_time`. */
  prequeueStartTime?: string | null;
  /** If set, the event will override the waiting room's `queueing_method` property while it is active. If null, the event will inherit it. */
  queueingMethod?: string | null;
  /** If set, the event will override the waiting room's `session_duration` property while it is active. If null, the event will inherit it. */
  sessionDuration?: number | null;
  /** If enabled, users in the prequeue will be shuffled randomly at the `event_start_time`. Requires that `prequeue_start_time` is not null. This is useful for situations when many users will join the even */
  shuffleAtEventStart?: boolean | null;
  /** Suspends or allows an event. If set to `true`, the event is ignored and traffic will be handled based on the waiting room configuration. */
  suspended?: boolean | null;
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

export const UpdateEventResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  customPageHtml: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  disableSessionRenewal: Schema.optional(
    Schema.Union([Schema.Boolean, Schema.Null]),
  ),
  eventEndTime: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  eventStartTime: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  newUsersPerMinute: Schema.optional(
    Schema.Union([Schema.Number, Schema.Null]),
  ),
  prequeueStartTime: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  queueingMethod: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  sessionDuration: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  shuffleAtEventStart: Schema.optional(
    Schema.Union([Schema.Boolean, Schema.Null]),
  ),
  suspended: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
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

export type UpdateEventError = DefaultErrors;

export const updateEvent: API.OperationMethod<
  UpdateEventRequest,
  UpdateEventResponse,
  UpdateEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const PatchEventRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  id?: string | null;
  createdOn?: string | null;
  /** If set, the event will override the waiting room's `custom_page_html` property while it is active. If null, the event will inherit it. */
  customPageHtml?: string | null;
  /** A note that you can use to add more details about the event. */
  description?: string | null;
  /** If set, the event will override the waiting room's `disable_session_renewal` property while it is active. If null, the event will inherit it. */
  disableSessionRenewal?: boolean | null;
  /** An ISO 8601 timestamp that marks the end of the event. */
  eventEndTime?: string | null;
  /** An ISO 8601 timestamp that marks the start of the event. At this time, queued users will be processed with the event's configuration. The start time must be at least one minute before `event_end_time` */
  eventStartTime?: string | null;
  modifiedOn?: string | null;
  /** A unique name to identify the event. Only alphanumeric characters, hyphens and underscores are allowed. */
  name?: string | null;
  /** If set, the event will override the waiting room's `new_users_per_minute` property while it is active. If null, the event will inherit it. This can only be set if the event's `total_active_users` prop */
  newUsersPerMinute?: number | null;
  /** An ISO 8601 timestamp that marks when to begin queueing all users before the event starts. The prequeue must start at least five minutes before `event_start_time`. */
  prequeueStartTime?: string | null;
  /** If set, the event will override the waiting room's `queueing_method` property while it is active. If null, the event will inherit it. */
  queueingMethod?: string | null;
  /** If set, the event will override the waiting room's `session_duration` property while it is active. If null, the event will inherit it. */
  sessionDuration?: number | null;
  /** If enabled, users in the prequeue will be shuffled randomly at the `event_start_time`. Requires that `prequeue_start_time` is not null. This is useful for situations when many users will join the even */
  shuffleAtEventStart?: boolean | null;
  /** Suspends or allows an event. If set to `true`, the event is ignored and traffic will be handled based on the waiting room configuration. */
  suspended?: boolean | null;
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

export const PatchEventResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  customPageHtml: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  disableSessionRenewal: Schema.optional(
    Schema.Union([Schema.Boolean, Schema.Null]),
  ),
  eventEndTime: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  eventStartTime: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  newUsersPerMinute: Schema.optional(
    Schema.Union([Schema.Number, Schema.Null]),
  ),
  prequeueStartTime: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  queueingMethod: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  sessionDuration: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  shuffleAtEventStart: Schema.optional(
    Schema.Union([Schema.Boolean, Schema.Null]),
  ),
  suspended: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
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

export type PatchEventError = DefaultErrors;

export const patchEvent: API.OperationMethod<
  PatchEventRequest,
  PatchEventResponse,
  PatchEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const DeleteEventRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  id?: string | null;
}

export const DeleteEventResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}) as unknown as Schema.Schema<DeleteEventResponse>;

export type DeleteEventError = DefaultErrors;

export const deleteEvent: API.OperationMethod<
  DeleteEventRequest,
  DeleteEventResponse,
  DeleteEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const GetEventDetailRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  id?: string | null;
  createdOn?: string | null;
  customPageHtml?: string | null;
  /** A note that you can use to add more details about the event. */
  description?: string | null;
  disableSessionRenewal?: boolean | null;
  /** An ISO 8601 timestamp that marks the end of the event. */
  eventEndTime?: string | null;
  /** An ISO 8601 timestamp that marks the start of the event. At this time, queued users will be processed with the event's configuration. The start time must be at least one minute before `event_end_time` */
  eventStartTime?: string | null;
  modifiedOn?: string | null;
  /** A unique name to identify the event. Only alphanumeric characters, hyphens and underscores are allowed. */
  name?: string | null;
  newUsersPerMinute?: number | null;
  /** An ISO 8601 timestamp that marks when to begin queueing all users before the event starts. The prequeue must start at least five minutes before `event_start_time`. */
  prequeueStartTime?: string | null;
  queueingMethod?: string | null;
  sessionDuration?: number | null;
  /** If enabled, users in the prequeue will be shuffled randomly at the `event_start_time`. Requires that `prequeue_start_time` is not null. This is useful for situations when many users will join the even */
  shuffleAtEventStart?: boolean | null;
  /** Suspends or allows an event. If set to `true`, the event is ignored and traffic will be handled based on the waiting room configuration. */
  suspended?: boolean | null;
  totalActiveUsers?: number | null;
}

export const GetEventDetailResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    customPageHtml: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    disableSessionRenewal: Schema.optional(
      Schema.Union([Schema.Boolean, Schema.Null]),
    ),
    eventEndTime: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    eventStartTime: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
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
    shuffleAtEventStart: Schema.optional(
      Schema.Union([Schema.Boolean, Schema.Null]),
    ),
    suspended: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    totalActiveUsers: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
  },
).pipe(
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

export type GetEventDetailError = DefaultErrors;

export const getEventDetail: API.OperationMethod<
  GetEventDetailRequest,
  GetEventDetailResponse,
  GetEventDetailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const PreviewPageRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  customHtml: Schema.String,
}).pipe(
  Schema.encodeKeys({ customHtml: "custom_html" }),
  T.Http({ method: "POST", path: "/zones/{zone_id}/waiting_rooms/preview" }),
) as unknown as Schema.Schema<PreviewPageRequest>;

export interface PreviewPageResponse {
  /** URL where the custom waiting room page can temporarily be previewed. */
  previewUrl?: string | null;
}

export const PreviewPageResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  previewUrl: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}).pipe(
  Schema.encodeKeys({ previewUrl: "preview_url" }),
) as unknown as Schema.Schema<PreviewPageResponse>;

export type PreviewPageError = DefaultErrors;

export const previewPage: API.OperationMethod<
  PreviewPageRequest,
  PreviewPageResponse,
  PreviewPageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const GetRuleRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  waitingRoomId: Schema.String.pipe(T.HttpPath("waitingRoomId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/waiting_rooms/{waitingRoomId}/rules",
  }),
) as unknown as Schema.Schema<GetRuleRequest>;

export type GetRuleResponse = {
  id?: string | null;
  action?: "bypass_waiting_room" | null;
  description?: string | null;
  enabled?: boolean | null;
  expression?: string | null;
  lastUpdated?: string | null;
  version?: string | null;
}[];

export const GetRuleResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    action: Schema.optional(
      Schema.Union([Schema.Literal("bypass_waiting_room"), Schema.Null]),
    ),
    description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    lastUpdated: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    version: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
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

export type GetRuleError = DefaultErrors;

export const getRule: API.OperationMethod<
  GetRuleRequest,
  GetRuleResponse,
  GetRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const CreateRuleRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
    method: "POST",
    path: "/zones/{zone_id}/waiting_rooms/{waitingRoomId}/rules",
  }),
) as unknown as Schema.Schema<CreateRuleRequest>;

export type CreateRuleResponse = {
  id?: string | null;
  action?: "bypass_waiting_room" | null;
  description?: string | null;
  enabled?: boolean | null;
  expression?: string | null;
  lastUpdated?: string | null;
  version?: string | null;
}[];

export const CreateRuleResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    action: Schema.optional(
      Schema.Union([Schema.Literal("bypass_waiting_room"), Schema.Null]),
    ),
    description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    lastUpdated: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    version: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
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

export type CreateRuleError = DefaultErrors;

export const createRule: API.OperationMethod<
  CreateRuleRequest,
  CreateRuleResponse,
  CreateRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const UpdateRuleRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
    method: "PUT",
    path: "/zones/{zone_id}/waiting_rooms/{waitingRoomId}/rules",
  }),
) as unknown as Schema.Schema<UpdateRuleRequest>;

export type UpdateRuleResponse = {
  id?: string | null;
  action?: "bypass_waiting_room" | null;
  description?: string | null;
  enabled?: boolean | null;
  expression?: string | null;
  lastUpdated?: string | null;
  version?: string | null;
}[];

export const UpdateRuleResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    action: Schema.optional(
      Schema.Union([Schema.Literal("bypass_waiting_room"), Schema.Null]),
    ),
    description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    lastUpdated: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    version: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
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

export type UpdateRuleError = DefaultErrors;

export const updateRule: API.OperationMethod<
  UpdateRuleRequest,
  UpdateRuleResponse,
  UpdateRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateRuleRequest,
  output: UpdateRuleResponse,
  errors: [],
}));

export interface PatchRuleRequest {
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

export const PatchRuleRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
    method: "PATCH",
    path: "/zones/{zone_id}/waiting_rooms/{waitingRoomId}/rules/{ruleId}",
  }),
) as unknown as Schema.Schema<PatchRuleRequest>;

export type PatchRuleResponse = {
  id?: string | null;
  action?: "bypass_waiting_room" | null;
  description?: string | null;
  enabled?: boolean | null;
  expression?: string | null;
  lastUpdated?: string | null;
  version?: string | null;
}[];

export const PatchRuleResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    action: Schema.optional(
      Schema.Union([Schema.Literal("bypass_waiting_room"), Schema.Null]),
    ),
    description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    lastUpdated: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    version: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
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
) as unknown as Schema.Schema<PatchRuleResponse>;

export type PatchRuleError = DefaultErrors;

export const patchRule: API.OperationMethod<
  PatchRuleRequest,
  PatchRuleResponse,
  PatchRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchRuleRequest,
  output: PatchRuleResponse,
  errors: [],
}));

export interface DeleteRuleRequest {
  waitingRoomId: string;
  ruleId: string;
  /** Identifier. */
  zoneId: string;
}

export const DeleteRuleRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  waitingRoomId: Schema.String.pipe(T.HttpPath("waitingRoomId")),
  ruleId: Schema.String.pipe(T.HttpPath("ruleId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/zones/{zone_id}/waiting_rooms/{waitingRoomId}/rules/{ruleId}",
  }),
) as unknown as Schema.Schema<DeleteRuleRequest>;

export type DeleteRuleResponse = {
  id?: string | null;
  action?: "bypass_waiting_room" | null;
  description?: string | null;
  enabled?: boolean | null;
  expression?: string | null;
  lastUpdated?: string | null;
  version?: string | null;
}[];

export const DeleteRuleResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    action: Schema.optional(
      Schema.Union([Schema.Literal("bypass_waiting_room"), Schema.Null]),
    ),
    description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    lastUpdated: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    version: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
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

export type DeleteRuleError = DefaultErrors;

export const deleteRule: API.OperationMethod<
  DeleteRuleRequest,
  DeleteRuleResponse,
  DeleteRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteRuleRequest,
  output: DeleteRuleResponse,
  errors: [],
}));

// =============================================================================
// Setting
// =============================================================================

export interface GetSettingRequest {
  /** Identifier. */
  zoneId: string;
}

export const GetSettingRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/waiting_rooms/settings" }),
) as unknown as Schema.Schema<GetSettingRequest>;

export interface GetSettingResponse {
  /** Whether to allow verified search engine crawlers to bypass all waiting rooms on this zone. Verified search engine crawlers will not be tracked or counted by the waiting room system, and will not appea */
  searchEngineCrawlerBypass: boolean;
}

export const GetSettingResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  searchEngineCrawlerBypass: Schema.Boolean,
}).pipe(
  Schema.encodeKeys({
    searchEngineCrawlerBypass: "search_engine_crawler_bypass",
  }),
) as unknown as Schema.Schema<GetSettingResponse>;

export type GetSettingError = DefaultErrors;

export const getSetting: API.OperationMethod<
  GetSettingRequest,
  GetSettingResponse,
  GetSettingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const PutSettingRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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

export const PutSettingResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  searchEngineCrawlerBypass: Schema.Boolean,
}).pipe(
  Schema.encodeKeys({
    searchEngineCrawlerBypass: "search_engine_crawler_bypass",
  }),
) as unknown as Schema.Schema<PutSettingResponse>;

export type PutSettingError = DefaultErrors;

export const putSetting: API.OperationMethod<
  PutSettingRequest,
  PutSettingResponse,
  PutSettingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const PatchSettingRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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

export const PatchSettingResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  searchEngineCrawlerBypass: Schema.Boolean,
}).pipe(
  Schema.encodeKeys({
    searchEngineCrawlerBypass: "search_engine_crawler_bypass",
  }),
) as unknown as Schema.Schema<PatchSettingResponse>;

export type PatchSettingError = DefaultErrors;

export const patchSetting: API.OperationMethod<
  PatchSettingRequest,
  PatchSettingResponse,
  PatchSettingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const GetStatusRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  waitingRoomId: Schema.String.pipe(T.HttpPath("waitingRoomId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/waiting_rooms/{waitingRoomId}/status",
  }),
) as unknown as Schema.Schema<GetStatusRequest>;

export interface GetStatusResponse {
  estimatedQueuedUsers?: number | null;
  estimatedTotalActiveUsers?: number | null;
  eventId?: string | null;
  maxEstimatedTimeMinutes?: number | null;
  status?:
    | "event_prequeueing"
    | "not_queueing"
    | "queueing"
    | "suspended"
    | null;
}

export const GetStatusResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  estimatedQueuedUsers: Schema.optional(
    Schema.Union([Schema.Number, Schema.Null]),
  ),
  estimatedTotalActiveUsers: Schema.optional(
    Schema.Union([Schema.Number, Schema.Null]),
  ),
  eventId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  maxEstimatedTimeMinutes: Schema.optional(
    Schema.Union([Schema.Number, Schema.Null]),
  ),
  status: Schema.optional(
    Schema.Union([
      Schema.Literals([
        "event_prequeueing",
        "not_queueing",
        "queueing",
        "suspended",
      ]),
      Schema.Null,
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

export type GetStatusError = DefaultErrors;

export const getStatus: API.OperationMethod<
  GetStatusRequest,
  GetStatusResponse,
  GetStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const GetWaitingRoomRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  waitingRoomId: Schema.String.pipe(T.HttpPath("waitingRoomId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/waiting_rooms/{waitingRoomId}",
  }),
) as unknown as Schema.Schema<GetWaitingRoomRequest>;

export interface GetWaitingRoomResponse {
  id?: string | null;
  /** Only available for the Waiting Room Advanced subscription. Additional hostname and path combinations to which this waiting room will be applied. There is an implied wildcard at the end of the path. Th */
  additionalRoutes?: { host?: string | null; path?: string | null }[] | null;
  /** Configures cookie attributes for the waiting room cookie. This encrypted cookie stores a user's status in the waiting room, such as queue position. */
  cookieAttributes?: {
    samesite?: "auto" | "lax" | "none" | "strict" | null;
    secure?: "auto" | "always" | "never" | null;
  } | null;
  /** Appends a '\_' + a custom suffix to the end of Cloudflare Waiting Room's cookie name(  cf_waitingroom). If `cookie_suffix` is "abcd", the cookie name will be `  cf_waitingroom_abcd`. This field is req */
  cookieSuffix?: string | null;
  createdOn?: string | null;
  /** Only available for the Waiting Room Advanced subscription. This is a template html file that will be rendered at the edge. If no custom_page_html is provided, the default waiting room will be used. Th */
  customPageHtml?: string | null;
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
    | "vi-VN"
    | null;
  /** A note that you can use to add more details about the waiting room. */
  description?: string | null;
  /** Only available for the Waiting Room Advanced subscription. Disables automatic renewal of session cookies. If `true`, an accepted user will have session_duration minutes to browse the site. After that, */
  disableSessionRenewal?: boolean | null;
  /** A list of enabled origin commands. */
  enabledOriginCommands?: "revoke"[] | null;
  /** The host name to which the waiting room will be applied (no wildcards). Please do not include the scheme (http:// or https://). The host and path combination must be unique. */
  host?: string | null;
  /** Only available for the Waiting Room Advanced subscription. If `true`, requests to the waiting room with the header `Accept: application/json` will receive a JSON response object with information on th */
  jsonResponseEnabled?: boolean | null;
  modifiedOn?: string | null;
  /** A unique name to identify the waiting room. Only alphanumeric characters, hyphens and underscores are allowed. */
  name?: string | null;
  /** Sets the number of new users that will be let into the route every minute. This value is used as baseline for the number of users that are let in per minute. So it is possible that there is a little m */
  newUsersPerMinute?: number | null;
  /** An ISO 8601 timestamp that marks when the next event will begin queueing. */
  nextEventPrequeueStartTime?: string | null;
  /** An ISO 8601 timestamp that marks when the next event will start. */
  nextEventStartTime?: string | null;
  /** Sets the path within the host to enable the waiting room on. The waiting room will be enabled for all subpaths as well. If there are two waiting rooms on the same subpath, the waiting room for the mos */
  path?: string | null;
  /** If queue_all is `true`, all the traffic that is coming to a route will be sent to the waiting room. No new traffic can get to the route once this field is set and estimated time will become unavailabl */
  queueAll?: boolean | null;
  /** Sets the queueing method used by the waiting room. Changing this parameter from the  default  queueing method is only available for the Waiting Room Advanced subscription. Regardless of the queueing m */
  queueingMethod?: "fifo" | "random" | "passthrough" | "reject" | null;
  /** HTTP status code returned to a user while in the queue. */
  queueingStatusCode?: "200" | "202" | "429" | null;
  /** Lifetime of a cookie (in minutes) set by Cloudflare for users who get access to the route. If a user is not seen by Cloudflare again in that time period, they will be treated as a new user that visits */
  sessionDuration?: number | null;
  /** Suspends or allows traffic going to the waiting room. If set to `true`, the traffic will not go to the waiting room. */
  suspended?: boolean | null;
  /** Sets the total number of active user sessions on the route at a point in time. A route is a combination of host and path on which a waiting room is available. This value is used as a baseline for the  */
  totalActiveUsers?: number | null;
  /** Which action to take when a bot is detected using Turnstile. `log` will have no impact on queueing behavior, simply keeping track of how many bots are detected in Waiting Room Analytics. `infinite_que */
  turnstileAction?: "log" | "infinite_queue" | null;
  /** Which Turnstile widget type to use for detecting bot traffic. See [the Turnstile documentation](https://developers.cloudflare.com/turnstile/concepts/widget/#widget-types) for the definitions of these  */
  turnstileMode?:
    | "off"
    | "invisible"
    | "visible_non_interactive"
    | "visible_managed"
    | null;
}

export const GetWaitingRoomResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    additionalRoutes: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            host: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
            path: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          }),
        ),
        Schema.Null,
      ]),
    ),
    cookieAttributes: Schema.optional(
      Schema.Union([
        Schema.Struct({
          samesite: Schema.optional(
            Schema.Union([
              Schema.Literals(["auto", "lax", "none", "strict"]),
              Schema.Null,
            ]),
          ),
          secure: Schema.optional(
            Schema.Union([
              Schema.Literals(["auto", "always", "never"]),
              Schema.Null,
            ]),
          ),
        }),
        Schema.Null,
      ]),
    ),
    cookieSuffix: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    customPageHtml: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    defaultTemplateLanguage: Schema.optional(
      Schema.Union([
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
        Schema.Null,
      ]),
    ),
    description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    disableSessionRenewal: Schema.optional(
      Schema.Union([Schema.Boolean, Schema.Null]),
    ),
    enabledOriginCommands: Schema.optional(
      Schema.Union([Schema.Array(Schema.Literal("revoke")), Schema.Null]),
    ),
    host: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    jsonResponseEnabled: Schema.optional(
      Schema.Union([Schema.Boolean, Schema.Null]),
    ),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    newUsersPerMinute: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    nextEventPrequeueStartTime: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    nextEventStartTime: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    path: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    queueAll: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    queueingMethod: Schema.optional(
      Schema.Union([
        Schema.Literals(["fifo", "random", "passthrough", "reject"]),
        Schema.Null,
      ]),
    ),
    queueingStatusCode: Schema.optional(
      Schema.Union([Schema.Literals(["200", "202", "429"]), Schema.Null]),
    ),
    sessionDuration: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    suspended: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    totalActiveUsers: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    turnstileAction: Schema.optional(
      Schema.Union([Schema.Literals(["log", "infinite_queue"]), Schema.Null]),
    ),
    turnstileMode: Schema.optional(
      Schema.Union([
        Schema.Literals([
          "off",
          "invisible",
          "visible_non_interactive",
          "visible_managed",
        ]),
        Schema.Null,
      ]),
    ),
  },
).pipe(
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

export type GetWaitingRoomError = DefaultErrors;

export const getWaitingRoom: API.OperationMethod<
  GetWaitingRoomRequest,
  GetWaitingRoomResponse,
  GetWaitingRoomError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetWaitingRoomRequest,
  output: GetWaitingRoomResponse,
  errors: [],
}));

export interface ListWaitingRoomsRequest {}

export const ListWaitingRoomsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/{accountOrZone}/{accountOrZoneId}/waiting_rooms",
    }),
  ) as unknown as Schema.Schema<ListWaitingRoomsRequest>;

export type ListWaitingRoomsResponse = {
  id?: string | null;
  additionalRoutes?: { host?: string | null; path?: string | null }[] | null;
  cookieAttributes?: {
    samesite?: "auto" | "lax" | "none" | "strict" | null;
    secure?: "auto" | "always" | "never" | null;
  } | null;
  cookieSuffix?: string | null;
  createdOn?: string | null;
  customPageHtml?: string | null;
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
    | "vi-VN"
    | null;
  description?: string | null;
  disableSessionRenewal?: boolean | null;
  enabledOriginCommands?: "revoke"[] | null;
  host?: string | null;
  jsonResponseEnabled?: boolean | null;
  modifiedOn?: string | null;
  name?: string | null;
  newUsersPerMinute?: number | null;
  nextEventPrequeueStartTime?: string | null;
  nextEventStartTime?: string | null;
  path?: string | null;
  queueAll?: boolean | null;
  queueingMethod?: "fifo" | "random" | "passthrough" | "reject" | null;
  queueingStatusCode?: "200" | "202" | "429" | null;
  sessionDuration?: number | null;
  suspended?: boolean | null;
  totalActiveUsers?: number | null;
  turnstileAction?: "log" | "infinite_queue" | null;
  turnstileMode?:
    | "off"
    | "invisible"
    | "visible_non_interactive"
    | "visible_managed"
    | null;
}[];

export const ListWaitingRoomsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
    Schema.Struct({
      id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      additionalRoutes: Schema.optional(
        Schema.Union([
          Schema.Array(
            Schema.Struct({
              host: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
              path: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
            }),
          ),
          Schema.Null,
        ]),
      ),
      cookieAttributes: Schema.optional(
        Schema.Union([
          Schema.Struct({
            samesite: Schema.optional(
              Schema.Union([
                Schema.Literals(["auto", "lax", "none", "strict"]),
                Schema.Null,
              ]),
            ),
            secure: Schema.optional(
              Schema.Union([
                Schema.Literals(["auto", "always", "never"]),
                Schema.Null,
              ]),
            ),
          }),
          Schema.Null,
        ]),
      ),
      cookieSuffix: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      customPageHtml: Schema.optional(
        Schema.Union([Schema.String, Schema.Null]),
      ),
      defaultTemplateLanguage: Schema.optional(
        Schema.Union([
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
          Schema.Null,
        ]),
      ),
      description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      disableSessionRenewal: Schema.optional(
        Schema.Union([Schema.Boolean, Schema.Null]),
      ),
      enabledOriginCommands: Schema.optional(
        Schema.Union([Schema.Array(Schema.Literal("revoke")), Schema.Null]),
      ),
      host: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      jsonResponseEnabled: Schema.optional(
        Schema.Union([Schema.Boolean, Schema.Null]),
      ),
      modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      newUsersPerMinute: Schema.optional(
        Schema.Union([Schema.Number, Schema.Null]),
      ),
      nextEventPrequeueStartTime: Schema.optional(
        Schema.Union([Schema.String, Schema.Null]),
      ),
      nextEventStartTime: Schema.optional(
        Schema.Union([Schema.String, Schema.Null]),
      ),
      path: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      queueAll: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
      queueingMethod: Schema.optional(
        Schema.Union([
          Schema.Literals(["fifo", "random", "passthrough", "reject"]),
          Schema.Null,
        ]),
      ),
      queueingStatusCode: Schema.optional(
        Schema.Union([Schema.Literals(["200", "202", "429"]), Schema.Null]),
      ),
      sessionDuration: Schema.optional(
        Schema.Union([Schema.Number, Schema.Null]),
      ),
      suspended: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
      totalActiveUsers: Schema.optional(
        Schema.Union([Schema.Number, Schema.Null]),
      ),
      turnstileAction: Schema.optional(
        Schema.Union([Schema.Literals(["log", "infinite_queue"]), Schema.Null]),
      ),
      turnstileMode: Schema.optional(
        Schema.Union([
          Schema.Literals([
            "off",
            "invisible",
            "visible_non_interactive",
            "visible_managed",
          ]),
          Schema.Null,
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

export type ListWaitingRoomsError = DefaultErrors;

export const listWaitingRooms: API.OperationMethod<
  ListWaitingRoomsRequest,
  ListWaitingRoomsResponse,
  ListWaitingRoomsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const CreateWaitingRoomRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  id?: string | null;
  /** Only available for the Waiting Room Advanced subscription. Additional hostname and path combinations to which this waiting room will be applied. There is an implied wildcard at the end of the path. Th */
  additionalRoutes?: { host?: string | null; path?: string | null }[] | null;
  /** Configures cookie attributes for the waiting room cookie. This encrypted cookie stores a user's status in the waiting room, such as queue position. */
  cookieAttributes?: {
    samesite?: "auto" | "lax" | "none" | "strict" | null;
    secure?: "auto" | "always" | "never" | null;
  } | null;
  /** Appends a '\_' + a custom suffix to the end of Cloudflare Waiting Room's cookie name(  cf_waitingroom). If `cookie_suffix` is "abcd", the cookie name will be `  cf_waitingroom_abcd`. This field is req */
  cookieSuffix?: string | null;
  createdOn?: string | null;
  /** Only available for the Waiting Room Advanced subscription. This is a template html file that will be rendered at the edge. If no custom_page_html is provided, the default waiting room will be used. Th */
  customPageHtml?: string | null;
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
    | "vi-VN"
    | null;
  /** A note that you can use to add more details about the waiting room. */
  description?: string | null;
  /** Only available for the Waiting Room Advanced subscription. Disables automatic renewal of session cookies. If `true`, an accepted user will have session_duration minutes to browse the site. After that, */
  disableSessionRenewal?: boolean | null;
  /** A list of enabled origin commands. */
  enabledOriginCommands?: "revoke"[] | null;
  /** The host name to which the waiting room will be applied (no wildcards). Please do not include the scheme (http:// or https://). The host and path combination must be unique. */
  host?: string | null;
  /** Only available for the Waiting Room Advanced subscription. If `true`, requests to the waiting room with the header `Accept: application/json` will receive a JSON response object with information on th */
  jsonResponseEnabled?: boolean | null;
  modifiedOn?: string | null;
  /** A unique name to identify the waiting room. Only alphanumeric characters, hyphens and underscores are allowed. */
  name?: string | null;
  /** Sets the number of new users that will be let into the route every minute. This value is used as baseline for the number of users that are let in per minute. So it is possible that there is a little m */
  newUsersPerMinute?: number | null;
  /** An ISO 8601 timestamp that marks when the next event will begin queueing. */
  nextEventPrequeueStartTime?: string | null;
  /** An ISO 8601 timestamp that marks when the next event will start. */
  nextEventStartTime?: string | null;
  /** Sets the path within the host to enable the waiting room on. The waiting room will be enabled for all subpaths as well. If there are two waiting rooms on the same subpath, the waiting room for the mos */
  path?: string | null;
  /** If queue_all is `true`, all the traffic that is coming to a route will be sent to the waiting room. No new traffic can get to the route once this field is set and estimated time will become unavailabl */
  queueAll?: boolean | null;
  /** Sets the queueing method used by the waiting room. Changing this parameter from the  default  queueing method is only available for the Waiting Room Advanced subscription. Regardless of the queueing m */
  queueingMethod?: "fifo" | "random" | "passthrough" | "reject" | null;
  /** HTTP status code returned to a user while in the queue. */
  queueingStatusCode?: "200" | "202" | "429" | null;
  /** Lifetime of a cookie (in minutes) set by Cloudflare for users who get access to the route. If a user is not seen by Cloudflare again in that time period, they will be treated as a new user that visits */
  sessionDuration?: number | null;
  /** Suspends or allows traffic going to the waiting room. If set to `true`, the traffic will not go to the waiting room. */
  suspended?: boolean | null;
  /** Sets the total number of active user sessions on the route at a point in time. A route is a combination of host and path on which a waiting room is available. This value is used as a baseline for the  */
  totalActiveUsers?: number | null;
  /** Which action to take when a bot is detected using Turnstile. `log` will have no impact on queueing behavior, simply keeping track of how many bots are detected in Waiting Room Analytics. `infinite_que */
  turnstileAction?: "log" | "infinite_queue" | null;
  /** Which Turnstile widget type to use for detecting bot traffic. See [the Turnstile documentation](https://developers.cloudflare.com/turnstile/concepts/widget/#widget-types) for the definitions of these  */
  turnstileMode?:
    | "off"
    | "invisible"
    | "visible_non_interactive"
    | "visible_managed"
    | null;
}

export const CreateWaitingRoomResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    additionalRoutes: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            host: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
            path: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          }),
        ),
        Schema.Null,
      ]),
    ),
    cookieAttributes: Schema.optional(
      Schema.Union([
        Schema.Struct({
          samesite: Schema.optional(
            Schema.Union([
              Schema.Literals(["auto", "lax", "none", "strict"]),
              Schema.Null,
            ]),
          ),
          secure: Schema.optional(
            Schema.Union([
              Schema.Literals(["auto", "always", "never"]),
              Schema.Null,
            ]),
          ),
        }),
        Schema.Null,
      ]),
    ),
    cookieSuffix: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    customPageHtml: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    defaultTemplateLanguage: Schema.optional(
      Schema.Union([
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
        Schema.Null,
      ]),
    ),
    description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    disableSessionRenewal: Schema.optional(
      Schema.Union([Schema.Boolean, Schema.Null]),
    ),
    enabledOriginCommands: Schema.optional(
      Schema.Union([Schema.Array(Schema.Literal("revoke")), Schema.Null]),
    ),
    host: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    jsonResponseEnabled: Schema.optional(
      Schema.Union([Schema.Boolean, Schema.Null]),
    ),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    newUsersPerMinute: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    nextEventPrequeueStartTime: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    nextEventStartTime: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    path: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    queueAll: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    queueingMethod: Schema.optional(
      Schema.Union([
        Schema.Literals(["fifo", "random", "passthrough", "reject"]),
        Schema.Null,
      ]),
    ),
    queueingStatusCode: Schema.optional(
      Schema.Union([Schema.Literals(["200", "202", "429"]), Schema.Null]),
    ),
    sessionDuration: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    suspended: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    totalActiveUsers: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    turnstileAction: Schema.optional(
      Schema.Union([Schema.Literals(["log", "infinite_queue"]), Schema.Null]),
    ),
    turnstileMode: Schema.optional(
      Schema.Union([
        Schema.Literals([
          "off",
          "invisible",
          "visible_non_interactive",
          "visible_managed",
        ]),
        Schema.Null,
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

export type CreateWaitingRoomError = DefaultErrors;

export const createWaitingRoom: API.OperationMethod<
  CreateWaitingRoomRequest,
  CreateWaitingRoomResponse,
  CreateWaitingRoomError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const UpdateWaitingRoomRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  id?: string | null;
  /** Only available for the Waiting Room Advanced subscription. Additional hostname and path combinations to which this waiting room will be applied. There is an implied wildcard at the end of the path. Th */
  additionalRoutes?: { host?: string | null; path?: string | null }[] | null;
  /** Configures cookie attributes for the waiting room cookie. This encrypted cookie stores a user's status in the waiting room, such as queue position. */
  cookieAttributes?: {
    samesite?: "auto" | "lax" | "none" | "strict" | null;
    secure?: "auto" | "always" | "never" | null;
  } | null;
  /** Appends a '\_' + a custom suffix to the end of Cloudflare Waiting Room's cookie name(  cf_waitingroom). If `cookie_suffix` is "abcd", the cookie name will be `  cf_waitingroom_abcd`. This field is req */
  cookieSuffix?: string | null;
  createdOn?: string | null;
  /** Only available for the Waiting Room Advanced subscription. This is a template html file that will be rendered at the edge. If no custom_page_html is provided, the default waiting room will be used. Th */
  customPageHtml?: string | null;
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
    | "vi-VN"
    | null;
  /** A note that you can use to add more details about the waiting room. */
  description?: string | null;
  /** Only available for the Waiting Room Advanced subscription. Disables automatic renewal of session cookies. If `true`, an accepted user will have session_duration minutes to browse the site. After that, */
  disableSessionRenewal?: boolean | null;
  /** A list of enabled origin commands. */
  enabledOriginCommands?: "revoke"[] | null;
  /** The host name to which the waiting room will be applied (no wildcards). Please do not include the scheme (http:// or https://). The host and path combination must be unique. */
  host?: string | null;
  /** Only available for the Waiting Room Advanced subscription. If `true`, requests to the waiting room with the header `Accept: application/json` will receive a JSON response object with information on th */
  jsonResponseEnabled?: boolean | null;
  modifiedOn?: string | null;
  /** A unique name to identify the waiting room. Only alphanumeric characters, hyphens and underscores are allowed. */
  name?: string | null;
  /** Sets the number of new users that will be let into the route every minute. This value is used as baseline for the number of users that are let in per minute. So it is possible that there is a little m */
  newUsersPerMinute?: number | null;
  /** An ISO 8601 timestamp that marks when the next event will begin queueing. */
  nextEventPrequeueStartTime?: string | null;
  /** An ISO 8601 timestamp that marks when the next event will start. */
  nextEventStartTime?: string | null;
  /** Sets the path within the host to enable the waiting room on. The waiting room will be enabled for all subpaths as well. If there are two waiting rooms on the same subpath, the waiting room for the mos */
  path?: string | null;
  /** If queue_all is `true`, all the traffic that is coming to a route will be sent to the waiting room. No new traffic can get to the route once this field is set and estimated time will become unavailabl */
  queueAll?: boolean | null;
  /** Sets the queueing method used by the waiting room. Changing this parameter from the  default  queueing method is only available for the Waiting Room Advanced subscription. Regardless of the queueing m */
  queueingMethod?: "fifo" | "random" | "passthrough" | "reject" | null;
  /** HTTP status code returned to a user while in the queue. */
  queueingStatusCode?: "200" | "202" | "429" | null;
  /** Lifetime of a cookie (in minutes) set by Cloudflare for users who get access to the route. If a user is not seen by Cloudflare again in that time period, they will be treated as a new user that visits */
  sessionDuration?: number | null;
  /** Suspends or allows traffic going to the waiting room. If set to `true`, the traffic will not go to the waiting room. */
  suspended?: boolean | null;
  /** Sets the total number of active user sessions on the route at a point in time. A route is a combination of host and path on which a waiting room is available. This value is used as a baseline for the  */
  totalActiveUsers?: number | null;
  /** Which action to take when a bot is detected using Turnstile. `log` will have no impact on queueing behavior, simply keeping track of how many bots are detected in Waiting Room Analytics. `infinite_que */
  turnstileAction?: "log" | "infinite_queue" | null;
  /** Which Turnstile widget type to use for detecting bot traffic. See [the Turnstile documentation](https://developers.cloudflare.com/turnstile/concepts/widget/#widget-types) for the definitions of these  */
  turnstileMode?:
    | "off"
    | "invisible"
    | "visible_non_interactive"
    | "visible_managed"
    | null;
}

export const UpdateWaitingRoomResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    additionalRoutes: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            host: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
            path: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          }),
        ),
        Schema.Null,
      ]),
    ),
    cookieAttributes: Schema.optional(
      Schema.Union([
        Schema.Struct({
          samesite: Schema.optional(
            Schema.Union([
              Schema.Literals(["auto", "lax", "none", "strict"]),
              Schema.Null,
            ]),
          ),
          secure: Schema.optional(
            Schema.Union([
              Schema.Literals(["auto", "always", "never"]),
              Schema.Null,
            ]),
          ),
        }),
        Schema.Null,
      ]),
    ),
    cookieSuffix: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    customPageHtml: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    defaultTemplateLanguage: Schema.optional(
      Schema.Union([
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
        Schema.Null,
      ]),
    ),
    description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    disableSessionRenewal: Schema.optional(
      Schema.Union([Schema.Boolean, Schema.Null]),
    ),
    enabledOriginCommands: Schema.optional(
      Schema.Union([Schema.Array(Schema.Literal("revoke")), Schema.Null]),
    ),
    host: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    jsonResponseEnabled: Schema.optional(
      Schema.Union([Schema.Boolean, Schema.Null]),
    ),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    newUsersPerMinute: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    nextEventPrequeueStartTime: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    nextEventStartTime: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    path: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    queueAll: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    queueingMethod: Schema.optional(
      Schema.Union([
        Schema.Literals(["fifo", "random", "passthrough", "reject"]),
        Schema.Null,
      ]),
    ),
    queueingStatusCode: Schema.optional(
      Schema.Union([Schema.Literals(["200", "202", "429"]), Schema.Null]),
    ),
    sessionDuration: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    suspended: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    totalActiveUsers: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    turnstileAction: Schema.optional(
      Schema.Union([Schema.Literals(["log", "infinite_queue"]), Schema.Null]),
    ),
    turnstileMode: Schema.optional(
      Schema.Union([
        Schema.Literals([
          "off",
          "invisible",
          "visible_non_interactive",
          "visible_managed",
        ]),
        Schema.Null,
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

export type UpdateWaitingRoomError = DefaultErrors;

export const updateWaitingRoom: API.OperationMethod<
  UpdateWaitingRoomRequest,
  UpdateWaitingRoomResponse,
  UpdateWaitingRoomError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const PatchWaitingRoomRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  id?: string | null;
  /** Only available for the Waiting Room Advanced subscription. Additional hostname and path combinations to which this waiting room will be applied. There is an implied wildcard at the end of the path. Th */
  additionalRoutes?: { host?: string | null; path?: string | null }[] | null;
  /** Configures cookie attributes for the waiting room cookie. This encrypted cookie stores a user's status in the waiting room, such as queue position. */
  cookieAttributes?: {
    samesite?: "auto" | "lax" | "none" | "strict" | null;
    secure?: "auto" | "always" | "never" | null;
  } | null;
  /** Appends a '\_' + a custom suffix to the end of Cloudflare Waiting Room's cookie name(  cf_waitingroom). If `cookie_suffix` is "abcd", the cookie name will be `  cf_waitingroom_abcd`. This field is req */
  cookieSuffix?: string | null;
  createdOn?: string | null;
  /** Only available for the Waiting Room Advanced subscription. This is a template html file that will be rendered at the edge. If no custom_page_html is provided, the default waiting room will be used. Th */
  customPageHtml?: string | null;
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
    | "vi-VN"
    | null;
  /** A note that you can use to add more details about the waiting room. */
  description?: string | null;
  /** Only available for the Waiting Room Advanced subscription. Disables automatic renewal of session cookies. If `true`, an accepted user will have session_duration minutes to browse the site. After that, */
  disableSessionRenewal?: boolean | null;
  /** A list of enabled origin commands. */
  enabledOriginCommands?: "revoke"[] | null;
  /** The host name to which the waiting room will be applied (no wildcards). Please do not include the scheme (http:// or https://). The host and path combination must be unique. */
  host?: string | null;
  /** Only available for the Waiting Room Advanced subscription. If `true`, requests to the waiting room with the header `Accept: application/json` will receive a JSON response object with information on th */
  jsonResponseEnabled?: boolean | null;
  modifiedOn?: string | null;
  /** A unique name to identify the waiting room. Only alphanumeric characters, hyphens and underscores are allowed. */
  name?: string | null;
  /** Sets the number of new users that will be let into the route every minute. This value is used as baseline for the number of users that are let in per minute. So it is possible that there is a little m */
  newUsersPerMinute?: number | null;
  /** An ISO 8601 timestamp that marks when the next event will begin queueing. */
  nextEventPrequeueStartTime?: string | null;
  /** An ISO 8601 timestamp that marks when the next event will start. */
  nextEventStartTime?: string | null;
  /** Sets the path within the host to enable the waiting room on. The waiting room will be enabled for all subpaths as well. If there are two waiting rooms on the same subpath, the waiting room for the mos */
  path?: string | null;
  /** If queue_all is `true`, all the traffic that is coming to a route will be sent to the waiting room. No new traffic can get to the route once this field is set and estimated time will become unavailabl */
  queueAll?: boolean | null;
  /** Sets the queueing method used by the waiting room. Changing this parameter from the  default  queueing method is only available for the Waiting Room Advanced subscription. Regardless of the queueing m */
  queueingMethod?: "fifo" | "random" | "passthrough" | "reject" | null;
  /** HTTP status code returned to a user while in the queue. */
  queueingStatusCode?: "200" | "202" | "429" | null;
  /** Lifetime of a cookie (in minutes) set by Cloudflare for users who get access to the route. If a user is not seen by Cloudflare again in that time period, they will be treated as a new user that visits */
  sessionDuration?: number | null;
  /** Suspends or allows traffic going to the waiting room. If set to `true`, the traffic will not go to the waiting room. */
  suspended?: boolean | null;
  /** Sets the total number of active user sessions on the route at a point in time. A route is a combination of host and path on which a waiting room is available. This value is used as a baseline for the  */
  totalActiveUsers?: number | null;
  /** Which action to take when a bot is detected using Turnstile. `log` will have no impact on queueing behavior, simply keeping track of how many bots are detected in Waiting Room Analytics. `infinite_que */
  turnstileAction?: "log" | "infinite_queue" | null;
  /** Which Turnstile widget type to use for detecting bot traffic. See [the Turnstile documentation](https://developers.cloudflare.com/turnstile/concepts/widget/#widget-types) for the definitions of these  */
  turnstileMode?:
    | "off"
    | "invisible"
    | "visible_non_interactive"
    | "visible_managed"
    | null;
}

export const PatchWaitingRoomResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    additionalRoutes: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            host: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
            path: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          }),
        ),
        Schema.Null,
      ]),
    ),
    cookieAttributes: Schema.optional(
      Schema.Union([
        Schema.Struct({
          samesite: Schema.optional(
            Schema.Union([
              Schema.Literals(["auto", "lax", "none", "strict"]),
              Schema.Null,
            ]),
          ),
          secure: Schema.optional(
            Schema.Union([
              Schema.Literals(["auto", "always", "never"]),
              Schema.Null,
            ]),
          ),
        }),
        Schema.Null,
      ]),
    ),
    cookieSuffix: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    customPageHtml: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    defaultTemplateLanguage: Schema.optional(
      Schema.Union([
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
        Schema.Null,
      ]),
    ),
    description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    disableSessionRenewal: Schema.optional(
      Schema.Union([Schema.Boolean, Schema.Null]),
    ),
    enabledOriginCommands: Schema.optional(
      Schema.Union([Schema.Array(Schema.Literal("revoke")), Schema.Null]),
    ),
    host: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    jsonResponseEnabled: Schema.optional(
      Schema.Union([Schema.Boolean, Schema.Null]),
    ),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    newUsersPerMinute: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    nextEventPrequeueStartTime: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    nextEventStartTime: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    path: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    queueAll: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    queueingMethod: Schema.optional(
      Schema.Union([
        Schema.Literals(["fifo", "random", "passthrough", "reject"]),
        Schema.Null,
      ]),
    ),
    queueingStatusCode: Schema.optional(
      Schema.Union([Schema.Literals(["200", "202", "429"]), Schema.Null]),
    ),
    sessionDuration: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    suspended: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    totalActiveUsers: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    turnstileAction: Schema.optional(
      Schema.Union([Schema.Literals(["log", "infinite_queue"]), Schema.Null]),
    ),
    turnstileMode: Schema.optional(
      Schema.Union([
        Schema.Literals([
          "off",
          "invisible",
          "visible_non_interactive",
          "visible_managed",
        ]),
        Schema.Null,
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

export type PatchWaitingRoomError = DefaultErrors;

export const patchWaitingRoom: API.OperationMethod<
  PatchWaitingRoomRequest,
  PatchWaitingRoomResponse,
  PatchWaitingRoomError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchWaitingRoomRequest,
  output: PatchWaitingRoomResponse,
  errors: [],
}));

export interface DeleteWaitingRoomRequest {
  waitingRoomId: string;
  /** Identifier. */
  zoneId: string;
}

export const DeleteWaitingRoomRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    waitingRoomId: Schema.String.pipe(T.HttpPath("waitingRoomId")),
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/zones/{zone_id}/waiting_rooms/{waitingRoomId}",
    }),
  ) as unknown as Schema.Schema<DeleteWaitingRoomRequest>;

export interface DeleteWaitingRoomResponse {
  id?: string | null;
}

export const DeleteWaitingRoomResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }) as unknown as Schema.Schema<DeleteWaitingRoomResponse>;

export type DeleteWaitingRoomError = DefaultErrors;

export const deleteWaitingRoom: API.OperationMethod<
  DeleteWaitingRoomRequest,
  DeleteWaitingRoomResponse,
  DeleteWaitingRoomError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteWaitingRoomRequest,
  output: DeleteWaitingRoomResponse,
  errors: [],
}));
