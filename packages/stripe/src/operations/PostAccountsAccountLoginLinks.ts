import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostAccountsAccountLoginLinksInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    account: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.Array(Schema.String)),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/accounts/{account}/login_links",
      contentType: "form-urlencoded",
    }),
  );
export type PostAccountsAccountLoginLinksInput =
  typeof PostAccountsAccountLoginLinksInput.Type;

// Output Schema
export const PostAccountsAccountLoginLinksOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    created: Schema.Number,
    object: Schema.Literals(["login_link"]),
    url: Schema.String,
  });
export type PostAccountsAccountLoginLinksOutput =
  typeof PostAccountsAccountLoginLinksOutput.Type;

// The operation
/**
 * Create a login link
 *
 * <p>Creates a login link for a connected account to access the Express Dashboard.</p>
 * <p><strong>You can only create login links for accounts that use the <a href="/connect/express-dashboard">Express Dashboard</a> and are connected to your platform</strong>.</p>
 */
export const PostAccountsAccountLoginLinks =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostAccountsAccountLoginLinksInput,
    outputSchema: PostAccountsAccountLoginLinksOutput,
  }));
