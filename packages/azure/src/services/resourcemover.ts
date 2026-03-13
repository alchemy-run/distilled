/**
 * Azure Resourcemover API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const MoveCollectionsBulkRemoveInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    moveCollectionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/moveCollections/{moveCollectionName}/bulkRemove",
    }),
  );
export type MoveCollectionsBulkRemoveInput =
  typeof MoveCollectionsBulkRemoveInput.Type;

// Output Schema
export const MoveCollectionsBulkRemoveOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    status: Schema.optional(Schema.String),
    startTime: Schema.optional(Schema.String),
    endTime: Schema.optional(Schema.String),
    error: Schema.optional(
      Schema.Struct({
        code: Schema.optional(Schema.String),
        message: Schema.optional(Schema.String),
        details: Schema.optional(Schema.Array(Schema.Unknown)),
        additionalInfo: Schema.optional(
          Schema.Array(
            Schema.Struct({
              type: Schema.optional(Schema.String),
              info: Schema.optional(
                Schema.Struct({
                  moveResources: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        id: Schema.optional(Schema.String),
                        sourceId: Schema.optional(Schema.String),
                        moveResources: Schema.optional(
                          Schema.Array(Schema.Unknown),
                        ),
                      }),
                    ),
                  ),
                }),
              ),
            }),
          ),
        ),
      }),
    ),
    properties: Schema.optional(Schema.Struct({})),
  });
export type MoveCollectionsBulkRemoveOutput =
  typeof MoveCollectionsBulkRemoveOutput.Type;

// The operation
/**
 * Removes the set of move resources included in the request body from move collection. The orchestration is done by service. To aid the user to prerequisite the operation the client can call operation with validateOnly property set to true.
 */
export const MoveCollectionsBulkRemove = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MoveCollectionsBulkRemoveInput,
    outputSchema: MoveCollectionsBulkRemoveOutput,
  }),
);
// Input Schema
export const MoveCollectionsCommitInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/moveCollections/{moveCollectionName}/commit",
    }),
  );
export type MoveCollectionsCommitInput = typeof MoveCollectionsCommitInput.Type;

// Output Schema
export const MoveCollectionsCommitOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    status: Schema.optional(Schema.String),
    startTime: Schema.optional(Schema.String),
    endTime: Schema.optional(Schema.String),
    error: Schema.optional(
      Schema.Struct({
        code: Schema.optional(Schema.String),
        message: Schema.optional(Schema.String),
        details: Schema.optional(Schema.Array(Schema.Unknown)),
        additionalInfo: Schema.optional(
          Schema.Array(
            Schema.Struct({
              type: Schema.optional(Schema.String),
              info: Schema.optional(
                Schema.Struct({
                  moveResources: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        id: Schema.optional(Schema.String),
                        sourceId: Schema.optional(Schema.String),
                        moveResources: Schema.optional(
                          Schema.Array(Schema.Unknown),
                        ),
                      }),
                    ),
                  ),
                }),
              ),
            }),
          ),
        ),
      }),
    ),
    properties: Schema.optional(Schema.Struct({})),
  });
export type MoveCollectionsCommitOutput =
  typeof MoveCollectionsCommitOutput.Type;

// The operation
/**
 * Commits the set of resources included in the request body. The commit operation is triggered on the moveResources in the moveState 'CommitPending' or 'CommitFailed', on a successful completion the moveResource moveState do a transition to Committed. To aid the user to prerequisite the operation the client can call operation with validateOnly property set to true.
 */
export const MoveCollectionsCommit = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MoveCollectionsCommitInput,
    outputSchema: MoveCollectionsCommitOutput,
  }),
);
// Input Schema
export const MoveCollectionsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/moveCollections/{moveCollectionName}",
    }),
  );
export type MoveCollectionsCreateInput = typeof MoveCollectionsCreateInput.Type;

// Output Schema
export const MoveCollectionsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    etag: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.optional(Schema.String),
    identity: Schema.optional(
      Schema.Struct({
        type: Schema.optional(
          Schema.Literals(["None", "SystemAssigned", "UserAssigned"]),
        ),
        principalId: Schema.optional(Schema.String),
        tenantId: Schema.optional(Schema.String),
      }),
    ),
    properties: Schema.optional(
      Schema.Struct({
        sourceRegion: Schema.optional(Schema.String),
        targetRegion: Schema.optional(Schema.String),
        moveRegion: Schema.optional(Schema.String),
        provisioningState: Schema.optional(
          Schema.Literals(["Succeeded", "Updating", "Creating", "Failed"]),
        ),
        version: Schema.optional(Schema.String),
        moveType: Schema.optional(
          Schema.Literals(["RegionToRegion", "RegionToZone"]),
        ),
        errors: Schema.optional(
          Schema.Struct({
            properties: Schema.optional(
              Schema.Struct({
                code: Schema.optional(Schema.String),
                message: Schema.optional(Schema.String),
                target: Schema.optional(Schema.String),
                details: Schema.optional(Schema.Array(Schema.Unknown)),
              }),
            ),
          }),
        ),
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
export type MoveCollectionsCreateOutput =
  typeof MoveCollectionsCreateOutput.Type;

// The operation
/**
 * Creates or updates a move collection.
 */
export const MoveCollectionsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MoveCollectionsCreateInput,
    outputSchema: MoveCollectionsCreateOutput,
  }),
);
// Input Schema
export const MoveCollectionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/moveCollections/{moveCollectionName}",
    }),
  );
