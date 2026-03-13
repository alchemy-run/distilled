/**
 * Kubernetes Storage Migration API
 *
 * Generated from the Kubernetes OpenAPI spec.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";

// Input Schema
export const CreateStoragemigrationV1beta1StorageVersionMigrationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/apis/storagemigration.k8s.io/v1beta1/storageversionmigrations",
    }),
  );
export type CreateStoragemigrationV1beta1StorageVersionMigrationInput =
  typeof CreateStoragemigrationV1beta1StorageVersionMigrationInput.Type;

// Output Schema
export const CreateStoragemigrationV1beta1StorageVersionMigrationOutput =
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
        resource: Schema.Struct({
          group: Schema.String,
          resource: Schema.String,
        }),
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
        resourceVersion: Schema.optional(Schema.String),
      }),
    ),
  });
export type CreateStoragemigrationV1beta1StorageVersionMigrationOutput =
  typeof CreateStoragemigrationV1beta1StorageVersionMigrationOutput.Type;

// The operation
/**
 * create a StorageVersionMigration
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const createStoragemigrationV1beta1StorageVersionMigration =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateStoragemigrationV1beta1StorageVersionMigrationInput,
    outputSchema: CreateStoragemigrationV1beta1StorageVersionMigrationOutput,
  }));
// Input Schema
export const DeleteStoragemigrationV1beta1CollectionStorageVersionMigrationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/storagemigration.k8s.io/v1beta1/storageversionmigrations",
    }),
  );
export type DeleteStoragemigrationV1beta1CollectionStorageVersionMigrationInput =
  typeof DeleteStoragemigrationV1beta1CollectionStorageVersionMigrationInput.Type;

// Output Schema
export const DeleteStoragemigrationV1beta1CollectionStorageVersionMigrationOutput =
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
export type DeleteStoragemigrationV1beta1CollectionStorageVersionMigrationOutput =
  typeof DeleteStoragemigrationV1beta1CollectionStorageVersionMigrationOutput.Type;

// The operation
/**
 * delete collection of StorageVersionMigration
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteStoragemigrationV1beta1CollectionStorageVersionMigration =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      DeleteStoragemigrationV1beta1CollectionStorageVersionMigrationInput,
    outputSchema:
      DeleteStoragemigrationV1beta1CollectionStorageVersionMigrationOutput,
  }));
// Input Schema
export const DeleteStoragemigrationV1beta1StorageVersionMigrationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/storagemigration.k8s.io/v1beta1/storageversionmigrations/{name}",
    }),
  );
export type DeleteStoragemigrationV1beta1StorageVersionMigrationInput =
  typeof DeleteStoragemigrationV1beta1StorageVersionMigrationInput.Type;

// Output Schema
export const DeleteStoragemigrationV1beta1StorageVersionMigrationOutput =
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
export type DeleteStoragemigrationV1beta1StorageVersionMigrationOutput =
  typeof DeleteStoragemigrationV1beta1StorageVersionMigrationOutput.Type;

// The operation
/**
 * delete a StorageVersionMigration
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteStoragemigrationV1beta1StorageVersionMigration =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteStoragemigrationV1beta1StorageVersionMigrationInput,
    outputSchema: DeleteStoragemigrationV1beta1StorageVersionMigrationOutput,
  }));
// Input Schema
export const GetStoragemigrationAPIGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/apis/storagemigration.k8s.io/" }),
  );
export type GetStoragemigrationAPIGroupInput =
  typeof GetStoragemigrationAPIGroupInput.Type;

// Output Schema
export const GetStoragemigrationAPIGroupOutput =
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
export type GetStoragemigrationAPIGroupOutput =
  typeof GetStoragemigrationAPIGroupOutput.Type;

// The operation
/**
 * get information of a group
 */
export const getStoragemigrationAPIGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetStoragemigrationAPIGroupInput,
    outputSchema: GetStoragemigrationAPIGroupOutput,
  }),
);
// Input Schema
export const GetStoragemigrationV1beta1APIResourcesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/apis/storagemigration.k8s.io/v1beta1/" }),
  );
export type GetStoragemigrationV1beta1APIResourcesInput =
  typeof GetStoragemigrationV1beta1APIResourcesInput.Type;

// Output Schema
export const GetStoragemigrationV1beta1APIResourcesOutput =
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
export type GetStoragemigrationV1beta1APIResourcesOutput =
  typeof GetStoragemigrationV1beta1APIResourcesOutput.Type;

// The operation
/**
 * get available resources
 */
export const getStoragemigrationV1beta1APIResources =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetStoragemigrationV1beta1APIResourcesInput,
    outputSchema: GetStoragemigrationV1beta1APIResourcesOutput,
  }));
// Input Schema
export const ListStoragemigrationV1beta1StorageVersionMigrationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/storagemigration.k8s.io/v1beta1/storageversionmigrations",
    }),
  );
