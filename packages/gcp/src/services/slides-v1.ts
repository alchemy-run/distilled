// ==========================================================================
// Google Slides API (slides v1)
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
  name: "slides",
  version: "v1",
  rootUrl: "https://slides.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Link {
  /** If set, indicates this is a link to the external web page at this URL. */
  url?: string;
  /** If set, indicates this is a link to the slide at this zero-based index in the presentation. There may not be a slide at this index. */
  slideIndex?: number;
  /** If set, indicates this is a link to a slide in this presentation, addressed by its position. */
  relativeLink?:
    | "RELATIVE_SLIDE_LINK_UNSPECIFIED"
    | "NEXT_SLIDE"
    | "PREVIOUS_SLIDE"
    | "FIRST_SLIDE"
    | "LAST_SLIDE"
    | (string & {});
  /** If set, indicates this is a link to the specific page in this presentation with this ID. A page with this ID may not exist. */
  pageObjectId?: string;
}

export const Link: Schema.Schema<Link> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      url: Schema.optional(Schema.String),
      slideIndex: Schema.optional(Schema.Number),
      relativeLink: Schema.optional(Schema.String),
      pageObjectId: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Link" }) as any as Schema.Schema<Link>;

export interface RgbColor {
  /** The blue component of the color, from 0.0 to 1.0. */
  blue?: number;
  /** The red component of the color, from 0.0 to 1.0. */
  red?: number;
  /** The green component of the color, from 0.0 to 1.0. */
  green?: number;
}

export const RgbColor: Schema.Schema<RgbColor> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      blue: Schema.optional(Schema.Number),
      red: Schema.optional(Schema.Number),
      green: Schema.optional(Schema.Number),
    }),
  ).annotate({ identifier: "RgbColor" }) as any as Schema.Schema<RgbColor>;

export interface OpaqueColor {
  /** An opaque RGB color. */
  rgbColor?: RgbColor;
  /** An opaque theme color. */
  themeColor?:
    | "THEME_COLOR_TYPE_UNSPECIFIED"
    | "DARK1"
    | "LIGHT1"
    | "DARK2"
    | "LIGHT2"
    | "ACCENT1"
    | "ACCENT2"
    | "ACCENT3"
    | "ACCENT4"
    | "ACCENT5"
    | "ACCENT6"
    | "HYPERLINK"
    | "FOLLOWED_HYPERLINK"
    | "TEXT1"
    | "BACKGROUND1"
    | "TEXT2"
    | "BACKGROUND2"
    | (string & {});
}

export const OpaqueColor: Schema.Schema<OpaqueColor> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      rgbColor: Schema.optional(RgbColor),
      themeColor: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OpaqueColor",
  }) as any as Schema.Schema<OpaqueColor>;

export interface ColorStop {
  /** The color of the gradient stop. */
  color?: OpaqueColor;
  /** The alpha value of this color in the gradient band. Defaults to 1.0, fully opaque. */
  alpha?: number;
  /** The relative position of the color stop in the gradient band measured in percentage. The value should be in the interval [0.0, 1.0]. */
  position?: number;
}

export const ColorStop: Schema.Schema<ColorStop> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      color: Schema.optional(OpaqueColor),
      alpha: Schema.optional(Schema.Number),
      position: Schema.optional(Schema.Number),
    }),
  ).annotate({ identifier: "ColorStop" }) as any as Schema.Schema<ColorStop>;

export interface Recolor {
  /** The name of the recolor effect. The name is determined from the `recolor_stops` by matching the gradient against the colors in the page's current color scheme. This property is read-only. */
  name?:
    | "NONE"
    | "LIGHT1"
    | "LIGHT2"
    | "LIGHT3"
    | "LIGHT4"
    | "LIGHT5"
    | "LIGHT6"
    | "LIGHT7"
    | "LIGHT8"
    | "LIGHT9"
    | "LIGHT10"
    | "DARK1"
    | "DARK2"
    | "DARK3"
    | "DARK4"
    | "DARK5"
    | "DARK6"
    | "DARK7"
    | "DARK8"
    | "DARK9"
    | "DARK10"
    | "GRAYSCALE"
    | "NEGATIVE"
    | "SEPIA"
    | "CUSTOM"
    | (string & {});
  /** The recolor effect is represented by a gradient, which is a list of color stops. The colors in the gradient will replace the corresponding colors at the same position in the color palette and apply to the image. This property is read-only. */
  recolorStops?: Array<ColorStop>;
}

export const Recolor: Schema.Schema<Recolor> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      recolorStops: Schema.optional(Schema.Array(ColorStop)),
    }),
  ).annotate({ identifier: "Recolor" }) as any as Schema.Schema<Recolor>;

export interface Dimension {
  /** The magnitude. */
  magnitude?: number;
  /** The units for magnitude. */
  unit?: "UNIT_UNSPECIFIED" | "EMU" | "PT" | (string & {});
}

export const Dimension: Schema.Schema<Dimension> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      magnitude: Schema.optional(Schema.Number),
      unit: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Dimension" }) as any as Schema.Schema<Dimension>;

export interface SolidFill {
  /** The color value of the solid fill. */
  color?: OpaqueColor;
  /** The fraction of this `color` that should be applied to the pixel. That is, the final pixel color is defined by the equation: pixel color = alpha * (color) + (1.0 - alpha) * (background color) This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. */
  alpha?: number;
}

export const SolidFill: Schema.Schema<SolidFill> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      color: Schema.optional(OpaqueColor),
      alpha: Schema.optional(Schema.Number),
    }),
  ).annotate({ identifier: "SolidFill" }) as any as Schema.Schema<SolidFill>;

export interface OutlineFill {
  /** Solid color fill. */
  solidFill?: SolidFill;
}

export const OutlineFill: Schema.Schema<OutlineFill> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      solidFill: Schema.optional(SolidFill),
    }),
  ).annotate({
    identifier: "OutlineFill",
  }) as any as Schema.Schema<OutlineFill>;

export interface Outline {
  /** The thickness of the outline. */
  weight?: Dimension;
  /** The fill of the outline. */
  outlineFill?: OutlineFill;
  /** The dash style of the outline. */
  dashStyle?:
    | "DASH_STYLE_UNSPECIFIED"
    | "SOLID"
    | "DOT"
    | "DASH"
    | "DASH_DOT"
    | "LONG_DASH"
    | "LONG_DASH_DOT"
    | (string & {});
  /** The outline property state. Updating the outline on a page element will implicitly update this field to `RENDERED`, unless another value is specified in the same request. To have no outline on a page element, set this field to `NOT_RENDERED`. In this case, any other outline fields set in the same request will be ignored. */
  propertyState?: "RENDERED" | "NOT_RENDERED" | "INHERIT" | (string & {});
}

export const Outline: Schema.Schema<Outline> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      weight: Schema.optional(Dimension),
      outlineFill: Schema.optional(OutlineFill),
      dashStyle: Schema.optional(Schema.String),
      propertyState: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Outline" }) as any as Schema.Schema<Outline>;

export interface CropProperties {
  /** The rotation angle of the crop window around its center, in radians. Rotation angle is applied after the offset. */
  angle?: number;
  /** The offset specifies the top edge of the crop rectangle that is located below the original bounding rectangle top edge, relative to the object's original height. */
  topOffset?: number;
  /** The offset specifies the bottom edge of the crop rectangle that is located above the original bounding rectangle bottom edge, relative to the object's original height. */
  bottomOffset?: number;
  /** The offset specifies the right edge of the crop rectangle that is located to the left of the original bounding rectangle right edge, relative to the object's original width. */
  rightOffset?: number;
  /** The offset specifies the left edge of the crop rectangle that is located to the right of the original bounding rectangle left edge, relative to the object's original width. */
  leftOffset?: number;
}

export const CropProperties: Schema.Schema<CropProperties> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      angle: Schema.optional(Schema.Number),
      topOffset: Schema.optional(Schema.Number),
      bottomOffset: Schema.optional(Schema.Number),
      rightOffset: Schema.optional(Schema.Number),
      leftOffset: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "CropProperties",
  }) as any as Schema.Schema<CropProperties>;

export interface AffineTransform {
  /** The X coordinate scaling element. */
  scaleX?: number;
  /** The Y coordinate translation element. */
  translateY?: number;
  /** The Y coordinate scaling element. */
  scaleY?: number;
  /** The X coordinate shearing element. */
  shearX?: number;
  /** The X coordinate translation element. */
  translateX?: number;
  /** The units for translate elements. */
  unit?: "UNIT_UNSPECIFIED" | "EMU" | "PT" | (string & {});
  /** The Y coordinate shearing element. */
  shearY?: number;
}

export const AffineTransform: Schema.Schema<AffineTransform> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      scaleX: Schema.optional(Schema.Number),
      translateY: Schema.optional(Schema.Number),
      scaleY: Schema.optional(Schema.Number),
      shearX: Schema.optional(Schema.Number),
      translateX: Schema.optional(Schema.Number),
      unit: Schema.optional(Schema.String),
      shearY: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "AffineTransform",
  }) as any as Schema.Schema<AffineTransform>;

export interface Shadow {
  /** The alpha of the shadow's color, from 0.0 to 1.0. */
  alpha?: number;
  /** Whether the shadow should rotate with the shape. This property is read-only. */
  rotateWithShape?: boolean;
  /** The radius of the shadow blur. The larger the radius, the more diffuse the shadow becomes. */
  blurRadius?: Dimension;
  /** Transform that encodes the translate, scale, and skew of the shadow, relative to the alignment position. */
  transform?: AffineTransform;
  /** The shadow color value. */
  color?: OpaqueColor;
  /** The shadow property state. Updating the shadow on a page element will implicitly update this field to `RENDERED`, unless another value is specified in the same request. To have no shadow on a page element, set this field to `NOT_RENDERED`. In this case, any other shadow fields set in the same request will be ignored. */
  propertyState?: "RENDERED" | "NOT_RENDERED" | "INHERIT" | (string & {});
  /** The type of the shadow. This property is read-only. */
  type?: "SHADOW_TYPE_UNSPECIFIED" | "OUTER" | (string & {});
  /** The alignment point of the shadow, that sets the origin for translate, scale and skew of the shadow. This property is read-only. */
  alignment?:
    | "RECTANGLE_POSITION_UNSPECIFIED"
    | "TOP_LEFT"
    | "TOP_CENTER"
    | "TOP_RIGHT"
    | "LEFT_CENTER"
    | "CENTER"
    | "RIGHT_CENTER"
    | "BOTTOM_LEFT"
    | "BOTTOM_CENTER"
    | "BOTTOM_RIGHT"
    | (string & {});
}

export const Shadow: Schema.Schema<Shadow> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      alpha: Schema.optional(Schema.Number),
      rotateWithShape: Schema.optional(Schema.Boolean),
      blurRadius: Schema.optional(Dimension),
      transform: Schema.optional(AffineTransform),
      color: Schema.optional(OpaqueColor),
      propertyState: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
      alignment: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Shadow" }) as any as Schema.Schema<Shadow>;

export interface ImageProperties {
  /** The contrast effect of the image. The value should be in the interval [-1.0, 1.0], where 0 means no effect. This property is read-only. */
  contrast?: number;
  /** The brightness effect of the image. The value should be in the interval [-1.0, 1.0], where 0 means no effect. This property is read-only. */
  brightness?: number;
  /** The hyperlink destination of the image. If unset, there is no link. */
  link?: Link;
  /** The transparency effect of the image. The value should be in the interval [0.0, 1.0], where 0 means no effect and 1 means completely transparent. This property is read-only. */
  transparency?: number;
  /** The recolor effect of the image. If not set, the image is not recolored. This property is read-only. */
  recolor?: Recolor;
  /** The outline of the image. If not set, the image has no outline. */
  outline?: Outline;
  /** The crop properties of the image. If not set, the image is not cropped. This property is read-only. */
  cropProperties?: CropProperties;
  /** The shadow of the image. If not set, the image has no shadow. This property is read-only. */
  shadow?: Shadow;
}

export const ImageProperties: Schema.Schema<ImageProperties> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      contrast: Schema.optional(Schema.Number),
      brightness: Schema.optional(Schema.Number),
      link: Schema.optional(Link),
      transparency: Schema.optional(Schema.Number),
      recolor: Schema.optional(Recolor),
      outline: Schema.optional(Outline),
      cropProperties: Schema.optional(CropProperties),
      shadow: Schema.optional(Shadow),
    }),
  ).annotate({
    identifier: "ImageProperties",
  }) as any as Schema.Schema<ImageProperties>;

export interface Placeholder {
  /** The object ID of this shape's parent placeholder. If unset, the parent placeholder shape does not exist, so the shape does not inherit properties from any other shape. */
  parentObjectId?: string;
  /** The type of the placeholder. */
  type?:
    | "NONE"
    | "BODY"
    | "CHART"
    | "CLIP_ART"
    | "CENTERED_TITLE"
    | "DIAGRAM"
    | "DATE_AND_TIME"
    | "FOOTER"
    | "HEADER"
    | "MEDIA"
    | "OBJECT"
    | "PICTURE"
    | "SLIDE_NUMBER"
    | "SUBTITLE"
    | "TABLE"
    | "TITLE"
    | "SLIDE_IMAGE"
    | (string & {});
  /** The index of the placeholder. If the same placeholder types are present in the same page, they would have different index values. */
  index?: number;
}

export const Placeholder: Schema.Schema<Placeholder> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      parentObjectId: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
      index: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "Placeholder",
  }) as any as Schema.Schema<Placeholder>;

export interface Image {
  /** The properties of the image. */
  imageProperties?: ImageProperties;
  /** The source URL is the URL used to insert the image. The source URL can be empty. */
  sourceUrl?: string;
  /** An URL to an image with a default lifetime of 30 minutes. This URL is tagged with the account of the requester. Anyone with the URL effectively accesses the image as the original requester. Access to the image may be lost if the presentation's sharing settings change. */
  contentUrl?: string;
  /** Placeholders are page elements that inherit from corresponding placeholders on layouts and masters. If set, the image is a placeholder image and any inherited properties can be resolved by looking at the parent placeholder identified by the Placeholder.parent_object_id field. */
  placeholder?: Placeholder;
}

export const Image: Schema.Schema<Image> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      imageProperties: Schema.optional(ImageProperties),
      sourceUrl: Schema.optional(Schema.String),
      contentUrl: Schema.optional(Schema.String),
      placeholder: Schema.optional(Placeholder),
    }),
  ).annotate({ identifier: "Image" }) as any as Schema.Schema<Image>;

export interface Size {
  /** The width of the object. */
  width?: Dimension;
  /** The height of the object. */
  height?: Dimension;
}

export const Size: Schema.Schema<Size> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      width: Schema.optional(Dimension),
      height: Schema.optional(Dimension),
    }),
  ).annotate({ identifier: "Size" }) as any as Schema.Schema<Size>;

export interface PageElementProperties {
  /** The transform for the element. */
  transform?: AffineTransform;
  /** The object ID of the page where the element is located. */
  pageObjectId?: string;
  /** The size of the element. */
  size?: Size;
}

export const PageElementProperties: Schema.Schema<PageElementProperties> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      transform: Schema.optional(AffineTransform),
      pageObjectId: Schema.optional(Schema.String),
      size: Schema.optional(Size),
    }),
  ).annotate({
    identifier: "PageElementProperties",
  }) as any as Schema.Schema<PageElementProperties>;

export interface CreateImageRequest {
  /** A user-supplied object ID. If you specify an ID, it must be unique among all pages and page elements in the presentation. The ID must start with an alphanumeric character or an underscore (matches regex `[a-zA-Z0-9_]`); remaining characters may include those as well as a hyphen or colon (matches regex `[a-zA-Z0-9_-:]`). The length of the ID must not be less than 5 or greater than 50. If you don't specify an ID, a unique one is generated. */
  objectId?: string;
  /** The image URL. The image is fetched once at insertion time and a copy is stored for display inside the presentation. Images must be less than 50 MB in size, can't exceed 25 megapixels, and must be in one of PNG, JPEG, or GIF formats. The provided URL must be publicly accessible and up to 2 KB in length. The URL is saved with the image, and exposed through the Image.source_url field. */
  url?: string;
  /** The element properties for the image. When the aspect ratio of the provided size does not match the image aspect ratio, the image is scaled and centered with respect to the size in order to maintain the aspect ratio. The provided transform is applied after this operation. The PageElementProperties.size property is optional. If you don't specify the size, the default size of the image is used. The PageElementProperties.transform property is optional. If you don't specify a transform, the image will be placed at the top-left corner of the page. */
  elementProperties?: PageElementProperties;
}

export const CreateImageRequest: Schema.Schema<CreateImageRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      objectId: Schema.optional(Schema.String),
      url: Schema.optional(Schema.String),
      elementProperties: Schema.optional(PageElementProperties),
    }),
  ).annotate({
    identifier: "CreateImageRequest",
  }) as any as Schema.Schema<CreateImageRequest>;

export interface Autofit {
  /** The font scale applied to the shape. For shapes with autofit_type NONE or SHAPE_AUTOFIT, this value is the default value of 1. For TEXT_AUTOFIT, this value multiplied by the font_size gives the font size that's rendered in the editor. This property is read-only. */
  fontScale?: number;
  /** The autofit type of the shape. If the autofit type is AUTOFIT_TYPE_UNSPECIFIED, the autofit type is inherited from a parent placeholder if it exists. The field is automatically set to NONE if a request is made that might affect text fitting within its bounding text box. In this case, the font_scale is applied to the font_size and the line_spacing_reduction is applied to the line_spacing. Both properties are also reset to default values. */
  autofitType?:
    | "AUTOFIT_TYPE_UNSPECIFIED"
    | "NONE"
    | "TEXT_AUTOFIT"
    | "SHAPE_AUTOFIT"
    | (string & {});
  /** The line spacing reduction applied to the shape. For shapes with autofit_type NONE or SHAPE_AUTOFIT, this value is the default value of 0. For TEXT_AUTOFIT, this value subtracted from the line_spacing gives the line spacing that's rendered in the editor. This property is read-only. */
  lineSpacingReduction?: number;
}

export const Autofit: Schema.Schema<Autofit> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      fontScale: Schema.optional(Schema.Number),
      autofitType: Schema.optional(Schema.String),
      lineSpacingReduction: Schema.optional(Schema.Number),
    }),
  ).annotate({ identifier: "Autofit" }) as any as Schema.Schema<Autofit>;

