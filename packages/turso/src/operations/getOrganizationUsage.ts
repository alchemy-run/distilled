import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetOrganizationUsageInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    organizationSlug: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/organizations/{organizationSlug}/usage",
    }),
  );
export type GetOrganizationUsageInput = typeof GetOrganizationUsageInput.Type;

// Output Schema
export const GetOrganizationUsageOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    organization: Schema.optional(
      Schema.Struct({
        uuid: Schema.optional(Schema.String),
        usage: Schema.optional(
          Schema.Struct({
            rows_read: Schema.optional(Schema.Number),
            rows_written: Schema.optional(Schema.Number),
            databases: Schema.optional(Schema.Number),
            locations: Schema.optional(Schema.Number),
            storage_bytes: Schema.optional(Schema.Number),
            groups: Schema.optional(Schema.Number),
            bytes_synced: Schema.optional(Schema.Number),
          }),
        ),
        databases: Schema.optional(
          Schema.Array(
            Schema.Struct({
              uuid: Schema.optional(Schema.String),
              instances: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    uuid: Schema.optional(Schema.String),
                    usage: Schema.optional(
                      Schema.Struct({
                        rows_read: Schema.optional(Schema.Number),
                        rows_written: Schema.optional(Schema.Number),
                        storage_bytes: Schema.optional(Schema.Number),
                        bytes_synced: Schema.optional(Schema.Number),
                      }),
                    ),
                  }),
                ),
              ),
              total: Schema.optional(
                Schema.Struct({
                  rows_read: Schema.optional(Schema.Number),
                  rows_written: Schema.optional(Schema.Number),
                  storage_bytes: Schema.optional(Schema.Number),
                  bytes_synced: Schema.optional(Schema.Number),
                }),
              ),
            }),
          ),
        ),
      }),
    ),
  });
export type GetOrganizationUsageOutput = typeof GetOrganizationUsageOutput.Type;

// The operation
/**
 * Organization Usage
 *
 * Fetch current billing cycle usage for an organization.
 *
 * @param organizationSlug - The slug of the organization or user account.
 */
export const getOrganizationUsage = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetOrganizationUsageInput,
    outputSchema: GetOrganizationUsageOutput,
  }),
);
