/**
 * Kubernetes API Extensions API
 *
 * Generated from the Kubernetes OpenAPI spec.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";

// Input Schema
export const CreateApiextensionsV1CustomResourceDefinitionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/apis/apiextensions.k8s.io/v1/customresourcedefinitions",
    }),
  );
export type CreateApiextensionsV1CustomResourceDefinitionInput =
  typeof CreateApiextensionsV1CustomResourceDefinitionInput.Type;

// Output Schema
export const CreateApiextensionsV1CustomResourceDefinitionOutput =
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
      conversion: Schema.optional(
        Schema.Struct({
          strategy: Schema.String,
          webhook: Schema.optional(
            Schema.Struct({
              clientConfig: Schema.optional(
                Schema.Struct({
                  caBundle: Schema.optional(Schema.String),
                  service: Schema.optional(
                    Schema.Struct({
                      name: Schema.String,
                      namespace: Schema.String,
                      path: Schema.optional(Schema.String),
                      port: Schema.optional(Schema.Number),
                    }),
                  ),
                  url: Schema.optional(Schema.String),
                }),
              ),
              conversionReviewVersions: Schema.Array(Schema.String),
            }),
          ),
        }),
      ),
      group: Schema.String,
      names: Schema.Struct({
        categories: Schema.optional(Schema.Array(Schema.String)),
        kind: Schema.String,
        listKind: Schema.optional(Schema.String),
        plural: Schema.String,
        shortNames: Schema.optional(Schema.Array(Schema.String)),
        singular: Schema.optional(Schema.String),
      }),
      preserveUnknownFields: Schema.optional(Schema.Boolean),
      scope: Schema.String,
      versions: Schema.Array(
        Schema.Struct({
          additionalPrinterColumns: Schema.optional(
            Schema.Array(
              Schema.Struct({
                description: Schema.optional(Schema.String),
                format: Schema.optional(Schema.String),
                jsonPath: Schema.String,
                name: Schema.String,
                priority: Schema.optional(Schema.Number),
                type: Schema.String,
              }),
            ),
          ),
          deprecated: Schema.optional(Schema.Boolean),
          deprecationWarning: Schema.optional(Schema.String),
          name: Schema.String,
          schema: Schema.optional(
            Schema.Struct({
              openAPIV3Schema: Schema.optional(
                Schema.Struct({
                  $ref: Schema.optional(Schema.String),
                  $schema: Schema.optional(Schema.String),
                  additionalItems: Schema.optional(Schema.Unknown),
                  additionalProperties: Schema.optional(Schema.Unknown),
                  allOf: Schema.optional(Schema.Array(Schema.Unknown)),
                  anyOf: Schema.optional(Schema.Array(Schema.Unknown)),
                  default: Schema.optional(Schema.Unknown),
                  definitions: Schema.optional(
                    Schema.Record(Schema.String, Schema.Unknown),
                  ),
                  dependencies: Schema.optional(
                    Schema.Record(Schema.String, Schema.Unknown),
                  ),
                  description: Schema.optional(Schema.String),
                  enum: Schema.optional(Schema.Array(Schema.Unknown)),
                  example: Schema.optional(Schema.Unknown),
                  exclusiveMaximum: Schema.optional(Schema.Boolean),
                  exclusiveMinimum: Schema.optional(Schema.Boolean),
                  externalDocs: Schema.optional(
                    Schema.Struct({
                      description: Schema.optional(Schema.String),
                      url: Schema.optional(Schema.String),
                    }),
                  ),
                  format: Schema.optional(Schema.String),
                  id: Schema.optional(Schema.String),
                  items: Schema.optional(Schema.Unknown),
                  maxItems: Schema.optional(Schema.Number),
                  maxLength: Schema.optional(Schema.Number),
                  maxProperties: Schema.optional(Schema.Number),
                  maximum: Schema.optional(Schema.Number),
                  minItems: Schema.optional(Schema.Number),
                  minLength: Schema.optional(Schema.Number),
                  minProperties: Schema.optional(Schema.Number),
                  minimum: Schema.optional(Schema.Number),
                  multipleOf: Schema.optional(Schema.Number),
                  not: Schema.optional(Schema.Unknown),
                  nullable: Schema.optional(Schema.Boolean),
                  oneOf: Schema.optional(Schema.Array(Schema.Unknown)),
                  pattern: Schema.optional(Schema.String),
                  patternProperties: Schema.optional(
                    Schema.Record(Schema.String, Schema.Unknown),
                  ),
                  properties: Schema.optional(
                    Schema.Record(Schema.String, Schema.Unknown),
                  ),
                  required: Schema.optional(Schema.Array(Schema.String)),
                  title: Schema.optional(Schema.String),
                  type: Schema.optional(Schema.String),
                  uniqueItems: Schema.optional(Schema.Boolean),
                  "x-kubernetes-embedded-resource": Schema.optional(
                    Schema.Boolean,
                  ),
                  "x-kubernetes-int-or-string": Schema.optional(Schema.Boolean),
                  "x-kubernetes-list-map-keys": Schema.optional(
                    Schema.Array(Schema.String),
                  ),
                  "x-kubernetes-list-type": Schema.optional(Schema.String),
                  "x-kubernetes-map-type": Schema.optional(Schema.String),
                  "x-kubernetes-preserve-unknown-fields": Schema.optional(
                    Schema.Boolean,
                  ),
                  "x-kubernetes-validations": Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        fieldPath: Schema.optional(Schema.String),
                        message: Schema.optional(Schema.String),
                        messageExpression: Schema.optional(Schema.String),
                        optionalOldSelf: Schema.optional(Schema.Boolean),
                        reason: Schema.optional(Schema.String),
                        rule: Schema.String,
                      }),
                    ),
                  ),
                }),
              ),
            }),
          ),
          selectableFields: Schema.optional(
            Schema.Array(
              Schema.Struct({
                jsonPath: Schema.String,
              }),
            ),
          ),
          served: Schema.Boolean,
          storage: Schema.Boolean,
          subresources: Schema.optional(
            Schema.Struct({
              scale: Schema.optional(
                Schema.Struct({
                  labelSelectorPath: Schema.optional(Schema.String),
                  specReplicasPath: Schema.String,
                  statusReplicasPath: Schema.String,
                }),
              ),
              status: Schema.optional(Schema.Unknown),
            }),
          ),
        }),
      ),
    }),
    status: Schema.optional(
      Schema.Struct({
        acceptedNames: Schema.optional(
          Schema.Struct({
            categories: Schema.optional(Schema.Array(Schema.String)),
            kind: Schema.String,
            listKind: Schema.optional(Schema.String),
            plural: Schema.String,
            shortNames: Schema.optional(Schema.Array(Schema.String)),
            singular: Schema.optional(Schema.String),
          }),
        ),
        conditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastTransitionTime: Schema.optional(Schema.String),
              message: Schema.optional(Schema.String),
              observedGeneration: Schema.optional(Schema.Number),
              reason: Schema.optional(Schema.String),
              status: Schema.String,
              type: Schema.String,
            }),
          ),
        ),
        observedGeneration: Schema.optional(Schema.Number),
        storedVersions: Schema.optional(Schema.Array(Schema.String)),
      }),
    ),
  });
export type CreateApiextensionsV1CustomResourceDefinitionOutput =
  typeof CreateApiextensionsV1CustomResourceDefinitionOutput.Type;

// The operation
/**
 * create a CustomResourceDefinition
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const createApiextensionsV1CustomResourceDefinition =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateApiextensionsV1CustomResourceDefinitionInput,
    outputSchema: CreateApiextensionsV1CustomResourceDefinitionOutput,
  }));
// Input Schema
export const DeleteApiextensionsV1CollectionCustomResourceDefinitionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/apiextensions.k8s.io/v1/customresourcedefinitions",
    }),
  );
export type DeleteApiextensionsV1CollectionCustomResourceDefinitionInput =
  typeof DeleteApiextensionsV1CollectionCustomResourceDefinitionInput.Type;

// Output Schema
export const DeleteApiextensionsV1CollectionCustomResourceDefinitionOutput =
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
export type DeleteApiextensionsV1CollectionCustomResourceDefinitionOutput =
  typeof DeleteApiextensionsV1CollectionCustomResourceDefinitionOutput.Type;

// The operation
/**
 * delete collection of CustomResourceDefinition
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteApiextensionsV1CollectionCustomResourceDefinition =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteApiextensionsV1CollectionCustomResourceDefinitionInput,
    outputSchema: DeleteApiextensionsV1CollectionCustomResourceDefinitionOutput,
  }));
// Input Schema
export const DeleteApiextensionsV1CustomResourceDefinitionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/apiextensions.k8s.io/v1/customresourcedefinitions/{name}",
    }),
  );
export type DeleteApiextensionsV1CustomResourceDefinitionInput =
  typeof DeleteApiextensionsV1CustomResourceDefinitionInput.Type;

// Output Schema
export const DeleteApiextensionsV1CustomResourceDefinitionOutput =
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
export type DeleteApiextensionsV1CustomResourceDefinitionOutput =
  typeof DeleteApiextensionsV1CustomResourceDefinitionOutput.Type;

// The operation
/**
 * delete a CustomResourceDefinition
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteApiextensionsV1CustomResourceDefinition =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteApiextensionsV1CustomResourceDefinitionInput,
    outputSchema: DeleteApiextensionsV1CustomResourceDefinitionOutput,
  }));
// Input Schema
export const GetApiextensionsAPIGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/apis/apiextensions.k8s.io/" }),
  );
export type GetApiextensionsAPIGroupInput =
  typeof GetApiextensionsAPIGroupInput.Type;

// Output Schema
export const GetApiextensionsAPIGroupOutput =
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
export type GetApiextensionsAPIGroupOutput =
  typeof GetApiextensionsAPIGroupOutput.Type;

// The operation
/**
 * get information of a group
 */
