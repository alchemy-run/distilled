/**
 * Azure Vmwarecloudsimple API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";
import { SensitiveString } from "../sensitive.ts";

// Input Schema
export const CustomizationPoliciesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    customizationPolicyName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.VMwareCloudSimple/locations/{regionId}/privateClouds/{pcName}/customizationPolicies/{customizationPolicyName}",
    }),
  );
export type CustomizationPoliciesGetInput =
  typeof CustomizationPoliciesGetInput.Type;

// Output Schema
export const CustomizationPoliciesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        description: Schema.optional(Schema.String),
        privateCloudId: Schema.optional(Schema.String),
        specification: Schema.optional(
          Schema.Struct({
            identity: Schema.optional(
              Schema.Struct({
                data: Schema.optional(Schema.String),
                hostName: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    type: Schema.optional(
                      Schema.Literals([
                        "USER_DEFINED",
                        "PREFIX_BASED",
                        "FIXED",
                        "VIRTUAL_MACHINE_NAME",
                        "CUSTOM_NAME",
                      ]),
                    ),
                  }),
                ),
                type: Schema.optional(
                  Schema.Literals(["WINDOWS_TEXT", "WINDOWS", "LINUX"]),
                ),
                userData: Schema.optional(
                  Schema.Struct({
                    isPasswordPredefined: Schema.optional(Schema.Boolean),
                  }),
                ),
              }),
            ),
            nicSettings: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  adapter: Schema.optional(
                    Schema.Struct({
                      gateway: Schema.optional(Schema.Array(Schema.String)),
                      ip: Schema.optional(
                        Schema.Struct({
                          argument: Schema.optional(Schema.String),
                          ipAddress: Schema.optional(Schema.String),
                          type: Schema.optional(
                            Schema.Literals([
                              "CUSTOM",
                              "DHCP_IP",
                              "FIXED_IP",
                              "USER_DEFINED",
                            ]),
                          ),
                        }),
                      ),
                      subnetMask: Schema.optional(Schema.String),
                    }),
                  ),
                  macAddress: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
        ),
        type: Schema.optional(Schema.Literals(["LINUX", "WINDOWS"])),
        version: Schema.optional(Schema.String),
      }),
    ),
    type: Schema.optional(Schema.String),
  });
export type CustomizationPoliciesGetOutput =
  typeof CustomizationPoliciesGetOutput.Type;

// The operation
/**
 * Implements get of customization policy
 *
 * Returns customization policy by its name
 *
 * @param customizationPolicyName - customization policy name
 */
export const customizationPoliciesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CustomizationPoliciesGetInput,
    outputSchema: CustomizationPoliciesGetOutput,
  }),
);
// Input Schema
export const CustomizationPoliciesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.VMwareCloudSimple/locations/{regionId}/privateClouds/{pcName}/customizationPolicies",
    }),
  );
export type CustomizationPoliciesListInput =
  typeof CustomizationPoliciesListInput.Type;

// Output Schema
export const CustomizationPoliciesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              description: Schema.optional(Schema.String),
              privateCloudId: Schema.optional(Schema.String),
              specification: Schema.optional(
                Schema.Struct({
                  identity: Schema.optional(
                    Schema.Struct({
                      data: Schema.optional(Schema.String),
                      hostName: Schema.optional(
                        Schema.Struct({
                          name: Schema.optional(Schema.String),
                          type: Schema.optional(
                            Schema.Literals([
                              "USER_DEFINED",
                              "PREFIX_BASED",
                              "FIXED",
                              "VIRTUAL_MACHINE_NAME",
                              "CUSTOM_NAME",
                            ]),
                          ),
                        }),
                      ),
                      type: Schema.optional(
                        Schema.Literals(["WINDOWS_TEXT", "WINDOWS", "LINUX"]),
                      ),
                      userData: Schema.optional(
                        Schema.Struct({
                          isPasswordPredefined: Schema.optional(Schema.Boolean),
                        }),
                      ),
                    }),
                  ),
                  nicSettings: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        adapter: Schema.optional(
                          Schema.Struct({
                            gateway: Schema.optional(
                              Schema.Array(Schema.String),
                            ),
                            ip: Schema.optional(
                              Schema.Struct({
                                argument: Schema.optional(Schema.String),
                                ipAddress: Schema.optional(Schema.String),
                                type: Schema.optional(
                                  Schema.Literals([
                                    "CUSTOM",
                                    "DHCP_IP",
                                    "FIXED_IP",
                                    "USER_DEFINED",
                                  ]),
                                ),
                              }),
                            ),
                            subnetMask: Schema.optional(Schema.String),
                          }),
                        ),
                        macAddress: Schema.optional(Schema.String),
                      }),
                    ),
                  ),
                }),
              ),
              type: Schema.optional(Schema.Literals(["LINUX", "WINDOWS"])),
              version: Schema.optional(Schema.String),
            }),
          ),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type CustomizationPoliciesListOutput =
  typeof CustomizationPoliciesListOutput.Type;

// The operation
/**
 * Implements get of customization policies list
 *
 * Returns list of customization policies in region for private cloud
 *
 * @param $filter - The filter to apply on the list operation. only type is allowed here as a filter e.g. $filter=type eq 'xxxx'
 */
export const customizationPoliciesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CustomizationPoliciesListInput,
    outputSchema: CustomizationPoliciesListOutput,
  }),
);
// Input Schema
export const DedicatedCloudNodesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dedicatedCloudNodeName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VMwareCloudSimple/dedicatedCloudNodes/{dedicatedCloudNodeName}",
    }),
  );
export type DedicatedCloudNodesCreateOrUpdateInput =
  typeof DedicatedCloudNodesCreateOrUpdateInput.Type;

// Output Schema
export const DedicatedCloudNodesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    location: Schema.String,
    name: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        availabilityZoneId: Schema.String,
        availabilityZoneName: Schema.optional(Schema.String),
        cloudRackName: Schema.optional(Schema.String),
        created: Schema.optional(Schema.String),
        nodesCount: Schema.Number,
        placementGroupId: Schema.String,
        placementGroupName: Schema.optional(Schema.String),
        privateCloudId: Schema.optional(Schema.String),
        privateCloudName: Schema.optional(Schema.String),
        provisioningState: Schema.optional(Schema.String),
        purchaseId: Schema.String,
        skuDescription: Schema.optional(
          Schema.Struct({
            id: Schema.String,
            name: Schema.String,
          }),
        ),
        status: Schema.optional(Schema.Literals(["unused", "used"])),
        vmwareClusterName: Schema.optional(Schema.String),
      }),
    ),
    sku: Schema.optional(
      Schema.Struct({
        capacity: Schema.optional(Schema.String),
        description: Schema.optional(Schema.String),
        family: Schema.optional(Schema.String),
        name: Schema.String,
        tier: Schema.optional(Schema.String),
      }),
    ),
    tags: Schema.optional(Schema.Unknown),
    type: Schema.optional(Schema.String),
  });
export type DedicatedCloudNodesCreateOrUpdateOutput =
  typeof DedicatedCloudNodesCreateOrUpdateOutput.Type;

// The operation
/**
 * Implements dedicated cloud node PUT method
 *
 * Returns dedicated cloud node by its name
 *
 * @param dedicatedCloudNodeName - dedicated cloud node name
 */
export const DedicatedCloudNodesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DedicatedCloudNodesCreateOrUpdateInput,
    outputSchema: DedicatedCloudNodesCreateOrUpdateOutput,
  }));
// Input Schema
export const DedicatedCloudNodesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dedicatedCloudNodeName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VMwareCloudSimple/dedicatedCloudNodes/{dedicatedCloudNodeName}",
    }),
  );
export type DedicatedCloudNodesDeleteInput =
  typeof DedicatedCloudNodesDeleteInput.Type;

// Output Schema
export const DedicatedCloudNodesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DedicatedCloudNodesDeleteOutput =
  typeof DedicatedCloudNodesDeleteOutput.Type;

// The operation
/**
 * Implements dedicated cloud node DELETE method
 *
 * Delete dedicated cloud node
 *
 * @param dedicatedCloudNodeName - dedicated cloud node name
 */
export const DedicatedCloudNodesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DedicatedCloudNodesDeleteInput,
    outputSchema: DedicatedCloudNodesDeleteOutput,
  }),
);
// Input Schema
export const DedicatedCloudNodesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dedicatedCloudNodeName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VMwareCloudSimple/dedicatedCloudNodes/{dedicatedCloudNodeName}",
    }),
  );
export type DedicatedCloudNodesGetInput =
  typeof DedicatedCloudNodesGetInput.Type;

// Output Schema
export const DedicatedCloudNodesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    location: Schema.String,
    name: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        availabilityZoneId: Schema.String,
        availabilityZoneName: Schema.optional(Schema.String),
        cloudRackName: Schema.optional(Schema.String),
        created: Schema.optional(Schema.String),
        nodesCount: Schema.Number,
        placementGroupId: Schema.String,
        placementGroupName: Schema.optional(Schema.String),
        privateCloudId: Schema.optional(Schema.String),
        privateCloudName: Schema.optional(Schema.String),
        provisioningState: Schema.optional(Schema.String),
        purchaseId: Schema.String,
        skuDescription: Schema.optional(
          Schema.Struct({
            id: Schema.String,
            name: Schema.String,
          }),
        ),
        status: Schema.optional(Schema.Literals(["unused", "used"])),
        vmwareClusterName: Schema.optional(Schema.String),
      }),
    ),
    sku: Schema.optional(
      Schema.Struct({
        capacity: Schema.optional(Schema.String),
        description: Schema.optional(Schema.String),
        family: Schema.optional(Schema.String),
        name: Schema.String,
        tier: Schema.optional(Schema.String),
      }),
    ),
    tags: Schema.optional(Schema.Unknown),
    type: Schema.optional(Schema.String),
  });
