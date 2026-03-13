/**
 * Azure Scheduler API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const JobCollectionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobCollectionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Scheduler/jobCollections/{jobCollectionName}",
    }),
  );
export type JobCollectionsCreateOrUpdateInput =
  typeof JobCollectionsCreateOrUpdateInput.Type;

// Output Schema
export const JobCollectionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    properties: Schema.optional(
      Schema.Struct({
        sku: Schema.optional(
          Schema.Struct({
            name: Schema.optional(
              Schema.Literals(["Standard", "Free", "P10Premium", "P20Premium"]),
            ),
          }),
        ),
        state: Schema.optional(
          Schema.Literals(["Enabled", "Disabled", "Suspended", "Deleted"]),
        ),
        quota: Schema.optional(
          Schema.Struct({
            maxJobCount: Schema.optional(Schema.Number),
            maxJobOccurrence: Schema.optional(Schema.Number),
            maxRecurrence: Schema.optional(
              Schema.Struct({
                frequency: Schema.optional(
                  Schema.Literals(["Minute", "Hour", "Day", "Week", "Month"]),
                ),
                interval: Schema.optional(Schema.Number),
              }),
            ),
          }),
        ),
      }),
    ),
  });
export type JobCollectionsCreateOrUpdateOutput =
  typeof JobCollectionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Provisions a new job collection or updates an existing job collection.
 *
 * @param resourceGroupName - The resource group name.
 * @param jobCollectionName - The job collection name.
 */
export const JobCollectionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: JobCollectionsCreateOrUpdateInput,
    outputSchema: JobCollectionsCreateOrUpdateOutput,
  }));
// Input Schema
export const JobCollectionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobCollectionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Scheduler/jobCollections/{jobCollectionName}",
    }),
  );
export type JobCollectionsDeleteInput = typeof JobCollectionsDeleteInput.Type;

// Output Schema
export const JobCollectionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type JobCollectionsDeleteOutput = typeof JobCollectionsDeleteOutput.Type;

// The operation
/**
 * Deletes a job collection.
 *
 * @param resourceGroupName - The resource group name.
 * @param jobCollectionName - The job collection name.
 */
export const JobCollectionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: JobCollectionsDeleteInput,
    outputSchema: JobCollectionsDeleteOutput,
  }),
);
// Input Schema
export const JobCollectionsDisableInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobCollectionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Scheduler/jobCollections/{jobCollectionName}/disable",
    }),
  );
export type JobCollectionsDisableInput = typeof JobCollectionsDisableInput.Type;

// Output Schema
export const JobCollectionsDisableOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type JobCollectionsDisableOutput =
  typeof JobCollectionsDisableOutput.Type;

// The operation
/**
 * Disables all of the jobs in the job collection.
 *
 * @param resourceGroupName - The resource group name.
 * @param jobCollectionName - The job collection name.
 */
export const JobCollectionsDisable = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: JobCollectionsDisableInput,
    outputSchema: JobCollectionsDisableOutput,
  }),
);
// Input Schema
export const JobCollectionsEnableInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobCollectionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Scheduler/jobCollections/{jobCollectionName}/enable",
    }),
  );
export type JobCollectionsEnableInput = typeof JobCollectionsEnableInput.Type;

// Output Schema
export const JobCollectionsEnableOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type JobCollectionsEnableOutput = typeof JobCollectionsEnableOutput.Type;

// The operation
/**
 * Enables all of the jobs in the job collection.
 *
 * @param resourceGroupName - The resource group name.
 * @param jobCollectionName - The job collection name.
 */
export const JobCollectionsEnable = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: JobCollectionsEnableInput,
    outputSchema: JobCollectionsEnableOutput,
  }),
);
// Input Schema
export const JobCollectionsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobCollectionName: Schema.String.pipe(T.PathParam()),
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Scheduler/jobCollections/{jobCollectionName}",
  }),
);
export type JobCollectionsGetInput = typeof JobCollectionsGetInput.Type;

// Output Schema
export const JobCollectionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    properties: Schema.optional(
      Schema.Struct({
        sku: Schema.optional(
          Schema.Struct({
            name: Schema.optional(
              Schema.Literals(["Standard", "Free", "P10Premium", "P20Premium"]),
            ),
          }),
        ),
        state: Schema.optional(
          Schema.Literals(["Enabled", "Disabled", "Suspended", "Deleted"]),
        ),
        quota: Schema.optional(
          Schema.Struct({
            maxJobCount: Schema.optional(Schema.Number),
            maxJobOccurrence: Schema.optional(Schema.Number),
            maxRecurrence: Schema.optional(
              Schema.Struct({
                frequency: Schema.optional(
                  Schema.Literals(["Minute", "Hour", "Day", "Week", "Month"]),
                ),
                interval: Schema.optional(Schema.Number),
              }),
            ),
          }),
        ),
      }),
    ),
  });
export type JobCollectionsGetOutput = typeof JobCollectionsGetOutput.Type;

// The operation
/**
 * Gets a job collection.
 *
 * @param resourceGroupName - The resource group name.
 * @param jobCollectionName - The job collection name.
 */
export const JobCollectionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobCollectionsGetInput,
  outputSchema: JobCollectionsGetOutput,
}));
// Input Schema
export const JobCollectionsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Scheduler/jobCollections",
    }),
  );
export type JobCollectionsListByResourceGroupInput =
  typeof JobCollectionsListByResourceGroupInput.Type;

