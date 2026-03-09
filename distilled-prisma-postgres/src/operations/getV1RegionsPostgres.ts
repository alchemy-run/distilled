import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetV1RegionsPostgresInput = Schema.Struct({}).pipe(
  T.Http({ method: "GET", path: "/v1/regions/postgres" }),
);
export type GetV1RegionsPostgresInput = typeof GetV1RegionsPostgresInput.Type;

// Output Schema
export const GetV1RegionsPostgresOutput = Schema.Struct({
  data: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      type: Schema.Literal("region"),
      name: Schema.String,
      status: Schema.Literals(["available", "unavailable"]),
    }),
  ),
});
export type GetV1RegionsPostgresOutput = typeof GetV1RegionsPostgresOutput.Type;

// The operation
/**
 * Get Prisma Postgres regions
 *
 * Returns all available regions for Prisma Postgres.
 */
export const getV1RegionsPostgres = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetV1RegionsPostgresInput,
    outputSchema: GetV1RegionsPostgresOutput,
  }),
);