export type DedicatedCloudNodesGetOutput =
  typeof DedicatedCloudNodesGetOutput.Type;

// The operation
/**
 * Implements dedicated cloud node GET method
 *
 * Returns dedicated cloud node
 *
 * @param dedicatedCloudNodeName - dedicated cloud node name
 */
export const DedicatedCloudNodesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DedicatedCloudNodesGetInput,
    outputSchema: DedicatedCloudNodesGetOutput,
  }),
);
// Input Schema
export const DedicatedCloudNodesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    $filter: Schema.optional(Schema.String),
    $top: Schema.optional(Schema.Number),
    $skipToken: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VMwareCloudSimple/dedicatedCloudNodes",
    }),
  );
export type DedicatedCloudNodesListByResourceGroupInput =
  typeof DedicatedCloudNodesListByResourceGroupInput.Type;

// Output Schema
export const DedicatedCloudNodesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          location: Schema.String,
          name: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              availabilityZoneId: Schema.String,
              availabilityZoneName: Schema.optional(Schema.String),
              cloudRackName: Schema.optional(Schema.String),
              created: Schema.optional(Schema.String),
              nodesCount: Schema.Number,
              placementGroupId: Schema.String,
              placementGroupName: Schema.optional(Schema.String),
              privateCloudId: Schema.optional(Schema.String),
              privateCloudName: Schema.optional(Schema.String),
              provisioningState: Schema.optional(Schema.String),
              purchaseId: Schema.String,
              skuDescription: Schema.optional(
                Schema.Struct({
                  id: Schema.String,
                  name: Schema.String,
                }),
              ),
              status: Schema.optional(Schema.Literals(["unused", "used"])),
              vmwareClusterName: Schema.optional(Schema.String),
            }),
          ),
          sku: Schema.optional(
            Schema.Struct({
              capacity: Schema.optional(Schema.String),
              description: Schema.optional(Schema.String),
              family: Schema.optional(Schema.String),
              name: Schema.String,
              tier: Schema.optional(Schema.String),
            }),
          ),
          tags: Schema.optional(Schema.Unknown),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type DedicatedCloudNodesListByResourceGroupOutput =
  typeof DedicatedCloudNodesListByResourceGroupOutput.Type;

// The operation
/**
 * Implements list of dedicated cloud nodes within RG method
 *
 * Returns list of dedicate cloud nodes within resource group
 *
 * @param $filter - The filter to apply on the list operation
 * @param $top - The maximum number of record sets to return
 * @param $skipToken - to be used by nextLink implementation
 */
export const DedicatedCloudNodesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DedicatedCloudNodesListByResourceGroupInput,
    outputSchema: DedicatedCloudNodesListByResourceGroupOutput,
  }));
// Input Schema
export const DedicatedCloudNodesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    $filter: Schema.optional(Schema.String),
    $top: Schema.optional(Schema.Number),
    $skipToken: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.VMwareCloudSimple/dedicatedCloudNodes",
    }),
  );
export type DedicatedCloudNodesListBySubscriptionInput =
  typeof DedicatedCloudNodesListBySubscriptionInput.Type;

// Output Schema
export const DedicatedCloudNodesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          location: Schema.String,
          name: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              availabilityZoneId: Schema.String,
              availabilityZoneName: Schema.optional(Schema.String),
              cloudRackName: Schema.optional(Schema.String),
              created: Schema.optional(Schema.String),
              nodesCount: Schema.Number,
              placementGroupId: Schema.String,
              placementGroupName: Schema.optional(Schema.String),
              privateCloudId: Schema.optional(Schema.String),
              privateCloudName: Schema.optional(Schema.String),
              provisioningState: Schema.optional(Schema.String),
              purchaseId: Schema.String,
              skuDescription: Schema.optional(
                Schema.Struct({
                  id: Schema.String,
                  name: Schema.String,
                }),
              ),
              status: Schema.optional(Schema.Literals(["unused", "used"])),
              vmwareClusterName: Schema.optional(Schema.String),
            }),
          ),
          sku: Schema.optional(
            Schema.Struct({
              capacity: Schema.optional(Schema.String),
              description: Schema.optional(Schema.String),
              family: Schema.optional(Schema.String),
              name: Schema.String,
              tier: Schema.optional(Schema.String),
            }),
          ),
          tags: Schema.optional(Schema.Unknown),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type DedicatedCloudNodesListBySubscriptionOutput =
  typeof DedicatedCloudNodesListBySubscriptionOutput.Type;

// The operation
/**
 * Implements list of dedicated cloud nodes within subscription method
 *
 * Returns list of dedicate cloud nodes within subscription
 *
 * @param $filter - The filter to apply on the list operation
 * @param $top - The maximum number of record sets to return
 * @param $skipToken - to be used by nextLink implementation
 */
export const DedicatedCloudNodesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DedicatedCloudNodesListBySubscriptionInput,
    outputSchema: DedicatedCloudNodesListBySubscriptionOutput,
  }));
// Input Schema
export const DedicatedCloudNodesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dedicatedCloudNodeName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VMwareCloudSimple/dedicatedCloudNodes/{dedicatedCloudNodeName}",
    }),
  );
export type DedicatedCloudNodesUpdateInput =
  typeof DedicatedCloudNodesUpdateInput.Type;

// Output Schema
export const DedicatedCloudNodesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    location: Schema.String,
    name: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        availabilityZoneId: Schema.String,
        availabilityZoneName: Schema.optional(Schema.String),
        cloudRackName: Schema.optional(Schema.String),
        created: Schema.optional(Schema.String),
        nodesCount: Schema.Number,
        placementGroupId: Schema.String,
        placementGroupName: Schema.optional(Schema.String),
        privateCloudId: Schema.optional(Schema.String),
        privateCloudName: Schema.optional(Schema.String),
        provisioningState: Schema.optional(Schema.String),
        purchaseId: Schema.String,
        skuDescription: Schema.optional(
          Schema.Struct({
            id: Schema.String,
            name: Schema.String,
          }),
        ),
        status: Schema.optional(Schema.Literals(["unused", "used"])),
        vmwareClusterName: Schema.optional(Schema.String),
      }),
    ),
    sku: Schema.optional(
      Schema.Struct({
        capacity: Schema.optional(Schema.String),
        description: Schema.optional(Schema.String),
        family: Schema.optional(Schema.String),
        name: Schema.String,
        tier: Schema.optional(Schema.String),
      }),
    ),
    tags: Schema.optional(Schema.Unknown),
    type: Schema.optional(Schema.String),
  });
export type DedicatedCloudNodesUpdateOutput =
  typeof DedicatedCloudNodesUpdateOutput.Type;

// The operation
/**
 * Implements dedicated cloud node PATCH method
 *
 * Patches dedicated node properties
 *
 * @param dedicatedCloudNodeName - dedicated cloud node name
 */
export const DedicatedCloudNodesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DedicatedCloudNodesUpdateInput,
    outputSchema: DedicatedCloudNodesUpdateOutput,
  }),
);
// Input Schema
export const DedicatedCloudServicesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dedicatedCloudServiceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VMwareCloudSimple/dedicatedCloudServices/{dedicatedCloudServiceName}",
    }),
  );
export type DedicatedCloudServicesCreateOrUpdateInput =
  typeof DedicatedCloudServicesCreateOrUpdateInput.Type;

// Output Schema
export const DedicatedCloudServicesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    location: Schema.String,
    name: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        gatewaySubnet: Schema.String,
        isAccountOnboarded: Schema.optional(
          Schema.Literals([
            "notOnBoarded",
            "onBoarded",
            "onBoardingFailed",
            "onBoarding",
          ]),
        ),
        nodes: Schema.optional(Schema.Number),
        serviceURL: Schema.optional(Schema.String),
      }),
    ),
    tags: Schema.optional(Schema.Unknown),
    type: Schema.optional(Schema.String),
  });
export type DedicatedCloudServicesCreateOrUpdateOutput =
  typeof DedicatedCloudServicesCreateOrUpdateOutput.Type;

// The operation
/**
 * Implements dedicated cloud service PUT method
 *
 * Create dedicate cloud service
 *
 * @param dedicatedCloudServiceName - dedicated cloud Service name
 */
export const DedicatedCloudServicesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DedicatedCloudServicesCreateOrUpdateInput,
    outputSchema: DedicatedCloudServicesCreateOrUpdateOutput,
  }));
// Input Schema
export const DedicatedCloudServicesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dedicatedCloudServiceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VMwareCloudSimple/dedicatedCloudServices/{dedicatedCloudServiceName}",
    }),
  );
export type DedicatedCloudServicesDeleteInput =
  typeof DedicatedCloudServicesDeleteInput.Type;

// Output Schema
export const DedicatedCloudServicesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DedicatedCloudServicesDeleteOutput =
  typeof DedicatedCloudServicesDeleteOutput.Type;

// The operation
/**
 * Implements dedicatedCloudService DELETE method
 *
 * Delete dedicate cloud service
 *
 * @param dedicatedCloudServiceName - dedicated cloud service name
 */
export const DedicatedCloudServicesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DedicatedCloudServicesDeleteInput,
    outputSchema: DedicatedCloudServicesDeleteOutput,
  }));
// Input Schema
export const DedicatedCloudServicesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dedicatedCloudServiceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VMwareCloudSimple/dedicatedCloudServices/{dedicatedCloudServiceName}",
    }),
  );
export type DedicatedCloudServicesGetInput =
  typeof DedicatedCloudServicesGetInput.Type;

// Output Schema
export const DedicatedCloudServicesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    location: Schema.String,
    name: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        gatewaySubnet: Schema.String,
        isAccountOnboarded: Schema.optional(
          Schema.Literals([
            "notOnBoarded",
            "onBoarded",
            "onBoardingFailed",
            "onBoarding",
          ]),
        ),
        nodes: Schema.optional(Schema.Number),
        serviceURL: Schema.optional(Schema.String),
      }),
    ),
    tags: Schema.optional(Schema.Unknown),
    type: Schema.optional(Schema.String),
  });
