/**
 * Kubernetes Networking API
 *
 * Generated from the Kubernetes OpenAPI spec.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";

// Input Schema
export const CreateNetworkingV1IPAddressInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({ method: "POST", path: "/apis/networking.k8s.io/v1/ipaddresses" }),
  );
export type CreateNetworkingV1IPAddressInput =
  typeof CreateNetworkingV1IPAddressInput.Type;

// Output Schema
export const CreateNetworkingV1IPAddressOutput =
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
      parentRef: Schema.Struct({
        group: Schema.optional(Schema.String),
        name: Schema.String,
        namespace: Schema.optional(Schema.String),
        resource: Schema.String,
      }),
    }),
  });
export type CreateNetworkingV1IPAddressOutput =
  typeof CreateNetworkingV1IPAddressOutput.Type;

// The operation
/**
 * create an IPAddress
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const createNetworkingV1IPAddress = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CreateNetworkingV1IPAddressInput,
    outputSchema: CreateNetworkingV1IPAddressOutput,
  }),
);
// Input Schema
export const CreateNetworkingV1IngressClassInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/apis/networking.k8s.io/v1/ingressclasses",
    }),
  );
export type CreateNetworkingV1IngressClassInput =
  typeof CreateNetworkingV1IngressClassInput.Type;

// Output Schema
export const CreateNetworkingV1IngressClassOutput =
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
        controller: Schema.optional(Schema.String),
        parameters: Schema.optional(
          Schema.Struct({
            apiGroup: Schema.optional(Schema.String),
            kind: Schema.String,
            name: Schema.String,
            namespace: Schema.optional(Schema.String),
            scope: Schema.optional(Schema.String),
          }),
        ),
      }),
    ),
  });
export type CreateNetworkingV1IngressClassOutput =
  typeof CreateNetworkingV1IngressClassOutput.Type;

// The operation
/**
 * create an IngressClass
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const createNetworkingV1IngressClass =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateNetworkingV1IngressClassInput,
    outputSchema: CreateNetworkingV1IngressClassOutput,
  }));
// Input Schema
export const CreateNetworkingV1NamespacedIngressInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/apis/networking.k8s.io/v1/namespaces/{namespace}/ingresses",
    }),
  );
export type CreateNetworkingV1NamespacedIngressInput =
  typeof CreateNetworkingV1NamespacedIngressInput.Type;

// Output Schema
export const CreateNetworkingV1NamespacedIngressOutput =
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
        defaultBackend: Schema.optional(
          Schema.Struct({
            resource: Schema.optional(
              Schema.Struct({
                apiGroup: Schema.optional(Schema.String),
                kind: Schema.String,
                name: Schema.String,
              }),
            ),
            service: Schema.optional(
              Schema.Struct({
                name: Schema.String,
                port: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    number: Schema.optional(Schema.Number),
                  }),
                ),
              }),
            ),
          }),
        ),
        ingressClassName: Schema.optional(Schema.String),
        rules: Schema.optional(
          Schema.Array(
            Schema.Struct({
              host: Schema.optional(Schema.String),
              http: Schema.optional(
                Schema.Struct({
                  paths: Schema.Array(
                    Schema.Struct({
                      backend: Schema.Struct({
                        resource: Schema.optional(
                          Schema.Struct({
                            apiGroup: Schema.optional(Schema.String),
                            kind: Schema.String,
                            name: Schema.String,
                          }),
                        ),
                        service: Schema.optional(
                          Schema.Struct({
                            name: Schema.String,
                            port: Schema.optional(
                              Schema.Struct({
                                name: Schema.optional(Schema.String),
                                number: Schema.optional(Schema.Number),
                              }),
                            ),
                          }),
                        ),
                      }),
                      path: Schema.optional(Schema.String),
                      pathType: Schema.String,
                    }),
                  ),
                }),
              ),
            }),
          ),
        ),
        tls: Schema.optional(
          Schema.Array(
            Schema.Struct({
              hosts: Schema.optional(Schema.Array(Schema.String)),
              secretName: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
    status: Schema.optional(
      Schema.Struct({
        loadBalancer: Schema.optional(
          Schema.Struct({
            ingress: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  hostname: Schema.optional(Schema.String),
                  ip: Schema.optional(Schema.String),
                  ports: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        error: Schema.optional(Schema.String),
                        port: Schema.Number,
                        protocol: Schema.String,
                      }),
                    ),
                  ),
                }),
              ),
            ),
          }),
        ),
      }),
    ),
  });
export type CreateNetworkingV1NamespacedIngressOutput =
  typeof CreateNetworkingV1NamespacedIngressOutput.Type;

// The operation
/**
 * create an Ingress
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const createNetworkingV1NamespacedIngress =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateNetworkingV1NamespacedIngressInput,
    outputSchema: CreateNetworkingV1NamespacedIngressOutput,
  }));
// Input Schema
export const CreateNetworkingV1NamespacedNetworkPolicyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/apis/networking.k8s.io/v1/namespaces/{namespace}/networkpolicies",
    }),
  );
export type CreateNetworkingV1NamespacedNetworkPolicyInput =
  typeof CreateNetworkingV1NamespacedNetworkPolicyInput.Type;

// Output Schema
export const CreateNetworkingV1NamespacedNetworkPolicyOutput =
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
        egress: Schema.optional(
          Schema.Array(
            Schema.Struct({
              ports: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    endPort: Schema.optional(Schema.Number),
                    port: Schema.optional(Schema.String),
                    protocol: Schema.optional(Schema.String),
                  }),
                ),
              ),
              to: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    ipBlock: Schema.optional(
                      Schema.Struct({
                        cidr: Schema.String,
                        except: Schema.optional(Schema.Array(Schema.String)),
                      }),
                    ),
                    namespaceSelector: Schema.optional(
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
                    podSelector: Schema.optional(
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
                ),
              ),
            }),
          ),
        ),
        ingress: Schema.optional(
          Schema.Array(
            Schema.Struct({
              from: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    ipBlock: Schema.optional(
                      Schema.Struct({
                        cidr: Schema.String,
                        except: Schema.optional(Schema.Array(Schema.String)),
                      }),
                    ),
                    namespaceSelector: Schema.optional(
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
                    podSelector: Schema.optional(
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
                ),
              ),
              ports: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    endPort: Schema.optional(Schema.Number),
                    port: Schema.optional(Schema.String),
                    protocol: Schema.optional(Schema.String),
                  }),
                ),
              ),
            }),
          ),
        ),
        podSelector: Schema.optional(
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
        policyTypes: Schema.optional(Schema.Array(Schema.String)),
      }),
    ),
  });
export type CreateNetworkingV1NamespacedNetworkPolicyOutput =
  typeof CreateNetworkingV1NamespacedNetworkPolicyOutput.Type;

// The operation
/**
 * create a NetworkPolicy
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const createNetworkingV1NamespacedNetworkPolicy =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateNetworkingV1NamespacedNetworkPolicyInput,
    outputSchema: CreateNetworkingV1NamespacedNetworkPolicyOutput,
  }));
// Input Schema
export const CreateNetworkingV1ServiceCIDRInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({ method: "POST", path: "/apis/networking.k8s.io/v1/servicecidrs" }),
  );
export type CreateNetworkingV1ServiceCIDRInput =
  typeof CreateNetworkingV1ServiceCIDRInput.Type;

// Output Schema
export const CreateNetworkingV1ServiceCIDROutput =
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
        cidrs: Schema.optional(Schema.Array(Schema.String)),
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
      }),
    ),
  });
export type CreateNetworkingV1ServiceCIDROutput =
  typeof CreateNetworkingV1ServiceCIDROutput.Type;

// The operation
/**
 * create a ServiceCIDR
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const createNetworkingV1ServiceCIDR =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateNetworkingV1ServiceCIDRInput,
    outputSchema: CreateNetworkingV1ServiceCIDROutput,
  }));
// Input Schema
export const CreateNetworkingV1beta1IPAddressInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/apis/networking.k8s.io/v1beta1/ipaddresses",
    }),
  );
export type CreateNetworkingV1beta1IPAddressInput =
  typeof CreateNetworkingV1beta1IPAddressInput.Type;

// Output Schema
export const CreateNetworkingV1beta1IPAddressOutput =
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
      parentRef: Schema.Struct({
        group: Schema.optional(Schema.String),
        name: Schema.String,
        namespace: Schema.optional(Schema.String),
        resource: Schema.String,
      }),
    }),
  });
export type CreateNetworkingV1beta1IPAddressOutput =
  typeof CreateNetworkingV1beta1IPAddressOutput.Type;

// The operation
/**
 * create an IPAddress
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const createNetworkingV1beta1IPAddress =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateNetworkingV1beta1IPAddressInput,
    outputSchema: CreateNetworkingV1beta1IPAddressOutput,
  }));
// Input Schema
export const CreateNetworkingV1beta1ServiceCIDRInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/apis/networking.k8s.io/v1beta1/servicecidrs",
    }),
  );
export type CreateNetworkingV1beta1ServiceCIDRInput =
  typeof CreateNetworkingV1beta1ServiceCIDRInput.Type;

// Output Schema
export const CreateNetworkingV1beta1ServiceCIDROutput =
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
        cidrs: Schema.optional(Schema.Array(Schema.String)),
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
      }),
    ),
  });
export type CreateNetworkingV1beta1ServiceCIDROutput =
  typeof CreateNetworkingV1beta1ServiceCIDROutput.Type;

// The operation
/**
 * create a ServiceCIDR
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const createNetworkingV1beta1ServiceCIDR =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateNetworkingV1beta1ServiceCIDRInput,
    outputSchema: CreateNetworkingV1beta1ServiceCIDROutput,
  }));
// Input Schema
export const DeleteNetworkingV1CollectionIPAddressInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/networking.k8s.io/v1/ipaddresses",
    }),
  );
export type DeleteNetworkingV1CollectionIPAddressInput =
  typeof DeleteNetworkingV1CollectionIPAddressInput.Type;

// Output Schema
export const DeleteNetworkingV1CollectionIPAddressOutput =
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
export type DeleteNetworkingV1CollectionIPAddressOutput =
  typeof DeleteNetworkingV1CollectionIPAddressOutput.Type;

// The operation
/**
 * delete collection of IPAddress
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteNetworkingV1CollectionIPAddress =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteNetworkingV1CollectionIPAddressInput,
    outputSchema: DeleteNetworkingV1CollectionIPAddressOutput,
  }));
// Input Schema
export const DeleteNetworkingV1CollectionIngressClassInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/networking.k8s.io/v1/ingressclasses",
    }),
  );
export type DeleteNetworkingV1CollectionIngressClassInput =
  typeof DeleteNetworkingV1CollectionIngressClassInput.Type;

// Output Schema
export const DeleteNetworkingV1CollectionIngressClassOutput =
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
export type DeleteNetworkingV1CollectionIngressClassOutput =
  typeof DeleteNetworkingV1CollectionIngressClassOutput.Type;

// The operation
/**
 * delete collection of IngressClass
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteNetworkingV1CollectionIngressClass =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteNetworkingV1CollectionIngressClassInput,
    outputSchema: DeleteNetworkingV1CollectionIngressClassOutput,
  }));
// Input Schema
export const DeleteNetworkingV1CollectionNamespacedIngressInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/networking.k8s.io/v1/namespaces/{namespace}/ingresses",
    }),
  );
export type DeleteNetworkingV1CollectionNamespacedIngressInput =
  typeof DeleteNetworkingV1CollectionNamespacedIngressInput.Type;

// Output Schema
export const DeleteNetworkingV1CollectionNamespacedIngressOutput =
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
export type DeleteNetworkingV1CollectionNamespacedIngressOutput =
  typeof DeleteNetworkingV1CollectionNamespacedIngressOutput.Type;

// The operation
/**
 * delete collection of Ingress
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteNetworkingV1CollectionNamespacedIngress =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteNetworkingV1CollectionNamespacedIngressInput,
    outputSchema: DeleteNetworkingV1CollectionNamespacedIngressOutput,
  }));
// Input Schema
export const DeleteNetworkingV1CollectionNamespacedNetworkPolicyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/networking.k8s.io/v1/namespaces/{namespace}/networkpolicies",
    }),
  );
export type DeleteNetworkingV1CollectionNamespacedNetworkPolicyInput =
  typeof DeleteNetworkingV1CollectionNamespacedNetworkPolicyInput.Type;

// Output Schema
export const DeleteNetworkingV1CollectionNamespacedNetworkPolicyOutput =
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
export type DeleteNetworkingV1CollectionNamespacedNetworkPolicyOutput =
  typeof DeleteNetworkingV1CollectionNamespacedNetworkPolicyOutput.Type;

// The operation
/**
 * delete collection of NetworkPolicy
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteNetworkingV1CollectionNamespacedNetworkPolicy =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteNetworkingV1CollectionNamespacedNetworkPolicyInput,
    outputSchema: DeleteNetworkingV1CollectionNamespacedNetworkPolicyOutput,
  }));
// Input Schema
export const DeleteNetworkingV1CollectionServiceCIDRInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/networking.k8s.io/v1/servicecidrs",
    }),
  );
export type DeleteNetworkingV1CollectionServiceCIDRInput =
  typeof DeleteNetworkingV1CollectionServiceCIDRInput.Type;

// Output Schema
export const DeleteNetworkingV1CollectionServiceCIDROutput =
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
export type DeleteNetworkingV1CollectionServiceCIDROutput =
  typeof DeleteNetworkingV1CollectionServiceCIDROutput.Type;

// The operation
/**
 * delete collection of ServiceCIDR
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteNetworkingV1CollectionServiceCIDR =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteNetworkingV1CollectionServiceCIDRInput,
    outputSchema: DeleteNetworkingV1CollectionServiceCIDROutput,
  }));
// Input Schema
export const DeleteNetworkingV1IPAddressInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/networking.k8s.io/v1/ipaddresses/{name}",
    }),
  );
export type DeleteNetworkingV1IPAddressInput =
  typeof DeleteNetworkingV1IPAddressInput.Type;

// Output Schema
export const DeleteNetworkingV1IPAddressOutput =
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
export type DeleteNetworkingV1IPAddressOutput =
  typeof DeleteNetworkingV1IPAddressOutput.Type;

// The operation
/**
 * delete an IPAddress
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteNetworkingV1IPAddress = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeleteNetworkingV1IPAddressInput,
    outputSchema: DeleteNetworkingV1IPAddressOutput,
  }),
);
// Input Schema
export const DeleteNetworkingV1IngressClassInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/networking.k8s.io/v1/ingressclasses/{name}",
    }),
  );
export type DeleteNetworkingV1IngressClassInput =
  typeof DeleteNetworkingV1IngressClassInput.Type;

// Output Schema
export const DeleteNetworkingV1IngressClassOutput =
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
export type DeleteNetworkingV1IngressClassOutput =
  typeof DeleteNetworkingV1IngressClassOutput.Type;

// The operation
/**
 * delete an IngressClass
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteNetworkingV1IngressClass =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteNetworkingV1IngressClassInput,
    outputSchema: DeleteNetworkingV1IngressClassOutput,
  }));
// Input Schema
export const DeleteNetworkingV1NamespacedIngressInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/networking.k8s.io/v1/namespaces/{namespace}/ingresses/{name}",
    }),
  );
export type DeleteNetworkingV1NamespacedIngressInput =
  typeof DeleteNetworkingV1NamespacedIngressInput.Type;

// Output Schema
export const DeleteNetworkingV1NamespacedIngressOutput =
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
export type DeleteNetworkingV1NamespacedIngressOutput =
  typeof DeleteNetworkingV1NamespacedIngressOutput.Type;

// The operation
/**
 * delete an Ingress
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteNetworkingV1NamespacedIngress =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteNetworkingV1NamespacedIngressInput,
    outputSchema: DeleteNetworkingV1NamespacedIngressOutput,
  }));
// Input Schema
export const DeleteNetworkingV1NamespacedNetworkPolicyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/networking.k8s.io/v1/namespaces/{namespace}/networkpolicies/{name}",
    }),
  );
export type DeleteNetworkingV1NamespacedNetworkPolicyInput =
  typeof DeleteNetworkingV1NamespacedNetworkPolicyInput.Type;

// Output Schema
export const DeleteNetworkingV1NamespacedNetworkPolicyOutput =
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
export type DeleteNetworkingV1NamespacedNetworkPolicyOutput =
  typeof DeleteNetworkingV1NamespacedNetworkPolicyOutput.Type;

// The operation
/**
 * delete a NetworkPolicy
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteNetworkingV1NamespacedNetworkPolicy =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteNetworkingV1NamespacedNetworkPolicyInput,
    outputSchema: DeleteNetworkingV1NamespacedNetworkPolicyOutput,
  }));
// Input Schema
export const DeleteNetworkingV1ServiceCIDRInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/networking.k8s.io/v1/servicecidrs/{name}",
    }),
  );
export type DeleteNetworkingV1ServiceCIDRInput =
  typeof DeleteNetworkingV1ServiceCIDRInput.Type;

// Output Schema
export const DeleteNetworkingV1ServiceCIDROutput =
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
export type DeleteNetworkingV1ServiceCIDROutput =
  typeof DeleteNetworkingV1ServiceCIDROutput.Type;

// The operation
/**
 * delete a ServiceCIDR
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteNetworkingV1ServiceCIDR =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteNetworkingV1ServiceCIDRInput,
    outputSchema: DeleteNetworkingV1ServiceCIDROutput,
  }));
// Input Schema
export const DeleteNetworkingV1beta1CollectionIPAddressInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/networking.k8s.io/v1beta1/ipaddresses",
    }),
  );
export type DeleteNetworkingV1beta1CollectionIPAddressInput =
  typeof DeleteNetworkingV1beta1CollectionIPAddressInput.Type;

// Output Schema
export const DeleteNetworkingV1beta1CollectionIPAddressOutput =
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
export type DeleteNetworkingV1beta1CollectionIPAddressOutput =
  typeof DeleteNetworkingV1beta1CollectionIPAddressOutput.Type;

// The operation
/**
 * delete collection of IPAddress
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteNetworkingV1beta1CollectionIPAddress =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteNetworkingV1beta1CollectionIPAddressInput,
    outputSchema: DeleteNetworkingV1beta1CollectionIPAddressOutput,
  }));
// Input Schema
export const DeleteNetworkingV1beta1CollectionServiceCIDRInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/networking.k8s.io/v1beta1/servicecidrs",
    }),
  );
export type DeleteNetworkingV1beta1CollectionServiceCIDRInput =
  typeof DeleteNetworkingV1beta1CollectionServiceCIDRInput.Type;

// Output Schema
export const DeleteNetworkingV1beta1CollectionServiceCIDROutput =
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
export type DeleteNetworkingV1beta1CollectionServiceCIDROutput =
  typeof DeleteNetworkingV1beta1CollectionServiceCIDROutput.Type;

// The operation
/**
 * delete collection of ServiceCIDR
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteNetworkingV1beta1CollectionServiceCIDR =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteNetworkingV1beta1CollectionServiceCIDRInput,
    outputSchema: DeleteNetworkingV1beta1CollectionServiceCIDROutput,
  }));
// Input Schema
export const DeleteNetworkingV1beta1IPAddressInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/networking.k8s.io/v1beta1/ipaddresses/{name}",
    }),
  );
export type DeleteNetworkingV1beta1IPAddressInput =
  typeof DeleteNetworkingV1beta1IPAddressInput.Type;

// Output Schema
export const DeleteNetworkingV1beta1IPAddressOutput =
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
export type DeleteNetworkingV1beta1IPAddressOutput =
  typeof DeleteNetworkingV1beta1IPAddressOutput.Type;

// The operation
/**
 * delete an IPAddress
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteNetworkingV1beta1IPAddress =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteNetworkingV1beta1IPAddressInput,
    outputSchema: DeleteNetworkingV1beta1IPAddressOutput,
  }));
// Input Schema
export const DeleteNetworkingV1beta1ServiceCIDRInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apis/networking.k8s.io/v1beta1/servicecidrs/{name}",
    }),
  );
export type DeleteNetworkingV1beta1ServiceCIDRInput =
  typeof DeleteNetworkingV1beta1ServiceCIDRInput.Type;

// Output Schema
export const DeleteNetworkingV1beta1ServiceCIDROutput =
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
export type DeleteNetworkingV1beta1ServiceCIDROutput =
  typeof DeleteNetworkingV1beta1ServiceCIDROutput.Type;

// The operation
/**
 * delete a ServiceCIDR
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 */
export const deleteNetworkingV1beta1ServiceCIDR =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteNetworkingV1beta1ServiceCIDRInput,
    outputSchema: DeleteNetworkingV1beta1ServiceCIDROutput,
  }));
