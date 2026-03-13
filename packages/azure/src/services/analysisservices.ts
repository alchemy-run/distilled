/**
 * Azure Analysisservices API
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
    path: "/providers/Microsoft.AnalysisServices/operations",
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
        origin: Schema.optional(Schema.String),
        properties: Schema.optional(
          Schema.Struct({
            serviceSpecification: Schema.optional(
              Schema.Struct({
                metricSpecifications: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      name: Schema.optional(Schema.String),
                      displayName: Schema.optional(Schema.String),
                      displayDescription: Schema.optional(Schema.String),
                      unit: Schema.optional(Schema.String),
                      aggregationType: Schema.optional(Schema.String),
                      dimensions: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            name: Schema.optional(Schema.String),
                            displayName: Schema.optional(Schema.String),
                          }),
                        ),
                      ),
                    }),
                  ),
                ),
                logSpecifications: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      name: Schema.optional(Schema.String),
                      displayName: Schema.optional(Schema.String),
                      blobDuration: Schema.optional(Schema.String),
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
 * Lists all of the available consumption REST API operations.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const ServersCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AnalysisServices/locations/{location}/checkNameAvailability",
    }),
  );
export type ServersCheckNameAvailabilityInput =
  typeof ServersCheckNameAvailabilityInput.Type;

// Output Schema
export const ServersCheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
  });
export type ServersCheckNameAvailabilityOutput =
  typeof ServersCheckNameAvailabilityOutput.Type;

// The operation
/**
 * Check the name availability in the target location.
 *
 * @param location - The region name which the operation will lookup into.
 */
export const ServersCheckNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServersCheckNameAvailabilityInput,
    outputSchema: ServersCheckNameAvailabilityOutput,
  }));
// Input Schema
export const ServersCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  serverName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AnalysisServices/servers/{serverName}",
  }),
);
export type ServersCreateInput = typeof ServersCreateInput.Type;

// Output Schema
export const ServersCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  location: Schema.String,
  sku: Schema.Struct({
    name: Schema.String,
    tier: Schema.optional(
      Schema.Literals(["Development", "Basic", "Standard"]),
    ),
    capacity: Schema.optional(Schema.Number),
  }),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
});
export type ServersCreateOutput = typeof ServersCreateOutput.Type;

// The operation
/**
 * Provisions the specified Analysis Services server based on the configuration specified in the request.
 *
 * @param serverName - The name of the Analysis Services server. It must be a minimum of 3 characters, and a maximum of 63.
 */
export const ServersCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServersCreateInput,
  outputSchema: ServersCreateOutput,
}));
// Input Schema
export const ServersDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  serverName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AnalysisServices/servers/{serverName}",
  }),
);
export type ServersDeleteInput = typeof ServersDeleteInput.Type;

// Output Schema
export const ServersDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServersDeleteOutput = typeof ServersDeleteOutput.Type;

// The operation
/**
 * Deletes the specified Analysis Services server.
 *
 * @param serverName - The name of the Analysis Services server. It must be at least 3 characters in length, and no more than 63.
 */
export const ServersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServersDeleteInput,
  outputSchema: ServersDeleteOutput,
}));
// Input Schema
export const ServersDissociateGatewayInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serverName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AnalysisServices/servers/{serverName}/dissociateGateway",
    }),
  );
export type ServersDissociateGatewayInput =
  typeof ServersDissociateGatewayInput.Type;

// Output Schema
export const ServersDissociateGatewayOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServersDissociateGatewayOutput =
  typeof ServersDissociateGatewayOutput.Type;

// The operation
/**
 * Dissociates a Unified Gateway associated with the server.
 *
 * @param serverName - The name of the Analysis Services server. It must be at least 3 characters in length, and no more than 63.
 */
export const ServersDissociateGateway = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServersDissociateGatewayInput,
    outputSchema: ServersDissociateGatewayOutput,
  }),
);
// Input Schema
export const ServersGetDetailsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    serverName: Schema.String.pipe(T.PathParam()),
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AnalysisServices/servers/{serverName}",
  }),
);
export type ServersGetDetailsInput = typeof ServersGetDetailsInput.Type;

// Output Schema
export const ServersGetDetailsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.String,
    sku: Schema.Struct({
      name: Schema.String,
      tier: Schema.optional(
        Schema.Literals(["Development", "Basic", "Standard"]),
      ),
      capacity: Schema.optional(Schema.Number),
    }),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type ServersGetDetailsOutput = typeof ServersGetDetailsOutput.Type;

