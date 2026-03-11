import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const CreateGroupCloudProviderAccessInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/api/atlas/v2/groups/{groupId}/cloudProviderAccess",
    }),
  );
export type CreateGroupCloudProviderAccessInput =
  typeof CreateGroupCloudProviderAccessInput.Type;

// Output Schema
export const CreateGroupCloudProviderAccessOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CreateGroupCloudProviderAccessOutput =
  typeof CreateGroupCloudProviderAccessOutput.Type;

// The operation
/**
 * Create One Cloud Provider Access Role
 *
 * Creates one access role for the specified cloud provider. Some MongoDB Cloud features use these cloud provider access roles for authentication. To use this resource, the requesting Service Account or API Key must have the Project Owner role. For the GCP provider, if the project folder is not yet provisioned, Atlas will now create the role asynchronously. An intermediate role with status `IN_PROGRESS` will be returned, and the final service account will be provisioned. Once the GCP project is set up, subsequent requests will create the service account synchronously.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 */
export const createGroupCloudProviderAccess =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateGroupCloudProviderAccessInput,
    outputSchema: CreateGroupCloudProviderAccessOutput,
  }));