export type MoveCollectionsDeleteInput = typeof MoveCollectionsDeleteInput.Type;

// Output Schema
export const MoveCollectionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    status: Schema.optional(Schema.String),
    startTime: Schema.optional(Schema.String),
    endTime: Schema.optional(Schema.String),
    error: Schema.optional(
      Schema.Struct({
        code: Schema.optional(Schema.String),
        message: Schema.optional(Schema.String),
        details: Schema.optional(Schema.Array(Schema.Unknown)),
        additionalInfo: Schema.optional(
          Schema.Array(
            Schema.Struct({
              type: Schema.optional(Schema.String),
              info: Schema.optional(
                Schema.Struct({
                  moveResources: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        id: Schema.optional(Schema.String),
                        sourceId: Schema.optional(Schema.String),
                        moveResources: Schema.optional(
                          Schema.Array(Schema.Unknown),
                        ),
                      }),
                    ),
                  ),
                }),
              ),
            }),
          ),
        ),
      }),
    ),
    properties: Schema.optional(Schema.Struct({})),
  });
export type MoveCollectionsDeleteOutput =
  typeof MoveCollectionsDeleteOutput.Type;

// The operation
/**
 * Deletes a move collection.
 */
export const MoveCollectionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MoveCollectionsDeleteInput,
    outputSchema: MoveCollectionsDeleteOutput,
  }),
);
// Input Schema
export const MoveCollectionsDiscardInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/moveCollections/{moveCollectionName}/discard",
    }),
  );
export type MoveCollectionsDiscardInput =
  typeof MoveCollectionsDiscardInput.Type;

// Output Schema
export const MoveCollectionsDiscardOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    status: Schema.optional(Schema.String),
    startTime: Schema.optional(Schema.String),
    endTime: Schema.optional(Schema.String),
    error: Schema.optional(
      Schema.Struct({
        code: Schema.optional(Schema.String),
        message: Schema.optional(Schema.String),
        details: Schema.optional(Schema.Array(Schema.Unknown)),
        additionalInfo: Schema.optional(
          Schema.Array(
            Schema.Struct({
              type: Schema.optional(Schema.String),
              info: Schema.optional(
                Schema.Struct({
                  moveResources: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        id: Schema.optional(Schema.String),
                        sourceId: Schema.optional(Schema.String),
                        moveResources: Schema.optional(
                          Schema.Array(Schema.Unknown),
                        ),
                      }),
                    ),
                  ),
                }),
              ),
            }),
          ),
        ),
      }),
    ),
    properties: Schema.optional(Schema.Struct({})),
  });
export type MoveCollectionsDiscardOutput =
  typeof MoveCollectionsDiscardOutput.Type;

// The operation
/**
 * Discards the set of resources included in the request body. The discard operation is triggered on the moveResources in the moveState 'CommitPending' or 'DiscardFailed', on a successful completion the moveResource moveState do a transition to MovePending. To aid the user to prerequisite the operation the client can call operation with validateOnly property set to true.
 */
export const MoveCollectionsDiscard = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MoveCollectionsDiscardInput,
    outputSchema: MoveCollectionsDiscardOutput,
  }),
);
// Input Schema
export const MoveCollectionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/moveCollections/{moveCollectionName}",
    }),
  );
export type MoveCollectionsGetInput = typeof MoveCollectionsGetInput.Type;

