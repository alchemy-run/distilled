/**
 * Azure Edgemarketplace API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";
import { SensitiveString } from "../sensitive.ts";

// Input Schema
export const OffersGenerateAccessTokenInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    offerId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/{resourceUri}/providers/Microsoft.EdgeMarketplace/offers/{offerId}/generateAccessToken",
    }),
  );
export type OffersGenerateAccessTokenInput =
  typeof OffersGenerateAccessTokenInput.Type;

// Output Schema
export const OffersGenerateAccessTokenOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    diskId: Schema.optional(Schema.String),
    status: Schema.optional(Schema.String),
    accessToken: SensitiveString,
  });
export type OffersGenerateAccessTokenOutput =
  typeof OffersGenerateAccessTokenOutput.Type;

// The operation
/**
 * A long-running resource action.
 *
 * @param api-version - The API version to use for this operation.
 * @param offerId - Id of the offer
 */
export const OffersGenerateAccessToken = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: OffersGenerateAccessTokenInput,
    outputSchema: OffersGenerateAccessTokenOutput,
  }),
);
// Input Schema
export const OffersGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  offerId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/{resourceUri}/providers/Microsoft.EdgeMarketplace/offers/{offerId}",
  }),
);
export type OffersGetInput = typeof OffersGetInput.Type;

// Output Schema
export const OffersGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type OffersGetOutput = typeof OffersGetOutput.Type;

// The operation
/**
 * Get a Offer
 *
 * @param api-version - The API version to use for this operation.
 * @param offerId - Id of the offer
 */
export const OffersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OffersGetInput,
  outputSchema: OffersGetOutput,
}));
// Input Schema
export const OffersGetAccessTokenInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    offerId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/{resourceUri}/providers/Microsoft.EdgeMarketplace/offers/{offerId}/getAccessToken",
    }),
  );
export type OffersGetAccessTokenInput = typeof OffersGetAccessTokenInput.Type;

// Output Schema
export const OffersGetAccessTokenOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    diskId: Schema.optional(Schema.String),
    status: Schema.optional(Schema.String),
    accessToken: SensitiveString,
  });
export type OffersGetAccessTokenOutput = typeof OffersGetAccessTokenOutput.Type;

// The operation
/**
 * get access token.
 *
 * @param api-version - The API version to use for this operation.
 * @param offerId - Id of the offer
 */
export const OffersGetAccessToken = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: OffersGetAccessTokenInput,
    outputSchema: OffersGetAccessTokenOutput,
  }),
);
// Input Schema
export const OffersListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
  $top: Schema.optional(Schema.Number),
  skip: Schema.optional(Schema.Number),
  maxpagesize: Schema.optional(Schema.Number),
  $filter: Schema.optional(Schema.String),
  $skipToken: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/{resourceUri}/providers/Microsoft.EdgeMarketplace/offers",
  }),
);
export type OffersListInput = typeof OffersListInput.Type;

// Output Schema
export const OffersListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type OffersListOutput = typeof OffersListOutput.Type;

// The operation
/**
 * List Offer resources by parent
 *
 * @param api-version - The API version to use for this operation.
 * @param $top - The number of result items to return.
 * @param skip - The number of result items to skip.
 * @param maxpagesize - The maximum number of result items per page.
 * @param $filter - Filter the result list using the given expression.
 * @param $skipToken - Skip over when retrieving results.
 */
export const OffersList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OffersListInput,
  outputSchema: OffersListOutput,
}));
// Input Schema
export const OffersListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.EdgeMarketplace/offers",
    }),
  );
export type OffersListBySubscriptionInput =
  typeof OffersListBySubscriptionInput.Type;

// Output Schema
export const OffersListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type OffersListBySubscriptionOutput =
  typeof OffersListBySubscriptionOutput.Type;

// The operation
/**
 * List Offer resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const OffersListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: OffersListBySubscriptionInput,
    outputSchema: OffersListBySubscriptionOutput,
  }),
);
// Input Schema
export const PublishersGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  publisherName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/{resourceUri}/providers/Microsoft.EdgeMarketplace/publishers/{publisherName}",
  }),
);
export type PublishersGetInput = typeof PublishersGetInput.Type;

// Output Schema
export const PublishersGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type PublishersGetOutput = typeof PublishersGetOutput.Type;

// The operation
/**
 * Get a Publisher
 *
 * @param api-version - The API version to use for this operation.
 * @param publisherName - Name of the publisher
 */
export const PublishersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PublishersGetInput,
  outputSchema: PublishersGetOutput,
}));
// Input Schema
export const PublishersListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
  $top: Schema.optional(Schema.Number),
  skip: Schema.optional(Schema.Number),
  maxpagesize: Schema.optional(Schema.Number),
  $filter: Schema.optional(Schema.String),
  $skipToken: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/{resourceUri}/providers/Microsoft.EdgeMarketplace/publishers",
  }),
);
export type PublishersListInput = typeof PublishersListInput.Type;

// Output Schema
export const PublishersListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type PublishersListOutput = typeof PublishersListOutput.Type;

// The operation
/**
 * List Publisher resources by parent
 *
 * @param api-version - The API version to use for this operation.
 * @param $top - The number of result items to return.
 * @param skip - The number of result items to skip.
 * @param maxpagesize - The maximum number of result items per page.
 * @param $filter - Filter the result list using the given expression.
 * @param $skipToken - Skip over when retrieving results.
 */
export const PublishersList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PublishersListInput,
  outputSchema: PublishersListOutput,
}));
// Input Schema
export const PublishersListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.EdgeMarketplace/publishers",
    }),
  );
export type PublishersListBySubscriptionInput =
  typeof PublishersListBySubscriptionInput.Type;

// Output Schema
export const PublishersListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type PublishersListBySubscriptionOutput =
  typeof PublishersListBySubscriptionOutput.Type;

// The operation
/**
 * List Publisher resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const PublishersListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PublishersListBySubscriptionInput,
    outputSchema: PublishersListBySubscriptionOutput,
  }));