// Output Schema
export const JobCollectionsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          properties: Schema.optional(
            Schema.Struct({
              sku: Schema.optional(
                Schema.Struct({
                  name: Schema.optional(
                    Schema.Literals([
                      "Standard",
                      "Free",
                      "P10Premium",
                      "P20Premium",
                    ]),
                  ),
                }),
              ),
              state: Schema.optional(
                Schema.Literals([
                  "Enabled",
                  "Disabled",
                  "Suspended",
                  "Deleted",
                ]),
              ),
              quota: Schema.optional(
                Schema.Struct({
                  maxJobCount: Schema.optional(Schema.Number),
                  maxJobOccurrence: Schema.optional(Schema.Number),
                  maxRecurrence: Schema.optional(
                    Schema.Struct({
                      frequency: Schema.optional(
                        Schema.Literals([
                          "Minute",
                          "Hour",
                          "Day",
                          "Week",
                          "Month",
                        ]),
                      ),
                      interval: Schema.optional(Schema.Number),
                    }),
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
export type JobCollectionsListByResourceGroupOutput =
  typeof JobCollectionsListByResourceGroupOutput.Type;

// The operation
/**
 * Gets all job collections under specified resource group.
 *
 * @param resourceGroupName - The resource group name.
 */
export const JobCollectionsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: JobCollectionsListByResourceGroupInput,
    outputSchema: JobCollectionsListByResourceGroupOutput,
  }));
// Input Schema
export const JobCollectionsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Scheduler/jobCollections",
    }),
  );
export type JobCollectionsListBySubscriptionInput =
  typeof JobCollectionsListBySubscriptionInput.Type;

// Output Schema
export const JobCollectionsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          properties: Schema.optional(
            Schema.Struct({
              sku: Schema.optional(
                Schema.Struct({
                  name: Schema.optional(
                    Schema.Literals([
                      "Standard",
                      "Free",
                      "P10Premium",
                      "P20Premium",
                    ]),
                  ),
                }),
              ),
              state: Schema.optional(
                Schema.Literals([
                  "Enabled",
                  "Disabled",
                  "Suspended",
                  "Deleted",
                ]),
              ),
              quota: Schema.optional(
                Schema.Struct({
                  maxJobCount: Schema.optional(Schema.Number),
                  maxJobOccurrence: Schema.optional(Schema.Number),
                  maxRecurrence: Schema.optional(
                    Schema.Struct({
                      frequency: Schema.optional(
                        Schema.Literals([
                          "Minute",
                          "Hour",
                          "Day",
                          "Week",
                          "Month",
                        ]),
                      ),
                      interval: Schema.optional(Schema.Number),
                    }),
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
export type JobCollectionsListBySubscriptionOutput =
  typeof JobCollectionsListBySubscriptionOutput.Type;

// The operation
/**
 * Gets all job collections under specified subscription.
 */
export const JobCollectionsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: JobCollectionsListBySubscriptionInput,
    outputSchema: JobCollectionsListBySubscriptionOutput,
  }));
// Input Schema
export const JobCollectionsPatchInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobCollectionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Scheduler/jobCollections/{jobCollectionName}",
    }),
  );
export type JobCollectionsPatchInput = typeof JobCollectionsPatchInput.Type;

// Output Schema
export const JobCollectionsPatchOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    properties: Schema.optional(
      Schema.Struct({
        sku: Schema.optional(
          Schema.Struct({
            name: Schema.optional(
              Schema.Literals(["Standard", "Free", "P10Premium", "P20Premium"]),
            ),
          }),
        ),
        state: Schema.optional(
          Schema.Literals(["Enabled", "Disabled", "Suspended", "Deleted"]),
        ),
        quota: Schema.optional(
          Schema.Struct({
            maxJobCount: Schema.optional(Schema.Number),
            maxJobOccurrence: Schema.optional(Schema.Number),
            maxRecurrence: Schema.optional(
              Schema.Struct({
                frequency: Schema.optional(
                  Schema.Literals(["Minute", "Hour", "Day", "Week", "Month"]),
                ),
                interval: Schema.optional(Schema.Number),
              }),
            ),
          }),
        ),
      }),
    ),
  });
export type JobCollectionsPatchOutput = typeof JobCollectionsPatchOutput.Type;

// The operation
/**
 * Patches an existing job collection.
 *
 * @param resourceGroupName - The resource group name.
 * @param jobCollectionName - The job collection name.
 */
export const JobCollectionsPatch = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobCollectionsPatchInput,
  outputSchema: JobCollectionsPatchOutput,
}));
// Input Schema
export const JobsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobCollectionName: Schema.String.pipe(T.PathParam()),
    jobName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Scheduler/jobCollections/{jobCollectionName}/jobs/{jobName}",
    }),
  );
export type JobsCreateOrUpdateInput = typeof JobsCreateOrUpdateInput.Type;

