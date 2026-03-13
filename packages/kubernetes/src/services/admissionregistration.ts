/**
 * Kubernetes Admission Registration API
 *
 * Generated from the Kubernetes OpenAPI spec.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";

// Input Schema
export const CreateAdmissionregistrationV1MutatingAdmissionPolicyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/apis/admissionregistration.k8s.io/v1/mutatingadmissionpolicies",
    }),
  );
export type CreateAdmissionregistrationV1MutatingAdmissionPolicyInput =
  typeof CreateAdmissionregistrationV1MutatingAdmissionPolicyInput.Type;

// Output Schema
export const CreateAdmissionregistrationV1MutatingAdmissionPolicyOutput =
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
        failurePolicy: Schema.optional(Schema.String),
        matchConditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              expression: Schema.String,
              name: Schema.String,
            }),
          ),
        ),
        matchConstraints: Schema.optional(
          Schema.Struct({
            excludeResourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
            matchPolicy: Schema.optional(Schema.String),
            namespaceSelector: Schema.optional(
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
            objectSelector: Schema.optional(
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
            resourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
        ),
        mutations: Schema.optional(
          Schema.Array(
            Schema.Struct({
              applyConfiguration: Schema.optional(
                Schema.Struct({
                  expression: Schema.optional(Schema.String),
                }),
              ),
              jsonPatch: Schema.optional(
                Schema.Struct({
                  expression: Schema.optional(Schema.String),
                }),
              ),
              patchType: Schema.String,
            }),
          ),
        ),
        paramKind: Schema.optional(
          Schema.Struct({
            apiVersion: Schema.optional(Schema.String),
            kind: Schema.optional(Schema.String),
          }),
        ),
        reinvocationPolicy: Schema.optional(Schema.String),
        variables: Schema.optional(
          Schema.Array(
            Schema.Struct({
              expression: Schema.String,
              name: Schema.String,
            }),
          ),
        ),
      }),
    ),
  });
export type CreateAdmissionregistrationV1MutatingAdmissionPolicyOutput =
  typeof CreateAdmissionregistrationV1MutatingAdmissionPolicyOutput.Type;

// The operation
/**
 * create a MutatingAdmissionPolicy
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const createAdmissionregistrationV1MutatingAdmissionPolicy =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateAdmissionregistrationV1MutatingAdmissionPolicyInput,
    outputSchema: CreateAdmissionregistrationV1MutatingAdmissionPolicyOutput,
  }));
// Input Schema
export const CreateAdmissionregistrationV1MutatingAdmissionPolicyBindingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/apis/admissionregistration.k8s.io/v1/mutatingadmissionpolicybindings",
    }),
  );
export type CreateAdmissionregistrationV1MutatingAdmissionPolicyBindingInput =
  typeof CreateAdmissionregistrationV1MutatingAdmissionPolicyBindingInput.Type;

// Output Schema
export const CreateAdmissionregistrationV1MutatingAdmissionPolicyBindingOutput =
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
        matchResources: Schema.optional(
          Schema.Struct({
            excludeResourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
            matchPolicy: Schema.optional(Schema.String),
            namespaceSelector: Schema.optional(
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
            objectSelector: Schema.optional(
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
            resourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
        ),
        paramRef: Schema.optional(
          Schema.Struct({
            name: Schema.optional(Schema.String),
            namespace: Schema.optional(Schema.String),
            parameterNotFoundAction: Schema.optional(Schema.String),
            selector: Schema.optional(
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
          }),
        ),
        policyName: Schema.optional(Schema.String),
      }),
    ),
  });
export type CreateAdmissionregistrationV1MutatingAdmissionPolicyBindingOutput =
  typeof CreateAdmissionregistrationV1MutatingAdmissionPolicyBindingOutput.Type;

// The operation
/**
 * create a MutatingAdmissionPolicyBinding
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const createAdmissionregistrationV1MutatingAdmissionPolicyBinding =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      CreateAdmissionregistrationV1MutatingAdmissionPolicyBindingInput,
    outputSchema:
      CreateAdmissionregistrationV1MutatingAdmissionPolicyBindingOutput,
  }));
// Input Schema
export const CreateAdmissionregistrationV1MutatingWebhookConfigurationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/apis/admissionregistration.k8s.io/v1/mutatingwebhookconfigurations",
    }),
  );
export type CreateAdmissionregistrationV1MutatingWebhookConfigurationInput =
  typeof CreateAdmissionregistrationV1MutatingWebhookConfigurationInput.Type;

// Output Schema
export const CreateAdmissionregistrationV1MutatingWebhookConfigurationOutput =
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
    webhooks: Schema.optional(
      Schema.Array(
        Schema.Struct({
          admissionReviewVersions: Schema.Array(Schema.String),
          clientConfig: Schema.Struct({
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
          failurePolicy: Schema.optional(Schema.String),
          matchConditions: Schema.optional(
            Schema.Array(
              Schema.Struct({
                expression: Schema.String,
                name: Schema.String,
              }),
            ),
          ),
          matchPolicy: Schema.optional(Schema.String),
          name: Schema.String,
          namespaceSelector: Schema.optional(
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
          objectSelector: Schema.optional(
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
          reinvocationPolicy: Schema.optional(Schema.String),
          rules: Schema.optional(
            Schema.Array(
              Schema.Struct({
                apiGroups: Schema.optional(Schema.Array(Schema.String)),
                apiVersions: Schema.optional(Schema.Array(Schema.String)),
                operations: Schema.optional(Schema.Array(Schema.String)),
                resources: Schema.optional(Schema.Array(Schema.String)),
                scope: Schema.optional(Schema.String),
              }),
            ),
          ),
          sideEffects: Schema.String,
          timeoutSeconds: Schema.optional(Schema.Number),
        }),
      ),
    ),
  });
export type CreateAdmissionregistrationV1MutatingWebhookConfigurationOutput =
  typeof CreateAdmissionregistrationV1MutatingWebhookConfigurationOutput.Type;

// The operation
/**
 * create a MutatingWebhookConfiguration
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const createAdmissionregistrationV1MutatingWebhookConfiguration =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateAdmissionregistrationV1MutatingWebhookConfigurationInput,
    outputSchema:
      CreateAdmissionregistrationV1MutatingWebhookConfigurationOutput,
  }));
// Input Schema
export const CreateAdmissionregistrationV1ValidatingAdmissionPolicyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/apis/admissionregistration.k8s.io/v1/validatingadmissionpolicies",
    }),
  );
export type CreateAdmissionregistrationV1ValidatingAdmissionPolicyInput =
  typeof CreateAdmissionregistrationV1ValidatingAdmissionPolicyInput.Type;

// Output Schema
export const CreateAdmissionregistrationV1ValidatingAdmissionPolicyOutput =
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
        auditAnnotations: Schema.optional(
          Schema.Array(
            Schema.Struct({
              key: Schema.String,
              valueExpression: Schema.String,
            }),
          ),
        ),
        failurePolicy: Schema.optional(Schema.String),
        matchConditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              expression: Schema.String,
              name: Schema.String,
            }),
          ),
        ),
        matchConstraints: Schema.optional(
          Schema.Struct({
            excludeResourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
            matchPolicy: Schema.optional(Schema.String),
            namespaceSelector: Schema.optional(
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
            objectSelector: Schema.optional(
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
            resourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
        ),
        paramKind: Schema.optional(
          Schema.Struct({
            apiVersion: Schema.optional(Schema.String),
            kind: Schema.optional(Schema.String),
          }),
        ),
        validations: Schema.optional(
          Schema.Array(
            Schema.Struct({
              expression: Schema.String,
              message: Schema.optional(Schema.String),
              messageExpression: Schema.optional(Schema.String),
              reason: Schema.optional(Schema.String),
            }),
          ),
        ),
        variables: Schema.optional(
          Schema.Array(
            Schema.Struct({
              expression: Schema.String,
              name: Schema.String,
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
              lastTransitionTime: Schema.String,
              message: Schema.String,
              observedGeneration: Schema.optional(Schema.Number),
              reason: Schema.String,
              status: Schema.String,
              type: Schema.String,
            }),
          ),
        ),
        observedGeneration: Schema.optional(Schema.Number),
        typeChecking: Schema.optional(
          Schema.Struct({
            expressionWarnings: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  fieldRef: Schema.String,
                  warning: Schema.String,
                }),
              ),
            ),
          }),
        ),
      }),
    ),
  });
export type CreateAdmissionregistrationV1ValidatingAdmissionPolicyOutput =
  typeof CreateAdmissionregistrationV1ValidatingAdmissionPolicyOutput.Type;

// The operation
/**
 * create a ValidatingAdmissionPolicy
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const createAdmissionregistrationV1ValidatingAdmissionPolicy =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateAdmissionregistrationV1ValidatingAdmissionPolicyInput,
    outputSchema: CreateAdmissionregistrationV1ValidatingAdmissionPolicyOutput,
  }));
// Input Schema
export const CreateAdmissionregistrationV1ValidatingAdmissionPolicyBindingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/apis/admissionregistration.k8s.io/v1/validatingadmissionpolicybindings",
    }),
  );
export type CreateAdmissionregistrationV1ValidatingAdmissionPolicyBindingInput =
  typeof CreateAdmissionregistrationV1ValidatingAdmissionPolicyBindingInput.Type;

// Output Schema
export const CreateAdmissionregistrationV1ValidatingAdmissionPolicyBindingOutput =
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
      matchResources: Schema.optional(
        Schema.Struct({
          excludeResourceRules: Schema.optional(
            Schema.Array(
              Schema.Struct({
                apiGroups: Schema.optional(Schema.Array(Schema.String)),
                apiVersions: Schema.optional(Schema.Array(Schema.String)),
                operations: Schema.optional(Schema.Array(Schema.String)),
                resourceNames: Schema.optional(Schema.Array(Schema.String)),
                resources: Schema.optional(Schema.Array(Schema.String)),
                scope: Schema.optional(Schema.String),
              }),
            ),
          ),
          matchPolicy: Schema.optional(Schema.String),
          namespaceSelector: Schema.optional(
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
          objectSelector: Schema.optional(
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
          resourceRules: Schema.optional(
            Schema.Array(
              Schema.Struct({
                apiGroups: Schema.optional(Schema.Array(Schema.String)),
                apiVersions: Schema.optional(Schema.Array(Schema.String)),
                operations: Schema.optional(Schema.Array(Schema.String)),
                resourceNames: Schema.optional(Schema.Array(Schema.String)),
                resources: Schema.optional(Schema.Array(Schema.String)),
                scope: Schema.optional(Schema.String),
              }),
            ),
          ),
        }),
      ),
      paramRef: Schema.optional(
        Schema.Struct({
          name: Schema.optional(Schema.String),
          namespace: Schema.optional(Schema.String),
          parameterNotFoundAction: Schema.optional(Schema.String),
          selector: Schema.optional(
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
        }),
      ),
      policyName: Schema.String,
      validationActions: Schema.Array(Schema.String),
    }),
  });
export type CreateAdmissionregistrationV1ValidatingAdmissionPolicyBindingOutput =
  typeof CreateAdmissionregistrationV1ValidatingAdmissionPolicyBindingOutput.Type;

// The operation
/**
 * create a ValidatingAdmissionPolicyBinding
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const createAdmissionregistrationV1ValidatingAdmissionPolicyBinding =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      CreateAdmissionregistrationV1ValidatingAdmissionPolicyBindingInput,
    outputSchema:
      CreateAdmissionregistrationV1ValidatingAdmissionPolicyBindingOutput,
  }));
// Input Schema
export const CreateAdmissionregistrationV1ValidatingWebhookConfigurationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/apis/admissionregistration.k8s.io/v1/validatingwebhookconfigurations",
    }),
  );
export type CreateAdmissionregistrationV1ValidatingWebhookConfigurationInput =
  typeof CreateAdmissionregistrationV1ValidatingWebhookConfigurationInput.Type;

// Output Schema
export const CreateAdmissionregistrationV1ValidatingWebhookConfigurationOutput =
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
    webhooks: Schema.optional(
      Schema.Array(
        Schema.Struct({
          admissionReviewVersions: Schema.Array(Schema.String),
          clientConfig: Schema.Struct({
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
          failurePolicy: Schema.optional(Schema.String),
          matchConditions: Schema.optional(
            Schema.Array(
              Schema.Struct({
                expression: Schema.String,
                name: Schema.String,
              }),
            ),
          ),
          matchPolicy: Schema.optional(Schema.String),
          name: Schema.String,
          namespaceSelector: Schema.optional(
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
          objectSelector: Schema.optional(
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
          rules: Schema.optional(
            Schema.Array(
              Schema.Struct({
                apiGroups: Schema.optional(Schema.Array(Schema.String)),
                apiVersions: Schema.optional(Schema.Array(Schema.String)),
                operations: Schema.optional(Schema.Array(Schema.String)),
                resources: Schema.optional(Schema.Array(Schema.String)),
                scope: Schema.optional(Schema.String),
              }),
            ),
          ),
          sideEffects: Schema.String,
          timeoutSeconds: Schema.optional(Schema.Number),
        }),
      ),
    ),
  });
export type CreateAdmissionregistrationV1ValidatingWebhookConfigurationOutput =
  typeof CreateAdmissionregistrationV1ValidatingWebhookConfigurationOutput.Type;

// The operation
/**
 * create a ValidatingWebhookConfiguration
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const createAdmissionregistrationV1ValidatingWebhookConfiguration =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      CreateAdmissionregistrationV1ValidatingWebhookConfigurationInput,
    outputSchema:
      CreateAdmissionregistrationV1ValidatingWebhookConfigurationOutput,
  }));
// Input Schema
export const CreateAdmissionregistrationV1alpha1MutatingAdmissionPolicyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/apis/admissionregistration.k8s.io/v1alpha1/mutatingadmissionpolicies",
    }),
  );
export type CreateAdmissionregistrationV1alpha1MutatingAdmissionPolicyInput =
  typeof CreateAdmissionregistrationV1alpha1MutatingAdmissionPolicyInput.Type;

// Output Schema
export const CreateAdmissionregistrationV1alpha1MutatingAdmissionPolicyOutput =
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
        failurePolicy: Schema.optional(Schema.String),
        matchConditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              expression: Schema.String,
              name: Schema.String,
            }),
          ),
        ),
        matchConstraints: Schema.optional(
          Schema.Struct({
            excludeResourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
            matchPolicy: Schema.optional(Schema.String),
            namespaceSelector: Schema.optional(
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
            objectSelector: Schema.optional(
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
            resourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
        ),
        mutations: Schema.optional(
          Schema.Array(
            Schema.Struct({
              applyConfiguration: Schema.optional(
                Schema.Struct({
                  expression: Schema.optional(Schema.String),
                }),
              ),
              jsonPatch: Schema.optional(
                Schema.Struct({
                  expression: Schema.optional(Schema.String),
                }),
              ),
              patchType: Schema.String,
            }),
          ),
        ),
        paramKind: Schema.optional(
          Schema.Struct({
            apiVersion: Schema.optional(Schema.String),
            kind: Schema.optional(Schema.String),
          }),
        ),
        reinvocationPolicy: Schema.optional(Schema.String),
        variables: Schema.optional(
          Schema.Array(
            Schema.Struct({
              expression: Schema.String,
              name: Schema.String,
            }),
          ),
        ),
      }),
    ),
  });
export type CreateAdmissionregistrationV1alpha1MutatingAdmissionPolicyOutput =
  typeof CreateAdmissionregistrationV1alpha1MutatingAdmissionPolicyOutput.Type;

// The operation
/**
 * create a MutatingAdmissionPolicy
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const createAdmissionregistrationV1alpha1MutatingAdmissionPolicy =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      CreateAdmissionregistrationV1alpha1MutatingAdmissionPolicyInput,
    outputSchema:
      CreateAdmissionregistrationV1alpha1MutatingAdmissionPolicyOutput,
  }));
// Input Schema
export const CreateAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/apis/admissionregistration.k8s.io/v1alpha1/mutatingadmissionpolicybindings",
    }),
  );
export type CreateAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingInput =
  typeof CreateAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingInput.Type;

// Output Schema
export const CreateAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingOutput =
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
        matchResources: Schema.optional(
          Schema.Struct({
            excludeResourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
            matchPolicy: Schema.optional(Schema.String),
            namespaceSelector: Schema.optional(
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
            objectSelector: Schema.optional(
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
            resourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
        ),
        paramRef: Schema.optional(
          Schema.Struct({
            name: Schema.optional(Schema.String),
            namespace: Schema.optional(Schema.String),
            parameterNotFoundAction: Schema.optional(Schema.String),
            selector: Schema.optional(
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
          }),
        ),
        policyName: Schema.optional(Schema.String),
      }),
    ),
  });
export type CreateAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingOutput =
  typeof CreateAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingOutput.Type;

// The operation
/**
 * create a MutatingAdmissionPolicyBinding
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const createAdmissionregistrationV1alpha1MutatingAdmissionPolicyBinding =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      CreateAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingInput,
    outputSchema:
      CreateAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingOutput,
  }));
// Input Schema
export const CreateAdmissionregistrationV1beta1MutatingAdmissionPolicyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/apis/admissionregistration.k8s.io/v1beta1/mutatingadmissionpolicies",
    }),
  );
export type CreateAdmissionregistrationV1beta1MutatingAdmissionPolicyInput =
  typeof CreateAdmissionregistrationV1beta1MutatingAdmissionPolicyInput.Type;

// Output Schema
export const CreateAdmissionregistrationV1beta1MutatingAdmissionPolicyOutput =
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
        failurePolicy: Schema.optional(Schema.String),
        matchConditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              expression: Schema.String,
              name: Schema.String,
            }),
          ),
        ),
        matchConstraints: Schema.optional(
          Schema.Struct({
            excludeResourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
            matchPolicy: Schema.optional(Schema.String),
            namespaceSelector: Schema.optional(
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
            objectSelector: Schema.optional(
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
            resourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
        ),
        mutations: Schema.optional(
          Schema.Array(
            Schema.Struct({
              applyConfiguration: Schema.optional(
                Schema.Struct({
                  expression: Schema.optional(Schema.String),
                }),
              ),
              jsonPatch: Schema.optional(
                Schema.Struct({
                  expression: Schema.optional(Schema.String),
                }),
              ),
              patchType: Schema.String,
            }),
          ),
        ),
        paramKind: Schema.optional(
          Schema.Struct({
            apiVersion: Schema.optional(Schema.String),
            kind: Schema.optional(Schema.String),
          }),
        ),
        reinvocationPolicy: Schema.optional(Schema.String),
        variables: Schema.optional(
          Schema.Array(
            Schema.Struct({
              expression: Schema.String,
              name: Schema.String,
            }),
          ),
        ),
      }),
    ),
  });
export type CreateAdmissionregistrationV1beta1MutatingAdmissionPolicyOutput =
  typeof CreateAdmissionregistrationV1beta1MutatingAdmissionPolicyOutput.Type;

// The operation
/**
 * create a MutatingAdmissionPolicy
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const createAdmissionregistrationV1beta1MutatingAdmissionPolicy =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateAdmissionregistrationV1beta1MutatingAdmissionPolicyInput,
    outputSchema:
      CreateAdmissionregistrationV1beta1MutatingAdmissionPolicyOutput,
  }));
// Input Schema
export const CreateAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/apis/admissionregistration.k8s.io/v1beta1/mutatingadmissionpolicybindings",
    }),
  );
export type CreateAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingInput =
  typeof CreateAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingInput.Type;

// Output Schema
export const CreateAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingOutput =
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
        matchResources: Schema.optional(
          Schema.Struct({
            excludeResourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
            matchPolicy: Schema.optional(Schema.String),
            namespaceSelector: Schema.optional(
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
            objectSelector: Schema.optional(
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
            resourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
        ),
        paramRef: Schema.optional(
          Schema.Struct({
            name: Schema.optional(Schema.String),
            namespace: Schema.optional(Schema.String),
            parameterNotFoundAction: Schema.optional(Schema.String),
            selector: Schema.optional(
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
          }),
        ),
        policyName: Schema.optional(Schema.String),
      }),
    ),
  });
export type CreateAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingOutput =
  typeof CreateAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingOutput.Type;

// The operation
/**
 * create a MutatingAdmissionPolicyBinding
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const createAdmissionregistrationV1beta1MutatingAdmissionPolicyBinding =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      CreateAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingInput,
    outputSchema:
      CreateAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingOutput,
  }));
// Input Schema
export const DeleteAdmissionregistrationV1CollectionMutatingAdmissionPolicyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/admissionregistration.k8s.io/v1/mutatingadmissionpolicies",
    }),
  );
export type DeleteAdmissionregistrationV1CollectionMutatingAdmissionPolicyInput =
  typeof DeleteAdmissionregistrationV1CollectionMutatingAdmissionPolicyInput.Type;

// Output Schema
export const DeleteAdmissionregistrationV1CollectionMutatingAdmissionPolicyOutput =
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
export type DeleteAdmissionregistrationV1CollectionMutatingAdmissionPolicyOutput =
  typeof DeleteAdmissionregistrationV1CollectionMutatingAdmissionPolicyOutput.Type;

// The operation
/**
 * delete collection of MutatingAdmissionPolicy
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteAdmissionregistrationV1CollectionMutatingAdmissionPolicy =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      DeleteAdmissionregistrationV1CollectionMutatingAdmissionPolicyInput,
    outputSchema:
      DeleteAdmissionregistrationV1CollectionMutatingAdmissionPolicyOutput,
  }));
// Input Schema
export const DeleteAdmissionregistrationV1CollectionMutatingAdmissionPolicyBindingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/admissionregistration.k8s.io/v1/mutatingadmissionpolicybindings",
    }),
  );
export type DeleteAdmissionregistrationV1CollectionMutatingAdmissionPolicyBindingInput =
  typeof DeleteAdmissionregistrationV1CollectionMutatingAdmissionPolicyBindingInput.Type;

// Output Schema
export const DeleteAdmissionregistrationV1CollectionMutatingAdmissionPolicyBindingOutput =
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
export type DeleteAdmissionregistrationV1CollectionMutatingAdmissionPolicyBindingOutput =
  typeof DeleteAdmissionregistrationV1CollectionMutatingAdmissionPolicyBindingOutput.Type;

// The operation
/**
 * delete collection of MutatingAdmissionPolicyBinding
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteAdmissionregistrationV1CollectionMutatingAdmissionPolicyBinding =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      DeleteAdmissionregistrationV1CollectionMutatingAdmissionPolicyBindingInput,
    outputSchema:
      DeleteAdmissionregistrationV1CollectionMutatingAdmissionPolicyBindingOutput,
  }));
// Input Schema
export const DeleteAdmissionregistrationV1CollectionMutatingWebhookConfigurationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/admissionregistration.k8s.io/v1/mutatingwebhookconfigurations",
    }),
  );
export type DeleteAdmissionregistrationV1CollectionMutatingWebhookConfigurationInput =
  typeof DeleteAdmissionregistrationV1CollectionMutatingWebhookConfigurationInput.Type;

// Output Schema
export const DeleteAdmissionregistrationV1CollectionMutatingWebhookConfigurationOutput =
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
export type DeleteAdmissionregistrationV1CollectionMutatingWebhookConfigurationOutput =
  typeof DeleteAdmissionregistrationV1CollectionMutatingWebhookConfigurationOutput.Type;

// The operation
/**
 * delete collection of MutatingWebhookConfiguration
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteAdmissionregistrationV1CollectionMutatingWebhookConfiguration =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      DeleteAdmissionregistrationV1CollectionMutatingWebhookConfigurationInput,
    outputSchema:
      DeleteAdmissionregistrationV1CollectionMutatingWebhookConfigurationOutput,
  }));
// Input Schema
export const DeleteAdmissionregistrationV1CollectionValidatingAdmissionPolicyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/admissionregistration.k8s.io/v1/validatingadmissionpolicies",
    }),
  );
export type DeleteAdmissionregistrationV1CollectionValidatingAdmissionPolicyInput =
  typeof DeleteAdmissionregistrationV1CollectionValidatingAdmissionPolicyInput.Type;

// Output Schema
export const DeleteAdmissionregistrationV1CollectionValidatingAdmissionPolicyOutput =
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
export type DeleteAdmissionregistrationV1CollectionValidatingAdmissionPolicyOutput =
  typeof DeleteAdmissionregistrationV1CollectionValidatingAdmissionPolicyOutput.Type;

// The operation
/**
 * delete collection of ValidatingAdmissionPolicy
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteAdmissionregistrationV1CollectionValidatingAdmissionPolicy =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      DeleteAdmissionregistrationV1CollectionValidatingAdmissionPolicyInput,
    outputSchema:
      DeleteAdmissionregistrationV1CollectionValidatingAdmissionPolicyOutput,
  }));
// Input Schema
export const DeleteAdmissionregistrationV1CollectionValidatingAdmissionPolicyBindingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/admissionregistration.k8s.io/v1/validatingadmissionpolicybindings",
    }),
  );
export type DeleteAdmissionregistrationV1CollectionValidatingAdmissionPolicyBindingInput =
  typeof DeleteAdmissionregistrationV1CollectionValidatingAdmissionPolicyBindingInput.Type;

// Output Schema
export const DeleteAdmissionregistrationV1CollectionValidatingAdmissionPolicyBindingOutput =
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
export type DeleteAdmissionregistrationV1CollectionValidatingAdmissionPolicyBindingOutput =
  typeof DeleteAdmissionregistrationV1CollectionValidatingAdmissionPolicyBindingOutput.Type;

// The operation
/**
 * delete collection of ValidatingAdmissionPolicyBinding
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteAdmissionregistrationV1CollectionValidatingAdmissionPolicyBinding =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      DeleteAdmissionregistrationV1CollectionValidatingAdmissionPolicyBindingInput,
    outputSchema:
      DeleteAdmissionregistrationV1CollectionValidatingAdmissionPolicyBindingOutput,
  }));
// Input Schema
export const DeleteAdmissionregistrationV1CollectionValidatingWebhookConfigurationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/admissionregistration.k8s.io/v1/validatingwebhookconfigurations",
    }),
  );
export type DeleteAdmissionregistrationV1CollectionValidatingWebhookConfigurationInput =
  typeof DeleteAdmissionregistrationV1CollectionValidatingWebhookConfigurationInput.Type;

// Output Schema
export const DeleteAdmissionregistrationV1CollectionValidatingWebhookConfigurationOutput =
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
export type DeleteAdmissionregistrationV1CollectionValidatingWebhookConfigurationOutput =
  typeof DeleteAdmissionregistrationV1CollectionValidatingWebhookConfigurationOutput.Type;

// The operation
/**
 * delete collection of ValidatingWebhookConfiguration
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteAdmissionregistrationV1CollectionValidatingWebhookConfiguration =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      DeleteAdmissionregistrationV1CollectionValidatingWebhookConfigurationInput,
    outputSchema:
      DeleteAdmissionregistrationV1CollectionValidatingWebhookConfigurationOutput,
  }));
// Input Schema
export const DeleteAdmissionregistrationV1MutatingAdmissionPolicyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/admissionregistration.k8s.io/v1/mutatingadmissionpolicies/{name}",
    }),
  );
export type DeleteAdmissionregistrationV1MutatingAdmissionPolicyInput =
  typeof DeleteAdmissionregistrationV1MutatingAdmissionPolicyInput.Type;

// Output Schema
export const DeleteAdmissionregistrationV1MutatingAdmissionPolicyOutput =
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
export type DeleteAdmissionregistrationV1MutatingAdmissionPolicyOutput =
  typeof DeleteAdmissionregistrationV1MutatingAdmissionPolicyOutput.Type;

// The operation
/**
 * delete a MutatingAdmissionPolicy
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteAdmissionregistrationV1MutatingAdmissionPolicy =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteAdmissionregistrationV1MutatingAdmissionPolicyInput,
    outputSchema: DeleteAdmissionregistrationV1MutatingAdmissionPolicyOutput,
  }));
// Input Schema
export const DeleteAdmissionregistrationV1MutatingAdmissionPolicyBindingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/admissionregistration.k8s.io/v1/mutatingadmissionpolicybindings/{name}",
    }),
  );
export type DeleteAdmissionregistrationV1MutatingAdmissionPolicyBindingInput =
  typeof DeleteAdmissionregistrationV1MutatingAdmissionPolicyBindingInput.Type;

// Output Schema
export const DeleteAdmissionregistrationV1MutatingAdmissionPolicyBindingOutput =
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
export type DeleteAdmissionregistrationV1MutatingAdmissionPolicyBindingOutput =
  typeof DeleteAdmissionregistrationV1MutatingAdmissionPolicyBindingOutput.Type;

// The operation
/**
 * delete a MutatingAdmissionPolicyBinding
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteAdmissionregistrationV1MutatingAdmissionPolicyBinding =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      DeleteAdmissionregistrationV1MutatingAdmissionPolicyBindingInput,
    outputSchema:
      DeleteAdmissionregistrationV1MutatingAdmissionPolicyBindingOutput,
  }));
// Input Schema
export const DeleteAdmissionregistrationV1MutatingWebhookConfigurationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/admissionregistration.k8s.io/v1/mutatingwebhookconfigurations/{name}",
    }),
  );
export type DeleteAdmissionregistrationV1MutatingWebhookConfigurationInput =
  typeof DeleteAdmissionregistrationV1MutatingWebhookConfigurationInput.Type;

// Output Schema
export const DeleteAdmissionregistrationV1MutatingWebhookConfigurationOutput =
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
export type DeleteAdmissionregistrationV1MutatingWebhookConfigurationOutput =
  typeof DeleteAdmissionregistrationV1MutatingWebhookConfigurationOutput.Type;

// The operation
/**
 * delete a MutatingWebhookConfiguration
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteAdmissionregistrationV1MutatingWebhookConfiguration =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteAdmissionregistrationV1MutatingWebhookConfigurationInput,
    outputSchema:
      DeleteAdmissionregistrationV1MutatingWebhookConfigurationOutput,
  }));
// Input Schema
export const DeleteAdmissionregistrationV1ValidatingAdmissionPolicyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/admissionregistration.k8s.io/v1/validatingadmissionpolicies/{name}",
    }),
  );
export type DeleteAdmissionregistrationV1ValidatingAdmissionPolicyInput =
  typeof DeleteAdmissionregistrationV1ValidatingAdmissionPolicyInput.Type;

// Output Schema
export const DeleteAdmissionregistrationV1ValidatingAdmissionPolicyOutput =
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
export type DeleteAdmissionregistrationV1ValidatingAdmissionPolicyOutput =
  typeof DeleteAdmissionregistrationV1ValidatingAdmissionPolicyOutput.Type;

// The operation
/**
 * delete a ValidatingAdmissionPolicy
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteAdmissionregistrationV1ValidatingAdmissionPolicy =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteAdmissionregistrationV1ValidatingAdmissionPolicyInput,
    outputSchema: DeleteAdmissionregistrationV1ValidatingAdmissionPolicyOutput,
  }));
// Input Schema
export const DeleteAdmissionregistrationV1ValidatingAdmissionPolicyBindingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/admissionregistration.k8s.io/v1/validatingadmissionpolicybindings/{name}",
    }),
  );
export type DeleteAdmissionregistrationV1ValidatingAdmissionPolicyBindingInput =
  typeof DeleteAdmissionregistrationV1ValidatingAdmissionPolicyBindingInput.Type;

// Output Schema
export const DeleteAdmissionregistrationV1ValidatingAdmissionPolicyBindingOutput =
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
export type DeleteAdmissionregistrationV1ValidatingAdmissionPolicyBindingOutput =
  typeof DeleteAdmissionregistrationV1ValidatingAdmissionPolicyBindingOutput.Type;

// The operation
/**
 * delete a ValidatingAdmissionPolicyBinding
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteAdmissionregistrationV1ValidatingAdmissionPolicyBinding =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      DeleteAdmissionregistrationV1ValidatingAdmissionPolicyBindingInput,
    outputSchema:
      DeleteAdmissionregistrationV1ValidatingAdmissionPolicyBindingOutput,
  }));
// Input Schema
export const DeleteAdmissionregistrationV1ValidatingWebhookConfigurationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/admissionregistration.k8s.io/v1/validatingwebhookconfigurations/{name}",
    }),
  );
export type DeleteAdmissionregistrationV1ValidatingWebhookConfigurationInput =
  typeof DeleteAdmissionregistrationV1ValidatingWebhookConfigurationInput.Type;

// Output Schema
export const DeleteAdmissionregistrationV1ValidatingWebhookConfigurationOutput =
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
export type DeleteAdmissionregistrationV1ValidatingWebhookConfigurationOutput =
  typeof DeleteAdmissionregistrationV1ValidatingWebhookConfigurationOutput.Type;

// The operation
/**
 * delete a ValidatingWebhookConfiguration
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteAdmissionregistrationV1ValidatingWebhookConfiguration =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      DeleteAdmissionregistrationV1ValidatingWebhookConfigurationInput,
    outputSchema:
      DeleteAdmissionregistrationV1ValidatingWebhookConfigurationOutput,
  }));
// Input Schema
export const DeleteAdmissionregistrationV1alpha1CollectionMutatingAdmissionPolicyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/admissionregistration.k8s.io/v1alpha1/mutatingadmissionpolicies",
    }),
  );
export type DeleteAdmissionregistrationV1alpha1CollectionMutatingAdmissionPolicyInput =
  typeof DeleteAdmissionregistrationV1alpha1CollectionMutatingAdmissionPolicyInput.Type;

// Output Schema
export const DeleteAdmissionregistrationV1alpha1CollectionMutatingAdmissionPolicyOutput =
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
export type DeleteAdmissionregistrationV1alpha1CollectionMutatingAdmissionPolicyOutput =
  typeof DeleteAdmissionregistrationV1alpha1CollectionMutatingAdmissionPolicyOutput.Type;

// The operation
/**
 * delete collection of MutatingAdmissionPolicy
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteAdmissionregistrationV1alpha1CollectionMutatingAdmissionPolicy =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      DeleteAdmissionregistrationV1alpha1CollectionMutatingAdmissionPolicyInput,
    outputSchema:
      DeleteAdmissionregistrationV1alpha1CollectionMutatingAdmissionPolicyOutput,
  }));
// Input Schema
export const DeleteAdmissionregistrationV1alpha1CollectionMutatingAdmissionPolicyBindingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/admissionregistration.k8s.io/v1alpha1/mutatingadmissionpolicybindings",
    }),
  );
export type DeleteAdmissionregistrationV1alpha1CollectionMutatingAdmissionPolicyBindingInput =
  typeof DeleteAdmissionregistrationV1alpha1CollectionMutatingAdmissionPolicyBindingInput.Type;

// Output Schema
export const DeleteAdmissionregistrationV1alpha1CollectionMutatingAdmissionPolicyBindingOutput =
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
export type DeleteAdmissionregistrationV1alpha1CollectionMutatingAdmissionPolicyBindingOutput =
  typeof DeleteAdmissionregistrationV1alpha1CollectionMutatingAdmissionPolicyBindingOutput.Type;

// The operation
/**
 * delete collection of MutatingAdmissionPolicyBinding
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteAdmissionregistrationV1alpha1CollectionMutatingAdmissionPolicyBinding =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      DeleteAdmissionregistrationV1alpha1CollectionMutatingAdmissionPolicyBindingInput,
    outputSchema:
      DeleteAdmissionregistrationV1alpha1CollectionMutatingAdmissionPolicyBindingOutput,
  }));
// Input Schema
export const DeleteAdmissionregistrationV1alpha1MutatingAdmissionPolicyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/admissionregistration.k8s.io/v1alpha1/mutatingadmissionpolicies/{name}",
    }),
  );
export type DeleteAdmissionregistrationV1alpha1MutatingAdmissionPolicyInput =
  typeof DeleteAdmissionregistrationV1alpha1MutatingAdmissionPolicyInput.Type;

// Output Schema
export const DeleteAdmissionregistrationV1alpha1MutatingAdmissionPolicyOutput =
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
export type DeleteAdmissionregistrationV1alpha1MutatingAdmissionPolicyOutput =
  typeof DeleteAdmissionregistrationV1alpha1MutatingAdmissionPolicyOutput.Type;

// The operation
/**
 * delete a MutatingAdmissionPolicy
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteAdmissionregistrationV1alpha1MutatingAdmissionPolicy =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      DeleteAdmissionregistrationV1alpha1MutatingAdmissionPolicyInput,
    outputSchema:
      DeleteAdmissionregistrationV1alpha1MutatingAdmissionPolicyOutput,
  }));
// Input Schema
export const DeleteAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/admissionregistration.k8s.io/v1alpha1/mutatingadmissionpolicybindings/{name}",
    }),
  );
export type DeleteAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingInput =
  typeof DeleteAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingInput.Type;

// Output Schema
export const DeleteAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingOutput =
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
export type DeleteAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingOutput =
  typeof DeleteAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingOutput.Type;

// The operation
/**
 * delete a MutatingAdmissionPolicyBinding
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteAdmissionregistrationV1alpha1MutatingAdmissionPolicyBinding =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      DeleteAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingInput,
    outputSchema:
      DeleteAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingOutput,
  }));
// Input Schema
export const DeleteAdmissionregistrationV1beta1CollectionMutatingAdmissionPolicyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/admissionregistration.k8s.io/v1beta1/mutatingadmissionpolicies",
    }),
  );
export type DeleteAdmissionregistrationV1beta1CollectionMutatingAdmissionPolicyInput =
  typeof DeleteAdmissionregistrationV1beta1CollectionMutatingAdmissionPolicyInput.Type;

// Output Schema
export const DeleteAdmissionregistrationV1beta1CollectionMutatingAdmissionPolicyOutput =
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
export type DeleteAdmissionregistrationV1beta1CollectionMutatingAdmissionPolicyOutput =
  typeof DeleteAdmissionregistrationV1beta1CollectionMutatingAdmissionPolicyOutput.Type;

// The operation
/**
 * delete collection of MutatingAdmissionPolicy
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteAdmissionregistrationV1beta1CollectionMutatingAdmissionPolicy =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      DeleteAdmissionregistrationV1beta1CollectionMutatingAdmissionPolicyInput,
    outputSchema:
      DeleteAdmissionregistrationV1beta1CollectionMutatingAdmissionPolicyOutput,
  }));
// Input Schema
export const DeleteAdmissionregistrationV1beta1CollectionMutatingAdmissionPolicyBindingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/admissionregistration.k8s.io/v1beta1/mutatingadmissionpolicybindings",
    }),
  );
export type DeleteAdmissionregistrationV1beta1CollectionMutatingAdmissionPolicyBindingInput =
  typeof DeleteAdmissionregistrationV1beta1CollectionMutatingAdmissionPolicyBindingInput.Type;

// Output Schema
export const DeleteAdmissionregistrationV1beta1CollectionMutatingAdmissionPolicyBindingOutput =
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
export type DeleteAdmissionregistrationV1beta1CollectionMutatingAdmissionPolicyBindingOutput =
  typeof DeleteAdmissionregistrationV1beta1CollectionMutatingAdmissionPolicyBindingOutput.Type;

// The operation
/**
 * delete collection of MutatingAdmissionPolicyBinding
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteAdmissionregistrationV1beta1CollectionMutatingAdmissionPolicyBinding =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      DeleteAdmissionregistrationV1beta1CollectionMutatingAdmissionPolicyBindingInput,
    outputSchema:
      DeleteAdmissionregistrationV1beta1CollectionMutatingAdmissionPolicyBindingOutput,
  }));
// Input Schema
export const DeleteAdmissionregistrationV1beta1MutatingAdmissionPolicyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/admissionregistration.k8s.io/v1beta1/mutatingadmissionpolicies/{name}",
    }),
  );
export type DeleteAdmissionregistrationV1beta1MutatingAdmissionPolicyInput =
  typeof DeleteAdmissionregistrationV1beta1MutatingAdmissionPolicyInput.Type;

// Output Schema
export const DeleteAdmissionregistrationV1beta1MutatingAdmissionPolicyOutput =
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
export type DeleteAdmissionregistrationV1beta1MutatingAdmissionPolicyOutput =
  typeof DeleteAdmissionregistrationV1beta1MutatingAdmissionPolicyOutput.Type;

// The operation
/**
 * delete a MutatingAdmissionPolicy
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteAdmissionregistrationV1beta1MutatingAdmissionPolicy =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteAdmissionregistrationV1beta1MutatingAdmissionPolicyInput,
    outputSchema:
      DeleteAdmissionregistrationV1beta1MutatingAdmissionPolicyOutput,
  }));
// Input Schema
export const DeleteAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/admissionregistration.k8s.io/v1beta1/mutatingadmissionpolicybindings/{name}",
    }),
  );
export type DeleteAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingInput =
  typeof DeleteAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingInput.Type;

// Output Schema
export const DeleteAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingOutput =
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
export type DeleteAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingOutput =
  typeof DeleteAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingOutput.Type;

// The operation
/**
 * delete a MutatingAdmissionPolicyBinding
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteAdmissionregistrationV1beta1MutatingAdmissionPolicyBinding =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      DeleteAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingInput,
    outputSchema:
      DeleteAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingOutput,
  }));
// Input Schema
export const GetAdmissionregistrationAPIGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/apis/admissionregistration.k8s.io/" }),
  );
export type GetAdmissionregistrationAPIGroupInput =
  typeof GetAdmissionregistrationAPIGroupInput.Type;

// Output Schema
export const GetAdmissionregistrationAPIGroupOutput =
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
export type GetAdmissionregistrationAPIGroupOutput =
  typeof GetAdmissionregistrationAPIGroupOutput.Type;

// The operation
/**
 * get information of a group
 */
export const getAdmissionregistrationAPIGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetAdmissionregistrationAPIGroupInput,
    outputSchema: GetAdmissionregistrationAPIGroupOutput,
  }));
// Input Schema
export const GetAdmissionregistrationV1APIResourcesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/apis/admissionregistration.k8s.io/v1/" }),
  );
export type GetAdmissionregistrationV1APIResourcesInput =
  typeof GetAdmissionregistrationV1APIResourcesInput.Type;

// Output Schema
export const GetAdmissionregistrationV1APIResourcesOutput =
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
export type GetAdmissionregistrationV1APIResourcesOutput =
  typeof GetAdmissionregistrationV1APIResourcesOutput.Type;

// The operation
/**
 * get available resources
 */
export const getAdmissionregistrationV1APIResources =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetAdmissionregistrationV1APIResourcesInput,
    outputSchema: GetAdmissionregistrationV1APIResourcesOutput,
  }));
// Input Schema
export const GetAdmissionregistrationV1alpha1APIResourcesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/admissionregistration.k8s.io/v1alpha1/",
    }),
  );
export type GetAdmissionregistrationV1alpha1APIResourcesInput =
  typeof GetAdmissionregistrationV1alpha1APIResourcesInput.Type;

// Output Schema
export const GetAdmissionregistrationV1alpha1APIResourcesOutput =
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
export type GetAdmissionregistrationV1alpha1APIResourcesOutput =
  typeof GetAdmissionregistrationV1alpha1APIResourcesOutput.Type;

