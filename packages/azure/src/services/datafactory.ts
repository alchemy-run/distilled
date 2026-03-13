/**
 * Azure Datafactory API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";
import { SensitiveString } from "../sensitive.ts";

// Input Schema
export const ActivityRunsQueryByPipelineRunInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    runId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.DataFactory/factories/{factoryName}/pipelineruns/{runId}/queryActivityruns",
    }),
  );
export type ActivityRunsQueryByPipelineRunInput =
  typeof ActivityRunsQueryByPipelineRunInput.Type;

// Output Schema
export const ActivityRunsQueryByPipelineRunOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        pipelineName: Schema.optional(Schema.String),
        pipelineRunId: Schema.optional(Schema.String),
        activityName: Schema.optional(Schema.String),
        activityType: Schema.optional(Schema.String),
        activityRunId: Schema.optional(Schema.String),
        linkedServiceName: Schema.optional(Schema.String),
        status: Schema.optional(Schema.String),
        activityRunStart: Schema.optional(Schema.String),
        activityRunEnd: Schema.optional(Schema.String),
        durationInMs: Schema.optional(Schema.Number),
        input: Schema.optional(Schema.Unknown),
        output: Schema.optional(Schema.Unknown),
        error: Schema.optional(Schema.Unknown),
      }),
    ),
    continuationToken: Schema.optional(Schema.String),
  });
export type ActivityRunsQueryByPipelineRunOutput =
  typeof ActivityRunsQueryByPipelineRunOutput.Type;

// The operation
/**
 * Query activity runs based on input filter conditions.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param runId - The pipeline run identifier.
 */
export const ActivityRunsQueryByPipelineRun =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ActivityRunsQueryByPipelineRunInput,
    outputSchema: ActivityRunsQueryByPipelineRunOutput,
  }));
// Input Schema
export const ChangeDataCaptureCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    changeDataCaptureName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/adfcdcs/{changeDataCaptureName}",
    }),
  );
export type ChangeDataCaptureCreateOrUpdateInput =
  typeof ChangeDataCaptureCreateOrUpdateInput.Type;

// Output Schema
export const ChangeDataCaptureCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ChangeDataCaptureCreateOrUpdateOutput =
  typeof ChangeDataCaptureCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a change data capture resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param changeDataCaptureName - The change data capture name.
 * @param if-match - ETag of the change data capture entity. Should only be specified for update, for which it should match existing entity or can be * for unconditional update.
 */
export const ChangeDataCaptureCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ChangeDataCaptureCreateOrUpdateInput,
    outputSchema: ChangeDataCaptureCreateOrUpdateOutput,
  }));
// Input Schema
export const ChangeDataCaptureDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    changeDataCaptureName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/adfcdcs/{changeDataCaptureName}",
    }),
  );
export type ChangeDataCaptureDeleteInput =
  typeof ChangeDataCaptureDeleteInput.Type;

// Output Schema
export const ChangeDataCaptureDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ChangeDataCaptureDeleteOutput =
  typeof ChangeDataCaptureDeleteOutput.Type;

// The operation
/**
 * Deletes a change data capture.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param changeDataCaptureName - The change data capture name.
 */
export const ChangeDataCaptureDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ChangeDataCaptureDeleteInput,
    outputSchema: ChangeDataCaptureDeleteOutput,
  }),
);
// Input Schema
export const ChangeDataCaptureGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    changeDataCaptureName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/adfcdcs/{changeDataCaptureName}",
    }),
  );
export type ChangeDataCaptureGetInput = typeof ChangeDataCaptureGetInput.Type;

// Output Schema
export const ChangeDataCaptureGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ChangeDataCaptureGetOutput = typeof ChangeDataCaptureGetOutput.Type;

// The operation
/**
 * Gets a change data capture.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param changeDataCaptureName - The change data capture name.
 * @param if-none-match - ETag of the change data capture entity. Should only be specified for get. If the ETag matches the existing entity tag, or if * was provided, then no content will be returned.
 */
export const ChangeDataCaptureGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ChangeDataCaptureGetInput,
    outputSchema: ChangeDataCaptureGetOutput,
  }),
);
// Input Schema
export const ChangeDataCaptureListByFactoryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/adfcdcs",
    }),
  );
export type ChangeDataCaptureListByFactoryInput =
  typeof ChangeDataCaptureListByFactoryInput.Type;

// Output Schema
export const ChangeDataCaptureListByFactoryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ChangeDataCaptureListByFactoryOutput =
  typeof ChangeDataCaptureListByFactoryOutput.Type;

// The operation
/**
 * Lists all resources of type change data capture.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 */
export const ChangeDataCaptureListByFactory =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ChangeDataCaptureListByFactoryInput,
    outputSchema: ChangeDataCaptureListByFactoryOutput,
  }));
// Input Schema
export const ChangeDataCaptureStartInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    changeDataCaptureName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/adfcdcs/{changeDataCaptureName}/start",
    }),
  );
export type ChangeDataCaptureStartInput =
  typeof ChangeDataCaptureStartInput.Type;

// Output Schema
export const ChangeDataCaptureStartOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ChangeDataCaptureStartOutput =
  typeof ChangeDataCaptureStartOutput.Type;

// The operation
/**
 * Starts a change data capture.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param changeDataCaptureName - The change data capture name.
 */
export const ChangeDataCaptureStart = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ChangeDataCaptureStartInput,
    outputSchema: ChangeDataCaptureStartOutput,
  }),
);
// Input Schema
export const ChangeDataCaptureStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    changeDataCaptureName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/adfcdcs/{changeDataCaptureName}/status",
    }),
  );
export type ChangeDataCaptureStatusInput =
  typeof ChangeDataCaptureStatusInput.Type;

// Output Schema
export const ChangeDataCaptureStatusOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.String;
export type ChangeDataCaptureStatusOutput =
  typeof ChangeDataCaptureStatusOutput.Type;

// The operation
/**
 * Gets the current status for the change data capture resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param changeDataCaptureName - The change data capture name.
 */
export const ChangeDataCaptureStatus = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ChangeDataCaptureStatusInput,
    outputSchema: ChangeDataCaptureStatusOutput,
  }),
);
// Input Schema
export const ChangeDataCaptureStopInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    changeDataCaptureName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/adfcdcs/{changeDataCaptureName}/stop",
    }),
  );
export type ChangeDataCaptureStopInput = typeof ChangeDataCaptureStopInput.Type;

// Output Schema
export const ChangeDataCaptureStopOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ChangeDataCaptureStopOutput =
  typeof ChangeDataCaptureStopOutput.Type;

// The operation
/**
 * Stops a change data capture.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param changeDataCaptureName - The change data capture name.
 */
export const ChangeDataCaptureStop = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ChangeDataCaptureStopInput,
    outputSchema: ChangeDataCaptureStopOutput,
  }),
);
// Input Schema
export const CredentialOperationsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    credentialName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/credentials/{credentialName}",
    }),
  );
export type CredentialOperationsCreateOrUpdateInput =
  typeof CredentialOperationsCreateOrUpdateInput.Type;

// Output Schema
export const CredentialOperationsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type CredentialOperationsCreateOrUpdateOutput =
  typeof CredentialOperationsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a credential.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param credentialName - Credential name
 * @param if-match - ETag of the credential entity. Should only be specified for update, for which it should match existing entity or can be * for unconditional update.
 */
export const CredentialOperationsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CredentialOperationsCreateOrUpdateInput,
    outputSchema: CredentialOperationsCreateOrUpdateOutput,
  }));
// Input Schema
export const CredentialOperationsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    credentialName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/credentials/{credentialName}",
    }),
  );
export type CredentialOperationsDeleteInput =
  typeof CredentialOperationsDeleteInput.Type;

// Output Schema
export const CredentialOperationsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CredentialOperationsDeleteOutput =
  typeof CredentialOperationsDeleteOutput.Type;

// The operation
/**
 * Deletes a credential.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param credentialName - Credential name
 */
export const CredentialOperationsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CredentialOperationsDeleteInput,
    outputSchema: CredentialOperationsDeleteOutput,
  }),
);
// Input Schema
export const CredentialOperationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    credentialName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/credentials/{credentialName}",
    }),
  );
export type CredentialOperationsGetInput =
  typeof CredentialOperationsGetInput.Type;

// Output Schema
export const CredentialOperationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type CredentialOperationsGetOutput =
  typeof CredentialOperationsGetOutput.Type;

// The operation
/**
 * Gets a credential.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param credentialName - Credential name
 * @param if-none-match - ETag of the credential entity. Should only be specified for get. If the ETag matches the existing entity tag, or if * was provided, then no content will be returned.
 */
export const CredentialOperationsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CredentialOperationsGetInput,
    outputSchema: CredentialOperationsGetOutput,
  }),
);
// Input Schema
export const CredentialOperationsListByFactoryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/credentials",
    }),
  );
export type CredentialOperationsListByFactoryInput =
  typeof CredentialOperationsListByFactoryInput.Type;

// Output Schema
export const CredentialOperationsListByFactoryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type CredentialOperationsListByFactoryOutput =
  typeof CredentialOperationsListByFactoryOutput.Type;

// The operation
/**
 * List credentials.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 */
export const CredentialOperationsListByFactory =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CredentialOperationsListByFactoryInput,
    outputSchema: CredentialOperationsListByFactoryOutput,
  }));
// Input Schema
export const DataFlowDebugSessionAddDataFlowInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/addDataFlowToDebugSession",
    }),
  );
export type DataFlowDebugSessionAddDataFlowInput =
  typeof DataFlowDebugSessionAddDataFlowInput.Type;

// Output Schema
export const DataFlowDebugSessionAddDataFlowOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    jobVersion: Schema.optional(Schema.String),
  });
export type DataFlowDebugSessionAddDataFlowOutput =
  typeof DataFlowDebugSessionAddDataFlowOutput.Type;

// The operation
/**
 * Add a data flow into debug session.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 */
export const DataFlowDebugSessionAddDataFlow =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DataFlowDebugSessionAddDataFlowInput,
    outputSchema: DataFlowDebugSessionAddDataFlowOutput,
  }));
// Input Schema
export const DataFlowDebugSessionCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/createDataFlowDebugSession",
    }),
  );
export type DataFlowDebugSessionCreateInput =
  typeof DataFlowDebugSessionCreateInput.Type;