export const getApiextensionsAPIGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetApiextensionsAPIGroupInput,
    outputSchema: GetApiextensionsAPIGroupOutput,
  }),
);
// Input Schema
export const GetApiextensionsV1APIResourcesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/apis/apiextensions.k8s.io/v1/" }),
  );
export type GetApiextensionsV1APIResourcesInput =
  typeof GetApiextensionsV1APIResourcesInput.Type;

// Output Schema
export const GetApiextensionsV1APIResourcesOutput =
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
export type GetApiextensionsV1APIResourcesOutput =
  typeof GetApiextensionsV1APIResourcesOutput.Type;

// The operation
/**
 * get available resources
 */
export const getApiextensionsV1APIResources =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetApiextensionsV1APIResourcesInput,
    outputSchema: GetApiextensionsV1APIResourcesOutput,
  }));
// Input Schema
export const ListApiextensionsV1CustomResourceDefinitionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/apiextensions.k8s.io/v1/customresourcedefinitions",
    }),
  );
export type ListApiextensionsV1CustomResourceDefinitionInput =
  typeof ListApiextensionsV1CustomResourceDefinitionInput.Type;

// Output Schema
export const ListApiextensionsV1CustomResourceDefinitionOutput =
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
          conversion: Schema.optional(
            Schema.Struct({
              strategy: Schema.String,
              webhook: Schema.optional(
                Schema.Struct({
                  clientConfig: Schema.optional(
                    Schema.Struct({
                      caBundle: Schema.optional(Schema.String),
                      service: Schema.optional(
                        Schema.Struct({
                          name: Schema.String,
                          namespace: Schema.String,
                          path: Schema.optional(Schema.String),
                          port: Schema.optional(Schema.Number),
                        }),
                      ),
                      url: Schema.optional(Schema.String),
                    }),
                  ),
                  conversionReviewVersions: Schema.Array(Schema.String),
                }),
              ),
            }),
          ),
          group: Schema.String,
          names: Schema.Struct({
            categories: Schema.optional(Schema.Array(Schema.String)),
            kind: Schema.String,
            listKind: Schema.optional(Schema.String),
            plural: Schema.String,
            shortNames: Schema.optional(Schema.Array(Schema.String)),
            singular: Schema.optional(Schema.String),
          }),
          preserveUnknownFields: Schema.optional(Schema.Boolean),
          scope: Schema.String,
          versions: Schema.Array(
            Schema.Struct({
              additionalPrinterColumns: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    description: Schema.optional(Schema.String),
                    format: Schema.optional(Schema.String),
                    jsonPath: Schema.String,
                    name: Schema.String,
                    priority: Schema.optional(Schema.Number),
                    type: Schema.String,
                  }),
                ),
              ),
              deprecated: Schema.optional(Schema.Boolean),
              deprecationWarning: Schema.optional(Schema.String),
              name: Schema.String,
              schema: Schema.optional(
                Schema.Struct({
                  openAPIV3Schema: Schema.optional(
                    Schema.Struct({
                      $ref: Schema.optional(Schema.String),
                      $schema: Schema.optional(Schema.String),
                      additionalItems: Schema.optional(Schema.Unknown),
                      additionalProperties: Schema.optional(Schema.Unknown),
                      allOf: Schema.optional(Schema.Array(Schema.Unknown)),
                      anyOf: Schema.optional(Schema.Array(Schema.Unknown)),
                      default: Schema.optional(Schema.Unknown),
                      definitions: Schema.optional(
                        Schema.Record(Schema.String, Schema.Unknown),
                      ),
                      dependencies: Schema.optional(
                        Schema.Record(Schema.String, Schema.Unknown),
                      ),
                      description: Schema.optional(Schema.String),
                      enum: Schema.optional(Schema.Array(Schema.Unknown)),
                      example: Schema.optional(Schema.Unknown),
                      exclusiveMaximum: Schema.optional(Schema.Boolean),
                      exclusiveMinimum: Schema.optional(Schema.Boolean),
                      externalDocs: Schema.optional(
                        Schema.Struct({
                          description: Schema.optional(Schema.String),
                          url: Schema.optional(Schema.String),
                        }),
                      ),
                      format: Schema.optional(Schema.String),
                      id: Schema.optional(Schema.String),
                      items: Schema.optional(Schema.Unknown),
                      maxItems: Schema.optional(Schema.Number),
                      maxLength: Schema.optional(Schema.Number),
                      maxProperties: Schema.optional(Schema.Number),
                      maximum: Schema.optional(Schema.Number),
                      minItems: Schema.optional(Schema.Number),
                      minLength: Schema.optional(Schema.Number),
                      minProperties: Schema.optional(Schema.Number),
                      minimum: Schema.optional(Schema.Number),
                      multipleOf: Schema.optional(Schema.Number),
                      not: Schema.optional(Schema.Unknown),
                      nullable: Schema.optional(Schema.Boolean),
                      oneOf: Schema.optional(Schema.Array(Schema.Unknown)),
                      pattern: Schema.optional(Schema.String),
                      patternProperties: Schema.optional(
                        Schema.Record(Schema.String, Schema.Unknown),
                      ),
                      properties: Schema.optional(
                        Schema.Record(Schema.String, Schema.Unknown),
                      ),
                      required: Schema.optional(Schema.Array(Schema.String)),
                      title: Schema.optional(Schema.String),
                      type: Schema.optional(Schema.String),
                      uniqueItems: Schema.optional(Schema.Boolean),
                      "x-kubernetes-embedded-resource": Schema.optional(
                        Schema.Boolean,
                      ),
                      "x-kubernetes-int-or-string": Schema.optional(
                        Schema.Boolean,
                      ),
                      "x-kubernetes-list-map-keys": Schema.optional(
                        Schema.Array(Schema.String),
                      ),
                      "x-kubernetes-list-type": Schema.optional(Schema.String),
                      "x-kubernetes-map-type": Schema.optional(Schema.String),
                      "x-kubernetes-preserve-unknown-fields": Schema.optional(
                        Schema.Boolean,
                      ),
                      "x-kubernetes-validations": Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            fieldPath: Schema.optional(Schema.String),
                            message: Schema.optional(Schema.String),
                            messageExpression: Schema.optional(Schema.String),
                            optionalOldSelf: Schema.optional(Schema.Boolean),
                            reason: Schema.optional(Schema.String),
                            rule: Schema.String,
                          }),
                        ),
                      ),
                    }),
                  ),
                }),
              ),
              selectableFields: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    jsonPath: Schema.String,
                  }),
                ),
              ),
              served: Schema.Boolean,
              storage: Schema.Boolean,
              subresources: Schema.optional(
                Schema.Struct({
                  scale: Schema.optional(
                    Schema.Struct({
                      labelSelectorPath: Schema.optional(Schema.String),
                      specReplicasPath: Schema.String,
                      statusReplicasPath: Schema.String,
                    }),
                  ),
                  status: Schema.optional(Schema.Unknown),
                }),
              ),
            }),
          ),
        }),
        status: Schema.optional(
          Schema.Struct({
            acceptedNames: Schema.optional(
              Schema.Struct({
                categories: Schema.optional(Schema.Array(Schema.String)),
                kind: Schema.String,
                listKind: Schema.optional(Schema.String),
                plural: Schema.String,
                shortNames: Schema.optional(Schema.Array(Schema.String)),
                singular: Schema.optional(Schema.String),
              }),
            ),
            conditions: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  lastTransitionTime: Schema.optional(Schema.String),
                  message: Schema.optional(Schema.String),
                  observedGeneration: Schema.optional(Schema.Number),
                  reason: Schema.optional(Schema.String),
                  status: Schema.String,
                  type: Schema.String,
                }),
              ),
            ),
            observedGeneration: Schema.optional(Schema.Number),
            storedVersions: Schema.optional(Schema.Array(Schema.String)),
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
export type ListApiextensionsV1CustomResourceDefinitionOutput =
  typeof ListApiextensionsV1CustomResourceDefinitionOutput.Type;

