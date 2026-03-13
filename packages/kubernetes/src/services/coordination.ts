/**
 * Kubernetes Coordination API
 *
 * Generated from the Kubernetes OpenAPI spec.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";

// Input Schema
export const CreateCoordinationV1NamespacedLeaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/apis/coordination.k8s.io/v1/namespaces/{namespace}/leases",
    }),
  );
export type CreateCoordinationV1NamespacedLeaseInput =
  typeof CreateCoordinationV1NamespacedLeaseInput.Type;

// Output Schema
export const CreateCoordinationV1NamespacedLeaseOutput =
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
        acquireTime: Schema.optional(Schema.String),
        holderIdentity: Schema.optional(Schema.String),
        leaseDurationSeconds: Schema.optional(Schema.Number),
        leaseTransitions: Schema.optional(Schema.Number),
        preferredHolder: Schema.optional(Schema.String),
        renewTime: Schema.optional(Schema.String),
        strategy: Schema.optional(Schema.String),
      }),
    ),
  });
export type CreateCoordinationV1NamespacedLeaseOutput =
  typeof CreateCoordinationV1NamespacedLeaseOutput.Type;

// The operation
/**
 * create a Lease
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const createCoordinationV1NamespacedLease =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateCoordinationV1NamespacedLeaseInput,
    outputSchema: CreateCoordinationV1NamespacedLeaseOutput,
  }));
// Input Schema
export const CreateCoordinationV1alpha2NamespacedLeaseCandidateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/apis/coordination.k8s.io/v1alpha2/namespaces/{namespace}/leasecandidates",
    }),
  );
export type CreateCoordinationV1alpha2NamespacedLeaseCandidateInput =
  typeof CreateCoordinationV1alpha2NamespacedLeaseCandidateInput.Type;

// Output Schema
export const CreateCoordinationV1alpha2NamespacedLeaseCandidateOutput =
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
      binaryVersion: Schema.String,
      emulationVersion: Schema.optional(Schema.String),
      leaseName: Schema.String,
      pingTime: Schema.optional(Schema.String),
      renewTime: Schema.optional(Schema.String),
      strategy: Schema.String,
    }),
  });
export type CreateCoordinationV1alpha2NamespacedLeaseCandidateOutput =
  typeof CreateCoordinationV1alpha2NamespacedLeaseCandidateOutput.Type;

// The operation
/**
 * create a LeaseCandidate
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const createCoordinationV1alpha2NamespacedLeaseCandidate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateCoordinationV1alpha2NamespacedLeaseCandidateInput,
    outputSchema: CreateCoordinationV1alpha2NamespacedLeaseCandidateOutput,
  }));
// Input Schema
export const CreateCoordinationV1beta1NamespacedLeaseCandidateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/apis/coordination.k8s.io/v1beta1/namespaces/{namespace}/leasecandidates",
    }),
  );
export type CreateCoordinationV1beta1NamespacedLeaseCandidateInput =
  typeof CreateCoordinationV1beta1NamespacedLeaseCandidateInput.Type;

// Output Schema
export const CreateCoordinationV1beta1NamespacedLeaseCandidateOutput =
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
      binaryVersion: Schema.String,
      emulationVersion: Schema.optional(Schema.String),
      leaseName: Schema.String,
      pingTime: Schema.optional(Schema.String),
      renewTime: Schema.optional(Schema.String),
      strategy: Schema.String,
    }),
  });
export type CreateCoordinationV1beta1NamespacedLeaseCandidateOutput =
  typeof CreateCoordinationV1beta1NamespacedLeaseCandidateOutput.Type;

// The operation
/**
 * create a LeaseCandidate
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const createCoordinationV1beta1NamespacedLeaseCandidate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateCoordinationV1beta1NamespacedLeaseCandidateInput,
    outputSchema: CreateCoordinationV1beta1NamespacedLeaseCandidateOutput,
  }));
// Input Schema
export const DeleteCoordinationV1CollectionNamespacedLeaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/coordination.k8s.io/v1/namespaces/{namespace}/leases",
    }),
  );
export type DeleteCoordinationV1CollectionNamespacedLeaseInput =
  typeof DeleteCoordinationV1CollectionNamespacedLeaseInput.Type;

// Output Schema
export const DeleteCoordinationV1CollectionNamespacedLeaseOutput =
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
export type DeleteCoordinationV1CollectionNamespacedLeaseOutput =
  typeof DeleteCoordinationV1CollectionNamespacedLeaseOutput.Type;

// The operation
/**
 * delete collection of Lease
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteCoordinationV1CollectionNamespacedLease =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteCoordinationV1CollectionNamespacedLeaseInput,
    outputSchema: DeleteCoordinationV1CollectionNamespacedLeaseOutput,
  }));
// Input Schema
export const DeleteCoordinationV1NamespacedLeaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/coordination.k8s.io/v1/namespaces/{namespace}/leases/{name}",
    }),
  );
export type DeleteCoordinationV1NamespacedLeaseInput =
  typeof DeleteCoordinationV1NamespacedLeaseInput.Type;

// Output Schema
export const DeleteCoordinationV1NamespacedLeaseOutput =
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
export type DeleteCoordinationV1NamespacedLeaseOutput =
  typeof DeleteCoordinationV1NamespacedLeaseOutput.Type;

// The operation
/**
 * delete a Lease
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteCoordinationV1NamespacedLease =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteCoordinationV1NamespacedLeaseInput,
    outputSchema: DeleteCoordinationV1NamespacedLeaseOutput,
  }));
// Input Schema
export const DeleteCoordinationV1alpha2CollectionNamespacedLeaseCandidateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/coordination.k8s.io/v1alpha2/namespaces/{namespace}/leasecandidates",
    }),
  );
export type DeleteCoordinationV1alpha2CollectionNamespacedLeaseCandidateInput =
  typeof DeleteCoordinationV1alpha2CollectionNamespacedLeaseCandidateInput.Type;

// Output Schema
export const DeleteCoordinationV1alpha2CollectionNamespacedLeaseCandidateOutput =
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
export type DeleteCoordinationV1alpha2CollectionNamespacedLeaseCandidateOutput =
  typeof DeleteCoordinationV1alpha2CollectionNamespacedLeaseCandidateOutput.Type;

// The operation
/**
 * delete collection of LeaseCandidate
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteCoordinationV1alpha2CollectionNamespacedLeaseCandidate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      DeleteCoordinationV1alpha2CollectionNamespacedLeaseCandidateInput,
    outputSchema:
      DeleteCoordinationV1alpha2CollectionNamespacedLeaseCandidateOutput,
  }));
// Input Schema
export const DeleteCoordinationV1alpha2NamespacedLeaseCandidateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/coordination.k8s.io/v1alpha2/namespaces/{namespace}/leasecandidates/{name}",
    }),
  );
export type DeleteCoordinationV1alpha2NamespacedLeaseCandidateInput =
  typeof DeleteCoordinationV1alpha2NamespacedLeaseCandidateInput.Type;

// Output Schema
export const DeleteCoordinationV1alpha2NamespacedLeaseCandidateOutput =
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
export type DeleteCoordinationV1alpha2NamespacedLeaseCandidateOutput =
  typeof DeleteCoordinationV1alpha2NamespacedLeaseCandidateOutput.Type;

// The operation
/**
 * delete a LeaseCandidate
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteCoordinationV1alpha2NamespacedLeaseCandidate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteCoordinationV1alpha2NamespacedLeaseCandidateInput,
    outputSchema: DeleteCoordinationV1alpha2NamespacedLeaseCandidateOutput,
  }));
// Input Schema
export const DeleteCoordinationV1beta1CollectionNamespacedLeaseCandidateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/coordination.k8s.io/v1beta1/namespaces/{namespace}/leasecandidates",
    }),
  );
export type DeleteCoordinationV1beta1CollectionNamespacedLeaseCandidateInput =
  typeof DeleteCoordinationV1beta1CollectionNamespacedLeaseCandidateInput.Type;

// Output Schema
export const DeleteCoordinationV1beta1CollectionNamespacedLeaseCandidateOutput =
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
export type DeleteCoordinationV1beta1CollectionNamespacedLeaseCandidateOutput =
  typeof DeleteCoordinationV1beta1CollectionNamespacedLeaseCandidateOutput.Type;

// The operation
/**
 * delete collection of LeaseCandidate
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteCoordinationV1beta1CollectionNamespacedLeaseCandidate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      DeleteCoordinationV1beta1CollectionNamespacedLeaseCandidateInput,
    outputSchema:
      DeleteCoordinationV1beta1CollectionNamespacedLeaseCandidateOutput,
  }));
// Input Schema
export const DeleteCoordinationV1beta1NamespacedLeaseCandidateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/coordination.k8s.io/v1beta1/namespaces/{namespace}/leasecandidates/{name}",
    }),
  );
export type DeleteCoordinationV1beta1NamespacedLeaseCandidateInput =
  typeof DeleteCoordinationV1beta1NamespacedLeaseCandidateInput.Type;

// Output Schema
export const DeleteCoordinationV1beta1NamespacedLeaseCandidateOutput =
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
export type DeleteCoordinationV1beta1NamespacedLeaseCandidateOutput =
  typeof DeleteCoordinationV1beta1NamespacedLeaseCandidateOutput.Type;

// The operation
/**
 * delete a LeaseCandidate
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteCoordinationV1beta1NamespacedLeaseCandidate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteCoordinationV1beta1NamespacedLeaseCandidateInput,
    outputSchema: DeleteCoordinationV1beta1NamespacedLeaseCandidateOutput,
  }));
// Input Schema
export const GetCoordinationAPIGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/apis/coordination.k8s.io/" }),
  );
export type GetCoordinationAPIGroupInput =
  typeof GetCoordinationAPIGroupInput.Type;

// Output Schema
export const GetCoordinationAPIGroupOutput =
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
export type GetCoordinationAPIGroupOutput =
  typeof GetCoordinationAPIGroupOutput.Type;

// The operation
/**
 * get information of a group
 */
