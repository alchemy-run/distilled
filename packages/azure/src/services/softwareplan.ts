/**
 * Azure Softwareplan API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const HybridUseBenefitCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/{scope}/providers/Microsoft.SoftwarePlan/hybridUseBenefits/{planId}",
    }),
  );
export type HybridUseBenefitCreateInput =
  typeof HybridUseBenefitCreateInput.Type;

// Output Schema
export const HybridUseBenefitCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type HybridUseBenefitCreateOutput =
  typeof HybridUseBenefitCreateOutput.Type;

// The operation
/**
 * Create a new hybrid use benefit under a given scope
 */
export const HybridUseBenefitCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: HybridUseBenefitCreateInput,
    outputSchema: HybridUseBenefitCreateOutput,
  }),
);
// Input Schema
export const HybridUseBenefitDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "DELETE",
      path: "/{scope}/providers/Microsoft.SoftwarePlan/hybridUseBenefits/{planId}",
    }),
  );
export type HybridUseBenefitDeleteInput =
  typeof HybridUseBenefitDeleteInput.Type;

// Output Schema
export const HybridUseBenefitDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type HybridUseBenefitDeleteOutput =
  typeof HybridUseBenefitDeleteOutput.Type;

// The operation
/**
 * Deletes a given plan ID
 */
export const HybridUseBenefitDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: HybridUseBenefitDeleteInput,
    outputSchema: HybridUseBenefitDeleteOutput,
  }),
);
// Input Schema
export const HybridUseBenefitGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/{scope}/providers/Microsoft.SoftwarePlan/hybridUseBenefits/{planId}",
    }),
  );
export type HybridUseBenefitGetInput = typeof HybridUseBenefitGetInput.Type;

// Output Schema
export const HybridUseBenefitGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type HybridUseBenefitGetOutput = typeof HybridUseBenefitGetOutput.Type;

// The operation
/**
 * Gets a given plan ID
 */
export const HybridUseBenefitGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: HybridUseBenefitGetInput,
  outputSchema: HybridUseBenefitGetOutput,
}));
// Input Schema
export const HybridUseBenefitListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/{scope}/providers/Microsoft.SoftwarePlan/hybridUseBenefits",
    }),
  );
export type HybridUseBenefitListInput = typeof HybridUseBenefitListInput.Type;

// Output Schema
export const HybridUseBenefitListOutput =
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
export type HybridUseBenefitListOutput = typeof HybridUseBenefitListOutput.Type;

// The operation
/**
 * Get all hybrid use benefits associated with an ARM resource.
 *
 * @param $filter - Supports applying filter on the type of SKU
 */
export const HybridUseBenefitList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: HybridUseBenefitListInput,
    outputSchema: HybridUseBenefitListOutput,
  }),
);
// Input Schema
export const HybridUseBenefitRevisionListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/{scope}/providers/Microsoft.SoftwarePlan/hybridUseBenefits/{planId}/revisions",
    }),
  );
export type HybridUseBenefitRevisionListInput =
  typeof HybridUseBenefitRevisionListInput.Type;

// Output Schema
export const HybridUseBenefitRevisionListOutput =
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
export type HybridUseBenefitRevisionListOutput =
  typeof HybridUseBenefitRevisionListOutput.Type;

// The operation
/**
 * Gets the version history of a hybrid use benefit
 */
export const HybridUseBenefitRevisionList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HybridUseBenefitRevisionListInput,
    outputSchema: HybridUseBenefitRevisionListOutput,
  }));
// Input Schema
export const HybridUseBenefitUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PATCH",
      path: "/{scope}/providers/Microsoft.SoftwarePlan/hybridUseBenefits/{planId}",
    }),
  );
export type HybridUseBenefitUpdateInput =
  typeof HybridUseBenefitUpdateInput.Type;

// Output Schema
export const HybridUseBenefitUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type HybridUseBenefitUpdateOutput =
  typeof HybridUseBenefitUpdateOutput.Type;

// The operation
/**
 * Updates an existing hybrid use benefit
 */
export const HybridUseBenefitUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: HybridUseBenefitUpdateInput,
    outputSchema: HybridUseBenefitUpdateOutput,
  }),
);
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/{scope}/providers/Microsoft.SoftwarePlan/operations",
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
        origin: Schema.optional(Schema.String),
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type OperationsListOutput = typeof OperationsListOutput.Type;

// The operation
/**
 * Get operations.
 *
 * List all the operations.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const SoftwarePlanRegisterInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.SoftwarePlan/register",
    }),
  );
export type SoftwarePlanRegisterInput = typeof SoftwarePlanRegisterInput.Type;

// Output Schema
export const SoftwarePlanRegisterOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SoftwarePlanRegisterOutput = typeof SoftwarePlanRegisterOutput.Type;

// The operation
/**
 * Register to Microsoft.SoftwarePlan resource provider.
 *
 * @param subscriptionId - The ID of the target subscription.
 */
export const SoftwarePlanRegister = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SoftwarePlanRegisterInput,
    outputSchema: SoftwarePlanRegisterOutput,
  }),
);
