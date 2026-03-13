/**
 * Kubernetes Flow Control API Server API
 *
 * Generated from the Kubernetes OpenAPI spec.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";

// Input Schema
export const CreateFlowcontrolApiserverV1FlowSchemaInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/apis/flowcontrol.apiserver.k8s.io/v1/flowschemas",
    }),
  );
export type CreateFlowcontrolApiserverV1FlowSchemaInput =
  typeof CreateFlowcontrolApiserverV1FlowSchemaInput.Type;

// Output Schema
export const CreateFlowcontrolApiserverV1FlowSchemaOutput =
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
        distinguisherMethod: Schema.optional(
          Schema.Struct({
            type: Schema.String,
          }),
        ),
        matchingPrecedence: Schema.optional(Schema.Number),
        priorityLevelConfiguration: Schema.Struct({
          name: Schema.String,
        }),
        rules: Schema.optional(
          Schema.Array(
            Schema.Struct({
              nonResourceRules: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    nonResourceURLs: Schema.Array(Schema.String),
                    verbs: Schema.Array(Schema.String),
                  }),
                ),
              ),
              resourceRules: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    apiGroups: Schema.Array(Schema.String),
                    clusterScope: Schema.optional(Schema.Boolean),
                    namespaces: Schema.optional(Schema.Array(Schema.String)),
                    resources: Schema.Array(Schema.String),
                    verbs: Schema.Array(Schema.String),
                  }),
                ),
              ),
              subjects: Schema.Array(
                Schema.Struct({
                  group: Schema.optional(
                    Schema.Struct({
                      name: Schema.String,
                    }),
                  ),
                  kind: Schema.String,
                  serviceAccount: Schema.optional(
                    Schema.Struct({
                      name: Schema.String,
                      namespace: Schema.String,
                    }),
                  ),
                  user: Schema.optional(
                    Schema.Struct({
                      name: Schema.String,
                    }),
                  ),
                }),
              ),
            }),
          ),
        ),
      }),
    ),
    status: Schema.optional(
      Schema.Struct({
        conditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastTransitionTime: Schema.optional(Schema.String),
              message: Schema.optional(Schema.String),
              reason: Schema.optional(Schema.String),
              status: Schema.optional(Schema.String),
              type: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
  });
export type CreateFlowcontrolApiserverV1FlowSchemaOutput =
  typeof CreateFlowcontrolApiserverV1FlowSchemaOutput.Type;

// The operation
/**
 * create a FlowSchema
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const createFlowcontrolApiserverV1FlowSchema =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateFlowcontrolApiserverV1FlowSchemaInput,
    outputSchema: CreateFlowcontrolApiserverV1FlowSchemaOutput,
  }));
// Input Schema
export const CreateFlowcontrolApiserverV1PriorityLevelConfigurationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/apis/flowcontrol.apiserver.k8s.io/v1/prioritylevelconfigurations",
    }),
  );
export type CreateFlowcontrolApiserverV1PriorityLevelConfigurationInput =
  typeof CreateFlowcontrolApiserverV1PriorityLevelConfigurationInput.Type;

// Output Schema
export const CreateFlowcontrolApiserverV1PriorityLevelConfigurationOutput =
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
        exempt: Schema.optional(
          Schema.Struct({
            lendablePercent: Schema.optional(Schema.Number),
            nominalConcurrencyShares: Schema.optional(Schema.Number),
          }),
        ),
        limited: Schema.optional(
          Schema.Struct({
            borrowingLimitPercent: Schema.optional(Schema.Number),
            lendablePercent: Schema.optional(Schema.Number),
            limitResponse: Schema.optional(
              Schema.Struct({
                queuing: Schema.optional(
                  Schema.Struct({
                    handSize: Schema.optional(Schema.Number),
                    queueLengthLimit: Schema.optional(Schema.Number),
                    queues: Schema.optional(Schema.Number),
                  }),
                ),
                type: Schema.String,
              }),
            ),
            nominalConcurrencyShares: Schema.optional(Schema.Number),
          }),
        ),
        type: Schema.String,
      }),
    ),
    status: Schema.optional(
      Schema.Struct({
        conditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastTransitionTime: Schema.optional(Schema.String),
              message: Schema.optional(Schema.String),
              reason: Schema.optional(Schema.String),
              status: Schema.optional(Schema.String),
              type: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
  });
export type CreateFlowcontrolApiserverV1PriorityLevelConfigurationOutput =
  typeof CreateFlowcontrolApiserverV1PriorityLevelConfigurationOutput.Type;

// The operation
/**
 * create a PriorityLevelConfiguration
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const createFlowcontrolApiserverV1PriorityLevelConfiguration =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateFlowcontrolApiserverV1PriorityLevelConfigurationInput,
    outputSchema: CreateFlowcontrolApiserverV1PriorityLevelConfigurationOutput,
  }));
// Input Schema
export const DeleteFlowcontrolApiserverV1CollectionFlowSchemaInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/flowcontrol.apiserver.k8s.io/v1/flowschemas",
    }),
  );
export type DeleteFlowcontrolApiserverV1CollectionFlowSchemaInput =
  typeof DeleteFlowcontrolApiserverV1CollectionFlowSchemaInput.Type;

// Output Schema
export const DeleteFlowcontrolApiserverV1CollectionFlowSchemaOutput =
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
export type DeleteFlowcontrolApiserverV1CollectionFlowSchemaOutput =
  typeof DeleteFlowcontrolApiserverV1CollectionFlowSchemaOutput.Type;

// The operation
/**
 * delete collection of FlowSchema
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteFlowcontrolApiserverV1CollectionFlowSchema =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteFlowcontrolApiserverV1CollectionFlowSchemaInput,
    outputSchema: DeleteFlowcontrolApiserverV1CollectionFlowSchemaOutput,
  }));
// Input Schema
export const DeleteFlowcontrolApiserverV1CollectionPriorityLevelConfigurationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/flowcontrol.apiserver.k8s.io/v1/prioritylevelconfigurations",
    }),
  );
export type DeleteFlowcontrolApiserverV1CollectionPriorityLevelConfigurationInput =
  typeof DeleteFlowcontrolApiserverV1CollectionPriorityLevelConfigurationInput.Type;

// Output Schema
export const DeleteFlowcontrolApiserverV1CollectionPriorityLevelConfigurationOutput =
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
export type DeleteFlowcontrolApiserverV1CollectionPriorityLevelConfigurationOutput =
  typeof DeleteFlowcontrolApiserverV1CollectionPriorityLevelConfigurationOutput.Type;

// The operation
/**
 * delete collection of PriorityLevelConfiguration
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteFlowcontrolApiserverV1CollectionPriorityLevelConfiguration =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      DeleteFlowcontrolApiserverV1CollectionPriorityLevelConfigurationInput,
    outputSchema:
      DeleteFlowcontrolApiserverV1CollectionPriorityLevelConfigurationOutput,
  }));
// Input Schema
export const DeleteFlowcontrolApiserverV1FlowSchemaInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/flowcontrol.apiserver.k8s.io/v1/flowschemas/{name}",
    }),
  );
export type DeleteFlowcontrolApiserverV1FlowSchemaInput =
  typeof DeleteFlowcontrolApiserverV1FlowSchemaInput.Type;

// Output Schema
export const DeleteFlowcontrolApiserverV1FlowSchemaOutput =
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
export type DeleteFlowcontrolApiserverV1FlowSchemaOutput =
  typeof DeleteFlowcontrolApiserverV1FlowSchemaOutput.Type;

// The operation
/**
 * delete a FlowSchema
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteFlowcontrolApiserverV1FlowSchema =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteFlowcontrolApiserverV1FlowSchemaInput,
    outputSchema: DeleteFlowcontrolApiserverV1FlowSchemaOutput,
  }));
// Input Schema
export const DeleteFlowcontrolApiserverV1PriorityLevelConfigurationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/flowcontrol.apiserver.k8s.io/v1/prioritylevelconfigurations/{name}",
    }),
  );
export type DeleteFlowcontrolApiserverV1PriorityLevelConfigurationInput =
  typeof DeleteFlowcontrolApiserverV1PriorityLevelConfigurationInput.Type;

// Output Schema
export const DeleteFlowcontrolApiserverV1PriorityLevelConfigurationOutput =
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
export type DeleteFlowcontrolApiserverV1PriorityLevelConfigurationOutput =
  typeof DeleteFlowcontrolApiserverV1PriorityLevelConfigurationOutput.Type;

// The operation
/**
 * delete a PriorityLevelConfiguration
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteFlowcontrolApiserverV1PriorityLevelConfiguration =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteFlowcontrolApiserverV1PriorityLevelConfigurationInput,
    outputSchema: DeleteFlowcontrolApiserverV1PriorityLevelConfigurationOutput,
  }));
// Input Schema
export const GetFlowcontrolApiserverAPIGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/apis/flowcontrol.apiserver.k8s.io/" }),
  );
export type GetFlowcontrolApiserverAPIGroupInput =
  typeof GetFlowcontrolApiserverAPIGroupInput.Type;

// Output Schema
export const GetFlowcontrolApiserverAPIGroupOutput =
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
export type GetFlowcontrolApiserverAPIGroupOutput =
  typeof GetFlowcontrolApiserverAPIGroupOutput.Type;

// The operation
/**
 * get information of a group
 */
export const getFlowcontrolApiserverAPIGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetFlowcontrolApiserverAPIGroupInput,
    outputSchema: GetFlowcontrolApiserverAPIGroupOutput,
  }));
// Input Schema
export const GetFlowcontrolApiserverV1APIResourcesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/apis/flowcontrol.apiserver.k8s.io/v1/" }),
  );
export type GetFlowcontrolApiserverV1APIResourcesInput =
  typeof GetFlowcontrolApiserverV1APIResourcesInput.Type;

// Output Schema
export const GetFlowcontrolApiserverV1APIResourcesOutput =
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
export type GetFlowcontrolApiserverV1APIResourcesOutput =
  typeof GetFlowcontrolApiserverV1APIResourcesOutput.Type;

// The operation
/**
 * get available resources
 */
export const getFlowcontrolApiserverV1APIResources =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetFlowcontrolApiserverV1APIResourcesInput,
    outputSchema: GetFlowcontrolApiserverV1APIResourcesOutput,
  }));
// Input Schema
export const ListFlowcontrolApiserverV1FlowSchemaInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/flowcontrol.apiserver.k8s.io/v1/flowschemas",
    }),
  );
export type ListFlowcontrolApiserverV1FlowSchemaInput =
  typeof ListFlowcontrolApiserverV1FlowSchemaInput.Type;

// Output Schema
export const ListFlowcontrolApiserverV1FlowSchemaOutput =
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
            distinguisherMethod: Schema.optional(
              Schema.Struct({
                type: Schema.String,
              }),
            ),
            matchingPrecedence: Schema.optional(Schema.Number),
            priorityLevelConfiguration: Schema.Struct({
              name: Schema.String,
            }),
            rules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  nonResourceRules: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        nonResourceURLs: Schema.Array(Schema.String),
                        verbs: Schema.Array(Schema.String),
                      }),
                    ),
                  ),
                  resourceRules: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        apiGroups: Schema.Array(Schema.String),
                        clusterScope: Schema.optional(Schema.Boolean),
                        namespaces: Schema.optional(
                          Schema.Array(Schema.String),
                        ),
                        resources: Schema.Array(Schema.String),
                        verbs: Schema.Array(Schema.String),
                      }),
                    ),
                  ),
                  subjects: Schema.Array(
                    Schema.Struct({
                      group: Schema.optional(
                        Schema.Struct({
                          name: Schema.String,
                        }),
                      ),
                      kind: Schema.String,
                      serviceAccount: Schema.optional(
                        Schema.Struct({
                          name: Schema.String,
                          namespace: Schema.String,
                        }),
                      ),
                      user: Schema.optional(
                        Schema.Struct({
                          name: Schema.String,
                        }),
                      ),
                    }),
                  ),
                }),
              ),
            ),
          }),
        ),
        status: Schema.optional(
          Schema.Struct({
            conditions: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  lastTransitionTime: Schema.optional(Schema.String),
                  message: Schema.optional(Schema.String),
                  reason: Schema.optional(Schema.String),
                  status: Schema.optional(Schema.String),
                  type: Schema.optional(Schema.String),
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
export type ListFlowcontrolApiserverV1FlowSchemaOutput =
  typeof ListFlowcontrolApiserverV1FlowSchemaOutput.Type;

// The operation
/**
 * list or watch objects of kind FlowSchema
 */
export const listFlowcontrolApiserverV1FlowSchema =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListFlowcontrolApiserverV1FlowSchemaInput,
    outputSchema: ListFlowcontrolApiserverV1FlowSchemaOutput,
  }));
