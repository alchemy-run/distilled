import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetV1IntegrationsInput = Schema.Struct({
  cursor: Schema.optional(Schema.String),
  limit: Schema.optional(Schema.Number),
  workspaceId: Schema.String,
}).pipe(T.Http({ method: "GET", path: "/v1/integrations" }));
export type GetV1IntegrationsInput = typeof GetV1IntegrationsInput.Type;

// Output Schema
export const GetV1IntegrationsOutput = Schema.Struct({
  data: Schema.Array(
    Schema.Struct({
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
  ),
  pagination: Schema.Struct({
    nextCursor: Schema.NullOr(Schema.String),
    hasMore: Schema.Boolean,
  }),
});
export type GetV1IntegrationsOutput = typeof GetV1IntegrationsOutput.Type;

// The operation
/**
 * Get list of integrations
 *
 * Returns integrations filtered by workspace ID.
 */
export const getV1Integrations = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetV1IntegrationsInput,
  outputSchema: GetV1IntegrationsOutput,
}));
