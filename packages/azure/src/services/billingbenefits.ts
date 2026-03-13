/**
 * Azure Billingbenefits API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const SavingsPlanOrderElevateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.BillingBenefits/savingsPlanOrders/{savingsPlanOrderId}/elevate",
    }),
  );
export type SavingsPlanOrderElevateInput =
  typeof SavingsPlanOrderElevateInput.Type;

// Output Schema
export const SavingsPlanOrderElevateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        principalId: Schema.optional(Schema.String),
        roleDefinitionId: Schema.optional(Schema.String),
        scope: Schema.optional(Schema.String),
      }),
    ),
  });
export type SavingsPlanOrderElevateOutput =
  typeof SavingsPlanOrderElevateOutput.Type;

// The operation
/**
 * Elevate as owner on savings plan order based on billing permissions.
 */
export const SavingsPlanOrderElevate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SavingsPlanOrderElevateInput,
    outputSchema: SavingsPlanOrderElevateOutput,
  }),
);
// Input Schema
export const SavingsPlanValidateUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.BillingBenefits/savingsPlanOrders/{savingsPlanOrderId}/savingsPlans/{savingsPlanId}/validate",
    }),
  );
export type SavingsPlanValidateUpdateInput =
  typeof SavingsPlanValidateUpdateInput.Type;

// Output Schema
export const SavingsPlanValidateUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    benefits: Schema.optional(
      Schema.Array(
        Schema.Struct({
          valid: Schema.optional(Schema.Boolean),
          reasonCode: Schema.optional(Schema.String),
          reason: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SavingsPlanValidateUpdateOutput =
  typeof SavingsPlanValidateUpdateOutput.Type;

// The operation
/**
 * Validate savings plan patch.
 */
export const SavingsPlanValidateUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SavingsPlanValidateUpdateInput,
    outputSchema: SavingsPlanValidateUpdateOutput,
  }),
);
// Input Schema
export const ValidatePurchaseInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "POST",
    path: "/providers/Microsoft.BillingBenefits/validate",
  }),
);
export type ValidatePurchaseInput = typeof ValidatePurchaseInput.Type;

// Output Schema
export const ValidatePurchaseOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    benefits: Schema.optional(
      Schema.Array(
        Schema.Struct({
          valid: Schema.optional(Schema.Boolean),
          reasonCode: Schema.optional(Schema.String),
          reason: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  },
);
export type ValidatePurchaseOutput = typeof ValidatePurchaseOutput.Type;

// The operation
/**
 * Validate savings plan purchase.
 */
export const ValidatePurchase = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ValidatePurchaseInput,
  outputSchema: ValidatePurchaseOutput,
}));
