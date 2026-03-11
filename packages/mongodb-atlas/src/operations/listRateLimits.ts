import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListRateLimitsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  itemsPerPage: Schema.optional(Schema.Number),
  pageNum: Schema.optional(Schema.Number),
  pretty: Schema.optional(Schema.Boolean),
  envelope: Schema.optional(Schema.Boolean),
  groupId: Schema.optional(Schema.String),
  orgId: Schema.optional(Schema.String),
  userId: Schema.optional(Schema.String),
  ipAddress: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  endpointPath: Schema.optional(Schema.String),
}).pipe(T.Http({ method: "GET", path: "/api/atlas/v2/rateLimits" }));
export type ListRateLimitsInput = typeof ListRateLimitsInput.Type;

// Output Schema
export const ListRateLimitsOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ListRateLimitsOutput = typeof ListRateLimitsOutput.Type;

// The operation
/**
 * Return All Rate Limits
 *
 * Get all rate limits for all v2 Atlas Administration API endpoint sets.
 *
 * @param itemsPerPage - Number of items that the response returns per page.
 * @param pageNum - Number of the page that displays the current set of the total objects that the response returns.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies the Atlas Project to request rate limits for. When this parameter is provided, only group scoped endpoint sets are returned and the limits returned are applicable to the specified project. The requesting user must have the Project Read Only role for the specified project.
 * @param orgId - Unique 24-hexadecimal digit string that identifies the Atlas Organization to request rate limits for. When this parameter is provided, only organization scoped endpoint sets are returned and the limits returned are applicable to the specified organization. The requesting user must have the Organization Read Only role for the specified organization.
 * @param userId - A string that identifies the Atlas user to request rate limits for. The ID can for example be the Service Account Client ID or the API Public Key. When this parameter is provided, only user scoped endpoint sets are returned and the limits returned are applicable to the specified user. The requesting user must be the same as the specified user.
 * @param ipAddress - An IP address to request rate limits for. When this parameter is provided, only IP scoped endpoint sets are returned and the limits returned are applicable to the specified IP address. The requesting user must have the same IP address as the one provided in the request.
 * @param name - Filters the returned endpoint sets by the provided endpoint set name. Multiple names may be provided, for example `/rateLimits?name=Name1&name=Name2`. For names that use spaces, replace the space with its URL-encoded value (`%20`).
 * @param endpointPath - Filters the returned endpoint sets by the provided endpoint path. Multiple paths may be provided, for example `/rateLimits?endpointPath=%2Fapi%2Fatlas%2Fv2%2Fclusters&endpointPath=%2Fapi%2Fatlas%2Fv2%2Fgroups%2F%7BgroupId%7D%2F`. Replace `/`, `{` and `}` with their URL-encoded values (`%2F`, `%7B` and `%7D` respectively).
 */
export const listRateLimits = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListRateLimitsInput,
  outputSchema: ListRateLimitsOutput,
}));