export type DedicatedCloudServicesGetOutput =
  typeof DedicatedCloudServicesGetOutput.Type;

// The operation
/**
 * Implements dedicatedCloudService GET method
 *
 * Returns Dedicate Cloud Service
 *
 * @param dedicatedCloudServiceName - dedicated cloud Service name
 */
export const DedicatedCloudServicesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DedicatedCloudServicesGetInput,
    outputSchema: DedicatedCloudServicesGetOutput,
  }),
);
// Input Schema
export const DedicatedCloudServicesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    $filter: Schema.optional(Schema.String),
    $top: Schema.optional(Schema.Number),
    $skipToken: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VMwareCloudSimple/dedicatedCloudServices",
    }),
  );
export type DedicatedCloudServicesListByResourceGroupInput =
  typeof DedicatedCloudServicesListByResourceGroupInput.Type;

// Output Schema
export const DedicatedCloudServicesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          location: Schema.String,
          name: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              gatewaySubnet: Schema.String,
              isAccountOnboarded: Schema.optional(
                Schema.Literals([
                  "notOnBoarded",
                  "onBoarded",
                  "onBoardingFailed",
                  "onBoarding",
                ]),
              ),
              nodes: Schema.optional(Schema.Number),
              serviceURL: Schema.optional(Schema.String),
            }),
          ),
          tags: Schema.optional(Schema.Unknown),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type DedicatedCloudServicesListByResourceGroupOutput =
  typeof DedicatedCloudServicesListByResourceGroupOutput.Type;

// The operation
/**
 * Implements list of dedicatedCloudService objects within RG method
 *
 * Returns list of dedicated cloud services within a resource group
 *
 * @param $filter - The filter to apply on the list operation
 * @param $top - The maximum number of record sets to return
 * @param $skipToken - to be used by nextLink implementation
 */
export const DedicatedCloudServicesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DedicatedCloudServicesListByResourceGroupInput,
    outputSchema: DedicatedCloudServicesListByResourceGroupOutput,
  }));
// Input Schema
export const DedicatedCloudServicesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    $filter: Schema.optional(Schema.String),
    $top: Schema.optional(Schema.Number),
    $skipToken: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.VMwareCloudSimple/dedicatedCloudServices",
    }),
  );
export type DedicatedCloudServicesListBySubscriptionInput =
  typeof DedicatedCloudServicesListBySubscriptionInput.Type;

// Output Schema
export const DedicatedCloudServicesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          location: Schema.String,
          name: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              gatewaySubnet: Schema.String,
              isAccountOnboarded: Schema.optional(
                Schema.Literals([
                  "notOnBoarded",
                  "onBoarded",
                  "onBoardingFailed",
                  "onBoarding",
                ]),
              ),
              nodes: Schema.optional(Schema.Number),
              serviceURL: Schema.optional(Schema.String),
            }),
          ),
          tags: Schema.optional(Schema.Unknown),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type DedicatedCloudServicesListBySubscriptionOutput =
  typeof DedicatedCloudServicesListBySubscriptionOutput.Type;

// The operation
/**
 * Implements list of dedicatedCloudService objects within subscription method
 *
 * Returns list of dedicated cloud services within a subscription
 *
 * @param $filter - The filter to apply on the list operation
 * @param $top - The maximum number of record sets to return
 * @param $skipToken - to be used by nextLink implementation
 */
export const DedicatedCloudServicesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DedicatedCloudServicesListBySubscriptionInput,
    outputSchema: DedicatedCloudServicesListBySubscriptionOutput,
  }));
// Input Schema
export const DedicatedCloudServicesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dedicatedCloudServiceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VMwareCloudSimple/dedicatedCloudServices/{dedicatedCloudServiceName}",
    }),
  );
export type DedicatedCloudServicesUpdateInput =
  typeof DedicatedCloudServicesUpdateInput.Type;

// Output Schema
export const DedicatedCloudServicesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    location: Schema.String,
    name: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        gatewaySubnet: Schema.String,
        isAccountOnboarded: Schema.optional(
          Schema.Literals([
            "notOnBoarded",
            "onBoarded",
            "onBoardingFailed",
            "onBoarding",
          ]),
        ),
        nodes: Schema.optional(Schema.Number),
        serviceURL: Schema.optional(Schema.String),
      }),
    ),
    tags: Schema.optional(Schema.Unknown),
    type: Schema.optional(Schema.String),
  });
export type DedicatedCloudServicesUpdateOutput =
  typeof DedicatedCloudServicesUpdateOutput.Type;

// The operation
/**
 * Implements dedicatedCloudService PATCH method
 *
 * Patch dedicated cloud service's properties
 *
 * @param dedicatedCloudServiceName - dedicated cloud service name
 */
export const DedicatedCloudServicesUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DedicatedCloudServicesUpdateInput,
    outputSchema: DedicatedCloudServicesUpdateOutput,
  }));
// Input Schema
export const OperationsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  operationId: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.VMwareCloudSimple/locations/{regionId}/operationResults/{operationId}",
  }),
);
export type OperationsGetInput = typeof OperationsGetInput.Type;

// Output Schema
export const OperationsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  endTime: Schema.optional(Schema.String),
  error: Schema.optional(
    Schema.Struct({
      code: Schema.optional(Schema.String),
      message: Schema.optional(Schema.String),
    }),
  ),
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
});
export type OperationsGetOutput = typeof OperationsGetOutput.Type;

// The operation
/**
 * Implements get of async operation
 *
 * Return an async operation
 *
 * @param operationId - operation id
 */
export const OperationsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsGetInput,
  outputSchema: OperationsGetOutput,
}));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.VMwareCloudSimple/operations",
  }),
);
export type OperationsListInput = typeof OperationsListInput.Type;

// Output Schema
export const OperationsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  nextLink: Schema.optional(Schema.String),
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        display: Schema.optional(
          Schema.Struct({
            description: Schema.optional(Schema.String),
            operation: Schema.optional(Schema.String),
            provider: Schema.optional(Schema.String),
            resource: Schema.optional(Schema.String),
          }),
        ),
        isDataAction: Schema.optional(Schema.Boolean),
        name: Schema.optional(Schema.String),
        origin: Schema.optional(
          Schema.Literals(["user", "system", "user,system"]),
        ),
        properties: Schema.optional(
          Schema.Struct({
            serviceSpecification: Schema.optional(
              Schema.Struct({
                metricSpecifications: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      aggregationType: Schema.Literals(["Average", "Total"]),
                      displayDescription: Schema.String,
                      displayName: Schema.String,
                      name: Schema.String,
                      unit: Schema.String,
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
});
export type OperationsListOutput = typeof OperationsListOutput.Type;

// The operation
/**
 * Implements list of available operations
 *
 * Return list of operations
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const PrivateCloudsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.VMwareCloudSimple/locations/{regionId}/privateClouds/{pcName}",
  }),
);
export type PrivateCloudsGetInput = typeof PrivateCloudsGetInput.Type;

// Output Schema
export const PrivateCloudsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    id: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        availabilityZoneId: Schema.optional(Schema.String),
        availabilityZoneName: Schema.optional(Schema.String),
        clustersNumber: Schema.optional(Schema.Number),
        createdBy: Schema.optional(Schema.String),
        createdOn: Schema.optional(Schema.String),
        dnsServers: Schema.optional(Schema.Array(Schema.String)),
        expires: Schema.optional(Schema.String),
        nsxType: Schema.optional(Schema.String),
        placementGroupId: Schema.optional(Schema.String),
        placementGroupName: Schema.optional(Schema.String),
        privateCloudId: Schema.optional(Schema.String),
        resourcePools: Schema.optional(
          Schema.Array(
            Schema.Struct({
              id: Schema.String,
              location: Schema.optional(Schema.String),
              name: Schema.optional(Schema.String),
              privateCloudId: Schema.optional(Schema.String),
              properties: Schema.optional(
                Schema.Struct({
                  fullName: Schema.optional(Schema.String),
                }),
              ),
              type: Schema.optional(Schema.String),
            }),
          ),
        ),
        state: Schema.optional(Schema.String),
        totalCpuCores: Schema.optional(Schema.Number),
        totalNodes: Schema.optional(Schema.Number),
        totalRam: Schema.optional(Schema.Number),
        totalStorage: Schema.optional(Schema.Number),
        type: Schema.optional(Schema.String),
        vSphereVersion: Schema.optional(Schema.String),
        vcenterFqdn: Schema.optional(Schema.String),
        vcenterRefid: Schema.optional(Schema.String),
        virtualMachineTemplates: Schema.optional(
          Schema.Array(
            Schema.Struct({
              id: Schema.optional(Schema.String),
              location: Schema.optional(Schema.String),
              name: Schema.optional(Schema.String),
              properties: Schema.optional(
                Schema.Struct({
                  amountOfRam: Schema.optional(Schema.Number),
                  controllers: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        id: Schema.optional(Schema.String),
                        name: Schema.optional(Schema.String),
                        subType: Schema.optional(Schema.String),
                        type: Schema.optional(Schema.String),
                      }),
                    ),
                  ),
                  description: Schema.optional(Schema.String),
                  disks: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        controllerId: Schema.String,
                        independenceMode: Schema.Literals([
                          "persistent",
                          "independent_persistent",
                          "independent_nonpersistent",
                        ]),
                        totalSize: Schema.Number,
                        virtualDiskId: Schema.optional(Schema.String),
                        virtualDiskName: Schema.optional(Schema.String),
                      }),
                    ),
                  ),
                  exposeToGuestVM: Schema.optional(Schema.Boolean),
                  guestOS: Schema.optional(Schema.String),
                  guestOSType: Schema.optional(Schema.String),
                  nics: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        customization: Schema.optional(
                          Schema.Struct({
                            allocation: Schema.optional(
                              Schema.Literals(["static", "dynamic"]),
                            ),
                            dnsServers: Schema.optional(
                              Schema.Array(Schema.String),
                            ),
                            gateway: Schema.optional(
                              Schema.Array(Schema.String),
                            ),
                            ipAddress: Schema.optional(Schema.String),
                            mask: Schema.optional(Schema.String),
                            primaryWinsServer: Schema.optional(Schema.String),
                            secondaryWinsServer: Schema.optional(Schema.String),
                          }),
                        ),
                        ipAddresses: Schema.optional(
                          Schema.Array(Schema.String),
                        ),
                        macAddress: Schema.optional(Schema.String),
                        network: Schema.Struct({
                          assignable: Schema.optional(Schema.Boolean),
                          id: Schema.String,
                          location: Schema.optional(Schema.String),
                          name: Schema.optional(Schema.String),
                          properties: Schema.optional(
                            Schema.Struct({
                              privateCloudId: Schema.optional(Schema.String),
                            }),
                          ),
                          type: Schema.optional(Schema.String),
                        }),
                        nicType: Schema.Literals([
                          "E1000",
                          "E1000E",
                          "PCNET32",
                          "VMXNET",
                          "VMXNET2",
                          "VMXNET3",
                        ]),
                        powerOnBoot: Schema.optional(Schema.Boolean),
                        virtualNicId: Schema.optional(Schema.String),
                        virtualNicName: Schema.optional(Schema.String),
                      }),
                    ),
                  ),
                  numberOfCores: Schema.optional(Schema.Number),
                  path: Schema.optional(Schema.String),
                  privateCloudId: Schema.String,
                  vSphereNetworks: Schema.optional(Schema.Array(Schema.String)),
                  vSphereTags: Schema.optional(Schema.Array(Schema.String)),
                  vmwaretools: Schema.optional(Schema.String),
                }),
              ),
              type: Schema.optional(Schema.String),
            }),
          ),
        ),
        virtualNetworks: Schema.optional(
          Schema.Array(
            Schema.Struct({
              assignable: Schema.optional(Schema.Boolean),
              id: Schema.String,
              location: Schema.optional(Schema.String),
              name: Schema.optional(Schema.String),
              properties: Schema.optional(
                Schema.Struct({
                  privateCloudId: Schema.optional(Schema.String),
                }),
              ),
              type: Schema.optional(Schema.String),
            }),
          ),
        ),
        vrOpsEnabled: Schema.optional(Schema.Boolean),
      }),
    ),
    type: Schema.optional(
      Schema.Literals(["Microsoft.VMwareCloudSimple/privateClouds"]),
    ),
  },
);
export type PrivateCloudsGetOutput = typeof PrivateCloudsGetOutput.Type;

// The operation
/**
 * Implements private cloud GET method
 *
 * Returns private cloud by its name
 */
export const PrivateCloudsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PrivateCloudsGetInput,
  outputSchema: PrivateCloudsGetOutput,
}));
// Input Schema
export const PrivateCloudsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.VMwareCloudSimple/locations/{regionId}/privateClouds",
  }),
);
export type PrivateCloudsListInput = typeof PrivateCloudsListInput.Type;

