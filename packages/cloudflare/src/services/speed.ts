/**
 * Cloudflare SPEED API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service speed
 */

import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits";
import type { Credentials } from "../credentials";
import { type DefaultErrors } from "../errors";

// =============================================================================
// Availability
// =============================================================================

export interface ListAvailabilitiesRequest {
  /** Identifier. */
  zoneId: string;
}

export const ListAvailabilitiesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/zones/{zone_id}/speed_api/availabilities",
    }),
  ) as unknown as Schema.Schema<ListAvailabilitiesRequest>;

export interface ListAvailabilitiesResponse {
  quota?: {
    plan?: string | null;
    quotasPerPlan?: {
      value?: {
        business?: number | null;
        enterprise?: number | null;
        free?: number | null;
        pro?: number | null;
      } | null;
    } | null;
    remainingSchedules?: number | null;
    remainingTests?: number | null;
    scheduleQuotasPerPlan?: {
      value?: {
        business?: number | null;
        enterprise?: number | null;
        free?: number | null;
        pro?: number | null;
      } | null;
    } | null;
  } | null;
  regions?: unknown[] | null;
  /** Available regions. */
  regionsPerPlan?: {
    business?: unknown[] | null;
    enterprise?: unknown[] | null;
    free?: unknown[] | null;
    pro?: unknown[] | null;
  } | null;
}

export const ListAvailabilitiesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    quota: Schema.optional(
      Schema.Union([
        Schema.Struct({
          plan: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          quotasPerPlan: Schema.optional(
            Schema.Union([
              Schema.Struct({
                value: Schema.optional(
                  Schema.Union([
                    Schema.Struct({
                      business: Schema.optional(
                        Schema.Union([Schema.Number, Schema.Null]),
                      ),
                      enterprise: Schema.optional(
                        Schema.Union([Schema.Number, Schema.Null]),
                      ),
                      free: Schema.optional(
                        Schema.Union([Schema.Number, Schema.Null]),
                      ),
                      pro: Schema.optional(
                        Schema.Union([Schema.Number, Schema.Null]),
                      ),
                    }),
                    Schema.Null,
                  ]),
                ),
              }),
              Schema.Null,
            ]),
          ),
          remainingSchedules: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
          remainingTests: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
          scheduleQuotasPerPlan: Schema.optional(
            Schema.Union([
              Schema.Struct({
                value: Schema.optional(
                  Schema.Union([
                    Schema.Struct({
                      business: Schema.optional(
                        Schema.Union([Schema.Number, Schema.Null]),
                      ),
                      enterprise: Schema.optional(
                        Schema.Union([Schema.Number, Schema.Null]),
                      ),
                      free: Schema.optional(
                        Schema.Union([Schema.Number, Schema.Null]),
                      ),
                      pro: Schema.optional(
                        Schema.Union([Schema.Number, Schema.Null]),
                      ),
                    }),
                    Schema.Null,
                  ]),
                ),
              }),
              Schema.Null,
            ]),
          ),
        }),
        Schema.Null,
      ]),
    ),
    regions: Schema.optional(
      Schema.Union([Schema.Array(Schema.Unknown), Schema.Null]),
    ),
    regionsPerPlan: Schema.optional(
      Schema.Union([
        Schema.Struct({
          business: Schema.optional(
            Schema.Union([Schema.Array(Schema.Unknown), Schema.Null]),
          ),
          enterprise: Schema.optional(
            Schema.Union([Schema.Array(Schema.Unknown), Schema.Null]),
          ),
          free: Schema.optional(
            Schema.Union([Schema.Array(Schema.Unknown), Schema.Null]),
          ),
          pro: Schema.optional(
            Schema.Union([Schema.Array(Schema.Unknown), Schema.Null]),
          ),
        }),
        Schema.Null,
      ]),
    ),
  }) as unknown as Schema.Schema<ListAvailabilitiesResponse>;

export type ListAvailabilitiesError = DefaultErrors;

export const listAvailabilities: API.OperationMethod<
  ListAvailabilitiesRequest,
  ListAvailabilitiesResponse,
  ListAvailabilitiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListAvailabilitiesRequest,
  output: ListAvailabilitiesResponse,
  errors: [],
}));

// =============================================================================
// Page
// =============================================================================