export const getCoordinationAPIGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetCoordinationAPIGroupInput,
    outputSchema: GetCoordinationAPIGroupOutput,
  }),
);
// Input Schema
export const GetCoordinationV1APIResourcesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/apis/coordination.k8s.io/v1/" }),
  );
export type GetCoordinationV1APIResourcesInput =
  typeof GetCoordinationV1APIResourcesInput.Type;

// Output Schema
export const GetCoordinationV1APIResourcesOutput =
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
export type GetCoordinationV1APIResourcesOutput =
  typeof GetCoordinationV1APIResourcesOutput.Type;

// The operation
/**
 * get available resources
 */
export const getCoordinationV1APIResources =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetCoordinationV1APIResourcesInput,
    outputSchema: GetCoordinationV1APIResourcesOutput,
  }));
// Input Schema
export const GetCoordinationV1alpha2APIResourcesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/apis/coordination.k8s.io/v1alpha2/" }),
  );
export type GetCoordinationV1alpha2APIResourcesInput =
  typeof GetCoordinationV1alpha2APIResourcesInput.Type;

// Output Schema
export const GetCoordinationV1alpha2APIResourcesOutput =
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
export type GetCoordinationV1alpha2APIResourcesOutput =
  typeof GetCoordinationV1alpha2APIResourcesOutput.Type;

