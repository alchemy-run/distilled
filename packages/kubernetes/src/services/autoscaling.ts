/**
 * Kubernetes Autoscaling API
 *
 * Generated from the Kubernetes OpenAPI spec.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";

// Input Schema
export const CreateAutoscalingV1NamespacedHorizontalPodAutoscalerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/apis/autoscaling/v1/namespaces/{namespace}/horizontalpodautoscalers",
    }),
  );
export type CreateAutoscalingV1NamespacedHorizontalPodAutoscalerInput =
  typeof CreateAutoscalingV1NamespacedHorizontalPodAutoscalerInput.Type;

// Output Schema
export const CreateAutoscalingV1NamespacedHorizontalPodAutoscalerOutput =
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
      maxReplicas: Schema.Number,
      minReplicas: Schema.optional(Schema.Number),
      scaleTargetRef: Schema.Struct({
        apiVersion: Schema.optional(Schema.String),
        kind: Schema.String,
        name: Schema.String,
      }),
      targetCPUUtilizationPercentage: Schema.optional(Schema.Number),
    }),
    status: Schema.optional(
      Schema.Struct({
        currentCPUUtilizationPercentage: Schema.optional(Schema.Number),
        currentReplicas: Schema.Number,
        desiredReplicas: Schema.Number,
        lastScaleTime: Schema.optional(Schema.String),
        observedGeneration: Schema.optional(Schema.Number),
      }),
    ),
  });
export type CreateAutoscalingV1NamespacedHorizontalPodAutoscalerOutput =
  typeof CreateAutoscalingV1NamespacedHorizontalPodAutoscalerOutput.Type;

// The operation
/**
 * create a HorizontalPodAutoscaler
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const createAutoscalingV1NamespacedHorizontalPodAutoscaler =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateAutoscalingV1NamespacedHorizontalPodAutoscalerInput,
    outputSchema: CreateAutoscalingV1NamespacedHorizontalPodAutoscalerOutput,
  }));
// Input Schema
export const CreateAutoscalingV2NamespacedHorizontalPodAutoscalerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/apis/autoscaling/v2/namespaces/{namespace}/horizontalpodautoscalers",
    }),
  );
export type CreateAutoscalingV2NamespacedHorizontalPodAutoscalerInput =
  typeof CreateAutoscalingV2NamespacedHorizontalPodAutoscalerInput.Type;

// Output Schema
export const CreateAutoscalingV2NamespacedHorizontalPodAutoscalerOutput =
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
      behavior: Schema.optional(
        Schema.Struct({
          scaleDown: Schema.optional(
            Schema.Struct({
              policies: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    periodSeconds: Schema.Number,
                    type: Schema.String,
                    value: Schema.Number,
                  }),
                ),
              ),
              selectPolicy: Schema.optional(Schema.String),
              stabilizationWindowSeconds: Schema.optional(Schema.Number),
              tolerance: Schema.optional(Schema.String),
            }),
          ),
          scaleUp: Schema.optional(
            Schema.Struct({
              policies: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    periodSeconds: Schema.Number,
                    type: Schema.String,
                    value: Schema.Number,
                  }),
                ),
              ),
              selectPolicy: Schema.optional(Schema.String),
              stabilizationWindowSeconds: Schema.optional(Schema.Number),
              tolerance: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
      maxReplicas: Schema.Number,
      metrics: Schema.optional(
        Schema.Array(
          Schema.Struct({
            containerResource: Schema.optional(
              Schema.Struct({
                container: Schema.String,
                name: Schema.String,
                target: Schema.Struct({
                  averageUtilization: Schema.optional(Schema.Number),
                  averageValue: Schema.optional(Schema.String),
                  type: Schema.String,
                  value: Schema.optional(Schema.String),
                }),
              }),
            ),
            external: Schema.optional(
              Schema.Struct({
                metric: Schema.Struct({
                  name: Schema.String,
                  selector: Schema.optional(
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
                      matchLabels: Schema.optional(
                        Schema.Record(Schema.String, Schema.String),
                      ),
                    }),
                  ),
                }),
                target: Schema.Struct({
                  averageUtilization: Schema.optional(Schema.Number),
                  averageValue: Schema.optional(Schema.String),
                  type: Schema.String,
                  value: Schema.optional(Schema.String),
                }),
              }),
            ),
            object: Schema.optional(
              Schema.Struct({
                describedObject: Schema.Struct({
                  apiVersion: Schema.optional(Schema.String),
                  kind: Schema.String,
                  name: Schema.String,
                }),
                metric: Schema.Struct({
                  name: Schema.String,
                  selector: Schema.optional(
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
                      matchLabels: Schema.optional(
                        Schema.Record(Schema.String, Schema.String),
                      ),
                    }),
                  ),
                }),
                target: Schema.Struct({
                  averageUtilization: Schema.optional(Schema.Number),
                  averageValue: Schema.optional(Schema.String),
                  type: Schema.String,
                  value: Schema.optional(Schema.String),
                }),
              }),
            ),
            pods: Schema.optional(
              Schema.Struct({
                metric: Schema.Struct({
                  name: Schema.String,
                  selector: Schema.optional(
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
                      matchLabels: Schema.optional(
                        Schema.Record(Schema.String, Schema.String),
                      ),
                    }),
                  ),
                }),
                target: Schema.Struct({
                  averageUtilization: Schema.optional(Schema.Number),
                  averageValue: Schema.optional(Schema.String),
                  type: Schema.String,
                  value: Schema.optional(Schema.String),
                }),
              }),
            ),
            resource: Schema.optional(
              Schema.Struct({
                name: Schema.String,
                target: Schema.Struct({
                  averageUtilization: Schema.optional(Schema.Number),
                  averageValue: Schema.optional(Schema.String),
                  type: Schema.String,
                  value: Schema.optional(Schema.String),
                }),
              }),
            ),
            type: Schema.String,
          }),
        ),
      ),
      minReplicas: Schema.optional(Schema.Number),
      scaleTargetRef: Schema.Struct({
        apiVersion: Schema.optional(Schema.String),
        kind: Schema.String,
        name: Schema.String,
      }),
    }),
    status: Schema.optional(
      Schema.Struct({
        conditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastTransitionTime: Schema.optional(Schema.String),
              message: Schema.optional(Schema.String),
              reason: Schema.optional(Schema.String),
              status: Schema.String,
              type: Schema.String,
            }),
          ),
        ),
        currentMetrics: Schema.optional(
          Schema.Array(
            Schema.Struct({
              containerResource: Schema.optional(
                Schema.Struct({
                  container: Schema.String,
                  current: Schema.Struct({
                    averageUtilization: Schema.optional(Schema.Number),
                    averageValue: Schema.optional(Schema.String),
                    value: Schema.optional(Schema.String),
                  }),
                  name: Schema.String,
                }),
              ),
              external: Schema.optional(
                Schema.Struct({
                  current: Schema.Struct({
                    averageUtilization: Schema.optional(Schema.Number),
                    averageValue: Schema.optional(Schema.String),
                    value: Schema.optional(Schema.String),
                  }),
                  metric: Schema.Struct({
                    name: Schema.String,
                    selector: Schema.optional(
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
                        matchLabels: Schema.optional(
                          Schema.Record(Schema.String, Schema.String),
                        ),
                      }),
                    ),
                  }),
                }),
              ),
              object: Schema.optional(
                Schema.Struct({
                  current: Schema.Struct({
                    averageUtilization: Schema.optional(Schema.Number),
                    averageValue: Schema.optional(Schema.String),
                    value: Schema.optional(Schema.String),
                  }),
                  describedObject: Schema.Struct({
                    apiVersion: Schema.optional(Schema.String),
                    kind: Schema.String,
                    name: Schema.String,
                  }),
                  metric: Schema.Struct({
                    name: Schema.String,
                    selector: Schema.optional(
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
                        matchLabels: Schema.optional(
                          Schema.Record(Schema.String, Schema.String),
                        ),
                      }),
                    ),
                  }),
                }),
              ),
              pods: Schema.optional(
                Schema.Struct({
                  current: Schema.Struct({
                    averageUtilization: Schema.optional(Schema.Number),
                    averageValue: Schema.optional(Schema.String),
                    value: Schema.optional(Schema.String),
                  }),
                  metric: Schema.Struct({
                    name: Schema.String,
                    selector: Schema.optional(
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
                        matchLabels: Schema.optional(
                          Schema.Record(Schema.String, Schema.String),
                        ),
                      }),
                    ),
                  }),
                }),
              ),
              resource: Schema.optional(
                Schema.Struct({
                  current: Schema.Struct({
                    averageUtilization: Schema.optional(Schema.Number),
                    averageValue: Schema.optional(Schema.String),
                    value: Schema.optional(Schema.String),
                  }),
                  name: Schema.String,
                }),
              ),
              type: Schema.String,
            }),
          ),
        ),
        currentReplicas: Schema.optional(Schema.Number),
        desiredReplicas: Schema.Number,
        lastScaleTime: Schema.optional(Schema.String),
        observedGeneration: Schema.optional(Schema.Number),
      }),
    ),
  });
export type CreateAutoscalingV2NamespacedHorizontalPodAutoscalerOutput =
  typeof CreateAutoscalingV2NamespacedHorizontalPodAutoscalerOutput.Type;

// The operation
/**
 * create a HorizontalPodAutoscaler
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const createAutoscalingV2NamespacedHorizontalPodAutoscaler =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateAutoscalingV2NamespacedHorizontalPodAutoscalerInput,
    outputSchema: CreateAutoscalingV2NamespacedHorizontalPodAutoscalerOutput,
  }));
// Input Schema
export const DeleteAutoscalingV1CollectionNamespacedHorizontalPodAutoscalerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/autoscaling/v1/namespaces/{namespace}/horizontalpodautoscalers",
    }),
  );
export type DeleteAutoscalingV1CollectionNamespacedHorizontalPodAutoscalerInput =
  typeof DeleteAutoscalingV1CollectionNamespacedHorizontalPodAutoscalerInput.Type;

// Output Schema
export const DeleteAutoscalingV1CollectionNamespacedHorizontalPodAutoscalerOutput =
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
export type DeleteAutoscalingV1CollectionNamespacedHorizontalPodAutoscalerOutput =
  typeof DeleteAutoscalingV1CollectionNamespacedHorizontalPodAutoscalerOutput.Type;

// The operation
/**
 * delete collection of HorizontalPodAutoscaler
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteAutoscalingV1CollectionNamespacedHorizontalPodAutoscaler =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      DeleteAutoscalingV1CollectionNamespacedHorizontalPodAutoscalerInput,
    outputSchema:
      DeleteAutoscalingV1CollectionNamespacedHorizontalPodAutoscalerOutput,
  }));
// Input Schema
export const DeleteAutoscalingV1NamespacedHorizontalPodAutoscalerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/autoscaling/v1/namespaces/{namespace}/horizontalpodautoscalers/{name}",
    }),
  );
export type DeleteAutoscalingV1NamespacedHorizontalPodAutoscalerInput =
  typeof DeleteAutoscalingV1NamespacedHorizontalPodAutoscalerInput.Type;

// Output Schema
export const DeleteAutoscalingV1NamespacedHorizontalPodAutoscalerOutput =
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
export type DeleteAutoscalingV1NamespacedHorizontalPodAutoscalerOutput =
  typeof DeleteAutoscalingV1NamespacedHorizontalPodAutoscalerOutput.Type;

// The operation
/**
 * delete a HorizontalPodAutoscaler
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteAutoscalingV1NamespacedHorizontalPodAutoscaler =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteAutoscalingV1NamespacedHorizontalPodAutoscalerInput,
    outputSchema: DeleteAutoscalingV1NamespacedHorizontalPodAutoscalerOutput,
  }));
// Input Schema
export const DeleteAutoscalingV2CollectionNamespacedHorizontalPodAutoscalerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/autoscaling/v2/namespaces/{namespace}/horizontalpodautoscalers",
    }),
  );
export type DeleteAutoscalingV2CollectionNamespacedHorizontalPodAutoscalerInput =
  typeof DeleteAutoscalingV2CollectionNamespacedHorizontalPodAutoscalerInput.Type;

// Output Schema
export const DeleteAutoscalingV2CollectionNamespacedHorizontalPodAutoscalerOutput =
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
export type DeleteAutoscalingV2CollectionNamespacedHorizontalPodAutoscalerOutput =
  typeof DeleteAutoscalingV2CollectionNamespacedHorizontalPodAutoscalerOutput.Type;

// The operation
/**
 * delete collection of HorizontalPodAutoscaler
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteAutoscalingV2CollectionNamespacedHorizontalPodAutoscaler =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      DeleteAutoscalingV2CollectionNamespacedHorizontalPodAutoscalerInput,
    outputSchema:
      DeleteAutoscalingV2CollectionNamespacedHorizontalPodAutoscalerOutput,
  }));
// Input Schema
export const DeleteAutoscalingV2NamespacedHorizontalPodAutoscalerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/autoscaling/v2/namespaces/{namespace}/horizontalpodautoscalers/{name}",
    }),
  );
export type DeleteAutoscalingV2NamespacedHorizontalPodAutoscalerInput =
  typeof DeleteAutoscalingV2NamespacedHorizontalPodAutoscalerInput.Type;

// Output Schema
export const DeleteAutoscalingV2NamespacedHorizontalPodAutoscalerOutput =
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
export type DeleteAutoscalingV2NamespacedHorizontalPodAutoscalerOutput =
  typeof DeleteAutoscalingV2NamespacedHorizontalPodAutoscalerOutput.Type;

// The operation
/**
 * delete a HorizontalPodAutoscaler
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteAutoscalingV2NamespacedHorizontalPodAutoscaler =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteAutoscalingV2NamespacedHorizontalPodAutoscalerInput,
    outputSchema: DeleteAutoscalingV2NamespacedHorizontalPodAutoscalerOutput,
  }));
// Input Schema
export const GetAutoscalingAPIGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/apis/autoscaling/" }),
  );
export type GetAutoscalingAPIGroupInput =
  typeof GetAutoscalingAPIGroupInput.Type;

// Output Schema
export const GetAutoscalingAPIGroupOutput =
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
export type GetAutoscalingAPIGroupOutput =
  typeof GetAutoscalingAPIGroupOutput.Type;

// The operation
/**
 * get information of a group
 */
