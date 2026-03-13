/**
 * Kubernetes Storage API
 *
 * Generated from the Kubernetes OpenAPI spec.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";

// Input Schema
export const CreateStorageV1CSIDriverInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({ method: "POST", path: "/apis/storage.k8s.io/v1/csidrivers" }),
  );
export type CreateStorageV1CSIDriverInput =
  typeof CreateStorageV1CSIDriverInput.Type;

// Output Schema
export const CreateStorageV1CSIDriverOutput =
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
      attachRequired: Schema.optional(Schema.Boolean),
      fsGroupPolicy: Schema.optional(Schema.String),
      nodeAllocatableUpdatePeriodSeconds: Schema.optional(Schema.Number),
      podInfoOnMount: Schema.optional(Schema.Boolean),
      preventPodSchedulingIfMissing: Schema.optional(Schema.Boolean),
      requiresRepublish: Schema.optional(Schema.Boolean),
      seLinuxMount: Schema.optional(Schema.Boolean),
      serviceAccountTokenInSecrets: Schema.optional(Schema.Boolean),
      storageCapacity: Schema.optional(Schema.Boolean),
      tokenRequests: Schema.optional(
        Schema.Array(
          Schema.Struct({
            audience: Schema.String,
            expirationSeconds: Schema.optional(Schema.Number),
          }),
        ),
      ),
      volumeLifecycleModes: Schema.optional(Schema.Array(Schema.String)),
    }),
  });
export type CreateStorageV1CSIDriverOutput =
  typeof CreateStorageV1CSIDriverOutput.Type;

// The operation
/**
 * create a CSIDriver
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const createStorageV1CSIDriver = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CreateStorageV1CSIDriverInput,
    outputSchema: CreateStorageV1CSIDriverOutput,
  }),
);
// Input Schema
export const CreateStorageV1CSINodeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(T.Http({ method: "POST", path: "/apis/storage.k8s.io/v1/csinodes" }));
export type CreateStorageV1CSINodeInput =
  typeof CreateStorageV1CSINodeInput.Type;

// Output Schema
export const CreateStorageV1CSINodeOutput =
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
      drivers: Schema.Array(
        Schema.Struct({
          allocatable: Schema.optional(
            Schema.Struct({
              count: Schema.optional(Schema.Number),
            }),
          ),
          name: Schema.String,
          nodeID: Schema.String,
          topologyKeys: Schema.optional(Schema.Array(Schema.String)),
        }),
      ),
    }),
  });
export type CreateStorageV1CSINodeOutput =
  typeof CreateStorageV1CSINodeOutput.Type;

// The operation
/**
 * create a CSINode
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const createStorageV1CSINode = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CreateStorageV1CSINodeInput,
    outputSchema: CreateStorageV1CSINodeOutput,
  }),
);
// Input Schema
export const CreateStorageV1NamespacedCSIStorageCapacityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/apis/storage.k8s.io/v1/namespaces/{namespace}/csistoragecapacities",
    }),
  );
export type CreateStorageV1NamespacedCSIStorageCapacityInput =
  typeof CreateStorageV1NamespacedCSIStorageCapacityInput.Type;

// Output Schema
export const CreateStorageV1NamespacedCSIStorageCapacityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    apiVersion: Schema.optional(Schema.String),
    capacity: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
    maximumVolumeSize: Schema.optional(Schema.String),
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
    nodeTopology: Schema.optional(
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
    storageClassName: Schema.String,
  });
export type CreateStorageV1NamespacedCSIStorageCapacityOutput =
  typeof CreateStorageV1NamespacedCSIStorageCapacityOutput.Type;

// The operation
/**
 * create a CSIStorageCapacity
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const createStorageV1NamespacedCSIStorageCapacity =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateStorageV1NamespacedCSIStorageCapacityInput,
    outputSchema: CreateStorageV1NamespacedCSIStorageCapacityOutput,
  }));
// Input Schema
export const CreateStorageV1StorageClassInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({ method: "POST", path: "/apis/storage.k8s.io/v1/storageclasses" }),
  );
export type CreateStorageV1StorageClassInput =
  typeof CreateStorageV1StorageClassInput.Type;

// Output Schema
export const CreateStorageV1StorageClassOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    allowVolumeExpansion: Schema.optional(Schema.Boolean),
    allowedTopologies: Schema.optional(
      Schema.Array(
        Schema.Struct({
          matchLabelExpressions: Schema.optional(
            Schema.Array(
              Schema.Struct({
                key: Schema.String,
                values: Schema.Array(Schema.String),
              }),
            ),
          ),
        }),
      ),
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
    mountOptions: Schema.optional(Schema.Array(Schema.String)),
    parameters: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    provisioner: Schema.String,
    reclaimPolicy: Schema.optional(Schema.String),
    volumeBindingMode: Schema.optional(Schema.String),
  });
export type CreateStorageV1StorageClassOutput =
  typeof CreateStorageV1StorageClassOutput.Type;

// The operation
/**
 * create a StorageClass
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const createStorageV1StorageClass = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CreateStorageV1StorageClassInput,
    outputSchema: CreateStorageV1StorageClassOutput,
  }),
);
// Input Schema
export const CreateStorageV1VolumeAttachmentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/apis/storage.k8s.io/v1/volumeattachments",
    }),
  );
export type CreateStorageV1VolumeAttachmentInput =
  typeof CreateStorageV1VolumeAttachmentInput.Type;

// Output Schema
export const CreateStorageV1VolumeAttachmentOutput =
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
      attacher: Schema.String,
      nodeName: Schema.String,
      source: Schema.Struct({
        inlineVolumeSpec: Schema.optional(
          Schema.Struct({
            accessModes: Schema.optional(Schema.Array(Schema.String)),
            awsElasticBlockStore: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                partition: Schema.optional(Schema.Number),
                readOnly: Schema.optional(Schema.Boolean),
                volumeID: Schema.String,
              }),
            ),
            azureDisk: Schema.optional(
              Schema.Struct({
                cachingMode: Schema.optional(Schema.String),
                diskName: Schema.String,
                diskURI: Schema.String,
                fsType: Schema.optional(Schema.String),
                kind: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
              }),
            ),
            azureFile: Schema.optional(
              Schema.Struct({
                readOnly: Schema.optional(Schema.Boolean),
                secretName: Schema.String,
                secretNamespace: Schema.optional(Schema.String),
                shareName: Schema.String,
              }),
            ),
            capacity: Schema.optional(
              Schema.Record(Schema.String, Schema.String),
            ),
            cephfs: Schema.optional(
              Schema.Struct({
                monitors: Schema.Array(Schema.String),
                path: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                secretFile: Schema.optional(Schema.String),
                secretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                user: Schema.optional(Schema.String),
              }),
            ),
            cinder: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                secretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                volumeID: Schema.String,
              }),
            ),
            claimRef: Schema.optional(
              Schema.Struct({
                apiVersion: Schema.optional(Schema.String),
                fieldPath: Schema.optional(Schema.String),
                kind: Schema.optional(Schema.String),
                name: Schema.optional(Schema.String),
                namespace: Schema.optional(Schema.String),
                resourceVersion: Schema.optional(Schema.String),
                uid: Schema.optional(Schema.String),
              }),
            ),
            csi: Schema.optional(
              Schema.Struct({
                controllerExpandSecretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                controllerPublishSecretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                driver: Schema.String,
                fsType: Schema.optional(Schema.String),
                nodeExpandSecretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                nodePublishSecretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                nodeStageSecretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                readOnly: Schema.optional(Schema.Boolean),
                volumeAttributes: Schema.optional(
                  Schema.Record(Schema.String, Schema.String),
                ),
                volumeHandle: Schema.String,
              }),
            ),
            fc: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                lun: Schema.optional(Schema.Number),
                readOnly: Schema.optional(Schema.Boolean),
                targetWWNs: Schema.optional(Schema.Array(Schema.String)),
                wwids: Schema.optional(Schema.Array(Schema.String)),
              }),
            ),
            flexVolume: Schema.optional(
              Schema.Struct({
                driver: Schema.String,
                fsType: Schema.optional(Schema.String),
                options: Schema.optional(
                  Schema.Record(Schema.String, Schema.String),
                ),
                readOnly: Schema.optional(Schema.Boolean),
                secretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
              }),
            ),
            flocker: Schema.optional(
              Schema.Struct({
                datasetName: Schema.optional(Schema.String),
                datasetUUID: Schema.optional(Schema.String),
              }),
            ),
            gcePersistentDisk: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                partition: Schema.optional(Schema.Number),
                pdName: Schema.String,
                readOnly: Schema.optional(Schema.Boolean),
              }),
            ),
            glusterfs: Schema.optional(
              Schema.Struct({
                endpoints: Schema.String,
                endpointsNamespace: Schema.optional(Schema.String),
                path: Schema.String,
                readOnly: Schema.optional(Schema.Boolean),
              }),
            ),
            hostPath: Schema.optional(
              Schema.Struct({
                path: Schema.String,
                type: Schema.optional(Schema.String),
              }),
            ),
            iscsi: Schema.optional(
              Schema.Struct({
                chapAuthDiscovery: Schema.optional(Schema.Boolean),
                chapAuthSession: Schema.optional(Schema.Boolean),
                fsType: Schema.optional(Schema.String),
                initiatorName: Schema.optional(Schema.String),
                iqn: Schema.String,
                iscsiInterface: Schema.optional(Schema.String),
                lun: Schema.Number,
                portals: Schema.optional(Schema.Array(Schema.String)),
                readOnly: Schema.optional(Schema.Boolean),
                secretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                targetPortal: Schema.String,
              }),
            ),
            local: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                path: Schema.String,
              }),
            ),
            mountOptions: Schema.optional(Schema.Array(Schema.String)),
            nfs: Schema.optional(
              Schema.Struct({
                path: Schema.String,
                readOnly: Schema.optional(Schema.Boolean),
                server: Schema.String,
              }),
            ),
            nodeAffinity: Schema.optional(
              Schema.Struct({
                required: Schema.optional(
                  Schema.Struct({
                    nodeSelectorTerms: Schema.Array(
                      Schema.Struct({
                        matchExpressions: Schema.optional(
                          Schema.Array(
                            Schema.Struct({
                              key: Schema.String,
                              operator: Schema.String,
                              values: Schema.optional(
                                Schema.Array(Schema.String),
                              ),
                            }),
                          ),
                        ),
                        matchFields: Schema.optional(
                          Schema.Array(
                            Schema.Struct({
                              key: Schema.String,
                              operator: Schema.String,
                              values: Schema.optional(
                                Schema.Array(Schema.String),
                              ),
                            }),
                          ),
                        ),
                      }),
                    ),
                  }),
                ),
              }),
            ),
            persistentVolumeReclaimPolicy: Schema.optional(Schema.String),
            photonPersistentDisk: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                pdID: Schema.String,
              }),
            ),
            portworxVolume: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                volumeID: Schema.String,
              }),
            ),
            quobyte: Schema.optional(
              Schema.Struct({
                group: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                registry: Schema.String,
                tenant: Schema.optional(Schema.String),
                user: Schema.optional(Schema.String),
                volume: Schema.String,
              }),
            ),
            rbd: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                image: Schema.String,
                keyring: Schema.optional(Schema.String),
                monitors: Schema.Array(Schema.String),
                pool: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                secretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                user: Schema.optional(Schema.String),
              }),
            ),
            scaleIO: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                gateway: Schema.String,
                protectionDomain: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                secretRef: Schema.Struct({
                  name: Schema.optional(Schema.String),
                  namespace: Schema.optional(Schema.String),
                }),
                sslEnabled: Schema.optional(Schema.Boolean),
                storageMode: Schema.optional(Schema.String),
                storagePool: Schema.optional(Schema.String),
                system: Schema.String,
                volumeName: Schema.optional(Schema.String),
              }),
            ),
            storageClassName: Schema.optional(Schema.String),
            storageos: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                secretRef: Schema.optional(
                  Schema.Struct({
                    apiVersion: Schema.optional(Schema.String),
                    fieldPath: Schema.optional(Schema.String),
                    kind: Schema.optional(Schema.String),
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                    resourceVersion: Schema.optional(Schema.String),
                    uid: Schema.optional(Schema.String),
                  }),
                ),
                volumeName: Schema.optional(Schema.String),
                volumeNamespace: Schema.optional(Schema.String),
              }),
            ),
            volumeAttributesClassName: Schema.optional(Schema.String),
            volumeMode: Schema.optional(Schema.String),
            vsphereVolume: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                storagePolicyID: Schema.optional(Schema.String),
                storagePolicyName: Schema.optional(Schema.String),
                volumePath: Schema.String,
              }),
            ),
          }),
        ),
        persistentVolumeName: Schema.optional(Schema.String),
      }),
    }),
    status: Schema.optional(
      Schema.Struct({
        attachError: Schema.optional(
          Schema.Struct({
            errorCode: Schema.optional(Schema.Number),
            message: Schema.optional(Schema.String),
            time: Schema.optional(Schema.String),
          }),
        ),
        attached: Schema.Boolean,
        attachmentMetadata: Schema.optional(
          Schema.Record(Schema.String, Schema.String),
        ),
        detachError: Schema.optional(
          Schema.Struct({
            errorCode: Schema.optional(Schema.Number),
            message: Schema.optional(Schema.String),
            time: Schema.optional(Schema.String),
          }),
        ),
      }),
    ),
  });
export type CreateStorageV1VolumeAttachmentOutput =
  typeof CreateStorageV1VolumeAttachmentOutput.Type;

// The operation
/**
 * create a VolumeAttachment
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const createStorageV1VolumeAttachment =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateStorageV1VolumeAttachmentInput,
    outputSchema: CreateStorageV1VolumeAttachmentOutput,
  }));
// Input Schema
export const CreateStorageV1VolumeAttributesClassInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/apis/storage.k8s.io/v1/volumeattributesclasses",
    }),
  );
export type CreateStorageV1VolumeAttributesClassInput =
  typeof CreateStorageV1VolumeAttributesClassInput.Type;

// Output Schema
export const CreateStorageV1VolumeAttributesClassOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    apiVersion: Schema.optional(Schema.String),
    driverName: Schema.String,
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
    parameters: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type CreateStorageV1VolumeAttributesClassOutput =
  typeof CreateStorageV1VolumeAttributesClassOutput.Type;

// The operation
/**
 * create a VolumeAttributesClass
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const createStorageV1VolumeAttributesClass =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateStorageV1VolumeAttributesClassInput,
    outputSchema: CreateStorageV1VolumeAttributesClassOutput,
  }));
// Input Schema
export const CreateStorageV1beta1VolumeAttributesClassInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/apis/storage.k8s.io/v1beta1/volumeattributesclasses",
    }),
  );
export type CreateStorageV1beta1VolumeAttributesClassInput =
  typeof CreateStorageV1beta1VolumeAttributesClassInput.Type;

// Output Schema
export const CreateStorageV1beta1VolumeAttributesClassOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    apiVersion: Schema.optional(Schema.String),
    driverName: Schema.String,
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
    parameters: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type CreateStorageV1beta1VolumeAttributesClassOutput =
  typeof CreateStorageV1beta1VolumeAttributesClassOutput.Type;

// The operation
/**
 * create a VolumeAttributesClass
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const createStorageV1beta1VolumeAttributesClass =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateStorageV1beta1VolumeAttributesClassInput,
    outputSchema: CreateStorageV1beta1VolumeAttributesClassOutput,
  }));
// Input Schema
export const DeleteStorageV1CSIDriverInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/storage.k8s.io/v1/csidrivers/{name}",
    }),
  );
export type DeleteStorageV1CSIDriverInput =
  typeof DeleteStorageV1CSIDriverInput.Type;

// Output Schema
export const DeleteStorageV1CSIDriverOutput =
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
      attachRequired: Schema.optional(Schema.Boolean),
      fsGroupPolicy: Schema.optional(Schema.String),
      nodeAllocatableUpdatePeriodSeconds: Schema.optional(Schema.Number),
      podInfoOnMount: Schema.optional(Schema.Boolean),
      preventPodSchedulingIfMissing: Schema.optional(Schema.Boolean),
      requiresRepublish: Schema.optional(Schema.Boolean),
      seLinuxMount: Schema.optional(Schema.Boolean),
      serviceAccountTokenInSecrets: Schema.optional(Schema.Boolean),
      storageCapacity: Schema.optional(Schema.Boolean),
      tokenRequests: Schema.optional(
        Schema.Array(
          Schema.Struct({
            audience: Schema.String,
            expirationSeconds: Schema.optional(Schema.Number),
          }),
        ),
      ),
      volumeLifecycleModes: Schema.optional(Schema.Array(Schema.String)),
    }),
  });
export type DeleteStorageV1CSIDriverOutput =
  typeof DeleteStorageV1CSIDriverOutput.Type;

// The operation
/**
 * delete a CSIDriver
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteStorageV1CSIDriver = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeleteStorageV1CSIDriverInput,
    outputSchema: DeleteStorageV1CSIDriverOutput,
  }),
);
// Input Schema
export const DeleteStorageV1CSINodeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/storage.k8s.io/v1/csinodes/{name}",
    }),
  );
export type DeleteStorageV1CSINodeInput =
  typeof DeleteStorageV1CSINodeInput.Type;

// Output Schema
export const DeleteStorageV1CSINodeOutput =
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
      drivers: Schema.Array(
        Schema.Struct({
          allocatable: Schema.optional(
            Schema.Struct({
              count: Schema.optional(Schema.Number),
            }),
          ),
          name: Schema.String,
          nodeID: Schema.String,
          topologyKeys: Schema.optional(Schema.Array(Schema.String)),
        }),
      ),
    }),
  });
export type DeleteStorageV1CSINodeOutput =
  typeof DeleteStorageV1CSINodeOutput.Type;

// The operation
/**
 * delete a CSINode
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteStorageV1CSINode = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeleteStorageV1CSINodeInput,
    outputSchema: DeleteStorageV1CSINodeOutput,
  }),
);
// Input Schema
export const DeleteStorageV1CollectionCSIDriverInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({ method: "DELETE", path: "/apis/storage.k8s.io/v1/csidrivers" }),
  );
export type DeleteStorageV1CollectionCSIDriverInput =
  typeof DeleteStorageV1CollectionCSIDriverInput.Type;

// Output Schema
export const DeleteStorageV1CollectionCSIDriverOutput =
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
export type DeleteStorageV1CollectionCSIDriverOutput =
  typeof DeleteStorageV1CollectionCSIDriverOutput.Type;

// The operation
/**
 * delete collection of CSIDriver
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteStorageV1CollectionCSIDriver =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteStorageV1CollectionCSIDriverInput,
    outputSchema: DeleteStorageV1CollectionCSIDriverOutput,
  }));
// Input Schema
export const DeleteStorageV1CollectionCSINodeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({ method: "DELETE", path: "/apis/storage.k8s.io/v1/csinodes" }),
  );
export type DeleteStorageV1CollectionCSINodeInput =
  typeof DeleteStorageV1CollectionCSINodeInput.Type;

// Output Schema
export const DeleteStorageV1CollectionCSINodeOutput =
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
export type DeleteStorageV1CollectionCSINodeOutput =
  typeof DeleteStorageV1CollectionCSINodeOutput.Type;

// The operation
/**
 * delete collection of CSINode
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteStorageV1CollectionCSINode =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteStorageV1CollectionCSINodeInput,
    outputSchema: DeleteStorageV1CollectionCSINodeOutput,
  }));
// Input Schema
export const DeleteStorageV1CollectionNamespacedCSIStorageCapacityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/storage.k8s.io/v1/namespaces/{namespace}/csistoragecapacities",
    }),
  );
export type DeleteStorageV1CollectionNamespacedCSIStorageCapacityInput =
  typeof DeleteStorageV1CollectionNamespacedCSIStorageCapacityInput.Type;

// Output Schema
export const DeleteStorageV1CollectionNamespacedCSIStorageCapacityOutput =
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
export type DeleteStorageV1CollectionNamespacedCSIStorageCapacityOutput =
  typeof DeleteStorageV1CollectionNamespacedCSIStorageCapacityOutput.Type;

// The operation
/**
 * delete collection of CSIStorageCapacity
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteStorageV1CollectionNamespacedCSIStorageCapacity =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteStorageV1CollectionNamespacedCSIStorageCapacityInput,
    outputSchema: DeleteStorageV1CollectionNamespacedCSIStorageCapacityOutput,
  }));
// Input Schema
export const DeleteStorageV1CollectionStorageClassInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/storage.k8s.io/v1/storageclasses",
    }),
  );
export type DeleteStorageV1CollectionStorageClassInput =
  typeof DeleteStorageV1CollectionStorageClassInput.Type;

// Output Schema
export const DeleteStorageV1CollectionStorageClassOutput =
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
export type DeleteStorageV1CollectionStorageClassOutput =
  typeof DeleteStorageV1CollectionStorageClassOutput.Type;

// The operation
/**
 * delete collection of StorageClass
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteStorageV1CollectionStorageClass =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteStorageV1CollectionStorageClassInput,
    outputSchema: DeleteStorageV1CollectionStorageClassOutput,
  }));
// Input Schema
export const DeleteStorageV1CollectionVolumeAttachmentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/storage.k8s.io/v1/volumeattachments",
    }),
  );
export type DeleteStorageV1CollectionVolumeAttachmentInput =
  typeof DeleteStorageV1CollectionVolumeAttachmentInput.Type;

// Output Schema
export const DeleteStorageV1CollectionVolumeAttachmentOutput =
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
export type DeleteStorageV1CollectionVolumeAttachmentOutput =
  typeof DeleteStorageV1CollectionVolumeAttachmentOutput.Type;

// The operation
/**
 * delete collection of VolumeAttachment
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteStorageV1CollectionVolumeAttachment =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteStorageV1CollectionVolumeAttachmentInput,
    outputSchema: DeleteStorageV1CollectionVolumeAttachmentOutput,
  }));
// Input Schema
export const DeleteStorageV1CollectionVolumeAttributesClassInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/storage.k8s.io/v1/volumeattributesclasses",
    }),
  );
export type DeleteStorageV1CollectionVolumeAttributesClassInput =
  typeof DeleteStorageV1CollectionVolumeAttributesClassInput.Type;

// Output Schema
export const DeleteStorageV1CollectionVolumeAttributesClassOutput =
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
export type DeleteStorageV1CollectionVolumeAttributesClassOutput =
  typeof DeleteStorageV1CollectionVolumeAttributesClassOutput.Type;

// The operation
/**
 * delete collection of VolumeAttributesClass
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteStorageV1CollectionVolumeAttributesClass =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteStorageV1CollectionVolumeAttributesClassInput,
    outputSchema: DeleteStorageV1CollectionVolumeAttributesClassOutput,
  }));
// Input Schema
export const DeleteStorageV1NamespacedCSIStorageCapacityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/storage.k8s.io/v1/namespaces/{namespace}/csistoragecapacities/{name}",
    }),
  );
export type DeleteStorageV1NamespacedCSIStorageCapacityInput =
  typeof DeleteStorageV1NamespacedCSIStorageCapacityInput.Type;

// Output Schema
export const DeleteStorageV1NamespacedCSIStorageCapacityOutput =
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
export type DeleteStorageV1NamespacedCSIStorageCapacityOutput =
  typeof DeleteStorageV1NamespacedCSIStorageCapacityOutput.Type;

// The operation
/**
 * delete a CSIStorageCapacity
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteStorageV1NamespacedCSIStorageCapacity =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteStorageV1NamespacedCSIStorageCapacityInput,
    outputSchema: DeleteStorageV1NamespacedCSIStorageCapacityOutput,
  }));
// Input Schema
export const DeleteStorageV1StorageClassInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/storage.k8s.io/v1/storageclasses/{name}",
    }),
  );
export type DeleteStorageV1StorageClassInput =
  typeof DeleteStorageV1StorageClassInput.Type;

// Output Schema
export const DeleteStorageV1StorageClassOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    allowVolumeExpansion: Schema.optional(Schema.Boolean),
    allowedTopologies: Schema.optional(
      Schema.Array(
        Schema.Struct({
          matchLabelExpressions: Schema.optional(
            Schema.Array(
              Schema.Struct({
                key: Schema.String,
                values: Schema.Array(Schema.String),
              }),
            ),
          ),
        }),
      ),
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
    mountOptions: Schema.optional(Schema.Array(Schema.String)),
    parameters: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    provisioner: Schema.String,
    reclaimPolicy: Schema.optional(Schema.String),
    volumeBindingMode: Schema.optional(Schema.String),
  });
export type DeleteStorageV1StorageClassOutput =
  typeof DeleteStorageV1StorageClassOutput.Type;

// The operation
/**
 * delete a StorageClass
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteStorageV1StorageClass = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeleteStorageV1StorageClassInput,
    outputSchema: DeleteStorageV1StorageClassOutput,
  }),
);
// Input Schema
export const DeleteStorageV1VolumeAttachmentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/storage.k8s.io/v1/volumeattachments/{name}",
    }),
  );
export type DeleteStorageV1VolumeAttachmentInput =
  typeof DeleteStorageV1VolumeAttachmentInput.Type;

// Output Schema
export const DeleteStorageV1VolumeAttachmentOutput =
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
      attacher: Schema.String,
      nodeName: Schema.String,
      source: Schema.Struct({
        inlineVolumeSpec: Schema.optional(
          Schema.Struct({
            accessModes: Schema.optional(Schema.Array(Schema.String)),
            awsElasticBlockStore: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                partition: Schema.optional(Schema.Number),
                readOnly: Schema.optional(Schema.Boolean),
                volumeID: Schema.String,
              }),
            ),
            azureDisk: Schema.optional(
              Schema.Struct({
                cachingMode: Schema.optional(Schema.String),
                diskName: Schema.String,
                diskURI: Schema.String,
                fsType: Schema.optional(Schema.String),
                kind: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
              }),
            ),
            azureFile: Schema.optional(
              Schema.Struct({
                readOnly: Schema.optional(Schema.Boolean),
                secretName: Schema.String,
                secretNamespace: Schema.optional(Schema.String),
                shareName: Schema.String,
              }),
            ),
            capacity: Schema.optional(
              Schema.Record(Schema.String, Schema.String),
            ),
            cephfs: Schema.optional(
              Schema.Struct({
                monitors: Schema.Array(Schema.String),
                path: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                secretFile: Schema.optional(Schema.String),
                secretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                user: Schema.optional(Schema.String),
              }),
            ),
            cinder: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                secretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                volumeID: Schema.String,
              }),
            ),
            claimRef: Schema.optional(
              Schema.Struct({
                apiVersion: Schema.optional(Schema.String),
                fieldPath: Schema.optional(Schema.String),
                kind: Schema.optional(Schema.String),
                name: Schema.optional(Schema.String),
                namespace: Schema.optional(Schema.String),
                resourceVersion: Schema.optional(Schema.String),
                uid: Schema.optional(Schema.String),
              }),
            ),
            csi: Schema.optional(
              Schema.Struct({
                controllerExpandSecretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                controllerPublishSecretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                driver: Schema.String,
                fsType: Schema.optional(Schema.String),
                nodeExpandSecretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                nodePublishSecretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                nodeStageSecretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                readOnly: Schema.optional(Schema.Boolean),
                volumeAttributes: Schema.optional(
                  Schema.Record(Schema.String, Schema.String),
                ),
                volumeHandle: Schema.String,
              }),
            ),
            fc: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                lun: Schema.optional(Schema.Number),
                readOnly: Schema.optional(Schema.Boolean),
                targetWWNs: Schema.optional(Schema.Array(Schema.String)),
                wwids: Schema.optional(Schema.Array(Schema.String)),
              }),
            ),
            flexVolume: Schema.optional(
              Schema.Struct({
                driver: Schema.String,
                fsType: Schema.optional(Schema.String),
                options: Schema.optional(
                  Schema.Record(Schema.String, Schema.String),
                ),
                readOnly: Schema.optional(Schema.Boolean),
                secretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
              }),
            ),
            flocker: Schema.optional(
              Schema.Struct({
                datasetName: Schema.optional(Schema.String),
                datasetUUID: Schema.optional(Schema.String),
              }),
            ),
            gcePersistentDisk: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                partition: Schema.optional(Schema.Number),
                pdName: Schema.String,
                readOnly: Schema.optional(Schema.Boolean),
              }),
            ),
            glusterfs: Schema.optional(
              Schema.Struct({
                endpoints: Schema.String,
                endpointsNamespace: Schema.optional(Schema.String),
                path: Schema.String,
                readOnly: Schema.optional(Schema.Boolean),
              }),
            ),
            hostPath: Schema.optional(
              Schema.Struct({
                path: Schema.String,
                type: Schema.optional(Schema.String),
              }),
            ),
            iscsi: Schema.optional(
              Schema.Struct({
                chapAuthDiscovery: Schema.optional(Schema.Boolean),
                chapAuthSession: Schema.optional(Schema.Boolean),
                fsType: Schema.optional(Schema.String),
                initiatorName: Schema.optional(Schema.String),
                iqn: Schema.String,
                iscsiInterface: Schema.optional(Schema.String),
                lun: Schema.Number,
                portals: Schema.optional(Schema.Array(Schema.String)),
                readOnly: Schema.optional(Schema.Boolean),
                secretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                targetPortal: Schema.String,
              }),
            ),
            local: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                path: Schema.String,
              }),
            ),
            mountOptions: Schema.optional(Schema.Array(Schema.String)),
            nfs: Schema.optional(
              Schema.Struct({
                path: Schema.String,
                readOnly: Schema.optional(Schema.Boolean),
                server: Schema.String,
              }),
            ),
            nodeAffinity: Schema.optional(
              Schema.Struct({
                required: Schema.optional(
                  Schema.Struct({
                    nodeSelectorTerms: Schema.Array(
                      Schema.Struct({
                        matchExpressions: Schema.optional(
                          Schema.Array(
                            Schema.Struct({
                              key: Schema.String,
                              operator: Schema.String,
                              values: Schema.optional(
                                Schema.Array(Schema.String),
                              ),
                            }),
                          ),
                        ),
                        matchFields: Schema.optional(
                          Schema.Array(
                            Schema.Struct({
                              key: Schema.String,
                              operator: Schema.String,
                              values: Schema.optional(
                                Schema.Array(Schema.String),
                              ),
                            }),
                          ),
                        ),
                      }),
                    ),
                  }),
                ),
              }),
            ),
            persistentVolumeReclaimPolicy: Schema.optional(Schema.String),
            photonPersistentDisk: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                pdID: Schema.String,
              }),
            ),
            portworxVolume: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                volumeID: Schema.String,
              }),
            ),
            quobyte: Schema.optional(
              Schema.Struct({
                group: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                registry: Schema.String,
                tenant: Schema.optional(Schema.String),
                user: Schema.optional(Schema.String),
                volume: Schema.String,
              }),
            ),
            rbd: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                image: Schema.String,
                keyring: Schema.optional(Schema.String),
                monitors: Schema.Array(Schema.String),
                pool: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                secretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                user: Schema.optional(Schema.String),
              }),
            ),
            scaleIO: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                gateway: Schema.String,
                protectionDomain: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                secretRef: Schema.Struct({
                  name: Schema.optional(Schema.String),
                  namespace: Schema.optional(Schema.String),
                }),
                sslEnabled: Schema.optional(Schema.Boolean),
                storageMode: Schema.optional(Schema.String),
                storagePool: Schema.optional(Schema.String),
                system: Schema.String,
                volumeName: Schema.optional(Schema.String),
              }),
            ),
            storageClassName: Schema.optional(Schema.String),
            storageos: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                secretRef: Schema.optional(
                  Schema.Struct({
                    apiVersion: Schema.optional(Schema.String),
                    fieldPath: Schema.optional(Schema.String),
                    kind: Schema.optional(Schema.String),
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                    resourceVersion: Schema.optional(Schema.String),
                    uid: Schema.optional(Schema.String),
                  }),
                ),
                volumeName: Schema.optional(Schema.String),
                volumeNamespace: Schema.optional(Schema.String),
              }),
            ),
            volumeAttributesClassName: Schema.optional(Schema.String),
            volumeMode: Schema.optional(Schema.String),
            vsphereVolume: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                storagePolicyID: Schema.optional(Schema.String),
                storagePolicyName: Schema.optional(Schema.String),
                volumePath: Schema.String,
              }),
            ),
          }),
        ),
        persistentVolumeName: Schema.optional(Schema.String),
      }),
    }),
    status: Schema.optional(
      Schema.Struct({
        attachError: Schema.optional(
          Schema.Struct({
            errorCode: Schema.optional(Schema.Number),
            message: Schema.optional(Schema.String),
            time: Schema.optional(Schema.String),
          }),
        ),
        attached: Schema.Boolean,
        attachmentMetadata: Schema.optional(
          Schema.Record(Schema.String, Schema.String),
        ),
        detachError: Schema.optional(
          Schema.Struct({
            errorCode: Schema.optional(Schema.Number),
            message: Schema.optional(Schema.String),
            time: Schema.optional(Schema.String),
          }),
        ),
      }),
    ),
  });
export type DeleteStorageV1VolumeAttachmentOutput =
  typeof DeleteStorageV1VolumeAttachmentOutput.Type;

// The operation
/**
 * delete a VolumeAttachment
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteStorageV1VolumeAttachment =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteStorageV1VolumeAttachmentInput,
    outputSchema: DeleteStorageV1VolumeAttachmentOutput,
  }));
// Input Schema
export const DeleteStorageV1VolumeAttributesClassInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/storage.k8s.io/v1/volumeattributesclasses/{name}",
    }),
  );
export type DeleteStorageV1VolumeAttributesClassInput =
  typeof DeleteStorageV1VolumeAttributesClassInput.Type;

// Output Schema
export const DeleteStorageV1VolumeAttributesClassOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    apiVersion: Schema.optional(Schema.String),
    driverName: Schema.String,
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
    parameters: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type DeleteStorageV1VolumeAttributesClassOutput =
  typeof DeleteStorageV1VolumeAttributesClassOutput.Type;

// The operation
/**
 * delete a VolumeAttributesClass
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteStorageV1VolumeAttributesClass =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteStorageV1VolumeAttributesClassInput,
    outputSchema: DeleteStorageV1VolumeAttributesClassOutput,
  }));
// Input Schema
export const DeleteStorageV1beta1CollectionVolumeAttributesClassInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/storage.k8s.io/v1beta1/volumeattributesclasses",
    }),
  );
export type DeleteStorageV1beta1CollectionVolumeAttributesClassInput =
  typeof DeleteStorageV1beta1CollectionVolumeAttributesClassInput.Type;

// Output Schema
export const DeleteStorageV1beta1CollectionVolumeAttributesClassOutput =
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
export type DeleteStorageV1beta1CollectionVolumeAttributesClassOutput =
  typeof DeleteStorageV1beta1CollectionVolumeAttributesClassOutput.Type;

// The operation
/**
 * delete collection of VolumeAttributesClass
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteStorageV1beta1CollectionVolumeAttributesClass =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteStorageV1beta1CollectionVolumeAttributesClassInput,
    outputSchema: DeleteStorageV1beta1CollectionVolumeAttributesClassOutput,
  }));
// Input Schema
export const DeleteStorageV1beta1VolumeAttributesClassInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/storage.k8s.io/v1beta1/volumeattributesclasses/{name}",
    }),
  );
export type DeleteStorageV1beta1VolumeAttributesClassInput =
  typeof DeleteStorageV1beta1VolumeAttributesClassInput.Type;

// Output Schema
export const DeleteStorageV1beta1VolumeAttributesClassOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    apiVersion: Schema.optional(Schema.String),
    driverName: Schema.String,
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
    parameters: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type DeleteStorageV1beta1VolumeAttributesClassOutput =
  typeof DeleteStorageV1beta1VolumeAttributesClassOutput.Type;

// The operation
/**
 * delete a VolumeAttributesClass
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteStorageV1beta1VolumeAttributesClass =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteStorageV1beta1VolumeAttributesClassInput,
    outputSchema: DeleteStorageV1beta1VolumeAttributesClassOutput,
  }));
// Input Schema
export const GetStorageAPIGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/apis/storage.k8s.io/" }),
  );
export type GetStorageAPIGroupInput = typeof GetStorageAPIGroupInput.Type;

// Output Schema
export const GetStorageAPIGroupOutput =
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
export type GetStorageAPIGroupOutput = typeof GetStorageAPIGroupOutput.Type;

// The operation
/**
 * get information of a group
 */
