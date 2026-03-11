import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1UpdateRealtimeConfigInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
    private_only: Schema.optional(Schema.Boolean),
    connection_pool: Schema.optional(Schema.Number),
    max_concurrent_users: Schema.optional(Schema.Number),
    max_events_per_second: Schema.optional(Schema.Number),
    max_bytes_per_second: Schema.optional(Schema.Number),
    max_channels_per_client: Schema.optional(Schema.Number),
    max_joins_per_second: Schema.optional(Schema.Number),
    max_presence_events_per_second: Schema.optional(Schema.Number),
    max_payload_size_in_kb: Schema.optional(Schema.Number),
    suspend: Schema.optional(Schema.Boolean),
    presence_enabled: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({ method: "PATCH", path: "/v1/projects/{ref}/config/realtime" }),
  );
export type V1UpdateRealtimeConfigInput =
  typeof V1UpdateRealtimeConfigInput.Type;

// Output Schema
export const V1UpdateRealtimeConfigOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type V1UpdateRealtimeConfigOutput =
  typeof V1UpdateRealtimeConfigOutput.Type;

// The operation
/**
 * Updates realtime configuration
 *
 * @param ref - Project ref
 */
export const v1UpdateRealtimeConfig = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1UpdateRealtimeConfigInput,
    outputSchema: V1UpdateRealtimeConfigOutput,
  }),
);
