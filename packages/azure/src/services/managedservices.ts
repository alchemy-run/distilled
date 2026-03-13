/**
 * Azure Managedservices API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const MarketplaceRegistrationDefinitionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/{scope}/providers/Microsoft.ManagedServices/marketplaceRegistrationDefinitions/{marketplaceIdentifier}",
    }),
  );
export type MarketplaceRegistrationDefinitionsGetInput =
  typeof MarketplaceRegistrationDefinitionsGetInput.Type;

// Output Schema
export const MarketplaceRegistrationDefinitionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.optional(
      Schema.Struct({
        managedByTenantId: Schema.String,
        authorizations: Schema.Array(
          Schema.Struct({
            principalId: Schema.String,
            principalIdDisplayName: Schema.optional(Schema.String),
            roleDefinitionId: Schema.String,
            delegatedRoleDefinitionIds: Schema.optional(
              Schema.Array(Schema.String),
            ),
          }),
        ),
        eligibleAuthorizations: Schema.optional(
          Schema.Array(
            Schema.Struct({
              principalId: Schema.String,
              principalIdDisplayName: Schema.optional(Schema.String),
              roleDefinitionId: Schema.String,
              justInTimeAccessPolicy: Schema.optional(
                Schema.Struct({
                  multiFactorAuthProvider: Schema.Literals(["Azure", "None"]),
                  maximumActivationDuration: Schema.optional(Schema.String),
                  managedByTenantApprovers: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        principalId: Schema.String,
                        principalIdDisplayName: Schema.optional(Schema.String),
                      }),
                    ),
                  ),
                }),
              ),
            }),
          ),
        ),
        offerDisplayName: Schema.optional(Schema.String),
        publisherDisplayName: Schema.optional(Schema.String),
        planDisplayName: Schema.optional(Schema.String),
      }),
    ),
    plan: Schema.optional(
      Schema.Struct({
        name: Schema.String,
        publisher: Schema.String,
        product: Schema.String,
        version: Schema.String,
      }),
    ),
    id: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
  });
export type MarketplaceRegistrationDefinitionsGetOutput =
  typeof MarketplaceRegistrationDefinitionsGetOutput.Type;

// The operation
/**
 * Get the marketplace registration definition for the marketplace identifier.
 */
export const MarketplaceRegistrationDefinitionsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MarketplaceRegistrationDefinitionsGetInput,
    outputSchema: MarketplaceRegistrationDefinitionsGetOutput,
  }));
// Input Schema
export const MarketplaceRegistrationDefinitionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/{scope}/providers/Microsoft.ManagedServices/marketplaceRegistrationDefinitions",
    }),
  );
export type MarketplaceRegistrationDefinitionsListInput =
  typeof MarketplaceRegistrationDefinitionsListInput.Type;

// Output Schema
export const MarketplaceRegistrationDefinitionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          properties: Schema.optional(
            Schema.Struct({
              managedByTenantId: Schema.String,
              authorizations: Schema.Array(
                Schema.Struct({
                  principalId: Schema.String,
                  principalIdDisplayName: Schema.optional(Schema.String),
                  roleDefinitionId: Schema.String,
                  delegatedRoleDefinitionIds: Schema.optional(
                    Schema.Array(Schema.String),
                  ),
                }),
              ),
              eligibleAuthorizations: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    principalId: Schema.String,
                    principalIdDisplayName: Schema.optional(Schema.String),
                    roleDefinitionId: Schema.String,
                    justInTimeAccessPolicy: Schema.optional(
                      Schema.Struct({
                        multiFactorAuthProvider: Schema.Literals([
                          "Azure",
                          "None",
                        ]),
                        maximumActivationDuration: Schema.optional(
                          Schema.String,
                        ),
                        managedByTenantApprovers: Schema.optional(
                          Schema.Array(
                            Schema.Struct({
                              principalId: Schema.String,
                              principalIdDisplayName: Schema.optional(
                                Schema.String,
                              ),
                            }),
                          ),
                        ),
                      }),
                    ),
                  }),
                ),
              ),
              offerDisplayName: Schema.optional(Schema.String),
              publisherDisplayName: Schema.optional(Schema.String),
              planDisplayName: Schema.optional(Schema.String),
            }),
          ),
          plan: Schema.optional(
            Schema.Struct({
              name: Schema.String,
              publisher: Schema.String,
              product: Schema.String,
              version: Schema.String,
            }),
          ),
          id: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type MarketplaceRegistrationDefinitionsListOutput =
  typeof MarketplaceRegistrationDefinitionsListOutput.Type;