// Output Schema
export const PrivateCloudsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              availabilityZoneId: Schema.optional(Schema.String),
              availabilityZoneName: Schema.optional(Schema.String),
              clustersNumber: Schema.optional(Schema.Number),
              createdBy: Schema.optional(Schema.String),
              createdOn: Schema.optional(Schema.String),
              dnsServers: Schema.optional(Schema.Array(Schema.String)),
              expires: Schema.optional(Schema.String),
              nsxType: Schema.optional(Schema.String),
              placementGroupId: Schema.optional(Schema.String),
              placementGroupName: Schema.optional(Schema.String),
              privateCloudId: Schema.optional(Schema.String),
              resourcePools: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    id: Schema.String,
                    location: Schema.optional(Schema.String),
                    name: Schema.optional(Schema.String),
                    privateCloudId: Schema.optional(Schema.String),
                    properties: Schema.optional(
                      Schema.Struct({
                        fullName: Schema.optional(Schema.String),
                      }),
                    ),
                    type: Schema.optional(Schema.String),
                  }),
                ),
              ),
              state: Schema.optional(Schema.String),
              totalCpuCores: Schema.optional(Schema.Number),
              totalNodes: Schema.optional(Schema.Number),
              totalRam: Schema.optional(Schema.Number),
              totalStorage: Schema.optional(Schema.Number),
              type: Schema.optional(Schema.String),
              vSphereVersion: Schema.optional(Schema.String),
              vcenterFqdn: Schema.optional(Schema.String),
              vcenterRefid: Schema.optional(Schema.String),
              virtualMachineTemplates: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    id: Schema.optional(Schema.String),
                    location: Schema.optional(Schema.String),
                    name: Schema.optional(Schema.String),
                    properties: Schema.optional(
                      Schema.Struct({
                        amountOfRam: Schema.optional(Schema.Number),
                        controllers: Schema.optional(
                          Schema.Array(
                            Schema.Struct({
                              id: Schema.optional(Schema.String),
                              name: Schema.optional(Schema.String),
                              subType: Schema.optional(Schema.String),
                              type: Schema.optional(Schema.String),
                            }),
                          ),
                        ),
                        description: Schema.optional(Schema.String),
                        disks: Schema.optional(
                          Schema.Array(
                            Schema.Struct({
                              controllerId: Schema.String,
                              independenceMode: Schema.Literals([
                                "persistent",
                                "independent_persistent",
                                "independent_nonpersistent",
                              ]),
                              totalSize: Schema.Number,
                              virtualDiskId: Schema.optional(Schema.String),
                              virtualDiskName: Schema.optional(Schema.String),
                            }),
                          ),
                        ),
                        exposeToGuestVM: Schema.optional(Schema.Boolean),
                        guestOS: Schema.optional(Schema.String),
                        guestOSType: Schema.optional(Schema.String),
                        nics: Schema.optional(
                          Schema.Array(
                            Schema.Struct({
                              customization: Schema.optional(
                                Schema.Struct({
                                  allocation: Schema.optional(
                                    Schema.Literals(["static", "dynamic"]),
                                  ),
                                  dnsServers: Schema.optional(
                                    Schema.Array(Schema.String),
                                  ),
                                  gateway: Schema.optional(
                                    Schema.Array(Schema.String),
                                  ),
                                  ipAddress: Schema.optional(Schema.String),
                                  mask: Schema.optional(Schema.String),
                                  primaryWinsServer: Schema.optional(
                                    Schema.String,
                                  ),
                                  secondaryWinsServer: Schema.optional(
                                    Schema.String,
                                  ),
                                }),
                              ),
                              ipAddresses: Schema.optional(
                                Schema.Array(Schema.String),
                              ),
                              macAddress: Schema.optional(Schema.String),
                              network: Schema.Struct({
                                assignable: Schema.optional(Schema.Boolean),
                                id: Schema.String,
                                location: Schema.optional(Schema.String),
                                name: Schema.optional(Schema.String),
                                properties: Schema.optional(
                                  Schema.Struct({
                                    privateCloudId: Schema.optional(
                                      Schema.String,
                                    ),
                                  }),
                                ),
                                type: Schema.optional(Schema.String),
                              }),
                              nicType: Schema.Literals([
                                "E1000",
                                "E1000E",
                                "PCNET32",
                                "VMXNET",
                                "VMXNET2",
                                "VMXNET3",
                              ]),
                              powerOnBoot: Schema.optional(Schema.Boolean),
                              virtualNicId: Schema.optional(Schema.String),
                              virtualNicName: Schema.optional(Schema.String),
                            }),
                          ),
                        ),
                        numberOfCores: Schema.optional(Schema.Number),
                        path: Schema.optional(Schema.String),
                        privateCloudId: Schema.String,
                        vSphereNetworks: Schema.optional(
                          Schema.Array(Schema.String),
                        ),
                        vSphereTags: Schema.optional(
                          Schema.Array(Schema.String),
                        ),
                        vmwaretools: Schema.optional(Schema.String),
                      }),
                    ),
                    type: Schema.optional(Schema.String),
                  }),
                ),
              ),
              virtualNetworks: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    assignable: Schema.optional(Schema.Boolean),
                    id: Schema.String,
                    location: Schema.optional(Schema.String),
                    name: Schema.optional(Schema.String),
                    properties: Schema.optional(
                      Schema.Struct({
                        privateCloudId: Schema.optional(Schema.String),
                      }),
                    ),
                    type: Schema.optional(Schema.String),
                  }),
                ),
              ),
              vrOpsEnabled: Schema.optional(Schema.Boolean),
            }),
          ),
          type: Schema.optional(
            Schema.Literals(["Microsoft.VMwareCloudSimple/privateClouds"]),
          ),
        }),
      ),
    ),
  });
export type PrivateCloudsListOutput = typeof PrivateCloudsListOutput.Type;

// The operation
/**
 * Implements private cloud list GET method
 *
 * Returns list of private clouds in particular region
 */
export const PrivateCloudsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PrivateCloudsListInput,
  outputSchema: PrivateCloudsListOutput,
}));
// Input Schema
export const ResourcePoolsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourcePoolName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.VMwareCloudSimple/locations/{regionId}/privateClouds/{pcName}/resourcePools/{resourcePoolName}",
  }),
);
export type ResourcePoolsGetInput = typeof ResourcePoolsGetInput.Type;

// Output Schema
export const ResourcePoolsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    id: Schema.String,
    location: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    privateCloudId: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        fullName: Schema.optional(Schema.String),
      }),
    ),
    type: Schema.optional(Schema.String),
  },
);
export type ResourcePoolsGetOutput = typeof ResourcePoolsGetOutput.Type;

