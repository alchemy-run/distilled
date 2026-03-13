/**
 * Azure Streamanalytics API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const ClustersCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StreamAnalytics/clusters/{clusterName}",
    }),
  );
export type ClustersCreateOrUpdateInput =
  typeof ClustersCreateOrUpdateInput.Type;

// Output Schema
export const ClustersCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.optional(Schema.String),
  });
export type ClustersCreateOrUpdateOutput =
  typeof ClustersCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates a Stream Analytics Cluster or replaces an already existing cluster.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param If-Match - The ETag of the resource. Omit this value to always overwrite the current record set. Specify the last-seen ETag value to prevent accidentally overwriting concurrent changes.
 * @param If-None-Match - Set to '*' to allow a new resource to be created, but to prevent updating an existing record set. Other values will result in a 412 Pre-condition Failed response.
 */
export const ClustersCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ClustersCreateOrUpdateInput,
    outputSchema: ClustersCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ClustersDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StreamAnalytics/clusters/{clusterName}",
  }),
);
export type ClustersDeleteInput = typeof ClustersDeleteInput.Type;

// Output Schema
export const ClustersDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ClustersDeleteOutput = typeof ClustersDeleteOutput.Type;

// The operation
/**
 * Deletes the specified cluster.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ClustersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ClustersDeleteInput,
  outputSchema: ClustersDeleteOutput,
}));
// Input Schema
export const ClustersGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StreamAnalytics/clusters/{clusterName}",
  }),
);
export type ClustersGetInput = typeof ClustersGetInput.Type;

// Output Schema
export const ClustersGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.optional(Schema.String),
});
export type ClustersGetOutput = typeof ClustersGetOutput.Type;

// The operation
/**
 * Gets information about the specified cluster.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ClustersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ClustersGetInput,
  outputSchema: ClustersGetOutput,
}));
// Input Schema
export const ClustersListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StreamAnalytics/clusters",
    }),
  );
export type ClustersListByResourceGroupInput =
  typeof ClustersListByResourceGroupInput.Type;

// Output Schema
export const ClustersListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ClustersListByResourceGroupOutput =
  typeof ClustersListByResourceGroupOutput.Type;

// The operation
/**
 * Lists all of the clusters in the given resource group.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ClustersListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ClustersListByResourceGroupInput,
    outputSchema: ClustersListByResourceGroupOutput,
  }),
);
// Input Schema
export const ClustersListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.StreamAnalytics/clusters",
    }),
  );
export type ClustersListBySubscriptionInput =
  typeof ClustersListBySubscriptionInput.Type;

// Output Schema
export const ClustersListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ClustersListBySubscriptionOutput =
  typeof ClustersListBySubscriptionOutput.Type;

// The operation
/**
 * Lists all of the clusters in the given subscription.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const ClustersListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ClustersListBySubscriptionInput,
    outputSchema: ClustersListBySubscriptionOutput,
  }),
);
// Input Schema
export const ClustersListStreamingJobsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StreamAnalytics/clusters/{clusterName}/listStreamingJobs",
    }),
  );
export type ClustersListStreamingJobsInput =
  typeof ClustersListStreamingJobsInput.Type;

// Output Schema
export const ClustersListStreamingJobsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          streamingUnits: Schema.optional(Schema.Number),
          jobState: Schema.optional(
            Schema.Literals([
              "Created",
              "Starting",
              "Running",
              "Stopping",
              "Stopped",
              "Deleting",
              "Failed",
              "Degraded",
              "Restarting",
              "Scaling",
            ]),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ClustersListStreamingJobsOutput =
  typeof ClustersListStreamingJobsOutput.Type;

// The operation
/**
 * Lists all of the streaming jobs in the given cluster.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ClustersListStreamingJobs = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ClustersListStreamingJobsInput,
    outputSchema: ClustersListStreamingJobsOutput,
  }),
);
// Input Schema
export const ClustersUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StreamAnalytics/clusters/{clusterName}",
  }),
);
export type ClustersUpdateInput = typeof ClustersUpdateInput.Type;

// Output Schema
export const ClustersUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.optional(Schema.String),
});
export type ClustersUpdateOutput = typeof ClustersUpdateOutput.Type;

// The operation
/**
 * Updates an existing cluster. This can be used to partially update (ie. update one or two properties) a cluster without affecting the rest of the cluster definition.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param If-Match - The ETag of the resource. Omit this value to always overwrite the current record set. Specify the last-seen ETag value to prevent accidentally overwriting concurrent changes.
 */