export const getAutoscalingAPIGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetAutoscalingAPIGroupInput,
    outputSchema: GetAutoscalingAPIGroupOutput,
  }),
);
// Input Schema
export const GetAutoscalingV1APIResourcesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/apis/autoscaling/v1/" }),
  );
export type GetAutoscalingV1APIResourcesInput =
  typeof GetAutoscalingV1APIResourcesInput.Type;

// Output Schema
export const GetAutoscalingV1APIResourcesOutput =
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
export type GetAutoscalingV1APIResourcesOutput =
  typeof GetAutoscalingV1APIResourcesOutput.Type;

// The operation
/**
 * get available resources
 */
export const getAutoscalingV1APIResources =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetAutoscalingV1APIResourcesInput,
    outputSchema: GetAutoscalingV1APIResourcesOutput,
  }));
// Input Schema
export const GetAutoscalingV2APIResourcesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/apis/autoscaling/v2/" }),
  );
export type GetAutoscalingV2APIResourcesInput =
  typeof GetAutoscalingV2APIResourcesInput.Type;

// Output Schema
export const GetAutoscalingV2APIResourcesOutput =
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
export type GetAutoscalingV2APIResourcesOutput =
  typeof GetAutoscalingV2APIResourcesOutput.Type;

// The operation
/**
 * get available resources
 */
export const getAutoscalingV2APIResources =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetAutoscalingV2APIResourcesInput,
    outputSchema: GetAutoscalingV2APIResourcesOutput,
  }));
// Input Schema
export const ListAutoscalingV1HorizontalPodAutoscalerForAllNamespacesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/autoscaling/v1/horizontalpodautoscalers",
    }),
  );
export type ListAutoscalingV1HorizontalPodAutoscalerForAllNamespacesInput =
  typeof ListAutoscalingV1HorizontalPodAutoscalerForAllNamespacesInput.Type;

// Output Schema
export const ListAutoscalingV1HorizontalPodAutoscalerForAllNamespacesOutput =
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
          maxReplicas: Schema.Number,
          minReplicas: Schema.optional(Schema.Number),
          scaleTargetRef: Schema.Struct({
            apiVersion: Schema.optional(Schema.String),
            kind: Schema.String,
            name: Schema.String,
          }),
          targetCPUUtilizationPercentage: Schema.optional(Schema.Number),
        }),
        status: Schema.optional(
          Schema.Struct({
            currentCPUUtilizationPercentage: Schema.optional(Schema.Number),
            currentReplicas: Schema.Number,
            desiredReplicas: Schema.Number,
            lastScaleTime: Schema.optional(Schema.String),
            observedGeneration: Schema.optional(Schema.Number),
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
export type ListAutoscalingV1HorizontalPodAutoscalerForAllNamespacesOutput =
  typeof ListAutoscalingV1HorizontalPodAutoscalerForAllNamespacesOutput.Type;

// The operation
/**
 * list or watch objects of kind HorizontalPodAutoscaler
 */
export const listAutoscalingV1HorizontalPodAutoscalerForAllNamespaces =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListAutoscalingV1HorizontalPodAutoscalerForAllNamespacesInput,
    outputSchema:
      ListAutoscalingV1HorizontalPodAutoscalerForAllNamespacesOutput,
  }));
// Input Schema
export const ListAutoscalingV1NamespacedHorizontalPodAutoscalerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/autoscaling/v1/namespaces/{namespace}/horizontalpodautoscalers",
    }),
  );
export type ListAutoscalingV1NamespacedHorizontalPodAutoscalerInput =
  typeof ListAutoscalingV1NamespacedHorizontalPodAutoscalerInput.Type;

// Output Schema
export const ListAutoscalingV1NamespacedHorizontalPodAutoscalerOutput =
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
          maxReplicas: Schema.Number,
          minReplicas: Schema.optional(Schema.Number),
          scaleTargetRef: Schema.Struct({
            apiVersion: Schema.optional(Schema.String),
            kind: Schema.String,
            name: Schema.String,
          }),
          targetCPUUtilizationPercentage: Schema.optional(Schema.Number),
        }),
        status: Schema.optional(
          Schema.Struct({
            currentCPUUtilizationPercentage: Schema.optional(Schema.Number),
            currentReplicas: Schema.Number,
            desiredReplicas: Schema.Number,
            lastScaleTime: Schema.optional(Schema.String),
            observedGeneration: Schema.optional(Schema.Number),
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
export type ListAutoscalingV1NamespacedHorizontalPodAutoscalerOutput =
  typeof ListAutoscalingV1NamespacedHorizontalPodAutoscalerOutput.Type;

// The operation
/**
 * list or watch objects of kind HorizontalPodAutoscaler
 */
export const listAutoscalingV1NamespacedHorizontalPodAutoscaler =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListAutoscalingV1NamespacedHorizontalPodAutoscalerInput,
    outputSchema: ListAutoscalingV1NamespacedHorizontalPodAutoscalerOutput,
  }));
// Input Schema
export const ListAutoscalingV2HorizontalPodAutoscalerForAllNamespacesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/autoscaling/v2/horizontalpodautoscalers",
    }),
  );
export type ListAutoscalingV2HorizontalPodAutoscalerForAllNamespacesInput =
  typeof ListAutoscalingV2HorizontalPodAutoscalerForAllNamespacesInput.Type;

// Output Schema
export const ListAutoscalingV2HorizontalPodAutoscalerForAllNamespacesOutput =
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
          behavior: Schema.optional(
            Schema.Struct({
              scaleDown: Schema.optional(
                Schema.Struct({
                  policies: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        periodSeconds: Schema.Number,
                        type: Schema.String,
                        value: Schema.Number,
                      }),
                    ),
                  ),
                  selectPolicy: Schema.optional(Schema.String),
                  stabilizationWindowSeconds: Schema.optional(Schema.Number),
                  tolerance: Schema.optional(Schema.String),
                }),
              ),
              scaleUp: Schema.optional(
                Schema.Struct({
                  policies: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        periodSeconds: Schema.Number,
                        type: Schema.String,
                        value: Schema.Number,
                      }),
                    ),
                  ),
                  selectPolicy: Schema.optional(Schema.String),
                  stabilizationWindowSeconds: Schema.optional(Schema.Number),
                  tolerance: Schema.optional(Schema.String),
                }),
              ),
            }),
          ),
          maxReplicas: Schema.Number,
          metrics: Schema.optional(
            Schema.Array(
              Schema.Struct({
                containerResource: Schema.optional(
                  Schema.Struct({
                    container: Schema.String,
                    name: Schema.String,
                    target: Schema.Struct({
                      averageUtilization: Schema.optional(Schema.Number),
                      averageValue: Schema.optional(Schema.String),
                      type: Schema.String,
                      value: Schema.optional(Schema.String),
                    }),
                  }),
                ),
                external: Schema.optional(
                  Schema.Struct({
                    metric: Schema.Struct({
                      name: Schema.String,
                      selector: Schema.optional(
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
                          matchLabels: Schema.optional(
                            Schema.Record(Schema.String, Schema.String),
                          ),
                        }),
                      ),
                    }),
                    target: Schema.Struct({
                      averageUtilization: Schema.optional(Schema.Number),
                      averageValue: Schema.optional(Schema.String),
                      type: Schema.String,
                      value: Schema.optional(Schema.String),
                    }),
                  }),
                ),
                object: Schema.optional(
                  Schema.Struct({
                    describedObject: Schema.Struct({
                      apiVersion: Schema.optional(Schema.String),
                      kind: Schema.String,
                      name: Schema.String,
                    }),
                    metric: Schema.Struct({
                      name: Schema.String,
                      selector: Schema.optional(
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
                          matchLabels: Schema.optional(
                            Schema.Record(Schema.String, Schema.String),
                          ),
                        }),
                      ),
                    }),
                    target: Schema.Struct({
                      averageUtilization: Schema.optional(Schema.Number),
                      averageValue: Schema.optional(Schema.String),
                      type: Schema.String,
                      value: Schema.optional(Schema.String),
                    }),
                  }),
                ),
                pods: Schema.optional(
                  Schema.Struct({
                    metric: Schema.Struct({
                      name: Schema.String,
                      selector: Schema.optional(
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
                          matchLabels: Schema.optional(
                            Schema.Record(Schema.String, Schema.String),
                          ),
                        }),
                      ),
                    }),
                    target: Schema.Struct({
                      averageUtilization: Schema.optional(Schema.Number),
                      averageValue: Schema.optional(Schema.String),
                      type: Schema.String,
                      value: Schema.optional(Schema.String),
                    }),
                  }),
                ),
                resource: Schema.optional(
                  Schema.Struct({
                    name: Schema.String,
                    target: Schema.Struct({
                      averageUtilization: Schema.optional(Schema.Number),
                      averageValue: Schema.optional(Schema.String),
                      type: Schema.String,
                      value: Schema.optional(Schema.String),
                    }),
                  }),
                ),
                type: Schema.String,
              }),
            ),
          ),
          minReplicas: Schema.optional(Schema.Number),
          scaleTargetRef: Schema.Struct({
            apiVersion: Schema.optional(Schema.String),
            kind: Schema.String,
            name: Schema.String,
          }),
        }),
        status: Schema.optional(
          Schema.Struct({
            conditions: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  lastTransitionTime: Schema.optional(Schema.String),
                  message: Schema.optional(Schema.String),
                  reason: Schema.optional(Schema.String),
                  status: Schema.String,
                  type: Schema.String,
                }),
              ),
            ),
            currentMetrics: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  containerResource: Schema.optional(
                    Schema.Struct({
                      container: Schema.String,
                      current: Schema.Struct({
                        averageUtilization: Schema.optional(Schema.Number),
                        averageValue: Schema.optional(Schema.String),
                        value: Schema.optional(Schema.String),
                      }),
                      name: Schema.String,
                    }),
                  ),
                  external: Schema.optional(
                    Schema.Struct({
                      current: Schema.Struct({
                        averageUtilization: Schema.optional(Schema.Number),
                        averageValue: Schema.optional(Schema.String),
                        value: Schema.optional(Schema.String),
                      }),
                      metric: Schema.Struct({
                        name: Schema.String,
                        selector: Schema.optional(
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
                            matchLabels: Schema.optional(
                              Schema.Record(Schema.String, Schema.String),
                            ),
                          }),
                        ),
                      }),
                    }),
                  ),
                  object: Schema.optional(
                    Schema.Struct({
                      current: Schema.Struct({
                        averageUtilization: Schema.optional(Schema.Number),
                        averageValue: Schema.optional(Schema.String),
                        value: Schema.optional(Schema.String),
                      }),
                      describedObject: Schema.Struct({
                        apiVersion: Schema.optional(Schema.String),
                        kind: Schema.String,
                        name: Schema.String,
                      }),
                      metric: Schema.Struct({
                        name: Schema.String,
                        selector: Schema.optional(
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
                            matchLabels: Schema.optional(
                              Schema.Record(Schema.String, Schema.String),
                            ),
                          }),
                        ),
                      }),
                    }),
                  ),
                  pods: Schema.optional(
                    Schema.Struct({
                      current: Schema.Struct({
                        averageUtilization: Schema.optional(Schema.Number),
                        averageValue: Schema.optional(Schema.String),
                        value: Schema.optional(Schema.String),
                      }),
                      metric: Schema.Struct({
                        name: Schema.String,
                        selector: Schema.optional(
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
                            matchLabels: Schema.optional(
                              Schema.Record(Schema.String, Schema.String),
                            ),
                          }),
                        ),
                      }),
                    }),
                  ),
                  resource: Schema.optional(
                    Schema.Struct({
                      current: Schema.Struct({
                        averageUtilization: Schema.optional(Schema.Number),
                        averageValue: Schema.optional(Schema.String),
                        value: Schema.optional(Schema.String),
                      }),
                      name: Schema.String,
                    }),
                  ),
                  type: Schema.String,
                }),
              ),
            ),
            currentReplicas: Schema.optional(Schema.Number),
            desiredReplicas: Schema.Number,
            lastScaleTime: Schema.optional(Schema.String),
            observedGeneration: Schema.optional(Schema.Number),
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
export type ListAutoscalingV2HorizontalPodAutoscalerForAllNamespacesOutput =
  typeof ListAutoscalingV2HorizontalPodAutoscalerForAllNamespacesOutput.Type;