export const getStorageAPIGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetStorageAPIGroupInput,
  outputSchema: GetStorageAPIGroupOutput,
}));
// Input Schema
export const GetStorageV1APIResourcesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/apis/storage.k8s.io/v1/" }),
  );
export type GetStorageV1APIResourcesInput =
  typeof GetStorageV1APIResourcesInput.Type;

// Output Schema
export const GetStorageV1APIResourcesOutput =
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
export type GetStorageV1APIResourcesOutput =
  typeof GetStorageV1APIResourcesOutput.Type;

// The operation
/**
 * get available resources
 */
export const getStorageV1APIResources = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetStorageV1APIResourcesInput,
    outputSchema: GetStorageV1APIResourcesOutput,
  }),
);
// Input Schema
export const GetStorageV1beta1APIResourcesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/apis/storage.k8s.io/v1beta1/" }),
  );
export type GetStorageV1beta1APIResourcesInput =
  typeof GetStorageV1beta1APIResourcesInput.Type;

// Output Schema
export const GetStorageV1beta1APIResourcesOutput =
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
export type GetStorageV1beta1APIResourcesOutput =
  typeof GetStorageV1beta1APIResourcesOutput.Type;

// The operation
/**
 * get available resources
 */
export const getStorageV1beta1APIResources =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetStorageV1beta1APIResourcesInput,
    outputSchema: GetStorageV1beta1APIResourcesOutput,
  }));