export interface ShapeBackgroundFill {
  /** The background fill property state. Updating the fill on a shape will implicitly update this field to `RENDERED`, unless another value is specified in the same request. To have no fill on a shape, set this field to `NOT_RENDERED`. In this case, any other fill fields set in the same request will be ignored. */
  propertyState?: "RENDERED" | "NOT_RENDERED" | "INHERIT" | (string & {});
  /** Solid color fill. */
  solidFill?: SolidFill;
}

export const ShapeBackgroundFill: Schema.Schema<ShapeBackgroundFill> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      propertyState: Schema.optional(Schema.String),
      solidFill: Schema.optional(SolidFill),
    }),
  ).annotate({
    identifier: "ShapeBackgroundFill",
  }) as any as Schema.Schema<ShapeBackgroundFill>;

export interface ShapeProperties {
  /** The hyperlink destination of the shape. If unset, there is no link. Links are not inherited from parent placeholders. */
  link?: Link;
  /** The alignment of the content in the shape. If unspecified, the alignment is inherited from a parent placeholder if it exists. If the shape has no parent, the default alignment matches the alignment for new shapes created in the Slides editor. */
  contentAlignment?:
    | "CONTENT_ALIGNMENT_UNSPECIFIED"
    | "CONTENT_ALIGNMENT_UNSUPPORTED"
    | "TOP"
    | "MIDDLE"
    | "BOTTOM"
    | (string & {});
  /** The outline of the shape. If unset, the outline is inherited from a parent placeholder if it exists. If the shape has no parent, then the default outline depends on the shape type, matching the defaults for new shapes created in the Slides editor. */
  outline?: Outline;
  /** The autofit properties of the shape. This property is only set for shapes that allow text. */
  autofit?: Autofit;
  /** The background fill of the shape. If unset, the background fill is inherited from a parent placeholder if it exists. If the shape has no parent, then the default background fill depends on the shape type, matching the defaults for new shapes created in the Slides editor. */
  shapeBackgroundFill?: ShapeBackgroundFill;
  /** The shadow properties of the shape. If unset, the shadow is inherited from a parent placeholder if it exists. If the shape has no parent, then the default shadow matches the defaults for new shapes created in the Slides editor. This property is read-only. */
  shadow?: Shadow;
}

export const ShapeProperties: Schema.Schema<ShapeProperties> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      link: Schema.optional(Link),
      contentAlignment: Schema.optional(Schema.String),
      outline: Schema.optional(Outline),
      autofit: Schema.optional(Autofit),
      shapeBackgroundFill: Schema.optional(ShapeBackgroundFill),
      shadow: Schema.optional(Shadow),
    }),
  ).annotate({
    identifier: "ShapeProperties",
  }) as any as Schema.Schema<ShapeProperties>;

export interface UpdateShapePropertiesRequest {
  /** The object ID of the shape the updates are applied to. */
  objectId?: string;
  /** The shape properties to update. */
  shapeProperties?: ShapeProperties;
  /** The fields that should be updated. At least one field must be specified. The root `shapeProperties` is implied and should not be specified. A single `"*"` can be used as short-hand for listing every field. For example to update the shape background solid fill color, set `fields` to `"shapeBackgroundFill.solidFill.color"`. To reset a property to its default value, include its field name in the field mask but leave the field itself unset. */
  fields?: string;
}

export const UpdateShapePropertiesRequest: Schema.Schema<UpdateShapePropertiesRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      objectId: Schema.optional(Schema.String),
      shapeProperties: Schema.optional(ShapeProperties),
      fields: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UpdateShapePropertiesRequest",
  }) as any as Schema.Schema<UpdateShapePropertiesRequest>;

export interface TableCellLocation {
  /** The 0-based row index. */
  rowIndex?: number;
  /** The 0-based column index. */
  columnIndex?: number;
}

export const TableCellLocation: Schema.Schema<TableCellLocation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      rowIndex: Schema.optional(Schema.Number),
      columnIndex: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "TableCellLocation",
  }) as any as Schema.Schema<TableCellLocation>;

export interface InsertTableRowsRequest {
  /** The table to insert rows into. */
  tableObjectId?: string;
  /** The reference table cell location from which rows will be inserted. A new row will be inserted above (or below) the row where the reference cell is. If the reference cell is a merged cell, a new row will be inserted above (or below) the merged cell. */
  cellLocation?: TableCellLocation;
  /** Whether to insert new rows below the reference cell location. - `True`: insert below the cell. - `False`: insert above the cell. */
  insertBelow?: boolean;
  /** The number of rows to be inserted. Maximum 20 per request. */
  number?: number;
}

export const InsertTableRowsRequest: Schema.Schema<InsertTableRowsRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      tableObjectId: Schema.optional(Schema.String),
      cellLocation: Schema.optional(TableCellLocation),
      insertBelow: Schema.optional(Schema.Boolean),
      number: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "InsertTableRowsRequest",
  }) as any as Schema.Schema<InsertTableRowsRequest>;

export interface TableRange {
  /** The starting location of the table range. */
  location?: TableCellLocation;
  /** The column span of the table range. */
  columnSpan?: number;
  /** The row span of the table range. */
  rowSpan?: number;
}

export const TableRange: Schema.Schema<TableRange> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      location: Schema.optional(TableCellLocation),
      columnSpan: Schema.optional(Schema.Number),
      rowSpan: Schema.optional(Schema.Number),
    }),
  ).annotate({ identifier: "TableRange" }) as any as Schema.Schema<TableRange>;

export interface UnmergeTableCellsRequest {
  /** The table range specifying which cells of the table to unmerge. All merged cells in this range will be unmerged, and cells that are already unmerged will not be affected. If the range has no merged cells, the request will do nothing. If there is text in any of the merged cells, the text will remain in the upper-left ("head") cell of the resulting block of unmerged cells. */
  tableRange?: TableRange;
  /** The object ID of the table. */
  objectId?: string;
}

export const UnmergeTableCellsRequest: Schema.Schema<UnmergeTableCellsRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      tableRange: Schema.optional(TableRange),
      objectId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UnmergeTableCellsRequest",
  }) as any as Schema.Schema<UnmergeTableCellsRequest>;

export interface SubstringMatchCriteria {
  /** The text to search for in the shape or table. */
  text?: string;
  /** Optional. True if the find value should be treated as a regular expression. Any backslashes in the pattern should be escaped. - `True`: the search text is treated as a regular expressions. - `False`: the search text is treated as a substring for matching. */
  searchByRegex?: boolean;
  /** Indicates whether the search should respect case: - `True`: the search is case sensitive. - `False`: the search is case insensitive. */
  matchCase?: boolean;
}

export const SubstringMatchCriteria: Schema.Schema<SubstringMatchCriteria> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      text: Schema.optional(Schema.String),
      searchByRegex: Schema.optional(Schema.Boolean),
      matchCase: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "SubstringMatchCriteria",
  }) as any as Schema.Schema<SubstringMatchCriteria>;

export interface ReplaceAllShapesWithImageRequest {
  /** The replace method. *Deprecated*: use `image_replace_method` instead. If you specify both a `replace_method` and an `image_replace_method`, the `image_replace_method` takes precedence. */
  replaceMethod?: "CENTER_INSIDE" | "CENTER_CROP" | (string & {});
  /** If non-empty, limits the matches to page elements only on the given pages. Returns a 400 bad request error if given the page object ID of a notes page or a notes master, or if a page with that object ID doesn't exist in the presentation. */
  pageObjectIds?: Array<string>;
  /** If set, this request will replace all of the shapes that contain the given text. */
  containsText?: SubstringMatchCriteria;
  /** The image replace method. If you specify both a `replace_method` and an `image_replace_method`, the `image_replace_method` takes precedence. If you do not specify a value for `image_replace_method`, but specify a value for `replace_method`, then the specified `replace_method` value is used. If you do not specify either, then CENTER_INSIDE is used. */
  imageReplaceMethod?:
    | "IMAGE_REPLACE_METHOD_UNSPECIFIED"
    | "CENTER_INSIDE"
    | "CENTER_CROP"
    | (string & {});
  /** The image URL. The image is fetched once at insertion time and a copy is stored for display inside the presentation. Images must be less than 50MB in size, cannot exceed 25 megapixels, and must be in one of PNG, JPEG, or GIF format. The provided URL can be at most 2 kB in length. The URL itself is saved with the image, and exposed via the Image.source_url field. */
  imageUrl?: string;
}

export const ReplaceAllShapesWithImageRequest: Schema.Schema<ReplaceAllShapesWithImageRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      replaceMethod: Schema.optional(Schema.String),
      pageObjectIds: Schema.optional(Schema.Array(Schema.String)),
      containsText: Schema.optional(SubstringMatchCriteria),
      imageReplaceMethod: Schema.optional(Schema.String),
      imageUrl: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ReplaceAllShapesWithImageRequest",
  }) as any as Schema.Schema<ReplaceAllShapesWithImageRequest>;

export interface DeleteTableColumnRequest {
  /** The table to delete columns from. */
  tableObjectId?: string;
  /** The reference table cell location from which a column will be deleted. The column this cell spans will be deleted. If this is a merged cell, multiple columns will be deleted. If no columns remain in the table after this deletion, the whole table is deleted. */
  cellLocation?: TableCellLocation;
}

export const DeleteTableColumnRequest: Schema.Schema<DeleteTableColumnRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      tableObjectId: Schema.optional(Schema.String),
      cellLocation: Schema.optional(TableCellLocation),
    }),
  ).annotate({
    identifier: "DeleteTableColumnRequest",
  }) as any as Schema.Schema<DeleteTableColumnRequest>;

export interface Range {
  /** The optional zero-based index of the beginning of the collection. Required for `FIXED_RANGE` and `FROM_START_INDEX` ranges. */
  startIndex?: number;
  /** The optional zero-based index of the end of the collection. Required for `FIXED_RANGE` ranges. */
  endIndex?: number;
  /** The type of range. */
  type?:
    | "RANGE_TYPE_UNSPECIFIED"
    | "FIXED_RANGE"
    | "FROM_START_INDEX"
    | "ALL"
    | (string & {});
}

export const Range: Schema.Schema<Range> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      startIndex: Schema.optional(Schema.Number),
      endIndex: Schema.optional(Schema.Number),
      type: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Range" }) as any as Schema.Schema<Range>;

export interface CreateParagraphBulletsRequest {
  /** The range of text to apply the bullet presets to, based on TextElement indexes. */
  textRange?: Range;
  /** The object ID of the shape or table containing the text to add bullets to. */
  objectId?: string;
  /** The optional table cell location if the text to be modified is in a table cell. If present, the object_id must refer to a table. */
  cellLocation?: TableCellLocation;
  /** The kinds of bullet glyphs to be used. Defaults to the `BULLET_DISC_CIRCLE_SQUARE` preset. */
  bulletPreset?:
    | "BULLET_DISC_CIRCLE_SQUARE"
    | "BULLET_DIAMONDX_ARROW3D_SQUARE"
    | "BULLET_CHECKBOX"
    | "BULLET_ARROW_DIAMOND_DISC"
    | "BULLET_STAR_CIRCLE_SQUARE"
    | "BULLET_ARROW3D_CIRCLE_SQUARE"
    | "BULLET_LEFTTRIANGLE_DIAMOND_DISC"
    | "BULLET_DIAMONDX_HOLLOWDIAMOND_SQUARE"
    | "BULLET_DIAMOND_CIRCLE_SQUARE"
    | "NUMBERED_DIGIT_ALPHA_ROMAN"
    | "NUMBERED_DIGIT_ALPHA_ROMAN_PARENS"
    | "NUMBERED_DIGIT_NESTED"
    | "NUMBERED_UPPERALPHA_ALPHA_ROMAN"
    | "NUMBERED_UPPERROMAN_UPPERALPHA_DIGIT"
    | "NUMBERED_ZERODIGIT_ALPHA_ROMAN"
    | (string & {});
}

export const CreateParagraphBulletsRequest: Schema.Schema<CreateParagraphBulletsRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      textRange: Schema.optional(Range),
      objectId: Schema.optional(Schema.String),
      cellLocation: Schema.optional(TableCellLocation),
      bulletPreset: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CreateParagraphBulletsRequest",
  }) as any as Schema.Schema<CreateParagraphBulletsRequest>;

export interface TableBorderFill {
  /** Solid fill. */
  solidFill?: SolidFill;
}

export const TableBorderFill: Schema.Schema<TableBorderFill> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      solidFill: Schema.optional(SolidFill),
    }),
  ).annotate({
    identifier: "TableBorderFill",
  }) as any as Schema.Schema<TableBorderFill>;

export interface TableBorderProperties {
  /** The dash style of the border. */
  dashStyle?:
    | "DASH_STYLE_UNSPECIFIED"
    | "SOLID"
    | "DOT"
    | "DASH"
    | "DASH_DOT"
    | "LONG_DASH"
    | "LONG_DASH_DOT"
    | (string & {});
  /** The thickness of the border. */
  weight?: Dimension;
  /** The fill of the table border. */
  tableBorderFill?: TableBorderFill;
}

export const TableBorderProperties: Schema.Schema<TableBorderProperties> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      dashStyle: Schema.optional(Schema.String),
      weight: Schema.optional(Dimension),
      tableBorderFill: Schema.optional(TableBorderFill),
    }),
  ).annotate({
    identifier: "TableBorderProperties",
  }) as any as Schema.Schema<TableBorderProperties>;

export interface UpdateTableBorderPropertiesRequest {
  /** The object ID of the table. */
  objectId?: string;
  /** The fields that should be updated. At least one field must be specified. The root `tableBorderProperties` is implied and should not be specified. A single `"*"` can be used as short-hand for listing every field. For example to update the table border solid fill color, set `fields` to `"tableBorderFill.solidFill.color"`. To reset a property to its default value, include its field name in the field mask but leave the field itself unset. */
  fields?: string;
  /** The table range representing the subset of the table to which the updates are applied. If a table range is not specified, the updates will apply to the entire table. */
  tableRange?: TableRange;
  /** The border position in the table range the updates should apply to. If a border position is not specified, the updates will apply to all borders in the table range. */
  borderPosition?:
    | "ALL"
    | "BOTTOM"
    | "INNER"
    | "INNER_HORIZONTAL"
    | "INNER_VERTICAL"
    | "LEFT"
    | "OUTER"
    | "RIGHT"
    | "TOP"
    | (string & {});
  /** The table border properties to update. */
  tableBorderProperties?: TableBorderProperties;
}

export const UpdateTableBorderPropertiesRequest: Schema.Schema<UpdateTableBorderPropertiesRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      objectId: Schema.optional(Schema.String),
      fields: Schema.optional(Schema.String),
      tableRange: Schema.optional(TableRange),
      borderPosition: Schema.optional(Schema.String),
      tableBorderProperties: Schema.optional(TableBorderProperties),
    }),
  ).annotate({
    identifier: "UpdateTableBorderPropertiesRequest",
  }) as any as Schema.Schema<UpdateTableBorderPropertiesRequest>;

export interface OptionalColor {
  /** If set, this will be used as an opaque color. If unset, this represents a transparent color. */
  opaqueColor?: OpaqueColor;
}

export const OptionalColor: Schema.Schema<OptionalColor> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      opaqueColor: Schema.optional(OpaqueColor),
    }),
  ).annotate({
    identifier: "OptionalColor",
  }) as any as Schema.Schema<OptionalColor>;

export interface WeightedFontFamily {
  /** The font family of the text. The font family can be any font from the Font menu in Slides or from [Google Fonts] (https://fonts.google.com/). If the font name is unrecognized, the text is rendered in `Arial`. */
  fontFamily?: string;
  /** The rendered weight of the text. This field can have any value that is a multiple of `100` between `100` and `900`, inclusive. This range corresponds to the numerical values described in the CSS 2.1 Specification, [section 15.6](https://www.w3.org/TR/CSS21/fonts.html#font-boldness), with non-numerical values disallowed. Weights greater than or equal to `700` are considered bold, and weights less than `700`are not bold. The default value is `400` ("normal"). */
  weight?: number;
}

export const WeightedFontFamily: Schema.Schema<WeightedFontFamily> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      fontFamily: Schema.optional(Schema.String),
      weight: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "WeightedFontFamily",
  }) as any as Schema.Schema<WeightedFontFamily>;

export interface TextStyle {
  /** Whether or not the text is underlined. */
  underline?: boolean;
  /** Whether or not the text is struck through. */
  strikethrough?: boolean;
  /** The size of the text's font. When read, the `font_size` will specified in points. */
  fontSize?: Dimension;
  /** The background color of the text. If set, the color is either opaque or transparent, depending on if the `opaque_color` field in it is set. */
  backgroundColor?: OptionalColor;
  /** The hyperlink destination of the text. If unset, there is no link. Links are not inherited from parent text. Changing the link in an update request causes some other changes to the text style of the range: * When setting a link, the text foreground color will be set to ThemeColorType.HYPERLINK and the text will be underlined. If these fields are modified in the same request, those values will be used instead of the link defaults. * Setting a link on a text range that overlaps with an existing link will also update the existing link to point to the new URL. * Links are not settable on newline characters. As a result, setting a link on a text range that crosses a paragraph boundary, such as `"ABC\n123"`, will separate the newline character(s) into their own text runs. The link will be applied separately to the runs before and after the newline. * Removing a link will update the text style of the range to match the style of the preceding text (or the default text styles if the preceding text is another link) unless different styles are being set in the same request. */
  link?: Link;
  /** The font family and rendered weight of the text. This field is an extension of `font_family` meant to support explicit font weights without breaking backwards compatibility. As such, when reading the style of a range of text, the value of `weighted_font_family#font_family` will always be equal to that of `font_family`. However, when writing, if both fields are included in the field mask (either explicitly or through the wildcard `"*"`), their values are reconciled as follows: * If `font_family` is set and `weighted_font_family` is not, the value of `font_family` is applied with weight `400` ("normal"). * If both fields are set, the value of `font_family` must match that of `weighted_font_family#font_family`. If so, the font family and weight of `weighted_font_family` is applied. Otherwise, a 400 bad request error is returned. * If `weighted_font_family` is set and `font_family` is not, the font family and weight of `weighted_font_family` is applied. * If neither field is set, the font family and weight of the text inherit from the parent. Note that these properties cannot inherit separately from each other. If an update request specifies values for both `weighted_font_family` and `bold`, the `weighted_font_family` is applied first, then `bold`. If `weighted_font_family#weight` is not set, it defaults to `400`. If `weighted_font_family` is set, then `weighted_font_family#font_family` must also be set with a non-empty value. Otherwise, a 400 bad request error is returned. */
  weightedFontFamily?: WeightedFontFamily;
  /** The color of the text itself. If set, the color is either opaque or transparent, depending on if the `opaque_color` field in it is set. */
  foregroundColor?: OptionalColor;
  /** Whether or not the text is rendered as bold. */
  bold?: boolean;
  /** Whether or not the text is italicized. */
  italic?: boolean;
  /** The font family of the text. The font family can be any font from the Font menu in Slides or from [Google Fonts] (https://fonts.google.com/). If the font name is unrecognized, the text is rendered in `Arial`. Some fonts can affect the weight of the text. If an update request specifies values for both `font_family` and `bold`, the explicitly-set `bold` value is used. */
  fontFamily?: string;
  /** The text's vertical offset from its normal position. Text with `SUPERSCRIPT` or `SUBSCRIPT` baseline offsets is automatically rendered in a smaller font size, computed based on the `font_size` field. The `font_size` itself is not affected by changes in this field. */
  baselineOffset?:
    | "BASELINE_OFFSET_UNSPECIFIED"
    | "NONE"
    | "SUPERSCRIPT"
    | "SUBSCRIPT"
    | (string & {});
  /** Whether or not the text is in small capital letters. */
  smallCaps?: boolean;
}

