/**
 * Azure Kubernetesruntime API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const BgpPeersCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    bgpPeerName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/{resourceUri}/providers/Microsoft.KubernetesRuntime/bgpPeers/{bgpPeerName}",
    }),
  );
export type BgpPeersCreateOrUpdateInput =
  typeof BgpPeersCreateOrUpdateInput.Type;

// Output Schema
export const BgpPeersCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type BgpPeersCreateOrUpdateOutput =
  typeof BgpPeersCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a BgpPeer
 *
 * @param api-version - The API version to use for this operation.
 * @param bgpPeerName - The name of the BgpPeer
 */
export const BgpPeersCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BgpPeersCreateOrUpdateInput,
    outputSchema: BgpPeersCreateOrUpdateOutput,
  }),
);
// Input Schema
export const BgpPeersDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  bgpPeerName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/{resourceUri}/providers/Microsoft.KubernetesRuntime/bgpPeers/{bgpPeerName}",
  }),
);
export type BgpPeersDeleteInput = typeof BgpPeersDeleteInput.Type;

// Output Schema
export const BgpPeersDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type BgpPeersDeleteOutput = typeof BgpPeersDeleteOutput.Type;

// The operation
/**
 * Delete a BgpPeer
 *
 * @param api-version - The API version to use for this operation.
 * @param bgpPeerName - The name of the BgpPeer
 */
export const BgpPeersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BgpPeersDeleteInput,
  outputSchema: BgpPeersDeleteOutput,
}));
// Input Schema
export const BgpPeersGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  bgpPeerName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/{resourceUri}/providers/Microsoft.KubernetesRuntime/bgpPeers/{bgpPeerName}",
  }),
);
export type BgpPeersGetInput = typeof BgpPeersGetInput.Type;

// Output Schema
export const BgpPeersGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type BgpPeersGetOutput = typeof BgpPeersGetOutput.Type;

// The operation
/**
 * Get a BgpPeer
 *
 * @param api-version - The API version to use for this operation.
 * @param bgpPeerName - The name of the BgpPeer
 */
export const BgpPeersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BgpPeersGetInput,
  outputSchema: BgpPeersGetOutput,
}));
// Input Schema
export const BgpPeersListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/{resourceUri}/providers/Microsoft.KubernetesRuntime/bgpPeers",
  }),
);
export type BgpPeersListInput = typeof BgpPeersListInput.Type;

// Output Schema
export const BgpPeersListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type BgpPeersListOutput = typeof BgpPeersListOutput.Type;

// The operation
/**
 * List BgpPeer resources by parent
 *
 * @param api-version - The API version to use for this operation.
 */
export const BgpPeersList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BgpPeersListInput,
  outputSchema: BgpPeersListOutput,
}));
// Input Schema
export const LoadBalancersCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    loadBalancerName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/{resourceUri}/providers/Microsoft.KubernetesRuntime/loadBalancers/{loadBalancerName}",
    }),
  );
export type LoadBalancersCreateOrUpdateInput =
  typeof LoadBalancersCreateOrUpdateInput.Type;

// Output Schema
export const LoadBalancersCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type LoadBalancersCreateOrUpdateOutput =
  typeof LoadBalancersCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a LoadBalancer
 *
 * @param api-version - The API version to use for this operation.
 * @param loadBalancerName - The name of the LoadBalancer
 */
export const LoadBalancersCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LoadBalancersCreateOrUpdateInput,
    outputSchema: LoadBalancersCreateOrUpdateOutput,
  }),
);
// Input Schema
export const LoadBalancersDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    loadBalancerName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/{resourceUri}/providers/Microsoft.KubernetesRuntime/loadBalancers/{loadBalancerName}",
    }),
  );
export type LoadBalancersDeleteInput = typeof LoadBalancersDeleteInput.Type;

// Output Schema
export const LoadBalancersDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type LoadBalancersDeleteOutput = typeof LoadBalancersDeleteOutput.Type;

// The operation
/**
 * Delete a LoadBalancer
 *
 * @param api-version - The API version to use for this operation.
 * @param loadBalancerName - The name of the LoadBalancer
 */
export const LoadBalancersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LoadBalancersDeleteInput,
  outputSchema: LoadBalancersDeleteOutput,
}));
// Input Schema
export const LoadBalancersGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  loadBalancerName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/{resourceUri}/providers/Microsoft.KubernetesRuntime/loadBalancers/{loadBalancerName}",
  }),
);
export type LoadBalancersGetInput = typeof LoadBalancersGetInput.Type;

// Output Schema
export const LoadBalancersGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type LoadBalancersGetOutput = typeof LoadBalancersGetOutput.Type;

// The operation
/**
 * Get a LoadBalancer
 *
 * @param api-version - The API version to use for this operation.
 * @param loadBalancerName - The name of the LoadBalancer
 */
export const LoadBalancersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LoadBalancersGetInput,
  outputSchema: LoadBalancersGetOutput,
}));
// Input Schema
export const LoadBalancersListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/{resourceUri}/providers/Microsoft.KubernetesRuntime/loadBalancers",
  }),
);
export type LoadBalancersListInput = typeof LoadBalancersListInput.Type;

// Output Schema
export const LoadBalancersListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type LoadBalancersListOutput = typeof LoadBalancersListOutput.Type;

// The operation
/**
 * List LoadBalancer resources by parent
 *
 * @param api-version - The API version to use for this operation.
 */
