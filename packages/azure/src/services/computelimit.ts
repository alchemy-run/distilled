/**
 * Azure Computelimit API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const GuestSubscriptionsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    guestSubscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeLimit/locations/{location}/guestSubscriptions/{guestSubscriptionId}",
    }),
  );
export type GuestSubscriptionsCreateInput =
  typeof GuestSubscriptionsCreateInput.Type;

// Output Schema
export const GuestSubscriptionsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type GuestSubscriptionsCreateOutput =
  typeof GuestSubscriptionsCreateOutput.Type;

// The operation
/**
 * Adds a subscription as a guest to consume the compute limits shared by the host subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 * @param guestSubscriptionId - The name of the GuestSubscription
 */
export const GuestSubscriptionsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GuestSubscriptionsCreateInput,
    outputSchema: GuestSubscriptionsCreateOutput,
  }),
);
// Input Schema
export const GuestSubscriptionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    guestSubscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeLimit/locations/{location}/guestSubscriptions/{guestSubscriptionId}",
    }),
  );
export type GuestSubscriptionsDeleteInput =
  typeof GuestSubscriptionsDeleteInput.Type;

// Output Schema
export const GuestSubscriptionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GuestSubscriptionsDeleteOutput =
  typeof GuestSubscriptionsDeleteOutput.Type;

// The operation
/**
 * Deletes a subscription as a guest to stop consuming the compute limits shared by the host subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 * @param guestSubscriptionId - The name of the GuestSubscription
 */
export const GuestSubscriptionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GuestSubscriptionsDeleteInput,
    outputSchema: GuestSubscriptionsDeleteOutput,
  }),
);
// Input Schema
export const GuestSubscriptionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    guestSubscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeLimit/locations/{location}/guestSubscriptions/{guestSubscriptionId}",
    }),
  );
export type GuestSubscriptionsGetInput = typeof GuestSubscriptionsGetInput.Type;

// Output Schema
export const GuestSubscriptionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type GuestSubscriptionsGetOutput =
  typeof GuestSubscriptionsGetOutput.Type;

// The operation
/**
 * Gets the properties of a guest subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 * @param guestSubscriptionId - The name of the GuestSubscription
 */
export const GuestSubscriptionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GuestSubscriptionsGetInput,
    outputSchema: GuestSubscriptionsGetOutput,
  }),
);
// Input Schema
export const GuestSubscriptionsListBySubscriptionLocationResourceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeLimit/locations/{location}/guestSubscriptions",
    }),
  );
export type GuestSubscriptionsListBySubscriptionLocationResourceInput =
  typeof GuestSubscriptionsListBySubscriptionLocationResourceInput.Type;

// Output Schema
export const GuestSubscriptionsListBySubscriptionLocationResourceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type GuestSubscriptionsListBySubscriptionLocationResourceOutput =
  typeof GuestSubscriptionsListBySubscriptionLocationResourceOutput.Type;

// The operation
/**
 * Lists all guest subscriptions in a location.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 */
export const GuestSubscriptionsListBySubscriptionLocationResource =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GuestSubscriptionsListBySubscriptionLocationResourceInput,
    outputSchema: GuestSubscriptionsListBySubscriptionLocationResourceOutput,
  }));
// Input Schema
export const SharedLimitsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeLimit/locations/{location}/sharedLimits/{name}",
    }),
  );
export type SharedLimitsCreateInput = typeof SharedLimitsCreateInput.Type;

// Output Schema
export const SharedLimitsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SharedLimitsCreateOutput = typeof SharedLimitsCreateOutput.Type;

// The operation
/**
 * Enables sharing of a compute limit by the host subscription with its guest subscriptions.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 * @param name - The name of the SharedLimit
 */
export const SharedLimitsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SharedLimitsCreateInput,
  outputSchema: SharedLimitsCreateOutput,
}));
// Input Schema
export const SharedLimitsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeLimit/locations/{location}/sharedLimits/{name}",
    }),
  );
export type SharedLimitsDeleteInput = typeof SharedLimitsDeleteInput.Type;

// Output Schema
export const SharedLimitsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SharedLimitsDeleteOutput = typeof SharedLimitsDeleteOutput.Type;

// The operation
/**
 * Disables sharing of a compute limit by the host subscription with its guest subscriptions.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 * @param name - The name of the SharedLimit
 */
export const SharedLimitsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SharedLimitsDeleteInput,
  outputSchema: SharedLimitsDeleteOutput,
}));
// Input Schema
export const SharedLimitsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  location: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeLimit/locations/{location}/sharedLimits/{name}",
  }),
);
export type SharedLimitsGetInput = typeof SharedLimitsGetInput.Type;

// Output Schema
export const SharedLimitsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type SharedLimitsGetOutput = typeof SharedLimitsGetOutput.Type;

// The operation
/**
 * Gets the properties of a compute limit shared by the host subscription with its guest subscriptions.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 * @param name - The name of the SharedLimit
 */
export const SharedLimitsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SharedLimitsGetInput,
  outputSchema: SharedLimitsGetOutput,
}));
// Input Schema
export const SharedLimitsListBySubscriptionLocationResourceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeLimit/locations/{location}/sharedLimits",
    }),
  );
export type SharedLimitsListBySubscriptionLocationResourceInput =
  typeof SharedLimitsListBySubscriptionLocationResourceInput.Type;

// Output Schema
export const SharedLimitsListBySubscriptionLocationResourceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type SharedLimitsListBySubscriptionLocationResourceOutput =
  typeof SharedLimitsListBySubscriptionLocationResourceOutput.Type;

// The operation
/**
 * Lists all compute limits shared by the host subscription with its guest subscriptions.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 */
export const SharedLimitsListBySubscriptionLocationResource =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SharedLimitsListBySubscriptionLocationResourceInput,
    outputSchema: SharedLimitsListBySubscriptionLocationResourceOutput,
  }));
