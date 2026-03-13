/**
 * Azure Azurearcdata API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";
import { SensitiveString } from "../sensitive.ts";

// Input Schema
export const ActiveDirectoryConnectorsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.Struct({
      domainServiceAccountLoginInformation: Schema.optional(
        Schema.Struct({
          username: Schema.optional(Schema.String),
          password: Schema.optional(SensitiveString),
        }),
      ),
      provisioningState: Schema.optional(Schema.String),
      spec: Schema.Struct({
        activeDirectory: Schema.Struct({
          realm: Schema.String,
          netbiosDomainName: Schema.optional(Schema.String),
          serviceAccountProvisioning: Schema.optional(
            Schema.Literals(["automatic", "manual"]),
          ),
          ouDistinguishedName: Schema.optional(Schema.String),
          domainControllers: Schema.optional(
            Schema.Struct({
              primaryDomainController: Schema.optional(
                Schema.Struct({
                  hostname: Schema.String,
                }),
              ),
              secondaryDomainControllers: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    hostname: Schema.String,
                  }),
                ),
              ),
            }),
          ),
        }),
        dns: Schema.Struct({
          domainName: Schema.optional(Schema.String),
          nameserverIPAddresses: Schema.Array(Schema.String),
          replicas: Schema.optional(Schema.Number),
          preferK8sDnsForPtrLookups: Schema.optional(Schema.Boolean),
        }),
      }),
      status: Schema.optional(
        Schema.Struct({
          lastUpdateTime: Schema.optional(Schema.String),
          observedGeneration: Schema.optional(Schema.Number),
          state: Schema.optional(Schema.String),
        }),
      ),
    }),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/dataControllers/{dataControllerName}/activeDirectoryConnectors/{activeDirectoryConnectorName}",
    }),
  );
export type ActiveDirectoryConnectorsCreateInput =
  typeof ActiveDirectoryConnectorsCreateInput.Type;

// Output Schema
export const ActiveDirectoryConnectorsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ActiveDirectoryConnectorsCreateOutput =
  typeof ActiveDirectoryConnectorsCreateOutput.Type;

// The operation
/**
 * Creates or replaces an Active Directory connector resource.
 * @param properties - null
 */
export const ActiveDirectoryConnectorsCreate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ActiveDirectoryConnectorsCreateInput,
    outputSchema: ActiveDirectoryConnectorsCreateOutput,
  }));
// Input Schema
export const ActiveDirectoryConnectorsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/dataControllers/{dataControllerName}/activeDirectoryConnectors/{activeDirectoryConnectorName}",
    }),
  );
export type ActiveDirectoryConnectorsDeleteInput =
  typeof ActiveDirectoryConnectorsDeleteInput.Type;

// Output Schema
export const ActiveDirectoryConnectorsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ActiveDirectoryConnectorsDeleteOutput =
  typeof ActiveDirectoryConnectorsDeleteOutput.Type;

// The operation
/**
 * Deletes an Active Directory connector resource
 */
export const ActiveDirectoryConnectorsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ActiveDirectoryConnectorsDeleteInput,
    outputSchema: ActiveDirectoryConnectorsDeleteOutput,
  }));
// Input Schema
export const ActiveDirectoryConnectorsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/dataControllers/{dataControllerName}/activeDirectoryConnectors/{activeDirectoryConnectorName}",
    }),
  );
export type ActiveDirectoryConnectorsGetInput =
  typeof ActiveDirectoryConnectorsGetInput.Type;

// Output Schema
export const ActiveDirectoryConnectorsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ActiveDirectoryConnectorsGetOutput =
  typeof ActiveDirectoryConnectorsGetOutput.Type;

// The operation
/**
 * Retrieves an Active Directory connector resource
 */
export const ActiveDirectoryConnectorsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ActiveDirectoryConnectorsGetInput,
    outputSchema: ActiveDirectoryConnectorsGetOutput,
  }));
// Input Schema
export const ActiveDirectoryConnectorsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/dataControllers/{dataControllerName}/activeDirectoryConnectors",
    }),
  );
export type ActiveDirectoryConnectorsListInput =
  typeof ActiveDirectoryConnectorsListInput.Type;

// Output Schema
export const ActiveDirectoryConnectorsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ActiveDirectoryConnectorsListOutput =
  typeof ActiveDirectoryConnectorsListOutput.Type;

// The operation
/**
 * List the active directory connectors associated with the given data controller.
 */
export const ActiveDirectoryConnectorsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ActiveDirectoryConnectorsListInput,
    outputSchema: ActiveDirectoryConnectorsListOutput,
  }));
// Input Schema
export const DataControllersDeleteDataControllerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/dataControllers/{dataControllerName}",
    }),
  );
export type DataControllersDeleteDataControllerInput =
  typeof DataControllersDeleteDataControllerInput.Type;

// Output Schema
export const DataControllersDeleteDataControllerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DataControllersDeleteDataControllerOutput =
  typeof DataControllersDeleteDataControllerOutput.Type;

// The operation
/**
 * Deletes a dataController resource
 */
export const DataControllersDeleteDataController =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DataControllersDeleteDataControllerInput,
    outputSchema: DataControllersDeleteDataControllerOutput,
  }));
// Input Schema
export const DataControllersGetDataControllerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/dataControllers/{dataControllerName}",
    }),
  );
export type DataControllersGetDataControllerInput =
  typeof DataControllersGetDataControllerInput.Type;

// Output Schema
export const DataControllersGetDataControllerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DataControllersGetDataControllerOutput =
  typeof DataControllersGetDataControllerOutput.Type;

// The operation
/**
 * Retrieves a dataController resource
 */
export const DataControllersGetDataController =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DataControllersGetDataControllerInput,
    outputSchema: DataControllersGetDataControllerOutput,
  }));
// Input Schema
export const DataControllersListInGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/dataControllers",
    }),
  );
export type DataControllersListInGroupInput =
  typeof DataControllersListInGroupInput.Type;

// Output Schema
export const DataControllersListInGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DataControllersListInGroupOutput =
  typeof DataControllersListInGroupOutput.Type;

// The operation
/**
 * List dataController resources in the resource group
 */
export const DataControllersListInGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DataControllersListInGroupInput,
    outputSchema: DataControllersListInGroupOutput,
  }),
);
// Input Schema
export const DataControllersListInSubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AzureArcData/dataControllers",
    }),
  );
export type DataControllersListInSubscriptionInput =
  typeof DataControllersListInSubscriptionInput.Type;

// Output Schema
export const DataControllersListInSubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DataControllersListInSubscriptionOutput =
  typeof DataControllersListInSubscriptionOutput.Type;

// The operation
/**
 * List dataController resources in the subscription
 */
export const DataControllersListInSubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DataControllersListInSubscriptionInput,
    outputSchema: DataControllersListInSubscriptionOutput,
  }));
// Input Schema
export const DataControllersPatchDataControllerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    properties: Schema.optional(
      Schema.Struct({
        infrastructure: Schema.optional(
          Schema.Literals([
            "azure",
            "gcp",
            "aws",
            "alibaba",
            "onpremises",
            "other",
          ]),
        ),
        onPremiseProperty: Schema.optional(
          Schema.Struct({
            id: Schema.String,
            publicSigningKey: Schema.String,
            signingCertificateThumbprint: Schema.optional(Schema.String),
          }),
        ),
        k8sRaw: Schema.optional(Schema.Unknown),
        uploadWatermark: Schema.optional(
          Schema.Struct({
            metrics: Schema.optional(Schema.String),
            logs: Schema.optional(Schema.String),
            usages: Schema.optional(Schema.String),
          }),
        ),
        lastUploadedDate: Schema.optional(Schema.String),
        basicLoginInformation: Schema.optional(
          Schema.Struct({
            username: Schema.optional(Schema.String),
            password: Schema.optional(SensitiveString),
          }),
        ),
        metricsDashboardCredential: Schema.optional(
          Schema.Struct({
            username: Schema.optional(Schema.String),
            password: Schema.optional(SensitiveString),
          }),
        ),
        logsDashboardCredential: Schema.optional(
          Schema.Struct({
            username: Schema.optional(Schema.String),
            password: Schema.optional(SensitiveString),
          }),
        ),
        logAnalyticsWorkspaceConfig: Schema.optional(
          Schema.Struct({
            workspaceId: Schema.optional(Schema.String),
            primaryKey: Schema.optional(Schema.String),
          }),
        ),
        uploadServicePrincipal: Schema.optional(
          Schema.Struct({
            clientId: Schema.optional(Schema.String),
            tenantId: Schema.optional(Schema.String),
            authority: Schema.optional(Schema.String),
            clientSecret: Schema.optional(SensitiveString),
          }),
        ),
        provisioningState: Schema.optional(Schema.String),
        clusterId: Schema.optional(Schema.String),
        extensionId: Schema.optional(Schema.String),
      }),
    ),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/dataControllers/{dataControllerName}",
    }),
  );
export type DataControllersPatchDataControllerInput =
  typeof DataControllersPatchDataControllerInput.Type;

// Output Schema
export const DataControllersPatchDataControllerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DataControllersPatchDataControllerOutput =
  typeof DataControllersPatchDataControllerOutput.Type;

// The operation
/**
 * Updates a dataController resource
 * @param tags - Resource tags
 * @param properties - The data controller's properties
 */
export const DataControllersPatchDataController =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DataControllersPatchDataControllerInput,
    outputSchema: DataControllersPatchDataControllerOutput,
  }));
// Input Schema
export const DataControllersPutDataControllerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    extendedLocation: Schema.optional(
      Schema.Struct({
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.Literals(["CustomLocation"])),
      }),
    ),
    properties: Schema.Struct({
      infrastructure: Schema.optional(
        Schema.Literals([
          "azure",
          "gcp",
          "aws",
          "alibaba",
          "onpremises",
          "other",
        ]),
      ),
      onPremiseProperty: Schema.optional(
        Schema.Struct({
          id: Schema.String,
          publicSigningKey: Schema.String,
          signingCertificateThumbprint: Schema.optional(Schema.String),
        }),
      ),
      k8sRaw: Schema.optional(Schema.Unknown),
      uploadWatermark: Schema.optional(
        Schema.Struct({
          metrics: Schema.optional(Schema.String),
          logs: Schema.optional(Schema.String),
          usages: Schema.optional(Schema.String),
        }),
      ),
      lastUploadedDate: Schema.optional(Schema.String),
      basicLoginInformation: Schema.optional(
        Schema.Struct({
          username: Schema.optional(Schema.String),
          password: Schema.optional(SensitiveString),
        }),
      ),
      metricsDashboardCredential: Schema.optional(
        Schema.Struct({
          username: Schema.optional(Schema.String),
          password: Schema.optional(SensitiveString),
        }),
      ),
      logsDashboardCredential: Schema.optional(
        Schema.Struct({
          username: Schema.optional(Schema.String),
          password: Schema.optional(SensitiveString),
        }),
      ),
      logAnalyticsWorkspaceConfig: Schema.optional(
        Schema.Struct({
          workspaceId: Schema.optional(Schema.String),
          primaryKey: Schema.optional(Schema.String),
        }),
      ),
      uploadServicePrincipal: Schema.optional(
        Schema.Struct({
          clientId: Schema.optional(Schema.String),
          tenantId: Schema.optional(Schema.String),
          authority: Schema.optional(Schema.String),
          clientSecret: Schema.optional(SensitiveString),
        }),
      ),
      provisioningState: Schema.optional(Schema.String),
      clusterId: Schema.optional(Schema.String),
      extensionId: Schema.optional(Schema.String),
    }),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/dataControllers/{dataControllerName}",
    }),
  );
export type DataControllersPutDataControllerInput =
  typeof DataControllersPutDataControllerInput.Type;

// Output Schema
export const DataControllersPutDataControllerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DataControllersPutDataControllerOutput =
  typeof DataControllersPutDataControllerOutput.Type;

// The operation
/**
 * Creates or replaces a dataController resource
 * @param extendedLocation - The complex type of the extended location.
 * @param properties - The data controller's properties
 */
export const DataControllersPutDataController =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DataControllersPutDataControllerInput,
    outputSchema: DataControllersPutDataControllerOutput,
  }));
// Input Schema
export const FailoverGroupsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.Struct({
      provisioningState: Schema.optional(
        Schema.Literals(["Succeeded", "Failed", "Canceled", "Accepted"]),
      ),
      partnerManagedInstanceId: Schema.String,
      spec: Schema.Struct({
        sharedName: Schema.optional(Schema.String),
        sourceMI: Schema.optional(Schema.String),
        partnerMI: Schema.optional(Schema.String),
        partnerMirroringURL: Schema.optional(Schema.String),
        partnerMirroringCert: Schema.optional(Schema.String),
        partnerSyncMode: Schema.optional(Schema.Literals(["async", "sync"])),
        role: Schema.Literals([
          "primary",
          "secondary",
          "force-primary-allow-data-loss",
          "force-secondary",
        ]),
      }),
      status: Schema.optional(Schema.Unknown),
    }),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlManagedInstances/{sqlManagedInstanceName}/failoverGroups/{failoverGroupName}",
    }),
  );
export type FailoverGroupsCreateInput = typeof FailoverGroupsCreateInput.Type;

// Output Schema
export const FailoverGroupsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type FailoverGroupsCreateOutput = typeof FailoverGroupsCreateOutput.Type;

// The operation
/**
 * Creates or replaces a failover group resource.
 * @param properties - null
 */