// The operation
/**
 * get available resources
 */
export const getAdmissionregistrationV1alpha1APIResources =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetAdmissionregistrationV1alpha1APIResourcesInput,
    outputSchema: GetAdmissionregistrationV1alpha1APIResourcesOutput,
  }));
// Input Schema
export const GetAdmissionregistrationV1beta1APIResourcesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/admissionregistration.k8s.io/v1beta1/",
    }),
  );
export type GetAdmissionregistrationV1beta1APIResourcesInput =
  typeof GetAdmissionregistrationV1beta1APIResourcesInput.Type;

// Output Schema
export const GetAdmissionregistrationV1beta1APIResourcesOutput =
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
export type GetAdmissionregistrationV1beta1APIResourcesOutput =
  typeof GetAdmissionregistrationV1beta1APIResourcesOutput.Type;

// The operation
/**
 * get available resources
 */
export const getAdmissionregistrationV1beta1APIResources =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetAdmissionregistrationV1beta1APIResourcesInput,
    outputSchema: GetAdmissionregistrationV1beta1APIResourcesOutput,
  }));
// Input Schema
export const ListAdmissionregistrationV1MutatingAdmissionPolicyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/admissionregistration.k8s.io/v1/mutatingadmissionpolicies",
    }),
  );
export type ListAdmissionregistrationV1MutatingAdmissionPolicyInput =
  typeof ListAdmissionregistrationV1MutatingAdmissionPolicyInput.Type;

// Output Schema
export const ListAdmissionregistrationV1MutatingAdmissionPolicyOutput =
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
            failurePolicy: Schema.optional(Schema.String),
            matchConditions: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  expression: Schema.String,
                  name: Schema.String,
                }),
              ),
            ),
            matchConstraints: Schema.optional(
              Schema.Struct({
                excludeResourceRules: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      apiGroups: Schema.optional(Schema.Array(Schema.String)),
                      apiVersions: Schema.optional(Schema.Array(Schema.String)),
                      operations: Schema.optional(Schema.Array(Schema.String)),
                      resourceNames: Schema.optional(
                        Schema.Array(Schema.String),
                      ),
                      resources: Schema.optional(Schema.Array(Schema.String)),
                      scope: Schema.optional(Schema.String),
                    }),
                  ),
                ),
                matchPolicy: Schema.optional(Schema.String),
                namespaceSelector: Schema.optional(
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
                objectSelector: Schema.optional(
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
                resourceRules: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      apiGroups: Schema.optional(Schema.Array(Schema.String)),
                      apiVersions: Schema.optional(Schema.Array(Schema.String)),
                      operations: Schema.optional(Schema.Array(Schema.String)),
                      resourceNames: Schema.optional(
                        Schema.Array(Schema.String),
                      ),
                      resources: Schema.optional(Schema.Array(Schema.String)),
                      scope: Schema.optional(Schema.String),
                    }),
                  ),
                ),
              }),
            ),
            mutations: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  applyConfiguration: Schema.optional(
                    Schema.Struct({
                      expression: Schema.optional(Schema.String),
                    }),
                  ),
                  jsonPatch: Schema.optional(
                    Schema.Struct({
                      expression: Schema.optional(Schema.String),
                    }),
                  ),
                  patchType: Schema.String,
                }),
              ),
            ),
            paramKind: Schema.optional(
              Schema.Struct({
                apiVersion: Schema.optional(Schema.String),
                kind: Schema.optional(Schema.String),
              }),
            ),
            reinvocationPolicy: Schema.optional(Schema.String),
            variables: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  expression: Schema.String,
                  name: Schema.String,
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
export type ListAdmissionregistrationV1MutatingAdmissionPolicyOutput =
  typeof ListAdmissionregistrationV1MutatingAdmissionPolicyOutput.Type;

// The operation
/**
 * list or watch objects of kind MutatingAdmissionPolicy
 */
export const listAdmissionregistrationV1MutatingAdmissionPolicy =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListAdmissionregistrationV1MutatingAdmissionPolicyInput,
    outputSchema: ListAdmissionregistrationV1MutatingAdmissionPolicyOutput,
  }));
// Input Schema
export const ListAdmissionregistrationV1MutatingAdmissionPolicyBindingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/admissionregistration.k8s.io/v1/mutatingadmissionpolicybindings",
    }),
  );
export type ListAdmissionregistrationV1MutatingAdmissionPolicyBindingInput =
  typeof ListAdmissionregistrationV1MutatingAdmissionPolicyBindingInput.Type;

// Output Schema
export const ListAdmissionregistrationV1MutatingAdmissionPolicyBindingOutput =
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
            matchResources: Schema.optional(
              Schema.Struct({
                excludeResourceRules: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      apiGroups: Schema.optional(Schema.Array(Schema.String)),
                      apiVersions: Schema.optional(Schema.Array(Schema.String)),
                      operations: Schema.optional(Schema.Array(Schema.String)),
                      resourceNames: Schema.optional(
                        Schema.Array(Schema.String),
                      ),
                      resources: Schema.optional(Schema.Array(Schema.String)),
                      scope: Schema.optional(Schema.String),
                    }),
                  ),
                ),
                matchPolicy: Schema.optional(Schema.String),
                namespaceSelector: Schema.optional(
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
                objectSelector: Schema.optional(
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
                resourceRules: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      apiGroups: Schema.optional(Schema.Array(Schema.String)),
                      apiVersions: Schema.optional(Schema.Array(Schema.String)),
                      operations: Schema.optional(Schema.Array(Schema.String)),
                      resourceNames: Schema.optional(
                        Schema.Array(Schema.String),
                      ),
                      resources: Schema.optional(Schema.Array(Schema.String)),
                      scope: Schema.optional(Schema.String),
                    }),
                  ),
                ),
              }),
            ),
            paramRef: Schema.optional(
              Schema.Struct({
                name: Schema.optional(Schema.String),
                namespace: Schema.optional(Schema.String),
                parameterNotFoundAction: Schema.optional(Schema.String),
                selector: Schema.optional(
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
              }),
            ),
            policyName: Schema.optional(Schema.String),
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
export type ListAdmissionregistrationV1MutatingAdmissionPolicyBindingOutput =
  typeof ListAdmissionregistrationV1MutatingAdmissionPolicyBindingOutput.Type;

// The operation
/**
 * list or watch objects of kind MutatingAdmissionPolicyBinding
 */
export const listAdmissionregistrationV1MutatingAdmissionPolicyBinding =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListAdmissionregistrationV1MutatingAdmissionPolicyBindingInput,
    outputSchema:
      ListAdmissionregistrationV1MutatingAdmissionPolicyBindingOutput,
  }));
// Input Schema
export const ListAdmissionregistrationV1MutatingWebhookConfigurationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/admissionregistration.k8s.io/v1/mutatingwebhookconfigurations",
    }),
  );
export type ListAdmissionregistrationV1MutatingWebhookConfigurationInput =
  typeof ListAdmissionregistrationV1MutatingWebhookConfigurationInput.Type;

// Output Schema
export const ListAdmissionregistrationV1MutatingWebhookConfigurationOutput =
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
        webhooks: Schema.optional(
          Schema.Array(
            Schema.Struct({
              admissionReviewVersions: Schema.Array(Schema.String),
              clientConfig: Schema.Struct({
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
              failurePolicy: Schema.optional(Schema.String),
              matchConditions: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    expression: Schema.String,
                    name: Schema.String,
                  }),
                ),
              ),
              matchPolicy: Schema.optional(Schema.String),
              name: Schema.String,
              namespaceSelector: Schema.optional(
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
              objectSelector: Schema.optional(
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
              reinvocationPolicy: Schema.optional(Schema.String),
              rules: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    apiGroups: Schema.optional(Schema.Array(Schema.String)),
                    apiVersions: Schema.optional(Schema.Array(Schema.String)),
                    operations: Schema.optional(Schema.Array(Schema.String)),
                    resources: Schema.optional(Schema.Array(Schema.String)),
                    scope: Schema.optional(Schema.String),
                  }),
                ),
              ),
              sideEffects: Schema.String,
              timeoutSeconds: Schema.optional(Schema.Number),
            }),
          ),
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
export type ListAdmissionregistrationV1MutatingWebhookConfigurationOutput =
  typeof ListAdmissionregistrationV1MutatingWebhookConfigurationOutput.Type;

// The operation
/**
 * list or watch objects of kind MutatingWebhookConfiguration
 */
export const listAdmissionregistrationV1MutatingWebhookConfiguration =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListAdmissionregistrationV1MutatingWebhookConfigurationInput,
    outputSchema: ListAdmissionregistrationV1MutatingWebhookConfigurationOutput,
  }));
// Input Schema
export const ListAdmissionregistrationV1ValidatingAdmissionPolicyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/admissionregistration.k8s.io/v1/validatingadmissionpolicies",
    }),
  );
export type ListAdmissionregistrationV1ValidatingAdmissionPolicyInput =
  typeof ListAdmissionregistrationV1ValidatingAdmissionPolicyInput.Type;

// Output Schema
export const ListAdmissionregistrationV1ValidatingAdmissionPolicyOutput =
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
            auditAnnotations: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  key: Schema.String,
                  valueExpression: Schema.String,
                }),
              ),
            ),
            failurePolicy: Schema.optional(Schema.String),
            matchConditions: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  expression: Schema.String,
                  name: Schema.String,
                }),
              ),
            ),
            matchConstraints: Schema.optional(
              Schema.Struct({
                excludeResourceRules: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      apiGroups: Schema.optional(Schema.Array(Schema.String)),
                      apiVersions: Schema.optional(Schema.Array(Schema.String)),
                      operations: Schema.optional(Schema.Array(Schema.String)),
                      resourceNames: Schema.optional(
                        Schema.Array(Schema.String),
                      ),
                      resources: Schema.optional(Schema.Array(Schema.String)),
                      scope: Schema.optional(Schema.String),
                    }),
                  ),
                ),
                matchPolicy: Schema.optional(Schema.String),
                namespaceSelector: Schema.optional(
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
                objectSelector: Schema.optional(
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
                resourceRules: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      apiGroups: Schema.optional(Schema.Array(Schema.String)),
                      apiVersions: Schema.optional(Schema.Array(Schema.String)),
                      operations: Schema.optional(Schema.Array(Schema.String)),
                      resourceNames: Schema.optional(
                        Schema.Array(Schema.String),
                      ),
                      resources: Schema.optional(Schema.Array(Schema.String)),
                      scope: Schema.optional(Schema.String),
                    }),
                  ),
                ),
              }),
            ),
            paramKind: Schema.optional(
              Schema.Struct({
                apiVersion: Schema.optional(Schema.String),
                kind: Schema.optional(Schema.String),
              }),
            ),
            validations: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  expression: Schema.String,
                  message: Schema.optional(Schema.String),
                  messageExpression: Schema.optional(Schema.String),
                  reason: Schema.optional(Schema.String),
                }),
              ),
            ),
            variables: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  expression: Schema.String,
                  name: Schema.String,
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
                  lastTransitionTime: Schema.String,
                  message: Schema.String,
                  observedGeneration: Schema.optional(Schema.Number),
                  reason: Schema.String,
                  status: Schema.String,
                  type: Schema.String,
                }),
              ),
            ),
            observedGeneration: Schema.optional(Schema.Number),
            typeChecking: Schema.optional(
              Schema.Struct({
                expressionWarnings: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      fieldRef: Schema.String,
                      warning: Schema.String,
                    }),
                  ),
                ),
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
export type ListAdmissionregistrationV1ValidatingAdmissionPolicyOutput =
  typeof ListAdmissionregistrationV1ValidatingAdmissionPolicyOutput.Type;

// The operation
/**
 * list or watch objects of kind ValidatingAdmissionPolicy
 */
export const listAdmissionregistrationV1ValidatingAdmissionPolicy =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListAdmissionregistrationV1ValidatingAdmissionPolicyInput,
    outputSchema: ListAdmissionregistrationV1ValidatingAdmissionPolicyOutput,
  }));
// Input Schema
export const ListAdmissionregistrationV1ValidatingAdmissionPolicyBindingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/admissionregistration.k8s.io/v1/validatingadmissionpolicybindings",
    }),
  );
export type ListAdmissionregistrationV1ValidatingAdmissionPolicyBindingInput =
  typeof ListAdmissionregistrationV1ValidatingAdmissionPolicyBindingInput.Type;

// Output Schema
export const ListAdmissionregistrationV1ValidatingAdmissionPolicyBindingOutput =
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
          matchResources: Schema.optional(
            Schema.Struct({
              excludeResourceRules: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    apiGroups: Schema.optional(Schema.Array(Schema.String)),
                    apiVersions: Schema.optional(Schema.Array(Schema.String)),
                    operations: Schema.optional(Schema.Array(Schema.String)),
                    resourceNames: Schema.optional(Schema.Array(Schema.String)),
                    resources: Schema.optional(Schema.Array(Schema.String)),
                    scope: Schema.optional(Schema.String),
                  }),
                ),
              ),
              matchPolicy: Schema.optional(Schema.String),
              namespaceSelector: Schema.optional(
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
              objectSelector: Schema.optional(
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
              resourceRules: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    apiGroups: Schema.optional(Schema.Array(Schema.String)),
                    apiVersions: Schema.optional(Schema.Array(Schema.String)),
                    operations: Schema.optional(Schema.Array(Schema.String)),
                    resourceNames: Schema.optional(Schema.Array(Schema.String)),
                    resources: Schema.optional(Schema.Array(Schema.String)),
                    scope: Schema.optional(Schema.String),
                  }),
                ),
              ),
            }),
          ),
          paramRef: Schema.optional(
            Schema.Struct({
              name: Schema.optional(Schema.String),
              namespace: Schema.optional(Schema.String),
              parameterNotFoundAction: Schema.optional(Schema.String),
              selector: Schema.optional(
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
            }),
          ),
          policyName: Schema.String,
          validationActions: Schema.Array(Schema.String),
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
export type ListAdmissionregistrationV1ValidatingAdmissionPolicyBindingOutput =
  typeof ListAdmissionregistrationV1ValidatingAdmissionPolicyBindingOutput.Type;

// The operation
/**
 * list or watch objects of kind ValidatingAdmissionPolicyBinding
 */
export const listAdmissionregistrationV1ValidatingAdmissionPolicyBinding =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      ListAdmissionregistrationV1ValidatingAdmissionPolicyBindingInput,
    outputSchema:
      ListAdmissionregistrationV1ValidatingAdmissionPolicyBindingOutput,
  }));
// Input Schema
export const ListAdmissionregistrationV1ValidatingWebhookConfigurationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/admissionregistration.k8s.io/v1/validatingwebhookconfigurations",
    }),
  );
export type ListAdmissionregistrationV1ValidatingWebhookConfigurationInput =
  typeof ListAdmissionregistrationV1ValidatingWebhookConfigurationInput.Type;

// Output Schema
export const ListAdmissionregistrationV1ValidatingWebhookConfigurationOutput =
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
        webhooks: Schema.optional(
          Schema.Array(
            Schema.Struct({
              admissionReviewVersions: Schema.Array(Schema.String),
              clientConfig: Schema.Struct({
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
              failurePolicy: Schema.optional(Schema.String),
              matchConditions: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    expression: Schema.String,
                    name: Schema.String,
                  }),
                ),
              ),
              matchPolicy: Schema.optional(Schema.String),
              name: Schema.String,
              namespaceSelector: Schema.optional(
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
              objectSelector: Schema.optional(
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
              rules: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    apiGroups: Schema.optional(Schema.Array(Schema.String)),
                    apiVersions: Schema.optional(Schema.Array(Schema.String)),
                    operations: Schema.optional(Schema.Array(Schema.String)),
                    resources: Schema.optional(Schema.Array(Schema.String)),
                    scope: Schema.optional(Schema.String),
                  }),
                ),
              ),
              sideEffects: Schema.String,
              timeoutSeconds: Schema.optional(Schema.Number),
            }),
          ),
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
export type ListAdmissionregistrationV1ValidatingWebhookConfigurationOutput =
  typeof ListAdmissionregistrationV1ValidatingWebhookConfigurationOutput.Type;

// The operation
/**
 * list or watch objects of kind ValidatingWebhookConfiguration
 */
