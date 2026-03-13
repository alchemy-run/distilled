/**
 * Azure Hybridnetwork API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const ArtifactManifestsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    publisherName: Schema.String.pipe(T.PathParam()),
    artifactStoreName: Schema.String.pipe(T.PathParam()),
    artifactManifestName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/publishers/{publisherName}/artifactStores/{artifactStoreName}/artifactManifests/{artifactManifestName}",
    }),
  );
export type ArtifactManifestsCreateOrUpdateInput =
  typeof ArtifactManifestsCreateOrUpdateInput.Type;

// Output Schema
export const ArtifactManifestsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ArtifactManifestsCreateOrUpdateOutput =
  typeof ArtifactManifestsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a artifact manifest.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publisherName - The name of the publisher.
 * @param artifactStoreName - The name of the artifact store.
 * @param artifactManifestName - The name of the artifact manifest.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ArtifactManifestsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ArtifactManifestsCreateOrUpdateInput,
    outputSchema: ArtifactManifestsCreateOrUpdateOutput,
  }));
// Input Schema
export const ArtifactManifestsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    publisherName: Schema.String.pipe(T.PathParam()),
    artifactStoreName: Schema.String.pipe(T.PathParam()),
    artifactManifestName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/publishers/{publisherName}/artifactStores/{artifactStoreName}/artifactManifests/{artifactManifestName}",
    }),
  );
export type ArtifactManifestsDeleteInput =
  typeof ArtifactManifestsDeleteInput.Type;

// Output Schema
export const ArtifactManifestsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ArtifactManifestsDeleteOutput =
  typeof ArtifactManifestsDeleteOutput.Type;

// The operation
/**
 * Deletes the specified artifact manifest.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publisherName - The name of the publisher.
 * @param artifactStoreName - The name of the artifact store.
 * @param artifactManifestName - The name of the artifact manifest.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ArtifactManifestsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ArtifactManifestsDeleteInput,
    outputSchema: ArtifactManifestsDeleteOutput,
  }),
);
// Input Schema
export const ArtifactManifestsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    publisherName: Schema.String.pipe(T.PathParam()),
    artifactStoreName: Schema.String.pipe(T.PathParam()),
    artifactManifestName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/publishers/{publisherName}/artifactStores/{artifactStoreName}/artifactManifests/{artifactManifestName}",
    }),
  );
export type ArtifactManifestsGetInput = typeof ArtifactManifestsGetInput.Type;

// Output Schema
export const ArtifactManifestsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ArtifactManifestsGetOutput = typeof ArtifactManifestsGetOutput.Type;

// The operation
/**
 * Gets information about a artifact manifest resource.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publisherName - The name of the publisher.
 * @param artifactStoreName - The name of the artifact store.
 * @param artifactManifestName - The name of the artifact manifest.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ArtifactManifestsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ArtifactManifestsGetInput,
    outputSchema: ArtifactManifestsGetOutput,
  }),
);
// Input Schema
export const ArtifactManifestsListByArtifactStoreInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    publisherName: Schema.String.pipe(T.PathParam()),
    artifactStoreName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/publishers/{publisherName}/artifactStores/{artifactStoreName}/artifactManifests",
    }),
  );
export type ArtifactManifestsListByArtifactStoreInput =
  typeof ArtifactManifestsListByArtifactStoreInput.Type;

// Output Schema
export const ArtifactManifestsListByArtifactStoreOutput =
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
export type ArtifactManifestsListByArtifactStoreOutput =
  typeof ArtifactManifestsListByArtifactStoreOutput.Type;

// The operation
/**
 * Gets information about the artifact manifest.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publisherName - The name of the publisher.
 * @param artifactStoreName - The name of the artifact store.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ArtifactManifestsListByArtifactStore =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ArtifactManifestsListByArtifactStoreInput,
    outputSchema: ArtifactManifestsListByArtifactStoreOutput,
  }));
// Input Schema
export const ArtifactManifestsListCredentialInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    publisherName: Schema.String.pipe(T.PathParam()),
    artifactStoreName: Schema.String.pipe(T.PathParam()),
    artifactManifestName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/publishers/{publisherName}/artifactStores/{artifactStoreName}/artifactManifests/{artifactManifestName}/listCredential",
    }),
  );
export type ArtifactManifestsListCredentialInput =
  typeof ArtifactManifestsListCredentialInput.Type;

// Output Schema
export const ArtifactManifestsListCredentialOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    credentialType: Schema.Literals([
      "Unknown",
      "AzureContainerRegistryScopedToken",
      "AzureStorageAccountToken",
    ]),
  });
export type ArtifactManifestsListCredentialOutput =
  typeof ArtifactManifestsListCredentialOutput.Type;

// The operation
/**
 * List credential for publishing artifacts defined in artifact manifest.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publisherName - The name of the publisher.
 * @param artifactStoreName - The name of the artifact store.
 * @param artifactManifestName - The name of the artifact manifest.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ArtifactManifestsListCredential =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ArtifactManifestsListCredentialInput,
    outputSchema: ArtifactManifestsListCredentialOutput,
  }));
// Input Schema
export const ArtifactManifestsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    publisherName: Schema.String.pipe(T.PathParam()),
    artifactStoreName: Schema.String.pipe(T.PathParam()),
    artifactManifestName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/publishers/{publisherName}/artifactStores/{artifactStoreName}/artifactManifests/{artifactManifestName}",
    }),
  );
export type ArtifactManifestsUpdateInput =
  typeof ArtifactManifestsUpdateInput.Type;

// Output Schema
export const ArtifactManifestsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ArtifactManifestsUpdateOutput =
  typeof ArtifactManifestsUpdateOutput.Type;

// The operation
/**
 * Updates a artifact manifest resource.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publisherName - The name of the publisher.
 * @param artifactStoreName - The name of the artifact store.
 * @param artifactManifestName - The name of the artifact manifest.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param tags - Resource tags.
 */
export const ArtifactManifestsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ArtifactManifestsUpdateInput,
    outputSchema: ArtifactManifestsUpdateOutput,
  }),
);
// Input Schema
export const ArtifactManifestsUpdateStateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    publisherName: Schema.String.pipe(T.PathParam()),
    artifactStoreName: Schema.String.pipe(T.PathParam()),
    artifactManifestName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/publishers/{publisherName}/artifactStores/{artifactStoreName}/artifactManifests/{artifactManifestName}/updateState",
    }),
  );
export type ArtifactManifestsUpdateStateInput =
  typeof ArtifactManifestsUpdateStateInput.Type;

// Output Schema
export const ArtifactManifestsUpdateStateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    artifactManifestState: Schema.optional(
      Schema.Literals([
        "Unknown",
        "Uploading",
        "Uploaded",
        "Validating",
        "ValidationFailed",
        "Succeeded",
      ]),
    ),
  });
export type ArtifactManifestsUpdateStateOutput =
  typeof ArtifactManifestsUpdateStateOutput.Type;