// Input Schema
export const ListFlowcontrolApiserverV1PriorityLevelConfigurationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/flowcontrol.apiserver.k8s.io/v1/prioritylevelconfigurations",
    }),
  );
export type ListFlowcontrolApiserverV1PriorityLevelConfigurationInput =
  typeof ListFlowcontrolApiserverV1PriorityLevelConfigurationInput.Type;

// Output Schema
export const ListFlowcontrolApiserverV1PriorityLevelConfigurationOutput =
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
            exempt: Schema.optional(
              Schema.Struct({
                lendablePercent: Schema.optional(Schema.Number),
                nominalConcurrencyShares: Schema.optional(Schema.Number),
              }),
            ),
            limited: Schema.optional(
              Schema.Struct({
                borrowingLimitPercent: Schema.optional(Schema.Number),
                lendablePercent: Schema.optional(Schema.Number),
                limitResponse: Schema.optional(
                  Schema.Struct({
                    queuing: Schema.optional(
                      Schema.Struct({
                        handSize: Schema.optional(Schema.Number),
                        queueLengthLimit: Schema.optional(Schema.Number),
                        queues: Schema.optional(Schema.Number),
                      }),
                    ),
                    type: Schema.String,
                  }),
                ),
                nominalConcurrencyShares: Schema.optional(Schema.Number),
              }),
            ),
            type: Schema.String,
          }),
        ),
        status: Schema.optional(
          Schema.Struct({
            conditions: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  lastTransitionTime: Schema.optional(Schema.String),
                  message: Schema.optional(Schema.String),
                  reason: Schema.optional(Schema.String),
                  status: Schema.optional(Schema.String),
                  type: Schema.optional(Schema.String),
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
export type ListFlowcontrolApiserverV1PriorityLevelConfigurationOutput =
  typeof ListFlowcontrolApiserverV1PriorityLevelConfigurationOutput.Type;

// The operation
/**
 * list or watch objects of kind PriorityLevelConfiguration
 */
export const listFlowcontrolApiserverV1PriorityLevelConfiguration =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListFlowcontrolApiserverV1PriorityLevelConfigurationInput,
    outputSchema: ListFlowcontrolApiserverV1PriorityLevelConfigurationOutput,
  }));
// Input Schema
export const PatchFlowcontrolApiserverV1FlowSchemaInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/flowcontrol.apiserver.k8s.io/v1/flowschemas/{name}",
    }),
  );
export type PatchFlowcontrolApiserverV1FlowSchemaInput =
  typeof PatchFlowcontrolApiserverV1FlowSchemaInput.Type;

