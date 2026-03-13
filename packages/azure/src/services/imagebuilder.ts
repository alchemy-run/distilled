/**
 * Azure Imagebuilder API
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
    path: "/providers/Microsoft.VirtualMachineImages/operations",
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
            operation: Schema.optional(Schema.String),
            resource: Schema.optional(Schema.String),
            description: Schema.optional(Schema.String),
          }),
        ),
        origin: Schema.optional(Schema.String),
        properties: Schema.optional(Schema.Unknown),
        isDataAction: Schema.optional(Schema.Boolean),
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type OperationsListOutput = typeof OperationsListOutput.Type;

// The operation
/**
 * Lists available operations for the Microsoft.VirtualMachineImages provider
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const TriggersCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VirtualMachineImages/imageTemplates/{imageTemplateName}/triggers/{triggerName}",
    }),
  );
export type TriggersCreateOrUpdateInput =
  typeof TriggersCreateOrUpdateInput.Type;

// Output Schema
export const TriggersCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type TriggersCreateOrUpdateOutput =
  typeof TriggersCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a trigger for the specified virtual machine image template
 */
export const TriggersCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TriggersCreateOrUpdateInput,
    outputSchema: TriggersCreateOrUpdateOutput,
  }),
);
// Input Schema
export const TriggersDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VirtualMachineImages/imageTemplates/{imageTemplateName}/triggers/{triggerName}",
  }),
);
export type TriggersDeleteInput = typeof TriggersDeleteInput.Type;

// Output Schema
export const TriggersDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type TriggersDeleteOutput = typeof TriggersDeleteOutput.Type;

// The operation
/**
 * Delete a trigger for the specified virtual machine image template
 */
export const TriggersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TriggersDeleteInput,
  outputSchema: TriggersDeleteOutput,
}));
// Input Schema
export const TriggersGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VirtualMachineImages/imageTemplates/{imageTemplateName}/triggers/{triggerName}",
  }),
);
export type TriggersGetInput = typeof TriggersGetInput.Type;

// Output Schema
export const TriggersGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type TriggersGetOutput = typeof TriggersGetOutput.Type;

// The operation
/**
 * Get the specified trigger for the specified image template resource
 */
export const TriggersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TriggersGetInput,
  outputSchema: TriggersGetOutput,
}));
// Input Schema
export const TriggersListByImageTemplateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VirtualMachineImages/imageTemplates/{imageTemplateName}/triggers",
    }),
  );
export type TriggersListByImageTemplateInput =
  typeof TriggersListByImageTemplateInput.Type;

// Output Schema
export const TriggersListByImageTemplateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type TriggersListByImageTemplateOutput =
  typeof TriggersListByImageTemplateOutput.Type;

// The operation
/**
 * List all triggers for the specified Image Template resource
 */
export const TriggersListByImageTemplate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TriggersListByImageTemplateInput,
    outputSchema: TriggersListByImageTemplateOutput,
  }),
);
// Input Schema
export const VirtualMachineImageTemplatesCancelInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VirtualMachineImages/imageTemplates/{imageTemplateName}/cancel",
    }),
  );
export type VirtualMachineImageTemplatesCancelInput =
  typeof VirtualMachineImageTemplatesCancelInput.Type;

// Output Schema
export const VirtualMachineImageTemplatesCancelOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type VirtualMachineImageTemplatesCancelOutput =
  typeof VirtualMachineImageTemplatesCancelOutput.Type;

// The operation
/**
 * Cancel the long running image build based on the image template
 */
export const VirtualMachineImageTemplatesCancel =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VirtualMachineImageTemplatesCancelInput,
    outputSchema: VirtualMachineImageTemplatesCancelOutput,
  }));
// Input Schema
export const VirtualMachineImageTemplatesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VirtualMachineImages/imageTemplates/{imageTemplateName}",
    }),
  );
export type VirtualMachineImageTemplatesCreateOrUpdateInput =
  typeof VirtualMachineImageTemplatesCreateOrUpdateInput.Type;

// Output Schema
export const VirtualMachineImageTemplatesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type VirtualMachineImageTemplatesCreateOrUpdateOutput =
  typeof VirtualMachineImageTemplatesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a virtual machine image template
 */
export const VirtualMachineImageTemplatesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VirtualMachineImageTemplatesCreateOrUpdateInput,
    outputSchema: VirtualMachineImageTemplatesCreateOrUpdateOutput,
  }));
// Input Schema
export const VirtualMachineImageTemplatesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VirtualMachineImages/imageTemplates/{imageTemplateName}",
    }),
  );
export type VirtualMachineImageTemplatesDeleteInput =
  typeof VirtualMachineImageTemplatesDeleteInput.Type;

// Output Schema
export const VirtualMachineImageTemplatesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type VirtualMachineImageTemplatesDeleteOutput =
  typeof VirtualMachineImageTemplatesDeleteOutput.Type;

// The operation
/**
 * Delete a virtual machine image template
 */
export const VirtualMachineImageTemplatesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VirtualMachineImageTemplatesDeleteInput,
    outputSchema: VirtualMachineImageTemplatesDeleteOutput,
  }));
// Input Schema
export const VirtualMachineImageTemplatesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VirtualMachineImages/imageTemplates/{imageTemplateName}",
    }),
  );
