import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostCustomersCustomerSourcesIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    customer: Schema.String.pipe(T.PathParam()),
    id: Schema.String.pipe(T.PathParam()),
    account_holder_name: Schema.optional(Schema.String),
    account_holder_type: Schema.optional(
      Schema.Literals(["company", "individual"]),
    ),
    address_city: Schema.optional(Schema.String),
    address_country: Schema.optional(Schema.String),
    address_line1: Schema.optional(Schema.String),
    address_line2: Schema.optional(Schema.String),
    address_state: Schema.optional(Schema.String),
    address_zip: Schema.optional(Schema.String),
    exp_month: Schema.optional(Schema.String),
    exp_year: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.Array(Schema.String)),
    metadata: Schema.optional(Schema.Unknown),
    name: Schema.optional(Schema.String),
    owner: Schema.optional(
      Schema.Struct({
        address: Schema.optional(
          Schema.Struct({
            city: Schema.optional(Schema.String),
            country: Schema.optional(Schema.String),
            line1: Schema.optional(Schema.String),
            line2: Schema.optional(Schema.String),
            postal_code: Schema.optional(Schema.String),
            state: Schema.optional(Schema.String),
          }),
        ),
        email: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        phone: Schema.optional(Schema.String),
      }),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/customers/{customer}/sources/{id}",
      contentType: "form-urlencoded",
    }),
  );
export type PostCustomersCustomerSourcesIdInput =
  typeof PostCustomersCustomerSourcesIdInput.Type;

// Output Schema
export const PostCustomersCustomerSourcesIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type PostCustomersCustomerSourcesIdOutput =
  typeof PostCustomersCustomerSourcesIdOutput.Type;

// The operation
/**
 * <p>Update a specified source for a given customer.</p>
 */
export const PostCustomersCustomerSourcesId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostCustomersCustomerSourcesIdInput,
    outputSchema: PostCustomersCustomerSourcesIdOutput,
  }));
