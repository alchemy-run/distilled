/**
 * Kubernetes Scheduling API
 *
 * Generated from the Kubernetes OpenAPI spec.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";

// Input Schema
export const CreateSchedulingV1PriorityClassInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/apis/scheduling.k8s.io/v1/priorityclasses",
    }),
  );
export type CreateSchedulingV1PriorityClassInput =
  typeof CreateSchedulingV1PriorityClassInput.Type;

// Output Schema
export const CreateSchedulingV1PriorityClassOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    apiVersion: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    globalDefault: Schema.optional(Schema.Boolean),
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
    preemptionPolicy: Schema.optional(Schema.String),
    value: Schema.optional(Schema.Number),
  });
export type CreateSchedulingV1PriorityClassOutput =
  typeof CreateSchedulingV1PriorityClassOutput.Type;

// The operation
/**
 * create a PriorityClass
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const createSchedulingV1PriorityClass =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateSchedulingV1PriorityClassInput,
    outputSchema: CreateSchedulingV1PriorityClassOutput,
  }));
// Input Schema
export const CreateSchedulingV1alpha2NamespacedPodGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/apis/scheduling.k8s.io/v1alpha2/namespaces/{namespace}/podgroups",
    }),
  );
export type CreateSchedulingV1alpha2NamespacedPodGroupInput =
  typeof CreateSchedulingV1alpha2NamespacedPodGroupInput.Type;

// Output Schema
export const CreateSchedulingV1alpha2NamespacedPodGroupOutput =
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
      podGroupTemplateRef: Schema.optional(
        Schema.Struct({
          workload: Schema.optional(
            Schema.Struct({
              podGroupTemplateName: Schema.String,
              workloadName: Schema.String,
            }),
          ),
        }),
      ),
      schedulingPolicy: Schema.Struct({
        basic: Schema.optional(Schema.Unknown),
        gang: Schema.optional(
          Schema.Struct({
            minCount: Schema.Number,
          }),
        ),
      }),
    }),
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
      }),
    ),
  });
export type CreateSchedulingV1alpha2NamespacedPodGroupOutput =
  typeof CreateSchedulingV1alpha2NamespacedPodGroupOutput.Type;

// The operation
/**
 * create a PodGroup
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const createSchedulingV1alpha2NamespacedPodGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateSchedulingV1alpha2NamespacedPodGroupInput,
    outputSchema: CreateSchedulingV1alpha2NamespacedPodGroupOutput,
  }));
// Input Schema
export const CreateSchedulingV1alpha2NamespacedWorkloadInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/apis/scheduling.k8s.io/v1alpha2/namespaces/{namespace}/workloads",
    }),
  );
export type CreateSchedulingV1alpha2NamespacedWorkloadInput =
  typeof CreateSchedulingV1alpha2NamespacedWorkloadInput.Type;

// Output Schema
export const CreateSchedulingV1alpha2NamespacedWorkloadOutput =
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
      controllerRef: Schema.optional(
        Schema.Struct({
          apiGroup: Schema.optional(Schema.String),
          kind: Schema.String,
          name: Schema.String,
        }),
      ),
      podGroupTemplates: Schema.Array(
        Schema.Struct({
          name: Schema.String,
          schedulingPolicy: Schema.Struct({
            basic: Schema.optional(Schema.Unknown),
            gang: Schema.optional(
              Schema.Struct({
                minCount: Schema.Number,
              }),
            ),
          }),
        }),
      ),
    }),
  });
export type CreateSchedulingV1alpha2NamespacedWorkloadOutput =
  typeof CreateSchedulingV1alpha2NamespacedWorkloadOutput.Type;

// The operation
/**
 * create a Workload
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const createSchedulingV1alpha2NamespacedWorkload =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateSchedulingV1alpha2NamespacedWorkloadInput,
    outputSchema: CreateSchedulingV1alpha2NamespacedWorkloadOutput,
  }));
// Input Schema
export const DeleteSchedulingV1CollectionPriorityClassInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/scheduling.k8s.io/v1/priorityclasses",
    }),
  );
export type DeleteSchedulingV1CollectionPriorityClassInput =
  typeof DeleteSchedulingV1CollectionPriorityClassInput.Type;

// Output Schema
export const DeleteSchedulingV1CollectionPriorityClassOutput =
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
export type DeleteSchedulingV1CollectionPriorityClassOutput =
  typeof DeleteSchedulingV1CollectionPriorityClassOutput.Type;

// The operation
/**
 * delete collection of PriorityClass
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteSchedulingV1CollectionPriorityClass =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteSchedulingV1CollectionPriorityClassInput,
    outputSchema: DeleteSchedulingV1CollectionPriorityClassOutput,
  }));
// Input Schema
export const DeleteSchedulingV1PriorityClassInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/scheduling.k8s.io/v1/priorityclasses/{name}",
    }),
  );
export type DeleteSchedulingV1PriorityClassInput =
  typeof DeleteSchedulingV1PriorityClassInput.Type;

// Output Schema
export const DeleteSchedulingV1PriorityClassOutput =
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
export type DeleteSchedulingV1PriorityClassOutput =
  typeof DeleteSchedulingV1PriorityClassOutput.Type;

// The operation
/**
 * delete a PriorityClass
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteSchedulingV1PriorityClass =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteSchedulingV1PriorityClassInput,
    outputSchema: DeleteSchedulingV1PriorityClassOutput,
  }));
// Input Schema
export const DeleteSchedulingV1alpha2CollectionNamespacedPodGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/scheduling.k8s.io/v1alpha2/namespaces/{namespace}/podgroups",
    }),
  );
export type DeleteSchedulingV1alpha2CollectionNamespacedPodGroupInput =
  typeof DeleteSchedulingV1alpha2CollectionNamespacedPodGroupInput.Type;

// Output Schema
export const DeleteSchedulingV1alpha2CollectionNamespacedPodGroupOutput =
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
export type DeleteSchedulingV1alpha2CollectionNamespacedPodGroupOutput =
  typeof DeleteSchedulingV1alpha2CollectionNamespacedPodGroupOutput.Type;

// The operation
/**
 * delete collection of PodGroup
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteSchedulingV1alpha2CollectionNamespacedPodGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteSchedulingV1alpha2CollectionNamespacedPodGroupInput,
    outputSchema: DeleteSchedulingV1alpha2CollectionNamespacedPodGroupOutput,
  }));
// Input Schema
export const DeleteSchedulingV1alpha2CollectionNamespacedWorkloadInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/scheduling.k8s.io/v1alpha2/namespaces/{namespace}/workloads",
    }),
  );
export type DeleteSchedulingV1alpha2CollectionNamespacedWorkloadInput =
  typeof DeleteSchedulingV1alpha2CollectionNamespacedWorkloadInput.Type;

// Output Schema
export const DeleteSchedulingV1alpha2CollectionNamespacedWorkloadOutput =
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
export type DeleteSchedulingV1alpha2CollectionNamespacedWorkloadOutput =
  typeof DeleteSchedulingV1alpha2CollectionNamespacedWorkloadOutput.Type;

// The operation
/**
 * delete collection of Workload
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteSchedulingV1alpha2CollectionNamespacedWorkload =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteSchedulingV1alpha2CollectionNamespacedWorkloadInput,
    outputSchema: DeleteSchedulingV1alpha2CollectionNamespacedWorkloadOutput,
  }));
// Input Schema
export const DeleteSchedulingV1alpha2NamespacedPodGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/scheduling.k8s.io/v1alpha2/namespaces/{namespace}/podgroups/{name}",
    }),
  );
export type DeleteSchedulingV1alpha2NamespacedPodGroupInput =
  typeof DeleteSchedulingV1alpha2NamespacedPodGroupInput.Type;

// Output Schema
export const DeleteSchedulingV1alpha2NamespacedPodGroupOutput =
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
export type DeleteSchedulingV1alpha2NamespacedPodGroupOutput =
  typeof DeleteSchedulingV1alpha2NamespacedPodGroupOutput.Type;

// The operation
/**
 * delete a PodGroup
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteSchedulingV1alpha2NamespacedPodGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteSchedulingV1alpha2NamespacedPodGroupInput,
    outputSchema: DeleteSchedulingV1alpha2NamespacedPodGroupOutput,
  }));
// Input Schema
export const DeleteSchedulingV1alpha2NamespacedWorkloadInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/scheduling.k8s.io/v1alpha2/namespaces/{namespace}/workloads/{name}",
    }),
  );
export type DeleteSchedulingV1alpha2NamespacedWorkloadInput =
  typeof DeleteSchedulingV1alpha2NamespacedWorkloadInput.Type;

// Output Schema
export const DeleteSchedulingV1alpha2NamespacedWorkloadOutput =
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
export type DeleteSchedulingV1alpha2NamespacedWorkloadOutput =
  typeof DeleteSchedulingV1alpha2NamespacedWorkloadOutput.Type;

// The operation
/**
 * delete a Workload
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteSchedulingV1alpha2NamespacedWorkload =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteSchedulingV1alpha2NamespacedWorkloadInput,
    outputSchema: DeleteSchedulingV1alpha2NamespacedWorkloadOutput,
  }));
// Input Schema
export const GetSchedulingAPIGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/apis/scheduling.k8s.io/" }),
  );
export type GetSchedulingAPIGroupInput = typeof GetSchedulingAPIGroupInput.Type;

// Output Schema
export const GetSchedulingAPIGroupOutput =
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
export type GetSchedulingAPIGroupOutput =
  typeof GetSchedulingAPIGroupOutput.Type;

// The operation
/**
 * get information of a group
 */
