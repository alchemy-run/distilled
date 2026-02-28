// ==========================================================================
// Web Fonts Developer API (webfonts v1)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { GCPAuth } from "../auth.ts";
import type { CommonErrors } from "../errors.ts";
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

export interface Axis {
  /** tag name. */
  tag?: string;
  /** minimum value */
  start?: number;
  /** maximum value */
  end?: number;
}

export const Axis: Schema.Schema<Axis> = Schema.suspend(() => Schema.Struct({
  tag: Schema.optional(Schema.String),
  start: Schema.optional(Schema.Number),
  end: Schema.optional(Schema.Number),
})).annotate({ identifier: "Axis" }) as any as Schema.Schema<Axis>;

export interface Tag {
  /** The name of the tag. */
  name?: string;
  /** The weight of the tag. */
  weight?: number;
}

export const Tag: Schema.Schema<Tag> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  weight: Schema.optional(Schema.Number),
})).annotate({ identifier: "Tag" }) as any as Schema.Schema<Tag>;

export interface Webfont {
  /** The name of the font. */
  family?: string;
  /** The available variants for the font. */
  variants?: Array<string>;
  /** The scripts supported by the font. */
  subsets?: Array<string>;
  /** The font version. */
  version?: string;
  /** The date (format "yyyy-MM-dd") the font was modified for the last time. */
  lastModified?: string;
  /** The font files (with all supported scripts) for each one of the available variants, as a key : value map. */
  files?: Record<string, string>;
  /** The category of the font. */
  category?: string;
  /** This kind represents a webfont object in the webfonts service. */
  kind?: string;
  /** Font URL for menu subset, a subset of the font that is enough to display the font name */
  menu?: string;
  /** Axis for variable fonts. */
  axes?: Array<Axis>;
  /** The color format(s) available for this family. */
  colorCapabilities?: Array<string>;
  /** The tags that apply to this family. */
  tags?: Array<Tag>;
}

export const Webfont: Schema.Schema<Webfont> = Schema.suspend(() => Schema.Struct({
  family: Schema.optional(Schema.String),
  variants: Schema.optional(Schema.Array(Schema.String)),
  subsets: Schema.optional(Schema.Array(Schema.String)),
  version: Schema.optional(Schema.String),
  lastModified: Schema.optional(Schema.String),
  files: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  category: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  menu: Schema.optional(Schema.String),
  axes: Schema.optional(Schema.Array(Axis)),
  colorCapabilities: Schema.optional(Schema.Array(Schema.String)),
  tags: Schema.optional(Schema.Array(Tag)),
})).annotate({ identifier: "Webfont" }) as any as Schema.Schema<Webfont>;

export interface WebfontList {
  /** This kind represents a list of webfont objects in the webfonts service. */
  kind?: string;
  /** The list of fonts currently served by the Google Fonts API. */
  items?: Array<Webfont>;
}

export const WebfontList: Schema.Schema<WebfontList> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(Webfont)),
})).annotate({ identifier: "WebfontList" }) as any as Schema.Schema<WebfontList>;

// ==========================================================================
// Operations
// ==========================================================================

/** Retrieves the list of fonts currently served by the Google Fonts Developer API. */
export interface ListWebfontsRequest {
  /** Enables sorting of the list. */
  sort?: "SORT_UNDEFINED" | "ALPHA" | "DATE" | "POPULARITY" | "STYLE" | "TRENDING" | (string & {});
  /** Controls the font urls in `Webfont.files`, by default, static ttf fonts are sent. */
  capability?: "CAPABILITY_UNSPECIFIED" | "WOFF2" | "VF" | "FAMILY_TAGS" | (string & {})[];
  /** Filters by Webfont.family, using literal match. If not set, returns all families */
  family?: string[];
  /** Filters by Webfont.subset, if subset is found in Webfont.subsets. If not set, returns all families. */
  subset?: string;
  /** Filters by Webfont.category, if category is found in Webfont.categories. If not set, returns all families. */
  category?: string;
}

export const ListWebfontsRequest = Schema.Struct({
  sort: Schema.optional(Schema.String).pipe(T.HttpQuery("sort")),
  capability: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("capability")),
  family: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("family")),
  subset: Schema.optional(Schema.String).pipe(T.HttpQuery("subset")),
  category: Schema.optional(Schema.String).pipe(T.HttpQuery("category")),
}).pipe(
  T.Http({ method: "GET", path: "v1/webfonts" }),
  svc,
) as unknown as Schema.Schema<ListWebfontsRequest>;

export type ListWebfontsResponse = WebfontList;
export const ListWebfontsResponse = WebfontList;

export type ListWebfontsError = CommonErrors;

export const listWebfonts: API.OperationMethod<ListWebfontsRequest, ListWebfontsResponse, ListWebfontsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListWebfontsRequest,
  output: ListWebfontsResponse,
  errors: [],
}));