// The operation
/**
 * Gets a list of the marketplace registration definitions for the marketplace identifier.
 */
export const MarketplaceRegistrationDefinitionsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MarketplaceRegistrationDefinitionsListInput,
    outputSchema: MarketplaceRegistrationDefinitionsListOutput,
  }));
// Input Schema
export const MarketplaceRegistrationDefinitionsWithoutScopeGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ManagedServices/marketplaceRegistrationDefinitions/{marketplaceIdentifier}",
    }),
  );
export type MarketplaceRegistrationDefinitionsWithoutScopeGetInput =
  typeof MarketplaceRegistrationDefinitionsWithoutScopeGetInput.Type;

// Output Schema
export const MarketplaceRegistrationDefinitionsWithoutScopeGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.optional(
      Schema.Struct({
        managedByTenantId: Schema.String,
        authorizations: Schema.Array(
          Schema.Struct({
            principalId: Schema.String,
            principalIdDisplayName: Schema.optional(Schema.String),
            roleDefinitionId: Schema.String,
            delegatedRoleDefinitionIds: Schema.optional(
              Schema.Array(Schema.String),
            ),
          }),
        ),
        eligibleAuthorizations: Schema.optional(
          Schema.Array(
            Schema.Struct({
              principalId: Schema.String,
              principalIdDisplayName: Schema.optional(Schema.String),
              roleDefinitionId: Schema.String,
              justInTimeAccessPolicy: Schema.optional(
                Schema.Struct({
                  multiFactorAuthProvider: Schema.Literals(["Azure", "None"]),
                  maximumActivationDuration: Schema.optional(Schema.String),
                  managedByTenantApprovers: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        principalId: Schema.String,
                        principalIdDisplayName: Schema.optional(Schema.String),
                      }),
                    ),
                  ),
                }),
              ),
            }),
          ),
        ),
        offerDisplayName: Schema.optional(Schema.String),
        publisherDisplayName: Schema.optional(Schema.String),
        planDisplayName: Schema.optional(Schema.String),
      }),
    ),
    plan: Schema.optional(
      Schema.Struct({
        name: Schema.String,
        publisher: Schema.String,
        product: Schema.String,
        version: Schema.String,
      }),
    ),
    id: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
  });
export type MarketplaceRegistrationDefinitionsWithoutScopeGetOutput =
  typeof MarketplaceRegistrationDefinitionsWithoutScopeGetOutput.Type;

// The operation
/**
 * Get the marketplace registration definition for the marketplace identifier.
 */
export const MarketplaceRegistrationDefinitionsWithoutScopeGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MarketplaceRegistrationDefinitionsWithoutScopeGetInput,
    outputSchema: MarketplaceRegistrationDefinitionsWithoutScopeGetOutput,
  }));
// Input Schema
export const MarketplaceRegistrationDefinitionsWithoutScopeListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ManagedServices/marketplaceRegistrationDefinitions",
    }),
  );
export type MarketplaceRegistrationDefinitionsWithoutScopeListInput =
  typeof MarketplaceRegistrationDefinitionsWithoutScopeListInput.Type;