export const FailoverGroupsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FailoverGroupsCreateInput,
    outputSchema: FailoverGroupsCreateOutput,
  }),
);
// Input Schema
export const FailoverGroupsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlManagedInstances/{sqlManagedInstanceName}/failoverGroups/{failoverGroupName}",
    }),
  );
export type FailoverGroupsDeleteInput = typeof FailoverGroupsDeleteInput.Type;

// Output Schema
export const FailoverGroupsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type FailoverGroupsDeleteOutput = typeof FailoverGroupsDeleteOutput.Type;

// The operation
/**
 * Deletes a failover group resource
 */
export const FailoverGroupsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FailoverGroupsDeleteInput,
    outputSchema: FailoverGroupsDeleteOutput,
  }),
);
// Input Schema
export const FailoverGroupsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlManagedInstances/{sqlManagedInstanceName}/failoverGroups/{failoverGroupName}",
  }),
);
export type FailoverGroupsGetInput = typeof FailoverGroupsGetInput.Type;

// Output Schema
export const FailoverGroupsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type FailoverGroupsGetOutput = typeof FailoverGroupsGetOutput.Type;

// The operation
/**
 * Retrieves a failover group resource
 */
export const FailoverGroupsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FailoverGroupsGetInput,
  outputSchema: FailoverGroupsGetOutput,
}));
// Input Schema
export const FailoverGroupsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlManagedInstances/{sqlManagedInstanceName}/failoverGroups",
    }),
  );
export type FailoverGroupsListInput = typeof FailoverGroupsListInput.Type;

// Output Schema
export const FailoverGroupsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type FailoverGroupsListOutput = typeof FailoverGroupsListOutput.Type;

// The operation
/**
 * List the failover groups associated with the given sql managed instance.
 */
export const FailoverGroupsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FailoverGroupsListInput,
  outputSchema: FailoverGroupsListOutput,
}));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.AzureArcData/operations",
  }),
);
export type OperationsListInput = typeof OperationsListInput.Type;

// Output Schema
export const OperationsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        name: Schema.String,
        display: Schema.Struct({
          provider: Schema.String,
          resource: Schema.String,
          operation: Schema.String,
          description: Schema.String,
        }),
        origin: Schema.optional(Schema.Literals(["user", "system"])),
        isDataAction: Schema.Boolean,
        properties: Schema.optional(
          Schema.Record(Schema.String, Schema.Unknown),
        ),
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type OperationsListOutput = typeof OperationsListOutput.Type;

// The operation
/**
 * Lists all of the available Azure Data Services on Azure Arc API operations.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const PostgresInstancesCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    extendedLocation: Schema.optional(
      Schema.Struct({
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.Literals(["CustomLocation"])),
      }),
    ),
    properties: Schema.Struct({
      dataControllerId: Schema.optional(Schema.String),
      admin: Schema.optional(Schema.String),
      basicLoginInformation: Schema.optional(
        Schema.Struct({
          username: Schema.optional(Schema.String),
          password: Schema.optional(SensitiveString),
        }),
      ),
      k8sRaw: Schema.optional(Schema.Unknown),
      lastUploadedDate: Schema.optional(Schema.String),
      provisioningState: Schema.optional(Schema.String),
    }),
    sku: Schema.optional(
      Schema.Struct({
        name: Schema.String,
        dev: Schema.optional(Schema.Boolean),
        size: Schema.optional(Schema.String),
        family: Schema.optional(Schema.String),
        capacity: Schema.optional(Schema.Number),
      }),
    ),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/postgresInstances/{postgresInstanceName}",
    }),
  );
export type PostgresInstancesCreateInput =
  typeof PostgresInstancesCreateInput.Type;

// Output Schema
export const PostgresInstancesCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type PostgresInstancesCreateOutput =
  typeof PostgresInstancesCreateOutput.Type;

// The operation
/**
 * Creates or replaces a postgres Instance resource
 * @param extendedLocation - The complex type of the extended location.
 * @param properties - null
 * @param sku - Resource sku.
 */
export const PostgresInstancesCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PostgresInstancesCreateInput,
    outputSchema: PostgresInstancesCreateOutput,
  }),
);
// Input Schema
export const PostgresInstancesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/postgresInstances/{postgresInstanceName}",
    }),
  );
export type PostgresInstancesDeleteInput =
  typeof PostgresInstancesDeleteInput.Type;

// Output Schema
export const PostgresInstancesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PostgresInstancesDeleteOutput =
  typeof PostgresInstancesDeleteOutput.Type;

// The operation
/**
 * Deletes a postgres Instance resource
 */
export const PostgresInstancesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PostgresInstancesDeleteInput,
    outputSchema: PostgresInstancesDeleteOutput,
  }),
);
// Input Schema
export const PostgresInstancesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/postgresInstances/{postgresInstanceName}",
    }),
  );
export type PostgresInstancesGetInput = typeof PostgresInstancesGetInput.Type;

// Output Schema
export const PostgresInstancesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type PostgresInstancesGetOutput = typeof PostgresInstancesGetOutput.Type;

// The operation
/**
 * Retrieves a postgres Instance resource
 */
export const PostgresInstancesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PostgresInstancesGetInput,
    outputSchema: PostgresInstancesGetOutput,
  }),
);
// Input Schema
export const PostgresInstancesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AzureArcData/postgresInstances",
    }),
  );
export type PostgresInstancesListInput = typeof PostgresInstancesListInput.Type;

// Output Schema
export const PostgresInstancesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PostgresInstancesListOutput =
  typeof PostgresInstancesListOutput.Type;

// The operation
/**
 * List postgres Instance resources in the subscription
 */
export const PostgresInstancesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PostgresInstancesListInput,
    outputSchema: PostgresInstancesListOutput,
  }),
);
// Input Schema
export const PostgresInstancesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/postgresInstances",
    }),
  );
export type PostgresInstancesListByResourceGroupInput =
  typeof PostgresInstancesListByResourceGroupInput.Type;

// Output Schema
export const PostgresInstancesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PostgresInstancesListByResourceGroupOutput =
  typeof PostgresInstancesListByResourceGroupOutput.Type;

// The operation
/**
 * List postgres Instance resources in the resource group
 *
 * Get a postgres Instances list by Resource group name.
 */
export const PostgresInstancesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostgresInstancesListByResourceGroupInput,
    outputSchema: PostgresInstancesListByResourceGroupOutput,
  }));
// Input Schema
export const PostgresInstancesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    properties: Schema.optional(
      Schema.Struct({
        dataControllerId: Schema.optional(Schema.String),
        admin: Schema.optional(Schema.String),
        basicLoginInformation: Schema.optional(
          Schema.Struct({
            username: Schema.optional(Schema.String),
            password: Schema.optional(SensitiveString),
          }),
        ),
        k8sRaw: Schema.optional(Schema.Unknown),
        lastUploadedDate: Schema.optional(Schema.String),
        provisioningState: Schema.optional(Schema.String),
      }),
    ),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/postgresInstances/{postgresInstanceName}",
    }),
  );
export type PostgresInstancesUpdateInput =
  typeof PostgresInstancesUpdateInput.Type;

// Output Schema
export const PostgresInstancesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type PostgresInstancesUpdateOutput =
  typeof PostgresInstancesUpdateOutput.Type;

// The operation
/**
 * Updates a postgres Instance resource
 * @param tags - Resource tags.
 */
export const PostgresInstancesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PostgresInstancesUpdateInput,
    outputSchema: PostgresInstancesUpdateOutput,
  }),
);
// Input Schema
export const SqlManagedInstancesCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.Struct({
      dataControllerId: Schema.optional(Schema.String),
      admin: Schema.optional(Schema.String),
      startTime: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
      k8sRaw: Schema.optional(
        Schema.Struct({
          spec: Schema.optional(
            Schema.Struct({
              scheduling: Schema.optional(
                Schema.Struct({
                  default: Schema.optional(
                    Schema.Struct({
                      resources: Schema.optional(
                        Schema.Struct({
                          requests: Schema.optional(
                            Schema.Record(Schema.String, Schema.String),
                          ),
                          limits: Schema.optional(
                            Schema.Record(Schema.String, Schema.String),
                          ),
                        }),
                      ),
                    }),
                  ),
                }),
              ),
              replicas: Schema.optional(Schema.Number),
              security: Schema.optional(
                Schema.Struct({
                  adminLoginSecret: Schema.optional(Schema.String),
                  serviceCertificateSecret: Schema.optional(Schema.String),
                  activeDirectory: Schema.optional(
                    Schema.Struct({
                      connector: Schema.optional(
                        Schema.Struct({
                          name: Schema.optional(Schema.String),
                          namespace: Schema.optional(Schema.String),
                        }),
                      ),
                      accountName: Schema.optional(Schema.String),
                      keytabSecret: Schema.optional(Schema.String),
                      encryptionTypes: Schema.optional(
                        Schema.Array(Schema.String),
                      ),
                    }),
                  ),
                  transparentDataEncryption: Schema.optional(
                    Schema.Struct({
                      mode: Schema.optional(Schema.String),
                      protectorSecret: Schema.optional(Schema.String),
                    }),
                  ),
                }),
              ),
              settings: Schema.optional(
                Schema.Struct({
                  network: Schema.optional(
                    Schema.Struct({
                      forceencryption: Schema.optional(Schema.Number),
                      tlsciphers: Schema.optional(Schema.String),
                      tlsprotocols: Schema.optional(Schema.String),
                    }),
                  ),
                }),
              ),
            }),
          ),
        }),
      ),
      basicLoginInformation: Schema.optional(
        Schema.Struct({
          username: Schema.optional(Schema.String),
          password: Schema.optional(SensitiveString),
        }),
      ),
      lastUploadedDate: Schema.optional(Schema.String),
      provisioningState: Schema.optional(Schema.String),
      activeDirectoryInformation: Schema.optional(
        Schema.Struct({
          keytabInformation: Schema.optional(
            Schema.Struct({
              keytab: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
      licenseType: Schema.optional(
        Schema.Literals(["BasePrice", "LicenseIncluded", "DisasterRecovery"]),
      ),
      clusterId: Schema.optional(Schema.String),
      extensionId: Schema.optional(Schema.String),
    }),
    extendedLocation: Schema.optional(
      Schema.Struct({
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.Literals(["CustomLocation"])),
      }),
    ),
    sku: Schema.optional(
      Schema.Struct({
        name: Schema.Literals(["vCore"]),
        tier: Schema.optional(
          Schema.Literals(["GeneralPurpose", "BusinessCritical"]),
        ),
        dev: Schema.optional(Schema.Boolean),
        size: Schema.optional(Schema.String),
        family: Schema.optional(Schema.String),
        capacity: Schema.optional(Schema.Number),
      }),
    ),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlManagedInstances/{sqlManagedInstanceName}",
    }),
  );
export type SqlManagedInstancesCreateInput =
  typeof SqlManagedInstancesCreateInput.Type;

// Output Schema
export const SqlManagedInstancesCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SqlManagedInstancesCreateOutput =
  typeof SqlManagedInstancesCreateOutput.Type;

// The operation
/**
 * Creates or replaces a SQL Managed Instance resource
 * @param properties - null
 * @param extendedLocation - The complex type of the extended location.
 * @param sku - Resource sku.
 */
export const SqlManagedInstancesCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlManagedInstancesCreateInput,
    outputSchema: SqlManagedInstancesCreateOutput,
  }),
);
// Input Schema
export const SqlManagedInstancesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlManagedInstances/{sqlManagedInstanceName}",
    }),
  );
export type SqlManagedInstancesDeleteInput =
  typeof SqlManagedInstancesDeleteInput.Type;

// Output Schema
export const SqlManagedInstancesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SqlManagedInstancesDeleteOutput =
  typeof SqlManagedInstancesDeleteOutput.Type;

// The operation
/**
 * Deletes a SQL Managed Instance resource
 */
export const SqlManagedInstancesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlManagedInstancesDeleteInput,
    outputSchema: SqlManagedInstancesDeleteOutput,
  }),
);
// Input Schema
export const SqlManagedInstancesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlManagedInstances/{sqlManagedInstanceName}",
    }),
  );
export type SqlManagedInstancesGetInput =
  typeof SqlManagedInstancesGetInput.Type;

// Output Schema
export const SqlManagedInstancesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SqlManagedInstancesGetOutput =
  typeof SqlManagedInstancesGetOutput.Type;

// The operation
/**
 * Retrieves a SQL Managed Instance resource
 */
export const SqlManagedInstancesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlManagedInstancesGetInput,
    outputSchema: SqlManagedInstancesGetOutput,
  }),
);
// Input Schema
export const SqlManagedInstancesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AzureArcData/sqlManagedInstances",
    }),
  );
export type SqlManagedInstancesListInput =
  typeof SqlManagedInstancesListInput.Type;

// Output Schema
export const SqlManagedInstancesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SqlManagedInstancesListOutput =
  typeof SqlManagedInstancesListOutput.Type;

// The operation
/**
 * List sqlManagedInstance resources in the subscription
 */
export const SqlManagedInstancesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlManagedInstancesListInput,
    outputSchema: SqlManagedInstancesListOutput,
  }),
);
// Input Schema
export const SqlManagedInstancesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlManagedInstances",
    }),
  );
export type SqlManagedInstancesListByResourceGroupInput =
  typeof SqlManagedInstancesListByResourceGroupInput.Type;

