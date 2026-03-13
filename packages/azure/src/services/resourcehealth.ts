/**
 * Azure Resourcehealth API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const AvailabilityStatusesGetByResourceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceUri: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/{resourceUri}/providers/Microsoft.ResourceHealth/availabilityStatuses/current",
    }),
  );
export type AvailabilityStatusesGetByResourceInput =
  typeof AvailabilityStatusesGetByResourceInput.Type;

// Output Schema
export const AvailabilityStatusesGetByResourceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        availabilityState: Schema.optional(
          Schema.Literals(["Available", "Unavailable", "Degraded", "Unknown"]),
        ),
        title: Schema.optional(Schema.String),
        summary: Schema.optional(Schema.String),
        detailedStatus: Schema.optional(Schema.String),
        reasonType: Schema.optional(Schema.String),
        context: Schema.optional(Schema.String),
        category: Schema.optional(Schema.String),
        articleId: Schema.optional(Schema.String),
        rootCauseAttributionTime: Schema.optional(Schema.String),
        healthEventType: Schema.optional(Schema.String),
        healthEventCause: Schema.optional(Schema.String),
        healthEventCategory: Schema.optional(Schema.String),
        healthEventId: Schema.optional(Schema.String),
        resolutionETA: Schema.optional(Schema.String),
        occuredTime: Schema.optional(Schema.String),
        reasonChronicity: Schema.optional(
          Schema.Literals(["Transient", "Persistent"]),
        ),
        reportedTime: Schema.optional(Schema.String),
        recentlyResolved: Schema.optional(
          Schema.Struct({
            unavailableOccuredTime: Schema.optional(Schema.String),
            resolvedTime: Schema.optional(Schema.String),
            unavailableSummary: Schema.optional(Schema.String),
          }),
        ),
        recommendedActions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              action: Schema.optional(Schema.String),
              actionUrl: Schema.optional(Schema.String),
              "_ActionUrl.Comment": Schema.optional(Schema.String),
              actionUrlText: Schema.optional(Schema.String),
            }),
          ),
        ),
        serviceImpactingEvents: Schema.optional(
          Schema.Array(
            Schema.Struct({
              eventStartTime: Schema.optional(Schema.String),
              eventStatusLastModifiedTime: Schema.optional(Schema.String),
              correlationId: Schema.optional(Schema.String),
              status: Schema.optional(
                Schema.Struct({
                  value: Schema.optional(Schema.String),
                }),
              ),
              incidentProperties: Schema.optional(
                Schema.Struct({
                  title: Schema.optional(Schema.String),
                  service: Schema.optional(Schema.String),
                  region: Schema.optional(Schema.String),
                  incidentType: Schema.optional(Schema.String),
                }),
              ),
            }),
          ),
        ),
      }),
    ),
  });
export type AvailabilityStatusesGetByResourceOutput =
  typeof AvailabilityStatusesGetByResourceOutput.Type;

// The operation
/**
 * Gets current availability status for a single resource
 *
 * @param resourceUri - The fully qualified ID of the resource, including the resource name and resource type. Currently the API support not nested and one nesting level resource types : /subscriptions/{subscriptionId}/resourceGroups/{resource-group-name}/providers/{resource-provider-name}/{resource-type}/{resource-name} and /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resource-provider-name}/{parentResourceType}/{parentResourceName}/{resourceType}/{resourceName}
 * @param api-version - The API version to use for this operation.
 */
export const AvailabilityStatusesGetByResource =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AvailabilityStatusesGetByResourceInput,
    outputSchema: AvailabilityStatusesGetByResourceOutput,
  }));
// Input Schema
export const AvailabilityStatusesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceUri: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/{resourceUri}/providers/Microsoft.ResourceHealth/availabilityStatuses",
    }),
  );
export type AvailabilityStatusesListInput =
  typeof AvailabilityStatusesListInput.Type;