// Output Schema
export const MarketplaceRegistrationDefinitionsWithoutScopeListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          properties: Schema.optional(
            Schema.Struct({
              managedByTenantId: Schema.String,
              authorizations: Schema.Array(
                Schema.Struct({
                  principalId: Schema.String,
                  principalIdDisplayName: Schema.optional(Schema.String),
                  roleDefinitionId: Schema.String,
                  delegatedRoleDefinitionIds: Schema.optional(
                    Schema.Array(Schema.String),
                  ),
                }),
              ),
              eligibleAuthorizations: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    principalId: Schema.String,
                    principalIdDisplayName: Schema.optional(Schema.String),
                    roleDefinitionId: Schema.String,
                    justInTimeAccessPolicy: Schema.optional(
                      Schema.Struct({
                        multiFactorAuthProvider: Schema.Literals([
                          "Azure",
                          "None",
                        ]),
                        maximumActivationDuration: Schema.optional(
                          Schema.String,
                        ),
                        managedByTenantApprovers: Schema.optional(
                          Schema.Array(
                            Schema.Struct({
                              principalId: Schema.String,
                              principalIdDisplayName: Schema.optional(
                                Schema.String,
                              ),
                            }),
                          ),
                        ),
                      }),
                    ),
                  }),
                ),
              ),
              offerDisplayName: Schema.optional(Schema.String),
              publisherDisplayName: Schema.optional(Schema.String),
              planDisplayName: Schema.optional(Schema.String),
            }),
          ),
          plan: Schema.optional(
            Schema.Struct({
              name: Schema.String,
              publisher: Schema.String,
              product: Schema.String,
              version: Schema.String,
            }),
          ),
          id: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type MarketplaceRegistrationDefinitionsWithoutScopeListOutput =
  typeof MarketplaceRegistrationDefinitionsWithoutScopeListOutput.Type;

// The operation
/**
 * Gets a list of the marketplace registration definitions for the marketplace identifier.
 */
export const MarketplaceRegistrationDefinitionsWithoutScopeList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MarketplaceRegistrationDefinitionsWithoutScopeListInput,
    outputSchema: MarketplaceRegistrationDefinitionsWithoutScopeListOutput,
  }));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.ManagedServices/operations",
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
 * Gets a list of the operations.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const OperationsWithScopeListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/{scope}/providers/Microsoft.ManagedServices/operations",
    }),
  );
export type OperationsWithScopeListInput =
  typeof OperationsWithScopeListInput.Type;

// Output Schema
export const OperationsWithScopeListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
export type OperationsWithScopeListOutput =
  typeof OperationsWithScopeListOutput.Type;

// The operation
/**
 * Gets a list of the operations with the scope.
 */
export const OperationsWithScopeList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: OperationsWithScopeListInput,
    outputSchema: OperationsWithScopeListOutput,
  }),
);
// Input Schema
export const RegistrationAssignmentsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/{scope}/providers/Microsoft.ManagedServices/registrationAssignments/{registrationAssignmentId}",
    }),
  );
export type RegistrationAssignmentsCreateOrUpdateInput =
  typeof RegistrationAssignmentsCreateOrUpdateInput.Type;

// Output Schema
export const RegistrationAssignmentsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.optional(
      Schema.Struct({
        registrationDefinitionId: Schema.String,
        provisioningState: Schema.optional(
          Schema.Literals([
            "NotSpecified",
            "Accepted",
            "Running",
            "Ready",
            "Creating",
            "Created",
            "Deleting",
            "Deleted",
            "Canceled",
            "Failed",
            "Succeeded",
            "Updating",
          ]),
        ),
        registrationDefinition: Schema.optional(
          Schema.Struct({
            properties: Schema.optional(
              Schema.Struct({
                description: Schema.optional(Schema.String),
                authorizations: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      principalId: Schema.String,
                      principalIdDisplayName: Schema.optional(Schema.String),
                      roleDefinitionId: Schema.String,
                      delegatedRoleDefinitionIds: Schema.optional(
                        Schema.Array(Schema.String),
                      ),
                    }),
                  ),
                ),
                eligibleAuthorizations: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      principalId: Schema.String,
                      principalIdDisplayName: Schema.optional(Schema.String),
                      roleDefinitionId: Schema.String,
                      justInTimeAccessPolicy: Schema.optional(
                        Schema.Struct({
                          multiFactorAuthProvider: Schema.Literals([
                            "Azure",
                            "None",
                          ]),
                          maximumActivationDuration: Schema.optional(
                            Schema.String,
                          ),
                          managedByTenantApprovers: Schema.optional(
                            Schema.Array(
                              Schema.Struct({
                                principalId: Schema.String,
                                principalIdDisplayName: Schema.optional(
                                  Schema.String,
                                ),
                              }),
                            ),
                          ),
                        }),
                      ),
                    }),
                  ),
                ),
                registrationDefinitionName: Schema.optional(Schema.String),
                provisioningState: Schema.optional(
                  Schema.Literals([
                    "NotSpecified",
                    "Accepted",
                    "Running",
                    "Ready",
                    "Creating",
                    "Created",
                    "Deleting",
                    "Deleted",
                    "Canceled",
                    "Failed",
                    "Succeeded",
                    "Updating",
                  ]),
                ),
                manageeTenantId: Schema.optional(Schema.String),
                manageeTenantName: Schema.optional(Schema.String),
                managedByTenantId: Schema.optional(Schema.String),
                managedByTenantName: Schema.optional(Schema.String),
              }),
            ),
            plan: Schema.optional(
              Schema.Struct({
                name: Schema.String,
                publisher: Schema.String,
                product: Schema.String,
                version: Schema.String,
              }),
            ),
            id: Schema.optional(Schema.String),
            type: Schema.optional(Schema.String),
            name: Schema.optional(Schema.String),
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
      }),
    ),
    id: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
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
export type RegistrationAssignmentsCreateOrUpdateOutput =
  typeof RegistrationAssignmentsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a registration assignment.
 */
