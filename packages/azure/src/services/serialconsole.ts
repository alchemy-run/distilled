/**
 * Azure Serialconsole API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";
import { SensitiveString } from "../sensitive.ts";

// Input Schema
export const DisableConsoleInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  default: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.SerialConsole/consoleServices/{default}/disableConsole",
  }),
);
export type DisableConsoleInput = typeof DisableConsoleInput.Type;

// Output Schema
export const DisableConsoleOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  properties: Schema.optional(
    Schema.Struct({
      disabled: Schema.optional(Schema.Boolean),
    }),
  ),
});
export type DisableConsoleOutput = typeof DisableConsoleOutput.Type;

// The operation
/**
 * Disable Serial Console for a subscription
 *
 * Disables the Serial Console service for all VMs and VM scale sets in the provided subscription
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param default - Default parameter. Leave the value as "default".
 */
export const DisableConsole = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DisableConsoleInput,
  outputSchema: DisableConsoleOutput,
}));
// Input Schema
export const EnableConsoleInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  default: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.SerialConsole/consoleServices/{default}/enableConsole",
  }),
);
export type EnableConsoleInput = typeof EnableConsoleInput.Type;

// Output Schema
export const EnableConsoleOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  properties: Schema.optional(
    Schema.Struct({
      disabled: Schema.optional(Schema.Boolean),
    }),
  ),
});
export type EnableConsoleOutput = typeof EnableConsoleOutput.Type;

// The operation
/**
 * Enable Serial Console for a subscription
 *
 * Enables the Serial Console service for all VMs and VM scale sets in the provided subscription
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param default - Default parameter. Leave the value as "default".
 */
export const EnableConsole = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EnableConsoleInput,
  outputSchema: EnableConsoleOutput,
}));
// Input Schema
export const GetConsoleStatusInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  default: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.SerialConsole/consoleServices/{default}",
  }),
);
export type GetConsoleStatusInput = typeof GetConsoleStatusInput.Type;

// Output Schema
export const GetConsoleStatusOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    properties: Schema.optional(
      Schema.Struct({
        disabled: Schema.optional(Schema.Boolean),
      }),
    ),
  },
);
export type GetConsoleStatusOutput = typeof GetConsoleStatusOutput.Type;

// The operation
/**
 * Get the disabled status for a subscription
 *
 * Gets whether or not Serial Console is disabled for a given subscription
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param default - Default parameter. Leave the value as "default".
 */
export const GetConsoleStatus = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetConsoleStatusInput,
  outputSchema: GetConsoleStatusOutput,
}));
// Input Schema
export const ListOperationsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.SerialConsole/operations",
  }),
);
export type ListOperationsInput = typeof ListOperationsInput.Type;

// Output Schema
export const ListOperationsOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        name: Schema.optional(Schema.String),
        isDataAction: Schema.optional(Schema.String),
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
export type ListOperationsOutput = typeof ListOperationsOutput.Type;

// The operation
/**
 * Gets a list of Serial Console API operations.
 *
 * @param api-version - The API version to use for this operation.
 */
export const ListOperations = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListOperationsInput,
  outputSchema: ListOperationsOutput,
}));
// Input Schema
export const SerialPortsConnectInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceProviderNamespace: Schema.String.pipe(T.PathParam()),
    parentResourceType: Schema.String.pipe(T.PathParam()),
    parentResource: Schema.String.pipe(T.PathParam()),
    serialPort: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{parentResourceType}/{parentResource}/providers/Microsoft.SerialConsole/serialPorts/{serialPort}/connect",
    }),
  );
export type SerialPortsConnectInput = typeof SerialPortsConnectInput.Type;

// Output Schema
export const SerialPortsConnectOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    connectionString: Schema.optional(SensitiveString),
  });
export type SerialPortsConnectOutput = typeof SerialPortsConnectOutput.Type;

// The operation
/**
 * Connect to serial port of the target resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group.
 * @param resourceProviderNamespace - The resource provider namespace of the parent resource.
 * @param parentResourceType - The resource type of the parent resource. For example: 'virtualMachines' or 'virtualMachineScaleSets'
 * @param parentResource - The name of the parent resource.
 * @param serialPort - The name of the serial port to connect to.
 */