// The operation
/**
 * list or watch objects of kind HorizontalPodAutoscaler
 */
export const listAutoscalingV2HorizontalPodAutoscalerForAllNamespaces =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListAutoscalingV2HorizontalPodAutoscalerForAllNamespacesInput,
    outputSchema:
      ListAutoscalingV2HorizontalPodAutoscalerForAllNamespacesOutput,
  }));
// Input Schema
export const ListAutoscalingV2NamespacedHorizontalPodAutoscalerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/autoscaling/v2/namespaces/{namespace}/horizontalpodautoscalers",
    }),
  );
export type ListAutoscalingV2NamespacedHorizontalPodAutoscalerInput =
  typeof ListAutoscalingV2NamespacedHorizontalPodAutoscalerInput.Type;

// Output Schema
export const ListAutoscalingV2NamespacedHorizontalPodAutoscalerOutput =
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
          behavior: Schema.optional(
            Schema.Struct({
              scaleDown: Schema.optional(
                Schema.Struct({
                  policies: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        periodSeconds: Schema.Number,
                        type: Schema.String,
                        value: Schema.Number,
                      }),
                    ),
                  ),
                  selectPolicy: Schema.optional(Schema.String),
                  stabilizationWindowSeconds: Schema.optional(Schema.Number),
                  tolerance: Schema.optional(Schema.String),
                }),
              ),
              scaleUp: Schema.optional(
                Schema.Struct({
                  policies: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        periodSeconds: Schema.Number,
                        type: Schema.String,
                        value: Schema.Number,
                      }),
                    ),
                  ),
                  selectPolicy: Schema.optional(Schema.String),
                  stabilizationWindowSeconds: Schema.optional(Schema.Number),
                  tolerance: Schema.optional(Schema.String),
                }),
              ),
            }),
          ),
          maxReplicas: Schema.Number,
          metrics: Schema.optional(
            Schema.Array(
              Schema.Struct({
                containerResource: Schema.optional(
                  Schema.Struct({
                    container: Schema.String,
                    name: Schema.String,
                    target: Schema.Struct({
                      averageUtilization: Schema.optional(Schema.Number),
                      averageValue: Schema.optional(Schema.String),
                      type: Schema.String,
                      value: Schema.optional(Schema.String),
                    }),
                  }),
                ),
                external: Schema.optional(
                  Schema.Struct({
                    metric: Schema.Struct({
                      name: Schema.String,
                      selector: Schema.optional(
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
                          matchLabels: Schema.optional(
                            Schema.Record(Schema.String, Schema.String),
                          ),
                        }),
                      ),
                    }),
                    target: Schema.Struct({
                      averageUtilization: Schema.optional(Schema.Number),
                      averageValue: Schema.optional(Schema.String),
                      type: Schema.String,
                      value: Schema.optional(Schema.String),
                    }),
                  }),
                ),
                object: Schema.optional(
                  Schema.Struct({
                    describedObject: Schema.Struct({
                      apiVersion: Schema.optional(Schema.String),
                      kind: Schema.String,
                      name: Schema.String,
                    }),
                    metric: Schema.Struct({
                      name: Schema.String,
                      selector: Schema.optional(
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
                          matchLabels: Schema.optional(
                            Schema.Record(Schema.String, Schema.String),
                          ),
                        }),
                      ),
                    }),
                    target: Schema.Struct({
                      averageUtilization: Schema.optional(Schema.Number),
                      averageValue: Schema.optional(Schema.String),
                      type: Schema.String,
                      value: Schema.optional(Schema.String),
                    }),
                  }),
                ),
                pods: Schema.optional(
                  Schema.Struct({
                    metric: Schema.Struct({
                      name: Schema.String,
                      selector: Schema.optional(
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
                          matchLabels: Schema.optional(
                            Schema.Record(Schema.String, Schema.String),
                          ),
                        }),
                      ),
                    }),
                    target: Schema.Struct({
                      averageUtilization: Schema.optional(Schema.Number),
                      averageValue: Schema.optional(Schema.String),
                      type: Schema.String,
                      value: Schema.optional(Schema.String),
                    }),
                  }),
                ),
                resource: Schema.optional(
                  Schema.Struct({
                    name: Schema.String,
                    target: Schema.Struct({
                      averageUtilization: Schema.optional(Schema.Number),
                      averageValue: Schema.optional(Schema.String),
                      type: Schema.String,
                      value: Schema.optional(Schema.String),
                    }),
                  }),
                ),
                type: Schema.String,
              }),
            ),
          ),
          minReplicas: Schema.optional(Schema.Number),
          scaleTargetRef: Schema.Struct({
            apiVersion: Schema.optional(Schema.String),
            kind: Schema.String,
            name: Schema.String,
          }),
        }),
        status: Schema.optional(
          Schema.Struct({
            conditions: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  lastTransitionTime: Schema.optional(Schema.String),
                  message: Schema.optional(Schema.String),
                  reason: Schema.optional(Schema.String),
                  status: Schema.String,
                  type: Schema.String,
                }),
              ),
            ),
            currentMetrics: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  containerResource: Schema.optional(
                    Schema.Struct({
                      container: Schema.String,
                      current: Schema.Struct({
                        averageUtilization: Schema.optional(Schema.Number),
                        averageValue: Schema.optional(Schema.String),
                        value: Schema.optional(Schema.String),
                      }),
                      name: Schema.String,
                    }),
                  ),
                  external: Schema.optional(
                    Schema.Struct({
                      current: Schema.Struct({
                        averageUtilization: Schema.optional(Schema.Number),
                        averageValue: Schema.optional(Schema.String),
                        value: Schema.optional(Schema.String),
                      }),
                      metric: Schema.Struct({
                        name: Schema.String,
                        selector: Schema.optional(
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
                            matchLabels: Schema.optional(
                              Schema.Record(Schema.String, Schema.String),
                            ),
                          }),
                        ),
                      }),
                    }),
                  ),
                  object: Schema.optional(
                    Schema.Struct({
                      current: Schema.Struct({
                        averageUtilization: Schema.optional(Schema.Number),
                        averageValue: Schema.optional(Schema.String),
                        value: Schema.optional(Schema.String),
                      }),
                      describedObject: Schema.Struct({
                        apiVersion: Schema.optional(Schema.String),
                        kind: Schema.String,
                        name: Schema.String,
                      }),
                      metric: Schema.Struct({
                        name: Schema.String,
                        selector: Schema.optional(
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
                            matchLabels: Schema.optional(
                              Schema.Record(Schema.String, Schema.String),
                            ),
                          }),
                        ),
                      }),
                    }),
                  ),
                  pods: Schema.optional(
                    Schema.Struct({
                      current: Schema.Struct({
                        averageUtilization: Schema.optional(Schema.Number),
                        averageValue: Schema.optional(Schema.String),
                        value: Schema.optional(Schema.String),
                      }),
                      metric: Schema.Struct({
                        name: Schema.String,
                        selector: Schema.optional(
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
                            matchLabels: Schema.optional(
                              Schema.Record(Schema.String, Schema.String),
                            ),
                          }),
                        ),
                      }),
                    }),
                  ),
                  resource: Schema.optional(
                    Schema.Struct({
                      current: Schema.Struct({
                        averageUtilization: Schema.optional(Schema.Number),
                        averageValue: Schema.optional(Schema.String),
                        value: Schema.optional(Schema.String),
                      }),
                      name: Schema.String,
                    }),
                  ),
                  type: Schema.String,
                }),
              ),
            ),
            currentReplicas: Schema.optional(Schema.Number),
            desiredReplicas: Schema.Number,
            lastScaleTime: Schema.optional(Schema.String),
            observedGeneration: Schema.optional(Schema.Number),
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
export type ListAutoscalingV2NamespacedHorizontalPodAutoscalerOutput =
  typeof ListAutoscalingV2NamespacedHorizontalPodAutoscalerOutput.Type;

// The operation
/**
 * list or watch objects of kind HorizontalPodAutoscaler
 */
export const listAutoscalingV2NamespacedHorizontalPodAutoscaler =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListAutoscalingV2NamespacedHorizontalPodAutoscalerInput,
    outputSchema: ListAutoscalingV2NamespacedHorizontalPodAutoscalerOutput,
  }));
// Input Schema
export const PatchAutoscalingV1NamespacedHorizontalPodAutoscalerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/autoscaling/v1/namespaces/{namespace}/horizontalpodautoscalers/{name}",
    }),
  );
export type PatchAutoscalingV1NamespacedHorizontalPodAutoscalerInput =
  typeof PatchAutoscalingV1NamespacedHorizontalPodAutoscalerInput.Type;

// Output Schema
export const PatchAutoscalingV1NamespacedHorizontalPodAutoscalerOutput =
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
      maxReplicas: Schema.Number,
      minReplicas: Schema.optional(Schema.Number),
      scaleTargetRef: Schema.Struct({
        apiVersion: Schema.optional(Schema.String),
        kind: Schema.String,
        name: Schema.String,
      }),
      targetCPUUtilizationPercentage: Schema.optional(Schema.Number),
    }),
    status: Schema.optional(
      Schema.Struct({
        currentCPUUtilizationPercentage: Schema.optional(Schema.Number),
        currentReplicas: Schema.Number,
        desiredReplicas: Schema.Number,
        lastScaleTime: Schema.optional(Schema.String),
        observedGeneration: Schema.optional(Schema.Number),
      }),
    ),
  });
export type PatchAutoscalingV1NamespacedHorizontalPodAutoscalerOutput =
  typeof PatchAutoscalingV1NamespacedHorizontalPodAutoscalerOutput.Type;