export interface ListPagesRequest {
  /** Identifier. */
  zoneId: string;
}

export const ListPagesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/speed_api/pages" }),
) as unknown as Schema.Schema<ListPagesRequest>;

export type ListPagesResponse = {
  region?: unknown | null;
  scheduleFrequency?: "DAILY" | "WEEKLY" | null;
  tests?: unknown[] | null;
  url?: string | null;
}[];

export const ListPagesResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Struct({
    region: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
    scheduleFrequency: Schema.optional(
      Schema.Union([Schema.Literals(["DAILY", "WEEKLY"]), Schema.Null]),
    ),
    tests: Schema.optional(
      Schema.Union([Schema.Array(Schema.Unknown), Schema.Null]),
    ),
    url: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }),
) as unknown as Schema.Schema<ListPagesResponse>;

export type ListPagesError = DefaultErrors;

export const listPages: API.OperationMethod<
  ListPagesRequest,
  ListPagesResponse,
  ListPagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListPagesRequest,
  output: ListPagesResponse,
  errors: [],
}));

export interface TrendPageRequest {
  url: string;
  /** Path param: Identifier. */
  zoneId: string;
  /** Query param: The type of device. */
  deviceType: "DESKTOP" | "MOBILE";
  /** Query param: A comma-separated list of metrics to include in the results. */
  metrics: string;
  /** Query param: A test region. */
  region:
    | "asia-east1"
    | "asia-northeast1"
    | "asia-northeast2"
    | "asia-south1"
    | "asia-southeast1"
    | "australia-southeast1"
    | "europe-north1"
    | "europe-southwest1"
    | "europe-west1"
    | "europe-west2"
    | "europe-west3"
    | "europe-west4"
    | "europe-west8"
    | "europe-west9"
    | "me-west1"
    | "southamerica-east1"
    | "us-central1"
    | "us-east1"
    | "us-east4"
    | "us-south1"
    | "us-west1";
  /** Query param: */
  start: string;
  /** Query param: The timezone of the start and end timestamps. */
  tz: string;
  /** Query param: */
  end?: string;
}

export const TrendPageRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  url: Schema.String.pipe(T.HttpPath("url")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  deviceType: Schema.Literals(["DESKTOP", "MOBILE"]).pipe(
    T.HttpQuery("deviceType"),
  ),
  metrics: Schema.String.pipe(T.HttpQuery("metrics")),
  region: Schema.Literals([
    "asia-east1",
    "asia-northeast1",
    "asia-northeast2",
    "asia-south1",
    "asia-southeast1",
    "australia-southeast1",
    "europe-north1",
    "europe-southwest1",
    "europe-west1",
    "europe-west2",
    "europe-west3",
    "europe-west4",
    "europe-west8",
    "europe-west9",
    "me-west1",
    "southamerica-east1",
    "us-central1",
    "us-east1",
    "us-east4",
    "us-south1",
    "us-west1",
  ]).pipe(T.HttpQuery("region")),
  start: Schema.String.pipe(T.HttpQuery("start")),
  tz: Schema.String.pipe(T.HttpQuery("tz")),
  end: Schema.optional(Schema.String).pipe(T.HttpQuery("end")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/speed_api/pages/{url}/trend",
  }),
) as unknown as Schema.Schema<TrendPageRequest>;

export type TrendPageResponse = unknown;

export const TrendPageResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<TrendPageResponse>;

export type TrendPageError = DefaultErrors;

export const trendPage: API.OperationMethod<
  TrendPageRequest,
  TrendPageResponse,
  TrendPageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TrendPageRequest,
  output: TrendPageResponse,
  errors: [],
}));

// =============================================================================
// PageTest
// =============================================================================

export interface GetPageTestRequest {
  url: string;
  testId: string;
  /** Identifier. */
  zoneId: string;
}

export const GetPageTestRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  url: Schema.String.pipe(T.HttpPath("url")),
  testId: Schema.String.pipe(T.HttpPath("testId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/speed_api/pages/{url}/tests/{testId}",
  }),
) as unknown as Schema.Schema<GetPageTestRequest>;

