import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignRejectInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    personalization_design: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.Array(Schema.String)),
    rejection_reasons: Schema.Struct({
      card_logo: Schema.optional(
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
      carrier_text: Schema.optional(
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
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/test_helpers/issuing/personalization_designs/{personalization_design}/reject",
      contentType: "form-urlencoded",
    }),
  );
export type PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignRejectInput =
  typeof PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignRejectInput.Type;

// Output Schema
export const PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignRejectOutput =
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
export type PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignRejectOutput =
  typeof PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignRejectOutput.Type;

// The operation
/**
 * Reject a testmode personalization design
 *
 * <p>Updates the <code>status</code> of the specified testmode personalization design object to <code>rejected</code>.</p>
 */
export const PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignReject =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignRejectInput,
    outputSchema:
      PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignRejectOutput,
  }));