export const listAdmissionregistrationV1ValidatingWebhookConfiguration =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListAdmissionregistrationV1ValidatingWebhookConfigurationInput,
    outputSchema:
      ListAdmissionregistrationV1ValidatingWebhookConfigurationOutput,
  }));
// Input Schema
export const ListAdmissionregistrationV1alpha1MutatingAdmissionPolicyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/admissionregistration.k8s.io/v1alpha1/mutatingadmissionpolicies",
    }),
  );
export type ListAdmissionregistrationV1alpha1MutatingAdmissionPolicyInput =
  typeof ListAdmissionregistrationV1alpha1MutatingAdmissionPolicyInput.Type;

// Output Schema
export const ListAdmissionregistrationV1alpha1MutatingAdmissionPolicyOutput =
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
            failurePolicy: Schema.optional(Schema.String),
            matchConditions: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  expression: Schema.String,
                  name: Schema.String,
                }),
              ),
            ),
            matchConstraints: Schema.optional(
              Schema.Struct({
                excludeResourceRules: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      apiGroups: Schema.optional(Schema.Array(Schema.String)),
                      apiVersions: Schema.optional(Schema.Array(Schema.String)),
                      operations: Schema.optional(Schema.Array(Schema.String)),
                      resourceNames: Schema.optional(
                        Schema.Array(Schema.String),
                      ),
                      resources: Schema.optional(Schema.Array(Schema.String)),
                      scope: Schema.optional(Schema.String),
                    }),
                  ),
                ),
                matchPolicy: Schema.optional(Schema.String),
                namespaceSelector: Schema.optional(
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
                objectSelector: Schema.optional(
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
                resourceRules: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      apiGroups: Schema.optional(Schema.Array(Schema.String)),
                      apiVersions: Schema.optional(Schema.Array(Schema.String)),
                      operations: Schema.optional(Schema.Array(Schema.String)),
                      resourceNames: Schema.optional(
                        Schema.Array(Schema.String),
                      ),
                      resources: Schema.optional(Schema.Array(Schema.String)),
                      scope: Schema.optional(Schema.String),
                    }),
                  ),
                ),
              }),
            ),
            mutations: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  applyConfiguration: Schema.optional(
                    Schema.Struct({
                      expression: Schema.optional(Schema.String),
                    }),
                  ),
                  jsonPatch: Schema.optional(
                    Schema.Struct({
                      expression: Schema.optional(Schema.String),
                    }),
                  ),
                  patchType: Schema.String,
                }),
              ),
            ),
            paramKind: Schema.optional(
              Schema.Struct({
                apiVersion: Schema.optional(Schema.String),
                kind: Schema.optional(Schema.String),
              }),
            ),
            reinvocationPolicy: Schema.optional(Schema.String),
            variables: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  expression: Schema.String,
                  name: Schema.String,
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
export type ListAdmissionregistrationV1alpha1MutatingAdmissionPolicyOutput =
  typeof ListAdmissionregistrationV1alpha1MutatingAdmissionPolicyOutput.Type;

// The operation
/**
 * list or watch objects of kind MutatingAdmissionPolicy
 */
export const listAdmissionregistrationV1alpha1MutatingAdmissionPolicy =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListAdmissionregistrationV1alpha1MutatingAdmissionPolicyInput,
    outputSchema:
      ListAdmissionregistrationV1alpha1MutatingAdmissionPolicyOutput,
  }));
// Input Schema
export const ListAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/admissionregistration.k8s.io/v1alpha1/mutatingadmissionpolicybindings",
    }),
  );
export type ListAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingInput =
  typeof ListAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingInput.Type;

// Output Schema
export const ListAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingOutput =
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
            matchResources: Schema.optional(
              Schema.Struct({
                excludeResourceRules: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      apiGroups: Schema.optional(Schema.Array(Schema.String)),
                      apiVersions: Schema.optional(Schema.Array(Schema.String)),
                      operations: Schema.optional(Schema.Array(Schema.String)),
                      resourceNames: Schema.optional(
                        Schema.Array(Schema.String),
                      ),
                      resources: Schema.optional(Schema.Array(Schema.String)),
                      scope: Schema.optional(Schema.String),
                    }),
                  ),
                ),
                matchPolicy: Schema.optional(Schema.String),
                namespaceSelector: Schema.optional(
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
                objectSelector: Schema.optional(
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
                resourceRules: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      apiGroups: Schema.optional(Schema.Array(Schema.String)),
                      apiVersions: Schema.optional(Schema.Array(Schema.String)),
                      operations: Schema.optional(Schema.Array(Schema.String)),
                      resourceNames: Schema.optional(
                        Schema.Array(Schema.String),
                      ),
                      resources: Schema.optional(Schema.Array(Schema.String)),
                      scope: Schema.optional(Schema.String),
                    }),
                  ),
                ),
              }),
            ),
            paramRef: Schema.optional(
              Schema.Struct({
                name: Schema.optional(Schema.String),
                namespace: Schema.optional(Schema.String),
                parameterNotFoundAction: Schema.optional(Schema.String),
                selector: Schema.optional(
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
              }),
            ),
            policyName: Schema.optional(Schema.String),
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
export type ListAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingOutput =
  typeof ListAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingOutput.Type;

// The operation
/**
 * list or watch objects of kind MutatingAdmissionPolicyBinding
 */
export const listAdmissionregistrationV1alpha1MutatingAdmissionPolicyBinding =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      ListAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingInput,
    outputSchema:
      ListAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingOutput,
  }));
// Input Schema
export const ListAdmissionregistrationV1beta1MutatingAdmissionPolicyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/admissionregistration.k8s.io/v1beta1/mutatingadmissionpolicies",
    }),
  );
export type ListAdmissionregistrationV1beta1MutatingAdmissionPolicyInput =
  typeof ListAdmissionregistrationV1beta1MutatingAdmissionPolicyInput.Type;

// Output Schema
export const ListAdmissionregistrationV1beta1MutatingAdmissionPolicyOutput =
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
            failurePolicy: Schema.optional(Schema.String),
            matchConditions: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  expression: Schema.String,
                  name: Schema.String,
                }),
              ),
            ),
            matchConstraints: Schema.optional(
              Schema.Struct({
                excludeResourceRules: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      apiGroups: Schema.optional(Schema.Array(Schema.String)),
                      apiVersions: Schema.optional(Schema.Array(Schema.String)),
                      operations: Schema.optional(Schema.Array(Schema.String)),
                      resourceNames: Schema.optional(
                        Schema.Array(Schema.String),
                      ),
                      resources: Schema.optional(Schema.Array(Schema.String)),
                      scope: Schema.optional(Schema.String),
                    }),
                  ),
                ),
                matchPolicy: Schema.optional(Schema.String),
                namespaceSelector: Schema.optional(
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
                objectSelector: Schema.optional(
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
                resourceRules: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      apiGroups: Schema.optional(Schema.Array(Schema.String)),
                      apiVersions: Schema.optional(Schema.Array(Schema.String)),
                      operations: Schema.optional(Schema.Array(Schema.String)),
                      resourceNames: Schema.optional(
                        Schema.Array(Schema.String),
                      ),
                      resources: Schema.optional(Schema.Array(Schema.String)),
                      scope: Schema.optional(Schema.String),
                    }),
                  ),
                ),
              }),
            ),
            mutations: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  applyConfiguration: Schema.optional(
                    Schema.Struct({
                      expression: Schema.optional(Schema.String),
                    }),
                  ),
                  jsonPatch: Schema.optional(
                    Schema.Struct({
                      expression: Schema.optional(Schema.String),
                    }),
                  ),
                  patchType: Schema.String,
                }),
              ),
            ),
            paramKind: Schema.optional(
              Schema.Struct({
                apiVersion: Schema.optional(Schema.String),
                kind: Schema.optional(Schema.String),
              }),
            ),
            reinvocationPolicy: Schema.optional(Schema.String),
            variables: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  expression: Schema.String,
                  name: Schema.String,
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
export type ListAdmissionregistrationV1beta1MutatingAdmissionPolicyOutput =
  typeof ListAdmissionregistrationV1beta1MutatingAdmissionPolicyOutput.Type;

// The operation
/**
 * list or watch objects of kind MutatingAdmissionPolicy
 */
export const listAdmissionregistrationV1beta1MutatingAdmissionPolicy =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListAdmissionregistrationV1beta1MutatingAdmissionPolicyInput,
    outputSchema: ListAdmissionregistrationV1beta1MutatingAdmissionPolicyOutput,
  }));
// Input Schema
export const ListAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/admissionregistration.k8s.io/v1beta1/mutatingadmissionpolicybindings",
    }),
  );
export type ListAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingInput =
  typeof ListAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingInput.Type;

// Output Schema
export const ListAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingOutput =
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
            matchResources: Schema.optional(
              Schema.Struct({
                excludeResourceRules: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      apiGroups: Schema.optional(Schema.Array(Schema.String)),
                      apiVersions: Schema.optional(Schema.Array(Schema.String)),
                      operations: Schema.optional(Schema.Array(Schema.String)),
                      resourceNames: Schema.optional(
                        Schema.Array(Schema.String),
                      ),
                      resources: Schema.optional(Schema.Array(Schema.String)),
                      scope: Schema.optional(Schema.String),
                    }),
                  ),
                ),
                matchPolicy: Schema.optional(Schema.String),
                namespaceSelector: Schema.optional(
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
                objectSelector: Schema.optional(
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
                resourceRules: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      apiGroups: Schema.optional(Schema.Array(Schema.String)),
                      apiVersions: Schema.optional(Schema.Array(Schema.String)),
                      operations: Schema.optional(Schema.Array(Schema.String)),
                      resourceNames: Schema.optional(
                        Schema.Array(Schema.String),
                      ),
                      resources: Schema.optional(Schema.Array(Schema.String)),
                      scope: Schema.optional(Schema.String),
                    }),
                  ),
                ),
              }),
            ),
            paramRef: Schema.optional(
              Schema.Struct({
                name: Schema.optional(Schema.String),
                namespace: Schema.optional(Schema.String),
                parameterNotFoundAction: Schema.optional(Schema.String),
                selector: Schema.optional(
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
              }),
            ),
            policyName: Schema.optional(Schema.String),
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
export type ListAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingOutput =
  typeof ListAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingOutput.Type;

// The operation
/**
 * list or watch objects of kind MutatingAdmissionPolicyBinding
 */
export const listAdmissionregistrationV1beta1MutatingAdmissionPolicyBinding =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      ListAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingInput,
    outputSchema:
      ListAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingOutput,
  }));
// Input Schema
export const PatchAdmissionregistrationV1MutatingAdmissionPolicyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/admissionregistration.k8s.io/v1/mutatingadmissionpolicies/{name}",
    }),
  );
export type PatchAdmissionregistrationV1MutatingAdmissionPolicyInput =
  typeof PatchAdmissionregistrationV1MutatingAdmissionPolicyInput.Type;

// Output Schema
export const PatchAdmissionregistrationV1MutatingAdmissionPolicyOutput =
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
        failurePolicy: Schema.optional(Schema.String),
        matchConditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              expression: Schema.String,
              name: Schema.String,
            }),
          ),
        ),
        matchConstraints: Schema.optional(
          Schema.Struct({
            excludeResourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
            matchPolicy: Schema.optional(Schema.String),
            namespaceSelector: Schema.optional(
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
            objectSelector: Schema.optional(
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
            resourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
        ),
        mutations: Schema.optional(
          Schema.Array(
            Schema.Struct({
              applyConfiguration: Schema.optional(
                Schema.Struct({
                  expression: Schema.optional(Schema.String),
                }),
              ),
              jsonPatch: Schema.optional(
                Schema.Struct({
                  expression: Schema.optional(Schema.String),
                }),
              ),
              patchType: Schema.String,
            }),
          ),
        ),
        paramKind: Schema.optional(
          Schema.Struct({
            apiVersion: Schema.optional(Schema.String),
            kind: Schema.optional(Schema.String),
          }),
        ),
        reinvocationPolicy: Schema.optional(Schema.String),
        variables: Schema.optional(
          Schema.Array(
            Schema.Struct({
              expression: Schema.String,
              name: Schema.String,
            }),
          ),
        ),
      }),
    ),
  });
export type PatchAdmissionregistrationV1MutatingAdmissionPolicyOutput =
  typeof PatchAdmissionregistrationV1MutatingAdmissionPolicyOutput.Type;