// Output Schema
export const PatchFlowcontrolApiserverV1FlowSchemaOutput =
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
        distinguisherMethod: Schema.optional(
          Schema.Struct({
            type: Schema.String,
          }),
        ),
        matchingPrecedence: Schema.optional(Schema.Number),
        priorityLevelConfiguration: Schema.Struct({
          name: Schema.String,
        }),
        rules: Schema.optional(
          Schema.Array(
            Schema.Struct({
              nonResourceRules: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    nonResourceURLs: Schema.Array(Schema.String),
                    verbs: Schema.Array(Schema.String),
                  }),
                ),
              ),
              resourceRules: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    apiGroups: Schema.Array(Schema.String),
                    clusterScope: Schema.optional(Schema.Boolean),
                    namespaces: Schema.optional(Schema.Array(Schema.String)),
                    resources: Schema.Array(Schema.String),
                    verbs: Schema.Array(Schema.String),
                  }),
                ),
              ),
              subjects: Schema.Array(
                Schema.Struct({
                  group: Schema.optional(
                    Schema.Struct({
                      name: Schema.String,
                    }),
                  ),
                  kind: Schema.String,
                  serviceAccount: Schema.optional(
                    Schema.Struct({
                      name: Schema.String,
                      namespace: Schema.String,
                    }),
                  ),
                  user: Schema.optional(
                    Schema.Struct({
                      name: Schema.String,
                    }),
                  ),
                }),
              ),
            }),
          ),
        ),
      }),
    ),
    status: Schema.optional(
      Schema.Struct({
        conditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastTransitionTime: Schema.optional(Schema.String),
              message: Schema.optional(Schema.String),
              reason: Schema.optional(Schema.String),
              status: Schema.optional(Schema.String),
              type: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
  });
export type PatchFlowcontrolApiserverV1FlowSchemaOutput =
  typeof PatchFlowcontrolApiserverV1FlowSchemaOutput.Type;

// The operation
/**
 * partially update the specified FlowSchema
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchFlowcontrolApiserverV1FlowSchema =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PatchFlowcontrolApiserverV1FlowSchemaInput,
    outputSchema: PatchFlowcontrolApiserverV1FlowSchemaOutput,
  }));
// Input Schema
export const PatchFlowcontrolApiserverV1FlowSchemaStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/flowcontrol.apiserver.k8s.io/v1/flowschemas/{name}/status",
    }),
  );
export type PatchFlowcontrolApiserverV1FlowSchemaStatusInput =
  typeof PatchFlowcontrolApiserverV1FlowSchemaStatusInput.Type;

// Output Schema
export const PatchFlowcontrolApiserverV1FlowSchemaStatusOutput =
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
        distinguisherMethod: Schema.optional(
          Schema.Struct({
            type: Schema.String,
          }),
        ),
        matchingPrecedence: Schema.optional(Schema.Number),
        priorityLevelConfiguration: Schema.Struct({
          name: Schema.String,
        }),
        rules: Schema.optional(
          Schema.Array(
            Schema.Struct({
              nonResourceRules: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    nonResourceURLs: Schema.Array(Schema.String),
                    verbs: Schema.Array(Schema.String),
                  }),
                ),
              ),
              resourceRules: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    apiGroups: Schema.Array(Schema.String),
                    clusterScope: Schema.optional(Schema.Boolean),
                    namespaces: Schema.optional(Schema.Array(Schema.String)),
                    resources: Schema.Array(Schema.String),
                    verbs: Schema.Array(Schema.String),
                  }),
                ),
              ),
              subjects: Schema.Array(
                Schema.Struct({
                  group: Schema.optional(
                    Schema.Struct({
                      name: Schema.String,
                    }),
                  ),
                  kind: Schema.String,
                  serviceAccount: Schema.optional(
                    Schema.Struct({
                      name: Schema.String,
                      namespace: Schema.String,
                    }),
                  ),
                  user: Schema.optional(
                    Schema.Struct({
                      name: Schema.String,
                    }),
                  ),
                }),
              ),
            }),
          ),
        ),
      }),
    ),
    status: Schema.optional(
      Schema.Struct({
        conditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastTransitionTime: Schema.optional(Schema.String),
              message: Schema.optional(Schema.String),
              reason: Schema.optional(Schema.String),
              status: Schema.optional(Schema.String),
              type: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
  });
export type PatchFlowcontrolApiserverV1FlowSchemaStatusOutput =
  typeof PatchFlowcontrolApiserverV1FlowSchemaStatusOutput.Type;

// The operation
/**
 * partially update status of the specified FlowSchema
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchFlowcontrolApiserverV1FlowSchemaStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PatchFlowcontrolApiserverV1FlowSchemaStatusInput,
    outputSchema: PatchFlowcontrolApiserverV1FlowSchemaStatusOutput,
  }));
// Input Schema
export const PatchFlowcontrolApiserverV1PriorityLevelConfigurationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/flowcontrol.apiserver.k8s.io/v1/prioritylevelconfigurations/{name}",
    }),
  );
export type PatchFlowcontrolApiserverV1PriorityLevelConfigurationInput =
  typeof PatchFlowcontrolApiserverV1PriorityLevelConfigurationInput.Type;

// Output Schema
export const PatchFlowcontrolApiserverV1PriorityLevelConfigurationOutput =
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
        exempt: Schema.optional(
          Schema.Struct({
            lendablePercent: Schema.optional(Schema.Number),
            nominalConcurrencyShares: Schema.optional(Schema.Number),
          }),
        ),
        limited: Schema.optional(
          Schema.Struct({
            borrowingLimitPercent: Schema.optional(Schema.Number),
            lendablePercent: Schema.optional(Schema.Number),
            limitResponse: Schema.optional(
              Schema.Struct({
                queuing: Schema.optional(
                  Schema.Struct({
                    handSize: Schema.optional(Schema.Number),
                    queueLengthLimit: Schema.optional(Schema.Number),
                    queues: Schema.optional(Schema.Number),
                  }),
                ),
                type: Schema.String,
              }),
            ),
            nominalConcurrencyShares: Schema.optional(Schema.Number),
          }),
        ),
        type: Schema.String,
      }),
    ),
    status: Schema.optional(
      Schema.Struct({
        conditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastTransitionTime: Schema.optional(Schema.String),
              message: Schema.optional(Schema.String),
              reason: Schema.optional(Schema.String),
              status: Schema.optional(Schema.String),
              type: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
  });
export type PatchFlowcontrolApiserverV1PriorityLevelConfigurationOutput =
  typeof PatchFlowcontrolApiserverV1PriorityLevelConfigurationOutput.Type;

// The operation
/**
 * partially update the specified PriorityLevelConfiguration
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchFlowcontrolApiserverV1PriorityLevelConfiguration =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PatchFlowcontrolApiserverV1PriorityLevelConfigurationInput,
    outputSchema: PatchFlowcontrolApiserverV1PriorityLevelConfigurationOutput,
  }));
// Input Schema
export const PatchFlowcontrolApiserverV1PriorityLevelConfigurationStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/flowcontrol.apiserver.k8s.io/v1/prioritylevelconfigurations/{name}/status",
    }),
  );
export type PatchFlowcontrolApiserverV1PriorityLevelConfigurationStatusInput =
  typeof PatchFlowcontrolApiserverV1PriorityLevelConfigurationStatusInput.Type;

// Output Schema
export const PatchFlowcontrolApiserverV1PriorityLevelConfigurationStatusOutput =
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
        exempt: Schema.optional(
          Schema.Struct({
            lendablePercent: Schema.optional(Schema.Number),
            nominalConcurrencyShares: Schema.optional(Schema.Number),
          }),
        ),
        limited: Schema.optional(
          Schema.Struct({
            borrowingLimitPercent: Schema.optional(Schema.Number),
            lendablePercent: Schema.optional(Schema.Number),
            limitResponse: Schema.optional(
              Schema.Struct({
                queuing: Schema.optional(
                  Schema.Struct({
                    handSize: Schema.optional(Schema.Number),
                    queueLengthLimit: Schema.optional(Schema.Number),
                    queues: Schema.optional(Schema.Number),
                  }),
                ),
                type: Schema.String,
              }),
            ),
            nominalConcurrencyShares: Schema.optional(Schema.Number),
          }),
        ),
        type: Schema.String,
      }),
    ),
    status: Schema.optional(
      Schema.Struct({
        conditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastTransitionTime: Schema.optional(Schema.String),
              message: Schema.optional(Schema.String),
              reason: Schema.optional(Schema.String),
              status: Schema.optional(Schema.String),
              type: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
  });
export type PatchFlowcontrolApiserverV1PriorityLevelConfigurationStatusOutput =
  typeof PatchFlowcontrolApiserverV1PriorityLevelConfigurationStatusOutput.Type;

// The operation
/**
 * partially update status of the specified PriorityLevelConfiguration
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchFlowcontrolApiserverV1PriorityLevelConfigurationStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      PatchFlowcontrolApiserverV1PriorityLevelConfigurationStatusInput,
    outputSchema:
      PatchFlowcontrolApiserverV1PriorityLevelConfigurationStatusOutput,
  }));
// Input Schema
export const ReadFlowcontrolApiserverV1FlowSchemaInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/flowcontrol.apiserver.k8s.io/v1/flowschemas/{name}",
    }),
  );
export type ReadFlowcontrolApiserverV1FlowSchemaInput =
  typeof ReadFlowcontrolApiserverV1FlowSchemaInput.Type;

// Output Schema
export const ReadFlowcontrolApiserverV1FlowSchemaOutput =
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
        distinguisherMethod: Schema.optional(
          Schema.Struct({
            type: Schema.String,
          }),
        ),
        matchingPrecedence: Schema.optional(Schema.Number),
        priorityLevelConfiguration: Schema.Struct({
          name: Schema.String,
        }),
        rules: Schema.optional(
          Schema.Array(
            Schema.Struct({
              nonResourceRules: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    nonResourceURLs: Schema.Array(Schema.String),
                    verbs: Schema.Array(Schema.String),
                  }),
                ),
              ),
              resourceRules: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    apiGroups: Schema.Array(Schema.String),
                    clusterScope: Schema.optional(Schema.Boolean),
                    namespaces: Schema.optional(Schema.Array(Schema.String)),
                    resources: Schema.Array(Schema.String),
                    verbs: Schema.Array(Schema.String),
                  }),
                ),
              ),
              subjects: Schema.Array(
                Schema.Struct({
                  group: Schema.optional(
                    Schema.Struct({
                      name: Schema.String,
                    }),
                  ),
                  kind: Schema.String,
                  serviceAccount: Schema.optional(
                    Schema.Struct({
                      name: Schema.String,
                      namespace: Schema.String,
                    }),
                  ),
                  user: Schema.optional(
                    Schema.Struct({
                      name: Schema.String,
                    }),
                  ),
                }),
              ),
            }),
          ),
        ),
      }),
    ),
    status: Schema.optional(
      Schema.Struct({
        conditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastTransitionTime: Schema.optional(Schema.String),
              message: Schema.optional(Schema.String),
              reason: Schema.optional(Schema.String),
              status: Schema.optional(Schema.String),
              type: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
  });
export type ReadFlowcontrolApiserverV1FlowSchemaOutput =
  typeof ReadFlowcontrolApiserverV1FlowSchemaOutput.Type;

// The operation
/**
 * read the specified FlowSchema
 */
export const readFlowcontrolApiserverV1FlowSchema =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReadFlowcontrolApiserverV1FlowSchemaInput,
    outputSchema: ReadFlowcontrolApiserverV1FlowSchemaOutput,
  }));