// Output Schema
export const AvailabilityStatusesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
        location: Schema.optional(Schema.String),
        properties: Schema.optional(
          Schema.Struct({
            availabilityState: Schema.optional(
              Schema.Literals([
                "Available",
                "Unavailable",
                "Degraded",
                "Unknown",
              ]),
            ),
            title: Schema.optional(Schema.String),
            summary: Schema.optional(Schema.String),
            detailedStatus: Schema.optional(Schema.String),
            reasonType: Schema.optional(Schema.String),
            context: Schema.optional(Schema.String),
            category: Schema.optional(Schema.String),
            articleId: Schema.optional(Schema.String),
            rootCauseAttributionTime: Schema.optional(Schema.String),
            healthEventType: Schema.optional(Schema.String),
            healthEventCause: Schema.optional(Schema.String),
            healthEventCategory: Schema.optional(Schema.String),
            healthEventId: Schema.optional(Schema.String),
            resolutionETA: Schema.optional(Schema.String),
            occuredTime: Schema.optional(Schema.String),
            reasonChronicity: Schema.optional(
              Schema.Literals(["Transient", "Persistent"]),
            ),
            reportedTime: Schema.optional(Schema.String),
            recentlyResolved: Schema.optional(
              Schema.Struct({
                unavailableOccuredTime: Schema.optional(Schema.String),
                resolvedTime: Schema.optional(Schema.String),
                unavailableSummary: Schema.optional(Schema.String),
              }),
            ),
            recommendedActions: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  action: Schema.optional(Schema.String),
                  actionUrl: Schema.optional(Schema.String),
                  "_ActionUrl.Comment": Schema.optional(Schema.String),
                  actionUrlText: Schema.optional(Schema.String),
                }),
              ),
            ),
            serviceImpactingEvents: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  eventStartTime: Schema.optional(Schema.String),
                  eventStatusLastModifiedTime: Schema.optional(Schema.String),
                  correlationId: Schema.optional(Schema.String),
                  status: Schema.optional(
                    Schema.Struct({
                      value: Schema.optional(Schema.String),
                    }),
                  ),
                  incidentProperties: Schema.optional(
                    Schema.Struct({
                      title: Schema.optional(Schema.String),
                      service: Schema.optional(Schema.String),
                      region: Schema.optional(Schema.String),
                      incidentType: Schema.optional(Schema.String),
                    }),
                  ),
                }),
              ),
            ),
          }),
        ),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type AvailabilityStatusesListOutput =
  typeof AvailabilityStatusesListOutput.Type;

// The operation
/**
 * Lists all historical availability transitions and impacting events for a single resource.
 *
 * @param resourceUri - The fully qualified ID of the resource, including the resource name and resource type. Currently the API support not nested and one nesting level resource types : /subscriptions/{subscriptionId}/resourceGroups/{resource-group-name}/providers/{resource-provider-name}/{resource-type}/{resource-name} and /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resource-provider-name}/{parentResourceType}/{parentResourceName}/{resourceType}/{resourceName}
 * @param api-version - The API version to use for this operation.
 */
export const AvailabilityStatusesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AvailabilityStatusesListInput,
    outputSchema: AvailabilityStatusesListOutput,
  }),
);
// Input Schema
export const AvailabilityStatusesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ResourceHealth/availabilityStatuses",
    }),
  );
export type AvailabilityStatusesListByResourceGroupInput =
  typeof AvailabilityStatusesListByResourceGroupInput.Type;

// Output Schema
export const AvailabilityStatusesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
        location: Schema.optional(Schema.String),
        properties: Schema.optional(
          Schema.Struct({
            availabilityState: Schema.optional(
              Schema.Literals([
                "Available",
                "Unavailable",
                "Degraded",
                "Unknown",
              ]),
            ),
            title: Schema.optional(Schema.String),
            summary: Schema.optional(Schema.String),
            detailedStatus: Schema.optional(Schema.String),
            reasonType: Schema.optional(Schema.String),
            context: Schema.optional(Schema.String),
            category: Schema.optional(Schema.String),
            articleId: Schema.optional(Schema.String),
            rootCauseAttributionTime: Schema.optional(Schema.String),
            healthEventType: Schema.optional(Schema.String),
            healthEventCause: Schema.optional(Schema.String),
            healthEventCategory: Schema.optional(Schema.String),
            healthEventId: Schema.optional(Schema.String),
            resolutionETA: Schema.optional(Schema.String),
            occuredTime: Schema.optional(Schema.String),
            reasonChronicity: Schema.optional(
              Schema.Literals(["Transient", "Persistent"]),
            ),
            reportedTime: Schema.optional(Schema.String),
            recentlyResolved: Schema.optional(
              Schema.Struct({
                unavailableOccuredTime: Schema.optional(Schema.String),
                resolvedTime: Schema.optional(Schema.String),
                unavailableSummary: Schema.optional(Schema.String),
              }),
            ),
            recommendedActions: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  action: Schema.optional(Schema.String),
                  actionUrl: Schema.optional(Schema.String),
                  "_ActionUrl.Comment": Schema.optional(Schema.String),
                  actionUrlText: Schema.optional(Schema.String),
                }),
              ),
            ),
            serviceImpactingEvents: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  eventStartTime: Schema.optional(Schema.String),
                  eventStatusLastModifiedTime: Schema.optional(Schema.String),
                  correlationId: Schema.optional(Schema.String),
                  status: Schema.optional(
                    Schema.Struct({
                      value: Schema.optional(Schema.String),
                    }),
                  ),
                  incidentProperties: Schema.optional(
                    Schema.Struct({
                      title: Schema.optional(Schema.String),
                      service: Schema.optional(Schema.String),
                      region: Schema.optional(Schema.String),
                      incidentType: Schema.optional(Schema.String),
                    }),
                  ),
                }),
              ),
            ),
          }),
        ),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type AvailabilityStatusesListByResourceGroupOutput =
  typeof AvailabilityStatusesListByResourceGroupOutput.Type;