// The operation
/**
 * Implements get of resource pool
 *
 * Returns resource pool templates by its name
 *
 * @param resourcePoolName - resource pool id (vsphereId)
 */
export const ResourcePoolsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ResourcePoolsGetInput,
  outputSchema: ResourcePoolsGetOutput,
}));
// Input Schema
export const ResourcePoolsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.VMwareCloudSimple/locations/{regionId}/privateClouds/{pcName}/resourcePools",
  }),
);
export type ResourcePoolsListInput = typeof ResourcePoolsListInput.Type;

// Output Schema
export const ResourcePoolsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.String,
          location: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          privateCloudId: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              fullName: Schema.optional(Schema.String),
            }),
          ),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type ResourcePoolsListOutput = typeof ResourcePoolsListOutput.Type;

// The operation
/**
 * Implements get of resource pools list
 *
 * Returns list of resource pools in region for private cloud
 */
export const ResourcePoolsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ResourcePoolsListInput,
  outputSchema: ResourcePoolsListOutput,
}));
// Input Schema
export const SkusAvailabilityListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    skuId: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.VMwareCloudSimple/locations/{regionId}/availabilities",
    }),
  );
export type SkusAvailabilityListInput = typeof SkusAvailabilityListInput.Type;

// Output Schema
export const SkusAvailabilityListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          dedicatedAvailabilityZoneId: Schema.optional(Schema.String),
          dedicatedAvailabilityZoneName: Schema.optional(Schema.String),
          dedicatedPlacementGroupId: Schema.optional(Schema.String),
          dedicatedPlacementGroupName: Schema.optional(Schema.String),
          limit: Schema.Number,
          resourceType: Schema.optional(Schema.String),
          skuId: Schema.optional(Schema.String),
          skuName: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type SkusAvailabilityListOutput = typeof SkusAvailabilityListOutput.Type;

// The operation
/**
 * Implements SkuAvailability List method
 *
 * Returns list of available resources in region
 *
 * @param skuId - sku id, if no sku is passed availability for all skus will be returned
 */
export const SkusAvailabilityList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SkusAvailabilityListInput,
    outputSchema: SkusAvailabilityListOutput,
  }),
);
// Input Schema
export const UsagesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  $filter: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.VMwareCloudSimple/locations/{regionId}/usages",
  }),
);
export type UsagesListInput = typeof UsagesListInput.Type;

// Output Schema
export const UsagesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  nextLink: Schema.optional(Schema.String),
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        currentValue: Schema.Number,
        limit: Schema.Number,
        name: Schema.optional(
          Schema.Struct({
            localizedValue: Schema.optional(Schema.String),
            value: Schema.optional(Schema.String),
          }),
        ),
        unit: Schema.optional(
          Schema.Literals([
            "Count",
            "Bytes",
            "Seconds",
            "Percent",
            "CountPerSecond",
            "BytesPerSecond",
          ]),
        ),
      }),
    ),
  ),
});
export type UsagesListOutput = typeof UsagesListOutput.Type;

// The operation
/**
 * Implements Usages List method
 *
 * Returns list of usage in region
 *
 * @param $filter - The filter to apply on the list operation. only name.value is allowed here as a filter e.g. $filter=name.value eq 'xxxx'
 */
export const UsagesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UsagesListInput,
  outputSchema: UsagesListOutput,
}));
// Input Schema
export const VirtualMachinesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    virtualMachineName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VMwareCloudSimple/virtualMachines/{virtualMachineName}",
    }),
  );
export type VirtualMachinesCreateOrUpdateInput =
  typeof VirtualMachinesCreateOrUpdateInput.Type;

// Output Schema
export const VirtualMachinesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    location: Schema.String,
    name: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        amountOfRam: Schema.Number,
        controllers: Schema.optional(
          Schema.Array(
            Schema.Struct({
              id: Schema.optional(Schema.String),
              name: Schema.optional(Schema.String),
              subType: Schema.optional(Schema.String),
              type: Schema.optional(Schema.String),
            }),
          ),
        ),
        customization: Schema.optional(
          Schema.Struct({
            dnsServers: Schema.optional(Schema.Array(Schema.String)),
            hostName: Schema.optional(Schema.String),
            password: Schema.optional(SensitiveString),
            policyId: Schema.optional(Schema.String),
            username: Schema.optional(Schema.String),
          }),
        ),
        disks: Schema.optional(
          Schema.Array(
            Schema.Struct({
              controllerId: Schema.String,
              independenceMode: Schema.Literals([
                "persistent",
                "independent_persistent",
                "independent_nonpersistent",
              ]),
              totalSize: Schema.Number,
              virtualDiskId: Schema.optional(Schema.String),
              virtualDiskName: Schema.optional(Schema.String),
            }),
          ),
        ),
        dnsname: Schema.optional(Schema.String),
        exposeToGuestVM: Schema.optional(Schema.Boolean),
        folder: Schema.optional(Schema.String),
        guestOS: Schema.optional(Schema.String),
        guestOSType: Schema.optional(
          Schema.Literals(["linux", "windows", "other"]),
        ),
        nics: Schema.optional(
          Schema.Array(
            Schema.Struct({
              customization: Schema.optional(
                Schema.Struct({
                  allocation: Schema.optional(
                    Schema.Literals(["static", "dynamic"]),
                  ),
                  dnsServers: Schema.optional(Schema.Array(Schema.String)),
                  gateway: Schema.optional(Schema.Array(Schema.String)),
                  ipAddress: Schema.optional(Schema.String),
                  mask: Schema.optional(Schema.String),
                  primaryWinsServer: Schema.optional(Schema.String),
                  secondaryWinsServer: Schema.optional(Schema.String),
                }),
              ),
              ipAddresses: Schema.optional(Schema.Array(Schema.String)),
              macAddress: Schema.optional(Schema.String),
              network: Schema.Struct({
                assignable: Schema.optional(Schema.Boolean),
                id: Schema.String,
                location: Schema.optional(Schema.String),
                name: Schema.optional(Schema.String),
                properties: Schema.optional(
                  Schema.Struct({
                    privateCloudId: Schema.optional(Schema.String),
                  }),
                ),
                type: Schema.optional(Schema.String),
              }),
              nicType: Schema.Literals([
                "E1000",
                "E1000E",
                "PCNET32",
                "VMXNET",
                "VMXNET2",
                "VMXNET3",
              ]),
              powerOnBoot: Schema.optional(Schema.Boolean),
              virtualNicId: Schema.optional(Schema.String),
              virtualNicName: Schema.optional(Schema.String),
            }),
          ),
        ),
        numberOfCores: Schema.Number,
        password: Schema.optional(SensitiveString),
        privateCloudId: Schema.String,
        provisioningState: Schema.optional(Schema.String),
        publicIP: Schema.optional(Schema.String),
        resourcePool: Schema.optional(
          Schema.Struct({
            id: Schema.String,
            location: Schema.optional(Schema.String),
            name: Schema.optional(Schema.String),
            privateCloudId: Schema.optional(Schema.String),
            properties: Schema.optional(
              Schema.Struct({
                fullName: Schema.optional(Schema.String),
              }),
            ),
            type: Schema.optional(Schema.String),
          }),
        ),
        status: Schema.optional(
          Schema.Literals([
            "running",
            "suspended",
            "poweredoff",
            "updating",
            "deallocating",
            "deleting",
          ]),
        ),
        templateId: Schema.optional(Schema.String),
        username: Schema.optional(Schema.String),
        vSphereNetworks: Schema.optional(Schema.Array(Schema.String)),
        vmId: Schema.optional(Schema.String),
        vmwaretools: Schema.optional(Schema.String),
      }),
    ),
    tags: Schema.optional(Schema.Unknown),
    type: Schema.optional(Schema.String),
  });
export type VirtualMachinesCreateOrUpdateOutput =
  typeof VirtualMachinesCreateOrUpdateOutput.Type;

// The operation
/**
 * Implements virtual machine PUT method
 *
 * Create Or Update Virtual Machine
 *
 * @param virtualMachineName - virtual machine name
 */
export const VirtualMachinesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VirtualMachinesCreateOrUpdateInput,
    outputSchema: VirtualMachinesCreateOrUpdateOutput,
  }));
// Input Schema
export const VirtualMachinesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    virtualMachineName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VMwareCloudSimple/virtualMachines/{virtualMachineName}",
    }),
  );
export type VirtualMachinesDeleteInput = typeof VirtualMachinesDeleteInput.Type;

// Output Schema
export const VirtualMachinesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type VirtualMachinesDeleteOutput =
  typeof VirtualMachinesDeleteOutput.Type;

// The operation
/**
 * Implements virtual machine DELETE method
 *
 * Delete virtual machine
 *
 * @param virtualMachineName - virtual machine name
 */
export const VirtualMachinesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VirtualMachinesDeleteInput,
    outputSchema: VirtualMachinesDeleteOutput,
  }),
);
// Input Schema
export const VirtualMachinesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    virtualMachineName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VMwareCloudSimple/virtualMachines/{virtualMachineName}",
    }),
  );
export type VirtualMachinesGetInput = typeof VirtualMachinesGetInput.Type;

