/**
 * Azure Healthcareapis API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const DicomServicesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/workspaces/{workspaceName}/dicomservices/{dicomServiceName}",
    }),
  );
export type DicomServicesCreateOrUpdateInput =
  typeof DicomServicesCreateOrUpdateInput.Type;

// Output Schema
export const DicomServicesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    identity: Schema.optional(
      Schema.Struct({
        type: Schema.Literals([
          "None",
          "SystemAssigned",
          "UserAssigned",
          "SystemAssigned,UserAssigned",
        ]),
        principalId: Schema.optional(Schema.String),
        tenantId: Schema.optional(Schema.String),
        userAssignedIdentities: Schema.optional(
          Schema.Record(
            Schema.String,
            Schema.Struct({
              principalId: Schema.optional(Schema.String),
              clientId: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
  });
export type DicomServicesCreateOrUpdateOutput =
  typeof DicomServicesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a DICOM Service resource with the specified parameters.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DicomServicesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DicomServicesCreateOrUpdateInput,
    outputSchema: DicomServicesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const DicomServicesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/workspaces/{workspaceName}/dicomservices/{dicomServiceName}",
    }),
  );
export type DicomServicesDeleteInput = typeof DicomServicesDeleteInput.Type;

// Output Schema
export const DicomServicesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DicomServicesDeleteOutput = typeof DicomServicesDeleteOutput.Type;

// The operation
/**
 * Deletes a DICOM Service.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DicomServicesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DicomServicesDeleteInput,
  outputSchema: DicomServicesDeleteOutput,
}));
// Input Schema
export const DicomServicesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/workspaces/{workspaceName}/dicomservices/{dicomServiceName}",
  }),
);
export type DicomServicesGetInput = typeof DicomServicesGetInput.Type;

// Output Schema
export const DicomServicesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    identity: Schema.optional(
      Schema.Struct({
        type: Schema.Literals([
          "None",
          "SystemAssigned",
          "UserAssigned",
          "SystemAssigned,UserAssigned",
        ]),
        principalId: Schema.optional(Schema.String),
        tenantId: Schema.optional(Schema.String),
        userAssignedIdentities: Schema.optional(
          Schema.Record(
            Schema.String,
            Schema.Struct({
              principalId: Schema.optional(Schema.String),
              clientId: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
  },
);
export type DicomServicesGetOutput = typeof DicomServicesGetOutput.Type;

// The operation
/**
 * Gets the properties of the specified DICOM Service.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DicomServicesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DicomServicesGetInput,
  outputSchema: DicomServicesGetOutput,
}));
// Input Schema
export const DicomServicesListByWorkspaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/workspaces/{workspaceName}/dicomservices",
    }),
  );
export type DicomServicesListByWorkspaceInput =
  typeof DicomServicesListByWorkspaceInput.Type;

// Output Schema
export const DicomServicesListByWorkspaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          identity: Schema.optional(
            Schema.Struct({
              type: Schema.Literals([
                "None",
                "SystemAssigned",
                "UserAssigned",
                "SystemAssigned,UserAssigned",
              ]),
              principalId: Schema.optional(Schema.String),
              tenantId: Schema.optional(Schema.String),
              userAssignedIdentities: Schema.optional(
                Schema.Record(
                  Schema.String,
                  Schema.Struct({
                    principalId: Schema.optional(Schema.String),
                    clientId: Schema.optional(Schema.String),
                  }),
                ),
              ),
            }),
          ),
        }),
      ),
    ),
  });
export type DicomServicesListByWorkspaceOutput =
  typeof DicomServicesListByWorkspaceOutput.Type;

// The operation
/**
 * Lists all DICOM Services for the given workspace
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DicomServicesListByWorkspace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DicomServicesListByWorkspaceInput,
    outputSchema: DicomServicesListByWorkspaceOutput,
  }));
// Input Schema
export const DicomServicesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/workspaces/{workspaceName}/dicomservices/{dicomServiceName}",
    }),
  );
export type DicomServicesUpdateInput = typeof DicomServicesUpdateInput.Type;

// Output Schema
export const DicomServicesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    identity: Schema.optional(
      Schema.Struct({
        type: Schema.Literals([
          "None",
          "SystemAssigned",
          "UserAssigned",
          "SystemAssigned,UserAssigned",
        ]),
        principalId: Schema.optional(Schema.String),
        tenantId: Schema.optional(Schema.String),
        userAssignedIdentities: Schema.optional(
          Schema.Record(
            Schema.String,
            Schema.Struct({
              principalId: Schema.optional(Schema.String),
              clientId: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
  });
export type DicomServicesUpdateOutput = typeof DicomServicesUpdateOutput.Type;

// The operation
/**
 * Patch DICOM Service details.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DicomServicesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DicomServicesUpdateInput,
  outputSchema: DicomServicesUpdateOutput,
}));
// Input Schema
export const FhirDestinationsListByIotConnectorInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/workspaces/{workspaceName}/iotconnectors/{iotConnectorName}/fhirdestinations",
    }),
  );
export type FhirDestinationsListByIotConnectorInput =
  typeof FhirDestinationsListByIotConnectorInput.Type;

// Output Schema
export const FhirDestinationsListByIotConnectorOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          location: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type FhirDestinationsListByIotConnectorOutput =
  typeof FhirDestinationsListByIotConnectorOutput.Type;

// The operation
/**
 * Lists all FHIR destinations for the given IoT Connector
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const FhirDestinationsListByIotConnector =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FhirDestinationsListByIotConnectorInput,
    outputSchema: FhirDestinationsListByIotConnectorOutput,
  }));
// Input Schema
export const FhirServicesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/workspaces/{workspaceName}/fhirservices/{fhirServiceName}",
    }),
  );
export type FhirServicesCreateOrUpdateInput =
  typeof FhirServicesCreateOrUpdateInput.Type;

// Output Schema
export const FhirServicesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    identity: Schema.optional(
      Schema.Struct({
        type: Schema.Literals([
          "None",
          "SystemAssigned",
          "UserAssigned",
          "SystemAssigned,UserAssigned",
        ]),
        principalId: Schema.optional(Schema.String),
        tenantId: Schema.optional(Schema.String),
        userAssignedIdentities: Schema.optional(
          Schema.Record(
            Schema.String,
            Schema.Struct({
              principalId: Schema.optional(Schema.String),
              clientId: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
  });
export type FhirServicesCreateOrUpdateOutput =
  typeof FhirServicesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a FHIR Service resource with the specified parameters.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const FhirServicesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FhirServicesCreateOrUpdateInput,
    outputSchema: FhirServicesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const FhirServicesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/workspaces/{workspaceName}/fhirservices/{fhirServiceName}",
    }),
  );
export type FhirServicesDeleteInput = typeof FhirServicesDeleteInput.Type;

// Output Schema
export const FhirServicesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type FhirServicesDeleteOutput = typeof FhirServicesDeleteOutput.Type;

// The operation
/**
 * Deletes a FHIR Service.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const FhirServicesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FhirServicesDeleteInput,
  outputSchema: FhirServicesDeleteOutput,
}));
// Input Schema
export const FhirServicesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/workspaces/{workspaceName}/fhirservices/{fhirServiceName}",
  }),
);
export type FhirServicesGetInput = typeof FhirServicesGetInput.Type;

// Output Schema
export const FhirServicesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  identity: Schema.optional(
    Schema.Struct({
      type: Schema.Literals([
        "None",
        "SystemAssigned",
        "UserAssigned",
        "SystemAssigned,UserAssigned",
      ]),
      principalId: Schema.optional(Schema.String),
      tenantId: Schema.optional(Schema.String),
      userAssignedIdentities: Schema.optional(
        Schema.Record(
          Schema.String,
          Schema.Struct({
            principalId: Schema.optional(Schema.String),
            clientId: Schema.optional(Schema.String),
          }),
        ),
      ),
    }),
  ),
});
export type FhirServicesGetOutput = typeof FhirServicesGetOutput.Type;

// The operation
/**
 * Gets the properties of the specified FHIR Service.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const FhirServicesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FhirServicesGetInput,
  outputSchema: FhirServicesGetOutput,
}));
// Input Schema
export const FhirServicesListByWorkspaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/workspaces/{workspaceName}/fhirservices",
    }),
  );
export type FhirServicesListByWorkspaceInput =
  typeof FhirServicesListByWorkspaceInput.Type;

// Output Schema
export const FhirServicesListByWorkspaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          identity: Schema.optional(
            Schema.Struct({
              type: Schema.Literals([
                "None",
                "SystemAssigned",
                "UserAssigned",
                "SystemAssigned,UserAssigned",
              ]),
              principalId: Schema.optional(Schema.String),
              tenantId: Schema.optional(Schema.String),
              userAssignedIdentities: Schema.optional(
                Schema.Record(
                  Schema.String,
                  Schema.Struct({
                    principalId: Schema.optional(Schema.String),
                    clientId: Schema.optional(Schema.String),
                  }),
                ),
              ),
            }),
          ),
        }),
      ),
    ),
  });
export type FhirServicesListByWorkspaceOutput =
  typeof FhirServicesListByWorkspaceOutput.Type;

// The operation
/**
 * Lists all FHIR Services for the given workspace
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const FhirServicesListByWorkspace = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FhirServicesListByWorkspaceInput,
    outputSchema: FhirServicesListByWorkspaceOutput,
  }),
);
// Input Schema
export const FhirServicesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/workspaces/{workspaceName}/fhirservices/{fhirServiceName}",
    }),
  );
export type FhirServicesUpdateInput = typeof FhirServicesUpdateInput.Type;

// Output Schema
export const FhirServicesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    identity: Schema.optional(
      Schema.Struct({
        type: Schema.Literals([
          "None",
          "SystemAssigned",
          "UserAssigned",
          "SystemAssigned,UserAssigned",
        ]),
        principalId: Schema.optional(Schema.String),
        tenantId: Schema.optional(Schema.String),
        userAssignedIdentities: Schema.optional(
          Schema.Record(
            Schema.String,
            Schema.Struct({
              principalId: Schema.optional(Schema.String),
              clientId: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
  });
export type FhirServicesUpdateOutput = typeof FhirServicesUpdateOutput.Type;

// The operation
/**
 * Patch FHIR Service details.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const FhirServicesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FhirServicesUpdateInput,
  outputSchema: FhirServicesUpdateOutput,
}));
// Input Schema
export const IotConnectorFhirDestinationCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/workspaces/{workspaceName}/iotconnectors/{iotConnectorName}/fhirdestinations/{fhirDestinationName}",
    }),
  );
export type IotConnectorFhirDestinationCreateOrUpdateInput =
  typeof IotConnectorFhirDestinationCreateOrUpdateInput.Type;

// Output Schema
export const IotConnectorFhirDestinationCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.optional(Schema.String),
  });
export type IotConnectorFhirDestinationCreateOrUpdateOutput =
  typeof IotConnectorFhirDestinationCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates an IoT Connector FHIR destination resource with the specified parameters.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const IotConnectorFhirDestinationCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IotConnectorFhirDestinationCreateOrUpdateInput,
    outputSchema: IotConnectorFhirDestinationCreateOrUpdateOutput,
  }));
// Input Schema
export const IotConnectorFhirDestinationDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/workspaces/{workspaceName}/iotconnectors/{iotConnectorName}/fhirdestinations/{fhirDestinationName}",
    }),
  );
export type IotConnectorFhirDestinationDeleteInput =
  typeof IotConnectorFhirDestinationDeleteInput.Type;

// Output Schema
export const IotConnectorFhirDestinationDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type IotConnectorFhirDestinationDeleteOutput =
  typeof IotConnectorFhirDestinationDeleteOutput.Type;

// The operation
/**
 * Deletes an IoT Connector FHIR destination.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const IotConnectorFhirDestinationDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IotConnectorFhirDestinationDeleteInput,
    outputSchema: IotConnectorFhirDestinationDeleteOutput,
  }));
// Input Schema
export const IotConnectorFhirDestinationGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/workspaces/{workspaceName}/iotconnectors/{iotConnectorName}/fhirdestinations/{fhirDestinationName}",
    }),
  );
export type IotConnectorFhirDestinationGetInput =
  typeof IotConnectorFhirDestinationGetInput.Type;

// Output Schema
export const IotConnectorFhirDestinationGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.optional(Schema.String),
  });
export type IotConnectorFhirDestinationGetOutput =
  typeof IotConnectorFhirDestinationGetOutput.Type;

// The operation
/**
 * Gets the properties of the specified Iot Connector FHIR destination.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const IotConnectorFhirDestinationGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IotConnectorFhirDestinationGetInput,
    outputSchema: IotConnectorFhirDestinationGetOutput,
  }));
// Input Schema
export const IotConnectorsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/workspaces/{workspaceName}/iotconnectors/{iotConnectorName}",
    }),
  );
export type IotConnectorsCreateOrUpdateInput =
  typeof IotConnectorsCreateOrUpdateInput.Type;

// Output Schema
export const IotConnectorsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    identity: Schema.optional(
      Schema.Struct({
        type: Schema.Literals([
          "None",
          "SystemAssigned",
          "UserAssigned",
          "SystemAssigned,UserAssigned",
        ]),
        principalId: Schema.optional(Schema.String),
        tenantId: Schema.optional(Schema.String),
        userAssignedIdentities: Schema.optional(
          Schema.Record(
            Schema.String,
            Schema.Struct({
              principalId: Schema.optional(Schema.String),
              clientId: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
  });
export type IotConnectorsCreateOrUpdateOutput =
  typeof IotConnectorsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates an IoT Connector resource with the specified parameters.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const IotConnectorsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IotConnectorsCreateOrUpdateInput,
    outputSchema: IotConnectorsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const IotConnectorsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/workspaces/{workspaceName}/iotconnectors/{iotConnectorName}",
    }),
  );
export type IotConnectorsDeleteInput = typeof IotConnectorsDeleteInput.Type;

// Output Schema
export const IotConnectorsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type IotConnectorsDeleteOutput = typeof IotConnectorsDeleteOutput.Type;

// The operation
/**
 * Deletes an IoT Connector.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const IotConnectorsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: IotConnectorsDeleteInput,
  outputSchema: IotConnectorsDeleteOutput,
}));
// Input Schema
export const IotConnectorsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/workspaces/{workspaceName}/iotconnectors/{iotConnectorName}",
  }),
);
export type IotConnectorsGetInput = typeof IotConnectorsGetInput.Type;

// Output Schema
export const IotConnectorsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    identity: Schema.optional(
      Schema.Struct({
        type: Schema.Literals([
          "None",
          "SystemAssigned",
          "UserAssigned",
          "SystemAssigned,UserAssigned",
        ]),
        principalId: Schema.optional(Schema.String),
        tenantId: Schema.optional(Schema.String),
        userAssignedIdentities: Schema.optional(
          Schema.Record(
            Schema.String,
            Schema.Struct({
              principalId: Schema.optional(Schema.String),
              clientId: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
  },
);
export type IotConnectorsGetOutput = typeof IotConnectorsGetOutput.Type;

// The operation
/**
 * Gets the properties of the specified IoT Connector.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const IotConnectorsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: IotConnectorsGetInput,
  outputSchema: IotConnectorsGetOutput,
}));
// Input Schema
export const IotConnectorsListByWorkspaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/workspaces/{workspaceName}/iotconnectors",
    }),
  );
export type IotConnectorsListByWorkspaceInput =
  typeof IotConnectorsListByWorkspaceInput.Type;

// Output Schema
export const IotConnectorsListByWorkspaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          identity: Schema.optional(
            Schema.Struct({
              type: Schema.Literals([
                "None",
                "SystemAssigned",
                "UserAssigned",
                "SystemAssigned,UserAssigned",
              ]),
              principalId: Schema.optional(Schema.String),
              tenantId: Schema.optional(Schema.String),
              userAssignedIdentities: Schema.optional(
                Schema.Record(
                  Schema.String,
                  Schema.Struct({
                    principalId: Schema.optional(Schema.String),
                    clientId: Schema.optional(Schema.String),
                  }),
                ),
              ),
            }),
          ),
        }),
      ),
    ),
  });
export type IotConnectorsListByWorkspaceOutput =
  typeof IotConnectorsListByWorkspaceOutput.Type;

// The operation
/**
 * Lists all IoT Connectors for the given workspace
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const IotConnectorsListByWorkspace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IotConnectorsListByWorkspaceInput,
    outputSchema: IotConnectorsListByWorkspaceOutput,
  }));
// Input Schema
export const IotConnectorsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/workspaces/{workspaceName}/iotconnectors/{iotConnectorName}",
    }),
  );
export type IotConnectorsUpdateInput = typeof IotConnectorsUpdateInput.Type;

// Output Schema
export const IotConnectorsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    identity: Schema.optional(
      Schema.Struct({
        type: Schema.Literals([
          "None",
          "SystemAssigned",
          "UserAssigned",
          "SystemAssigned,UserAssigned",
        ]),
        principalId: Schema.optional(Schema.String),
        tenantId: Schema.optional(Schema.String),
        userAssignedIdentities: Schema.optional(
          Schema.Record(
            Schema.String,
            Schema.Struct({
              principalId: Schema.optional(Schema.String),
              clientId: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
  });
export type IotConnectorsUpdateOutput = typeof IotConnectorsUpdateOutput.Type;

// The operation
/**
 * Patch an IoT Connector.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const IotConnectorsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: IotConnectorsUpdateInput,
  outputSchema: IotConnectorsUpdateOutput,
}));
// Input Schema
export const OperationResultsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.HealthcareApis/locations/{locationName}/operationresults/{operationResultId}",
    }),
  );
export type OperationResultsGetInput = typeof OperationResultsGetInput.Type;

// Output Schema
export const OperationResultsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    status: Schema.optional(
      Schema.Literals([
        "Canceled",
        "Succeeded",
        "Failed",
        "Requested",
        "Running",
      ]),
    ),
    startTime: Schema.optional(Schema.String),
    endTime: Schema.optional(Schema.String),
    properties: Schema.optional(Schema.Unknown),
  });
export type OperationResultsGetOutput = typeof OperationResultsGetOutput.Type;

// The operation
/**
 * Get the operation result for a long running operation.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const OperationResultsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationResultsGetInput,
  outputSchema: OperationResultsGetOutput,
}));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.HealthcareApis/operations",
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
        actionType: Schema.optional(Schema.Literals(["Internal"])),
        properties: Schema.optional(
          Schema.Struct({
            serviceSpecification: Schema.optional(
              Schema.Struct({
                logSpecifications: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      name: Schema.optional(Schema.String),
                      displayName: Schema.optional(Schema.String),
                      blobDuration: Schema.optional(Schema.String),
                    }),
                  ),
                ),
                metricSpecifications: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      name: Schema.optional(Schema.String),
                      displayName: Schema.optional(Schema.String),
                      displayDescription: Schema.optional(Schema.String),
                      unit: Schema.optional(Schema.String),
                      category: Schema.optional(Schema.String),
                      aggregationType: Schema.optional(Schema.String),
                      supportedAggregationTypes: Schema.optional(
                        Schema.Array(Schema.String),
                      ),
                      supportedTimeGrainTypes: Schema.optional(
                        Schema.Array(Schema.String),
                      ),
                      fillGapWithZero: Schema.optional(Schema.Boolean),
                      metricFilterPattern: Schema.optional(Schema.String),
                      dimensions: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            name: Schema.optional(Schema.String),
                            displayName: Schema.optional(Schema.String),
                            toBeExportedForShoebox: Schema.optional(
                              Schema.Boolean,
                            ),
                          }),
                        ),
                      ),
                      isInternal: Schema.optional(Schema.Boolean),
                      sourceMdmAccount: Schema.optional(Schema.String),
                      sourceMdmNamespace: Schema.optional(Schema.String),
                      enableRegionalMdmAccount: Schema.optional(Schema.Boolean),
                      resourceIdDimensionNameOverride: Schema.optional(
                        Schema.String,
                      ),
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
 * Lists all of the available operations supported by Microsoft Healthcare resource provider.
 *
 * @param api-version - The API version to use for this operation.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const PrivateEndpointConnectionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/services/{resourceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsDeleteInput =
  typeof PrivateEndpointConnectionsDeleteInput.Type;

// Output Schema
export const PrivateEndpointConnectionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PrivateEndpointConnectionsDeleteOutput =
  typeof PrivateEndpointConnectionsDeleteOutput.Type;

// The operation
/**
 * Deletes a private endpoint connection.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 * @param privateEndpointConnectionName - The name of the private endpoint connection associated with the Azure resource
 */
