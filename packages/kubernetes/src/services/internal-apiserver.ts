/**
 * Kubernetes Internal API Server API
 *
 * Generated from the Kubernetes OpenAPI spec.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";

// Input Schema
export const CreateInternalApiserverV1alpha1StorageVersionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/apis/internal.apiserver.k8s.io/v1alpha1/storageversions",
    }),
  );
export type CreateInternalApiserverV1alpha1StorageVersionInput =
  typeof CreateInternalApiserverV1alpha1StorageVersionInput.Type;

// Output Schema
export const CreateInternalApiserverV1alpha1StorageVersionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    apiVersion: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
    metadata: Schema.Struct({
      annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
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
    spec: Schema.optional(Schema.Unknown),
    status: Schema.optional(
      Schema.Struct({
        commonEncodingVersion: Schema.optional(Schema.String),
        conditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastTransitionTime: Schema.optional(Schema.String),
              message: Schema.String,
              observedGeneration: Schema.optional(Schema.Number),
              reason: Schema.String,
              status: Schema.String,
              type: Schema.String,
            }),
          ),
        ),
        storageVersions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              apiServerID: Schema.String,
              decodableVersions: Schema.Array(Schema.String),
              encodingVersion: Schema.String,
              servedVersions: Schema.optional(Schema.Array(Schema.String)),
            }),
          ),
        ),
      }),
    ),
  });
export type CreateInternalApiserverV1alpha1StorageVersionOutput =
  typeof CreateInternalApiserverV1alpha1StorageVersionOutput.Type;

// The operation
/**
 * create a StorageVersion
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const createInternalApiserverV1alpha1StorageVersion =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateInternalApiserverV1alpha1StorageVersionInput,
    outputSchema: CreateInternalApiserverV1alpha1StorageVersionOutput,
  }));
// Input Schema
export const DeleteInternalApiserverV1alpha1CollectionStorageVersionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/internal.apiserver.k8s.io/v1alpha1/storageversions",
    }),
  );
export type DeleteInternalApiserverV1alpha1CollectionStorageVersionInput =
  typeof DeleteInternalApiserverV1alpha1CollectionStorageVersionInput.Type;

// Output Schema
export const DeleteInternalApiserverV1alpha1CollectionStorageVersionOutput =
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
export type DeleteInternalApiserverV1alpha1CollectionStorageVersionOutput =
  typeof DeleteInternalApiserverV1alpha1CollectionStorageVersionOutput.Type;

// The operation
/**
 * delete collection of StorageVersion
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteInternalApiserverV1alpha1CollectionStorageVersion =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteInternalApiserverV1alpha1CollectionStorageVersionInput,
    outputSchema: DeleteInternalApiserverV1alpha1CollectionStorageVersionOutput,
  }));
// Input Schema
export const DeleteInternalApiserverV1alpha1StorageVersionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/internal.apiserver.k8s.io/v1alpha1/storageversions/{name}",
    }),
  );
export type DeleteInternalApiserverV1alpha1StorageVersionInput =
  typeof DeleteInternalApiserverV1alpha1StorageVersionInput.Type;

// Output Schema
export const DeleteInternalApiserverV1alpha1StorageVersionOutput =
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
export type DeleteInternalApiserverV1alpha1StorageVersionOutput =
  typeof DeleteInternalApiserverV1alpha1StorageVersionOutput.Type;

// The operation
/**
 * delete a StorageVersion
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteInternalApiserverV1alpha1StorageVersion =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteInternalApiserverV1alpha1StorageVersionInput,
    outputSchema: DeleteInternalApiserverV1alpha1StorageVersionOutput,
  }));
// Input Schema
export const GetInternalApiserverAPIGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/apis/internal.apiserver.k8s.io/" }),
  );
export type GetInternalApiserverAPIGroupInput =
  typeof GetInternalApiserverAPIGroupInput.Type;

// Output Schema
export const GetInternalApiserverAPIGroupOutput =
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
export type GetInternalApiserverAPIGroupOutput =
  typeof GetInternalApiserverAPIGroupOutput.Type;

// The operation
/**
 * get information of a group
 */
export const getInternalApiserverAPIGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetInternalApiserverAPIGroupInput,
    outputSchema: GetInternalApiserverAPIGroupOutput,
  }));
// Input Schema
export const GetInternalApiserverV1alpha1APIResourcesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/internal.apiserver.k8s.io/v1alpha1/",
    }),
  );
export type GetInternalApiserverV1alpha1APIResourcesInput =
  typeof GetInternalApiserverV1alpha1APIResourcesInput.Type;