// The operation
/**
 * get available resources
 */
export const getCoordinationV1alpha2APIResources =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetCoordinationV1alpha2APIResourcesInput,
    outputSchema: GetCoordinationV1alpha2APIResourcesOutput,
  }));
// Input Schema
export const GetCoordinationV1beta1APIResourcesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/apis/coordination.k8s.io/v1beta1/" }),
  );
export type GetCoordinationV1beta1APIResourcesInput =
  typeof GetCoordinationV1beta1APIResourcesInput.Type;

// Output Schema
export const GetCoordinationV1beta1APIResourcesOutput =
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
export type GetCoordinationV1beta1APIResourcesOutput =
  typeof GetCoordinationV1beta1APIResourcesOutput.Type;

// The operation
/**
 * get available resources
 */
export const getCoordinationV1beta1APIResources =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetCoordinationV1beta1APIResourcesInput,
    outputSchema: GetCoordinationV1beta1APIResourcesOutput,
  }));
// Input Schema
export const ListCoordinationV1LeaseForAllNamespacesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/apis/coordination.k8s.io/v1/leases" }),
  );
export type ListCoordinationV1LeaseForAllNamespacesInput =
  typeof ListCoordinationV1LeaseForAllNamespacesInput.Type;

// Output Schema
export const ListCoordinationV1LeaseForAllNamespacesOutput =
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
            acquireTime: Schema.optional(Schema.String),
            holderIdentity: Schema.optional(Schema.String),
            leaseDurationSeconds: Schema.optional(Schema.Number),
            leaseTransitions: Schema.optional(Schema.Number),
            preferredHolder: Schema.optional(Schema.String),
            renewTime: Schema.optional(Schema.String),
            strategy: Schema.optional(Schema.String),
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
export type ListCoordinationV1LeaseForAllNamespacesOutput =
  typeof ListCoordinationV1LeaseForAllNamespacesOutput.Type;

// The operation
/**
 * list or watch objects of kind Lease
 */
export const listCoordinationV1LeaseForAllNamespaces =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListCoordinationV1LeaseForAllNamespacesInput,
    outputSchema: ListCoordinationV1LeaseForAllNamespacesOutput,
  }));
// Input Schema
export const ListCoordinationV1NamespacedLeaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/coordination.k8s.io/v1/namespaces/{namespace}/leases",
    }),
  );
export type ListCoordinationV1NamespacedLeaseInput =
  typeof ListCoordinationV1NamespacedLeaseInput.Type;

// Output Schema
export const ListCoordinationV1NamespacedLeaseOutput =
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
            acquireTime: Schema.optional(Schema.String),
            holderIdentity: Schema.optional(Schema.String),
            leaseDurationSeconds: Schema.optional(Schema.Number),
            leaseTransitions: Schema.optional(Schema.Number),
            preferredHolder: Schema.optional(Schema.String),
            renewTime: Schema.optional(Schema.String),
            strategy: Schema.optional(Schema.String),
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
export type ListCoordinationV1NamespacedLeaseOutput =
  typeof ListCoordinationV1NamespacedLeaseOutput.Type;

// The operation
/**
 * list or watch objects of kind Lease
 */
export const listCoordinationV1NamespacedLease =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListCoordinationV1NamespacedLeaseInput,
    outputSchema: ListCoordinationV1NamespacedLeaseOutput,
  }));
