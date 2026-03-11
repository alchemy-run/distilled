import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const ListSchemaRecommendationsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    organization: Schema.String.pipe(T.PathParam()),
    database: Schema.String.pipe(T.PathParam()),
    state: Schema.optional(Schema.Literals(["open", "closed"])),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/organizations/{organization}/databases/{database}/schema-recommendations",
    }),
  );
export type ListSchemaRecommendationsInput =
  typeof ListSchemaRecommendationsInput.Type;

// Output Schema
export const ListSchemaRecommendationsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    current_page: Schema.Number,
    next_page: Schema.NullOr(Schema.Number),
    next_page_url: Schema.NullOr(Schema.String),
    prev_page: Schema.NullOr(Schema.Number),
    prev_page_url: Schema.NullOr(Schema.String),
    data: Schema.Array(
      Schema.Struct({
        id: Schema.String,
        html_url: Schema.String,
        title: Schema.String,
        table_name: Schema.String,
        keyspace: Schema.String,
        ddl_statement: Schema.String,
        number: Schema.Number,
        state: Schema.Literals(["open", "applied", "dismissed", "stale"]),
        recommendation_type: Schema.Literals([
          "unused_table",
          "unused_index",
          "duplicate_index",
          "sequence_overflow",
          "sequence_overflow_foreign_key",
          "new_index",
          "encoding_upgrade",
          "bloated_table",
          "bloated_index",
        ]),
        created_at: Schema.String,
        updated_at: Schema.String,
        applied_at: Schema.String,
        dismissed_at: Schema.String,
        closed_by_deploy_request: Schema.Struct({
          id: Schema.String,
          branch_id: Schema.String,
          number: Schema.Number,
        }),
        dismissed_by: Schema.Struct({
          id: Schema.String,
          display_name: Schema.String,
          avatar_url: Schema.String,
        }),
      }),
    ),
  });
export type ListSchemaRecommendationsOutput =
  typeof ListSchemaRecommendationsOutput.Type;

// The operation
/**
 * List schema recommendations
 *
 * @param organization - Organization name slug from `list_organizations`. Example: `acme`.
 * @param database - Database name slug from `list_databases`. Example: `app-db`.
 * @param state - Filter by recommendation state
 */
export const listSchemaRecommendations = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ListSchemaRecommendationsInput,
    outputSchema: ListSchemaRecommendationsOutput,
    errors: [Forbidden, NotFound] as const,
  }),
);