// The operation
/**
 * Lists the current availability status for all the resources in the resource group.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const AvailabilityStatusesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AvailabilityStatusesListByResourceGroupInput,
    outputSchema: AvailabilityStatusesListByResourceGroupOutput,
  }));
// Input Schema
export const AvailabilityStatusesListBySubscriptionIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ResourceHealth/availabilityStatuses",
    }),
  );
export type AvailabilityStatusesListBySubscriptionIdInput =
  typeof AvailabilityStatusesListBySubscriptionIdInput.Type;

// Output Schema
export const AvailabilityStatusesListBySubscriptionIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
        location: Schema.optional(Schema.String),
        properties: Schema.optional(
          Schema.Struct({
            availabilityState: Schema.optional(
              Schema.Literals([
                "Available",
                "Unavailable",
                "Degraded",
                "Unknown",
              ]),
            ),
            title: Schema.optional(Schema.String),
            summary: Schema.optional(Schema.String),
            detailedStatus: Schema.optional(Schema.String),
            reasonType: Schema.optional(Schema.String),
            context: Schema.optional(Schema.String),
            category: Schema.optional(Schema.String),
            articleId: Schema.optional(Schema.String),
            rootCauseAttributionTime: Schema.optional(Schema.String),
            healthEventType: Schema.optional(Schema.String),
            healthEventCause: Schema.optional(Schema.String),
            healthEventCategory: Schema.optional(Schema.String),
            healthEventId: Schema.optional(Schema.String),
            resolutionETA: Schema.optional(Schema.String),
            occuredTime: Schema.optional(Schema.String),
            reasonChronicity: Schema.optional(
              Schema.Literals(["Transient", "Persistent"]),
            ),
            reportedTime: Schema.optional(Schema.String),
            recentlyResolved: Schema.optional(
              Schema.Struct({
                unavailableOccuredTime: Schema.optional(Schema.String),
                resolvedTime: Schema.optional(Schema.String),
                unavailableSummary: Schema.optional(Schema.String),
              }),
            ),
            recommendedActions: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  action: Schema.optional(Schema.String),
                  actionUrl: Schema.optional(Schema.String),
                  "_ActionUrl.Comment": Schema.optional(Schema.String),
                  actionUrlText: Schema.optional(Schema.String),
                }),
              ),
            ),
            serviceImpactingEvents: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  eventStartTime: Schema.optional(Schema.String),
                  eventStatusLastModifiedTime: Schema.optional(Schema.String),
                  correlationId: Schema.optional(Schema.String),
                  status: Schema.optional(
                    Schema.Struct({
                      value: Schema.optional(Schema.String),
                    }),
                  ),
                  incidentProperties: Schema.optional(
                    Schema.Struct({
                      title: Schema.optional(Schema.String),
                      service: Schema.optional(Schema.String),
                      region: Schema.optional(Schema.String),
                      incidentType: Schema.optional(Schema.String),
                    }),
                  ),
                }),
              ),
            ),
          }),
        ),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type AvailabilityStatusesListBySubscriptionIdOutput =
  typeof AvailabilityStatusesListBySubscriptionIdOutput.Type;

// The operation
/**
 * Lists the current availability status for all the resources in the subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const AvailabilityStatusesListBySubscriptionId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AvailabilityStatusesListBySubscriptionIdInput,
    outputSchema: AvailabilityStatusesListBySubscriptionIdOutput,
  }));
// Input Schema
export const ChildAvailabilityStatusesGetByResourceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceUri: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/{resourceUri}/providers/Microsoft.ResourceHealth/childAvailabilityStatuses/current",
    }),
  );
export type ChildAvailabilityStatusesGetByResourceInput =
  typeof ChildAvailabilityStatusesGetByResourceInput.Type;

// Output Schema
export const ChildAvailabilityStatusesGetByResourceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        availabilityState: Schema.optional(
          Schema.Literals(["Available", "Unavailable", "Degraded", "Unknown"]),
        ),
        title: Schema.optional(Schema.String),
        summary: Schema.optional(Schema.String),
        detailedStatus: Schema.optional(Schema.String),
        reasonType: Schema.optional(Schema.String),
        context: Schema.optional(Schema.String),
        category: Schema.optional(Schema.String),
        articleId: Schema.optional(Schema.String),
        rootCauseAttributionTime: Schema.optional(Schema.String),
        healthEventType: Schema.optional(Schema.String),
        healthEventCause: Schema.optional(Schema.String),
        healthEventCategory: Schema.optional(Schema.String),
        healthEventId: Schema.optional(Schema.String),
        resolutionETA: Schema.optional(Schema.String),
        occuredTime: Schema.optional(Schema.String),
        reasonChronicity: Schema.optional(
          Schema.Literals(["Transient", "Persistent"]),
        ),
        reportedTime: Schema.optional(Schema.String),
        recentlyResolved: Schema.optional(
          Schema.Struct({
            unavailableOccuredTime: Schema.optional(Schema.String),
            resolvedTime: Schema.optional(Schema.String),
            unavailableSummary: Schema.optional(Schema.String),
          }),
        ),
        recommendedActions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              action: Schema.optional(Schema.String),
              actionUrl: Schema.optional(Schema.String),
              "_ActionUrl.Comment": Schema.optional(Schema.String),
              actionUrlText: Schema.optional(Schema.String),
            }),
          ),
        ),
        serviceImpactingEvents: Schema.optional(
          Schema.Array(
            Schema.Struct({
              eventStartTime: Schema.optional(Schema.String),
              eventStatusLastModifiedTime: Schema.optional(Schema.String),
              correlationId: Schema.optional(Schema.String),
              status: Schema.optional(
                Schema.Struct({
                  value: Schema.optional(Schema.String),
                }),
              ),
              incidentProperties: Schema.optional(
                Schema.Struct({
                  title: Schema.optional(Schema.String),
                  service: Schema.optional(Schema.String),
                  region: Schema.optional(Schema.String),
                  incidentType: Schema.optional(Schema.String),
                }),
              ),
            }),
          ),
        ),
      }),
    ),
  });
export type ChildAvailabilityStatusesGetByResourceOutput =
  typeof ChildAvailabilityStatusesGetByResourceOutput.Type;

// The operation
/**
 * Gets current availability status for a single resource
 *
 * @param resourceUri - The fully qualified ID of the resource, including the resource name and resource type. Currently the API only support one nesting level resource types : /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resource-provider-name}/{parentResourceType}/{parentResourceName}/{resourceType}/{resourceName}
 * @param api-version - The API version to use for this operation.
 */