// The operation
/**
 * Update state for artifact manifest.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publisherName - The name of the publisher.
 * @param artifactStoreName - The name of the artifact store.
 * @param artifactManifestName - The name of the artifact manifest.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ArtifactManifestsUpdateState =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ArtifactManifestsUpdateStateInput,
    outputSchema: ArtifactManifestsUpdateStateOutput,
  }));
// Input Schema
export const ArtifactStoresAddNetworkFabricControllerEndPointsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    publisherName: Schema.String.pipe(T.PathParam()),
    artifactStoreName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/publishers/{publisherName}/artifactStores/{artifactStoreName}/addNetworkFabricControllerEndPoints",
    }),
  );
export type ArtifactStoresAddNetworkFabricControllerEndPointsInput =
  typeof ArtifactStoresAddNetworkFabricControllerEndPointsInput.Type;

// Output Schema
export const ArtifactStoresAddNetworkFabricControllerEndPointsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ArtifactStoresAddNetworkFabricControllerEndPointsOutput =
  typeof ArtifactStoresAddNetworkFabricControllerEndPointsOutput.Type;

// The operation
/**
 * Add network fabric controllers to artifact stores
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publisherName - The name of the publisher.
 * @param artifactStoreName - The name of the artifact store.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ArtifactStoresAddNetworkFabricControllerEndPoints =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ArtifactStoresAddNetworkFabricControllerEndPointsInput,
    outputSchema: ArtifactStoresAddNetworkFabricControllerEndPointsOutput,
  }));
// Input Schema
export const ArtifactStoresApprovePrivateEndPointsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    publisherName: Schema.String.pipe(T.PathParam()),
    artifactStoreName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/publishers/{publisherName}/artifactStores/{artifactStoreName}/approvePrivateEndPoints",
    }),
  );
export type ArtifactStoresApprovePrivateEndPointsInput =
  typeof ArtifactStoresApprovePrivateEndPointsInput.Type;

// Output Schema
export const ArtifactStoresApprovePrivateEndPointsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ArtifactStoresApprovePrivateEndPointsOutput =
  typeof ArtifactStoresApprovePrivateEndPointsOutput.Type;

// The operation
/**
 * Approve manual private endpoints on artifact stores
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publisherName - The name of the publisher.
 * @param artifactStoreName - The name of the artifact store.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ArtifactStoresApprovePrivateEndPoints =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ArtifactStoresApprovePrivateEndPointsInput,
    outputSchema: ArtifactStoresApprovePrivateEndPointsOutput,
  }));
// Input Schema
export const ArtifactStoresCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    publisherName: Schema.String.pipe(T.PathParam()),
    artifactStoreName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/publishers/{publisherName}/artifactStores/{artifactStoreName}",
    }),
  );
export type ArtifactStoresCreateOrUpdateInput =
  typeof ArtifactStoresCreateOrUpdateInput.Type;

// Output Schema
export const ArtifactStoresCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ArtifactStoresCreateOrUpdateOutput =
  typeof ArtifactStoresCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a artifact store.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publisherName - The name of the publisher.
 * @param artifactStoreName - The name of the artifact store.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ArtifactStoresCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ArtifactStoresCreateOrUpdateInput,
    outputSchema: ArtifactStoresCreateOrUpdateOutput,
  }));
// Input Schema
export const ArtifactStoresDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    publisherName: Schema.String.pipe(T.PathParam()),
    artifactStoreName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/publishers/{publisherName}/artifactStores/{artifactStoreName}",
    }),
  );
export type ArtifactStoresDeleteInput = typeof ArtifactStoresDeleteInput.Type;

// Output Schema
export const ArtifactStoresDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ArtifactStoresDeleteOutput = typeof ArtifactStoresDeleteOutput.Type;

// The operation
/**
 * Deletes the specified artifact store.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publisherName - The name of the publisher.
 * @param artifactStoreName - The name of the artifact store.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ArtifactStoresDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ArtifactStoresDeleteInput,
    outputSchema: ArtifactStoresDeleteOutput,
  }),
);
// Input Schema
export const ArtifactStoresDeleteNetworkFabricControllerEndPointsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    publisherName: Schema.String.pipe(T.PathParam()),
    artifactStoreName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/publishers/{publisherName}/artifactStores/{artifactStoreName}/deleteNetworkFabricControllerEndPoints",
    }),
  );
export type ArtifactStoresDeleteNetworkFabricControllerEndPointsInput =
  typeof ArtifactStoresDeleteNetworkFabricControllerEndPointsInput.Type;

// Output Schema
export const ArtifactStoresDeleteNetworkFabricControllerEndPointsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ArtifactStoresDeleteNetworkFabricControllerEndPointsOutput =
  typeof ArtifactStoresDeleteNetworkFabricControllerEndPointsOutput.Type;

// The operation
/**
 * Delete network fabric controllers on artifact stores
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publisherName - The name of the publisher.
 * @param artifactStoreName - The name of the artifact store.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ArtifactStoresDeleteNetworkFabricControllerEndPoints =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ArtifactStoresDeleteNetworkFabricControllerEndPointsInput,
    outputSchema: ArtifactStoresDeleteNetworkFabricControllerEndPointsOutput,
  }));
// Input Schema
export const ArtifactStoresGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    publisherName: Schema.String.pipe(T.PathParam()),
    artifactStoreName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/publishers/{publisherName}/artifactStores/{artifactStoreName}",
  }),
);
export type ArtifactStoresGetInput = typeof ArtifactStoresGetInput.Type;

// Output Schema
export const ArtifactStoresGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ArtifactStoresGetOutput = typeof ArtifactStoresGetOutput.Type;

// The operation
/**
 * Gets information about the specified artifact store.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publisherName - The name of the publisher.
 * @param artifactStoreName - The name of the artifact store.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ArtifactStoresGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ArtifactStoresGetInput,
  outputSchema: ArtifactStoresGetOutput,
}));
// Input Schema
export const ArtifactStoresListByPublisherInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    publisherName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/publishers/{publisherName}/artifactStores",
    }),
  );
export type ArtifactStoresListByPublisherInput =
  typeof ArtifactStoresListByPublisherInput.Type;

// Output Schema
export const ArtifactStoresListByPublisherOutput =
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
export type ArtifactStoresListByPublisherOutput =
  typeof ArtifactStoresListByPublisherOutput.Type;

// The operation
/**
 * Gets information of the ArtifactStores under publisher.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publisherName - The name of the publisher.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ArtifactStoresListByPublisher =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ArtifactStoresListByPublisherInput,
    outputSchema: ArtifactStoresListByPublisherOutput,
  }));
// Input Schema
export const ArtifactStoresListNetworkFabricControllerPrivateEndPointsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    publisherName: Schema.String.pipe(T.PathParam()),
    artifactStoreName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/publishers/{publisherName}/artifactStores/{artifactStoreName}/listNetworkFabricControllerPrivateEndPoints",
    }),
  );
export type ArtifactStoresListNetworkFabricControllerPrivateEndPointsInput =
  typeof ArtifactStoresListNetworkFabricControllerPrivateEndPointsInput.Type;

// Output Schema
export const ArtifactStoresListNetworkFabricControllerPrivateEndPointsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          networkFabricControllerIds: Schema.optional(
            Schema.Array(
              Schema.Struct({
                id: Schema.optional(Schema.String),
              }),
            ),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ArtifactStoresListNetworkFabricControllerPrivateEndPointsOutput =
  typeof ArtifactStoresListNetworkFabricControllerPrivateEndPointsOutput.Type;

// The operation
/**
 * List network fabric controllers to artifact stores
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publisherName - The name of the publisher.
 * @param artifactStoreName - The name of the artifact store.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ArtifactStoresListNetworkFabricControllerPrivateEndPoints =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ArtifactStoresListNetworkFabricControllerPrivateEndPointsInput,
    outputSchema:
      ArtifactStoresListNetworkFabricControllerPrivateEndPointsOutput,
  }));
// Input Schema
export const ArtifactStoresListPrivateEndPointsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    publisherName: Schema.String.pipe(T.PathParam()),
    artifactStoreName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/publishers/{publisherName}/artifactStores/{artifactStoreName}/listPrivateEndPoints",
    }),
  );
export type ArtifactStoresListPrivateEndPointsInput =
  typeof ArtifactStoresListPrivateEndPointsInput.Type;

// Output Schema
export const ArtifactStoresListPrivateEndPointsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          manualPrivateEndPointConnections: Schema.optional(
            Schema.Array(
              Schema.Struct({
                id: Schema.optional(Schema.String),
              }),
            ),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ArtifactStoresListPrivateEndPointsOutput =
  typeof ArtifactStoresListPrivateEndPointsOutput.Type;

// The operation
/**
 * List manual private endpoints on artifact stores
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publisherName - The name of the publisher.
 * @param artifactStoreName - The name of the artifact store.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ArtifactStoresListPrivateEndPoints =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ArtifactStoresListPrivateEndPointsInput,
    outputSchema: ArtifactStoresListPrivateEndPointsOutput,
  }));
// Input Schema
export const ArtifactStoresRemovePrivateEndPointsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    publisherName: Schema.String.pipe(T.PathParam()),
    artifactStoreName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/publishers/{publisherName}/artifactStores/{artifactStoreName}/removePrivateEndPoints",
    }),
  );
export type ArtifactStoresRemovePrivateEndPointsInput =
  typeof ArtifactStoresRemovePrivateEndPointsInput.Type;

// Output Schema
export const ArtifactStoresRemovePrivateEndPointsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ArtifactStoresRemovePrivateEndPointsOutput =
  typeof ArtifactStoresRemovePrivateEndPointsOutput.Type;

// The operation
/**
 * Remove manual private endpoints on artifact stores
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publisherName - The name of the publisher.
 * @param artifactStoreName - The name of the artifact store.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ArtifactStoresRemovePrivateEndPoints =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ArtifactStoresRemovePrivateEndPointsInput,
    outputSchema: ArtifactStoresRemovePrivateEndPointsOutput,
  }));
// Input Schema
export const ArtifactStoresUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    publisherName: Schema.String.pipe(T.PathParam()),
    artifactStoreName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/publishers/{publisherName}/artifactStores/{artifactStoreName}",
    }),
  );
export type ArtifactStoresUpdateInput = typeof ArtifactStoresUpdateInput.Type;

// Output Schema
export const ArtifactStoresUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ArtifactStoresUpdateOutput = typeof ArtifactStoresUpdateOutput.Type;

// The operation
/**
 * Update artifact store resource.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publisherName - The name of the publisher.
 * @param artifactStoreName - The name of the artifact store.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param tags - Resource tags.
 */
export const ArtifactStoresUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ArtifactStoresUpdateInput,
    outputSchema: ArtifactStoresUpdateOutput,
  }),
);
// Input Schema
export const ComponentsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  networkFunctionName: Schema.String.pipe(T.PathParam()),
  componentName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/networkFunctions/{networkFunctionName}/components/{componentName}",
  }),
);
export type ComponentsGetInput = typeof ComponentsGetInput.Type;

// Output Schema
export const ComponentsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type ComponentsGetOutput = typeof ComponentsGetOutput.Type;