export const TextStyle: Schema.Schema<TextStyle> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      underline: Schema.optional(Schema.Boolean),
      strikethrough: Schema.optional(Schema.Boolean),
      fontSize: Schema.optional(Dimension),
      backgroundColor: Schema.optional(OptionalColor),
      link: Schema.optional(Link),
      weightedFontFamily: Schema.optional(WeightedFontFamily),
      foregroundColor: Schema.optional(OptionalColor),
      bold: Schema.optional(Schema.Boolean),
      italic: Schema.optional(Schema.Boolean),
      fontFamily: Schema.optional(Schema.String),
      baselineOffset: Schema.optional(Schema.String),
      smallCaps: Schema.optional(Schema.Boolean),
    }),
  ).annotate({ identifier: "TextStyle" }) as any as Schema.Schema<TextStyle>;

export interface UpdateTextStyleRequest {
  /** The range of text to style. The range may be extended to include adjacent newlines. If the range fully contains a paragraph belonging to a list, the paragraph's bullet is also updated with the matching text style. */
  textRange?: Range;
  /** The style(s) to set on the text. If the value for a particular style matches that of the parent, that style will be set to inherit. Certain text style changes may cause other changes meant to mirror the behavior of the Slides editor. See the documentation of TextStyle for more information. */
  style?: TextStyle;
  /** The location of the cell in the table containing the text to style. If `object_id` refers to a table, `cell_location` must have a value. Otherwise, it must not. */
  cellLocation?: TableCellLocation;
  /** The object ID of the shape or table with the text to be styled. */
  objectId?: string;
  /** The fields that should be updated. At least one field must be specified. The root `style` is implied and should not be specified. A single `"*"` can be used as short-hand for listing every field. For example, to update the text style to bold, set `fields` to `"bold"`. To reset a property to its default value, include its field name in the field mask but leave the field itself unset. */
  fields?: string;
}

export const UpdateTextStyleRequest: Schema.Schema<UpdateTextStyleRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      textRange: Schema.optional(Range),
      style: Schema.optional(TextStyle),
      cellLocation: Schema.optional(TableCellLocation),
      objectId: Schema.optional(Schema.String),
      fields: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UpdateTextStyleRequest",
  }) as any as Schema.Schema<UpdateTextStyleRequest>;

export interface DeleteTableRowRequest {
  /** The table to delete rows from. */
  tableObjectId?: string;
  /** The reference table cell location from which a row will be deleted. The row this cell spans will be deleted. If this is a merged cell, multiple rows will be deleted. If no rows remain in the table after this deletion, the whole table is deleted. */
  cellLocation?: TableCellLocation;
}

export const DeleteTableRowRequest: Schema.Schema<DeleteTableRowRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      tableObjectId: Schema.optional(Schema.String),
      cellLocation: Schema.optional(TableCellLocation),
    }),
  ).annotate({
    identifier: "DeleteTableRowRequest",
  }) as any as Schema.Schema<DeleteTableRowRequest>;

export interface UpdateImagePropertiesRequest {
  /** The image properties to update. */
  imageProperties?: ImageProperties;
  /** The object ID of the image the updates are applied to. */
  objectId?: string;
  /** The fields that should be updated. At least one field must be specified. The root `imageProperties` is implied and should not be specified. A single `"*"` can be used as short-hand for listing every field. For example to update the image outline color, set `fields` to `"outline.outlineFill.solidFill.color"`. To reset a property to its default value, include its field name in the field mask but leave the field itself unset. */
  fields?: string;
}

export const UpdateImagePropertiesRequest: Schema.Schema<UpdateImagePropertiesRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      imageProperties: Schema.optional(ImageProperties),
      objectId: Schema.optional(Schema.String),
      fields: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UpdateImagePropertiesRequest",
  }) as any as Schema.Schema<UpdateImagePropertiesRequest>;

export interface ThemeColorPair {
  /** The concrete color corresponding to the theme color type above. */
  color?: RgbColor;
  /** The type of the theme color. */
  type?:
    | "THEME_COLOR_TYPE_UNSPECIFIED"
    | "DARK1"
    | "LIGHT1"
    | "DARK2"
    | "LIGHT2"
    | "ACCENT1"
    | "ACCENT2"
    | "ACCENT3"
    | "ACCENT4"
    | "ACCENT5"
    | "ACCENT6"
    | "HYPERLINK"
    | "FOLLOWED_HYPERLINK"
    | "TEXT1"
    | "BACKGROUND1"
    | "TEXT2"
    | "BACKGROUND2"
    | (string & {});
}

export const ThemeColorPair: Schema.Schema<ThemeColorPair> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      color: Schema.optional(RgbColor),
      type: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ThemeColorPair",
  }) as any as Schema.Schema<ThemeColorPair>;

export interface ColorScheme {
  /** The ThemeColorType and corresponding concrete color pairs. */
  colors?: Array<ThemeColorPair>;
}

export const ColorScheme: Schema.Schema<ColorScheme> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      colors: Schema.optional(Schema.Array(ThemeColorPair)),
    }),
  ).annotate({
    identifier: "ColorScheme",
  }) as any as Schema.Schema<ColorScheme>;

export interface StretchedPictureFill {
  /** Reading the content_url: An URL to a picture with a default lifetime of 30 minutes. This URL is tagged with the account of the requester. Anyone with the URL effectively accesses the picture as the original requester. Access to the picture may be lost if the presentation's sharing settings change. Writing the content_url: The picture is fetched once at insertion time and a copy is stored for display inside the presentation. Pictures must be less than 50MB in size, cannot exceed 25 megapixels, and must be in one of PNG, JPEG, or GIF format. The provided URL can be at most 2 kB in length. */
  contentUrl?: string;
  /** The original size of the picture fill. This field is read-only. */
  size?: Size;
}

export const StretchedPictureFill: Schema.Schema<StretchedPictureFill> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      contentUrl: Schema.optional(Schema.String),
      size: Schema.optional(Size),
    }),
  ).annotate({
    identifier: "StretchedPictureFill",
  }) as any as Schema.Schema<StretchedPictureFill>;

export interface PageBackgroundFill {
  /** Stretched picture fill. */
  stretchedPictureFill?: StretchedPictureFill;
  /** Solid color fill. */
  solidFill?: SolidFill;
  /** The background fill property state. Updating the fill on a page will implicitly update this field to `RENDERED`, unless another value is specified in the same request. To have no fill on a page, set this field to `NOT_RENDERED`. In this case, any other fill fields set in the same request will be ignored. */
  propertyState?: "RENDERED" | "NOT_RENDERED" | "INHERIT" | (string & {});
}

export const PageBackgroundFill: Schema.Schema<PageBackgroundFill> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      stretchedPictureFill: Schema.optional(StretchedPictureFill),
      solidFill: Schema.optional(SolidFill),
      propertyState: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PageBackgroundFill",
  }) as any as Schema.Schema<PageBackgroundFill>;

export interface PageProperties {
  /** The color scheme of the page. If unset, the color scheme is inherited from a parent page. If the page has no parent, the color scheme uses a default Slides color scheme, matching the defaults in the Slides editor. Only the concrete colors of the first 12 ThemeColorTypes are editable. In addition, only the color scheme on `Master` pages can be updated. To update the field, a color scheme containing mappings from all the first 12 ThemeColorTypes to their concrete colors must be provided. Colors for the remaining ThemeColorTypes will be ignored. */
  colorScheme?: ColorScheme;
  /** The background fill of the page. If unset, the background fill is inherited from a parent page if it exists. If the page has no parent, then the background fill defaults to the corresponding fill in the Slides editor. */
  pageBackgroundFill?: PageBackgroundFill;
}

export const PageProperties: Schema.Schema<PageProperties> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      colorScheme: Schema.optional(ColorScheme),
      pageBackgroundFill: Schema.optional(PageBackgroundFill),
    }),
  ).annotate({
    identifier: "PageProperties",
  }) as any as Schema.Schema<PageProperties>;

export interface UpdatePagePropertiesRequest {
  /** The object ID of the page the update is applied to. */
  objectId?: string;
  /** The page properties to update. */
  pageProperties?: PageProperties;
  /** The fields that should be updated. At least one field must be specified. The root `pageProperties` is implied and should not be specified. A single `"*"` can be used as short-hand for listing every field. For example to update the page background solid fill color, set `fields` to `"pageBackgroundFill.solidFill.color"`. To reset a property to its default value, include its field name in the field mask but leave the field itself unset. */
  fields?: string;
}

export const UpdatePagePropertiesRequest: Schema.Schema<UpdatePagePropertiesRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      objectId: Schema.optional(Schema.String),
      pageProperties: Schema.optional(PageProperties),
      fields: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UpdatePagePropertiesRequest",
  }) as any as Schema.Schema<UpdatePagePropertiesRequest>;

export interface MergeTableCellsRequest {
  /** The object ID of the table. */
  objectId?: string;
  /** The table range specifying which cells of the table to merge. Any text in the cells being merged will be concatenated and stored in the upper-left ("head") cell of the range. If the range is non-rectangular (which can occur in some cases where the range covers cells that are already merged), a 400 bad request error is returned. */
  tableRange?: TableRange;
}

export const MergeTableCellsRequest: Schema.Schema<MergeTableCellsRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      objectId: Schema.optional(Schema.String),
      tableRange: Schema.optional(TableRange),
    }),
  ).annotate({
    identifier: "MergeTableCellsRequest",
  }) as any as Schema.Schema<MergeTableCellsRequest>;

export interface UpdateLineCategoryRequest {
  /** The line category to update to. The exact line type is determined based on the category to update to and how it's routed to connect to other page elements. */
  lineCategory?:
    | "LINE_CATEGORY_UNSPECIFIED"
    | "STRAIGHT"
    | "BENT"
    | "CURVED"
    | (string & {});
  /** The object ID of the line the update is applied to. Only a line with a category indicating it is a "connector" can be updated. The line may be rerouted after updating its category. */
  objectId?: string;
}

export const UpdateLineCategoryRequest: Schema.Schema<UpdateLineCategoryRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      lineCategory: Schema.optional(Schema.String),
      objectId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UpdateLineCategoryRequest",
  }) as any as Schema.Schema<UpdateLineCategoryRequest>;

export interface TableColumnProperties {
  /** Width of a column. */
  columnWidth?: Dimension;
}

export const TableColumnProperties: Schema.Schema<TableColumnProperties> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      columnWidth: Schema.optional(Dimension),
    }),
  ).annotate({
    identifier: "TableColumnProperties",
  }) as any as Schema.Schema<TableColumnProperties>;

export interface UpdateTableColumnPropertiesRequest {
  /** The fields that should be updated. At least one field must be specified. The root `tableColumnProperties` is implied and should not be specified. A single `"*"` can be used as short-hand for listing every field. For example to update the column width, set `fields` to `"column_width"`. If '"column_width"' is included in the field mask but the property is left unset, the column width will default to 406,400 EMU (32 points). */
  fields?: string;
  /** The object ID of the table. */
  objectId?: string;
  /** The list of zero-based indices specifying which columns to update. If no indices are provided, all columns in the table will be updated. */
  columnIndices?: Array<number>;
  /** The table column properties to update. If the value of `table_column_properties#column_width` in the request is less than 406,400 EMU (32 points), a 400 bad request error is returned. */
  tableColumnProperties?: TableColumnProperties;
}

export const UpdateTableColumnPropertiesRequest: Schema.Schema<UpdateTableColumnPropertiesRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      fields: Schema.optional(Schema.String),
      objectId: Schema.optional(Schema.String),
      columnIndices: Schema.optional(Schema.Array(Schema.Number)),
      tableColumnProperties: Schema.optional(TableColumnProperties),
    }),
  ).annotate({
    identifier: "UpdateTableColumnPropertiesRequest",
  }) as any as Schema.Schema<UpdateTableColumnPropertiesRequest>;

export interface DeleteTextRequest {
  /** The range of text to delete, based on TextElement indexes. There is always an implicit newline character at the end of a shape's or table cell's text that cannot be deleted. `Range.Type.ALL` will use the correct bounds, but care must be taken when specifying explicit bounds for range types `FROM_START_INDEX` and `FIXED_RANGE`. For example, if the text is "ABC", followed by an implicit newline, then the maximum value is 2 for `text_range.start_index` and 3 for `text_range.end_index`. Deleting text that crosses a paragraph boundary may result in changes to paragraph styles and lists as the two paragraphs are merged. Ranges that include only one code unit of a surrogate pair are expanded to include both code units. */
  textRange?: Range;
  /** The object ID of the shape or table from which the text will be deleted. */
  objectId?: string;
  /** The optional table cell location if the text is to be deleted from a table cell. If present, the object_id must refer to a table. */
  cellLocation?: TableCellLocation;
}

export const DeleteTextRequest: Schema.Schema<DeleteTextRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      textRange: Schema.optional(Range),
      objectId: Schema.optional(Schema.String),
      cellLocation: Schema.optional(TableCellLocation),
    }),
  ).annotate({
    identifier: "DeleteTextRequest",
  }) as any as Schema.Schema<DeleteTextRequest>;

export interface UpdatePageElementAltTextRequest {
  /** The object ID of the page element the updates are applied to. */
  objectId?: string;
  /** The updated alt text title of the page element. If unset the existing value will be maintained. The title is exposed to screen readers and other accessibility interfaces. Only use human readable values related to the content of the page element. */
  title?: string;
  /** The updated alt text description of the page element. If unset the existing value will be maintained. The description is exposed to screen readers and other accessibility interfaces. Only use human readable values related to the content of the page element. */
  description?: string;
}

export const UpdatePageElementAltTextRequest: Schema.Schema<UpdatePageElementAltTextRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      objectId: Schema.optional(Schema.String),
      title: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UpdatePageElementAltTextRequest",
  }) as any as Schema.Schema<UpdatePageElementAltTextRequest>;

export interface CreateTableRequest {
  /** A user-supplied object ID. If you specify an ID, it must be unique among all pages and page elements in the presentation. The ID must start with an alphanumeric character or an underscore (matches regex `[a-zA-Z0-9_]`); remaining characters may include those as well as a hyphen or colon (matches regex `[a-zA-Z0-9_-:]`). The length of the ID must not be less than 5 or greater than 50. If you don't specify an ID, a unique one is generated. */
  objectId?: string;
  /** Number of columns in the table. */
  columns?: number;
  /** The element properties for the table. The table will be created at the provided size, subject to a minimum size. If no size is provided, the table will be automatically sized. Table transforms must have a scale of 1 and no shear components. If no transform is provided, the table will be centered on the page. */
  elementProperties?: PageElementProperties;
  /** Number of rows in the table. */
  rows?: number;
}

export const CreateTableRequest: Schema.Schema<CreateTableRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      objectId: Schema.optional(Schema.String),
      columns: Schema.optional(Schema.Number),
      elementProperties: Schema.optional(PageElementProperties),
      rows: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "CreateTableRequest",
  }) as any as Schema.Schema<CreateTableRequest>;

export interface RefreshSheetsChartRequest {
  /** The object ID of the chart to refresh. */
  objectId?: string;
}

export const RefreshSheetsChartRequest: Schema.Schema<RefreshSheetsChartRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      objectId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "RefreshSheetsChartRequest",
  }) as any as Schema.Schema<RefreshSheetsChartRequest>;

export interface VideoProperties {
  /** Whether to enable video autoplay when the page is displayed in present mode. Defaults to false. */
  autoPlay?: boolean;
  /** The time at which to end playback, measured in seconds from the beginning of the video. If set, the end time should be after the start time. If not set or if you set this to a value that exceeds the video's length, the video will be played until its end. */
  end?: number;
  /** Whether to mute the audio during video playback. Defaults to false. */
  mute?: boolean;
  /** The outline of the video. The default outline matches the defaults for new videos created in the Slides editor. */
  outline?: Outline;
  /** The time at which to start playback, measured in seconds from the beginning of the video. If set, the start time should be before the end time. If you set this to a value that exceeds the video's length in seconds, the video will be played from the last second. If not set, the video will be played from the beginning. */
  start?: number;
}

export const VideoProperties: Schema.Schema<VideoProperties> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      autoPlay: Schema.optional(Schema.Boolean),
      end: Schema.optional(Schema.Number),
      mute: Schema.optional(Schema.Boolean),
      outline: Schema.optional(Outline),
      start: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "VideoProperties",
  }) as any as Schema.Schema<VideoProperties>;

export interface UpdateVideoPropertiesRequest {
  /** The object ID of the video the updates are applied to. */
  objectId?: string;
  /** The video properties to update. */
  videoProperties?: VideoProperties;
  /** The fields that should be updated. At least one field must be specified. The root `videoProperties` is implied and should not be specified. A single `"*"` can be used as short-hand for listing every field. For example to update the video outline color, set `fields` to `"outline.outlineFill.solidFill.color"`. To reset a property to its default value, include its field name in the field mask but leave the field itself unset. */
  fields?: string;
}

export const UpdateVideoPropertiesRequest: Schema.Schema<UpdateVideoPropertiesRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      objectId: Schema.optional(Schema.String),
      videoProperties: Schema.optional(VideoProperties),
      fields: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UpdateVideoPropertiesRequest",
  }) as any as Schema.Schema<UpdateVideoPropertiesRequest>;