export const getSchedulingAPIGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetSchedulingAPIGroupInput,
    outputSchema: GetSchedulingAPIGroupOutput,
  }),
);
// Input Schema
export const GetSchedulingV1APIResourcesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/apis/scheduling.k8s.io/v1/" }),
  );
export type GetSchedulingV1APIResourcesInput =
  typeof GetSchedulingV1APIResourcesInput.Type;

// Output Schema
export const GetSchedulingV1APIResourcesOutput =
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
export type GetSchedulingV1APIResourcesOutput =
  typeof GetSchedulingV1APIResourcesOutput.Type;

// The operation
/**
 * get available resources
 */
export const getSchedulingV1APIResources = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetSchedulingV1APIResourcesInput,
    outputSchema: GetSchedulingV1APIResourcesOutput,
  }),
);
// Input Schema
export const GetSchedulingV1alpha2APIResourcesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/apis/scheduling.k8s.io/v1alpha2/" }),
  );
export type GetSchedulingV1alpha2APIResourcesInput =
  typeof GetSchedulingV1alpha2APIResourcesInput.Type;

// Output Schema
export const GetSchedulingV1alpha2APIResourcesOutput =
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
export type GetSchedulingV1alpha2APIResourcesOutput =
  typeof GetSchedulingV1alpha2APIResourcesOutput.Type;