// Input Schema
export const ListStorageV1CSIDriverInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/apis/storage.k8s.io/v1/csidrivers" }),
  );
export type ListStorageV1CSIDriverInput =
  typeof ListStorageV1CSIDriverInput.Type;

// Output Schema
export const ListStorageV1CSIDriverOutput =
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
          attachRequired: Schema.optional(Schema.Boolean),
          fsGroupPolicy: Schema.optional(Schema.String),
          nodeAllocatableUpdatePeriodSeconds: Schema.optional(Schema.Number),
          podInfoOnMount: Schema.optional(Schema.Boolean),
          preventPodSchedulingIfMissing: Schema.optional(Schema.Boolean),
          requiresRepublish: Schema.optional(Schema.Boolean),
          seLinuxMount: Schema.optional(Schema.Boolean),
          serviceAccountTokenInSecrets: Schema.optional(Schema.Boolean),
          storageCapacity: Schema.optional(Schema.Boolean),
          tokenRequests: Schema.optional(
            Schema.Array(
              Schema.Struct({
                audience: Schema.String,
                expirationSeconds: Schema.optional(Schema.Number),
              }),
            ),
          ),
          volumeLifecycleModes: Schema.optional(Schema.Array(Schema.String)),
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
export type ListStorageV1CSIDriverOutput =
  typeof ListStorageV1CSIDriverOutput.Type;

// The operation
/**
 * list or watch objects of kind CSIDriver
 */
export const listStorageV1CSIDriver = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ListStorageV1CSIDriverInput,
    outputSchema: ListStorageV1CSIDriverOutput,
  }),
);
// Input Schema
export const ListStorageV1CSINodeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/apis/storage.k8s.io/v1/csinodes" }),
  );
export type ListStorageV1CSINodeInput = typeof ListStorageV1CSINodeInput.Type;

// Output Schema
export const ListStorageV1CSINodeOutput =
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
          drivers: Schema.Array(
            Schema.Struct({
              allocatable: Schema.optional(
                Schema.Struct({
                  count: Schema.optional(Schema.Number),
                }),
              ),
              name: Schema.String,
              nodeID: Schema.String,
              topologyKeys: Schema.optional(Schema.Array(Schema.String)),
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
export type ListStorageV1CSINodeOutput = typeof ListStorageV1CSINodeOutput.Type;

// The operation
/**
 * list or watch objects of kind CSINode
 */
export const listStorageV1CSINode = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ListStorageV1CSINodeInput,
    outputSchema: ListStorageV1CSINodeOutput,
  }),
);
// Input Schema
export const ListStorageV1CSIStorageCapacityForAllNamespacesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/storage.k8s.io/v1/csistoragecapacities",
    }),
  );
export type ListStorageV1CSIStorageCapacityForAllNamespacesInput =
  typeof ListStorageV1CSIStorageCapacityForAllNamespacesInput.Type;

// Output Schema
export const ListStorageV1CSIStorageCapacityForAllNamespacesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    apiVersion: Schema.optional(Schema.String),
    items: Schema.Array(
      Schema.Struct({
        apiVersion: Schema.optional(Schema.String),
        capacity: Schema.optional(Schema.String),
        kind: Schema.optional(Schema.String),
        maximumVolumeSize: Schema.optional(Schema.String),
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
        nodeTopology: Schema.optional(
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
        storageClassName: Schema.String,
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
export type ListStorageV1CSIStorageCapacityForAllNamespacesOutput =
  typeof ListStorageV1CSIStorageCapacityForAllNamespacesOutput.Type;

// The operation
/**
 * list or watch objects of kind CSIStorageCapacity
 */
export const listStorageV1CSIStorageCapacityForAllNamespaces =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListStorageV1CSIStorageCapacityForAllNamespacesInput,
    outputSchema: ListStorageV1CSIStorageCapacityForAllNamespacesOutput,
  }));
// Input Schema
export const ListStorageV1NamespacedCSIStorageCapacityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/storage.k8s.io/v1/namespaces/{namespace}/csistoragecapacities",
    }),
  );
export type ListStorageV1NamespacedCSIStorageCapacityInput =
  typeof ListStorageV1NamespacedCSIStorageCapacityInput.Type;

// Output Schema
export const ListStorageV1NamespacedCSIStorageCapacityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    apiVersion: Schema.optional(Schema.String),
    items: Schema.Array(
      Schema.Struct({
        apiVersion: Schema.optional(Schema.String),
        capacity: Schema.optional(Schema.String),
        kind: Schema.optional(Schema.String),
        maximumVolumeSize: Schema.optional(Schema.String),
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
        nodeTopology: Schema.optional(
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
        storageClassName: Schema.String,
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
export type ListStorageV1NamespacedCSIStorageCapacityOutput =
  typeof ListStorageV1NamespacedCSIStorageCapacityOutput.Type;

// The operation
/**
 * list or watch objects of kind CSIStorageCapacity
 */
export const listStorageV1NamespacedCSIStorageCapacity =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListStorageV1NamespacedCSIStorageCapacityInput,
    outputSchema: ListStorageV1NamespacedCSIStorageCapacityOutput,
  }));
// Input Schema
export const ListStorageV1StorageClassInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/apis/storage.k8s.io/v1/storageclasses" }),
  );
export type ListStorageV1StorageClassInput =
  typeof ListStorageV1StorageClassInput.Type;

// Output Schema
export const ListStorageV1StorageClassOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    apiVersion: Schema.optional(Schema.String),
    items: Schema.Array(
      Schema.Struct({
        allowVolumeExpansion: Schema.optional(Schema.Boolean),
        allowedTopologies: Schema.optional(
          Schema.Array(
            Schema.Struct({
              matchLabelExpressions: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    key: Schema.String,
                    values: Schema.Array(Schema.String),
                  }),
                ),
              ),
            }),
          ),
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
        mountOptions: Schema.optional(Schema.Array(Schema.String)),
        parameters: Schema.optional(
          Schema.Record(Schema.String, Schema.String),
        ),
        provisioner: Schema.String,
        reclaimPolicy: Schema.optional(Schema.String),
        volumeBindingMode: Schema.optional(Schema.String),
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
export type ListStorageV1StorageClassOutput =
  typeof ListStorageV1StorageClassOutput.Type;

// The operation
/**
 * list or watch objects of kind StorageClass
 */
export const listStorageV1StorageClass = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ListStorageV1StorageClassInput,
    outputSchema: ListStorageV1StorageClassOutput,
  }),
);
// Input Schema
export const ListStorageV1VolumeAttachmentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/storage.k8s.io/v1/volumeattachments",
    }),
  );
export type ListStorageV1VolumeAttachmentInput =
  typeof ListStorageV1VolumeAttachmentInput.Type;

// Output Schema
export const ListStorageV1VolumeAttachmentOutput =
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
          attacher: Schema.String,
          nodeName: Schema.String,
          source: Schema.Struct({
            inlineVolumeSpec: Schema.optional(
              Schema.Struct({
                accessModes: Schema.optional(Schema.Array(Schema.String)),
                awsElasticBlockStore: Schema.optional(
                  Schema.Struct({
                    fsType: Schema.optional(Schema.String),
                    partition: Schema.optional(Schema.Number),
                    readOnly: Schema.optional(Schema.Boolean),
                    volumeID: Schema.String,
                  }),
                ),
                azureDisk: Schema.optional(
                  Schema.Struct({
                    cachingMode: Schema.optional(Schema.String),
                    diskName: Schema.String,
                    diskURI: Schema.String,
                    fsType: Schema.optional(Schema.String),
                    kind: Schema.optional(Schema.String),
                    readOnly: Schema.optional(Schema.Boolean),
                  }),
                ),
                azureFile: Schema.optional(
                  Schema.Struct({
                    readOnly: Schema.optional(Schema.Boolean),
                    secretName: Schema.String,
                    secretNamespace: Schema.optional(Schema.String),
                    shareName: Schema.String,
                  }),
                ),
                capacity: Schema.optional(
                  Schema.Record(Schema.String, Schema.String),
                ),
                cephfs: Schema.optional(
                  Schema.Struct({
                    monitors: Schema.Array(Schema.String),
                    path: Schema.optional(Schema.String),
                    readOnly: Schema.optional(Schema.Boolean),
                    secretFile: Schema.optional(Schema.String),
                    secretRef: Schema.optional(
                      Schema.Struct({
                        name: Schema.optional(Schema.String),
                        namespace: Schema.optional(Schema.String),
                      }),
                    ),
                    user: Schema.optional(Schema.String),
                  }),
                ),
                cinder: Schema.optional(
                  Schema.Struct({
                    fsType: Schema.optional(Schema.String),
                    readOnly: Schema.optional(Schema.Boolean),
                    secretRef: Schema.optional(
                      Schema.Struct({
                        name: Schema.optional(Schema.String),
                        namespace: Schema.optional(Schema.String),
                      }),
                    ),
                    volumeID: Schema.String,
                  }),
                ),
                claimRef: Schema.optional(
                  Schema.Struct({
                    apiVersion: Schema.optional(Schema.String),
                    fieldPath: Schema.optional(Schema.String),
                    kind: Schema.optional(Schema.String),
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                    resourceVersion: Schema.optional(Schema.String),
                    uid: Schema.optional(Schema.String),
                  }),
                ),
                csi: Schema.optional(
                  Schema.Struct({
                    controllerExpandSecretRef: Schema.optional(
                      Schema.Struct({
                        name: Schema.optional(Schema.String),
                        namespace: Schema.optional(Schema.String),
                      }),
                    ),
                    controllerPublishSecretRef: Schema.optional(
                      Schema.Struct({
                        name: Schema.optional(Schema.String),
                        namespace: Schema.optional(Schema.String),
                      }),
                    ),
                    driver: Schema.String,
                    fsType: Schema.optional(Schema.String),
                    nodeExpandSecretRef: Schema.optional(
                      Schema.Struct({
                        name: Schema.optional(Schema.String),
                        namespace: Schema.optional(Schema.String),
                      }),
                    ),
                    nodePublishSecretRef: Schema.optional(
                      Schema.Struct({
                        name: Schema.optional(Schema.String),
                        namespace: Schema.optional(Schema.String),
                      }),
                    ),
                    nodeStageSecretRef: Schema.optional(
                      Schema.Struct({
                        name: Schema.optional(Schema.String),
                        namespace: Schema.optional(Schema.String),
                      }),
                    ),
                    readOnly: Schema.optional(Schema.Boolean),
                    volumeAttributes: Schema.optional(
                      Schema.Record(Schema.String, Schema.String),
                    ),
                    volumeHandle: Schema.String,
                  }),
                ),
                fc: Schema.optional(
                  Schema.Struct({
                    fsType: Schema.optional(Schema.String),
                    lun: Schema.optional(Schema.Number),
                    readOnly: Schema.optional(Schema.Boolean),
                    targetWWNs: Schema.optional(Schema.Array(Schema.String)),
                    wwids: Schema.optional(Schema.Array(Schema.String)),
                  }),
                ),
                flexVolume: Schema.optional(
                  Schema.Struct({
                    driver: Schema.String,
                    fsType: Schema.optional(Schema.String),
                    options: Schema.optional(
                      Schema.Record(Schema.String, Schema.String),
                    ),
                    readOnly: Schema.optional(Schema.Boolean),
                    secretRef: Schema.optional(
                      Schema.Struct({
                        name: Schema.optional(Schema.String),
                        namespace: Schema.optional(Schema.String),
                      }),
                    ),
                  }),
                ),
                flocker: Schema.optional(
                  Schema.Struct({
                    datasetName: Schema.optional(Schema.String),
                    datasetUUID: Schema.optional(Schema.String),
                  }),
                ),
                gcePersistentDisk: Schema.optional(
                  Schema.Struct({
                    fsType: Schema.optional(Schema.String),
                    partition: Schema.optional(Schema.Number),
                    pdName: Schema.String,
                    readOnly: Schema.optional(Schema.Boolean),
                  }),
                ),
                glusterfs: Schema.optional(
                  Schema.Struct({
                    endpoints: Schema.String,
                    endpointsNamespace: Schema.optional(Schema.String),
                    path: Schema.String,
                    readOnly: Schema.optional(Schema.Boolean),
                  }),
                ),
                hostPath: Schema.optional(
                  Schema.Struct({
                    path: Schema.String,
                    type: Schema.optional(Schema.String),
                  }),
                ),
                iscsi: Schema.optional(
                  Schema.Struct({
                    chapAuthDiscovery: Schema.optional(Schema.Boolean),
                    chapAuthSession: Schema.optional(Schema.Boolean),
                    fsType: Schema.optional(Schema.String),
                    initiatorName: Schema.optional(Schema.String),
                    iqn: Schema.String,
                    iscsiInterface: Schema.optional(Schema.String),
                    lun: Schema.Number,
                    portals: Schema.optional(Schema.Array(Schema.String)),
                    readOnly: Schema.optional(Schema.Boolean),
                    secretRef: Schema.optional(
                      Schema.Struct({
                        name: Schema.optional(Schema.String),
                        namespace: Schema.optional(Schema.String),
                      }),
                    ),
                    targetPortal: Schema.String,
                  }),
                ),
                local: Schema.optional(
                  Schema.Struct({
                    fsType: Schema.optional(Schema.String),
                    path: Schema.String,
                  }),
                ),
                mountOptions: Schema.optional(Schema.Array(Schema.String)),
                nfs: Schema.optional(
                  Schema.Struct({
                    path: Schema.String,
                    readOnly: Schema.optional(Schema.Boolean),
                    server: Schema.String,
                  }),
                ),
                nodeAffinity: Schema.optional(
                  Schema.Struct({
                    required: Schema.optional(
                      Schema.Struct({
                        nodeSelectorTerms: Schema.Array(
                          Schema.Struct({
                            matchExpressions: Schema.optional(
                              Schema.Array(
                                Schema.Struct({
                                  key: Schema.String,
                                  operator: Schema.String,
                                  values: Schema.optional(
                                    Schema.Array(Schema.String),
                                  ),
                                }),
                              ),
                            ),
                            matchFields: Schema.optional(
                              Schema.Array(
                                Schema.Struct({
                                  key: Schema.String,
                                  operator: Schema.String,
                                  values: Schema.optional(
                                    Schema.Array(Schema.String),
                                  ),
                                }),
                              ),
                            ),
                          }),
                        ),
                      }),
                    ),
                  }),
                ),
                persistentVolumeReclaimPolicy: Schema.optional(Schema.String),
                photonPersistentDisk: Schema.optional(
                  Schema.Struct({
                    fsType: Schema.optional(Schema.String),
                    pdID: Schema.String,
                  }),
                ),
                portworxVolume: Schema.optional(
                  Schema.Struct({
                    fsType: Schema.optional(Schema.String),
                    readOnly: Schema.optional(Schema.Boolean),
                    volumeID: Schema.String,
                  }),
                ),
                quobyte: Schema.optional(
                  Schema.Struct({
                    group: Schema.optional(Schema.String),
                    readOnly: Schema.optional(Schema.Boolean),
                    registry: Schema.String,
                    tenant: Schema.optional(Schema.String),
                    user: Schema.optional(Schema.String),
                    volume: Schema.String,
                  }),
                ),
                rbd: Schema.optional(
                  Schema.Struct({
                    fsType: Schema.optional(Schema.String),
                    image: Schema.String,
                    keyring: Schema.optional(Schema.String),
                    monitors: Schema.Array(Schema.String),
                    pool: Schema.optional(Schema.String),
                    readOnly: Schema.optional(Schema.Boolean),
                    secretRef: Schema.optional(
                      Schema.Struct({
                        name: Schema.optional(Schema.String),
                        namespace: Schema.optional(Schema.String),
                      }),
                    ),
                    user: Schema.optional(Schema.String),
                  }),
                ),
                scaleIO: Schema.optional(
                  Schema.Struct({
                    fsType: Schema.optional(Schema.String),
                    gateway: Schema.String,
                    protectionDomain: Schema.optional(Schema.String),
                    readOnly: Schema.optional(Schema.Boolean),
                    secretRef: Schema.Struct({
                      name: Schema.optional(Schema.String),
                      namespace: Schema.optional(Schema.String),
                    }),
                    sslEnabled: Schema.optional(Schema.Boolean),
                    storageMode: Schema.optional(Schema.String),
                    storagePool: Schema.optional(Schema.String),
                    system: Schema.String,
                    volumeName: Schema.optional(Schema.String),
                  }),
                ),
                storageClassName: Schema.optional(Schema.String),
                storageos: Schema.optional(
                  Schema.Struct({
                    fsType: Schema.optional(Schema.String),
                    readOnly: Schema.optional(Schema.Boolean),
                    secretRef: Schema.optional(
                      Schema.Struct({
                        apiVersion: Schema.optional(Schema.String),
                        fieldPath: Schema.optional(Schema.String),
                        kind: Schema.optional(Schema.String),
                        name: Schema.optional(Schema.String),
                        namespace: Schema.optional(Schema.String),
                        resourceVersion: Schema.optional(Schema.String),
                        uid: Schema.optional(Schema.String),
                      }),
                    ),
                    volumeName: Schema.optional(Schema.String),
                    volumeNamespace: Schema.optional(Schema.String),
                  }),
                ),
                volumeAttributesClassName: Schema.optional(Schema.String),
                volumeMode: Schema.optional(Schema.String),
                vsphereVolume: Schema.optional(
                  Schema.Struct({
                    fsType: Schema.optional(Schema.String),
                    storagePolicyID: Schema.optional(Schema.String),
                    storagePolicyName: Schema.optional(Schema.String),
                    volumePath: Schema.String,
                  }),
                ),
              }),
            ),
            persistentVolumeName: Schema.optional(Schema.String),
          }),
        }),
        status: Schema.optional(
          Schema.Struct({
            attachError: Schema.optional(
              Schema.Struct({
                errorCode: Schema.optional(Schema.Number),
                message: Schema.optional(Schema.String),
                time: Schema.optional(Schema.String),
              }),
            ),
            attached: Schema.Boolean,
            attachmentMetadata: Schema.optional(
              Schema.Record(Schema.String, Schema.String),
            ),
            detachError: Schema.optional(
              Schema.Struct({
                errorCode: Schema.optional(Schema.Number),
                message: Schema.optional(Schema.String),
                time: Schema.optional(Schema.String),
              }),
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
export type ListStorageV1VolumeAttachmentOutput =
  typeof ListStorageV1VolumeAttachmentOutput.Type;

// The operation
/**
 * list or watch objects of kind VolumeAttachment
 */
export const listStorageV1VolumeAttachment =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListStorageV1VolumeAttachmentInput,
    outputSchema: ListStorageV1VolumeAttachmentOutput,
  }));
// Input Schema
export const ListStorageV1VolumeAttributesClassInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/storage.k8s.io/v1/volumeattributesclasses",
    }),
  );
