import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetV1IntegrationsByIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.PathParam()),
  }).pipe(T.Http({ method: "GET", path: "/v1/integrations/{id}" }));
export type GetV1IntegrationsByIdInput = typeof GetV1IntegrationsByIdInput.Type;

// Output Schema
export const GetV1IntegrationsByIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Struct({
      id: Schema.String,
      url: Schema.String,
      createdAt: Schema.String,
      scopes: Schema.Array(Schema.String),
      client: Schema.Struct({
        id: Schema.String,
        name: Schema.String,
        createdAt: Schema.String,
      }),
      createdByUser: Schema.Struct({
        id: Schema.String,
        email: Schema.String,
        displayName: Schema.NullOr(Schema.String),
      }),
    }),
  });
export type GetV1IntegrationsByIdOutput =
  typeof GetV1IntegrationsByIdOutput.Type;

// The operation
/**
 * Get integration by ID
 *
 * Returns a single integration by its ID.
 */
export const getV1IntegrationsById = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetV1IntegrationsByIdInput,
    outputSchema: GetV1IntegrationsByIdOutput,
  }),
);
