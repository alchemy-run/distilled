import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { NotFound } from "../errors";

// Input Schema
export const GetEndUserInput = Schema.Struct({
  userId: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "GET", path: "/v2/end-users/{userId}" }));
export type GetEndUserInput = typeof GetEndUserInput.Type;

// Output Schema
export const GetEndUserOutput = Schema.Struct({
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
});
export type GetEndUserOutput = typeof GetEndUserOutput.Type;

// The operation
/**
 * Get an end user
 *
 * Gets an end user by ID.
 * This API is intended to be used by the developer's own backend, and is authenticated using the developer's CDP API key.
 *
 * @param userId - The ID of the end user to get.
 */
export const getEndUser = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetEndUserInput,
  outputSchema: GetEndUserOutput,
  errors: [NotFound],
}));
