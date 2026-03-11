import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1VerifyDnsConfigInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    ref: Schema.String.pipe(T.PathParam()),
  },
).pipe(
  T.Http({
    method: "POST",
    path: "/v1/projects/{ref}/custom-hostname/reverify",
  }),
);
export type V1VerifyDnsConfigInput = typeof V1VerifyDnsConfigInput.Type;

// Output Schema
export const V1VerifyDnsConfigOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    status: Schema.Literals([
      "1_not_started",
      "2_initiated",
      "3_challenge_verified",
      "4_origin_setup_completed",
      "5_services_reconfigured",
    ]),
    custom_hostname: Schema.String,
    data: Schema.Struct({
      success: Schema.Boolean,
      errors: Schema.Array(Schema.Unknown),
      messages: Schema.Array(Schema.Unknown),
      result: Schema.Struct({
        id: Schema.String,
        hostname: Schema.String,
        ssl: Schema.Struct({
          status: Schema.String,
          validation_records: Schema.Array(
            Schema.Struct({
              txt_name: Schema.String,
              txt_value: Schema.String,
            }),
          ),
          validation_errors: Schema.optional(
            Schema.Array(
              Schema.Struct({
                message: Schema.String,
              }),
            ),
          ),
        }),
        ownership_verification: Schema.Struct({
          type: Schema.String,
          name: Schema.String,
          value: Schema.String,
        }),
        custom_origin_server: Schema.String,
        verification_errors: Schema.optional(Schema.Array(Schema.String)),
        status: Schema.String,
      }),
    }),
  });
export type V1VerifyDnsConfigOutput = typeof V1VerifyDnsConfigOutput.Type;

// The operation
/**
 * [Beta] Attempts to verify the DNS configuration for project's custom hostname configuration
 *
 * @param ref - Project ref
 */
export const v1VerifyDnsConfig = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1VerifyDnsConfigInput,
  outputSchema: V1VerifyDnsConfigOutput,
}));