// Output Schema
export const MoveCollectionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    etag: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.optional(Schema.String),
    identity: Schema.optional(
      Schema.Struct({
        type: Schema.optional(
          Schema.Literals(["None", "SystemAssigned", "UserAssigned"]),
        ),
        principalId: Schema.optional(Schema.String),
        tenantId: Schema.optional(Schema.String),
      }),
    ),
    properties: Schema.optional(
      Schema.Struct({
        sourceRegion: Schema.optional(Schema.String),
        targetRegion: Schema.optional(Schema.String),
        moveRegion: Schema.optional(Schema.String),
        provisioningState: Schema.optional(
          Schema.Literals(["Succeeded", "Updating", "Creating", "Failed"]),
        ),
        version: Schema.optional(Schema.String),
        moveType: Schema.optional(
          Schema.Literals(["RegionToRegion", "RegionToZone"]),
        ),
        errors: Schema.optional(
          Schema.Struct({
            properties: Schema.optional(
              Schema.Struct({
                code: Schema.optional(Schema.String),
                message: Schema.optional(Schema.String),
                target: Schema.optional(Schema.String),
                details: Schema.optional(Schema.Array(Schema.Unknown)),
              }),
            ),
          }),
        ),
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
export type MoveCollectionsGetOutput = typeof MoveCollectionsGetOutput.Type;

// The operation
/**
 * Gets the move collection.
 */
export const MoveCollectionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MoveCollectionsGetInput,
  outputSchema: MoveCollectionsGetOutput,
}));
// Input Schema
export const MoveCollectionsInitiateMoveInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/moveCollections/{moveCollectionName}/initiateMove",
    }),
  );
export type MoveCollectionsInitiateMoveInput =
  typeof MoveCollectionsInitiateMoveInput.Type;

// Output Schema
export const MoveCollectionsInitiateMoveOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    status: Schema.optional(Schema.String),
    startTime: Schema.optional(Schema.String),
    endTime: Schema.optional(Schema.String),
    error: Schema.optional(
      Schema.Struct({
        code: Schema.optional(Schema.String),
        message: Schema.optional(Schema.String),
        details: Schema.optional(Schema.Array(Schema.Unknown)),
        additionalInfo: Schema.optional(
          Schema.Array(
            Schema.Struct({
              type: Schema.optional(Schema.String),
              info: Schema.optional(
                Schema.Struct({
                  moveResources: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        id: Schema.optional(Schema.String),
                        sourceId: Schema.optional(Schema.String),
                        moveResources: Schema.optional(
                          Schema.Array(Schema.Unknown),
                        ),
                      }),
                    ),
                  ),
                }),
              ),
            }),
          ),
        ),
      }),
    ),
    properties: Schema.optional(Schema.Struct({})),
  });
export type MoveCollectionsInitiateMoveOutput =
  typeof MoveCollectionsInitiateMoveOutput.Type;

// The operation
/**
 * Moves the set of resources included in the request body. The move operation is triggered after the moveResources are in the moveState 'MovePending' or 'MoveFailed', on a successful completion the moveResource moveState do a transition to CommitPending. To aid the user to prerequisite the operation the client can call operation with validateOnly property set to true.
 */
export const MoveCollectionsInitiateMove = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MoveCollectionsInitiateMoveInput,
    outputSchema: MoveCollectionsInitiateMoveOutput,
  }),
);
// Input Schema
export const MoveCollectionsListMoveCollectionsByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/moveCollections",
    }),
  );
export type MoveCollectionsListMoveCollectionsByResourceGroupInput =
  typeof MoveCollectionsListMoveCollectionsByResourceGroupInput.Type;

// Output Schema
export const MoveCollectionsListMoveCollectionsByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          etag: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.optional(Schema.String),
          identity: Schema.optional(
            Schema.Struct({
              type: Schema.optional(
                Schema.Literals(["None", "SystemAssigned", "UserAssigned"]),
              ),
              principalId: Schema.optional(Schema.String),
              tenantId: Schema.optional(Schema.String),
            }),
          ),
          properties: Schema.optional(
            Schema.Struct({
              sourceRegion: Schema.optional(Schema.String),
              targetRegion: Schema.optional(Schema.String),
              moveRegion: Schema.optional(Schema.String),
              provisioningState: Schema.optional(
                Schema.Literals([
                  "Succeeded",
                  "Updating",
                  "Creating",
                  "Failed",
                ]),
              ),
              version: Schema.optional(Schema.String),
              moveType: Schema.optional(
                Schema.Literals(["RegionToRegion", "RegionToZone"]),
              ),
              errors: Schema.optional(
                Schema.Struct({
                  properties: Schema.optional(
                    Schema.Struct({
                      code: Schema.optional(Schema.String),
                      message: Schema.optional(Schema.String),
                      target: Schema.optional(Schema.String),
                      details: Schema.optional(Schema.Array(Schema.Unknown)),
                    }),
                  ),
                }),
              ),
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
export type MoveCollectionsListMoveCollectionsByResourceGroupOutput =
  typeof MoveCollectionsListMoveCollectionsByResourceGroupOutput.Type;

// The operation
/**
 * Get all Move Collections.
 *
 * Get all the Move Collections in the resource group.
 */
export const MoveCollectionsListMoveCollectionsByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MoveCollectionsListMoveCollectionsByResourceGroupInput,
    outputSchema: MoveCollectionsListMoveCollectionsByResourceGroupOutput,
  }));
