import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1ShutdownRealtimeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/projects/{ref}/config/realtime/shutdown",
    }),
  );
export type V1ShutdownRealtimeInput = typeof V1ShutdownRealtimeInput.Type;

// Output Schema
export const V1ShutdownRealtimeOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type V1ShutdownRealtimeOutput = typeof V1ShutdownRealtimeOutput.Type;

// The operation
/**
 * Shutdowns realtime connections for a project
 *
 * @param ref - Project ref
 */
export const v1ShutdownRealtime = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1ShutdownRealtimeInput,
  outputSchema: V1ShutdownRealtimeOutput,
}));