export type VirtualMachineImageTemplatesGetInput =
  typeof VirtualMachineImageTemplatesGetInput.Type;

// Output Schema
export const VirtualMachineImageTemplatesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type VirtualMachineImageTemplatesGetOutput =
  typeof VirtualMachineImageTemplatesGetOutput.Type;

// The operation
/**
 * Get information about a virtual machine image template
 */
export const VirtualMachineImageTemplatesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VirtualMachineImageTemplatesGetInput,
    outputSchema: VirtualMachineImageTemplatesGetOutput,
  }));
// Input Schema
export const VirtualMachineImageTemplatesGetRunOutputInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VirtualMachineImages/imageTemplates/{imageTemplateName}/runOutputs/{runOutputName}",
    }),
  );
export type VirtualMachineImageTemplatesGetRunOutputInput =
  typeof VirtualMachineImageTemplatesGetRunOutputInput.Type;

// Output Schema
export const VirtualMachineImageTemplatesGetRunOutputOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type VirtualMachineImageTemplatesGetRunOutputOutput =
  typeof VirtualMachineImageTemplatesGetRunOutputOutput.Type;

// The operation
/**
 * Get the specified run output for the specified image template resource
 */
export const VirtualMachineImageTemplatesGetRunOutput =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VirtualMachineImageTemplatesGetRunOutputInput,
    outputSchema: VirtualMachineImageTemplatesGetRunOutputOutput,
  }));
// Input Schema
export const VirtualMachineImageTemplatesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.VirtualMachineImages/imageTemplates",
    }),
  );
export type VirtualMachineImageTemplatesListInput =
  typeof VirtualMachineImageTemplatesListInput.Type;

// Output Schema
export const VirtualMachineImageTemplatesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type VirtualMachineImageTemplatesListOutput =
  typeof VirtualMachineImageTemplatesListOutput.Type;

// The operation
/**
 * Gets information about the VM image templates associated with the subscription.
 */
export const VirtualMachineImageTemplatesList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VirtualMachineImageTemplatesListInput,
    outputSchema: VirtualMachineImageTemplatesListOutput,
  }));
// Input Schema
export const VirtualMachineImageTemplatesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VirtualMachineImages/imageTemplates",
    }),
  );
export type VirtualMachineImageTemplatesListByResourceGroupInput =
  typeof VirtualMachineImageTemplatesListByResourceGroupInput.Type;

// Output Schema
export const VirtualMachineImageTemplatesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type VirtualMachineImageTemplatesListByResourceGroupOutput =
  typeof VirtualMachineImageTemplatesListByResourceGroupOutput.Type;

// The operation
/**
 * Gets information about the VM image templates associated with the specified resource group.
 */
export const VirtualMachineImageTemplatesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VirtualMachineImageTemplatesListByResourceGroupInput,
    outputSchema: VirtualMachineImageTemplatesListByResourceGroupOutput,
  }));
// Input Schema
export const VirtualMachineImageTemplatesListRunOutputsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VirtualMachineImages/imageTemplates/{imageTemplateName}/runOutputs",
    }),
  );
export type VirtualMachineImageTemplatesListRunOutputsInput =
  typeof VirtualMachineImageTemplatesListRunOutputsInput.Type;

// Output Schema
export const VirtualMachineImageTemplatesListRunOutputsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type VirtualMachineImageTemplatesListRunOutputsOutput =
  typeof VirtualMachineImageTemplatesListRunOutputsOutput.Type;

// The operation
/**
 * List all run outputs for the specified Image Template resource
 */
export const VirtualMachineImageTemplatesListRunOutputs =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VirtualMachineImageTemplatesListRunOutputsInput,
    outputSchema: VirtualMachineImageTemplatesListRunOutputsOutput,
  }));
// Input Schema
export const VirtualMachineImageTemplatesRunInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VirtualMachineImages/imageTemplates/{imageTemplateName}/run",
    }),
  );
export type VirtualMachineImageTemplatesRunInput =
  typeof VirtualMachineImageTemplatesRunInput.Type;

// Output Schema
export const VirtualMachineImageTemplatesRunOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type VirtualMachineImageTemplatesRunOutput =
  typeof VirtualMachineImageTemplatesRunOutput.Type;

// The operation
/**
 * Create artifacts from a existing image template
 */
export const VirtualMachineImageTemplatesRun =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VirtualMachineImageTemplatesRunInput,
    outputSchema: VirtualMachineImageTemplatesRunOutput,
  }));
// Input Schema
export const VirtualMachineImageTemplatesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VirtualMachineImages/imageTemplates/{imageTemplateName}",
    }),
  );
export type VirtualMachineImageTemplatesUpdateInput =
  typeof VirtualMachineImageTemplatesUpdateInput.Type;

// Output Schema
export const VirtualMachineImageTemplatesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type VirtualMachineImageTemplatesUpdateOutput =
  typeof VirtualMachineImageTemplatesUpdateOutput.Type;

// The operation
/**
 * Update the tags for this Virtual Machine Image Template
 */
export const VirtualMachineImageTemplatesUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VirtualMachineImageTemplatesUpdateInput,
    outputSchema: VirtualMachineImageTemplatesUpdateOutput,
  }));
