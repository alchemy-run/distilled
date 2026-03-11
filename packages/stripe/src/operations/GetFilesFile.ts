import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetFilesFileInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  file: Schema.String.pipe(T.PathParam()),
  expand: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/v1/files/{file}",
    contentType: "form-urlencoded",
  }),
);
export type GetFilesFileInput = typeof GetFilesFileInput.Type;

// Output Schema
export const GetFilesFileOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  created: Schema.Number,
  expires_at: Schema.NullOr(Schema.Number),
  filename: Schema.NullOr(Schema.String),
  id: Schema.String,
  links: Schema.optional(
    Schema.NullOr(
      Schema.Struct({
        data: Schema.Array(
          Schema.Struct({
            created: Schema.Number,
            expired: Schema.Boolean,
            expires_at: Schema.NullOr(Schema.Number),
            file: Schema.Unknown,
            id: Schema.String,
            livemode: Schema.Boolean,
            metadata: Schema.Record(Schema.String, Schema.String),
            object: Schema.Literals(["file_link"]),
            url: Schema.NullOr(Schema.String),
          }),
        ),
        has_more: Schema.Boolean,
        object: Schema.Literals(["list"]),
        url: Schema.String,
      }),
    ),
  ),
  object: Schema.Literals(["file"]),
  purpose: Schema.Literals([
    "account_requirement",
    "additional_verification",
    "business_icon",
    "business_logo",
    "customer_signature",
    "dispute_evidence",
    "document_provider_identity_document",
    "finance_report_run",
    "financial_account_statement",
    "identity_document",
    "identity_document_downloadable",
    "issuing_regulatory_reporting",
    "pci_document",
    "platform_terms_of_service",
    "selfie",
    "sigma_scheduled_query",
    "tax_document_user_upload",
    "terminal_android_apk",
    "terminal_reader_splashscreen",
    "terminal_wifi_certificate",
    "terminal_wifi_private_key",
  ]),
  size: Schema.Number,
  title: Schema.NullOr(Schema.String),
  type: Schema.NullOr(Schema.String),
  url: Schema.NullOr(Schema.String),
});
export type GetFilesFileOutput = typeof GetFilesFileOutput.Type;

// The operation
/**
 * Retrieve a file
 *
 * <p>Retrieves the details of an existing file object. After you supply a unique file ID, Stripe returns the corresponding file object. Learn how to <a href="/docs/file-upload#download-file-contents">access file contents</a>.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetFilesFile = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetFilesFileInput,
  outputSchema: GetFilesFileOutput,
}));