export interface GetPageTestResponse {
  /** UUID. */
  id?: string | null;
  date?: string | null;
  /** The Lighthouse report. */
  desktopReport?: unknown | null;
  /** The Lighthouse report. */
  mobileReport?: unknown | null;
  /** A test region with a label. */
  region?: unknown | null;
  /** The frequency of the test. */
  scheduleFrequency?: "DAILY" | "WEEKLY" | null;
  /** A URL. */
  url?: string | null;
}

export const GetPageTestResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  date: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  desktopReport: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
  mobileReport: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
  region: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
  scheduleFrequency: Schema.optional(
    Schema.Union([Schema.Literals(["DAILY", "WEEKLY"]), Schema.Null]),
  ),
  url: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}) as unknown as Schema.Schema<GetPageTestResponse>;

export type GetPageTestError = DefaultErrors;

export const getPageTest: API.OperationMethod<
  GetPageTestRequest,
  GetPageTestResponse,
  GetPageTestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetPageTestRequest,
  output: GetPageTestResponse,
  errors: [],
}));

export interface ListPageTestsRequest {
  url: string;
  /** Path param: Identifier. */
  zoneId: string;
  /** Query param: A test region. */
  region?:
    | "asia-east1"
    | "asia-northeast1"
    | "asia-northeast2"
    | "asia-south1"
    | "asia-southeast1"
    | "australia-southeast1"
    | "europe-north1"
    | "europe-southwest1"
    | "europe-west1"
    | "europe-west2"
    | "europe-west3"
    | "europe-west4"
    | "europe-west8"
    | "europe-west9"
    | "me-west1"
    | "southamerica-east1"
    | "us-central1"
    | "us-east1"
    | "us-east4"
    | "us-south1"
    | "us-west1";
}

export const ListPageTestsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  url: Schema.String.pipe(T.HttpPath("url")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  region: Schema.optional(
    Schema.Literals([
      "asia-east1",
      "asia-northeast1",
      "asia-northeast2",
      "asia-south1",
      "asia-southeast1",
      "australia-southeast1",
      "europe-north1",
      "europe-southwest1",
      "europe-west1",
      "europe-west2",
      "europe-west3",
      "europe-west4",
      "europe-west8",
      "europe-west9",
      "me-west1",
      "southamerica-east1",
      "us-central1",
      "us-east1",
      "us-east4",
      "us-south1",
      "us-west1",
    ]),
  ).pipe(T.HttpQuery("region")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/speed_api/pages/{url}/tests",
  }),
) as unknown as Schema.Schema<ListPageTestsRequest>;

export type ListPageTestsResponse = {
  id?: string | null;
  date?: string | null;
  desktopReport?: unknown | null;
  mobileReport?: unknown | null;
  region?: unknown | null;
  scheduleFrequency?: "DAILY" | "WEEKLY" | null;
  url?: string | null;
}[];

export const ListPageTestsResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    date: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    desktopReport: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
    mobileReport: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
    region: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
    scheduleFrequency: Schema.optional(
      Schema.Union([Schema.Literals(["DAILY", "WEEKLY"]), Schema.Null]),
    ),
    url: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }),
) as unknown as Schema.Schema<ListPageTestsResponse>;

export type ListPageTestsError = DefaultErrors;

export const listPageTests: API.OperationMethod<
  ListPageTestsRequest,
  ListPageTestsResponse,
  ListPageTestsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListPageTestsRequest,
  output: ListPageTestsResponse,
  errors: [],
}));

export interface CreatePageTestRequest {
  url: string;
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: A test region. */
  region?:
    | "asia-east1"
    | "asia-northeast1"
    | "asia-northeast2"
    | "asia-south1"
    | "asia-southeast1"
    | "australia-southeast1"
    | "europe-north1"
    | "europe-southwest1"
    | "europe-west1"
    | "europe-west2"
    | "europe-west3"
    | "europe-west4"
    | "europe-west8"
    | "europe-west9"
    | "me-west1"
    | "southamerica-east1"
    | "us-central1"
    | "us-east1"
    | "us-east4"
    | "us-south1"
    | "us-west1";
}