// Output Schema
export const SqlManagedInstancesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SqlManagedInstancesListByResourceGroupOutput =
  typeof SqlManagedInstancesListByResourceGroupOutput.Type;

// The operation
/**
 * List sqlManagedInstance resources in the resource group
 *
 * Gets all sqlManagedInstances in a resource group.
 */
export const SqlManagedInstancesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlManagedInstancesListByResourceGroupInput,
    outputSchema: SqlManagedInstancesListByResourceGroupOutput,
  }));
// Input Schema
export const SqlManagedInstancesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlManagedInstances/{sqlManagedInstanceName}",
    }),
  );
export type SqlManagedInstancesUpdateInput =
  typeof SqlManagedInstancesUpdateInput.Type;

// Output Schema
export const SqlManagedInstancesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SqlManagedInstancesUpdateOutput =
  typeof SqlManagedInstancesUpdateOutput.Type;

// The operation
/**
 * Updates a SQL Managed Instance resource
 * @param tags - Resource tags.
 */
export const SqlManagedInstancesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlManagedInstancesUpdateInput,
    outputSchema: SqlManagedInstancesUpdateOutput,
  }),
);
// Input Schema
export const SqlServerAvailabilityGroupsAddDatabasesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/availabilityGroups/{availabilityGroupName}/addDatabases",
    }),
  );
export type SqlServerAvailabilityGroupsAddDatabasesInput =
  typeof SqlServerAvailabilityGroupsAddDatabasesInput.Type;

// Output Schema
export const SqlServerAvailabilityGroupsAddDatabasesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SqlServerAvailabilityGroupsAddDatabasesOutput =
  typeof SqlServerAvailabilityGroupsAddDatabasesOutput.Type;

// The operation
/**
 * Request adding database(s) to an existing availability group.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const SqlServerAvailabilityGroupsAddDatabases =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlServerAvailabilityGroupsAddDatabasesInput,
    outputSchema: SqlServerAvailabilityGroupsAddDatabasesOutput,
  }));
// Input Schema
export const SqlServerAvailabilityGroupsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/availabilityGroups/{availabilityGroupName}",
    }),
  );
export type SqlServerAvailabilityGroupsCreateInput =
  typeof SqlServerAvailabilityGroupsCreateInput.Type;

// Output Schema
export const SqlServerAvailabilityGroupsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SqlServerAvailabilityGroupsCreateOutput =
  typeof SqlServerAvailabilityGroupsCreateOutput.Type;

// The operation
/**
 * Creates or replaces an Arc Sql Server Availability Group.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const SqlServerAvailabilityGroupsCreate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlServerAvailabilityGroupsCreateInput,
    outputSchema: SqlServerAvailabilityGroupsCreateOutput,
  }));
// Input Schema
export const SqlServerAvailabilityGroupsCreateAvailabilityGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/createAvailabilityGroup",
    }),
  );
export type SqlServerAvailabilityGroupsCreateAvailabilityGroupInput =
  typeof SqlServerAvailabilityGroupsCreateAvailabilityGroupInput.Type;

// Output Schema
export const SqlServerAvailabilityGroupsCreateAvailabilityGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SqlServerAvailabilityGroupsCreateAvailabilityGroupOutput =
  typeof SqlServerAvailabilityGroupsCreateAvailabilityGroupOutput.Type;

// The operation
/**
 * Create a SQL Server availability group
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const SqlServerAvailabilityGroupsCreateAvailabilityGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlServerAvailabilityGroupsCreateAvailabilityGroupInput,
    outputSchema: SqlServerAvailabilityGroupsCreateAvailabilityGroupOutput,
  }));
// Input Schema
export const SqlServerAvailabilityGroupsCreateDistributedAvailabilityGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/createDistributedAvailabilityGroup",
    }),
  );
export type SqlServerAvailabilityGroupsCreateDistributedAvailabilityGroupInput =
  typeof SqlServerAvailabilityGroupsCreateDistributedAvailabilityGroupInput.Type;

// Output Schema
export const SqlServerAvailabilityGroupsCreateDistributedAvailabilityGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SqlServerAvailabilityGroupsCreateDistributedAvailabilityGroupOutput =
  typeof SqlServerAvailabilityGroupsCreateDistributedAvailabilityGroupOutput.Type;

// The operation
/**
 * Create a SQL Server distributed availability group
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const SqlServerAvailabilityGroupsCreateDistributedAvailabilityGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      SqlServerAvailabilityGroupsCreateDistributedAvailabilityGroupInput,
    outputSchema:
      SqlServerAvailabilityGroupsCreateDistributedAvailabilityGroupOutput,
  }));
// Input Schema
export const SqlServerAvailabilityGroupsCreateManagedInstanceLinkInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/createManagedInstanceLink",
    }),
  );
export type SqlServerAvailabilityGroupsCreateManagedInstanceLinkInput =
  typeof SqlServerAvailabilityGroupsCreateManagedInstanceLinkInput.Type;

// Output Schema
export const SqlServerAvailabilityGroupsCreateManagedInstanceLinkOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SqlServerAvailabilityGroupsCreateManagedInstanceLinkOutput =
  typeof SqlServerAvailabilityGroupsCreateManagedInstanceLinkOutput.Type;

// The operation
/**
 * Create an Managed Instance Link
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SqlServerAvailabilityGroupsCreateManagedInstanceLink =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlServerAvailabilityGroupsCreateManagedInstanceLinkInput,
    outputSchema: SqlServerAvailabilityGroupsCreateManagedInstanceLinkOutput,
  }));
// Input Schema
export const SqlServerAvailabilityGroupsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/availabilityGroups/{availabilityGroupName}",
    }),
  );
export type SqlServerAvailabilityGroupsDeleteInput =
  typeof SqlServerAvailabilityGroupsDeleteInput.Type;

// Output Schema
export const SqlServerAvailabilityGroupsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SqlServerAvailabilityGroupsDeleteOutput =
  typeof SqlServerAvailabilityGroupsDeleteOutput.Type;

// The operation
/**
 * Deletes an Arc Sql Server availability group resource.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const SqlServerAvailabilityGroupsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlServerAvailabilityGroupsDeleteInput,
    outputSchema: SqlServerAvailabilityGroupsDeleteOutput,
  }));
// Input Schema
export const SqlServerAvailabilityGroupsDeleteMiLinkInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/availabilityGroups/{availabilityGroupName}/deleteMiLink",
    }),
  );
export type SqlServerAvailabilityGroupsDeleteMiLinkInput =
  typeof SqlServerAvailabilityGroupsDeleteMiLinkInput.Type;

// Output Schema
export const SqlServerAvailabilityGroupsDeleteMiLinkOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SqlServerAvailabilityGroupsDeleteMiLinkOutput =
  typeof SqlServerAvailabilityGroupsDeleteMiLinkOutput.Type;

// The operation
/**
 * Deletes the MI Link between an Azure Arc-enabled SQL Server and an Azure SQL Managed Instance.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SqlServerAvailabilityGroupsDeleteMiLink =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlServerAvailabilityGroupsDeleteMiLinkInput,
    outputSchema: SqlServerAvailabilityGroupsDeleteMiLinkOutput,
  }));
// Input Schema
export const SqlServerAvailabilityGroupsDetailViewInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/availabilityGroups/{availabilityGroupName}/getDetailView",
    }),
  );
export type SqlServerAvailabilityGroupsDetailViewInput =
  typeof SqlServerAvailabilityGroupsDetailViewInput.Type;

// Output Schema
export const SqlServerAvailabilityGroupsDetailViewOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SqlServerAvailabilityGroupsDetailViewOutput =
  typeof SqlServerAvailabilityGroupsDetailViewOutput.Type;

// The operation
/**
 * Retrieves detailed properties of the Availability Group.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const SqlServerAvailabilityGroupsDetailView =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlServerAvailabilityGroupsDetailViewInput,
    outputSchema: SqlServerAvailabilityGroupsDetailViewOutput,
  }));
// Input Schema
export const SqlServerAvailabilityGroupsFailoverInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/availabilityGroups/{availabilityGroupName}/failover",
    }),
  );
export type SqlServerAvailabilityGroupsFailoverInput =
  typeof SqlServerAvailabilityGroupsFailoverInput.Type;

// Output Schema
export const SqlServerAvailabilityGroupsFailoverOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SqlServerAvailabilityGroupsFailoverOutput =
  typeof SqlServerAvailabilityGroupsFailoverOutput.Type;

// The operation
/**
 * Request manual failover of the availability group to this server.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const SqlServerAvailabilityGroupsFailover =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlServerAvailabilityGroupsFailoverInput,
    outputSchema: SqlServerAvailabilityGroupsFailoverOutput,
  }));
// Input Schema
export const SqlServerAvailabilityGroupsFailoverMiLinkInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/availabilityGroups/{availabilityGroupName}/failoverMiLink",
    }),
  );
export type SqlServerAvailabilityGroupsFailoverMiLinkInput =
  typeof SqlServerAvailabilityGroupsFailoverMiLinkInput.Type;

// Output Schema
export const SqlServerAvailabilityGroupsFailoverMiLinkOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SqlServerAvailabilityGroupsFailoverMiLinkOutput =
  typeof SqlServerAvailabilityGroupsFailoverMiLinkOutput.Type;

// The operation
/**
 * Request failover of Arc Sql Server to Azure Managed Instance.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SqlServerAvailabilityGroupsFailoverMiLink =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlServerAvailabilityGroupsFailoverMiLinkInput,
    outputSchema: SqlServerAvailabilityGroupsFailoverMiLinkOutput,
  }));
// Input Schema
export const SqlServerAvailabilityGroupsForceFailoverAllowDataLossInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/availabilityGroups/{availabilityGroupName}/forceFailoverAllowDataLoss",
    }),
  );
export type SqlServerAvailabilityGroupsForceFailoverAllowDataLossInput =
  typeof SqlServerAvailabilityGroupsForceFailoverAllowDataLossInput.Type;

// Output Schema
export const SqlServerAvailabilityGroupsForceFailoverAllowDataLossOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SqlServerAvailabilityGroupsForceFailoverAllowDataLossOutput =
  typeof SqlServerAvailabilityGroupsForceFailoverAllowDataLossOutput.Type;

// The operation
/**
 * Request forced failover of the availability group to this server.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const SqlServerAvailabilityGroupsForceFailoverAllowDataLoss =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlServerAvailabilityGroupsForceFailoverAllowDataLossInput,
    outputSchema: SqlServerAvailabilityGroupsForceFailoverAllowDataLossOutput,
  }));
// Input Schema
export const SqlServerAvailabilityGroupsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/availabilityGroups/{availabilityGroupName}",
    }),
  );
export type SqlServerAvailabilityGroupsGetInput =
  typeof SqlServerAvailabilityGroupsGetInput.Type;

// Output Schema
export const SqlServerAvailabilityGroupsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SqlServerAvailabilityGroupsGetOutput =
  typeof SqlServerAvailabilityGroupsGetOutput.Type;

// The operation
/**
 * Retrieves an Arc Sql Server availability group.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const SqlServerAvailabilityGroupsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlServerAvailabilityGroupsGetInput,
    outputSchema: SqlServerAvailabilityGroupsGetOutput,
  }));
// Input Schema
export const SqlServerAvailabilityGroupsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/availabilityGroups",
    }),
  );
export type SqlServerAvailabilityGroupsListInput =
  typeof SqlServerAvailabilityGroupsListInput.Type;

// Output Schema
export const SqlServerAvailabilityGroupsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SqlServerAvailabilityGroupsListOutput =
  typeof SqlServerAvailabilityGroupsListOutput.Type;

// The operation
/**
 * List the availability group associated with the given Arc Sql Server.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const SqlServerAvailabilityGroupsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlServerAvailabilityGroupsListInput,
    outputSchema: SqlServerAvailabilityGroupsListOutput,
  }));
// Input Schema
export const SqlServerAvailabilityGroupsRemoveDatabasesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/availabilityGroups/{availabilityGroupName}/removeDatabases",
    }),
  );
export type SqlServerAvailabilityGroupsRemoveDatabasesInput =
  typeof SqlServerAvailabilityGroupsRemoveDatabasesInput.Type;

// Output Schema
export const SqlServerAvailabilityGroupsRemoveDatabasesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SqlServerAvailabilityGroupsRemoveDatabasesOutput =
  typeof SqlServerAvailabilityGroupsRemoveDatabasesOutput.Type;

// The operation
/**
 * Request removing database(s) from an existing availability group.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const SqlServerAvailabilityGroupsRemoveDatabases =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlServerAvailabilityGroupsRemoveDatabasesInput,
    outputSchema: SqlServerAvailabilityGroupsRemoveDatabasesOutput,
  }));
// Input Schema
export const SqlServerAvailabilityGroupsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/availabilityGroups/{availabilityGroupName}",
    }),
  );
export type SqlServerAvailabilityGroupsUpdateInput =
  typeof SqlServerAvailabilityGroupsUpdateInput.Type;

// Output Schema
export const SqlServerAvailabilityGroupsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SqlServerAvailabilityGroupsUpdateOutput =
  typeof SqlServerAvailabilityGroupsUpdateOutput.Type;

// The operation
/**
 * Updates an existing Availability Group.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const SqlServerAvailabilityGroupsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlServerAvailabilityGroupsUpdateInput,
    outputSchema: SqlServerAvailabilityGroupsUpdateOutput,
  }));
// Input Schema
export const SqlServerDatabasesCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/databases/{databaseName}",
    }),
  );
export type SqlServerDatabasesCreateInput =
  typeof SqlServerDatabasesCreateInput.Type;

// Output Schema
export const SqlServerDatabasesCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SqlServerDatabasesCreateOutput =
  typeof SqlServerDatabasesCreateOutput.Type;

// The operation
/**
 * Creates or replaces an Arc Sql Server Database.
 */