export const ClustersUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ClustersUpdateInput,
  outputSchema: ClustersUpdateOutput,
}));
// Input Schema
export const FunctionsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.StreamAnalytics/streamingjobs/{jobName}/functions/{functionName}",
    }),
  );
export type FunctionsCreateOrReplaceInput =
  typeof FunctionsCreateOrReplaceInput.Type;

// Output Schema
export const FunctionsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type FunctionsCreateOrReplaceOutput =
  typeof FunctionsCreateOrReplaceOutput.Type;

// The operation
/**
 * Creates a function or replaces an already existing function under an existing streaming job.
 *
 * @param If-Match - The ETag of the function. Omit this value to always overwrite the current function. Specify the last-seen ETag value to prevent accidentally overwriting concurrent changes.
 * @param If-None-Match - Set to '*' to allow a new function to be created, but to prevent updating an existing function. Other values will result in a 412 Pre-condition Failed response.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param jobName - The name of the streaming job.
 */
export const FunctionsCreateOrReplace = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FunctionsCreateOrReplaceInput,
    outputSchema: FunctionsCreateOrReplaceOutput,
  }),
);
// Input Schema
export const FunctionsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  jobName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.StreamAnalytics/streamingjobs/{jobName}/functions/{functionName}",
  }),
);
export type FunctionsDeleteInput = typeof FunctionsDeleteInput.Type;

// Output Schema
export const FunctionsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type FunctionsDeleteOutput = typeof FunctionsDeleteOutput.Type;

// The operation
/**
 * Deletes a function from the streaming job.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param jobName - The name of the streaming job.
 */
export const FunctionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FunctionsDeleteInput,
  outputSchema: FunctionsDeleteOutput,
}));
// Input Schema
export const FunctionsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  jobName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.StreamAnalytics/streamingjobs/{jobName}/functions/{functionName}",
  }),
);
export type FunctionsGetInput = typeof FunctionsGetInput.Type;

// Output Schema
export const FunctionsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
});
export type FunctionsGetOutput = typeof FunctionsGetOutput.Type;

// The operation
/**
 * Gets details about the specified function.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param jobName - The name of the streaming job.
 */
export const FunctionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FunctionsGetInput,
  outputSchema: FunctionsGetOutput,
}));
// Input Schema
export const FunctionsListByStreamingJobInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobName: Schema.String.pipe(T.PathParam()),
    $select: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.StreamAnalytics/streamingjobs/{jobName}/functions",
    }),
  );
export type FunctionsListByStreamingJobInput =
  typeof FunctionsListByStreamingJobInput.Type;

// Output Schema
export const FunctionsListByStreamingJobOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type FunctionsListByStreamingJobOutput =
  typeof FunctionsListByStreamingJobOutput.Type;

// The operation
/**
 * Lists all of the functions under the specified streaming job.
 *
 * @param $select - The $select OData query parameter. This is a comma-separated list of structural properties to include in the response, or "*" to include all properties. By default, all properties are returned except diagnostics. Currently only accepts '*' as a valid value.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param jobName - The name of the streaming job.
 */
export const FunctionsListByStreamingJob = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FunctionsListByStreamingJobInput,
    outputSchema: FunctionsListByStreamingJobOutput,
  }),
);
// Input Schema
export const FunctionsRetrieveDefaultDefinitionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.StreamAnalytics/streamingjobs/{jobName}/functions/{functionName}/retrieveDefaultDefinition",
    }),
  );
export type FunctionsRetrieveDefaultDefinitionInput =
  typeof FunctionsRetrieveDefaultDefinitionInput.Type;

// Output Schema
export const FunctionsRetrieveDefaultDefinitionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type FunctionsRetrieveDefaultDefinitionOutput =
  typeof FunctionsRetrieveDefaultDefinitionOutput.Type;