export interface CreateVideoRequest {
  /** The element properties for the video. The PageElementProperties.size property is optional. If you don't specify a size, a default size is chosen by the server. The PageElementProperties.transform property is optional. The transform must not have shear components. If you don't specify a transform, the video will be placed at the top left corner of the page. */
  elementProperties?: PageElementProperties;
  /** A user-supplied object ID. If you specify an ID, it must be unique among all pages and page elements in the presentation. The ID must start with an alphanumeric character or an underscore (matches regex `[a-zA-Z0-9_]`); remaining characters may include those as well as a hyphen or colon (matches regex `[a-zA-Z0-9_-:]`). The length of the ID must not be less than 5 or greater than 50. If you don't specify an ID, a unique one is generated. */
  objectId?: string;
  /** The video source. */
  source?: "SOURCE_UNSPECIFIED" | "YOUTUBE" | "DRIVE" | (string & {});
  /** The video source's unique identifier for this video. e.g. For YouTube video https://www.youtube.com/watch?v=7U3axjORYZ0, the ID is 7U3axjORYZ0. For a Google Drive video https://drive.google.com/file/d/1xCgQLFTJi5_Xl8DgW_lcUYq5e-q6Hi5Q the ID is 1xCgQLFTJi5_Xl8DgW_lcUYq5e-q6Hi5Q. To access a Google Drive video file, you might need to add a resource key to the HTTP header for a subset of old files. For more information, see [Access link-shared files using resource keys](https://developers.google.com/drive/api/v3/resource-keys). */
  id?: string;
}

export const CreateVideoRequest: Schema.Schema<CreateVideoRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      elementProperties: Schema.optional(PageElementProperties),
      objectId: Schema.optional(Schema.String),
      source: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CreateVideoRequest",
  }) as any as Schema.Schema<CreateVideoRequest>;

export interface LayoutReference {
  /** Layout ID: the object ID of one of the layouts in the presentation. */
  layoutId?: string;
  /** Predefined layout. */
  predefinedLayout?:
    | "PREDEFINED_LAYOUT_UNSPECIFIED"
    | "BLANK"
    | "CAPTION_ONLY"
    | "TITLE"
    | "TITLE_AND_BODY"
    | "TITLE_AND_TWO_COLUMNS"
    | "TITLE_ONLY"
    | "SECTION_HEADER"
    | "SECTION_TITLE_AND_DESCRIPTION"
    | "ONE_COLUMN_TEXT"
    | "MAIN_POINT"
    | "BIG_NUMBER"
    | (string & {});
}

export const LayoutReference: Schema.Schema<LayoutReference> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      layoutId: Schema.optional(Schema.String),
      predefinedLayout: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LayoutReference",
  }) as any as Schema.Schema<LayoutReference>;

export interface LayoutPlaceholderIdMapping {
  /** The placeholder on a layout that will be applied to a slide. Only type and index are needed. For example, a predefined `TITLE_AND_BODY` layout may usually have a TITLE placeholder with index 0 and a BODY placeholder with index 0. */
  layoutPlaceholder?: Placeholder;
  /** The object ID of the placeholder on a layout that will be applied to a slide. */
  layoutPlaceholderObjectId?: string;
  /** A user-supplied object ID for the placeholder identified above that to be created onto a slide. If you specify an ID, it must be unique among all pages and page elements in the presentation. The ID must start with an alphanumeric character or an underscore (matches regex `[a-zA-Z0-9_]`); remaining characters may include those as well as a hyphen or colon (matches regex `[a-zA-Z0-9_-:]`). The length of the ID must not be less than 5 or greater than 50. If you don't specify an ID, a unique one is generated. */
  objectId?: string;
}

export const LayoutPlaceholderIdMapping: Schema.Schema<LayoutPlaceholderIdMapping> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      layoutPlaceholder: Schema.optional(Placeholder),
      layoutPlaceholderObjectId: Schema.optional(Schema.String),
      objectId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LayoutPlaceholderIdMapping",
  }) as any as Schema.Schema<LayoutPlaceholderIdMapping>;

export interface CreateSlideRequest {
  /** The optional zero-based index indicating where to insert the slides. If you don't specify an index, the slide is created at the end. */
  insertionIndex?: number;
  /** Layout reference of the slide to be inserted, based on the *current master*, which is one of the following: - The master of the previous slide index. - The master of the first slide, if the insertion_index is zero. - The first master in the presentation, if there are no slides. If the LayoutReference is not found in the current master, a 400 bad request error is returned. If you don't specify a layout reference, the slide uses the predefined `BLANK` layout. */
  slideLayoutReference?: LayoutReference;
  /** An optional list of object ID mappings from the placeholder(s) on the layout to the placeholders that are created on the slide from the specified layout. Can only be used when `slide_layout_reference` is specified. */
  placeholderIdMappings?: Array<LayoutPlaceholderIdMapping>;
  /** A user-supplied object ID. If you specify an ID, it must be unique among all pages and page elements in the presentation. The ID must start with an alphanumeric character or an underscore (matches regex `[a-zA-Z0-9_]`); remaining characters may include those as well as a hyphen or colon (matches regex `[a-zA-Z0-9_-:]`). The ID length must be between 5 and 50 characters, inclusive. If you don't specify an ID, a unique one is generated. */
  objectId?: string;
}

export const CreateSlideRequest: Schema.Schema<CreateSlideRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      insertionIndex: Schema.optional(Schema.Number),
      slideLayoutReference: Schema.optional(LayoutReference),
      placeholderIdMappings: Schema.optional(
        Schema.Array(LayoutPlaceholderIdMapping),
      ),
      objectId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CreateSlideRequest",
  }) as any as Schema.Schema<CreateSlideRequest>;

export interface TableCellBackgroundFill {
  /** Solid color fill. */
  solidFill?: SolidFill;
  /** The background fill property state. Updating the fill on a table cell will implicitly update this field to `RENDERED`, unless another value is specified in the same request. To have no fill on a table cell, set this field to `NOT_RENDERED`. In this case, any other fill fields set in the same request will be ignored. */
  propertyState?: "RENDERED" | "NOT_RENDERED" | "INHERIT" | (string & {});
}

export const TableCellBackgroundFill: Schema.Schema<TableCellBackgroundFill> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      solidFill: Schema.optional(SolidFill),
      propertyState: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "TableCellBackgroundFill",
  }) as any as Schema.Schema<TableCellBackgroundFill>;

export interface TableCellProperties {
  /** The alignment of the content in the table cell. The default alignment matches the alignment for newly created table cells in the Slides editor. */
  contentAlignment?:
    | "CONTENT_ALIGNMENT_UNSPECIFIED"
    | "CONTENT_ALIGNMENT_UNSUPPORTED"
    | "TOP"
    | "MIDDLE"
    | "BOTTOM"
    | (string & {});
  /** The background fill of the table cell. The default fill matches the fill for newly created table cells in the Slides editor. */
  tableCellBackgroundFill?: TableCellBackgroundFill;
}

export const TableCellProperties: Schema.Schema<TableCellProperties> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      contentAlignment: Schema.optional(Schema.String),
      tableCellBackgroundFill: Schema.optional(TableCellBackgroundFill),
    }),
  ).annotate({
    identifier: "TableCellProperties",
  }) as any as Schema.Schema<TableCellProperties>;

export interface UpdateTableCellPropertiesRequest {
  /** The object ID of the table. */
  objectId?: string;
  /** The table range representing the subset of the table to which the updates are applied. If a table range is not specified, the updates will apply to the entire table. */
  tableRange?: TableRange;
  /** The table cell properties to update. */
  tableCellProperties?: TableCellProperties;
  /** The fields that should be updated. At least one field must be specified. The root `tableCellProperties` is implied and should not be specified. A single `"*"` can be used as short-hand for listing every field. For example to update the table cell background solid fill color, set `fields` to `"tableCellBackgroundFill.solidFill.color"`. To reset a property to its default value, include its field name in the field mask but leave the field itself unset. */
  fields?: string;
}

export const UpdateTableCellPropertiesRequest: Schema.Schema<UpdateTableCellPropertiesRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      objectId: Schema.optional(Schema.String),
      tableRange: Schema.optional(TableRange),
      tableCellProperties: Schema.optional(TableCellProperties),
      fields: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UpdateTableCellPropertiesRequest",
  }) as any as Schema.Schema<UpdateTableCellPropertiesRequest>;

export interface DeleteParagraphBulletsRequest {
  /** The object ID of the shape or table containing the text to delete bullets from. */
  objectId?: string;
  /** The range of text to delete bullets from, based on TextElement indexes. */
  textRange?: Range;
  /** The optional table cell location if the text to be modified is in a table cell. If present, the object_id must refer to a table. */
  cellLocation?: TableCellLocation;
}

export const DeleteParagraphBulletsRequest: Schema.Schema<DeleteParagraphBulletsRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      objectId: Schema.optional(Schema.String),
      textRange: Schema.optional(Range),
      cellLocation: Schema.optional(TableCellLocation),
    }),
  ).annotate({
    identifier: "DeleteParagraphBulletsRequest",
  }) as any as Schema.Schema<DeleteParagraphBulletsRequest>;

export interface UpdatePageElementsZOrderRequest {
  /** The object IDs of the page elements to update. All the page elements must be on the same page and must not be grouped. */
  pageElementObjectIds?: Array<string>;
  /** The Z-order operation to apply on the page elements. When applying the operation on multiple page elements, the relative Z-orders within these page elements before the operation is maintained. */
  operation?:
    | "Z_ORDER_OPERATION_UNSPECIFIED"
    | "BRING_TO_FRONT"
    | "BRING_FORWARD"
    | "SEND_BACKWARD"
    | "SEND_TO_BACK"
    | (string & {});
}

export const UpdatePageElementsZOrderRequest: Schema.Schema<UpdatePageElementsZOrderRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      pageElementObjectIds: Schema.optional(Schema.Array(Schema.String)),
      operation: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UpdatePageElementsZOrderRequest",
  }) as any as Schema.Schema<UpdatePageElementsZOrderRequest>;

export interface UpdateSlidesPositionRequest {
  /** The IDs of the slides in the presentation that should be moved. The slides in this list must be in existing presentation order, without duplicates. */
  slideObjectIds?: Array<string>;
  /** The index where the slides should be inserted, based on the slide arrangement before the move takes place. Must be between zero and the number of slides in the presentation, inclusive. */
  insertionIndex?: number;
}

export const UpdateSlidesPositionRequest: Schema.Schema<UpdateSlidesPositionRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      slideObjectIds: Schema.optional(Schema.Array(Schema.String)),
      insertionIndex: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "UpdateSlidesPositionRequest",
  }) as any as Schema.Schema<UpdateSlidesPositionRequest>;

export interface ReplaceImageRequest {
  /** The ID of the existing image that will be replaced. The ID can be retrieved from the response of a get request. */
  imageObjectId?: string;
  /** The image URL. The image is fetched once at insertion time and a copy is stored for display inside the presentation. Images must be less than 50MB, cannot exceed 25 megapixels, and must be in PNG, JPEG, or GIF format. The provided URL can't surpass 2 KB in length. The URL is saved with the image, and exposed through the Image.source_url field. */
  url?: string;
  /** The replacement method. */
  imageReplaceMethod?:
    | "IMAGE_REPLACE_METHOD_UNSPECIFIED"
    | "CENTER_INSIDE"
    | "CENTER_CROP"
    | (string & {});
}

export const ReplaceImageRequest: Schema.Schema<ReplaceImageRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      imageObjectId: Schema.optional(Schema.String),
      url: Schema.optional(Schema.String),
      imageReplaceMethod: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ReplaceImageRequest",
  }) as any as Schema.Schema<ReplaceImageRequest>;

export interface LayoutProperties {
  /** The object ID of the master that this layout is based on. */
  masterObjectId?: string;
  /** The human-readable name of the layout. */
  displayName?: string;
  /** The name of the layout. */
  name?: string;
}

export const LayoutProperties: Schema.Schema<LayoutProperties> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      masterObjectId: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LayoutProperties",
  }) as any as Schema.Schema<LayoutProperties>;

export interface NotesProperties {
  /** The object ID of the shape on this notes page that contains the speaker notes for the corresponding slide. The actual shape may not always exist on the notes page. Inserting text using this object ID will automatically create the shape. In this case, the actual shape may have different object ID. The `GetPresentation` or `GetPage` action will always return the latest object ID. */
  speakerNotesObjectId?: string;
}

export const NotesProperties: Schema.Schema<NotesProperties> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      speakerNotesObjectId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "NotesProperties",
  }) as any as Schema.Schema<NotesProperties>;

export interface SheetsChartProperties {
  /** The properties of the embedded chart image. */
  chartImageProperties?: ImageProperties;
}

export const SheetsChartProperties: Schema.Schema<SheetsChartProperties> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      chartImageProperties: Schema.optional(ImageProperties),
    }),
  ).annotate({
    identifier: "SheetsChartProperties",
  }) as any as Schema.Schema<SheetsChartProperties>;

export interface SheetsChart {
  /** The URL of an image of the embedded chart, with a default lifetime of 30 minutes. This URL is tagged with the account of the requester. Anyone with the URL effectively accesses the image as the original requester. Access to the image may be lost if the presentation's sharing settings change. */
  contentUrl?: string;
  /** The properties of the Sheets chart. */
  sheetsChartProperties?: SheetsChartProperties;
  /** The ID of the Google Sheets spreadsheet that contains the source chart. */
  spreadsheetId?: string;
  /** The ID of the specific chart in the Google Sheets spreadsheet that is embedded. */
  chartId?: number;
}

export const SheetsChart: Schema.Schema<SheetsChart> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      contentUrl: Schema.optional(Schema.String),
      sheetsChartProperties: Schema.optional(SheetsChartProperties),
      spreadsheetId: Schema.optional(Schema.String),
      chartId: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "SheetsChart",
  }) as any as Schema.Schema<SheetsChart>;

export interface Group {
  /** The collection of elements in the group. The minimum size of a group is 2. */
  children?: Array<PageElement>;
}

export const Group: Schema.Schema<Group> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      children: Schema.optional(Schema.Array(PageElement)),
    }),
  ).annotate({ identifier: "Group" }) as any as Schema.Schema<Group>;

export interface SpeakerSpotlightProperties {
  /** The outline of the Speaker Spotlight. If not set, it has no outline. */
  outline?: Outline;
  /** The shadow of the Speaker Spotlight. If not set, it has no shadow. */
  shadow?: Shadow;
}

export const SpeakerSpotlightProperties: Schema.Schema<SpeakerSpotlightProperties> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      outline: Schema.optional(Outline),
      shadow: Schema.optional(Shadow),
    }),
  ).annotate({
    identifier: "SpeakerSpotlightProperties",
  }) as any as Schema.Schema<SpeakerSpotlightProperties>;

export interface SpeakerSpotlight {
  /** The properties of the Speaker Spotlight. */
  speakerSpotlightProperties?: SpeakerSpotlightProperties;
}

export const SpeakerSpotlight: Schema.Schema<SpeakerSpotlight> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      speakerSpotlightProperties: Schema.optional(SpeakerSpotlightProperties),
    }),
  ).annotate({
    identifier: "SpeakerSpotlight",
  }) as any as Schema.Schema<SpeakerSpotlight>;

export interface Video {
  /** The properties of the video. */
  videoProperties?: VideoProperties;
  /** An URL to a video. The URL is valid as long as the source video exists and sharing settings do not change. */
  url?: string;
  /** The video source. */
  source?: "SOURCE_UNSPECIFIED" | "YOUTUBE" | "DRIVE" | (string & {});
  /** The video source's unique identifier for this video. */
  id?: string;
}

export const Video: Schema.Schema<Video> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      videoProperties: Schema.optional(VideoProperties),
      url: Schema.optional(Schema.String),
      source: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Video" }) as any as Schema.Schema<Video>;

export interface NestingLevel {
  /** The style of a bullet at this level of nesting. */
  bulletStyle?: TextStyle;
}

export const NestingLevel: Schema.Schema<NestingLevel> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      bulletStyle: Schema.optional(TextStyle),
    }),
  ).annotate({
    identifier: "NestingLevel",
  }) as any as Schema.Schema<NestingLevel>;

export interface List {
  /** The ID of the list. */
  listId?: string;
  /** A map of nesting levels to the properties of bullets at the associated level. A list has at most nine levels of nesting, so the possible values for the keys of this map are 0 through 8, inclusive. */
  nestingLevel?: Record<string, NestingLevel>;
}

export const List: Schema.Schema<List> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      listId: Schema.optional(Schema.String),
      nestingLevel: Schema.optional(Schema.Record(Schema.String, NestingLevel)),
    }),
  ).annotate({ identifier: "List" }) as any as Schema.Schema<List>;

export interface ParagraphStyle {
  /** The amount of extra space above the paragraph. If unset, the value is inherited from the parent. */
  spaceAbove?: Dimension;
  /** The amount of extra space below the paragraph. If unset, the value is inherited from the parent. */
  spaceBelow?: Dimension;
  /** The text alignment for this paragraph. */
  alignment?:
    | "ALIGNMENT_UNSPECIFIED"
    | "START"
    | "CENTER"
    | "END"
    | "JUSTIFIED"
    | (string & {});
  /** The amount indentation for the paragraph on the side that corresponds to the end of the text, based on the current text direction. If unset, the value is inherited from the parent. */
  indentEnd?: Dimension;
  /** The amount of space between lines, as a percentage of normal, where normal is represented as 100.0. If unset, the value is inherited from the parent. */
  lineSpacing?: number;
  /** The text direction of this paragraph. If unset, the value defaults to LEFT_TO_RIGHT since text direction is not inherited. */
  direction?:
    | "TEXT_DIRECTION_UNSPECIFIED"
    | "LEFT_TO_RIGHT"
    | "RIGHT_TO_LEFT"
    | (string & {});
  /** The amount indentation for the paragraph on the side that corresponds to the start of the text, based on the current text direction. If unset, the value is inherited from the parent. */
  indentStart?: Dimension;
  /** The spacing mode for the paragraph. */
  spacingMode?:
    | "SPACING_MODE_UNSPECIFIED"
    | "NEVER_COLLAPSE"
    | "COLLAPSE_LISTS"
    | (string & {});
  /** The amount of indentation for the start of the first line of the paragraph. If unset, the value is inherited from the parent. */
  indentFirstLine?: Dimension;
}

