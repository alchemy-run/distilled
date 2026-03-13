/**
 * Kubernetes Authentication API
 *
 * Generated from the Kubernetes OpenAPI spec.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";

// Input Schema
export const CreateAuthenticationV1SelfSubjectReviewInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/apis/authentication.k8s.io/v1/selfsubjectreviews",
    }),
  );
export type CreateAuthenticationV1SelfSubjectReviewInput =
  typeof CreateAuthenticationV1SelfSubjectReviewInput.Type;

// Output Schema
export const CreateAuthenticationV1SelfSubjectReviewOutput =
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
    status: Schema.optional(
      Schema.Struct({
        userInfo: Schema.optional(
          Schema.Struct({
            extra: Schema.optional(
              Schema.Record(Schema.String, Schema.Array(Schema.String)),
            ),
            groups: Schema.optional(Schema.Array(Schema.String)),
            uid: Schema.optional(Schema.String),
            username: Schema.optional(Schema.String),
          }),
        ),
      }),
    ),
  });
export type CreateAuthenticationV1SelfSubjectReviewOutput =
  typeof CreateAuthenticationV1SelfSubjectReviewOutput.Type;

// The operation
/**
 * create a SelfSubjectReview
 */
export const createAuthenticationV1SelfSubjectReview =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateAuthenticationV1SelfSubjectReviewInput,
    outputSchema: CreateAuthenticationV1SelfSubjectReviewOutput,
  }));
// Input Schema
export const CreateAuthenticationV1TokenReviewInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/apis/authentication.k8s.io/v1/tokenreviews",
    }),
  );
export type CreateAuthenticationV1TokenReviewInput =
  typeof CreateAuthenticationV1TokenReviewInput.Type;

// Output Schema
export const CreateAuthenticationV1TokenReviewOutput =
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
      audiences: Schema.optional(Schema.Array(Schema.String)),
      token: Schema.String,
    }),
    status: Schema.optional(
      Schema.Struct({
        audiences: Schema.optional(Schema.Array(Schema.String)),
        authenticated: Schema.optional(Schema.Boolean),
        error: Schema.optional(Schema.String),
        user: Schema.optional(
          Schema.Struct({
            extra: Schema.optional(
              Schema.Record(Schema.String, Schema.Array(Schema.String)),
            ),
            groups: Schema.optional(Schema.Array(Schema.String)),
            uid: Schema.optional(Schema.String),
            username: Schema.optional(Schema.String),
          }),
        ),
      }),
    ),
  });
export type CreateAuthenticationV1TokenReviewOutput =
  typeof CreateAuthenticationV1TokenReviewOutput.Type;

// The operation
/**
 * create a TokenReview
 */
export const createAuthenticationV1TokenReview =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateAuthenticationV1TokenReviewInput,
    outputSchema: CreateAuthenticationV1TokenReviewOutput,
  }));
// Input Schema
export const GetAuthenticationAPIGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/apis/authentication.k8s.io/" }),
  );
export type GetAuthenticationAPIGroupInput =
  typeof GetAuthenticationAPIGroupInput.Type;

// Output Schema
export const GetAuthenticationAPIGroupOutput =
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
export type GetAuthenticationAPIGroupOutput =
  typeof GetAuthenticationAPIGroupOutput.Type;

// The operation
/**
 * get information of a group
 */
export const getAuthenticationAPIGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetAuthenticationAPIGroupInput,
    outputSchema: GetAuthenticationAPIGroupOutput,
  }),
);
// Input Schema
export const GetAuthenticationV1APIResourcesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/apis/authentication.k8s.io/v1/" }),
  );
export type GetAuthenticationV1APIResourcesInput =
  typeof GetAuthenticationV1APIResourcesInput.Type;

// Output Schema
export const GetAuthenticationV1APIResourcesOutput =
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
export type GetAuthenticationV1APIResourcesOutput =
  typeof GetAuthenticationV1APIResourcesOutput.Type;

// The operation
/**
 * get available resources
 */
export const getAuthenticationV1APIResources =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetAuthenticationV1APIResourcesInput,
    outputSchema: GetAuthenticationV1APIResourcesOutput,
  }));
