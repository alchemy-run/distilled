/**
 * Kubernetes Certificates API
 *
 * Generated from the Kubernetes OpenAPI spec.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";

// Input Schema
export const CreateCertificatesV1CertificateSigningRequestInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/apis/certificates.k8s.io/v1/certificatesigningrequests",
    }),
  );
export type CreateCertificatesV1CertificateSigningRequestInput =
  typeof CreateCertificatesV1CertificateSigningRequestInput.Type;

// Output Schema
export const CreateCertificatesV1CertificateSigningRequestOutput =
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
      expirationSeconds: Schema.optional(Schema.Number),
      extra: Schema.optional(
        Schema.Record(Schema.String, Schema.Array(Schema.String)),
      ),
      groups: Schema.optional(Schema.Array(Schema.String)),
      request: Schema.String,
      signerName: Schema.String,
      uid: Schema.optional(Schema.String),
      usages: Schema.optional(Schema.Array(Schema.String)),
      username: Schema.optional(Schema.String),
    }),
    status: Schema.optional(
      Schema.Struct({
        certificate: Schema.optional(Schema.String),
        conditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastTransitionTime: Schema.optional(Schema.String),
              lastUpdateTime: Schema.optional(Schema.String),
              message: Schema.optional(Schema.String),
              reason: Schema.optional(Schema.String),
              status: Schema.String,
              type: Schema.String,
            }),
          ),
        ),
      }),
    ),
  });
export type CreateCertificatesV1CertificateSigningRequestOutput =
  typeof CreateCertificatesV1CertificateSigningRequestOutput.Type;

// The operation
/**
 * create a CertificateSigningRequest
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const createCertificatesV1CertificateSigningRequest =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateCertificatesV1CertificateSigningRequestInput,
    outputSchema: CreateCertificatesV1CertificateSigningRequestOutput,
  }));
// Input Schema
export const CreateCertificatesV1alpha1ClusterTrustBundleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/apis/certificates.k8s.io/v1alpha1/clustertrustbundles",
    }),
  );
export type CreateCertificatesV1alpha1ClusterTrustBundleInput =
  typeof CreateCertificatesV1alpha1ClusterTrustBundleInput.Type;

// Output Schema
export const CreateCertificatesV1alpha1ClusterTrustBundleOutput =
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
      signerName: Schema.optional(Schema.String),
      trustBundle: Schema.String,
    }),
  });
export type CreateCertificatesV1alpha1ClusterTrustBundleOutput =
  typeof CreateCertificatesV1alpha1ClusterTrustBundleOutput.Type;

// The operation
/**
 * create a ClusterTrustBundle
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const createCertificatesV1alpha1ClusterTrustBundle =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateCertificatesV1alpha1ClusterTrustBundleInput,
    outputSchema: CreateCertificatesV1alpha1ClusterTrustBundleOutput,
  }));
// Input Schema
export const CreateCertificatesV1beta1ClusterTrustBundleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/apis/certificates.k8s.io/v1beta1/clustertrustbundles",
    }),
  );
export type CreateCertificatesV1beta1ClusterTrustBundleInput =
  typeof CreateCertificatesV1beta1ClusterTrustBundleInput.Type;

// Output Schema
export const CreateCertificatesV1beta1ClusterTrustBundleOutput =
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
      signerName: Schema.optional(Schema.String),
      trustBundle: Schema.String,
    }),
  });
export type CreateCertificatesV1beta1ClusterTrustBundleOutput =
  typeof CreateCertificatesV1beta1ClusterTrustBundleOutput.Type;

// The operation
/**
 * create a ClusterTrustBundle
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const createCertificatesV1beta1ClusterTrustBundle =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateCertificatesV1beta1ClusterTrustBundleInput,
    outputSchema: CreateCertificatesV1beta1ClusterTrustBundleOutput,
  }));
// Input Schema
export const CreateCertificatesV1beta1NamespacedPodCertificateRequestInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/apis/certificates.k8s.io/v1beta1/namespaces/{namespace}/podcertificaterequests",
    }),
  );
export type CreateCertificatesV1beta1NamespacedPodCertificateRequestInput =
  typeof CreateCertificatesV1beta1NamespacedPodCertificateRequestInput.Type;

// Output Schema
export const CreateCertificatesV1beta1NamespacedPodCertificateRequestOutput =
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
      maxExpirationSeconds: Schema.optional(Schema.Number),
      nodeName: Schema.String,
      nodeUID: Schema.String,
      pkixPublicKey: Schema.optional(Schema.String),
      podName: Schema.String,
      podUID: Schema.String,
      proofOfPossession: Schema.optional(Schema.String),
      serviceAccountName: Schema.String,
      serviceAccountUID: Schema.String,
      signerName: Schema.String,
      stubPKCS10Request: Schema.String,
      unverifiedUserAnnotations: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
    }),
    status: Schema.optional(
      Schema.Struct({
        beginRefreshAt: Schema.optional(Schema.String),
        certificateChain: Schema.optional(Schema.String),
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
        notAfter: Schema.optional(Schema.String),
        notBefore: Schema.optional(Schema.String),
      }),
    ),
  });
export type CreateCertificatesV1beta1NamespacedPodCertificateRequestOutput =
  typeof CreateCertificatesV1beta1NamespacedPodCertificateRequestOutput.Type;

// The operation
/**
 * create a PodCertificateRequest
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const createCertificatesV1beta1NamespacedPodCertificateRequest =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateCertificatesV1beta1NamespacedPodCertificateRequestInput,
    outputSchema:
      CreateCertificatesV1beta1NamespacedPodCertificateRequestOutput,
  }));
// Input Schema
export const DeleteCertificatesV1CertificateSigningRequestInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/certificates.k8s.io/v1/certificatesigningrequests/{name}",
    }),
  );
export type DeleteCertificatesV1CertificateSigningRequestInput =
  typeof DeleteCertificatesV1CertificateSigningRequestInput.Type;

// Output Schema
export const DeleteCertificatesV1CertificateSigningRequestOutput =
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
export type DeleteCertificatesV1CertificateSigningRequestOutput =
  typeof DeleteCertificatesV1CertificateSigningRequestOutput.Type;

// The operation
/**
 * delete a CertificateSigningRequest
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteCertificatesV1CertificateSigningRequest =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteCertificatesV1CertificateSigningRequestInput,
    outputSchema: DeleteCertificatesV1CertificateSigningRequestOutput,
  }));
// Input Schema
export const DeleteCertificatesV1CollectionCertificateSigningRequestInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/certificates.k8s.io/v1/certificatesigningrequests",
    }),
  );
export type DeleteCertificatesV1CollectionCertificateSigningRequestInput =
  typeof DeleteCertificatesV1CollectionCertificateSigningRequestInput.Type;

// Output Schema
export const DeleteCertificatesV1CollectionCertificateSigningRequestOutput =
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
export type DeleteCertificatesV1CollectionCertificateSigningRequestOutput =
  typeof DeleteCertificatesV1CollectionCertificateSigningRequestOutput.Type;

// The operation
/**
 * delete collection of CertificateSigningRequest
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteCertificatesV1CollectionCertificateSigningRequest =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteCertificatesV1CollectionCertificateSigningRequestInput,
    outputSchema: DeleteCertificatesV1CollectionCertificateSigningRequestOutput,
  }));
// Input Schema
export const DeleteCertificatesV1alpha1ClusterTrustBundleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/certificates.k8s.io/v1alpha1/clustertrustbundles/{name}",
    }),
  );
export type DeleteCertificatesV1alpha1ClusterTrustBundleInput =
  typeof DeleteCertificatesV1alpha1ClusterTrustBundleInput.Type;

// Output Schema
export const DeleteCertificatesV1alpha1ClusterTrustBundleOutput =
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
export type DeleteCertificatesV1alpha1ClusterTrustBundleOutput =
  typeof DeleteCertificatesV1alpha1ClusterTrustBundleOutput.Type;

// The operation
/**
 * delete a ClusterTrustBundle
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteCertificatesV1alpha1ClusterTrustBundle =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteCertificatesV1alpha1ClusterTrustBundleInput,
    outputSchema: DeleteCertificatesV1alpha1ClusterTrustBundleOutput,
  }));
// Input Schema
export const DeleteCertificatesV1alpha1CollectionClusterTrustBundleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/certificates.k8s.io/v1alpha1/clustertrustbundles",
    }),
  );
export type DeleteCertificatesV1alpha1CollectionClusterTrustBundleInput =
  typeof DeleteCertificatesV1alpha1CollectionClusterTrustBundleInput.Type;

// Output Schema
export const DeleteCertificatesV1alpha1CollectionClusterTrustBundleOutput =
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
export type DeleteCertificatesV1alpha1CollectionClusterTrustBundleOutput =
  typeof DeleteCertificatesV1alpha1CollectionClusterTrustBundleOutput.Type;

// The operation
/**
 * delete collection of ClusterTrustBundle
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteCertificatesV1alpha1CollectionClusterTrustBundle =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteCertificatesV1alpha1CollectionClusterTrustBundleInput,
    outputSchema: DeleteCertificatesV1alpha1CollectionClusterTrustBundleOutput,
  }));
// Input Schema
export const DeleteCertificatesV1beta1ClusterTrustBundleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/certificates.k8s.io/v1beta1/clustertrustbundles/{name}",
    }),
  );
export type DeleteCertificatesV1beta1ClusterTrustBundleInput =
  typeof DeleteCertificatesV1beta1ClusterTrustBundleInput.Type;

// Output Schema
export const DeleteCertificatesV1beta1ClusterTrustBundleOutput =
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
export type DeleteCertificatesV1beta1ClusterTrustBundleOutput =
  typeof DeleteCertificatesV1beta1ClusterTrustBundleOutput.Type;

// The operation
/**
 * delete a ClusterTrustBundle
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteCertificatesV1beta1ClusterTrustBundle =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteCertificatesV1beta1ClusterTrustBundleInput,
    outputSchema: DeleteCertificatesV1beta1ClusterTrustBundleOutput,
  }));
// Input Schema
export const DeleteCertificatesV1beta1CollectionClusterTrustBundleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/certificates.k8s.io/v1beta1/clustertrustbundles",
    }),
  );
export type DeleteCertificatesV1beta1CollectionClusterTrustBundleInput =
  typeof DeleteCertificatesV1beta1CollectionClusterTrustBundleInput.Type;

// Output Schema
export const DeleteCertificatesV1beta1CollectionClusterTrustBundleOutput =
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
export type DeleteCertificatesV1beta1CollectionClusterTrustBundleOutput =
  typeof DeleteCertificatesV1beta1CollectionClusterTrustBundleOutput.Type;

// The operation
/**
 * delete collection of ClusterTrustBundle
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteCertificatesV1beta1CollectionClusterTrustBundle =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteCertificatesV1beta1CollectionClusterTrustBundleInput,
    outputSchema: DeleteCertificatesV1beta1CollectionClusterTrustBundleOutput,
  }));
// Input Schema
export const DeleteCertificatesV1beta1CollectionNamespacedPodCertificateRequestInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/certificates.k8s.io/v1beta1/namespaces/{namespace}/podcertificaterequests",
    }),
  );
export type DeleteCertificatesV1beta1CollectionNamespacedPodCertificateRequestInput =
  typeof DeleteCertificatesV1beta1CollectionNamespacedPodCertificateRequestInput.Type;

// Output Schema
export const DeleteCertificatesV1beta1CollectionNamespacedPodCertificateRequestOutput =
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
export type DeleteCertificatesV1beta1CollectionNamespacedPodCertificateRequestOutput =
  typeof DeleteCertificatesV1beta1CollectionNamespacedPodCertificateRequestOutput.Type;

// The operation
/**
 * delete collection of PodCertificateRequest
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteCertificatesV1beta1CollectionNamespacedPodCertificateRequest =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      DeleteCertificatesV1beta1CollectionNamespacedPodCertificateRequestInput,
    outputSchema:
      DeleteCertificatesV1beta1CollectionNamespacedPodCertificateRequestOutput,
  }));
// Input Schema
export const DeleteCertificatesV1beta1NamespacedPodCertificateRequestInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/certificates.k8s.io/v1beta1/namespaces/{namespace}/podcertificaterequests/{name}",
    }),
  );
export type DeleteCertificatesV1beta1NamespacedPodCertificateRequestInput =
  typeof DeleteCertificatesV1beta1NamespacedPodCertificateRequestInput.Type;

// Output Schema
export const DeleteCertificatesV1beta1NamespacedPodCertificateRequestOutput =
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
export type DeleteCertificatesV1beta1NamespacedPodCertificateRequestOutput =
  typeof DeleteCertificatesV1beta1NamespacedPodCertificateRequestOutput.Type;

// The operation
/**
 * delete a PodCertificateRequest
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteCertificatesV1beta1NamespacedPodCertificateRequest =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteCertificatesV1beta1NamespacedPodCertificateRequestInput,
    outputSchema:
      DeleteCertificatesV1beta1NamespacedPodCertificateRequestOutput,
  }));
// Input Schema
export const GetCertificatesAPIGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/apis/certificates.k8s.io/" }),
  );
export type GetCertificatesAPIGroupInput =
  typeof GetCertificatesAPIGroupInput.Type;

// Output Schema
export const GetCertificatesAPIGroupOutput =
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
export type GetCertificatesAPIGroupOutput =
  typeof GetCertificatesAPIGroupOutput.Type;

// The operation
/**
 * get information of a group
 */
