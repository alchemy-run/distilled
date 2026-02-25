/**
 * Cloudflare REQUEST-TRACERS API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service request-tracers
 */

import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import type { ApiToken } from "../auth.ts";
import {
  type CommonErrors,
  UnknownCloudflareError,
  CloudflareNetworkError,
  CloudflareHttpError,
} from "../errors.ts";

// =============================================================================
// Trace
// =============================================================================

export interface CreateTraceRequest {
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: HTTP Method of tracing request */
  method: string;
  /** Body param: URL to which perform tracing request */
  url: string;
  /** Body param: */
  body?: { base64?: string; json?: unknown; plainText?: string };
  /** Body param: Additional request parameters */
  context?: {
    botScore?: number;
    geoloc?: {
      city?: string;
      continent?: string;
      isEuCountry?: boolean;
      isoCode?: string;
      latitude?: number;
      longitude?: number;
      postalCode?: string;
      regionCode?: string;
      subdivision_2IsoCode?: string;
      timezone?: string;
    };
    skipChallenge?: boolean;
    threatScore?: number;
  };
  /** Body param: Cookies added to tracing request */
  cookies?: Record<string, unknown>;
  /** Body param: Headers added to tracing request */
  headers?: Record<string, unknown>;
  /** Body param: HTTP Protocol of tracing request */
  protocol?: string;
  /** Body param: Skip sending the request to the Origin server after all rules evaluation */
  skipResponse?: boolean;
}

export const CreateTraceRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  method: Schema.String,
  url: Schema.String,
  body: Schema.optional(
    Schema.Struct({
      base64: Schema.optional(Schema.String),
      json: Schema.optional(Schema.Unknown),
      plainText: Schema.optional(Schema.String),
    }).pipe(Schema.encodeKeys({ plainText: "plain_text" })),
  ).pipe(T.HttpBody()),
  context: Schema.optional(
    Schema.Struct({
      botScore: Schema.optional(Schema.Number),
      geoloc: Schema.optional(
        Schema.Struct({
          city: Schema.optional(Schema.String),
          continent: Schema.optional(Schema.String),
          isEuCountry: Schema.optional(Schema.Boolean),
          isoCode: Schema.optional(Schema.String),
          latitude: Schema.optional(Schema.Number),
          longitude: Schema.optional(Schema.Number),
          postalCode: Schema.optional(Schema.String),
          regionCode: Schema.optional(Schema.String),
          subdivision_2IsoCode: Schema.optional(Schema.String),
          timezone: Schema.optional(Schema.String),
        }).pipe(
          Schema.encodeKeys({
            isEuCountry: "is_eu_country",
            isoCode: "iso_code",
            postalCode: "postal_code",
            regionCode: "region_code",
            subdivision_2IsoCode: "subdivision_2_iso_code",
          }),
        ),
      ),
      skipChallenge: Schema.optional(Schema.Boolean),
      threatScore: Schema.optional(Schema.Number),
    }).pipe(
      Schema.encodeKeys({
        botScore: "bot_score",
        skipChallenge: "skip_challenge",
        threatScore: "threat_score",
      }),
    ),
  ),
  cookies: Schema.optional(Schema.Struct({})),
  headers: Schema.optional(Schema.Struct({})),
  protocol: Schema.optional(Schema.String),
  skipResponse: Schema.optional(Schema.Boolean),
}).pipe(
  Schema.encodeKeys({ skipResponse: "skip_response" }),
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/request-tracer/trace",
  }),
) as unknown as Schema.Schema<CreateTraceRequest>;

export interface CreateTraceResponse {
  /** HTTP Status code of zone response */
  statusCode?: number;
  trace?: unknown;
}

export const CreateTraceResponse = Schema.Struct({
  statusCode: Schema.optional(Schema.Number),
  trace: Schema.optional(Schema.Unknown),
}).pipe(
  Schema.encodeKeys({ statusCode: "status_code" }),
) as unknown as Schema.Schema<CreateTraceResponse>;

export const createTrace: (
  input: CreateTraceRequest,
) => Effect.Effect<
  CreateTraceResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateTraceRequest,
  output: CreateTraceResponse,
  errors: [],
}));