// The operation
/**
 * Retrieves the default definition of a function based on the parameters specified.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param jobName - The name of the streaming job.
 */
export const FunctionsRetrieveDefaultDefinition =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FunctionsRetrieveDefaultDefinitionInput,
    outputSchema: FunctionsRetrieveDefaultDefinitionOutput,
  }));
// Input Schema
export const FunctionsTestInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  jobName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.StreamAnalytics/streamingjobs/{jobName}/functions/{functionName}/test",
  }),
);
export type FunctionsTestInput = typeof FunctionsTestInput.Type;

// Output Schema
export const FunctionsTestOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  status: Schema.optional(Schema.String),
  error: Schema.optional(
    Schema.Struct({
      code: Schema.optional(Schema.String),
      message: Schema.optional(Schema.String),
    }),
  ),
});
export type FunctionsTestOutput = typeof FunctionsTestOutput.Type;

// The operation
/**
 * Tests if the information provided for a function is valid. This can range from testing the connection to the underlying web service behind the function or making sure the function code provided is syntactically correct.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param jobName - The name of the streaming job.
 */
export const FunctionsTest = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FunctionsTestInput,
  outputSchema: FunctionsTestOutput,
}));
// Input Schema
export const FunctionsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  jobName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.StreamAnalytics/streamingjobs/{jobName}/functions/{functionName}",
  }),
);
export type FunctionsUpdateInput = typeof FunctionsUpdateInput.Type;

// Output Schema
export const FunctionsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
});
export type FunctionsUpdateOutput = typeof FunctionsUpdateOutput.Type;

// The operation
/**
 * Updates an existing function under an existing streaming job. This can be used to partially update (ie. update one or two properties) a function without affecting the rest the job or function definition.
 *
 * @param If-Match - The ETag of the function. Omit this value to always overwrite the current function. Specify the last-seen ETag value to prevent accidentally overwriting concurrent changes.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param jobName - The name of the streaming job.
 */
export const FunctionsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FunctionsUpdateInput,
  outputSchema: FunctionsUpdateOutput,
}));
// Input Schema
export const InputsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.StreamAnalytics/streamingjobs/{jobName}/inputs/{inputName}",
    }),
  );
export type InputsCreateOrReplaceInput = typeof InputsCreateOrReplaceInput.Type;

// Output Schema
export const InputsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type InputsCreateOrReplaceOutput =
  typeof InputsCreateOrReplaceOutput.Type;

// The operation
/**
 * Creates an input or replaces an already existing input under an existing streaming job.
 *
 * @param If-Match - The ETag of the input. Omit this value to always overwrite the current input. Specify the last-seen ETag value to prevent accidentally overwriting concurrent changes.
 * @param If-None-Match - Set to '*' to allow a new input to be created, but to prevent updating an existing input. Other values will result in a 412 Pre-condition Failed response.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param jobName - The name of the streaming job.
 */
export const InputsCreateOrReplace = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: InputsCreateOrReplaceInput,
    outputSchema: InputsCreateOrReplaceOutput,
  }),
);
// Input Schema
export const InputsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  jobName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.StreamAnalytics/streamingjobs/{jobName}/inputs/{inputName}",
  }),
);
export type InputsDeleteInput = typeof InputsDeleteInput.Type;

// Output Schema
export const InputsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type InputsDeleteOutput = typeof InputsDeleteOutput.Type;

// The operation
/**
 * Deletes an input from the streaming job.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param jobName - The name of the streaming job.
 */
export const InputsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: InputsDeleteInput,
  outputSchema: InputsDeleteOutput,
}));
// Input Schema
export const InputsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  jobName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.StreamAnalytics/streamingjobs/{jobName}/inputs/{inputName}",
  }),
);
export type InputsGetInput = typeof InputsGetInput.Type;

// Output Schema
export const InputsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
});
export type InputsGetOutput = typeof InputsGetOutput.Type;

// The operation
/**
 * Gets details about the specified input.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param jobName - The name of the streaming job.
 */
export const InputsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: InputsGetInput,
  outputSchema: InputsGetOutput,
}));
// Input Schema
export const InputsListByStreamingJobInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobName: Schema.String.pipe(T.PathParam()),
    $select: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.StreamAnalytics/streamingjobs/{jobName}/inputs",
    }),
  );
