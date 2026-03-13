/**
 * Azure Fist API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const BinaryHardeningListByFirmwareInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    firmwareId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTFirmwareDefense/workspaces/{workspaceName}/firmwares/{firmwareId}/binaryHardeningResults",
    }),
  );
export type BinaryHardeningListByFirmwareInput =
  typeof BinaryHardeningListByFirmwareInput.Type;

// Output Schema
export const BinaryHardeningListByFirmwareOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type BinaryHardeningListByFirmwareOutput =
  typeof BinaryHardeningListByFirmwareOutput.Type;

// The operation
/**
 * Lists binary hardening analysis results of a firmware.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the firmware analysis workspace.
 * @param firmwareId - The id of the firmware.
 */
export const BinaryHardeningListByFirmware =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BinaryHardeningListByFirmwareInput,
    outputSchema: BinaryHardeningListByFirmwareOutput,
  }));
// Input Schema
export const CryptoCertificatesListByFirmwareInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    firmwareId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTFirmwareDefense/workspaces/{workspaceName}/firmwares/{firmwareId}/cryptoCertificates",
    }),
  );
export type CryptoCertificatesListByFirmwareInput =
  typeof CryptoCertificatesListByFirmwareInput.Type;

// Output Schema
export const CryptoCertificatesListByFirmwareOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type CryptoCertificatesListByFirmwareOutput =
  typeof CryptoCertificatesListByFirmwareOutput.Type;

// The operation
/**
 * Lists crypto certificate analysis results of a firmware.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the firmware analysis workspace.
 * @param firmwareId - The id of the firmware.
 */
export const CryptoCertificatesListByFirmware =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CryptoCertificatesListByFirmwareInput,
    outputSchema: CryptoCertificatesListByFirmwareOutput,
  }));
// Input Schema
export const CryptoKeysListByFirmwareInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    firmwareId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTFirmwareDefense/workspaces/{workspaceName}/firmwares/{firmwareId}/cryptoKeys",
    }),
  );
export type CryptoKeysListByFirmwareInput =
  typeof CryptoKeysListByFirmwareInput.Type;

// Output Schema
export const CryptoKeysListByFirmwareOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type CryptoKeysListByFirmwareOutput =
  typeof CryptoKeysListByFirmwareOutput.Type;

// The operation
/**
 * Lists crypto key analysis results of a firmware.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the firmware analysis workspace.
 * @param firmwareId - The id of the firmware.
 */
export const CryptoKeysListByFirmware = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CryptoKeysListByFirmwareInput,
    outputSchema: CryptoKeysListByFirmwareOutput,
  }),
);
// Input Schema
export const CvesListByFirmwareInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    firmwareId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTFirmwareDefense/workspaces/{workspaceName}/firmwares/{firmwareId}/cves",
    }),
  );
export type CvesListByFirmwareInput = typeof CvesListByFirmwareInput.Type;

// Output Schema
export const CvesListByFirmwareOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type CvesListByFirmwareOutput = typeof CvesListByFirmwareOutput.Type;

// The operation
/**
 * Lists CVE analysis results of a firmware.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the firmware analysis workspace.
 * @param firmwareId - The id of the firmware.
 */
export const CvesListByFirmware = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CvesListByFirmwareInput,
  outputSchema: CvesListByFirmwareOutput,
}));
// Input Schema
export const FirmwaresCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  firmwareId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTFirmwareDefense/workspaces/{workspaceName}/firmwares/{firmwareId}",
  }),
);
export type FirmwaresCreateInput = typeof FirmwaresCreateInput.Type;

// Output Schema
export const FirmwaresCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type FirmwaresCreateOutput = typeof FirmwaresCreateOutput.Type;

// The operation
/**
 * The operation to create a firmware.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the firmware analysis workspace.
 * @param firmwareId - The id of the firmware.
 */