// Input Schema
export const ReadFlowcontrolApiserverV1FlowSchemaStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/flowcontrol.apiserver.k8s.io/v1/flowschemas/{name}/status",
    }),
  );
export type ReadFlowcontrolApiserverV1FlowSchemaStatusInput =
  typeof ReadFlowcontrolApiserverV1FlowSchemaStatusInput.Type;

// Output Schema
export const ReadFlowcontrolApiserverV1FlowSchemaStatusOutput =
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
        distinguisherMethod: Schema.optional(
          Schema.Struct({
            type: Schema.String,
          }),
        ),
        matchingPrecedence: Schema.optional(Schema.Number),
        priorityLevelConfiguration: Schema.Struct({
          name: Schema.String,
        }),
        rules: Schema.optional(
          Schema.Array(
            Schema.Struct({
              nonResourceRules: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    nonResourceURLs: Schema.Array(Schema.String),
                    verbs: Schema.Array(Schema.String),
                  }),
                ),
              ),
              resourceRules: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    apiGroups: Schema.Array(Schema.String),
                    clusterScope: Schema.optional(Schema.Boolean),
                    namespaces: Schema.optional(Schema.Array(Schema.String)),
                    resources: Schema.Array(Schema.String),
                    verbs: Schema.Array(Schema.String),
                  }),
                ),
              ),
              subjects: Schema.Array(
                Schema.Struct({
                  group: Schema.optional(
                    Schema.Struct({
                      name: Schema.String,
                    }),
                  ),
                  kind: Schema.String,
                  serviceAccount: Schema.optional(
                    Schema.Struct({
                      name: Schema.String,
                      namespace: Schema.String,
                    }),
                  ),
                  user: Schema.optional(
                    Schema.Struct({
                      name: Schema.String,
                    }),
                  ),
                }),
              ),
            }),
          ),
        ),
      }),
    ),
    status: Schema.optional(
      Schema.Struct({
        conditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastTransitionTime: Schema.optional(Schema.String),
              message: Schema.optional(Schema.String),
              reason: Schema.optional(Schema.String),
              status: Schema.optional(Schema.String),
              type: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
  });
export type ReadFlowcontrolApiserverV1FlowSchemaStatusOutput =
  typeof ReadFlowcontrolApiserverV1FlowSchemaStatusOutput.Type;

// The operation
/**
 * read status of the specified FlowSchema
 */
export const readFlowcontrolApiserverV1FlowSchemaStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReadFlowcontrolApiserverV1FlowSchemaStatusInput,
    outputSchema: ReadFlowcontrolApiserverV1FlowSchemaStatusOutput,
  }));