// Output Schema
export const JobsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        startTime: Schema.optional(Schema.String),
        action: Schema.optional(
          Schema.Struct({
            type: Schema.optional(
              Schema.Literals([
                "Http",
                "Https",
                "StorageQueue",
                "ServiceBusQueue",
                "ServiceBusTopic",
              ]),
            ),
            request: Schema.optional(
              Schema.Struct({
                authentication: Schema.optional(
                  Schema.Struct({
                    type: Schema.Literals([
                      "NotSpecified",
                      "ClientCertificate",
                      "ActiveDirectoryOAuth",
                      "Basic",
                    ]),
                  }),
                ),
                uri: Schema.optional(Schema.String),
                method: Schema.optional(Schema.String),
                body: Schema.optional(Schema.String),
                headers: Schema.optional(
                  Schema.Record(Schema.String, Schema.String),
                ),
              }),
            ),
            queueMessage: Schema.optional(
              Schema.Struct({
                storageAccount: Schema.optional(Schema.String),
                queueName: Schema.optional(Schema.String),
                sasToken: Schema.optional(Schema.String),
                message: Schema.optional(Schema.String),
              }),
            ),
            serviceBusQueueMessage: Schema.optional(
              Schema.Struct({
                authentication: Schema.optional(
                  Schema.Struct({
                    sasKey: Schema.optional(Schema.String),
                    sasKeyName: Schema.optional(Schema.String),
                    type: Schema.optional(
                      Schema.Literals(["NotSpecified", "SharedAccessKey"]),
                    ),
                  }),
                ),
                brokeredMessageProperties: Schema.optional(
                  Schema.Struct({
                    contentType: Schema.optional(Schema.String),
                    correlationId: Schema.optional(Schema.String),
                    forcePersistence: Schema.optional(Schema.Boolean),
                    label: Schema.optional(Schema.String),
                    messageId: Schema.optional(Schema.String),
                    partitionKey: Schema.optional(Schema.String),
                    replyTo: Schema.optional(Schema.String),
                    replyToSessionId: Schema.optional(Schema.String),
                    scheduledEnqueueTimeUtc: Schema.optional(Schema.String),
                    sessionId: Schema.optional(Schema.String),
                    timeToLive: Schema.optional(Schema.String),
                    to: Schema.optional(Schema.String),
                    viaPartitionKey: Schema.optional(Schema.String),
                  }),
                ),
                customMessageProperties: Schema.optional(
                  Schema.Record(Schema.String, Schema.String),
                ),
                message: Schema.optional(Schema.String),
                namespace: Schema.optional(Schema.String),
                transportType: Schema.optional(
                  Schema.Literals(["NotSpecified", "NetMessaging", "AMQP"]),
                ),
              }),
            ),
            serviceBusTopicMessage: Schema.optional(
              Schema.Struct({
                authentication: Schema.optional(
                  Schema.Struct({
                    sasKey: Schema.optional(Schema.String),
                    sasKeyName: Schema.optional(Schema.String),
                    type: Schema.optional(
                      Schema.Literals(["NotSpecified", "SharedAccessKey"]),
                    ),
                  }),
                ),
                brokeredMessageProperties: Schema.optional(
                  Schema.Struct({
                    contentType: Schema.optional(Schema.String),
                    correlationId: Schema.optional(Schema.String),
                    forcePersistence: Schema.optional(Schema.Boolean),
                    label: Schema.optional(Schema.String),
                    messageId: Schema.optional(Schema.String),
                    partitionKey: Schema.optional(Schema.String),
                    replyTo: Schema.optional(Schema.String),
                    replyToSessionId: Schema.optional(Schema.String),
                    scheduledEnqueueTimeUtc: Schema.optional(Schema.String),
                    sessionId: Schema.optional(Schema.String),
                    timeToLive: Schema.optional(Schema.String),
                    to: Schema.optional(Schema.String),
                    viaPartitionKey: Schema.optional(Schema.String),
                  }),
                ),
                customMessageProperties: Schema.optional(
                  Schema.Record(Schema.String, Schema.String),
                ),
                message: Schema.optional(Schema.String),
                namespace: Schema.optional(Schema.String),
                transportType: Schema.optional(
                  Schema.Literals(["NotSpecified", "NetMessaging", "AMQP"]),
                ),
              }),
            ),
            retryPolicy: Schema.optional(
              Schema.Struct({
                retryType: Schema.optional(Schema.Literals(["None", "Fixed"])),
                retryInterval: Schema.optional(Schema.String),
                retryCount: Schema.optional(Schema.Number),
              }),
            ),
            errorAction: Schema.optional(
              Schema.Struct({
                type: Schema.optional(
                  Schema.Literals([
                    "Http",
                    "Https",
                    "StorageQueue",
                    "ServiceBusQueue",
                    "ServiceBusTopic",
                  ]),
                ),
                request: Schema.optional(
                  Schema.Struct({
                    authentication: Schema.optional(
                      Schema.Struct({
                        type: Schema.Literals([
                          "NotSpecified",
                          "ClientCertificate",
                          "ActiveDirectoryOAuth",
                          "Basic",
                        ]),
                      }),
                    ),
                    uri: Schema.optional(Schema.String),
                    method: Schema.optional(Schema.String),
                    body: Schema.optional(Schema.String),
                    headers: Schema.optional(
                      Schema.Record(Schema.String, Schema.String),
                    ),
                  }),
                ),
                queueMessage: Schema.optional(
                  Schema.Struct({
                    storageAccount: Schema.optional(Schema.String),
                    queueName: Schema.optional(Schema.String),
                    sasToken: Schema.optional(Schema.String),
                    message: Schema.optional(Schema.String),
                  }),
                ),
                serviceBusQueueMessage: Schema.optional(
                  Schema.Struct({
                    authentication: Schema.optional(
                      Schema.Struct({
                        sasKey: Schema.optional(Schema.String),
                        sasKeyName: Schema.optional(Schema.String),
                        type: Schema.optional(
                          Schema.Literals(["NotSpecified", "SharedAccessKey"]),
                        ),
                      }),
                    ),
                    brokeredMessageProperties: Schema.optional(
                      Schema.Struct({
                        contentType: Schema.optional(Schema.String),
                        correlationId: Schema.optional(Schema.String),
                        forcePersistence: Schema.optional(Schema.Boolean),
                        label: Schema.optional(Schema.String),
                        messageId: Schema.optional(Schema.String),
                        partitionKey: Schema.optional(Schema.String),
                        replyTo: Schema.optional(Schema.String),
                        replyToSessionId: Schema.optional(Schema.String),
                        scheduledEnqueueTimeUtc: Schema.optional(Schema.String),
                        sessionId: Schema.optional(Schema.String),
                        timeToLive: Schema.optional(Schema.String),
                        to: Schema.optional(Schema.String),
                        viaPartitionKey: Schema.optional(Schema.String),
                      }),
                    ),
                    customMessageProperties: Schema.optional(
                      Schema.Record(Schema.String, Schema.String),
                    ),
                    message: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                    transportType: Schema.optional(
                      Schema.Literals(["NotSpecified", "NetMessaging", "AMQP"]),
                    ),
                  }),
                ),
                serviceBusTopicMessage: Schema.optional(
                  Schema.Struct({
                    authentication: Schema.optional(
                      Schema.Struct({
                        sasKey: Schema.optional(Schema.String),
                        sasKeyName: Schema.optional(Schema.String),
                        type: Schema.optional(
                          Schema.Literals(["NotSpecified", "SharedAccessKey"]),
                        ),
                      }),
                    ),
                    brokeredMessageProperties: Schema.optional(
                      Schema.Struct({
                        contentType: Schema.optional(Schema.String),
                        correlationId: Schema.optional(Schema.String),
                        forcePersistence: Schema.optional(Schema.Boolean),
                        label: Schema.optional(Schema.String),
                        messageId: Schema.optional(Schema.String),
                        partitionKey: Schema.optional(Schema.String),
                        replyTo: Schema.optional(Schema.String),
                        replyToSessionId: Schema.optional(Schema.String),
                        scheduledEnqueueTimeUtc: Schema.optional(Schema.String),
                        sessionId: Schema.optional(Schema.String),
                        timeToLive: Schema.optional(Schema.String),
                        to: Schema.optional(Schema.String),
                        viaPartitionKey: Schema.optional(Schema.String),
                      }),
                    ),
                    customMessageProperties: Schema.optional(
                      Schema.Record(Schema.String, Schema.String),
                    ),
                    message: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                    transportType: Schema.optional(
                      Schema.Literals(["NotSpecified", "NetMessaging", "AMQP"]),
                    ),
                  }),
                ),
                retryPolicy: Schema.optional(
                  Schema.Struct({
                    retryType: Schema.optional(
                      Schema.Literals(["None", "Fixed"]),
                    ),
                    retryInterval: Schema.optional(Schema.String),
                    retryCount: Schema.optional(Schema.Number),
                  }),
                ),
              }),
            ),
          }),
        ),
        recurrence: Schema.optional(
          Schema.Struct({
            frequency: Schema.optional(
              Schema.Literals(["Minute", "Hour", "Day", "Week", "Month"]),
            ),
            interval: Schema.optional(Schema.Number),
            count: Schema.optional(Schema.Number),
            endTime: Schema.optional(Schema.String),
            schedule: Schema.optional(
              Schema.Struct({
                weekDays: Schema.optional(
                  Schema.Array(
                    Schema.Literals([
                      "Sunday",
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                    ]),
                  ),
                ),
                hours: Schema.optional(Schema.Array(Schema.Number)),
                minutes: Schema.optional(Schema.Array(Schema.Number)),
                monthDays: Schema.optional(Schema.Array(Schema.Number)),
                monthlyOccurrences: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      day: Schema.optional(
                        Schema.Literals([
                          "Monday",
                          "Tuesday",
                          "Wednesday",
                          "Thursday",
                          "Friday",
                          "Saturday",
                          "Sunday",
                        ]),
                      ),
                      Occurrence: Schema.optional(Schema.Number),
                    }),
                  ),
                ),
              }),
            ),
          }),
        ),
        state: Schema.optional(
          Schema.Literals(["Enabled", "Disabled", "Faulted", "Completed"]),
        ),
        status: Schema.optional(
          Schema.Struct({
            executionCount: Schema.optional(Schema.Number),
            failureCount: Schema.optional(Schema.Number),
            faultedCount: Schema.optional(Schema.Number),
            lastExecutionTime: Schema.optional(Schema.String),
            nextExecutionTime: Schema.optional(Schema.String),
          }),
        ),
      }),
    ),
  });
export type JobsCreateOrUpdateOutput = typeof JobsCreateOrUpdateOutput.Type;

// The operation
/**
 * Provisions a new job or updates an existing job.
 *
 * @param resourceGroupName - The resource group name.
 * @param jobCollectionName - The job collection name.
 * @param jobName - The job name.
 */
export const JobsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobsCreateOrUpdateInput,
  outputSchema: JobsCreateOrUpdateOutput,
}));
// Input Schema
export const JobsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  jobCollectionName: Schema.String.pipe(T.PathParam()),
  jobName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Scheduler/jobCollections/{jobCollectionName}/jobs/{jobName}",
  }),
);
export type JobsDeleteInput = typeof JobsDeleteInput.Type;

// Output Schema
export const JobsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type JobsDeleteOutput = typeof JobsDeleteOutput.Type;

// The operation
/**
 * Deletes a job.
 *
 * @param resourceGroupName - The resource group name.
 * @param jobCollectionName - The job collection name.
 * @param jobName - The job name.
 */
export const JobsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobsDeleteInput,
  outputSchema: JobsDeleteOutput,
}));
// Input Schema
export const JobsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  jobCollectionName: Schema.String.pipe(T.PathParam()),
  jobName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Scheduler/jobCollections/{jobCollectionName}/jobs/{jobName}",
  }),
);
export type JobsGetInput = typeof JobsGetInput.Type;