// Input Schema
export const GetNetworkingAPIGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/apis/networking.k8s.io/" }),
  );
export type GetNetworkingAPIGroupInput = typeof GetNetworkingAPIGroupInput.Type;

// Output Schema
export const GetNetworkingAPIGroupOutput =
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
export type GetNetworkingAPIGroupOutput =
  typeof GetNetworkingAPIGroupOutput.Type;

// The operation
/**
 * get information of a group
 */
export const getNetworkingAPIGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetNetworkingAPIGroupInput,
    outputSchema: GetNetworkingAPIGroupOutput,
  }),
);
// Input Schema
export const GetNetworkingV1APIResourcesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/apis/networking.k8s.io/v1/" }),
  );
export type GetNetworkingV1APIResourcesInput =
  typeof GetNetworkingV1APIResourcesInput.Type;

// Output Schema
export const GetNetworkingV1APIResourcesOutput =
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
export type GetNetworkingV1APIResourcesOutput =
  typeof GetNetworkingV1APIResourcesOutput.Type;

// The operation
/**
 * get available resources
 */
export const getNetworkingV1APIResources = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetNetworkingV1APIResourcesInput,
    outputSchema: GetNetworkingV1APIResourcesOutput,
  }),
);
// Input Schema
export const GetNetworkingV1beta1APIResourcesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/apis/networking.k8s.io/v1beta1/" }),
  );
export type GetNetworkingV1beta1APIResourcesInput =
  typeof GetNetworkingV1beta1APIResourcesInput.Type;

// Output Schema
export const GetNetworkingV1beta1APIResourcesOutput =
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
export type GetNetworkingV1beta1APIResourcesOutput =
  typeof GetNetworkingV1beta1APIResourcesOutput.Type;

// The operation
/**
 * get available resources
 */
export const getNetworkingV1beta1APIResources =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetNetworkingV1beta1APIResourcesInput,
    outputSchema: GetNetworkingV1beta1APIResourcesOutput,
  }));
// Input Schema
export const ListNetworkingV1IPAddressInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/apis/networking.k8s.io/v1/ipaddresses" }),
  );
export type ListNetworkingV1IPAddressInput =
  typeof ListNetworkingV1IPAddressInput.Type;

// Output Schema
export const ListNetworkingV1IPAddressOutput =
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
          parentRef: Schema.Struct({
            group: Schema.optional(Schema.String),
            name: Schema.String,
            namespace: Schema.optional(Schema.String),
            resource: Schema.String,
          }),
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
export type ListNetworkingV1IPAddressOutput =
  typeof ListNetworkingV1IPAddressOutput.Type;

