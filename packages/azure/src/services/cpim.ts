/**
 * Azure Cpim API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const B2CTenantsCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AzureActiveDirectory/checkNameAvailability",
    }),
  );
export type B2CTenantsCheckNameAvailabilityInput =
  typeof B2CTenantsCheckNameAvailabilityInput.Type;

// Output Schema
export const B2CTenantsCheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    message: Schema.optional(Schema.String),
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.Literals(["AlreadyExists", "Invalid"])),
  });
export type B2CTenantsCheckNameAvailabilityOutput =
  typeof B2CTenantsCheckNameAvailabilityOutput.Type;

// The operation
/**
 * Checks the availability and validity of a domain name for the tenant.
 */
export const B2CTenantsCheckNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: B2CTenantsCheckNameAvailabilityInput,
    outputSchema: B2CTenantsCheckNameAvailabilityOutput,
  }));
// Input Schema
export const B2CTenantsCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureActiveDirectory/b2cDirectories/{resourceName}",
  }),
);
export type B2CTenantsCreateInput = typeof B2CTenantsCreateInput.Type;

// Output Schema
export const B2CTenantsCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    type: Schema.optional(
      Schema.Literals(["Microsoft.AzureActiveDirectory/b2cDirectories"]),
    ),
    sku: Schema.Struct({
      name: Schema.optional(
        Schema.Literals(["Standard", "PremiumP1", "PremiumP2"]),
      ),
      tier: Schema.optional(Schema.Literals(["A0"])),
    }),
    properties: Schema.optional(
      Schema.Struct({
        billingConfig: Schema.optional(
          Schema.Struct({
            billingType: Schema.optional(Schema.Literals(["MAU", "Auths"])),
            effectiveStartDateUtc: Schema.optional(Schema.String),
          }),
        ),
        tenantId: Schema.optional(Schema.String),
      }),
    ),
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
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
  },
);
export type B2CTenantsCreateOutput = typeof B2CTenantsCreateOutput.Type;

// The operation
/**
 * Initiates an async request to create both the Azure AD B2C tenant and the corresponding Azure resource linked to a subscription.
 */
export const B2CTenantsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: B2CTenantsCreateInput,
  outputSchema: B2CTenantsCreateOutput,
}));
// Input Schema
export const B2CTenantsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureActiveDirectory/b2cDirectories/{resourceName}",
  }),
);
export type B2CTenantsDeleteInput = typeof B2CTenantsDeleteInput.Type;

// Output Schema
export const B2CTenantsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type B2CTenantsDeleteOutput = typeof B2CTenantsDeleteOutput.Type;

// The operation
/**
 * Initiates an async operation to delete the Azure AD B2C tenant and Azure resource. The resource deletion can only happen as the last step in [the tenant deletion process](https://aka.ms/deleteB2Ctenant).
 */
export const B2CTenantsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: B2CTenantsDeleteInput,
  outputSchema: B2CTenantsDeleteOutput,
}));
// Input Schema
export const B2CTenantsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureActiveDirectory/b2cDirectories/{resourceName}",
  }),
);
export type B2CTenantsGetInput = typeof B2CTenantsGetInput.Type;

// Output Schema
export const B2CTenantsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  type: Schema.optional(
    Schema.Literals(["Microsoft.AzureActiveDirectory/b2cDirectories"]),
  ),
  sku: Schema.Struct({
    name: Schema.optional(
      Schema.Literals(["Standard", "PremiumP1", "PremiumP2"]),
    ),
    tier: Schema.optional(Schema.Literals(["A0"])),
  }),
  properties: Schema.optional(
    Schema.Struct({
      billingConfig: Schema.optional(
        Schema.Struct({
          billingType: Schema.optional(Schema.Literals(["MAU", "Auths"])),
          effectiveStartDateUtc: Schema.optional(Schema.String),
        }),
      ),
      tenantId: Schema.optional(Schema.String),
    }),
  ),
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  location: Schema.String,
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
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
export type B2CTenantsGetOutput = typeof B2CTenantsGetOutput.Type;

// The operation
/**
 * Get the Azure AD B2C tenant resource.
 */
export const B2CTenantsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: B2CTenantsGetInput,
  outputSchema: B2CTenantsGetOutput,
}));
// Input Schema
export const B2CTenantsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureActiveDirectory/b2cDirectories",
    }),
  );
export type B2CTenantsListByResourceGroupInput =
  typeof B2CTenantsListByResourceGroupInput.Type;

