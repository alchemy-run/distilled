/**
 * Cloudflare IMAGES API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service images
 */

import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits";
import type { Credentials } from "../credentials";
import { type DefaultErrors } from "../errors";
import { UploadableSchema } from "../schemas";

// =============================================================================
// Errors
// =============================================================================

export class ImageAlreadyExists extends Schema.TaggedErrorClass<ImageAlreadyExists>()(
  "ImageAlreadyExists",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(ImageAlreadyExists, [{ code: 5409 }]);

export class ImageNotFound extends Schema.TaggedErrorClass<ImageNotFound>()(
  "ImageNotFound",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(ImageNotFound, [{ code: 5404 }]);

export class ImagesAccessNotEnabled extends Schema.TaggedErrorClass<ImagesAccessNotEnabled>()(
  "ImagesAccessNotEnabled",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(ImagesAccessNotEnabled, [{ code: 5403 }]);

export class InvalidUploadFormat extends Schema.TaggedErrorClass<InvalidUploadFormat>()(
  "InvalidUploadFormat",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(InvalidUploadFormat, [{ code: 5415 }]);

export class KeyNotFound extends Schema.TaggedErrorClass<KeyNotFound>()(
  "KeyNotFound",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(KeyNotFound, [{ code: 5404 }]);

export class VariantNameNotAllowed extends Schema.TaggedErrorClass<VariantNameNotAllowed>()(
  "VariantNameNotAllowed",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(VariantNameNotAllowed, [{ code: 5400 }]);

export class VariantNotFound extends Schema.TaggedErrorClass<VariantNotFound>()(
  "VariantNotFound",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(VariantNotFound, [{ code: 5401 }]);

// =============================================================================
// V1
// =============================================================================

export interface GetV1Request {
  imageId: string;
  /** Account identifier tag. */
  accountId: string;
}

export const GetV1Request = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  imageId: Schema.String.pipe(T.HttpPath("imageId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/images/v1/{imageId}" }),
) as unknown as Schema.Schema<GetV1Request>;

export interface GetV1Response {
  /** Image unique identifier. */
  id?: string | null;
  /** Can set the creator field with an internal user ID. */
  creator?: string | null;
  /** Image file name. */
  filename?: string | null;
  /** User modifiable key-value store. Can be used for keeping references to another system of record for managing images. Metadata must not exceed 1024 bytes. */
  meta?: unknown | null;
  /** Indicates whether the image can be a accessed only using it's UID. If set to true, a signed token needs to be generated with a signing key to view the image. */
  requireSignedURLs?: boolean | null;
  /** When the media item was uploaded. */
  uploaded?: string | null;
  /** Object specifying available variants for an image. */
  variants?: string[] | null;
}

export const GetV1Response = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  creator: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  filename: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  meta: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
  requireSignedURLs: Schema.optional(
    Schema.Union([Schema.Boolean, Schema.Null]),
  ),
  uploaded: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  variants: Schema.optional(
    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
  ),
}) as unknown as Schema.Schema<GetV1Response>;

export type GetV1Error = DefaultErrors | ImagesAccessNotEnabled | ImageNotFound;

export const getV1: API.OperationMethod<
  GetV1Request,
  GetV1Response,
  GetV1Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetV1Request,
  output: GetV1Response,
  errors: [ImagesAccessNotEnabled, ImageNotFound],
}));

export interface ListV1sRequest {
  /** Path param: Account identifier tag. */
  accountId: string;
  /** Query param: Internal user ID set within the creator field. Setting to empty string "" will return images where creator field is not set */
  creator?: string | null;
}

export const ListV1sRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  creator: Schema.optional(Schema.Union([Schema.String, Schema.Null])).pipe(
    T.HttpQuery("creator"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/images/v1" }),
) as unknown as Schema.Schema<ListV1sRequest>;

export type ListV1sResponse = {
  images?:
    | {
        id?: string | null;
        creator?: string | null;
        filename?: string | null;
        meta?: unknown | null;
        requireSignedURLs?: boolean | null;
        uploaded?: string | null;
        variants?: string[] | null;
      }[]
    | null;
}[];

export const ListV1sResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Struct({
    images: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
            creator: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            filename: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            meta: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
            requireSignedURLs: Schema.optional(
              Schema.Union([Schema.Boolean, Schema.Null]),
            ),
            uploaded: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            variants: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
          }),
        ),
        Schema.Null,
      ]),
    ),
  }),
) as unknown as Schema.Schema<ListV1sResponse>;