export const SqlServerDatabasesCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlServerDatabasesCreateInput,
    outputSchema: SqlServerDatabasesCreateOutput,
  }),
);
// Input Schema
export const SqlServerDatabasesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/databases/{databaseName}",
    }),
  );
export type SqlServerDatabasesDeleteInput =
  typeof SqlServerDatabasesDeleteInput.Type;

// Output Schema
export const SqlServerDatabasesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SqlServerDatabasesDeleteOutput =
  typeof SqlServerDatabasesDeleteOutput.Type;

// The operation
/**
 * Deletes an Arc Sql Server database resource.
 */
export const SqlServerDatabasesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlServerDatabasesDeleteInput,
    outputSchema: SqlServerDatabasesDeleteOutput,
  }),
);
// Input Schema
export const SqlServerDatabasesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/databases/{databaseName}",
    }),
  );
export type SqlServerDatabasesGetInput = typeof SqlServerDatabasesGetInput.Type;

// Output Schema
export const SqlServerDatabasesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SqlServerDatabasesGetOutput =
  typeof SqlServerDatabasesGetOutput.Type;

// The operation
/**
 * Retrieves an Arc Sql Server database.
 */
export const SqlServerDatabasesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlServerDatabasesGetInput,
    outputSchema: SqlServerDatabasesGetOutput,
  }),
);
// Input Schema
export const SqlServerDatabasesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/databases",
    }),
  );
export type SqlServerDatabasesListInput =
  typeof SqlServerDatabasesListInput.Type;

// Output Schema
export const SqlServerDatabasesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SqlServerDatabasesListOutput =
  typeof SqlServerDatabasesListOutput.Type;

// The operation
/**
 * List the databases associated with the given Arc Sql Server.
 */
export const SqlServerDatabasesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlServerDatabasesListInput,
    outputSchema: SqlServerDatabasesListOutput,
  }),
);
// Input Schema
export const SqlServerDatabasesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/databases/{databaseName}",
    }),
  );
export type SqlServerDatabasesUpdateInput =
  typeof SqlServerDatabasesUpdateInput.Type;

// Output Schema
export const SqlServerDatabasesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SqlServerDatabasesUpdateOutput =
  typeof SqlServerDatabasesUpdateOutput.Type;

// The operation
/**
 * Updates an existing database.
 */
export const SqlServerDatabasesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlServerDatabasesUpdateInput,
    outputSchema: SqlServerDatabasesUpdateOutput,
  }),
);
// Input Schema
export const SqlServerEsuLicensesCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerEsuLicenses/{sqlServerEsuLicenseName}",
    }),
  );
export type SqlServerEsuLicensesCreateInput =
  typeof SqlServerEsuLicensesCreateInput.Type;

// Output Schema
export const SqlServerEsuLicensesCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SqlServerEsuLicensesCreateOutput =
  typeof SqlServerEsuLicensesCreateOutput.Type;