// Input Schema
export const ReadFlowcontrolApiserverV1PriorityLevelConfigurationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/flowcontrol.apiserver.k8s.io/v1/prioritylevelconfigurations/{name}",
    }),
  );
export type ReadFlowcontrolApiserverV1PriorityLevelConfigurationInput =
  typeof ReadFlowcontrolApiserverV1PriorityLevelConfigurationInput.Type;

// Output Schema
export const ReadFlowcontrolApiserverV1PriorityLevelConfigurationOutput =
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
        exempt: Schema.optional(
          Schema.Struct({
            lendablePercent: Schema.optional(Schema.Number),
            nominalConcurrencyShares: Schema.optional(Schema.Number),
          }),
        ),
        limited: Schema.optional(
          Schema.Struct({
            borrowingLimitPercent: Schema.optional(Schema.Number),
            lendablePercent: Schema.optional(Schema.Number),
            limitResponse: Schema.optional(
              Schema.Struct({
                queuing: Schema.optional(
                  Schema.Struct({
                    handSize: Schema.optional(Schema.Number),
                    queueLengthLimit: Schema.optional(Schema.Number),
                    queues: Schema.optional(Schema.Number),
                  }),
                ),
                type: Schema.String,
              }),
            ),
            nominalConcurrencyShares: Schema.optional(Schema.Number),
          }),
        ),
        type: Schema.String,
      }),
    ),
    status: Schema.optional(
      Schema.Struct({
        conditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastTransitionTime: Schema.optional(Schema.String),
              message: Schema.optional(Schema.String),
              reason: Schema.optional(Schema.String),
              status: Schema.optional(Schema.String),
              type: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
  });
export type ReadFlowcontrolApiserverV1PriorityLevelConfigurationOutput =
  typeof ReadFlowcontrolApiserverV1PriorityLevelConfigurationOutput.Type;

// The operation
/**
 * read the specified PriorityLevelConfiguration
 */
export const readFlowcontrolApiserverV1PriorityLevelConfiguration =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReadFlowcontrolApiserverV1PriorityLevelConfigurationInput,
    outputSchema: ReadFlowcontrolApiserverV1PriorityLevelConfigurationOutput,
  }));
// Input Schema
export const ReadFlowcontrolApiserverV1PriorityLevelConfigurationStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/flowcontrol.apiserver.k8s.io/v1/prioritylevelconfigurations/{name}/status",
    }),
  );
export type ReadFlowcontrolApiserverV1PriorityLevelConfigurationStatusInput =
  typeof ReadFlowcontrolApiserverV1PriorityLevelConfigurationStatusInput.Type;

// Output Schema
export const ReadFlowcontrolApiserverV1PriorityLevelConfigurationStatusOutput =
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
        exempt: Schema.optional(
          Schema.Struct({
            lendablePercent: Schema.optional(Schema.Number),
            nominalConcurrencyShares: Schema.optional(Schema.Number),
          }),
        ),
        limited: Schema.optional(
          Schema.Struct({
            borrowingLimitPercent: Schema.optional(Schema.Number),
            lendablePercent: Schema.optional(Schema.Number),
            limitResponse: Schema.optional(
              Schema.Struct({
                queuing: Schema.optional(
                  Schema.Struct({
                    handSize: Schema.optional(Schema.Number),
                    queueLengthLimit: Schema.optional(Schema.Number),
                    queues: Schema.optional(Schema.Number),
                  }),
                ),
                type: Schema.String,
              }),
            ),
            nominalConcurrencyShares: Schema.optional(Schema.Number),
          }),
        ),
        type: Schema.String,
      }),
    ),
    status: Schema.optional(
      Schema.Struct({
        conditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastTransitionTime: Schema.optional(Schema.String),
              message: Schema.optional(Schema.String),
              reason: Schema.optional(Schema.String),
              status: Schema.optional(Schema.String),
              type: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
  });
export type ReadFlowcontrolApiserverV1PriorityLevelConfigurationStatusOutput =
  typeof ReadFlowcontrolApiserverV1PriorityLevelConfigurationStatusOutput.Type;

// The operation
/**
 * read status of the specified PriorityLevelConfiguration
 */
export const readFlowcontrolApiserverV1PriorityLevelConfigurationStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      ReadFlowcontrolApiserverV1PriorityLevelConfigurationStatusInput,
    outputSchema:
      ReadFlowcontrolApiserverV1PriorityLevelConfigurationStatusOutput,
  }));
// Input Schema
export const ReplaceFlowcontrolApiserverV1FlowSchemaInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/flowcontrol.apiserver.k8s.io/v1/flowschemas/{name}",
    }),
  );
export type ReplaceFlowcontrolApiserverV1FlowSchemaInput =
  typeof ReplaceFlowcontrolApiserverV1FlowSchemaInput.Type;

