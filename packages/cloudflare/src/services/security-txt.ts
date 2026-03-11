/**
 * Cloudflare SECURITY-TXT API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service security-txt
 */

import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import type { Credentials } from "../credentials.ts";
import { type DefaultErrors } from "../errors.ts";

// =============================================================================
// SecurityTXT
// =============================================================================

export interface GetSecurityTXTRequest {
  /** Identifier. */
  zoneId: string;
}

export const GetSecurityTXTRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/security-center/securitytxt",
  }),
) as unknown as Schema.Schema<GetSecurityTXTRequest>;

export interface GetSecurityTXTResponse {
  acknowledgments?: string[] | null;
  canonical?: string[] | null;
  contact?: string[] | null;
  enabled?: boolean | null;
  encryption?: string[] | null;
  expires?: string | null;
  hiring?: string[] | null;
  policy?: string[] | null;
  preferredLanguages?: string | null;
}

export const GetSecurityTXTResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    acknowledgments: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
    canonical: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
    contact: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
    enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    encryption: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
    expires: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    hiring: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
    policy: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
    preferredLanguages: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
  },
) as unknown as Schema.Schema<GetSecurityTXTResponse>;

export type GetSecurityTXTError = DefaultErrors;

export const getSecurityTXT: API.OperationMethod<
  GetSecurityTXTRequest,
  GetSecurityTXTResponse,
  GetSecurityTXTError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetSecurityTXTRequest,
  output: GetSecurityTXTResponse,
  errors: [],
}));

export interface PutSecurityTXTRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: */
  acknowledgments?: string[];
  /** Body param: */
  canonical?: string[];
  /** Body param: */
  contact?: string[];
  /** Body param: */
  enabled?: boolean;
  /** Body param: */
  encryption?: string[];
  /** Body param: */
  expires?: string;
  /** Body param: */
  hiring?: string[];
  /** Body param: */
  policy?: string[];
  /** Body param: */
  preferredLanguages?: string;
}

export const PutSecurityTXTRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  acknowledgments: Schema.optional(Schema.Array(Schema.String)),
  canonical: Schema.optional(Schema.Array(Schema.String)),
  contact: Schema.optional(Schema.Array(Schema.String)),
  enabled: Schema.optional(Schema.Boolean),
  encryption: Schema.optional(Schema.Array(Schema.String)),
  expires: Schema.optional(Schema.String),
  hiring: Schema.optional(Schema.Array(Schema.String)),
  policy: Schema.optional(Schema.Array(Schema.String)),
  preferredLanguages: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "PUT",
    path: "/zones/{zone_id}/security-center/securitytxt",
  }),
) as unknown as Schema.Schema<PutSecurityTXTRequest>;

export interface PutSecurityTXTResponse {
  errors: {
    code: number;
    message: string;
    documentationUrl?: string | null;
    source?: { pointer?: string | null } | null;
  }[];
  messages: {
    code: number;
    message: string;
    documentationUrl?: string | null;
    source?: { pointer?: string | null } | null;
  }[];
  /** Whether the API call was successful. */
  success: true;
}

export const PutSecurityTXTResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    errors: Schema.Array(
      Schema.Struct({
        code: Schema.Number,
        message: Schema.String,
        documentationUrl: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        source: Schema.optional(
          Schema.Union([
            Schema.Struct({
              pointer: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }),
            Schema.Null,
          ]),
        ),
      }).pipe(
        Schema.encodeKeys({
          code: "code",
          message: "message",
          documentationUrl: "documentation_url",
          source: "source",
        }),
      ),
    ),
    messages: Schema.Array(
      Schema.Struct({
        code: Schema.Number,
        message: Schema.String,
        documentationUrl: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        source: Schema.optional(
          Schema.Union([
            Schema.Struct({
              pointer: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }),
            Schema.Null,
          ]),
        ),
      }).pipe(
        Schema.encodeKeys({
          code: "code",
          message: "message",
          documentationUrl: "documentation_url",
          source: "source",
        }),
      ),
    ),
    success: Schema.Literal(true),
  },
) as unknown as Schema.Schema<PutSecurityTXTResponse>;

export type PutSecurityTXTError = DefaultErrors;

export const putSecurityTXT: API.OperationMethod<
  PutSecurityTXTRequest,
  PutSecurityTXTResponse,
  PutSecurityTXTError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutSecurityTXTRequest,
  output: PutSecurityTXTResponse,
  errors: [],
}));

export interface DeleteSecurityTXTRequest {
  /** Identifier. */
  zoneId: string;
}

export const DeleteSecurityTXTRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/zones/{zone_id}/security-center/securitytxt",
    }),
  ) as unknown as Schema.Schema<DeleteSecurityTXTRequest>;

export interface DeleteSecurityTXTResponse {
  errors: {
    code: number;
    message: string;
    documentationUrl?: string | null;
    source?: { pointer?: string | null } | null;
  }[];
  messages: {
    code: number;
    message: string;
    documentationUrl?: string | null;
    source?: { pointer?: string | null } | null;
  }[];
  /** Whether the API call was successful. */
  success: true;
}

export const DeleteSecurityTXTResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    errors: Schema.Array(
      Schema.Struct({
        code: Schema.Number,
        message: Schema.String,
        documentationUrl: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        source: Schema.optional(
          Schema.Union([
            Schema.Struct({
              pointer: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }),
            Schema.Null,
          ]),
        ),
      }).pipe(
        Schema.encodeKeys({
          code: "code",
          message: "message",
          documentationUrl: "documentation_url",
          source: "source",
        }),
      ),
    ),
    messages: Schema.Array(
      Schema.Struct({
        code: Schema.Number,
        message: Schema.String,
        documentationUrl: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        source: Schema.optional(
          Schema.Union([
            Schema.Struct({
              pointer: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }),
            Schema.Null,
          ]),
        ),
      }).pipe(
        Schema.encodeKeys({
          code: "code",
          message: "message",
          documentationUrl: "documentation_url",
          source: "source",
        }),
      ),
    ),
    success: Schema.Literal(true),
  }) as unknown as Schema.Schema<DeleteSecurityTXTResponse>;

export type DeleteSecurityTXTError = DefaultErrors;

export const deleteSecurityTXT: API.OperationMethod<
  DeleteSecurityTXTRequest,
  DeleteSecurityTXTResponse,
  DeleteSecurityTXTError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteSecurityTXTRequest,
  output: DeleteSecurityTXTResponse,
  errors: [],
}));
