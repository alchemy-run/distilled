/**
 * Kubernetes Policy API
 *
 * Generated from the Kubernetes OpenAPI spec.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";

// Input Schema
export const CreatePolicyV1NamespacedPodDisruptionBudgetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/apis/policy/v1/namespaces/{namespace}/poddisruptionbudgets",
    }),
  );
export type CreatePolicyV1NamespacedPodDisruptionBudgetInput =
  typeof CreatePolicyV1NamespacedPodDisruptionBudgetInput.Type;

// Output Schema
export const CreatePolicyV1NamespacedPodDisruptionBudgetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    apiVersion: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
    metadata: Schema.optional(
      Schema.Struct({
        annotations: Schema.optional(
          Schema.Record(Schema.String, Schema.String),
        ),
        creationTimestamp: Schema.optional(Schema.String),
        deletionGracePeriodSeconds: Schema.optional(Schema.Number),
        deletionTimestamp: Schema.optional(Schema.String),
        finalizers: Schema.optional(Schema.Array(Schema.String)),
        generateName: Schema.optional(Schema.String),
        generation: Schema.optional(Schema.Number),
        labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        managedFields: Schema.optional(
          Schema.Array(
            Schema.Struct({
              apiVersion: Schema.optional(Schema.String),
              fieldsType: Schema.optional(Schema.String),
              fieldsV1: Schema.optional(Schema.Unknown),
              manager: Schema.optional(Schema.String),
              operation: Schema.optional(Schema.String),
              subresource: Schema.optional(Schema.String),
              time: Schema.optional(Schema.String),
            }),
          ),
        ),
        name: Schema.optional(Schema.String),
        namespace: Schema.optional(Schema.String),
        ownerReferences: Schema.optional(
          Schema.Array(
            Schema.Struct({
              apiVersion: Schema.String,
              blockOwnerDeletion: Schema.optional(Schema.Boolean),
              controller: Schema.optional(Schema.Boolean),
              kind: Schema.String,
              name: Schema.String,
              uid: Schema.String,
            }),
          ),
        ),
        resourceVersion: Schema.optional(Schema.String),
        selfLink: Schema.optional(Schema.String),
        uid: Schema.optional(Schema.String),
      }),
    ),
    spec: Schema.optional(
      Schema.Struct({
        maxUnavailable: Schema.optional(Schema.String),
        minAvailable: Schema.optional(Schema.String),
        selector: Schema.optional(
          Schema.Struct({
            matchExpressions: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  key: Schema.String,
                  operator: Schema.String,
                  values: Schema.optional(Schema.Array(Schema.String)),
                }),
              ),
            ),
            matchLabels: Schema.optional(
              Schema.Record(Schema.String, Schema.String),
            ),
          }),
        ),
        unhealthyPodEvictionPolicy: Schema.optional(Schema.String),
      }),
    ),
    status: Schema.optional(
      Schema.Struct({
        conditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastTransitionTime: Schema.String,
              message: Schema.String,
              observedGeneration: Schema.optional(Schema.Number),
              reason: Schema.String,
              status: Schema.String,
              type: Schema.String,
            }),
          ),
        ),
        currentHealthy: Schema.optional(Schema.Number),
        desiredHealthy: Schema.optional(Schema.Number),
        disruptedPods: Schema.optional(
          Schema.Record(Schema.String, Schema.String),
        ),
        disruptionsAllowed: Schema.optional(Schema.Number),
        expectedPods: Schema.optional(Schema.Number),
        observedGeneration: Schema.optional(Schema.Number),
      }),
    ),
  });
export type CreatePolicyV1NamespacedPodDisruptionBudgetOutput =
  typeof CreatePolicyV1NamespacedPodDisruptionBudgetOutput.Type;

// The operation
/**
 * create a PodDisruptionBudget
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const createPolicyV1NamespacedPodDisruptionBudget =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreatePolicyV1NamespacedPodDisruptionBudgetInput,
    outputSchema: CreatePolicyV1NamespacedPodDisruptionBudgetOutput,
  }));
// Input Schema
export const DeletePolicyV1CollectionNamespacedPodDisruptionBudgetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/policy/v1/namespaces/{namespace}/poddisruptionbudgets",
    }),
  );
export type DeletePolicyV1CollectionNamespacedPodDisruptionBudgetInput =
  typeof DeletePolicyV1CollectionNamespacedPodDisruptionBudgetInput.Type;

// Output Schema
export const DeletePolicyV1CollectionNamespacedPodDisruptionBudgetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    apiVersion: Schema.optional(Schema.String),
    code: Schema.optional(Schema.Number),
    details: Schema.optional(
      Schema.Struct({
        causes: Schema.optional(
          Schema.Array(
            Schema.Struct({
              field: Schema.optional(Schema.String),
              message: Schema.optional(Schema.String),
              reason: Schema.optional(Schema.String),
            }),
          ),
        ),
        group: Schema.optional(Schema.String),
        kind: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        retryAfterSeconds: Schema.optional(Schema.Number),
        uid: Schema.optional(Schema.String),
      }),
    ),
    kind: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
    metadata: Schema.optional(
      Schema.Struct({
        continue: Schema.optional(Schema.String),
        remainingItemCount: Schema.optional(Schema.Number),
        resourceVersion: Schema.optional(Schema.String),
        selfLink: Schema.optional(Schema.String),
      }),
    ),
    reason: Schema.optional(Schema.String),
    status: Schema.optional(Schema.String),
  });
export type DeletePolicyV1CollectionNamespacedPodDisruptionBudgetOutput =
  typeof DeletePolicyV1CollectionNamespacedPodDisruptionBudgetOutput.Type;

// The operation
/**
 * delete collection of PodDisruptionBudget
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deletePolicyV1CollectionNamespacedPodDisruptionBudget =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeletePolicyV1CollectionNamespacedPodDisruptionBudgetInput,
    outputSchema: DeletePolicyV1CollectionNamespacedPodDisruptionBudgetOutput,
  }));
// Input Schema
export const DeletePolicyV1NamespacedPodDisruptionBudgetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/policy/v1/namespaces/{namespace}/poddisruptionbudgets/{name}",
    }),
  );
export type DeletePolicyV1NamespacedPodDisruptionBudgetInput =
  typeof DeletePolicyV1NamespacedPodDisruptionBudgetInput.Type;

// Output Schema
export const DeletePolicyV1NamespacedPodDisruptionBudgetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    apiVersion: Schema.optional(Schema.String),
    code: Schema.optional(Schema.Number),
    details: Schema.optional(
      Schema.Struct({
        causes: Schema.optional(
          Schema.Array(
            Schema.Struct({
              field: Schema.optional(Schema.String),
              message: Schema.optional(Schema.String),
              reason: Schema.optional(Schema.String),
            }),
          ),
        ),
        group: Schema.optional(Schema.String),
        kind: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        retryAfterSeconds: Schema.optional(Schema.Number),
        uid: Schema.optional(Schema.String),
      }),
    ),
    kind: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
    metadata: Schema.optional(
      Schema.Struct({
        continue: Schema.optional(Schema.String),
        remainingItemCount: Schema.optional(Schema.Number),
        resourceVersion: Schema.optional(Schema.String),
        selfLink: Schema.optional(Schema.String),
      }),
    ),
    reason: Schema.optional(Schema.String),
    status: Schema.optional(Schema.String),
  });
export type DeletePolicyV1NamespacedPodDisruptionBudgetOutput =
  typeof DeletePolicyV1NamespacedPodDisruptionBudgetOutput.Type;

// The operation
/**
 * delete a PodDisruptionBudget
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deletePolicyV1NamespacedPodDisruptionBudget =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeletePolicyV1NamespacedPodDisruptionBudgetInput,
    outputSchema: DeletePolicyV1NamespacedPodDisruptionBudgetOutput,
  }));
// Input Schema
export const GetPolicyAPIGroupInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(T.Http({ method: "GET", path: "/apis/policy/" }));
export type GetPolicyAPIGroupInput = typeof GetPolicyAPIGroupInput.Type;

// Output Schema
export const GetPolicyAPIGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    apiVersion: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
    name: Schema.String,
    preferredVersion: Schema.optional(
      Schema.Struct({
        groupVersion: Schema.String,
        version: Schema.String,
      }),
    ),
    serverAddressByClientCIDRs: Schema.optional(
      Schema.Array(
        Schema.Struct({
          clientCIDR: Schema.String,
          serverAddress: Schema.String,
        }),
      ),
    ),
    versions: Schema.Array(
      Schema.Struct({
        groupVersion: Schema.String,
        version: Schema.String,
      }),
    ),
  });
export type GetPolicyAPIGroupOutput = typeof GetPolicyAPIGroupOutput.Type;

// The operation
/**
 * get information of a group
 */