export const getCertificatesAPIGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetCertificatesAPIGroupInput,
    outputSchema: GetCertificatesAPIGroupOutput,
  }),
);
// Input Schema
export const GetCertificatesV1APIResourcesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/apis/certificates.k8s.io/v1/" }),
  );
export type GetCertificatesV1APIResourcesInput =
  typeof GetCertificatesV1APIResourcesInput.Type;

// Output Schema
export const GetCertificatesV1APIResourcesOutput =
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
export type GetCertificatesV1APIResourcesOutput =
  typeof GetCertificatesV1APIResourcesOutput.Type;

// The operation
/**
 * get available resources
 */
export const getCertificatesV1APIResources =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetCertificatesV1APIResourcesInput,
    outputSchema: GetCertificatesV1APIResourcesOutput,
  }));
// Input Schema
export const GetCertificatesV1alpha1APIResourcesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/apis/certificates.k8s.io/v1alpha1/" }),
  );
export type GetCertificatesV1alpha1APIResourcesInput =
  typeof GetCertificatesV1alpha1APIResourcesInput.Type;

// Output Schema
export const GetCertificatesV1alpha1APIResourcesOutput =
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
export type GetCertificatesV1alpha1APIResourcesOutput =
  typeof GetCertificatesV1alpha1APIResourcesOutput.Type;

// The operation
/**
 * get available resources
 */
export const getCertificatesV1alpha1APIResources =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetCertificatesV1alpha1APIResourcesInput,
    outputSchema: GetCertificatesV1alpha1APIResourcesOutput,
  }));
// Input Schema
export const GetCertificatesV1beta1APIResourcesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/apis/certificates.k8s.io/v1beta1/" }),
  );
export type GetCertificatesV1beta1APIResourcesInput =
  typeof GetCertificatesV1beta1APIResourcesInput.Type;

// Output Schema
export const GetCertificatesV1beta1APIResourcesOutput =
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
export type GetCertificatesV1beta1APIResourcesOutput =
  typeof GetCertificatesV1beta1APIResourcesOutput.Type;

// The operation
/**
 * get available resources
 */
export const getCertificatesV1beta1APIResources =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetCertificatesV1beta1APIResourcesInput,
    outputSchema: GetCertificatesV1beta1APIResourcesOutput,
  }));
// Input Schema
export const ListCertificatesV1CertificateSigningRequestInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/certificates.k8s.io/v1/certificatesigningrequests",
    }),
  );
export type ListCertificatesV1CertificateSigningRequestInput =
  typeof ListCertificatesV1CertificateSigningRequestInput.Type;