export type ListV1sError = DefaultErrors | ImagesAccessNotEnabled;

export const listV1s: API.OperationMethod<
  ListV1sRequest,
  ListV1sResponse,
  ListV1sError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListV1sRequest,
  output: ListV1sResponse,
  errors: [ImagesAccessNotEnabled],
}));

export interface CreateV1Request {
  /** Path param: Account identifier tag. */
  accountId: string;
  /** Body param: An optional custom unique identifier for your image. */
  id?: string;
  /** Body param: Can set the creator field with an internal user ID. */
  creator?: string;
  /** Body param: An image binary data. Only needed when type is uploading a file. */
  file?: File | Blob;
  /** Body param: User modifiable key-value store. Can use used for keeping references to another system of record for managing images. */
  metadata?: unknown;
  /** Body param: Indicates whether the image requires a signature token for the access. */
  requireSignedURLs?: boolean;
  /** Body param: A URL to fetch an image from origin. Only needed when type is uploading from a URL. */
  url?: string;
}

export const CreateV1Request = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  id: Schema.optional(Schema.String),
  creator: Schema.optional(Schema.String),
  file: Schema.optional(UploadableSchema.pipe(T.HttpFormDataFile())),
  metadata: Schema.optional(Schema.Unknown),
  requireSignedURLs: Schema.optional(Schema.Boolean),
  url: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/images/v1",
    contentType: "multipart",
  }),
) as unknown as Schema.Schema<CreateV1Request>;

export interface CreateV1Response {
  /** Image unique identifier. */
  id?: string | null;
  /** Can set the creator field with an internal user ID. */
  creator?: string | null;
  /** Image file name. */
  filename?: string | null;
  /** User modifiable key-value store. Can be used for keeping references to another system of record for managing images. Metadata must not exceed 1024 bytes. */
  meta?: unknown | null;
  /** Indicates whether the image can be a accessed only using it's UID. If set to true, a signed token needs to be generated with a signing key to view the image. */
  requireSignedURLs?: boolean | null;
  /** When the media item was uploaded. */
  uploaded?: string | null;
  /** Object specifying available variants for an image. */
  variants?: string[] | null;
}

export const CreateV1Response = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  creator: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  filename: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  meta: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
  requireSignedURLs: Schema.optional(
    Schema.Union([Schema.Boolean, Schema.Null]),
  ),
  uploaded: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  variants: Schema.optional(
    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
  ),
}) as unknown as Schema.Schema<CreateV1Response>;

export type CreateV1Error = DefaultErrors | ImagesAccessNotEnabled;

export const createV1: API.OperationMethod<
  CreateV1Request,
  CreateV1Response,
  CreateV1Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateV1Request,
  output: CreateV1Response,
  errors: [ImagesAccessNotEnabled],
}));

export interface PatchV1Request {
  imageId: string;
  /** Path param: Account identifier tag. */
  accountId: string;
  /** Body param: Can set the creator field with an internal user ID. */
  creator?: string;
  /** Body param: User modifiable key-value store. Can be used for keeping references to another system of record for managing images. No change if not specified. */
  metadata?: unknown;
  /** Body param: Indicates whether the image can be accessed using only its UID. If set to `true`, a signed token needs to be generated with a signing key to view the image. Returns a new UID on a change.  */
  requireSignedURLs?: boolean;
}

export const PatchV1Request = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  imageId: Schema.String.pipe(T.HttpPath("imageId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  creator: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Unknown),
  requireSignedURLs: Schema.optional(Schema.Boolean),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/accounts/{account_id}/images/v1/{imageId}",
  }),
) as unknown as Schema.Schema<PatchV1Request>;

