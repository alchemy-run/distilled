import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetTerminalConfigurationsConfigurationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    configuration: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/terminal/configurations/{configuration}",
      contentType: "form-urlencoded",
    }),
  );
export type GetTerminalConfigurationsConfigurationInput =
  typeof GetTerminalConfigurationsConfigurationInput.Type;

// Output Schema
export const GetTerminalConfigurationsConfigurationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type GetTerminalConfigurationsConfigurationOutput =
  typeof GetTerminalConfigurationsConfigurationOutput.Type;

// The operation
/**
 * Retrieve a Configuration
 *
 * <p>Retrieves a <code>Configuration</code> object.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetTerminalConfigurationsConfiguration =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetTerminalConfigurationsConfigurationInput,
    outputSchema: GetTerminalConfigurationsConfigurationOutput,
  }));