// Output Schema
export const ListCertificatesV1CertificateSigningRequestOutput =
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
          expirationSeconds: Schema.optional(Schema.Number),
          extra: Schema.optional(
            Schema.Record(Schema.String, Schema.Array(Schema.String)),
          ),
          groups: Schema.optional(Schema.Array(Schema.String)),
          request: Schema.String,
          signerName: Schema.String,
          uid: Schema.optional(Schema.String),
          usages: Schema.optional(Schema.Array(Schema.String)),
          username: Schema.optional(Schema.String),
        }),
        status: Schema.optional(
          Schema.Struct({
            certificate: Schema.optional(Schema.String),
            conditions: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  lastTransitionTime: Schema.optional(Schema.String),
                  lastUpdateTime: Schema.optional(Schema.String),
                  message: Schema.optional(Schema.String),
                  reason: Schema.optional(Schema.String),
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
export type ListCertificatesV1CertificateSigningRequestOutput =
  typeof ListCertificatesV1CertificateSigningRequestOutput.Type;

// The operation
/**
 * list or watch objects of kind CertificateSigningRequest
 */
export const listCertificatesV1CertificateSigningRequest =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListCertificatesV1CertificateSigningRequestInput,
    outputSchema: ListCertificatesV1CertificateSigningRequestOutput,
  }));
// Input Schema
export const ListCertificatesV1alpha1ClusterTrustBundleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/certificates.k8s.io/v1alpha1/clustertrustbundles",
    }),
  );
export type ListCertificatesV1alpha1ClusterTrustBundleInput =
  typeof ListCertificatesV1alpha1ClusterTrustBundleInput.Type;

// Output Schema
export const ListCertificatesV1alpha1ClusterTrustBundleOutput =
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
          signerName: Schema.optional(Schema.String),
          trustBundle: Schema.String,
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
export type ListCertificatesV1alpha1ClusterTrustBundleOutput =
  typeof ListCertificatesV1alpha1ClusterTrustBundleOutput.Type;

// The operation
/**
 * list or watch objects of kind ClusterTrustBundle
 */
export const listCertificatesV1alpha1ClusterTrustBundle =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListCertificatesV1alpha1ClusterTrustBundleInput,
    outputSchema: ListCertificatesV1alpha1ClusterTrustBundleOutput,
  }));
// Input Schema
export const ListCertificatesV1beta1ClusterTrustBundleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/certificates.k8s.io/v1beta1/clustertrustbundles",
    }),
  );
export type ListCertificatesV1beta1ClusterTrustBundleInput =
  typeof ListCertificatesV1beta1ClusterTrustBundleInput.Type;

// Output Schema
export const ListCertificatesV1beta1ClusterTrustBundleOutput =
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
          signerName: Schema.optional(Schema.String),
          trustBundle: Schema.String,
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
export type ListCertificatesV1beta1ClusterTrustBundleOutput =
  typeof ListCertificatesV1beta1ClusterTrustBundleOutput.Type;

// The operation
/**
 * list or watch objects of kind ClusterTrustBundle
 */
export const listCertificatesV1beta1ClusterTrustBundle =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListCertificatesV1beta1ClusterTrustBundleInput,
    outputSchema: ListCertificatesV1beta1ClusterTrustBundleOutput,
  }));
// Input Schema
export const ListCertificatesV1beta1NamespacedPodCertificateRequestInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/certificates.k8s.io/v1beta1/namespaces/{namespace}/podcertificaterequests",
    }),
  );
export type ListCertificatesV1beta1NamespacedPodCertificateRequestInput =
  typeof ListCertificatesV1beta1NamespacedPodCertificateRequestInput.Type;

// Output Schema
export const ListCertificatesV1beta1NamespacedPodCertificateRequestOutput =
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
          maxExpirationSeconds: Schema.optional(Schema.Number),
          nodeName: Schema.String,
          nodeUID: Schema.String,
          pkixPublicKey: Schema.optional(Schema.String),
          podName: Schema.String,
          podUID: Schema.String,
          proofOfPossession: Schema.optional(Schema.String),
          serviceAccountName: Schema.String,
          serviceAccountUID: Schema.String,
          signerName: Schema.String,
          stubPKCS10Request: Schema.String,
          unverifiedUserAnnotations: Schema.optional(
            Schema.Record(Schema.String, Schema.String),
          ),
        }),
        status: Schema.optional(
          Schema.Struct({
            beginRefreshAt: Schema.optional(Schema.String),
            certificateChain: Schema.optional(Schema.String),
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
            notAfter: Schema.optional(Schema.String),
            notBefore: Schema.optional(Schema.String),
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
export type ListCertificatesV1beta1NamespacedPodCertificateRequestOutput =
  typeof ListCertificatesV1beta1NamespacedPodCertificateRequestOutput.Type;

// The operation
/**
 * list or watch objects of kind PodCertificateRequest
 */
export const listCertificatesV1beta1NamespacedPodCertificateRequest =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListCertificatesV1beta1NamespacedPodCertificateRequestInput,
    outputSchema: ListCertificatesV1beta1NamespacedPodCertificateRequestOutput,
  }));
// Input Schema
export const ListCertificatesV1beta1PodCertificateRequestForAllNamespacesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/certificates.k8s.io/v1beta1/podcertificaterequests",
    }),
  );
export type ListCertificatesV1beta1PodCertificateRequestForAllNamespacesInput =
  typeof ListCertificatesV1beta1PodCertificateRequestForAllNamespacesInput.Type;

// Output Schema
export const ListCertificatesV1beta1PodCertificateRequestForAllNamespacesOutput =
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
          maxExpirationSeconds: Schema.optional(Schema.Number),
          nodeName: Schema.String,
          nodeUID: Schema.String,
          pkixPublicKey: Schema.optional(Schema.String),
          podName: Schema.String,
          podUID: Schema.String,
          proofOfPossession: Schema.optional(Schema.String),
          serviceAccountName: Schema.String,
          serviceAccountUID: Schema.String,
          signerName: Schema.String,
          stubPKCS10Request: Schema.String,
          unverifiedUserAnnotations: Schema.optional(
            Schema.Record(Schema.String, Schema.String),
          ),
        }),
        status: Schema.optional(
          Schema.Struct({
            beginRefreshAt: Schema.optional(Schema.String),
            certificateChain: Schema.optional(Schema.String),
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
            notAfter: Schema.optional(Schema.String),
            notBefore: Schema.optional(Schema.String),
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
export type ListCertificatesV1beta1PodCertificateRequestForAllNamespacesOutput =
  typeof ListCertificatesV1beta1PodCertificateRequestForAllNamespacesOutput.Type;

// The operation
/**
 * list or watch objects of kind PodCertificateRequest
 */
export const listCertificatesV1beta1PodCertificateRequestForAllNamespaces =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      ListCertificatesV1beta1PodCertificateRequestForAllNamespacesInput,
    outputSchema:
      ListCertificatesV1beta1PodCertificateRequestForAllNamespacesOutput,
  }));
// Input Schema
export const PatchCertificatesV1CertificateSigningRequestInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/certificates.k8s.io/v1/certificatesigningrequests/{name}",
    }),
  );
export type PatchCertificatesV1CertificateSigningRequestInput =
  typeof PatchCertificatesV1CertificateSigningRequestInput.Type;

// Output Schema
export const PatchCertificatesV1CertificateSigningRequestOutput =
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
      expirationSeconds: Schema.optional(Schema.Number),
      extra: Schema.optional(
        Schema.Record(Schema.String, Schema.Array(Schema.String)),
      ),
      groups: Schema.optional(Schema.Array(Schema.String)),
      request: Schema.String,
      signerName: Schema.String,
      uid: Schema.optional(Schema.String),
      usages: Schema.optional(Schema.Array(Schema.String)),
      username: Schema.optional(Schema.String),
    }),
    status: Schema.optional(
      Schema.Struct({
        certificate: Schema.optional(Schema.String),
        conditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastTransitionTime: Schema.optional(Schema.String),
              lastUpdateTime: Schema.optional(Schema.String),
              message: Schema.optional(Schema.String),
              reason: Schema.optional(Schema.String),
              status: Schema.String,
              type: Schema.String,
            }),
          ),
        ),
      }),
    ),
  });
