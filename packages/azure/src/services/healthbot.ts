/**
 * Azure Healthbot API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const BotsCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  botName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthBot/healthBots/{botName}",
  }),
);
export type BotsCreateInput = typeof BotsCreateInput.Type;

// Output Schema
export const BotsCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type BotsCreateOutput = typeof BotsCreateOutput.Type;

// The operation
/**
 * Create a new Azure Health Bot.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param botName - The name of the Bot resource.
 */
export const BotsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BotsCreateInput,
  outputSchema: BotsCreateOutput,
}));
// Input Schema
export const BotsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  botName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthBot/healthBots/{botName}",
  }),
);
export type BotsDeleteInput = typeof BotsDeleteInput.Type;

// Output Schema
export const BotsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type BotsDeleteOutput = typeof BotsDeleteOutput.Type;

// The operation
/**
 * Delete a HealthBot.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param botName - The name of the Bot resource.
 */
export const BotsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BotsDeleteInput,
  outputSchema: BotsDeleteOutput,
}));
// Input Schema
export const BotsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  botName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthBot/healthBots/{botName}",
  }),
);
export type BotsGetInput = typeof BotsGetInput.Type;

// Output Schema
export const BotsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type BotsGetOutput = typeof BotsGetOutput.Type;

// The operation
/**
 * Get a HealthBot.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param botName - The name of the Bot resource.
 */
export const BotsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BotsGetInput,
  outputSchema: BotsGetOutput,
}));
// Input Schema
export const BotsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.HealthBot/healthBots",
  }),
);
export type BotsListInput = typeof BotsListInput.Type;

// Output Schema
export const BotsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(
    Schema.Struct({
      tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      location: Schema.String,
    }),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type BotsListOutput = typeof BotsListOutput.Type;

// The operation
/**
 * Returns all the resources of a particular type belonging to a subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const BotsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BotsListInput,
  outputSchema: BotsListOutput,
}));
// Input Schema
export const BotsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthBot/healthBots",
    }),
  );
export type BotsListByResourceGroupInput =
  typeof BotsListByResourceGroupInput.Type;

// Output Schema
export const BotsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type BotsListByResourceGroupOutput =
  typeof BotsListByResourceGroupOutput.Type;

// The operation
/**
 * Returns all the resources of a particular type belonging to a resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const BotsListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BotsListByResourceGroupInput,
    outputSchema: BotsListByResourceGroupOutput,
  }),
);
// Input Schema
export const BotsListSecretsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  botName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthBot/healthBots/{botName}/listSecrets",
  }),
);
export type BotsListSecretsInput = typeof BotsListSecretsInput.Type;

// Output Schema
export const BotsListSecretsOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  secrets: Schema.optional(
    Schema.Array(
      Schema.Struct({
        keyName: Schema.optional(Schema.String),
        value: Schema.optional(Schema.String),
      }),
    ),
  ),
});
export type BotsListSecretsOutput = typeof BotsListSecretsOutput.Type;

// The operation
/**
 * List all secrets of a HealthBot.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param botName - The name of the Bot resource.
 */
export const BotsListSecrets = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BotsListSecretsInput,
  outputSchema: BotsListSecretsOutput,
}));
// Input Schema
export const BotsRegenerateApiJwtSecretInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    botName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthBot/healthBots/{botName}/regenerateApiJwtSecret",
    }),
  );
export type BotsRegenerateApiJwtSecretInput =
  typeof BotsRegenerateApiJwtSecretInput.Type;

// Output Schema
export const BotsRegenerateApiJwtSecretOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    keyName: Schema.optional(Schema.String),
    value: Schema.optional(Schema.String),
  });
export type BotsRegenerateApiJwtSecretOutput =
  typeof BotsRegenerateApiJwtSecretOutput.Type;

// The operation
/**
 * Regenerate the API JWT Secret of a HealthBot.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param botName - The name of the Bot resource.
 */
export const BotsRegenerateApiJwtSecret = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BotsRegenerateApiJwtSecretInput,
    outputSchema: BotsRegenerateApiJwtSecretOutput,
  }),
);
// Input Schema
export const BotsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  botName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthBot/healthBots/{botName}",
  }),
);
export type BotsUpdateInput = typeof BotsUpdateInput.Type;

// Output Schema
export const BotsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type BotsUpdateOutput = typeof BotsUpdateOutput.Type;

// The operation
/**
 * Patch a HealthBot.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param botName - The name of the Bot resource.
 */
export const BotsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BotsUpdateInput,
  outputSchema: BotsUpdateOutput,
}));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({ method: "GET", path: "/providers/Microsoft.HealthBot/operations" }),
);
export type OperationsListInput = typeof OperationsListInput.Type;

// Output Schema
export const OperationsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(
    Schema.Struct({
      name: Schema.optional(Schema.String),
      isDataAction: Schema.optional(Schema.Boolean),
      display: Schema.optional(
        Schema.Struct({
          provider: Schema.optional(Schema.String),
          resource: Schema.optional(Schema.String),
          operation: Schema.optional(Schema.String),
          description: Schema.optional(Schema.String),
        }),
      ),
      origin: Schema.optional(Schema.String),
      properties: Schema.optional(Schema.Unknown),
    }),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type OperationsListOutput = typeof OperationsListOutput.Type;

// The operation
/**
 * Lists all the available Azure Health Bot operations.
 *
 * @param api-version - The API version to use for this operation.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
