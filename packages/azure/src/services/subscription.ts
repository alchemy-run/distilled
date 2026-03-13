/**
 * Azure Subscription API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const AliasCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "PUT",
    path: "/providers/Microsoft.Subscription/aliases/{aliasName}",
  }),
);
export type AliasCreateInput = typeof AliasCreateInput.Type;

// Output Schema
export const AliasCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  properties: Schema.optional(
    Schema.Struct({
      subscriptionId: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      provisioningState: Schema.optional(
        Schema.Literals(["Accepted", "Succeeded", "Failed"]),
      ),
      acceptOwnershipUrl: Schema.optional(Schema.String),
      acceptOwnershipState: Schema.optional(
        Schema.Literals(["Pending", "Completed", "Expired"]),
      ),
      billingScope: Schema.optional(Schema.String),
      workload: Schema.optional(Schema.Literals(["Production", "DevTest"])),
      resellerId: Schema.optional(Schema.String),
      subscriptionOwnerId: Schema.optional(Schema.String),
      managementGroupId: Schema.optional(Schema.String),
      createdTime: Schema.optional(Schema.String),
      tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  ),
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
});
export type AliasCreateOutput = typeof AliasCreateOutput.Type;

// The operation
/**
 * Create Alias Subscription.
 */
export const AliasCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AliasCreateInput,
  outputSchema: AliasCreateOutput,
}));
// Input Schema
export const AliasDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "DELETE",
    path: "/providers/Microsoft.Subscription/aliases/{aliasName}",
  }),
);
export type AliasDeleteInput = typeof AliasDeleteInput.Type;

// Output Schema
export const AliasDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AliasDeleteOutput = typeof AliasDeleteOutput.Type;

// The operation
/**
 * Delete Alias.
 */
export const AliasDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AliasDeleteInput,
  outputSchema: AliasDeleteOutput,
}));
// Input Schema
export const AliasGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.Subscription/aliases/{aliasName}",
  }),
);
export type AliasGetInput = typeof AliasGetInput.Type;

// Output Schema
export const AliasGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  properties: Schema.optional(
    Schema.Struct({
      subscriptionId: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      provisioningState: Schema.optional(
        Schema.Literals(["Accepted", "Succeeded", "Failed"]),
      ),
      acceptOwnershipUrl: Schema.optional(Schema.String),
      acceptOwnershipState: Schema.optional(
        Schema.Literals(["Pending", "Completed", "Expired"]),
      ),
      billingScope: Schema.optional(Schema.String),
      workload: Schema.optional(Schema.Literals(["Production", "DevTest"])),
      resellerId: Schema.optional(Schema.String),
      subscriptionOwnerId: Schema.optional(Schema.String),
      managementGroupId: Schema.optional(Schema.String),
      createdTime: Schema.optional(Schema.String),
      tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  ),
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
});
export type AliasGetOutput = typeof AliasGetOutput.Type;

// The operation
/**
 * Get Alias Subscription.
 */
export const AliasGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AliasGetInput,
  outputSchema: AliasGetOutput,
}));
// Input Schema
export const AliasListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({ method: "GET", path: "/providers/Microsoft.Subscription/aliases" }),
);
export type AliasListInput = typeof AliasListInput.Type;

// Output Schema
export const AliasListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
        properties: Schema.optional(
          Schema.Struct({
            subscriptionId: Schema.optional(Schema.String),
            displayName: Schema.optional(Schema.String),
            provisioningState: Schema.optional(
              Schema.Literals(["Accepted", "Succeeded", "Failed"]),
            ),
            acceptOwnershipUrl: Schema.optional(Schema.String),
            acceptOwnershipState: Schema.optional(
              Schema.Literals(["Pending", "Completed", "Expired"]),
            ),
            billingScope: Schema.optional(Schema.String),
            workload: Schema.optional(
              Schema.Literals(["Production", "DevTest"]),
            ),
            resellerId: Schema.optional(Schema.String),
            subscriptionOwnerId: Schema.optional(Schema.String),
            managementGroupId: Schema.optional(Schema.String),
            createdTime: Schema.optional(Schema.String),
            tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          }),
        ),
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
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type AliasListOutput = typeof AliasListOutput.Type;

// The operation
/**
 * List Alias Subscription.
 */
