/**
 * Kubernetes RBAC Authorization API
 *
 * Generated from the Kubernetes OpenAPI spec.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";

// Input Schema
export const CreateRbacAuthorizationV1ClusterRoleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/apis/rbac.authorization.k8s.io/v1/clusterroles",
    }),
  );
export type CreateRbacAuthorizationV1ClusterRoleInput =
  typeof CreateRbacAuthorizationV1ClusterRoleInput.Type;

// Output Schema
export const CreateRbacAuthorizationV1ClusterRoleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    aggregationRule: Schema.optional(
      Schema.Struct({
        clusterRoleSelectors: Schema.optional(
          Schema.Array(
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
        ),
      }),
    ),
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
    rules: Schema.optional(
      Schema.Array(
        Schema.Struct({
          apiGroups: Schema.optional(Schema.Array(Schema.String)),
          nonResourceURLs: Schema.optional(Schema.Array(Schema.String)),
          resourceNames: Schema.optional(Schema.Array(Schema.String)),
          resources: Schema.optional(Schema.Array(Schema.String)),
          verbs: Schema.Array(Schema.String),
        }),
      ),
    ),
  });
export type CreateRbacAuthorizationV1ClusterRoleOutput =
  typeof CreateRbacAuthorizationV1ClusterRoleOutput.Type;

// The operation
/**
 * create a ClusterRole
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const createRbacAuthorizationV1ClusterRole =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateRbacAuthorizationV1ClusterRoleInput,
    outputSchema: CreateRbacAuthorizationV1ClusterRoleOutput,
  }));
// Input Schema
export const CreateRbacAuthorizationV1ClusterRoleBindingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/apis/rbac.authorization.k8s.io/v1/clusterrolebindings",
    }),
  );
export type CreateRbacAuthorizationV1ClusterRoleBindingInput =
  typeof CreateRbacAuthorizationV1ClusterRoleBindingInput.Type;

// Output Schema
export const CreateRbacAuthorizationV1ClusterRoleBindingOutput =
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
    roleRef: Schema.Struct({
      apiGroup: Schema.optional(Schema.String),
      kind: Schema.String,
      name: Schema.String,
    }),
    subjects: Schema.optional(
      Schema.Array(
        Schema.Struct({
          apiGroup: Schema.optional(Schema.String),
          kind: Schema.String,
          name: Schema.String,
          namespace: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type CreateRbacAuthorizationV1ClusterRoleBindingOutput =
  typeof CreateRbacAuthorizationV1ClusterRoleBindingOutput.Type;

// The operation
/**
 * create a ClusterRoleBinding
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const createRbacAuthorizationV1ClusterRoleBinding =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateRbacAuthorizationV1ClusterRoleBindingInput,
    outputSchema: CreateRbacAuthorizationV1ClusterRoleBindingOutput,
  }));
// Input Schema
export const CreateRbacAuthorizationV1NamespacedRoleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/apis/rbac.authorization.k8s.io/v1/namespaces/{namespace}/roles",
    }),
  );
export type CreateRbacAuthorizationV1NamespacedRoleInput =
  typeof CreateRbacAuthorizationV1NamespacedRoleInput.Type;

// Output Schema
export const CreateRbacAuthorizationV1NamespacedRoleOutput =
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
    rules: Schema.optional(
      Schema.Array(
        Schema.Struct({
          apiGroups: Schema.optional(Schema.Array(Schema.String)),
          nonResourceURLs: Schema.optional(Schema.Array(Schema.String)),
          resourceNames: Schema.optional(Schema.Array(Schema.String)),
          resources: Schema.optional(Schema.Array(Schema.String)),
          verbs: Schema.Array(Schema.String),
        }),
      ),
    ),
  });
export type CreateRbacAuthorizationV1NamespacedRoleOutput =
  typeof CreateRbacAuthorizationV1NamespacedRoleOutput.Type;

// The operation
/**
 * create a Role
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const createRbacAuthorizationV1NamespacedRole =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateRbacAuthorizationV1NamespacedRoleInput,
    outputSchema: CreateRbacAuthorizationV1NamespacedRoleOutput,
  }));
// Input Schema
export const CreateRbacAuthorizationV1NamespacedRoleBindingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/apis/rbac.authorization.k8s.io/v1/namespaces/{namespace}/rolebindings",
    }),
  );
export type CreateRbacAuthorizationV1NamespacedRoleBindingInput =
  typeof CreateRbacAuthorizationV1NamespacedRoleBindingInput.Type;

// Output Schema
export const CreateRbacAuthorizationV1NamespacedRoleBindingOutput =
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
    roleRef: Schema.Struct({
      apiGroup: Schema.optional(Schema.String),
      kind: Schema.String,
      name: Schema.String,
    }),
    subjects: Schema.optional(
      Schema.Array(
        Schema.Struct({
          apiGroup: Schema.optional(Schema.String),
          kind: Schema.String,
          name: Schema.String,
          namespace: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type CreateRbacAuthorizationV1NamespacedRoleBindingOutput =
  typeof CreateRbacAuthorizationV1NamespacedRoleBindingOutput.Type;

// The operation
/**
 * create a RoleBinding
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const createRbacAuthorizationV1NamespacedRoleBinding =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateRbacAuthorizationV1NamespacedRoleBindingInput,
    outputSchema: CreateRbacAuthorizationV1NamespacedRoleBindingOutput,
  }));
// Input Schema
export const DeleteRbacAuthorizationV1ClusterRoleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/rbac.authorization.k8s.io/v1/clusterroles/{name}",
    }),
  );
export type DeleteRbacAuthorizationV1ClusterRoleInput =
  typeof DeleteRbacAuthorizationV1ClusterRoleInput.Type;

// Output Schema
export const DeleteRbacAuthorizationV1ClusterRoleOutput =
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
export type DeleteRbacAuthorizationV1ClusterRoleOutput =
  typeof DeleteRbacAuthorizationV1ClusterRoleOutput.Type;

// The operation
/**
 * delete a ClusterRole
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteRbacAuthorizationV1ClusterRole =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteRbacAuthorizationV1ClusterRoleInput,
    outputSchema: DeleteRbacAuthorizationV1ClusterRoleOutput,
  }));
// Input Schema
export const DeleteRbacAuthorizationV1ClusterRoleBindingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/rbac.authorization.k8s.io/v1/clusterrolebindings/{name}",
    }),
  );
export type DeleteRbacAuthorizationV1ClusterRoleBindingInput =
  typeof DeleteRbacAuthorizationV1ClusterRoleBindingInput.Type;

// Output Schema
export const DeleteRbacAuthorizationV1ClusterRoleBindingOutput =
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
export type DeleteRbacAuthorizationV1ClusterRoleBindingOutput =
  typeof DeleteRbacAuthorizationV1ClusterRoleBindingOutput.Type;

// The operation
/**
 * delete a ClusterRoleBinding
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteRbacAuthorizationV1ClusterRoleBinding =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteRbacAuthorizationV1ClusterRoleBindingInput,
    outputSchema: DeleteRbacAuthorizationV1ClusterRoleBindingOutput,
  }));
// Input Schema
export const DeleteRbacAuthorizationV1CollectionClusterRoleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/rbac.authorization.k8s.io/v1/clusterroles",
    }),
  );
export type DeleteRbacAuthorizationV1CollectionClusterRoleInput =
  typeof DeleteRbacAuthorizationV1CollectionClusterRoleInput.Type;

// Output Schema
export const DeleteRbacAuthorizationV1CollectionClusterRoleOutput =
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
export type DeleteRbacAuthorizationV1CollectionClusterRoleOutput =
  typeof DeleteRbacAuthorizationV1CollectionClusterRoleOutput.Type;

// The operation
/**
 * delete collection of ClusterRole
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteRbacAuthorizationV1CollectionClusterRole =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteRbacAuthorizationV1CollectionClusterRoleInput,
    outputSchema: DeleteRbacAuthorizationV1CollectionClusterRoleOutput,
  }));
// Input Schema
export const DeleteRbacAuthorizationV1CollectionClusterRoleBindingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/rbac.authorization.k8s.io/v1/clusterrolebindings",
    }),
  );
export type DeleteRbacAuthorizationV1CollectionClusterRoleBindingInput =
  typeof DeleteRbacAuthorizationV1CollectionClusterRoleBindingInput.Type;

// Output Schema
export const DeleteRbacAuthorizationV1CollectionClusterRoleBindingOutput =
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
export type DeleteRbacAuthorizationV1CollectionClusterRoleBindingOutput =
  typeof DeleteRbacAuthorizationV1CollectionClusterRoleBindingOutput.Type;

// The operation
/**
 * delete collection of ClusterRoleBinding
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteRbacAuthorizationV1CollectionClusterRoleBinding =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteRbacAuthorizationV1CollectionClusterRoleBindingInput,
    outputSchema: DeleteRbacAuthorizationV1CollectionClusterRoleBindingOutput,
  }));
// Input Schema
export const DeleteRbacAuthorizationV1CollectionNamespacedRoleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/rbac.authorization.k8s.io/v1/namespaces/{namespace}/roles",
    }),
  );
export type DeleteRbacAuthorizationV1CollectionNamespacedRoleInput =
  typeof DeleteRbacAuthorizationV1CollectionNamespacedRoleInput.Type;

// Output Schema
export const DeleteRbacAuthorizationV1CollectionNamespacedRoleOutput =
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
export type DeleteRbacAuthorizationV1CollectionNamespacedRoleOutput =
  typeof DeleteRbacAuthorizationV1CollectionNamespacedRoleOutput.Type;

// The operation
/**
 * delete collection of Role
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteRbacAuthorizationV1CollectionNamespacedRole =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteRbacAuthorizationV1CollectionNamespacedRoleInput,
    outputSchema: DeleteRbacAuthorizationV1CollectionNamespacedRoleOutput,
  }));
// Input Schema
export const DeleteRbacAuthorizationV1CollectionNamespacedRoleBindingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/rbac.authorization.k8s.io/v1/namespaces/{namespace}/rolebindings",
    }),
  );
export type DeleteRbacAuthorizationV1CollectionNamespacedRoleBindingInput =
  typeof DeleteRbacAuthorizationV1CollectionNamespacedRoleBindingInput.Type;

// Output Schema
export const DeleteRbacAuthorizationV1CollectionNamespacedRoleBindingOutput =
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
export type DeleteRbacAuthorizationV1CollectionNamespacedRoleBindingOutput =
  typeof DeleteRbacAuthorizationV1CollectionNamespacedRoleBindingOutput.Type;

// The operation
/**
 * delete collection of RoleBinding
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteRbacAuthorizationV1CollectionNamespacedRoleBinding =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteRbacAuthorizationV1CollectionNamespacedRoleBindingInput,
    outputSchema:
      DeleteRbacAuthorizationV1CollectionNamespacedRoleBindingOutput,
  }));
// Input Schema
export const DeleteRbacAuthorizationV1NamespacedRoleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/rbac.authorization.k8s.io/v1/namespaces/{namespace}/roles/{name}",
    }),
  );
export type DeleteRbacAuthorizationV1NamespacedRoleInput =
  typeof DeleteRbacAuthorizationV1NamespacedRoleInput.Type;

// Output Schema
export const DeleteRbacAuthorizationV1NamespacedRoleOutput =
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
export type DeleteRbacAuthorizationV1NamespacedRoleOutput =
  typeof DeleteRbacAuthorizationV1NamespacedRoleOutput.Type;

// The operation
/**
 * delete a Role
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteRbacAuthorizationV1NamespacedRole =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteRbacAuthorizationV1NamespacedRoleInput,
    outputSchema: DeleteRbacAuthorizationV1NamespacedRoleOutput,
  }));
// Input Schema
export const DeleteRbacAuthorizationV1NamespacedRoleBindingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/rbac.authorization.k8s.io/v1/namespaces/{namespace}/rolebindings/{name}",
    }),
  );
export type DeleteRbacAuthorizationV1NamespacedRoleBindingInput =
  typeof DeleteRbacAuthorizationV1NamespacedRoleBindingInput.Type;

// Output Schema
export const DeleteRbacAuthorizationV1NamespacedRoleBindingOutput =
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
export type DeleteRbacAuthorizationV1NamespacedRoleBindingOutput =
  typeof DeleteRbacAuthorizationV1NamespacedRoleBindingOutput.Type;

// The operation
/**
 * delete a RoleBinding
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteRbacAuthorizationV1NamespacedRoleBinding =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteRbacAuthorizationV1NamespacedRoleBindingInput,
    outputSchema: DeleteRbacAuthorizationV1NamespacedRoleBindingOutput,
  }));
// Input Schema
export const GetRbacAuthorizationAPIGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/apis/rbac.authorization.k8s.io/" }),
  );
export type GetRbacAuthorizationAPIGroupInput =
  typeof GetRbacAuthorizationAPIGroupInput.Type;

// Output Schema
export const GetRbacAuthorizationAPIGroupOutput =
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
export type GetRbacAuthorizationAPIGroupOutput =
  typeof GetRbacAuthorizationAPIGroupOutput.Type;

// The operation
/**
 * get information of a group
 */
export const getRbacAuthorizationAPIGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetRbacAuthorizationAPIGroupInput,
    outputSchema: GetRbacAuthorizationAPIGroupOutput,
  }));
// Input Schema
export const GetRbacAuthorizationV1APIResourcesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/apis/rbac.authorization.k8s.io/v1/" }),
  );
export type GetRbacAuthorizationV1APIResourcesInput =
  typeof GetRbacAuthorizationV1APIResourcesInput.Type;

// Output Schema
export const GetRbacAuthorizationV1APIResourcesOutput =
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
export type GetRbacAuthorizationV1APIResourcesOutput =
  typeof GetRbacAuthorizationV1APIResourcesOutput.Type;

// The operation
/**
 * get available resources
 */
export const getRbacAuthorizationV1APIResources =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetRbacAuthorizationV1APIResourcesInput,
    outputSchema: GetRbacAuthorizationV1APIResourcesOutput,
  }));
// Input Schema
export const ListRbacAuthorizationV1ClusterRoleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/rbac.authorization.k8s.io/v1/clusterroles",
    }),
  );
export type ListRbacAuthorizationV1ClusterRoleInput =
  typeof ListRbacAuthorizationV1ClusterRoleInput.Type;

// Output Schema
export const ListRbacAuthorizationV1ClusterRoleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    apiVersion: Schema.optional(Schema.String),
    items: Schema.Array(
      Schema.Struct({
        aggregationRule: Schema.optional(
          Schema.Struct({
            clusterRoleSelectors: Schema.optional(
              Schema.Array(
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
            ),
          }),
        ),
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
        rules: Schema.optional(
          Schema.Array(
            Schema.Struct({
              apiGroups: Schema.optional(Schema.Array(Schema.String)),
              nonResourceURLs: Schema.optional(Schema.Array(Schema.String)),
              resourceNames: Schema.optional(Schema.Array(Schema.String)),
              resources: Schema.optional(Schema.Array(Schema.String)),
              verbs: Schema.Array(Schema.String),
            }),
          ),
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
export type ListRbacAuthorizationV1ClusterRoleOutput =
  typeof ListRbacAuthorizationV1ClusterRoleOutput.Type;

// The operation
/**
 * list or watch objects of kind ClusterRole
 */
export const listRbacAuthorizationV1ClusterRole =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListRbacAuthorizationV1ClusterRoleInput,
    outputSchema: ListRbacAuthorizationV1ClusterRoleOutput,
  }));
// Input Schema
export const ListRbacAuthorizationV1ClusterRoleBindingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/rbac.authorization.k8s.io/v1/clusterrolebindings",
    }),
  );