export interface PatchV1Response {
  /** Image unique identifier. */
  id?: string | null;
  /** Can set the creator field with an internal user ID. */
  creator?: string | null;
  /** Image file name. */
  filename?: string | null;
  /** User modifiable key-value store. Can be used for keeping references to another system of record for managing images. Metadata must not exceed 1024 bytes. */
  meta?: unknown | null;
  /** Indicates whether the image can be a accessed only using it's UID. If set to true, a signed token needs to be generated with a signing key to view the image. */
  requireSignedURLs?: boolean | null;
  /** When the media item was uploaded. */
  uploaded?: string | null;
  /** Object specifying available variants for an image. */
  variants?: string[] | null;
}

export const PatchV1Response = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  creator: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  filename: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  meta: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
  requireSignedURLs: Schema.optional(
    Schema.Union([Schema.Boolean, Schema.Null]),
  ),
  uploaded: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  variants: Schema.optional(
    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
  ),
}) as unknown as Schema.Schema<PatchV1Response>;

export type PatchV1Error =
  | DefaultErrors
  | ImagesAccessNotEnabled
  | ImageNotFound;

export const patchV1: API.OperationMethod<
  PatchV1Request,
  PatchV1Response,
  PatchV1Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchV1Request,
  output: PatchV1Response,
  errors: [ImagesAccessNotEnabled, ImageNotFound],
}));

export interface DeleteV1Request {
  imageId: string;
  /** Account identifier tag. */
  accountId: string;
}

export const DeleteV1Request = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  imageId: Schema.String.pipe(T.HttpPath("imageId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/images/v1/{imageId}",
  }),
) as unknown as Schema.Schema<DeleteV1Request>;

export type DeleteV1Response = string;

export const DeleteV1Response =
  /*@__PURE__*/ /*#__PURE__*/ Schema.String as unknown as Schema.Schema<DeleteV1Response>;

export type DeleteV1Error =
  | DefaultErrors
  | ImagesAccessNotEnabled
  | ImageNotFound;

export const deleteV1: API.OperationMethod<
  DeleteV1Request,
  DeleteV1Response,
  DeleteV1Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteV1Request,
  output: DeleteV1Response,
  errors: [ImagesAccessNotEnabled, ImageNotFound],
}));

// =============================================================================
// V1Blob
// =============================================================================

export interface GetV1BlobRequest {
  imageId: string;
  /** Account identifier tag. */
  accountId: string;
}

export const GetV1BlobRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  imageId: Schema.String.pipe(T.HttpPath("imageId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/images/v1/{imageId}/blob",
  }),
) as unknown as Schema.Schema<GetV1BlobRequest>;

export type GetV1BlobResponse = unknown;

export const GetV1BlobResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<GetV1BlobResponse>;

export type GetV1BlobError =
  | DefaultErrors
  | ImagesAccessNotEnabled
  | ImageNotFound;

export const getV1Blob: API.OperationMethod<
  GetV1BlobRequest,
  GetV1BlobResponse,
  GetV1BlobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetV1BlobRequest,
  output: GetV1BlobResponse,
  errors: [ImagesAccessNotEnabled, ImageNotFound],
}));

// =============================================================================
// V1Key
// =============================================================================

export interface ListV1KeysRequest {
  /** Account identifier tag. */
  accountId: string;
}

export const ListV1KeysRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/images/v1/keys" }),
) as unknown as Schema.Schema<ListV1KeysRequest>;

export interface ListV1KeysResponse {
  keys?: { name?: string | null; value?: string | null }[] | null;
}

export const ListV1KeysResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  keys: Schema.optional(
    Schema.Union([
      Schema.Array(
        Schema.Struct({
          name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          value: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        }),
      ),
      Schema.Null,
    ]),
  ),
}) as unknown as Schema.Schema<ListV1KeysResponse>;

export type ListV1KeysError = DefaultErrors | ImagesAccessNotEnabled;

export const listV1Keys: API.OperationMethod<
  ListV1KeysRequest,
  ListV1KeysResponse,
  ListV1KeysError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListV1KeysRequest,
  output: ListV1KeysResponse,
  errors: [ImagesAccessNotEnabled],
}));

export interface PutV1KeyRequest {
  signingKeyName: string;
  /** Account identifier tag. */
  accountId: string;
}