export const getPolicyAPIGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetPolicyAPIGroupInput,
  outputSchema: GetPolicyAPIGroupOutput,
}));
// Input Schema
export const GetPolicyV1APIResourcesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/apis/policy/v1/" }),
  );
export type GetPolicyV1APIResourcesInput =
  typeof GetPolicyV1APIResourcesInput.Type;

// Output Schema
export const GetPolicyV1APIResourcesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    apiVersion: Schema.optional(Schema.String),
    groupVersion: Schema.String,
    kind: Schema.optional(Schema.String),
    resources: Schema.Array(
      Schema.Struct({
        categories: Schema.optional(Schema.Array(Schema.String)),
        group: Schema.optional(Schema.String),
        kind: Schema.String,
        name: Schema.String,
        namespaced: Schema.Boolean,
        shortNames: Schema.optional(Schema.Array(Schema.String)),
        singularName: Schema.String,
        storageVersionHash: Schema.optional(Schema.String),
        verbs: Schema.Array(Schema.String),
        version: Schema.optional(Schema.String),
      }),
    ),
  });
export type GetPolicyV1APIResourcesOutput =
  typeof GetPolicyV1APIResourcesOutput.Type;

// The operation
/**
 * get available resources
 */
export const getPolicyV1APIResources = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetPolicyV1APIResourcesInput,
    outputSchema: GetPolicyV1APIResourcesOutput,
  }),
);
// Input Schema
export const ListPolicyV1NamespacedPodDisruptionBudgetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/policy/v1/namespaces/{namespace}/poddisruptionbudgets",
    }),
  );
export type ListPolicyV1NamespacedPodDisruptionBudgetInput =
  typeof ListPolicyV1NamespacedPodDisruptionBudgetInput.Type;