export type ListRbacAuthorizationV1ClusterRoleBindingInput =
  typeof ListRbacAuthorizationV1ClusterRoleBindingInput.Type;

// Output Schema
export const ListRbacAuthorizationV1ClusterRoleBindingOutput =
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
        roleRef: Schema.Struct({
          apiGroup: Schema.optional(Schema.String),
          kind: Schema.String,
          name: Schema.String,
        }),
        subjects: Schema.optional(
          Schema.Array(
            Schema.Struct({
              apiGroup: Schema.optional(Schema.String),
              kind: Schema.String,
              name: Schema.String,
              namespace: Schema.optional(Schema.String),
            }),
          ),
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
export type ListRbacAuthorizationV1ClusterRoleBindingOutput =
  typeof ListRbacAuthorizationV1ClusterRoleBindingOutput.Type;

// The operation
/**
 * list or watch objects of kind ClusterRoleBinding
 */
export const listRbacAuthorizationV1ClusterRoleBinding =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListRbacAuthorizationV1ClusterRoleBindingInput,
    outputSchema: ListRbacAuthorizationV1ClusterRoleBindingOutput,
  }));
// Input Schema
export const ListRbacAuthorizationV1NamespacedRoleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/rbac.authorization.k8s.io/v1/namespaces/{namespace}/roles",
    }),
  );
export type ListRbacAuthorizationV1NamespacedRoleInput =
  typeof ListRbacAuthorizationV1NamespacedRoleInput.Type;