export type PatchCertificatesV1CertificateSigningRequestOutput =
  typeof PatchCertificatesV1CertificateSigningRequestOutput.Type;

// The operation
/**
 * partially update the specified CertificateSigningRequest
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchCertificatesV1CertificateSigningRequest =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PatchCertificatesV1CertificateSigningRequestInput,
    outputSchema: PatchCertificatesV1CertificateSigningRequestOutput,
  }));
// Input Schema
export const PatchCertificatesV1CertificateSigningRequestApprovalInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/certificates.k8s.io/v1/certificatesigningrequests/{name}/approval",
    }),
  );
export type PatchCertificatesV1CertificateSigningRequestApprovalInput =
  typeof PatchCertificatesV1CertificateSigningRequestApprovalInput.Type;

// Output Schema
export const PatchCertificatesV1CertificateSigningRequestApprovalOutput =
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
      expirationSeconds: Schema.optional(Schema.Number),
      extra: Schema.optional(
        Schema.Record(Schema.String, Schema.Array(Schema.String)),
      ),
      groups: Schema.optional(Schema.Array(Schema.String)),
      request: Schema.String,
      signerName: Schema.String,
      uid: Schema.optional(Schema.String),
      usages: Schema.optional(Schema.Array(Schema.String)),
      username: Schema.optional(Schema.String),
    }),
    status: Schema.optional(
      Schema.Struct({
        certificate: Schema.optional(Schema.String),
        conditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastTransitionTime: Schema.optional(Schema.String),
              lastUpdateTime: Schema.optional(Schema.String),
              message: Schema.optional(Schema.String),
              reason: Schema.optional(Schema.String),
              status: Schema.String,
              type: Schema.String,
            }),
          ),
        ),
      }),
    ),
  });
export type PatchCertificatesV1CertificateSigningRequestApprovalOutput =
  typeof PatchCertificatesV1CertificateSigningRequestApprovalOutput.Type;

// The operation
/**
 * partially update approval of the specified CertificateSigningRequest
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchCertificatesV1CertificateSigningRequestApproval =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PatchCertificatesV1CertificateSigningRequestApprovalInput,
    outputSchema: PatchCertificatesV1CertificateSigningRequestApprovalOutput,
  }));
// Input Schema
export const PatchCertificatesV1CertificateSigningRequestStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/certificates.k8s.io/v1/certificatesigningrequests/{name}/status",
    }),
  );
export type PatchCertificatesV1CertificateSigningRequestStatusInput =
  typeof PatchCertificatesV1CertificateSigningRequestStatusInput.Type;

// Output Schema
export const PatchCertificatesV1CertificateSigningRequestStatusOutput =
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
      expirationSeconds: Schema.optional(Schema.Number),
      extra: Schema.optional(
        Schema.Record(Schema.String, Schema.Array(Schema.String)),
      ),
      groups: Schema.optional(Schema.Array(Schema.String)),
      request: Schema.String,
      signerName: Schema.String,
      uid: Schema.optional(Schema.String),
      usages: Schema.optional(Schema.Array(Schema.String)),
      username: Schema.optional(Schema.String),
    }),
    status: Schema.optional(
      Schema.Struct({
        certificate: Schema.optional(Schema.String),
        conditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastTransitionTime: Schema.optional(Schema.String),
              lastUpdateTime: Schema.optional(Schema.String),
              message: Schema.optional(Schema.String),
              reason: Schema.optional(Schema.String),
              status: Schema.String,
              type: Schema.String,
            }),
          ),
        ),
      }),
    ),
  });
export type PatchCertificatesV1CertificateSigningRequestStatusOutput =
  typeof PatchCertificatesV1CertificateSigningRequestStatusOutput.Type;

// The operation
/**
 * partially update status of the specified CertificateSigningRequest
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchCertificatesV1CertificateSigningRequestStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PatchCertificatesV1CertificateSigningRequestStatusInput,
    outputSchema: PatchCertificatesV1CertificateSigningRequestStatusOutput,
  }));
// Input Schema
export const PatchCertificatesV1alpha1ClusterTrustBundleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/certificates.k8s.io/v1alpha1/clustertrustbundles/{name}",
    }),
  );
export type PatchCertificatesV1alpha1ClusterTrustBundleInput =
  typeof PatchCertificatesV1alpha1ClusterTrustBundleInput.Type;

// Output Schema
export const PatchCertificatesV1alpha1ClusterTrustBundleOutput =
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
      signerName: Schema.optional(Schema.String),
      trustBundle: Schema.String,
    }),
  });
export type PatchCertificatesV1alpha1ClusterTrustBundleOutput =
  typeof PatchCertificatesV1alpha1ClusterTrustBundleOutput.Type;

// The operation
/**
 * partially update the specified ClusterTrustBundle
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchCertificatesV1alpha1ClusterTrustBundle =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PatchCertificatesV1alpha1ClusterTrustBundleInput,
    outputSchema: PatchCertificatesV1alpha1ClusterTrustBundleOutput,
  }));
// Input Schema
export const PatchCertificatesV1beta1ClusterTrustBundleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/certificates.k8s.io/v1beta1/clustertrustbundles/{name}",
    }),
  );
export type PatchCertificatesV1beta1ClusterTrustBundleInput =
  typeof PatchCertificatesV1beta1ClusterTrustBundleInput.Type;

// Output Schema
export const PatchCertificatesV1beta1ClusterTrustBundleOutput =
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
      signerName: Schema.optional(Schema.String),
      trustBundle: Schema.String,
    }),
  });
export type PatchCertificatesV1beta1ClusterTrustBundleOutput =
  typeof PatchCertificatesV1beta1ClusterTrustBundleOutput.Type;

// The operation
/**
 * partially update the specified ClusterTrustBundle
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchCertificatesV1beta1ClusterTrustBundle =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PatchCertificatesV1beta1ClusterTrustBundleInput,
    outputSchema: PatchCertificatesV1beta1ClusterTrustBundleOutput,
  }));
// Input Schema
export const PatchCertificatesV1beta1NamespacedPodCertificateRequestInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/certificates.k8s.io/v1beta1/namespaces/{namespace}/podcertificaterequests/{name}",
    }),
  );
export type PatchCertificatesV1beta1NamespacedPodCertificateRequestInput =
  typeof PatchCertificatesV1beta1NamespacedPodCertificateRequestInput.Type;

// Output Schema
export const PatchCertificatesV1beta1NamespacedPodCertificateRequestOutput =
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
      maxExpirationSeconds: Schema.optional(Schema.Number),
      nodeName: Schema.String,
      nodeUID: Schema.String,
      pkixPublicKey: Schema.optional(Schema.String),
      podName: Schema.String,
      podUID: Schema.String,
      proofOfPossession: Schema.optional(Schema.String),
      serviceAccountName: Schema.String,
      serviceAccountUID: Schema.String,
      signerName: Schema.String,
      stubPKCS10Request: Schema.String,
      unverifiedUserAnnotations: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
    }),
    status: Schema.optional(
      Schema.Struct({
        beginRefreshAt: Schema.optional(Schema.String),
        certificateChain: Schema.optional(Schema.String),
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
        notAfter: Schema.optional(Schema.String),
        notBefore: Schema.optional(Schema.String),
      }),
    ),
  });
export type PatchCertificatesV1beta1NamespacedPodCertificateRequestOutput =
  typeof PatchCertificatesV1beta1NamespacedPodCertificateRequestOutput.Type;

// The operation
/**
 * partially update the specified PodCertificateRequest
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchCertificatesV1beta1NamespacedPodCertificateRequest =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PatchCertificatesV1beta1NamespacedPodCertificateRequestInput,
    outputSchema: PatchCertificatesV1beta1NamespacedPodCertificateRequestOutput,
  }));
// Input Schema
export const PatchCertificatesV1beta1NamespacedPodCertificateRequestStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/certificates.k8s.io/v1beta1/namespaces/{namespace}/podcertificaterequests/{name}/status",
    }),
  );
export type PatchCertificatesV1beta1NamespacedPodCertificateRequestStatusInput =
  typeof PatchCertificatesV1beta1NamespacedPodCertificateRequestStatusInput.Type;

// Output Schema
export const PatchCertificatesV1beta1NamespacedPodCertificateRequestStatusOutput =
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
      maxExpirationSeconds: Schema.optional(Schema.Number),
      nodeName: Schema.String,
      nodeUID: Schema.String,
      pkixPublicKey: Schema.optional(Schema.String),
      podName: Schema.String,
      podUID: Schema.String,
      proofOfPossession: Schema.optional(Schema.String),
      serviceAccountName: Schema.String,
      serviceAccountUID: Schema.String,
      signerName: Schema.String,
      stubPKCS10Request: Schema.String,
      unverifiedUserAnnotations: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
    }),
    status: Schema.optional(
      Schema.Struct({
        beginRefreshAt: Schema.optional(Schema.String),
        certificateChain: Schema.optional(Schema.String),
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
        notAfter: Schema.optional(Schema.String),
        notBefore: Schema.optional(Schema.String),
      }),
    ),
  });
export type PatchCertificatesV1beta1NamespacedPodCertificateRequestStatusOutput =
  typeof PatchCertificatesV1beta1NamespacedPodCertificateRequestStatusOutput.Type;

// The operation
/**
 * partially update status of the specified PodCertificateRequest
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchCertificatesV1beta1NamespacedPodCertificateRequestStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      PatchCertificatesV1beta1NamespacedPodCertificateRequestStatusInput,
    outputSchema:
      PatchCertificatesV1beta1NamespacedPodCertificateRequestStatusOutput,
  }));
// Input Schema
export const ReadCertificatesV1CertificateSigningRequestInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/certificates.k8s.io/v1/certificatesigningrequests/{name}",
    }),
  );
export type ReadCertificatesV1CertificateSigningRequestInput =
  typeof ReadCertificatesV1CertificateSigningRequestInput.Type;

// Output Schema
export const ReadCertificatesV1CertificateSigningRequestOutput =
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
      expirationSeconds: Schema.optional(Schema.Number),
      extra: Schema.optional(
        Schema.Record(Schema.String, Schema.Array(Schema.String)),
      ),
      groups: Schema.optional(Schema.Array(Schema.String)),
      request: Schema.String,
      signerName: Schema.String,
      uid: Schema.optional(Schema.String),
      usages: Schema.optional(Schema.Array(Schema.String)),
      username: Schema.optional(Schema.String),
    }),
    status: Schema.optional(
      Schema.Struct({
        certificate: Schema.optional(Schema.String),
        conditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastTransitionTime: Schema.optional(Schema.String),
              lastUpdateTime: Schema.optional(Schema.String),
              message: Schema.optional(Schema.String),
              reason: Schema.optional(Schema.String),
              status: Schema.String,
              type: Schema.String,
            }),
          ),
        ),
      }),
    ),
  });
export type ReadCertificatesV1CertificateSigningRequestOutput =
  typeof ReadCertificatesV1CertificateSigningRequestOutput.Type;

// The operation
/**
 * read the specified CertificateSigningRequest
 */
