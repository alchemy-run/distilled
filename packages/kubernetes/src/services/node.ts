/**
 * Kubernetes Node API
 *
 * Generated from the Kubernetes OpenAPI spec.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";

// Input Schema
export const CreateNodeV1RuntimeClassInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({ method: "POST", path: "/apis/node.k8s.io/v1/runtimeclasses" }),
  );
export type CreateNodeV1RuntimeClassInput =
  typeof CreateNodeV1RuntimeClassInput.Type;

// Output Schema
export const CreateNodeV1RuntimeClassOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    apiVersion: Schema.optional(Schema.String),
    handler: Schema.String,
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
    overhead: Schema.optional(
      Schema.Struct({
        podFixed: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      }),
    ),
    scheduling: Schema.optional(
      Schema.Struct({
        nodeSelector: Schema.optional(
          Schema.Record(Schema.String, Schema.String),
        ),
        tolerations: Schema.optional(
          Schema.Array(
            Schema.Struct({
              effect: Schema.optional(Schema.String),
              key: Schema.optional(Schema.String),
              operator: Schema.optional(Schema.String),
              tolerationSeconds: Schema.optional(Schema.Number),
              value: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
  });
export type CreateNodeV1RuntimeClassOutput =
  typeof CreateNodeV1RuntimeClassOutput.Type;

// The operation
/**
 * create a RuntimeClass
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const createNodeV1RuntimeClass = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CreateNodeV1RuntimeClassInput,
    outputSchema: CreateNodeV1RuntimeClassOutput,
  }),
);
// Input Schema
export const DeleteNodeV1CollectionRuntimeClassInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({ method: "DELETE", path: "/apis/node.k8s.io/v1/runtimeclasses" }),
  );
export type DeleteNodeV1CollectionRuntimeClassInput =
  typeof DeleteNodeV1CollectionRuntimeClassInput.Type;

// Output Schema
export const DeleteNodeV1CollectionRuntimeClassOutput =
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
export type DeleteNodeV1CollectionRuntimeClassOutput =
  typeof DeleteNodeV1CollectionRuntimeClassOutput.Type;

// The operation
/**
 * delete collection of RuntimeClass
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteNodeV1CollectionRuntimeClass =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteNodeV1CollectionRuntimeClassInput,
    outputSchema: DeleteNodeV1CollectionRuntimeClassOutput,
  }));
// Input Schema
export const DeleteNodeV1RuntimeClassInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/node.k8s.io/v1/runtimeclasses/{name}",
    }),
  );
export type DeleteNodeV1RuntimeClassInput =
  typeof DeleteNodeV1RuntimeClassInput.Type;

// Output Schema
export const DeleteNodeV1RuntimeClassOutput =
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
export type DeleteNodeV1RuntimeClassOutput =
  typeof DeleteNodeV1RuntimeClassOutput.Type;

// The operation
/**
 * delete a RuntimeClass
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteNodeV1RuntimeClass = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeleteNodeV1RuntimeClassInput,
    outputSchema: DeleteNodeV1RuntimeClassOutput,
  }),
);
// Input Schema
export const GetNodeAPIGroupInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(T.Http({ method: "GET", path: "/apis/node.k8s.io/" }));
export type GetNodeAPIGroupInput = typeof GetNodeAPIGroupInput.Type;

// Output Schema
export const GetNodeAPIGroupOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
export type GetNodeAPIGroupOutput = typeof GetNodeAPIGroupOutput.Type;

// The operation
/**
 * get information of a group
 */
export const getNodeAPIGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetNodeAPIGroupInput,
  outputSchema: GetNodeAPIGroupOutput,
}));
// Input Schema
export const GetNodeV1APIResourcesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/apis/node.k8s.io/v1/" }),
  );
export type GetNodeV1APIResourcesInput = typeof GetNodeV1APIResourcesInput.Type;

// Output Schema
export const GetNodeV1APIResourcesOutput =
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
export type GetNodeV1APIResourcesOutput =
  typeof GetNodeV1APIResourcesOutput.Type;

// The operation
/**
 * get available resources
 */
export const getNodeV1APIResources = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetNodeV1APIResourcesInput,
    outputSchema: GetNodeV1APIResourcesOutput,
  }),
);
// Input Schema
export const ListNodeV1RuntimeClassInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/apis/node.k8s.io/v1/runtimeclasses" }),
  );
export type ListNodeV1RuntimeClassInput =
  typeof ListNodeV1RuntimeClassInput.Type;

// Output Schema
export const ListNodeV1RuntimeClassOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    apiVersion: Schema.optional(Schema.String),
    items: Schema.Array(
      Schema.Struct({
        apiVersion: Schema.optional(Schema.String),
        handler: Schema.String,
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
        overhead: Schema.optional(
          Schema.Struct({
            podFixed: Schema.optional(
              Schema.Record(Schema.String, Schema.String),
            ),
          }),
        ),
        scheduling: Schema.optional(
          Schema.Struct({
            nodeSelector: Schema.optional(
              Schema.Record(Schema.String, Schema.String),
            ),
            tolerations: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  effect: Schema.optional(Schema.String),
                  key: Schema.optional(Schema.String),
                  operator: Schema.optional(Schema.String),
                  tolerationSeconds: Schema.optional(Schema.Number),
                  value: Schema.optional(Schema.String),
                }),
              ),
            ),
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
export type ListNodeV1RuntimeClassOutput =
  typeof ListNodeV1RuntimeClassOutput.Type;

// The operation
/**
 * list or watch objects of kind RuntimeClass
 */
export const listNodeV1RuntimeClass = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ListNodeV1RuntimeClassInput,
    outputSchema: ListNodeV1RuntimeClassOutput,
  }),
);
// Input Schema
export const PatchNodeV1RuntimeClassInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/node.k8s.io/v1/runtimeclasses/{name}",
    }),
  );