// Output Schema
export const VirtualMachinesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    location: Schema.String,
    name: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        amountOfRam: Schema.Number,
        controllers: Schema.optional(
          Schema.Array(
            Schema.Struct({
              id: Schema.optional(Schema.String),
              name: Schema.optional(Schema.String),
              subType: Schema.optional(Schema.String),
              type: Schema.optional(Schema.String),
            }),
          ),
        ),
        customization: Schema.optional(
          Schema.Struct({
            dnsServers: Schema.optional(Schema.Array(Schema.String)),
            hostName: Schema.optional(Schema.String),
            password: Schema.optional(SensitiveString),
            policyId: Schema.optional(Schema.String),
            username: Schema.optional(Schema.String),
          }),
        ),
        disks: Schema.optional(
          Schema.Array(
            Schema.Struct({
              controllerId: Schema.String,
              independenceMode: Schema.Literals([
                "persistent",
                "independent_persistent",
                "independent_nonpersistent",
              ]),
              totalSize: Schema.Number,
              virtualDiskId: Schema.optional(Schema.String),
              virtualDiskName: Schema.optional(Schema.String),
            }),
          ),
        ),
        dnsname: Schema.optional(Schema.String),
        exposeToGuestVM: Schema.optional(Schema.Boolean),
        folder: Schema.optional(Schema.String),
        guestOS: Schema.optional(Schema.String),
        guestOSType: Schema.optional(
          Schema.Literals(["linux", "windows", "other"]),
        ),
        nics: Schema.optional(
          Schema.Array(
            Schema.Struct({
              customization: Schema.optional(
                Schema.Struct({
                  allocation: Schema.optional(
                    Schema.Literals(["static", "dynamic"]),
                  ),
                  dnsServers: Schema.optional(Schema.Array(Schema.String)),
                  gateway: Schema.optional(Schema.Array(Schema.String)),
                  ipAddress: Schema.optional(Schema.String),
                  mask: Schema.optional(Schema.String),
                  primaryWinsServer: Schema.optional(Schema.String),
                  secondaryWinsServer: Schema.optional(Schema.String),
                }),
              ),
              ipAddresses: Schema.optional(Schema.Array(Schema.String)),
              macAddress: Schema.optional(Schema.String),
              network: Schema.Struct({
                assignable: Schema.optional(Schema.Boolean),
                id: Schema.String,
                location: Schema.optional(Schema.String),
                name: Schema.optional(Schema.String),
                properties: Schema.optional(
                  Schema.Struct({
                    privateCloudId: Schema.optional(Schema.String),
                  }),
                ),
                type: Schema.optional(Schema.String),
              }),
              nicType: Schema.Literals([
                "E1000",
                "E1000E",
                "PCNET32",
                "VMXNET",
                "VMXNET2",
                "VMXNET3",
              ]),
              powerOnBoot: Schema.optional(Schema.Boolean),
              virtualNicId: Schema.optional(Schema.String),
              virtualNicName: Schema.optional(Schema.String),
            }),
          ),
        ),
        numberOfCores: Schema.Number,
        password: Schema.optional(SensitiveString),
        privateCloudId: Schema.String,
        provisioningState: Schema.optional(Schema.String),
        publicIP: Schema.optional(Schema.String),
        resourcePool: Schema.optional(
          Schema.Struct({
            id: Schema.String,
            location: Schema.optional(Schema.String),
            name: Schema.optional(Schema.String),
            privateCloudId: Schema.optional(Schema.String),
            properties: Schema.optional(
              Schema.Struct({
                fullName: Schema.optional(Schema.String),
              }),
            ),
            type: Schema.optional(Schema.String),
          }),
        ),
        status: Schema.optional(
          Schema.Literals([
            "running",
            "suspended",
            "poweredoff",
            "updating",
            "deallocating",
            "deleting",
          ]),
        ),
        templateId: Schema.optional(Schema.String),
        username: Schema.optional(Schema.String),
        vSphereNetworks: Schema.optional(Schema.Array(Schema.String)),
        vmId: Schema.optional(Schema.String),
        vmwaretools: Schema.optional(Schema.String),
      }),
    ),
    tags: Schema.optional(Schema.Unknown),
    type: Schema.optional(Schema.String),
  });
export type VirtualMachinesGetOutput = typeof VirtualMachinesGetOutput.Type;

// The operation
/**
 * Implements virtual machine GET method
 *
 * Get virtual machine
 *
 * @param virtualMachineName - virtual machine name
 */
export const VirtualMachinesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: VirtualMachinesGetInput,
  outputSchema: VirtualMachinesGetOutput,
}));
// Input Schema
export const VirtualMachinesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    $filter: Schema.optional(Schema.String),
    $top: Schema.optional(Schema.Number),
    $skipToken: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VMwareCloudSimple/virtualMachines",
    }),
  );
export type VirtualMachinesListByResourceGroupInput =
  typeof VirtualMachinesListByResourceGroupInput.Type;

// Output Schema
export const VirtualMachinesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          location: Schema.String,
          name: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              amountOfRam: Schema.Number,
              controllers: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    id: Schema.optional(Schema.String),
                    name: Schema.optional(Schema.String),
                    subType: Schema.optional(Schema.String),
                    type: Schema.optional(Schema.String),
                  }),
                ),
              ),
              customization: Schema.optional(
                Schema.Struct({
                  dnsServers: Schema.optional(Schema.Array(Schema.String)),
                  hostName: Schema.optional(Schema.String),
                  password: Schema.optional(SensitiveString),
                  policyId: Schema.optional(Schema.String),
                  username: Schema.optional(Schema.String),
                }),
              ),
              disks: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    controllerId: Schema.String,
                    independenceMode: Schema.Literals([
                      "persistent",
                      "independent_persistent",
                      "independent_nonpersistent",
                    ]),
                    totalSize: Schema.Number,
                    virtualDiskId: Schema.optional(Schema.String),
                    virtualDiskName: Schema.optional(Schema.String),
                  }),
                ),
              ),
              dnsname: Schema.optional(Schema.String),
              exposeToGuestVM: Schema.optional(Schema.Boolean),
              folder: Schema.optional(Schema.String),
              guestOS: Schema.optional(Schema.String),
              guestOSType: Schema.optional(
                Schema.Literals(["linux", "windows", "other"]),
              ),
              nics: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    customization: Schema.optional(
                      Schema.Struct({
                        allocation: Schema.optional(
                          Schema.Literals(["static", "dynamic"]),
                        ),
                        dnsServers: Schema.optional(
                          Schema.Array(Schema.String),
                        ),
                        gateway: Schema.optional(Schema.Array(Schema.String)),
                        ipAddress: Schema.optional(Schema.String),
                        mask: Schema.optional(Schema.String),
                        primaryWinsServer: Schema.optional(Schema.String),
                        secondaryWinsServer: Schema.optional(Schema.String),
                      }),
                    ),
                    ipAddresses: Schema.optional(Schema.Array(Schema.String)),
                    macAddress: Schema.optional(Schema.String),
                    network: Schema.Struct({
                      assignable: Schema.optional(Schema.Boolean),
                      id: Schema.String,
                      location: Schema.optional(Schema.String),
                      name: Schema.optional(Schema.String),
                      properties: Schema.optional(
                        Schema.Struct({
                          privateCloudId: Schema.optional(Schema.String),
                        }),
                      ),
                      type: Schema.optional(Schema.String),
                    }),
                    nicType: Schema.Literals([
                      "E1000",
                      "E1000E",
                      "PCNET32",
                      "VMXNET",
                      "VMXNET2",
                      "VMXNET3",
                    ]),
                    powerOnBoot: Schema.optional(Schema.Boolean),
                    virtualNicId: Schema.optional(Schema.String),
                    virtualNicName: Schema.optional(Schema.String),
                  }),
                ),
              ),
              numberOfCores: Schema.Number,
              password: Schema.optional(SensitiveString),
              privateCloudId: Schema.String,
              provisioningState: Schema.optional(Schema.String),
              publicIP: Schema.optional(Schema.String),
              resourcePool: Schema.optional(
                Schema.Struct({
                  id: Schema.String,
                  location: Schema.optional(Schema.String),
                  name: Schema.optional(Schema.String),
                  privateCloudId: Schema.optional(Schema.String),
                  properties: Schema.optional(
                    Schema.Struct({
                      fullName: Schema.optional(Schema.String),
                    }),
                  ),
                  type: Schema.optional(Schema.String),
                }),
              ),
              status: Schema.optional(
                Schema.Literals([
                  "running",
                  "suspended",
                  "poweredoff",
                  "updating",
                  "deallocating",
                  "deleting",
                ]),
              ),
              templateId: Schema.optional(Schema.String),
              username: Schema.optional(Schema.String),
              vSphereNetworks: Schema.optional(Schema.Array(Schema.String)),
              vmId: Schema.optional(Schema.String),
              vmwaretools: Schema.optional(Schema.String),
            }),
          ),
          tags: Schema.optional(Schema.Unknown),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type VirtualMachinesListByResourceGroupOutput =
  typeof VirtualMachinesListByResourceGroupOutput.Type;

// The operation
/**
 * Implements list virtual machine within RG method
 *
 * Returns list of virtual machine within resource group
 *
 * @param $filter - The filter to apply on the list operation
 * @param $top - The maximum number of record sets to return
 * @param $skipToken - to be used by nextLink implementation
 */
export const VirtualMachinesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VirtualMachinesListByResourceGroupInput,
    outputSchema: VirtualMachinesListByResourceGroupOutput,
  }));
// Input Schema
export const VirtualMachinesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    $filter: Schema.optional(Schema.String),
    $top: Schema.optional(Schema.Number),
    $skipToken: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.VMwareCloudSimple/virtualMachines",
    }),
  );
export type VirtualMachinesListBySubscriptionInput =
  typeof VirtualMachinesListBySubscriptionInput.Type;

