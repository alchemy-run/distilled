import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const AppCreateDeployTokenInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    app_name: Schema.String.pipe(T.PathParam()),
    expiry: Schema.optional(Schema.String),
  }).pipe(T.Http({ method: "POST", path: "/apps/{app_name}/deploy_token" }));
export type AppCreateDeployTokenInput = typeof AppCreateDeployTokenInput.Type;

// Output Schema
export const AppCreateDeployTokenOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    token: Schema.optional(Schema.String),
  });
export type AppCreateDeployTokenOutput = typeof AppCreateDeployTokenOutput.Type;

// The operation
/**
 * Create App deploy token
 *
 * @param app_name - Fly App Name
 */
export const AppCreateDeployToken = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AppCreateDeployTokenInput,
    outputSchema: AppCreateDeployTokenOutput,
  }),
);