// Output Schema
export const DataFlowDebugSessionCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    status: Schema.optional(Schema.String),
    sessionId: Schema.optional(Schema.String),
  });
export type DataFlowDebugSessionCreateOutput =
  typeof DataFlowDebugSessionCreateOutput.Type;

// The operation
/**
 * Creates a data flow debug session.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 */
export const DataFlowDebugSessionCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DataFlowDebugSessionCreateInput,
    outputSchema: DataFlowDebugSessionCreateOutput,
  }),
);
// Input Schema
export const DataFlowDebugSessionDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/deleteDataFlowDebugSession",
    }),
  );
export type DataFlowDebugSessionDeleteInput =
  typeof DataFlowDebugSessionDeleteInput.Type;

// Output Schema
export const DataFlowDebugSessionDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DataFlowDebugSessionDeleteOutput =
  typeof DataFlowDebugSessionDeleteOutput.Type;

// The operation
/**
 * Deletes a data flow debug session.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 */
export const DataFlowDebugSessionDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DataFlowDebugSessionDeleteInput,
    outputSchema: DataFlowDebugSessionDeleteOutput,
  }),
);
// Input Schema
export const DataFlowDebugSessionExecuteCommandInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/executeDataFlowDebugCommand",
    }),
  );
export type DataFlowDebugSessionExecuteCommandInput =
  typeof DataFlowDebugSessionExecuteCommandInput.Type;

// Output Schema
export const DataFlowDebugSessionExecuteCommandOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    status: Schema.optional(Schema.String),
    data: Schema.optional(Schema.String),
  });
export type DataFlowDebugSessionExecuteCommandOutput =
  typeof DataFlowDebugSessionExecuteCommandOutput.Type;

// The operation
/**
 * Execute a data flow debug command.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 */
export const DataFlowDebugSessionExecuteCommand =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DataFlowDebugSessionExecuteCommandInput,
    outputSchema: DataFlowDebugSessionExecuteCommandOutput,
  }));
// Input Schema
export const DataFlowDebugSessionQueryByFactoryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/queryDataFlowDebugSessions",
    }),
  );
export type DataFlowDebugSessionQueryByFactoryInput =
  typeof DataFlowDebugSessionQueryByFactoryInput.Type;

// Output Schema
export const DataFlowDebugSessionQueryByFactoryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        dataFlowName: Schema.optional(Schema.String),
        computeType: Schema.optional(Schema.String),
        coreCount: Schema.optional(Schema.Number),
        nodeCount: Schema.optional(Schema.Number),
        integrationRuntimeName: Schema.optional(Schema.String),
        sessionId: Schema.optional(Schema.String),
        startTime: Schema.optional(Schema.String),
        timeToLiveInMinutes: Schema.optional(Schema.Number),
        lastActivityTime: Schema.optional(Schema.String),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DataFlowDebugSessionQueryByFactoryOutput =
  typeof DataFlowDebugSessionQueryByFactoryOutput.Type;

// The operation
/**
 * Query all active data flow debug sessions.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 */
export const DataFlowDebugSessionQueryByFactory =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DataFlowDebugSessionQueryByFactoryInput,
    outputSchema: DataFlowDebugSessionQueryByFactoryOutput,
  }));
// Input Schema
export const DataFlowsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    dataFlowName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/dataflows/{dataFlowName}",
    }),
  );
export type DataFlowsCreateOrUpdateInput =
  typeof DataFlowsCreateOrUpdateInput.Type;

// Output Schema
export const DataFlowsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DataFlowsCreateOrUpdateOutput =
  typeof DataFlowsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a data flow.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param dataFlowName - The data flow name.
 * @param if-match - ETag of the data flow entity. Should only be specified for update, for which it should match existing entity or can be * for unconditional update.
 */
export const DataFlowsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DataFlowsCreateOrUpdateInput,
    outputSchema: DataFlowsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const DataFlowsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  factoryName: Schema.String.pipe(T.PathParam()),
  dataFlowName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/dataflows/{dataFlowName}",
  }),
);
export type DataFlowsDeleteInput = typeof DataFlowsDeleteInput.Type;

// Output Schema
export const DataFlowsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DataFlowsDeleteOutput = typeof DataFlowsDeleteOutput.Type;

// The operation
/**
 * Deletes a data flow.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param dataFlowName - The data flow name.
 */
export const DataFlowsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DataFlowsDeleteInput,
  outputSchema: DataFlowsDeleteOutput,
}));
// Input Schema
export const DataFlowsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  factoryName: Schema.String.pipe(T.PathParam()),
  dataFlowName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/dataflows/{dataFlowName}",
  }),
);
export type DataFlowsGetInput = typeof DataFlowsGetInput.Type;

// Output Schema
export const DataFlowsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DataFlowsGetOutput = typeof DataFlowsGetOutput.Type;

// The operation
/**
 * Gets a data flow.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param dataFlowName - The data flow name.
 * @param if-none-match - ETag of the data flow entity. Should only be specified for get. If the ETag matches the existing entity tag, or if * was provided, then no content will be returned.
 */
export const DataFlowsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DataFlowsGetInput,
  outputSchema: DataFlowsGetOutput,
}));
// Input Schema
export const DataFlowsListByFactoryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/dataflows",
    }),
  );
export type DataFlowsListByFactoryInput =
  typeof DataFlowsListByFactoryInput.Type;

// Output Schema
export const DataFlowsListByFactoryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type DataFlowsListByFactoryOutput =
  typeof DataFlowsListByFactoryOutput.Type;

// The operation
/**
 * Lists data flows.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 */
export const DataFlowsListByFactory = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DataFlowsListByFactoryInput,
    outputSchema: DataFlowsListByFactoryOutput,
  }),
);
// Input Schema
export const DatasetsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    datasetName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/datasets/{datasetName}",
    }),
  );
export type DatasetsCreateOrUpdateInput =
  typeof DatasetsCreateOrUpdateInput.Type;

// Output Schema
export const DatasetsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DatasetsCreateOrUpdateOutput =
  typeof DatasetsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a dataset.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param datasetName - The dataset name.
 * @param if-match - ETag of the dataset entity.  Should only be specified for update, for which it should match existing entity or can be * for unconditional update.
 */
export const DatasetsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DatasetsCreateOrUpdateInput,
    outputSchema: DatasetsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const DatasetsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  factoryName: Schema.String.pipe(T.PathParam()),
  datasetName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/datasets/{datasetName}",
  }),
);
export type DatasetsDeleteInput = typeof DatasetsDeleteInput.Type;

// Output Schema
export const DatasetsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DatasetsDeleteOutput = typeof DatasetsDeleteOutput.Type;

// The operation
/**
 * Deletes a dataset.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param datasetName - The dataset name.
 */
export const DatasetsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DatasetsDeleteInput,
  outputSchema: DatasetsDeleteOutput,
}));
// Input Schema
export const DatasetsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  factoryName: Schema.String.pipe(T.PathParam()),
  datasetName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/datasets/{datasetName}",
  }),
);
export type DatasetsGetInput = typeof DatasetsGetInput.Type;

// Output Schema
export const DatasetsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DatasetsGetOutput = typeof DatasetsGetOutput.Type;

// The operation
/**
 * Gets a dataset.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param datasetName - The dataset name.
 * @param if-none-match - ETag of the dataset entity. Should only be specified for get. If the ETag matches the existing entity tag, or if * was provided, then no content will be returned.
 */
export const DatasetsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DatasetsGetInput,
  outputSchema: DatasetsGetOutput,
}));
// Input Schema
export const DatasetsListByFactoryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/datasets",
    }),
  );
export type DatasetsListByFactoryInput = typeof DatasetsListByFactoryInput.Type;

// Output Schema
export const DatasetsListByFactoryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type DatasetsListByFactoryOutput =
  typeof DatasetsListByFactoryOutput.Type;

// The operation
/**
 * Lists datasets.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 */
export const DatasetsListByFactory = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DatasetsListByFactoryInput,
    outputSchema: DatasetsListByFactoryOutput,
  }),
);
// Input Schema
export const ExposureControlGetFeatureValueInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    locationId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DataFactory/locations/{locationId}/getFeatureValue",
    }),
  );
export type ExposureControlGetFeatureValueInput =
  typeof ExposureControlGetFeatureValueInput.Type;

// Output Schema
export const ExposureControlGetFeatureValueOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    featureName: Schema.optional(Schema.String),
    value: Schema.optional(Schema.String),
  });
export type ExposureControlGetFeatureValueOutput =
  typeof ExposureControlGetFeatureValueOutput.Type;

// The operation
/**
 * Get exposure control feature for specific location.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param locationId - The location identifier.
 */
export const ExposureControlGetFeatureValue =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ExposureControlGetFeatureValueInput,
    outputSchema: ExposureControlGetFeatureValueOutput,
  }));
// Input Schema
export const ExposureControlGetFeatureValueByFactoryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/getFeatureValue",
    }),
  );
export type ExposureControlGetFeatureValueByFactoryInput =
  typeof ExposureControlGetFeatureValueByFactoryInput.Type;

// Output Schema
export const ExposureControlGetFeatureValueByFactoryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    featureName: Schema.optional(Schema.String),
    value: Schema.optional(Schema.String),
  });
export type ExposureControlGetFeatureValueByFactoryOutput =
  typeof ExposureControlGetFeatureValueByFactoryOutput.Type;

// The operation
/**
 * Get exposure control feature for specific factory.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 */
export const ExposureControlGetFeatureValueByFactory =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ExposureControlGetFeatureValueByFactoryInput,
    outputSchema: ExposureControlGetFeatureValueByFactoryOutput,
  }));
// Input Schema
export const ExposureControlQueryFeatureValuesByFactoryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/queryFeaturesValue",
    }),
  );
export type ExposureControlQueryFeatureValuesByFactoryInput =
  typeof ExposureControlQueryFeatureValuesByFactoryInput.Type;

// Output Schema
export const ExposureControlQueryFeatureValuesByFactoryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    exposureControlResponses: Schema.Array(
      Schema.Struct({
        featureName: Schema.optional(Schema.String),
        value: Schema.optional(Schema.String),
      }),
    ),
  });
export type ExposureControlQueryFeatureValuesByFactoryOutput =
  typeof ExposureControlQueryFeatureValuesByFactoryOutput.Type;

// The operation
/**
 * Get list of exposure control features for specific factory.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 */