// Output Schema
export const GetInternalApiserverV1alpha1APIResourcesOutput =
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
export type GetInternalApiserverV1alpha1APIResourcesOutput =
  typeof GetInternalApiserverV1alpha1APIResourcesOutput.Type;

// The operation
/**
 * get available resources
 */
export const getInternalApiserverV1alpha1APIResources =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetInternalApiserverV1alpha1APIResourcesInput,
    outputSchema: GetInternalApiserverV1alpha1APIResourcesOutput,
  }));
// Input Schema
export const ListInternalApiserverV1alpha1StorageVersionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/internal.apiserver.k8s.io/v1alpha1/storageversions",
    }),
  );
export type ListInternalApiserverV1alpha1StorageVersionInput =
  typeof ListInternalApiserverV1alpha1StorageVersionInput.Type;

// Output Schema
export const ListInternalApiserverV1alpha1StorageVersionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    apiVersion: Schema.optional(Schema.String),
    items: Schema.Array(
      Schema.Struct({
        apiVersion: Schema.optional(Schema.String),
        kind: Schema.optional(Schema.String),
        metadata: Schema.Struct({
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
        spec: Schema.optional(Schema.Unknown),
        status: Schema.optional(
          Schema.Struct({
            commonEncodingVersion: Schema.optional(Schema.String),
            conditions: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  lastTransitionTime: Schema.optional(Schema.String),
                  message: Schema.String,
                  observedGeneration: Schema.optional(Schema.Number),
                  reason: Schema.String,
                  status: Schema.String,
                  type: Schema.String,
                }),
              ),
            ),
            storageVersions: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiServerID: Schema.String,
                  decodableVersions: Schema.Array(Schema.String),
                  encodingVersion: Schema.String,
                  servedVersions: Schema.optional(Schema.Array(Schema.String)),
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
export type ListInternalApiserverV1alpha1StorageVersionOutput =
  typeof ListInternalApiserverV1alpha1StorageVersionOutput.Type;

// The operation
/**
 * list or watch objects of kind StorageVersion
 */
export const listInternalApiserverV1alpha1StorageVersion =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListInternalApiserverV1alpha1StorageVersionInput,
    outputSchema: ListInternalApiserverV1alpha1StorageVersionOutput,
  }));
// Input Schema
export const PatchInternalApiserverV1alpha1StorageVersionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/internal.apiserver.k8s.io/v1alpha1/storageversions/{name}",
    }),
  );
export type PatchInternalApiserverV1alpha1StorageVersionInput =
  typeof PatchInternalApiserverV1alpha1StorageVersionInput.Type;

// Output Schema
export const PatchInternalApiserverV1alpha1StorageVersionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    apiVersion: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
    metadata: Schema.Struct({
      annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
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
    spec: Schema.optional(Schema.Unknown),
    status: Schema.optional(
      Schema.Struct({
        commonEncodingVersion: Schema.optional(Schema.String),
        conditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastTransitionTime: Schema.optional(Schema.String),
              message: Schema.String,
              observedGeneration: Schema.optional(Schema.Number),
              reason: Schema.String,
              status: Schema.String,
              type: Schema.String,
            }),
          ),
        ),
        storageVersions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              apiServerID: Schema.String,
              decodableVersions: Schema.Array(Schema.String),
              encodingVersion: Schema.String,
              servedVersions: Schema.optional(Schema.Array(Schema.String)),
            }),
          ),
        ),
      }),
    ),
  });
export type PatchInternalApiserverV1alpha1StorageVersionOutput =
  typeof PatchInternalApiserverV1alpha1StorageVersionOutput.Type;