// The operation
/**
 * get available resources
 */
export const getSchedulingV1alpha2APIResources =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetSchedulingV1alpha2APIResourcesInput,
    outputSchema: GetSchedulingV1alpha2APIResourcesOutput,
  }));
// Input Schema
export const ListSchedulingV1PriorityClassInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/scheduling.k8s.io/v1/priorityclasses",
    }),
  );
export type ListSchedulingV1PriorityClassInput =
  typeof ListSchedulingV1PriorityClassInput.Type;

// Output Schema
export const ListSchedulingV1PriorityClassOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    apiVersion: Schema.optional(Schema.String),
    items: Schema.Array(
      Schema.Struct({
        apiVersion: Schema.optional(Schema.String),
        description: Schema.optional(Schema.String),
        globalDefault: Schema.optional(Schema.Boolean),
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
        preemptionPolicy: Schema.optional(Schema.String),
        value: Schema.optional(Schema.Number),
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
export type ListSchedulingV1PriorityClassOutput =
  typeof ListSchedulingV1PriorityClassOutput.Type;

// The operation
/**
 * list or watch objects of kind PriorityClass
 */
export const listSchedulingV1PriorityClass =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListSchedulingV1PriorityClassInput,
    outputSchema: ListSchedulingV1PriorityClassOutput,
  }));
// Input Schema
export const ListSchedulingV1alpha2NamespacedPodGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/scheduling.k8s.io/v1alpha2/namespaces/{namespace}/podgroups",
    }),
  );
export type ListSchedulingV1alpha2NamespacedPodGroupInput =
  typeof ListSchedulingV1alpha2NamespacedPodGroupInput.Type;

// Output Schema
export const ListSchedulingV1alpha2NamespacedPodGroupOutput =
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
        spec: Schema.Struct({
          podGroupTemplateRef: Schema.optional(
            Schema.Struct({
              workload: Schema.optional(
                Schema.Struct({
                  podGroupTemplateName: Schema.String,
                  workloadName: Schema.String,
                }),
              ),
            }),
          ),
          schedulingPolicy: Schema.Struct({
            basic: Schema.optional(Schema.Unknown),
            gang: Schema.optional(
              Schema.Struct({
                minCount: Schema.Number,
              }),
            ),
          }),
        }),
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
export type ListSchedulingV1alpha2NamespacedPodGroupOutput =
  typeof ListSchedulingV1alpha2NamespacedPodGroupOutput.Type;

// The operation
/**
 * list or watch objects of kind PodGroup
 */
export const listSchedulingV1alpha2NamespacedPodGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListSchedulingV1alpha2NamespacedPodGroupInput,
    outputSchema: ListSchedulingV1alpha2NamespacedPodGroupOutput,
  }));
// Input Schema
export const ListSchedulingV1alpha2NamespacedWorkloadInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/scheduling.k8s.io/v1alpha2/namespaces/{namespace}/workloads",
    }),
  );
export type ListSchedulingV1alpha2NamespacedWorkloadInput =
  typeof ListSchedulingV1alpha2NamespacedWorkloadInput.Type;

// Output Schema
export const ListSchedulingV1alpha2NamespacedWorkloadOutput =
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
        spec: Schema.Struct({
          controllerRef: Schema.optional(
            Schema.Struct({
              apiGroup: Schema.optional(Schema.String),
              kind: Schema.String,
              name: Schema.String,
            }),
          ),
          podGroupTemplates: Schema.Array(
            Schema.Struct({
              name: Schema.String,
              schedulingPolicy: Schema.Struct({
                basic: Schema.optional(Schema.Unknown),
                gang: Schema.optional(
                  Schema.Struct({
                    minCount: Schema.Number,
                  }),
                ),
              }),
            }),
          ),
        }),
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
export type ListSchedulingV1alpha2NamespacedWorkloadOutput =
  typeof ListSchedulingV1alpha2NamespacedWorkloadOutput.Type;

// The operation
/**
 * list or watch objects of kind Workload
 */
export const listSchedulingV1alpha2NamespacedWorkload =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListSchedulingV1alpha2NamespacedWorkloadInput,
    outputSchema: ListSchedulingV1alpha2NamespacedWorkloadOutput,
  }));
// Input Schema
export const ListSchedulingV1alpha2PodGroupForAllNamespacesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/scheduling.k8s.io/v1alpha2/podgroups",
    }),
  );
