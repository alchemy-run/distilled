/**
 * Azure Containerinstance API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";
import { SensitiveString } from "../sensitive.ts";

// Input Schema
export const CGProfileCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/containerGroupProfiles/{containerGroupProfileName}",
    }),
  );
export type CGProfileCreateOrUpdateInput =
  typeof CGProfileCreateOrUpdateInput.Type;

// Output Schema
export const CGProfileCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    zones: Schema.optional(Schema.Array(Schema.String)),
  });
export type CGProfileCreateOrUpdateOutput =
  typeof CGProfileCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or Update a ContainerGroupProfile
 *
 * Create a CGProfile if it doesn't exist or update an existing CGProfile.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const CGProfileCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CGProfileCreateOrUpdateInput,
    outputSchema: CGProfileCreateOrUpdateOutput,
  }),
);
// Input Schema
export const CGProfileDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/containerGroupProfiles/{containerGroupProfileName}",
  }),
);
export type CGProfileDeleteInput = typeof CGProfileDeleteInput.Type;

// Output Schema
export const CGProfileDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CGProfileDeleteOutput = typeof CGProfileDeleteOutput.Type;

// The operation
/**
 * Container group profile DELETE REST API.
 *
 * Deletes a container group profile.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const CGProfileDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CGProfileDeleteInput,
  outputSchema: CGProfileDeleteOutput,
}));
// Input Schema
export const CGProfileGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/containerGroupProfiles/{containerGroupProfileName}",
  }),
);
export type CGProfileGetInput = typeof CGProfileGetInput.Type;

// Output Schema
export const CGProfileGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  zones: Schema.optional(Schema.Array(Schema.String)),
});
export type CGProfileGetOutput = typeof CGProfileGetOutput.Type;

// The operation
/**
 * Display information about a specified ContainerGroupProfile.
 *
 * Get the properties of the specified container group profile.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const CGProfileGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CGProfileGetInput,
  outputSchema: CGProfileGetOutput,
}));
// Input Schema
export const CGProfileGetByRevisionNumberInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/containerGroupProfiles/{containerGroupProfileName}/revisions/{revisionNumber}",
    }),
  );
export type CGProfileGetByRevisionNumberInput =
  typeof CGProfileGetByRevisionNumberInput.Type;

// Output Schema
export const CGProfileGetByRevisionNumberOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    zones: Schema.optional(Schema.Array(Schema.String)),
  });
export type CGProfileGetByRevisionNumberOutput =
  typeof CGProfileGetByRevisionNumberOutput.Type;

// The operation
/**
 * Get the properties of the specified revision of the container group profile.
 *
 * Gets the properties of the specified revision of the container group profile in the given subscription and resource group. The operation returns the properties of container group profile including containers, image registry credentials, restart policy, IP address type, OS type, volumes, current revision number, etc.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const CGProfileGetByRevisionNumber =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CGProfileGetByRevisionNumberInput,
    outputSchema: CGProfileGetByRevisionNumberOutput,
  }));
// Input Schema
export const CGProfileListAllRevisionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/containerGroupProfiles/{containerGroupProfileName}/revisions",
    }),
  );
export type CGProfileListAllRevisionsInput =
  typeof CGProfileListAllRevisionsInput.Type;

// Output Schema
export const CGProfileListAllRevisionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          zones: Schema.optional(Schema.Array(Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type CGProfileListAllRevisionsOutput =
  typeof CGProfileListAllRevisionsOutput.Type;

// The operation
/**
 * Get a list of all the revisions of the specified container group profile in the given subscription and resource group.
 *
 * Get a list of all the revisions of the specified container group profile in the given subscription and resource group. This operation returns properties of each revision of the specified container group profile including containers, image registry credentials, restart policy, IP address type, OS type volumes, revision number, etc.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const CGProfileListAllRevisions = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CGProfileListAllRevisionsInput,
    outputSchema: CGProfileListAllRevisionsOutput,
  }),
);
// Input Schema
export const CGProfilesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/containerGroupProfiles",
    }),
  );
export type CGProfilesListByResourceGroupInput =
  typeof CGProfilesListByResourceGroupInput.Type;

// Output Schema
export const CGProfilesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          zones: Schema.optional(Schema.Array(Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type CGProfilesListByResourceGroupOutput =
  typeof CGProfilesListByResourceGroupOutput.Type;

// The operation
/**
 * List container group profiles in a resource group.
 *
 * Gets a list of all container group profiles under a resource group.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const CGProfilesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CGProfilesListByResourceGroupInput,
    outputSchema: CGProfilesListByResourceGroupOutput,
  }));
// Input Schema
export const CGProfilesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ContainerInstance/containerGroupProfiles",
    }),
  );
export type CGProfilesListBySubscriptionInput =
  typeof CGProfilesListBySubscriptionInput.Type;

// Output Schema
export const CGProfilesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          zones: Schema.optional(Schema.Array(Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type CGProfilesListBySubscriptionOutput =
  typeof CGProfilesListBySubscriptionOutput.Type;

// The operation
/**
 * List container group profiles in a subscription.
 *
 * Gets a list of all container group profiles under a subscription.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const CGProfilesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CGProfilesListBySubscriptionInput,
    outputSchema: CGProfilesListBySubscriptionOutput,
  }));
// Input Schema
export const CGProfileUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/containerGroupProfiles/{containerGroupProfileName}",
  }),
);
export type CGProfileUpdateInput = typeof CGProfileUpdateInput.Type;

// Output Schema
export const CGProfileUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  zones: Schema.optional(Schema.Array(Schema.String)),
});
export type CGProfileUpdateOutput = typeof CGProfileUpdateOutput.Type;

// The operation
/**
 * Container group profile PATCH REST API.
 *
 * Update a specified container group profile.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const CGProfileUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CGProfileUpdateInput,
  outputSchema: CGProfileUpdateOutput,
}));
// Input Schema
export const ContainerGroupsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/containerGroups/{containerGroupName}",
    }),
  );
export type ContainerGroupsCreateOrUpdateInput =
  typeof ContainerGroupsCreateOrUpdateInput.Type;

// Output Schema
export const ContainerGroupsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    zones: Schema.optional(Schema.Array(Schema.String)),
    identity: Schema.optional(
      Schema.Struct({
        principalId: Schema.optional(Schema.String),
        tenantId: Schema.optional(Schema.String),
        type: Schema.optional(
          Schema.Literals([
            "SystemAssigned",
            "UserAssigned",
            "SystemAssigned, UserAssigned",
            "None",
          ]),
        ),
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
    properties: Schema.Struct({
      provisioningState: Schema.optional(Schema.String),
      secretReferences: Schema.optional(
        Schema.Array(
          Schema.Struct({
            name: Schema.String,
            identity: Schema.String,
            secretReferenceUri: Schema.String,
          }),
        ),
      ),
      containers: Schema.Array(
        Schema.Struct({
          name: Schema.String,
          properties: Schema.Struct({
            image: Schema.optional(Schema.String),
            command: Schema.optional(Schema.Array(Schema.String)),
            ports: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  protocol: Schema.optional(Schema.Literals(["TCP", "UDP"])),
                  port: Schema.Number,
                }),
              ),
            ),
            environmentVariables: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  name: Schema.String,
                  value: Schema.optional(Schema.String),
                  secureValue: Schema.optional(Schema.String),
                  secureValueReference: Schema.optional(Schema.String),
                }),
              ),
            ),
            instanceView: Schema.optional(
              Schema.Struct({
                restartCount: Schema.optional(Schema.Number),
                currentState: Schema.optional(
                  Schema.Struct({
                    state: Schema.optional(Schema.String),
                    startTime: Schema.optional(Schema.String),
                    exitCode: Schema.optional(Schema.Number),
                    finishTime: Schema.optional(Schema.String),
                    detailStatus: Schema.optional(Schema.String),
                  }),
                ),
                previousState: Schema.optional(
                  Schema.Struct({
                    state: Schema.optional(Schema.String),
                    startTime: Schema.optional(Schema.String),
                    exitCode: Schema.optional(Schema.Number),
                    finishTime: Schema.optional(Schema.String),
                    detailStatus: Schema.optional(Schema.String),
                  }),
                ),
                events: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      count: Schema.optional(Schema.Number),
                      firstTimestamp: Schema.optional(Schema.String),
                      lastTimestamp: Schema.optional(Schema.String),
                      name: Schema.optional(Schema.String),
                      message: Schema.optional(Schema.String),
                      type: Schema.optional(Schema.String),
                    }),
                  ),
                ),
              }),
            ),
            resources: Schema.optional(
              Schema.Struct({
                requests: Schema.Struct({
                  memoryInGB: Schema.Number,
                  cpu: Schema.Number,
                  gpu: Schema.optional(
                    Schema.Struct({
                      count: Schema.Number,
                      sku: Schema.Literals(["K80", "P100", "V100"]),
                    }),
                  ),
                }),
                limits: Schema.optional(
                  Schema.Struct({
                    memoryInGB: Schema.optional(Schema.Number),
                    cpu: Schema.optional(Schema.Number),
                    gpu: Schema.optional(
                      Schema.Struct({
                        count: Schema.Number,
                        sku: Schema.Literals(["K80", "P100", "V100"]),
                      }),
                    ),
                  }),
                ),
              }),
            ),
            volumeMounts: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  name: Schema.String,
                  mountPath: Schema.String,
                  readOnly: Schema.optional(Schema.Boolean),
                }),
              ),
            ),
            livenessProbe: Schema.optional(
              Schema.Struct({
                exec: Schema.optional(
                  Schema.Struct({
                    command: Schema.optional(Schema.Array(Schema.String)),
                  }),
                ),
                httpGet: Schema.optional(
                  Schema.Struct({
                    path: Schema.optional(Schema.String),
                    port: Schema.Number,
                    scheme: Schema.optional(Schema.Literals(["http", "https"])),
                    httpHeaders: Schema.optional(
                      Schema.Array(
                        Schema.Struct({
                          name: Schema.optional(Schema.String),
                          value: Schema.optional(Schema.String),
                        }),
                      ),
                    ),
                  }),
                ),
                initialDelaySeconds: Schema.optional(Schema.Number),
                periodSeconds: Schema.optional(Schema.Number),
                failureThreshold: Schema.optional(Schema.Number),
                successThreshold: Schema.optional(Schema.Number),
                timeoutSeconds: Schema.optional(Schema.Number),
              }),
            ),
            readinessProbe: Schema.optional(
              Schema.Struct({
                exec: Schema.optional(
                  Schema.Struct({
                    command: Schema.optional(Schema.Array(Schema.String)),
                  }),
                ),
                httpGet: Schema.optional(
                  Schema.Struct({
                    path: Schema.optional(Schema.String),
                    port: Schema.Number,
                    scheme: Schema.optional(Schema.Literals(["http", "https"])),
                    httpHeaders: Schema.optional(
                      Schema.Array(
                        Schema.Struct({
                          name: Schema.optional(Schema.String),
                          value: Schema.optional(Schema.String),
                        }),
                      ),
                    ),
                  }),
                ),
                initialDelaySeconds: Schema.optional(Schema.Number),
                periodSeconds: Schema.optional(Schema.Number),
                failureThreshold: Schema.optional(Schema.Number),
                successThreshold: Schema.optional(Schema.Number),
                timeoutSeconds: Schema.optional(Schema.Number),
              }),
            ),
            securityContext: Schema.optional(
              Schema.Struct({
                privileged: Schema.optional(Schema.Boolean),
                allowPrivilegeEscalation: Schema.optional(Schema.Boolean),
                capabilities: Schema.optional(
                  Schema.Struct({
                    add: Schema.optional(Schema.Array(Schema.String)),
                    drop: Schema.optional(Schema.Array(Schema.String)),
                  }),
                ),
                runAsGroup: Schema.optional(Schema.Number),
                runAsUser: Schema.optional(Schema.Number),
                seccompProfile: Schema.optional(Schema.String),
              }),
            ),
            configMap: Schema.optional(
              Schema.Struct({
                keyValuePairs: Schema.optional(
                  Schema.Record(Schema.String, Schema.String),
                ),
              }),
            ),
          }),
        }),
      ),
      imageRegistryCredentials: Schema.optional(
        Schema.Array(
          Schema.Struct({
            server: Schema.String,
            username: Schema.optional(Schema.String),
            password: Schema.optional(SensitiveString),
            passwordReference: Schema.optional(SensitiveString),
            identity: Schema.optional(Schema.String),
            identityUrl: Schema.optional(Schema.String),
          }),
        ),
      ),
      restartPolicy: Schema.optional(
        Schema.Literals(["Always", "OnFailure", "Never"]),
      ),
      ipAddress: Schema.optional(
        Schema.Struct({
          ports: Schema.Array(
            Schema.Struct({
              protocol: Schema.optional(Schema.Literals(["TCP", "UDP"])),
              port: Schema.Number,
            }),
          ),
          type: Schema.Literals(["Public", "Private"]),
          ip: Schema.optional(Schema.String),
          dnsNameLabel: Schema.optional(Schema.String),
          autoGeneratedDomainNameLabelScope: Schema.optional(
            Schema.Literals([
              "Unsecure",
              "TenantReuse",
              "SubscriptionReuse",
              "ResourceGroupReuse",
              "Noreuse",
            ]),
          ),
          fqdn: Schema.optional(Schema.String),
        }),
      ),
      osType: Schema.optional(Schema.Literals(["Windows", "Linux"])),
      volumes: Schema.optional(
        Schema.Array(
          Schema.Struct({
            name: Schema.String,
            azureFile: Schema.optional(
              Schema.Struct({
                shareName: Schema.String,
                readOnly: Schema.optional(Schema.Boolean),
                storageAccountName: Schema.String,
                storageAccountKey: Schema.optional(Schema.String),
                storageAccountKeyReference: Schema.optional(Schema.String),
              }),
            ),
            emptyDir: Schema.optional(Schema.Struct({})),
            secret: Schema.optional(
              Schema.Record(Schema.String, Schema.String),
            ),
            secretReference: Schema.optional(
              Schema.Record(Schema.String, Schema.String),
            ),
            gitRepo: Schema.optional(
              Schema.Struct({
                directory: Schema.optional(Schema.String),
                repository: Schema.String,
                revision: Schema.optional(Schema.String),
              }),
            ),
          }),
        ),
      ),
      instanceView: Schema.optional(
        Schema.Struct({
          events: Schema.optional(
            Schema.Array(
              Schema.Struct({
                count: Schema.optional(Schema.Number),
                firstTimestamp: Schema.optional(Schema.String),
                lastTimestamp: Schema.optional(Schema.String),
                name: Schema.optional(Schema.String),
                message: Schema.optional(Schema.String),
                type: Schema.optional(Schema.String),
              }),
            ),
          ),
          state: Schema.optional(Schema.String),
        }),
      ),
      diagnostics: Schema.optional(
        Schema.Struct({
          logAnalytics: Schema.optional(
            Schema.Struct({
              workspaceId: Schema.String,
              workspaceKey: Schema.String,
              logType: Schema.optional(
                Schema.Literals(["ContainerInsights", "ContainerInstanceLogs"]),
              ),
              metadata: Schema.optional(
                Schema.Record(Schema.String, Schema.String),
              ),
              workspaceResourceId: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
      subnetIds: Schema.optional(
        Schema.Array(
          Schema.Struct({
            id: Schema.String,
            name: Schema.optional(Schema.String),
          }),
        ),
      ),
      dnsConfig: Schema.optional(
        Schema.Struct({
          nameServers: Schema.Array(Schema.String),
          searchDomains: Schema.optional(Schema.String),
          options: Schema.optional(Schema.String),
        }),
      ),
      sku: Schema.optional(
        Schema.Literals([
          "NotSpecified",
          "Standard",
          "Dedicated",
          "Confidential",
        ]),
      ),
      encryptionProperties: Schema.optional(
        Schema.Struct({
          vaultBaseUrl: Schema.String,
          keyName: Schema.String,
          keyVersion: Schema.String,
          identity: Schema.optional(Schema.String),
        }),
      ),
      initContainers: Schema.optional(
        Schema.Array(
          Schema.Struct({
            name: Schema.String,
            properties: Schema.Struct({
              image: Schema.optional(Schema.String),
              command: Schema.optional(Schema.Array(Schema.String)),
              environmentVariables: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    name: Schema.String,
                    value: Schema.optional(Schema.String),
                    secureValue: Schema.optional(Schema.String),
                    secureValueReference: Schema.optional(Schema.String),
                  }),
                ),
              ),
              instanceView: Schema.optional(
                Schema.Struct({
                  restartCount: Schema.optional(Schema.Number),
                  currentState: Schema.optional(
                    Schema.Struct({
                      state: Schema.optional(Schema.String),
                      startTime: Schema.optional(Schema.String),
                      exitCode: Schema.optional(Schema.Number),
                      finishTime: Schema.optional(Schema.String),
                      detailStatus: Schema.optional(Schema.String),
                    }),
                  ),
                  previousState: Schema.optional(
                    Schema.Struct({
                      state: Schema.optional(Schema.String),
                      startTime: Schema.optional(Schema.String),
                      exitCode: Schema.optional(Schema.Number),
                      finishTime: Schema.optional(Schema.String),
                      detailStatus: Schema.optional(Schema.String),
                    }),
                  ),
                  events: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        count: Schema.optional(Schema.Number),
                        firstTimestamp: Schema.optional(Schema.String),
                        lastTimestamp: Schema.optional(Schema.String),
                        name: Schema.optional(Schema.String),
                        message: Schema.optional(Schema.String),
                        type: Schema.optional(Schema.String),
                      }),
                    ),
                  ),
                }),
              ),
              volumeMounts: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    name: Schema.String,
                    mountPath: Schema.String,
                    readOnly: Schema.optional(Schema.Boolean),
                  }),
                ),
              ),
              securityContext: Schema.optional(
                Schema.Struct({
                  privileged: Schema.optional(Schema.Boolean),
                  allowPrivilegeEscalation: Schema.optional(Schema.Boolean),
                  capabilities: Schema.optional(
                    Schema.Struct({
                      add: Schema.optional(Schema.Array(Schema.String)),
                      drop: Schema.optional(Schema.Array(Schema.String)),
                    }),
                  ),
                  runAsGroup: Schema.optional(Schema.Number),
                  runAsUser: Schema.optional(Schema.Number),
                  seccompProfile: Schema.optional(Schema.String),
                }),
              ),
            }),
          }),
        ),
      ),
      extensions: Schema.optional(
        Schema.Array(
          Schema.Struct({
            name: Schema.String,
            properties: Schema.optional(
              Schema.Struct({
                extensionType: Schema.String,
                version: Schema.String,
                settings: Schema.optional(Schema.Unknown),
                protectedSettings: Schema.optional(Schema.Unknown),
              }),
            ),
          }),
        ),
      ),
      confidentialComputeProperties: Schema.optional(
        Schema.Struct({
          ccePolicy: Schema.optional(Schema.String),
        }),
      ),
      priority: Schema.optional(Schema.Literals(["Regular", "Spot"])),
      identityAcls: Schema.optional(
        Schema.Struct({
          defaultAccess: Schema.optional(
            Schema.Literals(["All", "System", "User"]),
          ),
          acls: Schema.optional(
            Schema.Array(
              Schema.Struct({
                access: Schema.optional(
                  Schema.Literals(["All", "System", "User"]),
                ),
                identity: Schema.optional(Schema.String),
              }),
            ),
          ),
        }),
      ),
      containerGroupProfile: Schema.optional(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          revision: Schema.optional(Schema.Number),
        }),
      ),
      standbyPoolProfile: Schema.optional(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          failContainerGroupCreateOnReuseFailure: Schema.optional(
            Schema.Boolean,
          ),
        }),
      ),
      isCreatedFromStandbyPool: Schema.optional(Schema.Boolean),
    }),
  });
export type ContainerGroupsCreateOrUpdateOutput =
  typeof ContainerGroupsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update container groups.
 *
 * Create or update container groups with specified configurations.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ContainerGroupsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ContainerGroupsCreateOrUpdateInput,
    outputSchema: ContainerGroupsCreateOrUpdateOutput,
  }));
// Input Schema
export const ContainerGroupsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/containerGroups/{containerGroupName}",
    }),
  );
export type ContainerGroupsDeleteInput = typeof ContainerGroupsDeleteInput.Type;

// Output Schema
export const ContainerGroupsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    zones: Schema.optional(Schema.Array(Schema.String)),
    identity: Schema.optional(
      Schema.Struct({
        principalId: Schema.optional(Schema.String),
        tenantId: Schema.optional(Schema.String),
        type: Schema.optional(
          Schema.Literals([
            "SystemAssigned",
            "UserAssigned",
            "SystemAssigned, UserAssigned",
            "None",
          ]),
        ),
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
    properties: Schema.Struct({
      provisioningState: Schema.optional(Schema.String),
      secretReferences: Schema.optional(
        Schema.Array(
          Schema.Struct({
            name: Schema.String,
            identity: Schema.String,
            secretReferenceUri: Schema.String,
          }),
        ),
      ),
      containers: Schema.Array(
        Schema.Struct({
          name: Schema.String,
          properties: Schema.Struct({
            image: Schema.optional(Schema.String),
            command: Schema.optional(Schema.Array(Schema.String)),
            ports: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  protocol: Schema.optional(Schema.Literals(["TCP", "UDP"])),
                  port: Schema.Number,
                }),
              ),
            ),
            environmentVariables: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  name: Schema.String,
                  value: Schema.optional(Schema.String),
                  secureValue: Schema.optional(Schema.String),
                  secureValueReference: Schema.optional(Schema.String),
                }),
              ),
            ),
            instanceView: Schema.optional(
              Schema.Struct({
                restartCount: Schema.optional(Schema.Number),
                currentState: Schema.optional(
                  Schema.Struct({
                    state: Schema.optional(Schema.String),
                    startTime: Schema.optional(Schema.String),
                    exitCode: Schema.optional(Schema.Number),
                    finishTime: Schema.optional(Schema.String),
                    detailStatus: Schema.optional(Schema.String),
                  }),
                ),
                previousState: Schema.optional(
                  Schema.Struct({
                    state: Schema.optional(Schema.String),
                    startTime: Schema.optional(Schema.String),
                    exitCode: Schema.optional(Schema.Number),
                    finishTime: Schema.optional(Schema.String),
                    detailStatus: Schema.optional(Schema.String),
                  }),
                ),
                events: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      count: Schema.optional(Schema.Number),
                      firstTimestamp: Schema.optional(Schema.String),
                      lastTimestamp: Schema.optional(Schema.String),
                      name: Schema.optional(Schema.String),
                      message: Schema.optional(Schema.String),
                      type: Schema.optional(Schema.String),
                    }),
                  ),
                ),
              }),
            ),
            resources: Schema.optional(
              Schema.Struct({
                requests: Schema.Struct({
                  memoryInGB: Schema.Number,
                  cpu: Schema.Number,
                  gpu: Schema.optional(
                    Schema.Struct({
                      count: Schema.Number,
                      sku: Schema.Literals(["K80", "P100", "V100"]),
                    }),
                  ),
                }),
                limits: Schema.optional(
                  Schema.Struct({
                    memoryInGB: Schema.optional(Schema.Number),
                    cpu: Schema.optional(Schema.Number),
                    gpu: Schema.optional(
                      Schema.Struct({
                        count: Schema.Number,
                        sku: Schema.Literals(["K80", "P100", "V100"]),
                      }),
                    ),
                  }),
                ),
              }),
            ),
            volumeMounts: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  name: Schema.String,
                  mountPath: Schema.String,
                  readOnly: Schema.optional(Schema.Boolean),
                }),
              ),
            ),
            livenessProbe: Schema.optional(
              Schema.Struct({
                exec: Schema.optional(
                  Schema.Struct({
                    command: Schema.optional(Schema.Array(Schema.String)),
                  }),
                ),
                httpGet: Schema.optional(
                  Schema.Struct({
                    path: Schema.optional(Schema.String),
                    port: Schema.Number,
                    scheme: Schema.optional(Schema.Literals(["http", "https"])),
                    httpHeaders: Schema.optional(
                      Schema.Array(
                        Schema.Struct({
                          name: Schema.optional(Schema.String),
                          value: Schema.optional(Schema.String),
                        }),
                      ),
                    ),
                  }),
                ),
                initialDelaySeconds: Schema.optional(Schema.Number),
                periodSeconds: Schema.optional(Schema.Number),
                failureThreshold: Schema.optional(Schema.Number),
                successThreshold: Schema.optional(Schema.Number),
                timeoutSeconds: Schema.optional(Schema.Number),
              }),
            ),
            readinessProbe: Schema.optional(
              Schema.Struct({
                exec: Schema.optional(
                  Schema.Struct({
                    command: Schema.optional(Schema.Array(Schema.String)),
                  }),
                ),
                httpGet: Schema.optional(
                  Schema.Struct({
                    path: Schema.optional(Schema.String),
                    port: Schema.Number,
                    scheme: Schema.optional(Schema.Literals(["http", "https"])),
                    httpHeaders: Schema.optional(
                      Schema.Array(
                        Schema.Struct({
                          name: Schema.optional(Schema.String),
                          value: Schema.optional(Schema.String),
                        }),
                      ),
                    ),
                  }),
                ),
                initialDelaySeconds: Schema.optional(Schema.Number),
                periodSeconds: Schema.optional(Schema.Number),
                failureThreshold: Schema.optional(Schema.Number),
                successThreshold: Schema.optional(Schema.Number),
                timeoutSeconds: Schema.optional(Schema.Number),
              }),
            ),
            securityContext: Schema.optional(
              Schema.Struct({
                privileged: Schema.optional(Schema.Boolean),
                allowPrivilegeEscalation: Schema.optional(Schema.Boolean),
                capabilities: Schema.optional(
                  Schema.Struct({
                    add: Schema.optional(Schema.Array(Schema.String)),
                    drop: Schema.optional(Schema.Array(Schema.String)),
                  }),
                ),
                runAsGroup: Schema.optional(Schema.Number),
                runAsUser: Schema.optional(Schema.Number),
                seccompProfile: Schema.optional(Schema.String),
              }),
            ),
            configMap: Schema.optional(
              Schema.Struct({
                keyValuePairs: Schema.optional(
                  Schema.Record(Schema.String, Schema.String),
                ),
              }),
            ),
          }),
        }),
      ),
      imageRegistryCredentials: Schema.optional(
        Schema.Array(
          Schema.Struct({
            server: Schema.String,
            username: Schema.optional(Schema.String),
            password: Schema.optional(SensitiveString),
            passwordReference: Schema.optional(SensitiveString),
            identity: Schema.optional(Schema.String),
            identityUrl: Schema.optional(Schema.String),
          }),
        ),
      ),
      restartPolicy: Schema.optional(
        Schema.Literals(["Always", "OnFailure", "Never"]),
      ),
      ipAddress: Schema.optional(
        Schema.Struct({
          ports: Schema.Array(
            Schema.Struct({
              protocol: Schema.optional(Schema.Literals(["TCP", "UDP"])),
              port: Schema.Number,
            }),
          ),
          type: Schema.Literals(["Public", "Private"]),
          ip: Schema.optional(Schema.String),
          dnsNameLabel: Schema.optional(Schema.String),
          autoGeneratedDomainNameLabelScope: Schema.optional(
            Schema.Literals([
              "Unsecure",
              "TenantReuse",
              "SubscriptionReuse",
              "ResourceGroupReuse",
              "Noreuse",
            ]),
          ),
          fqdn: Schema.optional(Schema.String),
        }),
      ),
      osType: Schema.optional(Schema.Literals(["Windows", "Linux"])),
      volumes: Schema.optional(
        Schema.Array(
          Schema.Struct({
            name: Schema.String,
            azureFile: Schema.optional(
              Schema.Struct({
                shareName: Schema.String,
                readOnly: Schema.optional(Schema.Boolean),
                storageAccountName: Schema.String,
                storageAccountKey: Schema.optional(Schema.String),
                storageAccountKeyReference: Schema.optional(Schema.String),
              }),
            ),
            emptyDir: Schema.optional(Schema.Struct({})),
            secret: Schema.optional(
              Schema.Record(Schema.String, Schema.String),
            ),
            secretReference: Schema.optional(
              Schema.Record(Schema.String, Schema.String),
            ),
            gitRepo: Schema.optional(
              Schema.Struct({
                directory: Schema.optional(Schema.String),
                repository: Schema.String,
                revision: Schema.optional(Schema.String),
              }),
            ),
          }),
        ),
      ),
      instanceView: Schema.optional(
        Schema.Struct({
          events: Schema.optional(
            Schema.Array(
              Schema.Struct({
                count: Schema.optional(Schema.Number),
                firstTimestamp: Schema.optional(Schema.String),
                lastTimestamp: Schema.optional(Schema.String),
                name: Schema.optional(Schema.String),
                message: Schema.optional(Schema.String),
                type: Schema.optional(Schema.String),
              }),
            ),
          ),
          state: Schema.optional(Schema.String),
        }),
      ),
      diagnostics: Schema.optional(
        Schema.Struct({
          logAnalytics: Schema.optional(
            Schema.Struct({
              workspaceId: Schema.String,
              workspaceKey: Schema.String,
              logType: Schema.optional(
                Schema.Literals(["ContainerInsights", "ContainerInstanceLogs"]),
              ),
              metadata: Schema.optional(
                Schema.Record(Schema.String, Schema.String),
              ),
              workspaceResourceId: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
      subnetIds: Schema.optional(
        Schema.Array(
          Schema.Struct({
            id: Schema.String,
            name: Schema.optional(Schema.String),
          }),
        ),
      ),
      dnsConfig: Schema.optional(
        Schema.Struct({
          nameServers: Schema.Array(Schema.String),
          searchDomains: Schema.optional(Schema.String),
          options: Schema.optional(Schema.String),
        }),
      ),
      sku: Schema.optional(
        Schema.Literals([
          "NotSpecified",
          "Standard",
          "Dedicated",
          "Confidential",
        ]),
      ),
      encryptionProperties: Schema.optional(
        Schema.Struct({
          vaultBaseUrl: Schema.String,
          keyName: Schema.String,
          keyVersion: Schema.String,
          identity: Schema.optional(Schema.String),
        }),
      ),
      initContainers: Schema.optional(
        Schema.Array(
          Schema.Struct({
            name: Schema.String,
            properties: Schema.Struct({
              image: Schema.optional(Schema.String),
              command: Schema.optional(Schema.Array(Schema.String)),
              environmentVariables: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    name: Schema.String,
                    value: Schema.optional(Schema.String),
                    secureValue: Schema.optional(Schema.String),
                    secureValueReference: Schema.optional(Schema.String),
                  }),
                ),
              ),
              instanceView: Schema.optional(
                Schema.Struct({
                  restartCount: Schema.optional(Schema.Number),
                  currentState: Schema.optional(
                    Schema.Struct({
                      state: Schema.optional(Schema.String),
                      startTime: Schema.optional(Schema.String),
                      exitCode: Schema.optional(Schema.Number),
                      finishTime: Schema.optional(Schema.String),
                      detailStatus: Schema.optional(Schema.String),
                    }),
                  ),
                  previousState: Schema.optional(
                    Schema.Struct({
                      state: Schema.optional(Schema.String),
                      startTime: Schema.optional(Schema.String),
                      exitCode: Schema.optional(Schema.Number),
                      finishTime: Schema.optional(Schema.String),
                      detailStatus: Schema.optional(Schema.String),
                    }),
                  ),
                  events: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        count: Schema.optional(Schema.Number),
                        firstTimestamp: Schema.optional(Schema.String),
                        lastTimestamp: Schema.optional(Schema.String),
                        name: Schema.optional(Schema.String),
                        message: Schema.optional(Schema.String),
                        type: Schema.optional(Schema.String),
                      }),
                    ),
                  ),
                }),
              ),
              volumeMounts: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    name: Schema.String,
                    mountPath: Schema.String,
                    readOnly: Schema.optional(Schema.Boolean),
                  }),
                ),
              ),
              securityContext: Schema.optional(
                Schema.Struct({
                  privileged: Schema.optional(Schema.Boolean),
                  allowPrivilegeEscalation: Schema.optional(Schema.Boolean),
                  capabilities: Schema.optional(
                    Schema.Struct({
                      add: Schema.optional(Schema.Array(Schema.String)),
                      drop: Schema.optional(Schema.Array(Schema.String)),
                    }),
                  ),
                  runAsGroup: Schema.optional(Schema.Number),
                  runAsUser: Schema.optional(Schema.Number),
                  seccompProfile: Schema.optional(Schema.String),
                }),
              ),
            }),
          }),
        ),
      ),
      extensions: Schema.optional(
        Schema.Array(
          Schema.Struct({
            name: Schema.String,
            properties: Schema.optional(
              Schema.Struct({
                extensionType: Schema.String,
                version: Schema.String,
                settings: Schema.optional(Schema.Unknown),
                protectedSettings: Schema.optional(Schema.Unknown),
              }),
            ),
          }),
        ),
      ),
      confidentialComputeProperties: Schema.optional(
        Schema.Struct({
          ccePolicy: Schema.optional(Schema.String),
        }),
      ),
      priority: Schema.optional(Schema.Literals(["Regular", "Spot"])),
      identityAcls: Schema.optional(
        Schema.Struct({
          defaultAccess: Schema.optional(
            Schema.Literals(["All", "System", "User"]),
          ),
          acls: Schema.optional(
            Schema.Array(
              Schema.Struct({
                access: Schema.optional(
                  Schema.Literals(["All", "System", "User"]),
                ),
                identity: Schema.optional(Schema.String),
              }),
            ),
          ),
        }),
      ),
      containerGroupProfile: Schema.optional(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          revision: Schema.optional(Schema.Number),
        }),
      ),
      standbyPoolProfile: Schema.optional(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          failContainerGroupCreateOnReuseFailure: Schema.optional(
            Schema.Boolean,
          ),
        }),
      ),
      isCreatedFromStandbyPool: Schema.optional(Schema.Boolean),
    }),
  });
export type ContainerGroupsDeleteOutput =
  typeof ContainerGroupsDeleteOutput.Type;

// The operation
/**
 * Delete the specified container group.
 *
 * Delete the specified container group in the specified subscription and resource group. The operation does not delete other resources provided by the user, such as volumes.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ContainerGroupsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ContainerGroupsDeleteInput,
    outputSchema: ContainerGroupsDeleteOutput,
  }),
);
// Input Schema
export const ContainerGroupsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/containerGroups/{containerGroupName}",
    }),
  );
export type ContainerGroupsGetInput = typeof ContainerGroupsGetInput.Type;

// Output Schema
export const ContainerGroupsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    zones: Schema.optional(Schema.Array(Schema.String)),
    identity: Schema.optional(
      Schema.Struct({
        principalId: Schema.optional(Schema.String),
        tenantId: Schema.optional(Schema.String),
        type: Schema.optional(
          Schema.Literals([
            "SystemAssigned",
            "UserAssigned",
            "SystemAssigned, UserAssigned",
            "None",
          ]),
        ),
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
    properties: Schema.Struct({
      provisioningState: Schema.optional(Schema.String),
      secretReferences: Schema.optional(
        Schema.Array(
          Schema.Struct({
            name: Schema.String,
            identity: Schema.String,
            secretReferenceUri: Schema.String,
          }),
        ),
      ),
      containers: Schema.Array(
        Schema.Struct({
          name: Schema.String,
          properties: Schema.Struct({
            image: Schema.optional(Schema.String),
            command: Schema.optional(Schema.Array(Schema.String)),
            ports: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  protocol: Schema.optional(Schema.Literals(["TCP", "UDP"])),
                  port: Schema.Number,
                }),
              ),
            ),
            environmentVariables: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  name: Schema.String,
                  value: Schema.optional(Schema.String),
                  secureValue: Schema.optional(Schema.String),
                  secureValueReference: Schema.optional(Schema.String),
                }),
              ),
            ),
            instanceView: Schema.optional(
              Schema.Struct({
                restartCount: Schema.optional(Schema.Number),
                currentState: Schema.optional(
                  Schema.Struct({
                    state: Schema.optional(Schema.String),
                    startTime: Schema.optional(Schema.String),
                    exitCode: Schema.optional(Schema.Number),
                    finishTime: Schema.optional(Schema.String),
                    detailStatus: Schema.optional(Schema.String),
                  }),
                ),
                previousState: Schema.optional(
                  Schema.Struct({
                    state: Schema.optional(Schema.String),
                    startTime: Schema.optional(Schema.String),
                    exitCode: Schema.optional(Schema.Number),
                    finishTime: Schema.optional(Schema.String),
                    detailStatus: Schema.optional(Schema.String),
                  }),
                ),
                events: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      count: Schema.optional(Schema.Number),
                      firstTimestamp: Schema.optional(Schema.String),
                      lastTimestamp: Schema.optional(Schema.String),
                      name: Schema.optional(Schema.String),
                      message: Schema.optional(Schema.String),
                      type: Schema.optional(Schema.String),
                    }),
                  ),
                ),
              }),
            ),
            resources: Schema.optional(
              Schema.Struct({
                requests: Schema.Struct({
                  memoryInGB: Schema.Number,
                  cpu: Schema.Number,
                  gpu: Schema.optional(
                    Schema.Struct({
                      count: Schema.Number,
                      sku: Schema.Literals(["K80", "P100", "V100"]),
                    }),
                  ),
                }),
                limits: Schema.optional(
                  Schema.Struct({
                    memoryInGB: Schema.optional(Schema.Number),
                    cpu: Schema.optional(Schema.Number),
                    gpu: Schema.optional(
                      Schema.Struct({
                        count: Schema.Number,
                        sku: Schema.Literals(["K80", "P100", "V100"]),
                      }),
                    ),
                  }),
                ),
              }),
            ),
            volumeMounts: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  name: Schema.String,
                  mountPath: Schema.String,
                  readOnly: Schema.optional(Schema.Boolean),
                }),
              ),
            ),
            livenessProbe: Schema.optional(
              Schema.Struct({
                exec: Schema.optional(
                  Schema.Struct({
                    command: Schema.optional(Schema.Array(Schema.String)),
                  }),
                ),
                httpGet: Schema.optional(
                  Schema.Struct({
                    path: Schema.optional(Schema.String),
                    port: Schema.Number,
                    scheme: Schema.optional(Schema.Literals(["http", "https"])),
                    httpHeaders: Schema.optional(
                      Schema.Array(
                        Schema.Struct({
                          name: Schema.optional(Schema.String),
                          value: Schema.optional(Schema.String),
                        }),
                      ),
                    ),
                  }),
                ),
                initialDelaySeconds: Schema.optional(Schema.Number),
                periodSeconds: Schema.optional(Schema.Number),
                failureThreshold: Schema.optional(Schema.Number),
                successThreshold: Schema.optional(Schema.Number),
                timeoutSeconds: Schema.optional(Schema.Number),
              }),
            ),
            readinessProbe: Schema.optional(
              Schema.Struct({
                exec: Schema.optional(
                  Schema.Struct({
                    command: Schema.optional(Schema.Array(Schema.String)),
                  }),
                ),
                httpGet: Schema.optional(
                  Schema.Struct({
                    path: Schema.optional(Schema.String),
                    port: Schema.Number,
                    scheme: Schema.optional(Schema.Literals(["http", "https"])),
                    httpHeaders: Schema.optional(
                      Schema.Array(
                        Schema.Struct({
                          name: Schema.optional(Schema.String),
                          value: Schema.optional(Schema.String),
                        }),
                      ),
                    ),
                  }),
                ),
                initialDelaySeconds: Schema.optional(Schema.Number),
                periodSeconds: Schema.optional(Schema.Number),
                failureThreshold: Schema.optional(Schema.Number),
                successThreshold: Schema.optional(Schema.Number),
                timeoutSeconds: Schema.optional(Schema.Number),
              }),
            ),
            securityContext: Schema.optional(
              Schema.Struct({
                privileged: Schema.optional(Schema.Boolean),
                allowPrivilegeEscalation: Schema.optional(Schema.Boolean),
                capabilities: Schema.optional(
                  Schema.Struct({
                    add: Schema.optional(Schema.Array(Schema.String)),
                    drop: Schema.optional(Schema.Array(Schema.String)),
                  }),
                ),
                runAsGroup: Schema.optional(Schema.Number),
                runAsUser: Schema.optional(Schema.Number),
                seccompProfile: Schema.optional(Schema.String),
              }),
            ),
            configMap: Schema.optional(
              Schema.Struct({
                keyValuePairs: Schema.optional(
                  Schema.Record(Schema.String, Schema.String),
                ),
              }),
            ),
          }),
        }),
      ),
      imageRegistryCredentials: Schema.optional(
        Schema.Array(
          Schema.Struct({
            server: Schema.String,
            username: Schema.optional(Schema.String),
            password: Schema.optional(SensitiveString),
            passwordReference: Schema.optional(SensitiveString),
            identity: Schema.optional(Schema.String),
            identityUrl: Schema.optional(Schema.String),
          }),
        ),
      ),
      restartPolicy: Schema.optional(
        Schema.Literals(["Always", "OnFailure", "Never"]),
      ),
      ipAddress: Schema.optional(
        Schema.Struct({
          ports: Schema.Array(
            Schema.Struct({
              protocol: Schema.optional(Schema.Literals(["TCP", "UDP"])),
              port: Schema.Number,
            }),
          ),
          type: Schema.Literals(["Public", "Private"]),
          ip: Schema.optional(Schema.String),
          dnsNameLabel: Schema.optional(Schema.String),
          autoGeneratedDomainNameLabelScope: Schema.optional(
            Schema.Literals([
              "Unsecure",
              "TenantReuse",
              "SubscriptionReuse",
              "ResourceGroupReuse",
              "Noreuse",
            ]),
          ),
          fqdn: Schema.optional(Schema.String),
        }),
      ),
      osType: Schema.optional(Schema.Literals(["Windows", "Linux"])),
      volumes: Schema.optional(
        Schema.Array(
          Schema.Struct({
            name: Schema.String,
            azureFile: Schema.optional(
              Schema.Struct({
                shareName: Schema.String,
                readOnly: Schema.optional(Schema.Boolean),
                storageAccountName: Schema.String,
                storageAccountKey: Schema.optional(Schema.String),
                storageAccountKeyReference: Schema.optional(Schema.String),
              }),
            ),
            emptyDir: Schema.optional(Schema.Struct({})),
            secret: Schema.optional(
              Schema.Record(Schema.String, Schema.String),
            ),
            secretReference: Schema.optional(
              Schema.Record(Schema.String, Schema.String),
            ),
            gitRepo: Schema.optional(
              Schema.Struct({
                directory: Schema.optional(Schema.String),
                repository: Schema.String,
                revision: Schema.optional(Schema.String),
              }),
            ),
          }),
        ),
      ),
      instanceView: Schema.optional(
        Schema.Struct({
          events: Schema.optional(
            Schema.Array(
              Schema.Struct({
                count: Schema.optional(Schema.Number),
                firstTimestamp: Schema.optional(Schema.String),
                lastTimestamp: Schema.optional(Schema.String),
                name: Schema.optional(Schema.String),
                message: Schema.optional(Schema.String),
                type: Schema.optional(Schema.String),
              }),
            ),
          ),
          state: Schema.optional(Schema.String),
        }),
      ),
      diagnostics: Schema.optional(
        Schema.Struct({
          logAnalytics: Schema.optional(
            Schema.Struct({
              workspaceId: Schema.String,
              workspaceKey: Schema.String,
              logType: Schema.optional(
                Schema.Literals(["ContainerInsights", "ContainerInstanceLogs"]),
              ),
              metadata: Schema.optional(
                Schema.Record(Schema.String, Schema.String),
              ),
              workspaceResourceId: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
      subnetIds: Schema.optional(
        Schema.Array(
          Schema.Struct({
            id: Schema.String,
            name: Schema.optional(Schema.String),
          }),
        ),
      ),
      dnsConfig: Schema.optional(
        Schema.Struct({
          nameServers: Schema.Array(Schema.String),
          searchDomains: Schema.optional(Schema.String),
          options: Schema.optional(Schema.String),
        }),
      ),
      sku: Schema.optional(
        Schema.Literals([
          "NotSpecified",
          "Standard",
          "Dedicated",
          "Confidential",
        ]),
      ),
      encryptionProperties: Schema.optional(
        Schema.Struct({
          vaultBaseUrl: Schema.String,
          keyName: Schema.String,
          keyVersion: Schema.String,
          identity: Schema.optional(Schema.String),
        }),
      ),
      initContainers: Schema.optional(
        Schema.Array(
          Schema.Struct({
            name: Schema.String,
            properties: Schema.Struct({
              image: Schema.optional(Schema.String),
              command: Schema.optional(Schema.Array(Schema.String)),
              environmentVariables: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    name: Schema.String,
                    value: Schema.optional(Schema.String),
                    secureValue: Schema.optional(Schema.String),
                    secureValueReference: Schema.optional(Schema.String),
                  }),
                ),
              ),
              instanceView: Schema.optional(
                Schema.Struct({
                  restartCount: Schema.optional(Schema.Number),
                  currentState: Schema.optional(
                    Schema.Struct({
                      state: Schema.optional(Schema.String),
                      startTime: Schema.optional(Schema.String),
                      exitCode: Schema.optional(Schema.Number),
                      finishTime: Schema.optional(Schema.String),
                      detailStatus: Schema.optional(Schema.String),
                    }),
                  ),
                  previousState: Schema.optional(
                    Schema.Struct({
                      state: Schema.optional(Schema.String),
                      startTime: Schema.optional(Schema.String),
                      exitCode: Schema.optional(Schema.Number),
                      finishTime: Schema.optional(Schema.String),
                      detailStatus: Schema.optional(Schema.String),
                    }),
                  ),
                  events: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        count: Schema.optional(Schema.Number),
                        firstTimestamp: Schema.optional(Schema.String),
                        lastTimestamp: Schema.optional(Schema.String),
                        name: Schema.optional(Schema.String),
                        message: Schema.optional(Schema.String),
                        type: Schema.optional(Schema.String),
                      }),
                    ),
                  ),
                }),
              ),
              volumeMounts: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    name: Schema.String,
                    mountPath: Schema.String,
                    readOnly: Schema.optional(Schema.Boolean),
                  }),
                ),
              ),
              securityContext: Schema.optional(
                Schema.Struct({
                  privileged: Schema.optional(Schema.Boolean),
                  allowPrivilegeEscalation: Schema.optional(Schema.Boolean),
                  capabilities: Schema.optional(
                    Schema.Struct({
                      add: Schema.optional(Schema.Array(Schema.String)),
                      drop: Schema.optional(Schema.Array(Schema.String)),
                    }),
                  ),
                  runAsGroup: Schema.optional(Schema.Number),
                  runAsUser: Schema.optional(Schema.Number),
                  seccompProfile: Schema.optional(Schema.String),
                }),
              ),
            }),
          }),
        ),
      ),
      extensions: Schema.optional(
        Schema.Array(
          Schema.Struct({
            name: Schema.String,
            properties: Schema.optional(
              Schema.Struct({
                extensionType: Schema.String,
                version: Schema.String,
                settings: Schema.optional(Schema.Unknown),
                protectedSettings: Schema.optional(Schema.Unknown),
              }),
            ),
          }),
        ),
      ),
      confidentialComputeProperties: Schema.optional(
        Schema.Struct({
          ccePolicy: Schema.optional(Schema.String),
        }),
      ),
      priority: Schema.optional(Schema.Literals(["Regular", "Spot"])),
      identityAcls: Schema.optional(
        Schema.Struct({
          defaultAccess: Schema.optional(
            Schema.Literals(["All", "System", "User"]),
          ),
          acls: Schema.optional(
            Schema.Array(
              Schema.Struct({
                access: Schema.optional(
                  Schema.Literals(["All", "System", "User"]),
                ),
                identity: Schema.optional(Schema.String),
              }),
            ),
          ),
        }),
      ),
      containerGroupProfile: Schema.optional(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          revision: Schema.optional(Schema.Number),
        }),
      ),
      standbyPoolProfile: Schema.optional(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          failContainerGroupCreateOnReuseFailure: Schema.optional(
            Schema.Boolean,
          ),
        }),
      ),
      isCreatedFromStandbyPool: Schema.optional(Schema.Boolean),
    }),
  });
export type ContainerGroupsGetOutput = typeof ContainerGroupsGetOutput.Type;

// The operation
/**
 * Get the properties of the specified container group.
 *
 * Gets the properties of the specified container group in the specified subscription and resource group. The operation returns the properties of each container group including containers, image registry credentials, restart policy, IP address type, OS type, state, and volumes.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ContainerGroupsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ContainerGroupsGetInput,
  outputSchema: ContainerGroupsGetOutput,
}));
// Input Schema
export const ContainerGroupsGetOutboundNetworkDependenciesEndpointsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/containerGroups/{containerGroupName}/outboundNetworkDependenciesEndpoints",
    }),
  );
export type ContainerGroupsGetOutboundNetworkDependenciesEndpointsInput =
  typeof ContainerGroupsGetOutboundNetworkDependenciesEndpointsInput.Type;

// Output Schema
export const ContainerGroupsGetOutboundNetworkDependenciesEndpointsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Array(Schema.String);
export type ContainerGroupsGetOutboundNetworkDependenciesEndpointsOutput =
  typeof ContainerGroupsGetOutboundNetworkDependenciesEndpointsOutput.Type;

// The operation
/**
 * Get all network dependencies for container group.
 *
 * Gets all the network dependencies for this container group to allow complete control of network setting and configuration. For container groups, this will always be an empty list.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ContainerGroupsGetOutboundNetworkDependenciesEndpoints =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ContainerGroupsGetOutboundNetworkDependenciesEndpointsInput,
    outputSchema: ContainerGroupsGetOutboundNetworkDependenciesEndpointsOutput,
  }));
// Input Schema
export const ContainerGroupsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ContainerInstance/containerGroups",
    }),
  );
export type ContainerGroupsListInput = typeof ContainerGroupsListInput.Type;

// Output Schema
export const ContainerGroupsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          zones: Schema.optional(Schema.Array(Schema.String)),
          identity: Schema.optional(
            Schema.Struct({
              principalId: Schema.optional(Schema.String),
              tenantId: Schema.optional(Schema.String),
              type: Schema.optional(
                Schema.Literals([
                  "SystemAssigned",
                  "UserAssigned",
                  "SystemAssigned, UserAssigned",
                  "None",
                ]),
              ),
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
          properties: Schema.Struct({
            provisioningState: Schema.optional(
              Schema.Literals([
                "NotSpecified",
                "Accepted",
                "Pending",
                "Updating",
                "Creating",
                "Repairing",
                "Unhealthy",
                "Failed",
                "Canceled",
                "Succeeded",
                "Deleting",
                "NotAccessible",
                "PreProvisioned",
              ]),
            ),
            secretReferences: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  name: Schema.String,
                  identity: Schema.String,
                  secretReferenceUri: Schema.String,
                }),
              ),
            ),
            containers: Schema.Array(
              Schema.Struct({
                name: Schema.String,
                properties: Schema.Struct({
                  image: Schema.optional(Schema.String),
                  command: Schema.optional(Schema.Array(Schema.String)),
                  ports: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        protocol: Schema.optional(
                          Schema.Literals(["TCP", "UDP"]),
                        ),
                        port: Schema.Number,
                      }),
                    ),
                  ),
                  environmentVariables: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        name: Schema.String,
                        value: Schema.optional(Schema.String),
                        secureValue: Schema.optional(Schema.String),
                        secureValueReference: Schema.optional(Schema.String),
                      }),
                    ),
                  ),
                  instanceView: Schema.optional(
                    Schema.Struct({
                      restartCount: Schema.optional(Schema.Number),
                      currentState: Schema.optional(
                        Schema.Struct({
                          state: Schema.optional(Schema.String),
                          startTime: Schema.optional(Schema.String),
                          exitCode: Schema.optional(Schema.Number),
                          finishTime: Schema.optional(Schema.String),
                          detailStatus: Schema.optional(Schema.String),
                        }),
                      ),
                      previousState: Schema.optional(
                        Schema.Struct({
                          state: Schema.optional(Schema.String),
                          startTime: Schema.optional(Schema.String),
                          exitCode: Schema.optional(Schema.Number),
                          finishTime: Schema.optional(Schema.String),
                          detailStatus: Schema.optional(Schema.String),
                        }),
                      ),
                      events: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            count: Schema.optional(Schema.Number),
                            firstTimestamp: Schema.optional(Schema.String),
                            lastTimestamp: Schema.optional(Schema.String),
                            name: Schema.optional(Schema.String),
                            message: Schema.optional(Schema.String),
                            type: Schema.optional(Schema.String),
                          }),
                        ),
                      ),
                    }),
                  ),
                  resources: Schema.optional(
                    Schema.Struct({
                      requests: Schema.Struct({
                        memoryInGB: Schema.Number,
                        cpu: Schema.Number,
                        gpu: Schema.optional(
                          Schema.Struct({
                            count: Schema.Number,
                            sku: Schema.Literals(["K80", "P100", "V100"]),
                          }),
                        ),
                      }),
                      limits: Schema.optional(
                        Schema.Struct({
                          memoryInGB: Schema.optional(Schema.Number),
                          cpu: Schema.optional(Schema.Number),
                          gpu: Schema.optional(
                            Schema.Struct({
                              count: Schema.Number,
                              sku: Schema.Literals(["K80", "P100", "V100"]),
                            }),
                          ),
                        }),
                      ),
                    }),
                  ),
                  volumeMounts: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        name: Schema.String,
                        mountPath: Schema.String,
                        readOnly: Schema.optional(Schema.Boolean),
                      }),
                    ),
                  ),
                  livenessProbe: Schema.optional(
                    Schema.Struct({
                      exec: Schema.optional(
                        Schema.Struct({
                          command: Schema.optional(Schema.Array(Schema.String)),
                        }),
                      ),
                      httpGet: Schema.optional(
                        Schema.Struct({
                          path: Schema.optional(Schema.String),
                          port: Schema.Number,
                          scheme: Schema.optional(
                            Schema.Literals(["http", "https"]),
                          ),
                          httpHeaders: Schema.optional(
                            Schema.Array(
                              Schema.Struct({
                                name: Schema.optional(Schema.String),
                                value: Schema.optional(Schema.String),
                              }),
                            ),
                          ),
                        }),
                      ),
                      initialDelaySeconds: Schema.optional(Schema.Number),
                      periodSeconds: Schema.optional(Schema.Number),
                      failureThreshold: Schema.optional(Schema.Number),
                      successThreshold: Schema.optional(Schema.Number),
                      timeoutSeconds: Schema.optional(Schema.Number),
                    }),
                  ),
                  readinessProbe: Schema.optional(
                    Schema.Struct({
                      exec: Schema.optional(
                        Schema.Struct({
                          command: Schema.optional(Schema.Array(Schema.String)),
                        }),
                      ),
                      httpGet: Schema.optional(
                        Schema.Struct({
                          path: Schema.optional(Schema.String),
                          port: Schema.Number,
                          scheme: Schema.optional(
                            Schema.Literals(["http", "https"]),
                          ),
                          httpHeaders: Schema.optional(
                            Schema.Array(
                              Schema.Struct({
                                name: Schema.optional(Schema.String),
                                value: Schema.optional(Schema.String),
                              }),
                            ),
                          ),
                        }),
                      ),
                      initialDelaySeconds: Schema.optional(Schema.Number),
                      periodSeconds: Schema.optional(Schema.Number),
                      failureThreshold: Schema.optional(Schema.Number),
                      successThreshold: Schema.optional(Schema.Number),
                      timeoutSeconds: Schema.optional(Schema.Number),
                    }),
                  ),
                  securityContext: Schema.optional(
                    Schema.Struct({
                      privileged: Schema.optional(Schema.Boolean),
                      allowPrivilegeEscalation: Schema.optional(Schema.Boolean),
                      capabilities: Schema.optional(
                        Schema.Struct({
                          add: Schema.optional(Schema.Array(Schema.String)),
                          drop: Schema.optional(Schema.Array(Schema.String)),
                        }),
                      ),
                      runAsGroup: Schema.optional(Schema.Number),
                      runAsUser: Schema.optional(Schema.Number),
                      seccompProfile: Schema.optional(Schema.String),
                    }),
                  ),
                  configMap: Schema.optional(
                    Schema.Struct({
                      keyValuePairs: Schema.optional(
                        Schema.Record(Schema.String, Schema.String),
                      ),
                    }),
                  ),
                }),
              }),
            ),
            imageRegistryCredentials: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  server: Schema.String,
                  username: Schema.optional(Schema.String),
                  password: Schema.optional(SensitiveString),
                  passwordReference: Schema.optional(SensitiveString),
                  identity: Schema.optional(Schema.String),
                  identityUrl: Schema.optional(Schema.String),
                }),
              ),
            ),
            restartPolicy: Schema.optional(
              Schema.Literals(["Always", "OnFailure", "Never"]),
            ),
            ipAddress: Schema.optional(
              Schema.Struct({
                ports: Schema.Array(
                  Schema.Struct({
                    protocol: Schema.optional(Schema.Literals(["TCP", "UDP"])),
                    port: Schema.Number,
                  }),
                ),
                type: Schema.Literals(["Public", "Private"]),
                ip: Schema.optional(Schema.String),
                dnsNameLabel: Schema.optional(Schema.String),
                autoGeneratedDomainNameLabelScope: Schema.optional(
                  Schema.Literals([
                    "Unsecure",
                    "TenantReuse",
                    "SubscriptionReuse",
                    "ResourceGroupReuse",
                    "Noreuse",
                  ]),
                ),
                fqdn: Schema.optional(Schema.String),
              }),
            ),
            osType: Schema.Literals(["Windows", "Linux"]),
            volumes: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  name: Schema.String,
                  azureFile: Schema.optional(
                    Schema.Struct({
                      shareName: Schema.String,
                      readOnly: Schema.optional(Schema.Boolean),
                      storageAccountName: Schema.String,
                      storageAccountKey: Schema.optional(Schema.String),
                      storageAccountKeyReference: Schema.optional(
                        Schema.String,
                      ),
                    }),
                  ),
                  emptyDir: Schema.optional(Schema.Struct({})),
                  secret: Schema.optional(
                    Schema.Record(Schema.String, Schema.String),
                  ),
                  secretReference: Schema.optional(
                    Schema.Record(Schema.String, Schema.String),
                  ),
                  gitRepo: Schema.optional(
                    Schema.Struct({
                      directory: Schema.optional(Schema.String),
                      repository: Schema.String,
                      revision: Schema.optional(Schema.String),
                    }),
                  ),
                }),
              ),
            ),
            diagnostics: Schema.optional(
              Schema.Struct({
                logAnalytics: Schema.optional(
                  Schema.Struct({
                    workspaceId: Schema.String,
                    workspaceKey: Schema.String,
                    logType: Schema.optional(
                      Schema.Literals([
                        "ContainerInsights",
                        "ContainerInstanceLogs",
                      ]),
                    ),
                    metadata: Schema.optional(
                      Schema.Record(Schema.String, Schema.String),
                    ),
                    workspaceResourceId: Schema.optional(Schema.String),
                  }),
                ),
              }),
            ),
            subnetIds: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  id: Schema.String,
                  name: Schema.optional(Schema.String),
                }),
              ),
            ),
            dnsConfig: Schema.optional(
              Schema.Struct({
                nameServers: Schema.Array(Schema.String),
                searchDomains: Schema.optional(Schema.String),
                options: Schema.optional(Schema.String),
              }),
            ),
            sku: Schema.optional(
              Schema.Literals([
                "NotSpecified",
                "Standard",
                "Dedicated",
                "Confidential",
              ]),
            ),
            encryptionProperties: Schema.optional(
              Schema.Struct({
                vaultBaseUrl: Schema.String,
                keyName: Schema.String,
                keyVersion: Schema.String,
                identity: Schema.optional(Schema.String),
              }),
            ),
            initContainers: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  name: Schema.String,
                  properties: Schema.Struct({
                    image: Schema.optional(Schema.String),
                    command: Schema.optional(Schema.Array(Schema.String)),
                    environmentVariables: Schema.optional(
                      Schema.Array(
                        Schema.Struct({
                          name: Schema.String,
                          value: Schema.optional(Schema.String),
                          secureValue: Schema.optional(Schema.String),
                          secureValueReference: Schema.optional(Schema.String),
                        }),
                      ),
                    ),
                    instanceView: Schema.optional(
                      Schema.Struct({
                        restartCount: Schema.optional(Schema.Number),
                        currentState: Schema.optional(
                          Schema.Struct({
                            state: Schema.optional(Schema.String),
                            startTime: Schema.optional(Schema.String),
                            exitCode: Schema.optional(Schema.Number),
                            finishTime: Schema.optional(Schema.String),
                            detailStatus: Schema.optional(Schema.String),
                          }),
                        ),
                        previousState: Schema.optional(
                          Schema.Struct({
                            state: Schema.optional(Schema.String),
                            startTime: Schema.optional(Schema.String),
                            exitCode: Schema.optional(Schema.Number),
                            finishTime: Schema.optional(Schema.String),
                            detailStatus: Schema.optional(Schema.String),
                          }),
                        ),
                        events: Schema.optional(
                          Schema.Array(
                            Schema.Struct({
                              count: Schema.optional(Schema.Number),
                              firstTimestamp: Schema.optional(Schema.String),
                              lastTimestamp: Schema.optional(Schema.String),
                              name: Schema.optional(Schema.String),
                              message: Schema.optional(Schema.String),
                              type: Schema.optional(Schema.String),
                            }),
                          ),
                        ),
                      }),
                    ),
                    volumeMounts: Schema.optional(
                      Schema.Array(
                        Schema.Struct({
                          name: Schema.String,
                          mountPath: Schema.String,
                          readOnly: Schema.optional(Schema.Boolean),
                        }),
                      ),
                    ),
                    securityContext: Schema.optional(
                      Schema.Struct({
                        privileged: Schema.optional(Schema.Boolean),
                        allowPrivilegeEscalation: Schema.optional(
                          Schema.Boolean,
                        ),
                        capabilities: Schema.optional(
                          Schema.Struct({
                            add: Schema.optional(Schema.Array(Schema.String)),
                            drop: Schema.optional(Schema.Array(Schema.String)),
                          }),
                        ),
                        runAsGroup: Schema.optional(Schema.Number),
                        runAsUser: Schema.optional(Schema.Number),
                        seccompProfile: Schema.optional(Schema.String),
                      }),
                    ),
                  }),
                }),
              ),
            ),
            extensions: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  name: Schema.String,
                  properties: Schema.optional(
                    Schema.Struct({
                      extensionType: Schema.String,
                      version: Schema.String,
                      settings: Schema.optional(Schema.Unknown),
                      protectedSettings: Schema.optional(Schema.Unknown),
                    }),
                  ),
                }),
              ),
            ),
            confidentialComputeProperties: Schema.optional(
              Schema.Struct({
                ccePolicy: Schema.optional(Schema.String),
              }),
            ),
            priority: Schema.optional(Schema.Literals(["Regular", "Spot"])),
            identityAcls: Schema.optional(
              Schema.Struct({
                defaultAccess: Schema.optional(
                  Schema.Literals(["All", "System", "User"]),
                ),
                acls: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      access: Schema.optional(
                        Schema.Literals(["All", "System", "User"]),
                      ),
                      identity: Schema.optional(Schema.String),
                    }),
                  ),
                ),
              }),
            ),
            containerGroupProfile: Schema.optional(
              Schema.Struct({
                id: Schema.optional(Schema.String),
                revision: Schema.optional(Schema.Number),
              }),
            ),
            standbyPoolProfile: Schema.optional(
              Schema.Struct({
                id: Schema.optional(Schema.String),
                failContainerGroupCreateOnReuseFailure: Schema.optional(
                  Schema.Boolean,
                ),
              }),
            ),
            isCreatedFromStandbyPool: Schema.optional(Schema.Boolean),
          }),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ContainerGroupsListOutput = typeof ContainerGroupsListOutput.Type;

// The operation
/**
 * Get a list of container groups in the specified subscription.
 *
 * Get a list of container groups in the specified subscription. This operation returns properties of each container group including containers, image registry credentials, restart policy, IP address type, OS type, state, and volumes.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const ContainerGroupsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ContainerGroupsListInput,
  outputSchema: ContainerGroupsListOutput,
}));
// Input Schema
export const ContainerGroupsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/containerGroups",
    }),
  );
export type ContainerGroupsListByResourceGroupInput =
  typeof ContainerGroupsListByResourceGroupInput.Type;

// Output Schema
export const ContainerGroupsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          zones: Schema.optional(Schema.Array(Schema.String)),
          identity: Schema.optional(
            Schema.Struct({
              principalId: Schema.optional(Schema.String),
              tenantId: Schema.optional(Schema.String),
              type: Schema.optional(
                Schema.Literals([
                  "SystemAssigned",
                  "UserAssigned",
                  "SystemAssigned, UserAssigned",
                  "None",
                ]),
              ),
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
          properties: Schema.Struct({
            provisioningState: Schema.optional(
              Schema.Literals([
                "NotSpecified",
                "Accepted",
                "Pending",
                "Updating",
                "Creating",
                "Repairing",
                "Unhealthy",
                "Failed",
                "Canceled",
                "Succeeded",
                "Deleting",
                "NotAccessible",
                "PreProvisioned",
              ]),
            ),
            secretReferences: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  name: Schema.String,
                  identity: Schema.String,
                  secretReferenceUri: Schema.String,
                }),
              ),
            ),
            containers: Schema.Array(
              Schema.Struct({
                name: Schema.String,
                properties: Schema.Struct({
                  image: Schema.optional(Schema.String),
                  command: Schema.optional(Schema.Array(Schema.String)),
                  ports: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        protocol: Schema.optional(
                          Schema.Literals(["TCP", "UDP"]),
                        ),
                        port: Schema.Number,
                      }),
                    ),
                  ),
                  environmentVariables: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        name: Schema.String,
                        value: Schema.optional(Schema.String),
                        secureValue: Schema.optional(Schema.String),
                        secureValueReference: Schema.optional(Schema.String),
                      }),
                    ),
                  ),
                  instanceView: Schema.optional(
                    Schema.Struct({
                      restartCount: Schema.optional(Schema.Number),
                      currentState: Schema.optional(
                        Schema.Struct({
                          state: Schema.optional(Schema.String),
                          startTime: Schema.optional(Schema.String),
                          exitCode: Schema.optional(Schema.Number),
                          finishTime: Schema.optional(Schema.String),
                          detailStatus: Schema.optional(Schema.String),
                        }),
                      ),
                      previousState: Schema.optional(
                        Schema.Struct({
                          state: Schema.optional(Schema.String),
                          startTime: Schema.optional(Schema.String),
                          exitCode: Schema.optional(Schema.Number),
                          finishTime: Schema.optional(Schema.String),
                          detailStatus: Schema.optional(Schema.String),
                        }),
                      ),
                      events: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            count: Schema.optional(Schema.Number),
                            firstTimestamp: Schema.optional(Schema.String),
                            lastTimestamp: Schema.optional(Schema.String),
                            name: Schema.optional(Schema.String),
                            message: Schema.optional(Schema.String),
                            type: Schema.optional(Schema.String),
                          }),
                        ),
                      ),
                    }),
                  ),
                  resources: Schema.optional(
                    Schema.Struct({
                      requests: Schema.Struct({
                        memoryInGB: Schema.Number,
                        cpu: Schema.Number,
                        gpu: Schema.optional(
                          Schema.Struct({
                            count: Schema.Number,
                            sku: Schema.Literals(["K80", "P100", "V100"]),
                          }),
                        ),
                      }),
                      limits: Schema.optional(
                        Schema.Struct({
                          memoryInGB: Schema.optional(Schema.Number),
                          cpu: Schema.optional(Schema.Number),
                          gpu: Schema.optional(
                            Schema.Struct({
                              count: Schema.Number,
                              sku: Schema.Literals(["K80", "P100", "V100"]),
                            }),
                          ),
                        }),
                      ),
                    }),
                  ),
                  volumeMounts: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        name: Schema.String,
                        mountPath: Schema.String,
                        readOnly: Schema.optional(Schema.Boolean),
                      }),
                    ),
                  ),
                  livenessProbe: Schema.optional(
                    Schema.Struct({
                      exec: Schema.optional(
                        Schema.Struct({
                          command: Schema.optional(Schema.Array(Schema.String)),
                        }),
                      ),
                      httpGet: Schema.optional(
                        Schema.Struct({
                          path: Schema.optional(Schema.String),
                          port: Schema.Number,
                          scheme: Schema.optional(
                            Schema.Literals(["http", "https"]),
                          ),
                          httpHeaders: Schema.optional(
                            Schema.Array(
                              Schema.Struct({
                                name: Schema.optional(Schema.String),
                                value: Schema.optional(Schema.String),
                              }),
                            ),
                          ),
                        }),
                      ),
                      initialDelaySeconds: Schema.optional(Schema.Number),
                      periodSeconds: Schema.optional(Schema.Number),
                      failureThreshold: Schema.optional(Schema.Number),
                      successThreshold: Schema.optional(Schema.Number),
                      timeoutSeconds: Schema.optional(Schema.Number),
                    }),
                  ),
                  readinessProbe: Schema.optional(
                    Schema.Struct({
                      exec: Schema.optional(
                        Schema.Struct({
                          command: Schema.optional(Schema.Array(Schema.String)),
                        }),
                      ),
                      httpGet: Schema.optional(
                        Schema.Struct({
                          path: Schema.optional(Schema.String),
                          port: Schema.Number,
                          scheme: Schema.optional(
                            Schema.Literals(["http", "https"]),
                          ),
                          httpHeaders: Schema.optional(
                            Schema.Array(
                              Schema.Struct({
                                name: Schema.optional(Schema.String),
                                value: Schema.optional(Schema.String),
                              }),
                            ),
                          ),
                        }),
                      ),
                      initialDelaySeconds: Schema.optional(Schema.Number),
                      periodSeconds: Schema.optional(Schema.Number),
                      failureThreshold: Schema.optional(Schema.Number),
                      successThreshold: Schema.optional(Schema.Number),
                      timeoutSeconds: Schema.optional(Schema.Number),
                    }),
                  ),
                  securityContext: Schema.optional(
                    Schema.Struct({
                      privileged: Schema.optional(Schema.Boolean),
                      allowPrivilegeEscalation: Schema.optional(Schema.Boolean),
                      capabilities: Schema.optional(
                        Schema.Struct({
                          add: Schema.optional(Schema.Array(Schema.String)),
                          drop: Schema.optional(Schema.Array(Schema.String)),
                        }),
                      ),
                      runAsGroup: Schema.optional(Schema.Number),
                      runAsUser: Schema.optional(Schema.Number),
                      seccompProfile: Schema.optional(Schema.String),
                    }),
                  ),
                  configMap: Schema.optional(
                    Schema.Struct({
                      keyValuePairs: Schema.optional(
                        Schema.Record(Schema.String, Schema.String),
                      ),
                    }),
                  ),
                }),
              }),
            ),
            imageRegistryCredentials: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  server: Schema.String,
                  username: Schema.optional(Schema.String),
                  password: Schema.optional(SensitiveString),
                  passwordReference: Schema.optional(SensitiveString),
                  identity: Schema.optional(Schema.String),
                  identityUrl: Schema.optional(Schema.String),
                }),
              ),
            ),
            restartPolicy: Schema.optional(
              Schema.Literals(["Always", "OnFailure", "Never"]),
            ),
            ipAddress: Schema.optional(
              Schema.Struct({
                ports: Schema.Array(
                  Schema.Struct({
                    protocol: Schema.optional(Schema.Literals(["TCP", "UDP"])),
                    port: Schema.Number,
                  }),
                ),
                type: Schema.Literals(["Public", "Private"]),
                ip: Schema.optional(Schema.String),
                dnsNameLabel: Schema.optional(Schema.String),
                autoGeneratedDomainNameLabelScope: Schema.optional(
                  Schema.Literals([
                    "Unsecure",
                    "TenantReuse",
                    "SubscriptionReuse",
                    "ResourceGroupReuse",
                    "Noreuse",
                  ]),
                ),
                fqdn: Schema.optional(Schema.String),
              }),
            ),
            osType: Schema.Literals(["Windows", "Linux"]),
            volumes: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  name: Schema.String,
                  azureFile: Schema.optional(
                    Schema.Struct({
                      shareName: Schema.String,
                      readOnly: Schema.optional(Schema.Boolean),
                      storageAccountName: Schema.String,
                      storageAccountKey: Schema.optional(Schema.String),
                      storageAccountKeyReference: Schema.optional(
                        Schema.String,
                      ),
                    }),
                  ),
                  emptyDir: Schema.optional(Schema.Struct({})),
                  secret: Schema.optional(
                    Schema.Record(Schema.String, Schema.String),
                  ),
                  secretReference: Schema.optional(
                    Schema.Record(Schema.String, Schema.String),
                  ),
                  gitRepo: Schema.optional(
                    Schema.Struct({
                      directory: Schema.optional(Schema.String),
                      repository: Schema.String,
                      revision: Schema.optional(Schema.String),
                    }),
                  ),
                }),
              ),
            ),
            diagnostics: Schema.optional(
              Schema.Struct({
                logAnalytics: Schema.optional(
                  Schema.Struct({
                    workspaceId: Schema.String,
                    workspaceKey: Schema.String,
                    logType: Schema.optional(
                      Schema.Literals([
                        "ContainerInsights",
                        "ContainerInstanceLogs",
                      ]),
                    ),
                    metadata: Schema.optional(
                      Schema.Record(Schema.String, Schema.String),
                    ),
                    workspaceResourceId: Schema.optional(Schema.String),
                  }),
                ),
              }),
            ),
            subnetIds: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  id: Schema.String,
                  name: Schema.optional(Schema.String),
                }),
              ),
            ),
            dnsConfig: Schema.optional(
              Schema.Struct({
                nameServers: Schema.Array(Schema.String),
                searchDomains: Schema.optional(Schema.String),
                options: Schema.optional(Schema.String),
              }),
            ),
            sku: Schema.optional(
              Schema.Literals([
                "NotSpecified",
                "Standard",
                "Dedicated",
                "Confidential",
              ]),
            ),
            encryptionProperties: Schema.optional(
              Schema.Struct({
                vaultBaseUrl: Schema.String,
                keyName: Schema.String,
                keyVersion: Schema.String,
                identity: Schema.optional(Schema.String),
              }),
            ),
            initContainers: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  name: Schema.String,
                  properties: Schema.Struct({
                    image: Schema.optional(Schema.String),
                    command: Schema.optional(Schema.Array(Schema.String)),
                    environmentVariables: Schema.optional(
                      Schema.Array(
                        Schema.Struct({
                          name: Schema.String,
                          value: Schema.optional(Schema.String),
                          secureValue: Schema.optional(Schema.String),
                          secureValueReference: Schema.optional(Schema.String),
                        }),
                      ),
                    ),
                    instanceView: Schema.optional(
                      Schema.Struct({
                        restartCount: Schema.optional(Schema.Number),
                        currentState: Schema.optional(
                          Schema.Struct({
                            state: Schema.optional(Schema.String),
                            startTime: Schema.optional(Schema.String),
                            exitCode: Schema.optional(Schema.Number),
                            finishTime: Schema.optional(Schema.String),
                            detailStatus: Schema.optional(Schema.String),
                          }),
                        ),
                        previousState: Schema.optional(
                          Schema.Struct({
                            state: Schema.optional(Schema.String),
                            startTime: Schema.optional(Schema.String),
                            exitCode: Schema.optional(Schema.Number),
                            finishTime: Schema.optional(Schema.String),
                            detailStatus: Schema.optional(Schema.String),
                          }),
                        ),
                        events: Schema.optional(
                          Schema.Array(
                            Schema.Struct({
                              count: Schema.optional(Schema.Number),
                              firstTimestamp: Schema.optional(Schema.String),
                              lastTimestamp: Schema.optional(Schema.String),
                              name: Schema.optional(Schema.String),
                              message: Schema.optional(Schema.String),
                              type: Schema.optional(Schema.String),
                            }),
                          ),
                        ),
                      }),
                    ),
                    volumeMounts: Schema.optional(
                      Schema.Array(
                        Schema.Struct({
                          name: Schema.String,
                          mountPath: Schema.String,
                          readOnly: Schema.optional(Schema.Boolean),
                        }),
                      ),
                    ),
                    securityContext: Schema.optional(
                      Schema.Struct({
                        privileged: Schema.optional(Schema.Boolean),
                        allowPrivilegeEscalation: Schema.optional(
                          Schema.Boolean,
                        ),
                        capabilities: Schema.optional(
                          Schema.Struct({
                            add: Schema.optional(Schema.Array(Schema.String)),
                            drop: Schema.optional(Schema.Array(Schema.String)),
                          }),
                        ),
                        runAsGroup: Schema.optional(Schema.Number),
                        runAsUser: Schema.optional(Schema.Number),
                        seccompProfile: Schema.optional(Schema.String),
                      }),
                    ),
                  }),
                }),
              ),
            ),
            extensions: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  name: Schema.String,
                  properties: Schema.optional(
                    Schema.Struct({
                      extensionType: Schema.String,
                      version: Schema.String,
                      settings: Schema.optional(Schema.Unknown),
                      protectedSettings: Schema.optional(Schema.Unknown),
                    }),
                  ),
                }),
              ),
            ),
            confidentialComputeProperties: Schema.optional(
              Schema.Struct({
                ccePolicy: Schema.optional(Schema.String),
              }),
            ),
            priority: Schema.optional(Schema.Literals(["Regular", "Spot"])),
            identityAcls: Schema.optional(
              Schema.Struct({
                defaultAccess: Schema.optional(
                  Schema.Literals(["All", "System", "User"]),
                ),
                acls: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      access: Schema.optional(
                        Schema.Literals(["All", "System", "User"]),
                      ),
                      identity: Schema.optional(Schema.String),
                    }),
                  ),
                ),
              }),
            ),
            containerGroupProfile: Schema.optional(
              Schema.Struct({
                id: Schema.optional(Schema.String),
                revision: Schema.optional(Schema.Number),
              }),
            ),
            standbyPoolProfile: Schema.optional(
              Schema.Struct({
                id: Schema.optional(Schema.String),
                failContainerGroupCreateOnReuseFailure: Schema.optional(
                  Schema.Boolean,
                ),
              }),
            ),
            isCreatedFromStandbyPool: Schema.optional(Schema.Boolean),
          }),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ContainerGroupsListByResourceGroupOutput =
  typeof ContainerGroupsListByResourceGroupOutput.Type;

// The operation
/**
 * Get a list of container groups in the specified subscription and resource group.
 *
 * Get a list of container groups in a specified subscription and resource group. This operation returns properties of each container group including containers, image registry credentials, restart policy, IP address type, OS type, state, and volumes.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ContainerGroupsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ContainerGroupsListByResourceGroupInput,
    outputSchema: ContainerGroupsListByResourceGroupOutput,
  }));
// Input Schema
export const ContainerGroupsRestartInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/containerGroups/{containerGroupName}/restart",
    }),
  );
export type ContainerGroupsRestartInput =
  typeof ContainerGroupsRestartInput.Type;

// Output Schema
export const ContainerGroupsRestartOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ContainerGroupsRestartOutput =
  typeof ContainerGroupsRestartOutput.Type;

// The operation
/**
 * Restarts all containers in a container group.
 *
 * Restarts all containers in a container group in place. If container image has updates, new image will be downloaded.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ContainerGroupsRestart = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ContainerGroupsRestartInput,
    outputSchema: ContainerGroupsRestartOutput,
  }),
);
// Input Schema
export const ContainerGroupsStartInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/containerGroups/{containerGroupName}/start",
    }),
  );
export type ContainerGroupsStartInput = typeof ContainerGroupsStartInput.Type;

// Output Schema
export const ContainerGroupsStartOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ContainerGroupsStartOutput = typeof ContainerGroupsStartOutput.Type;

// The operation
/**
 * Starts all containers in a container group.
 *
 * Starts all containers in a container group. Compute resources will be allocated and billing will start.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ContainerGroupsStart = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ContainerGroupsStartInput,
    outputSchema: ContainerGroupsStartOutput,
  }),
);
// Input Schema
export const ContainerGroupsStopInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/containerGroups/{containerGroupName}/stop",
    }),
  );
export type ContainerGroupsStopInput = typeof ContainerGroupsStopInput.Type;

// Output Schema
export const ContainerGroupsStopOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ContainerGroupsStopOutput = typeof ContainerGroupsStopOutput.Type;

// The operation
/**
 * Stops all containers in a container group.
 *
 * Stops all containers in a container group. Compute resources will be deallocated and billing will stop.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ContainerGroupsStop = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ContainerGroupsStopInput,
  outputSchema: ContainerGroupsStopOutput,
}));
// Input Schema
export const ContainerGroupsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/containerGroups/{containerGroupName}",
    }),
  );
export type ContainerGroupsUpdateInput = typeof ContainerGroupsUpdateInput.Type;

// Output Schema
export const ContainerGroupsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    zones: Schema.optional(Schema.Array(Schema.String)),
    identity: Schema.optional(
      Schema.Struct({
        principalId: Schema.optional(Schema.String),
        tenantId: Schema.optional(Schema.String),
        type: Schema.optional(
          Schema.Literals([
            "SystemAssigned",
            "UserAssigned",
            "SystemAssigned, UserAssigned",
            "None",
          ]),
        ),
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
    properties: Schema.Struct({
      provisioningState: Schema.optional(Schema.String),
      secretReferences: Schema.optional(
        Schema.Array(
          Schema.Struct({
            name: Schema.String,
            identity: Schema.String,
            secretReferenceUri: Schema.String,
          }),
        ),
      ),
      containers: Schema.Array(
        Schema.Struct({
          name: Schema.String,
          properties: Schema.Struct({
            image: Schema.optional(Schema.String),
            command: Schema.optional(Schema.Array(Schema.String)),
            ports: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  protocol: Schema.optional(Schema.Literals(["TCP", "UDP"])),
                  port: Schema.Number,
                }),
              ),
            ),
            environmentVariables: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  name: Schema.String,
                  value: Schema.optional(Schema.String),
                  secureValue: Schema.optional(Schema.String),
                  secureValueReference: Schema.optional(Schema.String),
                }),
              ),
            ),
            instanceView: Schema.optional(
              Schema.Struct({
                restartCount: Schema.optional(Schema.Number),
                currentState: Schema.optional(
                  Schema.Struct({
                    state: Schema.optional(Schema.String),
                    startTime: Schema.optional(Schema.String),
                    exitCode: Schema.optional(Schema.Number),
                    finishTime: Schema.optional(Schema.String),
                    detailStatus: Schema.optional(Schema.String),
                  }),
                ),
                previousState: Schema.optional(
                  Schema.Struct({
                    state: Schema.optional(Schema.String),
                    startTime: Schema.optional(Schema.String),
                    exitCode: Schema.optional(Schema.Number),
                    finishTime: Schema.optional(Schema.String),
                    detailStatus: Schema.optional(Schema.String),
                  }),
                ),
                events: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      count: Schema.optional(Schema.Number),
                      firstTimestamp: Schema.optional(Schema.String),
                      lastTimestamp: Schema.optional(Schema.String),
                      name: Schema.optional(Schema.String),
                      message: Schema.optional(Schema.String),
                      type: Schema.optional(Schema.String),
                    }),
                  ),
                ),
              }),
            ),
            resources: Schema.optional(
              Schema.Struct({
                requests: Schema.Struct({
                  memoryInGB: Schema.Number,
                  cpu: Schema.Number,
                  gpu: Schema.optional(
                    Schema.Struct({
                      count: Schema.Number,
                      sku: Schema.Literals(["K80", "P100", "V100"]),
                    }),
                  ),
                }),
                limits: Schema.optional(
                  Schema.Struct({
                    memoryInGB: Schema.optional(Schema.Number),
                    cpu: Schema.optional(Schema.Number),
                    gpu: Schema.optional(
                      Schema.Struct({
                        count: Schema.Number,
                        sku: Schema.Literals(["K80", "P100", "V100"]),
                      }),
                    ),
                  }),
                ),
              }),
            ),
            volumeMounts: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  name: Schema.String,
                  mountPath: Schema.String,
                  readOnly: Schema.optional(Schema.Boolean),
                }),
              ),
            ),
            livenessProbe: Schema.optional(
              Schema.Struct({
                exec: Schema.optional(
                  Schema.Struct({
                    command: Schema.optional(Schema.Array(Schema.String)),
                  }),
                ),
                httpGet: Schema.optional(
                  Schema.Struct({
                    path: Schema.optional(Schema.String),
                    port: Schema.Number,
                    scheme: Schema.optional(Schema.Literals(["http", "https"])),
                    httpHeaders: Schema.optional(
                      Schema.Array(
                        Schema.Struct({
                          name: Schema.optional(Schema.String),
                          value: Schema.optional(Schema.String),
                        }),
                      ),
                    ),
                  }),
                ),
                initialDelaySeconds: Schema.optional(Schema.Number),
                periodSeconds: Schema.optional(Schema.Number),
                failureThreshold: Schema.optional(Schema.Number),
                successThreshold: Schema.optional(Schema.Number),
                timeoutSeconds: Schema.optional(Schema.Number),
              }),
            ),
            readinessProbe: Schema.optional(
              Schema.Struct({
                exec: Schema.optional(
                  Schema.Struct({
                    command: Schema.optional(Schema.Array(Schema.String)),
                  }),
                ),
                httpGet: Schema.optional(
                  Schema.Struct({
                    path: Schema.optional(Schema.String),
                    port: Schema.Number,
                    scheme: Schema.optional(Schema.Literals(["http", "https"])),
                    httpHeaders: Schema.optional(
                      Schema.Array(
                        Schema.Struct({
                          name: Schema.optional(Schema.String),
                          value: Schema.optional(Schema.String),
                        }),
                      ),
                    ),
                  }),
                ),
                initialDelaySeconds: Schema.optional(Schema.Number),
                periodSeconds: Schema.optional(Schema.Number),
                failureThreshold: Schema.optional(Schema.Number),
                successThreshold: Schema.optional(Schema.Number),
                timeoutSeconds: Schema.optional(Schema.Number),
              }),
            ),
            securityContext: Schema.optional(
              Schema.Struct({
                privileged: Schema.optional(Schema.Boolean),
                allowPrivilegeEscalation: Schema.optional(Schema.Boolean),
                capabilities: Schema.optional(
                  Schema.Struct({
                    add: Schema.optional(Schema.Array(Schema.String)),
                    drop: Schema.optional(Schema.Array(Schema.String)),
                  }),
                ),
                runAsGroup: Schema.optional(Schema.Number),
                runAsUser: Schema.optional(Schema.Number),
                seccompProfile: Schema.optional(Schema.String),
              }),
            ),
            configMap: Schema.optional(
              Schema.Struct({
                keyValuePairs: Schema.optional(
                  Schema.Record(Schema.String, Schema.String),
                ),
              }),
            ),
          }),
        }),
      ),
      imageRegistryCredentials: Schema.optional(
        Schema.Array(
          Schema.Struct({
            server: Schema.String,
            username: Schema.optional(Schema.String),
            password: Schema.optional(SensitiveString),
            passwordReference: Schema.optional(SensitiveString),
            identity: Schema.optional(Schema.String),
            identityUrl: Schema.optional(Schema.String),
          }),
        ),
      ),
      restartPolicy: Schema.optional(
        Schema.Literals(["Always", "OnFailure", "Never"]),
      ),
      ipAddress: Schema.optional(
        Schema.Struct({
          ports: Schema.Array(
            Schema.Struct({
              protocol: Schema.optional(Schema.Literals(["TCP", "UDP"])),
              port: Schema.Number,
            }),
          ),
          type: Schema.Literals(["Public", "Private"]),
          ip: Schema.optional(Schema.String),
          dnsNameLabel: Schema.optional(Schema.String),
          autoGeneratedDomainNameLabelScope: Schema.optional(
            Schema.Literals([
              "Unsecure",
              "TenantReuse",
              "SubscriptionReuse",
              "ResourceGroupReuse",
              "Noreuse",
            ]),
          ),
          fqdn: Schema.optional(Schema.String),
        }),
      ),
      osType: Schema.optional(Schema.Literals(["Windows", "Linux"])),
      volumes: Schema.optional(
        Schema.Array(
          Schema.Struct({
            name: Schema.String,
            azureFile: Schema.optional(
              Schema.Struct({
                shareName: Schema.String,
                readOnly: Schema.optional(Schema.Boolean),
                storageAccountName: Schema.String,
                storageAccountKey: Schema.optional(Schema.String),
                storageAccountKeyReference: Schema.optional(Schema.String),
              }),
            ),
            emptyDir: Schema.optional(Schema.Struct({})),
            secret: Schema.optional(
              Schema.Record(Schema.String, Schema.String),
            ),
            secretReference: Schema.optional(
              Schema.Record(Schema.String, Schema.String),
            ),
            gitRepo: Schema.optional(
              Schema.Struct({
                directory: Schema.optional(Schema.String),
                repository: Schema.String,
                revision: Schema.optional(Schema.String),
              }),
            ),
          }),
        ),
      ),
      instanceView: Schema.optional(
        Schema.Struct({
          events: Schema.optional(
            Schema.Array(
              Schema.Struct({
                count: Schema.optional(Schema.Number),
                firstTimestamp: Schema.optional(Schema.String),
                lastTimestamp: Schema.optional(Schema.String),
                name: Schema.optional(Schema.String),
                message: Schema.optional(Schema.String),
                type: Schema.optional(Schema.String),
              }),
            ),
          ),
          state: Schema.optional(Schema.String),
        }),
      ),
      diagnostics: Schema.optional(
        Schema.Struct({
          logAnalytics: Schema.optional(
            Schema.Struct({
              workspaceId: Schema.String,
              workspaceKey: Schema.String,
              logType: Schema.optional(
                Schema.Literals(["ContainerInsights", "ContainerInstanceLogs"]),
              ),
              metadata: Schema.optional(
                Schema.Record(Schema.String, Schema.String),
              ),
              workspaceResourceId: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
      subnetIds: Schema.optional(
        Schema.Array(
          Schema.Struct({
            id: Schema.String,
            name: Schema.optional(Schema.String),
          }),
        ),
      ),
      dnsConfig: Schema.optional(
        Schema.Struct({
          nameServers: Schema.Array(Schema.String),
          searchDomains: Schema.optional(Schema.String),
          options: Schema.optional(Schema.String),
        }),
      ),
      sku: Schema.optional(
        Schema.Literals([
          "NotSpecified",
          "Standard",
          "Dedicated",
          "Confidential",
        ]),
      ),
      encryptionProperties: Schema.optional(
        Schema.Struct({
          vaultBaseUrl: Schema.String,
          keyName: Schema.String,
          keyVersion: Schema.String,
          identity: Schema.optional(Schema.String),
        }),
      ),
      initContainers: Schema.optional(
        Schema.Array(
          Schema.Struct({
            name: Schema.String,
            properties: Schema.Struct({
              image: Schema.optional(Schema.String),
              command: Schema.optional(Schema.Array(Schema.String)),
              environmentVariables: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    name: Schema.String,
                    value: Schema.optional(Schema.String),
                    secureValue: Schema.optional(Schema.String),
                    secureValueReference: Schema.optional(Schema.String),
                  }),
                ),
              ),
              instanceView: Schema.optional(
                Schema.Struct({
                  restartCount: Schema.optional(Schema.Number),
                  currentState: Schema.optional(
                    Schema.Struct({
                      state: Schema.optional(Schema.String),
                      startTime: Schema.optional(Schema.String),
                      exitCode: Schema.optional(Schema.Number),
                      finishTime: Schema.optional(Schema.String),
                      detailStatus: Schema.optional(Schema.String),
                    }),
                  ),
                  previousState: Schema.optional(
                    Schema.Struct({
                      state: Schema.optional(Schema.String),
                      startTime: Schema.optional(Schema.String),
                      exitCode: Schema.optional(Schema.Number),
                      finishTime: Schema.optional(Schema.String),
                      detailStatus: Schema.optional(Schema.String),
                    }),
                  ),
                  events: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        count: Schema.optional(Schema.Number),
                        firstTimestamp: Schema.optional(Schema.String),
                        lastTimestamp: Schema.optional(Schema.String),
                        name: Schema.optional(Schema.String),
                        message: Schema.optional(Schema.String),
                        type: Schema.optional(Schema.String),
                      }),
                    ),
                  ),
                }),
              ),
              volumeMounts: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    name: Schema.String,
                    mountPath: Schema.String,
                    readOnly: Schema.optional(Schema.Boolean),
                  }),
                ),
              ),
              securityContext: Schema.optional(
                Schema.Struct({
                  privileged: Schema.optional(Schema.Boolean),
                  allowPrivilegeEscalation: Schema.optional(Schema.Boolean),
                  capabilities: Schema.optional(
                    Schema.Struct({
                      add: Schema.optional(Schema.Array(Schema.String)),
                      drop: Schema.optional(Schema.Array(Schema.String)),
                    }),
                  ),
                  runAsGroup: Schema.optional(Schema.Number),
                  runAsUser: Schema.optional(Schema.Number),
                  seccompProfile: Schema.optional(Schema.String),
                }),
              ),
            }),
          }),
        ),
      ),
      extensions: Schema.optional(
        Schema.Array(
          Schema.Struct({
            name: Schema.String,
            properties: Schema.optional(
              Schema.Struct({
                extensionType: Schema.String,
                version: Schema.String,
                settings: Schema.optional(Schema.Unknown),
                protectedSettings: Schema.optional(Schema.Unknown),
              }),
            ),
          }),
        ),
      ),
      confidentialComputeProperties: Schema.optional(
        Schema.Struct({
          ccePolicy: Schema.optional(Schema.String),
        }),
      ),
      priority: Schema.optional(Schema.Literals(["Regular", "Spot"])),
      identityAcls: Schema.optional(
        Schema.Struct({
          defaultAccess: Schema.optional(
            Schema.Literals(["All", "System", "User"]),
          ),
          acls: Schema.optional(
            Schema.Array(
              Schema.Struct({
                access: Schema.optional(
                  Schema.Literals(["All", "System", "User"]),
                ),
                identity: Schema.optional(Schema.String),
              }),
            ),
          ),
        }),
      ),
      containerGroupProfile: Schema.optional(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          revision: Schema.optional(Schema.Number),
        }),
      ),
      standbyPoolProfile: Schema.optional(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          failContainerGroupCreateOnReuseFailure: Schema.optional(
            Schema.Boolean,
          ),
        }),
      ),
      isCreatedFromStandbyPool: Schema.optional(Schema.Boolean),
    }),
  });
export type ContainerGroupsUpdateOutput =
  typeof ContainerGroupsUpdateOutput.Type;

// The operation
/**
 * Update container groups.
 *
 * Updates container group tags with specified values.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ContainerGroupsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ContainerGroupsUpdateInput,
    outputSchema: ContainerGroupsUpdateOutput,
  }),
);
// Input Schema
export const ContainersAttachInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  containerName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/containerGroups/{containerGroupName}/containers/{containerName}/attach",
  }),
);
export type ContainersAttachInput = typeof ContainersAttachInput.Type;

// Output Schema
export const ContainersAttachOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    webSocketUri: Schema.optional(Schema.String),
    password: Schema.optional(SensitiveString),
  },
);
export type ContainersAttachOutput = typeof ContainersAttachOutput.Type;

// The operation
/**
 * Attach to the output of a specific container instance.
 *
 * Attach to the output stream of a specific container instance in a specified resource group and container group.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param containerName - The name of the container instance.
 */