// The operation
/**
 * partially update the specified MutatingAdmissionPolicy
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchAdmissionregistrationV1MutatingAdmissionPolicy =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PatchAdmissionregistrationV1MutatingAdmissionPolicyInput,
    outputSchema: PatchAdmissionregistrationV1MutatingAdmissionPolicyOutput,
  }));
// Input Schema
export const PatchAdmissionregistrationV1MutatingAdmissionPolicyBindingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/admissionregistration.k8s.io/v1/mutatingadmissionpolicybindings/{name}",
    }),
  );
export type PatchAdmissionregistrationV1MutatingAdmissionPolicyBindingInput =
  typeof PatchAdmissionregistrationV1MutatingAdmissionPolicyBindingInput.Type;

// Output Schema
export const PatchAdmissionregistrationV1MutatingAdmissionPolicyBindingOutput =
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
        matchResources: Schema.optional(
          Schema.Struct({
            excludeResourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
            matchPolicy: Schema.optional(Schema.String),
            namespaceSelector: Schema.optional(
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
            objectSelector: Schema.optional(
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
            resourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
        ),
        paramRef: Schema.optional(
          Schema.Struct({
            name: Schema.optional(Schema.String),
            namespace: Schema.optional(Schema.String),
            parameterNotFoundAction: Schema.optional(Schema.String),
            selector: Schema.optional(
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
          }),
        ),
        policyName: Schema.optional(Schema.String),
      }),
    ),
  });
export type PatchAdmissionregistrationV1MutatingAdmissionPolicyBindingOutput =
  typeof PatchAdmissionregistrationV1MutatingAdmissionPolicyBindingOutput.Type;

// The operation
/**
 * partially update the specified MutatingAdmissionPolicyBinding
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchAdmissionregistrationV1MutatingAdmissionPolicyBinding =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      PatchAdmissionregistrationV1MutatingAdmissionPolicyBindingInput,
    outputSchema:
      PatchAdmissionregistrationV1MutatingAdmissionPolicyBindingOutput,
  }));
// Input Schema
export const PatchAdmissionregistrationV1MutatingWebhookConfigurationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/admissionregistration.k8s.io/v1/mutatingwebhookconfigurations/{name}",
    }),
  );
export type PatchAdmissionregistrationV1MutatingWebhookConfigurationInput =
  typeof PatchAdmissionregistrationV1MutatingWebhookConfigurationInput.Type;

// Output Schema
export const PatchAdmissionregistrationV1MutatingWebhookConfigurationOutput =
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
    webhooks: Schema.optional(
      Schema.Array(
        Schema.Struct({
          admissionReviewVersions: Schema.Array(Schema.String),
          clientConfig: Schema.Struct({
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
          failurePolicy: Schema.optional(Schema.String),
          matchConditions: Schema.optional(
            Schema.Array(
              Schema.Struct({
                expression: Schema.String,
                name: Schema.String,
              }),
            ),
          ),
          matchPolicy: Schema.optional(Schema.String),
          name: Schema.String,
          namespaceSelector: Schema.optional(
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
          objectSelector: Schema.optional(
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
          reinvocationPolicy: Schema.optional(Schema.String),
          rules: Schema.optional(
            Schema.Array(
              Schema.Struct({
                apiGroups: Schema.optional(Schema.Array(Schema.String)),
                apiVersions: Schema.optional(Schema.Array(Schema.String)),
                operations: Schema.optional(Schema.Array(Schema.String)),
                resources: Schema.optional(Schema.Array(Schema.String)),
                scope: Schema.optional(Schema.String),
              }),
            ),
          ),
          sideEffects: Schema.String,
          timeoutSeconds: Schema.optional(Schema.Number),
        }),
      ),
    ),
  });
export type PatchAdmissionregistrationV1MutatingWebhookConfigurationOutput =
  typeof PatchAdmissionregistrationV1MutatingWebhookConfigurationOutput.Type;

// The operation
/**
 * partially update the specified MutatingWebhookConfiguration
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchAdmissionregistrationV1MutatingWebhookConfiguration =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PatchAdmissionregistrationV1MutatingWebhookConfigurationInput,
    outputSchema:
      PatchAdmissionregistrationV1MutatingWebhookConfigurationOutput,
  }));
// Input Schema
export const PatchAdmissionregistrationV1ValidatingAdmissionPolicyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/admissionregistration.k8s.io/v1/validatingadmissionpolicies/{name}",
    }),
  );
export type PatchAdmissionregistrationV1ValidatingAdmissionPolicyInput =
  typeof PatchAdmissionregistrationV1ValidatingAdmissionPolicyInput.Type;

// Output Schema
export const PatchAdmissionregistrationV1ValidatingAdmissionPolicyOutput =
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
        auditAnnotations: Schema.optional(
          Schema.Array(
            Schema.Struct({
              key: Schema.String,
              valueExpression: Schema.String,
            }),
          ),
        ),
        failurePolicy: Schema.optional(Schema.String),
        matchConditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              expression: Schema.String,
              name: Schema.String,
            }),
          ),
        ),
        matchConstraints: Schema.optional(
          Schema.Struct({
            excludeResourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
            matchPolicy: Schema.optional(Schema.String),
            namespaceSelector: Schema.optional(
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
            objectSelector: Schema.optional(
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
            resourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
        ),
        paramKind: Schema.optional(
          Schema.Struct({
            apiVersion: Schema.optional(Schema.String),
            kind: Schema.optional(Schema.String),
          }),
        ),
        validations: Schema.optional(
          Schema.Array(
            Schema.Struct({
              expression: Schema.String,
              message: Schema.optional(Schema.String),
              messageExpression: Schema.optional(Schema.String),
              reason: Schema.optional(Schema.String),
            }),
          ),
        ),
        variables: Schema.optional(
          Schema.Array(
            Schema.Struct({
              expression: Schema.String,
              name: Schema.String,
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
              lastTransitionTime: Schema.String,
              message: Schema.String,
              observedGeneration: Schema.optional(Schema.Number),
              reason: Schema.String,
              status: Schema.String,
              type: Schema.String,
            }),
          ),
        ),
        observedGeneration: Schema.optional(Schema.Number),
        typeChecking: Schema.optional(
          Schema.Struct({
            expressionWarnings: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  fieldRef: Schema.String,
                  warning: Schema.String,
                }),
              ),
            ),
          }),
        ),
      }),
    ),
  });
export type PatchAdmissionregistrationV1ValidatingAdmissionPolicyOutput =
  typeof PatchAdmissionregistrationV1ValidatingAdmissionPolicyOutput.Type;

// The operation
/**
 * partially update the specified ValidatingAdmissionPolicy
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchAdmissionregistrationV1ValidatingAdmissionPolicy =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PatchAdmissionregistrationV1ValidatingAdmissionPolicyInput,
    outputSchema: PatchAdmissionregistrationV1ValidatingAdmissionPolicyOutput,
  }));
// Input Schema
export const PatchAdmissionregistrationV1ValidatingAdmissionPolicyBindingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/admissionregistration.k8s.io/v1/validatingadmissionpolicybindings/{name}",
    }),
  );
export type PatchAdmissionregistrationV1ValidatingAdmissionPolicyBindingInput =
  typeof PatchAdmissionregistrationV1ValidatingAdmissionPolicyBindingInput.Type;

// Output Schema
export const PatchAdmissionregistrationV1ValidatingAdmissionPolicyBindingOutput =
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
      matchResources: Schema.optional(
        Schema.Struct({
          excludeResourceRules: Schema.optional(
            Schema.Array(
              Schema.Struct({
                apiGroups: Schema.optional(Schema.Array(Schema.String)),
                apiVersions: Schema.optional(Schema.Array(Schema.String)),
                operations: Schema.optional(Schema.Array(Schema.String)),
                resourceNames: Schema.optional(Schema.Array(Schema.String)),
                resources: Schema.optional(Schema.Array(Schema.String)),
                scope: Schema.optional(Schema.String),
              }),
            ),
          ),
          matchPolicy: Schema.optional(Schema.String),
          namespaceSelector: Schema.optional(
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
          objectSelector: Schema.optional(
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
          resourceRules: Schema.optional(
            Schema.Array(
              Schema.Struct({
                apiGroups: Schema.optional(Schema.Array(Schema.String)),
                apiVersions: Schema.optional(Schema.Array(Schema.String)),
                operations: Schema.optional(Schema.Array(Schema.String)),
                resourceNames: Schema.optional(Schema.Array(Schema.String)),
                resources: Schema.optional(Schema.Array(Schema.String)),
                scope: Schema.optional(Schema.String),
              }),
            ),
          ),
        }),
      ),
      paramRef: Schema.optional(
        Schema.Struct({
          name: Schema.optional(Schema.String),
          namespace: Schema.optional(Schema.String),
          parameterNotFoundAction: Schema.optional(Schema.String),
          selector: Schema.optional(
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
        }),
      ),
      policyName: Schema.String,
      validationActions: Schema.Array(Schema.String),
    }),
  });
export type PatchAdmissionregistrationV1ValidatingAdmissionPolicyBindingOutput =
  typeof PatchAdmissionregistrationV1ValidatingAdmissionPolicyBindingOutput.Type;

// The operation
/**
 * partially update the specified ValidatingAdmissionPolicyBinding
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchAdmissionregistrationV1ValidatingAdmissionPolicyBinding =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      PatchAdmissionregistrationV1ValidatingAdmissionPolicyBindingInput,
    outputSchema:
      PatchAdmissionregistrationV1ValidatingAdmissionPolicyBindingOutput,
  }));
// Input Schema
export const PatchAdmissionregistrationV1ValidatingAdmissionPolicyStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/admissionregistration.k8s.io/v1/validatingadmissionpolicies/{name}/status",
    }),
  );
export type PatchAdmissionregistrationV1ValidatingAdmissionPolicyStatusInput =
  typeof PatchAdmissionregistrationV1ValidatingAdmissionPolicyStatusInput.Type;

// Output Schema
export const PatchAdmissionregistrationV1ValidatingAdmissionPolicyStatusOutput =
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
        auditAnnotations: Schema.optional(
          Schema.Array(
            Schema.Struct({
              key: Schema.String,
              valueExpression: Schema.String,
            }),
          ),
        ),
        failurePolicy: Schema.optional(Schema.String),
        matchConditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              expression: Schema.String,
              name: Schema.String,
            }),
          ),
        ),
        matchConstraints: Schema.optional(
          Schema.Struct({
            excludeResourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
            matchPolicy: Schema.optional(Schema.String),
            namespaceSelector: Schema.optional(
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
            objectSelector: Schema.optional(
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
            resourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
        ),
        paramKind: Schema.optional(
          Schema.Struct({
            apiVersion: Schema.optional(Schema.String),
            kind: Schema.optional(Schema.String),
          }),
        ),
        validations: Schema.optional(
          Schema.Array(
            Schema.Struct({
              expression: Schema.String,
              message: Schema.optional(Schema.String),
              messageExpression: Schema.optional(Schema.String),
              reason: Schema.optional(Schema.String),
            }),
          ),
        ),
        variables: Schema.optional(
          Schema.Array(
            Schema.Struct({
              expression: Schema.String,
              name: Schema.String,
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
              lastTransitionTime: Schema.String,
              message: Schema.String,
              observedGeneration: Schema.optional(Schema.Number),
              reason: Schema.String,
              status: Schema.String,
              type: Schema.String,
            }),
          ),
        ),
        observedGeneration: Schema.optional(Schema.Number),
        typeChecking: Schema.optional(
          Schema.Struct({
            expressionWarnings: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  fieldRef: Schema.String,
                  warning: Schema.String,
                }),
              ),
            ),
          }),
        ),
      }),
    ),
  });
export type PatchAdmissionregistrationV1ValidatingAdmissionPolicyStatusOutput =
  typeof PatchAdmissionregistrationV1ValidatingAdmissionPolicyStatusOutput.Type;

// The operation
/**
 * partially update status of the specified ValidatingAdmissionPolicy
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchAdmissionregistrationV1ValidatingAdmissionPolicyStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      PatchAdmissionregistrationV1ValidatingAdmissionPolicyStatusInput,
    outputSchema:
      PatchAdmissionregistrationV1ValidatingAdmissionPolicyStatusOutput,
  }));
// Input Schema
export const PatchAdmissionregistrationV1ValidatingWebhookConfigurationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/admissionregistration.k8s.io/v1/validatingwebhookconfigurations/{name}",
    }),
  );
export type PatchAdmissionregistrationV1ValidatingWebhookConfigurationInput =
  typeof PatchAdmissionregistrationV1ValidatingWebhookConfigurationInput.Type;

// Output Schema
export const PatchAdmissionregistrationV1ValidatingWebhookConfigurationOutput =
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
    webhooks: Schema.optional(
      Schema.Array(
        Schema.Struct({
          admissionReviewVersions: Schema.Array(Schema.String),
          clientConfig: Schema.Struct({
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
          failurePolicy: Schema.optional(Schema.String),
          matchConditions: Schema.optional(
            Schema.Array(
              Schema.Struct({
                expression: Schema.String,
                name: Schema.String,
              }),
            ),
          ),
          matchPolicy: Schema.optional(Schema.String),
          name: Schema.String,
          namespaceSelector: Schema.optional(
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
          objectSelector: Schema.optional(
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
          rules: Schema.optional(
            Schema.Array(
              Schema.Struct({
                apiGroups: Schema.optional(Schema.Array(Schema.String)),
                apiVersions: Schema.optional(Schema.Array(Schema.String)),
                operations: Schema.optional(Schema.Array(Schema.String)),
                resources: Schema.optional(Schema.Array(Schema.String)),
                scope: Schema.optional(Schema.String),
              }),
            ),
          ),
          sideEffects: Schema.String,
          timeoutSeconds: Schema.optional(Schema.Number),
        }),
      ),
    ),
  });
export type PatchAdmissionregistrationV1ValidatingWebhookConfigurationOutput =
  typeof PatchAdmissionregistrationV1ValidatingWebhookConfigurationOutput.Type;

// The operation
/**
 * partially update the specified ValidatingWebhookConfiguration
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchAdmissionregistrationV1ValidatingWebhookConfiguration =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      PatchAdmissionregistrationV1ValidatingWebhookConfigurationInput,
    outputSchema:
      PatchAdmissionregistrationV1ValidatingWebhookConfigurationOutput,
  }));
// Input Schema
export const PatchAdmissionregistrationV1alpha1MutatingAdmissionPolicyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/admissionregistration.k8s.io/v1alpha1/mutatingadmissionpolicies/{name}",
    }),
  );
export type PatchAdmissionregistrationV1alpha1MutatingAdmissionPolicyInput =
  typeof PatchAdmissionregistrationV1alpha1MutatingAdmissionPolicyInput.Type;

// Output Schema
export const PatchAdmissionregistrationV1alpha1MutatingAdmissionPolicyOutput =
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
        failurePolicy: Schema.optional(Schema.String),
        matchConditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              expression: Schema.String,
              name: Schema.String,
            }),
          ),
        ),
        matchConstraints: Schema.optional(
          Schema.Struct({
            excludeResourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
            matchPolicy: Schema.optional(Schema.String),
            namespaceSelector: Schema.optional(
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
            objectSelector: Schema.optional(
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
            resourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
        ),
        mutations: Schema.optional(
          Schema.Array(
            Schema.Struct({
              applyConfiguration: Schema.optional(
                Schema.Struct({
                  expression: Schema.optional(Schema.String),
                }),
              ),
              jsonPatch: Schema.optional(
                Schema.Struct({
                  expression: Schema.optional(Schema.String),
                }),
              ),
              patchType: Schema.String,
            }),
          ),
        ),
        paramKind: Schema.optional(
          Schema.Struct({
            apiVersion: Schema.optional(Schema.String),
            kind: Schema.optional(Schema.String),
          }),
        ),
        reinvocationPolicy: Schema.optional(Schema.String),
        variables: Schema.optional(
          Schema.Array(
            Schema.Struct({
              expression: Schema.String,
              name: Schema.String,
            }),
          ),
        ),
      }),
    ),
  });
export type PatchAdmissionregistrationV1alpha1MutatingAdmissionPolicyOutput =
  typeof PatchAdmissionregistrationV1alpha1MutatingAdmissionPolicyOutput.Type;

// The operation
/**
 * partially update the specified MutatingAdmissionPolicy
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchAdmissionregistrationV1alpha1MutatingAdmissionPolicy =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PatchAdmissionregistrationV1alpha1MutatingAdmissionPolicyInput,
    outputSchema:
      PatchAdmissionregistrationV1alpha1MutatingAdmissionPolicyOutput,
  }));
// Input Schema
export const PatchAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/admissionregistration.k8s.io/v1alpha1/mutatingadmissionpolicybindings/{name}",
    }),
  );
export type PatchAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingInput =
  typeof PatchAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingInput.Type;

// Output Schema
export const PatchAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingOutput =
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
        matchResources: Schema.optional(
          Schema.Struct({
            excludeResourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
            matchPolicy: Schema.optional(Schema.String),
            namespaceSelector: Schema.optional(
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
            objectSelector: Schema.optional(
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
            resourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
        ),
        paramRef: Schema.optional(
          Schema.Struct({
            name: Schema.optional(Schema.String),
            namespace: Schema.optional(Schema.String),
            parameterNotFoundAction: Schema.optional(Schema.String),
            selector: Schema.optional(
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
          }),
        ),
        policyName: Schema.optional(Schema.String),
      }),
    ),
  });
export type PatchAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingOutput =
  typeof PatchAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingOutput.Type;

// The operation
/**
 * partially update the specified MutatingAdmissionPolicyBinding
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchAdmissionregistrationV1alpha1MutatingAdmissionPolicyBinding =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      PatchAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingInput,
    outputSchema:
      PatchAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingOutput,
  }));
// Input Schema
export const PatchAdmissionregistrationV1beta1MutatingAdmissionPolicyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/admissionregistration.k8s.io/v1beta1/mutatingadmissionpolicies/{name}",
    }),
  );
export type PatchAdmissionregistrationV1beta1MutatingAdmissionPolicyInput =
  typeof PatchAdmissionregistrationV1beta1MutatingAdmissionPolicyInput.Type;

// Output Schema
export const PatchAdmissionregistrationV1beta1MutatingAdmissionPolicyOutput =
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
        failurePolicy: Schema.optional(Schema.String),
        matchConditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              expression: Schema.String,
              name: Schema.String,
            }),
          ),
        ),
        matchConstraints: Schema.optional(
          Schema.Struct({
            excludeResourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
            matchPolicy: Schema.optional(Schema.String),
            namespaceSelector: Schema.optional(
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
            objectSelector: Schema.optional(
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
            resourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
        ),
        mutations: Schema.optional(
          Schema.Array(
            Schema.Struct({
              applyConfiguration: Schema.optional(
                Schema.Struct({
                  expression: Schema.optional(Schema.String),
                }),
              ),
              jsonPatch: Schema.optional(
                Schema.Struct({
                  expression: Schema.optional(Schema.String),
                }),
              ),
              patchType: Schema.String,
            }),
          ),
        ),
        paramKind: Schema.optional(
          Schema.Struct({
            apiVersion: Schema.optional(Schema.String),
            kind: Schema.optional(Schema.String),
          }),
        ),
        reinvocationPolicy: Schema.optional(Schema.String),
        variables: Schema.optional(
          Schema.Array(
            Schema.Struct({
              expression: Schema.String,
              name: Schema.String,
            }),
          ),
        ),
      }),
    ),
  });
export type PatchAdmissionregistrationV1beta1MutatingAdmissionPolicyOutput =
  typeof PatchAdmissionregistrationV1beta1MutatingAdmissionPolicyOutput.Type;

// The operation
/**
 * partially update the specified MutatingAdmissionPolicy
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchAdmissionregistrationV1beta1MutatingAdmissionPolicy =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PatchAdmissionregistrationV1beta1MutatingAdmissionPolicyInput,
    outputSchema:
      PatchAdmissionregistrationV1beta1MutatingAdmissionPolicyOutput,
  }));
// Input Schema
export const PatchAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/admissionregistration.k8s.io/v1beta1/mutatingadmissionpolicybindings/{name}",
    }),
  );
export type PatchAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingInput =
  typeof PatchAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingInput.Type;

// Output Schema
export const PatchAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingOutput =
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
        matchResources: Schema.optional(
          Schema.Struct({
            excludeResourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
            matchPolicy: Schema.optional(Schema.String),
            namespaceSelector: Schema.optional(
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
            objectSelector: Schema.optional(
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
            resourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
        ),
        paramRef: Schema.optional(
          Schema.Struct({
            name: Schema.optional(Schema.String),
            namespace: Schema.optional(Schema.String),
            parameterNotFoundAction: Schema.optional(Schema.String),
            selector: Schema.optional(
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
          }),
        ),
        policyName: Schema.optional(Schema.String),
      }),
    ),
  });
export type PatchAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingOutput =
  typeof PatchAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingOutput.Type;

// The operation
/**
 * partially update the specified MutatingAdmissionPolicyBinding
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchAdmissionregistrationV1beta1MutatingAdmissionPolicyBinding =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      PatchAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingInput,
    outputSchema:
      PatchAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingOutput,
  }));
// Input Schema
export const ReadAdmissionregistrationV1MutatingAdmissionPolicyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/admissionregistration.k8s.io/v1/mutatingadmissionpolicies/{name}",
    }),
  );
export type ReadAdmissionregistrationV1MutatingAdmissionPolicyInput =
  typeof ReadAdmissionregistrationV1MutatingAdmissionPolicyInput.Type;

// Output Schema
export const ReadAdmissionregistrationV1MutatingAdmissionPolicyOutput =
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
        failurePolicy: Schema.optional(Schema.String),
        matchConditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              expression: Schema.String,
              name: Schema.String,
            }),
          ),
        ),
        matchConstraints: Schema.optional(
          Schema.Struct({
            excludeResourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
            matchPolicy: Schema.optional(Schema.String),
            namespaceSelector: Schema.optional(
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
            objectSelector: Schema.optional(
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
            resourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
        ),
        mutations: Schema.optional(
          Schema.Array(
            Schema.Struct({
              applyConfiguration: Schema.optional(
                Schema.Struct({
                  expression: Schema.optional(Schema.String),
                }),
              ),
              jsonPatch: Schema.optional(
                Schema.Struct({
                  expression: Schema.optional(Schema.String),
                }),
              ),
              patchType: Schema.String,
            }),
          ),
        ),
        paramKind: Schema.optional(
          Schema.Struct({
            apiVersion: Schema.optional(Schema.String),
            kind: Schema.optional(Schema.String),
          }),
        ),
        reinvocationPolicy: Schema.optional(Schema.String),
        variables: Schema.optional(
          Schema.Array(
            Schema.Struct({
              expression: Schema.String,
              name: Schema.String,
            }),
          ),
        ),
      }),
    ),
  });
export type ReadAdmissionregistrationV1MutatingAdmissionPolicyOutput =
  typeof ReadAdmissionregistrationV1MutatingAdmissionPolicyOutput.Type;

// The operation
/**
 * read the specified MutatingAdmissionPolicy
 */
export const readAdmissionregistrationV1MutatingAdmissionPolicy =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReadAdmissionregistrationV1MutatingAdmissionPolicyInput,
    outputSchema: ReadAdmissionregistrationV1MutatingAdmissionPolicyOutput,
  }));
// Input Schema
export const ReadAdmissionregistrationV1MutatingAdmissionPolicyBindingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/admissionregistration.k8s.io/v1/mutatingadmissionpolicybindings/{name}",
    }),
  );
export type ReadAdmissionregistrationV1MutatingAdmissionPolicyBindingInput =
  typeof ReadAdmissionregistrationV1MutatingAdmissionPolicyBindingInput.Type;

// Output Schema
export const ReadAdmissionregistrationV1MutatingAdmissionPolicyBindingOutput =
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
        matchResources: Schema.optional(
          Schema.Struct({
            excludeResourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
            matchPolicy: Schema.optional(Schema.String),
            namespaceSelector: Schema.optional(
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
            objectSelector: Schema.optional(
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
            resourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
        ),
        paramRef: Schema.optional(
          Schema.Struct({
            name: Schema.optional(Schema.String),
            namespace: Schema.optional(Schema.String),
            parameterNotFoundAction: Schema.optional(Schema.String),
            selector: Schema.optional(
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
          }),
        ),
        policyName: Schema.optional(Schema.String),
      }),
    ),
  });
export type ReadAdmissionregistrationV1MutatingAdmissionPolicyBindingOutput =
  typeof ReadAdmissionregistrationV1MutatingAdmissionPolicyBindingOutput.Type;

// The operation
/**
 * read the specified MutatingAdmissionPolicyBinding
 */
export const readAdmissionregistrationV1MutatingAdmissionPolicyBinding =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReadAdmissionregistrationV1MutatingAdmissionPolicyBindingInput,
    outputSchema:
      ReadAdmissionregistrationV1MutatingAdmissionPolicyBindingOutput,
  }));
// Input Schema
export const ReadAdmissionregistrationV1MutatingWebhookConfigurationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/admissionregistration.k8s.io/v1/mutatingwebhookconfigurations/{name}",
    }),
  );
export type ReadAdmissionregistrationV1MutatingWebhookConfigurationInput =
  typeof ReadAdmissionregistrationV1MutatingWebhookConfigurationInput.Type;

// Output Schema
export const ReadAdmissionregistrationV1MutatingWebhookConfigurationOutput =
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
    webhooks: Schema.optional(
      Schema.Array(
        Schema.Struct({
          admissionReviewVersions: Schema.Array(Schema.String),
          clientConfig: Schema.Struct({
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
          failurePolicy: Schema.optional(Schema.String),
          matchConditions: Schema.optional(
            Schema.Array(
              Schema.Struct({
                expression: Schema.String,
                name: Schema.String,
              }),
            ),
          ),
          matchPolicy: Schema.optional(Schema.String),
          name: Schema.String,
          namespaceSelector: Schema.optional(
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
          objectSelector: Schema.optional(
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
          reinvocationPolicy: Schema.optional(Schema.String),
          rules: Schema.optional(
            Schema.Array(
              Schema.Struct({
                apiGroups: Schema.optional(Schema.Array(Schema.String)),
                apiVersions: Schema.optional(Schema.Array(Schema.String)),
                operations: Schema.optional(Schema.Array(Schema.String)),
                resources: Schema.optional(Schema.Array(Schema.String)),
                scope: Schema.optional(Schema.String),
              }),
            ),
          ),
          sideEffects: Schema.String,
          timeoutSeconds: Schema.optional(Schema.Number),
        }),
      ),
    ),
  });
export type ReadAdmissionregistrationV1MutatingWebhookConfigurationOutput =
  typeof ReadAdmissionregistrationV1MutatingWebhookConfigurationOutput.Type;

// The operation
/**
 * read the specified MutatingWebhookConfiguration
 */
export const readAdmissionregistrationV1MutatingWebhookConfiguration =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReadAdmissionregistrationV1MutatingWebhookConfigurationInput,
    outputSchema: ReadAdmissionregistrationV1MutatingWebhookConfigurationOutput,
  }));
// Input Schema
export const ReadAdmissionregistrationV1ValidatingAdmissionPolicyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/admissionregistration.k8s.io/v1/validatingadmissionpolicies/{name}",
    }),
  );
export type ReadAdmissionregistrationV1ValidatingAdmissionPolicyInput =
  typeof ReadAdmissionregistrationV1ValidatingAdmissionPolicyInput.Type;

