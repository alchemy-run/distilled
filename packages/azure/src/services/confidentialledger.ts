/**
 * Azure Confidentialledger API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const CheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ConfidentialLedger/checkNameAvailability",
    }),
  );
export type CheckNameAvailabilityInput = typeof CheckNameAvailabilityInput.Type;

// Output Schema
export const CheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.Literals(["Invalid", "AlreadyExists"])),
    message: Schema.optional(Schema.String),
  });
export type CheckNameAvailabilityOutput =
  typeof CheckNameAvailabilityOutput.Type;

// The operation
/**
 * To check whether a resource name is available.
 * @param name - The name of the resource for which availability needs to be checked.
 * @param type - The resource type.
 */
export const CheckNameAvailability = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CheckNameAvailabilityInput,
    outputSchema: CheckNameAvailabilityOutput,
  }),
);
// Input Schema
export const LedgerCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConfidentialLedger/ledgers/{ledgerName}",
  }),
);
export type LedgerCreateInput = typeof LedgerCreateInput.Type;

// Output Schema
export const LedgerCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  name: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  systemData: Schema.optional(
    Schema.Struct({
      createdBy: Schema.optional(Schema.String),
      createdByType: Schema.optional(
        Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
      ),
      createdAt: Schema.optional(Schema.String),
      lastModifiedBy: Schema.optional(Schema.String),
      lastModifiedByType: Schema.optional(
        Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
      ),
      lastModifiedAt: Schema.optional(Schema.String),
    }),
  ),
  location: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
});
export type LedgerCreateOutput = typeof LedgerCreateOutput.Type;

// The operation
/**
 * Creates a  Confidential Ledger.
 *
 * Creates a  Confidential Ledger with the specified ledger parameters.
 */
export const LedgerCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LedgerCreateInput,
  outputSchema: LedgerCreateOutput,
}));
// Input Schema
export const LedgerDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConfidentialLedger/ledgers/{ledgerName}",
  }),
);
export type LedgerDeleteInput = typeof LedgerDeleteInput.Type;

// Output Schema
export const LedgerDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type LedgerDeleteOutput = typeof LedgerDeleteOutput.Type;

// The operation
/**
 * Deletes a Confidential Ledger resource.
 *
 * Deletes an existing Confidential Ledger.
 */
export const LedgerDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LedgerDeleteInput,
  outputSchema: LedgerDeleteOutput,
}));
// Input Schema
export const LedgerFilesExportInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    ledgerName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConfidentialLedger/ledgers/{ledgerName}/filesExport",
  }),
);
export type LedgerFilesExportInput = typeof LedgerFilesExportInput.Type;

// Output Schema
export const LedgerFilesExportOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    message: Schema.optional(Schema.String),
  });
export type LedgerFilesExportOutput = typeof LedgerFilesExportOutput.Type;

// The operation
/**
 * Copies the ledger files and the service certificate to a customer's storage account of choice.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param ledgerName - Name of the Confidential Ledger
 */
export const LedgerFilesExport = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LedgerFilesExportInput,
  outputSchema: LedgerFilesExportOutput,
}));
// Input Schema
export const LedgerGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConfidentialLedger/ledgers/{ledgerName}",
  }),
);
export type LedgerGetInput = typeof LedgerGetInput.Type;

// Output Schema
export const LedgerGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  name: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  systemData: Schema.optional(
    Schema.Struct({
      createdBy: Schema.optional(Schema.String),
      createdByType: Schema.optional(
        Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
      ),
      createdAt: Schema.optional(Schema.String),
      lastModifiedBy: Schema.optional(Schema.String),
      lastModifiedByType: Schema.optional(
        Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
      ),
      lastModifiedAt: Schema.optional(Schema.String),
    }),
  ),
  location: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
});
export type LedgerGetOutput = typeof LedgerGetOutput.Type;

// The operation
/**
 * Retrieves information about a Confidential Ledger resource.
 *
 * Retrieves the properties of a Confidential Ledger.
 */
export const LedgerGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LedgerGetInput,
  outputSchema: LedgerGetOutput,
}));
// Input Schema
export const LedgerListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConfidentialLedger/ledgers",
    }),
  );