export const ChildAvailabilityStatusesGetByResource =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ChildAvailabilityStatusesGetByResourceInput,
    outputSchema: ChildAvailabilityStatusesGetByResourceOutput,
  }));
// Input Schema
export const ChildAvailabilityStatusesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceUri: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/{resourceUri}/providers/Microsoft.ResourceHealth/childAvailabilityStatuses",
    }),
  );
export type ChildAvailabilityStatusesListInput =
  typeof ChildAvailabilityStatusesListInput.Type;

// Output Schema
export const ChildAvailabilityStatusesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
        location: Schema.optional(Schema.String),
        properties: Schema.optional(
          Schema.Struct({
            availabilityState: Schema.optional(
              Schema.Literals([
                "Available",
                "Unavailable",
                "Degraded",
                "Unknown",
              ]),
            ),
            title: Schema.optional(Schema.String),
            summary: Schema.optional(Schema.String),
            detailedStatus: Schema.optional(Schema.String),
            reasonType: Schema.optional(Schema.String),
            context: Schema.optional(Schema.String),
            category: Schema.optional(Schema.String),
            articleId: Schema.optional(Schema.String),
            rootCauseAttributionTime: Schema.optional(Schema.String),
            healthEventType: Schema.optional(Schema.String),
            healthEventCause: Schema.optional(Schema.String),
            healthEventCategory: Schema.optional(Schema.String),
            healthEventId: Schema.optional(Schema.String),
            resolutionETA: Schema.optional(Schema.String),
            occuredTime: Schema.optional(Schema.String),
            reasonChronicity: Schema.optional(
              Schema.Literals(["Transient", "Persistent"]),
            ),
            reportedTime: Schema.optional(Schema.String),
            recentlyResolved: Schema.optional(
              Schema.Struct({
                unavailableOccuredTime: Schema.optional(Schema.String),
                resolvedTime: Schema.optional(Schema.String),
                unavailableSummary: Schema.optional(Schema.String),
              }),
            ),
            recommendedActions: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  action: Schema.optional(Schema.String),
                  actionUrl: Schema.optional(Schema.String),
                  "_ActionUrl.Comment": Schema.optional(Schema.String),
                  actionUrlText: Schema.optional(Schema.String),
                }),
              ),
            ),
            serviceImpactingEvents: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  eventStartTime: Schema.optional(Schema.String),
                  eventStatusLastModifiedTime: Schema.optional(Schema.String),
                  correlationId: Schema.optional(Schema.String),
                  status: Schema.optional(
                    Schema.Struct({
                      value: Schema.optional(Schema.String),
                    }),
                  ),
                  incidentProperties: Schema.optional(
                    Schema.Struct({
                      title: Schema.optional(Schema.String),
                      service: Schema.optional(Schema.String),
                      region: Schema.optional(Schema.String),
                      incidentType: Schema.optional(Schema.String),
                    }),
                  ),
                }),
              ),
            ),
          }),
        ),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ChildAvailabilityStatusesListOutput =
  typeof ChildAvailabilityStatusesListOutput.Type;