export const ContainersAttach = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ContainersAttachInput,
  outputSchema: ContainersAttachOutput,
}));
// Input Schema
export const ContainersExecuteCommandInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    containerName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/containerGroups/{containerGroupName}/containers/{containerName}/exec",
    }),
  );
export type ContainersExecuteCommandInput =
  typeof ContainersExecuteCommandInput.Type;

// Output Schema
export const ContainersExecuteCommandOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    webSocketUri: Schema.optional(Schema.String),
    password: Schema.optional(SensitiveString),
  });
export type ContainersExecuteCommandOutput =
  typeof ContainersExecuteCommandOutput.Type;

// The operation
/**
 * Executes a command in a specific container instance.
 *
 * Executes a command for a specific container instance in a specified resource group and container group.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param containerName - The name of the container instance.
 */
export const ContainersExecuteCommand = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ContainersExecuteCommandInput,
    outputSchema: ContainersExecuteCommandOutput,
  }),
);
// Input Schema
export const ContainersListLogsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    containerName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    tail: Schema.optional(Schema.Number),
    timestamps: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/containerGroups/{containerGroupName}/containers/{containerName}/logs",
    }),
  );
export type ContainersListLogsInput = typeof ContainersListLogsInput.Type;

// Output Schema
export const ContainersListLogsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    content: Schema.optional(Schema.String),
  });