// The operation
/**
 * list or watch objects of kind CustomResourceDefinition
 */
export const listApiextensionsV1CustomResourceDefinition =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListApiextensionsV1CustomResourceDefinitionInput,
    outputSchema: ListApiextensionsV1CustomResourceDefinitionOutput,
  }));
// Input Schema
export const PatchApiextensionsV1CustomResourceDefinitionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/apiextensions.k8s.io/v1/customresourcedefinitions/{name}",
    }),
  );
export type PatchApiextensionsV1CustomResourceDefinitionInput =
  typeof PatchApiextensionsV1CustomResourceDefinitionInput.Type;

// Output Schema
export const PatchApiextensionsV1CustomResourceDefinitionOutput =
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
      conversion: Schema.optional(
        Schema.Struct({
          strategy: Schema.String,
          webhook: Schema.optional(
            Schema.Struct({
              clientConfig: Schema.optional(
                Schema.Struct({
                  caBundle: Schema.optional(Schema.String),
                  service: Schema.optional(
                    Schema.Struct({
                      name: Schema.String,
                      namespace: Schema.String,
                      path: Schema.optional(Schema.String),
                      port: Schema.optional(Schema.Number),
                    }),
                  ),
                  url: Schema.optional(Schema.String),
                }),
              ),
              conversionReviewVersions: Schema.Array(Schema.String),
            }),
          ),
        }),
      ),
      group: Schema.String,
      names: Schema.Struct({
        categories: Schema.optional(Schema.Array(Schema.String)),
        kind: Schema.String,
        listKind: Schema.optional(Schema.String),
        plural: Schema.String,
        shortNames: Schema.optional(Schema.Array(Schema.String)),
        singular: Schema.optional(Schema.String),
      }),
      preserveUnknownFields: Schema.optional(Schema.Boolean),
      scope: Schema.String,
      versions: Schema.Array(
        Schema.Struct({
          additionalPrinterColumns: Schema.optional(
            Schema.Array(
              Schema.Struct({
                description: Schema.optional(Schema.String),
                format: Schema.optional(Schema.String),
                jsonPath: Schema.String,
                name: Schema.String,
                priority: Schema.optional(Schema.Number),
                type: Schema.String,
              }),
            ),
          ),
          deprecated: Schema.optional(Schema.Boolean),
          deprecationWarning: Schema.optional(Schema.String),
          name: Schema.String,
          schema: Schema.optional(
            Schema.Struct({
              openAPIV3Schema: Schema.optional(
                Schema.Struct({
                  $ref: Schema.optional(Schema.String),
                  $schema: Schema.optional(Schema.String),
                  additionalItems: Schema.optional(Schema.Unknown),
                  additionalProperties: Schema.optional(Schema.Unknown),
                  allOf: Schema.optional(Schema.Array(Schema.Unknown)),
                  anyOf: Schema.optional(Schema.Array(Schema.Unknown)),
                  default: Schema.optional(Schema.Unknown),
                  definitions: Schema.optional(
                    Schema.Record(Schema.String, Schema.Unknown),
                  ),
                  dependencies: Schema.optional(
                    Schema.Record(Schema.String, Schema.Unknown),
                  ),
                  description: Schema.optional(Schema.String),
                  enum: Schema.optional(Schema.Array(Schema.Unknown)),
                  example: Schema.optional(Schema.Unknown),
                  exclusiveMaximum: Schema.optional(Schema.Boolean),
                  exclusiveMinimum: Schema.optional(Schema.Boolean),
                  externalDocs: Schema.optional(
                    Schema.Struct({
                      description: Schema.optional(Schema.String),
                      url: Schema.optional(Schema.String),
                    }),
                  ),
                  format: Schema.optional(Schema.String),
                  id: Schema.optional(Schema.String),
                  items: Schema.optional(Schema.Unknown),
                  maxItems: Schema.optional(Schema.Number),
                  maxLength: Schema.optional(Schema.Number),
                  maxProperties: Schema.optional(Schema.Number),
                  maximum: Schema.optional(Schema.Number),
                  minItems: Schema.optional(Schema.Number),
                  minLength: Schema.optional(Schema.Number),
                  minProperties: Schema.optional(Schema.Number),
                  minimum: Schema.optional(Schema.Number),
                  multipleOf: Schema.optional(Schema.Number),
                  not: Schema.optional(Schema.Unknown),
                  nullable: Schema.optional(Schema.Boolean),
                  oneOf: Schema.optional(Schema.Array(Schema.Unknown)),
                  pattern: Schema.optional(Schema.String),
                  patternProperties: Schema.optional(
                    Schema.Record(Schema.String, Schema.Unknown),
                  ),
                  properties: Schema.optional(
                    Schema.Record(Schema.String, Schema.Unknown),
                  ),
                  required: Schema.optional(Schema.Array(Schema.String)),
                  title: Schema.optional(Schema.String),
                  type: Schema.optional(Schema.String),
                  uniqueItems: Schema.optional(Schema.Boolean),
                  "x-kubernetes-embedded-resource": Schema.optional(
                    Schema.Boolean,
                  ),
                  "x-kubernetes-int-or-string": Schema.optional(Schema.Boolean),
                  "x-kubernetes-list-map-keys": Schema.optional(
                    Schema.Array(Schema.String),
                  ),
                  "x-kubernetes-list-type": Schema.optional(Schema.String),
                  "x-kubernetes-map-type": Schema.optional(Schema.String),
                  "x-kubernetes-preserve-unknown-fields": Schema.optional(
                    Schema.Boolean,
                  ),
                  "x-kubernetes-validations": Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        fieldPath: Schema.optional(Schema.String),
                        message: Schema.optional(Schema.String),
                        messageExpression: Schema.optional(Schema.String),
                        optionalOldSelf: Schema.optional(Schema.Boolean),
                        reason: Schema.optional(Schema.String),
                        rule: Schema.String,
                      }),
                    ),
                  ),
                }),
              ),
            }),
          ),
          selectableFields: Schema.optional(
            Schema.Array(
              Schema.Struct({
                jsonPath: Schema.String,
              }),
            ),
          ),
          served: Schema.Boolean,
          storage: Schema.Boolean,
          subresources: Schema.optional(
            Schema.Struct({
              scale: Schema.optional(
                Schema.Struct({
                  labelSelectorPath: Schema.optional(Schema.String),
                  specReplicasPath: Schema.String,
                  statusReplicasPath: Schema.String,
                }),
              ),
              status: Schema.optional(Schema.Unknown),
            }),
          ),
        }),
      ),
    }),
    status: Schema.optional(
      Schema.Struct({
        acceptedNames: Schema.optional(
          Schema.Struct({
            categories: Schema.optional(Schema.Array(Schema.String)),
            kind: Schema.String,
            listKind: Schema.optional(Schema.String),
            plural: Schema.String,
            shortNames: Schema.optional(Schema.Array(Schema.String)),
            singular: Schema.optional(Schema.String),
          }),
        ),
        conditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastTransitionTime: Schema.optional(Schema.String),
              message: Schema.optional(Schema.String),
              observedGeneration: Schema.optional(Schema.Number),
              reason: Schema.optional(Schema.String),
              status: Schema.String,
              type: Schema.String,
            }),
          ),
        ),
        observedGeneration: Schema.optional(Schema.Number),
        storedVersions: Schema.optional(Schema.Array(Schema.String)),
      }),
    ),
  });
