import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostV2CoreEventDestinationsIdPingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({ method: "POST", path: "/v2/core/event_destinations/{id}/ping" }),
  );
export type PostV2CoreEventDestinationsIdPingInput =
  typeof PostV2CoreEventDestinationsIdPingInput.Type;

// Output Schema
export const PostV2CoreEventDestinationsIdPingOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    changes: Schema.optional(Schema.Unknown),
    context: Schema.optional(Schema.String),
    created: Schema.String,
    id: Schema.String,
    livemode: Schema.Boolean,
    object: Schema.Literals(["v2.core.event"]),
    reason: Schema.optional(
      Schema.Struct({
        request: Schema.optional(
          Schema.Struct({
            id: Schema.String,
            idempotency_key: Schema.String,
          }),
        ),
        type: Schema.Literals(["request"]),
      }),
    ),
    type: Schema.String,
  });
export type PostV2CoreEventDestinationsIdPingOutput =
  typeof PostV2CoreEventDestinationsIdPingOutput.Type;

// The operation
/**
 * Ping an Event Destination
 *
 * Send a `ping` event to an event destination.
 *
 * @param id - Identifier for the event destination to ping.
 */
export const PostV2CoreEventDestinationsIdPing =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostV2CoreEventDestinationsIdPingInput,
    outputSchema: PostV2CoreEventDestinationsIdPingOutput,
  }));