// Input Schema
export const ListCoordinationV1alpha2LeaseCandidateForAllNamespacesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/coordination.k8s.io/v1alpha2/leasecandidates",
    }),
  );
export type ListCoordinationV1alpha2LeaseCandidateForAllNamespacesInput =
  typeof ListCoordinationV1alpha2LeaseCandidateForAllNamespacesInput.Type;

// Output Schema
export const ListCoordinationV1alpha2LeaseCandidateForAllNamespacesOutput =
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
          binaryVersion: Schema.String,
          emulationVersion: Schema.optional(Schema.String),
          leaseName: Schema.String,
          pingTime: Schema.optional(Schema.String),
          renewTime: Schema.optional(Schema.String),
          strategy: Schema.String,
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
export type ListCoordinationV1alpha2LeaseCandidateForAllNamespacesOutput =
  typeof ListCoordinationV1alpha2LeaseCandidateForAllNamespacesOutput.Type;

// The operation
/**
 * list or watch objects of kind LeaseCandidate
 */
export const listCoordinationV1alpha2LeaseCandidateForAllNamespaces =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListCoordinationV1alpha2LeaseCandidateForAllNamespacesInput,
    outputSchema: ListCoordinationV1alpha2LeaseCandidateForAllNamespacesOutput,
  }));
// Input Schema
export const ListCoordinationV1alpha2NamespacedLeaseCandidateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/coordination.k8s.io/v1alpha2/namespaces/{namespace}/leasecandidates",
    }),
  );
export type ListCoordinationV1alpha2NamespacedLeaseCandidateInput =
  typeof ListCoordinationV1alpha2NamespacedLeaseCandidateInput.Type;

// Output Schema
export const ListCoordinationV1alpha2NamespacedLeaseCandidateOutput =
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
          binaryVersion: Schema.String,
          emulationVersion: Schema.optional(Schema.String),
          leaseName: Schema.String,
          pingTime: Schema.optional(Schema.String),
          renewTime: Schema.optional(Schema.String),
          strategy: Schema.String,
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
export type ListCoordinationV1alpha2NamespacedLeaseCandidateOutput =
  typeof ListCoordinationV1alpha2NamespacedLeaseCandidateOutput.Type;

// The operation
/**
 * list or watch objects of kind LeaseCandidate
 */
export const listCoordinationV1alpha2NamespacedLeaseCandidate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListCoordinationV1alpha2NamespacedLeaseCandidateInput,
    outputSchema: ListCoordinationV1alpha2NamespacedLeaseCandidateOutput,
  }));
// Input Schema
export const ListCoordinationV1beta1LeaseCandidateForAllNamespacesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/coordination.k8s.io/v1beta1/leasecandidates",
    }),
  );
export type ListCoordinationV1beta1LeaseCandidateForAllNamespacesInput =
  typeof ListCoordinationV1beta1LeaseCandidateForAllNamespacesInput.Type;

// Output Schema
export const ListCoordinationV1beta1LeaseCandidateForAllNamespacesOutput =
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
          binaryVersion: Schema.String,
          emulationVersion: Schema.optional(Schema.String),
          leaseName: Schema.String,
          pingTime: Schema.optional(Schema.String),
          renewTime: Schema.optional(Schema.String),
          strategy: Schema.String,
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
export type ListCoordinationV1beta1LeaseCandidateForAllNamespacesOutput =
  typeof ListCoordinationV1beta1LeaseCandidateForAllNamespacesOutput.Type;

// The operation
/**
 * list or watch objects of kind LeaseCandidate
 */
export const listCoordinationV1beta1LeaseCandidateForAllNamespaces =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListCoordinationV1beta1LeaseCandidateForAllNamespacesInput,
    outputSchema: ListCoordinationV1beta1LeaseCandidateForAllNamespacesOutput,
  }));
// Input Schema
export const ListCoordinationV1beta1NamespacedLeaseCandidateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/coordination.k8s.io/v1beta1/namespaces/{namespace}/leasecandidates",
    }),
  );
export type ListCoordinationV1beta1NamespacedLeaseCandidateInput =
  typeof ListCoordinationV1beta1NamespacedLeaseCandidateInput.Type;

// Output Schema
export const ListCoordinationV1beta1NamespacedLeaseCandidateOutput =
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
          binaryVersion: Schema.String,
          emulationVersion: Schema.optional(Schema.String),
          leaseName: Schema.String,
          pingTime: Schema.optional(Schema.String),
          renewTime: Schema.optional(Schema.String),
          strategy: Schema.String,
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
export type ListCoordinationV1beta1NamespacedLeaseCandidateOutput =
  typeof ListCoordinationV1beta1NamespacedLeaseCandidateOutput.Type;

// The operation
/**
 * list or watch objects of kind LeaseCandidate
 */
export const listCoordinationV1beta1NamespacedLeaseCandidate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListCoordinationV1beta1NamespacedLeaseCandidateInput,
    outputSchema: ListCoordinationV1beta1NamespacedLeaseCandidateOutput,
  }));