export type ContainersListLogsOutput = typeof ContainersListLogsOutput.Type;

// The operation
/**
 * Get the logs for a specified container instance.
 *
 * Get the logs for a specified container instance in a specified resource group and container group.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param containerName - The name of the container instance.
 * @param tail - The number of lines to show from the tail of the container instance log. If not provided, all available logs are shown up to 4mb.
 * @param timestamps - If true, adds a timestamp at the beginning of every line of log output. If not provided, defaults to false.
 */
export const ContainersListLogs = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ContainersListLogsInput,
  outputSchema: ContainersListLogsOutput,
}));
// Input Schema
export const LocationListCachedImagesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ContainerInstance/locations/{location}/cachedImages",
    }),
  );
export type LocationListCachedImagesInput =
  typeof LocationListCachedImagesInput.Type;

// Output Schema
export const LocationListCachedImagesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          osType: Schema.String,
          image: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type LocationListCachedImagesOutput =
  typeof LocationListCachedImagesOutput.Type;

// The operation
/**
 * Get the list of cached images.
 *
 * Get the list of cached images on specific OS type for a subscription in a region.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 * @param api-version - The API version to use for this operation.
 */
export const LocationListCachedImages = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LocationListCachedImagesInput,
    outputSchema: LocationListCachedImagesOutput,
  }),
);
// Input Schema
export const LocationListCapabilitiesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ContainerInstance/locations/{location}/capabilities",
    }),
  );