// The operation
/**
 * Lists the historical availability statuses for a single child resource. Use the nextLink property in the response to get the next page of availability status
 *
 * @param resourceUri - The fully qualified ID of the resource, including the resource name and resource type. Currently the API only support one nesting level resource types : /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resource-provider-name}/{parentResourceType}/{parentResourceName}/{resourceType}/{resourceName}
 * @param api-version - The API version to use for this operation.
 */
export const ChildAvailabilityStatusesList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ChildAvailabilityStatusesListInput,
    outputSchema: ChildAvailabilityStatusesListOutput,
  }));
// Input Schema
export const ChildResourcesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceUri: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/{resourceUri}/providers/Microsoft.ResourceHealth/childResources",
    }),
  );
export type ChildResourcesListInput = typeof ChildResourcesListInput.Type;

// Output Schema
export const ChildResourcesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
        location: Schema.optional(Schema.String),
        properties: Schema.optional(
          Schema.Struct({
            availabilityState: Schema.optional(
              Schema.Literals([
                "Available",
                "Unavailable",
                "Degraded",
                "Unknown",
              ]),
            ),
            title: Schema.optional(Schema.String),
            summary: Schema.optional(Schema.String),
            detailedStatus: Schema.optional(Schema.String),
            reasonType: Schema.optional(Schema.String),
            context: Schema.optional(Schema.String),
            category: Schema.optional(Schema.String),
            articleId: Schema.optional(Schema.String),
            rootCauseAttributionTime: Schema.optional(Schema.String),
            healthEventType: Schema.optional(Schema.String),
            healthEventCause: Schema.optional(Schema.String),
            healthEventCategory: Schema.optional(Schema.String),
            healthEventId: Schema.optional(Schema.String),
            resolutionETA: Schema.optional(Schema.String),
            occuredTime: Schema.optional(Schema.String),
            reasonChronicity: Schema.optional(
              Schema.Literals(["Transient", "Persistent"]),
            ),
            reportedTime: Schema.optional(Schema.String),
            recentlyResolved: Schema.optional(
              Schema.Struct({
                unavailableOccuredTime: Schema.optional(Schema.String),
                resolvedTime: Schema.optional(Schema.String),
                unavailableSummary: Schema.optional(Schema.String),
              }),
            ),
            recommendedActions: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  action: Schema.optional(Schema.String),
                  actionUrl: Schema.optional(Schema.String),
                  "_ActionUrl.Comment": Schema.optional(Schema.String),
                  actionUrlText: Schema.optional(Schema.String),
                }),
              ),
            ),
            serviceImpactingEvents: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  eventStartTime: Schema.optional(Schema.String),
                  eventStatusLastModifiedTime: Schema.optional(Schema.String),
                  correlationId: Schema.optional(Schema.String),
                  status: Schema.optional(
                    Schema.Struct({
                      value: Schema.optional(Schema.String),
                    }),
                  ),
                  incidentProperties: Schema.optional(
                    Schema.Struct({
                      title: Schema.optional(Schema.String),
                      service: Schema.optional(Schema.String),
                      region: Schema.optional(Schema.String),
                      incidentType: Schema.optional(Schema.String),
                    }),
                  ),
                }),
              ),
            ),
          }),
        ),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ChildResourcesListOutput = typeof ChildResourcesListOutput.Type;

// The operation
/**
 * Lists the all the children and its current health status for a parent resource. Use the nextLink property in the response to get the next page of children current health
 *
 * @param resourceUri - The fully qualified ID of the resource, including the resource name and resource type. Currently the API only support not nested parent resource type: /subscriptions/{subscriptionId}/resourceGroups/{resource-group-name}/providers/{resource-provider-name}/{resource-type}/{resource-name}
 * @param api-version - The API version to use for this operation.
 */
export const ChildResourcesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ChildResourcesListInput,
  outputSchema: ChildResourcesListOutput,
}));
// Input Schema
export const EmergingIssuesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.ResourceHealth/emergingIssues/{issueName}",
  }),
);
export type EmergingIssuesGetInput = typeof EmergingIssuesGetInput.Type;

// Output Schema
export const EmergingIssuesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type EmergingIssuesGetOutput = typeof EmergingIssuesGetOutput.Type;

// The operation
/**
 * Gets Azure services' emerging issues.
 *
 * @param api-version - The API version to use for this operation.
 */
export const EmergingIssuesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EmergingIssuesGetInput,
  outputSchema: EmergingIssuesGetOutput,
}));
// Input Schema
export const EmergingIssuesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ResourceHealth/emergingIssues",
    }),
  );
export type EmergingIssuesListInput = typeof EmergingIssuesListInput.Type;

// Output Schema
export const EmergingIssuesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type EmergingIssuesListOutput = typeof EmergingIssuesListOutput.Type;