// Output Schema
export const ListPolicyV1NamespacedPodDisruptionBudgetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    apiVersion: Schema.optional(Schema.String),
    items: Schema.Array(
      Schema.Struct({
        apiVersion: Schema.optional(Schema.String),
        kind: Schema.optional(Schema.String),
        metadata: Schema.optional(
          Schema.Struct({
            annotations: Schema.optional(
              Schema.Record(Schema.String, Schema.String),
            ),
            creationTimestamp: Schema.optional(Schema.String),
            deletionGracePeriodSeconds: Schema.optional(Schema.Number),
            deletionTimestamp: Schema.optional(Schema.String),
            finalizers: Schema.optional(Schema.Array(Schema.String)),
            generateName: Schema.optional(Schema.String),
            generation: Schema.optional(Schema.Number),
            labels: Schema.optional(
              Schema.Record(Schema.String, Schema.String),
            ),
            managedFields: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiVersion: Schema.optional(Schema.String),
                  fieldsType: Schema.optional(Schema.String),
                  fieldsV1: Schema.optional(Schema.Unknown),
                  manager: Schema.optional(Schema.String),
                  operation: Schema.optional(Schema.String),
                  subresource: Schema.optional(Schema.String),
                  time: Schema.optional(Schema.String),
                }),
              ),
            ),
            name: Schema.optional(Schema.String),
            namespace: Schema.optional(Schema.String),
            ownerReferences: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiVersion: Schema.String,
                  blockOwnerDeletion: Schema.optional(Schema.Boolean),
                  controller: Schema.optional(Schema.Boolean),
                  kind: Schema.String,
                  name: Schema.String,
                  uid: Schema.String,
                }),
              ),
            ),
            resourceVersion: Schema.optional(Schema.String),
            selfLink: Schema.optional(Schema.String),
            uid: Schema.optional(Schema.String),
          }),
        ),
        spec: Schema.optional(
          Schema.Struct({
            maxUnavailable: Schema.optional(Schema.String),
            minAvailable: Schema.optional(Schema.String),
            selector: Schema.optional(
              Schema.Struct({
                matchExpressions: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      key: Schema.String,
                      operator: Schema.String,
                      values: Schema.optional(Schema.Array(Schema.String)),
                    }),
                  ),
                ),
                matchLabels: Schema.optional(
                  Schema.Record(Schema.String, Schema.String),
                ),
              }),
            ),
            unhealthyPodEvictionPolicy: Schema.optional(Schema.String),
          }),
        ),
        status: Schema.optional(
          Schema.Struct({
            conditions: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  lastTransitionTime: Schema.String,
                  message: Schema.String,
                  observedGeneration: Schema.optional(Schema.Number),
                  reason: Schema.String,
                  status: Schema.String,
                  type: Schema.String,
                }),
              ),
            ),
            currentHealthy: Schema.optional(Schema.Number),
            desiredHealthy: Schema.optional(Schema.Number),
            disruptedPods: Schema.optional(
              Schema.Record(Schema.String, Schema.String),
            ),
            disruptionsAllowed: Schema.optional(Schema.Number),
            expectedPods: Schema.optional(Schema.Number),
            observedGeneration: Schema.optional(Schema.Number),
          }),
        ),
      }),
    ),
    kind: Schema.optional(Schema.String),
    metadata: Schema.optional(
      Schema.Struct({
        continue: Schema.optional(Schema.String),
        remainingItemCount: Schema.optional(Schema.Number),
        resourceVersion: Schema.optional(Schema.String),
        selfLink: Schema.optional(Schema.String),
      }),
    ),
  });
export type ListPolicyV1NamespacedPodDisruptionBudgetOutput =
  typeof ListPolicyV1NamespacedPodDisruptionBudgetOutput.Type;

// The operation
/**
 * list or watch objects of kind PodDisruptionBudget
 */
export const listPolicyV1NamespacedPodDisruptionBudget =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListPolicyV1NamespacedPodDisruptionBudgetInput,
    outputSchema: ListPolicyV1NamespacedPodDisruptionBudgetOutput,
  }));
// Input Schema
export const ListPolicyV1PodDisruptionBudgetForAllNamespacesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/apis/policy/v1/poddisruptionbudgets" }),
  );
export type ListPolicyV1PodDisruptionBudgetForAllNamespacesInput =
  typeof ListPolicyV1PodDisruptionBudgetForAllNamespacesInput.Type;

// Output Schema
export const ListPolicyV1PodDisruptionBudgetForAllNamespacesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    apiVersion: Schema.optional(Schema.String),
    items: Schema.Array(
      Schema.Struct({
        apiVersion: Schema.optional(Schema.String),
        kind: Schema.optional(Schema.String),
        metadata: Schema.optional(
          Schema.Struct({
            annotations: Schema.optional(
              Schema.Record(Schema.String, Schema.String),
            ),
            creationTimestamp: Schema.optional(Schema.String),
            deletionGracePeriodSeconds: Schema.optional(Schema.Number),
            deletionTimestamp: Schema.optional(Schema.String),
            finalizers: Schema.optional(Schema.Array(Schema.String)),
            generateName: Schema.optional(Schema.String),
            generation: Schema.optional(Schema.Number),
            labels: Schema.optional(
              Schema.Record(Schema.String, Schema.String),
            ),
            managedFields: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiVersion: Schema.optional(Schema.String),
                  fieldsType: Schema.optional(Schema.String),
                  fieldsV1: Schema.optional(Schema.Unknown),
                  manager: Schema.optional(Schema.String),
                  operation: Schema.optional(Schema.String),
                  subresource: Schema.optional(Schema.String),
                  time: Schema.optional(Schema.String),
                }),
              ),
            ),
            name: Schema.optional(Schema.String),
            namespace: Schema.optional(Schema.String),
            ownerReferences: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiVersion: Schema.String,
                  blockOwnerDeletion: Schema.optional(Schema.Boolean),
                  controller: Schema.optional(Schema.Boolean),
                  kind: Schema.String,
                  name: Schema.String,
                  uid: Schema.String,
                }),
              ),
            ),
            resourceVersion: Schema.optional(Schema.String),
            selfLink: Schema.optional(Schema.String),
            uid: Schema.optional(Schema.String),
          }),
        ),
        spec: Schema.optional(
          Schema.Struct({
            maxUnavailable: Schema.optional(Schema.String),
            minAvailable: Schema.optional(Schema.String),
            selector: Schema.optional(
              Schema.Struct({
                matchExpressions: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      key: Schema.String,
                      operator: Schema.String,
                      values: Schema.optional(Schema.Array(Schema.String)),
                    }),
                  ),
                ),
                matchLabels: Schema.optional(
                  Schema.Record(Schema.String, Schema.String),
                ),
              }),
            ),
            unhealthyPodEvictionPolicy: Schema.optional(Schema.String),
          }),
        ),
        status: Schema.optional(
          Schema.Struct({
            conditions: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  lastTransitionTime: Schema.String,
                  message: Schema.String,
                  observedGeneration: Schema.optional(Schema.Number),
                  reason: Schema.String,
                  status: Schema.String,
                  type: Schema.String,
                }),
              ),
            ),
            currentHealthy: Schema.optional(Schema.Number),
            desiredHealthy: Schema.optional(Schema.Number),
            disruptedPods: Schema.optional(
              Schema.Record(Schema.String, Schema.String),
            ),
            disruptionsAllowed: Schema.optional(Schema.Number),
            expectedPods: Schema.optional(Schema.Number),
            observedGeneration: Schema.optional(Schema.Number),
          }),
        ),
      }),
    ),
    kind: Schema.optional(Schema.String),
    metadata: Schema.optional(
      Schema.Struct({
        continue: Schema.optional(Schema.String),
        remainingItemCount: Schema.optional(Schema.Number),
        resourceVersion: Schema.optional(Schema.String),
        selfLink: Schema.optional(Schema.String),
      }),
    ),
  });