// The operation
/**
 * list or watch objects of kind IPAddress
 */
export const listNetworkingV1IPAddress = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ListNetworkingV1IPAddressInput,
    outputSchema: ListNetworkingV1IPAddressOutput,
  }),
);
// Input Schema
export const ListNetworkingV1IngressClassInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/networking.k8s.io/v1/ingressclasses",
    }),
  );
export type ListNetworkingV1IngressClassInput =
  typeof ListNetworkingV1IngressClassInput.Type;

// Output Schema
export const ListNetworkingV1IngressClassOutput =
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
            controller: Schema.optional(Schema.String),
            parameters: Schema.optional(
              Schema.Struct({
                apiGroup: Schema.optional(Schema.String),
                kind: Schema.String,
                name: Schema.String,
                namespace: Schema.optional(Schema.String),
                scope: Schema.optional(Schema.String),
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
export type ListNetworkingV1IngressClassOutput =
  typeof ListNetworkingV1IngressClassOutput.Type;

// The operation
/**
 * list or watch objects of kind IngressClass
 */
export const listNetworkingV1IngressClass =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListNetworkingV1IngressClassInput,
    outputSchema: ListNetworkingV1IngressClassOutput,
  }));
// Input Schema
export const ListNetworkingV1IngressForAllNamespacesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/apis/networking.k8s.io/v1/ingresses" }),
  );
export type ListNetworkingV1IngressForAllNamespacesInput =
  typeof ListNetworkingV1IngressForAllNamespacesInput.Type;

// Output Schema
export const ListNetworkingV1IngressForAllNamespacesOutput =
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
            defaultBackend: Schema.optional(
              Schema.Struct({
                resource: Schema.optional(
                  Schema.Struct({
                    apiGroup: Schema.optional(Schema.String),
                    kind: Schema.String,
                    name: Schema.String,
                  }),
                ),
                service: Schema.optional(
                  Schema.Struct({
                    name: Schema.String,
                    port: Schema.optional(
                      Schema.Struct({
                        name: Schema.optional(Schema.String),
                        number: Schema.optional(Schema.Number),
                      }),
                    ),
                  }),
                ),
              }),
            ),
            ingressClassName: Schema.optional(Schema.String),
            rules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  host: Schema.optional(Schema.String),
                  http: Schema.optional(
                    Schema.Struct({
                      paths: Schema.Array(
                        Schema.Struct({
                          backend: Schema.Struct({
                            resource: Schema.optional(
                              Schema.Struct({
                                apiGroup: Schema.optional(Schema.String),
                                kind: Schema.String,
                                name: Schema.String,
                              }),
                            ),
                            service: Schema.optional(
                              Schema.Struct({
                                name: Schema.String,
                                port: Schema.optional(
                                  Schema.Struct({
                                    name: Schema.optional(Schema.String),
                                    number: Schema.optional(Schema.Number),
                                  }),
                                ),
                              }),
                            ),
                          }),
                          path: Schema.optional(Schema.String),
                          pathType: Schema.String,
                        }),
                      ),
                    }),
                  ),
                }),
              ),
            ),
            tls: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  hosts: Schema.optional(Schema.Array(Schema.String)),
                  secretName: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
        ),
        status: Schema.optional(
          Schema.Struct({
            loadBalancer: Schema.optional(
              Schema.Struct({
                ingress: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      hostname: Schema.optional(Schema.String),
                      ip: Schema.optional(Schema.String),
                      ports: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            error: Schema.optional(Schema.String),
                            port: Schema.Number,
                            protocol: Schema.String,
                          }),
                        ),
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
export type ListNetworkingV1IngressForAllNamespacesOutput =
  typeof ListNetworkingV1IngressForAllNamespacesOutput.Type;

// The operation
/**
 * list or watch objects of kind Ingress
 */
export const listNetworkingV1IngressForAllNamespaces =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListNetworkingV1IngressForAllNamespacesInput,
    outputSchema: ListNetworkingV1IngressForAllNamespacesOutput,
  }));
// Input Schema
export const ListNetworkingV1NamespacedIngressInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/networking.k8s.io/v1/namespaces/{namespace}/ingresses",
    }),
  );
export type ListNetworkingV1NamespacedIngressInput =
  typeof ListNetworkingV1NamespacedIngressInput.Type;

// Output Schema
export const ListNetworkingV1NamespacedIngressOutput =
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
            defaultBackend: Schema.optional(
              Schema.Struct({
                resource: Schema.optional(
                  Schema.Struct({
                    apiGroup: Schema.optional(Schema.String),
                    kind: Schema.String,
                    name: Schema.String,
                  }),
                ),
                service: Schema.optional(
                  Schema.Struct({
                    name: Schema.String,
                    port: Schema.optional(
                      Schema.Struct({
                        name: Schema.optional(Schema.String),
                        number: Schema.optional(Schema.Number),
                      }),
                    ),
                  }),
                ),
              }),
            ),
            ingressClassName: Schema.optional(Schema.String),
            rules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  host: Schema.optional(Schema.String),
                  http: Schema.optional(
                    Schema.Struct({
                      paths: Schema.Array(
                        Schema.Struct({
                          backend: Schema.Struct({
                            resource: Schema.optional(
                              Schema.Struct({
                                apiGroup: Schema.optional(Schema.String),
                                kind: Schema.String,
                                name: Schema.String,
                              }),
                            ),
                            service: Schema.optional(
                              Schema.Struct({
                                name: Schema.String,
                                port: Schema.optional(
                                  Schema.Struct({
                                    name: Schema.optional(Schema.String),
                                    number: Schema.optional(Schema.Number),
                                  }),
                                ),
                              }),
                            ),
                          }),
                          path: Schema.optional(Schema.String),
                          pathType: Schema.String,
                        }),
                      ),
                    }),
                  ),
                }),
              ),
            ),
            tls: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  hosts: Schema.optional(Schema.Array(Schema.String)),
                  secretName: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
        ),
        status: Schema.optional(
          Schema.Struct({
            loadBalancer: Schema.optional(
              Schema.Struct({
                ingress: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      hostname: Schema.optional(Schema.String),
                      ip: Schema.optional(Schema.String),
                      ports: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            error: Schema.optional(Schema.String),
                            port: Schema.Number,
                            protocol: Schema.String,
                          }),
                        ),
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
export type ListNetworkingV1NamespacedIngressOutput =
  typeof ListNetworkingV1NamespacedIngressOutput.Type;

// The operation
/**
 * list or watch objects of kind Ingress
 */
export const listNetworkingV1NamespacedIngress =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListNetworkingV1NamespacedIngressInput,
    outputSchema: ListNetworkingV1NamespacedIngressOutput,
  }));
// Input Schema
export const ListNetworkingV1NamespacedNetworkPolicyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/networking.k8s.io/v1/namespaces/{namespace}/networkpolicies",
    }),
  );
export type ListNetworkingV1NamespacedNetworkPolicyInput =
  typeof ListNetworkingV1NamespacedNetworkPolicyInput.Type;

// Output Schema
export const ListNetworkingV1NamespacedNetworkPolicyOutput =
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
            egress: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  ports: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        endPort: Schema.optional(Schema.Number),
                        port: Schema.optional(Schema.String),
                        protocol: Schema.optional(Schema.String),
                      }),
                    ),
                  ),
                  to: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        ipBlock: Schema.optional(
                          Schema.Struct({
                            cidr: Schema.String,
                            except: Schema.optional(
                              Schema.Array(Schema.String),
                            ),
                          }),
                        ),
                        namespaceSelector: Schema.optional(
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
                        podSelector: Schema.optional(
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
                    ),
                  ),
                }),
              ),
            ),
            ingress: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  from: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        ipBlock: Schema.optional(
                          Schema.Struct({
                            cidr: Schema.String,
                            except: Schema.optional(
                              Schema.Array(Schema.String),
                            ),
                          }),
                        ),
                        namespaceSelector: Schema.optional(
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
                        podSelector: Schema.optional(
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
                    ),
                  ),
                  ports: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        endPort: Schema.optional(Schema.Number),
                        port: Schema.optional(Schema.String),
                        protocol: Schema.optional(Schema.String),
                      }),
                    ),
                  ),
                }),
              ),
            ),
            podSelector: Schema.optional(
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
            policyTypes: Schema.optional(Schema.Array(Schema.String)),
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
export type ListNetworkingV1NamespacedNetworkPolicyOutput =
  typeof ListNetworkingV1NamespacedNetworkPolicyOutput.Type;

// The operation
/**
 * list or watch objects of kind NetworkPolicy
 */
export const listNetworkingV1NamespacedNetworkPolicy =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListNetworkingV1NamespacedNetworkPolicyInput,
    outputSchema: ListNetworkingV1NamespacedNetworkPolicyOutput,
  }));
// Input Schema
export const ListNetworkingV1NetworkPolicyForAllNamespacesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/networking.k8s.io/v1/networkpolicies",
    }),
  );
export type ListNetworkingV1NetworkPolicyForAllNamespacesInput =
  typeof ListNetworkingV1NetworkPolicyForAllNamespacesInput.Type;

// Output Schema
export const ListNetworkingV1NetworkPolicyForAllNamespacesOutput =
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
            egress: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  ports: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        endPort: Schema.optional(Schema.Number),
                        port: Schema.optional(Schema.String),
                        protocol: Schema.optional(Schema.String),
                      }),
                    ),
                  ),
                  to: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        ipBlock: Schema.optional(
                          Schema.Struct({
                            cidr: Schema.String,
                            except: Schema.optional(
                              Schema.Array(Schema.String),
                            ),
                          }),
                        ),
                        namespaceSelector: Schema.optional(
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
                        podSelector: Schema.optional(
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
                    ),
                  ),
                }),
              ),
            ),
            ingress: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  from: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        ipBlock: Schema.optional(
                          Schema.Struct({
                            cidr: Schema.String,
                            except: Schema.optional(
                              Schema.Array(Schema.String),
                            ),
                          }),
                        ),
                        namespaceSelector: Schema.optional(
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
                        podSelector: Schema.optional(
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
                    ),
                  ),
                  ports: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        endPort: Schema.optional(Schema.Number),
                        port: Schema.optional(Schema.String),
                        protocol: Schema.optional(Schema.String),
                      }),
                    ),
                  ),
                }),
              ),
            ),
            podSelector: Schema.optional(
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
            policyTypes: Schema.optional(Schema.Array(Schema.String)),
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
export type ListNetworkingV1NetworkPolicyForAllNamespacesOutput =
  typeof ListNetworkingV1NetworkPolicyForAllNamespacesOutput.Type;

// The operation
/**
 * list or watch objects of kind NetworkPolicy
 */
export const listNetworkingV1NetworkPolicyForAllNamespaces =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListNetworkingV1NetworkPolicyForAllNamespacesInput,
    outputSchema: ListNetworkingV1NetworkPolicyForAllNamespacesOutput,
  }));
// Input Schema
export const ListNetworkingV1ServiceCIDRInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/apis/networking.k8s.io/v1/servicecidrs" }),
  );
export type ListNetworkingV1ServiceCIDRInput =
  typeof ListNetworkingV1ServiceCIDRInput.Type;

// Output Schema
export const ListNetworkingV1ServiceCIDROutput =
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
            cidrs: Schema.optional(Schema.Array(Schema.String)),
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
export type ListNetworkingV1ServiceCIDROutput =
  typeof ListNetworkingV1ServiceCIDROutput.Type;

// The operation
/**
 * list or watch objects of kind ServiceCIDR
 */
