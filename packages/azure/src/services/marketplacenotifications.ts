/**
 * Azure Marketplacenotifications API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const NotificationGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscription}/providers/Microsoft.MarketplaceNotifications/reviewsNotification/{notification}",
  }),
);
export type NotificationGetInput = typeof NotificationGetInput.Type;

// Output Schema
export const NotificationGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
});
export type NotificationGetOutput = typeof NotificationGetOutput.Type;

// The operation
export const NotificationGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NotificationGetInput,
  outputSchema: NotificationGetOutput,
}));
// Input Schema
export const NotificationGetOperationsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.MarketplaceNotifications/operations",
    }),
  );
export type NotificationGetOperationsInput =
  typeof NotificationGetOperationsInput.Type;

// Output Schema
export const NotificationGetOperationsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          name: Schema.optional(Schema.String),
          isDataAction: Schema.optional(Schema.Boolean),
          display: Schema.optional(
            Schema.Struct({
              resource: Schema.optional(Schema.String),
              provider: Schema.optional(Schema.String),
              operation: Schema.optional(Schema.String),
              description: Schema.optional(Schema.String),
            }),
          ),
          origin: Schema.optional(Schema.String),
          properties: Schema.optional(Schema.Unknown),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type NotificationGetOperationsOutput =
  typeof NotificationGetOperationsOutput.Type;

// The operation
export const NotificationGetOperations = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NotificationGetOperationsInput,
    outputSchema: NotificationGetOperationsOutput,
  }),
);
// Input Schema
export const NotificationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscription}/providers/Microsoft.MarketplaceNotifications/reviewsNotifications",
  }),
);
export type NotificationsListInput = typeof NotificationsListInput.Type;

// Output Schema
export const NotificationsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type NotificationsListOutput = typeof NotificationsListOutput.Type;

// The operation
export const NotificationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NotificationsListInput,
  outputSchema: NotificationsListOutput,
}));
