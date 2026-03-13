import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetOrganizationSubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    organizationSlug: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/organizations/{organizationSlug}/subscription",
    }),
  );
export type GetOrganizationSubscriptionInput =
  typeof GetOrganizationSubscriptionInput.Type;

// Output Schema
export const GetOrganizationSubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscription: Schema.optional(
      Schema.Struct({
        name: Schema.optional(Schema.String),
        overages: Schema.optional(Schema.Boolean),
        plan: Schema.optional(Schema.String),
        timeline: Schema.optional(Schema.String),
      }),
    ),
  });
export type GetOrganizationSubscriptionOutput =
  typeof GetOrganizationSubscriptionOutput.Type;

// The operation
/**
 * Current Subscription
 *
 * Returns the current subscription details for the organization.
 *
 * @param organizationSlug - The slug of the organization or user account.
 */
export const getOrganizationSubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetOrganizationSubscriptionInput,
    outputSchema: GetOrganizationSubscriptionOutput,
  }),
);