export type PatchApiextensionsV1CustomResourceDefinitionOutput =
  typeof PatchApiextensionsV1CustomResourceDefinitionOutput.Type;

// The operation
/**
 * partially update the specified CustomResourceDefinition
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchApiextensionsV1CustomResourceDefinition =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PatchApiextensionsV1CustomResourceDefinitionInput,
    outputSchema: PatchApiextensionsV1CustomResourceDefinitionOutput,
  }));
// Input Schema
export const PatchApiextensionsV1CustomResourceDefinitionStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/apiextensions.k8s.io/v1/customresourcedefinitions/{name}/status",
    }),
  );
export type PatchApiextensionsV1CustomResourceDefinitionStatusInput =
  typeof PatchApiextensionsV1CustomResourceDefinitionStatusInput.Type;

// Output Schema
export const PatchApiextensionsV1CustomResourceDefinitionStatusOutput =
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
      conversion: Schema.optional(
        Schema.Struct({
          strategy: Schema.String,
          webhook: Schema.optional(
            Schema.Struct({
              clientConfig: Schema.optional(
                Schema.Struct({
                  caBundle: Schema.optional(Schema.String),
                  service: Schema.optional(
                    Schema.Struct({
                      name: Schema.String,
                      namespace: Schema.String,
                      path: Schema.optional(Schema.String),
                      port: Schema.optional(Schema.Number),
                    }),
                  ),
                  url: Schema.optional(Schema.String),
                }),
              ),
              conversionReviewVersions: Schema.Array(Schema.String),
            }),
          ),
        }),
      ),
      group: Schema.String,
      names: Schema.Struct({
        categories: Schema.optional(Schema.Array(Schema.String)),
        kind: Schema.String,
        listKind: Schema.optional(Schema.String),
        plural: Schema.String,
        shortNames: Schema.optional(Schema.Array(Schema.String)),
        singular: Schema.optional(Schema.String),
      }),
      preserveUnknownFields: Schema.optional(Schema.Boolean),
      scope: Schema.String,
      versions: Schema.Array(
        Schema.Struct({
          additionalPrinterColumns: Schema.optional(
            Schema.Array(
              Schema.Struct({
                description: Schema.optional(Schema.String),
                format: Schema.optional(Schema.String),
                jsonPath: Schema.String,
                name: Schema.String,
                priority: Schema.optional(Schema.Number),
                type: Schema.String,
              }),
            ),
          ),
          deprecated: Schema.optional(Schema.Boolean),
          deprecationWarning: Schema.optional(Schema.String),
          name: Schema.String,
          schema: Schema.optional(
            Schema.Struct({
              openAPIV3Schema: Schema.optional(
                Schema.Struct({
                  $ref: Schema.optional(Schema.String),
                  $schema: Schema.optional(Schema.String),
                  additionalItems: Schema.optional(Schema.Unknown),
                  additionalProperties: Schema.optional(Schema.Unknown),
                  allOf: Schema.optional(Schema.Array(Schema.Unknown)),
                  anyOf: Schema.optional(Schema.Array(Schema.Unknown)),
                  default: Schema.optional(Schema.Unknown),
                  definitions: Schema.optional(
                    Schema.Record(Schema.String, Schema.Unknown),
                  ),
                  dependencies: Schema.optional(
                    Schema.Record(Schema.String, Schema.Unknown),
                  ),
                  description: Schema.optional(Schema.String),
                  enum: Schema.optional(Schema.Array(Schema.Unknown)),
                  example: Schema.optional(Schema.Unknown),
                  exclusiveMaximum: Schema.optional(Schema.Boolean),
                  exclusiveMinimum: Schema.optional(Schema.Boolean),
                  externalDocs: Schema.optional(
                    Schema.Struct({
                      description: Schema.optional(Schema.String),
                      url: Schema.optional(Schema.String),
                    }),
                  ),
                  format: Schema.optional(Schema.String),
                  id: Schema.optional(Schema.String),
                  items: Schema.optional(Schema.Unknown),
                  maxItems: Schema.optional(Schema.Number),
                  maxLength: Schema.optional(Schema.Number),
                  maxProperties: Schema.optional(Schema.Number),
                  maximum: Schema.optional(Schema.Number),
                  minItems: Schema.optional(Schema.Number),
                  minLength: Schema.optional(Schema.Number),
                  minProperties: Schema.optional(Schema.Number),
                  minimum: Schema.optional(Schema.Number),
                  multipleOf: Schema.optional(Schema.Number),
                  not: Schema.optional(Schema.Unknown),
                  nullable: Schema.optional(Schema.Boolean),
                  oneOf: Schema.optional(Schema.Array(Schema.Unknown)),
                  pattern: Schema.optional(Schema.String),
                  patternProperties: Schema.optional(
                    Schema.Record(Schema.String, Schema.Unknown),
                  ),
                  properties: Schema.optional(
                    Schema.Record(Schema.String, Schema.Unknown),
                  ),
                  required: Schema.optional(Schema.Array(Schema.String)),
                  title: Schema.optional(Schema.String),
                  type: Schema.optional(Schema.String),
                  uniqueItems: Schema.optional(Schema.Boolean),
                  "x-kubernetes-embedded-resource": Schema.optional(
                    Schema.Boolean,
                  ),
                  "x-kubernetes-int-or-string": Schema.optional(Schema.Boolean),
                  "x-kubernetes-list-map-keys": Schema.optional(
                    Schema.Array(Schema.String),
                  ),
                  "x-kubernetes-list-type": Schema.optional(Schema.String),
                  "x-kubernetes-map-type": Schema.optional(Schema.String),
                  "x-kubernetes-preserve-unknown-fields": Schema.optional(
                    Schema.Boolean,
                  ),
                  "x-kubernetes-validations": Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        fieldPath: Schema.optional(Schema.String),
                        message: Schema.optional(Schema.String),
                        messageExpression: Schema.optional(Schema.String),
                        optionalOldSelf: Schema.optional(Schema.Boolean),
                        reason: Schema.optional(Schema.String),
                        rule: Schema.String,
                      }),
                    ),
                  ),
                }),
              ),
            }),
          ),
          selectableFields: Schema.optional(
            Schema.Array(
              Schema.Struct({
                jsonPath: Schema.String,
              }),
            ),
          ),
          served: Schema.Boolean,
          storage: Schema.Boolean,
          subresources: Schema.optional(
            Schema.Struct({
              scale: Schema.optional(
                Schema.Struct({
                  labelSelectorPath: Schema.optional(Schema.String),
                  specReplicasPath: Schema.String,
                  statusReplicasPath: Schema.String,
                }),
              ),
              status: Schema.optional(Schema.Unknown),
            }),
          ),
        }),
      ),
    }),
    status: Schema.optional(
      Schema.Struct({
        acceptedNames: Schema.optional(
          Schema.Struct({
            categories: Schema.optional(Schema.Array(Schema.String)),
            kind: Schema.String,
            listKind: Schema.optional(Schema.String),
            plural: Schema.String,
            shortNames: Schema.optional(Schema.Array(Schema.String)),
            singular: Schema.optional(Schema.String),
          }),
        ),
        conditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastTransitionTime: Schema.optional(Schema.String),
              message: Schema.optional(Schema.String),
              observedGeneration: Schema.optional(Schema.Number),
              reason: Schema.optional(Schema.String),
              status: Schema.String,
              type: Schema.String,
            }),
          ),
        ),
        observedGeneration: Schema.optional(Schema.Number),
        storedVersions: Schema.optional(Schema.Array(Schema.String)),
      }),
    ),
  });
export type PatchApiextensionsV1CustomResourceDefinitionStatusOutput =
  typeof PatchApiextensionsV1CustomResourceDefinitionStatusOutput.Type;

// The operation
/**
 * partially update status of the specified CustomResourceDefinition
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchApiextensionsV1CustomResourceDefinitionStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PatchApiextensionsV1CustomResourceDefinitionStatusInput,
    outputSchema: PatchApiextensionsV1CustomResourceDefinitionStatusOutput,
  }));
// Input Schema
export const ReadApiextensionsV1CustomResourceDefinitionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/apiextensions.k8s.io/v1/customresourcedefinitions/{name}",
    }),
  );
export type ReadApiextensionsV1CustomResourceDefinitionInput =
  typeof ReadApiextensionsV1CustomResourceDefinitionInput.Type;

// Output Schema
export const ReadApiextensionsV1CustomResourceDefinitionOutput =
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
      conversion: Schema.optional(
        Schema.Struct({
          strategy: Schema.String,
          webhook: Schema.optional(
            Schema.Struct({
              clientConfig: Schema.optional(
                Schema.Struct({
                  caBundle: Schema.optional(Schema.String),
                  service: Schema.optional(
                    Schema.Struct({
                      name: Schema.String,
                      namespace: Schema.String,
                      path: Schema.optional(Schema.String),
                      port: Schema.optional(Schema.Number),
                    }),
                  ),
                  url: Schema.optional(Schema.String),
                }),
              ),
              conversionReviewVersions: Schema.Array(Schema.String),
            }),
          ),
        }),
      ),
      group: Schema.String,
      names: Schema.Struct({
        categories: Schema.optional(Schema.Array(Schema.String)),
        kind: Schema.String,
        listKind: Schema.optional(Schema.String),
        plural: Schema.String,
        shortNames: Schema.optional(Schema.Array(Schema.String)),
        singular: Schema.optional(Schema.String),
      }),
      preserveUnknownFields: Schema.optional(Schema.Boolean),
      scope: Schema.String,
      versions: Schema.Array(
        Schema.Struct({
          additionalPrinterColumns: Schema.optional(
            Schema.Array(
              Schema.Struct({
                description: Schema.optional(Schema.String),
                format: Schema.optional(Schema.String),
                jsonPath: Schema.String,
                name: Schema.String,
                priority: Schema.optional(Schema.Number),
                type: Schema.String,
              }),
            ),
          ),
          deprecated: Schema.optional(Schema.Boolean),
          deprecationWarning: Schema.optional(Schema.String),
          name: Schema.String,
          schema: Schema.optional(
            Schema.Struct({
              openAPIV3Schema: Schema.optional(
                Schema.Struct({
                  $ref: Schema.optional(Schema.String),
                  $schema: Schema.optional(Schema.String),
                  additionalItems: Schema.optional(Schema.Unknown),
                  additionalProperties: Schema.optional(Schema.Unknown),
                  allOf: Schema.optional(Schema.Array(Schema.Unknown)),
                  anyOf: Schema.optional(Schema.Array(Schema.Unknown)),
                  default: Schema.optional(Schema.Unknown),
                  definitions: Schema.optional(
                    Schema.Record(Schema.String, Schema.Unknown),
                  ),
                  dependencies: Schema.optional(
                    Schema.Record(Schema.String, Schema.Unknown),
                  ),
                  description: Schema.optional(Schema.String),
                  enum: Schema.optional(Schema.Array(Schema.Unknown)),
                  example: Schema.optional(Schema.Unknown),
                  exclusiveMaximum: Schema.optional(Schema.Boolean),
                  exclusiveMinimum: Schema.optional(Schema.Boolean),
                  externalDocs: Schema.optional(
                    Schema.Struct({
                      description: Schema.optional(Schema.String),
                      url: Schema.optional(Schema.String),
                    }),
                  ),
                  format: Schema.optional(Schema.String),
                  id: Schema.optional(Schema.String),
                  items: Schema.optional(Schema.Unknown),
                  maxItems: Schema.optional(Schema.Number),
                  maxLength: Schema.optional(Schema.Number),
                  maxProperties: Schema.optional(Schema.Number),
                  maximum: Schema.optional(Schema.Number),
                  minItems: Schema.optional(Schema.Number),
                  minLength: Schema.optional(Schema.Number),
                  minProperties: Schema.optional(Schema.Number),
                  minimum: Schema.optional(Schema.Number),
                  multipleOf: Schema.optional(Schema.Number),
                  not: Schema.optional(Schema.Unknown),
                  nullable: Schema.optional(Schema.Boolean),
                  oneOf: Schema.optional(Schema.Array(Schema.Unknown)),
                  pattern: Schema.optional(Schema.String),
                  patternProperties: Schema.optional(
                    Schema.Record(Schema.String, Schema.Unknown),
                  ),
                  properties: Schema.optional(
                    Schema.Record(Schema.String, Schema.Unknown),
                  ),
                  required: Schema.optional(Schema.Array(Schema.String)),
                  title: Schema.optional(Schema.String),
                  type: Schema.optional(Schema.String),
                  uniqueItems: Schema.optional(Schema.Boolean),
                  "x-kubernetes-embedded-resource": Schema.optional(
                    Schema.Boolean,
                  ),
                  "x-kubernetes-int-or-string": Schema.optional(Schema.Boolean),
                  "x-kubernetes-list-map-keys": Schema.optional(
                    Schema.Array(Schema.String),
                  ),
                  "x-kubernetes-list-type": Schema.optional(Schema.String),
                  "x-kubernetes-map-type": Schema.optional(Schema.String),
                  "x-kubernetes-preserve-unknown-fields": Schema.optional(
                    Schema.Boolean,
                  ),
                  "x-kubernetes-validations": Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        fieldPath: Schema.optional(Schema.String),
                        message: Schema.optional(Schema.String),
                        messageExpression: Schema.optional(Schema.String),
                        optionalOldSelf: Schema.optional(Schema.Boolean),
                        reason: Schema.optional(Schema.String),
                        rule: Schema.String,
                      }),
                    ),
                  ),
                }),
              ),
            }),
          ),
          selectableFields: Schema.optional(
            Schema.Array(
              Schema.Struct({
                jsonPath: Schema.String,
              }),
            ),
          ),
          served: Schema.Boolean,
          storage: Schema.Boolean,
          subresources: Schema.optional(
            Schema.Struct({
              scale: Schema.optional(
                Schema.Struct({
                  labelSelectorPath: Schema.optional(Schema.String),
                  specReplicasPath: Schema.String,
                  statusReplicasPath: Schema.String,
                }),
              ),
              status: Schema.optional(Schema.Unknown),
            }),
          ),
        }),
      ),
    }),
    status: Schema.optional(
      Schema.Struct({
        acceptedNames: Schema.optional(
          Schema.Struct({
            categories: Schema.optional(Schema.Array(Schema.String)),
            kind: Schema.String,
            listKind: Schema.optional(Schema.String),
            plural: Schema.String,
            shortNames: Schema.optional(Schema.Array(Schema.String)),
            singular: Schema.optional(Schema.String),
          }),
        ),
        conditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastTransitionTime: Schema.optional(Schema.String),
              message: Schema.optional(Schema.String),
              observedGeneration: Schema.optional(Schema.Number),
              reason: Schema.optional(Schema.String),
              status: Schema.String,
              type: Schema.String,
            }),
          ),
        ),
        observedGeneration: Schema.optional(Schema.Number),
        storedVersions: Schema.optional(Schema.Array(Schema.String)),
      }),
    ),
  });
export type ReadApiextensionsV1CustomResourceDefinitionOutput =
  typeof ReadApiextensionsV1CustomResourceDefinitionOutput.Type;

// The operation
/**
 * read the specified CustomResourceDefinition
 */