// The operation
/**
 * Lists Azure services' emerging issues.
 *
 * @param api-version - The API version to use for this operation.
 */
export const EmergingIssuesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EmergingIssuesListInput,
  outputSchema: EmergingIssuesListOutput,
}));
// Input Schema
export const EventFetchBilllingCommunicationDetailsBySubscriptionIdAndTrackingIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ResourceHealth/events/{eventTrackingId}/fetchBillingCommunicationDetails",
    }),
  );
export type EventFetchBilllingCommunicationDetailsBySubscriptionIdAndTrackingIdInput =
  typeof EventFetchBilllingCommunicationDetailsBySubscriptionIdAndTrackingIdInput.Type;

// Output Schema
export const EventFetchBilllingCommunicationDetailsBySubscriptionIdAndTrackingIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type EventFetchBilllingCommunicationDetailsBySubscriptionIdAndTrackingIdOutput =
  typeof EventFetchBilllingCommunicationDetailsBySubscriptionIdAndTrackingIdOutput.Type;

// The operation
/**
 * Service health event details specific in the subscription by event tracking id. This can be used to fetch sensitive properties for Billing event type.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const EventFetchBilllingCommunicationDetailsBySubscriptionIdAndTrackingId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      EventFetchBilllingCommunicationDetailsBySubscriptionIdAndTrackingIdInput,
    outputSchema:
      EventFetchBilllingCommunicationDetailsBySubscriptionIdAndTrackingIdOutput,
  }));
// Input Schema
export const EventFetchDetailsBySubscriptionIdAndTrackingIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ResourceHealth/events/{eventTrackingId}/fetchEventDetails",
    }),
  );
export type EventFetchDetailsBySubscriptionIdAndTrackingIdInput =
  typeof EventFetchDetailsBySubscriptionIdAndTrackingIdInput.Type;

// Output Schema
export const EventFetchDetailsBySubscriptionIdAndTrackingIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type EventFetchDetailsBySubscriptionIdAndTrackingIdOutput =
  typeof EventFetchDetailsBySubscriptionIdAndTrackingIdOutput.Type;

// The operation
/**
 * Service health event details in the subscription by event tracking id. This can be used to fetch sensitive properties for Security Advisory events. Please see https://learn.microsoft.com/en-us/azure/service-health/security-advisories-elevated-access
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const EventFetchDetailsBySubscriptionIdAndTrackingId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EventFetchDetailsBySubscriptionIdAndTrackingIdInput,
    outputSchema: EventFetchDetailsBySubscriptionIdAndTrackingIdOutput,
  }));
// Input Schema
export const EventFetchDetailsByTenantIdAndTrackingIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.ResourceHealth/events/{eventTrackingId}/fetchEventDetails",
    }),
  );
export type EventFetchDetailsByTenantIdAndTrackingIdInput =
  typeof EventFetchDetailsByTenantIdAndTrackingIdInput.Type;

// Output Schema
export const EventFetchDetailsByTenantIdAndTrackingIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type EventFetchDetailsByTenantIdAndTrackingIdOutput =
  typeof EventFetchDetailsByTenantIdAndTrackingIdOutput.Type;

// The operation
/**
 * Service health event details in the tenant by event tracking id. This can be used to fetch sensitive properties for Security Advisory events. Please see https://learn.microsoft.com/en-us/azure/service-health/security-advisories-elevated-access
 *
 * @param api-version - The API version to use for this operation.
 */
export const EventFetchDetailsByTenantIdAndTrackingId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EventFetchDetailsByTenantIdAndTrackingIdInput,
    outputSchema: EventFetchDetailsByTenantIdAndTrackingIdOutput,
  }));
// Input Schema
export const EventGetBySubscriptionIdAndTrackingIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ResourceHealth/events/{eventTrackingId}",
    }),
  );
export type EventGetBySubscriptionIdAndTrackingIdInput =
  typeof EventGetBySubscriptionIdAndTrackingIdInput.Type;

// Output Schema
export const EventGetBySubscriptionIdAndTrackingIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type EventGetBySubscriptionIdAndTrackingIdOutput =
  typeof EventGetBySubscriptionIdAndTrackingIdOutput.Type;

// The operation
/**
 * Service health event in the subscription by event tracking id
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const EventGetBySubscriptionIdAndTrackingId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EventGetBySubscriptionIdAndTrackingIdInput,
    outputSchema: EventGetBySubscriptionIdAndTrackingIdOutput,
  }));
// Input Schema
export const EventGetByTenantIdAndTrackingIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ResourceHealth/events/{eventTrackingId}",
    }),
  );
export type EventGetByTenantIdAndTrackingIdInput =
  typeof EventGetByTenantIdAndTrackingIdInput.Type;

// Output Schema
export const EventGetByTenantIdAndTrackingIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type EventGetByTenantIdAndTrackingIdOutput =
  typeof EventGetByTenantIdAndTrackingIdOutput.Type;

// The operation
/**
 * Service health event in the tenant by event tracking id
 *
 * @param api-version - The API version to use for this operation.
 */