export const readCertificatesV1CertificateSigningRequest =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReadCertificatesV1CertificateSigningRequestInput,
    outputSchema: ReadCertificatesV1CertificateSigningRequestOutput,
  }));
// Input Schema
export const ReadCertificatesV1CertificateSigningRequestApprovalInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/certificates.k8s.io/v1/certificatesigningrequests/{name}/approval",
    }),
  );
export type ReadCertificatesV1CertificateSigningRequestApprovalInput =
  typeof ReadCertificatesV1CertificateSigningRequestApprovalInput.Type;

// Output Schema
export const ReadCertificatesV1CertificateSigningRequestApprovalOutput =
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
      expirationSeconds: Schema.optional(Schema.Number),
      extra: Schema.optional(
        Schema.Record(Schema.String, Schema.Array(Schema.String)),
      ),
      groups: Schema.optional(Schema.Array(Schema.String)),
      request: Schema.String,
      signerName: Schema.String,
      uid: Schema.optional(Schema.String),
      usages: Schema.optional(Schema.Array(Schema.String)),
      username: Schema.optional(Schema.String),
    }),
    status: Schema.optional(
      Schema.Struct({
        certificate: Schema.optional(Schema.String),
        conditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastTransitionTime: Schema.optional(Schema.String),
              lastUpdateTime: Schema.optional(Schema.String),
              message: Schema.optional(Schema.String),
              reason: Schema.optional(Schema.String),
              status: Schema.String,
              type: Schema.String,
            }),
          ),
        ),
      }),
    ),
  });
export type ReadCertificatesV1CertificateSigningRequestApprovalOutput =
  typeof ReadCertificatesV1CertificateSigningRequestApprovalOutput.Type;

// The operation
/**
 * read approval of the specified CertificateSigningRequest
 */
export const readCertificatesV1CertificateSigningRequestApproval =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReadCertificatesV1CertificateSigningRequestApprovalInput,
    outputSchema: ReadCertificatesV1CertificateSigningRequestApprovalOutput,
  }));
// Input Schema
export const ReadCertificatesV1CertificateSigningRequestStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/certificates.k8s.io/v1/certificatesigningrequests/{name}/status",
    }),
  );
export type ReadCertificatesV1CertificateSigningRequestStatusInput =
  typeof ReadCertificatesV1CertificateSigningRequestStatusInput.Type;

// Output Schema
export const ReadCertificatesV1CertificateSigningRequestStatusOutput =
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
      expirationSeconds: Schema.optional(Schema.Number),
      extra: Schema.optional(
        Schema.Record(Schema.String, Schema.Array(Schema.String)),
      ),
      groups: Schema.optional(Schema.Array(Schema.String)),
      request: Schema.String,
      signerName: Schema.String,
      uid: Schema.optional(Schema.String),
      usages: Schema.optional(Schema.Array(Schema.String)),
      username: Schema.optional(Schema.String),
    }),
    status: Schema.optional(
      Schema.Struct({
        certificate: Schema.optional(Schema.String),
        conditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastTransitionTime: Schema.optional(Schema.String),
              lastUpdateTime: Schema.optional(Schema.String),
              message: Schema.optional(Schema.String),
              reason: Schema.optional(Schema.String),
              status: Schema.String,
              type: Schema.String,
            }),
          ),
        ),
      }),
    ),
  });
export type ReadCertificatesV1CertificateSigningRequestStatusOutput =
  typeof ReadCertificatesV1CertificateSigningRequestStatusOutput.Type;

// The operation
/**
 * read status of the specified CertificateSigningRequest
 */
export const readCertificatesV1CertificateSigningRequestStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReadCertificatesV1CertificateSigningRequestStatusInput,
    outputSchema: ReadCertificatesV1CertificateSigningRequestStatusOutput,
  }));
// Input Schema
export const ReadCertificatesV1alpha1ClusterTrustBundleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/certificates.k8s.io/v1alpha1/clustertrustbundles/{name}",
    }),
  );
export type ReadCertificatesV1alpha1ClusterTrustBundleInput =
  typeof ReadCertificatesV1alpha1ClusterTrustBundleInput.Type;

// Output Schema
export const ReadCertificatesV1alpha1ClusterTrustBundleOutput =
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
      signerName: Schema.optional(Schema.String),
      trustBundle: Schema.String,
    }),
  });
export type ReadCertificatesV1alpha1ClusterTrustBundleOutput =
  typeof ReadCertificatesV1alpha1ClusterTrustBundleOutput.Type;

// The operation
/**
 * read the specified ClusterTrustBundle
 */
export const readCertificatesV1alpha1ClusterTrustBundle =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReadCertificatesV1alpha1ClusterTrustBundleInput,
    outputSchema: ReadCertificatesV1alpha1ClusterTrustBundleOutput,
  }));