export const RegistrationAssignmentsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RegistrationAssignmentsCreateOrUpdateInput,
    outputSchema: RegistrationAssignmentsCreateOrUpdateOutput,
  }));
// Input Schema
export const RegistrationAssignmentsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "DELETE",
      path: "/{scope}/providers/Microsoft.ManagedServices/registrationAssignments/{registrationAssignmentId}",
    }),
  );
export type RegistrationAssignmentsDeleteInput =
  typeof RegistrationAssignmentsDeleteInput.Type;

// Output Schema
export const RegistrationAssignmentsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RegistrationAssignmentsDeleteOutput =
  typeof RegistrationAssignmentsDeleteOutput.Type;

// The operation
/**
 * Deletes the specified registration assignment.
 */
export const RegistrationAssignmentsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RegistrationAssignmentsDeleteInput,
    outputSchema: RegistrationAssignmentsDeleteOutput,
  }));
// Input Schema
export const RegistrationAssignmentsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/{scope}/providers/Microsoft.ManagedServices/registrationAssignments/{registrationAssignmentId}",
    }),
  );
export type RegistrationAssignmentsGetInput =
  typeof RegistrationAssignmentsGetInput.Type;

// Output Schema
export const RegistrationAssignmentsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.optional(
      Schema.Struct({
        registrationDefinitionId: Schema.String,
        provisioningState: Schema.optional(
          Schema.Literals([
            "NotSpecified",
            "Accepted",
            "Running",
            "Ready",
            "Creating",
            "Created",
            "Deleting",
            "Deleted",
            "Canceled",
            "Failed",
            "Succeeded",
            "Updating",
          ]),
        ),
        registrationDefinition: Schema.optional(
          Schema.Struct({
            properties: Schema.optional(
              Schema.Struct({
                description: Schema.optional(Schema.String),
                authorizations: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      principalId: Schema.String,
                      principalIdDisplayName: Schema.optional(Schema.String),
                      roleDefinitionId: Schema.String,
                      delegatedRoleDefinitionIds: Schema.optional(
                        Schema.Array(Schema.String),
                      ),
                    }),
                  ),
                ),
                eligibleAuthorizations: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      principalId: Schema.String,
                      principalIdDisplayName: Schema.optional(Schema.String),
                      roleDefinitionId: Schema.String,
                      justInTimeAccessPolicy: Schema.optional(
                        Schema.Struct({
                          multiFactorAuthProvider: Schema.Literals([
                            "Azure",
                            "None",
                          ]),
                          maximumActivationDuration: Schema.optional(
                            Schema.String,
                          ),
                          managedByTenantApprovers: Schema.optional(
                            Schema.Array(
                              Schema.Struct({
                                principalId: Schema.String,
                                principalIdDisplayName: Schema.optional(
                                  Schema.String,
                                ),
                              }),
                            ),
                          ),
                        }),
                      ),
                    }),
                  ),
                ),
                registrationDefinitionName: Schema.optional(Schema.String),
                provisioningState: Schema.optional(
                  Schema.Literals([
                    "NotSpecified",
                    "Accepted",
                    "Running",
                    "Ready",
                    "Creating",
                    "Created",
                    "Deleting",
                    "Deleted",
                    "Canceled",
                    "Failed",
                    "Succeeded",
                    "Updating",
                  ]),
                ),
                manageeTenantId: Schema.optional(Schema.String),
                manageeTenantName: Schema.optional(Schema.String),
                managedByTenantId: Schema.optional(Schema.String),
                managedByTenantName: Schema.optional(Schema.String),
              }),
            ),
            plan: Schema.optional(
              Schema.Struct({
                name: Schema.String,
                publisher: Schema.String,
                product: Schema.String,
                version: Schema.String,
              }),
            ),
            id: Schema.optional(Schema.String),
            type: Schema.optional(Schema.String),
            name: Schema.optional(Schema.String),
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
      }),
    ),
    id: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
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
export type RegistrationAssignmentsGetOutput =
  typeof RegistrationAssignmentsGetOutput.Type;