export type ListPolicyV1PodDisruptionBudgetForAllNamespacesOutput =
  typeof ListPolicyV1PodDisruptionBudgetForAllNamespacesOutput.Type;

// The operation
/**
 * list or watch objects of kind PodDisruptionBudget
 */
export const listPolicyV1PodDisruptionBudgetForAllNamespaces =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListPolicyV1PodDisruptionBudgetForAllNamespacesInput,
    outputSchema: ListPolicyV1PodDisruptionBudgetForAllNamespacesOutput,
  }));
// Input Schema
export const PatchPolicyV1NamespacedPodDisruptionBudgetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/policy/v1/namespaces/{namespace}/poddisruptionbudgets/{name}",
    }),
  );
export type PatchPolicyV1NamespacedPodDisruptionBudgetInput =
  typeof PatchPolicyV1NamespacedPodDisruptionBudgetInput.Type;

// Output Schema
export const PatchPolicyV1NamespacedPodDisruptionBudgetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    apiVersion: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
    metadata: Schema.optional(
      Schema.Struct({
        annotations: Schema.optional(
          Schema.Record(Schema.String, Schema.String),
        ),
        creationTimestamp: Schema.optional(Schema.String),
        deletionGracePeriodSeconds: Schema.optional(Schema.Number),
        deletionTimestamp: Schema.optional(Schema.String),
        finalizers: Schema.optional(Schema.Array(Schema.String)),
        generateName: Schema.optional(Schema.String),
        generation: Schema.optional(Schema.Number),
        labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        managedFields: Schema.optional(
          Schema.Array(
            Schema.Struct({
              apiVersion: Schema.optional(Schema.String),
              fieldsType: Schema.optional(Schema.String),
              fieldsV1: Schema.optional(Schema.Unknown),
              manager: Schema.optional(Schema.String),
              operation: Schema.optional(Schema.String),
              subresource: Schema.optional(Schema.String),
              time: Schema.optional(Schema.String),
            }),
          ),
        ),
        name: Schema.optional(Schema.String),
        namespace: Schema.optional(Schema.String),
        ownerReferences: Schema.optional(
          Schema.Array(
            Schema.Struct({
              apiVersion: Schema.String,
              blockOwnerDeletion: Schema.optional(Schema.Boolean),
              controller: Schema.optional(Schema.Boolean),
              kind: Schema.String,
              name: Schema.String,
              uid: Schema.String,
            }),
          ),
        ),
        resourceVersion: Schema.optional(Schema.String),
        selfLink: Schema.optional(Schema.String),
        uid: Schema.optional(Schema.String),
      }),
    ),
    spec: Schema.optional(
      Schema.Struct({
        maxUnavailable: Schema.optional(Schema.String),
        minAvailable: Schema.optional(Schema.String),
        selector: Schema.optional(
          Schema.Struct({
            matchExpressions: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  key: Schema.String,
                  operator: Schema.String,
                  values: Schema.optional(Schema.Array(Schema.String)),
                }),
              ),
            ),
            matchLabels: Schema.optional(
              Schema.Record(Schema.String, Schema.String),
            ),
          }),
        ),
        unhealthyPodEvictionPolicy: Schema.optional(Schema.String),
      }),
    ),
    status: Schema.optional(
      Schema.Struct({
        conditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastTransitionTime: Schema.String,
              message: Schema.String,
              observedGeneration: Schema.optional(Schema.Number),
              reason: Schema.String,
              status: Schema.String,
              type: Schema.String,
            }),
          ),
        ),
        currentHealthy: Schema.optional(Schema.Number),
        desiredHealthy: Schema.optional(Schema.Number),
        disruptedPods: Schema.optional(
          Schema.Record(Schema.String, Schema.String),
        ),
        disruptionsAllowed: Schema.optional(Schema.Number),
        expectedPods: Schema.optional(Schema.Number),
        observedGeneration: Schema.optional(Schema.Number),
      }),
    ),
  });
export type PatchPolicyV1NamespacedPodDisruptionBudgetOutput =
  typeof PatchPolicyV1NamespacedPodDisruptionBudgetOutput.Type;