export const PrivateEndpointConnectionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsDeleteInput,
    outputSchema: PrivateEndpointConnectionsDeleteOutput,
  }));
// Input Schema
export const ServicesCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.HealthcareApis/checkNameAvailability",
    }),
  );
export type ServicesCheckNameAvailabilityInput =
  typeof ServicesCheckNameAvailabilityInput.Type;

// Output Schema
export const ServicesCheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.Literals(["Invalid", "AlreadyExists"])),
    message: Schema.optional(Schema.String),
  });
export type ServicesCheckNameAvailabilityOutput =
  typeof ServicesCheckNameAvailabilityOutput.Type;

// The operation
/**
 * Check if a service instance name is available.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ServicesCheckNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServicesCheckNameAvailabilityInput,
    outputSchema: ServicesCheckNameAvailabilityOutput,
  }));
// Input Schema
export const ServicesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/services/{resourceName}",
    }),
  );
export type ServicesCreateOrUpdateInput =
  typeof ServicesCreateOrUpdateInput.Type;

// Output Schema
export const ServicesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    kind: Schema.Literals(["fhir", "fhir-Stu3", "fhir-R4"]),
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    etag: Schema.optional(Schema.String),
    identity: Schema.optional(
      Schema.Struct({
        principalId: Schema.optional(Schema.String),
        tenantId: Schema.optional(Schema.String),
        type: Schema.optional(Schema.Literals(["SystemAssigned", "None"])),
      }),
    ),
  });
export type ServicesCreateOrUpdateOutput =
  typeof ServicesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update the metadata of a service instance.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ServicesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServicesCreateOrUpdateInput,
    outputSchema: ServicesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ServicesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/services/{resourceName}",
  }),
);
export type ServicesDeleteInput = typeof ServicesDeleteInput.Type;

// Output Schema
export const ServicesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServicesDeleteOutput = typeof ServicesDeleteOutput.Type;

// The operation
/**
 * Delete a service instance.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ServicesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServicesDeleteInput,
  outputSchema: ServicesDeleteOutput,
}));
// Input Schema
export const ServicesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/services/{resourceName}",
  }),
);
export type ServicesGetInput = typeof ServicesGetInput.Type;

// Output Schema
export const ServicesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  kind: Schema.Literals(["fhir", "fhir-Stu3", "fhir-R4"]),
  location: Schema.String,
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  etag: Schema.optional(Schema.String),
  identity: Schema.optional(
    Schema.Struct({
      principalId: Schema.optional(Schema.String),
      tenantId: Schema.optional(Schema.String),
      type: Schema.optional(Schema.Literals(["SystemAssigned", "None"])),
    }),
  ),
});
export type ServicesGetOutput = typeof ServicesGetOutput.Type;

// The operation
/**
 * Get the metadata of a service instance.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ServicesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServicesGetInput,
  outputSchema: ServicesGetOutput,
}));
// Input Schema
export const ServicesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.HealthcareApis/services",
  }),
);
export type ServicesListInput = typeof ServicesListInput.Type;

// Output Schema
export const ServicesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  nextLink: Schema.optional(Schema.String),
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
        kind: Schema.Literals(["fhir", "fhir-Stu3", "fhir-R4"]),
        location: Schema.String,
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        etag: Schema.optional(Schema.String),
        identity: Schema.optional(
          Schema.Struct({
            principalId: Schema.optional(Schema.String),
            tenantId: Schema.optional(Schema.String),
            type: Schema.optional(Schema.Literals(["SystemAssigned", "None"])),
          }),
        ),
      }),
    ),
  ),
});
export type ServicesListOutput = typeof ServicesListOutput.Type;

// The operation
/**
 * Get all the service instances in a subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ServicesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServicesListInput,
  outputSchema: ServicesListOutput,
}));
// Input Schema
export const ServicesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/services",
    }),
  );
export type ServicesListByResourceGroupInput =
  typeof ServicesListByResourceGroupInput.Type;

// Output Schema
export const ServicesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          kind: Schema.Literals(["fhir", "fhir-Stu3", "fhir-R4"]),
          location: Schema.String,
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          etag: Schema.optional(Schema.String),
          identity: Schema.optional(
            Schema.Struct({
              principalId: Schema.optional(Schema.String),
              tenantId: Schema.optional(Schema.String),
              type: Schema.optional(
                Schema.Literals(["SystemAssigned", "None"]),
              ),
            }),
          ),
        }),
      ),
    ),
  });
export type ServicesListByResourceGroupOutput =
  typeof ServicesListByResourceGroupOutput.Type;

// The operation
/**
 * Get all the service instances in a resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ServicesListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServicesListByResourceGroupInput,
    outputSchema: ServicesListByResourceGroupOutput,
  }),
);
// Input Schema
export const ServicesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/services/{resourceName}",
  }),
);
export type ServicesUpdateInput = typeof ServicesUpdateInput.Type;

// Output Schema
export const ServicesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  kind: Schema.Literals(["fhir", "fhir-Stu3", "fhir-R4"]),
  location: Schema.String,
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  etag: Schema.optional(Schema.String),
  identity: Schema.optional(
    Schema.Struct({
      principalId: Schema.optional(Schema.String),
      tenantId: Schema.optional(Schema.String),
      type: Schema.optional(Schema.Literals(["SystemAssigned", "None"])),
    }),
  ),
});
export type ServicesUpdateOutput = typeof ServicesUpdateOutput.Type;

// The operation
/**
 * Update the metadata of a service instance.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ServicesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServicesUpdateInput,
  outputSchema: ServicesUpdateOutput,
}));
// Input Schema
export const WorkspacePrivateEndpointConnectionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/workspaces/{workspaceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type WorkspacePrivateEndpointConnectionsDeleteInput =
  typeof WorkspacePrivateEndpointConnectionsDeleteInput.Type;

// Output Schema
export const WorkspacePrivateEndpointConnectionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WorkspacePrivateEndpointConnectionsDeleteOutput =
  typeof WorkspacePrivateEndpointConnectionsDeleteOutput.Type;

// The operation
/**
 * Deletes a private endpoint connection.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param privateEndpointConnectionName - The name of the private endpoint connection associated with the Azure resource
 */
export const WorkspacePrivateEndpointConnectionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkspacePrivateEndpointConnectionsDeleteInput,
    outputSchema: WorkspacePrivateEndpointConnectionsDeleteOutput,
  }));
// Input Schema
export const WorkspacesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/workspaces/{workspaceName}",
    }),
  );
export type WorkspacesCreateOrUpdateInput =
  typeof WorkspacesCreateOrUpdateInput.Type;

// Output Schema
export const WorkspacesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkspacesCreateOrUpdateOutput =
  typeof WorkspacesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a workspace resource with the specified parameters.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const WorkspacesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkspacesCreateOrUpdateInput,
    outputSchema: WorkspacesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const WorkspacesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/workspaces/{workspaceName}",
  }),
);
export type WorkspacesDeleteInput = typeof WorkspacesDeleteInput.Type;

// Output Schema
export const WorkspacesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WorkspacesDeleteOutput = typeof WorkspacesDeleteOutput.Type;

// The operation
/**
 * Deletes a specified workspace.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const WorkspacesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkspacesDeleteInput,
  outputSchema: WorkspacesDeleteOutput,
}));
// Input Schema
export const WorkspacesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/workspaces/{workspaceName}",
  }),
);
export type WorkspacesGetInput = typeof WorkspacesGetInput.Type;

// Output Schema
export const WorkspacesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type WorkspacesGetOutput = typeof WorkspacesGetOutput.Type;

// The operation
/**
 * Gets the properties of the specified workspace.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const WorkspacesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkspacesGetInput,
  outputSchema: WorkspacesGetOutput,
}));
// Input Schema
export const WorkspacesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/workspaces",
    }),
  );
export type WorkspacesListByResourceGroupInput =
  typeof WorkspacesListByResourceGroupInput.Type;

// Output Schema
export const WorkspacesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type WorkspacesListByResourceGroupOutput =
  typeof WorkspacesListByResourceGroupOutput.Type;

// The operation
/**
 * Lists all the available workspaces under the specified resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const WorkspacesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkspacesListByResourceGroupInput,
    outputSchema: WorkspacesListByResourceGroupOutput,
  }));
// Input Schema
export const WorkspacesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.HealthcareApis/workspaces",
    }),
  );
export type WorkspacesListBySubscriptionInput =
  typeof WorkspacesListBySubscriptionInput.Type;

// Output Schema
export const WorkspacesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type WorkspacesListBySubscriptionOutput =
  typeof WorkspacesListBySubscriptionOutput.Type;

// The operation
/**
 * Lists all the available workspaces under the specified subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const WorkspacesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkspacesListBySubscriptionInput,
    outputSchema: WorkspacesListBySubscriptionOutput,
  }));
// Input Schema
export const WorkspacesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/workspaces/{workspaceName}",
  }),
);
export type WorkspacesUpdateInput = typeof WorkspacesUpdateInput.Type;

// Output Schema
export const WorkspacesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type WorkspacesUpdateOutput = typeof WorkspacesUpdateOutput.Type;

// The operation
/**
 * Patch workspace details.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const WorkspacesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkspacesUpdateInput,
  outputSchema: WorkspacesUpdateOutput,
}));