export const listNetworkingV1ServiceCIDR = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ListNetworkingV1ServiceCIDRInput,
    outputSchema: ListNetworkingV1ServiceCIDROutput,
  }),
);
// Input Schema
export const ListNetworkingV1beta1IPAddressInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/networking.k8s.io/v1beta1/ipaddresses",
    }),
  );
export type ListNetworkingV1beta1IPAddressInput =
  typeof ListNetworkingV1beta1IPAddressInput.Type;

// Output Schema
export const ListNetworkingV1beta1IPAddressOutput =
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
          parentRef: Schema.Struct({
            group: Schema.optional(Schema.String),
            name: Schema.String,
            namespace: Schema.optional(Schema.String),
            resource: Schema.String,
          }),
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
export type ListNetworkingV1beta1IPAddressOutput =
  typeof ListNetworkingV1beta1IPAddressOutput.Type;

// The operation
/**
 * list or watch objects of kind IPAddress
 */
export const listNetworkingV1beta1IPAddress =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListNetworkingV1beta1IPAddressInput,
    outputSchema: ListNetworkingV1beta1IPAddressOutput,
  }));
// Input Schema
export const ListNetworkingV1beta1ServiceCIDRInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/networking.k8s.io/v1beta1/servicecidrs",
    }),
  );
export type ListNetworkingV1beta1ServiceCIDRInput =
  typeof ListNetworkingV1beta1ServiceCIDRInput.Type;

// Output Schema
export const ListNetworkingV1beta1ServiceCIDROutput =
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
            cidrs: Schema.optional(Schema.Array(Schema.String)),
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
export type ListNetworkingV1beta1ServiceCIDROutput =
  typeof ListNetworkingV1beta1ServiceCIDROutput.Type;

// The operation
/**
 * list or watch objects of kind ServiceCIDR
 */
export const listNetworkingV1beta1ServiceCIDR =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListNetworkingV1beta1ServiceCIDRInput,
    outputSchema: ListNetworkingV1beta1ServiceCIDROutput,
  }));
// Input Schema
export const PatchNetworkingV1IPAddressInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/networking.k8s.io/v1/ipaddresses/{name}",
    }),
  );
export type PatchNetworkingV1IPAddressInput =
  typeof PatchNetworkingV1IPAddressInput.Type;

// Output Schema
export const PatchNetworkingV1IPAddressOutput =
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
      parentRef: Schema.Struct({
        group: Schema.optional(Schema.String),
        name: Schema.String,
        namespace: Schema.optional(Schema.String),
        resource: Schema.String,
      }),
    }),
  });
export type PatchNetworkingV1IPAddressOutput =
  typeof PatchNetworkingV1IPAddressOutput.Type;

// The operation
/**
 * partially update the specified IPAddress
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchNetworkingV1IPAddress = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PatchNetworkingV1IPAddressInput,
    outputSchema: PatchNetworkingV1IPAddressOutput,
  }),
);
// Input Schema
export const PatchNetworkingV1IngressClassInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/networking.k8s.io/v1/ingressclasses/{name}",
    }),
  );
export type PatchNetworkingV1IngressClassInput =
  typeof PatchNetworkingV1IngressClassInput.Type;

// Output Schema
export const PatchNetworkingV1IngressClassOutput =
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
        controller: Schema.optional(Schema.String),
        parameters: Schema.optional(
          Schema.Struct({
            apiGroup: Schema.optional(Schema.String),
            kind: Schema.String,
            name: Schema.String,
            namespace: Schema.optional(Schema.String),
            scope: Schema.optional(Schema.String),
          }),
        ),
      }),
    ),
  });
export type PatchNetworkingV1IngressClassOutput =
  typeof PatchNetworkingV1IngressClassOutput.Type;

// The operation
/**
 * partially update the specified IngressClass
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchNetworkingV1IngressClass =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PatchNetworkingV1IngressClassInput,
    outputSchema: PatchNetworkingV1IngressClassOutput,
  }));
// Input Schema
export const PatchNetworkingV1NamespacedIngressInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/networking.k8s.io/v1/namespaces/{namespace}/ingresses/{name}",
    }),
  );
export type PatchNetworkingV1NamespacedIngressInput =
  typeof PatchNetworkingV1NamespacedIngressInput.Type;

// Output Schema
export const PatchNetworkingV1NamespacedIngressOutput =
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
        defaultBackend: Schema.optional(
          Schema.Struct({
            resource: Schema.optional(
              Schema.Struct({
                apiGroup: Schema.optional(Schema.String),
                kind: Schema.String,
                name: Schema.String,
              }),
            ),
            service: Schema.optional(
              Schema.Struct({
                name: Schema.String,
                port: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    number: Schema.optional(Schema.Number),
                  }),
                ),
              }),
            ),
          }),
        ),
        ingressClassName: Schema.optional(Schema.String),
        rules: Schema.optional(
          Schema.Array(
            Schema.Struct({
              host: Schema.optional(Schema.String),
              http: Schema.optional(
                Schema.Struct({
                  paths: Schema.Array(
                    Schema.Struct({
                      backend: Schema.Struct({
                        resource: Schema.optional(
                          Schema.Struct({
                            apiGroup: Schema.optional(Schema.String),
                            kind: Schema.String,
                            name: Schema.String,
                          }),
                        ),
                        service: Schema.optional(
                          Schema.Struct({
                            name: Schema.String,
                            port: Schema.optional(
                              Schema.Struct({
                                name: Schema.optional(Schema.String),
                                number: Schema.optional(Schema.Number),
                              }),
                            ),
                          }),
                        ),
                      }),
                      path: Schema.optional(Schema.String),
                      pathType: Schema.String,
                    }),
                  ),
                }),
              ),
            }),
          ),
        ),
        tls: Schema.optional(
          Schema.Array(
            Schema.Struct({
              hosts: Schema.optional(Schema.Array(Schema.String)),
              secretName: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
    status: Schema.optional(
      Schema.Struct({
        loadBalancer: Schema.optional(
          Schema.Struct({
            ingress: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  hostname: Schema.optional(Schema.String),
                  ip: Schema.optional(Schema.String),
                  ports: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        error: Schema.optional(Schema.String),
                        port: Schema.Number,
                        protocol: Schema.String,
                      }),
                    ),
                  ),
                }),
              ),
            ),
          }),
        ),
      }),
    ),
  });
export type PatchNetworkingV1NamespacedIngressOutput =
  typeof PatchNetworkingV1NamespacedIngressOutput.Type;

// The operation
/**
 * partially update the specified Ingress
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchNetworkingV1NamespacedIngress =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PatchNetworkingV1NamespacedIngressInput,
    outputSchema: PatchNetworkingV1NamespacedIngressOutput,
  }));
// Input Schema
export const PatchNetworkingV1NamespacedIngressStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/networking.k8s.io/v1/namespaces/{namespace}/ingresses/{name}/status",
    }),
  );
export type PatchNetworkingV1NamespacedIngressStatusInput =
  typeof PatchNetworkingV1NamespacedIngressStatusInput.Type;

// Output Schema
export const PatchNetworkingV1NamespacedIngressStatusOutput =
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
        defaultBackend: Schema.optional(
          Schema.Struct({
            resource: Schema.optional(
              Schema.Struct({
                apiGroup: Schema.optional(Schema.String),
                kind: Schema.String,
                name: Schema.String,
              }),
            ),
            service: Schema.optional(
              Schema.Struct({
                name: Schema.String,
                port: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    number: Schema.optional(Schema.Number),
                  }),
                ),
              }),
            ),
          }),
        ),
        ingressClassName: Schema.optional(Schema.String),
        rules: Schema.optional(
          Schema.Array(
            Schema.Struct({
              host: Schema.optional(Schema.String),
              http: Schema.optional(
                Schema.Struct({
                  paths: Schema.Array(
                    Schema.Struct({
                      backend: Schema.Struct({
                        resource: Schema.optional(
                          Schema.Struct({
                            apiGroup: Schema.optional(Schema.String),
                            kind: Schema.String,
                            name: Schema.String,
                          }),
                        ),
                        service: Schema.optional(
                          Schema.Struct({
                            name: Schema.String,
                            port: Schema.optional(
                              Schema.Struct({
                                name: Schema.optional(Schema.String),
                                number: Schema.optional(Schema.Number),
                              }),
                            ),
                          }),
                        ),
                      }),
                      path: Schema.optional(Schema.String),
                      pathType: Schema.String,
                    }),
                  ),
                }),
              ),
            }),
          ),
        ),
        tls: Schema.optional(
          Schema.Array(
            Schema.Struct({
              hosts: Schema.optional(Schema.Array(Schema.String)),
              secretName: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
    status: Schema.optional(
      Schema.Struct({
        loadBalancer: Schema.optional(
          Schema.Struct({
            ingress: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  hostname: Schema.optional(Schema.String),
                  ip: Schema.optional(Schema.String),
                  ports: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        error: Schema.optional(Schema.String),
                        port: Schema.Number,
                        protocol: Schema.String,
                      }),
                    ),
                  ),
                }),
              ),
            ),
          }),
        ),
      }),
    ),
  });
export type PatchNetworkingV1NamespacedIngressStatusOutput =
  typeof PatchNetworkingV1NamespacedIngressStatusOutput.Type;

// The operation
/**
 * partially update status of the specified Ingress
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchNetworkingV1NamespacedIngressStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PatchNetworkingV1NamespacedIngressStatusInput,
    outputSchema: PatchNetworkingV1NamespacedIngressStatusOutput,
  }));
// Input Schema
export const PatchNetworkingV1NamespacedNetworkPolicyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/networking.k8s.io/v1/namespaces/{namespace}/networkpolicies/{name}",
    }),
  );
export type PatchNetworkingV1NamespacedNetworkPolicyInput =
  typeof PatchNetworkingV1NamespacedNetworkPolicyInput.Type;

// Output Schema
export const PatchNetworkingV1NamespacedNetworkPolicyOutput =
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
        egress: Schema.optional(
          Schema.Array(
            Schema.Struct({
              ports: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    endPort: Schema.optional(Schema.Number),
                    port: Schema.optional(Schema.String),
                    protocol: Schema.optional(Schema.String),
                  }),
                ),
              ),
              to: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    ipBlock: Schema.optional(
                      Schema.Struct({
                        cidr: Schema.String,
                        except: Schema.optional(Schema.Array(Schema.String)),
                      }),
                    ),
                    namespaceSelector: Schema.optional(
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
                    podSelector: Schema.optional(
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
                ),
              ),
            }),
          ),
        ),
        ingress: Schema.optional(
          Schema.Array(
            Schema.Struct({
              from: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    ipBlock: Schema.optional(
                      Schema.Struct({
                        cidr: Schema.String,
                        except: Schema.optional(Schema.Array(Schema.String)),
                      }),
                    ),
                    namespaceSelector: Schema.optional(
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
                    podSelector: Schema.optional(
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
                ),
              ),
              ports: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    endPort: Schema.optional(Schema.Number),
                    port: Schema.optional(Schema.String),
                    protocol: Schema.optional(Schema.String),
                  }),
                ),
              ),
            }),
          ),
        ),
        podSelector: Schema.optional(
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
        policyTypes: Schema.optional(Schema.Array(Schema.String)),
      }),
    ),
  });
export type PatchNetworkingV1NamespacedNetworkPolicyOutput =
  typeof PatchNetworkingV1NamespacedNetworkPolicyOutput.Type;

// The operation
/**
 * partially update the specified NetworkPolicy
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchNetworkingV1NamespacedNetworkPolicy =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PatchNetworkingV1NamespacedNetworkPolicyInput,
    outputSchema: PatchNetworkingV1NamespacedNetworkPolicyOutput,
  }));
// Input Schema
export const PatchNetworkingV1ServiceCIDRInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/networking.k8s.io/v1/servicecidrs/{name}",
    }),
  );
export type PatchNetworkingV1ServiceCIDRInput =
  typeof PatchNetworkingV1ServiceCIDRInput.Type;

// Output Schema
export const PatchNetworkingV1ServiceCIDROutput =
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
        cidrs: Schema.optional(Schema.Array(Schema.String)),
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
      }),
    ),
  });
export type PatchNetworkingV1ServiceCIDROutput =
  typeof PatchNetworkingV1ServiceCIDROutput.Type;

// The operation
/**
 * partially update the specified ServiceCIDR
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchNetworkingV1ServiceCIDR =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PatchNetworkingV1ServiceCIDRInput,
    outputSchema: PatchNetworkingV1ServiceCIDROutput,
  }));
// Input Schema
export const PatchNetworkingV1ServiceCIDRStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/networking.k8s.io/v1/servicecidrs/{name}/status",
    }),
  );
export type PatchNetworkingV1ServiceCIDRStatusInput =
  typeof PatchNetworkingV1ServiceCIDRStatusInput.Type;

// Output Schema
export const PatchNetworkingV1ServiceCIDRStatusOutput =
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
        cidrs: Schema.optional(Schema.Array(Schema.String)),
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
      }),
    ),
  });
export type PatchNetworkingV1ServiceCIDRStatusOutput =
  typeof PatchNetworkingV1ServiceCIDRStatusOutput.Type;

// The operation
/**
 * partially update status of the specified ServiceCIDR
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchNetworkingV1ServiceCIDRStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PatchNetworkingV1ServiceCIDRStatusInput,
    outputSchema: PatchNetworkingV1ServiceCIDRStatusOutput,
  }));
// Input Schema
export const PatchNetworkingV1beta1IPAddressInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/networking.k8s.io/v1beta1/ipaddresses/{name}",
    }),
  );
export type PatchNetworkingV1beta1IPAddressInput =
  typeof PatchNetworkingV1beta1IPAddressInput.Type;

// Output Schema
export const PatchNetworkingV1beta1IPAddressOutput =
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
      parentRef: Schema.Struct({
        group: Schema.optional(Schema.String),
        name: Schema.String,
        namespace: Schema.optional(Schema.String),
        resource: Schema.String,
      }),
    }),
  });
export type PatchNetworkingV1beta1IPAddressOutput =
  typeof PatchNetworkingV1beta1IPAddressOutput.Type;

// The operation
/**
 * partially update the specified IPAddress
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchNetworkingV1beta1IPAddress =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PatchNetworkingV1beta1IPAddressInput,
    outputSchema: PatchNetworkingV1beta1IPAddressOutput,
  }));
// Input Schema
export const PatchNetworkingV1beta1ServiceCIDRInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/networking.k8s.io/v1beta1/servicecidrs/{name}",
    }),
  );
export type PatchNetworkingV1beta1ServiceCIDRInput =
  typeof PatchNetworkingV1beta1ServiceCIDRInput.Type;

// Output Schema
export const PatchNetworkingV1beta1ServiceCIDROutput =
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
        cidrs: Schema.optional(Schema.Array(Schema.String)),
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
      }),
    ),
  });
export type PatchNetworkingV1beta1ServiceCIDROutput =
  typeof PatchNetworkingV1beta1ServiceCIDROutput.Type;

// The operation
/**
 * partially update the specified ServiceCIDR
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchNetworkingV1beta1ServiceCIDR =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PatchNetworkingV1beta1ServiceCIDRInput,
    outputSchema: PatchNetworkingV1beta1ServiceCIDROutput,
  }));
// Input Schema
export const PatchNetworkingV1beta1ServiceCIDRStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apis/networking.k8s.io/v1beta1/servicecidrs/{name}/status",
    }),
  );
export type PatchNetworkingV1beta1ServiceCIDRStatusInput =
  typeof PatchNetworkingV1beta1ServiceCIDRStatusInput.Type;

// Output Schema
export const PatchNetworkingV1beta1ServiceCIDRStatusOutput =
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
        cidrs: Schema.optional(Schema.Array(Schema.String)),
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
      }),
    ),
  });
export type PatchNetworkingV1beta1ServiceCIDRStatusOutput =
  typeof PatchNetworkingV1beta1ServiceCIDRStatusOutput.Type;

// The operation
/**
 * partially update status of the specified ServiceCIDR
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const patchNetworkingV1beta1ServiceCIDRStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PatchNetworkingV1beta1ServiceCIDRStatusInput,
    outputSchema: PatchNetworkingV1beta1ServiceCIDRStatusOutput,
  }));
// Input Schema
export const ReadNetworkingV1IPAddressInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/networking.k8s.io/v1/ipaddresses/{name}",
    }),
  );
export type ReadNetworkingV1IPAddressInput =
  typeof ReadNetworkingV1IPAddressInput.Type;

// Output Schema
export const ReadNetworkingV1IPAddressOutput =
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
      parentRef: Schema.Struct({
        group: Schema.optional(Schema.String),
        name: Schema.String,
        namespace: Schema.optional(Schema.String),
        resource: Schema.String,
      }),
    }),
  });
export type ReadNetworkingV1IPAddressOutput =
  typeof ReadNetworkingV1IPAddressOutput.Type;

// The operation
/**
 * read the specified IPAddress
 */