export const ExposureControlQueryFeatureValuesByFactory =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ExposureControlQueryFeatureValuesByFactoryInput,
    outputSchema: ExposureControlQueryFeatureValuesByFactoryOutput,
  }));
// Input Schema
export const FactoriesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  factoryName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}",
  }),
);
export type FactoriesDeleteInput = typeof FactoriesDeleteInput.Type;

// Output Schema
export const FactoriesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type FactoriesDeleteOutput = typeof FactoriesDeleteOutput.Type;

// The operation
/**
 * Deletes a factory.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 */
export const FactoriesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FactoriesDeleteInput,
  outputSchema: FactoriesDeleteOutput,
}));
// Input Schema
export const FactoriesGetDataPlaneAccessInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/getDataPlaneAccess",
    }),
  );
export type FactoriesGetDataPlaneAccessInput =
  typeof FactoriesGetDataPlaneAccessInput.Type;

// Output Schema
export const FactoriesGetDataPlaneAccessOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    policy: Schema.optional(
      Schema.Struct({
        permissions: Schema.optional(Schema.String),
        accessResourcePath: Schema.optional(Schema.String),
        profileName: Schema.optional(Schema.String),
        startTime: Schema.optional(Schema.String),
        expireTime: Schema.optional(Schema.String),
      }),
    ),
    accessToken: Schema.optional(SensitiveString),
    dataPlaneUrl: Schema.optional(Schema.String),
  });
export type FactoriesGetDataPlaneAccessOutput =
  typeof FactoriesGetDataPlaneAccessOutput.Type;

// The operation
/**
 * Get Data Plane access.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 */
export const FactoriesGetDataPlaneAccess = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FactoriesGetDataPlaneAccessInput,
    outputSchema: FactoriesGetDataPlaneAccessOutput,
  }),
);
// Input Schema
export const FactoriesGetGitHubAccessTokenInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/getGitHubAccessToken",
    }),
  );
export type FactoriesGetGitHubAccessTokenInput =
  typeof FactoriesGetGitHubAccessTokenInput.Type;

// Output Schema
export const FactoriesGetGitHubAccessTokenOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    gitHubAccessToken: Schema.optional(Schema.String),
  });
export type FactoriesGetGitHubAccessTokenOutput =
  typeof FactoriesGetGitHubAccessTokenOutput.Type;

// The operation
/**
 * Get GitHub Access Token.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 */
export const FactoriesGetGitHubAccessToken =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FactoriesGetGitHubAccessTokenInput,
    outputSchema: FactoriesGetGitHubAccessTokenOutput,
  }));
// Input Schema
export const GlobalParametersCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    globalParameterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/globalParameters/{globalParameterName}",
    }),
  );
export type GlobalParametersCreateOrUpdateInput =
  typeof GlobalParametersCreateOrUpdateInput.Type;

// Output Schema
export const GlobalParametersCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type GlobalParametersCreateOrUpdateOutput =
  typeof GlobalParametersCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a Global parameter
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param globalParameterName - The global parameter name.
 */
export const GlobalParametersCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GlobalParametersCreateOrUpdateInput,
    outputSchema: GlobalParametersCreateOrUpdateOutput,
  }));
// Input Schema
export const GlobalParametersDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    globalParameterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/globalParameters/{globalParameterName}",
    }),
  );
export type GlobalParametersDeleteInput =
  typeof GlobalParametersDeleteInput.Type;

// Output Schema
export const GlobalParametersDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GlobalParametersDeleteOutput =
  typeof GlobalParametersDeleteOutput.Type;

// The operation
/**
 * Deletes a Global parameter
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param globalParameterName - The global parameter name.
 */
export const GlobalParametersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GlobalParametersDeleteInput,
    outputSchema: GlobalParametersDeleteOutput,
  }),
);
// Input Schema
export const GlobalParametersGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    globalParameterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/globalParameters/{globalParameterName}",
    }),
  );
export type GlobalParametersGetInput = typeof GlobalParametersGetInput.Type;

// Output Schema
export const GlobalParametersGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type GlobalParametersGetOutput = typeof GlobalParametersGetOutput.Type;

// The operation
/**
 * Gets a Global parameter
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param globalParameterName - The global parameter name.
 */
export const GlobalParametersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GlobalParametersGetInput,
  outputSchema: GlobalParametersGetOutput,
}));
// Input Schema
export const GlobalParametersListByFactoryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/globalParameters",
    }),
  );
export type GlobalParametersListByFactoryInput =
  typeof GlobalParametersListByFactoryInput.Type;

// Output Schema
export const GlobalParametersListByFactoryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type GlobalParametersListByFactoryOutput =
  typeof GlobalParametersListByFactoryOutput.Type;

// The operation
/**
 * Lists Global parameters
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 */
export const GlobalParametersListByFactory =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GlobalParametersListByFactoryInput,
    outputSchema: GlobalParametersListByFactoryOutput,
  }));
// Input Schema
export const IntegrationRuntimeDisableInteractiveQueryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    integrationRuntimeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}/disableInteractiveQuery",
    }),
  );
export type IntegrationRuntimeDisableInteractiveQueryInput =
  typeof IntegrationRuntimeDisableInteractiveQueryInput.Type;

// Output Schema
export const IntegrationRuntimeDisableInteractiveQueryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type IntegrationRuntimeDisableInteractiveQueryOutput =
  typeof IntegrationRuntimeDisableInteractiveQueryOutput.Type;

// The operation
/**
 * Disable interactive authoring of Managed Virtual Network integration runtime.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param integrationRuntimeName - The integration runtime name.
 */
export const IntegrationRuntimeDisableInteractiveQuery =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationRuntimeDisableInteractiveQueryInput,
    outputSchema: IntegrationRuntimeDisableInteractiveQueryOutput,
  }));
// Input Schema
export const IntegrationRuntimeEnableInteractiveQueryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    integrationRuntimeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}/enableInteractiveQuery",
    }),
  );
export type IntegrationRuntimeEnableInteractiveQueryInput =
  typeof IntegrationRuntimeEnableInteractiveQueryInput.Type;

// Output Schema
export const IntegrationRuntimeEnableInteractiveQueryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type IntegrationRuntimeEnableInteractiveQueryOutput =
  typeof IntegrationRuntimeEnableInteractiveQueryOutput.Type;

// The operation
/**
 * Enable interactive authoring of Managed Virtual Network integration runtime.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param integrationRuntimeName - The integration runtime name.
 */
export const IntegrationRuntimeEnableInteractiveQuery =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationRuntimeEnableInteractiveQueryInput,
    outputSchema: IntegrationRuntimeEnableInteractiveQueryOutput,
  }));
// Input Schema
export const IntegrationRuntimeNodesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    integrationRuntimeName: Schema.String.pipe(T.PathParam()),
    nodeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}/nodes/{nodeName}",
    }),
  );
export type IntegrationRuntimeNodesDeleteInput =
  typeof IntegrationRuntimeNodesDeleteInput.Type;

// Output Schema
export const IntegrationRuntimeNodesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type IntegrationRuntimeNodesDeleteOutput =
  typeof IntegrationRuntimeNodesDeleteOutput.Type;

// The operation
/**
 * Deletes a self-hosted integration runtime node.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param nodeName - The integration runtime node name.
 */
export const IntegrationRuntimeNodesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationRuntimeNodesDeleteInput,
    outputSchema: IntegrationRuntimeNodesDeleteOutput,
  }));
// Input Schema
export const IntegrationRuntimeNodesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    integrationRuntimeName: Schema.String.pipe(T.PathParam()),
    nodeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}/nodes/{nodeName}",
    }),
  );
export type IntegrationRuntimeNodesGetInput =
  typeof IntegrationRuntimeNodesGetInput.Type;

// Output Schema
export const IntegrationRuntimeNodesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nodeName: Schema.optional(Schema.String),
    machineName: Schema.optional(Schema.String),
    hostServiceUri: Schema.optional(Schema.String),
    status: Schema.optional(
      Schema.Literals([
        "NeedRegistration",
        "Online",
        "Limited",
        "Offline",
        "Upgrading",
        "Initializing",
        "InitializeFailed",
      ]),
    ),
    capabilities: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    versionStatus: Schema.optional(Schema.String),
    version: Schema.optional(Schema.String),
    registerTime: Schema.optional(Schema.String),
    lastConnectTime: Schema.optional(Schema.String),
    expiryTime: Schema.optional(Schema.String),
    lastStartTime: Schema.optional(Schema.String),
    lastStopTime: Schema.optional(Schema.String),
    lastUpdateResult: Schema.optional(
      Schema.Literals(["None", "Succeed", "Fail"]),
    ),
    lastStartUpdateTime: Schema.optional(Schema.String),
    lastEndUpdateTime: Schema.optional(Schema.String),
    isActiveDispatcher: Schema.optional(Schema.Boolean),
    concurrentJobsLimit: Schema.optional(Schema.Number),
    maxConcurrentJobs: Schema.optional(Schema.Number),
  });
export type IntegrationRuntimeNodesGetOutput =
  typeof IntegrationRuntimeNodesGetOutput.Type;

// The operation
/**
 * Gets a self-hosted integration runtime node.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param nodeName - The integration runtime node name.
 */
export const IntegrationRuntimeNodesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IntegrationRuntimeNodesGetInput,
    outputSchema: IntegrationRuntimeNodesGetOutput,
  }),
);
// Input Schema
export const IntegrationRuntimeNodesGetIpAddressInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    integrationRuntimeName: Schema.String.pipe(T.PathParam()),
    nodeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}/nodes/{nodeName}/ipAddress",
    }),
  );
export type IntegrationRuntimeNodesGetIpAddressInput =
  typeof IntegrationRuntimeNodesGetIpAddressInput.Type;

// Output Schema
export const IntegrationRuntimeNodesGetIpAddressOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ipAddress: Schema.optional(Schema.String),
  });
export type IntegrationRuntimeNodesGetIpAddressOutput =
  typeof IntegrationRuntimeNodesGetIpAddressOutput.Type;

// The operation
/**
 * Get the IP address of self-hosted integration runtime node.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param nodeName - The integration runtime node name.
 */
export const IntegrationRuntimeNodesGetIpAddress =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationRuntimeNodesGetIpAddressInput,
    outputSchema: IntegrationRuntimeNodesGetIpAddressOutput,
  }));
// Input Schema
export const IntegrationRuntimeNodesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    integrationRuntimeName: Schema.String.pipe(T.PathParam()),
    nodeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}/nodes/{nodeName}",
    }),
  );
