// ==========================================================================
// Cloud Document AI API (documentai v1)
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
  name: "documentai",
  version: "v1",
  rootUrl: "https://documentai.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleRpcStatus {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
}

export const GoogleRpcStatus: Schema.Schema<GoogleRpcStatus> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.Number),
  message: Schema.optional(Schema.String),
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "GoogleRpcStatus" }) as any as Schema.Schema<GoogleRpcStatus>;

export interface GoogleLongrunningOperation {
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: GoogleRpcStatus;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
}

export const GoogleLongrunningOperation: Schema.Schema<GoogleLongrunningOperation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  done: Schema.optional(Schema.Boolean),
  error: Schema.optional(GoogleRpcStatus),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleLongrunningOperation" }) as any as Schema.Schema<GoogleLongrunningOperation>;

export interface GoogleLongrunningListOperationsResponse {
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<GoogleLongrunningOperation>;
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
}

export const GoogleLongrunningListOperationsResponse: Schema.Schema<GoogleLongrunningListOperationsResponse> = Schema.suspend(() => Schema.Struct({
  operations: Schema.optional(Schema.Array(GoogleLongrunningOperation)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleLongrunningListOperationsResponse" }) as any as Schema.Schema<GoogleLongrunningListOperationsResponse>;

export interface GoogleProtobufEmpty {
}

export const GoogleProtobufEmpty: Schema.Schema<GoogleProtobufEmpty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleProtobufEmpty" }) as any as Schema.Schema<GoogleProtobufEmpty>;

export interface GoogleCloudDocumentaiV1DocumentTextAnchorTextSegment {
  /** TextSegment start UTF-8 char index in the Document.text. */
  startIndex?: string;
  /** TextSegment half open end UTF-8 char index in the Document.text. */
  endIndex?: string;
}

export const GoogleCloudDocumentaiV1DocumentTextAnchorTextSegment: Schema.Schema<GoogleCloudDocumentaiV1DocumentTextAnchorTextSegment> = Schema.suspend(() => Schema.Struct({
  startIndex: Schema.optional(Schema.String),
  endIndex: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentTextAnchorTextSegment" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentTextAnchorTextSegment>;

export interface GoogleCloudDocumentaiV1DocumentTextAnchor {
  /** The text segments from the Document.text. */
  textSegments?: Array<GoogleCloudDocumentaiV1DocumentTextAnchorTextSegment>;
  /** Contains the content of the text span so that users do not have to look it up in the text_segments. It is always populated for formFields. */
  content?: string;
}

export const GoogleCloudDocumentaiV1DocumentTextAnchor: Schema.Schema<GoogleCloudDocumentaiV1DocumentTextAnchor> = Schema.suspend(() => Schema.Struct({
  textSegments: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentTextAnchorTextSegment)),
  content: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentTextAnchor" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentTextAnchor>;

export interface GoogleTypeColor {
  /** The amount of red in the color as a value in the interval [0, 1]. */
  red?: number;
  /** The amount of green in the color as a value in the interval [0, 1]. */
  green?: number;
  /** The amount of blue in the color as a value in the interval [0, 1]. */
  blue?: number;
  /** The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0). */
  alpha?: number;
}

export const GoogleTypeColor: Schema.Schema<GoogleTypeColor> = Schema.suspend(() => Schema.Struct({
  red: Schema.optional(Schema.Number),
  green: Schema.optional(Schema.Number),
  blue: Schema.optional(Schema.Number),
  alpha: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleTypeColor" }) as any as Schema.Schema<GoogleTypeColor>;

export interface GoogleCloudDocumentaiV1DocumentStyleFontSize {
  /** Font size for the text. */
  size?: number;
  /** Unit for the font size. Follows CSS naming (such as `in`, `px`, and `pt`). */
  unit?: string;
}

export const GoogleCloudDocumentaiV1DocumentStyleFontSize: Schema.Schema<GoogleCloudDocumentaiV1DocumentStyleFontSize> = Schema.suspend(() => Schema.Struct({
  size: Schema.optional(Schema.Number),
  unit: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentStyleFontSize" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentStyleFontSize>;

export interface GoogleCloudDocumentaiV1DocumentStyle {
  /** Text anchor indexing into the Document.text. */
  textAnchor?: GoogleCloudDocumentaiV1DocumentTextAnchor;
  /** Text color. */
  color?: GoogleTypeColor;
  /** Text background color. */
  backgroundColor?: GoogleTypeColor;
  /** [Font weight](https://www.w3schools.com/cssref/pr_font_weight.asp). Possible values are `normal`, `bold`, `bolder`, and `lighter`. */
  fontWeight?: string;
  /** [Text style](https://www.w3schools.com/cssref/pr_font_font-style.asp). Possible values are `normal`, `italic`, and `oblique`. */
  textStyle?: string;
  /** [Text decoration](https://www.w3schools.com/cssref/pr_text_text-decoration.asp). Follows CSS standard. */
  textDecoration?: string;
  /** Font size. */
  fontSize?: GoogleCloudDocumentaiV1DocumentStyleFontSize;
  /** Font family such as `Arial`, `Times New Roman`. https://www.w3schools.com/cssref/pr_font_font-family.asp */
  fontFamily?: string;
}

export const GoogleCloudDocumentaiV1DocumentStyle: Schema.Schema<GoogleCloudDocumentaiV1DocumentStyle> = Schema.suspend(() => Schema.Struct({
  textAnchor: Schema.optional(GoogleCloudDocumentaiV1DocumentTextAnchor),
  color: Schema.optional(GoogleTypeColor),
  backgroundColor: Schema.optional(GoogleTypeColor),
  fontWeight: Schema.optional(Schema.String),
  textStyle: Schema.optional(Schema.String),
  textDecoration: Schema.optional(Schema.String),
  fontSize: Schema.optional(GoogleCloudDocumentaiV1DocumentStyleFontSize),
  fontFamily: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentStyle" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentStyle>;

export interface GoogleCloudDocumentaiV1DocumentPageImage {
  /** Raw byte content of the image. */
  content?: string;
  /** Encoding [media type (MIME type)](https://www.iana.org/assignments/media-types/media-types.xhtml) for the image. */
  mimeType?: string;
  /** Width of the image in pixels. */
  width?: number;
  /** Height of the image in pixels. */
  height?: number;
}

export const GoogleCloudDocumentaiV1DocumentPageImage: Schema.Schema<GoogleCloudDocumentaiV1DocumentPageImage> = Schema.suspend(() => Schema.Struct({
  content: Schema.optional(Schema.String),
  mimeType: Schema.optional(Schema.String),
  width: Schema.optional(Schema.Number),
  height: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentPageImage" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentPageImage>;

export interface GoogleCloudDocumentaiV1DocumentPageMatrix {
  /** Number of rows in the matrix. */
  rows?: number;
  /** Number of columns in the matrix. */
  cols?: number;
  /** This encodes information about what data type the matrix uses. For example, 0 (CV_8U) is an unsigned 8-bit image. For the full list of OpenCV primitive data types, please refer to https://docs.opencv.org/4.3.0/d1/d1b/group__core__hal__interface.html */
  type?: number;
  /** The matrix data. */
  data?: string;
}

export const GoogleCloudDocumentaiV1DocumentPageMatrix: Schema.Schema<GoogleCloudDocumentaiV1DocumentPageMatrix> = Schema.suspend(() => Schema.Struct({
  rows: Schema.optional(Schema.Number),
  cols: Schema.optional(Schema.Number),
  type: Schema.optional(Schema.Number),
  data: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentPageMatrix" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentPageMatrix>;

export interface GoogleCloudDocumentaiV1DocumentPageDimension {
  /** Page width. */
  width?: number;
  /** Page height. */
  height?: number;
  /** Dimension unit. */
  unit?: string;
}

export const GoogleCloudDocumentaiV1DocumentPageDimension: Schema.Schema<GoogleCloudDocumentaiV1DocumentPageDimension> = Schema.suspend(() => Schema.Struct({
  width: Schema.optional(Schema.Number),
  height: Schema.optional(Schema.Number),
  unit: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentPageDimension" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentPageDimension>;

export interface GoogleCloudDocumentaiV1Vertex {
  /** X coordinate. */
  x?: number;
  /** Y coordinate (starts from the top of the image). */
  y?: number;
}

export const GoogleCloudDocumentaiV1Vertex: Schema.Schema<GoogleCloudDocumentaiV1Vertex> = Schema.suspend(() => Schema.Struct({
  x: Schema.optional(Schema.Number),
  y: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDocumentaiV1Vertex" }) as any as Schema.Schema<GoogleCloudDocumentaiV1Vertex>;

export interface GoogleCloudDocumentaiV1NormalizedVertex {
  /** X coordinate. */
  x?: number;
  /** Y coordinate (starts from the top of the image). */
  y?: number;
}

export const GoogleCloudDocumentaiV1NormalizedVertex: Schema.Schema<GoogleCloudDocumentaiV1NormalizedVertex> = Schema.suspend(() => Schema.Struct({
  x: Schema.optional(Schema.Number),
  y: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDocumentaiV1NormalizedVertex" }) as any as Schema.Schema<GoogleCloudDocumentaiV1NormalizedVertex>;

export interface GoogleCloudDocumentaiV1BoundingPoly {
  /** The bounding polygon vertices. */
  vertices?: Array<GoogleCloudDocumentaiV1Vertex>;
  /** The bounding polygon normalized vertices. */
  normalizedVertices?: Array<GoogleCloudDocumentaiV1NormalizedVertex>;
}

export const GoogleCloudDocumentaiV1BoundingPoly: Schema.Schema<GoogleCloudDocumentaiV1BoundingPoly> = Schema.suspend(() => Schema.Struct({
  vertices: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1Vertex)),
  normalizedVertices: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1NormalizedVertex)),
})).annotate({ identifier: "GoogleCloudDocumentaiV1BoundingPoly" }) as any as Schema.Schema<GoogleCloudDocumentaiV1BoundingPoly>;

export interface GoogleCloudDocumentaiV1DocumentPageLayout {
  /** Text anchor indexing into the Document.text. */
  textAnchor?: GoogleCloudDocumentaiV1DocumentTextAnchor;
  /** Confidence of the current Layout within context of the object this layout is for. For example, confidence can be for a single token, a table, a visual element, etc. depending on context. Range `[0, 1]`. */
  confidence?: number;
  /** The bounding polygon for the Layout. */
  boundingPoly?: GoogleCloudDocumentaiV1BoundingPoly;
  /** Detected orientation for the Layout. */
  orientation?: "ORIENTATION_UNSPECIFIED" | "PAGE_UP" | "PAGE_RIGHT" | "PAGE_DOWN" | "PAGE_LEFT" | (string & {});
}

export const GoogleCloudDocumentaiV1DocumentPageLayout: Schema.Schema<GoogleCloudDocumentaiV1DocumentPageLayout> = Schema.suspend(() => Schema.Struct({
  textAnchor: Schema.optional(GoogleCloudDocumentaiV1DocumentTextAnchor),
  confidence: Schema.optional(Schema.Number),
  boundingPoly: Schema.optional(GoogleCloudDocumentaiV1BoundingPoly),
  orientation: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentPageLayout" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentPageLayout>;

export interface GoogleCloudDocumentaiV1DocumentPageDetectedLanguage {
  /** The [BCP-47 language code](https://www.unicode.org/reports/tr35/#Unicode_locale_identifier), such as `en-US` or `sr-Latn`. */
  languageCode?: string;
  /** Confidence of detected language. Range `[0, 1]`. */
  confidence?: number;
}

export const GoogleCloudDocumentaiV1DocumentPageDetectedLanguage: Schema.Schema<GoogleCloudDocumentaiV1DocumentPageDetectedLanguage> = Schema.suspend(() => Schema.Struct({
  languageCode: Schema.optional(Schema.String),
  confidence: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentPageDetectedLanguage" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentPageDetectedLanguage>;

export interface GoogleCloudDocumentaiV1DocumentProvenanceParent {
  /** The index of the index into current revision's parent_ids list. */
  revision?: number;
  /** The index of the parent item in the corresponding item list (eg. list of entities, properties within entities, etc.) in the parent revision. */
  index?: number;
  /** The id of the parent provenance. */
  id?: number;
}

export const GoogleCloudDocumentaiV1DocumentProvenanceParent: Schema.Schema<GoogleCloudDocumentaiV1DocumentProvenanceParent> = Schema.suspend(() => Schema.Struct({
  revision: Schema.optional(Schema.Number),
  index: Schema.optional(Schema.Number),
  id: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentProvenanceParent" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentProvenanceParent>;

export interface GoogleCloudDocumentaiV1DocumentProvenance {
  /** The index of the revision that produced this element. */
  revision?: number;
  /** The Id of this operation. Needs to be unique within the scope of the revision. */
  id?: number;
  /** References to the original elements that are replaced. */
  parents?: Array<GoogleCloudDocumentaiV1DocumentProvenanceParent>;
  /** The type of provenance operation. */
  type?: "OPERATION_TYPE_UNSPECIFIED" | "ADD" | "REMOVE" | "UPDATE" | "REPLACE" | "EVAL_REQUESTED" | "EVAL_APPROVED" | "EVAL_SKIPPED" | (string & {});
}

export const GoogleCloudDocumentaiV1DocumentProvenance: Schema.Schema<GoogleCloudDocumentaiV1DocumentProvenance> = Schema.suspend(() => Schema.Struct({
  revision: Schema.optional(Schema.Number),
  id: Schema.optional(Schema.Number),
  parents: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentProvenanceParent)),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentProvenance" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentProvenance>;

export interface GoogleCloudDocumentaiV1DocumentPageBlock {
  /** Layout for Block. */
  layout?: GoogleCloudDocumentaiV1DocumentPageLayout;
  /** A list of detected languages together with confidence. */
  detectedLanguages?: Array<GoogleCloudDocumentaiV1DocumentPageDetectedLanguage>;
  /** The history of this annotation. */
  provenance?: GoogleCloudDocumentaiV1DocumentProvenance;
}

export const GoogleCloudDocumentaiV1DocumentPageBlock: Schema.Schema<GoogleCloudDocumentaiV1DocumentPageBlock> = Schema.suspend(() => Schema.Struct({
  layout: Schema.optional(GoogleCloudDocumentaiV1DocumentPageLayout),
  detectedLanguages: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentPageDetectedLanguage)),
  provenance: Schema.optional(GoogleCloudDocumentaiV1DocumentProvenance),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentPageBlock" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentPageBlock>;

export interface GoogleCloudDocumentaiV1DocumentPageParagraph {
  /** Layout for Paragraph. */
  layout?: GoogleCloudDocumentaiV1DocumentPageLayout;
  /** A list of detected languages together with confidence. */
  detectedLanguages?: Array<GoogleCloudDocumentaiV1DocumentPageDetectedLanguage>;
  /** The history of this annotation. */
  provenance?: GoogleCloudDocumentaiV1DocumentProvenance;
}

export const GoogleCloudDocumentaiV1DocumentPageParagraph: Schema.Schema<GoogleCloudDocumentaiV1DocumentPageParagraph> = Schema.suspend(() => Schema.Struct({
  layout: Schema.optional(GoogleCloudDocumentaiV1DocumentPageLayout),
  detectedLanguages: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentPageDetectedLanguage)),
  provenance: Schema.optional(GoogleCloudDocumentaiV1DocumentProvenance),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentPageParagraph" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentPageParagraph>;

export interface GoogleCloudDocumentaiV1DocumentPageLine {
  /** Layout for Line. */
  layout?: GoogleCloudDocumentaiV1DocumentPageLayout;
  /** A list of detected languages together with confidence. */
  detectedLanguages?: Array<GoogleCloudDocumentaiV1DocumentPageDetectedLanguage>;
  /** The history of this annotation. */
  provenance?: GoogleCloudDocumentaiV1DocumentProvenance;
}

export const GoogleCloudDocumentaiV1DocumentPageLine: Schema.Schema<GoogleCloudDocumentaiV1DocumentPageLine> = Schema.suspend(() => Schema.Struct({
  layout: Schema.optional(GoogleCloudDocumentaiV1DocumentPageLayout),
  detectedLanguages: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentPageDetectedLanguage)),
  provenance: Schema.optional(GoogleCloudDocumentaiV1DocumentProvenance),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentPageLine" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentPageLine>;

export interface GoogleCloudDocumentaiV1DocumentPageTokenDetectedBreak {
  /** Detected break type. */
  type?: "TYPE_UNSPECIFIED" | "SPACE" | "WIDE_SPACE" | "HYPHEN" | (string & {});
}

export const GoogleCloudDocumentaiV1DocumentPageTokenDetectedBreak: Schema.Schema<GoogleCloudDocumentaiV1DocumentPageTokenDetectedBreak> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentPageTokenDetectedBreak" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentPageTokenDetectedBreak>;

export interface GoogleCloudDocumentaiV1DocumentPageTokenStyleInfo {
  /** Font size in points (`1` point is `¹⁄₇₂` inches). */
  fontSize?: number;
  /** Font size in pixels, equal to _unrounded font_size_ * _resolution_ ÷ `72.0`. */
  pixelFontSize?: number;
  /** Letter spacing in points. */
  letterSpacing?: number;
  /** Name or style of the font. */
  fontType?: string;
  /** Whether the text is bold (equivalent to font_weight is at least `700`). */
  bold?: boolean;
  /** Whether the text is italic. */
  italic?: boolean;
  /** Whether the text is underlined. */
  underlined?: boolean;
  /** Whether the text is strikethrough. This feature is not supported yet. */
  strikeout?: boolean;
  /** Whether the text is a subscript. This feature is not supported yet. */
  subscript?: boolean;
  /** Whether the text is a superscript. This feature is not supported yet. */
  superscript?: boolean;
  /** Whether the text is in small caps. This feature is not supported yet. */
  smallcaps?: boolean;
  /** TrueType weight on a scale `100` (thin) to `1000` (ultra-heavy). Normal is `400`, bold is `700`. */
  fontWeight?: number;
  /** Whether the text is handwritten. */
  handwritten?: boolean;
  /** Color of the text. */
  textColor?: GoogleTypeColor;
  /** Color of the background. */
  backgroundColor?: GoogleTypeColor;
}

export const GoogleCloudDocumentaiV1DocumentPageTokenStyleInfo: Schema.Schema<GoogleCloudDocumentaiV1DocumentPageTokenStyleInfo> = Schema.suspend(() => Schema.Struct({
  fontSize: Schema.optional(Schema.Number),
  pixelFontSize: Schema.optional(Schema.Number),
  letterSpacing: Schema.optional(Schema.Number),
  fontType: Schema.optional(Schema.String),
  bold: Schema.optional(Schema.Boolean),
  italic: Schema.optional(Schema.Boolean),
  underlined: Schema.optional(Schema.Boolean),
  strikeout: Schema.optional(Schema.Boolean),
  subscript: Schema.optional(Schema.Boolean),
  superscript: Schema.optional(Schema.Boolean),
  smallcaps: Schema.optional(Schema.Boolean),
  fontWeight: Schema.optional(Schema.Number),
  handwritten: Schema.optional(Schema.Boolean),
  textColor: Schema.optional(GoogleTypeColor),
  backgroundColor: Schema.optional(GoogleTypeColor),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentPageTokenStyleInfo" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentPageTokenStyleInfo>;

export interface GoogleCloudDocumentaiV1DocumentPageToken {
  /** Layout for Token. */
  layout?: GoogleCloudDocumentaiV1DocumentPageLayout;
  /** Detected break at the end of a Token. */
  detectedBreak?: GoogleCloudDocumentaiV1DocumentPageTokenDetectedBreak;
  /** A list of detected languages together with confidence. */
  detectedLanguages?: Array<GoogleCloudDocumentaiV1DocumentPageDetectedLanguage>;
  /** The history of this annotation. */
  provenance?: GoogleCloudDocumentaiV1DocumentProvenance;
  /** Text style attributes. */
  styleInfo?: GoogleCloudDocumentaiV1DocumentPageTokenStyleInfo;
}

export const GoogleCloudDocumentaiV1DocumentPageToken: Schema.Schema<GoogleCloudDocumentaiV1DocumentPageToken> = Schema.suspend(() => Schema.Struct({
  layout: Schema.optional(GoogleCloudDocumentaiV1DocumentPageLayout),
  detectedBreak: Schema.optional(GoogleCloudDocumentaiV1DocumentPageTokenDetectedBreak),
  detectedLanguages: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentPageDetectedLanguage)),
  provenance: Schema.optional(GoogleCloudDocumentaiV1DocumentProvenance),
  styleInfo: Schema.optional(GoogleCloudDocumentaiV1DocumentPageTokenStyleInfo),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentPageToken" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentPageToken>;

export interface GoogleCloudDocumentaiV1DocumentPageVisualElement {
  /** Layout for VisualElement. */
  layout?: GoogleCloudDocumentaiV1DocumentPageLayout;
  /** Type of the VisualElement. */
  type?: string;
  /** A list of detected languages together with confidence. */
  detectedLanguages?: Array<GoogleCloudDocumentaiV1DocumentPageDetectedLanguage>;
}

export const GoogleCloudDocumentaiV1DocumentPageVisualElement: Schema.Schema<GoogleCloudDocumentaiV1DocumentPageVisualElement> = Schema.suspend(() => Schema.Struct({
  layout: Schema.optional(GoogleCloudDocumentaiV1DocumentPageLayout),
  type: Schema.optional(Schema.String),
  detectedLanguages: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentPageDetectedLanguage)),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentPageVisualElement" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentPageVisualElement>;

export interface GoogleCloudDocumentaiV1DocumentPageTableTableCell {
  /** Layout for TableCell. */
  layout?: GoogleCloudDocumentaiV1DocumentPageLayout;
  /** How many rows this cell spans. */
  rowSpan?: number;
  /** How many columns this cell spans. */
  colSpan?: number;
  /** A list of detected languages together with confidence. */
  detectedLanguages?: Array<GoogleCloudDocumentaiV1DocumentPageDetectedLanguage>;
}

export const GoogleCloudDocumentaiV1DocumentPageTableTableCell: Schema.Schema<GoogleCloudDocumentaiV1DocumentPageTableTableCell> = Schema.suspend(() => Schema.Struct({
  layout: Schema.optional(GoogleCloudDocumentaiV1DocumentPageLayout),
  rowSpan: Schema.optional(Schema.Number),
  colSpan: Schema.optional(Schema.Number),
  detectedLanguages: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentPageDetectedLanguage)),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentPageTableTableCell" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentPageTableTableCell>;

export interface GoogleCloudDocumentaiV1DocumentPageTableTableRow {
  /** Cells that make up this row. */
  cells?: Array<GoogleCloudDocumentaiV1DocumentPageTableTableCell>;
}

export const GoogleCloudDocumentaiV1DocumentPageTableTableRow: Schema.Schema<GoogleCloudDocumentaiV1DocumentPageTableTableRow> = Schema.suspend(() => Schema.Struct({
  cells: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentPageTableTableCell)),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentPageTableTableRow" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentPageTableTableRow>;

export interface GoogleCloudDocumentaiV1DocumentPageTable {
  /** Layout for Table. */
  layout?: GoogleCloudDocumentaiV1DocumentPageLayout;
  /** Header rows of the table. */
  headerRows?: Array<GoogleCloudDocumentaiV1DocumentPageTableTableRow>;
  /** Body rows of the table. */
  bodyRows?: Array<GoogleCloudDocumentaiV1DocumentPageTableTableRow>;
  /** A list of detected languages together with confidence. */
  detectedLanguages?: Array<GoogleCloudDocumentaiV1DocumentPageDetectedLanguage>;
  /** The history of this table. */
  provenance?: GoogleCloudDocumentaiV1DocumentProvenance;
}

export const GoogleCloudDocumentaiV1DocumentPageTable: Schema.Schema<GoogleCloudDocumentaiV1DocumentPageTable> = Schema.suspend(() => Schema.Struct({
  layout: Schema.optional(GoogleCloudDocumentaiV1DocumentPageLayout),
  headerRows: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentPageTableTableRow)),
  bodyRows: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentPageTableTableRow)),
  detectedLanguages: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentPageDetectedLanguage)),
  provenance: Schema.optional(GoogleCloudDocumentaiV1DocumentProvenance),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentPageTable" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentPageTable>;

export interface GoogleCloudDocumentaiV1DocumentPageFormField {
  /** Layout for the FormField name. For example, `Address`, `Email`, `Grand total`, `Phone number`, etc. */
  fieldName?: GoogleCloudDocumentaiV1DocumentPageLayout;
  /** Layout for the FormField value. */
  fieldValue?: GoogleCloudDocumentaiV1DocumentPageLayout;
  /** A list of detected languages for name together with confidence. */
  nameDetectedLanguages?: Array<GoogleCloudDocumentaiV1DocumentPageDetectedLanguage>;
  /** A list of detected languages for value together with confidence. */
  valueDetectedLanguages?: Array<GoogleCloudDocumentaiV1DocumentPageDetectedLanguage>;
  /** If the value is non-textual, this field represents the type. Current valid values are: - blank (this indicates the `field_value` is normal text) - `unfilled_checkbox` - `filled_checkbox` */
  valueType?: string;
  /** Created for Labeling UI to export key text. If corrections were made to the text identified by the `field_name.text_anchor`, this field will contain the correction. */
  correctedKeyText?: string;
  /** Created for Labeling UI to export value text. If corrections were made to the text identified by the `field_value.text_anchor`, this field will contain the correction. */
  correctedValueText?: string;
  /** The history of this annotation. */
  provenance?: GoogleCloudDocumentaiV1DocumentProvenance;
}

export const GoogleCloudDocumentaiV1DocumentPageFormField: Schema.Schema<GoogleCloudDocumentaiV1DocumentPageFormField> = Schema.suspend(() => Schema.Struct({
  fieldName: Schema.optional(GoogleCloudDocumentaiV1DocumentPageLayout),
  fieldValue: Schema.optional(GoogleCloudDocumentaiV1DocumentPageLayout),
  nameDetectedLanguages: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentPageDetectedLanguage)),
  valueDetectedLanguages: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentPageDetectedLanguage)),
  valueType: Schema.optional(Schema.String),
  correctedKeyText: Schema.optional(Schema.String),
  correctedValueText: Schema.optional(Schema.String),
  provenance: Schema.optional(GoogleCloudDocumentaiV1DocumentProvenance),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentPageFormField" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentPageFormField>;

export interface GoogleCloudDocumentaiV1DocumentPageSymbol {
  /** Layout for Symbol. */
  layout?: GoogleCloudDocumentaiV1DocumentPageLayout;
  /** A list of detected languages together with confidence. */
  detectedLanguages?: Array<GoogleCloudDocumentaiV1DocumentPageDetectedLanguage>;
}

export const GoogleCloudDocumentaiV1DocumentPageSymbol: Schema.Schema<GoogleCloudDocumentaiV1DocumentPageSymbol> = Schema.suspend(() => Schema.Struct({
  layout: Schema.optional(GoogleCloudDocumentaiV1DocumentPageLayout),
  detectedLanguages: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentPageDetectedLanguage)),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentPageSymbol" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentPageSymbol>;

export interface GoogleCloudDocumentaiV1Barcode {
  /** Format of a barcode. The supported formats are: - `CODE_128`: Code 128 type. - `CODE_39`: Code 39 type. - `CODE_93`: Code 93 type. - `CODABAR`: Codabar type. - `DATA_MATRIX`: 2D Data Matrix type. - `ITF`: ITF type. - `EAN_13`: EAN-13 type. - `EAN_8`: EAN-8 type. - `QR_CODE`: 2D QR code type. - `UPC_A`: UPC-A type. - `UPC_E`: UPC-E type. - `PDF417`: PDF417 type. - `AZTEC`: 2D Aztec code type. - `DATABAR`: GS1 DataBar code type. */
  format?: string;
  /** Value format describes the format of the value that a barcode encodes. The supported formats are: - `CONTACT_INFO`: Contact information. - `EMAIL`: Email address. - `ISBN`: ISBN identifier. - `PHONE`: Phone number. - `PRODUCT`: Product. - `SMS`: SMS message. - `TEXT`: Text string. - `URL`: URL address. - `WIFI`: Wifi information. - `GEO`: Geo-localization. - `CALENDAR_EVENT`: Calendar event. - `DRIVER_LICENSE`: Driver's license. */
  valueFormat?: string;
  /** Raw value encoded in the barcode. For example: `'MEBKM:TITLE:Google;URL:https://www.google.com;;'`. */
  rawValue?: string;
}

export const GoogleCloudDocumentaiV1Barcode: Schema.Schema<GoogleCloudDocumentaiV1Barcode> = Schema.suspend(() => Schema.Struct({
  format: Schema.optional(Schema.String),
  valueFormat: Schema.optional(Schema.String),
  rawValue: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1Barcode" }) as any as Schema.Schema<GoogleCloudDocumentaiV1Barcode>;

export interface GoogleCloudDocumentaiV1DocumentPageDetectedBarcode {
  /** Layout for DetectedBarcode. */
  layout?: GoogleCloudDocumentaiV1DocumentPageLayout;
  /** Detailed barcode information of the DetectedBarcode. */
  barcode?: GoogleCloudDocumentaiV1Barcode;
}

export const GoogleCloudDocumentaiV1DocumentPageDetectedBarcode: Schema.Schema<GoogleCloudDocumentaiV1DocumentPageDetectedBarcode> = Schema.suspend(() => Schema.Struct({
  layout: Schema.optional(GoogleCloudDocumentaiV1DocumentPageLayout),
  barcode: Schema.optional(GoogleCloudDocumentaiV1Barcode),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentPageDetectedBarcode" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentPageDetectedBarcode>;

export interface GoogleCloudDocumentaiV1DocumentPageImageQualityScoresDetectedDefect {
  /** Name of the defect type. Supported values are: - `quality/defect_blurry` - `quality/defect_noisy` - `quality/defect_dark` - `quality/defect_faint` - `quality/defect_text_too_small` - `quality/defect_document_cutoff` - `quality/defect_text_cutoff` - `quality/defect_glare` */
  type?: string;
  /** Confidence of detected defect. Range `[0, 1]` where `1` indicates strong confidence that the defect exists. */
  confidence?: number;
}

export const GoogleCloudDocumentaiV1DocumentPageImageQualityScoresDetectedDefect: Schema.Schema<GoogleCloudDocumentaiV1DocumentPageImageQualityScoresDetectedDefect> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  confidence: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentPageImageQualityScoresDetectedDefect" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentPageImageQualityScoresDetectedDefect>;

export interface GoogleCloudDocumentaiV1DocumentPageImageQualityScores {
  /** The overall quality score. Range `[0, 1]` where `1` is perfect quality. */
  qualityScore?: number;
  /** A list of detected defects. */
  detectedDefects?: Array<GoogleCloudDocumentaiV1DocumentPageImageQualityScoresDetectedDefect>;
}

export const GoogleCloudDocumentaiV1DocumentPageImageQualityScores: Schema.Schema<GoogleCloudDocumentaiV1DocumentPageImageQualityScores> = Schema.suspend(() => Schema.Struct({
  qualityScore: Schema.optional(Schema.Number),
  detectedDefects: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentPageImageQualityScoresDetectedDefect)),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentPageImageQualityScores" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentPageImageQualityScores>;

export interface GoogleCloudDocumentaiV1DocumentPage {
  /** 1-based index for current Page in a parent Document. Useful when a page is taken out of a Document for individual processing. */
  pageNumber?: number;
  /** Rendered image for this page. This image is preprocessed to remove any skew, rotation, and distortions such that the annotation bounding boxes can be upright and axis-aligned. */
  image?: GoogleCloudDocumentaiV1DocumentPageImage;
  /** Transformation matrices that were applied to the original document image to produce Page.image. */
  transforms?: Array<GoogleCloudDocumentaiV1DocumentPageMatrix>;
  /** Physical dimension of the page. */
  dimension?: GoogleCloudDocumentaiV1DocumentPageDimension;
  /** Layout for the page. */
  layout?: GoogleCloudDocumentaiV1DocumentPageLayout;
  /** A list of detected languages together with confidence. */
  detectedLanguages?: Array<GoogleCloudDocumentaiV1DocumentPageDetectedLanguage>;
  /** A list of visually detected text blocks on the page. A block has a set of lines (collected into paragraphs) that have a common line-spacing and orientation. */
  blocks?: Array<GoogleCloudDocumentaiV1DocumentPageBlock>;
  /** A list of visually detected text paragraphs on the page. A collection of lines that a human would perceive as a paragraph. */
  paragraphs?: Array<GoogleCloudDocumentaiV1DocumentPageParagraph>;
  /** A list of visually detected text lines on the page. A collection of tokens that a human would perceive as a line. */
  lines?: Array<GoogleCloudDocumentaiV1DocumentPageLine>;
  /** A list of visually detected tokens on the page. */
  tokens?: Array<GoogleCloudDocumentaiV1DocumentPageToken>;
  /** A list of detected non-text visual elements, for example, checkbox, signature etc. on the page. */
  visualElements?: Array<GoogleCloudDocumentaiV1DocumentPageVisualElement>;
  /** A list of visually detected tables on the page. */
  tables?: Array<GoogleCloudDocumentaiV1DocumentPageTable>;
  /** A list of visually detected form fields on the page. */
  formFields?: Array<GoogleCloudDocumentaiV1DocumentPageFormField>;
  /** A list of visually detected symbols on the page. */
  symbols?: Array<GoogleCloudDocumentaiV1DocumentPageSymbol>;
  /** A list of detected barcodes. */
  detectedBarcodes?: Array<GoogleCloudDocumentaiV1DocumentPageDetectedBarcode>;
  /** Image quality scores. */
  imageQualityScores?: GoogleCloudDocumentaiV1DocumentPageImageQualityScores;
  /** The history of this page. */
  provenance?: GoogleCloudDocumentaiV1DocumentProvenance;
}

export const GoogleCloudDocumentaiV1DocumentPage: Schema.Schema<GoogleCloudDocumentaiV1DocumentPage> = Schema.suspend(() => Schema.Struct({
  pageNumber: Schema.optional(Schema.Number),
  image: Schema.optional(GoogleCloudDocumentaiV1DocumentPageImage),
  transforms: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentPageMatrix)),
  dimension: Schema.optional(GoogleCloudDocumentaiV1DocumentPageDimension),
  layout: Schema.optional(GoogleCloudDocumentaiV1DocumentPageLayout),
  detectedLanguages: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentPageDetectedLanguage)),
  blocks: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentPageBlock)),
  paragraphs: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentPageParagraph)),
  lines: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentPageLine)),
  tokens: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentPageToken)),
  visualElements: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentPageVisualElement)),
  tables: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentPageTable)),
  formFields: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentPageFormField)),
  symbols: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentPageSymbol)),
  detectedBarcodes: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentPageDetectedBarcode)),
  imageQualityScores: Schema.optional(GoogleCloudDocumentaiV1DocumentPageImageQualityScores),
  provenance: Schema.optional(GoogleCloudDocumentaiV1DocumentProvenance),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentPage" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentPage>;

export interface GoogleCloudDocumentaiV1DocumentPageAnchorPageRef {
  /** Required. Index into the Document.pages element, for example using `Document.pages` to locate the related page element. This field is skipped when its value is the default `0`. See https://developers.google.com/protocol-buffers/docs/proto3#json. */
  page?: string;
  /** Optional. The type of the layout element that is being referenced if any. */
  layoutType?: "LAYOUT_TYPE_UNSPECIFIED" | "BLOCK" | "PARAGRAPH" | "LINE" | "TOKEN" | "VISUAL_ELEMENT" | "TABLE" | "FORM_FIELD" | (string & {});
  /** Optional. Deprecated. Use PageRef.bounding_poly instead. */
  layoutId?: string;
  /** Optional. Identifies the bounding polygon of a layout element on the page. If `layout_type` is set, the bounding polygon must be exactly the same to the layout element it's referring to. */
  boundingPoly?: GoogleCloudDocumentaiV1BoundingPoly;
  /** Optional. Confidence of detected page element, if applicable. Range `[0, 1]`. */
  confidence?: number;
}

export const GoogleCloudDocumentaiV1DocumentPageAnchorPageRef: Schema.Schema<GoogleCloudDocumentaiV1DocumentPageAnchorPageRef> = Schema.suspend(() => Schema.Struct({
  page: Schema.optional(Schema.String),
  layoutType: Schema.optional(Schema.String),
  layoutId: Schema.optional(Schema.String),
  boundingPoly: Schema.optional(GoogleCloudDocumentaiV1BoundingPoly),
  confidence: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentPageAnchorPageRef" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentPageAnchorPageRef>;

export interface GoogleCloudDocumentaiV1DocumentPageAnchor {
  /** One or more references to visual page elements */
  pageRefs?: Array<GoogleCloudDocumentaiV1DocumentPageAnchorPageRef>;
}

export const GoogleCloudDocumentaiV1DocumentPageAnchor: Schema.Schema<GoogleCloudDocumentaiV1DocumentPageAnchor> = Schema.suspend(() => Schema.Struct({
  pageRefs: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentPageAnchorPageRef)),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentPageAnchor" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentPageAnchor>;

export interface GoogleTypeMoney {
  /** The three-letter currency code defined in ISO 4217. */
  currencyCode?: string;
  /** The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar. */
  units?: string;
  /** Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000. */
  nanos?: number;
}

export const GoogleTypeMoney: Schema.Schema<GoogleTypeMoney> = Schema.suspend(() => Schema.Struct({
  currencyCode: Schema.optional(Schema.String),
  units: Schema.optional(Schema.String),
  nanos: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleTypeMoney" }) as any as Schema.Schema<GoogleTypeMoney>;

export interface GoogleTypeDate {
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
}

export const GoogleTypeDate: Schema.Schema<GoogleTypeDate> = Schema.suspend(() => Schema.Struct({
  year: Schema.optional(Schema.Number),
  month: Schema.optional(Schema.Number),
  day: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleTypeDate" }) as any as Schema.Schema<GoogleTypeDate>;

export interface GoogleTypeTimeZone {
  /** IANA Time Zone Database time zone. For example "America/New_York". */
  id?: string;
  /** Optional. IANA Time Zone Database version number. For example "2019a". */
  version?: string;
}

export const GoogleTypeTimeZone: Schema.Schema<GoogleTypeTimeZone> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleTypeTimeZone" }) as any as Schema.Schema<GoogleTypeTimeZone>;

export interface GoogleTypeDateTime {
  /** Optional. Year of date. Must be from 1 to 9999, or 0 if specifying a datetime without a year. */
  year?: number;
  /** Optional. Month of year. Must be from 1 to 12, or 0 if specifying a datetime without a month. */
  month?: number;
  /** Optional. Day of month. Must be from 1 to 31 and valid for the year and month, or 0 if specifying a datetime without a day. */
  day?: number;
  /** Optional. Hours of day in 24 hour format. Should be from 0 to 23, defaults to 0 (midnight). An API may choose to allow the value "24:00:00" for scenarios like business closing time. */
  hours?: number;
  /** Optional. Minutes of hour of day. Must be from 0 to 59, defaults to 0. */
  minutes?: number;
  /** Optional. Seconds of minutes of the time. Must normally be from 0 to 59, defaults to 0. An API may allow the value 60 if it allows leap-seconds. */
  seconds?: number;
  /** Optional. Fractions of seconds in nanoseconds. Must be from 0 to 999,999,999, defaults to 0. */
  nanos?: number;
  /** UTC offset. Must be whole seconds, between -18 hours and +18 hours. For example, a UTC offset of -4:00 would be represented as { seconds: -14400 }. */
  utcOffset?: string;
  /** Time zone. */
  timeZone?: GoogleTypeTimeZone;
}

export const GoogleTypeDateTime: Schema.Schema<GoogleTypeDateTime> = Schema.suspend(() => Schema.Struct({
  year: Schema.optional(Schema.Number),
  month: Schema.optional(Schema.Number),
  day: Schema.optional(Schema.Number),
  hours: Schema.optional(Schema.Number),
  minutes: Schema.optional(Schema.Number),
  seconds: Schema.optional(Schema.Number),
  nanos: Schema.optional(Schema.Number),
  utcOffset: Schema.optional(Schema.String),
  timeZone: Schema.optional(GoogleTypeTimeZone),
})).annotate({ identifier: "GoogleTypeDateTime" }) as any as Schema.Schema<GoogleTypeDateTime>;

export interface GoogleTypePostalAddress {
  /** The schema revision of the `PostalAddress`. This must be set to 0, which is the latest revision. All new revisions **must** be backward compatible with old revisions. */
  revision?: number;
  /** Required. CLDR region code of the country/region of the address. This is never inferred and it is up to the user to ensure the value is correct. See https://cldr.unicode.org/ and https://www.unicode.org/cldr/charts/30/supplemental/territory_information.html for details. Example: "CH" for Switzerland. */
  regionCode?: string;
  /** Optional. BCP-47 language code of the contents of this address (if known). This is often the UI language of the input form or is expected to match one of the languages used in the address' country/region, or their transliterated equivalents. This can affect formatting in certain countries, but is not critical to the correctness of the data and will never affect any validation or other non-formatting related operations. If this value is not known, it should be omitted (rather than specifying a possibly incorrect default). Examples: "zh-Hant", "ja", "ja-Latn", "en". */
  languageCode?: string;
  /** Optional. Postal code of the address. Not all countries use or require postal codes to be present, but where they are used, they may trigger additional validation with other parts of the address (for example, state or zip code validation in the United States). */
  postalCode?: string;
  /** Optional. Additional, country-specific, sorting code. This is not used in most regions. Where it is used, the value is either a string like "CEDEX", optionally followed by a number (for example, "CEDEX 7"), or just a number alone, representing the "sector code" (Jamaica), "delivery area indicator" (Malawi) or "post office indicator" (Côte d'Ivoire). */
  sortingCode?: string;
  /** Optional. Highest administrative subdivision which is used for postal addresses of a country or region. For example, this can be a state, a province, an oblast, or a prefecture. For Spain, this is the province and not the autonomous community (for example, "Barcelona" and not "Catalonia"). Many countries don't use an administrative area in postal addresses. For example, in Switzerland, this should be left unpopulated. */
  administrativeArea?: string;
  /** Optional. Generally refers to the city or town portion of the address. Examples: US city, IT comune, UK post town. In regions of the world where localities are not well defined or do not fit into this structure well, leave `locality` empty and use `address_lines`. */
  locality?: string;
  /** Optional. Sublocality of the address. For example, this can be a neighborhood, borough, or district. */
  sublocality?: string;
  /** Unstructured address lines describing the lower levels of an address. Because values in `address_lines` do not have type information and may sometimes contain multiple values in a single field (for example, "Austin, TX"), it is important that the line order is clear. The order of address lines should be "envelope order" for the country or region of the address. In places where this can vary (for example, Japan), `address_language` is used to make it explicit (for example, "ja" for large-to-small ordering and "ja-Latn" or "en" for small-to-large). In this way, the most specific line of an address can be selected based on the language. The minimum permitted structural representation of an address consists of a `region_code` with all remaining information placed in the `address_lines`. It would be possible to format such an address very approximately without geocoding, but no semantic reasoning could be made about any of the address components until it was at least partially resolved. Creating an address only containing a `region_code` and `address_lines` and then geocoding is the recommended way to handle completely unstructured addresses (as opposed to guessing which parts of the address should be localities or administrative areas). */
  addressLines?: Array<string>;
  /** Optional. The recipient at the address. This field may, under certain circumstances, contain multiline information. For example, it might contain "care of" information. */
  recipients?: Array<string>;
  /** Optional. The name of the organization at the address. */
  organization?: string;
}

export const GoogleTypePostalAddress: Schema.Schema<GoogleTypePostalAddress> = Schema.suspend(() => Schema.Struct({
  revision: Schema.optional(Schema.Number),
  regionCode: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
  postalCode: Schema.optional(Schema.String),
  sortingCode: Schema.optional(Schema.String),
  administrativeArea: Schema.optional(Schema.String),
  locality: Schema.optional(Schema.String),
  sublocality: Schema.optional(Schema.String),
  addressLines: Schema.optional(Schema.Array(Schema.String)),
  recipients: Schema.optional(Schema.Array(Schema.String)),
  organization: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleTypePostalAddress" }) as any as Schema.Schema<GoogleTypePostalAddress>;

export interface GoogleCloudDocumentaiV1DocumentEntityNormalizedValue {
  /** Money value. See also: https://github.com/googleapis/googleapis/blob/master/google/type/money.proto */
  moneyValue?: GoogleTypeMoney;
  /** Date value. Includes year, month, day. See also: https://github.com/googleapis/googleapis/blob/master/google/type/date.proto */
  dateValue?: GoogleTypeDate;
  /** DateTime value. Includes date, time, and timezone. See also: https://github.com/googleapis/googleapis/blob/master/google/type/datetime.proto */
  datetimeValue?: GoogleTypeDateTime;
  /** Postal address. See also: https://github.com/googleapis/googleapis/blob/master/google/type/postal_address.proto */
  addressValue?: GoogleTypePostalAddress;
  /** Boolean value. Can be used for entities with binary values, or for checkboxes. */
  booleanValue?: boolean;
  /** Integer value. */
  integerValue?: number;
  /** Float value. */
  floatValue?: number;
  /** A signature - a graphical representation of a person's name, often used to sign a document. */
  signatureValue?: boolean;
  /** Optional. An optional field to store a normalized string. For some entity types, one of respective `structured_value` fields may also be populated. Also not all the types of `structured_value` will be normalized. For example, some processors may not generate `float` or `integer` normalized text by default. Below are sample formats mapped to structured values. - Money/Currency type (`money_value`) is in the ISO 4217 text format. - Date type (`date_value`) is in the ISO 8601 text format. - Datetime type (`datetime_value`) is in the ISO 8601 text format. */
  text?: string;
}

export const GoogleCloudDocumentaiV1DocumentEntityNormalizedValue: Schema.Schema<GoogleCloudDocumentaiV1DocumentEntityNormalizedValue> = Schema.suspend(() => Schema.Struct({
  moneyValue: Schema.optional(GoogleTypeMoney),
  dateValue: Schema.optional(GoogleTypeDate),
  datetimeValue: Schema.optional(GoogleTypeDateTime),
  addressValue: Schema.optional(GoogleTypePostalAddress),
  booleanValue: Schema.optional(Schema.Boolean),
  integerValue: Schema.optional(Schema.Number),
  floatValue: Schema.optional(Schema.Number),
  signatureValue: Schema.optional(Schema.Boolean),
  text: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentEntityNormalizedValue" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentEntityNormalizedValue>;

export interface GoogleCloudDocumentaiV1DocumentEntity {
  /** Optional. Provenance of the entity. Text anchor indexing into the Document.text. */
  textAnchor?: GoogleCloudDocumentaiV1DocumentTextAnchor;
  /** Required. Entity type from a schema, for example, `Address`. */
  type?: string;
  /** Optional. Text value of the entity, for example, `1600 Amphitheatre Pkwy`. */
  mentionText?: string;
  /** Optional. Deprecated. Use `id` field instead. */
  mentionId?: string;
  /** Optional. Confidence of detected Schema entity. Range `[0, 1]`. */
  confidence?: number;
  /** Optional. Represents the provenance of this entity wrt. the location on the page where it was found. */
  pageAnchor?: GoogleCloudDocumentaiV1DocumentPageAnchor;
  /** Optional. Canonical id. This will be a unique value in the entity list for this document. */
  id?: string;
  /** Optional. Normalized entity value. Absent if the extracted value could not be converted or the type (for example, address) is not supported for certain parsers. This field is also only populated for certain supported document types. */
  normalizedValue?: GoogleCloudDocumentaiV1DocumentEntityNormalizedValue;
  /** Optional. Entities can be nested to form a hierarchical data structure representing the content in the document. */
  properties?: Array<GoogleCloudDocumentaiV1DocumentEntity>;
  /** Optional. The history of this annotation. */
  provenance?: GoogleCloudDocumentaiV1DocumentProvenance;
  /** Optional. Whether the entity will be redacted for de-identification purposes. */
  redacted?: boolean;
  /** Optional. Specifies how the entity's value is obtained. */
  method?: "METHOD_UNSPECIFIED" | "EXTRACT" | "DERIVE" | (string & {});
}

export const GoogleCloudDocumentaiV1DocumentEntity: Schema.Schema<GoogleCloudDocumentaiV1DocumentEntity> = Schema.suspend(() => Schema.Struct({
  textAnchor: Schema.optional(GoogleCloudDocumentaiV1DocumentTextAnchor),
  type: Schema.optional(Schema.String),
  mentionText: Schema.optional(Schema.String),
  mentionId: Schema.optional(Schema.String),
  confidence: Schema.optional(Schema.Number),
  pageAnchor: Schema.optional(GoogleCloudDocumentaiV1DocumentPageAnchor),
  id: Schema.optional(Schema.String),
  normalizedValue: Schema.optional(GoogleCloudDocumentaiV1DocumentEntityNormalizedValue),
  properties: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentEntity)),
  provenance: Schema.optional(GoogleCloudDocumentaiV1DocumentProvenance),
  redacted: Schema.optional(Schema.Boolean),
  method: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentEntity" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentEntity>;

export interface GoogleCloudDocumentaiV1DocumentEntityRelation {
  /** Subject entity id. */
  subjectId?: string;
  /** Object entity id. */
  objectId?: string;
  /** Relationship description. */
  relation?: string;
}

export const GoogleCloudDocumentaiV1DocumentEntityRelation: Schema.Schema<GoogleCloudDocumentaiV1DocumentEntityRelation> = Schema.suspend(() => Schema.Struct({
  subjectId: Schema.optional(Schema.String),
  objectId: Schema.optional(Schema.String),
  relation: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentEntityRelation" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentEntityRelation>;

export interface GoogleCloudDocumentaiV1DocumentTextChange {
  /** Provenance of the correction. Text anchor indexing into the Document.text. There can only be a single `TextAnchor.text_segments` element. If the start and end index of the text segment are the same, the text change is inserted before that index. */
  textAnchor?: GoogleCloudDocumentaiV1DocumentTextAnchor;
  /** The text that replaces the text identified in the `text_anchor`. */
  changedText?: string;
  /** The history of this annotation. */
  provenance?: Array<GoogleCloudDocumentaiV1DocumentProvenance>;
}

export const GoogleCloudDocumentaiV1DocumentTextChange: Schema.Schema<GoogleCloudDocumentaiV1DocumentTextChange> = Schema.suspend(() => Schema.Struct({
  textAnchor: Schema.optional(GoogleCloudDocumentaiV1DocumentTextAnchor),
  changedText: Schema.optional(Schema.String),
  provenance: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentProvenance)),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentTextChange" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentTextChange>;

export interface GoogleCloudDocumentaiV1DocumentShardInfo {
  /** The 0-based index of this shard. */
  shardIndex?: string;
  /** Total number of shards. */
  shardCount?: string;
  /** The index of the first character in Document.text in the overall document global text. */
  textOffset?: string;
  /** The index of the first page in Document.pages in the overall document global pages. Available for document shards created by the document splitter. */
  pageOffset?: number;
}

export const GoogleCloudDocumentaiV1DocumentShardInfo: Schema.Schema<GoogleCloudDocumentaiV1DocumentShardInfo> = Schema.suspend(() => Schema.Struct({
  shardIndex: Schema.optional(Schema.String),
  shardCount: Schema.optional(Schema.String),
  textOffset: Schema.optional(Schema.String),
  pageOffset: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentShardInfo" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentShardInfo>;

export interface GoogleCloudDocumentaiV1DocumentRevisionHumanReview {
  /** Human review state. For example, `requested`, `succeeded`, `rejected`. */
  state?: string;
  /** A message providing more details about the current state of processing. For example, the rejection reason when the state is `rejected`. */
  stateMessage?: string;
}

export const GoogleCloudDocumentaiV1DocumentRevisionHumanReview: Schema.Schema<GoogleCloudDocumentaiV1DocumentRevisionHumanReview> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  stateMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentRevisionHumanReview" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentRevisionHumanReview>;

export interface GoogleCloudDocumentaiV1DocumentRevision {
  /** If the change was made by a person specify the name or id of that person. */
  agent?: string;
  /** If the annotation was made by processor identify the processor by its resource name. */
  processor?: string;
  /** Id of the revision, internally generated by doc proto storage. Unique within the context of the document. */
  id?: string;
  /** The revisions that this revision is based on. This can include one or more parent (when documents are merged.) This field represents the index into the `revisions` field. */
  parent?: Array<number>;
  /** The revisions that this revision is based on. Must include all the ids that have anything to do with this revision - eg. there are `provenance.parent.revision` fields that index into this field. */
  parentIds?: Array<string>;
  /** The time that the revision was created, internally generated by doc proto storage at the time of create. */
  createTime?: string;
  /** Human Review information of this revision. */
  humanReview?: GoogleCloudDocumentaiV1DocumentRevisionHumanReview;
}

export const GoogleCloudDocumentaiV1DocumentRevision: Schema.Schema<GoogleCloudDocumentaiV1DocumentRevision> = Schema.suspend(() => Schema.Struct({
  agent: Schema.optional(Schema.String),
  processor: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  parent: Schema.optional(Schema.Array(Schema.Number)),
  parentIds: Schema.optional(Schema.Array(Schema.String)),
  createTime: Schema.optional(Schema.String),
  humanReview: Schema.optional(GoogleCloudDocumentaiV1DocumentRevisionHumanReview),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentRevision" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentRevision>;

export interface GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTextBlock {
  /** Text content stored in the block. */
  text?: string;
  /** Type of the text in the block. Available options are: `paragraph`, `subtitle`, `heading-1`, `heading-2`, `heading-3`, `heading-4`, `heading-5`, `header`, `footer`. */
  type?: string;
  /** A text block could further have child blocks. Repeated blocks support further hierarchies and nested blocks. */
  blocks?: Array<GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlock>;
}

export const GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTextBlock: Schema.Schema<GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTextBlock> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  blocks: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlock)),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTextBlock" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTextBlock>;

export interface GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTableCell {
  /** A table cell is a list of blocks. Repeated blocks support further hierarchies and nested blocks. */
  blocks?: Array<GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlock>;
  /** How many rows this cell spans. */
  rowSpan?: number;
  /** How many columns this cell spans. */
  colSpan?: number;
}

export const GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTableCell: Schema.Schema<GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTableCell> = Schema.suspend(() => Schema.Struct({
  blocks: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlock)),
  rowSpan: Schema.optional(Schema.Number),
  colSpan: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTableCell" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTableCell>;

export interface GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTableRow {
  /** A table row is a list of table cells. */
  cells?: Array<GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTableCell>;
}

export const GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTableRow: Schema.Schema<GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTableRow> = Schema.suspend(() => Schema.Struct({
  cells: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTableCell)),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTableRow" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTableRow>;

export interface GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTableBlock {
  /** Header rows at the top of the table. */
  headerRows?: Array<GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTableRow>;
  /** Body rows containing main table content. */
  bodyRows?: Array<GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTableRow>;
  /** Table caption/title. */
  caption?: string;
}

export const GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTableBlock: Schema.Schema<GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTableBlock> = Schema.suspend(() => Schema.Struct({
  headerRows: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTableRow)),
  bodyRows: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTableRow)),
  caption: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTableBlock" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTableBlock>;

export interface GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutListEntry {
  /** A list entry is a list of blocks. Repeated blocks support further hierarchies and nested blocks. */
  blocks?: Array<GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlock>;
}

export const GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutListEntry: Schema.Schema<GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutListEntry> = Schema.suspend(() => Schema.Struct({
  blocks: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlock)),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutListEntry" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutListEntry>;

export interface GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutListBlock {
  /** List entries that constitute a list block. */
  listEntries?: Array<GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutListEntry>;
  /** Type of the list_entries (if exist). Available options are `ordered` and `unordered`. */
  type?: string;
}

export const GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutListBlock: Schema.Schema<GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutListBlock> = Schema.suspend(() => Schema.Struct({
  listEntries: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutListEntry)),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutListBlock" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutListBlock>;

export interface GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutPageSpan {
  /** Page where block starts in the document. */
  pageStart?: number;
  /** Page where block ends in the document. */
  pageEnd?: number;
}

export const GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutPageSpan: Schema.Schema<GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutPageSpan> = Schema.suspend(() => Schema.Struct({
  pageStart: Schema.optional(Schema.Number),
  pageEnd: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutPageSpan" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutPageSpan>;

export interface GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlock {
  /** Block consisting of text content. */
  textBlock?: GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTextBlock;
  /** Block consisting of table content/structure. */
  tableBlock?: GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTableBlock;
  /** Block consisting of list content/structure. */
  listBlock?: GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutListBlock;
  /** ID of the block. */
  blockId?: string;
  /** Page span of the block. */
  pageSpan?: GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutPageSpan;
  /** Identifies the bounding box for the block. */
  boundingBox?: GoogleCloudDocumentaiV1BoundingPoly;
}

export const GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlock: Schema.Schema<GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlock> = Schema.suspend(() => Schema.Struct({
  textBlock: Schema.optional(GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTextBlock),
  tableBlock: Schema.optional(GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTableBlock),
  listBlock: Schema.optional(GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutListBlock),
  blockId: Schema.optional(Schema.String),
  pageSpan: Schema.optional(GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutPageSpan),
  boundingBox: Schema.optional(GoogleCloudDocumentaiV1BoundingPoly),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlock" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlock>;

export interface GoogleCloudDocumentaiV1DocumentDocumentLayout {
  /** List of blocks in the document. */
  blocks?: Array<GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlock>;
}

export const GoogleCloudDocumentaiV1DocumentDocumentLayout: Schema.Schema<GoogleCloudDocumentaiV1DocumentDocumentLayout> = Schema.suspend(() => Schema.Struct({
  blocks: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlock)),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentDocumentLayout" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentDocumentLayout>;

export interface GoogleCloudDocumentaiV1DocumentChunkedDocumentChunkChunkPageSpan {
  /** Page where chunk starts in the document. */
  pageStart?: number;
  /** Page where chunk ends in the document. */
  pageEnd?: number;
}

export const GoogleCloudDocumentaiV1DocumentChunkedDocumentChunkChunkPageSpan: Schema.Schema<GoogleCloudDocumentaiV1DocumentChunkedDocumentChunkChunkPageSpan> = Schema.suspend(() => Schema.Struct({
  pageStart: Schema.optional(Schema.Number),
  pageEnd: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentChunkedDocumentChunkChunkPageSpan" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentChunkedDocumentChunkChunkPageSpan>;

export interface GoogleCloudDocumentaiV1DocumentChunkedDocumentChunkChunkPageHeader {
  /** Header in text format. */
  text?: string;
  /** Page span of the header. */
  pageSpan?: GoogleCloudDocumentaiV1DocumentChunkedDocumentChunkChunkPageSpan;
}

export const GoogleCloudDocumentaiV1DocumentChunkedDocumentChunkChunkPageHeader: Schema.Schema<GoogleCloudDocumentaiV1DocumentChunkedDocumentChunkChunkPageHeader> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  pageSpan: Schema.optional(GoogleCloudDocumentaiV1DocumentChunkedDocumentChunkChunkPageSpan),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentChunkedDocumentChunkChunkPageHeader" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentChunkedDocumentChunkChunkPageHeader>;

export interface GoogleCloudDocumentaiV1DocumentChunkedDocumentChunkChunkPageFooter {
  /** Footer in text format. */
  text?: string;
  /** Page span of the footer. */
  pageSpan?: GoogleCloudDocumentaiV1DocumentChunkedDocumentChunkChunkPageSpan;
}

export const GoogleCloudDocumentaiV1DocumentChunkedDocumentChunkChunkPageFooter: Schema.Schema<GoogleCloudDocumentaiV1DocumentChunkedDocumentChunkChunkPageFooter> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  pageSpan: Schema.optional(GoogleCloudDocumentaiV1DocumentChunkedDocumentChunkChunkPageSpan),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentChunkedDocumentChunkChunkPageFooter" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentChunkedDocumentChunkChunkPageFooter>;

export interface GoogleCloudDocumentaiV1DocumentChunkedDocumentChunk {
  /** ID of the chunk. */
  chunkId?: string;
  /** Unused. */
  sourceBlockIds?: Array<string>;
  /** Text content of the chunk. */
  content?: string;
  /** Page span of the chunk. */
  pageSpan?: GoogleCloudDocumentaiV1DocumentChunkedDocumentChunkChunkPageSpan;
  /** Page headers associated with the chunk. */
  pageHeaders?: Array<GoogleCloudDocumentaiV1DocumentChunkedDocumentChunkChunkPageHeader>;
  /** Page footers associated with the chunk. */
  pageFooters?: Array<GoogleCloudDocumentaiV1DocumentChunkedDocumentChunkChunkPageFooter>;
}

export const GoogleCloudDocumentaiV1DocumentChunkedDocumentChunk: Schema.Schema<GoogleCloudDocumentaiV1DocumentChunkedDocumentChunk> = Schema.suspend(() => Schema.Struct({
  chunkId: Schema.optional(Schema.String),
  sourceBlockIds: Schema.optional(Schema.Array(Schema.String)),
  content: Schema.optional(Schema.String),
  pageSpan: Schema.optional(GoogleCloudDocumentaiV1DocumentChunkedDocumentChunkChunkPageSpan),
  pageHeaders: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentChunkedDocumentChunkChunkPageHeader)),
  pageFooters: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentChunkedDocumentChunkChunkPageFooter)),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentChunkedDocumentChunk" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentChunkedDocumentChunk>;

export interface GoogleCloudDocumentaiV1DocumentChunkedDocument {
  /** List of chunks. */
  chunks?: Array<GoogleCloudDocumentaiV1DocumentChunkedDocumentChunk>;
}

export const GoogleCloudDocumentaiV1DocumentChunkedDocument: Schema.Schema<GoogleCloudDocumentaiV1DocumentChunkedDocument> = Schema.suspend(() => Schema.Struct({
  chunks: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentChunkedDocumentChunk)),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentChunkedDocument" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentChunkedDocument>;

export interface GoogleCloudDocumentaiV1DocumentEntityValidationOutputValidationResult {
  /** Optional. The name of the rule resource that is used for validation. Format: `projects/{project}/locations/{location}/rules/{rule}` */
  rule?: string;
  /** The display name of the validation rule. */
  ruleName?: string;
  /** The description of the validation rule. */
  ruleDescription?: string;
  /** The result of the validation rule. */
  validationResultType?: "VALIDATION_RESULT_TYPE_UNSPECIFIED" | "VALIDATION_RESULT_TYPE_VALID" | "VALIDATION_RESULT_TYPE_INVALID" | "VALIDATION_RESULT_TYPE_SKIPPED" | "VALIDATION_RESULT_TYPE_NOT_APPLICABLE" | (string & {});
  /** The detailed information of the running the validation process using the entity from the document based on the validation rule. */
  validationDetails?: string;
}

export const GoogleCloudDocumentaiV1DocumentEntityValidationOutputValidationResult: Schema.Schema<GoogleCloudDocumentaiV1DocumentEntityValidationOutputValidationResult> = Schema.suspend(() => Schema.Struct({
  rule: Schema.optional(Schema.String),
  ruleName: Schema.optional(Schema.String),
  ruleDescription: Schema.optional(Schema.String),
  validationResultType: Schema.optional(Schema.String),
  validationDetails: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentEntityValidationOutputValidationResult" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentEntityValidationOutputValidationResult>;

export interface GoogleCloudDocumentaiV1DocumentEntityValidationOutput {
  /** The result of each validation rule. */
  validationResults?: Array<GoogleCloudDocumentaiV1DocumentEntityValidationOutputValidationResult>;
  /** The overall result of the validation, true if all applicable rules are valid. */
  passAllRules?: boolean;
}

export const GoogleCloudDocumentaiV1DocumentEntityValidationOutput: Schema.Schema<GoogleCloudDocumentaiV1DocumentEntityValidationOutput> = Schema.suspend(() => Schema.Struct({
  validationResults: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentEntityValidationOutputValidationResult)),
  passAllRules: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentEntityValidationOutput" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentEntityValidationOutput>;

export interface GoogleCloudDocumentaiV1DocumentEntitiesRevision {
  /** The revision id. */
  revisionId?: string;
  /** The entities in this revision. */
  entities?: Array<GoogleCloudDocumentaiV1DocumentEntity>;
  /** The entity validation output for this revision. */
  entityValidationOutput?: GoogleCloudDocumentaiV1DocumentEntityValidationOutput;
  /** Optional. The history of this revision. */
  provenance?: GoogleCloudDocumentaiV1DocumentProvenance;
}

export const GoogleCloudDocumentaiV1DocumentEntitiesRevision: Schema.Schema<GoogleCloudDocumentaiV1DocumentEntitiesRevision> = Schema.suspend(() => Schema.Struct({
  revisionId: Schema.optional(Schema.String),
  entities: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentEntity)),
  entityValidationOutput: Schema.optional(GoogleCloudDocumentaiV1DocumentEntityValidationOutput),
  provenance: Schema.optional(GoogleCloudDocumentaiV1DocumentProvenance),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentEntitiesRevision" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentEntitiesRevision>;

export interface GoogleCloudDocumentaiV1Document {
  /** Optional. Currently supports Google Cloud Storage URI of the form `gs://bucket_name/object_name`. Object versioning is not supported. For more information, refer to [Google Cloud Storage Request URIs](https://cloud.google.com/storage/docs/reference-uris). */
  uri?: string;
  /** Optional. Inline document content, represented as a stream of bytes. Note: As with all `bytes` fields, protobuffers use a pure binary representation, whereas JSON representations use base64. */
  content?: string;
  /** Optional. An internal identifier for document. Should be loggable (no PII). */
  docid?: string;
  /** An IANA published [media type (MIME type)](https://www.iana.org/assignments/media-types/media-types.xhtml). */
  mimeType?: string;
  /** Optional. UTF-8 encoded text in reading order from the document. */
  text?: string;
  /** Styles for the Document.text. */
  textStyles?: Array<GoogleCloudDocumentaiV1DocumentStyle>;
  /** Visual page layout for the Document. */
  pages?: Array<GoogleCloudDocumentaiV1DocumentPage>;
  /** A list of entities detected on Document.text. For document shards, entities in this list may cross shard boundaries. */
  entities?: Array<GoogleCloudDocumentaiV1DocumentEntity>;
  /** Placeholder. Relationship among Document.entities. */
  entityRelations?: Array<GoogleCloudDocumentaiV1DocumentEntityRelation>;
  /** Placeholder. A list of text corrections made to Document.text. This is usually used for annotating corrections to OCR mistakes. Text changes for a given revision may not overlap with each other. */
  textChanges?: Array<GoogleCloudDocumentaiV1DocumentTextChange>;
  /** Information about the sharding if this document is sharded part of a larger document. If the document is not sharded, this message is not specified. */
  shardInfo?: GoogleCloudDocumentaiV1DocumentShardInfo;
  /** Any error that occurred while processing this document. */
  error?: GoogleRpcStatus;
  /** Placeholder. Revision history of this document. */
  revisions?: Array<GoogleCloudDocumentaiV1DocumentRevision>;
  /** Parsed layout of the document. */
  documentLayout?: GoogleCloudDocumentaiV1DocumentDocumentLayout;
  /** Document chunked based on chunking config. */
  chunkedDocument?: GoogleCloudDocumentaiV1DocumentChunkedDocument;
  /** The entity validation output for the document. This is the validation output for `document.entities` field. */
  entityValidationOutput?: GoogleCloudDocumentaiV1DocumentEntityValidationOutput;
  /** A list of entity revisions. The entity revisions are appended to the document in the processing order. This field can be used for comparing the entity extraction results at different stages of the processing. */
  entitiesRevisions?: Array<GoogleCloudDocumentaiV1DocumentEntitiesRevision>;
  /** The entity revision ID that `document.entities` field is based on. If this field is set and `entities_revisions` is not empty, the entities in `document.entities` field are the entities in the entity revision with this id and `document.entity_validation_output` field is the `entity_validation_output` field in this entity revision. */
  entitiesRevisionId?: string;
}

export const GoogleCloudDocumentaiV1Document: Schema.Schema<GoogleCloudDocumentaiV1Document> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
  content: Schema.optional(Schema.String),
  docid: Schema.optional(Schema.String),
  mimeType: Schema.optional(Schema.String),
  text: Schema.optional(Schema.String),
  textStyles: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentStyle)),
  pages: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentPage)),
  entities: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentEntity)),
  entityRelations: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentEntityRelation)),
  textChanges: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentTextChange)),
  shardInfo: Schema.optional(GoogleCloudDocumentaiV1DocumentShardInfo),
  error: Schema.optional(GoogleRpcStatus),
  revisions: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentRevision)),
  documentLayout: Schema.optional(GoogleCloudDocumentaiV1DocumentDocumentLayout),
  chunkedDocument: Schema.optional(GoogleCloudDocumentaiV1DocumentChunkedDocument),
  entityValidationOutput: Schema.optional(GoogleCloudDocumentaiV1DocumentEntityValidationOutput),
  entitiesRevisions: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentEntitiesRevision)),
  entitiesRevisionId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1Document" }) as any as Schema.Schema<GoogleCloudDocumentaiV1Document>;

export interface GoogleCloudDocumentaiV1RawDocument {
  /** Inline document content. */
  content?: string;
  /** An IANA MIME type (RFC6838) indicating the nature and format of the content. */
  mimeType?: string;
  /** The display name of the document, it supports all Unicode characters except the following: `*`, `?`, `[`, `]`, `%`, `{`, `}`,`'`, `\"`, `,` `~`, `=` and `:` are reserved. If not specified, a default ID is generated. */
  displayName?: string;
}

export const GoogleCloudDocumentaiV1RawDocument: Schema.Schema<GoogleCloudDocumentaiV1RawDocument> = Schema.suspend(() => Schema.Struct({
  content: Schema.optional(Schema.String),
  mimeType: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1RawDocument" }) as any as Schema.Schema<GoogleCloudDocumentaiV1RawDocument>;

export interface GoogleCloudDocumentaiV1GcsDocument {
  /** The Cloud Storage object uri. */
  gcsUri?: string;
  /** An IANA MIME type (RFC6838) of the content. */
  mimeType?: string;
}

export const GoogleCloudDocumentaiV1GcsDocument: Schema.Schema<GoogleCloudDocumentaiV1GcsDocument> = Schema.suspend(() => Schema.Struct({
  gcsUri: Schema.optional(Schema.String),
  mimeType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1GcsDocument" }) as any as Schema.Schema<GoogleCloudDocumentaiV1GcsDocument>;

export interface GoogleCloudDocumentaiV1ProcessOptionsIndividualPageSelector {
  /** Optional. Indices of the pages (starting from 1). */
  pages?: Array<number>;
}

export const GoogleCloudDocumentaiV1ProcessOptionsIndividualPageSelector: Schema.Schema<GoogleCloudDocumentaiV1ProcessOptionsIndividualPageSelector> = Schema.suspend(() => Schema.Struct({
  pages: Schema.optional(Schema.Array(Schema.Number)),
})).annotate({ identifier: "GoogleCloudDocumentaiV1ProcessOptionsIndividualPageSelector" }) as any as Schema.Schema<GoogleCloudDocumentaiV1ProcessOptionsIndividualPageSelector>;

export interface GoogleCloudDocumentaiV1OcrConfigHints {
  /** List of BCP-47 language codes to use for OCR. In most cases, not specifying it yields the best results since it enables automatic language detection. For languages based on the Latin alphabet, setting hints is not needed. In rare cases, when the language of the text in the image is known, setting a hint will help get better results (although it will be a significant hindrance if the hint is wrong). */
  languageHints?: Array<string>;
}

export const GoogleCloudDocumentaiV1OcrConfigHints: Schema.Schema<GoogleCloudDocumentaiV1OcrConfigHints> = Schema.suspend(() => Schema.Struct({
  languageHints: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDocumentaiV1OcrConfigHints" }) as any as Schema.Schema<GoogleCloudDocumentaiV1OcrConfigHints>;

export interface GoogleCloudDocumentaiV1OcrConfigPremiumFeatures {
  /** Turn on selection mark detector in OCR engine. Only available in OCR 2.0 (and later) processors. */
  enableSelectionMarkDetection?: boolean;
  /** Turn on font identification model and return font style information. */
  computeStyleInfo?: boolean;
  /** Turn on the model that can extract LaTeX math formulas. */
  enableMathOcr?: boolean;
}

export const GoogleCloudDocumentaiV1OcrConfigPremiumFeatures: Schema.Schema<GoogleCloudDocumentaiV1OcrConfigPremiumFeatures> = Schema.suspend(() => Schema.Struct({
  enableSelectionMarkDetection: Schema.optional(Schema.Boolean),
  computeStyleInfo: Schema.optional(Schema.Boolean),
  enableMathOcr: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDocumentaiV1OcrConfigPremiumFeatures" }) as any as Schema.Schema<GoogleCloudDocumentaiV1OcrConfigPremiumFeatures>;

export interface GoogleCloudDocumentaiV1OcrConfig {
  /** Hints for the OCR model. */
  hints?: GoogleCloudDocumentaiV1OcrConfigHints;
  /** Enables special handling for PDFs with existing text information. Results in better text extraction quality in such PDF inputs. */
  enableNativePdfParsing?: boolean;
  /** Enables intelligent document quality scores after OCR. Can help with diagnosing why OCR responses are of poor quality for a given input. Adds additional latency comparable to regular OCR to the process call. */
  enableImageQualityScores?: boolean;
  /** A list of advanced OCR options to further fine-tune OCR behavior. Current valid values are: - `legacy_layout`: a heuristics layout detection algorithm, which serves as an alternative to the current ML-based layout detection algorithm. Customers can choose the best suitable layout algorithm based on their situation. */
  advancedOcrOptions?: Array<string>;
  /** Includes symbol level OCR information if set to true. */
  enableSymbol?: boolean;
  /** Turn on font identification model and return font style information. Deprecated, use PremiumFeatures.compute_style_info instead. */
  computeStyleInfo?: boolean;
  /** Turn off character box detector in OCR engine. Character box detection is enabled by default in OCR 2.0 (and later) processors. */
  disableCharacterBoxesDetection?: boolean;
  /** Configurations for premium OCR features. */
  premiumFeatures?: GoogleCloudDocumentaiV1OcrConfigPremiumFeatures;
}

export const GoogleCloudDocumentaiV1OcrConfig: Schema.Schema<GoogleCloudDocumentaiV1OcrConfig> = Schema.suspend(() => Schema.Struct({
  hints: Schema.optional(GoogleCloudDocumentaiV1OcrConfigHints),
  enableNativePdfParsing: Schema.optional(Schema.Boolean),
  enableImageQualityScores: Schema.optional(Schema.Boolean),
  advancedOcrOptions: Schema.optional(Schema.Array(Schema.String)),
  enableSymbol: Schema.optional(Schema.Boolean),
  computeStyleInfo: Schema.optional(Schema.Boolean),
  disableCharacterBoxesDetection: Schema.optional(Schema.Boolean),
  premiumFeatures: Schema.optional(GoogleCloudDocumentaiV1OcrConfigPremiumFeatures),
})).annotate({ identifier: "GoogleCloudDocumentaiV1OcrConfig" }) as any as Schema.Schema<GoogleCloudDocumentaiV1OcrConfig>;

export interface GoogleCloudDocumentaiV1ProcessOptionsLayoutConfigChunkingConfig {
  /** Optional. The chunk sizes to use when splitting documents, in order of level. */
  chunkSize?: number;
  /** Optional. Whether or not to include ancestor headings when splitting. */
  includeAncestorHeadings?: boolean;
}

export const GoogleCloudDocumentaiV1ProcessOptionsLayoutConfigChunkingConfig: Schema.Schema<GoogleCloudDocumentaiV1ProcessOptionsLayoutConfigChunkingConfig> = Schema.suspend(() => Schema.Struct({
  chunkSize: Schema.optional(Schema.Number),
  includeAncestorHeadings: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDocumentaiV1ProcessOptionsLayoutConfigChunkingConfig" }) as any as Schema.Schema<GoogleCloudDocumentaiV1ProcessOptionsLayoutConfigChunkingConfig>;

export interface GoogleCloudDocumentaiV1ProcessOptionsLayoutConfig {
  /** Optional. Config for chunking in layout parser processor. */
  chunkingConfig?: GoogleCloudDocumentaiV1ProcessOptionsLayoutConfigChunkingConfig;
  /** Optional. Whether to include images in layout parser processor response. */
  returnImages?: boolean;
  /** Optional. Whether to include bounding boxes in layout parser processor response. */
  returnBoundingBoxes?: boolean;
  /** Optional. Whether to include image annotations in layout parser response. */
  enableImageAnnotation?: boolean;
  /** Optional. Whether to include table annotations in layout parser response. */
  enableTableAnnotation?: boolean;
}

export const GoogleCloudDocumentaiV1ProcessOptionsLayoutConfig: Schema.Schema<GoogleCloudDocumentaiV1ProcessOptionsLayoutConfig> = Schema.suspend(() => Schema.Struct({
  chunkingConfig: Schema.optional(GoogleCloudDocumentaiV1ProcessOptionsLayoutConfigChunkingConfig),
  returnImages: Schema.optional(Schema.Boolean),
  returnBoundingBoxes: Schema.optional(Schema.Boolean),
  enableImageAnnotation: Schema.optional(Schema.Boolean),
  enableTableAnnotation: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDocumentaiV1ProcessOptionsLayoutConfig" }) as any as Schema.Schema<GoogleCloudDocumentaiV1ProcessOptionsLayoutConfig>;

export interface GoogleCloudDocumentaiV1DocumentSchemaEntityTypeEnumValues {
  /** The individual values that this enum values type can include. */
  values?: Array<string>;
}

export const GoogleCloudDocumentaiV1DocumentSchemaEntityTypeEnumValues: Schema.Schema<GoogleCloudDocumentaiV1DocumentSchemaEntityTypeEnumValues> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentSchemaEntityTypeEnumValues" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentSchemaEntityTypeEnumValues>;

export interface GoogleCloudDocumentaiV1DocumentSchemaEntityTypeProperty {
  /** The name of the property. Follows the same guidelines as the EntityType name. */
  name?: string;
  /** User defined name for the property. */
  displayName?: string;
  /** A reference to the value type of the property. This type is subject to the same conventions as the `Entity.base_types` field. */
  valueType?: string;
  /** Occurrence type limits the number of instances an entity type appears in the document. */
  occurrenceType?: "OCCURRENCE_TYPE_UNSPECIFIED" | "OPTIONAL_ONCE" | "OPTIONAL_MULTIPLE" | "REQUIRED_ONCE" | "REQUIRED_MULTIPLE" | (string & {});
  /** Specifies how the entity's value is obtained. */
  method?: "METHOD_UNSPECIFIED" | "EXTRACT" | "DERIVE" | "RELAXED_EXTRACT" | (string & {});
}

export const GoogleCloudDocumentaiV1DocumentSchemaEntityTypeProperty: Schema.Schema<GoogleCloudDocumentaiV1DocumentSchemaEntityTypeProperty> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  valueType: Schema.optional(Schema.String),
  occurrenceType: Schema.optional(Schema.String),
  method: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentSchemaEntityTypeProperty" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentSchemaEntityTypeProperty>;

export interface GoogleCloudDocumentaiV1DocumentSchemaEntityType {
  /** If specified, lists all the possible values for this entity. This should not be more than a handful of values. If the number of values is >10 or could change frequently, use the `EntityType.value_ontology` field and specify a list of all possible values in a value ontology file. */
  enumValues?: GoogleCloudDocumentaiV1DocumentSchemaEntityTypeEnumValues;
  /** User defined name for the type. */
  displayName?: string;
  /** Name of the type. It must be unique within the schema file and cannot be a "Common Type". The following naming conventions are used: - Use `snake_casing`. - Name matching is case-sensitive. - Maximum 64 characters. - Must start with a letter. - Allowed characters: ASCII letters `[a-z0-9_-]`. (For backward compatibility, internal infrastructure and tooling can handle any ASCII character.) - The `/` is sometimes used to denote a property of a type. For example `line_item/amount`. This convention is deprecated, but will still be honored for backward compatibility. */
  name?: string;
  /** The entity type that this type is derived from. For now, one and only one should be set. */
  baseTypes?: Array<string>;
  /** Description the nested structure, or composition of an entity. */
  properties?: Array<GoogleCloudDocumentaiV1DocumentSchemaEntityTypeProperty>;
}

export const GoogleCloudDocumentaiV1DocumentSchemaEntityType: Schema.Schema<GoogleCloudDocumentaiV1DocumentSchemaEntityType> = Schema.suspend(() => Schema.Struct({
  enumValues: Schema.optional(GoogleCloudDocumentaiV1DocumentSchemaEntityTypeEnumValues),
  displayName: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  baseTypes: Schema.optional(Schema.Array(Schema.String)),
  properties: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentSchemaEntityTypeProperty)),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentSchemaEntityType" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentSchemaEntityType>;

export interface GoogleCloudDocumentaiV1DocumentSchemaMetadata {
  /** If true, a `document` entity type can be applied to subdocument (splitting). Otherwise, it can only be applied to the entire document (classification). */
  documentSplitter?: boolean;
  /** If true, on a given page, there can be multiple `document` annotations covering it. */
  documentAllowMultipleLabels?: boolean;
  /** If set, all the nested entities must be prefixed with the parents. */
  prefixedNamingOnProperties?: boolean;
  /** If set, this will skip the naming format validation in the schema. So the string values in `DocumentSchema.EntityType.name` and `DocumentSchema.EntityType.Property.name` will not be checked. */
  skipNamingValidation?: boolean;
}

export const GoogleCloudDocumentaiV1DocumentSchemaMetadata: Schema.Schema<GoogleCloudDocumentaiV1DocumentSchemaMetadata> = Schema.suspend(() => Schema.Struct({
  documentSplitter: Schema.optional(Schema.Boolean),
  documentAllowMultipleLabels: Schema.optional(Schema.Boolean),
  prefixedNamingOnProperties: Schema.optional(Schema.Boolean),
  skipNamingValidation: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentSchemaMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentSchemaMetadata>;

export interface GoogleCloudDocumentaiV1DocumentSchema {
  /** Display name to show users. */
  displayName?: string;
  /** Description of the schema. */
  description?: string;
  /** Entity types of the schema. */
  entityTypes?: Array<GoogleCloudDocumentaiV1DocumentSchemaEntityType>;
  /** Metadata of the schema. */
  metadata?: GoogleCloudDocumentaiV1DocumentSchemaMetadata;
  /** Optional. Document level prompt provided by the user. This custom text is injected into the AI model's prompt to provide extra, document-wide guidance for processing. */
  documentPrompt?: string;
}

export const GoogleCloudDocumentaiV1DocumentSchema: Schema.Schema<GoogleCloudDocumentaiV1DocumentSchema> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  entityTypes: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentSchemaEntityType)),
  metadata: Schema.optional(GoogleCloudDocumentaiV1DocumentSchemaMetadata),
  documentPrompt: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentSchema" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentSchema>;

export interface GoogleCloudDocumentaiV1ProcessOptions {
  /** Which pages to process (1-indexed). */
  individualPageSelector?: GoogleCloudDocumentaiV1ProcessOptionsIndividualPageSelector;
  /** Only process certain pages from the start. Process all if the document has fewer pages. */
  fromStart?: number;
  /** Only process certain pages from the end, same as above. */
  fromEnd?: number;
  /** Only applicable to `OCR_PROCESSOR` and `FORM_PARSER_PROCESSOR`. Returns error if set on other processor types. */
  ocrConfig?: GoogleCloudDocumentaiV1OcrConfig;
  /** Optional. Only applicable to `LAYOUT_PARSER_PROCESSOR`. Returns error if set on other processor types. */
  layoutConfig?: GoogleCloudDocumentaiV1ProcessOptionsLayoutConfig;
  /** Optional. Override the schema of the ProcessorVersion. Will return an Invalid Argument error if this field is set when the underlying ProcessorVersion doesn't support schema override. */
  schemaOverride?: GoogleCloudDocumentaiV1DocumentSchema;
}

export const GoogleCloudDocumentaiV1ProcessOptions: Schema.Schema<GoogleCloudDocumentaiV1ProcessOptions> = Schema.suspend(() => Schema.Struct({
  individualPageSelector: Schema.optional(GoogleCloudDocumentaiV1ProcessOptionsIndividualPageSelector),
  fromStart: Schema.optional(Schema.Number),
  fromEnd: Schema.optional(Schema.Number),
  ocrConfig: Schema.optional(GoogleCloudDocumentaiV1OcrConfig),
  layoutConfig: Schema.optional(GoogleCloudDocumentaiV1ProcessOptionsLayoutConfig),
  schemaOverride: Schema.optional(GoogleCloudDocumentaiV1DocumentSchema),
})).annotate({ identifier: "GoogleCloudDocumentaiV1ProcessOptions" }) as any as Schema.Schema<GoogleCloudDocumentaiV1ProcessOptions>;

export interface GoogleCloudDocumentaiV1ProcessRequest {
  /** An inline document proto. */
  inlineDocument?: GoogleCloudDocumentaiV1Document;
  /** A raw document content (bytes). */
  rawDocument?: GoogleCloudDocumentaiV1RawDocument;
  /** A raw document on Google Cloud Storage. */
  gcsDocument?: GoogleCloudDocumentaiV1GcsDocument;
  /** Whether human review should be skipped for this request. Default to `false`. */
  skipHumanReview?: boolean;
  /** Specifies which fields to include in the ProcessResponse.document output. Only supports top-level document and pages field, so it must be in the form of `{document_field_name}` or `pages.{page_field_name}`. */
  fieldMask?: string;
  /** Inference-time options for the process API */
  processOptions?: GoogleCloudDocumentaiV1ProcessOptions;
  /** Optional. The labels with user-defined metadata for the request. Label keys and values can be no longer than 63 characters (Unicode codepoints) and can only contain lowercase letters, numeric characters, underscores, and dashes. International characters are allowed. Label values are optional. Label keys must start with a letter. */
  labels?: Record<string, string>;
  /** Optional. Option to remove images from the document. */
  imagelessMode?: boolean;
}

export const GoogleCloudDocumentaiV1ProcessRequest: Schema.Schema<GoogleCloudDocumentaiV1ProcessRequest> = Schema.suspend(() => Schema.Struct({
  inlineDocument: Schema.optional(GoogleCloudDocumentaiV1Document),
  rawDocument: Schema.optional(GoogleCloudDocumentaiV1RawDocument),
  gcsDocument: Schema.optional(GoogleCloudDocumentaiV1GcsDocument),
  skipHumanReview: Schema.optional(Schema.Boolean),
  fieldMask: Schema.optional(Schema.String),
  processOptions: Schema.optional(GoogleCloudDocumentaiV1ProcessOptions),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  imagelessMode: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDocumentaiV1ProcessRequest" }) as any as Schema.Schema<GoogleCloudDocumentaiV1ProcessRequest>;

export interface GoogleCloudDocumentaiV1HumanReviewStatus {
  /** The state of human review on the processing request. */
  state?: "STATE_UNSPECIFIED" | "SKIPPED" | "VALIDATION_PASSED" | "IN_PROGRESS" | "ERROR" | (string & {});
  /** A message providing more details about the human review state. */
  stateMessage?: string;
  /** The name of the operation triggered by the processed document. This field is populated only when the state is `HUMAN_REVIEW_IN_PROGRESS`. It has the same response type and metadata as the long-running operation returned by ReviewDocument. */
  humanReviewOperation?: string;
}

export const GoogleCloudDocumentaiV1HumanReviewStatus: Schema.Schema<GoogleCloudDocumentaiV1HumanReviewStatus> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  stateMessage: Schema.optional(Schema.String),
  humanReviewOperation: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1HumanReviewStatus" }) as any as Schema.Schema<GoogleCloudDocumentaiV1HumanReviewStatus>;

export interface GoogleCloudDocumentaiV1ProcessResponse {
  /** The document payload, will populate fields based on the processor's behavior. */
  document?: GoogleCloudDocumentaiV1Document;
  /** The status of human review on the processed document. */
  humanReviewStatus?: GoogleCloudDocumentaiV1HumanReviewStatus;
}

export const GoogleCloudDocumentaiV1ProcessResponse: Schema.Schema<GoogleCloudDocumentaiV1ProcessResponse> = Schema.suspend(() => Schema.Struct({
  document: Schema.optional(GoogleCloudDocumentaiV1Document),
  humanReviewStatus: Schema.optional(GoogleCloudDocumentaiV1HumanReviewStatus),
})).annotate({ identifier: "GoogleCloudDocumentaiV1ProcessResponse" }) as any as Schema.Schema<GoogleCloudDocumentaiV1ProcessResponse>;

export interface GoogleCloudDocumentaiV1GcsPrefix {
  /** The URI prefix. */
  gcsUriPrefix?: string;
}

export const GoogleCloudDocumentaiV1GcsPrefix: Schema.Schema<GoogleCloudDocumentaiV1GcsPrefix> = Schema.suspend(() => Schema.Struct({
  gcsUriPrefix: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1GcsPrefix" }) as any as Schema.Schema<GoogleCloudDocumentaiV1GcsPrefix>;

export interface GoogleCloudDocumentaiV1GcsDocuments {
  /** The list of documents. */
  documents?: Array<GoogleCloudDocumentaiV1GcsDocument>;
}

export const GoogleCloudDocumentaiV1GcsDocuments: Schema.Schema<GoogleCloudDocumentaiV1GcsDocuments> = Schema.suspend(() => Schema.Struct({
  documents: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1GcsDocument)),
})).annotate({ identifier: "GoogleCloudDocumentaiV1GcsDocuments" }) as any as Schema.Schema<GoogleCloudDocumentaiV1GcsDocuments>;

export interface GoogleCloudDocumentaiV1BatchDocumentsInputConfig {
  /** The set of documents that match the specified Cloud Storage `gcs_prefix`. */
  gcsPrefix?: GoogleCloudDocumentaiV1GcsPrefix;
  /** The set of documents individually specified on Cloud Storage. */
  gcsDocuments?: GoogleCloudDocumentaiV1GcsDocuments;
}

export const GoogleCloudDocumentaiV1BatchDocumentsInputConfig: Schema.Schema<GoogleCloudDocumentaiV1BatchDocumentsInputConfig> = Schema.suspend(() => Schema.Struct({
  gcsPrefix: Schema.optional(GoogleCloudDocumentaiV1GcsPrefix),
  gcsDocuments: Schema.optional(GoogleCloudDocumentaiV1GcsDocuments),
})).annotate({ identifier: "GoogleCloudDocumentaiV1BatchDocumentsInputConfig" }) as any as Schema.Schema<GoogleCloudDocumentaiV1BatchDocumentsInputConfig>;

export interface GoogleCloudDocumentaiV1DocumentOutputConfigGcsOutputConfigShardingConfig {
  /** The number of pages per shard. */
  pagesPerShard?: number;
  /** The number of overlapping pages between consecutive shards. */
  pagesOverlap?: number;
}

export const GoogleCloudDocumentaiV1DocumentOutputConfigGcsOutputConfigShardingConfig: Schema.Schema<GoogleCloudDocumentaiV1DocumentOutputConfigGcsOutputConfigShardingConfig> = Schema.suspend(() => Schema.Struct({
  pagesPerShard: Schema.optional(Schema.Number),
  pagesOverlap: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentOutputConfigGcsOutputConfigShardingConfig" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentOutputConfigGcsOutputConfigShardingConfig>;

export interface GoogleCloudDocumentaiV1DocumentOutputConfigGcsOutputConfig {
  /** The Cloud Storage uri (a directory) of the output. */
  gcsUri?: string;
  /** Specifies which fields to include in the output documents. Only supports top level document and pages field so it must be in the form of `{document_field_name}` or `pages.{page_field_name}`. */
  fieldMask?: string;
  /** Specifies the sharding config for the output document. */
  shardingConfig?: GoogleCloudDocumentaiV1DocumentOutputConfigGcsOutputConfigShardingConfig;
}

export const GoogleCloudDocumentaiV1DocumentOutputConfigGcsOutputConfig: Schema.Schema<GoogleCloudDocumentaiV1DocumentOutputConfigGcsOutputConfig> = Schema.suspend(() => Schema.Struct({
  gcsUri: Schema.optional(Schema.String),
  fieldMask: Schema.optional(Schema.String),
  shardingConfig: Schema.optional(GoogleCloudDocumentaiV1DocumentOutputConfigGcsOutputConfigShardingConfig),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentOutputConfigGcsOutputConfig" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentOutputConfigGcsOutputConfig>;

export interface GoogleCloudDocumentaiV1DocumentOutputConfig {
  /** Output config to write the results to Cloud Storage. */
  gcsOutputConfig?: GoogleCloudDocumentaiV1DocumentOutputConfigGcsOutputConfig;
}

export const GoogleCloudDocumentaiV1DocumentOutputConfig: Schema.Schema<GoogleCloudDocumentaiV1DocumentOutputConfig> = Schema.suspend(() => Schema.Struct({
  gcsOutputConfig: Schema.optional(GoogleCloudDocumentaiV1DocumentOutputConfigGcsOutputConfig),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentOutputConfig" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentOutputConfig>;

export interface GoogleCloudDocumentaiV1BatchProcessRequest {
  /** The input documents for the BatchProcessDocuments method. */
  inputDocuments?: GoogleCloudDocumentaiV1BatchDocumentsInputConfig;
  /** The output configuration for the BatchProcessDocuments method. */
  documentOutputConfig?: GoogleCloudDocumentaiV1DocumentOutputConfig;
  /** Whether human review should be skipped for this request. Default to `false`. */
  skipHumanReview?: boolean;
  /** Inference-time options for the process API */
  processOptions?: GoogleCloudDocumentaiV1ProcessOptions;
  /** Optional. The labels with user-defined metadata for the request. Label keys and values can be no longer than 63 characters (Unicode codepoints) and can only contain lowercase letters, numeric characters, underscores, and dashes. International characters are allowed. Label values are optional. Label keys must start with a letter. */
  labels?: Record<string, string>;
}

export const GoogleCloudDocumentaiV1BatchProcessRequest: Schema.Schema<GoogleCloudDocumentaiV1BatchProcessRequest> = Schema.suspend(() => Schema.Struct({
  inputDocuments: Schema.optional(GoogleCloudDocumentaiV1BatchDocumentsInputConfig),
  documentOutputConfig: Schema.optional(GoogleCloudDocumentaiV1DocumentOutputConfig),
  skipHumanReview: Schema.optional(Schema.Boolean),
  processOptions: Schema.optional(GoogleCloudDocumentaiV1ProcessOptions),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "GoogleCloudDocumentaiV1BatchProcessRequest" }) as any as Schema.Schema<GoogleCloudDocumentaiV1BatchProcessRequest>;

export interface GoogleCloudDocumentaiV1ProcessorTypeLocationInfo {
  /** The location ID. For supported locations, refer to [regional and multi-regional support](/document-ai/docs/regions). */
  locationId?: string;
}

export const GoogleCloudDocumentaiV1ProcessorTypeLocationInfo: Schema.Schema<GoogleCloudDocumentaiV1ProcessorTypeLocationInfo> = Schema.suspend(() => Schema.Struct({
  locationId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1ProcessorTypeLocationInfo" }) as any as Schema.Schema<GoogleCloudDocumentaiV1ProcessorTypeLocationInfo>;

export interface GoogleCloudDocumentaiV1ProcessorType {
  /** The resource name of the processor type. Format: `projects/{project}/processorTypes/{processor_type}` */
  name?: string;
  /** The processor type, such as: `OCR_PROCESSOR`, `INVOICE_PROCESSOR`. */
  type?: string;
  /** The processor category, used by UI to group processor types. */
  category?: string;
  /** The locations in which this processor is available. */
  availableLocations?: Array<GoogleCloudDocumentaiV1ProcessorTypeLocationInfo>;
  /** Whether the processor type allows creation. If true, users can create a processor of this processor type. Otherwise, users need to request access. */
  allowCreation?: boolean;
  /** Launch stage of the processor type */
  launchStage?: "LAUNCH_STAGE_UNSPECIFIED" | "UNIMPLEMENTED" | "PRELAUNCH" | "EARLY_ACCESS" | "ALPHA" | "BETA" | "GA" | "DEPRECATED" | (string & {});
  /** A set of Cloud Storage URIs of sample documents for this processor. */
  sampleDocumentUris?: Array<string>;
}

export const GoogleCloudDocumentaiV1ProcessorType: Schema.Schema<GoogleCloudDocumentaiV1ProcessorType> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  category: Schema.optional(Schema.String),
  availableLocations: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1ProcessorTypeLocationInfo)),
  allowCreation: Schema.optional(Schema.Boolean),
  launchStage: Schema.optional(Schema.String),
  sampleDocumentUris: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDocumentaiV1ProcessorType" }) as any as Schema.Schema<GoogleCloudDocumentaiV1ProcessorType>;

export interface GoogleCloudDocumentaiV1FetchProcessorTypesResponse {
  /** The list of processor types. */
  processorTypes?: Array<GoogleCloudDocumentaiV1ProcessorType>;
}

export const GoogleCloudDocumentaiV1FetchProcessorTypesResponse: Schema.Schema<GoogleCloudDocumentaiV1FetchProcessorTypesResponse> = Schema.suspend(() => Schema.Struct({
  processorTypes: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1ProcessorType)),
})).annotate({ identifier: "GoogleCloudDocumentaiV1FetchProcessorTypesResponse" }) as any as Schema.Schema<GoogleCloudDocumentaiV1FetchProcessorTypesResponse>;

export interface GoogleCloudDocumentaiV1ListProcessorTypesResponse {
  /** The processor types. */
  processorTypes?: Array<GoogleCloudDocumentaiV1ProcessorType>;
  /** Points to the next page, otherwise empty. */
  nextPageToken?: string;
}

export const GoogleCloudDocumentaiV1ListProcessorTypesResponse: Schema.Schema<GoogleCloudDocumentaiV1ListProcessorTypesResponse> = Schema.suspend(() => Schema.Struct({
  processorTypes: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1ProcessorType)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1ListProcessorTypesResponse" }) as any as Schema.Schema<GoogleCloudDocumentaiV1ListProcessorTypesResponse>;

export interface GoogleCloudDocumentaiV1ProcessorVersionAlias {
  /** The alias in the form of `processor_version` resource name. */
  alias?: string;
  /** The resource name of aliased processor version. */
  processorVersion?: string;
}

export const GoogleCloudDocumentaiV1ProcessorVersionAlias: Schema.Schema<GoogleCloudDocumentaiV1ProcessorVersionAlias> = Schema.suspend(() => Schema.Struct({
  alias: Schema.optional(Schema.String),
  processorVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1ProcessorVersionAlias" }) as any as Schema.Schema<GoogleCloudDocumentaiV1ProcessorVersionAlias>;

export interface GoogleCloudDocumentaiV1Processor {
  /** Output only. Immutable. The resource name of the processor. Format: `projects/{project}/locations/{location}/processors/{processor}` */
  name?: string;
  /** The processor type, such as: `OCR_PROCESSOR`, `INVOICE_PROCESSOR`. To get a list of processor types, see FetchProcessorTypes. */
  type?: string;
  /** The display name of the processor. */
  displayName?: string;
  /** Output only. The state of the processor. */
  state?: "STATE_UNSPECIFIED" | "ENABLED" | "DISABLED" | "ENABLING" | "DISABLING" | "CREATING" | "FAILED" | "DELETING" | (string & {});
  /** The default processor version. */
  defaultProcessorVersion?: string;
  /** Output only. The processor version aliases. */
  processorVersionAliases?: Array<GoogleCloudDocumentaiV1ProcessorVersionAlias>;
  /** Output only. Immutable. The http endpoint that can be called to invoke processing. */
  processEndpoint?: string;
  /** Output only. The time the processor was created. */
  createTime?: string;
  /** The [KMS key](https://cloud.google.com/security-key-management) used for encryption and decryption in CMEK scenarios. */
  kmsKeyName?: string;
  /** Output only. Reserved for future use. */
  satisfiesPzs?: boolean;
  /** Output only. Reserved for future use. */
  satisfiesPzi?: boolean;
  /** Optional. SchemaVersion used by the Processor. It is the same as Processor's DatasetSchema.schema_version Format is `projects/{project}/locations/{location}/schemas/{schema}/schemaVersions/{schema_version} */
  activeSchemaVersion?: string;
}

export const GoogleCloudDocumentaiV1Processor: Schema.Schema<GoogleCloudDocumentaiV1Processor> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  defaultProcessorVersion: Schema.optional(Schema.String),
  processorVersionAliases: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1ProcessorVersionAlias)),
  processEndpoint: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  kmsKeyName: Schema.optional(Schema.String),
  satisfiesPzs: Schema.optional(Schema.Boolean),
  satisfiesPzi: Schema.optional(Schema.Boolean),
  activeSchemaVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1Processor" }) as any as Schema.Schema<GoogleCloudDocumentaiV1Processor>;

export interface GoogleCloudDocumentaiV1ListProcessorsResponse {
  /** The list of processors. */
  processors?: Array<GoogleCloudDocumentaiV1Processor>;
  /** Points to the next processor, otherwise empty. */
  nextPageToken?: string;
}

export const GoogleCloudDocumentaiV1ListProcessorsResponse: Schema.Schema<GoogleCloudDocumentaiV1ListProcessorsResponse> = Schema.suspend(() => Schema.Struct({
  processors: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1Processor)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1ListProcessorsResponse" }) as any as Schema.Schema<GoogleCloudDocumentaiV1ListProcessorsResponse>;

export interface GoogleCloudDocumentaiV1TrainProcessorVersionRequestCustomDocumentExtractionOptions {
  /** Optional. Training method to use for CDE training. */
  trainingMethod?: "TRAINING_METHOD_UNSPECIFIED" | "MODEL_BASED" | "TEMPLATE_BASED" | (string & {});
}

export const GoogleCloudDocumentaiV1TrainProcessorVersionRequestCustomDocumentExtractionOptions: Schema.Schema<GoogleCloudDocumentaiV1TrainProcessorVersionRequestCustomDocumentExtractionOptions> = Schema.suspend(() => Schema.Struct({
  trainingMethod: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1TrainProcessorVersionRequestCustomDocumentExtractionOptions" }) as any as Schema.Schema<GoogleCloudDocumentaiV1TrainProcessorVersionRequestCustomDocumentExtractionOptions>;

export interface GoogleCloudDocumentaiV1TrainProcessorVersionRequestFoundationModelTuningOptions {
  /** Optional. The number of steps to run for model tuning. Valid values are between 1 and 400. If not provided, recommended steps will be used. */
  trainSteps?: number;
  /** Optional. The multiplier to apply to the recommended learning rate. Valid values are between 0.1 and 10. If not provided, recommended learning rate will be used. */
  learningRateMultiplier?: number;
}

export const GoogleCloudDocumentaiV1TrainProcessorVersionRequestFoundationModelTuningOptions: Schema.Schema<GoogleCloudDocumentaiV1TrainProcessorVersionRequestFoundationModelTuningOptions> = Schema.suspend(() => Schema.Struct({
  trainSteps: Schema.optional(Schema.Number),
  learningRateMultiplier: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDocumentaiV1TrainProcessorVersionRequestFoundationModelTuningOptions" }) as any as Schema.Schema<GoogleCloudDocumentaiV1TrainProcessorVersionRequestFoundationModelTuningOptions>;

export interface GoogleCloudDocumentaiV1EvaluationMetrics {
  /** The calculated precision. */
  precision?: number;
  /** The calculated recall. */
  recall?: number;
  /** The calculated F1 score. */
  f1Score?: number;
  /** The amount of occurrences in predicted documents. */
  predictedOccurrencesCount?: number;
  /** The amount of occurrences in ground truth documents. */
  groundTruthOccurrencesCount?: number;
  /** The amount of documents with a predicted occurrence. */
  predictedDocumentCount?: number;
  /** The amount of documents with a ground truth occurrence. */
  groundTruthDocumentCount?: number;
  /** The amount of true positives. */
  truePositivesCount?: number;
  /** The amount of false positives. */
  falsePositivesCount?: number;
  /** The amount of false negatives. */
  falseNegativesCount?: number;
  /** The amount of documents that had an occurrence of this label. */
  totalDocumentsCount?: number;
}

export const GoogleCloudDocumentaiV1EvaluationMetrics: Schema.Schema<GoogleCloudDocumentaiV1EvaluationMetrics> = Schema.suspend(() => Schema.Struct({
  precision: Schema.optional(Schema.Number),
  recall: Schema.optional(Schema.Number),
  f1Score: Schema.optional(Schema.Number),
  predictedOccurrencesCount: Schema.optional(Schema.Number),
  groundTruthOccurrencesCount: Schema.optional(Schema.Number),
  predictedDocumentCount: Schema.optional(Schema.Number),
  groundTruthDocumentCount: Schema.optional(Schema.Number),
  truePositivesCount: Schema.optional(Schema.Number),
  falsePositivesCount: Schema.optional(Schema.Number),
  falseNegativesCount: Schema.optional(Schema.Number),
  totalDocumentsCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDocumentaiV1EvaluationMetrics" }) as any as Schema.Schema<GoogleCloudDocumentaiV1EvaluationMetrics>;

export interface GoogleCloudDocumentaiV1EvaluationReference {
  /** The resource name of the Long Running Operation for the evaluation. */
  operation?: string;
  /** The resource name of the evaluation. */
  evaluation?: string;
  /** An aggregate of the statistics for the evaluation with fuzzy matching on. */
  aggregateMetrics?: GoogleCloudDocumentaiV1EvaluationMetrics;
  /** An aggregate of the statistics for the evaluation with fuzzy matching off. */
  aggregateMetricsExact?: GoogleCloudDocumentaiV1EvaluationMetrics;
}

export const GoogleCloudDocumentaiV1EvaluationReference: Schema.Schema<GoogleCloudDocumentaiV1EvaluationReference> = Schema.suspend(() => Schema.Struct({
  operation: Schema.optional(Schema.String),
  evaluation: Schema.optional(Schema.String),
  aggregateMetrics: Schema.optional(GoogleCloudDocumentaiV1EvaluationMetrics),
  aggregateMetricsExact: Schema.optional(GoogleCloudDocumentaiV1EvaluationMetrics),
})).annotate({ identifier: "GoogleCloudDocumentaiV1EvaluationReference" }) as any as Schema.Schema<GoogleCloudDocumentaiV1EvaluationReference>;

export interface GoogleCloudDocumentaiV1ProcessorVersionDeprecationInfo {
  /** The time at which this processor version will be deprecated. */
  deprecationTime?: string;
  /** If set, the processor version that will be used as a replacement. */
  replacementProcessorVersion?: string;
}

export const GoogleCloudDocumentaiV1ProcessorVersionDeprecationInfo: Schema.Schema<GoogleCloudDocumentaiV1ProcessorVersionDeprecationInfo> = Schema.suspend(() => Schema.Struct({
  deprecationTime: Schema.optional(Schema.String),
  replacementProcessorVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1ProcessorVersionDeprecationInfo" }) as any as Schema.Schema<GoogleCloudDocumentaiV1ProcessorVersionDeprecationInfo>;

export interface GoogleCloudDocumentaiV1ProcessorVersionGenAiModelInfoFoundationGenAiModelInfo {
  /** Whether fine tuning is allowed for this base processor version. */
  finetuningAllowed?: boolean;
  /** The minimum number of labeled documents in the training dataset required for fine tuning. */
  minTrainLabeledDocuments?: number;
}

export const GoogleCloudDocumentaiV1ProcessorVersionGenAiModelInfoFoundationGenAiModelInfo: Schema.Schema<GoogleCloudDocumentaiV1ProcessorVersionGenAiModelInfoFoundationGenAiModelInfo> = Schema.suspend(() => Schema.Struct({
  finetuningAllowed: Schema.optional(Schema.Boolean),
  minTrainLabeledDocuments: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDocumentaiV1ProcessorVersionGenAiModelInfoFoundationGenAiModelInfo" }) as any as Schema.Schema<GoogleCloudDocumentaiV1ProcessorVersionGenAiModelInfoFoundationGenAiModelInfo>;

export interface GoogleCloudDocumentaiV1ProcessorVersionGenAiModelInfoCustomGenAiModelInfo {
  /** The type of custom model created by the user. */
  customModelType?: "CUSTOM_MODEL_TYPE_UNSPECIFIED" | "VERSIONED_FOUNDATION" | "FINE_TUNED" | (string & {});
  /** The base processor version ID for the custom model. */
  baseProcessorVersionId?: string;
}

export const GoogleCloudDocumentaiV1ProcessorVersionGenAiModelInfoCustomGenAiModelInfo: Schema.Schema<GoogleCloudDocumentaiV1ProcessorVersionGenAiModelInfoCustomGenAiModelInfo> = Schema.suspend(() => Schema.Struct({
  customModelType: Schema.optional(Schema.String),
  baseProcessorVersionId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1ProcessorVersionGenAiModelInfoCustomGenAiModelInfo" }) as any as Schema.Schema<GoogleCloudDocumentaiV1ProcessorVersionGenAiModelInfoCustomGenAiModelInfo>;

export interface GoogleCloudDocumentaiV1ProcessorVersionGenAiModelInfo {
  /** Information for a pretrained Google-managed foundation model. */
  foundationGenAiModelInfo?: GoogleCloudDocumentaiV1ProcessorVersionGenAiModelInfoFoundationGenAiModelInfo;
  /** Information for a custom Generative AI model created by the user. */
  customGenAiModelInfo?: GoogleCloudDocumentaiV1ProcessorVersionGenAiModelInfoCustomGenAiModelInfo;
}

export const GoogleCloudDocumentaiV1ProcessorVersionGenAiModelInfo: Schema.Schema<GoogleCloudDocumentaiV1ProcessorVersionGenAiModelInfo> = Schema.suspend(() => Schema.Struct({
  foundationGenAiModelInfo: Schema.optional(GoogleCloudDocumentaiV1ProcessorVersionGenAiModelInfoFoundationGenAiModelInfo),
  customGenAiModelInfo: Schema.optional(GoogleCloudDocumentaiV1ProcessorVersionGenAiModelInfoCustomGenAiModelInfo),
})).annotate({ identifier: "GoogleCloudDocumentaiV1ProcessorVersionGenAiModelInfo" }) as any as Schema.Schema<GoogleCloudDocumentaiV1ProcessorVersionGenAiModelInfo>;

export interface GoogleCloudDocumentaiV1ProcessorVersion {
  /** Identifier. The resource name of the processor version. Format: `projects/{project}/locations/{location}/processors/{processor}/processorVersions/{processor_version}` */
  name?: string;
  /** The display name of the processor version. */
  displayName?: string;
  /** Output only. The schema of the processor version. Describes the output. */
  documentSchema?: GoogleCloudDocumentaiV1DocumentSchema;
  /** Output only. The state of the processor version. */
  state?: "STATE_UNSPECIFIED" | "DEPLOYED" | "DEPLOYING" | "UNDEPLOYED" | "UNDEPLOYING" | "CREATING" | "DELETING" | "FAILED" | "IMPORTING" | (string & {});
  /** Output only. The time the processor version was created. */
  createTime?: string;
  /** Output only. The most recently invoked evaluation for the processor version. */
  latestEvaluation?: GoogleCloudDocumentaiV1EvaluationReference;
  /** Output only. The KMS key name used for encryption. */
  kmsKeyName?: string;
  /** Output only. The KMS key version with which data is encrypted. */
  kmsKeyVersionName?: string;
  /** Output only. Denotes that this `ProcessorVersion` is managed by Google. */
  googleManaged?: boolean;
  /** Output only. If set, information about the eventual deprecation of this version. */
  deprecationInfo?: GoogleCloudDocumentaiV1ProcessorVersionDeprecationInfo;
  /** Output only. The model type of this processor version. */
  modelType?: "MODEL_TYPE_UNSPECIFIED" | "MODEL_TYPE_GENERATIVE" | "MODEL_TYPE_CUSTOM" | (string & {});
  /** Output only. Reserved for future use. */
  satisfiesPzs?: boolean;
  /** Output only. Reserved for future use. */
  satisfiesPzi?: boolean;
  /** Output only. Information about Generative AI model-based processor versions. */
  genAiModelInfo?: GoogleCloudDocumentaiV1ProcessorVersionGenAiModelInfo;
}

export const GoogleCloudDocumentaiV1ProcessorVersion: Schema.Schema<GoogleCloudDocumentaiV1ProcessorVersion> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  documentSchema: Schema.optional(GoogleCloudDocumentaiV1DocumentSchema),
  state: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  latestEvaluation: Schema.optional(GoogleCloudDocumentaiV1EvaluationReference),
  kmsKeyName: Schema.optional(Schema.String),
  kmsKeyVersionName: Schema.optional(Schema.String),
  googleManaged: Schema.optional(Schema.Boolean),
  deprecationInfo: Schema.optional(GoogleCloudDocumentaiV1ProcessorVersionDeprecationInfo),
  modelType: Schema.optional(Schema.String),
  satisfiesPzs: Schema.optional(Schema.Boolean),
  satisfiesPzi: Schema.optional(Schema.Boolean),
  genAiModelInfo: Schema.optional(GoogleCloudDocumentaiV1ProcessorVersionGenAiModelInfo),
})).annotate({ identifier: "GoogleCloudDocumentaiV1ProcessorVersion" }) as any as Schema.Schema<GoogleCloudDocumentaiV1ProcessorVersion>;

export interface GoogleCloudDocumentaiV1TrainProcessorVersionRequestInputData {
  /** The documents used for training the new version. */
  trainingDocuments?: GoogleCloudDocumentaiV1BatchDocumentsInputConfig;
  /** The documents used for testing the trained version. */
  testDocuments?: GoogleCloudDocumentaiV1BatchDocumentsInputConfig;
}

export const GoogleCloudDocumentaiV1TrainProcessorVersionRequestInputData: Schema.Schema<GoogleCloudDocumentaiV1TrainProcessorVersionRequestInputData> = Schema.suspend(() => Schema.Struct({
  trainingDocuments: Schema.optional(GoogleCloudDocumentaiV1BatchDocumentsInputConfig),
  testDocuments: Schema.optional(GoogleCloudDocumentaiV1BatchDocumentsInputConfig),
})).annotate({ identifier: "GoogleCloudDocumentaiV1TrainProcessorVersionRequestInputData" }) as any as Schema.Schema<GoogleCloudDocumentaiV1TrainProcessorVersionRequestInputData>;

export interface GoogleCloudDocumentaiV1TrainProcessorVersionRequest {
  /** Options to control Custom Document Extraction (CDE) Processor. */
  customDocumentExtractionOptions?: GoogleCloudDocumentaiV1TrainProcessorVersionRequestCustomDocumentExtractionOptions;
  /** Options to control foundation model tuning of a processor. */
  foundationModelTuningOptions?: GoogleCloudDocumentaiV1TrainProcessorVersionRequestFoundationModelTuningOptions;
  /** Required. The processor version to be created. */
  processorVersion?: GoogleCloudDocumentaiV1ProcessorVersion;
  /** Optional. The schema the processor version will be trained with. */
  documentSchema?: GoogleCloudDocumentaiV1DocumentSchema;
  /** Optional. The input data used to train the ProcessorVersion. */
  inputData?: GoogleCloudDocumentaiV1TrainProcessorVersionRequestInputData;
  /** Optional. The processor version to use as a base for training. This processor version must be a child of `parent`. Format: `projects/{project}/locations/{location}/processors/{processor}/processorVersions/{processorVersion}`. */
  baseProcessorVersion?: string;
}

export const GoogleCloudDocumentaiV1TrainProcessorVersionRequest: Schema.Schema<GoogleCloudDocumentaiV1TrainProcessorVersionRequest> = Schema.suspend(() => Schema.Struct({
  customDocumentExtractionOptions: Schema.optional(GoogleCloudDocumentaiV1TrainProcessorVersionRequestCustomDocumentExtractionOptions),
  foundationModelTuningOptions: Schema.optional(GoogleCloudDocumentaiV1TrainProcessorVersionRequestFoundationModelTuningOptions),
  processorVersion: Schema.optional(GoogleCloudDocumentaiV1ProcessorVersion),
  documentSchema: Schema.optional(GoogleCloudDocumentaiV1DocumentSchema),
  inputData: Schema.optional(GoogleCloudDocumentaiV1TrainProcessorVersionRequestInputData),
  baseProcessorVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1TrainProcessorVersionRequest" }) as any as Schema.Schema<GoogleCloudDocumentaiV1TrainProcessorVersionRequest>;

export interface GoogleCloudDocumentaiV1ListProcessorVersionsResponse {
  /** The list of processors. */
  processorVersions?: Array<GoogleCloudDocumentaiV1ProcessorVersion>;
  /** Points to the next processor, otherwise empty. */
  nextPageToken?: string;
}

export const GoogleCloudDocumentaiV1ListProcessorVersionsResponse: Schema.Schema<GoogleCloudDocumentaiV1ListProcessorVersionsResponse> = Schema.suspend(() => Schema.Struct({
  processorVersions: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1ProcessorVersion)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1ListProcessorVersionsResponse" }) as any as Schema.Schema<GoogleCloudDocumentaiV1ListProcessorVersionsResponse>;

export interface GoogleCloudDocumentaiV1DeployProcessorVersionRequest {
}

export const GoogleCloudDocumentaiV1DeployProcessorVersionRequest: Schema.Schema<GoogleCloudDocumentaiV1DeployProcessorVersionRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDocumentaiV1DeployProcessorVersionRequest" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DeployProcessorVersionRequest>;

export interface GoogleCloudDocumentaiV1UndeployProcessorVersionRequest {
}

export const GoogleCloudDocumentaiV1UndeployProcessorVersionRequest: Schema.Schema<GoogleCloudDocumentaiV1UndeployProcessorVersionRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDocumentaiV1UndeployProcessorVersionRequest" }) as any as Schema.Schema<GoogleCloudDocumentaiV1UndeployProcessorVersionRequest>;

export interface GoogleCloudDocumentaiV1EnableProcessorRequest {
}

export const GoogleCloudDocumentaiV1EnableProcessorRequest: Schema.Schema<GoogleCloudDocumentaiV1EnableProcessorRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDocumentaiV1EnableProcessorRequest" }) as any as Schema.Schema<GoogleCloudDocumentaiV1EnableProcessorRequest>;

export interface GoogleCloudDocumentaiV1DisableProcessorRequest {
}

export const GoogleCloudDocumentaiV1DisableProcessorRequest: Schema.Schema<GoogleCloudDocumentaiV1DisableProcessorRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDocumentaiV1DisableProcessorRequest" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DisableProcessorRequest>;

export interface GoogleCloudDocumentaiV1SetDefaultProcessorVersionRequest {
  /** Required. The resource name of child ProcessorVersion to use as default. Format: `projects/{project}/locations/{location}/processors/{processor}/processorVersions/{version}` */
  defaultProcessorVersion?: string;
}

export const GoogleCloudDocumentaiV1SetDefaultProcessorVersionRequest: Schema.Schema<GoogleCloudDocumentaiV1SetDefaultProcessorVersionRequest> = Schema.suspend(() => Schema.Struct({
  defaultProcessorVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1SetDefaultProcessorVersionRequest" }) as any as Schema.Schema<GoogleCloudDocumentaiV1SetDefaultProcessorVersionRequest>;

export interface GoogleCloudDocumentaiV1ReviewDocumentRequest {
  /** An inline document proto. */
  inlineDocument?: GoogleCloudDocumentaiV1Document;
  /** Whether the validation should be performed on the ad-hoc review request. */
  enableSchemaValidation?: boolean;
  /** The priority of the human review task. */
  priority?: "DEFAULT" | "URGENT" | (string & {});
  /** The document schema of the human review task. */
  documentSchema?: GoogleCloudDocumentaiV1DocumentSchema;
}

export const GoogleCloudDocumentaiV1ReviewDocumentRequest: Schema.Schema<GoogleCloudDocumentaiV1ReviewDocumentRequest> = Schema.suspend(() => Schema.Struct({
  inlineDocument: Schema.optional(GoogleCloudDocumentaiV1Document),
  enableSchemaValidation: Schema.optional(Schema.Boolean),
  priority: Schema.optional(Schema.String),
  documentSchema: Schema.optional(GoogleCloudDocumentaiV1DocumentSchema),
})).annotate({ identifier: "GoogleCloudDocumentaiV1ReviewDocumentRequest" }) as any as Schema.Schema<GoogleCloudDocumentaiV1ReviewDocumentRequest>;

export interface GoogleCloudDocumentaiV1EvaluateProcessorVersionRequest {
  /** Optional. The documents used in the evaluation. If unspecified, use the processor's dataset as evaluation input. */
  evaluationDocuments?: GoogleCloudDocumentaiV1BatchDocumentsInputConfig;
}

export const GoogleCloudDocumentaiV1EvaluateProcessorVersionRequest: Schema.Schema<GoogleCloudDocumentaiV1EvaluateProcessorVersionRequest> = Schema.suspend(() => Schema.Struct({
  evaluationDocuments: Schema.optional(GoogleCloudDocumentaiV1BatchDocumentsInputConfig),
})).annotate({ identifier: "GoogleCloudDocumentaiV1EvaluateProcessorVersionRequest" }) as any as Schema.Schema<GoogleCloudDocumentaiV1EvaluateProcessorVersionRequest>;

export interface GoogleCloudDocumentaiV1EvaluationCounters {
  /** How many documents were sent for evaluation. */
  inputDocumentsCount?: number;
  /** How many documents were not included in the evaluation as they didn't pass validation. */
  invalidDocumentsCount?: number;
  /** How many documents were not included in the evaluation as Document AI failed to process them. */
  failedDocumentsCount?: number;
  /** How many documents were used in the evaluation. */
  evaluatedDocumentsCount?: number;
}

export const GoogleCloudDocumentaiV1EvaluationCounters: Schema.Schema<GoogleCloudDocumentaiV1EvaluationCounters> = Schema.suspend(() => Schema.Struct({
  inputDocumentsCount: Schema.optional(Schema.Number),
  invalidDocumentsCount: Schema.optional(Schema.Number),
  failedDocumentsCount: Schema.optional(Schema.Number),
  evaluatedDocumentsCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDocumentaiV1EvaluationCounters" }) as any as Schema.Schema<GoogleCloudDocumentaiV1EvaluationCounters>;

export interface GoogleCloudDocumentaiV1EvaluationConfidenceLevelMetrics {
  /** The confidence level. */
  confidenceLevel?: number;
  /** The metrics at the specific confidence level. */
  metrics?: GoogleCloudDocumentaiV1EvaluationMetrics;
}

export const GoogleCloudDocumentaiV1EvaluationConfidenceLevelMetrics: Schema.Schema<GoogleCloudDocumentaiV1EvaluationConfidenceLevelMetrics> = Schema.suspend(() => Schema.Struct({
  confidenceLevel: Schema.optional(Schema.Number),
  metrics: Schema.optional(GoogleCloudDocumentaiV1EvaluationMetrics),
})).annotate({ identifier: "GoogleCloudDocumentaiV1EvaluationConfidenceLevelMetrics" }) as any as Schema.Schema<GoogleCloudDocumentaiV1EvaluationConfidenceLevelMetrics>;

export interface GoogleCloudDocumentaiV1EvaluationMultiConfidenceMetrics {
  /** Metrics across confidence levels with fuzzy matching enabled. */
  confidenceLevelMetrics?: Array<GoogleCloudDocumentaiV1EvaluationConfidenceLevelMetrics>;
  /** Metrics across confidence levels with only exact matching. */
  confidenceLevelMetricsExact?: Array<GoogleCloudDocumentaiV1EvaluationConfidenceLevelMetrics>;
  /** The calculated area under the precision recall curve (AUPRC), computed by integrating over all confidence thresholds. */
  auprc?: number;
  /** The Estimated Calibration Error (ECE) of the confidence of the predicted entities. */
  estimatedCalibrationError?: number;
  /** The AUPRC for metrics with fuzzy matching disabled, i.e., exact matching only. */
  auprcExact?: number;
  /** The ECE for the predicted entities with fuzzy matching disabled, i.e., exact matching only. */
  estimatedCalibrationErrorExact?: number;
  /** The metrics type for the label. */
  metricsType?: "METRICS_TYPE_UNSPECIFIED" | "AGGREGATE" | (string & {});
}

export const GoogleCloudDocumentaiV1EvaluationMultiConfidenceMetrics: Schema.Schema<GoogleCloudDocumentaiV1EvaluationMultiConfidenceMetrics> = Schema.suspend(() => Schema.Struct({
  confidenceLevelMetrics: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1EvaluationConfidenceLevelMetrics)),
  confidenceLevelMetricsExact: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1EvaluationConfidenceLevelMetrics)),
  auprc: Schema.optional(Schema.Number),
  estimatedCalibrationError: Schema.optional(Schema.Number),
  auprcExact: Schema.optional(Schema.Number),
  estimatedCalibrationErrorExact: Schema.optional(Schema.Number),
  metricsType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1EvaluationMultiConfidenceMetrics" }) as any as Schema.Schema<GoogleCloudDocumentaiV1EvaluationMultiConfidenceMetrics>;

export interface GoogleCloudDocumentaiV1EvaluationEvaluationRevision {
  /** Output only. The revision ID of the evaluation. */
  revisionId?: string;
  /** Output only. Counters for the documents used in the evaluation. */
  documentCounters?: GoogleCloudDocumentaiV1EvaluationCounters;
  /** Output only. Metrics for all the entities in aggregate. */
  allEntitiesMetrics?: GoogleCloudDocumentaiV1EvaluationMultiConfidenceMetrics;
  /** Output only. Metrics across confidence levels, for different entities. */
  entityMetrics?: Record<string, GoogleCloudDocumentaiV1EvaluationMultiConfidenceMetrics>;
}

export const GoogleCloudDocumentaiV1EvaluationEvaluationRevision: Schema.Schema<GoogleCloudDocumentaiV1EvaluationEvaluationRevision> = Schema.suspend(() => Schema.Struct({
  revisionId: Schema.optional(Schema.String),
  documentCounters: Schema.optional(GoogleCloudDocumentaiV1EvaluationCounters),
  allEntitiesMetrics: Schema.optional(GoogleCloudDocumentaiV1EvaluationMultiConfidenceMetrics),
  entityMetrics: Schema.optional(Schema.Record(Schema.String, GoogleCloudDocumentaiV1EvaluationMultiConfidenceMetrics)),
})).annotate({ identifier: "GoogleCloudDocumentaiV1EvaluationEvaluationRevision" }) as any as Schema.Schema<GoogleCloudDocumentaiV1EvaluationEvaluationRevision>;

export interface GoogleCloudDocumentaiV1Evaluation {
  /** The resource name of the evaluation. Format: `projects/{project}/locations/{location}/processors/{processor}/processorVersions/{processor_version}/evaluations/{evaluation}` */
  name?: string;
  /** The time that the evaluation was created. */
  createTime?: string;
  /** Counters for the documents used in the evaluation. */
  documentCounters?: GoogleCloudDocumentaiV1EvaluationCounters;
  /** Metrics for all the entities in aggregate. */
  allEntitiesMetrics?: GoogleCloudDocumentaiV1EvaluationMultiConfidenceMetrics;
  /** Metrics across confidence levels, for different entities. */
  entityMetrics?: Record<string, GoogleCloudDocumentaiV1EvaluationMultiConfidenceMetrics>;
  /** The KMS key name used for encryption. */
  kmsKeyName?: string;
  /** The KMS key version with which data is encrypted. */
  kmsKeyVersionName?: string;
  /** Contains all revisions of the evaluation, excluding the latest one. */
  revisions?: Array<GoogleCloudDocumentaiV1EvaluationEvaluationRevision>;
}

export const GoogleCloudDocumentaiV1Evaluation: Schema.Schema<GoogleCloudDocumentaiV1Evaluation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  documentCounters: Schema.optional(GoogleCloudDocumentaiV1EvaluationCounters),
  allEntitiesMetrics: Schema.optional(GoogleCloudDocumentaiV1EvaluationMultiConfidenceMetrics),
  entityMetrics: Schema.optional(Schema.Record(Schema.String, GoogleCloudDocumentaiV1EvaluationMultiConfidenceMetrics)),
  kmsKeyName: Schema.optional(Schema.String),
  kmsKeyVersionName: Schema.optional(Schema.String),
  revisions: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1EvaluationEvaluationRevision)),
})).annotate({ identifier: "GoogleCloudDocumentaiV1Evaluation" }) as any as Schema.Schema<GoogleCloudDocumentaiV1Evaluation>;

export interface GoogleCloudDocumentaiV1ListEvaluationsResponse {
  /** The evaluations requested. */
  evaluations?: Array<GoogleCloudDocumentaiV1Evaluation>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleCloudDocumentaiV1ListEvaluationsResponse: Schema.Schema<GoogleCloudDocumentaiV1ListEvaluationsResponse> = Schema.suspend(() => Schema.Struct({
  evaluations: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1Evaluation)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1ListEvaluationsResponse" }) as any as Schema.Schema<GoogleCloudDocumentaiV1ListEvaluationsResponse>;

export interface GoogleCloudDocumentaiV1NextSchema {
  /** Identifier. The resource name of the Schema. Format: `projects/{project}/locations/{location}/schemas/{schema}` */
  name?: string;
  /** Required. The user-defined name of the Schema. */
  displayName?: string;
  /** Optional. The {{gcp_name_short}} labels for the Schema. */
  labels?: Record<string, string>;
  /** Output only. The time when the Schema was created. */
  createTime?: string;
  /** Output only. The time when the Schema was last updated. */
  updateTime?: string;
}

export const GoogleCloudDocumentaiV1NextSchema: Schema.Schema<GoogleCloudDocumentaiV1NextSchema> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1NextSchema" }) as any as Schema.Schema<GoogleCloudDocumentaiV1NextSchema>;

export interface GoogleCloudDocumentaiV1ListSchemasResponse {
  /** The list of Schemas. */
  schemas?: Array<GoogleCloudDocumentaiV1NextSchema>;
  /** Points to the next Schema, otherwise empty. */
  nextPageToken?: string;
}

export const GoogleCloudDocumentaiV1ListSchemasResponse: Schema.Schema<GoogleCloudDocumentaiV1ListSchemasResponse> = Schema.suspend(() => Schema.Struct({
  schemas: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1NextSchema)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1ListSchemasResponse" }) as any as Schema.Schema<GoogleCloudDocumentaiV1ListSchemasResponse>;

export interface GoogleCloudDocumentaiV1SchemaVersion {
  /** Identifier. The resource name of the SchemaVersion. Format: `projects/{project}/locations/{location}/schemas/{schema}/schemaVersions/{schema_version}` */
  name?: string;
  /** Required. The user-defined name of the SchemaVersion. */
  displayName?: string;
  /** Optional. The {{gcp_name_short}} labels for the SchemaVersion. */
  labels?: Record<string, string>;
  /** Output only. The time when the SchemaVersion was created. */
  createTime?: string;
  /** Required. The schema of the SchemaVersion. */
  schema?: GoogleCloudDocumentaiV1DocumentSchema;
}

export const GoogleCloudDocumentaiV1SchemaVersion: Schema.Schema<GoogleCloudDocumentaiV1SchemaVersion> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  createTime: Schema.optional(Schema.String),
  schema: Schema.optional(GoogleCloudDocumentaiV1DocumentSchema),
})).annotate({ identifier: "GoogleCloudDocumentaiV1SchemaVersion" }) as any as Schema.Schema<GoogleCloudDocumentaiV1SchemaVersion>;

export interface GoogleCloudDocumentaiV1Documents {
  /** The list of documents. */
  documents?: Array<GoogleCloudDocumentaiV1Document>;
}

export const GoogleCloudDocumentaiV1Documents: Schema.Schema<GoogleCloudDocumentaiV1Documents> = Schema.suspend(() => Schema.Struct({
  documents: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1Document)),
})).annotate({ identifier: "GoogleCloudDocumentaiV1Documents" }) as any as Schema.Schema<GoogleCloudDocumentaiV1Documents>;

export interface GoogleCloudDocumentaiV1RawDocuments {
  /** Specifies raw document content and mime type. */
  documents?: Array<GoogleCloudDocumentaiV1RawDocument>;
}

export const GoogleCloudDocumentaiV1RawDocuments: Schema.Schema<GoogleCloudDocumentaiV1RawDocuments> = Schema.suspend(() => Schema.Struct({
  documents: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1RawDocument)),
})).annotate({ identifier: "GoogleCloudDocumentaiV1RawDocuments" }) as any as Schema.Schema<GoogleCloudDocumentaiV1RawDocuments>;

export interface GoogleCloudDocumentaiV1SchemaGenerationIteration {
  /** Optional. The prompt used for the iteration. */
  prompt?: string;
  /** Required. The schema version generated by the model. */
  generatedSchema?: GoogleCloudDocumentaiV1SchemaVersion;
  /** Optional. The previous schema version adjusted by the model. */
  adjustedSchema?: GoogleCloudDocumentaiV1SchemaVersion;
}

export const GoogleCloudDocumentaiV1SchemaGenerationIteration: Schema.Schema<GoogleCloudDocumentaiV1SchemaGenerationIteration> = Schema.suspend(() => Schema.Struct({
  prompt: Schema.optional(Schema.String),
  generatedSchema: Schema.optional(GoogleCloudDocumentaiV1SchemaVersion),
  adjustedSchema: Schema.optional(GoogleCloudDocumentaiV1SchemaVersion),
})).annotate({ identifier: "GoogleCloudDocumentaiV1SchemaGenerationIteration" }) as any as Schema.Schema<GoogleCloudDocumentaiV1SchemaGenerationIteration>;

export interface GoogleCloudDocumentaiV1SchemaGenerationHistory {
  /** Required. Previous prompt-answers in a chronological order. */
  iterations?: Array<GoogleCloudDocumentaiV1SchemaGenerationIteration>;
}

export const GoogleCloudDocumentaiV1SchemaGenerationHistory: Schema.Schema<GoogleCloudDocumentaiV1SchemaGenerationHistory> = Schema.suspend(() => Schema.Struct({
  iterations: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1SchemaGenerationIteration)),
})).annotate({ identifier: "GoogleCloudDocumentaiV1SchemaGenerationHistory" }) as any as Schema.Schema<GoogleCloudDocumentaiV1SchemaGenerationHistory>;

export interface GoogleCloudDocumentaiV1GenerateSchemaVersionRequestGenerateSchemaVersionParams {
  /** Optional. The prompt used for the schema generation. */
  prompt?: string;
  /** Optional. Previous prompt-answers in a chronological order. */
  history?: GoogleCloudDocumentaiV1SchemaGenerationHistory;
}

export const GoogleCloudDocumentaiV1GenerateSchemaVersionRequestGenerateSchemaVersionParams: Schema.Schema<GoogleCloudDocumentaiV1GenerateSchemaVersionRequestGenerateSchemaVersionParams> = Schema.suspend(() => Schema.Struct({
  prompt: Schema.optional(Schema.String),
  history: Schema.optional(GoogleCloudDocumentaiV1SchemaGenerationHistory),
})).annotate({ identifier: "GoogleCloudDocumentaiV1GenerateSchemaVersionRequestGenerateSchemaVersionParams" }) as any as Schema.Schema<GoogleCloudDocumentaiV1GenerateSchemaVersionRequestGenerateSchemaVersionParams>;

export interface GoogleCloudDocumentaiV1GenerateSchemaVersionRequest {
  /** The set of documents specified inline. For each document, its `uri` or `content` field must be set. */
  inlineDocuments?: GoogleCloudDocumentaiV1Documents;
  /** The set of raw documents. */
  rawDocuments?: GoogleCloudDocumentaiV1RawDocuments;
  /** The set of documents placed on Cloud Storage. */
  gcsDocuments?: GoogleCloudDocumentaiV1GcsDocuments;
  /** The common prefix of documents placed on Cloud Storage. */
  gcsPrefix?: GoogleCloudDocumentaiV1GcsPrefix;
  /** The base schema version name to use for the schema generation. Format: `projects/{project}/locations/{location}/schemas/{schema}/schemaVersions/{schema_version}` */
  baseSchemaVersion?: string;
  /** Optional. User specified parameters for the schema generation. */
  generateSchemaVersionParams?: GoogleCloudDocumentaiV1GenerateSchemaVersionRequestGenerateSchemaVersionParams;
}

export const GoogleCloudDocumentaiV1GenerateSchemaVersionRequest: Schema.Schema<GoogleCloudDocumentaiV1GenerateSchemaVersionRequest> = Schema.suspend(() => Schema.Struct({
  inlineDocuments: Schema.optional(GoogleCloudDocumentaiV1Documents),
  rawDocuments: Schema.optional(GoogleCloudDocumentaiV1RawDocuments),
  gcsDocuments: Schema.optional(GoogleCloudDocumentaiV1GcsDocuments),
  gcsPrefix: Schema.optional(GoogleCloudDocumentaiV1GcsPrefix),
  baseSchemaVersion: Schema.optional(Schema.String),
  generateSchemaVersionParams: Schema.optional(GoogleCloudDocumentaiV1GenerateSchemaVersionRequestGenerateSchemaVersionParams),
})).annotate({ identifier: "GoogleCloudDocumentaiV1GenerateSchemaVersionRequest" }) as any as Schema.Schema<GoogleCloudDocumentaiV1GenerateSchemaVersionRequest>;

export interface GoogleCloudDocumentaiV1GenerateSchemaVersionResponse {
  /** The schema version generated by the model. */
  schemaVersion?: GoogleCloudDocumentaiV1SchemaVersion;
}

export const GoogleCloudDocumentaiV1GenerateSchemaVersionResponse: Schema.Schema<GoogleCloudDocumentaiV1GenerateSchemaVersionResponse> = Schema.suspend(() => Schema.Struct({
  schemaVersion: Schema.optional(GoogleCloudDocumentaiV1SchemaVersion),
})).annotate({ identifier: "GoogleCloudDocumentaiV1GenerateSchemaVersionResponse" }) as any as Schema.Schema<GoogleCloudDocumentaiV1GenerateSchemaVersionResponse>;

export interface GoogleCloudDocumentaiV1ListSchemaVersionsResponse {
  /** The list of SchemaVersions. */
  schemaVersions?: Array<GoogleCloudDocumentaiV1SchemaVersion>;
  /** Points to the next SchemaVersion, otherwise empty. */
  nextPageToken?: string;
}

export const GoogleCloudDocumentaiV1ListSchemaVersionsResponse: Schema.Schema<GoogleCloudDocumentaiV1ListSchemaVersionsResponse> = Schema.suspend(() => Schema.Struct({
  schemaVersions: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1SchemaVersion)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1ListSchemaVersionsResponse" }) as any as Schema.Schema<GoogleCloudDocumentaiV1ListSchemaVersionsResponse>;

export interface GoogleCloudLocationLocation {
  /** Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` */
  name?: string;
  /** The canonical id for this location. For example: `"us-east1"`. */
  locationId?: string;
  /** The friendly name for this location, typically a nearby city name. For example, "Tokyo". */
  displayName?: string;
  /** Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} */
  labels?: Record<string, string>;
  /** Service-specific metadata. For example the available capacity at the given location. */
  metadata?: Record<string, unknown>;
}

export const GoogleCloudLocationLocation: Schema.Schema<GoogleCloudLocationLocation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  locationId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleCloudLocationLocation" }) as any as Schema.Schema<GoogleCloudLocationLocation>;

export interface GoogleCloudLocationListLocationsResponse {
  /** A list of locations that matches the specified filter in the request. */
  locations?: Array<GoogleCloudLocationLocation>;
  /** The standard List next-page token. */
  nextPageToken?: string;
}

export const GoogleCloudLocationListLocationsResponse: Schema.Schema<GoogleCloudLocationListLocationsResponse> = Schema.suspend(() => Schema.Struct({
  locations: Schema.optional(Schema.Array(GoogleCloudLocationLocation)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudLocationListLocationsResponse" }) as any as Schema.Schema<GoogleCloudLocationListLocationsResponse>;

export interface CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleConstant {
  floatValue?: number;
}

export const CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleConstant: Schema.Schema<CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleConstant> = Schema.suspend(() => Schema.Struct({
  floatValue: Schema.optional(Schema.Number),
})).annotate({ identifier: "CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleConstant" }) as any as Schema.Schema<CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleConstant>;

export interface CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleField {
  /** The field name to validate. This can be a simple field name or a nested field one using the ':' (meant as an aggregator) or '*' (meant as foreach) operators. */
  fieldName?: string;
  /** Default value to use if the field is not present. If the field is missing and the default value is not set, the validation run as if the field is not present in the validation logic. */
  defaultValue?: CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleConstant;
}

export const CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleField: Schema.Schema<CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleField> = Schema.suspend(() => Schema.Struct({
  fieldName: Schema.optional(Schema.String),
  defaultValue: Schema.optional(CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleConstant),
})).annotate({ identifier: "CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleField" }) as any as Schema.Schema<CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleField>;

export interface CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleFieldOccurrences {
  field?: CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleField;
  /** Min and max occurrences of the field. If not set, there is limit set. The defined interval is a closed-closed interval, i.e. [min, max]. */
  minOccurrences?: number;
  maxOccurrences?: number;
}

export const CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleFieldOccurrences: Schema.Schema<CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleFieldOccurrences> = Schema.suspend(() => Schema.Struct({
  field: Schema.optional(CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleField),
  minOccurrences: Schema.optional(Schema.Number),
  maxOccurrences: Schema.optional(Schema.Number),
})).annotate({ identifier: "CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleFieldOccurrences" }) as any as Schema.Schema<CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleFieldOccurrences>;

export interface CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleFieldRegex {
  field?: CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleField;
  /** Python regex to validate the field values. */
  pattern?: string;
}

export const CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleFieldRegex: Schema.Schema<CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleFieldRegex> = Schema.suspend(() => Schema.Struct({
  field: Schema.optional(CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleField),
  pattern: Schema.optional(Schema.String),
})).annotate({ identifier: "CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleFieldRegex" }) as any as Schema.Schema<CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleFieldRegex>;

export interface CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleFormValidationOperation {
  /** A list of fields to be used as operands. */
  fields?: Array<CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleField>;
  /** A list of constants to be used as operands. */
  constants?: Array<CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleConstant>;
  /** A list of recursive operations to be used as operands. */
  operations?: Array<CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleFormValidationOperation>;
  /** The operation type to be applied to all the operands. */
  operationType?: "OPERATION_TYPE_UNSPECIFIED" | "OPERATION_TYPE_SUM" | "OPERATION_TYPE_SUB" | "OPERATION_TYPE_MUL" | "OPERATION_TYPE_DIV" | "OPERATION_TYPE_MAX" | "OPERATION_TYPE_MIN" | "OPERATION_TYPE_ABS" | "OPERATION_TYPE_UNIQUE" | "OPERATION_TYPE_COUNT" | (string & {});
}

export const CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleFormValidationOperation: Schema.Schema<CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleFormValidationOperation> = Schema.suspend(() => Schema.Struct({
  fields: Schema.optional(Schema.Array(CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleField)),
  constants: Schema.optional(Schema.Array(CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleConstant)),
  operations: Schema.optional(Schema.Array(CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleFormValidationOperation)),
  operationType: Schema.optional(Schema.String),
})).annotate({ identifier: "CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleFormValidationOperation" }) as any as Schema.Schema<CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleFormValidationOperation>;

export interface CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleFormValidation {
  leftOperand?: CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleFormValidationOperation;
  rightOperand?: CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleFormValidationOperation;
  /** The relational operator to be applied to the operands. */
  validationOperator?: "OPERATION_TYPE_UNSPECIFIED" | "OPERATION_TYPE_EQ" | "OPERATION_TYPE_NE" | "OPERATION_TYPE_LT" | "OPERATION_TYPE_LE" | "OPERATION_TYPE_GT" | "OPERATION_TYPE_GE" | (string & {});
}

export const CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleFormValidation: Schema.Schema<CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleFormValidation> = Schema.suspend(() => Schema.Struct({
  leftOperand: Schema.optional(CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleFormValidationOperation),
  rightOperand: Schema.optional(CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleFormValidationOperation),
  validationOperator: Schema.optional(Schema.String),
})).annotate({ identifier: "CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleFormValidation" }) as any as Schema.Schema<CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleFormValidation>;

export interface CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleAlignmentRule {
  alignmentType?: "ALIGNMENT_TYPE_UNSPECIFIED" | "ALIGNMENT_TYPE_HORIZONTAL" | "ALIGNMENT_TYPE_VERTICAL" | (string & {});
  /** The tolerance to use when comparing coordinates. */
  tolerance?: number;
}

export const CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleAlignmentRule: Schema.Schema<CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleAlignmentRule> = Schema.suspend(() => Schema.Struct({
  alignmentType: Schema.optional(Schema.String),
  tolerance: Schema.optional(Schema.Number),
})).annotate({ identifier: "CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleAlignmentRule" }) as any as Schema.Schema<CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleAlignmentRule>;

export interface CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleChildAlignmentRule {
  /** The full path of the parent field. */
  parentField?: CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleField;
  /** The child fields to be aligned within the parent field. */
  childFields?: Array<CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleField>;
  /** The alignment rule to apply to the child fields. */
  alignmentRule?: CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleAlignmentRule;
}

export const CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleChildAlignmentRule: Schema.Schema<CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleChildAlignmentRule> = Schema.suspend(() => Schema.Struct({
  parentField: Schema.optional(CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleField),
  childFields: Schema.optional(Schema.Array(CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleField)),
  alignmentRule: Schema.optional(CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleAlignmentRule),
})).annotate({ identifier: "CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleChildAlignmentRule" }) as any as Schema.Schema<CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleChildAlignmentRule>;

export interface CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleEntityAlignmentRule {
  /** The fields to be aligned. */
  fields?: Array<CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleField>;
  /** The alignment rule to apply to the fields. */
  alignmentRule?: CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleAlignmentRule;
}

export const CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleEntityAlignmentRule: Schema.Schema<CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleEntityAlignmentRule> = Schema.suspend(() => Schema.Struct({
  fields: Schema.optional(Schema.Array(CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleField)),
  alignmentRule: Schema.optional(CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleAlignmentRule),
})).annotate({ identifier: "CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleEntityAlignmentRule" }) as any as Schema.Schema<CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleEntityAlignmentRule>;

export interface CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRule {
  /** Unique identifier of the rule. Optional. */
  ruleId?: string;
  /** Name of the validation rule. */
  name?: string;
  /** Description of the validation rule. This has no use but for documentation. */
  description?: string;
  fieldOccurrences?: CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleFieldOccurrences;
  fieldRegex?: CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleFieldRegex;
  formValidation?: CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleFormValidation;
  childAlignmentRule?: CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleChildAlignmentRule;
  entityAlignmentRule?: CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleEntityAlignmentRule;
}

export const CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRule: Schema.Schema<CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRule> = Schema.suspend(() => Schema.Struct({
  ruleId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  fieldOccurrences: Schema.optional(CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleFieldOccurrences),
  fieldRegex: Schema.optional(CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleFieldRegex),
  formValidation: Schema.optional(CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleFormValidation),
  childAlignmentRule: Schema.optional(CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleChildAlignmentRule),
  entityAlignmentRule: Schema.optional(CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRuleEntityAlignmentRule),
})).annotate({ identifier: "CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRule" }) as any as Schema.Schema<CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRule>;

export interface CloudAiDocumentaiLabHifiaToolsValidationValidatorInput {
  validationRules?: Array<CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRule>;
}

export const CloudAiDocumentaiLabHifiaToolsValidationValidatorInput: Schema.Schema<CloudAiDocumentaiLabHifiaToolsValidationValidatorInput> = Schema.suspend(() => Schema.Struct({
  validationRules: Schema.optional(Schema.Array(CloudAiDocumentaiLabHifiaToolsValidationValidatorInputValidationRule)),
})).annotate({ identifier: "CloudAiDocumentaiLabHifiaToolsValidationValidatorInput" }) as any as Schema.Schema<CloudAiDocumentaiLabHifiaToolsValidationValidatorInput>;

export interface GoogleCloudDocumentaiV1BatchProcessResponse {
}

export const GoogleCloudDocumentaiV1BatchProcessResponse: Schema.Schema<GoogleCloudDocumentaiV1BatchProcessResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDocumentaiV1BatchProcessResponse" }) as any as Schema.Schema<GoogleCloudDocumentaiV1BatchProcessResponse>;

export interface GoogleCloudDocumentaiV1BatchProcessMetadataIndividualProcessStatus {
  /** The source of the document, same as the input_gcs_source field in the request when the batch process started. */
  inputGcsSource?: string;
  /** The status processing the document. */
  status?: GoogleRpcStatus;
  /** The Cloud Storage output destination (in the request as DocumentOutputConfig.GcsOutputConfig.gcs_uri) of the processed document if it was successful, otherwise empty. */
  outputGcsDestination?: string;
  /** The status of human review on the processed document. */
  humanReviewStatus?: GoogleCloudDocumentaiV1HumanReviewStatus;
}

export const GoogleCloudDocumentaiV1BatchProcessMetadataIndividualProcessStatus: Schema.Schema<GoogleCloudDocumentaiV1BatchProcessMetadataIndividualProcessStatus> = Schema.suspend(() => Schema.Struct({
  inputGcsSource: Schema.optional(Schema.String),
  status: Schema.optional(GoogleRpcStatus),
  outputGcsDestination: Schema.optional(Schema.String),
  humanReviewStatus: Schema.optional(GoogleCloudDocumentaiV1HumanReviewStatus),
})).annotate({ identifier: "GoogleCloudDocumentaiV1BatchProcessMetadataIndividualProcessStatus" }) as any as Schema.Schema<GoogleCloudDocumentaiV1BatchProcessMetadataIndividualProcessStatus>;

export interface GoogleCloudDocumentaiV1BatchProcessMetadata {
  /** The state of the current batch processing. */
  state?: "STATE_UNSPECIFIED" | "WAITING" | "RUNNING" | "SUCCEEDED" | "CANCELLING" | "CANCELLED" | "FAILED" | (string & {});
  /** A message providing more details about the current state of processing. For example, the error message if the operation is failed. */
  stateMessage?: string;
  /** The creation time of the operation. */
  createTime?: string;
  /** The last update time of the operation. */
  updateTime?: string;
  /** The list of response details of each document. */
  individualProcessStatuses?: Array<GoogleCloudDocumentaiV1BatchProcessMetadataIndividualProcessStatus>;
}

export const GoogleCloudDocumentaiV1BatchProcessMetadata: Schema.Schema<GoogleCloudDocumentaiV1BatchProcessMetadata> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  stateMessage: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  individualProcessStatuses: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1BatchProcessMetadataIndividualProcessStatus)),
})).annotate({ identifier: "GoogleCloudDocumentaiV1BatchProcessMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiV1BatchProcessMetadata>;

export interface GoogleCloudDocumentaiV1ReviewDocumentResponse {
  /** The Cloud Storage uri for the human reviewed document if the review is succeeded. */
  gcsDestination?: string;
  /** The state of the review operation. */
  state?: "STATE_UNSPECIFIED" | "REJECTED" | "SUCCEEDED" | (string & {});
  /** The reason why the review is rejected by reviewer. */
  rejectionReason?: string;
}

export const GoogleCloudDocumentaiV1ReviewDocumentResponse: Schema.Schema<GoogleCloudDocumentaiV1ReviewDocumentResponse> = Schema.suspend(() => Schema.Struct({
  gcsDestination: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  rejectionReason: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1ReviewDocumentResponse" }) as any as Schema.Schema<GoogleCloudDocumentaiV1ReviewDocumentResponse>;

export interface GoogleCloudDocumentaiV1CommonOperationMetadata {
  /** The state of the operation. */
  state?: "STATE_UNSPECIFIED" | "RUNNING" | "CANCELLING" | "SUCCEEDED" | "FAILED" | "CANCELLED" | (string & {});
  /** A message providing more details about the current state of processing. */
  stateMessage?: string;
  /** A related resource to this operation. */
  resource?: string;
  /** The creation time of the operation. */
  createTime?: string;
  /** The last update time of the operation. */
  updateTime?: string;
}

export const GoogleCloudDocumentaiV1CommonOperationMetadata: Schema.Schema<GoogleCloudDocumentaiV1CommonOperationMetadata> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  stateMessage: Schema.optional(Schema.String),
  resource: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1CommonOperationMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiV1CommonOperationMetadata>;

export interface GoogleCloudDocumentaiV1ReviewDocumentOperationMetadata {
  /** The basic metadata of the long-running operation. */
  commonMetadata?: GoogleCloudDocumentaiV1CommonOperationMetadata;
  /** The Crowd Compute question ID. */
  questionId?: string;
}

export const GoogleCloudDocumentaiV1ReviewDocumentOperationMetadata: Schema.Schema<GoogleCloudDocumentaiV1ReviewDocumentOperationMetadata> = Schema.suspend(() => Schema.Struct({
  commonMetadata: Schema.optional(GoogleCloudDocumentaiV1CommonOperationMetadata),
  questionId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1ReviewDocumentOperationMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiV1ReviewDocumentOperationMetadata>;

export interface GoogleCloudDocumentaiV1DeleteProcessorMetadata {
  /** The basic metadata of the long-running operation. */
  commonMetadata?: GoogleCloudDocumentaiV1CommonOperationMetadata;
}

export const GoogleCloudDocumentaiV1DeleteProcessorMetadata: Schema.Schema<GoogleCloudDocumentaiV1DeleteProcessorMetadata> = Schema.suspend(() => Schema.Struct({
  commonMetadata: Schema.optional(GoogleCloudDocumentaiV1CommonOperationMetadata),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DeleteProcessorMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DeleteProcessorMetadata>;

export interface GoogleCloudDocumentaiV1EnableProcessorResponse {
}

export const GoogleCloudDocumentaiV1EnableProcessorResponse: Schema.Schema<GoogleCloudDocumentaiV1EnableProcessorResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDocumentaiV1EnableProcessorResponse" }) as any as Schema.Schema<GoogleCloudDocumentaiV1EnableProcessorResponse>;

export interface GoogleCloudDocumentaiV1EnableProcessorMetadata {
  /** The basic metadata of the long-running operation. */
  commonMetadata?: GoogleCloudDocumentaiV1CommonOperationMetadata;
}

export const GoogleCloudDocumentaiV1EnableProcessorMetadata: Schema.Schema<GoogleCloudDocumentaiV1EnableProcessorMetadata> = Schema.suspend(() => Schema.Struct({
  commonMetadata: Schema.optional(GoogleCloudDocumentaiV1CommonOperationMetadata),
})).annotate({ identifier: "GoogleCloudDocumentaiV1EnableProcessorMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiV1EnableProcessorMetadata>;

export interface GoogleCloudDocumentaiV1DisableProcessorResponse {
}

export const GoogleCloudDocumentaiV1DisableProcessorResponse: Schema.Schema<GoogleCloudDocumentaiV1DisableProcessorResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDocumentaiV1DisableProcessorResponse" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DisableProcessorResponse>;

export interface GoogleCloudDocumentaiV1DisableProcessorMetadata {
  /** The basic metadata of the long-running operation. */
  commonMetadata?: GoogleCloudDocumentaiV1CommonOperationMetadata;
}

export const GoogleCloudDocumentaiV1DisableProcessorMetadata: Schema.Schema<GoogleCloudDocumentaiV1DisableProcessorMetadata> = Schema.suspend(() => Schema.Struct({
  commonMetadata: Schema.optional(GoogleCloudDocumentaiV1CommonOperationMetadata),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DisableProcessorMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DisableProcessorMetadata>;

export interface GoogleCloudDocumentaiV1DeleteProcessorVersionMetadata {
  /** The basic metadata of the long-running operation. */
  commonMetadata?: GoogleCloudDocumentaiV1CommonOperationMetadata;
}

export const GoogleCloudDocumentaiV1DeleteProcessorVersionMetadata: Schema.Schema<GoogleCloudDocumentaiV1DeleteProcessorVersionMetadata> = Schema.suspend(() => Schema.Struct({
  commonMetadata: Schema.optional(GoogleCloudDocumentaiV1CommonOperationMetadata),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DeleteProcessorVersionMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DeleteProcessorVersionMetadata>;

export interface GoogleCloudDocumentaiV1DeployProcessorVersionMetadata {
  /** The basic metadata of the long-running operation. */
  commonMetadata?: GoogleCloudDocumentaiV1CommonOperationMetadata;
}

export const GoogleCloudDocumentaiV1DeployProcessorVersionMetadata: Schema.Schema<GoogleCloudDocumentaiV1DeployProcessorVersionMetadata> = Schema.suspend(() => Schema.Struct({
  commonMetadata: Schema.optional(GoogleCloudDocumentaiV1CommonOperationMetadata),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DeployProcessorVersionMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DeployProcessorVersionMetadata>;

export interface GoogleCloudDocumentaiV1DeployProcessorVersionResponse {
}

export const GoogleCloudDocumentaiV1DeployProcessorVersionResponse: Schema.Schema<GoogleCloudDocumentaiV1DeployProcessorVersionResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDocumentaiV1DeployProcessorVersionResponse" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DeployProcessorVersionResponse>;

export interface GoogleCloudDocumentaiV1UndeployProcessorVersionMetadata {
  /** The basic metadata of the long-running operation. */
  commonMetadata?: GoogleCloudDocumentaiV1CommonOperationMetadata;
}

export const GoogleCloudDocumentaiV1UndeployProcessorVersionMetadata: Schema.Schema<GoogleCloudDocumentaiV1UndeployProcessorVersionMetadata> = Schema.suspend(() => Schema.Struct({
  commonMetadata: Schema.optional(GoogleCloudDocumentaiV1CommonOperationMetadata),
})).annotate({ identifier: "GoogleCloudDocumentaiV1UndeployProcessorVersionMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiV1UndeployProcessorVersionMetadata>;

export interface GoogleCloudDocumentaiV1UndeployProcessorVersionResponse {
}

export const GoogleCloudDocumentaiV1UndeployProcessorVersionResponse: Schema.Schema<GoogleCloudDocumentaiV1UndeployProcessorVersionResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDocumentaiV1UndeployProcessorVersionResponse" }) as any as Schema.Schema<GoogleCloudDocumentaiV1UndeployProcessorVersionResponse>;

export interface GoogleCloudDocumentaiV1SetDefaultProcessorVersionMetadata {
  /** The basic metadata of the long-running operation. */
  commonMetadata?: GoogleCloudDocumentaiV1CommonOperationMetadata;
}

export const GoogleCloudDocumentaiV1SetDefaultProcessorVersionMetadata: Schema.Schema<GoogleCloudDocumentaiV1SetDefaultProcessorVersionMetadata> = Schema.suspend(() => Schema.Struct({
  commonMetadata: Schema.optional(GoogleCloudDocumentaiV1CommonOperationMetadata),
})).annotate({ identifier: "GoogleCloudDocumentaiV1SetDefaultProcessorVersionMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiV1SetDefaultProcessorVersionMetadata>;

export interface GoogleCloudDocumentaiV1SetDefaultProcessorVersionResponse {
}

export const GoogleCloudDocumentaiV1SetDefaultProcessorVersionResponse: Schema.Schema<GoogleCloudDocumentaiV1SetDefaultProcessorVersionResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDocumentaiV1SetDefaultProcessorVersionResponse" }) as any as Schema.Schema<GoogleCloudDocumentaiV1SetDefaultProcessorVersionResponse>;

export interface GoogleCloudDocumentaiV1TrainProcessorVersionMetadataDatasetValidation {
  /** The total number of document errors. */
  documentErrorCount?: number;
  /** The total number of dataset errors. */
  datasetErrorCount?: number;
  /** Error information pertaining to specific documents. A maximum of 10 document errors will be returned. Any document with errors will not be used throughout training. */
  documentErrors?: Array<GoogleRpcStatus>;
  /** Error information for the dataset as a whole. A maximum of 10 dataset errors will be returned. A single dataset error is terminal for training. */
  datasetErrors?: Array<GoogleRpcStatus>;
}

export const GoogleCloudDocumentaiV1TrainProcessorVersionMetadataDatasetValidation: Schema.Schema<GoogleCloudDocumentaiV1TrainProcessorVersionMetadataDatasetValidation> = Schema.suspend(() => Schema.Struct({
  documentErrorCount: Schema.optional(Schema.Number),
  datasetErrorCount: Schema.optional(Schema.Number),
  documentErrors: Schema.optional(Schema.Array(GoogleRpcStatus)),
  datasetErrors: Schema.optional(Schema.Array(GoogleRpcStatus)),
})).annotate({ identifier: "GoogleCloudDocumentaiV1TrainProcessorVersionMetadataDatasetValidation" }) as any as Schema.Schema<GoogleCloudDocumentaiV1TrainProcessorVersionMetadataDatasetValidation>;

export interface GoogleCloudDocumentaiV1TrainProcessorVersionMetadata {
  /** The basic metadata of the long-running operation. */
  commonMetadata?: GoogleCloudDocumentaiV1CommonOperationMetadata;
  /** The training dataset validation information. */
  trainingDatasetValidation?: GoogleCloudDocumentaiV1TrainProcessorVersionMetadataDatasetValidation;
  /** The test dataset validation information. */
  testDatasetValidation?: GoogleCloudDocumentaiV1TrainProcessorVersionMetadataDatasetValidation;
}

export const GoogleCloudDocumentaiV1TrainProcessorVersionMetadata: Schema.Schema<GoogleCloudDocumentaiV1TrainProcessorVersionMetadata> = Schema.suspend(() => Schema.Struct({
  commonMetadata: Schema.optional(GoogleCloudDocumentaiV1CommonOperationMetadata),
  trainingDatasetValidation: Schema.optional(GoogleCloudDocumentaiV1TrainProcessorVersionMetadataDatasetValidation),
  testDatasetValidation: Schema.optional(GoogleCloudDocumentaiV1TrainProcessorVersionMetadataDatasetValidation),
})).annotate({ identifier: "GoogleCloudDocumentaiV1TrainProcessorVersionMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiV1TrainProcessorVersionMetadata>;

export interface GoogleCloudDocumentaiV1TrainProcessorVersionResponse {
  /** The resource name of the processor version produced by training. */
  processorVersion?: string;
}

export const GoogleCloudDocumentaiV1TrainProcessorVersionResponse: Schema.Schema<GoogleCloudDocumentaiV1TrainProcessorVersionResponse> = Schema.suspend(() => Schema.Struct({
  processorVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1TrainProcessorVersionResponse" }) as any as Schema.Schema<GoogleCloudDocumentaiV1TrainProcessorVersionResponse>;

export interface GoogleCloudDocumentaiV1EvaluateProcessorVersionMetadata {
  /** The basic metadata of the long-running operation. */
  commonMetadata?: GoogleCloudDocumentaiV1CommonOperationMetadata;
}

export const GoogleCloudDocumentaiV1EvaluateProcessorVersionMetadata: Schema.Schema<GoogleCloudDocumentaiV1EvaluateProcessorVersionMetadata> = Schema.suspend(() => Schema.Struct({
  commonMetadata: Schema.optional(GoogleCloudDocumentaiV1CommonOperationMetadata),
})).annotate({ identifier: "GoogleCloudDocumentaiV1EvaluateProcessorVersionMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiV1EvaluateProcessorVersionMetadata>;

export interface GoogleCloudDocumentaiV1EvaluateProcessorVersionResponse {
  /** The resource name of the created evaluation. */
  evaluation?: string;
}

export const GoogleCloudDocumentaiV1EvaluateProcessorVersionResponse: Schema.Schema<GoogleCloudDocumentaiV1EvaluateProcessorVersionResponse> = Schema.suspend(() => Schema.Struct({
  evaluation: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1EvaluateProcessorVersionResponse" }) as any as Schema.Schema<GoogleCloudDocumentaiV1EvaluateProcessorVersionResponse>;

export interface GoogleCloudDocumentaiV1beta3BatchProcessResponse {
}

export const GoogleCloudDocumentaiV1beta3BatchProcessResponse: Schema.Schema<GoogleCloudDocumentaiV1beta3BatchProcessResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3BatchProcessResponse" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3BatchProcessResponse>;

export interface GoogleCloudDocumentaiV1beta3HumanReviewStatus {
  /** The state of human review on the processing request. */
  state?: "STATE_UNSPECIFIED" | "SKIPPED" | "VALIDATION_PASSED" | "IN_PROGRESS" | "ERROR" | (string & {});
  /** A message providing more details about the human review state. */
  stateMessage?: string;
  /** The name of the operation triggered by the processed document. This field is populated only when the state is `HUMAN_REVIEW_IN_PROGRESS`. It has the same response type and metadata as the long-running operation returned by ReviewDocument. */
  humanReviewOperation?: string;
}

export const GoogleCloudDocumentaiV1beta3HumanReviewStatus: Schema.Schema<GoogleCloudDocumentaiV1beta3HumanReviewStatus> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  stateMessage: Schema.optional(Schema.String),
  humanReviewOperation: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3HumanReviewStatus" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3HumanReviewStatus>;

export interface GoogleCloudDocumentaiV1beta3BatchProcessMetadataIndividualProcessStatus {
  /** The source of the document, same as the input_gcs_source field in the request when the batch process started. */
  inputGcsSource?: string;
  /** The status processing the document. */
  status?: GoogleRpcStatus;
  /** The Cloud Storage output destination (in the request as DocumentOutputConfig.GcsOutputConfig.gcs_uri) of the processed document if it was successful, otherwise empty. */
  outputGcsDestination?: string;
  /** The name of the operation triggered by the processed document. If the human review process isn't triggered, this field will be empty. It has the same response type and metadata as the long-running operation returned by the ReviewDocument method. */
  humanReviewOperation?: string;
  /** The status of human review on the processed document. */
  humanReviewStatus?: GoogleCloudDocumentaiV1beta3HumanReviewStatus;
}

export const GoogleCloudDocumentaiV1beta3BatchProcessMetadataIndividualProcessStatus: Schema.Schema<GoogleCloudDocumentaiV1beta3BatchProcessMetadataIndividualProcessStatus> = Schema.suspend(() => Schema.Struct({
  inputGcsSource: Schema.optional(Schema.String),
  status: Schema.optional(GoogleRpcStatus),
  outputGcsDestination: Schema.optional(Schema.String),
  humanReviewOperation: Schema.optional(Schema.String),
  humanReviewStatus: Schema.optional(GoogleCloudDocumentaiV1beta3HumanReviewStatus),
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3BatchProcessMetadataIndividualProcessStatus" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3BatchProcessMetadataIndividualProcessStatus>;

export interface GoogleCloudDocumentaiV1beta3BatchProcessMetadata {
  /** The state of the current batch processing. */
  state?: "STATE_UNSPECIFIED" | "WAITING" | "RUNNING" | "SUCCEEDED" | "CANCELLING" | "CANCELLED" | "FAILED" | (string & {});
  /** A message providing more details about the current state of processing. For example, the error message if the operation is failed. */
  stateMessage?: string;
  /** The creation time of the operation. */
  createTime?: string;
  /** The last update time of the operation. */
  updateTime?: string;
  /** The list of response details of each document. */
  individualProcessStatuses?: Array<GoogleCloudDocumentaiV1beta3BatchProcessMetadataIndividualProcessStatus>;
}

export const GoogleCloudDocumentaiV1beta3BatchProcessMetadata: Schema.Schema<GoogleCloudDocumentaiV1beta3BatchProcessMetadata> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  stateMessage: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  individualProcessStatuses: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1beta3BatchProcessMetadataIndividualProcessStatus)),
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3BatchProcessMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3BatchProcessMetadata>;

export interface GoogleCloudDocumentaiV1beta3CommonOperationMetadata {
  /** The state of the operation. */
  state?: "STATE_UNSPECIFIED" | "RUNNING" | "CANCELLING" | "SUCCEEDED" | "FAILED" | "CANCELLED" | (string & {});
  /** A message providing more details about the current state of processing. */
  stateMessage?: string;
  /** A related resource to this operation. */
  resource?: string;
  /** The creation time of the operation. */
  createTime?: string;
  /** The last update time of the operation. */
  updateTime?: string;
}

export const GoogleCloudDocumentaiV1beta3CommonOperationMetadata: Schema.Schema<GoogleCloudDocumentaiV1beta3CommonOperationMetadata> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  stateMessage: Schema.optional(Schema.String),
  resource: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3CommonOperationMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3CommonOperationMetadata>;

export interface GoogleCloudDocumentaiV1beta3DeleteProcessorMetadata {
  /** The basic metadata of the long-running operation. */
  commonMetadata?: GoogleCloudDocumentaiV1beta3CommonOperationMetadata;
}

export const GoogleCloudDocumentaiV1beta3DeleteProcessorMetadata: Schema.Schema<GoogleCloudDocumentaiV1beta3DeleteProcessorMetadata> = Schema.suspend(() => Schema.Struct({
  commonMetadata: Schema.optional(GoogleCloudDocumentaiV1beta3CommonOperationMetadata),
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3DeleteProcessorMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3DeleteProcessorMetadata>;

export interface GoogleCloudDocumentaiV1beta3EnableProcessorResponse {
}

export const GoogleCloudDocumentaiV1beta3EnableProcessorResponse: Schema.Schema<GoogleCloudDocumentaiV1beta3EnableProcessorResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3EnableProcessorResponse" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3EnableProcessorResponse>;

export interface GoogleCloudDocumentaiV1beta3EnableProcessorMetadata {
  /** The basic metadata of the long-running operation. */
  commonMetadata?: GoogleCloudDocumentaiV1beta3CommonOperationMetadata;
}

export const GoogleCloudDocumentaiV1beta3EnableProcessorMetadata: Schema.Schema<GoogleCloudDocumentaiV1beta3EnableProcessorMetadata> = Schema.suspend(() => Schema.Struct({
  commonMetadata: Schema.optional(GoogleCloudDocumentaiV1beta3CommonOperationMetadata),
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3EnableProcessorMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3EnableProcessorMetadata>;

export interface GoogleCloudDocumentaiV1beta3DisableProcessorResponse {
}

export const GoogleCloudDocumentaiV1beta3DisableProcessorResponse: Schema.Schema<GoogleCloudDocumentaiV1beta3DisableProcessorResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3DisableProcessorResponse" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3DisableProcessorResponse>;

export interface GoogleCloudDocumentaiV1beta3DisableProcessorMetadata {
  /** The basic metadata of the long-running operation. */
  commonMetadata?: GoogleCloudDocumentaiV1beta3CommonOperationMetadata;
}

export const GoogleCloudDocumentaiV1beta3DisableProcessorMetadata: Schema.Schema<GoogleCloudDocumentaiV1beta3DisableProcessorMetadata> = Schema.suspend(() => Schema.Struct({
  commonMetadata: Schema.optional(GoogleCloudDocumentaiV1beta3CommonOperationMetadata),
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3DisableProcessorMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3DisableProcessorMetadata>;

export interface GoogleCloudDocumentaiV1beta3ProcessorVersionAlias {
  /** The alias in the form of `processor_version` resource name. */
  alias?: string;
  /** The resource name of aliased processor version. */
  processorVersion?: string;
}

export const GoogleCloudDocumentaiV1beta3ProcessorVersionAlias: Schema.Schema<GoogleCloudDocumentaiV1beta3ProcessorVersionAlias> = Schema.suspend(() => Schema.Struct({
  alias: Schema.optional(Schema.String),
  processorVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3ProcessorVersionAlias" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3ProcessorVersionAlias>;

export interface GoogleCloudDocumentaiV1beta3Processor {
  /** Output only. Immutable. The resource name of the processor. Format: `projects/{project}/locations/{location}/processors/{processor}` */
  name?: string;
  /** The processor type, such as: `OCR_PROCESSOR`, `INVOICE_PROCESSOR`. To get a list of processor types, see FetchProcessorTypes. */
  type?: string;
  /** The display name of the processor. */
  displayName?: string;
  /** Output only. The state of the processor. */
  state?: "STATE_UNSPECIFIED" | "ENABLED" | "DISABLED" | "ENABLING" | "DISABLING" | "CREATING" | "FAILED" | "DELETING" | (string & {});
  /** The default processor version. */
  defaultProcessorVersion?: string;
  /** Output only. The processor version aliases. */
  processorVersionAliases?: Array<GoogleCloudDocumentaiV1beta3ProcessorVersionAlias>;
  /** Output only. Immutable. The http endpoint that can be called to invoke processing. */
  processEndpoint?: string;
  /** Output only. The time the processor was created. */
  createTime?: string;
  /** The [KMS key](https://cloud.google.com/security-key-management) used for encryption and decryption in CMEK scenarios. */
  kmsKeyName?: string;
  /** Output only. Reserved for future use. */
  satisfiesPzs?: boolean;
  /** Output only. Reserved for future use. */
  satisfiesPzi?: boolean;
  /** Optional. SchemaVersion used by the Processor. It is the same as Processor's DatasetSchema.schema_version Format is `projects/{project}/locations/{location}/schemas/{schema}/schemaVersions/{schema_version} */
  activeSchemaVersion?: string;
}

export const GoogleCloudDocumentaiV1beta3Processor: Schema.Schema<GoogleCloudDocumentaiV1beta3Processor> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  defaultProcessorVersion: Schema.optional(Schema.String),
  processorVersionAliases: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1beta3ProcessorVersionAlias)),
  processEndpoint: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  kmsKeyName: Schema.optional(Schema.String),
  satisfiesPzs: Schema.optional(Schema.Boolean),
  satisfiesPzi: Schema.optional(Schema.Boolean),
  activeSchemaVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3Processor" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3Processor>;

export interface GoogleCloudDocumentaiV1beta3UpdateProcessorVersionMetadata {
  /** The basic metadata for the long-running operation. */
  commonMetadata?: GoogleCloudDocumentaiV1beta3CommonOperationMetadata;
}

export const GoogleCloudDocumentaiV1beta3UpdateProcessorVersionMetadata: Schema.Schema<GoogleCloudDocumentaiV1beta3UpdateProcessorVersionMetadata> = Schema.suspend(() => Schema.Struct({
  commonMetadata: Schema.optional(GoogleCloudDocumentaiV1beta3CommonOperationMetadata),
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3UpdateProcessorVersionMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3UpdateProcessorVersionMetadata>;

export interface GoogleCloudDocumentaiV1beta3DocumentSchemaEntityTypeEnumValues {
  /** The individual values that this enum values type can include. */
  values?: Array<string>;
}

export const GoogleCloudDocumentaiV1beta3DocumentSchemaEntityTypeEnumValues: Schema.Schema<GoogleCloudDocumentaiV1beta3DocumentSchemaEntityTypeEnumValues> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3DocumentSchemaEntityTypeEnumValues" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3DocumentSchemaEntityTypeEnumValues>;

export interface GoogleCloudDocumentaiV1beta3SummaryOptions {
  /** How long the summary should be. */
  length?: "LENGTH_UNSPECIFIED" | "BRIEF" | "MODERATE" | "COMPREHENSIVE" | (string & {});
  /** The format the summary should be in. */
  format?: "FORMAT_UNSPECIFIED" | "PARAGRAPH" | "BULLETS" | (string & {});
}

export const GoogleCloudDocumentaiV1beta3SummaryOptions: Schema.Schema<GoogleCloudDocumentaiV1beta3SummaryOptions> = Schema.suspend(() => Schema.Struct({
  length: Schema.optional(Schema.String),
  format: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3SummaryOptions" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3SummaryOptions>;

export interface GoogleCloudDocumentaiV1beta3FieldExtractionMetadata {
  /** Summary options config. */
  summaryOptions?: GoogleCloudDocumentaiV1beta3SummaryOptions;
}

export const GoogleCloudDocumentaiV1beta3FieldExtractionMetadata: Schema.Schema<GoogleCloudDocumentaiV1beta3FieldExtractionMetadata> = Schema.suspend(() => Schema.Struct({
  summaryOptions: Schema.optional(GoogleCloudDocumentaiV1beta3SummaryOptions),
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3FieldExtractionMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3FieldExtractionMetadata>;

export interface GoogleCloudDocumentaiV1beta3PropertyMetadata {
  /** Whether the property should be considered as "inactive". */
  inactive?: boolean;
  /** Field extraction metadata on the property. */
  fieldExtractionMetadata?: GoogleCloudDocumentaiV1beta3FieldExtractionMetadata;
}

export const GoogleCloudDocumentaiV1beta3PropertyMetadata: Schema.Schema<GoogleCloudDocumentaiV1beta3PropertyMetadata> = Schema.suspend(() => Schema.Struct({
  inactive: Schema.optional(Schema.Boolean),
  fieldExtractionMetadata: Schema.optional(GoogleCloudDocumentaiV1beta3FieldExtractionMetadata),
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3PropertyMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3PropertyMetadata>;

export interface GoogleCloudDocumentaiV1beta3DocumentSchemaEntityTypeProperty {
  /** The name of the property. Follows the same guidelines as the EntityType name. */
  name?: string;
  /** The description of the property. Could be used to provide more information about the property for model calls. */
  description?: string;
  /** User defined name for the property. */
  displayName?: string;
  /** A reference to the value type of the property. This type is subject to the same conventions as the `Entity.base_types` field. */
  valueType?: string;
  /** Occurrence type limits the number of instances an entity type appears in the document. */
  occurrenceType?: "OCCURRENCE_TYPE_UNSPECIFIED" | "OPTIONAL_ONCE" | "OPTIONAL_MULTIPLE" | "REQUIRED_ONCE" | "REQUIRED_MULTIPLE" | (string & {});
  /** Specifies how the entity's value is obtained. */
  method?: "METHOD_UNSPECIFIED" | "EXTRACT" | "DERIVE" | "RELAXED_EXTRACT" | (string & {});
  /** Any additional metadata about the property can be added here. */
  propertyMetadata?: GoogleCloudDocumentaiV1beta3PropertyMetadata;
}

export const GoogleCloudDocumentaiV1beta3DocumentSchemaEntityTypeProperty: Schema.Schema<GoogleCloudDocumentaiV1beta3DocumentSchemaEntityTypeProperty> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  valueType: Schema.optional(Schema.String),
  occurrenceType: Schema.optional(Schema.String),
  method: Schema.optional(Schema.String),
  propertyMetadata: Schema.optional(GoogleCloudDocumentaiV1beta3PropertyMetadata),
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3DocumentSchemaEntityTypeProperty" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3DocumentSchemaEntityTypeProperty>;

export interface GoogleCloudDocumentaiV1beta3EntityTypeMetadata {
  /** Whether the entity type should be considered inactive. */
  inactive?: boolean;
}

export const GoogleCloudDocumentaiV1beta3EntityTypeMetadata: Schema.Schema<GoogleCloudDocumentaiV1beta3EntityTypeMetadata> = Schema.suspend(() => Schema.Struct({
  inactive: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3EntityTypeMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3EntityTypeMetadata>;

export interface GoogleCloudDocumentaiV1beta3DocumentSchemaEntityType {
  /** If specified, lists all the possible values for this entity. This should not be more than a handful of values. If the number of values is >10 or could change frequently, use the `EntityType.value_ontology` field and specify a list of all possible values in a value ontology file. */
  enumValues?: GoogleCloudDocumentaiV1beta3DocumentSchemaEntityTypeEnumValues;
  /** User defined name for the type. */
  displayName?: string;
  /** Name of the type. It must be unique within the schema file and cannot be a "Common Type". The following naming conventions are used: - Use `snake_casing`. - Name matching is case-sensitive. - Maximum 64 characters. - Must start with a letter. - Allowed characters: ASCII letters `[a-z0-9_-]`. (For backward compatibility, internal infrastructure and tooling can handle any ASCII character.) - The `/` is sometimes used to denote a property of a type. For example `line_item/amount`. This convention is deprecated, but will still be honored for backward compatibility. */
  name?: string;
  /** The description of the entity type. Could be used to provide more information about the entity type for model calls. */
  description?: string;
  /** The entity type that this type is derived from. For now, one and only one should be set. */
  baseTypes?: Array<string>;
  /** Description the nested structure, or composition of an entity. */
  properties?: Array<GoogleCloudDocumentaiV1beta3DocumentSchemaEntityTypeProperty>;
  /** Metadata for the entity type. */
  entityTypeMetadata?: GoogleCloudDocumentaiV1beta3EntityTypeMetadata;
}

export const GoogleCloudDocumentaiV1beta3DocumentSchemaEntityType: Schema.Schema<GoogleCloudDocumentaiV1beta3DocumentSchemaEntityType> = Schema.suspend(() => Schema.Struct({
  enumValues: Schema.optional(GoogleCloudDocumentaiV1beta3DocumentSchemaEntityTypeEnumValues),
  displayName: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  baseTypes: Schema.optional(Schema.Array(Schema.String)),
  properties: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1beta3DocumentSchemaEntityTypeProperty)),
  entityTypeMetadata: Schema.optional(GoogleCloudDocumentaiV1beta3EntityTypeMetadata),
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3DocumentSchemaEntityType" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3DocumentSchemaEntityType>;

export interface GoogleCloudDocumentaiV1beta3DocumentSchemaMetadata {
  /** If true, a `document` entity type can be applied to subdocument (splitting). Otherwise, it can only be applied to the entire document (classification). */
  documentSplitter?: boolean;
  /** If true, on a given page, there can be multiple `document` annotations covering it. */
  documentAllowMultipleLabels?: boolean;
  /** If set, all the nested entities must be prefixed with the parents. */
  prefixedNamingOnProperties?: boolean;
  /** If set, this will skip the naming format validation in the schema. So the string values in `DocumentSchema.EntityType.name` and `DocumentSchema.EntityType.Property.name` will not be checked. */
  skipNamingValidation?: boolean;
}

export const GoogleCloudDocumentaiV1beta3DocumentSchemaMetadata: Schema.Schema<GoogleCloudDocumentaiV1beta3DocumentSchemaMetadata> = Schema.suspend(() => Schema.Struct({
  documentSplitter: Schema.optional(Schema.Boolean),
  documentAllowMultipleLabels: Schema.optional(Schema.Boolean),
  prefixedNamingOnProperties: Schema.optional(Schema.Boolean),
  skipNamingValidation: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3DocumentSchemaMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3DocumentSchemaMetadata>;

export interface GoogleCloudDocumentaiV1beta3DocumentSchema {
  /** Display name to show users. */
  displayName?: string;
  /** Description of the schema. */
  description?: string;
  /** Entity types of the schema. */
  entityTypes?: Array<GoogleCloudDocumentaiV1beta3DocumentSchemaEntityType>;
  /** Metadata of the schema. */
  metadata?: GoogleCloudDocumentaiV1beta3DocumentSchemaMetadata;
  /** Optional. Document level prompt provided by the user. This custom text is injected into the AI model's prompt to provide extra, document-wide guidance for processing. */
  documentPrompt?: string;
}

export const GoogleCloudDocumentaiV1beta3DocumentSchema: Schema.Schema<GoogleCloudDocumentaiV1beta3DocumentSchema> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  entityTypes: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1beta3DocumentSchemaEntityType)),
  metadata: Schema.optional(GoogleCloudDocumentaiV1beta3DocumentSchemaMetadata),
  documentPrompt: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3DocumentSchema" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3DocumentSchema>;

export interface GoogleCloudDocumentaiV1beta3EvaluationMetrics {
  /** The calculated precision. */
  precision?: number;
  /** The calculated recall. */
  recall?: number;
  /** The calculated F1 score. */
  f1Score?: number;
  /** The amount of occurrences in predicted documents. */
  predictedOccurrencesCount?: number;
  /** The amount of occurrences in ground truth documents. */
  groundTruthOccurrencesCount?: number;
  /** The amount of documents with a predicted occurrence. */
  predictedDocumentCount?: number;
  /** The amount of documents with a ground truth occurrence. */
  groundTruthDocumentCount?: number;
  /** The amount of true positives. */
  truePositivesCount?: number;
  /** The amount of false positives. */
  falsePositivesCount?: number;
  /** The amount of false negatives. */
  falseNegativesCount?: number;
  /** The amount of documents that had an occurrence of this label. */
  totalDocumentsCount?: number;
}

export const GoogleCloudDocumentaiV1beta3EvaluationMetrics: Schema.Schema<GoogleCloudDocumentaiV1beta3EvaluationMetrics> = Schema.suspend(() => Schema.Struct({
  precision: Schema.optional(Schema.Number),
  recall: Schema.optional(Schema.Number),
  f1Score: Schema.optional(Schema.Number),
  predictedOccurrencesCount: Schema.optional(Schema.Number),
  groundTruthOccurrencesCount: Schema.optional(Schema.Number),
  predictedDocumentCount: Schema.optional(Schema.Number),
  groundTruthDocumentCount: Schema.optional(Schema.Number),
  truePositivesCount: Schema.optional(Schema.Number),
  falsePositivesCount: Schema.optional(Schema.Number),
  falseNegativesCount: Schema.optional(Schema.Number),
  totalDocumentsCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3EvaluationMetrics" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3EvaluationMetrics>;

export interface GoogleCloudDocumentaiV1beta3EvaluationReference {
  /** The resource name of the Long Running Operation for the evaluation. */
  operation?: string;
  /** The resource name of the evaluation. */
  evaluation?: string;
  /** An aggregate of the statistics for the evaluation with fuzzy matching on. */
  aggregateMetrics?: GoogleCloudDocumentaiV1beta3EvaluationMetrics;
  /** An aggregate of the statistics for the evaluation with fuzzy matching off. */
  aggregateMetricsExact?: GoogleCloudDocumentaiV1beta3EvaluationMetrics;
}

export const GoogleCloudDocumentaiV1beta3EvaluationReference: Schema.Schema<GoogleCloudDocumentaiV1beta3EvaluationReference> = Schema.suspend(() => Schema.Struct({
  operation: Schema.optional(Schema.String),
  evaluation: Schema.optional(Schema.String),
  aggregateMetrics: Schema.optional(GoogleCloudDocumentaiV1beta3EvaluationMetrics),
  aggregateMetricsExact: Schema.optional(GoogleCloudDocumentaiV1beta3EvaluationMetrics),
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3EvaluationReference" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3EvaluationReference>;

export interface GoogleCloudDocumentaiV1beta3ProcessorVersionDeprecationInfo {
  /** The time at which this processor version will be deprecated. */
  deprecationTime?: string;
  /** If set, the processor version that will be used as a replacement. */
  replacementProcessorVersion?: string;
}

export const GoogleCloudDocumentaiV1beta3ProcessorVersionDeprecationInfo: Schema.Schema<GoogleCloudDocumentaiV1beta3ProcessorVersionDeprecationInfo> = Schema.suspend(() => Schema.Struct({
  deprecationTime: Schema.optional(Schema.String),
  replacementProcessorVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3ProcessorVersionDeprecationInfo" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3ProcessorVersionDeprecationInfo>;

export interface GoogleCloudDocumentaiV1beta3ProcessorVersionGenAiModelInfoFoundationGenAiModelInfo {
  /** Whether fine tuning is allowed for this base processor version. */
  finetuningAllowed?: boolean;
  /** The minimum number of labeled documents in the training dataset required for fine tuning. */
  minTrainLabeledDocuments?: number;
}

export const GoogleCloudDocumentaiV1beta3ProcessorVersionGenAiModelInfoFoundationGenAiModelInfo: Schema.Schema<GoogleCloudDocumentaiV1beta3ProcessorVersionGenAiModelInfoFoundationGenAiModelInfo> = Schema.suspend(() => Schema.Struct({
  finetuningAllowed: Schema.optional(Schema.Boolean),
  minTrainLabeledDocuments: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3ProcessorVersionGenAiModelInfoFoundationGenAiModelInfo" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3ProcessorVersionGenAiModelInfoFoundationGenAiModelInfo>;

export interface GoogleCloudDocumentaiV1beta3ProcessorVersionGenAiModelInfoCustomGenAiModelInfo {
  /** The type of custom model created by the user. */
  customModelType?: "CUSTOM_MODEL_TYPE_UNSPECIFIED" | "VERSIONED_FOUNDATION" | "FINE_TUNED" | (string & {});
  /** The base processor version ID for the custom model. */
  baseProcessorVersionId?: string;
}

export const GoogleCloudDocumentaiV1beta3ProcessorVersionGenAiModelInfoCustomGenAiModelInfo: Schema.Schema<GoogleCloudDocumentaiV1beta3ProcessorVersionGenAiModelInfoCustomGenAiModelInfo> = Schema.suspend(() => Schema.Struct({
  customModelType: Schema.optional(Schema.String),
  baseProcessorVersionId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3ProcessorVersionGenAiModelInfoCustomGenAiModelInfo" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3ProcessorVersionGenAiModelInfoCustomGenAiModelInfo>;

export interface GoogleCloudDocumentaiV1beta3ProcessorVersionGenAiModelInfo {
  /** Information for a pretrained Google-managed foundation model. */
  foundationGenAiModelInfo?: GoogleCloudDocumentaiV1beta3ProcessorVersionGenAiModelInfoFoundationGenAiModelInfo;
  /** Information for a custom Generative AI model created by the user. */
  customGenAiModelInfo?: GoogleCloudDocumentaiV1beta3ProcessorVersionGenAiModelInfoCustomGenAiModelInfo;
}

export const GoogleCloudDocumentaiV1beta3ProcessorVersionGenAiModelInfo: Schema.Schema<GoogleCloudDocumentaiV1beta3ProcessorVersionGenAiModelInfo> = Schema.suspend(() => Schema.Struct({
  foundationGenAiModelInfo: Schema.optional(GoogleCloudDocumentaiV1beta3ProcessorVersionGenAiModelInfoFoundationGenAiModelInfo),
  customGenAiModelInfo: Schema.optional(GoogleCloudDocumentaiV1beta3ProcessorVersionGenAiModelInfoCustomGenAiModelInfo),
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3ProcessorVersionGenAiModelInfo" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3ProcessorVersionGenAiModelInfo>;

export interface GoogleCloudDocumentaiV1beta3ProcessorVersion {
  /** Identifier. The resource name of the processor version. Format: `projects/{project}/locations/{location}/processors/{processor}/processorVersions/{processor_version}` */
  name?: string;
  /** The display name of the processor version. */
  displayName?: string;
  /** Output only. The schema of the processor version. Describes the output. */
  documentSchema?: GoogleCloudDocumentaiV1beta3DocumentSchema;
  /** Output only. The state of the processor version. */
  state?: "STATE_UNSPECIFIED" | "DEPLOYED" | "DEPLOYING" | "UNDEPLOYED" | "UNDEPLOYING" | "CREATING" | "DELETING" | "FAILED" | "IMPORTING" | (string & {});
  /** Output only. The time the processor version was created. */
  createTime?: string;
  /** Output only. The most recently invoked evaluation for the processor version. */
  latestEvaluation?: GoogleCloudDocumentaiV1beta3EvaluationReference;
  /** Output only. The KMS key name used for encryption. */
  kmsKeyName?: string;
  /** Output only. The KMS key version with which data is encrypted. */
  kmsKeyVersionName?: string;
  /** Output only. Denotes that this `ProcessorVersion` is managed by Google. */
  googleManaged?: boolean;
  /** Output only. If set, information about the eventual deprecation of this version. */
  deprecationInfo?: GoogleCloudDocumentaiV1beta3ProcessorVersionDeprecationInfo;
  /** Output only. The model type of this processor version. */
  modelType?: "MODEL_TYPE_UNSPECIFIED" | "MODEL_TYPE_GENERATIVE" | "MODEL_TYPE_CUSTOM" | (string & {});
  /** Output only. Reserved for future use. */
  satisfiesPzs?: boolean;
  /** Output only. Reserved for future use. */
  satisfiesPzi?: boolean;
  /** Output only. Information about Generative AI model-based processor versions. */
  genAiModelInfo?: GoogleCloudDocumentaiV1beta3ProcessorVersionGenAiModelInfo;
}

export const GoogleCloudDocumentaiV1beta3ProcessorVersion: Schema.Schema<GoogleCloudDocumentaiV1beta3ProcessorVersion> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  documentSchema: Schema.optional(GoogleCloudDocumentaiV1beta3DocumentSchema),
  state: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  latestEvaluation: Schema.optional(GoogleCloudDocumentaiV1beta3EvaluationReference),
  kmsKeyName: Schema.optional(Schema.String),
  kmsKeyVersionName: Schema.optional(Schema.String),
  googleManaged: Schema.optional(Schema.Boolean),
  deprecationInfo: Schema.optional(GoogleCloudDocumentaiV1beta3ProcessorVersionDeprecationInfo),
  modelType: Schema.optional(Schema.String),
  satisfiesPzs: Schema.optional(Schema.Boolean),
  satisfiesPzi: Schema.optional(Schema.Boolean),
  genAiModelInfo: Schema.optional(GoogleCloudDocumentaiV1beta3ProcessorVersionGenAiModelInfo),
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3ProcessorVersion" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3ProcessorVersion>;

export interface GoogleCloudDocumentaiV1beta3ReviewDocumentResponse {
  /** The Cloud Storage uri for the human reviewed document if the review is succeeded. */
  gcsDestination?: string;
  /** The state of the review operation. */
  state?: "STATE_UNSPECIFIED" | "REJECTED" | "SUCCEEDED" | (string & {});
  /** The reason why the review is rejected by reviewer. */
  rejectionReason?: string;
}

export const GoogleCloudDocumentaiV1beta3ReviewDocumentResponse: Schema.Schema<GoogleCloudDocumentaiV1beta3ReviewDocumentResponse> = Schema.suspend(() => Schema.Struct({
  gcsDestination: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  rejectionReason: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3ReviewDocumentResponse" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3ReviewDocumentResponse>;

export interface GoogleCloudDocumentaiV1beta3ReviewDocumentOperationMetadata {
  /** Used only when Operation.done is false. */
  state?: "STATE_UNSPECIFIED" | "RUNNING" | "CANCELLING" | "SUCCEEDED" | "FAILED" | "CANCELLED" | (string & {});
  /** A message providing more details about the current state of processing. For example, the error message if the operation is failed. */
  stateMessage?: string;
  /** The creation time of the operation. */
  createTime?: string;
  /** The last update time of the operation. */
  updateTime?: string;
  /** The basic metadata of the long-running operation. */
  commonMetadata?: GoogleCloudDocumentaiV1beta3CommonOperationMetadata;
  /** The Crowd Compute question ID. */
  questionId?: string;
}

export const GoogleCloudDocumentaiV1beta3ReviewDocumentOperationMetadata: Schema.Schema<GoogleCloudDocumentaiV1beta3ReviewDocumentOperationMetadata> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  stateMessage: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  commonMetadata: Schema.optional(GoogleCloudDocumentaiV1beta3CommonOperationMetadata),
  questionId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3ReviewDocumentOperationMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3ReviewDocumentOperationMetadata>;

export interface GoogleCloudDocumentaiV1beta3DeleteProcessorVersionMetadata {
  /** The basic metadata of the long-running operation. */
  commonMetadata?: GoogleCloudDocumentaiV1beta3CommonOperationMetadata;
}

export const GoogleCloudDocumentaiV1beta3DeleteProcessorVersionMetadata: Schema.Schema<GoogleCloudDocumentaiV1beta3DeleteProcessorVersionMetadata> = Schema.suspend(() => Schema.Struct({
  commonMetadata: Schema.optional(GoogleCloudDocumentaiV1beta3CommonOperationMetadata),
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3DeleteProcessorVersionMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3DeleteProcessorVersionMetadata>;

export interface GoogleCloudDocumentaiV1beta3DeployProcessorVersionMetadata {
  /** The basic metadata of the long-running operation. */
  commonMetadata?: GoogleCloudDocumentaiV1beta3CommonOperationMetadata;
}

export const GoogleCloudDocumentaiV1beta3DeployProcessorVersionMetadata: Schema.Schema<GoogleCloudDocumentaiV1beta3DeployProcessorVersionMetadata> = Schema.suspend(() => Schema.Struct({
  commonMetadata: Schema.optional(GoogleCloudDocumentaiV1beta3CommonOperationMetadata),
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3DeployProcessorVersionMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3DeployProcessorVersionMetadata>;

export interface GoogleCloudDocumentaiV1beta3DeployProcessorVersionResponse {
}

export const GoogleCloudDocumentaiV1beta3DeployProcessorVersionResponse: Schema.Schema<GoogleCloudDocumentaiV1beta3DeployProcessorVersionResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3DeployProcessorVersionResponse" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3DeployProcessorVersionResponse>;

export interface GoogleCloudDocumentaiV1beta3UndeployProcessorVersionMetadata {
  /** The basic metadata of the long-running operation. */
  commonMetadata?: GoogleCloudDocumentaiV1beta3CommonOperationMetadata;
}

export const GoogleCloudDocumentaiV1beta3UndeployProcessorVersionMetadata: Schema.Schema<GoogleCloudDocumentaiV1beta3UndeployProcessorVersionMetadata> = Schema.suspend(() => Schema.Struct({
  commonMetadata: Schema.optional(GoogleCloudDocumentaiV1beta3CommonOperationMetadata),
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3UndeployProcessorVersionMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3UndeployProcessorVersionMetadata>;

export interface GoogleCloudDocumentaiV1beta3UndeployProcessorVersionResponse {
}

export const GoogleCloudDocumentaiV1beta3UndeployProcessorVersionResponse: Schema.Schema<GoogleCloudDocumentaiV1beta3UndeployProcessorVersionResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3UndeployProcessorVersionResponse" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3UndeployProcessorVersionResponse>;

export interface GoogleCloudDocumentaiV1beta3SetDefaultProcessorVersionMetadata {
  /** The basic metadata of the long-running operation. */
  commonMetadata?: GoogleCloudDocumentaiV1beta3CommonOperationMetadata;
}

export const GoogleCloudDocumentaiV1beta3SetDefaultProcessorVersionMetadata: Schema.Schema<GoogleCloudDocumentaiV1beta3SetDefaultProcessorVersionMetadata> = Schema.suspend(() => Schema.Struct({
  commonMetadata: Schema.optional(GoogleCloudDocumentaiV1beta3CommonOperationMetadata),
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3SetDefaultProcessorVersionMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3SetDefaultProcessorVersionMetadata>;

export interface GoogleCloudDocumentaiV1beta3SetDefaultProcessorVersionResponse {
}

export const GoogleCloudDocumentaiV1beta3SetDefaultProcessorVersionResponse: Schema.Schema<GoogleCloudDocumentaiV1beta3SetDefaultProcessorVersionResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3SetDefaultProcessorVersionResponse" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3SetDefaultProcessorVersionResponse>;

export interface GoogleCloudDocumentaiV1beta3TrainProcessorVersionMetadataDatasetValidation {
  /** The total number of document errors. */
  documentErrorCount?: number;
  /** The total number of dataset errors. */
  datasetErrorCount?: number;
  /** Error information pertaining to specific documents. A maximum of 10 document errors will be returned. Any document with errors will not be used throughout training. */
  documentErrors?: Array<GoogleRpcStatus>;
  /** Error information for the dataset as a whole. A maximum of 10 dataset errors will be returned. A single dataset error is terminal for training. */
  datasetErrors?: Array<GoogleRpcStatus>;
}

export const GoogleCloudDocumentaiV1beta3TrainProcessorVersionMetadataDatasetValidation: Schema.Schema<GoogleCloudDocumentaiV1beta3TrainProcessorVersionMetadataDatasetValidation> = Schema.suspend(() => Schema.Struct({
  documentErrorCount: Schema.optional(Schema.Number),
  datasetErrorCount: Schema.optional(Schema.Number),
  documentErrors: Schema.optional(Schema.Array(GoogleRpcStatus)),
  datasetErrors: Schema.optional(Schema.Array(GoogleRpcStatus)),
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3TrainProcessorVersionMetadataDatasetValidation" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3TrainProcessorVersionMetadataDatasetValidation>;

export interface GoogleCloudDocumentaiV1beta3TrainProcessorVersionMetadata {
  /** The basic metadata of the long-running operation. */
  commonMetadata?: GoogleCloudDocumentaiV1beta3CommonOperationMetadata;
  /** The training dataset validation information. */
  trainingDatasetValidation?: GoogleCloudDocumentaiV1beta3TrainProcessorVersionMetadataDatasetValidation;
  /** The test dataset validation information. */
  testDatasetValidation?: GoogleCloudDocumentaiV1beta3TrainProcessorVersionMetadataDatasetValidation;
}

export const GoogleCloudDocumentaiV1beta3TrainProcessorVersionMetadata: Schema.Schema<GoogleCloudDocumentaiV1beta3TrainProcessorVersionMetadata> = Schema.suspend(() => Schema.Struct({
  commonMetadata: Schema.optional(GoogleCloudDocumentaiV1beta3CommonOperationMetadata),
  trainingDatasetValidation: Schema.optional(GoogleCloudDocumentaiV1beta3TrainProcessorVersionMetadataDatasetValidation),
  testDatasetValidation: Schema.optional(GoogleCloudDocumentaiV1beta3TrainProcessorVersionMetadataDatasetValidation),
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3TrainProcessorVersionMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3TrainProcessorVersionMetadata>;

export interface GoogleCloudDocumentaiV1beta3TrainProcessorVersionResponse {
  /** The resource name of the processor version produced by training. */
  processorVersion?: string;
}

export const GoogleCloudDocumentaiV1beta3TrainProcessorVersionResponse: Schema.Schema<GoogleCloudDocumentaiV1beta3TrainProcessorVersionResponse> = Schema.suspend(() => Schema.Struct({
  processorVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3TrainProcessorVersionResponse" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3TrainProcessorVersionResponse>;

export interface GoogleCloudDocumentaiV1beta3EvaluateProcessorVersionMetadata {
  /** The basic metadata of the long-running operation. */
  commonMetadata?: GoogleCloudDocumentaiV1beta3CommonOperationMetadata;
}

export const GoogleCloudDocumentaiV1beta3EvaluateProcessorVersionMetadata: Schema.Schema<GoogleCloudDocumentaiV1beta3EvaluateProcessorVersionMetadata> = Schema.suspend(() => Schema.Struct({
  commonMetadata: Schema.optional(GoogleCloudDocumentaiV1beta3CommonOperationMetadata),
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3EvaluateProcessorVersionMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3EvaluateProcessorVersionMetadata>;

export interface GoogleCloudDocumentaiV1beta3EvaluateProcessorVersionResponse {
  /** The resource name of the created evaluation. */
  evaluation?: string;
}

export const GoogleCloudDocumentaiV1beta3EvaluateProcessorVersionResponse: Schema.Schema<GoogleCloudDocumentaiV1beta3EvaluateProcessorVersionResponse> = Schema.suspend(() => Schema.Struct({
  evaluation: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3EvaluateProcessorVersionResponse" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3EvaluateProcessorVersionResponse>;

export interface GoogleCloudDocumentaiV1beta3ImportProcessorVersionMetadata {
  /** The basic metadata for the long-running operation. */
  commonMetadata?: GoogleCloudDocumentaiV1beta3CommonOperationMetadata;
}

export const GoogleCloudDocumentaiV1beta3ImportProcessorVersionMetadata: Schema.Schema<GoogleCloudDocumentaiV1beta3ImportProcessorVersionMetadata> = Schema.suspend(() => Schema.Struct({
  commonMetadata: Schema.optional(GoogleCloudDocumentaiV1beta3CommonOperationMetadata),
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3ImportProcessorVersionMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3ImportProcessorVersionMetadata>;

export interface GoogleCloudDocumentaiV1beta3ImportProcessorVersionResponse {
  /** The destination processor version name. */
  processorVersion?: string;
}

export const GoogleCloudDocumentaiV1beta3ImportProcessorVersionResponse: Schema.Schema<GoogleCloudDocumentaiV1beta3ImportProcessorVersionResponse> = Schema.suspend(() => Schema.Struct({
  processorVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3ImportProcessorVersionResponse" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3ImportProcessorVersionResponse>;

export interface GoogleCloudDocumentaiV1beta3UpdateDatasetOperationMetadata {
  /** The basic metadata of the long-running operation. */
  commonMetadata?: GoogleCloudDocumentaiV1beta3CommonOperationMetadata;
}

export const GoogleCloudDocumentaiV1beta3UpdateDatasetOperationMetadata: Schema.Schema<GoogleCloudDocumentaiV1beta3UpdateDatasetOperationMetadata> = Schema.suspend(() => Schema.Struct({
  commonMetadata: Schema.optional(GoogleCloudDocumentaiV1beta3CommonOperationMetadata),
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3UpdateDatasetOperationMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3UpdateDatasetOperationMetadata>;

export interface GoogleCloudDocumentaiV1beta3GcsPrefix {
  /** The URI prefix. */
  gcsUriPrefix?: string;
}

export const GoogleCloudDocumentaiV1beta3GcsPrefix: Schema.Schema<GoogleCloudDocumentaiV1beta3GcsPrefix> = Schema.suspend(() => Schema.Struct({
  gcsUriPrefix: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3GcsPrefix" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3GcsPrefix>;

export interface GoogleCloudDocumentaiV1beta3DatasetGCSManagedConfig {
  /** Required. The Cloud Storage URI (a directory) where the documents belonging to the dataset must be stored. */
  gcsPrefix?: GoogleCloudDocumentaiV1beta3GcsPrefix;
}

export const GoogleCloudDocumentaiV1beta3DatasetGCSManagedConfig: Schema.Schema<GoogleCloudDocumentaiV1beta3DatasetGCSManagedConfig> = Schema.suspend(() => Schema.Struct({
  gcsPrefix: Schema.optional(GoogleCloudDocumentaiV1beta3GcsPrefix),
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3DatasetGCSManagedConfig" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3DatasetGCSManagedConfig>;

export interface GoogleCloudDocumentaiV1beta3DatasetDocumentWarehouseConfig {
  /** Output only. The collection in Document AI Warehouse associated with the dataset. */
  collection?: string;
  /** Output only. The schema in Document AI Warehouse associated with the dataset. */
  schema?: string;
}

export const GoogleCloudDocumentaiV1beta3DatasetDocumentWarehouseConfig: Schema.Schema<GoogleCloudDocumentaiV1beta3DatasetDocumentWarehouseConfig> = Schema.suspend(() => Schema.Struct({
  collection: Schema.optional(Schema.String),
  schema: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3DatasetDocumentWarehouseConfig" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3DatasetDocumentWarehouseConfig>;

export interface GoogleCloudDocumentaiV1beta3DatasetUnmanagedDatasetConfig {
}

export const GoogleCloudDocumentaiV1beta3DatasetUnmanagedDatasetConfig: Schema.Schema<GoogleCloudDocumentaiV1beta3DatasetUnmanagedDatasetConfig> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3DatasetUnmanagedDatasetConfig" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3DatasetUnmanagedDatasetConfig>;

export interface GoogleCloudDocumentaiV1beta3Dataset {
  /** Optional. User-managed Cloud Storage dataset configuration. Use this configuration if the dataset documents are stored under a user-managed Cloud Storage location. */
  gcsManagedConfig?: GoogleCloudDocumentaiV1beta3DatasetGCSManagedConfig;
  /** Optional. Deprecated. Warehouse-based dataset configuration is not supported. */
  documentWarehouseConfig?: GoogleCloudDocumentaiV1beta3DatasetDocumentWarehouseConfig;
  /** Optional. Unmanaged dataset configuration. Use this configuration if the dataset documents are managed by the document service internally (not user-managed). */
  unmanagedDatasetConfig?: GoogleCloudDocumentaiV1beta3DatasetUnmanagedDatasetConfig;
  /** Dataset resource name. Format: `projects/{project}/locations/{location}/processors/{processor}/dataset` */
  name?: string;
  /** Required. State of the dataset. Ignored when updating dataset. */
  state?: "STATE_UNSPECIFIED" | "UNINITIALIZED" | "INITIALIZING" | "INITIALIZED" | (string & {});
  /** Output only. Reserved for future use. */
  satisfiesPzs?: boolean;
  /** Output only. Reserved for future use. */
  satisfiesPzi?: boolean;
}

export const GoogleCloudDocumentaiV1beta3Dataset: Schema.Schema<GoogleCloudDocumentaiV1beta3Dataset> = Schema.suspend(() => Schema.Struct({
  gcsManagedConfig: Schema.optional(GoogleCloudDocumentaiV1beta3DatasetGCSManagedConfig),
  documentWarehouseConfig: Schema.optional(GoogleCloudDocumentaiV1beta3DatasetDocumentWarehouseConfig),
  unmanagedDatasetConfig: Schema.optional(GoogleCloudDocumentaiV1beta3DatasetUnmanagedDatasetConfig),
  name: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  satisfiesPzs: Schema.optional(Schema.Boolean),
  satisfiesPzi: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3Dataset" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3Dataset>;

export interface GoogleCloudDocumentaiV1beta3DocumentIdGCSManagedDocumentId {
  /** Required. The Cloud Storage URI where the actual document is stored. */
  gcsUri?: string;
  /** Id of the document (indexed) managed by Content Warehouse. */
  cwDocId?: string;
}

export const GoogleCloudDocumentaiV1beta3DocumentIdGCSManagedDocumentId: Schema.Schema<GoogleCloudDocumentaiV1beta3DocumentIdGCSManagedDocumentId> = Schema.suspend(() => Schema.Struct({
  gcsUri: Schema.optional(Schema.String),
  cwDocId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3DocumentIdGCSManagedDocumentId" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3DocumentIdGCSManagedDocumentId>;

export interface GoogleCloudDocumentaiV1beta3DocumentIdUnmanagedDocumentId {
  /** Required. The id of the document. */
  docId?: string;
}

export const GoogleCloudDocumentaiV1beta3DocumentIdUnmanagedDocumentId: Schema.Schema<GoogleCloudDocumentaiV1beta3DocumentIdUnmanagedDocumentId> = Schema.suspend(() => Schema.Struct({
  docId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3DocumentIdUnmanagedDocumentId" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3DocumentIdUnmanagedDocumentId>;

export interface GoogleCloudDocumentaiV1beta3RevisionRef {
  /** Reads the revision by the predefined case. */
  revisionCase?: "REVISION_CASE_UNSPECIFIED" | "LATEST_HUMAN_REVIEW" | "LATEST_TIMESTAMP" | "BASE_OCR_REVISION" | (string & {});
  /** Reads the revision given by the id. */
  revisionId?: string;
  /** Reads the revision generated by the processor version. The format takes the full resource name of processor version. `projects/{project}/locations/{location}/processors/{processor}/processorVersions/{processorVersion}` */
  latestProcessorVersion?: string;
}

export const GoogleCloudDocumentaiV1beta3RevisionRef: Schema.Schema<GoogleCloudDocumentaiV1beta3RevisionRef> = Schema.suspend(() => Schema.Struct({
  revisionCase: Schema.optional(Schema.String),
  revisionId: Schema.optional(Schema.String),
  latestProcessorVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3RevisionRef" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3RevisionRef>;

export interface GoogleCloudDocumentaiV1beta3DocumentId {
  /** A document id within user-managed Cloud Storage. */
  gcsManagedDocId?: GoogleCloudDocumentaiV1beta3DocumentIdGCSManagedDocumentId;
  /** A document id within unmanaged dataset. */
  unmanagedDocId?: GoogleCloudDocumentaiV1beta3DocumentIdUnmanagedDocumentId;
  /** Points to a specific revision of the document if set. */
  revisionRef?: GoogleCloudDocumentaiV1beta3RevisionRef;
}

export const GoogleCloudDocumentaiV1beta3DocumentId: Schema.Schema<GoogleCloudDocumentaiV1beta3DocumentId> = Schema.suspend(() => Schema.Struct({
  gcsManagedDocId: Schema.optional(GoogleCloudDocumentaiV1beta3DocumentIdGCSManagedDocumentId),
  unmanagedDocId: Schema.optional(GoogleCloudDocumentaiV1beta3DocumentIdUnmanagedDocumentId),
  revisionRef: Schema.optional(GoogleCloudDocumentaiV1beta3RevisionRef),
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3DocumentId" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3DocumentId>;

export interface GoogleCloudDocumentaiV1beta3ImportDocumentsMetadataIndividualImportStatus {
  /** The source Cloud Storage URI of the document. */
  inputGcsSource?: string;
  /** The status of the importing of the document. */
  status?: GoogleRpcStatus;
  /** The document id of imported document if it was successful, otherwise empty. */
  outputDocumentId?: GoogleCloudDocumentaiV1beta3DocumentId;
}

export const GoogleCloudDocumentaiV1beta3ImportDocumentsMetadataIndividualImportStatus: Schema.Schema<GoogleCloudDocumentaiV1beta3ImportDocumentsMetadataIndividualImportStatus> = Schema.suspend(() => Schema.Struct({
  inputGcsSource: Schema.optional(Schema.String),
  status: Schema.optional(GoogleRpcStatus),
  outputDocumentId: Schema.optional(GoogleCloudDocumentaiV1beta3DocumentId),
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3ImportDocumentsMetadataIndividualImportStatus" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3ImportDocumentsMetadataIndividualImportStatus>;

export interface GoogleCloudDocumentaiV1beta3ImportDocumentsMetadataImportConfigValidationResult {
  /** The source Cloud Storage URI specified in the import config. */
  inputGcsSource?: string;
  /** The validation status of import config. */
  status?: GoogleRpcStatus;
}

export const GoogleCloudDocumentaiV1beta3ImportDocumentsMetadataImportConfigValidationResult: Schema.Schema<GoogleCloudDocumentaiV1beta3ImportDocumentsMetadataImportConfigValidationResult> = Schema.suspend(() => Schema.Struct({
  inputGcsSource: Schema.optional(Schema.String),
  status: Schema.optional(GoogleRpcStatus),
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3ImportDocumentsMetadataImportConfigValidationResult" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3ImportDocumentsMetadataImportConfigValidationResult>;

export interface GoogleCloudDocumentaiV1beta3ImportDocumentsMetadata {
  /** The basic metadata of the long-running operation. */
  commonMetadata?: GoogleCloudDocumentaiV1beta3CommonOperationMetadata;
  /** The list of response details of each document. */
  individualImportStatuses?: Array<GoogleCloudDocumentaiV1beta3ImportDocumentsMetadataIndividualImportStatus>;
  /** Validation statuses of the batch documents import config. */
  importConfigValidationResults?: Array<GoogleCloudDocumentaiV1beta3ImportDocumentsMetadataImportConfigValidationResult>;
  /** Total number of the documents that are qualified for importing. */
  totalDocumentCount?: number;
}

export const GoogleCloudDocumentaiV1beta3ImportDocumentsMetadata: Schema.Schema<GoogleCloudDocumentaiV1beta3ImportDocumentsMetadata> = Schema.suspend(() => Schema.Struct({
  commonMetadata: Schema.optional(GoogleCloudDocumentaiV1beta3CommonOperationMetadata),
  individualImportStatuses: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1beta3ImportDocumentsMetadataIndividualImportStatus)),
  importConfigValidationResults: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1beta3ImportDocumentsMetadataImportConfigValidationResult)),
  totalDocumentCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3ImportDocumentsMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3ImportDocumentsMetadata>;

export interface GoogleCloudDocumentaiV1beta3ImportDocumentsResponse {
}

export const GoogleCloudDocumentaiV1beta3ImportDocumentsResponse: Schema.Schema<GoogleCloudDocumentaiV1beta3ImportDocumentsResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3ImportDocumentsResponse" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3ImportDocumentsResponse>;

export interface GoogleCloudDocumentaiV1beta3BatchDeleteDocumentsMetadataIndividualBatchDeleteStatus {
  /** The document id of the document. */
  documentId?: GoogleCloudDocumentaiV1beta3DocumentId;
  /** The status of deleting the document in storage. */
  status?: GoogleRpcStatus;
}

export const GoogleCloudDocumentaiV1beta3BatchDeleteDocumentsMetadataIndividualBatchDeleteStatus: Schema.Schema<GoogleCloudDocumentaiV1beta3BatchDeleteDocumentsMetadataIndividualBatchDeleteStatus> = Schema.suspend(() => Schema.Struct({
  documentId: Schema.optional(GoogleCloudDocumentaiV1beta3DocumentId),
  status: Schema.optional(GoogleRpcStatus),
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3BatchDeleteDocumentsMetadataIndividualBatchDeleteStatus" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3BatchDeleteDocumentsMetadataIndividualBatchDeleteStatus>;

export interface GoogleCloudDocumentaiV1beta3BatchDeleteDocumentsMetadata {
  /** The basic metadata of the long-running operation. */
  commonMetadata?: GoogleCloudDocumentaiV1beta3CommonOperationMetadata;
  /** The list of response details of each document. */
  individualBatchDeleteStatuses?: Array<GoogleCloudDocumentaiV1beta3BatchDeleteDocumentsMetadataIndividualBatchDeleteStatus>;
  /** Total number of documents deleting from dataset. */
  totalDocumentCount?: number;
  /** Total number of documents that failed to be deleted in storage. */
  errorDocumentCount?: number;
}

export const GoogleCloudDocumentaiV1beta3BatchDeleteDocumentsMetadata: Schema.Schema<GoogleCloudDocumentaiV1beta3BatchDeleteDocumentsMetadata> = Schema.suspend(() => Schema.Struct({
  commonMetadata: Schema.optional(GoogleCloudDocumentaiV1beta3CommonOperationMetadata),
  individualBatchDeleteStatuses: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1beta3BatchDeleteDocumentsMetadataIndividualBatchDeleteStatus)),
  totalDocumentCount: Schema.optional(Schema.Number),
  errorDocumentCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3BatchDeleteDocumentsMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3BatchDeleteDocumentsMetadata>;

export interface GoogleCloudDocumentaiV1beta3BatchDeleteDocumentsResponse {
}

export const GoogleCloudDocumentaiV1beta3BatchDeleteDocumentsResponse: Schema.Schema<GoogleCloudDocumentaiV1beta3BatchDeleteDocumentsResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDocumentaiV1beta3BatchDeleteDocumentsResponse" }) as any as Schema.Schema<GoogleCloudDocumentaiV1beta3BatchDeleteDocumentsResponse>;

export interface GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata {
  /** The state of the operation. */
  state?: "STATE_UNSPECIFIED" | "RUNNING" | "CANCELLING" | "SUCCEEDED" | "FAILED" | "CANCELLED" | (string & {});
  /** A message providing more details about the current state of processing. */
  stateMessage?: string;
  /** A related resource to this operation. */
  resource?: string;
  /** The creation time of the operation. */
  createTime?: string;
  /** The last update time of the operation. */
  updateTime?: string;
}

export const GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata: Schema.Schema<GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  stateMessage: Schema.optional(Schema.String),
  resource: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata>;

export interface GoogleCloudDocumentaiUiv1beta3DeleteProcessorMetadata {
  /** The basic metadata of the long-running operation. */
  commonMetadata?: GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata;
}

export const GoogleCloudDocumentaiUiv1beta3DeleteProcessorMetadata: Schema.Schema<GoogleCloudDocumentaiUiv1beta3DeleteProcessorMetadata> = Schema.suspend(() => Schema.Struct({
  commonMetadata: Schema.optional(GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3DeleteProcessorMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3DeleteProcessorMetadata>;

export interface GoogleCloudDocumentaiUiv1beta3EnableProcessorResponse {
}

export const GoogleCloudDocumentaiUiv1beta3EnableProcessorResponse: Schema.Schema<GoogleCloudDocumentaiUiv1beta3EnableProcessorResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3EnableProcessorResponse" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3EnableProcessorResponse>;

export interface GoogleCloudDocumentaiUiv1beta3EnableProcessorMetadata {
  /** The basic metadata of the long-running operation. */
  commonMetadata?: GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata;
}

export const GoogleCloudDocumentaiUiv1beta3EnableProcessorMetadata: Schema.Schema<GoogleCloudDocumentaiUiv1beta3EnableProcessorMetadata> = Schema.suspend(() => Schema.Struct({
  commonMetadata: Schema.optional(GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3EnableProcessorMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3EnableProcessorMetadata>;

export interface GoogleCloudDocumentaiUiv1beta3DisableProcessorResponse {
}

export const GoogleCloudDocumentaiUiv1beta3DisableProcessorResponse: Schema.Schema<GoogleCloudDocumentaiUiv1beta3DisableProcessorResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3DisableProcessorResponse" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3DisableProcessorResponse>;

export interface GoogleCloudDocumentaiUiv1beta3DisableProcessorMetadata {
  /** The basic metadata of the long-running operation. */
  commonMetadata?: GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata;
}

export const GoogleCloudDocumentaiUiv1beta3DisableProcessorMetadata: Schema.Schema<GoogleCloudDocumentaiUiv1beta3DisableProcessorMetadata> = Schema.suspend(() => Schema.Struct({
  commonMetadata: Schema.optional(GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3DisableProcessorMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3DisableProcessorMetadata>;

export interface GoogleCloudDocumentaiUiv1beta3ProcessorVersionAlias {
  /** The alias in the form of `processor_version` resource name. */
  alias?: string;
  /** The resource name of aliased processor version. */
  processorVersion?: string;
}

export const GoogleCloudDocumentaiUiv1beta3ProcessorVersionAlias: Schema.Schema<GoogleCloudDocumentaiUiv1beta3ProcessorVersionAlias> = Schema.suspend(() => Schema.Struct({
  alias: Schema.optional(Schema.String),
  processorVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3ProcessorVersionAlias" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3ProcessorVersionAlias>;

export interface GoogleCloudDocumentaiUiv1beta3Processor {
  /** Output only. Immutable. The resource name of the processor. Format: `projects/{project}/locations/{location}/processors/{processor}` */
  name?: string;
  /** The processor type, such as: `OCR_PROCESSOR`, `INVOICE_PROCESSOR`. To get a list of processor types, see FetchProcessorTypes. */
  type?: string;
  /** The display name of the processor. */
  displayName?: string;
  /** Output only. The state of the processor. */
  state?: "STATE_UNSPECIFIED" | "ENABLED" | "DISABLED" | "ENABLING" | "DISABLING" | "CREATING" | "FAILED" | "DELETING" | (string & {});
  /** The default processor version. */
  defaultProcessorVersion?: string;
  /** Output only. The processor version aliases. */
  processorVersionAliases?: Array<GoogleCloudDocumentaiUiv1beta3ProcessorVersionAlias>;
  /** Output only. Immutable. The http endpoint that can be called to invoke processing. */
  processEndpoint?: string;
  /** Output only. The time the processor was created. */
  createTime?: string;
  /** The [KMS key](https://cloud.google.com/security-key-management) used for encryption and decryption in CMEK scenarios. */
  kmsKeyName?: string;
  /** Output only. Reserved for future use. */
  satisfiesPzs?: boolean;
  /** Output only. Reserved for future use. */
  satisfiesPzi?: boolean;
  /** Optional. SchemaVersion used by the Processor. It is the same as Processor's DatasetSchema.schema_version Format is `projects/{project}/locations/{location}/schemas/{schema}/schemaVersions/{schema_version} */
  activeSchemaVersion?: string;
}

export const GoogleCloudDocumentaiUiv1beta3Processor: Schema.Schema<GoogleCloudDocumentaiUiv1beta3Processor> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  defaultProcessorVersion: Schema.optional(Schema.String),
  processorVersionAliases: Schema.optional(Schema.Array(GoogleCloudDocumentaiUiv1beta3ProcessorVersionAlias)),
  processEndpoint: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  kmsKeyName: Schema.optional(Schema.String),
  satisfiesPzs: Schema.optional(Schema.Boolean),
  satisfiesPzi: Schema.optional(Schema.Boolean),
  activeSchemaVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3Processor" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3Processor>;

export interface GoogleCloudDocumentaiUiv1beta3UpdateProcessorVersionMetadata {
  /** The basic metadata for the long-running operation. */
  commonMetadata?: GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata;
}

export const GoogleCloudDocumentaiUiv1beta3UpdateProcessorVersionMetadata: Schema.Schema<GoogleCloudDocumentaiUiv1beta3UpdateProcessorVersionMetadata> = Schema.suspend(() => Schema.Struct({
  commonMetadata: Schema.optional(GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3UpdateProcessorVersionMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3UpdateProcessorVersionMetadata>;

export interface GoogleCloudDocumentaiUiv1beta3SchemaEntityType {
  /** Name of the type. It must satisfy the following constraints: 1. Must be unique within the set of same level types (with case-insensitive match). 2. Maximum 64 characters. 3. Must start with a letter. 4. Allowed characters: ASCII letters [a-zA-Z], ASCII digits [0-9], or one of the following punctuation characters: * underscore '_' (recommended) * hyphen '-' (allowed, not recommended) * colon ':' (allowed, not recommended) NOTE: Whitespace characters are not allowed. 5. Cannot end with a punctuation character. 6. Cannot contain the following restricted strings: "google", "DocumentAI" (case-insensitive match). 7. A slash character '/' is reserved as a separator in flattened representations of nested entity types (e.g., "line_item/amount") in which case each part (e.g., "line_item", "amount") must comply with the rules defined above. We recommend using the snake case ("snake_case") in entity type names. */
  type?: string;
  baseType?: string;
  /** Occurrence type limits the number of times an entity type appears in the document. */
  occurrenceType?: "OCCURRENCE_TYPE_UNSPECIFIED" | "OPTIONAL_ONCE" | "OPTIONAL_MULTIPLE" | "REQUIRED_ONCE" | "REQUIRED_MULTIPLE" | (string & {});
  /** Description of the entity type. */
  description?: string;
  /** Describing the nested structure of an entity. An EntityType may consist of several other EntityTypes. For example, in a document there can be an EntityType `ID`, which consists of EntityType `name` and `address`, with corresponding attributes, such as TEXT for both types and ONCE for occurrence types. */
  properties?: Array<GoogleCloudDocumentaiUiv1beta3SchemaEntityType>;
  /** Source of this entity type. */
  source?: "SOURCE_UNSPECIFIED" | "PREDEFINED" | "USER_INPUT" | (string & {});
  /** If specified, lists all the possible values for this entity. */
  enumValues?: Array<string>;
  /** If the entity type is hidden in the schema. This provides the functionality to temporally "disable" an entity without deleting it. */
  hide?: boolean;
  /** Specifies how the entity's value is obtained. */
  method?: "METHOD_UNSPECIFIED" | "EXTRACT" | "DERIVE" | "RELAXED_EXTRACT" | (string & {});
}

export const GoogleCloudDocumentaiUiv1beta3SchemaEntityType: Schema.Schema<GoogleCloudDocumentaiUiv1beta3SchemaEntityType> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  baseType: Schema.optional(Schema.String),
  occurrenceType: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  properties: Schema.optional(Schema.Array(GoogleCloudDocumentaiUiv1beta3SchemaEntityType)),
  source: Schema.optional(Schema.String),
  enumValues: Schema.optional(Schema.Array(Schema.String)),
  hide: Schema.optional(Schema.Boolean),
  method: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3SchemaEntityType" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3SchemaEntityType>;

export interface GoogleCloudDocumentaiUiv1beta3Schema {
  /** Display name to show users. */
  displayName?: string;
  /** Description of the schema. */
  description?: string;
  /** Entity types of the schema. */
  entityTypes?: Array<GoogleCloudDocumentaiUiv1beta3SchemaEntityType>;
}

export const GoogleCloudDocumentaiUiv1beta3Schema: Schema.Schema<GoogleCloudDocumentaiUiv1beta3Schema> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  entityTypes: Schema.optional(Schema.Array(GoogleCloudDocumentaiUiv1beta3SchemaEntityType)),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3Schema" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3Schema>;

export interface GoogleCloudDocumentaiUiv1beta3DocumentSchemaEntityTypeEnumValues {
  /** The individual values that this enum values type can include. */
  values?: Array<string>;
}

export const GoogleCloudDocumentaiUiv1beta3DocumentSchemaEntityTypeEnumValues: Schema.Schema<GoogleCloudDocumentaiUiv1beta3DocumentSchemaEntityTypeEnumValues> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3DocumentSchemaEntityTypeEnumValues" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3DocumentSchemaEntityTypeEnumValues>;

export interface GoogleCloudDocumentaiUiv1beta3HumanReviewValidationMetadata {
  /** Whether to enable human review validation. */
  enableValidation?: boolean;
  /** The confidence threshold if human review validation is enabled. */
  confidenceThreshold?: number;
}

export const GoogleCloudDocumentaiUiv1beta3HumanReviewValidationMetadata: Schema.Schema<GoogleCloudDocumentaiUiv1beta3HumanReviewValidationMetadata> = Schema.suspend(() => Schema.Struct({
  enableValidation: Schema.optional(Schema.Boolean),
  confidenceThreshold: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3HumanReviewValidationMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3HumanReviewValidationMetadata>;

export interface GoogleCloudDocumentaiUiv1beta3HumanReviewLabelingMetadata {
  /** Whether to enable normalization editing. */
  enableNormalizationEditing?: boolean;
}

export const GoogleCloudDocumentaiUiv1beta3HumanReviewLabelingMetadata: Schema.Schema<GoogleCloudDocumentaiUiv1beta3HumanReviewLabelingMetadata> = Schema.suspend(() => Schema.Struct({
  enableNormalizationEditing: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3HumanReviewLabelingMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3HumanReviewLabelingMetadata>;

export interface GoogleCloudDocumentaiUiv1beta3SchemaEditabilityMetadata {
  /** Explicit flag that controls whether the label is editable. */
  editable?: boolean;
  /** Full resource name of processor versions that contain this label. e.g. `projects/{project}/locations/{location}/processors/{processor}/processorVersions/{processorVersion}` */
  processorVersions?: Array<string>;
}

export const GoogleCloudDocumentaiUiv1beta3SchemaEditabilityMetadata: Schema.Schema<GoogleCloudDocumentaiUiv1beta3SchemaEditabilityMetadata> = Schema.suspend(() => Schema.Struct({
  editable: Schema.optional(Schema.Boolean),
  processorVersions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3SchemaEditabilityMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3SchemaEditabilityMetadata>;

export interface GoogleCloudDocumentaiUiv1beta3SchemaInferenceMetadata {
  /** True if is inferred by schema inference. */
  inferred?: boolean;
}

export const GoogleCloudDocumentaiUiv1beta3SchemaInferenceMetadata: Schema.Schema<GoogleCloudDocumentaiUiv1beta3SchemaInferenceMetadata> = Schema.suspend(() => Schema.Struct({
  inferred: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3SchemaInferenceMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3SchemaInferenceMetadata>;

export interface GoogleCloudDocumentaiUiv1beta3FieldExtractionMetadataEntityQuery {
  /** The original entity query inputed by the user. */
  userEntityQuery?: string;
}

export const GoogleCloudDocumentaiUiv1beta3FieldExtractionMetadataEntityQuery: Schema.Schema<GoogleCloudDocumentaiUiv1beta3FieldExtractionMetadataEntityQuery> = Schema.suspend(() => Schema.Struct({
  userEntityQuery: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3FieldExtractionMetadataEntityQuery" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3FieldExtractionMetadataEntityQuery>;

export interface GoogleCloudDocumentaiUiv1beta3SummaryOptions {
  /** How long the summary should be. */
  length?: "LENGTH_UNSPECIFIED" | "BRIEF" | "MODERATE" | "COMPREHENSIVE" | (string & {});
  /** The format the summary should be in. */
  format?: "FORMAT_UNSPECIFIED" | "PARAGRAPH" | "BULLETS" | (string & {});
}

export const GoogleCloudDocumentaiUiv1beta3SummaryOptions: Schema.Schema<GoogleCloudDocumentaiUiv1beta3SummaryOptions> = Schema.suspend(() => Schema.Struct({
  length: Schema.optional(Schema.String),
  format: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3SummaryOptions" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3SummaryOptions>;

export interface GoogleCloudDocumentaiUiv1beta3FieldExtractionMetadata {
  /** Entity query config. */
  entityQuery?: GoogleCloudDocumentaiUiv1beta3FieldExtractionMetadataEntityQuery;
  /** Summary options config. */
  summaryOptions?: GoogleCloudDocumentaiUiv1beta3SummaryOptions;
}

export const GoogleCloudDocumentaiUiv1beta3FieldExtractionMetadata: Schema.Schema<GoogleCloudDocumentaiUiv1beta3FieldExtractionMetadata> = Schema.suspend(() => Schema.Struct({
  entityQuery: Schema.optional(GoogleCloudDocumentaiUiv1beta3FieldExtractionMetadataEntityQuery),
  summaryOptions: Schema.optional(GoogleCloudDocumentaiUiv1beta3SummaryOptions),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3FieldExtractionMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3FieldExtractionMetadata>;

export interface GoogleCloudDocumentaiUiv1beta3FieldTierMetadata {
  /** Integer that indicates the tier of a property. e.g. Invoice has entities that are classified as tier 1 which is the most important, while tier 2 and tier 3 less so. This attribute can be used to filter schema attributes before running eval. e.g. compute F1 score for only tier 1 entities. If not present this attribute should be inferred as 1. */
  tierLevel?: number;
}

export const GoogleCloudDocumentaiUiv1beta3FieldTierMetadata: Schema.Schema<GoogleCloudDocumentaiUiv1beta3FieldTierMetadata> = Schema.suspend(() => Schema.Struct({
  tierLevel: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3FieldTierMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3FieldTierMetadata>;

export interface GoogleCloudDocumentaiUiv1beta3PropertyMetadata {
  /** Whether the property should be considered as "inactive". */
  inactive?: boolean;
  /** Human review validation config on the property. */
  humanReviewMetadata?: GoogleCloudDocumentaiUiv1beta3HumanReviewValidationMetadata;
  /** Human review labeling config on the property. */
  humanReviewLabelingMetadata?: GoogleCloudDocumentaiUiv1beta3HumanReviewLabelingMetadata;
  /** Schema editability metadata on the property. */
  schemaEditabilityMetadata?: GoogleCloudDocumentaiUiv1beta3SchemaEditabilityMetadata;
  /** Schema inference metadata on the property. */
  schemaInferenceMetadata?: GoogleCloudDocumentaiUiv1beta3SchemaInferenceMetadata;
  /** Field extraction metadata on the property. */
  fieldExtractionMetadata?: GoogleCloudDocumentaiUiv1beta3FieldExtractionMetadata;
  /** Field tier metadata on the property */
  fieldTierMetadata?: GoogleCloudDocumentaiUiv1beta3FieldTierMetadata;
}

export const GoogleCloudDocumentaiUiv1beta3PropertyMetadata: Schema.Schema<GoogleCloudDocumentaiUiv1beta3PropertyMetadata> = Schema.suspend(() => Schema.Struct({
  inactive: Schema.optional(Schema.Boolean),
  humanReviewMetadata: Schema.optional(GoogleCloudDocumentaiUiv1beta3HumanReviewValidationMetadata),
  humanReviewLabelingMetadata: Schema.optional(GoogleCloudDocumentaiUiv1beta3HumanReviewLabelingMetadata),
  schemaEditabilityMetadata: Schema.optional(GoogleCloudDocumentaiUiv1beta3SchemaEditabilityMetadata),
  schemaInferenceMetadata: Schema.optional(GoogleCloudDocumentaiUiv1beta3SchemaInferenceMetadata),
  fieldExtractionMetadata: Schema.optional(GoogleCloudDocumentaiUiv1beta3FieldExtractionMetadata),
  fieldTierMetadata: Schema.optional(GoogleCloudDocumentaiUiv1beta3FieldTierMetadata),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3PropertyMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3PropertyMetadata>;

export interface GoogleCloudDocumentaiUiv1beta3DocumentSchemaEntityTypeProperty {
  /** The name of the property. Follows the same guidelines as the EntityType name. */
  name?: string;
  /** The description of the property. Could be used to provide more information about the property for model calls. */
  description?: string;
  /** User defined name for the property. */
  displayName?: string;
  /** A reference to the value type of the property. This type is subject to the same conventions as the `Entity.base_types` field. */
  valueType?: string;
  /** Occurrence type limits the number of instances an entity type appears in the document. */
  occurrenceType?: "OCCURRENCE_TYPE_UNSPECIFIED" | "OPTIONAL_ONCE" | "OPTIONAL_MULTIPLE" | "REQUIRED_ONCE" | "REQUIRED_MULTIPLE" | (string & {});
  /** Specifies how the entity's value is obtained. */
  method?: "METHOD_UNSPECIFIED" | "EXTRACT" | "DERIVE" | "RELAXED_EXTRACT" | (string & {});
  /** Any additional metadata about the property can be added here. */
  propertyMetadata?: GoogleCloudDocumentaiUiv1beta3PropertyMetadata;
}

export const GoogleCloudDocumentaiUiv1beta3DocumentSchemaEntityTypeProperty: Schema.Schema<GoogleCloudDocumentaiUiv1beta3DocumentSchemaEntityTypeProperty> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  valueType: Schema.optional(Schema.String),
  occurrenceType: Schema.optional(Schema.String),
  method: Schema.optional(Schema.String),
  propertyMetadata: Schema.optional(GoogleCloudDocumentaiUiv1beta3PropertyMetadata),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3DocumentSchemaEntityTypeProperty" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3DocumentSchemaEntityTypeProperty>;

export interface GoogleCloudDocumentaiUiv1beta3EntityTypeMetadata {
  /** Whether the entity type should be considered inactive. */
  inactive?: boolean;
  /** Human review config on the entity. */
  humanReviewMetadata?: GoogleCloudDocumentaiUiv1beta3HumanReviewValidationMetadata;
  /** Human review labeling config on the entity. */
  humanReviewLabelingMetadata?: GoogleCloudDocumentaiUiv1beta3HumanReviewLabelingMetadata;
  /** Schema editability metadata on the entity. */
  schemaEditabilityMetadata?: GoogleCloudDocumentaiUiv1beta3SchemaEditabilityMetadata;
  /** Schema inference metadata on the entity. */
  schemaInferenceMetadata?: GoogleCloudDocumentaiUiv1beta3SchemaInferenceMetadata;
  /** Field tier metadata on the property */
  fieldTierMetadata?: GoogleCloudDocumentaiUiv1beta3FieldTierMetadata;
}

export const GoogleCloudDocumentaiUiv1beta3EntityTypeMetadata: Schema.Schema<GoogleCloudDocumentaiUiv1beta3EntityTypeMetadata> = Schema.suspend(() => Schema.Struct({
  inactive: Schema.optional(Schema.Boolean),
  humanReviewMetadata: Schema.optional(GoogleCloudDocumentaiUiv1beta3HumanReviewValidationMetadata),
  humanReviewLabelingMetadata: Schema.optional(GoogleCloudDocumentaiUiv1beta3HumanReviewLabelingMetadata),
  schemaEditabilityMetadata: Schema.optional(GoogleCloudDocumentaiUiv1beta3SchemaEditabilityMetadata),
  schemaInferenceMetadata: Schema.optional(GoogleCloudDocumentaiUiv1beta3SchemaInferenceMetadata),
  fieldTierMetadata: Schema.optional(GoogleCloudDocumentaiUiv1beta3FieldTierMetadata),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3EntityTypeMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3EntityTypeMetadata>;

export interface GoogleCloudDocumentaiUiv1beta3DocumentSchemaEntityType {
  /** If specified, lists all the possible values for this entity. This should not be more than a handful of values. If the number of values is >10 or could change frequently, use the `EntityType.value_ontology` field and specify a list of all possible values in a value ontology file. */
  enumValues?: GoogleCloudDocumentaiUiv1beta3DocumentSchemaEntityTypeEnumValues;
  /** User defined name for the type. */
  displayName?: string;
  /** Name of the type. It must be unique within the schema file and cannot be a "Common Type". The following naming conventions are used: - Use `snake_casing`. - Name matching is case-sensitive. - Maximum 64 characters. - Must start with a letter. - Allowed characters: ASCII letters `[a-z0-9_-]`. (For backward compatibility, internal infrastructure and tooling can handle any ASCII character.) - The `/` is sometimes used to denote a property of a type. For example `line_item/amount`. This convention is deprecated, but will still be honored for backward compatibility. */
  name?: string;
  /** The description of the entity type. Could be used to provide more information about the entity type for model calls. */
  description?: string;
  /** The entity type that this type is derived from. For now, one and only one should be set. */
  baseTypes?: Array<string>;
  /** Description the nested structure, or composition of an entity. */
  properties?: Array<GoogleCloudDocumentaiUiv1beta3DocumentSchemaEntityTypeProperty>;
  /** Metadata for the entity type. */
  entityTypeMetadata?: GoogleCloudDocumentaiUiv1beta3EntityTypeMetadata;
}

export const GoogleCloudDocumentaiUiv1beta3DocumentSchemaEntityType: Schema.Schema<GoogleCloudDocumentaiUiv1beta3DocumentSchemaEntityType> = Schema.suspend(() => Schema.Struct({
  enumValues: Schema.optional(GoogleCloudDocumentaiUiv1beta3DocumentSchemaEntityTypeEnumValues),
  displayName: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  baseTypes: Schema.optional(Schema.Array(Schema.String)),
  properties: Schema.optional(Schema.Array(GoogleCloudDocumentaiUiv1beta3DocumentSchemaEntityTypeProperty)),
  entityTypeMetadata: Schema.optional(GoogleCloudDocumentaiUiv1beta3EntityTypeMetadata),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3DocumentSchemaEntityType" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3DocumentSchemaEntityType>;

export interface GoogleCloudDocumentaiUiv1beta3DocumentSchemaMetadata {
  /** If true, a `document` entity type can be applied to subdocument (splitting). Otherwise, it can only be applied to the entire document (classification). */
  documentSplitter?: boolean;
  /** If true, on a given page, there can be multiple `document` annotations covering it. */
  documentAllowMultipleLabels?: boolean;
  /** If set, all the nested entities must be prefixed with the parents. */
  prefixedNamingOnProperties?: boolean;
  /** If set, this will skip the naming format validation in the schema. So the string values in `DocumentSchema.EntityType.name` and `DocumentSchema.EntityType.Property.name` will not be checked. */
  skipNamingValidation?: boolean;
}

export const GoogleCloudDocumentaiUiv1beta3DocumentSchemaMetadata: Schema.Schema<GoogleCloudDocumentaiUiv1beta3DocumentSchemaMetadata> = Schema.suspend(() => Schema.Struct({
  documentSplitter: Schema.optional(Schema.Boolean),
  documentAllowMultipleLabels: Schema.optional(Schema.Boolean),
  prefixedNamingOnProperties: Schema.optional(Schema.Boolean),
  skipNamingValidation: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3DocumentSchemaMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3DocumentSchemaMetadata>;

export interface GoogleCloudDocumentaiUiv1beta3DocumentSchema {
  /** Display name to show users. */
  displayName?: string;
  /** Description of the schema. */
  description?: string;
  /** Entity types of the schema. */
  entityTypes?: Array<GoogleCloudDocumentaiUiv1beta3DocumentSchemaEntityType>;
  /** Metadata of the schema. */
  metadata?: GoogleCloudDocumentaiUiv1beta3DocumentSchemaMetadata;
  /** Optional. Document level prompt provided by the user. This custom text is injected into the AI model's prompt to provide extra, document-wide guidance for processing. */
  documentPrompt?: string;
}

export const GoogleCloudDocumentaiUiv1beta3DocumentSchema: Schema.Schema<GoogleCloudDocumentaiUiv1beta3DocumentSchema> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  entityTypes: Schema.optional(Schema.Array(GoogleCloudDocumentaiUiv1beta3DocumentSchemaEntityType)),
  metadata: Schema.optional(GoogleCloudDocumentaiUiv1beta3DocumentSchemaMetadata),
  documentPrompt: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3DocumentSchema" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3DocumentSchema>;

export interface GoogleCloudDocumentaiUiv1beta3EvaluationMetrics {
  /** The calculated precision. */
  precision?: number;
  /** The calculated recall. */
  recall?: number;
  /** The calculated F1 score. */
  f1Score?: number;
  /** The amount of occurrences in predicted documents. */
  predictedOccurrencesCount?: number;
  /** The amount of occurrences in ground truth documents. */
  groundTruthOccurrencesCount?: number;
  /** The amount of documents with a predicted occurrence. */
  predictedDocumentCount?: number;
  /** The amount of documents with a ground truth occurrence. */
  groundTruthDocumentCount?: number;
  /** The amount of true positives. */
  truePositivesCount?: number;
  /** The amount of false positives. */
  falsePositivesCount?: number;
  /** The amount of false negatives. */
  falseNegativesCount?: number;
  /** The amount of documents that had an occurrence of this label. */
  totalDocumentsCount?: number;
}

export const GoogleCloudDocumentaiUiv1beta3EvaluationMetrics: Schema.Schema<GoogleCloudDocumentaiUiv1beta3EvaluationMetrics> = Schema.suspend(() => Schema.Struct({
  precision: Schema.optional(Schema.Number),
  recall: Schema.optional(Schema.Number),
  f1Score: Schema.optional(Schema.Number),
  predictedOccurrencesCount: Schema.optional(Schema.Number),
  groundTruthOccurrencesCount: Schema.optional(Schema.Number),
  predictedDocumentCount: Schema.optional(Schema.Number),
  groundTruthDocumentCount: Schema.optional(Schema.Number),
  truePositivesCount: Schema.optional(Schema.Number),
  falsePositivesCount: Schema.optional(Schema.Number),
  falseNegativesCount: Schema.optional(Schema.Number),
  totalDocumentsCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3EvaluationMetrics" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3EvaluationMetrics>;

export interface GoogleCloudDocumentaiUiv1beta3EvaluationReference {
  /** The resource name of the Long Running Operation for the evaluation. */
  operation?: string;
  /** The resource name of the evaluation. */
  evaluation?: string;
  /** An aggregate of the statistics for the evaluation with fuzzy matching on. */
  aggregateMetrics?: GoogleCloudDocumentaiUiv1beta3EvaluationMetrics;
  /** An aggregate of the statistics for the evaluation with fuzzy matching off. */
  aggregateMetricsExact?: GoogleCloudDocumentaiUiv1beta3EvaluationMetrics;
}

export const GoogleCloudDocumentaiUiv1beta3EvaluationReference: Schema.Schema<GoogleCloudDocumentaiUiv1beta3EvaluationReference> = Schema.suspend(() => Schema.Struct({
  operation: Schema.optional(Schema.String),
  evaluation: Schema.optional(Schema.String),
  aggregateMetrics: Schema.optional(GoogleCloudDocumentaiUiv1beta3EvaluationMetrics),
  aggregateMetricsExact: Schema.optional(GoogleCloudDocumentaiUiv1beta3EvaluationMetrics),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3EvaluationReference" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3EvaluationReference>;

export interface GoogleCloudDocumentaiUiv1beta3ProcessorVersionDeprecationInfo {
  /** The time at which this processor version will be deprecated. */
  deprecationTime?: string;
  /** If set, the processor version that will be used as a replacement. */
  replacementProcessorVersion?: string;
}

export const GoogleCloudDocumentaiUiv1beta3ProcessorVersionDeprecationInfo: Schema.Schema<GoogleCloudDocumentaiUiv1beta3ProcessorVersionDeprecationInfo> = Schema.suspend(() => Schema.Struct({
  deprecationTime: Schema.optional(Schema.String),
  replacementProcessorVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3ProcessorVersionDeprecationInfo" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3ProcessorVersionDeprecationInfo>;

export interface GoogleCloudDocumentaiUiv1beta3ProcessorVersionGenAiModelInfoFoundationGenAiModelInfo {
  /** Whether fine tuning is allowed for this base processor version. */
  finetuningAllowed?: boolean;
  /** The minimum number of labeled documents in the training dataset required for fine tuning. */
  minTrainLabeledDocuments?: number;
}

export const GoogleCloudDocumentaiUiv1beta3ProcessorVersionGenAiModelInfoFoundationGenAiModelInfo: Schema.Schema<GoogleCloudDocumentaiUiv1beta3ProcessorVersionGenAiModelInfoFoundationGenAiModelInfo> = Schema.suspend(() => Schema.Struct({
  finetuningAllowed: Schema.optional(Schema.Boolean),
  minTrainLabeledDocuments: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3ProcessorVersionGenAiModelInfoFoundationGenAiModelInfo" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3ProcessorVersionGenAiModelInfoFoundationGenAiModelInfo>;

export interface GoogleCloudDocumentaiUiv1beta3ProcessorVersionGenAiModelInfoCustomGenAiModelInfo {
  /** The type of custom model created by the user. */
  customModelType?: "CUSTOM_MODEL_TYPE_UNSPECIFIED" | "VERSIONED_FOUNDATION" | "FINE_TUNED" | (string & {});
  /** The base processor version ID for the custom model. */
  baseProcessorVersionId?: string;
}

export const GoogleCloudDocumentaiUiv1beta3ProcessorVersionGenAiModelInfoCustomGenAiModelInfo: Schema.Schema<GoogleCloudDocumentaiUiv1beta3ProcessorVersionGenAiModelInfoCustomGenAiModelInfo> = Schema.suspend(() => Schema.Struct({
  customModelType: Schema.optional(Schema.String),
  baseProcessorVersionId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3ProcessorVersionGenAiModelInfoCustomGenAiModelInfo" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3ProcessorVersionGenAiModelInfoCustomGenAiModelInfo>;

export interface GoogleCloudDocumentaiUiv1beta3ProcessorVersionGenAiModelInfo {
  /** Information for a pretrained Google-managed foundation model. */
  foundationGenAiModelInfo?: GoogleCloudDocumentaiUiv1beta3ProcessorVersionGenAiModelInfoFoundationGenAiModelInfo;
  /** Information for a custom Generative AI model created by the user. */
  customGenAiModelInfo?: GoogleCloudDocumentaiUiv1beta3ProcessorVersionGenAiModelInfoCustomGenAiModelInfo;
}

export const GoogleCloudDocumentaiUiv1beta3ProcessorVersionGenAiModelInfo: Schema.Schema<GoogleCloudDocumentaiUiv1beta3ProcessorVersionGenAiModelInfo> = Schema.suspend(() => Schema.Struct({
  foundationGenAiModelInfo: Schema.optional(GoogleCloudDocumentaiUiv1beta3ProcessorVersionGenAiModelInfoFoundationGenAiModelInfo),
  customGenAiModelInfo: Schema.optional(GoogleCloudDocumentaiUiv1beta3ProcessorVersionGenAiModelInfoCustomGenAiModelInfo),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3ProcessorVersionGenAiModelInfo" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3ProcessorVersionGenAiModelInfo>;

export interface GoogleCloudDocumentaiUiv1beta3ProcessorVersion {
  /** Identifier. The resource name of the processor version. Format: `projects/{project}/locations/{location}/processors/{processor}/processorVersions/{processor_version}` */
  name?: string;
  /** The display name of the processor version. */
  displayName?: string;
  /** The schema of the processor version. Describes the output. */
  schema?: GoogleCloudDocumentaiUiv1beta3Schema;
  /** Output only. The schema of the processor version. Describes the output. */
  documentSchema?: GoogleCloudDocumentaiUiv1beta3DocumentSchema;
  /** Output only. The state of the processor version. */
  state?: "STATE_UNSPECIFIED" | "DEPLOYED" | "DEPLOYING" | "UNDEPLOYED" | "UNDEPLOYING" | "CREATING" | "DELETING" | "FAILED" | "IMPORTING" | (string & {});
  /** Output only. The time the processor version was created. */
  createTime?: string;
  /** Output only. The most recently invoked evaluation for the processor version. */
  latestEvaluation?: GoogleCloudDocumentaiUiv1beta3EvaluationReference;
  /** Output only. The KMS key name used for encryption. */
  kmsKeyName?: string;
  /** Output only. The KMS key version with which data is encrypted. */
  kmsKeyVersionName?: string;
  /** Output only. Denotes that this `ProcessorVersion` is managed by Google. */
  googleManaged?: boolean;
  /** Output only. Denotes that this `ProcessorVersion` can be deployed and undeployed. */
  deploymentAllowed?: boolean;
  /** Output only. If set, information about the eventual deprecation of this version. */
  deprecationInfo?: GoogleCloudDocumentaiUiv1beta3ProcessorVersionDeprecationInfo;
  /** Output only. The model type of this processor version. */
  modelType?: "MODEL_TYPE_UNSPECIFIED" | "MODEL_TYPE_GENERATIVE" | "MODEL_TYPE_CUSTOM" | (string & {});
  /** Output only. Reserved for future use. */
  satisfiesPzs?: boolean;
  /** Output only. Reserved for future use. */
  satisfiesPzi?: boolean;
  /** Output only. Information about Generative AI model-based processor versions. */
  genAiModelInfo?: GoogleCloudDocumentaiUiv1beta3ProcessorVersionGenAiModelInfo;
}

export const GoogleCloudDocumentaiUiv1beta3ProcessorVersion: Schema.Schema<GoogleCloudDocumentaiUiv1beta3ProcessorVersion> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  schema: Schema.optional(GoogleCloudDocumentaiUiv1beta3Schema),
  documentSchema: Schema.optional(GoogleCloudDocumentaiUiv1beta3DocumentSchema),
  state: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  latestEvaluation: Schema.optional(GoogleCloudDocumentaiUiv1beta3EvaluationReference),
  kmsKeyName: Schema.optional(Schema.String),
  kmsKeyVersionName: Schema.optional(Schema.String),
  googleManaged: Schema.optional(Schema.Boolean),
  deploymentAllowed: Schema.optional(Schema.Boolean),
  deprecationInfo: Schema.optional(GoogleCloudDocumentaiUiv1beta3ProcessorVersionDeprecationInfo),
  modelType: Schema.optional(Schema.String),
  satisfiesPzs: Schema.optional(Schema.Boolean),
  satisfiesPzi: Schema.optional(Schema.Boolean),
  genAiModelInfo: Schema.optional(GoogleCloudDocumentaiUiv1beta3ProcessorVersionGenAiModelInfo),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3ProcessorVersion" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3ProcessorVersion>;

export interface GoogleCloudDocumentaiUiv1beta3TrainProcessorVersionMetadataDatasetValidation {
  /** The total number of document errors. */
  documentErrorCount?: number;
  /** The total number of dataset errors. */
  datasetErrorCount?: number;
  /** Error information pertaining to specific documents. A maximum of 10 document errors will be returned. Any document with errors will not be used throughout training. */
  documentErrors?: Array<GoogleRpcStatus>;
  /** Error information for the dataset as a whole. A maximum of 10 dataset errors will be returned. A single dataset error is terminal for training. */
  datasetErrors?: Array<GoogleRpcStatus>;
}

export const GoogleCloudDocumentaiUiv1beta3TrainProcessorVersionMetadataDatasetValidation: Schema.Schema<GoogleCloudDocumentaiUiv1beta3TrainProcessorVersionMetadataDatasetValidation> = Schema.suspend(() => Schema.Struct({
  documentErrorCount: Schema.optional(Schema.Number),
  datasetErrorCount: Schema.optional(Schema.Number),
  documentErrors: Schema.optional(Schema.Array(GoogleRpcStatus)),
  datasetErrors: Schema.optional(Schema.Array(GoogleRpcStatus)),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3TrainProcessorVersionMetadataDatasetValidation" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3TrainProcessorVersionMetadataDatasetValidation>;

export interface GoogleCloudDocumentaiUiv1beta3TrainProcessorVersionMetadata {
  /** The basic metadata of the long-running operation. */
  commonMetadata?: GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata;
  /** The training dataset validation information. */
  trainingDatasetValidation?: GoogleCloudDocumentaiUiv1beta3TrainProcessorVersionMetadataDatasetValidation;
  /** The test dataset validation information. */
  testDatasetValidation?: GoogleCloudDocumentaiUiv1beta3TrainProcessorVersionMetadataDatasetValidation;
}

export const GoogleCloudDocumentaiUiv1beta3TrainProcessorVersionMetadata: Schema.Schema<GoogleCloudDocumentaiUiv1beta3TrainProcessorVersionMetadata> = Schema.suspend(() => Schema.Struct({
  commonMetadata: Schema.optional(GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata),
  trainingDatasetValidation: Schema.optional(GoogleCloudDocumentaiUiv1beta3TrainProcessorVersionMetadataDatasetValidation),
  testDatasetValidation: Schema.optional(GoogleCloudDocumentaiUiv1beta3TrainProcessorVersionMetadataDatasetValidation),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3TrainProcessorVersionMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3TrainProcessorVersionMetadata>;

export interface GoogleCloudDocumentaiUiv1beta3TrainProcessorVersionResponse {
  /** The resource name of the processor version produced by training. */
  processorVersion?: string;
}

export const GoogleCloudDocumentaiUiv1beta3TrainProcessorVersionResponse: Schema.Schema<GoogleCloudDocumentaiUiv1beta3TrainProcessorVersionResponse> = Schema.suspend(() => Schema.Struct({
  processorVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3TrainProcessorVersionResponse" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3TrainProcessorVersionResponse>;

export interface GoogleCloudDocumentaiUiv1beta3CreateLabelerPoolOperationMetadata {
  /** The basic metadata of the long-running operation. */
  commonMetadata?: GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata;
}

export const GoogleCloudDocumentaiUiv1beta3CreateLabelerPoolOperationMetadata: Schema.Schema<GoogleCloudDocumentaiUiv1beta3CreateLabelerPoolOperationMetadata> = Schema.suspend(() => Schema.Struct({
  commonMetadata: Schema.optional(GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3CreateLabelerPoolOperationMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3CreateLabelerPoolOperationMetadata>;

export interface GoogleCloudDocumentaiUiv1beta3UpdateLabelerPoolOperationMetadata {
  /** The basic metadata of the long-running operation. */
  commonMetadata?: GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata;
}

export const GoogleCloudDocumentaiUiv1beta3UpdateLabelerPoolOperationMetadata: Schema.Schema<GoogleCloudDocumentaiUiv1beta3UpdateLabelerPoolOperationMetadata> = Schema.suspend(() => Schema.Struct({
  commonMetadata: Schema.optional(GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3UpdateLabelerPoolOperationMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3UpdateLabelerPoolOperationMetadata>;

export interface GoogleCloudDocumentaiUiv1beta3DeleteLabelerPoolOperationMetadata {
  /** The basic metadata of the long-running operation. */
  commonMetadata?: GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata;
}

export const GoogleCloudDocumentaiUiv1beta3DeleteLabelerPoolOperationMetadata: Schema.Schema<GoogleCloudDocumentaiUiv1beta3DeleteLabelerPoolOperationMetadata> = Schema.suspend(() => Schema.Struct({
  commonMetadata: Schema.optional(GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3DeleteLabelerPoolOperationMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3DeleteLabelerPoolOperationMetadata>;

export interface GoogleCloudDocumentaiUiv1beta3UpdateHumanReviewConfigMetadata {
  /** The basic metadata of the long-running operation. */
  commonMetadata?: GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata;
}

export const GoogleCloudDocumentaiUiv1beta3UpdateHumanReviewConfigMetadata: Schema.Schema<GoogleCloudDocumentaiUiv1beta3UpdateHumanReviewConfigMetadata> = Schema.suspend(() => Schema.Struct({
  commonMetadata: Schema.optional(GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3UpdateHumanReviewConfigMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3UpdateHumanReviewConfigMetadata>;

export interface GoogleCloudDocumentaiUiv1beta3DeleteProcessorVersionMetadata {
  /** The basic metadata of the long-running operation. */
  commonMetadata?: GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata;
}

export const GoogleCloudDocumentaiUiv1beta3DeleteProcessorVersionMetadata: Schema.Schema<GoogleCloudDocumentaiUiv1beta3DeleteProcessorVersionMetadata> = Schema.suspend(() => Schema.Struct({
  commonMetadata: Schema.optional(GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3DeleteProcessorVersionMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3DeleteProcessorVersionMetadata>;

export interface GoogleCloudDocumentaiUiv1beta3DeployProcessorVersionMetadata {
  /** The basic metadata of the long-running operation. */
  commonMetadata?: GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata;
}

export const GoogleCloudDocumentaiUiv1beta3DeployProcessorVersionMetadata: Schema.Schema<GoogleCloudDocumentaiUiv1beta3DeployProcessorVersionMetadata> = Schema.suspend(() => Schema.Struct({
  commonMetadata: Schema.optional(GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3DeployProcessorVersionMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3DeployProcessorVersionMetadata>;

export interface GoogleCloudDocumentaiUiv1beta3DeployProcessorVersionResponse {
}

export const GoogleCloudDocumentaiUiv1beta3DeployProcessorVersionResponse: Schema.Schema<GoogleCloudDocumentaiUiv1beta3DeployProcessorVersionResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3DeployProcessorVersionResponse" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3DeployProcessorVersionResponse>;

export interface GoogleCloudDocumentaiUiv1beta3UndeployProcessorVersionMetadata {
  /** The basic metadata of the long-running operation. */
  commonMetadata?: GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata;
}

export const GoogleCloudDocumentaiUiv1beta3UndeployProcessorVersionMetadata: Schema.Schema<GoogleCloudDocumentaiUiv1beta3UndeployProcessorVersionMetadata> = Schema.suspend(() => Schema.Struct({
  commonMetadata: Schema.optional(GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3UndeployProcessorVersionMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3UndeployProcessorVersionMetadata>;

export interface GoogleCloudDocumentaiUiv1beta3UndeployProcessorVersionResponse {
}

export const GoogleCloudDocumentaiUiv1beta3UndeployProcessorVersionResponse: Schema.Schema<GoogleCloudDocumentaiUiv1beta3UndeployProcessorVersionResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3UndeployProcessorVersionResponse" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3UndeployProcessorVersionResponse>;

export interface GoogleCloudDocumentaiUiv1beta3EvaluateProcessorVersionMetadata {
  /** The basic metadata of the long-running operation. */
  commonMetadata?: GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata;
}

export const GoogleCloudDocumentaiUiv1beta3EvaluateProcessorVersionMetadata: Schema.Schema<GoogleCloudDocumentaiUiv1beta3EvaluateProcessorVersionMetadata> = Schema.suspend(() => Schema.Struct({
  commonMetadata: Schema.optional(GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3EvaluateProcessorVersionMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3EvaluateProcessorVersionMetadata>;

export interface GoogleCloudDocumentaiUiv1beta3EvaluateProcessorVersionResponse {
  /** The resource name of the created evaluation. */
  evaluation?: string;
}

export const GoogleCloudDocumentaiUiv1beta3EvaluateProcessorVersionResponse: Schema.Schema<GoogleCloudDocumentaiUiv1beta3EvaluateProcessorVersionResponse> = Schema.suspend(() => Schema.Struct({
  evaluation: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3EvaluateProcessorVersionResponse" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3EvaluateProcessorVersionResponse>;

export interface GoogleCloudDocumentaiUiv1beta3SetDefaultProcessorVersionMetadata {
  /** The basic metadata of the long-running operation. */
  commonMetadata?: GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata;
}

export const GoogleCloudDocumentaiUiv1beta3SetDefaultProcessorVersionMetadata: Schema.Schema<GoogleCloudDocumentaiUiv1beta3SetDefaultProcessorVersionMetadata> = Schema.suspend(() => Schema.Struct({
  commonMetadata: Schema.optional(GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3SetDefaultProcessorVersionMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3SetDefaultProcessorVersionMetadata>;

export interface GoogleCloudDocumentaiUiv1beta3SetDefaultProcessorVersionResponse {
}

export const GoogleCloudDocumentaiUiv1beta3SetDefaultProcessorVersionResponse: Schema.Schema<GoogleCloudDocumentaiUiv1beta3SetDefaultProcessorVersionResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3SetDefaultProcessorVersionResponse" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3SetDefaultProcessorVersionResponse>;

export interface GoogleCloudDocumentaiUiv1beta3ExportProcessorVersionMetadata {
  /** The common metadata about the operation. */
  commonMetadata?: GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata;
}

export const GoogleCloudDocumentaiUiv1beta3ExportProcessorVersionMetadata: Schema.Schema<GoogleCloudDocumentaiUiv1beta3ExportProcessorVersionMetadata> = Schema.suspend(() => Schema.Struct({
  commonMetadata: Schema.optional(GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3ExportProcessorVersionMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3ExportProcessorVersionMetadata>;

export interface GoogleCloudDocumentaiUiv1beta3ExportProcessorVersionResponse {
  /** The Cloud Storage URI containing the output artifacts. */
  gcsUri?: string;
}

export const GoogleCloudDocumentaiUiv1beta3ExportProcessorVersionResponse: Schema.Schema<GoogleCloudDocumentaiUiv1beta3ExportProcessorVersionResponse> = Schema.suspend(() => Schema.Struct({
  gcsUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3ExportProcessorVersionResponse" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3ExportProcessorVersionResponse>;

export interface GoogleCloudDocumentaiUiv1beta3ImportProcessorVersionMetadata {
  /** The basic metadata for the long-running operation. */
  commonMetadata?: GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata;
}

export const GoogleCloudDocumentaiUiv1beta3ImportProcessorVersionMetadata: Schema.Schema<GoogleCloudDocumentaiUiv1beta3ImportProcessorVersionMetadata> = Schema.suspend(() => Schema.Struct({
  commonMetadata: Schema.optional(GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3ImportProcessorVersionMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3ImportProcessorVersionMetadata>;

export interface GoogleCloudDocumentaiUiv1beta3ImportProcessorVersionResponse {
  /** The destination processor version name. */
  processorVersion?: string;
}

export const GoogleCloudDocumentaiUiv1beta3ImportProcessorVersionResponse: Schema.Schema<GoogleCloudDocumentaiUiv1beta3ImportProcessorVersionResponse> = Schema.suspend(() => Schema.Struct({
  processorVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3ImportProcessorVersionResponse" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3ImportProcessorVersionResponse>;

export interface GoogleCloudDocumentaiUiv1beta3UpdateDatasetOperationMetadata {
  /** The basic metadata of the long-running operation. */
  commonMetadata?: GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata;
}

export const GoogleCloudDocumentaiUiv1beta3UpdateDatasetOperationMetadata: Schema.Schema<GoogleCloudDocumentaiUiv1beta3UpdateDatasetOperationMetadata> = Schema.suspend(() => Schema.Struct({
  commonMetadata: Schema.optional(GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3UpdateDatasetOperationMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3UpdateDatasetOperationMetadata>;

export interface GoogleCloudDocumentaiUiv1beta3ImportDocumentsResponse {
}

export const GoogleCloudDocumentaiUiv1beta3ImportDocumentsResponse: Schema.Schema<GoogleCloudDocumentaiUiv1beta3ImportDocumentsResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3ImportDocumentsResponse" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3ImportDocumentsResponse>;

export interface GoogleCloudDocumentaiUiv1beta3DocumentIdGCSManagedDocumentId {
  /** Required. The Cloud Storage URI where the actual document is stored. */
  gcsUri?: string;
  /** Id of the document (indexed) managed by Content Warehouse. */
  cwDocId?: string;
}

export const GoogleCloudDocumentaiUiv1beta3DocumentIdGCSManagedDocumentId: Schema.Schema<GoogleCloudDocumentaiUiv1beta3DocumentIdGCSManagedDocumentId> = Schema.suspend(() => Schema.Struct({
  gcsUri: Schema.optional(Schema.String),
  cwDocId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3DocumentIdGCSManagedDocumentId" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3DocumentIdGCSManagedDocumentId>;

export interface GoogleCloudDocumentaiUiv1beta3DocumentIdUnmanagedDocumentId {
  /** Required. The id of the document. */
  docId?: string;
}

export const GoogleCloudDocumentaiUiv1beta3DocumentIdUnmanagedDocumentId: Schema.Schema<GoogleCloudDocumentaiUiv1beta3DocumentIdUnmanagedDocumentId> = Schema.suspend(() => Schema.Struct({
  docId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3DocumentIdUnmanagedDocumentId" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3DocumentIdUnmanagedDocumentId>;

export interface GoogleCloudDocumentaiUiv1beta3RevisionRef {
  /** Reads the revision by the predefined case. */
  revisionCase?: "REVISION_CASE_UNSPECIFIED" | "LATEST_HUMAN_REVIEW" | "LATEST_TIMESTAMP" | "BASE_OCR_REVISION" | (string & {});
  /** Reads the revision given by the id. */
  revisionId?: string;
  /** Reads the revision generated by the processor version. The format takes the full resource name of processor version. `projects/{project}/locations/{location}/processors/{processor}/processorVersions/{processorVersion}` */
  latestProcessorVersion?: string;
}

export const GoogleCloudDocumentaiUiv1beta3RevisionRef: Schema.Schema<GoogleCloudDocumentaiUiv1beta3RevisionRef> = Schema.suspend(() => Schema.Struct({
  revisionCase: Schema.optional(Schema.String),
  revisionId: Schema.optional(Schema.String),
  latestProcessorVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3RevisionRef" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3RevisionRef>;

export interface GoogleCloudDocumentaiUiv1beta3DocumentId {
  /** A document id within user-managed Cloud Storage. */
  gcsManagedDocId?: GoogleCloudDocumentaiUiv1beta3DocumentIdGCSManagedDocumentId;
  /** A document id within unmanaged dataset. */
  unmanagedDocId?: GoogleCloudDocumentaiUiv1beta3DocumentIdUnmanagedDocumentId;
  /** Points to a specific revision of the document if set. */
  revisionRef?: GoogleCloudDocumentaiUiv1beta3RevisionRef;
}

export const GoogleCloudDocumentaiUiv1beta3DocumentId: Schema.Schema<GoogleCloudDocumentaiUiv1beta3DocumentId> = Schema.suspend(() => Schema.Struct({
  gcsManagedDocId: Schema.optional(GoogleCloudDocumentaiUiv1beta3DocumentIdGCSManagedDocumentId),
  unmanagedDocId: Schema.optional(GoogleCloudDocumentaiUiv1beta3DocumentIdUnmanagedDocumentId),
  revisionRef: Schema.optional(GoogleCloudDocumentaiUiv1beta3RevisionRef),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3DocumentId" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3DocumentId>;

export interface GoogleCloudDocumentaiUiv1beta3ImportDocumentsMetadataIndividualImportStatus {
  /** The source Cloud Storage URI of the document. */
  inputGcsSource?: string;
  /** The status of the importing of the document. */
  status?: GoogleRpcStatus;
  /** The output_gcs_destination of the processed document if it was successful, otherwise empty. */
  outputGcsDestination?: string;
  /** The document id of imported document if it was successful, otherwise empty. */
  outputDocumentId?: GoogleCloudDocumentaiUiv1beta3DocumentId;
}

export const GoogleCloudDocumentaiUiv1beta3ImportDocumentsMetadataIndividualImportStatus: Schema.Schema<GoogleCloudDocumentaiUiv1beta3ImportDocumentsMetadataIndividualImportStatus> = Schema.suspend(() => Schema.Struct({
  inputGcsSource: Schema.optional(Schema.String),
  status: Schema.optional(GoogleRpcStatus),
  outputGcsDestination: Schema.optional(Schema.String),
  outputDocumentId: Schema.optional(GoogleCloudDocumentaiUiv1beta3DocumentId),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3ImportDocumentsMetadataIndividualImportStatus" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3ImportDocumentsMetadataIndividualImportStatus>;

export interface GoogleCloudDocumentaiUiv1beta3ImportDocumentsMetadataImportConfigValidationResult {
  /** The source Cloud Storage URI specified in the import config. */
  inputGcsSource?: string;
  /** The validation status of import config. */
  status?: GoogleRpcStatus;
}

export const GoogleCloudDocumentaiUiv1beta3ImportDocumentsMetadataImportConfigValidationResult: Schema.Schema<GoogleCloudDocumentaiUiv1beta3ImportDocumentsMetadataImportConfigValidationResult> = Schema.suspend(() => Schema.Struct({
  inputGcsSource: Schema.optional(Schema.String),
  status: Schema.optional(GoogleRpcStatus),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3ImportDocumentsMetadataImportConfigValidationResult" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3ImportDocumentsMetadataImportConfigValidationResult>;

export interface GoogleCloudDocumentaiUiv1beta3ImportDocumentsMetadata {
  /** The basic metadata of the long-running operation. */
  commonMetadata?: GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata;
  /** The list of response details of each document. */
  individualImportStatuses?: Array<GoogleCloudDocumentaiUiv1beta3ImportDocumentsMetadataIndividualImportStatus>;
  /** Validation statuses of the batch documents import config. */
  importConfigValidationResults?: Array<GoogleCloudDocumentaiUiv1beta3ImportDocumentsMetadataImportConfigValidationResult>;
  /** Total number of the documents that are qualified for importing. */
  totalDocumentCount?: number;
}

export const GoogleCloudDocumentaiUiv1beta3ImportDocumentsMetadata: Schema.Schema<GoogleCloudDocumentaiUiv1beta3ImportDocumentsMetadata> = Schema.suspend(() => Schema.Struct({
  commonMetadata: Schema.optional(GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata),
  individualImportStatuses: Schema.optional(Schema.Array(GoogleCloudDocumentaiUiv1beta3ImportDocumentsMetadataIndividualImportStatus)),
  importConfigValidationResults: Schema.optional(Schema.Array(GoogleCloudDocumentaiUiv1beta3ImportDocumentsMetadataImportConfigValidationResult)),
  totalDocumentCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3ImportDocumentsMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3ImportDocumentsMetadata>;

export interface GoogleCloudDocumentaiUiv1beta3BatchMoveDocumentsResponse {
}

export const GoogleCloudDocumentaiUiv1beta3BatchMoveDocumentsResponse: Schema.Schema<GoogleCloudDocumentaiUiv1beta3BatchMoveDocumentsResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3BatchMoveDocumentsResponse" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3BatchMoveDocumentsResponse>;

export interface GoogleCloudDocumentaiUiv1beta3BatchMoveDocumentsMetadataIndividualBatchMoveStatus {
  /** The document id of the document. */
  documentId?: GoogleCloudDocumentaiUiv1beta3DocumentId;
  /** The status of moving the document. */
  status?: GoogleRpcStatus;
}

export const GoogleCloudDocumentaiUiv1beta3BatchMoveDocumentsMetadataIndividualBatchMoveStatus: Schema.Schema<GoogleCloudDocumentaiUiv1beta3BatchMoveDocumentsMetadataIndividualBatchMoveStatus> = Schema.suspend(() => Schema.Struct({
  documentId: Schema.optional(GoogleCloudDocumentaiUiv1beta3DocumentId),
  status: Schema.optional(GoogleRpcStatus),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3BatchMoveDocumentsMetadataIndividualBatchMoveStatus" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3BatchMoveDocumentsMetadataIndividualBatchMoveStatus>;

export interface GoogleCloudDocumentaiUiv1beta3BatchMoveDocumentsMetadata {
  /** The basic metadata of the long-running operation. */
  commonMetadata?: GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata;
  /** The list of response details of each document. */
  individualBatchMoveStatuses?: Array<GoogleCloudDocumentaiUiv1beta3BatchMoveDocumentsMetadataIndividualBatchMoveStatus>;
  /** The destination dataset split type. */
  destDatasetType?: "DATASET_SPLIT_TYPE_UNSPECIFIED" | "DATASET_SPLIT_TRAIN" | "DATASET_SPLIT_TEST" | "DATASET_SPLIT_UNASSIGNED" | (string & {});
  /** The destination dataset split type. */
  destSplitType?: "DATASET_SPLIT_TYPE_UNSPECIFIED" | "DATASET_SPLIT_TRAIN" | "DATASET_SPLIT_TEST" | "DATASET_SPLIT_UNASSIGNED" | (string & {});
}

export const GoogleCloudDocumentaiUiv1beta3BatchMoveDocumentsMetadata: Schema.Schema<GoogleCloudDocumentaiUiv1beta3BatchMoveDocumentsMetadata> = Schema.suspend(() => Schema.Struct({
  commonMetadata: Schema.optional(GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata),
  individualBatchMoveStatuses: Schema.optional(Schema.Array(GoogleCloudDocumentaiUiv1beta3BatchMoveDocumentsMetadataIndividualBatchMoveStatus)),
  destDatasetType: Schema.optional(Schema.String),
  destSplitType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3BatchMoveDocumentsMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3BatchMoveDocumentsMetadata>;

export interface GoogleCloudDocumentaiUiv1beta3BatchUpdateDocumentsResponse {
}

export const GoogleCloudDocumentaiUiv1beta3BatchUpdateDocumentsResponse: Schema.Schema<GoogleCloudDocumentaiUiv1beta3BatchUpdateDocumentsResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3BatchUpdateDocumentsResponse" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3BatchUpdateDocumentsResponse>;

export interface GoogleCloudDocumentaiUiv1beta3BatchUpdateDocumentsMetadataIndividualBatchUpdateStatus {
  /** The document id of the document. */
  documentId?: GoogleCloudDocumentaiUiv1beta3DocumentId;
  /** The status of updating the document in storage. */
  status?: GoogleRpcStatus;
}

export const GoogleCloudDocumentaiUiv1beta3BatchUpdateDocumentsMetadataIndividualBatchUpdateStatus: Schema.Schema<GoogleCloudDocumentaiUiv1beta3BatchUpdateDocumentsMetadataIndividualBatchUpdateStatus> = Schema.suspend(() => Schema.Struct({
  documentId: Schema.optional(GoogleCloudDocumentaiUiv1beta3DocumentId),
  status: Schema.optional(GoogleRpcStatus),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3BatchUpdateDocumentsMetadataIndividualBatchUpdateStatus" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3BatchUpdateDocumentsMetadataIndividualBatchUpdateStatus>;

export interface GoogleCloudDocumentaiUiv1beta3BatchUpdateDocumentsMetadata {
  /** The basic metadata of the long-running operation. */
  commonMetadata?: GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata;
  /** The list of response details of each document. */
  individualBatchUpdateStatuses?: Array<GoogleCloudDocumentaiUiv1beta3BatchUpdateDocumentsMetadataIndividualBatchUpdateStatus>;
}

export const GoogleCloudDocumentaiUiv1beta3BatchUpdateDocumentsMetadata: Schema.Schema<GoogleCloudDocumentaiUiv1beta3BatchUpdateDocumentsMetadata> = Schema.suspend(() => Schema.Struct({
  commonMetadata: Schema.optional(GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata),
  individualBatchUpdateStatuses: Schema.optional(Schema.Array(GoogleCloudDocumentaiUiv1beta3BatchUpdateDocumentsMetadataIndividualBatchUpdateStatus)),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3BatchUpdateDocumentsMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3BatchUpdateDocumentsMetadata>;

export interface GoogleCloudDocumentaiUiv1beta3BatchDeleteDocumentsResponse {
}

export const GoogleCloudDocumentaiUiv1beta3BatchDeleteDocumentsResponse: Schema.Schema<GoogleCloudDocumentaiUiv1beta3BatchDeleteDocumentsResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3BatchDeleteDocumentsResponse" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3BatchDeleteDocumentsResponse>;

export interface GoogleCloudDocumentaiUiv1beta3BatchDeleteDocumentsMetadataIndividualBatchDeleteStatus {
  /** The document id of the document. */
  documentId?: GoogleCloudDocumentaiUiv1beta3DocumentId;
  /** The status of deleting the document in storage. */
  status?: GoogleRpcStatus;
}

export const GoogleCloudDocumentaiUiv1beta3BatchDeleteDocumentsMetadataIndividualBatchDeleteStatus: Schema.Schema<GoogleCloudDocumentaiUiv1beta3BatchDeleteDocumentsMetadataIndividualBatchDeleteStatus> = Schema.suspend(() => Schema.Struct({
  documentId: Schema.optional(GoogleCloudDocumentaiUiv1beta3DocumentId),
  status: Schema.optional(GoogleRpcStatus),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3BatchDeleteDocumentsMetadataIndividualBatchDeleteStatus" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3BatchDeleteDocumentsMetadataIndividualBatchDeleteStatus>;

export interface GoogleCloudDocumentaiUiv1beta3BatchDeleteDocumentsMetadata {
  /** The basic metadata of the long-running operation. */
  commonMetadata?: GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata;
  /** The list of response details of each document. */
  individualBatchDeleteStatuses?: Array<GoogleCloudDocumentaiUiv1beta3BatchDeleteDocumentsMetadataIndividualBatchDeleteStatus>;
  /** Total number of documents deleting from dataset. */
  totalDocumentCount?: number;
  /** Total number of documents that failed to be deleted in storage. */
  errorDocumentCount?: number;
}

export const GoogleCloudDocumentaiUiv1beta3BatchDeleteDocumentsMetadata: Schema.Schema<GoogleCloudDocumentaiUiv1beta3BatchDeleteDocumentsMetadata> = Schema.suspend(() => Schema.Struct({
  commonMetadata: Schema.optional(GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata),
  individualBatchDeleteStatuses: Schema.optional(Schema.Array(GoogleCloudDocumentaiUiv1beta3BatchDeleteDocumentsMetadataIndividualBatchDeleteStatus)),
  totalDocumentCount: Schema.optional(Schema.Number),
  errorDocumentCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3BatchDeleteDocumentsMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3BatchDeleteDocumentsMetadata>;

export interface GoogleCloudDocumentaiUiv1beta3ResyncDatasetResponse {
}

export const GoogleCloudDocumentaiUiv1beta3ResyncDatasetResponse: Schema.Schema<GoogleCloudDocumentaiUiv1beta3ResyncDatasetResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3ResyncDatasetResponse" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3ResyncDatasetResponse>;

export interface GoogleCloudDocumentaiUiv1beta3ResyncDatasetMetadataIndividualDocumentResyncStatus {
  /** The document identifier. */
  documentId?: GoogleCloudDocumentaiUiv1beta3DocumentId;
  /** The type of document inconsistency. */
  documentInconsistencyType?: "DOCUMENT_INCONSISTENCY_TYPE_UNSPECIFIED" | "DOCUMENT_INCONSISTENCY_TYPE_INVALID_DOCPROTO" | "DOCUMENT_INCONSISTENCY_TYPE_MISMATCHED_METADATA" | "DOCUMENT_INCONSISTENCY_TYPE_NO_PAGE_IMAGE" | (string & {});
  /** The status of resyncing the document with regards to the detected inconsistency. Empty if ResyncDatasetRequest.validate_only is `true`. */
  status?: GoogleRpcStatus;
}

export const GoogleCloudDocumentaiUiv1beta3ResyncDatasetMetadataIndividualDocumentResyncStatus: Schema.Schema<GoogleCloudDocumentaiUiv1beta3ResyncDatasetMetadataIndividualDocumentResyncStatus> = Schema.suspend(() => Schema.Struct({
  documentId: Schema.optional(GoogleCloudDocumentaiUiv1beta3DocumentId),
  documentInconsistencyType: Schema.optional(Schema.String),
  status: Schema.optional(GoogleRpcStatus),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3ResyncDatasetMetadataIndividualDocumentResyncStatus" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3ResyncDatasetMetadataIndividualDocumentResyncStatus>;

export interface GoogleCloudDocumentaiUiv1beta3ResyncDatasetMetadataDatasetResyncStatus {
  /** The type of the inconsistency of the dataset. */
  datasetInconsistencyType?: "DATASET_INCONSISTENCY_TYPE_UNSPECIFIED" | "DATASET_INCONSISTENCY_TYPE_NO_STORAGE_MARKER" | (string & {});
  /** The status of resyncing the dataset with regards to the detected inconsistency. Empty if ResyncDatasetRequest.validate_only is `true`. */
  status?: GoogleRpcStatus;
}

export const GoogleCloudDocumentaiUiv1beta3ResyncDatasetMetadataDatasetResyncStatus: Schema.Schema<GoogleCloudDocumentaiUiv1beta3ResyncDatasetMetadataDatasetResyncStatus> = Schema.suspend(() => Schema.Struct({
  datasetInconsistencyType: Schema.optional(Schema.String),
  status: Schema.optional(GoogleRpcStatus),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3ResyncDatasetMetadataDatasetResyncStatus" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3ResyncDatasetMetadataDatasetResyncStatus>;

export interface GoogleCloudDocumentaiUiv1beta3ResyncDatasetMetadata {
  /** The basic metadata of the long-running operation. */
  commonMetadata?: GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata;
  /** The list of document resync statuses. The same document could have multiple `individual_document_resync_statuses` if it has multiple inconsistencies. */
  individualDocumentResyncStatuses?: Array<GoogleCloudDocumentaiUiv1beta3ResyncDatasetMetadataIndividualDocumentResyncStatus>;
  /** The list of dataset resync statuses. Not checked when ResyncDatasetRequest.dataset_documents is specified. */
  datasetResyncStatuses?: Array<GoogleCloudDocumentaiUiv1beta3ResyncDatasetMetadataDatasetResyncStatus>;
}

export const GoogleCloudDocumentaiUiv1beta3ResyncDatasetMetadata: Schema.Schema<GoogleCloudDocumentaiUiv1beta3ResyncDatasetMetadata> = Schema.suspend(() => Schema.Struct({
  commonMetadata: Schema.optional(GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata),
  individualDocumentResyncStatuses: Schema.optional(Schema.Array(GoogleCloudDocumentaiUiv1beta3ResyncDatasetMetadataIndividualDocumentResyncStatus)),
  datasetResyncStatuses: Schema.optional(Schema.Array(GoogleCloudDocumentaiUiv1beta3ResyncDatasetMetadataDatasetResyncStatus)),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3ResyncDatasetMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3ResyncDatasetMetadata>;

export interface GoogleCloudDocumentaiUiv1beta3ExportDocumentsResponse {
}

export const GoogleCloudDocumentaiUiv1beta3ExportDocumentsResponse: Schema.Schema<GoogleCloudDocumentaiUiv1beta3ExportDocumentsResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3ExportDocumentsResponse" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3ExportDocumentsResponse>;

export interface GoogleCloudDocumentaiUiv1beta3ExportDocumentsMetadataIndividualExportStatus {
  /** The path to source docproto of the document. */
  documentId?: GoogleCloudDocumentaiUiv1beta3DocumentId;
  /** The status of the exporting of the document. */
  status?: GoogleRpcStatus;
  /** The output_gcs_destination of the exported document if it was successful, otherwise empty. */
  outputGcsDestination?: string;
}

export const GoogleCloudDocumentaiUiv1beta3ExportDocumentsMetadataIndividualExportStatus: Schema.Schema<GoogleCloudDocumentaiUiv1beta3ExportDocumentsMetadataIndividualExportStatus> = Schema.suspend(() => Schema.Struct({
  documentId: Schema.optional(GoogleCloudDocumentaiUiv1beta3DocumentId),
  status: Schema.optional(GoogleRpcStatus),
  outputGcsDestination: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3ExportDocumentsMetadataIndividualExportStatus" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3ExportDocumentsMetadataIndividualExportStatus>;

export interface GoogleCloudDocumentaiUiv1beta3ExportDocumentsMetadataSplitExportStat {
  /** The dataset split type. */
  splitType?: "DATASET_SPLIT_TYPE_UNSPECIFIED" | "DATASET_SPLIT_TRAIN" | "DATASET_SPLIT_TEST" | "DATASET_SPLIT_UNASSIGNED" | (string & {});
  /** Total number of documents with the given dataset split type to be exported. */
  totalDocumentCount?: number;
}

export const GoogleCloudDocumentaiUiv1beta3ExportDocumentsMetadataSplitExportStat: Schema.Schema<GoogleCloudDocumentaiUiv1beta3ExportDocumentsMetadataSplitExportStat> = Schema.suspend(() => Schema.Struct({
  splitType: Schema.optional(Schema.String),
  totalDocumentCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3ExportDocumentsMetadataSplitExportStat" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3ExportDocumentsMetadataSplitExportStat>;

export interface GoogleCloudDocumentaiUiv1beta3ExportDocumentsMetadata {
  /** The basic metadata of the long-running operation. */
  commonMetadata?: GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata;
  /** The list of response details of each document. */
  individualExportStatuses?: Array<GoogleCloudDocumentaiUiv1beta3ExportDocumentsMetadataIndividualExportStatus>;
  /** The list of statistics for each dataset split type. */
  splitExportStats?: Array<GoogleCloudDocumentaiUiv1beta3ExportDocumentsMetadataSplitExportStat>;
}

export const GoogleCloudDocumentaiUiv1beta3ExportDocumentsMetadata: Schema.Schema<GoogleCloudDocumentaiUiv1beta3ExportDocumentsMetadata> = Schema.suspend(() => Schema.Struct({
  commonMetadata: Schema.optional(GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata),
  individualExportStatuses: Schema.optional(Schema.Array(GoogleCloudDocumentaiUiv1beta3ExportDocumentsMetadataIndividualExportStatus)),
  splitExportStats: Schema.optional(Schema.Array(GoogleCloudDocumentaiUiv1beta3ExportDocumentsMetadataSplitExportStat)),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3ExportDocumentsMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3ExportDocumentsMetadata>;

export interface GoogleCloudDocumentaiUiv1beta3AutoLabelDocumentsResponse {
}

export const GoogleCloudDocumentaiUiv1beta3AutoLabelDocumentsResponse: Schema.Schema<GoogleCloudDocumentaiUiv1beta3AutoLabelDocumentsResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3AutoLabelDocumentsResponse" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3AutoLabelDocumentsResponse>;

export interface GoogleCloudDocumentaiUiv1beta3AutoLabelDocumentsMetadataIndividualAutoLabelStatus {
  /** The status of the document auto-labeling. */
  status?: GoogleRpcStatus;
  /** The document id of the auto-labeled document. This will replace the gcs_uri. */
  documentId?: GoogleCloudDocumentaiUiv1beta3DocumentId;
}

export const GoogleCloudDocumentaiUiv1beta3AutoLabelDocumentsMetadataIndividualAutoLabelStatus: Schema.Schema<GoogleCloudDocumentaiUiv1beta3AutoLabelDocumentsMetadataIndividualAutoLabelStatus> = Schema.suspend(() => Schema.Struct({
  status: Schema.optional(GoogleRpcStatus),
  documentId: Schema.optional(GoogleCloudDocumentaiUiv1beta3DocumentId),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3AutoLabelDocumentsMetadataIndividualAutoLabelStatus" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3AutoLabelDocumentsMetadataIndividualAutoLabelStatus>;

export interface GoogleCloudDocumentaiUiv1beta3AutoLabelDocumentsMetadata {
  /** The basic metadata of the long-running operation. */
  commonMetadata?: GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata;
  /** The list of individual auto-labeling statuses of the dataset documents. */
  individualAutoLabelStatuses?: Array<GoogleCloudDocumentaiUiv1beta3AutoLabelDocumentsMetadataIndividualAutoLabelStatus>;
  /** Total number of the auto-labeling documents. */
  totalDocumentCount?: number;
}

export const GoogleCloudDocumentaiUiv1beta3AutoLabelDocumentsMetadata: Schema.Schema<GoogleCloudDocumentaiUiv1beta3AutoLabelDocumentsMetadata> = Schema.suspend(() => Schema.Struct({
  commonMetadata: Schema.optional(GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata),
  individualAutoLabelStatuses: Schema.optional(Schema.Array(GoogleCloudDocumentaiUiv1beta3AutoLabelDocumentsMetadataIndividualAutoLabelStatus)),
  totalDocumentCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3AutoLabelDocumentsMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3AutoLabelDocumentsMetadata>;

export interface GoogleCloudDocumentaiUiv1beta3SampleDocumentsResponseSelectedDocument {
  /** An internal identifier for document. */
  documentId?: string;
}

export const GoogleCloudDocumentaiUiv1beta3SampleDocumentsResponseSelectedDocument: Schema.Schema<GoogleCloudDocumentaiUiv1beta3SampleDocumentsResponseSelectedDocument> = Schema.suspend(() => Schema.Struct({
  documentId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3SampleDocumentsResponseSelectedDocument" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3SampleDocumentsResponseSelectedDocument>;

export interface GoogleCloudDocumentaiUiv1beta3SampleDocumentsResponse {
  /** The result of the sampling process. */
  selectedDocuments?: Array<GoogleCloudDocumentaiUiv1beta3SampleDocumentsResponseSelectedDocument>;
  /** The status of sampling documents in test split. */
  sampleTestStatus?: GoogleRpcStatus;
  /** The status of sampling documents in training split. */
  sampleTrainingStatus?: GoogleRpcStatus;
}

export const GoogleCloudDocumentaiUiv1beta3SampleDocumentsResponse: Schema.Schema<GoogleCloudDocumentaiUiv1beta3SampleDocumentsResponse> = Schema.suspend(() => Schema.Struct({
  selectedDocuments: Schema.optional(Schema.Array(GoogleCloudDocumentaiUiv1beta3SampleDocumentsResponseSelectedDocument)),
  sampleTestStatus: Schema.optional(GoogleRpcStatus),
  sampleTrainingStatus: Schema.optional(GoogleRpcStatus),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3SampleDocumentsResponse" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3SampleDocumentsResponse>;

export interface GoogleCloudDocumentaiUiv1beta3SampleDocumentsMetadata {
  /** The basic metadata of the long-running operation. */
  commonMetadata?: GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata;
}

export const GoogleCloudDocumentaiUiv1beta3SampleDocumentsMetadata: Schema.Schema<GoogleCloudDocumentaiUiv1beta3SampleDocumentsMetadata> = Schema.suspend(() => Schema.Struct({
  commonMetadata: Schema.optional(GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata),
})).annotate({ identifier: "GoogleCloudDocumentaiUiv1beta3SampleDocumentsMetadata" }) as any as Schema.Schema<GoogleCloudDocumentaiUiv1beta3SampleDocumentsMetadata>;

// ==========================================================================
// Operations
// ==========================================================================

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetProjectsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsOperationsRequest>;

export type GetProjectsOperationsResponse = GoogleLongrunningOperation;
export const GetProjectsOperationsResponse = GoogleLongrunningOperation;

export type GetProjectsOperationsError = CommonErrors;

export const getProjectsOperations: API.OperationMethod<GetProjectsOperationsRequest, GetProjectsOperationsResponse, GetProjectsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsOperationsRequest,
  output: GetProjectsOperationsResponse,
  errors: [],
}));

/** Fetches processor types. Note that we don't use ListProcessorTypes here, because it isn't paginated. */
export interface FetchProcessorTypesProjectsLocationsRequest {
  /** Required. The location of processor types to list. Format: `projects/{project}/locations/{location}`. */
  parent: string;
}

export const FetchProcessorTypesProjectsLocationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}:fetchProcessorTypes" }),
  svc,
) as unknown as Schema.Schema<FetchProcessorTypesProjectsLocationsRequest>;

export type FetchProcessorTypesProjectsLocationsResponse = GoogleCloudDocumentaiV1FetchProcessorTypesResponse;
export const FetchProcessorTypesProjectsLocationsResponse = GoogleCloudDocumentaiV1FetchProcessorTypesResponse;

export type FetchProcessorTypesProjectsLocationsError = CommonErrors;

export const fetchProcessorTypesProjectsLocations: API.OperationMethod<FetchProcessorTypesProjectsLocationsRequest, FetchProcessorTypesProjectsLocationsResponse, FetchProcessorTypesProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: FetchProcessorTypesProjectsLocationsRequest,
  output: FetchProcessorTypesProjectsLocationsResponse,
  errors: [],
}));

/** Lists information about the supported locations for this service. This method can be called in two ways: * **List all public locations:** Use the path `GET /v1/locations`. * **List project-visible locations:** Use the path `GET /v1/projects/{project_id}/locations`. This may include public locations as well as private or other locations specifically visible to the project. */
export interface ListProjectsLocationsRequest {
  /** The resource that owns the locations collection, if applicable. */
  name: string;
  /** A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in [AIP-160](https://google.aip.dev/160). */
  filter?: string;
  /** The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
  /** A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
  /** Optional. Do not use this field. It is unsupported and is ignored unless explicitly documented otherwise. This is primarily for internal usage. */
  extraLocationTypes?: string[];
}

export const ListProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("extraLocationTypes")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRequest>;

export type ListProjectsLocationsResponse = GoogleCloudLocationListLocationsResponse;
export const ListProjectsLocationsResponse = GoogleCloudLocationListLocationsResponse;

export type ListProjectsLocationsError = CommonErrors;

export const listProjectsLocations = API.makePaginated(() => ({
  input: ListProjectsLocationsRequest,
  output: ListProjectsLocationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets information about a location. */
export interface GetProjectsLocationsRequest {
  /** Resource name for the location. */
  name: string;
}

export const GetProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRequest>;

export type GetProjectsLocationsResponse = GoogleCloudLocationLocation;
export const GetProjectsLocationsResponse = GoogleCloudLocationLocation;

export type GetProjectsLocationsError = CommonErrors;

export const getProjectsLocations: API.OperationMethod<GetProjectsLocationsRequest, GetProjectsLocationsResponse, GetProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRequest,
  output: GetProjectsLocationsResponse,
  errors: [],
}));

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListProjectsLocationsOperationsRequest {
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list filter. */
  filter?: string;
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list page token. */
  pageToken?: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
}

export const ListProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsOperationsRequest>;

export type ListProjectsLocationsOperationsResponse = GoogleLongrunningListOperationsResponse;
export const ListProjectsLocationsOperationsResponse = GoogleLongrunningListOperationsResponse;

export type ListProjectsLocationsOperationsError = CommonErrors;

export const listProjectsLocationsOperations = API.makePaginated(() => ({
  input: ListProjectsLocationsOperationsRequest,
  output: ListProjectsLocationsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetProjectsLocationsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsOperationsRequest>;

export type GetProjectsLocationsOperationsResponse = GoogleLongrunningOperation;
export const GetProjectsLocationsOperationsResponse = GoogleLongrunningOperation;

export type GetProjectsLocationsOperationsError = CommonErrors;

export const getProjectsLocationsOperations: API.OperationMethod<GetProjectsLocationsOperationsRequest, GetProjectsLocationsOperationsResponse, GetProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsOperationsRequest,
  output: GetProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export interface CancelProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
}

export const CancelProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelProjectsLocationsOperationsRequest>;

export type CancelProjectsLocationsOperationsResponse = GoogleProtobufEmpty;
export const CancelProjectsLocationsOperationsResponse = GoogleProtobufEmpty;

export type CancelProjectsLocationsOperationsError = CommonErrors;

export const cancelProjectsLocationsOperations: API.OperationMethod<CancelProjectsLocationsOperationsRequest, CancelProjectsLocationsOperationsResponse, CancelProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelProjectsLocationsOperationsRequest,
  output: CancelProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Processes a single document. */
export interface ProcessProjectsLocationsProcessorsRequest {
  /** Required. The resource name of the Processor or ProcessorVersion to use for processing. If a Processor is specified, the server will use its default version. Format: `projects/{project}/locations/{location}/processors/{processor}`, or `projects/{project}/locations/{location}/processors/{processor}/processorVersions/{processorVersion}` */
  name: string;
  /** Request body */
  body?: GoogleCloudDocumentaiV1ProcessRequest;
}

export const ProcessProjectsLocationsProcessorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDocumentaiV1ProcessRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/processors/{processorsId}:process", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ProcessProjectsLocationsProcessorsRequest>;

export type ProcessProjectsLocationsProcessorsResponse = GoogleCloudDocumentaiV1ProcessResponse;
export const ProcessProjectsLocationsProcessorsResponse = GoogleCloudDocumentaiV1ProcessResponse;

export type ProcessProjectsLocationsProcessorsError = CommonErrors;

export const processProjectsLocationsProcessors: API.OperationMethod<ProcessProjectsLocationsProcessorsRequest, ProcessProjectsLocationsProcessorsResponse, ProcessProjectsLocationsProcessorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ProcessProjectsLocationsProcessorsRequest,
  output: ProcessProjectsLocationsProcessorsResponse,
  errors: [],
}));

/** LRO endpoint to batch process many documents. The output is written to Cloud Storage as JSON in the [Document] format. */
export interface BatchProcessProjectsLocationsProcessorsRequest {
  /** Required. The resource name of Processor or ProcessorVersion. Format: `projects/{project}/locations/{location}/processors/{processor}`, or `projects/{project}/locations/{location}/processors/{processor}/processorVersions/{processorVersion}` */
  name: string;
  /** Request body */
  body?: GoogleCloudDocumentaiV1BatchProcessRequest;
}

export const BatchProcessProjectsLocationsProcessorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDocumentaiV1BatchProcessRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/processors/{processorsId}:batchProcess", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchProcessProjectsLocationsProcessorsRequest>;

export type BatchProcessProjectsLocationsProcessorsResponse = GoogleLongrunningOperation;
export const BatchProcessProjectsLocationsProcessorsResponse = GoogleLongrunningOperation;

export type BatchProcessProjectsLocationsProcessorsError = CommonErrors;

export const batchProcessProjectsLocationsProcessors: API.OperationMethod<BatchProcessProjectsLocationsProcessorsRequest, BatchProcessProjectsLocationsProcessorsResponse, BatchProcessProjectsLocationsProcessorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchProcessProjectsLocationsProcessorsRequest,
  output: BatchProcessProjectsLocationsProcessorsResponse,
  errors: [],
}));

/** Lists all processors which belong to this project. */
export interface ListProjectsLocationsProcessorsRequest {
  /** Required. The parent (project and location) which owns this collection of Processors. Format: `projects/{project}/locations/{location}` */
  parent: string;
  /** The maximum number of processors to return. If unspecified, at most `50` processors will be returned. The maximum value is `100`. Values above `100` will be coerced to `100`. */
  pageSize?: number;
  /** We will return the processors sorted by creation time. The page token will point to the next processor. */
  pageToken?: string;
}

export const ListProjectsLocationsProcessorsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/processors" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsProcessorsRequest>;

export type ListProjectsLocationsProcessorsResponse = GoogleCloudDocumentaiV1ListProcessorsResponse;
export const ListProjectsLocationsProcessorsResponse = GoogleCloudDocumentaiV1ListProcessorsResponse;

export type ListProjectsLocationsProcessorsError = CommonErrors;

export const listProjectsLocationsProcessors = API.makePaginated(() => ({
  input: ListProjectsLocationsProcessorsRequest,
  output: ListProjectsLocationsProcessorsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a processor detail. */
export interface GetProjectsLocationsProcessorsRequest {
  /** Required. The processor resource name. */
  name: string;
}

export const GetProjectsLocationsProcessorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/processors/{processorsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsProcessorsRequest>;

export type GetProjectsLocationsProcessorsResponse = GoogleCloudDocumentaiV1Processor;
export const GetProjectsLocationsProcessorsResponse = GoogleCloudDocumentaiV1Processor;

export type GetProjectsLocationsProcessorsError = CommonErrors;

export const getProjectsLocationsProcessors: API.OperationMethod<GetProjectsLocationsProcessorsRequest, GetProjectsLocationsProcessorsResponse, GetProjectsLocationsProcessorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsProcessorsRequest,
  output: GetProjectsLocationsProcessorsResponse,
  errors: [],
}));

/** Creates a processor from the ProcessorType provided. The processor will be at `ENABLED` state by default after its creation. Note that this method requires the `documentai.processors.create` permission on the project, which is highly privileged. A user or service account with this permission can create new processors that can interact with any gcs bucket in your project. */
export interface CreateProjectsLocationsProcessorsRequest {
  /** Required. The parent (project and location) under which to create the processor. Format: `projects/{project}/locations/{location}` */
  parent: string;
  /** Request body */
  body?: GoogleCloudDocumentaiV1Processor;
}

export const CreateProjectsLocationsProcessorsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDocumentaiV1Processor).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/processors", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsProcessorsRequest>;

export type CreateProjectsLocationsProcessorsResponse = GoogleCloudDocumentaiV1Processor;
export const CreateProjectsLocationsProcessorsResponse = GoogleCloudDocumentaiV1Processor;

export type CreateProjectsLocationsProcessorsError = CommonErrors;

export const createProjectsLocationsProcessors: API.OperationMethod<CreateProjectsLocationsProcessorsRequest, CreateProjectsLocationsProcessorsResponse, CreateProjectsLocationsProcessorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsProcessorsRequest,
  output: CreateProjectsLocationsProcessorsResponse,
  errors: [],
}));

/** Deletes the processor, unloads all deployed model artifacts if it was enabled and then deletes all artifacts associated with this processor. */
export interface DeleteProjectsLocationsProcessorsRequest {
  /** Required. The processor resource name to be deleted. */
  name: string;
}

export const DeleteProjectsLocationsProcessorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/processors/{processorsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsProcessorsRequest>;

export type DeleteProjectsLocationsProcessorsResponse = GoogleLongrunningOperation;
export const DeleteProjectsLocationsProcessorsResponse = GoogleLongrunningOperation;

export type DeleteProjectsLocationsProcessorsError = CommonErrors;

export const deleteProjectsLocationsProcessors: API.OperationMethod<DeleteProjectsLocationsProcessorsRequest, DeleteProjectsLocationsProcessorsResponse, DeleteProjectsLocationsProcessorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsProcessorsRequest,
  output: DeleteProjectsLocationsProcessorsResponse,
  errors: [],
}));

/** Enables a processor */
export interface EnableProjectsLocationsProcessorsRequest {
  /** Required. The processor resource name to be enabled. */
  name: string;
  /** Request body */
  body?: GoogleCloudDocumentaiV1EnableProcessorRequest;
}

export const EnableProjectsLocationsProcessorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDocumentaiV1EnableProcessorRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/processors/{processorsId}:enable", hasBody: true }),
  svc,
) as unknown as Schema.Schema<EnableProjectsLocationsProcessorsRequest>;

export type EnableProjectsLocationsProcessorsResponse = GoogleLongrunningOperation;
export const EnableProjectsLocationsProcessorsResponse = GoogleLongrunningOperation;

export type EnableProjectsLocationsProcessorsError = CommonErrors;

export const enableProjectsLocationsProcessors: API.OperationMethod<EnableProjectsLocationsProcessorsRequest, EnableProjectsLocationsProcessorsResponse, EnableProjectsLocationsProcessorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: EnableProjectsLocationsProcessorsRequest,
  output: EnableProjectsLocationsProcessorsResponse,
  errors: [],
}));

/** Disables a processor */
export interface DisableProjectsLocationsProcessorsRequest {
  /** Required. The processor resource name to be disabled. */
  name: string;
  /** Request body */
  body?: GoogleCloudDocumentaiV1DisableProcessorRequest;
}

export const DisableProjectsLocationsProcessorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDocumentaiV1DisableProcessorRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/processors/{processorsId}:disable", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DisableProjectsLocationsProcessorsRequest>;

export type DisableProjectsLocationsProcessorsResponse = GoogleLongrunningOperation;
export const DisableProjectsLocationsProcessorsResponse = GoogleLongrunningOperation;

export type DisableProjectsLocationsProcessorsError = CommonErrors;

export const disableProjectsLocationsProcessors: API.OperationMethod<DisableProjectsLocationsProcessorsRequest, DisableProjectsLocationsProcessorsResponse, DisableProjectsLocationsProcessorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DisableProjectsLocationsProcessorsRequest,
  output: DisableProjectsLocationsProcessorsResponse,
  errors: [],
}));

/** Set the default (active) version of a Processor that will be used in ProcessDocument and BatchProcessDocuments. */
export interface SetDefaultProcessorVersionProjectsLocationsProcessorsRequest {
  /** Required. The resource name of the Processor to change default version. */
  processor: string;
  /** Request body */
  body?: GoogleCloudDocumentaiV1SetDefaultProcessorVersionRequest;
}

export const SetDefaultProcessorVersionProjectsLocationsProcessorsRequest = Schema.Struct({
  processor: Schema.String.pipe(T.HttpPath("processor")),
  body: Schema.optional(GoogleCloudDocumentaiV1SetDefaultProcessorVersionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/processors/{processorsId}:setDefaultProcessorVersion", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetDefaultProcessorVersionProjectsLocationsProcessorsRequest>;

export type SetDefaultProcessorVersionProjectsLocationsProcessorsResponse = GoogleLongrunningOperation;
export const SetDefaultProcessorVersionProjectsLocationsProcessorsResponse = GoogleLongrunningOperation;

export type SetDefaultProcessorVersionProjectsLocationsProcessorsError = CommonErrors;

export const setDefaultProcessorVersionProjectsLocationsProcessors: API.OperationMethod<SetDefaultProcessorVersionProjectsLocationsProcessorsRequest, SetDefaultProcessorVersionProjectsLocationsProcessorsResponse, SetDefaultProcessorVersionProjectsLocationsProcessorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetDefaultProcessorVersionProjectsLocationsProcessorsRequest,
  output: SetDefaultProcessorVersionProjectsLocationsProcessorsResponse,
  errors: [],
}));

/** Processes a single document. */
export interface ProcessProjectsLocationsProcessorsProcessorVersionsRequest {
  /** Required. The resource name of the Processor or ProcessorVersion to use for processing. If a Processor is specified, the server will use its default version. Format: `projects/{project}/locations/{location}/processors/{processor}`, or `projects/{project}/locations/{location}/processors/{processor}/processorVersions/{processorVersion}` */
  name: string;
  /** Request body */
  body?: GoogleCloudDocumentaiV1ProcessRequest;
}

export const ProcessProjectsLocationsProcessorsProcessorVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDocumentaiV1ProcessRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/processors/{processorsId}/processorVersions/{processorVersionsId}:process", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ProcessProjectsLocationsProcessorsProcessorVersionsRequest>;

export type ProcessProjectsLocationsProcessorsProcessorVersionsResponse = GoogleCloudDocumentaiV1ProcessResponse;
export const ProcessProjectsLocationsProcessorsProcessorVersionsResponse = GoogleCloudDocumentaiV1ProcessResponse;

export type ProcessProjectsLocationsProcessorsProcessorVersionsError = CommonErrors;

export const processProjectsLocationsProcessorsProcessorVersions: API.OperationMethod<ProcessProjectsLocationsProcessorsProcessorVersionsRequest, ProcessProjectsLocationsProcessorsProcessorVersionsResponse, ProcessProjectsLocationsProcessorsProcessorVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ProcessProjectsLocationsProcessorsProcessorVersionsRequest,
  output: ProcessProjectsLocationsProcessorsProcessorVersionsResponse,
  errors: [],
}));

/** LRO endpoint to batch process many documents. The output is written to Cloud Storage as JSON in the [Document] format. */
export interface BatchProcessProjectsLocationsProcessorsProcessorVersionsRequest {
  /** Required. The resource name of Processor or ProcessorVersion. Format: `projects/{project}/locations/{location}/processors/{processor}`, or `projects/{project}/locations/{location}/processors/{processor}/processorVersions/{processorVersion}` */
  name: string;
  /** Request body */
  body?: GoogleCloudDocumentaiV1BatchProcessRequest;
}

export const BatchProcessProjectsLocationsProcessorsProcessorVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDocumentaiV1BatchProcessRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/processors/{processorsId}/processorVersions/{processorVersionsId}:batchProcess", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchProcessProjectsLocationsProcessorsProcessorVersionsRequest>;

export type BatchProcessProjectsLocationsProcessorsProcessorVersionsResponse = GoogleLongrunningOperation;
export const BatchProcessProjectsLocationsProcessorsProcessorVersionsResponse = GoogleLongrunningOperation;

export type BatchProcessProjectsLocationsProcessorsProcessorVersionsError = CommonErrors;

export const batchProcessProjectsLocationsProcessorsProcessorVersions: API.OperationMethod<BatchProcessProjectsLocationsProcessorsProcessorVersionsRequest, BatchProcessProjectsLocationsProcessorsProcessorVersionsResponse, BatchProcessProjectsLocationsProcessorsProcessorVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchProcessProjectsLocationsProcessorsProcessorVersionsRequest,
  output: BatchProcessProjectsLocationsProcessorsProcessorVersionsResponse,
  errors: [],
}));

/** Trains a new processor version. Operation metadata is returned as TrainProcessorVersionMetadata. */
export interface TrainProjectsLocationsProcessorsProcessorVersionsRequest {
  /** Required. The parent (project, location and processor) to create the new version for. Format: `projects/{project}/locations/{location}/processors/{processor}`. */
  parent: string;
  /** Request body */
  body?: GoogleCloudDocumentaiV1TrainProcessorVersionRequest;
}

export const TrainProjectsLocationsProcessorsProcessorVersionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDocumentaiV1TrainProcessorVersionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/processors/{processorsId}/processorVersions:train", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TrainProjectsLocationsProcessorsProcessorVersionsRequest>;

export type TrainProjectsLocationsProcessorsProcessorVersionsResponse = GoogleLongrunningOperation;
export const TrainProjectsLocationsProcessorsProcessorVersionsResponse = GoogleLongrunningOperation;

export type TrainProjectsLocationsProcessorsProcessorVersionsError = CommonErrors;

export const trainProjectsLocationsProcessorsProcessorVersions: API.OperationMethod<TrainProjectsLocationsProcessorsProcessorVersionsRequest, TrainProjectsLocationsProcessorsProcessorVersionsResponse, TrainProjectsLocationsProcessorsProcessorVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TrainProjectsLocationsProcessorsProcessorVersionsRequest,
  output: TrainProjectsLocationsProcessorsProcessorVersionsResponse,
  errors: [],
}));

/** Gets a processor version detail. */
export interface GetProjectsLocationsProcessorsProcessorVersionsRequest {
  /** Required. The processor resource name. */
  name: string;
}

export const GetProjectsLocationsProcessorsProcessorVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/processors/{processorsId}/processorVersions/{processorVersionsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsProcessorsProcessorVersionsRequest>;

export type GetProjectsLocationsProcessorsProcessorVersionsResponse = GoogleCloudDocumentaiV1ProcessorVersion;
export const GetProjectsLocationsProcessorsProcessorVersionsResponse = GoogleCloudDocumentaiV1ProcessorVersion;

export type GetProjectsLocationsProcessorsProcessorVersionsError = CommonErrors;

export const getProjectsLocationsProcessorsProcessorVersions: API.OperationMethod<GetProjectsLocationsProcessorsProcessorVersionsRequest, GetProjectsLocationsProcessorsProcessorVersionsResponse, GetProjectsLocationsProcessorsProcessorVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsProcessorsProcessorVersionsRequest,
  output: GetProjectsLocationsProcessorsProcessorVersionsResponse,
  errors: [],
}));

/** Lists all versions of a processor. */
export interface ListProjectsLocationsProcessorsProcessorVersionsRequest {
  /** Required. The parent (project, location and processor) to list all versions. Format: `projects/{project}/locations/{location}/processors/{processor}` */
  parent: string;
  /** The maximum number of processor versions to return. If unspecified, at most `10` processor versions will be returned. The maximum value is `20`. Values above `20` will be coerced to `20`. */
  pageSize?: number;
  /** We will return the processor versions sorted by creation time. The page token will point to the next processor version. */
  pageToken?: string;
}

export const ListProjectsLocationsProcessorsProcessorVersionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/processors/{processorsId}/processorVersions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsProcessorsProcessorVersionsRequest>;

export type ListProjectsLocationsProcessorsProcessorVersionsResponse = GoogleCloudDocumentaiV1ListProcessorVersionsResponse;
export const ListProjectsLocationsProcessorsProcessorVersionsResponse = GoogleCloudDocumentaiV1ListProcessorVersionsResponse;

export type ListProjectsLocationsProcessorsProcessorVersionsError = CommonErrors;

export const listProjectsLocationsProcessorsProcessorVersions = API.makePaginated(() => ({
  input: ListProjectsLocationsProcessorsProcessorVersionsRequest,
  output: ListProjectsLocationsProcessorsProcessorVersionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes the processor version, all artifacts under the processor version will be deleted. */
export interface DeleteProjectsLocationsProcessorsProcessorVersionsRequest {
  /** Required. The processor version resource name to be deleted. */
  name: string;
}

export const DeleteProjectsLocationsProcessorsProcessorVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/processors/{processorsId}/processorVersions/{processorVersionsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsProcessorsProcessorVersionsRequest>;

export type DeleteProjectsLocationsProcessorsProcessorVersionsResponse = GoogleLongrunningOperation;
export const DeleteProjectsLocationsProcessorsProcessorVersionsResponse = GoogleLongrunningOperation;

export type DeleteProjectsLocationsProcessorsProcessorVersionsError = CommonErrors;

export const deleteProjectsLocationsProcessorsProcessorVersions: API.OperationMethod<DeleteProjectsLocationsProcessorsProcessorVersionsRequest, DeleteProjectsLocationsProcessorsProcessorVersionsResponse, DeleteProjectsLocationsProcessorsProcessorVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsProcessorsProcessorVersionsRequest,
  output: DeleteProjectsLocationsProcessorsProcessorVersionsResponse,
  errors: [],
}));

/** Deploys the processor version. */
export interface DeployProjectsLocationsProcessorsProcessorVersionsRequest {
  /** Required. The processor version resource name to be deployed. */
  name: string;
  /** Request body */
  body?: GoogleCloudDocumentaiV1DeployProcessorVersionRequest;
}

export const DeployProjectsLocationsProcessorsProcessorVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDocumentaiV1DeployProcessorVersionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/processors/{processorsId}/processorVersions/{processorVersionsId}:deploy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DeployProjectsLocationsProcessorsProcessorVersionsRequest>;

export type DeployProjectsLocationsProcessorsProcessorVersionsResponse = GoogleLongrunningOperation;
export const DeployProjectsLocationsProcessorsProcessorVersionsResponse = GoogleLongrunningOperation;

export type DeployProjectsLocationsProcessorsProcessorVersionsError = CommonErrors;

export const deployProjectsLocationsProcessorsProcessorVersions: API.OperationMethod<DeployProjectsLocationsProcessorsProcessorVersionsRequest, DeployProjectsLocationsProcessorsProcessorVersionsResponse, DeployProjectsLocationsProcessorsProcessorVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeployProjectsLocationsProcessorsProcessorVersionsRequest,
  output: DeployProjectsLocationsProcessorsProcessorVersionsResponse,
  errors: [],
}));

/** Undeploys the processor version. */
export interface UndeployProjectsLocationsProcessorsProcessorVersionsRequest {
  /** Required. The processor version resource name to be undeployed. */
  name: string;
  /** Request body */
  body?: GoogleCloudDocumentaiV1UndeployProcessorVersionRequest;
}

export const UndeployProjectsLocationsProcessorsProcessorVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDocumentaiV1UndeployProcessorVersionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/processors/{processorsId}/processorVersions/{processorVersionsId}:undeploy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UndeployProjectsLocationsProcessorsProcessorVersionsRequest>;

export type UndeployProjectsLocationsProcessorsProcessorVersionsResponse = GoogleLongrunningOperation;
export const UndeployProjectsLocationsProcessorsProcessorVersionsResponse = GoogleLongrunningOperation;

export type UndeployProjectsLocationsProcessorsProcessorVersionsError = CommonErrors;

export const undeployProjectsLocationsProcessorsProcessorVersions: API.OperationMethod<UndeployProjectsLocationsProcessorsProcessorVersionsRequest, UndeployProjectsLocationsProcessorsProcessorVersionsResponse, UndeployProjectsLocationsProcessorsProcessorVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UndeployProjectsLocationsProcessorsProcessorVersionsRequest,
  output: UndeployProjectsLocationsProcessorsProcessorVersionsResponse,
  errors: [],
}));

/** Evaluates a ProcessorVersion against annotated documents, producing an Evaluation. */
export interface EvaluateProcessorVersionProjectsLocationsProcessorsProcessorVersionsRequest {
  /** Required. The resource name of the ProcessorVersion to evaluate. `projects/{project}/locations/{location}/processors/{processor}/processorVersions/{processorVersion}` */
  processorVersion: string;
  /** Request body */
  body?: GoogleCloudDocumentaiV1EvaluateProcessorVersionRequest;
}

export const EvaluateProcessorVersionProjectsLocationsProcessorsProcessorVersionsRequest = Schema.Struct({
  processorVersion: Schema.String.pipe(T.HttpPath("processorVersion")),
  body: Schema.optional(GoogleCloudDocumentaiV1EvaluateProcessorVersionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/processors/{processorsId}/processorVersions/{processorVersionsId}:evaluateProcessorVersion", hasBody: true }),
  svc,
) as unknown as Schema.Schema<EvaluateProcessorVersionProjectsLocationsProcessorsProcessorVersionsRequest>;

export type EvaluateProcessorVersionProjectsLocationsProcessorsProcessorVersionsResponse = GoogleLongrunningOperation;
export const EvaluateProcessorVersionProjectsLocationsProcessorsProcessorVersionsResponse = GoogleLongrunningOperation;

export type EvaluateProcessorVersionProjectsLocationsProcessorsProcessorVersionsError = CommonErrors;

export const evaluateProcessorVersionProjectsLocationsProcessorsProcessorVersions: API.OperationMethod<EvaluateProcessorVersionProjectsLocationsProcessorsProcessorVersionsRequest, EvaluateProcessorVersionProjectsLocationsProcessorsProcessorVersionsResponse, EvaluateProcessorVersionProjectsLocationsProcessorsProcessorVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: EvaluateProcessorVersionProjectsLocationsProcessorsProcessorVersionsRequest,
  output: EvaluateProcessorVersionProjectsLocationsProcessorsProcessorVersionsResponse,
  errors: [],
}));

/** Retrieves a specific evaluation. */
export interface GetProjectsLocationsProcessorsProcessorVersionsEvaluationsRequest {
  /** Required. The resource name of the Evaluation to get. `projects/{project}/locations/{location}/processors/{processor}/processorVersions/{processorVersion}/evaluations/{evaluation}` */
  name: string;
}

export const GetProjectsLocationsProcessorsProcessorVersionsEvaluationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/processors/{processorsId}/processorVersions/{processorVersionsId}/evaluations/{evaluationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsProcessorsProcessorVersionsEvaluationsRequest>;

export type GetProjectsLocationsProcessorsProcessorVersionsEvaluationsResponse = GoogleCloudDocumentaiV1Evaluation;
export const GetProjectsLocationsProcessorsProcessorVersionsEvaluationsResponse = GoogleCloudDocumentaiV1Evaluation;

export type GetProjectsLocationsProcessorsProcessorVersionsEvaluationsError = CommonErrors;

export const getProjectsLocationsProcessorsProcessorVersionsEvaluations: API.OperationMethod<GetProjectsLocationsProcessorsProcessorVersionsEvaluationsRequest, GetProjectsLocationsProcessorsProcessorVersionsEvaluationsResponse, GetProjectsLocationsProcessorsProcessorVersionsEvaluationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsProcessorsProcessorVersionsEvaluationsRequest,
  output: GetProjectsLocationsProcessorsProcessorVersionsEvaluationsResponse,
  errors: [],
}));

/** Retrieves a set of evaluations for a given processor version. */
export interface ListProjectsLocationsProcessorsProcessorVersionsEvaluationsRequest {
  /** Required. The resource name of the ProcessorVersion to list evaluations for. `projects/{project}/locations/{location}/processors/{processor}/processorVersions/{processorVersion}` */
  parent: string;
  /** The standard list page size. If unspecified, at most `5` evaluations are returned. The maximum value is `100`. Values above `100` are coerced to `100`. */
  pageSize?: number;
  /** A page token, received from a previous `ListEvaluations` call. Provide this to retrieve the subsequent page. */
  pageToken?: string;
}

export const ListProjectsLocationsProcessorsProcessorVersionsEvaluationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/processors/{processorsId}/processorVersions/{processorVersionsId}/evaluations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsProcessorsProcessorVersionsEvaluationsRequest>;

export type ListProjectsLocationsProcessorsProcessorVersionsEvaluationsResponse = GoogleCloudDocumentaiV1ListEvaluationsResponse;
export const ListProjectsLocationsProcessorsProcessorVersionsEvaluationsResponse = GoogleCloudDocumentaiV1ListEvaluationsResponse;

export type ListProjectsLocationsProcessorsProcessorVersionsEvaluationsError = CommonErrors;

export const listProjectsLocationsProcessorsProcessorVersionsEvaluations = API.makePaginated(() => ({
  input: ListProjectsLocationsProcessorsProcessorVersionsEvaluationsRequest,
  output: ListProjectsLocationsProcessorsProcessorVersionsEvaluationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Send a document for Human Review. The input document should be processed by the specified processor. */
export interface ReviewDocumentProjectsLocationsProcessorsHumanReviewConfigRequest {
  /** Required. The resource name of the HumanReviewConfig that the document will be reviewed with. */
  humanReviewConfig: string;
  /** Request body */
  body?: GoogleCloudDocumentaiV1ReviewDocumentRequest;
}

export const ReviewDocumentProjectsLocationsProcessorsHumanReviewConfigRequest = Schema.Struct({
  humanReviewConfig: Schema.String.pipe(T.HttpPath("humanReviewConfig")),
  body: Schema.optional(GoogleCloudDocumentaiV1ReviewDocumentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/processors/{processorsId}/humanReviewConfig:reviewDocument", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ReviewDocumentProjectsLocationsProcessorsHumanReviewConfigRequest>;

export type ReviewDocumentProjectsLocationsProcessorsHumanReviewConfigResponse = GoogleLongrunningOperation;
export const ReviewDocumentProjectsLocationsProcessorsHumanReviewConfigResponse = GoogleLongrunningOperation;

export type ReviewDocumentProjectsLocationsProcessorsHumanReviewConfigError = CommonErrors;

export const reviewDocumentProjectsLocationsProcessorsHumanReviewConfig: API.OperationMethod<ReviewDocumentProjectsLocationsProcessorsHumanReviewConfigRequest, ReviewDocumentProjectsLocationsProcessorsHumanReviewConfigResponse, ReviewDocumentProjectsLocationsProcessorsHumanReviewConfigError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ReviewDocumentProjectsLocationsProcessorsHumanReviewConfigRequest,
  output: ReviewDocumentProjectsLocationsProcessorsHumanReviewConfigResponse,
  errors: [],
}));

/** Lists the processor types that exist. */
export interface ListProjectsLocationsProcessorTypesRequest {
  /** Required. The location of processor types to list. Format: `projects/{project}/locations/{location}`. */
  parent: string;
  /** The maximum number of processor types to return. If unspecified, at most `100` processor types will be returned. The maximum value is `500`. Values above `500` will be coerced to `500`. */
  pageSize?: number;
  /** Used to retrieve the next page of results, empty if at the end of the list. */
  pageToken?: string;
}

export const ListProjectsLocationsProcessorTypesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/processorTypes" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsProcessorTypesRequest>;

export type ListProjectsLocationsProcessorTypesResponse = GoogleCloudDocumentaiV1ListProcessorTypesResponse;
export const ListProjectsLocationsProcessorTypesResponse = GoogleCloudDocumentaiV1ListProcessorTypesResponse;

export type ListProjectsLocationsProcessorTypesError = CommonErrors;

export const listProjectsLocationsProcessorTypes = API.makePaginated(() => ({
  input: ListProjectsLocationsProcessorTypesRequest,
  output: ListProjectsLocationsProcessorTypesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a processor type detail. */
export interface GetProjectsLocationsProcessorTypesRequest {
  /** Required. The processor type resource name. */
  name: string;
}

export const GetProjectsLocationsProcessorTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/processorTypes/{processorTypesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsProcessorTypesRequest>;

export type GetProjectsLocationsProcessorTypesResponse = GoogleCloudDocumentaiV1ProcessorType;
export const GetProjectsLocationsProcessorTypesResponse = GoogleCloudDocumentaiV1ProcessorType;

export type GetProjectsLocationsProcessorTypesError = CommonErrors;

export const getProjectsLocationsProcessorTypes: API.OperationMethod<GetProjectsLocationsProcessorTypesRequest, GetProjectsLocationsProcessorTypesResponse, GetProjectsLocationsProcessorTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsProcessorTypesRequest,
  output: GetProjectsLocationsProcessorTypesResponse,
  errors: [],
}));

/** Creates a schema. */
export interface CreateProjectsLocationsSchemasRequest {
  /** Required. The parent (project and location) under which to create the Schema. Format: `projects/{project}/locations/{location}` */
  parent: string;
  /** Request body */
  body?: GoogleCloudDocumentaiV1NextSchema;
}

export const CreateProjectsLocationsSchemasRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDocumentaiV1NextSchema).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/schemas", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsSchemasRequest>;

export type CreateProjectsLocationsSchemasResponse = GoogleCloudDocumentaiV1NextSchema;
export const CreateProjectsLocationsSchemasResponse = GoogleCloudDocumentaiV1NextSchema;

export type CreateProjectsLocationsSchemasError = CommonErrors;

export const createProjectsLocationsSchemas: API.OperationMethod<CreateProjectsLocationsSchemasRequest, CreateProjectsLocationsSchemasResponse, CreateProjectsLocationsSchemasError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsSchemasRequest,
  output: CreateProjectsLocationsSchemasResponse,
  errors: [],
}));

/** Updates a schema. Editable fields are: - `display_name` - `labels` */
export interface PatchProjectsLocationsSchemasRequest {
  /** Identifier. The resource name of the Schema. Format: `projects/{project}/locations/{location}/schemas/{schema}` */
  name: string;
  /** Optional. The update mask to apply to the resource. **Note:** Only the following fields can be updated: - `display_name` - `labels` */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDocumentaiV1NextSchema;
}

export const PatchProjectsLocationsSchemasRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDocumentaiV1NextSchema).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/schemas/{schemasId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsSchemasRequest>;

export type PatchProjectsLocationsSchemasResponse = GoogleCloudDocumentaiV1NextSchema;
export const PatchProjectsLocationsSchemasResponse = GoogleCloudDocumentaiV1NextSchema;

export type PatchProjectsLocationsSchemasError = CommonErrors;

export const patchProjectsLocationsSchemas: API.OperationMethod<PatchProjectsLocationsSchemasRequest, PatchProjectsLocationsSchemasResponse, PatchProjectsLocationsSchemasError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsSchemasRequest,
  output: PatchProjectsLocationsSchemasResponse,
  errors: [],
}));

/** Deletes a schema. */
export interface DeleteProjectsLocationsSchemasRequest {
  /** Required. The name of the Schema to be deleted. Format: `projects/{project}/locations/{location}/schemas/{schema}` */
  name: string;
  /** Optional. If set to true, any child resources of this Schema will also be deleted. (Otherwise, the request will only work if the Schema has no child resources.) */
  force?: boolean;
}

export const DeleteProjectsLocationsSchemasRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/schemas/{schemasId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsSchemasRequest>;

export type DeleteProjectsLocationsSchemasResponse = GoogleLongrunningOperation;
export const DeleteProjectsLocationsSchemasResponse = GoogleLongrunningOperation;

export type DeleteProjectsLocationsSchemasError = CommonErrors;

export const deleteProjectsLocationsSchemas: API.OperationMethod<DeleteProjectsLocationsSchemasRequest, DeleteProjectsLocationsSchemasResponse, DeleteProjectsLocationsSchemasError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsSchemasRequest,
  output: DeleteProjectsLocationsSchemasResponse,
  errors: [],
}));

/** Lists Schemas. */
export interface ListProjectsLocationsSchemasRequest {
  /** Required. Format: `projects/{project}/locations/{location}` */
  parent: string;
  /** Optional. The maximum number of schema groups to return. If unspecified, at most `10` Schema will be returned. The maximum value is `20`. Values above `20` will be coerced to `20`. */
  pageSize?: number;
  /** Optional. Returns the schema groups sorted by creation time. The page token will point to the next Schema. */
  pageToken?: string;
}

export const ListProjectsLocationsSchemasRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/schemas" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsSchemasRequest>;

export type ListProjectsLocationsSchemasResponse = GoogleCloudDocumentaiV1ListSchemasResponse;
export const ListProjectsLocationsSchemasResponse = GoogleCloudDocumentaiV1ListSchemasResponse;

export type ListProjectsLocationsSchemasError = CommonErrors;

export const listProjectsLocationsSchemas = API.makePaginated(() => ({
  input: ListProjectsLocationsSchemasRequest,
  output: ListProjectsLocationsSchemasResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a schema. */
export interface GetProjectsLocationsSchemasRequest {
  /** Required. The name of the Schema to get. Format: `projects/{project}/locations/{location}/schemas/{schema}` */
  name: string;
}

export const GetProjectsLocationsSchemasRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/schemas/{schemasId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsSchemasRequest>;

export type GetProjectsLocationsSchemasResponse = GoogleCloudDocumentaiV1NextSchema;
export const GetProjectsLocationsSchemasResponse = GoogleCloudDocumentaiV1NextSchema;

export type GetProjectsLocationsSchemasError = CommonErrors;

export const getProjectsLocationsSchemas: API.OperationMethod<GetProjectsLocationsSchemasRequest, GetProjectsLocationsSchemasResponse, GetProjectsLocationsSchemasError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsSchemasRequest,
  output: GetProjectsLocationsSchemasResponse,
  errors: [],
}));

/** Creates a schema version. */
export interface CreateProjectsLocationsSchemasSchemaVersionsRequest {
  /** Required. The parent (project and location) under which to create the SchemaVersion. Format: `projects/{project}/locations/{location}/schemas/{schema}` */
  parent: string;
  /** Request body */
  body?: GoogleCloudDocumentaiV1SchemaVersion;
}

export const CreateProjectsLocationsSchemasSchemaVersionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDocumentaiV1SchemaVersion).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/schemas/{schemasId}/schemaVersions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsSchemasSchemaVersionsRequest>;

export type CreateProjectsLocationsSchemasSchemaVersionsResponse = GoogleCloudDocumentaiV1SchemaVersion;
export const CreateProjectsLocationsSchemasSchemaVersionsResponse = GoogleCloudDocumentaiV1SchemaVersion;

export type CreateProjectsLocationsSchemasSchemaVersionsError = CommonErrors;

export const createProjectsLocationsSchemasSchemaVersions: API.OperationMethod<CreateProjectsLocationsSchemasSchemaVersionsRequest, CreateProjectsLocationsSchemasSchemaVersionsResponse, CreateProjectsLocationsSchemasSchemaVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsSchemasSchemaVersionsRequest,
  output: CreateProjectsLocationsSchemasSchemaVersionsResponse,
  errors: [],
}));

/** Updates a schema version. Editable fields are: - `display_name` - `labels` */
export interface PatchProjectsLocationsSchemasSchemaVersionsRequest {
  /** Identifier. The resource name of the SchemaVersion. Format: `projects/{project}/locations/{location}/schemas/{schema}/schemaVersions/{schema_version}` */
  name: string;
  /** Optional. The update mask to apply to the resource. **Note:** Only the following fields can be updated: - `display_name` - `labels` */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDocumentaiV1SchemaVersion;
}

export const PatchProjectsLocationsSchemasSchemaVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDocumentaiV1SchemaVersion).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/schemas/{schemasId}/schemaVersions/{schemaVersionsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsSchemasSchemaVersionsRequest>;

export type PatchProjectsLocationsSchemasSchemaVersionsResponse = GoogleCloudDocumentaiV1SchemaVersion;
export const PatchProjectsLocationsSchemasSchemaVersionsResponse = GoogleCloudDocumentaiV1SchemaVersion;

export type PatchProjectsLocationsSchemasSchemaVersionsError = CommonErrors;

export const patchProjectsLocationsSchemasSchemaVersions: API.OperationMethod<PatchProjectsLocationsSchemasSchemaVersionsRequest, PatchProjectsLocationsSchemasSchemaVersionsResponse, PatchProjectsLocationsSchemasSchemaVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsSchemasSchemaVersionsRequest,
  output: PatchProjectsLocationsSchemasSchemaVersionsResponse,
  errors: [],
}));

/** Generates a schema version. */
export interface GenerateProjectsLocationsSchemasSchemaVersionsRequest {
  /** Required. The parent (project, location and schema) under which to generate the SchemaVersion. Format: `projects/{project}/locations/{location}/schemas/{schema}` */
  parent: string;
  /** Request body */
  body?: GoogleCloudDocumentaiV1GenerateSchemaVersionRequest;
}

export const GenerateProjectsLocationsSchemasSchemaVersionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDocumentaiV1GenerateSchemaVersionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/schemas/{schemasId}/schemaVersions:generate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GenerateProjectsLocationsSchemasSchemaVersionsRequest>;

export type GenerateProjectsLocationsSchemasSchemaVersionsResponse = GoogleCloudDocumentaiV1GenerateSchemaVersionResponse;
export const GenerateProjectsLocationsSchemasSchemaVersionsResponse = GoogleCloudDocumentaiV1GenerateSchemaVersionResponse;

export type GenerateProjectsLocationsSchemasSchemaVersionsError = CommonErrors;

export const generateProjectsLocationsSchemasSchemaVersions: API.OperationMethod<GenerateProjectsLocationsSchemasSchemaVersionsRequest, GenerateProjectsLocationsSchemasSchemaVersionsResponse, GenerateProjectsLocationsSchemasSchemaVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GenerateProjectsLocationsSchemasSchemaVersionsRequest,
  output: GenerateProjectsLocationsSchemasSchemaVersionsResponse,
  errors: [],
}));

/** Deletes a schema version. */
export interface DeleteProjectsLocationsSchemasSchemaVersionsRequest {
  /** Required. The name of the SchemaVersion to delete. Format: `projects/{project}/locations/{location}/schemas/{schema}/schemaVersions/{schema_version}` */
  name: string;
}

export const DeleteProjectsLocationsSchemasSchemaVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/schemas/{schemasId}/schemaVersions/{schemaVersionsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsSchemasSchemaVersionsRequest>;

export type DeleteProjectsLocationsSchemasSchemaVersionsResponse = GoogleLongrunningOperation;
export const DeleteProjectsLocationsSchemasSchemaVersionsResponse = GoogleLongrunningOperation;

export type DeleteProjectsLocationsSchemasSchemaVersionsError = CommonErrors;

export const deleteProjectsLocationsSchemasSchemaVersions: API.OperationMethod<DeleteProjectsLocationsSchemasSchemaVersionsRequest, DeleteProjectsLocationsSchemasSchemaVersionsResponse, DeleteProjectsLocationsSchemasSchemaVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsSchemasSchemaVersionsRequest,
  output: DeleteProjectsLocationsSchemasSchemaVersionsResponse,
  errors: [],
}));

/** Lists SchemaVersions. */
export interface ListProjectsLocationsSchemasSchemaVersionsRequest {
  /** Required. Format: `projects/{project}/locations/{location}/schemas/{schema}` */
  parent: string;
  /** Optional. The maximum number of SchemaVersion to return. If unspecified, at most `10` SchemaVersion will be returned. The maximum value is `20`. Values above `20` will be coerced to `20`. */
  pageSize?: number;
  /** Optional. Returns the SchemaVersion sorted by creation time. The page token will point to the next SchemaVersion. */
  pageToken?: string;
}

export const ListProjectsLocationsSchemasSchemaVersionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/schemas/{schemasId}/schemaVersions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsSchemasSchemaVersionsRequest>;

export type ListProjectsLocationsSchemasSchemaVersionsResponse = GoogleCloudDocumentaiV1ListSchemaVersionsResponse;
export const ListProjectsLocationsSchemasSchemaVersionsResponse = GoogleCloudDocumentaiV1ListSchemaVersionsResponse;

export type ListProjectsLocationsSchemasSchemaVersionsError = CommonErrors;

export const listProjectsLocationsSchemasSchemaVersions = API.makePaginated(() => ({
  input: ListProjectsLocationsSchemasSchemaVersionsRequest,
  output: ListProjectsLocationsSchemasSchemaVersionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a schema version. */
export interface GetProjectsLocationsSchemasSchemaVersionsRequest {
  /** Required. The name of the SchemaVersion to get. Format: `projects/{project}/locations/{location}/schemas/{schema}/schemaVersions/{schema_version}` */
  name: string;
}

export const GetProjectsLocationsSchemasSchemaVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/schemas/{schemasId}/schemaVersions/{schemaVersionsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsSchemasSchemaVersionsRequest>;

export type GetProjectsLocationsSchemasSchemaVersionsResponse = GoogleCloudDocumentaiV1SchemaVersion;
export const GetProjectsLocationsSchemasSchemaVersionsResponse = GoogleCloudDocumentaiV1SchemaVersion;

export type GetProjectsLocationsSchemasSchemaVersionsError = CommonErrors;

export const getProjectsLocationsSchemasSchemaVersions: API.OperationMethod<GetProjectsLocationsSchemasSchemaVersionsRequest, GetProjectsLocationsSchemasSchemaVersionsResponse, GetProjectsLocationsSchemasSchemaVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsSchemasSchemaVersionsRequest,
  output: GetProjectsLocationsSchemasSchemaVersionsResponse,
  errors: [],
}));

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export interface DeleteOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOperationsRequest>;

export type DeleteOperationsResponse = GoogleProtobufEmpty;
export const DeleteOperationsResponse = GoogleProtobufEmpty;

export type DeleteOperationsError = CommonErrors;

export const deleteOperations: API.OperationMethod<DeleteOperationsRequest, DeleteOperationsResponse, DeleteOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOperationsRequest,
  output: DeleteOperationsResponse,
  errors: [],
}));