// The operation
/**
 * Gets the details of the specified registration assignment.
 */
export const RegistrationAssignmentsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RegistrationAssignmentsGetInput,
    outputSchema: RegistrationAssignmentsGetOutput,
  }),
);
// Input Schema
export const RegistrationAssignmentsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/{scope}/providers/Microsoft.ManagedServices/registrationAssignments",
    }),
  );
export type RegistrationAssignmentsListInput =
  typeof RegistrationAssignmentsListInput.Type;

// Output Schema
export const RegistrationAssignmentsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          properties: Schema.optional(
            Schema.Struct({
              registrationDefinitionId: Schema.String,
              provisioningState: Schema.optional(
                Schema.Literals([
                  "NotSpecified",
                  "Accepted",
                  "Running",
                  "Ready",
                  "Creating",
                  "Created",
                  "Deleting",
                  "Deleted",
                  "Canceled",
                  "Failed",
                  "Succeeded",
                  "Updating",
                ]),
              ),
              registrationDefinition: Schema.optional(
                Schema.Struct({
                  properties: Schema.optional(
                    Schema.Struct({
                      description: Schema.optional(Schema.String),
                      authorizations: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            principalId: Schema.String,
                            principalIdDisplayName: Schema.optional(
                              Schema.String,
                            ),
                            roleDefinitionId: Schema.String,
                            delegatedRoleDefinitionIds: Schema.optional(
                              Schema.Array(Schema.String),
                            ),
                          }),
                        ),
                      ),
                      eligibleAuthorizations: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            principalId: Schema.String,
                            principalIdDisplayName: Schema.optional(
                              Schema.String,
                            ),
                            roleDefinitionId: Schema.String,
                            justInTimeAccessPolicy: Schema.optional(
                              Schema.Struct({
                                multiFactorAuthProvider: Schema.Literals([
                                  "Azure",
                                  "None",
                                ]),
                                maximumActivationDuration: Schema.optional(
                                  Schema.String,
                                ),
                                managedByTenantApprovers: Schema.optional(
                                  Schema.Array(
                                    Schema.Struct({
                                      principalId: Schema.String,
                                      principalIdDisplayName: Schema.optional(
                                        Schema.String,
                                      ),
                                    }),
                                  ),
                                ),
                              }),
                            ),
                          }),
                        ),
                      ),
                      registrationDefinitionName: Schema.optional(
                        Schema.String,
                      ),
                      provisioningState: Schema.optional(
                        Schema.Literals([
                          "NotSpecified",
                          "Accepted",
                          "Running",
                          "Ready",
                          "Creating",
                          "Created",
                          "Deleting",
                          "Deleted",
                          "Canceled",
                          "Failed",
                          "Succeeded",
                          "Updating",
                        ]),
                      ),
                      manageeTenantId: Schema.optional(Schema.String),
                      manageeTenantName: Schema.optional(Schema.String),
                      managedByTenantId: Schema.optional(Schema.String),
                      managedByTenantName: Schema.optional(Schema.String),
                    }),
                  ),
                  plan: Schema.optional(
                    Schema.Struct({
                      name: Schema.String,
                      publisher: Schema.String,
                      product: Schema.String,
                      version: Schema.String,
                    }),
                  ),
                  id: Schema.optional(Schema.String),
                  type: Schema.optional(Schema.String),
                  name: Schema.optional(Schema.String),
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
            }),
          ),
          id: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
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
export type RegistrationAssignmentsListOutput =
  typeof RegistrationAssignmentsListOutput.Type;

// The operation
/**
 * Gets a list of the registration assignments.
 */