export const PutV1KeyRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  signingKeyName: Schema.String.pipe(T.HttpPath("signingKeyName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/images/v1/keys/{signingKeyName}",
  }),
) as unknown as Schema.Schema<PutV1KeyRequest>;

export interface PutV1KeyResponse {
  keys?: { name?: string | null; value?: string | null }[] | null;
}

export const PutV1KeyResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  keys: Schema.optional(
    Schema.Union([
      Schema.Array(
        Schema.Struct({
          name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          value: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        }),
      ),
      Schema.Null,
    ]),
  ),
}) as unknown as Schema.Schema<PutV1KeyResponse>;

export type PutV1KeyError = DefaultErrors | ImagesAccessNotEnabled;

export const putV1Key: API.OperationMethod<
  PutV1KeyRequest,
  PutV1KeyResponse,
  PutV1KeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutV1KeyRequest,
  output: PutV1KeyResponse,
  errors: [ImagesAccessNotEnabled],
}));

export interface DeleteV1KeyRequest {
  signingKeyName: string;
  /** Account identifier tag. */
  accountId: string;
}

export const DeleteV1KeyRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  signingKeyName: Schema.String.pipe(T.HttpPath("signingKeyName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/images/v1/keys/{signingKeyName}",
  }),
) as unknown as Schema.Schema<DeleteV1KeyRequest>;

export interface DeleteV1KeyResponse {
  keys?: { name?: string | null; value?: string | null }[] | null;
}

export const DeleteV1KeyResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  keys: Schema.optional(
    Schema.Union([
      Schema.Array(
        Schema.Struct({
          name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          value: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        }),
      ),
      Schema.Null,
    ]),
  ),
}) as unknown as Schema.Schema<DeleteV1KeyResponse>;

export type DeleteV1KeyError =
  | DefaultErrors
  | ImagesAccessNotEnabled
  | KeyNotFound;

export const deleteV1Key: API.OperationMethod<
  DeleteV1KeyRequest,
  DeleteV1KeyResponse,
  DeleteV1KeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteV1KeyRequest,
  output: DeleteV1KeyResponse,
  errors: [ImagesAccessNotEnabled, KeyNotFound],
}));

// =============================================================================
// V1Stat
// =============================================================================

export interface GetV1StatRequest {
  /** Account identifier tag. */
  accountId: string;
}

export const GetV1StatRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/images/v1/stats" }),
) as unknown as Schema.Schema<GetV1StatRequest>;

export interface GetV1StatResponse {
  count?: { allowed?: number | null; current?: number | null } | null;
}

export const GetV1StatResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  count: Schema.optional(
    Schema.Union([
      Schema.Struct({
        allowed: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
        current: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      }),
      Schema.Null,
    ]),
  ),
}) as unknown as Schema.Schema<GetV1StatResponse>;

export type GetV1StatError = DefaultErrors | ImagesAccessNotEnabled;

export const getV1Stat: API.OperationMethod<
  GetV1StatRequest,
  GetV1StatResponse,
  GetV1StatError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetV1StatRequest,
  output: GetV1StatResponse,
  errors: [ImagesAccessNotEnabled],
}));

// =============================================================================
// V1Variant
// =============================================================================

export interface GetV1VariantRequest {
  variantId: string;
  /** Account identifier tag. */
  accountId: string;
}

export const GetV1VariantRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  variantId: Schema.String.pipe(T.HttpPath("variantId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/images/v1/variants/{variantId}",
  }),
) as unknown as Schema.Schema<GetV1VariantRequest>;

export interface GetV1VariantResponse {
  variant?: {
    id: string;
    options: {
      fit: "scale-down" | "contain" | "cover" | "crop" | "pad";
      height: number;
      metadata: "keep" | "copyright" | "none";
      width: number;
    };
    neverRequireSignedURLs?: boolean | null;
  } | null;
}

export const GetV1VariantResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  variant: Schema.optional(
    Schema.Union([
      Schema.Struct({
        id: Schema.String,
        options: Schema.Struct({
          fit: Schema.Literals([
            "scale-down",
            "contain",
            "cover",
            "crop",
            "pad",
          ]),
          height: Schema.Number,
          metadata: Schema.Literals(["keep", "copyright", "none"]),
          width: Schema.Number,
        }),
        neverRequireSignedURLs: Schema.optional(
          Schema.Union([Schema.Boolean, Schema.Null]),
        ),
      }),
      Schema.Null,
    ]),
  ),
}) as unknown as Schema.Schema<GetV1VariantResponse>;