// Output Schema
export const B2CTenantsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          type: Schema.optional(
            Schema.Literals(["Microsoft.AzureActiveDirectory/b2cDirectories"]),
          ),
          sku: Schema.Struct({
            name: Schema.optional(
              Schema.Literals(["Standard", "PremiumP1", "PremiumP2"]),
            ),
            tier: Schema.optional(Schema.Literals(["A0"])),
          }),
          properties: Schema.optional(
            Schema.Struct({
              billingConfig: Schema.optional(
                Schema.Struct({
                  billingType: Schema.optional(
                    Schema.Literals(["MAU", "Auths"]),
                  ),
                  effectiveStartDateUtc: Schema.optional(Schema.String),
                }),
              ),
              tenantId: Schema.optional(Schema.String),
            }),
          ),
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          location: Schema.String,
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
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
  });
export type B2CTenantsListByResourceGroupOutput =
  typeof B2CTenantsListByResourceGroupOutput.Type;

// The operation
/**
 * Get all the Azure AD B2C tenant resources in a resource group.
 */
export const B2CTenantsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: B2CTenantsListByResourceGroupInput,
    outputSchema: B2CTenantsListByResourceGroupOutput,
  }));
// Input Schema
export const B2CTenantsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AzureActiveDirectory/b2cDirectories",
    }),
  );
export type B2CTenantsListBySubscriptionInput =
  typeof B2CTenantsListBySubscriptionInput.Type;

// Output Schema
export const B2CTenantsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          type: Schema.optional(
            Schema.Literals(["Microsoft.AzureActiveDirectory/b2cDirectories"]),
          ),
          sku: Schema.Struct({
            name: Schema.optional(
              Schema.Literals(["Standard", "PremiumP1", "PremiumP2"]),
            ),
            tier: Schema.optional(Schema.Literals(["A0"])),
          }),
          properties: Schema.optional(
            Schema.Struct({
              billingConfig: Schema.optional(
                Schema.Struct({
                  billingType: Schema.optional(
                    Schema.Literals(["MAU", "Auths"]),
                  ),
                  effectiveStartDateUtc: Schema.optional(Schema.String),
                }),
              ),
              tenantId: Schema.optional(Schema.String),
            }),
          ),
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          location: Schema.String,
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
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
  });
export type B2CTenantsListBySubscriptionOutput =
  typeof B2CTenantsListBySubscriptionOutput.Type;

// The operation
/**
 * Get all the Azure AD B2C tenant resources in a subscription.
 */
export const B2CTenantsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: B2CTenantsListBySubscriptionInput,
    outputSchema: B2CTenantsListBySubscriptionOutput,
  }));
// Input Schema
export const B2CTenantsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureActiveDirectory/b2cDirectories/{resourceName}",
  }),
);
export type B2CTenantsUpdateInput = typeof B2CTenantsUpdateInput.Type;

// Output Schema
export const B2CTenantsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    type: Schema.optional(
      Schema.Literals(["Microsoft.AzureActiveDirectory/b2cDirectories"]),
    ),
    sku: Schema.Struct({
      name: Schema.optional(
        Schema.Literals(["Standard", "PremiumP1", "PremiumP2"]),
      ),
      tier: Schema.optional(Schema.Literals(["A0"])),
    }),
    properties: Schema.optional(
      Schema.Struct({
        billingConfig: Schema.optional(
          Schema.Struct({
            billingType: Schema.optional(Schema.Literals(["MAU", "Auths"])),
            effectiveStartDateUtc: Schema.optional(Schema.String),
          }),
        ),
        tenantId: Schema.optional(Schema.String),
      }),
    ),
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
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
  },
);
export type B2CTenantsUpdateOutput = typeof B2CTenantsUpdateOutput.Type;

// The operation
/**
 * Update the Azure AD B2C tenant resource.
 */
export const B2CTenantsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: B2CTenantsUpdateInput,
  outputSchema: B2CTenantsUpdateOutput,
}));
// Input Schema
export const GuestUsagesCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureActiveDirectory/guestUsages/{resourceName}",
  }),
);
export type GuestUsagesCreateInput = typeof GuestUsagesCreateInput.Type;