export type InputsListByStreamingJobInput =
  typeof InputsListByStreamingJobInput.Type;

// Output Schema
export const InputsListByStreamingJobOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type InputsListByStreamingJobOutput =
  typeof InputsListByStreamingJobOutput.Type;

// The operation
/**
 * Lists all of the inputs under the specified streaming job.
 *
 * @param $select - The $select OData query parameter. This is a comma-separated list of structural properties to include in the response, or "*" to include all properties. By default, all properties are returned except diagnostics. Currently only accepts '*' as a valid value.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param jobName - The name of the streaming job.
 */
export const InputsListByStreamingJob = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: InputsListByStreamingJobInput,
    outputSchema: InputsListByStreamingJobOutput,
  }),
);
// Input Schema
export const InputsTestInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  jobName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.StreamAnalytics/streamingjobs/{jobName}/inputs/{inputName}/test",
  }),
);
export type InputsTestInput = typeof InputsTestInput.Type;

// Output Schema
export const InputsTestOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  status: Schema.optional(Schema.String),
  error: Schema.optional(
    Schema.Struct({
      code: Schema.optional(Schema.String),
      message: Schema.optional(Schema.String),
    }),
  ),
});
export type InputsTestOutput = typeof InputsTestOutput.Type;

// The operation
/**
 * Tests whether an input’s datasource is reachable and usable by the Azure Stream Analytics service.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param jobName - The name of the streaming job.
 */
export const InputsTest = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: InputsTestInput,
  outputSchema: InputsTestOutput,
}));
// Input Schema
export const InputsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  jobName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.StreamAnalytics/streamingjobs/{jobName}/inputs/{inputName}",
  }),
);
export type InputsUpdateInput = typeof InputsUpdateInput.Type;

// Output Schema
export const InputsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
});
export type InputsUpdateOutput = typeof InputsUpdateOutput.Type;

// The operation
/**
 * Updates an existing input under an existing streaming job. This can be used to partially update (ie. update one or two properties) an input without affecting the rest the job or input definition.
 *
 * @param If-Match - The ETag of the input. Omit this value to always overwrite the current input. Specify the last-seen ETag value to prevent accidentally overwriting concurrent changes.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param jobName - The name of the streaming job.
 */
export const InputsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: InputsUpdateInput,
  outputSchema: InputsUpdateOutput,
}));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.StreamAnalytics/operations",
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
 * Lists all of the available Stream Analytics related operations.
 *
 * @param api-version - The API version to use for this operation.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const OutputsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.StreamAnalytics/streamingjobs/{jobName}/outputs/{outputName}",
    }),
  );
export type OutputsCreateOrReplaceInput =
  typeof OutputsCreateOrReplaceInput.Type;

// Output Schema
export const OutputsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type OutputsCreateOrReplaceOutput =
  typeof OutputsCreateOrReplaceOutput.Type;

// The operation
/**
 * Creates an output or replaces an already existing output under an existing streaming job.
 *
 * @param If-Match - The ETag of the output. Omit this value to always overwrite the current output. Specify the last-seen ETag value to prevent accidentally overwriting concurrent changes.
 * @param If-None-Match - Set to '*' to allow a new output to be created, but to prevent updating an existing output. Other values will result in a 412 Pre-condition Failed response.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param jobName - The name of the streaming job.
 */
export const OutputsCreateOrReplace = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: OutputsCreateOrReplaceInput,
    outputSchema: OutputsCreateOrReplaceOutput,
  }),
);
// Input Schema
export const OutputsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  jobName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.StreamAnalytics/streamingjobs/{jobName}/outputs/{outputName}",
  }),
);
export type OutputsDeleteInput = typeof OutputsDeleteInput.Type;

// Output Schema
export const OutputsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type OutputsDeleteOutput = typeof OutputsDeleteOutput.Type;

// The operation
/**
 * Deletes an output from the streaming job.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param jobName - The name of the streaming job.
 */