export type LedgerListByResourceGroupInput =
  typeof LedgerListByResourceGroupInput.Type;

// Output Schema
export const LedgerListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          name: Schema.optional(Schema.String),
          id: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          systemData: Schema.optional(
            Schema.Struct({
              createdBy: Schema.optional(Schema.String),
              createdByType: Schema.optional(
                Schema.Literals([
                  "User",
                  "Application",
                  "ManagedIdentity",
                  "Key",
                ]),
              ),
              createdAt: Schema.optional(Schema.String),
              lastModifiedBy: Schema.optional(Schema.String),
              lastModifiedByType: Schema.optional(
                Schema.Literals([
                  "User",
                  "Application",
                  "ManagedIdentity",
                  "Key",
                ]),
              ),
              lastModifiedAt: Schema.optional(Schema.String),
            }),
          ),
          location: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type LedgerListByResourceGroupOutput =
  typeof LedgerListByResourceGroupOutput.Type;

// The operation
/**
 * Retrieves information about all Confidential Ledger resources under the given subscription and resource group
 *
 * Retrieves the properties of all Confidential Ledgers.
 *
 * @param $filter - The filter to apply on the list operation. eg. $filter=ledgerType eq 'Public'
 */
export const LedgerListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LedgerListByResourceGroupInput,
    outputSchema: LedgerListByResourceGroupOutput,
  }),
);
// Input Schema
export const LedgerListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ConfidentialLedger/ledgers",
    }),
  );
export type LedgerListBySubscriptionInput =
  typeof LedgerListBySubscriptionInput.Type;

// Output Schema
export const LedgerListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          name: Schema.optional(Schema.String),
          id: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          systemData: Schema.optional(
            Schema.Struct({
              createdBy: Schema.optional(Schema.String),
              createdByType: Schema.optional(
                Schema.Literals([
                  "User",
                  "Application",
                  "ManagedIdentity",
                  "Key",
                ]),
              ),
              createdAt: Schema.optional(Schema.String),
              lastModifiedBy: Schema.optional(Schema.String),
              lastModifiedByType: Schema.optional(
                Schema.Literals([
                  "User",
                  "Application",
                  "ManagedIdentity",
                  "Key",
                ]),
              ),
              lastModifiedAt: Schema.optional(Schema.String),
            }),
          ),
          location: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type LedgerListBySubscriptionOutput =
  typeof LedgerListBySubscriptionOutput.Type;

// The operation
/**
 * Retrieves information about all Confidential Ledger resources under the given subscription
 *
 * Retrieves the properties of all Confidential Ledgers.
 *
 * @param $filter - The filter to apply on the list operation. eg. $filter=ledgerType eq 'Public'
 */
export const LedgerListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LedgerListBySubscriptionInput,
    outputSchema: LedgerListBySubscriptionOutput,
  }),
);
// Input Schema
export const LedgerUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConfidentialLedger/ledgers/{ledgerName}",
  }),
);
export type LedgerUpdateInput = typeof LedgerUpdateInput.Type;

// Output Schema
export const LedgerUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  name: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  systemData: Schema.optional(
    Schema.Struct({
      createdBy: Schema.optional(Schema.String),
      createdByType: Schema.optional(
        Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
      ),
      createdAt: Schema.optional(Schema.String),
      lastModifiedBy: Schema.optional(Schema.String),
      lastModifiedByType: Schema.optional(
        Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
      ),
      lastModifiedAt: Schema.optional(Schema.String),
    }),
  ),
  location: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
});
export type LedgerUpdateOutput = typeof LedgerUpdateOutput.Type;

// The operation
/**
 * Update Confidential Ledger properties
 *
 * Updates properties of Confidential Ledger
 */
export const LedgerUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LedgerUpdateInput,
  outputSchema: LedgerUpdateOutput,
}));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.ConfidentialLedger/operations",
  }),
);
export type OperationsListInput = typeof OperationsListInput.Type;

// Output Schema
export const OperationsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
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
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type OperationsListOutput = typeof OperationsListOutput.Type;

// The operation
/**
 * Retrieves a list of available API operations under this Resource Provider.
 *
 * Retrieves a list of available API operations
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
