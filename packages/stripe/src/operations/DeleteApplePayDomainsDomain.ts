import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteApplePayDomainsDomainInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    domain: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/v1/apple_pay/domains/{domain}",
      contentType: "form-urlencoded",
    }),
  );
export type DeleteApplePayDomainsDomainInput =
  typeof DeleteApplePayDomainsDomainInput.Type;

// Output Schema
export const DeleteApplePayDomainsDomainOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    deleted: Schema.Literals(["true"]),
    id: Schema.String,
    object: Schema.Literals(["apple_pay_domain"]),
  });
export type DeleteApplePayDomainsDomainOutput =
  typeof DeleteApplePayDomainsDomainOutput.Type;

// The operation
/**
 * <p>Delete an apple pay domain.</p>
 */
export const DeleteApplePayDomainsDomain = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeleteApplePayDomainsDomainInput,
    outputSchema: DeleteApplePayDomainsDomainOutput,
  }),
);