// The operation
/**
 * partially update the specified HorizontalPodAutoscaler
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchAutoscalingV1NamespacedHorizontalPodAutoscaler =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PatchAutoscalingV1NamespacedHorizontalPodAutoscalerInput,
    outputSchema: PatchAutoscalingV1NamespacedHorizontalPodAutoscalerOutput,
  }));
// Input Schema
export const PatchAutoscalingV1NamespacedHorizontalPodAutoscalerStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/autoscaling/v1/namespaces/{namespace}/horizontalpodautoscalers/{name}/status",
    }),
  );
export type PatchAutoscalingV1NamespacedHorizontalPodAutoscalerStatusInput =
  typeof PatchAutoscalingV1NamespacedHorizontalPodAutoscalerStatusInput.Type;

// Output Schema
export const PatchAutoscalingV1NamespacedHorizontalPodAutoscalerStatusOutput =
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
      maxReplicas: Schema.Number,
      minReplicas: Schema.optional(Schema.Number),
      scaleTargetRef: Schema.Struct({
        apiVersion: Schema.optional(Schema.String),
        kind: Schema.String,
        name: Schema.String,
      }),
      targetCPUUtilizationPercentage: Schema.optional(Schema.Number),
    }),
    status: Schema.optional(
      Schema.Struct({
        currentCPUUtilizationPercentage: Schema.optional(Schema.Number),
        currentReplicas: Schema.Number,
        desiredReplicas: Schema.Number,
        lastScaleTime: Schema.optional(Schema.String),
        observedGeneration: Schema.optional(Schema.Number),
      }),
    ),
  });
export type PatchAutoscalingV1NamespacedHorizontalPodAutoscalerStatusOutput =
  typeof PatchAutoscalingV1NamespacedHorizontalPodAutoscalerStatusOutput.Type;

// The operation
/**
 * partially update status of the specified HorizontalPodAutoscaler
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchAutoscalingV1NamespacedHorizontalPodAutoscalerStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PatchAutoscalingV1NamespacedHorizontalPodAutoscalerStatusInput,
    outputSchema:
      PatchAutoscalingV1NamespacedHorizontalPodAutoscalerStatusOutput,
  }));
// Input Schema
export const PatchAutoscalingV2NamespacedHorizontalPodAutoscalerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/autoscaling/v2/namespaces/{namespace}/horizontalpodautoscalers/{name}",
    }),
  );
export type PatchAutoscalingV2NamespacedHorizontalPodAutoscalerInput =
  typeof PatchAutoscalingV2NamespacedHorizontalPodAutoscalerInput.Type;

// Output Schema
export const PatchAutoscalingV2NamespacedHorizontalPodAutoscalerOutput =
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
      behavior: Schema.optional(
        Schema.Struct({
          scaleDown: Schema.optional(
            Schema.Struct({
              policies: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    periodSeconds: Schema.Number,
                    type: Schema.String,
                    value: Schema.Number,
                  }),
                ),
              ),
              selectPolicy: Schema.optional(Schema.String),
              stabilizationWindowSeconds: Schema.optional(Schema.Number),
              tolerance: Schema.optional(Schema.String),
            }),
          ),
          scaleUp: Schema.optional(
            Schema.Struct({
              policies: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    periodSeconds: Schema.Number,
                    type: Schema.String,
                    value: Schema.Number,
                  }),
                ),
              ),
              selectPolicy: Schema.optional(Schema.String),
              stabilizationWindowSeconds: Schema.optional(Schema.Number),
              tolerance: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
      maxReplicas: Schema.Number,
      metrics: Schema.optional(
        Schema.Array(
          Schema.Struct({
            containerResource: Schema.optional(
              Schema.Struct({
                container: Schema.String,
                name: Schema.String,
                target: Schema.Struct({
                  averageUtilization: Schema.optional(Schema.Number),
                  averageValue: Schema.optional(Schema.String),
                  type: Schema.String,
                  value: Schema.optional(Schema.String),
                }),
              }),
            ),
            external: Schema.optional(
              Schema.Struct({
                metric: Schema.Struct({
                  name: Schema.String,
                  selector: Schema.optional(
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
                      matchLabels: Schema.optional(
                        Schema.Record(Schema.String, Schema.String),
                      ),
                    }),
                  ),
                }),
                target: Schema.Struct({
                  averageUtilization: Schema.optional(Schema.Number),
                  averageValue: Schema.optional(Schema.String),
                  type: Schema.String,
                  value: Schema.optional(Schema.String),
                }),
              }),
            ),
            object: Schema.optional(
              Schema.Struct({
                describedObject: Schema.Struct({
                  apiVersion: Schema.optional(Schema.String),
                  kind: Schema.String,
                  name: Schema.String,
                }),
                metric: Schema.Struct({
                  name: Schema.String,
                  selector: Schema.optional(
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
                      matchLabels: Schema.optional(
                        Schema.Record(Schema.String, Schema.String),
                      ),
                    }),
                  ),
                }),
                target: Schema.Struct({
                  averageUtilization: Schema.optional(Schema.Number),
                  averageValue: Schema.optional(Schema.String),
                  type: Schema.String,
                  value: Schema.optional(Schema.String),
                }),
              }),
            ),
            pods: Schema.optional(
              Schema.Struct({
                metric: Schema.Struct({
                  name: Schema.String,
                  selector: Schema.optional(
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
                      matchLabels: Schema.optional(
                        Schema.Record(Schema.String, Schema.String),
                      ),
                    }),
                  ),
                }),
                target: Schema.Struct({
                  averageUtilization: Schema.optional(Schema.Number),
                  averageValue: Schema.optional(Schema.String),
                  type: Schema.String,
                  value: Schema.optional(Schema.String),
                }),
              }),
            ),
            resource: Schema.optional(
              Schema.Struct({
                name: Schema.String,
                target: Schema.Struct({
                  averageUtilization: Schema.optional(Schema.Number),
                  averageValue: Schema.optional(Schema.String),
                  type: Schema.String,
                  value: Schema.optional(Schema.String),
                }),
              }),
            ),
            type: Schema.String,
          }),
        ),
      ),
      minReplicas: Schema.optional(Schema.Number),
      scaleTargetRef: Schema.Struct({
        apiVersion: Schema.optional(Schema.String),
        kind: Schema.String,
        name: Schema.String,
      }),
    }),
    status: Schema.optional(
      Schema.Struct({
        conditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastTransitionTime: Schema.optional(Schema.String),
              message: Schema.optional(Schema.String),
              reason: Schema.optional(Schema.String),
              status: Schema.String,
              type: Schema.String,
            }),
          ),
        ),
        currentMetrics: Schema.optional(
          Schema.Array(
            Schema.Struct({
              containerResource: Schema.optional(
                Schema.Struct({
                  container: Schema.String,
                  current: Schema.Struct({
                    averageUtilization: Schema.optional(Schema.Number),
                    averageValue: Schema.optional(Schema.String),
                    value: Schema.optional(Schema.String),
                  }),
                  name: Schema.String,
                }),
              ),
              external: Schema.optional(
                Schema.Struct({
                  current: Schema.Struct({
                    averageUtilization: Schema.optional(Schema.Number),
                    averageValue: Schema.optional(Schema.String),
                    value: Schema.optional(Schema.String),
                  }),
                  metric: Schema.Struct({
                    name: Schema.String,
                    selector: Schema.optional(
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
                        matchLabels: Schema.optional(
                          Schema.Record(Schema.String, Schema.String),
                        ),
                      }),
                    ),
                  }),
                }),
              ),
              object: Schema.optional(
                Schema.Struct({
                  current: Schema.Struct({
                    averageUtilization: Schema.optional(Schema.Number),
                    averageValue: Schema.optional(Schema.String),
                    value: Schema.optional(Schema.String),
                  }),
                  describedObject: Schema.Struct({
                    apiVersion: Schema.optional(Schema.String),
                    kind: Schema.String,
                    name: Schema.String,
                  }),
                  metric: Schema.Struct({
                    name: Schema.String,
                    selector: Schema.optional(
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
                        matchLabels: Schema.optional(
                          Schema.Record(Schema.String, Schema.String),
                        ),
                      }),
                    ),
                  }),
                }),
              ),
              pods: Schema.optional(
                Schema.Struct({
                  current: Schema.Struct({
                    averageUtilization: Schema.optional(Schema.Number),
                    averageValue: Schema.optional(Schema.String),
                    value: Schema.optional(Schema.String),
                  }),
                  metric: Schema.Struct({
                    name: Schema.String,
                    selector: Schema.optional(
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
                        matchLabels: Schema.optional(
                          Schema.Record(Schema.String, Schema.String),
                        ),
                      }),
                    ),
                  }),
                }),
              ),
              resource: Schema.optional(
                Schema.Struct({
                  current: Schema.Struct({
                    averageUtilization: Schema.optional(Schema.Number),
                    averageValue: Schema.optional(Schema.String),
                    value: Schema.optional(Schema.String),
                  }),
                  name: Schema.String,
                }),
              ),
              type: Schema.String,
            }),
          ),
        ),
        currentReplicas: Schema.optional(Schema.Number),
        desiredReplicas: Schema.Number,
        lastScaleTime: Schema.optional(Schema.String),
        observedGeneration: Schema.optional(Schema.Number),
      }),
    ),
  });
export type PatchAutoscalingV2NamespacedHorizontalPodAutoscalerOutput =
  typeof PatchAutoscalingV2NamespacedHorizontalPodAutoscalerOutput.Type;

// The operation
/**
 * partially update the specified HorizontalPodAutoscaler
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchAutoscalingV2NamespacedHorizontalPodAutoscaler =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PatchAutoscalingV2NamespacedHorizontalPodAutoscalerInput,
    outputSchema: PatchAutoscalingV2NamespacedHorizontalPodAutoscalerOutput,
  }));
// Input Schema
export const PatchAutoscalingV2NamespacedHorizontalPodAutoscalerStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/autoscaling/v2/namespaces/{namespace}/horizontalpodautoscalers/{name}/status",
    }),
  );
export type PatchAutoscalingV2NamespacedHorizontalPodAutoscalerStatusInput =
  typeof PatchAutoscalingV2NamespacedHorizontalPodAutoscalerStatusInput.Type;

// Output Schema
export const PatchAutoscalingV2NamespacedHorizontalPodAutoscalerStatusOutput =
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
      behavior: Schema.optional(
        Schema.Struct({
          scaleDown: Schema.optional(
            Schema.Struct({
              policies: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    periodSeconds: Schema.Number,
                    type: Schema.String,
                    value: Schema.Number,
                  }),
                ),
              ),
              selectPolicy: Schema.optional(Schema.String),
              stabilizationWindowSeconds: Schema.optional(Schema.Number),
              tolerance: Schema.optional(Schema.String),
            }),
          ),
          scaleUp: Schema.optional(
            Schema.Struct({
              policies: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    periodSeconds: Schema.Number,
                    type: Schema.String,
                    value: Schema.Number,
                  }),
                ),
              ),
              selectPolicy: Schema.optional(Schema.String),
              stabilizationWindowSeconds: Schema.optional(Schema.Number),
              tolerance: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
      maxReplicas: Schema.Number,
      metrics: Schema.optional(
        Schema.Array(
          Schema.Struct({
            containerResource: Schema.optional(
              Schema.Struct({
                container: Schema.String,
                name: Schema.String,
                target: Schema.Struct({
                  averageUtilization: Schema.optional(Schema.Number),
                  averageValue: Schema.optional(Schema.String),
                  type: Schema.String,
                  value: Schema.optional(Schema.String),
                }),
              }),
            ),
            external: Schema.optional(
              Schema.Struct({
                metric: Schema.Struct({
                  name: Schema.String,
                  selector: Schema.optional(
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
                      matchLabels: Schema.optional(
                        Schema.Record(Schema.String, Schema.String),
                      ),
                    }),
                  ),
                }),
                target: Schema.Struct({
                  averageUtilization: Schema.optional(Schema.Number),
                  averageValue: Schema.optional(Schema.String),
                  type: Schema.String,
                  value: Schema.optional(Schema.String),
                }),
              }),
            ),
            object: Schema.optional(
              Schema.Struct({
                describedObject: Schema.Struct({
                  apiVersion: Schema.optional(Schema.String),
                  kind: Schema.String,
                  name: Schema.String,
                }),
                metric: Schema.Struct({
                  name: Schema.String,
                  selector: Schema.optional(
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
                      matchLabels: Schema.optional(
                        Schema.Record(Schema.String, Schema.String),
                      ),
                    }),
                  ),
                }),
                target: Schema.Struct({
                  averageUtilization: Schema.optional(Schema.Number),
                  averageValue: Schema.optional(Schema.String),
                  type: Schema.String,
                  value: Schema.optional(Schema.String),
                }),
              }),
            ),
            pods: Schema.optional(
              Schema.Struct({
                metric: Schema.Struct({
                  name: Schema.String,
                  selector: Schema.optional(
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
                      matchLabels: Schema.optional(
                        Schema.Record(Schema.String, Schema.String),
                      ),
                    }),
                  ),
                }),
                target: Schema.Struct({
                  averageUtilization: Schema.optional(Schema.Number),
                  averageValue: Schema.optional(Schema.String),
                  type: Schema.String,
                  value: Schema.optional(Schema.String),
                }),
              }),
            ),
            resource: Schema.optional(
              Schema.Struct({
                name: Schema.String,
                target: Schema.Struct({
                  averageUtilization: Schema.optional(Schema.Number),
                  averageValue: Schema.optional(Schema.String),
                  type: Schema.String,
                  value: Schema.optional(Schema.String),
                }),
              }),
            ),
            type: Schema.String,
          }),
        ),
      ),
      minReplicas: Schema.optional(Schema.Number),
      scaleTargetRef: Schema.Struct({
        apiVersion: Schema.optional(Schema.String),
        kind: Schema.String,
        name: Schema.String,
      }),
    }),
    status: Schema.optional(
      Schema.Struct({
        conditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastTransitionTime: Schema.optional(Schema.String),
              message: Schema.optional(Schema.String),
              reason: Schema.optional(Schema.String),
              status: Schema.String,
              type: Schema.String,
            }),
          ),
        ),
        currentMetrics: Schema.optional(
          Schema.Array(
            Schema.Struct({
              containerResource: Schema.optional(
                Schema.Struct({
                  container: Schema.String,
                  current: Schema.Struct({
                    averageUtilization: Schema.optional(Schema.Number),
                    averageValue: Schema.optional(Schema.String),
                    value: Schema.optional(Schema.String),
                  }),
                  name: Schema.String,
                }),
              ),
              external: Schema.optional(
                Schema.Struct({
                  current: Schema.Struct({
                    averageUtilization: Schema.optional(Schema.Number),
                    averageValue: Schema.optional(Schema.String),
                    value: Schema.optional(Schema.String),
                  }),
                  metric: Schema.Struct({
                    name: Schema.String,
                    selector: Schema.optional(
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
                        matchLabels: Schema.optional(
                          Schema.Record(Schema.String, Schema.String),
                        ),
                      }),
                    ),
                  }),
                }),
              ),
              object: Schema.optional(
                Schema.Struct({
                  current: Schema.Struct({
                    averageUtilization: Schema.optional(Schema.Number),
                    averageValue: Schema.optional(Schema.String),
                    value: Schema.optional(Schema.String),
                  }),
                  describedObject: Schema.Struct({
                    apiVersion: Schema.optional(Schema.String),
                    kind: Schema.String,
                    name: Schema.String,
                  }),
                  metric: Schema.Struct({
                    name: Schema.String,
                    selector: Schema.optional(
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
                        matchLabels: Schema.optional(
                          Schema.Record(Schema.String, Schema.String),
                        ),
                      }),
                    ),
                  }),
                }),
              ),
              pods: Schema.optional(
                Schema.Struct({
                  current: Schema.Struct({
                    averageUtilization: Schema.optional(Schema.Number),
                    averageValue: Schema.optional(Schema.String),
                    value: Schema.optional(Schema.String),
                  }),
                  metric: Schema.Struct({
                    name: Schema.String,
                    selector: Schema.optional(
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
                        matchLabels: Schema.optional(
                          Schema.Record(Schema.String, Schema.String),
                        ),
                      }),
                    ),
                  }),
                }),
              ),
              resource: Schema.optional(
                Schema.Struct({
                  current: Schema.Struct({
                    averageUtilization: Schema.optional(Schema.Number),
                    averageValue: Schema.optional(Schema.String),
                    value: Schema.optional(Schema.String),
                  }),
                  name: Schema.String,
                }),
              ),
              type: Schema.String,
            }),
          ),
        ),
        currentReplicas: Schema.optional(Schema.Number),
        desiredReplicas: Schema.Number,
        lastScaleTime: Schema.optional(Schema.String),
        observedGeneration: Schema.optional(Schema.Number),
      }),
    ),
  });
export type PatchAutoscalingV2NamespacedHorizontalPodAutoscalerStatusOutput =
  typeof PatchAutoscalingV2NamespacedHorizontalPodAutoscalerStatusOutput.Type;

// The operation
/**
 * partially update status of the specified HorizontalPodAutoscaler
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchAutoscalingV2NamespacedHorizontalPodAutoscalerStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PatchAutoscalingV2NamespacedHorizontalPodAutoscalerStatusInput,
    outputSchema:
      PatchAutoscalingV2NamespacedHorizontalPodAutoscalerStatusOutput,
  }));
// Input Schema
export const ReadAutoscalingV1NamespacedHorizontalPodAutoscalerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/autoscaling/v1/namespaces/{namespace}/horizontalpodautoscalers/{name}",
    }),
  );
export type ReadAutoscalingV1NamespacedHorizontalPodAutoscalerInput =
  typeof ReadAutoscalingV1NamespacedHorizontalPodAutoscalerInput.Type;

// Output Schema
export const ReadAutoscalingV1NamespacedHorizontalPodAutoscalerOutput =
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
      maxReplicas: Schema.Number,
      minReplicas: Schema.optional(Schema.Number),
      scaleTargetRef: Schema.Struct({
        apiVersion: Schema.optional(Schema.String),
        kind: Schema.String,
        name: Schema.String,
      }),
      targetCPUUtilizationPercentage: Schema.optional(Schema.Number),
    }),
    status: Schema.optional(
      Schema.Struct({
        currentCPUUtilizationPercentage: Schema.optional(Schema.Number),
        currentReplicas: Schema.Number,
        desiredReplicas: Schema.Number,
        lastScaleTime: Schema.optional(Schema.String),
        observedGeneration: Schema.optional(Schema.Number),
      }),
    ),
  });
export type ReadAutoscalingV1NamespacedHorizontalPodAutoscalerOutput =
  typeof ReadAutoscalingV1NamespacedHorizontalPodAutoscalerOutput.Type;

// The operation
/**
 * read the specified HorizontalPodAutoscaler
 */