export const OutputsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OutputsDeleteInput,
  outputSchema: OutputsDeleteOutput,
}));
// Input Schema
export const OutputsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  jobName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.StreamAnalytics/streamingjobs/{jobName}/outputs/{outputName}",
  }),
);
export type OutputsGetInput = typeof OutputsGetInput.Type;

// Output Schema
export const OutputsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
});
export type OutputsGetOutput = typeof OutputsGetOutput.Type;

// The operation
/**
 * Gets details about the specified output.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param jobName - The name of the streaming job.
 */
export const OutputsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OutputsGetInput,
  outputSchema: OutputsGetOutput,
}));
// Input Schema
export const OutputsListByStreamingJobInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobName: Schema.String.pipe(T.PathParam()),
    $select: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.StreamAnalytics/streamingjobs/{jobName}/outputs",
    }),
  );
export type OutputsListByStreamingJobInput =
  typeof OutputsListByStreamingJobInput.Type;

// Output Schema
export const OutputsListByStreamingJobOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type OutputsListByStreamingJobOutput =
  typeof OutputsListByStreamingJobOutput.Type;

// The operation
/**
 * Lists all of the outputs under the specified streaming job.
 *
 * @param $select - The $select OData query parameter. This is a comma-separated list of structural properties to include in the response, or "*" to include all properties. By default, all properties are returned except diagnostics. Currently only accepts '*' as a valid value.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param jobName - The name of the streaming job.
 */
export const OutputsListByStreamingJob = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: OutputsListByStreamingJobInput,
    outputSchema: OutputsListByStreamingJobOutput,
  }),
);
// Input Schema
export const OutputsTestInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  jobName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.StreamAnalytics/streamingjobs/{jobName}/outputs/{outputName}/test",
  }),
);
export type OutputsTestInput = typeof OutputsTestInput.Type;

// Output Schema
export const OutputsTestOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  status: Schema.optional(Schema.String),
  error: Schema.optional(
    Schema.Struct({
      code: Schema.optional(Schema.String),
      message: Schema.optional(Schema.String),
    }),
  ),
});
export type OutputsTestOutput = typeof OutputsTestOutput.Type;

// The operation
/**
 * Tests whether an output’s datasource is reachable and usable by the Azure Stream Analytics service.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param jobName - The name of the streaming job.
 */
export const OutputsTest = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OutputsTestInput,
  outputSchema: OutputsTestOutput,
}));
// Input Schema
export const OutputsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  jobName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.StreamAnalytics/streamingjobs/{jobName}/outputs/{outputName}",
  }),
);
export type OutputsUpdateInput = typeof OutputsUpdateInput.Type;

// Output Schema
export const OutputsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
});
export type OutputsUpdateOutput = typeof OutputsUpdateOutput.Type;

// The operation
/**
 * Updates an existing output under an existing streaming job. This can be used to partially update (ie. update one or two properties) an output without affecting the rest the job or output definition.
 *
 * @param If-Match - The ETag of the output. Omit this value to always overwrite the current output. Specify the last-seen ETag value to prevent accidentally overwriting concurrent changes.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param jobName - The name of the streaming job.
 */
export const OutputsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OutputsUpdateInput,
  outputSchema: OutputsUpdateOutput,
}));
// Input Schema
export const PrivateEndpointsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StreamAnalytics/clusters/{clusterName}/privateEndpoints/{privateEndpointName}",
    }),
  );
export type PrivateEndpointsCreateOrUpdateInput =
  typeof PrivateEndpointsCreateOrUpdateInput.Type;

// Output Schema
export const PrivateEndpointsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrivateEndpointsCreateOrUpdateOutput =
  typeof PrivateEndpointsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates a Stream Analytics Private Endpoint or replaces an already existing Private Endpoint.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 * @param api-version - The API version to use for this operation.
 * @param If-Match - The ETag of the resource. Omit this value to always overwrite the current record set. Specify the last-seen ETag value to prevent accidentally overwriting concurrent changes.
 * @param If-None-Match - Set to '*' to allow a new resource to be created, but to prevent updating an existing record set. Other values will result in a 412 Pre-condition Failed response.
 */
export const PrivateEndpointsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointsCreateOrUpdateInput,
    outputSchema: PrivateEndpointsCreateOrUpdateOutput,
  }));