export type GetV1VariantError =
  | DefaultErrors
  | ImagesAccessNotEnabled
  | VariantNameNotAllowed
  | VariantNotFound;

export const getV1Variant: API.OperationMethod<
  GetV1VariantRequest,
  GetV1VariantResponse,
  GetV1VariantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetV1VariantRequest,
  output: GetV1VariantResponse,
  errors: [ImagesAccessNotEnabled, VariantNameNotAllowed, VariantNotFound],
}));

export interface ListV1VariantsRequest {
  /** Account identifier tag. */
  accountId: string;
}

export const ListV1VariantsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/images/v1/variants" }),
) as unknown as Schema.Schema<ListV1VariantsRequest>;

export interface ListV1VariantsResponse {
  id: string;
  /** Allows you to define image resizing sizes for different use cases. */
  options: {
    fit: "scale-down" | "contain" | "cover" | "crop" | "pad";
    height: number;
    metadata: "keep" | "copyright" | "none";
    width: number;
  };
  /** Indicates whether the variant can access an image without a signature, regardless of image access control. */
  neverRequireSignedURLs?: boolean | null;
}

export const ListV1VariantsResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    id: Schema.String,
    options: Schema.Struct({
      fit: Schema.Literals(["scale-down", "contain", "cover", "crop", "pad"]),
      height: Schema.Number,
      metadata: Schema.Literals(["keep", "copyright", "none"]),
      width: Schema.Number,
    }),
    neverRequireSignedURLs: Schema.optional(
      Schema.Union([Schema.Boolean, Schema.Null]),
    ),
  },
) as unknown as Schema.Schema<ListV1VariantsResponse>;

export type ListV1VariantsError = DefaultErrors | ImagesAccessNotEnabled;

export const listV1Variants: API.OperationMethod<
  ListV1VariantsRequest,
  ListV1VariantsResponse,
  ListV1VariantsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListV1VariantsRequest,
  output: ListV1VariantsResponse,
  errors: [ImagesAccessNotEnabled],
}));

export interface CreateV1VariantRequest {
  /** Path param: Account identifier tag. */
  accountId: string;
  /** Body param: */
  id: string;
  /** Body param: Allows you to define image resizing sizes for different use cases. */
  options: {
    fit: "scale-down" | "contain" | "cover" | "crop" | "pad";
    height: number;
    metadata: "keep" | "copyright" | "none";
    width: number;
  };
  /** Body param: Indicates whether the variant can access an image without a signature, regardless of image access control. */
  neverRequireSignedURLs?: boolean;
}

export const CreateV1VariantRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    id: Schema.String,
    options: Schema.Struct({
      fit: Schema.Literals(["scale-down", "contain", "cover", "crop", "pad"]),
      height: Schema.Number,
      metadata: Schema.Literals(["keep", "copyright", "none"]),
      width: Schema.Number,
    }),
    neverRequireSignedURLs: Schema.optional(Schema.Boolean),
  },
).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/images/v1/variants" }),
) as unknown as Schema.Schema<CreateV1VariantRequest>;

export interface CreateV1VariantResponse {
  variant?: {
    id: string;
    options: {
      fit: "scale-down" | "contain" | "cover" | "crop" | "pad";
      height: number;
      metadata: "keep" | "copyright" | "none";
      width: number;
    };
    neverRequireSignedURLs?: boolean | null;
  } | null;
}

export const CreateV1VariantResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    variant: Schema.optional(
      Schema.Union([
        Schema.Struct({
          id: Schema.String,
          options: Schema.Struct({
            fit: Schema.Literals([
              "scale-down",
              "contain",
              "cover",
              "crop",
              "pad",
            ]),
            height: Schema.Number,
            metadata: Schema.Literals(["keep", "copyright", "none"]),
            width: Schema.Number,
          }),
          neverRequireSignedURLs: Schema.optional(
            Schema.Union([Schema.Boolean, Schema.Null]),
          ),
        }),
        Schema.Null,
      ]),
    ),
  }) as unknown as Schema.Schema<CreateV1VariantResponse>;