// Output Schema
export const ReadAdmissionregistrationV1ValidatingAdmissionPolicyOutput =
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
        auditAnnotations: Schema.optional(
          Schema.Array(
            Schema.Struct({
              key: Schema.String,
              valueExpression: Schema.String,
            }),
          ),
        ),
        failurePolicy: Schema.optional(Schema.String),
        matchConditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              expression: Schema.String,
              name: Schema.String,
            }),
          ),
        ),
        matchConstraints: Schema.optional(
          Schema.Struct({
            excludeResourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
            matchPolicy: Schema.optional(Schema.String),
            namespaceSelector: Schema.optional(
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
            objectSelector: Schema.optional(
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
            resourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
        ),
        paramKind: Schema.optional(
          Schema.Struct({
            apiVersion: Schema.optional(Schema.String),
            kind: Schema.optional(Schema.String),
          }),
        ),
        validations: Schema.optional(
          Schema.Array(
            Schema.Struct({
              expression: Schema.String,
              message: Schema.optional(Schema.String),
              messageExpression: Schema.optional(Schema.String),
              reason: Schema.optional(Schema.String),
            }),
          ),
        ),
        variables: Schema.optional(
          Schema.Array(
            Schema.Struct({
              expression: Schema.String,
              name: Schema.String,
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
              lastTransitionTime: Schema.String,
              message: Schema.String,
              observedGeneration: Schema.optional(Schema.Number),
              reason: Schema.String,
              status: Schema.String,
              type: Schema.String,
            }),
          ),
        ),
        observedGeneration: Schema.optional(Schema.Number),
        typeChecking: Schema.optional(
          Schema.Struct({
            expressionWarnings: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  fieldRef: Schema.String,
                  warning: Schema.String,
                }),
              ),
            ),
          }),
        ),
      }),
    ),
  });
export type ReadAdmissionregistrationV1ValidatingAdmissionPolicyOutput =
  typeof ReadAdmissionregistrationV1ValidatingAdmissionPolicyOutput.Type;

// The operation
/**
 * read the specified ValidatingAdmissionPolicy
 */
export const readAdmissionregistrationV1ValidatingAdmissionPolicy =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReadAdmissionregistrationV1ValidatingAdmissionPolicyInput,
    outputSchema: ReadAdmissionregistrationV1ValidatingAdmissionPolicyOutput,
  }));
// Input Schema
export const ReadAdmissionregistrationV1ValidatingAdmissionPolicyBindingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/admissionregistration.k8s.io/v1/validatingadmissionpolicybindings/{name}",
    }),
  );
export type ReadAdmissionregistrationV1ValidatingAdmissionPolicyBindingInput =
  typeof ReadAdmissionregistrationV1ValidatingAdmissionPolicyBindingInput.Type;

// Output Schema
export const ReadAdmissionregistrationV1ValidatingAdmissionPolicyBindingOutput =
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
      matchResources: Schema.optional(
        Schema.Struct({
          excludeResourceRules: Schema.optional(
            Schema.Array(
              Schema.Struct({
                apiGroups: Schema.optional(Schema.Array(Schema.String)),
                apiVersions: Schema.optional(Schema.Array(Schema.String)),
                operations: Schema.optional(Schema.Array(Schema.String)),
                resourceNames: Schema.optional(Schema.Array(Schema.String)),
                resources: Schema.optional(Schema.Array(Schema.String)),
                scope: Schema.optional(Schema.String),
              }),
            ),
          ),
          matchPolicy: Schema.optional(Schema.String),
          namespaceSelector: Schema.optional(
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
          objectSelector: Schema.optional(
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
          resourceRules: Schema.optional(
            Schema.Array(
              Schema.Struct({
                apiGroups: Schema.optional(Schema.Array(Schema.String)),
                apiVersions: Schema.optional(Schema.Array(Schema.String)),
                operations: Schema.optional(Schema.Array(Schema.String)),
                resourceNames: Schema.optional(Schema.Array(Schema.String)),
                resources: Schema.optional(Schema.Array(Schema.String)),
                scope: Schema.optional(Schema.String),
              }),
            ),
          ),
        }),
      ),
      paramRef: Schema.optional(
        Schema.Struct({
          name: Schema.optional(Schema.String),
          namespace: Schema.optional(Schema.String),
          parameterNotFoundAction: Schema.optional(Schema.String),
          selector: Schema.optional(
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
        }),
      ),
      policyName: Schema.String,
      validationActions: Schema.Array(Schema.String),
    }),
  });
export type ReadAdmissionregistrationV1ValidatingAdmissionPolicyBindingOutput =
  typeof ReadAdmissionregistrationV1ValidatingAdmissionPolicyBindingOutput.Type;

// The operation
/**
 * read the specified ValidatingAdmissionPolicyBinding
 */
export const readAdmissionregistrationV1ValidatingAdmissionPolicyBinding =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      ReadAdmissionregistrationV1ValidatingAdmissionPolicyBindingInput,
    outputSchema:
      ReadAdmissionregistrationV1ValidatingAdmissionPolicyBindingOutput,
  }));
// Input Schema
export const ReadAdmissionregistrationV1ValidatingAdmissionPolicyStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/admissionregistration.k8s.io/v1/validatingadmissionpolicies/{name}/status",
    }),
  );
export type ReadAdmissionregistrationV1ValidatingAdmissionPolicyStatusInput =
  typeof ReadAdmissionregistrationV1ValidatingAdmissionPolicyStatusInput.Type;

// Output Schema
export const ReadAdmissionregistrationV1ValidatingAdmissionPolicyStatusOutput =
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
        auditAnnotations: Schema.optional(
          Schema.Array(
            Schema.Struct({
              key: Schema.String,
              valueExpression: Schema.String,
            }),
          ),
        ),
        failurePolicy: Schema.optional(Schema.String),
        matchConditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              expression: Schema.String,
              name: Schema.String,
            }),
          ),
        ),
        matchConstraints: Schema.optional(
          Schema.Struct({
            excludeResourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
            matchPolicy: Schema.optional(Schema.String),
            namespaceSelector: Schema.optional(
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
            objectSelector: Schema.optional(
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
            resourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
        ),
        paramKind: Schema.optional(
          Schema.Struct({
            apiVersion: Schema.optional(Schema.String),
            kind: Schema.optional(Schema.String),
          }),
        ),
        validations: Schema.optional(
          Schema.Array(
            Schema.Struct({
              expression: Schema.String,
              message: Schema.optional(Schema.String),
              messageExpression: Schema.optional(Schema.String),
              reason: Schema.optional(Schema.String),
            }),
          ),
        ),
        variables: Schema.optional(
          Schema.Array(
            Schema.Struct({
              expression: Schema.String,
              name: Schema.String,
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
              lastTransitionTime: Schema.String,
              message: Schema.String,
              observedGeneration: Schema.optional(Schema.Number),
              reason: Schema.String,
              status: Schema.String,
              type: Schema.String,
            }),
          ),
        ),
        observedGeneration: Schema.optional(Schema.Number),
        typeChecking: Schema.optional(
          Schema.Struct({
            expressionWarnings: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  fieldRef: Schema.String,
                  warning: Schema.String,
                }),
              ),
            ),
          }),
        ),
      }),
    ),
  });
export type ReadAdmissionregistrationV1ValidatingAdmissionPolicyStatusOutput =
  typeof ReadAdmissionregistrationV1ValidatingAdmissionPolicyStatusOutput.Type;

// The operation
/**
 * read status of the specified ValidatingAdmissionPolicy
 */
export const readAdmissionregistrationV1ValidatingAdmissionPolicyStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      ReadAdmissionregistrationV1ValidatingAdmissionPolicyStatusInput,
    outputSchema:
      ReadAdmissionregistrationV1ValidatingAdmissionPolicyStatusOutput,
  }));
// Input Schema
export const ReadAdmissionregistrationV1ValidatingWebhookConfigurationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/admissionregistration.k8s.io/v1/validatingwebhookconfigurations/{name}",
    }),
  );
export type ReadAdmissionregistrationV1ValidatingWebhookConfigurationInput =
  typeof ReadAdmissionregistrationV1ValidatingWebhookConfigurationInput.Type;

// Output Schema
export const ReadAdmissionregistrationV1ValidatingWebhookConfigurationOutput =
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
    webhooks: Schema.optional(
      Schema.Array(
        Schema.Struct({
          admissionReviewVersions: Schema.Array(Schema.String),
          clientConfig: Schema.Struct({
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
          failurePolicy: Schema.optional(Schema.String),
          matchConditions: Schema.optional(
            Schema.Array(
              Schema.Struct({
                expression: Schema.String,
                name: Schema.String,
              }),
            ),
          ),
          matchPolicy: Schema.optional(Schema.String),
          name: Schema.String,
          namespaceSelector: Schema.optional(
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
          objectSelector: Schema.optional(
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
          rules: Schema.optional(
            Schema.Array(
              Schema.Struct({
                apiGroups: Schema.optional(Schema.Array(Schema.String)),
                apiVersions: Schema.optional(Schema.Array(Schema.String)),
                operations: Schema.optional(Schema.Array(Schema.String)),
                resources: Schema.optional(Schema.Array(Schema.String)),
                scope: Schema.optional(Schema.String),
              }),
            ),
          ),
          sideEffects: Schema.String,
          timeoutSeconds: Schema.optional(Schema.Number),
        }),
      ),
    ),
  });
export type ReadAdmissionregistrationV1ValidatingWebhookConfigurationOutput =
  typeof ReadAdmissionregistrationV1ValidatingWebhookConfigurationOutput.Type;

// The operation
/**
 * read the specified ValidatingWebhookConfiguration
 */
export const readAdmissionregistrationV1ValidatingWebhookConfiguration =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReadAdmissionregistrationV1ValidatingWebhookConfigurationInput,
    outputSchema:
      ReadAdmissionregistrationV1ValidatingWebhookConfigurationOutput,
  }));
// Input Schema
export const ReadAdmissionregistrationV1alpha1MutatingAdmissionPolicyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/admissionregistration.k8s.io/v1alpha1/mutatingadmissionpolicies/{name}",
    }),
  );
export type ReadAdmissionregistrationV1alpha1MutatingAdmissionPolicyInput =
  typeof ReadAdmissionregistrationV1alpha1MutatingAdmissionPolicyInput.Type;

// Output Schema
export const ReadAdmissionregistrationV1alpha1MutatingAdmissionPolicyOutput =
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
        failurePolicy: Schema.optional(Schema.String),
        matchConditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              expression: Schema.String,
              name: Schema.String,
            }),
          ),
        ),
        matchConstraints: Schema.optional(
          Schema.Struct({
            excludeResourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
            matchPolicy: Schema.optional(Schema.String),
            namespaceSelector: Schema.optional(
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
            objectSelector: Schema.optional(
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
            resourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
        ),
        mutations: Schema.optional(
          Schema.Array(
            Schema.Struct({
              applyConfiguration: Schema.optional(
                Schema.Struct({
                  expression: Schema.optional(Schema.String),
                }),
              ),
              jsonPatch: Schema.optional(
                Schema.Struct({
                  expression: Schema.optional(Schema.String),
                }),
              ),
              patchType: Schema.String,
            }),
          ),
        ),
        paramKind: Schema.optional(
          Schema.Struct({
            apiVersion: Schema.optional(Schema.String),
            kind: Schema.optional(Schema.String),
          }),
        ),
        reinvocationPolicy: Schema.optional(Schema.String),
        variables: Schema.optional(
          Schema.Array(
            Schema.Struct({
              expression: Schema.String,
              name: Schema.String,
            }),
          ),
        ),
      }),
    ),
  });
export type ReadAdmissionregistrationV1alpha1MutatingAdmissionPolicyOutput =
  typeof ReadAdmissionregistrationV1alpha1MutatingAdmissionPolicyOutput.Type;

// The operation
/**
 * read the specified MutatingAdmissionPolicy
 */
export const readAdmissionregistrationV1alpha1MutatingAdmissionPolicy =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReadAdmissionregistrationV1alpha1MutatingAdmissionPolicyInput,
    outputSchema:
      ReadAdmissionregistrationV1alpha1MutatingAdmissionPolicyOutput,
  }));
// Input Schema
export const ReadAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/admissionregistration.k8s.io/v1alpha1/mutatingadmissionpolicybindings/{name}",
    }),
  );
export type ReadAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingInput =
  typeof ReadAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingInput.Type;

// Output Schema
export const ReadAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingOutput =
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
        matchResources: Schema.optional(
          Schema.Struct({
            excludeResourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
            matchPolicy: Schema.optional(Schema.String),
            namespaceSelector: Schema.optional(
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
            objectSelector: Schema.optional(
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
            resourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
        ),
        paramRef: Schema.optional(
          Schema.Struct({
            name: Schema.optional(Schema.String),
            namespace: Schema.optional(Schema.String),
            parameterNotFoundAction: Schema.optional(Schema.String),
            selector: Schema.optional(
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
          }),
        ),
        policyName: Schema.optional(Schema.String),
      }),
    ),
  });
export type ReadAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingOutput =
  typeof ReadAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingOutput.Type;

// The operation
/**
 * read the specified MutatingAdmissionPolicyBinding
 */
export const readAdmissionregistrationV1alpha1MutatingAdmissionPolicyBinding =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      ReadAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingInput,
    outputSchema:
      ReadAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingOutput,
  }));
// Input Schema
export const ReadAdmissionregistrationV1beta1MutatingAdmissionPolicyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/admissionregistration.k8s.io/v1beta1/mutatingadmissionpolicies/{name}",
    }),
  );
export type ReadAdmissionregistrationV1beta1MutatingAdmissionPolicyInput =
  typeof ReadAdmissionregistrationV1beta1MutatingAdmissionPolicyInput.Type;

// Output Schema
export const ReadAdmissionregistrationV1beta1MutatingAdmissionPolicyOutput =
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
        failurePolicy: Schema.optional(Schema.String),
        matchConditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              expression: Schema.String,
              name: Schema.String,
            }),
          ),
        ),
        matchConstraints: Schema.optional(
          Schema.Struct({
            excludeResourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
            matchPolicy: Schema.optional(Schema.String),
            namespaceSelector: Schema.optional(
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
            objectSelector: Schema.optional(
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
            resourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
        ),
        mutations: Schema.optional(
          Schema.Array(
            Schema.Struct({
              applyConfiguration: Schema.optional(
                Schema.Struct({
                  expression: Schema.optional(Schema.String),
                }),
              ),
              jsonPatch: Schema.optional(
                Schema.Struct({
                  expression: Schema.optional(Schema.String),
                }),
              ),
              patchType: Schema.String,
            }),
          ),
        ),
        paramKind: Schema.optional(
          Schema.Struct({
            apiVersion: Schema.optional(Schema.String),
            kind: Schema.optional(Schema.String),
          }),
        ),
        reinvocationPolicy: Schema.optional(Schema.String),
        variables: Schema.optional(
          Schema.Array(
            Schema.Struct({
              expression: Schema.String,
              name: Schema.String,
            }),
          ),
        ),
      }),
    ),
  });
export type ReadAdmissionregistrationV1beta1MutatingAdmissionPolicyOutput =
  typeof ReadAdmissionregistrationV1beta1MutatingAdmissionPolicyOutput.Type;

// The operation
/**
 * read the specified MutatingAdmissionPolicy
 */
export const readAdmissionregistrationV1beta1MutatingAdmissionPolicy =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReadAdmissionregistrationV1beta1MutatingAdmissionPolicyInput,
    outputSchema: ReadAdmissionregistrationV1beta1MutatingAdmissionPolicyOutput,
  }));
// Input Schema
export const ReadAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/admissionregistration.k8s.io/v1beta1/mutatingadmissionpolicybindings/{name}",
    }),
  );
export type ReadAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingInput =
  typeof ReadAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingInput.Type;

// Output Schema
export const ReadAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingOutput =
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
        matchResources: Schema.optional(
          Schema.Struct({
            excludeResourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
            matchPolicy: Schema.optional(Schema.String),
            namespaceSelector: Schema.optional(
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
            objectSelector: Schema.optional(
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
            resourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
        ),
        paramRef: Schema.optional(
          Schema.Struct({
            name: Schema.optional(Schema.String),
            namespace: Schema.optional(Schema.String),
            parameterNotFoundAction: Schema.optional(Schema.String),
            selector: Schema.optional(
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
          }),
        ),
        policyName: Schema.optional(Schema.String),
      }),
    ),
  });
export type ReadAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingOutput =
  typeof ReadAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingOutput.Type;

// The operation
/**
 * read the specified MutatingAdmissionPolicyBinding
 */
export const readAdmissionregistrationV1beta1MutatingAdmissionPolicyBinding =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      ReadAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingInput,
    outputSchema:
      ReadAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingOutput,
  }));
// Input Schema
export const ReplaceAdmissionregistrationV1MutatingAdmissionPolicyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/admissionregistration.k8s.io/v1/mutatingadmissionpolicies/{name}",
    }),
  );
export type ReplaceAdmissionregistrationV1MutatingAdmissionPolicyInput =
  typeof ReplaceAdmissionregistrationV1MutatingAdmissionPolicyInput.Type;

// Output Schema
export const ReplaceAdmissionregistrationV1MutatingAdmissionPolicyOutput =
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
        failurePolicy: Schema.optional(Schema.String),
        matchConditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              expression: Schema.String,
              name: Schema.String,
            }),
          ),
        ),
        matchConstraints: Schema.optional(
          Schema.Struct({
            excludeResourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
            matchPolicy: Schema.optional(Schema.String),
            namespaceSelector: Schema.optional(
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
            objectSelector: Schema.optional(
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
            resourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
        ),
        mutations: Schema.optional(
          Schema.Array(
            Schema.Struct({
              applyConfiguration: Schema.optional(
                Schema.Struct({
                  expression: Schema.optional(Schema.String),
                }),
              ),
              jsonPatch: Schema.optional(
                Schema.Struct({
                  expression: Schema.optional(Schema.String),
                }),
              ),
              patchType: Schema.String,
            }),
          ),
        ),
        paramKind: Schema.optional(
          Schema.Struct({
            apiVersion: Schema.optional(Schema.String),
            kind: Schema.optional(Schema.String),
          }),
        ),
        reinvocationPolicy: Schema.optional(Schema.String),
        variables: Schema.optional(
          Schema.Array(
            Schema.Struct({
              expression: Schema.String,
              name: Schema.String,
            }),
          ),
        ),
      }),
    ),
  });
export type ReplaceAdmissionregistrationV1MutatingAdmissionPolicyOutput =
  typeof ReplaceAdmissionregistrationV1MutatingAdmissionPolicyOutput.Type;