// The operation
/**
 * Gets information about the specified application instance resource.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param networkFunctionName - The name of the network function.
 * @param componentName - The name of the component.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ComponentsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ComponentsGetInput,
  outputSchema: ComponentsGetOutput,
}));
// Input Schema
export const ComponentsListByNetworkFunctionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    networkFunctionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/networkFunctions/{networkFunctionName}/components",
    }),
  );
export type ComponentsListByNetworkFunctionInput =
  typeof ComponentsListByNetworkFunctionInput.Type;

// Output Schema
export const ComponentsListByNetworkFunctionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ComponentsListByNetworkFunctionOutput =
  typeof ComponentsListByNetworkFunctionOutput.Type;

// The operation
/**
 * Lists all the component resources in a network function.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param networkFunctionName - The name of the network function.
 */
export const ComponentsListByNetworkFunction =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ComponentsListByNetworkFunctionInput,
    outputSchema: ComponentsListByNetworkFunctionOutput,
  }));
// Input Schema
export const ConfigurationGroupSchemasCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    publisherName: Schema.String.pipe(T.PathParam()),
    configurationGroupSchemaName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/publishers/{publisherName}/configurationGroupSchemas/{configurationGroupSchemaName}",
    }),
  );
export type ConfigurationGroupSchemasCreateOrUpdateInput =
  typeof ConfigurationGroupSchemasCreateOrUpdateInput.Type;

// Output Schema
export const ConfigurationGroupSchemasCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ConfigurationGroupSchemasCreateOrUpdateOutput =
  typeof ConfigurationGroupSchemasCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a configuration group schema.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publisherName - The name of the publisher.
 * @param configurationGroupSchemaName - The name of the configuration group schema.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ConfigurationGroupSchemasCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationGroupSchemasCreateOrUpdateInput,
    outputSchema: ConfigurationGroupSchemasCreateOrUpdateOutput,
  }));
// Input Schema
export const ConfigurationGroupSchemasDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    publisherName: Schema.String.pipe(T.PathParam()),
    configurationGroupSchemaName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/publishers/{publisherName}/configurationGroupSchemas/{configurationGroupSchemaName}",
    }),
  );
export type ConfigurationGroupSchemasDeleteInput =
  typeof ConfigurationGroupSchemasDeleteInput.Type;

// Output Schema
export const ConfigurationGroupSchemasDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ConfigurationGroupSchemasDeleteOutput =
  typeof ConfigurationGroupSchemasDeleteOutput.Type;

// The operation
/**
 * Deletes a specified configuration group schema.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publisherName - The name of the publisher.
 * @param configurationGroupSchemaName - The name of the configuration group schema.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ConfigurationGroupSchemasDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationGroupSchemasDeleteInput,
    outputSchema: ConfigurationGroupSchemasDeleteOutput,
  }));
// Input Schema
export const ConfigurationGroupSchemasGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    publisherName: Schema.String.pipe(T.PathParam()),
    configurationGroupSchemaName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/publishers/{publisherName}/configurationGroupSchemas/{configurationGroupSchemaName}",
    }),
  );
export type ConfigurationGroupSchemasGetInput =
  typeof ConfigurationGroupSchemasGetInput.Type;

// Output Schema
export const ConfigurationGroupSchemasGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ConfigurationGroupSchemasGetOutput =
  typeof ConfigurationGroupSchemasGetOutput.Type;

// The operation
/**
 * Gets information about the specified configuration group schema.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publisherName - The name of the publisher.
 * @param configurationGroupSchemaName - The name of the configuration group schema.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ConfigurationGroupSchemasGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationGroupSchemasGetInput,
    outputSchema: ConfigurationGroupSchemasGetOutput,
  }));
// Input Schema
export const ConfigurationGroupSchemasListByPublisherInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    publisherName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/publishers/{publisherName}/configurationGroupSchemas",
    }),
  );
export type ConfigurationGroupSchemasListByPublisherInput =
  typeof ConfigurationGroupSchemasListByPublisherInput.Type;

// Output Schema
export const ConfigurationGroupSchemasListByPublisherOutput =
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
export type ConfigurationGroupSchemasListByPublisherOutput =
  typeof ConfigurationGroupSchemasListByPublisherOutput.Type;

// The operation
/**
 * Gets information of the configuration group schemas under a publisher.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publisherName - The name of the publisher.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ConfigurationGroupSchemasListByPublisher =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationGroupSchemasListByPublisherInput,
    outputSchema: ConfigurationGroupSchemasListByPublisherOutput,
  }));
// Input Schema
export const ConfigurationGroupSchemasUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    publisherName: Schema.String.pipe(T.PathParam()),
    configurationGroupSchemaName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/publishers/{publisherName}/configurationGroupSchemas/{configurationGroupSchemaName}",
    }),
  );
export type ConfigurationGroupSchemasUpdateInput =
  typeof ConfigurationGroupSchemasUpdateInput.Type;

// Output Schema
export const ConfigurationGroupSchemasUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ConfigurationGroupSchemasUpdateOutput =
  typeof ConfigurationGroupSchemasUpdateOutput.Type;

// The operation
/**
 * Updates a configuration group schema resource.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publisherName - The name of the publisher.
 * @param configurationGroupSchemaName - The name of the configuration group schema.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param tags - Resource tags.
 */
export const ConfigurationGroupSchemasUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationGroupSchemasUpdateInput,
    outputSchema: ConfigurationGroupSchemasUpdateOutput,
  }));
// Input Schema
export const ConfigurationGroupSchemasUpdateStateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    publisherName: Schema.String.pipe(T.PathParam()),
    configurationGroupSchemaName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/publishers/{publisherName}/configurationGroupSchemas/{configurationGroupSchemaName}/updateState",
    }),
  );
export type ConfigurationGroupSchemasUpdateStateInput =
  typeof ConfigurationGroupSchemasUpdateStateInput.Type;

// Output Schema
export const ConfigurationGroupSchemasUpdateStateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    versionState: Schema.optional(
      Schema.Literals(["Unknown", "Preview", "Active", "Deprecated"]),
    ),
  });
export type ConfigurationGroupSchemasUpdateStateOutput =
  typeof ConfigurationGroupSchemasUpdateStateOutput.Type;

// The operation
/**
 * Update configuration group schema state.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publisherName - The name of the publisher.
 * @param configurationGroupSchemaName - The name of the configuration group schema.
 * @param api-version - The API version to use for this operation.
 */
export const ConfigurationGroupSchemasUpdateState =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationGroupSchemasUpdateStateInput,
    outputSchema: ConfigurationGroupSchemasUpdateStateOutput,
  }));
// Input Schema
export const ConfigurationGroupValuesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    configurationGroupValueName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/configurationGroupValues/{configurationGroupValueName}",
    }),
  );
export type ConfigurationGroupValuesCreateOrUpdateInput =
  typeof ConfigurationGroupValuesCreateOrUpdateInput.Type;

// Output Schema
export const ConfigurationGroupValuesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ConfigurationGroupValuesCreateOrUpdateOutput =
  typeof ConfigurationGroupValuesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a hybrid configuration group value.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param configurationGroupValueName - The name of the configuration group value.
 */
export const ConfigurationGroupValuesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationGroupValuesCreateOrUpdateInput,
    outputSchema: ConfigurationGroupValuesCreateOrUpdateOutput,
  }));
// Input Schema
export const ConfigurationGroupValuesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    configurationGroupValueName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/configurationGroupValues/{configurationGroupValueName}",
    }),
  );
export type ConfigurationGroupValuesDeleteInput =
  typeof ConfigurationGroupValuesDeleteInput.Type;

// Output Schema
export const ConfigurationGroupValuesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ConfigurationGroupValuesDeleteOutput =
  typeof ConfigurationGroupValuesDeleteOutput.Type;

// The operation
/**
 * Deletes the specified hybrid configuration group value.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param configurationGroupValueName - The name of the configuration group value.
 */
export const ConfigurationGroupValuesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationGroupValuesDeleteInput,
    outputSchema: ConfigurationGroupValuesDeleteOutput,
  }));
// Input Schema
export const ConfigurationGroupValuesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    configurationGroupValueName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/configurationGroupValues/{configurationGroupValueName}",
    }),
  );
export type ConfigurationGroupValuesGetInput =
  typeof ConfigurationGroupValuesGetInput.Type;

// Output Schema
export const ConfigurationGroupValuesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ConfigurationGroupValuesGetOutput =
  typeof ConfigurationGroupValuesGetOutput.Type;

// The operation
/**
 * Gets information about the specified hybrid configuration group values.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param configurationGroupValueName - The name of the configuration group value.
 */
export const ConfigurationGroupValuesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ConfigurationGroupValuesGetInput,
    outputSchema: ConfigurationGroupValuesGetOutput,
  }),
);
// Input Schema
export const ConfigurationGroupValuesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/configurationGroupValues",
    }),
  );
export type ConfigurationGroupValuesListByResourceGroupInput =
  typeof ConfigurationGroupValuesListByResourceGroupInput.Type;

