/**
 * Azure Voiceservices API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const CommunicationsGatewaysCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    communicationsGatewayName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VoiceServices/communicationsGateways/{communicationsGatewayName}",
    }),
  );
export type CommunicationsGatewaysCreateOrUpdateInput =
  typeof CommunicationsGatewaysCreateOrUpdateInput.Type;

// Output Schema
export const CommunicationsGatewaysCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type CommunicationsGatewaysCreateOrUpdateOutput =
  typeof CommunicationsGatewaysCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a CommunicationsGateway
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param communicationsGatewayName - Unique identifier for this deployment
 */
export const CommunicationsGatewaysCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CommunicationsGatewaysCreateOrUpdateInput,
    outputSchema: CommunicationsGatewaysCreateOrUpdateOutput,
  }));
// Input Schema
export const CommunicationsGatewaysDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    communicationsGatewayName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VoiceServices/communicationsGateways/{communicationsGatewayName}",
    }),
  );
export type CommunicationsGatewaysDeleteInput =
  typeof CommunicationsGatewaysDeleteInput.Type;

// Output Schema
export const CommunicationsGatewaysDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CommunicationsGatewaysDeleteOutput =
  typeof CommunicationsGatewaysDeleteOutput.Type;

// The operation
/**
 * Delete a CommunicationsGateway
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param communicationsGatewayName - Unique identifier for this deployment
 */
export const CommunicationsGatewaysDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CommunicationsGatewaysDeleteInput,
    outputSchema: CommunicationsGatewaysDeleteOutput,
  }));
// Input Schema
export const CommunicationsGatewaysGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    communicationsGatewayName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VoiceServices/communicationsGateways/{communicationsGatewayName}",
    }),
  );
export type CommunicationsGatewaysGetInput =
  typeof CommunicationsGatewaysGetInput.Type;

// Output Schema
export const CommunicationsGatewaysGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type CommunicationsGatewaysGetOutput =
  typeof CommunicationsGatewaysGetOutput.Type;

// The operation
/**
 * Get a CommunicationsGateway
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param communicationsGatewayName - Unique identifier for this deployment
 */
export const CommunicationsGatewaysGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CommunicationsGatewaysGetInput,
    outputSchema: CommunicationsGatewaysGetOutput,
  }),
);
// Input Schema
export const CommunicationsGatewaysListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VoiceServices/communicationsGateways",
    }),
  );
export type CommunicationsGatewaysListByResourceGroupInput =
  typeof CommunicationsGatewaysListByResourceGroupInput.Type;

// Output Schema
export const CommunicationsGatewaysListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type CommunicationsGatewaysListByResourceGroupOutput =
  typeof CommunicationsGatewaysListByResourceGroupOutput.Type;

// The operation
/**
 * List CommunicationsGateway resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const CommunicationsGatewaysListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CommunicationsGatewaysListByResourceGroupInput,
    outputSchema: CommunicationsGatewaysListByResourceGroupOutput,
  }));
// Input Schema
export const CommunicationsGatewaysListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.VoiceServices/communicationsGateways",
    }),
  );
export type CommunicationsGatewaysListBySubscriptionInput =
  typeof CommunicationsGatewaysListBySubscriptionInput.Type;

// Output Schema
export const CommunicationsGatewaysListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type CommunicationsGatewaysListBySubscriptionOutput =
  typeof CommunicationsGatewaysListBySubscriptionOutput.Type;

// The operation
/**
 * List CommunicationsGateway resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const CommunicationsGatewaysListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CommunicationsGatewaysListBySubscriptionInput,
    outputSchema: CommunicationsGatewaysListBySubscriptionOutput,
  }));
// Input Schema
export const CommunicationsGatewaysUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    communicationsGatewayName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VoiceServices/communicationsGateways/{communicationsGatewayName}",
    }),
  );
export type CommunicationsGatewaysUpdateInput =
  typeof CommunicationsGatewaysUpdateInput.Type;

// Output Schema
export const CommunicationsGatewaysUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type CommunicationsGatewaysUpdateOutput =
  typeof CommunicationsGatewaysUpdateOutput.Type;

// The operation
/**
 * Update a CommunicationsGateway
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param communicationsGatewayName - Unique identifier for this deployment
 */
export const CommunicationsGatewaysUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CommunicationsGatewaysUpdateInput,
    outputSchema: CommunicationsGatewaysUpdateOutput,
  }));