// Output Schema
export const GuestUsagesCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    properties: Schema.optional(
      Schema.Struct({
        tenantId: Schema.optional(Schema.String),
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
export type GuestUsagesCreateOutput = typeof GuestUsagesCreateOutput.Type;

// The operation
/**
 * Creates a Guest Usages resource
 *
 * Creates a Guest Usages resource, which is used to linking a subscription to an instance of Azure AD External Identities. [Learn more](https://aka.ms/extidbilling).
 */
export const GuestUsagesCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GuestUsagesCreateInput,
  outputSchema: GuestUsagesCreateOutput,
}));
// Input Schema
export const GuestUsagesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureActiveDirectory/guestUsages/{resourceName}",
  }),
);
export type GuestUsagesDeleteInput = typeof GuestUsagesDeleteInput.Type;

// Output Schema
export const GuestUsagesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GuestUsagesDeleteOutput = typeof GuestUsagesDeleteOutput.Type;

// The operation
/**
 * Deletes a Guest Usages resource
 *
 * Deletes a Guest Usages resource for the Microsoft.AzureActiveDirectory resource provider
 */
export const GuestUsagesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GuestUsagesDeleteInput,
  outputSchema: GuestUsagesDeleteOutput,
}));
// Input Schema
export const GuestUsagesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureActiveDirectory/guestUsages/{resourceName}",
  }),
);
export type GuestUsagesGetInput = typeof GuestUsagesGetInput.Type;

// Output Schema
export const GuestUsagesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  properties: Schema.optional(
    Schema.Struct({
      tenantId: Schema.optional(Schema.String),
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
export type GuestUsagesGetOutput = typeof GuestUsagesGetOutput.Type;

// The operation
/**
 * Gets a Guest Usages resource
 *
 * Gets a Guest Usages resource for the Microsoft.AzureActiveDirectory resource provider
 */
export const GuestUsagesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GuestUsagesGetInput,
  outputSchema: GuestUsagesGetOutput,
}));
// Input Schema
export const GuestUsagesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureActiveDirectory/guestUsages",
    }),
  );
export type GuestUsagesListByResourceGroupInput =
  typeof GuestUsagesListByResourceGroupInput.Type;

// Output Schema
export const GuestUsagesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          properties: Schema.optional(
            Schema.Struct({
              tenantId: Schema.optional(Schema.String),
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
  });
export type GuestUsagesListByResourceGroupOutput =
  typeof GuestUsagesListByResourceGroupOutput.Type;

// The operation
/**
 * Gets Guest Usages resources under resource group
 *
 * Gets Guest Usages resources under a resource group for the Microsoft.AzureActiveDirectory resource provider
 */
export const GuestUsagesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GuestUsagesListByResourceGroupInput,
    outputSchema: GuestUsagesListByResourceGroupOutput,
  }));
// Input Schema
export const GuestUsagesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AzureActiveDirectory/guestUsages",
    }),
  );
export type GuestUsagesListBySubscriptionInput =
  typeof GuestUsagesListBySubscriptionInput.Type;

// Output Schema
export const GuestUsagesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          properties: Schema.optional(
            Schema.Struct({
              tenantId: Schema.optional(Schema.String),
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
  });
export type GuestUsagesListBySubscriptionOutput =
  typeof GuestUsagesListBySubscriptionOutput.Type;

// The operation
/**
 * Gets Guest Usages resources under a subscription
 *
 * Gets Guest Usages resources under a subscription for the Microsoft.AzureActiveDirectory resource provider
 */
export const GuestUsagesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GuestUsagesListBySubscriptionInput,
    outputSchema: GuestUsagesListBySubscriptionOutput,
  }));
// Input Schema
export const GuestUsagesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureActiveDirectory/guestUsages/{resourceName}",
  }),
);
export type GuestUsagesUpdateInput = typeof GuestUsagesUpdateInput.Type;

// Output Schema
export const GuestUsagesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    properties: Schema.optional(
      Schema.Struct({
        tenantId: Schema.optional(Schema.String),
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
export type GuestUsagesUpdateOutput = typeof GuestUsagesUpdateOutput.Type;

// The operation
/**
 * Updates a Guest Usages resource
 *
 * Updates a Guest Usages resource for the Microsoft.AzureActiveDirectory resource provider
 */
export const GuestUsagesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GuestUsagesUpdateInput,
  outputSchema: GuestUsagesUpdateOutput,
}));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.AzureActiveDirectory/operations",
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
        origin: Schema.optional(Schema.String),
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type OperationsListOutput = typeof OperationsListOutput.Type;

// The operation
/**
 * Lists the operations available from this provider.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