export type ListStoragemigrationV1beta1StorageVersionMigrationInput =
  typeof ListStoragemigrationV1beta1StorageVersionMigrationInput.Type;

// Output Schema
export const ListStoragemigrationV1beta1StorageVersionMigrationOutput =
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
            resource: Schema.Struct({
              group: Schema.String,
              resource: Schema.String,
            }),
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
            resourceVersion: Schema.optional(Schema.String),
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
export type ListStoragemigrationV1beta1StorageVersionMigrationOutput =
  typeof ListStoragemigrationV1beta1StorageVersionMigrationOutput.Type;

// The operation
/**
 * list or watch objects of kind StorageVersionMigration
 */
export const listStoragemigrationV1beta1StorageVersionMigration =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListStoragemigrationV1beta1StorageVersionMigrationInput,
    outputSchema: ListStoragemigrationV1beta1StorageVersionMigrationOutput,
  }));
// Input Schema
export const PatchStoragemigrationV1beta1StorageVersionMigrationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/storagemigration.k8s.io/v1beta1/storageversionmigrations/{name}",
    }),
  );
export type PatchStoragemigrationV1beta1StorageVersionMigrationInput =
  typeof PatchStoragemigrationV1beta1StorageVersionMigrationInput.Type;

// Output Schema
export const PatchStoragemigrationV1beta1StorageVersionMigrationOutput =
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
        resource: Schema.Struct({
          group: Schema.String,
          resource: Schema.String,
        }),
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
        resourceVersion: Schema.optional(Schema.String),
      }),
    ),
  });
export type PatchStoragemigrationV1beta1StorageVersionMigrationOutput =
  typeof PatchStoragemigrationV1beta1StorageVersionMigrationOutput.Type;

// The operation
/**
 * partially update the specified StorageVersionMigration
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchStoragemigrationV1beta1StorageVersionMigration =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PatchStoragemigrationV1beta1StorageVersionMigrationInput,
    outputSchema: PatchStoragemigrationV1beta1StorageVersionMigrationOutput,
  }));
// Input Schema
export const PatchStoragemigrationV1beta1StorageVersionMigrationStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/storagemigration.k8s.io/v1beta1/storageversionmigrations/{name}/status",
    }),
  );
export type PatchStoragemigrationV1beta1StorageVersionMigrationStatusInput =
  typeof PatchStoragemigrationV1beta1StorageVersionMigrationStatusInput.Type;

// Output Schema
export const PatchStoragemigrationV1beta1StorageVersionMigrationStatusOutput =
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
        resource: Schema.Struct({
          group: Schema.String,
          resource: Schema.String,
        }),
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
        resourceVersion: Schema.optional(Schema.String),
      }),
    ),
  });
export type PatchStoragemigrationV1beta1StorageVersionMigrationStatusOutput =
  typeof PatchStoragemigrationV1beta1StorageVersionMigrationStatusOutput.Type;

// The operation
/**
 * partially update status of the specified StorageVersionMigration
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchStoragemigrationV1beta1StorageVersionMigrationStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PatchStoragemigrationV1beta1StorageVersionMigrationStatusInput,
    outputSchema:
      PatchStoragemigrationV1beta1StorageVersionMigrationStatusOutput,
  }));
// Input Schema
export const ReadStoragemigrationV1beta1StorageVersionMigrationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/storagemigration.k8s.io/v1beta1/storageversionmigrations/{name}",
    }),
  );
export type ReadStoragemigrationV1beta1StorageVersionMigrationInput =
  typeof ReadStoragemigrationV1beta1StorageVersionMigrationInput.Type;

// Output Schema
export const ReadStoragemigrationV1beta1StorageVersionMigrationOutput =
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
        resource: Schema.Struct({
          group: Schema.String,
          resource: Schema.String,
        }),
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
        resourceVersion: Schema.optional(Schema.String),
      }),
    ),
  });
export type ReadStoragemigrationV1beta1StorageVersionMigrationOutput =
  typeof ReadStoragemigrationV1beta1StorageVersionMigrationOutput.Type;

// The operation
/**
 * read the specified StorageVersionMigration
 */
export const readStoragemigrationV1beta1StorageVersionMigration =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReadStoragemigrationV1beta1StorageVersionMigrationInput,
    outputSchema: ReadStoragemigrationV1beta1StorageVersionMigrationOutput,
  }));
// Input Schema
export const ReadStoragemigrationV1beta1StorageVersionMigrationStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/storagemigration.k8s.io/v1beta1/storageversionmigrations/{name}/status",
    }),
  );
export type ReadStoragemigrationV1beta1StorageVersionMigrationStatusInput =
  typeof ReadStoragemigrationV1beta1StorageVersionMigrationStatusInput.Type;

// Output Schema
export const ReadStoragemigrationV1beta1StorageVersionMigrationStatusOutput =
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
        resource: Schema.Struct({
          group: Schema.String,
          resource: Schema.String,
        }),
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
        resourceVersion: Schema.optional(Schema.String),
      }),
    ),
  });