// Output Schema
export const ListRbacAuthorizationV1NamespacedRoleOutput =
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
        rules: Schema.optional(
          Schema.Array(
            Schema.Struct({
              apiGroups: Schema.optional(Schema.Array(Schema.String)),
              nonResourceURLs: Schema.optional(Schema.Array(Schema.String)),
              resourceNames: Schema.optional(Schema.Array(Schema.String)),
              resources: Schema.optional(Schema.Array(Schema.String)),
              verbs: Schema.Array(Schema.String),
            }),
          ),
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
export type ListRbacAuthorizationV1NamespacedRoleOutput =
  typeof ListRbacAuthorizationV1NamespacedRoleOutput.Type;

// The operation
/**
 * list or watch objects of kind Role
 */
export const listRbacAuthorizationV1NamespacedRole =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListRbacAuthorizationV1NamespacedRoleInput,
    outputSchema: ListRbacAuthorizationV1NamespacedRoleOutput,
  }));
// Input Schema
export const ListRbacAuthorizationV1NamespacedRoleBindingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/rbac.authorization.k8s.io/v1/namespaces/{namespace}/rolebindings",
    }),
  );
export type ListRbacAuthorizationV1NamespacedRoleBindingInput =
  typeof ListRbacAuthorizationV1NamespacedRoleBindingInput.Type;

// Output Schema
export const ListRbacAuthorizationV1NamespacedRoleBindingOutput =
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
        roleRef: Schema.Struct({
          apiGroup: Schema.optional(Schema.String),
          kind: Schema.String,
          name: Schema.String,
        }),
        subjects: Schema.optional(
          Schema.Array(
            Schema.Struct({
              apiGroup: Schema.optional(Schema.String),
              kind: Schema.String,
              name: Schema.String,
              namespace: Schema.optional(Schema.String),
            }),
          ),
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
export type ListRbacAuthorizationV1NamespacedRoleBindingOutput =
  typeof ListRbacAuthorizationV1NamespacedRoleBindingOutput.Type;

// The operation
/**
 * list or watch objects of kind RoleBinding
 */
export const listRbacAuthorizationV1NamespacedRoleBinding =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListRbacAuthorizationV1NamespacedRoleBindingInput,
    outputSchema: ListRbacAuthorizationV1NamespacedRoleBindingOutput,
  }));
// Input Schema
export const ListRbacAuthorizationV1RoleBindingForAllNamespacesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/rbac.authorization.k8s.io/v1/rolebindings",
    }),
  );
export type ListRbacAuthorizationV1RoleBindingForAllNamespacesInput =
  typeof ListRbacAuthorizationV1RoleBindingForAllNamespacesInput.Type;

// Output Schema
export const ListRbacAuthorizationV1RoleBindingForAllNamespacesOutput =
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
        roleRef: Schema.Struct({
          apiGroup: Schema.optional(Schema.String),
          kind: Schema.String,
          name: Schema.String,
        }),
        subjects: Schema.optional(
          Schema.Array(
            Schema.Struct({
              apiGroup: Schema.optional(Schema.String),
              kind: Schema.String,
              name: Schema.String,
              namespace: Schema.optional(Schema.String),
            }),
          ),
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
export type ListRbacAuthorizationV1RoleBindingForAllNamespacesOutput =
  typeof ListRbacAuthorizationV1RoleBindingForAllNamespacesOutput.Type;

// The operation
/**
 * list or watch objects of kind RoleBinding
 */
export const listRbacAuthorizationV1RoleBindingForAllNamespaces =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListRbacAuthorizationV1RoleBindingForAllNamespacesInput,
    outputSchema: ListRbacAuthorizationV1RoleBindingForAllNamespacesOutput,
  }));
// Input Schema
export const ListRbacAuthorizationV1RoleForAllNamespacesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/apis/rbac.authorization.k8s.io/v1/roles" }),
  );
export type ListRbacAuthorizationV1RoleForAllNamespacesInput =
  typeof ListRbacAuthorizationV1RoleForAllNamespacesInput.Type;

// Output Schema
export const ListRbacAuthorizationV1RoleForAllNamespacesOutput =
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
        rules: Schema.optional(
          Schema.Array(
            Schema.Struct({
              apiGroups: Schema.optional(Schema.Array(Schema.String)),
              nonResourceURLs: Schema.optional(Schema.Array(Schema.String)),
              resourceNames: Schema.optional(Schema.Array(Schema.String)),
              resources: Schema.optional(Schema.Array(Schema.String)),
              verbs: Schema.Array(Schema.String),
            }),
          ),
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
export type ListRbacAuthorizationV1RoleForAllNamespacesOutput =
  typeof ListRbacAuthorizationV1RoleForAllNamespacesOutput.Type;

// The operation
/**
 * list or watch objects of kind Role
 */
export const listRbacAuthorizationV1RoleForAllNamespaces =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListRbacAuthorizationV1RoleForAllNamespacesInput,
    outputSchema: ListRbacAuthorizationV1RoleForAllNamespacesOutput,
  }));
// Input Schema
export const PatchRbacAuthorizationV1ClusterRoleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/rbac.authorization.k8s.io/v1/clusterroles/{name}",
    }),
  );
export type PatchRbacAuthorizationV1ClusterRoleInput =
  typeof PatchRbacAuthorizationV1ClusterRoleInput.Type;

// Output Schema
export const PatchRbacAuthorizationV1ClusterRoleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    aggregationRule: Schema.optional(
      Schema.Struct({
        clusterRoleSelectors: Schema.optional(
          Schema.Array(
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
        ),
      }),
    ),
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
    rules: Schema.optional(
      Schema.Array(
        Schema.Struct({
          apiGroups: Schema.optional(Schema.Array(Schema.String)),
          nonResourceURLs: Schema.optional(Schema.Array(Schema.String)),
          resourceNames: Schema.optional(Schema.Array(Schema.String)),
          resources: Schema.optional(Schema.Array(Schema.String)),
          verbs: Schema.Array(Schema.String),
        }),
      ),
    ),
  });
export type PatchRbacAuthorizationV1ClusterRoleOutput =
  typeof PatchRbacAuthorizationV1ClusterRoleOutput.Type;

