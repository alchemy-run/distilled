import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteTerminalConfigurationsConfigurationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    configuration: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/v1/terminal/configurations/{configuration}",
      contentType: "form-urlencoded",
    }),
  );
export type DeleteTerminalConfigurationsConfigurationInput =
  typeof DeleteTerminalConfigurationsConfigurationInput.Type;

// Output Schema
export const DeleteTerminalConfigurationsConfigurationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    deleted: Schema.Literals(["true"]),
    id: Schema.String,
    object: Schema.Literals(["terminal.configuration"]),
  });
export type DeleteTerminalConfigurationsConfigurationOutput =
  typeof DeleteTerminalConfigurationsConfigurationOutput.Type;

// The operation
/**
 * Delete a Configuration
 *
 * <p>Deletes a <code>Configuration</code> object.</p>
 */
export const DeleteTerminalConfigurationsConfiguration =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteTerminalConfigurationsConfigurationInput,
    outputSchema: DeleteTerminalConfigurationsConfigurationOutput,
  }));