export const CreatePageTestRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  url: Schema.String.pipe(T.HttpPath("url")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  region: Schema.optional(
    Schema.Literals([
      "asia-east1",
      "asia-northeast1",
      "asia-northeast2",
      "asia-south1",
      "asia-southeast1",
      "australia-southeast1",
      "europe-north1",
      "europe-southwest1",
      "europe-west1",
      "europe-west2",
      "europe-west3",
      "europe-west4",
      "europe-west8",
      "europe-west9",
      "me-west1",
      "southamerica-east1",
      "us-central1",
      "us-east1",
      "us-east4",
      "us-south1",
      "us-west1",
    ]),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "/zones/{zone_id}/speed_api/pages/{url}/tests",
  }),
) as unknown as Schema.Schema<CreatePageTestRequest>;

export interface CreatePageTestResponse {
  /** UUID. */
  id?: string | null;
  date?: string | null;
  /** The Lighthouse report. */
  desktopReport?: unknown | null;
  /** The Lighthouse report. */
  mobileReport?: unknown | null;
  /** A test region with a label. */
  region?: unknown | null;
  /** The frequency of the test. */
  scheduleFrequency?: "DAILY" | "WEEKLY" | null;
  /** A URL. */
  url?: string | null;
}

export const CreatePageTestResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    date: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    desktopReport: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
    mobileReport: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
    region: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
    scheduleFrequency: Schema.optional(
      Schema.Union([Schema.Literals(["DAILY", "WEEKLY"]), Schema.Null]),
    ),
    url: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  },
) as unknown as Schema.Schema<CreatePageTestResponse>;

export type CreatePageTestError = DefaultErrors;

export const createPageTest: API.OperationMethod<
  CreatePageTestRequest,
  CreatePageTestResponse,
  CreatePageTestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreatePageTestRequest,
  output: CreatePageTestResponse,
  errors: [],
}));

export interface DeletePageTestRequest {
  url: string;
  /** Path param: Identifier. */
  zoneId: string;
  /** Query param: A test region. */
  region?:
    | "asia-east1"
    | "asia-northeast1"
    | "asia-northeast2"
    | "asia-south1"
    | "asia-southeast1"
    | "australia-southeast1"
    | "europe-north1"
    | "europe-southwest1"
    | "europe-west1"
    | "europe-west2"
    | "europe-west3"
    | "europe-west4"
    | "europe-west8"
    | "europe-west9"
    | "me-west1"
    | "southamerica-east1"
    | "us-central1"
    | "us-east1"
    | "us-east4"
    | "us-south1"
    | "us-west1";
}

export const DeletePageTestRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  url: Schema.String.pipe(T.HttpPath("url")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  region: Schema.optional(
    Schema.Literals([
      "asia-east1",
      "asia-northeast1",
      "asia-northeast2",
      "asia-south1",
      "asia-southeast1",
      "australia-southeast1",
      "europe-north1",
      "europe-southwest1",
      "europe-west1",
      "europe-west2",
      "europe-west3",
      "europe-west4",
      "europe-west8",
      "europe-west9",
      "me-west1",
      "southamerica-east1",
      "us-central1",
      "us-east1",
      "us-east4",
      "us-south1",
      "us-west1",
    ]),
  ).pipe(T.HttpQuery("region")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/zones/{zone_id}/speed_api/pages/{url}/tests",
  }),
) as unknown as Schema.Schema<DeletePageTestRequest>;

export interface DeletePageTestResponse {
  /** Number of items affected. */
  count?: number | null;
}

export const DeletePageTestResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    count: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  },
) as unknown as Schema.Schema<DeletePageTestResponse>;

export type DeletePageTestError = DefaultErrors;

export const deletePageTest: API.OperationMethod<
  DeletePageTestRequest,
  DeletePageTestResponse,
  DeletePageTestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeletePageTestRequest,
  output: DeletePageTestResponse,
  errors: [],
}));

// =============================================================================
// Schedule
// =============================================================================

export interface GetScheduleRequest {
  url: string;
  /** Path param: Identifier. */
  zoneId: string;
  /** Query param: A test region. */
  region?:
    | "asia-east1"
    | "asia-northeast1"
    | "asia-northeast2"
    | "asia-south1"
    | "asia-southeast1"
    | "australia-southeast1"
    | "europe-north1"
    | "europe-southwest1"
    | "europe-west1"
    | "europe-west2"
    | "europe-west3"
    | "europe-west4"
    | "europe-west8"
    | "europe-west9"
    | "me-west1"
    | "southamerica-east1"
    | "us-central1"
    | "us-east1"
    | "us-east4"
    | "us-south1"
    | "us-west1";
}