export const AliasList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AliasListInput,
  outputSchema: AliasListOutput,
}));
// Input Schema
export const BillingAccountGetPolicyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/providers/Microsoft.Subscription/policies/default",
    }),
  );
export type BillingAccountGetPolicyInput =
  typeof BillingAccountGetPolicyInput.Type;

// Output Schema
export const BillingAccountGetPolicyOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        serviceTenants: Schema.optional(
          Schema.Array(
            Schema.Struct({
              tenantId: Schema.optional(Schema.String),
              tenantName: Schema.optional(Schema.String),
            }),
          ),
        ),
        allowTransfers: Schema.optional(Schema.Boolean),
      }),
    ),
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
  });
export type BillingAccountGetPolicyOutput =
  typeof BillingAccountGetPolicyOutput.Type;

// The operation
/**
 * Get Billing Account Policy.
 */
export const BillingAccountGetPolicy = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BillingAccountGetPolicyInput,
    outputSchema: BillingAccountGetPolicyOutput,
  }),
);
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.Subscription/operations",
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
 * Lists all of the available Microsoft.Subscription API operations.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const SubscriptionAcceptOwnershipInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Subscription/subscriptions/{subscriptionId}/acceptOwnership",
    }),
  );
export type SubscriptionAcceptOwnershipInput =
  typeof SubscriptionAcceptOwnershipInput.Type;

// Output Schema
export const SubscriptionAcceptOwnershipOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SubscriptionAcceptOwnershipOutput =
  typeof SubscriptionAcceptOwnershipOutput.Type;

// The operation
/**
 * Accept subscription ownership.
 */
export const SubscriptionAcceptOwnership = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SubscriptionAcceptOwnershipInput,
    outputSchema: SubscriptionAcceptOwnershipOutput,
  }),
);
// Input Schema
export const SubscriptionAcceptOwnershipStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Subscription/subscriptions/{subscriptionId}/acceptOwnershipStatus",
    }),
  );
export type SubscriptionAcceptOwnershipStatusInput =
  typeof SubscriptionAcceptOwnershipStatusInput.Type;

// Output Schema
export const SubscriptionAcceptOwnershipStatusOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.optional(Schema.String),
    acceptOwnershipState: Schema.optional(
      Schema.Literals(["Pending", "Completed", "Expired"]),
    ),
    provisioningState: Schema.optional(
      Schema.Literals(["Pending", "Accepted", "Succeeded"]),
    ),
    billingOwner: Schema.optional(Schema.String),
    subscriptionTenantId: Schema.optional(Schema.String),
    displayName: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type SubscriptionAcceptOwnershipStatusOutput =
  typeof SubscriptionAcceptOwnershipStatusOutput.Type;

// The operation
/**
 * Accept subscription ownership status.
 */
export const SubscriptionAcceptOwnershipStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SubscriptionAcceptOwnershipStatusInput,
    outputSchema: SubscriptionAcceptOwnershipStatusOutput,
  }));
// Input Schema
export const SubscriptionCancelInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Subscription/cancel",
    }),
  );
export type SubscriptionCancelInput = typeof SubscriptionCancelInput.Type;

// Output Schema
export const SubscriptionCancelOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.optional(Schema.String),
  });
export type SubscriptionCancelOutput = typeof SubscriptionCancelOutput.Type;

// The operation
/**
 * The operation to cancel a subscription
 */
export const SubscriptionCancel = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SubscriptionCancelInput,
  outputSchema: SubscriptionCancelOutput,
}));
// Input Schema
export const SubscriptionEnableInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Subscription/enable",
    }),
  );
export type SubscriptionEnableInput = typeof SubscriptionEnableInput.Type;

// Output Schema
export const SubscriptionEnableOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.optional(Schema.String),
  });
export type SubscriptionEnableOutput = typeof SubscriptionEnableOutput.Type;

// The operation
/**
 * The operation to enable a subscription
 */
export const SubscriptionEnable = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SubscriptionEnableInput,
  outputSchema: SubscriptionEnableOutput,
}));
// Input Schema
export const SubscriptionOperationGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    operationId: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Subscription/subscriptionOperations/{operationId}",
    }),
  );
export type SubscriptionOperationGetInput =
  typeof SubscriptionOperationGetInput.Type;

// Output Schema
export const SubscriptionOperationGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionLink: Schema.optional(Schema.String),
  });
export type SubscriptionOperationGetOutput =
  typeof SubscriptionOperationGetOutput.Type;