// Input Schema
export const MoveCollectionsListMoveCollectionsBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Migrate/moveCollections",
    }),
  );
export type MoveCollectionsListMoveCollectionsBySubscriptionInput =
  typeof MoveCollectionsListMoveCollectionsBySubscriptionInput.Type;

// Output Schema
export const MoveCollectionsListMoveCollectionsBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          etag: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.optional(Schema.String),
          identity: Schema.optional(
            Schema.Struct({
              type: Schema.optional(
                Schema.Literals(["None", "SystemAssigned", "UserAssigned"]),
              ),
              principalId: Schema.optional(Schema.String),
              tenantId: Schema.optional(Schema.String),
            }),
          ),
          properties: Schema.optional(
            Schema.Struct({
              sourceRegion: Schema.optional(Schema.String),
              targetRegion: Schema.optional(Schema.String),
              moveRegion: Schema.optional(Schema.String),
              provisioningState: Schema.optional(
                Schema.Literals([
                  "Succeeded",
                  "Updating",
                  "Creating",
                  "Failed",
                ]),
              ),
              version: Schema.optional(Schema.String),
              moveType: Schema.optional(
                Schema.Literals(["RegionToRegion", "RegionToZone"]),
              ),
              errors: Schema.optional(
                Schema.Struct({
                  properties: Schema.optional(
                    Schema.Struct({
                      code: Schema.optional(Schema.String),
                      message: Schema.optional(Schema.String),
                      target: Schema.optional(Schema.String),
                      details: Schema.optional(Schema.Array(Schema.Unknown)),
                    }),
                  ),
                }),
              ),
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
export type MoveCollectionsListMoveCollectionsBySubscriptionOutput =
  typeof MoveCollectionsListMoveCollectionsBySubscriptionOutput.Type;

// The operation
/**
 * Get all Move Collections.
 *
 * Get all the Move Collections in the subscription.
 */
export const MoveCollectionsListMoveCollectionsBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MoveCollectionsListMoveCollectionsBySubscriptionInput,
    outputSchema: MoveCollectionsListMoveCollectionsBySubscriptionOutput,
  }));
// Input Schema
export const MoveCollectionsListRequiredForInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    sourceId: Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/moveCollections/{moveCollectionName}/requiredFor",
    }),
  );
export type MoveCollectionsListRequiredForInput =
  typeof MoveCollectionsListRequiredForInput.Type;

// Output Schema
export const MoveCollectionsListRequiredForOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    sourceIds: Schema.optional(Schema.Array(Schema.String)),
  });
export type MoveCollectionsListRequiredForOutput =
  typeof MoveCollectionsListRequiredForOutput.Type;

// The operation
/**
 * List of the move resources for which an arm resource is required for.
 *
 * @param sourceId - The sourceId for which the api is invoked.
 */
export const MoveCollectionsListRequiredFor =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MoveCollectionsListRequiredForInput,
    outputSchema: MoveCollectionsListRequiredForOutput,
  }));
// Input Schema
export const MoveCollectionsPrepareInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/moveCollections/{moveCollectionName}/prepare",
    }),
  );
export type MoveCollectionsPrepareInput =
  typeof MoveCollectionsPrepareInput.Type;

// Output Schema
export const MoveCollectionsPrepareOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    status: Schema.optional(Schema.String),
    startTime: Schema.optional(Schema.String),
    endTime: Schema.optional(Schema.String),
    error: Schema.optional(
      Schema.Struct({
        code: Schema.optional(Schema.String),
        message: Schema.optional(Schema.String),
        details: Schema.optional(Schema.Array(Schema.Unknown)),
        additionalInfo: Schema.optional(
          Schema.Array(
            Schema.Struct({
              type: Schema.optional(Schema.String),
              info: Schema.optional(
                Schema.Struct({
                  moveResources: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        id: Schema.optional(Schema.String),
                        sourceId: Schema.optional(Schema.String),
                        moveResources: Schema.optional(
                          Schema.Array(Schema.Unknown),
                        ),
                      }),
                    ),
                  ),
                }),
              ),
            }),
          ),
        ),
      }),
    ),
    properties: Schema.optional(Schema.Struct({})),
  });
export type MoveCollectionsPrepareOutput =
  typeof MoveCollectionsPrepareOutput.Type;

// The operation
/**
 * Initiates prepare for the set of resources included in the request body. The prepare operation is on the moveResources that are in the moveState 'PreparePending' or 'PrepareFailed', on a successful completion the moveResource moveState do a transition to MovePending. To aid the user to prerequisite the operation the client can call operation with validateOnly property set to true.
 */
export const MoveCollectionsPrepare = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MoveCollectionsPrepareInput,
    outputSchema: MoveCollectionsPrepareOutput,
  }),
);
// Input Schema
export const MoveCollectionsResolveDependenciesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/moveCollections/{moveCollectionName}/resolveDependencies",
    }),
  );