// Input Schema
export const NameAvailabilityCheckLocalInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.VoiceServices/locations/{location}/checkNameAvailability",
    }),
  );
export type NameAvailabilityCheckLocalInput =
  typeof NameAvailabilityCheckLocalInput.Type;

// Output Schema
export const NameAvailabilityCheckLocalOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.Literals(["Invalid", "AlreadyExists"])),
    message: Schema.optional(Schema.String),
  });
export type NameAvailabilityCheckLocalOutput =
  typeof NameAvailabilityCheckLocalOutput.Type;

// The operation
/**
 * Check whether the resource name is available in the given region.
 *
 * @param location - The location in which uniqueness will be verified.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const NameAvailabilityCheckLocal = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NameAvailabilityCheckLocalInput,
    outputSchema: NameAvailabilityCheckLocalOutput,
  }),
);
// Input Schema
export const TestLinesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    communicationsGatewayName: Schema.String.pipe(T.PathParam()),
    testLineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VoiceServices/communicationsGateways/{communicationsGatewayName}/testLines/{testLineName}",
    }),
  );
export type TestLinesCreateOrUpdateInput =
  typeof TestLinesCreateOrUpdateInput.Type;

// Output Schema
export const TestLinesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type TestLinesCreateOrUpdateOutput =
  typeof TestLinesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a TestLine
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param communicationsGatewayName - Unique identifier for this deployment
 * @param testLineName - Unique identifier for this test line
 */
export const TestLinesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TestLinesCreateOrUpdateInput,
    outputSchema: TestLinesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const TestLinesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  communicationsGatewayName: Schema.String.pipe(T.PathParam()),
  testLineName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VoiceServices/communicationsGateways/{communicationsGatewayName}/testLines/{testLineName}",
  }),
);
export type TestLinesDeleteInput = typeof TestLinesDeleteInput.Type;

// Output Schema
export const TestLinesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type TestLinesDeleteOutput = typeof TestLinesDeleteOutput.Type;

// The operation
/**
 * Delete a TestLine
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param communicationsGatewayName - Unique identifier for this deployment
 * @param testLineName - Unique identifier for this test line
 */
export const TestLinesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TestLinesDeleteInput,
  outputSchema: TestLinesDeleteOutput,
}));
// Input Schema
export const TestLinesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  communicationsGatewayName: Schema.String.pipe(T.PathParam()),
  testLineName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VoiceServices/communicationsGateways/{communicationsGatewayName}/testLines/{testLineName}",
  }),
);
export type TestLinesGetInput = typeof TestLinesGetInput.Type;

// Output Schema
export const TestLinesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type TestLinesGetOutput = typeof TestLinesGetOutput.Type;

// The operation
/**
 * Get a TestLine
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param communicationsGatewayName - Unique identifier for this deployment
 * @param testLineName - Unique identifier for this test line
 */
export const TestLinesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TestLinesGetInput,
  outputSchema: TestLinesGetOutput,
}));
// Input Schema
export const TestLinesListByCommunicationsGatewayInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    communicationsGatewayName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VoiceServices/communicationsGateways/{communicationsGatewayName}/testLines",
    }),
  );
export type TestLinesListByCommunicationsGatewayInput =
  typeof TestLinesListByCommunicationsGatewayInput.Type;

// Output Schema
export const TestLinesListByCommunicationsGatewayOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type TestLinesListByCommunicationsGatewayOutput =
  typeof TestLinesListByCommunicationsGatewayOutput.Type;

// The operation
/**
 * List TestLine resources by CommunicationsGateway
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param communicationsGatewayName - Unique identifier for this deployment
 */
export const TestLinesListByCommunicationsGateway =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TestLinesListByCommunicationsGatewayInput,
    outputSchema: TestLinesListByCommunicationsGatewayOutput,
  }));
// Input Schema
export const TestLinesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  communicationsGatewayName: Schema.String.pipe(T.PathParam()),
  testLineName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VoiceServices/communicationsGateways/{communicationsGatewayName}/testLines/{testLineName}",
  }),
);
export type TestLinesUpdateInput = typeof TestLinesUpdateInput.Type;

// Output Schema
export const TestLinesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type TestLinesUpdateOutput = typeof TestLinesUpdateOutput.Type;

// The operation
/**
 * Update a TestLine
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param communicationsGatewayName - Unique identifier for this deployment
 * @param testLineName - Unique identifier for this test line
 */
export const TestLinesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TestLinesUpdateInput,
  outputSchema: TestLinesUpdateOutput,
}));