// The operation
/**
 * partially update the specified ClusterRole
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchRbacAuthorizationV1ClusterRole =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PatchRbacAuthorizationV1ClusterRoleInput,
    outputSchema: PatchRbacAuthorizationV1ClusterRoleOutput,
  }));
// Input Schema
export const PatchRbacAuthorizationV1ClusterRoleBindingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/rbac.authorization.k8s.io/v1/clusterrolebindings/{name}",
    }),
  );
export type PatchRbacAuthorizationV1ClusterRoleBindingInput =
  typeof PatchRbacAuthorizationV1ClusterRoleBindingInput.Type;

// Output Schema
export const PatchRbacAuthorizationV1ClusterRoleBindingOutput =
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
    roleRef: Schema.Struct({
      apiGroup: Schema.optional(Schema.String),
      kind: Schema.String,
      name: Schema.String,
    }),
    subjects: Schema.optional(
      Schema.Array(
        Schema.Struct({
          apiGroup: Schema.optional(Schema.String),
          kind: Schema.String,
          name: Schema.String,
          namespace: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type PatchRbacAuthorizationV1ClusterRoleBindingOutput =
  typeof PatchRbacAuthorizationV1ClusterRoleBindingOutput.Type;

// The operation
/**
 * partially update the specified ClusterRoleBinding
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchRbacAuthorizationV1ClusterRoleBinding =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PatchRbacAuthorizationV1ClusterRoleBindingInput,
    outputSchema: PatchRbacAuthorizationV1ClusterRoleBindingOutput,
  }));
// Input Schema
export const PatchRbacAuthorizationV1NamespacedRoleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/rbac.authorization.k8s.io/v1/namespaces/{namespace}/roles/{name}",
    }),
  );
export type PatchRbacAuthorizationV1NamespacedRoleInput =
  typeof PatchRbacAuthorizationV1NamespacedRoleInput.Type;

// Output Schema
export const PatchRbacAuthorizationV1NamespacedRoleOutput =
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
    rules: Schema.optional(
      Schema.Array(
        Schema.Struct({
          apiGroups: Schema.optional(Schema.Array(Schema.String)),
          nonResourceURLs: Schema.optional(Schema.Array(Schema.String)),
          resourceNames: Schema.optional(Schema.Array(Schema.String)),
          resources: Schema.optional(Schema.Array(Schema.String)),
          verbs: Schema.Array(Schema.String),
        }),
      ),
    ),
  });
export type PatchRbacAuthorizationV1NamespacedRoleOutput =
  typeof PatchRbacAuthorizationV1NamespacedRoleOutput.Type;

// The operation
/**
 * partially update the specified Role
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchRbacAuthorizationV1NamespacedRole =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PatchRbacAuthorizationV1NamespacedRoleInput,
    outputSchema: PatchRbacAuthorizationV1NamespacedRoleOutput,
  }));
// Input Schema
export const PatchRbacAuthorizationV1NamespacedRoleBindingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/rbac.authorization.k8s.io/v1/namespaces/{namespace}/rolebindings/{name}",
    }),
  );
export type PatchRbacAuthorizationV1NamespacedRoleBindingInput =
  typeof PatchRbacAuthorizationV1NamespacedRoleBindingInput.Type;

// Output Schema
export const PatchRbacAuthorizationV1NamespacedRoleBindingOutput =
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
    roleRef: Schema.Struct({
      apiGroup: Schema.optional(Schema.String),
      kind: Schema.String,
      name: Schema.String,
    }),
    subjects: Schema.optional(
      Schema.Array(
        Schema.Struct({
          apiGroup: Schema.optional(Schema.String),
          kind: Schema.String,
          name: Schema.String,
          namespace: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type PatchRbacAuthorizationV1NamespacedRoleBindingOutput =
  typeof PatchRbacAuthorizationV1NamespacedRoleBindingOutput.Type;

// The operation
/**
 * partially update the specified RoleBinding
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchRbacAuthorizationV1NamespacedRoleBinding =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PatchRbacAuthorizationV1NamespacedRoleBindingInput,
    outputSchema: PatchRbacAuthorizationV1NamespacedRoleBindingOutput,
  }));
// Input Schema
export const ReadRbacAuthorizationV1ClusterRoleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/rbac.authorization.k8s.io/v1/clusterroles/{name}",
    }),
  );
export type ReadRbacAuthorizationV1ClusterRoleInput =
  typeof ReadRbacAuthorizationV1ClusterRoleInput.Type;

// Output Schema
export const ReadRbacAuthorizationV1ClusterRoleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    aggregationRule: Schema.optional(
      Schema.Struct({
        clusterRoleSelectors: Schema.optional(
          Schema.Array(
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
        ),
      }),
    ),
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
    rules: Schema.optional(
      Schema.Array(
        Schema.Struct({
          apiGroups: Schema.optional(Schema.Array(Schema.String)),
          nonResourceURLs: Schema.optional(Schema.Array(Schema.String)),
          resourceNames: Schema.optional(Schema.Array(Schema.String)),
          resources: Schema.optional(Schema.Array(Schema.String)),
          verbs: Schema.Array(Schema.String),
        }),
      ),
    ),
  });
export type ReadRbacAuthorizationV1ClusterRoleOutput =
  typeof ReadRbacAuthorizationV1ClusterRoleOutput.Type;

// The operation
/**
 * read the specified ClusterRole
 */
export const readRbacAuthorizationV1ClusterRole =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReadRbacAuthorizationV1ClusterRoleInput,
    outputSchema: ReadRbacAuthorizationV1ClusterRoleOutput,
  }));
// Input Schema
export const ReadRbacAuthorizationV1ClusterRoleBindingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/rbac.authorization.k8s.io/v1/clusterrolebindings/{name}",
    }),
  );
export type ReadRbacAuthorizationV1ClusterRoleBindingInput =
  typeof ReadRbacAuthorizationV1ClusterRoleBindingInput.Type;