export const readNetworkingV1IPAddress = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ReadNetworkingV1IPAddressInput,
    outputSchema: ReadNetworkingV1IPAddressOutput,
  }),
);
// Input Schema
export const ReadNetworkingV1IngressClassInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/networking.k8s.io/v1/ingressclasses/{name}",
    }),
  );
export type ReadNetworkingV1IngressClassInput =
  typeof ReadNetworkingV1IngressClassInput.Type;

// Output Schema
export const ReadNetworkingV1IngressClassOutput =
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
        controller: Schema.optional(Schema.String),
        parameters: Schema.optional(
          Schema.Struct({
            apiGroup: Schema.optional(Schema.String),
            kind: Schema.String,
            name: Schema.String,
            namespace: Schema.optional(Schema.String),
            scope: Schema.optional(Schema.String),
          }),
        ),
      }),
    ),
  });
export type ReadNetworkingV1IngressClassOutput =
  typeof ReadNetworkingV1IngressClassOutput.Type;

// The operation
/**
 * read the specified IngressClass
 */
export const readNetworkingV1IngressClass =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReadNetworkingV1IngressClassInput,
    outputSchema: ReadNetworkingV1IngressClassOutput,
  }));
// Input Schema
export const ReadNetworkingV1NamespacedIngressInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/networking.k8s.io/v1/namespaces/{namespace}/ingresses/{name}",
    }),
  );
export type ReadNetworkingV1NamespacedIngressInput =
  typeof ReadNetworkingV1NamespacedIngressInput.Type;

// Output Schema
export const ReadNetworkingV1NamespacedIngressOutput =
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
        defaultBackend: Schema.optional(
          Schema.Struct({
            resource: Schema.optional(
              Schema.Struct({
                apiGroup: Schema.optional(Schema.String),
                kind: Schema.String,
                name: Schema.String,
              }),
            ),
            service: Schema.optional(
              Schema.Struct({
                name: Schema.String,
                port: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    number: Schema.optional(Schema.Number),
                  }),
                ),
              }),
            ),
          }),
        ),
        ingressClassName: Schema.optional(Schema.String),
        rules: Schema.optional(
          Schema.Array(
            Schema.Struct({
              host: Schema.optional(Schema.String),
              http: Schema.optional(
                Schema.Struct({
                  paths: Schema.Array(
                    Schema.Struct({
                      backend: Schema.Struct({
                        resource: Schema.optional(
                          Schema.Struct({
                            apiGroup: Schema.optional(Schema.String),
                            kind: Schema.String,
                            name: Schema.String,
                          }),
                        ),
                        service: Schema.optional(
                          Schema.Struct({
                            name: Schema.String,
                            port: Schema.optional(
                              Schema.Struct({
                                name: Schema.optional(Schema.String),
                                number: Schema.optional(Schema.Number),
                              }),
                            ),
                          }),
                        ),
                      }),
                      path: Schema.optional(Schema.String),
                      pathType: Schema.String,
                    }),
                  ),
                }),
              ),
            }),
          ),
        ),
        tls: Schema.optional(
          Schema.Array(
            Schema.Struct({
              hosts: Schema.optional(Schema.Array(Schema.String)),
              secretName: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
    status: Schema.optional(
      Schema.Struct({
        loadBalancer: Schema.optional(
          Schema.Struct({
            ingress: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  hostname: Schema.optional(Schema.String),
                  ip: Schema.optional(Schema.String),
                  ports: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        error: Schema.optional(Schema.String),
                        port: Schema.Number,
                        protocol: Schema.String,
                      }),
                    ),
                  ),
                }),
              ),
            ),
          }),
        ),
      }),
    ),
  });
export type ReadNetworkingV1NamespacedIngressOutput =
  typeof ReadNetworkingV1NamespacedIngressOutput.Type;

// The operation
/**
 * read the specified Ingress
 */
export const readNetworkingV1NamespacedIngress =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReadNetworkingV1NamespacedIngressInput,
    outputSchema: ReadNetworkingV1NamespacedIngressOutput,
  }));
// Input Schema
export const ReadNetworkingV1NamespacedIngressStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/networking.k8s.io/v1/namespaces/{namespace}/ingresses/{name}/status",
    }),
  );
export type ReadNetworkingV1NamespacedIngressStatusInput =
  typeof ReadNetworkingV1NamespacedIngressStatusInput.Type;

// Output Schema
export const ReadNetworkingV1NamespacedIngressStatusOutput =
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
        defaultBackend: Schema.optional(
          Schema.Struct({
            resource: Schema.optional(
              Schema.Struct({
                apiGroup: Schema.optional(Schema.String),
                kind: Schema.String,
                name: Schema.String,
              }),
            ),
            service: Schema.optional(
              Schema.Struct({
                name: Schema.String,
                port: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    number: Schema.optional(Schema.Number),
                  }),
                ),
              }),
            ),
          }),
        ),
        ingressClassName: Schema.optional(Schema.String),
        rules: Schema.optional(
          Schema.Array(
            Schema.Struct({
              host: Schema.optional(Schema.String),
              http: Schema.optional(
                Schema.Struct({
                  paths: Schema.Array(
                    Schema.Struct({
                      backend: Schema.Struct({
                        resource: Schema.optional(
                          Schema.Struct({
                            apiGroup: Schema.optional(Schema.String),
                            kind: Schema.String,
                            name: Schema.String,
                          }),
                        ),
                        service: Schema.optional(
                          Schema.Struct({
                            name: Schema.String,
                            port: Schema.optional(
                              Schema.Struct({
                                name: Schema.optional(Schema.String),
                                number: Schema.optional(Schema.Number),
                              }),
                            ),
                          }),
                        ),
                      }),
                      path: Schema.optional(Schema.String),
                      pathType: Schema.String,
                    }),
                  ),
                }),
              ),
            }),
          ),
        ),
        tls: Schema.optional(
          Schema.Array(
            Schema.Struct({
              hosts: Schema.optional(Schema.Array(Schema.String)),
              secretName: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
    status: Schema.optional(
      Schema.Struct({
        loadBalancer: Schema.optional(
          Schema.Struct({
            ingress: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  hostname: Schema.optional(Schema.String),
                  ip: Schema.optional(Schema.String),
                  ports: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        error: Schema.optional(Schema.String),
                        port: Schema.Number,
                        protocol: Schema.String,
                      }),
                    ),
                  ),
                }),
              ),
            ),
          }),
        ),
      }),
    ),
  });
