import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const UpdateGroupEncryptionAtRestInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/api/atlas/v2/groups/{groupId}/encryptionAtRest",
    }),
  );
export type UpdateGroupEncryptionAtRestInput =
  typeof UpdateGroupEncryptionAtRestInput.Type;

// Output Schema
export const UpdateGroupEncryptionAtRestOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type UpdateGroupEncryptionAtRestOutput =
  typeof UpdateGroupEncryptionAtRestOutput.Type;

// The operation
/**
 * Update Encryption at Rest Configuration in One Project
 *
 * Updates the configuration for encryption at rest using the keys you manage through your cloud provider. MongoDB Cloud encrypts all storage even if you don't use your own key management. This resource requires the requesting Service Account or API Key to have the Project Owner role. This feature isn't available for `M0` free clusters, `M2`, `M5`, or serverless clusters.
 * After you configure at least one Encryption at Rest using a Customer Key Management provider for the MongoDB Cloud project, Project Owners can enable Encryption at Rest using Customer Key Management for each MongoDB Cloud cluster for which they require encryption. The Encryption at Rest using Customer Key Management provider doesn't have to match the cluster cloud service provider. MongoDB Cloud doesn't automatically rotate user-managed encryption keys. Defer to your preferred Encryption at Rest using Customer Key Management provider's documentation and guidance for best practices on key rotation. MongoDB Cloud automatically creates a 90-day key rotation alert when you configure Encryption at Rest using Customer Key Management using your Key Management in an MongoDB Cloud project. MongoDB Cloud encrypts all storage whether or not you use your own key management.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 */
export const updateGroupEncryptionAtRest = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: UpdateGroupEncryptionAtRestInput,
    outputSchema: UpdateGroupEncryptionAtRestOutput,
  }),
);
