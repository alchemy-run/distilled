import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetGroupAccessListEntryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    entryValue: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/groups/{groupId}/accessList/{entryValue}",
    }),
  );
export type GetGroupAccessListEntryInput =
  typeof GetGroupAccessListEntryInput.Type;

// Output Schema
export const GetGroupAccessListEntryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GetGroupAccessListEntryOutput =
  typeof GetGroupAccessListEntryOutput.Type;

// The operation
/**
 * Return One Project IP Access List Entry
 *
 * Returns one access list entry from the specified project's IP access list. Each entry in the project's IP access list contains either one IP address or one CIDR-notated block of IP addresses. MongoDB Cloud only allows client connections to the cluster from entries in the project's IP access list. To use this resource, the requesting Service Account or API Key must have the Project Read Only or Project Charts Admin roles. This resource replaces the whitelist resource. MongoDB Cloud removed whitelists in July 2021. Update your applications to use this new resource. This endpoint (`/groups/{GROUP-ID}/accessList`) manages the Project IP Access List. It doesn't manage the access list for MongoDB Cloud organizations. The Programmatic API Keys endpoint (`/orgs/{ORG-ID}/apiKeys/{API-KEY-ID}/accesslist`) manages those access lists.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param entryValue - Access list entry that you want to return from the project's IP access list. This value can use one of the following: one AWS security group ID, one IP address, or one CIDR block of addresses. For CIDR blocks that use a subnet mask, replace the forward slash (`/`) with its URL-encoded value (`%2F`).
 */
export const getGroupAccessListEntry = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetGroupAccessListEntryInput,
    outputSchema: GetGroupAccessListEntryOutput,
  }),
);