export const readApiextensionsV1CustomResourceDefinition =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReadApiextensionsV1CustomResourceDefinitionInput,
    outputSchema: ReadApiextensionsV1CustomResourceDefinitionOutput,
  }));
// Input Schema
export const ReadApiextensionsV1CustomResourceDefinitionStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/apiextensions.k8s.io/v1/customresourcedefinitions/{name}/status",
    }),
  );
export type ReadApiextensionsV1CustomResourceDefinitionStatusInput =
  typeof ReadApiextensionsV1CustomResourceDefinitionStatusInput.Type;

// Output Schema
export const ReadApiextensionsV1CustomResourceDefinitionStatusOutput =
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
      conversion: Schema.optional(
        Schema.Struct({
          strategy: Schema.String,
          webhook: Schema.optional(
            Schema.Struct({
              clientConfig: Schema.optional(
                Schema.Struct({
                  caBundle: Schema.optional(Schema.String),
                  service: Schema.optional(
                    Schema.Struct({
                      name: Schema.String,
                      namespace: Schema.String,
                      path: Schema.optional(Schema.String),
                      port: Schema.optional(Schema.Number),
                    }),
                  ),
                  url: Schema.optional(Schema.String),
                }),
              ),
              conversionReviewVersions: Schema.Array(Schema.String),
            }),
          ),
        }),
      ),
      group: Schema.String,
      names: Schema.Struct({
        categories: Schema.optional(Schema.Array(Schema.String)),
        kind: Schema.String,
        listKind: Schema.optional(Schema.String),
        plural: Schema.String,
        shortNames: Schema.optional(Schema.Array(Schema.String)),
        singular: Schema.optional(Schema.String),
      }),
      preserveUnknownFields: Schema.optional(Schema.Boolean),
      scope: Schema.String,
      versions: Schema.Array(
        Schema.Struct({
          additionalPrinterColumns: Schema.optional(
            Schema.Array(
              Schema.Struct({
                description: Schema.optional(Schema.String),
                format: Schema.optional(Schema.String),
                jsonPath: Schema.String,
                name: Schema.String,
                priority: Schema.optional(Schema.Number),
                type: Schema.String,
              }),
            ),
          ),
          deprecated: Schema.optional(Schema.Boolean),
          deprecationWarning: Schema.optional(Schema.String),
          name: Schema.String,
          schema: Schema.optional(
            Schema.Struct({
              openAPIV3Schema: Schema.optional(
                Schema.Struct({
                  $ref: Schema.optional(Schema.String),
                  $schema: Schema.optional(Schema.String),
                  additionalItems: Schema.optional(Schema.Unknown),
                  additionalProperties: Schema.optional(Schema.Unknown),
                  allOf: Schema.optional(Schema.Array(Schema.Unknown)),
                  anyOf: Schema.optional(Schema.Array(Schema.Unknown)),
                  default: Schema.optional(Schema.Unknown),
                  definitions: Schema.optional(
                    Schema.Record(Schema.String, Schema.Unknown),
                  ),
                  dependencies: Schema.optional(
                    Schema.Record(Schema.String, Schema.Unknown),
                  ),
                  description: Schema.optional(Schema.String),
                  enum: Schema.optional(Schema.Array(Schema.Unknown)),
                  example: Schema.optional(Schema.Unknown),
                  exclusiveMaximum: Schema.optional(Schema.Boolean),
                  exclusiveMinimum: Schema.optional(Schema.Boolean),
                  externalDocs: Schema.optional(
                    Schema.Struct({
                      description: Schema.optional(Schema.String),
                      url: Schema.optional(Schema.String),
                    }),
                  ),
                  format: Schema.optional(Schema.String),
                  id: Schema.optional(Schema.String),
                  items: Schema.optional(Schema.Unknown),
                  maxItems: Schema.optional(Schema.Number),
                  maxLength: Schema.optional(Schema.Number),
                  maxProperties: Schema.optional(Schema.Number),
                  maximum: Schema.optional(Schema.Number),
                  minItems: Schema.optional(Schema.Number),
                  minLength: Schema.optional(Schema.Number),
                  minProperties: Schema.optional(Schema.Number),
                  minimum: Schema.optional(Schema.Number),
                  multipleOf: Schema.optional(Schema.Number),
                  not: Schema.optional(Schema.Unknown),
                  nullable: Schema.optional(Schema.Boolean),
                  oneOf: Schema.optional(Schema.Array(Schema.Unknown)),
                  pattern: Schema.optional(Schema.String),
                  patternProperties: Schema.optional(
                    Schema.Record(Schema.String, Schema.Unknown),
                  ),
                  properties: Schema.optional(
                    Schema.Record(Schema.String, Schema.Unknown),
                  ),
                  required: Schema.optional(Schema.Array(Schema.String)),
                  title: Schema.optional(Schema.String),
                  type: Schema.optional(Schema.String),
                  uniqueItems: Schema.optional(Schema.Boolean),
                  "x-kubernetes-embedded-resource": Schema.optional(
                    Schema.Boolean,
                  ),
                  "x-kubernetes-int-or-string": Schema.optional(Schema.Boolean),
                  "x-kubernetes-list-map-keys": Schema.optional(
                    Schema.Array(Schema.String),
                  ),
                  "x-kubernetes-list-type": Schema.optional(Schema.String),
                  "x-kubernetes-map-type": Schema.optional(Schema.String),
                  "x-kubernetes-preserve-unknown-fields": Schema.optional(
                    Schema.Boolean,
                  ),
                  "x-kubernetes-validations": Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        fieldPath: Schema.optional(Schema.String),
                        message: Schema.optional(Schema.String),
                        messageExpression: Schema.optional(Schema.String),
                        optionalOldSelf: Schema.optional(Schema.Boolean),
                        reason: Schema.optional(Schema.String),
                        rule: Schema.String,
                      }),
                    ),
                  ),
                }),
              ),
            }),
          ),
          selectableFields: Schema.optional(
            Schema.Array(
              Schema.Struct({
                jsonPath: Schema.String,
              }),
            ),
          ),
          served: Schema.Boolean,
          storage: Schema.Boolean,
          subresources: Schema.optional(
            Schema.Struct({
              scale: Schema.optional(
                Schema.Struct({
                  labelSelectorPath: Schema.optional(Schema.String),
                  specReplicasPath: Schema.String,
                  statusReplicasPath: Schema.String,
                }),
              ),
              status: Schema.optional(Schema.Unknown),
            }),
          ),
        }),
      ),
    }),
    status: Schema.optional(
      Schema.Struct({
        acceptedNames: Schema.optional(
          Schema.Struct({
            categories: Schema.optional(Schema.Array(Schema.String)),
            kind: Schema.String,
            listKind: Schema.optional(Schema.String),
            plural: Schema.String,
            shortNames: Schema.optional(Schema.Array(Schema.String)),
            singular: Schema.optional(Schema.String),
          }),
        ),
        conditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastTransitionTime: Schema.optional(Schema.String),
              message: Schema.optional(Schema.String),
              observedGeneration: Schema.optional(Schema.Number),
              reason: Schema.optional(Schema.String),
              status: Schema.String,
              type: Schema.String,
            }),
          ),
        ),
        observedGeneration: Schema.optional(Schema.Number),
        storedVersions: Schema.optional(Schema.Array(Schema.String)),
      }),
    ),
  });