// Output Schema
export const VirtualMachinesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          location: Schema.String,
          name: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              amountOfRam: Schema.Number,
              controllers: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    id: Schema.optional(Schema.String),
                    name: Schema.optional(Schema.String),
                    subType: Schema.optional(Schema.String),
                    type: Schema.optional(Schema.String),
                  }),
                ),
              ),
              customization: Schema.optional(
                Schema.Struct({
                  dnsServers: Schema.optional(Schema.Array(Schema.String)),
                  hostName: Schema.optional(Schema.String),
                  password: Schema.optional(SensitiveString),
                  policyId: Schema.optional(Schema.String),
                  username: Schema.optional(Schema.String),
                }),
              ),
              disks: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    controllerId: Schema.String,
                    independenceMode: Schema.Literals([
                      "persistent",
                      "independent_persistent",
                      "independent_nonpersistent",
                    ]),
                    totalSize: Schema.Number,
                    virtualDiskId: Schema.optional(Schema.String),
                    virtualDiskName: Schema.optional(Schema.String),
                  }),
                ),
              ),
              dnsname: Schema.optional(Schema.String),
              exposeToGuestVM: Schema.optional(Schema.Boolean),
              folder: Schema.optional(Schema.String),
              guestOS: Schema.optional(Schema.String),
              guestOSType: Schema.optional(
                Schema.Literals(["linux", "windows", "other"]),
              ),
              nics: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    customization: Schema.optional(
                      Schema.Struct({
                        allocation: Schema.optional(
                          Schema.Literals(["static", "dynamic"]),
                        ),
                        dnsServers: Schema.optional(
                          Schema.Array(Schema.String),
                        ),
                        gateway: Schema.optional(Schema.Array(Schema.String)),
                        ipAddress: Schema.optional(Schema.String),
                        mask: Schema.optional(Schema.String),
                        primaryWinsServer: Schema.optional(Schema.String),
                        secondaryWinsServer: Schema.optional(Schema.String),
                      }),
                    ),
                    ipAddresses: Schema.optional(Schema.Array(Schema.String)),
                    macAddress: Schema.optional(Schema.String),
                    network: Schema.Struct({
                      assignable: Schema.optional(Schema.Boolean),
                      id: Schema.String,
                      location: Schema.optional(Schema.String),
                      name: Schema.optional(Schema.String),
                      properties: Schema.optional(
                        Schema.Struct({
                          privateCloudId: Schema.optional(Schema.String),
                        }),
                      ),
                      type: Schema.optional(Schema.String),
                    }),
                    nicType: Schema.Literals([
                      "E1000",
                      "E1000E",
                      "PCNET32",
                      "VMXNET",
                      "VMXNET2",
                      "VMXNET3",
                    ]),
                    powerOnBoot: Schema.optional(Schema.Boolean),
                    virtualNicId: Schema.optional(Schema.String),
                    virtualNicName: Schema.optional(Schema.String),
                  }),
                ),
              ),
              numberOfCores: Schema.Number,
              password: Schema.optional(SensitiveString),
              privateCloudId: Schema.String,
              provisioningState: Schema.optional(Schema.String),
              publicIP: Schema.optional(Schema.String),
              resourcePool: Schema.optional(
                Schema.Struct({
                  id: Schema.String,
                  location: Schema.optional(Schema.String),
                  name: Schema.optional(Schema.String),
                  privateCloudId: Schema.optional(Schema.String),
                  properties: Schema.optional(
                    Schema.Struct({
                      fullName: Schema.optional(Schema.String),
                    }),
                  ),
                  type: Schema.optional(Schema.String),
                }),
              ),
              status: Schema.optional(
                Schema.Literals([
                  "running",
                  "suspended",
                  "poweredoff",
                  "updating",
                  "deallocating",
                  "deleting",
                ]),
              ),
              templateId: Schema.optional(Schema.String),
              username: Schema.optional(Schema.String),
              vSphereNetworks: Schema.optional(Schema.Array(Schema.String)),
              vmId: Schema.optional(Schema.String),
              vmwaretools: Schema.optional(Schema.String),
            }),
          ),
          tags: Schema.optional(Schema.Unknown),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type VirtualMachinesListBySubscriptionOutput =
  typeof VirtualMachinesListBySubscriptionOutput.Type;

// The operation
/**
 * Implements list virtual machine within subscription method
 *
 * Returns list virtual machine within subscription
 *
 * @param $filter - The filter to apply on the list operation
 * @param $top - The maximum number of record sets to return
 * @param $skipToken - to be used by nextLink implementation
 */
export const VirtualMachinesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VirtualMachinesListBySubscriptionInput,
    outputSchema: VirtualMachinesListBySubscriptionOutput,
  }));
// Input Schema
export const VirtualMachinesStartInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    virtualMachineName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VMwareCloudSimple/virtualMachines/{virtualMachineName}/start",
    }),
  );
export type VirtualMachinesStartInput = typeof VirtualMachinesStartInput.Type;

// Output Schema
export const VirtualMachinesStartOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type VirtualMachinesStartOutput = typeof VirtualMachinesStartOutput.Type;

// The operation
/**
 * Implements a start method for a virtual machine
 *
 * Power on virtual machine
 *
 * @param virtualMachineName - virtual machine name
 */
export const VirtualMachinesStart = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VirtualMachinesStartInput,
    outputSchema: VirtualMachinesStartOutput,
  }),
);
// Input Schema
export const VirtualMachinesStopInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    virtualMachineName: Schema.String.pipe(T.PathParam()),
    mode: Schema.optional(
      Schema.Literals(["reboot", "suspend", "shutdown", "poweroff"]),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VMwareCloudSimple/virtualMachines/{virtualMachineName}/stop",
    }),
  );
export type VirtualMachinesStopInput = typeof VirtualMachinesStopInput.Type;

// Output Schema
export const VirtualMachinesStopOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type VirtualMachinesStopOutput = typeof VirtualMachinesStopOutput.Type;

// The operation
/**
 * Implements shutdown, poweroff, and suspend method for a virtual machine
 *
 * Power off virtual machine, options: shutdown, poweroff, and suspend
 *
 * @param virtualMachineName - virtual machine name
 * @param mode - query stop mode parameter (reboot, shutdown, etc...)
 */
export const VirtualMachinesStop = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: VirtualMachinesStopInput,
  outputSchema: VirtualMachinesStopOutput,
}));
// Input Schema
export const VirtualMachinesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    virtualMachineName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VMwareCloudSimple/virtualMachines/{virtualMachineName}",
    }),
  );
export type VirtualMachinesUpdateInput = typeof VirtualMachinesUpdateInput.Type;

// Output Schema
export const VirtualMachinesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    location: Schema.String,
    name: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        amountOfRam: Schema.Number,
        controllers: Schema.optional(
          Schema.Array(
            Schema.Struct({
              id: Schema.optional(Schema.String),
              name: Schema.optional(Schema.String),
              subType: Schema.optional(Schema.String),
              type: Schema.optional(Schema.String),
            }),
          ),
        ),
        customization: Schema.optional(
          Schema.Struct({
            dnsServers: Schema.optional(Schema.Array(Schema.String)),
            hostName: Schema.optional(Schema.String),
            password: Schema.optional(SensitiveString),
            policyId: Schema.optional(Schema.String),
            username: Schema.optional(Schema.String),
          }),
        ),
        disks: Schema.optional(
          Schema.Array(
            Schema.Struct({
              controllerId: Schema.String,
              independenceMode: Schema.Literals([
                "persistent",
                "independent_persistent",
                "independent_nonpersistent",
              ]),
              totalSize: Schema.Number,
              virtualDiskId: Schema.optional(Schema.String),
              virtualDiskName: Schema.optional(Schema.String),
            }),
          ),
        ),
        dnsname: Schema.optional(Schema.String),
        exposeToGuestVM: Schema.optional(Schema.Boolean),
        folder: Schema.optional(Schema.String),
        guestOS: Schema.optional(Schema.String),
        guestOSType: Schema.optional(
          Schema.Literals(["linux", "windows", "other"]),
        ),
        nics: Schema.optional(
          Schema.Array(
            Schema.Struct({
              customization: Schema.optional(
                Schema.Struct({
                  allocation: Schema.optional(
                    Schema.Literals(["static", "dynamic"]),
                  ),
                  dnsServers: Schema.optional(Schema.Array(Schema.String)),
                  gateway: Schema.optional(Schema.Array(Schema.String)),
                  ipAddress: Schema.optional(Schema.String),
                  mask: Schema.optional(Schema.String),
                  primaryWinsServer: Schema.optional(Schema.String),
                  secondaryWinsServer: Schema.optional(Schema.String),
                }),
              ),
              ipAddresses: Schema.optional(Schema.Array(Schema.String)),
              macAddress: Schema.optional(Schema.String),
              network: Schema.Struct({
                assignable: Schema.optional(Schema.Boolean),
                id: Schema.String,
                location: Schema.optional(Schema.String),
                name: Schema.optional(Schema.String),
                properties: Schema.optional(
                  Schema.Struct({
                    privateCloudId: Schema.optional(Schema.String),
                  }),
                ),
                type: Schema.optional(Schema.String),
              }),
              nicType: Schema.Literals([
                "E1000",
                "E1000E",
                "PCNET32",
                "VMXNET",
                "VMXNET2",
                "VMXNET3",
              ]),
              powerOnBoot: Schema.optional(Schema.Boolean),
              virtualNicId: Schema.optional(Schema.String),
              virtualNicName: Schema.optional(Schema.String),
            }),
          ),
        ),
        numberOfCores: Schema.Number,
        password: Schema.optional(SensitiveString),
        privateCloudId: Schema.String,
        provisioningState: Schema.optional(Schema.String),
        publicIP: Schema.optional(Schema.String),
        resourcePool: Schema.optional(
          Schema.Struct({
            id: Schema.String,
            location: Schema.optional(Schema.String),
            name: Schema.optional(Schema.String),
            privateCloudId: Schema.optional(Schema.String),
            properties: Schema.optional(
              Schema.Struct({
                fullName: Schema.optional(Schema.String),
              }),
            ),
            type: Schema.optional(Schema.String),
          }),
        ),
        status: Schema.optional(
          Schema.Literals([
            "running",
            "suspended",
            "poweredoff",
            "updating",
            "deallocating",
            "deleting",
          ]),
        ),
        templateId: Schema.optional(Schema.String),
        username: Schema.optional(Schema.String),
        vSphereNetworks: Schema.optional(Schema.Array(Schema.String)),
        vmId: Schema.optional(Schema.String),
        vmwaretools: Schema.optional(Schema.String),
      }),
    ),
    tags: Schema.optional(Schema.Unknown),
    type: Schema.optional(Schema.String),
  });