export type ReadNetworkingV1NamespacedIngressStatusOutput =
  typeof ReadNetworkingV1NamespacedIngressStatusOutput.Type;

// The operation
/**
 * read status of the specified Ingress
 */
export const readNetworkingV1NamespacedIngressStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReadNetworkingV1NamespacedIngressStatusInput,
    outputSchema: ReadNetworkingV1NamespacedIngressStatusOutput,
  }));
// Input Schema
export const ReadNetworkingV1NamespacedNetworkPolicyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/networking.k8s.io/v1/namespaces/{namespace}/networkpolicies/{name}",
    }),
  );
export type ReadNetworkingV1NamespacedNetworkPolicyInput =
  typeof ReadNetworkingV1NamespacedNetworkPolicyInput.Type;

// Output Schema
export const ReadNetworkingV1NamespacedNetworkPolicyOutput =
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
        egress: Schema.optional(
          Schema.Array(
            Schema.Struct({
              ports: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    endPort: Schema.optional(Schema.Number),
                    port: Schema.optional(Schema.String),
                    protocol: Schema.optional(Schema.String),
                  }),
                ),
              ),
              to: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    ipBlock: Schema.optional(
                      Schema.Struct({
                        cidr: Schema.String,
                        except: Schema.optional(Schema.Array(Schema.String)),
                      }),
                    ),
                    namespaceSelector: Schema.optional(
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
                    podSelector: Schema.optional(
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
                ),
              ),
            }),
          ),
        ),
        ingress: Schema.optional(
          Schema.Array(
            Schema.Struct({
              from: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    ipBlock: Schema.optional(
                      Schema.Struct({
                        cidr: Schema.String,
                        except: Schema.optional(Schema.Array(Schema.String)),
                      }),
                    ),
                    namespaceSelector: Schema.optional(
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
                    podSelector: Schema.optional(
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
                ),
              ),
              ports: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    endPort: Schema.optional(Schema.Number),
                    port: Schema.optional(Schema.String),
                    protocol: Schema.optional(Schema.String),
                  }),
                ),
              ),
            }),
          ),
        ),
        podSelector: Schema.optional(
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
        policyTypes: Schema.optional(Schema.Array(Schema.String)),
      }),
    ),
  });
export type ReadNetworkingV1NamespacedNetworkPolicyOutput =
  typeof ReadNetworkingV1NamespacedNetworkPolicyOutput.Type;

// The operation
/**
 * read the specified NetworkPolicy
 */
export const readNetworkingV1NamespacedNetworkPolicy =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReadNetworkingV1NamespacedNetworkPolicyInput,
    outputSchema: ReadNetworkingV1NamespacedNetworkPolicyOutput,
  }));
// Input Schema
export const ReadNetworkingV1ServiceCIDRInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/networking.k8s.io/v1/servicecidrs/{name}",
    }),
  );
export type ReadNetworkingV1ServiceCIDRInput =
  typeof ReadNetworkingV1ServiceCIDRInput.Type;

// Output Schema
export const ReadNetworkingV1ServiceCIDROutput =
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
        cidrs: Schema.optional(Schema.Array(Schema.String)),
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
      }),
    ),
  });
export type ReadNetworkingV1ServiceCIDROutput =
  typeof ReadNetworkingV1ServiceCIDROutput.Type;

// The operation
/**
 * read the specified ServiceCIDR
 */
export const readNetworkingV1ServiceCIDR = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ReadNetworkingV1ServiceCIDRInput,
    outputSchema: ReadNetworkingV1ServiceCIDROutput,
  }),
);
// Input Schema
export const ReadNetworkingV1ServiceCIDRStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/networking.k8s.io/v1/servicecidrs/{name}/status",
    }),
  );
export type ReadNetworkingV1ServiceCIDRStatusInput =
  typeof ReadNetworkingV1ServiceCIDRStatusInput.Type;

// Output Schema
export const ReadNetworkingV1ServiceCIDRStatusOutput =
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
        cidrs: Schema.optional(Schema.Array(Schema.String)),
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
      }),
    ),
  });
export type ReadNetworkingV1ServiceCIDRStatusOutput =
  typeof ReadNetworkingV1ServiceCIDRStatusOutput.Type;

// The operation
/**
 * read status of the specified ServiceCIDR
 */
export const readNetworkingV1ServiceCIDRStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReadNetworkingV1ServiceCIDRStatusInput,
    outputSchema: ReadNetworkingV1ServiceCIDRStatusOutput,
  }));
// Input Schema
export const ReadNetworkingV1beta1IPAddressInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/networking.k8s.io/v1beta1/ipaddresses/{name}",
    }),
  );
export type ReadNetworkingV1beta1IPAddressInput =
  typeof ReadNetworkingV1beta1IPAddressInput.Type;

// Output Schema
export const ReadNetworkingV1beta1IPAddressOutput =
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
      parentRef: Schema.Struct({
        group: Schema.optional(Schema.String),
        name: Schema.String,
        namespace: Schema.optional(Schema.String),
        resource: Schema.String,
      }),
    }),
  });
export type ReadNetworkingV1beta1IPAddressOutput =
  typeof ReadNetworkingV1beta1IPAddressOutput.Type;

// The operation
/**
 * read the specified IPAddress
 */
export const readNetworkingV1beta1IPAddress =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReadNetworkingV1beta1IPAddressInput,
    outputSchema: ReadNetworkingV1beta1IPAddressOutput,
  }));
// Input Schema
export const ReadNetworkingV1beta1ServiceCIDRInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/networking.k8s.io/v1beta1/servicecidrs/{name}",
    }),
  );
export type ReadNetworkingV1beta1ServiceCIDRInput =
  typeof ReadNetworkingV1beta1ServiceCIDRInput.Type;

// Output Schema
export const ReadNetworkingV1beta1ServiceCIDROutput =
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
        cidrs: Schema.optional(Schema.Array(Schema.String)),
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
      }),
    ),
  });
export type ReadNetworkingV1beta1ServiceCIDROutput =
  typeof ReadNetworkingV1beta1ServiceCIDROutput.Type;

// The operation
/**
 * read the specified ServiceCIDR
 */
export const readNetworkingV1beta1ServiceCIDR =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReadNetworkingV1beta1ServiceCIDRInput,
    outputSchema: ReadNetworkingV1beta1ServiceCIDROutput,
  }));
// Input Schema
export const ReadNetworkingV1beta1ServiceCIDRStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/networking.k8s.io/v1beta1/servicecidrs/{name}/status",
    }),
  );
export type ReadNetworkingV1beta1ServiceCIDRStatusInput =
  typeof ReadNetworkingV1beta1ServiceCIDRStatusInput.Type;

// Output Schema
export const ReadNetworkingV1beta1ServiceCIDRStatusOutput =
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
        cidrs: Schema.optional(Schema.Array(Schema.String)),
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
      }),
    ),
  });
export type ReadNetworkingV1beta1ServiceCIDRStatusOutput =
  typeof ReadNetworkingV1beta1ServiceCIDRStatusOutput.Type;

// The operation
/**
 * read status of the specified ServiceCIDR
 */
export const readNetworkingV1beta1ServiceCIDRStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReadNetworkingV1beta1ServiceCIDRStatusInput,
    outputSchema: ReadNetworkingV1beta1ServiceCIDRStatusOutput,
  }));
// Input Schema
export const ReplaceNetworkingV1IPAddressInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/networking.k8s.io/v1/ipaddresses/{name}",
    }),
  );
export type ReplaceNetworkingV1IPAddressInput =
  typeof ReplaceNetworkingV1IPAddressInput.Type;

// Output Schema
export const ReplaceNetworkingV1IPAddressOutput =
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
      parentRef: Schema.Struct({
        group: Schema.optional(Schema.String),
        name: Schema.String,
        namespace: Schema.optional(Schema.String),
        resource: Schema.String,
      }),
    }),
  });
export type ReplaceNetworkingV1IPAddressOutput =
  typeof ReplaceNetworkingV1IPAddressOutput.Type;