export const readAutoscalingV1NamespacedHorizontalPodAutoscaler =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReadAutoscalingV1NamespacedHorizontalPodAutoscalerInput,
    outputSchema: ReadAutoscalingV1NamespacedHorizontalPodAutoscalerOutput,
  }));
// Input Schema
export const ReadAutoscalingV1NamespacedHorizontalPodAutoscalerStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/autoscaling/v1/namespaces/{namespace}/horizontalpodautoscalers/{name}/status",
    }),
  );
export type ReadAutoscalingV1NamespacedHorizontalPodAutoscalerStatusInput =
  typeof ReadAutoscalingV1NamespacedHorizontalPodAutoscalerStatusInput.Type;

// Output Schema
export const ReadAutoscalingV1NamespacedHorizontalPodAutoscalerStatusOutput =
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
      maxReplicas: Schema.Number,
      minReplicas: Schema.optional(Schema.Number),
      scaleTargetRef: Schema.Struct({
        apiVersion: Schema.optional(Schema.String),
        kind: Schema.String,
        name: Schema.String,
      }),
      targetCPUUtilizationPercentage: Schema.optional(Schema.Number),
    }),
    status: Schema.optional(
      Schema.Struct({
        currentCPUUtilizationPercentage: Schema.optional(Schema.Number),
        currentReplicas: Schema.Number,
        desiredReplicas: Schema.Number,
        lastScaleTime: Schema.optional(Schema.String),
        observedGeneration: Schema.optional(Schema.Number),
      }),
    ),
  });
export type ReadAutoscalingV1NamespacedHorizontalPodAutoscalerStatusOutput =
  typeof ReadAutoscalingV1NamespacedHorizontalPodAutoscalerStatusOutput.Type;

// The operation
/**
 * read status of the specified HorizontalPodAutoscaler
 */
export const readAutoscalingV1NamespacedHorizontalPodAutoscalerStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReadAutoscalingV1NamespacedHorizontalPodAutoscalerStatusInput,
    outputSchema:
      ReadAutoscalingV1NamespacedHorizontalPodAutoscalerStatusOutput,
  }));
// Input Schema
export const ReadAutoscalingV2NamespacedHorizontalPodAutoscalerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/autoscaling/v2/namespaces/{namespace}/horizontalpodautoscalers/{name}",
    }),
  );
export type ReadAutoscalingV2NamespacedHorizontalPodAutoscalerInput =
  typeof ReadAutoscalingV2NamespacedHorizontalPodAutoscalerInput.Type;

// Output Schema
export const ReadAutoscalingV2NamespacedHorizontalPodAutoscalerOutput =
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
      behavior: Schema.optional(
        Schema.Struct({
          scaleDown: Schema.optional(
            Schema.Struct({
              policies: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    periodSeconds: Schema.Number,
                    type: Schema.String,
                    value: Schema.Number,
                  }),
                ),
              ),
              selectPolicy: Schema.optional(Schema.String),
              stabilizationWindowSeconds: Schema.optional(Schema.Number),
              tolerance: Schema.optional(Schema.String),
            }),
          ),
          scaleUp: Schema.optional(
            Schema.Struct({
              policies: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    periodSeconds: Schema.Number,
                    type: Schema.String,
                    value: Schema.Number,
                  }),
                ),
              ),
              selectPolicy: Schema.optional(Schema.String),
              stabilizationWindowSeconds: Schema.optional(Schema.Number),
              tolerance: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
      maxReplicas: Schema.Number,
      metrics: Schema.optional(
        Schema.Array(
          Schema.Struct({
            containerResource: Schema.optional(
              Schema.Struct({
                container: Schema.String,
                name: Schema.String,
                target: Schema.Struct({
                  averageUtilization: Schema.optional(Schema.Number),
                  averageValue: Schema.optional(Schema.String),
                  type: Schema.String,
                  value: Schema.optional(Schema.String),
                }),
              }),
            ),
            external: Schema.optional(
              Schema.Struct({
                metric: Schema.Struct({
                  name: Schema.String,
                  selector: Schema.optional(
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
                      matchLabels: Schema.optional(
                        Schema.Record(Schema.String, Schema.String),
                      ),
                    }),
                  ),
                }),
                target: Schema.Struct({
                  averageUtilization: Schema.optional(Schema.Number),
                  averageValue: Schema.optional(Schema.String),
                  type: Schema.String,
                  value: Schema.optional(Schema.String),
                }),
              }),
            ),
            object: Schema.optional(
              Schema.Struct({
                describedObject: Schema.Struct({
                  apiVersion: Schema.optional(Schema.String),
                  kind: Schema.String,
                  name: Schema.String,
                }),
                metric: Schema.Struct({
                  name: Schema.String,
                  selector: Schema.optional(
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
                      matchLabels: Schema.optional(
                        Schema.Record(Schema.String, Schema.String),
                      ),
                    }),
                  ),
                }),
                target: Schema.Struct({
                  averageUtilization: Schema.optional(Schema.Number),
                  averageValue: Schema.optional(Schema.String),
                  type: Schema.String,
                  value: Schema.optional(Schema.String),
                }),
              }),
            ),
            pods: Schema.optional(
              Schema.Struct({
                metric: Schema.Struct({
                  name: Schema.String,
                  selector: Schema.optional(
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
                      matchLabels: Schema.optional(
                        Schema.Record(Schema.String, Schema.String),
                      ),
                    }),
                  ),
                }),
                target: Schema.Struct({
                  averageUtilization: Schema.optional(Schema.Number),
                  averageValue: Schema.optional(Schema.String),
                  type: Schema.String,
                  value: Schema.optional(Schema.String),
                }),
              }),
            ),
            resource: Schema.optional(
              Schema.Struct({
                name: Schema.String,
                target: Schema.Struct({
                  averageUtilization: Schema.optional(Schema.Number),
                  averageValue: Schema.optional(Schema.String),
                  type: Schema.String,
                  value: Schema.optional(Schema.String),
                }),
              }),
            ),
            type: Schema.String,
          }),
        ),
      ),
      minReplicas: Schema.optional(Schema.Number),
      scaleTargetRef: Schema.Struct({
        apiVersion: Schema.optional(Schema.String),
        kind: Schema.String,
        name: Schema.String,
      }),
    }),
    status: Schema.optional(
      Schema.Struct({
        conditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastTransitionTime: Schema.optional(Schema.String),
              message: Schema.optional(Schema.String),
              reason: Schema.optional(Schema.String),
              status: Schema.String,
              type: Schema.String,
            }),
          ),
        ),
        currentMetrics: Schema.optional(
          Schema.Array(
            Schema.Struct({
              containerResource: Schema.optional(
                Schema.Struct({
                  container: Schema.String,
                  current: Schema.Struct({
                    averageUtilization: Schema.optional(Schema.Number),
                    averageValue: Schema.optional(Schema.String),
                    value: Schema.optional(Schema.String),
                  }),
                  name: Schema.String,
                }),
              ),
              external: Schema.optional(
                Schema.Struct({
                  current: Schema.Struct({
                    averageUtilization: Schema.optional(Schema.Number),
                    averageValue: Schema.optional(Schema.String),
                    value: Schema.optional(Schema.String),
                  }),
                  metric: Schema.Struct({
                    name: Schema.String,
                    selector: Schema.optional(
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
                        matchLabels: Schema.optional(
                          Schema.Record(Schema.String, Schema.String),
                        ),
                      }),
                    ),
                  }),
                }),
              ),
              object: Schema.optional(
                Schema.Struct({
                  current: Schema.Struct({
                    averageUtilization: Schema.optional(Schema.Number),
                    averageValue: Schema.optional(Schema.String),
                    value: Schema.optional(Schema.String),
                  }),
                  describedObject: Schema.Struct({
                    apiVersion: Schema.optional(Schema.String),
                    kind: Schema.String,
                    name: Schema.String,
                  }),
                  metric: Schema.Struct({
                    name: Schema.String,
                    selector: Schema.optional(
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
                        matchLabels: Schema.optional(
                          Schema.Record(Schema.String, Schema.String),
                        ),
                      }),
                    ),
                  }),
                }),
              ),
              pods: Schema.optional(
                Schema.Struct({
                  current: Schema.Struct({
                    averageUtilization: Schema.optional(Schema.Number),
                    averageValue: Schema.optional(Schema.String),
                    value: Schema.optional(Schema.String),
                  }),
                  metric: Schema.Struct({
                    name: Schema.String,
                    selector: Schema.optional(
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
                        matchLabels: Schema.optional(
                          Schema.Record(Schema.String, Schema.String),
                        ),
                      }),
                    ),
                  }),
                }),
              ),
              resource: Schema.optional(
                Schema.Struct({
                  current: Schema.Struct({
                    averageUtilization: Schema.optional(Schema.Number),
                    averageValue: Schema.optional(Schema.String),
                    value: Schema.optional(Schema.String),
                  }),
                  name: Schema.String,
                }),
              ),
              type: Schema.String,
            }),
          ),
        ),
        currentReplicas: Schema.optional(Schema.Number),
        desiredReplicas: Schema.Number,
        lastScaleTime: Schema.optional(Schema.String),
        observedGeneration: Schema.optional(Schema.Number),
      }),
    ),
  });