// Input Schema
export const PatchCoordinationV1NamespacedLeaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/coordination.k8s.io/v1/namespaces/{namespace}/leases/{name}",
    }),
  );
export type PatchCoordinationV1NamespacedLeaseInput =
  typeof PatchCoordinationV1NamespacedLeaseInput.Type;

// Output Schema
export const PatchCoordinationV1NamespacedLeaseOutput =
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
        acquireTime: Schema.optional(Schema.String),
        holderIdentity: Schema.optional(Schema.String),
        leaseDurationSeconds: Schema.optional(Schema.Number),
        leaseTransitions: Schema.optional(Schema.Number),
        preferredHolder: Schema.optional(Schema.String),
        renewTime: Schema.optional(Schema.String),
        strategy: Schema.optional(Schema.String),
      }),
    ),
  });
export type PatchCoordinationV1NamespacedLeaseOutput =
  typeof PatchCoordinationV1NamespacedLeaseOutput.Type;

// The operation
/**
 * partially update the specified Lease
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchCoordinationV1NamespacedLease =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PatchCoordinationV1NamespacedLeaseInput,
    outputSchema: PatchCoordinationV1NamespacedLeaseOutput,
  }));
// Input Schema
export const PatchCoordinationV1alpha2NamespacedLeaseCandidateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/coordination.k8s.io/v1alpha2/namespaces/{namespace}/leasecandidates/{name}",
    }),
  );
export type PatchCoordinationV1alpha2NamespacedLeaseCandidateInput =
  typeof PatchCoordinationV1alpha2NamespacedLeaseCandidateInput.Type;

// Output Schema
export const PatchCoordinationV1alpha2NamespacedLeaseCandidateOutput =
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
      binaryVersion: Schema.String,
      emulationVersion: Schema.optional(Schema.String),
      leaseName: Schema.String,
      pingTime: Schema.optional(Schema.String),
      renewTime: Schema.optional(Schema.String),
      strategy: Schema.String,
    }),
  });
export type PatchCoordinationV1alpha2NamespacedLeaseCandidateOutput =
  typeof PatchCoordinationV1alpha2NamespacedLeaseCandidateOutput.Type;

// The operation
/**
 * partially update the specified LeaseCandidate
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchCoordinationV1alpha2NamespacedLeaseCandidate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PatchCoordinationV1alpha2NamespacedLeaseCandidateInput,
    outputSchema: PatchCoordinationV1alpha2NamespacedLeaseCandidateOutput,
  }));
// Input Schema
export const PatchCoordinationV1beta1NamespacedLeaseCandidateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/coordination.k8s.io/v1beta1/namespaces/{namespace}/leasecandidates/{name}",
    }),
  );
export type PatchCoordinationV1beta1NamespacedLeaseCandidateInput =
  typeof PatchCoordinationV1beta1NamespacedLeaseCandidateInput.Type;

// Output Schema
export const PatchCoordinationV1beta1NamespacedLeaseCandidateOutput =
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
      binaryVersion: Schema.String,
      emulationVersion: Schema.optional(Schema.String),
      leaseName: Schema.String,
      pingTime: Schema.optional(Schema.String),
      renewTime: Schema.optional(Schema.String),
      strategy: Schema.String,
    }),
  });
export type PatchCoordinationV1beta1NamespacedLeaseCandidateOutput =
  typeof PatchCoordinationV1beta1NamespacedLeaseCandidateOutput.Type;

// The operation
/**
 * partially update the specified LeaseCandidate
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchCoordinationV1beta1NamespacedLeaseCandidate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PatchCoordinationV1beta1NamespacedLeaseCandidateInput,
    outputSchema: PatchCoordinationV1beta1NamespacedLeaseCandidateOutput,
  }));
// Input Schema
export const ReadCoordinationV1NamespacedLeaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/coordination.k8s.io/v1/namespaces/{namespace}/leases/{name}",
    }),
  );
export type ReadCoordinationV1NamespacedLeaseInput =
  typeof ReadCoordinationV1NamespacedLeaseInput.Type;

// Output Schema
export const ReadCoordinationV1NamespacedLeaseOutput =
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
        acquireTime: Schema.optional(Schema.String),
        holderIdentity: Schema.optional(Schema.String),
        leaseDurationSeconds: Schema.optional(Schema.Number),
        leaseTransitions: Schema.optional(Schema.Number),
        preferredHolder: Schema.optional(Schema.String),
        renewTime: Schema.optional(Schema.String),
        strategy: Schema.optional(Schema.String),
      }),
    ),
  });
export type ReadCoordinationV1NamespacedLeaseOutput =
  typeof ReadCoordinationV1NamespacedLeaseOutput.Type;

// The operation
/**
 * read the specified Lease
 */
export const readCoordinationV1NamespacedLease =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReadCoordinationV1NamespacedLeaseInput,
    outputSchema: ReadCoordinationV1NamespacedLeaseOutput,
  }));