// Input Schema
export const PrivateEndpointsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StreamAnalytics/clusters/{clusterName}/privateEndpoints/{privateEndpointName}",
    }),
  );
export type PrivateEndpointsDeleteInput =
  typeof PrivateEndpointsDeleteInput.Type;

// Output Schema
export const PrivateEndpointsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PrivateEndpointsDeleteOutput =
  typeof PrivateEndpointsDeleteOutput.Type;

// The operation
/**
 * Delete the specified private endpoint.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 * @param api-version - The API version to use for this operation.
 */
export const PrivateEndpointsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateEndpointsDeleteInput,
    outputSchema: PrivateEndpointsDeleteOutput,
  }),
);
// Input Schema
export const PrivateEndpointsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StreamAnalytics/clusters/{clusterName}/privateEndpoints/{privateEndpointName}",
    }),
  );
export type PrivateEndpointsGetInput = typeof PrivateEndpointsGetInput.Type;

// Output Schema
export const PrivateEndpointsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrivateEndpointsGetOutput = typeof PrivateEndpointsGetOutput.Type;

// The operation
/**
 * Gets information about the specified Private Endpoint.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 * @param api-version - The API version to use for this operation.
 */
export const PrivateEndpointsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PrivateEndpointsGetInput,
  outputSchema: PrivateEndpointsGetOutput,
}));
// Input Schema
export const PrivateEndpointsListByClusterInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StreamAnalytics/clusters/{clusterName}/privateEndpoints",
    }),
  );
export type PrivateEndpointsListByClusterInput =
  typeof PrivateEndpointsListByClusterInput.Type;

// Output Schema
export const PrivateEndpointsListByClusterOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateEndpointsListByClusterOutput =
  typeof PrivateEndpointsListByClusterOutput.Type;

// The operation
/**
 * Lists the private endpoints in the cluster.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 * @param api-version - The API version to use for this operation.
 */
export const PrivateEndpointsListByCluster =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointsListByClusterInput,
    outputSchema: PrivateEndpointsListByClusterOutput,
  }));
// Input Schema
export const StreamingJobsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.StreamAnalytics/streamingjobs/{jobName}",
    }),
  );
export type StreamingJobsCreateOrReplaceInput =
  typeof StreamingJobsCreateOrReplaceInput.Type;

// Output Schema
export const StreamingJobsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.optional(Schema.String),
  });
export type StreamingJobsCreateOrReplaceOutput =
  typeof StreamingJobsCreateOrReplaceOutput.Type;

// The operation
/**
 * Creates a streaming job or replaces an already existing streaming job.
 *
 * @param If-Match - The ETag of the streaming job. Omit this value to always overwrite the current record set. Specify the last-seen ETag value to prevent accidentally overwriting concurrent changes.
 * @param If-None-Match - Set to '*' to allow a new streaming job to be created, but to prevent updating an existing record set. Other values will result in a 412 Pre-condition Failed response.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param jobName - The name of the streaming job.
 */
export const StreamingJobsCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: StreamingJobsCreateOrReplaceInput,
    outputSchema: StreamingJobsCreateOrReplaceOutput,
  }));
// Input Schema
export const StreamingJobsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.StreamAnalytics/streamingjobs/{jobName}",
    }),
  );
export type StreamingJobsDeleteInput = typeof StreamingJobsDeleteInput.Type;

// Output Schema
export const StreamingJobsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type StreamingJobsDeleteOutput = typeof StreamingJobsDeleteOutput.Type;

// The operation
/**
 * Deletes a streaming job.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param jobName - The name of the streaming job.
 */
export const StreamingJobsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: StreamingJobsDeleteInput,
  outputSchema: StreamingJobsDeleteOutput,
}));
// Input Schema
export const StreamingJobsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  jobName: Schema.String.pipe(T.PathParam()),
  $expand: Schema.optional(Schema.String),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.StreamAnalytics/streamingjobs/{jobName}",
  }),
);
export type StreamingJobsGetInput = typeof StreamingJobsGetInput.Type;

