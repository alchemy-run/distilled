import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetV2CoreEventsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  created: Schema.optional(Schema.String),
  limit: Schema.optional(Schema.Number),
  object_id: Schema.optional(Schema.String),
  types: Schema.optional(Schema.String),
}).pipe(T.Http({ method: "GET", path: "/v2/core/events" }));
export type GetV2CoreEventsInput = typeof GetV2CoreEventsInput.Type;

// Output Schema
export const GetV2CoreEventsOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  data: Schema.Array(
    Schema.Struct({
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
    }),
  ),
  next_page_url: Schema.NullOr(Schema.String),
  previous_page_url: Schema.NullOr(Schema.String),
});
export type GetV2CoreEventsOutput = typeof GetV2CoreEventsOutput.Type;

// The operation
/**
 * List Events
 *
 * List events, going back up to 30 days.
 *
 * @param created - Set of filters to query events within a range of `created` timestamps.
 * @param limit - The page size.
 * @param object_id - Primary object ID used to retrieve related events.
 * @param types - An array of up to 20 strings containing specific event names.
 */
export const GetV2CoreEvents = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetV2CoreEventsInput,
  outputSchema: GetV2CoreEventsOutput,
}));