// Input Schema
export const ReadCoordinationV1alpha2NamespacedLeaseCandidateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/coordination.k8s.io/v1alpha2/namespaces/{namespace}/leasecandidates/{name}",
    }),
  );
export type ReadCoordinationV1alpha2NamespacedLeaseCandidateInput =
  typeof ReadCoordinationV1alpha2NamespacedLeaseCandidateInput.Type;

// Output Schema
export const ReadCoordinationV1alpha2NamespacedLeaseCandidateOutput =
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
      binaryVersion: Schema.String,
      emulationVersion: Schema.optional(Schema.String),
      leaseName: Schema.String,
      pingTime: Schema.optional(Schema.String),
      renewTime: Schema.optional(Schema.String),
      strategy: Schema.String,
    }),
  });
export type ReadCoordinationV1alpha2NamespacedLeaseCandidateOutput =
  typeof ReadCoordinationV1alpha2NamespacedLeaseCandidateOutput.Type;

// The operation
/**
 * read the specified LeaseCandidate
 */
export const readCoordinationV1alpha2NamespacedLeaseCandidate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReadCoordinationV1alpha2NamespacedLeaseCandidateInput,
    outputSchema: ReadCoordinationV1alpha2NamespacedLeaseCandidateOutput,
  }));
// Input Schema
export const ReadCoordinationV1beta1NamespacedLeaseCandidateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/coordination.k8s.io/v1beta1/namespaces/{namespace}/leasecandidates/{name}",
    }),
  );
export type ReadCoordinationV1beta1NamespacedLeaseCandidateInput =
  typeof ReadCoordinationV1beta1NamespacedLeaseCandidateInput.Type;

// Output Schema
export const ReadCoordinationV1beta1NamespacedLeaseCandidateOutput =
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
      binaryVersion: Schema.String,
      emulationVersion: Schema.optional(Schema.String),
      leaseName: Schema.String,
      pingTime: Schema.optional(Schema.String),
      renewTime: Schema.optional(Schema.String),
      strategy: Schema.String,
    }),
  });
export type ReadCoordinationV1beta1NamespacedLeaseCandidateOutput =
  typeof ReadCoordinationV1beta1NamespacedLeaseCandidateOutput.Type;

// The operation
/**
 * read the specified LeaseCandidate
 */
export const readCoordinationV1beta1NamespacedLeaseCandidate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReadCoordinationV1beta1NamespacedLeaseCandidateInput,
    outputSchema: ReadCoordinationV1beta1NamespacedLeaseCandidateOutput,
  }));
// Input Schema
export const ReplaceCoordinationV1NamespacedLeaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/coordination.k8s.io/v1/namespaces/{namespace}/leases/{name}",
    }),
  );
export type ReplaceCoordinationV1NamespacedLeaseInput =
  typeof ReplaceCoordinationV1NamespacedLeaseInput.Type;

// Output Schema
export const ReplaceCoordinationV1NamespacedLeaseOutput =
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
        acquireTime: Schema.optional(Schema.String),
        holderIdentity: Schema.optional(Schema.String),
        leaseDurationSeconds: Schema.optional(Schema.Number),
        leaseTransitions: Schema.optional(Schema.Number),
        preferredHolder: Schema.optional(Schema.String),
        renewTime: Schema.optional(Schema.String),
        strategy: Schema.optional(Schema.String),
      }),
    ),
  });
export type ReplaceCoordinationV1NamespacedLeaseOutput =
  typeof ReplaceCoordinationV1NamespacedLeaseOutput.Type;

