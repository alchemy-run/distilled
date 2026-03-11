import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetGroupEncryptionAtRestInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/groups/{groupId}/encryptionAtRest",
    }),
  );
export type GetGroupEncryptionAtRestInput =
  typeof GetGroupEncryptionAtRestInput.Type;

// Output Schema
export const GetGroupEncryptionAtRestOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GetGroupEncryptionAtRestOutput =
  typeof GetGroupEncryptionAtRestOutput.Type;

// The operation
/**
 * Return One Configuration for Encryption at Rest Using Customer-Managed Keys for One Project
 *
 * Returns the configuration for encryption at rest using the keys you manage through your cloud provider. MongoDB Cloud encrypts all storage even if you don't use your own key management. This resource requires the requesting Service Account or API Key to have the Project Owner role.
 * **LIMITED TO M10 OR GREATER:** MongoDB Cloud limits this feature to dedicated cluster tiers of M10 and greater.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 */
export const getGroupEncryptionAtRest = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetGroupEncryptionAtRestInput,
    outputSchema: GetGroupEncryptionAtRestOutput,
  }),
);