// Output Schema
export const ReadRbacAuthorizationV1ClusterRoleBindingOutput =
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
    roleRef: Schema.Struct({
      apiGroup: Schema.optional(Schema.String),
      kind: Schema.String,
      name: Schema.String,
    }),
    subjects: Schema.optional(
      Schema.Array(
        Schema.Struct({
          apiGroup: Schema.optional(Schema.String),
          kind: Schema.String,
          name: Schema.String,
          namespace: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type ReadRbacAuthorizationV1ClusterRoleBindingOutput =
  typeof ReadRbacAuthorizationV1ClusterRoleBindingOutput.Type;

// The operation
/**
 * read the specified ClusterRoleBinding
 */
export const readRbacAuthorizationV1ClusterRoleBinding =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReadRbacAuthorizationV1ClusterRoleBindingInput,
    outputSchema: ReadRbacAuthorizationV1ClusterRoleBindingOutput,
  }));
// Input Schema
export const ReadRbacAuthorizationV1NamespacedRoleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/rbac.authorization.k8s.io/v1/namespaces/{namespace}/roles/{name}",
    }),
  );
export type ReadRbacAuthorizationV1NamespacedRoleInput =
  typeof ReadRbacAuthorizationV1NamespacedRoleInput.Type;

// Output Schema
export const ReadRbacAuthorizationV1NamespacedRoleOutput =
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
    rules: Schema.optional(
      Schema.Array(
        Schema.Struct({
          apiGroups: Schema.optional(Schema.Array(Schema.String)),
          nonResourceURLs: Schema.optional(Schema.Array(Schema.String)),
          resourceNames: Schema.optional(Schema.Array(Schema.String)),
          resources: Schema.optional(Schema.Array(Schema.String)),
          verbs: Schema.Array(Schema.String),
        }),
      ),
    ),
  });
export type ReadRbacAuthorizationV1NamespacedRoleOutput =
  typeof ReadRbacAuthorizationV1NamespacedRoleOutput.Type;

// The operation
/**
 * read the specified Role
 */
export const readRbacAuthorizationV1NamespacedRole =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReadRbacAuthorizationV1NamespacedRoleInput,
    outputSchema: ReadRbacAuthorizationV1NamespacedRoleOutput,
  }));
// Input Schema
export const ReadRbacAuthorizationV1NamespacedRoleBindingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/rbac.authorization.k8s.io/v1/namespaces/{namespace}/rolebindings/{name}",
    }),
  );
export type ReadRbacAuthorizationV1NamespacedRoleBindingInput =
  typeof ReadRbacAuthorizationV1NamespacedRoleBindingInput.Type;

// Output Schema
export const ReadRbacAuthorizationV1NamespacedRoleBindingOutput =
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
    roleRef: Schema.Struct({
      apiGroup: Schema.optional(Schema.String),
      kind: Schema.String,
      name: Schema.String,
    }),
    subjects: Schema.optional(
      Schema.Array(
        Schema.Struct({
          apiGroup: Schema.optional(Schema.String),
          kind: Schema.String,
          name: Schema.String,
          namespace: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type ReadRbacAuthorizationV1NamespacedRoleBindingOutput =
  typeof ReadRbacAuthorizationV1NamespacedRoleBindingOutput.Type;

// The operation
/**
 * read the specified RoleBinding
 */
export const readRbacAuthorizationV1NamespacedRoleBinding =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReadRbacAuthorizationV1NamespacedRoleBindingInput,
    outputSchema: ReadRbacAuthorizationV1NamespacedRoleBindingOutput,
  }));
// Input Schema
export const ReplaceRbacAuthorizationV1ClusterRoleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/rbac.authorization.k8s.io/v1/clusterroles/{name}",
    }),
  );
export type ReplaceRbacAuthorizationV1ClusterRoleInput =
  typeof ReplaceRbacAuthorizationV1ClusterRoleInput.Type;

// Output Schema
export const ReplaceRbacAuthorizationV1ClusterRoleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    aggregationRule: Schema.optional(
      Schema.Struct({
        clusterRoleSelectors: Schema.optional(
          Schema.Array(
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
        ),
      }),
    ),
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
    rules: Schema.optional(
      Schema.Array(
        Schema.Struct({
          apiGroups: Schema.optional(Schema.Array(Schema.String)),
          nonResourceURLs: Schema.optional(Schema.Array(Schema.String)),
          resourceNames: Schema.optional(Schema.Array(Schema.String)),
          resources: Schema.optional(Schema.Array(Schema.String)),
          verbs: Schema.Array(Schema.String),
        }),
      ),
    ),
  });
export type ReplaceRbacAuthorizationV1ClusterRoleOutput =
  typeof ReplaceRbacAuthorizationV1ClusterRoleOutput.Type;