export type LocationListCapabilitiesInput =
  typeof LocationListCapabilitiesInput.Type;

// Output Schema
export const LocationListCapabilitiesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          resourceType: Schema.optional(Schema.String),
          osType: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          ipAddressType: Schema.optional(Schema.String),
          gpu: Schema.optional(Schema.String),
          capabilities: Schema.optional(
            Schema.Struct({
              maxMemoryInGB: Schema.optional(Schema.Number),
              maxCpu: Schema.optional(Schema.Number),
              maxGpuCount: Schema.optional(Schema.Number),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type LocationListCapabilitiesOutput =
  typeof LocationListCapabilitiesOutput.Type;

// The operation
/**
 * Get the list of capabilities of the location.
 *
 * Get the list of CPU/memory/GPU capabilities of a region.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 * @param api-version - The API version to use for this operation.
 */
export const LocationListCapabilities = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LocationListCapabilitiesInput,
    outputSchema: LocationListCapabilitiesOutput,
  }),
);
// Input Schema
export const LocationListUsageInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.ContainerInstance/locations/{location}/usages",
  }),
);
export type LocationListUsageInput = typeof LocationListUsageInput.Type;

// Output Schema
export const LocationListUsageOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          unit: Schema.optional(Schema.String),
          currentValue: Schema.optional(Schema.Number),
          limit: Schema.optional(Schema.Number),
          name: Schema.optional(
            Schema.Struct({
              value: Schema.optional(Schema.String),
              localizedValue: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    ),
  });