// The operation
/**
 * Creates or replaces a SQL Server ESU license resource
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SqlServerEsuLicensesCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlServerEsuLicensesCreateInput,
    outputSchema: SqlServerEsuLicensesCreateOutput,
  }),
);
// Input Schema
export const SqlServerEsuLicensesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerEsuLicenses/{sqlServerEsuLicenseName}",
    }),
  );
export type SqlServerEsuLicensesDeleteInput =
  typeof SqlServerEsuLicensesDeleteInput.Type;

// Output Schema
export const SqlServerEsuLicensesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SqlServerEsuLicensesDeleteOutput =
  typeof SqlServerEsuLicensesDeleteOutput.Type;

// The operation
/**
 * Deletes a SQL Server ESU license resource
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SqlServerEsuLicensesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlServerEsuLicensesDeleteInput,
    outputSchema: SqlServerEsuLicensesDeleteOutput,
  }),
);
// Input Schema
export const SqlServerEsuLicensesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerEsuLicenses/{sqlServerEsuLicenseName}",
    }),
  );
export type SqlServerEsuLicensesGetInput =
  typeof SqlServerEsuLicensesGetInput.Type;

// Output Schema
export const SqlServerEsuLicensesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SqlServerEsuLicensesGetOutput =
  typeof SqlServerEsuLicensesGetOutput.Type;

// The operation
/**
 * Retrieves a SQL Server ESU license resource
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SqlServerEsuLicensesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlServerEsuLicensesGetInput,
    outputSchema: SqlServerEsuLicensesGetOutput,
  }),
);
// Input Schema
export const SqlServerEsuLicensesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AzureArcData/sqlServerEsuLicenses",
    }),
  );
export type SqlServerEsuLicensesListInput =
  typeof SqlServerEsuLicensesListInput.Type;

// Output Schema
export const SqlServerEsuLicensesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SqlServerEsuLicensesListOutput =
  typeof SqlServerEsuLicensesListOutput.Type;

// The operation
/**
 * List sqlServerEsuLicense resources in the subscription
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const SqlServerEsuLicensesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlServerEsuLicensesListInput,
    outputSchema: SqlServerEsuLicensesListOutput,
  }),
);
// Input Schema
export const SqlServerEsuLicensesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerEsuLicenses",
    }),
  );
export type SqlServerEsuLicensesListByResourceGroupInput =
  typeof SqlServerEsuLicensesListByResourceGroupInput.Type;

// Output Schema
export const SqlServerEsuLicensesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SqlServerEsuLicensesListByResourceGroupOutput =
  typeof SqlServerEsuLicensesListByResourceGroupOutput.Type;

// The operation
/**
 * List sqlServerEsuLicense resources in the resource group
 *
 * Gets all sqlServerEsuLicenses in a resource group.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SqlServerEsuLicensesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlServerEsuLicensesListByResourceGroupInput,
    outputSchema: SqlServerEsuLicensesListByResourceGroupOutput,
  }));
// Input Schema
export const SqlServerEsuLicensesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerEsuLicenses/{sqlServerEsuLicenseName}",
    }),
  );
export type SqlServerEsuLicensesUpdateInput =
  typeof SqlServerEsuLicensesUpdateInput.Type;

// Output Schema
export const SqlServerEsuLicensesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SqlServerEsuLicensesUpdateOutput =
  typeof SqlServerEsuLicensesUpdateOutput.Type;

// The operation
/**
 * Updates a SQL Server ESU license resource
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SqlServerEsuLicensesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlServerEsuLicensesUpdateInput,
    outputSchema: SqlServerEsuLicensesUpdateOutput,
  }),
);
// Input Schema
export const SqlServerInstancesCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.optional(
      Schema.Struct({
        version: Schema.optional(
          Schema.Literals([
            "Unknown",
            "SQL Server 2012",
            "SQL Server 2014",
            "SQL Server 2016",
            "SQL Server 2017",
            "SQL Server 2019",
            "SQL Server 2022",
            "SQL Server 2025",
          ]),
        ),
        edition: Schema.optional(
          Schema.Literals([
            "Evaluation",
            "Enterprise",
            "Standard",
            "Web",
            "Developer",
            "Express",
            "Business Intelligence",
            "Standard Developer",
          ]),
        ),
        containerResourceId: Schema.optional(Schema.String),
        vmId: Schema.optional(Schema.String),
        createTime: Schema.optional(Schema.String),
        vCore: Schema.optional(Schema.String),
        cores: Schema.optional(Schema.String),
        status: Schema.optional(
          Schema.Literals([
            "Connected",
            "Disconnected",
            "Registered",
            "Unknown",
          ]),
        ),
        patchLevel: Schema.optional(Schema.String),
        collation: Schema.optional(Schema.String),
        dbMasterKeyExists: Schema.optional(Schema.Boolean),
        isHadrEnabled: Schema.optional(Schema.Boolean),
        traceFlags: Schema.optional(Schema.Array(Schema.Number)),
        currentVersion: Schema.optional(Schema.String),
        instanceName: Schema.optional(Schema.String),
        tcpDynamicPorts: Schema.optional(Schema.String),
        tcpStaticPorts: Schema.optional(Schema.String),
        productId: Schema.optional(Schema.String),
        licenseType: Schema.optional(
          Schema.Literals([
            "Undefined",
            "Free",
            "HADR",
            "ServerCAL",
            "LicenseOnly",
            "PAYG",
            "Paid",
            "FabricCapacity",
          ]),
        ),
        azureDefenderStatusLastUpdated: Schema.optional(Schema.String),
        azureDefenderStatus: Schema.optional(
          Schema.Literals(["Protected", "Unprotected", "Unknown"]),
        ),
        provisioningState: Schema.optional(Schema.String),
        lastInventoryUploadTime: Schema.optional(Schema.String),
        lastUsageUploadTime: Schema.optional(Schema.String),
        hostType: Schema.optional(
          Schema.Literals([
            "Azure Virtual Machine",
            "Azure VMWare Virtual Machine",
            "Azure Kubernetes Service",
            "AWS VMWare Virtual Machine",
            "AWS Kubernetes Service",
            "GCP VMWare Virtual Machine",
            "GCP Kubernetes Service",
            "Container",
            "Virtual Machine",
            "Physical Server",
            "AWS Virtual Machine",
            "GCP Virtual Machine",
            "Other",
          ]),
        ),
        alwaysOnRole: Schema.optional(
          Schema.Literals([
            "None",
            "FailoverClusterInstance",
            "FailoverClusterNode",
            "AvailabilityGroupReplica",
          ]),
        ),
        databaseMirroringEndpoint: Schema.optional(
          Schema.Struct({
            endpointName: Schema.optional(Schema.String),
            role: Schema.optional(
              Schema.Literals(["NONE", "PARTNER", "WITNESS", "ALL"]),
            ),
            isEncryptionEnabled: Schema.optional(Schema.Boolean),
            encryptionAlgorithm: Schema.optional(
              Schema.Literals([
                "NONE",
                "RC4",
                "AES",
                "NONE, RC4",
                "NONE, AES",
                "RC4, AES",
                "AES, RC4",
                "NONE, RC4, AES",
                "NONE, AES, RC4",
              ]),
            ),
            connectionAuth: Schema.optional(
              Schema.Literals([
                "Windows_NTLM",
                "Windows_Kerberos",
                "Windows_Negotiate",
                "Certificate",
                "Windows_NTLM_Certificate",
                "Windows_Kerberos_Certificate",
                "Windows_Negotiate_Certificate",
                "Certificate_Windows_NTLM",
                "Certificate_Windows_Kerberos",
                "Certificate_Windows_Negotiate",
              ]),
            ),
            port: Schema.optional(Schema.Number),
            isDynamicPort: Schema.optional(Schema.Boolean),
            ipAddress: Schema.optional(Schema.String),
            certificateName: Schema.optional(Schema.String),
            certificateExpiryDate: Schema.optional(Schema.String),
          }),
        ),
        failoverCluster: Schema.optional(
          Schema.Struct({
            id: Schema.optional(Schema.String),
            networkName: Schema.optional(Schema.String),
            sqlInstanceIds: Schema.optional(Schema.Array(Schema.String)),
            hostNames: Schema.optional(Schema.Array(Schema.String)),
            hostIPAddresses: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  ipAddress: Schema.optional(Schema.String),
                  subnetMask: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
        ),
        backupPolicy: Schema.optional(
          Schema.Struct({
            retentionPeriodDays: Schema.optional(Schema.Number),
            fullBackupDays: Schema.optional(Schema.Number),
            differentialBackupHours: Schema.optional(
              Schema.Literals(["12", "24"]),
            ),
            transactionLogBackupMinutes: Schema.optional(Schema.Number),
          }),
        ),
        upgradeLockedUntil: Schema.optional(Schema.String),
        monitoring: Schema.optional(
          Schema.Struct({
            enabled: Schema.optional(Schema.Boolean),
          }),
        ),
        migration: Schema.optional(
          Schema.Struct({
            assessment: Schema.optional(
              Schema.Struct({
                enabled: Schema.optional(Schema.Boolean),
                assessmentUploadTime: Schema.optional(Schema.String),
                version: Schema.optional(Schema.String),
                settings: Schema.optional(
                  Schema.Struct({
                    targetLocation: Schema.optional(Schema.String),
                    percentile: Schema.optional(Schema.Number),
                    lookbackPeriodInDays: Schema.optional(Schema.Number),
                    strategy: Schema.optional(Schema.String),
                    currency: Schema.optional(Schema.String),
                    discountPercentage: Schema.optional(Schema.Number),
                    costOptions: Schema.optional(
                      Schema.Struct({
                        computeAndStorageCostOption: Schema.optional(
                          Schema.String,
                        ),
                        sqlLicenseCostOption: Schema.optional(Schema.String),
                        windowsLicenseCostOption: Schema.optional(
                          Schema.String,
                        ),
                      }),
                    ),
                  }),
                ),
                serverAssessments: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      appliesToMigrationTargetPlatform: Schema.optional(
                        Schema.String,
                      ),
                      featureId: Schema.optional(Schema.String),
                      impactedObjects: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            impactDetail: Schema.optional(Schema.String),
                            name: Schema.optional(Schema.String),
                            objectType: Schema.optional(Schema.String),
                          }),
                        ),
                      ),
                      issueCategory: Schema.optional(Schema.String),
                      moreInformation: Schema.optional(Schema.String),
                    }),
                  ),
                ),
                skuRecommendationResults: Schema.optional(
                  Schema.Struct({
                    azureSqlDatabase: Schema.optional(
                      Schema.Struct({
                        recommendationStatus: Schema.optional(
                          Schema.Literals([
                            "NotReady",
                            "Ready",
                            "ReadyWithConditions",
                            "Unknown",
                          ]),
                        ),
                        numberOfServerBlockerIssues: Schema.optional(
                          Schema.Number,
                        ),
                        monthlyCost: Schema.optional(
                          Schema.Struct({
                            computeCost: Schema.optional(Schema.Number),
                            storageCost: Schema.optional(Schema.Number),
                            iopsCost: Schema.optional(Schema.Number),
                            sqlLicenseCost: Schema.optional(Schema.Number),
                            windowsLicenseCost: Schema.optional(Schema.Number),
                            totalCost: Schema.optional(Schema.Number),
                          }),
                        ),
                        monthlyCostOptions: Schema.optional(
                          Schema.Array(
                            Schema.Struct({
                              keyName: Schema.optional(Schema.String),
                              keyValue: Schema.optional(
                                Schema.Struct({
                                  computeCost: Schema.optional(Schema.Number),
                                  storageCost: Schema.optional(Schema.Number),
                                  iopsCost: Schema.optional(Schema.Number),
                                }),
                              ),
                            }),
                          ),
                        ),
                        targetSku: Schema.optional(
                          Schema.Struct({
                            category: Schema.optional(
                              Schema.Struct({
                                computeTier: Schema.optional(Schema.String),
                                hardwareType: Schema.optional(Schema.String),
                                sqlPurchasingModel: Schema.optional(
                                  Schema.String,
                                ),
                                sqlServiceTier: Schema.optional(Schema.String),
                                zoneRedundancyAvailable: Schema.optional(
                                  Schema.Boolean,
                                ),
                              }),
                            ),
                            computeSize: Schema.optional(Schema.Number),
                            storageMaxSizeInMb: Schema.optional(Schema.Number),
                            predictedDataSizeInMb: Schema.optional(
                              Schema.Number,
                            ),
                            predictedLogSizeInMb: Schema.optional(
                              Schema.Number,
                            ),
                            maxStorageIops: Schema.optional(Schema.Number),
                            maxThroughputMBps: Schema.optional(Schema.Number),
                          }),
                        ),
                      }),
                    ),
                    azureSqlManagedInstance: Schema.optional(
                      Schema.Struct({
                        recommendationStatus: Schema.optional(
                          Schema.Literals([
                            "NotReady",
                            "Ready",
                            "ReadyWithConditions",
                            "Unknown",
                          ]),
                        ),
                        numberOfServerBlockerIssues: Schema.optional(
                          Schema.Number,
                        ),
                        monthlyCost: Schema.optional(
                          Schema.Struct({
                            computeCost: Schema.optional(Schema.Number),
                            storageCost: Schema.optional(Schema.Number),
                            iopsCost: Schema.optional(Schema.Number),
                            sqlLicenseCost: Schema.optional(Schema.Number),
                            windowsLicenseCost: Schema.optional(Schema.Number),
                            totalCost: Schema.optional(Schema.Number),
                          }),
                        ),
                        monthlyCostOptions: Schema.optional(
                          Schema.Array(
                            Schema.Struct({
                              keyName: Schema.optional(Schema.String),
                              keyValue: Schema.optional(
                                Schema.Struct({
                                  computeCost: Schema.optional(Schema.Number),
                                  storageCost: Schema.optional(Schema.Number),
                                  iopsCost: Schema.optional(Schema.Number),
                                }),
                              ),
                            }),
                          ),
                        ),
                        targetSku: Schema.optional(
                          Schema.Struct({
                            category: Schema.optional(
                              Schema.Struct({
                                computeTier: Schema.optional(Schema.String),
                                hardwareType: Schema.optional(Schema.String),
                                sqlPurchasingModel: Schema.optional(
                                  Schema.String,
                                ),
                                sqlServiceTier: Schema.optional(Schema.String),
                                zoneRedundancyAvailable: Schema.optional(
                                  Schema.Boolean,
                                ),
                              }),
                            ),
                            computeSize: Schema.optional(Schema.Number),
                            storageMaxSizeInMb: Schema.optional(Schema.Number),
                            predictedDataSizeInMb: Schema.optional(
                              Schema.Number,
                            ),
                            predictedLogSizeInMb: Schema.optional(
                              Schema.Number,
                            ),
                            maxStorageIops: Schema.optional(Schema.Number),
                            maxThroughputMBps: Schema.optional(Schema.Number),
                          }),
                        ),
                      }),
                    ),
                    azureSqlVirtualMachine: Schema.optional(
                      Schema.Struct({
                        recommendationStatus: Schema.optional(
                          Schema.Literals([
                            "NotReady",
                            "Ready",
                            "ReadyWithConditions",
                            "Unknown",
                          ]),
                        ),
                        numberOfServerBlockerIssues: Schema.optional(
                          Schema.Number,
                        ),
                        monthlyCost: Schema.optional(
                          Schema.Struct({
                            computeCost: Schema.optional(Schema.Number),
                            storageCost: Schema.optional(Schema.Number),
                            iopsCost: Schema.optional(Schema.Number),
                            sqlLicenseCost: Schema.optional(Schema.Number),
                            windowsLicenseCost: Schema.optional(Schema.Number),
                            totalCost: Schema.optional(Schema.Number),
                          }),
                        ),
                        monthlyCostOptions: Schema.optional(
                          Schema.Array(
                            Schema.Struct({
                              keyName: Schema.optional(Schema.String),
                              keyValue: Schema.optional(
                                Schema.Struct({
                                  computeCost: Schema.optional(Schema.Number),
                                  storageCost: Schema.optional(Schema.Number),
                                  iopsCost: Schema.optional(Schema.Number),
                                }),
                              ),
                            }),
                          ),
                        ),
                        targetSku: Schema.optional(
                          Schema.Struct({
                            category: Schema.optional(
                              Schema.Struct({
                                availableVmSkus: Schema.optional(
                                  Schema.Array(Schema.String),
                                ),
                                virtualMachineFamily: Schema.optional(
                                  Schema.String,
                                ),
                              }),
                            ),
                            computeSize: Schema.optional(Schema.Number),
                            predictedDataSizeInMb: Schema.optional(
                              Schema.Number,
                            ),
                            predictedLogSizeInMb: Schema.optional(
                              Schema.Number,
                            ),
                            virtualMachineSize: Schema.optional(
                              Schema.Struct({
                                virtualMachineFamily: Schema.optional(
                                  Schema.String,
                                ),
                                sizeName: Schema.optional(Schema.String),
                                computeSize: Schema.optional(Schema.Number),
                                azureSkuName: Schema.optional(Schema.String),
                                vCPUsAvailable: Schema.optional(Schema.Number),
                                maxNetworkInterfaces: Schema.optional(
                                  Schema.Number,
                                ),
                              }),
                            ),
                            dataDiskSizes: Schema.optional(
                              Schema.Array(
                                Schema.Struct({
                                  diskType: Schema.optional(Schema.String),
                                  redundancy: Schema.optional(Schema.String),
                                  size: Schema.optional(Schema.String),
                                  caching: Schema.optional(Schema.String),
                                  maxSizeInGib: Schema.optional(Schema.Number),
                                  maxThroughputInMbps: Schema.optional(
                                    Schema.Number,
                                  ),
                                  maxIops: Schema.optional(Schema.Number),
                                }),
                              ),
                            ),
                            logDiskSizes: Schema.optional(
                              Schema.Array(
                                Schema.Struct({
                                  diskType: Schema.optional(Schema.String),
                                  redundancy: Schema.optional(Schema.String),
                                  size: Schema.optional(Schema.String),
                                  caching: Schema.optional(Schema.String),
                                  maxSizeInGib: Schema.optional(Schema.Number),
                                  maxThroughputInMbps: Schema.optional(
                                    Schema.Number,
                                  ),
                                  maxIops: Schema.optional(Schema.Number),
                                }),
                              ),
                            ),
                            tempDbDiskSizes: Schema.optional(
                              Schema.Array(
                                Schema.Struct({
                                  diskType: Schema.optional(Schema.String),
                                  redundancy: Schema.optional(Schema.String),
                                  size: Schema.optional(Schema.String),
                                  caching: Schema.optional(Schema.String),
                                  maxSizeInGib: Schema.optional(Schema.Number),
                                  maxThroughputInMbps: Schema.optional(
                                    Schema.Number,
                                  ),
                                  maxIops: Schema.optional(Schema.Number),
                                }),
                              ),
                            ),
                          }),
                        ),
                      }),
                    ),
                  }),
                ),
                impactedObjectsSummary: Schema.optional(
                  Schema.Struct({
                    azureSqlDatabase: Schema.optional(
                      Schema.Array(
                        Schema.Struct({
                          featureId: Schema.optional(Schema.String),
                          numberImpacted: Schema.optional(Schema.Number),
                          issueCategory: Schema.optional(Schema.String),
                        }),
                      ),
                    ),
                    azureSqlManagedInstance: Schema.optional(
                      Schema.Array(
                        Schema.Struct({
                          featureId: Schema.optional(Schema.String),
                          numberImpacted: Schema.optional(Schema.Number),
                          issueCategory: Schema.optional(Schema.String),
                        }),
                      ),
                    ),
                  }),
                ),
              }),
            ),
          }),
        ),
        bestPracticesAssessment: Schema.optional(
          Schema.Struct({
            enabled: Schema.optional(Schema.Boolean),
            schedule: Schema.optional(
              Schema.Struct({
                enabled: Schema.optional(Schema.Boolean),
                cronTrigger: Schema.optional(
                  Schema.Struct({
                    startTime: Schema.optional(Schema.String),
                    timeZone: Schema.optional(Schema.String),
                    expression: Schema.optional(Schema.String),
                  }),
                ),
              }),
            ),
          }),
        ),
        clientConnection: Schema.optional(
          Schema.Struct({
            enabled: Schema.optional(Schema.Boolean),
          }),
        ),
        serviceType: Schema.optional(
          Schema.Literals(["Engine", "SSRS", "SSAS", "SSIS", "PBIRS"]),
        ),
        maxServerMemoryMB: Schema.optional(Schema.Number),
        isMicrosoftPkiCertTrustConfigured: Schema.optional(Schema.Boolean),
        isDigiCertPkiCertTrustConfigured: Schema.optional(Schema.Boolean),
        authentication: Schema.optional(
          Schema.Struct({
            mode: Schema.optional(
              Schema.Literals(["Mixed", "Windows", "Undefined"]),
            ),
            sqlServerEntraIdentity: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  identityType: Schema.optional(
                    Schema.Literals([
                      "SystemAssignedManagedIdentity",
                      "UserAssignedManagedIdentity",
                    ]),
                  ),
                  clientId: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
        ),
      }),
    ),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}",
    }),
  );
export type SqlServerInstancesCreateInput =
  typeof SqlServerInstancesCreateInput.Type;

// Output Schema
export const SqlServerInstancesCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SqlServerInstancesCreateOutput =
  typeof SqlServerInstancesCreateOutput.Type;

// The operation
/**
 * Creates or replaces a SQL Server Instance resource
 * @param properties - null
 */
export const SqlServerInstancesCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlServerInstancesCreateInput,
    outputSchema: SqlServerInstancesCreateOutput,
  }),
);
// Input Schema
export const SqlServerInstancesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}",
    }),
  );
export type SqlServerInstancesDeleteInput =
  typeof SqlServerInstancesDeleteInput.Type;

// Output Schema
export const SqlServerInstancesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SqlServerInstancesDeleteOutput =
  typeof SqlServerInstancesDeleteOutput.Type;

// The operation
/**
 * Deletes a SQL Server Instance resource
 */
export const SqlServerInstancesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlServerInstancesDeleteInput,
    outputSchema: SqlServerInstancesDeleteOutput,
  }),
);
// Input Schema
export const SqlServerInstancesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}",
    }),
  );
export type SqlServerInstancesGetInput = typeof SqlServerInstancesGetInput.Type;

// Output Schema
export const SqlServerInstancesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SqlServerInstancesGetOutput =
  typeof SqlServerInstancesGetOutput.Type;

// The operation
/**
 * Retrieves a SQL Server Instance resource
 */
export const SqlServerInstancesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlServerInstancesGetInput,
    outputSchema: SqlServerInstancesGetOutput,
  }),
);
// Input Schema
export const SqlServerInstancesGetAllAvailabilityGroupsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/getAllAvailabilityGroups",
    }),
  );
export type SqlServerInstancesGetAllAvailabilityGroupsInput =
  typeof SqlServerInstancesGetAllAvailabilityGroupsInput.Type;

// Output Schema
export const SqlServerInstancesGetAllAvailabilityGroupsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SqlServerInstancesGetAllAvailabilityGroupsOutput =
  typeof SqlServerInstancesGetAllAvailabilityGroupsOutput.Type;

