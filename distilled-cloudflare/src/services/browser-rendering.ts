/**
 * Cloudflare BROWSER-RENDERING API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service browser-rendering
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
// Content
// =============================================================================

export interface CreateContentRequest {}

export const CreateContentRequest = Schema.Struct({}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/browser-rendering/content",
  }),
) as unknown as Schema.Schema<CreateContentRequest>;

export type CreateContentResponse = string;

export const CreateContentResponse =
  Schema.String as unknown as Schema.Schema<CreateContentResponse>;

export const createContent: (
  input: CreateContentRequest,
) => Effect.Effect<
  CreateContentResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateContentRequest,
  output: CreateContentResponse,
  errors: [],
}));

// =============================================================================
// Json
// =============================================================================

export interface CreateJsonRequest {}

export const CreateJsonRequest = Schema.Struct({}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/browser-rendering/json",
  }),
) as unknown as Schema.Schema<CreateJsonRequest>;

export type CreateJsonResponse = Record<string, unknown>;

export const CreateJsonResponse = Schema.Struct(
  {},
) as unknown as Schema.Schema<CreateJsonResponse>;

export const createJson: (
  input: CreateJsonRequest,
) => Effect.Effect<
  CreateJsonResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateJsonRequest,
  output: CreateJsonResponse,
  errors: [],
}));

// =============================================================================
// Link
// =============================================================================

export interface CreateLinkRequest {}

export const CreateLinkRequest = Schema.Struct({}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/browser-rendering/links",
  }),
) as unknown as Schema.Schema<CreateLinkRequest>;

export type CreateLinkResponse = string[];

export const CreateLinkResponse = Schema.Array(
  Schema.String,
) as unknown as Schema.Schema<CreateLinkResponse>;

export const createLink: (
  input: CreateLinkRequest,
) => Effect.Effect<
  CreateLinkResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateLinkRequest,
  output: CreateLinkResponse,
  errors: [],
}));

// =============================================================================
// Markdown
// =============================================================================

export interface CreateMarkdownRequest {}

export const CreateMarkdownRequest = Schema.Struct({}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/browser-rendering/markdown",
  }),
) as unknown as Schema.Schema<CreateMarkdownRequest>;

export type CreateMarkdownResponse = string;

export const CreateMarkdownResponse =
  Schema.String as unknown as Schema.Schema<CreateMarkdownResponse>;

export const createMarkdown: (
  input: CreateMarkdownRequest,
) => Effect.Effect<
  CreateMarkdownResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateMarkdownRequest,
  output: CreateMarkdownResponse,
  errors: [],
}));

// =============================================================================
// Pdf
// =============================================================================

export interface CreatePdfRequest {}

export const CreatePdfRequest = Schema.Struct({}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/browser-rendering/pdf",
  }),
) as unknown as Schema.Schema<CreatePdfRequest>;

export type CreatePdfResponse = unknown;

export const CreatePdfResponse =
  Schema.Unknown as unknown as Schema.Schema<CreatePdfResponse>;

export const createPdf: (
  input: CreatePdfRequest,
) => Effect.Effect<
  CreatePdfResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreatePdfRequest,
  output: CreatePdfResponse,
  errors: [],
}));

// =============================================================================
// Scrape
// =============================================================================

export interface CreateScrapeRequest {}

export const CreateScrapeRequest = Schema.Struct({}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/browser-rendering/scrape",
  }),
) as unknown as Schema.Schema<CreateScrapeRequest>;

export type CreateScrapeResponse = {
  results: {
    attributes: { name: string; value: string }[];
    height: number;
    html: string;
    left: number;
    text: string;
    top: number;
    width: number;
  };
  selector: string;
}[];

export const CreateScrapeResponse = Schema.Array(
  Schema.Struct({
    results: Schema.Struct({
      attributes: Schema.Array(
        Schema.Struct({
          name: Schema.String,
          value: Schema.String,
        }),
      ),
      height: Schema.Number,
      html: Schema.String,
      left: Schema.Number,
      text: Schema.String,
      top: Schema.Number,
      width: Schema.Number,
    }),
    selector: Schema.String,
  }),
) as unknown as Schema.Schema<CreateScrapeResponse>;

export const createScrape: (
  input: CreateScrapeRequest,
) => Effect.Effect<
  CreateScrapeResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateScrapeRequest,
  output: CreateScrapeResponse,
  errors: [],
}));

// =============================================================================
// Screenshot
// =============================================================================

export interface CreateScreenshotRequest {}

export const CreateScreenshotRequest = Schema.Struct({}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/browser-rendering/screenshot",
  }),
) as unknown as Schema.Schema<CreateScreenshotRequest>;

export interface CreateScreenshotResponse {
  /** Response status */
  success: boolean;
  errors?: { code: number; message: string }[];
}

export const CreateScreenshotResponse = Schema.Struct({
  success: Schema.Boolean,
  errors: Schema.optional(
    Schema.Array(
      Schema.Struct({
        code: Schema.Number,
        message: Schema.String,
      }),
    ),
  ),
}) as unknown as Schema.Schema<CreateScreenshotResponse>;

export const createScreenshot: (
  input: CreateScreenshotRequest,
) => Effect.Effect<
  CreateScreenshotResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateScreenshotRequest,
  output: CreateScreenshotResponse,
  errors: [],
}));

// =============================================================================
// Snapshot
// =============================================================================

export interface CreateSnapshotRequest {}

export const CreateSnapshotRequest = Schema.Struct({}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/browser-rendering/snapshot",
  }),
) as unknown as Schema.Schema<CreateSnapshotRequest>;

export interface CreateSnapshotResponse {
  /** HTML content */
  content: string;
  /** Base64 encoded image */
  screenshot: string;
}

export const CreateSnapshotResponse = Schema.Struct({
  content: Schema.String,
  screenshot: Schema.String,
}) as unknown as Schema.Schema<CreateSnapshotResponse>;

export const createSnapshot: (
  input: CreateSnapshotRequest,
) => Effect.Effect<
  CreateSnapshotResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateSnapshotRequest,
  output: CreateSnapshotResponse,
  errors: [],
}));