export type ListSchedulingV1alpha2PodGroupForAllNamespacesInput =
  typeof ListSchedulingV1alpha2PodGroupForAllNamespacesInput.Type;

// Output Schema
export const ListSchedulingV1alpha2PodGroupForAllNamespacesOutput =
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
        spec: Schema.Struct({
          podGroupTemplateRef: Schema.optional(
            Schema.Struct({
              workload: Schema.optional(
                Schema.Struct({
                  podGroupTemplateName: Schema.String,
                  workloadName: Schema.String,
                }),
              ),
            }),
          ),
          schedulingPolicy: Schema.Struct({
            basic: Schema.optional(Schema.Unknown),
            gang: Schema.optional(
              Schema.Struct({
                minCount: Schema.Number,
              }),
            ),
          }),
        }),
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
export type ListSchedulingV1alpha2PodGroupForAllNamespacesOutput =
  typeof ListSchedulingV1alpha2PodGroupForAllNamespacesOutput.Type;

// The operation
/**
 * list or watch objects of kind PodGroup
 */
export const listSchedulingV1alpha2PodGroupForAllNamespaces =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListSchedulingV1alpha2PodGroupForAllNamespacesInput,
    outputSchema: ListSchedulingV1alpha2PodGroupForAllNamespacesOutput,
  }));
// Input Schema
export const ListSchedulingV1alpha2WorkloadForAllNamespacesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/scheduling.k8s.io/v1alpha2/workloads",
    }),
  );
export type ListSchedulingV1alpha2WorkloadForAllNamespacesInput =
  typeof ListSchedulingV1alpha2WorkloadForAllNamespacesInput.Type;

// Output Schema
export const ListSchedulingV1alpha2WorkloadForAllNamespacesOutput =
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
        spec: Schema.Struct({
          controllerRef: Schema.optional(
            Schema.Struct({
              apiGroup: Schema.optional(Schema.String),
              kind: Schema.String,
              name: Schema.String,
            }),
          ),
          podGroupTemplates: Schema.Array(
            Schema.Struct({
              name: Schema.String,
              schedulingPolicy: Schema.Struct({
                basic: Schema.optional(Schema.Unknown),
                gang: Schema.optional(
                  Schema.Struct({
                    minCount: Schema.Number,
                  }),
                ),
              }),
            }),
          ),
        }),
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
export type ListSchedulingV1alpha2WorkloadForAllNamespacesOutput =
  typeof ListSchedulingV1alpha2WorkloadForAllNamespacesOutput.Type;

// The operation
/**
 * list or watch objects of kind Workload
 */
export const listSchedulingV1alpha2WorkloadForAllNamespaces =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListSchedulingV1alpha2WorkloadForAllNamespacesInput,
    outputSchema: ListSchedulingV1alpha2WorkloadForAllNamespacesOutput,
  }));
// Input Schema
export const PatchSchedulingV1PriorityClassInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/scheduling.k8s.io/v1/priorityclasses/{name}",
    }),
  );
export type PatchSchedulingV1PriorityClassInput =
  typeof PatchSchedulingV1PriorityClassInput.Type;

// Output Schema
export const PatchSchedulingV1PriorityClassOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    apiVersion: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    globalDefault: Schema.optional(Schema.Boolean),
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
    preemptionPolicy: Schema.optional(Schema.String),
    value: Schema.optional(Schema.Number),
  });
export type PatchSchedulingV1PriorityClassOutput =
  typeof PatchSchedulingV1PriorityClassOutput.Type;