export type ReadApiextensionsV1CustomResourceDefinitionStatusOutput =
  typeof ReadApiextensionsV1CustomResourceDefinitionStatusOutput.Type;

// The operation
/**
 * read status of the specified CustomResourceDefinition
 */
export const readApiextensionsV1CustomResourceDefinitionStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReadApiextensionsV1CustomResourceDefinitionStatusInput,
    outputSchema: ReadApiextensionsV1CustomResourceDefinitionStatusOutput,
  }));
// Input Schema
export const ReplaceApiextensionsV1CustomResourceDefinitionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/apiextensions.k8s.io/v1/customresourcedefinitions/{name}",
    }),
  );
export type ReplaceApiextensionsV1CustomResourceDefinitionInput =
  typeof ReplaceApiextensionsV1CustomResourceDefinitionInput.Type;

// Output Schema
export const ReplaceApiextensionsV1CustomResourceDefinitionOutput =
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
      conversion: Schema.optional(
        Schema.Struct({
          strategy: Schema.String,
          webhook: Schema.optional(
            Schema.Struct({
              clientConfig: Schema.optional(
                Schema.Struct({
                  caBundle: Schema.optional(Schema.String),
                  service: Schema.optional(
                    Schema.Struct({
                      name: Schema.String,
                      namespace: Schema.String,
                      path: Schema.optional(Schema.String),
                      port: Schema.optional(Schema.Number),
                    }),
                  ),
                  url: Schema.optional(Schema.String),
                }),
              ),
              conversionReviewVersions: Schema.Array(Schema.String),
            }),
          ),
        }),
      ),
      group: Schema.String,
      names: Schema.Struct({
        categories: Schema.optional(Schema.Array(Schema.String)),
        kind: Schema.String,
        listKind: Schema.optional(Schema.String),
        plural: Schema.String,
        shortNames: Schema.optional(Schema.Array(Schema.String)),
        singular: Schema.optional(Schema.String),
      }),
      preserveUnknownFields: Schema.optional(Schema.Boolean),
      scope: Schema.String,
      versions: Schema.Array(
        Schema.Struct({
          additionalPrinterColumns: Schema.optional(
            Schema.Array(
              Schema.Struct({
                description: Schema.optional(Schema.String),
                format: Schema.optional(Schema.String),
                jsonPath: Schema.String,
                name: Schema.String,
                priority: Schema.optional(Schema.Number),
                type: Schema.String,
              }),
            ),
          ),
          deprecated: Schema.optional(Schema.Boolean),
          deprecationWarning: Schema.optional(Schema.String),
          name: Schema.String,
          schema: Schema.optional(
            Schema.Struct({
              openAPIV3Schema: Schema.optional(
                Schema.Struct({
                  $ref: Schema.optional(Schema.String),
                  $schema: Schema.optional(Schema.String),
                  additionalItems: Schema.optional(Schema.Unknown),
                  additionalProperties: Schema.optional(Schema.Unknown),
                  allOf: Schema.optional(Schema.Array(Schema.Unknown)),
                  anyOf: Schema.optional(Schema.Array(Schema.Unknown)),
                  default: Schema.optional(Schema.Unknown),
                  definitions: Schema.optional(
                    Schema.Record(Schema.String, Schema.Unknown),
                  ),
                  dependencies: Schema.optional(
                    Schema.Record(Schema.String, Schema.Unknown),
                  ),
                  description: Schema.optional(Schema.String),
                  enum: Schema.optional(Schema.Array(Schema.Unknown)),
                  example: Schema.optional(Schema.Unknown),
                  exclusiveMaximum: Schema.optional(Schema.Boolean),
                  exclusiveMinimum: Schema.optional(Schema.Boolean),
                  externalDocs: Schema.optional(
                    Schema.Struct({
                      description: Schema.optional(Schema.String),
                      url: Schema.optional(Schema.String),
                    }),
                  ),
                  format: Schema.optional(Schema.String),
                  id: Schema.optional(Schema.String),
                  items: Schema.optional(Schema.Unknown),
                  maxItems: Schema.optional(Schema.Number),
                  maxLength: Schema.optional(Schema.Number),
                  maxProperties: Schema.optional(Schema.Number),
                  maximum: Schema.optional(Schema.Number),
                  minItems: Schema.optional(Schema.Number),
                  minLength: Schema.optional(Schema.Number),
                  minProperties: Schema.optional(Schema.Number),
                  minimum: Schema.optional(Schema.Number),
                  multipleOf: Schema.optional(Schema.Number),
                  not: Schema.optional(Schema.Unknown),
                  nullable: Schema.optional(Schema.Boolean),
                  oneOf: Schema.optional(Schema.Array(Schema.Unknown)),
                  pattern: Schema.optional(Schema.String),
                  patternProperties: Schema.optional(
                    Schema.Record(Schema.String, Schema.Unknown),
                  ),
                  properties: Schema.optional(
                    Schema.Record(Schema.String, Schema.Unknown),
                  ),
                  required: Schema.optional(Schema.Array(Schema.String)),
                  title: Schema.optional(Schema.String),
                  type: Schema.optional(Schema.String),
                  uniqueItems: Schema.optional(Schema.Boolean),
                  "x-kubernetes-embedded-resource": Schema.optional(
                    Schema.Boolean,
                  ),
                  "x-kubernetes-int-or-string": Schema.optional(Schema.Boolean),
                  "x-kubernetes-list-map-keys": Schema.optional(
                    Schema.Array(Schema.String),
                  ),
                  "x-kubernetes-list-type": Schema.optional(Schema.String),
                  "x-kubernetes-map-type": Schema.optional(Schema.String),
                  "x-kubernetes-preserve-unknown-fields": Schema.optional(
                    Schema.Boolean,
                  ),
                  "x-kubernetes-validations": Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        fieldPath: Schema.optional(Schema.String),
                        message: Schema.optional(Schema.String),
                        messageExpression: Schema.optional(Schema.String),
                        optionalOldSelf: Schema.optional(Schema.Boolean),
                        reason: Schema.optional(Schema.String),
                        rule: Schema.String,
                      }),
                    ),
                  ),
                }),
              ),
            }),
          ),
          selectableFields: Schema.optional(
            Schema.Array(
              Schema.Struct({
                jsonPath: Schema.String,
              }),
            ),
          ),
          served: Schema.Boolean,
          storage: Schema.Boolean,
          subresources: Schema.optional(
            Schema.Struct({
              scale: Schema.optional(
                Schema.Struct({
                  labelSelectorPath: Schema.optional(Schema.String),
                  specReplicasPath: Schema.String,
                  statusReplicasPath: Schema.String,
                }),
              ),
              status: Schema.optional(Schema.Unknown),
            }),
          ),
        }),
      ),
    }),
    status: Schema.optional(
      Schema.Struct({
        acceptedNames: Schema.optional(
          Schema.Struct({
            categories: Schema.optional(Schema.Array(Schema.String)),
            kind: Schema.String,
            listKind: Schema.optional(Schema.String),
            plural: Schema.String,
            shortNames: Schema.optional(Schema.Array(Schema.String)),
            singular: Schema.optional(Schema.String),
          }),
        ),
        conditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastTransitionTime: Schema.optional(Schema.String),
              message: Schema.optional(Schema.String),
              observedGeneration: Schema.optional(Schema.Number),
              reason: Schema.optional(Schema.String),
              status: Schema.String,
              type: Schema.String,
            }),
          ),
        ),
        observedGeneration: Schema.optional(Schema.Number),
        storedVersions: Schema.optional(Schema.Array(Schema.String)),
      }),
    ),
  });