export const ParagraphStyle: Schema.Schema<ParagraphStyle> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      spaceAbove: Schema.optional(Dimension),
      spaceBelow: Schema.optional(Dimension),
      alignment: Schema.optional(Schema.String),
      indentEnd: Schema.optional(Dimension),
      lineSpacing: Schema.optional(Schema.Number),
      direction: Schema.optional(Schema.String),
      indentStart: Schema.optional(Dimension),
      spacingMode: Schema.optional(Schema.String),
      indentFirstLine: Schema.optional(Dimension),
    }),
  ).annotate({
    identifier: "ParagraphStyle",
  }) as any as Schema.Schema<ParagraphStyle>;

export interface Bullet {
  /** The ID of the list this paragraph belongs to. */
  listId?: string;
  /** The nesting level of this paragraph in the list. */
  nestingLevel?: number;
  /** The rendered bullet glyph for this paragraph. */
  glyph?: string;
  /** The paragraph specific text style applied to this bullet. */
  bulletStyle?: TextStyle;
}

export const Bullet: Schema.Schema<Bullet> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      listId: Schema.optional(Schema.String),
      nestingLevel: Schema.optional(Schema.Number),
      glyph: Schema.optional(Schema.String),
      bulletStyle: Schema.optional(TextStyle),
    }),
  ).annotate({ identifier: "Bullet" }) as any as Schema.Schema<Bullet>;

export interface ParagraphMarker {
  /** The paragraph's style */
  style?: ParagraphStyle;
  /** The bullet for this paragraph. If not present, the paragraph does not belong to a list. */
  bullet?: Bullet;
}

export const ParagraphMarker: Schema.Schema<ParagraphMarker> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      style: Schema.optional(ParagraphStyle),
      bullet: Schema.optional(Bullet),
    }),
  ).annotate({
    identifier: "ParagraphMarker",
  }) as any as Schema.Schema<ParagraphMarker>;

export interface TextRun {
  /** The text of this run. */
  content?: string;
  /** The styling applied to this run. */
  style?: TextStyle;
}

export const TextRun: Schema.Schema<TextRun> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      content: Schema.optional(Schema.String),
      style: Schema.optional(TextStyle),
    }),
  ).annotate({ identifier: "TextRun" }) as any as Schema.Schema<TextRun>;

export interface AutoText {
  /** The rendered content of this auto text, if available. */
  content?: string;
  /** The type of this auto text. */
  type?: "TYPE_UNSPECIFIED" | "SLIDE_NUMBER" | (string & {});
  /** The styling applied to this auto text. */
  style?: TextStyle;
}

export const AutoText: Schema.Schema<AutoText> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      content: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
      style: Schema.optional(TextStyle),
    }),
  ).annotate({ identifier: "AutoText" }) as any as Schema.Schema<AutoText>;

export interface TextElement {
  /** The zero-based end index of this text element, exclusive, in Unicode code units. */
  endIndex?: number;
  /** The zero-based start index of this text element, in Unicode code units. */
  startIndex?: number;
  /** A marker representing the beginning of a new paragraph. The `start_index` and `end_index` of this TextElement represent the range of the paragraph. Other TextElements with an index range contained inside this paragraph's range are considered to be part of this paragraph. The range of indices of two separate paragraphs will never overlap. */
  paragraphMarker?: ParagraphMarker;
  /** A TextElement representing a run of text where all of the characters in the run have the same TextStyle. The `start_index` and `end_index` of TextRuns will always be fully contained in the index range of a single `paragraph_marker` TextElement. In other words, a TextRun will never span multiple paragraphs. */
  textRun?: TextRun;
  /** A TextElement representing a spot in the text that is dynamically replaced with content that can change over time. */
  autoText?: AutoText;
}

export const TextElement: Schema.Schema<TextElement> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      endIndex: Schema.optional(Schema.Number),
      startIndex: Schema.optional(Schema.Number),
      paragraphMarker: Schema.optional(ParagraphMarker),
      textRun: Schema.optional(TextRun),
      autoText: Schema.optional(AutoText),
    }),
  ).annotate({
    identifier: "TextElement",
  }) as any as Schema.Schema<TextElement>;

export interface TextContent {
  /** The bulleted lists contained in this text, keyed by list ID. */
  lists?: Record<string, List>;
  /** The text contents broken down into its component parts, including styling information. This property is read-only. */
  textElements?: Array<TextElement>;
}

export const TextContent: Schema.Schema<TextContent> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      lists: Schema.optional(Schema.Record(Schema.String, List)),
      textElements: Schema.optional(Schema.Array(TextElement)),
    }),
  ).annotate({
    identifier: "TextContent",
  }) as any as Schema.Schema<TextContent>;

export interface Shape {
  /** Placeholders are page elements that inherit from corresponding placeholders on layouts and masters. If set, the shape is a placeholder shape and any inherited properties can be resolved by looking at the parent placeholder identified by the Placeholder.parent_object_id field. */
  placeholder?: Placeholder;
  /** The text content of the shape. */
  text?: TextContent;
  /** The properties of the shape. */
  shapeProperties?: ShapeProperties;
  /** The type of the shape. */
  shapeType?:
    | "TYPE_UNSPECIFIED"
    | "TEXT_BOX"
    | "RECTANGLE"
    | "ROUND_RECTANGLE"
    | "ELLIPSE"
    | "ARC"
    | "BENT_ARROW"
    | "BENT_UP_ARROW"
    | "BEVEL"
    | "BLOCK_ARC"
    | "BRACE_PAIR"
    | "BRACKET_PAIR"
    | "CAN"
    | "CHEVRON"
    | "CHORD"
    | "CLOUD"
    | "CORNER"
    | "CUBE"
    | "CURVED_DOWN_ARROW"
    | "CURVED_LEFT_ARROW"
    | "CURVED_RIGHT_ARROW"
    | "CURVED_UP_ARROW"
    | "DECAGON"
    | "DIAGONAL_STRIPE"
    | "DIAMOND"
    | "DODECAGON"
    | "DONUT"
    | "DOUBLE_WAVE"
    | "DOWN_ARROW"
    | "DOWN_ARROW_CALLOUT"
    | "FOLDED_CORNER"
    | "FRAME"
    | "HALF_FRAME"
    | "HEART"
    | "HEPTAGON"
    | "HEXAGON"
    | "HOME_PLATE"
    | "HORIZONTAL_SCROLL"
    | "IRREGULAR_SEAL_1"
    | "IRREGULAR_SEAL_2"
    | "LEFT_ARROW"
    | "LEFT_ARROW_CALLOUT"
    | "LEFT_BRACE"
    | "LEFT_BRACKET"
    | "LEFT_RIGHT_ARROW"
    | "LEFT_RIGHT_ARROW_CALLOUT"
    | "LEFT_RIGHT_UP_ARROW"
    | "LEFT_UP_ARROW"
    | "LIGHTNING_BOLT"
    | "MATH_DIVIDE"
    | "MATH_EQUAL"
    | "MATH_MINUS"
    | "MATH_MULTIPLY"
    | "MATH_NOT_EQUAL"
    | "MATH_PLUS"
    | "MOON"
    | "NO_SMOKING"
    | "NOTCHED_RIGHT_ARROW"
    | "OCTAGON"
    | "PARALLELOGRAM"
    | "PENTAGON"
    | "PIE"
    | "PLAQUE"
    | "PLUS"
    | "QUAD_ARROW"
    | "QUAD_ARROW_CALLOUT"
    | "RIBBON"
    | "RIBBON_2"
    | "RIGHT_ARROW"
    | "RIGHT_ARROW_CALLOUT"
    | "RIGHT_BRACE"
    | "RIGHT_BRACKET"
    | "ROUND_1_RECTANGLE"
    | "ROUND_2_DIAGONAL_RECTANGLE"
    | "ROUND_2_SAME_RECTANGLE"
    | "RIGHT_TRIANGLE"
    | "SMILEY_FACE"
    | "SNIP_1_RECTANGLE"
    | "SNIP_2_DIAGONAL_RECTANGLE"
    | "SNIP_2_SAME_RECTANGLE"
    | "SNIP_ROUND_RECTANGLE"
    | "STAR_10"
    | "STAR_12"
    | "STAR_16"
    | "STAR_24"
    | "STAR_32"
    | "STAR_4"
    | "STAR_5"
    | "STAR_6"
    | "STAR_7"
    | "STAR_8"
    | "STRIPED_RIGHT_ARROW"
    | "SUN"
    | "TRAPEZOID"
    | "TRIANGLE"
    | "UP_ARROW"
    | "UP_ARROW_CALLOUT"
    | "UP_DOWN_ARROW"
    | "UTURN_ARROW"
    | "VERTICAL_SCROLL"
    | "WAVE"
    | "WEDGE_ELLIPSE_CALLOUT"
    | "WEDGE_RECTANGLE_CALLOUT"
    | "WEDGE_ROUND_RECTANGLE_CALLOUT"
    | "FLOW_CHART_ALTERNATE_PROCESS"
    | "FLOW_CHART_COLLATE"
    | "FLOW_CHART_CONNECTOR"
    | "FLOW_CHART_DECISION"
    | "FLOW_CHART_DELAY"
    | "FLOW_CHART_DISPLAY"
    | "FLOW_CHART_DOCUMENT"
    | "FLOW_CHART_EXTRACT"
    | "FLOW_CHART_INPUT_OUTPUT"
    | "FLOW_CHART_INTERNAL_STORAGE"
    | "FLOW_CHART_MAGNETIC_DISK"
    | "FLOW_CHART_MAGNETIC_DRUM"
    | "FLOW_CHART_MAGNETIC_TAPE"
    | "FLOW_CHART_MANUAL_INPUT"
    | "FLOW_CHART_MANUAL_OPERATION"
    | "FLOW_CHART_MERGE"
    | "FLOW_CHART_MULTIDOCUMENT"
    | "FLOW_CHART_OFFLINE_STORAGE"
    | "FLOW_CHART_OFFPAGE_CONNECTOR"
    | "FLOW_CHART_ONLINE_STORAGE"
    | "FLOW_CHART_OR"
    | "FLOW_CHART_PREDEFINED_PROCESS"
    | "FLOW_CHART_PREPARATION"
    | "FLOW_CHART_PROCESS"
    | "FLOW_CHART_PUNCHED_CARD"
    | "FLOW_CHART_PUNCHED_TAPE"
    | "FLOW_CHART_SORT"
    | "FLOW_CHART_SUMMING_JUNCTION"
    | "FLOW_CHART_TERMINATOR"
    | "ARROW_EAST"
    | "ARROW_NORTH_EAST"
    | "ARROW_NORTH"
    | "SPEECH"
    | "STARBURST"
    | "TEARDROP"
    | "ELLIPSE_RIBBON"
    | "ELLIPSE_RIBBON_2"
    | "CLOUD_CALLOUT"
    | "CUSTOM"
    | (string & {});
}

export const Shape: Schema.Schema<Shape> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      placeholder: Schema.optional(Placeholder),
      text: Schema.optional(TextContent),
      shapeProperties: Schema.optional(ShapeProperties),
      shapeType: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Shape" }) as any as Schema.Schema<Shape>;

export interface LineFill {
  /** Solid color fill. */
  solidFill?: SolidFill;
}

export const LineFill: Schema.Schema<LineFill> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      solidFill: Schema.optional(SolidFill),
    }),
  ).annotate({ identifier: "LineFill" }) as any as Schema.Schema<LineFill>;

export interface LineConnection {
  /** The index of the connection site on the connected page element. In most cases, it corresponds to the predefined connection site index from the ECMA-376 standard. More information on those connection sites can be found in both the description of the "cxn" attribute in section 20.1.9.9 and "Annex H. Example Predefined DrawingML Shape and Text Geometries" of "Office Open XML File Formats - Fundamentals and Markup Language Reference", part 1 of [ECMA-376 5th edition](https://ecma-international.org/publications-and-standards/standards/ecma-376/). The position of each connection site can also be viewed from Slides editor. */
  connectionSiteIndex?: number;
  /** The object ID of the connected page element. Some page elements, such as groups, tables, and lines do not have connection sites and therefore cannot be connected to a connector line. */
  connectedObjectId?: string;
}

export const LineConnection: Schema.Schema<LineConnection> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      connectionSiteIndex: Schema.optional(Schema.Number),
      connectedObjectId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LineConnection",
  }) as any as Schema.Schema<LineConnection>;

export interface LineProperties {
  /** The thickness of the line. */
  weight?: Dimension;
  /** The style of the arrow at the end of the line. */
  endArrow?:
    | "ARROW_STYLE_UNSPECIFIED"
    | "NONE"
    | "STEALTH_ARROW"
    | "FILL_ARROW"
    | "FILL_CIRCLE"
    | "FILL_SQUARE"
    | "FILL_DIAMOND"
    | "OPEN_ARROW"
    | "OPEN_CIRCLE"
    | "OPEN_SQUARE"
    | "OPEN_DIAMOND"
    | (string & {});
  /** The fill of the line. The default line fill matches the defaults for new lines created in the Slides editor. */
  lineFill?: LineFill;
  /** The dash style of the line. */
  dashStyle?:
    | "DASH_STYLE_UNSPECIFIED"
    | "SOLID"
    | "DOT"
    | "DASH"
    | "DASH_DOT"
    | "LONG_DASH"
    | "LONG_DASH_DOT"
    | (string & {});
  /** The style of the arrow at the beginning of the line. */
  startArrow?:
    | "ARROW_STYLE_UNSPECIFIED"
    | "NONE"
    | "STEALTH_ARROW"
    | "FILL_ARROW"
    | "FILL_CIRCLE"
    | "FILL_SQUARE"
    | "FILL_DIAMOND"
    | "OPEN_ARROW"
    | "OPEN_CIRCLE"
    | "OPEN_SQUARE"
    | "OPEN_DIAMOND"
    | (string & {});
  /** The connection at the beginning of the line. If unset, there is no connection. Only lines with a Type indicating it is a "connector" can have a `start_connection`. */
  startConnection?: LineConnection;
  /** The connection at the end of the line. If unset, there is no connection. Only lines with a Type indicating it is a "connector" can have an `end_connection`. */
  endConnection?: LineConnection;
  /** The hyperlink destination of the line. If unset, there is no link. */
  link?: Link;
}

export const LineProperties: Schema.Schema<LineProperties> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      weight: Schema.optional(Dimension),
      endArrow: Schema.optional(Schema.String),
      lineFill: Schema.optional(LineFill),
      dashStyle: Schema.optional(Schema.String),
      startArrow: Schema.optional(Schema.String),
      startConnection: Schema.optional(LineConnection),
      endConnection: Schema.optional(LineConnection),
      link: Schema.optional(Link),
    }),
  ).annotate({
    identifier: "LineProperties",
  }) as any as Schema.Schema<LineProperties>;

export interface Line {
  /** The properties of the line. */
  lineProperties?: LineProperties;
  /** The type of the line. */
  lineType?:
    | "TYPE_UNSPECIFIED"
    | "STRAIGHT_CONNECTOR_1"
    | "BENT_CONNECTOR_2"
    | "BENT_CONNECTOR_3"
    | "BENT_CONNECTOR_4"
    | "BENT_CONNECTOR_5"
    | "CURVED_CONNECTOR_2"
    | "CURVED_CONNECTOR_3"
    | "CURVED_CONNECTOR_4"
    | "CURVED_CONNECTOR_5"
    | "STRAIGHT_LINE"
    | (string & {});
  /** The category of the line. It matches the `category` specified in CreateLineRequest, and can be updated with UpdateLineCategoryRequest. */
  lineCategory?:
    | "LINE_CATEGORY_UNSPECIFIED"
    | "STRAIGHT"
    | "BENT"
    | "CURVED"
    | (string & {});
}

export const Line: Schema.Schema<Line> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      lineProperties: Schema.optional(LineProperties),
      lineType: Schema.optional(Schema.String),
      lineCategory: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Line" }) as any as Schema.Schema<Line>;

export interface TableBorderCell {
  /** The location of the border within the border table. */
  location?: TableCellLocation;
  /** The border properties. */
  tableBorderProperties?: TableBorderProperties;
}

export const TableBorderCell: Schema.Schema<TableBorderCell> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      location: Schema.optional(TableCellLocation),
      tableBorderProperties: Schema.optional(TableBorderProperties),
    }),
  ).annotate({
    identifier: "TableBorderCell",
  }) as any as Schema.Schema<TableBorderCell>;

export interface TableBorderRow {
  /** Properties of each border cell. When a border's adjacent table cells are merged, it is not included in the response. */
  tableBorderCells?: Array<TableBorderCell>;
}

export const TableBorderRow: Schema.Schema<TableBorderRow> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      tableBorderCells: Schema.optional(Schema.Array(TableBorderCell)),
    }),
  ).annotate({
    identifier: "TableBorderRow",
  }) as any as Schema.Schema<TableBorderRow>;

export interface TableCell {
  /** The location of the cell within the table. */
  location?: TableCellLocation;
  /** The properties of the table cell. */
  tableCellProperties?: TableCellProperties;
  /** Column span of the cell. */
  columnSpan?: number;
  /** Row span of the cell. */
  rowSpan?: number;
  /** The text content of the cell. */
  text?: TextContent;
}

export const TableCell: Schema.Schema<TableCell> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      location: Schema.optional(TableCellLocation),
      tableCellProperties: Schema.optional(TableCellProperties),
      columnSpan: Schema.optional(Schema.Number),
      rowSpan: Schema.optional(Schema.Number),
      text: Schema.optional(TextContent),
    }),
  ).annotate({ identifier: "TableCell" }) as any as Schema.Schema<TableCell>;

export interface TableRowProperties {
  /** Minimum height of the row. The row will be rendered in the Slides editor at a height equal to or greater than this value in order to show all the text in the row's cell(s). */
  minRowHeight?: Dimension;
}

export const TableRowProperties: Schema.Schema<TableRowProperties> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      minRowHeight: Schema.optional(Dimension),
    }),
  ).annotate({
    identifier: "TableRowProperties",
  }) as any as Schema.Schema<TableRowProperties>;

export interface TableRow {
  /** Height of a row. */
  rowHeight?: Dimension;
  /** Properties and contents of each cell. Cells that span multiple columns are represented only once with a column_span greater than 1. As a result, the length of this collection does not always match the number of columns of the entire table. */
  tableCells?: Array<TableCell>;
  /** Properties of the row. */
  tableRowProperties?: TableRowProperties;
}

export const TableRow: Schema.Schema<TableRow> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      rowHeight: Schema.optional(Dimension),
      tableCells: Schema.optional(Schema.Array(TableCell)),
      tableRowProperties: Schema.optional(TableRowProperties),
    }),
  ).annotate({ identifier: "TableRow" }) as any as Schema.Schema<TableRow>;