// The operation
/**
 * partially update the specified PodDisruptionBudget
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchPolicyV1NamespacedPodDisruptionBudget =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PatchPolicyV1NamespacedPodDisruptionBudgetInput,
    outputSchema: PatchPolicyV1NamespacedPodDisruptionBudgetOutput,
  }));
// Input Schema
export const PatchPolicyV1NamespacedPodDisruptionBudgetStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/policy/v1/namespaces/{namespace}/poddisruptionbudgets/{name}/status",
    }),
  );
export type PatchPolicyV1NamespacedPodDisruptionBudgetStatusInput =
  typeof PatchPolicyV1NamespacedPodDisruptionBudgetStatusInput.Type;

// Output Schema
export const PatchPolicyV1NamespacedPodDisruptionBudgetStatusOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    apiVersion: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
    metadata: Schema.optional(
      Schema.Struct({
        annotations: Schema.optional(
          Schema.Record(Schema.String, Schema.String),
        ),
        creationTimestamp: Schema.optional(Schema.String),
        deletionGracePeriodSeconds: Schema.optional(Schema.Number),
        deletionTimestamp: Schema.optional(Schema.String),
        finalizers: Schema.optional(Schema.Array(Schema.String)),
        generateName: Schema.optional(Schema.String),
        generation: Schema.optional(Schema.Number),
        labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        managedFields: Schema.optional(
          Schema.Array(
            Schema.Struct({
              apiVersion: Schema.optional(Schema.String),
              fieldsType: Schema.optional(Schema.String),
              fieldsV1: Schema.optional(Schema.Unknown),
              manager: Schema.optional(Schema.String),
              operation: Schema.optional(Schema.String),
              subresource: Schema.optional(Schema.String),
              time: Schema.optional(Schema.String),
            }),
          ),
        ),
        name: Schema.optional(Schema.String),
        namespace: Schema.optional(Schema.String),
        ownerReferences: Schema.optional(
          Schema.Array(
            Schema.Struct({
              apiVersion: Schema.String,
              blockOwnerDeletion: Schema.optional(Schema.Boolean),
              controller: Schema.optional(Schema.Boolean),
              kind: Schema.String,
              name: Schema.String,
              uid: Schema.String,
            }),
          ),
        ),
        resourceVersion: Schema.optional(Schema.String),
        selfLink: Schema.optional(Schema.String),
        uid: Schema.optional(Schema.String),
      }),
    ),
    spec: Schema.optional(
      Schema.Struct({
        maxUnavailable: Schema.optional(Schema.String),
        minAvailable: Schema.optional(Schema.String),
        selector: Schema.optional(
          Schema.Struct({
            matchExpressions: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  key: Schema.String,
                  operator: Schema.String,
                  values: Schema.optional(Schema.Array(Schema.String)),
                }),
              ),
            ),
            matchLabels: Schema.optional(
              Schema.Record(Schema.String, Schema.String),
            ),
          }),
        ),
        unhealthyPodEvictionPolicy: Schema.optional(Schema.String),
      }),
    ),
    status: Schema.optional(
      Schema.Struct({
        conditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastTransitionTime: Schema.String,
              message: Schema.String,
              observedGeneration: Schema.optional(Schema.Number),
              reason: Schema.String,
              status: Schema.String,
              type: Schema.String,
            }),
          ),
        ),
        currentHealthy: Schema.optional(Schema.Number),
        desiredHealthy: Schema.optional(Schema.Number),
        disruptedPods: Schema.optional(
          Schema.Record(Schema.String, Schema.String),
        ),
        disruptionsAllowed: Schema.optional(Schema.Number),
        expectedPods: Schema.optional(Schema.Number),
        observedGeneration: Schema.optional(Schema.Number),
      }),
    ),
  });
export type PatchPolicyV1NamespacedPodDisruptionBudgetStatusOutput =
  typeof PatchPolicyV1NamespacedPodDisruptionBudgetStatusOutput.Type;

// The operation
/**
 * partially update status of the specified PodDisruptionBudget
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchPolicyV1NamespacedPodDisruptionBudgetStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PatchPolicyV1NamespacedPodDisruptionBudgetStatusInput,
    outputSchema: PatchPolicyV1NamespacedPodDisruptionBudgetStatusOutput,
  }));
// Input Schema
export const ReadPolicyV1NamespacedPodDisruptionBudgetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/policy/v1/namespaces/{namespace}/poddisruptionbudgets/{name}",
    }),
  );
export type ReadPolicyV1NamespacedPodDisruptionBudgetInput =
  typeof ReadPolicyV1NamespacedPodDisruptionBudgetInput.Type;

// Output Schema
export const ReadPolicyV1NamespacedPodDisruptionBudgetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    apiVersion: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
    metadata: Schema.optional(
      Schema.Struct({
        annotations: Schema.optional(
          Schema.Record(Schema.String, Schema.String),
        ),
        creationTimestamp: Schema.optional(Schema.String),
        deletionGracePeriodSeconds: Schema.optional(Schema.Number),
        deletionTimestamp: Schema.optional(Schema.String),
        finalizers: Schema.optional(Schema.Array(Schema.String)),
        generateName: Schema.optional(Schema.String),
        generation: Schema.optional(Schema.Number),
        labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        managedFields: Schema.optional(
          Schema.Array(
            Schema.Struct({
              apiVersion: Schema.optional(Schema.String),
              fieldsType: Schema.optional(Schema.String),
              fieldsV1: Schema.optional(Schema.Unknown),
              manager: Schema.optional(Schema.String),
              operation: Schema.optional(Schema.String),
              subresource: Schema.optional(Schema.String),
              time: Schema.optional(Schema.String),
            }),
          ),
        ),
        name: Schema.optional(Schema.String),
        namespace: Schema.optional(Schema.String),
        ownerReferences: Schema.optional(
          Schema.Array(
            Schema.Struct({
              apiVersion: Schema.String,
              blockOwnerDeletion: Schema.optional(Schema.Boolean),
              controller: Schema.optional(Schema.Boolean),
              kind: Schema.String,
              name: Schema.String,
              uid: Schema.String,
            }),
          ),
        ),
        resourceVersion: Schema.optional(Schema.String),
        selfLink: Schema.optional(Schema.String),
        uid: Schema.optional(Schema.String),
      }),
    ),
    spec: Schema.optional(
      Schema.Struct({
        maxUnavailable: Schema.optional(Schema.String),
        minAvailable: Schema.optional(Schema.String),
        selector: Schema.optional(
          Schema.Struct({
            matchExpressions: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  key: Schema.String,
                  operator: Schema.String,
                  values: Schema.optional(Schema.Array(Schema.String)),
                }),
              ),
            ),
            matchLabels: Schema.optional(
              Schema.Record(Schema.String, Schema.String),
            ),
          }),
        ),
        unhealthyPodEvictionPolicy: Schema.optional(Schema.String),
      }),
    ),
    status: Schema.optional(
      Schema.Struct({
        conditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastTransitionTime: Schema.String,
              message: Schema.String,
              observedGeneration: Schema.optional(Schema.Number),
              reason: Schema.String,
              status: Schema.String,
              type: Schema.String,
            }),
          ),
        ),
        currentHealthy: Schema.optional(Schema.Number),
        desiredHealthy: Schema.optional(Schema.Number),
        disruptedPods: Schema.optional(
          Schema.Record(Schema.String, Schema.String),
        ),
        disruptionsAllowed: Schema.optional(Schema.Number),
        expectedPods: Schema.optional(Schema.Number),
        observedGeneration: Schema.optional(Schema.Number),
      }),
    ),
  });
export type ReadPolicyV1NamespacedPodDisruptionBudgetOutput =
  typeof ReadPolicyV1NamespacedPodDisruptionBudgetOutput.Type;

// The operation
/**
 * read the specified PodDisruptionBudget
 */
