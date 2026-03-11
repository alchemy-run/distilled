import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostApplePayDomainsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    domain_name: Schema.String,
    expand: Schema.optional(Schema.Array(Schema.String)),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/apple_pay/domains",
      contentType: "form-urlencoded",
    }),
  );
export type PostApplePayDomainsInput = typeof PostApplePayDomainsInput.Type;

// Output Schema
export const PostApplePayDomainsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    created: Schema.Number,
    domain_name: Schema.String,
    id: Schema.String,
    livemode: Schema.Boolean,
    object: Schema.Literals(["apple_pay_domain"]),
  });
export type PostApplePayDomainsOutput = typeof PostApplePayDomainsOutput.Type;

// The operation
/**
 * <p>Create an apple pay domain.</p>
 */
export const PostApplePayDomains = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PostApplePayDomainsInput,
  outputSchema: PostApplePayDomainsOutput,
}));