export type MoveCollectionsResolveDependenciesInput =
  typeof MoveCollectionsResolveDependenciesInput.Type;

// Output Schema
export const MoveCollectionsResolveDependenciesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    status: Schema.optional(Schema.String),
    startTime: Schema.optional(Schema.String),
    endTime: Schema.optional(Schema.String),
    error: Schema.optional(
      Schema.Struct({
        code: Schema.optional(Schema.String),
        message: Schema.optional(Schema.String),
        details: Schema.optional(Schema.Array(Schema.Unknown)),
        additionalInfo: Schema.optional(
          Schema.Array(
            Schema.Struct({
              type: Schema.optional(Schema.String),
              info: Schema.optional(
                Schema.Struct({
                  moveResources: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        id: Schema.optional(Schema.String),
                        sourceId: Schema.optional(Schema.String),
                        moveResources: Schema.optional(
                          Schema.Array(Schema.Unknown),
                        ),
                      }),
                    ),
                  ),
                }),
              ),
            }),
          ),
        ),
      }),
    ),
    properties: Schema.optional(Schema.Struct({})),
  });
export type MoveCollectionsResolveDependenciesOutput =
  typeof MoveCollectionsResolveDependenciesOutput.Type;

// The operation
/**
 * Computes, resolves and validate the dependencies of the moveResources in the move collection.
 */
export const MoveCollectionsResolveDependencies =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MoveCollectionsResolveDependenciesInput,
    outputSchema: MoveCollectionsResolveDependenciesOutput,
  }));
// Input Schema
export const MoveCollectionsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/moveCollections/{moveCollectionName}",
    }),
  );
export type MoveCollectionsUpdateInput = typeof MoveCollectionsUpdateInput.Type;

// Output Schema
export const MoveCollectionsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    etag: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.optional(Schema.String),
    identity: Schema.optional(
      Schema.Struct({
        type: Schema.optional(
          Schema.Literals(["None", "SystemAssigned", "UserAssigned"]),
        ),
        principalId: Schema.optional(Schema.String),
        tenantId: Schema.optional(Schema.String),
      }),
    ),
    properties: Schema.optional(
      Schema.Struct({
        sourceRegion: Schema.optional(Schema.String),
        targetRegion: Schema.optional(Schema.String),
        moveRegion: Schema.optional(Schema.String),
        provisioningState: Schema.optional(
          Schema.Literals(["Succeeded", "Updating", "Creating", "Failed"]),
        ),
        version: Schema.optional(Schema.String),
        moveType: Schema.optional(
          Schema.Literals(["RegionToRegion", "RegionToZone"]),
        ),
        errors: Schema.optional(
          Schema.Struct({
            properties: Schema.optional(
              Schema.Struct({
                code: Schema.optional(Schema.String),
                message: Schema.optional(Schema.String),
                target: Schema.optional(Schema.String),
                details: Schema.optional(Schema.Array(Schema.Unknown)),
              }),
            ),
          }),
        ),
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
export type MoveCollectionsUpdateOutput =
  typeof MoveCollectionsUpdateOutput.Type;

// The operation
/**
 * Updates a move collection.
 */
export const MoveCollectionsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MoveCollectionsUpdateInput,
    outputSchema: MoveCollectionsUpdateOutput,
  }),
);
// Input Schema
export const MoveResourcesCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/moveCollections/{moveCollectionName}/moveResources/{moveResourceName}",
    }),
  );
export type MoveResourcesCreateInput = typeof MoveResourcesCreateInput.Type;

