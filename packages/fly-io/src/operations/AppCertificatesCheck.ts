import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const AppCertificatesCheckInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/apps/{app_name}/certificates/{hostname}/check",
    }),
  );
export type AppCertificatesCheckInput = typeof AppCertificatesCheckInput.Type;

// Output Schema
export const AppCertificatesCheckOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    acme_requested: Schema.optional(Schema.Boolean),
    certificates: Schema.optional(
      Schema.Array(
        Schema.Struct({
          created_at: Schema.optional(Schema.String),
          expires_at: Schema.optional(Schema.String),
          issued: Schema.optional(
            Schema.Array(
              Schema.Struct({
                certificate_authority: Schema.optional(Schema.String),
                expires_at: Schema.optional(Schema.String),
                type: Schema.optional(Schema.Literals(["rsa", "ecdsa"])),
              }),
            ),
          ),
          issuer: Schema.optional(Schema.String),
          source: Schema.optional(Schema.Literals(["custom", "fly"])),
          status: Schema.optional(
            Schema.Literals([
              "active",
              "pending_ownership",
              "pending_validation",
            ]),
          ),
        }),
      ),
    ),
    configured: Schema.optional(Schema.Boolean),
    dns_provider: Schema.optional(Schema.String),
    dns_records: Schema.optional(
      Schema.Struct({
        a: Schema.optional(Schema.Array(Schema.String)),
        aaaa: Schema.optional(Schema.Array(Schema.String)),
        acme_challenge_cname: Schema.optional(Schema.String),
        cname: Schema.optional(Schema.Array(Schema.String)),
        ownership_txt: Schema.optional(Schema.String),
        resolved_addresses: Schema.optional(Schema.Array(Schema.String)),
        soa: Schema.optional(Schema.String),
      }),
    ),
    dns_requirements: Schema.optional(
      Schema.Struct({
        a: Schema.optional(Schema.Array(Schema.String)),
        aaaa: Schema.optional(Schema.Array(Schema.String)),
        acme_challenge: Schema.optional(
          Schema.Struct({
            name: Schema.optional(Schema.String),
            target: Schema.optional(Schema.String),
          }),
        ),
        cname: Schema.optional(Schema.String),
        ownership: Schema.optional(
          Schema.Struct({
            app_value: Schema.optional(Schema.String),
            name: Schema.optional(Schema.String),
            org_value: Schema.optional(Schema.String),
          }),
        ),
      }),
    ),
    hostname: Schema.optional(Schema.String),
    rate_limited_until: Schema.optional(Schema.String),
    status: Schema.optional(Schema.String),
    validation: Schema.optional(
      Schema.Struct({
        alpn_configured: Schema.optional(Schema.Boolean),
        dns_configured: Schema.optional(Schema.Boolean),
        http_configured: Schema.optional(Schema.Boolean),
        ownership_txt_configured: Schema.optional(Schema.Boolean),
      }),
    ),
    validation_errors: Schema.optional(
      Schema.Array(
        Schema.Struct({
          code: Schema.optional(Schema.String),
          message: Schema.optional(Schema.String),
          remediation: Schema.optional(Schema.String),
          timestamp: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type AppCertificatesCheckOutput = typeof AppCertificatesCheckOutput.Type;

// The operation
/**
 * Check DNS and re-validate certificate
 */
export const AppCertificatesCheck = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AppCertificatesCheckInput,
    outputSchema: AppCertificatesCheckOutput,
  }),
);