// The operation
/**
 * partially update the specified PriorityClass
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchSchedulingV1PriorityClass =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PatchSchedulingV1PriorityClassInput,
    outputSchema: PatchSchedulingV1PriorityClassOutput,
  }));
// Input Schema
export const PatchSchedulingV1alpha2NamespacedPodGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/scheduling.k8s.io/v1alpha2/namespaces/{namespace}/podgroups/{name}",
    }),
  );
export type PatchSchedulingV1alpha2NamespacedPodGroupInput =
  typeof PatchSchedulingV1alpha2NamespacedPodGroupInput.Type;

// Output Schema
export const PatchSchedulingV1alpha2NamespacedPodGroupOutput =
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
      podGroupTemplateRef: Schema.optional(
        Schema.Struct({
          workload: Schema.optional(
            Schema.Struct({
              podGroupTemplateName: Schema.String,
              workloadName: Schema.String,
            }),
          ),
        }),
      ),
      schedulingPolicy: Schema.Struct({
        basic: Schema.optional(Schema.Unknown),
        gang: Schema.optional(
          Schema.Struct({
            minCount: Schema.Number,
          }),
        ),
      }),
    }),
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
      }),
    ),
  });
export type PatchSchedulingV1alpha2NamespacedPodGroupOutput =
  typeof PatchSchedulingV1alpha2NamespacedPodGroupOutput.Type;

// The operation
/**
 * partially update the specified PodGroup
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchSchedulingV1alpha2NamespacedPodGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PatchSchedulingV1alpha2NamespacedPodGroupInput,
    outputSchema: PatchSchedulingV1alpha2NamespacedPodGroupOutput,
  }));
// Input Schema
export const PatchSchedulingV1alpha2NamespacedPodGroupStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/scheduling.k8s.io/v1alpha2/namespaces/{namespace}/podgroups/{name}/status",
    }),
  );
export type PatchSchedulingV1alpha2NamespacedPodGroupStatusInput =
  typeof PatchSchedulingV1alpha2NamespacedPodGroupStatusInput.Type;

// Output Schema
export const PatchSchedulingV1alpha2NamespacedPodGroupStatusOutput =
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
      podGroupTemplateRef: Schema.optional(
        Schema.Struct({
          workload: Schema.optional(
            Schema.Struct({
              podGroupTemplateName: Schema.String,
              workloadName: Schema.String,
            }),
          ),
        }),
      ),
      schedulingPolicy: Schema.Struct({
        basic: Schema.optional(Schema.Unknown),
        gang: Schema.optional(
          Schema.Struct({
            minCount: Schema.Number,
          }),
        ),
      }),
    }),
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
      }),
    ),
  });
export type PatchSchedulingV1alpha2NamespacedPodGroupStatusOutput =
  typeof PatchSchedulingV1alpha2NamespacedPodGroupStatusOutput.Type;

// The operation
/**
 * partially update status of the specified PodGroup
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchSchedulingV1alpha2NamespacedPodGroupStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PatchSchedulingV1alpha2NamespacedPodGroupStatusInput,
    outputSchema: PatchSchedulingV1alpha2NamespacedPodGroupStatusOutput,
  }));
// Input Schema
export const PatchSchedulingV1alpha2NamespacedWorkloadInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/scheduling.k8s.io/v1alpha2/namespaces/{namespace}/workloads/{name}",
    }),
  );
export type PatchSchedulingV1alpha2NamespacedWorkloadInput =
  typeof PatchSchedulingV1alpha2NamespacedWorkloadInput.Type;

// Output Schema
export const PatchSchedulingV1alpha2NamespacedWorkloadOutput =
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
      controllerRef: Schema.optional(
        Schema.Struct({
          apiGroup: Schema.optional(Schema.String),
          kind: Schema.String,
          name: Schema.String,
        }),
      ),
      podGroupTemplates: Schema.Array(
        Schema.Struct({
          name: Schema.String,
          schedulingPolicy: Schema.Struct({
            basic: Schema.optional(Schema.Unknown),
            gang: Schema.optional(
              Schema.Struct({
                minCount: Schema.Number,
              }),
            ),
          }),
        }),
      ),
    }),
  });
export type PatchSchedulingV1alpha2NamespacedWorkloadOutput =
  typeof PatchSchedulingV1alpha2NamespacedWorkloadOutput.Type;

// The operation
/**
 * partially update the specified Workload
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchSchedulingV1alpha2NamespacedWorkload =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PatchSchedulingV1alpha2NamespacedWorkloadInput,
    outputSchema: PatchSchedulingV1alpha2NamespacedWorkloadOutput,
  }));
// Input Schema
export const ReadSchedulingV1PriorityClassInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/scheduling.k8s.io/v1/priorityclasses/{name}",
    }),
  );
export type ReadSchedulingV1PriorityClassInput =
  typeof ReadSchedulingV1PriorityClassInput.Type;

// Output Schema
export const ReadSchedulingV1PriorityClassOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    apiVersion: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    globalDefault: Schema.optional(Schema.Boolean),
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
    preemptionPolicy: Schema.optional(Schema.String),
    value: Schema.optional(Schema.Number),
  });
export type ReadSchedulingV1PriorityClassOutput =
  typeof ReadSchedulingV1PriorityClassOutput.Type;

// The operation
/**
 * read the specified PriorityClass
 */
export const readSchedulingV1PriorityClass =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReadSchedulingV1PriorityClassInput,
    outputSchema: ReadSchedulingV1PriorityClassOutput,
  }));
// Input Schema
export const ReadSchedulingV1alpha2NamespacedPodGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/scheduling.k8s.io/v1alpha2/namespaces/{namespace}/podgroups/{name}",
    }),
  );
export type ReadSchedulingV1alpha2NamespacedPodGroupInput =
  typeof ReadSchedulingV1alpha2NamespacedPodGroupInput.Type;

// Output Schema
export const ReadSchedulingV1alpha2NamespacedPodGroupOutput =
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
      podGroupTemplateRef: Schema.optional(
        Schema.Struct({
          workload: Schema.optional(
            Schema.Struct({
              podGroupTemplateName: Schema.String,
              workloadName: Schema.String,
            }),
          ),
        }),
      ),
      schedulingPolicy: Schema.Struct({
        basic: Schema.optional(Schema.Unknown),
        gang: Schema.optional(
          Schema.Struct({
            minCount: Schema.Number,
          }),
        ),
      }),
    }),
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
      }),
    ),
  });
export type ReadSchedulingV1alpha2NamespacedPodGroupOutput =
  typeof ReadSchedulingV1alpha2NamespacedPodGroupOutput.Type;

// The operation
/**
 * read the specified PodGroup
 */
export const readSchedulingV1alpha2NamespacedPodGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReadSchedulingV1alpha2NamespacedPodGroupInput,
    outputSchema: ReadSchedulingV1alpha2NamespacedPodGroupOutput,
  }));
