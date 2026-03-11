import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import {
  BadRequest,
  Forbidden,
  NotFound,
  UnprocessableEntity,
} from "../errors";

// Input Schema
export const RemoveOrganizationTeamMemberInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    organization: Schema.String.pipe(T.PathParam()),
    team: Schema.String.pipe(T.PathParam()),
    id: Schema.String.pipe(T.PathParam()),
    delete_passwords: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/organizations/{organization}/teams/{team}/members/{id}",
    }),
  );
export type RemoveOrganizationTeamMemberInput =
  typeof RemoveOrganizationTeamMemberInput.Type;

// Output Schema
export const RemoveOrganizationTeamMemberOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RemoveOrganizationTeamMemberOutput =
  typeof RemoveOrganizationTeamMemberOutput.Type;

// The operation
/**
 * Remove a member from a team
 *
 * @param organization - The name of the organization
 * @param team - The slug of the team
 * @param id - The ID of the team membership or the ID of the member to remove
 * @param delete_passwords - Whether to delete the member's passwords created through this team
 */
export const removeOrganizationTeamMember =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RemoveOrganizationTeamMemberInput,
    outputSchema: RemoveOrganizationTeamMemberOutput,
    errors: [BadRequest, Forbidden, NotFound, UnprocessableEntity] as const,
  }));