export const FirmwaresCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FirmwaresCreateInput,
  outputSchema: FirmwaresCreateOutput,
}));
// Input Schema
export const FirmwaresDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  firmwareId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTFirmwareDefense/workspaces/{workspaceName}/firmwares/{firmwareId}",
  }),
);
export type FirmwaresDeleteInput = typeof FirmwaresDeleteInput.Type;

// Output Schema
export const FirmwaresDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type FirmwaresDeleteOutput = typeof FirmwaresDeleteOutput.Type;

// The operation
/**
 * The operation to delete a firmware.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the firmware analysis workspace.
 * @param firmwareId - The id of the firmware.
 */
export const FirmwaresDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FirmwaresDeleteInput,
  outputSchema: FirmwaresDeleteOutput,
}));
// Input Schema
export const FirmwaresGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  firmwareId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTFirmwareDefense/workspaces/{workspaceName}/firmwares/{firmwareId}",
  }),
);
export type FirmwaresGetInput = typeof FirmwaresGetInput.Type;

// Output Schema
export const FirmwaresGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type FirmwaresGetOutput = typeof FirmwaresGetOutput.Type;

// The operation
/**
 * Get firmware.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the firmware analysis workspace.
 * @param firmwareId - The id of the firmware.
 */
export const FirmwaresGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FirmwaresGetInput,
  outputSchema: FirmwaresGetOutput,
}));
// Input Schema
export const FirmwaresListByWorkspaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTFirmwareDefense/workspaces/{workspaceName}/firmwares",
    }),
  );
export type FirmwaresListByWorkspaceInput =
  typeof FirmwaresListByWorkspaceInput.Type;

// Output Schema
export const FirmwaresListByWorkspaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type FirmwaresListByWorkspaceOutput =
  typeof FirmwaresListByWorkspaceOutput.Type;

// The operation
/**
 * Lists all of firmwares inside a workspace.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the firmware analysis workspace.
 */
export const FirmwaresListByWorkspace = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FirmwaresListByWorkspaceInput,
    outputSchema: FirmwaresListByWorkspaceOutput,
  }),
);
// Input Schema
export const FirmwaresUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  firmwareId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTFirmwareDefense/workspaces/{workspaceName}/firmwares/{firmwareId}",
  }),
);
export type FirmwaresUpdateInput = typeof FirmwaresUpdateInput.Type;

// Output Schema
export const FirmwaresUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type FirmwaresUpdateOutput = typeof FirmwaresUpdateOutput.Type;

// The operation
/**
 * The operation to update firmware.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the firmware analysis workspace.
 * @param firmwareId - The id of the firmware.
 */
export const FirmwaresUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FirmwaresUpdateInput,
  outputSchema: FirmwaresUpdateOutput,
}));
// Input Schema
export const PasswordHashesListByFirmwareInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    firmwareId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTFirmwareDefense/workspaces/{workspaceName}/firmwares/{firmwareId}/passwordHashes",
    }),
  );
export type PasswordHashesListByFirmwareInput =
  typeof PasswordHashesListByFirmwareInput.Type;

// Output Schema
export const PasswordHashesListByFirmwareOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type PasswordHashesListByFirmwareOutput =
  typeof PasswordHashesListByFirmwareOutput.Type;

// The operation
/**
 * Lists password hash analysis results of a firmware.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the firmware analysis workspace.
 * @param firmwareId - The id of the firmware.
 */
export const PasswordHashesListByFirmware =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PasswordHashesListByFirmwareInput,
    outputSchema: PasswordHashesListByFirmwareOutput,
  }));
// Input Schema
export const SbomComponentsListByFirmwareInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    firmwareId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTFirmwareDefense/workspaces/{workspaceName}/firmwares/{firmwareId}/sbomComponents",
    }),
  );
export type SbomComponentsListByFirmwareInput =
  typeof SbomComponentsListByFirmwareInput.Type;

