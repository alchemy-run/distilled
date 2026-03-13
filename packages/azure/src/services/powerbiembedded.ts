/**
 * Azure Powerbiembedded API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const GetAvailableOperationsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/providers/Microsoft.PowerBI/operations" }),
  );
export type GetAvailableOperationsInput =
  typeof GetAvailableOperationsInput.Type;

// Output Schema
export const GetAvailableOperationsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
              origin: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    ),
  });
export type GetAvailableOperationsOutput =
  typeof GetAvailableOperationsOutput.Type;

// The operation
/**
 * Indicates which operations can be performed by the Power BI Resource Provider.
 */
export const getAvailableOperations = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetAvailableOperationsInput,
    outputSchema: GetAvailableOperationsOutput,
  }),
);
// Input Schema
export const WorkspaceCollectionsCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.PowerBI/locations/{location}/checkNameAvailability",
    }),
  );
export type WorkspaceCollectionsCheckNameAvailabilityInput =
  typeof WorkspaceCollectionsCheckNameAvailabilityInput.Type;

// Output Schema
export const WorkspaceCollectionsCheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.Literals(["Unavailable", "Invalid"])),
    message: Schema.optional(Schema.String),
  });
export type WorkspaceCollectionsCheckNameAvailabilityOutput =
  typeof WorkspaceCollectionsCheckNameAvailabilityOutput.Type;

// The operation
/**
 * Verify the specified Power BI Workspace Collection name is valid and not already in use.
 *
 * @param location - Azure location
 */
export const WorkspaceCollectionsCheckNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkspaceCollectionsCheckNameAvailabilityInput,
    outputSchema: WorkspaceCollectionsCheckNameAvailabilityOutput,
  }));
// Input Schema
export const WorkspaceCollectionsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceCollectionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerBI/workspaceCollections/{workspaceCollectionName}",
    }),
  );
export type WorkspaceCollectionsCreateInput =
  typeof WorkspaceCollectionsCreateInput.Type;

// Output Schema
export const WorkspaceCollectionsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    sku: Schema.optional(
      Schema.Struct({
        name: Schema.Literals(["S1"]),
        tier: Schema.Literals(["Standard"]),
      }),
    ),
    properties: Schema.optional(Schema.Unknown),
  });
export type WorkspaceCollectionsCreateOutput =
  typeof WorkspaceCollectionsCreateOutput.Type;

// The operation
/**
 * Creates a new Power BI Workspace Collection with the specified properties. A Power BI Workspace Collection contains one or more workspaces, and can be used to provision keys that provide API access to those workspaces.
 *
 * @param resourceGroupName - Azure resource group
 * @param workspaceCollectionName - Power BI Embedded Workspace Collection name
 */
export const WorkspaceCollectionsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkspaceCollectionsCreateInput,
    outputSchema: WorkspaceCollectionsCreateOutput,
  }),
);
// Input Schema
export const WorkspaceCollectionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceCollectionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerBI/workspaceCollections/{workspaceCollectionName}",
    }),
  );
export type WorkspaceCollectionsDeleteInput =
  typeof WorkspaceCollectionsDeleteInput.Type;

// Output Schema
export const WorkspaceCollectionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WorkspaceCollectionsDeleteOutput =
  typeof WorkspaceCollectionsDeleteOutput.Type;

// The operation
/**
 * Delete a Power BI Workspace Collection.
 *
 * @param resourceGroupName - Azure resource group
 * @param workspaceCollectionName - Power BI Embedded Workspace Collection name
 */
export const WorkspaceCollectionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkspaceCollectionsDeleteInput,
    outputSchema: WorkspaceCollectionsDeleteOutput,
  }),
);
// Input Schema
export const WorkspaceCollectionsGetAccessKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceCollectionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerBI/workspaceCollections/{workspaceCollectionName}/listKeys",
    }),
  );
export type WorkspaceCollectionsGetAccessKeysInput =
  typeof WorkspaceCollectionsGetAccessKeysInput.Type;

// Output Schema
export const WorkspaceCollectionsGetAccessKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    key1: Schema.optional(Schema.String),
    key2: Schema.optional(Schema.String),
  });
export type WorkspaceCollectionsGetAccessKeysOutput =
  typeof WorkspaceCollectionsGetAccessKeysOutput.Type;

// The operation
/**
 * Retrieves the primary and secondary access keys for the specified Power BI Workspace Collection.
 *
 * @param resourceGroupName - Azure resource group
 * @param workspaceCollectionName - Power BI Embedded Workspace Collection name
 */
export const WorkspaceCollectionsGetAccessKeys =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkspaceCollectionsGetAccessKeysInput,
    outputSchema: WorkspaceCollectionsGetAccessKeysOutput,
  }));
// Input Schema
export const WorkspaceCollectionsGetByNameInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceCollectionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerBI/workspaceCollections/{workspaceCollectionName}",
    }),
  );
export type WorkspaceCollectionsGetByNameInput =
  typeof WorkspaceCollectionsGetByNameInput.Type;

// Output Schema
export const WorkspaceCollectionsGetByNameOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    sku: Schema.optional(
      Schema.Struct({
        name: Schema.Literals(["S1"]),
        tier: Schema.Literals(["Standard"]),
      }),
    ),
    properties: Schema.optional(Schema.Unknown),
  });
export type WorkspaceCollectionsGetByNameOutput =
  typeof WorkspaceCollectionsGetByNameOutput.Type;

// The operation
/**
 * Retrieves an existing Power BI Workspace Collection.
 *
 * @param resourceGroupName - Azure resource group
 * @param workspaceCollectionName - Power BI Embedded Workspace Collection name
 */
