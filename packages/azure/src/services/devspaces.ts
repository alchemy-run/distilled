/**
 * Azure Devspaces API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const ContainerHostMappingsGetContainerHostMappingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevSpaces/locations/{location}/checkContainerHostMapping",
    }),
  );
export type ContainerHostMappingsGetContainerHostMappingInput =
  typeof ContainerHostMappingsGetContainerHostMappingInput.Type;

// Output Schema
export const ContainerHostMappingsGetContainerHostMappingOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    containerHostResourceId: Schema.optional(Schema.String),
    mappedControllerResourceId: Schema.optional(Schema.String),
  });
export type ContainerHostMappingsGetContainerHostMappingOutput =
  typeof ContainerHostMappingsGetContainerHostMappingOutput.Type;

// The operation
/**
 * Returns container host mapping object for a container host resource ID if an associated controller exists.
 *
 * @param location - Location of the container host.
 */
export const ContainerHostMappingsGetContainerHostMapping =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ContainerHostMappingsGetContainerHostMappingInput,
    outputSchema: ContainerHostMappingsGetContainerHostMappingOutput,
  }));
// Input Schema
export const ControllersCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevSpaces/controllers/{name}",
  }),
);
export type ControllersCreateInput = typeof ControllersCreateInput.Type;

// Output Schema
export const ControllersCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.optional(Schema.String),
  });
export type ControllersCreateOutput = typeof ControllersCreateOutput.Type;

// The operation
/**
 * Creates an Azure Dev Spaces Controller.
 *
 * Creates an Azure Dev Spaces Controller with the specified create parameters.
 */
export const ControllersCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ControllersCreateInput,
  outputSchema: ControllersCreateOutput,
}));
// Input Schema
export const ControllersDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevSpaces/controllers/{name}",
  }),
);
export type ControllersDeleteInput = typeof ControllersDeleteInput.Type;

// Output Schema
export const ControllersDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ControllersDeleteOutput = typeof ControllersDeleteOutput.Type;

// The operation
/**
 * Deletes an Azure Dev Spaces Controller.
 *
 * Deletes an existing Azure Dev Spaces Controller.
 */
export const ControllersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ControllersDeleteInput,
  outputSchema: ControllersDeleteOutput,
}));
// Input Schema
export const ControllersGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevSpaces/controllers/{name}",
  }),
);
export type ControllersGetInput = typeof ControllersGetInput.Type;

// Output Schema
export const ControllersGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.optional(Schema.String),
});
export type ControllersGetOutput = typeof ControllersGetOutput.Type;

// The operation
/**
 * Gets an Azure Dev Spaces Controller.
 *
 * Gets the properties for an Azure Dev Spaces Controller.
 */
export const ControllersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ControllersGetInput,
  outputSchema: ControllersGetOutput,
}));
// Input Schema
export const ControllersListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.DevSpaces/controllers",
  }),
);
export type ControllersListInput = typeof ControllersListInput.Type;

// Output Schema
export const ControllersListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.optional(Schema.String),
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type ControllersListOutput = typeof ControllersListOutput.Type;

// The operation
/**
 * Lists the Azure Dev Spaces Controllers in a subscription.
 *
 * Lists all the Azure Dev Spaces Controllers with their properties in the subscription.
 */
export const ControllersList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ControllersListInput,
  outputSchema: ControllersListOutput,
}));
// Input Schema
export const ControllersListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevSpaces/controllers",
    }),
  );
export type ControllersListByResourceGroupInput =
  typeof ControllersListByResourceGroupInput.Type;

// Output Schema
export const ControllersListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ControllersListByResourceGroupOutput =
  typeof ControllersListByResourceGroupOutput.Type;

// The operation
/**
 * Lists the Azure Dev Spaces Controllers in a resource group.
 *
 * Lists all the Azure Dev Spaces Controllers with their properties in the specified resource group and subscription.
 */
export const ControllersListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ControllersListByResourceGroupInput,
    outputSchema: ControllersListByResourceGroupOutput,
  }));
// Input Schema
export const ControllersListConnectionDetailsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevSpaces/controllers/{name}/listConnectionDetails",
    }),
  );
export type ControllersListConnectionDetailsInput =
  typeof ControllersListConnectionDetailsInput.Type;

// Output Schema
export const ControllersListConnectionDetailsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    connectionDetailsList: Schema.optional(
      Schema.Array(
        Schema.Struct({
          orchestratorSpecificConnectionDetails: Schema.optional(
            Schema.Struct({
              instanceType: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    ),
  });
export type ControllersListConnectionDetailsOutput =
  typeof ControllersListConnectionDetailsOutput.Type;

// The operation
/**
 * Lists connection details for an Azure Dev Spaces Controller.
 *
 * Lists connection details for the underlying container resources of an Azure Dev Spaces Controller.
 */
export const ControllersListConnectionDetails =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ControllersListConnectionDetailsInput,
    outputSchema: ControllersListConnectionDetailsOutput,
  }));
// Input Schema
export const ControllersUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevSpaces/controllers/{name}",
  }),
);
export type ControllersUpdateInput = typeof ControllersUpdateInput.Type;

// Output Schema
export const ControllersUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.optional(Schema.String),
  });
export type ControllersUpdateOutput = typeof ControllersUpdateOutput.Type;

// The operation
/**
 * Updates an Azure Dev Spaces Controller.
 *
 * Updates the properties of an existing Azure Dev Spaces Controller with the specified update parameters.
 */
export const ControllersUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ControllersUpdateInput,
  outputSchema: ControllersUpdateOutput,
}));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({ method: "GET", path: "/providers/Microsoft.DevSpaces/operations" }),
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
 * Lists operations for the resource provider.
 *
 * Lists all the supported operations by the Microsoft.DevSpaces resource provider along with their description.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