export type IntegrationRuntimeNodesUpdateInput =
  typeof IntegrationRuntimeNodesUpdateInput.Type;

// Output Schema
export const IntegrationRuntimeNodesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nodeName: Schema.optional(Schema.String),
    machineName: Schema.optional(Schema.String),
    hostServiceUri: Schema.optional(Schema.String),
    status: Schema.optional(
      Schema.Literals([
        "NeedRegistration",
        "Online",
        "Limited",
        "Offline",
        "Upgrading",
        "Initializing",
        "InitializeFailed",
      ]),
    ),
    capabilities: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    versionStatus: Schema.optional(Schema.String),
    version: Schema.optional(Schema.String),
    registerTime: Schema.optional(Schema.String),
    lastConnectTime: Schema.optional(Schema.String),
    expiryTime: Schema.optional(Schema.String),
    lastStartTime: Schema.optional(Schema.String),
    lastStopTime: Schema.optional(Schema.String),
    lastUpdateResult: Schema.optional(
      Schema.Literals(["None", "Succeed", "Fail"]),
    ),
    lastStartUpdateTime: Schema.optional(Schema.String),
    lastEndUpdateTime: Schema.optional(Schema.String),
    isActiveDispatcher: Schema.optional(Schema.Boolean),
    concurrentJobsLimit: Schema.optional(Schema.Number),
    maxConcurrentJobs: Schema.optional(Schema.Number),
  });
export type IntegrationRuntimeNodesUpdateOutput =
  typeof IntegrationRuntimeNodesUpdateOutput.Type;

// The operation
/**
 * Updates a self-hosted integration runtime node.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param nodeName - The integration runtime node name.
 */
export const IntegrationRuntimeNodesUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationRuntimeNodesUpdateInput,
    outputSchema: IntegrationRuntimeNodesUpdateOutput,
  }));
// Input Schema
export const IntegrationRuntimeObjectMetadataGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    integrationRuntimeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}/getObjectMetadata",
    }),
  );
export type IntegrationRuntimeObjectMetadataGetInput =
  typeof IntegrationRuntimeObjectMetadataGetInput.Type;

// Output Schema
export const IntegrationRuntimeObjectMetadataGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        type: Schema.Literals(["Folder", "Project", "Package", "Environment"]),
        id: Schema.optional(Schema.Number),
        name: Schema.optional(Schema.String),
        description: Schema.optional(Schema.String),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type IntegrationRuntimeObjectMetadataGetOutput =
  typeof IntegrationRuntimeObjectMetadataGetOutput.Type;

// The operation
/**
 * Get a SSIS integration runtime object metadata by specified path. The return is pageable metadata list.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param integrationRuntimeName - The integration runtime name.
 */
export const IntegrationRuntimeObjectMetadataGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationRuntimeObjectMetadataGetInput,
    outputSchema: IntegrationRuntimeObjectMetadataGetOutput,
  }));
// Input Schema
export const IntegrationRuntimeObjectMetadataRefreshInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    integrationRuntimeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}/refreshObjectMetadata",
    }),
  );
export type IntegrationRuntimeObjectMetadataRefreshInput =
  typeof IntegrationRuntimeObjectMetadataRefreshInput.Type;

// Output Schema
export const IntegrationRuntimeObjectMetadataRefreshOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    status: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    properties: Schema.optional(Schema.String),
    error: Schema.optional(Schema.String),
  });
export type IntegrationRuntimeObjectMetadataRefreshOutput =
  typeof IntegrationRuntimeObjectMetadataRefreshOutput.Type;

// The operation
/**
 * Refresh a SSIS integration runtime object metadata.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param integrationRuntimeName - The integration runtime name.
 */
export const IntegrationRuntimeObjectMetadataRefresh =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationRuntimeObjectMetadataRefreshInput,
    outputSchema: IntegrationRuntimeObjectMetadataRefreshOutput,
  }));
// Input Schema
export const IntegrationRuntimesCreateLinkedIntegrationRuntimeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    integrationRuntimeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}/linkedIntegrationRuntime",
    }),
  );
export type IntegrationRuntimesCreateLinkedIntegrationRuntimeInput =
  typeof IntegrationRuntimesCreateLinkedIntegrationRuntimeInput.Type;

// Output Schema
export const IntegrationRuntimesCreateLinkedIntegrationRuntimeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.optional(Schema.String),
    properties: Schema.Struct({
      type: Schema.Literals(["Managed", "SelfHosted"]),
      dataFactoryName: Schema.optional(Schema.String),
      state: Schema.optional(
        Schema.Literals([
          "Initial",
          "Stopped",
          "Started",
          "Starting",
          "Stopping",
          "NeedRegistration",
          "Online",
          "Limited",
          "Offline",
          "AccessDenied",
        ]),
      ),
    }),
  });
export type IntegrationRuntimesCreateLinkedIntegrationRuntimeOutput =
  typeof IntegrationRuntimesCreateLinkedIntegrationRuntimeOutput.Type;

// The operation
/**
 * Create a linked integration runtime entry in a shared integration runtime.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param integrationRuntimeName - The integration runtime name.
 */
export const IntegrationRuntimesCreateLinkedIntegrationRuntime =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationRuntimesCreateLinkedIntegrationRuntimeInput,
    outputSchema: IntegrationRuntimesCreateLinkedIntegrationRuntimeOutput,
  }));
// Input Schema
export const IntegrationRuntimesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    integrationRuntimeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}",
    }),
  );
export type IntegrationRuntimesCreateOrUpdateInput =
  typeof IntegrationRuntimesCreateOrUpdateInput.Type;

// Output Schema
export const IntegrationRuntimesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type IntegrationRuntimesCreateOrUpdateOutput =
  typeof IntegrationRuntimesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates an integration runtime.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param integrationRuntimeName - The integration runtime name.
 * @param if-match - ETag of the integration runtime entity. Should only be specified for update, for which it should match existing entity or can be * for unconditional update.
 */
export const IntegrationRuntimesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationRuntimesCreateOrUpdateInput,
    outputSchema: IntegrationRuntimesCreateOrUpdateOutput,
  }));
// Input Schema
export const IntegrationRuntimesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    integrationRuntimeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}",
    }),
  );
export type IntegrationRuntimesDeleteInput =
  typeof IntegrationRuntimesDeleteInput.Type;

// Output Schema
export const IntegrationRuntimesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type IntegrationRuntimesDeleteOutput =
  typeof IntegrationRuntimesDeleteOutput.Type;

// The operation
/**
 * Deletes an integration runtime.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param integrationRuntimeName - The integration runtime name.
 */
export const IntegrationRuntimesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IntegrationRuntimesDeleteInput,
    outputSchema: IntegrationRuntimesDeleteOutput,
  }),
);
// Input Schema
export const IntegrationRuntimesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    integrationRuntimeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}",
    }),
  );
export type IntegrationRuntimesGetInput =
  typeof IntegrationRuntimesGetInput.Type;

// Output Schema
export const IntegrationRuntimesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type IntegrationRuntimesGetOutput =
  typeof IntegrationRuntimesGetOutput.Type;

// The operation
/**
 * Gets an integration runtime.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param integrationRuntimeName - The integration runtime name.
 * @param if-none-match - ETag of the integration runtime entity. Should only be specified for get. If the ETag matches the existing entity tag, or if * was provided, then no content will be returned.
 */
export const IntegrationRuntimesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IntegrationRuntimesGetInput,
    outputSchema: IntegrationRuntimesGetOutput,
  }),
);
// Input Schema
export const IntegrationRuntimesGetConnectionInfoInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    integrationRuntimeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}/getConnectionInfo",
    }),
  );
export type IntegrationRuntimesGetConnectionInfoInput =
  typeof IntegrationRuntimesGetConnectionInfoInput.Type;

// Output Schema
export const IntegrationRuntimesGetConnectionInfoOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceToken: Schema.optional(Schema.String),
    identityCertThumbprint: Schema.optional(Schema.String),
    hostServiceUri: Schema.optional(Schema.String),
    version: Schema.optional(Schema.String),
    publicKey: Schema.optional(Schema.String),
    isIdentityCertExprired: Schema.optional(Schema.Boolean),
  });
export type IntegrationRuntimesGetConnectionInfoOutput =
  typeof IntegrationRuntimesGetConnectionInfoOutput.Type;

// The operation
/**
 * Gets the on-premises integration runtime connection information for encrypting the on-premises data source credentials.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param integrationRuntimeName - The integration runtime name.
 */
export const IntegrationRuntimesGetConnectionInfo =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationRuntimesGetConnectionInfoInput,
    outputSchema: IntegrationRuntimesGetConnectionInfoOutput,
  }));
// Input Schema
export const IntegrationRuntimesGetMonitoringDataInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    integrationRuntimeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}/monitoringData",
    }),
  );
export type IntegrationRuntimesGetMonitoringDataInput =
  typeof IntegrationRuntimesGetMonitoringDataInput.Type;

// Output Schema
export const IntegrationRuntimesGetMonitoringDataOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.optional(Schema.String),
    nodes: Schema.optional(
      Schema.Array(
        Schema.Struct({
          nodeName: Schema.optional(Schema.String),
          availableMemoryInMB: Schema.optional(Schema.Number),
          cpuUtilization: Schema.optional(Schema.Number),
          concurrentJobsLimit: Schema.optional(Schema.Number),
          concurrentJobsRunning: Schema.optional(Schema.Number),
          maxConcurrentJobs: Schema.optional(Schema.Number),
          sentBytes: Schema.optional(Schema.Number),
          receivedBytes: Schema.optional(Schema.Number),
        }),
      ),
    ),
  });
export type IntegrationRuntimesGetMonitoringDataOutput =
  typeof IntegrationRuntimesGetMonitoringDataOutput.Type;

// The operation
/**
 * Get the integration runtime monitoring data, which includes the monitor data for all the nodes under this integration runtime.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param integrationRuntimeName - The integration runtime name.
 */
export const IntegrationRuntimesGetMonitoringData =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationRuntimesGetMonitoringDataInput,
    outputSchema: IntegrationRuntimesGetMonitoringDataOutput,
  }));
// Input Schema
export const IntegrationRuntimesGetStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    integrationRuntimeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}/getStatus",
    }),
  );