// The operation
/**
 * replace the specified Lease
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceCoordinationV1NamespacedLease =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReplaceCoordinationV1NamespacedLeaseInput,
    outputSchema: ReplaceCoordinationV1NamespacedLeaseOutput,
  }));
// Input Schema
export const ReplaceCoordinationV1alpha2NamespacedLeaseCandidateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/coordination.k8s.io/v1alpha2/namespaces/{namespace}/leasecandidates/{name}",
    }),
  );
export type ReplaceCoordinationV1alpha2NamespacedLeaseCandidateInput =
  typeof ReplaceCoordinationV1alpha2NamespacedLeaseCandidateInput.Type;

// Output Schema
export const ReplaceCoordinationV1alpha2NamespacedLeaseCandidateOutput =
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
      binaryVersion: Schema.String,
      emulationVersion: Schema.optional(Schema.String),
      leaseName: Schema.String,
      pingTime: Schema.optional(Schema.String),
      renewTime: Schema.optional(Schema.String),
      strategy: Schema.String,
    }),
  });
export type ReplaceCoordinationV1alpha2NamespacedLeaseCandidateOutput =
  typeof ReplaceCoordinationV1alpha2NamespacedLeaseCandidateOutput.Type;

// The operation
/**
 * replace the specified LeaseCandidate
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceCoordinationV1alpha2NamespacedLeaseCandidate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReplaceCoordinationV1alpha2NamespacedLeaseCandidateInput,
    outputSchema: ReplaceCoordinationV1alpha2NamespacedLeaseCandidateOutput,
  }));
// Input Schema
export const ReplaceCoordinationV1beta1NamespacedLeaseCandidateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/coordination.k8s.io/v1beta1/namespaces/{namespace}/leasecandidates/{name}",
    }),
  );
export type ReplaceCoordinationV1beta1NamespacedLeaseCandidateInput =
  typeof ReplaceCoordinationV1beta1NamespacedLeaseCandidateInput.Type;

// Output Schema
export const ReplaceCoordinationV1beta1NamespacedLeaseCandidateOutput =
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
      binaryVersion: Schema.String,
      emulationVersion: Schema.optional(Schema.String),
      leaseName: Schema.String,
      pingTime: Schema.optional(Schema.String),
      renewTime: Schema.optional(Schema.String),
      strategy: Schema.String,
    }),
  });
export type ReplaceCoordinationV1beta1NamespacedLeaseCandidateOutput =
  typeof ReplaceCoordinationV1beta1NamespacedLeaseCandidateOutput.Type;

// The operation
/**
 * replace the specified LeaseCandidate
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceCoordinationV1beta1NamespacedLeaseCandidate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReplaceCoordinationV1beta1NamespacedLeaseCandidateInput,
    outputSchema: ReplaceCoordinationV1beta1NamespacedLeaseCandidateOutput,
  }));
// Input Schema
export const WatchCoordinationV1LeaseListForAllNamespacesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/coordination.k8s.io/v1/watch/leases",
    }),
  );
export type WatchCoordinationV1LeaseListForAllNamespacesInput =
  typeof WatchCoordinationV1LeaseListForAllNamespacesInput.Type;

// Output Schema
export const WatchCoordinationV1LeaseListForAllNamespacesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchCoordinationV1LeaseListForAllNamespacesOutput =
  typeof WatchCoordinationV1LeaseListForAllNamespacesOutput.Type;

// The operation
/**
 * watch individual changes to a list of Lease. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchCoordinationV1LeaseListForAllNamespaces =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchCoordinationV1LeaseListForAllNamespacesInput,
    outputSchema: WatchCoordinationV1LeaseListForAllNamespacesOutput,
  }));
// Input Schema
export const WatchCoordinationV1NamespacedLeaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/coordination.k8s.io/v1/watch/namespaces/{namespace}/leases/{name}",
    }),
  );
export type WatchCoordinationV1NamespacedLeaseInput =
  typeof WatchCoordinationV1NamespacedLeaseInput.Type;

// Output Schema
export const WatchCoordinationV1NamespacedLeaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchCoordinationV1NamespacedLeaseOutput =
  typeof WatchCoordinationV1NamespacedLeaseOutput.Type;

// The operation
/**
 * watch changes to an object of kind Lease. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
 */
export const watchCoordinationV1NamespacedLease =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchCoordinationV1NamespacedLeaseInput,
    outputSchema: WatchCoordinationV1NamespacedLeaseOutput,
  }));
// Input Schema
export const WatchCoordinationV1NamespacedLeaseListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/coordination.k8s.io/v1/watch/namespaces/{namespace}/leases",
    }),
  );
export type WatchCoordinationV1NamespacedLeaseListInput =
  typeof WatchCoordinationV1NamespacedLeaseListInput.Type;

// Output Schema
export const WatchCoordinationV1NamespacedLeaseListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchCoordinationV1NamespacedLeaseListOutput =
  typeof WatchCoordinationV1NamespacedLeaseListOutput.Type;

// The operation
/**
 * watch individual changes to a list of Lease. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchCoordinationV1NamespacedLeaseList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchCoordinationV1NamespacedLeaseListInput,
    outputSchema: WatchCoordinationV1NamespacedLeaseListOutput,
  }));
// Input Schema
export const WatchCoordinationV1alpha2LeaseCandidateListForAllNamespacesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/coordination.k8s.io/v1alpha2/watch/leasecandidates",
    }),
  );
export type WatchCoordinationV1alpha2LeaseCandidateListForAllNamespacesInput =
  typeof WatchCoordinationV1alpha2LeaseCandidateListForAllNamespacesInput.Type;

// Output Schema
export const WatchCoordinationV1alpha2LeaseCandidateListForAllNamespacesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchCoordinationV1alpha2LeaseCandidateListForAllNamespacesOutput =
  typeof WatchCoordinationV1alpha2LeaseCandidateListForAllNamespacesOutput.Type;

// The operation
/**
 * watch individual changes to a list of LeaseCandidate. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchCoordinationV1alpha2LeaseCandidateListForAllNamespaces =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      WatchCoordinationV1alpha2LeaseCandidateListForAllNamespacesInput,
    outputSchema:
      WatchCoordinationV1alpha2LeaseCandidateListForAllNamespacesOutput,
  }));
// Input Schema
export const WatchCoordinationV1alpha2NamespacedLeaseCandidateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/coordination.k8s.io/v1alpha2/watch/namespaces/{namespace}/leasecandidates/{name}",
    }),
  );
export type WatchCoordinationV1alpha2NamespacedLeaseCandidateInput =
  typeof WatchCoordinationV1alpha2NamespacedLeaseCandidateInput.Type;

// Output Schema
export const WatchCoordinationV1alpha2NamespacedLeaseCandidateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchCoordinationV1alpha2NamespacedLeaseCandidateOutput =
  typeof WatchCoordinationV1alpha2NamespacedLeaseCandidateOutput.Type;

// The operation
/**
 * watch changes to an object of kind LeaseCandidate. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
 */
