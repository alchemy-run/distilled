// ==========================================================================
// Web Fonts Developer API (webfonts v1)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits";
import type { Credentials } from "../credentials";
import type { DefaultErrors } from "../errors";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "webfonts",
  version: "v1",
  rootUrl: "https://webfonts.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Tag {
  /** The name of the tag. */
  name?: string;
  /** The weight of the tag. */
  weight?: number;
}

export const Tag: Schema.Schema<Tag> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      weight: Schema.optional(Schema.Number),
    }),
  ).annotate({ identifier: "Tag" }) as any as Schema.Schema<Tag>;

export interface Axis {
  /** tag name. */
  tag?: string;
  /** minimum value */
  start?: number;
  /** maximum value */
  end?: number;
}

export const Axis: Schema.Schema<Axis> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      tag: Schema.optional(Schema.String),
      start: Schema.optional(Schema.Number),
      end: Schema.optional(Schema.Number),
    }),
  ).annotate({ identifier: "Axis" }) as any as Schema.Schema<Axis>;

export interface Webfont {
  /** The available variants for the font. */
  variants?: Array<string>;
  /** The scripts supported by the font. */
  subsets?: Array<string>;
  /** The font version. */
  version?: string;
  /** Axis for variable fonts. */
  axes?: Array<Axis>;
  /** The font files (with all supported scripts) for each one of the available variants, as a key : value map. */
  files?: Record<string, string>;
  /** This kind represents a webfont object in the webfonts service. */
  kind?: string;
  /** The date (format "yyyy-MM-dd") the font was modified for the last time. */
  lastModified?: string;
  /** The category of the font. */
  category?: string;
  /** The tags that apply to this family. */
  tags?: Array<Tag>;
  /** The name of the font. */
  family?: string;
  /** The color format(s) available for this family. */
  colorCapabilities?: Array<string>;
  /** Font URL for menu subset, a subset of the font that is enough to display the font name */
  menu?: string;
}

export const Webfont: Schema.Schema<Webfont> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      variants: Schema.optional(Schema.Array(Schema.String)),
      subsets: Schema.optional(Schema.Array(Schema.String)),
      version: Schema.optional(Schema.String),
      axes: Schema.optional(Schema.Array(Axis)),
      files: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      kind: Schema.optional(Schema.String),
      lastModified: Schema.optional(Schema.String),
      category: Schema.optional(Schema.String),
      tags: Schema.optional(Schema.Array(Tag)),
      family: Schema.optional(Schema.String),
      colorCapabilities: Schema.optional(Schema.Array(Schema.String)),
      menu: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Webfont" }) as any as Schema.Schema<Webfont>;

export interface WebfontList {
  /** The list of fonts currently served by the Google Fonts API. */
  items?: Array<Webfont>;
  /** This kind represents a list of webfont objects in the webfonts service. */
  kind?: string;
}

export const WebfontList: Schema.Schema<WebfontList> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      items: Schema.optional(Schema.Array(Webfont)),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "WebfontList",
  }) as any as Schema.Schema<WebfontList>;

// ==========================================================================
// Operations
// ==========================================================================

export interface ListWebfontsRequest {
  /** Filters by Webfont.subset, if subset is found in Webfont.subsets. If not set, returns all families. */
  subset?: string;
  /** Controls the font urls in `Webfont.files`, by default, static ttf fonts are sent. */
  capability?:
    | "CAPABILITY_UNSPECIFIED"
    | "WOFF2"
    | "VF"
    | "FAMILY_TAGS"
    | (string & {})[];
  /** Enables sorting of the list. */
  sort?:
    | "SORT_UNDEFINED"
    | "ALPHA"
    | "DATE"
    | "POPULARITY"
    | "STYLE"
    | "TRENDING"
    | (string & {});
  /** Filters by Webfont.category, if category is found in Webfont.categories. If not set, returns all families. */
  category?: string;
  /** Filters by Webfont.family, using literal match. If not set, returns all families */
  family?: string[];
}

export const ListWebfontsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subset: Schema.optional(Schema.String).pipe(T.HttpQuery("subset")),
  capability: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("capability"),
  ),
  sort: Schema.optional(Schema.String).pipe(T.HttpQuery("sort")),
  category: Schema.optional(Schema.String).pipe(T.HttpQuery("category")),
  family: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("family"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "v1/webfonts" }),
  svc,
) as unknown as Schema.Schema<ListWebfontsRequest>;

export type ListWebfontsResponse = WebfontList;
export const ListWebfontsResponse = /*@__PURE__*/ /*#__PURE__*/ WebfontList;

export type ListWebfontsError = DefaultErrors;

/** Retrieves the list of fonts currently served by the Google Fonts Developer API. */
export const listWebfonts: API.OperationMethod<
  ListWebfontsRequest,
  ListWebfontsResponse,
  ListWebfontsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListWebfontsRequest,
  output: ListWebfontsResponse,
  errors: [],
}));