export type IntegrationRuntimesGetStatusInput =
  typeof IntegrationRuntimesGetStatusInput.Type;

// Output Schema
export const IntegrationRuntimesGetStatusOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.optional(Schema.String),
    properties: Schema.Struct({
      type: Schema.Literals(["Managed", "SelfHosted"]),
      dataFactoryName: Schema.optional(Schema.String),
      state: Schema.optional(
        Schema.Literals([
          "Initial",
          "Stopped",
          "Started",
          "Starting",
          "Stopping",
          "NeedRegistration",
          "Online",
          "Limited",
          "Offline",
          "AccessDenied",
        ]),
      ),
    }),
  });
export type IntegrationRuntimesGetStatusOutput =
  typeof IntegrationRuntimesGetStatusOutput.Type;

// The operation
/**
 * Gets detailed status information for an integration runtime.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param integrationRuntimeName - The integration runtime name.
 */
export const IntegrationRuntimesGetStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationRuntimesGetStatusInput,
    outputSchema: IntegrationRuntimesGetStatusOutput,
  }));
// Input Schema
export const IntegrationRuntimesListAuthKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    integrationRuntimeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}/listAuthKeys",
    }),
  );
export type IntegrationRuntimesListAuthKeysInput =
  typeof IntegrationRuntimesListAuthKeysInput.Type;

// Output Schema
export const IntegrationRuntimesListAuthKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    authKey1: Schema.optional(Schema.String),
    authKey2: Schema.optional(Schema.String),
  });
export type IntegrationRuntimesListAuthKeysOutput =
  typeof IntegrationRuntimesListAuthKeysOutput.Type;

// The operation
/**
 * Retrieves the authentication keys for an integration runtime.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param integrationRuntimeName - The integration runtime name.
 */
export const IntegrationRuntimesListAuthKeys =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationRuntimesListAuthKeysInput,
    outputSchema: IntegrationRuntimesListAuthKeysOutput,
  }));
// Input Schema
export const IntegrationRuntimesListByFactoryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes",
    }),
  );
export type IntegrationRuntimesListByFactoryInput =
  typeof IntegrationRuntimesListByFactoryInput.Type;

// Output Schema
export const IntegrationRuntimesListByFactoryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type IntegrationRuntimesListByFactoryOutput =
  typeof IntegrationRuntimesListByFactoryOutput.Type;

// The operation
/**
 * Lists integration runtimes.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 */
export const IntegrationRuntimesListByFactory =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationRuntimesListByFactoryInput,
    outputSchema: IntegrationRuntimesListByFactoryOutput,
  }));
// Input Schema
export const IntegrationRuntimesListOutboundNetworkDependenciesEndpointsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    integrationRuntimeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}/outboundNetworkDependenciesEndpoints",
    }),
  );
export type IntegrationRuntimesListOutboundNetworkDependenciesEndpointsInput =
  typeof IntegrationRuntimesListOutboundNetworkDependenciesEndpointsInput.Type;

// Output Schema
export const IntegrationRuntimesListOutboundNetworkDependenciesEndpointsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          category: Schema.optional(Schema.String),
          endpoints: Schema.optional(
            Schema.Array(
              Schema.Struct({
                domainName: Schema.optional(Schema.String),
                endpointDetails: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      port: Schema.optional(Schema.Number),
                    }),
                  ),
                ),
              }),
            ),
          ),
        }),
      ),
    ),
  });
export type IntegrationRuntimesListOutboundNetworkDependenciesEndpointsOutput =
  typeof IntegrationRuntimesListOutboundNetworkDependenciesEndpointsOutput.Type;

// The operation
/**
 * Gets the list of outbound network dependencies for a given Azure-SSIS integration runtime.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param integrationRuntimeName - The integration runtime name.
 */
export const IntegrationRuntimesListOutboundNetworkDependenciesEndpoints =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      IntegrationRuntimesListOutboundNetworkDependenciesEndpointsInput,
    outputSchema:
      IntegrationRuntimesListOutboundNetworkDependenciesEndpointsOutput,
  }));
// Input Schema
export const IntegrationRuntimesRegenerateAuthKeyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    integrationRuntimeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}/regenerateAuthKey",
    }),
  );
export type IntegrationRuntimesRegenerateAuthKeyInput =
  typeof IntegrationRuntimesRegenerateAuthKeyInput.Type;

// Output Schema
export const IntegrationRuntimesRegenerateAuthKeyOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    authKey1: Schema.optional(Schema.String),
    authKey2: Schema.optional(Schema.String),
  });
export type IntegrationRuntimesRegenerateAuthKeyOutput =
  typeof IntegrationRuntimesRegenerateAuthKeyOutput.Type;

// The operation
/**
 * Regenerates the authentication key for an integration runtime.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param integrationRuntimeName - The integration runtime name.
 */
export const IntegrationRuntimesRegenerateAuthKey =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationRuntimesRegenerateAuthKeyInput,
    outputSchema: IntegrationRuntimesRegenerateAuthKeyOutput,
  }));
// Input Schema
export const IntegrationRuntimesRemoveLinksInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    integrationRuntimeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}/removeLinks",
    }),
  );
export type IntegrationRuntimesRemoveLinksInput =
  typeof IntegrationRuntimesRemoveLinksInput.Type;

// Output Schema
export const IntegrationRuntimesRemoveLinksOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type IntegrationRuntimesRemoveLinksOutput =
  typeof IntegrationRuntimesRemoveLinksOutput.Type;

// The operation
/**
 * Remove all linked integration runtimes under specific data factory in a self-hosted integration runtime.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param integrationRuntimeName - The integration runtime name.
 */
export const IntegrationRuntimesRemoveLinks =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationRuntimesRemoveLinksInput,
    outputSchema: IntegrationRuntimesRemoveLinksOutput,
  }));
// Input Schema
export const IntegrationRuntimesStartInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    integrationRuntimeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}/start",
    }),
  );
export type IntegrationRuntimesStartInput =
  typeof IntegrationRuntimesStartInput.Type;

// Output Schema
export const IntegrationRuntimesStartOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.optional(Schema.String),
    properties: Schema.Struct({
      type: Schema.Literals(["Managed", "SelfHosted"]),
      dataFactoryName: Schema.optional(Schema.String),
      state: Schema.optional(
        Schema.Literals([
          "Initial",
          "Stopped",
          "Started",
          "Starting",
          "Stopping",
          "NeedRegistration",
          "Online",
          "Limited",
          "Offline",
          "AccessDenied",
        ]),
      ),
    }),
  });
export type IntegrationRuntimesStartOutput =
  typeof IntegrationRuntimesStartOutput.Type;

// The operation
/**
 * Starts a ManagedReserved type integration runtime.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param integrationRuntimeName - The integration runtime name.
 */
export const IntegrationRuntimesStart = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IntegrationRuntimesStartInput,
    outputSchema: IntegrationRuntimesStartOutput,
  }),
);
// Input Schema
export const IntegrationRuntimesStopInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    integrationRuntimeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}/stop",
    }),
  );
export type IntegrationRuntimesStopInput =
  typeof IntegrationRuntimesStopInput.Type;

// Output Schema
export const IntegrationRuntimesStopOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type IntegrationRuntimesStopOutput =
  typeof IntegrationRuntimesStopOutput.Type;

// The operation
/**
 * Stops a ManagedReserved type integration runtime.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param integrationRuntimeName - The integration runtime name.
 */
export const IntegrationRuntimesStop = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IntegrationRuntimesStopInput,
    outputSchema: IntegrationRuntimesStopOutput,
  }),
);
// Input Schema
export const IntegrationRuntimesSyncCredentialsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    integrationRuntimeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}/syncCredentials",
    }),
  );
export type IntegrationRuntimesSyncCredentialsInput =
  typeof IntegrationRuntimesSyncCredentialsInput.Type;

// Output Schema
export const IntegrationRuntimesSyncCredentialsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type IntegrationRuntimesSyncCredentialsOutput =
  typeof IntegrationRuntimesSyncCredentialsOutput.Type;

// The operation
/**
 * Force the integration runtime to synchronize credentials across integration runtime nodes, and this will override the credentials across all worker nodes with those available on the dispatcher node. If you already have the latest credential backup file, you should manually import it (preferred) on any self-hosted integration runtime node than using this API directly.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param integrationRuntimeName - The integration runtime name.
 */
export const IntegrationRuntimesSyncCredentials =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationRuntimesSyncCredentialsInput,
    outputSchema: IntegrationRuntimesSyncCredentialsOutput,
  }));
// Input Schema
export const IntegrationRuntimesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    integrationRuntimeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}",
    }),
  );
export type IntegrationRuntimesUpdateInput =
  typeof IntegrationRuntimesUpdateInput.Type;

// Output Schema
export const IntegrationRuntimesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type IntegrationRuntimesUpdateOutput =
  typeof IntegrationRuntimesUpdateOutput.Type;

// The operation
/**
 * Updates an integration runtime.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param integrationRuntimeName - The integration runtime name.
 */
export const IntegrationRuntimesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IntegrationRuntimesUpdateInput,
    outputSchema: IntegrationRuntimesUpdateOutput,
  }),
);
// Input Schema
export const IntegrationRuntimesUpgradeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    integrationRuntimeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}/upgrade",
    }),
  );
export type IntegrationRuntimesUpgradeInput =
  typeof IntegrationRuntimesUpgradeInput.Type;

// Output Schema
export const IntegrationRuntimesUpgradeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type IntegrationRuntimesUpgradeOutput =
  typeof IntegrationRuntimesUpgradeOutput.Type;

// The operation
/**
 * Upgrade self-hosted integration runtime to latest version if availability.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param integrationRuntimeName - The integration runtime name.
 */
export const IntegrationRuntimesUpgrade = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IntegrationRuntimesUpgradeInput,
    outputSchema: IntegrationRuntimesUpgradeOutput,
  }),
);
// Input Schema
export const LinkedServicesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    linkedServiceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/linkedservices/{linkedServiceName}",
    }),
  );
export type LinkedServicesCreateOrUpdateInput =
  typeof LinkedServicesCreateOrUpdateInput.Type;

// Output Schema
export const LinkedServicesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type LinkedServicesCreateOrUpdateOutput =
  typeof LinkedServicesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a linked service.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param linkedServiceName - The linked service name.
 * @param if-match - ETag of the linkedService entity.  Should only be specified for update, for which it should match existing entity or can be * for unconditional update.
 */