export const RegistrationAssignmentsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RegistrationAssignmentsListInput,
    outputSchema: RegistrationAssignmentsListOutput,
  }),
);
// Input Schema
export const RegistrationDefinitionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/{scope}/providers/Microsoft.ManagedServices/registrationDefinitions/{registrationDefinitionId}",
    }),
  );
export type RegistrationDefinitionsCreateOrUpdateInput =
  typeof RegistrationDefinitionsCreateOrUpdateInput.Type;

// Output Schema
export const RegistrationDefinitionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.optional(
      Schema.Struct({
        description: Schema.optional(Schema.String),
        authorizations: Schema.Array(
          Schema.Struct({
            principalId: Schema.String,
            principalIdDisplayName: Schema.optional(Schema.String),
            roleDefinitionId: Schema.String,
            delegatedRoleDefinitionIds: Schema.optional(
              Schema.Array(Schema.String),
            ),
          }),
        ),
        eligibleAuthorizations: Schema.optional(
          Schema.Array(
            Schema.Struct({
              principalId: Schema.String,
              principalIdDisplayName: Schema.optional(Schema.String),
              roleDefinitionId: Schema.String,
              justInTimeAccessPolicy: Schema.optional(
                Schema.Struct({
                  multiFactorAuthProvider: Schema.Literals(["Azure", "None"]),
                  maximumActivationDuration: Schema.optional(Schema.String),
                  managedByTenantApprovers: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        principalId: Schema.String,
                        principalIdDisplayName: Schema.optional(Schema.String),
                      }),
                    ),
                  ),
                }),
              ),
            }),
          ),
        ),
        registrationDefinitionName: Schema.optional(Schema.String),
        managedByTenantId: Schema.String,
        provisioningState: Schema.optional(
          Schema.Literals([
            "NotSpecified",
            "Accepted",
            "Running",
            "Ready",
            "Creating",
            "Created",
            "Deleting",
            "Deleted",
            "Canceled",
            "Failed",
            "Succeeded",
            "Updating",
          ]),
        ),
        manageeTenantId: Schema.optional(Schema.String),
        manageeTenantName: Schema.optional(Schema.String),
        managedByTenantName: Schema.optional(Schema.String),
      }),
    ),
    plan: Schema.optional(
      Schema.Struct({
        name: Schema.String,
        publisher: Schema.String,
        product: Schema.String,
        version: Schema.String,
      }),
    ),
    id: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
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
export type RegistrationDefinitionsCreateOrUpdateOutput =
  typeof RegistrationDefinitionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a registration definition.
 */
export const RegistrationDefinitionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RegistrationDefinitionsCreateOrUpdateInput,
    outputSchema: RegistrationDefinitionsCreateOrUpdateOutput,
  }));
// Input Schema
export const RegistrationDefinitionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "DELETE",
      path: "/{scope}/providers/Microsoft.ManagedServices/registrationDefinitions/{registrationDefinitionId}",
    }),
  );
export type RegistrationDefinitionsDeleteInput =
  typeof RegistrationDefinitionsDeleteInput.Type;

// Output Schema
export const RegistrationDefinitionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RegistrationDefinitionsDeleteOutput =
  typeof RegistrationDefinitionsDeleteOutput.Type;

// The operation
/**
 * Deletes the registration definition.
 */
export const RegistrationDefinitionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RegistrationDefinitionsDeleteInput,
    outputSchema: RegistrationDefinitionsDeleteOutput,
  }));
// Input Schema
export const RegistrationDefinitionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/{scope}/providers/Microsoft.ManagedServices/registrationDefinitions/{registrationDefinitionId}",
    }),
  );
export type RegistrationDefinitionsGetInput =
  typeof RegistrationDefinitionsGetInput.Type;