// The operation
/**
 * replace the specified ClusterRole
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceRbacAuthorizationV1ClusterRole =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReplaceRbacAuthorizationV1ClusterRoleInput,
    outputSchema: ReplaceRbacAuthorizationV1ClusterRoleOutput,
  }));
// Input Schema
export const ReplaceRbacAuthorizationV1ClusterRoleBindingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/rbac.authorization.k8s.io/v1/clusterrolebindings/{name}",
    }),
  );
export type ReplaceRbacAuthorizationV1ClusterRoleBindingInput =
  typeof ReplaceRbacAuthorizationV1ClusterRoleBindingInput.Type;

// Output Schema
export const ReplaceRbacAuthorizationV1ClusterRoleBindingOutput =
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
    roleRef: Schema.Struct({
      apiGroup: Schema.optional(Schema.String),
      kind: Schema.String,
      name: Schema.String,
    }),
    subjects: Schema.optional(
      Schema.Array(
        Schema.Struct({
          apiGroup: Schema.optional(Schema.String),
          kind: Schema.String,
          name: Schema.String,
          namespace: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type ReplaceRbacAuthorizationV1ClusterRoleBindingOutput =
  typeof ReplaceRbacAuthorizationV1ClusterRoleBindingOutput.Type;

// The operation
/**
 * replace the specified ClusterRoleBinding
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceRbacAuthorizationV1ClusterRoleBinding =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReplaceRbacAuthorizationV1ClusterRoleBindingInput,
    outputSchema: ReplaceRbacAuthorizationV1ClusterRoleBindingOutput,
  }));
// Input Schema
export const ReplaceRbacAuthorizationV1NamespacedRoleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/rbac.authorization.k8s.io/v1/namespaces/{namespace}/roles/{name}",
    }),
  );
export type ReplaceRbacAuthorizationV1NamespacedRoleInput =
  typeof ReplaceRbacAuthorizationV1NamespacedRoleInput.Type;

// Output Schema
export const ReplaceRbacAuthorizationV1NamespacedRoleOutput =
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
    rules: Schema.optional(
      Schema.Array(
        Schema.Struct({
          apiGroups: Schema.optional(Schema.Array(Schema.String)),
          nonResourceURLs: Schema.optional(Schema.Array(Schema.String)),
          resourceNames: Schema.optional(Schema.Array(Schema.String)),
          resources: Schema.optional(Schema.Array(Schema.String)),
          verbs: Schema.Array(Schema.String),
        }),
      ),
    ),
  });
export type ReplaceRbacAuthorizationV1NamespacedRoleOutput =
  typeof ReplaceRbacAuthorizationV1NamespacedRoleOutput.Type;

// The operation
/**
 * replace the specified Role
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceRbacAuthorizationV1NamespacedRole =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReplaceRbacAuthorizationV1NamespacedRoleInput,
    outputSchema: ReplaceRbacAuthorizationV1NamespacedRoleOutput,
  }));
// Input Schema
export const ReplaceRbacAuthorizationV1NamespacedRoleBindingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/rbac.authorization.k8s.io/v1/namespaces/{namespace}/rolebindings/{name}",
    }),
  );
export type ReplaceRbacAuthorizationV1NamespacedRoleBindingInput =
  typeof ReplaceRbacAuthorizationV1NamespacedRoleBindingInput.Type;

// Output Schema
export const ReplaceRbacAuthorizationV1NamespacedRoleBindingOutput =
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
    roleRef: Schema.Struct({
      apiGroup: Schema.optional(Schema.String),
      kind: Schema.String,
      name: Schema.String,
    }),
    subjects: Schema.optional(
      Schema.Array(
        Schema.Struct({
          apiGroup: Schema.optional(Schema.String),
          kind: Schema.String,
          name: Schema.String,
          namespace: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type ReplaceRbacAuthorizationV1NamespacedRoleBindingOutput =
  typeof ReplaceRbacAuthorizationV1NamespacedRoleBindingOutput.Type;

// The operation
/**
 * replace the specified RoleBinding
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceRbacAuthorizationV1NamespacedRoleBinding =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReplaceRbacAuthorizationV1NamespacedRoleBindingInput,
    outputSchema: ReplaceRbacAuthorizationV1NamespacedRoleBindingOutput,
  }));
// Input Schema
export const WatchRbacAuthorizationV1ClusterRoleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/rbac.authorization.k8s.io/v1/watch/clusterroles/{name}",
    }),
  );
export type WatchRbacAuthorizationV1ClusterRoleInput =
  typeof WatchRbacAuthorizationV1ClusterRoleInput.Type;

// Output Schema
export const WatchRbacAuthorizationV1ClusterRoleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchRbacAuthorizationV1ClusterRoleOutput =
  typeof WatchRbacAuthorizationV1ClusterRoleOutput.Type;

// The operation
/**
 * watch changes to an object of kind ClusterRole. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
 */
export const watchRbacAuthorizationV1ClusterRole =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchRbacAuthorizationV1ClusterRoleInput,
    outputSchema: WatchRbacAuthorizationV1ClusterRoleOutput,
  }));
// Input Schema
export const WatchRbacAuthorizationV1ClusterRoleBindingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/rbac.authorization.k8s.io/v1/watch/clusterrolebindings/{name}",
    }),
  );
export type WatchRbacAuthorizationV1ClusterRoleBindingInput =
  typeof WatchRbacAuthorizationV1ClusterRoleBindingInput.Type;

// Output Schema
export const WatchRbacAuthorizationV1ClusterRoleBindingOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchRbacAuthorizationV1ClusterRoleBindingOutput =
  typeof WatchRbacAuthorizationV1ClusterRoleBindingOutput.Type;

// The operation
/**
 * watch changes to an object of kind ClusterRoleBinding. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
 */
export const watchRbacAuthorizationV1ClusterRoleBinding =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchRbacAuthorizationV1ClusterRoleBindingInput,
    outputSchema: WatchRbacAuthorizationV1ClusterRoleBindingOutput,
  }));
// Input Schema
export const WatchRbacAuthorizationV1ClusterRoleBindingListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/rbac.authorization.k8s.io/v1/watch/clusterrolebindings",
    }),
  );
export type WatchRbacAuthorizationV1ClusterRoleBindingListInput =
  typeof WatchRbacAuthorizationV1ClusterRoleBindingListInput.Type;

// Output Schema
export const WatchRbacAuthorizationV1ClusterRoleBindingListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchRbacAuthorizationV1ClusterRoleBindingListOutput =
  typeof WatchRbacAuthorizationV1ClusterRoleBindingListOutput.Type;