// Output Schema
export const StreamingJobsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.optional(Schema.String),
  },
);
export type StreamingJobsGetOutput = typeof StreamingJobsGetOutput.Type;

// The operation
/**
 * Gets details about the specified streaming job.
 *
 * @param $expand - The $expand OData query parameter. This is a comma-separated list of additional streaming job properties to include in the response, beyond the default set returned when this parameter is absent. The default set is all streaming job properties other than 'inputs', 'transformation', 'outputs', and 'functions'.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param jobName - The name of the streaming job.
 */
export const StreamingJobsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: StreamingJobsGetInput,
  outputSchema: StreamingJobsGetOutput,
}));
// Input Schema
export const StreamingJobsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    $expand: Schema.optional(Schema.String),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.StreamAnalytics/streamingjobs",
  }),
);
export type StreamingJobsListInput = typeof StreamingJobsListInput.Type;

// Output Schema
export const StreamingJobsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type StreamingJobsListOutput = typeof StreamingJobsListOutput.Type;

// The operation
/**
 * Lists all of the streaming jobs in the given subscription.
 *
 * @param $expand - The $expand OData query parameter. This is a comma-separated list of additional streaming job properties to include in the response, beyond the default set returned when this parameter is absent. The default set is all streaming job properties other than 'inputs', 'transformation', 'outputs', and 'functions'.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const StreamingJobsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: StreamingJobsListInput,
  outputSchema: StreamingJobsListOutput,
}));
// Input Schema
export const StreamingJobsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    $expand: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.StreamAnalytics/streamingjobs",
    }),
  );
export type StreamingJobsListByResourceGroupInput =
  typeof StreamingJobsListByResourceGroupInput.Type;

// Output Schema
export const StreamingJobsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type StreamingJobsListByResourceGroupOutput =
  typeof StreamingJobsListByResourceGroupOutput.Type;

// The operation
/**
 * Lists all of the streaming jobs in the specified resource group.
 *
 * @param $expand - The $expand OData query parameter. This is a comma-separated list of additional streaming job properties to include in the response, beyond the default set returned when this parameter is absent. The default set is all streaming job properties other than 'inputs', 'transformation', 'outputs', and 'functions'.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const StreamingJobsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: StreamingJobsListByResourceGroupInput,
    outputSchema: StreamingJobsListByResourceGroupOutput,
  }));
// Input Schema
export const StreamingJobsScaleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.StreamAnalytics/streamingjobs/{jobName}/scale",
    }),
  );
export type StreamingJobsScaleInput = typeof StreamingJobsScaleInput.Type;

// Output Schema
export const StreamingJobsScaleOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type StreamingJobsScaleOutput = typeof StreamingJobsScaleOutput.Type;

// The operation
/**
 * Scales a streaming job when the job is running.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param jobName - The name of the streaming job.
 */
export const StreamingJobsScale = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: StreamingJobsScaleInput,
  outputSchema: StreamingJobsScaleOutput,
}));
// Input Schema
export const StreamingJobsStartInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.StreamAnalytics/streamingjobs/{jobName}/start",
    }),
  );
export type StreamingJobsStartInput = typeof StreamingJobsStartInput.Type;

// Output Schema
export const StreamingJobsStartOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type StreamingJobsStartOutput = typeof StreamingJobsStartOutput.Type;

// The operation
/**
 * Starts a streaming job. Once a job is started it will start processing input events and produce output.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param jobName - The name of the streaming job.
 */
export const StreamingJobsStart = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: StreamingJobsStartInput,
  outputSchema: StreamingJobsStartOutput,
}));
// Input Schema
export const StreamingJobsStopInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.StreamAnalytics/streamingjobs/{jobName}/stop",
  }),
);
export type StreamingJobsStopInput = typeof StreamingJobsStopInput.Type;

// Output Schema
export const StreamingJobsStopOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type StreamingJobsStopOutput = typeof StreamingJobsStopOutput.Type;

// The operation
/**
 * Stops a running streaming job. This will cause a running streaming job to stop processing input events and producing output.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param jobName - The name of the streaming job.
 */