// Output Schema
export const SbomComponentsListByFirmwareOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type SbomComponentsListByFirmwareOutput =
  typeof SbomComponentsListByFirmwareOutput.Type;

// The operation
/**
 * Lists sbom analysis results of a firmware.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the firmware analysis workspace.
 * @param firmwareId - The id of the firmware.
 */
export const SbomComponentsListByFirmware =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SbomComponentsListByFirmwareInput,
    outputSchema: SbomComponentsListByFirmwareOutput,
  }));
// Input Schema
export const SummariesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  firmwareId: Schema.String.pipe(T.PathParam()),
  summaryType: Schema.Literals([
    "Firmware",
    "CommonVulnerabilitiesAndExposures",
    "BinaryHardening",
    "CryptoCertificate",
    "CryptoKey",
  ]).pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTFirmwareDefense/workspaces/{workspaceName}/firmwares/{firmwareId}/summaries/{summaryType}",
  }),
);
export type SummariesGetInput = typeof SummariesGetInput.Type;

// Output Schema
export const SummariesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SummariesGetOutput = typeof SummariesGetOutput.Type;

// The operation
/**
 * Get an analysis result summary of a firmware by name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the firmware analysis workspace.
 * @param firmwareId - The id of the firmware.
 * @param summaryType - The Firmware analysis summary name describing the type of summary.
 */
export const SummariesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SummariesGetInput,
  outputSchema: SummariesGetOutput,
}));
// Input Schema
export const SummariesListByFirmwareInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    firmwareId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTFirmwareDefense/workspaces/{workspaceName}/firmwares/{firmwareId}/summaries",
    }),
  );
export type SummariesListByFirmwareInput =
  typeof SummariesListByFirmwareInput.Type;

// Output Schema
export const SummariesListByFirmwareOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type SummariesListByFirmwareOutput =
  typeof SummariesListByFirmwareOutput.Type;

// The operation
/**
 * Lists analysis result summary names of a firmware. To fetch the full summary data, get that summary by name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the firmware analysis workspace.
 * @param firmwareId - The id of the firmware.
 */
export const SummariesListByFirmware = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SummariesListByFirmwareInput,
    outputSchema: SummariesListByFirmwareOutput,
  }),
);
// Input Schema
export const UsageMetricsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTFirmwareDefense/workspaces/{workspaceName}/usageMetrics/{name}",
  }),
);
export type UsageMetricsGetInput = typeof UsageMetricsGetInput.Type;

// Output Schema
export const UsageMetricsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type UsageMetricsGetOutput = typeof UsageMetricsGetOutput.Type;

// The operation
/**
 * Gets monthly usage information for a workspace.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the firmware analysis workspace.
 * @param name - The Firmware analysis summary name describing the type of summary.
 */
export const UsageMetricsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UsageMetricsGetInput,
  outputSchema: UsageMetricsGetOutput,
}));
// Input Schema
export const UsageMetricsListByWorkspaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTFirmwareDefense/workspaces/{workspaceName}/usageMetrics",
    }),
  );
export type UsageMetricsListByWorkspaceInput =
  typeof UsageMetricsListByWorkspaceInput.Type;

// Output Schema
export const UsageMetricsListByWorkspaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type UsageMetricsListByWorkspaceOutput =
  typeof UsageMetricsListByWorkspaceOutput.Type;

// The operation
/**
 * Lists monthly usage information for a workspace.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the firmware analysis workspace.
 */
export const UsageMetricsListByWorkspace = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: UsageMetricsListByWorkspaceInput,
    outputSchema: UsageMetricsListByWorkspaceOutput,
  }),
);
// Input Schema
export const WorkspacesCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTFirmwareDefense/workspaces/{workspaceName}",
  }),
);
export type WorkspacesCreateInput = typeof WorkspacesCreateInput.Type;

// Output Schema
export const WorkspacesCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  },
);
export type WorkspacesCreateOutput = typeof WorkspacesCreateOutput.Type;

