/**
 * Kubernetes Authorization API
 *
 * Generated from the Kubernetes OpenAPI spec.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";

// Input Schema
export const CreateAuthorizationV1NamespacedLocalSubjectAccessReviewInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/apis/authorization.k8s.io/v1/namespaces/{namespace}/localsubjectaccessreviews",
    }),
  );
export type CreateAuthorizationV1NamespacedLocalSubjectAccessReviewInput =
  typeof CreateAuthorizationV1NamespacedLocalSubjectAccessReviewInput.Type;

// Output Schema
export const CreateAuthorizationV1NamespacedLocalSubjectAccessReviewOutput =
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
    spec: Schema.Struct({
      extra: Schema.optional(
        Schema.Record(Schema.String, Schema.Array(Schema.String)),
      ),
      groups: Schema.optional(Schema.Array(Schema.String)),
      nonResourceAttributes: Schema.optional(
        Schema.Struct({
          path: Schema.optional(Schema.String),
          verb: Schema.optional(Schema.String),
        }),
      ),
      resourceAttributes: Schema.optional(
        Schema.Struct({
          fieldSelector: Schema.optional(
            Schema.Struct({
              rawSelector: Schema.optional(Schema.String),
              requirements: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    key: Schema.String,
                    operator: Schema.String,
                    values: Schema.optional(Schema.Array(Schema.String)),
                  }),
                ),
              ),
            }),
          ),
          group: Schema.optional(Schema.String),
          labelSelector: Schema.optional(
            Schema.Struct({
              rawSelector: Schema.optional(Schema.String),
              requirements: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    key: Schema.String,
                    operator: Schema.String,
                    values: Schema.optional(Schema.Array(Schema.String)),
                  }),
                ),
              ),
            }),
          ),
          name: Schema.optional(Schema.String),
          namespace: Schema.optional(Schema.String),
          resource: Schema.optional(Schema.String),
          subresource: Schema.optional(Schema.String),
          verb: Schema.optional(Schema.String),
          version: Schema.optional(Schema.String),
        }),
      ),
      uid: Schema.optional(Schema.String),
      user: Schema.optional(Schema.String),
    }),
    status: Schema.optional(
      Schema.Struct({
        allowed: Schema.Boolean,
        denied: Schema.optional(Schema.Boolean),
        evaluationError: Schema.optional(Schema.String),
        reason: Schema.optional(Schema.String),
      }),
    ),
  });
export type CreateAuthorizationV1NamespacedLocalSubjectAccessReviewOutput =
  typeof CreateAuthorizationV1NamespacedLocalSubjectAccessReviewOutput.Type;

// The operation
/**
 * create a LocalSubjectAccessReview
 */
export const createAuthorizationV1NamespacedLocalSubjectAccessReview =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateAuthorizationV1NamespacedLocalSubjectAccessReviewInput,
    outputSchema: CreateAuthorizationV1NamespacedLocalSubjectAccessReviewOutput,
  }));
// Input Schema
export const CreateAuthorizationV1SelfSubjectAccessReviewInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/apis/authorization.k8s.io/v1/selfsubjectaccessreviews",
    }),
  );
export type CreateAuthorizationV1SelfSubjectAccessReviewInput =
  typeof CreateAuthorizationV1SelfSubjectAccessReviewInput.Type;

// Output Schema
export const CreateAuthorizationV1SelfSubjectAccessReviewOutput =
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
    spec: Schema.Struct({
      nonResourceAttributes: Schema.optional(
        Schema.Struct({
          path: Schema.optional(Schema.String),
          verb: Schema.optional(Schema.String),
        }),
      ),
      resourceAttributes: Schema.optional(
        Schema.Struct({
          fieldSelector: Schema.optional(
            Schema.Struct({
              rawSelector: Schema.optional(Schema.String),
              requirements: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    key: Schema.String,
                    operator: Schema.String,
                    values: Schema.optional(Schema.Array(Schema.String)),
                  }),
                ),
              ),
            }),
          ),
          group: Schema.optional(Schema.String),
          labelSelector: Schema.optional(
            Schema.Struct({
              rawSelector: Schema.optional(Schema.String),
              requirements: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    key: Schema.String,
                    operator: Schema.String,
                    values: Schema.optional(Schema.Array(Schema.String)),
                  }),
                ),
              ),
            }),
          ),
          name: Schema.optional(Schema.String),
          namespace: Schema.optional(Schema.String),
          resource: Schema.optional(Schema.String),
          subresource: Schema.optional(Schema.String),
          verb: Schema.optional(Schema.String),
          version: Schema.optional(Schema.String),
        }),
      ),
    }),
    status: Schema.optional(
      Schema.Struct({
        allowed: Schema.Boolean,
        denied: Schema.optional(Schema.Boolean),
        evaluationError: Schema.optional(Schema.String),
        reason: Schema.optional(Schema.String),
      }),
    ),
  });
export type CreateAuthorizationV1SelfSubjectAccessReviewOutput =
  typeof CreateAuthorizationV1SelfSubjectAccessReviewOutput.Type;

// The operation
/**
 * create a SelfSubjectAccessReview
 */
export const createAuthorizationV1SelfSubjectAccessReview =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateAuthorizationV1SelfSubjectAccessReviewInput,
    outputSchema: CreateAuthorizationV1SelfSubjectAccessReviewOutput,
  }));
// Input Schema
export const CreateAuthorizationV1SelfSubjectRulesReviewInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/apis/authorization.k8s.io/v1/selfsubjectrulesreviews",
    }),
  );