// The operation
/**
 * watch individual changes to a list of ClusterRoleBinding. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchRbacAuthorizationV1ClusterRoleBindingList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchRbacAuthorizationV1ClusterRoleBindingListInput,
    outputSchema: WatchRbacAuthorizationV1ClusterRoleBindingListOutput,
  }));
// Input Schema
export const WatchRbacAuthorizationV1ClusterRoleListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/rbac.authorization.k8s.io/v1/watch/clusterroles",
    }),
  );
export type WatchRbacAuthorizationV1ClusterRoleListInput =
  typeof WatchRbacAuthorizationV1ClusterRoleListInput.Type;

// Output Schema
export const WatchRbacAuthorizationV1ClusterRoleListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchRbacAuthorizationV1ClusterRoleListOutput =
  typeof WatchRbacAuthorizationV1ClusterRoleListOutput.Type;

// The operation
/**
 * watch individual changes to a list of ClusterRole. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchRbacAuthorizationV1ClusterRoleList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchRbacAuthorizationV1ClusterRoleListInput,
    outputSchema: WatchRbacAuthorizationV1ClusterRoleListOutput,
  }));
// Input Schema
export const WatchRbacAuthorizationV1NamespacedRoleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/rbac.authorization.k8s.io/v1/watch/namespaces/{namespace}/roles/{name}",
    }),
  );
export type WatchRbacAuthorizationV1NamespacedRoleInput =
  typeof WatchRbacAuthorizationV1NamespacedRoleInput.Type;

// Output Schema
export const WatchRbacAuthorizationV1NamespacedRoleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchRbacAuthorizationV1NamespacedRoleOutput =
  typeof WatchRbacAuthorizationV1NamespacedRoleOutput.Type;

// The operation
/**
 * watch changes to an object of kind Role. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
 */
export const watchRbacAuthorizationV1NamespacedRole =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchRbacAuthorizationV1NamespacedRoleInput,
    outputSchema: WatchRbacAuthorizationV1NamespacedRoleOutput,
  }));
// Input Schema
export const WatchRbacAuthorizationV1NamespacedRoleBindingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/rbac.authorization.k8s.io/v1/watch/namespaces/{namespace}/rolebindings/{name}",
    }),
  );
export type WatchRbacAuthorizationV1NamespacedRoleBindingInput =
  typeof WatchRbacAuthorizationV1NamespacedRoleBindingInput.Type;

// Output Schema
export const WatchRbacAuthorizationV1NamespacedRoleBindingOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchRbacAuthorizationV1NamespacedRoleBindingOutput =
  typeof WatchRbacAuthorizationV1NamespacedRoleBindingOutput.Type;

// The operation
/**
 * watch changes to an object of kind RoleBinding. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
 */
export const watchRbacAuthorizationV1NamespacedRoleBinding =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchRbacAuthorizationV1NamespacedRoleBindingInput,
    outputSchema: WatchRbacAuthorizationV1NamespacedRoleBindingOutput,
  }));
// Input Schema
export const WatchRbacAuthorizationV1NamespacedRoleBindingListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/rbac.authorization.k8s.io/v1/watch/namespaces/{namespace}/rolebindings",
    }),
  );
export type WatchRbacAuthorizationV1NamespacedRoleBindingListInput =
  typeof WatchRbacAuthorizationV1NamespacedRoleBindingListInput.Type;

// Output Schema
export const WatchRbacAuthorizationV1NamespacedRoleBindingListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchRbacAuthorizationV1NamespacedRoleBindingListOutput =
  typeof WatchRbacAuthorizationV1NamespacedRoleBindingListOutput.Type;

// The operation
/**
 * watch individual changes to a list of RoleBinding. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchRbacAuthorizationV1NamespacedRoleBindingList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchRbacAuthorizationV1NamespacedRoleBindingListInput,
    outputSchema: WatchRbacAuthorizationV1NamespacedRoleBindingListOutput,
  }));
// Input Schema
export const WatchRbacAuthorizationV1NamespacedRoleListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/rbac.authorization.k8s.io/v1/watch/namespaces/{namespace}/roles",
    }),
  );
export type WatchRbacAuthorizationV1NamespacedRoleListInput =
  typeof WatchRbacAuthorizationV1NamespacedRoleListInput.Type;

// Output Schema
export const WatchRbacAuthorizationV1NamespacedRoleListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchRbacAuthorizationV1NamespacedRoleListOutput =
  typeof WatchRbacAuthorizationV1NamespacedRoleListOutput.Type;

// The operation
/**
 * watch individual changes to a list of Role. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchRbacAuthorizationV1NamespacedRoleList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchRbacAuthorizationV1NamespacedRoleListInput,
    outputSchema: WatchRbacAuthorizationV1NamespacedRoleListOutput,
  }));
// Input Schema
export const WatchRbacAuthorizationV1RoleBindingListForAllNamespacesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/rbac.authorization.k8s.io/v1/watch/rolebindings",
    }),
  );
export type WatchRbacAuthorizationV1RoleBindingListForAllNamespacesInput =
  typeof WatchRbacAuthorizationV1RoleBindingListForAllNamespacesInput.Type;

// Output Schema
export const WatchRbacAuthorizationV1RoleBindingListForAllNamespacesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchRbacAuthorizationV1RoleBindingListForAllNamespacesOutput =
  typeof WatchRbacAuthorizationV1RoleBindingListForAllNamespacesOutput.Type;

// The operation
/**
 * watch individual changes to a list of RoleBinding. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchRbacAuthorizationV1RoleBindingListForAllNamespaces =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchRbacAuthorizationV1RoleBindingListForAllNamespacesInput,
    outputSchema: WatchRbacAuthorizationV1RoleBindingListForAllNamespacesOutput,
  }));
// Input Schema
export const WatchRbacAuthorizationV1RoleListForAllNamespacesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/rbac.authorization.k8s.io/v1/watch/roles",
    }),
  );
export type WatchRbacAuthorizationV1RoleListForAllNamespacesInput =
  typeof WatchRbacAuthorizationV1RoleListForAllNamespacesInput.Type;

// Output Schema
export const WatchRbacAuthorizationV1RoleListForAllNamespacesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchRbacAuthorizationV1RoleListForAllNamespacesOutput =
  typeof WatchRbacAuthorizationV1RoleListForAllNamespacesOutput.Type;

// The operation
/**
 * watch individual changes to a list of Role. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchRbacAuthorizationV1RoleListForAllNamespaces =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchRbacAuthorizationV1RoleListForAllNamespacesInput,
    outputSchema: WatchRbacAuthorizationV1RoleListForAllNamespacesOutput,
  }));