export const LinkedServicesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LinkedServicesCreateOrUpdateInput,
    outputSchema: LinkedServicesCreateOrUpdateOutput,
  }));
// Input Schema
export const LinkedServicesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    linkedServiceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/linkedservices/{linkedServiceName}",
    }),
  );
export type LinkedServicesDeleteInput = typeof LinkedServicesDeleteInput.Type;

// Output Schema
export const LinkedServicesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type LinkedServicesDeleteOutput = typeof LinkedServicesDeleteOutput.Type;

// The operation
/**
 * Deletes a linked service.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param linkedServiceName - The linked service name.
 */
export const LinkedServicesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LinkedServicesDeleteInput,
    outputSchema: LinkedServicesDeleteOutput,
  }),
);
// Input Schema
export const LinkedServicesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    linkedServiceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/linkedservices/{linkedServiceName}",
  }),
);
export type LinkedServicesGetInput = typeof LinkedServicesGetInput.Type;

// Output Schema
export const LinkedServicesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type LinkedServicesGetOutput = typeof LinkedServicesGetOutput.Type;

// The operation
/**
 * Gets a linked service.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param linkedServiceName - The linked service name.
 * @param if-none-match - ETag of the linked service entity. Should only be specified for get. If the ETag matches the existing entity tag, or if * was provided, then no content will be returned.
 */
export const LinkedServicesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LinkedServicesGetInput,
  outputSchema: LinkedServicesGetOutput,
}));
// Input Schema
export const LinkedServicesListByFactoryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/linkedservices",
    }),
  );
export type LinkedServicesListByFactoryInput =
  typeof LinkedServicesListByFactoryInput.Type;

// Output Schema
export const LinkedServicesListByFactoryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type LinkedServicesListByFactoryOutput =
  typeof LinkedServicesListByFactoryOutput.Type;

// The operation
/**
 * Lists linked services.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 */
export const LinkedServicesListByFactory = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LinkedServicesListByFactoryInput,
    outputSchema: LinkedServicesListByFactoryOutput,
  }),
);
// Input Schema
export const ManagedPrivateEndpointsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    managedVirtualNetworkName: Schema.String.pipe(T.PathParam()),
    managedPrivateEndpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/managedVirtualNetworks/{managedVirtualNetworkName}/managedPrivateEndpoints/{managedPrivateEndpointName}",
    }),
  );
export type ManagedPrivateEndpointsCreateOrUpdateInput =
  typeof ManagedPrivateEndpointsCreateOrUpdateInput.Type;

// Output Schema
export const ManagedPrivateEndpointsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedPrivateEndpointsCreateOrUpdateOutput =
  typeof ManagedPrivateEndpointsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a managed private endpoint.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param managedVirtualNetworkName - Managed virtual network name
 * @param managedPrivateEndpointName - Managed private endpoint name
 * @param if-match - ETag of the managed private endpoint entity. Should only be specified for update, for which it should match existing entity or can be * for unconditional update.
 */
export const ManagedPrivateEndpointsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedPrivateEndpointsCreateOrUpdateInput,
    outputSchema: ManagedPrivateEndpointsCreateOrUpdateOutput,
  }));
// Input Schema
export const ManagedPrivateEndpointsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    managedVirtualNetworkName: Schema.String.pipe(T.PathParam()),
    managedPrivateEndpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/managedVirtualNetworks/{managedVirtualNetworkName}/managedPrivateEndpoints/{managedPrivateEndpointName}",
    }),
  );
export type ManagedPrivateEndpointsDeleteInput =
  typeof ManagedPrivateEndpointsDeleteInput.Type;

// Output Schema
export const ManagedPrivateEndpointsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ManagedPrivateEndpointsDeleteOutput =
  typeof ManagedPrivateEndpointsDeleteOutput.Type;

// The operation
/**
 * Deletes a managed private endpoint.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param managedVirtualNetworkName - Managed virtual network name
 * @param managedPrivateEndpointName - Managed private endpoint name
 */
export const ManagedPrivateEndpointsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedPrivateEndpointsDeleteInput,
    outputSchema: ManagedPrivateEndpointsDeleteOutput,
  }));
// Input Schema
export const ManagedPrivateEndpointsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    managedVirtualNetworkName: Schema.String.pipe(T.PathParam()),
    managedPrivateEndpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/managedVirtualNetworks/{managedVirtualNetworkName}/managedPrivateEndpoints/{managedPrivateEndpointName}",
    }),
  );
export type ManagedPrivateEndpointsGetInput =
  typeof ManagedPrivateEndpointsGetInput.Type;

// Output Schema
export const ManagedPrivateEndpointsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedPrivateEndpointsGetOutput =
  typeof ManagedPrivateEndpointsGetOutput.Type;

// The operation
/**
 * Gets a managed private endpoint.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param managedVirtualNetworkName - Managed virtual network name
 * @param managedPrivateEndpointName - Managed private endpoint name
 * @param if-none-match - ETag of the managed private endpoint entity. Should only be specified for get. If the ETag matches the existing entity tag, or if * was provided, then no content will be returned.
 */
export const ManagedPrivateEndpointsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ManagedPrivateEndpointsGetInput,
    outputSchema: ManagedPrivateEndpointsGetOutput,
  }),
);
// Input Schema
export const ManagedPrivateEndpointsListByFactoryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    managedVirtualNetworkName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/managedVirtualNetworks/{managedVirtualNetworkName}/managedPrivateEndpoints",
    }),
  );
export type ManagedPrivateEndpointsListByFactoryInput =
  typeof ManagedPrivateEndpointsListByFactoryInput.Type;

// Output Schema
export const ManagedPrivateEndpointsListByFactoryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ManagedPrivateEndpointsListByFactoryOutput =
  typeof ManagedPrivateEndpointsListByFactoryOutput.Type;

// The operation
/**
 * Lists managed private endpoints.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param managedVirtualNetworkName - Managed virtual network name
 */
export const ManagedPrivateEndpointsListByFactory =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedPrivateEndpointsListByFactoryInput,
    outputSchema: ManagedPrivateEndpointsListByFactoryOutput,
  }));
// Input Schema
export const ManagedVirtualNetworksCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    managedVirtualNetworkName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/managedVirtualNetworks/{managedVirtualNetworkName}",
    }),
  );
export type ManagedVirtualNetworksCreateOrUpdateInput =
  typeof ManagedVirtualNetworksCreateOrUpdateInput.Type;

// Output Schema
export const ManagedVirtualNetworksCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedVirtualNetworksCreateOrUpdateOutput =
  typeof ManagedVirtualNetworksCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a managed Virtual Network.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param managedVirtualNetworkName - Managed virtual network name
 * @param if-match - ETag of the managed Virtual Network entity. Should only be specified for update, for which it should match existing entity or can be * for unconditional update.
 */
export const ManagedVirtualNetworksCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedVirtualNetworksCreateOrUpdateInput,
    outputSchema: ManagedVirtualNetworksCreateOrUpdateOutput,
  }));
// Input Schema
export const ManagedVirtualNetworksGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    managedVirtualNetworkName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/managedVirtualNetworks/{managedVirtualNetworkName}",
    }),
  );
export type ManagedVirtualNetworksGetInput =
  typeof ManagedVirtualNetworksGetInput.Type;

// Output Schema
export const ManagedVirtualNetworksGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedVirtualNetworksGetOutput =
  typeof ManagedVirtualNetworksGetOutput.Type;

// The operation
/**
 * Gets a managed Virtual Network.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param managedVirtualNetworkName - Managed virtual network name
 * @param if-none-match - ETag of the managed Virtual Network entity. Should only be specified for get. If the ETag matches the existing entity tag, or if * was provided, then no content will be returned.
 */
export const ManagedVirtualNetworksGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ManagedVirtualNetworksGetInput,
    outputSchema: ManagedVirtualNetworksGetOutput,
  }),
);
// Input Schema
export const ManagedVirtualNetworksListByFactoryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/managedVirtualNetworks",
    }),
  );
export type ManagedVirtualNetworksListByFactoryInput =
  typeof ManagedVirtualNetworksListByFactoryInput.Type;

// Output Schema
export const ManagedVirtualNetworksListByFactoryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ManagedVirtualNetworksListByFactoryOutput =
  typeof ManagedVirtualNetworksListByFactoryOutput.Type;

// The operation
/**
 * Lists managed Virtual Networks.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 */
export const ManagedVirtualNetworksListByFactory =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedVirtualNetworksListByFactoryInput,
    outputSchema: ManagedVirtualNetworksListByFactoryOutput,
  }));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.DataFactory/operations",
  }),
);
export type OperationsListInput = typeof OperationsListInput.Type;

// Output Schema
export const OperationsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        name: Schema.optional(Schema.String),
        origin: Schema.optional(Schema.String),
        display: Schema.optional(
          Schema.Struct({
            description: Schema.optional(Schema.String),
            provider: Schema.optional(Schema.String),
            resource: Schema.optional(Schema.String),
            operation: Schema.optional(Schema.String),
          }),
        ),
        properties: Schema.optional(
          Schema.Struct({
            serviceSpecification: Schema.optional(
              Schema.Struct({
                logSpecifications: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      name: Schema.optional(Schema.String),
                      displayName: Schema.optional(Schema.String),
                      blobDuration: Schema.optional(Schema.String),
                    }),
                  ),
                ),
                metricSpecifications: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      name: Schema.optional(Schema.String),
                      displayName: Schema.optional(Schema.String),
                      displayDescription: Schema.optional(Schema.String),
                      unit: Schema.optional(Schema.String),
                      aggregationType: Schema.optional(Schema.String),
                      enableRegionalMdmAccount: Schema.optional(Schema.String),
                      sourceMdmAccount: Schema.optional(Schema.String),
                      sourceMdmNamespace: Schema.optional(Schema.String),
                      availabilities: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            timeGrain: Schema.optional(Schema.String),
                            blobDuration: Schema.optional(Schema.String),
                          }),
                        ),
                      ),
                      dimensions: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            name: Schema.optional(Schema.String),
                            displayName: Schema.optional(Schema.String),
                            toBeExportedForShoebox: Schema.optional(
                              Schema.Boolean,
                            ),
                          }),
                        ),
                      ),
                    }),
                  ),
                ),
              }),
            ),
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
 * Lists the available Azure Data Factory API operations.
 *
 * @param api-version - The API version to use for this operation.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const PipelineRunsCancelInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    runId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    isRecursive: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.DataFactory/factories/{factoryName}/pipelineruns/{runId}/cancel",
    }),
  );