export type ReadStoragemigrationV1beta1StorageVersionMigrationStatusOutput =
  typeof ReadStoragemigrationV1beta1StorageVersionMigrationStatusOutput.Type;

// The operation
/**
 * read status of the specified StorageVersionMigration
 */
export const readStoragemigrationV1beta1StorageVersionMigrationStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReadStoragemigrationV1beta1StorageVersionMigrationStatusInput,
    outputSchema:
      ReadStoragemigrationV1beta1StorageVersionMigrationStatusOutput,
  }));
// Input Schema
export const ReplaceStoragemigrationV1beta1StorageVersionMigrationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/storagemigration.k8s.io/v1beta1/storageversionmigrations/{name}",
    }),
  );
export type ReplaceStoragemigrationV1beta1StorageVersionMigrationInput =
  typeof ReplaceStoragemigrationV1beta1StorageVersionMigrationInput.Type;

// Output Schema
export const ReplaceStoragemigrationV1beta1StorageVersionMigrationOutput =
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
        resource: Schema.Struct({
          group: Schema.String,
          resource: Schema.String,
        }),
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
        resourceVersion: Schema.optional(Schema.String),
      }),
    ),
  });
export type ReplaceStoragemigrationV1beta1StorageVersionMigrationOutput =
  typeof ReplaceStoragemigrationV1beta1StorageVersionMigrationOutput.Type;

// The operation
/**
 * replace the specified StorageVersionMigration
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceStoragemigrationV1beta1StorageVersionMigration =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReplaceStoragemigrationV1beta1StorageVersionMigrationInput,
    outputSchema: ReplaceStoragemigrationV1beta1StorageVersionMigrationOutput,
  }));
// Input Schema
export const ReplaceStoragemigrationV1beta1StorageVersionMigrationStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/storagemigration.k8s.io/v1beta1/storageversionmigrations/{name}/status",
    }),
  );
export type ReplaceStoragemigrationV1beta1StorageVersionMigrationStatusInput =
  typeof ReplaceStoragemigrationV1beta1StorageVersionMigrationStatusInput.Type;

// Output Schema
export const ReplaceStoragemigrationV1beta1StorageVersionMigrationStatusOutput =
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
        resource: Schema.Struct({
          group: Schema.String,
          resource: Schema.String,
        }),
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
        resourceVersion: Schema.optional(Schema.String),
      }),
    ),
  });
export type ReplaceStoragemigrationV1beta1StorageVersionMigrationStatusOutput =
  typeof ReplaceStoragemigrationV1beta1StorageVersionMigrationStatusOutput.Type;

// The operation
/**
 * replace status of the specified StorageVersionMigration
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceStoragemigrationV1beta1StorageVersionMigrationStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      ReplaceStoragemigrationV1beta1StorageVersionMigrationStatusInput,
    outputSchema:
      ReplaceStoragemigrationV1beta1StorageVersionMigrationStatusOutput,
  }));
// Input Schema
export const WatchStoragemigrationV1beta1StorageVersionMigrationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/storagemigration.k8s.io/v1beta1/watch/storageversionmigrations/{name}",
    }),
  );
export type WatchStoragemigrationV1beta1StorageVersionMigrationInput =
  typeof WatchStoragemigrationV1beta1StorageVersionMigrationInput.Type;

// Output Schema
export const WatchStoragemigrationV1beta1StorageVersionMigrationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchStoragemigrationV1beta1StorageVersionMigrationOutput =
  typeof WatchStoragemigrationV1beta1StorageVersionMigrationOutput.Type;

// The operation
/**
 * watch changes to an object of kind StorageVersionMigration. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
 */
export const watchStoragemigrationV1beta1StorageVersionMigration =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchStoragemigrationV1beta1StorageVersionMigrationInput,
    outputSchema: WatchStoragemigrationV1beta1StorageVersionMigrationOutput,
  }));
// Input Schema
export const WatchStoragemigrationV1beta1StorageVersionMigrationListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/storagemigration.k8s.io/v1beta1/watch/storageversionmigrations",
    }),
  );
export type WatchStoragemigrationV1beta1StorageVersionMigrationListInput =
  typeof WatchStoragemigrationV1beta1StorageVersionMigrationListInput.Type;

// Output Schema
export const WatchStoragemigrationV1beta1StorageVersionMigrationListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchStoragemigrationV1beta1StorageVersionMigrationListOutput =
  typeof WatchStoragemigrationV1beta1StorageVersionMigrationListOutput.Type;

// The operation
/**
 * watch individual changes to a list of StorageVersionMigration. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchStoragemigrationV1beta1StorageVersionMigrationList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchStoragemigrationV1beta1StorageVersionMigrationListInput,
    outputSchema: WatchStoragemigrationV1beta1StorageVersionMigrationListOutput,
  }));
