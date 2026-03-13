/**
 * Azure Marketplaceordering API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const MarketplaceAgreementsCancelInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.MarketplaceOrdering/agreements/{publisherId}/offers/{offerId}/plans/{planId}/cancel",
    }),
  );
export type MarketplaceAgreementsCancelInput =
  typeof MarketplaceAgreementsCancelInput.Type;

// Output Schema
export const MarketplaceAgreementsCancelOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type MarketplaceAgreementsCancelOutput =
  typeof MarketplaceAgreementsCancelOutput.Type;

// The operation
/**
 * Cancel marketplace terms.
 */
export const MarketplaceAgreementsCancel = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MarketplaceAgreementsCancelInput,
    outputSchema: MarketplaceAgreementsCancelOutput,
  }),
);
// Input Schema
export const MarketplaceAgreementsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.MarketplaceOrdering/offerTypes/{offerType}/publishers/{publisherId}/offers/{offerId}/plans/{planId}/agreements/current",
    }),
  );
export type MarketplaceAgreementsCreateInput =
  typeof MarketplaceAgreementsCreateInput.Type;

// Output Schema
export const MarketplaceAgreementsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type MarketplaceAgreementsCreateOutput =
  typeof MarketplaceAgreementsCreateOutput.Type;

// The operation
/**
 * Save marketplace terms.
 */
export const MarketplaceAgreementsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MarketplaceAgreementsCreateInput,
    outputSchema: MarketplaceAgreementsCreateOutput,
  }),
);
// Input Schema
export const MarketplaceAgreementsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.MarketplaceOrdering/offerTypes/{offerType}/publishers/{publisherId}/offers/{offerId}/plans/{planId}/agreements/current",
    }),
  );
export type MarketplaceAgreementsGetInput =
  typeof MarketplaceAgreementsGetInput.Type;

// Output Schema
export const MarketplaceAgreementsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type MarketplaceAgreementsGetOutput =
  typeof MarketplaceAgreementsGetOutput.Type;

// The operation
/**
 * Get marketplace terms.
 */
export const MarketplaceAgreementsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MarketplaceAgreementsGetInput,
    outputSchema: MarketplaceAgreementsGetOutput,
  }),
);
// Input Schema
export const MarketplaceAgreementsGetAgreementInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.MarketplaceOrdering/agreements/{publisherId}/offers/{offerId}/plans/{planId}",
    }),
  );
export type MarketplaceAgreementsGetAgreementInput =
  typeof MarketplaceAgreementsGetAgreementInput.Type;

// Output Schema
export const MarketplaceAgreementsGetAgreementOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type MarketplaceAgreementsGetAgreementOutput =
  typeof MarketplaceAgreementsGetAgreementOutput.Type;

// The operation
/**
 * Get marketplace agreement.
 */
export const MarketplaceAgreementsGetAgreement =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MarketplaceAgreementsGetAgreementInput,
    outputSchema: MarketplaceAgreementsGetAgreementOutput,
  }));
// Input Schema
export const MarketplaceAgreementsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.MarketplaceOrdering/agreements",
    }),
  );
export type MarketplaceAgreementsListInput =
  typeof MarketplaceAgreementsListInput.Type;

// Output Schema
export const MarketplaceAgreementsListOutput =
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
  });
export type MarketplaceAgreementsListOutput =
  typeof MarketplaceAgreementsListOutput.Type;

// The operation
/**
 * List marketplace agreements in the subscription.
 */
export const MarketplaceAgreementsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MarketplaceAgreementsListInput,
    outputSchema: MarketplaceAgreementsListOutput,
  }),
);
// Input Schema
export const MarketplaceAgreementsSignInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.MarketplaceOrdering/agreements/{publisherId}/offers/{offerId}/plans/{planId}/sign",
    }),
  );
export type MarketplaceAgreementsSignInput =
  typeof MarketplaceAgreementsSignInput.Type;

// Output Schema
export const MarketplaceAgreementsSignOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type MarketplaceAgreementsSignOutput =
  typeof MarketplaceAgreementsSignOutput.Type;

// The operation
/**
 * Sign marketplace terms.
 */
export const MarketplaceAgreementsSign = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MarketplaceAgreementsSignInput,
    outputSchema: MarketplaceAgreementsSignOutput,
  }),
);
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.MarketplaceOrdering/operations",
  }),
);
export type OperationsListInput = typeof OperationsListInput.Type;

// Output Schema
export const OperationsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        name: Schema.optional(Schema.String),
        display: Schema.optional(
          Schema.Struct({
            provider: Schema.optional(Schema.String),
            resource: Schema.optional(Schema.String),
            operation: Schema.optional(Schema.String),
            description: Schema.optional(Schema.String),
          }),
        ),
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type OperationsListOutput = typeof OperationsListOutput.Type;

// The operation
/**
 * Lists all of the available Microsoft.MarketplaceOrdering REST API operations.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