// The operation
/**
 * replace the specified MutatingAdmissionPolicy
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceAdmissionregistrationV1MutatingAdmissionPolicy =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReplaceAdmissionregistrationV1MutatingAdmissionPolicyInput,
    outputSchema: ReplaceAdmissionregistrationV1MutatingAdmissionPolicyOutput,
  }));
// Input Schema
export const ReplaceAdmissionregistrationV1MutatingAdmissionPolicyBindingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/admissionregistration.k8s.io/v1/mutatingadmissionpolicybindings/{name}",
    }),
  );
export type ReplaceAdmissionregistrationV1MutatingAdmissionPolicyBindingInput =
  typeof ReplaceAdmissionregistrationV1MutatingAdmissionPolicyBindingInput.Type;

// Output Schema
export const ReplaceAdmissionregistrationV1MutatingAdmissionPolicyBindingOutput =
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
        matchResources: Schema.optional(
          Schema.Struct({
            excludeResourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
            matchPolicy: Schema.optional(Schema.String),
            namespaceSelector: Schema.optional(
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
            objectSelector: Schema.optional(
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
            resourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
        ),
        paramRef: Schema.optional(
          Schema.Struct({
            name: Schema.optional(Schema.String),
            namespace: Schema.optional(Schema.String),
            parameterNotFoundAction: Schema.optional(Schema.String),
            selector: Schema.optional(
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
          }),
        ),
        policyName: Schema.optional(Schema.String),
      }),
    ),
  });
export type ReplaceAdmissionregistrationV1MutatingAdmissionPolicyBindingOutput =
  typeof ReplaceAdmissionregistrationV1MutatingAdmissionPolicyBindingOutput.Type;

// The operation
/**
 * replace the specified MutatingAdmissionPolicyBinding
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceAdmissionregistrationV1MutatingAdmissionPolicyBinding =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      ReplaceAdmissionregistrationV1MutatingAdmissionPolicyBindingInput,
    outputSchema:
      ReplaceAdmissionregistrationV1MutatingAdmissionPolicyBindingOutput,
  }));
// Input Schema
export const ReplaceAdmissionregistrationV1MutatingWebhookConfigurationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/admissionregistration.k8s.io/v1/mutatingwebhookconfigurations/{name}",
    }),
  );
export type ReplaceAdmissionregistrationV1MutatingWebhookConfigurationInput =
  typeof ReplaceAdmissionregistrationV1MutatingWebhookConfigurationInput.Type;

// Output Schema
export const ReplaceAdmissionregistrationV1MutatingWebhookConfigurationOutput =
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
    webhooks: Schema.optional(
      Schema.Array(
        Schema.Struct({
          admissionReviewVersions: Schema.Array(Schema.String),
          clientConfig: Schema.Struct({
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
          failurePolicy: Schema.optional(Schema.String),
          matchConditions: Schema.optional(
            Schema.Array(
              Schema.Struct({
                expression: Schema.String,
                name: Schema.String,
              }),
            ),
          ),
          matchPolicy: Schema.optional(Schema.String),
          name: Schema.String,
          namespaceSelector: Schema.optional(
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
          objectSelector: Schema.optional(
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
          reinvocationPolicy: Schema.optional(Schema.String),
          rules: Schema.optional(
            Schema.Array(
              Schema.Struct({
                apiGroups: Schema.optional(Schema.Array(Schema.String)),
                apiVersions: Schema.optional(Schema.Array(Schema.String)),
                operations: Schema.optional(Schema.Array(Schema.String)),
                resources: Schema.optional(Schema.Array(Schema.String)),
                scope: Schema.optional(Schema.String),
              }),
            ),
          ),
          sideEffects: Schema.String,
          timeoutSeconds: Schema.optional(Schema.Number),
        }),
      ),
    ),
  });
export type ReplaceAdmissionregistrationV1MutatingWebhookConfigurationOutput =
  typeof ReplaceAdmissionregistrationV1MutatingWebhookConfigurationOutput.Type;

// The operation
/**
 * replace the specified MutatingWebhookConfiguration
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceAdmissionregistrationV1MutatingWebhookConfiguration =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      ReplaceAdmissionregistrationV1MutatingWebhookConfigurationInput,
    outputSchema:
      ReplaceAdmissionregistrationV1MutatingWebhookConfigurationOutput,
  }));
// Input Schema
export const ReplaceAdmissionregistrationV1ValidatingAdmissionPolicyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/admissionregistration.k8s.io/v1/validatingadmissionpolicies/{name}",
    }),
  );
export type ReplaceAdmissionregistrationV1ValidatingAdmissionPolicyInput =
  typeof ReplaceAdmissionregistrationV1ValidatingAdmissionPolicyInput.Type;

// Output Schema
export const ReplaceAdmissionregistrationV1ValidatingAdmissionPolicyOutput =
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
        auditAnnotations: Schema.optional(
          Schema.Array(
            Schema.Struct({
              key: Schema.String,
              valueExpression: Schema.String,
            }),
          ),
        ),
        failurePolicy: Schema.optional(Schema.String),
        matchConditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              expression: Schema.String,
              name: Schema.String,
            }),
          ),
        ),
        matchConstraints: Schema.optional(
          Schema.Struct({
            excludeResourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
            matchPolicy: Schema.optional(Schema.String),
            namespaceSelector: Schema.optional(
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
            objectSelector: Schema.optional(
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
            resourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
        ),
        paramKind: Schema.optional(
          Schema.Struct({
            apiVersion: Schema.optional(Schema.String),
            kind: Schema.optional(Schema.String),
          }),
        ),
        validations: Schema.optional(
          Schema.Array(
            Schema.Struct({
              expression: Schema.String,
              message: Schema.optional(Schema.String),
              messageExpression: Schema.optional(Schema.String),
              reason: Schema.optional(Schema.String),
            }),
          ),
        ),
        variables: Schema.optional(
          Schema.Array(
            Schema.Struct({
              expression: Schema.String,
              name: Schema.String,
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
              lastTransitionTime: Schema.String,
              message: Schema.String,
              observedGeneration: Schema.optional(Schema.Number),
              reason: Schema.String,
              status: Schema.String,
              type: Schema.String,
            }),
          ),
        ),
        observedGeneration: Schema.optional(Schema.Number),
        typeChecking: Schema.optional(
          Schema.Struct({
            expressionWarnings: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  fieldRef: Schema.String,
                  warning: Schema.String,
                }),
              ),
            ),
          }),
        ),
      }),
    ),
  });
export type ReplaceAdmissionregistrationV1ValidatingAdmissionPolicyOutput =
  typeof ReplaceAdmissionregistrationV1ValidatingAdmissionPolicyOutput.Type;

// The operation
/**
 * replace the specified ValidatingAdmissionPolicy
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceAdmissionregistrationV1ValidatingAdmissionPolicy =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReplaceAdmissionregistrationV1ValidatingAdmissionPolicyInput,
    outputSchema: ReplaceAdmissionregistrationV1ValidatingAdmissionPolicyOutput,
  }));
// Input Schema
export const ReplaceAdmissionregistrationV1ValidatingAdmissionPolicyBindingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/admissionregistration.k8s.io/v1/validatingadmissionpolicybindings/{name}",
    }),
  );
export type ReplaceAdmissionregistrationV1ValidatingAdmissionPolicyBindingInput =
  typeof ReplaceAdmissionregistrationV1ValidatingAdmissionPolicyBindingInput.Type;

// Output Schema
export const ReplaceAdmissionregistrationV1ValidatingAdmissionPolicyBindingOutput =
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
      matchResources: Schema.optional(
        Schema.Struct({
          excludeResourceRules: Schema.optional(
            Schema.Array(
              Schema.Struct({
                apiGroups: Schema.optional(Schema.Array(Schema.String)),
                apiVersions: Schema.optional(Schema.Array(Schema.String)),
                operations: Schema.optional(Schema.Array(Schema.String)),
                resourceNames: Schema.optional(Schema.Array(Schema.String)),
                resources: Schema.optional(Schema.Array(Schema.String)),
                scope: Schema.optional(Schema.String),
              }),
            ),
          ),
          matchPolicy: Schema.optional(Schema.String),
          namespaceSelector: Schema.optional(
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
          objectSelector: Schema.optional(
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
          resourceRules: Schema.optional(
            Schema.Array(
              Schema.Struct({
                apiGroups: Schema.optional(Schema.Array(Schema.String)),
                apiVersions: Schema.optional(Schema.Array(Schema.String)),
                operations: Schema.optional(Schema.Array(Schema.String)),
                resourceNames: Schema.optional(Schema.Array(Schema.String)),
                resources: Schema.optional(Schema.Array(Schema.String)),
                scope: Schema.optional(Schema.String),
              }),
            ),
          ),
        }),
      ),
      paramRef: Schema.optional(
        Schema.Struct({
          name: Schema.optional(Schema.String),
          namespace: Schema.optional(Schema.String),
          parameterNotFoundAction: Schema.optional(Schema.String),
          selector: Schema.optional(
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
        }),
      ),
      policyName: Schema.String,
      validationActions: Schema.Array(Schema.String),
    }),
  });
export type ReplaceAdmissionregistrationV1ValidatingAdmissionPolicyBindingOutput =
  typeof ReplaceAdmissionregistrationV1ValidatingAdmissionPolicyBindingOutput.Type;

// The operation
/**
 * replace the specified ValidatingAdmissionPolicyBinding
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceAdmissionregistrationV1ValidatingAdmissionPolicyBinding =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      ReplaceAdmissionregistrationV1ValidatingAdmissionPolicyBindingInput,
    outputSchema:
      ReplaceAdmissionregistrationV1ValidatingAdmissionPolicyBindingOutput,
  }));
// Input Schema
export const ReplaceAdmissionregistrationV1ValidatingAdmissionPolicyStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/admissionregistration.k8s.io/v1/validatingadmissionpolicies/{name}/status",
    }),
  );
export type ReplaceAdmissionregistrationV1ValidatingAdmissionPolicyStatusInput =
  typeof ReplaceAdmissionregistrationV1ValidatingAdmissionPolicyStatusInput.Type;

// Output Schema
export const ReplaceAdmissionregistrationV1ValidatingAdmissionPolicyStatusOutput =
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
        auditAnnotations: Schema.optional(
          Schema.Array(
            Schema.Struct({
              key: Schema.String,
              valueExpression: Schema.String,
            }),
          ),
        ),
        failurePolicy: Schema.optional(Schema.String),
        matchConditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              expression: Schema.String,
              name: Schema.String,
            }),
          ),
        ),
        matchConstraints: Schema.optional(
          Schema.Struct({
            excludeResourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
            matchPolicy: Schema.optional(Schema.String),
            namespaceSelector: Schema.optional(
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
            objectSelector: Schema.optional(
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
            resourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
        ),
        paramKind: Schema.optional(
          Schema.Struct({
            apiVersion: Schema.optional(Schema.String),
            kind: Schema.optional(Schema.String),
          }),
        ),
        validations: Schema.optional(
          Schema.Array(
            Schema.Struct({
              expression: Schema.String,
              message: Schema.optional(Schema.String),
              messageExpression: Schema.optional(Schema.String),
              reason: Schema.optional(Schema.String),
            }),
          ),
        ),
        variables: Schema.optional(
          Schema.Array(
            Schema.Struct({
              expression: Schema.String,
              name: Schema.String,
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
              lastTransitionTime: Schema.String,
              message: Schema.String,
              observedGeneration: Schema.optional(Schema.Number),
              reason: Schema.String,
              status: Schema.String,
              type: Schema.String,
            }),
          ),
        ),
        observedGeneration: Schema.optional(Schema.Number),
        typeChecking: Schema.optional(
          Schema.Struct({
            expressionWarnings: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  fieldRef: Schema.String,
                  warning: Schema.String,
                }),
              ),
            ),
          }),
        ),
      }),
    ),
  });
export type ReplaceAdmissionregistrationV1ValidatingAdmissionPolicyStatusOutput =
  typeof ReplaceAdmissionregistrationV1ValidatingAdmissionPolicyStatusOutput.Type;

// The operation
/**
 * replace status of the specified ValidatingAdmissionPolicy
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceAdmissionregistrationV1ValidatingAdmissionPolicyStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      ReplaceAdmissionregistrationV1ValidatingAdmissionPolicyStatusInput,
    outputSchema:
      ReplaceAdmissionregistrationV1ValidatingAdmissionPolicyStatusOutput,
  }));
// Input Schema
export const ReplaceAdmissionregistrationV1ValidatingWebhookConfigurationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/admissionregistration.k8s.io/v1/validatingwebhookconfigurations/{name}",
    }),
  );
export type ReplaceAdmissionregistrationV1ValidatingWebhookConfigurationInput =
  typeof ReplaceAdmissionregistrationV1ValidatingWebhookConfigurationInput.Type;

// Output Schema
export const ReplaceAdmissionregistrationV1ValidatingWebhookConfigurationOutput =
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
    webhooks: Schema.optional(
      Schema.Array(
        Schema.Struct({
          admissionReviewVersions: Schema.Array(Schema.String),
          clientConfig: Schema.Struct({
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
          failurePolicy: Schema.optional(Schema.String),
          matchConditions: Schema.optional(
            Schema.Array(
              Schema.Struct({
                expression: Schema.String,
                name: Schema.String,
              }),
            ),
          ),
          matchPolicy: Schema.optional(Schema.String),
          name: Schema.String,
          namespaceSelector: Schema.optional(
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
          objectSelector: Schema.optional(
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
          rules: Schema.optional(
            Schema.Array(
              Schema.Struct({
                apiGroups: Schema.optional(Schema.Array(Schema.String)),
                apiVersions: Schema.optional(Schema.Array(Schema.String)),
                operations: Schema.optional(Schema.Array(Schema.String)),
                resources: Schema.optional(Schema.Array(Schema.String)),
                scope: Schema.optional(Schema.String),
              }),
            ),
          ),
          sideEffects: Schema.String,
          timeoutSeconds: Schema.optional(Schema.Number),
        }),
      ),
    ),
  });
export type ReplaceAdmissionregistrationV1ValidatingWebhookConfigurationOutput =
  typeof ReplaceAdmissionregistrationV1ValidatingWebhookConfigurationOutput.Type;

// The operation
/**
 * replace the specified ValidatingWebhookConfiguration
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceAdmissionregistrationV1ValidatingWebhookConfiguration =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      ReplaceAdmissionregistrationV1ValidatingWebhookConfigurationInput,
    outputSchema:
      ReplaceAdmissionregistrationV1ValidatingWebhookConfigurationOutput,
  }));
// Input Schema
export const ReplaceAdmissionregistrationV1alpha1MutatingAdmissionPolicyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/admissionregistration.k8s.io/v1alpha1/mutatingadmissionpolicies/{name}",
    }),
  );
export type ReplaceAdmissionregistrationV1alpha1MutatingAdmissionPolicyInput =
  typeof ReplaceAdmissionregistrationV1alpha1MutatingAdmissionPolicyInput.Type;

// Output Schema
export const ReplaceAdmissionregistrationV1alpha1MutatingAdmissionPolicyOutput =
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
        failurePolicy: Schema.optional(Schema.String),
        matchConditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              expression: Schema.String,
              name: Schema.String,
            }),
          ),
        ),
        matchConstraints: Schema.optional(
          Schema.Struct({
            excludeResourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
            matchPolicy: Schema.optional(Schema.String),
            namespaceSelector: Schema.optional(
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
            objectSelector: Schema.optional(
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
            resourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
        ),
        mutations: Schema.optional(
          Schema.Array(
            Schema.Struct({
              applyConfiguration: Schema.optional(
                Schema.Struct({
                  expression: Schema.optional(Schema.String),
                }),
              ),
              jsonPatch: Schema.optional(
                Schema.Struct({
                  expression: Schema.optional(Schema.String),
                }),
              ),
              patchType: Schema.String,
            }),
          ),
        ),
        paramKind: Schema.optional(
          Schema.Struct({
            apiVersion: Schema.optional(Schema.String),
            kind: Schema.optional(Schema.String),
          }),
        ),
        reinvocationPolicy: Schema.optional(Schema.String),
        variables: Schema.optional(
          Schema.Array(
            Schema.Struct({
              expression: Schema.String,
              name: Schema.String,
            }),
          ),
        ),
      }),
    ),
  });
export type ReplaceAdmissionregistrationV1alpha1MutatingAdmissionPolicyOutput =
  typeof ReplaceAdmissionregistrationV1alpha1MutatingAdmissionPolicyOutput.Type;

// The operation
/**
 * replace the specified MutatingAdmissionPolicy
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceAdmissionregistrationV1alpha1MutatingAdmissionPolicy =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      ReplaceAdmissionregistrationV1alpha1MutatingAdmissionPolicyInput,
    outputSchema:
      ReplaceAdmissionregistrationV1alpha1MutatingAdmissionPolicyOutput,
  }));
// Input Schema
export const ReplaceAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/admissionregistration.k8s.io/v1alpha1/mutatingadmissionpolicybindings/{name}",
    }),
  );
export type ReplaceAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingInput =
  typeof ReplaceAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingInput.Type;

// Output Schema
export const ReplaceAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingOutput =
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
        matchResources: Schema.optional(
          Schema.Struct({
            excludeResourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
            matchPolicy: Schema.optional(Schema.String),
            namespaceSelector: Schema.optional(
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
            objectSelector: Schema.optional(
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
            resourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
        ),
        paramRef: Schema.optional(
          Schema.Struct({
            name: Schema.optional(Schema.String),
            namespace: Schema.optional(Schema.String),
            parameterNotFoundAction: Schema.optional(Schema.String),
            selector: Schema.optional(
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
          }),
        ),
        policyName: Schema.optional(Schema.String),
      }),
    ),
  });
export type ReplaceAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingOutput =
  typeof ReplaceAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingOutput.Type;

// The operation
/**
 * replace the specified MutatingAdmissionPolicyBinding
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceAdmissionregistrationV1alpha1MutatingAdmissionPolicyBinding =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      ReplaceAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingInput,
    outputSchema:
      ReplaceAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingOutput,
  }));
// Input Schema
export const ReplaceAdmissionregistrationV1beta1MutatingAdmissionPolicyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/admissionregistration.k8s.io/v1beta1/mutatingadmissionpolicies/{name}",
    }),
  );
export type ReplaceAdmissionregistrationV1beta1MutatingAdmissionPolicyInput =
  typeof ReplaceAdmissionregistrationV1beta1MutatingAdmissionPolicyInput.Type;

// Output Schema
export const ReplaceAdmissionregistrationV1beta1MutatingAdmissionPolicyOutput =
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
        failurePolicy: Schema.optional(Schema.String),
        matchConditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              expression: Schema.String,
              name: Schema.String,
            }),
          ),
        ),
        matchConstraints: Schema.optional(
          Schema.Struct({
            excludeResourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
            matchPolicy: Schema.optional(Schema.String),
            namespaceSelector: Schema.optional(
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
            objectSelector: Schema.optional(
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
            resourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
        ),
        mutations: Schema.optional(
          Schema.Array(
            Schema.Struct({
              applyConfiguration: Schema.optional(
                Schema.Struct({
                  expression: Schema.optional(Schema.String),
                }),
              ),
              jsonPatch: Schema.optional(
                Schema.Struct({
                  expression: Schema.optional(Schema.String),
                }),
              ),
              patchType: Schema.String,
            }),
          ),
        ),
        paramKind: Schema.optional(
          Schema.Struct({
            apiVersion: Schema.optional(Schema.String),
            kind: Schema.optional(Schema.String),
          }),
        ),
        reinvocationPolicy: Schema.optional(Schema.String),
        variables: Schema.optional(
          Schema.Array(
            Schema.Struct({
              expression: Schema.String,
              name: Schema.String,
            }),
          ),
        ),
      }),
    ),
  });
export type ReplaceAdmissionregistrationV1beta1MutatingAdmissionPolicyOutput =
  typeof ReplaceAdmissionregistrationV1beta1MutatingAdmissionPolicyOutput.Type;

// The operation
/**
 * replace the specified MutatingAdmissionPolicy
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceAdmissionregistrationV1beta1MutatingAdmissionPolicy =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      ReplaceAdmissionregistrationV1beta1MutatingAdmissionPolicyInput,
    outputSchema:
      ReplaceAdmissionregistrationV1beta1MutatingAdmissionPolicyOutput,
  }));
// Input Schema
export const ReplaceAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/admissionregistration.k8s.io/v1beta1/mutatingadmissionpolicybindings/{name}",
    }),
  );
export type ReplaceAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingInput =
  typeof ReplaceAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingInput.Type;

// Output Schema
export const ReplaceAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingOutput =
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
        matchResources: Schema.optional(
          Schema.Struct({
            excludeResourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
            matchPolicy: Schema.optional(Schema.String),
            namespaceSelector: Schema.optional(
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
            objectSelector: Schema.optional(
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
            resourceRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  apiGroups: Schema.optional(Schema.Array(Schema.String)),
                  apiVersions: Schema.optional(Schema.Array(Schema.String)),
                  operations: Schema.optional(Schema.Array(Schema.String)),
                  resourceNames: Schema.optional(Schema.Array(Schema.String)),
                  resources: Schema.optional(Schema.Array(Schema.String)),
                  scope: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
        ),
        paramRef: Schema.optional(
          Schema.Struct({
            name: Schema.optional(Schema.String),
            namespace: Schema.optional(Schema.String),
            parameterNotFoundAction: Schema.optional(Schema.String),
            selector: Schema.optional(
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
          }),
        ),
        policyName: Schema.optional(Schema.String),
      }),
    ),
  });
export type ReplaceAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingOutput =
  typeof ReplaceAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingOutput.Type;

// The operation
/**
 * replace the specified MutatingAdmissionPolicyBinding
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceAdmissionregistrationV1beta1MutatingAdmissionPolicyBinding =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      ReplaceAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingInput,
    outputSchema:
      ReplaceAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingOutput,
  }));
// Input Schema
export const WatchAdmissionregistrationV1MutatingAdmissionPolicyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/admissionregistration.k8s.io/v1/watch/mutatingadmissionpolicies/{name}",
    }),
  );
export type WatchAdmissionregistrationV1MutatingAdmissionPolicyInput =
  typeof WatchAdmissionregistrationV1MutatingAdmissionPolicyInput.Type;

// Output Schema
export const WatchAdmissionregistrationV1MutatingAdmissionPolicyOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchAdmissionregistrationV1MutatingAdmissionPolicyOutput =
  typeof WatchAdmissionregistrationV1MutatingAdmissionPolicyOutput.Type;

// The operation
/**
 * watch changes to an object of kind MutatingAdmissionPolicy. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
 */