export type VirtualMachinesUpdateOutput =
  typeof VirtualMachinesUpdateOutput.Type;

// The operation
/**
 * Implements virtual machine PATCH method
 *
 * Patch virtual machine properties
 *
 * @param virtualMachineName - virtual machine name
 */
export const VirtualMachinesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VirtualMachinesUpdateInput,
    outputSchema: VirtualMachinesUpdateOutput,
  }),
);
// Input Schema
export const VirtualMachineTemplatesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    virtualMachineTemplateName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.VMwareCloudSimple/locations/{regionId}/privateClouds/{pcName}/virtualMachineTemplates/{virtualMachineTemplateName}",
    }),
  );
export type VirtualMachineTemplatesGetInput =
  typeof VirtualMachineTemplatesGetInput.Type;

// Output Schema
export const VirtualMachineTemplatesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        amountOfRam: Schema.optional(Schema.Number),
        controllers: Schema.optional(
          Schema.Array(
            Schema.Struct({
              id: Schema.optional(Schema.String),
              name: Schema.optional(Schema.String),
              subType: Schema.optional(Schema.String),
              type: Schema.optional(Schema.String),
            }),
          ),
        ),
        description: Schema.optional(Schema.String),
        disks: Schema.optional(
          Schema.Array(
            Schema.Struct({
              controllerId: Schema.String,
              independenceMode: Schema.Literals([
                "persistent",
                "independent_persistent",
                "independent_nonpersistent",
              ]),
              totalSize: Schema.Number,
              virtualDiskId: Schema.optional(Schema.String),
              virtualDiskName: Schema.optional(Schema.String),
            }),
          ),
        ),
        exposeToGuestVM: Schema.optional(Schema.Boolean),
        guestOS: Schema.optional(Schema.String),
        guestOSType: Schema.optional(Schema.String),
        nics: Schema.optional(
          Schema.Array(
            Schema.Struct({
              customization: Schema.optional(
                Schema.Struct({
                  allocation: Schema.optional(
                    Schema.Literals(["static", "dynamic"]),
                  ),
                  dnsServers: Schema.optional(Schema.Array(Schema.String)),
                  gateway: Schema.optional(Schema.Array(Schema.String)),
                  ipAddress: Schema.optional(Schema.String),
                  mask: Schema.optional(Schema.String),
                  primaryWinsServer: Schema.optional(Schema.String),
                  secondaryWinsServer: Schema.optional(Schema.String),
                }),
              ),
              ipAddresses: Schema.optional(Schema.Array(Schema.String)),
              macAddress: Schema.optional(Schema.String),
              network: Schema.Struct({
                assignable: Schema.optional(Schema.Boolean),
                id: Schema.String,
                location: Schema.optional(Schema.String),
                name: Schema.optional(Schema.String),
                properties: Schema.optional(
                  Schema.Struct({
                    privateCloudId: Schema.optional(Schema.String),
                  }),
                ),
                type: Schema.optional(Schema.String),
              }),
              nicType: Schema.Literals([
                "E1000",
                "E1000E",
                "PCNET32",
                "VMXNET",
                "VMXNET2",
                "VMXNET3",
              ]),
              powerOnBoot: Schema.optional(Schema.Boolean),
              virtualNicId: Schema.optional(Schema.String),
              virtualNicName: Schema.optional(Schema.String),
            }),
          ),
        ),
        numberOfCores: Schema.optional(Schema.Number),
        path: Schema.optional(Schema.String),
        privateCloudId: Schema.String,
        vSphereNetworks: Schema.optional(Schema.Array(Schema.String)),
        vSphereTags: Schema.optional(Schema.Array(Schema.String)),
        vmwaretools: Schema.optional(Schema.String),
      }),
    ),
    type: Schema.optional(Schema.String),
  });
export type VirtualMachineTemplatesGetOutput =
  typeof VirtualMachineTemplatesGetOutput.Type;

// The operation
/**
 * Implements virtual machine template GET method
 *
 * Returns virtual machine templates by its name
 *
 * @param virtualMachineTemplateName - virtual machine template id (vsphereId)
 */
export const VirtualMachineTemplatesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VirtualMachineTemplatesGetInput,
    outputSchema: VirtualMachineTemplatesGetOutput,
  }),
);
// Input Schema
export const VirtualMachineTemplatesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourcePoolName: Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.VMwareCloudSimple/locations/{regionId}/privateClouds/{pcName}/virtualMachineTemplates",
    }),
  );
export type VirtualMachineTemplatesListInput =
  typeof VirtualMachineTemplatesListInput.Type;

// Output Schema
export const VirtualMachineTemplatesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              amountOfRam: Schema.optional(Schema.Number),
              controllers: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    id: Schema.optional(Schema.String),
                    name: Schema.optional(Schema.String),
                    subType: Schema.optional(Schema.String),
                    type: Schema.optional(Schema.String),
                  }),
                ),
              ),
              description: Schema.optional(Schema.String),
              disks: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    controllerId: Schema.String,
                    independenceMode: Schema.Literals([
                      "persistent",
                      "independent_persistent",
                      "independent_nonpersistent",
                    ]),
                    totalSize: Schema.Number,
                    virtualDiskId: Schema.optional(Schema.String),
                    virtualDiskName: Schema.optional(Schema.String),
                  }),
                ),
              ),
              exposeToGuestVM: Schema.optional(Schema.Boolean),
              guestOS: Schema.optional(Schema.String),
              guestOSType: Schema.optional(Schema.String),
              nics: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    customization: Schema.optional(
                      Schema.Struct({
                        allocation: Schema.optional(
                          Schema.Literals(["static", "dynamic"]),
                        ),
                        dnsServers: Schema.optional(
                          Schema.Array(Schema.String),
                        ),
                        gateway: Schema.optional(Schema.Array(Schema.String)),
                        ipAddress: Schema.optional(Schema.String),
                        mask: Schema.optional(Schema.String),
                        primaryWinsServer: Schema.optional(Schema.String),
                        secondaryWinsServer: Schema.optional(Schema.String),
                      }),
                    ),
                    ipAddresses: Schema.optional(Schema.Array(Schema.String)),
                    macAddress: Schema.optional(Schema.String),
                    network: Schema.Struct({
                      assignable: Schema.optional(Schema.Boolean),
                      id: Schema.String,
                      location: Schema.optional(Schema.String),
                      name: Schema.optional(Schema.String),
                      properties: Schema.optional(
                        Schema.Struct({
                          privateCloudId: Schema.optional(Schema.String),
                        }),
                      ),
                      type: Schema.optional(Schema.String),
                    }),
                    nicType: Schema.Literals([
                      "E1000",
                      "E1000E",
                      "PCNET32",
                      "VMXNET",
                      "VMXNET2",
                      "VMXNET3",
                    ]),
                    powerOnBoot: Schema.optional(Schema.Boolean),
                    virtualNicId: Schema.optional(Schema.String),
                    virtualNicName: Schema.optional(Schema.String),
                  }),
                ),
              ),
              numberOfCores: Schema.optional(Schema.Number),
              path: Schema.optional(Schema.String),
              privateCloudId: Schema.String,
              vSphereNetworks: Schema.optional(Schema.Array(Schema.String)),
              vSphereTags: Schema.optional(Schema.Array(Schema.String)),
              vmwaretools: Schema.optional(Schema.String),
            }),
          ),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type VirtualMachineTemplatesListOutput =
  typeof VirtualMachineTemplatesListOutput.Type;

// The operation
/**
 * Implements list of available VM templates
 *
 * Returns list of virtual machine templates in region for private cloud
 *
 * @param resourcePoolName - Resource pool used to derive vSphere cluster which contains VM templates
 */
export const VirtualMachineTemplatesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VirtualMachineTemplatesListInput,
    outputSchema: VirtualMachineTemplatesListOutput,
  }),
);
// Input Schema
export const VirtualNetworksGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    virtualNetworkName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.VMwareCloudSimple/locations/{regionId}/privateClouds/{pcName}/virtualNetworks/{virtualNetworkName}",
    }),
  );
export type VirtualNetworksGetInput = typeof VirtualNetworksGetInput.Type;

// Output Schema
export const VirtualNetworksGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    assignable: Schema.optional(Schema.Boolean),
    id: Schema.String,
    location: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        privateCloudId: Schema.optional(Schema.String),
      }),
    ),
    type: Schema.optional(Schema.String),
  });
export type VirtualNetworksGetOutput = typeof VirtualNetworksGetOutput.Type;

// The operation
/**
 * Implements virtual network GET method
 *
 * Return virtual network by its name
 *
 * @param virtualNetworkName - virtual network id (vsphereId)
 */
export const VirtualNetworksGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: VirtualNetworksGetInput,
  outputSchema: VirtualNetworksGetOutput,
}));
// Input Schema
export const VirtualNetworksListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourcePoolName: Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.VMwareCloudSimple/locations/{regionId}/privateClouds/{pcName}/virtualNetworks",
    }),
  );
export type VirtualNetworksListInput = typeof VirtualNetworksListInput.Type;

// Output Schema
export const VirtualNetworksListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          assignable: Schema.optional(Schema.Boolean),
          id: Schema.String,
          location: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              privateCloudId: Schema.optional(Schema.String),
            }),
          ),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type VirtualNetworksListOutput = typeof VirtualNetworksListOutput.Type;

// The operation
/**
 * Implements list available virtual networks within a subscription method
 *
 * Return list of virtual networks in location for private cloud
 *
 * @param resourcePoolName - Resource pool used to derive vSphere cluster which contains virtual networks
 */
export const VirtualNetworksList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: VirtualNetworksListInput,
  outputSchema: VirtualNetworksListOutput,
}));
