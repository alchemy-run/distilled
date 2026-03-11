import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetClimateSuppliersSupplierInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    supplier: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/climate/suppliers/{supplier}",
      contentType: "form-urlencoded",
    }),
  );
export type GetClimateSuppliersSupplierInput =
  typeof GetClimateSuppliersSupplierInput.Type;

// Output Schema
export const GetClimateSuppliersSupplierOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    info_url: Schema.String,
    livemode: Schema.Boolean,
    locations: Schema.Array(
      Schema.Struct({
        city: Schema.NullOr(Schema.String),
        country: Schema.String,
        latitude: Schema.NullOr(Schema.Number),
        longitude: Schema.NullOr(Schema.Number),
        region: Schema.NullOr(Schema.String),
      }),
    ),
    name: Schema.String,
    object: Schema.Literals(["climate.supplier"]),
    removal_pathway: Schema.Literals([
      "biomass_carbon_removal_and_storage",
      "direct_air_capture",
      "enhanced_weathering",
    ]),
  });
export type GetClimateSuppliersSupplierOutput =
  typeof GetClimateSuppliersSupplierOutput.Type;

// The operation
/**
 * Retrieve a supplier
 *
 * <p>Retrieves a Climate supplier object.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetClimateSuppliersSupplier = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetClimateSuppliersSupplierInput,
    outputSchema: GetClimateSuppliersSupplierOutput,
  }),
);
