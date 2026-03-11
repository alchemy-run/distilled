import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetRateLimitInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  endpointSetId: Schema.String.pipe(T.PathParam()),
  pretty: Schema.optional(Schema.Boolean),
  envelope: Schema.optional(Schema.Boolean),
  groupId: Schema.optional(Schema.String),
  orgId: Schema.optional(Schema.String),
  userId: Schema.optional(Schema.String),
  ipAddress: Schema.optional(Schema.String),
}).pipe(
  T.Http({ method: "GET", path: "/api/atlas/v2/rateLimits/{endpointSetId}" }),
);
export type GetRateLimitInput = typeof GetRateLimitInput.Type;

// Output Schema
export const GetRateLimitOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GetRateLimitOutput = typeof GetRateLimitOutput.Type;

// The operation
/**
 * Return One Rate Limit
 *
 * Get one rate limit endpoint set.
 *
 * @param endpointSetId - The ID of the rate limit endpoint set.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies the Atlas Project to request rate limits for. When this parameter is provided, the limits returned are applicable to the specified project. The requesting user must have the Project Read Only role for the specified project.
 * @param orgId - Unique 24-hexadecimal digit string that identifies the Atlas Organization to request rate limits for. When this parameter is provided, the limits returned are applicable to the specified organization. The requesting user must have the Organization Read Only role for the specified organization.
 * @param userId - A string that identifies the Atlas user to request rate limits for. The ID can for example be the Service Account Client ID or the API Public Key. When this parameter is provided, the limits returned are applicable to the specified  user. The requesting user must be the same as the specified user.
 * @param ipAddress - An IP address to request rate limits for. When this parameter is provided, the limits returned are applicable to the specified IP address. The requesting user must have the same IP address as the one provided in the request.
 */
export const getRateLimit = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetRateLimitInput,
  outputSchema: GetRateLimitOutput,
}));
