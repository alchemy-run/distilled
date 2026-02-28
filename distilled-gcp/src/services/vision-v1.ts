// ==========================================================================
// Cloud Vision API (vision v1)
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
  name: "vision",
  version: "v1",
  rootUrl: "https://vision.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleCloudVisionV1p3beta1TextAnnotationDetectedBreak {
  /** True if break prepends the element. */
  isPrefix?: boolean;
  /** Detected break type. */
  type?: "UNKNOWN" | "SPACE" | "SURE_SPACE" | "EOL_SURE_SPACE" | "HYPHEN" | "LINE_BREAK" | (string & {});
}

export const GoogleCloudVisionV1p3beta1TextAnnotationDetectedBreak: Schema.Schema<GoogleCloudVisionV1p3beta1TextAnnotationDetectedBreak> = Schema.suspend(() => Schema.Struct({
  isPrefix: Schema.optional(Schema.Boolean),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p3beta1TextAnnotationDetectedBreak" }) as any as Schema.Schema<GoogleCloudVisionV1p3beta1TextAnnotationDetectedBreak>;

export interface Color {
  /** The amount of red in the color as a value in the interval [0, 1]. */
  red?: number;
  /** The amount of blue in the color as a value in the interval [0, 1]. */
  blue?: number;
  /** The amount of green in the color as a value in the interval [0, 1]. */
  green?: number;
  /** The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0). */
  alpha?: number;
}

export const Color: Schema.Schema<Color> = Schema.suspend(() => Schema.Struct({
  red: Schema.optional(Schema.Number),
  blue: Schema.optional(Schema.Number),
  green: Schema.optional(Schema.Number),
  alpha: Schema.optional(Schema.Number),
})).annotate({ identifier: "Color" }) as any as Schema.Schema<Color>;

export interface ColorInfo {
  /** The fraction of pixels the color occupies in the image. Value in range [0, 1]. */
  pixelFraction?: number;
  /** Image-specific score for this color. Value in range [0, 1]. */
  score?: number;
  /** RGB components of the color. */
  color?: Color;
}

export const ColorInfo: Schema.Schema<ColorInfo> = Schema.suspend(() => Schema.Struct({
  pixelFraction: Schema.optional(Schema.Number),
  score: Schema.optional(Schema.Number),
  color: Schema.optional(Color),
})).annotate({ identifier: "ColorInfo" }) as any as Schema.Schema<ColorInfo>;

export interface GoogleCloudVisionV1p4beta1TextAnnotationDetectedBreak {
  /** Detected break type. */
  type?: "UNKNOWN" | "SPACE" | "SURE_SPACE" | "EOL_SURE_SPACE" | "HYPHEN" | "LINE_BREAK" | (string & {});
  /** True if break prepends the element. */
  isPrefix?: boolean;
}

export const GoogleCloudVisionV1p4beta1TextAnnotationDetectedBreak: Schema.Schema<GoogleCloudVisionV1p4beta1TextAnnotationDetectedBreak> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  isPrefix: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudVisionV1p4beta1TextAnnotationDetectedBreak" }) as any as Schema.Schema<GoogleCloudVisionV1p4beta1TextAnnotationDetectedBreak>;

export interface GoogleCloudVisionV1p4beta1TextAnnotationDetectedLanguage {
  /** The BCP-47 language code, such as "en-US" or "sr-Latn". For more information, see http://www.unicode.org/reports/tr35/#Unicode_locale_identifier. */
  languageCode?: string;
  /** Confidence of detected language. Range [0, 1]. */
  confidence?: number;
}

export const GoogleCloudVisionV1p4beta1TextAnnotationDetectedLanguage: Schema.Schema<GoogleCloudVisionV1p4beta1TextAnnotationDetectedLanguage> = Schema.suspend(() => Schema.Struct({
  languageCode: Schema.optional(Schema.String),
  confidence: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVisionV1p4beta1TextAnnotationDetectedLanguage" }) as any as Schema.Schema<GoogleCloudVisionV1p4beta1TextAnnotationDetectedLanguage>;

export interface GoogleCloudVisionV1p4beta1TextAnnotationTextProperty {
  /** Detected start or end of a text segment. */
  detectedBreak?: GoogleCloudVisionV1p4beta1TextAnnotationDetectedBreak;
  /** A list of detected languages together with confidence. */
  detectedLanguages?: Array<GoogleCloudVisionV1p4beta1TextAnnotationDetectedLanguage>;
}

export const GoogleCloudVisionV1p4beta1TextAnnotationTextProperty: Schema.Schema<GoogleCloudVisionV1p4beta1TextAnnotationTextProperty> = Schema.suspend(() => Schema.Struct({
  detectedBreak: Schema.optional(GoogleCloudVisionV1p4beta1TextAnnotationDetectedBreak),
  detectedLanguages: Schema.optional(Schema.Array(GoogleCloudVisionV1p4beta1TextAnnotationDetectedLanguage)),
})).annotate({ identifier: "GoogleCloudVisionV1p4beta1TextAnnotationTextProperty" }) as any as Schema.Schema<GoogleCloudVisionV1p4beta1TextAnnotationTextProperty>;

export interface GoogleCloudVisionV1p1beta1Property {
  /** Name of the property. */
  name?: string;
  /** Value of the property. */
  value?: string;
  /** Value of numeric properties. */
  uint64Value?: string;
}

export const GoogleCloudVisionV1p1beta1Property: Schema.Schema<GoogleCloudVisionV1p1beta1Property> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
  uint64Value: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p1beta1Property" }) as any as Schema.Schema<GoogleCloudVisionV1p1beta1Property>;

export interface GoogleCloudVisionV1p1beta1Vertex {
  /** Y coordinate. */
  y?: number;
  /** X coordinate. */
  x?: number;
}

export const GoogleCloudVisionV1p1beta1Vertex: Schema.Schema<GoogleCloudVisionV1p1beta1Vertex> = Schema.suspend(() => Schema.Struct({
  y: Schema.optional(Schema.Number),
  x: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVisionV1p1beta1Vertex" }) as any as Schema.Schema<GoogleCloudVisionV1p1beta1Vertex>;

export interface GoogleCloudVisionV1p1beta1NormalizedVertex {
  /** Y coordinate. */
  y?: number;
  /** X coordinate. */
  x?: number;
}

export const GoogleCloudVisionV1p1beta1NormalizedVertex: Schema.Schema<GoogleCloudVisionV1p1beta1NormalizedVertex> = Schema.suspend(() => Schema.Struct({
  y: Schema.optional(Schema.Number),
  x: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVisionV1p1beta1NormalizedVertex" }) as any as Schema.Schema<GoogleCloudVisionV1p1beta1NormalizedVertex>;

export interface GoogleCloudVisionV1p1beta1BoundingPoly {
  /** The bounding polygon vertices. */
  vertices?: Array<GoogleCloudVisionV1p1beta1Vertex>;
  /** The bounding polygon normalized vertices. */
  normalizedVertices?: Array<GoogleCloudVisionV1p1beta1NormalizedVertex>;
}

export const GoogleCloudVisionV1p1beta1BoundingPoly: Schema.Schema<GoogleCloudVisionV1p1beta1BoundingPoly> = Schema.suspend(() => Schema.Struct({
  vertices: Schema.optional(Schema.Array(GoogleCloudVisionV1p1beta1Vertex)),
  normalizedVertices: Schema.optional(Schema.Array(GoogleCloudVisionV1p1beta1NormalizedVertex)),
})).annotate({ identifier: "GoogleCloudVisionV1p1beta1BoundingPoly" }) as any as Schema.Schema<GoogleCloudVisionV1p1beta1BoundingPoly>;

export interface LatLng {
  /** The latitude in degrees. It must be in the range [-90.0, +90.0]. */
  latitude?: number;
  /** The longitude in degrees. It must be in the range [-180.0, +180.0]. */
  longitude?: number;
}

export const LatLng: Schema.Schema<LatLng> = Schema.suspend(() => Schema.Struct({
  latitude: Schema.optional(Schema.Number),
  longitude: Schema.optional(Schema.Number),
})).annotate({ identifier: "LatLng" }) as any as Schema.Schema<LatLng>;

export interface GoogleCloudVisionV1p1beta1LocationInfo {
  /** lat/long location coordinates. */
  latLng?: LatLng;
}

export const GoogleCloudVisionV1p1beta1LocationInfo: Schema.Schema<GoogleCloudVisionV1p1beta1LocationInfo> = Schema.suspend(() => Schema.Struct({
  latLng: Schema.optional(LatLng),
})).annotate({ identifier: "GoogleCloudVisionV1p1beta1LocationInfo" }) as any as Schema.Schema<GoogleCloudVisionV1p1beta1LocationInfo>;

export interface GoogleCloudVisionV1p1beta1EntityAnnotation {
  /** Overall score of the result. Range [0, 1]. */
  score?: number;
  /** Entity textual description, expressed in its `locale` language. */
  description?: string;
  /** Image region to which this entity belongs. Not produced for `LABEL_DETECTION` features. */
  boundingPoly?: GoogleCloudVisionV1p1beta1BoundingPoly;
  /** Opaque entity ID. Some IDs may be available in [Google Knowledge Graph Search API](https://developers.google.com/knowledge-graph/). */
  mid?: string;
  /** Some entities may have optional user-supplied `Property` (name/value) fields, such a score or string that qualifies the entity. */
  properties?: Array<GoogleCloudVisionV1p1beta1Property>;
  /** The location information for the detected entity. Multiple `LocationInfo` elements can be present because one location may indicate the location of the scene in the image, and another location may indicate the location of the place where the image was taken. Location information is usually present for landmarks. */
  locations?: Array<GoogleCloudVisionV1p1beta1LocationInfo>;
  /** **Deprecated. Use `score` instead.** The accuracy of the entity detection in an image. For example, for an image in which the "Eiffel Tower" entity is detected, this field represents the confidence that there is a tower in the query image. Range [0, 1]. */
  confidence?: number;
  /** The language code for the locale in which the entity textual `description` is expressed. */
  locale?: string;
  /** The relevancy of the ICA (Image Content Annotation) label to the image. For example, the relevancy of "tower" is likely higher to an image containing the detected "Eiffel Tower" than to an image containing a detected distant towering building, even though the confidence that there is a tower in each image may be the same. Range [0, 1]. */
  topicality?: number;
}

export const GoogleCloudVisionV1p1beta1EntityAnnotation: Schema.Schema<GoogleCloudVisionV1p1beta1EntityAnnotation> = Schema.suspend(() => Schema.Struct({
  score: Schema.optional(Schema.Number),
  description: Schema.optional(Schema.String),
  boundingPoly: Schema.optional(GoogleCloudVisionV1p1beta1BoundingPoly),
  mid: Schema.optional(Schema.String),
  properties: Schema.optional(Schema.Array(GoogleCloudVisionV1p1beta1Property)),
  locations: Schema.optional(Schema.Array(GoogleCloudVisionV1p1beta1LocationInfo)),
  confidence: Schema.optional(Schema.Number),
  locale: Schema.optional(Schema.String),
  topicality: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVisionV1p1beta1EntityAnnotation" }) as any as Schema.Schema<GoogleCloudVisionV1p1beta1EntityAnnotation>;

export interface GoogleCloudVisionV1p1beta1Position {
  /** X coordinate. */
  x?: number;
  /** Y coordinate. */
  y?: number;
  /** Z coordinate (or depth). */
  z?: number;
}

export const GoogleCloudVisionV1p1beta1Position: Schema.Schema<GoogleCloudVisionV1p1beta1Position> = Schema.suspend(() => Schema.Struct({
  x: Schema.optional(Schema.Number),
  y: Schema.optional(Schema.Number),
  z: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVisionV1p1beta1Position" }) as any as Schema.Schema<GoogleCloudVisionV1p1beta1Position>;

export interface GoogleCloudVisionV1p1beta1FaceAnnotationLandmark {
  /** Face landmark type. */
  type?: "UNKNOWN_LANDMARK" | "LEFT_EYE" | "RIGHT_EYE" | "LEFT_OF_LEFT_EYEBROW" | "RIGHT_OF_LEFT_EYEBROW" | "LEFT_OF_RIGHT_EYEBROW" | "RIGHT_OF_RIGHT_EYEBROW" | "MIDPOINT_BETWEEN_EYES" | "NOSE_TIP" | "UPPER_LIP" | "LOWER_LIP" | "MOUTH_LEFT" | "MOUTH_RIGHT" | "MOUTH_CENTER" | "NOSE_BOTTOM_RIGHT" | "NOSE_BOTTOM_LEFT" | "NOSE_BOTTOM_CENTER" | "LEFT_EYE_TOP_BOUNDARY" | "LEFT_EYE_RIGHT_CORNER" | "LEFT_EYE_BOTTOM_BOUNDARY" | "LEFT_EYE_LEFT_CORNER" | "RIGHT_EYE_TOP_BOUNDARY" | "RIGHT_EYE_RIGHT_CORNER" | "RIGHT_EYE_BOTTOM_BOUNDARY" | "RIGHT_EYE_LEFT_CORNER" | "LEFT_EYEBROW_UPPER_MIDPOINT" | "RIGHT_EYEBROW_UPPER_MIDPOINT" | "LEFT_EAR_TRAGION" | "RIGHT_EAR_TRAGION" | "LEFT_EYE_PUPIL" | "RIGHT_EYE_PUPIL" | "FOREHEAD_GLABELLA" | "CHIN_GNATHION" | "CHIN_LEFT_GONION" | "CHIN_RIGHT_GONION" | "LEFT_CHEEK_CENTER" | "RIGHT_CHEEK_CENTER" | (string & {});
  /** Face landmark position. */
  position?: GoogleCloudVisionV1p1beta1Position;
}

export const GoogleCloudVisionV1p1beta1FaceAnnotationLandmark: Schema.Schema<GoogleCloudVisionV1p1beta1FaceAnnotationLandmark> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  position: Schema.optional(GoogleCloudVisionV1p1beta1Position),
})).annotate({ identifier: "GoogleCloudVisionV1p1beta1FaceAnnotationLandmark" }) as any as Schema.Schema<GoogleCloudVisionV1p1beta1FaceAnnotationLandmark>;

export interface GoogleCloudVisionV1p1beta1FaceAnnotation {
  /** The `fd_bounding_poly` bounding polygon is tighter than the `boundingPoly`, and encloses only the skin part of the face. Typically, it is used to eliminate the face from any image analysis that detects the "amount of skin" visible in an image. It is not based on the landmarker results, only on the initial face detection, hence the fd (face detection) prefix. */
  fdBoundingPoly?: GoogleCloudVisionV1p1beta1BoundingPoly;
  /** Anger likelihood. */
  angerLikelihood?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** Pitch angle, which indicates the upwards/downwards angle that the face is pointing relative to the image's horizontal plane. Range [-180,180]. */
  tiltAngle?: number;
  /** Detected face landmarks. */
  landmarks?: Array<GoogleCloudVisionV1p1beta1FaceAnnotationLandmark>;
  /** Face landmarking confidence. Range [0, 1]. */
  landmarkingConfidence?: number;
  /** Sorrow likelihood. */
  sorrowLikelihood?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** The bounding polygon around the face. The coordinates of the bounding box are in the original image's scale. The bounding box is computed to "frame" the face in accordance with human expectations. It is based on the landmarker results. Note that one or more x and/or y coordinates may not be generated in the `BoundingPoly` (the polygon will be unbounded) if only a partial face appears in the image to be annotated. */
  boundingPoly?: GoogleCloudVisionV1p1beta1BoundingPoly;
  /** Surprise likelihood. */
  surpriseLikelihood?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** Joy likelihood. */
  joyLikelihood?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** Blurred likelihood. */
  blurredLikelihood?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** Yaw angle, which indicates the leftward/rightward angle that the face is pointing relative to the vertical plane perpendicular to the image. Range [-180,180]. */
  panAngle?: number;
  /** Headwear likelihood. */
  headwearLikelihood?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** Roll angle, which indicates the amount of clockwise/anti-clockwise rotation of the face relative to the image vertical about the axis perpendicular to the face. Range [-180,180]. */
  rollAngle?: number;
  /** Detection confidence. Range [0, 1]. */
  detectionConfidence?: number;
  /** Under-exposed likelihood. */
  underExposedLikelihood?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
}

export const GoogleCloudVisionV1p1beta1FaceAnnotation: Schema.Schema<GoogleCloudVisionV1p1beta1FaceAnnotation> = Schema.suspend(() => Schema.Struct({
  fdBoundingPoly: Schema.optional(GoogleCloudVisionV1p1beta1BoundingPoly),
  angerLikelihood: Schema.optional(Schema.String),
  tiltAngle: Schema.optional(Schema.Number),
  landmarks: Schema.optional(Schema.Array(GoogleCloudVisionV1p1beta1FaceAnnotationLandmark)),
  landmarkingConfidence: Schema.optional(Schema.Number),
  sorrowLikelihood: Schema.optional(Schema.String),
  boundingPoly: Schema.optional(GoogleCloudVisionV1p1beta1BoundingPoly),
  surpriseLikelihood: Schema.optional(Schema.String),
  joyLikelihood: Schema.optional(Schema.String),
  blurredLikelihood: Schema.optional(Schema.String),
  panAngle: Schema.optional(Schema.Number),
  headwearLikelihood: Schema.optional(Schema.String),
  rollAngle: Schema.optional(Schema.Number),
  detectionConfidence: Schema.optional(Schema.Number),
  underExposedLikelihood: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p1beta1FaceAnnotation" }) as any as Schema.Schema<GoogleCloudVisionV1p1beta1FaceAnnotation>;

export interface GoogleCloudVisionV1p1beta1ColorInfo {
  /** The fraction of pixels the color occupies in the image. Value in range [0, 1]. */
  pixelFraction?: number;
  /** RGB components of the color. */
  color?: Color;
  /** Image-specific score for this color. Value in range [0, 1]. */
  score?: number;
}

export const GoogleCloudVisionV1p1beta1ColorInfo: Schema.Schema<GoogleCloudVisionV1p1beta1ColorInfo> = Schema.suspend(() => Schema.Struct({
  pixelFraction: Schema.optional(Schema.Number),
  color: Schema.optional(Color),
  score: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVisionV1p1beta1ColorInfo" }) as any as Schema.Schema<GoogleCloudVisionV1p1beta1ColorInfo>;

export interface GoogleCloudVisionV1p1beta1DominantColorsAnnotation {
  /** RGB color values with their score and pixel fraction. */
  colors?: Array<GoogleCloudVisionV1p1beta1ColorInfo>;
}

export const GoogleCloudVisionV1p1beta1DominantColorsAnnotation: Schema.Schema<GoogleCloudVisionV1p1beta1DominantColorsAnnotation> = Schema.suspend(() => Schema.Struct({
  colors: Schema.optional(Schema.Array(GoogleCloudVisionV1p1beta1ColorInfo)),
})).annotate({ identifier: "GoogleCloudVisionV1p1beta1DominantColorsAnnotation" }) as any as Schema.Schema<GoogleCloudVisionV1p1beta1DominantColorsAnnotation>;

export interface GoogleCloudVisionV1p1beta1ImageProperties {
  /** If present, dominant colors completed successfully. */
  dominantColors?: GoogleCloudVisionV1p1beta1DominantColorsAnnotation;
}

export const GoogleCloudVisionV1p1beta1ImageProperties: Schema.Schema<GoogleCloudVisionV1p1beta1ImageProperties> = Schema.suspend(() => Schema.Struct({
  dominantColors: Schema.optional(GoogleCloudVisionV1p1beta1DominantColorsAnnotation),
})).annotate({ identifier: "GoogleCloudVisionV1p1beta1ImageProperties" }) as any as Schema.Schema<GoogleCloudVisionV1p1beta1ImageProperties>;

export interface GoogleCloudVisionV1p1beta1ProductKeyValue {
  /** The key of the label attached to the product. Cannot be empty and cannot exceed 128 bytes. */
  key?: string;
  /** The value of the label attached to the product. Cannot be empty and cannot exceed 128 bytes. */
  value?: string;
}

export const GoogleCloudVisionV1p1beta1ProductKeyValue: Schema.Schema<GoogleCloudVisionV1p1beta1ProductKeyValue> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p1beta1ProductKeyValue" }) as any as Schema.Schema<GoogleCloudVisionV1p1beta1ProductKeyValue>;

export interface GoogleCloudVisionV1p1beta1Product {
  /** Immutable. The category for the product identified by the reference image. This should be one of "homegoods-v2", "apparel-v2", "toys-v2", "packagedgoods-v1" or "general-v1". The legacy categories "homegoods", "apparel", and "toys" are still supported, but these should not be used for new products. */
  productCategory?: string;
  /** Key-value pairs that can be attached to a product. At query time, constraints can be specified based on the product_labels. Note that integer values can be provided as strings, e.g. "1199". Only strings with integer values can match a range-based restriction which is to be supported soon. Multiple values can be assigned to the same key. One product may have up to 500 product_labels. Notice that the total number of distinct product_labels over all products in one ProductSet cannot exceed 1M, otherwise the product search pipeline will refuse to work for that ProductSet. */
  productLabels?: Array<GoogleCloudVisionV1p1beta1ProductKeyValue>;
  /** User-provided metadata to be stored with this product. Must be at most 4096 characters long. */
  description?: string;
  /** The user-provided name for this Product. Must not be empty. Must be at most 4096 characters long. */
  displayName?: string;
  /** The resource name of the product. Format is: `projects/PROJECT_ID/locations/LOC_ID/products/PRODUCT_ID`. This field is ignored when creating a product. */
  name?: string;
}

export const GoogleCloudVisionV1p1beta1Product: Schema.Schema<GoogleCloudVisionV1p1beta1Product> = Schema.suspend(() => Schema.Struct({
  productCategory: Schema.optional(Schema.String),
  productLabels: Schema.optional(Schema.Array(GoogleCloudVisionV1p1beta1ProductKeyValue)),
  description: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p1beta1Product" }) as any as Schema.Schema<GoogleCloudVisionV1p1beta1Product>;

export interface GoogleCloudVisionV1p1beta1ProductSearchResultsResult {
  /** A confidence level on the match, ranging from 0 (no confidence) to 1 (full confidence). */
  score?: number;
  /** The Product. */
  product?: GoogleCloudVisionV1p1beta1Product;
  /** The resource name of the image from the product that is the closest match to the query. */
  image?: string;
}

export const GoogleCloudVisionV1p1beta1ProductSearchResultsResult: Schema.Schema<GoogleCloudVisionV1p1beta1ProductSearchResultsResult> = Schema.suspend(() => Schema.Struct({
  score: Schema.optional(Schema.Number),
  product: Schema.optional(GoogleCloudVisionV1p1beta1Product),
  image: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p1beta1ProductSearchResultsResult" }) as any as Schema.Schema<GoogleCloudVisionV1p1beta1ProductSearchResultsResult>;

export interface GoogleCloudVisionV1p1beta1ProductSearchResultsObjectAnnotation {
  /** Object name, expressed in its `language_code` language. */
  name?: string;
  /** Score of the result. Range [0, 1]. */
  score?: number;
  /** The BCP-47 language code, such as "en-US" or "sr-Latn". For more information, see http://www.unicode.org/reports/tr35/#Unicode_locale_identifier. */
  languageCode?: string;
  /** Object ID that should align with EntityAnnotation mid. */
  mid?: string;
}

export const GoogleCloudVisionV1p1beta1ProductSearchResultsObjectAnnotation: Schema.Schema<GoogleCloudVisionV1p1beta1ProductSearchResultsObjectAnnotation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  score: Schema.optional(Schema.Number),
  languageCode: Schema.optional(Schema.String),
  mid: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p1beta1ProductSearchResultsObjectAnnotation" }) as any as Schema.Schema<GoogleCloudVisionV1p1beta1ProductSearchResultsObjectAnnotation>;

export interface GoogleCloudVisionV1p1beta1ProductSearchResultsGroupedResult {
  /** List of results, one for each product match. */
  results?: Array<GoogleCloudVisionV1p1beta1ProductSearchResultsResult>;
  /** List of generic predictions for the object in the bounding box. */
  objectAnnotations?: Array<GoogleCloudVisionV1p1beta1ProductSearchResultsObjectAnnotation>;
  /** The bounding polygon around the product detected in the query image. */
  boundingPoly?: GoogleCloudVisionV1p1beta1BoundingPoly;
}

export const GoogleCloudVisionV1p1beta1ProductSearchResultsGroupedResult: Schema.Schema<GoogleCloudVisionV1p1beta1ProductSearchResultsGroupedResult> = Schema.suspend(() => Schema.Struct({
  results: Schema.optional(Schema.Array(GoogleCloudVisionV1p1beta1ProductSearchResultsResult)),
  objectAnnotations: Schema.optional(Schema.Array(GoogleCloudVisionV1p1beta1ProductSearchResultsObjectAnnotation)),
  boundingPoly: Schema.optional(GoogleCloudVisionV1p1beta1BoundingPoly),
})).annotate({ identifier: "GoogleCloudVisionV1p1beta1ProductSearchResultsGroupedResult" }) as any as Schema.Schema<GoogleCloudVisionV1p1beta1ProductSearchResultsGroupedResult>;

export interface GoogleCloudVisionV1p1beta1ProductSearchResults {
  /** List of results, one for each product match. */
  results?: Array<GoogleCloudVisionV1p1beta1ProductSearchResultsResult>;
  /** List of results grouped by products detected in the query image. Each entry corresponds to one bounding polygon in the query image, and contains the matching products specific to that region. There may be duplicate product matches in the union of all the per-product results. */
  productGroupedResults?: Array<GoogleCloudVisionV1p1beta1ProductSearchResultsGroupedResult>;
  /** Timestamp of the index which provided these results. Products added to the product set and products removed from the product set after this time are not reflected in the current results. */
  indexTime?: string;
}

export const GoogleCloudVisionV1p1beta1ProductSearchResults: Schema.Schema<GoogleCloudVisionV1p1beta1ProductSearchResults> = Schema.suspend(() => Schema.Struct({
  results: Schema.optional(Schema.Array(GoogleCloudVisionV1p1beta1ProductSearchResultsResult)),
  productGroupedResults: Schema.optional(Schema.Array(GoogleCloudVisionV1p1beta1ProductSearchResultsGroupedResult)),
  indexTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p1beta1ProductSearchResults" }) as any as Schema.Schema<GoogleCloudVisionV1p1beta1ProductSearchResults>;

export interface GoogleCloudVisionV1p1beta1TextAnnotationDetectedLanguage {
  /** The BCP-47 language code, such as "en-US" or "sr-Latn". For more information, see http://www.unicode.org/reports/tr35/#Unicode_locale_identifier. */
  languageCode?: string;
  /** Confidence of detected language. Range [0, 1]. */
  confidence?: number;
}

export const GoogleCloudVisionV1p1beta1TextAnnotationDetectedLanguage: Schema.Schema<GoogleCloudVisionV1p1beta1TextAnnotationDetectedLanguage> = Schema.suspend(() => Schema.Struct({
  languageCode: Schema.optional(Schema.String),
  confidence: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVisionV1p1beta1TextAnnotationDetectedLanguage" }) as any as Schema.Schema<GoogleCloudVisionV1p1beta1TextAnnotationDetectedLanguage>;

export interface GoogleCloudVisionV1p1beta1TextAnnotationDetectedBreak {
  /** Detected break type. */
  type?: "UNKNOWN" | "SPACE" | "SURE_SPACE" | "EOL_SURE_SPACE" | "HYPHEN" | "LINE_BREAK" | (string & {});
  /** True if break prepends the element. */
  isPrefix?: boolean;
}

export const GoogleCloudVisionV1p1beta1TextAnnotationDetectedBreak: Schema.Schema<GoogleCloudVisionV1p1beta1TextAnnotationDetectedBreak> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  isPrefix: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudVisionV1p1beta1TextAnnotationDetectedBreak" }) as any as Schema.Schema<GoogleCloudVisionV1p1beta1TextAnnotationDetectedBreak>;

export interface GoogleCloudVisionV1p1beta1TextAnnotationTextProperty {
  /** A list of detected languages together with confidence. */
  detectedLanguages?: Array<GoogleCloudVisionV1p1beta1TextAnnotationDetectedLanguage>;
  /** Detected start or end of a text segment. */
  detectedBreak?: GoogleCloudVisionV1p1beta1TextAnnotationDetectedBreak;
}

export const GoogleCloudVisionV1p1beta1TextAnnotationTextProperty: Schema.Schema<GoogleCloudVisionV1p1beta1TextAnnotationTextProperty> = Schema.suspend(() => Schema.Struct({
  detectedLanguages: Schema.optional(Schema.Array(GoogleCloudVisionV1p1beta1TextAnnotationDetectedLanguage)),
  detectedBreak: Schema.optional(GoogleCloudVisionV1p1beta1TextAnnotationDetectedBreak),
})).annotate({ identifier: "GoogleCloudVisionV1p1beta1TextAnnotationTextProperty" }) as any as Schema.Schema<GoogleCloudVisionV1p1beta1TextAnnotationTextProperty>;

export interface GoogleCloudVisionV1p1beta1Symbol {
  /** Additional information detected for the symbol. */
  property?: GoogleCloudVisionV1p1beta1TextAnnotationTextProperty;
  /** Confidence of the OCR results for the symbol. Range [0, 1]. */
  confidence?: number;
  /** The bounding box for the symbol. The vertices are in the order of top-left, top-right, bottom-right, bottom-left. When a rotation of the bounding box is detected the rotation is represented as around the top-left corner as defined when the text is read in the 'natural' orientation. For example: * when the text is horizontal it might look like: 0----1 | | 3----2 * when it's rotated 180 degrees around the top-left corner it becomes: 2----3 | | 1----0 and the vertex order will still be (0, 1, 2, 3). */
  boundingBox?: GoogleCloudVisionV1p1beta1BoundingPoly;
  /** The actual UTF-8 representation of the symbol. */
  text?: string;
}

export const GoogleCloudVisionV1p1beta1Symbol: Schema.Schema<GoogleCloudVisionV1p1beta1Symbol> = Schema.suspend(() => Schema.Struct({
  property: Schema.optional(GoogleCloudVisionV1p1beta1TextAnnotationTextProperty),
  confidence: Schema.optional(Schema.Number),
  boundingBox: Schema.optional(GoogleCloudVisionV1p1beta1BoundingPoly),
  text: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p1beta1Symbol" }) as any as Schema.Schema<GoogleCloudVisionV1p1beta1Symbol>;

export interface GoogleCloudVisionV1p1beta1Word {
  /** List of symbols in the word. The order of the symbols follows the natural reading order. */
  symbols?: Array<GoogleCloudVisionV1p1beta1Symbol>;
  /** Additional information detected for the word. */
  property?: GoogleCloudVisionV1p1beta1TextAnnotationTextProperty;
  /** The bounding box for the word. The vertices are in the order of top-left, top-right, bottom-right, bottom-left. When a rotation of the bounding box is detected the rotation is represented as around the top-left corner as defined when the text is read in the 'natural' orientation. For example: * when the text is horizontal it might look like: 0----1 | | 3----2 * when it's rotated 180 degrees around the top-left corner it becomes: 2----3 | | 1----0 and the vertex order will still be (0, 1, 2, 3). */
  boundingBox?: GoogleCloudVisionV1p1beta1BoundingPoly;
  /** Confidence of the OCR results for the word. Range [0, 1]. */
  confidence?: number;
}

export const GoogleCloudVisionV1p1beta1Word: Schema.Schema<GoogleCloudVisionV1p1beta1Word> = Schema.suspend(() => Schema.Struct({
  symbols: Schema.optional(Schema.Array(GoogleCloudVisionV1p1beta1Symbol)),
  property: Schema.optional(GoogleCloudVisionV1p1beta1TextAnnotationTextProperty),
  boundingBox: Schema.optional(GoogleCloudVisionV1p1beta1BoundingPoly),
  confidence: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVisionV1p1beta1Word" }) as any as Schema.Schema<GoogleCloudVisionV1p1beta1Word>;

export interface GoogleCloudVisionV1p1beta1Paragraph {
  /** Confidence of the OCR results for the paragraph. Range [0, 1]. */
  confidence?: number;
  /** The bounding box for the paragraph. The vertices are in the order of top-left, top-right, bottom-right, bottom-left. When a rotation of the bounding box is detected the rotation is represented as around the top-left corner as defined when the text is read in the 'natural' orientation. For example: * when the text is horizontal it might look like: 0----1 | | 3----2 * when it's rotated 180 degrees around the top-left corner it becomes: 2----3 | | 1----0 and the vertex order will still be (0, 1, 2, 3). */
  boundingBox?: GoogleCloudVisionV1p1beta1BoundingPoly;
  /** List of all words in this paragraph. */
  words?: Array<GoogleCloudVisionV1p1beta1Word>;
  /** Additional information detected for the paragraph. */
  property?: GoogleCloudVisionV1p1beta1TextAnnotationTextProperty;
}

export const GoogleCloudVisionV1p1beta1Paragraph: Schema.Schema<GoogleCloudVisionV1p1beta1Paragraph> = Schema.suspend(() => Schema.Struct({
  confidence: Schema.optional(Schema.Number),
  boundingBox: Schema.optional(GoogleCloudVisionV1p1beta1BoundingPoly),
  words: Schema.optional(Schema.Array(GoogleCloudVisionV1p1beta1Word)),
  property: Schema.optional(GoogleCloudVisionV1p1beta1TextAnnotationTextProperty),
})).annotate({ identifier: "GoogleCloudVisionV1p1beta1Paragraph" }) as any as Schema.Schema<GoogleCloudVisionV1p1beta1Paragraph>;

export interface GoogleCloudVisionV1p1beta1Block {
  /** The bounding box for the block. The vertices are in the order of top-left, top-right, bottom-right, bottom-left. When a rotation of the bounding box is detected the rotation is represented as around the top-left corner as defined when the text is read in the 'natural' orientation. For example: * when the text is horizontal it might look like: 0----1 | | 3----2 * when it's rotated 180 degrees around the top-left corner it becomes: 2----3 | | 1----0 and the vertex order will still be (0, 1, 2, 3). */
  boundingBox?: GoogleCloudVisionV1p1beta1BoundingPoly;
  /** Additional information detected for the block. */
  property?: GoogleCloudVisionV1p1beta1TextAnnotationTextProperty;
  /** Confidence of the OCR results on the block. Range [0, 1]. */
  confidence?: number;
  /** List of paragraphs in this block (if this blocks is of type text). */
  paragraphs?: Array<GoogleCloudVisionV1p1beta1Paragraph>;
  /** Detected block type (text, image etc) for this block. */
  blockType?: "UNKNOWN" | "TEXT" | "TABLE" | "PICTURE" | "RULER" | "BARCODE" | (string & {});
}

export const GoogleCloudVisionV1p1beta1Block: Schema.Schema<GoogleCloudVisionV1p1beta1Block> = Schema.suspend(() => Schema.Struct({
  boundingBox: Schema.optional(GoogleCloudVisionV1p1beta1BoundingPoly),
  property: Schema.optional(GoogleCloudVisionV1p1beta1TextAnnotationTextProperty),
  confidence: Schema.optional(Schema.Number),
  paragraphs: Schema.optional(Schema.Array(GoogleCloudVisionV1p1beta1Paragraph)),
  blockType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p1beta1Block" }) as any as Schema.Schema<GoogleCloudVisionV1p1beta1Block>;

export interface GoogleCloudVisionV1p1beta1Page {
  /** Confidence of the OCR results on the page. Range [0, 1]. */
  confidence?: number;
  /** Page height. For PDFs the unit is points. For images (including TIFFs) the unit is pixels. */
  height?: number;
  /** Additional information detected on the page. */
  property?: GoogleCloudVisionV1p1beta1TextAnnotationTextProperty;
  /** List of blocks of text, images etc on this page. */
  blocks?: Array<GoogleCloudVisionV1p1beta1Block>;
  /** Page width. For PDFs the unit is points. For images (including TIFFs) the unit is pixels. */
  width?: number;
}

export const GoogleCloudVisionV1p1beta1Page: Schema.Schema<GoogleCloudVisionV1p1beta1Page> = Schema.suspend(() => Schema.Struct({
  confidence: Schema.optional(Schema.Number),
  height: Schema.optional(Schema.Number),
  property: Schema.optional(GoogleCloudVisionV1p1beta1TextAnnotationTextProperty),
  blocks: Schema.optional(Schema.Array(GoogleCloudVisionV1p1beta1Block)),
  width: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVisionV1p1beta1Page" }) as any as Schema.Schema<GoogleCloudVisionV1p1beta1Page>;

export interface GoogleCloudVisionV1p1beta1TextAnnotation {
  /** List of pages detected by OCR. */
  pages?: Array<GoogleCloudVisionV1p1beta1Page>;
  /** UTF-8 text detected on the pages. */
  text?: string;
}

export const GoogleCloudVisionV1p1beta1TextAnnotation: Schema.Schema<GoogleCloudVisionV1p1beta1TextAnnotation> = Schema.suspend(() => Schema.Struct({
  pages: Schema.optional(Schema.Array(GoogleCloudVisionV1p1beta1Page)),
  text: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p1beta1TextAnnotation" }) as any as Schema.Schema<GoogleCloudVisionV1p1beta1TextAnnotation>;

export interface Status {
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
}

export const Status: Schema.Schema<Status> = Schema.suspend(() => Schema.Struct({
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
  code: Schema.optional(Schema.Number),
  message: Schema.optional(Schema.String),
})).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface GoogleCloudVisionV1p1beta1LocalizedObjectAnnotation {
  /** Object name, expressed in its `language_code` language. */
  name?: string;
  /** Object ID that should align with EntityAnnotation mid. */
  mid?: string;
  /** The BCP-47 language code, such as "en-US" or "sr-Latn". For more information, see http://www.unicode.org/reports/tr35/#Unicode_locale_identifier. */
  languageCode?: string;
  /** Image region to which this object belongs. This must be populated. */
  boundingPoly?: GoogleCloudVisionV1p1beta1BoundingPoly;
  /** Score of the result. Range [0, 1]. */
  score?: number;
}

export const GoogleCloudVisionV1p1beta1LocalizedObjectAnnotation: Schema.Schema<GoogleCloudVisionV1p1beta1LocalizedObjectAnnotation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  mid: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
  boundingPoly: Schema.optional(GoogleCloudVisionV1p1beta1BoundingPoly),
  score: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVisionV1p1beta1LocalizedObjectAnnotation" }) as any as Schema.Schema<GoogleCloudVisionV1p1beta1LocalizedObjectAnnotation>;

export interface GoogleCloudVisionV1p1beta1SafeSearchAnnotation {
  /** Represents the adult content likelihood for the image. Adult content may contain elements such as nudity, pornographic images or cartoons, or sexual activities. */
  adult?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** Likelihood that the request image contains racy content. Racy content may include (but is not limited to) skimpy or sheer clothing, strategically covered nudity, lewd or provocative poses, or close-ups of sensitive body areas. */
  racy?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** Likelihood that this is a medical image. */
  medical?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** Spoof likelihood. The likelihood that an modification was made to the image's canonical version to make it appear funny or offensive. */
  spoof?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** Likelihood that this image contains violent content. Violent content may include death, serious harm, or injury to individuals or groups of individuals. */
  violence?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
}

export const GoogleCloudVisionV1p1beta1SafeSearchAnnotation: Schema.Schema<GoogleCloudVisionV1p1beta1SafeSearchAnnotation> = Schema.suspend(() => Schema.Struct({
  adult: Schema.optional(Schema.String),
  racy: Schema.optional(Schema.String),
  medical: Schema.optional(Schema.String),
  spoof: Schema.optional(Schema.String),
  violence: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p1beta1SafeSearchAnnotation" }) as any as Schema.Schema<GoogleCloudVisionV1p1beta1SafeSearchAnnotation>;

export interface GoogleCloudVisionV1p1beta1ImageAnnotationContext {
  /** If the file was a PDF or TIFF, this field gives the page number within the file used to produce the image. */
  pageNumber?: number;
  /** The URI of the file used to produce the image. */
  uri?: string;
}

export const GoogleCloudVisionV1p1beta1ImageAnnotationContext: Schema.Schema<GoogleCloudVisionV1p1beta1ImageAnnotationContext> = Schema.suspend(() => Schema.Struct({
  pageNumber: Schema.optional(Schema.Number),
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p1beta1ImageAnnotationContext" }) as any as Schema.Schema<GoogleCloudVisionV1p1beta1ImageAnnotationContext>;

export interface GoogleCloudVisionV1p1beta1CropHint {
  /** Fraction of importance of this salient region with respect to the original image. */
  importanceFraction?: number;
  /** Confidence of this being a salient region. Range [0, 1]. */
  confidence?: number;
  /** The bounding polygon for the crop region. The coordinates of the bounding box are in the original image's scale. */
  boundingPoly?: GoogleCloudVisionV1p1beta1BoundingPoly;
}

export const GoogleCloudVisionV1p1beta1CropHint: Schema.Schema<GoogleCloudVisionV1p1beta1CropHint> = Schema.suspend(() => Schema.Struct({
  importanceFraction: Schema.optional(Schema.Number),
  confidence: Schema.optional(Schema.Number),
  boundingPoly: Schema.optional(GoogleCloudVisionV1p1beta1BoundingPoly),
})).annotate({ identifier: "GoogleCloudVisionV1p1beta1CropHint" }) as any as Schema.Schema<GoogleCloudVisionV1p1beta1CropHint>;

export interface GoogleCloudVisionV1p1beta1CropHintsAnnotation {
  /** Crop hint results. */
  cropHints?: Array<GoogleCloudVisionV1p1beta1CropHint>;
}

export const GoogleCloudVisionV1p1beta1CropHintsAnnotation: Schema.Schema<GoogleCloudVisionV1p1beta1CropHintsAnnotation> = Schema.suspend(() => Schema.Struct({
  cropHints: Schema.optional(Schema.Array(GoogleCloudVisionV1p1beta1CropHint)),
})).annotate({ identifier: "GoogleCloudVisionV1p1beta1CropHintsAnnotation" }) as any as Schema.Schema<GoogleCloudVisionV1p1beta1CropHintsAnnotation>;

export interface GoogleCloudVisionV1p1beta1WebDetectionWebImage {
  /** (Deprecated) Overall relevancy score for the image. */
  score?: number;
  /** The result image URL. */
  url?: string;
}

export const GoogleCloudVisionV1p1beta1WebDetectionWebImage: Schema.Schema<GoogleCloudVisionV1p1beta1WebDetectionWebImage> = Schema.suspend(() => Schema.Struct({
  score: Schema.optional(Schema.Number),
  url: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p1beta1WebDetectionWebImage" }) as any as Schema.Schema<GoogleCloudVisionV1p1beta1WebDetectionWebImage>;

export interface GoogleCloudVisionV1p1beta1WebDetectionWebLabel {
  /** Label for extra metadata. */
  label?: string;
  /** The BCP-47 language code for `label`, such as "en-US" or "sr-Latn". For more information, see http://www.unicode.org/reports/tr35/#Unicode_locale_identifier. */
  languageCode?: string;
}

export const GoogleCloudVisionV1p1beta1WebDetectionWebLabel: Schema.Schema<GoogleCloudVisionV1p1beta1WebDetectionWebLabel> = Schema.suspend(() => Schema.Struct({
  label: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p1beta1WebDetectionWebLabel" }) as any as Schema.Schema<GoogleCloudVisionV1p1beta1WebDetectionWebLabel>;

export interface GoogleCloudVisionV1p1beta1WebDetectionWebEntity {
  /** Overall relevancy score for the entity. Not normalized and not comparable across different image queries. */
  score?: number;
  /** Canonical description of the entity, in English. */
  description?: string;
  /** Opaque entity ID. */
  entityId?: string;
}

export const GoogleCloudVisionV1p1beta1WebDetectionWebEntity: Schema.Schema<GoogleCloudVisionV1p1beta1WebDetectionWebEntity> = Schema.suspend(() => Schema.Struct({
  score: Schema.optional(Schema.Number),
  description: Schema.optional(Schema.String),
  entityId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p1beta1WebDetectionWebEntity" }) as any as Schema.Schema<GoogleCloudVisionV1p1beta1WebDetectionWebEntity>;

export interface GoogleCloudVisionV1p1beta1WebDetectionWebPage {
  /** The result web page URL. */
  url?: string;
  /** (Deprecated) Overall relevancy score for the web page. */
  score?: number;
  /** Fully matching images on the page. Can include resized copies of the query image. */
  fullMatchingImages?: Array<GoogleCloudVisionV1p1beta1WebDetectionWebImage>;
  /** Partial matching images on the page. Those images are similar enough to share some key-point features. For example an original image will likely have partial matching for its crops. */
  partialMatchingImages?: Array<GoogleCloudVisionV1p1beta1WebDetectionWebImage>;
  /** Title for the web page, may contain HTML markups. */
  pageTitle?: string;
}

export const GoogleCloudVisionV1p1beta1WebDetectionWebPage: Schema.Schema<GoogleCloudVisionV1p1beta1WebDetectionWebPage> = Schema.suspend(() => Schema.Struct({
  url: Schema.optional(Schema.String),
  score: Schema.optional(Schema.Number),
  fullMatchingImages: Schema.optional(Schema.Array(GoogleCloudVisionV1p1beta1WebDetectionWebImage)),
  partialMatchingImages: Schema.optional(Schema.Array(GoogleCloudVisionV1p1beta1WebDetectionWebImage)),
  pageTitle: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p1beta1WebDetectionWebPage" }) as any as Schema.Schema<GoogleCloudVisionV1p1beta1WebDetectionWebPage>;

export interface GoogleCloudVisionV1p1beta1WebDetection {
  /** The visually similar image results. */
  visuallySimilarImages?: Array<GoogleCloudVisionV1p1beta1WebDetectionWebImage>;
  /** The service's best guess as to the topic of the request image. Inferred from similar images on the open web. */
  bestGuessLabels?: Array<GoogleCloudVisionV1p1beta1WebDetectionWebLabel>;
  /** Deduced entities from similar images on the Internet. */
  webEntities?: Array<GoogleCloudVisionV1p1beta1WebDetectionWebEntity>;
  /** Fully matching images from the Internet. Can include resized copies of the query image. */
  fullMatchingImages?: Array<GoogleCloudVisionV1p1beta1WebDetectionWebImage>;
  /** Partial matching images from the Internet. Those images are similar enough to share some key-point features. For example an original image will likely have partial matching for its crops. */
  partialMatchingImages?: Array<GoogleCloudVisionV1p1beta1WebDetectionWebImage>;
  /** Web pages containing the matching images from the Internet. */
  pagesWithMatchingImages?: Array<GoogleCloudVisionV1p1beta1WebDetectionWebPage>;
}

export const GoogleCloudVisionV1p1beta1WebDetection: Schema.Schema<GoogleCloudVisionV1p1beta1WebDetection> = Schema.suspend(() => Schema.Struct({
  visuallySimilarImages: Schema.optional(Schema.Array(GoogleCloudVisionV1p1beta1WebDetectionWebImage)),
  bestGuessLabels: Schema.optional(Schema.Array(GoogleCloudVisionV1p1beta1WebDetectionWebLabel)),
  webEntities: Schema.optional(Schema.Array(GoogleCloudVisionV1p1beta1WebDetectionWebEntity)),
  fullMatchingImages: Schema.optional(Schema.Array(GoogleCloudVisionV1p1beta1WebDetectionWebImage)),
  partialMatchingImages: Schema.optional(Schema.Array(GoogleCloudVisionV1p1beta1WebDetectionWebImage)),
  pagesWithMatchingImages: Schema.optional(Schema.Array(GoogleCloudVisionV1p1beta1WebDetectionWebPage)),
})).annotate({ identifier: "GoogleCloudVisionV1p1beta1WebDetection" }) as any as Schema.Schema<GoogleCloudVisionV1p1beta1WebDetection>;

export interface GoogleCloudVisionV1p1beta1AnnotateImageResponse {
  /** If present, text (OCR) detection has completed successfully. */
  textAnnotations?: Array<GoogleCloudVisionV1p1beta1EntityAnnotation>;
  /** If present, face detection has completed successfully. */
  faceAnnotations?: Array<GoogleCloudVisionV1p1beta1FaceAnnotation>;
  /** If present, image properties were extracted successfully. */
  imagePropertiesAnnotation?: GoogleCloudVisionV1p1beta1ImageProperties;
  /** If present, product search has completed successfully. */
  productSearchResults?: GoogleCloudVisionV1p1beta1ProductSearchResults;
  /** If present, landmark detection has completed successfully. */
  landmarkAnnotations?: Array<GoogleCloudVisionV1p1beta1EntityAnnotation>;
  /** If present, logo detection has completed successfully. */
  logoAnnotations?: Array<GoogleCloudVisionV1p1beta1EntityAnnotation>;
  /** If present, text (OCR) detection or document (OCR) text detection has completed successfully. This annotation provides the structural hierarchy for the OCR detected text. */
  fullTextAnnotation?: GoogleCloudVisionV1p1beta1TextAnnotation;
  /** If set, represents the error message for the operation. Note that filled-in image annotations are guaranteed to be correct, even when `error` is set. */
  error?: Status;
  /** If present, localized object detection has completed successfully. This will be sorted descending by confidence score. */
  localizedObjectAnnotations?: Array<GoogleCloudVisionV1p1beta1LocalizedObjectAnnotation>;
  /** If present, safe-search annotation has completed successfully. */
  safeSearchAnnotation?: GoogleCloudVisionV1p1beta1SafeSearchAnnotation;
  /** If present, label detection has completed successfully. */
  labelAnnotations?: Array<GoogleCloudVisionV1p1beta1EntityAnnotation>;
  /** If present, contextual information is needed to understand where this image comes from. */
  context?: GoogleCloudVisionV1p1beta1ImageAnnotationContext;
  /** If present, crop hints have completed successfully. */
  cropHintsAnnotation?: GoogleCloudVisionV1p1beta1CropHintsAnnotation;
  /** If present, web detection has completed successfully. */
  webDetection?: GoogleCloudVisionV1p1beta1WebDetection;
}

export const GoogleCloudVisionV1p1beta1AnnotateImageResponse: Schema.Schema<GoogleCloudVisionV1p1beta1AnnotateImageResponse> = Schema.suspend(() => Schema.Struct({
  textAnnotations: Schema.optional(Schema.Array(GoogleCloudVisionV1p1beta1EntityAnnotation)),
  faceAnnotations: Schema.optional(Schema.Array(GoogleCloudVisionV1p1beta1FaceAnnotation)),
  imagePropertiesAnnotation: Schema.optional(GoogleCloudVisionV1p1beta1ImageProperties),
  productSearchResults: Schema.optional(GoogleCloudVisionV1p1beta1ProductSearchResults),
  landmarkAnnotations: Schema.optional(Schema.Array(GoogleCloudVisionV1p1beta1EntityAnnotation)),
  logoAnnotations: Schema.optional(Schema.Array(GoogleCloudVisionV1p1beta1EntityAnnotation)),
  fullTextAnnotation: Schema.optional(GoogleCloudVisionV1p1beta1TextAnnotation),
  error: Schema.optional(Status),
  localizedObjectAnnotations: Schema.optional(Schema.Array(GoogleCloudVisionV1p1beta1LocalizedObjectAnnotation)),
  safeSearchAnnotation: Schema.optional(GoogleCloudVisionV1p1beta1SafeSearchAnnotation),
  labelAnnotations: Schema.optional(Schema.Array(GoogleCloudVisionV1p1beta1EntityAnnotation)),
  context: Schema.optional(GoogleCloudVisionV1p1beta1ImageAnnotationContext),
  cropHintsAnnotation: Schema.optional(GoogleCloudVisionV1p1beta1CropHintsAnnotation),
  webDetection: Schema.optional(GoogleCloudVisionV1p1beta1WebDetection),
})).annotate({ identifier: "GoogleCloudVisionV1p1beta1AnnotateImageResponse" }) as any as Schema.Schema<GoogleCloudVisionV1p1beta1AnnotateImageResponse>;

export interface GoogleCloudVisionV1p3beta1NormalizedVertex {
  /** X coordinate. */
  x?: number;
  /** Y coordinate. */
  y?: number;
}

export const GoogleCloudVisionV1p3beta1NormalizedVertex: Schema.Schema<GoogleCloudVisionV1p3beta1NormalizedVertex> = Schema.suspend(() => Schema.Struct({
  x: Schema.optional(Schema.Number),
  y: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVisionV1p3beta1NormalizedVertex" }) as any as Schema.Schema<GoogleCloudVisionV1p3beta1NormalizedVertex>;

export interface GoogleCloudVisionV1p3beta1Vertex {
  /** X coordinate. */
  x?: number;
  /** Y coordinate. */
  y?: number;
}

export const GoogleCloudVisionV1p3beta1Vertex: Schema.Schema<GoogleCloudVisionV1p3beta1Vertex> = Schema.suspend(() => Schema.Struct({
  x: Schema.optional(Schema.Number),
  y: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVisionV1p3beta1Vertex" }) as any as Schema.Schema<GoogleCloudVisionV1p3beta1Vertex>;

export interface GoogleCloudVisionV1p3beta1BoundingPoly {
  /** The bounding polygon normalized vertices. */
  normalizedVertices?: Array<GoogleCloudVisionV1p3beta1NormalizedVertex>;
  /** The bounding polygon vertices. */
  vertices?: Array<GoogleCloudVisionV1p3beta1Vertex>;
}

export const GoogleCloudVisionV1p3beta1BoundingPoly: Schema.Schema<GoogleCloudVisionV1p3beta1BoundingPoly> = Schema.suspend(() => Schema.Struct({
  normalizedVertices: Schema.optional(Schema.Array(GoogleCloudVisionV1p3beta1NormalizedVertex)),
  vertices: Schema.optional(Schema.Array(GoogleCloudVisionV1p3beta1Vertex)),
})).annotate({ identifier: "GoogleCloudVisionV1p3beta1BoundingPoly" }) as any as Schema.Schema<GoogleCloudVisionV1p3beta1BoundingPoly>;

export interface NormalizedVertex {
  /** Y coordinate. */
  y?: number;
  /** X coordinate. */
  x?: number;
}

export const NormalizedVertex: Schema.Schema<NormalizedVertex> = Schema.suspend(() => Schema.Struct({
  y: Schema.optional(Schema.Number),
  x: Schema.optional(Schema.Number),
})).annotate({ identifier: "NormalizedVertex" }) as any as Schema.Schema<NormalizedVertex>;

export interface Vertex {
  /** X coordinate. */
  x?: number;
  /** Y coordinate. */
  y?: number;
}

export const Vertex: Schema.Schema<Vertex> = Schema.suspend(() => Schema.Struct({
  x: Schema.optional(Schema.Number),
  y: Schema.optional(Schema.Number),
})).annotate({ identifier: "Vertex" }) as any as Schema.Schema<Vertex>;

export interface BoundingPoly {
  /** The bounding polygon normalized vertices. */
  normalizedVertices?: Array<NormalizedVertex>;
  /** The bounding polygon vertices. */
  vertices?: Array<Vertex>;
}

export const BoundingPoly: Schema.Schema<BoundingPoly> = Schema.suspend(() => Schema.Struct({
  normalizedVertices: Schema.optional(Schema.Array(NormalizedVertex)),
  vertices: Schema.optional(Schema.Array(Vertex)),
})).annotate({ identifier: "BoundingPoly" }) as any as Schema.Schema<BoundingPoly>;

export interface LocalizedObjectAnnotation {
  /** The BCP-47 language code, such as "en-US" or "sr-Latn". For more information, see http://www.unicode.org/reports/tr35/#Unicode_locale_identifier. */
  languageCode?: string;
  /** Score of the result. Range [0, 1]. */
  score?: number;
  /** Image region to which this object belongs. This must be populated. */
  boundingPoly?: BoundingPoly;
  /** Object ID that should align with EntityAnnotation mid. */
  mid?: string;
  /** Object name, expressed in its `language_code` language. */
  name?: string;
}

export const LocalizedObjectAnnotation: Schema.Schema<LocalizedObjectAnnotation> = Schema.suspend(() => Schema.Struct({
  languageCode: Schema.optional(Schema.String),
  score: Schema.optional(Schema.Number),
  boundingPoly: Schema.optional(BoundingPoly),
  mid: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "LocalizedObjectAnnotation" }) as any as Schema.Schema<LocalizedObjectAnnotation>;

export interface GoogleCloudVisionV1p2beta1ProductKeyValue {
  /** The key of the label attached to the product. Cannot be empty and cannot exceed 128 bytes. */
  key?: string;
  /** The value of the label attached to the product. Cannot be empty and cannot exceed 128 bytes. */
  value?: string;
}

export const GoogleCloudVisionV1p2beta1ProductKeyValue: Schema.Schema<GoogleCloudVisionV1p2beta1ProductKeyValue> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p2beta1ProductKeyValue" }) as any as Schema.Schema<GoogleCloudVisionV1p2beta1ProductKeyValue>;

export interface GoogleCloudVisionV1p2beta1Product {
  /** Immutable. The category for the product identified by the reference image. This should be one of "homegoods-v2", "apparel-v2", "toys-v2", "packagedgoods-v1" or "general-v1". The legacy categories "homegoods", "apparel", and "toys" are still supported, but these should not be used for new products. */
  productCategory?: string;
  /** Key-value pairs that can be attached to a product. At query time, constraints can be specified based on the product_labels. Note that integer values can be provided as strings, e.g. "1199". Only strings with integer values can match a range-based restriction which is to be supported soon. Multiple values can be assigned to the same key. One product may have up to 500 product_labels. Notice that the total number of distinct product_labels over all products in one ProductSet cannot exceed 1M, otherwise the product search pipeline will refuse to work for that ProductSet. */
  productLabels?: Array<GoogleCloudVisionV1p2beta1ProductKeyValue>;
  /** The user-provided name for this Product. Must not be empty. Must be at most 4096 characters long. */
  displayName?: string;
  /** User-provided metadata to be stored with this product. Must be at most 4096 characters long. */
  description?: string;
  /** The resource name of the product. Format is: `projects/PROJECT_ID/locations/LOC_ID/products/PRODUCT_ID`. This field is ignored when creating a product. */
  name?: string;
}

export const GoogleCloudVisionV1p2beta1Product: Schema.Schema<GoogleCloudVisionV1p2beta1Product> = Schema.suspend(() => Schema.Struct({
  productCategory: Schema.optional(Schema.String),
  productLabels: Schema.optional(Schema.Array(GoogleCloudVisionV1p2beta1ProductKeyValue)),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p2beta1Product" }) as any as Schema.Schema<GoogleCloudVisionV1p2beta1Product>;

export interface GoogleCloudVisionV1p2beta1ProductSearchResultsResult {
  /** The resource name of the image from the product that is the closest match to the query. */
  image?: string;
  /** The Product. */
  product?: GoogleCloudVisionV1p2beta1Product;
  /** A confidence level on the match, ranging from 0 (no confidence) to 1 (full confidence). */
  score?: number;
}

export const GoogleCloudVisionV1p2beta1ProductSearchResultsResult: Schema.Schema<GoogleCloudVisionV1p2beta1ProductSearchResultsResult> = Schema.suspend(() => Schema.Struct({
  image: Schema.optional(Schema.String),
  product: Schema.optional(GoogleCloudVisionV1p2beta1Product),
  score: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVisionV1p2beta1ProductSearchResultsResult" }) as any as Schema.Schema<GoogleCloudVisionV1p2beta1ProductSearchResultsResult>;

export interface GoogleCloudVisionV1p4beta1ColorInfo {
  /** The fraction of pixels the color occupies in the image. Value in range [0, 1]. */
  pixelFraction?: number;
  /** RGB components of the color. */
  color?: Color;
  /** Image-specific score for this color. Value in range [0, 1]. */
  score?: number;
}

export const GoogleCloudVisionV1p4beta1ColorInfo: Schema.Schema<GoogleCloudVisionV1p4beta1ColorInfo> = Schema.suspend(() => Schema.Struct({
  pixelFraction: Schema.optional(Schema.Number),
  color: Schema.optional(Color),
  score: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVisionV1p4beta1ColorInfo" }) as any as Schema.Schema<GoogleCloudVisionV1p4beta1ColorInfo>;

export interface GoogleCloudVisionV1p4beta1DominantColorsAnnotation {
  /** RGB color values with their score and pixel fraction. */
  colors?: Array<GoogleCloudVisionV1p4beta1ColorInfo>;
}

export const GoogleCloudVisionV1p4beta1DominantColorsAnnotation: Schema.Schema<GoogleCloudVisionV1p4beta1DominantColorsAnnotation> = Schema.suspend(() => Schema.Struct({
  colors: Schema.optional(Schema.Array(GoogleCloudVisionV1p4beta1ColorInfo)),
})).annotate({ identifier: "GoogleCloudVisionV1p4beta1DominantColorsAnnotation" }) as any as Schema.Schema<GoogleCloudVisionV1p4beta1DominantColorsAnnotation>;

export interface GoogleCloudVisionV1p4beta1NormalizedVertex {
  /** Y coordinate. */
  y?: number;
  /** X coordinate. */
  x?: number;
}

export const GoogleCloudVisionV1p4beta1NormalizedVertex: Schema.Schema<GoogleCloudVisionV1p4beta1NormalizedVertex> = Schema.suspend(() => Schema.Struct({
  y: Schema.optional(Schema.Number),
  x: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVisionV1p4beta1NormalizedVertex" }) as any as Schema.Schema<GoogleCloudVisionV1p4beta1NormalizedVertex>;

export interface GoogleCloudVisionV1p4beta1Vertex {
  /** Y coordinate. */
  y?: number;
  /** X coordinate. */
  x?: number;
}

export const GoogleCloudVisionV1p4beta1Vertex: Schema.Schema<GoogleCloudVisionV1p4beta1Vertex> = Schema.suspend(() => Schema.Struct({
  y: Schema.optional(Schema.Number),
  x: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVisionV1p4beta1Vertex" }) as any as Schema.Schema<GoogleCloudVisionV1p4beta1Vertex>;

export interface GoogleCloudVisionV1p4beta1BoundingPoly {
  /** The bounding polygon normalized vertices. */
  normalizedVertices?: Array<GoogleCloudVisionV1p4beta1NormalizedVertex>;
  /** The bounding polygon vertices. */
  vertices?: Array<GoogleCloudVisionV1p4beta1Vertex>;
}

export const GoogleCloudVisionV1p4beta1BoundingPoly: Schema.Schema<GoogleCloudVisionV1p4beta1BoundingPoly> = Schema.suspend(() => Schema.Struct({
  normalizedVertices: Schema.optional(Schema.Array(GoogleCloudVisionV1p4beta1NormalizedVertex)),
  vertices: Schema.optional(Schema.Array(GoogleCloudVisionV1p4beta1Vertex)),
})).annotate({ identifier: "GoogleCloudVisionV1p4beta1BoundingPoly" }) as any as Schema.Schema<GoogleCloudVisionV1p4beta1BoundingPoly>;

export interface GoogleCloudVisionV1p4beta1Position {
  /** Z coordinate (or depth). */
  z?: number;
  /** X coordinate. */
  x?: number;
  /** Y coordinate. */
  y?: number;
}

export const GoogleCloudVisionV1p4beta1Position: Schema.Schema<GoogleCloudVisionV1p4beta1Position> = Schema.suspend(() => Schema.Struct({
  z: Schema.optional(Schema.Number),
  x: Schema.optional(Schema.Number),
  y: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVisionV1p4beta1Position" }) as any as Schema.Schema<GoogleCloudVisionV1p4beta1Position>;

export interface GoogleCloudVisionV1p4beta1FaceAnnotationLandmark {
  /** Face landmark position. */
  position?: GoogleCloudVisionV1p4beta1Position;
  /** Face landmark type. */
  type?: "UNKNOWN_LANDMARK" | "LEFT_EYE" | "RIGHT_EYE" | "LEFT_OF_LEFT_EYEBROW" | "RIGHT_OF_LEFT_EYEBROW" | "LEFT_OF_RIGHT_EYEBROW" | "RIGHT_OF_RIGHT_EYEBROW" | "MIDPOINT_BETWEEN_EYES" | "NOSE_TIP" | "UPPER_LIP" | "LOWER_LIP" | "MOUTH_LEFT" | "MOUTH_RIGHT" | "MOUTH_CENTER" | "NOSE_BOTTOM_RIGHT" | "NOSE_BOTTOM_LEFT" | "NOSE_BOTTOM_CENTER" | "LEFT_EYE_TOP_BOUNDARY" | "LEFT_EYE_RIGHT_CORNER" | "LEFT_EYE_BOTTOM_BOUNDARY" | "LEFT_EYE_LEFT_CORNER" | "RIGHT_EYE_TOP_BOUNDARY" | "RIGHT_EYE_RIGHT_CORNER" | "RIGHT_EYE_BOTTOM_BOUNDARY" | "RIGHT_EYE_LEFT_CORNER" | "LEFT_EYEBROW_UPPER_MIDPOINT" | "RIGHT_EYEBROW_UPPER_MIDPOINT" | "LEFT_EAR_TRAGION" | "RIGHT_EAR_TRAGION" | "LEFT_EYE_PUPIL" | "RIGHT_EYE_PUPIL" | "FOREHEAD_GLABELLA" | "CHIN_GNATHION" | "CHIN_LEFT_GONION" | "CHIN_RIGHT_GONION" | "LEFT_CHEEK_CENTER" | "RIGHT_CHEEK_CENTER" | (string & {});
}

export const GoogleCloudVisionV1p4beta1FaceAnnotationLandmark: Schema.Schema<GoogleCloudVisionV1p4beta1FaceAnnotationLandmark> = Schema.suspend(() => Schema.Struct({
  position: Schema.optional(GoogleCloudVisionV1p4beta1Position),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p4beta1FaceAnnotationLandmark" }) as any as Schema.Schema<GoogleCloudVisionV1p4beta1FaceAnnotationLandmark>;

export interface GoogleCloudVisionV1p4beta1Celebrity {
  /** The Celebrity's description. */
  description?: string;
  /** The Celebrity's display name. */
  displayName?: string;
  /** The resource name of the preloaded Celebrity. Has the format `builtin/{mid}`. */
  name?: string;
}

export const GoogleCloudVisionV1p4beta1Celebrity: Schema.Schema<GoogleCloudVisionV1p4beta1Celebrity> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p4beta1Celebrity" }) as any as Schema.Schema<GoogleCloudVisionV1p4beta1Celebrity>;

export interface GoogleCloudVisionV1p4beta1FaceRecognitionResult {
  /** Recognition confidence. Range [0, 1]. */
  confidence?: number;
  /** The Celebrity that this face was matched to. */
  celebrity?: GoogleCloudVisionV1p4beta1Celebrity;
}

export const GoogleCloudVisionV1p4beta1FaceRecognitionResult: Schema.Schema<GoogleCloudVisionV1p4beta1FaceRecognitionResult> = Schema.suspend(() => Schema.Struct({
  confidence: Schema.optional(Schema.Number),
  celebrity: Schema.optional(GoogleCloudVisionV1p4beta1Celebrity),
})).annotate({ identifier: "GoogleCloudVisionV1p4beta1FaceRecognitionResult" }) as any as Schema.Schema<GoogleCloudVisionV1p4beta1FaceRecognitionResult>;

export interface GoogleCloudVisionV1p4beta1FaceAnnotation {
  /** The `fd_bounding_poly` bounding polygon is tighter than the `boundingPoly`, and encloses only the skin part of the face. Typically, it is used to eliminate the face from any image analysis that detects the "amount of skin" visible in an image. It is not based on the landmarker results, only on the initial face detection, hence the fd (face detection) prefix. */
  fdBoundingPoly?: GoogleCloudVisionV1p4beta1BoundingPoly;
  /** The bounding polygon around the face. The coordinates of the bounding box are in the original image's scale. The bounding box is computed to "frame" the face in accordance with human expectations. It is based on the landmarker results. Note that one or more x and/or y coordinates may not be generated in the `BoundingPoly` (the polygon will be unbounded) if only a partial face appears in the image to be annotated. */
  boundingPoly?: GoogleCloudVisionV1p4beta1BoundingPoly;
  /** Sorrow likelihood. */
  sorrowLikelihood?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** Anger likelihood. */
  angerLikelihood?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** Headwear likelihood. */
  headwearLikelihood?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** Joy likelihood. */
  joyLikelihood?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** Surprise likelihood. */
  surpriseLikelihood?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** Under-exposed likelihood. */
  underExposedLikelihood?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** Roll angle, which indicates the amount of clockwise/anti-clockwise rotation of the face relative to the image vertical about the axis perpendicular to the face. Range [-180,180]. */
  rollAngle?: number;
  /** Blurred likelihood. */
  blurredLikelihood?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** Pitch angle, which indicates the upwards/downwards angle that the face is pointing relative to the image's horizontal plane. Range [-180,180]. */
  tiltAngle?: number;
  /** Face landmarking confidence. Range [0, 1]. */
  landmarkingConfidence?: number;
  /** Detection confidence. Range [0, 1]. */
  detectionConfidence?: number;
  /** Yaw angle, which indicates the leftward/rightward angle that the face is pointing relative to the vertical plane perpendicular to the image. Range [-180,180]. */
  panAngle?: number;
  /** Detected face landmarks. */
  landmarks?: Array<GoogleCloudVisionV1p4beta1FaceAnnotationLandmark>;
  /** Additional recognition information. Only computed if image_context.face_recognition_params is provided, **and** a match is found to a Celebrity in the input CelebritySet. This field is sorted in order of decreasing confidence values. */
  recognitionResult?: Array<GoogleCloudVisionV1p4beta1FaceRecognitionResult>;
}

export const GoogleCloudVisionV1p4beta1FaceAnnotation: Schema.Schema<GoogleCloudVisionV1p4beta1FaceAnnotation> = Schema.suspend(() => Schema.Struct({
  fdBoundingPoly: Schema.optional(GoogleCloudVisionV1p4beta1BoundingPoly),
  boundingPoly: Schema.optional(GoogleCloudVisionV1p4beta1BoundingPoly),
  sorrowLikelihood: Schema.optional(Schema.String),
  angerLikelihood: Schema.optional(Schema.String),
  headwearLikelihood: Schema.optional(Schema.String),
  joyLikelihood: Schema.optional(Schema.String),
  surpriseLikelihood: Schema.optional(Schema.String),
  underExposedLikelihood: Schema.optional(Schema.String),
  rollAngle: Schema.optional(Schema.Number),
  blurredLikelihood: Schema.optional(Schema.String),
  tiltAngle: Schema.optional(Schema.Number),
  landmarkingConfidence: Schema.optional(Schema.Number),
  detectionConfidence: Schema.optional(Schema.Number),
  panAngle: Schema.optional(Schema.Number),
  landmarks: Schema.optional(Schema.Array(GoogleCloudVisionV1p4beta1FaceAnnotationLandmark)),
  recognitionResult: Schema.optional(Schema.Array(GoogleCloudVisionV1p4beta1FaceRecognitionResult)),
})).annotate({ identifier: "GoogleCloudVisionV1p4beta1FaceAnnotation" }) as any as Schema.Schema<GoogleCloudVisionV1p4beta1FaceAnnotation>;

export interface GoogleCloudVisionV1p4beta1ProductKeyValue {
  /** The key of the label attached to the product. Cannot be empty and cannot exceed 128 bytes. */
  key?: string;
  /** The value of the label attached to the product. Cannot be empty and cannot exceed 128 bytes. */
  value?: string;
}

export const GoogleCloudVisionV1p4beta1ProductKeyValue: Schema.Schema<GoogleCloudVisionV1p4beta1ProductKeyValue> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p4beta1ProductKeyValue" }) as any as Schema.Schema<GoogleCloudVisionV1p4beta1ProductKeyValue>;

export interface GoogleCloudVisionV1p4beta1Product {
  /** Immutable. The category for the product identified by the reference image. This should be one of "homegoods-v2", "apparel-v2", "toys-v2", "packagedgoods-v1" or "general-v1". The legacy categories "homegoods", "apparel", and "toys" are still supported, but these should not be used for new products. */
  productCategory?: string;
  /** Key-value pairs that can be attached to a product. At query time, constraints can be specified based on the product_labels. Note that integer values can be provided as strings, e.g. "1199". Only strings with integer values can match a range-based restriction which is to be supported soon. Multiple values can be assigned to the same key. One product may have up to 500 product_labels. Notice that the total number of distinct product_labels over all products in one ProductSet cannot exceed 1M, otherwise the product search pipeline will refuse to work for that ProductSet. */
  productLabels?: Array<GoogleCloudVisionV1p4beta1ProductKeyValue>;
  /** User-provided metadata to be stored with this product. Must be at most 4096 characters long. */
  description?: string;
  /** The resource name of the product. Format is: `projects/PROJECT_ID/locations/LOC_ID/products/PRODUCT_ID`. This field is ignored when creating a product. */
  name?: string;
  /** The user-provided name for this Product. Must not be empty. Must be at most 4096 characters long. */
  displayName?: string;
}

export const GoogleCloudVisionV1p4beta1Product: Schema.Schema<GoogleCloudVisionV1p4beta1Product> = Schema.suspend(() => Schema.Struct({
  productCategory: Schema.optional(Schema.String),
  productLabels: Schema.optional(Schema.Array(GoogleCloudVisionV1p4beta1ProductKeyValue)),
  description: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p4beta1Product" }) as any as Schema.Schema<GoogleCloudVisionV1p4beta1Product>;

export interface GoogleCloudVisionV1p4beta1ProductSearchResultsResult {
  /** The Product. */
  product?: GoogleCloudVisionV1p4beta1Product;
  /** The resource name of the image from the product that is the closest match to the query. */
  image?: string;
  /** A confidence level on the match, ranging from 0 (no confidence) to 1 (full confidence). */
  score?: number;
}

export const GoogleCloudVisionV1p4beta1ProductSearchResultsResult: Schema.Schema<GoogleCloudVisionV1p4beta1ProductSearchResultsResult> = Schema.suspend(() => Schema.Struct({
  product: Schema.optional(GoogleCloudVisionV1p4beta1Product),
  image: Schema.optional(Schema.String),
  score: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVisionV1p4beta1ProductSearchResultsResult" }) as any as Schema.Schema<GoogleCloudVisionV1p4beta1ProductSearchResultsResult>;

export interface GoogleCloudVisionV1p4beta1ProductSearchResultsObjectAnnotation {
  /** The BCP-47 language code, such as "en-US" or "sr-Latn". For more information, see http://www.unicode.org/reports/tr35/#Unicode_locale_identifier. */
  languageCode?: string;
  /** Object ID that should align with EntityAnnotation mid. */
  mid?: string;
  /** Object name, expressed in its `language_code` language. */
  name?: string;
  /** Score of the result. Range [0, 1]. */
  score?: number;
}

export const GoogleCloudVisionV1p4beta1ProductSearchResultsObjectAnnotation: Schema.Schema<GoogleCloudVisionV1p4beta1ProductSearchResultsObjectAnnotation> = Schema.suspend(() => Schema.Struct({
  languageCode: Schema.optional(Schema.String),
  mid: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  score: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVisionV1p4beta1ProductSearchResultsObjectAnnotation" }) as any as Schema.Schema<GoogleCloudVisionV1p4beta1ProductSearchResultsObjectAnnotation>;

export interface GoogleCloudVisionV1p4beta1ProductSearchResultsGroupedResult {
  /** List of results, one for each product match. */
  results?: Array<GoogleCloudVisionV1p4beta1ProductSearchResultsResult>;
  /** List of generic predictions for the object in the bounding box. */
  objectAnnotations?: Array<GoogleCloudVisionV1p4beta1ProductSearchResultsObjectAnnotation>;
  /** The bounding polygon around the product detected in the query image. */
  boundingPoly?: GoogleCloudVisionV1p4beta1BoundingPoly;
}

export const GoogleCloudVisionV1p4beta1ProductSearchResultsGroupedResult: Schema.Schema<GoogleCloudVisionV1p4beta1ProductSearchResultsGroupedResult> = Schema.suspend(() => Schema.Struct({
  results: Schema.optional(Schema.Array(GoogleCloudVisionV1p4beta1ProductSearchResultsResult)),
  objectAnnotations: Schema.optional(Schema.Array(GoogleCloudVisionV1p4beta1ProductSearchResultsObjectAnnotation)),
  boundingPoly: Schema.optional(GoogleCloudVisionV1p4beta1BoundingPoly),
})).annotate({ identifier: "GoogleCloudVisionV1p4beta1ProductSearchResultsGroupedResult" }) as any as Schema.Schema<GoogleCloudVisionV1p4beta1ProductSearchResultsGroupedResult>;

export interface GoogleCloudVisionV1p4beta1ProductSearchResults {
  /** Timestamp of the index which provided these results. Products added to the product set and products removed from the product set after this time are not reflected in the current results. */
  indexTime?: string;
  /** List of results grouped by products detected in the query image. Each entry corresponds to one bounding polygon in the query image, and contains the matching products specific to that region. There may be duplicate product matches in the union of all the per-product results. */
  productGroupedResults?: Array<GoogleCloudVisionV1p4beta1ProductSearchResultsGroupedResult>;
  /** List of results, one for each product match. */
  results?: Array<GoogleCloudVisionV1p4beta1ProductSearchResultsResult>;
}

export const GoogleCloudVisionV1p4beta1ProductSearchResults: Schema.Schema<GoogleCloudVisionV1p4beta1ProductSearchResults> = Schema.suspend(() => Schema.Struct({
  indexTime: Schema.optional(Schema.String),
  productGroupedResults: Schema.optional(Schema.Array(GoogleCloudVisionV1p4beta1ProductSearchResultsGroupedResult)),
  results: Schema.optional(Schema.Array(GoogleCloudVisionV1p4beta1ProductSearchResultsResult)),
})).annotate({ identifier: "GoogleCloudVisionV1p4beta1ProductSearchResults" }) as any as Schema.Schema<GoogleCloudVisionV1p4beta1ProductSearchResults>;

export interface GoogleCloudVisionV1p4beta1WebDetectionWebImage {
  /** (Deprecated) Overall relevancy score for the image. */
  score?: number;
  /** The result image URL. */
  url?: string;
}

export const GoogleCloudVisionV1p4beta1WebDetectionWebImage: Schema.Schema<GoogleCloudVisionV1p4beta1WebDetectionWebImage> = Schema.suspend(() => Schema.Struct({
  score: Schema.optional(Schema.Number),
  url: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p4beta1WebDetectionWebImage" }) as any as Schema.Schema<GoogleCloudVisionV1p4beta1WebDetectionWebImage>;

export interface GoogleCloudVisionV1p4beta1WebDetectionWebEntity {
  /** Canonical description of the entity, in English. */
  description?: string;
  /** Opaque entity ID. */
  entityId?: string;
  /** Overall relevancy score for the entity. Not normalized and not comparable across different image queries. */
  score?: number;
}

export const GoogleCloudVisionV1p4beta1WebDetectionWebEntity: Schema.Schema<GoogleCloudVisionV1p4beta1WebDetectionWebEntity> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  entityId: Schema.optional(Schema.String),
  score: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVisionV1p4beta1WebDetectionWebEntity" }) as any as Schema.Schema<GoogleCloudVisionV1p4beta1WebDetectionWebEntity>;

export interface GoogleCloudVisionV1p4beta1WebDetectionWebLabel {
  /** Label for extra metadata. */
  label?: string;
  /** The BCP-47 language code for `label`, such as "en-US" or "sr-Latn". For more information, see http://www.unicode.org/reports/tr35/#Unicode_locale_identifier. */
  languageCode?: string;
}

export const GoogleCloudVisionV1p4beta1WebDetectionWebLabel: Schema.Schema<GoogleCloudVisionV1p4beta1WebDetectionWebLabel> = Schema.suspend(() => Schema.Struct({
  label: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p4beta1WebDetectionWebLabel" }) as any as Schema.Schema<GoogleCloudVisionV1p4beta1WebDetectionWebLabel>;

export interface GoogleCloudVisionV1p4beta1WebDetectionWebPage {
  /** Fully matching images on the page. Can include resized copies of the query image. */
  fullMatchingImages?: Array<GoogleCloudVisionV1p4beta1WebDetectionWebImage>;
  /** (Deprecated) Overall relevancy score for the web page. */
  score?: number;
  /** The result web page URL. */
  url?: string;
  /** Title for the web page, may contain HTML markups. */
  pageTitle?: string;
  /** Partial matching images on the page. Those images are similar enough to share some key-point features. For example an original image will likely have partial matching for its crops. */
  partialMatchingImages?: Array<GoogleCloudVisionV1p4beta1WebDetectionWebImage>;
}

export const GoogleCloudVisionV1p4beta1WebDetectionWebPage: Schema.Schema<GoogleCloudVisionV1p4beta1WebDetectionWebPage> = Schema.suspend(() => Schema.Struct({
  fullMatchingImages: Schema.optional(Schema.Array(GoogleCloudVisionV1p4beta1WebDetectionWebImage)),
  score: Schema.optional(Schema.Number),
  url: Schema.optional(Schema.String),
  pageTitle: Schema.optional(Schema.String),
  partialMatchingImages: Schema.optional(Schema.Array(GoogleCloudVisionV1p4beta1WebDetectionWebImage)),
})).annotate({ identifier: "GoogleCloudVisionV1p4beta1WebDetectionWebPage" }) as any as Schema.Schema<GoogleCloudVisionV1p4beta1WebDetectionWebPage>;

export interface GoogleCloudVisionV1p4beta1WebDetection {
  /** Partial matching images from the Internet. Those images are similar enough to share some key-point features. For example an original image will likely have partial matching for its crops. */
  partialMatchingImages?: Array<GoogleCloudVisionV1p4beta1WebDetectionWebImage>;
  /** The visually similar image results. */
  visuallySimilarImages?: Array<GoogleCloudVisionV1p4beta1WebDetectionWebImage>;
  /** Deduced entities from similar images on the Internet. */
  webEntities?: Array<GoogleCloudVisionV1p4beta1WebDetectionWebEntity>;
  /** The service's best guess as to the topic of the request image. Inferred from similar images on the open web. */
  bestGuessLabels?: Array<GoogleCloudVisionV1p4beta1WebDetectionWebLabel>;
  /** Web pages containing the matching images from the Internet. */
  pagesWithMatchingImages?: Array<GoogleCloudVisionV1p4beta1WebDetectionWebPage>;
  /** Fully matching images from the Internet. Can include resized copies of the query image. */
  fullMatchingImages?: Array<GoogleCloudVisionV1p4beta1WebDetectionWebImage>;
}

export const GoogleCloudVisionV1p4beta1WebDetection: Schema.Schema<GoogleCloudVisionV1p4beta1WebDetection> = Schema.suspend(() => Schema.Struct({
  partialMatchingImages: Schema.optional(Schema.Array(GoogleCloudVisionV1p4beta1WebDetectionWebImage)),
  visuallySimilarImages: Schema.optional(Schema.Array(GoogleCloudVisionV1p4beta1WebDetectionWebImage)),
  webEntities: Schema.optional(Schema.Array(GoogleCloudVisionV1p4beta1WebDetectionWebEntity)),
  bestGuessLabels: Schema.optional(Schema.Array(GoogleCloudVisionV1p4beta1WebDetectionWebLabel)),
  pagesWithMatchingImages: Schema.optional(Schema.Array(GoogleCloudVisionV1p4beta1WebDetectionWebPage)),
  fullMatchingImages: Schema.optional(Schema.Array(GoogleCloudVisionV1p4beta1WebDetectionWebImage)),
})).annotate({ identifier: "GoogleCloudVisionV1p4beta1WebDetection" }) as any as Schema.Schema<GoogleCloudVisionV1p4beta1WebDetection>;

export interface GoogleCloudVisionV1p4beta1SafeSearchAnnotation {
  /** Likelihood that this image contains violent content. Violent content may include death, serious harm, or injury to individuals or groups of individuals. */
  violence?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** Likelihood that the request image contains racy content. Racy content may include (but is not limited to) skimpy or sheer clothing, strategically covered nudity, lewd or provocative poses, or close-ups of sensitive body areas. */
  racy?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** Spoof likelihood. The likelihood that an modification was made to the image's canonical version to make it appear funny or offensive. */
  spoof?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** Likelihood that this is a medical image. */
  medical?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** Represents the adult content likelihood for the image. Adult content may contain elements such as nudity, pornographic images or cartoons, or sexual activities. */
  adult?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
}

export const GoogleCloudVisionV1p4beta1SafeSearchAnnotation: Schema.Schema<GoogleCloudVisionV1p4beta1SafeSearchAnnotation> = Schema.suspend(() => Schema.Struct({
  violence: Schema.optional(Schema.String),
  racy: Schema.optional(Schema.String),
  spoof: Schema.optional(Schema.String),
  medical: Schema.optional(Schema.String),
  adult: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p4beta1SafeSearchAnnotation" }) as any as Schema.Schema<GoogleCloudVisionV1p4beta1SafeSearchAnnotation>;

export interface GoogleCloudVisionV1p4beta1ImageAnnotationContext {
  /** If the file was a PDF or TIFF, this field gives the page number within the file used to produce the image. */
  pageNumber?: number;
  /** The URI of the file used to produce the image. */
  uri?: string;
}

export const GoogleCloudVisionV1p4beta1ImageAnnotationContext: Schema.Schema<GoogleCloudVisionV1p4beta1ImageAnnotationContext> = Schema.suspend(() => Schema.Struct({
  pageNumber: Schema.optional(Schema.Number),
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p4beta1ImageAnnotationContext" }) as any as Schema.Schema<GoogleCloudVisionV1p4beta1ImageAnnotationContext>;

export interface GoogleCloudVisionV1p4beta1LocalizedObjectAnnotation {
  /** The BCP-47 language code, such as "en-US" or "sr-Latn". For more information, see http://www.unicode.org/reports/tr35/#Unicode_locale_identifier. */
  languageCode?: string;
  /** Object ID that should align with EntityAnnotation mid. */
  mid?: string;
  /** Image region to which this object belongs. This must be populated. */
  boundingPoly?: GoogleCloudVisionV1p4beta1BoundingPoly;
  /** Score of the result. Range [0, 1]. */
  score?: number;
  /** Object name, expressed in its `language_code` language. */
  name?: string;
}

export const GoogleCloudVisionV1p4beta1LocalizedObjectAnnotation: Schema.Schema<GoogleCloudVisionV1p4beta1LocalizedObjectAnnotation> = Schema.suspend(() => Schema.Struct({
  languageCode: Schema.optional(Schema.String),
  mid: Schema.optional(Schema.String),
  boundingPoly: Schema.optional(GoogleCloudVisionV1p4beta1BoundingPoly),
  score: Schema.optional(Schema.Number),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p4beta1LocalizedObjectAnnotation" }) as any as Schema.Schema<GoogleCloudVisionV1p4beta1LocalizedObjectAnnotation>;

export interface GoogleCloudVisionV1p4beta1Property {
  /** Name of the property. */
  name?: string;
  /** Value of numeric properties. */
  uint64Value?: string;
  /** Value of the property. */
  value?: string;
}

export const GoogleCloudVisionV1p4beta1Property: Schema.Schema<GoogleCloudVisionV1p4beta1Property> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  uint64Value: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p4beta1Property" }) as any as Schema.Schema<GoogleCloudVisionV1p4beta1Property>;

export interface GoogleCloudVisionV1p4beta1LocationInfo {
  /** lat/long location coordinates. */
  latLng?: LatLng;
}

export const GoogleCloudVisionV1p4beta1LocationInfo: Schema.Schema<GoogleCloudVisionV1p4beta1LocationInfo> = Schema.suspend(() => Schema.Struct({
  latLng: Schema.optional(LatLng),
})).annotate({ identifier: "GoogleCloudVisionV1p4beta1LocationInfo" }) as any as Schema.Schema<GoogleCloudVisionV1p4beta1LocationInfo>;

export interface GoogleCloudVisionV1p4beta1EntityAnnotation {
  /** The relevancy of the ICA (Image Content Annotation) label to the image. For example, the relevancy of "tower" is likely higher to an image containing the detected "Eiffel Tower" than to an image containing a detected distant towering building, even though the confidence that there is a tower in each image may be the same. Range [0, 1]. */
  topicality?: number;
  /** Overall score of the result. Range [0, 1]. */
  score?: number;
  /** Opaque entity ID. Some IDs may be available in [Google Knowledge Graph Search API](https://developers.google.com/knowledge-graph/). */
  mid?: string;
  /** Some entities may have optional user-supplied `Property` (name/value) fields, such a score or string that qualifies the entity. */
  properties?: Array<GoogleCloudVisionV1p4beta1Property>;
  /** Entity textual description, expressed in its `locale` language. */
  description?: string;
  /** The location information for the detected entity. Multiple `LocationInfo` elements can be present because one location may indicate the location of the scene in the image, and another location may indicate the location of the place where the image was taken. Location information is usually present for landmarks. */
  locations?: Array<GoogleCloudVisionV1p4beta1LocationInfo>;
  /** Image region to which this entity belongs. Not produced for `LABEL_DETECTION` features. */
  boundingPoly?: GoogleCloudVisionV1p4beta1BoundingPoly;
  /** **Deprecated. Use `score` instead.** The accuracy of the entity detection in an image. For example, for an image in which the "Eiffel Tower" entity is detected, this field represents the confidence that there is a tower in the query image. Range [0, 1]. */
  confidence?: number;
  /** The language code for the locale in which the entity textual `description` is expressed. */
  locale?: string;
}

export const GoogleCloudVisionV1p4beta1EntityAnnotation: Schema.Schema<GoogleCloudVisionV1p4beta1EntityAnnotation> = Schema.suspend(() => Schema.Struct({
  topicality: Schema.optional(Schema.Number),
  score: Schema.optional(Schema.Number),
  mid: Schema.optional(Schema.String),
  properties: Schema.optional(Schema.Array(GoogleCloudVisionV1p4beta1Property)),
  description: Schema.optional(Schema.String),
  locations: Schema.optional(Schema.Array(GoogleCloudVisionV1p4beta1LocationInfo)),
  boundingPoly: Schema.optional(GoogleCloudVisionV1p4beta1BoundingPoly),
  confidence: Schema.optional(Schema.Number),
  locale: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p4beta1EntityAnnotation" }) as any as Schema.Schema<GoogleCloudVisionV1p4beta1EntityAnnotation>;

export interface GoogleCloudVisionV1p4beta1ImageProperties {
  /** If present, dominant colors completed successfully. */
  dominantColors?: GoogleCloudVisionV1p4beta1DominantColorsAnnotation;
}

export const GoogleCloudVisionV1p4beta1ImageProperties: Schema.Schema<GoogleCloudVisionV1p4beta1ImageProperties> = Schema.suspend(() => Schema.Struct({
  dominantColors: Schema.optional(GoogleCloudVisionV1p4beta1DominantColorsAnnotation),
})).annotate({ identifier: "GoogleCloudVisionV1p4beta1ImageProperties" }) as any as Schema.Schema<GoogleCloudVisionV1p4beta1ImageProperties>;

export interface GoogleCloudVisionV1p4beta1CropHint {
  /** The bounding polygon for the crop region. The coordinates of the bounding box are in the original image's scale. */
  boundingPoly?: GoogleCloudVisionV1p4beta1BoundingPoly;
  /** Confidence of this being a salient region. Range [0, 1]. */
  confidence?: number;
  /** Fraction of importance of this salient region with respect to the original image. */
  importanceFraction?: number;
}

export const GoogleCloudVisionV1p4beta1CropHint: Schema.Schema<GoogleCloudVisionV1p4beta1CropHint> = Schema.suspend(() => Schema.Struct({
  boundingPoly: Schema.optional(GoogleCloudVisionV1p4beta1BoundingPoly),
  confidence: Schema.optional(Schema.Number),
  importanceFraction: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVisionV1p4beta1CropHint" }) as any as Schema.Schema<GoogleCloudVisionV1p4beta1CropHint>;

export interface GoogleCloudVisionV1p4beta1CropHintsAnnotation {
  /** Crop hint results. */
  cropHints?: Array<GoogleCloudVisionV1p4beta1CropHint>;
}

export const GoogleCloudVisionV1p4beta1CropHintsAnnotation: Schema.Schema<GoogleCloudVisionV1p4beta1CropHintsAnnotation> = Schema.suspend(() => Schema.Struct({
  cropHints: Schema.optional(Schema.Array(GoogleCloudVisionV1p4beta1CropHint)),
})).annotate({ identifier: "GoogleCloudVisionV1p4beta1CropHintsAnnotation" }) as any as Schema.Schema<GoogleCloudVisionV1p4beta1CropHintsAnnotation>;

export interface GoogleCloudVisionV1p4beta1Symbol {
  /** Additional information detected for the symbol. */
  property?: GoogleCloudVisionV1p4beta1TextAnnotationTextProperty;
  /** The actual UTF-8 representation of the symbol. */
  text?: string;
  /** The bounding box for the symbol. The vertices are in the order of top-left, top-right, bottom-right, bottom-left. When a rotation of the bounding box is detected the rotation is represented as around the top-left corner as defined when the text is read in the 'natural' orientation. For example: * when the text is horizontal it might look like: 0----1 | | 3----2 * when it's rotated 180 degrees around the top-left corner it becomes: 2----3 | | 1----0 and the vertex order will still be (0, 1, 2, 3). */
  boundingBox?: GoogleCloudVisionV1p4beta1BoundingPoly;
  /** Confidence of the OCR results for the symbol. Range [0, 1]. */
  confidence?: number;
}

export const GoogleCloudVisionV1p4beta1Symbol: Schema.Schema<GoogleCloudVisionV1p4beta1Symbol> = Schema.suspend(() => Schema.Struct({
  property: Schema.optional(GoogleCloudVisionV1p4beta1TextAnnotationTextProperty),
  text: Schema.optional(Schema.String),
  boundingBox: Schema.optional(GoogleCloudVisionV1p4beta1BoundingPoly),
  confidence: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVisionV1p4beta1Symbol" }) as any as Schema.Schema<GoogleCloudVisionV1p4beta1Symbol>;

export interface GoogleCloudVisionV1p4beta1Word {
  /** Confidence of the OCR results for the word. Range [0, 1]. */
  confidence?: number;
  /** The bounding box for the word. The vertices are in the order of top-left, top-right, bottom-right, bottom-left. When a rotation of the bounding box is detected the rotation is represented as around the top-left corner as defined when the text is read in the 'natural' orientation. For example: * when the text is horizontal it might look like: 0----1 | | 3----2 * when it's rotated 180 degrees around the top-left corner it becomes: 2----3 | | 1----0 and the vertex order will still be (0, 1, 2, 3). */
  boundingBox?: GoogleCloudVisionV1p4beta1BoundingPoly;
  /** Additional information detected for the word. */
  property?: GoogleCloudVisionV1p4beta1TextAnnotationTextProperty;
  /** List of symbols in the word. The order of the symbols follows the natural reading order. */
  symbols?: Array<GoogleCloudVisionV1p4beta1Symbol>;
}

export const GoogleCloudVisionV1p4beta1Word: Schema.Schema<GoogleCloudVisionV1p4beta1Word> = Schema.suspend(() => Schema.Struct({
  confidence: Schema.optional(Schema.Number),
  boundingBox: Schema.optional(GoogleCloudVisionV1p4beta1BoundingPoly),
  property: Schema.optional(GoogleCloudVisionV1p4beta1TextAnnotationTextProperty),
  symbols: Schema.optional(Schema.Array(GoogleCloudVisionV1p4beta1Symbol)),
})).annotate({ identifier: "GoogleCloudVisionV1p4beta1Word" }) as any as Schema.Schema<GoogleCloudVisionV1p4beta1Word>;

export interface GoogleCloudVisionV1p4beta1Paragraph {
  /** List of all words in this paragraph. */
  words?: Array<GoogleCloudVisionV1p4beta1Word>;
  /** The bounding box for the paragraph. The vertices are in the order of top-left, top-right, bottom-right, bottom-left. When a rotation of the bounding box is detected the rotation is represented as around the top-left corner as defined when the text is read in the 'natural' orientation. For example: * when the text is horizontal it might look like: 0----1 | | 3----2 * when it's rotated 180 degrees around the top-left corner it becomes: 2----3 | | 1----0 and the vertex order will still be (0, 1, 2, 3). */
  boundingBox?: GoogleCloudVisionV1p4beta1BoundingPoly;
  /** Confidence of the OCR results for the paragraph. Range [0, 1]. */
  confidence?: number;
  /** Additional information detected for the paragraph. */
  property?: GoogleCloudVisionV1p4beta1TextAnnotationTextProperty;
}

export const GoogleCloudVisionV1p4beta1Paragraph: Schema.Schema<GoogleCloudVisionV1p4beta1Paragraph> = Schema.suspend(() => Schema.Struct({
  words: Schema.optional(Schema.Array(GoogleCloudVisionV1p4beta1Word)),
  boundingBox: Schema.optional(GoogleCloudVisionV1p4beta1BoundingPoly),
  confidence: Schema.optional(Schema.Number),
  property: Schema.optional(GoogleCloudVisionV1p4beta1TextAnnotationTextProperty),
})).annotate({ identifier: "GoogleCloudVisionV1p4beta1Paragraph" }) as any as Schema.Schema<GoogleCloudVisionV1p4beta1Paragraph>;

export interface GoogleCloudVisionV1p4beta1Block {
  /** List of paragraphs in this block (if this blocks is of type text). */
  paragraphs?: Array<GoogleCloudVisionV1p4beta1Paragraph>;
  /** Confidence of the OCR results on the block. Range [0, 1]. */
  confidence?: number;
  /** Additional information detected for the block. */
  property?: GoogleCloudVisionV1p4beta1TextAnnotationTextProperty;
  /** Detected block type (text, image etc) for this block. */
  blockType?: "UNKNOWN" | "TEXT" | "TABLE" | "PICTURE" | "RULER" | "BARCODE" | (string & {});
  /** The bounding box for the block. The vertices are in the order of top-left, top-right, bottom-right, bottom-left. When a rotation of the bounding box is detected the rotation is represented as around the top-left corner as defined when the text is read in the 'natural' orientation. For example: * when the text is horizontal it might look like: 0----1 | | 3----2 * when it's rotated 180 degrees around the top-left corner it becomes: 2----3 | | 1----0 and the vertex order will still be (0, 1, 2, 3). */
  boundingBox?: GoogleCloudVisionV1p4beta1BoundingPoly;
}

export const GoogleCloudVisionV1p4beta1Block: Schema.Schema<GoogleCloudVisionV1p4beta1Block> = Schema.suspend(() => Schema.Struct({
  paragraphs: Schema.optional(Schema.Array(GoogleCloudVisionV1p4beta1Paragraph)),
  confidence: Schema.optional(Schema.Number),
  property: Schema.optional(GoogleCloudVisionV1p4beta1TextAnnotationTextProperty),
  blockType: Schema.optional(Schema.String),
  boundingBox: Schema.optional(GoogleCloudVisionV1p4beta1BoundingPoly),
})).annotate({ identifier: "GoogleCloudVisionV1p4beta1Block" }) as any as Schema.Schema<GoogleCloudVisionV1p4beta1Block>;

export interface GoogleCloudVisionV1p4beta1Page {
  /** Confidence of the OCR results on the page. Range [0, 1]. */
  confidence?: number;
  /** List of blocks of text, images etc on this page. */
  blocks?: Array<GoogleCloudVisionV1p4beta1Block>;
  /** Page width. For PDFs the unit is points. For images (including TIFFs) the unit is pixels. */
  width?: number;
  /** Page height. For PDFs the unit is points. For images (including TIFFs) the unit is pixels. */
  height?: number;
  /** Additional information detected on the page. */
  property?: GoogleCloudVisionV1p4beta1TextAnnotationTextProperty;
}

export const GoogleCloudVisionV1p4beta1Page: Schema.Schema<GoogleCloudVisionV1p4beta1Page> = Schema.suspend(() => Schema.Struct({
  confidence: Schema.optional(Schema.Number),
  blocks: Schema.optional(Schema.Array(GoogleCloudVisionV1p4beta1Block)),
  width: Schema.optional(Schema.Number),
  height: Schema.optional(Schema.Number),
  property: Schema.optional(GoogleCloudVisionV1p4beta1TextAnnotationTextProperty),
})).annotate({ identifier: "GoogleCloudVisionV1p4beta1Page" }) as any as Schema.Schema<GoogleCloudVisionV1p4beta1Page>;

export interface GoogleCloudVisionV1p4beta1TextAnnotation {
  /** List of pages detected by OCR. */
  pages?: Array<GoogleCloudVisionV1p4beta1Page>;
  /** UTF-8 text detected on the pages. */
  text?: string;
}

export const GoogleCloudVisionV1p4beta1TextAnnotation: Schema.Schema<GoogleCloudVisionV1p4beta1TextAnnotation> = Schema.suspend(() => Schema.Struct({
  pages: Schema.optional(Schema.Array(GoogleCloudVisionV1p4beta1Page)),
  text: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p4beta1TextAnnotation" }) as any as Schema.Schema<GoogleCloudVisionV1p4beta1TextAnnotation>;

export interface GoogleCloudVisionV1p4beta1AnnotateImageResponse {
  /** If present, product search has completed successfully. */
  productSearchResults?: GoogleCloudVisionV1p4beta1ProductSearchResults;
  /** If set, represents the error message for the operation. Note that filled-in image annotations are guaranteed to be correct, even when `error` is set. */
  error?: Status;
  /** If present, face detection has completed successfully. */
  faceAnnotations?: Array<GoogleCloudVisionV1p4beta1FaceAnnotation>;
  /** If present, web detection has completed successfully. */
  webDetection?: GoogleCloudVisionV1p4beta1WebDetection;
  /** If present, safe-search annotation has completed successfully. */
  safeSearchAnnotation?: GoogleCloudVisionV1p4beta1SafeSearchAnnotation;
  /** If present, contextual information is needed to understand where this image comes from. */
  context?: GoogleCloudVisionV1p4beta1ImageAnnotationContext;
  /** If present, localized object detection has completed successfully. This will be sorted descending by confidence score. */
  localizedObjectAnnotations?: Array<GoogleCloudVisionV1p4beta1LocalizedObjectAnnotation>;
  /** If present, label detection has completed successfully. */
  labelAnnotations?: Array<GoogleCloudVisionV1p4beta1EntityAnnotation>;
  /** If present, image properties were extracted successfully. */
  imagePropertiesAnnotation?: GoogleCloudVisionV1p4beta1ImageProperties;
  /** If present, crop hints have completed successfully. */
  cropHintsAnnotation?: GoogleCloudVisionV1p4beta1CropHintsAnnotation;
  /** If present, logo detection has completed successfully. */
  logoAnnotations?: Array<GoogleCloudVisionV1p4beta1EntityAnnotation>;
  /** If present, text (OCR) detection or document (OCR) text detection has completed successfully. This annotation provides the structural hierarchy for the OCR detected text. */
  fullTextAnnotation?: GoogleCloudVisionV1p4beta1TextAnnotation;
  /** If present, text (OCR) detection has completed successfully. */
  textAnnotations?: Array<GoogleCloudVisionV1p4beta1EntityAnnotation>;
  /** If present, landmark detection has completed successfully. */
  landmarkAnnotations?: Array<GoogleCloudVisionV1p4beta1EntityAnnotation>;
}

export const GoogleCloudVisionV1p4beta1AnnotateImageResponse: Schema.Schema<GoogleCloudVisionV1p4beta1AnnotateImageResponse> = Schema.suspend(() => Schema.Struct({
  productSearchResults: Schema.optional(GoogleCloudVisionV1p4beta1ProductSearchResults),
  error: Schema.optional(Status),
  faceAnnotations: Schema.optional(Schema.Array(GoogleCloudVisionV1p4beta1FaceAnnotation)),
  webDetection: Schema.optional(GoogleCloudVisionV1p4beta1WebDetection),
  safeSearchAnnotation: Schema.optional(GoogleCloudVisionV1p4beta1SafeSearchAnnotation),
  context: Schema.optional(GoogleCloudVisionV1p4beta1ImageAnnotationContext),
  localizedObjectAnnotations: Schema.optional(Schema.Array(GoogleCloudVisionV1p4beta1LocalizedObjectAnnotation)),
  labelAnnotations: Schema.optional(Schema.Array(GoogleCloudVisionV1p4beta1EntityAnnotation)),
  imagePropertiesAnnotation: Schema.optional(GoogleCloudVisionV1p4beta1ImageProperties),
  cropHintsAnnotation: Schema.optional(GoogleCloudVisionV1p4beta1CropHintsAnnotation),
  logoAnnotations: Schema.optional(Schema.Array(GoogleCloudVisionV1p4beta1EntityAnnotation)),
  fullTextAnnotation: Schema.optional(GoogleCloudVisionV1p4beta1TextAnnotation),
  textAnnotations: Schema.optional(Schema.Array(GoogleCloudVisionV1p4beta1EntityAnnotation)),
  landmarkAnnotations: Schema.optional(Schema.Array(GoogleCloudVisionV1p4beta1EntityAnnotation)),
})).annotate({ identifier: "GoogleCloudVisionV1p4beta1AnnotateImageResponse" }) as any as Schema.Schema<GoogleCloudVisionV1p4beta1AnnotateImageResponse>;

export interface GoogleCloudVisionV1p1beta1GcsDestination {
  /** Google Cloud Storage URI prefix where the results will be stored. Results will be in JSON format and preceded by its corresponding input URI prefix. This field can either represent a gcs file prefix or gcs directory. In either case, the uri should be unique because in order to get all of the output files, you will need to do a wildcard gcs search on the uri prefix you provide. Examples: * File Prefix: gs://bucket-name/here/filenameprefix The output files will be created in gs://bucket-name/here/ and the names of the output files will begin with "filenameprefix". * Directory Prefix: gs://bucket-name/some/location/ The output files will be created in gs://bucket-name/some/location/ and the names of the output files could be anything because there was no filename prefix specified. If multiple outputs, each response is still AnnotateFileResponse, each of which contains some subset of the full list of AnnotateImageResponse. Multiple outputs can happen if, for example, the output JSON is too large and overflows into multiple sharded files. */
  uri?: string;
}

export const GoogleCloudVisionV1p1beta1GcsDestination: Schema.Schema<GoogleCloudVisionV1p1beta1GcsDestination> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p1beta1GcsDestination" }) as any as Schema.Schema<GoogleCloudVisionV1p1beta1GcsDestination>;

export interface GoogleCloudVisionV1p1beta1OutputConfig {
  /** The Google Cloud Storage location to write the output(s) to. */
  gcsDestination?: GoogleCloudVisionV1p1beta1GcsDestination;
  /** The max number of response protos to put into each output JSON file on Google Cloud Storage. The valid range is [1, 100]. If not specified, the default value is 20. For example, for one pdf file with 100 pages, 100 response protos will be generated. If `batch_size` = 20, then 5 json files each containing 20 response protos will be written under the prefix `gcs_destination`.`uri`. Currently, batch_size only applies to GcsDestination, with potential future support for other output configurations. */
  batchSize?: number;
}

export const GoogleCloudVisionV1p1beta1OutputConfig: Schema.Schema<GoogleCloudVisionV1p1beta1OutputConfig> = Schema.suspend(() => Schema.Struct({
  gcsDestination: Schema.optional(GoogleCloudVisionV1p1beta1GcsDestination),
  batchSize: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVisionV1p1beta1OutputConfig" }) as any as Schema.Schema<GoogleCloudVisionV1p1beta1OutputConfig>;

export interface GoogleCloudVisionV1p1beta1AsyncAnnotateFileResponse {
  /** The output location and metadata from AsyncAnnotateFileRequest. */
  outputConfig?: GoogleCloudVisionV1p1beta1OutputConfig;
}

export const GoogleCloudVisionV1p1beta1AsyncAnnotateFileResponse: Schema.Schema<GoogleCloudVisionV1p1beta1AsyncAnnotateFileResponse> = Schema.suspend(() => Schema.Struct({
  outputConfig: Schema.optional(GoogleCloudVisionV1p1beta1OutputConfig),
})).annotate({ identifier: "GoogleCloudVisionV1p1beta1AsyncAnnotateFileResponse" }) as any as Schema.Schema<GoogleCloudVisionV1p1beta1AsyncAnnotateFileResponse>;

export interface GoogleCloudVisionV1p3beta1Position {
  /** X coordinate. */
  x?: number;
  /** Y coordinate. */
  y?: number;
  /** Z coordinate (or depth). */
  z?: number;
}

export const GoogleCloudVisionV1p3beta1Position: Schema.Schema<GoogleCloudVisionV1p3beta1Position> = Schema.suspend(() => Schema.Struct({
  x: Schema.optional(Schema.Number),
  y: Schema.optional(Schema.Number),
  z: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVisionV1p3beta1Position" }) as any as Schema.Schema<GoogleCloudVisionV1p3beta1Position>;

export interface GoogleCloudVisionV1p3beta1FaceAnnotationLandmark {
  /** Face landmark position. */
  position?: GoogleCloudVisionV1p3beta1Position;
  /** Face landmark type. */
  type?: "UNKNOWN_LANDMARK" | "LEFT_EYE" | "RIGHT_EYE" | "LEFT_OF_LEFT_EYEBROW" | "RIGHT_OF_LEFT_EYEBROW" | "LEFT_OF_RIGHT_EYEBROW" | "RIGHT_OF_RIGHT_EYEBROW" | "MIDPOINT_BETWEEN_EYES" | "NOSE_TIP" | "UPPER_LIP" | "LOWER_LIP" | "MOUTH_LEFT" | "MOUTH_RIGHT" | "MOUTH_CENTER" | "NOSE_BOTTOM_RIGHT" | "NOSE_BOTTOM_LEFT" | "NOSE_BOTTOM_CENTER" | "LEFT_EYE_TOP_BOUNDARY" | "LEFT_EYE_RIGHT_CORNER" | "LEFT_EYE_BOTTOM_BOUNDARY" | "LEFT_EYE_LEFT_CORNER" | "RIGHT_EYE_TOP_BOUNDARY" | "RIGHT_EYE_RIGHT_CORNER" | "RIGHT_EYE_BOTTOM_BOUNDARY" | "RIGHT_EYE_LEFT_CORNER" | "LEFT_EYEBROW_UPPER_MIDPOINT" | "RIGHT_EYEBROW_UPPER_MIDPOINT" | "LEFT_EAR_TRAGION" | "RIGHT_EAR_TRAGION" | "LEFT_EYE_PUPIL" | "RIGHT_EYE_PUPIL" | "FOREHEAD_GLABELLA" | "CHIN_GNATHION" | "CHIN_LEFT_GONION" | "CHIN_RIGHT_GONION" | "LEFT_CHEEK_CENTER" | "RIGHT_CHEEK_CENTER" | (string & {});
}

export const GoogleCloudVisionV1p3beta1FaceAnnotationLandmark: Schema.Schema<GoogleCloudVisionV1p3beta1FaceAnnotationLandmark> = Schema.suspend(() => Schema.Struct({
  position: Schema.optional(GoogleCloudVisionV1p3beta1Position),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p3beta1FaceAnnotationLandmark" }) as any as Schema.Schema<GoogleCloudVisionV1p3beta1FaceAnnotationLandmark>;

export interface GcsSource {
  /** Google Cloud Storage URI for the input file. This must only be a Google Cloud Storage object. Wildcards are not currently supported. */
  uri?: string;
}

export const GcsSource: Schema.Schema<GcsSource> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "GcsSource" }) as any as Schema.Schema<GcsSource>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface DetectedBreak {
  /** Detected break type. */
  type?: "UNKNOWN" | "SPACE" | "SURE_SPACE" | "EOL_SURE_SPACE" | "HYPHEN" | "LINE_BREAK" | (string & {});
  /** True if break prepends the element. */
  isPrefix?: boolean;
}

export const DetectedBreak: Schema.Schema<DetectedBreak> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  isPrefix: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "DetectedBreak" }) as any as Schema.Schema<DetectedBreak>;

export interface DetectedLanguage {
  /** Confidence of detected language. Range [0, 1]. */
  confidence?: number;
  /** The BCP-47 language code, such as "en-US" or "sr-Latn". For more information, see http://www.unicode.org/reports/tr35/#Unicode_locale_identifier. */
  languageCode?: string;
}

export const DetectedLanguage: Schema.Schema<DetectedLanguage> = Schema.suspend(() => Schema.Struct({
  confidence: Schema.optional(Schema.Number),
  languageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "DetectedLanguage" }) as any as Schema.Schema<DetectedLanguage>;

export interface TextProperty {
  /** Detected start or end of a text segment. */
  detectedBreak?: DetectedBreak;
  /** A list of detected languages together with confidence. */
  detectedLanguages?: Array<DetectedLanguage>;
}

export const TextProperty: Schema.Schema<TextProperty> = Schema.suspend(() => Schema.Struct({
  detectedBreak: Schema.optional(DetectedBreak),
  detectedLanguages: Schema.optional(Schema.Array(DetectedLanguage)),
})).annotate({ identifier: "TextProperty" }) as any as Schema.Schema<TextProperty>;

export interface Vision_Symbol {
  /** Confidence of the OCR results for the symbol. Range [0, 1]. */
  confidence?: number;
  /** The bounding box for the symbol. The vertices are in the order of top-left, top-right, bottom-right, bottom-left. When a rotation of the bounding box is detected the rotation is represented as around the top-left corner as defined when the text is read in the 'natural' orientation. For example: * when the text is horizontal it might look like: 0----1 | | 3----2 * when it's rotated 180 degrees around the top-left corner it becomes: 2----3 | | 1----0 and the vertex order will still be (0, 1, 2, 3). */
  boundingBox?: BoundingPoly;
  /** Additional information detected for the symbol. */
  property?: TextProperty;
  /** The actual UTF-8 representation of the symbol. */
  text?: string;
}

export const Vision_Symbol: Schema.Schema<Vision_Symbol> = Schema.suspend(() => Schema.Struct({
  confidence: Schema.optional(Schema.Number),
  boundingBox: Schema.optional(BoundingPoly),
  property: Schema.optional(TextProperty),
  text: Schema.optional(Schema.String),
})).annotate({ identifier: "Vision_Symbol" }) as any as Schema.Schema<Vision_Symbol>;

export interface Word {
  /** List of symbols in the word. The order of the symbols follows the natural reading order. */
  symbols?: Array<Vision_Symbol>;
  /** The bounding box for the word. The vertices are in the order of top-left, top-right, bottom-right, bottom-left. When a rotation of the bounding box is detected the rotation is represented as around the top-left corner as defined when the text is read in the 'natural' orientation. For example: * when the text is horizontal it might look like: 0----1 | | 3----2 * when it's rotated 180 degrees around the top-left corner it becomes: 2----3 | | 1----0 and the vertex order will still be (0, 1, 2, 3). */
  boundingBox?: BoundingPoly;
  /** Confidence of the OCR results for the word. Range [0, 1]. */
  confidence?: number;
  /** Additional information detected for the word. */
  property?: TextProperty;
}

export const Word: Schema.Schema<Word> = Schema.suspend(() => Schema.Struct({
  symbols: Schema.optional(Schema.Array(Vision_Symbol)),
  boundingBox: Schema.optional(BoundingPoly),
  confidence: Schema.optional(Schema.Number),
  property: Schema.optional(TextProperty),
})).annotate({ identifier: "Word" }) as any as Schema.Schema<Word>;

export interface Paragraph {
  /** Additional information detected for the paragraph. */
  property?: TextProperty;
  /** List of all words in this paragraph. */
  words?: Array<Word>;
  /** Confidence of the OCR results for the paragraph. Range [0, 1]. */
  confidence?: number;
  /** The bounding box for the paragraph. The vertices are in the order of top-left, top-right, bottom-right, bottom-left. When a rotation of the bounding box is detected the rotation is represented as around the top-left corner as defined when the text is read in the 'natural' orientation. For example: * when the text is horizontal it might look like: 0----1 | | 3----2 * when it's rotated 180 degrees around the top-left corner it becomes: 2----3 | | 1----0 and the vertex order will still be (0, 1, 2, 3). */
  boundingBox?: BoundingPoly;
}

export const Paragraph: Schema.Schema<Paragraph> = Schema.suspend(() => Schema.Struct({
  property: Schema.optional(TextProperty),
  words: Schema.optional(Schema.Array(Word)),
  confidence: Schema.optional(Schema.Number),
  boundingBox: Schema.optional(BoundingPoly),
})).annotate({ identifier: "Paragraph" }) as any as Schema.Schema<Paragraph>;

export interface Block {
  /** Detected block type (text, image etc) for this block. */
  blockType?: "UNKNOWN" | "TEXT" | "TABLE" | "PICTURE" | "RULER" | "BARCODE" | (string & {});
  /** List of paragraphs in this block (if this blocks is of type text). */
  paragraphs?: Array<Paragraph>;
  /** Confidence of the OCR results on the block. Range [0, 1]. */
  confidence?: number;
  /** Additional information detected for the block. */
  property?: TextProperty;
  /** The bounding box for the block. The vertices are in the order of top-left, top-right, bottom-right, bottom-left. When a rotation of the bounding box is detected the rotation is represented as around the top-left corner as defined when the text is read in the 'natural' orientation. For example: * when the text is horizontal it might look like: 0----1 | | 3----2 * when it's rotated 180 degrees around the top-left corner it becomes: 2----3 | | 1----0 and the vertex order will still be (0, 1, 2, 3). */
  boundingBox?: BoundingPoly;
}

export const Block: Schema.Schema<Block> = Schema.suspend(() => Schema.Struct({
  blockType: Schema.optional(Schema.String),
  paragraphs: Schema.optional(Schema.Array(Paragraph)),
  confidence: Schema.optional(Schema.Number),
  property: Schema.optional(TextProperty),
  boundingBox: Schema.optional(BoundingPoly),
})).annotate({ identifier: "Block" }) as any as Schema.Schema<Block>;

export interface Page {
  /** Confidence of the OCR results on the page. Range [0, 1]. */
  confidence?: number;
  /** Page height. For PDFs the unit is points. For images (including TIFFs) the unit is pixels. */
  height?: number;
  /** Additional information detected on the page. */
  property?: TextProperty;
  /** List of blocks of text, images etc on this page. */
  blocks?: Array<Block>;
  /** Page width. For PDFs the unit is points. For images (including TIFFs) the unit is pixels. */
  width?: number;
}

export const Page: Schema.Schema<Page> = Schema.suspend(() => Schema.Struct({
  confidence: Schema.optional(Schema.Number),
  height: Schema.optional(Schema.Number),
  property: Schema.optional(TextProperty),
  blocks: Schema.optional(Schema.Array(Block)),
  width: Schema.optional(Schema.Number),
})).annotate({ identifier: "Page" }) as any as Schema.Schema<Page>;

export interface WebDetectionParams {
  /** This field has no effect on results. */
  includeGeoResults?: boolean;
}

export const WebDetectionParams: Schema.Schema<WebDetectionParams> = Schema.suspend(() => Schema.Struct({
  includeGeoResults: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "WebDetectionParams" }) as any as Schema.Schema<WebDetectionParams>;

export interface Position {
  /** Z coordinate (or depth). */
  z?: number;
  /** X coordinate. */
  x?: number;
  /** Y coordinate. */
  y?: number;
}

export const Position: Schema.Schema<Position> = Schema.suspend(() => Schema.Struct({
  z: Schema.optional(Schema.Number),
  x: Schema.optional(Schema.Number),
  y: Schema.optional(Schema.Number),
})).annotate({ identifier: "Position" }) as any as Schema.Schema<Position>;

export interface Landmark {
  /** Face landmark type. */
  type?: "UNKNOWN_LANDMARK" | "LEFT_EYE" | "RIGHT_EYE" | "LEFT_OF_LEFT_EYEBROW" | "RIGHT_OF_LEFT_EYEBROW" | "LEFT_OF_RIGHT_EYEBROW" | "RIGHT_OF_RIGHT_EYEBROW" | "MIDPOINT_BETWEEN_EYES" | "NOSE_TIP" | "UPPER_LIP" | "LOWER_LIP" | "MOUTH_LEFT" | "MOUTH_RIGHT" | "MOUTH_CENTER" | "NOSE_BOTTOM_RIGHT" | "NOSE_BOTTOM_LEFT" | "NOSE_BOTTOM_CENTER" | "LEFT_EYE_TOP_BOUNDARY" | "LEFT_EYE_RIGHT_CORNER" | "LEFT_EYE_BOTTOM_BOUNDARY" | "LEFT_EYE_LEFT_CORNER" | "RIGHT_EYE_TOP_BOUNDARY" | "RIGHT_EYE_RIGHT_CORNER" | "RIGHT_EYE_BOTTOM_BOUNDARY" | "RIGHT_EYE_LEFT_CORNER" | "LEFT_EYEBROW_UPPER_MIDPOINT" | "RIGHT_EYEBROW_UPPER_MIDPOINT" | "LEFT_EAR_TRAGION" | "RIGHT_EAR_TRAGION" | "LEFT_EYE_PUPIL" | "RIGHT_EYE_PUPIL" | "FOREHEAD_GLABELLA" | "CHIN_GNATHION" | "CHIN_LEFT_GONION" | "CHIN_RIGHT_GONION" | "LEFT_CHEEK_CENTER" | "RIGHT_CHEEK_CENTER" | (string & {});
  /** Face landmark position. */
  position?: Position;
}

export const Landmark: Schema.Schema<Landmark> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  position: Schema.optional(Position),
})).annotate({ identifier: "Landmark" }) as any as Schema.Schema<Landmark>;

export interface GoogleCloudVisionV1p3beta1OperationMetadata {
  /** The time when the batch request was received. */
  createTime?: string;
  /** The time when the operation result was last updated. */
  updateTime?: string;
  /** Current state of the batch operation. */
  state?: "STATE_UNSPECIFIED" | "CREATED" | "RUNNING" | "DONE" | "CANCELLED" | (string & {});
}

export const GoogleCloudVisionV1p3beta1OperationMetadata: Schema.Schema<GoogleCloudVisionV1p3beta1OperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p3beta1OperationMetadata" }) as any as Schema.Schema<GoogleCloudVisionV1p3beta1OperationMetadata>;

export interface GoogleCloudVisionV1p4beta1GcsDestination {
  /** Google Cloud Storage URI prefix where the results will be stored. Results will be in JSON format and preceded by its corresponding input URI prefix. This field can either represent a gcs file prefix or gcs directory. In either case, the uri should be unique because in order to get all of the output files, you will need to do a wildcard gcs search on the uri prefix you provide. Examples: * File Prefix: gs://bucket-name/here/filenameprefix The output files will be created in gs://bucket-name/here/ and the names of the output files will begin with "filenameprefix". * Directory Prefix: gs://bucket-name/some/location/ The output files will be created in gs://bucket-name/some/location/ and the names of the output files could be anything because there was no filename prefix specified. If multiple outputs, each response is still AnnotateFileResponse, each of which contains some subset of the full list of AnnotateImageResponse. Multiple outputs can happen if, for example, the output JSON is too large and overflows into multiple sharded files. */
  uri?: string;
}

export const GoogleCloudVisionV1p4beta1GcsDestination: Schema.Schema<GoogleCloudVisionV1p4beta1GcsDestination> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p4beta1GcsDestination" }) as any as Schema.Schema<GoogleCloudVisionV1p4beta1GcsDestination>;

export interface GoogleCloudVisionV1p4beta1OutputConfig {
  /** The max number of response protos to put into each output JSON file on Google Cloud Storage. The valid range is [1, 100]. If not specified, the default value is 20. For example, for one pdf file with 100 pages, 100 response protos will be generated. If `batch_size` = 20, then 5 json files each containing 20 response protos will be written under the prefix `gcs_destination`.`uri`. Currently, batch_size only applies to GcsDestination, with potential future support for other output configurations. */
  batchSize?: number;
  /** The Google Cloud Storage location to write the output(s) to. */
  gcsDestination?: GoogleCloudVisionV1p4beta1GcsDestination;
}

export const GoogleCloudVisionV1p4beta1OutputConfig: Schema.Schema<GoogleCloudVisionV1p4beta1OutputConfig> = Schema.suspend(() => Schema.Struct({
  batchSize: Schema.optional(Schema.Number),
  gcsDestination: Schema.optional(GoogleCloudVisionV1p4beta1GcsDestination),
})).annotate({ identifier: "GoogleCloudVisionV1p4beta1OutputConfig" }) as any as Schema.Schema<GoogleCloudVisionV1p4beta1OutputConfig>;

export interface GoogleCloudVisionV1p4beta1AsyncBatchAnnotateImagesResponse {
  /** The output location and metadata from AsyncBatchAnnotateImagesRequest. */
  outputConfig?: GoogleCloudVisionV1p4beta1OutputConfig;
}

export const GoogleCloudVisionV1p4beta1AsyncBatchAnnotateImagesResponse: Schema.Schema<GoogleCloudVisionV1p4beta1AsyncBatchAnnotateImagesResponse> = Schema.suspend(() => Schema.Struct({
  outputConfig: Schema.optional(GoogleCloudVisionV1p4beta1OutputConfig),
})).annotate({ identifier: "GoogleCloudVisionV1p4beta1AsyncBatchAnnotateImagesResponse" }) as any as Schema.Schema<GoogleCloudVisionV1p4beta1AsyncBatchAnnotateImagesResponse>;

export interface GcsDestination {
  /** Google Cloud Storage URI prefix where the results will be stored. Results will be in JSON format and preceded by its corresponding input URI prefix. This field can either represent a gcs file prefix or gcs directory. In either case, the uri should be unique because in order to get all of the output files, you will need to do a wildcard gcs search on the uri prefix you provide. Examples: * File Prefix: gs://bucket-name/here/filenameprefix The output files will be created in gs://bucket-name/here/ and the names of the output files will begin with "filenameprefix". * Directory Prefix: gs://bucket-name/some/location/ The output files will be created in gs://bucket-name/some/location/ and the names of the output files could be anything because there was no filename prefix specified. If multiple outputs, each response is still AnnotateFileResponse, each of which contains some subset of the full list of AnnotateImageResponse. Multiple outputs can happen if, for example, the output JSON is too large and overflows into multiple sharded files. */
  uri?: string;
}

export const GcsDestination: Schema.Schema<GcsDestination> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "GcsDestination" }) as any as Schema.Schema<GcsDestination>;

export interface OutputConfig {
  /** The Google Cloud Storage location to write the output(s) to. */
  gcsDestination?: GcsDestination;
  /** The max number of response protos to put into each output JSON file on Google Cloud Storage. The valid range is [1, 100]. If not specified, the default value is 20. For example, for one pdf file with 100 pages, 100 response protos will be generated. If `batch_size` = 20, then 5 json files each containing 20 response protos will be written under the prefix `gcs_destination`.`uri`. Currently, batch_size only applies to GcsDestination, with potential future support for other output configurations. */
  batchSize?: number;
}

export const OutputConfig: Schema.Schema<OutputConfig> = Schema.suspend(() => Schema.Struct({
  gcsDestination: Schema.optional(GcsDestination),
  batchSize: Schema.optional(Schema.Number),
})).annotate({ identifier: "OutputConfig" }) as any as Schema.Schema<OutputConfig>;

export interface GoogleCloudVisionV1p4beta1BatchOperationMetadata {
  /** The time when the batch request was submitted to the server. */
  submitTime?: string;
  /** The current state of the batch operation. */
  state?: "STATE_UNSPECIFIED" | "PROCESSING" | "SUCCESSFUL" | "FAILED" | "CANCELLED" | (string & {});
  /** The time when the batch request is finished and google.longrunning.Operation.done is set to true. */
  endTime?: string;
}

export const GoogleCloudVisionV1p4beta1BatchOperationMetadata: Schema.Schema<GoogleCloudVisionV1p4beta1BatchOperationMetadata> = Schema.suspend(() => Schema.Struct({
  submitTime: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p4beta1BatchOperationMetadata" }) as any as Schema.Schema<GoogleCloudVisionV1p4beta1BatchOperationMetadata>;

export interface GoogleCloudVisionV1p4beta1ReferenceImage {
  /** Optional. Bounding polygons around the areas of interest in the reference image. If this field is empty, the system will try to detect regions of interest. At most 10 bounding polygons will be used. The provided shape is converted into a non-rotated rectangle. Once converted, the small edge of the rectangle must be greater than or equal to 300 pixels. The aspect ratio must be 1:4 or less (i.e. 1:3 is ok; 1:5 is not). */
  boundingPolys?: Array<GoogleCloudVisionV1p4beta1BoundingPoly>;
  /** The resource name of the reference image. Format is: `projects/PROJECT_ID/locations/LOC_ID/products/PRODUCT_ID/referenceImages/IMAGE_ID`. This field is ignored when creating a reference image. */
  name?: string;
  /** Required. The Google Cloud Storage URI of the reference image. The URI must start with `gs://`. */
  uri?: string;
}

export const GoogleCloudVisionV1p4beta1ReferenceImage: Schema.Schema<GoogleCloudVisionV1p4beta1ReferenceImage> = Schema.suspend(() => Schema.Struct({
  boundingPolys: Schema.optional(Schema.Array(GoogleCloudVisionV1p4beta1BoundingPoly)),
  name: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p4beta1ReferenceImage" }) as any as Schema.Schema<GoogleCloudVisionV1p4beta1ReferenceImage>;

export interface GoogleCloudVisionV1p4beta1ImportProductSetsResponse {
  /** The list of reference_images that are imported successfully. */
  referenceImages?: Array<GoogleCloudVisionV1p4beta1ReferenceImage>;
  /** The rpc status for each ImportProductSet request, including both successes and errors. The number of statuses here matches the number of lines in the csv file, and statuses[i] stores the success or failure status of processing the i-th line of the csv, starting from line 0. */
  statuses?: Array<Status>;
}

export const GoogleCloudVisionV1p4beta1ImportProductSetsResponse: Schema.Schema<GoogleCloudVisionV1p4beta1ImportProductSetsResponse> = Schema.suspend(() => Schema.Struct({
  referenceImages: Schema.optional(Schema.Array(GoogleCloudVisionV1p4beta1ReferenceImage)),
  statuses: Schema.optional(Schema.Array(Status)),
})).annotate({ identifier: "GoogleCloudVisionV1p4beta1ImportProductSetsResponse" }) as any as Schema.Schema<GoogleCloudVisionV1p4beta1ImportProductSetsResponse>;

export interface GoogleCloudVisionV1p1beta1AsyncBatchAnnotateFilesResponse {
  /** The list of file annotation responses, one for each request in AsyncBatchAnnotateFilesRequest. */
  responses?: Array<GoogleCloudVisionV1p1beta1AsyncAnnotateFileResponse>;
}

export const GoogleCloudVisionV1p1beta1AsyncBatchAnnotateFilesResponse: Schema.Schema<GoogleCloudVisionV1p1beta1AsyncBatchAnnotateFilesResponse> = Schema.suspend(() => Schema.Struct({
  responses: Schema.optional(Schema.Array(GoogleCloudVisionV1p1beta1AsyncAnnotateFileResponse)),
})).annotate({ identifier: "GoogleCloudVisionV1p1beta1AsyncBatchAnnotateFilesResponse" }) as any as Schema.Schema<GoogleCloudVisionV1p1beta1AsyncBatchAnnotateFilesResponse>;

export interface GoogleCloudVisionV1p3beta1GcsSource {
  /** Google Cloud Storage URI for the input file. This must only be a Google Cloud Storage object. Wildcards are not currently supported. */
  uri?: string;
}

export const GoogleCloudVisionV1p3beta1GcsSource: Schema.Schema<GoogleCloudVisionV1p3beta1GcsSource> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p3beta1GcsSource" }) as any as Schema.Schema<GoogleCloudVisionV1p3beta1GcsSource>;

export interface GoogleCloudVisionV1p3beta1InputConfig {
  /** File content, represented as a stream of bytes. Note: As with all `bytes` fields, protobuffers use a pure binary representation, whereas JSON representations use base64. Currently, this field only works for BatchAnnotateFiles requests. It does not work for AsyncBatchAnnotateFiles requests. */
  content?: string;
  /** The type of the file. Currently only "application/pdf", "image/tiff" and "image/gif" are supported. Wildcards are not supported. */
  mimeType?: string;
  /** The Google Cloud Storage location to read the input from. */
  gcsSource?: GoogleCloudVisionV1p3beta1GcsSource;
}

export const GoogleCloudVisionV1p3beta1InputConfig: Schema.Schema<GoogleCloudVisionV1p3beta1InputConfig> = Schema.suspend(() => Schema.Struct({
  content: Schema.optional(Schema.String),
  mimeType: Schema.optional(Schema.String),
  gcsSource: Schema.optional(GoogleCloudVisionV1p3beta1GcsSource),
})).annotate({ identifier: "GoogleCloudVisionV1p3beta1InputConfig" }) as any as Schema.Schema<GoogleCloudVisionV1p3beta1InputConfig>;

export interface GoogleCloudVisionV1p3beta1Property {
  /** Name of the property. */
  name?: string;
  /** Value of the property. */
  value?: string;
  /** Value of numeric properties. */
  uint64Value?: string;
}

export const GoogleCloudVisionV1p3beta1Property: Schema.Schema<GoogleCloudVisionV1p3beta1Property> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
  uint64Value: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p3beta1Property" }) as any as Schema.Schema<GoogleCloudVisionV1p3beta1Property>;

export interface GoogleCloudVisionV1p3beta1WebDetectionWebLabel {
  /** Label for extra metadata. */
  label?: string;
  /** The BCP-47 language code for `label`, such as "en-US" or "sr-Latn". For more information, see http://www.unicode.org/reports/tr35/#Unicode_locale_identifier. */
  languageCode?: string;
}

export const GoogleCloudVisionV1p3beta1WebDetectionWebLabel: Schema.Schema<GoogleCloudVisionV1p3beta1WebDetectionWebLabel> = Schema.suspend(() => Schema.Struct({
  label: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p3beta1WebDetectionWebLabel" }) as any as Schema.Schema<GoogleCloudVisionV1p3beta1WebDetectionWebLabel>;

export interface GoogleCloudVisionV1p3beta1ColorInfo {
  /** Image-specific score for this color. Value in range [0, 1]. */
  score?: number;
  /** RGB components of the color. */
  color?: Color;
  /** The fraction of pixels the color occupies in the image. Value in range [0, 1]. */
  pixelFraction?: number;
}

export const GoogleCloudVisionV1p3beta1ColorInfo: Schema.Schema<GoogleCloudVisionV1p3beta1ColorInfo> = Schema.suspend(() => Schema.Struct({
  score: Schema.optional(Schema.Number),
  color: Schema.optional(Color),
  pixelFraction: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVisionV1p3beta1ColorInfo" }) as any as Schema.Schema<GoogleCloudVisionV1p3beta1ColorInfo>;

export interface GoogleCloudVisionV1p3beta1WebDetectionWebImage {
  /** The result image URL. */
  url?: string;
  /** (Deprecated) Overall relevancy score for the image. */
  score?: number;
}

export const GoogleCloudVisionV1p3beta1WebDetectionWebImage: Schema.Schema<GoogleCloudVisionV1p3beta1WebDetectionWebImage> = Schema.suspend(() => Schema.Struct({
  url: Schema.optional(Schema.String),
  score: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVisionV1p3beta1WebDetectionWebImage" }) as any as Schema.Schema<GoogleCloudVisionV1p3beta1WebDetectionWebImage>;

export interface GoogleCloudVisionV1p3beta1WebDetectionWebPage {
  /** (Deprecated) Overall relevancy score for the web page. */
  score?: number;
  /** Fully matching images on the page. Can include resized copies of the query image. */
  fullMatchingImages?: Array<GoogleCloudVisionV1p3beta1WebDetectionWebImage>;
  /** Title for the web page, may contain HTML markups. */
  pageTitle?: string;
  /** Partial matching images on the page. Those images are similar enough to share some key-point features. For example an original image will likely have partial matching for its crops. */
  partialMatchingImages?: Array<GoogleCloudVisionV1p3beta1WebDetectionWebImage>;
  /** The result web page URL. */
  url?: string;
}

export const GoogleCloudVisionV1p3beta1WebDetectionWebPage: Schema.Schema<GoogleCloudVisionV1p3beta1WebDetectionWebPage> = Schema.suspend(() => Schema.Struct({
  score: Schema.optional(Schema.Number),
  fullMatchingImages: Schema.optional(Schema.Array(GoogleCloudVisionV1p3beta1WebDetectionWebImage)),
  pageTitle: Schema.optional(Schema.String),
  partialMatchingImages: Schema.optional(Schema.Array(GoogleCloudVisionV1p3beta1WebDetectionWebImage)),
  url: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p3beta1WebDetectionWebPage" }) as any as Schema.Schema<GoogleCloudVisionV1p3beta1WebDetectionWebPage>;

export interface InputConfig {
  /** The type of the file. Currently only "application/pdf", "image/tiff" and "image/gif" are supported. Wildcards are not supported. */
  mimeType?: string;
  /** The Google Cloud Storage location to read the input from. */
  gcsSource?: GcsSource;
  /** File content, represented as a stream of bytes. Note: As with all `bytes` fields, protobuffers use a pure binary representation, whereas JSON representations use base64. Currently, this field only works for BatchAnnotateFiles requests. It does not work for AsyncBatchAnnotateFiles requests. */
  content?: string;
}

export const InputConfig: Schema.Schema<InputConfig> = Schema.suspend(() => Schema.Struct({
  mimeType: Schema.optional(Schema.String),
  gcsSource: Schema.optional(GcsSource),
  content: Schema.optional(Schema.String),
})).annotate({ identifier: "InputConfig" }) as any as Schema.Schema<InputConfig>;

export interface CropHintsParams {
  /** Aspect ratios in floats, representing the ratio of the width to the height of the image. For example, if the desired aspect ratio is 4/3, the corresponding float value should be 1.33333. If not specified, the best possible crop is returned. The number of provided aspect ratios is limited to a maximum of 16; any aspect ratios provided after the 16th are ignored. */
  aspectRatios?: Array<number>;
}

export const CropHintsParams: Schema.Schema<CropHintsParams> = Schema.suspend(() => Schema.Struct({
  aspectRatios: Schema.optional(Schema.Array(Schema.Number)),
})).annotate({ identifier: "CropHintsParams" }) as any as Schema.Schema<CropHintsParams>;

export interface LatLongRect {
  /** Min lat/long pair. */
  minLatLng?: LatLng;
  /** Max lat/long pair. */
  maxLatLng?: LatLng;
}

export const LatLongRect: Schema.Schema<LatLongRect> = Schema.suspend(() => Schema.Struct({
  minLatLng: Schema.optional(LatLng),
  maxLatLng: Schema.optional(LatLng),
})).annotate({ identifier: "LatLongRect" }) as any as Schema.Schema<LatLongRect>;

export interface TextDetectionParams {
  /** By default, Cloud Vision API only includes confidence score for DOCUMENT_TEXT_DETECTION result. Set the flag to true to include confidence score for TEXT_DETECTION as well. */
  enableTextDetectionConfidenceScore?: boolean;
  /** A list of advanced OCR options to further fine-tune OCR behavior. Current valid values are: - `legacy_layout`: a heuristics layout detection algorithm, which serves as an alternative to the current ML-based layout detection algorithm. Customers can choose the best suitable layout algorithm based on their situation. */
  advancedOcrOptions?: Array<string>;
}

export const TextDetectionParams: Schema.Schema<TextDetectionParams> = Schema.suspend(() => Schema.Struct({
  enableTextDetectionConfidenceScore: Schema.optional(Schema.Boolean),
  advancedOcrOptions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TextDetectionParams" }) as any as Schema.Schema<TextDetectionParams>;

export interface ProductSearchParams {
  /** The resource name of a ProductSet to be searched for similar images. Format is: `projects/PROJECT_ID/locations/LOC_ID/productSets/PRODUCT_SET_ID`. */
  productSet?: string;
  /** The filtering expression. This can be used to restrict search results based on Product labels. We currently support an AND of OR of key-value expressions, where each expression within an OR must have the same key. An '=' should be used to connect the key and value. For example, "(color = red OR color = blue) AND brand = Google" is acceptable, but "(color = red OR brand = Google)" is not acceptable. "color: red" is not acceptable because it uses a ':' instead of an '='. */
  filter?: string;
  /** The list of product categories to search in. Currently, we only consider the first category, and either "homegoods-v2", "apparel-v2", "toys-v2", "packagedgoods-v1", or "general-v1" should be specified. The legacy categories "homegoods", "apparel", and "toys" are still supported but will be deprecated. For new products, please use "homegoods-v2", "apparel-v2", or "toys-v2" for better product search accuracy. It is recommended to migrate existing products to these categories as well. */
  productCategories?: Array<string>;
  /** The bounding polygon around the area of interest in the image. If it is not specified, system discretion will be applied. */
  boundingPoly?: BoundingPoly;
}

export const ProductSearchParams: Schema.Schema<ProductSearchParams> = Schema.suspend(() => Schema.Struct({
  productSet: Schema.optional(Schema.String),
  filter: Schema.optional(Schema.String),
  productCategories: Schema.optional(Schema.Array(Schema.String)),
  boundingPoly: Schema.optional(BoundingPoly),
})).annotate({ identifier: "ProductSearchParams" }) as any as Schema.Schema<ProductSearchParams>;

export interface ImageContext {
  /** List of languages to use for TEXT_DETECTION. In most cases, an empty value yields the best results since it enables automatic language detection. For languages based on the Latin alphabet, setting `language_hints` is not needed. In rare cases, when the language of the text in the image is known, setting a hint will help get better results (although it will be a significant hindrance if the hint is wrong). Text detection returns an error if one or more of the specified languages is not one of the [supported languages](https://cloud.google.com/vision/docs/languages). */
  languageHints?: Array<string>;
  /** Parameters for crop hints annotation request. */
  cropHintsParams?: CropHintsParams;
  /** Not used. */
  latLongRect?: LatLongRect;
  /** Parameters for text detection and document text detection. */
  textDetectionParams?: TextDetectionParams;
  /** Parameters for web detection. */
  webDetectionParams?: WebDetectionParams;
  /** Parameters for product search. */
  productSearchParams?: ProductSearchParams;
}

export const ImageContext: Schema.Schema<ImageContext> = Schema.suspend(() => Schema.Struct({
  languageHints: Schema.optional(Schema.Array(Schema.String)),
  cropHintsParams: Schema.optional(CropHintsParams),
  latLongRect: Schema.optional(LatLongRect),
  textDetectionParams: Schema.optional(TextDetectionParams),
  webDetectionParams: Schema.optional(WebDetectionParams),
  productSearchParams: Schema.optional(ProductSearchParams),
})).annotate({ identifier: "ImageContext" }) as any as Schema.Schema<ImageContext>;

export interface Feature {
  /** The feature type. */
  type?: "TYPE_UNSPECIFIED" | "FACE_DETECTION" | "LANDMARK_DETECTION" | "LOGO_DETECTION" | "LABEL_DETECTION" | "TEXT_DETECTION" | "DOCUMENT_TEXT_DETECTION" | "SAFE_SEARCH_DETECTION" | "IMAGE_PROPERTIES" | "CROP_HINTS" | "WEB_DETECTION" | "PRODUCT_SEARCH" | "OBJECT_LOCALIZATION" | (string & {});
  /** Maximum number of results of this type. Does not apply to `TEXT_DETECTION`, `DOCUMENT_TEXT_DETECTION`, or `CROP_HINTS`. */
  maxResults?: number;
  /** Model to use for the feature. Supported values: "builtin/stable" (the default if unset) and "builtin/latest". `DOCUMENT_TEXT_DETECTION` and `TEXT_DETECTION` also support "builtin/rc" for the latest release candidate. */
  model?: string;
}

export const Feature: Schema.Schema<Feature> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  maxResults: Schema.optional(Schema.Number),
  model: Schema.optional(Schema.String),
})).annotate({ identifier: "Feature" }) as any as Schema.Schema<Feature>;

export interface AsyncAnnotateFileRequest {
  /** Required. Information about the input file. */
  inputConfig?: InputConfig;
  /** Additional context that may accompany the image(s) in the file. */
  imageContext?: ImageContext;
  /** Required. Requested features. */
  features?: Array<Feature>;
  /** Required. The desired output location and metadata (e.g. format). */
  outputConfig?: OutputConfig;
}

export const AsyncAnnotateFileRequest: Schema.Schema<AsyncAnnotateFileRequest> = Schema.suspend(() => Schema.Struct({
  inputConfig: Schema.optional(InputConfig),
  imageContext: Schema.optional(ImageContext),
  features: Schema.optional(Schema.Array(Feature)),
  outputConfig: Schema.optional(OutputConfig),
})).annotate({ identifier: "AsyncAnnotateFileRequest" }) as any as Schema.Schema<AsyncAnnotateFileRequest>;

export interface GoogleCloudVisionV1p2beta1NormalizedVertex {
  /** X coordinate. */
  x?: number;
  /** Y coordinate. */
  y?: number;
}

export const GoogleCloudVisionV1p2beta1NormalizedVertex: Schema.Schema<GoogleCloudVisionV1p2beta1NormalizedVertex> = Schema.suspend(() => Schema.Struct({
  x: Schema.optional(Schema.Number),
  y: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVisionV1p2beta1NormalizedVertex" }) as any as Schema.Schema<GoogleCloudVisionV1p2beta1NormalizedVertex>;

export interface GoogleCloudVisionV1p2beta1Vertex {
  /** Y coordinate. */
  y?: number;
  /** X coordinate. */
  x?: number;
}

export const GoogleCloudVisionV1p2beta1Vertex: Schema.Schema<GoogleCloudVisionV1p2beta1Vertex> = Schema.suspend(() => Schema.Struct({
  y: Schema.optional(Schema.Number),
  x: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVisionV1p2beta1Vertex" }) as any as Schema.Schema<GoogleCloudVisionV1p2beta1Vertex>;

export interface GoogleCloudVisionV1p2beta1BoundingPoly {
  /** The bounding polygon normalized vertices. */
  normalizedVertices?: Array<GoogleCloudVisionV1p2beta1NormalizedVertex>;
  /** The bounding polygon vertices. */
  vertices?: Array<GoogleCloudVisionV1p2beta1Vertex>;
}

export const GoogleCloudVisionV1p2beta1BoundingPoly: Schema.Schema<GoogleCloudVisionV1p2beta1BoundingPoly> = Schema.suspend(() => Schema.Struct({
  normalizedVertices: Schema.optional(Schema.Array(GoogleCloudVisionV1p2beta1NormalizedVertex)),
  vertices: Schema.optional(Schema.Array(GoogleCloudVisionV1p2beta1Vertex)),
})).annotate({ identifier: "GoogleCloudVisionV1p2beta1BoundingPoly" }) as any as Schema.Schema<GoogleCloudVisionV1p2beta1BoundingPoly>;

export interface GoogleCloudVisionV1p2beta1ProductSearchResultsObjectAnnotation {
  /** The BCP-47 language code, such as "en-US" or "sr-Latn". For more information, see http://www.unicode.org/reports/tr35/#Unicode_locale_identifier. */
  languageCode?: string;
  /** Score of the result. Range [0, 1]. */
  score?: number;
  /** Object name, expressed in its `language_code` language. */
  name?: string;
  /** Object ID that should align with EntityAnnotation mid. */
  mid?: string;
}

export const GoogleCloudVisionV1p2beta1ProductSearchResultsObjectAnnotation: Schema.Schema<GoogleCloudVisionV1p2beta1ProductSearchResultsObjectAnnotation> = Schema.suspend(() => Schema.Struct({
  languageCode: Schema.optional(Schema.String),
  score: Schema.optional(Schema.Number),
  name: Schema.optional(Schema.String),
  mid: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p2beta1ProductSearchResultsObjectAnnotation" }) as any as Schema.Schema<GoogleCloudVisionV1p2beta1ProductSearchResultsObjectAnnotation>;

export interface GoogleCloudVisionV1p2beta1ProductSearchResultsGroupedResult {
  /** The bounding polygon around the product detected in the query image. */
  boundingPoly?: GoogleCloudVisionV1p2beta1BoundingPoly;
  /** List of generic predictions for the object in the bounding box. */
  objectAnnotations?: Array<GoogleCloudVisionV1p2beta1ProductSearchResultsObjectAnnotation>;
  /** List of results, one for each product match. */
  results?: Array<GoogleCloudVisionV1p2beta1ProductSearchResultsResult>;
}

export const GoogleCloudVisionV1p2beta1ProductSearchResultsGroupedResult: Schema.Schema<GoogleCloudVisionV1p2beta1ProductSearchResultsGroupedResult> = Schema.suspend(() => Schema.Struct({
  boundingPoly: Schema.optional(GoogleCloudVisionV1p2beta1BoundingPoly),
  objectAnnotations: Schema.optional(Schema.Array(GoogleCloudVisionV1p2beta1ProductSearchResultsObjectAnnotation)),
  results: Schema.optional(Schema.Array(GoogleCloudVisionV1p2beta1ProductSearchResultsResult)),
})).annotate({ identifier: "GoogleCloudVisionV1p2beta1ProductSearchResultsGroupedResult" }) as any as Schema.Schema<GoogleCloudVisionV1p2beta1ProductSearchResultsGroupedResult>;

export interface GoogleCloudVisionV1p3beta1WebDetectionWebEntity {
  /** Opaque entity ID. */
  entityId?: string;
  /** Overall relevancy score for the entity. Not normalized and not comparable across different image queries. */
  score?: number;
  /** Canonical description of the entity, in English. */
  description?: string;
}

export const GoogleCloudVisionV1p3beta1WebDetectionWebEntity: Schema.Schema<GoogleCloudVisionV1p3beta1WebDetectionWebEntity> = Schema.suspend(() => Schema.Struct({
  entityId: Schema.optional(Schema.String),
  score: Schema.optional(Schema.Number),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p3beta1WebDetectionWebEntity" }) as any as Schema.Schema<GoogleCloudVisionV1p3beta1WebDetectionWebEntity>;

export interface KeyValue {
  /** The value of the label attached to the product. Cannot be empty and cannot exceed 128 bytes. */
  value?: string;
  /** The key of the label attached to the product. Cannot be empty and cannot exceed 128 bytes. */
  key?: string;
}

export const KeyValue: Schema.Schema<KeyValue> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
  key: Schema.optional(Schema.String),
})).annotate({ identifier: "KeyValue" }) as any as Schema.Schema<KeyValue>;

export interface Product {
  /** User-provided metadata to be stored with this product. Must be at most 4096 characters long. */
  description?: string;
  /** The user-provided name for this Product. Must not be empty. Must be at most 4096 characters long. */
  displayName?: string;
  /** Key-value pairs that can be attached to a product. At query time, constraints can be specified based on the product_labels. Note that integer values can be provided as strings, e.g. "1199". Only strings with integer values can match a range-based restriction which is to be supported soon. Multiple values can be assigned to the same key. One product may have up to 500 product_labels. Notice that the total number of distinct product_labels over all products in one ProductSet cannot exceed 1M, otherwise the product search pipeline will refuse to work for that ProductSet. */
  productLabels?: Array<KeyValue>;
  /** Immutable. The category for the product identified by the reference image. This should be one of "homegoods-v2", "apparel-v2", "toys-v2", "packagedgoods-v1" or "general-v1". The legacy categories "homegoods", "apparel", and "toys" are still supported, but these should not be used for new products. */
  productCategory?: string;
  /** The resource name of the product. Format is: `projects/PROJECT_ID/locations/LOC_ID/products/PRODUCT_ID`. This field is ignored when creating a product. */
  name?: string;
}

export const Product: Schema.Schema<Product> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  productLabels: Schema.optional(Schema.Array(KeyValue)),
  productCategory: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "Product" }) as any as Schema.Schema<Product>;

export interface Result {
  /** The Product. */
  product?: Product;
  /** A confidence level on the match, ranging from 0 (no confidence) to 1 (full confidence). */
  score?: number;
  /** The resource name of the image from the product that is the closest match to the query. */
  image?: string;
}

export const Result: Schema.Schema<Result> = Schema.suspend(() => Schema.Struct({
  product: Schema.optional(Product),
  score: Schema.optional(Schema.Number),
  image: Schema.optional(Schema.String),
})).annotate({ identifier: "Result" }) as any as Schema.Schema<Result>;

export interface GoogleCloudVisionV1p3beta1ReferenceImage {
  /** Optional. Bounding polygons around the areas of interest in the reference image. If this field is empty, the system will try to detect regions of interest. At most 10 bounding polygons will be used. The provided shape is converted into a non-rotated rectangle. Once converted, the small edge of the rectangle must be greater than or equal to 300 pixels. The aspect ratio must be 1:4 or less (i.e. 1:3 is ok; 1:5 is not). */
  boundingPolys?: Array<GoogleCloudVisionV1p3beta1BoundingPoly>;
  /** Required. The Google Cloud Storage URI of the reference image. The URI must start with `gs://`. */
  uri?: string;
  /** The resource name of the reference image. Format is: `projects/PROJECT_ID/locations/LOC_ID/products/PRODUCT_ID/referenceImages/IMAGE_ID`. This field is ignored when creating a reference image. */
  name?: string;
}

export const GoogleCloudVisionV1p3beta1ReferenceImage: Schema.Schema<GoogleCloudVisionV1p3beta1ReferenceImage> = Schema.suspend(() => Schema.Struct({
  boundingPolys: Schema.optional(Schema.Array(GoogleCloudVisionV1p3beta1BoundingPoly)),
  uri: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p3beta1ReferenceImage" }) as any as Schema.Schema<GoogleCloudVisionV1p3beta1ReferenceImage>;

export interface GoogleCloudVisionV1p1beta1GcsSource {
  /** Google Cloud Storage URI for the input file. This must only be a Google Cloud Storage object. Wildcards are not currently supported. */
  uri?: string;
}

export const GoogleCloudVisionV1p1beta1GcsSource: Schema.Schema<GoogleCloudVisionV1p1beta1GcsSource> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p1beta1GcsSource" }) as any as Schema.Schema<GoogleCloudVisionV1p1beta1GcsSource>;

export interface GoogleCloudVisionV1p1beta1InputConfig {
  /** The type of the file. Currently only "application/pdf", "image/tiff" and "image/gif" are supported. Wildcards are not supported. */
  mimeType?: string;
  /** File content, represented as a stream of bytes. Note: As with all `bytes` fields, protobuffers use a pure binary representation, whereas JSON representations use base64. Currently, this field only works for BatchAnnotateFiles requests. It does not work for AsyncBatchAnnotateFiles requests. */
  content?: string;
  /** The Google Cloud Storage location to read the input from. */
  gcsSource?: GoogleCloudVisionV1p1beta1GcsSource;
}

export const GoogleCloudVisionV1p1beta1InputConfig: Schema.Schema<GoogleCloudVisionV1p1beta1InputConfig> = Schema.suspend(() => Schema.Struct({
  mimeType: Schema.optional(Schema.String),
  content: Schema.optional(Schema.String),
  gcsSource: Schema.optional(GoogleCloudVisionV1p1beta1GcsSource),
})).annotate({ identifier: "GoogleCloudVisionV1p1beta1InputConfig" }) as any as Schema.Schema<GoogleCloudVisionV1p1beta1InputConfig>;

export interface GoogleCloudVisionV1p1beta1AnnotateFileResponse {
  /** Information about the file for which this response is generated. */
  inputConfig?: GoogleCloudVisionV1p1beta1InputConfig;
  /** Individual responses to images found within the file. This field will be empty if the `error` field is set. */
  responses?: Array<GoogleCloudVisionV1p1beta1AnnotateImageResponse>;
  /** This field gives the total number of pages in the file. */
  totalPages?: number;
  /** If set, represents the error message for the failed request. The `responses` field will not be set in this case. */
  error?: Status;
}

export const GoogleCloudVisionV1p1beta1AnnotateFileResponse: Schema.Schema<GoogleCloudVisionV1p1beta1AnnotateFileResponse> = Schema.suspend(() => Schema.Struct({
  inputConfig: Schema.optional(GoogleCloudVisionV1p1beta1InputConfig),
  responses: Schema.optional(Schema.Array(GoogleCloudVisionV1p1beta1AnnotateImageResponse)),
  totalPages: Schema.optional(Schema.Number),
  error: Schema.optional(Status),
})).annotate({ identifier: "GoogleCloudVisionV1p1beta1AnnotateFileResponse" }) as any as Schema.Schema<GoogleCloudVisionV1p1beta1AnnotateFileResponse>;

export interface GoogleCloudVisionV1p2beta1TextAnnotationDetectedBreak {
  /** Detected break type. */
  type?: "UNKNOWN" | "SPACE" | "SURE_SPACE" | "EOL_SURE_SPACE" | "HYPHEN" | "LINE_BREAK" | (string & {});
  /** True if break prepends the element. */
  isPrefix?: boolean;
}

export const GoogleCloudVisionV1p2beta1TextAnnotationDetectedBreak: Schema.Schema<GoogleCloudVisionV1p2beta1TextAnnotationDetectedBreak> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  isPrefix: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudVisionV1p2beta1TextAnnotationDetectedBreak" }) as any as Schema.Schema<GoogleCloudVisionV1p2beta1TextAnnotationDetectedBreak>;

export interface GoogleCloudVisionV1p2beta1TextAnnotationDetectedLanguage {
  /** Confidence of detected language. Range [0, 1]. */
  confidence?: number;
  /** The BCP-47 language code, such as "en-US" or "sr-Latn". For more information, see http://www.unicode.org/reports/tr35/#Unicode_locale_identifier. */
  languageCode?: string;
}

export const GoogleCloudVisionV1p2beta1TextAnnotationDetectedLanguage: Schema.Schema<GoogleCloudVisionV1p2beta1TextAnnotationDetectedLanguage> = Schema.suspend(() => Schema.Struct({
  confidence: Schema.optional(Schema.Number),
  languageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p2beta1TextAnnotationDetectedLanguage" }) as any as Schema.Schema<GoogleCloudVisionV1p2beta1TextAnnotationDetectedLanguage>;

export interface GoogleCloudVisionV1p2beta1TextAnnotationTextProperty {
  /** Detected start or end of a text segment. */
  detectedBreak?: GoogleCloudVisionV1p2beta1TextAnnotationDetectedBreak;
  /** A list of detected languages together with confidence. */
  detectedLanguages?: Array<GoogleCloudVisionV1p2beta1TextAnnotationDetectedLanguage>;
}

export const GoogleCloudVisionV1p2beta1TextAnnotationTextProperty: Schema.Schema<GoogleCloudVisionV1p2beta1TextAnnotationTextProperty> = Schema.suspend(() => Schema.Struct({
  detectedBreak: Schema.optional(GoogleCloudVisionV1p2beta1TextAnnotationDetectedBreak),
  detectedLanguages: Schema.optional(Schema.Array(GoogleCloudVisionV1p2beta1TextAnnotationDetectedLanguage)),
})).annotate({ identifier: "GoogleCloudVisionV1p2beta1TextAnnotationTextProperty" }) as any as Schema.Schema<GoogleCloudVisionV1p2beta1TextAnnotationTextProperty>;

export interface GoogleCloudVisionV1p2beta1Symbol {
  /** The bounding box for the symbol. The vertices are in the order of top-left, top-right, bottom-right, bottom-left. When a rotation of the bounding box is detected the rotation is represented as around the top-left corner as defined when the text is read in the 'natural' orientation. For example: * when the text is horizontal it might look like: 0----1 | | 3----2 * when it's rotated 180 degrees around the top-left corner it becomes: 2----3 | | 1----0 and the vertex order will still be (0, 1, 2, 3). */
  boundingBox?: GoogleCloudVisionV1p2beta1BoundingPoly;
  /** Confidence of the OCR results for the symbol. Range [0, 1]. */
  confidence?: number;
  /** Additional information detected for the symbol. */
  property?: GoogleCloudVisionV1p2beta1TextAnnotationTextProperty;
  /** The actual UTF-8 representation of the symbol. */
  text?: string;
}

export const GoogleCloudVisionV1p2beta1Symbol: Schema.Schema<GoogleCloudVisionV1p2beta1Symbol> = Schema.suspend(() => Schema.Struct({
  boundingBox: Schema.optional(GoogleCloudVisionV1p2beta1BoundingPoly),
  confidence: Schema.optional(Schema.Number),
  property: Schema.optional(GoogleCloudVisionV1p2beta1TextAnnotationTextProperty),
  text: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p2beta1Symbol" }) as any as Schema.Schema<GoogleCloudVisionV1p2beta1Symbol>;

export interface GoogleCloudVisionV1p2beta1Word {
  /** Additional information detected for the word. */
  property?: GoogleCloudVisionV1p2beta1TextAnnotationTextProperty;
  /** List of symbols in the word. The order of the symbols follows the natural reading order. */
  symbols?: Array<GoogleCloudVisionV1p2beta1Symbol>;
  /** Confidence of the OCR results for the word. Range [0, 1]. */
  confidence?: number;
  /** The bounding box for the word. The vertices are in the order of top-left, top-right, bottom-right, bottom-left. When a rotation of the bounding box is detected the rotation is represented as around the top-left corner as defined when the text is read in the 'natural' orientation. For example: * when the text is horizontal it might look like: 0----1 | | 3----2 * when it's rotated 180 degrees around the top-left corner it becomes: 2----3 | | 1----0 and the vertex order will still be (0, 1, 2, 3). */
  boundingBox?: GoogleCloudVisionV1p2beta1BoundingPoly;
}

export const GoogleCloudVisionV1p2beta1Word: Schema.Schema<GoogleCloudVisionV1p2beta1Word> = Schema.suspend(() => Schema.Struct({
  property: Schema.optional(GoogleCloudVisionV1p2beta1TextAnnotationTextProperty),
  symbols: Schema.optional(Schema.Array(GoogleCloudVisionV1p2beta1Symbol)),
  confidence: Schema.optional(Schema.Number),
  boundingBox: Schema.optional(GoogleCloudVisionV1p2beta1BoundingPoly),
})).annotate({ identifier: "GoogleCloudVisionV1p2beta1Word" }) as any as Schema.Schema<GoogleCloudVisionV1p2beta1Word>;

export interface GoogleCloudVisionV1p2beta1Paragraph {
  /** Additional information detected for the paragraph. */
  property?: GoogleCloudVisionV1p2beta1TextAnnotationTextProperty;
  /** List of all words in this paragraph. */
  words?: Array<GoogleCloudVisionV1p2beta1Word>;
  /** The bounding box for the paragraph. The vertices are in the order of top-left, top-right, bottom-right, bottom-left. When a rotation of the bounding box is detected the rotation is represented as around the top-left corner as defined when the text is read in the 'natural' orientation. For example: * when the text is horizontal it might look like: 0----1 | | 3----2 * when it's rotated 180 degrees around the top-left corner it becomes: 2----3 | | 1----0 and the vertex order will still be (0, 1, 2, 3). */
  boundingBox?: GoogleCloudVisionV1p2beta1BoundingPoly;
  /** Confidence of the OCR results for the paragraph. Range [0, 1]. */
  confidence?: number;
}

export const GoogleCloudVisionV1p2beta1Paragraph: Schema.Schema<GoogleCloudVisionV1p2beta1Paragraph> = Schema.suspend(() => Schema.Struct({
  property: Schema.optional(GoogleCloudVisionV1p2beta1TextAnnotationTextProperty),
  words: Schema.optional(Schema.Array(GoogleCloudVisionV1p2beta1Word)),
  boundingBox: Schema.optional(GoogleCloudVisionV1p2beta1BoundingPoly),
  confidence: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVisionV1p2beta1Paragraph" }) as any as Schema.Schema<GoogleCloudVisionV1p2beta1Paragraph>;

export interface GoogleCloudVisionV1p2beta1Block {
  /** Detected block type (text, image etc) for this block. */
  blockType?: "UNKNOWN" | "TEXT" | "TABLE" | "PICTURE" | "RULER" | "BARCODE" | (string & {});
  /** Confidence of the OCR results on the block. Range [0, 1]. */
  confidence?: number;
  /** The bounding box for the block. The vertices are in the order of top-left, top-right, bottom-right, bottom-left. When a rotation of the bounding box is detected the rotation is represented as around the top-left corner as defined when the text is read in the 'natural' orientation. For example: * when the text is horizontal it might look like: 0----1 | | 3----2 * when it's rotated 180 degrees around the top-left corner it becomes: 2----3 | | 1----0 and the vertex order will still be (0, 1, 2, 3). */
  boundingBox?: GoogleCloudVisionV1p2beta1BoundingPoly;
  /** List of paragraphs in this block (if this blocks is of type text). */
  paragraphs?: Array<GoogleCloudVisionV1p2beta1Paragraph>;
  /** Additional information detected for the block. */
  property?: GoogleCloudVisionV1p2beta1TextAnnotationTextProperty;
}

export const GoogleCloudVisionV1p2beta1Block: Schema.Schema<GoogleCloudVisionV1p2beta1Block> = Schema.suspend(() => Schema.Struct({
  blockType: Schema.optional(Schema.String),
  confidence: Schema.optional(Schema.Number),
  boundingBox: Schema.optional(GoogleCloudVisionV1p2beta1BoundingPoly),
  paragraphs: Schema.optional(Schema.Array(GoogleCloudVisionV1p2beta1Paragraph)),
  property: Schema.optional(GoogleCloudVisionV1p2beta1TextAnnotationTextProperty),
})).annotate({ identifier: "GoogleCloudVisionV1p2beta1Block" }) as any as Schema.Schema<GoogleCloudVisionV1p2beta1Block>;

export interface GoogleCloudVisionV1p2beta1Page {
  /** List of blocks of text, images etc on this page. */
  blocks?: Array<GoogleCloudVisionV1p2beta1Block>;
  /** Additional information detected on the page. */
  property?: GoogleCloudVisionV1p2beta1TextAnnotationTextProperty;
  /** Page height. For PDFs the unit is points. For images (including TIFFs) the unit is pixels. */
  height?: number;
  /** Confidence of the OCR results on the page. Range [0, 1]. */
  confidence?: number;
  /** Page width. For PDFs the unit is points. For images (including TIFFs) the unit is pixels. */
  width?: number;
}

export const GoogleCloudVisionV1p2beta1Page: Schema.Schema<GoogleCloudVisionV1p2beta1Page> = Schema.suspend(() => Schema.Struct({
  blocks: Schema.optional(Schema.Array(GoogleCloudVisionV1p2beta1Block)),
  property: Schema.optional(GoogleCloudVisionV1p2beta1TextAnnotationTextProperty),
  height: Schema.optional(Schema.Number),
  confidence: Schema.optional(Schema.Number),
  width: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVisionV1p2beta1Page" }) as any as Schema.Schema<GoogleCloudVisionV1p2beta1Page>;

export interface GoogleCloudVisionV1p2beta1TextAnnotation {
  /** List of pages detected by OCR. */
  pages?: Array<GoogleCloudVisionV1p2beta1Page>;
  /** UTF-8 text detected on the pages. */
  text?: string;
}

export const GoogleCloudVisionV1p2beta1TextAnnotation: Schema.Schema<GoogleCloudVisionV1p2beta1TextAnnotation> = Schema.suspend(() => Schema.Struct({
  pages: Schema.optional(Schema.Array(GoogleCloudVisionV1p2beta1Page)),
  text: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p2beta1TextAnnotation" }) as any as Schema.Schema<GoogleCloudVisionV1p2beta1TextAnnotation>;

export interface GoogleCloudVisionV1p2beta1ProductSearchResults {
  /** List of results grouped by products detected in the query image. Each entry corresponds to one bounding polygon in the query image, and contains the matching products specific to that region. There may be duplicate product matches in the union of all the per-product results. */
  productGroupedResults?: Array<GoogleCloudVisionV1p2beta1ProductSearchResultsGroupedResult>;
  /** Timestamp of the index which provided these results. Products added to the product set and products removed from the product set after this time are not reflected in the current results. */
  indexTime?: string;
  /** List of results, one for each product match. */
  results?: Array<GoogleCloudVisionV1p2beta1ProductSearchResultsResult>;
}

export const GoogleCloudVisionV1p2beta1ProductSearchResults: Schema.Schema<GoogleCloudVisionV1p2beta1ProductSearchResults> = Schema.suspend(() => Schema.Struct({
  productGroupedResults: Schema.optional(Schema.Array(GoogleCloudVisionV1p2beta1ProductSearchResultsGroupedResult)),
  indexTime: Schema.optional(Schema.String),
  results: Schema.optional(Schema.Array(GoogleCloudVisionV1p2beta1ProductSearchResultsResult)),
})).annotate({ identifier: "GoogleCloudVisionV1p2beta1ProductSearchResults" }) as any as Schema.Schema<GoogleCloudVisionV1p2beta1ProductSearchResults>;

export interface GoogleCloudVisionV1p3beta1LocationInfo {
  /** lat/long location coordinates. */
  latLng?: LatLng;
}

export const GoogleCloudVisionV1p3beta1LocationInfo: Schema.Schema<GoogleCloudVisionV1p3beta1LocationInfo> = Schema.suspend(() => Schema.Struct({
  latLng: Schema.optional(LatLng),
})).annotate({ identifier: "GoogleCloudVisionV1p3beta1LocationInfo" }) as any as Schema.Schema<GoogleCloudVisionV1p3beta1LocationInfo>;

export interface DominantColorsAnnotation {
  /** RGB color values with their score and pixel fraction. */
  colors?: Array<ColorInfo>;
}

export const DominantColorsAnnotation: Schema.Schema<DominantColorsAnnotation> = Schema.suspend(() => Schema.Struct({
  colors: Schema.optional(Schema.Array(ColorInfo)),
})).annotate({ identifier: "DominantColorsAnnotation" }) as any as Schema.Schema<DominantColorsAnnotation>;

export interface ImageProperties {
  /** If present, dominant colors completed successfully. */
  dominantColors?: DominantColorsAnnotation;
}

export const ImageProperties: Schema.Schema<ImageProperties> = Schema.suspend(() => Schema.Struct({
  dominantColors: Schema.optional(DominantColorsAnnotation),
})).annotate({ identifier: "ImageProperties" }) as any as Schema.Schema<ImageProperties>;

export interface LocationInfo {
  /** lat/long location coordinates. */
  latLng?: LatLng;
}

export const LocationInfo: Schema.Schema<LocationInfo> = Schema.suspend(() => Schema.Struct({
  latLng: Schema.optional(LatLng),
})).annotate({ identifier: "LocationInfo" }) as any as Schema.Schema<LocationInfo>;

export interface Property {
  /** Value of the property. */
  value?: string;
  /** Value of numeric properties. */
  uint64Value?: string;
  /** Name of the property. */
  name?: string;
}

export const Property: Schema.Schema<Property> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
  uint64Value: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "Property" }) as any as Schema.Schema<Property>;

export interface EntityAnnotation {
  /** The location information for the detected entity. Multiple `LocationInfo` elements can be present because one location may indicate the location of the scene in the image, and another location may indicate the location of the place where the image was taken. Location information is usually present for landmarks. */
  locations?: Array<LocationInfo>;
  /** The relevancy of the ICA (Image Content Annotation) label to the image. For example, the relevancy of "tower" is likely higher to an image containing the detected "Eiffel Tower" than to an image containing a detected distant towering building, even though the confidence that there is a tower in each image may be the same. Range [0, 1]. */
  topicality?: number;
  /** **Deprecated. Use `score` instead.** The accuracy of the entity detection in an image. For example, for an image in which the "Eiffel Tower" entity is detected, this field represents the confidence that there is a tower in the query image. Range [0, 1]. */
  confidence?: number;
  /** Some entities may have optional user-supplied `Property` (name/value) fields, such a score or string that qualifies the entity. */
  properties?: Array<Property>;
  /** Overall score of the result. Range [0, 1]. */
  score?: number;
  /** The language code for the locale in which the entity textual `description` is expressed. */
  locale?: string;
  /** Entity textual description, expressed in its `locale` language. */
  description?: string;
  /** Image region to which this entity belongs. Not produced for `LABEL_DETECTION` features. */
  boundingPoly?: BoundingPoly;
  /** Opaque entity ID. Some IDs may be available in [Google Knowledge Graph Search API](https://developers.google.com/knowledge-graph/). */
  mid?: string;
}

export const EntityAnnotation: Schema.Schema<EntityAnnotation> = Schema.suspend(() => Schema.Struct({
  locations: Schema.optional(Schema.Array(LocationInfo)),
  topicality: Schema.optional(Schema.Number),
  confidence: Schema.optional(Schema.Number),
  properties: Schema.optional(Schema.Array(Property)),
  score: Schema.optional(Schema.Number),
  locale: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  boundingPoly: Schema.optional(BoundingPoly),
  mid: Schema.optional(Schema.String),
})).annotate({ identifier: "EntityAnnotation" }) as any as Schema.Schema<EntityAnnotation>;

export interface SafeSearchAnnotation {
  /** Likelihood that this is a medical image. */
  medical?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** Likelihood that this image contains violent content. Violent content may include death, serious harm, or injury to individuals or groups of individuals. */
  violence?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** Likelihood that the request image contains racy content. Racy content may include (but is not limited to) skimpy or sheer clothing, strategically covered nudity, lewd or provocative poses, or close-ups of sensitive body areas. */
  racy?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** Spoof likelihood. The likelihood that an modification was made to the image's canonical version to make it appear funny or offensive. */
  spoof?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** Represents the adult content likelihood for the image. Adult content may contain elements such as nudity, pornographic images or cartoons, or sexual activities. */
  adult?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
}

export const SafeSearchAnnotation: Schema.Schema<SafeSearchAnnotation> = Schema.suspend(() => Schema.Struct({
  medical: Schema.optional(Schema.String),
  violence: Schema.optional(Schema.String),
  racy: Schema.optional(Schema.String),
  spoof: Schema.optional(Schema.String),
  adult: Schema.optional(Schema.String),
})).annotate({ identifier: "SafeSearchAnnotation" }) as any as Schema.Schema<SafeSearchAnnotation>;

export interface WebImage {
  /** The result image URL. */
  url?: string;
  /** (Deprecated) Overall relevancy score for the image. */
  score?: number;
}

export const WebImage: Schema.Schema<WebImage> = Schema.suspend(() => Schema.Struct({
  url: Schema.optional(Schema.String),
  score: Schema.optional(Schema.Number),
})).annotate({ identifier: "WebImage" }) as any as Schema.Schema<WebImage>;

export interface WebEntity {
  /** Overall relevancy score for the entity. Not normalized and not comparable across different image queries. */
  score?: number;
  /** Canonical description of the entity, in English. */
  description?: string;
  /** Opaque entity ID. */
  entityId?: string;
}

export const WebEntity: Schema.Schema<WebEntity> = Schema.suspend(() => Schema.Struct({
  score: Schema.optional(Schema.Number),
  description: Schema.optional(Schema.String),
  entityId: Schema.optional(Schema.String),
})).annotate({ identifier: "WebEntity" }) as any as Schema.Schema<WebEntity>;

export interface WebLabel {
  /** Label for extra metadata. */
  label?: string;
  /** The BCP-47 language code for `label`, such as "en-US" or "sr-Latn". For more information, see http://www.unicode.org/reports/tr35/#Unicode_locale_identifier. */
  languageCode?: string;
}

export const WebLabel: Schema.Schema<WebLabel> = Schema.suspend(() => Schema.Struct({
  label: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "WebLabel" }) as any as Schema.Schema<WebLabel>;

export interface WebPage {
  /** Fully matching images on the page. Can include resized copies of the query image. */
  fullMatchingImages?: Array<WebImage>;
  /** Partial matching images on the page. Those images are similar enough to share some key-point features. For example an original image will likely have partial matching for its crops. */
  partialMatchingImages?: Array<WebImage>;
  /** (Deprecated) Overall relevancy score for the web page. */
  score?: number;
  /** Title for the web page, may contain HTML markups. */
  pageTitle?: string;
  /** The result web page URL. */
  url?: string;
}

export const WebPage: Schema.Schema<WebPage> = Schema.suspend(() => Schema.Struct({
  fullMatchingImages: Schema.optional(Schema.Array(WebImage)),
  partialMatchingImages: Schema.optional(Schema.Array(WebImage)),
  score: Schema.optional(Schema.Number),
  pageTitle: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String),
})).annotate({ identifier: "WebPage" }) as any as Schema.Schema<WebPage>;

export interface WebDetection {
  /** Partial matching images from the Internet. Those images are similar enough to share some key-point features. For example an original image will likely have partial matching for its crops. */
  partialMatchingImages?: Array<WebImage>;
  /** The visually similar image results. */
  visuallySimilarImages?: Array<WebImage>;
  /** Deduced entities from similar images on the Internet. */
  webEntities?: Array<WebEntity>;
  /** Fully matching images from the Internet. Can include resized copies of the query image. */
  fullMatchingImages?: Array<WebImage>;
  /** The service's best guess as to the topic of the request image. Inferred from similar images on the open web. */
  bestGuessLabels?: Array<WebLabel>;
  /** Web pages containing the matching images from the Internet. */
  pagesWithMatchingImages?: Array<WebPage>;
}

export const WebDetection: Schema.Schema<WebDetection> = Schema.suspend(() => Schema.Struct({
  partialMatchingImages: Schema.optional(Schema.Array(WebImage)),
  visuallySimilarImages: Schema.optional(Schema.Array(WebImage)),
  webEntities: Schema.optional(Schema.Array(WebEntity)),
  fullMatchingImages: Schema.optional(Schema.Array(WebImage)),
  bestGuessLabels: Schema.optional(Schema.Array(WebLabel)),
  pagesWithMatchingImages: Schema.optional(Schema.Array(WebPage)),
})).annotate({ identifier: "WebDetection" }) as any as Schema.Schema<WebDetection>;

export interface TextAnnotation {
  /** UTF-8 text detected on the pages. */
  text?: string;
  /** List of pages detected by OCR. */
  pages?: Array<Page>;
}

export const TextAnnotation: Schema.Schema<TextAnnotation> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  pages: Schema.optional(Schema.Array(Page)),
})).annotate({ identifier: "TextAnnotation" }) as any as Schema.Schema<TextAnnotation>;

export interface FaceAnnotation {
  /** Pitch angle, which indicates the upwards/downwards angle that the face is pointing relative to the image's horizontal plane. Range [-180,180]. */
  tiltAngle?: number;
  /** Roll angle, which indicates the amount of clockwise/anti-clockwise rotation of the face relative to the image vertical about the axis perpendicular to the face. Range [-180,180]. */
  rollAngle?: number;
  /** The `fd_bounding_poly` bounding polygon is tighter than the `boundingPoly`, and encloses only the skin part of the face. Typically, it is used to eliminate the face from any image analysis that detects the "amount of skin" visible in an image. It is not based on the landmarker results, only on the initial face detection, hence the fd (face detection) prefix. */
  fdBoundingPoly?: BoundingPoly;
  /** Anger likelihood. */
  angerLikelihood?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** Under-exposed likelihood. */
  underExposedLikelihood?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** Blurred likelihood. */
  blurredLikelihood?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** Headwear likelihood. */
  headwearLikelihood?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** Yaw angle, which indicates the leftward/rightward angle that the face is pointing relative to the vertical plane perpendicular to the image. Range [-180,180]. */
  panAngle?: number;
  /** Detection confidence. Range [0, 1]. */
  detectionConfidence?: number;
  /** Sorrow likelihood. */
  sorrowLikelihood?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** Face landmarking confidence. Range [0, 1]. */
  landmarkingConfidence?: number;
  /** Joy likelihood. */
  joyLikelihood?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** The bounding polygon around the face. The coordinates of the bounding box are in the original image's scale. The bounding box is computed to "frame" the face in accordance with human expectations. It is based on the landmarker results. Note that one or more x and/or y coordinates may not be generated in the `BoundingPoly` (the polygon will be unbounded) if only a partial face appears in the image to be annotated. */
  boundingPoly?: BoundingPoly;
  /** Surprise likelihood. */
  surpriseLikelihood?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** Detected face landmarks. */
  landmarks?: Array<Landmark>;
}

export const FaceAnnotation: Schema.Schema<FaceAnnotation> = Schema.suspend(() => Schema.Struct({
  tiltAngle: Schema.optional(Schema.Number),
  rollAngle: Schema.optional(Schema.Number),
  fdBoundingPoly: Schema.optional(BoundingPoly),
  angerLikelihood: Schema.optional(Schema.String),
  underExposedLikelihood: Schema.optional(Schema.String),
  blurredLikelihood: Schema.optional(Schema.String),
  headwearLikelihood: Schema.optional(Schema.String),
  panAngle: Schema.optional(Schema.Number),
  detectionConfidence: Schema.optional(Schema.Number),
  sorrowLikelihood: Schema.optional(Schema.String),
  landmarkingConfidence: Schema.optional(Schema.Number),
  joyLikelihood: Schema.optional(Schema.String),
  boundingPoly: Schema.optional(BoundingPoly),
  surpriseLikelihood: Schema.optional(Schema.String),
  landmarks: Schema.optional(Schema.Array(Landmark)),
})).annotate({ identifier: "FaceAnnotation" }) as any as Schema.Schema<FaceAnnotation>;

export interface ObjectAnnotation {
  /** Object ID that should align with EntityAnnotation mid. */
  mid?: string;
  /** Score of the result. Range [0, 1]. */
  score?: number;
  /** The BCP-47 language code, such as "en-US" or "sr-Latn". For more information, see http://www.unicode.org/reports/tr35/#Unicode_locale_identifier. */
  languageCode?: string;
  /** Object name, expressed in its `language_code` language. */
  name?: string;
}

export const ObjectAnnotation: Schema.Schema<ObjectAnnotation> = Schema.suspend(() => Schema.Struct({
  mid: Schema.optional(Schema.String),
  score: Schema.optional(Schema.Number),
  languageCode: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "ObjectAnnotation" }) as any as Schema.Schema<ObjectAnnotation>;

export interface GroupedResult {
  /** List of results, one for each product match. */
  results?: Array<Result>;
  /** The bounding polygon around the product detected in the query image. */
  boundingPoly?: BoundingPoly;
  /** List of generic predictions for the object in the bounding box. */
  objectAnnotations?: Array<ObjectAnnotation>;
}

export const GroupedResult: Schema.Schema<GroupedResult> = Schema.suspend(() => Schema.Struct({
  results: Schema.optional(Schema.Array(Result)),
  boundingPoly: Schema.optional(BoundingPoly),
  objectAnnotations: Schema.optional(Schema.Array(ObjectAnnotation)),
})).annotate({ identifier: "GroupedResult" }) as any as Schema.Schema<GroupedResult>;

export interface ProductSearchResults {
  /** List of results grouped by products detected in the query image. Each entry corresponds to one bounding polygon in the query image, and contains the matching products specific to that region. There may be duplicate product matches in the union of all the per-product results. */
  productGroupedResults?: Array<GroupedResult>;
  /** List of results, one for each product match. */
  results?: Array<Result>;
  /** Timestamp of the index which provided these results. Products added to the product set and products removed from the product set after this time are not reflected in the current results. */
  indexTime?: string;
}

export const ProductSearchResults: Schema.Schema<ProductSearchResults> = Schema.suspend(() => Schema.Struct({
  productGroupedResults: Schema.optional(Schema.Array(GroupedResult)),
  results: Schema.optional(Schema.Array(Result)),
  indexTime: Schema.optional(Schema.String),
})).annotate({ identifier: "ProductSearchResults" }) as any as Schema.Schema<ProductSearchResults>;

export interface ImageAnnotationContext {
  /** If the file was a PDF or TIFF, this field gives the page number within the file used to produce the image. */
  pageNumber?: number;
  /** The URI of the file used to produce the image. */
  uri?: string;
}

export const ImageAnnotationContext: Schema.Schema<ImageAnnotationContext> = Schema.suspend(() => Schema.Struct({
  pageNumber: Schema.optional(Schema.Number),
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "ImageAnnotationContext" }) as any as Schema.Schema<ImageAnnotationContext>;

export interface CropHint {
  /** Confidence of this being a salient region. Range [0, 1]. */
  confidence?: number;
  /** The bounding polygon for the crop region. The coordinates of the bounding box are in the original image's scale. */
  boundingPoly?: BoundingPoly;
  /** Fraction of importance of this salient region with respect to the original image. */
  importanceFraction?: number;
}

export const CropHint: Schema.Schema<CropHint> = Schema.suspend(() => Schema.Struct({
  confidence: Schema.optional(Schema.Number),
  boundingPoly: Schema.optional(BoundingPoly),
  importanceFraction: Schema.optional(Schema.Number),
})).annotate({ identifier: "CropHint" }) as any as Schema.Schema<CropHint>;

export interface CropHintsAnnotation {
  /** Crop hint results. */
  cropHints?: Array<CropHint>;
}

export const CropHintsAnnotation: Schema.Schema<CropHintsAnnotation> = Schema.suspend(() => Schema.Struct({
  cropHints: Schema.optional(Schema.Array(CropHint)),
})).annotate({ identifier: "CropHintsAnnotation" }) as any as Schema.Schema<CropHintsAnnotation>;

export interface AnnotateImageResponse {
  /** If present, image properties were extracted successfully. */
  imagePropertiesAnnotation?: ImageProperties;
  /** If present, landmark detection has completed successfully. */
  landmarkAnnotations?: Array<EntityAnnotation>;
  /** If present, safe-search annotation has completed successfully. */
  safeSearchAnnotation?: SafeSearchAnnotation;
  /** If present, web detection has completed successfully. */
  webDetection?: WebDetection;
  /** If present, label detection has completed successfully. */
  labelAnnotations?: Array<EntityAnnotation>;
  /** If present, text (OCR) detection or document (OCR) text detection has completed successfully. This annotation provides the structural hierarchy for the OCR detected text. */
  fullTextAnnotation?: TextAnnotation;
  /** If present, face detection has completed successfully. */
  faceAnnotations?: Array<FaceAnnotation>;
  /** If present, product search has completed successfully. */
  productSearchResults?: ProductSearchResults;
  /** If present, contextual information is needed to understand where this image comes from. */
  context?: ImageAnnotationContext;
  /** If present, text (OCR) detection has completed successfully. */
  textAnnotations?: Array<EntityAnnotation>;
  /** If present, localized object detection has completed successfully. This will be sorted descending by confidence score. */
  localizedObjectAnnotations?: Array<LocalizedObjectAnnotation>;
  /** If present, logo detection has completed successfully. */
  logoAnnotations?: Array<EntityAnnotation>;
  /** If present, crop hints have completed successfully. */
  cropHintsAnnotation?: CropHintsAnnotation;
  /** If set, represents the error message for the operation. Note that filled-in image annotations are guaranteed to be correct, even when `error` is set. */
  error?: Status;
}

export const AnnotateImageResponse: Schema.Schema<AnnotateImageResponse> = Schema.suspend(() => Schema.Struct({
  imagePropertiesAnnotation: Schema.optional(ImageProperties),
  landmarkAnnotations: Schema.optional(Schema.Array(EntityAnnotation)),
  safeSearchAnnotation: Schema.optional(SafeSearchAnnotation),
  webDetection: Schema.optional(WebDetection),
  labelAnnotations: Schema.optional(Schema.Array(EntityAnnotation)),
  fullTextAnnotation: Schema.optional(TextAnnotation),
  faceAnnotations: Schema.optional(Schema.Array(FaceAnnotation)),
  productSearchResults: Schema.optional(ProductSearchResults),
  context: Schema.optional(ImageAnnotationContext),
  textAnnotations: Schema.optional(Schema.Array(EntityAnnotation)),
  localizedObjectAnnotations: Schema.optional(Schema.Array(LocalizedObjectAnnotation)),
  logoAnnotations: Schema.optional(Schema.Array(EntityAnnotation)),
  cropHintsAnnotation: Schema.optional(CropHintsAnnotation),
  error: Schema.optional(Status),
})).annotate({ identifier: "AnnotateImageResponse" }) as any as Schema.Schema<AnnotateImageResponse>;

export interface AnnotateFileResponse {
  /** Individual responses to images found within the file. This field will be empty if the `error` field is set. */
  responses?: Array<AnnotateImageResponse>;
  /** Information about the file for which this response is generated. */
  inputConfig?: InputConfig;
  /** This field gives the total number of pages in the file. */
  totalPages?: number;
  /** If set, represents the error message for the failed request. The `responses` field will not be set in this case. */
  error?: Status;
}

export const AnnotateFileResponse: Schema.Schema<AnnotateFileResponse> = Schema.suspend(() => Schema.Struct({
  responses: Schema.optional(Schema.Array(AnnotateImageResponse)),
  inputConfig: Schema.optional(InputConfig),
  totalPages: Schema.optional(Schema.Number),
  error: Schema.optional(Status),
})).annotate({ identifier: "AnnotateFileResponse" }) as any as Schema.Schema<AnnotateFileResponse>;

export interface GoogleCloudVisionV1p3beta1ProductSearchResultsObjectAnnotation {
  /** The BCP-47 language code, such as "en-US" or "sr-Latn". For more information, see http://www.unicode.org/reports/tr35/#Unicode_locale_identifier. */
  languageCode?: string;
  /** Object name, expressed in its `language_code` language. */
  name?: string;
  /** Object ID that should align with EntityAnnotation mid. */
  mid?: string;
  /** Score of the result. Range [0, 1]. */
  score?: number;
}

export const GoogleCloudVisionV1p3beta1ProductSearchResultsObjectAnnotation: Schema.Schema<GoogleCloudVisionV1p3beta1ProductSearchResultsObjectAnnotation> = Schema.suspend(() => Schema.Struct({
  languageCode: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  mid: Schema.optional(Schema.String),
  score: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVisionV1p3beta1ProductSearchResultsObjectAnnotation" }) as any as Schema.Schema<GoogleCloudVisionV1p3beta1ProductSearchResultsObjectAnnotation>;

export interface GoogleCloudVisionV1p2beta1Position {
  /** X coordinate. */
  x?: number;
  /** Z coordinate (or depth). */
  z?: number;
  /** Y coordinate. */
  y?: number;
}

export const GoogleCloudVisionV1p2beta1Position: Schema.Schema<GoogleCloudVisionV1p2beta1Position> = Schema.suspend(() => Schema.Struct({
  x: Schema.optional(Schema.Number),
  z: Schema.optional(Schema.Number),
  y: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVisionV1p2beta1Position" }) as any as Schema.Schema<GoogleCloudVisionV1p2beta1Position>;

export interface GoogleCloudVisionV1p2beta1FaceAnnotationLandmark {
  /** Face landmark position. */
  position?: GoogleCloudVisionV1p2beta1Position;
  /** Face landmark type. */
  type?: "UNKNOWN_LANDMARK" | "LEFT_EYE" | "RIGHT_EYE" | "LEFT_OF_LEFT_EYEBROW" | "RIGHT_OF_LEFT_EYEBROW" | "LEFT_OF_RIGHT_EYEBROW" | "RIGHT_OF_RIGHT_EYEBROW" | "MIDPOINT_BETWEEN_EYES" | "NOSE_TIP" | "UPPER_LIP" | "LOWER_LIP" | "MOUTH_LEFT" | "MOUTH_RIGHT" | "MOUTH_CENTER" | "NOSE_BOTTOM_RIGHT" | "NOSE_BOTTOM_LEFT" | "NOSE_BOTTOM_CENTER" | "LEFT_EYE_TOP_BOUNDARY" | "LEFT_EYE_RIGHT_CORNER" | "LEFT_EYE_BOTTOM_BOUNDARY" | "LEFT_EYE_LEFT_CORNER" | "RIGHT_EYE_TOP_BOUNDARY" | "RIGHT_EYE_RIGHT_CORNER" | "RIGHT_EYE_BOTTOM_BOUNDARY" | "RIGHT_EYE_LEFT_CORNER" | "LEFT_EYEBROW_UPPER_MIDPOINT" | "RIGHT_EYEBROW_UPPER_MIDPOINT" | "LEFT_EAR_TRAGION" | "RIGHT_EAR_TRAGION" | "LEFT_EYE_PUPIL" | "RIGHT_EYE_PUPIL" | "FOREHEAD_GLABELLA" | "CHIN_GNATHION" | "CHIN_LEFT_GONION" | "CHIN_RIGHT_GONION" | "LEFT_CHEEK_CENTER" | "RIGHT_CHEEK_CENTER" | (string & {});
}

export const GoogleCloudVisionV1p2beta1FaceAnnotationLandmark: Schema.Schema<GoogleCloudVisionV1p2beta1FaceAnnotationLandmark> = Schema.suspend(() => Schema.Struct({
  position: Schema.optional(GoogleCloudVisionV1p2beta1Position),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p2beta1FaceAnnotationLandmark" }) as any as Schema.Schema<GoogleCloudVisionV1p2beta1FaceAnnotationLandmark>;

export interface GoogleCloudVisionV1p2beta1FaceAnnotation {
  /** Face landmarking confidence. Range [0, 1]. */
  landmarkingConfidence?: number;
  /** Joy likelihood. */
  joyLikelihood?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** Surprise likelihood. */
  surpriseLikelihood?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** Anger likelihood. */
  angerLikelihood?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** Detection confidence. Range [0, 1]. */
  detectionConfidence?: number;
  /** Sorrow likelihood. */
  sorrowLikelihood?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** Blurred likelihood. */
  blurredLikelihood?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** Under-exposed likelihood. */
  underExposedLikelihood?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** The bounding polygon around the face. The coordinates of the bounding box are in the original image's scale. The bounding box is computed to "frame" the face in accordance with human expectations. It is based on the landmarker results. Note that one or more x and/or y coordinates may not be generated in the `BoundingPoly` (the polygon will be unbounded) if only a partial face appears in the image to be annotated. */
  boundingPoly?: GoogleCloudVisionV1p2beta1BoundingPoly;
  /** Pitch angle, which indicates the upwards/downwards angle that the face is pointing relative to the image's horizontal plane. Range [-180,180]. */
  tiltAngle?: number;
  /** Headwear likelihood. */
  headwearLikelihood?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** Yaw angle, which indicates the leftward/rightward angle that the face is pointing relative to the vertical plane perpendicular to the image. Range [-180,180]. */
  panAngle?: number;
  /** The `fd_bounding_poly` bounding polygon is tighter than the `boundingPoly`, and encloses only the skin part of the face. Typically, it is used to eliminate the face from any image analysis that detects the "amount of skin" visible in an image. It is not based on the landmarker results, only on the initial face detection, hence the fd (face detection) prefix. */
  fdBoundingPoly?: GoogleCloudVisionV1p2beta1BoundingPoly;
  /** Detected face landmarks. */
  landmarks?: Array<GoogleCloudVisionV1p2beta1FaceAnnotationLandmark>;
  /** Roll angle, which indicates the amount of clockwise/anti-clockwise rotation of the face relative to the image vertical about the axis perpendicular to the face. Range [-180,180]. */
  rollAngle?: number;
}

export const GoogleCloudVisionV1p2beta1FaceAnnotation: Schema.Schema<GoogleCloudVisionV1p2beta1FaceAnnotation> = Schema.suspend(() => Schema.Struct({
  landmarkingConfidence: Schema.optional(Schema.Number),
  joyLikelihood: Schema.optional(Schema.String),
  surpriseLikelihood: Schema.optional(Schema.String),
  angerLikelihood: Schema.optional(Schema.String),
  detectionConfidence: Schema.optional(Schema.Number),
  sorrowLikelihood: Schema.optional(Schema.String),
  blurredLikelihood: Schema.optional(Schema.String),
  underExposedLikelihood: Schema.optional(Schema.String),
  boundingPoly: Schema.optional(GoogleCloudVisionV1p2beta1BoundingPoly),
  tiltAngle: Schema.optional(Schema.Number),
  headwearLikelihood: Schema.optional(Schema.String),
  panAngle: Schema.optional(Schema.Number),
  fdBoundingPoly: Schema.optional(GoogleCloudVisionV1p2beta1BoundingPoly),
  landmarks: Schema.optional(Schema.Array(GoogleCloudVisionV1p2beta1FaceAnnotationLandmark)),
  rollAngle: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVisionV1p2beta1FaceAnnotation" }) as any as Schema.Schema<GoogleCloudVisionV1p2beta1FaceAnnotation>;

export interface BatchAnnotateImagesResponse {
  /** Individual responses to image annotation requests within the batch. */
  responses?: Array<AnnotateImageResponse>;
}

export const BatchAnnotateImagesResponse: Schema.Schema<BatchAnnotateImagesResponse> = Schema.suspend(() => Schema.Struct({
  responses: Schema.optional(Schema.Array(AnnotateImageResponse)),
})).annotate({ identifier: "BatchAnnotateImagesResponse" }) as any as Schema.Schema<BatchAnnotateImagesResponse>;

export interface AsyncBatchAnnotateImagesResponse {
  /** The output location and metadata from AsyncBatchAnnotateImagesRequest. */
  outputConfig?: OutputConfig;
}

export const AsyncBatchAnnotateImagesResponse: Schema.Schema<AsyncBatchAnnotateImagesResponse> = Schema.suspend(() => Schema.Struct({
  outputConfig: Schema.optional(OutputConfig),
})).annotate({ identifier: "AsyncBatchAnnotateImagesResponse" }) as any as Schema.Schema<AsyncBatchAnnotateImagesResponse>;

export interface GoogleCloudVisionV1p3beta1TextAnnotationDetectedLanguage {
  /** The BCP-47 language code, such as "en-US" or "sr-Latn". For more information, see http://www.unicode.org/reports/tr35/#Unicode_locale_identifier. */
  languageCode?: string;
  /** Confidence of detected language. Range [0, 1]. */
  confidence?: number;
}

export const GoogleCloudVisionV1p3beta1TextAnnotationDetectedLanguage: Schema.Schema<GoogleCloudVisionV1p3beta1TextAnnotationDetectedLanguage> = Schema.suspend(() => Schema.Struct({
  languageCode: Schema.optional(Schema.String),
  confidence: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVisionV1p3beta1TextAnnotationDetectedLanguage" }) as any as Schema.Schema<GoogleCloudVisionV1p3beta1TextAnnotationDetectedLanguage>;

export interface GoogleCloudVisionV1p3beta1TextAnnotationTextProperty {
  /** Detected start or end of a text segment. */
  detectedBreak?: GoogleCloudVisionV1p3beta1TextAnnotationDetectedBreak;
  /** A list of detected languages together with confidence. */
  detectedLanguages?: Array<GoogleCloudVisionV1p3beta1TextAnnotationDetectedLanguage>;
}

export const GoogleCloudVisionV1p3beta1TextAnnotationTextProperty: Schema.Schema<GoogleCloudVisionV1p3beta1TextAnnotationTextProperty> = Schema.suspend(() => Schema.Struct({
  detectedBreak: Schema.optional(GoogleCloudVisionV1p3beta1TextAnnotationDetectedBreak),
  detectedLanguages: Schema.optional(Schema.Array(GoogleCloudVisionV1p3beta1TextAnnotationDetectedLanguage)),
})).annotate({ identifier: "GoogleCloudVisionV1p3beta1TextAnnotationTextProperty" }) as any as Schema.Schema<GoogleCloudVisionV1p3beta1TextAnnotationTextProperty>;

export interface GoogleCloudVisionV1p3beta1Symbol {
  /** Confidence of the OCR results for the symbol. Range [0, 1]. */
  confidence?: number;
  /** The bounding box for the symbol. The vertices are in the order of top-left, top-right, bottom-right, bottom-left. When a rotation of the bounding box is detected the rotation is represented as around the top-left corner as defined when the text is read in the 'natural' orientation. For example: * when the text is horizontal it might look like: 0----1 | | 3----2 * when it's rotated 180 degrees around the top-left corner it becomes: 2----3 | | 1----0 and the vertex order will still be (0, 1, 2, 3). */
  boundingBox?: GoogleCloudVisionV1p3beta1BoundingPoly;
  /** Additional information detected for the symbol. */
  property?: GoogleCloudVisionV1p3beta1TextAnnotationTextProperty;
  /** The actual UTF-8 representation of the symbol. */
  text?: string;
}

export const GoogleCloudVisionV1p3beta1Symbol: Schema.Schema<GoogleCloudVisionV1p3beta1Symbol> = Schema.suspend(() => Schema.Struct({
  confidence: Schema.optional(Schema.Number),
  boundingBox: Schema.optional(GoogleCloudVisionV1p3beta1BoundingPoly),
  property: Schema.optional(GoogleCloudVisionV1p3beta1TextAnnotationTextProperty),
  text: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p3beta1Symbol" }) as any as Schema.Schema<GoogleCloudVisionV1p3beta1Symbol>;

export interface GoogleCloudVisionV1p3beta1Word {
  /** The bounding box for the word. The vertices are in the order of top-left, top-right, bottom-right, bottom-left. When a rotation of the bounding box is detected the rotation is represented as around the top-left corner as defined when the text is read in the 'natural' orientation. For example: * when the text is horizontal it might look like: 0----1 | | 3----2 * when it's rotated 180 degrees around the top-left corner it becomes: 2----3 | | 1----0 and the vertex order will still be (0, 1, 2, 3). */
  boundingBox?: GoogleCloudVisionV1p3beta1BoundingPoly;
  /** Confidence of the OCR results for the word. Range [0, 1]. */
  confidence?: number;
  /** List of symbols in the word. The order of the symbols follows the natural reading order. */
  symbols?: Array<GoogleCloudVisionV1p3beta1Symbol>;
  /** Additional information detected for the word. */
  property?: GoogleCloudVisionV1p3beta1TextAnnotationTextProperty;
}

export const GoogleCloudVisionV1p3beta1Word: Schema.Schema<GoogleCloudVisionV1p3beta1Word> = Schema.suspend(() => Schema.Struct({
  boundingBox: Schema.optional(GoogleCloudVisionV1p3beta1BoundingPoly),
  confidence: Schema.optional(Schema.Number),
  symbols: Schema.optional(Schema.Array(GoogleCloudVisionV1p3beta1Symbol)),
  property: Schema.optional(GoogleCloudVisionV1p3beta1TextAnnotationTextProperty),
})).annotate({ identifier: "GoogleCloudVisionV1p3beta1Word" }) as any as Schema.Schema<GoogleCloudVisionV1p3beta1Word>;

export interface GoogleCloudVisionV1p3beta1Paragraph {
  /** Confidence of the OCR results for the paragraph. Range [0, 1]. */
  confidence?: number;
  /** Additional information detected for the paragraph. */
  property?: GoogleCloudVisionV1p3beta1TextAnnotationTextProperty;
  /** The bounding box for the paragraph. The vertices are in the order of top-left, top-right, bottom-right, bottom-left. When a rotation of the bounding box is detected the rotation is represented as around the top-left corner as defined when the text is read in the 'natural' orientation. For example: * when the text is horizontal it might look like: 0----1 | | 3----2 * when it's rotated 180 degrees around the top-left corner it becomes: 2----3 | | 1----0 and the vertex order will still be (0, 1, 2, 3). */
  boundingBox?: GoogleCloudVisionV1p3beta1BoundingPoly;
  /** List of all words in this paragraph. */
  words?: Array<GoogleCloudVisionV1p3beta1Word>;
}

export const GoogleCloudVisionV1p3beta1Paragraph: Schema.Schema<GoogleCloudVisionV1p3beta1Paragraph> = Schema.suspend(() => Schema.Struct({
  confidence: Schema.optional(Schema.Number),
  property: Schema.optional(GoogleCloudVisionV1p3beta1TextAnnotationTextProperty),
  boundingBox: Schema.optional(GoogleCloudVisionV1p3beta1BoundingPoly),
  words: Schema.optional(Schema.Array(GoogleCloudVisionV1p3beta1Word)),
})).annotate({ identifier: "GoogleCloudVisionV1p3beta1Paragraph" }) as any as Schema.Schema<GoogleCloudVisionV1p3beta1Paragraph>;

export interface GoogleCloudVisionV1p3beta1Block {
  /** Additional information detected for the block. */
  property?: GoogleCloudVisionV1p3beta1TextAnnotationTextProperty;
  /** The bounding box for the block. The vertices are in the order of top-left, top-right, bottom-right, bottom-left. When a rotation of the bounding box is detected the rotation is represented as around the top-left corner as defined when the text is read in the 'natural' orientation. For example: * when the text is horizontal it might look like: 0----1 | | 3----2 * when it's rotated 180 degrees around the top-left corner it becomes: 2----3 | | 1----0 and the vertex order will still be (0, 1, 2, 3). */
  boundingBox?: GoogleCloudVisionV1p3beta1BoundingPoly;
  /** Detected block type (text, image etc) for this block. */
  blockType?: "UNKNOWN" | "TEXT" | "TABLE" | "PICTURE" | "RULER" | "BARCODE" | (string & {});
  /** Confidence of the OCR results on the block. Range [0, 1]. */
  confidence?: number;
  /** List of paragraphs in this block (if this blocks is of type text). */
  paragraphs?: Array<GoogleCloudVisionV1p3beta1Paragraph>;
}

export const GoogleCloudVisionV1p3beta1Block: Schema.Schema<GoogleCloudVisionV1p3beta1Block> = Schema.suspend(() => Schema.Struct({
  property: Schema.optional(GoogleCloudVisionV1p3beta1TextAnnotationTextProperty),
  boundingBox: Schema.optional(GoogleCloudVisionV1p3beta1BoundingPoly),
  blockType: Schema.optional(Schema.String),
  confidence: Schema.optional(Schema.Number),
  paragraphs: Schema.optional(Schema.Array(GoogleCloudVisionV1p3beta1Paragraph)),
})).annotate({ identifier: "GoogleCloudVisionV1p3beta1Block" }) as any as Schema.Schema<GoogleCloudVisionV1p3beta1Block>;

export interface GoogleCloudVisionV1p3beta1EntityAnnotation {
  /** The location information for the detected entity. Multiple `LocationInfo` elements can be present because one location may indicate the location of the scene in the image, and another location may indicate the location of the place where the image was taken. Location information is usually present for landmarks. */
  locations?: Array<GoogleCloudVisionV1p3beta1LocationInfo>;
  /** Overall score of the result. Range [0, 1]. */
  score?: number;
  /** Some entities may have optional user-supplied `Property` (name/value) fields, such a score or string that qualifies the entity. */
  properties?: Array<GoogleCloudVisionV1p3beta1Property>;
  /** The relevancy of the ICA (Image Content Annotation) label to the image. For example, the relevancy of "tower" is likely higher to an image containing the detected "Eiffel Tower" than to an image containing a detected distant towering building, even though the confidence that there is a tower in each image may be the same. Range [0, 1]. */
  topicality?: number;
  /** Entity textual description, expressed in its `locale` language. */
  description?: string;
  /** Image region to which this entity belongs. Not produced for `LABEL_DETECTION` features. */
  boundingPoly?: GoogleCloudVisionV1p3beta1BoundingPoly;
  /** The language code for the locale in which the entity textual `description` is expressed. */
  locale?: string;
  /** **Deprecated. Use `score` instead.** The accuracy of the entity detection in an image. For example, for an image in which the "Eiffel Tower" entity is detected, this field represents the confidence that there is a tower in the query image. Range [0, 1]. */
  confidence?: number;
  /** Opaque entity ID. Some IDs may be available in [Google Knowledge Graph Search API](https://developers.google.com/knowledge-graph/). */
  mid?: string;
}

export const GoogleCloudVisionV1p3beta1EntityAnnotation: Schema.Schema<GoogleCloudVisionV1p3beta1EntityAnnotation> = Schema.suspend(() => Schema.Struct({
  locations: Schema.optional(Schema.Array(GoogleCloudVisionV1p3beta1LocationInfo)),
  score: Schema.optional(Schema.Number),
  properties: Schema.optional(Schema.Array(GoogleCloudVisionV1p3beta1Property)),
  topicality: Schema.optional(Schema.Number),
  description: Schema.optional(Schema.String),
  boundingPoly: Schema.optional(GoogleCloudVisionV1p3beta1BoundingPoly),
  locale: Schema.optional(Schema.String),
  confidence: Schema.optional(Schema.Number),
  mid: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p3beta1EntityAnnotation" }) as any as Schema.Schema<GoogleCloudVisionV1p3beta1EntityAnnotation>;

export interface ProductSet {
  /** Output only. If there was an error with indexing the product set, the field is populated. This field is ignored when creating a ProductSet. */
  indexError?: Status;
  /** The user-provided name for this ProductSet. Must not be empty. Must be at most 4096 characters long. */
  displayName?: string;
  /** Output only. The time at which this ProductSet was last indexed. Query results will reflect all updates before this time. If this ProductSet has never been indexed, this timestamp is the default value "1970-01-01T00:00:00Z". This field is ignored when creating a ProductSet. */
  indexTime?: string;
  /** The resource name of the ProductSet. Format is: `projects/PROJECT_ID/locations/LOC_ID/productSets/PRODUCT_SET_ID`. This field is ignored when creating a ProductSet. */
  name?: string;
}

export const ProductSet: Schema.Schema<ProductSet> = Schema.suspend(() => Schema.Struct({
  indexError: Schema.optional(Status),
  displayName: Schema.optional(Schema.String),
  indexTime: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "ProductSet" }) as any as Schema.Schema<ProductSet>;

export interface GoogleCloudVisionV1p3beta1Page {
  /** Page width. For PDFs the unit is points. For images (including TIFFs) the unit is pixels. */
  width?: number;
  /** Confidence of the OCR results on the page. Range [0, 1]. */
  confidence?: number;
  /** Page height. For PDFs the unit is points. For images (including TIFFs) the unit is pixels. */
  height?: number;
  /** Additional information detected on the page. */
  property?: GoogleCloudVisionV1p3beta1TextAnnotationTextProperty;
  /** List of blocks of text, images etc on this page. */
  blocks?: Array<GoogleCloudVisionV1p3beta1Block>;
}

export const GoogleCloudVisionV1p3beta1Page: Schema.Schema<GoogleCloudVisionV1p3beta1Page> = Schema.suspend(() => Schema.Struct({
  width: Schema.optional(Schema.Number),
  confidence: Schema.optional(Schema.Number),
  height: Schema.optional(Schema.Number),
  property: Schema.optional(GoogleCloudVisionV1p3beta1TextAnnotationTextProperty),
  blocks: Schema.optional(Schema.Array(GoogleCloudVisionV1p3beta1Block)),
})).annotate({ identifier: "GoogleCloudVisionV1p3beta1Page" }) as any as Schema.Schema<GoogleCloudVisionV1p3beta1Page>;

export interface GoogleCloudVisionV1p4beta1AsyncAnnotateFileResponse {
  /** The output location and metadata from AsyncAnnotateFileRequest. */
  outputConfig?: GoogleCloudVisionV1p4beta1OutputConfig;
}

export const GoogleCloudVisionV1p4beta1AsyncAnnotateFileResponse: Schema.Schema<GoogleCloudVisionV1p4beta1AsyncAnnotateFileResponse> = Schema.suspend(() => Schema.Struct({
  outputConfig: Schema.optional(GoogleCloudVisionV1p4beta1OutputConfig),
})).annotate({ identifier: "GoogleCloudVisionV1p4beta1AsyncAnnotateFileResponse" }) as any as Schema.Schema<GoogleCloudVisionV1p4beta1AsyncAnnotateFileResponse>;

export interface GoogleCloudVisionV1p4beta1AsyncBatchAnnotateFilesResponse {
  /** The list of file annotation responses, one for each request in AsyncBatchAnnotateFilesRequest. */
  responses?: Array<GoogleCloudVisionV1p4beta1AsyncAnnotateFileResponse>;
}

export const GoogleCloudVisionV1p4beta1AsyncBatchAnnotateFilesResponse: Schema.Schema<GoogleCloudVisionV1p4beta1AsyncBatchAnnotateFilesResponse> = Schema.suspend(() => Schema.Struct({
  responses: Schema.optional(Schema.Array(GoogleCloudVisionV1p4beta1AsyncAnnotateFileResponse)),
})).annotate({ identifier: "GoogleCloudVisionV1p4beta1AsyncBatchAnnotateFilesResponse" }) as any as Schema.Schema<GoogleCloudVisionV1p4beta1AsyncBatchAnnotateFilesResponse>;

export interface Operation {
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() => Schema.Struct({
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  name: Schema.optional(Schema.String),
  error: Schema.optional(Status),
  done: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface ListOperationsResponse {
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<Operation>;
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> = Schema.suspend(() => Schema.Struct({
  operations: Schema.optional(Schema.Array(Operation)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListOperationsResponse" }) as any as Schema.Schema<ListOperationsResponse>;

export interface GoogleCloudVisionV1p3beta1WebDetection {
  /** Partial matching images from the Internet. Those images are similar enough to share some key-point features. For example an original image will likely have partial matching for its crops. */
  partialMatchingImages?: Array<GoogleCloudVisionV1p3beta1WebDetectionWebImage>;
  /** Web pages containing the matching images from the Internet. */
  pagesWithMatchingImages?: Array<GoogleCloudVisionV1p3beta1WebDetectionWebPage>;
  /** Fully matching images from the Internet. Can include resized copies of the query image. */
  fullMatchingImages?: Array<GoogleCloudVisionV1p3beta1WebDetectionWebImage>;
  /** The visually similar image results. */
  visuallySimilarImages?: Array<GoogleCloudVisionV1p3beta1WebDetectionWebImage>;
  /** The service's best guess as to the topic of the request image. Inferred from similar images on the open web. */
  bestGuessLabels?: Array<GoogleCloudVisionV1p3beta1WebDetectionWebLabel>;
  /** Deduced entities from similar images on the Internet. */
  webEntities?: Array<GoogleCloudVisionV1p3beta1WebDetectionWebEntity>;
}

export const GoogleCloudVisionV1p3beta1WebDetection: Schema.Schema<GoogleCloudVisionV1p3beta1WebDetection> = Schema.suspend(() => Schema.Struct({
  partialMatchingImages: Schema.optional(Schema.Array(GoogleCloudVisionV1p3beta1WebDetectionWebImage)),
  pagesWithMatchingImages: Schema.optional(Schema.Array(GoogleCloudVisionV1p3beta1WebDetectionWebPage)),
  fullMatchingImages: Schema.optional(Schema.Array(GoogleCloudVisionV1p3beta1WebDetectionWebImage)),
  visuallySimilarImages: Schema.optional(Schema.Array(GoogleCloudVisionV1p3beta1WebDetectionWebImage)),
  bestGuessLabels: Schema.optional(Schema.Array(GoogleCloudVisionV1p3beta1WebDetectionWebLabel)),
  webEntities: Schema.optional(Schema.Array(GoogleCloudVisionV1p3beta1WebDetectionWebEntity)),
})).annotate({ identifier: "GoogleCloudVisionV1p3beta1WebDetection" }) as any as Schema.Schema<GoogleCloudVisionV1p3beta1WebDetection>;

export interface ImportProductSetsGcsSource {
  /** The Google Cloud Storage URI of the input csv file. The URI must start with `gs://`. The format of the input csv file should be one image per line. In each line, there are 8 columns. 1. image-uri 2. image-id 3. product-set-id 4. product-id 5. product-category 6. product-display-name 7. labels 8. bounding-poly The `image-uri`, `product-set-id`, `product-id`, and `product-category` columns are required. All other columns are optional. If the `ProductSet` or `Product` specified by the `product-set-id` and `product-id` values does not exist, then the system will create a new `ProductSet` or `Product` for the image. In this case, the `product-display-name` column refers to display_name, the `product-category` column refers to product_category, and the `labels` column refers to product_labels. The `image-id` column is optional but must be unique if provided. If it is empty, the system will automatically assign a unique id to the image. The `product-display-name` column is optional. If it is empty, the system sets the display_name field for the product to a space (" "). You can update the `display_name` later by using the API. If a `Product` with the specified `product-id` already exists, then the system ignores the `product-display-name`, `product-category`, and `labels` columns. The `labels` column (optional) is a line containing a list of comma-separated key-value pairs, in the following format: "key_1=value_1,key_2=value_2,...,key_n=value_n" The `bounding-poly` column (optional) identifies one region of interest from the image in the same manner as `CreateReferenceImage`. If you do not specify the `bounding-poly` column, then the system will try to detect regions of interest automatically. At most one `bounding-poly` column is allowed per line. If the image contains multiple regions of interest, add a line to the CSV file that includes the same product information, and the `bounding-poly` values for each region of interest. The `bounding-poly` column must contain an even number of comma-separated numbers, in the format "p1_x,p1_y,p2_x,p2_y,...,pn_x,pn_y". Use non-negative integers for absolute bounding polygons, and float values in [0, 1] for normalized bounding polygons. The system will resize the image if the image resolution is too large to process (larger than 20MP). */
  csvFileUri?: string;
}

export const ImportProductSetsGcsSource: Schema.Schema<ImportProductSetsGcsSource> = Schema.suspend(() => Schema.Struct({
  csvFileUri: Schema.optional(Schema.String),
})).annotate({ identifier: "ImportProductSetsGcsSource" }) as any as Schema.Schema<ImportProductSetsGcsSource>;

export interface ImportProductSetsInputConfig {
  /** The Google Cloud Storage location for a csv file which preserves a list of ImportProductSetRequests in each line. */
  gcsSource?: ImportProductSetsGcsSource;
}

export const ImportProductSetsInputConfig: Schema.Schema<ImportProductSetsInputConfig> = Schema.suspend(() => Schema.Struct({
  gcsSource: Schema.optional(ImportProductSetsGcsSource),
})).annotate({ identifier: "ImportProductSetsInputConfig" }) as any as Schema.Schema<ImportProductSetsInputConfig>;

export interface ImportProductSetsRequest {
  /** Required. The input content for the list of requests. */
  inputConfig?: ImportProductSetsInputConfig;
}

export const ImportProductSetsRequest: Schema.Schema<ImportProductSetsRequest> = Schema.suspend(() => Schema.Struct({
  inputConfig: Schema.optional(ImportProductSetsInputConfig),
})).annotate({ identifier: "ImportProductSetsRequest" }) as any as Schema.Schema<ImportProductSetsRequest>;

export interface GoogleCloudVisionV1p3beta1CropHint {
  /** Confidence of this being a salient region. Range [0, 1]. */
  confidence?: number;
  /** The bounding polygon for the crop region. The coordinates of the bounding box are in the original image's scale. */
  boundingPoly?: GoogleCloudVisionV1p3beta1BoundingPoly;
  /** Fraction of importance of this salient region with respect to the original image. */
  importanceFraction?: number;
}

export const GoogleCloudVisionV1p3beta1CropHint: Schema.Schema<GoogleCloudVisionV1p3beta1CropHint> = Schema.suspend(() => Schema.Struct({
  confidence: Schema.optional(Schema.Number),
  boundingPoly: Schema.optional(GoogleCloudVisionV1p3beta1BoundingPoly),
  importanceFraction: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVisionV1p3beta1CropHint" }) as any as Schema.Schema<GoogleCloudVisionV1p3beta1CropHint>;

export interface GoogleCloudVisionV1p3beta1CropHintsAnnotation {
  /** Crop hint results. */
  cropHints?: Array<GoogleCloudVisionV1p3beta1CropHint>;
}

export const GoogleCloudVisionV1p3beta1CropHintsAnnotation: Schema.Schema<GoogleCloudVisionV1p3beta1CropHintsAnnotation> = Schema.suspend(() => Schema.Struct({
  cropHints: Schema.optional(Schema.Array(GoogleCloudVisionV1p3beta1CropHint)),
})).annotate({ identifier: "GoogleCloudVisionV1p3beta1CropHintsAnnotation" }) as any as Schema.Schema<GoogleCloudVisionV1p3beta1CropHintsAnnotation>;

export interface GoogleCloudVisionV1p2beta1WebDetectionWebImage {
  /** The result image URL. */
  url?: string;
  /** (Deprecated) Overall relevancy score for the image. */
  score?: number;
}

export const GoogleCloudVisionV1p2beta1WebDetectionWebImage: Schema.Schema<GoogleCloudVisionV1p2beta1WebDetectionWebImage> = Schema.suspend(() => Schema.Struct({
  url: Schema.optional(Schema.String),
  score: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVisionV1p2beta1WebDetectionWebImage" }) as any as Schema.Schema<GoogleCloudVisionV1p2beta1WebDetectionWebImage>;

export interface ImageSource {
  /** **Use `image_uri` instead.** The Google Cloud Storage URI of the form `gs://bucket_name/object_name`. Object versioning is not supported. See [Google Cloud Storage Request URIs](https://cloud.google.com/storage/docs/reference-uris) for more info. */
  gcsImageUri?: string;
  /** The URI of the source image. Can be either: 1. A Google Cloud Storage URI of the form `gs://bucket_name/object_name`. Object versioning is not supported. See [Google Cloud Storage Request URIs](https://cloud.google.com/storage/docs/reference-uris) for more info. 2. A publicly-accessible image HTTP/HTTPS URL. When fetching images from HTTP/HTTPS URLs, Google cannot guarantee that the request will be completed. Your request may fail if the specified host denies the request (e.g. due to request throttling or DOS prevention), or if Google throttles requests to the site for abuse prevention. You should not depend on externally-hosted images for production applications. When both `gcs_image_uri` and `image_uri` are specified, `image_uri` takes precedence. */
  imageUri?: string;
}

export const ImageSource: Schema.Schema<ImageSource> = Schema.suspend(() => Schema.Struct({
  gcsImageUri: Schema.optional(Schema.String),
  imageUri: Schema.optional(Schema.String),
})).annotate({ identifier: "ImageSource" }) as any as Schema.Schema<ImageSource>;

export interface Image {
  /** Image content, represented as a stream of bytes. Note: As with all `bytes` fields, protobuffers use a pure binary representation, whereas JSON representations use base64. Currently, this field only works for BatchAnnotateImages requests. It does not work for AsyncBatchAnnotateImages requests. */
  content?: string;
  /** Google Cloud Storage image location, or publicly-accessible image URL. If both `content` and `source` are provided for an image, `content` takes precedence and is used to perform the image annotation request. */
  source?: ImageSource;
}

export const Image: Schema.Schema<Image> = Schema.suspend(() => Schema.Struct({
  content: Schema.optional(Schema.String),
  source: Schema.optional(ImageSource),
})).annotate({ identifier: "Image" }) as any as Schema.Schema<Image>;

export interface AnnotateImageRequest {
  /** The image to be processed. */
  image?: Image;
  /** Additional context that may accompany the image. */
  imageContext?: ImageContext;
  /** Requested features. */
  features?: Array<Feature>;
}

export const AnnotateImageRequest: Schema.Schema<AnnotateImageRequest> = Schema.suspend(() => Schema.Struct({
  image: Schema.optional(Image),
  imageContext: Schema.optional(ImageContext),
  features: Schema.optional(Schema.Array(Feature)),
})).annotate({ identifier: "AnnotateImageRequest" }) as any as Schema.Schema<AnnotateImageRequest>;

export interface BatchAnnotateImagesRequest {
  /** Optional. The labels with user-defined metadata for the request. Label keys and values can be no longer than 63 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. Label values are optional. Label keys must start with a letter. */
  labels?: Record<string, string>;
  /** Optional. Target project and location to make a call. Format: `projects/{project-id}/locations/{location-id}`. If no parent is specified, a region will be chosen automatically. Supported location-ids: `us`: USA country only, `asia`: East asia areas, like Japan, Taiwan, `eu`: The European Union. Example: `projects/project-A/locations/eu`. */
  parent?: string;
  /** Required. Individual image annotation requests for this batch. */
  requests?: Array<AnnotateImageRequest>;
}

export const BatchAnnotateImagesRequest: Schema.Schema<BatchAnnotateImagesRequest> = Schema.suspend(() => Schema.Struct({
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  parent: Schema.optional(Schema.String),
  requests: Schema.optional(Schema.Array(AnnotateImageRequest)),
})).annotate({ identifier: "BatchAnnotateImagesRequest" }) as any as Schema.Schema<BatchAnnotateImagesRequest>;

export interface AnnotateFileRequest {
  /** Additional context that may accompany the image(s) in the file. */
  imageContext?: ImageContext;
  /** Pages of the file to perform image annotation. Pages starts from 1, we assume the first page of the file is page 1. At most 5 pages are supported per request. Pages can be negative. Page 1 means the first page. Page 2 means the second page. Page -1 means the last page. Page -2 means the second to the last page. If the file is GIF instead of PDF or TIFF, page refers to GIF frames. If this field is empty, by default the service performs image annotation for the first 5 pages of the file. */
  pages?: Array<number>;
  /** Required. Requested features. */
  features?: Array<Feature>;
  /** Required. Information about the input file. */
  inputConfig?: InputConfig;
}

export const AnnotateFileRequest: Schema.Schema<AnnotateFileRequest> = Schema.suspend(() => Schema.Struct({
  imageContext: Schema.optional(ImageContext),
  pages: Schema.optional(Schema.Array(Schema.Number)),
  features: Schema.optional(Schema.Array(Feature)),
  inputConfig: Schema.optional(InputConfig),
})).annotate({ identifier: "AnnotateFileRequest" }) as any as Schema.Schema<AnnotateFileRequest>;

export interface GoogleCloudVisionV1p4beta1GcsSource {
  /** Google Cloud Storage URI for the input file. This must only be a Google Cloud Storage object. Wildcards are not currently supported. */
  uri?: string;
}

export const GoogleCloudVisionV1p4beta1GcsSource: Schema.Schema<GoogleCloudVisionV1p4beta1GcsSource> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p4beta1GcsSource" }) as any as Schema.Schema<GoogleCloudVisionV1p4beta1GcsSource>;

export interface GoogleCloudVisionV1p4beta1InputConfig {
  /** File content, represented as a stream of bytes. Note: As with all `bytes` fields, protobuffers use a pure binary representation, whereas JSON representations use base64. Currently, this field only works for BatchAnnotateFiles requests. It does not work for AsyncBatchAnnotateFiles requests. */
  content?: string;
  /** The type of the file. Currently only "application/pdf", "image/tiff" and "image/gif" are supported. Wildcards are not supported. */
  mimeType?: string;
  /** The Google Cloud Storage location to read the input from. */
  gcsSource?: GoogleCloudVisionV1p4beta1GcsSource;
}

export const GoogleCloudVisionV1p4beta1InputConfig: Schema.Schema<GoogleCloudVisionV1p4beta1InputConfig> = Schema.suspend(() => Schema.Struct({
  content: Schema.optional(Schema.String),
  mimeType: Schema.optional(Schema.String),
  gcsSource: Schema.optional(GoogleCloudVisionV1p4beta1GcsSource),
})).annotate({ identifier: "GoogleCloudVisionV1p4beta1InputConfig" }) as any as Schema.Schema<GoogleCloudVisionV1p4beta1InputConfig>;

export interface GoogleCloudVisionV1p4beta1AnnotateFileResponse {
  /** Individual responses to images found within the file. This field will be empty if the `error` field is set. */
  responses?: Array<GoogleCloudVisionV1p4beta1AnnotateImageResponse>;
  /** This field gives the total number of pages in the file. */
  totalPages?: number;
  /** Information about the file for which this response is generated. */
  inputConfig?: GoogleCloudVisionV1p4beta1InputConfig;
  /** If set, represents the error message for the failed request. The `responses` field will not be set in this case. */
  error?: Status;
}

export const GoogleCloudVisionV1p4beta1AnnotateFileResponse: Schema.Schema<GoogleCloudVisionV1p4beta1AnnotateFileResponse> = Schema.suspend(() => Schema.Struct({
  responses: Schema.optional(Schema.Array(GoogleCloudVisionV1p4beta1AnnotateImageResponse)),
  totalPages: Schema.optional(Schema.Number),
  inputConfig: Schema.optional(GoogleCloudVisionV1p4beta1InputConfig),
  error: Schema.optional(Status),
})).annotate({ identifier: "GoogleCloudVisionV1p4beta1AnnotateFileResponse" }) as any as Schema.Schema<GoogleCloudVisionV1p4beta1AnnotateFileResponse>;

export interface GoogleCloudVisionV1p2beta1WebDetectionWebEntity {
  /** Canonical description of the entity, in English. */
  description?: string;
  /** Opaque entity ID. */
  entityId?: string;
  /** Overall relevancy score for the entity. Not normalized and not comparable across different image queries. */
  score?: number;
}

export const GoogleCloudVisionV1p2beta1WebDetectionWebEntity: Schema.Schema<GoogleCloudVisionV1p2beta1WebDetectionWebEntity> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  entityId: Schema.optional(Schema.String),
  score: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVisionV1p2beta1WebDetectionWebEntity" }) as any as Schema.Schema<GoogleCloudVisionV1p2beta1WebDetectionWebEntity>;

export interface GoogleCloudVisionV1p2beta1WebDetectionWebPage {
  /** Fully matching images on the page. Can include resized copies of the query image. */
  fullMatchingImages?: Array<GoogleCloudVisionV1p2beta1WebDetectionWebImage>;
  /** (Deprecated) Overall relevancy score for the web page. */
  score?: number;
  /** The result web page URL. */
  url?: string;
  /** Partial matching images on the page. Those images are similar enough to share some key-point features. For example an original image will likely have partial matching for its crops. */
  partialMatchingImages?: Array<GoogleCloudVisionV1p2beta1WebDetectionWebImage>;
  /** Title for the web page, may contain HTML markups. */
  pageTitle?: string;
}

export const GoogleCloudVisionV1p2beta1WebDetectionWebPage: Schema.Schema<GoogleCloudVisionV1p2beta1WebDetectionWebPage> = Schema.suspend(() => Schema.Struct({
  fullMatchingImages: Schema.optional(Schema.Array(GoogleCloudVisionV1p2beta1WebDetectionWebImage)),
  score: Schema.optional(Schema.Number),
  url: Schema.optional(Schema.String),
  partialMatchingImages: Schema.optional(Schema.Array(GoogleCloudVisionV1p2beta1WebDetectionWebImage)),
  pageTitle: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p2beta1WebDetectionWebPage" }) as any as Schema.Schema<GoogleCloudVisionV1p2beta1WebDetectionWebPage>;

export interface GoogleCloudVisionV1p2beta1WebDetectionWebLabel {
  /** The BCP-47 language code for `label`, such as "en-US" or "sr-Latn". For more information, see http://www.unicode.org/reports/tr35/#Unicode_locale_identifier. */
  languageCode?: string;
  /** Label for extra metadata. */
  label?: string;
}

export const GoogleCloudVisionV1p2beta1WebDetectionWebLabel: Schema.Schema<GoogleCloudVisionV1p2beta1WebDetectionWebLabel> = Schema.suspend(() => Schema.Struct({
  languageCode: Schema.optional(Schema.String),
  label: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p2beta1WebDetectionWebLabel" }) as any as Schema.Schema<GoogleCloudVisionV1p2beta1WebDetectionWebLabel>;

export interface GoogleCloudVisionV1p2beta1WebDetection {
  /** The visually similar image results. */
  visuallySimilarImages?: Array<GoogleCloudVisionV1p2beta1WebDetectionWebImage>;
  /** Fully matching images from the Internet. Can include resized copies of the query image. */
  fullMatchingImages?: Array<GoogleCloudVisionV1p2beta1WebDetectionWebImage>;
  /** Deduced entities from similar images on the Internet. */
  webEntities?: Array<GoogleCloudVisionV1p2beta1WebDetectionWebEntity>;
  /** Partial matching images from the Internet. Those images are similar enough to share some key-point features. For example an original image will likely have partial matching for its crops. */
  partialMatchingImages?: Array<GoogleCloudVisionV1p2beta1WebDetectionWebImage>;
  /** Web pages containing the matching images from the Internet. */
  pagesWithMatchingImages?: Array<GoogleCloudVisionV1p2beta1WebDetectionWebPage>;
  /** The service's best guess as to the topic of the request image. Inferred from similar images on the open web. */
  bestGuessLabels?: Array<GoogleCloudVisionV1p2beta1WebDetectionWebLabel>;
}

export const GoogleCloudVisionV1p2beta1WebDetection: Schema.Schema<GoogleCloudVisionV1p2beta1WebDetection> = Schema.suspend(() => Schema.Struct({
  visuallySimilarImages: Schema.optional(Schema.Array(GoogleCloudVisionV1p2beta1WebDetectionWebImage)),
  fullMatchingImages: Schema.optional(Schema.Array(GoogleCloudVisionV1p2beta1WebDetectionWebImage)),
  webEntities: Schema.optional(Schema.Array(GoogleCloudVisionV1p2beta1WebDetectionWebEntity)),
  partialMatchingImages: Schema.optional(Schema.Array(GoogleCloudVisionV1p2beta1WebDetectionWebImage)),
  pagesWithMatchingImages: Schema.optional(Schema.Array(GoogleCloudVisionV1p2beta1WebDetectionWebPage)),
  bestGuessLabels: Schema.optional(Schema.Array(GoogleCloudVisionV1p2beta1WebDetectionWebLabel)),
})).annotate({ identifier: "GoogleCloudVisionV1p2beta1WebDetection" }) as any as Schema.Schema<GoogleCloudVisionV1p2beta1WebDetection>;

export interface GoogleCloudVisionV1p2beta1Property {
  /** Value of the property. */
  value?: string;
  /** Value of numeric properties. */
  uint64Value?: string;
  /** Name of the property. */
  name?: string;
}

export const GoogleCloudVisionV1p2beta1Property: Schema.Schema<GoogleCloudVisionV1p2beta1Property> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
  uint64Value: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p2beta1Property" }) as any as Schema.Schema<GoogleCloudVisionV1p2beta1Property>;

export interface GoogleCloudVisionV1p3beta1LocalizedObjectAnnotation {
  /** Score of the result. Range [0, 1]. */
  score?: number;
  /** Image region to which this object belongs. This must be populated. */
  boundingPoly?: GoogleCloudVisionV1p3beta1BoundingPoly;
  /** Object name, expressed in its `language_code` language. */
  name?: string;
  /** The BCP-47 language code, such as "en-US" or "sr-Latn". For more information, see http://www.unicode.org/reports/tr35/#Unicode_locale_identifier. */
  languageCode?: string;
  /** Object ID that should align with EntityAnnotation mid. */
  mid?: string;
}

export const GoogleCloudVisionV1p3beta1LocalizedObjectAnnotation: Schema.Schema<GoogleCloudVisionV1p3beta1LocalizedObjectAnnotation> = Schema.suspend(() => Schema.Struct({
  score: Schema.optional(Schema.Number),
  boundingPoly: Schema.optional(GoogleCloudVisionV1p3beta1BoundingPoly),
  name: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
  mid: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p3beta1LocalizedObjectAnnotation" }) as any as Schema.Schema<GoogleCloudVisionV1p3beta1LocalizedObjectAnnotation>;

export interface GoogleCloudVisionV1p3beta1ProductKeyValue {
  /** The key of the label attached to the product. Cannot be empty and cannot exceed 128 bytes. */
  key?: string;
  /** The value of the label attached to the product. Cannot be empty and cannot exceed 128 bytes. */
  value?: string;
}

export const GoogleCloudVisionV1p3beta1ProductKeyValue: Schema.Schema<GoogleCloudVisionV1p3beta1ProductKeyValue> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p3beta1ProductKeyValue" }) as any as Schema.Schema<GoogleCloudVisionV1p3beta1ProductKeyValue>;

export interface GoogleCloudVisionV1p3beta1Product {
  /** User-provided metadata to be stored with this product. Must be at most 4096 characters long. */
  description?: string;
  /** Key-value pairs that can be attached to a product. At query time, constraints can be specified based on the product_labels. Note that integer values can be provided as strings, e.g. "1199". Only strings with integer values can match a range-based restriction which is to be supported soon. Multiple values can be assigned to the same key. One product may have up to 500 product_labels. Notice that the total number of distinct product_labels over all products in one ProductSet cannot exceed 1M, otherwise the product search pipeline will refuse to work for that ProductSet. */
  productLabels?: Array<GoogleCloudVisionV1p3beta1ProductKeyValue>;
  /** The resource name of the product. Format is: `projects/PROJECT_ID/locations/LOC_ID/products/PRODUCT_ID`. This field is ignored when creating a product. */
  name?: string;
  /** The user-provided name for this Product. Must not be empty. Must be at most 4096 characters long. */
  displayName?: string;
  /** Immutable. The category for the product identified by the reference image. This should be one of "homegoods-v2", "apparel-v2", "toys-v2", "packagedgoods-v1" or "general-v1". The legacy categories "homegoods", "apparel", and "toys" are still supported, but these should not be used for new products. */
  productCategory?: string;
}

export const GoogleCloudVisionV1p3beta1Product: Schema.Schema<GoogleCloudVisionV1p3beta1Product> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  productLabels: Schema.optional(Schema.Array(GoogleCloudVisionV1p3beta1ProductKeyValue)),
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  productCategory: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p3beta1Product" }) as any as Schema.Schema<GoogleCloudVisionV1p3beta1Product>;

export interface GoogleCloudVisionV1p3beta1ProductSearchResultsResult {
  /** A confidence level on the match, ranging from 0 (no confidence) to 1 (full confidence). */
  score?: number;
  /** The resource name of the image from the product that is the closest match to the query. */
  image?: string;
  /** The Product. */
  product?: GoogleCloudVisionV1p3beta1Product;
}

export const GoogleCloudVisionV1p3beta1ProductSearchResultsResult: Schema.Schema<GoogleCloudVisionV1p3beta1ProductSearchResultsResult> = Schema.suspend(() => Schema.Struct({
  score: Schema.optional(Schema.Number),
  image: Schema.optional(Schema.String),
  product: Schema.optional(GoogleCloudVisionV1p3beta1Product),
})).annotate({ identifier: "GoogleCloudVisionV1p3beta1ProductSearchResultsResult" }) as any as Schema.Schema<GoogleCloudVisionV1p3beta1ProductSearchResultsResult>;

export interface GoogleCloudVisionV1p3beta1ProductSearchResultsGroupedResult {
  /** List of results, one for each product match. */
  results?: Array<GoogleCloudVisionV1p3beta1ProductSearchResultsResult>;
  /** List of generic predictions for the object in the bounding box. */
  objectAnnotations?: Array<GoogleCloudVisionV1p3beta1ProductSearchResultsObjectAnnotation>;
  /** The bounding polygon around the product detected in the query image. */
  boundingPoly?: GoogleCloudVisionV1p3beta1BoundingPoly;
}

export const GoogleCloudVisionV1p3beta1ProductSearchResultsGroupedResult: Schema.Schema<GoogleCloudVisionV1p3beta1ProductSearchResultsGroupedResult> = Schema.suspend(() => Schema.Struct({
  results: Schema.optional(Schema.Array(GoogleCloudVisionV1p3beta1ProductSearchResultsResult)),
  objectAnnotations: Schema.optional(Schema.Array(GoogleCloudVisionV1p3beta1ProductSearchResultsObjectAnnotation)),
  boundingPoly: Schema.optional(GoogleCloudVisionV1p3beta1BoundingPoly),
})).annotate({ identifier: "GoogleCloudVisionV1p3beta1ProductSearchResultsGroupedResult" }) as any as Schema.Schema<GoogleCloudVisionV1p3beta1ProductSearchResultsGroupedResult>;

export interface GoogleCloudVisionV1p3beta1ProductSearchResults {
  /** Timestamp of the index which provided these results. Products added to the product set and products removed from the product set after this time are not reflected in the current results. */
  indexTime?: string;
  /** List of results, one for each product match. */
  results?: Array<GoogleCloudVisionV1p3beta1ProductSearchResultsResult>;
  /** List of results grouped by products detected in the query image. Each entry corresponds to one bounding polygon in the query image, and contains the matching products specific to that region. There may be duplicate product matches in the union of all the per-product results. */
  productGroupedResults?: Array<GoogleCloudVisionV1p3beta1ProductSearchResultsGroupedResult>;
}

export const GoogleCloudVisionV1p3beta1ProductSearchResults: Schema.Schema<GoogleCloudVisionV1p3beta1ProductSearchResults> = Schema.suspend(() => Schema.Struct({
  indexTime: Schema.optional(Schema.String),
  results: Schema.optional(Schema.Array(GoogleCloudVisionV1p3beta1ProductSearchResultsResult)),
  productGroupedResults: Schema.optional(Schema.Array(GoogleCloudVisionV1p3beta1ProductSearchResultsGroupedResult)),
})).annotate({ identifier: "GoogleCloudVisionV1p3beta1ProductSearchResults" }) as any as Schema.Schema<GoogleCloudVisionV1p3beta1ProductSearchResults>;

export interface ReferenceImage {
  /** Optional. Bounding polygons around the areas of interest in the reference image. If this field is empty, the system will try to detect regions of interest. At most 10 bounding polygons will be used. The provided shape is converted into a non-rotated rectangle. Once converted, the small edge of the rectangle must be greater than or equal to 300 pixels. The aspect ratio must be 1:4 or less (i.e. 1:3 is ok; 1:5 is not). */
  boundingPolys?: Array<BoundingPoly>;
  /** The resource name of the reference image. Format is: `projects/PROJECT_ID/locations/LOC_ID/products/PRODUCT_ID/referenceImages/IMAGE_ID`. This field is ignored when creating a reference image. */
  name?: string;
  /** Required. The Google Cloud Storage URI of the reference image. The URI must start with `gs://`. */
  uri?: string;
}

export const ReferenceImage: Schema.Schema<ReferenceImage> = Schema.suspend(() => Schema.Struct({
  boundingPolys: Schema.optional(Schema.Array(BoundingPoly)),
  name: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "ReferenceImage" }) as any as Schema.Schema<ReferenceImage>;

export interface ImportProductSetsResponse {
  /** The list of reference_images that are imported successfully. */
  referenceImages?: Array<ReferenceImage>;
  /** The rpc status for each ImportProductSet request, including both successes and errors. The number of statuses here matches the number of lines in the csv file, and statuses[i] stores the success or failure status of processing the i-th line of the csv, starting from line 0. */
  statuses?: Array<Status>;
}

export const ImportProductSetsResponse: Schema.Schema<ImportProductSetsResponse> = Schema.suspend(() => Schema.Struct({
  referenceImages: Schema.optional(Schema.Array(ReferenceImage)),
  statuses: Schema.optional(Schema.Array(Status)),
})).annotate({ identifier: "ImportProductSetsResponse" }) as any as Schema.Schema<ImportProductSetsResponse>;

export interface GoogleCloudVisionV1p2beta1GcsDestination {
  /** Google Cloud Storage URI prefix where the results will be stored. Results will be in JSON format and preceded by its corresponding input URI prefix. This field can either represent a gcs file prefix or gcs directory. In either case, the uri should be unique because in order to get all of the output files, you will need to do a wildcard gcs search on the uri prefix you provide. Examples: * File Prefix: gs://bucket-name/here/filenameprefix The output files will be created in gs://bucket-name/here/ and the names of the output files will begin with "filenameprefix". * Directory Prefix: gs://bucket-name/some/location/ The output files will be created in gs://bucket-name/some/location/ and the names of the output files could be anything because there was no filename prefix specified. If multiple outputs, each response is still AnnotateFileResponse, each of which contains some subset of the full list of AnnotateImageResponse. Multiple outputs can happen if, for example, the output JSON is too large and overflows into multiple sharded files. */
  uri?: string;
}

export const GoogleCloudVisionV1p2beta1GcsDestination: Schema.Schema<GoogleCloudVisionV1p2beta1GcsDestination> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p2beta1GcsDestination" }) as any as Schema.Schema<GoogleCloudVisionV1p2beta1GcsDestination>;

export interface GoogleCloudVisionV1p2beta1OutputConfig {
  /** The max number of response protos to put into each output JSON file on Google Cloud Storage. The valid range is [1, 100]. If not specified, the default value is 20. For example, for one pdf file with 100 pages, 100 response protos will be generated. If `batch_size` = 20, then 5 json files each containing 20 response protos will be written under the prefix `gcs_destination`.`uri`. Currently, batch_size only applies to GcsDestination, with potential future support for other output configurations. */
  batchSize?: number;
  /** The Google Cloud Storage location to write the output(s) to. */
  gcsDestination?: GoogleCloudVisionV1p2beta1GcsDestination;
}

export const GoogleCloudVisionV1p2beta1OutputConfig: Schema.Schema<GoogleCloudVisionV1p2beta1OutputConfig> = Schema.suspend(() => Schema.Struct({
  batchSize: Schema.optional(Schema.Number),
  gcsDestination: Schema.optional(GoogleCloudVisionV1p2beta1GcsDestination),
})).annotate({ identifier: "GoogleCloudVisionV1p2beta1OutputConfig" }) as any as Schema.Schema<GoogleCloudVisionV1p2beta1OutputConfig>;

export interface BatchAnnotateFilesResponse {
  /** The list of file annotation responses, each response corresponding to each AnnotateFileRequest in BatchAnnotateFilesRequest. */
  responses?: Array<AnnotateFileResponse>;
}

export const BatchAnnotateFilesResponse: Schema.Schema<BatchAnnotateFilesResponse> = Schema.suspend(() => Schema.Struct({
  responses: Schema.optional(Schema.Array(AnnotateFileResponse)),
})).annotate({ identifier: "BatchAnnotateFilesResponse" }) as any as Schema.Schema<BatchAnnotateFilesResponse>;

export interface OperationMetadata {
  /** Current state of the batch operation. */
  state?: "STATE_UNSPECIFIED" | "CREATED" | "RUNNING" | "DONE" | "CANCELLED" | (string & {});
  /** The time when the operation result was last updated. */
  updateTime?: string;
  /** The time when the batch request was received. */
  createTime?: string;
}

export const OperationMetadata: Schema.Schema<OperationMetadata> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "OperationMetadata" }) as any as Schema.Schema<OperationMetadata>;

export interface GoogleCloudVisionV1p3beta1SafeSearchAnnotation {
  /** Likelihood that the request image contains racy content. Racy content may include (but is not limited to) skimpy or sheer clothing, strategically covered nudity, lewd or provocative poses, or close-ups of sensitive body areas. */
  racy?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** Represents the adult content likelihood for the image. Adult content may contain elements such as nudity, pornographic images or cartoons, or sexual activities. */
  adult?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** Likelihood that this is a medical image. */
  medical?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** Spoof likelihood. The likelihood that an modification was made to the image's canonical version to make it appear funny or offensive. */
  spoof?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** Likelihood that this image contains violent content. Violent content may include death, serious harm, or injury to individuals or groups of individuals. */
  violence?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
}

export const GoogleCloudVisionV1p3beta1SafeSearchAnnotation: Schema.Schema<GoogleCloudVisionV1p3beta1SafeSearchAnnotation> = Schema.suspend(() => Schema.Struct({
  racy: Schema.optional(Schema.String),
  adult: Schema.optional(Schema.String),
  medical: Schema.optional(Schema.String),
  spoof: Schema.optional(Schema.String),
  violence: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p3beta1SafeSearchAnnotation" }) as any as Schema.Schema<GoogleCloudVisionV1p3beta1SafeSearchAnnotation>;

export interface GoogleCloudVisionV1p3beta1FaceAnnotation {
  /** Surprise likelihood. */
  surpriseLikelihood?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** The `fd_bounding_poly` bounding polygon is tighter than the `boundingPoly`, and encloses only the skin part of the face. Typically, it is used to eliminate the face from any image analysis that detects the "amount of skin" visible in an image. It is not based on the landmarker results, only on the initial face detection, hence the fd (face detection) prefix. */
  fdBoundingPoly?: GoogleCloudVisionV1p3beta1BoundingPoly;
  /** Under-exposed likelihood. */
  underExposedLikelihood?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** Face landmarking confidence. Range [0, 1]. */
  landmarkingConfidence?: number;
  /** Yaw angle, which indicates the leftward/rightward angle that the face is pointing relative to the vertical plane perpendicular to the image. Range [-180,180]. */
  panAngle?: number;
  /** Headwear likelihood. */
  headwearLikelihood?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** Pitch angle, which indicates the upwards/downwards angle that the face is pointing relative to the image's horizontal plane. Range [-180,180]. */
  tiltAngle?: number;
  /** The bounding polygon around the face. The coordinates of the bounding box are in the original image's scale. The bounding box is computed to "frame" the face in accordance with human expectations. It is based on the landmarker results. Note that one or more x and/or y coordinates may not be generated in the `BoundingPoly` (the polygon will be unbounded) if only a partial face appears in the image to be annotated. */
  boundingPoly?: GoogleCloudVisionV1p3beta1BoundingPoly;
  /** Blurred likelihood. */
  blurredLikelihood?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** Roll angle, which indicates the amount of clockwise/anti-clockwise rotation of the face relative to the image vertical about the axis perpendicular to the face. Range [-180,180]. */
  rollAngle?: number;
  /** Joy likelihood. */
  joyLikelihood?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** Sorrow likelihood. */
  sorrowLikelihood?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** Anger likelihood. */
  angerLikelihood?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** Detected face landmarks. */
  landmarks?: Array<GoogleCloudVisionV1p3beta1FaceAnnotationLandmark>;
  /** Detection confidence. Range [0, 1]. */
  detectionConfidence?: number;
}

export const GoogleCloudVisionV1p3beta1FaceAnnotation: Schema.Schema<GoogleCloudVisionV1p3beta1FaceAnnotation> = Schema.suspend(() => Schema.Struct({
  surpriseLikelihood: Schema.optional(Schema.String),
  fdBoundingPoly: Schema.optional(GoogleCloudVisionV1p3beta1BoundingPoly),
  underExposedLikelihood: Schema.optional(Schema.String),
  landmarkingConfidence: Schema.optional(Schema.Number),
  panAngle: Schema.optional(Schema.Number),
  headwearLikelihood: Schema.optional(Schema.String),
  tiltAngle: Schema.optional(Schema.Number),
  boundingPoly: Schema.optional(GoogleCloudVisionV1p3beta1BoundingPoly),
  blurredLikelihood: Schema.optional(Schema.String),
  rollAngle: Schema.optional(Schema.Number),
  joyLikelihood: Schema.optional(Schema.String),
  sorrowLikelihood: Schema.optional(Schema.String),
  angerLikelihood: Schema.optional(Schema.String),
  landmarks: Schema.optional(Schema.Array(GoogleCloudVisionV1p3beta1FaceAnnotationLandmark)),
  detectionConfidence: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVisionV1p3beta1FaceAnnotation" }) as any as Schema.Schema<GoogleCloudVisionV1p3beta1FaceAnnotation>;

export interface AsyncBatchAnnotateImagesRequest {
  /** Optional. Target project and location to make a call. Format: `projects/{project-id}/locations/{location-id}`. If no parent is specified, a region will be chosen automatically. Supported location-ids: `us`: USA country only, `asia`: East asia areas, like Japan, Taiwan, `eu`: The European Union. Example: `projects/project-A/locations/eu`. */
  parent?: string;
  /** Optional. The labels with user-defined metadata for the request. Label keys and values can be no longer than 63 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. Label values are optional. Label keys must start with a letter. */
  labels?: Record<string, string>;
  /** Required. Individual image annotation requests for this batch. */
  requests?: Array<AnnotateImageRequest>;
  /** Required. The desired output location and metadata (e.g. format). */
  outputConfig?: OutputConfig;
}

export const AsyncBatchAnnotateImagesRequest: Schema.Schema<AsyncBatchAnnotateImagesRequest> = Schema.suspend(() => Schema.Struct({
  parent: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  requests: Schema.optional(Schema.Array(AnnotateImageRequest)),
  outputConfig: Schema.optional(OutputConfig),
})).annotate({ identifier: "AsyncBatchAnnotateImagesRequest" }) as any as Schema.Schema<AsyncBatchAnnotateImagesRequest>;

export interface ListProductsResponse {
  /** List of products. */
  products?: Array<Product>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
}

export const ListProductsResponse: Schema.Schema<ListProductsResponse> = Schema.suspend(() => Schema.Struct({
  products: Schema.optional(Schema.Array(Product)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListProductsResponse" }) as any as Schema.Schema<ListProductsResponse>;

export interface GoogleCloudVisionV1p2beta1CropHint {
  /** Fraction of importance of this salient region with respect to the original image. */
  importanceFraction?: number;
  /** Confidence of this being a salient region. Range [0, 1]. */
  confidence?: number;
  /** The bounding polygon for the crop region. The coordinates of the bounding box are in the original image's scale. */
  boundingPoly?: GoogleCloudVisionV1p2beta1BoundingPoly;
}

export const GoogleCloudVisionV1p2beta1CropHint: Schema.Schema<GoogleCloudVisionV1p2beta1CropHint> = Schema.suspend(() => Schema.Struct({
  importanceFraction: Schema.optional(Schema.Number),
  confidence: Schema.optional(Schema.Number),
  boundingPoly: Schema.optional(GoogleCloudVisionV1p2beta1BoundingPoly),
})).annotate({ identifier: "GoogleCloudVisionV1p2beta1CropHint" }) as any as Schema.Schema<GoogleCloudVisionV1p2beta1CropHint>;

export interface GoogleCloudVisionV1p2beta1AsyncAnnotateFileResponse {
  /** The output location and metadata from AsyncAnnotateFileRequest. */
  outputConfig?: GoogleCloudVisionV1p2beta1OutputConfig;
}

export const GoogleCloudVisionV1p2beta1AsyncAnnotateFileResponse: Schema.Schema<GoogleCloudVisionV1p2beta1AsyncAnnotateFileResponse> = Schema.suspend(() => Schema.Struct({
  outputConfig: Schema.optional(GoogleCloudVisionV1p2beta1OutputConfig),
})).annotate({ identifier: "GoogleCloudVisionV1p2beta1AsyncAnnotateFileResponse" }) as any as Schema.Schema<GoogleCloudVisionV1p2beta1AsyncAnnotateFileResponse>;

export interface GoogleCloudVisionV1p2beta1OperationMetadata {
  /** Current state of the batch operation. */
  state?: "STATE_UNSPECIFIED" | "CREATED" | "RUNNING" | "DONE" | "CANCELLED" | (string & {});
  /** The time when the operation result was last updated. */
  updateTime?: string;
  /** The time when the batch request was received. */
  createTime?: string;
}

export const GoogleCloudVisionV1p2beta1OperationMetadata: Schema.Schema<GoogleCloudVisionV1p2beta1OperationMetadata> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p2beta1OperationMetadata" }) as any as Schema.Schema<GoogleCloudVisionV1p2beta1OperationMetadata>;

export interface GoogleCloudVisionV1p2beta1CropHintsAnnotation {
  /** Crop hint results. */
  cropHints?: Array<GoogleCloudVisionV1p2beta1CropHint>;
}

export const GoogleCloudVisionV1p2beta1CropHintsAnnotation: Schema.Schema<GoogleCloudVisionV1p2beta1CropHintsAnnotation> = Schema.suspend(() => Schema.Struct({
  cropHints: Schema.optional(Schema.Array(GoogleCloudVisionV1p2beta1CropHint)),
})).annotate({ identifier: "GoogleCloudVisionV1p2beta1CropHintsAnnotation" }) as any as Schema.Schema<GoogleCloudVisionV1p2beta1CropHintsAnnotation>;

export interface GoogleCloudVisionV1p1beta1OperationMetadata {
  /** The time when the batch request was received. */
  createTime?: string;
  /** Current state of the batch operation. */
  state?: "STATE_UNSPECIFIED" | "CREATED" | "RUNNING" | "DONE" | "CANCELLED" | (string & {});
  /** The time when the operation result was last updated. */
  updateTime?: string;
}

export const GoogleCloudVisionV1p1beta1OperationMetadata: Schema.Schema<GoogleCloudVisionV1p1beta1OperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p1beta1OperationMetadata" }) as any as Schema.Schema<GoogleCloudVisionV1p1beta1OperationMetadata>;

export interface GoogleCloudVisionV1p2beta1GcsSource {
  /** Google Cloud Storage URI for the input file. This must only be a Google Cloud Storage object. Wildcards are not currently supported. */
  uri?: string;
}

export const GoogleCloudVisionV1p2beta1GcsSource: Schema.Schema<GoogleCloudVisionV1p2beta1GcsSource> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p2beta1GcsSource" }) as any as Schema.Schema<GoogleCloudVisionV1p2beta1GcsSource>;

export interface GoogleCloudVisionV1p2beta1InputConfig {
  /** File content, represented as a stream of bytes. Note: As with all `bytes` fields, protobuffers use a pure binary representation, whereas JSON representations use base64. Currently, this field only works for BatchAnnotateFiles requests. It does not work for AsyncBatchAnnotateFiles requests. */
  content?: string;
  /** The Google Cloud Storage location to read the input from. */
  gcsSource?: GoogleCloudVisionV1p2beta1GcsSource;
  /** The type of the file. Currently only "application/pdf", "image/tiff" and "image/gif" are supported. Wildcards are not supported. */
  mimeType?: string;
}

export const GoogleCloudVisionV1p2beta1InputConfig: Schema.Schema<GoogleCloudVisionV1p2beta1InputConfig> = Schema.suspend(() => Schema.Struct({
  content: Schema.optional(Schema.String),
  gcsSource: Schema.optional(GoogleCloudVisionV1p2beta1GcsSource),
  mimeType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p2beta1InputConfig" }) as any as Schema.Schema<GoogleCloudVisionV1p2beta1InputConfig>;

export interface GoogleCloudVisionV1p2beta1LocationInfo {
  /** lat/long location coordinates. */
  latLng?: LatLng;
}

export const GoogleCloudVisionV1p2beta1LocationInfo: Schema.Schema<GoogleCloudVisionV1p2beta1LocationInfo> = Schema.suspend(() => Schema.Struct({
  latLng: Schema.optional(LatLng),
})).annotate({ identifier: "GoogleCloudVisionV1p2beta1LocationInfo" }) as any as Schema.Schema<GoogleCloudVisionV1p2beta1LocationInfo>;

export interface GoogleCloudVisionV1p2beta1EntityAnnotation {
  /** Opaque entity ID. Some IDs may be available in [Google Knowledge Graph Search API](https://developers.google.com/knowledge-graph/). */
  mid?: string;
  /** Overall score of the result. Range [0, 1]. */
  score?: number;
  /** The location information for the detected entity. Multiple `LocationInfo` elements can be present because one location may indicate the location of the scene in the image, and another location may indicate the location of the place where the image was taken. Location information is usually present for landmarks. */
  locations?: Array<GoogleCloudVisionV1p2beta1LocationInfo>;
  /** Image region to which this entity belongs. Not produced for `LABEL_DETECTION` features. */
  boundingPoly?: GoogleCloudVisionV1p2beta1BoundingPoly;
  /** **Deprecated. Use `score` instead.** The accuracy of the entity detection in an image. For example, for an image in which the "Eiffel Tower" entity is detected, this field represents the confidence that there is a tower in the query image. Range [0, 1]. */
  confidence?: number;
  /** The relevancy of the ICA (Image Content Annotation) label to the image. For example, the relevancy of "tower" is likely higher to an image containing the detected "Eiffel Tower" than to an image containing a detected distant towering building, even though the confidence that there is a tower in each image may be the same. Range [0, 1]. */
  topicality?: number;
  /** Some entities may have optional user-supplied `Property` (name/value) fields, such a score or string that qualifies the entity. */
  properties?: Array<GoogleCloudVisionV1p2beta1Property>;
  /** The language code for the locale in which the entity textual `description` is expressed. */
  locale?: string;
  /** Entity textual description, expressed in its `locale` language. */
  description?: string;
}

export const GoogleCloudVisionV1p2beta1EntityAnnotation: Schema.Schema<GoogleCloudVisionV1p2beta1EntityAnnotation> = Schema.suspend(() => Schema.Struct({
  mid: Schema.optional(Schema.String),
  score: Schema.optional(Schema.Number),
  locations: Schema.optional(Schema.Array(GoogleCloudVisionV1p2beta1LocationInfo)),
  boundingPoly: Schema.optional(GoogleCloudVisionV1p2beta1BoundingPoly),
  confidence: Schema.optional(Schema.Number),
  topicality: Schema.optional(Schema.Number),
  properties: Schema.optional(Schema.Array(GoogleCloudVisionV1p2beta1Property)),
  locale: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p2beta1EntityAnnotation" }) as any as Schema.Schema<GoogleCloudVisionV1p2beta1EntityAnnotation>;

export interface GoogleCloudVisionV1p2beta1SafeSearchAnnotation {
  /** Represents the adult content likelihood for the image. Adult content may contain elements such as nudity, pornographic images or cartoons, or sexual activities. */
  adult?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** Likelihood that the request image contains racy content. Racy content may include (but is not limited to) skimpy or sheer clothing, strategically covered nudity, lewd or provocative poses, or close-ups of sensitive body areas. */
  racy?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** Likelihood that this image contains violent content. Violent content may include death, serious harm, or injury to individuals or groups of individuals. */
  violence?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** Spoof likelihood. The likelihood that an modification was made to the image's canonical version to make it appear funny or offensive. */
  spoof?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
  /** Likelihood that this is a medical image. */
  medical?: "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
}

export const GoogleCloudVisionV1p2beta1SafeSearchAnnotation: Schema.Schema<GoogleCloudVisionV1p2beta1SafeSearchAnnotation> = Schema.suspend(() => Schema.Struct({
  adult: Schema.optional(Schema.String),
  racy: Schema.optional(Schema.String),
  violence: Schema.optional(Schema.String),
  spoof: Schema.optional(Schema.String),
  medical: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p2beta1SafeSearchAnnotation" }) as any as Schema.Schema<GoogleCloudVisionV1p2beta1SafeSearchAnnotation>;

export interface GoogleCloudVisionV1p2beta1LocalizedObjectAnnotation {
  /** Score of the result. Range [0, 1]. */
  score?: number;
  /** Object ID that should align with EntityAnnotation mid. */
  mid?: string;
  /** Object name, expressed in its `language_code` language. */
  name?: string;
  /** The BCP-47 language code, such as "en-US" or "sr-Latn". For more information, see http://www.unicode.org/reports/tr35/#Unicode_locale_identifier. */
  languageCode?: string;
  /** Image region to which this object belongs. This must be populated. */
  boundingPoly?: GoogleCloudVisionV1p2beta1BoundingPoly;
}

export const GoogleCloudVisionV1p2beta1LocalizedObjectAnnotation: Schema.Schema<GoogleCloudVisionV1p2beta1LocalizedObjectAnnotation> = Schema.suspend(() => Schema.Struct({
  score: Schema.optional(Schema.Number),
  mid: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
  boundingPoly: Schema.optional(GoogleCloudVisionV1p2beta1BoundingPoly),
})).annotate({ identifier: "GoogleCloudVisionV1p2beta1LocalizedObjectAnnotation" }) as any as Schema.Schema<GoogleCloudVisionV1p2beta1LocalizedObjectAnnotation>;

export interface GoogleCloudVisionV1p2beta1ImageAnnotationContext {
  /** The URI of the file used to produce the image. */
  uri?: string;
  /** If the file was a PDF or TIFF, this field gives the page number within the file used to produce the image. */
  pageNumber?: number;
}

export const GoogleCloudVisionV1p2beta1ImageAnnotationContext: Schema.Schema<GoogleCloudVisionV1p2beta1ImageAnnotationContext> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
  pageNumber: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVisionV1p2beta1ImageAnnotationContext" }) as any as Schema.Schema<GoogleCloudVisionV1p2beta1ImageAnnotationContext>;

export interface GoogleCloudVisionV1p2beta1ColorInfo {
  /** The fraction of pixels the color occupies in the image. Value in range [0, 1]. */
  pixelFraction?: number;
  /** RGB components of the color. */
  color?: Color;
  /** Image-specific score for this color. Value in range [0, 1]. */
  score?: number;
}

export const GoogleCloudVisionV1p2beta1ColorInfo: Schema.Schema<GoogleCloudVisionV1p2beta1ColorInfo> = Schema.suspend(() => Schema.Struct({
  pixelFraction: Schema.optional(Schema.Number),
  color: Schema.optional(Color),
  score: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVisionV1p2beta1ColorInfo" }) as any as Schema.Schema<GoogleCloudVisionV1p2beta1ColorInfo>;

export interface GoogleCloudVisionV1p2beta1DominantColorsAnnotation {
  /** RGB color values with their score and pixel fraction. */
  colors?: Array<GoogleCloudVisionV1p2beta1ColorInfo>;
}

export const GoogleCloudVisionV1p2beta1DominantColorsAnnotation: Schema.Schema<GoogleCloudVisionV1p2beta1DominantColorsAnnotation> = Schema.suspend(() => Schema.Struct({
  colors: Schema.optional(Schema.Array(GoogleCloudVisionV1p2beta1ColorInfo)),
})).annotate({ identifier: "GoogleCloudVisionV1p2beta1DominantColorsAnnotation" }) as any as Schema.Schema<GoogleCloudVisionV1p2beta1DominantColorsAnnotation>;

export interface GoogleCloudVisionV1p2beta1ImageProperties {
  /** If present, dominant colors completed successfully. */
  dominantColors?: GoogleCloudVisionV1p2beta1DominantColorsAnnotation;
}

export const GoogleCloudVisionV1p2beta1ImageProperties: Schema.Schema<GoogleCloudVisionV1p2beta1ImageProperties> = Schema.suspend(() => Schema.Struct({
  dominantColors: Schema.optional(GoogleCloudVisionV1p2beta1DominantColorsAnnotation),
})).annotate({ identifier: "GoogleCloudVisionV1p2beta1ImageProperties" }) as any as Schema.Schema<GoogleCloudVisionV1p2beta1ImageProperties>;

export interface GoogleCloudVisionV1p2beta1AnnotateImageResponse {
  /** If present, face detection has completed successfully. */
  faceAnnotations?: Array<GoogleCloudVisionV1p2beta1FaceAnnotation>;
  /** If present, label detection has completed successfully. */
  labelAnnotations?: Array<GoogleCloudVisionV1p2beta1EntityAnnotation>;
  /** If present, safe-search annotation has completed successfully. */
  safeSearchAnnotation?: GoogleCloudVisionV1p2beta1SafeSearchAnnotation;
  /** If set, represents the error message for the operation. Note that filled-in image annotations are guaranteed to be correct, even when `error` is set. */
  error?: Status;
  /** If present, localized object detection has completed successfully. This will be sorted descending by confidence score. */
  localizedObjectAnnotations?: Array<GoogleCloudVisionV1p2beta1LocalizedObjectAnnotation>;
  /** If present, landmark detection has completed successfully. */
  landmarkAnnotations?: Array<GoogleCloudVisionV1p2beta1EntityAnnotation>;
  /** If present, text (OCR) detection has completed successfully. */
  textAnnotations?: Array<GoogleCloudVisionV1p2beta1EntityAnnotation>;
  /** If present, text (OCR) detection or document (OCR) text detection has completed successfully. This annotation provides the structural hierarchy for the OCR detected text. */
  fullTextAnnotation?: GoogleCloudVisionV1p2beta1TextAnnotation;
  /** If present, contextual information is needed to understand where this image comes from. */
  context?: GoogleCloudVisionV1p2beta1ImageAnnotationContext;
  /** If present, web detection has completed successfully. */
  webDetection?: GoogleCloudVisionV1p2beta1WebDetection;
  /** If present, product search has completed successfully. */
  productSearchResults?: GoogleCloudVisionV1p2beta1ProductSearchResults;
  /** If present, logo detection has completed successfully. */
  logoAnnotations?: Array<GoogleCloudVisionV1p2beta1EntityAnnotation>;
  /** If present, crop hints have completed successfully. */
  cropHintsAnnotation?: GoogleCloudVisionV1p2beta1CropHintsAnnotation;
  /** If present, image properties were extracted successfully. */
  imagePropertiesAnnotation?: GoogleCloudVisionV1p2beta1ImageProperties;
}

export const GoogleCloudVisionV1p2beta1AnnotateImageResponse: Schema.Schema<GoogleCloudVisionV1p2beta1AnnotateImageResponse> = Schema.suspend(() => Schema.Struct({
  faceAnnotations: Schema.optional(Schema.Array(GoogleCloudVisionV1p2beta1FaceAnnotation)),
  labelAnnotations: Schema.optional(Schema.Array(GoogleCloudVisionV1p2beta1EntityAnnotation)),
  safeSearchAnnotation: Schema.optional(GoogleCloudVisionV1p2beta1SafeSearchAnnotation),
  error: Schema.optional(Status),
  localizedObjectAnnotations: Schema.optional(Schema.Array(GoogleCloudVisionV1p2beta1LocalizedObjectAnnotation)),
  landmarkAnnotations: Schema.optional(Schema.Array(GoogleCloudVisionV1p2beta1EntityAnnotation)),
  textAnnotations: Schema.optional(Schema.Array(GoogleCloudVisionV1p2beta1EntityAnnotation)),
  fullTextAnnotation: Schema.optional(GoogleCloudVisionV1p2beta1TextAnnotation),
  context: Schema.optional(GoogleCloudVisionV1p2beta1ImageAnnotationContext),
  webDetection: Schema.optional(GoogleCloudVisionV1p2beta1WebDetection),
  productSearchResults: Schema.optional(GoogleCloudVisionV1p2beta1ProductSearchResults),
  logoAnnotations: Schema.optional(Schema.Array(GoogleCloudVisionV1p2beta1EntityAnnotation)),
  cropHintsAnnotation: Schema.optional(GoogleCloudVisionV1p2beta1CropHintsAnnotation),
  imagePropertiesAnnotation: Schema.optional(GoogleCloudVisionV1p2beta1ImageProperties),
})).annotate({ identifier: "GoogleCloudVisionV1p2beta1AnnotateImageResponse" }) as any as Schema.Schema<GoogleCloudVisionV1p2beta1AnnotateImageResponse>;

export interface GoogleCloudVisionV1p2beta1AnnotateFileResponse {
  /** This field gives the total number of pages in the file. */
  totalPages?: number;
  /** Information about the file for which this response is generated. */
  inputConfig?: GoogleCloudVisionV1p2beta1InputConfig;
  /** If set, represents the error message for the failed request. The `responses` field will not be set in this case. */
  error?: Status;
  /** Individual responses to images found within the file. This field will be empty if the `error` field is set. */
  responses?: Array<GoogleCloudVisionV1p2beta1AnnotateImageResponse>;
}

export const GoogleCloudVisionV1p2beta1AnnotateFileResponse: Schema.Schema<GoogleCloudVisionV1p2beta1AnnotateFileResponse> = Schema.suspend(() => Schema.Struct({
  totalPages: Schema.optional(Schema.Number),
  inputConfig: Schema.optional(GoogleCloudVisionV1p2beta1InputConfig),
  error: Schema.optional(Status),
  responses: Schema.optional(Schema.Array(GoogleCloudVisionV1p2beta1AnnotateImageResponse)),
})).annotate({ identifier: "GoogleCloudVisionV1p2beta1AnnotateFileResponse" }) as any as Schema.Schema<GoogleCloudVisionV1p2beta1AnnotateFileResponse>;

export interface AddProductToProductSetRequest {
  /** Required. The resource name for the Product to be added to this ProductSet. Format is: `projects/PROJECT_ID/locations/LOC_ID/products/PRODUCT_ID` */
  product?: string;
}

export const AddProductToProductSetRequest: Schema.Schema<AddProductToProductSetRequest> = Schema.suspend(() => Schema.Struct({
  product: Schema.optional(Schema.String),
})).annotate({ identifier: "AddProductToProductSetRequest" }) as any as Schema.Schema<AddProductToProductSetRequest>;

export interface GoogleCloudVisionV1p3beta1DominantColorsAnnotation {
  /** RGB color values with their score and pixel fraction. */
  colors?: Array<GoogleCloudVisionV1p3beta1ColorInfo>;
}

export const GoogleCloudVisionV1p3beta1DominantColorsAnnotation: Schema.Schema<GoogleCloudVisionV1p3beta1DominantColorsAnnotation> = Schema.suspend(() => Schema.Struct({
  colors: Schema.optional(Schema.Array(GoogleCloudVisionV1p3beta1ColorInfo)),
})).annotate({ identifier: "GoogleCloudVisionV1p3beta1DominantColorsAnnotation" }) as any as Schema.Schema<GoogleCloudVisionV1p3beta1DominantColorsAnnotation>;

export interface GoogleCloudVisionV1p3beta1GcsDestination {
  /** Google Cloud Storage URI prefix where the results will be stored. Results will be in JSON format and preceded by its corresponding input URI prefix. This field can either represent a gcs file prefix or gcs directory. In either case, the uri should be unique because in order to get all of the output files, you will need to do a wildcard gcs search on the uri prefix you provide. Examples: * File Prefix: gs://bucket-name/here/filenameprefix The output files will be created in gs://bucket-name/here/ and the names of the output files will begin with "filenameprefix". * Directory Prefix: gs://bucket-name/some/location/ The output files will be created in gs://bucket-name/some/location/ and the names of the output files could be anything because there was no filename prefix specified. If multiple outputs, each response is still AnnotateFileResponse, each of which contains some subset of the full list of AnnotateImageResponse. Multiple outputs can happen if, for example, the output JSON is too large and overflows into multiple sharded files. */
  uri?: string;
}

export const GoogleCloudVisionV1p3beta1GcsDestination: Schema.Schema<GoogleCloudVisionV1p3beta1GcsDestination> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p3beta1GcsDestination" }) as any as Schema.Schema<GoogleCloudVisionV1p3beta1GcsDestination>;

export interface GoogleCloudVisionV1p3beta1OutputConfig {
  /** The Google Cloud Storage location to write the output(s) to. */
  gcsDestination?: GoogleCloudVisionV1p3beta1GcsDestination;
  /** The max number of response protos to put into each output JSON file on Google Cloud Storage. The valid range is [1, 100]. If not specified, the default value is 20. For example, for one pdf file with 100 pages, 100 response protos will be generated. If `batch_size` = 20, then 5 json files each containing 20 response protos will be written under the prefix `gcs_destination`.`uri`. Currently, batch_size only applies to GcsDestination, with potential future support for other output configurations. */
  batchSize?: number;
}

export const GoogleCloudVisionV1p3beta1OutputConfig: Schema.Schema<GoogleCloudVisionV1p3beta1OutputConfig> = Schema.suspend(() => Schema.Struct({
  gcsDestination: Schema.optional(GoogleCloudVisionV1p3beta1GcsDestination),
  batchSize: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVisionV1p3beta1OutputConfig" }) as any as Schema.Schema<GoogleCloudVisionV1p3beta1OutputConfig>;

export interface GoogleCloudVisionV1p3beta1AsyncAnnotateFileResponse {
  /** The output location and metadata from AsyncAnnotateFileRequest. */
  outputConfig?: GoogleCloudVisionV1p3beta1OutputConfig;
}

export const GoogleCloudVisionV1p3beta1AsyncAnnotateFileResponse: Schema.Schema<GoogleCloudVisionV1p3beta1AsyncAnnotateFileResponse> = Schema.suspend(() => Schema.Struct({
  outputConfig: Schema.optional(GoogleCloudVisionV1p3beta1OutputConfig),
})).annotate({ identifier: "GoogleCloudVisionV1p3beta1AsyncAnnotateFileResponse" }) as any as Schema.Schema<GoogleCloudVisionV1p3beta1AsyncAnnotateFileResponse>;

export interface GoogleCloudVisionV1p3beta1ImportProductSetsResponse {
  /** The rpc status for each ImportProductSet request, including both successes and errors. The number of statuses here matches the number of lines in the csv file, and statuses[i] stores the success or failure status of processing the i-th line of the csv, starting from line 0. */
  statuses?: Array<Status>;
  /** The list of reference_images that are imported successfully. */
  referenceImages?: Array<GoogleCloudVisionV1p3beta1ReferenceImage>;
}

export const GoogleCloudVisionV1p3beta1ImportProductSetsResponse: Schema.Schema<GoogleCloudVisionV1p3beta1ImportProductSetsResponse> = Schema.suspend(() => Schema.Struct({
  statuses: Schema.optional(Schema.Array(Status)),
  referenceImages: Schema.optional(Schema.Array(GoogleCloudVisionV1p3beta1ReferenceImage)),
})).annotate({ identifier: "GoogleCloudVisionV1p3beta1ImportProductSetsResponse" }) as any as Schema.Schema<GoogleCloudVisionV1p3beta1ImportProductSetsResponse>;

export interface GoogleCloudVisionV1p3beta1ImageAnnotationContext {
  /** The URI of the file used to produce the image. */
  uri?: string;
  /** If the file was a PDF or TIFF, this field gives the page number within the file used to produce the image. */
  pageNumber?: number;
}

export const GoogleCloudVisionV1p3beta1ImageAnnotationContext: Schema.Schema<GoogleCloudVisionV1p3beta1ImageAnnotationContext> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
  pageNumber: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVisionV1p3beta1ImageAnnotationContext" }) as any as Schema.Schema<GoogleCloudVisionV1p3beta1ImageAnnotationContext>;

export interface ListProductSetsResponse {
  /** List of ProductSets. */
  productSets?: Array<ProductSet>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
}

export const ListProductSetsResponse: Schema.Schema<ListProductSetsResponse> = Schema.suspend(() => Schema.Struct({
  productSets: Schema.optional(Schema.Array(ProductSet)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListProductSetsResponse" }) as any as Schema.Schema<ListProductSetsResponse>;

export interface GoogleCloudVisionV1p3beta1ImageProperties {
  /** If present, dominant colors completed successfully. */
  dominantColors?: GoogleCloudVisionV1p3beta1DominantColorsAnnotation;
}

export const GoogleCloudVisionV1p3beta1ImageProperties: Schema.Schema<GoogleCloudVisionV1p3beta1ImageProperties> = Schema.suspend(() => Schema.Struct({
  dominantColors: Schema.optional(GoogleCloudVisionV1p3beta1DominantColorsAnnotation),
})).annotate({ identifier: "GoogleCloudVisionV1p3beta1ImageProperties" }) as any as Schema.Schema<GoogleCloudVisionV1p3beta1ImageProperties>;

export interface GoogleCloudVisionV1p3beta1TextAnnotation {
  /** List of pages detected by OCR. */
  pages?: Array<GoogleCloudVisionV1p3beta1Page>;
  /** UTF-8 text detected on the pages. */
  text?: string;
}

export const GoogleCloudVisionV1p3beta1TextAnnotation: Schema.Schema<GoogleCloudVisionV1p3beta1TextAnnotation> = Schema.suspend(() => Schema.Struct({
  pages: Schema.optional(Schema.Array(GoogleCloudVisionV1p3beta1Page)),
  text: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p3beta1TextAnnotation" }) as any as Schema.Schema<GoogleCloudVisionV1p3beta1TextAnnotation>;

export interface GoogleCloudVisionV1p3beta1AnnotateImageResponse {
  /** If present, contextual information is needed to understand where this image comes from. */
  context?: GoogleCloudVisionV1p3beta1ImageAnnotationContext;
  /** If present, crop hints have completed successfully. */
  cropHintsAnnotation?: GoogleCloudVisionV1p3beta1CropHintsAnnotation;
  /** If present, image properties were extracted successfully. */
  imagePropertiesAnnotation?: GoogleCloudVisionV1p3beta1ImageProperties;
  /** If present, logo detection has completed successfully. */
  logoAnnotations?: Array<GoogleCloudVisionV1p3beta1EntityAnnotation>;
  /** If set, represents the error message for the operation. Note that filled-in image annotations are guaranteed to be correct, even when `error` is set. */
  error?: Status;
  /** If present, label detection has completed successfully. */
  labelAnnotations?: Array<GoogleCloudVisionV1p3beta1EntityAnnotation>;
  /** If present, product search has completed successfully. */
  productSearchResults?: GoogleCloudVisionV1p3beta1ProductSearchResults;
  /** If present, face detection has completed successfully. */
  faceAnnotations?: Array<GoogleCloudVisionV1p3beta1FaceAnnotation>;
  /** If present, web detection has completed successfully. */
  webDetection?: GoogleCloudVisionV1p3beta1WebDetection;
  /** If present, localized object detection has completed successfully. This will be sorted descending by confidence score. */
  localizedObjectAnnotations?: Array<GoogleCloudVisionV1p3beta1LocalizedObjectAnnotation>;
  /** If present, text (OCR) detection or document (OCR) text detection has completed successfully. This annotation provides the structural hierarchy for the OCR detected text. */
  fullTextAnnotation?: GoogleCloudVisionV1p3beta1TextAnnotation;
  /** If present, landmark detection has completed successfully. */
  landmarkAnnotations?: Array<GoogleCloudVisionV1p3beta1EntityAnnotation>;
  /** If present, safe-search annotation has completed successfully. */
  safeSearchAnnotation?: GoogleCloudVisionV1p3beta1SafeSearchAnnotation;
  /** If present, text (OCR) detection has completed successfully. */
  textAnnotations?: Array<GoogleCloudVisionV1p3beta1EntityAnnotation>;
}

export const GoogleCloudVisionV1p3beta1AnnotateImageResponse: Schema.Schema<GoogleCloudVisionV1p3beta1AnnotateImageResponse> = Schema.suspend(() => Schema.Struct({
  context: Schema.optional(GoogleCloudVisionV1p3beta1ImageAnnotationContext),
  cropHintsAnnotation: Schema.optional(GoogleCloudVisionV1p3beta1CropHintsAnnotation),
  imagePropertiesAnnotation: Schema.optional(GoogleCloudVisionV1p3beta1ImageProperties),
  logoAnnotations: Schema.optional(Schema.Array(GoogleCloudVisionV1p3beta1EntityAnnotation)),
  error: Schema.optional(Status),
  labelAnnotations: Schema.optional(Schema.Array(GoogleCloudVisionV1p3beta1EntityAnnotation)),
  productSearchResults: Schema.optional(GoogleCloudVisionV1p3beta1ProductSearchResults),
  faceAnnotations: Schema.optional(Schema.Array(GoogleCloudVisionV1p3beta1FaceAnnotation)),
  webDetection: Schema.optional(GoogleCloudVisionV1p3beta1WebDetection),
  localizedObjectAnnotations: Schema.optional(Schema.Array(GoogleCloudVisionV1p3beta1LocalizedObjectAnnotation)),
  fullTextAnnotation: Schema.optional(GoogleCloudVisionV1p3beta1TextAnnotation),
  landmarkAnnotations: Schema.optional(Schema.Array(GoogleCloudVisionV1p3beta1EntityAnnotation)),
  safeSearchAnnotation: Schema.optional(GoogleCloudVisionV1p3beta1SafeSearchAnnotation),
  textAnnotations: Schema.optional(Schema.Array(GoogleCloudVisionV1p3beta1EntityAnnotation)),
})).annotate({ identifier: "GoogleCloudVisionV1p3beta1AnnotateImageResponse" }) as any as Schema.Schema<GoogleCloudVisionV1p3beta1AnnotateImageResponse>;

export interface GoogleCloudVisionV1p3beta1AnnotateFileResponse {
  /** Information about the file for which this response is generated. */
  inputConfig?: GoogleCloudVisionV1p3beta1InputConfig;
  /** Individual responses to images found within the file. This field will be empty if the `error` field is set. */
  responses?: Array<GoogleCloudVisionV1p3beta1AnnotateImageResponse>;
  /** This field gives the total number of pages in the file. */
  totalPages?: number;
  /** If set, represents the error message for the failed request. The `responses` field will not be set in this case. */
  error?: Status;
}

export const GoogleCloudVisionV1p3beta1AnnotateFileResponse: Schema.Schema<GoogleCloudVisionV1p3beta1AnnotateFileResponse> = Schema.suspend(() => Schema.Struct({
  inputConfig: Schema.optional(GoogleCloudVisionV1p3beta1InputConfig),
  responses: Schema.optional(Schema.Array(GoogleCloudVisionV1p3beta1AnnotateImageResponse)),
  totalPages: Schema.optional(Schema.Number),
  error: Schema.optional(Status),
})).annotate({ identifier: "GoogleCloudVisionV1p3beta1AnnotateFileResponse" }) as any as Schema.Schema<GoogleCloudVisionV1p3beta1AnnotateFileResponse>;

export interface BatchOperationMetadata {
  /** The time when the batch request was submitted to the server. */
  submitTime?: string;
  /** The current state of the batch operation. */
  state?: "STATE_UNSPECIFIED" | "PROCESSING" | "SUCCESSFUL" | "FAILED" | "CANCELLED" | (string & {});
  /** The time when the batch request is finished and google.longrunning.Operation.done is set to true. */
  endTime?: string;
}

export const BatchOperationMetadata: Schema.Schema<BatchOperationMetadata> = Schema.suspend(() => Schema.Struct({
  submitTime: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "BatchOperationMetadata" }) as any as Schema.Schema<BatchOperationMetadata>;

export interface GoogleCloudVisionV1p3beta1BatchOperationMetadata {
  /** The time when the batch request was submitted to the server. */
  submitTime?: string;
  /** The current state of the batch operation. */
  state?: "STATE_UNSPECIFIED" | "PROCESSING" | "SUCCESSFUL" | "FAILED" | "CANCELLED" | (string & {});
  /** The time when the batch request is finished and google.longrunning.Operation.done is set to true. */
  endTime?: string;
}

export const GoogleCloudVisionV1p3beta1BatchOperationMetadata: Schema.Schema<GoogleCloudVisionV1p3beta1BatchOperationMetadata> = Schema.suspend(() => Schema.Struct({
  submitTime: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p3beta1BatchOperationMetadata" }) as any as Schema.Schema<GoogleCloudVisionV1p3beta1BatchOperationMetadata>;

export interface ListProductsInProductSetResponse {
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
  /** The list of Products. */
  products?: Array<Product>;
}

export const ListProductsInProductSetResponse: Schema.Schema<ListProductsInProductSetResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  products: Schema.optional(Schema.Array(Product)),
})).annotate({ identifier: "ListProductsInProductSetResponse" }) as any as Schema.Schema<ListProductsInProductSetResponse>;

export interface AsyncAnnotateFileResponse {
  /** The output location and metadata from AsyncAnnotateFileRequest. */
  outputConfig?: OutputConfig;
}

export const AsyncAnnotateFileResponse: Schema.Schema<AsyncAnnotateFileResponse> = Schema.suspend(() => Schema.Struct({
  outputConfig: Schema.optional(OutputConfig),
})).annotate({ identifier: "AsyncAnnotateFileResponse" }) as any as Schema.Schema<AsyncAnnotateFileResponse>;

export interface AsyncBatchAnnotateFilesResponse {
  /** The list of file annotation responses, one for each request in AsyncBatchAnnotateFilesRequest. */
  responses?: Array<AsyncAnnotateFileResponse>;
}

export const AsyncBatchAnnotateFilesResponse: Schema.Schema<AsyncBatchAnnotateFilesResponse> = Schema.suspend(() => Schema.Struct({
  responses: Schema.optional(Schema.Array(AsyncAnnotateFileResponse)),
})).annotate({ identifier: "AsyncBatchAnnotateFilesResponse" }) as any as Schema.Schema<AsyncBatchAnnotateFilesResponse>;

export interface GoogleCloudVisionV1p4beta1OperationMetadata {
  /** Current state of the batch operation. */
  state?: "STATE_UNSPECIFIED" | "CREATED" | "RUNNING" | "DONE" | "CANCELLED" | (string & {});
  /** The time when the operation result was last updated. */
  updateTime?: string;
  /** The time when the batch request was received. */
  createTime?: string;
}

export const GoogleCloudVisionV1p4beta1OperationMetadata: Schema.Schema<GoogleCloudVisionV1p4beta1OperationMetadata> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVisionV1p4beta1OperationMetadata" }) as any as Schema.Schema<GoogleCloudVisionV1p4beta1OperationMetadata>;

export interface ProductSetPurgeConfig {
  /** The ProductSet that contains the Products to delete. If a Product is a member of product_set_id in addition to other ProductSets, the Product will still be deleted. */
  productSetId?: string;
}

export const ProductSetPurgeConfig: Schema.Schema<ProductSetPurgeConfig> = Schema.suspend(() => Schema.Struct({
  productSetId: Schema.optional(Schema.String),
})).annotate({ identifier: "ProductSetPurgeConfig" }) as any as Schema.Schema<ProductSetPurgeConfig>;

export interface PurgeProductsRequest {
  /** The default value is false. Override this value to true to actually perform the purge. */
  force?: boolean;
  /** Specify which ProductSet contains the Products to be deleted. */
  productSetPurgeConfig?: ProductSetPurgeConfig;
  /** If delete_orphan_products is true, all Products that are not in any ProductSet will be deleted. */
  deleteOrphanProducts?: boolean;
}

export const PurgeProductsRequest: Schema.Schema<PurgeProductsRequest> = Schema.suspend(() => Schema.Struct({
  force: Schema.optional(Schema.Boolean),
  productSetPurgeConfig: Schema.optional(ProductSetPurgeConfig),
  deleteOrphanProducts: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "PurgeProductsRequest" }) as any as Schema.Schema<PurgeProductsRequest>;

export interface GoogleCloudVisionV1p4beta1BatchAnnotateFilesResponse {
  /** The list of file annotation responses, each response corresponding to each AnnotateFileRequest in BatchAnnotateFilesRequest. */
  responses?: Array<GoogleCloudVisionV1p4beta1AnnotateFileResponse>;
}

export const GoogleCloudVisionV1p4beta1BatchAnnotateFilesResponse: Schema.Schema<GoogleCloudVisionV1p4beta1BatchAnnotateFilesResponse> = Schema.suspend(() => Schema.Struct({
  responses: Schema.optional(Schema.Array(GoogleCloudVisionV1p4beta1AnnotateFileResponse)),
})).annotate({ identifier: "GoogleCloudVisionV1p4beta1BatchAnnotateFilesResponse" }) as any as Schema.Schema<GoogleCloudVisionV1p4beta1BatchAnnotateFilesResponse>;

export interface CancelOperationRequest {
}

export const CancelOperationRequest: Schema.Schema<CancelOperationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CancelOperationRequest" }) as any as Schema.Schema<CancelOperationRequest>;

export interface GoogleCloudVisionV1p2beta1AsyncBatchAnnotateFilesResponse {
  /** The list of file annotation responses, one for each request in AsyncBatchAnnotateFilesRequest. */
  responses?: Array<GoogleCloudVisionV1p2beta1AsyncAnnotateFileResponse>;
}

export const GoogleCloudVisionV1p2beta1AsyncBatchAnnotateFilesResponse: Schema.Schema<GoogleCloudVisionV1p2beta1AsyncBatchAnnotateFilesResponse> = Schema.suspend(() => Schema.Struct({
  responses: Schema.optional(Schema.Array(GoogleCloudVisionV1p2beta1AsyncAnnotateFileResponse)),
})).annotate({ identifier: "GoogleCloudVisionV1p2beta1AsyncBatchAnnotateFilesResponse" }) as any as Schema.Schema<GoogleCloudVisionV1p2beta1AsyncBatchAnnotateFilesResponse>;

export interface AsyncBatchAnnotateFilesRequest {
  /** Required. Individual async file annotation requests for this batch. */
  requests?: Array<AsyncAnnotateFileRequest>;
  /** Optional. Target project and location to make a call. Format: `projects/{project-id}/locations/{location-id}`. If no parent is specified, a region will be chosen automatically. Supported location-ids: `us`: USA country only, `asia`: East asia areas, like Japan, Taiwan, `eu`: The European Union. Example: `projects/project-A/locations/eu`. */
  parent?: string;
  /** Optional. The labels with user-defined metadata for the request. Label keys and values can be no longer than 63 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. Label values are optional. Label keys must start with a letter. */
  labels?: Record<string, string>;
}

export const AsyncBatchAnnotateFilesRequest: Schema.Schema<AsyncBatchAnnotateFilesRequest> = Schema.suspend(() => Schema.Struct({
  requests: Schema.optional(Schema.Array(AsyncAnnotateFileRequest)),
  parent: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "AsyncBatchAnnotateFilesRequest" }) as any as Schema.Schema<AsyncBatchAnnotateFilesRequest>;

export interface RemoveProductFromProductSetRequest {
  /** Required. The resource name for the Product to be removed from this ProductSet. Format is: `projects/PROJECT_ID/locations/LOC_ID/products/PRODUCT_ID` */
  product?: string;
}

export const RemoveProductFromProductSetRequest: Schema.Schema<RemoveProductFromProductSetRequest> = Schema.suspend(() => Schema.Struct({
  product: Schema.optional(Schema.String),
})).annotate({ identifier: "RemoveProductFromProductSetRequest" }) as any as Schema.Schema<RemoveProductFromProductSetRequest>;

export interface GoogleCloudVisionV1p3beta1AsyncBatchAnnotateFilesResponse {
  /** The list of file annotation responses, one for each request in AsyncBatchAnnotateFilesRequest. */
  responses?: Array<GoogleCloudVisionV1p3beta1AsyncAnnotateFileResponse>;
}

export const GoogleCloudVisionV1p3beta1AsyncBatchAnnotateFilesResponse: Schema.Schema<GoogleCloudVisionV1p3beta1AsyncBatchAnnotateFilesResponse> = Schema.suspend(() => Schema.Struct({
  responses: Schema.optional(Schema.Array(GoogleCloudVisionV1p3beta1AsyncAnnotateFileResponse)),
})).annotate({ identifier: "GoogleCloudVisionV1p3beta1AsyncBatchAnnotateFilesResponse" }) as any as Schema.Schema<GoogleCloudVisionV1p3beta1AsyncBatchAnnotateFilesResponse>;

export interface BatchAnnotateFilesRequest {
  /** Required. The list of file annotation requests. Right now we support only one AnnotateFileRequest in BatchAnnotateFilesRequest. */
  requests?: Array<AnnotateFileRequest>;
  /** Optional. Target project and location to make a call. Format: `projects/{project-id}/locations/{location-id}`. If no parent is specified, a region will be chosen automatically. Supported location-ids: `us`: USA country only, `asia`: East asia areas, like Japan, Taiwan, `eu`: The European Union. Example: `projects/project-A/locations/eu`. */
  parent?: string;
  /** Optional. The labels with user-defined metadata for the request. Label keys and values can be no longer than 63 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. Label values are optional. Label keys must start with a letter. */
  labels?: Record<string, string>;
}

export const BatchAnnotateFilesRequest: Schema.Schema<BatchAnnotateFilesRequest> = Schema.suspend(() => Schema.Struct({
  requests: Schema.optional(Schema.Array(AnnotateFileRequest)),
  parent: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "BatchAnnotateFilesRequest" }) as any as Schema.Schema<BatchAnnotateFilesRequest>;

export interface ListReferenceImagesResponse {
  /** The maximum number of items to return. Default 10, maximum 100. */
  pageSize?: number;
  /** The list of reference images. */
  referenceImages?: Array<ReferenceImage>;
  /** The next_page_token returned from a previous List request, if any. */
  nextPageToken?: string;
}

export const ListReferenceImagesResponse: Schema.Schema<ListReferenceImagesResponse> = Schema.suspend(() => Schema.Struct({
  pageSize: Schema.optional(Schema.Number),
  referenceImages: Schema.optional(Schema.Array(ReferenceImage)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListReferenceImagesResponse" }) as any as Schema.Schema<ListReferenceImagesResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export interface CancelOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: CancelOperationRequest;
}

export const CancelOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CancelOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelOperationsRequest>;

export type CancelOperationsResponse = Empty;
export const CancelOperationsResponse = Empty;

export type CancelOperationsError = CommonErrors;

export const cancelOperations: API.OperationMethod<CancelOperationsRequest, CancelOperationsResponse, CancelOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelOperationsRequest,
  output: CancelOperationsResponse,
  errors: [],
}));

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListOperationsRequest {
  /** The standard list filter. */
  filter?: string;
  /** The standard list page token. */
  pageToken?: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
  /** The standard list page size. */
  pageSize?: number;
  /** The name of the operation's parent resource. */
  name: string;
}

export const ListOperationsRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/operations" }),
  svc,
) as unknown as Schema.Schema<ListOperationsRequest>;

export type ListOperationsResponse_Op = ListOperationsResponse;
export const ListOperationsResponse_Op = ListOperationsResponse;

export type ListOperationsError = CommonErrors;

export const listOperations = API.makePaginated(() => ({
  input: ListOperationsRequest,
  output: ListOperationsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetOperationsRequest>;

export type GetOperationsResponse = Operation;
export const GetOperationsResponse = Operation;

export type GetOperationsError = CommonErrors;

export const getOperations: API.OperationMethod<GetOperationsRequest, GetOperationsResponse, GetOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOperationsRequest,
  output: GetOperationsResponse,
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

export type DeleteOperationsResponse = Empty;
export const DeleteOperationsResponse = Empty;

export type DeleteOperationsError = CommonErrors;

export const deleteOperations: API.OperationMethod<DeleteOperationsRequest, DeleteOperationsResponse, DeleteOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOperationsRequest,
  output: DeleteOperationsResponse,
  errors: [],
}));

/** Run image detection and annotation for a batch of images. */
export interface AnnotateProjectsLocationsImagesRequest {
  /** Optional. Target project and location to make a call. Format: `projects/{project-id}/locations/{location-id}`. If no parent is specified, a region will be chosen automatically. Supported location-ids: `us`: USA country only, `asia`: East asia areas, like Japan, Taiwan, `eu`: The European Union. Example: `projects/project-A/locations/eu`. */
  parent: string;
  /** Request body */
  body?: BatchAnnotateImagesRequest;
}

export const AnnotateProjectsLocationsImagesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(BatchAnnotateImagesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/images:annotate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AnnotateProjectsLocationsImagesRequest>;

export type AnnotateProjectsLocationsImagesResponse = BatchAnnotateImagesResponse;
export const AnnotateProjectsLocationsImagesResponse = BatchAnnotateImagesResponse;

export type AnnotateProjectsLocationsImagesError = CommonErrors;

export const annotateProjectsLocationsImages: API.OperationMethod<AnnotateProjectsLocationsImagesRequest, AnnotateProjectsLocationsImagesResponse, AnnotateProjectsLocationsImagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AnnotateProjectsLocationsImagesRequest,
  output: AnnotateProjectsLocationsImagesResponse,
  errors: [],
}));

/** Run asynchronous image detection and annotation for a list of images. Progress and results can be retrieved through the `google.longrunning.Operations` interface. `Operation.metadata` contains `OperationMetadata` (metadata). `Operation.response` contains `AsyncBatchAnnotateImagesResponse` (results). This service will write image annotation outputs to json files in customer GCS bucket, each json file containing BatchAnnotateImagesResponse proto. */
export interface AsyncBatchAnnotateProjectsLocationsImagesRequest {
  /** Optional. Target project and location to make a call. Format: `projects/{project-id}/locations/{location-id}`. If no parent is specified, a region will be chosen automatically. Supported location-ids: `us`: USA country only, `asia`: East asia areas, like Japan, Taiwan, `eu`: The European Union. Example: `projects/project-A/locations/eu`. */
  parent: string;
  /** Request body */
  body?: AsyncBatchAnnotateImagesRequest;
}

export const AsyncBatchAnnotateProjectsLocationsImagesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(AsyncBatchAnnotateImagesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/images:asyncBatchAnnotate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AsyncBatchAnnotateProjectsLocationsImagesRequest>;

export type AsyncBatchAnnotateProjectsLocationsImagesResponse = Operation;
export const AsyncBatchAnnotateProjectsLocationsImagesResponse = Operation;

export type AsyncBatchAnnotateProjectsLocationsImagesError = CommonErrors;

export const asyncBatchAnnotateProjectsLocationsImages: API.OperationMethod<AsyncBatchAnnotateProjectsLocationsImagesRequest, AsyncBatchAnnotateProjectsLocationsImagesResponse, AsyncBatchAnnotateProjectsLocationsImagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AsyncBatchAnnotateProjectsLocationsImagesRequest,
  output: AsyncBatchAnnotateProjectsLocationsImagesResponse,
  errors: [],
}));

/** Creates and returns a new product resource. Possible errors: * Returns INVALID_ARGUMENT if display_name is missing or longer than 4096 characters. * Returns INVALID_ARGUMENT if description is longer than 4096 characters. * Returns INVALID_ARGUMENT if product_category is missing or invalid. */
export interface CreateProjectsLocationsProductsRequest {
  /** Required. The project in which the Product should be created. Format is `projects/PROJECT_ID/locations/LOC_ID`. */
  parent: string;
  /** A user-supplied resource id for this Product. If set, the server will attempt to use this value as the resource id. If it is already in use, an error is returned with code ALREADY_EXISTS. Must be at most 128 characters long. It cannot contain the character `/`. */
  productId?: string;
  /** Request body */
  body?: Product;
}

export const CreateProjectsLocationsProductsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  productId: Schema.optional(Schema.String).pipe(T.HttpQuery("productId")),
  body: Schema.optional(Product).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/products", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsProductsRequest>;

export type CreateProjectsLocationsProductsResponse = Product;
export const CreateProjectsLocationsProductsResponse = Product;

export type CreateProjectsLocationsProductsError = CommonErrors;

export const createProjectsLocationsProducts: API.OperationMethod<CreateProjectsLocationsProductsRequest, CreateProjectsLocationsProductsResponse, CreateProjectsLocationsProductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsProductsRequest,
  output: CreateProjectsLocationsProductsResponse,
  errors: [],
}));

/** Makes changes to a Product resource. Only the `display_name`, `description`, and `labels` fields can be updated right now. If labels are updated, the change will not be reflected in queries until the next index time. Possible errors: * Returns NOT_FOUND if the Product does not exist. * Returns INVALID_ARGUMENT if display_name is present in update_mask but is missing from the request or longer than 4096 characters. * Returns INVALID_ARGUMENT if description is present in update_mask but is longer than 4096 characters. * Returns INVALID_ARGUMENT if product_category is present in update_mask. */
export interface PatchProjectsLocationsProductsRequest {
  /** The resource name of the product. Format is: `projects/PROJECT_ID/locations/LOC_ID/products/PRODUCT_ID`. This field is ignored when creating a product. */
  name: string;
  /** The FieldMask that specifies which fields to update. If update_mask isn't specified, all mutable fields are to be updated. Valid mask paths include `product_labels`, `display_name`, and `description`. */
  updateMask?: string;
  /** Request body */
  body?: Product;
}

export const PatchProjectsLocationsProductsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Product).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/products/{productsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsProductsRequest>;

export type PatchProjectsLocationsProductsResponse = Product;
export const PatchProjectsLocationsProductsResponse = Product;

export type PatchProjectsLocationsProductsError = CommonErrors;

export const patchProjectsLocationsProducts: API.OperationMethod<PatchProjectsLocationsProductsRequest, PatchProjectsLocationsProductsResponse, PatchProjectsLocationsProductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsProductsRequest,
  output: PatchProjectsLocationsProductsResponse,
  errors: [],
}));

/** Gets information associated with a Product. Possible errors: * Returns NOT_FOUND if the Product does not exist. */
export interface GetProjectsLocationsProductsRequest {
  /** Required. Resource name of the Product to get. Format is: `projects/PROJECT_ID/locations/LOC_ID/products/PRODUCT_ID` */
  name: string;
}

export const GetProjectsLocationsProductsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/products/{productsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsProductsRequest>;

export type GetProjectsLocationsProductsResponse = Product;
export const GetProjectsLocationsProductsResponse = Product;

export type GetProjectsLocationsProductsError = CommonErrors;

export const getProjectsLocationsProducts: API.OperationMethod<GetProjectsLocationsProductsRequest, GetProjectsLocationsProductsResponse, GetProjectsLocationsProductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsProductsRequest,
  output: GetProjectsLocationsProductsResponse,
  errors: [],
}));

/** Asynchronous API to delete all Products in a ProductSet or all Products that are in no ProductSet. If a Product is a member of the specified ProductSet in addition to other ProductSets, the Product will still be deleted. It is recommended to not delete the specified ProductSet until after this operation has completed. It is also recommended to not add any of the Products involved in the batch delete to a new ProductSet while this operation is running because those Products may still end up deleted. It's not possible to undo the PurgeProducts operation. Therefore, it is recommended to keep the csv files used in ImportProductSets (if that was how you originally built the Product Set) before starting PurgeProducts, in case you need to re-import the data after deletion. If the plan is to purge all of the Products from a ProductSet and then re-use the empty ProductSet to re-import new Products into the empty ProductSet, you must wait until the PurgeProducts operation has finished for that ProductSet. The google.longrunning.Operation API can be used to keep track of the progress and results of the request. `Operation.metadata` contains `BatchOperationMetadata`. (progress) */
export interface PurgeProjectsLocationsProductsRequest {
  /** Required. The project and location in which the Products should be deleted. Format is `projects/PROJECT_ID/locations/LOC_ID`. */
  parent: string;
  /** Request body */
  body?: PurgeProductsRequest;
}

export const PurgeProjectsLocationsProductsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(PurgeProductsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/products:purge", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PurgeProjectsLocationsProductsRequest>;

export type PurgeProjectsLocationsProductsResponse = Operation;
export const PurgeProjectsLocationsProductsResponse = Operation;

export type PurgeProjectsLocationsProductsError = CommonErrors;

export const purgeProjectsLocationsProducts: API.OperationMethod<PurgeProjectsLocationsProductsRequest, PurgeProjectsLocationsProductsResponse, PurgeProjectsLocationsProductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PurgeProjectsLocationsProductsRequest,
  output: PurgeProjectsLocationsProductsResponse,
  errors: [],
}));

/** Permanently deletes a product and its reference images. Metadata of the product and all its images will be deleted right away, but search queries against ProductSets containing the product may still work until all related caches are refreshed. */
export interface DeleteProjectsLocationsProductsRequest {
  /** Required. Resource name of product to delete. Format is: `projects/PROJECT_ID/locations/LOC_ID/products/PRODUCT_ID` */
  name: string;
}

export const DeleteProjectsLocationsProductsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/products/{productsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsProductsRequest>;

export type DeleteProjectsLocationsProductsResponse = Empty;
export const DeleteProjectsLocationsProductsResponse = Empty;

export type DeleteProjectsLocationsProductsError = CommonErrors;

export const deleteProjectsLocationsProducts: API.OperationMethod<DeleteProjectsLocationsProductsRequest, DeleteProjectsLocationsProductsResponse, DeleteProjectsLocationsProductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsProductsRequest,
  output: DeleteProjectsLocationsProductsResponse,
  errors: [],
}));

/** Lists products in an unspecified order. Possible errors: * Returns INVALID_ARGUMENT if page_size is greater than 100 or less than 1. */
export interface ListProjectsLocationsProductsRequest {
  /** The maximum number of items to return. Default 10, maximum 100. */
  pageSize?: number;
  /** Required. The project OR ProductSet from which Products should be listed. Format: `projects/PROJECT_ID/locations/LOC_ID` */
  parent: string;
  /** The next_page_token returned from a previous List request, if any. */
  pageToken?: string;
}

export const ListProjectsLocationsProductsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/products" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsProductsRequest>;

export type ListProjectsLocationsProductsResponse = ListProductsResponse;
export const ListProjectsLocationsProductsResponse = ListProductsResponse;

export type ListProjectsLocationsProductsError = CommonErrors;

export const listProjectsLocationsProducts = API.makePaginated(() => ({
  input: ListProjectsLocationsProductsRequest,
  output: ListProjectsLocationsProductsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets information associated with a ReferenceImage. Possible errors: * Returns NOT_FOUND if the specified image does not exist. */
export interface GetProjectsLocationsProductsReferenceImagesRequest {
  /** Required. The resource name of the ReferenceImage to get. Format is: `projects/PROJECT_ID/locations/LOC_ID/products/PRODUCT_ID/referenceImages/IMAGE_ID`. */
  name: string;
}

export const GetProjectsLocationsProductsReferenceImagesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/products/{productsId}/referenceImages/{referenceImagesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsProductsReferenceImagesRequest>;

export type GetProjectsLocationsProductsReferenceImagesResponse = ReferenceImage;
export const GetProjectsLocationsProductsReferenceImagesResponse = ReferenceImage;

export type GetProjectsLocationsProductsReferenceImagesError = CommonErrors;

export const getProjectsLocationsProductsReferenceImages: API.OperationMethod<GetProjectsLocationsProductsReferenceImagesRequest, GetProjectsLocationsProductsReferenceImagesResponse, GetProjectsLocationsProductsReferenceImagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsProductsReferenceImagesRequest,
  output: GetProjectsLocationsProductsReferenceImagesResponse,
  errors: [],
}));

/** Lists reference images. Possible errors: * Returns NOT_FOUND if the parent product does not exist. * Returns INVALID_ARGUMENT if the page_size is greater than 100, or less than 1. */
export interface ListProjectsLocationsProductsReferenceImagesRequest {
  /** Required. Resource name of the product containing the reference images. Format is `projects/PROJECT_ID/locations/LOC_ID/products/PRODUCT_ID`. */
  parent: string;
  /** A token identifying a page of results to be returned. This is the value of `nextPageToken` returned in a previous reference image list request. Defaults to the first page if not specified. */
  pageToken?: string;
  /** The maximum number of items to return. Default 10, maximum 100. */
  pageSize?: number;
}

export const ListProjectsLocationsProductsReferenceImagesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/products/{productsId}/referenceImages" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsProductsReferenceImagesRequest>;

export type ListProjectsLocationsProductsReferenceImagesResponse = ListReferenceImagesResponse;
export const ListProjectsLocationsProductsReferenceImagesResponse = ListReferenceImagesResponse;

export type ListProjectsLocationsProductsReferenceImagesError = CommonErrors;

export const listProjectsLocationsProductsReferenceImages = API.makePaginated(() => ({
  input: ListProjectsLocationsProductsReferenceImagesRequest,
  output: ListProjectsLocationsProductsReferenceImagesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Permanently deletes a reference image. The image metadata will be deleted right away, but search queries against ProductSets containing the image may still work until all related caches are refreshed. The actual image files are not deleted from Google Cloud Storage. */
export interface DeleteProjectsLocationsProductsReferenceImagesRequest {
  /** Required. The resource name of the reference image to delete. Format is: `projects/PROJECT_ID/locations/LOC_ID/products/PRODUCT_ID/referenceImages/IMAGE_ID` */
  name: string;
}

export const DeleteProjectsLocationsProductsReferenceImagesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/products/{productsId}/referenceImages/{referenceImagesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsProductsReferenceImagesRequest>;

export type DeleteProjectsLocationsProductsReferenceImagesResponse = Empty;
export const DeleteProjectsLocationsProductsReferenceImagesResponse = Empty;

export type DeleteProjectsLocationsProductsReferenceImagesError = CommonErrors;

export const deleteProjectsLocationsProductsReferenceImages: API.OperationMethod<DeleteProjectsLocationsProductsReferenceImagesRequest, DeleteProjectsLocationsProductsReferenceImagesResponse, DeleteProjectsLocationsProductsReferenceImagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsProductsReferenceImagesRequest,
  output: DeleteProjectsLocationsProductsReferenceImagesResponse,
  errors: [],
}));

/** Creates and returns a new ReferenceImage resource. The `bounding_poly` field is optional. If `bounding_poly` is not specified, the system will try to detect regions of interest in the image that are compatible with the product_category on the parent product. If it is specified, detection is ALWAYS skipped. The system converts polygons into non-rotated rectangles. Note that the pipeline will resize the image if the image resolution is too large to process (above 50MP). Possible errors: * Returns INVALID_ARGUMENT if the image_uri is missing or longer than 4096 characters. * Returns INVALID_ARGUMENT if the product does not exist. * Returns INVALID_ARGUMENT if bounding_poly is not provided, and nothing compatible with the parent product's product_category is detected. * Returns INVALID_ARGUMENT if bounding_poly contains more than 10 polygons. */
export interface CreateProjectsLocationsProductsReferenceImagesRequest {
  /** Required. Resource name of the product in which to create the reference image. Format is `projects/PROJECT_ID/locations/LOC_ID/products/PRODUCT_ID`. */
  parent: string;
  /** A user-supplied resource id for the ReferenceImage to be added. If set, the server will attempt to use this value as the resource id. If it is already in use, an error is returned with code ALREADY_EXISTS. Must be at most 128 characters long. It cannot contain the character `/`. */
  referenceImageId?: string;
  /** Request body */
  body?: ReferenceImage;
}

export const CreateProjectsLocationsProductsReferenceImagesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  referenceImageId: Schema.optional(Schema.String).pipe(T.HttpQuery("referenceImageId")),
  body: Schema.optional(ReferenceImage).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/products/{productsId}/referenceImages", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsProductsReferenceImagesRequest>;

export type CreateProjectsLocationsProductsReferenceImagesResponse = ReferenceImage;
export const CreateProjectsLocationsProductsReferenceImagesResponse = ReferenceImage;

export type CreateProjectsLocationsProductsReferenceImagesError = CommonErrors;

export const createProjectsLocationsProductsReferenceImages: API.OperationMethod<CreateProjectsLocationsProductsReferenceImagesRequest, CreateProjectsLocationsProductsReferenceImagesResponse, CreateProjectsLocationsProductsReferenceImagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsProductsReferenceImagesRequest,
  output: CreateProjectsLocationsProductsReferenceImagesResponse,
  errors: [],
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

export type GetProjectsLocationsOperationsResponse = Operation;
export const GetProjectsLocationsOperationsResponse = Operation;

export type GetProjectsLocationsOperationsError = CommonErrors;

export const getProjectsLocationsOperations: API.OperationMethod<GetProjectsLocationsOperationsRequest, GetProjectsLocationsOperationsResponse, GetProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsOperationsRequest,
  output: GetProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Run asynchronous image detection and annotation for a list of generic files, such as PDF files, which may contain multiple pages and multiple images per page. Progress and results can be retrieved through the `google.longrunning.Operations` interface. `Operation.metadata` contains `OperationMetadata` (metadata). `Operation.response` contains `AsyncBatchAnnotateFilesResponse` (results). */
export interface AsyncBatchAnnotateProjectsLocationsFilesRequest {
  /** Optional. Target project and location to make a call. Format: `projects/{project-id}/locations/{location-id}`. If no parent is specified, a region will be chosen automatically. Supported location-ids: `us`: USA country only, `asia`: East asia areas, like Japan, Taiwan, `eu`: The European Union. Example: `projects/project-A/locations/eu`. */
  parent: string;
  /** Request body */
  body?: AsyncBatchAnnotateFilesRequest;
}

export const AsyncBatchAnnotateProjectsLocationsFilesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(AsyncBatchAnnotateFilesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/files:asyncBatchAnnotate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AsyncBatchAnnotateProjectsLocationsFilesRequest>;

export type AsyncBatchAnnotateProjectsLocationsFilesResponse = Operation;
export const AsyncBatchAnnotateProjectsLocationsFilesResponse = Operation;

export type AsyncBatchAnnotateProjectsLocationsFilesError = CommonErrors;

export const asyncBatchAnnotateProjectsLocationsFiles: API.OperationMethod<AsyncBatchAnnotateProjectsLocationsFilesRequest, AsyncBatchAnnotateProjectsLocationsFilesResponse, AsyncBatchAnnotateProjectsLocationsFilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AsyncBatchAnnotateProjectsLocationsFilesRequest,
  output: AsyncBatchAnnotateProjectsLocationsFilesResponse,
  errors: [],
}));

/** Service that performs image detection and annotation for a batch of files. Now only "application/pdf", "image/tiff" and "image/gif" are supported. This service will extract at most 5 (customers can specify which 5 in AnnotateFileRequest.pages) frames (gif) or pages (pdf or tiff) from each file provided and perform detection and annotation for each image extracted. */
export interface AnnotateProjectsLocationsFilesRequest {
  /** Optional. Target project and location to make a call. Format: `projects/{project-id}/locations/{location-id}`. If no parent is specified, a region will be chosen automatically. Supported location-ids: `us`: USA country only, `asia`: East asia areas, like Japan, Taiwan, `eu`: The European Union. Example: `projects/project-A/locations/eu`. */
  parent: string;
  /** Request body */
  body?: BatchAnnotateFilesRequest;
}

export const AnnotateProjectsLocationsFilesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(BatchAnnotateFilesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/files:annotate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AnnotateProjectsLocationsFilesRequest>;

export type AnnotateProjectsLocationsFilesResponse = BatchAnnotateFilesResponse;
export const AnnotateProjectsLocationsFilesResponse = BatchAnnotateFilesResponse;

export type AnnotateProjectsLocationsFilesError = CommonErrors;

export const annotateProjectsLocationsFiles: API.OperationMethod<AnnotateProjectsLocationsFilesRequest, AnnotateProjectsLocationsFilesResponse, AnnotateProjectsLocationsFilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AnnotateProjectsLocationsFilesRequest,
  output: AnnotateProjectsLocationsFilesResponse,
  errors: [],
}));

/** Gets information associated with a ProductSet. Possible errors: * Returns NOT_FOUND if the ProductSet does not exist. */
export interface GetProjectsLocationsProductSetsRequest {
  /** Required. Resource name of the ProductSet to get. Format is: `projects/PROJECT_ID/locations/LOC_ID/productSets/PRODUCT_SET_ID` */
  name: string;
}

export const GetProjectsLocationsProductSetsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/productSets/{productSetsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsProductSetsRequest>;

export type GetProjectsLocationsProductSetsResponse = ProductSet;
export const GetProjectsLocationsProductSetsResponse = ProductSet;

export type GetProjectsLocationsProductSetsError = CommonErrors;

export const getProjectsLocationsProductSets: API.OperationMethod<GetProjectsLocationsProductSetsRequest, GetProjectsLocationsProductSetsResponse, GetProjectsLocationsProductSetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsProductSetsRequest,
  output: GetProjectsLocationsProductSetsResponse,
  errors: [],
}));

/** Permanently deletes a ProductSet. Products and ReferenceImages in the ProductSet are not deleted. The actual image files are not deleted from Google Cloud Storage. */
export interface DeleteProjectsLocationsProductSetsRequest {
  /** Required. Resource name of the ProductSet to delete. Format is: `projects/PROJECT_ID/locations/LOC_ID/productSets/PRODUCT_SET_ID` */
  name: string;
}

export const DeleteProjectsLocationsProductSetsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/productSets/{productSetsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsProductSetsRequest>;

export type DeleteProjectsLocationsProductSetsResponse = Empty;
export const DeleteProjectsLocationsProductSetsResponse = Empty;

export type DeleteProjectsLocationsProductSetsError = CommonErrors;

export const deleteProjectsLocationsProductSets: API.OperationMethod<DeleteProjectsLocationsProductSetsRequest, DeleteProjectsLocationsProductSetsResponse, DeleteProjectsLocationsProductSetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsProductSetsRequest,
  output: DeleteProjectsLocationsProductSetsResponse,
  errors: [],
}));

/** Asynchronous API that imports a list of reference images to specified product sets based on a list of image information. The google.longrunning.Operation API can be used to keep track of the progress and results of the request. `Operation.metadata` contains `BatchOperationMetadata`. (progress) `Operation.response` contains `ImportProductSetsResponse`. (results) The input source of this method is a csv file on Google Cloud Storage. For the format of the csv file please see ImportProductSetsGcsSource.csv_file_uri. */
export interface ImportProjectsLocationsProductSetsRequest {
  /** Required. The project in which the ProductSets should be imported. Format is `projects/PROJECT_ID/locations/LOC_ID`. */
  parent: string;
  /** Request body */
  body?: ImportProductSetsRequest;
}

export const ImportProjectsLocationsProductSetsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(ImportProductSetsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/productSets:import", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ImportProjectsLocationsProductSetsRequest>;

export type ImportProjectsLocationsProductSetsResponse = Operation;
export const ImportProjectsLocationsProductSetsResponse = Operation;

export type ImportProjectsLocationsProductSetsError = CommonErrors;

export const importProjectsLocationsProductSets: API.OperationMethod<ImportProjectsLocationsProductSetsRequest, ImportProjectsLocationsProductSetsResponse, ImportProjectsLocationsProductSetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ImportProjectsLocationsProductSetsRequest,
  output: ImportProjectsLocationsProductSetsResponse,
  errors: [],
}));

/** Makes changes to a ProductSet resource. Only display_name can be updated currently. Possible errors: * Returns NOT_FOUND if the ProductSet does not exist. * Returns INVALID_ARGUMENT if display_name is present in update_mask but missing from the request or longer than 4096 characters. */
export interface PatchProjectsLocationsProductSetsRequest {
  /** The resource name of the ProductSet. Format is: `projects/PROJECT_ID/locations/LOC_ID/productSets/PRODUCT_SET_ID`. This field is ignored when creating a ProductSet. */
  name: string;
  /** The FieldMask that specifies which fields to update. If update_mask isn't specified, all mutable fields are to be updated. Valid mask path is `display_name`. */
  updateMask?: string;
  /** Request body */
  body?: ProductSet;
}

export const PatchProjectsLocationsProductSetsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(ProductSet).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/productSets/{productSetsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsProductSetsRequest>;

export type PatchProjectsLocationsProductSetsResponse = ProductSet;
export const PatchProjectsLocationsProductSetsResponse = ProductSet;

export type PatchProjectsLocationsProductSetsError = CommonErrors;

export const patchProjectsLocationsProductSets: API.OperationMethod<PatchProjectsLocationsProductSetsRequest, PatchProjectsLocationsProductSetsResponse, PatchProjectsLocationsProductSetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsProductSetsRequest,
  output: PatchProjectsLocationsProductSetsResponse,
  errors: [],
}));

/** Creates and returns a new ProductSet resource. Possible errors: * Returns INVALID_ARGUMENT if display_name is missing, or is longer than 4096 characters. */
export interface CreateProjectsLocationsProductSetsRequest {
  /** A user-supplied resource id for this ProductSet. If set, the server will attempt to use this value as the resource id. If it is already in use, an error is returned with code ALREADY_EXISTS. Must be at most 128 characters long. It cannot contain the character `/`. */
  productSetId?: string;
  /** Required. The project in which the ProductSet should be created. Format is `projects/PROJECT_ID/locations/LOC_ID`. */
  parent: string;
  /** Request body */
  body?: ProductSet;
}

export const CreateProjectsLocationsProductSetsRequest = Schema.Struct({
  productSetId: Schema.optional(Schema.String).pipe(T.HttpQuery("productSetId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(ProductSet).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/productSets", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsProductSetsRequest>;

export type CreateProjectsLocationsProductSetsResponse = ProductSet;
export const CreateProjectsLocationsProductSetsResponse = ProductSet;

export type CreateProjectsLocationsProductSetsError = CommonErrors;

export const createProjectsLocationsProductSets: API.OperationMethod<CreateProjectsLocationsProductSetsRequest, CreateProjectsLocationsProductSetsResponse, CreateProjectsLocationsProductSetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsProductSetsRequest,
  output: CreateProjectsLocationsProductSetsResponse,
  errors: [],
}));

/** Removes a Product from the specified ProductSet. */
export interface RemoveProductProjectsLocationsProductSetsRequest {
  /** Required. The resource name for the ProductSet to modify. Format is: `projects/PROJECT_ID/locations/LOC_ID/productSets/PRODUCT_SET_ID` */
  name: string;
  /** Request body */
  body?: RemoveProductFromProductSetRequest;
}

export const RemoveProductProjectsLocationsProductSetsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RemoveProductFromProductSetRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/productSets/{productSetsId}:removeProduct", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RemoveProductProjectsLocationsProductSetsRequest>;

export type RemoveProductProjectsLocationsProductSetsResponse = Empty;
export const RemoveProductProjectsLocationsProductSetsResponse = Empty;

export type RemoveProductProjectsLocationsProductSetsError = CommonErrors;

export const removeProductProjectsLocationsProductSets: API.OperationMethod<RemoveProductProjectsLocationsProductSetsRequest, RemoveProductProjectsLocationsProductSetsResponse, RemoveProductProjectsLocationsProductSetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RemoveProductProjectsLocationsProductSetsRequest,
  output: RemoveProductProjectsLocationsProductSetsResponse,
  errors: [],
}));

/** Adds a Product to the specified ProductSet. If the Product is already present, no change is made. One Product can be added to at most 100 ProductSets. Possible errors: * Returns NOT_FOUND if the Product or the ProductSet doesn't exist. */
export interface AddProductProjectsLocationsProductSetsRequest {
  /** Required. The resource name for the ProductSet to modify. Format is: `projects/PROJECT_ID/locations/LOC_ID/productSets/PRODUCT_SET_ID` */
  name: string;
  /** Request body */
  body?: AddProductToProductSetRequest;
}

export const AddProductProjectsLocationsProductSetsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(AddProductToProductSetRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/productSets/{productSetsId}:addProduct", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AddProductProjectsLocationsProductSetsRequest>;

export type AddProductProjectsLocationsProductSetsResponse = Empty;
export const AddProductProjectsLocationsProductSetsResponse = Empty;

export type AddProductProjectsLocationsProductSetsError = CommonErrors;

export const addProductProjectsLocationsProductSets: API.OperationMethod<AddProductProjectsLocationsProductSetsRequest, AddProductProjectsLocationsProductSetsResponse, AddProductProjectsLocationsProductSetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AddProductProjectsLocationsProductSetsRequest,
  output: AddProductProjectsLocationsProductSetsResponse,
  errors: [],
}));

/** Lists ProductSets in an unspecified order. Possible errors: * Returns INVALID_ARGUMENT if page_size is greater than 100, or less than 1. */
export interface ListProjectsLocationsProductSetsRequest {
  /** The next_page_token returned from a previous List request, if any. */
  pageToken?: string;
  /** Required. The project from which ProductSets should be listed. Format is `projects/PROJECT_ID/locations/LOC_ID`. */
  parent: string;
  /** The maximum number of items to return. Default 10, maximum 100. */
  pageSize?: number;
}

export const ListProjectsLocationsProductSetsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/productSets" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsProductSetsRequest>;

export type ListProjectsLocationsProductSetsResponse = ListProductSetsResponse;
export const ListProjectsLocationsProductSetsResponse = ListProductSetsResponse;

export type ListProjectsLocationsProductSetsError = CommonErrors;

export const listProjectsLocationsProductSets = API.makePaginated(() => ({
  input: ListProjectsLocationsProductSetsRequest,
  output: ListProjectsLocationsProductSetsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists the Products in a ProductSet, in an unspecified order. If the ProductSet does not exist, the products field of the response will be empty. Possible errors: * Returns INVALID_ARGUMENT if page_size is greater than 100 or less than 1. */
export interface ListProjectsLocationsProductSetsProductsRequest {
  /** The next_page_token returned from a previous List request, if any. */
  pageToken?: string;
  /** Required. The ProductSet resource for which to retrieve Products. Format is: `projects/PROJECT_ID/locations/LOC_ID/productSets/PRODUCT_SET_ID` */
  name: string;
  /** The maximum number of items to return. Default 10, maximum 100. */
  pageSize?: number;
}

export const ListProjectsLocationsProductSetsProductsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  name: Schema.String.pipe(T.HttpPath("name")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/productSets/{productSetsId}/products" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsProductSetsProductsRequest>;

export type ListProjectsLocationsProductSetsProductsResponse = ListProductsInProductSetResponse;
export const ListProjectsLocationsProductSetsProductsResponse = ListProductsInProductSetResponse;

export type ListProjectsLocationsProductSetsProductsError = CommonErrors;

export const listProjectsLocationsProductSetsProducts = API.makePaginated(() => ({
  input: ListProjectsLocationsProductSetsProductsRequest,
  output: ListProjectsLocationsProductSetsProductsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

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

export type GetProjectsOperationsResponse = Operation;
export const GetProjectsOperationsResponse = Operation;

export type GetProjectsOperationsError = CommonErrors;

export const getProjectsOperations: API.OperationMethod<GetProjectsOperationsRequest, GetProjectsOperationsResponse, GetProjectsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsOperationsRequest,
  output: GetProjectsOperationsResponse,
  errors: [],
}));

/** Run image detection and annotation for a batch of images. */
export interface AnnotateProjectsImagesRequest {
  /** Optional. Target project and location to make a call. Format: `projects/{project-id}/locations/{location-id}`. If no parent is specified, a region will be chosen automatically. Supported location-ids: `us`: USA country only, `asia`: East asia areas, like Japan, Taiwan, `eu`: The European Union. Example: `projects/project-A/locations/eu`. */
  parent: string;
  /** Request body */
  body?: BatchAnnotateImagesRequest;
}

export const AnnotateProjectsImagesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(BatchAnnotateImagesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/images:annotate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AnnotateProjectsImagesRequest>;

export type AnnotateProjectsImagesResponse = BatchAnnotateImagesResponse;
export const AnnotateProjectsImagesResponse = BatchAnnotateImagesResponse;

export type AnnotateProjectsImagesError = CommonErrors;

export const annotateProjectsImages: API.OperationMethod<AnnotateProjectsImagesRequest, AnnotateProjectsImagesResponse, AnnotateProjectsImagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AnnotateProjectsImagesRequest,
  output: AnnotateProjectsImagesResponse,
  errors: [],
}));

/** Run asynchronous image detection and annotation for a list of images. Progress and results can be retrieved through the `google.longrunning.Operations` interface. `Operation.metadata` contains `OperationMetadata` (metadata). `Operation.response` contains `AsyncBatchAnnotateImagesResponse` (results). This service will write image annotation outputs to json files in customer GCS bucket, each json file containing BatchAnnotateImagesResponse proto. */
export interface AsyncBatchAnnotateProjectsImagesRequest {
  /** Optional. Target project and location to make a call. Format: `projects/{project-id}/locations/{location-id}`. If no parent is specified, a region will be chosen automatically. Supported location-ids: `us`: USA country only, `asia`: East asia areas, like Japan, Taiwan, `eu`: The European Union. Example: `projects/project-A/locations/eu`. */
  parent: string;
  /** Request body */
  body?: AsyncBatchAnnotateImagesRequest;
}

export const AsyncBatchAnnotateProjectsImagesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(AsyncBatchAnnotateImagesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/images:asyncBatchAnnotate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AsyncBatchAnnotateProjectsImagesRequest>;

export type AsyncBatchAnnotateProjectsImagesResponse = Operation;
export const AsyncBatchAnnotateProjectsImagesResponse = Operation;

export type AsyncBatchAnnotateProjectsImagesError = CommonErrors;

export const asyncBatchAnnotateProjectsImages: API.OperationMethod<AsyncBatchAnnotateProjectsImagesRequest, AsyncBatchAnnotateProjectsImagesResponse, AsyncBatchAnnotateProjectsImagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AsyncBatchAnnotateProjectsImagesRequest,
  output: AsyncBatchAnnotateProjectsImagesResponse,
  errors: [],
}));

/** Run asynchronous image detection and annotation for a list of generic files, such as PDF files, which may contain multiple pages and multiple images per page. Progress and results can be retrieved through the `google.longrunning.Operations` interface. `Operation.metadata` contains `OperationMetadata` (metadata). `Operation.response` contains `AsyncBatchAnnotateFilesResponse` (results). */
export interface AsyncBatchAnnotateProjectsFilesRequest {
  /** Optional. Target project and location to make a call. Format: `projects/{project-id}/locations/{location-id}`. If no parent is specified, a region will be chosen automatically. Supported location-ids: `us`: USA country only, `asia`: East asia areas, like Japan, Taiwan, `eu`: The European Union. Example: `projects/project-A/locations/eu`. */
  parent: string;
  /** Request body */
  body?: AsyncBatchAnnotateFilesRequest;
}

export const AsyncBatchAnnotateProjectsFilesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(AsyncBatchAnnotateFilesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/files:asyncBatchAnnotate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AsyncBatchAnnotateProjectsFilesRequest>;

export type AsyncBatchAnnotateProjectsFilesResponse = Operation;
export const AsyncBatchAnnotateProjectsFilesResponse = Operation;

export type AsyncBatchAnnotateProjectsFilesError = CommonErrors;

export const asyncBatchAnnotateProjectsFiles: API.OperationMethod<AsyncBatchAnnotateProjectsFilesRequest, AsyncBatchAnnotateProjectsFilesResponse, AsyncBatchAnnotateProjectsFilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AsyncBatchAnnotateProjectsFilesRequest,
  output: AsyncBatchAnnotateProjectsFilesResponse,
  errors: [],
}));

/** Service that performs image detection and annotation for a batch of files. Now only "application/pdf", "image/tiff" and "image/gif" are supported. This service will extract at most 5 (customers can specify which 5 in AnnotateFileRequest.pages) frames (gif) or pages (pdf or tiff) from each file provided and perform detection and annotation for each image extracted. */
export interface AnnotateProjectsFilesRequest {
  /** Optional. Target project and location to make a call. Format: `projects/{project-id}/locations/{location-id}`. If no parent is specified, a region will be chosen automatically. Supported location-ids: `us`: USA country only, `asia`: East asia areas, like Japan, Taiwan, `eu`: The European Union. Example: `projects/project-A/locations/eu`. */
  parent: string;
  /** Request body */
  body?: BatchAnnotateFilesRequest;
}

export const AnnotateProjectsFilesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(BatchAnnotateFilesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/files:annotate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AnnotateProjectsFilesRequest>;

export type AnnotateProjectsFilesResponse = BatchAnnotateFilesResponse;
export const AnnotateProjectsFilesResponse = BatchAnnotateFilesResponse;

export type AnnotateProjectsFilesError = CommonErrors;

export const annotateProjectsFiles: API.OperationMethod<AnnotateProjectsFilesRequest, AnnotateProjectsFilesResponse, AnnotateProjectsFilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AnnotateProjectsFilesRequest,
  output: AnnotateProjectsFilesResponse,
  errors: [],
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetLocationsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetLocationsOperationsRequest>;

export type GetLocationsOperationsResponse = Operation;
export const GetLocationsOperationsResponse = Operation;

export type GetLocationsOperationsError = CommonErrors;

export const getLocationsOperations: API.OperationMethod<GetLocationsOperationsRequest, GetLocationsOperationsResponse, GetLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetLocationsOperationsRequest,
  output: GetLocationsOperationsResponse,
  errors: [],
}));

/** Run asynchronous image detection and annotation for a list of images. Progress and results can be retrieved through the `google.longrunning.Operations` interface. `Operation.metadata` contains `OperationMetadata` (metadata). `Operation.response` contains `AsyncBatchAnnotateImagesResponse` (results). This service will write image annotation outputs to json files in customer GCS bucket, each json file containing BatchAnnotateImagesResponse proto. */
export interface AsyncBatchAnnotateImagesRequest_Op {
  /** Request body */
  body?: AsyncBatchAnnotateImagesRequest;
}

export const AsyncBatchAnnotateImagesRequest_Op = Schema.Struct({
  body: Schema.optional(AsyncBatchAnnotateImagesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/images:asyncBatchAnnotate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AsyncBatchAnnotateImagesRequest_Op>;

export type AsyncBatchAnnotateImagesResponse_Op = Operation;
export const AsyncBatchAnnotateImagesResponse_Op = Operation;

export type AsyncBatchAnnotateImagesError = CommonErrors;

export const asyncBatchAnnotateImages: API.OperationMethod<AsyncBatchAnnotateImagesRequest_Op, AsyncBatchAnnotateImagesResponse_Op, AsyncBatchAnnotateImagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AsyncBatchAnnotateImagesRequest_Op,
  output: AsyncBatchAnnotateImagesResponse_Op,
  errors: [],
}));

/** Run image detection and annotation for a batch of images. */
export interface AnnotateImagesRequest {
  /** Request body */
  body?: BatchAnnotateImagesRequest;
}

export const AnnotateImagesRequest = Schema.Struct({
  body: Schema.optional(BatchAnnotateImagesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/images:annotate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AnnotateImagesRequest>;

export type AnnotateImagesResponse = BatchAnnotateImagesResponse;
export const AnnotateImagesResponse = BatchAnnotateImagesResponse;

export type AnnotateImagesError = CommonErrors;

export const annotateImages: API.OperationMethod<AnnotateImagesRequest, AnnotateImagesResponse, AnnotateImagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AnnotateImagesRequest,
  output: AnnotateImagesResponse,
  errors: [],
}));

/** Service that performs image detection and annotation for a batch of files. Now only "application/pdf", "image/tiff" and "image/gif" are supported. This service will extract at most 5 (customers can specify which 5 in AnnotateFileRequest.pages) frames (gif) or pages (pdf or tiff) from each file provided and perform detection and annotation for each image extracted. */
export interface AnnotateFilesRequest {
  /** Request body */
  body?: BatchAnnotateFilesRequest;
}

export const AnnotateFilesRequest = Schema.Struct({
  body: Schema.optional(BatchAnnotateFilesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/files:annotate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AnnotateFilesRequest>;

export type AnnotateFilesResponse = BatchAnnotateFilesResponse;
export const AnnotateFilesResponse = BatchAnnotateFilesResponse;

export type AnnotateFilesError = CommonErrors;

export const annotateFiles: API.OperationMethod<AnnotateFilesRequest, AnnotateFilesResponse, AnnotateFilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AnnotateFilesRequest,
  output: AnnotateFilesResponse,
  errors: [],
}));

/** Run asynchronous image detection and annotation for a list of generic files, such as PDF files, which may contain multiple pages and multiple images per page. Progress and results can be retrieved through the `google.longrunning.Operations` interface. `Operation.metadata` contains `OperationMetadata` (metadata). `Operation.response` contains `AsyncBatchAnnotateFilesResponse` (results). */
export interface AsyncBatchAnnotateFilesRequest_Op {
  /** Request body */
  body?: AsyncBatchAnnotateFilesRequest;
}

export const AsyncBatchAnnotateFilesRequest_Op = Schema.Struct({
  body: Schema.optional(AsyncBatchAnnotateFilesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/files:asyncBatchAnnotate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AsyncBatchAnnotateFilesRequest_Op>;

export type AsyncBatchAnnotateFilesResponse_Op = Operation;
export const AsyncBatchAnnotateFilesResponse_Op = Operation;

export type AsyncBatchAnnotateFilesError = CommonErrors;

export const asyncBatchAnnotateFiles: API.OperationMethod<AsyncBatchAnnotateFilesRequest_Op, AsyncBatchAnnotateFilesResponse_Op, AsyncBatchAnnotateFilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AsyncBatchAnnotateFilesRequest_Op,
  output: AsyncBatchAnnotateFilesResponse_Op,
  errors: [],
}));