// Output Schema
export const JobsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  properties: Schema.optional(
    Schema.Struct({
      startTime: Schema.optional(Schema.String),
      action: Schema.optional(
        Schema.Struct({
          type: Schema.optional(
            Schema.Literals([
              "Http",
              "Https",
              "StorageQueue",
              "ServiceBusQueue",
              "ServiceBusTopic",
            ]),
          ),
          request: Schema.optional(
            Schema.Struct({
              authentication: Schema.optional(
                Schema.Struct({
                  type: Schema.Literals([
                    "NotSpecified",
                    "ClientCertificate",
                    "ActiveDirectoryOAuth",
                    "Basic",
                  ]),
                }),
              ),
              uri: Schema.optional(Schema.String),
              method: Schema.optional(Schema.String),
              body: Schema.optional(Schema.String),
              headers: Schema.optional(
                Schema.Record(Schema.String, Schema.String),
              ),
            }),
          ),
          queueMessage: Schema.optional(
            Schema.Struct({
              storageAccount: Schema.optional(Schema.String),
              queueName: Schema.optional(Schema.String),
              sasToken: Schema.optional(Schema.String),
              message: Schema.optional(Schema.String),
            }),
          ),
          serviceBusQueueMessage: Schema.optional(
            Schema.Struct({
              authentication: Schema.optional(
                Schema.Struct({
                  sasKey: Schema.optional(Schema.String),
                  sasKeyName: Schema.optional(Schema.String),
                  type: Schema.optional(
                    Schema.Literals(["NotSpecified", "SharedAccessKey"]),
                  ),
                }),
              ),
              brokeredMessageProperties: Schema.optional(
                Schema.Struct({
                  contentType: Schema.optional(Schema.String),
                  correlationId: Schema.optional(Schema.String),
                  forcePersistence: Schema.optional(Schema.Boolean),
                  label: Schema.optional(Schema.String),
                  messageId: Schema.optional(Schema.String),
                  partitionKey: Schema.optional(Schema.String),
                  replyTo: Schema.optional(Schema.String),
                  replyToSessionId: Schema.optional(Schema.String),
                  scheduledEnqueueTimeUtc: Schema.optional(Schema.String),
                  sessionId: Schema.optional(Schema.String),
                  timeToLive: Schema.optional(Schema.String),
                  to: Schema.optional(Schema.String),
                  viaPartitionKey: Schema.optional(Schema.String),
                }),
              ),
              customMessageProperties: Schema.optional(
                Schema.Record(Schema.String, Schema.String),
              ),
              message: Schema.optional(Schema.String),
              namespace: Schema.optional(Schema.String),
              transportType: Schema.optional(
                Schema.Literals(["NotSpecified", "NetMessaging", "AMQP"]),
              ),
            }),
          ),
          serviceBusTopicMessage: Schema.optional(
            Schema.Struct({
              authentication: Schema.optional(
                Schema.Struct({
                  sasKey: Schema.optional(Schema.String),
                  sasKeyName: Schema.optional(Schema.String),
                  type: Schema.optional(
                    Schema.Literals(["NotSpecified", "SharedAccessKey"]),
                  ),
                }),
              ),
              brokeredMessageProperties: Schema.optional(
                Schema.Struct({
                  contentType: Schema.optional(Schema.String),
                  correlationId: Schema.optional(Schema.String),
                  forcePersistence: Schema.optional(Schema.Boolean),
                  label: Schema.optional(Schema.String),
                  messageId: Schema.optional(Schema.String),
                  partitionKey: Schema.optional(Schema.String),
                  replyTo: Schema.optional(Schema.String),
                  replyToSessionId: Schema.optional(Schema.String),
                  scheduledEnqueueTimeUtc: Schema.optional(Schema.String),
                  sessionId: Schema.optional(Schema.String),
                  timeToLive: Schema.optional(Schema.String),
                  to: Schema.optional(Schema.String),
                  viaPartitionKey: Schema.optional(Schema.String),
                }),
              ),
              customMessageProperties: Schema.optional(
                Schema.Record(Schema.String, Schema.String),
              ),
              message: Schema.optional(Schema.String),
              namespace: Schema.optional(Schema.String),
              transportType: Schema.optional(
                Schema.Literals(["NotSpecified", "NetMessaging", "AMQP"]),
              ),
            }),
          ),
          retryPolicy: Schema.optional(
            Schema.Struct({
              retryType: Schema.optional(Schema.Literals(["None", "Fixed"])),
              retryInterval: Schema.optional(Schema.String),
              retryCount: Schema.optional(Schema.Number),
            }),
          ),
          errorAction: Schema.optional(
            Schema.Struct({
              type: Schema.optional(
                Schema.Literals([
                  "Http",
                  "Https",
                  "StorageQueue",
                  "ServiceBusQueue",
                  "ServiceBusTopic",
                ]),
              ),
              request: Schema.optional(
                Schema.Struct({
                  authentication: Schema.optional(
                    Schema.Struct({
                      type: Schema.Literals([
                        "NotSpecified",
                        "ClientCertificate",
                        "ActiveDirectoryOAuth",
                        "Basic",
                      ]),
                    }),
                  ),
                  uri: Schema.optional(Schema.String),
                  method: Schema.optional(Schema.String),
                  body: Schema.optional(Schema.String),
                  headers: Schema.optional(
                    Schema.Record(Schema.String, Schema.String),
                  ),
                }),
              ),
              queueMessage: Schema.optional(
                Schema.Struct({
                  storageAccount: Schema.optional(Schema.String),
                  queueName: Schema.optional(Schema.String),
                  sasToken: Schema.optional(Schema.String),
                  message: Schema.optional(Schema.String),
                }),
              ),
              serviceBusQueueMessage: Schema.optional(
                Schema.Struct({
                  authentication: Schema.optional(
                    Schema.Struct({
                      sasKey: Schema.optional(Schema.String),
                      sasKeyName: Schema.optional(Schema.String),
                      type: Schema.optional(
                        Schema.Literals(["NotSpecified", "SharedAccessKey"]),
                      ),
                    }),
                  ),
                  brokeredMessageProperties: Schema.optional(
                    Schema.Struct({
                      contentType: Schema.optional(Schema.String),
                      correlationId: Schema.optional(Schema.String),
                      forcePersistence: Schema.optional(Schema.Boolean),
                      label: Schema.optional(Schema.String),
                      messageId: Schema.optional(Schema.String),
                      partitionKey: Schema.optional(Schema.String),
                      replyTo: Schema.optional(Schema.String),
                      replyToSessionId: Schema.optional(Schema.String),
                      scheduledEnqueueTimeUtc: Schema.optional(Schema.String),
                      sessionId: Schema.optional(Schema.String),
                      timeToLive: Schema.optional(Schema.String),
                      to: Schema.optional(Schema.String),
                      viaPartitionKey: Schema.optional(Schema.String),
                    }),
                  ),
                  customMessageProperties: Schema.optional(
                    Schema.Record(Schema.String, Schema.String),
                  ),
                  message: Schema.optional(Schema.String),
                  namespace: Schema.optional(Schema.String),
                  transportType: Schema.optional(
                    Schema.Literals(["NotSpecified", "NetMessaging", "AMQP"]),
                  ),
                }),
              ),
              serviceBusTopicMessage: Schema.optional(
                Schema.Struct({
                  authentication: Schema.optional(
                    Schema.Struct({
                      sasKey: Schema.optional(Schema.String),
                      sasKeyName: Schema.optional(Schema.String),
                      type: Schema.optional(
                        Schema.Literals(["NotSpecified", "SharedAccessKey"]),
                      ),
                    }),
                  ),
                  brokeredMessageProperties: Schema.optional(
                    Schema.Struct({
                      contentType: Schema.optional(Schema.String),
                      correlationId: Schema.optional(Schema.String),
                      forcePersistence: Schema.optional(Schema.Boolean),
                      label: Schema.optional(Schema.String),
                      messageId: Schema.optional(Schema.String),
                      partitionKey: Schema.optional(Schema.String),
                      replyTo: Schema.optional(Schema.String),
                      replyToSessionId: Schema.optional(Schema.String),
                      scheduledEnqueueTimeUtc: Schema.optional(Schema.String),
                      sessionId: Schema.optional(Schema.String),
                      timeToLive: Schema.optional(Schema.String),
                      to: Schema.optional(Schema.String),
                      viaPartitionKey: Schema.optional(Schema.String),
                    }),
                  ),
                  customMessageProperties: Schema.optional(
                    Schema.Record(Schema.String, Schema.String),
                  ),
                  message: Schema.optional(Schema.String),
                  namespace: Schema.optional(Schema.String),
                  transportType: Schema.optional(
                    Schema.Literals(["NotSpecified", "NetMessaging", "AMQP"]),
                  ),
                }),
              ),
              retryPolicy: Schema.optional(
                Schema.Struct({
                  retryType: Schema.optional(
                    Schema.Literals(["None", "Fixed"]),
                  ),
                  retryInterval: Schema.optional(Schema.String),
                  retryCount: Schema.optional(Schema.Number),
                }),
              ),
            }),
          ),
        }),
      ),
      recurrence: Schema.optional(
        Schema.Struct({
          frequency: Schema.optional(
            Schema.Literals(["Minute", "Hour", "Day", "Week", "Month"]),
          ),
          interval: Schema.optional(Schema.Number),
          count: Schema.optional(Schema.Number),
          endTime: Schema.optional(Schema.String),
          schedule: Schema.optional(
            Schema.Struct({
              weekDays: Schema.optional(
                Schema.Array(
                  Schema.Literals([
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ]),
                ),
              ),
              hours: Schema.optional(Schema.Array(Schema.Number)),
              minutes: Schema.optional(Schema.Array(Schema.Number)),
              monthDays: Schema.optional(Schema.Array(Schema.Number)),
              monthlyOccurrences: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    day: Schema.optional(
                      Schema.Literals([
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                        "Sunday",
                      ]),
                    ),
                    Occurrence: Schema.optional(Schema.Number),
                  }),
                ),
              ),
            }),
          ),
        }),
      ),
      state: Schema.optional(
        Schema.Literals(["Enabled", "Disabled", "Faulted", "Completed"]),
      ),
      status: Schema.optional(
        Schema.Struct({
          executionCount: Schema.optional(Schema.Number),
          failureCount: Schema.optional(Schema.Number),
          faultedCount: Schema.optional(Schema.Number),
          lastExecutionTime: Schema.optional(Schema.String),
          nextExecutionTime: Schema.optional(Schema.String),
        }),
      ),
    }),
  ),
});
export type JobsGetOutput = typeof JobsGetOutput.Type;