export interface Table {
  /** Properties of each column. */
  tableColumns?: Array<TableColumnProperties>;
  /** Number of columns in the table. */
  columns?: number;
  /** Number of rows in the table. */
  rows?: number;
  /** Properties of vertical cell borders. A table's vertical cell borders are represented as a grid. The grid has the same number of rows as the table and one more column than the number of columns in the table. For example, if the table is 3 x 3, its vertical borders will be represented as a grid with 3 rows and 4 columns. */
  verticalBorderRows?: Array<TableBorderRow>;
  /** Properties and contents of each row. Cells that span multiple rows are contained in only one of these rows and have a row_span greater than 1. */
  tableRows?: Array<TableRow>;
  /** Properties of horizontal cell borders. A table's horizontal cell borders are represented as a grid. The grid has one more row than the number of rows in the table and the same number of columns as the table. For example, if the table is 3 x 3, its horizontal borders will be represented as a grid with 4 rows and 3 columns. */
  horizontalBorderRows?: Array<TableBorderRow>;
}

export const Table: Schema.Schema<Table> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      tableColumns: Schema.optional(Schema.Array(TableColumnProperties)),
      columns: Schema.optional(Schema.Number),
      rows: Schema.optional(Schema.Number),
      verticalBorderRows: Schema.optional(Schema.Array(TableBorderRow)),
      tableRows: Schema.optional(Schema.Array(TableRow)),
      horizontalBorderRows: Schema.optional(Schema.Array(TableBorderRow)),
    }),
  ).annotate({ identifier: "Table" }) as any as Schema.Schema<Table>;

export interface WordArt {
  /** The text rendered as word art. */
  renderedText?: string;
}

export const WordArt: Schema.Schema<WordArt> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      renderedText: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "WordArt" }) as any as Schema.Schema<WordArt>;

export interface PageElement {
  /** The description of the page element. Combined with title to display alt text. The field is not supported for Group elements. */
  description?: string;
  /** The transform of the page element. The visual appearance of the page element is determined by its absolute transform. To compute the absolute transform, preconcatenate a page element's transform with the transforms of all of its parent groups. If the page element is not in a group, its absolute transform is the same as the value in this field. The initial transform for the newly created Group is always the identity transform. */
  transform?: AffineTransform;
  /** A linked chart embedded from Google Sheets. Unlinked charts are represented as images. */
  sheetsChart?: SheetsChart;
  /** A collection of page elements joined as a single unit. */
  elementGroup?: Group;
  /** A Speaker Spotlight. */
  speakerSpotlight?: SpeakerSpotlight;
  /** The title of the page element. Combined with description to display alt text. The field is not supported for Group elements. */
  title?: string;
  /** The size of the page element. */
  size?: Size;
  /** The object ID for this page element. Object IDs used by google.apps.slides.v1.Page and google.apps.slides.v1.PageElement share the same namespace. */
  objectId?: string;
  /** A video page element. */
  video?: Video;
  /** An image page element. */
  image?: Image;
  /** A generic shape. */
  shape?: Shape;
  /** A line page element. */
  line?: Line;
  /** A table page element. */
  table?: Table;
  /** A word art page element. */
  wordArt?: WordArt;
}

export const PageElement: Schema.Schema<PageElement> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      description: Schema.optional(Schema.String),
      transform: Schema.optional(AffineTransform),
      sheetsChart: Schema.optional(SheetsChart),
      elementGroup: Schema.optional(Group),
      speakerSpotlight: Schema.optional(SpeakerSpotlight),
      title: Schema.optional(Schema.String),
      size: Schema.optional(Size),
      objectId: Schema.optional(Schema.String),
      video: Schema.optional(Video),
      image: Schema.optional(Image),
      shape: Schema.optional(Shape),
      line: Schema.optional(Line),
      table: Schema.optional(Table),
      wordArt: Schema.optional(WordArt),
    }),
  ).annotate({
    identifier: "PageElement",
  }) as any as Schema.Schema<PageElement>;

export interface MasterProperties {
  /** The human-readable name of the master. */
  displayName?: string;
}

export const MasterProperties: Schema.Schema<MasterProperties> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "MasterProperties",
  }) as any as Schema.Schema<MasterProperties>;

export interface Page {
  /** Slide specific properties. Only set if page_type = SLIDE. */
  slideProperties?: SlideProperties;
  /** The properties of the page. */
  pageProperties?: PageProperties;
  /** The type of the page. */
  pageType?:
    | "SLIDE"
    | "MASTER"
    | "LAYOUT"
    | "NOTES"
    | "NOTES_MASTER"
    | (string & {});
  /** Layout specific properties. Only set if page_type = LAYOUT. */
  layoutProperties?: LayoutProperties;
  /** The object ID for this page. Object IDs used by Page and PageElement share the same namespace. */
  objectId?: string;
  /** Notes specific properties. Only set if page_type = NOTES. */
  notesProperties?: NotesProperties;
  /** Output only. The revision ID of the presentation. Can be used in update requests to assert the presentation revision hasn't changed since the last read operation. Only populated if the user has edit access to the presentation. The revision ID is not a sequential number but an opaque string. The format of the revision ID might change over time. A returned revision ID is only guaranteed to be valid for 24 hours after it has been returned and cannot be shared across users. If the revision ID is unchanged between calls, then the presentation has not changed. Conversely, a changed ID (for the same presentation and user) usually means the presentation has been updated. However, a changed ID can also be due to internal factors such as ID format changes. */
  revisionId?: string;
  /** The page elements rendered on the page. */
  pageElements?: Array<PageElement>;
  /** Master specific properties. Only set if page_type = MASTER. */
  masterProperties?: MasterProperties;
}

export const Page: Schema.Schema<Page> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      slideProperties: Schema.optional(SlideProperties),
      pageProperties: Schema.optional(PageProperties),
      pageType: Schema.optional(Schema.String),
      layoutProperties: Schema.optional(LayoutProperties),
      objectId: Schema.optional(Schema.String),
      notesProperties: Schema.optional(NotesProperties),
      revisionId: Schema.optional(Schema.String),
      pageElements: Schema.optional(Schema.Array(PageElement)),
      masterProperties: Schema.optional(MasterProperties),
    }),
  ).annotate({ identifier: "Page" }) as any as Schema.Schema<Page>;

export interface SlideProperties {
  /** The object ID of the master that this slide is based on. This property is read-only. */
  masterObjectId?: string;
  /** The object ID of the layout that this slide is based on. This property is read-only. */
  layoutObjectId?: string;
  /** Whether the slide is skipped in the presentation mode. Defaults to false. */
  isSkipped?: boolean;
  /** The notes page that this slide is associated with. It defines the visual appearance of a notes page when printing or exporting slides with speaker notes. A notes page inherits properties from the notes master. The placeholder shape with type BODY on the notes page contains the speaker notes for this slide. The ID of this shape is identified by the speakerNotesObjectId field. The notes page is read-only except for the text content and styles of the speaker notes shape. This property is read-only. */
  notesPage?: Page;
}

export const SlideProperties: Schema.Schema<SlideProperties> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      masterObjectId: Schema.optional(Schema.String),
      layoutObjectId: Schema.optional(Schema.String),
      isSkipped: Schema.optional(Schema.Boolean),
      notesPage: Schema.optional(Page),
    }),
  ).annotate({
    identifier: "SlideProperties",
  }) as any as Schema.Schema<SlideProperties>;

export interface UpdateSlidePropertiesRequest {
  /** The object ID of the slide the update is applied to. */
  objectId?: string;
  /** The slide properties to update. */
  slideProperties?: SlideProperties;
  /** The fields that should be updated. At least one field must be specified. The root 'slideProperties' is implied and should not be specified. A single `"*"` can be used as short-hand for listing every field. For example to update whether a slide is skipped, set `fields` to `"isSkipped"`. To reset a property to its default value, include its field name in the field mask but leave the field itself unset. */
  fields?: string;
}

export const UpdateSlidePropertiesRequest: Schema.Schema<UpdateSlidePropertiesRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      objectId: Schema.optional(Schema.String),
      slideProperties: Schema.optional(SlideProperties),
      fields: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UpdateSlidePropertiesRequest",
  }) as any as Schema.Schema<UpdateSlidePropertiesRequest>;

export interface UngroupObjectsRequest {
  /** The object IDs of the objects to ungroup. Only groups that are not inside other groups can be ungrouped. All the groups should be on the same page. The group itself is deleted. The visual sizes and positions of all the children are preserved. */
  objectIds?: Array<string>;
}

export const UngroupObjectsRequest: Schema.Schema<UngroupObjectsRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      objectIds: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "UngroupObjectsRequest",
  }) as any as Schema.Schema<UngroupObjectsRequest>;

export interface RerouteLineRequest {
  /** The object ID of the line to reroute. Only a line with a category indicating it is a "connector" can be rerouted. The start and end connections of the line must be on different page elements. */
  objectId?: string;
}

export const RerouteLineRequest: Schema.Schema<RerouteLineRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      objectId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "RerouteLineRequest",
  }) as any as Schema.Schema<RerouteLineRequest>;

export interface InsertTableColumnsRequest {
  /** The number of columns to be inserted. Maximum 20 per request. */
  number?: number;
  /** Whether to insert new columns to the right of the reference cell location. - `True`: insert to the right. - `False`: insert to the left. */
  insertRight?: boolean;
  /** The table to insert columns into. */
  tableObjectId?: string;
  /** The reference table cell location from which columns will be inserted. A new column will be inserted to the left (or right) of the column where the reference cell is. If the reference cell is a merged cell, a new column will be inserted to the left (or right) of the merged cell. */
  cellLocation?: TableCellLocation;
}

export const InsertTableColumnsRequest: Schema.Schema<InsertTableColumnsRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      number: Schema.optional(Schema.Number),
      insertRight: Schema.optional(Schema.Boolean),
      tableObjectId: Schema.optional(Schema.String),
      cellLocation: Schema.optional(TableCellLocation),
    }),
  ).annotate({
    identifier: "InsertTableColumnsRequest",
  }) as any as Schema.Schema<InsertTableColumnsRequest>;

export interface DeleteObjectRequest {
  /** The object ID of the page or page element to delete. If after a delete operation a group contains only 1 or no page elements, the group is also deleted. If a placeholder is deleted on a layout, any empty inheriting placeholders are also deleted. */
  objectId?: string;
}

export const DeleteObjectRequest: Schema.Schema<DeleteObjectRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      objectId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DeleteObjectRequest",
  }) as any as Schema.Schema<DeleteObjectRequest>;

export interface DuplicateObjectRequest {
  /** The object being duplicated may contain other objects, for example when duplicating a slide or a group page element. This map defines how the IDs of duplicated objects are generated: the keys are the IDs of the original objects and its values are the IDs that will be assigned to the corresponding duplicate object. The ID of the source object's duplicate may be specified in this map as well, using the same value of the `object_id` field as a key and the newly desired ID as the value. All keys must correspond to existing IDs in the presentation. All values must be unique in the presentation and must start with an alphanumeric character or an underscore (matches regex `[a-zA-Z0-9_]`); remaining characters may include those as well as a hyphen or colon (matches regex `[a-zA-Z0-9_-:]`). The length of the new ID must not be less than 5 or greater than 50. If any IDs of source objects are omitted from the map, a new random ID will be assigned. If the map is empty or unset, all duplicate objects will receive a new random ID. */
  objectIds?: Record<string, string>;
  /** The ID of the object to duplicate. */
  objectId?: string;
}

export const DuplicateObjectRequest: Schema.Schema<DuplicateObjectRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      objectIds: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      objectId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DuplicateObjectRequest",
  }) as any as Schema.Schema<DuplicateObjectRequest>;

export interface UpdateParagraphStyleRequest {
  /** The range of text containing the paragraph(s) to style. */
  textRange?: Range;
  /** The paragraph's style. */
  style?: ParagraphStyle;
  /** The location of the cell in the table containing the paragraph(s) to style. If `object_id` refers to a table, `cell_location` must have a value. Otherwise, it must not. */
  cellLocation?: TableCellLocation;
  /** The object ID of the shape or table with the text to be styled. */
  objectId?: string;
  /** The fields that should be updated. At least one field must be specified. The root `style` is implied and should not be specified. A single `"*"` can be used as short-hand for listing every field. For example, to update the paragraph alignment, set `fields` to `"alignment"`. To reset a property to its default value, include its field name in the field mask but leave the field itself unset. */
  fields?: string;
}

export const UpdateParagraphStyleRequest: Schema.Schema<UpdateParagraphStyleRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      textRange: Schema.optional(Range),
      style: Schema.optional(ParagraphStyle),
      cellLocation: Schema.optional(TableCellLocation),
      objectId: Schema.optional(Schema.String),
      fields: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UpdateParagraphStyleRequest",
  }) as any as Schema.Schema<UpdateParagraphStyleRequest>;

export interface UpdateTableRowPropertiesRequest {
  /** The list of zero-based indices specifying which rows to update. If no indices are provided, all rows in the table will be updated. */
  rowIndices?: Array<number>;
  /** The table row properties to update. */
  tableRowProperties?: TableRowProperties;
  /** The object ID of the table. */
  objectId?: string;
  /** The fields that should be updated. At least one field must be specified. The root `tableRowProperties` is implied and should not be specified. A single `"*"` can be used as short-hand for listing every field. For example to update the minimum row height, set `fields` to `"min_row_height"`. If '"min_row_height"' is included in the field mask but the property is left unset, the minimum row height will default to 0. */
  fields?: string;
}

export const UpdateTableRowPropertiesRequest: Schema.Schema<UpdateTableRowPropertiesRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      rowIndices: Schema.optional(Schema.Array(Schema.Number)),
      tableRowProperties: Schema.optional(TableRowProperties),
      objectId: Schema.optional(Schema.String),
      fields: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UpdateTableRowPropertiesRequest",
  }) as any as Schema.Schema<UpdateTableRowPropertiesRequest>;

export interface ReplaceAllTextRequest {
  /** Finds text in a shape matching this substring. */
  containsText?: SubstringMatchCriteria;
  /** The text that will replace the matched text. */
  replaceText?: string;
  /** If non-empty, limits the matches to page elements only on the given pages. Returns a 400 bad request error if given the page object ID of a notes master, or if a page with that object ID doesn't exist in the presentation. */
  pageObjectIds?: Array<string>;
}

export const ReplaceAllTextRequest: Schema.Schema<ReplaceAllTextRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      containsText: Schema.optional(SubstringMatchCriteria),
      replaceText: Schema.optional(Schema.String),
      pageObjectIds: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ReplaceAllTextRequest",
  }) as any as Schema.Schema<ReplaceAllTextRequest>;

export interface CreateLineRequest {
  /** The element properties for the line. */
  elementProperties?: PageElementProperties;
  /** The category of the line to be created. *Deprecated*: use `category` instead. The exact line type created is determined based on the category and how it's routed to connect to other page elements. If you specify both a `category` and a `line_category`, the `category` takes precedence. */
  lineCategory?: "STRAIGHT" | "BENT" | "CURVED" | (string & {});
  /** A user-supplied object ID. If you specify an ID, it must be unique among all pages and page elements in the presentation. The ID must start with an alphanumeric character or an underscore (matches regex `[a-zA-Z0-9_]`); remaining characters may include those as well as a hyphen or colon (matches regex `[a-zA-Z0-9_-:]`). The length of the ID must not be less than 5 or greater than 50. If you don't specify an ID, a unique one is generated. */
  objectId?: string;
  /** The category of the line to be created. The exact line type created is determined based on the category and how it's routed to connect to other page elements. If you specify both a `category` and a `line_category`, the `category` takes precedence. If you do not specify a value for `category`, but specify a value for `line_category`, then the specified `line_category` value is used. If you do not specify either, then STRAIGHT is used. */
  category?:
    | "LINE_CATEGORY_UNSPECIFIED"
    | "STRAIGHT"
    | "BENT"
    | "CURVED"
    | (string & {});
}

export const CreateLineRequest: Schema.Schema<CreateLineRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      elementProperties: Schema.optional(PageElementProperties),
      lineCategory: Schema.optional(Schema.String),
      objectId: Schema.optional(Schema.String),
      category: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CreateLineRequest",
  }) as any as Schema.Schema<CreateLineRequest>;

export interface GroupObjectsRequest {
  /** A user-supplied object ID for the group to be created. If you specify an ID, it must be unique among all pages and page elements in the presentation. The ID must start with an alphanumeric character or an underscore (matches regex `[a-zA-Z0-9_]`); remaining characters may include those as well as a hyphen or colon (matches regex `[a-zA-Z0-9_-:]`). The length of the ID must not be less than 5 or greater than 50. If you don't specify an ID, a unique one is generated. */
  groupObjectId?: string;
  /** The object IDs of the objects to group. Only page elements can be grouped. There should be at least two page elements on the same page that are not already in another group. Some page elements, such as videos, tables and placeholders cannot be grouped. */
  childrenObjectIds?: Array<string>;
}

export const GroupObjectsRequest: Schema.Schema<GroupObjectsRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      groupObjectId: Schema.optional(Schema.String),
      childrenObjectIds: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "GroupObjectsRequest",
  }) as any as Schema.Schema<GroupObjectsRequest>;

export interface InsertTextRequest {
  /** The text to be inserted. Inserting a newline character will implicitly create a new ParagraphMarker at that index. The paragraph style of the new paragraph will be copied from the paragraph at the current insertion index, including lists and bullets. Text styles for inserted text will be determined automatically, generally preserving the styling of neighboring text. In most cases, the text will be added to the TextRun that exists at the insertion index. Some control characters (U+0000-U+0008, U+000C-U+001F) and characters from the Unicode Basic Multilingual Plane Private Use Area (U+E000-U+F8FF) will be stripped out of the inserted text. */
  text?: string;
  /** The object ID of the shape or table where the text will be inserted. */
  objectId?: string;
  /** The optional table cell location if the text is to be inserted into a table cell. If present, the object_id must refer to a table. */
  cellLocation?: TableCellLocation;
  /** The index where the text will be inserted, in Unicode code units, based on TextElement indexes. The index is zero-based and is computed from the start of the string. The index may be adjusted to prevent insertions inside Unicode grapheme clusters. In these cases, the text will be inserted immediately after the grapheme cluster. */
  insertionIndex?: number;
}

export const InsertTextRequest: Schema.Schema<InsertTextRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      text: Schema.optional(Schema.String),
      objectId: Schema.optional(Schema.String),
      cellLocation: Schema.optional(TableCellLocation),
      insertionIndex: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "InsertTextRequest",
  }) as any as Schema.Schema<InsertTextRequest>;