export const GetScheduleRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  url: Schema.String.pipe(T.HttpPath("url")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  region: Schema.optional(
    Schema.Literals([
      "asia-east1",
      "asia-northeast1",
      "asia-northeast2",
      "asia-south1",
      "asia-southeast1",
      "australia-southeast1",
      "europe-north1",
      "europe-southwest1",
      "europe-west1",
      "europe-west2",
      "europe-west3",
      "europe-west4",
      "europe-west8",
      "europe-west9",
      "me-west1",
      "southamerica-east1",
      "us-central1",
      "us-east1",
      "us-east4",
      "us-south1",
      "us-west1",
    ]),
  ).pipe(T.HttpQuery("region")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/speed_api/schedule/{url}" }),
) as unknown as Schema.Schema<GetScheduleRequest>;

export interface GetScheduleResponse {
  /** The frequency of the test. */
  frequency?: "DAILY" | "WEEKLY" | null;
  /** A test region. */
  region?:
    | "asia-east1"
    | "asia-northeast1"
    | "asia-northeast2"
    | "asia-south1"
    | "asia-southeast1"
    | "australia-southeast1"
    | "europe-north1"
    | "europe-southwest1"
    | "europe-west1"
    | "europe-west2"
    | "europe-west3"
    | "europe-west4"
    | "europe-west8"
    | "europe-west9"
    | "me-west1"
    | "southamerica-east1"
    | "us-central1"
    | "us-east1"
    | "us-east4"
    | "us-south1"
    | "us-west1"
    | null;
  /** A URL. */
  url?: string | null;
}

export const GetScheduleResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  frequency: Schema.optional(
    Schema.Union([Schema.Literals(["DAILY", "WEEKLY"]), Schema.Null]),
  ),
  region: Schema.optional(
    Schema.Union([
      Schema.Literals([
        "asia-east1",
        "asia-northeast1",
        "asia-northeast2",
        "asia-south1",
        "asia-southeast1",
        "australia-southeast1",
        "europe-north1",
        "europe-southwest1",
        "europe-west1",
        "europe-west2",
        "europe-west3",
        "europe-west4",
        "europe-west8",
        "europe-west9",
        "me-west1",
        "southamerica-east1",
        "us-central1",
        "us-east1",
        "us-east4",
        "us-south1",
        "us-west1",
      ]),
      Schema.Null,
    ]),
  ),
  url: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}) as unknown as Schema.Schema<GetScheduleResponse>;

export type GetScheduleError = DefaultErrors;

export const getSchedule: API.OperationMethod<
  GetScheduleRequest,
  GetScheduleResponse,
  GetScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetScheduleRequest,
  output: GetScheduleResponse,
  errors: [],
}));

export interface CreateScheduleRequest {
  url: string;
  /** Path param: Identifier. */
  zoneId: string;
  /** Query param: A test region. */
  region?:
    | "asia-east1"
    | "asia-northeast1"
    | "asia-northeast2"
    | "asia-south1"
    | "asia-southeast1"
    | "australia-southeast1"
    | "europe-north1"
    | "europe-southwest1"
    | "europe-west1"
    | "europe-west2"
    | "europe-west3"
    | "europe-west4"
    | "europe-west8"
    | "europe-west9"
    | "me-west1"
    | "southamerica-east1"
    | "us-central1"
    | "us-east1"
    | "us-east4"
    | "us-south1"
    | "us-west1";
}

export const CreateScheduleRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  url: Schema.String.pipe(T.HttpPath("url")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  region: Schema.optional(
    Schema.Literals([
      "asia-east1",
      "asia-northeast1",
      "asia-northeast2",
      "asia-south1",
      "asia-southeast1",
      "australia-southeast1",
      "europe-north1",
      "europe-southwest1",
      "europe-west1",
      "europe-west2",
      "europe-west3",
      "europe-west4",
      "europe-west8",
      "europe-west9",
      "me-west1",
      "southamerica-east1",
      "us-central1",
      "us-east1",
      "us-east4",
      "us-south1",
      "us-west1",
    ]),
  ).pipe(T.HttpQuery("region")),
}).pipe(
  T.Http({ method: "POST", path: "/zones/{zone_id}/speed_api/schedule/{url}" }),
) as unknown as Schema.Schema<CreateScheduleRequest>;