// Input Schema
export const ReadSchedulingV1alpha2NamespacedPodGroupStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/scheduling.k8s.io/v1alpha2/namespaces/{namespace}/podgroups/{name}/status",
    }),
  );
export type ReadSchedulingV1alpha2NamespacedPodGroupStatusInput =
  typeof ReadSchedulingV1alpha2NamespacedPodGroupStatusInput.Type;

// Output Schema
export const ReadSchedulingV1alpha2NamespacedPodGroupStatusOutput =
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
      podGroupTemplateRef: Schema.optional(
        Schema.Struct({
          workload: Schema.optional(
            Schema.Struct({
              podGroupTemplateName: Schema.String,
              workloadName: Schema.String,
            }),
          ),
        }),
      ),
      schedulingPolicy: Schema.Struct({
        basic: Schema.optional(Schema.Unknown),
        gang: Schema.optional(
          Schema.Struct({
            minCount: Schema.Number,
          }),
        ),
      }),
    }),
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
      }),
    ),
  });
export type ReadSchedulingV1alpha2NamespacedPodGroupStatusOutput =
  typeof ReadSchedulingV1alpha2NamespacedPodGroupStatusOutput.Type;

// The operation
/**
 * read status of the specified PodGroup
 */
export const readSchedulingV1alpha2NamespacedPodGroupStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReadSchedulingV1alpha2NamespacedPodGroupStatusInput,
    outputSchema: ReadSchedulingV1alpha2NamespacedPodGroupStatusOutput,
  }));
// Input Schema
export const ReadSchedulingV1alpha2NamespacedWorkloadInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/scheduling.k8s.io/v1alpha2/namespaces/{namespace}/workloads/{name}",
    }),
  );
export type ReadSchedulingV1alpha2NamespacedWorkloadInput =
  typeof ReadSchedulingV1alpha2NamespacedWorkloadInput.Type;

// Output Schema
export const ReadSchedulingV1alpha2NamespacedWorkloadOutput =
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
      controllerRef: Schema.optional(
        Schema.Struct({
          apiGroup: Schema.optional(Schema.String),
          kind: Schema.String,
          name: Schema.String,
        }),
      ),
      podGroupTemplates: Schema.Array(
        Schema.Struct({
          name: Schema.String,
          schedulingPolicy: Schema.Struct({
            basic: Schema.optional(Schema.Unknown),
            gang: Schema.optional(
              Schema.Struct({
                minCount: Schema.Number,
              }),
            ),
          }),
        }),
      ),
    }),
  });
export type ReadSchedulingV1alpha2NamespacedWorkloadOutput =
  typeof ReadSchedulingV1alpha2NamespacedWorkloadOutput.Type;

// The operation
/**
 * read the specified Workload
 */
export const readSchedulingV1alpha2NamespacedWorkload =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReadSchedulingV1alpha2NamespacedWorkloadInput,
    outputSchema: ReadSchedulingV1alpha2NamespacedWorkloadOutput,
  }));
// Input Schema
export const ReplaceSchedulingV1PriorityClassInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/scheduling.k8s.io/v1/priorityclasses/{name}",
    }),
  );
export type ReplaceSchedulingV1PriorityClassInput =
  typeof ReplaceSchedulingV1PriorityClassInput.Type;

// Output Schema
export const ReplaceSchedulingV1PriorityClassOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    apiVersion: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    globalDefault: Schema.optional(Schema.Boolean),
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
    preemptionPolicy: Schema.optional(Schema.String),
    value: Schema.optional(Schema.Number),
  });
export type ReplaceSchedulingV1PriorityClassOutput =
  typeof ReplaceSchedulingV1PriorityClassOutput.Type;

