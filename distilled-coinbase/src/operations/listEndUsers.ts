import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { InvalidRequest } from "../errors";

// Input Schema
export const ListEndUsersInput = Schema.Struct({
  pageSize: Schema.optional(Schema.Number),
  pageToken: Schema.optional(Schema.String),
  sort: Schema.optional(Schema.String),
}).pipe(T.Http({ method: "GET", path: "/v2/end-users" }));
export type ListEndUsersInput = typeof ListEndUsersInput.Type;

// Output Schema
export const ListEndUsersOutput = Schema.Struct({
  endUsers: Schema.Array(
    Schema.Struct({
      userId: Schema.String,
      authenticationMethods: Schema.Array(
        Schema.Union([
          Schema.Struct({
            type: Schema.Literals(["email"]),
            email: Schema.String,
          }),
          Schema.Struct({
            type: Schema.Literals(["sms"]),
            phoneNumber: Schema.String,
          }),
          Schema.Struct({
            type: Schema.Literals(["jwt"]),
            kid: Schema.String,
            sub: Schema.String,
          }),
          Schema.Struct({
            type: Schema.Literals(["google", "apple", "x"]),
            sub: Schema.String,
            email: Schema.optional(Schema.String),
            name: Schema.optional(Schema.String),
            username: Schema.optional(Schema.String),
          }),
        ]),
      ),
      mfaMethods: Schema.optional(
        Schema.Struct({
          enrollmentPromptedAt: Schema.optional(Schema.String),
          totp: Schema.optional(
            Schema.Struct({
              enrolledAt: Schema.String,
            }),
          ),
          sms: Schema.optional(
            Schema.Struct({
              enrolledAt: Schema.String,
            }),
          ),
        }),
      ),
      evmAccounts: Schema.Array(Schema.String),
      evmAccountObjects: Schema.Array(
        Schema.Struct({
          address: Schema.String,
          createdAt: Schema.String,
        }),
      ),
      evmSmartAccounts: Schema.Array(Schema.String),
      evmSmartAccountObjects: Schema.Array(
        Schema.Struct({
          address: Schema.String,
          ownerAddresses: Schema.Array(Schema.String),
          createdAt: Schema.String,
        }),
      ),
      solanaAccounts: Schema.Array(Schema.String),
      solanaAccountObjects: Schema.Array(
        Schema.Struct({
          address: Schema.String,
          createdAt: Schema.String,
        }),
      ),
      createdAt: Schema.String,
    }),
  ),
  nextPageToken: Schema.optional(Schema.String),
});
export type ListEndUsersOutput = typeof ListEndUsersOutput.Type;

// The operation
/**
 * List end users
 *
 * Lists the end users belonging to the developer's CDP Project.
 * By default, the response is sorted by creation date in ascending order and paginated to 20 users per page.
 *
 * @param pageSize - The number of end users to return per page.
 * @param pageToken - The token for the desired page of end users. Will be empty if there are no more end users to fetch.
 * @param sort - Sort end users. Defaults to ascending order (oldest first).
 */
export const listEndUsers = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListEndUsersInput,
  outputSchema: ListEndUsersOutput,
  errors: [InvalidRequest],
}));