export interface CreateScheduleResponse {
  /** The test schedule. */
  schedule?: {
    frequency?: "DAILY" | "WEEKLY" | null;
    region?:
      | "asia-east1"
      | "asia-northeast1"
      | "asia-northeast2"
      | "asia-south1"
      | "asia-southeast1"
      | "australia-southeast1"
      | "europe-north1"
      | "europe-southwest1"
      | "europe-west1"
      | "europe-west2"
      | "europe-west3"
      | "europe-west4"
      | "europe-west8"
      | "europe-west9"
      | "me-west1"
      | "southamerica-east1"
      | "us-central1"
      | "us-east1"
      | "us-east4"
      | "us-south1"
      | "us-west1"
      | null;
    url?: string | null;
  } | null;
  test?: unknown | null;
}

export const CreateScheduleResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    schedule: Schema.optional(
      Schema.Union([
        Schema.Struct({
          frequency: Schema.optional(
            Schema.Union([Schema.Literals(["DAILY", "WEEKLY"]), Schema.Null]),
          ),
          region: Schema.optional(
            Schema.Union([
              Schema.Literals([
                "asia-east1",
                "asia-northeast1",
                "asia-northeast2",
                "asia-south1",
                "asia-southeast1",
                "australia-southeast1",
                "europe-north1",
                "europe-southwest1",
                "europe-west1",
                "europe-west2",
                "europe-west3",
                "europe-west4",
                "europe-west8",
                "europe-west9",
                "me-west1",
                "southamerica-east1",
                "us-central1",
                "us-east1",
                "us-east4",
                "us-south1",
                "us-west1",
              ]),
              Schema.Null,
            ]),
          ),
          url: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        }),
        Schema.Null,
      ]),
    ),
    test: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
  },
) as unknown as Schema.Schema<CreateScheduleResponse>;

export type CreateScheduleError = DefaultErrors;

export const createSchedule: API.OperationMethod<
  CreateScheduleRequest,
  CreateScheduleResponse,
  CreateScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateScheduleRequest,
  output: CreateScheduleResponse,
  errors: [],
}));

export interface DeleteScheduleRequest {
  url: string;
  /** Path param: Identifier. */
  zoneId: string;
  /** Query param: A test region. */
  region?:
    | "asia-east1"
    | "asia-northeast1"
    | "asia-northeast2"
    | "asia-south1"
    | "asia-southeast1"
    | "australia-southeast1"
    | "europe-north1"
    | "europe-southwest1"
    | "europe-west1"
    | "europe-west2"
    | "europe-west3"
    | "europe-west4"
    | "europe-west8"
    | "europe-west9"
    | "me-west1"
    | "southamerica-east1"
    | "us-central1"
    | "us-east1"
    | "us-east4"
    | "us-south1"
    | "us-west1";
}

export const DeleteScheduleRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  url: Schema.String.pipe(T.HttpPath("url")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  region: Schema.optional(
    Schema.Literals([
      "asia-east1",
      "asia-northeast1",
      "asia-northeast2",
      "asia-south1",
      "asia-southeast1",
      "australia-southeast1",
      "europe-north1",
      "europe-southwest1",
      "europe-west1",
      "europe-west2",
      "europe-west3",
      "europe-west4",
      "europe-west8",
      "europe-west9",
      "me-west1",
      "southamerica-east1",
      "us-central1",
      "us-east1",
      "us-east4",
      "us-south1",
      "us-west1",
    ]),
  ).pipe(T.HttpQuery("region")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/zones/{zone_id}/speed_api/schedule/{url}",
  }),
) as unknown as Schema.Schema<DeleteScheduleRequest>;

export interface DeleteScheduleResponse {
  /** Number of items affected. */
  count?: number | null;
}

export const DeleteScheduleResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    count: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  },
) as unknown as Schema.Schema<DeleteScheduleResponse>;

export type DeleteScheduleError = DefaultErrors;

export const deleteSchedule: API.OperationMethod<
  DeleteScheduleRequest,
  DeleteScheduleResponse,
  DeleteScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteScheduleRequest,
  output: DeleteScheduleResponse,
  errors: [],
}));
