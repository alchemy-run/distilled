import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetIssuingPersonalizationDesignsPersonalizationDesignInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    personalization_design: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/issuing/personalization_designs/{personalization_design}",
      contentType: "form-urlencoded",
    }),
  );
export type GetIssuingPersonalizationDesignsPersonalizationDesignInput =
  typeof GetIssuingPersonalizationDesignsPersonalizationDesignInput.Type;

// Output Schema
export const GetIssuingPersonalizationDesignsPersonalizationDesignOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    card_logo: Schema.Unknown,
    carrier_text: Schema.Unknown,
    created: Schema.Number,
    id: Schema.String,
    livemode: Schema.Boolean,
    lookup_key: Schema.NullOr(Schema.String),
    metadata: Schema.Record(Schema.String, Schema.String),
    name: Schema.NullOr(Schema.String),
    object: Schema.Literals(["issuing.personalization_design"]),
    physical_bundle: Schema.Unknown,
    preferences: Schema.Struct({
      is_default: Schema.Boolean,
      is_platform_default: Schema.NullOr(Schema.Boolean),
    }),
    rejection_reasons: Schema.Struct({
      card_logo: Schema.NullOr(
        Schema.Array(
          Schema.Literals([
            "geographic_location",
            "inappropriate",
            "network_name",
            "non_binary_image",
            "non_fiat_currency",
            "other",
            "other_entity",
            "promotional_material",
          ]),
        ),
      ),
      carrier_text: Schema.NullOr(
        Schema.Array(
          Schema.Literals([
            "geographic_location",
            "inappropriate",
            "network_name",
            "non_fiat_currency",
            "other",
            "other_entity",
            "promotional_material",
          ]),
        ),
      ),
    }),
    status: Schema.Literals(["active", "inactive", "rejected", "review"]),
  });
export type GetIssuingPersonalizationDesignsPersonalizationDesignOutput =
  typeof GetIssuingPersonalizationDesignsPersonalizationDesignOutput.Type;

// The operation
/**
 * Retrieve a personalization design
 *
 * <p>Retrieves a personalization design object.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetIssuingPersonalizationDesignsPersonalizationDesign =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetIssuingPersonalizationDesignsPersonalizationDesignInput,
    outputSchema: GetIssuingPersonalizationDesignsPersonalizationDesignOutput,
  }));