export const EventGetByTenantIdAndTrackingId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EventGetByTenantIdAndTrackingIdInput,
    outputSchema: EventGetByTenantIdAndTrackingIdOutput,
  }));
// Input Schema
export const EventsListBySingleResourceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceUri: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/{resourceUri}/providers/Microsoft.ResourceHealth/events",
    }),
  );
export type EventsListBySingleResourceInput =
  typeof EventsListBySingleResourceInput.Type;

// Output Schema
export const EventsListBySingleResourceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type EventsListBySingleResourceOutput =
  typeof EventsListBySingleResourceOutput.Type;

// The operation
/**
 * Lists current service health events for given resource.
 *
 * @param resourceUri - The fully qualified ID of the resource, including the resource name and resource type. Currently the API support not nested and one nesting level resource types : /subscriptions/{subscriptionId}/resourceGroups/{resource-group-name}/providers/{resource-provider-name}/{resource-type}/{resource-name} and /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resource-provider-name}/{parentResourceType}/{parentResourceName}/{resourceType}/{resourceName}
 * @param api-version - The API version to use for this operation.
 */
export const EventsListBySingleResource = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EventsListBySingleResourceInput,
    outputSchema: EventsListBySingleResourceOutput,
  }),
);
// Input Schema
export const EventsListBySubscriptionIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ResourceHealth/events",
    }),
  );
export type EventsListBySubscriptionIdInput =
  typeof EventsListBySubscriptionIdInput.Type;

// Output Schema
export const EventsListBySubscriptionIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type EventsListBySubscriptionIdOutput =
  typeof EventsListBySubscriptionIdOutput.Type;

// The operation
/**
 * Lists service health events in the subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const EventsListBySubscriptionId = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EventsListBySubscriptionIdInput,
    outputSchema: EventsListBySubscriptionIdOutput,
  }),
);
// Input Schema
export const EventsListByTenantIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ResourceHealth/events",
    }),
  );
export type EventsListByTenantIdInput = typeof EventsListByTenantIdInput.Type;

// Output Schema
export const EventsListByTenantIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type EventsListByTenantIdOutput = typeof EventsListByTenantIdOutput.Type;

// The operation
/**
 * Lists current service health events in the tenant.
 *
 * @param api-version - The API version to use for this operation.
 */
export const EventsListByTenantId = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EventsListByTenantIdInput,
    outputSchema: EventsListByTenantIdOutput,
  }),
);
// Input Schema
export const ImpactedResourcesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ResourceHealth/events/{eventTrackingId}/impactedResources/{impactedResourceName}",
    }),
  );
export type ImpactedResourcesGetInput = typeof ImpactedResourcesGetInput.Type;

// Output Schema
export const ImpactedResourcesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ImpactedResourcesGetOutput = typeof ImpactedResourcesGetOutput.Type;

// The operation
/**
 * Gets the specific impacted resource in the subscription by an event.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const ImpactedResourcesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ImpactedResourcesGetInput,
    outputSchema: ImpactedResourcesGetOutput,
  }),
);
// Input Schema
export const ImpactedResourcesGetByTenantIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ResourceHealth/events/{eventTrackingId}/impactedResources/{impactedResourceName}",
    }),
  );
export type ImpactedResourcesGetByTenantIdInput =
  typeof ImpactedResourcesGetByTenantIdInput.Type;

// Output Schema
export const ImpactedResourcesGetByTenantIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ImpactedResourcesGetByTenantIdOutput =
  typeof ImpactedResourcesGetByTenantIdOutput.Type;

// The operation
/**
 * Gets the specific impacted resource in the tenant by an event.
 *
 * @param api-version - The API version to use for this operation.
 */
export const ImpactedResourcesGetByTenantId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ImpactedResourcesGetByTenantIdInput,
    outputSchema: ImpactedResourcesGetByTenantIdOutput,
  }));
// Input Schema
export const ImpactedResourcesListBySubscriptionIdAndEventIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ResourceHealth/events/{eventTrackingId}/impactedResources",
    }),
  );
export type ImpactedResourcesListBySubscriptionIdAndEventIdInput =
  typeof ImpactedResourcesListBySubscriptionIdAndEventIdInput.Type;

// Output Schema
export const ImpactedResourcesListBySubscriptionIdAndEventIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ImpactedResourcesListBySubscriptionIdAndEventIdOutput =
  typeof ImpactedResourcesListBySubscriptionIdAndEventIdOutput.Type;

