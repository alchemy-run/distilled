import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostIssuingPersonalizationDesignsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    card_logo: Schema.optional(Schema.String),
    carrier_text: Schema.optional(
      Schema.Struct({
        footer_body: Schema.optional(Schema.Unknown),
        footer_title: Schema.optional(Schema.Unknown),
        header_body: Schema.optional(Schema.Unknown),
        header_title: Schema.optional(Schema.Unknown),
      }),
    ),
    expand: Schema.optional(Schema.Array(Schema.String)),
    lookup_key: Schema.optional(Schema.String),
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    name: Schema.optional(Schema.String),
    physical_bundle: Schema.String,
    preferences: Schema.optional(
      Schema.Struct({
        is_default: Schema.Boolean,
      }),
    ),
    transfer_lookup_key: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/issuing/personalization_designs",
      contentType: "form-urlencoded",
    }),
  );
export type PostIssuingPersonalizationDesignsInput =
  typeof PostIssuingPersonalizationDesignsInput.Type;

// Output Schema
export const PostIssuingPersonalizationDesignsOutput =
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
export type PostIssuingPersonalizationDesignsOutput =
  typeof PostIssuingPersonalizationDesignsOutput.Type;

// The operation
/**
 * Create a personalization design
 *
 * <p>Creates a personalization design object.</p>
 */
export const PostIssuingPersonalizationDesigns =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostIssuingPersonalizationDesignsInput,
    outputSchema: PostIssuingPersonalizationDesignsOutput,
  }));