// Input Schema
export const ReadCertificatesV1beta1ClusterTrustBundleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/certificates.k8s.io/v1beta1/clustertrustbundles/{name}",
    }),
  );
export type ReadCertificatesV1beta1ClusterTrustBundleInput =
  typeof ReadCertificatesV1beta1ClusterTrustBundleInput.Type;

// Output Schema
export const ReadCertificatesV1beta1ClusterTrustBundleOutput =
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
      signerName: Schema.optional(Schema.String),
      trustBundle: Schema.String,
    }),
  });
export type ReadCertificatesV1beta1ClusterTrustBundleOutput =
  typeof ReadCertificatesV1beta1ClusterTrustBundleOutput.Type;

// The operation
/**
 * read the specified ClusterTrustBundle
 */
export const readCertificatesV1beta1ClusterTrustBundle =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReadCertificatesV1beta1ClusterTrustBundleInput,
    outputSchema: ReadCertificatesV1beta1ClusterTrustBundleOutput,
  }));
// Input Schema
export const ReadCertificatesV1beta1NamespacedPodCertificateRequestInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/certificates.k8s.io/v1beta1/namespaces/{namespace}/podcertificaterequests/{name}",
    }),
  );
export type ReadCertificatesV1beta1NamespacedPodCertificateRequestInput =
  typeof ReadCertificatesV1beta1NamespacedPodCertificateRequestInput.Type;

// Output Schema
export const ReadCertificatesV1beta1NamespacedPodCertificateRequestOutput =
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
      maxExpirationSeconds: Schema.optional(Schema.Number),
      nodeName: Schema.String,
      nodeUID: Schema.String,
      pkixPublicKey: Schema.optional(Schema.String),
      podName: Schema.String,
      podUID: Schema.String,
      proofOfPossession: Schema.optional(Schema.String),
      serviceAccountName: Schema.String,
      serviceAccountUID: Schema.String,
      signerName: Schema.String,
      stubPKCS10Request: Schema.String,
      unverifiedUserAnnotations: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
    }),
    status: Schema.optional(
      Schema.Struct({
        beginRefreshAt: Schema.optional(Schema.String),
        certificateChain: Schema.optional(Schema.String),
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
        notAfter: Schema.optional(Schema.String),
        notBefore: Schema.optional(Schema.String),
      }),
    ),
  });
export type ReadCertificatesV1beta1NamespacedPodCertificateRequestOutput =
  typeof ReadCertificatesV1beta1NamespacedPodCertificateRequestOutput.Type;

// The operation
/**
 * read the specified PodCertificateRequest
 */
export const readCertificatesV1beta1NamespacedPodCertificateRequest =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReadCertificatesV1beta1NamespacedPodCertificateRequestInput,
    outputSchema: ReadCertificatesV1beta1NamespacedPodCertificateRequestOutput,
  }));
// Input Schema
export const ReadCertificatesV1beta1NamespacedPodCertificateRequestStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/certificates.k8s.io/v1beta1/namespaces/{namespace}/podcertificaterequests/{name}/status",
    }),
  );
export type ReadCertificatesV1beta1NamespacedPodCertificateRequestStatusInput =
  typeof ReadCertificatesV1beta1NamespacedPodCertificateRequestStatusInput.Type;

// Output Schema
export const ReadCertificatesV1beta1NamespacedPodCertificateRequestStatusOutput =
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
      maxExpirationSeconds: Schema.optional(Schema.Number),
      nodeName: Schema.String,
      nodeUID: Schema.String,
      pkixPublicKey: Schema.optional(Schema.String),
      podName: Schema.String,
      podUID: Schema.String,
      proofOfPossession: Schema.optional(Schema.String),
      serviceAccountName: Schema.String,
      serviceAccountUID: Schema.String,
      signerName: Schema.String,
      stubPKCS10Request: Schema.String,
      unverifiedUserAnnotations: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
    }),
    status: Schema.optional(
      Schema.Struct({
        beginRefreshAt: Schema.optional(Schema.String),
        certificateChain: Schema.optional(Schema.String),
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
        notAfter: Schema.optional(Schema.String),
        notBefore: Schema.optional(Schema.String),
      }),
    ),
  });
export type ReadCertificatesV1beta1NamespacedPodCertificateRequestStatusOutput =
  typeof ReadCertificatesV1beta1NamespacedPodCertificateRequestStatusOutput.Type;

// The operation
/**
 * read status of the specified PodCertificateRequest
 */
export const readCertificatesV1beta1NamespacedPodCertificateRequestStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      ReadCertificatesV1beta1NamespacedPodCertificateRequestStatusInput,
    outputSchema:
      ReadCertificatesV1beta1NamespacedPodCertificateRequestStatusOutput,
  }));
// Input Schema
export const ReplaceCertificatesV1CertificateSigningRequestInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/certificates.k8s.io/v1/certificatesigningrequests/{name}",
    }),
  );
export type ReplaceCertificatesV1CertificateSigningRequestInput =
  typeof ReplaceCertificatesV1CertificateSigningRequestInput.Type;

// Output Schema
export const ReplaceCertificatesV1CertificateSigningRequestOutput =
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
      expirationSeconds: Schema.optional(Schema.Number),
      extra: Schema.optional(
        Schema.Record(Schema.String, Schema.Array(Schema.String)),
      ),
      groups: Schema.optional(Schema.Array(Schema.String)),
      request: Schema.String,
      signerName: Schema.String,
      uid: Schema.optional(Schema.String),
      usages: Schema.optional(Schema.Array(Schema.String)),
      username: Schema.optional(Schema.String),
    }),
    status: Schema.optional(
      Schema.Struct({
        certificate: Schema.optional(Schema.String),
        conditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastTransitionTime: Schema.optional(Schema.String),
              lastUpdateTime: Schema.optional(Schema.String),
              message: Schema.optional(Schema.String),
              reason: Schema.optional(Schema.String),
              status: Schema.String,
              type: Schema.String,
            }),
          ),
        ),
      }),
    ),
  });
export type ReplaceCertificatesV1CertificateSigningRequestOutput =
  typeof ReplaceCertificatesV1CertificateSigningRequestOutput.Type;