export interface UpdateLinePropertiesRequest {
  /** The line properties to update. */
  lineProperties?: LineProperties;
  /** The fields that should be updated. At least one field must be specified. The root `lineProperties` is implied and should not be specified. A single `"*"` can be used as short-hand for listing every field. For example to update the line solid fill color, set `fields` to `"lineFill.solidFill.color"`. To reset a property to its default value, include its field name in the field mask but leave the field itself unset. */
  fields?: string;
  /** The object ID of the line the update is applied to. */
  objectId?: string;
}

export const UpdateLinePropertiesRequest: Schema.Schema<UpdateLinePropertiesRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      lineProperties: Schema.optional(LineProperties),
      fields: Schema.optional(Schema.String),
      objectId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UpdateLinePropertiesRequest",
  }) as any as Schema.Schema<UpdateLinePropertiesRequest>;

export interface CreateSheetsChartRequest {
  /** The ID of the Google Sheets spreadsheet that contains the chart. You might need to add a resource key to the HTTP header for a subset of old files. For more information, see [Access link-shared files using resource keys](https://developers.google.com/drive/api/v3/resource-keys). */
  spreadsheetId?: string;
  /** The element properties for the chart. When the aspect ratio of the provided size does not match the chart aspect ratio, the chart is scaled and centered with respect to the size in order to maintain aspect ratio. The provided transform is applied after this operation. */
  elementProperties?: PageElementProperties;
  /** The mode with which the chart is linked to the source spreadsheet. When not specified, the chart will be an image that is not linked. */
  linkingMode?: "NOT_LINKED_IMAGE" | "LINKED" | (string & {});
  /** The ID of the specific chart in the Google Sheets spreadsheet. */
  chartId?: number;
  /** A user-supplied object ID. If specified, the ID must be unique among all pages and page elements in the presentation. The ID should start with a word character [a-zA-Z0-9_] and then followed by any number of the following characters [a-zA-Z0-9_-:]. The length of the ID should not be less than 5 or greater than 50. If empty, a unique identifier will be generated. */
  objectId?: string;
}

export const CreateSheetsChartRequest: Schema.Schema<CreateSheetsChartRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      spreadsheetId: Schema.optional(Schema.String),
      elementProperties: Schema.optional(PageElementProperties),
      linkingMode: Schema.optional(Schema.String),
      chartId: Schema.optional(Schema.Number),
      objectId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CreateSheetsChartRequest",
  }) as any as Schema.Schema<CreateSheetsChartRequest>;

export interface CreateShapeRequest {
  /** A user-supplied object ID. If you specify an ID, it must be unique among all pages and page elements in the presentation. The ID must start with an alphanumeric character or an underscore (matches regex `[a-zA-Z0-9_]`); remaining characters may include those as well as a hyphen or colon (matches regex `[a-zA-Z0-9_-:]`). The length of the ID must not be less than 5 or greater than 50. If empty, a unique identifier will be generated. */
  objectId?: string;
  /** The element properties for the shape. */
  elementProperties?: PageElementProperties;
  /** The shape type. */
  shapeType?:
    | "TYPE_UNSPECIFIED"
    | "TEXT_BOX"
    | "RECTANGLE"
    | "ROUND_RECTANGLE"
    | "ELLIPSE"
    | "ARC"
    | "BENT_ARROW"
    | "BENT_UP_ARROW"
    | "BEVEL"
    | "BLOCK_ARC"
    | "BRACE_PAIR"
    | "BRACKET_PAIR"
    | "CAN"
    | "CHEVRON"
    | "CHORD"
    | "CLOUD"
    | "CORNER"
    | "CUBE"
    | "CURVED_DOWN_ARROW"
    | "CURVED_LEFT_ARROW"
    | "CURVED_RIGHT_ARROW"
    | "CURVED_UP_ARROW"
    | "DECAGON"
    | "DIAGONAL_STRIPE"
    | "DIAMOND"
    | "DODECAGON"
    | "DONUT"
    | "DOUBLE_WAVE"
    | "DOWN_ARROW"
    | "DOWN_ARROW_CALLOUT"
    | "FOLDED_CORNER"
    | "FRAME"
    | "HALF_FRAME"
    | "HEART"
    | "HEPTAGON"
    | "HEXAGON"
    | "HOME_PLATE"
    | "HORIZONTAL_SCROLL"
    | "IRREGULAR_SEAL_1"
    | "IRREGULAR_SEAL_2"
    | "LEFT_ARROW"
    | "LEFT_ARROW_CALLOUT"
    | "LEFT_BRACE"
    | "LEFT_BRACKET"
    | "LEFT_RIGHT_ARROW"
    | "LEFT_RIGHT_ARROW_CALLOUT"
    | "LEFT_RIGHT_UP_ARROW"
    | "LEFT_UP_ARROW"
    | "LIGHTNING_BOLT"
    | "MATH_DIVIDE"
    | "MATH_EQUAL"
    | "MATH_MINUS"
    | "MATH_MULTIPLY"
    | "MATH_NOT_EQUAL"
    | "MATH_PLUS"
    | "MOON"
    | "NO_SMOKING"
    | "NOTCHED_RIGHT_ARROW"
    | "OCTAGON"
    | "PARALLELOGRAM"
    | "PENTAGON"
    | "PIE"
    | "PLAQUE"
    | "PLUS"
    | "QUAD_ARROW"
    | "QUAD_ARROW_CALLOUT"
    | "RIBBON"
    | "RIBBON_2"
    | "RIGHT_ARROW"
    | "RIGHT_ARROW_CALLOUT"
    | "RIGHT_BRACE"
    | "RIGHT_BRACKET"
    | "ROUND_1_RECTANGLE"
    | "ROUND_2_DIAGONAL_RECTANGLE"
    | "ROUND_2_SAME_RECTANGLE"
    | "RIGHT_TRIANGLE"
    | "SMILEY_FACE"
    | "SNIP_1_RECTANGLE"
    | "SNIP_2_DIAGONAL_RECTANGLE"
    | "SNIP_2_SAME_RECTANGLE"
    | "SNIP_ROUND_RECTANGLE"
    | "STAR_10"
    | "STAR_12"
    | "STAR_16"
    | "STAR_24"
    | "STAR_32"
    | "STAR_4"
    | "STAR_5"
    | "STAR_6"
    | "STAR_7"
    | "STAR_8"
    | "STRIPED_RIGHT_ARROW"
    | "SUN"
    | "TRAPEZOID"
    | "TRIANGLE"
    | "UP_ARROW"
    | "UP_ARROW_CALLOUT"
    | "UP_DOWN_ARROW"
    | "UTURN_ARROW"
    | "VERTICAL_SCROLL"
    | "WAVE"
    | "WEDGE_ELLIPSE_CALLOUT"
    | "WEDGE_RECTANGLE_CALLOUT"
    | "WEDGE_ROUND_RECTANGLE_CALLOUT"
    | "FLOW_CHART_ALTERNATE_PROCESS"
    | "FLOW_CHART_COLLATE"
    | "FLOW_CHART_CONNECTOR"
    | "FLOW_CHART_DECISION"
    | "FLOW_CHART_DELAY"
    | "FLOW_CHART_DISPLAY"
    | "FLOW_CHART_DOCUMENT"
    | "FLOW_CHART_EXTRACT"
    | "FLOW_CHART_INPUT_OUTPUT"
    | "FLOW_CHART_INTERNAL_STORAGE"
    | "FLOW_CHART_MAGNETIC_DISK"
    | "FLOW_CHART_MAGNETIC_DRUM"
    | "FLOW_CHART_MAGNETIC_TAPE"
    | "FLOW_CHART_MANUAL_INPUT"
    | "FLOW_CHART_MANUAL_OPERATION"
    | "FLOW_CHART_MERGE"
    | "FLOW_CHART_MULTIDOCUMENT"
    | "FLOW_CHART_OFFLINE_STORAGE"
    | "FLOW_CHART_OFFPAGE_CONNECTOR"
    | "FLOW_CHART_ONLINE_STORAGE"
    | "FLOW_CHART_OR"
    | "FLOW_CHART_PREDEFINED_PROCESS"
    | "FLOW_CHART_PREPARATION"
    | "FLOW_CHART_PROCESS"
    | "FLOW_CHART_PUNCHED_CARD"
    | "FLOW_CHART_PUNCHED_TAPE"
    | "FLOW_CHART_SORT"
    | "FLOW_CHART_SUMMING_JUNCTION"
    | "FLOW_CHART_TERMINATOR"
    | "ARROW_EAST"
    | "ARROW_NORTH_EAST"
    | "ARROW_NORTH"
    | "SPEECH"
    | "STARBURST"
    | "TEARDROP"
    | "ELLIPSE_RIBBON"
    | "ELLIPSE_RIBBON_2"
    | "CLOUD_CALLOUT"
    | "CUSTOM"
    | (string & {});
}

export const CreateShapeRequest: Schema.Schema<CreateShapeRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      objectId: Schema.optional(Schema.String),
      elementProperties: Schema.optional(PageElementProperties),
      shapeType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CreateShapeRequest",
  }) as any as Schema.Schema<CreateShapeRequest>;

export interface UpdatePageElementTransformRequest {
  /** The apply mode of the transform update. */
  applyMode?:
    | "APPLY_MODE_UNSPECIFIED"
    | "RELATIVE"
    | "ABSOLUTE"
    | (string & {});
  /** The object ID of the page element to update. */
  objectId?: string;
  /** The input transform matrix used to update the page element. */
  transform?: AffineTransform;
}

export const UpdatePageElementTransformRequest: Schema.Schema<UpdatePageElementTransformRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      applyMode: Schema.optional(Schema.String),
      objectId: Schema.optional(Schema.String),
      transform: Schema.optional(AffineTransform),
    }),
  ).annotate({
    identifier: "UpdatePageElementTransformRequest",
  }) as any as Schema.Schema<UpdatePageElementTransformRequest>;

export interface ReplaceAllShapesWithSheetsChartRequest {
  /** The ID of the Google Sheets spreadsheet that contains the chart. */
  spreadsheetId?: string;
  /** The criteria that the shapes must match in order to be replaced. The request will replace all of the shapes that contain the given text. */
  containsText?: SubstringMatchCriteria;
  /** The mode with which the chart is linked to the source spreadsheet. When not specified, the chart will be an image that is not linked. */
  linkingMode?: "NOT_LINKED_IMAGE" | "LINKED" | (string & {});
  /** If non-empty, limits the matches to page elements only on the given pages. Returns a 400 bad request error if given the page object ID of a notes page or a notes master, or if a page with that object ID doesn't exist in the presentation. */
  pageObjectIds?: Array<string>;
  /** The ID of the specific chart in the Google Sheets spreadsheet. */
  chartId?: number;
}

export const ReplaceAllShapesWithSheetsChartRequest: Schema.Schema<ReplaceAllShapesWithSheetsChartRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      spreadsheetId: Schema.optional(Schema.String),
      containsText: Schema.optional(SubstringMatchCriteria),
      linkingMode: Schema.optional(Schema.String),
      pageObjectIds: Schema.optional(Schema.Array(Schema.String)),
      chartId: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "ReplaceAllShapesWithSheetsChartRequest",
  }) as any as Schema.Schema<ReplaceAllShapesWithSheetsChartRequest>;

export interface Request {
  /** Creates an image. */
  createImage?: CreateImageRequest;
  /** Updates the properties of a Shape. */
  updateShapeProperties?: UpdateShapePropertiesRequest;
  /** Inserts rows into a table. */
  insertTableRows?: InsertTableRowsRequest;
  /** Unmerges cells in a Table. */
  unmergeTableCells?: UnmergeTableCellsRequest;
  /** Replaces all shapes matching some criteria with an image. */
  replaceAllShapesWithImage?: ReplaceAllShapesWithImageRequest;
  /** Deletes a column from a table. */
  deleteTableColumn?: DeleteTableColumnRequest;
  /** Creates bullets for paragraphs. */
  createParagraphBullets?: CreateParagraphBulletsRequest;
  /** Updates the properties of the table borders in a Table. */
  updateTableBorderProperties?: UpdateTableBorderPropertiesRequest;
  /** Updates the styling of text within a Shape or Table. */
  updateTextStyle?: UpdateTextStyleRequest;
  /** Deletes a row from a table. */
  deleteTableRow?: DeleteTableRowRequest;
  /** Updates the properties of an Image. */
  updateImageProperties?: UpdateImagePropertiesRequest;
  /** Updates the properties of a Page. */
  updatePageProperties?: UpdatePagePropertiesRequest;
  /** Merges cells in a Table. */
  mergeTableCells?: MergeTableCellsRequest;
  /** Updates the category of a line. */
  updateLineCategory?: UpdateLineCategoryRequest;
  /** Updates the properties of a Table column. */
  updateTableColumnProperties?: UpdateTableColumnPropertiesRequest;
  /** Deletes text from a shape or a table cell. */
  deleteText?: DeleteTextRequest;
  /** Updates the alt text title and/or description of a page element. */
  updatePageElementAltText?: UpdatePageElementAltTextRequest;
  /** Creates a new table. */
  createTable?: CreateTableRequest;
  /** Refreshes a Google Sheets chart. */
  refreshSheetsChart?: RefreshSheetsChartRequest;
  /** Updates the properties of a Video. */
  updateVideoProperties?: UpdateVideoPropertiesRequest;
  /** Creates a video. */
  createVideo?: CreateVideoRequest;
  /** Creates a new slide. */
  createSlide?: CreateSlideRequest;
  /** Updates the properties of a TableCell. */
  updateTableCellProperties?: UpdateTableCellPropertiesRequest;
  /** Deletes bullets from paragraphs. */
  deleteParagraphBullets?: DeleteParagraphBulletsRequest;
  /** Updates the Z-order of page elements. */
  updatePageElementsZOrder?: UpdatePageElementsZOrderRequest;
  /** Updates the position of a set of slides in the presentation. */
  updateSlidesPosition?: UpdateSlidesPositionRequest;
  /** Replaces an existing image with a new image. */
  replaceImage?: ReplaceImageRequest;
  /** Updates the properties of a Slide */
  updateSlideProperties?: UpdateSlidePropertiesRequest;
  /** Ungroups objects, such as groups. */
  ungroupObjects?: UngroupObjectsRequest;
  /** Reroutes a line such that it's connected at the two closest connection sites on the connected page elements. */
  rerouteLine?: RerouteLineRequest;
  /** Inserts columns into a table. */
  insertTableColumns?: InsertTableColumnsRequest;
  /** Deletes a page or page element from the presentation. */
  deleteObject?: DeleteObjectRequest;
  /** Duplicates a slide or page element. */
  duplicateObject?: DuplicateObjectRequest;
  /** Updates the styling of paragraphs within a Shape or Table. */
  updateParagraphStyle?: UpdateParagraphStyleRequest;
  /** Updates the properties of a Table row. */
  updateTableRowProperties?: UpdateTableRowPropertiesRequest;
  /** Replaces all instances of specified text. */
  replaceAllText?: ReplaceAllTextRequest;
  /** Creates a line. */
  createLine?: CreateLineRequest;
  /** Groups objects, such as page elements. */
  groupObjects?: GroupObjectsRequest;
  /** Inserts text into a shape or table cell. */
  insertText?: InsertTextRequest;
  /** Updates the properties of a Line. */
  updateLineProperties?: UpdateLinePropertiesRequest;
  /** Creates an embedded Google Sheets chart. */
  createSheetsChart?: CreateSheetsChartRequest;
  /** Creates a new shape. */
  createShape?: CreateShapeRequest;
  /** Updates the transform of a page element. */
  updatePageElementTransform?: UpdatePageElementTransformRequest;
  /** Replaces all shapes matching some criteria with a Google Sheets chart. */
  replaceAllShapesWithSheetsChart?: ReplaceAllShapesWithSheetsChartRequest;
}

export const Request: Schema.Schema<Request> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      createImage: Schema.optional(CreateImageRequest),
      updateShapeProperties: Schema.optional(UpdateShapePropertiesRequest),
      insertTableRows: Schema.optional(InsertTableRowsRequest),
      unmergeTableCells: Schema.optional(UnmergeTableCellsRequest),
      replaceAllShapesWithImage: Schema.optional(
        ReplaceAllShapesWithImageRequest,
      ),
      deleteTableColumn: Schema.optional(DeleteTableColumnRequest),
      createParagraphBullets: Schema.optional(CreateParagraphBulletsRequest),
      updateTableBorderProperties: Schema.optional(
        UpdateTableBorderPropertiesRequest,
      ),
      updateTextStyle: Schema.optional(UpdateTextStyleRequest),
      deleteTableRow: Schema.optional(DeleteTableRowRequest),
      updateImageProperties: Schema.optional(UpdateImagePropertiesRequest),
      updatePageProperties: Schema.optional(UpdatePagePropertiesRequest),
      mergeTableCells: Schema.optional(MergeTableCellsRequest),
      updateLineCategory: Schema.optional(UpdateLineCategoryRequest),
      updateTableColumnProperties: Schema.optional(
        UpdateTableColumnPropertiesRequest,
      ),
      deleteText: Schema.optional(DeleteTextRequest),
      updatePageElementAltText: Schema.optional(
        UpdatePageElementAltTextRequest,
      ),
      createTable: Schema.optional(CreateTableRequest),
      refreshSheetsChart: Schema.optional(RefreshSheetsChartRequest),
      updateVideoProperties: Schema.optional(UpdateVideoPropertiesRequest),
      createVideo: Schema.optional(CreateVideoRequest),
      createSlide: Schema.optional(CreateSlideRequest),
      updateTableCellProperties: Schema.optional(
        UpdateTableCellPropertiesRequest,
      ),
      deleteParagraphBullets: Schema.optional(DeleteParagraphBulletsRequest),
      updatePageElementsZOrder: Schema.optional(
        UpdatePageElementsZOrderRequest,
      ),
      updateSlidesPosition: Schema.optional(UpdateSlidesPositionRequest),
      replaceImage: Schema.optional(ReplaceImageRequest),
      updateSlideProperties: Schema.optional(UpdateSlidePropertiesRequest),
      ungroupObjects: Schema.optional(UngroupObjectsRequest),
      rerouteLine: Schema.optional(RerouteLineRequest),
      insertTableColumns: Schema.optional(InsertTableColumnsRequest),
      deleteObject: Schema.optional(DeleteObjectRequest),
      duplicateObject: Schema.optional(DuplicateObjectRequest),
      updateParagraphStyle: Schema.optional(UpdateParagraphStyleRequest),
      updateTableRowProperties: Schema.optional(
        UpdateTableRowPropertiesRequest,
      ),
      replaceAllText: Schema.optional(ReplaceAllTextRequest),
      createLine: Schema.optional(CreateLineRequest),
      groupObjects: Schema.optional(GroupObjectsRequest),
      insertText: Schema.optional(InsertTextRequest),
      updateLineProperties: Schema.optional(UpdateLinePropertiesRequest),
      createSheetsChart: Schema.optional(CreateSheetsChartRequest),
      createShape: Schema.optional(CreateShapeRequest),
      updatePageElementTransform: Schema.optional(
        UpdatePageElementTransformRequest,
      ),
      replaceAllShapesWithSheetsChart: Schema.optional(
        ReplaceAllShapesWithSheetsChartRequest,
      ),
    }),
  ).annotate({ identifier: "Request" }) as any as Schema.Schema<Request>;