export const readPolicyV1NamespacedPodDisruptionBudget =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReadPolicyV1NamespacedPodDisruptionBudgetInput,
    outputSchema: ReadPolicyV1NamespacedPodDisruptionBudgetOutput,
  }));
// Input Schema
export const ReadPolicyV1NamespacedPodDisruptionBudgetStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/policy/v1/namespaces/{namespace}/poddisruptionbudgets/{name}/status",
    }),
  );
export type ReadPolicyV1NamespacedPodDisruptionBudgetStatusInput =
  typeof ReadPolicyV1NamespacedPodDisruptionBudgetStatusInput.Type;

// Output Schema
export const ReadPolicyV1NamespacedPodDisruptionBudgetStatusOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    apiVersion: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
    metadata: Schema.optional(
      Schema.Struct({
        annotations: Schema.optional(
          Schema.Record(Schema.String, Schema.String),
        ),
        creationTimestamp: Schema.optional(Schema.String),
        deletionGracePeriodSeconds: Schema.optional(Schema.Number),
        deletionTimestamp: Schema.optional(Schema.String),
        finalizers: Schema.optional(Schema.Array(Schema.String)),
        generateName: Schema.optional(Schema.String),
        generation: Schema.optional(Schema.Number),
        labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        managedFields: Schema.optional(
          Schema.Array(
            Schema.Struct({
              apiVersion: Schema.optional(Schema.String),
              fieldsType: Schema.optional(Schema.String),
              fieldsV1: Schema.optional(Schema.Unknown),
              manager: Schema.optional(Schema.String),
              operation: Schema.optional(Schema.String),
              subresource: Schema.optional(Schema.String),
              time: Schema.optional(Schema.String),
            }),
          ),
        ),
        name: Schema.optional(Schema.String),
        namespace: Schema.optional(Schema.String),
        ownerReferences: Schema.optional(
          Schema.Array(
            Schema.Struct({
              apiVersion: Schema.String,
              blockOwnerDeletion: Schema.optional(Schema.Boolean),
              controller: Schema.optional(Schema.Boolean),
              kind: Schema.String,
              name: Schema.String,
              uid: Schema.String,
            }),
          ),
        ),
        resourceVersion: Schema.optional(Schema.String),
        selfLink: Schema.optional(Schema.String),
        uid: Schema.optional(Schema.String),
      }),
    ),
    spec: Schema.optional(
      Schema.Struct({
        maxUnavailable: Schema.optional(Schema.String),
        minAvailable: Schema.optional(Schema.String),
        selector: Schema.optional(
          Schema.Struct({
            matchExpressions: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  key: Schema.String,
                  operator: Schema.String,
                  values: Schema.optional(Schema.Array(Schema.String)),
                }),
              ),
            ),
            matchLabels: Schema.optional(
              Schema.Record(Schema.String, Schema.String),
            ),
          }),
        ),
        unhealthyPodEvictionPolicy: Schema.optional(Schema.String),
      }),
    ),
    status: Schema.optional(
      Schema.Struct({
        conditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastTransitionTime: Schema.String,
              message: Schema.String,
              observedGeneration: Schema.optional(Schema.Number),
              reason: Schema.String,
              status: Schema.String,
              type: Schema.String,
            }),
          ),
        ),
        currentHealthy: Schema.optional(Schema.Number),
        desiredHealthy: Schema.optional(Schema.Number),
        disruptedPods: Schema.optional(
          Schema.Record(Schema.String, Schema.String),
        ),
        disruptionsAllowed: Schema.optional(Schema.Number),
        expectedPods: Schema.optional(Schema.Number),
        observedGeneration: Schema.optional(Schema.Number),
      }),
    ),
  });