export const watchAdmissionregistrationV1MutatingAdmissionPolicy =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchAdmissionregistrationV1MutatingAdmissionPolicyInput,
    outputSchema: WatchAdmissionregistrationV1MutatingAdmissionPolicyOutput,
  }));
// Input Schema
export const WatchAdmissionregistrationV1MutatingAdmissionPolicyBindingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/admissionregistration.k8s.io/v1/watch/mutatingadmissionpolicybindings/{name}",
    }),
  );
export type WatchAdmissionregistrationV1MutatingAdmissionPolicyBindingInput =
  typeof WatchAdmissionregistrationV1MutatingAdmissionPolicyBindingInput.Type;

// Output Schema
export const WatchAdmissionregistrationV1MutatingAdmissionPolicyBindingOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchAdmissionregistrationV1MutatingAdmissionPolicyBindingOutput =
  typeof WatchAdmissionregistrationV1MutatingAdmissionPolicyBindingOutput.Type;

// The operation
/**
 * watch changes to an object of kind MutatingAdmissionPolicyBinding. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
 */
export const watchAdmissionregistrationV1MutatingAdmissionPolicyBinding =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      WatchAdmissionregistrationV1MutatingAdmissionPolicyBindingInput,
    outputSchema:
      WatchAdmissionregistrationV1MutatingAdmissionPolicyBindingOutput,
  }));
// Input Schema
export const WatchAdmissionregistrationV1MutatingAdmissionPolicyBindingListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/admissionregistration.k8s.io/v1/watch/mutatingadmissionpolicybindings",
    }),
  );
export type WatchAdmissionregistrationV1MutatingAdmissionPolicyBindingListInput =
  typeof WatchAdmissionregistrationV1MutatingAdmissionPolicyBindingListInput.Type;

// Output Schema
export const WatchAdmissionregistrationV1MutatingAdmissionPolicyBindingListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchAdmissionregistrationV1MutatingAdmissionPolicyBindingListOutput =
  typeof WatchAdmissionregistrationV1MutatingAdmissionPolicyBindingListOutput.Type;

// The operation
/**
 * watch individual changes to a list of MutatingAdmissionPolicyBinding. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchAdmissionregistrationV1MutatingAdmissionPolicyBindingList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      WatchAdmissionregistrationV1MutatingAdmissionPolicyBindingListInput,
    outputSchema:
      WatchAdmissionregistrationV1MutatingAdmissionPolicyBindingListOutput,
  }));
// Input Schema
export const WatchAdmissionregistrationV1MutatingAdmissionPolicyListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/admissionregistration.k8s.io/v1/watch/mutatingadmissionpolicies",
    }),
  );
export type WatchAdmissionregistrationV1MutatingAdmissionPolicyListInput =
  typeof WatchAdmissionregistrationV1MutatingAdmissionPolicyListInput.Type;

// Output Schema
export const WatchAdmissionregistrationV1MutatingAdmissionPolicyListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchAdmissionregistrationV1MutatingAdmissionPolicyListOutput =
  typeof WatchAdmissionregistrationV1MutatingAdmissionPolicyListOutput.Type;

// The operation
/**
 * watch individual changes to a list of MutatingAdmissionPolicy. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchAdmissionregistrationV1MutatingAdmissionPolicyList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchAdmissionregistrationV1MutatingAdmissionPolicyListInput,
    outputSchema: WatchAdmissionregistrationV1MutatingAdmissionPolicyListOutput,
  }));
// Input Schema
export const WatchAdmissionregistrationV1MutatingWebhookConfigurationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/admissionregistration.k8s.io/v1/watch/mutatingwebhookconfigurations/{name}",
    }),
  );
export type WatchAdmissionregistrationV1MutatingWebhookConfigurationInput =
  typeof WatchAdmissionregistrationV1MutatingWebhookConfigurationInput.Type;

// Output Schema
export const WatchAdmissionregistrationV1MutatingWebhookConfigurationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchAdmissionregistrationV1MutatingWebhookConfigurationOutput =
  typeof WatchAdmissionregistrationV1MutatingWebhookConfigurationOutput.Type;

// The operation
/**
 * watch changes to an object of kind MutatingWebhookConfiguration. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
 */
export const watchAdmissionregistrationV1MutatingWebhookConfiguration =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchAdmissionregistrationV1MutatingWebhookConfigurationInput,
    outputSchema:
      WatchAdmissionregistrationV1MutatingWebhookConfigurationOutput,
  }));
// Input Schema
export const WatchAdmissionregistrationV1MutatingWebhookConfigurationListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/admissionregistration.k8s.io/v1/watch/mutatingwebhookconfigurations",
    }),
  );
export type WatchAdmissionregistrationV1MutatingWebhookConfigurationListInput =
  typeof WatchAdmissionregistrationV1MutatingWebhookConfigurationListInput.Type;

// Output Schema
export const WatchAdmissionregistrationV1MutatingWebhookConfigurationListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchAdmissionregistrationV1MutatingWebhookConfigurationListOutput =
  typeof WatchAdmissionregistrationV1MutatingWebhookConfigurationListOutput.Type;

// The operation
/**
 * watch individual changes to a list of MutatingWebhookConfiguration. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchAdmissionregistrationV1MutatingWebhookConfigurationList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      WatchAdmissionregistrationV1MutatingWebhookConfigurationListInput,
    outputSchema:
      WatchAdmissionregistrationV1MutatingWebhookConfigurationListOutput,
  }));
// Input Schema
export const WatchAdmissionregistrationV1ValidatingAdmissionPolicyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/admissionregistration.k8s.io/v1/watch/validatingadmissionpolicies/{name}",
    }),
  );
export type WatchAdmissionregistrationV1ValidatingAdmissionPolicyInput =
  typeof WatchAdmissionregistrationV1ValidatingAdmissionPolicyInput.Type;

// Output Schema
export const WatchAdmissionregistrationV1ValidatingAdmissionPolicyOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchAdmissionregistrationV1ValidatingAdmissionPolicyOutput =
  typeof WatchAdmissionregistrationV1ValidatingAdmissionPolicyOutput.Type;

// The operation
/**
 * watch changes to an object of kind ValidatingAdmissionPolicy. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
 */
export const watchAdmissionregistrationV1ValidatingAdmissionPolicy =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchAdmissionregistrationV1ValidatingAdmissionPolicyInput,
    outputSchema: WatchAdmissionregistrationV1ValidatingAdmissionPolicyOutput,
  }));
// Input Schema
export const WatchAdmissionregistrationV1ValidatingAdmissionPolicyBindingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/admissionregistration.k8s.io/v1/watch/validatingadmissionpolicybindings/{name}",
    }),
  );
export type WatchAdmissionregistrationV1ValidatingAdmissionPolicyBindingInput =
  typeof WatchAdmissionregistrationV1ValidatingAdmissionPolicyBindingInput.Type;

// Output Schema
export const WatchAdmissionregistrationV1ValidatingAdmissionPolicyBindingOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchAdmissionregistrationV1ValidatingAdmissionPolicyBindingOutput =
  typeof WatchAdmissionregistrationV1ValidatingAdmissionPolicyBindingOutput.Type;

// The operation
/**
 * watch changes to an object of kind ValidatingAdmissionPolicyBinding. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
 */
export const watchAdmissionregistrationV1ValidatingAdmissionPolicyBinding =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      WatchAdmissionregistrationV1ValidatingAdmissionPolicyBindingInput,
    outputSchema:
      WatchAdmissionregistrationV1ValidatingAdmissionPolicyBindingOutput,
  }));
// Input Schema
export const WatchAdmissionregistrationV1ValidatingAdmissionPolicyBindingListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/admissionregistration.k8s.io/v1/watch/validatingadmissionpolicybindings",
    }),
  );
export type WatchAdmissionregistrationV1ValidatingAdmissionPolicyBindingListInput =
  typeof WatchAdmissionregistrationV1ValidatingAdmissionPolicyBindingListInput.Type;

// Output Schema
export const WatchAdmissionregistrationV1ValidatingAdmissionPolicyBindingListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchAdmissionregistrationV1ValidatingAdmissionPolicyBindingListOutput =
  typeof WatchAdmissionregistrationV1ValidatingAdmissionPolicyBindingListOutput.Type;

// The operation
/**
 * watch individual changes to a list of ValidatingAdmissionPolicyBinding. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchAdmissionregistrationV1ValidatingAdmissionPolicyBindingList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      WatchAdmissionregistrationV1ValidatingAdmissionPolicyBindingListInput,
    outputSchema:
      WatchAdmissionregistrationV1ValidatingAdmissionPolicyBindingListOutput,
  }));
// Input Schema
export const WatchAdmissionregistrationV1ValidatingAdmissionPolicyListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/admissionregistration.k8s.io/v1/watch/validatingadmissionpolicies",
    }),
  );
export type WatchAdmissionregistrationV1ValidatingAdmissionPolicyListInput =
  typeof WatchAdmissionregistrationV1ValidatingAdmissionPolicyListInput.Type;

// Output Schema
export const WatchAdmissionregistrationV1ValidatingAdmissionPolicyListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchAdmissionregistrationV1ValidatingAdmissionPolicyListOutput =
  typeof WatchAdmissionregistrationV1ValidatingAdmissionPolicyListOutput.Type;

// The operation
/**
 * watch individual changes to a list of ValidatingAdmissionPolicy. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchAdmissionregistrationV1ValidatingAdmissionPolicyList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchAdmissionregistrationV1ValidatingAdmissionPolicyListInput,
    outputSchema:
      WatchAdmissionregistrationV1ValidatingAdmissionPolicyListOutput,
  }));
// Input Schema
export const WatchAdmissionregistrationV1ValidatingWebhookConfigurationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/admissionregistration.k8s.io/v1/watch/validatingwebhookconfigurations/{name}",
    }),
  );
export type WatchAdmissionregistrationV1ValidatingWebhookConfigurationInput =
  typeof WatchAdmissionregistrationV1ValidatingWebhookConfigurationInput.Type;

// Output Schema
export const WatchAdmissionregistrationV1ValidatingWebhookConfigurationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchAdmissionregistrationV1ValidatingWebhookConfigurationOutput =
  typeof WatchAdmissionregistrationV1ValidatingWebhookConfigurationOutput.Type;

// The operation
/**
 * watch changes to an object of kind ValidatingWebhookConfiguration. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
 */
export const watchAdmissionregistrationV1ValidatingWebhookConfiguration =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      WatchAdmissionregistrationV1ValidatingWebhookConfigurationInput,
    outputSchema:
      WatchAdmissionregistrationV1ValidatingWebhookConfigurationOutput,
  }));
// Input Schema
export const WatchAdmissionregistrationV1ValidatingWebhookConfigurationListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/admissionregistration.k8s.io/v1/watch/validatingwebhookconfigurations",
    }),
  );
export type WatchAdmissionregistrationV1ValidatingWebhookConfigurationListInput =
  typeof WatchAdmissionregistrationV1ValidatingWebhookConfigurationListInput.Type;

// Output Schema
export const WatchAdmissionregistrationV1ValidatingWebhookConfigurationListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchAdmissionregistrationV1ValidatingWebhookConfigurationListOutput =
  typeof WatchAdmissionregistrationV1ValidatingWebhookConfigurationListOutput.Type;

// The operation
/**
 * watch individual changes to a list of ValidatingWebhookConfiguration. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchAdmissionregistrationV1ValidatingWebhookConfigurationList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      WatchAdmissionregistrationV1ValidatingWebhookConfigurationListInput,
    outputSchema:
      WatchAdmissionregistrationV1ValidatingWebhookConfigurationListOutput,
  }));
// Input Schema
export const WatchAdmissionregistrationV1alpha1MutatingAdmissionPolicyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/admissionregistration.k8s.io/v1alpha1/watch/mutatingadmissionpolicies/{name}",
    }),
  );
export type WatchAdmissionregistrationV1alpha1MutatingAdmissionPolicyInput =
  typeof WatchAdmissionregistrationV1alpha1MutatingAdmissionPolicyInput.Type;

// Output Schema
export const WatchAdmissionregistrationV1alpha1MutatingAdmissionPolicyOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchAdmissionregistrationV1alpha1MutatingAdmissionPolicyOutput =
  typeof WatchAdmissionregistrationV1alpha1MutatingAdmissionPolicyOutput.Type;

// The operation
/**
 * watch changes to an object of kind MutatingAdmissionPolicy. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
 */
export const watchAdmissionregistrationV1alpha1MutatingAdmissionPolicy =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchAdmissionregistrationV1alpha1MutatingAdmissionPolicyInput,
    outputSchema:
      WatchAdmissionregistrationV1alpha1MutatingAdmissionPolicyOutput,
  }));
// Input Schema
export const WatchAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/admissionregistration.k8s.io/v1alpha1/watch/mutatingadmissionpolicybindings/{name}",
    }),
  );
export type WatchAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingInput =
  typeof WatchAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingInput.Type;

// Output Schema
export const WatchAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingOutput =
  typeof WatchAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingOutput.Type;

// The operation
/**
 * watch changes to an object of kind MutatingAdmissionPolicyBinding. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
 */
export const watchAdmissionregistrationV1alpha1MutatingAdmissionPolicyBinding =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      WatchAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingInput,
    outputSchema:
      WatchAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingOutput,
  }));
// Input Schema
export const WatchAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/admissionregistration.k8s.io/v1alpha1/watch/mutatingadmissionpolicybindings",
    }),
  );
export type WatchAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingListInput =
  typeof WatchAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingListInput.Type;

// Output Schema
export const WatchAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingListOutput =
  typeof WatchAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingListOutput.Type;

// The operation
/**
 * watch individual changes to a list of MutatingAdmissionPolicyBinding. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      WatchAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingListInput,
    outputSchema:
      WatchAdmissionregistrationV1alpha1MutatingAdmissionPolicyBindingListOutput,
  }));
// Input Schema
export const WatchAdmissionregistrationV1alpha1MutatingAdmissionPolicyListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/admissionregistration.k8s.io/v1alpha1/watch/mutatingadmissionpolicies",
    }),
  );
export type WatchAdmissionregistrationV1alpha1MutatingAdmissionPolicyListInput =
  typeof WatchAdmissionregistrationV1alpha1MutatingAdmissionPolicyListInput.Type;

// Output Schema
export const WatchAdmissionregistrationV1alpha1MutatingAdmissionPolicyListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchAdmissionregistrationV1alpha1MutatingAdmissionPolicyListOutput =
  typeof WatchAdmissionregistrationV1alpha1MutatingAdmissionPolicyListOutput.Type;

// The operation
/**
 * watch individual changes to a list of MutatingAdmissionPolicy. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchAdmissionregistrationV1alpha1MutatingAdmissionPolicyList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      WatchAdmissionregistrationV1alpha1MutatingAdmissionPolicyListInput,
    outputSchema:
      WatchAdmissionregistrationV1alpha1MutatingAdmissionPolicyListOutput,
  }));
// Input Schema
export const WatchAdmissionregistrationV1beta1MutatingAdmissionPolicyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/admissionregistration.k8s.io/v1beta1/watch/mutatingadmissionpolicies/{name}",
    }),
  );
export type WatchAdmissionregistrationV1beta1MutatingAdmissionPolicyInput =
  typeof WatchAdmissionregistrationV1beta1MutatingAdmissionPolicyInput.Type;

// Output Schema
export const WatchAdmissionregistrationV1beta1MutatingAdmissionPolicyOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchAdmissionregistrationV1beta1MutatingAdmissionPolicyOutput =
  typeof WatchAdmissionregistrationV1beta1MutatingAdmissionPolicyOutput.Type;

// The operation
/**
 * watch changes to an object of kind MutatingAdmissionPolicy. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
 */
export const watchAdmissionregistrationV1beta1MutatingAdmissionPolicy =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchAdmissionregistrationV1beta1MutatingAdmissionPolicyInput,
    outputSchema:
      WatchAdmissionregistrationV1beta1MutatingAdmissionPolicyOutput,
  }));
// Input Schema
export const WatchAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/admissionregistration.k8s.io/v1beta1/watch/mutatingadmissionpolicybindings/{name}",
    }),
  );
export type WatchAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingInput =
  typeof WatchAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingInput.Type;

// Output Schema
export const WatchAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingOutput =
  typeof WatchAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingOutput.Type;

// The operation
/**
 * watch changes to an object of kind MutatingAdmissionPolicyBinding. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
 */
export const watchAdmissionregistrationV1beta1MutatingAdmissionPolicyBinding =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      WatchAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingInput,
    outputSchema:
      WatchAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingOutput,
  }));
// Input Schema
export const WatchAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/admissionregistration.k8s.io/v1beta1/watch/mutatingadmissionpolicybindings",
    }),
  );
export type WatchAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingListInput =
  typeof WatchAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingListInput.Type;

// Output Schema
export const WatchAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingListOutput =
  typeof WatchAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingListOutput.Type;

// The operation
/**
 * watch individual changes to a list of MutatingAdmissionPolicyBinding. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      WatchAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingListInput,
    outputSchema:
      WatchAdmissionregistrationV1beta1MutatingAdmissionPolicyBindingListOutput,
  }));
// Input Schema
export const WatchAdmissionregistrationV1beta1MutatingAdmissionPolicyListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/admissionregistration.k8s.io/v1beta1/watch/mutatingadmissionpolicies",
    }),
  );
export type WatchAdmissionregistrationV1beta1MutatingAdmissionPolicyListInput =
  typeof WatchAdmissionregistrationV1beta1MutatingAdmissionPolicyListInput.Type;

// Output Schema
export const WatchAdmissionregistrationV1beta1MutatingAdmissionPolicyListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchAdmissionregistrationV1beta1MutatingAdmissionPolicyListOutput =
  typeof WatchAdmissionregistrationV1beta1MutatingAdmissionPolicyListOutput.Type;

// The operation
/**
 * watch individual changes to a list of MutatingAdmissionPolicy. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchAdmissionregistrationV1beta1MutatingAdmissionPolicyList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      WatchAdmissionregistrationV1beta1MutatingAdmissionPolicyListInput,
    outputSchema:
      WatchAdmissionregistrationV1beta1MutatingAdmissionPolicyListOutput,
  }));
