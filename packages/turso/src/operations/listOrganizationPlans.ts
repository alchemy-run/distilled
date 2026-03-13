import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListOrganizationPlansInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    organizationSlug: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/organizations/{organizationSlug}/plans",
    }),
  );
export type ListOrganizationPlansInput = typeof ListOrganizationPlansInput.Type;

// Output Schema
export const ListOrganizationPlansOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    plans: Schema.optional(
      Schema.Array(
        Schema.Struct({
          name: Schema.optional(Schema.String),
          price: Schema.optional(Schema.String),
          prices: Schema.optional(
            Schema.Array(
              Schema.Struct({
                value: Schema.optional(Schema.String),
                timeline: Schema.optional(Schema.String),
              }),
            ),
          ),
          quotas: Schema.optional(
            Schema.Struct({
              rowsRead: Schema.optional(Schema.Number),
              rowsWritten: Schema.optional(Schema.Number),
              databases: Schema.optional(Schema.NullOr(Schema.Number)),
              locations: Schema.optional(Schema.Number),
              storage: Schema.optional(Schema.Number),
              groups: Schema.optional(Schema.Number),
              bytesSynced: Schema.optional(Schema.Number),
            }),
          ),
        }),
      ),
    ),
  });
export type ListOrganizationPlansOutput =
  typeof ListOrganizationPlansOutput.Type;

// The operation
/**
 * List Plans
 *
 * Returns a list of available plans and their quotas.
 *
 * @param organizationSlug - The slug of the organization or user account.
 */
export const listOrganizationPlans = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ListOrganizationPlansInput,
    outputSchema: ListOrganizationPlansOutput,
  }),
);