// Output Schema
export const ConfigurationGroupValuesListByResourceGroupOutput =
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
export type ConfigurationGroupValuesListByResourceGroupOutput =
  typeof ConfigurationGroupValuesListByResourceGroupOutput.Type;

// The operation
/**
 * Lists all the hybrid network configurationGroupValues in a resource group.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ConfigurationGroupValuesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationGroupValuesListByResourceGroupInput,
    outputSchema: ConfigurationGroupValuesListByResourceGroupOutput,
  }));
// Input Schema
export const ConfigurationGroupValuesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.HybridNetwork/configurationGroupValues",
    }),
  );
export type ConfigurationGroupValuesListBySubscriptionInput =
  typeof ConfigurationGroupValuesListBySubscriptionInput.Type;

// Output Schema
export const ConfigurationGroupValuesListBySubscriptionOutput =
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
export type ConfigurationGroupValuesListBySubscriptionOutput =
  typeof ConfigurationGroupValuesListBySubscriptionOutput.Type;

// The operation
/**
 * Lists all sites in the configuration group value in a subscription.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const ConfigurationGroupValuesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationGroupValuesListBySubscriptionInput,
    outputSchema: ConfigurationGroupValuesListBySubscriptionOutput,
  }));
// Input Schema
export const ConfigurationGroupValuesUpdateTagsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    configurationGroupValueName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/configurationGroupValues/{configurationGroupValueName}",
    }),
  );
export type ConfigurationGroupValuesUpdateTagsInput =
  typeof ConfigurationGroupValuesUpdateTagsInput.Type;

// Output Schema
export const ConfigurationGroupValuesUpdateTagsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ConfigurationGroupValuesUpdateTagsOutput =
  typeof ConfigurationGroupValuesUpdateTagsOutput.Type;

// The operation
/**
 * Updates a hybrid configuration group tags.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param configurationGroupValueName - The name of the configuration group value.
 * @param tags - Resource tags.
 */
export const ConfigurationGroupValuesUpdateTags =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationGroupValuesUpdateTagsInput,
    outputSchema: ConfigurationGroupValuesUpdateTagsOutput,
  }));
// Input Schema
export const NetworkFunctionDefinitionGroupsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    publisherName: Schema.String.pipe(T.PathParam()),
    networkFunctionDefinitionGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/publishers/{publisherName}/networkFunctionDefinitionGroups/{networkFunctionDefinitionGroupName}",
    }),
  );
export type NetworkFunctionDefinitionGroupsCreateOrUpdateInput =
  typeof NetworkFunctionDefinitionGroupsCreateOrUpdateInput.Type;

// Output Schema
export const NetworkFunctionDefinitionGroupsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NetworkFunctionDefinitionGroupsCreateOrUpdateOutput =
  typeof NetworkFunctionDefinitionGroupsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a network function definition group.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publisherName - The name of the publisher.
 * @param networkFunctionDefinitionGroupName - The name of the network function definition group.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const NetworkFunctionDefinitionGroupsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkFunctionDefinitionGroupsCreateOrUpdateInput,
    outputSchema: NetworkFunctionDefinitionGroupsCreateOrUpdateOutput,
  }));
// Input Schema
export const NetworkFunctionDefinitionGroupsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    publisherName: Schema.String.pipe(T.PathParam()),
    networkFunctionDefinitionGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/publishers/{publisherName}/networkFunctionDefinitionGroups/{networkFunctionDefinitionGroupName}",
    }),
  );
export type NetworkFunctionDefinitionGroupsDeleteInput =
  typeof NetworkFunctionDefinitionGroupsDeleteInput.Type;

// Output Schema
export const NetworkFunctionDefinitionGroupsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NetworkFunctionDefinitionGroupsDeleteOutput =
  typeof NetworkFunctionDefinitionGroupsDeleteOutput.Type;

// The operation
/**
 * Deletes a specified network function definition group.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publisherName - The name of the publisher.
 * @param networkFunctionDefinitionGroupName - The name of the network function definition group.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const NetworkFunctionDefinitionGroupsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkFunctionDefinitionGroupsDeleteInput,
    outputSchema: NetworkFunctionDefinitionGroupsDeleteOutput,
  }));
// Input Schema
export const NetworkFunctionDefinitionGroupsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    publisherName: Schema.String.pipe(T.PathParam()),
    networkFunctionDefinitionGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/publishers/{publisherName}/networkFunctionDefinitionGroups/{networkFunctionDefinitionGroupName}",
    }),
  );
export type NetworkFunctionDefinitionGroupsGetInput =
  typeof NetworkFunctionDefinitionGroupsGetInput.Type;

// Output Schema
export const NetworkFunctionDefinitionGroupsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NetworkFunctionDefinitionGroupsGetOutput =
  typeof NetworkFunctionDefinitionGroupsGetOutput.Type;

// The operation
/**
 * Gets information about the specified networkFunctionDefinition group.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publisherName - The name of the publisher.
 * @param networkFunctionDefinitionGroupName - The name of the network function definition group.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const NetworkFunctionDefinitionGroupsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkFunctionDefinitionGroupsGetInput,
    outputSchema: NetworkFunctionDefinitionGroupsGetOutput,
  }));
// Input Schema
export const NetworkFunctionDefinitionGroupsListByPublisherInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    publisherName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/publishers/{publisherName}/networkFunctionDefinitionGroups",
    }),
  );
export type NetworkFunctionDefinitionGroupsListByPublisherInput =
  typeof NetworkFunctionDefinitionGroupsListByPublisherInput.Type;

// Output Schema
export const NetworkFunctionDefinitionGroupsListByPublisherOutput =
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
export type NetworkFunctionDefinitionGroupsListByPublisherOutput =
  typeof NetworkFunctionDefinitionGroupsListByPublisherOutput.Type;

// The operation
/**
 * Gets information of the network function definition groups under a publisher.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publisherName - The name of the publisher.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const NetworkFunctionDefinitionGroupsListByPublisher =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkFunctionDefinitionGroupsListByPublisherInput,
    outputSchema: NetworkFunctionDefinitionGroupsListByPublisherOutput,
  }));
// Input Schema
export const NetworkFunctionDefinitionGroupsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    publisherName: Schema.String.pipe(T.PathParam()),
    networkFunctionDefinitionGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/publishers/{publisherName}/networkFunctionDefinitionGroups/{networkFunctionDefinitionGroupName}",
    }),
  );
export type NetworkFunctionDefinitionGroupsUpdateInput =
  typeof NetworkFunctionDefinitionGroupsUpdateInput.Type;

// Output Schema
export const NetworkFunctionDefinitionGroupsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NetworkFunctionDefinitionGroupsUpdateOutput =
  typeof NetworkFunctionDefinitionGroupsUpdateOutput.Type;

// The operation
/**
 * Updates a network function definition group resource.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publisherName - The name of the publisher.
 * @param networkFunctionDefinitionGroupName - The name of the network function definition group.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param tags - Resource tags.
 */
export const NetworkFunctionDefinitionGroupsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkFunctionDefinitionGroupsUpdateInput,
    outputSchema: NetworkFunctionDefinitionGroupsUpdateOutput,
  }));
// Input Schema
export const NetworkFunctionDefinitionVersionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    publisherName: Schema.String.pipe(T.PathParam()),
    networkFunctionDefinitionGroupName: Schema.String.pipe(T.PathParam()),
    networkFunctionDefinitionVersionName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/publishers/{publisherName}/networkFunctionDefinitionGroups/{networkFunctionDefinitionGroupName}/networkFunctionDefinitionVersions/{networkFunctionDefinitionVersionName}",
    }),
  );
export type NetworkFunctionDefinitionVersionsCreateOrUpdateInput =
  typeof NetworkFunctionDefinitionVersionsCreateOrUpdateInput.Type;

// Output Schema
export const NetworkFunctionDefinitionVersionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NetworkFunctionDefinitionVersionsCreateOrUpdateOutput =
  typeof NetworkFunctionDefinitionVersionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a network function definition version.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publisherName - The name of the publisher.
 * @param networkFunctionDefinitionGroupName - The name of the network function definition group.
 * @param networkFunctionDefinitionVersionName - The name of the network function definition version. The name should conform to the SemVer 2.0.0 specification: https://semver.org/spec/v2.0.0.html.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const NetworkFunctionDefinitionVersionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkFunctionDefinitionVersionsCreateOrUpdateInput,
    outputSchema: NetworkFunctionDefinitionVersionsCreateOrUpdateOutput,
  }));
// Input Schema
export const NetworkFunctionDefinitionVersionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    publisherName: Schema.String.pipe(T.PathParam()),
    networkFunctionDefinitionGroupName: Schema.String.pipe(T.PathParam()),
    networkFunctionDefinitionVersionName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/publishers/{publisherName}/networkFunctionDefinitionGroups/{networkFunctionDefinitionGroupName}/networkFunctionDefinitionVersions/{networkFunctionDefinitionVersionName}",
    }),
  );
export type NetworkFunctionDefinitionVersionsDeleteInput =
  typeof NetworkFunctionDefinitionVersionsDeleteInput.Type;