export type ReplaceApiextensionsV1CustomResourceDefinitionOutput =
  typeof ReplaceApiextensionsV1CustomResourceDefinitionOutput.Type;

// The operation
/**
 * replace the specified CustomResourceDefinition
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceApiextensionsV1CustomResourceDefinition =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReplaceApiextensionsV1CustomResourceDefinitionInput,
    outputSchema: ReplaceApiextensionsV1CustomResourceDefinitionOutput,
  }));
// Input Schema
export const ReplaceApiextensionsV1CustomResourceDefinitionStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/apiextensions.k8s.io/v1/customresourcedefinitions/{name}/status",
    }),
  );
export type ReplaceApiextensionsV1CustomResourceDefinitionStatusInput =
  typeof ReplaceApiextensionsV1CustomResourceDefinitionStatusInput.Type;

// Output Schema
export const ReplaceApiextensionsV1CustomResourceDefinitionStatusOutput =
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
      conversion: Schema.optional(
        Schema.Struct({
          strategy: Schema.String,
          webhook: Schema.optional(
            Schema.Struct({
              clientConfig: Schema.optional(
                Schema.Struct({
                  caBundle: Schema.optional(Schema.String),
                  service: Schema.optional(
                    Schema.Struct({
                      name: Schema.String,
                      namespace: Schema.String,
                      path: Schema.optional(Schema.String),
                      port: Schema.optional(Schema.Number),
                    }),
                  ),
                  url: Schema.optional(Schema.String),
                }),
              ),
              conversionReviewVersions: Schema.Array(Schema.String),
            }),
          ),
        }),
      ),
      group: Schema.String,
      names: Schema.Struct({
        categories: Schema.optional(Schema.Array(Schema.String)),
        kind: Schema.String,
        listKind: Schema.optional(Schema.String),
        plural: Schema.String,
        shortNames: Schema.optional(Schema.Array(Schema.String)),
        singular: Schema.optional(Schema.String),
      }),
      preserveUnknownFields: Schema.optional(Schema.Boolean),
      scope: Schema.String,
      versions: Schema.Array(
        Schema.Struct({
          additionalPrinterColumns: Schema.optional(
            Schema.Array(
              Schema.Struct({
                description: Schema.optional(Schema.String),
                format: Schema.optional(Schema.String),
                jsonPath: Schema.String,
                name: Schema.String,
                priority: Schema.optional(Schema.Number),
                type: Schema.String,
              }),
            ),
          ),
          deprecated: Schema.optional(Schema.Boolean),
          deprecationWarning: Schema.optional(Schema.String),
          name: Schema.String,
          schema: Schema.optional(
            Schema.Struct({
              openAPIV3Schema: Schema.optional(
                Schema.Struct({
                  $ref: Schema.optional(Schema.String),
                  $schema: Schema.optional(Schema.String),
                  additionalItems: Schema.optional(Schema.Unknown),
                  additionalProperties: Schema.optional(Schema.Unknown),
                  allOf: Schema.optional(Schema.Array(Schema.Unknown)),
                  anyOf: Schema.optional(Schema.Array(Schema.Unknown)),
                  default: Schema.optional(Schema.Unknown),
                  definitions: Schema.optional(
                    Schema.Record(Schema.String, Schema.Unknown),
                  ),
                  dependencies: Schema.optional(
                    Schema.Record(Schema.String, Schema.Unknown),
                  ),
                  description: Schema.optional(Schema.String),
                  enum: Schema.optional(Schema.Array(Schema.Unknown)),
                  example: Schema.optional(Schema.Unknown),
                  exclusiveMaximum: Schema.optional(Schema.Boolean),
                  exclusiveMinimum: Schema.optional(Schema.Boolean),
                  externalDocs: Schema.optional(
                    Schema.Struct({
                      description: Schema.optional(Schema.String),
                      url: Schema.optional(Schema.String),
                    }),
                  ),
                  format: Schema.optional(Schema.String),
                  id: Schema.optional(Schema.String),
                  items: Schema.optional(Schema.Unknown),
                  maxItems: Schema.optional(Schema.Number),
                  maxLength: Schema.optional(Schema.Number),
                  maxProperties: Schema.optional(Schema.Number),
                  maximum: Schema.optional(Schema.Number),
                  minItems: Schema.optional(Schema.Number),
                  minLength: Schema.optional(Schema.Number),
                  minProperties: Schema.optional(Schema.Number),
                  minimum: Schema.optional(Schema.Number),
                  multipleOf: Schema.optional(Schema.Number),
                  not: Schema.optional(Schema.Unknown),
                  nullable: Schema.optional(Schema.Boolean),
                  oneOf: Schema.optional(Schema.Array(Schema.Unknown)),
                  pattern: Schema.optional(Schema.String),
                  patternProperties: Schema.optional(
                    Schema.Record(Schema.String, Schema.Unknown),
                  ),
                  properties: Schema.optional(
                    Schema.Record(Schema.String, Schema.Unknown),
                  ),
                  required: Schema.optional(Schema.Array(Schema.String)),
                  title: Schema.optional(Schema.String),
                  type: Schema.optional(Schema.String),
                  uniqueItems: Schema.optional(Schema.Boolean),
                  "x-kubernetes-embedded-resource": Schema.optional(
                    Schema.Boolean,
                  ),
                  "x-kubernetes-int-or-string": Schema.optional(Schema.Boolean),
                  "x-kubernetes-list-map-keys": Schema.optional(
                    Schema.Array(Schema.String),
                  ),
                  "x-kubernetes-list-type": Schema.optional(Schema.String),
                  "x-kubernetes-map-type": Schema.optional(Schema.String),
                  "x-kubernetes-preserve-unknown-fields": Schema.optional(
                    Schema.Boolean,
                  ),
                  "x-kubernetes-validations": Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        fieldPath: Schema.optional(Schema.String),
                        message: Schema.optional(Schema.String),
                        messageExpression: Schema.optional(Schema.String),
                        optionalOldSelf: Schema.optional(Schema.Boolean),
                        reason: Schema.optional(Schema.String),
                        rule: Schema.String,
                      }),
                    ),
                  ),
                }),
              ),
            }),
          ),
          selectableFields: Schema.optional(
            Schema.Array(
              Schema.Struct({
                jsonPath: Schema.String,
              }),
            ),
          ),
          served: Schema.Boolean,
          storage: Schema.Boolean,
          subresources: Schema.optional(
            Schema.Struct({
              scale: Schema.optional(
                Schema.Struct({
                  labelSelectorPath: Schema.optional(Schema.String),
                  specReplicasPath: Schema.String,
                  statusReplicasPath: Schema.String,
                }),
              ),
              status: Schema.optional(Schema.Unknown),
            }),
          ),
        }),
      ),
    }),
    status: Schema.optional(
      Schema.Struct({
        acceptedNames: Schema.optional(
          Schema.Struct({
            categories: Schema.optional(Schema.Array(Schema.String)),
            kind: Schema.String,
            listKind: Schema.optional(Schema.String),
            plural: Schema.String,
            shortNames: Schema.optional(Schema.Array(Schema.String)),
            singular: Schema.optional(Schema.String),
          }),
        ),
        conditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastTransitionTime: Schema.optional(Schema.String),
              message: Schema.optional(Schema.String),
              observedGeneration: Schema.optional(Schema.Number),
              reason: Schema.optional(Schema.String),
              status: Schema.String,
              type: Schema.String,
            }),
          ),
        ),
        observedGeneration: Schema.optional(Schema.Number),
        storedVersions: Schema.optional(Schema.Array(Schema.String)),
      }),
    ),
  });
export type ReplaceApiextensionsV1CustomResourceDefinitionStatusOutput =
  typeof ReplaceApiextensionsV1CustomResourceDefinitionStatusOutput.Type;

// The operation
/**
 * replace status of the specified CustomResourceDefinition
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceApiextensionsV1CustomResourceDefinitionStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReplaceApiextensionsV1CustomResourceDefinitionStatusInput,
    outputSchema: ReplaceApiextensionsV1CustomResourceDefinitionStatusOutput,
  }));
// Input Schema
export const WatchApiextensionsV1CustomResourceDefinitionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/apiextensions.k8s.io/v1/watch/customresourcedefinitions/{name}",
    }),
  );
export type WatchApiextensionsV1CustomResourceDefinitionInput =
  typeof WatchApiextensionsV1CustomResourceDefinitionInput.Type;

// Output Schema
export const WatchApiextensionsV1CustomResourceDefinitionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchApiextensionsV1CustomResourceDefinitionOutput =
  typeof WatchApiextensionsV1CustomResourceDefinitionOutput.Type;

// The operation
/**
 * watch changes to an object of kind CustomResourceDefinition. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
 */
export const watchApiextensionsV1CustomResourceDefinition =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchApiextensionsV1CustomResourceDefinitionInput,
    outputSchema: WatchApiextensionsV1CustomResourceDefinitionOutput,
  }));
// Input Schema
export const WatchApiextensionsV1CustomResourceDefinitionListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/apiextensions.k8s.io/v1/watch/customresourcedefinitions",
    }),
  );
export type WatchApiextensionsV1CustomResourceDefinitionListInput =
  typeof WatchApiextensionsV1CustomResourceDefinitionListInput.Type;

// Output Schema
export const WatchApiextensionsV1CustomResourceDefinitionListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchApiextensionsV1CustomResourceDefinitionListOutput =
  typeof WatchApiextensionsV1CustomResourceDefinitionListOutput.Type;

// The operation
/**
 * watch individual changes to a list of CustomResourceDefinition. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchApiextensionsV1CustomResourceDefinitionList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchApiextensionsV1CustomResourceDefinitionListInput,
    outputSchema: WatchApiextensionsV1CustomResourceDefinitionListOutput,
  }));