// The operation
/**
 * replace the specified IPAddress
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceNetworkingV1IPAddress =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReplaceNetworkingV1IPAddressInput,
    outputSchema: ReplaceNetworkingV1IPAddressOutput,
  }));
// Input Schema
export const ReplaceNetworkingV1IngressClassInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/networking.k8s.io/v1/ingressclasses/{name}",
    }),
  );
export type ReplaceNetworkingV1IngressClassInput =
  typeof ReplaceNetworkingV1IngressClassInput.Type;

// Output Schema
export const ReplaceNetworkingV1IngressClassOutput =
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
        controller: Schema.optional(Schema.String),
        parameters: Schema.optional(
          Schema.Struct({
            apiGroup: Schema.optional(Schema.String),
            kind: Schema.String,
            name: Schema.String,
            namespace: Schema.optional(Schema.String),
            scope: Schema.optional(Schema.String),
          }),
        ),
      }),
    ),
  });
export type ReplaceNetworkingV1IngressClassOutput =
  typeof ReplaceNetworkingV1IngressClassOutput.Type;

// The operation
/**
 * replace the specified IngressClass
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceNetworkingV1IngressClass =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReplaceNetworkingV1IngressClassInput,
    outputSchema: ReplaceNetworkingV1IngressClassOutput,
  }));
// Input Schema
export const ReplaceNetworkingV1NamespacedIngressInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/networking.k8s.io/v1/namespaces/{namespace}/ingresses/{name}",
    }),
  );
export type ReplaceNetworkingV1NamespacedIngressInput =
  typeof ReplaceNetworkingV1NamespacedIngressInput.Type;

// Output Schema
export const ReplaceNetworkingV1NamespacedIngressOutput =
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
        defaultBackend: Schema.optional(
          Schema.Struct({
            resource: Schema.optional(
              Schema.Struct({
                apiGroup: Schema.optional(Schema.String),
                kind: Schema.String,
                name: Schema.String,
              }),
            ),
            service: Schema.optional(
              Schema.Struct({
                name: Schema.String,
                port: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    number: Schema.optional(Schema.Number),
                  }),
                ),
              }),
            ),
          }),
        ),
        ingressClassName: Schema.optional(Schema.String),
        rules: Schema.optional(
          Schema.Array(
            Schema.Struct({
              host: Schema.optional(Schema.String),
              http: Schema.optional(
                Schema.Struct({
                  paths: Schema.Array(
                    Schema.Struct({
                      backend: Schema.Struct({
                        resource: Schema.optional(
                          Schema.Struct({
                            apiGroup: Schema.optional(Schema.String),
                            kind: Schema.String,
                            name: Schema.String,
                          }),
                        ),
                        service: Schema.optional(
                          Schema.Struct({
                            name: Schema.String,
                            port: Schema.optional(
                              Schema.Struct({
                                name: Schema.optional(Schema.String),
                                number: Schema.optional(Schema.Number),
                              }),
                            ),
                          }),
                        ),
                      }),
                      path: Schema.optional(Schema.String),
                      pathType: Schema.String,
                    }),
                  ),
                }),
              ),
            }),
          ),
        ),
        tls: Schema.optional(
          Schema.Array(
            Schema.Struct({
              hosts: Schema.optional(Schema.Array(Schema.String)),
              secretName: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
    status: Schema.optional(
      Schema.Struct({
        loadBalancer: Schema.optional(
          Schema.Struct({
            ingress: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  hostname: Schema.optional(Schema.String),
                  ip: Schema.optional(Schema.String),
                  ports: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        error: Schema.optional(Schema.String),
                        port: Schema.Number,
                        protocol: Schema.String,
                      }),
                    ),
                  ),
                }),
              ),
            ),
          }),
        ),
      }),
    ),
  });
export type ReplaceNetworkingV1NamespacedIngressOutput =
  typeof ReplaceNetworkingV1NamespacedIngressOutput.Type;

// The operation
/**
 * replace the specified Ingress
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceNetworkingV1NamespacedIngress =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReplaceNetworkingV1NamespacedIngressInput,
    outputSchema: ReplaceNetworkingV1NamespacedIngressOutput,
  }));
// Input Schema
export const ReplaceNetworkingV1NamespacedIngressStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/networking.k8s.io/v1/namespaces/{namespace}/ingresses/{name}/status",
    }),
  );
export type ReplaceNetworkingV1NamespacedIngressStatusInput =
  typeof ReplaceNetworkingV1NamespacedIngressStatusInput.Type;

// Output Schema
export const ReplaceNetworkingV1NamespacedIngressStatusOutput =
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
        defaultBackend: Schema.optional(
          Schema.Struct({
            resource: Schema.optional(
              Schema.Struct({
                apiGroup: Schema.optional(Schema.String),
                kind: Schema.String,
                name: Schema.String,
              }),
            ),
            service: Schema.optional(
              Schema.Struct({
                name: Schema.String,
                port: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    number: Schema.optional(Schema.Number),
                  }),
                ),
              }),
            ),
          }),
        ),
        ingressClassName: Schema.optional(Schema.String),
        rules: Schema.optional(
          Schema.Array(
            Schema.Struct({
              host: Schema.optional(Schema.String),
              http: Schema.optional(
                Schema.Struct({
                  paths: Schema.Array(
                    Schema.Struct({
                      backend: Schema.Struct({
                        resource: Schema.optional(
                          Schema.Struct({
                            apiGroup: Schema.optional(Schema.String),
                            kind: Schema.String,
                            name: Schema.String,
                          }),
                        ),
                        service: Schema.optional(
                          Schema.Struct({
                            name: Schema.String,
                            port: Schema.optional(
                              Schema.Struct({
                                name: Schema.optional(Schema.String),
                                number: Schema.optional(Schema.Number),
                              }),
                            ),
                          }),
                        ),
                      }),
                      path: Schema.optional(Schema.String),
                      pathType: Schema.String,
                    }),
                  ),
                }),
              ),
            }),
          ),
        ),
        tls: Schema.optional(
          Schema.Array(
            Schema.Struct({
              hosts: Schema.optional(Schema.Array(Schema.String)),
              secretName: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
    status: Schema.optional(
      Schema.Struct({
        loadBalancer: Schema.optional(
          Schema.Struct({
            ingress: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  hostname: Schema.optional(Schema.String),
                  ip: Schema.optional(Schema.String),
                  ports: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        error: Schema.optional(Schema.String),
                        port: Schema.Number,
                        protocol: Schema.String,
                      }),
                    ),
                  ),
                }),
              ),
            ),
          }),
        ),
      }),
    ),
  });
export type ReplaceNetworkingV1NamespacedIngressStatusOutput =
  typeof ReplaceNetworkingV1NamespacedIngressStatusOutput.Type;

// The operation
/**
 * replace status of the specified Ingress
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceNetworkingV1NamespacedIngressStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReplaceNetworkingV1NamespacedIngressStatusInput,
    outputSchema: ReplaceNetworkingV1NamespacedIngressStatusOutput,
  }));
// Input Schema
export const ReplaceNetworkingV1NamespacedNetworkPolicyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/networking.k8s.io/v1/namespaces/{namespace}/networkpolicies/{name}",
    }),
  );
export type ReplaceNetworkingV1NamespacedNetworkPolicyInput =
  typeof ReplaceNetworkingV1NamespacedNetworkPolicyInput.Type;

// Output Schema
export const ReplaceNetworkingV1NamespacedNetworkPolicyOutput =
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
        egress: Schema.optional(
          Schema.Array(
            Schema.Struct({
              ports: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    endPort: Schema.optional(Schema.Number),
                    port: Schema.optional(Schema.String),
                    protocol: Schema.optional(Schema.String),
                  }),
                ),
              ),
              to: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    ipBlock: Schema.optional(
                      Schema.Struct({
                        cidr: Schema.String,
                        except: Schema.optional(Schema.Array(Schema.String)),
                      }),
                    ),
                    namespaceSelector: Schema.optional(
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
                    podSelector: Schema.optional(
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
                ),
              ),
            }),
          ),
        ),
        ingress: Schema.optional(
          Schema.Array(
            Schema.Struct({
              from: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    ipBlock: Schema.optional(
                      Schema.Struct({
                        cidr: Schema.String,
                        except: Schema.optional(Schema.Array(Schema.String)),
                      }),
                    ),
                    namespaceSelector: Schema.optional(
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
                    podSelector: Schema.optional(
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
                ),
              ),
              ports: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    endPort: Schema.optional(Schema.Number),
                    port: Schema.optional(Schema.String),
                    protocol: Schema.optional(Schema.String),
                  }),
                ),
              ),
            }),
          ),
        ),
        podSelector: Schema.optional(
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
        policyTypes: Schema.optional(Schema.Array(Schema.String)),
      }),
    ),
  });
export type ReplaceNetworkingV1NamespacedNetworkPolicyOutput =
  typeof ReplaceNetworkingV1NamespacedNetworkPolicyOutput.Type;

// The operation
/**
 * replace the specified NetworkPolicy
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceNetworkingV1NamespacedNetworkPolicy =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReplaceNetworkingV1NamespacedNetworkPolicyInput,
    outputSchema: ReplaceNetworkingV1NamespacedNetworkPolicyOutput,
  }));
// Input Schema
export const ReplaceNetworkingV1ServiceCIDRInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/networking.k8s.io/v1/servicecidrs/{name}",
    }),
  );
export type ReplaceNetworkingV1ServiceCIDRInput =
  typeof ReplaceNetworkingV1ServiceCIDRInput.Type;

// Output Schema
export const ReplaceNetworkingV1ServiceCIDROutput =
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
        cidrs: Schema.optional(Schema.Array(Schema.String)),
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
      }),
    ),
  });
export type ReplaceNetworkingV1ServiceCIDROutput =
  typeof ReplaceNetworkingV1ServiceCIDROutput.Type;

// The operation
/**
 * replace the specified ServiceCIDR
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceNetworkingV1ServiceCIDR =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReplaceNetworkingV1ServiceCIDRInput,
    outputSchema: ReplaceNetworkingV1ServiceCIDROutput,
  }));
// Input Schema
export const ReplaceNetworkingV1ServiceCIDRStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/networking.k8s.io/v1/servicecidrs/{name}/status",
    }),
  );
export type ReplaceNetworkingV1ServiceCIDRStatusInput =
  typeof ReplaceNetworkingV1ServiceCIDRStatusInput.Type;

// Output Schema
export const ReplaceNetworkingV1ServiceCIDRStatusOutput =
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
        cidrs: Schema.optional(Schema.Array(Schema.String)),
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
      }),
    ),
  });
export type ReplaceNetworkingV1ServiceCIDRStatusOutput =
  typeof ReplaceNetworkingV1ServiceCIDRStatusOutput.Type;

// The operation
/**
 * replace status of the specified ServiceCIDR
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceNetworkingV1ServiceCIDRStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReplaceNetworkingV1ServiceCIDRStatusInput,
    outputSchema: ReplaceNetworkingV1ServiceCIDRStatusOutput,
  }));
// Input Schema
export const ReplaceNetworkingV1beta1IPAddressInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/networking.k8s.io/v1beta1/ipaddresses/{name}",
    }),
  );
export type ReplaceNetworkingV1beta1IPAddressInput =
  typeof ReplaceNetworkingV1beta1IPAddressInput.Type;

// Output Schema
export const ReplaceNetworkingV1beta1IPAddressOutput =
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
      parentRef: Schema.Struct({
        group: Schema.optional(Schema.String),
        name: Schema.String,
        namespace: Schema.optional(Schema.String),
        resource: Schema.String,
      }),
    }),
  });
export type ReplaceNetworkingV1beta1IPAddressOutput =
  typeof ReplaceNetworkingV1beta1IPAddressOutput.Type;

// The operation
/**
 * replace the specified IPAddress
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceNetworkingV1beta1IPAddress =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReplaceNetworkingV1beta1IPAddressInput,
    outputSchema: ReplaceNetworkingV1beta1IPAddressOutput,
  }));
// Input Schema
export const ReplaceNetworkingV1beta1ServiceCIDRInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/networking.k8s.io/v1beta1/servicecidrs/{name}",
    }),
  );
export type ReplaceNetworkingV1beta1ServiceCIDRInput =
  typeof ReplaceNetworkingV1beta1ServiceCIDRInput.Type;

// Output Schema
export const ReplaceNetworkingV1beta1ServiceCIDROutput =
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
        cidrs: Schema.optional(Schema.Array(Schema.String)),
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
      }),
    ),
  });
export type ReplaceNetworkingV1beta1ServiceCIDROutput =
  typeof ReplaceNetworkingV1beta1ServiceCIDROutput.Type;

// The operation
/**
 * replace the specified ServiceCIDR
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceNetworkingV1beta1ServiceCIDR =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReplaceNetworkingV1beta1ServiceCIDRInput,
    outputSchema: ReplaceNetworkingV1beta1ServiceCIDROutput,
  }));
// Input Schema
export const ReplaceNetworkingV1beta1ServiceCIDRStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dryRun: Schema.optional(Schema.String),
    fieldValidation: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apis/networking.k8s.io/v1beta1/servicecidrs/{name}/status",
    }),
  );
export type ReplaceNetworkingV1beta1ServiceCIDRStatusInput =
  typeof ReplaceNetworkingV1beta1ServiceCIDRStatusInput.Type;

// Output Schema
export const ReplaceNetworkingV1beta1ServiceCIDRStatusOutput =
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
        cidrs: Schema.optional(Schema.Array(Schema.String)),
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
      }),
    ),
  });
export type ReplaceNetworkingV1beta1ServiceCIDRStatusOutput =
  typeof ReplaceNetworkingV1beta1ServiceCIDRStatusOutput.Type;

// The operation
/**
 * replace status of the specified ServiceCIDR
 *
 * @param dryRun - When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
 * @param fieldValidation - fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered.
 */
export const replaceNetworkingV1beta1ServiceCIDRStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReplaceNetworkingV1beta1ServiceCIDRStatusInput,
    outputSchema: ReplaceNetworkingV1beta1ServiceCIDRStatusOutput,
  }));
// Input Schema
export const WatchNetworkingV1IPAddressInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/networking.k8s.io/v1/watch/ipaddresses/{name}",
    }),
  );
export type WatchNetworkingV1IPAddressInput =
  typeof WatchNetworkingV1IPAddressInput.Type;

// Output Schema
export const WatchNetworkingV1IPAddressOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchNetworkingV1IPAddressOutput =
  typeof WatchNetworkingV1IPAddressOutput.Type;

// The operation
/**
 * watch changes to an object of kind IPAddress. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
 */
export const watchNetworkingV1IPAddress = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WatchNetworkingV1IPAddressInput,
    outputSchema: WatchNetworkingV1IPAddressOutput,
  }),
);
// Input Schema
export const WatchNetworkingV1IPAddressListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/networking.k8s.io/v1/watch/ipaddresses",
    }),
  );
export type WatchNetworkingV1IPAddressListInput =
  typeof WatchNetworkingV1IPAddressListInput.Type;

