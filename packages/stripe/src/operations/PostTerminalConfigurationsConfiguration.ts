import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostTerminalConfigurationsConfigurationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    configuration: Schema.String.pipe(T.PathParam()),
    bbpos_wisepad3: Schema.optional(Schema.Unknown),
    bbpos_wisepos_e: Schema.optional(Schema.Unknown),
    cellular: Schema.optional(Schema.Unknown),
    expand: Schema.optional(Schema.Array(Schema.String)),
    name: Schema.optional(Schema.String),
    offline: Schema.optional(Schema.Unknown),
    reboot_window: Schema.optional(Schema.Unknown),
    stripe_s700: Schema.optional(Schema.Unknown),
    stripe_s710: Schema.optional(Schema.Unknown),
    tipping: Schema.optional(Schema.Unknown),
    verifone_p400: Schema.optional(Schema.Unknown),
    wifi: Schema.optional(Schema.Unknown),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/terminal/configurations/{configuration}",
      contentType: "form-urlencoded",
    }),
  );
export type PostTerminalConfigurationsConfigurationInput =
  typeof PostTerminalConfigurationsConfigurationInput.Type;

// Output Schema
export const PostTerminalConfigurationsConfigurationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type PostTerminalConfigurationsConfigurationOutput =
  typeof PostTerminalConfigurationsConfigurationOutput.Type;

// The operation
/**
 * Update a Configuration
 *
 * <p>Updates a new <code>Configuration</code> object.</p>
 */
export const PostTerminalConfigurationsConfiguration =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostTerminalConfigurationsConfigurationInput,
    outputSchema: PostTerminalConfigurationsConfigurationOutput,
  }));