export type PipelineRunsCancelInput = typeof PipelineRunsCancelInput.Type;

// Output Schema
export const PipelineRunsCancelOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PipelineRunsCancelOutput = typeof PipelineRunsCancelOutput.Type;

// The operation
/**
 * Cancel a pipeline run by its run ID.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param runId - The pipeline run identifier.
 * @param isRecursive - If true, cancel all the Child pipelines that are triggered by the current pipeline.
 */
export const PipelineRunsCancel = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PipelineRunsCancelInput,
  outputSchema: PipelineRunsCancelOutput,
}));
// Input Schema
export const PipelineRunsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  factoryName: Schema.String.pipe(T.PathParam()),
  runId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.DataFactory/factories/{factoryName}/pipelineruns/{runId}",
  }),
);
export type PipelineRunsGetInput = typeof PipelineRunsGetInput.Type;

// Output Schema
export const PipelineRunsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  runId: Schema.optional(Schema.String),
  runGroupId: Schema.optional(Schema.String),
  isLatest: Schema.optional(Schema.Boolean),
  pipelineName: Schema.optional(Schema.String),
  parameters: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  runDimensions: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  invokedBy: Schema.optional(
    Schema.Struct({
      name: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      invokedByType: Schema.optional(Schema.String),
      pipelineName: Schema.optional(Schema.String),
      pipelineRunId: Schema.optional(Schema.String),
    }),
  ),
  lastUpdated: Schema.optional(Schema.String),
  runStart: Schema.optional(Schema.String),
  runEnd: Schema.optional(Schema.String),
  durationInMs: Schema.optional(Schema.Number),
  status: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
});
export type PipelineRunsGetOutput = typeof PipelineRunsGetOutput.Type;

// The operation
/**
 * Get a pipeline run by its run ID.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param runId - The pipeline run identifier.
 */
export const PipelineRunsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PipelineRunsGetInput,
  outputSchema: PipelineRunsGetOutput,
}));
// Input Schema
export const PipelineRunsQueryByFactoryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/queryPipelineRuns",
    }),
  );
export type PipelineRunsQueryByFactoryInput =
  typeof PipelineRunsQueryByFactoryInput.Type;

// Output Schema
export const PipelineRunsQueryByFactoryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        runId: Schema.optional(Schema.String),
        runGroupId: Schema.optional(Schema.String),
        isLatest: Schema.optional(Schema.Boolean),
        pipelineName: Schema.optional(Schema.String),
        parameters: Schema.optional(
          Schema.Record(Schema.String, Schema.String),
        ),
        runDimensions: Schema.optional(
          Schema.Record(Schema.String, Schema.String),
        ),
        invokedBy: Schema.optional(
          Schema.Struct({
            name: Schema.optional(Schema.String),
            id: Schema.optional(Schema.String),
            invokedByType: Schema.optional(Schema.String),
            pipelineName: Schema.optional(Schema.String),
            pipelineRunId: Schema.optional(Schema.String),
          }),
        ),
        lastUpdated: Schema.optional(Schema.String),
        runStart: Schema.optional(Schema.String),
        runEnd: Schema.optional(Schema.String),
        durationInMs: Schema.optional(Schema.Number),
        status: Schema.optional(Schema.String),
        message: Schema.optional(Schema.String),
      }),
    ),
    continuationToken: Schema.optional(Schema.String),
  });
export type PipelineRunsQueryByFactoryOutput =
  typeof PipelineRunsQueryByFactoryOutput.Type;

// The operation
/**
 * Query pipeline runs in the factory based on input filter conditions.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 */
export const PipelineRunsQueryByFactory = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PipelineRunsQueryByFactoryInput,
    outputSchema: PipelineRunsQueryByFactoryOutput,
  }),
);
// Input Schema
export const PipelinesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    pipelineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/pipelines/{pipelineName}",
    }),
  );
export type PipelinesCreateOrUpdateInput =
  typeof PipelinesCreateOrUpdateInput.Type;

// Output Schema
export const PipelinesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PipelinesCreateOrUpdateOutput =
  typeof PipelinesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a pipeline.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param pipelineName - The pipeline name.
 * @param if-match - ETag of the pipeline entity.  Should only be specified for update, for which it should match existing entity or can be * for unconditional update.
 */
export const PipelinesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PipelinesCreateOrUpdateInput,
    outputSchema: PipelinesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const PipelinesCreateRunInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    pipelineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    referencePipelineRunId: Schema.optional(Schema.String),
    isRecovery: Schema.optional(Schema.Boolean),
    startActivityName: Schema.optional(Schema.String),
    startFromFailure: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/pipelines/{pipelineName}/createRun",
    }),
  );
export type PipelinesCreateRunInput = typeof PipelinesCreateRunInput.Type;

// Output Schema
export const PipelinesCreateRunOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    runId: Schema.String,
  });
export type PipelinesCreateRunOutput = typeof PipelinesCreateRunOutput.Type;

// The operation
/**
 * Creates a run of a pipeline.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param pipelineName - The pipeline name.
 * @param referencePipelineRunId - The pipeline run identifier. If run ID is specified the parameters of the specified run will be used to create a new run.
 * @param isRecovery - Recovery mode flag. If recovery mode is set to true, the specified referenced pipeline run and the new run will be grouped under the same groupId.
 * @param startActivityName - In recovery mode, the rerun will start from this activity. If not specified, all activities will run.
 * @param startFromFailure - In recovery mode, if set to true, the rerun will start from failed activities. The property will be used only if startActivityName is not specified.
 */
export const PipelinesCreateRun = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PipelinesCreateRunInput,
  outputSchema: PipelinesCreateRunOutput,
}));
// Input Schema
export const PipelinesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  factoryName: Schema.String.pipe(T.PathParam()),
  pipelineName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/pipelines/{pipelineName}",
  }),
);
export type PipelinesDeleteInput = typeof PipelinesDeleteInput.Type;

// Output Schema
export const PipelinesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PipelinesDeleteOutput = typeof PipelinesDeleteOutput.Type;

// The operation
/**
 * Deletes a pipeline.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param pipelineName - The pipeline name.
 */
export const PipelinesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PipelinesDeleteInput,
  outputSchema: PipelinesDeleteOutput,
}));
// Input Schema
export const PipelinesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  factoryName: Schema.String.pipe(T.PathParam()),
  pipelineName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/pipelines/{pipelineName}",
  }),
);
export type PipelinesGetInput = typeof PipelinesGetInput.Type;

// Output Schema
export const PipelinesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PipelinesGetOutput = typeof PipelinesGetOutput.Type;

// The operation
/**
 * Gets a pipeline.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param pipelineName - The pipeline name.
 * @param if-none-match - ETag of the pipeline entity. Should only be specified for get. If the ETag matches the existing entity tag, or if * was provided, then no content will be returned.
 */
export const PipelinesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PipelinesGetInput,
  outputSchema: PipelinesGetOutput,
}));
// Input Schema
export const PipelinesListByFactoryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/pipelines",
    }),
  );
export type PipelinesListByFactoryInput =
  typeof PipelinesListByFactoryInput.Type;

// Output Schema
export const PipelinesListByFactoryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type PipelinesListByFactoryOutput =
  typeof PipelinesListByFactoryOutput.Type;

// The operation
/**
 * Lists pipelines.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 */
export const PipelinesListByFactory = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PipelinesListByFactoryInput,
    outputSchema: PipelinesListByFactoryOutput,
  }),
);
// Input Schema
export const PrivateEndpointConnectionCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionCreateOrUpdateInput =
  typeof PrivateEndpointConnectionCreateOrUpdateInput.Type;

// Output Schema
export const PrivateEndpointConnectionCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrivateEndpointConnectionCreateOrUpdateOutput =
  typeof PrivateEndpointConnectionCreateOrUpdateOutput.Type;

// The operation
/**
 * Approves or rejects a private endpoint connection
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param privateEndpointConnectionName - The private endpoint connection name.
 * @param if-match - ETag of the private endpoint connection entity.  Should only be specified for update, for which it should match existing entity or can be * for unconditional update.
 */
export const PrivateEndpointConnectionCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionCreateOrUpdateInput,
    outputSchema: PrivateEndpointConnectionCreateOrUpdateOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionDeleteInput =
  typeof PrivateEndpointConnectionDeleteInput.Type;

// Output Schema
export const PrivateEndpointConnectionDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PrivateEndpointConnectionDeleteOutput =
  typeof PrivateEndpointConnectionDeleteOutput.Type;

// The operation
/**
 * Deletes a private endpoint connection
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param privateEndpointConnectionName - The private endpoint connection name.
 */
export const PrivateEndpointConnectionDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionDeleteInput,
    outputSchema: PrivateEndpointConnectionDeleteOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionGetInput =
  typeof PrivateEndpointConnectionGetInput.Type;

// Output Schema
export const PrivateEndpointConnectionGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrivateEndpointConnectionGetOutput =
  typeof PrivateEndpointConnectionGetOutput.Type;

// The operation
/**
 * Gets a private endpoint connection
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param privateEndpointConnectionName - The private endpoint connection name.
 * @param if-none-match - ETag of the private endpoint connection entity. Should only be specified for get. If the ETag matches the existing entity tag, or if * was provided, then no content will be returned.
 */
export const PrivateEndpointConnectionGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionGetInput,
    outputSchema: PrivateEndpointConnectionGetOutput,
  }));
// Input Schema
export const PrivateEndPointConnectionsListByFactoryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/privateEndpointConnections",
    }),
  );
export type PrivateEndPointConnectionsListByFactoryInput =
  typeof PrivateEndPointConnectionsListByFactoryInput.Type;

// Output Schema
export const PrivateEndPointConnectionsListByFactoryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateEndPointConnectionsListByFactoryOutput =
  typeof PrivateEndPointConnectionsListByFactoryOutput.Type;

// The operation
/**
 * Lists Private endpoint connections
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 */
export const privateEndPointConnectionsListByFactory =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndPointConnectionsListByFactoryInput,
    outputSchema: PrivateEndPointConnectionsListByFactoryOutput,
  }));
// Input Schema
export const PrivateLinkResourcesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/privateLinkResources",
    }),
  );
