import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { SensitiveString } from "../sensitive";

// Input Schema
export const PostEphemeralKeysInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    customer: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.Array(Schema.String)),
    issuing_card: Schema.optional(Schema.String),
    nonce: Schema.optional(Schema.String),
    verification_session: Schema.optional(Schema.String),
  },
).pipe(
  T.Http({
    method: "POST",
    path: "/v1/ephemeral_keys",
    contentType: "form-urlencoded",
  }),
);
export type PostEphemeralKeysInput = typeof PostEphemeralKeysInput.Type;

// Output Schema
export const PostEphemeralKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    created: Schema.Number,
    expires: Schema.Number,
    id: Schema.String,
    livemode: Schema.Boolean,
    object: Schema.Literals(["ephemeral_key"]),
    secret: Schema.optional(SensitiveString),
  });
export type PostEphemeralKeysOutput = typeof PostEphemeralKeysOutput.Type;

// The operation
/**
 * Create an ephemeral key
 *
 * <p>Creates a short-lived API key for a given resource.</p>
 */
export const PostEphemeralKeys = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PostEphemeralKeysInput,
  outputSchema: PostEphemeralKeysOutput,
}));