export type PatchNodeV1RuntimeClassInput =
  typeof PatchNodeV1RuntimeClassInput.Type;

// Output Schema
export const PatchNodeV1RuntimeClassOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    apiVersion: Schema.optional(Schema.String),
    handler: Schema.String,
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
    overhead: Schema.optional(
      Schema.Struct({
        podFixed: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      }),
    ),
    scheduling: Schema.optional(
      Schema.Struct({
        nodeSelector: Schema.optional(
          Schema.Record(Schema.String, Schema.String),
        ),
        tolerations: Schema.optional(
          Schema.Array(
            Schema.Struct({
              effect: Schema.optional(Schema.String),
              key: Schema.optional(Schema.String),
              operator: Schema.optional(Schema.String),
              tolerationSeconds: Schema.optional(Schema.Number),
              value: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
  });
export type PatchNodeV1RuntimeClassOutput =
  typeof PatchNodeV1RuntimeClassOutput.Type;

// The operation
/**
 * partially update the specified RuntimeClass
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchNodeV1RuntimeClass = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PatchNodeV1RuntimeClassInput,
    outputSchema: PatchNodeV1RuntimeClassOutput,
  }),
);
// Input Schema
export const ReadNodeV1RuntimeClassInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/node.k8s.io/v1/runtimeclasses/{name}",
    }),
  );
export type ReadNodeV1RuntimeClassInput =
  typeof ReadNodeV1RuntimeClassInput.Type;

// Output Schema
export const ReadNodeV1RuntimeClassOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    apiVersion: Schema.optional(Schema.String),
    handler: Schema.String,
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
    overhead: Schema.optional(
      Schema.Struct({
        podFixed: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      }),
    ),
    scheduling: Schema.optional(
      Schema.Struct({
        nodeSelector: Schema.optional(
          Schema.Record(Schema.String, Schema.String),
        ),
        tolerations: Schema.optional(
          Schema.Array(
            Schema.Struct({
              effect: Schema.optional(Schema.String),
              key: Schema.optional(Schema.String),
              operator: Schema.optional(Schema.String),
              tolerationSeconds: Schema.optional(Schema.Number),
              value: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
  });
export type ReadNodeV1RuntimeClassOutput =
  typeof ReadNodeV1RuntimeClassOutput.Type;

// The operation
/**
 * read the specified RuntimeClass
 */
export const readNodeV1RuntimeClass = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ReadNodeV1RuntimeClassInput,
    outputSchema: ReadNodeV1RuntimeClassOutput,
  }),
);
// Input Schema
export const ReplaceNodeV1RuntimeClassInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/node.k8s.io/v1/runtimeclasses/{name}",
    }),
  );
export type ReplaceNodeV1RuntimeClassInput =
  typeof ReplaceNodeV1RuntimeClassInput.Type;

// Output Schema
export const ReplaceNodeV1RuntimeClassOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    apiVersion: Schema.optional(Schema.String),
    handler: Schema.String,
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
    overhead: Schema.optional(
      Schema.Struct({
        podFixed: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      }),
    ),
    scheduling: Schema.optional(
      Schema.Struct({
        nodeSelector: Schema.optional(
          Schema.Record(Schema.String, Schema.String),
        ),
        tolerations: Schema.optional(
          Schema.Array(
            Schema.Struct({
              effect: Schema.optional(Schema.String),
              key: Schema.optional(Schema.String),
              operator: Schema.optional(Schema.String),
              tolerationSeconds: Schema.optional(Schema.Number),
              value: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
  });
export type ReplaceNodeV1RuntimeClassOutput =
  typeof ReplaceNodeV1RuntimeClassOutput.Type;

// The operation
/**
 * replace the specified RuntimeClass
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceNodeV1RuntimeClass = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ReplaceNodeV1RuntimeClassInput,
    outputSchema: ReplaceNodeV1RuntimeClassOutput,
  }),
);
// Input Schema
export const WatchNodeV1RuntimeClassInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/node.k8s.io/v1/watch/runtimeclasses/{name}",
    }),
  );
export type WatchNodeV1RuntimeClassInput =
  typeof WatchNodeV1RuntimeClassInput.Type;

// Output Schema
export const WatchNodeV1RuntimeClassOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchNodeV1RuntimeClassOutput =
  typeof WatchNodeV1RuntimeClassOutput.Type;

// The operation
/**
 * watch changes to an object of kind RuntimeClass. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
 */
export const watchNodeV1RuntimeClass = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WatchNodeV1RuntimeClassInput,
    outputSchema: WatchNodeV1RuntimeClassOutput,
  }),
);
// Input Schema
export const WatchNodeV1RuntimeClassListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/node.k8s.io/v1/watch/runtimeclasses",
    }),
  );
export type WatchNodeV1RuntimeClassListInput =
  typeof WatchNodeV1RuntimeClassListInput.Type;

// Output Schema
export const WatchNodeV1RuntimeClassListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchNodeV1RuntimeClassListOutput =
  typeof WatchNodeV1RuntimeClassListOutput.Type;

// The operation
/**
 * watch individual changes to a list of RuntimeClass. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchNodeV1RuntimeClassList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WatchNodeV1RuntimeClassListInput,
    outputSchema: WatchNodeV1RuntimeClassListOutput,
  }),
);
