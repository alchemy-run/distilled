// ==========================================================================
// Chrome Web Store API (chromewebstore v1.1)
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
  name: "chromewebstore",
  version: "v1.1",
  rootUrl: "https://chromewebstore.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface ItemError {
  /** The error code. */
  error_code?: string;
  /** The human-readable detail message of the error. */
  error_detail?: string;
}

export const ItemError: Schema.Schema<ItemError> = Schema.suspend(() =>
  Schema.Struct({
    error_code: Schema.optional(Schema.String),
    error_detail: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "ItemError" }) as any as Schema.Schema<ItemError>;

export interface Item {
  /** Unique ID of the item. */
  id?: string;
  /** The CRX version of the item. If the projection is draft, then it is the draft's CRX version. */
  crxVersion?: string;
  /** Status of the operation. Possible values are: - \"FAILURE\" - \"IN_PROGRESS\" - \"NOT_FOUND\" - \"SUCCESS\" */
  uploadState?: string;
  /** Identifies this resource as an Item. Value: the fixed string "chromewebstore#item". */
  kind?: string;
  /** Public key of this item. */
  publicKey?: string;
  /** Detail human-readable status of the operation, in English only. Same error messages are displayed when you upload your app to the Chrome Web Store. */
  itemError?: Array<ItemError>;
}

export const Item: Schema.Schema<Item> = Schema.suspend(() =>
  Schema.Struct({
    id: Schema.optional(Schema.String),
    crxVersion: Schema.optional(Schema.String),
    uploadState: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
    publicKey: Schema.optional(Schema.String),
    itemError: Schema.optional(Schema.Array(ItemError)),
  }),
).annotate({ identifier: "Item" }) as any as Schema.Schema<Item>;

export interface PublishRequest {
  /** The publish target of this publish operation. This is the same as using publishTarget as a URL query parameter. The string value can either be target="trustedTesters" or target="default". The default value, if none is supplied, is target="default". Recommended usage is to use the URL query parameter to specificy the value. */
  target?: string;
  /** Optional. The caller request to exempt the review and directly publish because the update is within the list that we can automatically validate. The API will check if the exemption can be granted using real time data. */
  reviewExemption?: boolean;
  /** The target deploy percentage of the item. It's only useful for items with big user base. */
  deployPercentage?: number;
}

export const PublishRequest: Schema.Schema<PublishRequest> = Schema.suspend(
  () =>
    Schema.Struct({
      target: Schema.optional(Schema.String),
      reviewExemption: Schema.optional(Schema.Boolean),
      deployPercentage: Schema.optional(Schema.Number),
    }),
).annotate({
  identifier: "PublishRequest",
}) as any as Schema.Schema<PublishRequest>;

export interface Item2 {
  /** The ID of this item. */
  item_id?: string;
  /** Static string value is always "chromewebstore#item". */
  kind?: string;
  /** The status code of this publish operation. It may contain multiple elements from the following list: NOT_AUTHORIZED, INVALID_DEVELOPER, DEVELOPER_NO_OWNERSHIP, DEVELOPER_SUSPENDED, ITEM_NOT_FOUND, ITEM_PENDING_REVIEW, ITEM_TAKEN_DOWN, PUBLISHER_SUSPENDED. */
  status?: Array<string>;
  /** Detailed human-comprehensible explanation of the status code above. */
  statusDetail?: Array<string>;
}

export const Item2: Schema.Schema<Item2> = Schema.suspend(() =>
  Schema.Struct({
    item_id: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
    status: Schema.optional(Schema.Array(Schema.String)),
    statusDetail: Schema.optional(Schema.Array(Schema.String)),
  }),
).annotate({ identifier: "Item2" }) as any as Schema.Schema<Item2>;

// ==========================================================================
// Operations
// ==========================================================================

export interface InsertItemsRequest {
  /** The email of the publisher who owns the items. Defaults to the caller's email address. */
  publisherEmail?: string;
}

export const InsertItemsRequest = Schema.Struct({
  publisherEmail: Schema.optional(Schema.String).pipe(
    T.HttpQuery("publisherEmail"),
  ),
}).pipe(
  T.Http({ method: "POST", path: "chromewebstore/v1.1/items", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertItemsRequest>;

export type InsertItemsResponse = Item;
export const InsertItemsResponse = Item;

export type InsertItemsError = DefaultErrors;

/** Inserts a new item. */
export const insertItems: API.OperationMethod<
  InsertItemsRequest,
  InsertItemsResponse,
  InsertItemsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: InsertItemsRequest,
  output: InsertItemsResponse,
  errors: [],
}));

export interface GetItemsRequest {
  /** Unique identifier representing the Chrome App, Chrome Extension, or the Chrome Theme. */
  itemId: string;
  /** Determines which subset of the item information to return. */
  projection?: "DRAFT" | "PUBLISHED" | (string & {});
}

export const GetItemsRequest = Schema.Struct({
  itemId: Schema.String.pipe(T.HttpPath("itemId")),
  projection: Schema.optional(Schema.String).pipe(T.HttpQuery("projection")),
}).pipe(
  T.Http({ method: "GET", path: "chromewebstore/v1.1/items/{itemId}" }),
  svc,
) as unknown as Schema.Schema<GetItemsRequest>;

export type GetItemsResponse = Item;
export const GetItemsResponse = Item;

export type GetItemsError = DefaultErrors;

/** Gets your own Chrome Web Store item. */
export const getItems: API.OperationMethod<
  GetItemsRequest,
  GetItemsResponse,
  GetItemsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetItemsRequest,
  output: GetItemsResponse,
  errors: [],
}));

