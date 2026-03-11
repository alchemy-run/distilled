import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetApplePayDomainsDomainInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    domain: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/apple_pay/domains/{domain}",
      contentType: "form-urlencoded",
    }),
  );
export type GetApplePayDomainsDomainInput =
  typeof GetApplePayDomainsDomainInput.Type;

// Output Schema
export const GetApplePayDomainsDomainOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    created: Schema.Number,
    domain_name: Schema.String,
    id: Schema.String,
    livemode: Schema.Boolean,
    object: Schema.Literals(["apple_pay_domain"]),
  });
export type GetApplePayDomainsDomainOutput =
  typeof GetApplePayDomainsDomainOutput.Type;

// The operation
/**
 * <p>Retrieve an apple pay domain.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetApplePayDomainsDomain = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetApplePayDomainsDomainInput,
    outputSchema: GetApplePayDomainsDomainOutput,
  }),
);
