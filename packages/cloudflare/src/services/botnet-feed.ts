/**
 * Cloudflare BOTNET-FEED API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service botnet-feed
 */

import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import type { Credentials } from "../credentials.ts";
import { type DefaultErrors } from "../errors.ts";

// =============================================================================
// ConfigAsn
// =============================================================================

export interface GetConfigAsnRequest {
  /** Identifier. */
  accountId: string;
}

export const GetConfigAsnRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/botnet_feed/configs/asn",
  }),
) as unknown as Schema.Schema<GetConfigAsnRequest>;

export interface GetConfigAsnResponse {
  asn?: number | null;
}

export const GetConfigAsnResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  asn: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
}).pipe(
  T.ResponsePath("result"),
) as unknown as Schema.Schema<GetConfigAsnResponse>;

export type GetConfigAsnError = DefaultErrors;

export const getConfigAsn: API.OperationMethod<
  GetConfigAsnRequest,
  GetConfigAsnResponse,
  GetConfigAsnError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetConfigAsnRequest,
  output: GetConfigAsnResponse,
  errors: [],
}));

export interface DeleteConfigAsnRequest {
  asnId: number;
  /** Identifier. */
  accountId: string;
}

export const DeleteConfigAsnRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    asnId: Schema.Number.pipe(T.HttpPath("asnId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  },
).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/botnet_feed/configs/asn/{asnId}",
  }),
) as unknown as Schema.Schema<DeleteConfigAsnRequest>;

export interface DeleteConfigAsnResponse {
  asn?: number | null;
}

export const DeleteConfigAsnResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    asn: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  }).pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<DeleteConfigAsnResponse>;

export type DeleteConfigAsnError = DefaultErrors;

export const deleteConfigAsn: API.OperationMethod<
  DeleteConfigAsnRequest,
  DeleteConfigAsnResponse,
  DeleteConfigAsnError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteConfigAsnRequest,
  output: DeleteConfigAsnResponse,
  errors: [],
}));

// =============================================================================
// ReportAsn
// =============================================================================

export interface DayReportAsnRequest {
  asnId: number;
  /** Path param: Identifier. */
  accountId: string;
  /** Query param: */
  date?: string;
}

export const DayReportAsnRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  asnId: Schema.Number.pipe(T.HttpPath("asnId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  date: Schema.optional(Schema.String).pipe(T.HttpQuery("date")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/botnet_feed/asn/{asnId}/day_report",
  }),
) as unknown as Schema.Schema<DayReportAsnRequest>;

export interface DayReportAsnResponse {
  cidr?: string | null;
  date?: string | null;
  offenseCount?: number | null;
}

export const DayReportAsnResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  cidr: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  date: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  offenseCount: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
})
  .pipe(
    Schema.encodeKeys({
      cidr: "cidr",
      date: "date",
      offenseCount: "offense_count",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<DayReportAsnResponse>;

export type DayReportAsnError = DefaultErrors;

export const dayReportAsn: API.OperationMethod<
  DayReportAsnRequest,
  DayReportAsnResponse,
  DayReportAsnError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DayReportAsnRequest,
  output: DayReportAsnResponse,
  errors: [],
}));

export interface FullReportAsnRequest {
  asnId: number;
  /** Identifier. */
  accountId: string;
}

export const FullReportAsnRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  asnId: Schema.Number.pipe(T.HttpPath("asnId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/botnet_feed/asn/{asnId}/full_report",
  }),
) as unknown as Schema.Schema<FullReportAsnRequest>;

export interface FullReportAsnResponse {
  cidr?: string | null;
  date?: string | null;
  offenseCount?: number | null;
}

export const FullReportAsnResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  cidr: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  date: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  offenseCount: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
})
  .pipe(
    Schema.encodeKeys({
      cidr: "cidr",
      date: "date",
      offenseCount: "offense_count",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<FullReportAsnResponse>;

export type FullReportAsnError = DefaultErrors;

export const fullReportAsn: API.OperationMethod<
  FullReportAsnRequest,
  FullReportAsnResponse,
  FullReportAsnError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: FullReportAsnRequest,
  output: FullReportAsnResponse,
  errors: [],
}));