// The operation
/**
 * Lists impacted resources in the subscription by an event.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const ImpactedResourcesListBySubscriptionIdAndEventId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ImpactedResourcesListBySubscriptionIdAndEventIdInput,
    outputSchema: ImpactedResourcesListBySubscriptionIdAndEventIdOutput,
  }));
// Input Schema
export const ImpactedResourcesListByTenantIdAndEventIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ResourceHealth/events/{eventTrackingId}/impactedResources",
    }),
  );
export type ImpactedResourcesListByTenantIdAndEventIdInput =
  typeof ImpactedResourcesListByTenantIdAndEventIdInput.Type;

// Output Schema
export const ImpactedResourcesListByTenantIdAndEventIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ImpactedResourcesListByTenantIdAndEventIdOutput =
  typeof ImpactedResourcesListByTenantIdAndEventIdOutput.Type;

// The operation
/**
 * Lists impacted resources in the tenant by an event.
 *
 * @param api-version - The API version to use for this operation.
 */
export const ImpactedResourcesListByTenantIdAndEventId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ImpactedResourcesListByTenantIdAndEventIdInput,
    outputSchema: ImpactedResourcesListByTenantIdAndEventIdOutput,
  }));
// Input Schema
export const MetadataGetEntityInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.ResourceHealth/metadata/{name}",
  }),
);
export type MetadataGetEntityInput = typeof MetadataGetEntityInput.Type;

// Output Schema
export const MetadataGetEntityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type MetadataGetEntityOutput = typeof MetadataGetEntityOutput.Type;

// The operation
/**
 * Gets the list of metadata entities.
 *
 * @param name - Name of metadata entity.
 * @param api-version - The API version to use for this operation.
 */
export const MetadataGetEntity = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MetadataGetEntityInput,
  outputSchema: MetadataGetEntityOutput,
}));
// Input Schema
export const MetadataListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.ResourceHealth/metadata",
  }),
);
export type MetadataListInput = typeof MetadataListInput.Type;

// Output Schema
export const MetadataListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(Schema.Array(Schema.Struct({}))),
  nextLink: Schema.optional(Schema.String),
});
export type MetadataListOutput = typeof MetadataListOutput.Type;

// The operation
/**
 * Gets the list of metadata entities.
 *
 * @param api-version - The API version to use for this operation.
 */
export const MetadataList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MetadataListInput,
  outputSchema: MetadataListOutput,
}));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.ResourceHealth/operations",
  }),
);
export type OperationsListInput = typeof OperationsListInput.Type;

// Output Schema
export const OperationsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(
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
});
export type OperationsListOutput = typeof OperationsListOutput.Type;

// The operation
/**
 * Lists available operations for the resourcehealth resource provider
 *
 * @param api-version - The API version to use for this operation.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const SecurityAdvisoryImpactedResourcesListBySubscriptionIdAndEventIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ResourceHealth/events/{eventTrackingId}/listSecurityAdvisoryImpactedResources",
    }),
  );
export type SecurityAdvisoryImpactedResourcesListBySubscriptionIdAndEventIdInput =
  typeof SecurityAdvisoryImpactedResourcesListBySubscriptionIdAndEventIdInput.Type;

// Output Schema
export const SecurityAdvisoryImpactedResourcesListBySubscriptionIdAndEventIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type SecurityAdvisoryImpactedResourcesListBySubscriptionIdAndEventIdOutput =
  typeof SecurityAdvisoryImpactedResourcesListBySubscriptionIdAndEventIdOutput.Type;

// The operation
/**
 * Lists impacted resources in the subscription by an event (Security Advisory).
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const SecurityAdvisoryImpactedResourcesListBySubscriptionIdAndEventId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      SecurityAdvisoryImpactedResourcesListBySubscriptionIdAndEventIdInput,
    outputSchema:
      SecurityAdvisoryImpactedResourcesListBySubscriptionIdAndEventIdOutput,
  }));
// Input Schema
export const SecurityAdvisoryImpactedResourcesListByTenantIdAndEventIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.ResourceHealth/events/{eventTrackingId}/listSecurityAdvisoryImpactedResources",
    }),
  );
export type SecurityAdvisoryImpactedResourcesListByTenantIdAndEventIdInput =
  typeof SecurityAdvisoryImpactedResourcesListByTenantIdAndEventIdInput.Type;

// Output Schema
export const SecurityAdvisoryImpactedResourcesListByTenantIdAndEventIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type SecurityAdvisoryImpactedResourcesListByTenantIdAndEventIdOutput =
  typeof SecurityAdvisoryImpactedResourcesListByTenantIdAndEventIdOutput.Type;

// The operation
/**
 * Lists impacted resources in the tenant by an event (Security Advisory).
 *
 * @param api-version - The API version to use for this operation.
 */
export const SecurityAdvisoryImpactedResourcesListByTenantIdAndEventId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SecurityAdvisoryImpactedResourcesListByTenantIdAndEventIdInput,
    outputSchema:
      SecurityAdvisoryImpactedResourcesListByTenantIdAndEventIdOutput,
  }));