export const StreamingJobsStop = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: StreamingJobsStopInput,
  outputSchema: StreamingJobsStopOutput,
}));
// Input Schema
export const StreamingJobsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.StreamAnalytics/streamingjobs/{jobName}",
    }),
  );
export type StreamingJobsUpdateInput = typeof StreamingJobsUpdateInput.Type;

// Output Schema
export const StreamingJobsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.optional(Schema.String),
  });
export type StreamingJobsUpdateOutput = typeof StreamingJobsUpdateOutput.Type;

// The operation
/**
 * Updates an existing streaming job. This can be used to partially update (ie. update one or two properties) a streaming job without affecting the rest the job definition.
 *
 * @param If-Match - The ETag of the streaming job. Omit this value to always overwrite the current record set. Specify the last-seen ETag value to prevent accidentally overwriting concurrent changes.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param jobName - The name of the streaming job.
 */
export const StreamingJobsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: StreamingJobsUpdateInput,
  outputSchema: StreamingJobsUpdateOutput,
}));
// Input Schema
export const SubscriptionsListQuotasInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.StreamAnalytics/locations/{location}/quotas",
    }),
  );
export type SubscriptionsListQuotasInput =
  typeof SubscriptionsListQuotasInput.Type;

// Output Schema
export const SubscriptionsListQuotasOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type SubscriptionsListQuotasOutput =
  typeof SubscriptionsListQuotasOutput.Type;

// The operation
/**
 * Retrieves the subscription's current quota information in a particular region.
 *
 * @param location - The region in which to retrieve the subscription's quota information. You can find out which regions Azure Stream Analytics is supported in here: https://azure.microsoft.com/en-us/regions/
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const SubscriptionsListQuotas = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SubscriptionsListQuotasInput,
    outputSchema: SubscriptionsListQuotasOutput,
  }),
);
// Input Schema
export const TransformationsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.StreamAnalytics/streamingjobs/{jobName}/transformations/{transformationName}",
    }),
  );
export type TransformationsCreateOrReplaceInput =
  typeof TransformationsCreateOrReplaceInput.Type;

// Output Schema
export const TransformationsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type TransformationsCreateOrReplaceOutput =
  typeof TransformationsCreateOrReplaceOutput.Type;

// The operation
/**
 * Creates a transformation or replaces an already existing transformation under an existing streaming job.
 *
 * @param If-Match - The ETag of the transformation. Omit this value to always overwrite the current transformation. Specify the last-seen ETag value to prevent accidentally overwriting concurrent changes.
 * @param If-None-Match - Set to '*' to allow a new transformation to be created, but to prevent updating an existing transformation. Other values will result in a 412 Pre-condition Failed response.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param jobName - The name of the streaming job.
 */
export const TransformationsCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TransformationsCreateOrReplaceInput,
    outputSchema: TransformationsCreateOrReplaceOutput,
  }));
// Input Schema
export const TransformationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.StreamAnalytics/streamingjobs/{jobName}/transformations/{transformationName}",
    }),
  );
export type TransformationsGetInput = typeof TransformationsGetInput.Type;

// Output Schema
export const TransformationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type TransformationsGetOutput = typeof TransformationsGetOutput.Type;

// The operation
/**
 * Gets details about the specified transformation.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param jobName - The name of the streaming job.
 */
export const TransformationsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TransformationsGetInput,
  outputSchema: TransformationsGetOutput,
}));
// Input Schema
export const TransformationsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.StreamAnalytics/streamingjobs/{jobName}/transformations/{transformationName}",
    }),
  );
export type TransformationsUpdateInput = typeof TransformationsUpdateInput.Type;

// Output Schema
export const TransformationsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type TransformationsUpdateOutput =
  typeof TransformationsUpdateOutput.Type;

// The operation
/**
 * Updates an existing transformation under an existing streaming job. This can be used to partially update (ie. update one or two properties) a transformation without affecting the rest the job or transformation definition.
 *
 * @param If-Match - The ETag of the transformation. Omit this value to always overwrite the current transformation. Specify the last-seen ETag value to prevent accidentally overwriting concurrent changes.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param jobName - The name of the streaming job.
 */
export const TransformationsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TransformationsUpdateInput,
    outputSchema: TransformationsUpdateOutput,
  }),
);