export type ListStorageV1VolumeAttributesClassInput =
  typeof ListStorageV1VolumeAttributesClassInput.Type;

// Output Schema
export const ListStorageV1VolumeAttributesClassOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    apiVersion: Schema.optional(Schema.String),
    items: Schema.Array(
      Schema.Struct({
        apiVersion: Schema.optional(Schema.String),
        driverName: Schema.String,
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
        parameters: Schema.optional(
          Schema.Record(Schema.String, Schema.String),
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
export type ListStorageV1VolumeAttributesClassOutput =
  typeof ListStorageV1VolumeAttributesClassOutput.Type;

// The operation
/**
 * list or watch objects of kind VolumeAttributesClass
 */
export const listStorageV1VolumeAttributesClass =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListStorageV1VolumeAttributesClassInput,
    outputSchema: ListStorageV1VolumeAttributesClassOutput,
  }));
// Input Schema
export const ListStorageV1beta1VolumeAttributesClassInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/storage.k8s.io/v1beta1/volumeattributesclasses",
    }),
  );
export type ListStorageV1beta1VolumeAttributesClassInput =
  typeof ListStorageV1beta1VolumeAttributesClassInput.Type;

// Output Schema
export const ListStorageV1beta1VolumeAttributesClassOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    apiVersion: Schema.optional(Schema.String),
    items: Schema.Array(
      Schema.Struct({
        apiVersion: Schema.optional(Schema.String),
        driverName: Schema.String,
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
        parameters: Schema.optional(
          Schema.Record(Schema.String, Schema.String),
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
export type ListStorageV1beta1VolumeAttributesClassOutput =
  typeof ListStorageV1beta1VolumeAttributesClassOutput.Type;

// The operation
/**
 * list or watch objects of kind VolumeAttributesClass
 */
export const listStorageV1beta1VolumeAttributesClass =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListStorageV1beta1VolumeAttributesClassInput,
    outputSchema: ListStorageV1beta1VolumeAttributesClassOutput,
  }));
// Input Schema
export const PatchStorageV1CSIDriverInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/storage.k8s.io/v1/csidrivers/{name}",
    }),
  );
export type PatchStorageV1CSIDriverInput =
  typeof PatchStorageV1CSIDriverInput.Type;

// Output Schema
export const PatchStorageV1CSIDriverOutput =
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
      attachRequired: Schema.optional(Schema.Boolean),
      fsGroupPolicy: Schema.optional(Schema.String),
      nodeAllocatableUpdatePeriodSeconds: Schema.optional(Schema.Number),
      podInfoOnMount: Schema.optional(Schema.Boolean),
      preventPodSchedulingIfMissing: Schema.optional(Schema.Boolean),
      requiresRepublish: Schema.optional(Schema.Boolean),
      seLinuxMount: Schema.optional(Schema.Boolean),
      serviceAccountTokenInSecrets: Schema.optional(Schema.Boolean),
      storageCapacity: Schema.optional(Schema.Boolean),
      tokenRequests: Schema.optional(
        Schema.Array(
          Schema.Struct({
            audience: Schema.String,
            expirationSeconds: Schema.optional(Schema.Number),
          }),
        ),
      ),
      volumeLifecycleModes: Schema.optional(Schema.Array(Schema.String)),
    }),
  });
export type PatchStorageV1CSIDriverOutput =
  typeof PatchStorageV1CSIDriverOutput.Type;