// The operation
/**
 * replace the specified CertificateSigningRequest
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceCertificatesV1CertificateSigningRequest =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReplaceCertificatesV1CertificateSigningRequestInput,
    outputSchema: ReplaceCertificatesV1CertificateSigningRequestOutput,
  }));
// Input Schema
export const ReplaceCertificatesV1CertificateSigningRequestApprovalInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/certificates.k8s.io/v1/certificatesigningrequests/{name}/approval",
    }),
  );
export type ReplaceCertificatesV1CertificateSigningRequestApprovalInput =
  typeof ReplaceCertificatesV1CertificateSigningRequestApprovalInput.Type;

// Output Schema
export const ReplaceCertificatesV1CertificateSigningRequestApprovalOutput =
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
      expirationSeconds: Schema.optional(Schema.Number),
      extra: Schema.optional(
        Schema.Record(Schema.String, Schema.Array(Schema.String)),
      ),
      groups: Schema.optional(Schema.Array(Schema.String)),
      request: Schema.String,
      signerName: Schema.String,
      uid: Schema.optional(Schema.String),
      usages: Schema.optional(Schema.Array(Schema.String)),
      username: Schema.optional(Schema.String),
    }),
    status: Schema.optional(
      Schema.Struct({
        certificate: Schema.optional(Schema.String),
        conditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastTransitionTime: Schema.optional(Schema.String),
              lastUpdateTime: Schema.optional(Schema.String),
              message: Schema.optional(Schema.String),
              reason: Schema.optional(Schema.String),
              status: Schema.String,
              type: Schema.String,
            }),
          ),
        ),
      }),
    ),
  });
export type ReplaceCertificatesV1CertificateSigningRequestApprovalOutput =
  typeof ReplaceCertificatesV1CertificateSigningRequestApprovalOutput.Type;

// The operation
/**
 * replace approval of the specified CertificateSigningRequest
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceCertificatesV1CertificateSigningRequestApproval =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReplaceCertificatesV1CertificateSigningRequestApprovalInput,
    outputSchema: ReplaceCertificatesV1CertificateSigningRequestApprovalOutput,
  }));
// Input Schema
export const ReplaceCertificatesV1CertificateSigningRequestStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/certificates.k8s.io/v1/certificatesigningrequests/{name}/status",
    }),
  );
export type ReplaceCertificatesV1CertificateSigningRequestStatusInput =
  typeof ReplaceCertificatesV1CertificateSigningRequestStatusInput.Type;

// Output Schema
export const ReplaceCertificatesV1CertificateSigningRequestStatusOutput =
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
      expirationSeconds: Schema.optional(Schema.Number),
      extra: Schema.optional(
        Schema.Record(Schema.String, Schema.Array(Schema.String)),
      ),
      groups: Schema.optional(Schema.Array(Schema.String)),
      request: Schema.String,
      signerName: Schema.String,
      uid: Schema.optional(Schema.String),
      usages: Schema.optional(Schema.Array(Schema.String)),
      username: Schema.optional(Schema.String),
    }),
    status: Schema.optional(
      Schema.Struct({
        certificate: Schema.optional(Schema.String),
        conditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastTransitionTime: Schema.optional(Schema.String),
              lastUpdateTime: Schema.optional(Schema.String),
              message: Schema.optional(Schema.String),
              reason: Schema.optional(Schema.String),
              status: Schema.String,
              type: Schema.String,
            }),
          ),
        ),
      }),
    ),
  });
export type ReplaceCertificatesV1CertificateSigningRequestStatusOutput =
  typeof ReplaceCertificatesV1CertificateSigningRequestStatusOutput.Type;

// The operation
/**
 * replace status of the specified CertificateSigningRequest
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceCertificatesV1CertificateSigningRequestStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReplaceCertificatesV1CertificateSigningRequestStatusInput,
    outputSchema: ReplaceCertificatesV1CertificateSigningRequestStatusOutput,
  }));
// Input Schema
export const ReplaceCertificatesV1alpha1ClusterTrustBundleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/certificates.k8s.io/v1alpha1/clustertrustbundles/{name}",
    }),
  );
export type ReplaceCertificatesV1alpha1ClusterTrustBundleInput =
  typeof ReplaceCertificatesV1alpha1ClusterTrustBundleInput.Type;

// Output Schema
export const ReplaceCertificatesV1alpha1ClusterTrustBundleOutput =
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
      signerName: Schema.optional(Schema.String),
      trustBundle: Schema.String,
    }),
  });
export type ReplaceCertificatesV1alpha1ClusterTrustBundleOutput =
  typeof ReplaceCertificatesV1alpha1ClusterTrustBundleOutput.Type;

// The operation
/**
 * replace the specified ClusterTrustBundle
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceCertificatesV1alpha1ClusterTrustBundle =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReplaceCertificatesV1alpha1ClusterTrustBundleInput,
    outputSchema: ReplaceCertificatesV1alpha1ClusterTrustBundleOutput,
  }));
// Input Schema
export const ReplaceCertificatesV1beta1ClusterTrustBundleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/certificates.k8s.io/v1beta1/clustertrustbundles/{name}",
    }),
  );
export type ReplaceCertificatesV1beta1ClusterTrustBundleInput =
  typeof ReplaceCertificatesV1beta1ClusterTrustBundleInput.Type;

// Output Schema
export const ReplaceCertificatesV1beta1ClusterTrustBundleOutput =
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
      signerName: Schema.optional(Schema.String),
      trustBundle: Schema.String,
    }),
  });
export type ReplaceCertificatesV1beta1ClusterTrustBundleOutput =
  typeof ReplaceCertificatesV1beta1ClusterTrustBundleOutput.Type;

// The operation
/**
 * replace the specified ClusterTrustBundle
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceCertificatesV1beta1ClusterTrustBundle =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReplaceCertificatesV1beta1ClusterTrustBundleInput,
    outputSchema: ReplaceCertificatesV1beta1ClusterTrustBundleOutput,
  }));
// Input Schema
export const ReplaceCertificatesV1beta1NamespacedPodCertificateRequestInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/certificates.k8s.io/v1beta1/namespaces/{namespace}/podcertificaterequests/{name}",
    }),
  );
export type ReplaceCertificatesV1beta1NamespacedPodCertificateRequestInput =
  typeof ReplaceCertificatesV1beta1NamespacedPodCertificateRequestInput.Type;

// Output Schema
export const ReplaceCertificatesV1beta1NamespacedPodCertificateRequestOutput =
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
      maxExpirationSeconds: Schema.optional(Schema.Number),
      nodeName: Schema.String,
      nodeUID: Schema.String,
      pkixPublicKey: Schema.optional(Schema.String),
      podName: Schema.String,
      podUID: Schema.String,
      proofOfPossession: Schema.optional(Schema.String),
      serviceAccountName: Schema.String,
      serviceAccountUID: Schema.String,
      signerName: Schema.String,
      stubPKCS10Request: Schema.String,
      unverifiedUserAnnotations: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
    }),
    status: Schema.optional(
      Schema.Struct({
        beginRefreshAt: Schema.optional(Schema.String),
        certificateChain: Schema.optional(Schema.String),
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
        notAfter: Schema.optional(Schema.String),
        notBefore: Schema.optional(Schema.String),
      }),
    ),
  });
export type ReplaceCertificatesV1beta1NamespacedPodCertificateRequestOutput =
  typeof ReplaceCertificatesV1beta1NamespacedPodCertificateRequestOutput.Type;

// The operation
/**
 * replace the specified PodCertificateRequest
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceCertificatesV1beta1NamespacedPodCertificateRequest =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReplaceCertificatesV1beta1NamespacedPodCertificateRequestInput,
    outputSchema:
      ReplaceCertificatesV1beta1NamespacedPodCertificateRequestOutput,
  }));
// Input Schema
export const ReplaceCertificatesV1beta1NamespacedPodCertificateRequestStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/certificates.k8s.io/v1beta1/namespaces/{namespace}/podcertificaterequests/{name}/status",
    }),
  );
export type ReplaceCertificatesV1beta1NamespacedPodCertificateRequestStatusInput =
  typeof ReplaceCertificatesV1beta1NamespacedPodCertificateRequestStatusInput.Type;

// Output Schema
export const ReplaceCertificatesV1beta1NamespacedPodCertificateRequestStatusOutput =
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
      maxExpirationSeconds: Schema.optional(Schema.Number),
      nodeName: Schema.String,
      nodeUID: Schema.String,
      pkixPublicKey: Schema.optional(Schema.String),
      podName: Schema.String,
      podUID: Schema.String,
      proofOfPossession: Schema.optional(Schema.String),
      serviceAccountName: Schema.String,
      serviceAccountUID: Schema.String,
      signerName: Schema.String,
      stubPKCS10Request: Schema.String,
      unverifiedUserAnnotations: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
    }),
    status: Schema.optional(
      Schema.Struct({
        beginRefreshAt: Schema.optional(Schema.String),
        certificateChain: Schema.optional(Schema.String),
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
        notAfter: Schema.optional(Schema.String),
        notBefore: Schema.optional(Schema.String),
      }),
    ),
  });
export type ReplaceCertificatesV1beta1NamespacedPodCertificateRequestStatusOutput =
  typeof ReplaceCertificatesV1beta1NamespacedPodCertificateRequestStatusOutput.Type;

// The operation
/**
 * replace status of the specified PodCertificateRequest
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceCertificatesV1beta1NamespacedPodCertificateRequestStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      ReplaceCertificatesV1beta1NamespacedPodCertificateRequestStatusInput,
    outputSchema:
      ReplaceCertificatesV1beta1NamespacedPodCertificateRequestStatusOutput,
  }));
// Input Schema
export const WatchCertificatesV1CertificateSigningRequestInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/certificates.k8s.io/v1/watch/certificatesigningrequests/{name}",
    }),
  );
export type WatchCertificatesV1CertificateSigningRequestInput =
  typeof WatchCertificatesV1CertificateSigningRequestInput.Type;

// Output Schema
export const WatchCertificatesV1CertificateSigningRequestOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchCertificatesV1CertificateSigningRequestOutput =
  typeof WatchCertificatesV1CertificateSigningRequestOutput.Type;

// The operation
/**
 * watch changes to an object of kind CertificateSigningRequest. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
 */