// Output Schema
export const NetworkFunctionDefinitionVersionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NetworkFunctionDefinitionVersionsDeleteOutput =
  typeof NetworkFunctionDefinitionVersionsDeleteOutput.Type;

// The operation
/**
 * Deletes the specified network function definition version.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publisherName - The name of the publisher.
 * @param networkFunctionDefinitionGroupName - The name of the network function definition group.
 * @param networkFunctionDefinitionVersionName - The name of the network function definition version. The name should conform to the SemVer 2.0.0 specification: https://semver.org/spec/v2.0.0.html.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const NetworkFunctionDefinitionVersionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkFunctionDefinitionVersionsDeleteInput,
    outputSchema: NetworkFunctionDefinitionVersionsDeleteOutput,
  }));
// Input Schema
export const NetworkFunctionDefinitionVersionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    publisherName: Schema.String.pipe(T.PathParam()),
    networkFunctionDefinitionGroupName: Schema.String.pipe(T.PathParam()),
    networkFunctionDefinitionVersionName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/publishers/{publisherName}/networkFunctionDefinitionGroups/{networkFunctionDefinitionGroupName}/networkFunctionDefinitionVersions/{networkFunctionDefinitionVersionName}",
    }),
  );
export type NetworkFunctionDefinitionVersionsGetInput =
  typeof NetworkFunctionDefinitionVersionsGetInput.Type;

// Output Schema
export const NetworkFunctionDefinitionVersionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NetworkFunctionDefinitionVersionsGetOutput =
  typeof NetworkFunctionDefinitionVersionsGetOutput.Type;

// The operation
/**
 * Gets information about a network function definition version.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publisherName - The name of the publisher.
 * @param networkFunctionDefinitionGroupName - The name of the network function definition group.
 * @param networkFunctionDefinitionVersionName - The name of the network function definition version. The name should conform to the SemVer 2.0.0 specification: https://semver.org/spec/v2.0.0.html.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const NetworkFunctionDefinitionVersionsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkFunctionDefinitionVersionsGetInput,
    outputSchema: NetworkFunctionDefinitionVersionsGetOutput,
  }));
// Input Schema
export const NetworkFunctionDefinitionVersionsListByNetworkFunctionDefinitionGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    publisherName: Schema.String.pipe(T.PathParam()),
    networkFunctionDefinitionGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/publishers/{publisherName}/networkFunctionDefinitionGroups/{networkFunctionDefinitionGroupName}/networkFunctionDefinitionVersions",
    }),
  );
export type NetworkFunctionDefinitionVersionsListByNetworkFunctionDefinitionGroupInput =
  typeof NetworkFunctionDefinitionVersionsListByNetworkFunctionDefinitionGroupInput.Type;

// Output Schema
export const NetworkFunctionDefinitionVersionsListByNetworkFunctionDefinitionGroupOutput =
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
export type NetworkFunctionDefinitionVersionsListByNetworkFunctionDefinitionGroupOutput =
  typeof NetworkFunctionDefinitionVersionsListByNetworkFunctionDefinitionGroupOutput.Type;

// The operation
/**
 * Gets information about a list of network function definition versions under a network function definition group.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publisherName - The name of the publisher.
 * @param networkFunctionDefinitionGroupName - The name of the network function definition group.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const NetworkFunctionDefinitionVersionsListByNetworkFunctionDefinitionGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      NetworkFunctionDefinitionVersionsListByNetworkFunctionDefinitionGroupInput,
    outputSchema:
      NetworkFunctionDefinitionVersionsListByNetworkFunctionDefinitionGroupOutput,
  }));
// Input Schema
export const NetworkFunctionDefinitionVersionsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    publisherName: Schema.String.pipe(T.PathParam()),
    networkFunctionDefinitionGroupName: Schema.String.pipe(T.PathParam()),
    networkFunctionDefinitionVersionName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/publishers/{publisherName}/networkFunctionDefinitionGroups/{networkFunctionDefinitionGroupName}/networkFunctionDefinitionVersions/{networkFunctionDefinitionVersionName}",
    }),
  );
export type NetworkFunctionDefinitionVersionsUpdateInput =
  typeof NetworkFunctionDefinitionVersionsUpdateInput.Type;

// Output Schema
export const NetworkFunctionDefinitionVersionsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NetworkFunctionDefinitionVersionsUpdateOutput =
  typeof NetworkFunctionDefinitionVersionsUpdateOutput.Type;

// The operation
/**
 * Updates a network function definition version resource.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publisherName - The name of the publisher.
 * @param networkFunctionDefinitionGroupName - The name of the network function definition group.
 * @param networkFunctionDefinitionVersionName - The name of the network function definition version. The name should conform to the SemVer 2.0.0 specification: https://semver.org/spec/v2.0.0.html.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param tags - Resource tags.
 */
export const NetworkFunctionDefinitionVersionsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkFunctionDefinitionVersionsUpdateInput,
    outputSchema: NetworkFunctionDefinitionVersionsUpdateOutput,
  }));
// Input Schema
export const NetworkFunctionDefinitionVersionsUpdateStateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    publisherName: Schema.String.pipe(T.PathParam()),
    networkFunctionDefinitionGroupName: Schema.String.pipe(T.PathParam()),
    networkFunctionDefinitionVersionName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/publishers/{publisherName}/networkFunctionDefinitionGroups/{networkFunctionDefinitionGroupName}/networkFunctionDefinitionVersions/{networkFunctionDefinitionVersionName}/updateState",
    }),
  );
export type NetworkFunctionDefinitionVersionsUpdateStateInput =
  typeof NetworkFunctionDefinitionVersionsUpdateStateInput.Type;

// Output Schema
export const NetworkFunctionDefinitionVersionsUpdateStateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    versionState: Schema.optional(
      Schema.Literals([
        "Unknown",
        "Preview",
        "Validating",
        "ValidationFailed",
        "Active",
        "Deprecated",
      ]),
    ),
  });
export type NetworkFunctionDefinitionVersionsUpdateStateOutput =
  typeof NetworkFunctionDefinitionVersionsUpdateStateOutput.Type;

// The operation
/**
 * Update network function definition version state.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publisherName - The name of the publisher.
 * @param networkFunctionDefinitionGroupName - The name of the network function definition group.
 * @param networkFunctionDefinitionVersionName - The name of the network function definition version. The name should conform to the SemVer 2.0.0 specification: https://semver.org/spec/v2.0.0.html.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const NetworkFunctionDefinitionVersionsUpdateState =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkFunctionDefinitionVersionsUpdateStateInput,
    outputSchema: NetworkFunctionDefinitionVersionsUpdateStateOutput,
  }));
// Input Schema
export const NetworkFunctionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    networkFunctionName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/networkFunctions/{networkFunctionName}",
    }),
  );
export type NetworkFunctionsCreateOrUpdateInput =
  typeof NetworkFunctionsCreateOrUpdateInput.Type;

// Output Schema
export const NetworkFunctionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NetworkFunctionsCreateOrUpdateOutput =
  typeof NetworkFunctionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a network function resource.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param networkFunctionName - Resource name for the network function resource.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const NetworkFunctionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkFunctionsCreateOrUpdateInput,
    outputSchema: NetworkFunctionsCreateOrUpdateOutput,
  }));
// Input Schema
export const NetworkFunctionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    networkFunctionName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/networkFunctions/{networkFunctionName}",
    }),
  );
export type NetworkFunctionsDeleteInput =
  typeof NetworkFunctionsDeleteInput.Type;

// Output Schema
export const NetworkFunctionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NetworkFunctionsDeleteOutput =
  typeof NetworkFunctionsDeleteOutput.Type;

// The operation
/**
 * Deletes the specified network function resource.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param networkFunctionName - The name of the network function.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const NetworkFunctionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NetworkFunctionsDeleteInput,
    outputSchema: NetworkFunctionsDeleteOutput,
  }),
);
// Input Schema
export const NetworkFunctionsExecuteRequestInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    networkFunctionName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/networkFunctions/{networkFunctionName}/executeRequest",
    }),
  );
export type NetworkFunctionsExecuteRequestInput =
  typeof NetworkFunctionsExecuteRequestInput.Type;

// Output Schema
export const NetworkFunctionsExecuteRequestOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NetworkFunctionsExecuteRequestOutput =
  typeof NetworkFunctionsExecuteRequestOutput.Type;

// The operation
/**
 * Execute a request to services on a containerized network function.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param networkFunctionName - The name of the network function.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkFunctionsExecuteRequest =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkFunctionsExecuteRequestInput,
    outputSchema: NetworkFunctionsExecuteRequestOutput,
  }));
// Input Schema
export const NetworkFunctionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    networkFunctionName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/networkFunctions/{networkFunctionName}",
    }),
  );
export type NetworkFunctionsGetInput = typeof NetworkFunctionsGetInput.Type;

// Output Schema
export const NetworkFunctionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NetworkFunctionsGetOutput = typeof NetworkFunctionsGetOutput.Type;

// The operation
/**
 * Gets information about the specified network function resource.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param networkFunctionName - The name of the network function resource.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const NetworkFunctionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NetworkFunctionsGetInput,
  outputSchema: NetworkFunctionsGetOutput,
}));
// Input Schema
export const NetworkFunctionsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/networkFunctions",
    }),
  );
export type NetworkFunctionsListByResourceGroupInput =
  typeof NetworkFunctionsListByResourceGroupInput.Type;

// Output Schema
export const NetworkFunctionsListByResourceGroupOutput =
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
export type NetworkFunctionsListByResourceGroupOutput =
  typeof NetworkFunctionsListByResourceGroupOutput.Type;

// The operation
/**
 * Lists all the network function resources in a resource group.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const NetworkFunctionsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkFunctionsListByResourceGroupInput,
    outputSchema: NetworkFunctionsListByResourceGroupOutput,
  }));
// Input Schema
export const NetworkFunctionsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.HybridNetwork/networkFunctions",
    }),
  );
export type NetworkFunctionsListBySubscriptionInput =
  typeof NetworkFunctionsListBySubscriptionInput.Type;

// Output Schema
export const NetworkFunctionsListBySubscriptionOutput =
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
export type NetworkFunctionsListBySubscriptionOutput =
  typeof NetworkFunctionsListBySubscriptionOutput.Type;

// The operation
/**
 * Lists all the network functions in a subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const NetworkFunctionsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkFunctionsListBySubscriptionInput,
    outputSchema: NetworkFunctionsListBySubscriptionOutput,
  }));
// Input Schema
export const NetworkFunctionsUpdateTagsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    networkFunctionName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/networkFunctions/{networkFunctionName}",
    }),
  );
export type NetworkFunctionsUpdateTagsInput =
  typeof NetworkFunctionsUpdateTagsInput.Type;

// Output Schema
export const NetworkFunctionsUpdateTagsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NetworkFunctionsUpdateTagsOutput =
  typeof NetworkFunctionsUpdateTagsOutput.Type;

// The operation
/**
 * Updates the tags for the network function resource.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param networkFunctionName - Resource name for the network function resource.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param tags - Resource tags.
 */