// The operation
/**
 * partially update the specified CSIDriver
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchStorageV1CSIDriver = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PatchStorageV1CSIDriverInput,
    outputSchema: PatchStorageV1CSIDriverOutput,
  }),
);
// Input Schema
export const PatchStorageV1CSINodeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/storage.k8s.io/v1/csinodes/{name}",
    }),
  );
export type PatchStorageV1CSINodeInput = typeof PatchStorageV1CSINodeInput.Type;

// Output Schema
export const PatchStorageV1CSINodeOutput =
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
      drivers: Schema.Array(
        Schema.Struct({
          allocatable: Schema.optional(
            Schema.Struct({
              count: Schema.optional(Schema.Number),
            }),
          ),
          name: Schema.String,
          nodeID: Schema.String,
          topologyKeys: Schema.optional(Schema.Array(Schema.String)),
        }),
      ),
    }),
  });
export type PatchStorageV1CSINodeOutput =
  typeof PatchStorageV1CSINodeOutput.Type;

// The operation
/**
 * partially update the specified CSINode
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchStorageV1CSINode = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PatchStorageV1CSINodeInput,
    outputSchema: PatchStorageV1CSINodeOutput,
  }),
);
// Input Schema
export const PatchStorageV1NamespacedCSIStorageCapacityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/storage.k8s.io/v1/namespaces/{namespace}/csistoragecapacities/{name}",
    }),
  );
export type PatchStorageV1NamespacedCSIStorageCapacityInput =
  typeof PatchStorageV1NamespacedCSIStorageCapacityInput.Type;

// Output Schema
export const PatchStorageV1NamespacedCSIStorageCapacityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    apiVersion: Schema.optional(Schema.String),
    capacity: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
    maximumVolumeSize: Schema.optional(Schema.String),
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
    nodeTopology: Schema.optional(
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
    storageClassName: Schema.String,
  });
export type PatchStorageV1NamespacedCSIStorageCapacityOutput =
  typeof PatchStorageV1NamespacedCSIStorageCapacityOutput.Type;

// The operation
/**
 * partially update the specified CSIStorageCapacity
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchStorageV1NamespacedCSIStorageCapacity =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PatchStorageV1NamespacedCSIStorageCapacityInput,
    outputSchema: PatchStorageV1NamespacedCSIStorageCapacityOutput,
  }));
// Input Schema
export const PatchStorageV1StorageClassInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/storage.k8s.io/v1/storageclasses/{name}",
    }),
  );
export type PatchStorageV1StorageClassInput =
  typeof PatchStorageV1StorageClassInput.Type;

// Output Schema
export const PatchStorageV1StorageClassOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    allowVolumeExpansion: Schema.optional(Schema.Boolean),
    allowedTopologies: Schema.optional(
      Schema.Array(
        Schema.Struct({
          matchLabelExpressions: Schema.optional(
            Schema.Array(
              Schema.Struct({
                key: Schema.String,
                values: Schema.Array(Schema.String),
              }),
            ),
          ),
        }),
      ),
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
    mountOptions: Schema.optional(Schema.Array(Schema.String)),
    parameters: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    provisioner: Schema.String,
    reclaimPolicy: Schema.optional(Schema.String),
    volumeBindingMode: Schema.optional(Schema.String),
  });
export type PatchStorageV1StorageClassOutput =
  typeof PatchStorageV1StorageClassOutput.Type;

// The operation
/**
 * partially update the specified StorageClass
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchStorageV1StorageClass = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PatchStorageV1StorageClassInput,
    outputSchema: PatchStorageV1StorageClassOutput,
  }),
);
// Input Schema
export const PatchStorageV1VolumeAttachmentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/storage.k8s.io/v1/volumeattachments/{name}",
    }),
  );
export type PatchStorageV1VolumeAttachmentInput =
  typeof PatchStorageV1VolumeAttachmentInput.Type;

// Output Schema
export const PatchStorageV1VolumeAttachmentOutput =
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
      attacher: Schema.String,
      nodeName: Schema.String,
      source: Schema.Struct({
        inlineVolumeSpec: Schema.optional(
          Schema.Struct({
            accessModes: Schema.optional(Schema.Array(Schema.String)),
            awsElasticBlockStore: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                partition: Schema.optional(Schema.Number),
                readOnly: Schema.optional(Schema.Boolean),
                volumeID: Schema.String,
              }),
            ),
            azureDisk: Schema.optional(
              Schema.Struct({
                cachingMode: Schema.optional(Schema.String),
                diskName: Schema.String,
                diskURI: Schema.String,
                fsType: Schema.optional(Schema.String),
                kind: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
              }),
            ),
            azureFile: Schema.optional(
              Schema.Struct({
                readOnly: Schema.optional(Schema.Boolean),
                secretName: Schema.String,
                secretNamespace: Schema.optional(Schema.String),
                shareName: Schema.String,
              }),
            ),
            capacity: Schema.optional(
              Schema.Record(Schema.String, Schema.String),
            ),
            cephfs: Schema.optional(
              Schema.Struct({
                monitors: Schema.Array(Schema.String),
                path: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                secretFile: Schema.optional(Schema.String),
                secretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                user: Schema.optional(Schema.String),
              }),
            ),
            cinder: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                secretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                volumeID: Schema.String,
              }),
            ),
            claimRef: Schema.optional(
              Schema.Struct({
                apiVersion: Schema.optional(Schema.String),
                fieldPath: Schema.optional(Schema.String),
                kind: Schema.optional(Schema.String),
                name: Schema.optional(Schema.String),
                namespace: Schema.optional(Schema.String),
                resourceVersion: Schema.optional(Schema.String),
                uid: Schema.optional(Schema.String),
              }),
            ),
            csi: Schema.optional(
              Schema.Struct({
                controllerExpandSecretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                controllerPublishSecretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                driver: Schema.String,
                fsType: Schema.optional(Schema.String),
                nodeExpandSecretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                nodePublishSecretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                nodeStageSecretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                readOnly: Schema.optional(Schema.Boolean),
                volumeAttributes: Schema.optional(
                  Schema.Record(Schema.String, Schema.String),
                ),
                volumeHandle: Schema.String,
              }),
            ),
            fc: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                lun: Schema.optional(Schema.Number),
                readOnly: Schema.optional(Schema.Boolean),
                targetWWNs: Schema.optional(Schema.Array(Schema.String)),
                wwids: Schema.optional(Schema.Array(Schema.String)),
              }),
            ),
            flexVolume: Schema.optional(
              Schema.Struct({
                driver: Schema.String,
                fsType: Schema.optional(Schema.String),
                options: Schema.optional(
                  Schema.Record(Schema.String, Schema.String),
                ),
                readOnly: Schema.optional(Schema.Boolean),
                secretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
              }),
            ),
            flocker: Schema.optional(
              Schema.Struct({
                datasetName: Schema.optional(Schema.String),
                datasetUUID: Schema.optional(Schema.String),
              }),
            ),
            gcePersistentDisk: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                partition: Schema.optional(Schema.Number),
                pdName: Schema.String,
                readOnly: Schema.optional(Schema.Boolean),
              }),
            ),
            glusterfs: Schema.optional(
              Schema.Struct({
                endpoints: Schema.String,
                endpointsNamespace: Schema.optional(Schema.String),
                path: Schema.String,
                readOnly: Schema.optional(Schema.Boolean),
              }),
            ),
            hostPath: Schema.optional(
              Schema.Struct({
                path: Schema.String,
                type: Schema.optional(Schema.String),
              }),
            ),
            iscsi: Schema.optional(
              Schema.Struct({
                chapAuthDiscovery: Schema.optional(Schema.Boolean),
                chapAuthSession: Schema.optional(Schema.Boolean),
                fsType: Schema.optional(Schema.String),
                initiatorName: Schema.optional(Schema.String),
                iqn: Schema.String,
                iscsiInterface: Schema.optional(Schema.String),
                lun: Schema.Number,
                portals: Schema.optional(Schema.Array(Schema.String)),
                readOnly: Schema.optional(Schema.Boolean),
                secretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                targetPortal: Schema.String,
              }),
            ),
            local: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                path: Schema.String,
              }),
            ),
            mountOptions: Schema.optional(Schema.Array(Schema.String)),
            nfs: Schema.optional(
              Schema.Struct({
                path: Schema.String,
                readOnly: Schema.optional(Schema.Boolean),
                server: Schema.String,
              }),
            ),
            nodeAffinity: Schema.optional(
              Schema.Struct({
                required: Schema.optional(
                  Schema.Struct({
                    nodeSelectorTerms: Schema.Array(
                      Schema.Struct({
                        matchExpressions: Schema.optional(
                          Schema.Array(
                            Schema.Struct({
                              key: Schema.String,
                              operator: Schema.String,
                              values: Schema.optional(
                                Schema.Array(Schema.String),
                              ),
                            }),
                          ),
                        ),
                        matchFields: Schema.optional(
                          Schema.Array(
                            Schema.Struct({
                              key: Schema.String,
                              operator: Schema.String,
                              values: Schema.optional(
                                Schema.Array(Schema.String),
                              ),
                            }),
                          ),
                        ),
                      }),
                    ),
                  }),
                ),
              }),
            ),
            persistentVolumeReclaimPolicy: Schema.optional(Schema.String),
            photonPersistentDisk: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                pdID: Schema.String,
              }),
            ),
            portworxVolume: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                volumeID: Schema.String,
              }),
            ),
            quobyte: Schema.optional(
              Schema.Struct({
                group: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                registry: Schema.String,
                tenant: Schema.optional(Schema.String),
                user: Schema.optional(Schema.String),
                volume: Schema.String,
              }),
            ),
            rbd: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                image: Schema.String,
                keyring: Schema.optional(Schema.String),
                monitors: Schema.Array(Schema.String),
                pool: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                secretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                user: Schema.optional(Schema.String),
              }),
            ),
            scaleIO: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                gateway: Schema.String,
                protectionDomain: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                secretRef: Schema.Struct({
                  name: Schema.optional(Schema.String),
                  namespace: Schema.optional(Schema.String),
                }),
                sslEnabled: Schema.optional(Schema.Boolean),
                storageMode: Schema.optional(Schema.String),
                storagePool: Schema.optional(Schema.String),
                system: Schema.String,
                volumeName: Schema.optional(Schema.String),
              }),
            ),
            storageClassName: Schema.optional(Schema.String),
            storageos: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                secretRef: Schema.optional(
                  Schema.Struct({
                    apiVersion: Schema.optional(Schema.String),
                    fieldPath: Schema.optional(Schema.String),
                    kind: Schema.optional(Schema.String),
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                    resourceVersion: Schema.optional(Schema.String),
                    uid: Schema.optional(Schema.String),
                  }),
                ),
                volumeName: Schema.optional(Schema.String),
                volumeNamespace: Schema.optional(Schema.String),
              }),
            ),
            volumeAttributesClassName: Schema.optional(Schema.String),
            volumeMode: Schema.optional(Schema.String),
            vsphereVolume: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                storagePolicyID: Schema.optional(Schema.String),
                storagePolicyName: Schema.optional(Schema.String),
                volumePath: Schema.String,
              }),
            ),
          }),
        ),
        persistentVolumeName: Schema.optional(Schema.String),
      }),
    }),
    status: Schema.optional(
      Schema.Struct({
        attachError: Schema.optional(
          Schema.Struct({
            errorCode: Schema.optional(Schema.Number),
            message: Schema.optional(Schema.String),
            time: Schema.optional(Schema.String),
          }),
        ),
        attached: Schema.Boolean,
        attachmentMetadata: Schema.optional(
          Schema.Record(Schema.String, Schema.String),
        ),
        detachError: Schema.optional(
          Schema.Struct({
            errorCode: Schema.optional(Schema.Number),
            message: Schema.optional(Schema.String),
            time: Schema.optional(Schema.String),
          }),
        ),
      }),
    ),
  });
export type PatchStorageV1VolumeAttachmentOutput =
  typeof PatchStorageV1VolumeAttachmentOutput.Type;

// The operation
/**
 * partially update the specified VolumeAttachment
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchStorageV1VolumeAttachment =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PatchStorageV1VolumeAttachmentInput,
    outputSchema: PatchStorageV1VolumeAttachmentOutput,
  }));
// Input Schema
export const PatchStorageV1VolumeAttachmentStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/storage.k8s.io/v1/volumeattachments/{name}/status",
    }),
  );
export type PatchStorageV1VolumeAttachmentStatusInput =
  typeof PatchStorageV1VolumeAttachmentStatusInput.Type;

// Output Schema
export const PatchStorageV1VolumeAttachmentStatusOutput =
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
      attacher: Schema.String,
      nodeName: Schema.String,
      source: Schema.Struct({
        inlineVolumeSpec: Schema.optional(
          Schema.Struct({
            accessModes: Schema.optional(Schema.Array(Schema.String)),
            awsElasticBlockStore: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                partition: Schema.optional(Schema.Number),
                readOnly: Schema.optional(Schema.Boolean),
                volumeID: Schema.String,
              }),
            ),
            azureDisk: Schema.optional(
              Schema.Struct({
                cachingMode: Schema.optional(Schema.String),
                diskName: Schema.String,
                diskURI: Schema.String,
                fsType: Schema.optional(Schema.String),
                kind: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
              }),
            ),
            azureFile: Schema.optional(
              Schema.Struct({
                readOnly: Schema.optional(Schema.Boolean),
                secretName: Schema.String,
                secretNamespace: Schema.optional(Schema.String),
                shareName: Schema.String,
              }),
            ),
            capacity: Schema.optional(
              Schema.Record(Schema.String, Schema.String),
            ),
            cephfs: Schema.optional(
              Schema.Struct({
                monitors: Schema.Array(Schema.String),
                path: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                secretFile: Schema.optional(Schema.String),
                secretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                user: Schema.optional(Schema.String),
              }),
            ),
            cinder: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                secretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                volumeID: Schema.String,
              }),
            ),
            claimRef: Schema.optional(
              Schema.Struct({
                apiVersion: Schema.optional(Schema.String),
                fieldPath: Schema.optional(Schema.String),
                kind: Schema.optional(Schema.String),
                name: Schema.optional(Schema.String),
                namespace: Schema.optional(Schema.String),
                resourceVersion: Schema.optional(Schema.String),
                uid: Schema.optional(Schema.String),
              }),
            ),
            csi: Schema.optional(
              Schema.Struct({
                controllerExpandSecretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                controllerPublishSecretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                driver: Schema.String,
                fsType: Schema.optional(Schema.String),
                nodeExpandSecretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                nodePublishSecretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                nodeStageSecretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                readOnly: Schema.optional(Schema.Boolean),
                volumeAttributes: Schema.optional(
                  Schema.Record(Schema.String, Schema.String),
                ),
                volumeHandle: Schema.String,
              }),
            ),
            fc: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                lun: Schema.optional(Schema.Number),
                readOnly: Schema.optional(Schema.Boolean),
                targetWWNs: Schema.optional(Schema.Array(Schema.String)),
                wwids: Schema.optional(Schema.Array(Schema.String)),
              }),
            ),
            flexVolume: Schema.optional(
              Schema.Struct({
                driver: Schema.String,
                fsType: Schema.optional(Schema.String),
                options: Schema.optional(
                  Schema.Record(Schema.String, Schema.String),
                ),
                readOnly: Schema.optional(Schema.Boolean),
                secretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
              }),
            ),
            flocker: Schema.optional(
              Schema.Struct({
                datasetName: Schema.optional(Schema.String),
                datasetUUID: Schema.optional(Schema.String),
              }),
            ),
            gcePersistentDisk: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                partition: Schema.optional(Schema.Number),
                pdName: Schema.String,
                readOnly: Schema.optional(Schema.Boolean),
              }),
            ),
            glusterfs: Schema.optional(
              Schema.Struct({
                endpoints: Schema.String,
                endpointsNamespace: Schema.optional(Schema.String),
                path: Schema.String,
                readOnly: Schema.optional(Schema.Boolean),
              }),
            ),
            hostPath: Schema.optional(
              Schema.Struct({
                path: Schema.String,
                type: Schema.optional(Schema.String),
              }),
            ),
            iscsi: Schema.optional(
              Schema.Struct({
                chapAuthDiscovery: Schema.optional(Schema.Boolean),
                chapAuthSession: Schema.optional(Schema.Boolean),
                fsType: Schema.optional(Schema.String),
                initiatorName: Schema.optional(Schema.String),
                iqn: Schema.String,
                iscsiInterface: Schema.optional(Schema.String),
                lun: Schema.Number,
                portals: Schema.optional(Schema.Array(Schema.String)),
                readOnly: Schema.optional(Schema.Boolean),
                secretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                targetPortal: Schema.String,
              }),
            ),
            local: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                path: Schema.String,
              }),
            ),
            mountOptions: Schema.optional(Schema.Array(Schema.String)),
            nfs: Schema.optional(
              Schema.Struct({
                path: Schema.String,
                readOnly: Schema.optional(Schema.Boolean),
                server: Schema.String,
              }),
            ),
            nodeAffinity: Schema.optional(
              Schema.Struct({
                required: Schema.optional(
                  Schema.Struct({
                    nodeSelectorTerms: Schema.Array(
                      Schema.Struct({
                        matchExpressions: Schema.optional(
                          Schema.Array(
                            Schema.Struct({
                              key: Schema.String,
                              operator: Schema.String,
                              values: Schema.optional(
                                Schema.Array(Schema.String),
                              ),
                            }),
                          ),
                        ),
                        matchFields: Schema.optional(
                          Schema.Array(
                            Schema.Struct({
                              key: Schema.String,
                              operator: Schema.String,
                              values: Schema.optional(
                                Schema.Array(Schema.String),
                              ),
                            }),
                          ),
                        ),
                      }),
                    ),
                  }),
                ),
              }),
            ),
            persistentVolumeReclaimPolicy: Schema.optional(Schema.String),
            photonPersistentDisk: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                pdID: Schema.String,
              }),
            ),
            portworxVolume: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                volumeID: Schema.String,
              }),
            ),
            quobyte: Schema.optional(
              Schema.Struct({
                group: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                registry: Schema.String,
                tenant: Schema.optional(Schema.String),
                user: Schema.optional(Schema.String),
                volume: Schema.String,
              }),
            ),
            rbd: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                image: Schema.String,
                keyring: Schema.optional(Schema.String),
                monitors: Schema.Array(Schema.String),
                pool: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                secretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                user: Schema.optional(Schema.String),
              }),
            ),
            scaleIO: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                gateway: Schema.String,
                protectionDomain: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                secretRef: Schema.Struct({
                  name: Schema.optional(Schema.String),
                  namespace: Schema.optional(Schema.String),
                }),
                sslEnabled: Schema.optional(Schema.Boolean),
                storageMode: Schema.optional(Schema.String),
                storagePool: Schema.optional(Schema.String),
                system: Schema.String,
                volumeName: Schema.optional(Schema.String),
              }),
            ),
            storageClassName: Schema.optional(Schema.String),
            storageos: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                secretRef: Schema.optional(
                  Schema.Struct({
                    apiVersion: Schema.optional(Schema.String),
                    fieldPath: Schema.optional(Schema.String),
                    kind: Schema.optional(Schema.String),
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                    resourceVersion: Schema.optional(Schema.String),
                    uid: Schema.optional(Schema.String),
                  }),
                ),
                volumeName: Schema.optional(Schema.String),
                volumeNamespace: Schema.optional(Schema.String),
              }),
            ),
            volumeAttributesClassName: Schema.optional(Schema.String),
            volumeMode: Schema.optional(Schema.String),
            vsphereVolume: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                storagePolicyID: Schema.optional(Schema.String),
                storagePolicyName: Schema.optional(Schema.String),
                volumePath: Schema.String,
              }),
            ),
          }),
        ),
        persistentVolumeName: Schema.optional(Schema.String),
      }),
    }),
    status: Schema.optional(
      Schema.Struct({
        attachError: Schema.optional(
          Schema.Struct({
            errorCode: Schema.optional(Schema.Number),
            message: Schema.optional(Schema.String),
            time: Schema.optional(Schema.String),
          }),
        ),
        attached: Schema.Boolean,
        attachmentMetadata: Schema.optional(
          Schema.Record(Schema.String, Schema.String),
        ),
        detachError: Schema.optional(
          Schema.Struct({
            errorCode: Schema.optional(Schema.Number),
            message: Schema.optional(Schema.String),
            time: Schema.optional(Schema.String),
          }),
        ),
      }),
    ),
  });
export type PatchStorageV1VolumeAttachmentStatusOutput =
  typeof PatchStorageV1VolumeAttachmentStatusOutput.Type;

// The operation
/**
 * partially update status of the specified VolumeAttachment
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchStorageV1VolumeAttachmentStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PatchStorageV1VolumeAttachmentStatusInput,
    outputSchema: PatchStorageV1VolumeAttachmentStatusOutput,
  }));
// Input Schema
export const PatchStorageV1VolumeAttributesClassInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/storage.k8s.io/v1/volumeattributesclasses/{name}",
    }),
  );
export type PatchStorageV1VolumeAttributesClassInput =
  typeof PatchStorageV1VolumeAttributesClassInput.Type;

// Output Schema
export const PatchStorageV1VolumeAttributesClassOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    apiVersion: Schema.optional(Schema.String),
    driverName: Schema.String,
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
    parameters: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type PatchStorageV1VolumeAttributesClassOutput =
  typeof PatchStorageV1VolumeAttributesClassOutput.Type;

// The operation
/**
 * partially update the specified VolumeAttributesClass
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchStorageV1VolumeAttributesClass =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PatchStorageV1VolumeAttributesClassInput,
    outputSchema: PatchStorageV1VolumeAttributesClassOutput,
  }));
// Input Schema
export const PatchStorageV1beta1VolumeAttributesClassInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/storage.k8s.io/v1beta1/volumeattributesclasses/{name}",
    }),
  );
export type PatchStorageV1beta1VolumeAttributesClassInput =
  typeof PatchStorageV1beta1VolumeAttributesClassInput.Type;

// Output Schema
export const PatchStorageV1beta1VolumeAttributesClassOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    apiVersion: Schema.optional(Schema.String),
    driverName: Schema.String,
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
    parameters: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type PatchStorageV1beta1VolumeAttributesClassOutput =
  typeof PatchStorageV1beta1VolumeAttributesClassOutput.Type;

// The operation
/**
 * partially update the specified VolumeAttributesClass
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchStorageV1beta1VolumeAttributesClass =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PatchStorageV1beta1VolumeAttributesClassInput,
    outputSchema: PatchStorageV1beta1VolumeAttributesClassOutput,
  }));
// Input Schema
export const ReadStorageV1CSIDriverInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/storage.k8s.io/v1/csidrivers/{name}",
    }),
  );
export type ReadStorageV1CSIDriverInput =
  typeof ReadStorageV1CSIDriverInput.Type;

// Output Schema
export const ReadStorageV1CSIDriverOutput =
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
      attachRequired: Schema.optional(Schema.Boolean),
      fsGroupPolicy: Schema.optional(Schema.String),
      nodeAllocatableUpdatePeriodSeconds: Schema.optional(Schema.Number),
      podInfoOnMount: Schema.optional(Schema.Boolean),
      preventPodSchedulingIfMissing: Schema.optional(Schema.Boolean),
      requiresRepublish: Schema.optional(Schema.Boolean),
      seLinuxMount: Schema.optional(Schema.Boolean),
      serviceAccountTokenInSecrets: Schema.optional(Schema.Boolean),
      storageCapacity: Schema.optional(Schema.Boolean),
      tokenRequests: Schema.optional(
        Schema.Array(
          Schema.Struct({
            audience: Schema.String,
            expirationSeconds: Schema.optional(Schema.Number),
          }),
        ),
      ),
      volumeLifecycleModes: Schema.optional(Schema.Array(Schema.String)),
    }),
  });
export type ReadStorageV1CSIDriverOutput =
  typeof ReadStorageV1CSIDriverOutput.Type;

// The operation
/**
 * read the specified CSIDriver
 */
export const readStorageV1CSIDriver = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ReadStorageV1CSIDriverInput,
    outputSchema: ReadStorageV1CSIDriverOutput,
  }),
);
// Input Schema
export const ReadStorageV1CSINodeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/apis/storage.k8s.io/v1/csinodes/{name}" }),
  );
export type ReadStorageV1CSINodeInput = typeof ReadStorageV1CSINodeInput.Type;

// Output Schema
export const ReadStorageV1CSINodeOutput =
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
      drivers: Schema.Array(
        Schema.Struct({
          allocatable: Schema.optional(
            Schema.Struct({
              count: Schema.optional(Schema.Number),
            }),
          ),
          name: Schema.String,
          nodeID: Schema.String,
          topologyKeys: Schema.optional(Schema.Array(Schema.String)),
        }),
      ),
    }),
  });
export type ReadStorageV1CSINodeOutput = typeof ReadStorageV1CSINodeOutput.Type;

// The operation
/**
 * read the specified CSINode
 */
export const readStorageV1CSINode = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ReadStorageV1CSINodeInput,
    outputSchema: ReadStorageV1CSINodeOutput,
  }),
);
// Input Schema
export const ReadStorageV1NamespacedCSIStorageCapacityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/storage.k8s.io/v1/namespaces/{namespace}/csistoragecapacities/{name}",
    }),
  );
export type ReadStorageV1NamespacedCSIStorageCapacityInput =
  typeof ReadStorageV1NamespacedCSIStorageCapacityInput.Type;

// Output Schema
export const ReadStorageV1NamespacedCSIStorageCapacityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    apiVersion: Schema.optional(Schema.String),
    capacity: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
    maximumVolumeSize: Schema.optional(Schema.String),
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
    nodeTopology: Schema.optional(
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
    storageClassName: Schema.String,
  });
export type ReadStorageV1NamespacedCSIStorageCapacityOutput =
  typeof ReadStorageV1NamespacedCSIStorageCapacityOutput.Type;

// The operation
/**
 * read the specified CSIStorageCapacity
 */
export const readStorageV1NamespacedCSIStorageCapacity =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReadStorageV1NamespacedCSIStorageCapacityInput,
    outputSchema: ReadStorageV1NamespacedCSIStorageCapacityOutput,
  }));
// Input Schema
export const ReadStorageV1StorageClassInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/storage.k8s.io/v1/storageclasses/{name}",
    }),
  );
export type ReadStorageV1StorageClassInput =
  typeof ReadStorageV1StorageClassInput.Type;

// Output Schema
export const ReadStorageV1StorageClassOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    allowVolumeExpansion: Schema.optional(Schema.Boolean),
    allowedTopologies: Schema.optional(
      Schema.Array(
        Schema.Struct({
          matchLabelExpressions: Schema.optional(
            Schema.Array(
              Schema.Struct({
                key: Schema.String,
                values: Schema.Array(Schema.String),
              }),
            ),
          ),
        }),
      ),
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
    mountOptions: Schema.optional(Schema.Array(Schema.String)),
    parameters: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    provisioner: Schema.String,
    reclaimPolicy: Schema.optional(Schema.String),
    volumeBindingMode: Schema.optional(Schema.String),
  });
export type ReadStorageV1StorageClassOutput =
  typeof ReadStorageV1StorageClassOutput.Type;

// The operation
/**
 * read the specified StorageClass
 */
export const readStorageV1StorageClass = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ReadStorageV1StorageClassInput,
    outputSchema: ReadStorageV1StorageClassOutput,
  }),
);
// Input Schema
export const ReadStorageV1VolumeAttachmentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/storage.k8s.io/v1/volumeattachments/{name}",
    }),
  );
export type ReadStorageV1VolumeAttachmentInput =
  typeof ReadStorageV1VolumeAttachmentInput.Type;

