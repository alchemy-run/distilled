/**
 * Azure Datacatalog API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const ADCCatalogsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataCatalog/catalogs/{catalogName}",
    }),
  );
export type ADCCatalogsCreateOrUpdateInput =
  typeof ADCCatalogsCreateOrUpdateInput.Type;

// Output Schema
export const ADCCatalogsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    etag: Schema.optional(Schema.String),
  });
export type ADCCatalogsCreateOrUpdateOutput =
  typeof ADCCatalogsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or Update Azure Data Catalog service (PUT Resource)
 *
 * The Create Azure Data Catalog service operation creates a new data catalog service with the specified parameters. If the specific service already exists, then any patchable properties will be updated and any immutable properties will remain unchanged.
 */
export const ADCCatalogsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ADCCatalogsCreateOrUpdateInput,
    outputSchema: ADCCatalogsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ADCCatalogsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataCatalog/catalogs/{catalogName}",
  }),
);
export type ADCCatalogsDeleteInput = typeof ADCCatalogsDeleteInput.Type;

// Output Schema
export const ADCCatalogsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ADCCatalogsDeleteOutput = typeof ADCCatalogsDeleteOutput.Type;

// The operation
/**
 * Delete Azure Data Catalog Service (DELETE Resource)
 *
 * The Delete Azure Data Catalog Service operation deletes an existing data catalog.
 */
export const ADCCatalogsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ADCCatalogsDeleteInput,
  outputSchema: ADCCatalogsDeleteOutput,
}));
// Input Schema
export const ADCCatalogsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataCatalog/catalogs/{catalogName}",
  }),
);
export type ADCCatalogsGetInput = typeof ADCCatalogsGetInput.Type;

// Output Schema
export const ADCCatalogsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  etag: Schema.optional(Schema.String),
});
export type ADCCatalogsGetOutput = typeof ADCCatalogsGetOutput.Type;

// The operation
/**
 * Get Azure Data Catalog service (GET Resources)
 *
 * The Get Azure Data Catalog Service operation retrieves a json representation of the data catalog.
 */
export const ADCCatalogsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ADCCatalogsGetInput,
  outputSchema: ADCCatalogsGetOutput,
}));
// Input Schema
export const ADCCatalogsListtByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataCatalog/catalogs",
    }),
  );
export type ADCCatalogsListtByResourceGroupInput =
  typeof ADCCatalogsListtByResourceGroupInput.Type;

// Output Schema
export const ADCCatalogsListtByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          etag: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type ADCCatalogsListtByResourceGroupOutput =
  typeof ADCCatalogsListtByResourceGroupOutput.Type;

// The operation
/**
 * List catalogs in Resource Group (GET Resources)
 *
 * The List catalogs in Resource Group operation lists all the Azure Data Catalogs available under the given resource group.
 */
export const ADCCatalogsListtByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ADCCatalogsListtByResourceGroupInput,
    outputSchema: ADCCatalogsListtByResourceGroupOutput,
  }));
// Input Schema
export const ADCCatalogsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataCatalog/catalogs/{catalogName}",
  }),
);
export type ADCCatalogsUpdateInput = typeof ADCCatalogsUpdateInput.Type;

// Output Schema
export const ADCCatalogsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    etag: Schema.optional(Schema.String),
  });
export type ADCCatalogsUpdateOutput = typeof ADCCatalogsUpdateOutput.Type;

// The operation
/**
 * Update Azure Data Catalog Service (PATCH Resource)
 *
 * The Update Azure Data Catalog Service operation can be used to update the existing deployment. The update call only supports the properties listed in the PATCH body.
 */
export const ADCCatalogsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ADCCatalogsUpdateInput,
  outputSchema: ADCCatalogsUpdateOutput,
}));
// Input Schema
export const ADCOperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.DataCatalog/operations",
  }),
);
export type ADCOperationsListInput = typeof ADCOperationsListInput.Type;

// Output Schema
export const ADCOperationsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          name: Schema.optional(Schema.String),
          display: Schema.optional(
            Schema.Struct({
              description: Schema.optional(Schema.String),
              operation: Schema.optional(Schema.String),
              provider: Schema.optional(Schema.String),
              resource: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    ),
  });
export type ADCOperationsListOutput = typeof ADCOperationsListOutput.Type;

// The operation
/**
 * Lists all the available Azure Data Catalog service operations.
 */
export const ADCOperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ADCOperationsListInput,
  outputSchema: ADCOperationsListOutput,
}));