// The operation
/**
 * The operation to create or update a firmware analysis workspace.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the firmware analysis workspace.
 */
export const WorkspacesCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkspacesCreateInput,
  outputSchema: WorkspacesCreateOutput,
}));
// Input Schema
export const WorkspacesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTFirmwareDefense/workspaces/{workspaceName}",
  }),
);
export type WorkspacesDeleteInput = typeof WorkspacesDeleteInput.Type;

// Output Schema
export const WorkspacesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WorkspacesDeleteOutput = typeof WorkspacesDeleteOutput.Type;

// The operation
/**
 * The operation to delete a firmware analysis workspace.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the firmware analysis workspace.
 */
export const WorkspacesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkspacesDeleteInput,
  outputSchema: WorkspacesDeleteOutput,
}));
// Input Schema
export const WorkspacesGenerateUploadUrlInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTFirmwareDefense/workspaces/{workspaceName}/generateUploadUrl",
    }),
  );
export type WorkspacesGenerateUploadUrlInput =
  typeof WorkspacesGenerateUploadUrlInput.Type;

// Output Schema
export const WorkspacesGenerateUploadUrlOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    url: Schema.optional(Schema.String),
  });
export type WorkspacesGenerateUploadUrlOutput =
  typeof WorkspacesGenerateUploadUrlOutput.Type;

// The operation
/**
 * Generate a URL for uploading a firmware image.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the firmware analysis workspace.
 */
export const WorkspacesGenerateUploadUrl = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkspacesGenerateUploadUrlInput,
    outputSchema: WorkspacesGenerateUploadUrlOutput,
  }),
);
// Input Schema
export const WorkspacesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTFirmwareDefense/workspaces/{workspaceName}",
  }),
);
export type WorkspacesGetInput = typeof WorkspacesGetInput.Type;

// Output Schema
export const WorkspacesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type WorkspacesGetOutput = typeof WorkspacesGetOutput.Type;

// The operation
/**
 * Get firmware analysis workspace.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the firmware analysis workspace.
 */
export const WorkspacesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkspacesGetInput,
  outputSchema: WorkspacesGetOutput,
}));
// Input Schema
export const WorkspacesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTFirmwareDefense/workspaces",
    }),
  );
export type WorkspacesListByResourceGroupInput =
  typeof WorkspacesListByResourceGroupInput.Type;

// Output Schema
export const WorkspacesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type WorkspacesListByResourceGroupOutput =
  typeof WorkspacesListByResourceGroupOutput.Type;

// The operation
/**
 * Lists all of the firmware analysis workspaces in the specified resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const WorkspacesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkspacesListByResourceGroupInput,
    outputSchema: WorkspacesListByResourceGroupOutput,
  }));
// Input Schema
export const WorkspacesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.IoTFirmwareDefense/workspaces",
    }),
  );
export type WorkspacesListBySubscriptionInput =
  typeof WorkspacesListBySubscriptionInput.Type;

// Output Schema
export const WorkspacesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type WorkspacesListBySubscriptionOutput =
  typeof WorkspacesListBySubscriptionOutput.Type;

// The operation
/**
 * Lists all of the firmware analysis workspaces in the specified subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const WorkspacesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkspacesListBySubscriptionInput,
    outputSchema: WorkspacesListBySubscriptionOutput,
  }));
// Input Schema
export const WorkspacesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTFirmwareDefense/workspaces/{workspaceName}",
  }),
);
export type WorkspacesUpdateInput = typeof WorkspacesUpdateInput.Type;

// Output Schema
export const WorkspacesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  },
);
export type WorkspacesUpdateOutput = typeof WorkspacesUpdateOutput.Type;

// The operation
/**
 * The operation to update a firmware analysis workspaces.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the firmware analysis workspace.
 */
export const WorkspacesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkspacesUpdateInput,
  outputSchema: WorkspacesUpdateOutput,
}));
