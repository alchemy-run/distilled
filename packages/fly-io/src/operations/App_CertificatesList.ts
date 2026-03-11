import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const App_CertificatesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    filter: Schema.optional(Schema.String),
    cursor: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
  }).pipe(T.Http({ method: "GET", path: "/apps/{app_name}/certificates" }));
export type App_CertificatesListInput = typeof App_CertificatesListInput.Type;

// Output Schema
export const App_CertificatesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    certificates: Schema.optional(
      Schema.Array(
        Schema.Struct({
          acme_alpn_configured: Schema.optional(Schema.Boolean),
          acme_dns_configured: Schema.optional(Schema.Boolean),
          acme_http_configured: Schema.optional(Schema.Boolean),
          acme_requested: Schema.optional(Schema.Boolean),
          configured: Schema.optional(Schema.Boolean),
          created_at: Schema.optional(Schema.String),
          dns_provider: Schema.optional(Schema.String),
          has_custom_certificate: Schema.optional(Schema.Boolean),
          has_fly_certificate: Schema.optional(Schema.Boolean),
          hostname: Schema.optional(Schema.String),
          ownership_txt_configured: Schema.optional(Schema.Boolean),
          status: Schema.optional(Schema.String),
          updated_at: Schema.optional(Schema.String),
        }),
      ),
    ),
    next_cursor: Schema.optional(Schema.String),
    total_count: Schema.optional(Schema.Number),
  });
export type App_CertificatesListOutput = typeof App_CertificatesListOutput.Type;

// The operation
/**
 * List certificates for app
 *
 * @param filter - Hostname filter (substring match)
 * @param cursor - Pagination cursor from previous response
 * @param limit - Number of results per page (default 25, max 500)
 */
export const App_CertificatesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: App_CertificatesListInput,
    outputSchema: App_CertificatesListOutput,
  }),
);