// Output Schema
export const ReadStorageV1VolumeAttachmentOutput =
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
      attacher: Schema.String,
      nodeName: Schema.String,
      source: Schema.Struct({
        inlineVolumeSpec: Schema.optional(
          Schema.Struct({
            accessModes: Schema.optional(Schema.Array(Schema.String)),
            awsElasticBlockStore: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                partition: Schema.optional(Schema.Number),
                readOnly: Schema.optional(Schema.Boolean),
                volumeID: Schema.String,
              }),
            ),
            azureDisk: Schema.optional(
              Schema.Struct({
                cachingMode: Schema.optional(Schema.String),
                diskName: Schema.String,
                diskURI: Schema.String,
                fsType: Schema.optional(Schema.String),
                kind: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
              }),
            ),
            azureFile: Schema.optional(
              Schema.Struct({
                readOnly: Schema.optional(Schema.Boolean),
                secretName: Schema.String,
                secretNamespace: Schema.optional(Schema.String),
                shareName: Schema.String,
              }),
            ),
            capacity: Schema.optional(
              Schema.Record(Schema.String, Schema.String),
            ),
            cephfs: Schema.optional(
              Schema.Struct({
                monitors: Schema.Array(Schema.String),
                path: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                secretFile: Schema.optional(Schema.String),
                secretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                user: Schema.optional(Schema.String),
              }),
            ),
            cinder: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                secretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                volumeID: Schema.String,
              }),
            ),
            claimRef: Schema.optional(
              Schema.Struct({
                apiVersion: Schema.optional(Schema.String),
                fieldPath: Schema.optional(Schema.String),
                kind: Schema.optional(Schema.String),
                name: Schema.optional(Schema.String),
                namespace: Schema.optional(Schema.String),
                resourceVersion: Schema.optional(Schema.String),
                uid: Schema.optional(Schema.String),
              }),
            ),
            csi: Schema.optional(
              Schema.Struct({
                controllerExpandSecretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                controllerPublishSecretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                driver: Schema.String,
                fsType: Schema.optional(Schema.String),
                nodeExpandSecretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                nodePublishSecretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                nodeStageSecretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                readOnly: Schema.optional(Schema.Boolean),
                volumeAttributes: Schema.optional(
                  Schema.Record(Schema.String, Schema.String),
                ),
                volumeHandle: Schema.String,
              }),
            ),
            fc: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                lun: Schema.optional(Schema.Number),
                readOnly: Schema.optional(Schema.Boolean),
                targetWWNs: Schema.optional(Schema.Array(Schema.String)),
                wwids: Schema.optional(Schema.Array(Schema.String)),
              }),
            ),
            flexVolume: Schema.optional(
              Schema.Struct({
                driver: Schema.String,
                fsType: Schema.optional(Schema.String),
                options: Schema.optional(
                  Schema.Record(Schema.String, Schema.String),
                ),
                readOnly: Schema.optional(Schema.Boolean),
                secretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
              }),
            ),
            flocker: Schema.optional(
              Schema.Struct({
                datasetName: Schema.optional(Schema.String),
                datasetUUID: Schema.optional(Schema.String),
              }),
            ),
            gcePersistentDisk: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                partition: Schema.optional(Schema.Number),
                pdName: Schema.String,
                readOnly: Schema.optional(Schema.Boolean),
              }),
            ),
            glusterfs: Schema.optional(
              Schema.Struct({
                endpoints: Schema.String,
                endpointsNamespace: Schema.optional(Schema.String),
                path: Schema.String,
                readOnly: Schema.optional(Schema.Boolean),
              }),
            ),
            hostPath: Schema.optional(
              Schema.Struct({
                path: Schema.String,
                type: Schema.optional(Schema.String),
              }),
            ),
            iscsi: Schema.optional(
              Schema.Struct({
                chapAuthDiscovery: Schema.optional(Schema.Boolean),
                chapAuthSession: Schema.optional(Schema.Boolean),
                fsType: Schema.optional(Schema.String),
                initiatorName: Schema.optional(Schema.String),
                iqn: Schema.String,
                iscsiInterface: Schema.optional(Schema.String),
                lun: Schema.Number,
                portals: Schema.optional(Schema.Array(Schema.String)),
                readOnly: Schema.optional(Schema.Boolean),
                secretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                targetPortal: Schema.String,
              }),
            ),
            local: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                path: Schema.String,
              }),
            ),
            mountOptions: Schema.optional(Schema.Array(Schema.String)),
            nfs: Schema.optional(
              Schema.Struct({
                path: Schema.String,
                readOnly: Schema.optional(Schema.Boolean),
                server: Schema.String,
              }),
            ),
            nodeAffinity: Schema.optional(
              Schema.Struct({
                required: Schema.optional(
                  Schema.Struct({
                    nodeSelectorTerms: Schema.Array(
                      Schema.Struct({
                        matchExpressions: Schema.optional(
                          Schema.Array(
                            Schema.Struct({
                              key: Schema.String,
                              operator: Schema.String,
                              values: Schema.optional(
                                Schema.Array(Schema.String),
                              ),
                            }),
                          ),
                        ),
                        matchFields: Schema.optional(
                          Schema.Array(
                            Schema.Struct({
                              key: Schema.String,
                              operator: Schema.String,
                              values: Schema.optional(
                                Schema.Array(Schema.String),
                              ),
                            }),
                          ),
                        ),
                      }),
                    ),
                  }),
                ),
              }),
            ),
            persistentVolumeReclaimPolicy: Schema.optional(Schema.String),
            photonPersistentDisk: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                pdID: Schema.String,
              }),
            ),
            portworxVolume: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                volumeID: Schema.String,
              }),
            ),
            quobyte: Schema.optional(
              Schema.Struct({
                group: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                registry: Schema.String,
                tenant: Schema.optional(Schema.String),
                user: Schema.optional(Schema.String),
                volume: Schema.String,
              }),
            ),
            rbd: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                image: Schema.String,
                keyring: Schema.optional(Schema.String),
                monitors: Schema.Array(Schema.String),
                pool: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                secretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                user: Schema.optional(Schema.String),
              }),
            ),
            scaleIO: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                gateway: Schema.String,
                protectionDomain: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                secretRef: Schema.Struct({
                  name: Schema.optional(Schema.String),
                  namespace: Schema.optional(Schema.String),
                }),
                sslEnabled: Schema.optional(Schema.Boolean),
                storageMode: Schema.optional(Schema.String),
                storagePool: Schema.optional(Schema.String),
                system: Schema.String,
                volumeName: Schema.optional(Schema.String),
              }),
            ),
            storageClassName: Schema.optional(Schema.String),
            storageos: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                secretRef: Schema.optional(
                  Schema.Struct({
                    apiVersion: Schema.optional(Schema.String),
                    fieldPath: Schema.optional(Schema.String),
                    kind: Schema.optional(Schema.String),
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                    resourceVersion: Schema.optional(Schema.String),
                    uid: Schema.optional(Schema.String),
                  }),
                ),
                volumeName: Schema.optional(Schema.String),
                volumeNamespace: Schema.optional(Schema.String),
              }),
            ),
            volumeAttributesClassName: Schema.optional(Schema.String),
            volumeMode: Schema.optional(Schema.String),
            vsphereVolume: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                storagePolicyID: Schema.optional(Schema.String),
                storagePolicyName: Schema.optional(Schema.String),
                volumePath: Schema.String,
              }),
            ),
          }),
        ),
        persistentVolumeName: Schema.optional(Schema.String),
      }),
    }),
    status: Schema.optional(
      Schema.Struct({
        attachError: Schema.optional(
          Schema.Struct({
            errorCode: Schema.optional(Schema.Number),
            message: Schema.optional(Schema.String),
            time: Schema.optional(Schema.String),
          }),
        ),
        attached: Schema.Boolean,
        attachmentMetadata: Schema.optional(
          Schema.Record(Schema.String, Schema.String),
        ),
        detachError: Schema.optional(
          Schema.Struct({
            errorCode: Schema.optional(Schema.Number),
            message: Schema.optional(Schema.String),
            time: Schema.optional(Schema.String),
          }),
        ),
      }),
    ),
  });
export type ReadStorageV1VolumeAttachmentOutput =
  typeof ReadStorageV1VolumeAttachmentOutput.Type;

// The operation
/**
 * read the specified VolumeAttachment
 */
export const readStorageV1VolumeAttachment =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReadStorageV1VolumeAttachmentInput,
    outputSchema: ReadStorageV1VolumeAttachmentOutput,
  }));
// Input Schema
export const ReadStorageV1VolumeAttachmentStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/storage.k8s.io/v1/volumeattachments/{name}/status",
    }),
  );
export type ReadStorageV1VolumeAttachmentStatusInput =
  typeof ReadStorageV1VolumeAttachmentStatusInput.Type;

// Output Schema
export const ReadStorageV1VolumeAttachmentStatusOutput =
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
      attacher: Schema.String,
      nodeName: Schema.String,
      source: Schema.Struct({
        inlineVolumeSpec: Schema.optional(
          Schema.Struct({
            accessModes: Schema.optional(Schema.Array(Schema.String)),
            awsElasticBlockStore: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                partition: Schema.optional(Schema.Number),
                readOnly: Schema.optional(Schema.Boolean),
                volumeID: Schema.String,
              }),
            ),
            azureDisk: Schema.optional(
              Schema.Struct({
                cachingMode: Schema.optional(Schema.String),
                diskName: Schema.String,
                diskURI: Schema.String,
                fsType: Schema.optional(Schema.String),
                kind: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
              }),
            ),
            azureFile: Schema.optional(
              Schema.Struct({
                readOnly: Schema.optional(Schema.Boolean),
                secretName: Schema.String,
                secretNamespace: Schema.optional(Schema.String),
                shareName: Schema.String,
              }),
            ),
            capacity: Schema.optional(
              Schema.Record(Schema.String, Schema.String),
            ),
            cephfs: Schema.optional(
              Schema.Struct({
                monitors: Schema.Array(Schema.String),
                path: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                secretFile: Schema.optional(Schema.String),
                secretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                user: Schema.optional(Schema.String),
              }),
            ),
            cinder: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                secretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                volumeID: Schema.String,
              }),
            ),
            claimRef: Schema.optional(
              Schema.Struct({
                apiVersion: Schema.optional(Schema.String),
                fieldPath: Schema.optional(Schema.String),
                kind: Schema.optional(Schema.String),
                name: Schema.optional(Schema.String),
                namespace: Schema.optional(Schema.String),
                resourceVersion: Schema.optional(Schema.String),
                uid: Schema.optional(Schema.String),
              }),
            ),
            csi: Schema.optional(
              Schema.Struct({
                controllerExpandSecretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                controllerPublishSecretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                driver: Schema.String,
                fsType: Schema.optional(Schema.String),
                nodeExpandSecretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                nodePublishSecretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                nodeStageSecretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                readOnly: Schema.optional(Schema.Boolean),
                volumeAttributes: Schema.optional(
                  Schema.Record(Schema.String, Schema.String),
                ),
                volumeHandle: Schema.String,
              }),
            ),
            fc: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                lun: Schema.optional(Schema.Number),
                readOnly: Schema.optional(Schema.Boolean),
                targetWWNs: Schema.optional(Schema.Array(Schema.String)),
                wwids: Schema.optional(Schema.Array(Schema.String)),
              }),
            ),
            flexVolume: Schema.optional(
              Schema.Struct({
                driver: Schema.String,
                fsType: Schema.optional(Schema.String),
                options: Schema.optional(
                  Schema.Record(Schema.String, Schema.String),
                ),
                readOnly: Schema.optional(Schema.Boolean),
                secretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
              }),
            ),
            flocker: Schema.optional(
              Schema.Struct({
                datasetName: Schema.optional(Schema.String),
                datasetUUID: Schema.optional(Schema.String),
              }),
            ),
            gcePersistentDisk: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                partition: Schema.optional(Schema.Number),
                pdName: Schema.String,
                readOnly: Schema.optional(Schema.Boolean),
              }),
            ),
            glusterfs: Schema.optional(
              Schema.Struct({
                endpoints: Schema.String,
                endpointsNamespace: Schema.optional(Schema.String),
                path: Schema.String,
                readOnly: Schema.optional(Schema.Boolean),
              }),
            ),
            hostPath: Schema.optional(
              Schema.Struct({
                path: Schema.String,
                type: Schema.optional(Schema.String),
              }),
            ),
            iscsi: Schema.optional(
              Schema.Struct({
                chapAuthDiscovery: Schema.optional(Schema.Boolean),
                chapAuthSession: Schema.optional(Schema.Boolean),
                fsType: Schema.optional(Schema.String),
                initiatorName: Schema.optional(Schema.String),
                iqn: Schema.String,
                iscsiInterface: Schema.optional(Schema.String),
                lun: Schema.Number,
                portals: Schema.optional(Schema.Array(Schema.String)),
                readOnly: Schema.optional(Schema.Boolean),
                secretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                targetPortal: Schema.String,
              }),
            ),
            local: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                path: Schema.String,
              }),
            ),
            mountOptions: Schema.optional(Schema.Array(Schema.String)),
            nfs: Schema.optional(
              Schema.Struct({
                path: Schema.String,
                readOnly: Schema.optional(Schema.Boolean),
                server: Schema.String,
              }),
            ),
            nodeAffinity: Schema.optional(
              Schema.Struct({
                required: Schema.optional(
                  Schema.Struct({
                    nodeSelectorTerms: Schema.Array(
                      Schema.Struct({
                        matchExpressions: Schema.optional(
                          Schema.Array(
                            Schema.Struct({
                              key: Schema.String,
                              operator: Schema.String,
                              values: Schema.optional(
                                Schema.Array(Schema.String),
                              ),
                            }),
                          ),
                        ),
                        matchFields: Schema.optional(
                          Schema.Array(
                            Schema.Struct({
                              key: Schema.String,
                              operator: Schema.String,
                              values: Schema.optional(
                                Schema.Array(Schema.String),
                              ),
                            }),
                          ),
                        ),
                      }),
                    ),
                  }),
                ),
              }),
            ),
            persistentVolumeReclaimPolicy: Schema.optional(Schema.String),
            photonPersistentDisk: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                pdID: Schema.String,
              }),
            ),
            portworxVolume: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                volumeID: Schema.String,
              }),
            ),
            quobyte: Schema.optional(
              Schema.Struct({
                group: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                registry: Schema.String,
                tenant: Schema.optional(Schema.String),
                user: Schema.optional(Schema.String),
                volume: Schema.String,
              }),
            ),
            rbd: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                image: Schema.String,
                keyring: Schema.optional(Schema.String),
                monitors: Schema.Array(Schema.String),
                pool: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                secretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                user: Schema.optional(Schema.String),
              }),
            ),
            scaleIO: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                gateway: Schema.String,
                protectionDomain: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                secretRef: Schema.Struct({
                  name: Schema.optional(Schema.String),
                  namespace: Schema.optional(Schema.String),
                }),
                sslEnabled: Schema.optional(Schema.Boolean),
                storageMode: Schema.optional(Schema.String),
                storagePool: Schema.optional(Schema.String),
                system: Schema.String,
                volumeName: Schema.optional(Schema.String),
              }),
            ),
            storageClassName: Schema.optional(Schema.String),
            storageos: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                secretRef: Schema.optional(
                  Schema.Struct({
                    apiVersion: Schema.optional(Schema.String),
                    fieldPath: Schema.optional(Schema.String),
                    kind: Schema.optional(Schema.String),
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                    resourceVersion: Schema.optional(Schema.String),
                    uid: Schema.optional(Schema.String),
                  }),
                ),
                volumeName: Schema.optional(Schema.String),
                volumeNamespace: Schema.optional(Schema.String),
              }),
            ),
            volumeAttributesClassName: Schema.optional(Schema.String),
            volumeMode: Schema.optional(Schema.String),
            vsphereVolume: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                storagePolicyID: Schema.optional(Schema.String),
                storagePolicyName: Schema.optional(Schema.String),
                volumePath: Schema.String,
              }),
            ),
          }),
        ),
        persistentVolumeName: Schema.optional(Schema.String),
      }),
    }),
    status: Schema.optional(
      Schema.Struct({
        attachError: Schema.optional(
          Schema.Struct({
            errorCode: Schema.optional(Schema.Number),
            message: Schema.optional(Schema.String),
            time: Schema.optional(Schema.String),
          }),
        ),
        attached: Schema.Boolean,
        attachmentMetadata: Schema.optional(
          Schema.Record(Schema.String, Schema.String),
        ),
        detachError: Schema.optional(
          Schema.Struct({
            errorCode: Schema.optional(Schema.Number),
            message: Schema.optional(Schema.String),
            time: Schema.optional(Schema.String),
          }),
        ),
      }),
    ),
  });
export type ReadStorageV1VolumeAttachmentStatusOutput =
  typeof ReadStorageV1VolumeAttachmentStatusOutput.Type;

// The operation
/**
 * read status of the specified VolumeAttachment
 */
export const readStorageV1VolumeAttachmentStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReadStorageV1VolumeAttachmentStatusInput,
    outputSchema: ReadStorageV1VolumeAttachmentStatusOutput,
  }));
// Input Schema
export const ReadStorageV1VolumeAttributesClassInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/storage.k8s.io/v1/volumeattributesclasses/{name}",
    }),
  );
export type ReadStorageV1VolumeAttributesClassInput =
  typeof ReadStorageV1VolumeAttributesClassInput.Type;

// Output Schema
export const ReadStorageV1VolumeAttributesClassOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    apiVersion: Schema.optional(Schema.String),
    driverName: Schema.String,
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
    parameters: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type ReadStorageV1VolumeAttributesClassOutput =
  typeof ReadStorageV1VolumeAttributesClassOutput.Type;

// The operation
/**
 * read the specified VolumeAttributesClass
 */
export const readStorageV1VolumeAttributesClass =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReadStorageV1VolumeAttributesClassInput,
    outputSchema: ReadStorageV1VolumeAttributesClassOutput,
  }));
// Input Schema
export const ReadStorageV1beta1VolumeAttributesClassInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/storage.k8s.io/v1beta1/volumeattributesclasses/{name}",
    }),
  );
export type ReadStorageV1beta1VolumeAttributesClassInput =
  typeof ReadStorageV1beta1VolumeAttributesClassInput.Type;

// Output Schema
export const ReadStorageV1beta1VolumeAttributesClassOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    apiVersion: Schema.optional(Schema.String),
    driverName: Schema.String,
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
    parameters: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type ReadStorageV1beta1VolumeAttributesClassOutput =
  typeof ReadStorageV1beta1VolumeAttributesClassOutput.Type;

// The operation
/**
 * read the specified VolumeAttributesClass
 */
export const readStorageV1beta1VolumeAttributesClass =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReadStorageV1beta1VolumeAttributesClassInput,
    outputSchema: ReadStorageV1beta1VolumeAttributesClassOutput,
  }));
// Input Schema
export const ReplaceStorageV1CSIDriverInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/storage.k8s.io/v1/csidrivers/{name}",
    }),
  );