// Output Schema
export const ReplaceFlowcontrolApiserverV1FlowSchemaOutput =
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
        distinguisherMethod: Schema.optional(
          Schema.Struct({
            type: Schema.String,
          }),
        ),
        matchingPrecedence: Schema.optional(Schema.Number),
        priorityLevelConfiguration: Schema.Struct({
          name: Schema.String,
        }),
        rules: Schema.optional(
          Schema.Array(
            Schema.Struct({
              nonResourceRules: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    nonResourceURLs: Schema.Array(Schema.String),
                    verbs: Schema.Array(Schema.String),
                  }),
                ),
              ),
              resourceRules: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    apiGroups: Schema.Array(Schema.String),
                    clusterScope: Schema.optional(Schema.Boolean),
                    namespaces: Schema.optional(Schema.Array(Schema.String)),
                    resources: Schema.Array(Schema.String),
                    verbs: Schema.Array(Schema.String),
                  }),
                ),
              ),
              subjects: Schema.Array(
                Schema.Struct({
                  group: Schema.optional(
                    Schema.Struct({
                      name: Schema.String,
                    }),
                  ),
                  kind: Schema.String,
                  serviceAccount: Schema.optional(
                    Schema.Struct({
                      name: Schema.String,
                      namespace: Schema.String,
                    }),
                  ),
                  user: Schema.optional(
                    Schema.Struct({
                      name: Schema.String,
                    }),
                  ),
                }),
              ),
            }),
          ),
        ),
      }),
    ),
    status: Schema.optional(
      Schema.Struct({
        conditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastTransitionTime: Schema.optional(Schema.String),
              message: Schema.optional(Schema.String),
              reason: Schema.optional(Schema.String),
              status: Schema.optional(Schema.String),
              type: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
  });
export type ReplaceFlowcontrolApiserverV1FlowSchemaOutput =
  typeof ReplaceFlowcontrolApiserverV1FlowSchemaOutput.Type;

// The operation
/**
 * replace the specified FlowSchema
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceFlowcontrolApiserverV1FlowSchema =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReplaceFlowcontrolApiserverV1FlowSchemaInput,
    outputSchema: ReplaceFlowcontrolApiserverV1FlowSchemaOutput,
  }));
// Input Schema
export const ReplaceFlowcontrolApiserverV1FlowSchemaStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/flowcontrol.apiserver.k8s.io/v1/flowschemas/{name}/status",
    }),
  );
export type ReplaceFlowcontrolApiserverV1FlowSchemaStatusInput =
  typeof ReplaceFlowcontrolApiserverV1FlowSchemaStatusInput.Type;

// Output Schema
export const ReplaceFlowcontrolApiserverV1FlowSchemaStatusOutput =
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
        distinguisherMethod: Schema.optional(
          Schema.Struct({
            type: Schema.String,
          }),
        ),
        matchingPrecedence: Schema.optional(Schema.Number),
        priorityLevelConfiguration: Schema.Struct({
          name: Schema.String,
        }),
        rules: Schema.optional(
          Schema.Array(
            Schema.Struct({
              nonResourceRules: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    nonResourceURLs: Schema.Array(Schema.String),
                    verbs: Schema.Array(Schema.String),
                  }),
                ),
              ),
              resourceRules: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    apiGroups: Schema.Array(Schema.String),
                    clusterScope: Schema.optional(Schema.Boolean),
                    namespaces: Schema.optional(Schema.Array(Schema.String)),
                    resources: Schema.Array(Schema.String),
                    verbs: Schema.Array(Schema.String),
                  }),
                ),
              ),
              subjects: Schema.Array(
                Schema.Struct({
                  group: Schema.optional(
                    Schema.Struct({
                      name: Schema.String,
                    }),
                  ),
                  kind: Schema.String,
                  serviceAccount: Schema.optional(
                    Schema.Struct({
                      name: Schema.String,
                      namespace: Schema.String,
                    }),
                  ),
                  user: Schema.optional(
                    Schema.Struct({
                      name: Schema.String,
                    }),
                  ),
                }),
              ),
            }),
          ),
        ),
      }),
    ),
    status: Schema.optional(
      Schema.Struct({
        conditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastTransitionTime: Schema.optional(Schema.String),
              message: Schema.optional(Schema.String),
              reason: Schema.optional(Schema.String),
              status: Schema.optional(Schema.String),
              type: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
  });
export type ReplaceFlowcontrolApiserverV1FlowSchemaStatusOutput =
  typeof ReplaceFlowcontrolApiserverV1FlowSchemaStatusOutput.Type;

// The operation
/**
 * replace status of the specified FlowSchema
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceFlowcontrolApiserverV1FlowSchemaStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReplaceFlowcontrolApiserverV1FlowSchemaStatusInput,
    outputSchema: ReplaceFlowcontrolApiserverV1FlowSchemaStatusOutput,
  }));
// Input Schema
export const ReplaceFlowcontrolApiserverV1PriorityLevelConfigurationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/flowcontrol.apiserver.k8s.io/v1/prioritylevelconfigurations/{name}",
    }),
  );
export type ReplaceFlowcontrolApiserverV1PriorityLevelConfigurationInput =
  typeof ReplaceFlowcontrolApiserverV1PriorityLevelConfigurationInput.Type;

// Output Schema
export const ReplaceFlowcontrolApiserverV1PriorityLevelConfigurationOutput =
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
        exempt: Schema.optional(
          Schema.Struct({
            lendablePercent: Schema.optional(Schema.Number),
            nominalConcurrencyShares: Schema.optional(Schema.Number),
          }),
        ),
        limited: Schema.optional(
          Schema.Struct({
            borrowingLimitPercent: Schema.optional(Schema.Number),
            lendablePercent: Schema.optional(Schema.Number),
            limitResponse: Schema.optional(
              Schema.Struct({
                queuing: Schema.optional(
                  Schema.Struct({
                    handSize: Schema.optional(Schema.Number),
                    queueLengthLimit: Schema.optional(Schema.Number),
                    queues: Schema.optional(Schema.Number),
                  }),
                ),
                type: Schema.String,
              }),
            ),
            nominalConcurrencyShares: Schema.optional(Schema.Number),
          }),
        ),
        type: Schema.String,
      }),
    ),
    status: Schema.optional(
      Schema.Struct({
        conditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastTransitionTime: Schema.optional(Schema.String),
              message: Schema.optional(Schema.String),
              reason: Schema.optional(Schema.String),
              status: Schema.optional(Schema.String),
              type: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
  });
export type ReplaceFlowcontrolApiserverV1PriorityLevelConfigurationOutput =
  typeof ReplaceFlowcontrolApiserverV1PriorityLevelConfigurationOutput.Type;

// The operation
/**
 * replace the specified PriorityLevelConfiguration
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceFlowcontrolApiserverV1PriorityLevelConfiguration =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReplaceFlowcontrolApiserverV1PriorityLevelConfigurationInput,
    outputSchema: ReplaceFlowcontrolApiserverV1PriorityLevelConfigurationOutput,
  }));
// Input Schema
export const ReplaceFlowcontrolApiserverV1PriorityLevelConfigurationStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/flowcontrol.apiserver.k8s.io/v1/prioritylevelconfigurations/{name}/status",
    }),
  );
export type ReplaceFlowcontrolApiserverV1PriorityLevelConfigurationStatusInput =
  typeof ReplaceFlowcontrolApiserverV1PriorityLevelConfigurationStatusInput.Type;

// Output Schema
export const ReplaceFlowcontrolApiserverV1PriorityLevelConfigurationStatusOutput =
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
        exempt: Schema.optional(
          Schema.Struct({
            lendablePercent: Schema.optional(Schema.Number),
            nominalConcurrencyShares: Schema.optional(Schema.Number),
          }),
        ),
        limited: Schema.optional(
          Schema.Struct({
            borrowingLimitPercent: Schema.optional(Schema.Number),
            lendablePercent: Schema.optional(Schema.Number),
            limitResponse: Schema.optional(
              Schema.Struct({
                queuing: Schema.optional(
                  Schema.Struct({
                    handSize: Schema.optional(Schema.Number),
                    queueLengthLimit: Schema.optional(Schema.Number),
                    queues: Schema.optional(Schema.Number),
                  }),
                ),
                type: Schema.String,
              }),
            ),
            nominalConcurrencyShares: Schema.optional(Schema.Number),
          }),
        ),
        type: Schema.String,
      }),
    ),
    status: Schema.optional(
      Schema.Struct({
        conditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastTransitionTime: Schema.optional(Schema.String),
              message: Schema.optional(Schema.String),
              reason: Schema.optional(Schema.String),
              status: Schema.optional(Schema.String),
              type: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
  });
export type ReplaceFlowcontrolApiserverV1PriorityLevelConfigurationStatusOutput =
  typeof ReplaceFlowcontrolApiserverV1PriorityLevelConfigurationStatusOutput.Type;

// The operation
/**
 * replace status of the specified PriorityLevelConfiguration
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceFlowcontrolApiserverV1PriorityLevelConfigurationStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      ReplaceFlowcontrolApiserverV1PriorityLevelConfigurationStatusInput,
    outputSchema:
      ReplaceFlowcontrolApiserverV1PriorityLevelConfigurationStatusOutput,
  }));
// Input Schema
export const WatchFlowcontrolApiserverV1FlowSchemaInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/flowcontrol.apiserver.k8s.io/v1/watch/flowschemas/{name}",
    }),
  );
export type WatchFlowcontrolApiserverV1FlowSchemaInput =
  typeof WatchFlowcontrolApiserverV1FlowSchemaInput.Type;

// Output Schema
export const WatchFlowcontrolApiserverV1FlowSchemaOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchFlowcontrolApiserverV1FlowSchemaOutput =
  typeof WatchFlowcontrolApiserverV1FlowSchemaOutput.Type;

// The operation
/**
 * watch changes to an object of kind FlowSchema. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
 */
export const watchFlowcontrolApiserverV1FlowSchema =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchFlowcontrolApiserverV1FlowSchemaInput,
    outputSchema: WatchFlowcontrolApiserverV1FlowSchemaOutput,
  }));