export type ReadAutoscalingV2NamespacedHorizontalPodAutoscalerOutput =
  typeof ReadAutoscalingV2NamespacedHorizontalPodAutoscalerOutput.Type;

// The operation
/**
 * read the specified HorizontalPodAutoscaler
 */
export const readAutoscalingV2NamespacedHorizontalPodAutoscaler =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReadAutoscalingV2NamespacedHorizontalPodAutoscalerInput,
    outputSchema: ReadAutoscalingV2NamespacedHorizontalPodAutoscalerOutput,
  }));
// Input Schema
export const ReadAutoscalingV2NamespacedHorizontalPodAutoscalerStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/autoscaling/v2/namespaces/{namespace}/horizontalpodautoscalers/{name}/status",
    }),
  );
export type ReadAutoscalingV2NamespacedHorizontalPodAutoscalerStatusInput =
  typeof ReadAutoscalingV2NamespacedHorizontalPodAutoscalerStatusInput.Type;

// Output Schema
export const ReadAutoscalingV2NamespacedHorizontalPodAutoscalerStatusOutput =
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
      behavior: Schema.optional(
        Schema.Struct({
          scaleDown: Schema.optional(
            Schema.Struct({
              policies: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    periodSeconds: Schema.Number,
                    type: Schema.String,
                    value: Schema.Number,
                  }),
                ),
              ),
              selectPolicy: Schema.optional(Schema.String),
              stabilizationWindowSeconds: Schema.optional(Schema.Number),
              tolerance: Schema.optional(Schema.String),
            }),
          ),
          scaleUp: Schema.optional(
            Schema.Struct({
              policies: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    periodSeconds: Schema.Number,
                    type: Schema.String,
                    value: Schema.Number,
                  }),
                ),
              ),
              selectPolicy: Schema.optional(Schema.String),
              stabilizationWindowSeconds: Schema.optional(Schema.Number),
              tolerance: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
      maxReplicas: Schema.Number,
      metrics: Schema.optional(
        Schema.Array(
          Schema.Struct({
            containerResource: Schema.optional(
              Schema.Struct({
                container: Schema.String,
                name: Schema.String,
                target: Schema.Struct({
                  averageUtilization: Schema.optional(Schema.Number),
                  averageValue: Schema.optional(Schema.String),
                  type: Schema.String,
                  value: Schema.optional(Schema.String),
                }),
              }),
            ),
            external: Schema.optional(
              Schema.Struct({
                metric: Schema.Struct({
                  name: Schema.String,
                  selector: Schema.optional(
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
                      matchLabels: Schema.optional(
                        Schema.Record(Schema.String, Schema.String),
                      ),
                    }),
                  ),
                }),
                target: Schema.Struct({
                  averageUtilization: Schema.optional(Schema.Number),
                  averageValue: Schema.optional(Schema.String),
                  type: Schema.String,
                  value: Schema.optional(Schema.String),
                }),
              }),
            ),
            object: Schema.optional(
              Schema.Struct({
                describedObject: Schema.Struct({
                  apiVersion: Schema.optional(Schema.String),
                  kind: Schema.String,
                  name: Schema.String,
                }),
                metric: Schema.Struct({
                  name: Schema.String,
                  selector: Schema.optional(
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
                      matchLabels: Schema.optional(
                        Schema.Record(Schema.String, Schema.String),
                      ),
                    }),
                  ),
                }),
                target: Schema.Struct({
                  averageUtilization: Schema.optional(Schema.Number),
                  averageValue: Schema.optional(Schema.String),
                  type: Schema.String,
                  value: Schema.optional(Schema.String),
                }),
              }),
            ),
            pods: Schema.optional(
              Schema.Struct({
                metric: Schema.Struct({
                  name: Schema.String,
                  selector: Schema.optional(
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
                      matchLabels: Schema.optional(
                        Schema.Record(Schema.String, Schema.String),
                      ),
                    }),
                  ),
                }),
                target: Schema.Struct({
                  averageUtilization: Schema.optional(Schema.Number),
                  averageValue: Schema.optional(Schema.String),
                  type: Schema.String,
                  value: Schema.optional(Schema.String),
                }),
              }),
            ),
            resource: Schema.optional(
              Schema.Struct({
                name: Schema.String,
                target: Schema.Struct({
                  averageUtilization: Schema.optional(Schema.Number),
                  averageValue: Schema.optional(Schema.String),
                  type: Schema.String,
                  value: Schema.optional(Schema.String),
                }),
              }),
            ),
            type: Schema.String,
          }),
        ),
      ),
      minReplicas: Schema.optional(Schema.Number),
      scaleTargetRef: Schema.Struct({
        apiVersion: Schema.optional(Schema.String),
        kind: Schema.String,
        name: Schema.String,
      }),
    }),
    status: Schema.optional(
      Schema.Struct({
        conditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastTransitionTime: Schema.optional(Schema.String),
              message: Schema.optional(Schema.String),
              reason: Schema.optional(Schema.String),
              status: Schema.String,
              type: Schema.String,
            }),
          ),
        ),
        currentMetrics: Schema.optional(
          Schema.Array(
            Schema.Struct({
              containerResource: Schema.optional(
                Schema.Struct({
                  container: Schema.String,
                  current: Schema.Struct({
                    averageUtilization: Schema.optional(Schema.Number),
                    averageValue: Schema.optional(Schema.String),
                    value: Schema.optional(Schema.String),
                  }),
                  name: Schema.String,
                }),
              ),
              external: Schema.optional(
                Schema.Struct({
                  current: Schema.Struct({
                    averageUtilization: Schema.optional(Schema.Number),
                    averageValue: Schema.optional(Schema.String),
                    value: Schema.optional(Schema.String),
                  }),
                  metric: Schema.Struct({
                    name: Schema.String,
                    selector: Schema.optional(
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
                        matchLabels: Schema.optional(
                          Schema.Record(Schema.String, Schema.String),
                        ),
                      }),
                    ),
                  }),
                }),
              ),
              object: Schema.optional(
                Schema.Struct({
                  current: Schema.Struct({
                    averageUtilization: Schema.optional(Schema.Number),
                    averageValue: Schema.optional(Schema.String),
                    value: Schema.optional(Schema.String),
                  }),
                  describedObject: Schema.Struct({
                    apiVersion: Schema.optional(Schema.String),
                    kind: Schema.String,
                    name: Schema.String,
                  }),
                  metric: Schema.Struct({
                    name: Schema.String,
                    selector: Schema.optional(
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
                        matchLabels: Schema.optional(
                          Schema.Record(Schema.String, Schema.String),
                        ),
                      }),
                    ),
                  }),
                }),
              ),
              pods: Schema.optional(
                Schema.Struct({
                  current: Schema.Struct({
                    averageUtilization: Schema.optional(Schema.Number),
                    averageValue: Schema.optional(Schema.String),
                    value: Schema.optional(Schema.String),
                  }),
                  metric: Schema.Struct({
                    name: Schema.String,
                    selector: Schema.optional(
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
                        matchLabels: Schema.optional(
                          Schema.Record(Schema.String, Schema.String),
                        ),
                      }),
                    ),
                  }),
                }),
              ),
              resource: Schema.optional(
                Schema.Struct({
                  current: Schema.Struct({
                    averageUtilization: Schema.optional(Schema.Number),
                    averageValue: Schema.optional(Schema.String),
                    value: Schema.optional(Schema.String),
                  }),
                  name: Schema.String,
                }),
              ),
              type: Schema.String,
            }),
          ),
        ),
        currentReplicas: Schema.optional(Schema.Number),
        desiredReplicas: Schema.Number,
        lastScaleTime: Schema.optional(Schema.String),
        observedGeneration: Schema.optional(Schema.Number),
      }),
    ),
  });
export type ReadAutoscalingV2NamespacedHorizontalPodAutoscalerStatusOutput =
  typeof ReadAutoscalingV2NamespacedHorizontalPodAutoscalerStatusOutput.Type;

// The operation
/**
 * read status of the specified HorizontalPodAutoscaler
 */
export const readAutoscalingV2NamespacedHorizontalPodAutoscalerStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReadAutoscalingV2NamespacedHorizontalPodAutoscalerStatusInput,
    outputSchema:
      ReadAutoscalingV2NamespacedHorizontalPodAutoscalerStatusOutput,
  }));
// Input Schema
export const ReplaceAutoscalingV1NamespacedHorizontalPodAutoscalerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/autoscaling/v1/namespaces/{namespace}/horizontalpodautoscalers/{name}",
    }),
  );
export type ReplaceAutoscalingV1NamespacedHorizontalPodAutoscalerInput =
  typeof ReplaceAutoscalingV1NamespacedHorizontalPodAutoscalerInput.Type;

// Output Schema
export const ReplaceAutoscalingV1NamespacedHorizontalPodAutoscalerOutput =
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
      maxReplicas: Schema.Number,
      minReplicas: Schema.optional(Schema.Number),
      scaleTargetRef: Schema.Struct({
        apiVersion: Schema.optional(Schema.String),
        kind: Schema.String,
        name: Schema.String,
      }),
      targetCPUUtilizationPercentage: Schema.optional(Schema.Number),
    }),
    status: Schema.optional(
      Schema.Struct({
        currentCPUUtilizationPercentage: Schema.optional(Schema.Number),
        currentReplicas: Schema.Number,
        desiredReplicas: Schema.Number,
        lastScaleTime: Schema.optional(Schema.String),
        observedGeneration: Schema.optional(Schema.Number),
      }),
    ),
  });