// The operation
/**
 * replace the specified PriorityClass
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceSchedulingV1PriorityClass =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReplaceSchedulingV1PriorityClassInput,
    outputSchema: ReplaceSchedulingV1PriorityClassOutput,
  }));
// Input Schema
export const ReplaceSchedulingV1alpha2NamespacedPodGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/scheduling.k8s.io/v1alpha2/namespaces/{namespace}/podgroups/{name}",
    }),
  );
export type ReplaceSchedulingV1alpha2NamespacedPodGroupInput =
  typeof ReplaceSchedulingV1alpha2NamespacedPodGroupInput.Type;

// Output Schema
export const ReplaceSchedulingV1alpha2NamespacedPodGroupOutput =
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
      podGroupTemplateRef: Schema.optional(
        Schema.Struct({
          workload: Schema.optional(
            Schema.Struct({
              podGroupTemplateName: Schema.String,
              workloadName: Schema.String,
            }),
          ),
        }),
      ),
      schedulingPolicy: Schema.Struct({
        basic: Schema.optional(Schema.Unknown),
        gang: Schema.optional(
          Schema.Struct({
            minCount: Schema.Number,
          }),
        ),
      }),
    }),
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
      }),
    ),
  });
export type ReplaceSchedulingV1alpha2NamespacedPodGroupOutput =
  typeof ReplaceSchedulingV1alpha2NamespacedPodGroupOutput.Type;

// The operation
/**
 * replace the specified PodGroup
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceSchedulingV1alpha2NamespacedPodGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReplaceSchedulingV1alpha2NamespacedPodGroupInput,
    outputSchema: ReplaceSchedulingV1alpha2NamespacedPodGroupOutput,
  }));
// Input Schema
export const ReplaceSchedulingV1alpha2NamespacedPodGroupStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/scheduling.k8s.io/v1alpha2/namespaces/{namespace}/podgroups/{name}/status",
    }),
  );
export type ReplaceSchedulingV1alpha2NamespacedPodGroupStatusInput =
  typeof ReplaceSchedulingV1alpha2NamespacedPodGroupStatusInput.Type;

// Output Schema
export const ReplaceSchedulingV1alpha2NamespacedPodGroupStatusOutput =
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
      podGroupTemplateRef: Schema.optional(
        Schema.Struct({
          workload: Schema.optional(
            Schema.Struct({
              podGroupTemplateName: Schema.String,
              workloadName: Schema.String,
            }),
          ),
        }),
      ),
      schedulingPolicy: Schema.Struct({
        basic: Schema.optional(Schema.Unknown),
        gang: Schema.optional(
          Schema.Struct({
            minCount: Schema.Number,
          }),
        ),
      }),
    }),
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
      }),
    ),
  });
export type ReplaceSchedulingV1alpha2NamespacedPodGroupStatusOutput =
  typeof ReplaceSchedulingV1alpha2NamespacedPodGroupStatusOutput.Type;

// The operation
/**
 * replace status of the specified PodGroup
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceSchedulingV1alpha2NamespacedPodGroupStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReplaceSchedulingV1alpha2NamespacedPodGroupStatusInput,
    outputSchema: ReplaceSchedulingV1alpha2NamespacedPodGroupStatusOutput,
  }));
// Input Schema
export const ReplaceSchedulingV1alpha2NamespacedWorkloadInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/scheduling.k8s.io/v1alpha2/namespaces/{namespace}/workloads/{name}",
    }),
  );
export type ReplaceSchedulingV1alpha2NamespacedWorkloadInput =
  typeof ReplaceSchedulingV1alpha2NamespacedWorkloadInput.Type;

// Output Schema
export const ReplaceSchedulingV1alpha2NamespacedWorkloadOutput =
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
      controllerRef: Schema.optional(
        Schema.Struct({
          apiGroup: Schema.optional(Schema.String),
          kind: Schema.String,
          name: Schema.String,
        }),
      ),
      podGroupTemplates: Schema.Array(
        Schema.Struct({
          name: Schema.String,
          schedulingPolicy: Schema.Struct({
            basic: Schema.optional(Schema.Unknown),
            gang: Schema.optional(
              Schema.Struct({
                minCount: Schema.Number,
              }),
            ),
          }),
        }),
      ),
    }),
  });
export type ReplaceSchedulingV1alpha2NamespacedWorkloadOutput =
  typeof ReplaceSchedulingV1alpha2NamespacedWorkloadOutput.Type;

// The operation
/**
 * replace the specified Workload
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceSchedulingV1alpha2NamespacedWorkload =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReplaceSchedulingV1alpha2NamespacedWorkloadInput,
    outputSchema: ReplaceSchedulingV1alpha2NamespacedWorkloadOutput,
  }));
// Input Schema
export const WatchSchedulingV1PriorityClassInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/scheduling.k8s.io/v1/watch/priorityclasses/{name}",
    }),
  );
export type WatchSchedulingV1PriorityClassInput =
  typeof WatchSchedulingV1PriorityClassInput.Type;

// Output Schema
export const WatchSchedulingV1PriorityClassOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchSchedulingV1PriorityClassOutput =
  typeof WatchSchedulingV1PriorityClassOutput.Type;

// The operation
/**
 * watch changes to an object of kind PriorityClass. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
 */
export const watchSchedulingV1PriorityClass =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchSchedulingV1PriorityClassInput,
    outputSchema: WatchSchedulingV1PriorityClassOutput,
  }));
// Input Schema
export const WatchSchedulingV1PriorityClassListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/scheduling.k8s.io/v1/watch/priorityclasses",
    }),
  );
export type WatchSchedulingV1PriorityClassListInput =
  typeof WatchSchedulingV1PriorityClassListInput.Type;

// Output Schema
export const WatchSchedulingV1PriorityClassListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchSchedulingV1PriorityClassListOutput =
  typeof WatchSchedulingV1PriorityClassListOutput.Type;

// The operation
/**
 * watch individual changes to a list of PriorityClass. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchSchedulingV1PriorityClassList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchSchedulingV1PriorityClassListInput,
    outputSchema: WatchSchedulingV1PriorityClassListOutput,
  }));
// Input Schema
export const WatchSchedulingV1alpha2NamespacedPodGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/scheduling.k8s.io/v1alpha2/watch/namespaces/{namespace}/podgroups/{name}",
    }),
  );
export type WatchSchedulingV1alpha2NamespacedPodGroupInput =
  typeof WatchSchedulingV1alpha2NamespacedPodGroupInput.Type;

// Output Schema
export const WatchSchedulingV1alpha2NamespacedPodGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchSchedulingV1alpha2NamespacedPodGroupOutput =
  typeof WatchSchedulingV1alpha2NamespacedPodGroupOutput.Type;

// The operation
/**
 * watch changes to an object of kind PodGroup. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
 */