// The operation
/**
 * Retrieves full properties of all the Availability Groups in a SQL Server instance.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const SqlServerInstancesGetAllAvailabilityGroups =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlServerInstancesGetAllAvailabilityGroupsInput,
    outputSchema: SqlServerInstancesGetAllAvailabilityGroupsOutput,
  }));
// Input Schema
export const SqlServerInstancesGetBestPracticesAssessmentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    reportType: Schema.optional(
      Schema.Literals(["AssessmentDataPoint", "AssessmentSummary"]),
    ),
    reportId: Schema.optional(Schema.String),
    skipToken: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/getBestPracticesAssessment",
    }),
  );
export type SqlServerInstancesGetBestPracticesAssessmentInput =
  typeof SqlServerInstancesGetBestPracticesAssessmentInput.Type;

// Output Schema
export const SqlServerInstancesGetBestPracticesAssessmentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    columns: Schema.Array(
      Schema.Struct({
        name: Schema.optional(Schema.String),
        type: Schema.optional(
          Schema.Literals([
            "bool",
            "datetime",
            "int",
            "long",
            "double",
            "string",
            "guid",
            "timespan",
          ]),
        ),
      }),
    ),
    rows: Schema.Array(Schema.Array(Schema.String)),
    nextLink: Schema.optional(Schema.String),
  });
export type SqlServerInstancesGetBestPracticesAssessmentOutput =
  typeof SqlServerInstancesGetBestPracticesAssessmentOutput.Type;

// The operation
/**
 * Retrieves SQL best practices assessment results for the SQL Server instance.
 * @param reportType - The report type that needs to be fetched. If not specified, the default is AssessmentSummary.
 * @param reportId - The GUID of the report to return best practices assessment results for. If not specified, summaries for all reports will be returned.
 * @param skipToken - The opaque token to use to skip to a specific page of the report. If not specified, the first page will be returned.
 */
export const SqlServerInstancesGetBestPracticesAssessment =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlServerInstancesGetBestPracticesAssessmentInput,
    outputSchema: SqlServerInstancesGetBestPracticesAssessmentOutput,
  }));
// Input Schema
export const SqlServerInstancesGetJobsStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    featureName: Schema.optional(Schema.String),
    jobType: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/getJobsStatus",
    }),
  );
export type SqlServerInstancesGetJobsStatusInput =
  typeof SqlServerInstancesGetJobsStatusInput.Type;

// Output Schema
export const SqlServerInstancesGetJobsStatusOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    jobsStatus: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          instanceName: Schema.optional(Schema.String),
          jobStatus: Schema.optional(
            Schema.Literals([
              "NotStarted",
              "InProgress",
              "Succeeded",
              "Failed",
            ]),
          ),
          jobException: Schema.optional(Schema.String),
          backgroundJob: Schema.optional(
            Schema.Struct({
              state: Schema.optional(
                Schema.Literals([
                  "Enabled",
                  "Disabled",
                  "Deleted",
                  "Completed",
                  "Faulted",
                  "Suspended",
                ]),
              ),
              executionState: Schema.optional(
                Schema.Literals(["Waiting", "Running"]),
              ),
              startTime: Schema.optional(Schema.String),
              endTime: Schema.optional(Schema.String),
              lastExecutionStatus: Schema.optional(
                Schema.Literals([
                  "Succeeded",
                  "Completed",
                  "Failed",
                  "Faulted",
                  "Postponed",
                  "Rescheduled",
                ]),
              ),
              lastExecutionTime: Schema.optional(Schema.String),
            }),
          ),
          sequencerActions: Schema.optional(
            Schema.Array(
              Schema.Struct({
                actionId: Schema.optional(Schema.String),
                state: Schema.optional(
                  Schema.Literals([
                    "NotStarted",
                    "WaitingPredecessors",
                    "ExecutingAction",
                    "CreatingSuccessors",
                    "Completed",
                  ]),
                ),
                result: Schema.optional(
                  Schema.Literals([
                    "NotCompleted",
                    "Succeeded",
                    "Failed",
                    "TimedOut",
                    "Skipped",
                  ]),
                ),
              }),
            ),
          ),
        }),
      ),
    ),
  });
export type SqlServerInstancesGetJobsStatusOutput =
  typeof SqlServerInstancesGetJobsStatusOutput.Type;

// The operation
/**
 * Gets jobs status details for sql arc resource
 * @param featureName - The name of the feature to retrieve the job status for.
 * @param jobType - The type of the job to retrieve the status for.
 */
export const SqlServerInstancesGetJobsStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlServerInstancesGetJobsStatusInput,
    outputSchema: SqlServerInstancesGetJobsStatusOutput,
  }));
// Input Schema
export const SqlServerInstancesGetTelemetryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    datasetName: Schema.String,
    startTime: Schema.optional(Schema.String),
    endTime: Schema.optional(Schema.String),
    interval: Schema.optional(Schema.String),
    aggregationType: Schema.optional(
      Schema.Literals(["Average", "Minimum", "Maximum", "Sum", "Count"]),
    ),
    databaseNames: Schema.optional(Schema.Array(Schema.String)),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/getTelemetry",
    }),
  );
export type SqlServerInstancesGetTelemetryInput =
  typeof SqlServerInstancesGetTelemetryInput.Type;

// Output Schema
export const SqlServerInstancesGetTelemetryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    columns: Schema.Array(
      Schema.Struct({
        name: Schema.optional(Schema.String),
        type: Schema.optional(
          Schema.Literals([
            "bool",
            "datetime",
            "int",
            "long",
            "double",
            "string",
            "guid",
            "timespan",
          ]),
        ),
      }),
    ),
    rows: Schema.Array(Schema.Array(Schema.String)),
    nextLink: Schema.optional(Schema.String),
  });
export type SqlServerInstancesGetTelemetryOutput =
  typeof SqlServerInstancesGetTelemetryOutput.Type;

// The operation
/**
 * Retrieves SQL Server instance telemetry
 * @param datasetName - The name of the telemetry dataset to retrieve.
 * @param startTime - The start time for the time range to fetch telemetry for. If not specified, the current time minus 1 hour is used.
 * @param endTime - The end time for the time range to fetch telemetry for. If not specified, the current time is used.
 * @param interval - The time granularity to fetch telemetry for. This is an ISO8601 duration. Examples: PT15M, PT1H, P1D
 * @param aggregationType - The aggregation type to use for the numerical columns in the dataset.
 * @param databaseNames - The list of database names to return telemetry for. If not specified, telemetry for all databases will be aggregated and returned.
 */
export const SqlServerInstancesGetTelemetry =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlServerInstancesGetTelemetryInput,
    outputSchema: SqlServerInstancesGetTelemetryOutput,
  }));
// Input Schema
export const SqlServerInstancesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AzureArcData/sqlServerInstances",
    }),
  );
export type SqlServerInstancesListInput =
  typeof SqlServerInstancesListInput.Type;

// Output Schema
export const SqlServerInstancesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SqlServerInstancesListOutput =
  typeof SqlServerInstancesListOutput.Type;

// The operation
/**
 * List sqlServerInstance resources in the subscription
 */
export const SqlServerInstancesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlServerInstancesListInput,
    outputSchema: SqlServerInstancesListOutput,
  }),
);
// Input Schema
export const SqlServerInstancesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances",
    }),
  );
export type SqlServerInstancesListByResourceGroupInput =
  typeof SqlServerInstancesListByResourceGroupInput.Type;

// Output Schema
export const SqlServerInstancesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SqlServerInstancesListByResourceGroupOutput =
  typeof SqlServerInstancesListByResourceGroupOutput.Type;

// The operation
/**
 * List sqlServerInstance resources in the resource group
 *
 * Gets all sqlServerInstances in a resource group.
 */
export const SqlServerInstancesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlServerInstancesListByResourceGroupInput,
    outputSchema: SqlServerInstancesListByResourceGroupOutput,
  }));
// Input Schema
export const SqlServerInstancesPostUpgradeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/postUpgrade",
    }),
  );
export type SqlServerInstancesPostUpgradeInput =
  typeof SqlServerInstancesPostUpgradeInput.Type;

// Output Schema
export const SqlServerInstancesPostUpgradeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SqlServerInstancesPostUpgradeOutput =
  typeof SqlServerInstancesPostUpgradeOutput.Type;

// The operation
/**
 * Clean up after upgrading.
 *
 * @param api-version - The API version to use for this operation.
 */
export const SqlServerInstancesPostUpgrade =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlServerInstancesPostUpgradeInput,
    outputSchema: SqlServerInstancesPostUpgradeOutput,
  }));
// Input Schema
export const SqlServerInstancesPreUpgradeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/preUpgrade",
    }),
  );
export type SqlServerInstancesPreUpgradeInput =
  typeof SqlServerInstancesPreUpgradeInput.Type;

// Output Schema
export const SqlServerInstancesPreUpgradeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SqlServerInstancesPreUpgradeOutput =
  typeof SqlServerInstancesPreUpgradeOutput.Type;

// The operation
/**
 * Request Upgrade Permission before upgrading.
 *
 * @param api-version - The API version to use for this operation.
 */
export const SqlServerInstancesPreUpgrade =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlServerInstancesPreUpgradeInput,
    outputSchema: SqlServerInstancesPreUpgradeOutput,
  }));
// Input Schema
export const SqlServerInstancesRunBestPracticesAssessmentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/runBestPracticesAssessment",
    }),
  );
export type SqlServerInstancesRunBestPracticesAssessmentInput =
  typeof SqlServerInstancesRunBestPracticesAssessmentInput.Type;

// Output Schema
export const SqlServerInstancesRunBestPracticesAssessmentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    instanceName: Schema.optional(Schema.String),
    jobStatus: Schema.optional(
      Schema.Literals(["NotStarted", "InProgress", "Succeeded", "Failed"]),
    ),
    jobException: Schema.optional(Schema.String),
    backgroundJob: Schema.optional(
      Schema.Struct({
        state: Schema.optional(
          Schema.Literals([
            "Enabled",
            "Disabled",
            "Deleted",
            "Completed",
            "Faulted",
            "Suspended",
          ]),
        ),
        executionState: Schema.optional(
          Schema.Literals(["Waiting", "Running"]),
        ),
        startTime: Schema.optional(Schema.String),
        endTime: Schema.optional(Schema.String),
        lastExecutionStatus: Schema.optional(
          Schema.Literals([
            "Succeeded",
            "Completed",
            "Failed",
            "Faulted",
            "Postponed",
            "Rescheduled",
          ]),
        ),
        lastExecutionTime: Schema.optional(Schema.String),
      }),
    ),
    sequencerActions: Schema.optional(
      Schema.Array(
        Schema.Struct({
          actionId: Schema.optional(Schema.String),
          state: Schema.optional(
            Schema.Literals([
              "NotStarted",
              "WaitingPredecessors",
              "ExecutingAction",
              "CreatingSuccessors",
              "Completed",
            ]),
          ),
          result: Schema.optional(
            Schema.Literals([
              "NotCompleted",
              "Succeeded",
              "Failed",
              "TimedOut",
              "Skipped",
            ]),
          ),
        }),
      ),
    ),
  });
export type SqlServerInstancesRunBestPracticesAssessmentOutput =
  typeof SqlServerInstancesRunBestPracticesAssessmentOutput.Type;

// The operation
/**
 * The request to run SQL best practices assessment.
 */
export const SqlServerInstancesRunBestPracticesAssessment =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlServerInstancesRunBestPracticesAssessmentInput,
    outputSchema: SqlServerInstancesRunBestPracticesAssessmentOutput,
  }));
// Input Schema
export const SqlServerInstancesRunManagedInstanceLinkAssessmentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    azureManagedInstanceResourceId: Schema.String,
    azureManagedInstanceRole: Schema.optional(
      Schema.Literals(["Primary", "Secondary"]),
    ),
    databaseNames: Schema.Array(Schema.String),
    availabilityGroupName: Schema.String,
    distributedAvailabilityGroupName: Schema.String,
    assessmentCategories: Schema.optional(
      Schema.Array(
        Schema.Literals([
          "SqlInstance",
          "SqlInstanceDatabase",
          "ManagedInstance",
          "ManagedInstanceDatabase",
          "ManagedInstanceCrossValidation",
          "Certificates",
          "BoxToMiNetworkConnectivity",
          "MiToBoxNetworkConnectivity",
          "SqlInstanceAg",
          "DagCrossValidation",
        ]),
      ),
    ),
    sqlServerIpAddress: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/runManagedInstanceLinkAssessment",
    }),
  );
export type SqlServerInstancesRunManagedInstanceLinkAssessmentInput =
  typeof SqlServerInstancesRunManagedInstanceLinkAssessmentInput.Type;

// Output Schema
export const SqlServerInstancesRunManagedInstanceLinkAssessmentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    assessments: Schema.optional(
      Schema.Array(
        Schema.Struct({
          name: Schema.optional(Schema.String),
          category: Schema.optional(
            Schema.Literals([
              "SqlInstance",
              "SqlInstanceDatabase",
              "ManagedInstance",
              "ManagedInstanceDatabase",
              "ManagedInstanceCrossValidation",
              "Certificates",
              "BoxToMiNetworkConnectivity",
              "MiToBoxNetworkConnectivity",
              "SqlInstanceAg",
              "DagCrossValidation",
            ]),
          ),
          status: Schema.optional(
            Schema.Literals(["Success", "Warning", "Failure"]),
          ),
          information: Schema.optional(Schema.String),
          additionalInformation: Schema.optional(Schema.String),
          failingDbs: Schema.optional(Schema.Array(Schema.String)),
        }),
      ),
    ),
  });