// The operation
/**
 * Gets details about the specified Analysis Services server.
 *
 * @param serverName - The name of the Analysis Services server. It must be a minimum of 3 characters, and a maximum of 63.
 */
export const ServersGetDetails = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServersGetDetailsInput,
  outputSchema: ServersGetDetailsOutput,
}));
// Input Schema
export const ServersListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.AnalysisServices/servers",
  }),
);
export type ServersListInput = typeof ServersListInput.Type;

// Output Schema
export const ServersListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(
    Schema.Struct({
      id: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
      location: Schema.String,
      sku: Schema.Struct({
        name: Schema.String,
        tier: Schema.optional(
          Schema.Literals(["Development", "Basic", "Standard"]),
        ),
        capacity: Schema.optional(Schema.Number),
      }),
      tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  ),
});
export type ServersListOutput = typeof ServersListOutput.Type;

// The operation
/**
 * Lists all the Analysis Services servers for the given subscription.
 */
export const ServersList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServersListInput,
  outputSchema: ServersListOutput,
}));
// Input Schema
export const ServersListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AnalysisServices/servers",
    }),
  );
export type ServersListByResourceGroupInput =
  typeof ServersListByResourceGroupInput.Type;

// Output Schema
export const ServersListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
        location: Schema.String,
        sku: Schema.Struct({
          name: Schema.String,
          tier: Schema.optional(
            Schema.Literals(["Development", "Basic", "Standard"]),
          ),
          capacity: Schema.optional(Schema.Number),
        }),
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      }),
    ),
  });
export type ServersListByResourceGroupOutput =
  typeof ServersListByResourceGroupOutput.Type;

// The operation
/**
 * Gets all the Analysis Services servers for the given resource group.
 */
export const ServersListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServersListByResourceGroupInput,
    outputSchema: ServersListByResourceGroupOutput,
  }),
);
// Input Schema
export const ServersListGatewayStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serverName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AnalysisServices/servers/{serverName}/listGatewayStatus",
    }),
  );
export type ServersListGatewayStatusInput =
  typeof ServersListGatewayStatusInput.Type;

// Output Schema
export const ServersListGatewayStatusOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    status: Schema.optional(Schema.Literals(["0"])),
  });
export type ServersListGatewayStatusOutput =
  typeof ServersListGatewayStatusOutput.Type;

// The operation
/**
 * Return the gateway status of the specified Analysis Services server instance.
 *
 * @param serverName - The name of the Analysis Services server.
 */
export const ServersListGatewayStatus = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServersListGatewayStatusInput,
    outputSchema: ServersListGatewayStatusOutput,
  }),
);
// Input Schema
export const ServersListOperationResultsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String.pipe(T.PathParam()),
    operationId: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AnalysisServices/locations/{location}/operationresults/{operationId}",
    }),
  );
export type ServersListOperationResultsInput =
  typeof ServersListOperationResultsInput.Type;

// Output Schema
export const ServersListOperationResultsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServersListOperationResultsOutput =
  typeof ServersListOperationResultsOutput.Type;

// The operation
/**
 * List the result of the specified operation.
 *
 * @param location - The region name which the operation will lookup into.
 * @param operationId - The target operation Id.
 */
export const ServersListOperationResults = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServersListOperationResultsInput,
    outputSchema: ServersListOperationResultsOutput,
  }),
);
// Input Schema
export const ServersListOperationStatusesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String.pipe(T.PathParam()),
    operationId: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AnalysisServices/locations/{location}/operationstatuses/{operationId}",
    }),
  );
export type ServersListOperationStatusesInput =
  typeof ServersListOperationStatusesInput.Type;

// Output Schema
export const ServersListOperationStatusesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    startTime: Schema.optional(Schema.String),
    endTime: Schema.optional(Schema.String),
    status: Schema.optional(Schema.String),
    error: Schema.optional(
      Schema.Struct({
        code: Schema.optional(Schema.String),
        message: Schema.optional(Schema.String),
        target: Schema.optional(Schema.String),
        subCode: Schema.optional(Schema.Number),
        httpStatusCode: Schema.optional(Schema.Number),
        timeStamp: Schema.optional(Schema.String),
        details: Schema.optional(Schema.Array(Schema.Unknown)),
        additionalInfo: Schema.optional(
          Schema.Array(
            Schema.Struct({
              type: Schema.optional(Schema.String),
              info: Schema.optional(Schema.Unknown),
            }),
          ),
        ),
      }),
    ),
  });