export const NetworkFunctionsUpdateTags = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NetworkFunctionsUpdateTagsInput,
    outputSchema: NetworkFunctionsUpdateTagsOutput,
  }),
);
// Input Schema
export const NetworkServiceDesignGroupsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    publisherName: Schema.String.pipe(T.PathParam()),
    networkServiceDesignGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/publishers/{publisherName}/networkServiceDesignGroups/{networkServiceDesignGroupName}",
    }),
  );
export type NetworkServiceDesignGroupsCreateOrUpdateInput =
  typeof NetworkServiceDesignGroupsCreateOrUpdateInput.Type;

// Output Schema
export const NetworkServiceDesignGroupsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NetworkServiceDesignGroupsCreateOrUpdateOutput =
  typeof NetworkServiceDesignGroupsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a network service design group.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publisherName - The name of the publisher.
 * @param networkServiceDesignGroupName - The name of the network service design group.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkServiceDesignGroupsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkServiceDesignGroupsCreateOrUpdateInput,
    outputSchema: NetworkServiceDesignGroupsCreateOrUpdateOutput,
  }));
// Input Schema
export const NetworkServiceDesignGroupsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    publisherName: Schema.String.pipe(T.PathParam()),
    networkServiceDesignGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/publishers/{publisherName}/networkServiceDesignGroups/{networkServiceDesignGroupName}",
    }),
  );
export type NetworkServiceDesignGroupsDeleteInput =
  typeof NetworkServiceDesignGroupsDeleteInput.Type;

// Output Schema
export const NetworkServiceDesignGroupsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NetworkServiceDesignGroupsDeleteOutput =
  typeof NetworkServiceDesignGroupsDeleteOutput.Type;

// The operation
/**
 * Deletes a specified network service design group.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publisherName - The name of the publisher.
 * @param networkServiceDesignGroupName - The name of the network service design group.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkServiceDesignGroupsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkServiceDesignGroupsDeleteInput,
    outputSchema: NetworkServiceDesignGroupsDeleteOutput,
  }));
// Input Schema
export const NetworkServiceDesignGroupsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    publisherName: Schema.String.pipe(T.PathParam()),
    networkServiceDesignGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/publishers/{publisherName}/networkServiceDesignGroups/{networkServiceDesignGroupName}",
    }),
  );
export type NetworkServiceDesignGroupsGetInput =
  typeof NetworkServiceDesignGroupsGetInput.Type;

// Output Schema
export const NetworkServiceDesignGroupsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NetworkServiceDesignGroupsGetOutput =
  typeof NetworkServiceDesignGroupsGetOutput.Type;

// The operation
/**
 * Gets information about the specified networkServiceDesign group.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publisherName - The name of the publisher.
 * @param networkServiceDesignGroupName - The name of the network service design group.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkServiceDesignGroupsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkServiceDesignGroupsGetInput,
    outputSchema: NetworkServiceDesignGroupsGetOutput,
  }));
// Input Schema
export const NetworkServiceDesignGroupsListByPublisherInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    publisherName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/publishers/{publisherName}/networkServiceDesignGroups",
    }),
  );
export type NetworkServiceDesignGroupsListByPublisherInput =
  typeof NetworkServiceDesignGroupsListByPublisherInput.Type;

// Output Schema
export const NetworkServiceDesignGroupsListByPublisherOutput =
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
export type NetworkServiceDesignGroupsListByPublisherOutput =
  typeof NetworkServiceDesignGroupsListByPublisherOutput.Type;

// The operation
/**
 * Gets information of the network service design groups under a publisher.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publisherName - The name of the publisher.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkServiceDesignGroupsListByPublisher =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkServiceDesignGroupsListByPublisherInput,
    outputSchema: NetworkServiceDesignGroupsListByPublisherOutput,
  }));
// Input Schema
export const NetworkServiceDesignGroupsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    publisherName: Schema.String.pipe(T.PathParam()),
    networkServiceDesignGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/publishers/{publisherName}/networkServiceDesignGroups/{networkServiceDesignGroupName}",
    }),
  );
export type NetworkServiceDesignGroupsUpdateInput =
  typeof NetworkServiceDesignGroupsUpdateInput.Type;

// Output Schema
export const NetworkServiceDesignGroupsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NetworkServiceDesignGroupsUpdateOutput =
  typeof NetworkServiceDesignGroupsUpdateOutput.Type;

// The operation
/**
 * Updates a network service design groups resource.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publisherName - The name of the publisher.
 * @param networkServiceDesignGroupName - The name of the network service design group.
 * @param api-version - The API version to use for this operation.
 * @param tags - Resource tags.
 */
export const NetworkServiceDesignGroupsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkServiceDesignGroupsUpdateInput,
    outputSchema: NetworkServiceDesignGroupsUpdateOutput,
  }));
// Input Schema
export const NetworkServiceDesignVersionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    publisherName: Schema.String.pipe(T.PathParam()),
    networkServiceDesignGroupName: Schema.String.pipe(T.PathParam()),
    networkServiceDesignVersionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/publishers/{publisherName}/networkServiceDesignGroups/{networkServiceDesignGroupName}/networkServiceDesignVersions/{networkServiceDesignVersionName}",
    }),
  );
export type NetworkServiceDesignVersionsCreateOrUpdateInput =
  typeof NetworkServiceDesignVersionsCreateOrUpdateInput.Type;

// Output Schema
export const NetworkServiceDesignVersionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NetworkServiceDesignVersionsCreateOrUpdateOutput =
  typeof NetworkServiceDesignVersionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a network service design version.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publisherName - The name of the publisher.
 * @param networkServiceDesignGroupName - The name of the network service design group.
 * @param networkServiceDesignVersionName - The name of the network service design version. The name should conform to the SemVer 2.0.0 specification: https://semver.org/spec/v2.0.0.html.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkServiceDesignVersionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkServiceDesignVersionsCreateOrUpdateInput,
    outputSchema: NetworkServiceDesignVersionsCreateOrUpdateOutput,
  }));
// Input Schema
export const NetworkServiceDesignVersionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    publisherName: Schema.String.pipe(T.PathParam()),
    networkServiceDesignGroupName: Schema.String.pipe(T.PathParam()),
    networkServiceDesignVersionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/publishers/{publisherName}/networkServiceDesignGroups/{networkServiceDesignGroupName}/networkServiceDesignVersions/{networkServiceDesignVersionName}",
    }),
  );
export type NetworkServiceDesignVersionsDeleteInput =
  typeof NetworkServiceDesignVersionsDeleteInput.Type;

// Output Schema
export const NetworkServiceDesignVersionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NetworkServiceDesignVersionsDeleteOutput =
  typeof NetworkServiceDesignVersionsDeleteOutput.Type;