export type SqlServerInstancesRunManagedInstanceLinkAssessmentOutput =
  typeof SqlServerInstancesRunManagedInstanceLinkAssessmentOutput.Type;

// The operation
/**
 * Runs Managed Instance Link assessment for SQL Server instance
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param azureManagedInstanceResourceId - The Azure SQL Managed Instance resource ID to link with the SQL Server instance.
 * @param azureManagedInstanceRole - The role of managed instance in a distributed availability group, can be Primary or Secondary.
 * @param databaseNames - An array of strings, where each value represents the name of a database to be replicated to the Azure SQL Managed Instance.
 * @param availabilityGroupName - The name of the availability group to be used for the database replication.
 * @param distributedAvailabilityGroupName - The name of the DAG to be used for the database replication. Also referred to as Link Name.
 * @param assessmentCategories - An array of strings, where each value represents the category of the assessment to be run. If this field is not provided, all assessment categories will be run.
 * @param sqlServerIpAddress - The IP address of the SQL Server instance.
 */
export const SqlServerInstancesRunManagedInstanceLinkAssessment =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlServerInstancesRunManagedInstanceLinkAssessmentInput,
    outputSchema: SqlServerInstancesRunManagedInstanceLinkAssessmentOutput,
  }));
// Input Schema
export const SqlServerInstancesRunMigrationAssessmentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}/runMigrationAssessment",
    }),
  );
export type SqlServerInstancesRunMigrationAssessmentInput =
  typeof SqlServerInstancesRunMigrationAssessmentInput.Type;

// Output Schema
export const SqlServerInstancesRunMigrationAssessmentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    instanceName: Schema.optional(Schema.String),
    jobStatus: Schema.optional(
      Schema.Literals(["NotStarted", "InProgress", "Succeeded", "Failed"]),
    ),
    jobException: Schema.optional(Schema.String),
    backgroundJob: Schema.optional(
      Schema.Struct({
        state: Schema.optional(
          Schema.Literals([
            "Enabled",
            "Disabled",
            "Deleted",
            "Completed",
            "Faulted",
            "Suspended",
          ]),
        ),
        executionState: Schema.optional(
          Schema.Literals(["Waiting", "Running"]),
        ),
        startTime: Schema.optional(Schema.String),
        endTime: Schema.optional(Schema.String),
        lastExecutionStatus: Schema.optional(
          Schema.Literals([
            "Succeeded",
            "Completed",
            "Failed",
            "Faulted",
            "Postponed",
            "Rescheduled",
          ]),
        ),
        lastExecutionTime: Schema.optional(Schema.String),
      }),
    ),
    sequencerActions: Schema.optional(
      Schema.Array(
        Schema.Struct({
          actionId: Schema.optional(Schema.String),
          state: Schema.optional(
            Schema.Literals([
              "NotStarted",
              "WaitingPredecessors",
              "ExecutingAction",
              "CreatingSuccessors",
              "Completed",
            ]),
          ),
          result: Schema.optional(
            Schema.Literals([
              "NotCompleted",
              "Succeeded",
              "Failed",
              "TimedOut",
              "Skipped",
            ]),
          ),
        }),
      ),
    ),
  });
export type SqlServerInstancesRunMigrationAssessmentOutput =
  typeof SqlServerInstancesRunMigrationAssessmentOutput.Type;

// The operation
/**
 * Runs migration assessment for SQL Server instance
 */
export const SqlServerInstancesRunMigrationAssessment =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlServerInstancesRunMigrationAssessmentInput,
    outputSchema: SqlServerInstancesRunMigrationAssessmentOutput,
  }));
// Input Schema
export const SqlServerInstancesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    properties: Schema.optional(
      Schema.Struct({
        version: Schema.optional(
          Schema.Literals([
            "Unknown",
            "SQL Server 2012",
            "SQL Server 2014",
            "SQL Server 2016",
            "SQL Server 2017",
            "SQL Server 2019",
            "SQL Server 2022",
            "SQL Server 2025",
          ]),
        ),
        edition: Schema.optional(
          Schema.Literals([
            "Evaluation",
            "Enterprise",
            "Standard",
            "Web",
            "Developer",
            "Express",
            "Business Intelligence",
            "Standard Developer",
          ]),
        ),
        containerResourceId: Schema.optional(Schema.String),
        vmId: Schema.optional(Schema.String),
        createTime: Schema.optional(Schema.String),
        vCore: Schema.optional(Schema.String),
        cores: Schema.optional(Schema.String),
        status: Schema.optional(
          Schema.Literals([
            "Connected",
            "Disconnected",
            "Registered",
            "Unknown",
          ]),
        ),
        patchLevel: Schema.optional(Schema.String),
        collation: Schema.optional(Schema.String),
        dbMasterKeyExists: Schema.optional(Schema.Boolean),
        isHadrEnabled: Schema.optional(Schema.Boolean),
        traceFlags: Schema.optional(Schema.Array(Schema.Number)),
        currentVersion: Schema.optional(Schema.String),
        instanceName: Schema.optional(Schema.String),
        tcpDynamicPorts: Schema.optional(Schema.String),
        tcpStaticPorts: Schema.optional(Schema.String),
        productId: Schema.optional(Schema.String),
        licenseType: Schema.optional(
          Schema.Literals([
            "Undefined",
            "Free",
            "HADR",
            "ServerCAL",
            "LicenseOnly",
            "PAYG",
            "Paid",
            "FabricCapacity",
          ]),
        ),
        azureDefenderStatusLastUpdated: Schema.optional(Schema.String),
        azureDefenderStatus: Schema.optional(
          Schema.Literals(["Protected", "Unprotected", "Unknown"]),
        ),
        provisioningState: Schema.optional(Schema.String),
        lastInventoryUploadTime: Schema.optional(Schema.String),
        lastUsageUploadTime: Schema.optional(Schema.String),
        hostType: Schema.optional(
          Schema.Literals([
            "Azure Virtual Machine",
            "Azure VMWare Virtual Machine",
            "Azure Kubernetes Service",
            "AWS VMWare Virtual Machine",
            "AWS Kubernetes Service",
            "GCP VMWare Virtual Machine",
            "GCP Kubernetes Service",
            "Container",
            "Virtual Machine",
            "Physical Server",
            "AWS Virtual Machine",
            "GCP Virtual Machine",
            "Other",
          ]),
        ),
        alwaysOnRole: Schema.optional(
          Schema.Literals([
            "None",
            "FailoverClusterInstance",
            "FailoverClusterNode",
            "AvailabilityGroupReplica",
          ]),
        ),
        failoverCluster: Schema.optional(
          Schema.Struct({
            id: Schema.optional(Schema.String),
            networkName: Schema.optional(Schema.String),
            sqlInstanceIds: Schema.optional(Schema.Array(Schema.String)),
            hostNames: Schema.optional(Schema.Array(Schema.String)),
            hostIPAddresses: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  ipAddress: Schema.optional(Schema.String),
                  subnetMask: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
        ),
        backupPolicy: Schema.optional(
          Schema.Struct({
            retentionPeriodDays: Schema.optional(Schema.Number),
            fullBackupDays: Schema.optional(Schema.Number),
            differentialBackupHours: Schema.optional(
              Schema.Literals(["12", "24"]),
            ),
            transactionLogBackupMinutes: Schema.optional(Schema.Number),
          }),
        ),
        upgradeLockedUntil: Schema.optional(Schema.String),
        monitoring: Schema.optional(
          Schema.Struct({
            enabled: Schema.optional(Schema.Boolean),
          }),
        ),
        migration: Schema.optional(
          Schema.Struct({
            assessment: Schema.optional(
              Schema.Struct({
                enabled: Schema.optional(Schema.Boolean),
                assessmentUploadTime: Schema.optional(Schema.String),
                version: Schema.optional(Schema.String),
                settings: Schema.optional(
                  Schema.Struct({
                    targetLocation: Schema.optional(Schema.String),
                    percentile: Schema.optional(Schema.Number),
                    lookbackPeriodInDays: Schema.optional(Schema.Number),
                    strategy: Schema.optional(Schema.String),
                    currency: Schema.optional(Schema.String),
                    discountPercentage: Schema.optional(Schema.Number),
                    costOptions: Schema.optional(
                      Schema.Struct({
                        computeAndStorageCostOption: Schema.optional(
                          Schema.String,
                        ),
                        sqlLicenseCostOption: Schema.optional(Schema.String),
                        windowsLicenseCostOption: Schema.optional(
                          Schema.String,
                        ),
                      }),
                    ),
                  }),
                ),
                serverAssessments: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      appliesToMigrationTargetPlatform: Schema.optional(
                        Schema.String,
                      ),
                      featureId: Schema.optional(Schema.String),
                      impactedObjects: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            impactDetail: Schema.optional(Schema.String),
                            name: Schema.optional(Schema.String),
                            objectType: Schema.optional(Schema.String),
                          }),
                        ),
                      ),
                      issueCategory: Schema.optional(Schema.String),
                      moreInformation: Schema.optional(Schema.String),
                    }),
                  ),
                ),
                skuRecommendationResults: Schema.optional(
                  Schema.Struct({
                    azureSqlDatabase: Schema.optional(
                      Schema.Struct({
                        recommendationStatus: Schema.optional(
                          Schema.Literals([
                            "NotReady",
                            "Ready",
                            "ReadyWithConditions",
                            "Unknown",
                          ]),
                        ),
                        numberOfServerBlockerIssues: Schema.optional(
                          Schema.Number,
                        ),
                        monthlyCost: Schema.optional(
                          Schema.Struct({
                            computeCost: Schema.optional(Schema.Number),
                            storageCost: Schema.optional(Schema.Number),
                            iopsCost: Schema.optional(Schema.Number),
                            sqlLicenseCost: Schema.optional(Schema.Number),
                            windowsLicenseCost: Schema.optional(Schema.Number),
                            totalCost: Schema.optional(Schema.Number),
                          }),
                        ),
                        monthlyCostOptions: Schema.optional(
                          Schema.Array(
                            Schema.Struct({
                              keyName: Schema.optional(Schema.String),
                              keyValue: Schema.optional(
                                Schema.Struct({
                                  computeCost: Schema.optional(Schema.Number),
                                  storageCost: Schema.optional(Schema.Number),
                                  iopsCost: Schema.optional(Schema.Number),
                                }),
                              ),
                            }),
                          ),
                        ),
                        targetSku: Schema.optional(
                          Schema.Struct({
                            category: Schema.optional(
                              Schema.Struct({
                                computeTier: Schema.optional(Schema.String),
                                hardwareType: Schema.optional(Schema.String),
                                sqlPurchasingModel: Schema.optional(
                                  Schema.String,
                                ),
                                sqlServiceTier: Schema.optional(Schema.String),
                                zoneRedundancyAvailable: Schema.optional(
                                  Schema.Boolean,
                                ),
                              }),
                            ),
                            computeSize: Schema.optional(Schema.Number),
                            storageMaxSizeInMb: Schema.optional(Schema.Number),
                            predictedDataSizeInMb: Schema.optional(
                              Schema.Number,
                            ),
                            predictedLogSizeInMb: Schema.optional(
                              Schema.Number,
                            ),
                            maxStorageIops: Schema.optional(Schema.Number),
                            maxThroughputMBps: Schema.optional(Schema.Number),
                          }),
                        ),
                      }),
                    ),
                    azureSqlManagedInstance: Schema.optional(
                      Schema.Struct({
                        recommendationStatus: Schema.optional(
                          Schema.Literals([
                            "NotReady",
                            "Ready",
                            "ReadyWithConditions",
                            "Unknown",
                          ]),
                        ),
                        numberOfServerBlockerIssues: Schema.optional(
                          Schema.Number,
                        ),
                        monthlyCost: Schema.optional(
                          Schema.Struct({
                            computeCost: Schema.optional(Schema.Number),
                            storageCost: Schema.optional(Schema.Number),
                            iopsCost: Schema.optional(Schema.Number),
                            sqlLicenseCost: Schema.optional(Schema.Number),
                            windowsLicenseCost: Schema.optional(Schema.Number),
                            totalCost: Schema.optional(Schema.Number),
                          }),
                        ),
                        monthlyCostOptions: Schema.optional(
                          Schema.Array(
                            Schema.Struct({
                              keyName: Schema.optional(Schema.String),
                              keyValue: Schema.optional(
                                Schema.Struct({
                                  computeCost: Schema.optional(Schema.Number),
                                  storageCost: Schema.optional(Schema.Number),
                                  iopsCost: Schema.optional(Schema.Number),
                                }),
                              ),
                            }),
                          ),
                        ),
                        targetSku: Schema.optional(
                          Schema.Struct({
                            category: Schema.optional(
                              Schema.Struct({
                                computeTier: Schema.optional(Schema.String),
                                hardwareType: Schema.optional(Schema.String),
                                sqlPurchasingModel: Schema.optional(
                                  Schema.String,
                                ),
                                sqlServiceTier: Schema.optional(Schema.String),
                                zoneRedundancyAvailable: Schema.optional(
                                  Schema.Boolean,
                                ),
                              }),
                            ),
                            computeSize: Schema.optional(Schema.Number),
                            storageMaxSizeInMb: Schema.optional(Schema.Number),
                            predictedDataSizeInMb: Schema.optional(
                              Schema.Number,
                            ),
                            predictedLogSizeInMb: Schema.optional(
                              Schema.Number,
                            ),
                            maxStorageIops: Schema.optional(Schema.Number),
                            maxThroughputMBps: Schema.optional(Schema.Number),
                          }),
                        ),
                      }),
                    ),
                    azureSqlVirtualMachine: Schema.optional(
                      Schema.Struct({
                        recommendationStatus: Schema.optional(
                          Schema.Literals([
                            "NotReady",
                            "Ready",
                            "ReadyWithConditions",
                            "Unknown",
                          ]),
                        ),
                        numberOfServerBlockerIssues: Schema.optional(
                          Schema.Number,
                        ),
                        monthlyCost: Schema.optional(
                          Schema.Struct({
                            computeCost: Schema.optional(Schema.Number),
                            storageCost: Schema.optional(Schema.Number),
                            iopsCost: Schema.optional(Schema.Number),
                            sqlLicenseCost: Schema.optional(Schema.Number),
                            windowsLicenseCost: Schema.optional(Schema.Number),
                            totalCost: Schema.optional(Schema.Number),
                          }),
                        ),
                        monthlyCostOptions: Schema.optional(
                          Schema.Array(
                            Schema.Struct({
                              keyName: Schema.optional(Schema.String),
                              keyValue: Schema.optional(
                                Schema.Struct({
                                  computeCost: Schema.optional(Schema.Number),
                                  storageCost: Schema.optional(Schema.Number),
                                  iopsCost: Schema.optional(Schema.Number),
                                }),
                              ),
                            }),
                          ),
                        ),
                        targetSku: Schema.optional(
                          Schema.Struct({
                            category: Schema.optional(
                              Schema.Struct({
                                availableVmSkus: Schema.optional(
                                  Schema.Array(Schema.String),
                                ),
                                virtualMachineFamily: Schema.optional(
                                  Schema.String,
                                ),
                              }),
                            ),
                            computeSize: Schema.optional(Schema.Number),
                            predictedDataSizeInMb: Schema.optional(
                              Schema.Number,
                            ),
                            predictedLogSizeInMb: Schema.optional(
                              Schema.Number,
                            ),
                            virtualMachineSize: Schema.optional(
                              Schema.Struct({
                                virtualMachineFamily: Schema.optional(
                                  Schema.String,
                                ),
                                sizeName: Schema.optional(Schema.String),
                                computeSize: Schema.optional(Schema.Number),
                                azureSkuName: Schema.optional(Schema.String),
                                vCPUsAvailable: Schema.optional(Schema.Number),
                                maxNetworkInterfaces: Schema.optional(
                                  Schema.Number,
                                ),
                              }),
                            ),
                            dataDiskSizes: Schema.optional(
                              Schema.Array(
                                Schema.Struct({
                                  diskType: Schema.optional(Schema.String),
                                  redundancy: Schema.optional(Schema.String),
                                  size: Schema.optional(Schema.String),
                                  caching: Schema.optional(Schema.String),
                                  maxSizeInGib: Schema.optional(Schema.Number),
                                  maxThroughputInMbps: Schema.optional(
                                    Schema.Number,
                                  ),
                                  maxIops: Schema.optional(Schema.Number),
                                }),
                              ),
                            ),
                            logDiskSizes: Schema.optional(
                              Schema.Array(
                                Schema.Struct({
                                  diskType: Schema.optional(Schema.String),
                                  redundancy: Schema.optional(Schema.String),
                                  size: Schema.optional(Schema.String),
                                  caching: Schema.optional(Schema.String),
                                  maxSizeInGib: Schema.optional(Schema.Number),
                                  maxThroughputInMbps: Schema.optional(
                                    Schema.Number,
                                  ),
                                  maxIops: Schema.optional(Schema.Number),
                                }),
                              ),
                            ),
                            tempDbDiskSizes: Schema.optional(
                              Schema.Array(
                                Schema.Struct({
                                  diskType: Schema.optional(Schema.String),
                                  redundancy: Schema.optional(Schema.String),
                                  size: Schema.optional(Schema.String),
                                  caching: Schema.optional(Schema.String),
                                  maxSizeInGib: Schema.optional(Schema.Number),
                                  maxThroughputInMbps: Schema.optional(
                                    Schema.Number,
                                  ),
                                  maxIops: Schema.optional(Schema.Number),
                                }),
                              ),
                            ),
                          }),
                        ),
                      }),
                    ),
                  }),
                ),
                impactedObjectsSummary: Schema.optional(
                  Schema.Struct({
                    azureSqlDatabase: Schema.optional(
                      Schema.Array(
                        Schema.Struct({
                          featureId: Schema.optional(Schema.String),
                          numberImpacted: Schema.optional(Schema.Number),
                          issueCategory: Schema.optional(Schema.String),
                        }),
                      ),
                    ),
                    azureSqlManagedInstance: Schema.optional(
                      Schema.Array(
                        Schema.Struct({
                          featureId: Schema.optional(Schema.String),
                          numberImpacted: Schema.optional(Schema.Number),
                          issueCategory: Schema.optional(Schema.String),
                        }),
                      ),
                    ),
                  }),
                ),
              }),
            ),
          }),
        ),
        bestPracticesAssessment: Schema.optional(
          Schema.Struct({
            enabled: Schema.optional(Schema.Boolean),
            schedule: Schema.optional(
              Schema.Struct({
                enabled: Schema.optional(Schema.Boolean),
                cronTrigger: Schema.optional(
                  Schema.Struct({
                    startTime: Schema.optional(Schema.String),
                    timeZone: Schema.optional(Schema.String),
                    expression: Schema.optional(Schema.String),
                  }),
                ),
              }),
            ),
          }),
        ),
        clientConnection: Schema.optional(
          Schema.Struct({
            enabled: Schema.optional(Schema.Boolean),
          }),
        ),
        serviceType: Schema.optional(
          Schema.Literals(["Engine", "SSRS", "SSAS", "SSIS", "PBIRS"]),
        ),
        authentication: Schema.optional(
          Schema.Struct({
            mode: Schema.optional(
              Schema.Literals(["Mixed", "Windows", "Undefined"]),
            ),
            sqlServerEntraIdentity: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  identityType: Schema.optional(
                    Schema.Literals([
                      "SystemAssignedManagedIdentity",
                      "UserAssignedManagedIdentity",
                    ]),
                  ),
                  clientId: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
        ),
        databaseMirroringEndpoint: Schema.optional(
          Schema.Struct({
            endpointName: Schema.optional(Schema.String),
            role: Schema.optional(
              Schema.Literals(["NONE", "PARTNER", "WITNESS", "ALL"]),
            ),
            isEncryptionEnabled: Schema.optional(Schema.Boolean),
            encryptionAlgorithm: Schema.optional(
              Schema.Literals([
                "NONE",
                "RC4",
                "AES",
                "NONE, RC4",
                "NONE, AES",
                "RC4, AES",
                "AES, RC4",
                "NONE, RC4, AES",
                "NONE, AES, RC4",
              ]),
            ),
            connectionAuth: Schema.optional(
              Schema.Literals([
                "Windows_NTLM",
                "Windows_Kerberos",
                "Windows_Negotiate",
                "Certificate",
                "Windows_NTLM_Certificate",
                "Windows_Kerberos_Certificate",
                "Windows_Negotiate_Certificate",
                "Certificate_Windows_NTLM",
                "Certificate_Windows_Kerberos",
                "Certificate_Windows_Negotiate",
              ]),
            ),
            port: Schema.optional(Schema.Number),
            isDynamicPort: Schema.optional(Schema.Boolean),
            ipAddress: Schema.optional(Schema.String),
            certificateName: Schema.optional(Schema.String),
            certificateExpiryDate: Schema.optional(Schema.String),
          }),
        ),
        isMicrosoftPkiCertTrustConfigured: Schema.optional(Schema.Boolean),
        isDigiCertPkiCertTrustConfigured: Schema.optional(Schema.Boolean),
        maxServerMemoryMB: Schema.optional(Schema.Number),
      }),
    ),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerInstances/{sqlServerInstanceName}",
    }),
  );