export type ReplaceStorageV1CSIDriverInput =
  typeof ReplaceStorageV1CSIDriverInput.Type;

// Output Schema
export const ReplaceStorageV1CSIDriverOutput =
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
      attachRequired: Schema.optional(Schema.Boolean),
      fsGroupPolicy: Schema.optional(Schema.String),
      nodeAllocatableUpdatePeriodSeconds: Schema.optional(Schema.Number),
      podInfoOnMount: Schema.optional(Schema.Boolean),
      preventPodSchedulingIfMissing: Schema.optional(Schema.Boolean),
      requiresRepublish: Schema.optional(Schema.Boolean),
      seLinuxMount: Schema.optional(Schema.Boolean),
      serviceAccountTokenInSecrets: Schema.optional(Schema.Boolean),
      storageCapacity: Schema.optional(Schema.Boolean),
      tokenRequests: Schema.optional(
        Schema.Array(
          Schema.Struct({
            audience: Schema.String,
            expirationSeconds: Schema.optional(Schema.Number),
          }),
        ),
      ),
      volumeLifecycleModes: Schema.optional(Schema.Array(Schema.String)),
    }),
  });
export type ReplaceStorageV1CSIDriverOutput =
  typeof ReplaceStorageV1CSIDriverOutput.Type;

// The operation
/**
 * replace the specified CSIDriver
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceStorageV1CSIDriver = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ReplaceStorageV1CSIDriverInput,
    outputSchema: ReplaceStorageV1CSIDriverOutput,
  }),
);
// Input Schema
export const ReplaceStorageV1CSINodeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({ method: "PUT", path: "/apis/storage.k8s.io/v1/csinodes/{name}" }),
  );
export type ReplaceStorageV1CSINodeInput =
  typeof ReplaceStorageV1CSINodeInput.Type;

// Output Schema
export const ReplaceStorageV1CSINodeOutput =
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
      drivers: Schema.Array(
        Schema.Struct({
          allocatable: Schema.optional(
            Schema.Struct({
              count: Schema.optional(Schema.Number),
            }),
          ),
          name: Schema.String,
          nodeID: Schema.String,
          topologyKeys: Schema.optional(Schema.Array(Schema.String)),
        }),
      ),
    }),
  });
export type ReplaceStorageV1CSINodeOutput =
  typeof ReplaceStorageV1CSINodeOutput.Type;

// The operation
/**
 * replace the specified CSINode
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceStorageV1CSINode = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ReplaceStorageV1CSINodeInput,
    outputSchema: ReplaceStorageV1CSINodeOutput,
  }),
);
// Input Schema
export const ReplaceStorageV1NamespacedCSIStorageCapacityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/storage.k8s.io/v1/namespaces/{namespace}/csistoragecapacities/{name}",
    }),
  );
export type ReplaceStorageV1NamespacedCSIStorageCapacityInput =
  typeof ReplaceStorageV1NamespacedCSIStorageCapacityInput.Type;

// Output Schema
export const ReplaceStorageV1NamespacedCSIStorageCapacityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    apiVersion: Schema.optional(Schema.String),
    capacity: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
    maximumVolumeSize: Schema.optional(Schema.String),
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
    nodeTopology: Schema.optional(
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
    storageClassName: Schema.String,
  });
export type ReplaceStorageV1NamespacedCSIStorageCapacityOutput =
  typeof ReplaceStorageV1NamespacedCSIStorageCapacityOutput.Type;

// The operation
/**
 * replace the specified CSIStorageCapacity
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceStorageV1NamespacedCSIStorageCapacity =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReplaceStorageV1NamespacedCSIStorageCapacityInput,
    outputSchema: ReplaceStorageV1NamespacedCSIStorageCapacityOutput,
  }));
// Input Schema
export const ReplaceStorageV1StorageClassInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/storage.k8s.io/v1/storageclasses/{name}",
    }),
  );
export type ReplaceStorageV1StorageClassInput =
  typeof ReplaceStorageV1StorageClassInput.Type;

// Output Schema
export const ReplaceStorageV1StorageClassOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    allowVolumeExpansion: Schema.optional(Schema.Boolean),
    allowedTopologies: Schema.optional(
      Schema.Array(
        Schema.Struct({
          matchLabelExpressions: Schema.optional(
            Schema.Array(
              Schema.Struct({
                key: Schema.String,
                values: Schema.Array(Schema.String),
              }),
            ),
          ),
        }),
      ),
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
    mountOptions: Schema.optional(Schema.Array(Schema.String)),
    parameters: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    provisioner: Schema.String,
    reclaimPolicy: Schema.optional(Schema.String),
    volumeBindingMode: Schema.optional(Schema.String),
  });
export type ReplaceStorageV1StorageClassOutput =
  typeof ReplaceStorageV1StorageClassOutput.Type;

// The operation
/**
 * replace the specified StorageClass
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceStorageV1StorageClass =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReplaceStorageV1StorageClassInput,
    outputSchema: ReplaceStorageV1StorageClassOutput,
  }));
// Input Schema
export const ReplaceStorageV1VolumeAttachmentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/storage.k8s.io/v1/volumeattachments/{name}",
    }),
  );
export type ReplaceStorageV1VolumeAttachmentInput =
  typeof ReplaceStorageV1VolumeAttachmentInput.Type;

// Output Schema
export const ReplaceStorageV1VolumeAttachmentOutput =
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
      attacher: Schema.String,
      nodeName: Schema.String,
      source: Schema.Struct({
        inlineVolumeSpec: Schema.optional(
          Schema.Struct({
            accessModes: Schema.optional(Schema.Array(Schema.String)),
            awsElasticBlockStore: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                partition: Schema.optional(Schema.Number),
                readOnly: Schema.optional(Schema.Boolean),
                volumeID: Schema.String,
              }),
            ),
            azureDisk: Schema.optional(
              Schema.Struct({
                cachingMode: Schema.optional(Schema.String),
                diskName: Schema.String,
                diskURI: Schema.String,
                fsType: Schema.optional(Schema.String),
                kind: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
              }),
            ),
            azureFile: Schema.optional(
              Schema.Struct({
                readOnly: Schema.optional(Schema.Boolean),
                secretName: Schema.String,
                secretNamespace: Schema.optional(Schema.String),
                shareName: Schema.String,
              }),
            ),
            capacity: Schema.optional(
              Schema.Record(Schema.String, Schema.String),
            ),
            cephfs: Schema.optional(
              Schema.Struct({
                monitors: Schema.Array(Schema.String),
                path: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                secretFile: Schema.optional(Schema.String),
                secretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                user: Schema.optional(Schema.String),
              }),
            ),
            cinder: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                secretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                volumeID: Schema.String,
              }),
            ),
            claimRef: Schema.optional(
              Schema.Struct({
                apiVersion: Schema.optional(Schema.String),
                fieldPath: Schema.optional(Schema.String),
                kind: Schema.optional(Schema.String),
                name: Schema.optional(Schema.String),
                namespace: Schema.optional(Schema.String),
                resourceVersion: Schema.optional(Schema.String),
                uid: Schema.optional(Schema.String),
              }),
            ),
            csi: Schema.optional(
              Schema.Struct({
                controllerExpandSecretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                controllerPublishSecretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                driver: Schema.String,
                fsType: Schema.optional(Schema.String),
                nodeExpandSecretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                nodePublishSecretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                nodeStageSecretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                readOnly: Schema.optional(Schema.Boolean),
                volumeAttributes: Schema.optional(
                  Schema.Record(Schema.String, Schema.String),
                ),
                volumeHandle: Schema.String,
              }),
            ),
            fc: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                lun: Schema.optional(Schema.Number),
                readOnly: Schema.optional(Schema.Boolean),
                targetWWNs: Schema.optional(Schema.Array(Schema.String)),
                wwids: Schema.optional(Schema.Array(Schema.String)),
              }),
            ),
            flexVolume: Schema.optional(
              Schema.Struct({
                driver: Schema.String,
                fsType: Schema.optional(Schema.String),
                options: Schema.optional(
                  Schema.Record(Schema.String, Schema.String),
                ),
                readOnly: Schema.optional(Schema.Boolean),
                secretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
              }),
            ),
            flocker: Schema.optional(
              Schema.Struct({
                datasetName: Schema.optional(Schema.String),
                datasetUUID: Schema.optional(Schema.String),
              }),
            ),
            gcePersistentDisk: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                partition: Schema.optional(Schema.Number),
                pdName: Schema.String,
                readOnly: Schema.optional(Schema.Boolean),
              }),
            ),
            glusterfs: Schema.optional(
              Schema.Struct({
                endpoints: Schema.String,
                endpointsNamespace: Schema.optional(Schema.String),
                path: Schema.String,
                readOnly: Schema.optional(Schema.Boolean),
              }),
            ),
            hostPath: Schema.optional(
              Schema.Struct({
                path: Schema.String,
                type: Schema.optional(Schema.String),
              }),
            ),
            iscsi: Schema.optional(
              Schema.Struct({
                chapAuthDiscovery: Schema.optional(Schema.Boolean),
                chapAuthSession: Schema.optional(Schema.Boolean),
                fsType: Schema.optional(Schema.String),
                initiatorName: Schema.optional(Schema.String),
                iqn: Schema.String,
                iscsiInterface: Schema.optional(Schema.String),
                lun: Schema.Number,
                portals: Schema.optional(Schema.Array(Schema.String)),
                readOnly: Schema.optional(Schema.Boolean),
                secretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                targetPortal: Schema.String,
              }),
            ),
            local: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                path: Schema.String,
              }),
            ),
            mountOptions: Schema.optional(Schema.Array(Schema.String)),
            nfs: Schema.optional(
              Schema.Struct({
                path: Schema.String,
                readOnly: Schema.optional(Schema.Boolean),
                server: Schema.String,
              }),
            ),
            nodeAffinity: Schema.optional(
              Schema.Struct({
                required: Schema.optional(
                  Schema.Struct({
                    nodeSelectorTerms: Schema.Array(
                      Schema.Struct({
                        matchExpressions: Schema.optional(
                          Schema.Array(
                            Schema.Struct({
                              key: Schema.String,
                              operator: Schema.String,
                              values: Schema.optional(
                                Schema.Array(Schema.String),
                              ),
                            }),
                          ),
                        ),
                        matchFields: Schema.optional(
                          Schema.Array(
                            Schema.Struct({
                              key: Schema.String,
                              operator: Schema.String,
                              values: Schema.optional(
                                Schema.Array(Schema.String),
                              ),
                            }),
                          ),
                        ),
                      }),
                    ),
                  }),
                ),
              }),
            ),
            persistentVolumeReclaimPolicy: Schema.optional(Schema.String),
            photonPersistentDisk: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                pdID: Schema.String,
              }),
            ),
            portworxVolume: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                volumeID: Schema.String,
              }),
            ),
            quobyte: Schema.optional(
              Schema.Struct({
                group: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                registry: Schema.String,
                tenant: Schema.optional(Schema.String),
                user: Schema.optional(Schema.String),
                volume: Schema.String,
              }),
            ),
            rbd: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                image: Schema.String,
                keyring: Schema.optional(Schema.String),
                monitors: Schema.Array(Schema.String),
                pool: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                secretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                user: Schema.optional(Schema.String),
              }),
            ),
            scaleIO: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                gateway: Schema.String,
                protectionDomain: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                secretRef: Schema.Struct({
                  name: Schema.optional(Schema.String),
                  namespace: Schema.optional(Schema.String),
                }),
                sslEnabled: Schema.optional(Schema.Boolean),
                storageMode: Schema.optional(Schema.String),
                storagePool: Schema.optional(Schema.String),
                system: Schema.String,
                volumeName: Schema.optional(Schema.String),
              }),
            ),
            storageClassName: Schema.optional(Schema.String),
            storageos: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                secretRef: Schema.optional(
                  Schema.Struct({
                    apiVersion: Schema.optional(Schema.String),
                    fieldPath: Schema.optional(Schema.String),
                    kind: Schema.optional(Schema.String),
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                    resourceVersion: Schema.optional(Schema.String),
                    uid: Schema.optional(Schema.String),
                  }),
                ),
                volumeName: Schema.optional(Schema.String),
                volumeNamespace: Schema.optional(Schema.String),
              }),
            ),
            volumeAttributesClassName: Schema.optional(Schema.String),
            volumeMode: Schema.optional(Schema.String),
            vsphereVolume: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                storagePolicyID: Schema.optional(Schema.String),
                storagePolicyName: Schema.optional(Schema.String),
                volumePath: Schema.String,
              }),
            ),
          }),
        ),
        persistentVolumeName: Schema.optional(Schema.String),
      }),
    }),
    status: Schema.optional(
      Schema.Struct({
        attachError: Schema.optional(
          Schema.Struct({
            errorCode: Schema.optional(Schema.Number),
            message: Schema.optional(Schema.String),
            time: Schema.optional(Schema.String),
          }),
        ),
        attached: Schema.Boolean,
        attachmentMetadata: Schema.optional(
          Schema.Record(Schema.String, Schema.String),
        ),
        detachError: Schema.optional(
          Schema.Struct({
            errorCode: Schema.optional(Schema.Number),
            message: Schema.optional(Schema.String),
            time: Schema.optional(Schema.String),
          }),
        ),
      }),
    ),
  });
export type ReplaceStorageV1VolumeAttachmentOutput =
  typeof ReplaceStorageV1VolumeAttachmentOutput.Type;

// The operation
/**
 * replace the specified VolumeAttachment
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceStorageV1VolumeAttachment =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReplaceStorageV1VolumeAttachmentInput,
    outputSchema: ReplaceStorageV1VolumeAttachmentOutput,
  }));
// Input Schema
export const ReplaceStorageV1VolumeAttachmentStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/storage.k8s.io/v1/volumeattachments/{name}/status",
    }),
  );
export type ReplaceStorageV1VolumeAttachmentStatusInput =
  typeof ReplaceStorageV1VolumeAttachmentStatusInput.Type;

// Output Schema
export const ReplaceStorageV1VolumeAttachmentStatusOutput =
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
      attacher: Schema.String,
      nodeName: Schema.String,
      source: Schema.Struct({
        inlineVolumeSpec: Schema.optional(
          Schema.Struct({
            accessModes: Schema.optional(Schema.Array(Schema.String)),
            awsElasticBlockStore: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                partition: Schema.optional(Schema.Number),
                readOnly: Schema.optional(Schema.Boolean),
                volumeID: Schema.String,
              }),
            ),
            azureDisk: Schema.optional(
              Schema.Struct({
                cachingMode: Schema.optional(Schema.String),
                diskName: Schema.String,
                diskURI: Schema.String,
                fsType: Schema.optional(Schema.String),
                kind: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
              }),
            ),
            azureFile: Schema.optional(
              Schema.Struct({
                readOnly: Schema.optional(Schema.Boolean),
                secretName: Schema.String,
                secretNamespace: Schema.optional(Schema.String),
                shareName: Schema.String,
              }),
            ),
            capacity: Schema.optional(
              Schema.Record(Schema.String, Schema.String),
            ),
            cephfs: Schema.optional(
              Schema.Struct({
                monitors: Schema.Array(Schema.String),
                path: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                secretFile: Schema.optional(Schema.String),
                secretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                user: Schema.optional(Schema.String),
              }),
            ),
            cinder: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                secretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                volumeID: Schema.String,
              }),
            ),
            claimRef: Schema.optional(
              Schema.Struct({
                apiVersion: Schema.optional(Schema.String),
                fieldPath: Schema.optional(Schema.String),
                kind: Schema.optional(Schema.String),
                name: Schema.optional(Schema.String),
                namespace: Schema.optional(Schema.String),
                resourceVersion: Schema.optional(Schema.String),
                uid: Schema.optional(Schema.String),
              }),
            ),
            csi: Schema.optional(
              Schema.Struct({
                controllerExpandSecretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                controllerPublishSecretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                driver: Schema.String,
                fsType: Schema.optional(Schema.String),
                nodeExpandSecretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                nodePublishSecretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                nodeStageSecretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                readOnly: Schema.optional(Schema.Boolean),
                volumeAttributes: Schema.optional(
                  Schema.Record(Schema.String, Schema.String),
                ),
                volumeHandle: Schema.String,
              }),
            ),
            fc: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                lun: Schema.optional(Schema.Number),
                readOnly: Schema.optional(Schema.Boolean),
                targetWWNs: Schema.optional(Schema.Array(Schema.String)),
                wwids: Schema.optional(Schema.Array(Schema.String)),
              }),
            ),
            flexVolume: Schema.optional(
              Schema.Struct({
                driver: Schema.String,
                fsType: Schema.optional(Schema.String),
                options: Schema.optional(
                  Schema.Record(Schema.String, Schema.String),
                ),
                readOnly: Schema.optional(Schema.Boolean),
                secretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
              }),
            ),
            flocker: Schema.optional(
              Schema.Struct({
                datasetName: Schema.optional(Schema.String),
                datasetUUID: Schema.optional(Schema.String),
              }),
            ),
            gcePersistentDisk: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                partition: Schema.optional(Schema.Number),
                pdName: Schema.String,
                readOnly: Schema.optional(Schema.Boolean),
              }),
            ),
            glusterfs: Schema.optional(
              Schema.Struct({
                endpoints: Schema.String,
                endpointsNamespace: Schema.optional(Schema.String),
                path: Schema.String,
                readOnly: Schema.optional(Schema.Boolean),
              }),
            ),
            hostPath: Schema.optional(
              Schema.Struct({
                path: Schema.String,
                type: Schema.optional(Schema.String),
              }),
            ),
            iscsi: Schema.optional(
              Schema.Struct({
                chapAuthDiscovery: Schema.optional(Schema.Boolean),
                chapAuthSession: Schema.optional(Schema.Boolean),
                fsType: Schema.optional(Schema.String),
                initiatorName: Schema.optional(Schema.String),
                iqn: Schema.String,
                iscsiInterface: Schema.optional(Schema.String),
                lun: Schema.Number,
                portals: Schema.optional(Schema.Array(Schema.String)),
                readOnly: Schema.optional(Schema.Boolean),
                secretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                targetPortal: Schema.String,
              }),
            ),
            local: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                path: Schema.String,
              }),
            ),
            mountOptions: Schema.optional(Schema.Array(Schema.String)),
            nfs: Schema.optional(
              Schema.Struct({
                path: Schema.String,
                readOnly: Schema.optional(Schema.Boolean),
                server: Schema.String,
              }),
            ),
            nodeAffinity: Schema.optional(
              Schema.Struct({
                required: Schema.optional(
                  Schema.Struct({
                    nodeSelectorTerms: Schema.Array(
                      Schema.Struct({
                        matchExpressions: Schema.optional(
                          Schema.Array(
                            Schema.Struct({
                              key: Schema.String,
                              operator: Schema.String,
                              values: Schema.optional(
                                Schema.Array(Schema.String),
                              ),
                            }),
                          ),
                        ),
                        matchFields: Schema.optional(
                          Schema.Array(
                            Schema.Struct({
                              key: Schema.String,
                              operator: Schema.String,
                              values: Schema.optional(
                                Schema.Array(Schema.String),
                              ),
                            }),
                          ),
                        ),
                      }),
                    ),
                  }),
                ),
              }),
            ),
            persistentVolumeReclaimPolicy: Schema.optional(Schema.String),
            photonPersistentDisk: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                pdID: Schema.String,
              }),
            ),
            portworxVolume: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                volumeID: Schema.String,
              }),
            ),
            quobyte: Schema.optional(
              Schema.Struct({
                group: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                registry: Schema.String,
                tenant: Schema.optional(Schema.String),
                user: Schema.optional(Schema.String),
                volume: Schema.String,
              }),
            ),
            rbd: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                image: Schema.String,
                keyring: Schema.optional(Schema.String),
                monitors: Schema.Array(Schema.String),
                pool: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                secretRef: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                  }),
                ),
                user: Schema.optional(Schema.String),
              }),
            ),
            scaleIO: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                gateway: Schema.String,
                protectionDomain: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                secretRef: Schema.Struct({
                  name: Schema.optional(Schema.String),
                  namespace: Schema.optional(Schema.String),
                }),
                sslEnabled: Schema.optional(Schema.Boolean),
                storageMode: Schema.optional(Schema.String),
                storagePool: Schema.optional(Schema.String),
                system: Schema.String,
                volumeName: Schema.optional(Schema.String),
              }),
            ),
            storageClassName: Schema.optional(Schema.String),
            storageos: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                readOnly: Schema.optional(Schema.Boolean),
                secretRef: Schema.optional(
                  Schema.Struct({
                    apiVersion: Schema.optional(Schema.String),
                    fieldPath: Schema.optional(Schema.String),
                    kind: Schema.optional(Schema.String),
                    name: Schema.optional(Schema.String),
                    namespace: Schema.optional(Schema.String),
                    resourceVersion: Schema.optional(Schema.String),
                    uid: Schema.optional(Schema.String),
                  }),
                ),
                volumeName: Schema.optional(Schema.String),
                volumeNamespace: Schema.optional(Schema.String),
              }),
            ),
            volumeAttributesClassName: Schema.optional(Schema.String),
            volumeMode: Schema.optional(Schema.String),
            vsphereVolume: Schema.optional(
              Schema.Struct({
                fsType: Schema.optional(Schema.String),
                storagePolicyID: Schema.optional(Schema.String),
                storagePolicyName: Schema.optional(Schema.String),
                volumePath: Schema.String,
              }),
            ),
          }),
        ),
        persistentVolumeName: Schema.optional(Schema.String),
      }),
    }),
    status: Schema.optional(
      Schema.Struct({
        attachError: Schema.optional(
          Schema.Struct({
            errorCode: Schema.optional(Schema.Number),
            message: Schema.optional(Schema.String),
            time: Schema.optional(Schema.String),
          }),
        ),
        attached: Schema.Boolean,
        attachmentMetadata: Schema.optional(
          Schema.Record(Schema.String, Schema.String),
        ),
        detachError: Schema.optional(
          Schema.Struct({
            errorCode: Schema.optional(Schema.Number),
            message: Schema.optional(Schema.String),
            time: Schema.optional(Schema.String),
          }),
        ),
      }),
    ),
  });
export type ReplaceStorageV1VolumeAttachmentStatusOutput =
  typeof ReplaceStorageV1VolumeAttachmentStatusOutput.Type;

// The operation
/**
 * replace status of the specified VolumeAttachment
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceStorageV1VolumeAttachmentStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReplaceStorageV1VolumeAttachmentStatusInput,
    outputSchema: ReplaceStorageV1VolumeAttachmentStatusOutput,
  }));
// Input Schema
export const ReplaceStorageV1VolumeAttributesClassInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/storage.k8s.io/v1/volumeattributesclasses/{name}",
    }),
  );
export type ReplaceStorageV1VolumeAttributesClassInput =
  typeof ReplaceStorageV1VolumeAttributesClassInput.Type;

// Output Schema
export const ReplaceStorageV1VolumeAttributesClassOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    apiVersion: Schema.optional(Schema.String),
    driverName: Schema.String,
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
    parameters: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type ReplaceStorageV1VolumeAttributesClassOutput =
  typeof ReplaceStorageV1VolumeAttributesClassOutput.Type;

// The operation
/**
 * replace the specified VolumeAttributesClass
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceStorageV1VolumeAttributesClass =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReplaceStorageV1VolumeAttributesClassInput,
    outputSchema: ReplaceStorageV1VolumeAttributesClassOutput,
  }));
// Input Schema
export const ReplaceStorageV1beta1VolumeAttributesClassInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/storage.k8s.io/v1beta1/volumeattributesclasses/{name}",
    }),
  );
export type ReplaceStorageV1beta1VolumeAttributesClassInput =
  typeof ReplaceStorageV1beta1VolumeAttributesClassInput.Type;

// Output Schema
export const ReplaceStorageV1beta1VolumeAttributesClassOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    apiVersion: Schema.optional(Schema.String),
    driverName: Schema.String,
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
    parameters: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type ReplaceStorageV1beta1VolumeAttributesClassOutput =
  typeof ReplaceStorageV1beta1VolumeAttributesClassOutput.Type;

// The operation
/**
 * replace the specified VolumeAttributesClass
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceStorageV1beta1VolumeAttributesClass =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReplaceStorageV1beta1VolumeAttributesClassInput,
    outputSchema: ReplaceStorageV1beta1VolumeAttributesClassOutput,
  }));
// Input Schema
export const WatchStorageV1CSIDriverInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/storage.k8s.io/v1/watch/csidrivers/{name}",
    }),
  );
export type WatchStorageV1CSIDriverInput =
  typeof WatchStorageV1CSIDriverInput.Type;

// Output Schema
export const WatchStorageV1CSIDriverOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchStorageV1CSIDriverOutput =
  typeof WatchStorageV1CSIDriverOutput.Type;

// The operation
/**
 * watch changes to an object of kind CSIDriver. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
 */
