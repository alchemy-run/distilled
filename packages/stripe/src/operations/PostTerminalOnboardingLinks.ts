import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostTerminalOnboardingLinksInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    expand: Schema.optional(Schema.Array(Schema.String)),
    link_options: Schema.Struct({
      apple_terms_and_conditions: Schema.optional(
        Schema.Struct({
          allow_relinking: Schema.optional(Schema.Boolean),
          merchant_display_name: Schema.String,
        }),
      ),
    }),
    link_type: Schema.Literals(["apple_terms_and_conditions"]),
    on_behalf_of: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/terminal/onboarding_links",
      contentType: "form-urlencoded",
    }),
  );
export type PostTerminalOnboardingLinksInput =
  typeof PostTerminalOnboardingLinksInput.Type;

// Output Schema
export const PostTerminalOnboardingLinksOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    link_options: Schema.Struct({
      apple_terms_and_conditions: Schema.Unknown,
    }),
    link_type: Schema.Literals(["apple_terms_and_conditions"]),
    object: Schema.Literals(["terminal.onboarding_link"]),
    on_behalf_of: Schema.NullOr(Schema.String),
    redirect_url: Schema.String,
  });
export type PostTerminalOnboardingLinksOutput =
  typeof PostTerminalOnboardingLinksOutput.Type;

// The operation
/**
 * Create an Onboarding Link
 *
 * <p>Creates a new <code>OnboardingLink</code> object that contains a redirect_url used for onboarding onto Tap to Pay on iPhone.</p>
 */
export const PostTerminalOnboardingLinks = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PostTerminalOnboardingLinksInput,
    outputSchema: PostTerminalOnboardingLinksOutput,
  }),
);