// The operation
/**
 * Deletes the specified network service design version.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publisherName - The name of the publisher.
 * @param networkServiceDesignGroupName - The name of the network service design group.
 * @param networkServiceDesignVersionName - The name of the network service design version. The name should conform to the SemVer 2.0.0 specification: https://semver.org/spec/v2.0.0.html.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkServiceDesignVersionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkServiceDesignVersionsDeleteInput,
    outputSchema: NetworkServiceDesignVersionsDeleteOutput,
  }));
// Input Schema
export const NetworkServiceDesignVersionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    publisherName: Schema.String.pipe(T.PathParam()),
    networkServiceDesignGroupName: Schema.String.pipe(T.PathParam()),
    networkServiceDesignVersionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/publishers/{publisherName}/networkServiceDesignGroups/{networkServiceDesignGroupName}/networkServiceDesignVersions/{networkServiceDesignVersionName}",
    }),
  );
export type NetworkServiceDesignVersionsGetInput =
  typeof NetworkServiceDesignVersionsGetInput.Type;

// Output Schema
export const NetworkServiceDesignVersionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NetworkServiceDesignVersionsGetOutput =
  typeof NetworkServiceDesignVersionsGetOutput.Type;

// The operation
/**
 * Gets information about a network service design version.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publisherName - The name of the publisher.
 * @param networkServiceDesignGroupName - The name of the network service design group.
 * @param networkServiceDesignVersionName - The name of the network service design version. The name should conform to the SemVer 2.0.0 specification: https://semver.org/spec/v2.0.0.html.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkServiceDesignVersionsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkServiceDesignVersionsGetInput,
    outputSchema: NetworkServiceDesignVersionsGetOutput,
  }));
// Input Schema
export const NetworkServiceDesignVersionsListByNetworkServiceDesignGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    publisherName: Schema.String.pipe(T.PathParam()),
    networkServiceDesignGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/publishers/{publisherName}/networkServiceDesignGroups/{networkServiceDesignGroupName}/networkServiceDesignVersions",
    }),
  );
export type NetworkServiceDesignVersionsListByNetworkServiceDesignGroupInput =
  typeof NetworkServiceDesignVersionsListByNetworkServiceDesignGroupInput.Type;

// Output Schema
export const NetworkServiceDesignVersionsListByNetworkServiceDesignGroupOutput =
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
export type NetworkServiceDesignVersionsListByNetworkServiceDesignGroupOutput =
  typeof NetworkServiceDesignVersionsListByNetworkServiceDesignGroupOutput.Type;

// The operation
/**
 * Gets information about a list of network service design versions under a network service design group.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publisherName - The name of the publisher.
 * @param networkServiceDesignGroupName - The name of the network service design group.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkServiceDesignVersionsListByNetworkServiceDesignGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      NetworkServiceDesignVersionsListByNetworkServiceDesignGroupInput,
    outputSchema:
      NetworkServiceDesignVersionsListByNetworkServiceDesignGroupOutput,
  }));
// Input Schema
export const NetworkServiceDesignVersionsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    publisherName: Schema.String.pipe(T.PathParam()),
    networkServiceDesignGroupName: Schema.String.pipe(T.PathParam()),
    networkServiceDesignVersionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/publishers/{publisherName}/networkServiceDesignGroups/{networkServiceDesignGroupName}/networkServiceDesignVersions/{networkServiceDesignVersionName}",
    }),
  );
export type NetworkServiceDesignVersionsUpdateInput =
  typeof NetworkServiceDesignVersionsUpdateInput.Type;

// Output Schema
export const NetworkServiceDesignVersionsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NetworkServiceDesignVersionsUpdateOutput =
  typeof NetworkServiceDesignVersionsUpdateOutput.Type;

// The operation
/**
 * Updates a network service design version resource.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publisherName - The name of the publisher.
 * @param networkServiceDesignGroupName - The name of the network service design group.
 * @param networkServiceDesignVersionName - The name of the network service design version. The name should conform to the SemVer 2.0.0 specification: https://semver.org/spec/v2.0.0.html.
 * @param api-version - The API version to use for this operation.
 * @param tags - Resource tags.
 */
export const NetworkServiceDesignVersionsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkServiceDesignVersionsUpdateInput,
    outputSchema: NetworkServiceDesignVersionsUpdateOutput,
  }));
// Input Schema
export const NetworkServiceDesignVersionsUpdateStateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    publisherName: Schema.String.pipe(T.PathParam()),
    networkServiceDesignGroupName: Schema.String.pipe(T.PathParam()),
    networkServiceDesignVersionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/publishers/{publisherName}/networkServiceDesignGroups/{networkServiceDesignGroupName}/networkServiceDesignVersions/{networkServiceDesignVersionName}/updateState",
    }),
  );
export type NetworkServiceDesignVersionsUpdateStateInput =
  typeof NetworkServiceDesignVersionsUpdateStateInput.Type;

// Output Schema
export const NetworkServiceDesignVersionsUpdateStateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    versionState: Schema.optional(
      Schema.Literals(["Unknown", "Preview", "Active", "Deprecated"]),
    ),
  });
export type NetworkServiceDesignVersionsUpdateStateOutput =
  typeof NetworkServiceDesignVersionsUpdateStateOutput.Type;

// The operation
/**
 * Update network service design version state.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publisherName - The name of the publisher.
 * @param networkServiceDesignGroupName - The name of the network service design group.
 * @param networkServiceDesignVersionName - The name of the network service design version. The name should conform to the SemVer 2.0.0 specification: https://semver.org/spec/v2.0.0.html.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkServiceDesignVersionsUpdateState =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkServiceDesignVersionsUpdateStateInput,
    outputSchema: NetworkServiceDesignVersionsUpdateStateOutput,
  }));
// Input Schema
export const ProxyArtifactGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  publisherName: Schema.String.pipe(T.PathParam()),
  artifactStoreName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  artifactName: Schema.String,
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/publishers/{publisherName}/artifactStores/{artifactStoreName}/artifactVersions",
  }),
);
export type ProxyArtifactGetInput = typeof ProxyArtifactGetInput.Type;

// Output Schema
export const ProxyArtifactGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  },
);
export type ProxyArtifactGetOutput = typeof ProxyArtifactGetOutput.Type;

// The operation
/**
 * Get a Artifact overview information.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publisherName - The name of the publisher.
 * @param artifactStoreName - The name of the artifact store.
 * @param artifactName - The name of the artifact.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ProxyArtifactGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ProxyArtifactGetInput,
  outputSchema: ProxyArtifactGetOutput,
}));
// Input Schema
export const ProxyArtifactListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    publisherName: Schema.String.pipe(T.PathParam()),
    artifactStoreName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/publishers/{publisherName}/artifactStores/{artifactStoreName}/artifacts",
  }),
);
export type ProxyArtifactListInput = typeof ProxyArtifactListInput.Type;

// Output Schema
export const ProxyArtifactListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ProxyArtifactListOutput = typeof ProxyArtifactListOutput.Type;

// The operation
/**
 * Lists all the available artifacts in the parent Artifact Store.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publisherName - The name of the publisher.
 * @param artifactStoreName - The name of the artifact store.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ProxyArtifactList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ProxyArtifactListInput,
  outputSchema: ProxyArtifactListOutput,
}));
// Input Schema
export const ProxyArtifactUpdateStateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    publisherName: Schema.String.pipe(T.PathParam()),
    artifactStoreName: Schema.String.pipe(T.PathParam()),
    artifactVersionName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    artifactName: Schema.String,
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/publishers/{publisherName}/artifactStores/{artifactStoreName}/artifactVersions/{artifactVersionName}",
    }),
  );
export type ProxyArtifactUpdateStateInput =
  typeof ProxyArtifactUpdateStateInput.Type;

// Output Schema
export const ProxyArtifactUpdateStateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ProxyArtifactUpdateStateOutput =
  typeof ProxyArtifactUpdateStateOutput.Type;

// The operation
/**
 * Change artifact state defined in artifact store.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publisherName - The name of the publisher.
 * @param artifactStoreName - The name of the artifact store.
 * @param artifactName - The name of the artifact.
 * @param artifactVersionName - The name of the artifact version.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ProxyArtifactUpdateState = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ProxyArtifactUpdateStateInput,
    outputSchema: ProxyArtifactUpdateStateOutput,
  }),
);
// Input Schema
export const PublishersCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    publisherName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/publishers/{publisherName}",
    }),
  );
export type PublishersCreateOrUpdateInput =
  typeof PublishersCreateOrUpdateInput.Type;

// Output Schema
export const PublishersCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type PublishersCreateOrUpdateOutput =
  typeof PublishersCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a publisher.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publisherName - The name of the publisher.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const PublishersCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PublishersCreateOrUpdateInput,
    outputSchema: PublishersCreateOrUpdateOutput,
  }),
);
// Input Schema
export const PublishersDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  publisherName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/publishers/{publisherName}",
  }),
);
export type PublishersDeleteInput = typeof PublishersDeleteInput.Type;

// Output Schema
export const PublishersDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PublishersDeleteOutput = typeof PublishersDeleteOutput.Type;

// The operation
/**
 * Deletes the specified publisher.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publisherName - The name of the publisher.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const PublishersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PublishersDeleteInput,
  outputSchema: PublishersDeleteOutput,
}));
// Input Schema
export const PublishersGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  publisherName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/publishers/{publisherName}",
  }),
);
export type PublishersGetInput = typeof PublishersGetInput.Type;

// Output Schema
export const PublishersGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type PublishersGetOutput = typeof PublishersGetOutput.Type;

// The operation
/**
 * Gets information about the specified publisher.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publisherName - The name of the publisher.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const PublishersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PublishersGetInput,
  outputSchema: PublishersGetOutput,
}));
// Input Schema
export const PublishersListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/publishers",
    }),
  );
export type PublishersListByResourceGroupInput =
  typeof PublishersListByResourceGroupInput.Type;

// Output Schema
export const PublishersListByResourceGroupOutput =
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
export type PublishersListByResourceGroupOutput =
  typeof PublishersListByResourceGroupOutput.Type;

// The operation
/**
 * Lists all the publishers in a resource group.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const PublishersListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PublishersListByResourceGroupInput,
    outputSchema: PublishersListByResourceGroupOutput,
  }));
// Input Schema
export const PublishersListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.HybridNetwork/publishers",
    }),
  );
export type PublishersListBySubscriptionInput =
  typeof PublishersListBySubscriptionInput.Type;

// Output Schema
export const PublishersListBySubscriptionOutput =
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
export type PublishersListBySubscriptionOutput =
  typeof PublishersListBySubscriptionOutput.Type;

// The operation
/**
 * Lists all the publishers in a subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const PublishersListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PublishersListBySubscriptionInput,
    outputSchema: PublishersListBySubscriptionOutput,
  }));
// Input Schema
export const PublishersUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  publisherName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/publishers/{publisherName}",
  }),
);
export type PublishersUpdateInput = typeof PublishersUpdateInput.Type;

// Output Schema
export const PublishersUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  },
);
export type PublishersUpdateOutput = typeof PublishersUpdateOutput.Type;

// The operation
/**
 * Update a publisher resource.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publisherName - The name of the publisher.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param tags - Resource tags.
 */