export const watchStorageV1CSIDriver = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WatchStorageV1CSIDriverInput,
    outputSchema: WatchStorageV1CSIDriverOutput,
  }),
);
// Input Schema
export const WatchStorageV1CSIDriverListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/apis/storage.k8s.io/v1/watch/csidrivers" }),
  );
export type WatchStorageV1CSIDriverListInput =
  typeof WatchStorageV1CSIDriverListInput.Type;

// Output Schema
export const WatchStorageV1CSIDriverListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchStorageV1CSIDriverListOutput =
  typeof WatchStorageV1CSIDriverListOutput.Type;

// The operation
/**
 * watch individual changes to a list of CSIDriver. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchStorageV1CSIDriverList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WatchStorageV1CSIDriverListInput,
    outputSchema: WatchStorageV1CSIDriverListOutput,
  }),
);
// Input Schema
export const WatchStorageV1CSINodeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/storage.k8s.io/v1/watch/csinodes/{name}",
    }),
  );
export type WatchStorageV1CSINodeInput = typeof WatchStorageV1CSINodeInput.Type;

// Output Schema
export const WatchStorageV1CSINodeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchStorageV1CSINodeOutput =
  typeof WatchStorageV1CSINodeOutput.Type;

// The operation
/**
 * watch changes to an object of kind CSINode. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
 */
export const watchStorageV1CSINode = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WatchStorageV1CSINodeInput,
    outputSchema: WatchStorageV1CSINodeOutput,
  }),
);
// Input Schema
export const WatchStorageV1CSINodeListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/apis/storage.k8s.io/v1/watch/csinodes" }),
  );
export type WatchStorageV1CSINodeListInput =
  typeof WatchStorageV1CSINodeListInput.Type;

// Output Schema
export const WatchStorageV1CSINodeListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchStorageV1CSINodeListOutput =
  typeof WatchStorageV1CSINodeListOutput.Type;

// The operation
/**
 * watch individual changes to a list of CSINode. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchStorageV1CSINodeList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WatchStorageV1CSINodeListInput,
    outputSchema: WatchStorageV1CSINodeListOutput,
  }),
);
// Input Schema
export const WatchStorageV1CSIStorageCapacityListForAllNamespacesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/storage.k8s.io/v1/watch/csistoragecapacities",
    }),
  );
export type WatchStorageV1CSIStorageCapacityListForAllNamespacesInput =
  typeof WatchStorageV1CSIStorageCapacityListForAllNamespacesInput.Type;

// Output Schema
export const WatchStorageV1CSIStorageCapacityListForAllNamespacesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchStorageV1CSIStorageCapacityListForAllNamespacesOutput =
  typeof WatchStorageV1CSIStorageCapacityListForAllNamespacesOutput.Type;

// The operation
/**
 * watch individual changes to a list of CSIStorageCapacity. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchStorageV1CSIStorageCapacityListForAllNamespaces =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchStorageV1CSIStorageCapacityListForAllNamespacesInput,
    outputSchema: WatchStorageV1CSIStorageCapacityListForAllNamespacesOutput,
  }));
// Input Schema
export const WatchStorageV1NamespacedCSIStorageCapacityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/storage.k8s.io/v1/watch/namespaces/{namespace}/csistoragecapacities/{name}",
    }),
  );
export type WatchStorageV1NamespacedCSIStorageCapacityInput =
  typeof WatchStorageV1NamespacedCSIStorageCapacityInput.Type;

// Output Schema
export const WatchStorageV1NamespacedCSIStorageCapacityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchStorageV1NamespacedCSIStorageCapacityOutput =
  typeof WatchStorageV1NamespacedCSIStorageCapacityOutput.Type;

// The operation
/**
 * watch changes to an object of kind CSIStorageCapacity. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
 */
export const watchStorageV1NamespacedCSIStorageCapacity =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchStorageV1NamespacedCSIStorageCapacityInput,
    outputSchema: WatchStorageV1NamespacedCSIStorageCapacityOutput,
  }));
// Input Schema
export const WatchStorageV1NamespacedCSIStorageCapacityListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/storage.k8s.io/v1/watch/namespaces/{namespace}/csistoragecapacities",
    }),
  );
export type WatchStorageV1NamespacedCSIStorageCapacityListInput =
  typeof WatchStorageV1NamespacedCSIStorageCapacityListInput.Type;

// Output Schema
export const WatchStorageV1NamespacedCSIStorageCapacityListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchStorageV1NamespacedCSIStorageCapacityListOutput =
  typeof WatchStorageV1NamespacedCSIStorageCapacityListOutput.Type;

// The operation
/**
 * watch individual changes to a list of CSIStorageCapacity. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchStorageV1NamespacedCSIStorageCapacityList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchStorageV1NamespacedCSIStorageCapacityListInput,
    outputSchema: WatchStorageV1NamespacedCSIStorageCapacityListOutput,
  }));
// Input Schema
export const WatchStorageV1StorageClassInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/storage.k8s.io/v1/watch/storageclasses/{name}",
    }),
  );
export type WatchStorageV1StorageClassInput =
  typeof WatchStorageV1StorageClassInput.Type;

// Output Schema
export const WatchStorageV1StorageClassOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchStorageV1StorageClassOutput =
  typeof WatchStorageV1StorageClassOutput.Type;

// The operation
/**
 * watch changes to an object of kind StorageClass. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
 */
export const watchStorageV1StorageClass = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WatchStorageV1StorageClassInput,
    outputSchema: WatchStorageV1StorageClassOutput,
  }),
);
// Input Schema
export const WatchStorageV1StorageClassListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/storage.k8s.io/v1/watch/storageclasses",
    }),
  );
export type WatchStorageV1StorageClassListInput =
  typeof WatchStorageV1StorageClassListInput.Type;

// Output Schema
export const WatchStorageV1StorageClassListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchStorageV1StorageClassListOutput =
  typeof WatchStorageV1StorageClassListOutput.Type;

// The operation
/**
 * watch individual changes to a list of StorageClass. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchStorageV1StorageClassList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchStorageV1StorageClassListInput,
    outputSchema: WatchStorageV1StorageClassListOutput,
  }));
// Input Schema
export const WatchStorageV1VolumeAttachmentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/storage.k8s.io/v1/watch/volumeattachments/{name}",
    }),
  );
export type WatchStorageV1VolumeAttachmentInput =
  typeof WatchStorageV1VolumeAttachmentInput.Type;

// Output Schema
export const WatchStorageV1VolumeAttachmentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchStorageV1VolumeAttachmentOutput =
  typeof WatchStorageV1VolumeAttachmentOutput.Type;

// The operation
/**
 * watch changes to an object of kind VolumeAttachment. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
 */
export const watchStorageV1VolumeAttachment =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchStorageV1VolumeAttachmentInput,
    outputSchema: WatchStorageV1VolumeAttachmentOutput,
  }));
// Input Schema
export const WatchStorageV1VolumeAttachmentListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/storage.k8s.io/v1/watch/volumeattachments",
    }),
  );
export type WatchStorageV1VolumeAttachmentListInput =
  typeof WatchStorageV1VolumeAttachmentListInput.Type;

// Output Schema
export const WatchStorageV1VolumeAttachmentListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchStorageV1VolumeAttachmentListOutput =
  typeof WatchStorageV1VolumeAttachmentListOutput.Type;

// The operation
/**
 * watch individual changes to a list of VolumeAttachment. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchStorageV1VolumeAttachmentList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchStorageV1VolumeAttachmentListInput,
    outputSchema: WatchStorageV1VolumeAttachmentListOutput,
  }));
// Input Schema
export const WatchStorageV1VolumeAttributesClassInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/storage.k8s.io/v1/watch/volumeattributesclasses/{name}",
    }),
  );
export type WatchStorageV1VolumeAttributesClassInput =
  typeof WatchStorageV1VolumeAttributesClassInput.Type;

// Output Schema
export const WatchStorageV1VolumeAttributesClassOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchStorageV1VolumeAttributesClassOutput =
  typeof WatchStorageV1VolumeAttributesClassOutput.Type;

// The operation
/**
 * watch changes to an object of kind VolumeAttributesClass. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
 */
export const watchStorageV1VolumeAttributesClass =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchStorageV1VolumeAttributesClassInput,
    outputSchema: WatchStorageV1VolumeAttributesClassOutput,
  }));
// Input Schema
export const WatchStorageV1VolumeAttributesClassListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/storage.k8s.io/v1/watch/volumeattributesclasses",
    }),
  );
export type WatchStorageV1VolumeAttributesClassListInput =
  typeof WatchStorageV1VolumeAttributesClassListInput.Type;

// Output Schema
export const WatchStorageV1VolumeAttributesClassListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchStorageV1VolumeAttributesClassListOutput =
  typeof WatchStorageV1VolumeAttributesClassListOutput.Type;

// The operation
/**
 * watch individual changes to a list of VolumeAttributesClass. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchStorageV1VolumeAttributesClassList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchStorageV1VolumeAttributesClassListInput,
    outputSchema: WatchStorageV1VolumeAttributesClassListOutput,
  }));
// Input Schema
export const WatchStorageV1beta1VolumeAttributesClassInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/storage.k8s.io/v1beta1/watch/volumeattributesclasses/{name}",
    }),
  );
export type WatchStorageV1beta1VolumeAttributesClassInput =
  typeof WatchStorageV1beta1VolumeAttributesClassInput.Type;

// Output Schema
export const WatchStorageV1beta1VolumeAttributesClassOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchStorageV1beta1VolumeAttributesClassOutput =
  typeof WatchStorageV1beta1VolumeAttributesClassOutput.Type;

// The operation
/**
 * watch changes to an object of kind VolumeAttributesClass. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
 */
export const watchStorageV1beta1VolumeAttributesClass =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchStorageV1beta1VolumeAttributesClassInput,
    outputSchema: WatchStorageV1beta1VolumeAttributesClassOutput,
  }));
// Input Schema
export const WatchStorageV1beta1VolumeAttributesClassListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/storage.k8s.io/v1beta1/watch/volumeattributesclasses",
    }),
  );
export type WatchStorageV1beta1VolumeAttributesClassListInput =
  typeof WatchStorageV1beta1VolumeAttributesClassListInput.Type;

// Output Schema
export const WatchStorageV1beta1VolumeAttributesClassListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchStorageV1beta1VolumeAttributesClassListOutput =
  typeof WatchStorageV1beta1VolumeAttributesClassListOutput.Type;

// The operation
/**
 * watch individual changes to a list of VolumeAttributesClass. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchStorageV1beta1VolumeAttributesClassList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchStorageV1beta1VolumeAttributesClassListInput,
    outputSchema: WatchStorageV1beta1VolumeAttributesClassListOutput,
  }));