export const watchCertificatesV1CertificateSigningRequest =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchCertificatesV1CertificateSigningRequestInput,
    outputSchema: WatchCertificatesV1CertificateSigningRequestOutput,
  }));
// Input Schema
export const WatchCertificatesV1CertificateSigningRequestListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/certificates.k8s.io/v1/watch/certificatesigningrequests",
    }),
  );
export type WatchCertificatesV1CertificateSigningRequestListInput =
  typeof WatchCertificatesV1CertificateSigningRequestListInput.Type;

// Output Schema
export const WatchCertificatesV1CertificateSigningRequestListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchCertificatesV1CertificateSigningRequestListOutput =
  typeof WatchCertificatesV1CertificateSigningRequestListOutput.Type;

// The operation
/**
 * watch individual changes to a list of CertificateSigningRequest. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchCertificatesV1CertificateSigningRequestList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchCertificatesV1CertificateSigningRequestListInput,
    outputSchema: WatchCertificatesV1CertificateSigningRequestListOutput,
  }));
// Input Schema
export const WatchCertificatesV1alpha1ClusterTrustBundleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/certificates.k8s.io/v1alpha1/watch/clustertrustbundles/{name}",
    }),
  );
export type WatchCertificatesV1alpha1ClusterTrustBundleInput =
  typeof WatchCertificatesV1alpha1ClusterTrustBundleInput.Type;

// Output Schema
export const WatchCertificatesV1alpha1ClusterTrustBundleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchCertificatesV1alpha1ClusterTrustBundleOutput =
  typeof WatchCertificatesV1alpha1ClusterTrustBundleOutput.Type;

// The operation
/**
 * watch changes to an object of kind ClusterTrustBundle. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
 */
export const watchCertificatesV1alpha1ClusterTrustBundle =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchCertificatesV1alpha1ClusterTrustBundleInput,
    outputSchema: WatchCertificatesV1alpha1ClusterTrustBundleOutput,
  }));
// Input Schema
export const WatchCertificatesV1alpha1ClusterTrustBundleListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/certificates.k8s.io/v1alpha1/watch/clustertrustbundles",
    }),
  );
export type WatchCertificatesV1alpha1ClusterTrustBundleListInput =
  typeof WatchCertificatesV1alpha1ClusterTrustBundleListInput.Type;

// Output Schema
export const WatchCertificatesV1alpha1ClusterTrustBundleListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchCertificatesV1alpha1ClusterTrustBundleListOutput =
  typeof WatchCertificatesV1alpha1ClusterTrustBundleListOutput.Type;

// The operation
/**
 * watch individual changes to a list of ClusterTrustBundle. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchCertificatesV1alpha1ClusterTrustBundleList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchCertificatesV1alpha1ClusterTrustBundleListInput,
    outputSchema: WatchCertificatesV1alpha1ClusterTrustBundleListOutput,
  }));
// Input Schema
export const WatchCertificatesV1beta1ClusterTrustBundleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/certificates.k8s.io/v1beta1/watch/clustertrustbundles/{name}",
    }),
  );
export type WatchCertificatesV1beta1ClusterTrustBundleInput =
  typeof WatchCertificatesV1beta1ClusterTrustBundleInput.Type;

// Output Schema
export const WatchCertificatesV1beta1ClusterTrustBundleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchCertificatesV1beta1ClusterTrustBundleOutput =
  typeof WatchCertificatesV1beta1ClusterTrustBundleOutput.Type;

// The operation
/**
 * watch changes to an object of kind ClusterTrustBundle. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
 */
export const watchCertificatesV1beta1ClusterTrustBundle =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchCertificatesV1beta1ClusterTrustBundleInput,
    outputSchema: WatchCertificatesV1beta1ClusterTrustBundleOutput,
  }));
// Input Schema
export const WatchCertificatesV1beta1ClusterTrustBundleListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/certificates.k8s.io/v1beta1/watch/clustertrustbundles",
    }),
  );
export type WatchCertificatesV1beta1ClusterTrustBundleListInput =
  typeof WatchCertificatesV1beta1ClusterTrustBundleListInput.Type;

// Output Schema
export const WatchCertificatesV1beta1ClusterTrustBundleListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchCertificatesV1beta1ClusterTrustBundleListOutput =
  typeof WatchCertificatesV1beta1ClusterTrustBundleListOutput.Type;

// The operation
/**
 * watch individual changes to a list of ClusterTrustBundle. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchCertificatesV1beta1ClusterTrustBundleList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchCertificatesV1beta1ClusterTrustBundleListInput,
    outputSchema: WatchCertificatesV1beta1ClusterTrustBundleListOutput,
  }));
// Input Schema
export const WatchCertificatesV1beta1NamespacedPodCertificateRequestInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/certificates.k8s.io/v1beta1/watch/namespaces/{namespace}/podcertificaterequests/{name}",
    }),
  );
export type WatchCertificatesV1beta1NamespacedPodCertificateRequestInput =
  typeof WatchCertificatesV1beta1NamespacedPodCertificateRequestInput.Type;

// Output Schema
export const WatchCertificatesV1beta1NamespacedPodCertificateRequestOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchCertificatesV1beta1NamespacedPodCertificateRequestOutput =
  typeof WatchCertificatesV1beta1NamespacedPodCertificateRequestOutput.Type;

// The operation
/**
 * watch changes to an object of kind PodCertificateRequest. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
 */
export const watchCertificatesV1beta1NamespacedPodCertificateRequest =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchCertificatesV1beta1NamespacedPodCertificateRequestInput,
    outputSchema: WatchCertificatesV1beta1NamespacedPodCertificateRequestOutput,
  }));
// Input Schema
export const WatchCertificatesV1beta1NamespacedPodCertificateRequestListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/certificates.k8s.io/v1beta1/watch/namespaces/{namespace}/podcertificaterequests",
    }),
  );
export type WatchCertificatesV1beta1NamespacedPodCertificateRequestListInput =
  typeof WatchCertificatesV1beta1NamespacedPodCertificateRequestListInput.Type;

// Output Schema
export const WatchCertificatesV1beta1NamespacedPodCertificateRequestListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchCertificatesV1beta1NamespacedPodCertificateRequestListOutput =
  typeof WatchCertificatesV1beta1NamespacedPodCertificateRequestListOutput.Type;

// The operation
/**
 * watch individual changes to a list of PodCertificateRequest. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchCertificatesV1beta1NamespacedPodCertificateRequestList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      WatchCertificatesV1beta1NamespacedPodCertificateRequestListInput,
    outputSchema:
      WatchCertificatesV1beta1NamespacedPodCertificateRequestListOutput,
  }));
// Input Schema
export const WatchCertificatesV1beta1PodCertificateRequestListForAllNamespacesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/certificates.k8s.io/v1beta1/watch/podcertificaterequests",
    }),
  );
export type WatchCertificatesV1beta1PodCertificateRequestListForAllNamespacesInput =
  typeof WatchCertificatesV1beta1PodCertificateRequestListForAllNamespacesInput.Type;

// Output Schema
export const WatchCertificatesV1beta1PodCertificateRequestListForAllNamespacesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchCertificatesV1beta1PodCertificateRequestListForAllNamespacesOutput =
  typeof WatchCertificatesV1beta1PodCertificateRequestListForAllNamespacesOutput.Type;

// The operation
/**
 * watch individual changes to a list of PodCertificateRequest. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchCertificatesV1beta1PodCertificateRequestListForAllNamespaces =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      WatchCertificatesV1beta1PodCertificateRequestListForAllNamespacesInput,
    outputSchema:
      WatchCertificatesV1beta1PodCertificateRequestListForAllNamespacesOutput,
  }));