export type CreateAuthorizationV1SelfSubjectRulesReviewInput =
  typeof CreateAuthorizationV1SelfSubjectRulesReviewInput.Type;

// Output Schema
export const CreateAuthorizationV1SelfSubjectRulesReviewOutput =
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
    spec: Schema.Struct({
      namespace: Schema.optional(Schema.String),
    }),
    status: Schema.optional(
      Schema.Struct({
        evaluationError: Schema.optional(Schema.String),
        incomplete: Schema.Boolean,
        nonResourceRules: Schema.Array(
          Schema.Struct({
            nonResourceURLs: Schema.optional(Schema.Array(Schema.String)),
            verbs: Schema.Array(Schema.String),
          }),
        ),
        resourceRules: Schema.Array(
          Schema.Struct({
            apiGroups: Schema.optional(Schema.Array(Schema.String)),
            resourceNames: Schema.optional(Schema.Array(Schema.String)),
            resources: Schema.optional(Schema.Array(Schema.String)),
            verbs: Schema.Array(Schema.String),
          }),
        ),
      }),
    ),
  });
export type CreateAuthorizationV1SelfSubjectRulesReviewOutput =
  typeof CreateAuthorizationV1SelfSubjectRulesReviewOutput.Type;

// The operation
/**
 * create a SelfSubjectRulesReview
 */
export const createAuthorizationV1SelfSubjectRulesReview =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateAuthorizationV1SelfSubjectRulesReviewInput,
    outputSchema: CreateAuthorizationV1SelfSubjectRulesReviewOutput,
  }));
// Input Schema
export const CreateAuthorizationV1SubjectAccessReviewInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/apis/authorization.k8s.io/v1/subjectaccessreviews",
    }),
  );
export type CreateAuthorizationV1SubjectAccessReviewInput =
  typeof CreateAuthorizationV1SubjectAccessReviewInput.Type;

// Output Schema
export const CreateAuthorizationV1SubjectAccessReviewOutput =
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
    spec: Schema.Struct({
      extra: Schema.optional(
        Schema.Record(Schema.String, Schema.Array(Schema.String)),
      ),
      groups: Schema.optional(Schema.Array(Schema.String)),
      nonResourceAttributes: Schema.optional(
        Schema.Struct({
          path: Schema.optional(Schema.String),
          verb: Schema.optional(Schema.String),
        }),
      ),
      resourceAttributes: Schema.optional(
        Schema.Struct({
          fieldSelector: Schema.optional(
            Schema.Struct({
              rawSelector: Schema.optional(Schema.String),
              requirements: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    key: Schema.String,
                    operator: Schema.String,
                    values: Schema.optional(Schema.Array(Schema.String)),
                  }),
                ),
              ),
            }),
          ),
          group: Schema.optional(Schema.String),
          labelSelector: Schema.optional(
            Schema.Struct({
              rawSelector: Schema.optional(Schema.String),
              requirements: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    key: Schema.String,
                    operator: Schema.String,
                    values: Schema.optional(Schema.Array(Schema.String)),
                  }),
                ),
              ),
            }),
          ),
          name: Schema.optional(Schema.String),
          namespace: Schema.optional(Schema.String),
          resource: Schema.optional(Schema.String),
          subresource: Schema.optional(Schema.String),
          verb: Schema.optional(Schema.String),
          version: Schema.optional(Schema.String),
        }),
      ),
      uid: Schema.optional(Schema.String),
      user: Schema.optional(Schema.String),
    }),
    status: Schema.optional(
      Schema.Struct({
        allowed: Schema.Boolean,
        denied: Schema.optional(Schema.Boolean),
        evaluationError: Schema.optional(Schema.String),
        reason: Schema.optional(Schema.String),
      }),
    ),
  });
export type CreateAuthorizationV1SubjectAccessReviewOutput =
  typeof CreateAuthorizationV1SubjectAccessReviewOutput.Type;

// The operation
/**
 * create a SubjectAccessReview
 */
export const createAuthorizationV1SubjectAccessReview =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateAuthorizationV1SubjectAccessReviewInput,
    outputSchema: CreateAuthorizationV1SubjectAccessReviewOutput,
  }));
// Input Schema
export const GetAuthorizationAPIGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/apis/authorization.k8s.io/" }),
  );
export type GetAuthorizationAPIGroupInput =
  typeof GetAuthorizationAPIGroupInput.Type;

// Output Schema
export const GetAuthorizationAPIGroupOutput =
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
export type GetAuthorizationAPIGroupOutput =
  typeof GetAuthorizationAPIGroupOutput.Type;

// The operation
/**
 * get information of a group
 */
export const getAuthorizationAPIGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetAuthorizationAPIGroupInput,
    outputSchema: GetAuthorizationAPIGroupOutput,
  }),
);
// Input Schema
export const GetAuthorizationV1APIResourcesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/apis/authorization.k8s.io/v1/" }),
  );
export type GetAuthorizationV1APIResourcesInput =
  typeof GetAuthorizationV1APIResourcesInput.Type;

// Output Schema
export const GetAuthorizationV1APIResourcesOutput =
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
export type GetAuthorizationV1APIResourcesOutput =
  typeof GetAuthorizationV1APIResourcesOutput.Type;

// The operation
/**
 * get available resources
 */
export const getAuthorizationV1APIResources =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetAuthorizationV1APIResourcesInput,
    outputSchema: GetAuthorizationV1APIResourcesOutput,
  }));