export type ReplaceAutoscalingV1NamespacedHorizontalPodAutoscalerOutput =
  typeof ReplaceAutoscalingV1NamespacedHorizontalPodAutoscalerOutput.Type;

// The operation
/**
 * replace the specified HorizontalPodAutoscaler
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceAutoscalingV1NamespacedHorizontalPodAutoscaler =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReplaceAutoscalingV1NamespacedHorizontalPodAutoscalerInput,
    outputSchema: ReplaceAutoscalingV1NamespacedHorizontalPodAutoscalerOutput,
  }));
// Input Schema
export const ReplaceAutoscalingV1NamespacedHorizontalPodAutoscalerStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/autoscaling/v1/namespaces/{namespace}/horizontalpodautoscalers/{name}/status",
    }),
  );
export type ReplaceAutoscalingV1NamespacedHorizontalPodAutoscalerStatusInput =
  typeof ReplaceAutoscalingV1NamespacedHorizontalPodAutoscalerStatusInput.Type;

// Output Schema
export const ReplaceAutoscalingV1NamespacedHorizontalPodAutoscalerStatusOutput =
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
      maxReplicas: Schema.Number,
      minReplicas: Schema.optional(Schema.Number),
      scaleTargetRef: Schema.Struct({
        apiVersion: Schema.optional(Schema.String),
        kind: Schema.String,
        name: Schema.String,
      }),
      targetCPUUtilizationPercentage: Schema.optional(Schema.Number),
    }),
    status: Schema.optional(
      Schema.Struct({
        currentCPUUtilizationPercentage: Schema.optional(Schema.Number),
        currentReplicas: Schema.Number,
        desiredReplicas: Schema.Number,
        lastScaleTime: Schema.optional(Schema.String),
        observedGeneration: Schema.optional(Schema.Number),
      }),
    ),
  });
export type ReplaceAutoscalingV1NamespacedHorizontalPodAutoscalerStatusOutput =
  typeof ReplaceAutoscalingV1NamespacedHorizontalPodAutoscalerStatusOutput.Type;

// The operation
/**
 * replace status of the specified HorizontalPodAutoscaler
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceAutoscalingV1NamespacedHorizontalPodAutoscalerStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      ReplaceAutoscalingV1NamespacedHorizontalPodAutoscalerStatusInput,
    outputSchema:
      ReplaceAutoscalingV1NamespacedHorizontalPodAutoscalerStatusOutput,
  }));
// Input Schema
export const ReplaceAutoscalingV2NamespacedHorizontalPodAutoscalerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/autoscaling/v2/namespaces/{namespace}/horizontalpodautoscalers/{name}",
    }),
  );
export type ReplaceAutoscalingV2NamespacedHorizontalPodAutoscalerInput =
  typeof ReplaceAutoscalingV2NamespacedHorizontalPodAutoscalerInput.Type;

// Output Schema
export const ReplaceAutoscalingV2NamespacedHorizontalPodAutoscalerOutput =
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
      behavior: Schema.optional(
        Schema.Struct({
          scaleDown: Schema.optional(
            Schema.Struct({
              policies: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    periodSeconds: Schema.Number,
                    type: Schema.String,
                    value: Schema.Number,
                  }),
                ),
              ),
              selectPolicy: Schema.optional(Schema.String),
              stabilizationWindowSeconds: Schema.optional(Schema.Number),
              tolerance: Schema.optional(Schema.String),
            }),
          ),
          scaleUp: Schema.optional(
            Schema.Struct({
              policies: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    periodSeconds: Schema.Number,
                    type: Schema.String,
                    value: Schema.Number,
                  }),
                ),
              ),
              selectPolicy: Schema.optional(Schema.String),
              stabilizationWindowSeconds: Schema.optional(Schema.Number),
              tolerance: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
      maxReplicas: Schema.Number,
      metrics: Schema.optional(
        Schema.Array(
          Schema.Struct({
            containerResource: Schema.optional(
              Schema.Struct({
                container: Schema.String,
                name: Schema.String,
                target: Schema.Struct({
                  averageUtilization: Schema.optional(Schema.Number),
                  averageValue: Schema.optional(Schema.String),
                  type: Schema.String,
                  value: Schema.optional(Schema.String),
                }),
              }),
            ),
            external: Schema.optional(
              Schema.Struct({
                metric: Schema.Struct({
                  name: Schema.String,
                  selector: Schema.optional(
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
                      matchLabels: Schema.optional(
                        Schema.Record(Schema.String, Schema.String),
                      ),
                    }),
                  ),
                }),
                target: Schema.Struct({
                  averageUtilization: Schema.optional(Schema.Number),
                  averageValue: Schema.optional(Schema.String),
                  type: Schema.String,
                  value: Schema.optional(Schema.String),
                }),
              }),
            ),
            object: Schema.optional(
              Schema.Struct({
                describedObject: Schema.Struct({
                  apiVersion: Schema.optional(Schema.String),
                  kind: Schema.String,
                  name: Schema.String,
                }),
                metric: Schema.Struct({
                  name: Schema.String,
                  selector: Schema.optional(
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
                      matchLabels: Schema.optional(
                        Schema.Record(Schema.String, Schema.String),
                      ),
                    }),
                  ),
                }),
                target: Schema.Struct({
                  averageUtilization: Schema.optional(Schema.Number),
                  averageValue: Schema.optional(Schema.String),
                  type: Schema.String,
                  value: Schema.optional(Schema.String),
                }),
              }),
            ),
            pods: Schema.optional(
              Schema.Struct({
                metric: Schema.Struct({
                  name: Schema.String,
                  selector: Schema.optional(
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
                      matchLabels: Schema.optional(
                        Schema.Record(Schema.String, Schema.String),
                      ),
                    }),
                  ),
                }),
                target: Schema.Struct({
                  averageUtilization: Schema.optional(Schema.Number),
                  averageValue: Schema.optional(Schema.String),
                  type: Schema.String,
                  value: Schema.optional(Schema.String),
                }),
              }),
            ),
            resource: Schema.optional(
              Schema.Struct({
                name: Schema.String,
                target: Schema.Struct({
                  averageUtilization: Schema.optional(Schema.Number),
                  averageValue: Schema.optional(Schema.String),
                  type: Schema.String,
                  value: Schema.optional(Schema.String),
                }),
              }),
            ),
            type: Schema.String,
          }),
        ),
      ),
      minReplicas: Schema.optional(Schema.Number),
      scaleTargetRef: Schema.Struct({
        apiVersion: Schema.optional(Schema.String),
        kind: Schema.String,
        name: Schema.String,
      }),
    }),
    status: Schema.optional(
      Schema.Struct({
        conditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastTransitionTime: Schema.optional(Schema.String),
              message: Schema.optional(Schema.String),
              reason: Schema.optional(Schema.String),
              status: Schema.String,
              type: Schema.String,
            }),
          ),
        ),
        currentMetrics: Schema.optional(
          Schema.Array(
            Schema.Struct({
              containerResource: Schema.optional(
                Schema.Struct({
                  container: Schema.String,
                  current: Schema.Struct({
                    averageUtilization: Schema.optional(Schema.Number),
                    averageValue: Schema.optional(Schema.String),
                    value: Schema.optional(Schema.String),
                  }),
                  name: Schema.String,
                }),
              ),
              external: Schema.optional(
                Schema.Struct({
                  current: Schema.Struct({
                    averageUtilization: Schema.optional(Schema.Number),
                    averageValue: Schema.optional(Schema.String),
                    value: Schema.optional(Schema.String),
                  }),
                  metric: Schema.Struct({
                    name: Schema.String,
                    selector: Schema.optional(
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
                        matchLabels: Schema.optional(
                          Schema.Record(Schema.String, Schema.String),
                        ),
                      }),
                    ),
                  }),
                }),
              ),
              object: Schema.optional(
                Schema.Struct({
                  current: Schema.Struct({
                    averageUtilization: Schema.optional(Schema.Number),
                    averageValue: Schema.optional(Schema.String),
                    value: Schema.optional(Schema.String),
                  }),
                  describedObject: Schema.Struct({
                    apiVersion: Schema.optional(Schema.String),
                    kind: Schema.String,
                    name: Schema.String,
                  }),
                  metric: Schema.Struct({
                    name: Schema.String,
                    selector: Schema.optional(
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
                        matchLabels: Schema.optional(
                          Schema.Record(Schema.String, Schema.String),
                        ),
                      }),
                    ),
                  }),
                }),
              ),
              pods: Schema.optional(
                Schema.Struct({
                  current: Schema.Struct({
                    averageUtilization: Schema.optional(Schema.Number),
                    averageValue: Schema.optional(Schema.String),
                    value: Schema.optional(Schema.String),
                  }),
                  metric: Schema.Struct({
                    name: Schema.String,
                    selector: Schema.optional(
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
                        matchLabels: Schema.optional(
                          Schema.Record(Schema.String, Schema.String),
                        ),
                      }),
                    ),
                  }),
                }),
              ),
              resource: Schema.optional(
                Schema.Struct({
                  current: Schema.Struct({
                    averageUtilization: Schema.optional(Schema.Number),
                    averageValue: Schema.optional(Schema.String),
                    value: Schema.optional(Schema.String),
                  }),
                  name: Schema.String,
                }),
              ),
              type: Schema.String,
            }),
          ),
        ),
        currentReplicas: Schema.optional(Schema.Number),
        desiredReplicas: Schema.Number,
        lastScaleTime: Schema.optional(Schema.String),
        observedGeneration: Schema.optional(Schema.Number),
      }),
    ),
  });
export type ReplaceAutoscalingV2NamespacedHorizontalPodAutoscalerOutput =
  typeof ReplaceAutoscalingV2NamespacedHorizontalPodAutoscalerOutput.Type;

// The operation
/**
 * replace the specified HorizontalPodAutoscaler
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceAutoscalingV2NamespacedHorizontalPodAutoscaler =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReplaceAutoscalingV2NamespacedHorizontalPodAutoscalerInput,
    outputSchema: ReplaceAutoscalingV2NamespacedHorizontalPodAutoscalerOutput,
  }));
// Input Schema
export const ReplaceAutoscalingV2NamespacedHorizontalPodAutoscalerStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/autoscaling/v2/namespaces/{namespace}/horizontalpodautoscalers/{name}/status",
    }),
  );
export type ReplaceAutoscalingV2NamespacedHorizontalPodAutoscalerStatusInput =
  typeof ReplaceAutoscalingV2NamespacedHorizontalPodAutoscalerStatusInput.Type;

// Output Schema
export const ReplaceAutoscalingV2NamespacedHorizontalPodAutoscalerStatusOutput =
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
      behavior: Schema.optional(
        Schema.Struct({
          scaleDown: Schema.optional(
            Schema.Struct({
              policies: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    periodSeconds: Schema.Number,
                    type: Schema.String,
                    value: Schema.Number,
                  }),
                ),
              ),
              selectPolicy: Schema.optional(Schema.String),
              stabilizationWindowSeconds: Schema.optional(Schema.Number),
              tolerance: Schema.optional(Schema.String),
            }),
          ),
          scaleUp: Schema.optional(
            Schema.Struct({
              policies: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    periodSeconds: Schema.Number,
                    type: Schema.String,
                    value: Schema.Number,
                  }),
                ),
              ),
              selectPolicy: Schema.optional(Schema.String),
              stabilizationWindowSeconds: Schema.optional(Schema.Number),
              tolerance: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
      maxReplicas: Schema.Number,
      metrics: Schema.optional(
        Schema.Array(
          Schema.Struct({
            containerResource: Schema.optional(
              Schema.Struct({
                container: Schema.String,
                name: Schema.String,
                target: Schema.Struct({
                  averageUtilization: Schema.optional(Schema.Number),
                  averageValue: Schema.optional(Schema.String),
                  type: Schema.String,
                  value: Schema.optional(Schema.String),
                }),
              }),
            ),
            external: Schema.optional(
              Schema.Struct({
                metric: Schema.Struct({
                  name: Schema.String,
                  selector: Schema.optional(
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
                      matchLabels: Schema.optional(
                        Schema.Record(Schema.String, Schema.String),
                      ),
                    }),
                  ),
                }),
                target: Schema.Struct({
                  averageUtilization: Schema.optional(Schema.Number),
                  averageValue: Schema.optional(Schema.String),
                  type: Schema.String,
                  value: Schema.optional(Schema.String),
                }),
              }),
            ),
            object: Schema.optional(
              Schema.Struct({
                describedObject: Schema.Struct({
                  apiVersion: Schema.optional(Schema.String),
                  kind: Schema.String,
                  name: Schema.String,
                }),
                metric: Schema.Struct({
                  name: Schema.String,
                  selector: Schema.optional(
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
                      matchLabels: Schema.optional(
                        Schema.Record(Schema.String, Schema.String),
                      ),
                    }),
                  ),
                }),
                target: Schema.Struct({
                  averageUtilization: Schema.optional(Schema.Number),
                  averageValue: Schema.optional(Schema.String),
                  type: Schema.String,
                  value: Schema.optional(Schema.String),
                }),
              }),
            ),
            pods: Schema.optional(
              Schema.Struct({
                metric: Schema.Struct({
                  name: Schema.String,
                  selector: Schema.optional(
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
                      matchLabels: Schema.optional(
                        Schema.Record(Schema.String, Schema.String),
                      ),
                    }),
                  ),
                }),
                target: Schema.Struct({
                  averageUtilization: Schema.optional(Schema.Number),
                  averageValue: Schema.optional(Schema.String),
                  type: Schema.String,
                  value: Schema.optional(Schema.String),
                }),
              }),
            ),
            resource: Schema.optional(
              Schema.Struct({
                name: Schema.String,
                target: Schema.Struct({
                  averageUtilization: Schema.optional(Schema.Number),
                  averageValue: Schema.optional(Schema.String),
                  type: Schema.String,
                  value: Schema.optional(Schema.String),
                }),
              }),
            ),
            type: Schema.String,
          }),
        ),
      ),
      minReplicas: Schema.optional(Schema.Number),
      scaleTargetRef: Schema.Struct({
        apiVersion: Schema.optional(Schema.String),
        kind: Schema.String,
        name: Schema.String,
      }),
    }),
    status: Schema.optional(
      Schema.Struct({
        conditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastTransitionTime: Schema.optional(Schema.String),
              message: Schema.optional(Schema.String),
              reason: Schema.optional(Schema.String),
              status: Schema.String,
              type: Schema.String,
            }),
          ),
        ),
        currentMetrics: Schema.optional(
          Schema.Array(
            Schema.Struct({
              containerResource: Schema.optional(
                Schema.Struct({
                  container: Schema.String,
                  current: Schema.Struct({
                    averageUtilization: Schema.optional(Schema.Number),
                    averageValue: Schema.optional(Schema.String),
                    value: Schema.optional(Schema.String),
                  }),
                  name: Schema.String,
                }),
              ),
              external: Schema.optional(
                Schema.Struct({
                  current: Schema.Struct({
                    averageUtilization: Schema.optional(Schema.Number),
                    averageValue: Schema.optional(Schema.String),
                    value: Schema.optional(Schema.String),
                  }),
                  metric: Schema.Struct({
                    name: Schema.String,
                    selector: Schema.optional(
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
                        matchLabels: Schema.optional(
                          Schema.Record(Schema.String, Schema.String),
                        ),
                      }),
                    ),
                  }),
                }),
              ),
              object: Schema.optional(
                Schema.Struct({
                  current: Schema.Struct({
                    averageUtilization: Schema.optional(Schema.Number),
                    averageValue: Schema.optional(Schema.String),
                    value: Schema.optional(Schema.String),
                  }),
                  describedObject: Schema.Struct({
                    apiVersion: Schema.optional(Schema.String),
                    kind: Schema.String,
                    name: Schema.String,
                  }),
                  metric: Schema.Struct({
                    name: Schema.String,
                    selector: Schema.optional(
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
                        matchLabels: Schema.optional(
                          Schema.Record(Schema.String, Schema.String),
                        ),
                      }),
                    ),
                  }),
                }),
              ),
              pods: Schema.optional(
                Schema.Struct({
                  current: Schema.Struct({
                    averageUtilization: Schema.optional(Schema.Number),
                    averageValue: Schema.optional(Schema.String),
                    value: Schema.optional(Schema.String),
                  }),
                  metric: Schema.Struct({
                    name: Schema.String,
                    selector: Schema.optional(
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
                        matchLabels: Schema.optional(
                          Schema.Record(Schema.String, Schema.String),
                        ),
                      }),
                    ),
                  }),
                }),
              ),
              resource: Schema.optional(
                Schema.Struct({
                  current: Schema.Struct({
                    averageUtilization: Schema.optional(Schema.Number),
                    averageValue: Schema.optional(Schema.String),
                    value: Schema.optional(Schema.String),
                  }),
                  name: Schema.String,
                }),
              ),
              type: Schema.String,
            }),
          ),
        ),
        currentReplicas: Schema.optional(Schema.Number),
        desiredReplicas: Schema.Number,
        lastScaleTime: Schema.optional(Schema.String),
        observedGeneration: Schema.optional(Schema.Number),
      }),
    ),
  });
export type ReplaceAutoscalingV2NamespacedHorizontalPodAutoscalerStatusOutput =
  typeof ReplaceAutoscalingV2NamespacedHorizontalPodAutoscalerStatusOutput.Type;

// The operation
/**
 * replace status of the specified HorizontalPodAutoscaler
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceAutoscalingV2NamespacedHorizontalPodAutoscalerStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      ReplaceAutoscalingV2NamespacedHorizontalPodAutoscalerStatusInput,
    outputSchema:
      ReplaceAutoscalingV2NamespacedHorizontalPodAutoscalerStatusOutput,
  }));
// Input Schema
export const WatchAutoscalingV1HorizontalPodAutoscalerListForAllNamespacesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/autoscaling/v1/watch/horizontalpodautoscalers",
    }),
  );
export type WatchAutoscalingV1HorizontalPodAutoscalerListForAllNamespacesInput =
  typeof WatchAutoscalingV1HorizontalPodAutoscalerListForAllNamespacesInput.Type;

// Output Schema
export const WatchAutoscalingV1HorizontalPodAutoscalerListForAllNamespacesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchAutoscalingV1HorizontalPodAutoscalerListForAllNamespacesOutput =
  typeof WatchAutoscalingV1HorizontalPodAutoscalerListForAllNamespacesOutput.Type;

// The operation
/**
 * watch individual changes to a list of HorizontalPodAutoscaler. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchAutoscalingV1HorizontalPodAutoscalerListForAllNamespaces =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      WatchAutoscalingV1HorizontalPodAutoscalerListForAllNamespacesInput,
    outputSchema:
      WatchAutoscalingV1HorizontalPodAutoscalerListForAllNamespacesOutput,
  }));
// Input Schema
export const WatchAutoscalingV1NamespacedHorizontalPodAutoscalerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/autoscaling/v1/watch/namespaces/{namespace}/horizontalpodautoscalers/{name}",
    }),
  );
export type WatchAutoscalingV1NamespacedHorizontalPodAutoscalerInput =
  typeof WatchAutoscalingV1NamespacedHorizontalPodAutoscalerInput.Type;

// Output Schema
export const WatchAutoscalingV1NamespacedHorizontalPodAutoscalerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchAutoscalingV1NamespacedHorizontalPodAutoscalerOutput =
  typeof WatchAutoscalingV1NamespacedHorizontalPodAutoscalerOutput.Type;

// The operation
/**
 * watch changes to an object of kind HorizontalPodAutoscaler. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
 */