export interface PublishItemsRequest {
  /** The ID of the item to publish. */
  itemId: string;
  /** The deploy percentage you want to set for your item. Valid values are [0, 100]. If set to any number less than 100, only that many percentage of users will be allowed to get the update. */
  deployPercentage?: number;
  /** Provide defined publishTarget in URL (case sensitive): publishTarget="trustedTesters" or publishTarget="default". Defaults to publishTarget="default". */
  publishTarget?: string;
  /** Optional. The caller request to exempt the review and directly publish because the update is within the list that we can automatically validate. The API will check if the exemption can be granted using real time data. */
  reviewExemption?: boolean;
  /** Request body */
  body?: PublishRequest;
}

export const PublishItemsRequest = Schema.Struct({
  itemId: Schema.String.pipe(T.HttpPath("itemId")),
  deployPercentage: Schema.optional(Schema.Number).pipe(
    T.HttpQuery("deployPercentage"),
  ),
  publishTarget: Schema.optional(Schema.String).pipe(
    T.HttpQuery("publishTarget"),
  ),
  reviewExemption: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("reviewExemption"),
  ),
  body: Schema.optional(PublishRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "chromewebstore/v1.1/items/{itemId}/publish",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PublishItemsRequest>;

export type PublishItemsResponse = Item2;
export const PublishItemsResponse = Item2;

export type PublishItemsError = DefaultErrors;

/** Publishes an item. */
export const publishItems: API.OperationMethod<
  PublishItemsRequest,
  PublishItemsResponse,
  PublishItemsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PublishItemsRequest,
  output: PublishItemsResponse,
  errors: [],
}));

export interface UpdateItemsRequest {
  /** The ID of the item to upload. */
  itemId: string;
  /** Request body */
  body?: Item;
}

export const UpdateItemsRequest = Schema.Struct({
  itemId: Schema.String.pipe(T.HttpPath("itemId")),
  body: Schema.optional(Item).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "chromewebstore/v1.1/items/{itemId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateItemsRequest>;

export type UpdateItemsResponse = Item;
export const UpdateItemsResponse = Item;

export type UpdateItemsError = DefaultErrors;

/** Updates an existing item. */
export const updateItems: API.OperationMethod<
  UpdateItemsRequest,
  UpdateItemsResponse,
  UpdateItemsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateItemsRequest,
  output: UpdateItemsResponse,
  errors: [],
}));