// Output Schema
export const MoveResourcesCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        provisioningState: Schema.optional(
          Schema.Literals(["Succeeded", "Updating", "Creating", "Failed"]),
        ),
        sourceId: Schema.String,
        targetId: Schema.optional(Schema.String),
        existingTargetId: Schema.optional(Schema.String),
        resourceSettings: Schema.optional(
          Schema.Struct({
            resourceType: Schema.String,
            targetResourceName: Schema.optional(Schema.String),
            targetResourceGroupName: Schema.optional(Schema.String),
          }),
        ),
        sourceResourceSettings: Schema.optional(
          Schema.Struct({
            resourceType: Schema.String,
            targetResourceName: Schema.optional(Schema.String),
            targetResourceGroupName: Schema.optional(Schema.String),
          }),
        ),
        moveStatus: Schema.optional(
          Schema.Struct({
            moveState: Schema.optional(
              Schema.Literals([
                "AssignmentPending",
                "PreparePending",
                "PrepareInProgress",
                "PrepareFailed",
                "MovePending",
                "MoveInProgress",
                "MoveFailed",
                "DiscardInProgress",
                "DiscardFailed",
                "CommitPending",
                "CommitInProgress",
                "CommitFailed",
                "Committed",
                "DeleteSourcePending",
                "ResourceMoveCompleted",
              ]),
            ),
            jobStatus: Schema.optional(
              Schema.Struct({
                jobName: Schema.optional(Schema.Literals(["InitialSync"])),
                jobProgress: Schema.optional(Schema.String),
              }),
            ),
            errors: Schema.optional(
              Schema.Struct({
                properties: Schema.optional(
                  Schema.Struct({
                    code: Schema.optional(Schema.String),
                    message: Schema.optional(Schema.String),
                    target: Schema.optional(Schema.String),
                    details: Schema.optional(Schema.Array(Schema.Unknown)),
                  }),
                ),
              }),
            ),
          }),
        ),
        dependsOn: Schema.optional(
          Schema.Array(
            Schema.Struct({
              id: Schema.optional(Schema.String),
              resolutionStatus: Schema.optional(Schema.String),
              resolutionType: Schema.optional(
                Schema.Literals(["Manual", "Automatic"]),
              ),
              dependencyType: Schema.optional(
                Schema.Literals(["RequiredForPrepare", "RequiredForMove"]),
              ),
              manualResolution: Schema.optional(
                Schema.Struct({
                  targetId: Schema.optional(Schema.String),
                }),
              ),
              automaticResolution: Schema.optional(
                Schema.Struct({
                  moveResourceId: Schema.optional(Schema.String),
                }),
              ),
              isOptional: Schema.optional(Schema.String),
            }),
          ),
        ),
        dependsOnOverrides: Schema.optional(
          Schema.Array(
            Schema.Struct({
              id: Schema.optional(Schema.String),
              targetId: Schema.optional(Schema.String),
            }),
          ),
        ),
        isResolveRequired: Schema.optional(Schema.Boolean),
        errors: Schema.optional(
          Schema.Struct({
            properties: Schema.optional(
              Schema.Struct({
                code: Schema.optional(Schema.String),
                message: Schema.optional(Schema.String),
                target: Schema.optional(Schema.String),
                details: Schema.optional(Schema.Array(Schema.Unknown)),
              }),
            ),
          }),
        ),
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
export type MoveResourcesCreateOutput = typeof MoveResourcesCreateOutput.Type;

// The operation
/**
 * Creates or updates a Move Resource in the move collection.
 */
export const MoveResourcesCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MoveResourcesCreateInput,
  outputSchema: MoveResourcesCreateOutput,
}));
// Input Schema
export const MoveResourcesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/moveCollections/{moveCollectionName}/moveResources/{moveResourceName}",
    }),
  );
export type MoveResourcesDeleteInput = typeof MoveResourcesDeleteInput.Type;

// Output Schema
export const MoveResourcesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    status: Schema.optional(Schema.String),
    startTime: Schema.optional(Schema.String),
    endTime: Schema.optional(Schema.String),
    error: Schema.optional(
      Schema.Struct({
        code: Schema.optional(Schema.String),
        message: Schema.optional(Schema.String),
        details: Schema.optional(Schema.Array(Schema.Unknown)),
        additionalInfo: Schema.optional(
          Schema.Array(
            Schema.Struct({
              type: Schema.optional(Schema.String),
              info: Schema.optional(
                Schema.Struct({
                  moveResources: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        id: Schema.optional(Schema.String),
                        sourceId: Schema.optional(Schema.String),
                        moveResources: Schema.optional(
                          Schema.Array(Schema.Unknown),
                        ),
                      }),
                    ),
                  ),
                }),
              ),
            }),
          ),
        ),
      }),
    ),
    properties: Schema.optional(Schema.Struct({})),
  });
export type MoveResourcesDeleteOutput = typeof MoveResourcesDeleteOutput.Type;

// The operation
/**
 * Deletes a Move Resource from the move collection.
 */
export const MoveResourcesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MoveResourcesDeleteInput,
  outputSchema: MoveResourcesDeleteOutput,
}));
// Input Schema
export const MoveResourcesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/moveCollections/{moveCollectionName}/moveResources/{moveResourceName}",
  }),
);
export type MoveResourcesGetInput = typeof MoveResourcesGetInput.Type;