export const watchAutoscalingV1NamespacedHorizontalPodAutoscaler =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchAutoscalingV1NamespacedHorizontalPodAutoscalerInput,
    outputSchema: WatchAutoscalingV1NamespacedHorizontalPodAutoscalerOutput,
  }));
// Input Schema
export const WatchAutoscalingV1NamespacedHorizontalPodAutoscalerListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/autoscaling/v1/watch/namespaces/{namespace}/horizontalpodautoscalers",
    }),
  );
export type WatchAutoscalingV1NamespacedHorizontalPodAutoscalerListInput =
  typeof WatchAutoscalingV1NamespacedHorizontalPodAutoscalerListInput.Type;

// Output Schema
export const WatchAutoscalingV1NamespacedHorizontalPodAutoscalerListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchAutoscalingV1NamespacedHorizontalPodAutoscalerListOutput =
  typeof WatchAutoscalingV1NamespacedHorizontalPodAutoscalerListOutput.Type;

// The operation
/**
 * watch individual changes to a list of HorizontalPodAutoscaler. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchAutoscalingV1NamespacedHorizontalPodAutoscalerList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchAutoscalingV1NamespacedHorizontalPodAutoscalerListInput,
    outputSchema: WatchAutoscalingV1NamespacedHorizontalPodAutoscalerListOutput,
  }));
// Input Schema
export const WatchAutoscalingV2HorizontalPodAutoscalerListForAllNamespacesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/autoscaling/v2/watch/horizontalpodautoscalers",
    }),
  );
export type WatchAutoscalingV2HorizontalPodAutoscalerListForAllNamespacesInput =
  typeof WatchAutoscalingV2HorizontalPodAutoscalerListForAllNamespacesInput.Type;

// Output Schema
export const WatchAutoscalingV2HorizontalPodAutoscalerListForAllNamespacesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchAutoscalingV2HorizontalPodAutoscalerListForAllNamespacesOutput =
  typeof WatchAutoscalingV2HorizontalPodAutoscalerListForAllNamespacesOutput.Type;

// The operation
/**
 * watch individual changes to a list of HorizontalPodAutoscaler. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchAutoscalingV2HorizontalPodAutoscalerListForAllNamespaces =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      WatchAutoscalingV2HorizontalPodAutoscalerListForAllNamespacesInput,
    outputSchema:
      WatchAutoscalingV2HorizontalPodAutoscalerListForAllNamespacesOutput,
  }));
// Input Schema
export const WatchAutoscalingV2NamespacedHorizontalPodAutoscalerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/autoscaling/v2/watch/namespaces/{namespace}/horizontalpodautoscalers/{name}",
    }),
  );
export type WatchAutoscalingV2NamespacedHorizontalPodAutoscalerInput =
  typeof WatchAutoscalingV2NamespacedHorizontalPodAutoscalerInput.Type;

// Output Schema
export const WatchAutoscalingV2NamespacedHorizontalPodAutoscalerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchAutoscalingV2NamespacedHorizontalPodAutoscalerOutput =
  typeof WatchAutoscalingV2NamespacedHorizontalPodAutoscalerOutput.Type;

// The operation
/**
 * watch changes to an object of kind HorizontalPodAutoscaler. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
 */
export const watchAutoscalingV2NamespacedHorizontalPodAutoscaler =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchAutoscalingV2NamespacedHorizontalPodAutoscalerInput,
    outputSchema: WatchAutoscalingV2NamespacedHorizontalPodAutoscalerOutput,
  }));
// Input Schema
export const WatchAutoscalingV2NamespacedHorizontalPodAutoscalerListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/autoscaling/v2/watch/namespaces/{namespace}/horizontalpodautoscalers",
    }),
  );
export type WatchAutoscalingV2NamespacedHorizontalPodAutoscalerListInput =
  typeof WatchAutoscalingV2NamespacedHorizontalPodAutoscalerListInput.Type;

// Output Schema
export const WatchAutoscalingV2NamespacedHorizontalPodAutoscalerListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchAutoscalingV2NamespacedHorizontalPodAutoscalerListOutput =
  typeof WatchAutoscalingV2NamespacedHorizontalPodAutoscalerListOutput.Type;

// The operation
/**
 * watch individual changes to a list of HorizontalPodAutoscaler. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchAutoscalingV2NamespacedHorizontalPodAutoscalerList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchAutoscalingV2NamespacedHorizontalPodAutoscalerListInput,
    outputSchema: WatchAutoscalingV2NamespacedHorizontalPodAutoscalerListOutput,
  }));