export type PrivateLinkResourcesGetInput =
  typeof PrivateLinkResourcesGetInput.Type;

// Output Schema
export const PrivateLinkResourcesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
        etag: Schema.optional(Schema.String),
      }),
    ),
  });
export type PrivateLinkResourcesGetOutput =
  typeof PrivateLinkResourcesGetOutput.Type;

// The operation
/**
 * Gets the private link resources
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 */
export const privateLinkResourcesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateLinkResourcesGetInput,
    outputSchema: PrivateLinkResourcesGetOutput,
  }),
);
// Input Schema
export const TriggerRunsCancelInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    triggerName: Schema.String.pipe(T.PathParam()),
    runId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.DataFactory/factories/{factoryName}/triggers/{triggerName}/triggerRuns/{runId}/cancel",
  }),
);
export type TriggerRunsCancelInput = typeof TriggerRunsCancelInput.Type;

// Output Schema
export const TriggerRunsCancelOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type TriggerRunsCancelOutput = typeof TriggerRunsCancelOutput.Type;

// The operation
/**
 * Cancel a single trigger instance by runId.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param runId - The pipeline run identifier.
 */
export const TriggerRunsCancel = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TriggerRunsCancelInput,
  outputSchema: TriggerRunsCancelOutput,
}));
// Input Schema
export const TriggerRunsQueryByFactoryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/queryTriggerRuns",
    }),
  );
export type TriggerRunsQueryByFactoryInput =
  typeof TriggerRunsQueryByFactoryInput.Type;

// Output Schema
export const TriggerRunsQueryByFactoryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        triggerRunId: Schema.optional(Schema.String),
        triggerName: Schema.optional(Schema.String),
        triggerType: Schema.optional(Schema.String),
        triggerRunTimestamp: Schema.optional(Schema.String),
        status: Schema.optional(
          Schema.Literals(["Succeeded", "Failed", "Inprogress"]),
        ),
        message: Schema.optional(Schema.String),
        properties: Schema.optional(
          Schema.Record(Schema.String, Schema.String),
        ),
        triggeredPipelines: Schema.optional(
          Schema.Record(Schema.String, Schema.String),
        ),
        runDimension: Schema.optional(
          Schema.Record(Schema.String, Schema.String),
        ),
        dependencyStatus: Schema.optional(
          Schema.Record(Schema.String, Schema.Unknown),
        ),
      }),
    ),
    continuationToken: Schema.optional(Schema.String),
  });
export type TriggerRunsQueryByFactoryOutput =
  typeof TriggerRunsQueryByFactoryOutput.Type;

// The operation
/**
 * Query trigger runs.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 */
export const TriggerRunsQueryByFactory = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TriggerRunsQueryByFactoryInput,
    outputSchema: TriggerRunsQueryByFactoryOutput,
  }),
);
// Input Schema
export const TriggerRunsRerunInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  factoryName: Schema.String.pipe(T.PathParam()),
  triggerName: Schema.String.pipe(T.PathParam()),
  runId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.DataFactory/factories/{factoryName}/triggers/{triggerName}/triggerRuns/{runId}/rerun",
  }),
);
export type TriggerRunsRerunInput = typeof TriggerRunsRerunInput.Type;

// Output Schema
export const TriggerRunsRerunOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type TriggerRunsRerunOutput = typeof TriggerRunsRerunOutput.Type;

// The operation
/**
 * Rerun single trigger instance by runId.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param runId - The pipeline run identifier.
 */
export const TriggerRunsRerun = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TriggerRunsRerunInput,
  outputSchema: TriggerRunsRerunOutput,
}));
// Input Schema
export const TriggersCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    triggerName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/triggers/{triggerName}",
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
 * Creates or updates a trigger.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param triggerName - The trigger name.
 * @param if-match - ETag of the trigger entity.  Should only be specified for update, for which it should match existing entity or can be * for unconditional update.
 */
export const TriggersCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TriggersCreateOrUpdateInput,
    outputSchema: TriggersCreateOrUpdateOutput,
  }),
);
// Input Schema
export const TriggersDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  factoryName: Schema.String.pipe(T.PathParam()),
  triggerName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/triggers/{triggerName}",
  }),
);
export type TriggersDeleteInput = typeof TriggersDeleteInput.Type;

// Output Schema
export const TriggersDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type TriggersDeleteOutput = typeof TriggersDeleteOutput.Type;

// The operation
/**
 * Deletes a trigger.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param triggerName - The trigger name.
 */
export const TriggersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TriggersDeleteInput,
  outputSchema: TriggersDeleteOutput,
}));
// Input Schema
export const TriggersGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  factoryName: Schema.String.pipe(T.PathParam()),
  triggerName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/triggers/{triggerName}",
  }),
);
export type TriggersGetInput = typeof TriggersGetInput.Type;

// Output Schema
export const TriggersGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type TriggersGetOutput = typeof TriggersGetOutput.Type;

// The operation
/**
 * Gets a trigger.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param triggerName - The trigger name.
 * @param if-none-match - ETag of the trigger entity. Should only be specified for get. If the ETag matches the existing entity tag, or if * was provided, then no content will be returned.
 */
export const TriggersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TriggersGetInput,
  outputSchema: TriggersGetOutput,
}));
// Input Schema
export const TriggersGetEventSubscriptionStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    triggerName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/triggers/{triggerName}/getEventSubscriptionStatus",
    }),
  );
export type TriggersGetEventSubscriptionStatusInput =
  typeof TriggersGetEventSubscriptionStatusInput.Type;

// Output Schema
export const TriggersGetEventSubscriptionStatusOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    triggerName: Schema.optional(Schema.String),
    status: Schema.optional(
      Schema.Literals([
        "Enabled",
        "Provisioning",
        "Deprovisioning",
        "Disabled",
        "Unknown",
      ]),
    ),
  });
export type TriggersGetEventSubscriptionStatusOutput =
  typeof TriggersGetEventSubscriptionStatusOutput.Type;

// The operation
/**
 * Get a trigger's event subscription status.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param triggerName - The trigger name.
 */
export const TriggersGetEventSubscriptionStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TriggersGetEventSubscriptionStatusInput,
    outputSchema: TriggersGetEventSubscriptionStatusOutput,
  }));
// Input Schema
export const TriggersListByFactoryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/triggers",
    }),
  );
export type TriggersListByFactoryInput = typeof TriggersListByFactoryInput.Type;

// Output Schema
export const TriggersListByFactoryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type TriggersListByFactoryOutput =
  typeof TriggersListByFactoryOutput.Type;

// The operation
/**
 * Lists triggers.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 */
export const TriggersListByFactory = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TriggersListByFactoryInput,
    outputSchema: TriggersListByFactoryOutput,
  }),
);
// Input Schema
export const TriggersQueryByFactoryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/querytriggers",
    }),
  );
export type TriggersQueryByFactoryInput =
  typeof TriggersQueryByFactoryInput.Type;

// Output Schema
export const TriggersQueryByFactoryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    continuationToken: Schema.optional(Schema.String),
  });
export type TriggersQueryByFactoryOutput =
  typeof TriggersQueryByFactoryOutput.Type;

// The operation
/**
 * Query triggers.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 */
export const TriggersQueryByFactory = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TriggersQueryByFactoryInput,
    outputSchema: TriggersQueryByFactoryOutput,
  }),
);
// Input Schema
export const TriggersStartInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  factoryName: Schema.String.pipe(T.PathParam()),
  triggerName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/triggers/{triggerName}/start",
  }),
);
export type TriggersStartInput = typeof TriggersStartInput.Type;

// Output Schema
export const TriggersStartOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type TriggersStartOutput = typeof TriggersStartOutput.Type;

// The operation
/**
 * Starts a trigger.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param triggerName - The trigger name.
 */
export const TriggersStart = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TriggersStartInput,
  outputSchema: TriggersStartOutput,
}));
// Input Schema
export const TriggersStopInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  factoryName: Schema.String.pipe(T.PathParam()),
  triggerName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/triggers/{triggerName}/stop",
  }),
);
export type TriggersStopInput = typeof TriggersStopInput.Type;

// Output Schema
export const TriggersStopOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type TriggersStopOutput = typeof TriggersStopOutput.Type;

// The operation
/**
 * Stops a trigger.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param triggerName - The trigger name.
 */
export const TriggersStop = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TriggersStopInput,
  outputSchema: TriggersStopOutput,
}));
// Input Schema
export const TriggersSubscribeToEventsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    triggerName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/triggers/{triggerName}/subscribeToEvents",
    }),
  );
export type TriggersSubscribeToEventsInput =
  typeof TriggersSubscribeToEventsInput.Type;

// Output Schema
export const TriggersSubscribeToEventsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    triggerName: Schema.optional(Schema.String),
    status: Schema.optional(
      Schema.Literals([
        "Enabled",
        "Provisioning",
        "Deprovisioning",
        "Disabled",
        "Unknown",
      ]),
    ),
  });
export type TriggersSubscribeToEventsOutput =
  typeof TriggersSubscribeToEventsOutput.Type;

// The operation
/**
 * Subscribe event trigger to events.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param triggerName - The trigger name.
 */
export const TriggersSubscribeToEvents = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TriggersSubscribeToEventsInput,
    outputSchema: TriggersSubscribeToEventsOutput,
  }),
);
// Input Schema
export const TriggersUnsubscribeFromEventsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    factoryName: Schema.String.pipe(T.PathParam()),
    triggerName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/triggers/{triggerName}/unsubscribeFromEvents",
    }),
  );
export type TriggersUnsubscribeFromEventsInput =
  typeof TriggersUnsubscribeFromEventsInput.Type;

// Output Schema
export const TriggersUnsubscribeFromEventsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    triggerName: Schema.optional(Schema.String),
    status: Schema.optional(
      Schema.Literals([
        "Enabled",
        "Provisioning",
        "Deprovisioning",
        "Disabled",
        "Unknown",
      ]),
    ),
  });
export type TriggersUnsubscribeFromEventsOutput =
  typeof TriggersUnsubscribeFromEventsOutput.Type;

// The operation
/**
 * Unsubscribe event trigger from events.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param factoryName - The factory name.
 * @param triggerName - The trigger name.
 */
export const TriggersUnsubscribeFromEvents =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TriggersUnsubscribeFromEventsInput,
    outputSchema: TriggersUnsubscribeFromEventsOutput,
  }));