export const watchCoordinationV1alpha2NamespacedLeaseCandidate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchCoordinationV1alpha2NamespacedLeaseCandidateInput,
    outputSchema: WatchCoordinationV1alpha2NamespacedLeaseCandidateOutput,
  }));
// Input Schema
export const WatchCoordinationV1alpha2NamespacedLeaseCandidateListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/coordination.k8s.io/v1alpha2/watch/namespaces/{namespace}/leasecandidates",
    }),
  );
export type WatchCoordinationV1alpha2NamespacedLeaseCandidateListInput =
  typeof WatchCoordinationV1alpha2NamespacedLeaseCandidateListInput.Type;

// Output Schema
export const WatchCoordinationV1alpha2NamespacedLeaseCandidateListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchCoordinationV1alpha2NamespacedLeaseCandidateListOutput =
  typeof WatchCoordinationV1alpha2NamespacedLeaseCandidateListOutput.Type;

// The operation
/**
 * watch individual changes to a list of LeaseCandidate. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchCoordinationV1alpha2NamespacedLeaseCandidateList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchCoordinationV1alpha2NamespacedLeaseCandidateListInput,
    outputSchema: WatchCoordinationV1alpha2NamespacedLeaseCandidateListOutput,
  }));
// Input Schema
export const WatchCoordinationV1beta1LeaseCandidateListForAllNamespacesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/coordination.k8s.io/v1beta1/watch/leasecandidates",
    }),
  );
export type WatchCoordinationV1beta1LeaseCandidateListForAllNamespacesInput =
  typeof WatchCoordinationV1beta1LeaseCandidateListForAllNamespacesInput.Type;

// Output Schema
export const WatchCoordinationV1beta1LeaseCandidateListForAllNamespacesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchCoordinationV1beta1LeaseCandidateListForAllNamespacesOutput =
  typeof WatchCoordinationV1beta1LeaseCandidateListForAllNamespacesOutput.Type;

// The operation
/**
 * watch individual changes to a list of LeaseCandidate. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchCoordinationV1beta1LeaseCandidateListForAllNamespaces =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      WatchCoordinationV1beta1LeaseCandidateListForAllNamespacesInput,
    outputSchema:
      WatchCoordinationV1beta1LeaseCandidateListForAllNamespacesOutput,
  }));
// Input Schema
export const WatchCoordinationV1beta1NamespacedLeaseCandidateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/coordination.k8s.io/v1beta1/watch/namespaces/{namespace}/leasecandidates/{name}",
    }),
  );
export type WatchCoordinationV1beta1NamespacedLeaseCandidateInput =
  typeof WatchCoordinationV1beta1NamespacedLeaseCandidateInput.Type;

// Output Schema
export const WatchCoordinationV1beta1NamespacedLeaseCandidateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchCoordinationV1beta1NamespacedLeaseCandidateOutput =
  typeof WatchCoordinationV1beta1NamespacedLeaseCandidateOutput.Type;

// The operation
/**
 * watch changes to an object of kind LeaseCandidate. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
 */
export const watchCoordinationV1beta1NamespacedLeaseCandidate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchCoordinationV1beta1NamespacedLeaseCandidateInput,
    outputSchema: WatchCoordinationV1beta1NamespacedLeaseCandidateOutput,
  }));
// Input Schema
export const WatchCoordinationV1beta1NamespacedLeaseCandidateListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/coordination.k8s.io/v1beta1/watch/namespaces/{namespace}/leasecandidates",
    }),
  );
export type WatchCoordinationV1beta1NamespacedLeaseCandidateListInput =
  typeof WatchCoordinationV1beta1NamespacedLeaseCandidateListInput.Type;

// Output Schema
export const WatchCoordinationV1beta1NamespacedLeaseCandidateListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchCoordinationV1beta1NamespacedLeaseCandidateListOutput =
  typeof WatchCoordinationV1beta1NamespacedLeaseCandidateListOutput.Type;

// The operation
/**
 * watch individual changes to a list of LeaseCandidate. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchCoordinationV1beta1NamespacedLeaseCandidateList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchCoordinationV1beta1NamespacedLeaseCandidateListInput,
    outputSchema: WatchCoordinationV1beta1NamespacedLeaseCandidateListOutput,
  }));