// The operation
/**
 * Get the status of the pending Microsoft.Subscription API operations.
 *
 * @param operationId - The operation ID, which can be found from the Location field in the generate recommendation response header.
 */
export const SubscriptionOperationGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SubscriptionOperationGetInput,
    outputSchema: SubscriptionOperationGetOutput,
  }),
);
// Input Schema
export const SubscriptionPolicyAddUpdatePolicyForTenantInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/providers/Microsoft.Subscription/policies/default",
    }),
  );
export type SubscriptionPolicyAddUpdatePolicyForTenantInput =
  typeof SubscriptionPolicyAddUpdatePolicyForTenantInput.Type;

// Output Schema
export const SubscriptionPolicyAddUpdatePolicyForTenantOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        policyId: Schema.optional(Schema.String),
        blockSubscriptionsLeavingTenant: Schema.optional(Schema.Boolean),
        blockSubscriptionsIntoTenant: Schema.optional(Schema.Boolean),
        exemptedPrincipals: Schema.optional(Schema.Array(Schema.String)),
      }),
    ),
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
  });
export type SubscriptionPolicyAddUpdatePolicyForTenantOutput =
  typeof SubscriptionPolicyAddUpdatePolicyForTenantOutput.Type;

// The operation
/**
 * Create or Update Subscription tenant policy for user's tenant.
 */
export const SubscriptionPolicyAddUpdatePolicyForTenant =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SubscriptionPolicyAddUpdatePolicyForTenantInput,
    outputSchema: SubscriptionPolicyAddUpdatePolicyForTenantOutput,
  }));
// Input Schema
export const SubscriptionPolicyGetPolicyForTenantInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Subscription/policies/default",
    }),
  );
export type SubscriptionPolicyGetPolicyForTenantInput =
  typeof SubscriptionPolicyGetPolicyForTenantInput.Type;

// Output Schema
export const SubscriptionPolicyGetPolicyForTenantOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        policyId: Schema.optional(Schema.String),
        blockSubscriptionsLeavingTenant: Schema.optional(Schema.Boolean),
        blockSubscriptionsIntoTenant: Schema.optional(Schema.Boolean),
        exemptedPrincipals: Schema.optional(Schema.Array(Schema.String)),
      }),
    ),
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
  });
export type SubscriptionPolicyGetPolicyForTenantOutput =
  typeof SubscriptionPolicyGetPolicyForTenantOutput.Type;

// The operation
/**
 * Get the subscription tenant policy for the user's tenant.
 */
export const SubscriptionPolicyGetPolicyForTenant =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SubscriptionPolicyGetPolicyForTenantInput,
    outputSchema: SubscriptionPolicyGetPolicyForTenantOutput,
  }));
// Input Schema
export const SubscriptionPolicyListPolicyForTenantInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Subscription/policies",
    }),
  );
export type SubscriptionPolicyListPolicyForTenantInput =
  typeof SubscriptionPolicyListPolicyForTenantInput.Type;

// Output Schema
export const SubscriptionPolicyListPolicyForTenantOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              policyId: Schema.optional(Schema.String),
              blockSubscriptionsLeavingTenant: Schema.optional(Schema.Boolean),
              blockSubscriptionsIntoTenant: Schema.optional(Schema.Boolean),
              exemptedPrincipals: Schema.optional(Schema.Array(Schema.String)),
            }),
          ),
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
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SubscriptionPolicyListPolicyForTenantOutput =
  typeof SubscriptionPolicyListPolicyForTenantOutput.Type;

// The operation
/**
 * Get the subscription tenant policy for the user's tenant.
 */
export const SubscriptionPolicyListPolicyForTenant =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SubscriptionPolicyListPolicyForTenantInput,
    outputSchema: SubscriptionPolicyListPolicyForTenantOutput,
  }));
// Input Schema
export const SubscriptionRenameInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Subscription/rename",
    }),
  );
export type SubscriptionRenameInput = typeof SubscriptionRenameInput.Type;

// Output Schema
export const SubscriptionRenameOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.optional(Schema.String),
  });
export type SubscriptionRenameOutput = typeof SubscriptionRenameOutput.Type;

// The operation
/**
 * The operation to rename a subscription
 */
export const SubscriptionRename = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SubscriptionRenameInput,
  outputSchema: SubscriptionRenameOutput,
}));