// The operation
/**
 * Gets a job.
 *
 * @param resourceGroupName - The resource group name.
 * @param jobCollectionName - The job collection name.
 * @param jobName - The job name.
 */
export const JobsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobsGetInput,
  outputSchema: JobsGetOutput,
}));
// Input Schema
export const JobsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  jobCollectionName: Schema.String.pipe(T.PathParam()),
  $top: Schema.optional(Schema.Number),
  $skip: Schema.optional(Schema.Number),
  $filter: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Scheduler/jobCollections/{jobCollectionName}/jobs",
  }),
);
export type JobsListInput = typeof JobsListInput.Type;

// Output Schema
export const JobsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        properties: Schema.optional(
          Schema.Struct({
            startTime: Schema.optional(Schema.String),
            action: Schema.optional(
              Schema.Struct({
                type: Schema.optional(
                  Schema.Literals([
                    "Http",
                    "Https",
                    "StorageQueue",
                    "ServiceBusQueue",
                    "ServiceBusTopic",
                  ]),
                ),
                request: Schema.optional(
                  Schema.Struct({
                    authentication: Schema.optional(
                      Schema.Struct({
                        type: Schema.Literals([
                          "NotSpecified",
                          "ClientCertificate",
                          "ActiveDirectoryOAuth",
                          "Basic",
                        ]),
                      }),
                    ),
                    uri: Schema.optional(Schema.String),
                    method: Schema.optional(Schema.String),
                    body: Schema.optional(Schema.String),
                    headers: Schema.optional(
                      Schema.Record(Schema.String, Schema.String),
                    ),
                  }),
                ),
                queueMessage: Schema.optional(
                  Schema.Struct({
                    storageAccount: Schema.optional(Schema.String),
                    queueName: Schema.optional(Schema.String),
                    sasToken: Schema.optional(Schema.String),
                    message: Schema.optional(Schema.String),
                  }),
                ),
                serviceBusQueueMessage: Schema.optional(
                  Schema.Struct({
                    authentication: Schema.optional(
                      Schema.Struct({
                        sasKey: Schema.optional(Schema.String),
                        sasKeyName: Schema.optional(Schema.String),
                        type: Schema.optional(
                          Schema.Literals(["NotSpecified", "SharedAccessKey"]),
                        ),
                      }),
                    ),
                    brokeredMessageProperties: Schema.optional(
                      Schema.Struct({
                        contentType: Schema.optional(Schema.String),
                        correlationId: Schema.optional(Schema.String),
                        forcePersistence: Schema.optional(Schema.Boolean),
                        label: Schema.optional(Schema.String),
                        messageId: Schema.optional(Schema.String),
                        partitionKey: Schema.optional(Schema.String),
                        replyTo: Schema.optional(Schema.String),
                        replyToSessionId: Schema.optional(Schema.String),
                        scheduledEnqueueTimeUtc: Schema.optional(Schema.String),
                        sessionId: Schema.optional(Schema.String),
                        timeToLive: Schema.optional(Schema.String),
                        to: Schema.optional(Schema.String),
                        viaPartitionKey: Schema.optional(Schema.String),
                      }),
                    ),
                    customMessageProperties: Schema.optional(
                      Schema.Record(Schema.String, Schema.String),
                    ),
                    message: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                    transportType: Schema.optional(
                      Schema.Literals(["NotSpecified", "NetMessaging", "AMQP"]),
                    ),
                  }),
                ),
                serviceBusTopicMessage: Schema.optional(
                  Schema.Struct({
                    authentication: Schema.optional(
                      Schema.Struct({
                        sasKey: Schema.optional(Schema.String),
                        sasKeyName: Schema.optional(Schema.String),
                        type: Schema.optional(
                          Schema.Literals(["NotSpecified", "SharedAccessKey"]),
                        ),
                      }),
                    ),
                    brokeredMessageProperties: Schema.optional(
                      Schema.Struct({
                        contentType: Schema.optional(Schema.String),
                        correlationId: Schema.optional(Schema.String),
                        forcePersistence: Schema.optional(Schema.Boolean),
                        label: Schema.optional(Schema.String),
                        messageId: Schema.optional(Schema.String),
                        partitionKey: Schema.optional(Schema.String),
                        replyTo: Schema.optional(Schema.String),
                        replyToSessionId: Schema.optional(Schema.String),
                        scheduledEnqueueTimeUtc: Schema.optional(Schema.String),
                        sessionId: Schema.optional(Schema.String),
                        timeToLive: Schema.optional(Schema.String),
                        to: Schema.optional(Schema.String),
                        viaPartitionKey: Schema.optional(Schema.String),
                      }),
                    ),
                    customMessageProperties: Schema.optional(
                      Schema.Record(Schema.String, Schema.String),
                    ),
                    message: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                    transportType: Schema.optional(
                      Schema.Literals(["NotSpecified", "NetMessaging", "AMQP"]),
                    ),
                  }),
                ),
                retryPolicy: Schema.optional(
                  Schema.Struct({
                    retryType: Schema.optional(
                      Schema.Literals(["None", "Fixed"]),
                    ),
                    retryInterval: Schema.optional(Schema.String),
                    retryCount: Schema.optional(Schema.Number),
                  }),
                ),
                errorAction: Schema.optional(
                  Schema.Struct({
                    type: Schema.optional(
                      Schema.Literals([
                        "Http",
                        "Https",
                        "StorageQueue",
                        "ServiceBusQueue",
                        "ServiceBusTopic",
                      ]),
                    ),
                    request: Schema.optional(
                      Schema.Struct({
                        authentication: Schema.optional(
                          Schema.Struct({
                            type: Schema.Literals([
                              "NotSpecified",
                              "ClientCertificate",
                              "ActiveDirectoryOAuth",
                              "Basic",
                            ]),
                          }),
                        ),
                        uri: Schema.optional(Schema.String),
                        method: Schema.optional(Schema.String),
                        body: Schema.optional(Schema.String),
                        headers: Schema.optional(
                          Schema.Record(Schema.String, Schema.String),
                        ),
                      }),
                    ),
                    queueMessage: Schema.optional(
                      Schema.Struct({
                        storageAccount: Schema.optional(Schema.String),
                        queueName: Schema.optional(Schema.String),
                        sasToken: Schema.optional(Schema.String),
                        message: Schema.optional(Schema.String),
                      }),
                    ),
                    serviceBusQueueMessage: Schema.optional(
                      Schema.Struct({
                        authentication: Schema.optional(
                          Schema.Struct({
                            sasKey: Schema.optional(Schema.String),
                            sasKeyName: Schema.optional(Schema.String),
                            type: Schema.optional(
                              Schema.Literals([
                                "NotSpecified",
                                "SharedAccessKey",
                              ]),
                            ),
                          }),
                        ),
                        brokeredMessageProperties: Schema.optional(
                          Schema.Struct({
                            contentType: Schema.optional(Schema.String),
                            correlationId: Schema.optional(Schema.String),
                            forcePersistence: Schema.optional(Schema.Boolean),
                            label: Schema.optional(Schema.String),
                            messageId: Schema.optional(Schema.String),
                            partitionKey: Schema.optional(Schema.String),
                            replyTo: Schema.optional(Schema.String),
                            replyToSessionId: Schema.optional(Schema.String),
                            scheduledEnqueueTimeUtc: Schema.optional(
                              Schema.String,
                            ),
                            sessionId: Schema.optional(Schema.String),
                            timeToLive: Schema.optional(Schema.String),
                            to: Schema.optional(Schema.String),
                            viaPartitionKey: Schema.optional(Schema.String),
                          }),
                        ),
                        customMessageProperties: Schema.optional(
                          Schema.Record(Schema.String, Schema.String),
                        ),
                        message: Schema.optional(Schema.String),
                        namespace: Schema.optional(Schema.String),
                        transportType: Schema.optional(
                          Schema.Literals([
                            "NotSpecified",
                            "NetMessaging",
                            "AMQP",
                          ]),
                        ),
                      }),
                    ),
                    serviceBusTopicMessage: Schema.optional(
                      Schema.Struct({
                        authentication: Schema.optional(
                          Schema.Struct({
                            sasKey: Schema.optional(Schema.String),
                            sasKeyName: Schema.optional(Schema.String),
                            type: Schema.optional(
                              Schema.Literals([
                                "NotSpecified",
                                "SharedAccessKey",
                              ]),
                            ),
                          }),
                        ),
                        brokeredMessageProperties: Schema.optional(
                          Schema.Struct({
                            contentType: Schema.optional(Schema.String),
                            correlationId: Schema.optional(Schema.String),
                            forcePersistence: Schema.optional(Schema.Boolean),
                            label: Schema.optional(Schema.String),
                            messageId: Schema.optional(Schema.String),
                            partitionKey: Schema.optional(Schema.String),
                            replyTo: Schema.optional(Schema.String),
                            replyToSessionId: Schema.optional(Schema.String),
                            scheduledEnqueueTimeUtc: Schema.optional(
                              Schema.String,
                            ),
                            sessionId: Schema.optional(Schema.String),
                            timeToLive: Schema.optional(Schema.String),
                            to: Schema.optional(Schema.String),
                            viaPartitionKey: Schema.optional(Schema.String),
                          }),
                        ),
                        customMessageProperties: Schema.optional(
                          Schema.Record(Schema.String, Schema.String),
                        ),
                        message: Schema.optional(Schema.String),
                        namespace: Schema.optional(Schema.String),
                        transportType: Schema.optional(
                          Schema.Literals([
                            "NotSpecified",
                            "NetMessaging",
                            "AMQP",
                          ]),
                        ),
                      }),
                    ),
                    retryPolicy: Schema.optional(
                      Schema.Struct({
                        retryType: Schema.optional(
                          Schema.Literals(["None", "Fixed"]),
                        ),
                        retryInterval: Schema.optional(Schema.String),
                        retryCount: Schema.optional(Schema.Number),
                      }),
                    ),
                  }),
                ),
              }),
            ),
            recurrence: Schema.optional(
              Schema.Struct({
                frequency: Schema.optional(
                  Schema.Literals(["Minute", "Hour", "Day", "Week", "Month"]),
                ),
                interval: Schema.optional(Schema.Number),
                count: Schema.optional(Schema.Number),
                endTime: Schema.optional(Schema.String),
                schedule: Schema.optional(
                  Schema.Struct({
                    weekDays: Schema.optional(
                      Schema.Array(
                        Schema.Literals([
                          "Sunday",
                          "Monday",
                          "Tuesday",
                          "Wednesday",
                          "Thursday",
                          "Friday",
                          "Saturday",
                        ]),
                      ),
                    ),
                    hours: Schema.optional(Schema.Array(Schema.Number)),
                    minutes: Schema.optional(Schema.Array(Schema.Number)),
                    monthDays: Schema.optional(Schema.Array(Schema.Number)),
                    monthlyOccurrences: Schema.optional(
                      Schema.Array(
                        Schema.Struct({
                          day: Schema.optional(
                            Schema.Literals([
                              "Monday",
                              "Tuesday",
                              "Wednesday",
                              "Thursday",
                              "Friday",
                              "Saturday",
                              "Sunday",
                            ]),
                          ),
                          Occurrence: Schema.optional(Schema.Number),
                        }),
                      ),
                    ),
                  }),
                ),
              }),
            ),
            state: Schema.optional(
              Schema.Literals(["Enabled", "Disabled", "Faulted", "Completed"]),
            ),
            status: Schema.optional(
              Schema.Struct({
                executionCount: Schema.optional(Schema.Number),
                failureCount: Schema.optional(Schema.Number),
                faultedCount: Schema.optional(Schema.Number),
                lastExecutionTime: Schema.optional(Schema.String),
                nextExecutionTime: Schema.optional(Schema.String),
              }),
            ),
          }),
        ),
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type JobsListOutput = typeof JobsListOutput.Type;