// Input Schema
export const WatchFlowcontrolApiserverV1FlowSchemaListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/flowcontrol.apiserver.k8s.io/v1/watch/flowschemas",
    }),
  );
export type WatchFlowcontrolApiserverV1FlowSchemaListInput =
  typeof WatchFlowcontrolApiserverV1FlowSchemaListInput.Type;

// Output Schema
export const WatchFlowcontrolApiserverV1FlowSchemaListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchFlowcontrolApiserverV1FlowSchemaListOutput =
  typeof WatchFlowcontrolApiserverV1FlowSchemaListOutput.Type;

// The operation
/**
 * watch individual changes to a list of FlowSchema. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchFlowcontrolApiserverV1FlowSchemaList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchFlowcontrolApiserverV1FlowSchemaListInput,
    outputSchema: WatchFlowcontrolApiserverV1FlowSchemaListOutput,
  }));
// Input Schema
export const WatchFlowcontrolApiserverV1PriorityLevelConfigurationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/flowcontrol.apiserver.k8s.io/v1/watch/prioritylevelconfigurations/{name}",
    }),
  );
export type WatchFlowcontrolApiserverV1PriorityLevelConfigurationInput =
  typeof WatchFlowcontrolApiserverV1PriorityLevelConfigurationInput.Type;

// Output Schema
export const WatchFlowcontrolApiserverV1PriorityLevelConfigurationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchFlowcontrolApiserverV1PriorityLevelConfigurationOutput =
  typeof WatchFlowcontrolApiserverV1PriorityLevelConfigurationOutput.Type;

// The operation
/**
 * watch changes to an object of kind PriorityLevelConfiguration. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
 */
export const watchFlowcontrolApiserverV1PriorityLevelConfiguration =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchFlowcontrolApiserverV1PriorityLevelConfigurationInput,
    outputSchema: WatchFlowcontrolApiserverV1PriorityLevelConfigurationOutput,
  }));
// Input Schema
export const WatchFlowcontrolApiserverV1PriorityLevelConfigurationListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/flowcontrol.apiserver.k8s.io/v1/watch/prioritylevelconfigurations",
    }),
  );
export type WatchFlowcontrolApiserverV1PriorityLevelConfigurationListInput =
  typeof WatchFlowcontrolApiserverV1PriorityLevelConfigurationListInput.Type;

// Output Schema
export const WatchFlowcontrolApiserverV1PriorityLevelConfigurationListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchFlowcontrolApiserverV1PriorityLevelConfigurationListOutput =
  typeof WatchFlowcontrolApiserverV1PriorityLevelConfigurationListOutput.Type;

// The operation
/**
 * watch individual changes to a list of PriorityLevelConfiguration. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchFlowcontrolApiserverV1PriorityLevelConfigurationList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchFlowcontrolApiserverV1PriorityLevelConfigurationListInput,
    outputSchema:
      WatchFlowcontrolApiserverV1PriorityLevelConfigurationListOutput,
  }));