export const PublishersUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PublishersUpdateInput,
  outputSchema: PublishersUpdateOutput,
}));
// Input Schema
export const SiteNetworkServicesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteNetworkServiceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/siteNetworkServices/{siteNetworkServiceName}",
    }),
  );
export type SiteNetworkServicesCreateOrUpdateInput =
  typeof SiteNetworkServicesCreateOrUpdateInput.Type;

// Output Schema
export const SiteNetworkServicesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SiteNetworkServicesCreateOrUpdateOutput =
  typeof SiteNetworkServicesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a network site.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param siteNetworkServiceName - The name of the site network service.
 */
export const SiteNetworkServicesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SiteNetworkServicesCreateOrUpdateInput,
    outputSchema: SiteNetworkServicesCreateOrUpdateOutput,
  }));
// Input Schema
export const SiteNetworkServicesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteNetworkServiceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/siteNetworkServices/{siteNetworkServiceName}",
    }),
  );
export type SiteNetworkServicesDeleteInput =
  typeof SiteNetworkServicesDeleteInput.Type;

// Output Schema
export const SiteNetworkServicesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SiteNetworkServicesDeleteOutput =
  typeof SiteNetworkServicesDeleteOutput.Type;

// The operation
/**
 * Deletes the specified site network service.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param siteNetworkServiceName - The name of the site network service.
 */
export const SiteNetworkServicesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SiteNetworkServicesDeleteInput,
    outputSchema: SiteNetworkServicesDeleteOutput,
  }),
);
// Input Schema
export const SiteNetworkServicesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteNetworkServiceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/siteNetworkServices/{siteNetworkServiceName}",
    }),
  );
export type SiteNetworkServicesGetInput =
  typeof SiteNetworkServicesGetInput.Type;

// Output Schema
export const SiteNetworkServicesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SiteNetworkServicesGetOutput =
  typeof SiteNetworkServicesGetOutput.Type;

// The operation
/**
 * Gets information about the specified site network service.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param siteNetworkServiceName - The name of the site network service.
 */
export const SiteNetworkServicesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SiteNetworkServicesGetInput,
    outputSchema: SiteNetworkServicesGetOutput,
  }),
);
// Input Schema
export const SiteNetworkServicesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/siteNetworkServices",
    }),
  );
export type SiteNetworkServicesListByResourceGroupInput =
  typeof SiteNetworkServicesListByResourceGroupInput.Type;

// Output Schema
export const SiteNetworkServicesListByResourceGroupOutput =
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
export type SiteNetworkServicesListByResourceGroupOutput =
  typeof SiteNetworkServicesListByResourceGroupOutput.Type;

// The operation
/**
 * Lists all site network services.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const SiteNetworkServicesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SiteNetworkServicesListByResourceGroupInput,
    outputSchema: SiteNetworkServicesListByResourceGroupOutput,
  }));
// Input Schema
export const SiteNetworkServicesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.HybridNetwork/siteNetworkServices",
    }),
  );
export type SiteNetworkServicesListBySubscriptionInput =
  typeof SiteNetworkServicesListBySubscriptionInput.Type;

// Output Schema
export const SiteNetworkServicesListBySubscriptionOutput =
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
export type SiteNetworkServicesListBySubscriptionOutput =
  typeof SiteNetworkServicesListBySubscriptionOutput.Type;

// The operation
/**
 * Lists all sites in the network service in a subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const SiteNetworkServicesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SiteNetworkServicesListBySubscriptionInput,
    outputSchema: SiteNetworkServicesListBySubscriptionOutput,
  }));
// Input Schema
export const SiteNetworkServicesUpdateTagsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteNetworkServiceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/siteNetworkServices/{siteNetworkServiceName}",
    }),
  );
export type SiteNetworkServicesUpdateTagsInput =
  typeof SiteNetworkServicesUpdateTagsInput.Type;

// Output Schema
export const SiteNetworkServicesUpdateTagsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SiteNetworkServicesUpdateTagsOutput =
  typeof SiteNetworkServicesUpdateTagsOutput.Type;

// The operation
/**
 * Updates a site update tags.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param siteNetworkServiceName - The name of the site network service.
 * @param tags - Resource tags.
 */
export const SiteNetworkServicesUpdateTags =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SiteNetworkServicesUpdateTagsInput,
    outputSchema: SiteNetworkServicesUpdateTagsOutput,
  }));
// Input Schema
export const SitesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/sites/{siteName}",
    }),
  );
export type SitesCreateOrUpdateInput = typeof SitesCreateOrUpdateInput.Type;

// Output Schema
export const SitesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SitesCreateOrUpdateOutput = typeof SitesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a network site.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param siteName - The name of the network service site.
 */
export const SitesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SitesCreateOrUpdateInput,
  outputSchema: SitesCreateOrUpdateOutput,
}));
// Input Schema
export const SitesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  siteName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/sites/{siteName}",
  }),
);
export type SitesDeleteInput = typeof SitesDeleteInput.Type;

// Output Schema
export const SitesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SitesDeleteOutput = typeof SitesDeleteOutput.Type;

// The operation
/**
 * Deletes the specified network site.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param siteName - The name of the network service site.
 */
export const SitesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SitesDeleteInput,
  outputSchema: SitesDeleteOutput,
}));
// Input Schema
export const SitesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  siteName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/sites/{siteName}",
  }),
);
export type SitesGetInput = typeof SitesGetInput.Type;

// Output Schema
export const SitesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type SitesGetOutput = typeof SitesGetOutput.Type;

// The operation
/**
 * Gets information about the specified network site.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param siteName - The name of the network service site.
 */
export const SitesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SitesGetInput,
  outputSchema: SitesGetOutput,
}));
// Input Schema
export const SitesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/sites",
    }),
  );
export type SitesListByResourceGroupInput =
  typeof SitesListByResourceGroupInput.Type;

// Output Schema
export const SitesListByResourceGroupOutput =
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
export type SitesListByResourceGroupOutput =
  typeof SitesListByResourceGroupOutput.Type;

// The operation
/**
 * Lists all sites in the network service.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const SitesListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SitesListByResourceGroupInput,
    outputSchema: SitesListByResourceGroupOutput,
  }),
);
// Input Schema
export const SitesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.HybridNetwork/sites",
    }),
  );
export type SitesListBySubscriptionInput =
  typeof SitesListBySubscriptionInput.Type;

// Output Schema
export const SitesListBySubscriptionOutput =
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
export type SitesListBySubscriptionOutput =
  typeof SitesListBySubscriptionOutput.Type;

// The operation
/**
 * Lists all sites in the network service in a subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const SitesListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SitesListBySubscriptionInput,
    outputSchema: SitesListBySubscriptionOutput,
  }),
);
// Input Schema
export const SitesUpdateTagsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  siteName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridNetwork/sites/{siteName}",
  }),
);
export type SitesUpdateTagsInput = typeof SitesUpdateTagsInput.Type;

// Output Schema
export const SitesUpdateTagsOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type SitesUpdateTagsOutput = typeof SitesUpdateTagsOutput.Type;

// The operation
/**
 * Updates a site update tags.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param siteName - The name of the network service site.
 * @param tags - Resource tags.
 */
export const SitesUpdateTags = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SitesUpdateTagsInput,
  outputSchema: SitesUpdateTagsOutput,
}));