// Output Schema
export const MoveResourcesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        provisioningState: Schema.optional(
          Schema.Literals(["Succeeded", "Updating", "Creating", "Failed"]),
        ),
        sourceId: Schema.String,
        targetId: Schema.optional(Schema.String),
        existingTargetId: Schema.optional(Schema.String),
        resourceSettings: Schema.optional(
          Schema.Struct({
            resourceType: Schema.String,
            targetResourceName: Schema.optional(Schema.String),
            targetResourceGroupName: Schema.optional(Schema.String),
          }),
        ),
        sourceResourceSettings: Schema.optional(
          Schema.Struct({
            resourceType: Schema.String,
            targetResourceName: Schema.optional(Schema.String),
            targetResourceGroupName: Schema.optional(Schema.String),
          }),
        ),
        moveStatus: Schema.optional(
          Schema.Struct({
            moveState: Schema.optional(
              Schema.Literals([
                "AssignmentPending",
                "PreparePending",
                "PrepareInProgress",
                "PrepareFailed",
                "MovePending",
                "MoveInProgress",
                "MoveFailed",
                "DiscardInProgress",
                "DiscardFailed",
                "CommitPending",
                "CommitInProgress",
                "CommitFailed",
                "Committed",
                "DeleteSourcePending",
                "ResourceMoveCompleted",
              ]),
            ),
            jobStatus: Schema.optional(
              Schema.Struct({
                jobName: Schema.optional(Schema.Literals(["InitialSync"])),
                jobProgress: Schema.optional(Schema.String),
              }),
            ),
            errors: Schema.optional(
              Schema.Struct({
                properties: Schema.optional(
                  Schema.Struct({
                    code: Schema.optional(Schema.String),
                    message: Schema.optional(Schema.String),
                    target: Schema.optional(Schema.String),
                    details: Schema.optional(Schema.Array(Schema.Unknown)),
                  }),
                ),
              }),
            ),
          }),
        ),
        dependsOn: Schema.optional(
          Schema.Array(
            Schema.Struct({
              id: Schema.optional(Schema.String),
              resolutionStatus: Schema.optional(Schema.String),
              resolutionType: Schema.optional(
                Schema.Literals(["Manual", "Automatic"]),
              ),
              dependencyType: Schema.optional(
                Schema.Literals(["RequiredForPrepare", "RequiredForMove"]),
              ),
              manualResolution: Schema.optional(
                Schema.Struct({
                  targetId: Schema.optional(Schema.String),
                }),
              ),
              automaticResolution: Schema.optional(
                Schema.Struct({
                  moveResourceId: Schema.optional(Schema.String),
                }),
              ),
              isOptional: Schema.optional(Schema.String),
            }),
          ),
        ),
        dependsOnOverrides: Schema.optional(
          Schema.Array(
            Schema.Struct({
              id: Schema.optional(Schema.String),
              targetId: Schema.optional(Schema.String),
            }),
          ),
        ),
        isResolveRequired: Schema.optional(Schema.Boolean),
        errors: Schema.optional(
          Schema.Struct({
            properties: Schema.optional(
              Schema.Struct({
                code: Schema.optional(Schema.String),
                message: Schema.optional(Schema.String),
                target: Schema.optional(Schema.String),
                details: Schema.optional(Schema.Array(Schema.Unknown)),
              }),
            ),
          }),
        ),
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
  },
);
export type MoveResourcesGetOutput = typeof MoveResourcesGetOutput.Type;

// The operation
/**
 * Gets the Move Resource.
 */
export const MoveResourcesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MoveResourcesGetInput,
  outputSchema: MoveResourcesGetOutput,
}));
// Input Schema
export const MoveResourcesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    $filter: Schema.optional(Schema.String),
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/moveCollections/{moveCollectionName}/moveResources",
  }),
);
export type MoveResourcesListInput = typeof MoveResourcesListInput.Type;