export type ServersListOperationStatusesOutput =
  typeof ServersListOperationStatusesOutput.Type;

// The operation
/**
 * List the status of operation.
 *
 * @param location - The region name which the operation will lookup into.
 * @param operationId - The target operation Id.
 */
export const ServersListOperationStatuses =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServersListOperationStatusesInput,
    outputSchema: ServersListOperationStatusesOutput,
  }));
// Input Schema
export const ServersListSkusForExistingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serverName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AnalysisServices/servers/{serverName}/skus",
    }),
  );
export type ServersListSkusForExistingInput =
  typeof ServersListSkusForExistingInput.Type;

// Output Schema
export const ServersListSkusForExistingOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          sku: Schema.optional(
            Schema.Struct({
              name: Schema.String,
              tier: Schema.optional(
                Schema.Literals(["Development", "Basic", "Standard"]),
              ),
              capacity: Schema.optional(Schema.Number),
            }),
          ),
          resourceType: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type ServersListSkusForExistingOutput =
  typeof ServersListSkusForExistingOutput.Type;

// The operation
/**
 * Lists eligible SKUs for an Analysis Services resource.
 *
 * @param serverName - The name of the Analysis Services server. It must be at least 3 characters in length, and no more than 63.
 */
export const ServersListSkusForExisting = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServersListSkusForExistingInput,
    outputSchema: ServersListSkusForExistingOutput,
  }),
);
// Input Schema
export const ServersListSkusForNewInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AnalysisServices/skus",
    }),
  );
export type ServersListSkusForNewInput = typeof ServersListSkusForNewInput.Type;

// Output Schema
export const ServersListSkusForNewOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          name: Schema.String,
          tier: Schema.optional(
            Schema.Literals(["Development", "Basic", "Standard"]),
          ),
          capacity: Schema.optional(Schema.Number),
        }),
      ),
    ),
  });
export type ServersListSkusForNewOutput =
  typeof ServersListSkusForNewOutput.Type;

// The operation
/**
 * Lists eligible SKUs for Analysis Services resource provider.
 */
export const ServersListSkusForNew = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServersListSkusForNewInput,
    outputSchema: ServersListSkusForNewOutput,
  }),
);
// Input Schema
export const ServersResumeInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  serverName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AnalysisServices/servers/{serverName}/resume",
  }),
);
export type ServersResumeInput = typeof ServersResumeInput.Type;

// Output Schema
export const ServersResumeOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServersResumeOutput = typeof ServersResumeOutput.Type;

// The operation
/**
 * Resumes operation of the specified Analysis Services server instance.
 *
 * @param serverName - The name of the Analysis Services server. It must be at least 3 characters in length, and no more than 63.
 */
export const ServersResume = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServersResumeInput,
  outputSchema: ServersResumeOutput,
}));
// Input Schema
export const ServersSuspendInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  serverName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AnalysisServices/servers/{serverName}/suspend",
  }),
);
export type ServersSuspendInput = typeof ServersSuspendInput.Type;

// Output Schema
export const ServersSuspendOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServersSuspendOutput = typeof ServersSuspendOutput.Type;

// The operation
/**
 * Suspends operation of the specified Analysis Services server instance.
 *
 * @param serverName - The name of the Analysis Services server. It must be at least 3 characters in length, and no more than 63.
 */
export const ServersSuspend = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServersSuspendInput,
  outputSchema: ServersSuspendOutput,
}));
// Input Schema
export const ServersUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  serverName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AnalysisServices/servers/{serverName}",
  }),
);
export type ServersUpdateInput = typeof ServersUpdateInput.Type;

// Output Schema
export const ServersUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  location: Schema.String,
  sku: Schema.Struct({
    name: Schema.String,
    tier: Schema.optional(
      Schema.Literals(["Development", "Basic", "Standard"]),
    ),
    capacity: Schema.optional(Schema.Number),
  }),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
});
export type ServersUpdateOutput = typeof ServersUpdateOutput.Type;

// The operation
/**
 * Updates the current state of the specified Analysis Services server.
 *
 * @param serverName - The name of the Analysis Services server. It must be at least 3 characters in length, and no more than 63.
 */
export const ServersUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServersUpdateInput,
  outputSchema: ServersUpdateOutput,
}));