// The operation
/**
 * partially update the specified StorageVersion
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchInternalApiserverV1alpha1StorageVersion =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PatchInternalApiserverV1alpha1StorageVersionInput,
    outputSchema: PatchInternalApiserverV1alpha1StorageVersionOutput,
  }));
// Input Schema
export const PatchInternalApiserverV1alpha1StorageVersionStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/internal.apiserver.k8s.io/v1alpha1/storageversions/{name}/status",
    }),
  );
export type PatchInternalApiserverV1alpha1StorageVersionStatusInput =
  typeof PatchInternalApiserverV1alpha1StorageVersionStatusInput.Type;

// Output Schema
export const PatchInternalApiserverV1alpha1StorageVersionStatusOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    apiVersion: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
    metadata: Schema.Struct({
      annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
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
    spec: Schema.optional(Schema.Unknown),
    status: Schema.optional(
      Schema.Struct({
        commonEncodingVersion: Schema.optional(Schema.String),
        conditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastTransitionTime: Schema.optional(Schema.String),
              message: Schema.String,
              observedGeneration: Schema.optional(Schema.Number),
              reason: Schema.String,
              status: Schema.String,
              type: Schema.String,
            }),
          ),
        ),
        storageVersions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              apiServerID: Schema.String,
              decodableVersions: Schema.Array(Schema.String),
              encodingVersion: Schema.String,
              servedVersions: Schema.optional(Schema.Array(Schema.String)),
            }),
          ),
        ),
      }),
    ),
  });
export type PatchInternalApiserverV1alpha1StorageVersionStatusOutput =
  typeof PatchInternalApiserverV1alpha1StorageVersionStatusOutput.Type;

// The operation
/**
 * partially update status of the specified StorageVersion
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchInternalApiserverV1alpha1StorageVersionStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PatchInternalApiserverV1alpha1StorageVersionStatusInput,
    outputSchema: PatchInternalApiserverV1alpha1StorageVersionStatusOutput,
  }));
// Input Schema
export const ReadInternalApiserverV1alpha1StorageVersionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/internal.apiserver.k8s.io/v1alpha1/storageversions/{name}",
    }),
  );
export type ReadInternalApiserverV1alpha1StorageVersionInput =
  typeof ReadInternalApiserverV1alpha1StorageVersionInput.Type;

// Output Schema
export const ReadInternalApiserverV1alpha1StorageVersionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    apiVersion: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
    metadata: Schema.Struct({
      annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
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
    spec: Schema.optional(Schema.Unknown),
    status: Schema.optional(
      Schema.Struct({
        commonEncodingVersion: Schema.optional(Schema.String),
        conditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastTransitionTime: Schema.optional(Schema.String),
              message: Schema.String,
              observedGeneration: Schema.optional(Schema.Number),
              reason: Schema.String,
              status: Schema.String,
              type: Schema.String,
            }),
          ),
        ),
        storageVersions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              apiServerID: Schema.String,
              decodableVersions: Schema.Array(Schema.String),
              encodingVersion: Schema.String,
              servedVersions: Schema.optional(Schema.Array(Schema.String)),
            }),
          ),
        ),
      }),
    ),
  });
export type ReadInternalApiserverV1alpha1StorageVersionOutput =
  typeof ReadInternalApiserverV1alpha1StorageVersionOutput.Type;

// The operation
/**
 * read the specified StorageVersion
 */
export const readInternalApiserverV1alpha1StorageVersion =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReadInternalApiserverV1alpha1StorageVersionInput,
    outputSchema: ReadInternalApiserverV1alpha1StorageVersionOutput,
  }));
// Input Schema
export const ReadInternalApiserverV1alpha1StorageVersionStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/internal.apiserver.k8s.io/v1alpha1/storageversions/{name}/status",
    }),
  );
export type ReadInternalApiserverV1alpha1StorageVersionStatusInput =
  typeof ReadInternalApiserverV1alpha1StorageVersionStatusInput.Type;

// Output Schema
export const ReadInternalApiserverV1alpha1StorageVersionStatusOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    apiVersion: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
    metadata: Schema.Struct({
      annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
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
    spec: Schema.optional(Schema.Unknown),
    status: Schema.optional(
      Schema.Struct({
        commonEncodingVersion: Schema.optional(Schema.String),
        conditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastTransitionTime: Schema.optional(Schema.String),
              message: Schema.String,
              observedGeneration: Schema.optional(Schema.Number),
              reason: Schema.String,
              status: Schema.String,
              type: Schema.String,
            }),
          ),
        ),
        storageVersions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              apiServerID: Schema.String,
              decodableVersions: Schema.Array(Schema.String),
              encodingVersion: Schema.String,
              servedVersions: Schema.optional(Schema.Array(Schema.String)),
            }),
          ),
        ),
      }),
    ),
  });
export type ReadInternalApiserverV1alpha1StorageVersionStatusOutput =
  typeof ReadInternalApiserverV1alpha1StorageVersionStatusOutput.Type;

// The operation
/**
 * read status of the specified StorageVersion
 */
export const readInternalApiserverV1alpha1StorageVersionStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReadInternalApiserverV1alpha1StorageVersionStatusInput,
    outputSchema: ReadInternalApiserverV1alpha1StorageVersionStatusOutput,
  }));
// Input Schema
export const ReplaceInternalApiserverV1alpha1StorageVersionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/internal.apiserver.k8s.io/v1alpha1/storageversions/{name}",
    }),
  );
export type ReplaceInternalApiserverV1alpha1StorageVersionInput =
  typeof ReplaceInternalApiserverV1alpha1StorageVersionInput.Type;