export type ReadPolicyV1NamespacedPodDisruptionBudgetStatusOutput =
  typeof ReadPolicyV1NamespacedPodDisruptionBudgetStatusOutput.Type;

// The operation
/**
 * read status of the specified PodDisruptionBudget
 */
export const readPolicyV1NamespacedPodDisruptionBudgetStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReadPolicyV1NamespacedPodDisruptionBudgetStatusInput,
    outputSchema: ReadPolicyV1NamespacedPodDisruptionBudgetStatusOutput,
  }));
// Input Schema
export const ReplacePolicyV1NamespacedPodDisruptionBudgetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/policy/v1/namespaces/{namespace}/poddisruptionbudgets/{name}",
    }),
  );
export type ReplacePolicyV1NamespacedPodDisruptionBudgetInput =
  typeof ReplacePolicyV1NamespacedPodDisruptionBudgetInput.Type;

// Output Schema
export const ReplacePolicyV1NamespacedPodDisruptionBudgetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    apiVersion: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
    metadata: Schema.optional(
      Schema.Struct({
        annotations: Schema.optional(
          Schema.Record(Schema.String, Schema.String),
        ),
        creationTimestamp: Schema.optional(Schema.String),
        deletionGracePeriodSeconds: Schema.optional(Schema.Number),
        deletionTimestamp: Schema.optional(Schema.String),
        finalizers: Schema.optional(Schema.Array(Schema.String)),
        generateName: Schema.optional(Schema.String),
        generation: Schema.optional(Schema.Number),
        labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        managedFields: Schema.optional(
          Schema.Array(
            Schema.Struct({
              apiVersion: Schema.optional(Schema.String),
              fieldsType: Schema.optional(Schema.String),
              fieldsV1: Schema.optional(Schema.Unknown),
              manager: Schema.optional(Schema.String),
              operation: Schema.optional(Schema.String),
              subresource: Schema.optional(Schema.String),
              time: Schema.optional(Schema.String),
            }),
          ),
        ),
        name: Schema.optional(Schema.String),
        namespace: Schema.optional(Schema.String),
        ownerReferences: Schema.optional(
          Schema.Array(
            Schema.Struct({
              apiVersion: Schema.String,
              blockOwnerDeletion: Schema.optional(Schema.Boolean),
              controller: Schema.optional(Schema.Boolean),
              kind: Schema.String,
              name: Schema.String,
              uid: Schema.String,
            }),
          ),
        ),
        resourceVersion: Schema.optional(Schema.String),
        selfLink: Schema.optional(Schema.String),
        uid: Schema.optional(Schema.String),
      }),
    ),
    spec: Schema.optional(
      Schema.Struct({
        maxUnavailable: Schema.optional(Schema.String),
        minAvailable: Schema.optional(Schema.String),
        selector: Schema.optional(
          Schema.Struct({
            matchExpressions: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  key: Schema.String,
                  operator: Schema.String,
                  values: Schema.optional(Schema.Array(Schema.String)),
                }),
              ),
            ),
            matchLabels: Schema.optional(
              Schema.Record(Schema.String, Schema.String),
            ),
          }),
        ),
        unhealthyPodEvictionPolicy: Schema.optional(Schema.String),
      }),
    ),
    status: Schema.optional(
      Schema.Struct({
        conditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastTransitionTime: Schema.String,
              message: Schema.String,
              observedGeneration: Schema.optional(Schema.Number),
              reason: Schema.String,
              status: Schema.String,
              type: Schema.String,
            }),
          ),
        ),
        currentHealthy: Schema.optional(Schema.Number),
        desiredHealthy: Schema.optional(Schema.Number),
        disruptedPods: Schema.optional(
          Schema.Record(Schema.String, Schema.String),
        ),
        disruptionsAllowed: Schema.optional(Schema.Number),
        expectedPods: Schema.optional(Schema.Number),
        observedGeneration: Schema.optional(Schema.Number),
      }),
    ),
  });
export type ReplacePolicyV1NamespacedPodDisruptionBudgetOutput =
  typeof ReplacePolicyV1NamespacedPodDisruptionBudgetOutput.Type;

