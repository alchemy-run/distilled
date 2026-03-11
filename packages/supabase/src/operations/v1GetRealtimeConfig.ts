import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1GetRealtimeConfigInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({ method: "GET", path: "/v1/projects/{ref}/config/realtime" }),
  );
export type V1GetRealtimeConfigInput = typeof V1GetRealtimeConfigInput.Type;

// Output Schema
export const V1GetRealtimeConfigOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    private_only: Schema.NullOr(Schema.Boolean),
    connection_pool: Schema.NullOr(Schema.Number),
    max_concurrent_users: Schema.NullOr(Schema.Number),
    max_events_per_second: Schema.NullOr(Schema.Number),
    max_bytes_per_second: Schema.NullOr(Schema.Number),
    max_channels_per_client: Schema.NullOr(Schema.Number),
    max_joins_per_second: Schema.NullOr(Schema.Number),
    max_presence_events_per_second: Schema.NullOr(Schema.Number),
    max_payload_size_in_kb: Schema.NullOr(Schema.Number),
    suspend: Schema.NullOr(Schema.Boolean),
    presence_enabled: Schema.Boolean,
  });
export type V1GetRealtimeConfigOutput = typeof V1GetRealtimeConfigOutput.Type;

// The operation
/**
 * Gets realtime configuration
 *
 * @param ref - Project ref
 */
export const v1GetRealtimeConfig = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1GetRealtimeConfigInput,
  outputSchema: V1GetRealtimeConfigOutput,
}));