export const SerialPortsConnect = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SerialPortsConnectInput,
  outputSchema: SerialPortsConnectOutput,
}));
// Input Schema
export const SerialPortsCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceProviderNamespace: Schema.String.pipe(T.PathParam()),
    parentResourceType: Schema.String.pipe(T.PathParam()),
    parentResource: Schema.String.pipe(T.PathParam()),
    serialPort: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{parentResourceType}/{parentResource}/providers/Microsoft.SerialConsole/serialPorts/{serialPort}",
  }),
);
export type SerialPortsCreateInput = typeof SerialPortsCreateInput.Type;

// Output Schema
export const SerialPortsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SerialPortsCreateOutput = typeof SerialPortsCreateOutput.Type;

// The operation
/**
 * Creates or updates a serial port
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group.
 * @param resourceProviderNamespace - The resource provider namespace of the parent resource.
 * @param parentResourceType - The resource type of the parent resource. For example: 'virtualMachines' or 'virtualMachineScaleSets'
 * @param parentResource - The name of the parent resource.
 * @param serialPort - The name of the serial port to connect to.
 */
export const SerialPortsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SerialPortsCreateInput,
  outputSchema: SerialPortsCreateOutput,
}));
// Input Schema
export const SerialPortsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  resourceProviderNamespace: Schema.String.pipe(T.PathParam()),
  parentResourceType: Schema.String.pipe(T.PathParam()),
  parentResource: Schema.String.pipe(T.PathParam()),
  serialPort: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{parentResourceType}/{parentResource}/providers/Microsoft.SerialConsole/serialPorts/{serialPort}",
  }),
);
export type SerialPortsGetInput = typeof SerialPortsGetInput.Type;

// Output Schema
export const SerialPortsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type SerialPortsGetOutput = typeof SerialPortsGetOutput.Type;

// The operation
/**
 * Gets the configured settings for a serial port
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group.
 * @param resourceProviderNamespace - The resource provider namespace of the parent resource.
 * @param parentResourceType - The resource type of the parent resource. For example: 'virtualMachines' or 'virtualMachineScaleSets'
 * @param parentResource - The name of the parent resource.
 * @param serialPort - The name of the serial port to connect to.
 */
export const SerialPortsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SerialPortsGetInput,
  outputSchema: SerialPortsGetOutput,
}));
// Input Schema
export const SerialPortsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  resourceProviderNamespace: Schema.String.pipe(T.PathParam()),
  parentResourceType: Schema.String.pipe(T.PathParam()),
  parentResource: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{parentResourceType}/{parentResource}/providers/Microsoft.SerialConsole/serialPorts",
  }),
);
export type SerialPortsListInput = typeof SerialPortsListInput.Type;

// Output Schema
export const SerialPortsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(Schema.Array(Schema.Struct({}))),
});
export type SerialPortsListOutput = typeof SerialPortsListOutput.Type;

// The operation
/**
 * Lists all of the configured serial ports for a parent resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group.
 * @param resourceProviderNamespace - The resource provider namespace of the parent resource.
 * @param parentResourceType - The resource type of the parent resource. For example: 'virtualMachines' or 'virtualMachineScaleSets'
 * @param parentResource - The name of the parent resource.
 */
export const SerialPortsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SerialPortsListInput,
  outputSchema: SerialPortsListOutput,
}));
// Input Schema
export const SerialPortsListBySubscriptionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.SerialConsole/serialPorts",
    }),
  );
export type SerialPortsListBySubscriptionsInput =
  typeof SerialPortsListBySubscriptionsInput.Type;

// Output Schema
export const SerialPortsListBySubscriptionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type SerialPortsListBySubscriptionsOutput =
  typeof SerialPortsListBySubscriptionsOutput.Type;

// The operation
/**
 * Handles requests to list all SerialPort resources in a subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const SerialPortsListBySubscriptions =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SerialPortsListBySubscriptionsInput,
    outputSchema: SerialPortsListBySubscriptionsOutput,
  }));