// Output Schema
export const RegistrationDefinitionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.optional(
      Schema.Struct({
        description: Schema.optional(Schema.String),
        authorizations: Schema.Array(
          Schema.Struct({
            principalId: Schema.String,
            principalIdDisplayName: Schema.optional(Schema.String),
            roleDefinitionId: Schema.String,
            delegatedRoleDefinitionIds: Schema.optional(
              Schema.Array(Schema.String),
            ),
          }),
        ),
        eligibleAuthorizations: Schema.optional(
          Schema.Array(
            Schema.Struct({
              principalId: Schema.String,
              principalIdDisplayName: Schema.optional(Schema.String),
              roleDefinitionId: Schema.String,
              justInTimeAccessPolicy: Schema.optional(
                Schema.Struct({
                  multiFactorAuthProvider: Schema.Literals(["Azure", "None"]),
                  maximumActivationDuration: Schema.optional(Schema.String),
                  managedByTenantApprovers: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        principalId: Schema.String,
                        principalIdDisplayName: Schema.optional(Schema.String),
                      }),
                    ),
                  ),
                }),
              ),
            }),
          ),
        ),
        registrationDefinitionName: Schema.optional(Schema.String),
        managedByTenantId: Schema.String,
        provisioningState: Schema.optional(
          Schema.Literals([
            "NotSpecified",
            "Accepted",
            "Running",
            "Ready",
            "Creating",
            "Created",
            "Deleting",
            "Deleted",
            "Canceled",
            "Failed",
            "Succeeded",
            "Updating",
          ]),
        ),
        manageeTenantId: Schema.optional(Schema.String),
        manageeTenantName: Schema.optional(Schema.String),
        managedByTenantName: Schema.optional(Schema.String),
      }),
    ),
    plan: Schema.optional(
      Schema.Struct({
        name: Schema.String,
        publisher: Schema.String,
        product: Schema.String,
        version: Schema.String,
      }),
    ),
    id: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
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
export type RegistrationDefinitionsGetOutput =
  typeof RegistrationDefinitionsGetOutput.Type;

// The operation
/**
 * Gets the registration definition details.
 */
export const RegistrationDefinitionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RegistrationDefinitionsGetInput,
    outputSchema: RegistrationDefinitionsGetOutput,
  }),
);
// Input Schema
export const RegistrationDefinitionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/{scope}/providers/Microsoft.ManagedServices/registrationDefinitions",
    }),
  );
export type RegistrationDefinitionsListInput =
  typeof RegistrationDefinitionsListInput.Type;

// Output Schema
export const RegistrationDefinitionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          properties: Schema.optional(
            Schema.Struct({
              description: Schema.optional(Schema.String),
              authorizations: Schema.Array(
                Schema.Struct({
                  principalId: Schema.String,
                  principalIdDisplayName: Schema.optional(Schema.String),
                  roleDefinitionId: Schema.String,
                  delegatedRoleDefinitionIds: Schema.optional(
                    Schema.Array(Schema.String),
                  ),
                }),
              ),
              eligibleAuthorizations: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    principalId: Schema.String,
                    principalIdDisplayName: Schema.optional(Schema.String),
                    roleDefinitionId: Schema.String,
                    justInTimeAccessPolicy: Schema.optional(
                      Schema.Struct({
                        multiFactorAuthProvider: Schema.Literals([
                          "Azure",
                          "None",
                        ]),
                        maximumActivationDuration: Schema.optional(
                          Schema.String,
                        ),
                        managedByTenantApprovers: Schema.optional(
                          Schema.Array(
                            Schema.Struct({
                              principalId: Schema.String,
                              principalIdDisplayName: Schema.optional(
                                Schema.String,
                              ),
                            }),
                          ),
                        ),
                      }),
                    ),
                  }),
                ),
              ),
              registrationDefinitionName: Schema.optional(Schema.String),
              managedByTenantId: Schema.String,
              provisioningState: Schema.optional(
                Schema.Literals([
                  "NotSpecified",
                  "Accepted",
                  "Running",
                  "Ready",
                  "Creating",
                  "Created",
                  "Deleting",
                  "Deleted",
                  "Canceled",
                  "Failed",
                  "Succeeded",
                  "Updating",
                ]),
              ),
              manageeTenantId: Schema.optional(Schema.String),
              manageeTenantName: Schema.optional(Schema.String),
              managedByTenantName: Schema.optional(Schema.String),
            }),
          ),
          plan: Schema.optional(
            Schema.Struct({
              name: Schema.String,
              publisher: Schema.String,
              product: Schema.String,
              version: Schema.String,
            }),
          ),
          id: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
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
export type RegistrationDefinitionsListOutput =
  typeof RegistrationDefinitionsListOutput.Type;

// The operation
/**
 * Gets a list of the registration definitions.
 */
export const RegistrationDefinitionsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RegistrationDefinitionsListInput,
    outputSchema: RegistrationDefinitionsListOutput,
  }),
);