export type CreateV1VariantError =
  | DefaultErrors
  | ImagesAccessNotEnabled
  | VariantNameNotAllowed;

export const createV1Variant: API.OperationMethod<
  CreateV1VariantRequest,
  CreateV1VariantResponse,
  CreateV1VariantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateV1VariantRequest,
  output: CreateV1VariantResponse,
  errors: [ImagesAccessNotEnabled, VariantNameNotAllowed],
}));

export interface PatchV1VariantRequest {
  variantId: string;
  /** Path param: Account identifier tag. */
  accountId: string;
  /** Body param: Allows you to define image resizing sizes for different use cases. */
  options: {
    fit: "scale-down" | "contain" | "cover" | "crop" | "pad";
    height: number;
    metadata: "keep" | "copyright" | "none";
    width: number;
  };
  /** Body param: Indicates whether the variant can access an image without a signature, regardless of image access control. */
  neverRequireSignedURLs?: boolean;
}

export const PatchV1VariantRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  variantId: Schema.String.pipe(T.HttpPath("variantId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  options: Schema.Struct({
    fit: Schema.Literals(["scale-down", "contain", "cover", "crop", "pad"]),
    height: Schema.Number,
    metadata: Schema.Literals(["keep", "copyright", "none"]),
    width: Schema.Number,
  }),
  neverRequireSignedURLs: Schema.optional(Schema.Boolean),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/accounts/{account_id}/images/v1/variants/{variantId}",
  }),
) as unknown as Schema.Schema<PatchV1VariantRequest>;

export interface PatchV1VariantResponse {
  variant?: {
    id: string;
    options: {
      fit: "scale-down" | "contain" | "cover" | "crop" | "pad";
      height: number;
      metadata: "keep" | "copyright" | "none";
      width: number;
    };
    neverRequireSignedURLs?: boolean | null;
  } | null;
}

export const PatchV1VariantResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    variant: Schema.optional(
      Schema.Union([
        Schema.Struct({
          id: Schema.String,
          options: Schema.Struct({
            fit: Schema.Literals([
              "scale-down",
              "contain",
              "cover",
              "crop",
              "pad",
            ]),
            height: Schema.Number,
            metadata: Schema.Literals(["keep", "copyright", "none"]),
            width: Schema.Number,
          }),
          neverRequireSignedURLs: Schema.optional(
            Schema.Union([Schema.Boolean, Schema.Null]),
          ),
        }),
        Schema.Null,
      ]),
    ),
  },
) as unknown as Schema.Schema<PatchV1VariantResponse>;

export type PatchV1VariantError =
  | DefaultErrors
  | ImagesAccessNotEnabled
  | VariantNameNotAllowed
  | VariantNotFound;

export const patchV1Variant: API.OperationMethod<
  PatchV1VariantRequest,
  PatchV1VariantResponse,
  PatchV1VariantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchV1VariantRequest,
  output: PatchV1VariantResponse,
  errors: [ImagesAccessNotEnabled, VariantNameNotAllowed, VariantNotFound],
}));

export interface DeleteV1VariantRequest {
  variantId: string;
  /** Account identifier tag. */
  accountId: string;
}

export const DeleteV1VariantRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    variantId: Schema.String.pipe(T.HttpPath("variantId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  },
).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/images/v1/variants/{variantId}",
  }),
) as unknown as Schema.Schema<DeleteV1VariantRequest>;

export type DeleteV1VariantResponse = string;

export const DeleteV1VariantResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.String as unknown as Schema.Schema<DeleteV1VariantResponse>;

export type DeleteV1VariantError =
  | DefaultErrors
  | ImagesAccessNotEnabled
  | VariantNameNotAllowed
  | VariantNotFound;

export const deleteV1Variant: API.OperationMethod<
  DeleteV1VariantRequest,
  DeleteV1VariantResponse,
  DeleteV1VariantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteV1VariantRequest,
  output: DeleteV1VariantResponse,
  errors: [ImagesAccessNotEnabled, VariantNameNotAllowed, VariantNotFound],
}));

