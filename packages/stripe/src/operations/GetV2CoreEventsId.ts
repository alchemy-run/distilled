import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetV2CoreEventsIdInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    id: Schema.String.pipe(T.PathParam()),
  },
).pipe(T.Http({ method: "GET", path: "/v2/core/events/{id}" }));
export type GetV2CoreEventsIdInput = typeof GetV2CoreEventsIdInput.Type;

// Output Schema
export const GetV2CoreEventsIdOutput =
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
export type GetV2CoreEventsIdOutput = typeof GetV2CoreEventsIdOutput.Type;

// The operation
/**
 * Retrieve an Event
 *
 * Retrieves the details of an event.
 *
 * @param id - Unique identifier for the object.
 */
export const GetV2CoreEventsId = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetV2CoreEventsIdInput,
  outputSchema: GetV2CoreEventsIdOutput,
}));
