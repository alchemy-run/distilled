/**
 * Azure Machinelearning API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.MachineLearning/operations",
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
});
export type OperationsListOutput = typeof OperationsListOutput.Type;

// The operation
/**
 * Lists all of the available Azure Machine Learning Studio REST API operations.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const WorkspacesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearning/workspaces/{workspaceName}",
    }),
  );
export type WorkspacesCreateOrUpdateInput =
  typeof WorkspacesCreateOrUpdateInput.Type;

// Output Schema
export const WorkspacesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    sku: Schema.optional(
      Schema.Struct({
        name: Schema.optional(Schema.String),
        tier: Schema.optional(Schema.String),
      }),
    ),
  });
export type WorkspacesCreateOrUpdateOutput =
  typeof WorkspacesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a workspace with the specified parameters.
 */
export const WorkspacesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkspacesCreateOrUpdateInput,
    outputSchema: WorkspacesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const WorkspacesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearning/workspaces/{workspaceName}",
  }),
);
export type WorkspacesDeleteInput = typeof WorkspacesDeleteInput.Type;

// Output Schema
export const WorkspacesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WorkspacesDeleteOutput = typeof WorkspacesDeleteOutput.Type;

// The operation
/**
 * Deletes a machine learning workspace.
 */
export const WorkspacesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkspacesDeleteInput,
  outputSchema: WorkspacesDeleteOutput,
}));
// Input Schema
export const WorkspacesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearning/workspaces/{workspaceName}",
  }),
);
export type WorkspacesGetInput = typeof WorkspacesGetInput.Type;

// Output Schema
export const WorkspacesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  location: Schema.String,
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  sku: Schema.optional(
    Schema.Struct({
      name: Schema.optional(Schema.String),
      tier: Schema.optional(Schema.String),
    }),
  ),
});
export type WorkspacesGetOutput = typeof WorkspacesGetOutput.Type;

// The operation
/**
 * Gets the properties of the specified machine learning workspace.
 */
export const WorkspacesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkspacesGetInput,
  outputSchema: WorkspacesGetOutput,
}));
// Input Schema
export const WorkspacesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.MachineLearning/workspaces",
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
        location: Schema.String,
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        sku: Schema.optional(
          Schema.Struct({
            name: Schema.optional(Schema.String),
            tier: Schema.optional(Schema.String),
          }),
        ),
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type WorkspacesListOutput = typeof WorkspacesListOutput.Type;

// The operation
/**
 * Lists all the available machine learning workspaces under the specified subscription.
 */
export const WorkspacesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkspacesListInput,
  outputSchema: WorkspacesListOutput,
}));
// Input Schema
export const WorkspacesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearning/workspaces",
    }),
  );
export type WorkspacesListByResourceGroupInput =
  typeof WorkspacesListByResourceGroupInput.Type;

// Output Schema
export const WorkspacesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.String,
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          sku: Schema.optional(
            Schema.Struct({
              name: Schema.optional(Schema.String),
              tier: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type WorkspacesListByResourceGroupOutput =
  typeof WorkspacesListByResourceGroupOutput.Type;

// The operation
/**
 * Lists all the available machine learning workspaces under the specified resource group.
 */
export const WorkspacesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkspacesListByResourceGroupInput,
    outputSchema: WorkspacesListByResourceGroupOutput,
  }));
// Input Schema
export const WorkspacesListWorkspaceKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearning/workspaces/{workspaceName}/listWorkspaceKeys",
    }),
  );
export type WorkspacesListWorkspaceKeysInput =
  typeof WorkspacesListWorkspaceKeysInput.Type;

// Output Schema
export const WorkspacesListWorkspaceKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    primaryToken: Schema.optional(Schema.String),
    secondaryToken: Schema.optional(Schema.String),
  });
export type WorkspacesListWorkspaceKeysOutput =
  typeof WorkspacesListWorkspaceKeysOutput.Type;

// The operation
/**
 * List the authorization keys associated with this workspace.
 */
export const WorkspacesListWorkspaceKeys = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkspacesListWorkspaceKeysInput,
    outputSchema: WorkspacesListWorkspaceKeysOutput,
  }),
);
// Input Schema
export const WorkspacesResyncStorageKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearning/workspaces/{workspaceName}/resyncStorageKeys",
    }),
  );
export type WorkspacesResyncStorageKeysInput =
  typeof WorkspacesResyncStorageKeysInput.Type;

// Output Schema
export const WorkspacesResyncStorageKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WorkspacesResyncStorageKeysOutput =
  typeof WorkspacesResyncStorageKeysOutput.Type;

// The operation
/**
 * Resync storage keys associated with this workspace.
 */
export const WorkspacesResyncStorageKeys = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkspacesResyncStorageKeysInput,
    outputSchema: WorkspacesResyncStorageKeysOutput,
  }),
);
// Input Schema
export const WorkspacesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearning/workspaces/{workspaceName}",
  }),
);
export type WorkspacesUpdateInput = typeof WorkspacesUpdateInput.Type;

// Output Schema
export const WorkspacesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    sku: Schema.optional(
      Schema.Struct({
        name: Schema.optional(Schema.String),
        tier: Schema.optional(Schema.String),
      }),
    ),
  },
);
export type WorkspacesUpdateOutput = typeof WorkspacesUpdateOutput.Type;

// The operation
/**
 * Updates a machine learning workspace with the specified parameters.
 */
export const WorkspacesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkspacesUpdateInput,
  outputSchema: WorkspacesUpdateOutput,
}));
