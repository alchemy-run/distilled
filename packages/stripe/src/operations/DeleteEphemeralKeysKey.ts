import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteEphemeralKeysKeyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    key: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.Array(Schema.String)),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/v1/ephemeral_keys/{key}",
      contentType: "form-urlencoded",
    }),
  );
export type DeleteEphemeralKeysKeyInput =
  typeof DeleteEphemeralKeysKeyInput.Type;

// Output Schema
export const DeleteEphemeralKeysKeyOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    created: Schema.Number,
    expires: Schema.Number,
    id: Schema.String,
    livemode: Schema.Boolean,
    object: Schema.Literals(["ephemeral_key"]),
    secret: Schema.optional(Schema.String),
  });
export type DeleteEphemeralKeysKeyOutput =
  typeof DeleteEphemeralKeysKeyOutput.Type;

// The operation
/**
 * Immediately invalidate an ephemeral key
 *
 * <p>Invalidates a short-lived API key for a given resource.</p>
 */
export const DeleteEphemeralKeysKey = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeleteEphemeralKeysKeyInput,
    outputSchema: DeleteEphemeralKeysKeyOutput,
  }),
);