// =============================================================================
// V2
// =============================================================================

export interface ListV2sRequest {
  /** Path param: Account identifier tag. */
  accountId: string;
  /** Query param: Continuation token for a next page. List images V2 returns continuation_token */
  continuationToken?: string | null;
  /** Query param: Internal user ID set within the creator field. Setting to empty string "" will return images where creator field is not set */
  creator?: string | null;
  /** Query param: Number of items per page. */
  perPage?: number;
  /** Query param: Sorting order by upload time. */
  sortOrder?: "asc" | "desc";
}

export const ListV2sRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  continuationToken: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ).pipe(T.HttpQuery("continuation_token")),
  creator: Schema.optional(Schema.Union([Schema.String, Schema.Null])).pipe(
    T.HttpQuery("creator"),
  ),
  perPage: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
  sortOrder: Schema.optional(Schema.Literals(["asc", "desc"])).pipe(
    T.HttpQuery("sort_order"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/images/v2" }),
) as unknown as Schema.Schema<ListV2sRequest>;

export interface ListV2sResponse {
  /** Continuation token to fetch next page. Passed as a query param when requesting List V2 api endpoint. */
  continuationToken?: string | null;
  images?: unknown[] | null;
}

export const ListV2sResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  continuationToken: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  images: Schema.optional(
    Schema.Union([Schema.Array(Schema.Unknown), Schema.Null]),
  ),
}).pipe(
  Schema.encodeKeys({
    continuationToken: "continuation_token",
    images: "images",
  }),
) as unknown as Schema.Schema<ListV2sResponse>;

export type ListV2sError = DefaultErrors | ImagesAccessNotEnabled;

export const listV2s: API.OperationMethod<
  ListV2sRequest,
  ListV2sResponse,
  ListV2sError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListV2sRequest,
  output: ListV2sResponse,
  errors: [ImagesAccessNotEnabled],
}));

// =============================================================================
// V2DirectUpload
// =============================================================================

export interface CreateV2DirectUploadRequest {
  /** Path param: Account identifier tag. */
  accountId: string;
  /** Body param: Optional Image Custom ID. Up to 1024 chars. Can include any number of subpaths, and utf8 characters. Cannot start nor end with a / (forward slash). Cannot be a UUID. */
  id?: string;
  /** Body param: Can set the creator field with an internal user ID. */
  creator?: string;
  /** Body param: The date after which the upload will not be accepted. Minimum: Now + 2 minutes. Maximum: Now + 6 hours. */
  expiry?: string;
  /** Body param: User modifiable key-value store. Can be used for keeping references to another system of record, for managing images. */
  metadata?: unknown;
  /** Body param: Indicates whether the image requires a signature token to be accessed. */
  requireSignedURLs?: boolean;
}

export const CreateV2DirectUploadRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    id: Schema.optional(Schema.String),
    creator: Schema.optional(Schema.String),
    expiry: Schema.optional(Schema.String),
    metadata: Schema.optional(Schema.Unknown),
    requireSignedURLs: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/images/v2/direct_upload",
      contentType: "multipart",
    }),
  ) as unknown as Schema.Schema<CreateV2DirectUploadRequest>;

export interface CreateV2DirectUploadResponse {
  /** Image unique identifier. */
  id?: string | null;
  /** The URL the unauthenticated upload can be performed to using a single HTTP POST (multipart/form-data) request. */
  uploadURL?: string | null;
}

export const CreateV2DirectUploadResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    uploadURL: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }) as unknown as Schema.Schema<CreateV2DirectUploadResponse>;

export type CreateV2DirectUploadError =
  | DefaultErrors
  | ImagesAccessNotEnabled
  | ImageAlreadyExists
  | InvalidUploadFormat;

export const createV2DirectUpload: API.OperationMethod<
  CreateV2DirectUploadRequest,
  CreateV2DirectUploadResponse,
  CreateV2DirectUploadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateV2DirectUploadRequest,
  output: CreateV2DirectUploadResponse,
  errors: [ImagesAccessNotEnabled, ImageAlreadyExists, InvalidUploadFormat],
}));