export type LocationListUsageOutput = typeof LocationListUsageOutput.Type;

// The operation
/**
 * Get the usage for a subscription
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 * @param api-version - The API version to use for this operation.
 */
export const LocationListUsage = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LocationListUsageInput,
  outputSchema: LocationListUsageOutput,
}));
// Input Schema
export const NGroupsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/ngroups/{ngroupsName}",
    }),
  );
export type NGroupsCreateOrUpdateInput = typeof NGroupsCreateOrUpdateInput.Type;

// Output Schema
export const NGroupsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    zones: Schema.optional(Schema.Array(Schema.String)),
  });
export type NGroupsCreateOrUpdateOutput =
  typeof NGroupsCreateOrUpdateOutput.Type;

// The operation
/**
 * NGroup PUT REST API
 *
 * Create or update a NGroups resource.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const NGroupsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NGroupsCreateOrUpdateInput,
    outputSchema: NGroupsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const NGroupsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/ngroups/{ngroupsName}",
  }),
);
export type NGroupsDeleteInput = typeof NGroupsDeleteInput.Type;

// Output Schema
export const NGroupsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NGroupsDeleteOutput = typeof NGroupsDeleteOutput.Type;

// The operation
/**
 * NGroups Delete REST API
 *
 * Deletes the NGroups resource.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const NGroupsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NGroupsDeleteInput,
  outputSchema: NGroupsDeleteOutput,
}));
// Input Schema
export const NGroupsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/ngroups/{ngroupsName}",
  }),
);
export type NGroupsGetInput = typeof NGroupsGetInput.Type;

// Output Schema
export const NGroupsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  zones: Schema.optional(Schema.Array(Schema.String)),
});
export type NGroupsGetOutput = typeof NGroupsGetOutput.Type;

// The operation
/**
 * NGroups GET REST API
 *
 * Get the properties of the specified NGroups resource.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const NGroupsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NGroupsGetInput,
  outputSchema: NGroupsGetOutput,
}));
// Input Schema
export const NGroupsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.ContainerInstance/ngroups",
  }),
);
export type NGroupsListInput = typeof NGroupsListInput.Type;

// Output Schema
export const NGroupsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
        location: Schema.optional(Schema.String),
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        zones: Schema.optional(Schema.Array(Schema.String)),
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type NGroupsListOutput = typeof NGroupsListOutput.Type;

// The operation
/**
 * List NGroups in a subscription.
 *
 * Gets a list of all NGroups resources under a subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const NGroupsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NGroupsListInput,
  outputSchema: NGroupsListOutput,
}));
// Input Schema
export const NGroupsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/ngroups",
    }),
  );
export type NGroupsListByResourceGroupInput =
  typeof NGroupsListByResourceGroupInput.Type;

// Output Schema
export const NGroupsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          zones: Schema.optional(Schema.Array(Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type NGroupsListByResourceGroupOutput =
  typeof NGroupsListByResourceGroupOutput.Type;

// The operation
/**
 * GET NGroups under a resource group REST API.
 *
 * Gets a list of all NGroups resources under a resource group.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NGroupsListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NGroupsListByResourceGroupInput,
    outputSchema: NGroupsListByResourceGroupOutput,
  }),
);
// Input Schema
export const NGroupsRestartInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/ngroups/{ngroupsName}/restart",
  }),
);
export type NGroupsRestartInput = typeof NGroupsRestartInput.Type;

// Output Schema
export const NGroupsRestartOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NGroupsRestartOutput = typeof NGroupsRestartOutput.Type;

// The operation
/**
 * Restarts all container groups in the specified NGroups resource.
 *
 * Restarts all container groups in the specified NGroups resource in place. If container image has updates, new image will be downloaded.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const NGroupsRestart = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NGroupsRestartInput,
  outputSchema: NGroupsRestartOutput,
}));
// Input Schema
export const NGroupsStartInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/ngroups/{ngroupsName}/start",
  }),
);
export type NGroupsStartInput = typeof NGroupsStartInput.Type;

// Output Schema
export const NGroupsStartOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NGroupsStartOutput = typeof NGroupsStartOutput.Type;

// The operation
/**
 * Starts all container groups in the specified NGroups resource.
 *
 * Starts all container groups in the specified NGroups resource. Compute resources will be allocated and billing will start.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const NGroupsStart = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NGroupsStartInput,
  outputSchema: NGroupsStartOutput,
}));
// Input Schema
export const NGroupsStopInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/ngroups/{ngroupsName}/stop",
  }),
);
export type NGroupsStopInput = typeof NGroupsStopInput.Type;

// Output Schema
export const NGroupsStopOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NGroupsStopOutput = typeof NGroupsStopOutput.Type;

// The operation
/**
 * Stops all container groups in the specified NGroups resource.
 *
 * Stops all container groups in the specified NGroups resource. Compute resources will be deallocated and billing will stop.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const NGroupsStop = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NGroupsStopInput,
  outputSchema: NGroupsStopOutput,
}));
// Input Schema
export const NGroupsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/ngroups/{ngroupsName}",
  }),
);
export type NGroupsUpdateInput = typeof NGroupsUpdateInput.Type;

// Output Schema
export const NGroupsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  zones: Schema.optional(Schema.Array(Schema.String)),
});
export type NGroupsUpdateOutput = typeof NGroupsUpdateOutput.Type;

// The operation
/**
 * NGroups PATCH REST API
 *
 * Update a specified NGroups resource.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const NGroupsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NGroupsUpdateInput,
  outputSchema: NGroupsUpdateOutput,
}));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.ContainerInstance/operations",
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
          provider: Schema.optional(Schema.String),
          resource: Schema.optional(Schema.String),
          operation: Schema.optional(Schema.String),
          description: Schema.optional(Schema.String),
        }),
        properties: Schema.optional(Schema.Unknown),
        origin: Schema.optional(Schema.Literals(["User", "System"])),
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type OperationsListOutput = typeof OperationsListOutput.Type;

// The operation
/**
 * List the operations for Azure Container Instance service.
 *
 * @param api-version - The API version to use for this operation.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const SubnetServiceAssociationLinkDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/subnets/{subnetName}/providers/Microsoft.ContainerInstance/serviceAssociationLinks/default",
    }),
  );
export type SubnetServiceAssociationLinkDeleteInput =
  typeof SubnetServiceAssociationLinkDeleteInput.Type;

// Output Schema
export const SubnetServiceAssociationLinkDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SubnetServiceAssociationLinkDeleteOutput =
  typeof SubnetServiceAssociationLinkDeleteOutput.Type;

// The operation
/**
 * Delete container group virtual network association links.
 *
 * Delete container group virtual network association links. The operation does not delete other resources provided by the user.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const SubnetServiceAssociationLinkDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SubnetServiceAssociationLinkDeleteInput,
    outputSchema: SubnetServiceAssociationLinkDeleteOutput,
  }));