// The operation
/**
 * Lists all jobs under the specified job collection.
 *
 * @param resourceGroupName - The resource group name.
 * @param jobCollectionName - The job collection name.
 * @param $top - The number of jobs to request, in the of range of [1..100].
 * @param $skip - The (0-based) index of the job history list from which to begin requesting entries.
 * @param $filter - The filter to apply on the job state.
 */
export const JobsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobsListInput,
  outputSchema: JobsListOutput,
}));
// Input Schema
export const JobsListJobHistoryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobCollectionName: Schema.String.pipe(T.PathParam()),
    jobName: Schema.String.pipe(T.PathParam()),
    $top: Schema.optional(Schema.Number),
    $skip: Schema.optional(Schema.Number),
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Scheduler/jobCollections/{jobCollectionName}/jobs/{jobName}/history",
    }),
  );
export type JobsListJobHistoryInput = typeof JobsListJobHistoryInput.Type;

// Output Schema
export const JobsListJobHistoryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              startTime: Schema.optional(Schema.String),
              endTime: Schema.optional(Schema.String),
              expectedExecutionTime: Schema.optional(Schema.String),
              actionName: Schema.optional(
                Schema.Literals(["MainAction", "ErrorAction"]),
              ),
              status: Schema.optional(
                Schema.Literals(["Completed", "Failed", "Postponed"]),
              ),
              message: Schema.optional(Schema.String),
              retryCount: Schema.optional(Schema.Number),
              repeatCount: Schema.optional(Schema.Number),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type JobsListJobHistoryOutput = typeof JobsListJobHistoryOutput.Type;