// Output Schema
export const ReplaceInternalApiserverV1alpha1StorageVersionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    apiVersion: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
    metadata: Schema.Struct({
      annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
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
    spec: Schema.optional(Schema.Unknown),
    status: Schema.optional(
      Schema.Struct({
        commonEncodingVersion: Schema.optional(Schema.String),
        conditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastTransitionTime: Schema.optional(Schema.String),
              message: Schema.String,
              observedGeneration: Schema.optional(Schema.Number),
              reason: Schema.String,
              status: Schema.String,
              type: Schema.String,
            }),
          ),
        ),
        storageVersions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              apiServerID: Schema.String,
              decodableVersions: Schema.Array(Schema.String),
              encodingVersion: Schema.String,
              servedVersions: Schema.optional(Schema.Array(Schema.String)),
            }),
          ),
        ),
      }),
    ),
  });
export type ReplaceInternalApiserverV1alpha1StorageVersionOutput =
  typeof ReplaceInternalApiserverV1alpha1StorageVersionOutput.Type;

// The operation
/**
 * replace the specified StorageVersion
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceInternalApiserverV1alpha1StorageVersion =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReplaceInternalApiserverV1alpha1StorageVersionInput,
    outputSchema: ReplaceInternalApiserverV1alpha1StorageVersionOutput,
  }));
// Input Schema
export const ReplaceInternalApiserverV1alpha1StorageVersionStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/internal.apiserver.k8s.io/v1alpha1/storageversions/{name}/status",
    }),
  );
export type ReplaceInternalApiserverV1alpha1StorageVersionStatusInput =
  typeof ReplaceInternalApiserverV1alpha1StorageVersionStatusInput.Type;

// Output Schema
export const ReplaceInternalApiserverV1alpha1StorageVersionStatusOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    apiVersion: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
    metadata: Schema.Struct({
      annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
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
    spec: Schema.optional(Schema.Unknown),
    status: Schema.optional(
      Schema.Struct({
        commonEncodingVersion: Schema.optional(Schema.String),
        conditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastTransitionTime: Schema.optional(Schema.String),
              message: Schema.String,
              observedGeneration: Schema.optional(Schema.Number),
              reason: Schema.String,
              status: Schema.String,
              type: Schema.String,
            }),
          ),
        ),
        storageVersions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              apiServerID: Schema.String,
              decodableVersions: Schema.Array(Schema.String),
              encodingVersion: Schema.String,
              servedVersions: Schema.optional(Schema.Array(Schema.String)),
            }),
          ),
        ),
      }),
    ),
  });
export type ReplaceInternalApiserverV1alpha1StorageVersionStatusOutput =
  typeof ReplaceInternalApiserverV1alpha1StorageVersionStatusOutput.Type;

// The operation
/**
 * replace status of the specified StorageVersion
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceInternalApiserverV1alpha1StorageVersionStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReplaceInternalApiserverV1alpha1StorageVersionStatusInput,
    outputSchema: ReplaceInternalApiserverV1alpha1StorageVersionStatusOutput,
  }));
// Input Schema
export const WatchInternalApiserverV1alpha1StorageVersionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/internal.apiserver.k8s.io/v1alpha1/watch/storageversions/{name}",
    }),
  );
export type WatchInternalApiserverV1alpha1StorageVersionInput =
  typeof WatchInternalApiserverV1alpha1StorageVersionInput.Type;

// Output Schema
export const WatchInternalApiserverV1alpha1StorageVersionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchInternalApiserverV1alpha1StorageVersionOutput =
  typeof WatchInternalApiserverV1alpha1StorageVersionOutput.Type;

// The operation
/**
 * watch changes to an object of kind StorageVersion. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
 */
export const watchInternalApiserverV1alpha1StorageVersion =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchInternalApiserverV1alpha1StorageVersionInput,
    outputSchema: WatchInternalApiserverV1alpha1StorageVersionOutput,
  }));
// Input Schema
export const WatchInternalApiserverV1alpha1StorageVersionListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/internal.apiserver.k8s.io/v1alpha1/watch/storageversions",
    }),
  );
export type WatchInternalApiserverV1alpha1StorageVersionListInput =
  typeof WatchInternalApiserverV1alpha1StorageVersionListInput.Type;

// Output Schema
export const WatchInternalApiserverV1alpha1StorageVersionListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchInternalApiserverV1alpha1StorageVersionListOutput =
  typeof WatchInternalApiserverV1alpha1StorageVersionListOutput.Type;

// The operation
/**
 * watch individual changes to a list of StorageVersion. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchInternalApiserverV1alpha1StorageVersionList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchInternalApiserverV1alpha1StorageVersionListInput,
    outputSchema: WatchInternalApiserverV1alpha1StorageVersionListOutput,
  }));
