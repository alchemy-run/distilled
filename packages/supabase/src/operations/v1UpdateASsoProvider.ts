import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1UpdateASsoProviderInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
    provider_id: Schema.String.pipe(T.PathParam()),
    metadata_xml: Schema.optional(Schema.String),
    metadata_url: Schema.optional(Schema.String),
    domains: Schema.optional(Schema.Array(Schema.String)),
    attribute_mapping: Schema.optional(
      Schema.Struct({
        keys: Schema.Record(
          Schema.String,
          Schema.Struct({
            name: Schema.optional(Schema.String),
            names: Schema.optional(Schema.Array(Schema.String)),
            default: Schema.optional(Schema.Unknown),
            array: Schema.optional(Schema.Boolean),
          }),
        ),
      }),
    ),
    name_id_format: Schema.optional(
      Schema.Literals([
        "urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified",
        "urn:oasis:names:tc:SAML:2.0:nameid-format:transient",
        "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
        "urn:oasis:names:tc:SAML:2.0:nameid-format:persistent",
      ]),
    ),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/v1/projects/{ref}/config/auth/sso/providers/{provider_id}",
    }),
  );
export type V1UpdateASsoProviderInput = typeof V1UpdateASsoProviderInput.Type;

// Output Schema
export const V1UpdateASsoProviderOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    saml: Schema.optional(
      Schema.Struct({
        id: Schema.String,
        entity_id: Schema.String,
        metadata_url: Schema.optional(Schema.String),
        metadata_xml: Schema.optional(Schema.String),
        attribute_mapping: Schema.optional(
          Schema.Struct({
            keys: Schema.Record(
              Schema.String,
              Schema.Struct({
                name: Schema.optional(Schema.String),
                names: Schema.optional(Schema.Array(Schema.String)),
                default: Schema.optional(Schema.Unknown),
                array: Schema.optional(Schema.Boolean),
              }),
            ),
          }),
        ),
        name_id_format: Schema.optional(
          Schema.Literals([
            "urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified",
            "urn:oasis:names:tc:SAML:2.0:nameid-format:transient",
            "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
            "urn:oasis:names:tc:SAML:2.0:nameid-format:persistent",
          ]),
        ),
      }),
    ),
    domains: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.String,
          domain: Schema.optional(Schema.String),
          created_at: Schema.optional(Schema.String),
          updated_at: Schema.optional(Schema.String),
        }),
      ),
    ),
    created_at: Schema.optional(Schema.String),
    updated_at: Schema.optional(Schema.String),
  });
export type V1UpdateASsoProviderOutput = typeof V1UpdateASsoProviderOutput.Type;

// The operation
/**
 * Updates a SSO provider by its UUID
 *
 * @param ref - Project ref
 */
export const v1UpdateASsoProvider = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1UpdateASsoProviderInput,
    outputSchema: V1UpdateASsoProviderOutput,
  }),
);
