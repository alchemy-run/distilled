import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetCustomersCustomerSourcesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    customer: Schema.String.pipe(T.PathParam()),
    ending_before: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
    object: Schema.optional(Schema.String),
    starting_after: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/customers/{customer}/sources",
      contentType: "form-urlencoded",
    }),
  );
export type GetCustomersCustomerSourcesInput =
  typeof GetCustomersCustomerSourcesInput.Type;

// Output Schema
export const GetCustomersCustomerSourcesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(Schema.Unknown),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  });
export type GetCustomersCustomerSourcesOutput =
  typeof GetCustomersCustomerSourcesOutput.Type;

// The operation
/**
 * <p>List sources for a specified customer.</p>
 *
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param object - Filter sources according to a particular object type.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 */
export const GetCustomersCustomerSources = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetCustomersCustomerSourcesInput,
    outputSchema: GetCustomersCustomerSourcesOutput,
  }),
);
