import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1EnableDatabaseWebhookInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/projects/{ref}/database/webhooks/enable",
    }),
  );
export type V1EnableDatabaseWebhookInput =
  typeof V1EnableDatabaseWebhookInput.Type;

// Output Schema
export const V1EnableDatabaseWebhookOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type V1EnableDatabaseWebhookOutput =
  typeof V1EnableDatabaseWebhookOutput.Type;

// The operation
/**
 * [Beta] Enables Database Webhooks on the project
 *
 * @param ref - Project ref
 */
export const v1EnableDatabaseWebhook = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1EnableDatabaseWebhookInput,
    outputSchema: V1EnableDatabaseWebhookOutput,
  }),
);