export const watchSchedulingV1alpha2NamespacedPodGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchSchedulingV1alpha2NamespacedPodGroupInput,
    outputSchema: WatchSchedulingV1alpha2NamespacedPodGroupOutput,
  }));
// Input Schema
export const WatchSchedulingV1alpha2NamespacedPodGroupListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/scheduling.k8s.io/v1alpha2/watch/namespaces/{namespace}/podgroups",
    }),
  );
export type WatchSchedulingV1alpha2NamespacedPodGroupListInput =
  typeof WatchSchedulingV1alpha2NamespacedPodGroupListInput.Type;

// Output Schema
export const WatchSchedulingV1alpha2NamespacedPodGroupListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchSchedulingV1alpha2NamespacedPodGroupListOutput =
  typeof WatchSchedulingV1alpha2NamespacedPodGroupListOutput.Type;

// The operation
/**
 * watch individual changes to a list of PodGroup. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchSchedulingV1alpha2NamespacedPodGroupList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchSchedulingV1alpha2NamespacedPodGroupListInput,
    outputSchema: WatchSchedulingV1alpha2NamespacedPodGroupListOutput,
  }));
// Input Schema
export const WatchSchedulingV1alpha2NamespacedWorkloadInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/scheduling.k8s.io/v1alpha2/watch/namespaces/{namespace}/workloads/{name}",
    }),
  );
export type WatchSchedulingV1alpha2NamespacedWorkloadInput =
  typeof WatchSchedulingV1alpha2NamespacedWorkloadInput.Type;

// Output Schema
export const WatchSchedulingV1alpha2NamespacedWorkloadOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchSchedulingV1alpha2NamespacedWorkloadOutput =
  typeof WatchSchedulingV1alpha2NamespacedWorkloadOutput.Type;

// The operation
/**
 * watch changes to an object of kind Workload. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
 */
export const watchSchedulingV1alpha2NamespacedWorkload =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchSchedulingV1alpha2NamespacedWorkloadInput,
    outputSchema: WatchSchedulingV1alpha2NamespacedWorkloadOutput,
  }));
// Input Schema
export const WatchSchedulingV1alpha2NamespacedWorkloadListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/scheduling.k8s.io/v1alpha2/watch/namespaces/{namespace}/workloads",
    }),
  );
export type WatchSchedulingV1alpha2NamespacedWorkloadListInput =
  typeof WatchSchedulingV1alpha2NamespacedWorkloadListInput.Type;

// Output Schema
export const WatchSchedulingV1alpha2NamespacedWorkloadListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchSchedulingV1alpha2NamespacedWorkloadListOutput =
  typeof WatchSchedulingV1alpha2NamespacedWorkloadListOutput.Type;

// The operation
/**
 * watch individual changes to a list of Workload. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchSchedulingV1alpha2NamespacedWorkloadList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchSchedulingV1alpha2NamespacedWorkloadListInput,
    outputSchema: WatchSchedulingV1alpha2NamespacedWorkloadListOutput,
  }));
// Input Schema
export const WatchSchedulingV1alpha2PodGroupListForAllNamespacesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/scheduling.k8s.io/v1alpha2/watch/podgroups",
    }),
  );
export type WatchSchedulingV1alpha2PodGroupListForAllNamespacesInput =
  typeof WatchSchedulingV1alpha2PodGroupListForAllNamespacesInput.Type;

// Output Schema
export const WatchSchedulingV1alpha2PodGroupListForAllNamespacesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchSchedulingV1alpha2PodGroupListForAllNamespacesOutput =
  typeof WatchSchedulingV1alpha2PodGroupListForAllNamespacesOutput.Type;

// The operation
/**
 * watch individual changes to a list of PodGroup. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchSchedulingV1alpha2PodGroupListForAllNamespaces =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchSchedulingV1alpha2PodGroupListForAllNamespacesInput,
    outputSchema: WatchSchedulingV1alpha2PodGroupListForAllNamespacesOutput,
  }));
// Input Schema
export const WatchSchedulingV1alpha2WorkloadListForAllNamespacesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/scheduling.k8s.io/v1alpha2/watch/workloads",
    }),
  );
export type WatchSchedulingV1alpha2WorkloadListForAllNamespacesInput =
  typeof WatchSchedulingV1alpha2WorkloadListForAllNamespacesInput.Type;

// Output Schema
export const WatchSchedulingV1alpha2WorkloadListForAllNamespacesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchSchedulingV1alpha2WorkloadListForAllNamespacesOutput =
  typeof WatchSchedulingV1alpha2WorkloadListForAllNamespacesOutput.Type;

// The operation
/**
 * watch individual changes to a list of Workload. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchSchedulingV1alpha2WorkloadListForAllNamespaces =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchSchedulingV1alpha2WorkloadListForAllNamespacesInput,
    outputSchema: WatchSchedulingV1alpha2WorkloadListForAllNamespacesOutput,
  }));