// Output Schema
export const WatchNetworkingV1IPAddressListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchNetworkingV1IPAddressListOutput =
  typeof WatchNetworkingV1IPAddressListOutput.Type;

// The operation
/**
 * watch individual changes to a list of IPAddress. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchNetworkingV1IPAddressList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchNetworkingV1IPAddressListInput,
    outputSchema: WatchNetworkingV1IPAddressListOutput,
  }));
// Input Schema
export const WatchNetworkingV1IngressClassInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/networking.k8s.io/v1/watch/ingressclasses/{name}",
    }),
  );
export type WatchNetworkingV1IngressClassInput =
  typeof WatchNetworkingV1IngressClassInput.Type;

// Output Schema
export const WatchNetworkingV1IngressClassOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchNetworkingV1IngressClassOutput =
  typeof WatchNetworkingV1IngressClassOutput.Type;

// The operation
/**
 * watch changes to an object of kind IngressClass. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
 */
export const watchNetworkingV1IngressClass =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchNetworkingV1IngressClassInput,
    outputSchema: WatchNetworkingV1IngressClassOutput,
  }));
// Input Schema
export const WatchNetworkingV1IngressClassListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/networking.k8s.io/v1/watch/ingressclasses",
    }),
  );
export type WatchNetworkingV1IngressClassListInput =
  typeof WatchNetworkingV1IngressClassListInput.Type;

// Output Schema
export const WatchNetworkingV1IngressClassListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchNetworkingV1IngressClassListOutput =
  typeof WatchNetworkingV1IngressClassListOutput.Type;

// The operation
/**
 * watch individual changes to a list of IngressClass. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchNetworkingV1IngressClassList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchNetworkingV1IngressClassListInput,
    outputSchema: WatchNetworkingV1IngressClassListOutput,
  }));
// Input Schema
export const WatchNetworkingV1IngressListForAllNamespacesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/networking.k8s.io/v1/watch/ingresses",
    }),
  );
export type WatchNetworkingV1IngressListForAllNamespacesInput =
  typeof WatchNetworkingV1IngressListForAllNamespacesInput.Type;

// Output Schema
export const WatchNetworkingV1IngressListForAllNamespacesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchNetworkingV1IngressListForAllNamespacesOutput =
  typeof WatchNetworkingV1IngressListForAllNamespacesOutput.Type;

// The operation
/**
 * watch individual changes to a list of Ingress. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchNetworkingV1IngressListForAllNamespaces =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchNetworkingV1IngressListForAllNamespacesInput,
    outputSchema: WatchNetworkingV1IngressListForAllNamespacesOutput,
  }));
// Input Schema
export const WatchNetworkingV1NamespacedIngressInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/networking.k8s.io/v1/watch/namespaces/{namespace}/ingresses/{name}",
    }),
  );
export type WatchNetworkingV1NamespacedIngressInput =
  typeof WatchNetworkingV1NamespacedIngressInput.Type;

// Output Schema
export const WatchNetworkingV1NamespacedIngressOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchNetworkingV1NamespacedIngressOutput =
  typeof WatchNetworkingV1NamespacedIngressOutput.Type;

// The operation
/**
 * watch changes to an object of kind Ingress. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
 */
export const watchNetworkingV1NamespacedIngress =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchNetworkingV1NamespacedIngressInput,
    outputSchema: WatchNetworkingV1NamespacedIngressOutput,
  }));
// Input Schema
export const WatchNetworkingV1NamespacedIngressListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/networking.k8s.io/v1/watch/namespaces/{namespace}/ingresses",
    }),
  );
export type WatchNetworkingV1NamespacedIngressListInput =
  typeof WatchNetworkingV1NamespacedIngressListInput.Type;

// Output Schema
export const WatchNetworkingV1NamespacedIngressListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchNetworkingV1NamespacedIngressListOutput =
  typeof WatchNetworkingV1NamespacedIngressListOutput.Type;

// The operation
/**
 * watch individual changes to a list of Ingress. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchNetworkingV1NamespacedIngressList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchNetworkingV1NamespacedIngressListInput,
    outputSchema: WatchNetworkingV1NamespacedIngressListOutput,
  }));
// Input Schema
export const WatchNetworkingV1NamespacedNetworkPolicyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/networking.k8s.io/v1/watch/namespaces/{namespace}/networkpolicies/{name}",
    }),
  );
export type WatchNetworkingV1NamespacedNetworkPolicyInput =
  typeof WatchNetworkingV1NamespacedNetworkPolicyInput.Type;

// Output Schema
export const WatchNetworkingV1NamespacedNetworkPolicyOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchNetworkingV1NamespacedNetworkPolicyOutput =
  typeof WatchNetworkingV1NamespacedNetworkPolicyOutput.Type;

// The operation
/**
 * watch changes to an object of kind NetworkPolicy. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
 */
export const watchNetworkingV1NamespacedNetworkPolicy =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchNetworkingV1NamespacedNetworkPolicyInput,
    outputSchema: WatchNetworkingV1NamespacedNetworkPolicyOutput,
  }));
// Input Schema
export const WatchNetworkingV1NamespacedNetworkPolicyListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/networking.k8s.io/v1/watch/namespaces/{namespace}/networkpolicies",
    }),
  );
export type WatchNetworkingV1NamespacedNetworkPolicyListInput =
  typeof WatchNetworkingV1NamespacedNetworkPolicyListInput.Type;

// Output Schema
export const WatchNetworkingV1NamespacedNetworkPolicyListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchNetworkingV1NamespacedNetworkPolicyListOutput =
  typeof WatchNetworkingV1NamespacedNetworkPolicyListOutput.Type;

// The operation
/**
 * watch individual changes to a list of NetworkPolicy. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchNetworkingV1NamespacedNetworkPolicyList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchNetworkingV1NamespacedNetworkPolicyListInput,
    outputSchema: WatchNetworkingV1NamespacedNetworkPolicyListOutput,
  }));
// Input Schema
export const WatchNetworkingV1NetworkPolicyListForAllNamespacesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/networking.k8s.io/v1/watch/networkpolicies",
    }),
  );
export type WatchNetworkingV1NetworkPolicyListForAllNamespacesInput =
  typeof WatchNetworkingV1NetworkPolicyListForAllNamespacesInput.Type;

// Output Schema
export const WatchNetworkingV1NetworkPolicyListForAllNamespacesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchNetworkingV1NetworkPolicyListForAllNamespacesOutput =
  typeof WatchNetworkingV1NetworkPolicyListForAllNamespacesOutput.Type;

// The operation
/**
 * watch individual changes to a list of NetworkPolicy. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchNetworkingV1NetworkPolicyListForAllNamespaces =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchNetworkingV1NetworkPolicyListForAllNamespacesInput,
    outputSchema: WatchNetworkingV1NetworkPolicyListForAllNamespacesOutput,
  }));
// Input Schema
export const WatchNetworkingV1ServiceCIDRInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/networking.k8s.io/v1/watch/servicecidrs/{name}",
    }),
  );
export type WatchNetworkingV1ServiceCIDRInput =
  typeof WatchNetworkingV1ServiceCIDRInput.Type;

// Output Schema
export const WatchNetworkingV1ServiceCIDROutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchNetworkingV1ServiceCIDROutput =
  typeof WatchNetworkingV1ServiceCIDROutput.Type;

// The operation
/**
 * watch changes to an object of kind ServiceCIDR. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
 */
export const watchNetworkingV1ServiceCIDR =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchNetworkingV1ServiceCIDRInput,
    outputSchema: WatchNetworkingV1ServiceCIDROutput,
  }));
// Input Schema
export const WatchNetworkingV1ServiceCIDRListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/networking.k8s.io/v1/watch/servicecidrs",
    }),
  );
export type WatchNetworkingV1ServiceCIDRListInput =
  typeof WatchNetworkingV1ServiceCIDRListInput.Type;

// Output Schema
export const WatchNetworkingV1ServiceCIDRListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchNetworkingV1ServiceCIDRListOutput =
  typeof WatchNetworkingV1ServiceCIDRListOutput.Type;

// The operation
/**
 * watch individual changes to a list of ServiceCIDR. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchNetworkingV1ServiceCIDRList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchNetworkingV1ServiceCIDRListInput,
    outputSchema: WatchNetworkingV1ServiceCIDRListOutput,
  }));
// Input Schema
export const WatchNetworkingV1beta1IPAddressInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/networking.k8s.io/v1beta1/watch/ipaddresses/{name}",
    }),
  );
export type WatchNetworkingV1beta1IPAddressInput =
  typeof WatchNetworkingV1beta1IPAddressInput.Type;

// Output Schema
export const WatchNetworkingV1beta1IPAddressOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchNetworkingV1beta1IPAddressOutput =
  typeof WatchNetworkingV1beta1IPAddressOutput.Type;

// The operation
/**
 * watch changes to an object of kind IPAddress. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
 */
export const watchNetworkingV1beta1IPAddress =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchNetworkingV1beta1IPAddressInput,
    outputSchema: WatchNetworkingV1beta1IPAddressOutput,
  }));
// Input Schema
export const WatchNetworkingV1beta1IPAddressListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/networking.k8s.io/v1beta1/watch/ipaddresses",
    }),
  );
export type WatchNetworkingV1beta1IPAddressListInput =
  typeof WatchNetworkingV1beta1IPAddressListInput.Type;

// Output Schema
export const WatchNetworkingV1beta1IPAddressListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchNetworkingV1beta1IPAddressListOutput =
  typeof WatchNetworkingV1beta1IPAddressListOutput.Type;

// The operation
/**
 * watch individual changes to a list of IPAddress. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchNetworkingV1beta1IPAddressList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchNetworkingV1beta1IPAddressListInput,
    outputSchema: WatchNetworkingV1beta1IPAddressListOutput,
  }));
// Input Schema
export const WatchNetworkingV1beta1ServiceCIDRInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/networking.k8s.io/v1beta1/watch/servicecidrs/{name}",
    }),
  );
export type WatchNetworkingV1beta1ServiceCIDRInput =
  typeof WatchNetworkingV1beta1ServiceCIDRInput.Type;

// Output Schema
export const WatchNetworkingV1beta1ServiceCIDROutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchNetworkingV1beta1ServiceCIDROutput =
  typeof WatchNetworkingV1beta1ServiceCIDROutput.Type;

// The operation
/**
 * watch changes to an object of kind ServiceCIDR. deprecated: use the 'watch' parameter with a list operation instead, filtered to a single item with the 'fieldSelector' parameter.
 */
export const watchNetworkingV1beta1ServiceCIDR =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchNetworkingV1beta1ServiceCIDRInput,
    outputSchema: WatchNetworkingV1beta1ServiceCIDROutput,
  }));
// Input Schema
export const WatchNetworkingV1beta1ServiceCIDRListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/apis/networking.k8s.io/v1beta1/watch/servicecidrs",
    }),
  );
export type WatchNetworkingV1beta1ServiceCIDRListInput =
  typeof WatchNetworkingV1beta1ServiceCIDRListInput.Type;

// Output Schema
export const WatchNetworkingV1beta1ServiceCIDRListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Unknown,
    type: Schema.String,
  });
export type WatchNetworkingV1beta1ServiceCIDRListOutput =
  typeof WatchNetworkingV1beta1ServiceCIDRListOutput.Type;

// The operation
/**
 * watch individual changes to a list of ServiceCIDR. deprecated: use the 'watch' parameter with a list operation instead.
 */
export const watchNetworkingV1beta1ServiceCIDRList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchNetworkingV1beta1ServiceCIDRListInput,
    outputSchema: WatchNetworkingV1beta1ServiceCIDRListOutput,
  }));
