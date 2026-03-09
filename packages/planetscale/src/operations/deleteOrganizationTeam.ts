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
export const DeleteOrganizationTeamInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  team: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/organizations/{organization}/teams/{team}",
  }),
);
export type DeleteOrganizationTeamInput =
  typeof DeleteOrganizationTeamInput.Type;

// Output Schema
export const DeleteOrganizationTeamOutput = Schema.Void;
export type DeleteOrganizationTeamOutput =
  typeof DeleteOrganizationTeamOutput.Type;

// The operation
/**
 * Delete an organization team
 *
 * @param organization - The name of the organization
 * @param team - The slug of the team
 */
export const deleteOrganizationTeam = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeleteOrganizationTeamInput,
    outputSchema: DeleteOrganizationTeamOutput,
    errors: [BadRequest, Forbidden, NotFound, UnprocessableEntity] as const,
  }),
);