export type SqlServerInstancesUpdateInput =
  typeof SqlServerInstancesUpdateInput.Type;

// Output Schema
export const SqlServerInstancesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SqlServerInstancesUpdateOutput =
  typeof SqlServerInstancesUpdateOutput.Type;

// The operation
/**
 * Updates a SQL Server Instance resource
 * @param tags - Resource tags.
 * @param properties - null
 */
export const SqlServerInstancesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlServerInstancesUpdateInput,
    outputSchema: SqlServerInstancesUpdateOutput,
  }),
);
// Input Schema
export const SqlServerLicensesCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.Struct({
      billingPlan: Schema.Literals(["PAYG", "Paid"]),
      physicalCores: Schema.Number,
      licenseCategory: Schema.Literals(["Core"]),
      activationState: Schema.Literals(["Activated", "Deactivated"]),
      scopeType: Schema.Literals(["Tenant", "Subscription", "ResourceGroup"]),
      lastActivatedAt: Schema.optional(Schema.String),
      lastDeactivatedAt: Schema.optional(Schema.String),
      tenantId: Schema.optional(Schema.String),
    }),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerLicenses/{sqlServerLicenseName}",
    }),
  );
export type SqlServerLicensesCreateInput =
  typeof SqlServerLicensesCreateInput.Type;

// Output Schema
export const SqlServerLicensesCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SqlServerLicensesCreateOutput =
  typeof SqlServerLicensesCreateOutput.Type;

// The operation
/**
 * Creates or replaces a SQL Server license resource
 * @param properties - SQL Server license properties
 */
export const SqlServerLicensesCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlServerLicensesCreateInput,
    outputSchema: SqlServerLicensesCreateOutput,
  }),
);
// Input Schema
export const SqlServerLicensesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerLicenses/{sqlServerLicenseName}",
    }),
  );
export type SqlServerLicensesDeleteInput =
  typeof SqlServerLicensesDeleteInput.Type;

// Output Schema
export const SqlServerLicensesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SqlServerLicensesDeleteOutput =
  typeof SqlServerLicensesDeleteOutput.Type;

// The operation
/**
 * Deletes a SQL Server license resource
 */
export const SqlServerLicensesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlServerLicensesDeleteInput,
    outputSchema: SqlServerLicensesDeleteOutput,
  }),
);
// Input Schema
export const SqlServerLicensesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerLicenses/{sqlServerLicenseName}",
    }),
  );
export type SqlServerLicensesGetInput = typeof SqlServerLicensesGetInput.Type;

// Output Schema
export const SqlServerLicensesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SqlServerLicensesGetOutput = typeof SqlServerLicensesGetOutput.Type;

// The operation
/**
 * Retrieves a SQL Server license resource
 */
export const SqlServerLicensesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlServerLicensesGetInput,
    outputSchema: SqlServerLicensesGetOutput,
  }),
);
// Input Schema
export const SqlServerLicensesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AzureArcData/sqlServerLicenses",
    }),
  );
export type SqlServerLicensesListInput = typeof SqlServerLicensesListInput.Type;

// Output Schema
export const SqlServerLicensesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SqlServerLicensesListOutput =
  typeof SqlServerLicensesListOutput.Type;

// The operation
/**
 * List sqlServerLicense resources in the subscription
 */
export const SqlServerLicensesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlServerLicensesListInput,
    outputSchema: SqlServerLicensesListOutput,
  }),
);
// Input Schema
export const SqlServerLicensesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerLicenses",
    }),
  );
export type SqlServerLicensesListByResourceGroupInput =
  typeof SqlServerLicensesListByResourceGroupInput.Type;

// Output Schema
export const SqlServerLicensesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SqlServerLicensesListByResourceGroupOutput =
  typeof SqlServerLicensesListByResourceGroupOutput.Type;

// The operation
/**
 * List sqlServerLicense resources in the resource group
 *
 * Gets all sqlServerLicenses in a resource group.
 */
export const SqlServerLicensesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlServerLicensesListByResourceGroupInput,
    outputSchema: SqlServerLicensesListByResourceGroupOutput,
  }));
// Input Schema
export const SqlServerLicensesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    properties: Schema.optional(
      Schema.Struct({
        billingPlan: Schema.optional(Schema.Literals(["PAYG", "Paid"])),
        physicalCores: Schema.optional(Schema.Number),
        licenseCategory: Schema.optional(Schema.Literals(["Core"])),
        activationState: Schema.optional(
          Schema.Literals(["Activated", "Deactivated"]),
        ),
        scopeType: Schema.optional(
          Schema.Literals(["Tenant", "Subscription", "ResourceGroup"]),
        ),
        lastActivatedAt: Schema.optional(Schema.String),
        lastDeactivatedAt: Schema.optional(Schema.String),
        tenantId: Schema.optional(Schema.String),
      }),
    ),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/sqlServerLicenses/{sqlServerLicenseName}",
    }),
  );
export type SqlServerLicensesUpdateInput =
  typeof SqlServerLicensesUpdateInput.Type;

// Output Schema
export const SqlServerLicensesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SqlServerLicensesUpdateOutput =
  typeof SqlServerLicensesUpdateOutput.Type;

// The operation
/**
 * Updates a SQL Server license resource
 * @param tags - Resource tags.
 * @param properties - null
 */
export const SqlServerLicensesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlServerLicensesUpdateInput,
    outputSchema: SqlServerLicensesUpdateOutput,
  }),
);