export const LoadBalancersList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LoadBalancersListInput,
  outputSchema: LoadBalancersListOutput,
}));
// Input Schema
export const ServicesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/{resourceUri}/providers/Microsoft.KubernetesRuntime/services/{serviceName}",
    }),
  );
export type ServicesCreateOrUpdateInput =
  typeof ServicesCreateOrUpdateInput.Type;

// Output Schema
export const ServicesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ServicesCreateOrUpdateOutput =
  typeof ServicesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a ServiceResource
 *
 * @param api-version - The API version to use for this operation.
 * @param serviceName - The name of the the service
 */
export const ServicesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServicesCreateOrUpdateInput,
    outputSchema: ServicesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ServicesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  serviceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/{resourceUri}/providers/Microsoft.KubernetesRuntime/services/{serviceName}",
  }),
);
export type ServicesDeleteInput = typeof ServicesDeleteInput.Type;

// Output Schema
export const ServicesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServicesDeleteOutput = typeof ServicesDeleteOutput.Type;

// The operation
/**
 * Delete a ServiceResource
 *
 * @param api-version - The API version to use for this operation.
 * @param serviceName - The name of the the service
 */
export const ServicesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServicesDeleteInput,
  outputSchema: ServicesDeleteOutput,
}));
// Input Schema
export const ServicesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  serviceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/{resourceUri}/providers/Microsoft.KubernetesRuntime/services/{serviceName}",
  }),
);
export type ServicesGetInput = typeof ServicesGetInput.Type;

// Output Schema
export const ServicesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ServicesGetOutput = typeof ServicesGetOutput.Type;

// The operation
/**
 * Get a ServiceResource
 *
 * @param api-version - The API version to use for this operation.
 * @param serviceName - The name of the the service
 */
export const ServicesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServicesGetInput,
  outputSchema: ServicesGetOutput,
}));
// Input Schema
export const ServicesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/{resourceUri}/providers/Microsoft.KubernetesRuntime/services",
  }),
);
export type ServicesListInput = typeof ServicesListInput.Type;

// Output Schema
export const ServicesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type ServicesListOutput = typeof ServicesListOutput.Type;

// The operation
/**
 * List ServiceResource resources by parent
 *
 * @param api-version - The API version to use for this operation.
 */
export const ServicesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServicesListInput,
  outputSchema: ServicesListOutput,
}));
// Input Schema
export const StorageClassCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    storageClassName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/{resourceUri}/providers/Microsoft.KubernetesRuntime/storageClasses/{storageClassName}",
    }),
  );
export type StorageClassCreateOrUpdateInput =
  typeof StorageClassCreateOrUpdateInput.Type;

// Output Schema
export const StorageClassCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type StorageClassCreateOrUpdateOutput =
  typeof StorageClassCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a StorageClassResource
 *
 * @param api-version - The API version to use for this operation.
 * @param storageClassName - The name of the the storage class
 */
export const StorageClassCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: StorageClassCreateOrUpdateInput,
    outputSchema: StorageClassCreateOrUpdateOutput,
  }),
);
// Input Schema
export const StorageClassDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    storageClassName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/{resourceUri}/providers/Microsoft.KubernetesRuntime/storageClasses/{storageClassName}",
    }),
  );
export type StorageClassDeleteInput = typeof StorageClassDeleteInput.Type;

// Output Schema
export const StorageClassDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type StorageClassDeleteOutput = typeof StorageClassDeleteOutput.Type;

// The operation
/**
 * Delete a StorageClassResource
 *
 * @param api-version - The API version to use for this operation.
 * @param storageClassName - The name of the the storage class
 */
export const StorageClassDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: StorageClassDeleteInput,
  outputSchema: StorageClassDeleteOutput,
}));
// Input Schema
export const StorageClassGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  storageClassName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/{resourceUri}/providers/Microsoft.KubernetesRuntime/storageClasses/{storageClassName}",
  }),
);
export type StorageClassGetInput = typeof StorageClassGetInput.Type;

// Output Schema
export const StorageClassGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type StorageClassGetOutput = typeof StorageClassGetOutput.Type;

// The operation
/**
 * Get a StorageClassResource
 *
 * @param api-version - The API version to use for this operation.
 * @param storageClassName - The name of the the storage class
 */
export const StorageClassGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: StorageClassGetInput,
  outputSchema: StorageClassGetOutput,
}));
// Input Schema
export const StorageClassListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/{resourceUri}/providers/Microsoft.KubernetesRuntime/storageClasses",
  }),
);
export type StorageClassListInput = typeof StorageClassListInput.Type;

// Output Schema
export const StorageClassListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  },
);
export type StorageClassListOutput = typeof StorageClassListOutput.Type;

// The operation
/**
 * List StorageClassResource resources by parent
 *
 * @param api-version - The API version to use for this operation.
 */
export const StorageClassList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: StorageClassListInput,
  outputSchema: StorageClassListOutput,
}));
// Input Schema
export const StorageClassUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    storageClassName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/{resourceUri}/providers/Microsoft.KubernetesRuntime/storageClasses/{storageClassName}",
    }),
  );
export type StorageClassUpdateInput = typeof StorageClassUpdateInput.Type;

// Output Schema
export const StorageClassUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type StorageClassUpdateOutput = typeof StorageClassUpdateOutput.Type;

// The operation
/**
 * Update a StorageClassResource
 *
 * @param api-version - The API version to use for this operation.
 * @param storageClassName - The name of the the storage class
 */
export const StorageClassUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: StorageClassUpdateInput,
  outputSchema: StorageClassUpdateOutput,
}));