// The operation
/**
 * replace the specified PodDisruptionBudget
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replacePolicyV1NamespacedPodDisruptionBudget =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReplacePolicyV1NamespacedPodDisruptionBudgetInput,
    outputSchema: ReplacePolicyV1NamespacedPodDisruptionBudgetOutput,
  }));
// Input Schema
export const ReplacePolicyV1NamespacedPodDisruptionBudgetStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/policy/v1/namespaces/{namespace}/poddisruptionbudgets/{name}/status",
    }),
  );
export type ReplacePolicyV1NamespacedPodDisruptionBudgetStatusInput =
  typeof ReplacePolicyV1NamespacedPodDisruptionBudgetStatusInput.Type;

// Output Schema
export const ReplacePolicyV1NamespacedPodDisruptionBudgetStatusOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    apiVersion: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
    metadata: Schema.optional(
      Schema.Struct({
        annotations: Schema.optional(
          Schema.Record(Schema.String, Schema.String),
        ),
        creationTimestamp: Schema.optional(Schema.String),
        deletionGracePeriodSeconds: Schema.optional(Schema.Number),
        deletionTimestamp: Schema.optional(Schema.String),
        finalizers: Schema.optional(Schema.Array(Schema.String)),
        generateName: Schema.optional(Schema.String),
        generation: Schema.optional(Schema.Number),
        labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        managedFields: Schema.optional(
          Schema.Array(
            Schema.Struct({
              apiVersion: Schema.optional(Schema.String),
              fieldsType: Schema.optional(Schema.String),
              fieldsV1: Schema.optional(Schema.Unknown),
              manager: Schema.optional(Schema.String),
              operation: Schema.optional(Schema.String),
              subresource: Schema.optional(Schema.String),
              time: Schema.optional(Schema.String),
            }),
          ),
        ),
        name: Schema.optional(Schema.String),
        namespace: Schema.optional(Schema.String),
        ownerReferences: Schema.optional(
          Schema.Array(
            Schema.Struct({
              apiVersion: Schema.String,
              blockOwnerDeletion: Schema.optional(Schema.Boolean),
              controller: Schema.optional(Schema.Boolean),
              kind: Schema.String,
              name: Schema.String,
              uid: Schema.String,
            }),
          ),
        ),
        resourceVersion: Schema.optional(Schema.String),
        selfLink: Schema.optional(Schema.String),
        uid: Schema.optional(Schema.String),
      }),
    ),
    spec: Schema.optional(
      Schema.Struct({
        maxUnavailable: Schema.optional(Schema.String),
        minAvailable: Schema.optional(Schema.String),
        selector: Schema.optional(
          Schema.Struct({
            matchExpressions: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  key: Schema.String,
                  operator: Schema.String,
                  values: Schema.optional(Schema.Array(Schema.String)),
                }),
              ),
            ),
            matchLabels: Schema.optional(
              Schema.Record(Schema.String, Schema.String),
            ),
          }),
        ),
        unhealthyPodEvictionPolicy: Schema.optional(Schema.String),
      }),
    ),
    status: Schema.optional(
      Schema.Struct({
        conditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastTransitionTime: Schema.String,
              message: Schema.String,
              observedGeneration: Schema.optional(Schema.Number),
              reason: Schema.String,
              status: Schema.String,
              type: Schema.String,
            }),
          ),
        ),
        currentHealthy: Schema.optional(Schema.Number),
        desiredHealthy: Schema.optional(Schema.Number),
        disruptedPods: Schema.optional(
          Schema.Record(Schema.String, Schema.String),
        ),
        disruptionsAllowed: Schema.optional(Schema.Number),
        expectedPods: Schema.optional(Schema.Number),
        observedGeneration: Schema.optional(Schema.Number),
      }),
    ),
  });
export type ReplacePolicyV1NamespacedPodDisruptionBudgetStatusOutput =
  typeof ReplacePolicyV1NamespacedPodDisruptionBudgetStatusOutput.Type;

// The operation
/**
 * replace status of the specified PodDisruptionBudget
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replacePolicyV1NamespacedPodDisruptionBudgetStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReplacePolicyV1NamespacedPodDisruptionBudgetStatusInput,
    outputSchema: ReplacePolicyV1NamespacedPodDisruptionBudgetStatusOutput,
  }));
// Input Schema
export const WatchPolicyV1NamespacedPodDisruptionBudgetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/policy/v1/watch/namespaces/{namespace}/poddisruptionbudgets/{name}",
    }),
  );
export type WatchPolicyV1NamespacedPodDisruptionBudgetInput =
  typeof WatchPolicyV1NamespacedPodDisruptionBudgetInput.Type;

// Output Schema
export const WatchPolicyV1NamespacedPodDisruptionBudgetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchPolicyV1NamespacedPodDisruptionBudgetOutput =
  typeof WatchPolicyV1NamespacedPodDisruptionBudgetOutput.Type;

// The operation
/**
 * watch changes to an object of kind PodDisruptionBudget. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
 */
export const watchPolicyV1NamespacedPodDisruptionBudget =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchPolicyV1NamespacedPodDisruptionBudgetInput,
    outputSchema: WatchPolicyV1NamespacedPodDisruptionBudgetOutput,
  }));
// Input Schema
export const WatchPolicyV1NamespacedPodDisruptionBudgetListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/policy/v1/watch/namespaces/{namespace}/poddisruptionbudgets",
    }),
  );
export type WatchPolicyV1NamespacedPodDisruptionBudgetListInput =
  typeof WatchPolicyV1NamespacedPodDisruptionBudgetListInput.Type;

// Output Schema
export const WatchPolicyV1NamespacedPodDisruptionBudgetListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchPolicyV1NamespacedPodDisruptionBudgetListOutput =
  typeof WatchPolicyV1NamespacedPodDisruptionBudgetListOutput.Type;

// The operation
/**
 * watch individual changes to a list of PodDisruptionBudget. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchPolicyV1NamespacedPodDisruptionBudgetList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchPolicyV1NamespacedPodDisruptionBudgetListInput,
    outputSchema: WatchPolicyV1NamespacedPodDisruptionBudgetListOutput,
  }));
// Input Schema
export const WatchPolicyV1PodDisruptionBudgetListForAllNamespacesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/policy/v1/watch/poddisruptionbudgets",
    }),
  );
export type WatchPolicyV1PodDisruptionBudgetListForAllNamespacesInput =
  typeof WatchPolicyV1PodDisruptionBudgetListForAllNamespacesInput.Type;

// Output Schema
export const WatchPolicyV1PodDisruptionBudgetListForAllNamespacesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchPolicyV1PodDisruptionBudgetListForAllNamespacesOutput =
  typeof WatchPolicyV1PodDisruptionBudgetListForAllNamespacesOutput.Type;

// The operation
/**
 * watch individual changes to a list of PodDisruptionBudget. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchPolicyV1PodDisruptionBudgetListForAllNamespaces =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchPolicyV1PodDisruptionBudgetListForAllNamespacesInput,
    outputSchema: WatchPolicyV1PodDisruptionBudgetListForAllNamespacesOutput,
  }));