// Output Schema
export const MoveResourcesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              provisioningState: Schema.optional(
                Schema.Literals([
                  "Succeeded",
                  "Updating",
                  "Creating",
                  "Failed",
                ]),
              ),
              sourceId: Schema.String,
              targetId: Schema.optional(Schema.String),
              existingTargetId: Schema.optional(Schema.String),
              resourceSettings: Schema.optional(
                Schema.Struct({
                  resourceType: Schema.String,
                  targetResourceName: Schema.optional(Schema.String),
                  targetResourceGroupName: Schema.optional(Schema.String),
                }),
              ),
              sourceResourceSettings: Schema.optional(
                Schema.Struct({
                  resourceType: Schema.String,
                  targetResourceName: Schema.optional(Schema.String),
                  targetResourceGroupName: Schema.optional(Schema.String),
                }),
              ),
              moveStatus: Schema.optional(
                Schema.Struct({
                  moveState: Schema.optional(
                    Schema.Literals([
                      "AssignmentPending",
                      "PreparePending",
                      "PrepareInProgress",
                      "PrepareFailed",
                      "MovePending",
                      "MoveInProgress",
                      "MoveFailed",
                      "DiscardInProgress",
                      "DiscardFailed",
                      "CommitPending",
                      "CommitInProgress",
                      "CommitFailed",
                      "Committed",
                      "DeleteSourcePending",
                      "ResourceMoveCompleted",
                    ]),
                  ),
                  jobStatus: Schema.optional(
                    Schema.Struct({
                      jobName: Schema.optional(
                        Schema.Literals(["InitialSync"]),
                      ),
                      jobProgress: Schema.optional(Schema.String),
                    }),
                  ),
                  errors: Schema.optional(
                    Schema.Struct({
                      properties: Schema.optional(
                        Schema.Struct({
                          code: Schema.optional(Schema.String),
                          message: Schema.optional(Schema.String),
                          target: Schema.optional(Schema.String),
                          details: Schema.optional(
                            Schema.Array(Schema.Unknown),
                          ),
                        }),
                      ),
                    }),
                  ),
                }),
              ),
              dependsOn: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    id: Schema.optional(Schema.String),
                    resolutionStatus: Schema.optional(Schema.String),
                    resolutionType: Schema.optional(
                      Schema.Literals(["Manual", "Automatic"]),
                    ),
                    dependencyType: Schema.optional(
                      Schema.Literals([
                        "RequiredForPrepare",
                        "RequiredForMove",
                      ]),
                    ),
                    manualResolution: Schema.optional(
                      Schema.Struct({
                        targetId: Schema.optional(Schema.String),
                      }),
                    ),
                    automaticResolution: Schema.optional(
                      Schema.Struct({
                        moveResourceId: Schema.optional(Schema.String),
                      }),
                    ),
                    isOptional: Schema.optional(Schema.String),
                  }),
                ),
              ),
              dependsOnOverrides: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    id: Schema.optional(Schema.String),
                    targetId: Schema.optional(Schema.String),
                  }),
                ),
              ),
              isResolveRequired: Schema.optional(Schema.Boolean),
              errors: Schema.optional(
                Schema.Struct({
                  properties: Schema.optional(
                    Schema.Struct({
                      code: Schema.optional(Schema.String),
                      message: Schema.optional(Schema.String),
                      target: Schema.optional(Schema.String),
                      details: Schema.optional(Schema.Array(Schema.Unknown)),
                    }),
                  ),
                }),
              ),
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
    summaryCollection: Schema.optional(
      Schema.Struct({
        fieldName: Schema.optional(Schema.String),
        summary: Schema.optional(
          Schema.Array(
            Schema.Struct({
              count: Schema.optional(Schema.Number),
              item: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
    totalCount: Schema.optional(Schema.Number),
  });
export type MoveResourcesListOutput = typeof MoveResourcesListOutput.Type;

// The operation
/**
 * Lists the Move Resources in the move collection.
 *
 * @param $filter - The filter to apply on the operation. For example, you can use $filter=Properties/ProvisioningState eq 'Succeeded'.
 */
export const MoveResourcesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MoveResourcesListInput,
  outputSchema: MoveResourcesListOutput,
}));
// Input Schema
export const OperationsDiscoveryGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/providers/Microsoft.Migrate/operations" }),
  );
export type OperationsDiscoveryGetInput =
  typeof OperationsDiscoveryGetInput.Type;

// Output Schema
export const OperationsDiscoveryGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
          properties: Schema.optional(Schema.Unknown),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type OperationsDiscoveryGetOutput =
  typeof OperationsDiscoveryGetOutput.Type;

// The operation
export const OperationsDiscoveryGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: OperationsDiscoveryGetInput,
    outputSchema: OperationsDiscoveryGetOutput,
  }),
);
// Input Schema
export const UnresolvedDependenciesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dependencyLevel: Schema.optional(Schema.Literals(["Direct", "Descendant"])),
    $orderby: Schema.optional(Schema.String),
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/moveCollections/{moveCollectionName}/unresolvedDependencies",
    }),
  );
export type UnresolvedDependenciesGetInput =
  typeof UnresolvedDependenciesGetInput.Type;

// Output Schema
export const UnresolvedDependenciesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          count: Schema.optional(Schema.Number),
          id: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
    summaryCollection: Schema.optional(
      Schema.Struct({
        fieldName: Schema.optional(Schema.String),
        summary: Schema.optional(
          Schema.Array(
            Schema.Struct({
              count: Schema.optional(Schema.Number),
              item: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
    totalCount: Schema.optional(Schema.Number),
  });
export type UnresolvedDependenciesGetOutput =
  typeof UnresolvedDependenciesGetOutput.Type;

// The operation
/**
 * Gets a list of unresolved dependencies.
 *
 * @param dependencyLevel - Defines the dependency level.
 * @param $orderby - OData order by query option. For example, you can use $orderby=Count desc.
 * @param $filter - The filter to apply on the operation. For example, $apply=filter(count eq 2).
 */
export const UnresolvedDependenciesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: UnresolvedDependenciesGetInput,
    outputSchema: UnresolvedDependenciesGetOutput,
  }),
);