// The operation
/**
 * Lists job history.
 *
 * @param resourceGroupName - The resource group name.
 * @param jobCollectionName - The job collection name.
 * @param jobName - The job name.
 * @param $top - the number of job history to request, in the of range of [1..100].
 * @param $skip - The (0-based) index of the job history list from which to begin requesting entries.
 * @param $filter - The filter to apply on the job state.
 */
export const JobsListJobHistory = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobsListJobHistoryInput,
  outputSchema: JobsListJobHistoryOutput,
}));
// Input Schema
export const JobsPatchInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  jobCollectionName: Schema.String.pipe(T.PathParam()),
  jobName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Scheduler/jobCollections/{jobCollectionName}/jobs/{jobName}",
  }),
);
export type JobsPatchInput = typeof JobsPatchInput.Type;

// Output Schema
export const JobsPatchOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  properties: Schema.optional(
    Schema.Struct({
      startTime: Schema.optional(Schema.String),
      action: Schema.optional(
        Schema.Struct({
          type: Schema.optional(
            Schema.Literals([
              "Http",
              "Https",
              "StorageQueue",
              "ServiceBusQueue",
              "ServiceBusTopic",
            ]),
          ),
          request: Schema.optional(
            Schema.Struct({
              authentication: Schema.optional(
                Schema.Struct({
                  type: Schema.Literals([
                    "NotSpecified",
                    "ClientCertificate",
                    "ActiveDirectoryOAuth",
                    "Basic",
                  ]),
                }),
              ),
              uri: Schema.optional(Schema.String),
              method: Schema.optional(Schema.String),
              body: Schema.optional(Schema.String),
              headers: Schema.optional(
                Schema.Record(Schema.String, Schema.String),
              ),
            }),
          ),
          queueMessage: Schema.optional(
            Schema.Struct({
              storageAccount: Schema.optional(Schema.String),
              queueName: Schema.optional(Schema.String),
              sasToken: Schema.optional(Schema.String),
              message: Schema.optional(Schema.String),
            }),
          ),
          serviceBusQueueMessage: Schema.optional(
            Schema.Struct({
              authentication: Schema.optional(
                Schema.Struct({
                  sasKey: Schema.optional(Schema.String),
                  sasKeyName: Schema.optional(Schema.String),
                  type: Schema.optional(
                    Schema.Literals(["NotSpecified", "SharedAccessKey"]),
                  ),
                }),
              ),
              brokeredMessageProperties: Schema.optional(
                Schema.Struct({
                  contentType: Schema.optional(Schema.String),
                  correlationId: Schema.optional(Schema.String),
                  forcePersistence: Schema.optional(Schema.Boolean),
                  label: Schema.optional(Schema.String),
                  messageId: Schema.optional(Schema.String),
                  partitionKey: Schema.optional(Schema.String),
                  replyTo: Schema.optional(Schema.String),
                  replyToSessionId: Schema.optional(Schema.String),
                  scheduledEnqueueTimeUtc: Schema.optional(Schema.String),
                  sessionId: Schema.optional(Schema.String),
                  timeToLive: Schema.optional(Schema.String),
                  to: Schema.optional(Schema.String),
                  viaPartitionKey: Schema.optional(Schema.String),
                }),
              ),
              customMessageProperties: Schema.optional(
                Schema.Record(Schema.String, Schema.String),
              ),
              message: Schema.optional(Schema.String),
              namespace: Schema.optional(Schema.String),
              transportType: Schema.optional(
                Schema.Literals(["NotSpecified", "NetMessaging", "AMQP"]),
              ),
            }),
          ),
          serviceBusTopicMessage: Schema.optional(
            Schema.Struct({
              authentication: Schema.optional(
                Schema.Struct({
                  sasKey: Schema.optional(Schema.String),
                  sasKeyName: Schema.optional(Schema.String),
                  type: Schema.optional(
                    Schema.Literals(["NotSpecified", "SharedAccessKey"]),
                  ),
                }),
              ),
              brokeredMessageProperties: Schema.optional(
                Schema.Struct({
                  contentType: Schema.optional(Schema.String),
                  correlationId: Schema.optional(Schema.String),
                  forcePersistence: Schema.optional(Schema.Boolean),
                  label: Schema.optional(Schema.String),
                  messageId: Schema.optional(Schema.String),
                  partitionKey: Schema.optional(Schema.String),
                  replyTo: Schema.optional(Schema.String),
                  replyToSessionId: Schema.optional(Schema.String),
                  scheduledEnqueueTimeUtc: Schema.optional(Schema.String),
                  sessionId: Schema.optional(Schema.String),
                  timeToLive: Schema.optional(Schema.String),
                  to: Schema.optional(Schema.String),
                  viaPartitionKey: Schema.optional(Schema.String),
                }),
              ),
              customMessageProperties: Schema.optional(
                Schema.Record(Schema.String, Schema.String),
              ),
              message: Schema.optional(Schema.String),
              namespace: Schema.optional(Schema.String),
              transportType: Schema.optional(
                Schema.Literals(["NotSpecified", "NetMessaging", "AMQP"]),
              ),
            }),
          ),
          retryPolicy: Schema.optional(
            Schema.Struct({
              retryType: Schema.optional(Schema.Literals(["None", "Fixed"])),
              retryInterval: Schema.optional(Schema.String),
              retryCount: Schema.optional(Schema.Number),
            }),
          ),
          errorAction: Schema.optional(
            Schema.Struct({
              type: Schema.optional(
                Schema.Literals([
                  "Http",
                  "Https",
                  "StorageQueue",
                  "ServiceBusQueue",
                  "ServiceBusTopic",
                ]),
              ),
              request: Schema.optional(
                Schema.Struct({
                  authentication: Schema.optional(
                    Schema.Struct({
                      type: Schema.Literals([
                        "NotSpecified",
                        "ClientCertificate",
                        "ActiveDirectoryOAuth",
                        "Basic",
                      ]),
                    }),
                  ),
                  uri: Schema.optional(Schema.String),
                  method: Schema.optional(Schema.String),
                  body: Schema.optional(Schema.String),
                  headers: Schema.optional(
                    Schema.Record(Schema.String, Schema.String),
                  ),
                }),
              ),
              queueMessage: Schema.optional(
                Schema.Struct({
                  storageAccount: Schema.optional(Schema.String),
                  queueName: Schema.optional(Schema.String),
                  sasToken: Schema.optional(Schema.String),
                  message: Schema.optional(Schema.String),
                }),
              ),
              serviceBusQueueMessage: Schema.optional(
                Schema.Struct({
                  authentication: Schema.optional(
                    Schema.Struct({
                      sasKey: Schema.optional(Schema.String),
                      sasKeyName: Schema.optional(Schema.String),
                      type: Schema.optional(
                        Schema.Literals(["NotSpecified", "SharedAccessKey"]),
                      ),
                    }),
                  ),
                  brokeredMessageProperties: Schema.optional(
                    Schema.Struct({
                      contentType: Schema.optional(Schema.String),
                      correlationId: Schema.optional(Schema.String),
                      forcePersistence: Schema.optional(Schema.Boolean),
                      label: Schema.optional(Schema.String),
                      messageId: Schema.optional(Schema.String),
                      partitionKey: Schema.optional(Schema.String),
                      replyTo: Schema.optional(Schema.String),
                      replyToSessionId: Schema.optional(Schema.String),
                      scheduledEnqueueTimeUtc: Schema.optional(Schema.String),
                      sessionId: Schema.optional(Schema.String),
                      timeToLive: Schema.optional(Schema.String),
                      to: Schema.optional(Schema.String),
                      viaPartitionKey: Schema.optional(Schema.String),
                    }),
                  ),
                  customMessageProperties: Schema.optional(
                    Schema.Record(Schema.String, Schema.String),
                  ),
                  message: Schema.optional(Schema.String),
                  namespace: Schema.optional(Schema.String),
                  transportType: Schema.optional(
                    Schema.Literals(["NotSpecified", "NetMessaging", "AMQP"]),
                  ),
                }),
              ),
              serviceBusTopicMessage: Schema.optional(
                Schema.Struct({
                  authentication: Schema.optional(
                    Schema.Struct({
                      sasKey: Schema.optional(Schema.String),
                      sasKeyName: Schema.optional(Schema.String),
                      type: Schema.optional(
                        Schema.Literals(["NotSpecified", "SharedAccessKey"]),
                      ),
                    }),
                  ),
                  brokeredMessageProperties: Schema.optional(
                    Schema.Struct({
                      contentType: Schema.optional(Schema.String),
                      correlationId: Schema.optional(Schema.String),
                      forcePersistence: Schema.optional(Schema.Boolean),
                      label: Schema.optional(Schema.String),
                      messageId: Schema.optional(Schema.String),
                      partitionKey: Schema.optional(Schema.String),
                      replyTo: Schema.optional(Schema.String),
                      replyToSessionId: Schema.optional(Schema.String),
                      scheduledEnqueueTimeUtc: Schema.optional(Schema.String),
                      sessionId: Schema.optional(Schema.String),
                      timeToLive: Schema.optional(Schema.String),
                      to: Schema.optional(Schema.String),
                      viaPartitionKey: Schema.optional(Schema.String),
                    }),
                  ),
                  customMessageProperties: Schema.optional(
                    Schema.Record(Schema.String, Schema.String),
                  ),
                  message: Schema.optional(Schema.String),
                  namespace: Schema.optional(Schema.String),
                  transportType: Schema.optional(
                    Schema.Literals(["NotSpecified", "NetMessaging", "AMQP"]),
                  ),
                }),
              ),
              retryPolicy: Schema.optional(
                Schema.Struct({
                  retryType: Schema.optional(
                    Schema.Literals(["None", "Fixed"]),
                  ),
                  retryInterval: Schema.optional(Schema.String),
                  retryCount: Schema.optional(Schema.Number),
                }),
              ),
            }),
          ),
        }),
      ),
      recurrence: Schema.optional(
        Schema.Struct({
          frequency: Schema.optional(
            Schema.Literals(["Minute", "Hour", "Day", "Week", "Month"]),
          ),
          interval: Schema.optional(Schema.Number),
          count: Schema.optional(Schema.Number),
          endTime: Schema.optional(Schema.String),
          schedule: Schema.optional(
            Schema.Struct({
              weekDays: Schema.optional(
                Schema.Array(
                  Schema.Literals([
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ]),
                ),
              ),
              hours: Schema.optional(Schema.Array(Schema.Number)),
              minutes: Schema.optional(Schema.Array(Schema.Number)),
              monthDays: Schema.optional(Schema.Array(Schema.Number)),
              monthlyOccurrences: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    day: Schema.optional(
                      Schema.Literals([
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                        "Sunday",
                      ]),
                    ),
                    Occurrence: Schema.optional(Schema.Number),
                  }),
                ),
              ),
            }),
          ),
        }),
      ),
      state: Schema.optional(
        Schema.Literals(["Enabled", "Disabled", "Faulted", "Completed"]),
      ),
      status: Schema.optional(
        Schema.Struct({
          executionCount: Schema.optional(Schema.Number),
          failureCount: Schema.optional(Schema.Number),
          faultedCount: Schema.optional(Schema.Number),
          lastExecutionTime: Schema.optional(Schema.String),
          nextExecutionTime: Schema.optional(Schema.String),
        }),
      ),
    }),
  ),
});
export type JobsPatchOutput = typeof JobsPatchOutput.Type;

// The operation
/**
 * Patches an existing job.
 *
 * @param resourceGroupName - The resource group name.
 * @param jobCollectionName - The job collection name.
 * @param jobName - The job name.
 */
export const JobsPatch = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobsPatchInput,
  outputSchema: JobsPatchOutput,
}));
// Input Schema
export const JobsRunInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  jobCollectionName: Schema.String.pipe(T.PathParam()),
  jobName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Scheduler/jobCollections/{jobCollectionName}/jobs/{jobName}/run",
  }),
);
export type JobsRunInput = typeof JobsRunInput.Type;

// Output Schema
export const JobsRunOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type JobsRunOutput = typeof JobsRunOutput.Type;

// The operation
/**
 * Runs a job.
 *
 * @param resourceGroupName - The resource group name.
 * @param jobCollectionName - The job collection name.
 * @param jobName - The job name.
 */
export const JobsRun = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobsRunInput,
  outputSchema: JobsRunOutput,
}));