export const WorkspaceCollectionsGetByName =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkspaceCollectionsGetByNameInput,
    outputSchema: WorkspaceCollectionsGetByNameOutput,
  }));
// Input Schema
export const WorkspaceCollectionsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerBI/workspaceCollections",
    }),
  );
export type WorkspaceCollectionsListByResourceGroupInput =
  typeof WorkspaceCollectionsListByResourceGroupInput.Type;

// Output Schema
export const WorkspaceCollectionsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          sku: Schema.optional(
            Schema.Struct({
              name: Schema.Literals(["S1"]),
              tier: Schema.Literals(["Standard"]),
            }),
          ),
          properties: Schema.optional(Schema.Unknown),
        }),
      ),
    ),
  });
export type WorkspaceCollectionsListByResourceGroupOutput =
  typeof WorkspaceCollectionsListByResourceGroupOutput.Type;

// The operation
/**
 * Retrieves all existing Power BI workspace collections in the specified resource group.
 *
 * @param resourceGroupName - Azure resource group
 */
export const WorkspaceCollectionsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkspaceCollectionsListByResourceGroupInput,
    outputSchema: WorkspaceCollectionsListByResourceGroupOutput,
  }));
// Input Schema
export const WorkspaceCollectionsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.PowerBI/workspaceCollections",
    }),
  );
export type WorkspaceCollectionsListBySubscriptionInput =
  typeof WorkspaceCollectionsListBySubscriptionInput.Type;

// Output Schema
export const WorkspaceCollectionsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          sku: Schema.optional(
            Schema.Struct({
              name: Schema.Literals(["S1"]),
              tier: Schema.Literals(["Standard"]),
            }),
          ),
          properties: Schema.optional(Schema.Unknown),
        }),
      ),
    ),
  });
export type WorkspaceCollectionsListBySubscriptionOutput =
  typeof WorkspaceCollectionsListBySubscriptionOutput.Type;

// The operation
/**
 * Retrieves all existing Power BI workspace collections in the specified subscription.
 */
export const WorkspaceCollectionsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkspaceCollectionsListBySubscriptionInput,
    outputSchema: WorkspaceCollectionsListBySubscriptionOutput,
  }));
// Input Schema
export const WorkspaceCollectionsMigrateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/moveResources",
    }),
  );
export type WorkspaceCollectionsMigrateInput =
  typeof WorkspaceCollectionsMigrateInput.Type;

// Output Schema
export const WorkspaceCollectionsMigrateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WorkspaceCollectionsMigrateOutput =
  typeof WorkspaceCollectionsMigrateOutput.Type;

// The operation
/**
 * Migrates an existing Power BI Workspace Collection to a different resource group and/or subscription.
 *
 * @param resourceGroupName - Azure resource group
 */
export const WorkspaceCollectionsMigrate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkspaceCollectionsMigrateInput,
    outputSchema: WorkspaceCollectionsMigrateOutput,
  }),
);
// Input Schema
export const WorkspaceCollectionsRegenerateKeyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceCollectionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerBI/workspaceCollections/{workspaceCollectionName}/regenerateKey",
    }),
  );
export type WorkspaceCollectionsRegenerateKeyInput =
  typeof WorkspaceCollectionsRegenerateKeyInput.Type;

// Output Schema
export const WorkspaceCollectionsRegenerateKeyOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    key1: Schema.optional(Schema.String),
    key2: Schema.optional(Schema.String),
  });
export type WorkspaceCollectionsRegenerateKeyOutput =
  typeof WorkspaceCollectionsRegenerateKeyOutput.Type;

// The operation
/**
 * Regenerates the primary or secondary access key for the specified Power BI Workspace Collection.
 *
 * @param resourceGroupName - Azure resource group
 * @param workspaceCollectionName - Power BI Embedded Workspace Collection name
 */
export const WorkspaceCollectionsRegenerateKey =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkspaceCollectionsRegenerateKeyInput,
    outputSchema: WorkspaceCollectionsRegenerateKeyOutput,
  }));
// Input Schema
export const WorkspaceCollectionsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceCollectionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerBI/workspaceCollections/{workspaceCollectionName}",
    }),
  );
export type WorkspaceCollectionsUpdateInput =
  typeof WorkspaceCollectionsUpdateInput.Type;

// Output Schema
export const WorkspaceCollectionsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    sku: Schema.optional(
      Schema.Struct({
        name: Schema.Literals(["S1"]),
        tier: Schema.Literals(["Standard"]),
      }),
    ),
    properties: Schema.optional(Schema.Unknown),
  });
export type WorkspaceCollectionsUpdateOutput =
  typeof WorkspaceCollectionsUpdateOutput.Type;

// The operation
/**
 * Update an existing Power BI Workspace Collection with the specified properties.
 *
 * @param resourceGroupName - Azure resource group
 * @param workspaceCollectionName - Power BI Embedded Workspace Collection name
 */
export const WorkspaceCollectionsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkspaceCollectionsUpdateInput,
    outputSchema: WorkspaceCollectionsUpdateOutput,
  }),
);
// Input Schema
export const WorkspacesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceCollectionName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerBI/workspaceCollections/{workspaceCollectionName}/workspaces",
  }),
);
export type WorkspacesListInput = typeof WorkspacesListInput.Type;

// Output Schema
export const WorkspacesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
        properties: Schema.optional(Schema.Unknown),
      }),
    ),
  ),
});
export type WorkspacesListOutput = typeof WorkspacesListOutput.Type;

// The operation
/**
 * Retrieves all existing Power BI workspaces in the specified workspace collection.
 *
 * @param resourceGroupName - Azure resource group
 * @param workspaceCollectionName - Power BI Embedded Workspace Collection name
 */
export const WorkspacesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkspacesListInput,
  outputSchema: WorkspacesListOutput,
}));