export interface CreateVideoResponse {
  /** The object ID of the created video. */
  objectId?: string;
}

export const CreateVideoResponse: Schema.Schema<CreateVideoResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      objectId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CreateVideoResponse",
  }) as any as Schema.Schema<CreateVideoResponse>;

export interface DuplicateObjectResponse {
  /** The ID of the new duplicate object. */
  objectId?: string;
}

export const DuplicateObjectResponse: Schema.Schema<DuplicateObjectResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      objectId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DuplicateObjectResponse",
  }) as any as Schema.Schema<DuplicateObjectResponse>;

export interface Presentation {
  /** The title of the presentation. */
  title?: string;
  /** The layouts in the presentation. A layout is a template that determines how content is arranged and styled on the slides that inherit from that layout. */
  layouts?: Array<Page>;
  /** The locale of the presentation, as an IETF BCP 47 language tag. */
  locale?: string;
  /** The slides in the presentation. A slide inherits properties from a slide layout. */
  slides?: Array<Page>;
  /** The notes master in the presentation. It serves three purposes: - Placeholder shapes on a notes master contain the default text styles and shape properties of all placeholder shapes on notes pages. Specifically, a `SLIDE_IMAGE` placeholder shape contains the slide thumbnail, and a `BODY` placeholder shape contains the speaker notes. - The notes master page properties define the common page properties inherited by all notes pages. - Any other shapes on the notes master appear on all notes pages. The notes master is read-only. */
  notesMaster?: Page;
  /** The slide masters in the presentation. A slide master contains all common page elements and the common properties for a set of layouts. They serve three purposes: - Placeholder shapes on a master contain the default text styles and shape properties of all placeholder shapes on pages that use that master. - The master page properties define the common page properties inherited by its layouts. - Any other shapes on the master slide appear on all slides using that master, regardless of their layout. */
  masters?: Array<Page>;
  /** Output only. The revision ID of the presentation. Can be used in update requests to assert the presentation revision hasn't changed since the last read operation. Only populated if the user has edit access to the presentation. The revision ID is not a sequential number but a nebulous string. The format of the revision ID may change over time, so it should be treated opaquely. A returned revision ID is only guaranteed to be valid for 24 hours after it has been returned and cannot be shared across users. If the revision ID is unchanged between calls, then the presentation has not changed. Conversely, a changed ID (for the same presentation and user) usually means the presentation has been updated. However, a changed ID can also be due to internal factors such as ID format changes. */
  revisionId?: string;
  /** The ID of the presentation. */
  presentationId?: string;
  /** The size of pages in the presentation. */
  pageSize?: Size;
}

export const Presentation: Schema.Schema<Presentation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      title: Schema.optional(Schema.String),
      layouts: Schema.optional(Schema.Array(Page)),
      locale: Schema.optional(Schema.String),
      slides: Schema.optional(Schema.Array(Page)),
      notesMaster: Schema.optional(Page),
      masters: Schema.optional(Schema.Array(Page)),
      revisionId: Schema.optional(Schema.String),
      presentationId: Schema.optional(Schema.String),
      pageSize: Schema.optional(Size),
    }),
  ).annotate({
    identifier: "Presentation",
  }) as any as Schema.Schema<Presentation>;

export interface ReplaceAllShapesWithImageResponse {
  /** The number of shapes replaced with images. */
  occurrencesChanged?: number;
}

export const ReplaceAllShapesWithImageResponse: Schema.Schema<ReplaceAllShapesWithImageResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      occurrencesChanged: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "ReplaceAllShapesWithImageResponse",
  }) as any as Schema.Schema<ReplaceAllShapesWithImageResponse>;

export interface CreateImageResponse {
  /** The object ID of the created image. */
  objectId?: string;
}

export const CreateImageResponse: Schema.Schema<CreateImageResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      objectId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CreateImageResponse",
  }) as any as Schema.Schema<CreateImageResponse>;

export interface WriteControl {
  /** The revision ID of the presentation required for the write request. If specified and the required revision ID doesn't match the presentation's current revision ID, the request is not processed and returns a 400 bad request error. When a required revision ID is returned in a response, it indicates the revision ID of the document after the request was applied. */
  requiredRevisionId?: string;
}

export const WriteControl: Schema.Schema<WriteControl> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      requiredRevisionId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "WriteControl",
  }) as any as Schema.Schema<WriteControl>;

export interface CreateSlideResponse {
  /** The object ID of the created slide. */
  objectId?: string;
}

export const CreateSlideResponse: Schema.Schema<CreateSlideResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      objectId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CreateSlideResponse",
  }) as any as Schema.Schema<CreateSlideResponse>;

export interface GroupObjectsResponse {
  /** The object ID of the created group. */
  objectId?: string;
}

export const GroupObjectsResponse: Schema.Schema<GroupObjectsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      objectId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GroupObjectsResponse",
  }) as any as Schema.Schema<GroupObjectsResponse>;

export interface CreateTableResponse {
  /** The object ID of the created table. */
  objectId?: string;
}

export const CreateTableResponse: Schema.Schema<CreateTableResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      objectId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CreateTableResponse",
  }) as any as Schema.Schema<CreateTableResponse>;

export interface CreateLineResponse {
  /** The object ID of the created line. */
  objectId?: string;
}

export const CreateLineResponse: Schema.Schema<CreateLineResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      objectId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CreateLineResponse",
  }) as any as Schema.Schema<CreateLineResponse>;

export interface ReplaceAllShapesWithSheetsChartResponse {
  /** The number of shapes replaced with charts. */
  occurrencesChanged?: number;
}

export const ReplaceAllShapesWithSheetsChartResponse: Schema.Schema<ReplaceAllShapesWithSheetsChartResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      occurrencesChanged: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "ReplaceAllShapesWithSheetsChartResponse",
  }) as any as Schema.Schema<ReplaceAllShapesWithSheetsChartResponse>;

export interface CreateShapeResponse {
  /** The object ID of the created shape. */
  objectId?: string;
}

export const CreateShapeResponse: Schema.Schema<CreateShapeResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      objectId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CreateShapeResponse",
  }) as any as Schema.Schema<CreateShapeResponse>;

export interface CreateSheetsChartResponse {
  /** The object ID of the created chart. */
  objectId?: string;
}

export const CreateSheetsChartResponse: Schema.Schema<CreateSheetsChartResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      objectId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CreateSheetsChartResponse",
  }) as any as Schema.Schema<CreateSheetsChartResponse>;

export interface ReplaceAllTextResponse {
  /** The number of occurrences changed by replacing all text. */
  occurrencesChanged?: number;
}

export const ReplaceAllTextResponse: Schema.Schema<ReplaceAllTextResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      occurrencesChanged: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "ReplaceAllTextResponse",
  }) as any as Schema.Schema<ReplaceAllTextResponse>;

export interface Response {
  /** The result of creating a slide. */
  createSlide?: CreateSlideResponse;
  /** The result of creating an image. */
  createImage?: CreateImageResponse;
  /** The result of grouping objects. */
  groupObjects?: GroupObjectsResponse;
  /** The result of replacing all shapes matching some criteria with an image. */
  replaceAllShapesWithImage?: ReplaceAllShapesWithImageResponse;
  /** The result of duplicating an object. */
  duplicateObject?: DuplicateObjectResponse;
  /** The result of creating a table. */
  createTable?: CreateTableResponse;
  /** The result of creating a line. */
  createLine?: CreateLineResponse;
  /** The result of replacing all shapes matching some criteria with a Google Sheets chart. */
  replaceAllShapesWithSheetsChart?: ReplaceAllShapesWithSheetsChartResponse;
  /** The result of creating a video. */
  createVideo?: CreateVideoResponse;
  /** The result of creating a shape. */
  createShape?: CreateShapeResponse;
  /** The result of creating a Google Sheets chart. */
  createSheetsChart?: CreateSheetsChartResponse;
  /** The result of replacing text. */
  replaceAllText?: ReplaceAllTextResponse;
}

export const Response: Schema.Schema<Response> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      createSlide: Schema.optional(CreateSlideResponse),
      createImage: Schema.optional(CreateImageResponse),
      groupObjects: Schema.optional(GroupObjectsResponse),
      replaceAllShapesWithImage: Schema.optional(
        ReplaceAllShapesWithImageResponse,
      ),
      duplicateObject: Schema.optional(DuplicateObjectResponse),
      createTable: Schema.optional(CreateTableResponse),
      createLine: Schema.optional(CreateLineResponse),
      replaceAllShapesWithSheetsChart: Schema.optional(
        ReplaceAllShapesWithSheetsChartResponse,
      ),
      createVideo: Schema.optional(CreateVideoResponse),
      createShape: Schema.optional(CreateShapeResponse),
      createSheetsChart: Schema.optional(CreateSheetsChartResponse),
      replaceAllText: Schema.optional(ReplaceAllTextResponse),
    }),
  ).annotate({ identifier: "Response" }) as any as Schema.Schema<Response>;

export interface BatchUpdatePresentationResponse {
  /** The updated write control after applying the request. */
  writeControl?: WriteControl;
  /** The presentation the updates were applied to. */
  presentationId?: string;
  /** The reply of the updates. This maps 1:1 with the updates, although replies to some requests may be empty. */
  replies?: Array<Response>;
}

export const BatchUpdatePresentationResponse: Schema.Schema<BatchUpdatePresentationResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      writeControl: Schema.optional(WriteControl),
      presentationId: Schema.optional(Schema.String),
      replies: Schema.optional(Schema.Array(Response)),
    }),
  ).annotate({
    identifier: "BatchUpdatePresentationResponse",
  }) as any as Schema.Schema<BatchUpdatePresentationResponse>;

export interface BatchUpdatePresentationRequest {
  /** A list of updates to apply to the presentation. */
  requests?: Array<Request>;
  /** Provides control over how write requests are executed. */
  writeControl?: WriteControl;
}

export const BatchUpdatePresentationRequest: Schema.Schema<BatchUpdatePresentationRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      requests: Schema.optional(Schema.Array(Request)),
      writeControl: Schema.optional(WriteControl),
    }),
  ).annotate({
    identifier: "BatchUpdatePresentationRequest",
  }) as any as Schema.Schema<BatchUpdatePresentationRequest>;

export interface Thumbnail {
  /** The content URL of the thumbnail image. The URL to the image has a default lifetime of 30 minutes. This URL is tagged with the account of the requester. Anyone with the URL effectively accesses the image as the original requester. Access to the image may be lost if the presentation's sharing settings change. The mime type of the thumbnail image is the same as specified in the `GetPageThumbnailRequest`. */
  contentUrl?: string;
  /** The positive width in pixels of the thumbnail image. */
  width?: number;
  /** The positive height in pixels of the thumbnail image. */
  height?: number;
}

export const Thumbnail: Schema.Schema<Thumbnail> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      contentUrl: Schema.optional(Schema.String),
      width: Schema.optional(Schema.Number),
      height: Schema.optional(Schema.Number),
    }),
  ).annotate({ identifier: "Thumbnail" }) as any as Schema.Schema<Thumbnail>;

// ==========================================================================
// Operations
// ==========================================================================

export interface CreatePresentationsRequest {
  /** Request body */
  body?: Presentation;
}

export const CreatePresentationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    body: Schema.optional(Presentation).pipe(T.HttpBody()),
  }).pipe(
    T.Http({ method: "POST", path: "v1/presentations", hasBody: true }),
    svc,
  ) as unknown as Schema.Schema<CreatePresentationsRequest>;

export type CreatePresentationsResponse = Presentation;
export const CreatePresentationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Presentation;

export type CreatePresentationsError = DefaultErrors;

/** Creates a blank presentation using the title given in the request. If a `presentationId` is provided, it is used as the ID of the new presentation. Otherwise, a new ID is generated. Other fields in the request, including any provided content, are ignored. Returns the created presentation. */
export const createPresentations: API.OperationMethod<
  CreatePresentationsRequest,
  CreatePresentationsResponse,
  CreatePresentationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreatePresentationsRequest,
  output: CreatePresentationsResponse,
  errors: [],
}));

export interface GetPresentationsRequest {
  /** The ID of the presentation to retrieve. */
  presentationId: string;
}

export const GetPresentationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    presentationId: Schema.String.pipe(T.HttpPath("presentationId")),
  }).pipe(
    T.Http({ method: "GET", path: "v1/presentations/{presentationsId}" }),
    svc,
  ) as unknown as Schema.Schema<GetPresentationsRequest>;

export type GetPresentationsResponse = Presentation;
export const GetPresentationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Presentation;

export type GetPresentationsError = DefaultErrors;

/** Gets the latest version of the specified presentation. */
export const getPresentations: API.OperationMethod<
  GetPresentationsRequest,
  GetPresentationsResponse,
  GetPresentationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetPresentationsRequest,
  output: GetPresentationsResponse,
  errors: [],
}));

export interface BatchUpdatePresentationsRequest {
  /** The presentation to apply the updates to. */
  presentationId: string;
  /** Request body */
  body?: BatchUpdatePresentationRequest;
}

export const BatchUpdatePresentationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    presentationId: Schema.String.pipe(T.HttpPath("presentationId")),
    body: Schema.optional(BatchUpdatePresentationRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/presentations/{presentationId}:batchUpdate",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<BatchUpdatePresentationsRequest>;

export type BatchUpdatePresentationsResponse = BatchUpdatePresentationResponse;
export const BatchUpdatePresentationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ BatchUpdatePresentationResponse;

export type BatchUpdatePresentationsError = DefaultErrors;

/** Applies one or more updates to the presentation. Each request is validated before being applied. If any request is not valid, then the entire request will fail and nothing will be applied. Some requests have replies to give you some information about how they are applied. Other requests do not need to return information; these each return an empty reply. The order of replies matches that of the requests. For example, suppose you call batchUpdate with four updates, and only the third one returns information. The response would have two empty replies: the reply to the third request, and another empty reply, in that order. Because other users may be editing the presentation, the presentation might not exactly reflect your changes: your changes may be altered with respect to collaborator changes. If there are no collaborators, the presentation should reflect your changes. In any case, the updates in your request are guaranteed to be applied together atomically. */
export const batchUpdatePresentations: API.OperationMethod<
  BatchUpdatePresentationsRequest,
  BatchUpdatePresentationsResponse,
  BatchUpdatePresentationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchUpdatePresentationsRequest,
  output: BatchUpdatePresentationsResponse,
  errors: [],
}));

export interface GetThumbnailPresentationsPagesRequest {
  /** The ID of the presentation to retrieve. */
  presentationId: string;
  /** The object ID of the page whose thumbnail to retrieve. */
  pageObjectId: string;
  /** The optional mime type of the thumbnail image. If you don't specify the mime type, the mime type defaults to PNG. */
  "thumbnailProperties.mimeType"?: "PNG" | (string & {});
  /** The optional thumbnail image size. If you don't specify the size, the server chooses a default size of the image. */
  "thumbnailProperties.thumbnailSize"?:
    | "THUMBNAIL_SIZE_UNSPECIFIED"
    | "LARGE"
    | "MEDIUM"
    | "SMALL"
    | (string & {});
}

export const GetThumbnailPresentationsPagesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    presentationId: Schema.String.pipe(T.HttpPath("presentationId")),
    pageObjectId: Schema.String.pipe(T.HttpPath("pageObjectId")),
    "thumbnailProperties.mimeType": Schema.optional(Schema.String).pipe(
      T.HttpQuery("thumbnailProperties.mimeType"),
    ),
    "thumbnailProperties.thumbnailSize": Schema.optional(Schema.String).pipe(
      T.HttpQuery("thumbnailProperties.thumbnailSize"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/presentations/{presentationId}/pages/{pageObjectId}/thumbnail",
    }),
    svc,
  ) as unknown as Schema.Schema<GetThumbnailPresentationsPagesRequest>;

export type GetThumbnailPresentationsPagesResponse = Thumbnail;
export const GetThumbnailPresentationsPagesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Thumbnail;

export type GetThumbnailPresentationsPagesError = DefaultErrors;

/** Generates a thumbnail of the latest version of the specified page in the presentation and returns a URL to the thumbnail image. This request counts as an [expensive read request](https://developers.google.com/workspace/slides/limits) for quota purposes. */
export const getThumbnailPresentationsPages: API.OperationMethod<
  GetThumbnailPresentationsPagesRequest,
  GetThumbnailPresentationsPagesResponse,
  GetThumbnailPresentationsPagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetThumbnailPresentationsPagesRequest,
  output: GetThumbnailPresentationsPagesResponse,
  errors: [],
}));

export interface GetPresentationsPagesRequest {
  /** The ID of the presentation to retrieve. */
  presentationId: string;
  /** The object ID of the page to retrieve. */
  pageObjectId: string;
}

export const GetPresentationsPagesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    presentationId: Schema.String.pipe(T.HttpPath("presentationId")),
    pageObjectId: Schema.String.pipe(T.HttpPath("pageObjectId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/presentations/{presentationId}/pages/{pageObjectId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetPresentationsPagesRequest>;

export type GetPresentationsPagesResponse = Page;
export const GetPresentationsPagesResponse = /*@__PURE__*/ /*#__PURE__*/ Page;

export type GetPresentationsPagesError = DefaultErrors;

/** Gets the latest version of the specified page in the presentation. */
export const getPresentationsPages: API.OperationMethod<
  GetPresentationsPagesRequest,
  GetPresentationsPagesResponse,
  GetPresentationsPagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetPresentationsPagesRequest,
  output: GetPresentationsPagesResponse,
  errors: [],
}));
